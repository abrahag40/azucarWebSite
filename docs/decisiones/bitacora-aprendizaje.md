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

## L-011 — Un requerimiento del cliente puede ser imposible: el trabajo es encontrar qué quiso decir

**Lección.** El cliente pidió "que el huésped reserve desde el sitio" y a la vez informó que
no tiene PMS ni channel manager y actualiza las OTAs a mano. Confirmación instantánea sobre
ese estado produce **sobreventa por diseño**: no es un bug, es aritmética de inventario
compartido sin sincronización.

**Por qué.** La respuesta profesional no fue obedecer ("sí, ponemos calendario") ni negarse
("no se puede"). Fue separar la **intención** — que el huésped pueda iniciar la reserva sin
irse a Booking — de la **implementación** que el cliente imaginó, y satisfacer la intención
con *request-to-book*.

**Antipatrón evitado.** *Order-taking*: implementar literalmente lo pedido y entregar un
sistema que rompe la operación del cliente. El desastre habría llegado en temporada alta y
con nuestro nombre encima.

**Detalle que lo hace más grave:** la auditoría ya había detectado la queja "habitación
distinta a la reservada". Construir confirmación instantánea habría **amplificado el
problema que nos contrataron a resolver.**

---

## L-012 — Una decisión provisional deja de ser deuda técnica cuando se aísla y se documenta

**Lección.** El flujo de reserva manual vive detrás de un módulo `booking/` con interfaz
definida. Ningún otro componente conoce su implementación. Migrar a un motor SaaS es
sustituir ese módulo.

**Por qué.** Sabemos que esta decisión va a cambiar. Lo que convierte "solución temporal" en
deuda técnica no es ser temporal: es estar **entrelazada** con todo lo demás y no estar
documentada como temporal.

**Técnica:** *anti-corruption layer* (Eric Evans, *Domain-Driven Design*). Se aísla la
decisión volátil detrás de una frontera estable para que el cambio previsto sea contenido.

---

## L-013 — Cuando el cliente no tiene el dato, el trabajo no es exigírselo: es crearlo

**Lección.** El cliente no lleva registro de reservas directas vs. OTA ni de comisiones. En
vez de insistir, la analítica se convirtió en **entregable del sprint 1**.

**Por qué.** Sin línea base no se puede demostrar que el trabajo sirvió: sólo opinar que se
ve mejor. Y cada semana sin instrumentar es una semana de datos que no existirá jamás — el
dato del pasado no se puede recuperar retroactivamente.

**Antipatrón evitado.** Dejar la medición para el final "cuando ya esté el sitio". Para
entonces sólo tienes el después, sin el antes, y no puedes probar nada.

---

## L-014 — Documento interno y documento de cliente son artefactos distintos

**Lección.** El banco de preguntas del repositorio cita a BABOK, nombra antipatrones y
explica técnicas. El `.docx` que recibe el cliente no contiene **nada** de eso: sólo
preguntas claras, hallazgos explicados en su idioma y el porqué en términos de su negocio.

**Por qué.** El mismo contenido, dos audiencias, dos objetivos. Al cliente el vocabulario
metodológico no lo tranquiliza: lo distancia, y a veces lo lee como intento de impresionar.
Lo que sí lo compromete es ver que ya hicimos la tarea sobre **su** hotel.

**Antipatrón evitado.** Exportar el documento interno con un cambio de portada. Se nota
siempre, y baja la tasa de respuesta.

**Detalle deliberado:** el brief incluye "no nos mandes contraseñas por este documento".
Un cliente confiado manda credenciales por WhatsApp; instruir el canal seguro **antes** de
que ocurra es parte del trabajo.

---

## L-015 — Entregué automatización cuyo fallo era indistinguible del éxito

**Lección.** El script de ingesta terminaba imprimiendo *"Siguiente paso: git add / commit /
push"* y salía con código 0. Abraham leyó ese final limpio como éxito. Los 21 MB quedaron en
disco sin publicar y perdimos dos rondas.

**Por qué.** Cuando se entrega automatización, **el modo de fallo es parte del entregable**.
Un script que falla en silencio convierte un error detectable en una suposición equivocada,
y el costo se paga más tarde y más caro.

