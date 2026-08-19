# CLAUDE.md — Proyecto Azúcar Hotel Tulum

> Archivo de memoria persistente del proyecto. Claude lo lee automáticamente al
> inicio de cada sesión. **Todo lo que deba sobrevivir al cierre de una sesión
> vive aquí o en `docs/`.**

---

## 1. Contexto del proyecto

| Campo | Valor |
|---|---|
| **Cliente** | Azúcar Hotel Tulum |
| **Ubicación** | Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, MX |
| **Sitio actual** | https://azucarhotel.com/ |
| **Naturaleza** | Hotel boutique frente a playa. Fundado abril 2008. ~21 habitaciones / 8 tipos de alojamiento (a validar) |
| **Encargo** | Rediseño y renovación del sitio web |
| **Repositorio** | `abrahag40/azucarWebSite` |
| **Rama de trabajo** | `claude/hotel-tulum-web-audit-0yly29` |

### Datos confirmados por el cliente (2026-08-19)

| Hecho | Consecuencia de proyecto |
|---|---|
| **No opera ningún PMS.** Gestión manual | No hay fuente de verdad de disponibilidad |
| **No usa channel manager.** El manager actualiza cada OTA a mano | Confirmación instantánea = sobreventa garantizada |
| **Quiere que el huésped reserve desde el sitio** | Se resuelve como **solicitud de reserva**, no confirmación instantánea → [ADR-0003](docs/decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) |
| Acepta que por ahora sea manual; revisar a futuro | Arquitectura con frontera de reemplazo aislada |
| **No tiene datos comparativos** de OTA vs. directo ni de comisiones | No hay línea base → instrumentar analítica es entregable del **sprint 1** |
| **El contenido lo gestiona Abraham**, no el hotel | No se requiere CMS → habilita stack estático ([ADR-0004](docs/decisiones/ADR-0004-stack-tecnico.md)) |
| Puede responder el desglose de impuestos (C3) | Cotización con total real: ataca la queja de "me cobraron más" |
| **Precio y modelo contractual: cerrados fuera de este repo** | No se discuten aquí |

### Alcance de Claude en este proyecto

**Sólo software.** Fotografía, redacción, licencias, contratos y trato con el cliente los
gestiona Abraham por fuera y los consulta cuando haga falta. Aparecen en la documentación
únicamente como **dependencias que bloquean historias**, nunca como tareas nuestras.

### Insumos entregados por el cliente / contexto

1. **Sitio actual**: https://azucarhotel.com/ — *base de partida, NO fuente de verdad absoluta*.
2. **Propuesta de otra agencia (no concretada)**: https://webbuilder.resnexus.com/site/38e233bb/?preview=true
   — construida sobre ResNexus (PMS + motor de reservas + website builder). Analizar como
   inteligencia competitiva y como señal de qué tecnología ya evaluó el cliente.
3. **Plantilla base acordada (punto de inflexión)**: https://duruthemes.com/demo/html/cappa/demo1-light/index11.html
   — se capturará con HTTrack y se adaptará al rediseño.

---

## 2. Roles y forma de trabajo

- **Claude** actúa como **líder de proyecto / arquitecto**: propone el orden correcto de
  las fases, justifica cada decisión con fundamento de industria y ejecuta.
- **Abraham** es el responsable del proyecto y el interlocutor con el cliente. Es también
  quien ejecuta las tareas que requieren la máquina local (HTTrack, Burp, Wireshark) y
  quien tiene contacto directo con el cliente.

### Contrato de aprendizaje (obligatorio, no negociable)

Este proyecto es también un vehículo de formación profesional para Abraham. Por lo tanto:

1. **Nunca entregar una decisión sin su porqué.** Cada recomendación se acompaña de la
   razón y, cuando existe, de la fuente o el estándar de industria que la respalda
   (BABOK, Nielsen Norman Group, Google Web Vitals, WCAG, 12-Factor, ADR, etc.).
2. **Nombrar la técnica.** Si se aplica una práctica con nombre propio
   (*document analysis*, *straw-man document*, *content inventory*, *ADR*), se dice cómo
   se llama para que sea buscable y repetible.
3. **Señalar el antipatrón evitado.** Explicar qué habría pasado si se hacía de la forma
   intuitiva pero incorrecta. El contraste es lo que fija el aprendizaje.
4. **Registrar en la bitácora.** Toda lección se acumula en
   `docs/decisiones/bitacora-aprendizaje.md` — no se pierde al cerrar sesión.
5. **Ajustar el nivel de ceremonia.** Esto es un sitio web de un hotel boutique, no un ERP.
   Cuando un estándar sea desproporcionado, se dice explícitamente qué se omite y por qué
   omitirlo es la decisión correcta aquí. *Rigor sí, burocracia no.*

---

## 3. Metodología acordada

Fases secuenciales con entregable verificable cada una. No se avanza a la siguiente
sin cerrar la anterior.

