# Auditoría técnica — `cappa`

> Generado por `scripts/audit-mirror.mjs` sobre la captura HTTrack.
> Reproducible: mismo mirror, mismo resultado.

## Resumen

| Métrica | Valor |
|---|---|
| Páginas HTML reales | 41 |
| Stubs de redirección (excluidos) | 0 |
| Páginas en español | 41 |
| Páginas en inglés | 0 |
| Archivos totales | 150 |
| Peso total | 18557 KB |
| Imágenes | 52 · 7380 KB (40 % del peso) |
| Formularios | 46 |
| Bloques schema.org | 0 |

## Hallazgos

|  | Tema | Hallazgo |
|---|---|---|
| 🔴 | SEO | 2 <title> duplicado(s): "The Cappa Luxury Hotel" ×35 · "404 Not Found" ×5 |
| 🔴 | Móvil | 1 página(s) sin meta viewport → no responsivo |
| 🔴 | SEO | Sin datos estructurados schema.org — un hotel sin schema.org/Hotel pierde presentación enriquecida en Google |
| 🔴 | A11y | 5 página(s) sin atributo lang en <html> (WCAG 3.1.1) |
| 🟡 | SEO | 5 de 41 páginas sin meta description |
| 🟡 | SEO/A11y | 13 página(s) sin exactamente un <h1> |
| 🟡 | SEO | 41 página(s) sin canonical |
| 🟡 | Rendimiento | 715 <img> sin width/height → provoca CLS |
| 🟡 | Rendimiento | 0 de 52 imágenes en formato moderno (WebP/AVIF) |
| 🟡 | A11y | 35 página(s) con salto en la jerarquía de encabezados (ej. h2 → h5 en `duruthemes.com/demo/html/cappa/demo1-light/about.html`) — rompe la navegación por lector de pantalla (WCAG 1.3.1) |

## Huella tecnológica

| Señal | Detectado |
|---|---|
| WordPress | no |
| Tema(s) | — |
| Plugins | — |
| jQuery | sí |
| meta generator | — |

## Dominios externos referenciados

| Dominio | Referencias | Contexto |
|---|---|---|
| `fonts.googleapis.com` | 70 | link |
| `fonts.gstatic.com` | 35 | link |
| `youtu.be` | 20 | enlace |
| `duruthemes.com` | 6 | src |
| `google.com` | 1 | src |

## Enlaces de reserva

| Página | Destino | Texto |
|---|---|---|
| `duruthemes.com/demo/html/cappa/demo1-light/index.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index10.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index11.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index12.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index13.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index14.html` | `room-details.html` | Book 300$ / Night Grand Suite |
| `duruthemes.com/demo/html/cappa/demo1-light/index14.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index15.html` | `room-details.html` | Book 300$ / Night Grand Suite |
| `duruthemes.com/demo/html/cappa/demo1-light/index15.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index2.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index2.html` | `#` | Book Now |
| `duruthemes.com/demo/html/cappa/demo1-light/index3.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index3.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index4.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index4.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index5.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index5.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index6.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index6.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index7.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index8.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index8.html` | `rooms2.html` | Book |
| `duruthemes.com/demo/html/cappa/demo1-light/index9.html` | `tel:8551004444` | 855 100 4444 Reservation |
| `duruthemes.com/demo/html/cappa/demo1-light/index9.html` | `rooms2.html` | Book |

## Formularios

| Página | Método | Destino | Campos | &lt;label&gt; |
|---|---|---|---|---|
| `duruthemes.com/demo/html/cappa/demo1-light/404.html` | GET | `(vacío)` | 1 | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/careers.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/coming-soon.html` | GET | `(vacío)` | 1 | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/contact.html` | POST | `https://duruthemes.com/demo/html/cappa/demo1-light` | 5 | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/contact.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/facilities.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/faq.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/gallery.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index10.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index10.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index11.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index12.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index12.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index13.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index13.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index14.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index15.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index15.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index2.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index2.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index3.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index3.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index4.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index4.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index5.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index6.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index6.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index7.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index7.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index8.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/index9.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/index9.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/news.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/news2.html` | GET | `(vacío)` | 1 | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/post.html` | POST | `(vacío)` | 3 | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/post.html` | GET | `(vacío)` | 1 | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/pricing.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/room-details.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms2.html` | GET | `(vacío)` | 0 | 5 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms2.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms3.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/services.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |
| `duruthemes.com/demo/html/cappa/demo1-light/team.html` | GET | `https://duruthemes.com/demo/html/cappa/demo1-light` | 0 | 4 |

