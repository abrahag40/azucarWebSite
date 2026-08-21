#!/usr/bin/env node
/**
 * Auditoría de accesibilidad sobre el marcado — historia H5.1.
 *
 *   node scripts/auditar-accesibilidad.mjs site/dist
 *
 * QUÉ COMPRUEBA Y QUÉ NO
 *
 * Esto revisa lo que se puede afirmar leyendo el HTML: jerarquía de
 * encabezados, landmarks, nombres accesibles, identificadores duplicados,
 * `tabindex` positivos, etiquetas de formulario e idioma. Son comprobaciones
 * baratas y deterministas, y por eso van sobre las 34 páginas.
 *
 * Lo que NO se puede saber sin estilos calculados —contraste real, tamaño de
 * los objetivos táctiles, visibilidad del foco— se mide aparte en el navegador,
 * sobre una página representativa de cada tipo de componente. Fingir que se
 * puede deducir del marcado sería peor que no comprobarlo: daría un informe en
 * verde sobre algo que no se ha mirado.
 *
 * Sale con código 1 si hay fallos, para poder colgarlo del CI.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const RAIZ = process.argv[2];
if (!RAIZ || !existsSync(RAIZ)) {
  console.error('Uso: node scripts/auditar-accesibilidad.mjs <carpeta-dist>');
  process.exit(1);
}

const walk = (d, a = []) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    e.isDirectory() ? walk(p, a) : /\.html$/.test(p) && a.push(p);
  }
  return a;
};

const all = (re, s) => [...s.matchAll(re)];
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();

const fallos = [];
const avisos = [];
const F = (pag, criterio, det) => fallos.push({ pag, criterio, det });
const A = (pag, criterio, det) => avisos.push({ pag, criterio, det });

const paginas = walk(RAIZ);

for (const f of paginas) {
  const src = readFileSync(f, 'utf8');
  const pag = '/' + relative(RAIZ, f).replace(/index\.html$/, '').replace(/\.html$/, '');
  // Lo que está dentro de un <dialog> cerrado no se presenta al usuario hasta
  // abrirlo; se analiza aparte, no como parte del documento.
  const doc = src.replace(/<dialog\b(?![^>]*\bopen\b)[^>]*>[\s\S]*?<\/dialog>/gi, '');

  // ── 1.3.1 Jerarquía de encabezados ───────────────────────────────────────
  const niveles = all(/<h([1-6])\b/gi, doc).map((m) => +m[1]);
  if (niveles.filter((n) => n === 1).length !== 1)
    F(pag, 'WCAG 1.3.1', `${niveles.filter((n) => n === 1).length} elementos <h1>; debe haber exactamente uno`);
  for (let i = 1; i < niveles.length; i++)
    if (niveles[i] - niveles[i - 1] > 1) {
      F(pag, 'WCAG 1.3.1', `salto de h${niveles[i - 1]} a h${niveles[i]} en la jerarquía`);
      break;
    }
  const vacios = all(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, doc).filter((m) => !strip(m[1]));
  if (vacios.length) F(pag, 'WCAG 1.3.1', `${vacios.length} encabezado(s) sin texto`);

  // ── 1.3.1 / 2.4.1 Landmarks ──────────────────────────────────────────────
  for (const [etiqueta, criterio] of [['main', 'WCAG 2.4.1'], ['header', 'WCAG 1.3.1'], ['footer', 'WCAG 1.3.1']]) {
    const n = all(new RegExp(`<${etiqueta}\\b`, 'gi'), doc).length;
    if (n === 0) F(pag, criterio, `falta <${etiqueta}>`);
    if (etiqueta === 'main' && n > 1) F(pag, criterio, `${n} elementos <main>; debe haber uno`);
  }
  // Varias <nav> en la misma página necesitan nombre para distinguirse
  const navs = all(/<nav\b([^>]*)>/gi, doc);
  if (navs.length > 1) {
    const sinNombre = navs.filter((m) => !/aria-label|aria-labelledby/i.test(m[1]));
    if (sinNombre.length)
      F(pag, 'WCAG 1.3.1', `${sinNombre.length} de ${navs.length} <nav> sin aria-label; con varias no se distinguen`);
  }

  // ── 3.1.1 Idioma ─────────────────────────────────────────────────────────
  const lang = /<html[^>]*\blang\s*=\s*["']([^"']+)["']/i.exec(doc);
  if (!lang) F(pag, 'WCAG 3.1.1', 'falta lang en <html>');

  // ── 3.1.2 Cambio de idioma en fragmentos ─────────────────────────────────
  // El selector de idioma DEBE declarar el idioma del enlace al que lleva.
  const idiomaEsperado = /^\/en\//.test(pag) ? 'es' : 'en';
  const cambio = all(/<a\b[^>]*\bhreflang\s*=\s*["'][^"']+["'][^>]*>/gi, doc)
    .filter((m) => !/\blang\s*=/i.test(m[0]));
  if (cambio.length)
    F(pag, 'WCAG 3.1.2', `${cambio.length} enlace(s) a otro idioma sin atributo lang (esperado lang="${idiomaEsperado}")`);

  // ── 2.4.4 Nombre accesible de los enlaces ────────────────────────────────
  const enlaces = all(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, doc);
  const sinNombre = enlaces.filter((m) => {
    if (/aria-label|aria-labelledby/i.test(m[1])) return false;
    if (/aria-hidden\s*=\s*["']true/i.test(m[1])) return false;
    const texto = strip(m[2]);
    const conAlt = /<img[^>]*\balt\s*=\s*["'][^"']+["']/i.test(m[2]);
    return !texto && !conAlt;
  });
  if (sinNombre.length) F(pag, 'WCAG 2.4.4', `${sinNombre.length} enlace(s) sin nombre accesible`);

  const ambiguos = enlaces
    .map((m) => strip(m[2]).toLowerCase())
    .filter((t) => ['clic aquí', 'click here', 'aquí', 'here', 'leer más', 'read more', 'más', 'more'].includes(t));
  if (ambiguos.length) A(pag, 'WCAG 2.4.4', `${ambiguos.length} enlace(s) con texto poco descriptivo`);

  // ── 4.1.1 Identificadores duplicados ─────────────────────────────────────
  const ids = all(/\bid\s*=\s*["']([^"']+)["']/gi, doc).map((m) => m[1]);
  const dup = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
  if (dup.length) F(pag, 'WCAG 4.1.1', `id duplicado(s): ${dup.slice(0, 3).join(', ')}`);

  // ── 2.4.3 Orden del foco ─────────────────────────────────────────────────
  const positivos = all(/\btabindex\s*=\s*["']([1-9]\d*)["']/gi, doc);
  if (positivos.length)
    F(pag, 'WCAG 2.4.3', `${positivos.length} tabindex positivo(s); rompen el orden natural del foco`);

  // ── 4.1.2 Etiquetas de formulario ────────────────────────────────────────
  for (const m of all(/<(input|select|textarea)\b([^>]*)>/gi, doc)) {
    const at = m[2];
    if (/type\s*=\s*["'](hidden|submit|button|image)["']/i.test(at)) continue;
    const id = /\bid\s*=\s*["']([^"']+)["']/i.exec(at)?.[1];
    const tieneLabel = id && new RegExp(`<label[^>]*\\bfor\\s*=\\s*["']${id}["']`, 'i').test(doc);
    if (!tieneLabel && !/aria-label|aria-labelledby|title\s*=/i.test(at))
      F(pag, 'WCAG 4.1.2', `<${m[1]}> sin etiqueta asociada`);
  }

  // ── 2.4.1 Saltar al contenido ────────────────────────────────────────────
  if (!/href\s*=\s*["']#contenido["']/i.test(doc)) A(pag, 'WCAG 2.4.1', 'sin enlace para saltar al contenido');

  // ── 2.5.8 Enlace solo en su párrafo — AVISO, no fallo ────────────────────
  // Este auditor NO puede medir cajas: no tiene estilos calculados. Lo que sí
  // puede es señalar el PATRÓN donde el defecto aparece siempre.
  //
  // Un `<a>` dentro de una frase está exento del tamaño mínimo de objetivo —lo
  // dice el propio criterio 2.5.8, «Inline»—. Un `<a>` que es el contenido
  // COMPLETO de su párrafo no lo está, y ahí el relleno vertical de un elemento
  // en línea NO suma a la altura de la caja: se queda en la altura de la
  // línea, unos 17 px.
  //
  // Ha ocurrido TRES veces en este proyecto —pie de página, selector de idioma
  // y el enlace al aviso de privacidad de la página de solicitud—. A la tercera
  // deja de ser un descuido y pasa a ser algo que la herramienta debe recordar.
  const solos = all(/<p\b[^>]*>\s*(<a\b[^>]*>[\s\S]*?<\/a>)\s*<\/p>/gi, doc);
  if (solos.length)
    A(pag, 'WCAG 2.5.8', `${solos.length} enlace(s) que ocupan su párrafo entero: `
      + `verificar que la caja mide 24 px o más de alto (un <a> en línea NO suma su relleno vertical)`);

  // ── 1.1.1 Imágenes ───────────────────────────────────────────────────────
  const sinAlt = all(/<img\b[^>]*>/gi, doc).filter((m) => !/\balt(\s*=|[\s>/])/i.test(m[0]));
  if (sinAlt.length) F(pag, 'WCAG 1.1.1', `${sinAlt.length} <img> sin atributo alt`);
}

// ── Informe ────────────────────────────────────────────────────────────────
const agrupar = (lista) => {
  const m = new Map();
  for (const x of lista) {
    const k = `${x.criterio} · ${x.det}`;
    m.set(k, [...(m.get(k) ?? []), x.pag]);
  }
  return m;
};

console.log(`\n  Auditoría de accesibilidad · ${paginas.length} páginas · ${RAIZ}\n`);

const gF = agrupar(fallos);
const gA = agrupar(avisos);

if (gF.size) {
  console.log(`  ✗ ${fallos.length} fallo(s) en ${gF.size} tipo(s):\n`);
  for (const [k, pags] of gF)
    console.log(`    ${k}\n      en ${pags.length} pág.: ${pags.slice(0, 4).join(', ')}${pags.length > 4 ? '…' : ''}\n`);
}
if (gA.size) {
  console.log(`  ⚠ ${avisos.length} aviso(s):\n`);
  for (const [k, pags] of gA)
    console.log(`    ${k}\n      en ${pags.length} pág.: ${pags.slice(0, 4).join(', ')}${pags.length > 4 ? '…' : ''}\n`);
}
if (!gF.size && !gA.size) console.log('  ✓ Sin hallazgos en las comprobaciones de marcado.\n');

console.log('  ℹ Contraste, objetivos táctiles y visibilidad del foco NO se comprueban');
console.log('    aquí: requieren estilos calculados y se miden en el navegador.\n');

process.exit(fallos.length ? 1 : 0);
