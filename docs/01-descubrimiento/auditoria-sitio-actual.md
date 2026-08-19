# Auditoría técnica del sitio actual — azucarhotel.com

> **Fecha:** 2026-08-19 · **Fase:** Sprint 0, historia 0.5
> **Método:** análisis automatizado (`scripts/audit-mirror.mjs`) sobre la captura HTTrack
> versionada en `investigacion/mirrors/azucarhotel`.
> **Reproducible:** mismo mirror, mismo resultado. Informe crudo en
> [`informe.md`](../../investigacion/mirrors/azucarhotel/informe.md), datos en `datos.json`.
> **Integridad de la captura:** `mirror complete in 6 minutes 41 seconds · 434 links scanned ·
> 405 files written · 3 errors`. Los 3 errores corresponden al stub `^/` de enlaces fuera de
> filtro: esperado. **La captura es válida.**

---

## 0. Retrato del sitio

| Dato | Valor |
|---|---|
| Plataforma | WordPress con tema **Divi** + tema hijo `Divi-child` |
| Plugins detectados | Contact Form 7 (+2 complementos suyos) |
| Páginas de contenido reales | **26** (12 ES + 12 EN + 2 artefactos) |
| Peso total | 20.7 MB |
| Imágenes | 251 · 12.4 MB · **244 en WebP** |
| Formularios | 24 |
| Bloques JSON-LD | 22 |

**Estructura, ya emparejada ES/EN:** inicio · nosotros · habitaciones · servicios ·
amenidades y facilidades · reservaciones · autorización de pago con TDC · contacto ·
preguntas frecuentes · políticas · política de privacidad.

> El sitio está **mejor construido de lo que anticipamos**. Hay tema hijo (o sea, alguien
> hizo las cosas bien y las personalizaciones sobreviven a una actualización), paridad ES/EN
> completa y fotografía moderna. Conviene decirlo: una auditoría que sólo encuentra
> defectos no es rigurosa, es tendenciosa.

---

## 1. 🚨 Hallazgo crítico — captura de datos de tarjeta en un formulario propio

Las páginas `/autorizacion-de-pago-con-tdc/` y `/en/cc-payment-authorization/` contienen un
formulario de **Contact Form 7** que captura:

| Campo | Dato | Clasificación PCI-DSS |
|---|---|---|
| `numero_tarjeta` | Número completo de tarjeta | **PAN** — dato de titular |
| `codigo_cvc` | Código de seguridad | 🚨 **CVV2/CVC2 — dato sensible de autenticación** |
| `exp_tarjeta_1` / `exp_tarjeta_2` | Fecha de expiración | Dato de titular |
| `nombre_tarjeta`, `tipo_tarjeta`, `total` | Titular, marca, monto | Dato de titular |
| más domicilio de facturación completo | Calle, número, CP, colonia, ciudad, país | Datos personales |

### Por qué esto es grave, y no es una opinión de estilo

1. **El CVV no se puede almacenar jamás.** PCI-DSS requisito **3.3.1**: los datos sensibles
   de autenticación —CVV2/CVC2 incluido— **no pueden retenerse después de la autorización**,
   ni siquiera cifrados. Contact Form 7 envía cada respuesta **por correo electrónico**, y
   según su configuración también la guarda en la base de datos de WordPress. El correo
   viaja y reposa en buzones sin cifrado de extremo a extremo.
2. **El PAN no puede transmitirse en claro.** Requisito **4.2.1**: prohíbe enviar números de
   tarjeta sin protección por canales de mensajería de usuario final. El correo lo es.
3. **WordPress + Contact Form 7 no es un entorno certificable.** No existe cuestionario de
   autoevaluación (SAQ) que ampare esta configuración. El comercio queda fuera de
   cumplimiento por completo.
4. **En México suma la LFPDPPP.** Los datos financieros son *datos personales patrimoniales*
   y exigen **consentimiento expreso** y medidas de seguridad reforzadas. Una vulneración es
   notificable y sancionable.

### Exposición real del hotel

- Multas de las marcas de tarjeta, que se cobran al banco adquirente y este las traslada al comercio.
- **Pérdida de la afiliación bancaria**, es decir, dejar de poder cobrar con tarjeta.
- Responsabilidad por fraude en cada transacción disputada.
- Los buzones del hotel contienen hoy, probablemente, **un histórico de tarjetas completas
  con su CVV**. Ese archivo es el activo más apetecible que puede tener un hotel pequeño.

### Recomendación — acción inmediata, antes y con independencia del rediseño