## Mapa de redirecciones detectadas (insumo de las 301)

_Ninguna._

## Inventario de páginas

| Ruta | KB | lang | title | desc | h1 | canon | img |
|---|---|---|---|---|---|---|---|
| `duruthemes.com/demo/html/cappa/demo1-light/404.html` | 10 | en | 22c | ✓ | ✓ | ❌ | 1 |
| `duruthemes.com/demo/html/cappa/demo1-light/about.html` | 33 | en | 22c | ✓ | ✓ | ❌ | 19 |
| `duruthemes.com/demo/html/cappa/demo1-light/blog2.html` | 1 | — | 13c | ❌ | ✓ | ❌ | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/careers.html` | 22 | en | 22c | ✓ | ✓ | ❌ | 7 |
| `duruthemes.com/demo/html/cappa/demo1-light/coming-soon.html` | 7 | en | 22c | ✓ | ❌0 | ❌ | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/contact.html` | 24 | en | 22c | ✓ | ✓ | ❌ | 7 |
| `duruthemes.com/demo/html/cappa/demo1-light/css/plugins/Flaticon.html` | 1 | — | 13c | ❌ | ✓ | ❌ | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/css/plugins/owl.video.play.html` | 1 | — | 13c | ❌ | ✓ | ❌ | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/facilities.html` | 23 | en | 22c | ✓ | ✓ | ❌ | 7 |
| `duruthemes.com/demo/html/cappa/demo1-light/faq.html` | 25 | en | 22c | ✓ | ✓ | ❌ | 7 |
| `duruthemes.com/demo/html/cappa/demo1-light/gallery.html` | 26 | en | 22c | ✓ | ✓ | ❌ | 20 |
| `duruthemes.com/demo/html/cappa/demo1-light/index.html` | 58 | en | 22c | ✓ | ❌3 | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index10.html` | 56 | en | 22c | ✓ | ❌0 | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index11.html` | 51 | en | 22c | ✓ | ✓ | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index12.html` | 54 | en | 22c | ✓ | ✓ | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index13.html` | 55 | en | 22c | ✓ | ❌0 | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index14.html` | 56 | en | 22c | ✓ | ❌0 | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index15.html` | 60 | en | 22c | ✓ | ❌0 | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index2.html` | 59 | en | 22c | ✓ | ❌3 | ❌ | 33 |
| `duruthemes.com/demo/html/cappa/demo1-light/index3.html` | 63 | en | 22c | ✓ | ❌3 | ❌ | 29 |
| `duruthemes.com/demo/html/cappa/demo1-light/index4.html` | 59 | en | 22c | ✓ | ❌3 | ❌ | 35 |
| `duruthemes.com/demo/html/cappa/demo1-light/index5.html` | 52 | en | 22c | ✓ | ✓ | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index6.html` | 56 | en | 22c | ✓ | ✓ | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index7.html` | 57 | en | 22c | ✓ | ❌0 | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index8.html` | 53 | en | 22c | ✓ | ✓ | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/index9.html` | 56 | en | 22c | ✓ | ✓ | ❌ | 34 |
| `duruthemes.com/demo/html/cappa/demo1-light/news.html` | 25 | en | 22c | ✓ | ✓ | ❌ | 13 |
| `duruthemes.com/demo/html/cappa/demo1-light/news2.html` | 22 | en | 22c | ✓ | ✓ | ❌ | 7 |
| `duruthemes.com/demo/html/cappa/demo1-light/post.html` | 22 | en | 22c | ✓ | ✓ | ❌ | 9 |
| `duruthemes.com/demo/html/cappa/demo1-light/post2.html` | 1 | — | 13c | ❌ | ✓ | ❌ | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/post3.html` | 1 | — | 13c | ❌ | ✓ | ❌ | 0 |
| `duruthemes.com/demo/html/cappa/demo1-light/pricing.html` | 25 | en | 22c | ✓ | ✓ | ❌ | 13 |
| `duruthemes.com/demo/html/cappa/demo1-light/restaurant.html` | 35 | en | 22c | ✓ | ❌0 | ❌ | 7 |
| `duruthemes.com/demo/html/cappa/demo1-light/room-details.html` | 40 | en | 22c | ✓ | ❌0 | ❌ | 17 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms.html` | 31 | en | 22c | ✓ | ✓ | ❌ | 16 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms2.html` | 37 | en | 22c | ✓ | ✓ | ❌ | 15 |
| `duruthemes.com/demo/html/cappa/demo1-light/rooms3.html` | 37 | en | 22c | ✓ | ✓ | ❌ | 11 |
| `duruthemes.com/demo/html/cappa/demo1-light/services.html` | 24 | en | 22c | ✓ | ✓ | ❌ | 11 |
| `duruthemes.com/demo/html/cappa/demo1-light/spa-wellness.html` | 27 | en | 22c | ✓ | ❌0 | ❌ | 10 |
| `duruthemes.com/demo/html/cappa/demo1-light/team.html` | 26 | en | 22c | ✓ | ✓ | ❌ | 13 |
| `index.html` | 5 | en | 36c | ✓ | ✓ | ❌ | 0 |