| # | Fase | Entregable | Estado |
|---|---|---|---|
| 0 | Fundación del proyecto | Repo, CLAUDE.md, estructura `docs/`, ADR-0001 | ✅ |
| 1 | Descubrimiento / auditoría | Auditoría técnica y de contenido del sitio actual + propuesta ResNexus + plantilla | 🔄 Sitio actual ✅ · faltan ResNexus y Cappa |
| 2 | Levantamiento de requerimientos | Brief pre-llenado + entrevista + backlog priorizado | 🔄 Banco de preguntas listo |
| 3 | Arquitectura de información | Sitemap, wireframes, mapa de contenido | ⬜ |
| 4 | Diseño / adaptación de plantilla | Design system sobre Cappa | ⬜ |
| 5 | Implementación | Sitio | ⬜ |
| 6 | QA, performance, SEO, accesibilidad | Checklist de salida | ⬜ |
| 7 | Despliegue y traspaso | Runbook + capacitación | ⬜ |

---

## 4. Restricciones técnicas del entorno (importante)

**La sesión remota de Claude tiene el egreso de red bloqueado por política.** Verificado:
`azucarhotel.com`, `duruthemes.com`, `webbuilder.resnexus.com` y `tripadvisor.com`
devuelven `EGRESS_BLOCKED`. Consecuencias operativas:

- ❌ Claude **no puede** hacer `curl`/`WebFetch` directo a los sitios objetivo.
- ✅ Claude **sí puede** usar búsqueda web indexada (OTAs, agregadores, reseñas).
- ✅ **La captura la ejecuta Abraham en local con HTTrack** y versiona el resultado en el
  repo. A partir de ahí Claude analiza el HTML/CSS/JS **offline**, que es de hecho la
  forma correcta: el análisis se hace sobre un artefacto congelado y reproducible, no
  sobre un sitio vivo que cambia bajo nuestros pies.

Runbook de captura: `docs/01-descubrimiento/runbook-captura-httrack.md`

---

## 5. Decisiones técnicas vigentes

| Tema | Decisión | ADR |
|---|---|---|
| **Reservas** | Solicitud de reserva sujeta a confirmación. **Sin calendario de disponibilidad.** Cotización con impuestos desglosados. Notificación al manager por correo + WhatsApp. Aislado en módulo `booking/` para migrar a motor SaaS sin reescribir | [0003](docs/decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) |
| **Stack** | **Astro** estático, i18n ES/EN nativo, *content collections* para alojamiento, despliegue en Cloudflare Pages con preview por rama, formulario contra función serverless | [0004](docs/decisiones/ADR-0004-stack-tecnico.md) |
| **Plantilla Cappa** | Fuente de **diseño**, no de código. Se extraen tokens y se reconstruyen componentes con HTML semántico y accesible. Se descarta su JS no utilizado | [0004](docs/decisiones/ADR-0004-stack-tecnico.md) |
| **Pagos** | Enlace de pago enviado por el hotel. **No tocamos datos de tarjeta → fuera de alcance PCI-DSS** | [0003](docs/decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) |

### Reglas que no se rompen

1. **Nunca decir "reserva confirmada"** en la interfaz. Siempre *"solicitud sujeta a confirmación"*.
2. **Nunca mostrar disponibilidad** que no podemos respaldar. Falsa disponibilidad es peor que ninguna.
3. **El total cotizado incluye impuestos.** Es la diferencia frente a las OTAs y la cura de la queja recurrente.
4. **Accesibilidad y Core Web Vitals van en la DoD de cada historia**, jamás en una fase final.
5. **El contenido se modela como datos**, nunca incrustado en el marcado.

---

## 6. Convenciones

