# ADR-0006 — Endpoint de solicitud: entrega real por correo y WhatsApp

- **Fecha:** 2026-08-22
- **Estado:** Propuesta — requiere visto bueno de Abraham y, en la parte de WhatsApp, una decisión de costo/proveedor del cliente
- **Decisor:** Claude (líder de proyecto)
- **Complementa a:** [ADR-0003](ADR-0003-arquitectura-de-reserva-sin-pms.md) (decide *qué* pasa con una solicitud) y [ADR-0004](ADR-0004-stack-tecnico.md) (decide que el endpoint corre en Cloudflare Pages Functions). Este documento decide **cómo se construye** esa pieza, que ninguno de los dos cubría a nivel técnico.

## Contexto

Hoy `/reservar/` y `/en/booking/` existen (H3.1, H3.2) pero **no envían nada a ningún
servidor**. El formulario compone el mensaje en el navegador del huésped con
`componerSolicitud()` — una función pura, sin acceso a red — y se lo entrega al huésped como
un `mailto:` para que lo mande él mismo, desde su propio cliente de correo. Está documentado
como decisión deliberada en [`site/src/booking/README.md`](../../site/src/booking/README.md):
montar un endpoint que reciba nombre, correo y teléfono sin un aviso de privacidad conforme
sería el mismo incumplimiento que le señalamos al cliente (R-13, R-18).

Abraham pide ahora avanzar: que al enviar el formulario, la solicitud **llegue de verdad** al
correo del manager y a su WhatsApp, sin que el huésped tenga que hacer nada más. Es exactamente
lo que describe ADR-0003 §"Cómo se implementa", punto 4 — nunca se especificó *con qué
mecanismo*. Eso es lo que resuelve este documento.

**Dos bloqueos no técnicos siguen vigentes y ninguna elección de proveedor los evita:**

| Bloqueo | Qué falta | Por qué no hay atajo |
|---|---|---|
| **E-PRIV** | Aviso de privacidad conforme a la LFPDPPP (faltan domicilio del responsable, derechos ARCO, revocación del consentimiento — R-18) | En cuanto el endpoint reciba el primer dato real, empieza un tratamiento de datos personales. Publicarlo sin aviso conforme es el incumplimiento que este proyecto existe para corregir, no algo que se posponga "por ahora" |
| **B4** | Correo y WhatsApp oficiales de recepción | Sin saber a quién notificar, no hay a dónde entregar. El sitio vigente muestra el icono de WhatsApp junto a sus dos teléfonos pero no publica un enlace `wa.me`: no hay forma de saber cuál de los dos lo tiene (R-21) |

Este ADR dejará **todo lo técnico construido y probado**, gobernado por variables de entorno
vacías — el mismo patrón ya usado para el botón flotante de WhatsApp (`contacto.whatsapp =
null`, L-072): el código no inventa el dato que falta, y activar la ruta real es rellenar un
valor, no escribir más código.

## Alcance

Cubre H3.4 (endpoint), H3.5 (acuse al huésped) y H3.6 (notificación al manager). **No** cubre
H3.3 (cotización con impuestos — depende de C3, es un cálculo aparte que se inyecta al módulo)
ni la pasarela de pago (B3, fuera de alcance de estas historias por diseño de ADR-0003).

## Arquitectura propuesta

```
Navegador del huésped
   │  fetch() POST /api/solicitud   (mismo origen — sin CORS)
   ▼
Cloudflare Pages Function  (functions/api/solicitud.ts)
   │
   ├─ 1. Honeypot + Turnstile → si falla, 400 y no continúa
   ├─ 2. Repite la MISMA validación del cliente (fechas, campos obligatorios)
   ├─ 3. Límite de tasa por IP (Cloudflare KV, contador con TTL de 1 h)
   ├─ 4. componerSolicitud(datos, rótulos)   ← LA MISMA función pura de hoy,
   │                                            importada sin cambios
   ├─ 5. Envía correo al manager           (Resend)
   ├─ 6. Envía WhatsApp al manager          (WhatsApp Cloud API)
   ├─ 7. Envía correo de acuse al huésped   (Resend) — H3.5
   └─ 8. Responde 200 con un resumen. NO GUARDA NADA.
```

**No hay base de datos.** La función es un relevo: recibe, valida, entrega por dos canales y
olvida. Ninguna tabla de solicitudes, ningún historial propio — lo que el correo y WhatsApp
retengan en sus propios sistemas es cosa suya, igual que hoy con cualquier correo que el hotel
recibe. Es la aplicación directa del principio de **minimización de datos** de la LFPDPPP: no
se guarda lo que no hace falta guardar, y así el aviso de privacidad no tiene que prometer un
procedimiento de baja de una base de datos que no existe. La única persistencia es el contador
de tasa por IP, que no es un dato personal — es un número con expiración de una hora.

