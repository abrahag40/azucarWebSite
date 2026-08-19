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
| 1 | Descubrimiento / auditoría | Auditoría técnica y de contenido del sitio actual + propuesta ResNexus + plantilla | 🔄 En curso |
| 2 | Levantamiento de requerimientos | Brief pre-llenado + entrevista + backlog priorizado | ⬜ |
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

## 5. Convenciones

- **Idioma**: documentación y commits en español. Código, nombres de archivo y ramas en inglés.
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) —
  `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- **Decisiones**: toda decisión con consecuencias se registra como ADR en
  `docs/decisiones/ADR-XXXX-titulo.md` (formato Michael Nygard).
- **Nunca** hacer push a una rama distinta de la designada sin autorización explícita.
- **Nada de datos del cliente en el repo** (contraseñas de PMS, accesos de hosting,
  credenciales de OTAs). Esos van en un gestor de secretos aparte.

---

## 6. Estado actual / siguiente acción

**Siguiente acción concreta:** Abraham ejecuta las 3 capturas HTTrack del runbook y hace
commit del resultado. Con eso Claude produce la auditoría de la Fase 1.

---

## 7. Índice de documentación

- `docs/README.md` — mapa de la documentación
- `docs/01-descubrimiento/` — auditoría, capturas, hallazgos
- `docs/02-requerimientos/` — brief, entrevista, backlog
- `docs/03-arquitectura/` — sitemap, stack, decisiones técnicas
- `docs/04-diseno/` — design system, adaptación de plantilla
- `docs/decisiones/` — ADRs y bitácora de aprendizaje
