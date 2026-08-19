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

## Documentos vigentes

- [Runbook de captura con HTTrack](01-descubrimiento/runbook-captura-httrack.md) — **acción pendiente de Abraham**
- [Hallazgos preliminares](01-descubrimiento/hallazgos-preliminares.md)
- [ADR-0001 — Descubrimiento antes de requerimientos](decisiones/ADR-0001-descubrimiento-antes-de-requerimientos.md)
- [Bitácora de aprendizaje](decisiones/bitacora-aprendizaje.md)

## Sobre los ADR

Un **Architecture Decision Record** documenta una decisión con consecuencias: el contexto,
lo que se decidió, por qué, y qué se acepta a cambio. Formato de Michael Nygard.

Sirve para responder, seis meses después, *"¿por qué hicimos esto así?"* sin depender de la
memoria de nadie. En consultoría tiene un segundo uso, igual de importante: cuando el
cliente cuestiona una decisión, existe el documento fechado que la sustenta.

**Regla:** si una decisión es difícil de revertir o costó una discusión, se escribe un ADR.
Si es trivial, no.
