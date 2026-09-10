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
| **Naturaleza** | Hotel boutique frente a playa. Abril de 2008. **24 unidades en 10 tipos**, confirmadas por la gerencia el 2026-09-02 (su propio sitio decía 21) |
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
8. **La marca se escribe «Azucar», SIN ACENTO, en todo lo que se publica.**
   Requisito del cliente del 2026-09-07, literal: *«es requerimiento que en
   ningún lado que diga Azucar lleve acento»*. **`verificar-todo.sh` lo
   verifica y falla** sobre `site/` entero, build incluido. Se permite escribir
   la forma acentuada en `docs/`, que es donde se explica la decisión.

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
| **2** ✅ | Que el huésped recorra el catálogo y elija uno | Hecho salvo H2.6 (decisión del cliente). Eran 8 tipos; son **10** desde el 2026-09-03 |
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

### Panel de precios — Fase 1 construida, sin configurar

**Fuera del plan de sprints**, a petición de Abraham ([ADR-0007](docs/decisiones/ADR-0007-panel-de-precios.md)).
`/panel/` existe: lee y escribe los precios de los tipos publicados, valida en servidor, y cada cambio
hace un commit al repositorio que dispara el redespliegue — **sin base de datos**, con historial
en `git log` y reversión de un comando. El login se delega a **Cloudflare Access**; no se
escribió una línea de autenticación.

**Todavía no funciona para nadie**, y falla cerrado hasta que se configure (Parte 6 del
runbook): Access sobre `/panel/` **y** sobre `/api/precios`, más el token de GitHub. Verificado
en local que rechaza sin sesión (403), sin configuración (503), y que ignora tipos inventados,
precios con decimales, precios absurdos y los intentos de tocar `publicable`.

**Los precios NO se publican en el sitio.** `publicable` está en `false` hasta que responda
**C3**: un precio sin impuestos reproduciría la queja que este proyecto cura. Y **F4 queda
reabierta** — el cliente aceptó por escrito que no podría editar el sitio; hay que
reconfirmar la frontera nueva.

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

**H4.4 — galería general** en `/galeria/` y `/en/gallery/`, con texto alternativo descriptivo
propio en los dos idiomas. Reutiliza el visor de H2.3 en vez de duplicarlo. La curaduría dejó un
dato para Abraham: el archivo de 244 imágenes es desigual y no admite atajos —ordenar por tamaño
de archivo no predice si una foto sirve—.

**La galería cambió DOS veces el 2026-09-10, y en sentidos opuestos.** Por la mañana el cliente
tachó cinco de las nueve sobre la propia rejilla —no dio motivos y no se inventan— y quedó en
cuatro. Por la tarde entraron **41 de la sesión con fotógrafo** y quedó en **45**: las cuatro de
2025 conservan su orden al final. Las cinco tachadas siguen fuera, y eso **no lo deshace el lote
nuevo**: lo que el cliente quitó fueron esas cinco fotografías concretas, no esos motivos.

🔴 **Pero tres de las cinco tachadas siguen siendo la portada de otras páginas** —`/restaurante/`
y `/eventos/`—, y eso el código no lo resuelve solo. Ver R-41.

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
| Páginas | **50** públicas (25 rutas × 2 idiomas) + `/panel/`, interna · plantilla **sin duplicar**: `src/views/`. Las cuatro nuevas son Arrecife y Luna en los dos idiomas |
| Archivos JavaScript externos | **0** · en línea: 897 B en las 17 páginas con galería, 3.3 KB en las 2 de solicitud, 1.4 KB del vídeo en las 2 portadas |
| Portada | 22 KB de HTML + 21 KB de CSS compartido |
| Imágenes | 190 WebP · **1 MB menos**: el visor servía originales intactos y ahora sirve derivadas |
| Auditor propio | **2 hallazgos, ninguno rojo.** Los 90 enlaces a `/reservar/` ya resuelven |
| Redirecciones | 12 reglas · 25 URLs · 0 fallos |
| CI | ✅ **verde**, y desde el 2026-09-01 **corre exactamente `verificar-todo.sh`** — R-27 cerrada (L-088). Ha estado roto dos veces sin que nadie lo viera: trece commits (L-040) y seis (L-087) |
| 🔴 Lockfile | **Se genera en Docker/Linux, no en macOS.** `npm ci` rechaza un lockfile de macOS y con él caen CI y Cloudflare. Procedimiento en `site/README.md` |
| **Lighthouse** (móvil, 4G) | **rendimiento 99 · accesibilidad 100 · buenas prácticas 100 · SEO 92** ⚠️ · **escritorio: 100** |
| **Core Web Vitals** | **Re-medidos CON el vídeo el 2026-09-10** —nunca se habían medido con vídeo—. Re-medidos tras el cambio de toma. Móvil, mediana de **7 pasadas** (más una de calentamiento que se descarta): **LCP 1.86 s · CLS 0.000 · TBT 0 ms en las 14**. Escritorio: **100** y LCP 0.55 s. Los tres dentro de umbral |
| **¿Cuánto cuesta el vídeo?** | **Medido con A/B sobre la misma URL** (`prefers-reduced-motion` no descarga nada): **LCP +10 ms — ruido**, CLS 0, TBT 0. Lo único real es **Speed Index +410 ms**, que no es un CWV. El elemento LCP es la fotografía en **33 de 34 informes** —la excepción es la pasada de arranque en frío, ver `medicion-calidad.md`— y el vídeo se pide **73 ms después** de que la foto termine |
| **axe-core 4.13** | **0 violaciones**, re-medido el 2026-09-01 sobre 10 páginas tras el cambio de paleta a pistacho |
| **html-validate** | **0 incidencias** en 45 páginas · **ya no es periódico: es un guardián de `verificar-todo.sh`**, y al entrar encontró un `<form>` sin botón de envío en el panel |
| Pruebas unitarias | **35 casos** sobre `componerSolicitud`, los dos correos HTML y la concordancia de número · 0 dependencias nuevas |

