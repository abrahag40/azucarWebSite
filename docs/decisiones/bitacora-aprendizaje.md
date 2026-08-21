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

## L-023 — El Product Backlog es un artefacto, no una lista de tareas

**Lección.** El plan pasó de una tabla de "qué toca en cada sprint" a un **Product Backlog**
con épicas, historias de usuario, criterios de aceptación en formato *Dado/Cuando/Entonces*,
tallas y dependencias declaradas.

**Por qué.** Una tarea escrita como *"hacer el header"* no permite saber cuándo está bien
hecha; la discusión se resuelve por opinión. Una historia con criterios verificables permite
que alguien que no escribió el código diga si está terminada. **Es lo que convierte
"terminado" de opinión en hecho.**

El formato *Como \<rol\>, quiero \<capacidad\> para \<beneficio\>* obliga a declarar
para quién y para qué. Cuando no se puede completar la frase, casi siempre es porque la
historia no tenía valor y era una tarea técnica disfrazada.

**Antipatrón evitado:** *backlog como lista de pendientes*. Sin rol, sin beneficio y sin
criterio de aceptación, no se puede priorizar por valor —sólo por lo que suena urgente— y no
se puede cerrar sin discutir.

---

## L-024 — Escribir el Sprint Goal antes de elegir las historias

**Lección.** Cada sprint declara **un objetivo en una frase**, y se escribe *antes* de
seleccionar el contenido del sprint.

**Por qué.** Es el artefacto de Scrum que más se omite y el que más sirve a mitad de sprint:
cuando aparece trabajo nuevo, el Sprint Goal permite decidir si entra **sin discutir**. Si no
acerca al objetivo, va al backlog. Sin él, cualquier petición parece razonable y el sprint se
convierte en una lista de deseos con fecha.

**Corolario — regla de congelación:** cerrado el Planning, el Sprint Backlog no crece. Sólo
un fallo en producción justifica romper la iteración.

---

## L-025 — La documentación de un proyecto tiene una puerta de entrada, no diez

**Lección.** `CLAUDE.md` se reescribió como **columna vertebral**: contexto, decisiones
vigentes, reglas que no se rompen, estado actual y un índice a todo lo demás. El resto de
documentos son profundidad, no entrada.

**Por qué.** Documentación repartida sin jerarquía tiene el mismo efecto que no tenerla:
nadie sabe por dónde empezar, así que nadie empieza. Un único punto de entrada que responda
*dónde estamos y qué no se puede romper* es lo que permite que alguien —o una sesión nueva—
se incorpore sin que nadie le cuente nada.

**Prueba de que funciona:** si al abrir una sesión nueva hay que explicar el proyecto de
viva voz, la documentación falló. Se arregla el documento, no se repite la explicación.

**Antipatrón evitado:** *documentación como archivo muerto*. Se escribe al final, para
cumplir, y nadie la lee. Aquí se escribe durante, y se lee al empezar cada sesión.

---

## L-026 — Medir antes de adoptar: AVIF no siempre gana

**Lección.** Una historia del backlog pedía servir las imágenes en AVIF. Se implementó, se
midió sobre las 44 imágenes reales del proyecto y **se descartó**: AVIF gana en 22 y **pierde
en 22**, con un ahorro neto del 5 % y un peor caso de **+39 %**.

**Por qué.** Las fuentes ya son WebP con pérdida, comprimidas por WordPress. Recodificar de
*lossy* a *lossy* no recupera información, y la ventaja de AVIF necesita originales de
calidad. Además el navegador elige AVIF **a ciegas** cuando se le ofrece: en la mitad de las
imágenes eso no es una mejora opcional, es servir un archivo más pesado. Y el build pasaba de
2 s a 63 s: veinte veces más CI por un 5 %.

**Antipatrón evitado:** *cargo cult performance* — adoptar la técnica que la industria
recomienda sin comprobar que aplica a tu material. «Usa AVIF» es un buen consejo general y
una mala decisión concreta aquí.

**Queda abierto, no cerrado:** si el cliente entrega la fotografía original, AVIF debe
reevaluarse. Con originales suele ganar entre un 30 y un 50 %.

---

## L-027 — Los números de calidad no son comparables entre códecs

**Lección.** La primera medición de AVIF dio **+52 %** y llevó a la conclusión de que no
servía. Era falsa: comparaba `quality: 72` en AVIF contra `quality: 72` en WebP, y esas dos
cifras **no significan lo mismo**. AVIF `q50` equivale perceptualmente a WebP `q72` y pesa un
27 % menos.

**Por qué.** «Quality» es un parámetro interno de cada codificador, no una unidad. Compararlo
entre formatos es como comparar dos termómetros con escalas distintas porque los dos marcan
72.

**Cómo se comprueba bien.** Se fija una calidad *percibida* —comparando recortes al 100 %— y
sólo entonces se comparan los bytes.

**Y el hallazgo colateral fue el que valió:** al buscar el punto de equivalencia se descubrió
que la calidad del proyecto estaba en 70-72 y sobraba. Bajarla a 50 quitó un **20 %** del peso
sin diferencia visible. La ganancia no vino del formato nuevo, sino de haber mirado.

**Antipatrón evitado:** *benchmark de una sola variable* — cambiar el códec dejando fijo un
número que no es equivalente entre ellos.

---

## L-028 — El reset moderno de CSS rompe el centrado de `<dialog>`

**Lección.** El visor de la galería aparecía en la esquina superior izquierda con dos de sus
tres botones fuera de pantalla. La causa no estaba en el visor: el navegador centra los
`<dialog>` modales con `inset: 0` más `margin: auto`, y el reset del proyecto abre con
`* { margin: 0 }` —el idioma habitual de los resets modernos—, que pisa ese `auto`.

**Por qué importa más allá del caso.** Un reset global no es neutral: **desactiva
comportamientos nativos que no se ven en el marcado**. El elemento parece roto y el CSS que
lo rompe está a cien líneas de distancia, en un archivo que nadie sospecha.

**Corolario.** Cuando una primitiva nativa se comporta raro, el primer sospechoso es el reset,
no la primitiva. Antes de esto se culpó a un `position: relative` propio y se retiró por la
razón equivocada: la corrección estaba bien, el diagnóstico no.

**Antipatrón evitado:** *depurar hacia adelante* — seguir añadiendo CSS al elemento que falla
en vez de buscar qué se lo está quitando.

---

## L-029 — No construir sobre un evento sin comprobar que dispara

