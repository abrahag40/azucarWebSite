# CLAUDE.md — Proyecto Azúcar Hotel Tulum

> **Memoria persistente del proyecto.** Claude lee este archivo al inicio de cada sesión.
> Todo lo que deba sobrevivir al cierre de una sesión vive aquí o en `docs/`.
>
> **Cómo leer este documento:** las secciones 1 a 4 son contexto que no cambia. La 5 son las
> decisiones vigentes y las reglas que no se rompen. La 9 es dónde estamos hoy. Si sólo vas
> a leer dos secciones, lee la **5** y la **9**.

---

## 1. Contexto

| Campo | Valor |
|---|---|
| **Cliente** | Azúcar Hotel Tulum |
| **Ubicación** | Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, MX |
| **Sitio vigente** | https://azucarhotel.com/ (WordPress + Divi) |
| **Naturaleza** | Hotel boutique frente a playa. Abril de 2008. ~21 unidades en 8 tipos |
| **Encargo** | Rediseño y renovación del sitio web |
| **Repositorio** | `abrahag40/azucarWebSite` |
| **Rama de trabajo** | `claude/hotel-tulum-web-audit-0yly29` |
| **Código del sitio** | `site/` (Astro) |

### Hechos confirmados por el cliente

| Hecho | Consecuencia de proyecto |
|---|---|
| **No opera ningún PMS.** Gestión manual | No hay fuente de verdad de disponibilidad |
| **No usa channel manager.** El manager actualiza cada OTA a mano | Confirmación instantánea = sobreventa por diseño |
| **Quiere que el huésped reserve desde el sitio** | Se resuelve como **solicitud sujeta a confirmación** → ADR-0003 |
| **No tiene datos comparativos** de OTA vs. directo ni de comisiones | No hay línea base → instrumentar analítica es entregable del sprint 1 |
| **El contenido lo gestiona Abraham**, no el hotel | No se requiere CMS → habilita stack estático → ADR-0004 |
| Puede responder el desglose de impuestos (C3) | Cotización con total real: cura la queja de "me cobraron más" |
| **Precio y modelo contractual: cerrados fuera de este repo** | No se discuten aquí |

### Alcance de Claude

**Sólo software.** Fotografía, redacción, licencias, contratos y trato con el cliente los
gestiona Abraham por fuera. Aparecen en la documentación únicamente como **dependencias que
bloquean historias**, nunca como tareas nuestras.

---

## 2. Roles y contrato de aprendizaje

- **Claude**: líder de proyecto y arquitecto. Propone el orden correcto, justifica con
  fundamento de industria y ejecuta.
- **Abraham**: responsable del proyecto, interlocutor con el cliente, y quien ejecuta lo que
  requiere su máquina o cuentas externas.

### Contrato de aprendizaje — obligatorio, no negociable

Este proyecto es también un vehículo de formación profesional para Abraham:

1. **Nunca entregar una decisión sin su porqué**, con la fuente o el estándar que la
   respalda (BABOK, Nielsen Norman, WCAG, Core Web Vitals, PCI-DSS, DDD, ADR…).
2. **Nombrar la técnica** cuando tenga nombre propio (*document analysis*, *straw-man*,
   *anti-corruption layer*, *Sprint Goal*), para que sea buscable y repetible.
3. **Señalar el antipatrón evitado.** El contraste es lo que fija el aprendizaje.
4. **Registrar en `docs/decisiones/bitacora-aprendizaje.md`.** No se pierde al cerrar sesión.
5. **Ajustar el nivel de ceremonia.** Es un hotel boutique, no un ERP. Cuando un estándar
   sea desproporcionado, se dice qué se omite y por qué omitirlo es lo correcto aquí.
   *Rigor sí, burocracia no.*
6. **Corregirse en voz alta.** Si un dato desmiente una afirmación previa, se retira por
   escrito. Esta bitácora tiene ya varias correcciones y son parte del valor.

---

## 3. Metodología