### ✅ Contradicción del restaurante — resuelta, con un matiz

El sitio vigente se contradecía: `/servicios/` y `/amenidades/` anunciaban restaurante y spa,
y su `/preguntas-frecuentes/` decía *«Por ahora no tenemos servicio de restaurante o bar»*.
Estuvo retirado del sitio nuevo mientras duró la duda.

**Abraham lo resolvió como Proxy PO el 2026-08-25: el restaurante existe** y la respuesta del
FAQ viejo está desactualizada. En consecuencia se retiró esa pregunta del FAQ nuevo, volvió la
amenidad a la portada, volvió `Restaurant` al `schema.org` de las 38 páginas, y `/restaurante/`
está publicada y en el menú (H4.11).

🔴 **Dos cosas que esa decisión NO resuelve:**
- **La carta es CONTENIDO DE EJEMPLO.** A petición de Abraham (2026-08-25) se rellenó con
  platos y precios plausibles de un hotel de playa en Tulum, para que la página se vea completa
  y editarla sea sólo cambiar textos. **No son del hotel y hay que sustituirlos antes de
  producción.** El aviso está en la cabecera de `src/data/restaurante.ts` y en la
  [guía de textos](docs/06-traspaso/guia-de-textos.md). Falta también **el nombre real**: su
  sitio lo llamaba «Blanc» en un sitio y «Selvamar» en otro; **ninguno era el nombre.**
  ✅ **RESUELTO 2026-09-01: se llama «Tenedor»**, confirmado por el cliente (cierra R-17).
  «Selvamar» resultó ser el nombre del roof top, no del restaurante.
- **El spa.** ✅ Resuelto a medias el 2026-09-01: el cliente lo quiere en el menú **como
  «próximamente»**. Aparece anunciado y **sin enlace** —no hay una sola línea que diga qué es—,
  que es exactamente lo que la regla 7 permite: anunciar sin prometer.

### Cambios del cliente — 2026-09-01

Una tanda grande de peticiones, todas aplicadas. Lo que hay que saber de ellas:

**Menú reestructurado a la jerarquía que pidió el cliente.** Siete apartados: Nosotros,
Alojamiento, Amenidades, Galería, Eventos, FAQ y Políticas, con submenú en tres de ellos. El
mecanismo dejó de estar cableado a los ocho tipos de alojamiento y ahora pinta cualquier
submenú con el mismo marcado. **Cómo llegar y Contacto salen de la barra y siguen en el pie**:
siete entradas ya no dejan sitio para nueve, y son las dos páginas que busca quien ya decidió
venir. Medido a 1090 px —el umbral de escritorio— caben con 88 px de sobra.

**Dos etiquetas del menú son más cortas que su página**, y es deliberado: «FAQ» y «Políticas»
en la barra, «Preguntas frecuentes» y «Políticas y privacidad» en el encabezado. Es el mismo
criterio que ya se documentó cuando «Preguntas frecuentes» medía 164 px y sacaba el menú de la
pantalla.

**Páginas nuevas:** `/nosotros/` (contenido literal del sitio vigente; la regla 301 que la
mandaba a la portada se retira) y `/eventos/`. Las cinco amenidades con nombre propio son
**secciones ancladas** dentro de `/servicios/`, no páginas: cuatro páginas de dos párrafos sin
confirmar son *thin content*, y el día que una tenga contenido de verdad se promueve sin romper
nada.

**Las suites pasan a llamarse Bungalows**, en el nombre y en la URL — `/alojamiento/bungalow-mar/`.

**`/actividades/` — «Qué hacer en Tulum»**, apartado suelto del menú y no colgado de
Amenidades: lo de esa página no es del hotel. Ocho lugares en rejilla de cuatro, **sólo sitios
públicos y ningún negocio** —recomendar un negocio es responder por él— y **ninguna distancia
ni tiempo**, porque C-LLEG sigue sin responder. Van ilustradas con glifos dibujados: de esos
ocho lugares no hay una sola fotografía en el archivo del hotel (R-31).

**El menú tocó techo.** Ocho apartados es el máximo: el umbral de escritorio subió de 68rem a
**72rem**, con la aritmética escrita en `Header.astro`, porque el logotipo creció 32 px y entró
un apartado nuevo. El noveno no cabe ni bajando el tracking (R-32).

**La paleta pasa de oro a pistacho** conservando entera la disciplina de contraste que la
sostenía: tres tokens medidos contra los tres fondos del sitio. Revertir son tres líneas.
Ver L-090.

🔴 **Lo que estos cambios AÑADEN a la deuda de contenido sin confirmar:**

