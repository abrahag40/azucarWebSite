# Módulo `booking/` — frontera del flujo de solicitud (H3.1)

> **Regla de la frontera:** ningún archivo fuera de esta carpeta importa nada de
> aquí salvo `FormularioSolicitud.astro` y los tipos de `solicitud.ts`. La lógica
> interna —composición del mensaje, validación, canales— es privada del módulo.
>
> **Motivo (ADR-0003):** esto es una solución provisional. El día que el hotel
> contrate un PMS o un motor de reservas SaaS, este módulo se sustituye entero y
> el resto del sitio no se entera. Es un *anti-corruption layer*: el vocabulario
> del hotel —«solicitud», «tipo de alojamiento»— no depende del vocabulario que
> traiga el motor que venga.

## Interfaz

**Entrada.** El módulo recibe la lista de tipos de alojamiento publicados y el
idioma. No consulta la colección por su cuenta: así el día que el catálogo
cambie de forma, se cambia el `Astro.props` y no el interior del módulo.

**Salida.** `componerSolicitud(datos, textos)` devuelve `{ asunto, cuerpo }`: un
mensaje en texto plano, listo para enviarse. Es una función **pura**: mismas
entradas, misma salida, sin fechas del sistema ni acceso a red. Eso la hace
comprobable y es lo que permite que el mismo texto alimente el correo, el
resumen en pantalla y —cuando exista— el `POST` a la función serverless.

## 🔴 Qué NO hace hoy, y por qué

**Este formulario no envía nada a ningún servidor nuestro. Los datos del huésped
no salen de su navegador.** Compone el mensaje y se lo entrega para que lo mande
por correo desde su propio cliente.

No es una limitación técnica: es la única opción correcta hoy.

| Falta | Bloqueado por | Consecuencia |
|---|---|---|
| Destinatario y responsable de responder | **B1, B2** | No sabemos a quién notificar ni con qué compromiso de tiempo |
| Correo y WhatsApp de recepción | **B3** | El sitio vigente **no publica ningún WhatsApp**: no hay número que usar |
| Pasarela de pago | **B4** | Fuera de alcance de esta historia |
| Desglose fiscal | **C3** | Sin él no se puede cotizar. Ver abajo |
| Aviso de privacidad conforme a LFPDPPP | **E-PRIV** | Ver abajo |

### Por qué no se guarda ni se transmite un solo dato personal

**E-PRIV** está abierto: el aviso de privacidad del hotel no cumple la LFPDPPP.
Montar hoy un endpoint que reciba nombre, correo y teléfono iniciaría un
*tratamiento de datos personales* sin aviso conforme — exactamente el
incumplimiento que le señalamos al cliente en su propio sitio (R-13, R-18).

Mientras el mensaje se componga y se envíe desde el dispositivo del huésped, con
su cliente de correo y bajo su control, **nosotros no tratamos ningún dato**. No
hay base de datos, no hay registro, no hay endpoint. La frontera es deliberada.

### Por qué no aparece ningún precio

La regla 3 de `CLAUDE.md` dice que el total cotizado incluye impuestos, y es el
diferenciador del proyecto frente a las OTAs. **C3** —IVA, ISH de Quintana Roo y
saneamiento ambiental de Tulum— sigue sin respuesta.

Publicar un «desde $X» sin impuestos sería reproducir la queja de «me cobraron
más de lo publicado» que este proyecto existe para curar. Así que no se muestra
ninguna cifra, y se dice en pantalla que el hotel responde con el total con
impuestos incluidos. **Callar es más honesto que estimar.**

## Cuando lleguen las respuestas

1. `componerSolicitud` no se toca: ya produce el cuerpo del mensaje.
2. Se añade `enviar()` con el `POST` a la función serverless (H3.4).
3. El consentimiento explícito y no premarcado (H3.8) entra **antes** que el
   `POST`, no después.
4. La cotización con impuestos (H3.3) se calcula aparte y se inyecta al módulo:
   el formulario no debe saber de impuestos.