| # | Fase | Estado |
|---|---|---|
| 0 | Fundación del proyecto | ✅ |
| 1 | Descubrimiento y auditoría | ✅ |
| 2 | Levantamiento de requerimientos | 🔄 brief entregado, entrevista pendiente |
| 3 | Arquitectura de información | ✅ resuelta dentro del backlog |
| 4 | Diseño / adaptación de plantilla | ✅ tokens extraídos |
| 5 | Implementación | 🔄 **sprint 1** |
| 6 | QA, performance, SEO, accesibilidad | ⬜ sprint 5 |
| 7 | Despliegue y traspaso | ⬜ sprint 5 |

---

## 4. Entorno de trabajo

**Este proyecto se trabaja desde una sesión local** (`claude` en la terminal, dentro del
repositorio). La sesión remota en la nube **no tiene acceso al sistema de archivos de la
Mac, ni al navegador, ni salida a internet** hacia dominios externos. Consecuencias:

- Las capturas HTTrack ya están **ingeridas y versionadas** en `investigacion/mirrors/`.
  Ese trabajo está hecho y no se repite.
- Configurar Cloudflare, Analytics o cualquier consola web lo hace Abraham, con el
  paso a paso de `docs/05-despliegue/runbook-accesos-y-despliegue.md`.

---

## 5. Decisiones vigentes y reglas que no se rompen

| Tema | Decisión | ADR |
|---|---|---|
| **Orden de trabajo** | Descubrimiento antes que requerimientos | [0001](docs/decisiones/ADR-0001-descubrimiento-antes-de-requerimientos.md) |
| **Marco** | Iterativo quincenal. **Scrum adaptado, no puro** | [0002](docs/decisiones/ADR-0002-marco-de-trabajo-iterativo.md) |
| **Reservas** | Solicitud sujeta a confirmación. Sin calendario de disponibilidad. Cotización con impuestos. Aviso al manager por correo + WhatsApp. Aislado en `booking/` | [0003](docs/decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) |
| **Entrega de la solicitud** | Endpoint en Cloudflare Pages Functions, sin base de datos. Correo con Resend. WhatsApp con la Cloud API de Meta (recomendado) o alternativa a decidir. Bloqueado por E-PRIV y B4 | [0006](docs/decisiones/ADR-0006-endpoint-de-solicitud-correo-y-whatsapp.md) |
| **Stack** | **Astro** estático, i18n ES/EN nativo, *content collections*, Cloudflare Pages, formulario contra función serverless | [0004](docs/decisiones/ADR-0004-stack-tecnico.md) |
| **Plantilla Cappa** | Fuente de **diseño**, no de código. Se extraen tokens y se reconstruyen componentes | [0004](docs/decisiones/ADR-0004-stack-tecnico.md) |
| **Pagos** | Enlace de pago del hotel. **No tocamos datos de tarjeta → fuera de alcance PCI-DSS** | [0003](docs/decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) |
| **Panel de precios** | El hotel edita **sólo precios**. Escribe a git y dispara rebuild — sin base de datos. Login delegado a Cloudflare Access. **Reabre F4.** Bloqueado por C2 y C3 | [0007](docs/decisiones/ADR-0007-panel-de-precios.md) |

### 🔴 Reglas que no se rompen

1. **Nunca decir "reserva confirmada"** en la interfaz. Siempre *"solicitud sujeta a
   confirmación"*. **El CI lo verifica y falla el build.**
2. **Nunca mostrar disponibilidad** que no podamos respaldar. El esquema de datos no tiene
   ese campo, a propósito. **Tampoco el panel de precios** (ADR-0007): es la puerta de atrás
   natural para que reaparezca, y con ella el riesgo de sobreventa.
3. **El total cotizado incluye impuestos.** Es el diferenciador frente a las OTAs.
4. **Nunca capturar datos de tarjeta.** Es el hallazgo crítico del sitio vigente; el sitio
   nuevo no lo reproduce.
5. **Accesibilidad y Core Web Vitals van en la DoD de cada historia**, jamás en una fase final.
6. **El contenido se modela como datos**, nunca incrustado en el marcado.
7. **Datos sin confirmar por el cliente no se publican.** `build:prod` falla.

---

## 6. Convenciones

