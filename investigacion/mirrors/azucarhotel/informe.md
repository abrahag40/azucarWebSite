# Auditoría técnica — `azucarhotel`

> Generado por `scripts/audit-mirror.mjs` sobre la captura HTTrack.
> Reproducible: mismo mirror, mismo resultado.

## Resumen

| Métrica | Valor |
|---|---|
| Páginas HTML reales | 26 |
| Stubs de redirección (excluidos) | 20 |
| Páginas en español | 14 |
| Páginas en inglés | 12 |
| Archivos totales | 430 |
| Peso total | 20690 KB |
| Imágenes | 251 · 12406 KB (60 % del peso) |
| Formularios | 24 |
| Bloques schema.org | 22 |

## Hallazgos

|  | Tema | Hallazgo |
|---|---|---|
| 🚨 | PCI-DSS / Seguridad | `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` captura datos de tarjeta en un formulario propio: PAN (numero_tarjeta) · **CVV (codigo_cvc)** · expiración (exp_tarjeta_1, exp_tarjeta_2). Destino: `https://azucarhotel.com/autorizacion-de-pago-con-tdc/#wpcf7-f2822-p928-o1` |
| 🚨 | PCI-DSS / Seguridad | `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` captura datos de tarjeta en un formulario propio: PAN (numero_tarjeta) · **CVV (codigo_cvc)** · expiración (exp_tarjeta_1, exp_tarjeta_2). Destino: `https://azucarhotel.com/autorizacion-de-pago-con-tdc/#wpcf7-f585-p928-o2` |
| 🚨 | PCI-DSS / Seguridad | `azucarhotel.com/en/cc-payment-authorization/index.html` captura datos de tarjeta en un formulario propio: PAN (numero_tarjeta) · **CVV (codigo_cvc)** · expiración (exp_tarjeta_1, exp_tarjeta_2). Destino: `https://azucarhotel.com/en/cc-payment-authorization/#wpcf7-f585-p606-o1` |
| 🚨 | PCI-DSS / Seguridad | `azucarhotel.com/en/cc-payment-authorization/index.html` captura datos de tarjeta en un formulario propio: PAN (numero_tarjeta) · **CVV (codigo_cvc)** · expiración (exp_tarjeta_1, exp_tarjeta_2). Destino: `https://azucarhotel.com/en/cc-payment-authorization/#wpcf7-f585-p606-o2` |
| 🔴 | SEO | 1 página(s) sin <title> |
| 🔴 | i18n | 4 página(s) sin hreflang pese a existir versión EN |
| 🔴 | Móvil | 4 página(s) sin meta viewport → no responsivo |
| 🔴 | A11y | 468 <img> sin atributo alt (WCAG 1.1.1) |
| 🔴 | SEO | schema.org presente pero **genérico** (WebPage, ReadAction, ImageObject, BreadcrumbList, ListItem, WebSite): sin Hotel, LodgingBusiness, HotelRoom, Offer ni AggregateRating. Google no puede mostrar precio, disponibilidad ni estrellas en resultados |
| 🔴 | A11y | 3 página(s) sin atributo lang en <html> (WCAG 3.1.1) |
| 🟡 | Seguridad | API REST de WordPress accesible sin autenticación (67 respuestas capturadas en `/wp-json/`) — expone estructura, contenido y usuarios |
| 🟡 | SEO | 24 de 26 páginas sin meta description |
| 🟡 | SEO/A11y | 23 página(s) sin exactamente un <h1> |
| 🟡 | SEO | 4 página(s) sin canonical |
| 🟡 | Rendimiento | 24 <img> sin width/height → provoca CLS |
| 🟡 | i18n | Desequilibrio ES/EN: 14 páginas ES vs 12 EN — hay contenido sin traducir |
| 🟡 | A11y | 20 página(s) con salto en la jerarquía de encabezados (ej. h1 → h4 en `azucarhotel.com/amenidades-y-facilidades/index.html`) — rompe la navegación por lector de pantalla (WCAG 1.3.1) |
| ℹ️ | i18n | 1 <title> que coincide(n) entre la version ES y la EN: "Azucar Hotel Tulum" x2. No es duplicado real —hreflang los declara alternativos— pero conviene revisar si falta traducir |
| ℹ️ | Captura | 20 stub(s) de redirección de HTTrack excluidos del análisis · el mapa de destinos alimenta las 301 del relanzamiento |
| ℹ️ | Stack | WordPress detectado · temas: Divi, Divi-child · 3 plugins |
| ℹ️ | SEO | 2 <title> de más de 60 caracteres: Google los trunca en resultados |

