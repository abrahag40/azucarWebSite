# Validación de HTML — `html-validate`

```bash
cd site && npm run build
npx --yes html-validate@11 --config ../.htmlvalidate.json "dist/**/*.html"
```

## Por qué con `npx` y no como dependencia del proyecto

Es una comprobación **periódica**, no una puerta de cada commit: el marcado lo generan
componentes, así que un error nuevo sólo aparece cuando se toca un componente. Meterla en
`package.json` añadiría más de cien paquetes al árbol de un sitio que hoy tiene cinco
dependencias, para ejecutarla una vez cada varios sprints. La versión va **fijada** en el
comando (`@11`) para que el resultado sea reproducible.

Mismo criterio que los auditores de `scripts/`: se corren cuando toca, no en cada empuje.

## Reglas desactivadas, y por qué cada una

### `no-redundant-role` — desactivada, y es la que importa

La regla dice que `role="list"` sobra en un `<ul>`, y **tiene razón según la
especificación**. En la práctica no: **Safari con VoiceOver retira la semántica de lista de
cualquier `<ul>` que tenga `list-style: none`**. Es una optimización deliberada de WebKit
para no anunciar «lista de 6 elementos» en menús y rejillas maquetados con listas.

Los siete `<ul>` señalados usan los siete `list-style: none`. Quitarles `role="list"` haría
que un usuario de VoiceOver dejara de oír cuántos elementos tiene la galería, cuántas
amenidades hay o cuántas políticas. Se queda.

> **Lo que enseña:** una regla de linter codifica la especificación, no el comportamiento
> real de los navegadores. Cuando las dos discrepan, gana el navegador — pero hay que
> **dejar escrito por qué**, o el siguiente que pase «arreglará» la desactivación.

### `tel-non-breaking` — desactivada a medias, y conviene entender por qué

La regla quiere que un teléfono no se pueda partir, y tiene razón. Propone dos remedios:
espacio duro (U+00A0) para los espacios y **guion duro (U+2011)** para el guion.

Los espacios sí se hicieron así, en `src/data/hotel.ts`. El guion **no**, y no es pereza:
U+2011 es un carácter poco frecuente y no hay garantía de que sobreviviera al subconjunto
latino con el que se recortó Barlow. Si el glifo no está en el archivo, el navegador **no
cae a otra tipografía**: dibuja un cuadrado. Cambiar un problema de maquetación por un
carácter roto no es un arreglo.

La clase `.telefono` con `white-space: nowrap` consigue lo mismo sin depender de ningún
glifo, y además impide que rompa por los paréntesis, cosa que el guion duro no resolvería.

> **Lo que enseña:** el remedio que propone un linter es *una* solución, no *la* solución.
> Aquí la regla tenía razón en el diagnóstico y no en el tratamiento.

### Las cosméticas

`void-style`, `attribute-boolean-style` y `no-trailing-whitespace` son preferencias de
formato sobre HTML que **genera Astro**, no personas. `require-sri` pide integridad en
recursos externos y aquí no hay ninguno: cero orígenes de terceros.

## Lo que sí encontró, y se corrigió

| Regla | Qué era | Estado |
|---|---|---|
| `unique-landmark` ×38 | Los dos `<nav>` de la cabecera con la **misma** etiqueta «Menú» | ✅ nombres distintos |
| `element-required-attributes` ×18 | El `<img>` del visor sin `src` hasta abrirse: HTML inválido, y algún navegador lo resuelve contra la URL de la página | ✅ GIF transparente en `data:` |
| `tel-non-breaking` ×42 | Teléfonos que pueden partirse a mitad de línea | ✅ espacios duros |

El de `unique-landmark` destapó además un hueco en `scripts/auditar-accesibilidad.mjs`: su
regla exigía que varias `<nav>` tuvieran nombre, **no que fuera único**. Corregido allí
también, que es donde evita que vuelva a pasar.
