# ADR-0004 — Stack técnico: Astro + despliegue estático

- **Fecha:** 2026-08-19
- **Estado:** Propuesta — requiere visto bueno de Abraham
- **Decisor:** Claude (líder de proyecto)

## Contexto

Restricciones ya conocidas:

- La plantilla base (Cappa) es **HTML + CSS + JS estático**.
- El sitio es **bilingüe ES/EN**.
- **El contenido lo produce y carga Abraham**, no personal del hotel (confirmado por el
  cliente: el equipo del hotel gestiona OTAs, no el sitio).
- No hay confirmación instantánea de reserva; sí hace falta **un endpoint** que reciba la
  solicitud (ADR-0003).
- Requisito de la Definition of Done: **Core Web Vitals en verde en móvil**.
- Presupuesto de operación cercano a cero.

## Opciones evaluadas

| Opción | A favor | En contra | Veredicto |
|---|---|---|---|
| **HTML/CSS/JS puro**, Cappa tal cual | Cero curva de aprendizaje | ~15 páginas × 2 idiomas = **30 archivos** con encabezado y pie duplicados. Cambiar un ítem del menú son 30 ediciones. Los datos de habitaciones se copian a mano en cada vista | ❌ Insostenible |
| **WordPress** | El cliente *podría* editar | Nadie del hotel va a editar. A cambio: mantenimiento, actualizaciones, superficie de ataque, plugins, y trabajo extra sólo para alcanzar los CWV que un sitio estático da gratis | ❌ Costo sin beneficio |
| **Next.js** | Potente | SSR y runtime de React para un sitio de marketing esencialmente estático. Complejidad y JS que no aportan nada aquí | ❌ Sobreingeniería |
| **11ty** | Ligero, muy buen generador estático | Sin modelo de componentes de primera clase; adaptar la plantilla es más manual | 🟡 Alternativa válida |
| **Astro** | Componentes y layouts (elimina la duplicación) · **i18n con enrutamiento nativo** ES/EN · *content collections* para modelar habitaciones como datos y generar sus páginas · **envía 0 KB de JS por defecto** · absorbe HTML y CSS crudos de Cappa sin reescribir · endpoints de servidor para el formulario · despliegue gratuito | Curva de aprendizaje moderada | ✅ **Elegida** |

## Decisión

**Astro**, sitio estático, desplegado en **Cloudflare Pages** (alternativa equivalente:
Netlify). Formulario de solicitud contra una **función serverless** del propio proveedor.

### Por qué Astro y no los demás, en una línea cada uno

- **Contra HTML puro:** el problema real de un sitio bilingüe no es escribirlo, es
  **mantenerlo**. La duplicación es el defecto que garantiza inconsistencias.
- **Contra WordPress:** un CMS se justifica cuando **alguien va a usarlo**. Aquí nadie va a
  usarlo, así que sólo quedan sus costos. *No se paga complejidad por una capacidad que
  nadie ejercerá.*
- **Contra Next.js:** este sitio no tiene estado, ni sesiones, ni datos en vivo. Elegir el
  framework más potente disponible en vez del más adecuado es un antipatrón con nombre:
  ***resume-driven development***.
- **A favor de Astro, lo decisivo:** su modelo de *islas* envía cero JavaScript salvo donde
  se pide explícitamente. Los Core Web Vitals dejan de ser un trabajo de optimización al
  final y pasan a ser el **estado por defecto**. Coincide exactamente con la DoD del ADR-0002.

### Modelado de datos (la decisión que más importa a mediano plazo)

Las habitaciones **no se escriben como HTML**. Se modelan como datos estructurados
(*content collection*) con esquema validado: nombre, capacidad, camas, m², vista,
amenidades, galería, orden, tarifas por temporada. Las páginas se generan a partir de ahí.

**Consecuencias directas:**
- Añadir o modificar una habitación es editar un archivo de datos, no tocar plantillas.
- El listado, el detalle, el selector del formulario de reserva y los **datos estructurados
  `schema.org/Hotel` + `HotelRoom`** salen todos de la misma fuente. Imposible que se
  contradigan entre sí.
- La traducción ES/EN es un campo del mismo registro, no una página paralela que se
  desincroniza.

> **Antipatrón evitado:** *content-in-markup*. Cuando el contenido vive incrustado en el
> HTML, toda edición es una edición de código, y cada vista repite el dato hasta que dejan
> de coincidir. Fue muy probablemente lo que le pasó al sitio actual.

## Sobre la plantilla Cappa

Se usa como **fuente de diseño**, no como base de código:

1. Se extrae el sistema visual (tipografía, escala, paleta, espaciado, componentes) a
   *tokens* CSS propios.
2. Se reconstruye cada componente como componente de Astro, con **HTML semántico y
   accesible** — las plantillas comerciales suelen usar `<div>` para todo, sin landmarks ni
   foco visible, lo que choca de frente con el requisito WCAG 2.2 AA de la DoD.
3. Se descartan las librerías JS que la plantilla trae y no usamos. Un demo carga jQuery,
   varios carruseles y plugins de animación "por si acaso"; arrastrarlos hunde los CWV.

> ⚠️ **Sigue vigente el riesgo R-01:** la licencia de Cappa debe adquirirse antes de usar
> sus assets en producción. Reconstruir componentes a partir del diseño no exime de la
> licencia si se reutilizan sus recursos.

## Consecuencias

**Positivas:** CWV en verde por defecto · hosting gratuito · sin superficie de ataque de
CMS · sin mantenimiento de plugins · despliegue por push a git con vista previa por rama
(cada demo de sprint tiene URL propia) · contenido versionado junto al código.

**Negativas / costo asumido:** el cliente **no puede editar el sitio por sí mismo**. Es
consistente con lo que ya ocurre, pero debe quedar **escrito y aceptado**, no asumido. Si
el cliente cambia de opinión, la migración a un CMS headless (Decap, Sanity, Contentful)
es viable justamente porque el contenido ya está modelado como datos — pero es un cambio de
alcance, no un ajuste.

**Curva de aprendizaje:** Abraham no ha trabajado con Astro. Se absorbe en el sprint 1 y es
inversión, no costo: Astro es hoy una habilidad de mercado.
