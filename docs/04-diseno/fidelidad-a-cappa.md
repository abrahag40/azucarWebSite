# ¿Cuánto se parece el sitio a la plantilla? — medición, no impresión

> **Fecha:** 2026-08-21 · **Referencia:** `demo1-light/index11.html`, servida en local
> junto al sitio para comparar estilos calculados elemento por elemento.
> **Encargo del cliente:** *un sitio visualmente igual a la plantilla, adaptado al hotel.*

---

## Resumen

**Idéntico en el sistema de diseño. Más corto en el contenido.** El sitio no es una
plantilla distinta con otra piel: es la misma plantilla con menos secciones, y las que
faltan **faltan por un motivo declarado**, no por descuido.

---

## 1. Lo que es exactamente igual

Medido con `getComputedStyle` sobre las dos páginas servidas a 1280 px:

| | Cappa | Azúcar |
|---|---|---|
| Tipografía de cuerpo | Barlow | **Barlow** |
| Tipografía de titulares | Gilda Display | **Gilda Display** |
| Tipografía de interfaz | Barlow Condensed | **Barlow Condensed** |
| Color de acento | `rgb(170,132,83)` | **`#aa8453`** — el mismo |
| Color de titular | `#222` | **`#222`** |
| Color de párrafo | `#666` | **`#666`** |

Son las tres tipografías exactas y el acento exacto. No es una aproximación.

### La composición también

| Pieza | Cappa | Azúcar |
|---|---|---|
| Cabecera | transparente sobre el héroe, logotipo con subtítulo a la izquierda, navegación condensada en mayúsculas a la derecha | igual |
| Héroe | foto a sangre, antetítulo espaciado, titular serif enorme en mayúsculas, botón, indicador de scroll | igual |
| Bloque «about» | antetítulo → título serif → párrafos → etiqueta «Reservation» → **teléfono en color de acento** | igual, con «Solicitar reserva» y el teléfono del hotel |
| Ritmo | secciones alternando fondo blanco y fondo cálido, con una franja de imagen a sangre en medio | igual |

El bloque de presentación es una reproducción pieza por pieza, incluido el detalle del
teléfono grande en color de acento al final.

---

## 2. Densidad — medido contra el sitio EN VIVO, no contra la captura

Abraham señaló que la portada tenía menos que el original y pasó la URL real. Se midieron
las dos con la misma vara, a 1280 px:

| | Cappa en vivo | Azúcar |
|---|---|---|
| Alto de la portada | **9 231 px** | **9 134 px** |
| Secciones | 10 + pie | 10 + pie |

**97 píxeles de diferencia, un 1 %.** La captura HTTrack, por cierto, era fiel: daba 9 371.

Para llegar ahí hicieron falta dos cambios que no eran de maquetación sino de **densidad**:

| | Antes | Ahora | Cappa |
|---|---|---|---|
| Tipos de alojamiento en portada | 3 | **6** | 5 |
| Sección de experiencias | 809 px, 3 columnas | **1 538 px, filas alternadas** | 1 760 px |

La sección `services` de Cappa mide 1 760 px porque son **cuatro filas de 380 px a media
pantalla** —foto en un lado, texto en el otro, alternando el lado— y no tres columnas. En
tres columnas lo mismo ocupa la mitad y se lee como un pie de foto. Se reprodujo el reparto
exacto.

> **La lección:** la diferencia no estaba en cuántas secciones había, sino en **cuánto pesa
> cada una**. Contar secciones daba 10 contra 10 desde hacía rato, y aun así el original se
> veía el doble de sustancioso.

## 3. Lo que falta, y por qué

Cuatro de las diez secciones de Cappa **no pueden existir en este proyecto**.

| Sección de Cappa | Alto | Estado | Motivo |
|---|---|---|---|
| `about` | 720 | ✅ construida | — |
| `rooms1` | 1225 | ✅ construida | — |
| `pricing` | 767 | 🔴 **no se construye** | Muestra tarifas. La regla 3 exige que todo total incluya impuestos y **C3 sigue sin respuesta**. Publicar un «desde $X» sin impuestos es la queja que este proyecto existe para curar |
| `video-wrapper` | 500 | 🟡 sustituida | El hotel no tiene vídeo. Se sustituye por una franja de imagen a sangre, que conserva el respiro visual |
| `facilties` | 850 | ✅ construida | — |
| `testimonials` | 585 | ⬜ **sin construir** | El hotel **sí tiene reseñas** en TripAdvisor y Google. Es la única ausencia sin justificación de fondo |
| `services` | 1760 | 🟡 movida | Existe como página `/servicios/`, no como sección de portada |
| `news` (blog) | 918 | 🔴 no se construye | No hay blog, ni contenido, ni quien lo escriba. Un blog vacío daña más de lo que aporta |
| `clients` | 137 | 🔴 no aplica | Logotipos de marcas asociadas. Un hotel boutique no los tiene |