1. **Despublicar hoy** ambas páginas. No esperar al sitio nuevo.
2. Sustituirlas por **enlace de pago** de una pasarela (Stripe, Mercado Pago, Clip, Conekta).
   El huésped teclea su tarjeta **en el entorno del proveedor**, nunca en el nuestro.
3. **Purgar el histórico**: correos recibidos, respaldos y, si aplica, la tabla de CF7 en la
   base de datos.
4. Si el hotel necesita garantía de reserva, la figura correcta es la **preautorización de
   la pasarela**, no un formulario que recolecta el plástico.

> ✅ **Esto valida el ADR-0003 por una vía que no habíamos previsto.** Decidimos el enlace de
> pago para *reducir alcance PCI-DSS* del sitio nuevo. Resulta que además **corrige una
> exposición que ya existe**. No es una mejora: es la remediación de un pasivo activo.
>
> 🔗 **Y probablemente explica la queja de "me cobraron más de lo publicado"**: el cobro se
> ejecuta a mano desde un formulario con el monto tecleado por una persona, sin cotización
> desglosada previa. Un monto capturado a mano es un monto que se puede escribir mal.

---

## 2. Hallazgos por severidad

### 🔴 Altos

| # | Hallazgo | Consecuencia |
|---|---|---|
| A-1 | **schema.org genérico**: hay JSON-LD (`WebPage`, `BreadcrumbList`, `WebSite`, `ImageObject`) pero **ningún tipo hotelero** — sin `Hotel`, `LodgingBusiness`, `HotelRoom`, `Offer` ni `AggregateRating` | Google no puede mostrar precio, estrellas ni disponibilidad en resultados. El hotel compite en Google **sin** los adornos que sí traen las OTAs |
| A-2 | **468 `<img>` sin atributo `alt`** | Falla WCAG 1.1.1. Invisible para lectores de pantalla y desperdicia la señal de SEO de imagen — grave en un negocio que se vende con fotos |
| A-3 | **4 páginas sin `hreflang`** pese a existir versión EN | Google no relaciona las versiones ES y EN: se canibalizan entre sí en resultados |
| A-4 | 4 páginas sin `meta viewport` | No responsivas. Más del 60 % del tráfico hotelero es móvil |
| A-5 | 3 páginas sin atributo `lang` en `<html>` | Falla WCAG 3.1.1: el lector de pantalla no sabe en qué idioma leer |
| A-6 | 1 página sin `<title>` y un `<title>` duplicado (`Azucar Hotel Tulum` ×2) | Página sin identidad en resultados de búsqueda |

### 🟡 Medios

| # | Hallazgo | Consecuencia |
|---|---|---|
| M-1 | **24 de 26 páginas sin `meta description`** | Google inventa el fragmento. Se pierde el control del mensaje justo en el momento del clic |
| M-2 | 23 páginas sin exactamente un `<h1>` | Jerarquía semántica rota |
| M-3 | 20 páginas con salto de jerarquía de encabezados (ej. `h1 → h4`) | Falla WCAG 1.3.1: rompe la navegación por encabezados del lector de pantalla |
| M-4 | 24 `<img>` sin `width`/`height` | Provoca **CLS**: el contenido salta mientras carga |
| M-5 | **API REST de WordPress abierta** (44 respuestas capturadas en `/wp-json/`) | Expone estructura, contenido y potencialmente usuarios. El propio formulario de tarjeta es legible por ahí |
| M-6 | Desequilibrio ES/EN: 14 páginas ES vs 12 EN | Contenido sin traducir |

### ℹ️ Observaciones

- La home en inglés vive en `/en/home/` en lugar de `/en/`. Es una URL peor: más larga,
  menos memorable y desalineada con la de español.
- Sólo dos dominios externos referenciados: `fonts.googleapis.com` (44 veces) y `goo.gl`.
  **No se detectó Google Analytics ni Tag Manager en el marcado capturado** → confirma que
  hoy no hay analítica, y por tanto **no hay línea base**. Es exactamente lo previsto en el
  sprint 1.
- Los 10 enlaces a `goo.gl`: el acortador **fue discontinuado por Google**. Conviene
  verificar si aún resuelven.

---

## 3. Lo que salió bien (y corrige una hipótesis nuestra)

| Hallazgo | Lectura |
|---|---|
| **244 de 251 imágenes en WebP** | Formato moderno. Alguien ya hizo este trabajo |
| **La imagen más pesada son 195 KB** | Bien dimensionadas. No hay ningún JPEG de 4 MB, que es lo habitual |
| **Fotografía subida en 2025** | Reciente |
| Paridad ES/EN completa página por página | La estructura bilingüe está bien planteada |
| Tema hijo `Divi-child` | Las personalizaciones sobreviven a las actualizaciones |