| Qué | Estado |
|---|---|
| Day Pass / Beach Club · Rooftop «White Pearl» | **Inventados.** No existen en las 26 páginas capturadas (R-29) |
| La página de Eventos entera | **Inventada.** Sin cifras, a propósito (R-30) |
| Código postal | 🔴 **REABIERTO 2026-09-03. Hoy dice 77760**, porque el cliente lo pidió por escrito. Pero el 2026-09-01 él mismo había confirmado 77780, que es el que publica su sitio: se ha pronunciado en los dos sentidos, así que **hace falta una tercera fuente** —Servicio Postal Mexicano o comprobante de domicilio— (R-28, L-117) |
| La carta del restaurante | Sigue siendo de ejemplo. Lo que sí se resolvió es el **nombre** |
| Las ocho fotos de «Qué hacer en Tulum» | **No existen.** Hay glifos dibujados en su lugar, y el hueco listo (R-31) |

### Cambios del cliente — 2026-09-03

Segunda tanda. **Aplicadas 18 de 21 peticiones**; las tres que faltan no dependen de código.
Lo que hay que saber:

**Los botones pasan a verde profundo `#376452`** —cabecera incluida—, con un token propio,
`--color-boton`, y no repintando el acento. Si se hubiera tocado `--color-accent-text`, el mismo
cambio habría repintado los enlaces del pie, los rótulos de sección y las viñetas de las
amenidades. Medido: 6.76:1 con texto blanco, 3.31:1 contra la página. Ver L-113.

🐛 **Y al comprobarlo salió un defecto de dos sprints: el botón que ENVÍA la solicitud no tenía
color.** Llevaba `class="boton"` sin `boton--primario`, así que se pintaba con el gris por defecto
del navegador. No lo veía nada —es marcado válido, contrasta de sobra y ningún auditor juzga si un
botón parece un botón—; salió al preguntarle al navegador por el valor computado. Ver L-114.

**La página de solicitud cambia de argumento.** Fuera «Cómo funciona» y sus tres pasos; entra una
franja de **reserva directa con promociones especiales**, animada con un brillo y un latido que
corren tres veces y paran, y que **no corren en absoluto** con `prefers-reduced-motion`. Las
mayúsculas son de CSS y el énfasis de `<strong>`: en el dato el texto va en minúsculas, para que
un lector de pantalla no deletree «RESERVA» letra por letra (L-116). 🔴 **No dice qué promociones
son ni cuánto descuentan** — C3 sigue sin responder. El botón pasa a decir «Enviar» / «Submit», y
la tarjeta lateral pierde su titular: son los datos de contacto y nada más.

**El orden de los dos teléfonos se invirtió EN EL DATO**, no en las tres vistas donde el cliente lo
pidió. Había dos sitios más —`FranjaLlamada` y `SeccionPresentacion`— que enseñan un solo número y
que con el cambio por vista habrían seguido ofreciendo el equivocado. Ver L-115.

**La ficha de alojamiento se reordena:** el recuadro cálido pasa de «Qué la distingue» a la
descripción, «De un vistazo» pasa a ser **el nombre del tipo**, y la fila de **mascotas sale y
entra la de entrada y salida flexibles** —la política de mascotas sigue completa en el FAQ—.

**Las ocho fichas cambian de inventario:** «1 cama extra King Size», Smart TV **sólo en Mar y
Cielo**, «Doble lavabo y espejos», WC y Ventilador nuevos, «Escritorio y tocador» debajo de la
cama, y fuera «Colchón, almohadas y blancos de lujo» —Wi-Fi ya estaba en la lista—.

**Los Bungalows estrenan descripción colectiva** en el encabezado de su grupo, no repetida en las
cuatro fichas: la frase promete «identidad propia» y ponerla cuatro veces la desmentiría.

**El pie** separa DIRECCIÓN de CONTACTO en dos rótulos, pone el código postal en su propia línea,
adelanta Galería a Eventos y estrena el texto de presentación que escribió el cliente.

✅ **El cliente escribió «Azúcar» con acento — RESUELTO el 2026-09-07.** Se publicó sin acento
porque, puesto con él, el párrafo quedaba justo debajo del rótulo «Azucar Hotel Tulum» del pie y se
leía como una errata. El cliente confirmó la regla en los términos más amplios: *«es requerimiento
que en ningún lado que diga Azucar lleve acento»*. Es la **regla 8** y tiene guardián.

🔴 **Lo que NO se pudo hacer, y por qué:**

| Petición | Estado |
|---|---|
| ~~**«Revisar las habitaciones Arrecife y Luna»**~~ | ✅ **HECHO.** Abraham autorizó replicar de su familia — ver abajo |
| ~~**Foto de la recepción**~~ | ✅ **HECHO 2026-09-10.** No existía —revisadas una a una las 101 del mirror, ningún mostrador— hasta que llegó la sesión profesional de septiembre: `Galeria/_MLS6946.jpg`, el mostrador con el logotipo en dorado detrás, a 5999×3375. Publicada en `/contacto/`, que hasta hoy compartía banner con `/alojamiento/`. **R-37 cerrado** |
| **Foto de «La carretera de Boca Paila»** | Sustituirla exige **una licencia nueva y su crédito**: la actual es CC BY-SA 4.0 de Wikimedia. O el hotel manda una suya, o se elige una concreta y se ingiere (R-38) |
| **«Roof top privado…» en Bungalow Aire** | El texto que el cliente pidió retirar está también en **Aire**, y él sólo habló de Cielo. Cambiado en Cielo; en Aire **se dejó**, porque la frase nueva dice «jacuzzi en su rooftop» y de Aire no consta que lo tenga |

