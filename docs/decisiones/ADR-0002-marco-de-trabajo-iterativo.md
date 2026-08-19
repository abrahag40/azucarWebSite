# ADR-0002 — Marco de trabajo iterativo: Scrum adaptado, no Scrum puro

- **Fecha:** 2026-08-19
- **Estado:** Propuesta — requiere visto bueno de Abraham
- **Decisor:** Claude (líder de proyecto)

## Contexto

Se planteó formalizar el proyecto "con sprints de desarrollo usando la metodología Scrum".

## Decisión

Adoptamos **iteraciones de 2 semanas con las prácticas de Scrum que aportan valor a esta
escala, y omitimos explícitamente las que no.** No lo llamamos "Scrum" a secas, porque no
lo es, y llamarlo así generaría expectativas falsas en ambos lados.

Nombre del marco: **entrega iterativa con revisión quincenal del cliente** (en la industria
se le conoce como *Scrumban* o *Scrum-lite* según a quién le preguntes).

## Justificación — por qué Scrum puro no aplica

### 1. No existe el Product Owner, y Scrum sin PO no funciona
La Scrum Guide 2020 define al Product Owner como una **persona con autoridad para priorizar,
disponible de forma continua** para el equipo. El dueño de un hotel boutique en Tulum, en
temporada, no puede serlo — y no debería intentarlo. El PO ausente o sin autoridad es la
causa documentada número uno de fracaso de implantaciones de Scrum.

**Nuestra sustitución:** Abraham actúa como **Proxy Product Owner** y el cliente asume el
rol de **Cliente-Decisor** con un **SLA de respuesta de 48 h hábiles escrito en el
contrato**. Es la adaptación honesta; fingir que el hotelero es PO no lo es.

### 2. Esto es un proyecto, no un producto
Scrum está diseñado para desarrollo **continuo de producto** con un backlog perpetuo. Aquí
hay una fecha de fin, un entregable definido y un traspaso. Forzar Scrum a un proyecto con
fin conocido es aplicar la herramienta fuera de su dominio.

### 3. La ruta crítica no es código
Lo que va a retrasar este proyecto es **fotografía, redacción, tarifas, decisiones del
cliente y la licencia de la plantilla**. Ningún sprint acelera una sesión de fotos que
nadie ha agendado. Scrum no gestiona dependencias externas; un tablero de flujo con
bloqueos visibles, sí.

### 4. El costo de ceremonia no escala hacia abajo
Con 1–2 personas, el paquete completo de ceremonias (daily, planning, refinement, review,
retro) consume un porcentaje desproporcionado de la capacidad. La Scrum Guide habla de
equipos de hasta 10; el diseño supone un equipo, no un individuo. Un *daily standup* de una
persona consigo misma es teatro.

### 5. Precio cerrado y Scrum son contradictorios
Scrum ofrece **tiempo y costo fijos con alcance variable**. Un hotelero pedirá **alcance y
precio fijos**. Es la contradicción conocida como *agile fixed price*. Se resuelve
explícitamente, no ignorándola: alcance cerrado para el MVP de lanzamiento, más un
mecanismo de intercambio de alcance para lo demás (ver `marco-de-trabajo.md`).

## El antipatrón que estamos evitando: **Water-Scrum-Fall**

Es hacer cascada de toda la vida — análisis, luego diseño, luego desarrollo, luego pruebas —
pero llamándole "sprints" a las fases. Se conservan los rituales y se pierde el único
beneficio real del método iterativo: **que el cliente vea software funcionando pronto y
corrija barato**.

**Prueba ácida contra este antipatrón, que aplicamos en cada sprint:**
> *Al final de cada iteración el cliente debe poder abrir una URL en su navegador y ver algo
> real.* Si el entregable del sprint es un documento, un PDF o un mockup, no era un sprint:
> era una fase de cascada disfrazada.

## Qué conservamos y qué omitimos

| Práctica de Scrum | ¿Se conserva? | Razón |
|---|---|---|
| Sprints de 2 semanas | ✅ Sí | La cadencia fija es el mecanismo que fuerza decisiones del cliente. Es el elemento de mayor valor de todo el framework |
| Product Backlog con historias y criterios de aceptación | ✅ Sí | Alcance verificable, no opinable |
| **Sprint Review / demo con el cliente** | ✅ Sí, obligatorio | Ceremonia de mayor retorno. Es lo que evita el *"esto no es lo que pedí"* al final, cuando ya es carísimo |
| Definition of Done | ✅ Sí, explícita | Sin ella, "terminado" es negociable |
| **Definition of Ready** | ✅ Sí, crítica aquí | La mayoría de historias dependen de contenido del cliente. Una historia sin contenido **no entra al sprint**. Sin este filtro, los sprints se llenan de trabajo bloqueado |
| Sprint Planning | ✅ Sí, 30–45 min | Compromiso explícito de la iteración |
| Retrospectiva | ✅ Sí, 15 min, escrita | Mejora continua barata. Va a `bitacora-aprendizaje.md` |
| Daily Scrum | ❌ No | Con 1–2 personas es teatro. Sustituto: nota diaria de una línea en el tablero |
| Story points y velocity | ❌ No al inicio | La velocity necesita historia previa para significar algo. Con un equipo nuevo y sin datos, es una cifra inventada que se usará para presionar. Estimamos en **tallas S/M/L** y calibramos con datos reales tras 2 sprints |
| Scrum Master dedicado | ❌ No | No hay equipo que facilitar |
| Backlog Refinement como ceremonia formal | ❌ No | Se hace continuo, sobre el tablero |

## Sobre el "Sprint 0"

Lo que estamos ejecutando ahora — fundación, auditoría, requerimientos, backlog — se conoce
como **Sprint 0** o *Iteration Zero*. **Aviso honesto:** los puristas de Scrum sostienen que
no existe, porque todo sprint debe producir incremento potencialmente entregable. Tienen
razón desde la ortodoxia. En consultoría, donde hay que auditar y contratar antes de
construir, es la práctica pragmática dominante. Lo usamos **sabiendo que es una desviación
del estándar**, no por desconocerlo.

> Regla general que vale más que este ADR: **conoce el estándar, después decide desviarte y
> di por qué.** Desviarse sin conocerlo es ignorancia; conocerlo y no desviarse nunca es
> dogma. Ninguna de las dos es criterio profesional.

## Consecuencias

**Positivas:** cadencia de decisión del cliente, alcance verificable, sin sobrecarga de
ceremonias, dependencias externas visibles.

**Negativas / costo asumido:** no podremos usar métricas ágiles estándar (velocity,
burndown) durante los primeros sprints. Se acepta: métricas sin datos son ruido.

**Riesgo residual:** si el cliente incumple el SLA de 48 h, la cadencia se rompe. Mitigación:
se escribe en el contrato y se hace visible en cada demo qué decisiones están pendientes de
su lado.
