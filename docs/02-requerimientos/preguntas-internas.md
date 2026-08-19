# Preguntas clave hacia adentro — nuestra organización

> Las que casi nadie hace y son las que hunden proyectos. Un PM que sólo interroga al
> cliente y no a su propia organización está gestionando la mitad del riesgo.
> **Se responden antes de firmar**, no después.

---

## 1. Capacidad real (no la optimista)

| # | Pregunta | Por qué importa |
|---|---|---|
| I-1 | ¿Cuántas horas **reales** por semana puede dedicar Abraham? No las deseadas | La causa #1 de retraso en consultoría chica es comprometer capacidad que no existe. Se estima sobre horas reales y se aplica un colchón |
| I-2 | ¿Hay alguien más, o es un equipo de una persona? | Determina si las ceremonias de equipo tienen sentido (ver ADR-0002) |
| I-3 | ¿Quién cubre si Abraham se enferma o entra otro cliente? | *Bus factor = 1*. Se mitiga documentando en el repo, que es justo lo que estamos haciendo |
| I-4 | ¿Qué otros compromisos compiten por esa capacidad en los próximos 3 meses? | Un plan que ignora el resto de la agenda es ficción |

## 2. Comercial y contractual

| # | Pregunta | Por qué importa |
|---|---|---|
| I-5 | ¿Precio fijo o bolsa de horas? | Precio fijo + alcance abierto = pérdida garantizada. Si es fijo, el alcance debe cerrarse por escrito y todo lo demás va a *change request* |
| I-6 | ¿Cómo se manejan los cambios de alcance? ¿Está escrito en el contrato? | Sin mecanismo de cambio, el *scope creep* se absorbe gratis. Ver "money for nothing / change for free" (Sutherland) en ADR-0002 |
| I-7 | ¿Cuál es nuestro **criterio de salida**: qué haría que rechacemos o abandonemos? | Definirlo en frío. En caliente, ya no se puede pensar |
| I-8 | ¿Está el pago escalonado por hito? ¿Hay anticipo? | Financia el proyecto y alinea incentivos. Estándar: 40 / 30 / 30 |
| I-9 | ¿Tenemos derecho a usarlo como caso de estudio y portafolio? | Se pacta al inicio, cuando no cuesta nada. Al final, el cliente no tiene incentivo para concederlo |
| I-10 | ¿Qué pasa después del lanzamiento? ¿Hay contrato de mantenimiento? | El *retainer* es donde vive el margen en este negocio. Si no se plantea al inicio, no se plantea nunca |

## 3. Técnicas y de arquitectura

| # | Pregunta | Por qué importa |
|---|---|---|
| I-11 | ¿Stack? Cappa es HTML/CSS/JS estático. ¿Se queda así, se envuelve en un generador (Astro / 11ty) o se lleva a WordPress? | **Depende de F4 del cuestionario al cliente** (quién edita después). Decidirlo antes es construir sobre una suposición |
| I-12 | ¿Dónde se hospeda y quién paga el hosting durante el desarrollo? | Se necesita un *staging* desde el sprint 1: sin entorno visible no hay demo, y sin demo no hay revisión con el cliente |
| I-13 | ¿Cuál es nuestra **Definition of Done** técnica? | Sin DoD, "terminado" es opinable. Propuesta en `marco-de-trabajo.md` |
| I-14 | ¿Quién produce el contenido: redacción y edición de fotos? ¿Está costeado? | El contenido es la ruta crítica. Si se asume que "el cliente lo manda", el proyecto se detiene ahí |
| I-15 | ¿Cómo migramos sin perder SEO? ¿Tenemos el mapeo de URLs viejas → nuevas? | Un rediseño sin redirecciones 301 destruye el posicionamiento acumulado. Sale del mirror de HTTrack |
| I-16 | ¿Plan de rollback si el lanzamiento sale mal? | Es un negocio que vende 24/7. Un sitio caído en temporada cuesta reservas reales |

## 4. De relación con el cliente

| # | Pregunta | Por qué importa |
|---|---|---|
| I-17 | ¿Cuál es el **SLA de respuesta** que le pedimos al cliente? | Sin compromiso de respuesta, un proyecto iterativo se paraliza esperando aprobaciones. Propuesta: **48 h hábiles**, y se escribe en el contrato |
| I-18 | ¿Cuántas rondas de revisión de diseño están incluidas? | El clásico "una vueltita más" infinito. Estándar: **2 rondas** por entregable; la tercera es *change request* |
| I-19 | ¿Cuál es el canal oficial? ¿WhatsApp cuenta como acuerdo? | Si las decisiones viven en WhatsApp, no existen. Todo acuerdo se confirma por escrito en el canal oficial |
| I-20 | ¿Qué pasa si el cliente no entrega el contenido a tiempo? | Debe existir cláusula: el calendario se recorre y el costo del retraso no lo absorbemos nosotros |