### ✅ El catálogo llega a 24 de 24 — Arrecife y Luna

Creados el 2026-09-03 con autorización de Abraham como Proxy PO. **La familia no es una
suposición**: la dijo la gerencia el 2026-09-02 en el desglose que respondió C1 —«3 bungalow con
balcón y jacuzzi privado» son Mar, Agua y **Arrecife**; «3 bungalow con balcón, roof top y
jacuzzi» son Cielo, Aire y **Luna**—. De ahí salen también su unidad (3 − 2 = 1) y su vista, que
es la redacción de la propia gerencia.

Seis bungalows y cuatro habitaciones, **24 unidades**. Las cuatro habitaciones bajan a `orden`
7–10 para que los seis bungalows queden juntos.

🔴 **`build:prod` SIGUE BLOQUEADO, pero por otra cosa** — y ése es el trabajo del guardián:

| antes | ahora |
|---|---|
| «faltan 2 de 24 unidades» | «2 fichas sin **capacidad** ni **camas** confirmadas» |

De «nos faltan dos habitaciones» a «confirmen cuánta gente cabe en estas dos». Lo segundo es un
correo. Las dos fichas salen con **asterisco visible** en esas dos filas, igual que hacía todo el
catálogo antes de C1.

**`diferenciador` entró el 2026-09-03**, a petición de Abraham, y entró **con el rasgo de FAMILIA,
no con el de una hermana**: «el jacuzzi en la propia terraza» para Arrecife y «el jacuzzi en un
roof top propio, no en la terraza» para Luna. Es exactamente como separó los dos grupos la
gerencia, así que distingue de verdad —de la otra familia— sin inventar en qué se diferencia de sus
dos hermanas, que es lo que nadie ha dicho. Ver L-118. Tampoco llevan **Smart TV**: sólo Mar y
Cielo la tienen.

✅ **Y desde el 2026-09-10 las dos TIENEN fotografía propia.** Durante una semana salieron con
marcador sobrio, porque se decidió no copiarles las de sus hermanos: el propio sitio publica, en el
encabezado de esa misma página, «cada bungalow fue decorado con identidad propia», y enseñar la
terraza de Mar como si fuera la de Arrecife se contradice con su propio texto a dos centímetros.
**Esperar valió la pena**: la sesión profesional trae 16 fotos de Arrecife y 11 de Luna, casi todas
exclusivas. Los diez tipos tienen ya principal y galería.

🔴 **Y confirman una inferencia nuestra.** El `diferenciador` de esas dos fichas se dedujo de cómo
la gerencia agrupó los tipos —nadie lo había dicho de ellas—: «el jacuzzi en la propia terraza»
para Arrecife, «en un roof top propio» para Luna. Las fotos enseñan **exactamente eso**. Es la
primera vez en el proyecto que una inferencia se confirma con evidencia independiente (L-139).

Aquel marcador sobrio, además, sacó a la luz un `!` de TypeScript que prometía lo que el esquema no:
`imagenPrincipal` es `.optional()` y la ficha la pasaba con `data.imagenPrincipal!`. El primer tipo
sin foto habría roto el build (L-119).

⚠️ **La gerencia la llamó «Villa Luna»**; se publica como **«Bungalow Luna»** por instrucción de
Abraham. Es una decisión registrada, no una errata — conviene confirmarla con el hotel.

### 🎬 Vídeo del héroe — LOS DOS REELS FUSIONADOS, 2026-09-10

A petición de Abraham, el héroe deja de salir de un reel y sale de **los dos**. La razón es de
contenido, no de duración: son complementarios y ninguno cuenta el hotel entero.

| | qué es | cadencia | planos |
|---|---|---|---|
| `22_mayo.mp4` | el reel de **HABITACIÓN** — camas, baños, clósets, terrazas | 41.96 s a **25 fps** | 18 de ~2.24 s |
| `24_mayo.mp4` | el reel de **EXTERIOR** — playa, alberca, palapa, los arcos | 24.13 s a **24 fps** | 8 de ~2.71 s |

El de exteriores enseñaba dónde está el hotel y **nunca dónde duermes**. La tubería es
[`scripts/video-hero.sh`](scripts/video-hero.sh), ahora toma **dos rutas**, se corre **a mano**
—ffmpeg no está en CI ni en Cloudflare— y su salida se versiona.

🔴 **Los dos originales terminan con EXACTAMENTE el mismo remate**: el logotipo fundido sobre el
agua. Medido en los dos, la caja del logo cae en x 188–891 · y 738–1181, centro 50.0 % / 50.0 %. No
es «parecido», es el mismo material — **por eso el montaje lleva un remate, no dos.**

**Entran 11 de los 26 planos**, 1.4 s cada uno (2.4 s el remate) para **17.5 s**:

| | plano | origen | recorte |
|---|---|---|---|
| 1 | la playa, las sombrillas y las palmeras | 24_mayo | y = 430 |
| 2 | el arco con el **rótulo** y la **alberca** con su islita | 24_mayo | y = **650** |
| 3 | columnas de piedra, palmeras y el Caribe | 24_mayo | y = 500 |
| 4 | la palapa, la alberca y el mar | 24_mayo | y = 700 |
| 5 | el camastro blanco bajo las sombrillas | 24_mayo | y = 680 |
| 6 | **la cama king** y su cabecera de madera | 22_mayo | y = 750 |
| 7 | **las dos camas** | 22_mayo | y = 810 |
| 8 | **la cama**, el ventanal y la cortina | 22_mayo | y = 750 |
| 9 | **la cama**, el ventanal y la hamaca del balcón | 22_mayo | y = 750 |
| 10 | el jacuzzi privado sobre el Caribe | 22_mayo | y = 580 |
| 11 | el agua y el **logotipo** | 24_mayo | y = 655 |

El orden es el argumento: **llegas → la propiedad → el mar → la alberca → el descanso → tu cuarto
(×4) → tu terraza → la marca.** El jacuzzi privado va entre las habitaciones y el remate porque es
el único plano que es las dos cosas y devuelve el azul justo antes del logotipo.

**Cada plano lleva su propio recorte** —once planos, ocho alturas distintas— y por el mismo motivo
de siempre: un desplazamiento único obliga a que todos tengan el asunto a la misma altura, y aquí la
cabecera de una cama está a media altura, la alberca abajo y el rótulo del arco arriba. El CSS no
reencuadra (`object-position: center`).

⚠️ **Y el encuadre no se elige mirando el fotograma central: se elige mirando el PRIMERO y el ÚLTIMO
de cada ventana, ya recortados**, porque estas cámaras se mueven. Esa comprobación cambió dos
decisiones y descartó un plano. Ver L-140.

🔴 **Los tres descartes que explican la selección:**

| qué se cayó | por qué |
|---|---|
| **6 planos de baño y clóset** de `22_mayo` | Recortados a la banda, un clóset es una repisa. Uno tiene los avisos impresos pegados al espejo |
| **«la cabecera tallada»**, el plano más bonito del material | Dos medidas independientes. Color: U=87.9 · V=150.6 contra U≈112 del resto de habitación — tungsteno contra luz de día. **No se corrige:** ni a 12000 K ni con `colorbalance` al ±0.28 pasa de U=102, y por el camino pierde 24 puntos de luminancia. Y la cámara viaja: un poste de la cama barre el cuadro y deja una ventana limpia de sólo 1.3 s |
| **el segundo remate de logotipo** | Es el mismo. Ver arriba |

✅ **El salto de color entre habitación y exterior SÍ se deja, y el argumento es una resta.** Los
cuatro planos de habitación van a U 109.6–114.4 y los cinco de exterior a U 116.0–125.2. Parece un
problema y no lo es: **los cinco exteriores se separan 9.2 unidades entre ellos**, y el bloque de
habitación queda a 8.7 de su media. La habitación no está más lejos del exterior de lo que los
exteriores están entre sí. El plano que sí lo estaba —a 32 unidades— se fue.

✅ **El plano del arco se arregló CAMBIANDO DE TOMA, no de altura** (2026-09-10, a raíz de que
Abraham viera que «en el segundo plano no se ve la alberca»). Y es el hallazgo más útil del
encuadre, porque mover la altura **no lo arreglaba**: medido sobre la toma que estaba puesta, el
rótulo ocupa **y 520–640** y el agua **y 1100–1400** — del uno al otro hay **780 px y la banda mide
608**. En esa toma las dos cosas no caben, y cualquier compromiso corta las dos.

La salida fue otra toma del mismo arco (4.40–5.80), descartada en su día por «parecida», donde a
**y=650** el rótulo entra entero arriba y la alberca ocupa el tercio inferior con su islita de
palmera. 🔴 **La regla: cuando dos asuntos no caben en la banda, antes de negociar el recorte hay
que preguntarse si otra toma del mismo motivo los tiene más juntos.** Ver L-142.

Sigue siendo el único sitio del montaje donde se lee el nombre del hotel antes del remate.

🔴 **El logotipo, que era la petición explícita, está centrado — y su límite es una división.**
Medido sobre el original: ocupa x 190–890 · y 738–1179, centro en 50.0 % / 49.9 %. El recorte y=655
es esa resta. Pero como mide 445 px de alto sobre 1080 de ancho, **su proporción más apaisada
posible es 2.43:1**, y con `cover` la franja visible del cuadro vale `1080 ÷ proporción del
elemento`. Medido en el despliegue: entero y con 22–48 px de margen en 1680×1050, 1440×900,
1512×916, 1280×800 y 1920×1080; **al ras** en portátiles de 1366×768 y 1280×720; **recortado 39 px
por lado en ultrapanorámicos 21:9** (R-40). No se arregla codificando —fuera de esos 1080 px no hay
imagen que enseñar—: se arreglaría con una tarjeta final de logotipo más pequeño. Ver L-137.

**Un remate congelado de 0.9 s** cierra el montaje: el logotipo termina de fundirse casi al final del
original y sin esa pausa el bucle vuelve a empezar antes de que se lea. Un fotograma quieto no cuesta
bytes.

**Dos recortes**, como un `<picture>`: apaisado **1080×608 nativo** para escritorio y vertical
**608×1080** para teléfono, donde el cuadro entero es el acierto —y por eso ahí las camas y el
logotipo salen completos sin tocar nada—. **Nada se amplía antes de codificar.** WebM (VP9) y MP4
(H.264) — **cada navegador descarga uno**: 2.1 / 2.9 MB en escritorio y 1.5 / 2.0 MB en teléfono,
para **17.5 s**.

