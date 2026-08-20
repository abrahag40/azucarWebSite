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

## Despliegue

Cloudflare Pages. Directorio raíz `site`, comando `npm run build:prod`, salida `dist`.
Variable `PUBLIC_GA4_ID` cuando lleguen los accesos a Analytics (historia 1.7).
