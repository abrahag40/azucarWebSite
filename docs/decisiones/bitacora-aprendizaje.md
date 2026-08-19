# Bitácora de aprendizaje

> Registro acumulativo de lecciones profesionales del proyecto. **Una entrada por lección.**
> El objetivo es la repetición: se relee al iniciar cada fase.
> Formato: qué se aprendió · por qué es así · antipatrón evitado · cómo se llama la técnica.

---

## L-001 — Auditar antes de preguntar

**Lección.** El primer contacto con el cliente no se gasta en un cuestionario en blanco.
Primero se exprime todo el material que ya existe; el cuestionario nace de ahí.

**Por qué.** BABOK v3 define *Prepare for Elicitation* como tarea previa obligatoria y
lista el análisis de documentos como técnica de elicitación en sí misma. La atención del
cliente es un recurso finito: gastarla en preguntas que podíamos responder solos impide
gastarla en las que no.

**Antipatrón evitado.** *Blank-form syndrome*: mandar un formulario genérico de 60
preguntas. Resultado típico: abandono, o respuestas de una palabra que obligan a una
segunda ronda — y esa segunda ronda cuesta credibilidad.

**Técnicas con nombre:** *document analysis* (BABOK), *straw-man document*, *content inventory*.

---

## L-002 — Separar el instrumento según la naturaleza del dato

**Lección.** Un solo cuestionario para todo es un error de diseño. Los **datos duros**
(RFC, inventario, tarifas, políticas) van en documento asíncrono porque exigen consultar
archivos. La **estrategia** (objetivos, dolores, prioridades) va en entrevista síncrona
grabada porque es conocimiento tácito.

**Por qué.** BABOK distingue *Interviews* (alto ancho de banda, permite repreguntar y
detectar contradicciones) de *Survey/Questionnaire* (escala, bajo ancho de banda). Con un
solo interlocutor, la encuesta es el instrumento equivocado para descubrir; sirve para
recolectar.

**Antipatrón evitado.** Preguntar "¿cuáles son tus objetivos de negocio?" por escrito.
La respuesta será *"vender más"*, y no sirve para nada.

---

## L-003 — Auditar sobre un artefacto congelado, no sobre el sitio vivo

**Lección.** Se captura el sitio con HTTrack y se versiona el mirror; el análisis se hace
sobre esa copia.

**Por qué.** Un hallazgo sobre un sitio vivo no es verificable: mañana el sitio cambió y
tu auditoría no se puede reproducir ni defender. Con el mirror versionado, cualquiera
reproduce el hallazgo y se puede fechar el "antes" para comparar contra el "después".

**Antipatrón evitado.** Auditoría por screenshots sueltos y memoria.

**Nota de cortesía profesional:** el scraping contra el servidor de producción de un
cliente se hace con throttling (`-c2 -%c2`). Tumbarle el sitio al cliente durante la
auditoría es una falta profesional, no un detalle técnico.

---

## L-004 — Elegir la herramienta por el problema, no el problema por la herramienta

**Lección.** Burp Suite y Wireshark se omiten en la fase de auditoría de contenido. Para
un sitio público de marketing, DevTools da lo mismo con una fracción del esfuerzo, y
Wireshark sobre HTTPS entrega tráfico cifrado ilegible sin configurar `SSLKEYLOGFILE`.

**Por qué.** Herramienta sin pregunta que responder es teatro técnico. Cuesta tiempo,
infla la factura y no produce hallazgos.

**Cuándo sí:** más adelante, para depurar la integración con el motor de reservas
(redirecciones, cookies de terceros, qué datos se filtran al proveedor).

---

## L-005 — Convertir el encargo estético en un problema de negocio medible

**Lección.** El encargo llegó como "renovar el sitio". La auditoría encontró quejas
recurrentes de cobro distinto al publicado y de habitación distinta a la reservada. Eso
reformula el proyecto: no es un sitio más bonito, es **reducir disputas y reseñas
negativas** mediante contenido fiable, y **recuperar reservas directas** que hoy se van por
comisión a OTAs y sitios afiliados.

**Por qué.** Un entregable estético no se puede evaluar ni defender: "no me gusta el azul"
es una discusión infinita. Un entregable con métrica sí. Además, el rediseño deja de
competir contra el presupuesto de marketing y pasa a justificarse solo.

**Antipatrón evitado.** Aceptar el encargo tal como viene enunciado. El cliente describe
la solución que imagina; nuestro trabajo es encontrar el problema que hay debajo.

---

## L-006 — Conoce el estándar, luego decide desviarte y di por qué

**Lección.** Se pidió "usar Scrum". La respuesta profesional no fue ni obedecer ni negarse:
fue tomar las prácticas que resuelven un problema real de este proyecto y **omitir por
escrito** las que no, con justificación pieza por pieza.

**Por qué.** Scrum supone un Product Owner disponible con autoridad, un producto continuo y
un equipo de varias personas. Aquí no hay ninguna de las tres cosas: hay un hotelero
ocupado, un proyecto con fecha de fin y una o dos personas.

