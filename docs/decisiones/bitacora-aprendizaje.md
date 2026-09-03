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

## L-055 — Un patrón compartido escondido en el ámbito de un componente falla en silencio

**Lección.** Cuatro secciones de la portada escribían `class="encabezado encabezado--centrado"`.
La regla estaba definida **dentro de los estilos con ámbito de `SeccionAmenidades.astro`**, y
Astro los limita a ese componente. Resultado: **una sección se veía bien y tres no**. Sus
encabezados salían alineados a la izquierda y con el `<h2>` a tamaño por defecto.

Lo que lo hace peligroso es que **no falla, se degrada**. Una clase que no existe no da error,
no rompe el build, no la ve ningún auditor: simplemente no aplica nada, y el resultado tiene
aspecto de decisión de diseño. Estuvo así en tres secciones sin que nadie —yo incluido— lo
señalara, hasta que Abraham mandó una captura de una sección descuadrada.

Es la **segunda vez en dos sesiones** con la misma forma: el `max-width` del acordeón era un
dato privado del componente y descentraba la lista cuando otro lo colocaba (L-046 en su
variante de encapsulación).

**La regla:** si dos componentes usan el mismo nombre de clase, esa clase **no puede vivir en
el ámbito de uno de ellos**. O va a la hoja compartida, o cada uno define la suya. La opción
intermedia —definirla en el primero que la necesitó y confiar en que llegue a los demás— no
existe en un sistema con ámbito por componente.

**Cómo detectarlo:** buscar nombres de clase usados en varios archivos y comprobar dónde se
definen. Aquí `grep -rn 'encabezado--centrado'` lo habría enseñado en un segundo: seis usos,
una sola definición, y dentro de un componente.

---

## L-056 — Copiar un patrón sin medir sus dos mitades lo deja peor que no copiarlo

**Lección.** Se reprodujo la sección `services` de Cappa —filas alternadas de foto y texto— y
el resultado se veía roto. Al medir el original salieron **dos cosas que no había mirado**:

1. **En Cappa esa sección NO tiene encabezado.** Cada fila lleva su antetítulo y su título.
   Yo le añadí uno.
2. **Sus filas van dentro del contenedor de 1140 px**, no a sangre. Yo las saqué a sangre.

Las dos juntas producían el defecto que se veía: un encabezado dentro del contenedor y unas
filas que llegaban al borde de la pantalla, de modo que los dos bloques **no parecían la misma
sección**. Cada decisión por separado era defendible; combinadas, no.

Y una tercera, esta de contenido: copié también su altura de fila —380 px— sin mirar que los
párrafos de Cappa ocupan cuatro renglones y los nuestros uno. El bloque de texto medía 108 px
dentro de 380: **272 px de vacío** que se leían como un error de maquetación. La altura la fija
el contenido, no la plantilla.

**La regla:** al tomar un patrón prestado hay que medir **el contenedor y el contenido**, no
sólo la disposición. Un layout copiado con contenido de otra longitud no es el mismo layout.

**Antipatrón evitado:** *cargo cult* de maquetación — reproducir la forma visible de un diseño
sin las restricciones que la sostienen.

---

## L-057 — Al segundo caso, escribe el detector; te enseñará casos que no sabías

**Lección.** `.encabezado--centrado` escondida en el ámbito de un componente fue L-055.
Abraham pidió revisar el resto de las secciones «por el mismo defecto». Se podía hacer a ojo
con un `grep`; se escribió un detector — `scripts/verificar-estilos.mjs`— y esa diferencia se
pagó tres veces en el mismo rato:

**1. El defecto era mayor de lo que yo creía.** Yo había arreglado el modificador
`--centrado` y me quedé tranquilo. El detector encontró que **la clase base `.encabezado`
tenía el mismo problema**: definida sólo en `SeccionAlojamiento` y usada por **cinco**
componentes. Los otros cuatro se quedaban sin su `margin-bottom` y sin el tamaño del `<h2>`.
Arreglé el síntoma y dejé la enfermedad.

**2. Encontró una familia de problemas que no buscaba.** Al listar dónde se define cada
clase salieron **seis nombres duplicados en componentes distintos** —`.rejilla`, `.grupo`,
`.resumen`, `.datos`…—. No están rotos: cada estilo vive en su ámbito y funciona. Pero
`.rejilla` significaba dos cosas distintas —`auto-fit` en una, tres puntos de ruptura
explícitos en la otra— y eso engaña a quien lea el código suponiendo que se parecen.

**3. Se delató a sí mismo.** El detector leía los COMENTARIOS del CSS, así que un comentario
que menciona `.rejilla` para explicar por qué NO se usa ese nombre contaba como definición.
El aviso resultante decía exactamente lo contrario de la verdad. Se arregló ignorando los
comentarios antes de leer los selectores.

**La regla, y ya con varios casos detrás:** un `grep` responde la pregunta que haces; un
detector responde también las que no sabías hacer. El umbral para escribirlo es **la segunda
aparición** del mismo defecto, no la quinta.

**Y el detalle que lo mantiene útil:** trece clases se usan a propósito sin estilos
—envoltorios de rejilla, nombres de sección, ganchos para pruebas—. Están declaradas en una
lista **con su motivo escrito**, para que el informe pueda quedar en **cero**. Un verificador
que siempre devuelve trece avisos se deja de leer, y entonces el aviso número catorce pasa
desapercibido (L-047). Si el motivo no se puede escribir, no era intencional.

---

## L-058 — Los desplegables de una plantilla suelen ser andamiaje, no arquitectura

**Lección.** Cappa tiene cuatro menús desplegables. Al abrirlos uno a uno:

| Desplegable | Qué contiene |
|---|---|
| **Home ▾** | 15 portadas alternativas de la propia plantilla |
| **Rooms & Suites ▾** | 3 maquetas distintas de la MISMA página, más una ficha |
| **Pages ▾** | Services, Facilities, Gallery, Team, Pricing, Careers, FAQs, «Other Pages» |
| **News ▾** | 3 formatos de blog |

**Ninguno es arquitectura de información.** Existen para enseñarle variantes a quien compra
la plantilla. Copiarlos literalmente habría producido un menú con quince portadas de un sitio
que tiene una, y tres maquetas de una página que existe una vez.

Lo que sí es reutilizable es el **mecanismo**, y sólo hay un sitio donde gana algo: los ocho
tipos de alojamiento, que ya existen y estaban a dos clics. Es lo que «Rooms & Suites» sería
si la plantilla no fuera una demo.

**La regla al copiar de una plantilla:** separar el *mecanismo* del *contenido de ejemplo*.
El mecanismo casi siempre vale; el contenido casi nunca. Y si un mecanismo no encuentra
contenido real donde aplicarse, la conclusión no es inventar contenido: es que ese mecanismo
no hacía falta.

**Antipatrón evitado:** menú de navegación diseñado desde la plantilla hacia el contenido, en
lugar de desde el contenido hacia la plantilla.

---

## L-059 — Tres mediciones correctas y una captura: sólo la captura vio el fallo

**Lección.** Al montar el desplegable, todo lo medible salía bien:

* el panel existía y tenía 292 × 436 px;
* sus nueve enlaces medían 44 px de alto, cumpliendo WCAG 2.5.8;
* el contraste calculado del texto daba **15.91:1**;
* `axe-core` no reportaba ni una violación.

Y el panel se veía **completamente en blanco**. Los nueve enlaces eran blancos sobre fondo
blanco, porque la regla `.cabecera--sobre-hero .nav__lista a { color: #fff }` —escrita para
los enlaces de primer nivel sobre la fotografía del héroe— alcanzaba también a los del panel
desplegable, que no existía cuando se escribió.

**Ninguna medición podía verlo**, y no por casualidad: yo comparaba el color del texto contra
el fondo *declarado del panel*, y el panel sí es blanco… igual que el texto. El cálculo era
correcto sobre los datos equivocados.

Lo enseñó una **captura de pantalla**, en cuanto miré la página en lugar de consultarla.

**La regla:** las mediciones responden preguntas concretas; una captura enseña lo que no
sabías preguntar. En una interfaz nueva, mirarla es un paso del método, no una comprobación
opcional al final. Corolario: `.nav__lista a` pasó a `.nav__lista > li > a` — un selector
descendente escrito antes de que existieran los descendientes es una bomba de relojería.

---

## L-060 — Una respuesta sólo se reutiliza fuera de su pregunta si se sostiene sola

**Lección.** La ficha de habitación de Cappa lleva check-in, check-out, mascotas y menores:
las condiciones que deciden la compra, en la página donde se decide. Nuestra ficha no las
tenía, y quien se preguntaba «¿puedo traer al perro?» tenía que salir a otra página — y quien
sale de una ficha de producto no siempre vuelve.

El contenido ya existía en `politicas.ts` y `faq.ts`, así que era sólo citarlo. Al hacerlo
salieron dos trampas:

**1. Citar un grupo entero mete letra pequeña donde estorba.** El grupo «Check-in y check-out»
tiene cuatro puntos y tres son cargos por salida tardía. En una ficha, eso aleja de la
decisión en vez de acercar. Se cita **el primer punto**, que es la hora; el resto sigue
completo en `/politicas/`, a un clic.

**2. Una respuesta sin su pregunta puede quedarse sin sentido.** La respuesta del hotel a
«¿Aceptan niños?» es, literalmente, **«Sí.»**. Bajo la etiqueta «Menores» queda un «Sí.»
suelto que no informa de nada. Y la de «¿Puedo llegar después de las 15:00?» empieza por «Sí,
a cualquier hora», que **detrás del horario parece contradecirlo**.

Descarté la primera por ese motivo y dejé la segunda, que tiene el mismo defecto. Lo vi al
mirar el resultado renderizado, no al escribirlo.

**La regla que queda:** un fragmento de FAQ sólo se puede reutilizar fuera de su contexto si
**se sostiene solo**. «Amamos las mascotas, pero por ahora no podemos recibirlas» sí; «Sí.»
no. Y reescribirlo para que encaje sería inventar texto del cliente — justo lo que este tipo
de bloque existe para evitar.

**Antipatrón evitado:** reutilizar contenido por su *estructura de datos* en vez de por su
*sentido*. Que dos textos vivan en el mismo array no los hace intercambiables.

---

## L-061 — Citar por clave, nunca por posición

**Lección.** Para que la ficha muestre los horarios había que señalar un grupo concreto de
`politicas.ts`. Lo cómodo era `politicas[2]`.

Habría funcionado hoy y fallado en silencio el día que alguien reordene los grupos —algo que
va a pasar, porque el orden de unas políticas es una decisión editorial que se revisa—. La
ficha empezaría a mostrar la política de **estacionamiento** bajo el título «Entrada y
salida», sin error, sin build roto y sin que ningún auditor lo notara.

Se añadió un campo `clave` opcional a `GrupoPoliticas` y a `Pregunta`, y se citan por él. El
coste es una línea por entrada citada; el beneficio es que un reordenamiento no puede
producir una mentira.

**La generalización:** cuando un dato se referencia desde otro sitio, necesita un
identificador que no dependa de cómo esté ordenado. Es la misma razón por la que una clave
primaria no es el número de fila.

---

## L-062 — Una queja pequeña destapó un fallo grave en otra página

**Lección.** Abraham dijo que la flecha del héroe «no es muy precisa». Tres cosas, y la
tercera no estaba en el héroe:

**1. Apuntaba a la tercera sección.** El `href` era `#alojamiento-titulo`, escrito cuando el
alojamiento iba justo después del héroe. Al añadir la presentación en medio, la flecha empezó
a saltársela entera. Una flecha «hacia abajo» promete enseñar lo que viene **justo** debajo;
si salta dos secciones, el gesto y el resultado no coinciden.

**2. Apuntaba a un TÍTULO, no a la sección.** El salto se comía los 96 px de aire superior y
dejaba el encabezado pegado al borde de la ventana.

**3. Y lo que importaba de verdad: no existía `scroll-padding-top` en todo el sitio.** La
cabecera es `sticky` en 37 de las 38 páginas, así que **cualquier** salto a un ancla dejaba el
destino debajo de ella. Medido en `/reservar/`: al enviar el formulario con un error, el
enlace del resumen —«Indica la fecha de llegada»— llevaba a un campo de 56 px que la cabecera
tapaba **por completo** (89 px). Quien lo pulsaba saltaba a un campo que no podía ver, en el
formulario más importante del sitio.

Ese fallo llevaba ahí desde que se construyó el formulario. No lo vio `axe`, ni el auditor de
marcado, ni html-validate, ni Lighthouse: todos comprueban el documento, y esto sólo existe
**en movimiento**, después de un salto.

**La regla:** una queja sobre un detalle visible merece revisar la *clase* de problema, no
sólo el caso. «La flecha aterriza mal» y «los enlaces de error aterrizan mal» son el mismo
defecto; sólo uno de los dos se notaba a simple vista.

---

## L-063 — `scroll-margin` y `scroll-padding` se suman; no se cancelan

**Lección.** Con el `scroll-padding-top` global puesto, la portada quedó mal: la cabecera ahí
es `absolute` —se va con el héroe— así que no tapa nada, y el desplazamiento dejaba la flecha
**104 px corta**, con una franja de héroe arriba que se lee como un salto a medias.

El primer intento fue `scroll-margin-top: 0` en el destino. **No funciona.** La posición final
es `destino − scroll-padding − scroll-margin`: con margen 0 el desplazamiento del contenedor
sigue entero. Para neutralizarlo hace falta un margen **negativo del mismo valor**.

Y ahí está el detalle que evita el próximo error: si el desplazamiento y su anulación son dos
números sueltos, el día que uno cambie el otro deja de cuadrar y el salto se queda corto **sin
que nada lo señale**. Por eso hay un token, `--desplazamiento-ancla`, y la anulación es
`calc(-1 * var(--desplazamiento-ancla))`. Un solo número, dos usos, imposible que diverjan.

**Antipatrón evitado:** compensar una constante con otra constante escrita a mano.

---

## L-064 — El fragmento de una URL es parte de la dirección pública, no un detalle interno

**Lección.** Abraham pulsó la flecha del héroe, miró la barra de direcciones y preguntó: «¿por
qué `presentacion`?». La respuesta era incómoda: porque así se llama el componente que dibuja
esa sección, `SeccionPresentacion`.

Ese `#` fallaba en las dos reglas que el resto de la ruta sí cumplía:

* **No estaba traducido.** Las rutas de este sitio se traducen enteras —`/alojamiento/` y
  `/en/rooms/`— y sin embargo la página inglesa decía `#presentacion`.
* **Exponía un nombre interno.** Al visitante no le dice nada, y a quien mantenga el sitio le
  hace creer que renombrar el componente es una operación segura. No lo es: rompe un enlace
  que alguien pudo haber copiado.

Un fragmento acaba en la barra de direcciones en cuanto alguien pulsa el enlace, y desde ahí
se copia y se comparte. **Es dirección pública.**

Se resolvió extendiendo el mecanismo que ya existía para los segmentos, no inventando otro:
un mapa `anclas` con `idAncla()` y `ancla()`. `#el-hotel` y `#the-hotel`.

**Y una excepción declarada, que es lo que la hace defendible:** los `id` de los campos del
formulario NO se traducen. Son identificadores técnicos que enlazan `<label for>` con su
control y que el script usa para componer el mensaje; traducirlos obligaría a bifurcar esa
lógica por idioma a cambio de un fragmento que aparece un segundo al saltar a un error. Una
regla sin excepciones escritas se aplica mal en el primer caso raro.

---

## L-065 — Un verificador que codifica un valor en vez de la propiedad caduca

**Lección.** La regla del auditor para «saltar al contenido» era
`href="#contenido"` escrito a mano. En cuanto los fragmentos se tradujeron, **las 19 páginas
inglesas empezaron a dar aviso**: el sitio estaba bien y el auditor decía que no.

El error de diseño es fino: la regla no comprobaba **la propiedad que importa** —que existe un
enlace de salto y que su destino existe en la página— sino **un valor concreto** que resultaba
tenerla. En cuanto ese valor cambió por una razón legítima, la regla se volvió ruido.

Reescrita: busca el enlace por su clase, extrae el fragmento **sea cual sea**, y comprueba que
haya un `id` que lo reciba. Ahora verifica más que antes —antes ni siquiera miraba si el
destino existía— y no le importa cómo se llame.

**La regla:** al escribir una comprobación, preguntarse «¿qué estoy afirmando de verdad?». Si
la respuesta contiene una cadena literal del contenido, casi siempre se está comprobando una
coincidencia en lugar de una propiedad.

---

## L-066 — Un mapa de rutas que enumera destinos inexistentes deja de describir el sitio

**Lección.** El mapa de segmentos declaraba `restaurante` y `terminos`: dos rutas **sin página
y sin una sola referencia en el código**. Ninguna hacía daño —nadie enlazaba a ellas— pero el
mapa dejaba de ser una descripción de lo que existe y pasaba a ser una lista de intenciones
mezclada con hechos, sin nada que distinguiera una de otra.

Seis meses después, quien lo lea no sabrá si `/restaurante/` es una página que se rompió, una
que falta por enlazar o una que nunca existió.

Se retiran, y el mapa gana un **contrato escrito**: una entrada aquí es la promesa de que hay
página en los dos idiomas; añadir una página obliga a añadir su segmento y retirarla obliga a
retirarlo. `restaurante` sigue bloqueado por C0 y `terminos` está descartado porque el hotel
no tiene ese texto — cuando existan, se añaden aquí y en `_redirects` **a la vez**.