**Lección.** La restauración del foco al cerrar el visor colgaba del evento `close` de
`<dialog>`. **Ese evento no se dispara** en el motor probado al llamar a `close()`, así que el
manejador nunca corría y el foco se quedaba siempre en la miniatura de entrada. Se descubrió
instrumentando los eventos, no leyendo el código: el código era correcto según la
especificación.

**Por qué.** Entre la especificación y el motor hay una distancia que sólo se ve ejecutando.
La solución no fue pelearse con el evento, sino **no depender de él**: se restaura el foco
explícitamente en cada una de las tres vías de cierre —botón, fondo y `Esc`—, que son las que
controlamos.

**Corolario sobre `requestAnimationFrame`:** se usó primero para aplazar el foco y colgó la
propia prueba, porque **rAF no corre con la pestaña en segundo plano**. Para algo tan sensible
como devolver el foco, `setTimeout`.

**Antipatrón evitado:** *programar contra la especificación* sin verificar el comportamiento
real. La accesibilidad es justo donde más caro sale: el fallo es invisible para quien no
navega con teclado.

---

## L-030 — `1fr` no es `minmax(0, 1fr)`, y esa diferencia es el scroll horizontal en móvil

**Lección.** En CSS Grid, `1fr` equivale a `minmax(auto, 1fr)`. Ese `auto` impide que el tramo
se encoja por debajo de su contenido, así que una palabra larga, una URL o una imagen ancha
ensanchan la columna y sacan la página del viewport. La forma correcta en una rejilla
responsive es `minmax(0, 1fr)`, y los elementos de la rejilla necesitan además `min-width: 0`
por el mismo motivo.

**Por qué se pasa por alto.** En escritorio nunca se ve. Aparece sólo en pantallas estrechas y
con contenido concreto, que es exactamente la combinación que no se prueba.

**Cómo se comprueba.** No a ojo: recorriendo el DOM y comparando cada caja contra el ancho del
viewport, a 320, 375, 768 y 1280 px. Ese barrido encontró además dos defectos reales —enlaces
del pie de 19 px, por debajo del mínimo de 24 px de WCAG 2.2 AA 2.5.8, y una etiqueta de
`8.5rem` fijos que a 320 px dejaba al valor 90 px.

**Antipatrón evitado:** *responsive por inspección visual* — mirar la ventana estrecha y
declararla bien. Lo que no se mide, no está verificado.

---

## L-031 — El contenido del cliente puede contradecirse a sí mismo

**Lección.** Al reunir el contenido del sprint 4 apareció que el sitio del hotel se desmiente:
`/servicios/` y `/amenidades/` anuncian «Restaurante y Bar Blanc» y «Spa»; su
`/preguntas-frecuentes/` dice literalmente *«Por ahora no tenemos servicio de restaurante o
bar»*. Ninguna de las dos páginas existe, y el roof top aparece con dos nombres distintos.

**Lo grave es que ya lo habíamos publicado.** Habíamos tomado la versión de amenidades y
estaba en línea: una tarjeta en la portada y, peor, `amenityFeature: Restaurant = true` en el
`schema.org` de veinte páginas — una afirmación falsa emitida directamente a Google.

**Por qué.** El contenido heredado se trata como fuente, y una fuente se **coteja**. Bastó
cruzar tres páginas del mismo sitio para encontrarlo. Nadie lo había hecho porque cada página
se lee por separado.

**Regla que queda.** Antes de publicar un dato heredado, buscarlo en el resto del material. Si
dos páginas del cliente no coinciden, **gana la más específica y la más reciente** —aquí, el
FAQ—, y se pregunta antes de publicar.

**Antipatrón evitado:** *garbage in, gospel out* — tratar el contenido existente como
verificado por el hecho de estar publicado.

---

## L-032 — Los insumos de una migración caducan; el resto puede esperar

**Lección.** El mapa de redirecciones 301 vive en el sprint 5, pero se construyó en el 4. El
motivo no es adelantar trabajo: el **inventario de URLs sólo existe mientras exista la captura
del sitio viejo**. Cuando se apague, no hay forma de reconstruir qué URLs tenía ni qué
redirecciones ya estaban activas.

**Por qué importa el orden.** Una 301 perdida no avisa. Un enlace roto se ve; el tráfico
orgánico que deja de llegar se nota semanas después, cuando ya nadie sabe atribuirlo.

**El criterio general.** En un plan por sprints, adelantar trabajo es normalmente un error
—rompe el foco—. La excepción es el trabajo cuyo **insumo caduca**. Ahí el coste de esperar no
es la demora: es que la tarea se vuelva imposible.

**Dividendo inesperado.** El mapa reveló que 11 de las 22 URLs conservan su dirección exacta,
gracias a dos decisiones anteriores: ADR-0004 conservó el esquema en español, y en el sprint 2
se corrigió la ruta inglesa a `/en/rooms/`. **La forma más barata de no perder posicionamiento
es no cambiar la URL.**

---

## L-033 — Un color de texto se valida contra el fondo más desfavorable, no contra blanco

**Lección.** El token `--color-accent-text` se eligió midiendo su contraste **sobre blanco**:
4.64:1, por encima del 4.5:1 que exige WCAG 1.4.3. Pero el sitio pinta ese color también
sobre las superficies cálidas, que son más oscuras, y ahí caía a **4.26:1 y 4.01:1**. Estuvo
incumpliendo desde el sprint 1, en todos los antetítulos de la portada y de `/servicios/`.

**Por qué se cuela.** Al definir un sistema de color se piensa en pares —tinta sobre papel— y
el papel por defecto es blanco. Las superficies alternas se añaden después, para dar ritmo, y
nadie vuelve a comprobar los textos que van encima. El comentario del token incluso decía
«4.64:1», lo que daba una falsa sensación de estar verificado.

**Regla que queda.** Un token de TEXTO se valida contra **todos** los fondos en los que la
hoja de estilos permita usarlo, y se documenta con el peor de ellos. El valor corregido
conserva matiz (34°) y saturación (51%) —la marca no cambia— y cumple en las tres
superficies: 5.23 · 4.81 · 4.53.

**Antipatrón evitado:** *verificar el caso fácil*. Medir la combinación más favorable y
apuntarla como prueba de conformidad.

---

## L-034 — El padding vertical no existe en un elemento en línea