- **Idioma:** documentación y commits en español. Código, archivos y ramas en inglés.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/).
- **Decisiones:** toda decisión con consecuencias es un ADR en `docs/decisiones/`
  (formato Michael Nygard).
- **Nunca** hacer push a una rama distinta de la designada sin autorización explícita.
- **Nada de credenciales del cliente en el repositorio.** Los identificadores públicos
  (como `G-…` de GA4) sí pueden versionarse; las llaves no.
- Toda captura de terceros pasa por la redacción de credenciales de `ingest-mirror.sh`.

---

## 7. Marco de trabajo — resumen operativo

**Entrega iterativa con revisión quincenal.** Detalle en ADR-0002 y en
[`plan-de-desarrollo.md`](docs/02-requerimientos/plan-de-desarrollo.md).

- Sprints de **2 semanas**, cada uno con **Sprint Goal escrito** y demo sobre URL real.
- **Se conservan:** Product Backlog, Sprint Backlog congelado, Sprint Review, Definition of
  Ready, Definition of Done, Planning y retro ligeras.
- **Se omiten con justificación:** daily standup, story points y velocity, Scrum Master
  dedicado, refinamiento como ceremonia formal.
- El cliente **no es Product Owner**: es **Cliente-Decisor con SLA de 48 h hábiles**.
  Abraham es **Proxy PO**.
- Tablero: `Backlog → Ready → En curso (WIP 2) → En revisión → Bloqueado → Hecho`.

> **Prueba ácida contra Water-Scrum-Fall:** si el entregable de una iteración es un
> documento y no algo que el cliente pueda abrir en el navegador, no era un sprint.

---

## 8. Plan de sprints

**6 sprints × 2 semanas ≈ 12 semanas.** Guion de demo, criterios de entrada y salida e
historias con criterios de aceptación en
[`plan-de-desarrollo.md`](docs/02-requerimientos/plan-de-desarrollo.md) y
[`backlog-producto.md`](docs/02-requerimientos/backlog-producto.md).

| Sprint | Sprint Goal | Demo |
|---|---|---|
| **0** ✅ | Entender el terreno con evidencia reproducible | Auditoría + backlog aprobado |
| **1** ✅ | Home bilingüe en URL real, rápida y accesible | Falta el `G-…` de GA4 y medir los CWV |
| **2** ✅ | Que el huésped recorra los 8 tipos y elija uno | Hecho salvo H2.6 (decisión del cliente) |
| **3** 🔄 | Que el manager reciba una solicitud real en su teléfono | H3.1 y H3.2 hechas. **El envío sigue bloqueado por C3, B1–B4 y E-PRIV** |
| **4** ✅ | Que el sitio responda todo lo que el huésped pregunta | Hecho salvo H4.4 y el aviso legal conforme |
| **5** 🔄 | Producción sin perder posicionamiento y con reversión probada | H5.3 adelantado: 301 construidas y verificadas |

---

## 9. Estado actual

### 🚨 Urgente, fuera del plan de sprints

El sitio vigente **captura número de tarjeta y CVV** en `/autorizacion-de-pago-con-tdc/` y
`/en/cc-payment-authorization/` mediante Contact Form 7, que lo envía por correo. Incumple
**PCI-DSS 3.3.1 y 4.2.1** y la **LFPDPPP**.
Aviso al cliente redactado con acuse de decisión:
[`aviso-cliente-datos-de-tarjeta.md`](docs/01-descubrimiento/aviso-cliente-datos-de-tarjeta.md).
**Pendiente: enviarlo.**

### Sprint 0 — cerrado

Auditoría del sitio vigente (26 páginas reales, paridad ES/EN, 244 imágenes WebP de 2025
bien dimensionadas, sin analítica, schema.org genérico sin tipos hoteleros, 468 `<img>` sin
`alt`, **8 tipos de alojamiento confirmados con sus nombres**). Análisis competitivo de
ResNexus —construido sobre Duda; la agencia **provisionó una propiedad real en el motor**,
R-16— y análisis de Cappa: 19 archivos JS y 8.2 MB de tipografías que se descartan.

### Sprint 1 — cerrado salvo dos accesos

