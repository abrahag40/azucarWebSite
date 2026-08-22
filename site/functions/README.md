# `functions/` — Cloudflare Pages Functions

Vive fuera de `src/`: **no son rutas de Astro**. Astro construye el sitio 100 % estático
(`npm run build` → `dist/`); Cloudflare Pages lee esta carpeta por su cuenta, en paralelo, y la
convierte en rutas de servidor. `functions/api/solicitud.ts` mapea a `POST /api/solicitud` por
convención de nombre de archivo. Es exactamente el mecanismo que ya elegía
[ADR-0004](../../docs/decisiones/ADR-0004-stack-tecnico.md): *"formulario contra una función
serverless del propio proveedor"*, sin adoptar el adaptador SSR de Astro para una sola ruta.

Detalle de qué hace, por qué falla cerrado y por qué todavía no está conectado al formulario
real: ver el comentario de cabecera de
[`api/solicitud.ts`](api/solicitud.ts) y [ADR-0006](../../docs/decisiones/ADR-0006-endpoint-de-solicitud-correo-y-whatsapp.md).

## Probarlo en local

```bash
cp .dev.vars.example .dev.vars   # rellenar con llaves reales o de prueba
npm run build
npm run functions:dev            # wrangler pages dev dist
```

`wrangler pages dev` sirve el sitio estático de `dist/` **y** esta carpeta juntos, emulando el
runtime real de Cloudflare — es la única forma honesta de probarlo: `astro dev` no sabe que
existe, porque no es una ruta de Astro.

```bash
curl -X POST http://localhost:8788/api/solicitud \
  -H 'content-type: application/json' \
  -d '{"idioma":"es","turnstileToken":"cualquier-cosa","solicitud":{...},"rotulos":{...}}'
```

Con la llave de prueba de Turnstile (ver `.dev.vars.example`) la verificación aprueba cualquier
token, así que se puede probar el flujo completo — validación, límite de tasa, envío — sin
cuenta propia de Turnstile. El envío a Resend sí necesita una llave real para completarse; sin
ella, el `fetch` llega hasta Resend y falla con un 401 real, lo que ya confirma que el cableado
funciona de punta a punta.

## `.dev.vars` nunca se sube

Está en `.gitignore` desde la raíz del repositorio. Son las mismas llaves que van en Cloudflare
— regla 6 de `CLAUDE.md`: nada de credenciales del cliente en el repositorio.
