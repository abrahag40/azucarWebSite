# Preguntas clave para el cliente — Azúcar Hotel Tulum

> **Estado:** borrador previo a la auditoría HTTrack. Las respuestas marcadas 🔸 son
> **hipótesis pre-llenadas** por nosotros a partir del descubrimiento: el cliente sólo
> valida o corrige. Técnica: *straw-man document* (ver ADR-0001).
>
> **Se entrega en dos instrumentos distintos.** No es un solo cuestionario:
>
> | Instrumento | Bloques | Canal |
> |---|---|---|
> | **Brief pre-llenado** (documento colaborativo + carpeta de assets) | C, D, E | Asíncrono |
> | **Entrevista guiada 45–60 min, grabada** | A, B, F | Síncrono |
>
> **Regla de oro:** nunca preguntes por escrito algo cuya respuesta esperada sea una
> narrativa ("¿cuáles son tus objetivos?"). Te devuelven *"vender más"* y no sirve.

---

## BLOQUE A — Negocio y objetivos · ENTREVISTA

> Objetivo del bloque: convertir "quiero un sitio bonito" en un problema medible.

**A1.** Imagina que estamos a 12 meses del lanzamiento y el sitio fue un éxito rotundo.
¿Qué cambió en tu operación diaria que hoy te duele?
> *Técnica: pregunta de resultado (outcome question).* Impide que responda con soluciones
> ("un carrusel") y lo obliga a hablar de consecuencias. Si la respuesta no es medible,
> repregunta: *"¿cómo lo sabrías?"*

**A2.** ¿Por dónde te entran hoy las reservas y cuál sientes que domina: Booking, Expedia,
Airbnb, WhatsApp, teléfono, correo? Aunque sea a percepción, sin cifras.
> ⚠️ **Ajustada.** El cliente **no lleva registro comparativo** de OTA vs. directo ni de
> comisiones pagadas. Se pregunta por **percepción ordenada**, no por números.
> **Consecuencia de proyecto:** sin línea base no se puede demostrar la mejora después.
> Por eso instrumentar analítica y medir el canal de origen deja de ser un "extra" y pasa a
> ser **entregable del sprint 1**: estamos construyendo el dato que hoy no existe.
> *Lección: cuando el cliente no tiene el dato, el trabajo no es exigírselo — es crearlo.*

**A3.** ¿Qué meses se te llenan solos y en cuáles batallas?
> Sustituye a la pregunta por ADR y ocupación, que el cliente no tiene documentados. La
> estacionalidad sí la conoce de memoria y es suficiente para priorizar.

**A4.** ¿Cuál es tu temporada alta y en qué ventana **no podemos** lanzar bajo ninguna circunstancia?
> 🔸 Hipótesis: alta = diciembre–abril (Riviera Maya) + Semana Santa. Lanzar en pico de
> ocupación es autolesión: si algo falla, falla cuando más cuesta.

**A5.** Descríbeme al huésped que quieres llenar el hotel. Y al que **no** quieres.
> El segundo dato vale más que el primero y casi nadie lo pregunta. Define tono, precio
> y qué NO comunicamos.

**A6.** Nombra tus 3 competidores directos en la Zona Hotelera. ¿Qué les envidias del sitio web?
> Análisis competitivo dirigido por el cliente. Nos ahorra semanas de suposiciones.

**A7.** ¿Qué del sitio actual te da orgullo y **no** quieres perder?
> Evita destruir equity de marca. Un rediseño que borra lo que el cliente ama termina
> rechazado aunque sea objetivamente mejor.

**A8.** Las reseñas mencionan de forma recurrente dos cosas: cobros distintos a lo publicado,
y habitación entregada distinta a la reservada. ¿Lo reconoces? ¿de dónde crees que viene?
> ⚠️ Pregunta delicada — se hace **al final** del bloque, ya con confianza construida, y se
> plantea como problema compartido, no como acusación. Es la puerta al verdadero valor del
> proyecto (ver bloque C, tarifas e impuestos).

---

