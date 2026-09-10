# Medición de calidad — evidencia de H5.2 y H5.1

> **Fecha de la medición:** 2026-08-21
> **URL medida:** https://azucar-hotel-tulum.pages.dev
> **Herramientas:** Lighthouse 13.4.1 · axe-core 4.13.0 · html-validate 11
> **Reproducible:** los comandos están abajo.

---

## 1. Core Web Vitals — criterio de aceptación de H5.2

> **Corrección, dicha en voz alta.** H5.2 estuvo marcada como *«requiere PageSpeed desde el
> navegador de Abraham»*. **Era falso.** Chrome está instalado en la máquina de trabajo y
> Lighthouse es el mismo motor que PageSpeed, con el mismo estrangulamiento móvil 4G que
> pide el criterio. Se podía medir desde el principio; no se hizo por una suposición que
> nadie comprobó.

Móvil, estrangulamiento `simulate` —el que usa PageSpeed Insights—, tres pasadas:

| Métrica | Umbral | Medido | |
|---|---|---|---|
| **LCP** | < 2.5 s | **1.33 – 1.86 s** | ✅ |
| **CLS** | < 0.1 | **0.003** | ✅ |
| **TBT** *(sustituto de INP en laboratorio)* | < 200 ms | **0 – 26 ms** | ✅ |

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP |
|---|---|---|---|---|---|
| Portada | **99** | **100** | **100** | 92 ⚠️ | 1.33 s |
| `/reservar/` | 95 | **100** | **100** | 92 ⚠️ | 2.16 s |
| Ficha de suite | 90 | **100** | **100** | 92 ⚠️ | 2.01 s |

> **INP no se mide en laboratorio.** Requiere interacción real de personas y sólo aparece en
> los datos de campo de Chrome UX Report, que necesita tráfico. TBT es el sustituto
> aceptado, y con **cero JavaScript de terceros** está en el suelo. Queda para H5.7.

### ⚠️ El SEO 92 es un artefacto de nuestra propia CSP, y `robots.txt` está bien

La única auditoría de SEO que falla es `robots-txt`, con esta explicación:

```
Fetch of robots.txt failed: Protocol error (Network.loadNetworkResource): CSP violation
```

**Lighthouse no puede leer el archivo porque nuestra CSP se lo bloquea** (`connect-src
'none'`). Comprobado de forma concluyente: la misma página servida en local, **sin la
cabecera CSP**, da **SEO 100** y la auditoría pasa.

**No se toca la CSP para subir un número.** Googlebot pide `robots.txt` como petición HTTP
de primer nivel, no desde el contexto de la página, así que no le afecta. La directiva
pasará a `connect-src 'self'` en el sprint 3, cuando el formulario tenga a dónde enviar
(H3.4) — y entonces esto se resolverá como efecto colateral, no como objetivo.

> ⚠️ **Aviso para la demo:** quien pase la URL por PageSpeed —incluido el cliente— verá
> **92 y «robots.txt is not valid»**. Conviene tener la explicación a mano.

### Lo que Lighthouse encontró y ningún auditor de marcado podía ver

| Hallazgo | Estado |
|---|---|
| **`/favicon.ico` → 404 en cada visita**, anotado como error de consola | ✅ iconos declarados. Buenas prácticas 96 → **100** |
| **LCP con 655 ms de «resource load delay»** — el navegador no descubría la foto del héroe hasta procesar el CSS | ✅ `<link rel="preload" as="image">` con `imagesrcset` idéntico al del `<img>` |
| El comentario de `Base.astro` afirmaba que el `<h1>` es el elemento LCP | ✅ corregido: es `img.hero__fondo`, 412×730 px |

---

---

## 1-bis. Core Web Vitals **con el vídeo del héroe** — 2026-09-10

> **Por qué existe esta sección.** La medición de arriba es del **2026-08-21**, y el vídeo del
> héroe entró el **2026-09-07**. Es decir: durante tres semanas el sitio publicó un vídeo de
> fondo de 1.5–2.1 MB **sin que nadie hubiera medido su efecto en los Core Web Vitals**. Los
> números de `CLAUDE.md` eran de la época de sólo fotografía.
>
> Se mide ahora con el vídeo fusionado de los dos reels (17.5 s), y se mide **con un A/B**, no
> con una pasada suelta.

### El método: una sola variable

El componente `VideoHero.astro` **no descarga ni un byte** cuando el navegador pide
`prefers-reduced-motion: reduce`. Eso permite un A/B perfecto sobre **la misma URL y el mismo
build**, sin desplegar nada distinto:

```bash
# CON vídeo
npx --yes lighthouse@13 https://azucar-hotel-tulum.pages.dev/ \
  --chrome-flags="--headless=new" --form-factor=mobile --output=json --output-path=con.json
# SIN vídeo — misma página, el componente se abstiene
npx --yes lighthouse@13 https://azucar-hotel-tulum.pages.dev/ \
  --chrome-flags="--headless=new --force-prefers-reduced-motion" --form-factor=mobile \
  --output=json --output-path=sin.json
```

**Siete pasadas de cada una.** No tres: con tres, las dos primeras con vídeo salieron lentas por
azar y daban una diferencia de LCP de 210 ms que **no existe**. Ver L-141.

Verificado en cada informe, no supuesto: las pasadas «con» descargan **1 archivo de vídeo y
1499 KB**; las pasadas «sin» descargan **0 archivos y 151 KB en total**.

### Móvil, estrangulamiento `simulate` — 7 + 7 pasadas

> **Re-medido el 2026-09-10 por la tarde**, después de cambiar de toma el plano 2 del montaje
> (commit `02ae860`). Las cifras de abajo son las del vídeo **que está desplegado hoy**.

| Métrica | Umbral | **con vídeo** | sin vídeo | diferencia | |
|---|---|---|---|---|---|
| **LCP** (mediana) | < 2.5 s | **1.86 s** | 1.85 s | **+10 ms** | ✅ |
| **CLS** | < 0.1 | **0.000** | 0.000 | 0 | ✅ |
| **TBT** | < 200 ms | **0 ms** | 0 ms | 0 | ✅ |
| Speed Index *(no es CWV)* | — | 1.64 s | 1.23 s | **+410 ms** | ⚠️ |
| Rendimiento | — | **99** | 99 | 0 | |

LCP por pasada — **los dos grupos se dispersan igual**, y ésa es la conclusión:

```
con vídeo   1.82  1.83  2.07  1.87  1.86  1.85  2.06     mediana 1.86
sin vídeo   1.99  1.85  1.83  1.81  1.88  1.89  1.84     mediana 1.85
```

Los 10 ms de diferencia caen dentro del ruido de cualquiera de los dos grupos por separado.
**El vídeo no mueve el LCP de forma medible.**

**TBT = 0 ms en las CATORCE pasadas.** En la primera tanda hubo un 1217 ms suelto que resultó ser
el arranque en frío de la máquina; ahora se tira una **pasada de calentamiento** antes de contar, y
el valor anómalo no ha vuelto a aparecer. La receta de L-141, funcionando.

### El cambio de toma no costó nada, y el CONTROL lo demuestra

El plano 2 se cambió de toma a mediodía. Comparar contra la medición de la mañana sería comparar
dos momentos distintos… salvo que el brazo **sin vídeo** sirve de control: si el sitio sin vídeo
mide hoy lo mismo que hace unas horas, las condiciones no han cambiado y la comparación vale.

| | mañana (vídeo v1) | tarde (vídeo v2) | Δ |
|---|---|---|---|
| **control** — sin vídeo, LCP | 1.84 s | 1.85 s | +10 ms |
| **control** — sin vídeo, Speed Index | 1.24 s | 1.23 s | −10 ms |
| con vídeo, LCP | 1.86 s | 1.86 s | **0** |
| con vídeo, Speed Index | 1.64 s | 1.64 s | **0** |

El control se mueve 10 ms, o sea nada: las condiciones son las mismas. Y con eso sobre la mesa, el
vídeo nuevo mide **exactamente igual** que el anterior. Tiene sentido —cambió un plano de once y el
peso apenas se movió, 2903 KB contra 2920 KB— pero **una explicación plausible no es una medición**,
y por eso se midió.

### Escritorio — 3 pasadas, con el archivo MÁS pesado (2141 KB)

| Rendimiento | LCP | CLS | TBT |
|---|---|---|---|
| **100** · 100 · 100 | 0.54 – 0.57 s | 0.001 | 0 ms |

### Las tres cosas que esto demuestra, y la que cuesta

1. **El elemento LCP es la fotografía en 33 de los 34 informes**, con vídeo y sin él.

   🔴 **Y la excepción importa, así que se dice.** El único informe donde el LCP es el `<video>` es
   la **primera pasada de la primera tanda**: la de arranque en frío, con Chrome abriéndose por
   primera vez y `npx` descargando Lighthouse en paralelo, que dio TBT 1217 ms y rendimiento 70
   cuando las demás dieron 0 y 99. Con la máquina así de asfixiada la fotografía pinta tarde, el
   `requestIdleCallback` del vídeo llega a dispararse dentro de la ventana de LCP y **el primer
   fotograma del vídeo gana**.

   O sea: **el diseño no garantiza que el vídeo nunca sea LCP — garantiza que no lo sea mientras la
   máquina responda.** En condiciones normales no pasó ni una vez en 14 pasadas. Y aun en esa
   pasada patológica el LCP fue de **2.39 s, por debajo del umbral de 2.5 s**, así que el criterio
   se cumplió igualmente.

   Es la razón de fondo por la que se descarta la pasada de calentamiento: no sólo porque el número
   sea feo, sino porque **mide una máquina que ningún visitante tiene**.
