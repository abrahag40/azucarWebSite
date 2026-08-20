# Plan de desarrollo — Azúcar Hotel Tulum

> **Alcance: sólo software.** Fotografía, redacción, licencias, contratos y trato con el
> cliente los gestiona Abraham por fuera; aparecen aquí únicamente como **dependencias que
> bloquean historias**, nunca como tareas nuestras.
>
> **Marco:** [ADR-0002](../decisiones/ADR-0002-marco-de-trabajo-iterativo.md) — entrega
> iterativa con revisión quincenal. Scrum adaptado, con lo que se omite justificado.
> **Backlog:** [`backlog-producto.md`](backlog-producto.md) — historias y criterios de aceptación.
>
> **6 sprints × 2 semanas ≈ 12 semanas.**

---

## Cómo se opera un sprint

Cada sprint tiene la misma anatomía. Se repite igual las seis veces, porque **la cadencia
predecible es la mitad del valor del método**: el cliente aprende cuándo le vamos a
preguntar y cuándo va a ver algo.

| Momento | Ceremonia | Duración | Quién | Salida |
|---|---|---|---|---|
| Lunes S1 | **Sprint Planning** | 30–45 min | Equipo | Sprint Backlog congelado + **Sprint Goal escrito** |
| Diario | Nota de una línea en el tablero | 2 min | Equipo | Bloqueos visibles |
| Miércoles S2 | **Refinamiento** del sprint siguiente | 20 min | Equipo | Historias que pasan la DoR |
| Viernes S2 | **Sprint Review** sobre URL de staging | 30 min | Equipo + Cliente | Decisiones y feedback registrados |
| Viernes S2 | **Retrospectiva** | 15 min, escrita | Equipo | Entrada en la bitácora |

### El Sprint Goal no es opcional

Cada sprint declara **un objetivo en una frase**, escrito antes de elegir las historias.
Es el artefacto de Scrum que más gente omite y el que más sirve: cuando a mitad de sprint
aparece trabajo nuevo, el Sprint Goal es lo que permite decidir si entra o no **sin
discutir**. Si no lo acerca al objetivo, va al backlog.

### Regla de congelación

Una vez cerrado el Planning, **el Sprint Backlog no crece**. Lo urgente que aparezca entra
al backlog y se prioriza en el siguiente Planning; sólo un fallo en producción justifica
romper la iteración. Sin esta regla el sprint deja de ser una unidad de compromiso y se
convierte en una lista de deseos con fecha.

### Prueba ácida en cada Review

> *El cliente abre una URL en su navegador y ve algo real.* Si el entregable del sprint es
> un documento, un PDF o un mockup, no era un sprint: era una fase de cascada disfrazada.
> Ver el antipatrón **Water-Scrum-Fall** en ADR-0002.

---

## SPRINT 0 — Fundación y descubrimiento ✅ CERRADO

**Objetivo:** *Entender el terreno con evidencia reproducible y dejar el proyecto listo para
construir.*

| # | Entregable | Estado |
|---|---|---|
| 0.1 | Repositorio, `CLAUDE.md`, estructura documental | ✅ |
| 0.2 | ADR-0001 a ADR-0004 | ✅ |
| 0.3 | Brief `.docx` y banco de preguntas | ✅ |
| 0.4 | Captura HTTrack de los tres sitios | ✅ |
| 0.5 | Auditoría técnica del sitio actual | ✅ |
| 0.6 | Inventario de contenido y mapa de URLs | ✅ |
| 0.7 | Análisis de la plantilla Cappa | ✅ |
| 0.8 | Análisis competitivo de ResNexus | ✅ |
| 0.9 | Backlog priorizado | ✅ |

**Hallazgo dominante:** el sitio actual **captura número de tarjeta y CVV** por Contact
Form 7. Aviso al cliente entregado con acuse de decisión. Fuera del plan de sprints por
urgencia.

**No produjo software**, y es la desviación consciente de Scrum documentada en ADR-0002.

---

## SPRINT 1 — Fundación técnica 🔄 EN CURSO

**Sprint Goal:** *Que exista una home bilingüe en una URL real, rápida y accesible, sobre
cimientos que no haya que rehacer.*

**Criterio de entrada:** ADR-0004 aprobado. ✅

| # | Historia | Talla | Estado |
|---|---|---|---|
| H1.1 | Astro con enrutamiento ES/EN | S | ✅ |
| H1.2 | CI/CD con guardias de la DoD | M | 🔄 falta cuenta Cloudflare |
| H1.3 | Design tokens desde Cappa | M | ✅ |
| H1.4 | Componentes base accesibles | M | ✅ |
| H1.5 | Modelo de datos del alojamiento | M | ✅ |
| H1.6 | Home bilingüe | M | ✅ |
| H1.7 | Analítica | S | 🔄 falta ID de medición |