**🌐 Staging en vivo: https://azucar-hotel-tulum.pages.dev**

Cloudflare Pages conectado al repositorio, rama de producción
`claude/hotel-tulum-web-audit-0yly29`, raíz `site`, comando `npm run build`, salida `dist`.
Node fijado en `site/.nvmrc`. Despliegue automático en cada push. Configuración y las
**tres correcciones** que el runbook necesitaba —rama inexistente, comando que falla a
propósito, versión de Node— en `docs/05-despliegue/runbook-accesos-y-despliegue.md`.

H1.1 a H1.6 hechas. H1.2 verde: el CI fallaba porque `@astrojs/check` y `typescript` no
estaban declarados y no existía `tsconfig.json`. **Falta sólo el `G-…` de GA4 (H1.7) y medir
los Core Web Vitals.**

### Sprint 2 — catálogo, hecho salvo decisión del cliente

Los **8 tipos** con listado y ficha en ES y EN, rutas generadas desde los datos (H2.1, H2.2),
galería con visor accesible sobre `<dialog>` (H2.3) y `schema.org/HotelRoom` (H2.4).

**H2.5 — AVIF evaluado y DESCARTADO con medición**: gana en 22 de 44 imágenes y pierde en las
otras 22. Lo que sí ganó fue bajar la calidad de 72 a 50: **−20 % de peso**. Ver ADR-0005 y
L-026/L-027. **H2.6** requiere decisión del cliente.

Las 24 cadenas de las fichas se **reescribieron** aplicando una norma editorial medida:
longitudes en dos bandas por categoría, apertura paralela y `diferenciador` en las ocho. Por
eso `descripcion` **salió de `verificado`**: ya no es texto del cliente.

### Sprint 3 — la mitad que no dependía del cliente

`/reservar/` y `/en/booking/` existen (H3.1, H3.2). Eran **90 enlaces rotos**: cada botón
«Solicitar reserva» del sitio llevaba a un 404. El auditor baja a **cero hallazgos rojos por
primera vez en el proyecto**.

El módulo `src/booking/` tiene frontera documentada y su lógica de composición es una función
pura con **9 pruebas unitarias** —las primeras del proyecto—, porque el cálculo de noches es la
única aritmética que puede equivocarse en silencio.

> 🔴 **El formulario NO envía nada a ningún servidor nuestro.** Compone el mensaje en el
> navegador del huésped y se lo entrega para que lo mande por correo. No es una limitación
> técnica: montar hoy un endpoint que reciba nombre, correo y teléfono iniciaría un tratamiento
> de datos personales **sin aviso conforme a la LFPDPPP** (E-PRIV abierto) — el mismo
> incumplimiento que le señalamos al cliente. Y no aparece **ninguna cifra**, porque C3 sigue
> sin respuesta y un «desde $X» sin impuestos reproduciría la queja que este proyecto cura.

Siguen bloqueadas H3.3 (C3), H3.4 a H3.6 (B1–B4) y el consentimiento de H3.8 (E-PRIV).
**H3.7 se descubre bloqueada por un dato nuevo: el sitio vigente no publica ningún WhatsApp.**

**El endpoint de H3.4 ya está construido y probado en local**
([ADR-0006](docs/decisiones/ADR-0006-endpoint-de-solicitud-correo-y-whatsapp.md)): Cloudflare
Pages Function sin base de datos, antispam sin CAPTCHA visible (Turnstile + honeypot), límite de
tasa, y entrega por correo (Resend) al manager y de acuse al huésped — verificado de punta a
punta con `wrangler pages dev` contra la API real de Resend (falla con 401 por la llave de
prueba, que es justamente la prueba de que el cableado funciona). **No cambia nada para un
huésped real todavía:** `FormularioSolicitud.astro` sigue usando el `mailto:` de siempre — el
`fetch()` que conecta uno con otro es un cambio aparte, a propósito pequeño, que espera **B4** y
**E-PRIV**. El canal de WhatsApp automatizado (H3.6) se pospuso: exige que el cliente elija entre
la API oficial de Meta, un intermediario de pago o un servicio no oficial con riesgo real —
decisión de costo, no de código.

