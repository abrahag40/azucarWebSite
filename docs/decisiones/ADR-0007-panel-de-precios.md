# ADR-0007 — Panel de precios: el hotel edita, sin base de datos y sin dejar de ser estático

- **Fecha:** 2026-08-22
- **Estado:** Propuesta — requiere visto bueno de Abraham. **Bloqueada por C2 y C3** para la parte que define el esquema de precios
- **Decisor:** Claude (líder de proyecto)
- **Invalida parcialmente:** la respuesta a **F4** del banco de preguntas y su consecuencia en [ADR-0004](ADR-0004-stack-tecnico.md)

---

## 🔴 Lo primero: esto contradice una decisión que ya estaba tomada

`preguntas-cliente.md` marca **F4 como resuelta**, con esta respuesta confirmada por el
cliente:

> *"Lo gestiona Abraham, no personal del hotel. El equipo del hotel atiende OTAs y
> solicitudes, no el sitio."*

Esa respuesta es **la razón por la que se descartó WordPress**. ADR-0004 lo dice sin rodeos:
*"un CMS se justifica cuando alguien va a usarlo. Aquí nadie va a usarlo, así que sólo quedan
sus costos."*

Ahora la petición es un panel para que **el hotel** actualice precios. Eso no es un ajuste: es
la premisa de F4 al revés. Y está bien —los requisitos cambian, y que el hotel quiera control
sobre sus propios precios es una petición sensata—, pero hay que registrarlo en voz alta y
sacar las consecuencias:

| Consecuencia | Qué implica |
|---|---|
| **F4 deja de estar resuelta** | Se reabre. La nueva respuesta es "el hotel edita **precios**, Abraham edita **todo lo demás**" — un alcance intermedio que hay que confirmar con el cliente, no asumir |
| **El hotel pasa a ser usuario del sistema** | Ya no sólo receptor de solicitudes. Necesita capacitación, y el guion de [`guion-capacitacion.md`](../06-traspaso/guion-capacitacion.md) crece |
| **Aparece una superficie de ataque que no existía** | Hasta hoy el sitio no tenía login, ni sesión, ni escritura. Ahora sí |

> **Antipatrón evitado:** construir la funcionalidad sin revisar qué decisión previa
> invalida. La contradicción existiría igual; la diferencia es si queda escrita o se descubre
> dentro de tres meses cuando alguien pregunte por qué hay un CMS en un proyecto que decidió
> no tener CMS.

---

## El problema que hay que decir antes de proponer arquitectura

**No sabemos qué forma tienen los precios de este hotel.** Las preguntas **C2** y **C3** siguen
sin respuesta desde el sprint 0:

- **C2 — Tarifas por temporada y por tipo**, con temporadas y fechas exactas. Y qué incluye y
  qué no.
- **C3 — Impuestos y cargos**: IVA, ISH de Quintana Roo, saneamiento ambiental de Tulum, cargo
  por servicio.

Un CRUD es un formulario, y un formulario necesita saber sus campos. Hoy no sabemos si el
precio es:

```
¿un número por tipo?                          8 campos
¿por tipo × temporada?                        8 × N campos, y no sabemos cuánto vale N
¿con reglas de fin de semana o mínimo de noches?   una dimensión más
¿neto o con impuestos incluidos?              cambia QUÉ se captura y qué se calcula
```

Construir el CRUD ahora significa **inventar ese esquema**, y si C2 revela cuatro temporadas
con reglas de estancia mínima, se rehace entero. Es exactamente el antipatrón de construir sin
requisitos, y ya nos pasó en pequeño con las fotografías (L-071).

**Lo que sí se puede construir sin C2/C3** es el **mecanismo**: el login, el esqueleto del
panel, la escritura de datos y el redespliegue. Eso no depende de la forma del precio. De ahí
el plan por fases del final.

### 🔴 Y el riesgo de negocio, que es mayor que el técnico

La **regla 3** de `CLAUDE.md` dice que el total cotizado **incluye impuestos**, y que ése es el
diferenciador del proyecto frente a las OTAs — la cura de la queja *"me cobraron más de lo
publicado"* que encontró la auditoría.

Un panel que deja capturar un número suelto y publicarlo **reproduce esa queja con nuestra
propia herramienta**, más rápido que antes. El panel no puede ser un campo de texto libre: tiene
que hacer cumplir la regla, no permitir saltársela. Cómo, en la Decisión 4.

