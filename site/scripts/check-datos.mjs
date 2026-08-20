#!/usr/bin/env node
/**
 * Guardia de datos: falla si alguna ficha de alojamiento declara un dato
 * numérico sin haberlo marcado como verificado por el cliente.
 *
 * Por qué existe: los nombres y descripciones salen del sitio del cliente, pero
 * unidades, capacidad y camas son estimaciones nuestras mientras no responda la
 * pregunta C1 del brief. Publicarlas como si fueran ciertas es exactamente el
 * tipo de dato falso que ya le está costando reseñas al hotel.
 *
 * Este script NO rompe el build en desarrollo: avisa. Se activa como error
 * cuando se pasa --estricto, que es como corre en el pipeline de producción.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/content/alojamiento');
const ESTRICTO = process.argv.includes('--estricto');

const REQUIERE = [
  ['unidades', 'unidades'],
  ['capacidadMaxima', 'capacidad'],
  ['camas', 'camas'],
  ['metrosCuadrados', 'metros'],
];

let pendientes = 0, unidadesTotales = 0;
for (const f of readdirSync(DIR).filter((n) => n.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  const ok = new Set(d.verificado ?? []);
  unidadesTotales += d.unidades ?? 0;
  const faltan = REQUIERE.filter(([campo, marca]) => d[campo] != null && !ok.has(marca)).map(([, m]) => m);
  if (faltan.length) {
    pendientes++;
    console.log(`  ⚠ ${f.padEnd(30)} sin verificar: ${faltan.join(', ')}`);
  }
}

console.log(`\n  Unidades declaradas: ${unidadesTotales} · reportadas públicamente: 21`);
if (unidadesTotales !== 21) console.log(`  ⚠ No cuadran. Es una estimación nuestra hasta que el cliente confirme (C1).`);

if (pendientes) {
  const msg = `${pendientes} ficha(s) con datos sin verificar por el cliente.`;
  if (ESTRICTO) { console.error(`\n  ✗ ${msg} No se publica.`); process.exit(1); }
  console.log(`\n  ℹ ${msg} Se permite en desarrollo; --estricto lo bloquea.`);
}