> ⚠️ **Corrección explícita de una hipótesis previa.** En `hallazgos-preliminares.md`
> planteamos que la fotografía podía estar vieja o mal comprimida, y en el brief incluimos
> la recomendación de considerar una sesión nueva. **El mirror la desmiente**: el material es
> de 2025, está en WebP y bien dimensionado. La recomendación de sesión fotográfica se
> **retira** salvo que la revisión visual del contenido diga otra cosa — eso lo valora
> Abraham, no este análisis técnico.
>
> *Para eso sirve auditar antes de opinar: la hipótesis razonable resultó falsa, y el dato
> la corrigió antes de que llegara al cliente como una recomendación de gasto innecesaria.*

---

## 4. Inventario de alojamiento confirmado — 8 tipos

Extraído del selector del formulario de reservación. **Responde la pregunta C1 del brief
sin necesidad de preguntarla:**

| # | Tipo | Descripción publicada |
|---|---|---|
| 1 | **Suite Mar** | Jacuzzi privado. Vista frontal al mar y a la alberca infinita |
| 2 | **Suite Cielo** | Vista frontal al mar y a la alberca infinita. Jacuzzi privado en roof top |
| 3 | **Suite Agua** | Jacuzzi privado. Vista al mar y a otras áreas del hotel |
| 4 | **Suite Aire** | Vista panorámica al mar y a la alberca infinita. Jacuzzi privado en roof top |
| 5 | Habitación Doble | Vistas parciales al mar y/o al jardín |
| 6 | Habitación King | Vistas parciales al mar y/o al jardín |
| 7 | Habitación King | Vistas a la selva y a la calle de la zona hotelera |
| 8 | Habitación Doble | Vistas a la avenida principal de la zona hotelera y a la selva |

**Se confirma la hipótesis: 8 tipos.** Y se confirma también la preocupación comercial —
las cuatro suites se distinguen bien entre sí, pero los tipos 5 a 8 son **dos pares casi
idénticos** que sólo cambian en la vista. Para el huésped que elige en treinta segundos,
"Habitación King con vistas parciales al mar" y "Habitación King con vistas a la selva" son
la misma decisión tomada dos veces.

**Propuesta para el sitio nuevo:** conservar las cuatro suites con nombre propio —son el
producto premium y su naming ya es bueno— y agrupar las cuatro habitaciones en dos
categorías (*Doble* y *King*) con la vista como **atributo seleccionable**, no como tipo
distinto. Menos fricción sin perder ni una unidad de inventario. Decide el cliente.

---

## 5. Mapa de URLs — insumo de las redirecciones 301

La captura reveló **20 redirecciones ya vigentes** del esquema antiguo `?p=<id>` a URLs
legibles. El mapa completo está en el informe generado. Se conserva porque:

1. Confirma que hubo una migración anterior y **esas 301 siguen recibiendo tráfico**.
2. El sitio nuevo debe preservar **ambas capas**: las URLs actuales y estas antiguas.
   Romper una cadena de redirección que ya funciona es perder posicionamiento acumulado
   desde 2008.

> **Sólo se puede construir mientras exista el mirror.** Después del relanzamiento, el sitio
> viejo ya no está para consultarlo. Por eso la historia 0.6 vive en el sprint 0 y no en el 5.

---

## 6. Consecuencias para el plan

| Hallazgo | Efecto |
|---|---|
| 🚨 Formulario de tarjeta | **Acción inmediata fuera del plan de sprints.** No espera al rediseño |
| schema.org sin tipos hoteleros | Refuerza la historia 2.4. Sube a prioridad alta: es ventaja competitiva directa contra las OTAs |
| Sin analítica | Confirma la historia 1.7. Sin línea base no hay forma de demostrar mejora |
| Fotografía correcta | **Se retira** la recomendación de sesión fotográfica. Riesgo R-03 baja de alto a bajo |
| 8 tipos confirmados con nombres | La pregunta C1 del brief pasa de "llenar tabla" a "confirmar y completar datos" |
| Paridad ES/EN existente | El alcance de i18n está acotado y es predecible |
| API REST abierta | Se endurece en el sitio nuevo por construcción: Astro estático no expone API |

---

## 7. Pendiente

Las capturas de **ResNexus** (`propuestaAnterior`) y **Cappa** (`plantillaBase`) no llegaron
al repositorio: sólo se publicó `azucarhotel`. Las historias 0.7 —análisis de la plantilla—
y el análisis competitivo siguen bloqueados hasta que se ingieran.