**Corregido:** `trap ERR` con banner y número de línea, verificación de que la ingesta
produjo archivos antes de publicar, y "no hay cambios" pasa de salida limpia a error.

---

## L-016 — Diagnosticar antes de reproducir es adivinar con buena letra

**Lección.** Ante el fallo de ingesta encontré una causa plausible —SIGPIPE en
`tail | head` bajo `set -o pipefail`— y la anuncié con seguridad. Monté el fixture, la
reintroduje deliberadamente y **el script no falló**: con 450 archivos la salida cabe en el
buffer de 64 KB de la tubería y `tail` nunca recibe SIGPIPE. La hipótesis era falsa.

**Por qué.** Una explicación plausible y una explicación verdadera se sienten igual desde
dentro. Lo único que las distingue es la reproducción. Anunciar la primera como si fuera la
segunda gasta credibilidad que después hace falta.

**El defecto se corrigió igual**, pero etiquetado como lo que es: riesgo latente que depende
del volumen, no la causa del fallo observado.

**Antipatrón evitado:** *diagnóstico por plausibilidad*.

---

## L-017 — El fixture de prueba debe parecerse al dato real en la dimensión que importa

**Lección.** La primera prueba del auditor usó 7 archivos y pasó limpia. Con datos reales
—428 archivos— aparecieron dos defectos: contaba como páginas los 20 stubs de redirección
de HTTrack, inflando todas las métricas, y leía `@type` sólo al primer nivel, sin ver el
`@graph` de Yoast.

**Por qué.** Un fixture pequeño prueba que el código *corre*, no que *acierta*. Los defectos
de un analizador viven en la variedad y el volumen de la entrada, que es justo lo que un
fixture cómodo no tiene.

**Consecuencia concreta:** de no corregirlo, el informe habría dicho *"24 páginas sin meta
viewport"* cuando la cifra real es 4. Entregarle al cliente una cifra inflada por seis
destruye la credibilidad de todo el resto del documento — incluido lo que sí es verdad.

---

## L-018 — Una auditoría que sólo encuentra defectos no es rigurosa, es tendenciosa

**Lección.** Habíamos planteado como hipótesis que la fotografía estaría vieja o mal
comprimida, y llegamos a incluir en el brief la recomendación de considerar una sesión
nueva. El mirror la desmintió: 244 de 251 imágenes en WebP, la más pesada de 195 KB,
subidas en 2025. La recomendación se retiró.

**Por qué.** El sesgo profesional empuja a encontrar problemas: justifican el encargo. Pero
una recomendación de gasto basada en una hipótesis no verificada es exactamente lo que
destruye la confianza cuando el cliente descubre que no hacía falta.

**Regla portable:** en todo informe de auditoría, la sección *"lo que ya está bien"* es
obligatoria. Y cuando el dato contradice una hipótesis propia, **se retira por escrito y se
dice que se retira**, no se deja morir en silencio.

---

## L-019 — Los hallazgos de mayor valor no son los que fuiste a buscar

**Lección.** La auditoría buscaba SEO, rendimiento y accesibilidad. El hallazgo dominante
resultó ser un formulario de Contact Form 7 que captura número de tarjeta **y CVV**: una
violación frontal de PCI-DSS 3.3.1 y 4.2.1, y un pasivo legal activo del cliente hoy mismo.

**Por qué.** Aparece porque la auditoría fue **exhaustiva y automatizada**: se revisaron los
24 formularios del sitio, no los tres que a alguien se le habría ocurrido mirar a mano.

**Consecuencia de método:** el control quedó incorporado al auditor, así que cualquier
captura futura lo detecta sola. *Un hallazgo valioso encontrado a mano es suerte; el mismo
hallazgo codificado como control es capacidad.*

---

## L-020 — Advertir y documentar es la postura correcta; construirlo, no

**Lección.** Encontramos un incumplimiento serio en el sitio del cliente. La postura correcta
no es imponer la corrección ni callarla: es **informar con evidencia, ofrecer opciones y
dejar que el cliente decida por escrito**. El hotel tiene la relación con su banco, conoce su
operación y asume sus riesgos. Nosotros somos el proveedor de software, no su tutor.