**Antipatrón evitado.** **Water-Scrum-Fall**: hacer cascada de siempre y llamarle "sprints"
a las fases. Se conservan los rituales y se pierde el único beneficio real del método.

**Prueba ácida, aplicable a cualquier proyecto:** *al final de cada iteración el cliente
debe poder abrir una URL y ver algo real.* Si el entregable es un PDF, era una fase de
cascada disfrazada.

**Regla portable:** desviarse del estándar sin conocerlo es ignorancia; no desviarse nunca
es dogma. Ninguna de las dos es criterio profesional.

---

## L-007 — Interroga también a tu propia organización

**Lección.** El levantamiento tiene dos frentes. Preguntas al cliente **y** preguntas hacia
adentro: capacidad real, modelo de contrato, mecanismo de cambio de alcance, quién mantiene
después, criterio para rechazar el proyecto.

**Por qué.** Un PM que sólo interroga al cliente gestiona la mitad del riesgo. Los proyectos
de consultoría chica rara vez mueren por un requerimiento mal entendido; mueren por
capacidad comprometida que no existía y por alcance que creció sin mecanismo para cobrarlo.

**Antipatrón evitado.** *Happy-path capacity planning*: planear sobre las horas que
quisieras tener.

**Ver:** `docs/02-requerimientos/preguntas-internas.md`

---

## L-008 — La Definition of Ready es el filtro que salva los sprints

**Lección.** Una historia no entra al sprint si su contenido — texto y fotos — no existe.

**Por qué.** En un sitio de hotel la ruta crítica es el contenido, no el código. Sin este
filtro los sprints se llenan de trabajo bloqueado esperando una sesión de fotos que nadie
agendó, terminan en cero y nadie sabe explicar por qué.

**Corolario:** la producción de contenido se gestiona como **carril paralelo** con fechas
propias desde el sprint 1, nunca como una historia dentro de un sprint. Si esperas "al
sprint del contenido", llegas al sprint 3 con *lorem ipsum*.

---

## L-009 — Escribir la DoD convierte la calidad en requisito de entrada

**Lección.** Accesibilidad, performance y SEO van dentro de la Definition of Done de **cada**
historia, no en una fase final de "optimización".

**Por qué.** Toda fase que vive al final se recorta cuando el calendario aprieta — y el
calendario siempre aprieta. Metido en la DoD, el trabajo no puede recortarse sin declarar
explícitamente que se está bajando el estándar, que es una conversación distinta y mucho
más difícil de tener en silencio.

**Antipatrón evitado.** *"Ya después le metemos accesibilidad."* Nunca ocurre, y retrofitear
accesibilidad cuesta varias veces más que construirla desde el inicio.

---

## L-010 — Las preguntas que deciden la arquitectura no son técnicas

**Lección.** Dos preguntas de negocio deciden el stack completo antes de escribir una línea:
*¿quién actualizará el contenido después del lanzamiento?* y *¿con qué motor de reservas
opera hoy?*

**Por qué.** Si nadie del hotel va a editar, un sitio estático es superior en costo,
velocidad y seguridad. Si el gerente sube promociones cada semana, hace falta CMS,
capacitación y manual. Elegir el stack antes de responder esto es construir sobre una
suposición — y es de las decisiones más caras de revertir.

**Antipatrón evitado.** Elegir la tecnología por preferencia del desarrollador y después
justificarla. La arquitectura se deriva de restricciones operativas, no de gustos.

---

## Riesgos abiertos

| # | Riesgo | Impacto | Acción |
|---|---|---|---|
| R-01 | **Licencia de la plantilla Cappa.** Publicar producción sobre un demo raspado sin licencia es exposición legal para nosotros y para el cliente | Alto | Definir quién compra la licencia **antes** de escribir código de producción |
| R-02 | Motor de reservas / PMS actual desconocido. Define el alcance completo | Alto | Pregunta prioritaria en la entrevista |
| R-03 | Calidad y derechos de la fotografía existente. En un hotel de playa, la foto **es** el producto | Alto | Inventariar en el mirror; preguntar si hay banco original y sesión reciente |
| R-04 | Posible ficha duplicada en TripAdvisor | Medio | Validar y proponer consolidación como victoria rápida |
| R-05 | NAP inconsistente (teléfono con lada de Monterrey en hotel de Tulum) | Medio | Validar con el cliente |
| R-06 | Titularidad del dominio `azucarhotel.com` desconocida. Puede estar a nombre de una agencia anterior | Alto | Verificar en el sprint 1, no en el lanzamiento |
| R-07 | Sin acceso a Analytics no hay línea base y no se puede demostrar la mejora | Medio | Solicitar accesos en la primera semana |
| R-08 | Cliente no cumple el SLA de 48 h y la cadencia quincenal se rompe | Alto | SLA escrito en contrato + pendientes del cliente visibles en cada demo |
| R-09 | Catálogo posiblemente sobre-segmentado (8 tipos para 21 unidades) reduce la conversión | Medio | Validar inventario real y proponer agrupación comercial |