**Lección.** Un `<a>` con `padding: 8px` y 14 px de texto mide **23 px de alto**, no 39. En un
elemento `inline` el padding vertical se pinta pero **no aumenta la caja**, así que no cuenta
para el mínimo de 24 px de objetivo táctil de WCAG 2.2 AA 2.5.8. Se arregla con
`inline-block`, `inline-flex` o `min-height`.

**Lo importante no es el dato, es que apareció DOS VECES.** Primero en los enlaces del pie, se
corrigió, y semanas después el mismo defecto estaba en el selector de idioma de la cabecera.
Un defecto que reaparece en otro sitio significa que **la corrección fue local y la causa era
sistémica**: no se buscó el resto de casos ni se añadió una comprobación que lo impidiera.

**Corolario operativo.** Al corregir un defecto, la pregunta no es «¿está arreglado?» sino
«¿dónde más vive esto, y qué impide que vuelva?». La segunda vez se añadió la comprobación de
objetivos táctiles a la auditoría automatizada.

**Antipatrón evitado:** *bug fixing* sin *root cause* — tapar la instancia y dejar la clase.

---

## L-035 — Una herramienta que no encuentra nada hay que probarla contra algo roto

**Lección.** La auditoría de accesibilidad recién escrita devolvió **cero hallazgos** en las 34
páginas. Ese resultado es indistinguible de que el script no funcione. Antes de creerlo se
pasó por el sitio vigente, donde había violaciones conocidas: devolvió **680 fallos en 25
tipos**, coherentes con lo que la auditoría del sprint 0 había encontrado por otra vía.

**Por qué importa.** Un verde falso es peor que no medir: no sólo no detecta el problema, sino
que **fabrica confianza**. Y cuanto más se automatiza, más caro sale — nadie vuelve a mirar a
mano lo que «ya comprueba el script».

**Regla que queda.** Todo comprobador nuevo se calibra contra una entrada que **debe** fallar,
antes de usarse como evidencia. En este proyecto hay una a mano y gratis: la captura del sitio
vigente, que está llena de defectos reales y documentados.

**Nombre de la técnica:** *test the test* — en pruebas de mutación es el principio de que una
suite que pasa con el código roto no prueba nada.

---

## L-036 — Una optimización a medias puede no optimizar nada

**Lección.** Se autoalojaron las tipografías para sacar dos dominios de terceros del camino
crítico del render: menos DNS, menos TLS, ninguna hoja externa que bloquee el pintado. Bien.
Pero al verificar en producción, Cloudflare devolvía `max-age=0, must-revalidate` en esos
archivos, porque aplica esa política a todo lo que sale de `public/` —nombres estables, no
puede saber si cambiaron—. **Las cinco tipografías se revalidaban en cada navegación.**

**Por qué.** Se habían cambiado dos handshakes de terceros por cinco viajes de ida y vuelta
propios en cada página. En una conexión móvil eso es latencia sobre el mismo camino crítico
que se venía a liberar.

**Regla que queda.** Una optimización no está hecha cuando el código está escrito, sino cuando
se ha medido **el resultado en el entorno real**. Aquí bastó un `curl -I` a un archivo de
fuente. El propio `_headers` documenta la disciplina que hace válida la caché inmutable: si
alguna vez hay que sustituir una tipografía, se cambia el nombre del archivo.

**Antipatrón evitado:** *declarar victoria en el commit* — dar por buena una mejora de
rendimiento porque el cambio parece correcto, sin comprobar qué hace el servidor con él.

---

## L-037 — Conocer los límites del instrumento antes de reportar la medida

**Lección.** El navegador de esta sesión no puede medir Core Web Vitals. La primera vez se
intentó con la API de PageSpeed y devolvió *quota exceeded*, lo que parecía un problema
pasajero. La segunda se midió en el propio navegador y dio **LCP de 5 796 ms con la página
cargada en 632 ms** — una cifra imposible. Al instrumentar apareció la causa:
`visibilityState: "hidden"`. La pestaña nunca es visible para el motor, así que **las métricas
de pintado no disparan**, y ese 5 796 era ruido de una pestaña estrangulada.

**Por qué importa.** Una cifra absurda es fácil de descartar. El peligro son las plausibles:
si el LCP hubiera salido 2 100 ms se habría reportado como bueno y se habría cerrado el
criterio de salida del sprint con un dato inventado por el instrumento.

**Regla que queda.** Antes de reportar una medición, comprobar que **el instrumento podía
medirla**. La señal barata aquí era `visibilityState`, y una comprobación de coherencia
—LCP mayor que el tiempo de carga completa es imposible— habría bastado.

**Consecuencia práctica y honesta:** LCP, INP y CLS los tiene que medir Abraham desde su
navegador. Lo que sí se pudo afirmar con base —TTFB, peso, número de peticiones, orígenes de
terceros, contraste, tamaño de los objetivos táctiles— se midió y se reportó por separado.

**Antipatrón evitado:** *instrumento silencioso* — confiar en una herramienta que devuelve un
número aunque no esté en condiciones de producirlo.

---

## L-038 — Un plan de reversión empieza por el criterio, no por el procedimiento

**Lección.** Revertir un lanzamiento son dos clics. Lo difícil es **decidir revertir**: a las
once de la noche, con el cliente escribiendo y sin umbral fijado de antemano, la discusión se
vuelve sobre sensaciones —«se ve raro», «a mí me carga bien»— y se acaba revirtiendo por algo
cosmético o, peor, no revirtiendo por algo grave.

**Por eso el plan se escribe al revés de como suele hacerse.** Primero un verificador que
responde de forma binaria, y sólo después el procedimiento. Y la distinción que más importa no
es cómo revertir, sino **qué cuenta como fallo**: una página caída o una redirección rota lo
son; una cabecera de seguridad ausente no. Confundirlas es lo que produce las dos malas
decisiones.

**El dato que gobierna todo el plan resultó ser uno solo, y estaba a un `dig` de distancia:**
el TTL del dominio es de 14 400 segundos. Cuatro horas. Esa cifra *es* la velocidad de la
reversión, y bajarla a 300 antes del cambio es lo que convierte una reversión de cuatro horas
en una de cinco minutos. Sin ese preparativo, el resto del plan es decorativo.

**Corolario sobre el orden de los cambios.** Mudar los nameservers y cambiar el sitio el mismo
día encadena dos reversiones, y la de los nameservers tarda hasta 48 horas. Separadas —mudanza
primero, copiando los registros tal cual, y el cambio de sitio días después— la reversión pasa
a ser un registro con TTL bajo bajo nuestro control. *Técnica: decoupling de cambios de
infraestructura, mover una variable por vez.*