## Huella tecnológica

| Señal | Detectado |
|---|---|
| WordPress | sí |
| Tema(s) | Divi, Divi-child |
| Plugins | contact-form-7, jquery-validation-for-contact-form-7, telephone-input-for-contact-form-7 |
| jQuery | sí |
| meta generator | WordPress 7.0.4 |

## Dominios externos referenciados

| Dominio | Referencias | Contexto |
|---|---|---|
| `fonts.googleapis.com` | 44 | link |
| `goo.gl` | 10 | enlace |

## Enlaces de reserva

| Página | Destino | Texto |
|---|---|---|
| `azucarhotel.com/amenidades-y-facilidades/index.html` | `#` | Reservaciones |
| `azucarhotel.com/amenidades-y-facilidades/index.html` | `../reservaciones/index.html` | Solicitud de Cotización |
| `azucarhotel.com/amenidades-y-facilidades/index.html` | `../autorizacion-de-pago-con-tdc/index.html` | Formulario de Autorización de Reservación con Cargo a Tarjet |
| `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` | `#` | Reservaciones |
| `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` | `../reservaciones/index.html` | Solicitud de Cotización |
| `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` | `index.html` | Formulario de Autorización de Reservación con Cargo a Tarjet |
| `azucarhotel.com/contacto/index.html` | `#` | Reservaciones |
| `azucarhotel.com/contacto/index.html` | `../reservaciones/index.html` | Solicitud de Cotización |
| `azucarhotel.com/contacto/index.html` | `../autorizacion-de-pago-con-tdc/index.html` | Formulario de Autorización de Reservación con Cargo a Tarjet |
| `azucarhotel.com/en/about-us/index.html` | `#` | Reservations |
| `azucarhotel.com/en/about-us/index.html` | `../reservations/index.html` | Request Rates |
| `azucarhotel.com/en/about-us/index.html` | `../cc-payment-authorization/index.html` | Credit Card Reservation Authorization Form |
| `azucarhotel.com/en/amenities-facilities/index.html` | `#` | Reservations |
| `azucarhotel.com/en/amenities-facilities/index.html` | `../reservations/index.html` | Request Rates |
| `azucarhotel.com/en/amenities-facilities/index.html` | `../cc-payment-authorization/index.html` | Credit Card Reservation Authorization Form |
| `azucarhotel.com/en/cc-payment-authorization/index.html` | `#` | Reservations |
| `azucarhotel.com/en/cc-payment-authorization/index.html` | `../reservations/index.html` | Request Rates |
| `azucarhotel.com/en/cc-payment-authorization/index.html` | `index.html` | Credit Card Reservation Authorization Form |
| `azucarhotel.com/en/contact/index.html` | `#` | Reservations |
| `azucarhotel.com/en/contact/index.html` | `../reservations/index.html` | Request Rates |
| `azucarhotel.com/en/contact/index.html` | `../cc-payment-authorization/index.html` | Credit Card Reservation Authorization Form |
| `azucarhotel.com/en/frequent-questions/index.html` | `#` | Reservations |
| `azucarhotel.com/en/frequent-questions/index.html` | `../reservations/index.html` | Request Rates |
| `azucarhotel.com/en/frequent-questions/index.html` | `../cc-payment-authorization/index.html` | Credit Card Reservation Authorization Form |
| `azucarhotel.com/en/home/index.html` | `#` | Reservations |