**Antipatrón evitado:** configuración especulativa. Declarar por adelantado lo que «quizá haga
falta» cuesta cero hoy y confunde siempre.

---

## L-067 — El logotipo llevaba semanas siendo un marcador de posición mío

**Lección.** La cabecera mostraba «AZÚCAR» en Gilda Display con «HOTEL TULUM» debajo. Lo
compuse en el sprint 1 para que la cabecera no estuviera vacía, y **se quedó**. En ningún
informe de fidelidad lo señalé —comparé tipografías, colores y separaciones con la plantilla—
porque estaba comparando el sitio con **Cappa** y no con **el hotel**.

El logotipo real estaba en la captura desde el sprint 0: `logo_azucar_dorado-png.webp`, con
una cúpula dorada, la palabra «Hotel» manuscrita y dos líneas turquesa. Nada de eso existía en
mi versión. Lo vio Abraham en dos segundos.

**Lo que enseña:** un marcador de posición razonable es más peligroso que uno feo. Un
`LOGO AQUÍ` en rojo se sustituye el primer día; un wordmark tipográfico correcto pasa por
decisión de diseño y sobrevive a doce revisiones — incluidas las mías, que estaban mirando
exactamente esa zona de la pantalla.

**La regla:** al poner algo provisional, dejarlo anotado donde se lea —una lista de
provisionales, no un comentario en el componente— o hacerlo visiblemente provisional. Si
parece terminado, se da por terminado.

**Y el detalle técnico:** el logotipo del hotel es dorado sobre marrón y **sólo existe esa
versión**, porque su cabecera es blanca. Sobre la fotografía del héroe se pierde, así que ahí
se pinta en blanco sólido con `brightness(0) invert(1)`: se conserva la silueta, que es lo que
hace reconocible una marca. Lo correcto sería una versión clara del logotipo, y eso es un
archivo que tiene que dar el hotel, no algo que se arregle en CSS.

---

## L-068 — Un detector que sólo mira en una dirección deja pasar la mitad

**Lección.** Al sustituir el wordmark por el logotipo, `.marca__sub` dejó de usarse y **sus
reglas siguieron viajando en las 38 páginas**. El detector de clases con ámbito no dijo nada:
sólo buscaba clases *usadas y no definidas*, nunca *definidas y no usadas*.

Añadido el sentido contrario, apareció otra cosa: **cuatro falsos positivos propios**. Las
proporciones de la galería y los anchos del mosaico se construyen interpolando
—`` `mosaico__celda--${ancho}` ``— y el analizador saltaba los literales con `${`, así que las
daba por muertas estando vivas.

Se enseñó al analizador a guardar el **prefijo** de esas interpolaciones y a considerar usada
cualquier clase que empiece por él. Un detector que no entiende cómo se escribe el código que
analiza produce ruido, y el ruido se ignora (L-047, otra vez).

**El patrón, ya con varios casos:** cada vez que se amplía una comprobación conviene esperar
dos cosechas — los hallazgos reales **y** los falsos positivos que la ampliación introduce. La
segunda cosecha no es opcional: si se publica sin limpiarla, la herramienta nace desacreditada.

---

## L-069 — Un selector `a` no alcanza a un `<summary>`, aunque se vean igual de "enlace"

**Lección.** «Alojamiento» era el único apartado de la barra de navegación que no vestía la
tipografía de la plantilla —mayúsculas, `--font-ui`, tracking de 0.16em—: se veía en minúsculas
y con la fuente por defecto del navegador. Lo señaló Abraham desde una captura.

La causa no estaba en el desplegable en sí, sino en el elemento que lo dispara. Los otros seis
apartados son `<a>` y reciben su tipografía de `.nav__lista > li > a`. «Alojamiento» es un
`<details>` con un `<summary>` — semánticamente correcto (es lo que da teclado, foco y anuncio
de "contraído/expandido" gratis, ver L-059) pero un `<summary>` **no es un `<a>`**, y el
selector, escrito para alcanzar enlaces, simplemente no lo tocaba. El navegador lo pintaba con
su hoja de estilos por defecto y nada en el proyecto lo corregía.

**Lo que enseña:** cuando dos elementos se ven equivalentes en el diseño pero son etiquetas
HTML distintas, un selector pensado para uno no cubre al otro aunque ambos vivan en la misma
lista. La revisión visual de "¿tienen la misma clase de estilos?" hay que hacerla elemento por
elemento, no asumiendo que "es un ítem de menú más" implica "el mismo selector lo alcanza".

**La corrección:** las mismas cinco declaraciones de `.nav__lista > li > a`, copiadas
literalmente a `.desplegable__disparador` — y el estado de acento en `:hover` y `[open]` que
tampoco existía, porque nadie lo había echado en falta hasta ver el contraste con sus hermanos.

---

## L-070 — Una bandera no es un idioma, y la plantilla nunca usó ninguna

**Lección.** Se pidió sustituir el selector de idioma —«ENGLISH» en texto completo, la palabra
más larga de toda la cabecera— por banderas. Antes de dibujar iconos de país, se revisó qué
hace Cappa: su selector de idioma —en el pie, no en la cabecera— es un `<select>` con un icono
de **globo** (`ti-world`, Themify), nunca una bandera. En las dos capturas del proyecto,
`investigacion/mirrors/cappa` y `investigacion/mirrors/azucarhotel`, no hay un solo archivo de
bandera.

Construir banderas habría sido **inventar** una pieza de interfaz ausente de la plantilla —lo
que el propio proyecto prohíbe— y además reproducir un antipatrón documentado por el propio
W3C Internationalization Working Group: *"flags do not represent languages, they represent
countries and regions"*. El español no es de un solo país y el inglés tampoco; una bandera de
México junto a una de Estados Unidos o Reino Unido implica una equivalencia que no existe y
que, en un hotel que recibe huéspedes de toda Latinoamérica, es la lectura más fácil de ofender
sin querer.

**La resolución:** se dibujó un icono de mundo a mano —mismo mecanismo que los otros seis
iconos del proyecto (ver comentario de cabecera en `Icono.astro`, motivado por R-01)— y se
sustituyó el texto completo del idioma por su código ISO 639-1 de dos letras (EN / ES), que es
exactamente la abreviatura que ya usan la mayoría de los selectores de idioma sin banderas. El
nombre completo no desaparece: sigue siendo el nombre accesible del enlace vía `aria-label`, así
que un lector de pantalla sigue anunciando «English», no «E, N».

**El patrón:** cuando una instrucción explícita choca con la regla más repetida del proyecto —
"no inventes nada, la plantilla es la fuente"— la salida no es discutir la instrucción ni
ignorarla, sino resolver el problema de fondo (la etiqueta era demasiado larga) con el
mecanismo que la plantilla sí usa para ese problema.

---

## L-071 — Las cinco primeras fotos no son las cinco mejores

**Lección.** Abraham vio las fichas de habitación y preguntó, con razón, si de verdad esas
eran las mejores fotos disponibles: la ficha de «Habitación King · Vista al mar» abría con un
pasillo de entrada y seguía con clóset, inodoro, clóset otra vez y regadera. Ninguna de las
cinco mostraba la cama.

La causa, verificada por hash contra la captura del sitio vigente: **las ocho fichas de
alojamiento usan, sin excepción, los archivos `01` a `05` de cada carpeta numerada** —
`01_king_mar.webp` … `05_king_mar.webp`—, en el orden en que el hotel los subió. Nadie miró el
contenido; se tomó el prefijo numérico como si fuera un criterio de calidad. Es la generalización
de un defecto que el proyecto ya había nombrado una vez, en la curaduría de la galería general
(H4.4): *"ordenar por tamaño de archivo no predice si una foto sirve"*. Aquí ni siquiera hubo
una métrica — se tomó el orden de subida, que no predice nada en absoluto.

Revisar las 122 fotos reales del acervo —entre 10 y 22 por tipo, contra las 5 usadas— cambió
selección en las ocho fichas. Casos notables:

- **Suite Agua** y **Suite Mar** ya tenían la tina/jacuzzi privada entre sus cinco, por
  casualidad de numeración — se conservaron casi intactas.
- **Suite Cielo** tenía dos fotos de cielo nocturno (estrellas, luna) que no comunican nada del
  espacio; se sustituyeron por el roof top con alberca infinita y el mar al frente, que sí
  estaba en el acervo sin usar.
- **Habitación King · Vista a la selva** y **Habitación Doble · Vista a la selva** **no tienen
  ninguna fotografía de cama en todo el acervo del hotel** — sólo baño, pasillo y balcón. No es
  un defecto de curaduría: es un hueco de fotografía que ninguna selección distinta iba a
  cerrar. Se dejó la mejor vista disponible como portada y se anota aquí para no repetir la
  pregunta.
- Esas mismas dos fichas comparten fotografías de balcón casi idénticas entre sí —el mismo
  pasillo, tomado con minutos de diferencia—, porque ambas habitaciones dan al mismo corredor.
  No hay forma de evitarlo con el acervo actual.

**La regla, ya con dos casos (ver también L-041 y H4.4):** ninguna selección de fotografías se
hace por convención de nombre de archivo — ni orden numérico, ni tamaño, ni fecha. Se revisa el
acervo completo, imagen por imagen, y se anota cuando el acervo mismo no alcanza.

---

## L-072 — Cuando la plantilla no tiene el elemento, la fuente es la convención de la industria

**Lección.** Se pidió el botón flotante de WhatsApp, clásico, abajo a la derecha. Cappa no
tiene nada parecido — ni en el pie, ni en ninguna página de la demo hay un botón flotante de
ningún tipo. Por primera vez en el proyecto, "toma como base la plantilla, no inventes nada"
no tenía dónde aterrizar: no hay plantilla que seguir.

La resolución fue tratarlo como lo que es — un patrón de **la industria del sitio web para
hoteles**, no de Cappa —, y tomar la fuente de ahí: círculo verde de marca, esquina inferior
derecha, fijo sobre el resto de la página. Es la única vez en el proyecto que el radio de
esquina de la plantilla (2–4px en todo lo demás) se rompe a propósito por un círculo perfecto:
el reconocimiento inmediato del patrón importa más que la coherencia visual interna, porque la
función del botón depende de que se lea como "WhatsApp" en un vistazo.

**El icono, otra vez sin activos con licencia (R-01):** no se intentó reproducir el logotipo
exacto de WhatsApp trazo por trazo — arriesga una marca de un tercero por una fidelidad que a
28px nadie nota. Se usa un teléfono genérico dibujado a mano, el mismo criterio que ya rigió
el globo de idioma (L-070): el círculo verde en la esquina ya comunica "WhatsApp" por
convención; el glifo exacto es secundario.

**El bloqueo real, y cómo no repetirlo:** el número de WhatsApp no está confirmado — mismo
hueco que R-21 ya había encontrado en el sitio vigente (el icono está, el enlace `wa.me`
nunca). Adivinar cuál de los dos teléfonos publicados lo tiene habría mandado a un huésped a
escribirle a un número que quizá no responde por ese canal: peor que no ofrecer el botón.
Se aplicó el mismo patrón que ya usa `check-datos.mjs` para los datos de alojamiento sin
verificar — un campo explícitamente en `null` — pero con una salida distinta: en vez de hacer
fallar el build, el componente **degrada con honestidad** a `/contacto/`, un destino que hoy
es cierto, y su propio `aria-label` lo dice ("Contactar al hotel", no "WhatsApp"). No hay dato
falso que bloquear porque no se afirma ningún dato falso — el botón nunca miente sobre a dónde
lleva, sólo hace lo mejor que puede mientras falta la respuesta a B4.

**El patrón:** "no inventes nada, la plantilla es la fuente" asume que la plantilla tiene el
elemento. Cuando no lo tiene, la pregunta correcta no es "¿qué haría Cappa?" sino "¿qué espera
reconocer quien lo usa?" — y ahí la fuente correcta es la convención establecida fuera del
proyecto, no una invención propia ni un vacío.

---

## L-073 — Una pregunta con dos respuestas mezcladas bajo un solo número

**Lección.** Al proponer cómo entregar la solicitud por WhatsApp de verdad (ADR-0006), apareció
algo que **B4** no distinguía: preguntaba *"cuál de los dos números ya tiene WhatsApp"*, pensado
para el enlace manual de la cabecera del sitio vigente. Pero automatizar el envío con la
Plataforma de WhatsApp Business exige un número **dedicado** — uno que, una vez registrado ahí,
deja de comportarse como WhatsApp normal en el teléfono de quien lo use a diario. Son dos
preguntas de negocio distintas —*"¿cuál ya tiene WhatsApp?"* y *"¿quieres dedicar un número
sólo a las notificaciones automatizadas?"*— que habían estado viviendo bajo la misma etiqueta.

**Lo que enseña:** cuando una decisión técnica nueva se apoya en una pregunta ya hecha al
cliente, vale la pena releerla literal antes de asumir que la cubre. Aquí la pregunta original
alcanzaba para un enlace manual, pero se quedaba corta para una integración automatizada — y
sólo se vio al diseñar el mecanismo concreto, no al leer la pregunta en abstracto.

**De paso, la corrección de la sesión que motivó revisar esto:** al construir el botón
flotante (L-072) se citó **B3** en vez de **B4** —B3 es la pasarela de pago— y **R-24** en vez
de **R-21** —R-24 es el riesgo de las fotos sin cama, no el de WhatsApp—, en seis lugares del
código y la documentación. El banco de preguntas canónico (`preguntas-cliente.md`) es la
fuente; todo lo demás se cita desde ahí, nunca desde la memoria de qué número "sonaba
correcto".

---

## L-074 — Probar contra el servicio real, incluso sin credenciales reales

**Lección.** Construido el endpoint de ADR-0006, hacía falta verificarlo sin cuenta de Resend
ni de Turnstile. La tentación es conformarse con que `astro check` y `npm test` pasen y llamarlo
listo. No alcanza: ninguno de los dos ejecuta la función en el runtime real, y ahí es donde vive
la mitad del riesgo —parámetros de `fetch` mal armados, cabeceras que faltan, un `await` que
falta en la ruta de error—.

**Lo que sí se pudo probar, sin una sola cuenta propia:**

- Cloudflare publica una llave de prueba de Turnstile que **siempre aprueba**
  (`1x0000000000000000000000000000000AA`, documentada para exactamente este uso). Con ella,
  `wrangler pages dev` corre el flujo completo —honeypot, límite de tasa, validación,
  Turnstile— sin ninguna cuenta.
- Con una llave de Resend deliberadamente falsa, la llamada real a `api.resend.com` sí sale,
  Resend sí responde, y responde **401**. Eso no es un fallo de la prueba: es la prueba de que
  el cableado llega hasta el proveedor real. Un error de credencial confirma la integración
  igual de bien que un envío exitoso —mejor, incluso: prueba el camino de error también—.

**El defecto real que encontró la prueba, y no el tipo:** al enviar `llegada: ''`, la función
marcaba `salida` como inválida también, aunque su fecha por sí sola fuera correcta —porque
`noches('', salida)` no puede calcularse y da 0—. Resultó ser el mismo comportamiento que ya
tiene el cliente desde antes (`FormularioSolicitud.astro` hace exactamente lo mismo), así que no
era un bug: era una prueba con la expectativa equivocada. Pero **sólo se supo probándolo**, no
leyendo el código dos veces.

**El patrón:** "no tengo credenciales reales" no es lo mismo que "no puedo probarlo". Entre
mockear el proveedor externo y no probar nada, casi siempre hay una tercera vía —una llave de
prueba pública, un modo sandbox, o simplemente dejar que la llamada real falle de la forma
correcta— que prueba más que cualquiera de las otras dos.

---

## L-075 — Un correo sin `<meta charset>` sólo se rompe cuando alguien lo mira

**Lección.** Abraham pidió un correo HTML para el acuse al huésped, con el estilo del sitio.
Se construyó `correoHtml.ts`, con 24 pruebas unitarias verdes cubriendo escapado, saltos de
línea, campos opcionales y la regla de ADR-0003. Todo en verde, y el primer vistazo real en el
navegador mostró «AZÃºCAR HOTEL TULUM» y «MarÃa JosÃ© Herrera» — el HTML no declaraba
`<meta charset="utf-8">`, así que el navegador adivinaba la codificación y adivinaba mal.

**Ninguna prueba unitaria lo iba a encontrar.** `assert.match(html, /María José/)` compara la
cadena de JavaScript contra sí misma —ambas viven en memoria como UTF-8, la comparación pasa
siempre—; el defecto sólo existe en el momento en que un *navegador* decide con qué tabla de
caracteres pintar esos bytes. Es la misma clase de hallazgo que ya dejó L-059 y el trabajo del
logotipo: una captura de pantalla real encontró lo que ninguna aserción sabía preguntar.

**El patrón, con nombre:** cualquier documento que se renderiza para un humano —HTML, y esto
incluye el correo— necesita una verificación *visual*, no sólo de datos. Las pruebas
unitarias comprueban que los DATOS lleguen correctos a la plantilla; sólo un render real
comprueba que la plantilla los MUESTRE correctos.

### El hallazgo técnico de paso: Node ya entiende TypeScript, si el import lo dice

Al escribir las pruebas se encontró que Node 22+ ejecuta un `.ts` con interfaces y tipos
simples de forma nativa —sin el truco de despojar tipos a mano que ya usa
`solicitud.test.mjs`—, **con una condición**: los imports internos entre archivos `.ts` deben
llevar la extensión explícita (`from './solicitud.ts'`, no `from './solicitud'`). Sin la
extensión, Node no encuentra el módulo — el error es sobre resolución, no sobre sintaxis, y por
eso pasó inadvertido en la primera prueba.

