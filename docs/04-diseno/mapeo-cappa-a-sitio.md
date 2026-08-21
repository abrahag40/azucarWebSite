# Mapeo Cappa → sitio de Azúcar Hotel Tulum

> **Fecha:** 2026-08-20 · **Fase:** entrada al sprint 2
> **Referencia visual aprobada:** `demo1-light/index11.html` de la plantilla Cappa,
> versionada en `investigacion/mirrors/cappa/`.
> **Encargo del cliente:** *un sitio visualmente igual a la plantilla*, adaptado al hotel.
> **Complementa** a [`analisis-plantilla-cappa.md`](analisis-plantilla-cappa.md), que decide
> **qué** se extrae. Este documento decide **dónde va cada cosa**.

---

## 0. Por qué existe este documento

El plan de sprints está organizado por **valor para el huésped** —catálogo, reserva,
contenido, lanzamiento—. La plantilla está organizada por **página de demo**. Sin una tabla
que traduzca una cosa en la otra, cada historia empieza con una discusión sobre de dónde
sale el diseño, y esa discusión se repite catorce veces.

> **Técnica:** *traceability matrix* del BABOK — una matriz que liga cada elemento de origen
> con su destino y su estado. Sirve para lo mismo aquí que en requerimientos: hace visible
> lo que **no** está mapeado, que es siempre donde aparecen las sorpresas.

**Antipatrón evitado:** empezar a maquetar página por página y descubrir en el sprint 4 que
la plantilla no tenía nada parecido a "cómo llegar" y que hay que inventarlo con prisa.

---

## 1. La variante de referencia

Cappa trae **15 variantes de home** (`index.html` … `index15.html`). La captura HTTrack se
sembró en `index11.html`, que es la que se le mostró al cliente. **Ésa es la referencia y
las otras 14 se descartan** — no como pérdida, sino porque un sitio tiene una home.

De las 41 páginas HTML capturadas, **17 son ruido de demo** (14 homes alternativas, 2 stubs
404 y `coming-soon`). El material real de trabajo son **24 páginas**.

---

## 2. Mapeo de páginas

### 2.1 Se adoptan — la plantilla tiene la página y el hotel la necesita

| Cappa | Azúcar ES | Azúcar EN | Sprint | Nota de adaptación |
|---|---|---|---|---|
| `index11.html` | `/` | `/en/` | 1 ✅ | Hecha. Faltan secciones intermedias |
| `rooms.html` | `/alojamiento/` | `/en/rooms/` | 2 | La rejilla de tarjetas es el patrón |
| `room-details.html` | `/alojamiento/[tipo]/` | `/en/rooms/[type]/` | 2 | Una página por cada uno de los 8 tipos |
| `gallery.html` | `/galeria/` | `/en/gallery/` | 4 | |
| `facilities.html` | `/servicios/` | `/en/services/` | 4 | Se fusiona con `services.html` |
| `services.html` | ↑ fusionada | ↑ | 4 | Cappa las separa sin motivo claro |
| `restaurant.html` | `/restaurante/` | `/en/restaurant/` | 4 | |
| `spa-wellness.html` | `/experiencias/` | `/en/experiences/` | 4 | Azúcar no tiene spa; el molde sirve |
| `about.html` | `/nosotros/` | `/en/about-us/` | 4 | |
| `contact.html` | `/contacto/` | `/en/contact/` | 4 | Sin el mapa de Mapbox de la demo |
| `faq.html` | `/preguntas-frecuentes/` | `/en/frequent-questions/` | 4 | |
| `404.html` | `/404` | `/en/404` | 4 | |

**Las URLs en español conservan el esquema del sitio vigente** para no invalidar las 301 ya
en producción. Las inglesas también, **con una corrección**: la home inglesa pasa de
`/en/home/` a `/en/`, que era ya una observación de la auditoría.

### 2.2 Se descartan — la plantilla las trae y el hotel no las necesita

| Cappa | Por qué se descarta |
|---|---|
| `index.html` … `index15.html` (14) | Variantes de demo. La referencia es `index11` |
| `news.html`, `news2.html`, `post.html` | Blog. Último en el orden de priorización del backlog; fuera del corte de lanzamiento |
| `careers.html` | Un hotel de 21 unidades no publica vacantes en su web |
| `team.html` | Requiere fotos y biografías del personal. No hay material y no acerca a una reserva |
| `pricing.html` | "Extra Pricing" con tarifas fijas. **Choca con ADR-0003**: no publicamos precios que no podemos respaldar |
| `rooms2.html`, `rooms3.html` | Variantes del listado. `rooms2` además es un **buscador de disponibilidad** → ver §4.1 |
| `coming-soon.html`, `blog2/post2/post3` | Relleno y stubs 404 del propio demo |