---

## Decisión 1 — Los precios se guardan como datos versionados, no en una base de datos

**El panel escribe al repositorio y dispara un redespliegue.** No hay base de datos.

```
Manager edita un precio en /panel/
        ↓
Pages Function valida y hace un commit al JSON de datos (GitHub API)
        ↓
Cloudflare Pages detecta el push y reconstruye
        ↓  (~1-2 minutos)
Precio nuevo en vivo, en las 38 páginas donde aparezca
```

### Opciones evaluadas

| # | Opción | Inmediatez | Base de datos | Historial | Veredicto |
|---|---|---|---|---|---|
| **A** | **Panel → commit a git → rebuild** | ~1-2 min | Ninguna | **Completo y gratis** (`git log`, `git blame`) | ✅ **Elegida** |
| B | Panel → base de datos → el sitio consulta en vivo | Inmediata | D1 o KV | Hay que construirlo | ❌ Descartada — ver abajo |
| C | Panel → base de datos → rebuild programado | Peor de ambas | Sí | Hay que construirlo | ❌ Sin sentido |

### Por qué se descarta B, aunque sea la que "suena mejor"

Abraham ya eligió que un par de minutos está bien, así que la inmediatez —la única ventaja
real de B— no compra nada aquí. Y lo que costaría es considerable:

- **El sitio deja de ser estático.** Cada página con un precio pasa a consultar la base de
  datos en cada visita. Adiós a los Core Web Vitals que hoy son el estado por defecto
  (rendimiento 99, LCP 1.33 s) — pasarían a ser un trabajo de optimización.
- **Los precios dejan de estar versionados.** Hoy cualquier dato del sitio tiene historial:
  quién lo cambió, cuándo y qué decía antes. Una base de datos no da eso gratis; hay que
  construir auditoría a mano.
- **Aparece la primera base de datos del proyecto.** ADR-0006 evitó deliberadamente tener una
  para las solicitudes. Añadirla ahora es una pieza más que respaldar, migrar y mantener.
- **Se pierde la validación del build.** Hoy un dato mal formado **rompe el build** y no llega
  a producción (el esquema de `content.config.ts`). Con una base de datos, un precio corrupto
  llega al huésped.

**La ventaja escondida de A:** `git revert`. Si el manager teclea 2500 donde iba 25000, el
arreglo es un comando y queda registrado. Con una base de datos, hay que recordar cuál era el
valor anterior.

> **Técnica:** *git como base de datos de contenido* — el mismo principio de los CMS basados en
> git (Decap, Tina). No es una ocurrencia: es un patrón establecido, y encaja aquí porque el
> contenido ya estaba modelado como datos desde ADR-0004. **Esa decisión de hace cuatro
> sprints es la que hace barato este cambio hoy.**

### El costo real de A, dicho completo

- **Un token de escritura al repositorio.** Es la credencial más sensible que habrá tenido el
  proyecto: quien la tenga puede escribir en el código. Mitigación en la Decisión 3.
- **Cada cambio consume un build.** El plan gratuito de Cloudflare Pages tiene un límite
  mensual de compilaciones — **verificar la cifra vigente al implementar, no fiarse de la
  memoria** (misma lección que MailChannels en ADR-0006). Para un hotel que ajusta precios por
  temporada, el margen sobra; si alguien decide cambiar precios veinte veces al día, se agota.
- **El panel no puede mostrar "guardado" hasta que el despliegue termine.** Si dice "listo" y el
  precio tarda dos minutos, el manager cree que falló y lo vuelve a guardar. La interfaz tiene
  que mostrar el estado real del despliegue, no el del commit.

---

## Decisión 2 — La autenticación no se construye: se delega a Cloudflare Access

**No escribimos login.** Ni contraseñas, ni hashes, ni sesiones, ni cookies, ni recuperación de
contraseña, ni bloqueo por intentos fallidos.

Cloudflare Access (parte de Cloudflare Zero Trust) protege una ruta **a nivel de red**: la
petición a `/panel/` ni siquiera llega al sitio si quien la hace no está autenticado. El
manager recibe un código de un solo uso en su correo, o entra con Google. Gratuito hasta unas
decenas de usuarios — verificar el límite vigente al configurar.

### Por qué esto no es pereza, es la decisión correcta