Astro (Vite) y Cloudflare (esbuild) aceptan esa misma extensión sin cambiar nada de cómo
compilan — se verificó con `npm run build`, `astro check` y `wrangler pages dev` antes de
confiar en ello. `correoHtml.test.mjs` usa este camino nativo; `solicitud.test.mjs` se queda
con su regex por ahora — migrarlo es una mejora aparte, con su propia verificación, no un
efecto colateral de este cambio.

---

## L-076 — Una petición nueva puede invalidar una respuesta que ya estaba cerrada

**Lección.** Abraham pidió un panel para que el hotel actualice precios. La petición es
razonable y no tiene nada de raro — pero `preguntas-cliente.md` tenía **F4 marcada como
RESUELTA** con la respuesta contraria, confirmada por el propio cliente: *"lo gestiona Abraham,
no personal del hotel"*. Y esa respuesta no era un detalle: **es la que justificó descartar
WordPress** en ADR-0004 (*"un CMS se justifica cuando alguien va a usarlo"*).

Lo fácil habría sido construir el panel y no decir nada. La contradicción existiría igual; la
diferencia es si queda escrita hoy o se descubre dentro de tres meses, cuando alguien lea
ADR-0004 y pregunte por qué hay un CMS en un proyecto que decidió no tener CMS.

**Lo que enseña:** las preguntas cerradas no son inmunes. Una petición nueva puede reabrir una
decisión vieja, y el momento de detectarlo es **antes de escribir código**, releyendo qué
decisiones se apoyaban en la respuesta que está cambiando. Aquí eran tres: el descarte de
WordPress, la ausencia de superficie de autenticación y el alcance de la capacitación al hotel.

**Cómo se resolvió:** F4 pasa de ✅ RESUELTA a 🔄 REABIERTA, con la frontera nueva escrita
—«el hotel edita precios, Abraham edita todo lo demás»— y marcada como **pendiente de
reconfirmar con el cliente**. No se da por buena una respuesta que nadie ha dado: el cliente
aceptó por escrito que no podría editar el sitio, y merece la oportunidad de aceptar por
escrito la nueva frontera.

**El patrón:** una decisión registrada es un activo sólo si se relee cuando cambia el contexto.
Un ADR que nadie vuelve a abrir es documentación muerta. La señal de que hay que releer es
justamente ésta: *una petición que suena sencilla y que sin embargo no encaja con lo que ya
está construido.*

---

## L-077 — Un umbral con holgura tolera lo que nadie decidió tolerar

**Lección.** El guardián de `og:image` decía: *"al menos `total − 2` páginas deben declararlo"*,
con un comentario explicando que el margen era para los dos 404, *"que no llevan metadatos
sociales a propósito"*. Al añadir el panel de precios, el guardián siguió en verde.

Pero por la razón equivocada. Los 404 **sí llevan `og:image`** —el comentario llevaba tiempo
mintiendo—, así que el margen de 2 estaba entero sin usar, y el panel se lo comió sin que nada
avisara. El guardián no aprobó el panel: simplemente le sobraba holgura de una excepción que
nunca existió.

**Lo que enseña:** un umbral numérico con margen es una excepción **anónima**. No dice *qué* se
está tolerando, así que cualquier cosa nueva cabe dentro mientras quede hueco — y cuando el
hueco se acaba, falla por algo que quizá sí era legítimo. Peor: el comentario que justifica el
margen envejece sin que nadie lo verifique, porque el guardián en verde no invita a releerlo.

**La corrección:** una lista explícita de rutas exentas. Ahora dice exactamente qué se exceptúa,
el mensaje de fallo nombra el archivo concreto, y añadir una excepción obliga a escribirla —que
es justo la fricción que se quiere.

**El patrón, general:** cuando una comprobación necesite una excepción, nómbrala. `total − 2` es
una excepción sin nombre; una lista con un archivo dentro es una decisión.

---

## L-078 — Cambiar la condición de un `if` puede romper el `else` que cuelga de él

**Lección.** El auditor de accesibilidad avisaba de que `/panel/` no tenía enlace «saltar al
contenido». Es un aviso legítimo en cualquier página del sitio, pero no en ésa: WCAG 2.4.1 se
llama *Bypass Blocks* y existe para saltar **bloques de navegación repetidos**. El panel no
tiene navegación — no hay nada que saltar. Exigirlo ahí es ceremonia sin beneficio.

La regla estaba así:

```js
if (!salto) A(...)                                  // avisa: no hay enlace
else if (!existeElDestino(salto[1])) F(...)         // falla: apunta a la nada
```

y se cambió a `if (!salto && hayNavegacion)`. Parece inocuo. **No lo es:** las dos ramas dejaron
de ser excluyentes. Una página sin enlace *y* sin navegación —el panel exactamente— hace falsa
la primera condición, cae al `else if`, y lee `salto[1]` sobre `null`. El auditor entero
reventaba con un `TypeError`.

**No lo encontró la corrida normal: lo encontró calibrar.** Rompí una página a propósito para
comprobar que la regla nueva seguía detectando el caso real, y el script se cayó antes de
llegar a decirlo. Sin ese paso, el bug habría viajado en el commit y el guardián habría muerto
en silencio la próxima vez que alguien añadiera una página sin `<nav>`.

**El patrón:** al añadir una condición a un `if`, revisar **siempre** qué cuelga de su `else`.
Si las ramas ya no cubren el mismo espacio de casos, hay que separarlas —dos `if` anidados en
lugar de una cadena—, no confiar en que el orden siga funcionando.

**Y el meta-patrón, ya con cuatro casos (L-035, L-047, L-068, éste):** calibrar no es
opcional ni ceremonia. Cada vez que se toca un guardián hay que romperlo a propósito y
comprobar que grita — es la única forma de distinguir «pasa porque está bien» de «pasa porque
ya no comprueba nada».

---

## L-079 — Elegir bien dentro de una muestra minúscula sigue siendo elegir mal

**Lección.** Abraham miró la galería y dijo: «las fotos son muy básicas y malas». Tenía razón,
y lo interesante es **por qué** el archivo se defendía a sí mismo.

El comentario de `galeria.ts` presumía de rigor: *«de las diez fotografías de propiedad que se
revisaron una por una, ocho entraron y dos se descartaron»*, con el detalle de por qué salió
cada una. Todo cierto. El dato que faltaba: **eran diez de 244**. La curaduría original nunca
abrió el grueso del banco, y ahí estaba lo bueno —un atardecer con camastros bajo la pérgola,
el arco de piedra hacia la playa, una panorámica de la selva y el mar, la alberca iluminada de
noche—. Ninguna de esas cuatro se había visto siquiera.

**Lo que enseña:** el rigor sobre la muestra equivocada produce un informe convincente y una
conclusión mala. Peor: **el rigor documentado ahuyenta la revisión**. Nadie vuelve a mirar un
archivo cuyo comentario explica con detalle el criterio aplicado — se asume que ya se pensó.

**El síntoma que debió delatarlo antes:** el mismo archivo afirmaba, en otro componente, que
«ninguna fotografía del hotel tiene la alberca como sujeto, hay que pedirla al cliente». Era
falso: había dos. Una carencia sólo se puede afirmar **tras mirar todo el material**; con una
muestra parcial lo honesto es decir «no encontré», no «no hay». Ese matiz habría hecho evidente
que la muestra era el problema.

**La regla, tercera vez que aparece (L-041, L-071, ésta):** antes de curar, contar el universo.
Si la muestra revisada no es el 100 %, el porcentaje va **escrito en el resultado** — «8 de 10
revisadas» es un dato distinto de «8 de 244 disponibles», y sólo el segundo permite juzgar si
la selección vale.

---

## L-080 — Un `<style>` con ámbito no alcanza lo que crea el JavaScript

**Lección.** El mapa de «Cómo llegar» carga bajo petición: el `<iframe>` no existe en el HTML y
lo crea un script cuando el huésped pulsa el botón. El CSS decía
`.mapa__iframe { width: 100%; height: 100% }` y el iframe salía a 304 × 154 dentro de un marco
de 545 × 340.

La causa es el ámbito de Astro. Al compilar, `<style>` añade un atributo `data-astro-cid-…` a
cada elemento **del template** y acota todos los selectores a ese atributo. Un elemento creado
con `document.createElement` no lo lleva, así que la regla no lo toca nunca. El arreglo es
`:global()`, acotado por un ancestro que sí está en el template —`.mapa__marco :global(.mapa__iframe)`—
para que «global» no signifique «en todo el sitio».

**El corolario, que costó otro hallazgo:** el detector de clases del proyecto marcó
`.mapa__iframe` como CSS muerto. También era un punto ciego suyo — sólo leía atributos `class`
del marcado, y no veía `el.className = '…'`, `classList.add()` ni los selectores de
`querySelector('.x')`. Se le enseñó a mirar ahí, y se calibró rompiendo algo a propósito para
comprobar que sigue detectando CSS muerto de verdad.

**El patrón:** todo lo que el ámbito de un componente no alcanza —elementos creados en tiempo
de ejecución, contenido inyectado, un `<slot>` de terceros— necesita una decisión explícita.
Y la herramienta que audita ese ámbito tiene que conocer las mismas vías por las que el código
asigna clases, o reporta como muerto lo que está vivo.

---

## L-081 — Adoptar el diseño de la plantilla no obliga a adoptar su promesa

**Lección.** Cappa remata la caja de reserva de su portada con **«Check Availability»**. Aquí
ese botón es imposible: el hotel no opera PMS ni channel manager, y la regla 2 prohíbe mostrar
disponibilidad que no podamos respaldar. Un botón que dice comprobar disponibilidad y no la
comprueba es la promesa incumplida que este proyecto vino a corregir — y de paso reintroduce el
riesgo de sobreventa que ADR-0003 entero existe para evitar.

La salida no fue descartar el bloque ni copiarlo entero: **se conserva la forma y se cambia la
promesa**. Misma caja clara sobre la fotografía, mismos cuatro campos, mismo botón ancho; el
botón dice «Solicitar reserva», los datos viajan a `/reservar/` y el hotel confirma a mano.

**El patrón, general:** una plantilla aporta *composición* —qué va dónde, con qué peso visual—
y de paso arrastra las *afirmaciones* de su demo. Lo primero es reutilizable casi siempre; lo
segundo hay que auditarlo pieza por pieza contra lo que el cliente puede sostener de verdad.
Copiar sin separar las dos cosas es como acaban los sitios que prometen lo que no cumplen.

**Y el detalle que lo hizo barato:** el formulario grande ya leía `?tipo=` desde el sprint 2.
Añadir tres claves más fue enseñarle a leer lo que ya sabía leer. Un `<form method="get">` sin
una línea de JavaScript hace el resto — el navegador ya sabe serializar campos en una URL.

---

## L-082 — Una página que se genera vacía es peor que una página que no existe

**Lección.** La carta del restaurante está bloqueada por **C0**: el propio FAQ del hotel dice
«por ahora no tenemos servicio de restaurante o bar». Se construyó el diseño completo con el
dato en blanco, siguiendo el patrón ya usado dos veces —el WhatsApp en `null`, los precios con
`publicable: false`—.

Pero la primera versión era un `index.astro` normal, y el resultado fue **peor que no tener
página**: se generaba igual, con su banner a toda pantalla y su título «Restaurante», y debajo
nada. Una URL que anuncia un servicio y no entrega nada dice exactamente lo contrario de lo que
el interruptor pretendía evitar.

La corrección es una ruta dinámica cuyo `getStaticPaths` devuelve un array vacío mientras la
carta no sea publicable: **la ruta no existe**, el sitio da 404, y eso es la verdad. Cuando el
hotel confirme, la misma función devuelve la ruta y la página aparece sin tocar código.

**Lo que enseña:** «no publicar un dato» y «no publicar una página» son cosas distintas. Vaciar
el contenido de una plantilla deja el envoltorio —título, banner, entrada en el menú, URL
indexable— afirmando que el servicio existe. Cuando lo bloqueado es la página entera, hay que
bloquear la RUTA, no el contenido.

**Y la calibración casi falla por mi culpa:** al comprobar que la página no se generaba busqué
`dist/restaurante/` como directorio, cuando este sitio emite `dist/restaurante.html` plano. La
primera lectura dijo «no se genera» en los dos casos —con el interruptor abierto y cerrado—, lo
que habría dado por bueno un interruptor roto. Una comprobación que no distingue los dos
estados no comprueba nada (L-078 otra vez, con otra cara).

---

## L-083 — Tres intentos para una línea de puntos, y los tres sólo se ven renderizando

**Lección.** La carta de Cappa separa el nombre del plato y su precio con una línea de puntos
que rellena el hueco. Parece trivial. Costó tres intentos, y **ninguno de los dos fallos se
podía ver leyendo el CSS**:

1. `::after` en el contenedor flex → el pseudo-elemento se coloca después de **todos** los
   hijos, así que los puntos salían a la derecha del precio.
2. `::after` en el nombre con `width: 100%` → al no ser hijo del flex, ese 100 % se mide contra
   el nombre y forzaba un salto: los puntos caían debajo del texto.
3. `::after` en el contenedor, pero con **`order`** → el pseudo-elemento sigue siendo hijo
   directo del flex, donde `flex: 1` funciona, y se *pinta* en medio. Correcto.

**Lo que enseña:** `order` de flexbox separa el orden del DOM del orden visual, y es
exactamente la herramienta para colocar un pseudo-elemento en medio de sus hermanos —algo que
la posición en el marcado no permite, porque `::before`/`::after` sólo pueden ir al principio o
al final.

**El meta-patrón, y ya van muchas:** el componente se construyó con el dato vacío, así que
**no renderizaba nada**. Entregarlo «listo para cuando lleguen los datos» sin haberlo visto con
datos habría sido entregar tres bugs invisibles. Se rellenó con una carta de prueba —nombres
largos, nombres cortos, un plato sin precio—, se miró, se corrigió, y se revirtió el dato. Un
componente vacío que compila no es un componente que funciona.

---

## L-084 — La decisión sobre un dato es del cliente; la de no inventarlo, nuestra

**Lección.** El sitio del hotel se contradecía sobre el restaurante: sus páginas de servicios
lo anunciaban y su FAQ decía «por ahora no tenemos servicio de restaurante o bar». Ante la
duda se retiró del sitio nuevo (L-031) y se abrió la pregunta **C0**.

Abraham resolvió la contradicción como **Proxy PO**: *«ignora el FAQ, el restaurante existe»*.
Y eso cierra el asunto — es exactamente su papel. El FAQ del sitio viejo es una fuente, no la
autoridad; quien habla con el cliente decide cuál de dos fuentes contradictorias vale.

**Lo que enseña sobre los roles:** plantear el conflicto una vez, con la evidencia literal
delante, es hacer bien el trabajo. Repetirlo después de que el responsable ha decidido no es
rigor, es no saber dónde termina la propia autoridad. Se dijo, se decidió, se ejecutó.

**Y lo que NO cambia con esa decisión:** que el restaurante exista no nos dice **qué se sirve
en él**. La carta sigue vacía, porque lo decidido fue una cosa y los platos son otra. Una
decisión sobre A no autoriza a rellenar B — y por eso `categorias` sigue en `[]` y la página
lo dice en vez de inventar seis entrantes con precio.

**Del mismo modo, el spa NO vuelve.** Estaba retirado en el mismo comentario que el
restaurante, y la tentación de restaurar los dos de una pasada era real. Pero de él no se dijo
nada. Una decisión no se estira a lo que estaba escrito al lado.

---

## L-085 — En un flex, el elemento sin tamaño fijo es el que paga

**Lección.** Añadir «Restaurante» al menú principal tuvo un efecto a tres elementos de
distancia: **el logotipo del hotel se encogió de 112 × 70 a 46 × 28 píxeles**. No se partió el
menú en dos líneas, no se solapó nada, no hubo error — el logo simplemente se hizo pequeño, y
a primera vista parecía una decisión de diseño.

La causa: en la fila de la cabecera, la navegación tiene su ancho, el botón y el selector de
idioma llevan `white-space: nowrap`, y el logo era **el único elemento que podía encogerse**.
Cuando el contenido dejó de caber, flexbox repartió el recorte donde encontró holgura.

**La corrección son dos cosas, y hacen falta las dos:**
  · `flex: none` en el logo, para que nunca sea la variable de ajuste.
  · **Volver a medir el umbral** del menú de escritorio. Estaba en 68rem, calculado para seis
    apartados; con siete el contenido suma ~1171 px más el gutter, así que sube a 76rem. Sin
    esto, `flex: none` sólo cambia el síntoma: en vez de encogerse el logo, se desborda la fila.

**El patrón:** cuando se añade un elemento a un contenedor flexible, el coste no lo paga quien
se añade — lo paga el vecino más blando. Y un umbral de media query calculado para N elementos
deja de ser válido con N+1: es un número medido, no una constante.

---

## L-086 — Subir el umbral de una media query esconde el problema, no lo arregla

**Lección.** Al añadir «Restaurante» al menú, siete apartados dejaron de caber en la barra de
escritorio. Mi arreglo (L-085) fue subir el umbral de la media query de 68rem a **76rem**, y
medí que a partir de ahí cabía. Cabía, sí.

Lo que no pensé: 76rem son **1216 px**. En cualquier portátil por debajo de eso —que son
muchos— el menú horizontal simplemente **desaparecía** y salía la hamburguesa. Abraham abrió el
sitio y dijo *«no lo veo para acceder desde el menú»*. El enlace existía, estaba en el HTML, y
no se veía.