**Por qué funciona.** El instrumento es un **acuse de aceptación de riesgo** (*risk
acceptance sign-off*), práctica estándar en consultoría de seguridad: se documenta el
hallazgo, se ofrecen alternativas con costo y esfuerzo, y se registra la decisión firmada.
Protege al cliente —decide informado— y protege al proveedor —queda constancia de que se
advirtió—. *Lo que no se escribe, no se advirtió.*

**Dónde está el límite, y hay que nombrarlo.** Advertir y documentar cubre el pasado. Pero
si el cliente pidiera **replicar el mismo mecanismo en el sitio nuevo**, ahí ya no seríamos
observadores: seríamos quienes lo construyen. Eso sí se declina, y se ofrece la alternativa
conforme —enlace de pasarela, que además ya era nuestra decisión de arquitectura
(ADR-0003)—. La distinción es limpia: **no somos responsables de lo que encontramos; sí de
lo que construimos.**

**Antipatrón evitado por ambos lados.** *Callarlo* para no incomodar al cliente que pagó
anticipo, e *imponerlo* como condición para continuar. El primero deja al cliente expuesto
sin saberlo; el segundo convierte un servicio en un ultimátum y ninguna de las dos cosas es
asesoría.

---

## L-021 — En un proceso por lotes, cada elemento se aísla

**Lección.** El script de ingesta procesaba tres capturas en un bucle con `set -e`. La
primera salió bien; algo falló en la segunda y **el script murió llevándose la tercera por
delante**. Resultado: una captura de tres, y dos rondas más de ida y vuelta.

**Por qué.** `set -e` es correcto para un proceso lineal donde cada paso depende del
anterior. En un lote de elementos **independientes** es exactamente lo contrario de lo que
quieres: un fallo local se convierte en fallo total. Cada elemento va en su propio subshell,
se recoge su código de salida, y al final se reporta qué salió y qué no — y se publica lo
que sí salió.

**Detalle técnico que costó una prueba descubrir:** en bash, `set +e` **no silencia el trap
`ERR`**. Son mecanismos independientes. El trap seguía gritando "error inesperado" en un
fallo que ya estaba manejado. Se suprime poniendo el comando en contexto de condición
(`if ( ... ); then`), donde bash no dispara `ERR` por diseño.

**Antipatrón evitado:** *all-or-nothing batch*. Y su síntoma característico: el usuario cree
que el lote falló entero cuando en realidad falló un elemento, o —peor, que es lo que nos
pasó— cree que salió entero cuando salió sólo el primero.

**Segundo efecto, igual de importante:** ahora todo queda en `investigacion/ingest.log`. La
próxima vez no habrá que deducir qué pasó: estará escrito.

---

## L-022 — Ante una credencial ajena: redactar, nunca suprimir la protección

**Lección.** GitHub bloqueó el push porque la captura de ResNexus contiene tokens de Mapbox
incrustados en el HTML. GitHub ofrece un enlace para autorizar el push de todos modos.
**No se usa.**

> ⚠️ **Corrección posterior.** Se afirmó que eran tokens **secretos** (`sk.`) porque así los
> etiqueta el detector de GitHub: *"Mapbox Secret Access Token"*. Al ingerir la captura, el
> reporte de redacción mostró que los 12 son **`pk.` — públicos**, que Mapbox diseña
> explícitamente para ir en el cliente. La redacción siguió siendo correcta, pero la
> severidad era mucho menor de lo anunciado.
>
> **Es la segunda vez en esta fase que afirmo una causa antes de tener el dato** (ver
> L-016). El patrón es el mismo: una fuente plausible —ahí una hipótesis técnica, aquí la
> etiqueta de una herramienta— tomada como verificación. *Una herramienta que nombra un
> hallazgo no lo ha clasificado por ti.*

**Por qué.** Ese enlace no arregla nada: publica una credencial ajena y viva en un
repositorio, y encima la deja en el historial de git para siempre, donde ya no se borra con
un commit. Que la fuga la haya causado su dueño no nos autoriza a amplificarla.