**Y una excepción que sólo aparece si se piensa el caso concreto:** en este proyecto hay un
escenario en el que revertir es la decisión INCORRECTA. Si el verificador detecta que las
páginas de captura de tarjeta volvieron a estar vivas, revertir restauraría justo el sitio que
las sirve. Un plan de reversión genérico no habría contemplado que a veces el sitio anterior
es peor que el roto.

---

## L-039 — Ensayar una reversión enseña lo que el manual no dice

**Lección.** El plan de reversión estaba escrito, razonado y con los tiempos de cada capa. Al
ensayarlo de verdad —desplegando una rotura deliberada a staging y revirtiendo desde el
panel— aparecieron dos cosas que no estaban en el plan y que sólo se aprenden haciéndolo.

**Primera, y es la que puede costar el lanzamiento.** Cloudflare avisa en el propio diálogo de
confirmación: *«With automatic deployments enabled, your next commit will update your
Production environment»*. **La reversión es temporal.** El siguiente push a la rama de
producción la deshace y vuelve a publicar el código roto. Un plan que terminara en «revertir
desde el panel» habría dejado el sitio roto otra vez al primer push, probablemente sin que
nadie relacionara ambas cosas. El paso que faltaba —arreglar el código o deshacer el commit
culpable *antes* de que nadie más empuje— ahora es el punto 5 del procedimiento.

**Segunda: Cloudflare marcó el despliegue roto con un ✓ verde.** Y tenía razón: el build pasó
sin errores. El sitio estaba roto igualmente. **Un build en verde no es un sitio sano**, y por
eso el criterio de reversión se comprueba contra la URL servida y no contra el resultado del
build.

**Lo que sí confirmó el ensayo.** La reversión tardó **6 segundos** desde el clic hasta que el
sitio volvió a estar sano, y el verificador pasó de 5 fallos con código de salida 1 a 36
comprobaciones en verde con código 0. La capa 1 hace lo que el plan decía.

**Regla que queda.** Un procedimiento de emergencia que no se ha ejecutado nunca no es un
procedimiento: es una hipótesis. Y el momento de descubrir sus huecos no es durante la
emergencia. Ensayarlo costó veinte minutos.

**Nombre de la técnica:** *game day* — ejecutar el fallo a propósito, en un entorno
controlado, para validar la respuesta antes de necesitarla.

---

## L-040 — Un CI que falla sin bloquear nada deja de leerse

**Lección.** `astro check` llevaba **trece commits fallando**. El CI estaba en rojo desde
`feat(catalogo)` y nadie lo miró, porque el despliegue seguía saliendo verde: Cloudflare Pages
corre `npm run build`, no `npm run check`. Dos tuberías, dos veredictos distintos sobre el
mismo commit, y el que se veía a diario —el sitio publicado— decía que todo estaba bien.

El error era menor: un `'metros'` que TypeScript ensanchaba a `string` dentro de un ternario.
Un `satisfies` lo cierra. Lo grave no es el error, es **el tiempo que estuvo visible sin que
nadie lo leyera**.

**Por qué pasa.** Un semáforo que se pone en rojo y no detiene el tráfico se convierte en
decoración en cuestión de días. Es el mismo mecanismo que la *alert fatigue* de las guardias
de producción: la señal que nunca tiene consecuencia se filtra como ruido.

**Antipatrón evitado:** *broken windows* en la integración continua — normalizar el rojo hasta
que deja de distinguirse un fallo nuevo de los que ya estaban.

**Cómo se aplica aquí.** El CI y el despliegue tienen que dar el mismo veredicto. Cloudflare
Pages no ejecuta los guardias, así que el CI es la única red y **su rojo tiene que doler**:
antes del lanzamiento, protección de rama que exija el *check* en verde para fusionar. Y
mientras tanto, mirarlo después de cada empuje, que cuesta diez segundos.

---

## L-041 — La salida truncada esconde justo el hallazgo nuevo

**Lección.** Este defecto apareció **dos veces en la misma sesión**, en dos herramientas
distintas y con la misma forma.

*Primera.* El auditor informa de los enlaces internos rotos y listaba **los seis primeros
destinos** más un «y 13 más». Entre esos trece escondidos había un 404 real y nuevo —una
imagen que el build no llegaba a escribir— sepultado bajo dieciocho enlaces a las páginas de
reserva del sprint 3, que son ruido conocido y esperado.

*Segunda.* Yo mismo verificaba los tipos con `npm run check | tail -3`. La herramienta imprime
`errores / avisos / pistas` y cierra con una línea en blanco, así que `tail -3` me devolvía
avisos, pistas y el vacío: **la línea de errores quedaba justo fuera del recorte**. Di por
limpio un proyecto con un error de tipos, y así llevaba trece commits (L-040).

**La regla.** En cuanto una lista contiene ruido conocido, truncarla la vuelve inútil
exactamente cuando más falta hace: lo viejo ocupa las primeras posiciones y lo nuevo cae en la
cola cortada. Un informe se trunca por *volumen*, nunca por *defecto*, y lo que se recorta se
elige por relevancia, no por orden de aparición.

**Y sobre verificar:** si el comando de comprobación recorta su propia salida, no se está
comprobando nada, se está confirmando un sesgo. Se lee el veredicto completo o no se lee.

**Antipatrón evitado:** *verification theater* — ejecutar el comprobador, mirar sólo el trozo
que se espera ver, y anunciar que está en verde.

---

## L-042 — Una foto se juzga en la miniatura, no en el visor

**Lección.** La panorámica de la alberca del roof top entró en la galería con todos los votos:
es la mejor fotografía del hotel. Puesta en la rejilla, se cayó sola. Es una toma ancha con
mucha duela vacía y la alberca es una franja delgada; el recorte cuadrado la deja en nada. La
miniatura mostraba tablas de madera y una pérgola.

Funciona a lo grande, como hero. No funciona pequeña. Y **el tamaño al que casi todo el mundo
la va a ver es el pequeño**: la miniatura la ven todos, el visor sólo quien hace clic.

De paso apareció el segundo motivo para retirarla, que ninguna mirada habría encontrado: era
**byte a byte la misma imagen del hero**. Lo delató que Vite deduplica por hash de contenido y
el enlace apuntaba al nombre del otro archivo.

