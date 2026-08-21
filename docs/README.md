# Documentación — Proyecto Azúcar Hotel Tulum

Mapa de la documentación. El contexto general y las reglas de trabajo viven en
[`../CLAUDE.md`](../CLAUDE.md).

## Estructura

| Carpeta | Contenido |
|---|---|
| `01-descubrimiento/` | Auditoría del sitio actual, capturas, hallazgos, análisis competitivo |
| `02-requerimientos/` | Brief pre-llenado, guion de entrevista, backlog priorizado |
| `03-arquitectura/` | Sitemap, stack tecnológico, integraciones |
| `04-diseno/` | Design system, adaptación de la plantilla Cappa |
| `decisiones/` | ADRs (Architecture Decision Records) y bitácora de aprendizaje |

## Por dónde empezar

1. [`../CLAUDE.md`](../CLAUDE.md) — contexto, decisiones vigentes y estado actual
2. [Product Backlog](02-requerimientos/backlog-producto.md) — qué se construye y con qué criterios
3. [Plan de desarrollo](02-requerimientos/plan-de-desarrollo.md) — cómo se ejecuta cada sprint
4. [Bitácora de aprendizaje](decisiones/bitacora-aprendizaje.md) — por qué se hizo así

## Documentos vigentes

### Requerimientos y planificación
- [**Product Backlog**](02-requerimientos/backlog-producto.md) — épicas, historias, criterios de aceptación
- [**Plan de desarrollo**](02-requerimientos/plan-de-desarrollo.md) — 6 sprints con guion de demo
- [Marco de trabajo](02-requerimientos/marco-de-trabajo.md) — roles, cadencia, DoR, DoD
- [Preguntas al cliente](02-requerimientos/preguntas-cliente.md) · [Preguntas internas](02-requerimientos/preguntas-internas.md)
- **[Mensaje al cliente, listo para enviar](02-requerimientos/mensaje-cliente-desbloqueo.md)** — avance, dos avisos y cuatro decisiones

### Descubrimiento
- [Auditoría del sitio actual](01-descubrimiento/auditoria-sitio-actual.md)
- [🚨 Aviso al cliente — datos de tarjeta](01-descubrimiento/aviso-cliente-datos-de-tarjeta.md)
- [Análisis competitivo de ResNexus](01-descubrimiento/analisis-propuesta-resnexus.md)
- [Runbook de captura HTTrack](01-descubrimiento/runbook-captura-httrack.md)
- [Hallazgos preliminares](01-descubrimiento/hallazgos-preliminares.md)

### Diseño y despliegue
- [Análisis de la plantilla Cappa](04-diseno/analisis-plantilla-cappa.md)
- [Mapeo Cappa → sitio](04-diseno/mapeo-cappa-a-sitio.md) — qué sección de la plantilla alimenta cada página
- [Runbook de accesos y despliegue](05-despliegue/runbook-accesos-y-despliegue.md)
- [Mapa de redirecciones 301](05-despliegue/mapa-301.md) — y su prueba automatizada
- [Plan de reversión del lanzamiento](05-despliegue/plan-de-reversion.md) — criterio, capas y ensayos

### Decisiones
- [ADR-0001 — Descubrimiento antes de requerimientos](decisiones/ADR-0001-descubrimiento-antes-de-requerimientos.md)
- [ADR-0002 — Marco de trabajo iterativo](decisiones/ADR-0002-marco-de-trabajo-iterativo.md)
- [ADR-0003 — Arquitectura de reserva sin PMS](decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md)
- [ADR-0004 — Stack técnico](decisiones/ADR-0004-stack-tecnico.md)
- [ADR-0005 — Ajustes del stack, sprints 2 a 4](decisiones/ADR-0005-ajustes-de-stack-sprints-2-4.md)
- [Bitácora de aprendizaje](decisiones/bitacora-aprendizaje.md)

## Sobre los ADR

Un **Architecture Decision Record** documenta una decisión con consecuencias: el contexto,
lo que se decidió, por qué, y qué se acepta a cambio. Formato de Michael Nygard.

Sirve para responder, seis meses después, *"¿por qué hicimos esto así?"* sin depender de la
memoria de nadie. En consultoría tiene un segundo uso, igual de importante: cuando el
cliente cuestiona una decisión, existe el documento fechado que la sustenta.

**Regla:** si una decisión es difícil de revertir o costó una discusión, se escribe un ADR.
Si es trivial, no.
