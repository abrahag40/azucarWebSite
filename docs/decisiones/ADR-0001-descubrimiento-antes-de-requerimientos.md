# ADR-0001 — Auditoría de descubrimiento antes del levantamiento de requerimientos

- **Fecha:** 2026-08-19
- **Estado:** Aceptada
- **Decisor:** Claude (líder de proyecto), con visto bueno de Abraham

## Contexto

Se planteó como primer paso del proyecto enviar al cliente un cuestionario de
levantamiento de requerimientos en un documento de Word/Drive para que lo respondiera.

## Decisión

**No.** El cuestionario no es el primer paso, es el tercero. El orden es:

1. **Fundación del proyecto** (repo, memoria, estructura documental) — hecho.
2. **Auditoría de descubrimiento** sobre el material ya existente:
   sitio actual, propuesta de la agencia anterior, plantilla base, presencia en OTAs
   y reseñas públicas.
3. **Brief pre-llenado** derivado de la auditoría + entrevista síncrona.

Además, el instrumento de levantamiento **se parte en dos** según la naturaleza del dato:

| Instrumento | Contenido | Canal | Por qué |
|---|---|---|---|
| **Brief pre-llenado** (documento colaborativo) | Datos duros y verificables: razón social, RFC, inventario y nombres de habitaciones, tarifas, políticas, accesos, contactos, inventario de fotografía | Asíncrono | Requiere consultar archivos, no memoria. Nadie contesta bien un RFC en una llamada |
| **Entrevista guiada, 45–60 min, grabada** | Objetivos de negocio, dolores, prioridades, qué reserva quiere ganar, restricciones de presupuesto y plazo | Síncrono | Conocimiento tácito. No se obtiene por escrito |

## Justificación

### 1. La preparación es parte formal de la elicitación
BABOK v3 (IIBA) define *Prepare for Elicitation* como tarea previa obligatoria, y lista
**document analysis** (análisis de material existente) como técnica de elicitación por
derecho propio. Preguntar lo que ya podíamos leer nosotros no es diligencia: es
trasladarle al cliente nuestro trabajo.

### 2. La atención del cliente es un recurso finito y no renovable
El dueño de un hotel en Tulum en temporada tiene minutos, no horas. Ese presupuesto de
atención se gasta **una vez**. Gastarlo en preguntas cuya respuesta está publicada en su
propio sitio implica no poder gastarlo después en las preguntas que sí importan. Un
cuestionario genérico y largo tiene además dos fallas conocidas: abandono, y respuestas
de una palabra que obligan a una segunda ronda — que ya cuesta credibilidad.

### 3. Es más fácil corregir que crear (*straw-man document*)
Un documento en blanco exige al cliente producir información desde cero. Un documento
pre-llenado con nuestros hallazgos convierte la tarea en **validar y corregir**, que es
cognitivamente mucho más barato y produce respuestas más ricas y precisas. Es la misma
lógica del *straw-man proposal*: se pone una propuesta imperfecta sobre la mesa para que
el experto la ataque.

### 4. Efecto secundario: demuestra competencia
Llegar diciendo *"detectamos dos fichas duplicadas en TripAdvisor, cinco dominios de
terceros compitiendo por tu marca y quejas recurrentes de cobro; queremos validar esto
contigo"* posiciona a la consultora como asesor. Llegar con un formulario en blanco
posiciona como proveedor. Es la misma reunión con dos resultados comerciales distintos.

### 5. Las preguntas correctas **emergen** de la auditoría
Evidencia concreta de este proyecto: hasta analizar la propuesta previa no sabíamos que
el cliente había evaluado **ResNexus**, que es PMS + channel manager + motor de reservas.
De ahí nace la pregunta que define el alcance completo del proyecto: *¿con qué PMS y motor
de reservas opera hoy, y hay contrato vigente?* En frío jamás la habríamos formulado. Ver
`docs/01-descubrimiento/hallazgos-preliminares.md` §3.4.

## Consecuencias

**Positivas**
- El cuestionario será más corto, más específico y con mayor tasa de respuesta.
- Entramos a la reunión con hipótesis, no con dudas.
- Se descubren victorias rápidas (fichas duplicadas, NAP) antes de firmar alcance.

**Negativas / costo asumido**
- Retrasa el contacto formal con el cliente ~2–4 días de trabajo.
- Requiere que Abraham ejecute las capturas HTTrack en local (el entorno remoto tiene el
  egreso bloqueado).

**Mitigación del retraso:** el contacto con el cliente no se pospone; se cambia su
propósito. En vez de "te mando el cuestionario", el mensaje inmediato es *"estamos
auditando tu presencia digital, te comparto los primeros hallazgos y agendamos 45 min"*.
El cliente percibe avance desde el día uno.

## Qué se decidió NO hacer (control de ceremonia)

Esto es un sitio web de un hotel boutique, no un sistema empresarial. Se **omiten**
deliberadamente, y esa omisión es la decisión correcta:

- Documento formal de visión y alcance tipo IEEE 830 / SRS.
- Matriz RACI y plan de gestión de stakeholders.
- Matriz de trazabilidad de requerimientos.
- Plan de gestión de riesgos formal (se lleva una lista simple de riesgos en la bitácora).

**Se conserva** lo que aporta valor real a esta escala: memoria de proyecto (CLAUDE.md),
ADRs, auditoría documentada con evidencia, backlog priorizado y checklist de salida.