## 25 imágenes más pesadas

| KB | Archivo |
|---|---|
| 370 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/7.jpg` |
| 370 | `duruthemes.com/demo/html/cappa/demo1-light/img/slider/7.jpg` |
| 333 | `duruthemes.com/demo/html/cappa/demo1-light/img/restaurant/1.jpg` |
| 318 | `duruthemes.com/demo/html/cappa/demo1-light/img/restaurant/3.jpg` |
| 316 | `duruthemes.com/demo/html/cappa/demo1-light/img/slider/5.jpg` |
| 299 | `duruthemes.com/demo/html/cappa/demo1-light/img/spa/1.jpg` |
| 289 | `duruthemes.com/demo/html/cappa/demo1-light/img/restaurant/2.jpg` |
| 288 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/4.jpg` |
| 288 | `duruthemes.com/demo/html/cappa/demo1-light/img/slider/3.jpg` |
| 279 | `duruthemes.com/demo/html/cappa/demo1-light/fonts/Flaticon.svg` |
| 279 | `duruthemes.com/demo/html/cappa/demo1-light/img/spa/2.jpg` |
| 261 | `duruthemes.com/demo/html/cappa/demo1-light/img/slider/2.jpg` |
| 231 | `duruthemes.com/demo/html/cappa/demo1-light/img/slider/1.jpg` |
| 229 | `duruthemes.com/demo/html/cappa/demo1-light/fonts/themify.svg` |
| 225 | `duruthemes.com/demo/html/cappa/demo1-light/img/slider/4.jpg` |
| 197 | `duruthemes.com/demo/html/cappa/demo1-light/img/news/6.jpg` |
| 197 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/6.jpg` |
| 194 | `duruthemes.com/demo/html/cappa/demo1-light/img/news/3.jpg` |
| 194 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/10.jpg` |
| 186 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/1.jpg` |
| 174 | `duruthemes.com/demo/html/cappa/demo1-light/img/news/4.jpg` |
| 173 | `duruthemes.com/demo/html/cappa/demo1-light/img/news/5.jpg` |
| 170 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/9.jpg` |
| 167 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/3.jpg` |
| 167 | `duruthemes.com/demo/html/cappa/demo1-light/img/rooms/2.jpg` |

## Peso por tipo de archivo

| ext | archivos | KB | % |
|---|---|---|---|
| .jpg | 38 | 6749 | 36 % |
| .ttf | 9 | 5822 | 31 % |
| .woff2 | 8 | 2123 | 11 % |
| .html | 41 | 1376 | 7 % |
| .css | 14 | 937 | 5 % |
| .js | 19 | 604 | 3 % |
| .svg | 2 | 508 | 3 % |
| .eot | 4 | 233 | 1 % |
| .png | 10 | 119 | 1 % |
| .woff | 2 | 79 | 0 % |
| .gif | 2 | 5 | 0 % |
| .txt | 1 | 3 | 0 % |
