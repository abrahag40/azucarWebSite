#!/usr/bin/env node
/**
 * Auditoría automatizada sobre una captura HTTrack.
 *
 *   node scripts/audit-mirror.mjs investigacion/mirrors/azucarhotel
 *
 * Sin dependencias: se ejecuta con Node puro. El parseo es por expresiones
 * regulares, suficiente para auditoría — no necesitamos un DOM completo para
 * contar <h1> ni para detectar hreflang, y evitar dependencias hace que este
 * script siga funcionando dentro de dos años.
 *
 * Produce  informe.md  y  datos.json  dentro de la carpeta de la captura.
 * datos.json existe para que los hallazgos se puedan volver a consultar sin
 * releer el mirror: el informe es para humanos, el JSON para el siguiente paso.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

const ROOT = process.argv[2];
if (!ROOT || !existsSync(ROOT)) {
  console.error('Uso: node scripts/audit-mirror.mjs <carpeta-de-la-captura>');
  process.exit(1);
}
const FILES_DIR = existsSync(join(ROOT, 'archivos')) ? join(ROOT, 'archivos') : ROOT;

// ---------- utilidades ----------
const walk = (dir, acc = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'hts-cache' && e.name !== '^') walk(p, acc); }
    else acc.push(p);
  }
  return acc;
};
const kb = b => Math.round(b / 1024);
const all = (re, s) => [...s.matchAll(re)];
const one = (re, s) => { const m = s.match(re); return m ? m[1].trim() : null; };
const strip = s => s.replace(/\s+/g, ' ').trim();

const files = walk(FILES_DIR);
const htmlFiles = files.filter(f => /\.html?$/i.test(f));

// ---------- pesos por tipo ----------
const byExt = {};
let totalBytes = 0;
for (const f of files) {
  const sz = statSync(f).size;
  const e = (extname(f) || '(sin-ext)').toLowerCase();
  byExt[e] = byExt[e] || { n: 0, bytes: 0 };
  byExt[e].n++; byExt[e].bytes += sz; totalBytes += sz;
}

const IMG = /\.(jpe?g|png|gif|webp|avif|svg)$/i;
const imgs = files.filter(f => IMG.test(f)).map(f => ({ f: relative(FILES_DIR, f), b: statSync(f).size }))
  .sort((a, b) => b.b - a.b);

// ---------- análisis por página ----------
const pages = [];
const extDomains = new Map();
const forms = [];
const jsonld = [];
const noteDomain = (url, ctx) => {
  const m = url.match(/^(?:https?:)?\/\/([^/?#]+)/i);
  if (!m) return;
  const d = m[1].toLowerCase().replace(/^www\./, '');
  if (!extDomains.has(d)) extDomains.set(d, { n: 0, ctx: new Set() });
  const rec = extDomains.get(d); rec.n++; rec.ctx.add(ctx);
};

for (const f of htmlFiles) {
  const src = readFileSync(f, 'utf8');
  const rel = relative(FILES_DIR, f);
  const head = src.slice(0, src.search(/<\/head>/i) + 7 || 4000);

  const h1s = all(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, src).map(m => strip(m[1].replace(/<[^>]+>/g, '')));
  const headings = all(/<h([1-6])[^>]*>/gi, src).map(m => +m[1]);
  // salto de jerarquía: de h2 a h4 sin h3
  let jump = null;
  for (let i = 1; i < headings.length; i++)
    if (headings[i] - headings[i - 1] > 1) { jump = `h${headings[i-1]} → h${headings[i]}`; break; }

  const imgTags = all(/<img\b[^>]*>/gi, src).map(m => m[0]);
  const sinAlt = imgTags.filter(t => !/\balt\s*=/i.test(t)).length;
  const sinDim = imgTags.filter(t => !(/\bwidth\s*=/i.test(t) && /\bheight\s*=/i.test(t))).length;
  const lazy   = imgTags.filter(t => /loading\s*=\s*["']?lazy/i.test(t)).length;

  for (const m of all(/<(?:script|img|iframe|source)\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi, src)) noteDomain(m[1], 'src');
  for (const m of all(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi, src)) noteDomain(m[1], 'link');
  for (const m of all(/<a\b[^>]*\bhref\s*=\s*["']((?:https?:)?\/\/[^"']+)["']/gi, src)) noteDomain(m[1], 'enlace');

  for (const m of all(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi, src)) {
    forms.push({
      pagina: rel,
      action: one(/action\s*=\s*["']([^"']*)["']/i, m[1]) ?? '(vacío)',
      method: (one(/method\s*=\s*["']([^"']*)["']/i, m[1]) ?? 'GET').toUpperCase(),
      campos: all(/<(?:input|select|textarea)\b[^>]*\bname\s*=\s*["']([^"']+)["']/gi, m[2]).map(x => x[1]),
      labels: all(/<label\b/gi, m[2]).length,
    });
  }

  for (const m of all(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, src)) {
    try {
      const d = JSON.parse(m[1].trim());
      const tipos = (Array.isArray(d) ? d : [d]).map(x => x['@type']).filter(Boolean).flat();
      jsonld.push({ pagina: rel, tipos });
    } catch { jsonld.push({ pagina: rel, tipos: ['(JSON inválido)'] }); }
  }

  const title = one(/<title[^>]*>([\s\S]*?)<\/title>/i, src);
  pages.push({
    ruta: rel,
    bytes: statSync(f).size,
    lang: one(/<html[^>]*\blang\s*=\s*["']([^"']+)["']/i, src),
    title: title ? strip(title) : null,
    titleLen: title ? strip(title).length : 0,
    description: one(/<meta[^>]+name\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']*)["']/i, src),
    canonical: one(/<link[^>]+rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']*)["']/i, head),
    hreflang: all(/<link[^>]+hreflang\s*=\s*["']([^"']+)["']/gi, head).map(m => m[1]),
    robots: one(/<meta[^>]+name\s*=\s*["']robots["'][^>]*content\s*=\s*["']([^"']*)["']/i, head),
    viewport: /name\s*=\s*["']viewport["']/i.test(head),
    generator: one(/<meta[^>]+name\s*=\s*["']generator["'][^>]*content\s*=\s*["']([^"']*)["']/i, head),
    h1: h1s, nH1: h1s.length, saltoJerarquia: jump,
    imgs: imgTags.length, imgsSinAlt: sinAlt, imgsSinDim: sinDim, imgsLazy: lazy,
    scriptsInline: all(/<script(?![^>]*\bsrc)[^>]*>/gi, src).length,
    estilosInline: all(/\bstyle\s*=\s*["']/gi, src).length,
  });
}

// ---------- huella tecnológica ----------
const joined = files.map(f => relative(FILES_DIR, f)).join('\n');
// Las referencias también viven en el marcado: un CDN externo no deja archivo en el mirror.
const htmlJoined = htmlFiles.map(f => readFileSync(f, 'utf8')).join('\n');
const huella = {
  wordpress: /wp-content|wp-includes|wp-json/i.test(joined),
  tema: [...new Set(all(/wp-content\/themes\/([^/\s]+)/gi, joined).map(m => m[1]))],
  plugins: [...new Set(all(/wp-content\/plugins\/([^/\s]+)/gi, joined).map(m => m[1]))],
  jquery: /jquery/i.test(joined) || /jquery/i.test(htmlJoined),
  generators: [...new Set(pages.map(p => p.generator).filter(Boolean))],
};

// ---------- reserva ----------
const RESERVA = /(sys-rsrv|resnexus|booking|reserv|bookenda|cloudbeds|siteminder|hotelrunner|mews|little.?hotelier)/i;
const enlacesReserva = [];
for (const f of htmlFiles) {
  const src = readFileSync(f, 'utf8');
  for (const m of all(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, src)) {
    const href = m[1], txt = strip(m[2].replace(/<[^>]+>/g, ''));
    if (RESERVA.test(href) || /reserv|book/i.test(txt))
      enlacesReserva.push({ pagina: relative(FILES_DIR, f), href, texto: txt.slice(0, 60) });
  }
}

// ---------- i18n ----------
const es = pages.filter(p => !/(^|\/)en\//.test(p.ruta));
const en = pages.filter(p => /(^|\/)en\//.test(p.ruta));

// ---------- hallazgos ----------
const dup = arr => { const c = {}; arr.forEach(x => x && (c[x] = (c[x] || 0) + 1)); return Object.entries(c).filter(([, n]) => n > 1); };
const hallazgos = [];
const F = (sev, tema, det) => hallazgos.push({ sev, tema, det });

const sinTitle = pages.filter(p => !p.title);
const sinDesc = pages.filter(p => !p.description);
const titleDup = dup(pages.map(p => p.title));
const h1Mal = pages.filter(p => p.nH1 !== 1);
const sinCanon = pages.filter(p => !p.canonical);
const sinHreflang = pages.filter(p => p.hreflang.length === 0);
const sinViewport = pages.filter(p => !p.viewport);
const totalAlt = pages.reduce((a, p) => a + p.imgsSinAlt, 0);
const totalDim = pages.reduce((a, p) => a + p.imgsSinDim, 0);
const imgBytes = imgs.reduce((a, i) => a + i.b, 0);
const modernas = imgs.filter(i => /\.(webp|avif)$/i.test(i.f)).length;

if (sinTitle.length) F('alta', 'SEO', `${sinTitle.length} página(s) sin <title>`);
if (titleDup.length) F('alta', 'SEO', `${titleDup.length} <title> duplicado(s): ${titleDup.slice(0,3).map(([t,n])=>`"${t?.slice(0,45)}" ×${n}`).join(' · ')}`);
if (sinDesc.length) F('media', 'SEO', `${sinDesc.length} de ${pages.length} páginas sin meta description`);
if (h1Mal.length) F('media', 'SEO/A11y', `${h1Mal.length} página(s) sin exactamente un <h1>`);
if (sinCanon.length) F('media', 'SEO', `${sinCanon.length} página(s) sin canonical`);
if (en.length && sinHreflang.length) F('alta', 'i18n', `${sinHreflang.length} página(s) sin hreflang pese a existir versión EN`);
if (sinViewport.length) F('alta', 'Móvil', `${sinViewport.length} página(s) sin meta viewport → no responsivo`);
if (totalAlt) F('alta', 'A11y', `${totalAlt} <img> sin atributo alt (WCAG 1.1.1)`);
if (totalDim) F('media', 'Rendimiento', `${totalDim} <img> sin width/height → provoca CLS`);
if (imgs.length && modernas === 0) F('media', 'Rendimiento', `0 de ${imgs.length} imágenes en formato moderno (WebP/AVIF)`);
if (!jsonld.length) F('alta', 'SEO', 'Sin datos estructurados schema.org — un hotel sin schema.org/Hotel pierde presentación enriquecida en Google');
if (huella.wordpress) F('info', 'Stack', `WordPress detectado · temas: ${huella.tema.join(', ') || '?'} · ${huella.plugins.length} plugins`);
const pesadas = imgs.filter(i => i.b > 500 * 1024);
if (pesadas.length) F('alta', 'Rendimiento', `${pesadas.length} imagen(es) de más de 500 KB · la mayor: ${kb(imgs[0].b)} KB`);
if (en.length && es.length && Math.abs(en.length - es.length) > 1)
  F('media', 'i18n', `Desequilibrio ES/EN: ${es.length} páginas ES vs ${en.length} EN — hay contenido sin traducir`);
if (!enlacesReserva.length) F('alta', 'Conversión', 'No se detectó ningún enlace de reserva');
const saltos = pages.filter(p => p.saltoJerarquia);
if (saltos.length) F('media', 'A11y', `${saltos.length} página(s) con salto en la jerarquía de encabezados (ej. ${saltos[0].saltoJerarquia} en \`${saltos[0].ruta}\`) — rompe la navegación por lector de pantalla (WCAG 1.3.1)`);
const sinLang = pages.filter(p => !p.lang);
if (sinLang.length) F('alta', 'A11y', `${sinLang.length} página(s) sin atributo lang en <html> (WCAG 3.1.1)`);
const noindex = pages.filter(p => /noindex/i.test(p.robots ?? ''));
if (noindex.length) F('alta', 'SEO', `${noindex.length} página(s) con meta robots noindex — invisibles para Google`);
const titleLargo = pages.filter(p => p.titleLen > 60);
if (titleLargo.length) F('info', 'SEO', `${titleLargo.length} <title> de más de 60 caracteres: Google los trunca en resultados`);

// ---------- informe ----------
const sev = { alta: '🔴', media: '🟡', info: 'ℹ️' };
const tabla = (h, r) => [`| ${h.join(' | ')} |`, `|${h.map(() => '---').join('|')}|`, ...r.map(x => `| ${x.join(' | ')} |`)].join('\n');

const md = `# Auditoría técnica — \`${basename(ROOT)}\`

> Generado por \`scripts/audit-mirror.mjs\` sobre la captura HTTrack.
> Reproducible: mismo mirror, mismo resultado.

## Resumen

${tabla(['Métrica', 'Valor'], [
  ['Páginas HTML', pages.length],
  ['Páginas en español', es.length],
  ['Páginas en inglés', en.length],
  ['Archivos totales', files.length],
  ['Peso total', `${kb(totalBytes)} KB`],
  ['Imágenes', `${imgs.length} · ${kb(imgBytes)} KB (${Math.round(imgBytes/totalBytes*100)} % del peso)`],
  ['Formularios', forms.length],
  ['Bloques schema.org', jsonld.length],
])}

## Hallazgos

${hallazgos.length ? tabla(['', 'Tema', 'Hallazgo'],
  hallazgos.sort((a,b)=>['alta','media','info'].indexOf(a.sev)-['alta','media','info'].indexOf(b.sev))
    .map(h => [sev[h.sev], h.tema, h.det])) : '_Sin hallazgos._'}

## Huella tecnológica

${tabla(['Señal', 'Detectado'], [
  ['WordPress', huella.wordpress ? 'sí' : 'no'],
  ['Tema(s)', huella.tema.join(', ') || '—'],
  ['Plugins', huella.plugins.join(', ') || '—'],
  ['jQuery', huella.jquery ? 'sí' : 'no'],
  ['meta generator', huella.generators.join(' · ') || '—'],
])}

## Dominios externos referenciados

${extDomains.size ? tabla(['Dominio', 'Referencias', 'Contexto'],
  [...extDomains.entries()].sort((a,b)=>b[1].n-a[1].n).slice(0,30)
    .map(([d, r]) => [`\`${d}\``, r.n, [...r.ctx].join(', ')])) : '_Ninguno._'}

## Enlaces de reserva

${enlacesReserva.length ? tabla(['Página', 'Destino', 'Texto'],
  [...new Map(enlacesReserva.map(e=>[e.href+e.pagina,e])).values()].slice(0,25)
    .map(e => [`\`${e.pagina}\``, `\`${e.href.slice(0,70)}\``, e.texto])) : '_Ninguno detectado._'}

## Formularios

${forms.length ? tabla(['Página', 'Método', 'Destino', 'Campos', '&lt;label&gt;'],
  forms.map(f => [`\`${f.pagina}\``, f.method, `\`${f.action.slice(0,50)}\``, f.campos.length, f.labels])) : '_Ninguno._'}

## Inventario de páginas

${tabla(['Ruta', 'KB', 'lang', 'title', 'desc', 'h1', 'canon', 'img'],
  pages.sort((a,b)=>a.ruta.localeCompare(b.ruta)).map(p => [
    `\`${p.ruta}\``, kb(p.bytes), p.lang ?? '—',
    p.title ? `${p.titleLen}c` : '❌', p.description ? '✓' : '❌',
    p.nH1 === 1 ? '✓' : `❌${p.nH1}`, p.canonical ? '✓' : '❌', p.imgs,
  ]))}

## 25 imágenes más pesadas

${tabla(['KB', 'Archivo'], imgs.slice(0, 25).map(i => [kb(i.b), `\`${i.f}\``]))}

## Peso por tipo de archivo

${tabla(['ext', 'archivos', 'KB', '%'],
  Object.entries(byExt).sort((a,b)=>b[1].bytes-a[1].bytes)
    .map(([e,v]) => [e, v.n, kb(v.bytes), `${Math.round(v.bytes/totalBytes*100)} %`]))}
`;

writeFileSync(join(ROOT, 'informe.md'), md);
writeFileSync(join(ROOT, 'datos.json'), JSON.stringify(
  { resumen: { paginas: pages.length, es: es.length, en: en.length, archivos: files.length, bytes: totalBytes },
    hallazgos, huella, pages, forms, jsonld, enlacesReserva,
    dominiosExternos: [...extDomains.entries()].map(([d, r]) => ({ dominio: d, n: r.n, ctx: [...r.ctx] })),
    imagenes: imgs.slice(0, 200), pesoPorExtension: byExt }, null, 2));

console.log(`${basename(ROOT)}: ${pages.length} páginas · ${files.length} archivos · ${kb(totalBytes)} KB · ${hallazgos.length} hallazgos`);
console.log(`  → ${join(ROOT, 'informe.md')}`);
