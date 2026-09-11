#!/usr/bin/env node
/**
 * ¿Ya está en producción lo que acabo de construir? — por CONTENIDO, no por nombre.
 *
 *   node scripts/esperar-despliegue.mjs /actividades/ /galeria/
 *   node scripts/esperar-despliegue.mjs --todas
 *   node scripts/esperar-despliegue.mjs --url https://otra.pages.dev /
 *
 * ── POR QUÉ EXISTE, Y ES UNA LECCIÓN QUE COSTÓ DOS VECES ───────────────────
 * Durante días el despliegue se vigiló con bucles de `curl … | grep "nombre-de-
 * archivo"` escritos a mano. Falla, y falla de las dos maneras posibles:
 *
 *   · **Falso negativo.** El 2026-09-11 se vigiló `grep hotel-fachada` para un
 *     cambio que YA estaba desplegado. Esa cadena no podía aparecer nunca:
 *     Astro deduplica los recursos por contenido, así que la fotografía salió
 *     del build con el nombre de su gemela —`003.…webp`— y no con el del import.
 *     El vigilante dijo «sin desplegar» media hora después de que estuviera.
 *
 *   · **Falso positivo.** Antes, con el vídeo del héroe, se buscó un color de
 *     CSS dentro del HTML. Vivía en una hoja externa, así que el `grep` no lo
 *     encontraba jamás — y el día que lo encontró fue por otra cosa.
 *
 * El patrón común: **preguntar por el NOMBRE de un recurso en un build que
 * renombra recursos a propósito.** Los nombres de `_astro/` son hashes de
 * contenido, y cuál gana cuando dos archivos son idénticos es cosa del
 * empaquetador, no nuestra.
 *
 * ── QUÉ COMPRUEBA EN SU LUGAR ──────────────────────────────────────────────
 * Que el HTML que sirve producción sea **byte a byte** el que acaba de producir
 * `site/dist`. Comprobado antes de escribir esto sobre tres páginas ya
 * desplegadas: los tres md5 coinciden, así que la comparación es válida y no
 * hay nonces ni marcas de tiempo por medio.
 *
 * Y de paso verifica los recursos que cita cada página. Aquí hubo que corregir
 * el primer diseño, y la corrección es la parte interesante:
 *
 * 🔴 **Comparar los BYTES de una derivada entre dos máquinas no vale.** La
 * primera versión lo hacía y salía roja: cuatro de 43 imágenes diferían — la
 * misma foto, las mismas dimensiones exactas, **10 bytes de diferencia**. La
 * causa no es el despliegue: el nombre de `_astro/` es el hash del archivo de
 * ORIGEN y de sus parámetros, no de su salida, así que dos codificadores
 * distintos —el Linux de Cloudflare y el macOS de aquí— producen archivos
 * legítimamente distintos bajo el mismo nombre. Un guardián que llora en 4 de
 * 43 casos sanos no se mira a la tercera vez.
 *
 * Lo que sí distingue una imagen de otra sin castigar al codificador:
 * **HTTP 200 + mismas dimensiones + peso dentro del 5 %**. La foto equivocada
 * bajo el nombre esperado cambia de dimensiones o de peso mucho más que eso;
 * el ruido del codificador, medido aquí, fue del 0.06 %.
 *
 * ⚠️ Si otra sesión empuja después que tú, producción acabará sirviendo SU
 * build y éste no coincidirá nunca. Es correcto: lo que se pregunta es si está
 * lo tuyo, no si hay algo. El informe dice qué páginas difieren.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
// `sharp` es dependencia del SITIO; se resuelve desde ahí, como en los otros
// scripts, para no duplicar el árbol de dependencias por un único import.
const sharp = createRequire(join(RAIZ, 'site', 'package.json'))('sharp');
const DIST = join(RAIZ, 'site', 'dist');
const POR_DEFECTO = 'https://azucar-hotel-tulum.pages.dev';

const args = process.argv.slice(2);
const leerOpcion = (nombre, def) => {
  const i = args.indexOf(nombre);
  if (i < 0) return def;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const base = (leerOpcion('--url', POR_DEFECTO) || POR_DEFECTO).replace(/\/$/, '');
const intervalo = Number(leerOpcion('--intervalo', '20')) * 1000;
const limite = Number(leerOpcion('--minutos', '30')) * 60_000;
const todas = args.includes('--todas');
const rutas = args.filter((a) => !a.startsWith('--'));

const md5 = (b) => createHash('md5').update(b).digest('hex');

/** Todas las páginas del build, como rutas de URL. */
const paginasDelBuild = (dir = DIST, acc = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) paginasDelBuild(p, acc);
    else if (e === 'index.html') {
      const r = `/${relative(DIST, dirname(p))}/`.replace('//', '/');
      acc.push(r === '//' ? '/' : r);
    }
  }
  return acc;
};

