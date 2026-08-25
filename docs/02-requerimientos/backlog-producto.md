# Product Backlog — Azúcar Hotel Tulum

> **Artefacto de Scrum.** Lista ordenada, viva y única de todo lo que el producto
> necesita. Es la **única fuente de trabajo**: si no está aquí, no se construye.
> Propietario del orden: Abraham como **Proxy Product Owner** ([ADR-0002](../decisiones/ADR-0002-marco-de-trabajo-iterativo.md)).
>
> **Formato de historia de usuario:** *Como \<rol\>, quiero \<capacidad\> para \<beneficio\>.*
> Se usa porque obliga a declarar **para quién** y **para qué**. Una tarea escrita como
> "hacer el header" no permite saber cuándo está bien hecha; una historia sí.
>
> **Criterios de aceptación en formato Gherkin** (*Dado / Cuando / Entonces*). Se usa porque
> convierte "quedó bien" en una afirmación verificable por alguien que no escribió el código.
>
> **Estimación en tallas S/M/L**, no en *story points*. Justificación en ADR-0002 §"Qué
> conservamos": la *velocity* necesita historia previa para significar algo; con un equipo
> nuevo es una cifra inventada que después se usa para presionar.
>
> - **S** — cabe holgadamente en un día de trabajo
> - **M** — dos o tres días
> - **L** — media iteración. **Una L es señal de que hay que partirla**, no de que es grande

---

## Roles del producto

| Rol | Quién es | Qué le importa |
|---|---|---|
| **Huésped potencial** | Viajero que evalúa dónde hospedarse en Tulum | Ver si el hotel es lo que busca, cuánto cuesta **en total**, y reservar sin fricción |
| **Manager del hotel** | Quien atiende solicitudes y actualiza OTAs a mano | Recibir solicitudes completas y accionables, sin tener que repreguntar |
| **Mantenedor** | Abraham | Cambiar contenido sin tocar plantillas ni romper nada |
| **Cliente-Decisor** | Dirección del hotel | Ver avance real y decidir con información |

---

## Épicas

| # | Épica | Qué resuelve | Sprints |
|---|---|---|---|
| **E1** | Fundación técnica y sistema de diseño | Que exista un sitio, bilingüe, rápido y accesible por construcción | 1 |
| **E2** | Catálogo de alojamiento | Que el huésped entienda qué compra y elija | 2 |
| **E3** | Solicitud de reserva | Que el huésped reserve directo, sin sobreventa y con el precio real | 3 |
| **E4** | Contenido institucional y de destino | Que el sitio responda todo lo que el huésped pregunta antes de decidir | 4 |
| **E5** | Calidad, migración y lanzamiento | Que salga a producción sin perder posicionamiento y sin riesgo | 5 |
| **E6** | Medición | Que se pueda demostrar que el trabajo sirvió | Transversal |

---

# ÉPICA E1 — Fundación técnica y sistema de diseño

**Sprint 1.** Estado: ✅ completa salvo despliegue y analítica activa.

### H1.1 — Proyecto Astro con enrutamiento bilingüe · `S` · ✅
> Como **mantenedor**, quiero un proyecto con rutas ES/EN nativas, para no duplicar páginas
> a mano ni desincronizar idiomas.

- **Dado** que el sitio es bilingüe, **cuando** se visita `/`, **entonces** se sirve español sin prefijo.
- **Dado** lo mismo, **cuando** se visita `/en/`, **entonces** se sirve inglés.
- **Entonces** cada página declara `hreflang` para `es`, `en` y `x-default`.
- **Y** el español conserva el esquema de URLs actual, para no invalidar las 301 vigentes.

### H1.2 — Integración y despliegue continuo · `M` · 🔄 *bloqueada por cuenta Cloudflare*
> Como **Cliente-Decisor**, quiero abrir una URL y ver el avance, para no depender de
> capturas de pantalla.

- **Dado** un push a cualquier rama, **cuando** termina el pipeline, **entonces** existe una URL de vista previa única para esa rama.
- **Dado** un HTML generado que incumpla la DoD, **cuando** corre el pipeline, **entonces** falla y no se publica.
- **Dado** que ADR-0003 prohíbe prometer confirmación, **cuando** el HTML contiene "reserva confirmada", **entonces** el build falla.

### H1.3 — Design tokens desde Cappa · `M` · ✅
> Como **mantenedor**, quiero el sistema visual como variables, para cambiar la marca en un
> archivo y no en doscientos.