**El error de razonamiento:** un umbral de media query no es un ajuste libre. Es la frontera
entre dos diseños, y subirla no hace que quepa más contenido — hace que **menos gente vea ese
diseño**. Yo medí «¿cabe?» cuando la pregunta era «¿lo va a ver alguien?».

**La corrección de verdad fue hacer que el menú quepa**, midiendo qué ocupa cada apartado:

```
Preguntas frecuentes  164 px  ← el doble que cualquier otro
Alojamiento           104
Restaurante            91
Cómo llegar            89
Servicios              69
Contacto               67
Galería                54
```

Un solo elemento se llevaba el 21 % de la barra. Pasó a **«FAQ»** —la misma abreviatura que usa
Cappa, y la que espera cualquiera— y el hueco entre apartados bajó de 24 a 16 px. Resultado:
782 → **594 px**, y el umbral vuelve a 68rem, ya probado.

**El matiz que lo hace correcto y no un recorte:** la etiqueta del MENÚ y el TÍTULO de la página
son claves distintas (`nav.faq` y `faq.titulo`). La página sigue llamándose «Preguntas
frecuentes». El menú necesita ser breve; el encabezado puede ser descriptivo. Acortar el menú
no obliga a empobrecer la página.

**La regla:** cuando algo no cabe, el primer instinto —dar más espacio— suele ser el peor.
Antes hay que medir **qué** ocupa el espacio, porque casi siempre hay un elemento
desproporcionado que se lleva la culpa entera.

---

## L-087 — Doce guardias en verde y el sitio llevaba seis commits sin desplegarse

**Lección.** Abraham dijo *«no lo veo desplegado»*. Tenía razón, y el alcance era mucho mayor
de lo que parecía: producción estaba **seis commits atrás** — sin la galería nueva, sin el
mapa, sin el formulario del héroe, sin el restaurante. Días de trabajo que nadie podía ver.

La causa: al instalar `wrangler`, el `package-lock.json` quedó desincronizado. `npm ci` fallaba
en diez segundos y con él el CI y Cloudflare. **Aquí todo seguía en verde** porque en local se
usa `npm install`, que es tolerante y arregla el lockfile sobre la marcha, mientras que `npm ci`
—el que usan CI y Cloudflare— es estricto por diseño.

**El fallo de método, y es el mismo de siempre:** mis doce guardias comprobaban el sitio.
Ninguno comprobaba **que el sitio pudiera publicarse**. Verificaba mi trabajo, no su entrega.

🔴 **Y es la SEGUNDA vez.** L-040 fue la primera: el CI estuvo trece commits en rojo sin que
nadie lo viera. Entonces corregí el fallo concreto y escribí la lección — pero no añadí una
comprobación. **Una lección sin guardián se vuelve a aprender**, y esta vez costó seis commits.

### La cadena de causas, que tardó cinco intentos en desmontarse

Cada intento falló por una razón distinta, y sólo probándolo se veía:

| Intento | Qué hice | Por qué falló |
|---|---|---|
| 1 | `npm install` para regenerar | Faltaban `@emnapi/core` y `runtime`: en macOS son opcionales y npm no las resuelve |
| 2 | Forzar `--os=linux --cpu=x64 --libc=glibc` | npm no resuelve las **transitivas** de un paquete opcional que su plataforma descarta |
| 3 | Añadir las entradas al lockfile a mano | El siguiente `npm install` las borra — el parche se deshace solo |
| 4 | Quitar `wrangler` (que las traía vía `miniflare`) | Ayudó, pero los binarios wasm de Astro y sharp seguían pidiéndolas |
| 5 | Generar el lockfile **en Docker**, con `--package-lock-only` | Ese modo no descarga nada: registra el árbol pero omite los **binarios nativos**. `npm ci` pasaba y el build moría con *«Cannot find native binding»* |
| 6 ✅ | Generar en Docker con **instalación real** | Funciona. 278 → 363 paquetes: los 85 que faltaban son binarios de Linux, Windows y wasm |

**La causa raíz, en una frase:** npm resuelve un árbol **distinto** en macOS y en Linux cuando
hay dependencias opcionales por arquitectura, y `npm ci` exige coincidencia exacta. Un lockfile
generado en macOS es estructuralmente incapaz de satisfacer a `npm ci` en Linux.

### Lo que se hizo para que no vuelva a pasar

1. **Un guardián nuevo** en `verificar-todo.sh` que corre `npm ci` **en Docker** — comprobar en
   macOS era comprobar la plataforma equivocada. Si no hay Docker, **avisa en voz alta** en vez
   de dar un falso verde: un guardián que no puede comprobar debe decirlo.
2. **El procedimiento escrito** en `site/README.md`, con la trampa incluida: después de generar
   el lockfile en Docker, **no correr `npm install` a secas** — lo reescribe con la resolución
   de macOS y lo rompe otra vez. Me pasó en mitad de la investigación.
3. `wrangler` sale de `devDependencies`. Es una herramienta para probar las Pages Functions, no
   algo que el sitio necesite para construirse; `npm run functions:dev` lo descarga con `npx`.

### ⚠️ Un hallazgo secundario que sigue abierto

Al desbloquearse `npm ci`, el CI avanzó y falló en unos **guardias de la Definition of Done que
sólo existen en el workflow** —`description`, `canonical`, `hreflang`— y que `verificar-todo.sh`
no comprueba. Por eso en local nunca los vi.

**Hay dos conjuntos de comprobaciones distintos**, y el de local no es un superconjunto del de
CI. Eso significa que «todo en verde» aquí no garantiza que el CI pase. Se anota como **R-27**:
lo correcto es que el workflow llame a `verificar-todo.sh` y que los guardias vivan en un solo
sitio.

**El patrón, general:** un conjunto de comprobaciones que no incluye *«¿esto se puede
publicar?»* mide la calidad del trabajo, no su llegada. Y en un proyecto donde el entregable es
un sitio en línea, lo segundo es lo único que el cliente ve.

---

## L-088 · R-27 cerrada: dos listas de guardias, y ninguna sabía de la otra

**Contexto.** El CI tenía sus propias guardias de la Definition of Done escritas a mano dentro
de `.github/workflows/site.yml`, en paralelo a las de `scripts/verificar-todo.sh`. Las dos
listas se escribieron en momentos distintos y **nunca se compararon**.

**El resultado, medido:** el CI exigía `description`, `canonical`, `hreflang` y `width/height`
en cada imagen. El script local no comprobaba ninguna de las cuatro. Así que «todo en verde»
aquí no significaba nada sobre allí, y sólo se descubrió cuando el CI se desbloqueó tras seis
commits parado (L-087) y falló en comprobaciones que en esta máquina llevaban meses pasando.

**La técnica que faltaba tiene nombre: *single source of truth* aplicada a la configuración.**
Es la misma idea que el proyecto ya aplica al contenido —regla 6 de CLAUDE.md, «el contenido se
modela como datos, nunca incrustado en el marcado»— y que no se había aplicado a las
comprobaciones. Un guardián duplicado no es un guardián reforzado: son dos guardianes que
divergen, y el día que divergen nadie se entera.

**Lo que se hizo.** Las guardias se mudaron a `verificar-todo.sh` y el workflow quedó reducido a
tres pasos: instalar, correr el script, publicar el informe. Correr `./scripts/verificar-todo.sh`
en local es ahora, literalmente, correr el CI.

Una sola excepción, y declarada en el propio workflow: la comprobación del lockfile levanta un
contenedor Docker para reproducir la instalación de Linux, y el CI **ya está** en Linux — el
`npm ci` del propio job es la prueba directa. Se salta con `SALTAR_LOCKFILE=1`. Una excepción
escrita y razonada no es una divergencia; una excepción implícita sí.

**Y apareció el pez que el agujero escondía.** Al unificar, se añadió también `html-validate`,
que estaba en la lista de «comprobaciones periódicas, no de cada cambio». Encontró de inmediato
un `<form>` sin botón de envío en el panel de precios (WCAG H32): quien pulsara Enter dentro de
un campo esperaba guardar y no pasaba nada. Llevaba ahí desde que se construyó el panel.

> **El patrón:** *una comprobación que sólo se corre cuando uno se acuerda no es una
> comprobación, es una intención.* Y el corolario que ya va por la tercera vez en este
> proyecto: el hueco entre dos guardianes es exactamente donde se instalan los defectos.

**Antipatrón evitado:** «lo copio al workflow para no depender del script». Duplicar una
comprobación por comodidad de arranque produce dos verdades, y la más laxa siempre gana, porque
es la que se corre a diario.

---

## L-089 · Un hover de color que no se puede pintar, y por qué se dice en voz alta

**Petición del cliente (2026-09-01):** «los textos de menú que en el hover cambien de color como
en la plantilla».

En las páginas interiores es trivial y está hecho: la cabecera es sólida, el enlace pasa a
pistacho y cumple 5.9:1. **En la portada no se puede**, y la cuenta es la que manda.

Sobre la fotografía del héroe, el blanco da **4.93:1** en el punto más desfavorable —medido
sobre los píxeles reales de `hero-roof-top.webp` componiendo el velo, 18 muestras—, apenas por
encima del 4.5:1 que exige WCAG 1.4.3. Despejando la fórmula de contraste, para que otro color
pasara ahí haría falta una luminancia relativa **≥ 0.908**: un blanco con un tinte tan leve que
nadie lo llamaría verde. Cualquier pistacho reconocible como tal cae a **2.6:1**.

El estado `:hover` es texto, y le aplica el mismo mínimo que a cualquier otro estado. Así que en
la portada el cambio se hace con el **subrayado** —que es un componente gráfico y sólo necesita
3:1— y el texto se queda en blanco.

**Lo que se aprende no es el número, es el reflejo.** La petición era legítima y la respuesta no
es «no se puede» a secas: es «se puede en 36 de las 38 páginas, aquí está la cuenta de por qué
en las dos restantes no, y esto es lo que se hace en su lugar». Un requisito que choca con un
criterio de accesibilidad se responde con la medición, no con el gusto de nadie.

**Antipatrón evitado:** cumplir la petición al pie de la letra y dejar el menú en 2.6:1 sobre la
foto. Nadie lo habría notado en la demo —se ve bonito— y lo habría notado quien mira el teléfono
a pleno sol en una playa de Tulum, que es exactamente el usuario de este sitio.

---

## L-090 · Cambiar de color de marca sin perder la disciplina que lo sostenía

**Petición del cliente:** «mejorar color de tipografía por colores más verde pistache
(branding?)». El signo de interrogación es del cliente.

El acento venía del oro de Cappa (`#aa8453`) y de él salieron **tres** tokens, no uno, por una
razón que no es estética: un color de marca casi nunca cumple a la vez el 3:1 que WCAG 1.4.11
pide a los componentes y el 4.5:1 que 1.4.3 pide al texto. Por eso había un tono decorativo, uno
para texto y uno para hover.

Al cambiar de familia se conservó **entera esa estructura**, y se volvió a medir contra los tres
fondos del sitio —no sólo contra blanco, que fue el error de L-036—:

| token | | blanco | cálida | alterna | uso |
|---|---|---|---|---|---|
| `--color-accent` | `#6F9440` | 3.51 | 3.23 | 3.04 | bordes, iconos, rellenos |
| `--color-accent-text` | `#4A6E2C` | 5.90 | 5.43 | 5.11 | cualquier acento con texto |
| `--color-accent-hover` | `#3A5C24` | 7.67 | 7.06 | 6.64 | hover y foco |

El oro daba 3.42 / 4.53 / 6.53 en esas mismas casillas: el verde no baja el contraste en ninguna
y sube medio punto la del texto. **axe-core: 0 violaciones en 10 páginas** tras el cambio.

**Y el cambio destapó un defecto anterior.** `.boton--secundario:hover` pintaba blanco sobre el
acento *decorativo* — 3.42:1 con el oro, insuficiente para texto. Llevaba así desde el sprint 1
y **axe nunca lo vio, porque axe no prueba estados de hover**. Lo encontró la aritmética al
recalcular la tabla, no una herramienta.

> **El patrón:** cuando se cambia un token de color hay que reproducir la MEDICIÓN, no el valor.
> Y la medición se hace contra el fondo más desfavorable en el que ese token se vaya a usar —
> incluidos los estados que ninguna herramienta automática visita.

**Lo que este cambio NO resuelve, y queda dicho:** el logotipo sigue siendo dorado y turquesa.
Verde de interfaz junto a oro de marca convive, pero no es una identidad. Si el pistacho es la
marca nueva, hace falta un logotipo nuevo — y eso es un archivo, no código. Revertir, en cambio,
son **tres líneas**: ningún componente conoce el color, sólo el token. Ésa es exactamente la
razón de que los tokens existan.

---

## L-091 · Reutilizar un componente hereda también sus reglas locales

`SeccionPresentacion` llevaba desde el sprint 1 una línea aparentemente inocua:

```css
.presentacion { scroll-margin-top: calc(-1 * var(--desplazamiento-ancla)); }
```

Un margen **negativo** que anula el `scroll-padding-top` global. Correcto en la portada: allí la
cabecera es `absolute`, se va con el héroe y no tapa nada, así que reservarle 120 px deja una
franja de foto arriba que se lee como un salto a medias.

Al crear `/nosotros/` el 2026-09-01 se reutilizó ese mismo componente —bien: el contenido es el
mismo y duplicarlo habría creado dos verdades—. Pero allí la cabecera **sí** es pegajosa, y con
el margen negativo un salto a `#el-hotel` aterrizaba 120 px demasiado alto, con el título debajo
de la cabecera.

Se acotó con un selector estructural, `:global(.hero) + .presentacion`: la regla ya no dice
«esta sección», dice «esta sección **cuando va detrás del héroe**», que es lo que siempre quiso
decir.

**En la misma sesión, el defecto simétrico:** las secciones nuevas de instalaciones y eventos
llevaban `scroll-margin-top` propio *además* del `scroll-padding-top` global. **Los dos se
suman, no se anulan** — 240 px medidos de hueco muerto sobre el título al que acabas de saltar,
el doble de lo necesario. Doscientos cuarenta píxeles de aire parecen una decisión de diseño
hasta que sabes que ciento veinte era el número.

> **El patrón:** una regla CSS escrita para un contexto viaja con el componente al siguiente.
> Antes de reutilizar, hay que preguntarse qué supuestos del sitio original están cocidos
> dentro. Y `scroll-margin` y `scroll-padding` se suman: declarar el global y el local es
> pedir el doble.


---

## L-092 · `overflow: hidden` sobre una altura fija no contiene: esconde

Al construir «Qué hacer en Tulum» (2026-09-01) las tarjetas se escribieron del modo obvio:

```css
.act {
  display: flex; flex-direction: column; justify-content: flex-end;
  aspect-ratio: 3 / 4;      /* la proporción de las tarjetas de habitación */
  overflow: hidden;
}
```

Se ve perfecta con los ocho textos escritos y a 1152 px de ancho. **Y recorta en silencio en
cuanto el contenido crece**: con el texto alineado al final, lo que no cabe se sale por ARRIBA,
y `overflow: hidden` se lo come empezando por el título.

**Calibrado a propósito**, que es la única forma de verlo: se triplicó un párrafo desde la
consola. La tarjeta seguía midiendo 290 px y **185 px de texto quedaban fuera**.

Y no hacía falta un texto absurdo. Medido a 1024 px de ancho, la tarjeta más larga —«Reserva de
Sian Ka'an»— tenía **22 px de holgura**. Una traducción algo más larga, una palabra más, o
alguien con el tamaño de letra del navegador subido —que es una preferencia de accesibilidad,
no un caso raro— y se pierde el titular sin que nada avise. Ningún guardián del proyecto lo
habría cazado: el HTML es válido, axe no ve texto recortado por CSS y el auditor mira el
marcado, no la geometría.

**La solución: que la proporción sea un mínimo, no una jaula.** Un espaciador vacío comparte
celda de rejilla con el texto, así que la altura es el mayor de los dos:

```css
.act { display: grid; grid-template-columns: minmax(0, 1fr); }
.act__marco, .act__texto { grid-area: 1 / 1; }
.act__marco { aspect-ratio: 3 / 4; }   /* sólo reclama alto */
.act__texto { align-self: end; }
```

Verificado en los dos sentidos: con el texto normal la tarjeta mide 290 px —manda la
proporción—; con el texto triplicado crece a 476 px y **no queda nada fuera**.

> **El patrón:** cualquier caja de altura fija con texto dentro necesita una vía de escape.
> `overflow: hidden` no es una contención, es una venda: convierte un defecto visible en uno
> invisible, que es peor.

**Nota de método, y por poco cuesta la lección entera.** La primera comprobación tras el arreglo
dijo que seguía recortando. Estuve a un paso de concluir que la técnica no servía. El navegador
estaba sirviendo el CSS anterior desde su caché: al preguntar por el DOM, el espaciador nuevo
**no existía** en la página que estaba midiendo. Antes de creerse una medición que contradice lo
que acabas de escribir, hay que comprobar que estás midiendo lo que acabas de escribir.


---

## L-093 · Lo que la paleta no sabe que existe, y lo que una muestra ve y una prueba no

Dos hallazgos del mismo día (2026-09-01), y los dos aparecieron al preparar **muestras del
correo para mirarlas**, no al ejecutar nada.

### 1. La plantilla de correo se quedó en el oro viejo