const objetivo = todas ? paginasDelBuild() : (rutas.length ? rutas : ['/']);

const archivoDe = (ruta) => join(DIST, ruta === '/' ? '' : ruta, 'index.html');

if (!existsSync(DIST)) {
  console.error('  No hay `site/dist`. Corre el build antes de vigilar el despliegue.');
  process.exit(2);
}
for (const r of objetivo) {
  if (!existsSync(archivoDe(r))) {
    console.error(`  ${r} no existe en el build local.`);
    process.exit(2);
  }
}

console.log(`\n  Vigilando ${base}`);
console.log(`  ${objetivo.length} página(s), comparando CONTENIDO con site/dist\n`);

const bajar = async (url) => {
  const res = await fetch(url, { redirect: 'follow', cache: 'no-store' });
  if (!res.ok) return { error: res.status };
  return { buf: Buffer.from(await res.arrayBuffer()) };
};

/** Las URLs de `_astro/` que cita una página. */
const recursosDe = (html) => [...new Set(
  [...html.matchAll(/\/_astro\/[A-Za-z0-9._-]+/g)].map((m) => m[0]),
)];

const arranque = Date.now();
let vuelta = 0;

while (Date.now() - arranque < limite) {
  vuelta++;
  const difieren = [];
  for (const ruta of objetivo) {
    const local = readFileSync(archivoDe(ruta));
    const remoto = await bajar(`${base}${ruta}`);
    if (remoto.error) { difieren.push(`${ruta} (HTTP ${remoto.error})`); continue; }
    if (md5(local) !== md5(remoto.buf)) difieren.push(ruta);
  }

  const hora = new Date().toTimeString().slice(0, 8);
  if (difieren.length === 0) {
    const seg = Math.round((Date.now() - arranque) / 1000);
    console.log(`  ${hora}  las ${objetivo.length} página(s) coinciden  ·  ${seg}s`);

    // Y ahora los recursos, que es donde el `grep` de nombre se rompía.
    const urls = new Set();
    for (const ruta of objetivo) recursosDe(readFileSync(archivoDe(ruta), 'utf8')).forEach((u) => urls.add(u));
    const TOLERANCIA = 0.05;
    let malos = 0;
    for (const u of urls) {
      const localRec = join(DIST, u);
      if (!existsSync(localRec)) continue;
      const remoto = await bajar(`${base}${u}`);
      if (remoto.error) { console.log(`     ✗ ${u} — HTTP ${remoto.error}`); malos++; continue; }
      const bytesLocal = readFileSync(localRec);
      if (md5(bytesLocal) === md5(remoto.buf)) continue;   // idénticos: listo

      // Distintos bytes. Si es una imagen puede ser sólo el codificador, así
      // que se le pregunta a la IMAGEN, no al archivo.
      if (!/\.(webp|jpe?g|png|avif)$/.test(u)) {
        console.log(`     ✗ ${u} — contenido distinto`); malos++; continue;
      }
      const [a, b] = await Promise.all([
        sharp(bytesLocal).metadata(), sharp(remoto.buf).metadata(),
      ]);
      const desvio = Math.abs(remoto.buf.length - bytesLocal.length) / bytesLocal.length;
      if (a.width !== b.width || a.height !== b.height) {
        console.log(`     ✗ ${u} — ${a.width}×${a.height} aquí, ${b.width}×${b.height} allá`); malos++;
      } else if (desvio > TOLERANCIA) {
        console.log(`     ✗ ${u} — mismo tamaño pero ${(desvio * 100).toFixed(1)} % de peso de diferencia`); malos++;
      }
    }
    console.log(`  ${urls.size} recurso(s) comprobados por contenido · ${malos} discrepancia(s)\n`);
    if (malos) { console.log('  ✗ El HTML coincide pero algún recurso no.\n'); process.exit(1); }
    console.log('  ✓ Desplegado: lo que sirve producción es lo que hay en `dist`.\n');
    process.exit(0);
  }

  const muestra = difieren.slice(0, 4).join(', ');
  const resto = difieren.length > 4 ? ` (+${difieren.length - 4})` : '';
  console.log(`  ${hora}  difieren ${difieren.length}: ${muestra}${resto}`);
  await new Promise((r) => setTimeout(r, intervalo));
}

console.log(`\n  ✗ No coincidió en ${limite / 60000} min. Mira el log de build en Cloudflare.\n`);
process.exit(1);