### 2.3 Se añaden — el hotel las necesita y la plantilla no las tiene

Esto es lo que el mapeo saca a la luz, y es la mitad del valor de haberlo hecho.

| Azúcar | Sprint | De dónde sale el diseño |
|---|---|---|
| `/reservar/` · `/en/booking/` | 3 🔴 | **No existe en Cappa.** Se compone con el molde de `contact.html` + tarjetas de `rooms.html` |
| `/ubicacion/` · `/en/location/` | 4 | **No existe en Cappa.** Molde de `about.html` a dos columnas |
| `/politicas/` · `/en/policies/` | 4 | Molde de `faq.html` |
| `/aviso-de-privacidad/` · `/terminos/` | 4 | Molde de texto corrido de `faq.html`. Exigidas por LFPDPPP |

> **Cuatro de las páginas más importantes del proyecto no tienen equivalente en la
> plantilla** — incluida la del flujo de reserva, que es el corazón del encargo. "Igual que
> la plantilla" no puede significar "sólo lo que la plantilla tiene".

---

## 3. Mapeo de secciones de la home (`index11`)

En orden de aparición en el documento original:

| # | Sección Cappa | Destino | Estado |
|---|---|---|---|
| 1 | `banner-header` — héroe a pantalla completa | `Hero.astro` | ✅ hecho |
| 2 | `about` — "Enjoy a Luxury Experience" | Bloque de presentación → `/nosotros/` | Sprint 4 |
| 3 | `rooms1` — "Rooms & Suites" | `SeccionAlojamiento.astro` | ✅ hecho |
| 4 | `pricing` — tarifas | ⚠️ **en suspenso** → §4.2 | Bloqueada por C3 |
| 5 | `video-wrapper` — parallax + vídeo | Imagen fija a sangre, sin parallax → §4.3 | Sprint 4 |
| 6 | `facilties` — "Hotel Facilities" | Tira de amenidades | Sprint 4 |
| 7 | `testimonials` (×2) | ⚠️ **en suspenso** → §4.4 | Bloqueada |
| 8 | `services` | Tira de servicios | Sprint 4 |
| 9 | `news` — blog | Descartada | — |
| 10 | `clients` — logos de clientes | ⚠️ **no aplica** → §4.5 | — |
| 11 | `footer` | `Footer.astro` | ✅ hecho |

---

## 4. Donde "exactamente igual" choca con las reglas del proyecto

Cinco choques. Ninguno es negociable en silencio: cada uno lleva propuesta y quién decide.

### 4.1 🔴 El buscador de disponibilidad

`rooms2.html` y el widget "Hotel Booking Form" del pie traen un formulario de
entrada/salida/huéspedes que consulta disponibilidad.

**Choca de frente con la regla 2** —*nunca mostrar disponibilidad que no podamos
respaldar*— y con ADR-0003. El hotel no tiene PMS: no existe la fuente de verdad que ese
buscador necesita. Mostrarlo sería prometer algo que el sistema no puede cumplir.

> **Propuesta:** se conserva **la forma** —la barra ancha, su posición, su tipografía— y se
> cambia **la función**: en vez de "Buscar disponibilidad", *"Solicitar reserva"*, con
> fechas deseadas y sin promesa de confirmación. Visualmente idéntico. Semánticamente
> honesto. **Decide Abraham**, y si el cliente insiste en el buscador, hay que reabrir
> ADR-0003 antes, no después.

### 4.2 🟡 Los precios en las tarjetas

Cada tarjeta de `rooms.html` muestra `150$ / Night`, y hay una sección `pricing` completa.

Choca con la **regla 3** —el total cotizado incluye impuestos— y con la **regla 7** —datos
sin confirmar no se publican—. **C3 (desglose fiscal) sigue sin respuesta**, así que hoy no
podemos escribir ninguna cifra defendible.

> **Propuesta:** el hueco del precio se construye desde el primer día pero se rellena con
> `Desde $X MXN por noche · impuestos incluidos` **sólo cuando C3 esté respondida**. Hasta
> entonces, "Consultar tarifa". El componente no cambia; el dato llega después.

### 4.3 🟡 Parallax y vídeo de fondo

Cappa usa `bg-fixed` (parallax) en tres secciones y un vídeo de fondo, vía `jquery.stellar`.

