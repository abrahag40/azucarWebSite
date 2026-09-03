#!/usr/bin/env node
/**
 * Guardia de datos: falla si alguna ficha de alojamiento declara un dato
 * numérico sin haberlo marcado como verificado por el cliente.
 *
 * Por qué existe: los nombres y descripciones salen del sitio del cliente, pero
 * unidades, capacidad y camas eran estimaciones nuestras mientras no respondía
 * la pregunta C1 del brief. Publicarlas como si fueran ciertas es exactamente
 * el tipo de dato falso que ya le está costando reseñas al hotel.
 *
 * ✅ C1 RESPONDIDA el 2026-09-02: la gerencia del hotel envió el desglose por
 * tipología. Son **24 unidades**, no las 21 que decía su propio sitio ni las 22
 * que habíamos estimado:
 *
 *     3  bungalow con balcón y jacuzzi privado, vistas al mar
 *     3  bungalow con balcón, roof top y jacuzzi, vista panorámica al mar
 *     5  Deluxe King, vistas parciales al jardín y/o mar
 *     1  Deluxe King, vista a la selva
 *    10  Deluxe Doble Queen, vistas parciales al jardín y/o mar
 *     2  Deluxe Doble Queen, vistas a la selva
 *
 * 🔴 Y POR ESO ESTE GUARDIÁN CAMBIA DE TRABAJO. Ya no vigila «¿el cliente
 * confirmó?» —lo hizo— sino «¿el catálogo publicado suma lo que el hotel
 * tiene?». Un catálogo que enseña 22 de 24 unidades no miente, pero está
 * incompleto, y en producción eso se bloquea.
 *
 * ✅ 2026-09-03: EL CATÁLOGO YA SUMA 24. Abraham, como Proxy PO, autorizó crear
 * «Bungalow Arrecife» y «Bungalow Luna» replicando de su familia. La familia no
 * es una suposición: la dijo la gerencia en el desglose de arriba —Arrecife va
 * con Mar y Agua, Luna con Cielo y Aire— y de ahí salen también su unidad y su
 * vista.
 *
 * ⚠️ «Villa Luna» la llamó la gerencia; se publica como «Bungalow Luna» por
 * instrucción de Abraham del 2026-09-03 («Arrecife y Luna también son
 * bungalows»). Es una decisión, no una errata, y conviene confirmarla.
 *
 * 🔴 EL BLOQUEO NO DESAPARECE, CAMBIA DE MOTIVO — y eso es lo que este guardián
 * está para hacer. Ya no es «faltan dos habitaciones» sino «de esas dos no
 * sabemos ni cuánta gente cabe ni qué cama tiene»: capacidad y camas son
 * estimaciones nuestras, van fuera de `verificado`, salen con asterisco en la
 * ficha y siguen impidiendo `build:prod`. Tampoco tienen fotografía —ninguna
 * identificada en el archivo— ni `diferenciador`, que es el campo que diría en
 * qué se distinguen de sus hermanas y es justo lo que nadie ha dicho.
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

/** Confirmado por la gerencia del hotel el 2026-09-02. Ver la cabecera. */
const UNIDADES_CONFIRMADAS = 24;

console.log(`\n  Unidades publicadas: ${unidadesTotales} · confirmadas por el hotel: ${UNIDADES_CONFIRMADAS}`);
let incompleto = false;
if (unidadesTotales !== UNIDADES_CONFIRMADAS) {
  incompleto = true;
  const faltan = UNIDADES_CONFIRMADAS - unidadesTotales;
  console.log(`  ⚠ Faltan ${faltan} unidad(es) en el catálogo frente al desglose de la gerencia.`);
  console.log(`    Revisa el campo \`unidades\` de las fichas contra la cabecera de este archivo.`);
}

if (pendientes) {
  const msg = `${pendientes} ficha(s) con datos sin verificar por el cliente.`;
  if (ESTRICTO) { console.error(`\n  ✗ ${msg} No se publica.`); process.exit(1); }
  console.log(`\n  ℹ ${msg} Se permite en desarrollo; --estricto lo bloquea.`);
}
if (incompleto) {
  const msg = `El catálogo publica ${unidadesTotales} de ${UNIDADES_CONFIRMADAS} unidades.`;
  if (ESTRICTO) { console.error(`\n  ✗ ${msg} No se publica un inventario incompleto.`); process.exit(1); }
  console.log(`\n  ℹ ${msg} Se permite en desarrollo; --estricto lo bloquea.`);
}
if (!pendientes && !incompleto) console.log(`\n  ✓ Catálogo completo y verificado.`);