## Decisión 1 — Reutilizar `componerSolicitud` tal cual, no reescribirla

`site/src/booking/solicitud.ts` ya es una función pura: sin `Date.now()`, sin DOM, sin acceso a
red. Eso no era una elección de estilo — es exactamente lo que hace falta para correr sin
cambios en el runtime de Cloudflare Workers, que es donde vive una Pages Function. El propio
comentario del archivo ya lo anticipaba: *"cuando exista el endpoint (H3.4) se reutiliza tal
cual"*. Este ADR es la confirmación de que la apuesta se sostiene.

**Antipatrón que se evita:** tener dos lugares que arman el mismo mensaje —uno en el
navegador para el resumen en pantalla, otro en el servidor para el envío real— es la manera
más segura de que, tarde o temprano, digan cosas distintas. Una sola función, dos
consumidores.

## Decisión 2 — Antispam sin CAPTCHA visible

Criterio de H3.4. Dos capas, sin fricción para el huésped:

1. **Turnstile de Cloudflare.** Es el propio proveedor del sitio — no se añade cuenta ni
   proveedor nuevo—, gratuito, y su modo "managed" no siempre pide interacción: la mayoría de
   los visitantes legítimos no ve nada.
2. **Campo *honeypot*.** Un campo invisible para una persona (oculto por CSS, no por
   `type="hidden"` — algunos bots sí lo saltan) que un bot de relleno automático sí completa.
   Si llega con contenido, se descarta en silencio. Cero costo, cero dependencia.

**Límite de tasa:** un contador en Cloudflare KV, clave = hash de la IP, TTL de una hora.
Simple, sin nueva infraestructura — KV ya viene con Cloudflare Pages.

## Decisión 3 — Canal de correo: Resend

| Opción | A favor | En contra |
|---|---|---|
| **Resend** | API mínima, pensada para runtimes tipo *edge* (Workers/Deno), nivel gratuito generoso para el volumen de un hotel boutique, documentación orientada a exactamente este caso de uso | Empresa más joven que las otras — verificar reputación de entrega al implementar |
| Postmark | Reputación de entrega excelente, especializado en transaccional | Sin nivel gratuito real |
| SendGrid | Nivel gratuito existe | Configuración más pesada; sin cuidado en la configuración, tiende a caer en spam |
| MailChannels | Fue la opción de costo cero integrada a Cloudflare Workers | El relevo gratuito y anónimo para Workers se descontinuó — **no depender de memoria vieja aquí, verificar el estado del programa al implementar** |

**Recomendación: Resend.** Cualquiera de las cuatro sirve; se nombra la elección para no
volver a evaluar en el sprint, no porque las otras estén mal. Requiere verificar el dominio de
correo del hotel (registros SPF/DKIM) — tarea operativa de Abraham, mismo patrón que GA4 o
Search Console en el runbook de despliegue.

## Decisión 4 — Canal de WhatsApp: la decisión que le toca al cliente

Aquí no hay una recomendación única y cerrada como en el correo, porque las tres opciones
difieren en costo, esfuerzo de puesta en marcha y riesgo — y el riesgo lo asume el hotel, no
nosotros.

| # | Opción | Puesta en marcha | Costo | Riesgo |
|---|---|---|---|---|
| **A** | **WhatsApp Cloud API (Meta, oficial)** | Cuenta de Meta Business verificada, número dedicado a la plataforma de WhatsApp Business, plantilla de mensaje aprobada (aprobación típica: minutos a horas para un caso de uso legítimo como este) | Nivel gratuito cubre holgadamente el volumen de un hotel boutique; verificar cifra vigente al implementar, Meta ha cambiado su modelo de precios más de una vez | Ninguno de operación — es el camino soportado |
| **B** | **Twilio como proveedor intermediario (BSP)** | Más simple de integrar si ya se conoce Twilio; sigue exigiendo la misma aprobación de Meta por debajo | Tarifa de Twilio **sumada** a la de Meta | Un proveedor más que puede fallar o subir precio |
| **C** | **Servicio no oficial (p. ej. CallMeBot)** | Mínima: el manager manda un mensaje de activación desde su propio WhatsApp y ya | Gratuito | 🔴 **No es un canal soportado por WhatsApp.** Viola sus términos de uso para automatización, no tiene garantía de servicio y puede dejar de funcionar, o **limitar el número personal del manager**, sin aviso |

### Por qué A es la recomendación, con una advertencia real