## Formularios

| Página | Método | Destino | Campos | &lt;label&gt; |
|---|---|---|---|---|
| `azucarhotel.com/amenidades-y-facilidades/index.html` | POST | `https://azucarhotel.com/amenidades-y-facilidades/#` | 24 | 18 |
| `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` | POST | `https://azucarhotel.com/autorizacion-de-pago-con-t` | 28 | 21 |
| `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` | POST | `https://azucarhotel.com/autorizacion-de-pago-con-t` | 28 | 21 |
| `azucarhotel.com/contacto/index.html` | POST | `https://azucarhotel.com/contacto/#wpcf7-f2821-p958` | 24 | 18 |
| `azucarhotel.com/en/about-us/index.html` | POST | `https://azucarhotel.com/en/about-us/#wpcf7-f9-p505` | 24 | 18 |
| `azucarhotel.com/en/amenities-facilities/index.html` | POST | `https://azucarhotel.com/en/amenities-facilities/#w` | 24 | 18 |
| `azucarhotel.com/en/cc-payment-authorization/index.html` | POST | `https://azucarhotel.com/en/cc-payment-authorizatio` | 28 | 21 |
| `azucarhotel.com/en/cc-payment-authorization/index.html` | POST | `https://azucarhotel.com/en/cc-payment-authorizatio` | 28 | 21 |
| `azucarhotel.com/en/contact/index.html` | POST | `https://azucarhotel.com/en/contact/#wpcf7-f9-p423-` | 24 | 18 |
| `azucarhotel.com/en/frequent-questions/index.html` | POST | `https://azucarhotel.com/en/frequent-questions/#wpc` | 24 | 18 |
| `azucarhotel.com/en/home/index.html` | POST | `https://azucarhotel.com/en/home/#wpcf7-f9-p333-o1` | 24 | 18 |
| `azucarhotel.com/en/policies/index.html` | POST | `https://azucarhotel.com/en/policies/#wpcf7-f9-p243` | 24 | 18 |
| `azucarhotel.com/en/reservations/index.html` | POST | `https://azucarhotel.com/en/reservations/#wpcf7-f9-` | 24 | 18 |
| `azucarhotel.com/en/reservations/index.html` | POST | `https://azucarhotel.com/en/reservations/#wpcf7-f9-` | 24 | 18 |
| `azucarhotel.com/en/rooms/index.html` | POST | `https://azucarhotel.com/en/rooms/#wpcf7-f9-p445-o1` | 24 | 18 |
| `azucarhotel.com/en/services/index.html` | POST | `https://azucarhotel.com/en/services/#wpcf7-f9-p730` | 24 | 18 |
| `azucarhotel.com/habitaciones/index.html` | POST | `https://azucarhotel.com/habitaciones/#wpcf7-f2821-` | 24 | 18 |
| `azucarhotel.com/index.html` | POST | `https://azucarhotel.com/#wpcf7-f2821-p843-o1` | 24 | 18 |
| `azucarhotel.com/nosotros/index.html` | POST | `https://azucarhotel.com/nosotros/#wpcf7-f2821-p106` | 24 | 18 |
| `azucarhotel.com/politicas/index.html` | POST | `https://azucarhotel.com/politicas/#wpcf7-f2821-p24` | 24 | 18 |
| `azucarhotel.com/preguntas-frecuentes/index.html` | POST | `https://azucarhotel.com/preguntas-frecuentes/#wpcf` | 24 | 18 |
| `azucarhotel.com/reservaciones/index.html` | POST | `https://azucarhotel.com/reservaciones/#wpcf7-f2821` | 24 | 18 |
| `azucarhotel.com/reservaciones/index.html` | POST | `https://azucarhotel.com/reservaciones/#wpcf7-f9-p8` | 24 | 18 |
| `azucarhotel.com/servicios/index.html` | POST | `https://azucarhotel.com/servicios/#wpcf7-f2821-p93` | 24 | 18 |

## Mapa de redirecciones detectadas (insumo de las 301)

