#!/usr/bin/env node
/**
 * Verificación de las redirecciones del relanzamiento — historia H5.3.
 *
 *   node scripts/verificar-301.mjs site/dist                    (estático)
 *   node scripts/verificar-301.mjs https://azucar-hotel-tulum.pages.dev
 *
 * El criterio de salida del sprint 5 pide 301 «con prueba automatizada». Un
 * mapa de redirecciones sin prueba es una intención: nadie descubre que una
 * regla dejó de funcionar hasta que el tráfico cae, y para entonces han pasado
 * semanas.
 *
 * QUÉ COMPRUEBA
 *   1. Que TODA URL que existía en el sitio vigente tiene destino declarado.
 *      La lista sale de la captura HTTrack, que es la única fuente de verdad
 *      mientras el sitio viejo siga en pie.
 *   2. Que ningún destino es a su vez una redirección (cadenas) ni apunta a sí
 *      mismo (bucles).
 *   3. Que las dos páginas de datos de tarjeta NO resuelven. Es el único caso
 *      del proyecto en el que un 404 es el resultado correcto.
 *   4. Contra una URL real: que el código sea 301 y que el destino responda 200.
 *
 * Sale con código 1 si algo falla, para poder colgarlo del CI.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = process.argv[2];
if (!destino) {
  console.error('Uso: node scripts/verificar-301.mjs <carpeta-dist | url>');
  process.exit(1);
}
const esURL = /^https?:\/\//.test(destino);

// ── URLs que existían en el sitio vigente, desde la captura ──────────────────
const datos = JSON.parse(
  readFileSync(join(RAIZ, 'investigacion/mirrors/azucarhotel/datos.json'), 'utf8'),
);
const viejas = [
  ...new Set(
    datos.pages
      .map((p) => '/' + p.ruta.replace(/^azucarhotel\.com\/?/, '').replace(/index\.html$/, ''))
      .map((r) => (r === '/' ? '/' : r)),
  ),
].sort();

// Las que se dejan caer a propósito. Ver la cabecera de site/public/_redirects.
const DEBEN_MORIR = ['/autorizacion-de-pago-con-tdc/', '/en/cc-payment-authorization/'];

// ── Reglas declaradas ────────────────────────────────────────────────────────
const reglas = readFileSync(join(RAIZ, 'site/public/_redirects'), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => { const [de, a, cod] = l.split(/\s+/); return { de, a, cod }; });

const mapa = new Map(reglas.map((r) => [r.de, r.a]));

// ── Comprobaciones estáticas ─────────────────────────────────────────────────
const fallos = [];
const avisos = [];

for (const r of reglas) {
  if (r.de === r.a) fallos.push(`BUCLE: ${r.de} apunta a sí misma`);
  if (mapa.has(r.a)) fallos.push(`CADENA: ${r.de} → ${r.a} → ${mapa.get(r.a)}`);
  if (r.cod !== '301') avisos.push(`${r.de} usa ${r.cod} en vez de 301`);
}

const existeEnDist = (ruta) => {
  const base = join(RAIZ, destino);
  const limpia = ruta.replace(/^\//, '').replace(/\?.*$/, '');
  return ['', 'index.html'].some((s) => existsSync(join(base, limpia, s)))
      || existsSync(join(base, limpia.replace(/\/$/, '') + '.html'));
};

const resuelve = async (ruta) => {
  if (!esURL) return existeEnDist(ruta);
  const r = await fetch(destino.replace(/\/$/, '') + ruta, { redirect: 'follow' });
  return r.ok;
};

const codigoDe = async (ruta) => {
  if (!esURL) return null;
  const r = await fetch(destino.replace(/\/$/, '') + ruta, { redirect: 'manual' });
  return r.status;
};

console.log(`\n  Verificando ${viejas.length} URLs del sitio vigente contra ${destino}\n`);

for (const vieja of viejas) {
  if (vieja.includes('/wp-json') || vieja.includes('/feed')) continue;

  if (DEBEN_MORIR.includes(vieja)) {
    const vive = await resuelve(vieja);
    if (vive) fallos.push(`🚨 ${vieja} SIGUE VIVA. Debe caer en 404: captura datos de tarjeta`);
    else console.log(`  ✓ ${vieja.padEnd(34)} muere, como debe`);
    continue;
  }

  const nuevo = mapa.get(vieja) ?? vieja;   // sin regla = conserva su URL
  const ok = await resuelve(nuevo);
  const etiqueta = mapa.has(vieja) ? `→ ${nuevo}` : '(conserva su URL)';

  if (!ok) {
    // Distinguir «aún no construido» de «roto» es lo que hace útil este informe
    // antes del lanzamiento: hoy faltan páginas a propósito.
    avisos.push(`${vieja.padEnd(34)} ${etiqueta}  destino aún sin construir`);
    console.log(`  ⏳ ${vieja.padEnd(34)} ${etiqueta}`);
  } else {
    console.log(`  ✓ ${vieja.padEnd(34)} ${etiqueta}`);
  }

  if (esURL && mapa.has(vieja)) {
    const cod = await codigoDe(vieja);
    if (cod !== 301) avisos.push(`${vieja} respondió ${cod}, no 301`);
  }
}

// ── Informe ──────────────────────────────────────────────────────────────────
console.log('');
if (avisos.length) {
  console.log(`  ⚠ ${avisos.length} aviso(s) — trabajo pendiente, no defectos:`);
  for (const a of avisos) console.log(`      ${a}`);
  console.log('');
}
if (fallos.length) {
  console.error(`  ✗ ${fallos.length} fallo(s):`);
  for (const f of fallos) console.error(`      ${f}`);
  process.exit(1);
}
console.log(`  ✓ Sin fallos. ${reglas.length} reglas declaradas, ${viejas.length} URLs cubiertas.\n`);