**Cómo se aplica.** La curaduría se hace sobre el recorte real y en el dispositivo real, no
sobre el archivo original abierto a pantalla completa. Y antes de dar por buena una selección,
comprobar huellas: dos nombres distintos pueden ser el mismo archivo.

**Antipatrón evitado:** curar fotografía en el visor de escritorio —la mirada del diseñador—
en lugar de en la rejilla del teléfono, que es la mirada del huésped.

---

## L-043 — `image.src` no es una URL que el build garantice

**Lección.** Las miniaturas enlazaban con `href={img.src}`, que parece lo obvio: la ruta de la
imagen importada. Producía un **404 en producción**.

`img.src` es la ruta del archivo *original*. En un build estático Astro emite las derivadas que
`<Image>` genera; el original sólo aparece si algo lo pide con ese nombre exacto. Y Vite
deduplica por hash: dos archivos idénticos con nombres distintos colapsan en uno, de modo que
`src` puede acabar apuntando a un nombre que este build no escribió nunca.

La forma correcta es `getImage()`, que devuelve una derivada que el build **garantiza** que
emite. El beneficio colateral fue grande: el visor dejó de servir originales intactos —hasta
1600 px sin comprimir— y `dist` adelgazó **1 MB**.

**La generalización, que es lo que vale.** En un empaquetador con hash de contenido, la ruta de
un recurso es una **promesa del build, no un dato del código fuente**. Sólo se puede enlazar lo
que se le ha pedido explícitamente que produzca. Un enlace construido a mano a partir de un
`src` importado es una suposición sobre el resultado de la compilación.

**Antipatrón evitado:** deducir URLs de salida a partir de rutas de entrada. No dan error de
compilación: dan un 404 el día del lanzamiento.

---

## L-044 — Cuando falta un dato, hay tres salidas y sólo una es honesta

**Lección.** El formulario de solicitud se topó con tres huecos a la vez: no sabemos a quién
notificar (**B1–B4**), no sabemos los impuestos (**C3**) y el aviso de privacidad no cumple la
LFPDPPP (**E-PRIV**). Ante cada uno había tres salidas:

| Salida | Qué habría pasado |
|---|---|
| **Inventar** un valor plausible — un «desde $4 500» sin impuestos | Reproduce exactamente la queja de «me cobraron más» que este proyecto existe para curar |
| **Bloquear** la historia entera hasta tener respuesta | Los 90 enlaces rotos a `/reservar/` siguen rotos meses más |
| **Construir hasta donde llega lo que sabemos** y decir en pantalla dónde se acaba | Lo que se hizo |

Así que el formulario existe, valida, compone el mensaje… y **no lo envía a ningún servidor
nuestro**: se lo entrega al huésped para que lo mande desde su propio correo. Y no muestra
**ninguna cifra**, con una línea que dice que el hotel responde con el total con impuestos.

**El detalle que lo convierte en decisión de arquitectura y no en un apaño:** mientras el
mensaje se componga y se envíe desde el dispositivo del huésped, **nosotros no tratamos ningún
dato personal**. No hay endpoint, no hay base de datos, no hay registro. El hueco de E-PRIV no
se rodea: se respeta, colocando la frontera del sistema justo antes de donde empezaría el
incumplimiento.

**Antipatrón evitado:** el *placeholder* que se queda. Un `TODO: poner el correo real` o un
precio de ejemplo sobreviven al sprint, pasan la revisión porque «ya se cambiará» y acaban en
producción. Aquí no hay nada que reemplazar: hay una frontera dibujada a propósito.

**La generalización.** Ante un dato que falta, la pregunta no es «¿qué pongo mientras tanto?»
sino **«¿hasta dónde puedo llegar sin él, y cómo lo digo?»**. Casi siempre se puede llegar
mucho más lejos de lo que parece, y decirlo en voz alta cuesta una frase.

---

## L-045 — Una función pura es lo que hace que valga la pena probar

**Lección.** Este proyecto no tiene pruebas unitarias, y está bien: son páginas estáticas cuya
corrección se ve mirándolas y con los auditores. Montar un framework para comprobar que un
`<h1>` dice lo que dice sería ceremonia sin beneficio.

El cálculo de noches entre dos fechas es distinto, por un motivo preciso: **es la única
aritmética del sitio que puede equivocarse en silencio**. No lanza excepción, no rompe el
build, no lo ve el auditor, no se nota mirando la página. Lo descubre el huésped al llegar.

Se escribió como función pura —sin red, sin reloj, sin DOM— y por eso probarla costó minutos y
cero dependencias: `node --test` viene en Node. Dos de los nueve casos son husos con horario de
verano, donde `new Date('2026-03-08')` interpretado en hora local hace que una de las dos
medianoches dure 23 horas: la resta da **2.96 noches y se redondea a 2**. Se ancla a las 12:00
UTC, que deja doce horas de margen por lado.

**La regla de dónde poner pruebas, que es lo que vale:** donde haya **lógica que pueda estar
mal sin parecerlo**. Ni más ni menos. Y si esa lógica está enredada con el DOM o con la red,
el problema no es la falta de pruebas: es que no se puede probar, y eso ya es un defecto de
diseño.

**Antipatrón evitado:** la cobertura por decreto —«todo módulo lleva pruebas»— que produce
cientos de comprobaciones de que un `getter` devuelve lo que se le puso, y ni una del cálculo
que se puede equivocar.

---

## L-046 — Un patrón copiado propaga el defecto más rápido que la corrección

**Lección.** El párrafo de entradilla de la galería salía a `--text-lg` y ocupaba **cuatro
renglones a 320 px**. Se corrigió: cuerpo en móvil, `lg` a partir de 40 rem. Media hora
después, la página de solicitud salía con **el mismo defecto**, porque copié el bloque de
estilo de la galería tal como estaba antes de arreglarlo.

Mismo error, misma sesión, misma persona, dos páginas.

**La causa no es despiste.** Es que la regla vivía **duplicada en cuatro archivos** —dos
idiomas por dos páginas— en lugar de en un sitio. Una regla duplicada tiene tantas
oportunidades de divergir como copias existan, y las copias se hacen del original, no de la
versión corregida.

Se extrajo a `.entrada-pagina` en `base.css`, con el porqué escrito al lado. **Una regla
compartida no se puede copiar mal.**

**Antipatrón evitado:** *copy-paste programming*, en su variante más engañosa: no la de
duplicar código feo, sino la de duplicar código que **acaba de dejar de ser correcto**. El
original sigue ahí, sigue pareciendo bueno, y no hay nada que avise de que se corrigió.

