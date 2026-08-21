# Sitio — Azúcar Hotel Tulum

Astro estático, ES/EN. Decisión y justificación en
[ADR-0004](../docs/decisiones/ADR-0004-stack-tecnico.md).

```bash
cd site
npm ci
npm run dev        # desarrollo
npm run datos      # ¿qué datos de alojamiento siguen sin verificar por el cliente?
npm run build      # build (avisa de datos sin verificar)
npm run build:prod # build de producción (FALLA si hay datos sin verificar)
```

## Estructura

| Ruta | Qué es |
|---|---|
| `src/styles/tokens.css` | Design tokens extraídos de Cappa y corregidos por contraste |
| `src/content.config.ts` | Esquema del alojamiento, validado en tiempo de compilación |
| `src/content/alojamiento/` | Los 8 tipos como **datos**, nunca como marcado |
| `src/i18n/ui.ts` | Cadenas de interfaz ES/EN |
| `src/layouts/Base.astro` | SEO, `hreflang`, `schema.org/Hotel`, saltar al contenido |
| `scripts/check-datos.mjs` | Guardia: impide publicar datos que el cliente no ha confirmado |

## Reglas que el código hace cumplir

1. **Nunca "reserva confirmada"** en la interfaz (ADR-0003). Lo verifica el CI.
2. **Nunca disponibilidad** que no podamos respaldar: el esquema de datos no
   tiene ese campo, a propósito.
3. **Cero JavaScript** salvo que una función concreta lo exija.
4. **Datos sin confirmar no se publican**: `build:prod` falla.

## ⚠️ El lockfile se regenera en Linux, no en macOS

`npm install` en macOS **poda del lockfile las dependencias opcionales que sólo
aplican a otras plataformas**. En este proyecto desaparecen `@emnapi/runtime` y
`@emnapi/core`, que `@img/sharp-wasm32` necesita — y `sharp` es lo que Astro usa
para procesar imágenes.

El síntoma no aparece en local: `npm ci` funciona en macOS y falla en el build de
Cloudflare con

```
npm ci can only install packages when your package.json and package-lock.json are in sync.
Missing: @emnapi/runtime@... from lock file
```

Si necesitas añadir o actualizar dependencias, hazlo y después **regenera el lock
en el mismo entorno que Cloudflare**:

```bash
cd site
docker run --rm --platform linux/amd64 -v "$PWD":/app -w /app node:22.12.0 \
  npm install --package-lock-only --no-audit --no-fund
```

Verifícalo antes de empujar, en ese mismo entorno:

```bash
docker run --rm --platform linux/amd64 -v "$PWD":/app -w /app node:22.12.0 \
  sh -c 'npm ci && npm run build'
```

La versión de Node está fijada en `.nvmrc` y en `engines.node`. Cloudflare Pages
lee `.nvmrc`; no hace falta configurar `NODE_VERSION` en el panel.

## Despliegue

Cloudflare Pages. Directorio raíz `site`, comando `npm run build:prod`, salida `dist`.
Variable `PUBLIC_GA4_ID` cuando lleguen los accesos a Analytics (historia 1.7).
