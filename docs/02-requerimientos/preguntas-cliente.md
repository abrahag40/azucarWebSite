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

**A2.** ¿Qué porcentaje de tus reservas entra hoy por OTA (Booking, Expedia, Airbnb) y qué
porcentaje directo? ¿Cuánto pagaste de comisión el año pasado, en pesos?
> 🎯 **La pregunta de ROI del proyecto entero.** Si paga, digamos, $600k MXN al año en
> comisiones, mover 10 puntos porcentuales a directo paga el rediseño varias veces. Sin
> este número, nuestro trabajo se discute como gasto estético; con él, como inversión.

**A3.** ¿Cuál es tu tarifa promedio (ADR) y tu ocupación por temporada?
> Permite calcular el valor de **una** reserva directa incremental. Es la unidad en la que
> se debe expresar cada decisión de diseño.

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

## BLOQUE B — Reservas y tecnología · ENTREVISTA
> 🔴 **Bloque más importante del levantamiento.** Sus respuestas determinan el alcance,
> el precio y el plazo. Si sales de la reunión sin B1–B4 respondidas, la reunión falló.

**B1.** ¿Con qué **PMS** operas hoy? (ResNexus, Cloudbeds, Little Hotelier, Hotelogix,
Siteminder… o una hoja de cálculo)

**B2.** ¿Con qué **motor de reservas**? Detectamos el dominio `azucarhoteltulum.sys-rsrv.com`.
¿Lo reconoces? ¿Contrato vigente, hasta cuándo, cuánto cuesta al mes o por comisión?
> Define el proyecto entero: **sitio de marketing que enlaza a un motor externo** vs.
> **sitio que integra un motor**. Son dos proyectos distintos en alcance, precio y plazo.

**B3.** ¿Usas **channel manager**? ¿Quién carga tarifas y disponibilidad, y cada cuánto?
> Si la carga es manual, el sitio nuevo hereda ese cuello de botella. Hay que saberlo antes
> de prometer "disponibilidad en tiempo real".

**B4.** ¿Aceptas pago en línea hoy? ¿Con qué pasarela? ¿Cobras anticipo, garantía o el total?
> Pagos = requisito regulado (PCI-DSS del lado del proveedor) y el punto de mayor fricción
> de conversión. No se improvisa en sprint 4.

**B5.** ¿Por qué **no** se concretó la propuesta de la agencia anterior con ResNexus?
> 😬 Pregunta incómoda, obligatoria. Te dice el criterio real de decisión del cliente, dónde
> está su umbral de precio, y qué comportamiento de proveedor no tolera. Es la forma más
> barata de no repetir el fracaso ajeno.

**B6.** ¿Vendes o quieres vender algo más en línea: spa, tours, transportación aeropuerto,
day pass o beach club, eventos y bodas?
> Las bodas y eventos suelen ser el segmento de mayor margen en hotelería boutique y casi
> siempre están subrepresentados en el sitio. Vale la pena preguntarlo explícitamente.

---

## BLOQUE C — Contenido y activos · BRIEF ASÍNCRONO
> El **contenido es la ruta crítica** de todo proyecto web de hotel, no el código. Este
> bloque se entrega junto con una carpeta de Drive para subir archivos.

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

**F2.** ¿Cuál es el presupuesto disponible y el modelo que prefieres: alcance cerrado a
precio cerrado, o entregas iterativas con bolsa de horas?
> Ver ADR-0002: la respuesta cambia el marco de trabajo contractual.

**F3.** ¿Hay una fecha ancla? (temporada, aniversario, campaña, fin de contrato con proveedor)

**F4. 🔴 Después del lanzamiento, ¿quién actualiza el contenido — tarifas, fotos,
promociones? ¿Alguien del hotel, nosotros, o nadie?**
> **Esta pregunta decide la arquitectura técnica completa.** Si nadie del hotel va a
> editar, un sitio estático rápido y barato es superior. Si el gerente va a subir
> promociones cada semana, necesitamos CMS, capacitación y manual. Elegir el stack antes
> de responder esto es construir sobre una suposición.

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
