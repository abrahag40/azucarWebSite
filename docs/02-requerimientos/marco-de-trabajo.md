# Marco de trabajo operativo — sprints, roles y criterios

> Decisión y justificación en [ADR-0002](../decisiones/ADR-0002-marco-de-trabajo-iterativo.md).
> Este documento es el **cómo se opera**, no el porqué.

---

## Roles

| Rol | Quién | Responsabilidad | Autoridad |
|---|---|---|---|
| **Cliente-Decisor** | 1 persona del hotel, nombre y apellido | Prioriza, aprueba, entrega contenido | Decisión final de negocio |
| **Proxy Product Owner** | Abraham | Traduce negocio a backlog, prioriza dentro del sprint, protege el alcance | Decide el "cómo"; escala el "qué" |
| **Equipo de desarrollo** | Abraham + Claude | Construye, prueba, entrega | Decisiones técnicas |

**SLA del Cliente-Decisor: 48 h hábiles** para responder aprobaciones y entregar contenido
comprometido. Va en el contrato. Sin este compromiso la cadencia quincenal no existe.

---

## Cadencia

**Sprint = 2 semanas.** Por qué dos y no una ni cuatro: una semana no alcanza para producir
algo demostrable en un proyecto con dependencias de contenido; cuatro semanas dejan al
cliente demasiado tiempo sin ver avance, y el objetivo de la iteración es precisamente
**forzar su decisión con frecuencia**.

| Momento | Ceremonia | Duración | Quién |
|---|---|---|---|
| Lunes semana 1 | **Planning** — qué entra al sprint y compromiso | 30–45 min | Equipo |
| Diario | Nota de una línea en el tablero (no reunión) | 2 min | Equipo |
| Viernes semana 2 | **Sprint Review / demo** — el cliente ve el sitio funcionando | 30 min | Equipo + Cliente |
| Viernes semana 2 | **Retro** — qué mantener, qué cambiar | 15 min, escrita | Equipo |

> **La demo es innegociable y siempre sobre una URL real de staging.** Ver la prueba ácida
> contra Water-Scrum-Fall en el ADR-0002.

---

## Definition of Ready — cuándo una historia puede entrar a un sprint

Una historia **no entra** si no cumple todo esto:

- [ ] Tiene criterios de aceptación escritos y verificables
- [ ] **El contenido definitivo existe** (texto y fotos), o está explícitamente aprobado el
      uso de *placeholder* y hay fecha comprometida para el real
- [ ] No depende de una decisión pendiente del cliente
- [ ] Cabe en un sprint. Si no cabe, se parte
- [ ] Su dependencia técnica (motor de reservas, accesos, licencia) está resuelta

> ⚠️ **El filtro más importante del proyecto.** El fallo típico en sitios de hotel es
> arrancar sprints llenos de historias bloqueadas esperando fotos. El sprint termina en
> cero y nadie sabe explicar por qué. La DoR lo hace visible **antes**, no después.

---

## Definition of Done — cuándo una historia está terminada

Aplica a **toda** historia, sin excepción:

- [ ] Funciona en móvil, tablet y escritorio (móvil primero: >60 % del tráfico de hotelería)
- [ ] Contenido real, en español **e** inglés
- [ ] Imágenes optimizadas: formato moderno (WebP/AVIF), `srcset`, `width`/`height`
      declarados, `loading="lazy"` fuera del *viewport* inicial
- [ ] SEO on-page: `<title>` único, meta description, un solo `<h1>`, jerarquía correcta,
      `alt` descriptivo, `canonical`, `hreflang` ES/EN
- [ ] Accesibilidad **WCAG 2.2 nivel AA** en lo verificable: contraste ≥ 4.5:1, navegación
      completa por teclado, foco visible, formularios con `<label>`
- [ ] **Core Web Vitals** en verde en PageSpeed móvil: LCP < 2.5 s · INP < 200 ms · CLS < 0.1
- [ ] Sin errores en consola del navegador
- [ ] Enlaces verificados, formularios probados de extremo a extremo
- [ ] Desplegado en staging y visible para el cliente
- [ ] Commiteado con mensaje convencional