El día anterior el acento del sitio pasó de oro (`#856741`) a pistacho (`#4A6E2C`) cambiando
tres tokens. **El correo de acuse siguió mandando en oro.** No es un descuido evitable con
cuidado: los clientes de correo no resuelven `var()`, así que `correoHtml.ts` lleva cada color
escrito a mano y es estructuralmente incapaz de enterarse de un cambio en `tokens.css`.

Ningún guardián lo vio, porque ninguno compara un `.ts` con un `.css`. Se descubrió por
casualidad.

**Lo que se hizo:** una comprobación nueva en `verificar-todo.sh` — todo color que la plantilla
de correo *pinte* tiene que estar declarado en `tokens.css`, salvo cuatro neutros que el correo
usa y el sitio no. Si alguien cambia un token y no actualiza el correo, el valor viejo deja de
existir y esto falla.

**Y la calibración tuvo dos vueltas, las dos por el mismo motivo.** Al romperla a propósito
pasó en verde con el color equivocado: el grep encontraba `#856741` en `tokens.css`… dentro del
**comentario** que explica el cambio de paleta. Acotado a las declaraciones, falló bien. Al
volver a probar, falló con el archivo correcto: ahora el grep encontraba el oro en el
**comentario de `correoHtml.ts`** que documenta este mismo problema. Acotado también a las
líneas que pintan, quedó bien.

> Dos veces seguidas, la documentación de un cambio se hizo pasar por el cambio. Cualquier
> comprobación que lea código fuente tiene que distinguir lo que el código HACE de lo que el
> código CUENTA — y esa distinción sólo se descubre calibrando.

### 2. «1 menores»

El correo del manager y el del huésped escribían `${n} ${r.menores}` sin mirar `n`. Con un solo
menor decía **«1 menores»**, y en inglés habría dicho **«1 children»**, que es peor.

Las nueve pruebas unitarias del módulo estaban bien enfocadas —vigilan la aritmética de las
noches, que es lo único que puede equivocarse en silencio— y ninguna miraba la redacción. **No
falta una prueba: falta mirar el resultado.** Un dato correcto mal escrito sigue siendo el
primer contacto del huésped con el hotel.

La corrección es interesante por lo que enseña del i18n: en español bastaba con quitar la «s»,
pero en inglés es `child` / `children`. **La pluralización no se puede deducir de la cadena**,
así que el singular es un dato del diccionario, no una regla del código. Cuatro pruebas nuevas
—una de ellas específicamente sobre el plural irregular inglés— para que, una vez visto, no
vuelva.

### La técnica, que tiene nombre

Generar **muestras deliberadas** de un artefacto que no se puede revisar en el navegador. Las
seis variantes del generador no son ejemplos bonitos: cada una ejerce una rama distinta —el
mínimo que el formulario acepta, acentos y `ñ` (el defecto del `charset` que ya se coló una
vez), HTML inyectado en un comentario, un texto largo de verdad, y el inglés completo—.

Es lo mismo que un *golden file*, sólo que revisado por una persona en vez de por un `assert`:
para lo que se puede afirmar, hay pruebas; para lo que hay que ver, hay muestras. El correo cae
entero en el segundo grupo, porque se ve distinto en Gmail, en Outlook y en Mail de iOS.


---

## L-094 · El mismo aspecto, jerarquías opuestas: diseñar por el trabajo, no por la marca

El cliente pidió (2026-09-01) que el correo del manager llevara diseño, sobre la misma plantilla
que el del huésped. La tentación evidente era duplicar el del huésped cambiando el destinatario.
Sería un error, y el motivo es la única pregunta que importa al diseñar un correo transaccional:
**¿qué viene a hacer aquí quien lo abre?**

| | Acuse al huésped | Aviso al manager |
|---|---|---|
| Trabajo | Tranquilizarse | **Actuar**, muchas veces desde un teléfono y con prisa |
| Primer elemento | Saludo por su nombre | **Las fechas**, grandes |
| Los datos | Ordenados para leer | Ordenados para **cotejar** contra el cuadrante |
| El contacto | No aparece | `mailto:` y `tel:` **pulsables** |
| Remate | Es una solicitud, no una reserva | El aviso de **no pedir datos de tarjeta** |

El envoltorio sí se comparte —franja oscura, serifa, superficies cálidas, acento del sitio—
porque los manda el mismo hotel y el huésped recibe los dos. Lo que no se comparte es la
jerarquía. *Una marca coherente no es la misma página repetida: es el mismo vocabulario
resolviendo problemas distintos.*

### Tres decisiones que sólo se ven pensando en el teléfono del manager

1. **Las fechas arriba y grandes.** Sin PMS, la disponibilidad vive en su cabeza y en una
   libreta (ADR-0003): el cotejo es lo primero que hace. Buscar las fechas entre seis filas es
   tiempo de respuesta perdido, y el tiempo de respuesta es lo que convierte una solicitud en
   una reserva.

2. **`reply_to` con el correo del huésped.** Una línea en la llamada a Resend. Sin ella,
   «Responder» contesta a `CORREO_REMITENTE` —un buzón que no lee nadie— y **la respuesta se
   pierde sin que nadie se entere**: ni el manager, que cree haber contestado, ni el huésped,
   que cree que no le contestaron. Es el fallo más caro imaginable de este flujo y cuesta un
   campo.

3. **El aviso de PCI-DSS dentro del correo.** Es el hallazgo crítico del proyecto (R-13) y el
   runbook operativo lo pone arriba del todo. Pero **un runbook se lee una vez**; esto se lee en
   cada solicitud, que es justo el momento en el que alguien podría pedir una tarjeta «para
   apartar». Un recordatorio tiene que vivir donde ocurre el trabajo, no donde está documentado
   el trabajo. Y lleva una prueba unitaria: no para que se vea, sino para que nadie lo quite
   porque estorba.

### El texto plano no se sustituye, se acompaña

El argumento con el que este correo se escribió en texto plano —«llega igual a cualquier cliente
de correo, se lee en el teléfono del manager»— **seguía siendo bueno**. Así que no se retiró: se
mandan las dos partes, `text` y `html`. Es además lo que evita que los filtros de spam castiguen
a un transaccional por venir a medias.

> Cuando una petición choca con una decisión anterior, lo primero es mirar si el argumento de
> entonces sigue en pie. Aquí seguía — y resultó que las dos cosas cabían.

### 🟢 Y el guardián nuevo funcionó a la primera de verdad

La caja del aviso necesitaba un rojo suave de fondo, `#fdf3f3`, que el sitio no tenía. La
comprobación escrita la víspera (L-093) **falló inmediatamente**: «color del correo que ya no
existe en `tokens.css`».

Y tenía razón en algo que yo no había pensado. La respuesta correcta no era añadirlo a la lista
de excepciones, sino **declarar `--color-error-suave` en `tokens.css`**: un color que el correo
pinta y el sitio no conoce es exactamente cómo se separan los dos, que es el problema que ese
guardián existe para impedir. Medido de paso: 6.91:1 del rojo de error sobre él.

Es la primera vez en este proyecto que un guardián escrito el día anterior corrige el diseño del
día siguiente, en vez de limitarse a confirmar lo que ya se sabía.


---

## L-095 · Cuando la petición es imposible, la respuesta útil es la de al lado

El cliente pidió «investigar cómo quitar fotos de TripAdvisor y eliminar cuentas». Las dos mitades
resultaron ser preguntas distintas de las que parecían.

**Las fotos son tres cosas, no una.** Las que subió el hotel se borran en dos minutos desde el
Centro de Gestión. Las que subieron los huéspedes **no se pueden borrar**, y es política
deliberada de TripAdvisor: si el propietario pudiera, ninguna ficha valdría nada. Y las que puso
un socio de distribución no salen de ninguna de las dos partes — hay que quitarlas en el origen.
La respuesta útil para la segunda clase no es un procedimiento, es una estrategia: **no se
pelean, se entierran** subiendo fotografía propia reciente, que el hotel ya tiene.

**«Eliminar cuentas» eran dos cosas, y sólo una es la que se quiere.** Quitarle a alguien el
acceso a la ficha del hotel es un ajuste de permisos que se hace en un minuto. Cerrar la cuenta
personal de esa persona sólo lo puede hacer ella, con su contraseña — y pedírsela sería
exactamente lo que nunca hay que hacer.

**Y borrar la ficha del hotel no se puede.** TripAdvisor sólo retira la de un negocio cerrado o
vendido, con pruebas. Decirlo y parar habría sido correcto y también inútil: lo que se puede
hacer —y es casi seguro lo que se quería— es **quedarse y mandar sobre el contenido**: reclamar la
ficha, fusionar duplicados (nunca borrarlos, la fusión conserva las reseñas), limpiar accesos y
subir fotos buenas.

> **El patrón:** ante un encargo imposible, la entrega no es la negativa. Es averiguar qué
> problema hay detrás y resolver ése. «No se puede borrar la ficha» es media respuesta; «no se
> puede, y esto es lo que sí controlas» es la respuesta entera.

### Y una nota de método sobre la propia investigación

**El Centro de Ayuda de TripAdvisor no se puede leer con un `fetch`**: se pinta con JavaScript y
devuelve una cáscara con el título y nada más. Lo que hay en el documento sale de resúmenes
indexados y de respuestas de su personal en el foro de soporte — que es una fuente más débil.

Eso se dice en la cabecera del documento en vez de presentarlo como oficial. **Una fuente que no
se ha podido leer entera se marca**, aunque el contenido sea probablemente correcto: quien lo
lea dentro de seis meses tiene que saber qué comprobar antes de escribirle a nadie.


---

## L-096 · El hover que «no se podía»: cambiar la variable que nadie había puesto sobre la mesa

El cliente pidió por segunda vez que el menú cambiara de color al pasar el ratón, «como en la
plantilla». La primera vez respondí que sobre la fotografía del héroe no se podía, con la cuenta
delante: el blanco daba 4.93:1 y cualquier verde reconocible caía a **2.61:1**, muy por debajo del
4.5:1 de WCAG 1.4.3.

La cuenta era correcta. **La respuesta no.**

Estaba tratando el problema como una elección entre dos cosas —el color que quiere el cliente o
el contraste que exige la norma— cuando había una tercera variable que ninguno de los dos había
tocado: **el fondo**. El velo del héroe pasó de 0.34 a 0.52 de negro en su primer 14 %, que es
justo la banda donde se posa la cabecera. Con ese fondo:

| | velo 0.34 | velo 0.52 |
|---|---|---|
| blanco (texto normal) | 4.93:1 | **7.7:1** |
| pistacho claro (hover) | 2.61:1 | **5.05:1** |

El cliente tiene su hover **y** el contraste sube: el texto blanco pasa de un 10 % de margen sobre
el mínimo a un 70 %. **R-22 —«el punto más ajustado del sitio»— deja de serlo.** El precio es que
el cielo del primer 14 % de la foto se ve más apagado, y es un precio elegido a sabiendas.

> **El patrón, y es de negociación antes que de CSS:** cuando una petición choca con un criterio
> duro, casi nunca hay que elegir entre los dos. Hay que buscar la variable que nadie ha nombrado.
> Aquí eran quince píxeles de degradado.

### De paso, lo que el cliente veía y yo no

Al mirarlo de cerca resultó que el hover **sí** cambiaba de color en las 36 páginas interiores
desde el primer día. Lo que fallaba era otra cosa: nuestro hover encendía además un
`border-bottom`, y **esa raya se comía el protagonismo del color**. Cappa no la tiene —su
`.nav-link:hover` es exactamente `color: #aa8453` y nada más—; nosotros la habíamos añadido.

Se retiró del hover y se dejó sólo para `aria-current`, que es la página actual. Un mismo adorno
para «estás aquí» y para «el ratón está encima» dice dos cosas con un solo signo, y el lector
acaba sin distinguir ninguna. Se añadió también la transición de 0.35 s que Cappa sí tiene
(`transition: all .4s`), porque sin ella el cambio se lee como un parpadeo y no como una
respuesta.

> **Cuando alguien insiste en que algo «no funciona» y las mediciones dicen que sí, la pregunta
> no es quién tiene razón: es qué está viendo esa persona que yo no estoy mirando.** Aquí era una
> raya de un píxel tapando el efecto entero.

---

## L-097 · Las fotos y el texto se reparten la misma caja, y eso hay que medirlo

Las ocho tarjetas de «Qué hacer en Tulum» llevan el texto **dentro** de la fotografía, como pidió
el cliente. El velo que garantiza el contraste iba sobre la TARJETA, con la banda densa en su 38 %
inferior. Se veía bien.

Medido con las ocho fotos puestas, no lo estaba:

| tarjeta | el texto arranca al | alfa del velo ahí | contraste |
|---|---|---|---|
| título de una línea | 51 % | 0.55 | 4.7:1 |
| «La carretera de Boca Paila» | 58 % | 0.42 | 3.0:1 |
| «Zona arqueológica de Tulum» | 64 % | 0.33 | **2.3:1** |

Dos de ocho por debajo del mínimo, y la peor a la mitad. **La causa es que el título de dos
líneas empuja el párrafo por encima de la banda densa** — el velo no sabía cuánto texto había.

Y a ojo no se notaba, porque esas dos fotos son oscuras justo ahí. **Cumplían por suerte, no por
diseño**: cambiar una foto por otra más clara habría roto el texto sin tocar una línea de CSS.

La solución no fue subir la banda —eso arregla estas ocho y no la novena—: fue **colgar el velo
del propio texto**. Ahora el degradado va sobre la caja que contiene las letras, con un
desvanecido de 2.5 rem arriba y ese mismo relleno para que la primera línea nunca caiga dentro
del desvanecido. Mida lo que mida el texto, el velo lo cubre: 10.4:1 sobre el peor caso posible,
una fotografía blanca pura.

> **El patrón:** un velo dimensionado contra el CONTENEDOR protege lo que hoy hay dentro. Un velo
> dimensionado contra el CONTENIDO protege lo que haya. La diferencia sólo aparece cuando el
> contenido cambia — es decir, cuando ya nadie está mirando.

### Y las fotos no son gratis aunque sean gratuitas

De estos ocho lugares no hay una sola fotografía en el archivo del hotel: sus 244 imágenes son
todas de la propiedad. Las ocho salen de Wikimedia Commons y de Flickr, con licencia libre — que
**no quiere decir sin obligaciones**: Creative Commons BY y BY-SA permiten el uso comercial *a
cambio de citar autor y licencia*.

Por eso el crédito no es un pie de página opcional: **es la condición de uso**. Si se borra, las
ocho fotografías pasan a estar usadas sin permiso. Hay un guardián en `verificar-todo.sh` que
comprueba que cada autor declarado aparezca de verdad en la página construida, en los dos
idiomas, y falló en su primera calibración por un motivo que merece la pena: **el único autor con
un `&` en el nombre**. El HTML lo escapa como `&amp;` y el `grep -F` no lo encontraba. El crédito
estaba puesto; el guardián mentía.

> Cualquier comprobación que busque texto dentro de HTML tiene que buscarlo **escapado**. Es la
> tercera vez en dos días que una comprobación falla por leer el código como si fuera texto plano.


---

## L-098 · Un aviso que no rompe nada no lo lee nadie — ni yo

El cliente escribió: «el texto de inicio se ve demasiado simple». Lo era: el párrafo de
presentación de `/actividades/`, `/nosotros/`, `/eventos/` y `/restaurante/` llevaba
`class="entradilla"`, **una clase que no existe en ninguna hoja del sitio**. La buena es
`.entrada-pagina`. Cuatro páginas con un párrafo sin un solo estilo, durante semanas.

Lo humillante es que **el proyecto ya tenía la herramienta que lo detecta y venía diciéndolo**.
`verificar-estilos.mjs` la listaba en cada ejecución:

```
⚠ 6 clase(s) usadas y no definidas en ninguna parte:
  .entradilla  —  views/Actividades.astro, views/Eventos.astro, views/Nosotros.astro, views/Restaurante.astro
```

Un aviso, no un fallo. `process.exit(rojas.length ? 1 : 0)` — las amarillas no rompían nada. Y
una comprobación que no rompe nada se convierte en decoración de la consola: la vi salir docenas
de veces y no la leí ni una.

**Es literalmente la lección que el propio script lleva escrita en su cabecera**, sobre por qué
existe la lista de excepciones: *«un aviso que siempre devuelve trece avisos se deja de leer a la
segunda semana, y entonces el aviso número catorce —el que sí importa— pasa desapercibido»*
(L-047). Estaba aplicada a las excepciones y no al aviso principal.

Ahora las amarillas fallan. Las tres clases que legítimamente no llevan estilo —envoltorios de
rejilla— van a `INTENCIONALES` con su motivo escrito, que es la regla de siempre: **si no se
puede escribir el motivo, no era intencional**.

> **El patrón, y va por la tercera vez en este proyecto:** la diferencia entre una herramienta y
> un guardián es el código de salida. Una clase que no existe no da error, no rompe el build, no
> la ve ningún auditor de accesibilidad ni de HTML — se degrada, y el resultado **tiene aspecto
> de decisión de diseño**. Por eso lo encontró el cliente y no la máquina que ya lo sabía.

### Y al arreglarlo, el arreglo se rompió a sí mismo — dos veces

**Primero:** documenté dentro del componente que `class="entradilla"` era el nombre equivocado…
y el script leyó la cita del comentario y volvió a dar la clase por viva. El propio script
limpiaba los `/* */` de las hojas de estilo —esa trampa ya estaba corregida— pero no los
`{/* */}` de las plantillas. Estaba a medio arreglar.