- **Entonces** no existe ningún valor de color, tipografía o espaciado escrito directamente en un componente.
- **Y** todo par de color texto/fondo cumple contraste **≥ 4.5:1** (WCAG 1.4.3).
- **Y** queda documentado por qué el oro original de la plantilla no se usa para texto.

### H1.4 — Componentes base accesibles · `M` · ✅
> Como **huésped potencial** que navega con teclado o lector de pantalla, quiero poder usar
> el sitio completo, para no quedar excluido.

- **Dado** que sólo uso teclado, **cuando** navego, **entonces** todo elemento interactivo es alcanzable y su foco es visible.
- **Dado** que llego a la página, **cuando** pulso Tab por primera vez, **entonces** aparece "saltar al contenido".
- **Entonces** ningún objetivo táctil mide menos de 44×44 px.
- **Y** el menú funciona **sin JavaScript**.

### H1.5 — Modelo de datos del alojamiento · `M` · ✅
> Como **mantenedor**, quiero el alojamiento como datos validados, para que un error no
> llegue a producción.

- **Dado** un archivo de alojamiento con un campo inválido, **cuando** compilo, **entonces** el build falla indicando el archivo y el campo.
- **Entonces** el esquema **no** contiene ningún campo de disponibilidad (ADR-0003, regla 2).
- **Y** cada ficha declara qué campos ha confirmado el cliente y cuáles son estimación nuestra.
- **Y** `build:prod` falla si hay datos sin confirmar.

### H1.6 — Home bilingüe · `M` · ✅
> Como **huésped potencial**, quiero entender en cinco segundos qué es este hotel y dónde
> está, para decidir si sigo leyendo.

- **Entonces** la home cumple la DoD completa en ambos idiomas.
- **Y** incluye `schema.org/Hotel` válido con dirección y coordenadas.
- **Y** el aviso "solicitud sujeta a confirmación" es visible sin desplazarse.

### H1.7 — Analítica · `S` · 🔄 *bloqueada por ID de medición*
> Como **Cliente-Decisor**, quiero saber cuánta gente entra y por dónde llega, para poder
> comparar dentro de seis meses.

- **Dado** que existe `PUBLIC_GA4_ID`, **cuando** se publica, **entonces** se registran visitas.
- **Dado** que no existe, **entonces** no se emite ningún script — el sitio no se rompe.
- **Y** en desarrollo nunca se envían eventos.
- **Y** la IP se anonimiza.

---

# ÉPICA E2 — Catálogo de alojamiento

**Sprint 2. Objetivo del sprint:** *que el huésped pueda recorrer los ocho tipos, entender
qué los distingue y elegir uno.*

### H2.1 — Listado de alojamiento · `M` · ✅
> Como **huésped potencial**, quiero ver todos los tipos en una página, para comparar.

- **Dado** que entro en `/alojamiento/`, **entonces** veo todas las fichas publicadas ordenadas por `orden`.
- **Dado** que añado un tipo nuevo al directorio de datos, **cuando** recompilo, **entonces** aparece sin tocar ninguna plantilla.
- **Entonces** cada tarjeta muestra nombre, vista, capacidad, camas y qué la distingue.
- **Y** existe en `/alojamiento/` y en `/en/rooms/`, enlazadas por `hreflang`.

### H2.2 — Ficha de detalle · `M` · ✅ *8 fichas ES + 8 EN; datos sin verificar marcados con asterisco (C1)*
> Como **huésped potencial**, quiero ver una habitación en detalle, para saber exactamente
> qué incluye antes de solicitarla.

- **Dado** un tipo publicado, **entonces** existe su página generada desde los datos.
- **Entonces** muestra galería, amenidades, capacidad, camas, metros y vista.
- **Y** ofrece "Solicitar reserva" con el tipo **preseleccionado**.
- **Y** enlaza a la ficha siguiente y anterior, para no dejar al huésped en un callejón sin salida.

### H2.3 — Galería accesible · `M` · ✅
> Como **huésped potencial**, quiero ampliar las fotos, porque la foto es el producto.

- **Dado** el visor abierto, **cuando** pulso `Esc`, **entonces** se cierra y el foco vuelve al disparador.
- **Dado** el visor abierto, **entonces** el foco queda atrapado dentro (WCAG 2.4.3).
- **Entonces** se navega con flechas y con botones visibles.
- **Y** funciona sin JavaScript en modo degradado: las imágenes son enlaces a sí mismas.