**Cómo se aplica.** Al arreglar algo que existe en más de un sitio, la corrección no está
completa hasta que **queda un solo sitio**. Si no, sólo se ha arreglado una de las copias y se
ha dejado la trampa armada para la siguiente.

---

## L-047 — Un auditor que no sabe lo que no puede ver produce ruido, no hallazgos

**Lección.** El barrido de UI en el navegador —contraste, objetivos táctiles y desbordamiento
sobre 19 rutas y tres anchos— devolvió **175 hallazgos**. Reales había **dos**.

Los 173 restantes eran fallos **de mi auditor**, no del sitio, y de tres clases distintas:

| Falso positivo | Por qué se producía |
|---|---|
| «contraste 1.00:1, blanco sobre blanco» ×130 | Buscaba un `background-color` subiendo por el árbol. Sobre una **fotografía** no hay color de fondo, así que encontraba el blanco del `body` y comparaba blanco con blanco |
| «objetivo táctil de 1×1» en el enlace de salto ×51 | Está oculto hasta recibir foco, por diseño |
| «8 enlaces invisibles enfocables» | Miraba `display` del propio enlace, no el de sus **ancestros**. El menú móvil entero es `display:none` en escritorio |

Y hubo un cuarto, más traicionero: medí el enlace de salto **con el foco puesto** y seguía
midiendo 1×1. Conclusión aparente: está roto. Conclusión real: el panel del navegador **no
tenía foco de ventana**, así que `:focus` no se evaluaba —`elemento.matches(':focus')` daba
`false` con `document.activeElement === elemento`—. Con un clic previo que diera foco real a
la ventana, el enlace medía **161 × 50 px** y funcionaba perfectamente.

**La regla.** Una herramienta de auditoría tiene que **declarar lo que no puede ver** y
callarse ahí, en vez de adivinar. `auditar-accesibilidad.mjs` ya lo hacía —dice por escrito
que no comprueba contraste ni foco porque no tiene estilos calculados—; el barrido del
navegador no, y por eso mintió 173 veces.

**Y el corolario que cuesta más aceptar:** 175 hallazgos de los que 173 son ruido es **peor
que cero hallazgos**. Nadie revisa una lista así dos veces; a la tercera se ignora entera —el
mismo mecanismo de L-040—. Un auditor ruidoso no es un auditor estricto: es un auditor roto.

---

## L-048 — El contraste sobre una fotografía se mide en el píxel, no en el CSS

**Lección.** Descartados los falsos positivos quedaba una pregunta que **no se puede
responder leyendo estilos**: ¿los textos blancos de la cabecera y del héroe cumplen sobre la
foto que hay debajo?

Se resolvió dibujando la propia imagen en un `<canvas>` —es del mismo origen, así que se
puede leer—, mapeando coordenadas de pantalla a píxeles a través del `object-fit: cover`,
**componiendo encima los dos velos negros** con su alfa exacta en cada punto, y muestreando
de 18 a 32 posiciones por elemento.

| Dónde | Peor caso | Mínimo AA |
|---|---|---|
| Cabecera sobre héroe · 1280 px | **4.93:1** | 4.5 |
| Cabecera sobre héroe · 320 px | 9.42:1 | 4.5 |
| Antetítulo del héroe · 320 px | 6.27:1 | 4.5 |
| Titular del héroe · 320 px | 6.46:1 | 3 |

**El dato que importa no es que cumpla: es el 4.93.** Queda un 10 % de margen, y ese margen
depende de **qué fotografía haya puesta**. Cambiar el héroe por una imagen más clara en su
franja superior rompe el contraste sin que lo detecte ningún auditor de marcado, ningún
`build` y ningún revisor mirando la página. Escrito en el propio componente, donde lo verá
quien cambie la foto.

**La generalización:** cuando un color depende de un contenido variable —una foto, un vídeo,
un fondo elegido por el usuario—, el resultado no es una propiedad del CSS: es una propiedad
del **contenido**, y hay que volver a medirlo cada vez que el contenido cambia.

---

## L-049 — A la tercera vez, el arreglo no es el arreglo: es la comprobación

**Lección.** Un `<a>` que ocupa su párrafo entero mide **17 px de alto**, porque el relleno
vertical de un elemento en línea no suma a la caja. WCAG 2.5.8 pide 24.

Apareció en el pie de página. Se arregló. Apareció en el selector de idioma. Se arregló, y
ahí ya se añadió una comprobación… que no lo cubría. Apareció por **tercera vez** en el
enlace al aviso de privacidad de la página de solicitud, escrito por mí ese mismo día.

Tres veces el mismo defecto es información sobre el **proceso**, no sobre el código.

Lo que se hizo la tercera vez: una regla en el auditor que señala el **patrón** —un `<p>`
cuyo único contenido es un `<a>`— como **aviso**, no como fallo. El auditor no puede medir
cajas y no finge que puede: dice «verifica estos diez sitios». Los diez se midieron en el
navegador; ocho ya cumplían (44–52 px) y dos no. Se arreglaron.

**Por qué aviso y no fallo.** Un `<a>` dentro de una frase está **exento** del criterio —lo
dice el propio 2.5.8, «Inline»—. Una regla que lo marcara como fallo produciría falsos
positivos en cada párrafo con un enlace, y volvería a L-047: ruido. El aviso apunta; la
persona decide.

**Antipatrón evitado:** arreglar el caso en vez de la clase. Tres arreglos puntuales cuestan
más que una comprobación, y el cuarto caso llega igual.

---

## L-050 — «Lo hace el cliente» era una suposición que nadie comprobó

**Lección.** H5.2 —Core Web Vitals— estuvo marcada **cinco sprints** como *«requiere
PageSpeed desde el navegador de Abraham»*. Yo mismo la puse ahí y la repetí en cada informe
de estado como bloqueante ajeno.

Era falso. Chrome está instalado en la máquina de trabajo, Lighthouse se instala con `npx`,
y **es el mismo motor que PageSpeed**, con el mismo estrangulamiento móvil 4G que pide el
criterio. La medición tardó cuatro minutos.

El origen del error es rastreable: **L-034** documentó que el panel del navegador no puede
medir métricas de pintado —`visibilityState` en `hidden`, el LCP nunca se dispara—. Eso era
cierto **para ese panel**. De ahí salté a «no puedo medir CWV», que es una conclusión
distinta y más ancha, y no volví a comprobarla cuando el contexto cambió.

