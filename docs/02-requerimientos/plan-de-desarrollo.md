# Plan de desarrollo — Azúcar Hotel Tulum

> **Alcance de este documento: sólo software.** Fotografía, redacción, licencias y trato con
> el cliente los gestiona Abraham por fuera y los consulta cuando haga falta.
> Marco: [ADR-0002](../decisiones/ADR-0002-marco-de-trabajo-iterativo.md) ·
> Reservas: [ADR-0003](../decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) ·
> Stack: [ADR-0004](../decisiones/ADR-0004-stack-tecnico.md)

**6 sprints × 2 semanas ≈ 12 semanas.** Cada sprint cierra con una **URL de staging** que el
cliente abre en su navegador. Si un sprint no produce eso, no fue un sprint (ADR-0002).

---

## Sprint 0 — Fundación y descubrimiento · 🔄 en curso

| # | Historia | Estado |
|---|---|---|
| 0.1 | Repositorio, memoria de proyecto y estructura documental | ✅ |
| 0.2 | ADR-0001 a ADR-0004 | ✅ |
| 0.3 | Banco de preguntas y brief para el cliente | ✅ |
| 0.4 | Captura HTTrack de los 3 sitios | 🔄 Abraham |
| 0.5 | **Auditoría técnica** del sitio actual sobre el mirror | ⬜ bloqueada por 0.4 |
| 0.6 | **Inventario de contenido** y mapeo de URLs actuales → nuevas | ⬜ bloqueada por 0.4 |
| 0.7 | Análisis de la plantilla Cappa: componentes reutilizables y JS a descartar | ⬜ bloqueada por 0.4 |
| 0.8 | Backlog priorizado con criterios de aceptación | ⬜ |

**Salida del sprint:** informe de auditoría + backlog aprobado.
**No produce software** — es la desviación consciente del ADR-0002.

> ⚠️ **0.6 es la historia que más gente olvida y la más cara de olvidar.** El mapeo de URLs
> viejas → nuevas es lo que alimenta las redirecciones 301 del sprint 5. Sin él, el
> rediseño destruye el posicionamiento acumulado desde 2008. **Sólo se puede construir
> desde el mirror**, porque después del lanzamiento el sitio viejo ya no existe.

---

## Sprint 1 — Cimientos técnicos y sistema de diseño

| # | Historia | Criterio de aceptación |
|---|---|---|
| 1.1 | Proyecto Astro con enrutamiento i18n ES/EN | `/` y `/en/` resuelven; `hreflang` correcto |
| 1.2 | Despliegue continuo a Cloudflare Pages + **vista previa por rama** | Push a rama → URL única de preview |
| 1.3 | *Design tokens* extraídos de Cappa: tipografía, escala modular, paleta, espaciado | Definidos como variables CSS; ningún valor mágico en componentes |
| 1.4 | Componentes base: encabezado y navegación, pie, botones, tipografía, contenedor y rejilla | Navegación **operable por teclado**, foco visible, `<nav>` con landmark |
| 1.5 | Esquema de datos de alojamiento (*content collection* con validación) | Un tipo de habitación inválido **rompe el build**, no llega a producción |
| 1.6 | **Home completa** con contenido real | DoD completa: CWV verdes en móvil, AA, bilingüe |
| 1.7 | Analítica: GA4 + Search Console + medición de origen de tráfico | Eventos verificados llegando |

**Demo:** home navegable en staging, en dos idiomas, con Core Web Vitals medidos en verde.

> **Por qué la analítica va en el sprint 1 y no al final.** El cliente **no tiene datos
> comparativos** (pregunta A2). Sin línea base, en tres meses no podremos demostrar que el
> trabajo sirvió — sólo opinar que se ve mejor. Cada semana sin instrumentar es una semana
> de datos que no existirá jamás. *Cuando el cliente no tiene el dato, el trabajo no es
> exigírselo: es crearlo, y cuanto antes.*

---

## Sprint 2 — Alojamiento

| # | Historia | Criterio de aceptación |
|---|---|---|
| 2.1 | Listado de tipos de alojamiento generado desde datos | Añadir un tipo = editar datos, cero cambios en plantillas |
| 2.2 | Página de detalle por tipo | Capacidad, camas, m², vista, amenidades, galería |
| 2.3 | Galería con visor accesible | Cerrable con `Esc`, foco atrapado, navegable por teclado |
| 2.4 | Datos estructurados `schema.org/Hotel` + `HotelRoom` | Valida sin errores en Rich Results Test |
| 2.5 | Imágenes optimizadas: AVIF/WebP, `srcset`, dimensiones declaradas | CLS = 0 en el listado |

**Demo:** catálogo completo navegable en ambos idiomas.

> Pendiente de la auditoría: si se confirman **8 tipos para 21 unidades**, se propondrá
> agruparlos en 4–5 categorías comerciales. Demasiadas opciones reducen la conversión
> (paradoja de la elección, Iyengar & Lepper 2000). Es recomendación, la decide el cliente.

---

## Sprint 3 — Solicitud de reserva 🔴 el corazón del proyecto