| Construir auth propia | Cloudflare Access |
|---|---|
| Almacenar contraseñas (y hacerlo bien: bcrypt/argon2, sal, coste ajustado) | No hay contraseñas que almacenar |
| Sesiones, expiración, rotación, cierre de sesión | Lo gestiona el proveedor |
| Recuperación de contraseña — **el vector de ataque más común de un panel pequeño** | No existe: el acceso es por correo verificado |
| Bloqueo por fuerza bruta, registro de intentos | Incluido |
| Cada línea de esto es superficie de ataque nuestra | Superficie de ataque de Cloudflare, que la mantiene a tiempo completo |

> **Antipatrón evitado, y tiene nombre: *roll your own auth*.** Es el error clásico de los
> paneles internos —"total, son dos usuarios"— y es de los pocos errores de seguridad que se
> pagan enteros la primera vez. Un hotel boutique no necesita un sistema de autenticación
> propio; necesita que sólo entren dos personas.

**Consecuencia operativa:** hace falta una cuenta de Cloudflare Zero Trust (la misma cuenta de
Cloudflare que ya aloja el sitio) y dar de alta los correos autorizados. Es configuración de
panel, no código — mismo patrón que GA4 o Resend en el runbook.

---

## Decisión 3 — El token de escritura: el punto más delicado de todo esto

Para que el panel haga un commit necesita una credencial de GitHub con permiso de escritura.
**Es la pieza que hay que tratar con más cuidado de todo el proyecto**, más que la llave de
Resend: con la de Resend alguien podría mandar correos; con ésta, escribir en el repositorio.

Mitigaciones, todas obligatorias:

1. **Token de alcance fino** (*fine-grained personal access token*), no un token clásico. Con
   permiso **sólo a este repositorio** y **sólo a contenido**. Nada de administración, nada de
   otros repositorios. Alternativa mejor si se quiere invertir más: una GitHub App, que además
   permite revocar sin tocar la cuenta personal.
2. **Vive únicamente como secreto de Cloudflare Pages.** Nunca en el repositorio, nunca en
   `.dev.vars` versionado, nunca en un mensaje de chat — regla 6 de `CLAUDE.md`.
3. **La función sólo puede escribir en las rutas del archivo de precios.** No un `commit`
   genérico: una función que recibe un precio y escribe *ese* archivo, con el nombre de la ruta
   fijado en el código, no venido del cliente. Si alguien manipula la petición, no puede
   apuntarla a otro archivo.
4. **Rotación documentada.** Un token que nadie sabe cuándo se creó es un token que nadie va a
   rotar. Entra en el runbook con fecha.

---

## Decisión 4 — El panel hace cumplir las reglas del proyecto, no las deja al criterio del usuario

Un campo de texto libre donde teclear un número reproduce la queja que este proyecto cura. El
panel tiene que ser opinionado:

- **🔴 El precio se captura de una sola forma y el panel calcula la otra.** En cuanto C3
  responda, se decide si se captura el neto y el panel muestra el total con impuestos, o al
  revés. Pero **el panel siempre muestra las dos cifras antes de guardar**, para que quien
  edita vea exactamente lo que verá el huésped. Sin eso, la regla 3 depende de que alguien se
  acuerde.
- **🔴 Ningún campo de disponibilidad. Nunca.** La regla 2 de `CLAUDE.md` prohíbe mostrar
  disponibilidad que no podamos respaldar, y el esquema de datos no tiene ese campo *a
  propósito* (ADR-0003). Un panel de precios es la puerta de atrás natural para que aparezca un
  "¿disponible? sí/no" — y eso reintroduce el riesgo de sobreventa que todo el ADR-0003 existe
  para evitar. **Queda prohibido por escrito aquí, para que la discusión ya esté tenida.**
- **Validación en servidor, no sólo en el formulario.** Mismo criterio que el endpoint de
  solicitudes: un precio negativo, con letras o absurdamente alto se rechaza en la función, no
  sólo en el navegador.
- **El build sigue siendo la última red.** Si algo se cuela, el esquema de `content.config.ts`
  rompe el build y el dato corrupto no llega a producción. Esa red ya existe y se conserva
  gratis por haber elegido la opción A.

---

## Alcance: qué es y qué no es este panel