### H2.4 — Datos estructurados de hotelería · `S` · ✅
> Como **Cliente-Decisor**, quiero aparecer en Google con la información enriquecida que hoy
> sólo muestran las OTAs.

- **Entonces** cada ficha emite `schema.org/HotelRoom` enlazado al `Hotel`.
- **Y** valida sin errores ni advertencias en Rich Results Test.
- **Y** **no** se declara `priceRange` ni `AggregateRating` mientras el dato no esté confirmado.

### H2.5 — Imágenes optimizadas · `S` · ✅ *AVIF medido y descartado (ADR-0005); calidad 50, −20 %*
> Como **huésped potencial** en 4G, quiero que las fotos carguen rápido, para no abandonar.

- **Entonces** toda imagen se sirve en AVIF/WebP con `srcset` y respaldo.
- **Y** toda imagen lleva `width`/`height`: **CLS = 0** medido.
- **Y** sólo la imagen principal carga con prioridad; el resto es diferido.

### H2.6 — Consolidación comercial del catálogo · `S` · *requiere decisión del cliente*
> Como **huésped potencial**, quiero pocas opciones claras, para no paralizarme eligiendo.

- **Dado** que la auditoría encontró dos pares de tipos casi idénticos, **entonces** se presenta al cliente la propuesta de agrupar en categorías con la vista como atributo.
- **Y** la decisión queda registrada por escrito antes de implementarse.

---

# ÉPICA E3 — Solicitud de reserva 🔴

**Sprint 3. Objetivo del sprint:** *que el manager reciba en su teléfono una solicitud real,
completa y con el precio total, enviada desde el sitio.*

> Es el corazón del proyecto y la épica con más riesgo. Arquitectura y justificación en
> [ADR-0003](../decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md).

### H3.1 — Módulo aislado de reserva · `S` · ✅
> Como **mantenedor**, quiero el flujo de reserva detrás de una frontera, para poder
> cambiarlo por un motor SaaS sin reescribir el sitio.

- **Entonces** ningún componente fuera de `booking/` importa su implementación interna.
- **Y** existe una interfaz documentada de entrada y salida.
- **Y** queda escrito en el propio módulo que es una solución provisional y por qué.

### H3.2 — Formulario por pasos · `M` · 🔄 *hecho salvo el envío a servidor, que depende de B1–B4 y E-PRIV*
> Como **huésped potencial**, quiero pedir una reserva sin sentir que lleno un trámite.

- **Entonces** los pasos son: fechas → alojamiento → huéspedes → contacto.
- **Dado** que tengo JavaScript desactivado, **cuando** envío, **entonces** funciona igual.
- **Dado** un campo inválido, **entonces** el error se anuncia al lector de pantalla y el foco va al campo.
- **Y** en ninguna pantalla aparece la palabra "confirmada".

### H3.3 — 🔴 Cotización con impuestos desglosados · `M` · 🔴 *bloqueada por C3*
> Como **huésped potencial**, quiero ver el total real antes de enviar, para que no me
> sorprendan al llegar.

- **Entonces** se muestra: tarifa por noche × noches, **IVA**, **ISH de Quintana Roo**, **saneamiento ambiental de Tulum**, y **total**.
- **Y** el total mostrado es el que se cobrará.
- **Y** se indica qué incluye y qué no.
- **Dado** que falte algún dato fiscal del cliente, **entonces** el build falla — no se estima un impuesto.

> Ataca directamente la queja recurrente de "me cobraron más de lo publicado" documentada
> en la auditoría. **Es el diferenciador frente a las OTAs.**

### H3.4 — Endpoint de recepción · `M` · 🔄 *construido y probado en local ([ADR-0006](../decisiones/ADR-0006-endpoint-de-solicitud-correo-y-whatsapp.md)), sin cablear al formulario ni desplegado con credenciales reales — falta B4 y E-PRIV*
> Como **manager**, quiero que las solicitudes lleguen íntegras y sin basura.

- **Entonces** la validación se repite en servidor, nunca sólo en cliente. ✅ `camposInvalidos`,
  reutilizada de `booking/solicitud.ts`.