| # | Historia | Criterio de aceptación |
|---|---|---|
| 3.1 | Módulo `booking/` con frontera de reemplazo aislada (ADR-0003) | Ningún otro componente importa su implementación interna |
| 3.2 | Formulario por pasos: fechas → alojamiento → huéspedes → contacto | Funciona **sin JavaScript** como respaldo; validación accesible |
| 3.3 | **Cotización estimada con desglose de impuestos** (IVA, ISH Q. Roo, saneamiento Tulum) | El total mostrado es el total que se cobrará |
| 3.4 | Endpoint serverless: validación en servidor, antispam, registro | Rechaza carga maliciosa; sin `eval`, sin inyección |
| 3.5 | Acuse **inmediato** al huésped: pantalla + correo con resumen y compromiso de tiempo | Llega en < 30 s |
| 3.6 | Notificación al manager por correo **y WhatsApp**, en formato accionable | Contiene todo lo necesario para confirmar sin volver a preguntar |
| 3.7 | WhatsApp como canal paralelo visible en todo el sitio | Botón persistente, mensaje pre-llenado con contexto de la página |
| 3.8 | Aviso de privacidad (LFPDPPP) + casilla de consentimiento | Consentimiento explícito, nunca pre-marcado |

**Demo:** el manager recibe en su teléfono una solicitud real enviada desde el sitio.

> 🔴 **En ninguna parte de la interfaz aparece la palabra "confirmada".** El lenguaje es
> *"Solicitud de reserva — sujeta a confirmación"*. Prometer lo que la operación no puede
> cumplir es exactamente lo que hoy le genera reseñas negativas al cliente (ADR-0003).

---

## Sprint 4 — Resto del sitio

| # | Historia |
|---|---|
| 4.1 | Servicios y amenidades |
| 4.2 | Restaurante y bar |
| 4.3 | Spa y experiencias |
| 4.4 | Galería general |
| 4.5 | **Ubicación y cómo llegar**: mapa, traslado desde aeropuerto, referencias |
| 4.6 | Contacto |
| 4.7 | Políticas y preguntas frecuentes (cancelación, check-in/out, niños, mascotas) |
| 4.8 | Páginas legales: aviso de privacidad y términos |
| 4.9 | 404 útil, `sitemap.xml`, `robots.txt` |

**Demo:** sitio completo navegable ES/EN.

> **4.5 rinde más de lo que parece.** "Cómo llegar a Tulum desde el aeropuerto de Cancún" es
> de las búsquedas más frecuentes del viajero a esta zona, y casi ningún hotel la responde
> bien. Es tráfico calificado que la competencia está regalando.

---

## Sprint 5 — Calidad, rendimiento y lanzamiento

| # | Historia | Criterio de aceptación |
|---|---|---|
| 5.1 | Auditoría de accesibilidad WCAG 2.2 AA | Recorrido completo por teclado y con lector de pantalla; contraste ≥ 4.5:1 |
| 5.2 | Rendimiento medido | LCP < 2.5 s · INP < 200 ms · CLS < 0.1 en **móvil, red 4G** |
| 5.3 | **Redirecciones 301** desde el mapeo del sprint 0 | Toda URL antigua indexada resuelve; cero cadenas de redirección |
| 5.4 | Pruebas en navegadores y dispositivos reales | Chrome, Safari, Firefox · iOS y Android |
| 5.5 | Revisión de seguridad: cabeceras, CSP, endpoint del formulario | Sin secretos en el repositorio |
| 5.6 | **Plan de rollback documentado y probado** | Vuelta al sitio anterior en < 15 min |
| 5.7 | Lanzamiento + monitoreo 72 h | Search Console sin errores de rastreo |
| 5.8 | Traspaso: runbook operativo y capacitación grabada | El manager sabe atender solicitudes y pedir cambios |

**Demo:** sitio en producción.

> **5.6 es innegociable.** El hotel vende 24/7. Un lanzamiento sin vuelta atrás convierte
> cualquier error en pérdida de reservas reales, y no se lanza en temporada alta (A4).

---

## Dependencias externas (fuera del carril de software)

Las gestiona Abraham. Se listan porque **bloquean historias concretas**, y un bloqueo
invisible se explica como retraso al final del sprint:

| Dependencia | Bloquea | Necesaria antes de |
|---|---|---|
| Licencia de Cappa (R-01) | Uso de assets en producción | Sprint 1 |
| Accesos: dominio, hosting, DNS (R-06) | Despliegue y lanzamiento | Sprint 1 (verificar) / Sprint 5 (usar) |
| Accesos a Analytics y Search Console (R-07) | Historia 1.7 | Sprint 1 |
| Fotografía en alta resolución y con derechos (R-03) | Historias 1.6, 2.x, 4.4 | Sprint 1 |
| Textos ES/EN | Todas las páginas | Por sprint |
| Datos de C1–C4: inventario, tarifas, impuestos, políticas | Historias 2.1, 3.3, 4.7 | Sprint 2 |
| Pasarela de pago del cliente | Historia 3.6 | Sprint 3 |
| Compromiso de tiempo de respuesta y responsable (B1, B2) | Historia 3.5 | Sprint 3 |

**Regla operativa:** una historia bloqueada **no entra al sprint** (Definition of Ready).
Se queda en `Bloqueado` con motivo y responsable visibles hasta que se libere.
