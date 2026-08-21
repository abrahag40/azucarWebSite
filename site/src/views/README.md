# `src/views/` — el cuerpo de cada página, una sola vez

## Por qué existe esta carpeta

Astro enruta por sistema de archivos: para que existan `/servicios/` y `/en/services/`
tiene que haber **dos archivos** bajo `src/pages/`. Eso es correcto y no se discute.

Lo que no era correcto es lo que había **dentro** de esos dos archivos. Medido sobre las
diez parejas del sitio: **390 líneas de las que sólo 22 diferían**, y esas 22 eran casi
siempre lo mismo —`const idioma = 'es'` frente a `'en'` y la profundidad de los `import`—.
Un **94 % idéntico**, copiado a mano.

## El costo real, que no es la estética

No es que ocupe el doble. Es que **cada arreglo hay que hacerlo dos veces**, y tarde o
temprano uno se hace una sola vez. Ya pasó en este proyecto: la lección **L-046** documenta
un párrafo que se corrigió en la galería y reapareció media hora después en la página de
solicitud, porque el patrón se copió antes de que la corrección se propagara.

Y había un costo medible además: el `<style>` de cada página se emitía **dos veces**, con
dos identificadores de ámbito distintos, lo que duplicaba también los hashes de la CSP.

## Cómo funciona

Cada archivo de `src/pages/` queda como una **envoltura de tres líneas** que sólo declara
su idioma. Todo el cuerpo vive aquí, una vez, y recibe `idioma` como propiedad.

```astro
---
import Servicios from '../../views/Servicios.astro';
---
<Servicios idioma="es" />
```

> **Técnica:** *single source of truth* aplicada a la plantilla, no sólo a los datos. El
> contenido ya estaba centralizado en `src/content/` y `src/i18n/`; faltaba centralizar la
> **composición**, que es lo que se estaba copiando.

> **Antipatrón evitado:** confundir «una ruta por idioma» —que Astro exige— con «una
> plantilla por idioma», que nunca hizo falta.

## Lo que NO se movió, y por qué

`getStaticPaths` se queda en el archivo de ruta de las fichas de alojamiento: es parte del
enrutado, no del contenido, y Astro sólo lo lee ahí.