- **Y** hay protección antispam sin CAPTCHA visible. ✅ Turnstile + honeypot.
- **Y** hay límite de tasa por IP. ✅ Contador en KV con TTL de 1 hora, opcional (se omite si no
  hay KV enlazado — es defensa en profundidad, no la garantía central).
- **Y** **no se captura ningún dato de tarjeta** (ADR-0003). Lo verifica el CI.

### H3.5 — Acuse inmediato al huésped · `S` · 🔄 *el correo se construye y prueba junto con H3.4; falta C3 y B1/B2 para el contenido completo*
> Como **huésped potencial**, quiero saber que mi solicitud llegó, para no irme a Booking.

- **Dado** que envío, **entonces** en menos de 30 segundos recibo correo con resumen, cotización y compromiso de respuesta.
  🔄 El resumen ✅ llega, con el estilo del sitio (HTML propio en `booking/correoHtml.ts`,
  verificado con envío real a Resend y revisado por Abraham en Gmail — se ve bien); la
  cotización y el compromiso de tiempo siguen sin poder afirmarse — dependen de **C3** y
  **B1/B2**. El correo lo dice explícitamente en vez de inventar
  una cifra.
- **Y** la pantalla de confirmación dice "solicitud recibida", nunca "reserva confirmada".

### H3.6 — Notificación al manager · `S` · 🔄 *el correo está construido; el WhatsApp se pospuso a propósito*
> Como **manager**, quiero recibirla en el teléfono con todo lo necesario para responder sin
> repreguntar.

- **Entonces** llega por correo ✅ **y** WhatsApp ⬜. Se decidió avanzar sólo con correo por ahora
  (ver ADR-0006, Decisión 4): la pieza de WhatsApp automatizado exige una elección de
  proveedor/costo que le toca al cliente, y no bloquea que el correo funcione.
- **Y** contiene fechas, tipo, huéspedes, contacto, cotización y comentarios. ✅ Salvo cotización,
  que sigue bloqueada por **C3**.

> **Cómo se construyen:** [ADR-0006](../decisiones/ADR-0006-endpoint-de-solicitud-correo-y-whatsapp.md)
> propone Cloudflare Pages Functions sin base de datos y Resend para correo — ya construido y
> probado en local. Para WhatsApp deja tres opciones con una decisión de costo/proveedor
> pendiente del cliente. Nada de esto se publica hasta que se resuelvan **B4** y **E-PRIV**.

### H3.7 — WhatsApp como canal paralelo · `S` · 🔄 *interfaz construida; el enlace real espera el número (B4)*
> Como **huésped potencial**, quiero preguntar por WhatsApp si no quiero llenar un formulario.

- **Entonces** hay acceso visible en todas las páginas. ✅ Botón flotante clásico, abajo a la
  derecha, en las 38 páginas.
- **Y** el mensaje llega pre-llenado con el contexto de la página desde la que se escribió.
  ✅ Construido y listo (`flotante.saludo` en `ui.ts`), pero inactivo: sin número confirmado, el
  botón no inventa un enlace `wa.me` — cae a `/contacto/`, que es cierto hoy, con una etiqueta
  accesible que lo dice ("Contactar al hotel", no "WhatsApp"). En cuanto el cliente responda
  **B4**, activar el saludo y el destino real es cambiar un solo campo: `contacto.whatsapp` en
  `site/src/data/hotel.ts`.

### H3.8 — Aviso de privacidad y consentimiento · `S` · 🔄 *aviso publicado con sus carencias declaradas; el consentimiento entra con H3.4 (E-PRIV)*
> Como **huésped potencial**, quiero saber qué hacen con mis datos, y como **hotel**,
> cumplir la ley.

- **Entonces** existe aviso de privacidad conforme a **LFPDPPP** en ES y EN.
- **Y** el formulario exige consentimiento **explícito**, nunca pre-marcado.
- **Y** se enlaza desde el propio formulario, no sólo desde el pie.

---

# ÉPICA E4 — Contenido institucional y de destino

**Sprint 4. Objetivo del sprint:** *que el sitio responda, sin que el huésped tenga que
escribir, todo lo que pregunta antes de decidir.*

