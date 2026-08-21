# Auditoría técnica — `resnexus`

> Generado por `scripts/audit-mirror.mjs` sobre la captura HTTrack.
> Reproducible: mismo mirror, mismo resultado.

## Resumen

| Métrica | Valor |
|---|---|
| Páginas HTML reales | 13 |
| Stubs de redirección (excluidos) | 0 |
| Páginas en español | 13 |
| Páginas en inglés | 0 |
| Archivos totales | 16 |
| Peso total | 2843 KB |
| Imágenes | 2 · 5 KB (0 % del peso) |
| Formularios | 1 |
| Bloques schema.org | 3 |

## Hallazgos

|  | Tema | Hallazgo |
|---|---|---|
| 🔴 | SEO | 1 <title> duplicado(s): "Azúcar | Hotel Boutique Frente al Mar en la Z" ×2 |
| 🔴 | Móvil | 1 página(s) sin meta viewport → no responsivo |
| 🔴 | SEO | 12 página(s) con meta robots noindex — invisibles para Google |
| 🔴 | Enlaces | 54 enlace(s) interno(s) no resuelven a ningun archivo (14 destino(s) distintos): `/nosotros` · `/habitaciones` · `/politicas` · `/nosotros#Spa` · `/nosotros#Daypass` · `/nosotros#BeachClub` y 8 mas |
| 🟡 | SEO/A11y | 3 página(s) sin exactamente un <h1> |
| 🟡 | SEO | 1 página(s) sin canonical |
| 🟡 | Rendimiento | 40 <img> sin width/height → provoca CLS |
| 🟡 | Rendimiento | 0 de 2 imágenes en formato moderno (WebP/AVIF) |
| 🟡 | A11y | 1 página(s) con salto en la jerarquía de encabezados (ej. h1 → h6 en `index.html`) — rompe la navegación por lector de pantalla (WCAG 1.3.1) |
| ℹ️ | SEO | 2 <title> de más de 60 caracteres: Google los trunca en resultados |

## Huella tecnológica

| Señal | Detectado |
|---|---|
| WordPress | no |
| Tema(s) | — |
| Plugins | — |
| jQuery | no |
| meta generator | — |

## Dominios externos referenciados

| Dominio | Referencias | Contexto |
|---|---|---|
| `irp.cdn-website.com` | 188 | src, link |
| `resnexus.com` | 43 | enlace |
| `static.cdn-website.com` | 37 | src, link |
| `webbuilder.resnexus.com` | 34 | src, link |
| `cdn.userway.org` | 12 | src |
| `13855-azucar-hotel-tulum.resnexuswebsites.com` | 12 | link |
| `wa.me` | 12 | enlace |
| `google.com` | 2 | src, enlace |
| `ms-cdn.multiscreensite.com` | 2 | src |
| `facebook.com` | 1 | enlace |
| `instagram.com` | 1 | enlace |
| `api.whatsapp.com` | 1 | enlace |

## Enlaces de reserva

| Página | Destino | Texto |
|---|---|---|
| `index.html` | `webbuilder.resnexus.com/site/38e233bb/indexf587.html` | webbuilder.resnexus.com/site/38e233bb/indexf587.html |
| `webbuilder.resnexus.com/site/38e233bb/contactof587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Reserva Aqu&iacute; |
| `webbuilder.resnexus.com/site/38e233bb/experienciasf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver Disponibilidad |
| `webbuilder.resnexus.com/site/38e233bb/galeriaf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Reserva Ahora |
| `webbuilder.resnexus.com/site/38e233bb/habitacionesf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver m&aacute;s |
| `webbuilder.resnexus.com/site/38e233bb/indexf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver M&aacute;s |
| `webbuilder.resnexus.com/site/38e233bb/indexf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver M&aacute;s |
| `webbuilder.resnexus.com/site/38e233bb/indexf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver M&aacute;s |
| `webbuilder.resnexus.com/site/38e233bb/indexf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver M&aacute;s |
| `webbuilder.resnexus.com/site/38e233bb/nosotrosf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Reserva Ahora |
| `webbuilder.resnexus.com/site/38e233bb/path=/index.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | RESERVAR |
| `webbuilder.resnexus.com/site/38e233bb/politica-de-privacidadf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | RESERVAR |
| `webbuilder.resnexus.com/site/38e233bb/politicasf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver Disponibilidad |
| `webbuilder.resnexus.com/site/38e233bb/referrer.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | RESERVAR |
| `webbuilder.resnexus.com/site/38e233bb/restaurantef587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | Ver Disponibilidad |
| `webbuilder.resnexus.com/site/38e233bb/terminos-y-condicionesf587.html` | `https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1C` | RESERVAR |

## Formularios

| Página | Método | Destino | Campos | &lt;label&gt; |
|---|---|---|---|---|
| `webbuilder.resnexus.com/site/38e233bb/contactof587.html` | POST | `#` | 20 | 4 |

## Mapa de redirecciones detectadas (insumo de las 301)

_Ninguna._

## Inventario de páginas

| Ruta | KB | lang | title | desc | h1 | canon | img |
|---|---|---|---|---|---|---|---|
| `index.html` | 5 | en | 36c | ✓ | ✓ | ❌ | 0 |
| `webbuilder.resnexus.com/site/38e233bb/contactof587.html` | 296 | es | 29c | ✓ | ✓ | ✓ | 3 |
| `webbuilder.resnexus.com/site/38e233bb/experienciasf587.html` | 199 | es | 50c | ✓ | ✓ | ✓ | 12 |
| `webbuilder.resnexus.com/site/38e233bb/galeriaf587.html` | 217 | es | 37c | ✓ | ✓ | ✓ | 33 |
| `webbuilder.resnexus.com/site/38e233bb/habitacionesf587.html` | 201 | es | 50c | ✓ | ✓ | ✓ | 3 |
| `webbuilder.resnexus.com/site/38e233bb/indexf587.html` | 373 | es | 52c | ✓ | ✓ | ✓ | 12 |
| `webbuilder.resnexus.com/site/38e233bb/nosotrosf587.html` | 285 | es | 44c | ✓ | ✓ | ✓ | 17 |
| `webbuilder.resnexus.com/site/38e233bb/path=/index.html` | 149 | es | 66c | ✓ | ❌0 | ✓ | 1 |
| `webbuilder.resnexus.com/site/38e233bb/politica-de-privacidadf587.html` | 270 | es | 43c | ✓ | ✓ | ✓ | 1 |
| `webbuilder.resnexus.com/site/38e233bb/politicasf587.html` | 191 | es | 40c | ✓ | ❌2 | ✓ | 3 |
| `webbuilder.resnexus.com/site/38e233bb/referrer.html` | 149 | es | 66c | ✓ | ❌0 | ✓ | 1 |
| `webbuilder.resnexus.com/site/38e233bb/restaurantef587.html` | 188 | es | 49c | ✓ | ✓ | ✓ | 5 |
| `webbuilder.resnexus.com/site/38e233bb/terminos-y-condicionesf587.html` | 313 | es | 43c | ✓ | ✓ | ✓ | 1 |

## 25 imágenes más pesadas

| KB | Archivo |
|---|---|
| 4 | `backblue.gif` |
| 1 | `fade.gif` |

## Peso por tipo de archivo

| ext | archivos | KB | % |
|---|---|---|---|
| .html | 13 | 2837 | 100 % |
| .gif | 2 | 5 | 0 % |
| .txt | 1 | 2 | 0 % |