### Traspaso — H5.8, escrito salvo la sesión

Tres documentos para tres lectores distintos, en `docs/06-traspaso/`: el **runbook operativo
del hotel** —cómo atender una solicitud, con la prohibición de pedir datos de tarjeta arriba
del todo—, el **traspaso técnico** y el **guion de la capacitación**.

Lo que el traspaso técnico aporta y no estaba en ningún sitio es la tabla de **lo que sólo
vive en la cabeza de Abraham**: cuenta de Cloudflare, titularidad del dominio —desconocida,
R-06—, accesos al hosting actual, licencia de Cappa, derechos de las fotografías y la
propiedad viva en ResNexus. Un traspaso sin credenciales transferidas no es un traspaso.

El runbook lleva **huecos visibles** —tiempo de respuesta (B2), impuestos (C3), responsable
(B1)— que se rellenan en la propia sesión con el hotel delante. **La sesión y su grabación
no son software**: el guion está listo, la da Abraham.

### Sprint 4 — contenido institucional, hecho salvo legal

Servicios, ubicación, contacto, preguntas frecuentes y políticas en los dos idiomas, más
`sitemap.xml` y `robots.txt` (H4.1, H4.5, H4.6, H4.7, H4.9). Contenido **literal del sitio
vigente, traducciones incluidas**. Aviso de privacidad publicado con sus carencias declaradas
(H4.8 parcial). Queda **H4.4**, la galería general.

**H4.4 — galería general** en `/galeria/` y `/en/gallery/`: ocho fotografías de la propiedad
con texto alternativo descriptivo propio en los dos idiomas. Reutiliza el visor de H2.3 en vez
de duplicarlo. La curaduría dejó un dato para Abraham: de las diez fotos de propiedad
revisadas una a una, **ocho entraron**; el archivo de 244 imágenes es desigual y no admite
atajos —ordenar por tamaño de archivo no predice si una foto sirve—.

Construirla destapó **tres defectos, dos anteriores a la historia**: un `href` que producía un
404 en producción (L-043), el CI en rojo desde hacía trece commits (L-040) y dos informes que
truncaban su salida justo donde estaba el hallazgo nuevo (L-041).

### Sprint 5 — adelantado lo que caducaba

**Mapa de 301 construido y verificado** (H5.3), porque el inventario de URLs sólo existe
mientras exista la captura del sitio viejo. 25 URLs cubiertas, 0 fallos, y **11 conservan su
dirección exacta**. Las dos páginas de datos de tarjeta se dejan morir en 404 a propósito.
Ver `docs/05-despliegue/mapa-301.md` y L-032.

### Estado medido del sitio

| | |
|---|---|
| Páginas | **38** (19 rutas × 2 idiomas) · plantilla **sin duplicar**: `src/views/` |
| Archivos JavaScript externos | **0** · en línea: 897 B en las 17 páginas con galería, 3.3 KB en las 2 de solicitud |
| Portada | 22 KB de HTML + 21 KB de CSS compartido |
| Imágenes | 190 WebP · **1 MB menos**: el visor servía originales intactos y ahora sirve derivadas |
| Auditor propio | **2 hallazgos, ninguno rojo.** Los 90 enlaces a `/reservar/` ya resuelven |
| Redirecciones | 12 reglas · 25 URLs · 0 fallos |
| CI | ✅ **verde**, tras trece commits en rojo que nadie vio (L-040). Ahora también corre `npm test` |
| **Lighthouse** (móvil, 4G) | **rendimiento 99 · accesibilidad 100 · buenas prácticas 100 · SEO 92** ⚠️ |
| **Core Web Vitals** | **LCP 1.33–1.86 s · CLS 0.003 · TBT 0–26 ms** — los tres dentro de umbral |
| **axe-core 4.13** | **0 violaciones** en 22 páginas · 33-44 comprobaciones por página |
| **html-validate** | **0 incidencias** en 38 páginas (se partió de 202) |
| Pruebas unitarias | 9 casos sobre `componerSolicitud` · 0 dependencias nuevas |

### 🔴 Contradicción en el contenido del cliente — pregunta C0

