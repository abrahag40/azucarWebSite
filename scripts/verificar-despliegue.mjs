#!/usr/bin/env node
/**
 * Verificación de salud de un despliegue — historia H5.6.
 *
 *   node scripts/verificar-despliegue.mjs https://azucar-hotel-tulum.pages.dev
 *   node scripts/verificar-despliegue.mjs https://azucarhotel.com
 *
 * ── PARA QUÉ SIRVE ──────────────────────────────────────────────────────────
 * Un plan de reversión que dice «si algo va mal, se revierte» no es un plan: es
 * una intención. La parte difícil de un lanzamiento no es revertir —eso son dos
 * clics— sino **decidir si hay que revertir**, a las once de la noche, con el
 * cliente escribiendo por WhatsApp y sin criterio escrito de antemano.
 *
 * Esto convierte esa decisión en una respuesta binaria. Se corre antes del
 * cambio, inmediatamente después, y a intervalos durante las 72 horas de
 * vigilancia (H5.7).
 *
 * ── QUÉ ES UN FALLO Y QUÉ NO ────────────────────────────────────────────────
 * Sólo se marca como FALLO lo que justifica revertir: páginas caídas,
 * redirecciones rotas, las páginas de tarjeta resucitadas, pérdida de las
 * señales de SEO. Lo que es indeseable pero no justifica una reversión —una
 * cabecera de seguridad ausente— es AVISO. Confundir las dos categorías es lo
 * que lleva a revertir por algo cosmético o a no revertir por algo grave.
 */
const destino = (process.argv[2] || '').replace(/\/$/, '');
if (!destino) {
  console.error('Uso: node scripts/verificar-despliegue.mjs <url>');
  process.exit(1);
}

const fallos = [];
const avisos = [];
const oks = [];
const F = (q, d) => fallos.push(`${q} — ${d}`);
const A = (q, d) => avisos.push(`${q} — ${d}`);
const OK = (q) => oks.push(q);

const pedir = async (ruta, opciones = {}) => {
  try {
    const r = await fetch(destino + ruta, { redirect: 'manual', ...opciones });
    return { codigo: r.status, destino: r.headers.get('location'), cabeceras: r.headers, r };
  } catch (e) {
    return { codigo: 0, error: String(e.message).slice(0, 60) };
  }
};

// ── 1. Las páginas que deben responder ──────────────────────────────────────
// Si alguna cae, el sitio está roto para el huésped. Es motivo de reversión.
const ESENCIALES = [
  '/', '/alojamiento/', '/alojamiento/suite-mar', '/servicios/', '/ubicacion/',
  '/preguntas-frecuentes/', '/politicas/', '/contacto/', '/aviso-de-privacidad/',
  '/en/', '/en/rooms/', '/en/rooms/suite-mar', '/en/services/', '/en/contact/',
  '/sitemap.xml', '/robots.txt',
];
for (const ruta of ESENCIALES) {
  const { codigo, error } = await pedir(ruta);
  if (codigo === 200) OK(`200 ${ruta}`);
  else F('Página caída', `${ruta} respondió ${codigo || 'sin respuesta'}${error ? ` (${error})` : ''}`);
}

// ── 2. Las redirecciones que conservan el posicionamiento ───────────────────
// Romperlas no se nota el primer día; se nota en el tráfico de dentro de un mes.
const REDIRECCIONES = {
  '/habitaciones/': '/alojamiento/',
  '/amenidades-y-facilidades/': '/servicios/',
  '/nosotros/': '/',
  '/en/home/': '/en/',
  '/en/about-us/': '/en/',
  '/en/amenities-facilities/': '/en/services/',
  '/politica-de-privacidad/': '/aviso-de-privacidad/',
};
for (const [de, a] of Object.entries(REDIRECCIONES)) {
  const { codigo, destino: loc } = await pedir(de);
  if (codigo !== 301) F('Redirección rota', `${de} respondió ${codigo}, se esperaba 301`);
  else if (loc && !loc.endsWith(a)) F('Redirección mal dirigida', `${de} → ${loc}, se esperaba ${a}`);
  else OK(`301 ${de} → ${a}`);
}

// ── 3. 🚨 Las páginas que NO deben existir ──────────────────────────────────
// Capturaban número de tarjeta y CVV. Que vuelvan a resolver es el único
// escenario de este proyecto en el que revertir sería lo INCORRECTO: habría que
// tirarlas, no restaurar el sitio que las servía.
for (const ruta of ['/autorizacion-de-pago-con-tdc/', '/en/cc-payment-authorization/']) {
  const { codigo } = await pedir(ruta);
  if (codigo === 404) OK(`404 ${ruta} (correcto)`);
  else F('🚨 Página de datos de tarjeta viva', `${ruta} respondió ${codigo}; debe ser 404`);
}

// ── 4. Señales de SEO en la portada ─────────────────────────────────────────
const home = await fetch(destino + '/').then((r) => r.text()).catch(() => '');
const comprobar = [
  [/<link[^>]+rel="canonical"/i, 'canonical'],
  [/<link[^>]+hreflang="en"/i, 'hreflang en'],
  [/<link[^>]+hreflang="x-default"/i, 'hreflang x-default'],
  [/"@type":"Hotel"/, 'schema.org/Hotel'],
  [/<meta[^>]+name="description"/i, 'meta description'],
  [/<h1[^>]*>/i, 'un <h1>'],
];
for (const [re, nombre] of comprobar) {
  if (re.test(home)) OK(nombre);
  else F('Señal de SEO perdida', `falta ${nombre} en la portada`);
}
if (/<meta[^>]+name="robots"[^>]*noindex/i.test(home))
  F('🚨 Portada con noindex', 'la portada se está pidiendo a Google que NO se indexe');

// ── 5. Reglas del proyecto que no se rompen ─────────────────────────────────
if (/reserva confirmada|booking confirmed/i.test(home))
  F('ADR-0003', 'la interfaz promete una reserva confirmada');
const terceros = [...home.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/gi)]
  .map((m) => new URL(m[1]).host)
  .filter((h) => !/azucarhotel\.com$|pages\.dev$/.test(h));
if (terceros.length) A('Origen de terceros', `la portada carga de ${[...new Set(terceros)].join(', ')}`);
else OK('cero orígenes de terceros');

// ── 6. Cabeceras (aviso, no fallo: no justifican revertir) ──────────────────
const { cabeceras } = await pedir('/');
for (const h of ['content-security-policy', 'x-content-type-options', 'referrer-policy']) {
  if (cabeceras?.get(h)) OK(`cabecera ${h}`);
  else A('Cabecera ausente', h);
}
const cc = (await pedir('/fuentes/gilda-display-400.woff2')).cabeceras?.get('cache-control') || '';
if (/immutable/.test(cc)) OK('caché inmutable en tipografías');
else A('Caché', `las tipografías responden con «${cc}»`);

// ── Informe ────────────────────────────────────────────────────────────────
console.log(`\n  Verificación de despliegue · ${destino}\n`);
console.log(`  ✓ ${oks.length} comprobaciones correctas`);
if (avisos.length) {
  console.log(`\n  ⚠ ${avisos.length} aviso(s) — no justifican revertir:`);
  for (const a of avisos) console.log(`      ${a}`);
}
if (fallos.length) {
  console.error(`\n  ✗ ${fallos.length} FALLO(S) — criterio de reversión cumplido:`);
  for (const f of fallos) console.error(`      ${f}`);
  console.error('\n  → Ver docs/05-despliegue/plan-de-reversion.md\n');
  process.exit(1);
}
console.log('\n  ✓ Despliegue sano. Ningún criterio de reversión se cumple.\n');