> **La conclusión honesta:** de las diferencias de contenido, **una sola es una tarea
> pendiente** —los testimonios—. El resto son decisiones tomadas y escritas.

---

## 4. Lo que era distinto sin buena razón, y se corrigió

Aquí es donde la comparación medida sirvió de algo. La **separación entre letras** es la
firma tipográfica más característica de esta plantilla, y la teníamos muy por debajo:

| Elemento | Cappa | Antes | Ahora |
|---|---|---|---|
| Titular del héroe | 0.273em | 0.060em *(22 %)* | **0.200em** |
| Antetítulo de sección | 0.400em | 0.120em *(30 %)* | **0.280em** |
| Enlace de navegación | 0.200em | 0.160em | **0.200em** — idéntico |

Y de paso destapó una **incoherencia nuestra**: el mismo elemento —el antetítulo— llevaba
0.28em en el héroe y 0.12em en las secciones. Había un único token `--tracking-wide: 0.12em`
sirviendo para antetítulos, navegación, botones y etiquetas, lo que aplanaba una jerarquía
que en Cappa tiene tres niveles. Ahora hay tres tokens.

**El antetítulo no llega a 0.400em a propósito:** a 14 px eso parte «ZONA HOTELERA DE TULUM ·
FRENTE AL MAR» en un móvil de 320 px. Se queda en 0.28em, medido.

### Un efecto colateral que enseña algo

Subir el selector de idioma de 0.12em a 0.20em ensanchó la fila de la cabecera **ocho
píxeles**, y con eso «Solicitar reserva» pasó a dos renglones. Ocho píxeles. La cabecera iba
al límite y nadie lo sabía porque nunca se había medido. Corregido con `white-space: nowrap`.

---

## 5. Lo que es distinto a propósito, y no se va a cambiar

| Diferencia | Por qué |
|---|---|
| Cuerpo de 16 px, no 15 px | Por debajo de 16 px, Safari en iOS hace zoom al enfocar un campo y descoloca la página |
| El héroe lleva un párrafo bajo el titular | Cappa vende una plantilla; nosotros vendemos un hotel concreto y hay que decir cuál |
| Botón de reserva en la cabecera | Cappa no lo tiene. Es el objetivo del proyecto: la reserva directa |
| Dos botones en el héroe, no uno | «Solicitar reserva» y «Ver alojamiento» son los dos caminos reales |
| Sin las 14 portadas alternativas | Un sitio tiene una portada |
| Sin las animaciones de aparición al hacer scroll | Cappa las hace con jQuery más WOW.js. Cuestan 128 KB de JavaScript, y el sitio tiene **cero**. Además desaparecen con `prefers-reduced-motion`, así que la mitad del efecto no se ve |

---

## 6. Y el asterisco que hay que decir en voz alta

La fidelidad visual está donde puede estar **con las fotografías que hay**. Cappa se
fotografía como un catálogo: interiores oscuros, luz controlada, encuadres amplios. El
archivo del hotel son 244 fotos de calidad desigual, tomadas a mediodía y en su mayoría
verticales — se comprobó una a una al montar la galería.

Eso explica buena parte de la distancia que queda, y **no se cierra con CSS**. Si el cliente
quiere acercarse más, la palanca no es el código: es una sesión de fotografía.

### Las tomas que faltan, concretas

Al montar las secciones nuevas quedó claro qué falta exactamente, y no es «más fotos»:

| Falta | Para qué | Qué se usa mientras |
|---|---|---|
| **La alberca infinita como sujeto** | Es una de las tres razones para venir y no hay ni una toma suya. Sólo aparece de fondo en la de la terraza | La terraza con hamaca, donde el agua se ve al fondo |
| Una toma apaisada del roof top con gente | Todas las del roof top están vacías, y un hotel vacío se lee como cerrado | La del jacuzzi |
| Un plano general del hotel desde la playa | Es la foto que un huésped busca para hacerse una idea del conjunto | No hay sustituto |

Tres tomas. Es una mañana de trabajo, y cierra más distancia con la plantilla que cualquier
cosa que se pueda hacer en CSS.