| Sí | No |
|---|---|
| Ver los precios actuales de los 8 tipos | Editar textos, fotos o cualquier otro contenido |
| Cambiar un precio y publicarlo | Crear o borrar tipos de alojamiento |
| Ver quién cambió qué y cuándo | Gestionar disponibilidad, reservas o solicitudes |
| Dos o tres usuarios autorizados | Roles, permisos por usuario, flujos de aprobación |

> **Por qué tan estrecho:** «un panel sencillo» es lo que pediste, y es lo correcto. Cada campo
> editable de más es una forma nueva de romper el sitio sin querer, y un CMS completo tiene un
> nombre —WordPress— que ya se evaluó y se descartó con motivos que siguen vigentes. Si el
> alcance crece hasta editar todo el contenido, la decisión correcta deja de ser este panel y
> pasa a ser un CMS headless sobre git (Decap, Tina), que ya está previsto como salida en
> ADR-0004. **Este panel es deliberadamente demasiado pequeño para convertirse en eso por
> acumulación.**

---

## Plan por fases

**Fase 0 — desbloquear.** Conseguir **C2** y **C3**. Sin ellas no se sabe qué campos tiene el
formulario. Ya están en el mensaje al cliente que sigue sin enviarse.

**Fase 1 — el mecanismo, sin depender de C2/C3.** Se puede construir ya:
- Cloudflare Access sobre `/panel/` — configuración, no código.
- La Pages Function que escribe un dato al repositorio y su token, con las cuatro mitigaciones
  de la Decisión 3.
- Una pantalla mínima que lea y escriba **un solo campo de prueba**, para verificar el ciclo
  completo: editar → commit → rebuild → visible. Es la parte con más incógnitas técnicas y la
  que conviene probar antes de construir encima.

**Fase 2 — el CRUD real.** Con C2 y C3 respondidas: el esquema de precios en
`content.config.ts`, el formulario con sus campos reales, el cálculo de impuestos visible antes
de guardar, y la validación en servidor.

**Fase 3 — que el hotel lo use de verdad.** Añadir el panel al guion de capacitación y al
runbook operativo. **Una herramienta que nadie sabe usar no está entregada** — es la misma
lección del traspaso (H5.8).

> **Sobre el orden:** la Fase 1 es construible hoy y no se desperdicia si C2 revela un esquema
> complicado — el mecanismo no cambia. Pero si prefieres no empezar hasta tener las respuestas,
> también es defendible: es lo que evita el riesgo de construir dos veces.

---

## Consecuencias

**Positivas:** el hotel gana control sobre sus precios sin depender de Abraham para cada
cambio · el sitio sigue siendo estático, con sus Core Web Vitals intactos · cero base de datos
nueva · historial de cambios completo y gratis, con reversión de un comando · la validación del
build se conserva como última red · se aprovecha directamente la decisión de modelar el
contenido como datos, tomada cuatro sprints atrás.

**Negativas / costo asumido:** aparece la primera superficie de autenticación del proyecto,
aunque delegada · aparece la credencial más sensible hasta ahora (escritura al repositorio) ·
cada cambio consume un build del plan gratuito · el hotel pasa a ser usuario del sistema, con
la capacitación y el soporte que eso implica · **F4 queda reabierta y hay que reconfirmarla con
el cliente.**

**Riesgo nuevo, y hay que vigilarlo:** que el panel crezca por acumulación hasta ser el CMS que
ADR-0004 descartó — un campo hoy, otro mañana, y en seis meses hay un WordPress artesanal sin
sus ventajas. El alcance de arriba es la defensa; si se rebasa, la decisión correcta es
reabrir ADR-0004, no seguir añadiendo campos.

---

## Preguntas / decisiones que le tocan a Abraham y al cliente

1. **¿Se confirma la reapertura de F4?** El cliente aceptó por escrito que no podría editar el
   sitio. Ahora sí podrá editar precios. Conviene que la nueva frontera —"precios sí, el resto
   no"— quede aceptada explícitamente, igual que se hizo con la original.
2. **¿Empezamos la Fase 1 ya, o esperamos a C2 y C3?** Las dos posturas son defendibles; ver
   la nota del plan por fases.
3. **¿Quiénes son los correos autorizados** para entrar al panel? Nombres concretos, no "el
   hotel".
4. Siguen en pie **C2** y **C3**, que ya estaban en el mensaje al cliente. Este ADR les añade
   una razón más para pedirlas.