**Y al limpiarlos, el patrón se comió marcado real.** Aplicaba el borrado a todo lo anterior al
`<style>`, frontmatter incluido: ahí hay JavaScript lleno de `{` y de `/* */`, así que enganchó
una llave de un objeto con el `*/` de un comentario treinta líneas más abajo. `.solicitud`, que
está en el `<form>`, apareció de golpe como definida y no usada.

Lo cazó **el propio script, en la misma ejecución en la que se estrenaba el arreglo**. Es la
mejor demostración posible de para qué sirve: la herramienta que buscaba clases huérfanas
encontró la que ella misma acababa de dejar huérfana.

> Cualquier análisis que lea código fuente con expresiones regulares tiene que **cortar primero
> los ámbitos** —frontmatter, comentarios, cadenas— y buscar después. Es la cuarta vez en dos
> días que una comprobación falla por leer el código como si fuera texto plano.

---

## L-099 · Tres columnas caben más texto que cuatro

El cliente pidió pasar la rejilla de actividades de cuatro columnas a tres, «para aumentar el
tamaño de la imagen». La intuición dice que menos columnas = menos contenido a la vista. La
aritmética dice lo contrario:

| | 4 columnas | 3 columnas |
|---|---|---|
| ancho de tarjeta | 280 px | **384 px** (+37 %) |
| caracteres por línea | ~30 | **~48** |
| renglones del mismo texto | 6-7 | **3-4** |
| alto ocupado por el texto | ~200 px | ~150 px |

**El mismo texto, sin quitar una palabra, ocupa un tercio menos de alto** — porque la línea es
más larga. La queja era «hay tanto texto que no se ven las fotos», y la causa no era la cantidad
de texto: era el ancho de la columna. Ensanchar la tarjeta resuelve las dos mitades a la vez.

De paso, ~48 caracteres por línea entra en la medida de lectura recomendada (45-75); a 30 el ojo
salta de renglón cada tres palabras, que es lo que hacía que el bloque **pareciera** más largo de
lo que era.

> **El patrón:** cuando un bloque de texto se ve demasiado largo, medir el ANCHO antes de
> recortar el contenido. La sensación de longitud la produce el número de renglones, no el número
> de palabras.

### La animación que no promete lo que no cumple

Se pidió también hover en las tarjetas. Estas tarjetas **no son enlaces a propósito** —no
recomendamos negocios, así que no llevan a ninguna parte—, y ahí cualquier efecto de los
habituales —elevarse, proyectar sombra, subrayar el título— **promete una navegación que no
existe**. Se mueve sólo la fotografía, con un zoom lento de 1.5 s: se lee como que la imagen está
viva, no como un botón.

`scale` va sobre la imagen y no sobre la tarjeta, porque escalar la tarjeta movería también el
texto, y un texto que se desplaza bajo el cursor es justo lo que impide leerlo.

> Una animación de hover es una promesa. Antes de elegirla hay que saber qué pasa al hacer clic.


---

## L-100 · Segmentar antes de implementar: un bloque de texto no es una tarea

La gerencia del hotel envió un bloque de unas 400 líneas: tipologías, textos de marca, fichas de
cada habitación, amenidades, políticas y un «Nosotros», en español y en inglés, sin estructura.
El encargo de Abraham fue explícito y correcto: **«primero segmenta el contenido, divídelo, y
luego implementa»**. Y añadió la instrucción que hizo falta de verdad: *«esta conversación fue
antes de los cambios que tú y yo hicimos; lo reciente tiene prioridad — pídeme autorización antes
de volver a cambiarlo»*.

Sin esa segunda instrucción, el resultado previsible es un desastre silencioso: el texto de la
gerencia dice «Suite Mar», «vista frontal al mar y a la alberca infinita» y «manos mexicanas», y
todo eso **ya se había cambiado** —a Bungalow, a «vistas paradisíacas frente al mar» y a «manos
mayas»— a petición del propio cliente días antes. Aplicarlo tal cual habría deshecho una semana
de decisiones y habría parecido un error de lectura, no de método.

### La segmentación, que es donde estaba el trabajo

Ocho bloques con destinos distintos, y sólo dos eran obvios:

| Bloque | Dónde va | Qué era en realidad |
|---|---|---|
| Tipologías y conteos | `content/alojamiento/*.json` | **La respuesta a C1**, el bloqueante más viejo del proyecto |
| Fichas por habitación | `amenidades` de cada ficha | 13-17 datos por tipo, contra los 4 que teníamos |
| Amenidades del hotel | `facilidades` en `hotel.ts` | Inventario, no argumentos de venta — **otra forma** |
| Políticas | `data/politicas.ts` | Tres bloques nuevos, incluidos los únicos CARGOS del sitio |
| Marca y bienvenida | `hotel.ts` + héroe | Con el conflicto de «manos» dentro |
| Nosotros | ya estaba | Idéntico a lo publicado: cero trabajo |
| Nombres «Deluxe» | fichas + `<title>` | Nombre comercial, no descripción |
| Nota operativa | todas las fichas | «AC y Wi-Fi bajo la cama, cafetera bajo el frigobar» |

**El hallazgo grande estaba escondido en la primera línea.** El bloque empezaba con un listado que
parecía administrativo —«3 Bungalow con balcón…»— y era **C1 respondida**: 24 unidades con su
desglose. C1 llevaba bloqueando `build:prod` desde el sprint 0. Nadie lo anunció como respuesta;
venía como preámbulo.

### Y las cuentas destaparon dos habitaciones que no existían en el sitio

3 + 3 + 5 + 1 + 10 + 2 = 24. Nuestro catálogo suma 22. La diferencia son dos bungalows que la
gerencia describe con todo detalle —«Bungalow Arrecife» y «Villa Luna»— y que **no estaban en
ninguna parte**: ni en el sitio vigente, ni en la captura, ni en nuestro catálogo.

No se descubrieron leyendo, se descubrieron **sumando**. Y el reparto encaja como un guante: tres
bungalows con el jacuzzi en la terraza (Mar, Agua, Arrecife) y tres con roof top propio (Cielo,
Aire, Luna).

> **El patrón:** cuando llega un inventario, súmalo. Un total que no cuadra no es un detalle
> contable — es un producto que existe y que el sitio no está vendiendo.

### El guardián cambia de trabajo, no se retira

`check-datos.mjs` vigilaba «¿el cliente confirmó estos números?». Confirmados. La tentación era
darlo por cerrado; lo correcto era **reapuntarlo**: ahora vigila «¿el catálogo publicado suma lo
que el hotel tiene?». Hoy no —22 de 24— y `build:prod` lo bloquea.

Con eso el bloqueante **cambia de dueño**: deja de ser «el cliente no responde» y pasa a ser
«nos faltan dos fotografías». Es una posición mucho mejor, y sólo se ve si el guardián sobrevive
a la respuesta que lo motivó.

> Un guardián que se borra el día que su pregunta se responde desperdicia la única infraestructura
> que ya sabía dónde mirar.

### Cuatro conflictos, cuatro preguntas, cero cambios por mi cuenta

«Manos mexicanas» contra «manos mayas», «Suite» contra «Bungalow», «vista frontal» contra «vistas
paradisíacas», el spa como existente contra el spa como «próximamente». Los cuatro se listaron
con la fecha de cada versión y se preguntó. Ninguno se tocó.

El de las manos no es un matiz de redacción: **es de quién dice el hotel que es la obra**. Un
texto de marca escrito por la gerencia y otro dictado por la propiedad pueden no coincidir, y
resolverlo por antigüedad de fichero habría sido decidirlo por accidente.


---

## L-101 · «Es básicamente una copia del homepage»

El cliente lo dijo así, y era exacto: la página de Amenidades usaba el mismo componente que la
portada, con el mismo encabezado y la misma rejilla centrada. Repetir la composición hace que la
segunda visita parezca que no ha avanzado — el visitante no piensa «qué coherente», piensa «ya vi
esto».

La corrección no fue cambiar el contenido, que es correcto y está confirmado por el hotel. Fue
preguntarse **qué hace cada página**:

| | Portada | Página de Amenidades |
|---|---|---|
| Trabajo | Que alguien **siga bajando** | Que alguien **repase** |
| Estado del lector | No sabe si le interesa | Ya está interesado |
| Forma | **Cartel**: rejilla centrada, icono de 72 px, una frase | **Índice**: filas numeradas, alineadas a la izquierda, línea fina |

Mismo contenido, mismo concepto, distinta forma. Una variante (`variante="editorial"`) y no un
componente nuevo: duplicarlo habría creado dos sitios donde editar la misma amenidad.

Y se le quitó el encabezado a la variante de página, porque el banner ya dice «Amenidades». **Ese
título repetido era la mitad del efecto de duplicado**, y es de las cosas que sólo se ven cuando
alguien de fuera te lo señala.

### El detalle técnico que casi lo tumba: un modificador no gana por ser modificador

`.amenidades--editorial` y `.amenidades` tienen **la misma especificidad** (0,1,0). Cuál gana lo
decide el orden en el archivo — y ganaba la base. El resultado era una variante a medias: el
número y la línea aparecían, pero seguían tres columnas centradas.

Se resuelve escribiendo `.amenidades.amenidades--editorial`, que sube a (0,2,0) y **no depende de
dónde esté escrita la regla**.

> Un modificador que sólo funciona si se escribe después de su base no es un modificador: es una
> coincidencia de orden que el primer refactor rompe en silencio.

---

## L-102 · Una animación de entrada no puede poder dejar la página en blanco

El cliente pidió que los elementos aparecieran al hacer scroll. Es un efecto trivial de escribir
y con dos formas conocidas de arruinar un sitio.

**1. El `opacity: 0` que se queda.** Si el estado inicial se escribe en CSS a secas, quien tenga
JavaScript desactivado —o un bloqueador, o un error de red a mitad de carga— recibe un documento
**completo e invisible**. Es de los fallos más caros que existen porque **no lo detecta ninguna
herramienta**: el HTML está ahí, el marcado es correcto, el auditor da verde.

Aquí el estado inicial vive bajo `.revelar`, una clase que pone un script de tres líneas **en el
`<head>`**. Sin JavaScript no llega, las reglas no aplican y la página se ve entera. Y va en el
`<head>` y no al final del cuerpo por lo segundo: añadida después de pintar, el navegador enseña
el contenido y acto seguido lo esconde para animarlo — un parpadeo en cada carga.

**2. El observador que no dispara.** Se probó con el panel del navegador oculto: **doce elementos
marcados, cero revelados**. En un navegador normal eso se arregla solo al mostrarse la pestaña,
pero «se arregla solo» no es una garantía aceptable sobre el mecanismo que decide si el sitio es
legible. A los dos segundos se revela todo lo pendiente, pase lo que pase.

> La animación puede fallar. La lectura, no. Cualquier efecto que empiece escondiendo contenido
> necesita las dos salvaguardas: que no se aplique si no puede completarse, y que se rinda sola
> si se atasca.

**Y `data-revelar` en vez de una lista de clases.** El script vive en el layout y tendría que
conocer `.amenidad`, `.tarjeta`, `.instalacion`… — exactamente el acoplamiento que
`verificar-estilos.mjs` existe para impedir. Con un atributo, cada componente **declara** qué se
anima y el layout no se entera de los renombrados.

**CLS cero:** sólo `opacity` y `translate`, las dos únicas propiedades que no participan del
layout. Animar `height` o `margin` habría movido la página bajo el dedo de quien está leyendo.

---

## L-103 · El instrumento también miente: tres mediciones falsas en una tarde

**axe-core dijo 22 fallos de contraste en el restaurante.** El fondo real de esa sección es
`#1a1a1a`, medido directamente en el DOM; axe insistía en que era `#ffffff`. La causa apareció al
imprimir el entorno: **`innerHeight` valía 0**. El panel del navegador estaba oculto, y sin
viewport `elementsFromPoint` no devuelve nada, así que axe cae al color del `body`.

Con un iframe de altura explícita, las mismas páginas daban cero. **La herramienta no estaba
equivocada sobre el contraste: estaba midiendo otra página.**

**El guardián del lockfile dio ROJO con un diagnóstico falso.** Comprobaba que el binario `docker`
existiera, no que el demonio respondiera. Con Docker Desktop cerrado —el estado normal de una Mac
recién encendida— el `docker run` fallaba y el guardián lo traducía a «package-lock.json
desincronizado», con una receta para regenerar un lockfile que estaba perfectamente bien.

Su propio comentario decía *«un guardián que no puede comprobar debe avisar, no callar»*. Lo que
faltaba escribir es que **avisar no es acusar**: no distinguir «está roto» de «no lo pude mirar»
manda a arreglar lo que no falla, y a la tercera vez el guardián deja de leerse.

**Y al arreglarlo apareció el tercero.** Un paso que se salta terminaba con éxito, así que
`verificar-todo.sh` lo pintaba en **verde** — un falso verde, que es literalmente lo que ese
script existe para no producir. Ahora hay tres estados: ✓, ⚠ «no se pudo comprobar» con el
motivo, y ✗. El resumen final los cuenta aparte: *«sin fallos, pero 1 comprobación no se pudo
hacer»*.

> **El patrón:** antes de creerse una medición hay que preguntarle al instrumento en qué
> condiciones está midiendo. Un `innerHeight` de cero, un demonio apagado y un código de salida
> ambiguo produjeron tres conclusiones falsas en la misma tarde — y ninguna de las tres se
> parecía a un error.

### De paso, un defecto real que la medición falsa destapó

Al mirar por qué axe se quejaba de los precios de la carta, resultó que usaban
`--color-accent`: el token **decorativo**, cuyo contrato dice «bordes, iconos, fondos» y que sólo
garantiza 3:1 **sobre blanco**. Sobre el `#1a1a1a` de la carta daba 4.96:1 — pasaba, pero por
accidente. `--color-accent-claro`, que nació para texto sobre la foto del héroe, da **11.81:1**.

La alarma era falsa; el hallazgo, no.

---

## L-104 · Escasez de verdad: la ventaja de tener el dato

El cliente pidió mejorar la redacción de las habitaciones «aplicando neuromarketing», sin
párrafos largos. La pieza más fuerte no la puso una técnica: la puso **C1 respondida**.

La gerencia confirmó que **de cada bungalow hay uno**. Así que «de este bungalow sólo hay uno» no
es un recurso: es un hecho, y es el argumento más poderoso que existe en hotelería. La industria
lo falsifica todo el tiempo —«¡últimas habitaciones!», «3 personas están viendo esto»— y quema la
confianza de todos. Un hotel que **de verdad** tiene una unidad de algo lo dice una vez y no
necesita nada más.

Los otros tres recursos, con su nombre:

- **Un momento, no una lista.** «Se pasa del sueño al agua tibia sin cruzar una puerta» se
  recuerda; «jacuzzi privado en terraza» ya está en las amenidades tres centímetros más abajo.
  La descripción no repite la ficha: la **ambienta**.
- **Lo que NO hay.** «Arriba no hay nadie», «rodeado de vegetación y no de vecinos», «nadie a
  quien pedir permiso». En un hotel de 24 unidades la ausencia de gente es el lujo — es lo que
  vende Aman y no puede vender una cadena.
- **Una objeción resuelta antes de formularse.** «Caben cuatro sin que nadie duerma en un sofá»
  contesta la duda exacta de una familia mirando una habitación doble.

🔴 **Y una regla dura: cero prueba social inventada.** Nada de «la favorita de nuestros
huéspedes» ni «la más solicitada». No tenemos ese dato, y una frase así es indistinguible de las
que rellenan las OTAs. En textos así **la credibilidad es el único mecanismo**: una sola frase
que suene a folleto contamina las ocho.


---

## L-105 · Agrupar por intención, y el desbordamiento que ninguna medición veía

El cliente pidió juntar FAQ y Políticas «porque el menú tiene muchos items», y preguntó cómo se
llamaría el apartado. Las dos mitades de la respuesta valen lo mismo.

### El rótulo: neutro o de tarea

«Información» mide 96 px y «Antes de viajar» 120. Los 24 px de diferencia compran algo concreto:
un rótulo neutro **no predice su contenido** —en un sitio web todo es información, que es la
crítica clásica de Nielsen Norman a etiquetas como *Recursos*, *Más* o *Información*—, mientras
que uno de tarea dice qué hay dentro y además reutiliza el vocabulario que la ficha de habitación
ya emplea con «Antes de reservar».

### Lo que de verdad arregló: dos páginas que habíamos perdido

Agrupar dos apartados ahorra un hueco, no una pantalla. **El valor estaba en el sitio que
libera.** «Cómo llegar» y «Contacto» habían salido de la barra el 2026-09-01 por falta de espacio
y se habían quedado sólo en el pie — justo las dos páginas que busca quien **ya decidió venir**.

Y ahí está el criterio que hace que el menú se lea de un vistazo: las cuatro que entran —FAQ,
Políticas, Cómo llegar, Contacto— no comparten formato ni sección; comparten **intención**. Son
lo que se consulta después de decidir, frente a los otros seis apartados, que existen para
convencer. *Agrupar por intención del lector y no por tipo de contenido.*

De paso, dentro de un panel desplegable no hay límite de ancho, así que «FAQ» y «Políticas»
recuperan sus nombres completos. Aquellas abreviaturas eran una concesión al ancho de la barra,
no una decisión editorial, y llevaban meses pareciendo lo segundo.

### Y un defecto de años que salió al medir: «estás aquí» no funcionaba