| Origen (stub) | Destino |
|---|---|
| `azucarhotel.com/index0ced.html` | `en/reservations/index.html` |
| `azucarhotel.com/index0ecd.html` | `en/rooms/index.html` |
| `azucarhotel.com/index1ce2.html` | `nosotros/index.html` |
| `azucarhotel.com/index1dd2.html` | `contacto/index.html` |
| `azucarhotel.com/index227a.html` | `preguntas-frecuentes/index.html` |
| `azucarhotel.com/index3dfa.html` | `politicas/index.html` |
| `azucarhotel.com/index4b26.html` | `politica-de-privacidad/index.html` |
| `azucarhotel.com/index4e8a.html` | `en/amenities-facilities/index.html` |
| `azucarhotel.com/index5aa6.html` | `en/privacy-policy/index.html` |
| `azucarhotel.com/index5e02.html` | `en/frequent-questions/index.html` |
| `azucarhotel.com/index771f.html` | `amenidades-y-facilidades/index.html` |
| `azucarhotel.com/index7c89.html` | `en/services/index.html` |
| `azucarhotel.com/index8791.html` | `en/policies/index.html` |
| `azucarhotel.com/index8eb0.html` | `habitaciones/index.html` |
| `azucarhotel.com/index9b9e.html` | `en/about-us/index.html` |
| `azucarhotel.com/indexb351.html` | `en/contact/index.html` |
| `azucarhotel.com/indexce2e.html` | `en/cc-payment-authorization/index.html` |
| `azucarhotel.com/indexd255.html` | `reservaciones/index.html` |
| `azucarhotel.com/indexefce.html` | `servicios/index.html` |
| `azucarhotel.com/indexf065.html` | `autorizacion-de-pago-con-tdc/index.html` |

## Inventario de páginas

| Ruta | KB | lang | title | desc | h1 | canon | img |
|---|---|---|---|---|---|---|---|
| `azucarhotel.com/amenidades-y-facilidades/index.html` | 166 | es-MX | 45c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/autorizacion-de-pago-con-tdc/index.html` | 169 | es-MX | 93c | ❌ | ❌2 | ✓ | 11 |
| `azucarhotel.com/contacto/index.html` | 164 | es-MX | 29c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/en/about-us/index.html` | 167 | en-US | 23c | ❌ | ❌2 | ✓ | 11 |
| `azucarhotel.com/en/amenities-facilities/index.html` | 163 | en-US | 47c | ❌ | ❌2 | ✓ | 10 |
| `azucarhotel.com/en/cc-payment-authorization/index.html` | 144 | en-US | 63c | ❌ | ❌2 | ✓ | 11 |
| `azucarhotel.com/en/contact/index.html` | 161 | en-US | 31c | ❌ | ❌2 | ✓ | 10 |
| `azucarhotel.com/en/feed/index.html` | 1 | — | 18c | ❌ | ❌0 | ❌ | 0 |
| `azucarhotel.com/en/frequent-questions/index.html` | 159 | en-US | 39c | ❌ | ❌2 | ✓ | 10 |
| `azucarhotel.com/en/home/index.html` | 446 | en-US | 46c | ✓ | ❌2 | ✓ | 127 |
| `azucarhotel.com/en/policies/index.html` | 156 | en-US | 29c | ❌ | ❌2 | ✓ | 10 |
| `azucarhotel.com/en/privacy-policy/index.html` | 124 | en-US | 35c | ❌ | ✓ | ✓ | 10 |
| `azucarhotel.com/en/reservations/index.html` | 151 | en-US | 33c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/en/rooms/index.html` | 439 | en-US | 50c | ❌ | ❌2 | ✓ | 144 |
| `azucarhotel.com/en/services/index.html` | 162 | en-US | 29c | ❌ | ❌2 | ✓ | 10 |
| `azucarhotel.com/feed/index.html` | 1 | — | 18c | ❌ | ❌0 | ❌ | 0 |
| `azucarhotel.com/habitaciones/index.html` | 442 | es-MX | 53c | ❌ | ❌2 | ✓ | 146 |
| `azucarhotel.com/index.html` | 432 | es-MX | 27c | ❌ | ❌2 | ✓ | 129 |
| `azucarhotel.com/nosotros/index.html` | 170 | es-MX | 29c | ❌ | ❌2 | ✓ | 13 |
| `azucarhotel.com/politica-de-privacidad/index.html` | 120 | es-MX | 43c | ❌ | ✓ | ✓ | 10 |
| `azucarhotel.com/politicas/index.html` | 160 | es-MX | 30c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/preguntas-frecuentes/index.html` | 162 | es-MX | 41c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/reservaciones/index.html` | 150 | es-MX | 34c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/servicios/index.html` | 165 | es-MX | 30c | ❌ | ❌2 | ✓ | 12 |
| `azucarhotel.com/wp-json/index.html` | 281 | — | ❌ | ❌ | ❌0 | ❌ | 0 |
| `index.html` | 5 | en | 36c | ✓ | ✓ | ❌ | 0 |