**Solución correcta: redactar el valor y conservar el hallazgo.** El token se sustituye por
`[[REDACTADO:tipo]]` y se registra archivo, línea y tipo en `secretos-redactados.md`. Para
el análisis sirve exactamente igual —lo que importa es *que existe*, no cuál es— y no
propagamos nada. Quedó incorporado a la ingesta, así que aplica sola a toda captura futura.

**Antipatrón evitado:** *silenciar el control en vez de resolver la causa*. Es el mismo
reflejo que desactivar un test que falla o poner `# noqa`: quita el aviso y deja el problema,
sólo que ahora sin aviso.

**Lo que sí sobrevive de la lección:** ante cualquier credencial ajena, redactar y conservar
el hallazgo, nunca suprimir el control. Y quedó incorporado a la ingesta, así que aplica
sola a toda captura futura.

---

## Riesgos abiertos

| # | Riesgo | Impacto | Acción |
|---|---|---|---|
| R-01 | **Licencia de la plantilla Cappa.** Publicar producción sobre un demo raspado sin licencia es exposición legal para nosotros y para el cliente | Alto | Definir quién compra la licencia **antes** de escribir código de producción |
| R-02 | Motor de reservas / PMS actual desconocido. Define el alcance completo | Alto | Pregunta prioritaria en la entrevista |
| R-03 | ~~Calidad de la fotografía~~ **CERRADO** — el mirror confirma 244 WebP de 2025 bien dimensionadas. Queda sólo la cesión de derechos | ~~Alto~~ Bajo | Preguntar únicamente por los derechos (C5.3) |
| R-04 | Posible ficha duplicada en TripAdvisor | Medio | Validar y proponer consolidación como victoria rápida |
| R-05 | NAP inconsistente (teléfono con lada de Monterrey en hotel de Tulum) | Medio | Validar con el cliente |
| R-06 | Titularidad del dominio `azucarhotel.com` desconocida. Puede estar a nombre de una agencia anterior | Alto | Verificar en el sprint 1, no en el lanzamiento |
| R-07 | Sin acceso a Analytics no hay línea base y no se puede demostrar la mejora | Medio | Solicitar accesos en la primera semana |
| R-08 | Cliente no cumple el SLA de 48 h y la cadencia quincenal se rompe | Alto | SLA escrito en contrato + pendientes del cliente visibles en cada demo |
| R-09 | Catálogo posiblemente sobre-segmentado (8 tipos para 21 unidades) reduce la conversión | Medio | Validar inventario real y proponer agrupación comercial |
| R-10 | Sobreventa si alguna vez se activa confirmación instantánea sin channel manager | Muy alto | Prohibido por ADR-0003. La interfaz nunca dice "confirmada" |
| R-11 | El hotel no cumple el tiempo de respuesta publicado y el flujo genera frustración | Alto | Responsable y horario acordados **antes** del lanzamiento (B1, B2) |
| R-12 | Sin CMS, el cliente no puede editar el sitio. Consistente hoy, puede molestar después | Medio | Debe quedar **aceptado por escrito**, no asumido (F4) |
| R-13 | 🚨 **El sitio actual captura número de tarjeta y CVV por Contact Form 7.** Incumplimiento PCI-DSS 3.3.1 y 4.2.1 + LFPDPPP. Los buzones del hotel contienen un histórico de tarjetas completas | **Crítico** | Despublicar de inmediato, fuera del plan de sprints. Purgar histórico. Sustituir por enlace de pasarela |
| R-14 | Los 10 enlaces a `goo.gl` pueden estar rotos: Google discontinuó el acortador | Bajo | Verificar y sustituir por URLs directas |
| R-15 | ~~Token secreto de Mapbox en ResNexus~~ **CERRADO** — son tokens `pk.` públicos, uso previsto por Mapbox. Redactados igualmente por higiene del repositorio | Ninguno | Sin acción |
| R-16 | La agencia anterior **provisionó una propiedad real en ResNexus** (`18DC254A-…`) con unidades cargadas. Se desconoce si sigue activa, si se paga y quién tiene los accesos | Medio-alto | Preguntas añadidas al bloque B de la entrevista |