«Antes de viajar» no tiene página propia, así que estando en `/politicas/` no se encendía nada en
la barra. Al arreglarlo —cambiando `path: string` por `rutas: string[]`— apareció el mismo fallo
en un sitio mucho peor: **estando en la ficha de un bungalow tampoco se encendía «Alojamiento»**,
porque `rutaActual` es `alojamiento/bungalow-mar` y se comparaba con `alojamiento` por igualdad.

Llevaba así desde el sprint 2. Quien recorría el catálogo —el recorrido más importante del
sitio— no tenía ni una pista de dónde estaba.

> Un dato que se compara por igualdad cuando en realidad es una jerarquía falla en silencio para
> todos los hijos. Y los hijos suelen ser la mayoría de las páginas.

---

## L-106 · El ancho no se suma: se le pregunta al navegador. Y con la fuente equivocada.

Para saber si el menú nuevo cabía sumé a mano: logotipo + navegación + acciones + huecos. Me dio
1081, luego 1075, luego 1066 — **tres cifras distintas del mismo layout**, según qué anchura
capturaba y si el `getComputedStyle().width` devolvía caja de contenido o de borde.

La medición que vale es una línea:

```js
f.style.width = 'max-content';           // el ancho intrínseco de la fila
const minimo = f.getBoundingClientRect().width;
```

**1159 px**, con el umbral de escritorio en 1152: se pasaba por 7. Ninguna de mis tres sumas lo
decía, y el navegador no se equivoca sobre su propio layout.

El ajuste también salió de medir. El hueco de `.cabecera__fila` bajó de 24 a 16 px, y es
**gratis visualmente**: con `justify-content: space-between` ese `gap` es sólo un MÍNIMO — de
1200 px en adelante los huecos reales los decide el espacio libre y el número no se nota. Donde
actúa es en el extremo estrecho, que es exactamente donde hacía falta. Mínimo: 1143 px.

### 🔴 Y entonces la pregunta que lo cambió todo: ¿y si la fuente no ha cargado?

Todas las caras del sitio son `font-display: swap`, así que mientras el `.woff2` viaja el
navegador pinta con el respaldo. Forzando el respaldo y volviendo a medir el mismo mínimo:

| tipografía del menú | ancho mínimo de la cabecera | contra el umbral de 1152 |
|---|---|---|
| Barlow Condensed (la de marca) | 1143 px | **cabe**, 9 px |
| `'Arial Narrow'` (primer respaldo) | 1279 px | **se pasa por 127** |
| `system-ui` (segundo respaldo) | 1387 px | **se pasa por 235** |

En cada carga en frío entre 1152 y 1279 px de ancho, la cabecera **se desbordaba** durante el
instante que tarda la fuente en llegar. Y sólo se precargaba Gilda Display —la de los titulares—,
no Barlow Condensed, que es la del menú entero.

**Por qué no lo vio nunca ninguna medición:** todos nuestros scripts empiezan por
`await document.fonts.ready`. Lighthouse, axe y el ojo miden **después** de que las fuentes
carguen. Habíamos automatizado la ceguera a este defecto.

La corrección es precargar la fuente del menú: 14 KB, en paralelo con el CSS. No cierra la
ventana del todo —si la fuente no llega nunca, el respaldo se queda y con él el
desbordamiento—, así que queda como riesgo con sus tres números, no como resuelto.

> **El patrón, y es el más general de los tres días:** una medición hecha en el estado final
> ignora todos los estados por los que se pasa para llegar. La fuente cargando, el observador que
> aún no ha disparado, el panel sin viewport. **El defecto casi nunca vive en el estado final** —
> vive en el camino, que es justo lo que nadie instrumenta.


---

## L-107 · Si la altura se mide en `svh`, todo lo que la consume tiene que estar en `svh`

El cliente vio los botones del héroe cortados y pidió que **todo el contenido se vea sin
scroll, sea cual sea la pantalla**. La causa era una mezcla de unidades, y es un error
sorprendentemente fácil de cometer:

```css
.hero {
  min-height: 100svh;                                  /* la altura disponible, en svh */
  padding-block: 128px 160px;                          /* fija, no sabe de la pantalla */
}
.hero__titulo { font-size: clamp(2.5rem, 1.5rem + 4vw, 4.5rem); }  /* escala con el ANCHO */
```

Las tres líneas compiten por el mismo espacio y **dos de ellas no saben cuánto hay**. En una
pantalla ancha y baja las dos ignorantes ganan: medido a 1900 × 800, el héroe medía **922 px de
alto en un viewport de 800**, y los botones y la flecha quedaban 122 px por debajo del pliegue.

La corrección es una regla, no un ajuste: **el relleno, los márgenes y el cuerpo del titular
pasan a medirse en `svh`**, con topes en `rem` para que en pantallas grandes no crezcan sin
sentido. El titular, que ocupa cuatro renglones y es lo que más altura consume, gana un techo de
ALTURA además del de anchura: `min(var(--text-hero), 8svh)`.

### Y la única forma de saber si funciona es una matriz

Un cambio así no se comprueba mirando: se comprueba en **22 tamaños de pantalla**, midiendo en
cada uno si el héroe cabe y si la flecha queda dentro. Se automatizó con iframes dimensionados y
el resultado fue una tabla, no una impresión.

La primera pasada dejó tres fallos, y cada uno enseñó algo distinto:

- **768 × 600** — ancha y baja. No la cubría ninguna de las dos reglas: demasiado ancha para las
  de móvil, demasiado baja para las de escritorio. Hizo falta un tercer bloque seleccionado por
  `max-height`, **no por anchura**, porque la dimensión que escasea ahí es la altura. *El
  `@media` casi siempre pregunta por el ancho; a veces la pregunta correcta es la otra.*
- **390 × 844 y 360 × 640** — teléfonos. El titular se parte en cinco renglones y los botones se
  apilan: el mismo contenido ocupa el doble. Se recortó el relleno, se bajó el suelo del titular
  —el `clamp` de escritorio tiene mínimo 2.5rem, y en una pantalla baja ese mínimo es el techo— y
  **desapareció la flecha de bajada**, que es una afordancia de ratón: en táctil se desliza.
- **320 × 568** — y aquí está el suelo. Con el titular ya en 29 px faltan 49. Reducir más haría
  el texto ilegible, y el aviso de «solicitud sujeta a confirmación» no se puede esconder porque
  es la promesa de ADR-0003. **Se documenta como límite medido, no se disimula.**

Resultado: **21 de 22 tamaños**, del iPhone SE a 2560 × 1440.

### Un aviso de método que costó una medición equivocada

La segunda pasada de la matriz reusó las mismas cadenas de consulta que la primera, así que el
navegador sirvió el **HTML cacheado**, que apuntaba al **CSS anterior**. La tabla informó de
48 px donde la regla nueva daba 42, y estuve a punto de perseguir un fallo que no existía.

> Cualquier arnés de medición que cargue páginas necesita una URL nueva por ejecución. Es la
> quinta vez en cuatro días que un instrumento miente, y ya van tres causas distintas:
> viewport de altura cero, demonio apagado y ahora caché.

---

## L-108 · «Es un degradado raro» era la fotografía

El cliente señaló una franja clara en el borde derecho del héroe, junto al botón flotante, y la
describió como un degradado mal hecho. Lo primero fue comprobar si era un elemento: con
`elementsFromPoint` a lo largo de todo el borde, la pila resultó **idéntica en cada punto** —
ninguna capa de más.

Lo segundo fue mirar la imagen. Dibujándola en un `<canvas>` y leyendo sus píxeles reales, el
borde derecho es **rgb(86,170,237)**: cielo abierto, mientras el centro es la pérgola en sombra.
El velo del héroe tiene ahí sólo un 6 % de negro, así que el salto de luminosidad de la propia
foto se lee como una franja pegada al borde.

**No era un defecto de render, era la fotografía.** Pero el cliente tenía razón en que molestaba,
y lo que molestaba tenía arreglo: un 26 % de negro en el 18 % derecho iguala la densidad de los
dos lados sin tocar el centro — y de paso le da fondo al botón flotante, que hasta ahora se
posaba sobre el punto más claro de toda la portada.

> **El patrón:** cuando alguien reporta un defecto visual, la primera pregunta no es «¿qué CSS lo
> causa?» sino **«¿lo causa algún CSS?»**. Descartar el DOM cuesta una línea y evita horas
> buscando una regla que no existe. Y descartar no es descartar la queja: el problema era real,
> sólo que estaba en otra capa.

---

## L-109 · El umbral que baja: agrupar el menú devuelve pantallas

El umbral de escritorio de la cabecera ha cambiado cuatro veces: 68rem con seis apartados, 68 con
siete, **72 con ocho** —porque no cabían— y ahora **68 otra vez con seis**.

Que baje no es un ajuste: es la consecuencia medible de dos decisiones de contenido. Agrupar FAQ
y Políticas bajo «Antes de viajar» y meter «Actividades» dentro de «Amenidades» llevó la barra de
ocho apartados a seis, y el ancho mínimo de la cabecera de 1105 px a **1057**.

| apartados | ancho mínimo | umbral posible | margen |
|---|---|---|---|
| ocho | 1105 px | 72rem (1152) | 25 px |
| siete | 1143 px | 72rem (1152) | 9 px |
| **seis** | **1057 px** | **68rem (1088)** | **31 px** |

Con eso vuelve el menú horizontal entre 1088 y 1152 px: los portátiles de 1152×720 y las ventanas
a media pantalla en monitores grandes — exactamente el caso que el cliente había reportado en su
día como «no lo veo para acceder desde el menú».

> Una decisión de arquitectura de información paga en píxeles, y los píxeles pagan en pantallas
> que recuperan la navegación. La cadena entera se puede medir; conviene medirla, porque es el
> argumento que convierte «hay muchos items» en «ganamos 64 px de portátiles».


---

## L-110 · «Pixel perfect» es una proporción, no un número

El cliente dijo que el menú se veía apretado y que **las flechas de despliegue estaban muy cerca
del siguiente apartado**. La descripción era exacta, y el diagnóstico salió de medir las dos
distancias que rodean a cada flecha:

| | medido |
|---|---|
| etiqueta → su propia flecha | **8 px** |
| flecha → siguiente apartado | **11 px** |
| proporción | **1.4 a 1** |

Ahí está todo. Por la **ley de proximidad de la Gestalt**, un elemento pertenece visualmente a
aquello de lo que está más cerca. A 1.4 a 1 la flecha no pertenece a ninguno de los dos: flota
entre dos palabras y el ojo la asigna, mitad de las veces, a la equivocada. No era que faltara
espacio en general — era que **el espacio estaba mal repartido**.

El arreglo son dos números que sólo tienen sentido juntos: **5 px dentro y 16 fuera**, proporción
**3.2 a 1**. A partir de 2.5 a 1 la agrupación deja de ser ambigua; por debajo de 2, discute.

> Ajustar «a ojo» habría subido el hueco entre apartados y dejado la flecha igual de suelta,
> porque el problema no era la distancia absoluta sino la **relación entre la de dentro y la de
> fuera**. Cuando algo «se ve apretado», mide las dos distancias que compiten antes de tocar una.

### Y es el primer ajuste de este hueco que SUBE

Quinta vez que se toca: 24 px con seis apartados, 16 con siete, 12 con ocho, 11 con siete… y
ahora **16 con seis**. Los cuatro anteriores fueron cesiones al ancho — cada apartado nuevo se
pagaba aquí— y el precio acumulado fue una barra apretada donde la agrupación se rompió.

Se puede pagar porque agrupar el menú liberó ancho: el mínimo de la cabecera sube de 1057 a
1070 px contra un umbral de 1088, y quedan 18 px. **Reducir el número de apartados no sirvió sólo
para que cupieran: sirvió para poder volver a separarlos bien.**


---

## L-111 · Centrar reparte la holgura… y también el desbordamiento

El cliente vio «mucho espacio vacío» entre el menú y el antetítulo del héroe. Medido a
2000 × 853, el reparto vertical era:

| | px |
|---|---|
| bajo el menú | **100** |
| del contenido a la flecha | 60 |
| bajo la flecha | 32 |

El contenido estaba `align-items: end` —anclado abajo—, así que toda la holgura sobrante se
acumulaba arriba. Cien píxeles de vacío contra sesenta no es una decisión de composición: es lo
que queda cuando la caja se alinea a un borde y el resto se lo come el otro. Y el ojo lo lee como
un error de cálculo, que fue exactamente la palabra que usó el cliente.

Centrado, la holgura se reparte: **100 → 60 px** bajo el menú, con el bloque ópticamente en medio
del área visible.

### Y centrar creó dos fallos nuevos, los dos por el mismo motivo

**`center` reparte la holgura por igual, pero cuando el contenido NO cabe reparte el
DESBORDAMIENTO igual de bien** — se sale por arriba tanto como por abajo. Y por arriba está la
cabecera.

- **Teléfonos** (375 × 667, 360 × 640): el titular quedaba **11 y 21 px POR ENCIMA** del borde
  inferior del menú. La causa de fondo: el relleno superior estaba escrito como `6.5rem`, un
  número que casualmente superaba los 104 px de la cabecera en escritorio y no llegaba a ellos en
  móvil. Se sustituyó por `max(calc(var(--alto-cabecera) + var(--space-3)), 13svh)`: **la garantía
  deja de ser un número copiado y pasa a derivar del token que la define**, así que viaja sola a
  cualquier pantalla y a cualquier cambio futuro de la cabecera.
- **900 × 500**: el mismo síntoma en escritorio, y con una causa que da vergüenza — mi propio
  `@media (max-height: 700px)`, añadido dos horas antes, sobrescribía el `padding-block` con un
  `clamp(4.5rem, …)` y **se llevaba por delante la garantía que ese padding estaba cumpliendo**.

> Un `@media` que sobrescribe una propiedad hereda también la obligación que esa propiedad
> cumplía. Si el valor base codificaba una regla —«nunca menos que la cabecera»—, la
> sobrescritura tiene que volver a codificarla, o la rompe en silencio en el rango que cubre.

La red final es `align-items: safe center`: en el momento en que habría desbordamiento, la
alineación cae a `start`. El contenido se pierde por abajo, que es recuperable con scroll, y
nunca por arriba, que no lo es.

### El resultado, y por qué hay que contarlo con dos números y no con uno

**26 de 26 pantallas sin solapamiento** con el menú — la garantía dura. **25 de 26 con todo
visible sin scroll**; la que falta sigue siendo 320 × 568, el suelo ya documentado.

Y en el camino, la cabecera del teléfono baja de 104 a 84 px porque el logotipo pasa de 144 a
108. No contradice la petición de ampliarlo —aquélla era sobre la barra de escritorio, donde
compite con siete apartados—: en una pantalla de 375 px, 144 px de logotipo son el 38 % del ancho
para una cabecera que sólo lleva el logo y la hamburguesa. Los 20 px que se ahorran son
exactamente los que le faltaban al héroe.


---

## L-112 · Un hueco entre versales no se juzga solo: compite con el tracking

Segunda vez que el cliente dice que el menú se ve apretado. La primera lo arreglé cambiando la
PROPORCIÓN entre la flecha y su etiqueta (L-110) —y era correcto, la flecha ya no flota— pero el
hueco entre apartados se quedó en 16 px y seguía leyéndose corto. **Dos veces es señal de que el
número está mal, no la percepción.**

La explicación es tipográfica y no de gusto: **estas etiquetas van en versales con
`letter-spacing`**. El aire dentro de las palabras compite con el que las separa, así que un
hueco que sería generoso en texto corrido se queda corto en cuanto las letras se abren. Con
tracking a 0.12em, 16 px de separación equivalen ópticamente a bastante menos.

Por eso los dos números se tocan a la vez, y sólo tienen sentido juntos:

| | antes | ahora |
|---|---|---|
| hueco entre apartados | 16 px | **24 px** |
| tracking de las etiquetas | 0.12em | **0.10em** |
| razón flecha: dentro / fuera | 3.2 : 1 | **4.8 : 1** |

Menos aire dentro hace que el mismo hueco se lea como más. **Bajar el tracking mejora la
percepción y además paga parte del coste**, que es la clase de ajuste que sólo aparece cuando se
entiende por qué molesta, no cuando se sube el número que molesta.

### Y los 40 px se pagaron con palancas medidas una a una

Antes de tocar nada se midió cuánto costaba cada opción, probándola aislada sobre el ancho mínimo
de la cabecera:

| palanca | efecto |
|---|---|
| hueco 16 → 24 | **+40 px** |
| tracking 0.12 → 0.10em | −16 px |
| hueco de la fila 16 → 8 | −16 px *(gratis: con `space-between` es sólo un mínimo)* |
| relleno del selector de idioma 8 → 4 | −8 px |
| relleno del botón 20 → 16 | −8 px |

Resultado: mínimo **1062 px** contra un umbral de 1088. **26 px de holgura — más de los 18 que
había antes de ensanchar el menú.** El menú respira más y la cabecera está menos apretada que al
empezar.

> **El patrón:** cuando algo no cabe, la pregunta no es «¿de dónde recorto?» sino «¿cuánto vale
> cada recorte posible?». Medir las palancas por separado convierte una discusión de gusto en una
> lista de precios, y entonces se elige la combinación que menos duele. Aquí ninguna de las cuatro
> cesiones es perceptible; el hueco que compran, sí.

---

## L-113 · Un color por trabajo: el botón no tiene por qué ser el acento

