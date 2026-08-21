# Scripts

## `ingest-mirror.sh` — traer las capturas HTTrack al repositorio

```bash
./scripts/ingest-mirror.sh /Users/abraham/Documents/Projects/azucarWeb
```

Procesa las tres capturas (`actualWebsite`, `propuestaAnterior`, `plantillaBase`) en una
sola ejecución, genera manifiesto y resumen de cada una, y **hace commit y push solo**.

Se ejecuta en la máquina local porque el entorno remoto de Claude no tiene acceso al
sistema de archivos del equipo. No es una limitación del método: el mirror versionado es
el artefacto correcto de todos modos (ADR-0001).

## `auditar-accesibilidad.mjs` — WCAG sobre el marcado

```bash
node scripts/auditar-accesibilidad.mjs site/dist
```

Recorre todas las páginas del build y comprueba lo que se puede afirmar **leyendo el
HTML**: jerarquía de encabezados (1.3.1), landmarks y salto al contenido (2.4.1), nombres
accesibles de los enlaces (2.4.4), idioma del documento (3.1.1) y de los fragmentos que
cambian de idioma (3.1.2), identificadores duplicados (4.1.1), etiquetas de formulario
(4.1.2), `tabindex` positivos (2.4.3) y `alt` (1.1.1). Sale con código 1 si hay fallos.

**Qué NO comprueba, y por qué está escrito en el propio script:** contraste real, tamaño de
los objetivos táctiles y visibilidad del foco necesitan estilos calculados, así que se miden
en el navegador sobre una página representativa de cada tipo de componente. Dar un informe
en verde sobre algo que no se ha mirado sería peor que no comprobarlo.

> **Calíbralo antes de creerle.** Si devuelve cero hallazgos, pásalo por la captura del
> sitio vigente —`investigacion/mirrors/azucarhotel/archivos`—, que tiene violaciones
> reales y documentadas: debe encontrar unas 680 en 25 tipos. Un comprobador que pasa sin
> haber demostrado que sabe fallar no es evidencia de nada (L-035).

## `verificar-despliegue.mjs` — ¿está sano este despliegue?

```bash
node scripts/verificar-despliegue.mjs https://azucar-hotel-tulum.pages.dev
node scripts/verificar-despliegue.mjs https://azucarhotel.com
```

Responde de forma binaria si un despliegue cumple el **criterio de reversión** de
`docs/05-despliegue/plan-de-reversion.md`. Se corre antes del cambio, justo después, y a
los 15 min, 1 h, 6 h, 24 h y 72 h de la vigilancia posterior.

Distingue a propósito entre **fallo** —página caída, redirección rota o mal dirigida, señal
de SEO perdida, portada con `noindex`, la interfaz prometiendo «reserva confirmada»— y
**aviso**, que hay que arreglar pero no justifica revertir. Confundir las dos categorías es
lo que lleva a revertir por algo cosmético o a no revertir por algo grave.

> 🚨 **Una salida cambia el procedimiento entero.** Si aparece «Página de datos de tarjeta
> viva», **NO se revierte**: revertir restauraría justo el sitio que captura tarjetas y CVV.
> Se despublican esas rutas y se sigue adelante.

Calibrado contra el sitio vigente, donde debe encontrar 19 fallos. Sale con código 1 si
alguno se cumple.

## `verificar-301.mjs` — redirecciones del relanzamiento

```bash
node scripts/verificar-301.mjs site/dist
node scripts/verificar-301.mjs https://azucar-hotel-tulum.pages.dev
```

Comprueba que **toda URL que existía en el sitio vigente** —lista tomada de la captura, que
es la única fuente de verdad mientras el sitio viejo siga en pie— tiene destino y que ese
destino responde. Detecta cadenas y bucles, distingue «pendiente de construir» de «roto», y
**falla si alguna de las dos páginas de datos de tarjeta llega a resolver**: ésas deben caer
en 404 a propósito.

Contra una URL real comprueba además que el código sea 301 y no 302. El mapa y su
razonamiento están en `docs/05-despliegue/mapa-301.md`.

## `audit-mirror.mjs` — auditoría automatizada sobre una captura

```bash
node scripts/audit-mirror.mjs investigacion/mirrors/azucarhotel
```

Sin dependencias: Node puro. Produce `informe.md` (para humanos) y `datos.json` (para el
siguiente paso del análisis) dentro de la carpeta de la captura.

**Qué revisa:** integridad y peso · SEO on-page (title, description, canonical, h1,
jerarquía de encabezados, robots) · i18n (`lang`, `hreflang`, equilibrio ES/EN) ·
accesibilidad (alt, lang, jerarquía) · rendimiento (peso de imágenes, formatos modernos,
`width`/`height` y por tanto CLS) · datos estructurados schema.org · huella tecnológica
(WordPress, tema, plugins, jQuery) · dominios externos referenciados · formularios y su
destino · enlaces de reserva y a dónde apuntan realmente.

### Por qué la auditoría es un script y no una lectura manual

1. **Reproducible.** Mismo mirror, mismo resultado. Un hallazgo que no se puede reproducir
   no se puede defender ante el cliente.
2. **Comparable.** Al terminar el proyecto se corre contra el sitio nuevo y el "antes y
   después" sale con la misma vara, no con dos opiniones.
3. **Exhaustivo.** Nadie revisa 40 páginas a mano sin saltarse ninguna. La máquina no se
   cansa en la página 31.
4. **Auditable.** El criterio de cada hallazgo está en el código y se puede discutir. "Me
   pareció lento" no se puede discutir.

*Antipatrón evitado: la auditoría-opinión — un documento de hallazgos que nadie puede
verificar ni repetir, y que envejece el día que el sitio cambia.*