| # | Historia | Talla | Estado |
|---|---|---|---|
| H4.1 | Servicios y amenidades | `M` | ✅ |
| H4.2 | Restaurante y bar | `S` | 🔴 **C0** — el propio cliente se contradice: no se publica |
| H4.3 | Spa y experiencias | `S` | 🔴 **C0** — igual que H4.2 |
| H4.4 | Galería general | `S` | ✅ 8 fotografías con alternativas propias |
| H4.5 | **Ubicación y cómo llegar** | `M` | 🔄 mapa y datos reales añadidos; tiempos y costos esperan **C-LLEG** |
| H4.6 | Contacto | `S` | ✅ |
| H4.7 | Políticas y preguntas frecuentes | `M` | ✅ 16 preguntas + 6 grupos de políticas |
| H4.8 | Páginas legales | `S` | 🔄 publicado con sus carencias declaradas (**E-PRIV**) |
| H4.9 | 404 útil, `sitemap.xml`, `robots.txt` | `S` | ✅ |
| H4.10 | **Testimonios en la portada** | `S` | ⬜ **nueva.** Es la única sección de Cappa que falta sin motivo de fondo: el hotel SÍ tiene reseñas en TripAdvisor y Google. Ver `docs/04-diseno/fidelidad-a-cappa.md` |
| H4.11 | **Restaurante con carta** | `M` | 🔄 **publicada.** C0 resuelta por Abraham (2026-08-25): el restaurante existe. Página en ES/EN, en el menú y en el sitemap. **Falta la carta** —los platos y el nombre real— y hasta que llegue la página lo dice en vez de inventarla |
| H1.8 | **Formulario de solicitud en el héroe** | `S` | ✅ **nueva.** Patrón `booking-box` de Cappa, con «Solicitar reserva» en vez de «Check Availability» — regla 2. Precarga `/reservar/` por URL, sin JavaScript |

### H4.5 merece detalle
> Como **huésped potencial que ya reservó o está por hacerlo**, quiero saber exactamente
> cómo llegar desde el aeropuerto de Cancún, para no descubrirlo por WhatsApp a las once de
> la noche.

- **Entonces** la página explica opciones reales: traslado privado, ADO, renta de auto, con tiempos y rangos de costo.
  🔄 **Parcial.** Se publica lo confirmable: el kilómetro y la avenida, que el hotel **sí opera
  traslado aeropuerto–hotel** (aparece en el formulario de su sitio vigente) y que hay que
  consultarle tarifas. **Tiempos y rangos de costo NO se publican**: son la pregunta **C-LLEG**
  y un tiempo inventado que no se cumple es la promesa rota que este proyecto corrige (regla 7).
- **Y** incluye mapa y referencias físicas de la carretera de Boca Paila.
  ✅ Mapa con **carga bajo petición**: el iframe no existe hasta que el huésped lo pide, así que
  Google no recibe ninguna petición ni planta cookies antes del consentimiento — importa con
  E-PRIV abierto. Coordenadas visibles y enlace a Google Maps aparte. ⬜ Referencias físicas:
  parte de C-LLEG.
- **Y** responde "¿hay estacionamiento?" ✅ (gratuito, sujeto a disponibilidad — de su FAQ)
  "¿el taxi encuentra el hotel?" ⬜ (C-LLEG).

> ⚠️ **Estaba marcada ✅ y no cumplía ninguno de los tres criterios**: la página tenía una
> dirección, dos teléfonos y un botón. Peor, su `meta` prometía «cómo llegar desde el aeropuerto
> de Cancún», que no estaba escrito en ninguna parte. Lo destapó una revisión visual, no el
> tablero — un ✅ sólo vale si alguien contrastó la página contra sus propios criterios.

> **Por qué esta página rinde más de lo que parece:** *"cómo llegar a Tulum desde Cancún"*
> es de las búsquedas más frecuentes del viajero de esta zona, y casi ningún hotel la
> responde bien. Es tráfico calificado que la competencia está regalando.

---

# ÉPICA E5 — Calidad, migración y lanzamiento

**Sprint 5. Objetivo del sprint:** *que el sitio esté en producción, sin perder
posicionamiento y con vuelta atrás probada.*

### H5.1 — Auditoría WCAG 2.2 AA · `M` · ✅ *axe-core 4.13: **0 violaciones** en 22 páginas. Contraste sobre fotografía medido en el píxel. Falta sólo H5.4 (lector de pantalla real)*
- **Entonces** recorrido completo por teclado sin trampas de foco.
- **Y** recorrido con lector de pantalla real, no sólo con herramienta automática.
- **Y** todo contraste ≥ 4.5:1 verificado.
- **Y** cero errores en axe/Lighthouse a11y.