El cliente pidió «#376452 para los btn». La vía rápida era repintar
`--color-accent-text`, que es lo que rellenaba `.boton--primario`. **Habría repintado también los
enlaces del pie, los rótulos de sección, las viñetas de las listas de amenidades y los iconos**,
porque ese mismo token hacía de color de texto acentuado en todo el sitio.

Se creó `--color-boton` aparte, con su pareja `--color-boton-hover`. La consecuencia buena no es
que el botón sea verde: es que **ahora hay dos perillas independientes**, y cambiar una no arrastra
la otra. El acento pistacho sigue vistiendo el sitio; el verde profundo sólo rellena botones.

> **La regla:** un token nombra un TRABAJO, no un color. `--color-accent-text` era un buen nombre
> mientras el botón y el acento fueran lo mismo; en cuanto dejaron de serlo, seguir compartiéndolo
> era acoplar dos decisiones distintas por el accidente de haber empezado iguales. El síntoma que
> lo delata siempre es el mismo: *«para cambiar A tengo que aceptar que cambie B»*.

### Y midiendo, no suponiendo

| | con blanco encima | sobre el blanco de la página |
|---|---|---|
| `--color-boton` #376452 | **6.76:1** ✓ WCAG 1.4.3 | **3.31:1** ✓ WCAG 1.4.11 |
| `--color-boton-hover` #2A4E3F | **9.29:1** ✓ | 5.29:1 ✓ |

Las dos columnas hacen falta: la primera es el texto DENTRO del botón (1.4.3, mínimo 4.5:1), la
segunda es el botón CONTRA la página (1.4.11, mínimo 3:1). Un color puede pasar la primera y
fallar la segunda, y entonces el botón se lee pero no se ve.

---

## L-114 · El botón principal llevaba dos sprints sin color y ningún guardián lo dijo

Al comprobar en el navegador el cambio de color, la consulta devolvió esto para el botón que envía
la solicitud de reserva:

```
submitBg: "rgb(239, 239, 239)"
```

Ése es el **gris por defecto de los botones del navegador**. `FormularioSolicitud.astro` escribía
`class="boton"` sin el modificador `boton--primario`, así que la acción más importante de la página
—la que remata el flujo entero del proyecto— se pintaba como un botón de sistema, con los
secundarios de al lado bien vestidos.

**Por qué no lo vio nada de lo que ya tenemos:**

| guardián | por qué calla |
|---|---|
| `html-validate` | `<button class="boton">` es marcado impecable |
| axe-core | gris sobre blanco con texto negro contrasta de sobra: **no hay violación** |
| Lighthouse | no juzga si un botón parece un botón de esta marca |
| el auditor propio | busca enlaces rotos, `alt` y objetivos táctiles, no clases ausentes |

Ninguno estaba mal: **ninguno mide «este elemento tiene el aspecto que le toca»**, que no es una
propiedad del documento sino de la relación entre el documento y su sistema de diseño.

> **El patrón:** los defectos que sobreviven a una batería de auditores son los que **no violan
> ninguna regla, sólo la intención**. Se cazan de dos maneras: mirando la página, o preguntándole
> al navegador por el valor computado en vez de por el marcado. La segunda es la que lo encontró
> aquí, y es barata: `getComputedStyle(el).backgroundColor` sobre el elemento clave de cada página.
> Un inventario de clases (`grep -o 'class="[^"]*boton[^"]*"' | sort | uniq -c`) lo habría cazado
> también, y ahora está en el hábito.

---

## L-115 · Una petición repetida en tres sitios no es de la vista: es del dato

El cliente pidió invertir el orden de los dos teléfonos **tres veces**: en el pie, en la sección de
contacto y en la página de contacto. La lectura literal era invertirlos en las tres plantillas.

Hacerlo así habría dejado un cuarto sitio mal: **`FranjaLlamada.astro` y `SeccionPresentacion.astro`
enseñan un solo número, `telefonos[0]`**. Con el cambio en las tres vistas, esos dos habrían
seguido ofreciendo el número que el cliente acababa de mandar al segundo puesto — y son
precisamente los que invitan a llamar.

Se invirtió el array en `data/hotel.ts`. Un cambio, cinco lugares correctos, cero reversiones
repartidas por las plantillas.

> **La regla:** cuando la misma corrección aparece en N sitios, el defecto casi nunca está en los N
> sitios — está **una capa más abajo**, en lo que los alimenta. Y la prueba de que se ha bajado a la
> capa correcta es que aparecen lugares que el cliente no mencionó y que también estaban mal.

---

## L-116 · Las mayúsculas de una promoción se ponen en el CSS, no en el texto

El cliente escribió su franja así: «RESERVA **DIRECTAMENTE** con nosotros para disfrutar de
**PROMOCIONES ESPECIALES**». Copiarla literal al diccionario habría metido versales en el DATO.

Un lector de pantalla que encuentra una palabra íntegramente en mayúsculas **la deletrea**: NVDA y
VoiceOver leen «RESERVA» como *ere-e-ese-e-erre-uve-a*, porque no pueden distinguir una palabra
gritada de una sigla. Es de los defectos más extendidos en promociones de hotel y de los más
fáciles de evitar.

Se guarda en minúsculas, en cuatro trozos, y la franja hace el resto:

- `text-transform: uppercase` — el ojo ve las versales
- `<strong>` en los dos trozos con énfasis — el oído oye el énfasis
- el `<strong>` cambia el **peso**, no el color: un segundo color sería un segundo contraste que medir

> **La regla:** en el dato va lo que se DICE; en el CSS, cómo se ve. Las versales son presentación,
> y el énfasis es semántica — confundirlos hace que una de las dos audiencias se quede fuera.

### Y la animación tiene freno

El brillo y el latido corren **tres veces y paran**. Una animación perpetua es ruido a los diez
segundos y aquí compite con el campo que el huésped está rellenando. Con
`prefers-reduced-motion: reduce` no corre ninguna (WCAG 2.3.3 y 2.2.2): la franja conserva color,
contraste y mensaje, porque **la animación señala el mensaje, no lo contiene**.

---

## L-117 · El mirror dejó de ser segunda fuente cuando el cliente se contradijo

El 2026-09-01 se cerró R-28 así: el cliente dictó el código postal 77760, se contrastó contra su
propio sitio —que publica 77780 en el pie de sus 26 páginas—, y ganó el mirror. La lección de
entonces era buena: *el archivo del sitio viejo vale como segunda fuente contra la que chocar lo
que llega*.

El 2026-09-03 el mismo cliente pidió, por escrito, «cambiar todos los CP 77780 por 77760».

**El método de septiembre uno ya no sirve**, y no porque estuviera mal: sirve mientras haya UNA
fuente que contrastar contra otra. Aquí las dos fuentes son el mismo emisor diciendo cosas
opuestas, así que el desempate ya no puede salir de ninguna de las dos. Hace falta una tercera que
no dependa de él: el buscador del Servicio Postal Mexicano, o un comprobante de domicilio.

Se aplicó lo que pidió —es su domicilio— y **se reabrió R-28** con esa acción escrita.

> **El patrón:** una técnica de verificación tiene condiciones de validez, y conviene escribirlas
> junto a la técnica. «Contrastar contra el mirror» vale contra un descuido; **no vale contra un
> cambio de opinión**. Confundir las dos cosas es cómo un dato equivocado se queda cerrado en la
> documentación con una palomita al lado.

---

## Riesgos abiertos

| # | Riesgo | Impacto | Acción |
|---|---|---|---|
| R-01 | **Licencia de la plantilla Cappa.** Publicar producción sobre un demo raspado sin licencia es exposición legal para nosotros y para el cliente | Alto | Definir quién compra la licencia **antes** de escribir código de producción |
| R-02 | Motor de reservas / PMS actual desconocido. Define el alcance completo | Alto | Pregunta prioritaria en la entrevista |
| R-03 | ~~Calidad de la fotografía~~ **CERRADO** — el mirror confirma 244 WebP de 2025 bien dimensionadas. Queda sólo la cesión de derechos | ~~Alto~~ Bajo | Preguntar únicamente por los derechos (C5.3) |
| R-04 | Posible ficha duplicada en TripAdvisor. **Sigue sin verificarse quién controla la ficha del hotel** — puede estar en manos de la agencia anterior, como la propiedad de ResNexus (R-16) | Medio | Procedimiento completo investigado en [`tripadvisor-fotos-y-cuentas.md`](../01-descubrimiento/tripadvisor-fotos-y-cuentas.md). Fusionar duplicados, **nunca borrarlos**: la fusión conserva las reseñas. Primera acción: abrir la ficha y mirar quién la controla |
| R-05 | NAP inconsistente (teléfono con lada de Monterrey en hotel de Tulum) | Medio | Validar con el cliente |
| R-06 | Titularidad del dominio `azucarhotel.com` desconocida. Puede estar a nombre de una agencia anterior | Alto | Verificar en el sprint 1, no en el lanzamiento |
| R-07 | Sin acceso a Analytics no hay línea base y no se puede demostrar la mejora | Medio | Solicitar accesos en la primera semana |
| R-35 | **La cabecera se desborda si la tipografía del menú no carga.** Con seis apartados el mínimo baja a 1057 px con Barlow Condensed y **1177 con `Arial Narrow`**, contra un umbral de 1088. Mitigado precargando la fuente (14 KB), pero si no llega nunca el respaldo se queda | Medio | La cura estructural es que el menú no dependa del ancho exacto de una tipografía. Mientras tanto: **siete apartados es el techo**, y ninguna etiqueta más larga que «Antes de viajar» (L-106) |
| R-36 | **El héroe no cabe entero en pantallas de 320 px de ancho.** Medido: faltan 49 px con el titular ya en 29 px. Reducir más sería ilegible, y el aviso de «solicitud sujeta a confirmación» no se puede esconder | Bajo | Documentado como suelo medido en `Hero.astro`. Afecta a iPhone SE de 2016 y anteriores; de 360×640 en adelante entra todo (L-107) |
| R-33 | **Tres roof tops con nombre y ninguna descripción: «Selvamar» (jacuzzi), «Blanc» (mirador, según la gerencia) y «White Pearl» (pedido por el cliente).** Puede que Blanc y White Pearl sean el mismo sitio | Medio | Pendiente de confirmar con el hotel. White Pearl sigue marcado como contenido de ejemplo |
| R-34 | **Dos unidades del hotel no están en el sitio: «Bungalow Arrecife» y «Villa Luna».** Son las 2 que faltan para las 24 confirmadas, y no hay ninguna fotografía identificada. **2026-09-03: el cliente pidió «revisar las habitaciones Arrecife y Luna» — es decir, CONFIRMA que existen, pero no mandó ni un dato**: ni capacidad, ni camas, ni vista, ni descripción, ni fotos | Medio | `build:prod` bloqueado a propósito. Sin esos datos no se puede crear su JSON, y **inventarlos es exactamente lo que la regla 7 prohíbe**. Lo que hace falta es una ficha de cada una, del mismo formato que las ocho publicadas |
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
| R-22 | ~~**El contraste de la cabecera sobre el héroe queda en 4.93:1**~~ **MITIGADA 2026-09-02: sube a 7.7:1.** Al oscurecer la franja superior del velo para que el hover pudiera cambiar de color, el margen del texto blanco pasó de un 10 % a un 70 % sobre el mínimo | ~~Medio~~ Bajo | Sigue dependiendo de la fotografía: si se cambia la del héroe, hay que volver a medir las dos filas de la tabla de `.hero__velo` (L-048, L-096) |
| R-21 | **El hotel no publica ningún enlace de WhatsApp**, pero SÍ muestra su icono. En la cabecera de su sitio hay una imagen —`tel_whats.webp`— con un teléfono y el logo de WhatsApp junto a los dos números, y ni un solo `wa.me`. Es decir: probablemente uno de los dos números tenga WhatsApp, y no hay forma de saber cuál | Medio | Pregunta **B4**, ahora más precisa: no es «¿tienen WhatsApp?» sino «¿cuál de los dos números es el de WhatsApp?» |
| R-20 | **El CI y el despliegue dan veredictos distintos.** Cloudflare Pages corre `build`, no `check` ni los guardias; el sitio se publica aunque el CI esté en rojo. Estuvo trece commits así | Alto | Corregido el fallo. Antes del lanzamiento, protección de rama que exija el CI en verde (L-040) |
| R-24 | **Dos de los ocho tipos de alojamiento no tienen ninguna fotografía de cama.** «Habitación King · Vista a la selva» y «Habitación Doble · Vista a la selva» sólo cuentan con fotos de baño, pasillo y balcón en todo el acervo entregado por el hotel — revisadas las 10 y 12 disponibles, ninguna muestra la habitación en sí | Medio | Pedir al hotel fotografía real de esas dos habitaciones (L-071). Mientras tanto, la ficha usa la mejor vista disponible como portada |
| R-25 | **El panel de precios crece por acumulación hasta ser el CMS que ADR-0004 descartó.** Un campo hoy, otro mañana, y en seis meses hay un WordPress artesanal sin sus ventajas | Medio | El alcance escrito en [ADR-0007](ADR-0007-panel-de-precios.md) es la defensa. Si se rebasa, se reabre ADR-0004 y se evalúa un CMS headless sobre git (Decap, Tina) — no se siguen añadiendo campos |
| R-26 | **El token de escritura al repositorio es la credencial más sensible del proyecto.** Quien la tenga puede escribir código, no sólo datos. Aparece con el panel de precios | Alto | Cuatro mitigaciones obligatorias en ADR-0007 §Decisión 3: token de alcance fino a un solo repositorio, sólo como secreto de Cloudflare, ruta de escritura fijada en el código, y rotación con fecha en el runbook |
| R-27 | ~~**`verificar-todo.sh` y el workflow del CI no comprueban lo mismo**~~ **CERRADA 2026-09-01.** Los guardias se mudaron al script y el workflow sólo lo invoca. De paso entró `html-validate`, que estaba fuera y escondía un `<form>` sin botón de envío en el panel | ~~Medio~~ Ninguno | Correr `./scripts/verificar-todo.sh` es ahora correr el CI (L-088) |
| R-28 | 🔴 **REABIERTA 2026-09-03. El código postal ha cambiado dos veces y el cliente se ha pronunciado en los dos sentidos.** Dictó 77760; se contrastó contra su propio sitio, que publica 77780, y el 2026-09-01 se cerró a favor del 77780; el 2026-09-03 pidió por escrito «cambiar todos los CP 77780 por 77760». Está aplicado el 77760. **Ni su palabra ni su mirror bastan ya como fuente** | Medio | Comprobar en el buscador de códigos postales del Servicio Postal Mexicano o contra un comprobante de domicilio del hotel. Afecta al héroe, al pie de 46 páginas, al `PostalAddress` de `schema.org` y a los dos correos — es NAP, y un NAP descuadrado daña el posicionamiento local |
| R-29 | **Dos de las cinco «amenidades» que el cliente pidió en el menú no existen en ninguna parte.** Day Pass / Beach Club y el Rooftop «White Pearl» no aparecen en sus 26 páginas; el texto publicado es nuestro | Medio | Marcado como contenido de ejemplo en `instalaciones` (`src/data/hotel.ts`). Confirmar o retirar antes de producción |
| R-37 | **El cliente pidió una foto de la recepción y en el archivo no hay ninguna.** Revisadas UNA A UNA las 101 fotografías de propiedad del mirror (`img_azucar_001`–`101`): hay habitaciones, baños, terrazas, playa y alberca, y ni un solo mostrador de recepción. Lo más parecido es `img_azucar_015` —el vestíbulo abierto de llegada— y mide 531×700, insuficiente para un banner que pide hasta 1600 px de ancho | Bajo | La página de contacto conserva su fotografía actual. Pedir al hotel una foto de la recepción, apaisada y de 1600 px o más. Cambiarla es una línea en `src/views/Contacto.astro` |
| R-38 | **La fotografía de «La carretera de Boca Paila» le parece fea al cliente y sustituirla exige una licencia nueva.** La actual es de Wikimedia Commons con CC BY-SA 4.0 y su crédito está publicado; cualquier reemplazo necesita su propia licencia y su propio crédito, y descargarla es un paso que no se hace sin autorización | Bajo | O el hotel manda una foto suya de la carretera —lo mejor: sin crédito que mantener— o se elige una CC/dominio público concreta y se ingiere con su `credito`. El guardián «cada foto de terceros lleva su crédito» de `verificar-todo.sh` lo exige |
| R-31 | **«Qué hacer en Tulum» no tiene ni una fotografía.** El archivo del hotel son 244 imágenes de la propiedad: ni un cenote, ni una ruina. Las ocho tarjetas van ilustradas con glifos propios | Medio | Pedir al hotel ocho fotografías del entorno, o comprarlas con licencia. El campo `imagen` está listo: poner la foto es una línea (L-092) |
| R-32 | **El menú llegó a su techo: ocho apartados.** El noveno no cabe ni bajando el tracking, y el umbral de escritorio ya subió a 72rem por el logotipo más grande y el apartado nuevo | Bajo | Si hace falta un apartado más, sale otro. La aritmética está en `Header.astro` |
| R-30 | **La página de Eventos es enteramente contenido inventado.** El sitio vigente no menciona eventos, y no sabemos tipos, aforos ni precios | Medio | Cero cifras publicadas, a propósito. Aviso en la cabecera de `src/data/eventos.ts` |
| R-16 | La agencia anterior **provisionó una propiedad real en ResNexus** (`18DC254A-…`) con unidades cargadas. Se desconoce si sigue activa, si se paga y quién tiene los accesos | Medio-alto | Preguntas añadidas al bloque B de la entrevista |