**Antipatrón que se evita en C:** automatizar WhatsApp por una vía no oficial es construir el
canal más visible del hotel —la notificación que el manager va a mirar primero— sobre una base
que puede caerse cualquier día sin que nadie del lado de WhatsApp avise. Es exactamente el tipo
de atajo barato que cuesta caro la primera vez que falla en la práctica, no en la demo.

**La consecuencia real de la opción A, y por qué es una decisión de negocio y no técnica:** la
Plataforma de WhatsApp Business necesita un número **dedicado**. Si se registra el número
personal del manager, ese número deja de comportarse como WhatsApp normal en su teléfono de la
manera habitual. La forma limpia es que el hotel dedique un número exclusivamente a esta
notificación — puede ser una línea nueva y barata, o un número VoIP — separado del que el
manager usa para su vida personal. **Esto es una pregunta nueva para el cliente, distinta de
B4:** B4 preguntaba cuál de los dos números YA tiene WhatsApp para el enlace manual de la
cabecera; esto pregunta si el hotel quiere dedicar un número a un canal de notificaciones
automatizado. Son dos decisiones distintas que hasta ahora vivían mezcladas bajo la misma
pregunta.

## Plan de fases

No hace falta esperar a que las tres piezas (correo, antispam, WhatsApp) estén listas a la vez.

- **Fase 0 — hecha.** `componerSolicitud`, validación de cliente, `mailto:` como entrega
  manual. Sigue siendo el comportamiento visible **mientras E-PRIV no se resuelva**, sin
  importar qué tan lista esté la Fase 1.
- **Fase 1 — construible ya.** Endpoint + Resend + Turnstile + honeypot + límite de tasa +
  acuse al huésped (H3.4, H3.5). Sólo entrega por correo. Puede escribirse y probarse en
  Preview de Cloudflare Pages sin exponerse a producción.
- **Fase 2 — WhatsApp (H3.6).** Se añade en cuanto el cliente decida entre las opciones A/B/C
  de la Decisión 4. El endpoint ya está preparado: enviar por WhatsApp es una llamada más
  dentro del mismo `POST`, no una reescritura.
- **Publicación real, cualquiera que sea la fase:** bloqueada por **E-PRIV** y **B4**, sin
  excepción. El código puede estar listo y desplegado en Preview; no pasa a producción hasta
  que ambos se resuelvan. El consentimiento explícito y no premarcado (H3.8) se activa **antes**
  del primer `POST` real, nunca después.

## Consecuencias

**Positivas:** la solicitud llega sin que el huésped dependa de tener un cliente de correo
configurado en su teléfono — hoy, en móvil, "mandar por correo" a veces ni siquiera abre nada.
Reduce fricción justo en el paso donde ADR-0003 ya admite que se pierde conversión. El manager
recibe el mismo mensaje por dos canales sin redactar nada dos veces. Ninguna base de datos que
mantener, ni política de retención que inventar.

**Negativas / costo asumido:** aparece la primera dependencia externa real del sitio (Resend,
y eventualmente Meta/Twilio) — hasta hoy, cero servicios de terceros en producción salvo
Cloudflare mismo. Aparece la primera superficie de fallo en cadena: si Resend o la API de
WhatsApp caen, la solicitud puede perderse silenciosamente si no se maneja el error con
cuidado — el endpoint debe devolver un fallo claro al huésped (y, como resguardo, ofrecerle el
`mailto:` que hoy ya funciona, en vez de un error genérico). Y aparece un costo operativo nuevo,
aunque pequeño, en cuanto el volumen crezca más allá del nivel gratuito de cualquiera de los
proveedores.

## Preguntas / decisiones que le tocan a Abraham y al cliente

1. **¿Resend como proveedor de correo, o prefieres evaluar otro de la tabla?** Cualquiera
   sirve; si no hay preferencia, se avanza con Resend.
2. **¿Cuál de las tres opciones de WhatsApp (A/B/C)?** Se recomienda A. Si el costo o el
   trámite de Meta Business son un obstáculo real hoy, se puede lanzar con sólo el correo
   (Fase 1) y añadir WhatsApp después — el sitio no necesita las dos piezas a la vez para
   dejar de depender del `mailto:`.
3. **Si se elige la opción A:** ¿el hotel dedica un número nuevo a la Plataforma de WhatsApp
   Business, o prefiere usar uno de los dos existentes asumiendo que deja de comportarse como
   WhatsApp normal en ese teléfono?
4. Sigue en pie **B4** (correo y WhatsApp oficiales de recepción) y **E-PRIV** (aviso de
   privacidad conforme). Ninguna decisión de esta lista sustituye a esas dos.