## BLOQUE B — Operación de reservas · ENTREVISTA
> ✅ **Parcialmente resuelto.** El cliente ya confirmó: **no usa PMS, no usa channel
> manager, y el manager actualiza cada OTA a mano.** Quiere que el huésped pueda reservar
> desde el sitio. Eso define la arquitectura — ver
> [ADR-0003](../decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md).
> Lo que queda por preguntar son las condiciones de operación del flujo.

**B1. 🔴 ¿Cuál es el tiempo de respuesta a una solicitud de reserva que puedes cumplir
siempre?** (2 h en horario · 12 h · 24 h)
> Es una promesa pública. Publicar un tiempo y no cumplirlo es peor que no publicarlo.

**B2. ¿Quién responde las solicitudes, en qué horario, y quién cubre fines de semana?**
> **Condición de éxito del lanzamiento.** Si nadie responde en horas, el sitio genera
> frustración en vez de reservas. No es un detalle operativo: es un requisito.

**B3.** ¿Con qué pasarela de pago cuentas o puedes contratar? (Stripe, Mercado Pago, Clip,
Conekta, PayPal)
> El cobro se hace por **enlace de pago** enviado por el hotel: nosotros no tocamos datos de
> tarjeta y así el proyecto **queda fuera del alcance de PCI-DSS**. Es una decisión
> deliberada de reducción de riesgo, no una limitación.

**B4.** ¿Cuáles son el correo y el WhatsApp oficiales para recibir solicitudes?

**B5.** ¿Vendes o quieres vender algo más: spa, tours, transportación al aeropuerto,
day pass o beach club, bodas y eventos?
> Bodas y eventos suelen ser el segmento de mayor margen en hotelería boutique y casi
> siempre están subrepresentados en el sitio.

**B6.** ¿Por qué **no** se concretó la propuesta de la agencia anterior con ResNexus?
> 😬 Incómoda y obligatoria. Te dice el criterio real de decisión del cliente y qué
> comportamiento de proveedor no tolera. La forma más barata de no repetir el fracaso ajeno.

**B7.** Te vamos a presentar, sin compromiso, el costo/beneficio de un motor de reservas
con *channel manager* (~USD 50–150/mes). Resolvería de raíz el riesgo de vender dos veces
la misma habitación. ¿Lo revisamos después del lanzamiento?
> Se plantea como recomendación registrada, no como venta. Si el cliente la declina hoy,
> queda por escrito que se advirtió — y ese registro protege a ambas partes.

## BLOQUE C — Contenido y activos · BRIEF ASÍNCRONO
> El **contenido es la ruta crítica** de todo proyecto web de hotel, no el código. Este
> bloque se entrega junto con una carpeta de Drive para subir archivos.

**C0. 🔴 ¿Hay restaurante, bar y spa? (URGENTE — su propio sitio se contradice.)**
> Al construir el catálogo se encontró que el contenido publicado hoy en
> `azucarhotel.com` se contradice a sí mismo:
>
> | Página | Qué dice |
> |---|---|
> | `/servicios/` | Lista «Restaurante.» y «Spa.» |
> | `/amenidades-y-facilidades/` | «Restaurante y Bar "Blanc" nuestro icónico Roof Top frente al mar» y «Spa» |
> | `/preguntas-frecuentes/` | **«¿Tienen restaurante o bar? Por ahora no tenemos servicio de restaurante o bar»** |
>
> Además, `/restaurante/` y `/spa/` **no existen como páginas** pese a figurar en el menú, y
> el roof top aparece con dos nombres distintos: «Blanc» en amenidades y **«Selvamar»** en el
> FAQ.
>
> **Qué se hizo mientras tanto.** Se han retirado del sitio nuevo las dos amenidades y se ha
> eliminado `Restaurant` de los datos estructurados de `schema.org`, que se estaban emitiendo
> a Google en 20 páginas. Anunciar un restaurante que quizá no existe es la promesa
> incumplida que este proyecto viene a corregir, y la regla 7 es explícita: dato sin
> confirmar, dato que no se publica.
>
> **Qué hace falta:** ¿hay hoy restaurante, bar y spa, sí o no? Si los hay, ¿con qué nombre y
> horario? Si no, hay que corregir `/servicios/` y `/amenidades/` **del sitio vigente**, que
> llevan la afirmación publicada ahora mismo.