> **Por qué una DoD tan explícita.** Sin ella, "terminado" se negocia cada vez y siempre se
> negocia a la baja bajo presión de fecha. Escrita, deja de ser opinión. Además convierte
> accesibilidad y performance en **requisito de entrada**, no en una fase final que siempre
> se recorta cuando el calendario aprieta — que es exactamente lo que ocurre siempre.

---

## Priorización

**MoSCoW** (Must / Should / Could / Won't) para el corte de lanzamiento, con un criterio de
desempate propio de este negocio:

> Ante dos historias del mismo nivel, gana la que esté **más cerca de la reserva directa**.

Orden de valor decreciente para un hotel:
`Motor de reservas → Habitaciones → Fotografía/galería → Ubicación y cómo llegar →
Servicios → Restaurante → Blog`

*(No usamos WSJF ni ponderaciones numéricas: a esta escala, el costo de calcularlas supera
el valor de la precisión que aportan.)*

**Regla de "Won't":** todo lo que queda fuera del lanzamiento se escribe explícitamente en
la columna *Won't* y se comparte con el cliente. Lo no dicho se asume incluido — y esa
asunción es la que produce la conversación incómoda de la última semana.

---

## Plan de sprints — BORRADOR

> ⚠️ **Provisional.** Se confirma al cerrar la auditoría y la entrevista. El sprint 2 puede
> duplicarse en esfuerzo según la respuesta a B2 (motor de reservas propio vs. externo).

| Sprint | Foco | El cliente debe poder ver… |
|---|---|---|
| **0** *(en curso)* | Fundación, auditoría, requerimientos, backlog, contrato, licencia | Informe de auditoría + backlog aprobado + propuesta firmada |
| **1** | Arquitectura de información + design system sobre Cappa + home | La **home navegable en staging**, con contenido real |
| **2** | Habitaciones: listado + detalle + integración del motor de reservas | Flujo **completo** de consulta y reserva, de principio a fin |
| **3** | Contenido secundario: servicios, restaurante, spa, galería, ubicación, contacto, políticas · ES/EN | Sitio completo navegable en ambos idiomas |
| **4** | QA, performance, SEO técnico, accesibilidad, analítica, redirecciones 301 | Checklist de salida en verde, con evidencia medida |
| **5** | Lanzamiento, monitoreo, capacitación y traspaso | Sitio en producción + manual + sesión de capacitación grabada |

**Nota sobre el sprint 0:** no produce software y por eso no es un sprint ortodoxo. Ver la
salvedad honesta en ADR-0002.

**El contenido es un carril paralelo, no una historia dentro del sprint.** La producción de
fotografía y redacción arranca en el sprint 1 y corre en paralelo con fechas propias. Si
esperamos a "el sprint del contenido", llegamos al sprint 3 con *lorem ipsum* y sin fotos.

---

## Tablero

GitHub Projects sobre este mismo repositorio. Columnas:

`Backlog` → `Ready` (pasó la DoR) → `En curso` (**límite WIP: 2**) → `En revisión` →
`Bloqueado` (con **motivo y responsable** visibles) → `Hecho` (pasó la DoD)

> **Por qué límite de trabajo en curso (WIP) y por qué una columna "Bloqueado" separada:**
> ambas ideas vienen de Kanban, no de Scrum. El WIP limitado obliga a terminar antes de
> empezar — trabajar en cinco cosas a la vez significa no entregar ninguna. Y sacar los
> bloqueos a una columna propia con responsable los vuelve **visibles**: un bloqueo
> escondido dentro de "en curso" nadie lo escala, y termina explicándose como retraso al
> final del sprint.
> *Es exactamente el punto del ADR-0002: tomamos de cada marco lo que resuelve un problema
> real de este proyecto, y podemos explicar por qué en cada caso.*
