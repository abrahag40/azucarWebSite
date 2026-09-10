# Inventario de «Fotos definitivas» — sesión profesional de septiembre de 2026

> Analizado el 2026-09-10 sobre `~/Documents/Projects/azucarWeb/Fotos definitivas/`.
> **No está en el repositorio**: 2.1 GB de JPEG a 6K no se versionan. Lo que se versiona es
> la selección, ya reducida. Este documento es el mapa para hacer esa selección.

## Qué es

| | |
|---|---|
| Archivos | **210** JPEG + 2 MP4 |
| Imágenes **únicas** | **169** — hay 41 duplicados exactos (mismo md5 en dos carpetas) |
| Peso | 2.1 GB |
| Resolución | **146 a 6K** (5999×3375 y verticales) · 11 a 4K (3936×2215) · **12 a 1080** |
| Sesión | prefijo `_MLS` — 166 archivos, fechados el 2026-09-06 |

Las **12 de 1080 px son exports de Instagram** (`2_may_4.jpg`, `5_may_5.jpg`, `*_story_*`), las
mismas que ya estaban en `Hotel Azucar/`. **Se descartan**: el banner de una ficha pide 1600 px y
esas miden 1080 cuadradas. Material aprovechable real: **157 fotografías**.

## Lo que DESBLOQUEA

### 🔓 R-37 — la foto de la recepción, pedida el 2026-09-03

`Galeria/_MLS6946.jpg` (5999×3375) **es el mostrador de recepción**: muro de piedra, el logotipo
en dorado detrás, butacas y bancas de madera, lámparas de mimbre, abierto al jardín.

Se revisaron una a una las 101 fotografías de propiedad del mirror y no había ningún mostrador.
Ahora lo hay. Sirve para el banner de `/contacto/` tal como lo pidió el cliente.
`Galeria/_MLS6942.jpg` es el mismo estar desde el otro lado, y sirve igual.

### 🔓 R-34 — Arrecife y Luna dejan de no tener fotografía

| | fotos | y lo que enseñan |
|---|---|---|
| **Bongalow Arrecife** | **16** (15 exclusivas) | cama con dosel y cabecera de piedra, doble lavabo, regadera, y **el jacuzzi redondo en la propia terraza**, en cuatro tomas |
| **Bongalow Luna** | **11** (10 exclusivas) | **jacuzzi en el roof top a cielo abierto**, palapa con hamaca y camastro, **escalera de caracol**, cama con dosel, doble lavabo |

🔴 **Y esto es lo importante:** el `diferenciador` de esas dos fichas lo escribimos por
**inferencia** —de cómo la gerencia agrupó los tipos el 2026-09-02—, no porque nadie lo hubiera
dicho de ellas. Decía «el jacuzzi en la propia terraza» para Arrecife y «el jacuzzi en un roof top
propio, no en la terraza» para Luna.

**Las fotos enseñan exactamente eso.** Es la primera vez en el proyecto que una inferencia nuestra
se confirma con evidencia independiente.

### 🔓 R-29 — «Perla Blanca» existe, y no es poca cosa

Se publicó como **contenido inventado** porque no aparecía en ninguna de las 26 páginas capturadas.
Hay **15 fotografías** en dos carpetas:

- **`Perla Blanca/`** (9): terraza de azotea con **alberca larga**, deck de madera, pérgola,
  hamacas, camastros y el mar de fondo.
- **`perla blanca 2/`** (6): a pie de playa — **barra con bancos altos y cocos**, terraza blanca con
  sofá corrido bajo pérgola, y camastros bajo las palmeras vistos desde arriba.

⚠️ Que las dos carpetas se llamen igual **no prueba que sean el mismo espacio**: una está en azotea
y la otra a nivel de playa. Antes de publicar hay que preguntar si «Perla Blanca» es el conjunto, la
azotea, o el beach club — que es además la otra mitad de R-29 (**Day Pass / Beach Club**).

### Hallazgos sueltos que nadie había pedido

- **`Galeria/_MLS6943.jpg` es un ELEVADOR** con su señalética de escaleras. **El hotel tiene
  ascensor y el sitio no lo dice en ninguna parte.** Es un dato de accesibilidad que decide reservas.
- **`Historias/` son dos fotos de un NIDO DE TORTUGA acordonado** con su marcador de madera. Es
  contenido diferenciador de verdad, y no tenemos una sola línea escrita sobre ello.
- **`habitaciones/_MLS5853.jpg` es una cafetera Nespresso** con tazas y agua embotellada — amenidad
  que hoy no figura en ninguna lista de «Incluye».

## Lo que NO resuelve, y lo que ROMPE si se carga a ciegas

### 🔴 Las carpetas de habitación NO son disjuntas

41 de los 210 archivos son duplicados exactos. Entre **tipos de alojamiento**:

| tipo | fotos | **exclusivas** | comparte con |
|---|---|---|---|
| Bongalow Arrecife | 16 | 15 | Agua (1) |
| Bongalow Luna | 11 | 10 | Aire (1) |
| Hab Delux Doble vista mar | 14 | 10 | King vista mar (4) |
| Bongalow Cielo | 21 | 11 | Aire (8), Mar (2) |
| Bongalow Mar | 10 | 8 | Cielo (2) |
| Bongalow Agua | 9 | 7 | Arrecife (1), Aire (1) |
| Hab Delux king vista mar | 10 | 6 | Doble vista mar (4) |
| Hab Delux King vista selva | 9 | 6 | Doble vista selva (3) |
| Hab Delux Doble vista selva | 6 | 3 | King vista selva (3) |
| **Bongalow Aire** | **10** | **0** | Cielo (8), Luna (1), Agua (1) |

