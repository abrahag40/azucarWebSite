# `desde-galeria/` — copias estables de fotos de la galería general

Todo lo que hay aquí es **byte a byte** una fotografía de
`assets/galeria/numeradas/`, copiada con un nombre que describe la foto en vez
de su posición.

## Por qué existe esta carpeta

`numeradas/` se llama **por posición**: la foto del puesto 12 se llama
`012.webp`, y cuando el cliente reordena la galería —ya ha pasado cuatro veces—
los archivos se renumeran. Una página que importara `012.webp` cambiaría de
fotografía **en silencio**, sin error de build y sin que nadie lo viera.

Por eso la regla, que tiene lección propia (**L-144**):

> 🔴 **Nada fuera de `src/data/galeria.ts` importa de `numeradas/`.**
> Si una página necesita una foto de la galería, se copia aquí con nombre propio.

## No cuesta bytes

Astro deduplica por contenido: como la copia y el original son idénticos, el
build emite **un solo archivo**. Lo que se duplica son unos KB en el
repositorio, y compran que una reordenación no pueda cambiar la portada.

## Cómo añadir una

```bash
cp site/src/assets/galeria/numeradas/NNN.webp \
   site/src/assets/desde-galeria/lo-que-se-ve.webp
```

El nombre describe **la foto**, nunca su número: en cuanto el nombre codifica
una posición, vuelve el problema que esta carpeta resuelve.