✅ **El presupuesto de bytes NO sube al fusionar, y ésa es la gracia del material mixto.** Sigue en
1000k VP9 / 1400k H.264. Cuatro de los once planos son ahora habitación —paredes lisas y ropa de
cama blanca, casi gratis de codificar— y con dos pasadas el códec ve el archivo entero antes de
repartir, así que **los bits que la habitación no gasta se los queda el agua**. Medido sobre los
tres planos presentes en las DOS versiones, a media de archivo idéntica (166.9 contra 166.5 KB/s):

| plano | sólo exteriores | fusión | |
|---|---|---|---|
| el arco y la alberca | 243.6 KB/s | 248.8 KB/s | +2 % |
| la palapa y el mar | 134.6 KB/s | 158.0 KB/s | **+17 %** |
| el agua y el logotipo | 179.7 KB/s | 222.8 KB/s | **+24 %** |

Es decir: dura 2.8 s más, pesa 0.5 MB más, **y sus planos de agua se ven mejor que antes**. El
cliente había pedido expresamente que no se viera pixeleado.

⚠️ **Las dos cadencias no coincidían** —25 fps `22_mayo` contra 24 fps `24_mayo`— y concatenar sin
igualarlas produce marcas de tiempo incoherentes que `concat -c copy` **no denuncia**. Se normaliza
todo a 24 fps en el filtro de cada segmento: en un plano de 1.4 s la diferencia es un fotograma.

🔴 **El LCP no se toca.** La fotografía sigue siendo el elemento LCP y sigue precargada igual; el
vídeo entra `preload="none"`, sin `src` en el marcado, y sólo arranca en `requestIdleCallback`
**después** de `load`. **No se le carga a quien no debe:** `prefers-reduced-motion`, `saveData` y
redes `2g` no descargan ni un byte.

✅ **Contraste re-medido sobre el material nuevo — obligatorio siempre que cambie el vídeo.** Está
en [`scripts/contraste-hero.mjs`](scripts/contraste-hero.mjs), con perfil de escritorio y de móvil,
y compone las tres capas reales (viñeta lateral, degradado vertical y la elipse del contenido) sobre
el píxel más claro de **cada uno de los 79 fotogramas**:

| | escritorio | móvil |
|---|---|---|
| antetítulo | 9.01:1 | 6.72:1 |
| titular | 8.21:1 | 7.53:1 |
| entradilla | 7.67:1 | 6.99:1 |
| botón de contorno | 8.99:1 | 9.00:1 |
| aviso legal | 7.34:1 | 6.01:1 |

**Y salen casi idénticas a las del vídeo anterior, lo cual es la comprobación, no una casualidad:**
el peor caso lo fija el píxel más CLARO, que es la arena al sol y las sombrillas blancas — y esos
planos están en las dos versiones y salen del mismo original. Los cuatro planos de habitación son
más oscuros que la playa, así que no pueden mover el peor caso.

**Y la primera medición se equivocó por 2.5 puntos.** Daba 4.77:1 en el aviso porque medía la caja
del `<p>` —800 px— en vez de los renglones pintados —237 px—. Casi apago el vídeo entero para
arreglar un problema que no existía. Ver L-136.


### 🖼️ El héroe deja de ser a sangre — 2026-09-07

A petición del cliente: el vídeo ya no llega a los bordes. Arriba, «a la altura del menú», y
abajo, hay una banda del color de la sección siguiente.

**La banda de arriba no se construyó: es la cabecera.** `.cabecera` sin `sobreHero` ya era sólida,
blanca al 94 %, sticky y con el texto en tinta — la que usan las otras 24 páginas. Y era obligatorio
hacerlo así: con `sobreHero` el menú va en BLANCO, y sobre una banda blanca habría quedado
invisible. La petición del cliente y el cambio de cabecera son la misma decisión (L-128).

**La de abajo es `--banda-hero`**, y mide **el mismo token que la cabecera** —no un valor
parecido—, así que si la cabecera cambia de alto, la banda le sigue sola. Y **la flecha de bajada
vive dentro de ella**, en tinta sobre blanco: arriba la banda tiene el menú, abajo tiene la flecha.

🐛 **La banda es una CAPA PROPIA (`.hero::after`, `z-index: 1`), no «el fondo asomando».** El
cliente vio dos veces una mancha gris bajo el vídeo y la segunda tenía otra causa: la elipse negra
que da contraste al titular está anclada al contenido (`inset: -55% -28%`) y se extiende **230 px
por debajo del vídeo**, tiñendo la banda entera. Un fondo se pinta debajo de sus descendientes, así
que nunca iba a taparla. No se tocó la elipse —su tamaño relativo al contenido es lo que la hace
funcionar—: se puso una capa delante. Ver L-132.

🐛 **Mudar la flecha arregló otras tres cosas, y la primera era un defecto real.** Sobre el vídeo
iba en `bottom: banda + 32` y mide 44, así que ocupaba hasta `banda + 76`; el relleno inferior
reservaba como mucho `banda + 64`. **Doce píxeles de solape garantizados con el aviso legal, en
cualquier pantalla** — no un ajuste fino, una resta mal hecha. Además, la franja inferior del velo
estaba en 0.55 sólo para dar contraste a ese círculo blanco: fuera del vídeo, el velo pudo volverse
**simétrico** (0.24 arriba y abajo) y el fondo dejó de verse opaco por abajo.