**Guion de la demo:**
1. Abrir la URL de staging en un teléfono.
2. Recorrer la home en español; cambiar a inglés con el selector.
3. Navegar el menú completo **sólo con el teclado**, mostrando el foco.
4. Mostrar PageSpeed móvil con los tres Core Web Vitals en verde.
5. Mostrar que el sitio pesa 56 KB y carga **0 archivos JavaScript**.

**Criterio de salida:** URL de staging pública, CWV verdes medidos, cero hallazgos del
auditor propio.

**Riesgos abiertos:** sin cuenta de Cloudflare no hay demo, y sin demo no fue un sprint.

---

## SPRINT 2 — Catálogo de alojamiento

**Sprint Goal:** *Que el huésped recorra los ocho tipos, entienda qué los distingue y pueda
elegir uno.*

**Criterio de entrada (DoR):** fotografía disponible o placeholder aprobado con fecha
comprometida para la real; respuesta a C1 o decisión explícita de publicar con datos
marcados como estimados.

| # | Historia | Talla |
|---|---|---|
| H2.1 | Listado de alojamiento | M |
| H2.2 | Ficha de detalle por tipo | M |
| H2.3 | Galería con visor accesible | M |
| H2.4 | `schema.org/HotelRoom` | S |
| H2.5 | Imágenes optimizadas AVIF/WebP | S |
| H2.6 | Propuesta de consolidación comercial | S |

**Guion de la demo:**
1. Recorrer el listado completo en ES y en EN.
2. Entrar a una ficha; mostrar galería con teclado, cerrar con `Esc`.
3. Añadir un tipo nuevo **en vivo** editando un archivo de datos y recompilar, para
   demostrar que el contenido no vive en el marcado.
4. Pegar la URL en Rich Results Test y mostrar `HotelRoom` validando.

**Criterio de salida:** catálogo completo bilingüe, CLS = 0 medido, datos estructurados
válidos.

**Riesgo principal:** la fotografía. Si no llega, se demuestra con marcadores y **se declara
como deuda visible en la Review**, no se disimula.

---

## SPRINT 3 — Solicitud de reserva 🔴

**Sprint Goal:** *Que el manager reciba en su teléfono una solicitud real, completa y con el
precio total, enviada desde el sitio.*

> Sprint de mayor riesgo y mayor valor. Es donde el proyecto deja de ser un folleto y
> empieza a producir reservas directas.

**Criterio de entrada (DoR) — todo esto antes del Planning:**
- Desglose fiscal confirmado por el cliente: IVA, ISH, saneamiento (**C3**)
- Compromiso de tiempo de respuesta y responsable designado (**B1, B2**)
- Correo y WhatsApp oficiales (**B4**)
- Pasarela de pago elegida (**B3**)

| # | Historia | Talla |
|---|---|---|
| H3.1 | Módulo `booking/` aislado | S |
| H3.2 | Formulario por pasos, funcional sin JS | M |
| H3.3 | **Cotización con impuestos desglosados** | M |
| H3.4 | Endpoint con validación en servidor y antispam | M |
| H3.5 | Acuse inmediato al huésped | S |
| H3.6 | Notificación al manager por correo y WhatsApp | S |
| H3.7 | WhatsApp como canal paralelo | S |
| H3.8 | Aviso de privacidad y consentimiento | S |

**Guion de la demo — se hace en vivo, con el teléfono del manager sobre la mesa:**
1. Enviar una solicitud real desde el sitio.
2. Mostrar el correo de acuse llegando al huésped con la cotización desglosada.
3. Mostrar la notificación llegando al **teléfono del manager**.
4. Recorrer el formulario con JavaScript desactivado, para probar que funciona igual.
5. Señalar que en ninguna pantalla aparece la palabra "confirmada".

**Criterio de salida:** flujo completo de extremo a extremo con datos reales, cero captura
de datos de tarjeta verificada por el CI, aviso de privacidad publicado.

---

## SPRINT 4 — Contenido institucional y de destino

**Sprint Goal:** *Que el sitio responda, sin que el huésped escriba, todo lo que pregunta
antes de decidir.*

**Criterio de entrada:** textos ES/EN entregados, o alcance recortado por acuerdo explícito.

| # | Historia | Talla |
|---|---|---|
| H4.1 | Servicios y amenidades | M |
| H4.2 | Restaurante y bar | S |
| H4.3 | Spa y experiencias | S |
| H4.4 | Galería general | S |
| H4.5 | **Ubicación y cómo llegar** | M |
| H4.6 | Contacto | S |
| H4.7 | Políticas y preguntas frecuentes | M |
| H4.8 | Aviso de privacidad y términos | S |
| H4.9 | 404, `sitemap.xml`, `robots.txt` | S |