**La regla.** Un bloqueante que no se ha intentado no es un bloqueante: es una hipótesis. Y
las hipótesis caducan. Antes de escribir «requiere X» en un backlog conviene gastar cinco
minutos en probarlo, porque esa etiqueta **sobrevive sola durante meses** y nadie la vuelve
a cuestionar — es demasiado cómoda para los dos lados.

**Antipatrón evitado:** el bloqueante heredado. El que está en la lista desde hace tanto que
ya nadie recuerda si alguien llegó a intentarlo.

**Y el resultado, que además era bueno:** LCP 1.33–1.86 s, CLS 0.003, TBT 0–26 ms.
Accesibilidad 100 y buenas prácticas 100. Se pudo haber sabido en el sprint 1.

---

## L-051 — Herramienta de terceros contra herramienta propia: cada una encuentra lo que la otra no

**Lección.** Se pasaron tres herramientas estándar sobre un sitio que **ya estaba en verde**
según mis tres auditores propios. Lo que encontró cada una es lo interesante:

| Herramienta | Lo que encontró que lo mío no podía |
|---|---|
| **Lighthouse** | `/favicon.ico` devolvía **404 en cada visita**. No está en el HTML: es una petición que el navegador hace **sin que nadie se la escriba**. Ningún auditor de marcado puede verlo |
| **Lighthouse** | 655 ms de *resource load delay* en el LCP. Un dato de la línea de tiempo, invisible en el marcado |
| **html-validate** | Los dos `<nav>` de la cabecera con la **misma** etiqueta. Mi regla exigía que tuvieran nombre, no que fuera **único** |
| **html-validate** | Un `<img>` sin `src` en el visor: HTML inválido que algún navegador resuelve contra la URL de la página |
| **axe-core** | Nada. **Cero violaciones** en 22 páginas — lo que confirma que los auditores propios cubrían bien su terreno |

Y al revés, lo que **sólo** encontraron las herramientas propias: los 90 enlaces rotos a
`/reservar/`, la regresión del idioma en `/en/`, la fecha en `es-MX` en la página inglesa, y
el contraste real sobre la fotografía. Ninguna herramienta genérica conoce las reglas de
este proyecto.

**La regla:** las herramientas estándar cubren lo **genérico** —lo que vale para cualquier
sitio— y las propias cubren lo **específico** —lo que sólo vale para éste—. No compiten;
tampoco se sustituyen. Un sitio en verde con las propias puede tener un 404 en cada carga.

**Y un corolario incómodo:** que axe diera cero no significa que el sitio sea accesible.
Significa que pasa lo que axe sabe comprobar. El propio axe lo admite dejando
`color-contrast` en «incompleto» sobre fotografías, y falta H5.4: un lector de pantalla real
manejado por una persona.

---

## L-052 — Medir sin esperar a que el CSS se aplique inventa defectos

**Lección.** axe-core devolvió `target-size` **«serious»** en 10 de 12 páginas, entre 13 y 28
nodos cada una. Enlaces del menú de 18.5 px de alto donde debería haber 57.

No había ningún defecto. Bajé la espera del iframe de 3000 a 1500 ms y axe corrió **antes de
que se aplicara la hoja de estilos**. Sin CSS, todo mide la altura de una línea de texto:
`padding` sin aplicar, `display: block` sin aplicar. La delató un detalle que no encajaba —el
enlace de «saltar al contenido» medía 120×18.5 cuando debe medir **1×1**—: si eso no estaba
oculto, es que no había estilos.

Con espera suficiente y esperando a que **una variable CSS resuelva**, las mismas páginas dan
**cero violaciones**.

Es la tercera vez en dos sesiones que un artefacto de medición se disfraza de hallazgo: el
`:focus` que no se evalúa sin foco de ventana (L-047), el `scrollIntoView` medido a mitad de
una animación, y esto.

**La regla, ya con tres casos detrás:** ante un hallazgo automático, la primera pregunta no
es «¿cómo lo arreglo?» sino **«¿estaba la página en condiciones de ser medida?»**. Y la
señal más barata para saberlo es buscar un valor que se conozca de antemano —aquí, que el
enlace de salto mida 1×1— y usarlo como **testigo**: si el testigo falla, la medición entera
se descarta sin mirarla.

**Antipatrón evitado:** arreglar el síntoma que reporta un instrumento mal calibrado. Habría
metido `min-height` a trece enlaces que ya median 57 px.

---

## L-053 — Un filtro que sólo reconoce el éxito no distingue «no falló» de «no se ejecutó»

**Lección.** Tercera vez en este proyecto, y la más tonta de las tres.

Verifiqué tres builds seguidos con `npm run build 2>&1 | grep -E "page\(s\)"`. Las tres
veces la salida fue **vacía**, y las tres veces la leí como que todo iba bien. El build
estaba **roto**: un `CompilerError` en `Header.astro`. `dist/` se quedó del build anterior y
seguí comprobando cosas sobre un directorio obsoleto durante tres comandos, sacando
conclusiones sobre un HTML que ya no se generaba.

La causa raíz del error, además, es de manual: escribí un comentario `{/* … */}` que
**contenía la propia secuencia de cierre** dentro del texto —estaba explicando la diferencia
entre las dos sintaxis de comentario— y eso lo terminó antes de tiempo.

**El patrón, que ya tiene tres casos:**

| Cuándo | Filtro | Qué escondió |
|---|---|---|
| L-040 | `npm run check \| tail -3` | La línea de errores quedaba fuera del recorte: CI en rojo trece commits |
| L-041 | El informe listaba 6 destinos rotos de 18 | Un 404 real, detrás del ruido conocido |
| L-053 | `npm run build \| grep "page(s)"` | Que el build **ni siquiera terminó** |

Siempre lo mismo: **un filtro que sólo sabe reconocer la forma del éxito interpreta el
silencio como éxito**. Y el silencio es justo lo que produce un fallo grave.

**La corrección, y esta vez es estructural.** `scripts/verificar-todo.sh`: una sola orden que
corre las diez comprobaciones y mira el **código de salida**, que no se puede confundir con
nada. Imprime ✓ o ✗ por comprobación y las últimas doce líneas de la que falle.

Y se **calibró rompiendo algo a propósito** —un comentario HTML metido en el pie— antes de
darla por buena: un verificador que sólo se ha probado contra un estado sano no prueba nada
(L-035). Cazó el fallo, dio código 1, y volvió a verde al restaurar.