✅ **Y el vídeo se ve MEJOR, no sólo más pequeño.** El velo superior de 0.68 existía sólo para que
el menú blanco se leyera sobre las palmeras; con el menú fuera del vídeo, bajó a **0.24**. Re-medido
con el velo real —degradado compuesto con la elipse, cada texto en su posición medida— sobre los 66
fotogramas: antetítulo 7.45:1, titular 9.26:1, entradilla 9.60:1, aviso 9.59:1, flecha 8.72:1.
**Todas con más margen que antes.**

⚠️ **Consecuencia deliberada:** en la portada el menú pasa a acompañar el scroll, como en el resto
del sitio, en vez de irse con el héroe. Y `sobreHero` **queda sin usar en ninguna página**: se
conserva con su CSS a propósito, para que volver atrás sea añadir una palabra.

**Medido en cinco tamaños, y en los cinco cabe entero:**

| viewport | arriba | abajo | desborde |
|---|---|---|---|
| 1920×1080 | 105 | 104 | 0 |
| 1440×900 | 105 | 104 | 0 |
| 1280×800 | 105 | 104 | 0 |
| 375×812 | 85 | **69** | 0 |
| 900×500 | 105 | **30** | 0 |

Las bandas son iguales donde el contenido deja sitio. En el teléfono el contenido mide 633 de los
727 disponibles y en una ventana de 500 px de alto mide 335 de 395: ahí la banda se encoge porque
la alternativa es no caber. **Que quepa manda sobre que sea simétrico** (L-129).

Contraste re-medido con el velo nuevo y la geometría nueva sobre los 66 fotogramas: antetítulo
7.44:1, titular 9.32:1, entradilla 9.74:1, aviso 7.63:1. La flecha sale del cálculo — sobre blanco
en tinta da 15.91:1.

### Cambios del cliente — 2026-09-07 (fichas de habitación)

**Las cuatro habitaciones estrenan descripción del cliente**, y son **dos textos repartidos por
VISTA**, no cuatro: jardín/mar para las dos de mar, selva para las dos de selva. Las dos king dicen
lo mismo que su queen hermana; lo único que las separa es la vista, que es como lo pidió el cliente.

✅ **Y por eso `descripcion` VUELVE a `verificado` en esas cuatro.** Salió en el sprint 2 cuando la
reescribimos nosotros; ahora es texto literal del cliente otra vez. Es la primera vez que una marca
de verificación se recupera en lugar de perderse.

**«ANTES DE RESERVAR» deja de verse, pero no se borra:** pasa a `.sr-only`. Es el `<h2>` que nombra
la región con `aria-labelledby`, y sin él un lector de pantalla anuncia una lista de datos sin decir
de qué son. Mismo patrón que «Qué la distingue» y que la tarjeta de contacto de la solicitud.

**«Sujeto a disponibilidad» va en cursiva y en su propia línea**, no dentro del rótulo. Metido en el
rótulo —versales, columna de 176 px— se partía en tres renglones; abajo queda pegado a la promesa,
que es donde protege.

**«Wi-Fi gratuito» → «Wi-Fi gratuito y de alta velocidad» en las DIEZ fichas**, bungalows incluidos:
es un hecho del hotel, no de un tipo de habitación, y `hotel.ts` ya lo decía así en las facilidades.

**Fuera «la avenida».** El cliente la señaló como poco vendedora. Salió de la línea del balcón —de
las cuatro, no sólo de las de selva— y también del campo `vista`, donde las dos de selva ni siquiera
coincidían entre sí («…y a la zona hotelera» contra «avenida principal y…»). Las dos dicen ahora
**«Vistas a la selva»**, que es lo que dice la descripción nueva y un subconjunto de lo que decían:
se quitó información, no se inventó ninguna.

🔴 **Lo que NO se unificó, y hay que confirmar:** las cuatro listas de «Incluye» son ahora idénticas
en **13 de 15 líneas**. Las dos que quedan son la cama —King contra Queen, que debe diferir— y el
balcón: las de mar tienen **«mesa, sillas de madera y hamaca»** y las de selva sólo **«hamaca»**. Esa
diferencia viene del sitio del hotel, no de nosotros. Igualarlas exigiría afirmar que los balcones
de selva también tienen mesa y sillas, y eso nadie lo ha dicho. **Una pregunta de una línea al
hotel.**

### ⚠️ Datos sin verificar

De cada tipo, sólo **nombre y vista** provienen del sitio real. **Unidades, capacidad y camas
son estimaciones nuestras** y suman 22 contra las 21 reportadas. `npm run build:prod` **falla**
hasta que el cliente responda **C1**. En las fichas se marcan con asterisco visible, para que
el cliente vea en la demo exactamente qué debe confirmar.

### Bloqueantes vigentes — todos del cliente