**Guion de la demo:** recorrido completo del sitio en ambos idiomas, sin ningún enlace roto
y sin ninguna página con contenido de relleno.

**Criterio de salida:** sitio completo navegable ES/EN, cero `lorem ipsum`, cero 404 internos.

---

## SPRINT 5 — Calidad, migración y lanzamiento

**Sprint Goal:** *Que el sitio esté en producción sin perder posicionamiento y con vuelta
atrás probada.*

**Criterio de entrada:** accesos a dominio y DNS confirmados (**E2, E3**); ventana de
lanzamiento acordada fuera de temporada alta (**A4**).

| # | Historia | Talla |
|---|---|---|
| H5.1 | Auditoría WCAG 2.2 AA manual + automática | M |
| H5.2 | Core Web Vitals medidos y registrados | M |
| H5.3 | **Redirecciones 301 con prueba automatizada** | M |
| H5.4 | Pruebas en dispositivos reales | S |
| H5.5 | Revisión de seguridad y cabeceras | S |
| H5.6 | **Plan de reversión ensayado** | S |
| H5.7 | Lanzamiento y 72 h de monitoreo | S |
| H5.8 | Traspaso y capacitación grabada | M |

**Guion de la demo:** el sitio en producción sobre el dominio real, más el informe de salida
con evidencia medida.

**Criterio de salida:** producción estable, 301 verificadas, reversión ensayada, manager
capacitado.

---

## Definition of Ready — para que una historia entre a un sprint

- [ ] Criterios de aceptación escritos y verificables
- [ ] **El contenido definitivo existe**, o hay placeholder aprobado con fecha comprometida
- [ ] No depende de una decisión pendiente del cliente
- [ ] Cabe en un sprint; si no, se parte
- [ ] Dependencias técnicas resueltas (accesos, licencias, integraciones)
- [ ] Talla estimada por el equipo

> **Es el filtro más importante del proyecto.** El fallo típico en sitios de hotel es
> arrancar sprints llenos de historias bloqueadas esperando fotos. El sprint termina en cero
> y nadie sabe explicar por qué. La DoR lo hace visible **antes**.

## Definition of Done — para toda historia, sin excepción

- [ ] Funciona en móvil, tablet y escritorio (**móvil primero**: >60 % del tráfico hotelero)
- [ ] Contenido real en español **e** inglés
- [ ] Imágenes en AVIF/WebP, con `srcset`, `width`/`height` y carga diferida fuera del viewport
- [ ] SEO: `<title>` único, meta description, un solo `<h1>`, jerarquía correcta, `alt`
      descriptivo, `canonical`, `hreflang`
- [ ] **WCAG 2.2 AA**: contraste ≥ 4.5:1, navegación completa por teclado, foco visible,
      formularios con `<label>`
- [ ] **Core Web Vitals** verdes en móvil: LCP < 2.5 s · INP < 200 ms · CLS < 0.1
- [ ] Sin errores en consola
- [ ] Enlaces verificados y formularios probados de extremo a extremo
- [ ] Desplegado en staging y visible para el cliente
- [ ] Commit con mensaje convencional

> **Accesibilidad y rendimiento van aquí, no en una fase final.** Toda fase que vive al final
> se recorta cuando el calendario aprieta, y el calendario siempre aprieta. Metidos en la
> DoD, no pueden recortarse sin declarar explícitamente que se baja el estándar — que es una
> conversación mucho más difícil de tener en silencio.

---

## Priorización

**MoSCoW** para el corte de lanzamiento, con un criterio de desempate propio del negocio:

> Ante dos historias del mismo nivel, gana la que esté **más cerca de la reserva directa**.

`Solicitud de reserva → Alojamiento → Fotografía → Cómo llegar → Servicios → Restaurante → Blog`

**Regla de "Won't":** todo lo que queda fuera del lanzamiento se escribe explícitamente y se
comparte con el cliente. Lo no dicho se asume incluido, y esa asunción es la que produce la
conversación incómoda de la última semana.

---

## Tablero

GitHub Projects sobre este repositorio:

`Backlog` → `Ready` (pasó la DoR) → `En curso` (**WIP máx. 2**) → `En revisión` →
`Bloqueado` (con motivo y responsable) → `Hecho` (pasó la DoD)

> **WIP limitado y columna de bloqueados vienen de Kanban, no de Scrum.** El WIP obliga a
> terminar antes de empezar: trabajar en cinco cosas a la vez es no entregar ninguna. Y
> sacar los bloqueos a una columna propia con responsable los vuelve visibles — un bloqueo
> escondido dentro de "en curso" nadie lo escala, y termina explicándose como retraso al
> final del sprint.