**Antipatrón evitado:** verificar con `grep` de lo que se espera ver. Si se filtra, hay que
filtrar buscando el **fallo**, nunca el éxito — o mejor, no filtrar y mirar el código de
salida.

---

## L-054 — Nadie había mirado cómo se ve el sitio cuando se comparte, ni cuando se imprime

**Lección.** Después de dos sesiones de pulido, con Lighthouse en 99, accesibilidad 100 y
cero violaciones de axe, quedaban dos huecos que **ninguna herramienta puntúa** porque no
ocurren dentro del navegador:

**1. Ninguna página declaraba `og:image`.** Cada vez que alguien pegaba un enlace del hotel
en WhatsApp, iMessage o Facebook, salía una tarjeta de **texto sin fotografía**. Para un
hotel frente al mar, la fotografía *es* el argumento; una tarjeta sin imagen ocupa la mitad
de espacio en el chat y se pasa de largo. Es probablemente el hallazgo con más efecto
comercial de todo el pulido, y ningún auditor lo puntúa.

Al implementarlo apareció una trampa: se probó usar la foto de cada tipo de alojamiento y
salió un archivo de **529 × 630** mientras el metadato declaraba 1200 × 630. Sharp no amplía
por encima del original —las fotos de habitación son 530 × 700—, así que el metadato mentía
**y** Facebook habría rechazado la tarjeta grande, que exige 600 px de ancho. Se añadió un
guardián: si el original no llega a 1200 px, se usa el héroe.

**2. No había hoja de impresión.** Quien imprime un sitio de hotel es quien va a llegar en
coche con las indicaciones en papel, o quien quiere las políticas de cancelación por escrito
antes de pagar. Justo las dos páginas donde el dato hace falta **sin batería y sin señal**,
que en la carretera de Boca Paila no es una hipótesis. Lo que salía era un banner
fotográfico a sangre, un menú que en papel no se puede pulsar, y enlaces sin destino visible.

**La generalización:** las herramientas miden el sitio **dentro del navegador**. Compartir un
enlace y imprimir una página ocurren **fuera**, y por eso ninguna puntuación los cubre. Al
hacer la lista de qué falta, conviene preguntarse dónde acaba el sitio y empieza el mundo.

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
| R-17 | **El contenido del cliente se contradice: restaurante y spa.** `/servicios/` los anuncia, su FAQ los desmiente. Estuvo publicado por nosotros, incluido en `schema.org` | Alto | Retirado del sitio nuevo. Pregunta **C0**, marcada urgente |
| R-18 | **El aviso de privacidad no cumple la LFPDPPP** y su versión inglesa no está traducida en el sitio vigente. Faltan domicilio del responsable, derechos ARCO y revocación del consentimiento | Alto | Requisito de **entrada** del sprint 3, que es cuando empezamos a tratar datos. Pregunta **E-PRIV** |
| R-19 | **El sprint 3 lleva 34 páginas de retraso.** Todo el valor del proyecto —la reserva directa— depende de cuatro respuestas que aún no se han pedido | Alto | Mensaje consolidado escrito y listo. Depende del envío |
| R-08 | Cliente no cumple el SLA de 48 h y la cadencia quincenal se rompe | Alto | SLA escrito en contrato + pendientes del cliente visibles en cada demo |
| R-09 | Catálogo posiblemente sobre-segmentado (8 tipos para 21 unidades) reduce la conversión | Medio | Validar inventario real y proponer agrupación comercial |
| R-10 | Sobreventa si alguna vez se activa confirmación instantánea sin channel manager | Muy alto | Prohibido por ADR-0003. La interfaz nunca dice "confirmada" |
| R-11 | El hotel no cumple el tiempo de respuesta publicado y el flujo genera frustración | Alto | Responsable y horario acordados **antes** del lanzamiento (B1, B2) |
| R-12 | Sin CMS, el cliente no puede editar el sitio. Consistente hoy, puede molestar después | Medio | Debe quedar **aceptado por escrito**, no asumido (F4) |
| R-13 | 🚨 **El sitio actual captura número de tarjeta y CVV por Contact Form 7.** Incumplimiento PCI-DSS 3.3.1 y 4.2.1 + LFPDPPP. Los buzones del hotel contienen un histórico de tarjetas completas | **Crítico** | Despublicar de inmediato, fuera del plan de sprints. Purgar histórico. Sustituir por enlace de pasarela |
| R-14 | Los 10 enlaces a `goo.gl` pueden estar rotos: Google discontinuó el acortador | Bajo | Verificar y sustituir por URLs directas |
| R-15 | ~~Token secreto de Mapbox en ResNexus~~ **CERRADO** — son tokens `pk.` públicos, uso previsto por Mapbox. Redactados igualmente por higiene del repositorio | Ninguno | Sin acción |
| R-23 | **Quien pase la URL por PageSpeed verá SEO 92 y «robots.txt is not valid».** Es un artefacto de nuestra propia CSP —`connect-src 'none'` bloquea la lectura que hace Lighthouse—; el archivo es válido y a Googlebot no le afecta | Bajo | Explicación lista en `medicion-calidad.md`. Se resuelve solo en el sprint 3, cuando `connect-src` pase a `'self'` para el formulario |
| R-22 | **El contraste de la cabecera sobre el héroe queda en 4.93:1** frente al 4.5 exigido: un 10 % de margen que depende de la fotografía, no del CSS | Medio | Documentado en `Header.astro`. Volver a medir si se cambia la foto del héroe (L-048) |
| R-21 | **El hotel no publica ningún WhatsApp.** Se buscó en toda la captura del sitio vigente: cero enlaces `wa.me`. H3.7 pide «acceso visible en todas las páginas» y no hay número que poner | Medio | Pregunta **B3**, que ya estaba, pero ahora se sabe que la respuesta no existe hoy: hay que pedir que lo creen o retirar H3.7 |
| R-20 | **El CI y el despliegue dan veredictos distintos.** Cloudflare Pages corre `build`, no `check` ni los guardias; el sitio se publica aunque el CI esté en rojo. Estuvo trece commits así | Alto | Corregido el fallo. Antes del lanzamiento, protección de rama que exija el CI en verde (L-040) |
| R-16 | La agencia anterior **provisionó una propiedad real en ResNexus** (`18DC254A-…`) con unidades cargadas. Se desconoce si sigue activa, si se paga y quién tiene los accesos | Medio-alto | Preguntas añadidas al bloque B de la entrevista |