`/servicios/` y `/amenidades/` del sitio vigente anuncian **restaurante y spa**; su propio
`/preguntas-frecuentes/` dice *«Por ahora no tenemos servicio de restaurante o bar»*. Ninguna
de las dos páginas existe. **Lo habíamos publicado**: una tarjeta en la portada y
`amenityFeature: Restaurant = true` en el `schema.org` de 20 páginas. Retirado. Ver L-031.

### ⚠️ Datos sin verificar

De cada tipo, sólo **nombre y vista** provienen del sitio real. **Unidades, capacidad y camas
son estimaciones nuestras** y suman 22 contra las 21 reportadas. `npm run build:prod` **falla**
hasta que el cliente responda **C1**. En las fichas se marcan con asterisco visible, para que
el cliente vea en la demo exactamente qué debe confirmar.

### Bloqueantes vigentes — todos del cliente

| # | Qué | Bloquea |
|---|---|---|
| **C0** | ¿Hay restaurante, bar y spa? | Contenido publicado hoy en SU sitio |
| **C1** | Tabla de los 8 tipos | `build:prod` |
| **C3** | Desglose fiscal | **Sprint 3 completo** |
| **B1–B4** | Responsable, SLA, correo y WhatsApp, pasarela | **Sprint 3 completo** |
| **E-PRIV** | Aviso de privacidad conforme a LFPDPPP | Requisito de **entrada** del sprint 3 |
| **R-01** | Licencia de iconos de Cappa | Sustituibles por un set libre |
| — | ID de GA4 (`G-…`) | H1.7 |


### Pendientes de Abraham, fuera del carril de software

1. **Enviar el mensaje consolidado.** Está escrito y listo:
   [`mensaje-cliente-desbloqueo.md`](docs/02-requerimientos/mensaje-cliente-desbloqueo.md).
   Incluye el aviso de datos de tarjeta —que **sigue publicado y sin enviar desde el sprint
   0**— y las cuatro decisiones que desbloquean el sprint 3. **Es lo primero.**
2. Visto bueno a ADR-0003. *(ADR-0004 y ADR-0005 vigentes.)*
3. Licencia de Cappa (R-01), reducida a iconos e imágenes del demo.
4. ~~Pasar la URL por PageSpeed~~ **HECHO por Claude.** Ver
   [`medicion-calidad.md`](docs/05-despliegue/medicion-calidad.md). Estaba mal marcado como
   tarea de Abraham: Chrome está instalado aquí y Lighthouse es el mismo motor.