2. **El vídeo se pide DESPUÉS del LCP, y se puede fechar — en las siete pasadas, no en una.**

   | pasada | la foto del LCP termina | el vídeo se pide | separación |
   |---|---|---|---|
   | 1 | 197 ms | 265 ms | 68 ms |
   | 2 | 191 ms | 276 ms | 86 ms |
   | 3 | 253 ms | 318 ms | 66 ms |
   | 4 | 244 ms | 326 ms | 82 ms |
   | 5 | 210 ms | 282 ms | 73 ms |
   | 6 | 186 ms | 243 ms | 57 ms |
   | 7 | 194 ms | 272 ms | 79 ms |

   Mediana **73 ms**, mínimo 57. **Ninguna separación es negativa**: el vídeo nunca se pide antes de
   que la fotografía haya terminado. No compiten por el ancho de banda.
3. **`prefers-reduced-motion` funciona en producción**, no sólo en el código: 0 bytes de vídeo.
4. ⚠️ **Lo que sí cuesta es el Speed Index: +400 ms** (1.64 contra 1.24 s), y es real —los rangos
   apenas se solapan—. Tiene sentido: el SI mide con qué rapidez se llena visualmente la pantalla,
   y un vídeo que se funde encima al segundo cambia píxeles tarde por definición. **El Speed Index
   no es un Core Web Vital** y el rendimiento se queda en 99 igual, así que no cambia ningún
   veredicto — pero es el precio del vídeo y conviene tenerlo escrito.

### ⚠️ Un dato que NO se explica con el vídeo, y no se cierra aquí

La medición del 2026-08-21 daba **LCP 1.33 s** en la portada. Hoy, **sin vídeo**, da 1.84 s. La
diferencia no es el vídeo —el A/B lo descarta— y desde agosto han entrado páginas nuevas, una
paleta nueva y contenido nuevo. Puede ser el sitio o puede ser la red del día: **con estos datos
no se puede atribuir**, y afirmarlo sin más medición sería inventar una causa. Queda anotado como
pregunta abierta, no como hallazgo.


## 2. Accesibilidad — axe-core, el motor de la industria

**22 páginas · 33 a 44 comprobaciones superadas cada una · CERO violaciones.**

Etiquetas evaluadas: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` y
`best-practice`. Lighthouse, que usa el mismo motor con un subconjunto, da **100** en las
tres páginas medidas.

Lo único que axe deja en «incompleto» es `color-contrast`, y su motivo es exactamente el
límite que ya conocíamos: **no puede juzgar texto sobre una fotografía**. Eso se resolvió
aparte, muestreando los píxeles reales de la imagen y componiendo los velos —ver L-048—,
con el resultado más ajustado en **4.93:1** frente al 4.5 exigido.

---

## 3. Validez del HTML — `html-validate`

**0 incidencias en las 38 páginas.** Se partió de 202. El razonamiento de las dos reglas
desactivadas está en [`validacion-html.md`](validacion-html.md).

---

## Cómo repetir la medición

```bash
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx --yes lighthouse@13 https://azucar-hotel-tulum.pages.dev/ \
  --chrome-flags="--headless=new" --form-factor=mobile --view
```

```bash
cd site && npm run build
npx --yes html-validate@11 --config ../.htmlvalidate.json "dist/**/*.html"
```

Para axe-core hay que inyectarlo en cada página desde el mismo origen —la CSP sólo permite
`script-src 'self'`—: se copia `axe.min.js` a `dist/`, se corre `axe.run()` sobre cada
página **con el CSS ya aplicado**, y se borra el archivo al terminar.

> 🔴 **La trampa de este método, y costó dos mediciones equivocadas.** Si se ejecuta axe
> antes de que el CSS se haya aplicado, devuelve decenas de violaciones falsas de
> `target-size`: sin estilos, todo mide la altura de una línea. La primera pasada dio **10
> páginas con 13 a 28 violaciones**; con espera suficiente, **cero**. Hay que esperar a que
> una variable CSS resuelva antes de medir. Ver L-047.