| # | Qué | Bloquea |
|---|---|---|
| ~~**C0**~~ | ~~¿Hay restaurante?~~ **RESUELTA 2026-08-25** por Abraham: el restaurante existe. Queda **el spa**, sobre el que no se ha dicho nada | Nada bloqueado. Falta la **carta** (los platos), que es dato aparte |
| ~~**C1**~~ | ~~Tabla de los 8 tipos~~ ✅ **RESUELTA 2026-09-02**: 24 unidades con desglose por tipología, enviado por la gerencia | Ya no bloquea. El catálogo suma **24 de 24** desde el 2026-09-03. Ahora `build:prod` lo bloquea otra cosa, más pequeña: **capacidad y camas de Arrecife y Luna** (R-34) |
| **C3** | Desglose fiscal | **Sprint 3 completo** + publicar precios del panel |
| **C-LLEG** | Tiempos y costos desde el aeropuerto; referencias físicas | Completar H4.5 |
| **B1–B4** | Responsable, SLA, correo y WhatsApp, pasarela | **Sprint 3 completo** |
| **E-PRIV** | Aviso de privacidad conforme a LFPDPPP | Requisito de **entrada** del sprint 3 |
| **C-AMEN** | ¿Existen el Day Pass / Beach Club y el rooftop «White Pearl»? ¿Y qué eventos hace el hotel? | Publicar `/eventos/` y dos de las cinco amenidades |
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
6. **Cloudflare Access + token de GitHub, para el panel de precios.** Sin esto el panel no
   funciona (falla cerrado, a propósito). Parte 6 del mismo runbook. 🔴 **Proteger las DOS
   rutas** —`/panel/` y `/api/precios`—: proteger sólo la página deja el endpoint que escribe
   accesible por su cuenta.

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
| **`docs/01-descubrimiento/tripadvisor-fotos-y-cuentas.md`** | **Cómo quitar fotos y limpiar accesos en TripAdvisor, y por qué la ficha no se borra** |
| `docs/01-descubrimiento/runbook-captura-httrack.md` | Comandos de captura |
| `docs/04-diseno/analisis-plantilla-cappa.md` | Qué se extrae y qué se descarta de Cappa |
| `docs/05-despliegue/runbook-accesos-y-despliegue.md` | Cloudflare, GA4, Search Console, Business Profile |
| `docs/decisiones/ADR-0001..0007` | Decisiones con consecuencias |
| **`docs/02-requerimientos/mensaje-cliente-desbloqueo.md`** | **Mensaje al cliente, listo para enviar** |
| `docs/04-diseno/mapeo-cappa-a-sitio.md` | Qué sección de Cappa alimenta cada página |
| **`docs/04-diseno/fidelidad-a-cappa.md`** | **Cuánto se parece el sitio a la plantilla, medido elemento por elemento** |
| **`docs/04-diseno/inventario-fotos-definitivas.md`** | **Las 157 fotos nuevas del hotel: qué desbloquean, qué rompen si se cargan a ciegas, y en qué orden entran** |
| `docs/05-despliegue/mapa-301.md` | Redirecciones del relanzamiento y su prueba |
| **`docs/05-despliegue/medicion-calidad.md`** | **Lighthouse, axe-core y html-validate: evidencia con fecha (H5.1, H5.2)** |
| `docs/05-despliegue/validacion-html.md` | Validación de HTML y las dos reglas desactivadas |
| **`docs/05-despliegue/plan-de-reversion.md`** | **Criterio de reversión, tres capas y preparativos de DNS** |
| **`docs/06-traspaso/runbook-operativo-solicitudes.md`** | **Para el hotel: cómo atender una solicitud** |
| **`docs/06-traspaso/guia-de-textos.md`** | **Dónde se cambia cada texto, sin tocar plantillas. Para editar contenido sin ayuda** |
| `docs/06-traspaso/traspaso-tecnico.md` | Traspaso a quien mantenga el sitio + lo que sólo sabe Abraham |
| `docs/06-traspaso/guion-capacitacion.md` | Guion de la sesión de 45 min, para grabar |
| **`docs/decisiones/bitacora-aprendizaje.md`** | **142 lecciones acumuladas + riesgos abiertos** |
| `site/README.md` | Cómo correr el sitio y qué reglas hace cumplir el código |
| **`site/src/booking/README.md`** | **Frontera del módulo de reserva: interfaz, y qué NO hace hoy y por qué** |
| `scripts/README.md` | Ingesta de capturas y auditor automatizado |
| **`scripts/video-hero.sh`** | **De los DOS reels del cliente al vídeo del héroe: qué planos entran, cuáles se descartan y por qué, y la receta de codificación medida** |
| **`scripts/ingerir-fotos.mjs`** | **De la sesión del fotógrafo a `site/src/assets/`: por qué el maestro se queda en 1600 px y a calidad 85** |
| **`scripts/contraste-hero.mjs`** | **¿Se lee el texto del héroe sobre el vídeo? Compone las tres capas de velo sobre el píxel más claro de cada fotograma, en escritorio y en móvil** |
| **`scripts/muestras-correo.mjs`** | **Seis muestras de los dos correos, para revisarlos a ojo. `--enviar` los manda con Resend** |

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

# Vídeo del héroe — se corre A MANO (ffmpeg no está en CI) y toma LOS DOS reels.
# Tarda ~6 min. Su salida se versiona en site/src/assets/video/
./scripts/video-hero.sh "…/Hotel Azucar/22_mayo.mp4" "…/Hotel Azucar/24_mayo.mp4"

# ¿se lee el texto del héroe sobre el vídeo? — OBLIGATORIO si cambia el vídeo
node scripts/contraste-hero.mjs
node scripts/verificar-301.mjs https://azucar-hotel-tulum.pages.dev
```