- **Idioma**: documentación y commits en español. Código, nombres de archivo y ramas en inglés.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) —
  `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- **Decisiones**: toda decisión con consecuencias se registra como ADR en
  `docs/decisiones/ADR-XXXX-titulo.md` (formato Michael Nygard).
- **Nunca** hacer push a una rama distinta de la designada sin autorización explícita.
- **Nada de datos del cliente en el repo** (contraseñas de PMS, accesos de hosting,
  credenciales de OTAs). Esos van en un gestor de secretos aparte.

---

## 7. Marco de trabajo

**Entrega iterativa con revisión quincenal del cliente** — Scrum adaptado, no Scrum puro.
Decisión y justificación pieza por pieza en
[`ADR-0002`](docs/decisiones/ADR-0002-marco-de-trabajo-iterativo.md); operación en
[`marco-de-trabajo.md`](docs/02-requerimientos/marco-de-trabajo.md).

- Sprints de **2 semanas**, cada uno cierra con **demo sobre URL real de staging**.
- Se conservan: backlog con criterios de aceptación, Sprint Review, Definition of Ready,
  Definition of Done, planning y retro ligeras.
- Se omiten con justificación: daily standup, story points/velocity, Scrum Master dedicado.
- El cliente no es Product Owner: es **Cliente-Decisor con SLA de 48 h hábiles**.
  Abraham es **Proxy PO**.
- **Prueba ácida contra Water-Scrum-Fall:** si el entregable de una iteración es un
  documento y no algo que el cliente pueda abrir en el navegador, no era un sprint.

---

## 8. Plan de desarrollo (fijado)

**6 sprints × 2 semanas ≈ 12 semanas.** Detalle con criterios de aceptación en
[`plan-de-desarrollo.md`](docs/02-requerimientos/plan-de-desarrollo.md).

| Sprint | Foco | Demo — lo que el cliente abre en su navegador |
|---|---|---|
| **0** 🔄 | Fundación, auditoría, inventario de contenido, mapeo de URLs, backlog | Informe de auditoría + backlog aprobado |
| **1** | Astro + i18n + CI/CD + design tokens + componentes base + **analítica** | **Home** navegable bilingüe, CWV verdes |
| **2** | Alojamiento: listado, detalle, galería, `schema.org` | Catálogo completo ES/EN |
| **3** 🔴 | **Solicitud de reserva** end-to-end, cotización con impuestos, WhatsApp, aviso de privacidad | El manager recibe una solicitud real en su teléfono |
| **4** | Servicios, restaurante, spa, galería, ubicación, contacto, políticas, legales | Sitio completo navegable |
| **5** | WCAG 2.2 AA, CWV, **301**, seguridad, rollback, lanzamiento, traspaso | Sitio en producción |

---

## 9. Estado actual / siguiente acción

🚨 **ACCIÓN URGENTE, FUERA DEL PLAN DE SPRINTS.** El sitio actual captura número de tarjeta
y **CVV** en `/autorizacion-de-pago-con-tdc/` y `/en/cc-payment-authorization/` mediante
Contact Form 7, que lo envía por correo. Incumple PCI-DSS 3.3.1 y 4.2.1 y la LFPDPPP.
**Despublicar hoy y purgar el histórico**, con independencia del rediseño.
Detalle en [`auditoria-sitio-actual.md`](docs/01-descubrimiento/auditoria-sitio-actual.md) §1.

**Hecho:** auditoría técnica del sitio actual (0.5). WordPress + Divi, 26 páginas reales
con paridad ES/EN, 244 imágenes WebP de 2025 bien dimensionadas, sin analítica, schema.org
genérico sin tipos hoteleros, **8 tipos de alojamiento confirmados con sus nombres**.

**Bloqueante:** faltan por ingerir las capturas de ResNexus y Cappa. Sin ellas siguen
detenidas la historia 0.7 (análisis de la plantilla) y el análisis competitivo.

**Listo para arrancar sin esperar:** el sprint 1 sólo necesita el visto bueno de ADR-0004
y los accesos. La estructura del proyecto Astro no depende del mirror.

**Pendientes de Abraham (fuera del carril de software):**
1. Visto bueno a ADR-0003 y ADR-0004.
2. Licencia de Cappa (R-01) — bloquea assets en producción.
3. Accesos: dominio, hosting, Analytics, Search Console (R-06, R-07).
4. Enviar el brief `.docx` al cliente y agendar la entrevista.

---

## 10. Índice de documentación

- `docs/README.md` — mapa de la documentación
- `docs/01-descubrimiento/` — auditoría, capturas, hallazgos
- `docs/02-requerimientos/` — brief, entrevista, backlog
- `docs/03-arquitectura/` — sitemap, stack, decisiones técnicas
- `docs/04-diseno/` — design system, adaptación de plantilla
- `docs/decisiones/` — ADRs y bitácora de aprendizaje

**Documentos vigentes:**

| Documento | Contenido |
|---|---|
| `docs/01-descubrimiento/runbook-captura-httrack.md` | Comandos de captura local |
| `docs/01-descubrimiento/hallazgos-preliminares.md` | Hallazgos vía document analysis |
| `docs/02-requerimientos/preguntas-cliente.md` | Banco de preguntas al cliente (6 bloques) |
| `docs/02-requerimientos/preguntas-internas.md` | 20 preguntas de preparación interna |
| `docs/02-requerimientos/marco-de-trabajo.md` | Roles, cadencia, DoR, DoD, plan de sprints |
| `docs/decisiones/ADR-0001-…` | Descubrimiento antes de requerimientos |
| `docs/02-requerimientos/plan-de-desarrollo.md` | **Plan fijado: 6 sprints con criterios de aceptación** |
| `docs/decisiones/ADR-0002-…` | Marco de trabajo iterativo (Scrum adaptado) |
| `docs/decisiones/ADR-0003-…` | Arquitectura de reserva sin PMS |
| `docs/decisiones/ADR-0004-…` | Stack técnico (Astro estático) |
| `docs/decisiones/bitacora-aprendizaje.md` | Lecciones acumuladas + riesgos abiertos |