## 25 imágenes más pesadas

| KB | Archivo |
|---|---|
| 195 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_052-1.webp` |
| 172 | `azucarhotel.com/wp-content/uploads/2025/06/6.webp` |
| 170 | `azucarhotel.com/wp-content/plugins/telephone-input-for-contact-form-7/public/img/flags@2x.png` |
| 155 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_021.webp` |
| 148 | `azucarhotel.com/wp-content/uploads/2025/05/15_suite_aire.webp` |
| 147 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_101.webp` |
| 145 | `azucarhotel.com/wp-content/uploads/2025/05/04_suite_cielo.webp` |
| 130 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_031.webp` |
| 129 | `azucarhotel.com/wp-content/uploads/2025/05/03_suite_mar.webp` |
| 123 | `azucarhotel.com/wp-content/uploads/2025/06/9.webp` |
| 123 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_095.webp` |
| 123 | `azucarhotel.com/wp-content/uploads/2025/05/11_suite_cielo.webp` |
| 122 | `azucarhotel.com/wp-content/uploads/2025/05/09_suite_aire.webp` |
| 119 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_016.webp` |
| 119 | `azucarhotel.com/wp-content/uploads/2025/05/16_suite_cielo.webp` |
| 117 | `azucarhotel.com/wp-content/uploads/2025/06/3.webp` |
| 115 | `azucarhotel.com/wp-content/uploads/2025/05/05_suite_cielo.webp` |
| 114 | `azucarhotel.com/wp-content/uploads/2025/05/15_suite_cielo.webp` |
| 113 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_034.webp` |
| 112 | `azucarhotel.com/wp-content/uploads/2025/06/4.webp` |
| 110 | `azucarhotel.com/wp-content/uploads/2025/04/img_azucar_092.webp` |
| 110 | `azucarhotel.com/wp-content/uploads/2025/05/01_suite_cielo.webp` |
| 110 | `azucarhotel.com/wp-content/uploads/2025/06/5.webp` |
| 110 | `azucarhotel.com/wp-content/uploads/2025/06/7.webp` |
| 107 | `azucarhotel.com/wp-content/uploads/2025/05/08_suite_aire.webp` |

## Peso por tipo de archivo

| ext | archivos | KB | % |
|---|---|---|---|
| .webp | 244 | 12146 | 59 % |
| .html | 46 | 4876 | 24 % |
| .mp4 | 1 | 1071 | 5 % |
| .json | 44 | 926 | 4 % |
| .js | 18 | 711 | 3 % |
| .css | 42 | 326 | 2 % |
| .png | 3 | 241 | 1 % |
| .ttf | 1 | 150 | 1 % |
| .eot | 2 | 124 | 1 % |
| (sin-ext) | 22 | 95 | 0 % |
| .gif | 3 | 14 | 0 % |
| .txt | 1 | 5 | 0 % |
| .svg | 1 | 4 | 0 % |
| .php | 2 | 1 | 0 % |
