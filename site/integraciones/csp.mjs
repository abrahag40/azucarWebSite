/**
 * Integración de Astro que genera la Política de Seguridad de Contenido (CSP)
 * al terminar el build — historia H5.5.
 *
 * ── POR QUÉ UNA INTEGRACIÓN Y NO UNA LÍNEA EN `_headers` ─────────────────────
 * Una CSP estricta no puede usar `'unsafe-inline'`, así que cada bloque en línea
 * —el script del visor de la galería y el CSS que Astro incrusta— tiene que
 * autorizarse por su **hash SHA-256**. Y ese hash cambia con cada cambio de una
 * sola letra del código.
 *
 * Escribirlos a mano en un `_headers` estático garantiza que, la primera vez que
 * alguien toque el CSS, la política deje de cuadrar. Y el fallo es del peor tipo:
 * **silencioso en desarrollo y visible sólo en producción**, porque `astro dev`
 * no aplica cabeceras de Cloudflare. Aquí se calculan leyendo el HTML ya
 * construido, que es la única fuente que no puede desincronizarse.
 *
 * ── POR QUÉ ES VIABLE UNA CSP ESTRICTA AQUÍ, Y POR QUÉ AHORA ────────────────
 * El sitio está en una posición poco común: **cero orígenes de terceros**, un
 * único script y ninguna hoja de estilo externa. Escribir la política hoy cuesta
 * una tarde. Cuando entren la analítica, un mapa incrustado o un widget de
 * reseñas, cada uno traerá su dominio y su código en línea, y añadir una CSP
 * dejará de ser viable sin abrirla tanto que no proteja de nada.
 *
 * Escribirla ahora, además, convierte cada tercero futuro en una **decisión
 * explícita**: no entra sin tocar esta política, que es exactamente la fricción
 * que se quiere.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const sha256 = (s) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`;

const recorrer = (dir, acc = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    e.isDirectory() ? recorrer(p, acc) : /\.html$/.test(p) && acc.push(p);
  }
  return acc;
};

export default function csp() {
  return {
    name: 'csp-desde-el-build',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const raiz = dir.pathname;
        const scripts = new Set();
        const estilos = new Set();

        for (const f of recorrer(raiz)) {
          const html = readFileSync(f, 'utf8');

          // Sólo los scripts EJECUTABLES. Los `application/ld+json` son datos:
          // el navegador no los ejecuta y no los somete a `script-src`.
          for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
            const atributos = m[1];
            if (/\bsrc\s*=/i.test(atributos)) continue;
            if (/type\s*=\s*["']application\/(ld\+json|json)["']/i.test(atributos)) continue;
            if (m[2].trim()) scripts.add(sha256(m[2]));
          }
          for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
            if (m[1].trim()) estilos.add(sha256(m[1]));
          }
        }

        const directivas = [
          // Nada por defecto: lo que no esté permitido más abajo, se bloquea.
          `default-src 'none'`,
          `script-src 'self' ${[...scripts].join(' ')}`,
          `style-src 'self' ${[...estilos].join(' ')}`,
          `img-src 'self' data:`,
          `font-src 'self'`,
          // Sin `connect-src`: el sitio no hace ninguna petición desde JavaScript.
          // Cuando el formulario del sprint 3 llame a su función, se añade aquí y
          // esa línea será la prueba escrita de que se tomó la decisión.
          `connect-src 'none'`,
          `form-action 'self'`,
          // Nadie puede incrustar este sitio en un marco: defensa contra
          // clickjacking, y sustituye a X-Frame-Options en navegadores modernos.
          `frame-ancestors 'none'`,
          `base-uri 'none'`,
          `object-src 'none'`,
          // Fuerza HTTPS en cualquier subrecurso que se colara por http://
          `upgrade-insecure-requests`,
        ];

        const cabeceras = [
          '',
          '# ── Política de seguridad de contenido ──────────────────────────────',
          '# GENERADA EN CADA BUILD por integraciones/csp.mjs. No editar a mano:',
          '# los hashes cambian con cada cambio del código en línea.',
          '/*',
          `  Content-Security-Policy: ${directivas.join('; ')}`,
          '',
        ].join('\n');

        const destino = join(raiz, '_headers');
        if (existsSync(destino)) appendFileSync(destino, cabeceras);
        else writeFileSync(destino, cabeceras.trimStart());

        logger.info(
          `CSP escrita · ${scripts.size} script(s) y ${estilos.size} estilo(s) en línea autorizados por hash`,
        );
      },
    },
  };
}