**C1. Inventario de alojamiento (tabla a llenar).** Para cada tipo:
nombre oficial · nº de unidades · capacidad máx · configuración de camas · m² ·
vista · amenidades diferenciadoras · qué lo distingue del inmediato inferior.
> 🔸 Hipótesis a validar: **21 habitaciones en 8 tipos**. Si son 8 tipos para 21 unidades, el
> catálogo puede estar sobre-segmentado: demasiadas opciones **reducen** la conversión
> (paradoja de la elección — Iyengar & Lepper, 2000). Posible recomendación: agrupar en
> 4–5 categorías comerciales.

**C2. Tarifas por temporada y por tipo**, con temporadas y fechas exactas.
Y de forma explícita: **qué incluye y qué NO incluye.**

**C3. 🔴 Impuestos y cargos.** ¿Cuáles aplican y cuáles se muestran en el precio publicado?
IVA (16 %) · ISH — Impuesto Sobre Hospedaje de Quintana Roo · derecho de saneamiento
ambiental del municipio de Tulum · cargo por servicio · propinas.
> **Esta pregunta es la causa raíz probable de las quejas de "me cobraron más".** Si el
> precio publicado es neto y los impuestos aparecen al final, la expectativa se rompe. Es
> un problema de contenido con solución de contenido — y es el argumento que convierte
> este proyecto de estético a operativo.

**C-LLEG. Cómo llegar, con datos reales.** (nueva, 2026-08-24)
- ¿Cuánto se tarda del **aeropuerto de Cancún** al hotel, y qué rango de costo tiene un
  traslado privado? ¿Recomiendan mejor el **aeropuerto de Tulum**?
- El **traslado aeropuerto–hotel–aeropuerto** aparece como opción en el formulario de su sitio
  vigente: ¿lo opera el hotel o lo subcontrata? ¿Qué tarifa tiene?
- ¿Hay alguna **referencia física** que ayude a encontrarlo desde la carretera? ¿El taxi lo
  ubica dando sólo la dirección?
> Es la información que falta para cumplir H4.5, que pide «opciones reales con tiempos y rangos
> de costo». Se publicó lo confirmable —kilómetro, estacionamiento, recepción 24 h, que el
> traslado existe— y **no se inventaron tiempos**: un «1 h 45 min» que en temporada alta son
> tres horas es la misma promesa incumplida que este proyecto vino a corregir.
> **Rinde más de lo que parece:** *"cómo llegar a Tulum desde Cancún"* es de las búsquedas más
> frecuentes del viajero de la zona, y casi ningún hotel la responde bien.

**C4. Políticas por escrito:** cancelación y reembolso · check-in / check-out · niños ·
mascotas · no-show · depósito o garantía · fumar · edad mínima.

**C5. 📸 Fotografía y video.**
- ¿Existe el banco original en alta resolución (no las versiones comprimidas del sitio)?
- ¿Fecha de la última sesión profesional?
- ¿El contrato con el fotógrafo **cede los derechos de uso** o sólo licencia limitada?
- ¿Hay video, dron, o recorrido 360°?
> ⚠️ **Riesgo R-03.** En un hotel de playa la foto *es* el producto. Si el material es viejo
> o de baja calidad, el rediseño más elegante del mundo se ve barato. Y si los derechos no
> están cedidos, el cliente puede recibir una reclamación después del lanzamiento. Se
> pregunta **antes**, no después.

**C6. Restaurante y bar:** ¿nombre propio? ¿menú y horarios? ¿abierto a público externo?
¿hay beach club o day pass?

**C7. Idiomas:** 🔸 confirmado ES + EN. ¿Se requiere alguno más? (el mercado de Tulum
justifica evaluar francés y portugués)

---