`background-attachment: fixed` provoca repintados costosos al hacer scroll en móvil y es de
los patrones que más daño hacen al **INP**, que está en la DoD. Y el vídeo de fondo pesa más
que todo nuestro sitio actual.

> **Propuesta:** imagen a sangre con el mismo encuadre y la misma superposición oscura. En
> escritorio, si se quiere, un parallax **puro en CSS** respetando
> `prefers-reduced-motion`. La diferencia percibida es mínima; la de rendimiento no.

### 4.4 🟡 Testimonios

Cappa trae dos secciones de testimonios con textos y retratos inventados.

Publicar reseñas ficticias en el sitio de un hotel real no es una decisión de diseño.
Choca con la **regla 7**.

> **Propuesta:** la sección se construye y se alimenta con **reseñas reales** —TripAdvisor,
> Google, Booking— citando fuente y fecha. Si no hay material aprobado, la sección **no se
> publica**. Conseguir las reseñas es tarea tuya, no nuestra.

### 4.5 ℹ️ La franja de "clientes"

Logos de marcas cliente. Un hotel no tiene clientes corporativos que exhibir.

> **Propuesta:** se descarta, o se reutiliza el molde para distintivos verificables
> —Travelers' Choice, sellos de sustentabilidad— **si existen y se pueden probar**.

### 4.6 ⚠️ Y el que sigue abierto desde el sprint 0: la licencia

`font-awesome-pro.css` (512 KB) y las familias de iconos **Flaticon** y **Themify** son
recursos licenciados de la plantilla. Las tarjetas de habitación los usan para los iconos de
cama, baño, desayuno y toalla.

Las **tres tipografías** ya se despejaron: son Google Fonts con licencia SIL OFL. **Los
iconos no.** O se compra la licencia de Cappa, o se sustituyen por un set libre
(Lucide, Phosphor, Tabler). R-01 sigue bloqueando el sprint 4, no el 2.

---

## 5. Inventario de componentes

Lo que hay que construir, con su origen y su reemplazo técnico. Los reemplazos vienen ya
decididos de [`analisis-plantilla-cappa.md`](analisis-plantilla-cappa.md) §3.

| Componente | Origen en Cappa | Implementación | Estado |
|---|---|---|---|
| `Header` + menú | cabecera de `index11` | `<nav>` + `<details>`, sin JS | ✅ |
| `Hero` | `banner-header` | `<picture>` + CSS | ✅ |
| `TarjetaAlojamiento` | `.item` de `rooms.html` | Astro + datos | ✅ base |
| `SeccionAlojamiento` | `rooms1` | Astro | ✅ |
| `Footer` | `footer` de `index11` | Astro | ✅ |
| `Galeria` | Magnific Popup | **`<dialog>` nativo** | Sprint 2 |
| `Carrusel` | Owl Carousel | **scroll-snap CSS** | Sprint 2 |
| `FichaDetalle` | `room-details.html` | Astro + `getStaticPaths` | Sprint 2 |
| `TiraAmenidades` | `facilties` | Astro | Sprint 4 |
| `Acordeon` | `faq.html` | **`<details>`/`<summary>`** | Sprint 4 |
| `BarraSolicitud` | `reservations` | `<form>` sin JS | Sprint 3 |
| `Testimonios` | `testimonials` | Astro — §4.4 | Bloqueado |

**Ninguno arrastra jQuery.** Los 604 KB de JS y los 937 KB de CSS de la plantilla no entran
al repositorio: entra su resultado visual.

---

## 6. Qué bloquea qué

| Bloqueo | Bloquea | Responsable |
|---|---|---|
| **C1** — unidades, capacidad y camas | `build:prod`, y el dato de las tarjetas | Cliente |
| **C3** — desglose fiscal | §4.2 precios · sprint 3 completo | Cliente |
| **R-01** — licencia de iconos | Sprint 4 | Abraham |
| **Fotografía del hotel** | Fidelidad visual real de todo | Abraham |
| Reseñas reales | §4.4 | Abraham |
| Decisión sobre §4.1 | Sprint 3 | Abraham + cliente |

> **Sobre la fotografía, sin rodeos:** Cappa se ve como se ve porque sus 47 imágenes de demo
> son fotografía profesional de interiorismo, encuadrada para esos huecos. La auditoría
> confirmó que el hotel tiene 244 imágenes en WebP de 2025, bien dimensionadas — **material
> hay**. Lo que no sabemos es si hay encuadres que funcionen en un héroe a pantalla completa
> y en tarjetas verticales. Es la variable que más va a decidir si el resultado se percibe
> "igual que la plantilla", y no depende de código.
