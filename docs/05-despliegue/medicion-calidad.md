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