## BLOQUE D — Marca · BRIEF ASÍNCRONO

**D1.** ¿Existe manual de identidad? Logotipo en **vectorial** (.ai / .svg / .eps), no un PNG.
**D2.** ¿Las tipografías de marca están licenciadas para uso web (webfont)?
> Diferencia legal real: una licencia de escritorio **no** cubre el uso en un sitio web.
**D3.** Una reseña describe al hotel como *"the anti-resort"*. ¿Te reconoces en esa frase?
> Sirve para calibrar tono de voz con una formulación que vino de un huésped real, no de
> nuestra imaginación. Si dice que sí, ahí está la línea editorial del sitio completo.

---

## BLOQUE E — Legal, accesos y activos digitales · BRIEF ASÍNCRONO

**E-PRIV. 🔴 El aviso de privacidad actual no cumple la LFPDPPP.** *(Requisito de entrada
del sprint 3.)*
> El sitio vigente publica en `/politica-de-privacidad/` una **plantilla genérica de política
> de privacidad**, vigente desde el 1 de enero de 2022. No es un aviso de privacidad conforme
> a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Le
> faltan, al menos:
>
> - Identidad y **domicilio del responsable**
> - Los **derechos ARCO** nombrados —acceso, rectificación, cancelación, oposición— y el
>   procedimiento para ejercerlos
> - El **mecanismo para revocar el consentimiento**
> - La distinción entre **finalidades primarias y secundarias**, y cómo oponerse a las segundas
>
> Además, la versión inglesa `/en/privacy-policy/` **sirve el texto en español sin traducir**,
> y el aviso remite a `info@azucarhotel.com` mientras el resto del sitio usa
> `contacto@azucarhotel.com`. Conviene unificar: es la dirección donde alguien ejerce sus
> derechos.
>
> **Qué se hizo mientras tanto.** El texto se ha trasladado al sitio nuevo —traducido de
> verdad al inglés— porque es mejor que no tener nada y porque arreglaba un enlace roto. **No
> se publica como si cumpliera.**
>
> **Por qué el plazo es el sprint 3 y no el lanzamiento:** hoy el sitio nuevo **no recoge
> ningún dato personal**, porque todavía no hay formulario. En el sprint 3 empieza a
> tratarlos, y ahí el aviso conforme deja de ser recomendable y pasa a ser obligatorio.
>
> **Qué hace falta:** un aviso redactado o revisado por abogado. No es trabajo que podamos
> hacer nosotros.


> Bloque aburrido y el que más proyectos descarrila en la semana del lanzamiento.

**E1.** Razón social, RFC y domicilio fiscal.
> Necesarios para el **aviso de privacidad** y los términos y condiciones.

**E2. 🔴 ¿A nombre de quién está registrado el dominio `azucarhotel.com`? ¿En qué
registrador? ¿Tienes tú las credenciales?**
> **El riesgo silencioso número uno de este tipo de proyectos.** Es frecuentísimo que el
> dominio esté a nombre de una agencia anterior o de un exempleado. Si se descubre el día
> del lanzamiento, el proyecto se detiene semanas. Se verifica en el **primer** sprint.

**E3.** Hosting actual: proveedor, plan, contrato vigente, credenciales.

**E4.** ¿Tienes acceso administrador a: Google Business Profile · Google Analytics ·
Search Console · Google Ads · Meta Business Suite?
> 🔸 Detectamos que Google Business Profile probablemente exista. Sin acceso a Analytics no
> hay **línea base**, y sin línea base no se puede demostrar la mejora. Conseguirlo es
> tarea del sprint 1, no del final.

**E5.** ¿Existe aviso de privacidad publicado?
> Obligatorio en México: **LFPDPPP** (Ley Federal de Protección de Datos Personales en
> Posesión de los Particulares). Si el sitio captura datos por formulario, es requisito
> legal, no opcional. Recibir huéspedes extranjeros añade la consideración de GDPR para
> visitantes de la UE.