> Las herramientas automáticas detectan alrededor de un tercio de los problemas reales de
> accesibilidad. Por eso la revisión manual es requisito, no adorno.

### H5.2 — Core Web Vitals · `M` · ✅ *LCP 1.33–1.86 s · CLS 0.003 · TBT 0–26 ms. Medido con Lighthouse 13, móvil 4G simulada, 2026-08-21. INP real queda para H5.7*
- **Entonces** en móvil con red 4G simulada: **LCP < 2.5 s · INP < 200 ms · CLS < 0.1**.
- **Y** la medición queda registrada como evidencia con fecha.

### H5.3 — 🔴 Redirecciones 301 · `M` · ✅ *12 reglas, 25 URLs, 0 fallos, con prueba automatizada*
- **Entonces** toda URL indexada del sitio antiguo resuelve con **301** a su equivalente.
- **Y** también las 20 redirecciones `?p=<id>` ya vigentes detectadas en la auditoría.
- **Y** ninguna cadena de redirección tiene más de un salto.
- **Y** existe una prueba automatizada que recorre la lista completa.

> Sin esto, el rediseño destruye el posicionamiento acumulado desde 2008. **El mapa sólo se
> puede construir mientras exista el mirror**, por eso se levantó en el sprint 0.

### H5.4 — Pruebas en dispositivos reales · `S` · 🔴 *requiere hardware y lector de pantalla (Abraham)*
- Chrome, Safari y Firefox · iOS y Android físicos, no sólo emulador.

### H5.5 — Revisión de seguridad · `S` · ✅ *CSP estricta generada por hash en cada build*
- Cabeceras de seguridad y CSP · endpoint del formulario revisado · **cero secretos en el repositorio**.

### H5.6 — 🔴 Plan de reversión probado · `S` · ✅ *capa 1 ENSAYADA: reversión efectiva en ~6 s*
- **Dado** un fallo en producción, **cuando** se ejecuta la reversión, **entonces** el sitio anterior vuelve en **menos de 15 minutos**.
- **Y** el procedimiento se **ensaya antes** del lanzamiento, no se documenta y ya.

> El hotel vende 24/7. Un lanzamiento sin vuelta atrás convierte cualquier error en pérdida
> de reservas reales. **No se lanza en temporada alta** (pregunta A4).

### H5.7 — Lanzamiento y monitoreo · `S` · ⬜ *depende del dominio y de las respuestas del cliente*
- 72 horas de vigilancia · Search Console sin errores de rastreo · comprobación de las 301 en producción.

### H5.8 — Traspaso · `M` · 🔄 *runbook operativo, traspaso técnico y guion escritos; la sesión grabada la da Abraham*
- **Entonces** el manager sabe atender una solicitud de principio a fin.
- **Y** existe runbook operativo escrito.
- **Y** la sesión de capacitación queda grabada.

---

# ÉPICA E6 — Medición *(transversal)*

| # | Historia | Sprint | Estado |
|---|---|---|---|
| H6.1 | GA4 con medición de canal de origen | 1 | 🔴 falta el ID `G-…` |
| H6.2 | Search Console verificado y sitemap enviado | 5 | 🔴 requiere la cuenta de Abraham |
| H6.3 | Eventos de embudo: ver alojamiento → iniciar solicitud → enviar | 3 | 🔴 depende de H6.1 |
| H6.4 | Panel simple de reservas directas para el cliente | 5 | ⬜ depende de H3.4 |

> **Por qué es transversal y arranca en el sprint 1:** el cliente no tiene datos
> comparativos. Sin línea base no se puede demostrar mejora, sólo opinar que se ve mejor.
> Y el pasado no se puede medir retroactivamente: **cada semana sin instrumentar es una
> semana de datos que no existirá jamás.**

---

## Deuda técnica y riesgos vivos en el backlog

| # | Concepto | Cuándo se paga |
|---|---|---|
| D-1 | El módulo `booking/` es provisional por diseño (ADR-0003) | Cuando el cliente adopte un motor con channel manager |
| D-2 | Las fichas de alojamiento llevan datos estimados | Cuando el cliente responda C1 |
| D-3 | Sin CMS: el cliente no puede editar | Aceptado por escrito (F4). Reevaluar tras 6 meses |
| D-4 | Cuenta de ResNexus posiblemente activa y pagada (R-16) | Preguntar en la entrevista |
