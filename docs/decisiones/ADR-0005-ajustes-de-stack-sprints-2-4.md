# ADR-0005 — Ajustes del stack durante los sprints 2 a 4

- **Fecha:** 2026-08-20
- **Estado:** Aceptado
- **Decisor:** Claude (líder de proyecto), con visto bueno de Abraham sobre la dirección
- **Complementa a** [ADR-0004](ADR-0004-stack-tecnico.md). No lo sustituye: Astro estático
  sobre Cloudflare Pages sigue vigente sin cambios.

## Contexto

Construir los sprints 2 y 4 obligó a tomar cuatro decisiones técnicas con consecuencias que
ADR-0004 no cubría. Se registran juntas y no en cuatro ADR separados **a propósito**: son
variaciones dentro de una decisión de stack ya tomada, y cuatro documentos para esto sería la
ceremonia desproporcionada que `CLAUDE.md` §2.5 manda evitar. *Rigor sí, burocracia no.*

---

## Decisión 1 — El primer JavaScript del sitio: el visor de la galería

**Se acepta JavaScript en el visor de fotografías, y sólo ahí.**

ADR-0004 no dice «cero JavaScript»: dice cero **salvo que una función concreta lo exija**. La
distinción importa, porque hasta aquí ninguna lo había exigido:

| Función | Cómo se resolvió | ¿Necesitó JS? |
|---|---|---|
| Menú desplegable | `<details>` / `<summary>` | No |
| Acordeón del FAQ | `<details>` / `<summary>` | No |
| Carrusel | Descartado; rejilla con scroll-snap | No |
| Ampliar una foto con foco atrapado y flechas | `<dialog>` + 897 bytes | **Sí** |

No existe primitiva de HTML que atrape el foco dentro de un visor y lo navegue con flechas.
`<dialog>.showModal()` da la mitad —trampa de foco, cierre con `Esc`, inercia del resto de la
página—; la otra mitad hay que escribirla.

**Coste acotado:** 897 bytes en línea, sin petición extra, sin dependencias, y **sólo en las
16 páginas que tienen galería**. La portada sigue con cero scripts. Cappa resolvía lo mismo
con Magnific Popup (41 KB) sobre jQuery (87 KB).

**Condición que se mantiene:** funciona sin JavaScript. Las miniaturas son enlaces a la imagen
grande; el script *intercepta* ese clic, no construye la galería.

> **Precedente que se establece, y su límite.** Este ADR no abre la puerta a «JavaScript
> cuando convenga». La prueba para el siguiente caso es la misma: demostrar que **ninguna
> primitiva nativa lo resuelve**, y que el coste queda acotado a la página que lo usa.

---

## Decisión 2 — AVIF se evalúa y se descarta

**Las imágenes se sirven en WebP. No se emite AVIF.**

La historia H2.5 pedía «AVIF/WebP con srcset y respaldo». Se implementó y se midió sobre las
44 imágenes reales del proyecto:

```
AVIF gana en 22 · pierde en 22 · ahorro neto 5 % · peor caso +39 %
por tamaño de origen:  >=1000px −1 %   ·   <1000px −5 %
```

Tres razones para no llevarlo a producción:

1. **El navegador elige AVIF a ciegas** cuando se le ofrece. En la mitad de las imágenes eso
   significa servir un archivo más pesado: no es una mejora opcional, es un empeoramiento
   activo en la mitad de los casos.
2. **El build pasa de 2 s a 63 s.** Veinte veces más CI por un 5 %.
3. **Causa raíz:** las fuentes ya son WebP con pérdida, comprimidas por WordPress.
   Recodificar de *lossy* a *lossy* no recupera información.

**Lo que sí se adoptó:** bajar la calidad de 70-72 a **50**, verificado comparando recortes al
100 %. Quita un **20 %** del peso sin diferencia perceptible.

**Reversible, y con disparador escrito:** si el cliente entrega la fotografía original —carril
de Abraham, junto con R-01—, AVIF se reevalúa. Con originales suele ganar entre un 30 y un
50 %.

---

## Decisión 3 — `build.format: 'preserve'`

**La salida conserva la estructura de `src/pages` en vez de generar un directorio por página.**

Con el valor por defecto (`'directory'`), `src/pages/en/404.astro` se emite como
`en/404/index.html`. Cloudflare Pages resuelve el 404 buscando un `404.html` en el directorio
pedido y subiendo: nunca lo habría encontrado, y **cualquier ruta bajo `/en/` habría caído en
la página de error en español**.

**No cambia ninguna URL existente.** La consecuencia es de convención y queda escrita:

> Las páginas de sección se crean como `alojamiento/index.astro`, **no** como
> `alojamiento.astro`, para seguir sirviendo `/alojamiento/` y no `/alojamiento.html`.

---

## Decisión 4 — Segmentos de URL traducidos

**`ruta()` traduce el primer segmento de la ruta según el idioma.** `/alojamiento/` en
español, `/en/rooms/` en inglés.

No es una decisión estética. Las URLs inglesas del sitio vigente **ya existen y acumulan
posicionamiento desde 2008**: la captura registró `?p=445 → /en/rooms/`. Publicar
`/en/alojamiento` habría tirado esas 301 a la basura. Es además criterio de aceptación de la
historia H2.1, que no se estaba cumpliendo.

El identificador de la ficha **no se traduce**: `/alojamiento/suite-mar` y
`/en/rooms/suite-mar`. Es la llave del dato, no texto de interfaz, y traducirla obligaría a
mantener dos identidades para el mismo registro.

**Dividendo medido:** 11 de las 22 URLs conservadas mantienen su dirección exacta. Cada una es
una redirección que no hay que escribir y que no se puede romper.

---

## Consecuencias

**Positivas.** El sitio sigue en 0 archivos JavaScript externos y 34 páginas · las imágenes
pesan un 20 % menos · el 404 funciona en los dos idiomas · el relanzamiento conserva la mitad
de sus URLs sin redirección.

**Costes asumidos.** Hay 897 bytes de JavaScript en 16 páginas · la convención de crear
páginas como `carpeta/index.astro` hay que recordarla, y está escrita en este ADR y en el
mapeo de Cappa · el mapa de segmentos traducidos es una tabla más que mantener cuando se
añada una sección.

**Lo que NO cambia.** ADR-0004 sigue íntegro: Astro estático, Cloudflare Pages, contenido como
datos, cero CMS. ADR-0003 tampoco se toca.

## Trazabilidad

Lecciones asociadas en la bitácora: **L-026** (medir antes de adoptar), **L-027** (escalas de
calidad no comparables), **L-029** (no construir sobre un evento sin comprobarlo), **L-032**
(los insumos de una migración caducan).