5. **Cuenta de Resend + dominio verificado + variables en Cloudflare Pages.** Decidido Resend
   como proveedor de correo (ADR-0006). Pasos exactos en
   [`runbook-accesos-y-despliegue.md`, Parte 5](docs/05-despliegue/runbook-accesos-y-despliegue.md#parte-5--resend--el-correo-de-solicitudes).
   No activa nada visible por sí solo — sigue esperando B4 y E-PRIV para cablearse.

> ⚠️ **Riesgo de método, dicho en voz alta.** Hay 38 páginas construidas. El sprint 3 ya no
> está en cero —el formulario existe y los 90 enlaces rotos se cerraron—, pero **no puede
> recibir una sola solicitud en el teléfono del manager** hasta que lleguen C3, B1–B4 y E-PRIV.
> Lo construido llega exactamente hasta donde termina lo que sabemos.
>
> **La siguiente acción de valor sigue sin ser código: es el correo.** Y ahora es más barata de
> justificar, porque hay una demo que enseñar mientras se piden las respuestas.

---

## 10. Índice de documentación

| Documento | Contenido |
|---|---|
| `docs/README.md` | Mapa de la documentación |
| **`docs/02-requerimientos/backlog-producto.md`** | **Product Backlog: épicas, historias, criterios de aceptación** |
| **`docs/02-requerimientos/plan-de-desarrollo.md`** | **Plan de sprints con guion de demo y criterios de entrada/salida** |
| `docs/02-requerimientos/marco-de-trabajo.md` | Roles, cadencia, DoR, DoD |
| `docs/02-requerimientos/preguntas-cliente.md` | Banco de preguntas (6 bloques) |
| `docs/02-requerimientos/preguntas-internas.md` | 20 preguntas de preparación interna |
| `docs/02-requerimientos/brief-azucar-hotel-tulum.docx` | Brief pre-llenado para el cliente |
| `docs/01-descubrimiento/auditoria-sitio-actual.md` | Auditoría técnica del sitio vigente |
| `docs/01-descubrimiento/aviso-cliente-datos-de-tarjeta.md` | Aviso PCI-DSS + acuse de decisión |
| `docs/01-descubrimiento/analisis-propuesta-resnexus.md` | Inteligencia competitiva |
| `docs/01-descubrimiento/runbook-captura-httrack.md` | Comandos de captura |
| `docs/04-diseno/analisis-plantilla-cappa.md` | Qué se extrae y qué se descarta de Cappa |
| `docs/05-despliegue/runbook-accesos-y-despliegue.md` | Cloudflare, GA4, Search Console, Business Profile |
| `docs/decisiones/ADR-0001..0007` | Decisiones con consecuencias |
| **`docs/02-requerimientos/mensaje-cliente-desbloqueo.md`** | **Mensaje al cliente, listo para enviar** |
| `docs/04-diseno/mapeo-cappa-a-sitio.md` | Qué sección de Cappa alimenta cada página |
| **`docs/04-diseno/fidelidad-a-cappa.md`** | **Cuánto se parece el sitio a la plantilla, medido elemento por elemento** |
| `docs/05-despliegue/mapa-301.md` | Redirecciones del relanzamiento y su prueba |
| **`docs/05-despliegue/medicion-calidad.md`** | **Lighthouse, axe-core y html-validate: evidencia con fecha (H5.1, H5.2)** |
| `docs/05-despliegue/validacion-html.md` | Validación de HTML y las dos reglas desactivadas |
| **`docs/05-despliegue/plan-de-reversion.md`** | **Criterio de reversión, tres capas y preparativos de DNS** |
| **`docs/06-traspaso/runbook-operativo-solicitudes.md`** | **Para el hotel: cómo atender una solicitud** |
| `docs/06-traspaso/traspaso-tecnico.md` | Traspaso a quien mantenga el sitio + lo que sólo sabe Abraham |
| `docs/06-traspaso/guion-capacitacion.md` | Guion de la sesión de 45 min, para grabar |
| **`docs/decisiones/bitacora-aprendizaje.md`** | **76 lecciones acumuladas + riesgos abiertos** |
| `site/README.md` | Cómo correr el sitio y qué reglas hace cumplir el código |
| **`site/src/booking/README.md`** | **Frontera del módulo de reserva: interfaz, y qué NO hace hoy y por qué** |
| `scripts/README.md` | Ingesta de capturas y auditor automatizado |

---

## 11. Comandos frecuentes

```bash
# TODO de una vez — falla a gritos si algo se cae
./scripts/verificar-todo.sh

# Sitio
cd site && npm ci
npm run dev          # desarrollo
npm run datos        # ¿qué datos de alojamiento siguen sin verificar?
npm run build        # build (avisa)
npm run build:prod   # build de producción (FALLA si hay datos sin verificar)
npm test             # pruebas de la lógica de solicitud (9 casos)

# Auditoría — misma vara para el sitio viejo y para el nuevo
node scripts/audit-mirror.mjs investigacion/mirrors/azucarhotel
node scripts/audit-mirror.mjs site/dist

# Accesibilidad sobre el marcado — las 34 páginas
node scripts/auditar-accesibilidad.mjs site/dist

# ¿Está sano un despliegue? Criterio de reversión (H5.6)
node scripts/verificar-despliegue.mjs https://azucar-hotel-tulum.pages.dev

# Redirecciones del relanzamiento — contra el build o contra una URL real
node scripts/verificar-301.mjs site/dist

# ¿alguna clase CSS usada en un componente y definida en el ámbito de otro?
node scripts/verificar-estilos.mjs
node scripts/verificar-301.mjs https://azucar-hotel-tulum.pages.dev
```