🔴 **Bongalow Aire no tiene UNA SOLA fotografía que sea suya.** Sus diez archivos son ocho tomas del
roof top idénticas byte a byte a las de Cielo, una escalera de caracol que también está en Luna y
una regadera que también está en Agua. **No hay ni una foto de su recámara.**

Ocho tomas del mismo roof top archivadas bajo dos tipos distintos significa una de dos cosas: o son
dos roof tops que se parecen, o es **uno solo** fotografiado una vez. El sitio dice «roof top
privado». **No se puede publicar la misma azotea como la azotea privada de dos tipos** sin saber
cuál de las dos cosas es.

Es el mismo criterio por el que en el sprint 3 me negué a copiarle a Arrecife las fotos de Mar: el
propio sitio promete que «cada bungalow fue decorado con identidad propia».

### ⚠️ Las habitaciones «vista mar» enseñan poco mar

En las 24 fotos de `Hab Delux king vista mar` y `Hab Delux Doble vista mar` el balcón da a palmeras
y cielo; el mar, cuando aparece, es una franja en el horizonte. **La ficha ya dice «Vistas
parciales al jardín y/o al mar»**, así que el texto es honesto y no hay que tocarlo — pero conviene
saberlo antes de elegir cuál va de portada, porque ninguna «vende mar».

### ✅ Contesta —casi— la pregunta abierta de los balcones de selva

Quedaba una pregunta de una línea desde el 2026-09-07: *¿los balcones de selva tienen también mesa
y sillas de madera, como los de mar?*

Las fotos dicen que **no**: los balcones de selva son barandal blanco con una **silla colgante**
(`_MLS6085`, `_MLS6091`), sin mesa ni sillas; los de mar llevan **hamaca tendida** y una banca. O
sea que igualar las listas «hacia arriba» habría sido inventar, como sospechábamos.

⚠️ Nueve fotos sin mesa no son una prueba de que no la haya. **Sigue siendo pregunta**, pero ahora
con evidencia detrás y se puede plantear como confirmación en vez de como duda.

### ❓ Veintisiete archivos se llaman «editar» y «para editar»

En `Galeria/`, `Perla Blanca/`, `Bongalow Agua/` y `Bongalow Mar/`. El nombre admite dos lecturas
opuestas: **que les falta retoque**, o que son justamente las que ya volvieron de retoque. Varias
son de las mejores del lote (el arco enmarcando el mar, la alberca de la azotea). **Publicar
material sin terminar es un riesgo que se evita con una pregunta.**

### ❓ Derechos de la sesión

El prefijo `_MLS` es de un fotógrafo, no del hotel. `docs/06-traspaso/traspaso-tecnico.md` ya lista
«derechos de las fotografías» como cabo suelto. Con 157 fotos nuevas el cabo pasa a ser grueso:
hace falta **confirmación por escrito de que el hotel puede publicarlas**, y saber si hay que
acreditar al autor.

## Cómo cargarlas — orden propuesto

**Regla técnica primero:** no se versionan los 6K. El sitio deriva a 768/1280/1600 WebP q50, así que
el original que entra al repositorio se reduce antes a **2400 px de lado mayor**. Meter 2.1 GB de
JPEG en git es irreversible y no aporta un píxel visible.

| # | Qué | Por qué primero | ¿Bloqueado? |
|---|---|---|---|
| 1 | **Recepción** en `/contacto/` (`_MLS6946`) | Petición explícita del cliente del 2026-09-03, pendiente desde entonces | No |
| 2 | **Arrecife y Luna**: principal + 4 de galería cada una | Son las dos fichas con marcador sobrio en vez de foto | No |
| 3 | **Los otros 8 tipos**: sustituir las 40 fotos actuales | Las de hoy son derivadas del mirror de 2025; éstas son 6K de este mes | Sólo **Aire** |
| 4 | **Galería general** (`/galeria/`): pasar de 8 a ~20 | Hay 69 fotos catalogadas para esto | No |
| 5 | **Perla Blanca / Beach Club** | Cierra R-29, que hoy es contenido inventado publicado | Sí — falta saber qué es |
| 6 | **Nido de tortuga**, ascensor, cafetera | Contenido nuevo, no sustitución | Sí — falta texto del cliente |

## Preguntas para el cliente (cuatro, y caben en un correo)

1. **Bungalow Aire**: no hay ninguna foto suya. ¿Nos mandan de su recámara? Y las ocho del roof top
   que están archivadas en Aire y en Cielo: **¿son dos azoteas o es la misma?**
2. **«Perla Blanca»**: ¿es la azotea de la alberca, la terraza de playa con la barra, o las dos?
   ¿Y es lo mismo que el Day Pass / Beach Club?
3. Los archivos llamados **«editar» / «para editar»**: ¿están terminados o les falta retoque?
4. ¿El hotel tiene los **derechos** para publicar esta sesión? ¿Hay que **acreditar** al fotógrafo?
