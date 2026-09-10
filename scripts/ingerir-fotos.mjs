#!/usr/bin/env node
/**
 * De la sesión del fotógrafo a `site/src/assets/` — reducción y WebP.
 *
 *   node scripts/ingerir-fotos.mjs <destino> <origen>:<nombre> [<origen>:<nombre> …]
 *
 * Ejemplo:
 *   node scripts/ingerir-fotos.mjs alojamiento \
 *     "…/Bongalow Arrecife/_MLS6258.jpg:bungalow-arrecife"
 *
 * ── POR QUÉ NO SE VERSIONAN LOS ORIGINALES ──────────────────────────────────
 * «Fotos definitivas» son 2.1 GB de JPEG a 6K. Meterlos en git es irreversible
 * —el histórico no se poda— y **no aporta un solo píxel visible**: el
 * componente que más pide es `BannerPagina`, con `widths={[640, 1024, 1600]}`.
 * Astro nunca genera una derivada mayor que eso, así que todo lo que pase de
 * **1600 px de lado mayor** son bytes que ningún navegador va a ver.
 *
 * ── POR QUÉ EL MAESTRO VA A CALIDAD ALTA Y LA DERIVADA A 50 ─────────────────
 * Astro re-codifica desde el maestro. Si el maestro ya fuera q50, la página
 * serviría una imagen comprimida dos veces y se verían los artefactos del
 * primer paso amplificados por el segundo. El maestro va a **q85**: pesa más en
 * el repositorio y no pesa nada en la red, porque a la red sale la derivada.
 *
 * ── QUÉ NO HACE ─────────────────────────────────────────────────────────────
 * No recorta ni reencuadra. Si una foto necesita otro encuadre, se recorta
 * antes, a mano y a la vista — un recorte automático a ciegas es cómo se
 * decapita a la gente en las fotos de grupo.
 */
import { mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(RAIZ, 'site', 'package.json'));
const sharp = require('sharp');

const LADO_MAYOR = 1600;
const CALIDAD = 85;

const [destino, ...pares] = process.argv.slice(2);
if (!destino || pares.length === 0) {
  console.error('Uso: node scripts/ingerir-fotos.mjs <subcarpeta de assets> <origen>:<nombre> …');
  process.exit(2);
}
const carpeta = join(RAIZ, 'site', 'src', 'assets', destino);
mkdirSync(carpeta, { recursive: true });

for (const par of pares) {
  // Se parte por el ÚLTIMO ':' — las rutas de macOS pueden llevar dos puntos.
  const corte = par.lastIndexOf(':');
  const origen = resolve(par.slice(0, corte));
  const nombre = par.slice(corte + 1);
  const salida = join(carpeta, `${nombre}.webp`);

  const entrada = sharp(origen);
  const { width, height } = await entrada.metadata();
  const opciones = width >= height
    ? { width: Math.min(LADO_MAYOR, width) }
    : { height: Math.min(LADO_MAYOR, height) };

  const info = await entrada
    .rotate()                       // respeta la orientación EXIF antes de escalar
    .resize({ ...opciones, withoutEnlargement: true, kernel: 'lanczos3' })
    .webp({ quality: CALIDAD })
    .toFile(salida);

  console.log(
    `  ${nombre.padEnd(34)} ${width}×${height} → ${info.width}×${info.height}` +
    `  ${(info.size / 1024).toFixed(0)} KB`,
  );
}
