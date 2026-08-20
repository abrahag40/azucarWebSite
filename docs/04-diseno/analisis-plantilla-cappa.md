# Análisis de la plantilla Cappa — historia 0.7

> **Fuente:** captura HTTrack en `investigacion/mirrors/cappa` (demo1-light de duruthemes)
> **Propósito:** decidir qué se extrae y qué se descarta, según [ADR-0004](../decisiones/ADR-0004-stack-tecnico.md):
> *Cappa es fuente de **diseño**, no de código.*

---

## 1. Qué contiene

| Métrica | Valor |
|---|---|
| Páginas HTML | 41 |
| Archivos totales | 150 |
| Peso total | **18.6 MB** |
| Archivos JavaScript | **19** · 604 KB |
| Hojas de estilo | 14 · 937 KB |
| Imágenes | 52 · 7.4 MB · **0 en WebP/AVIF** |
| Tipografías | **8.2 MB** (.ttf 5.8 MB · .woff2 2.1 MB · .eot 233 KB) |
| Bloques `schema.org` | **0** |

---

## 2. 🔴 Por qué no se usa el código tal cual

La auditoría automatizada sobre la propia plantilla arroja esto:

| Hallazgo | Cifra |
|---|---|
| Páginas con el **mismo `<title>`** | 35 de 41 (*"The Cappa Luxury Hotel"*) |
| Páginas **sin `canonical`** | 41 de 41 |
| `<img>` **sin `width`/`height`** | **715** |
| Páginas con **salto de jerarquía** de encabezados | 35 |
| Páginas sin atributo `lang` | 5 |
| Datos estructurados | ninguno |

Es exactamente lo esperable de un demo comercial: **está hecho para verse bien en una
captura de pantalla, no para posicionar, ser accesible ni cargar rápido.** No es un defecto
del producto; es que su trabajo es otro.

### El JavaScript: 19 archivos que en su mayoría no necesitamos

```
jquery-3.7.1 · jquery-migrate-3.5.0 · bootstrap.min · popper.min · modernizr-2.6.2
owl.carousel.min · jquery.isotope · jquery.magnific-popup · jquery.stellar
jquery.waypoints · vegas.slider.min · select2 · datepicker · pace
smooth-scroll.min · scrollIt.min · imagesloaded.pkgd · YouTubePopUp · custom
```

Dos detalles que delatan la antigüedad de la base:

- **`jquery-migrate`** existe únicamente para que sigan funcionando APIs de jQuery ya
  retiradas. Su presencia significa que hay código escrito para una versión anterior.
- **`modernizr-2.6.2`** es de 2012. Detecta capacidades de navegador que hoy son
  universales.

> Arrastrar esto a producción hunde los Core Web Vitals antes de escribir una línea propia.
> Y contradice de frente la Definition of Done del ADR-0002. **Astro envía 0 KB de JS por
> defecto; importar 604 KB de jQuery para un carrusel sería tirar esa ventaja a la basura.**

### Las tipografías: 8.2 MB, el 44 % del peso

- **`.ttf` — 5.8 MB.** Formato de escritorio. En web pesa entre 2 y 3 veces más que WOFF2
  para el mismo resultado.
- **`.eot` — 233 KB.** Formato exclusivo de Internet Explorer. **Muerto.**
- **`.woff2` — 2.1 MB.** El único que se conserva.

Convertir todo a WOFF2 y **subconjuntar** a los caracteres que realmente usamos —latín más
acentos y ñ para ES/EN— reduce esto en más del 90 %.

---

## 3. Qué sí extraemos

Lo valioso de Cappa es el **sistema visual**, y eso se extrae sin arrastrar su
implementación:

| Se extrae | Cómo |
|---|---|
| Escala tipográfica y emparejamiento de fuentes | Tokens CSS + WOFF2 subconjuntado |
| Paleta y tratamiento del color | Custom properties en `:root` |
| Escala de espaciado y ritmo vertical | Tokens |
| Proporciones y comportamiento de la rejilla | CSS Grid nativo, sin Bootstrap |
| Composición de secciones: héroe, listado de habitaciones, galería, servicios, testimonios, contacto | Componentes de Astro con HTML semántico |
| Tratamiento de imagen: relaciones de aspecto, superposiciones, encuadres | Tokens + `<picture>` con AVIF/WebP |
| Curvas y tiempos de animación | CSS puro, respetando `prefers-reduced-motion` |

### Reemplazos uno a uno

| Cappa usa | Nosotros usamos | Por qué |
|---|---|---|
| Bootstrap grid | CSS Grid + Flexbox | Nativo, sin dependencia, menos peso |
| Owl Carousel | Scroll-snap CSS | Sin JS, accesible por teclado de origen |
| Magnific Popup | `<dialog>` nativo | Foco y `Esc` gestionados por el navegador |
| Isotope (filtros) | Filtrado en tiempo de compilación | Los datos ya están; no hace falta filtrar en el cliente |
| Stellar (parallax) | CSS, o se descarta | Suele empeorar el rendimiento percibido |
| Vegas slider | `<picture>` + CSS | — |
| Select2 | `<select>` nativo estilado | Accesible, funciona sin JS |
| Datepicker propio | `<input type="date">` | Nativo. **Y en nuestro caso ni siquiera muestra disponibilidad** (ADR-0003) |
| Pace (barra de carga) | Nada | Un sitio estático rápido no necesita simular que carga |
| Modernizr, jquery-migrate | Nada | Obsoletos |

> **Antipatrón evitado: *template-as-foundation*.** Tomar el demo como base y borrarle cosas
> encima. Suena más rápido y siempre acaba peor: heredas su marcado, su CSS muerto y su
> deuda, y cada limpieza posterior arriesga romper algo que no entiendes. **Reconstruir a
> partir del diseño cuesta más el primer día y menos todos los demás.**

---

## 4. ⚠️ Licencia — sigue bloqueando (R-01)

Cappa es una plantilla comercial de duruthemes. La captura del demo sirve para
**analizarla**; usar sus recursos en producción exige licencia.

**Qué está y qué no está cubierto por reconstruir componentes:**

| Elemento | ¿Necesita licencia? |
|---|---|
| Ideas de composición, jerarquía, proporciones | ❌ No — no son objeto de derechos de autor |
| Sus imágenes de demostración | ✅ Sí — **y de todos modos las sustituimos por fotografía del hotel** |
| Sus archivos de tipografía | ✅ Sí — verificar la licencia de cada familia por separado |
| Su CSS y su JS | ✅ Sí — **no los usamos** |
| Sus iconos | ✅ Sí — sustituibles por un set libre |

**Camino de menor fricción:** comprar la licencia de todos modos. Cuesta poco, elimina toda
discusión, y da acceso a los archivos fuente originales —que son mejores que lo que se
obtiene de un demo minificado—. Decide Abraham.

---

## 5. Entrada al sprint 1

Con esto, la historia **1.3 (design tokens)** deja de estar bloqueada. El trabajo concreto:

1. Extraer paleta, escala tipográfica y escala de espaciado a `tokens.css`
2. Identificar las familias tipográficas y verificar su licencia web
3. Convertir a WOFF2 y subconjuntar a latín + acentos + ñ
4. Reconstruir por orden de aparición: encabezado y navegación, héroe, tarjeta de
   alojamiento, galería, pie
5. Cada componente sale con la DoD completa: teclado, foco visible, contraste ≥ 4.5:1,
   `width`/`height` en toda imagen