**E6.** Detectamos estos dominios de terceros vendiendo el hotel:
`azucar.therivieramayahotels.com`, `azucar.tulum-hotels.net`, `azucar.tulumtownhotels.com`,
`azucar.hotels-quintana-roo.com`. **¿Los autorizaste?**
> Si no, están capturando tráfico de tu marca y cobrando comisión sobre reservas que
> deberían ser directas. Hay acciones concretas que se pueden tomar.

**E7.** ¿Tienes acceso a las fichas de TripAdvisor? Detectamos **dos** posibles fichas del
mismo hotel, lo que fragmenta tu calificación.
> Victoria rápida de costo casi cero si se confirma.

**E8.** ¿Quién administra las redes sociales? ¿Interno o externo?

---

## BLOQUE F — Proyecto, decisión y presupuesto · ENTREVISTA

**F1. ¿Quién decide?** Nombre y apellido de **una** persona. ¿Hay alguien más que pueda
vetar una decisión ya aprobada?
> El *stakeholder oculto que aparece al final* es una causa clásica de retrabajo. Se
> identifica al principio o se paga después.

*(F2 — presupuesto y modelo contractual: **cerrado fuera de este documento**. No se pregunta.)*

**F3.** ¿Hay una fecha ancla? (temporada, aniversario, campaña, fin de contrato con proveedor)

**F4. 🔄 REABIERTA (2026-08-22) — Después del lanzamiento, ¿quién actualiza el contenido?**
> **Respuesta original, confirmada en el sprint 0:** *lo gestiona Abraham*, no personal del
> hotel. El equipo del hotel atiende OTAs y solicitudes, no el sitio.
> **Consecuencia de esa respuesta:** no se requiere CMS. Habilitó el stack estático del
> [ADR-0004](../decisiones/ADR-0004-stack-tecnico.md).
>
> 🔴 **Por qué se reabre:** el 2026-08-22 se pidió un panel para que **el hotel** actualice
> precios ([ADR-0007](../decisiones/ADR-0007-panel-de-precios.md)). Eso es la premisa de F4 al
> revés. La respuesta nueva —y la que hay que **reconfirmar con el cliente**, no asumir— es una
> frontera intermedia:
>
> | Quién | Qué edita |
> |---|---|
> | **El hotel** | **Precios**, y sólo precios, desde el panel |
> | **Abraham** | Todo lo demás: textos, fotos, páginas, estructura |
>
> Se conserva escrita, igual que antes, porque **debe quedar aceptado explícitamente hasta
> dónde llega lo que el cliente puede editar por su cuenta.** Lo asumido sin escribir es la
> queja del mes tres — y ahora hay dos fronteras que confundir en vez de una.

**F5.** La plantilla Cappa es comercial. ¿La licencia se compra a nombre del hotel, o la
adquirimos nosotros y se factura dentro del proyecto?
> Riesgo R-01. Se resuelve **antes** de escribir código de producción.

---

## Cómo se conduce la entrevista (nota metodológica)

1. **Grábala, con permiso explícito.** Tomar notas te impide escuchar.
2. **Regla 80/20:** el cliente habla el 80 % del tiempo.
3. **Pregunta abierta primero, cerrada después.** Cerrar demasiado pronto contamina la
   respuesta con nuestra hipótesis.
4. **Repregunta "¿por qué?" hasta tres veces** ante cada requerimiento. Técnica: *5 Whys*.
   *"Quiero un carrusel en el home"* → *"¿por qué?"* → *"para mostrar las habitaciones"* →
   *"¿por qué en el home?"* → *"porque nadie llega a la página de habitaciones"*. El
   requerimiento real era de navegación, no un carrusel. **Nunca aceptes la primera
   formulación: el cliente describe la solución que imagina, no el problema que tiene.**
5. **Cierra repitiendo lo que entendiste**, en voz alta, y pide corrección. Técnica:
   *reflective listening / playback*. Aquí es donde aparecen los malentendidos, gratis.
6. **Envía la minuta en 24 h** con decisiones y pendientes con responsable y fecha. Lo que
   no se escribe, no se acordó.
