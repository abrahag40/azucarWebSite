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
  '/', '/nosotros/', '/alojamiento/', '/alojamiento/bungalow-mar', '/servicios/',
  '/eventos/', '/restaurante', '/ubicacion/',
  '/preguntas-frecuentes/', '/politicas/', '/contacto/', '/aviso-de-privacidad/',
  '/en/', '/en/about/', '/en/rooms/', '/en/rooms/bungalow-mar', '/en/services/',
  '/en/events/', '/en/restaurant', '/en/contact/',
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
  // `/nosotros/` YA NO REDIRIGE: desde el 2026-09-01 vuelve a tener pagina
  // propia, a peticion del cliente. Esta comprobacion la esperaba en 301 y por
  // eso el despliegue dio dos fallos con el criterio de reversion cumplido —
  // sin que nada estuviera roto. Un guardian desactualizado grita igual que uno
  // que acierta, y ensena a ignorarlo.
  '/en/home/': '/en/',
  '/en/about-us/': '/en/about/',
  '/en/amenities-facilities/': '/en/services/',
  '/politica-de-privacidad/': '/aviso-de-privacidad/',
};
for (const [de, a] of Object.entries(REDIRECCIONES)) {
  const { codigo, destino: loc } = await pedir(de);
  if (codigo !== 301) F('Redirección rota', `${de} respondió ${codigo}, se esperaba 301`);
  else if (loc && !loc.endsWith(a)) F('Redirección mal dirigida', `${de} → ${loc}, se esperaba ${a}`);
  else OK(`301 ${de} → ${a}`);
}

// ── 3. 🚨 Que NADIE pida datos de tarjeta ───────────────────────────────────
//
// Esta comprobación cambió el 2026-09-15 y conviene entender por qué, porque
// la versión anterior habría pedido revertir un despliegue SANO.
//
// Antes exigía que `/autorizacion-de-pago-con-tdc/` y su gemela inglesa
// devolvieran 404. Tenía sentido mientras esas URLs no tenían a dónde ir: el
// formulario que servían capturaba número de tarjeta y CVV, y matar la URL era
// la única forma de no mantener viva la infracción.
//
// Desde que existe `/autorizacion-tdc/` —los mismos 18 campos legítimos, sin
// PAN y sin CVV— las dos redirigen ahí con un 301. Un guardián que siguiera
// exigiendo 404 gritaría «criterio de reversión cumplido» sobre un sitio
// correcto, y un guardián que se equivoca deja de ser creído.
//
// 🔴 LO QUE SE COMPRUEBA AHORA ES LA PROPIEDAD QUE IMPORTA, no la incidental:
// que a donde quiera que lleven esas URLs, NADIE pida datos de tarjeta. Eso es
// verdad con un 404 y con un 301, y seguiría siendo la comprobación correcta si
// mañana cambia otra vez el destino.
const CAMPOS_PROHIBIDOS =
  /name\s*=\s*["'][^"']*(numero_tarjeta|card_?number|cardnumber|codigo_cvc|cvv|cvc|exp_tarjeta)[^"']*["']/i;

for (const ruta of ['/autorizacion-de-pago-con-tdc/', '/en/cc-payment-authorization/', '/autorizacion-tdc/', '/en/card-authorization/']) {
  const res = await fetch(destino + ruta, { redirect: 'follow' }).catch(() => null);
  if (!res) { F('No respondió', ruta); continue; }
  if (res.status >= 400 && res.status !== 404) { F('Respuesta inesperada', `${ruta} → ${res.status}`); continue; }
  const html = res.status === 404 ? '' : await res.text().catch(() => '');
  if (CAMPOS_PROHIBIDOS.test(html)) {
    F('🚨 Se están pidiendo datos de tarjeta', `${ruta} sirve un campo de número de tarjeta o CVV`);
  } else {
    OK(`${ruta} no pide datos de tarjeta (${res.status})`);
  }
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
// 🔴 Sólo cuenta lo que la portada CARGA, no a dónde ENLAZA. Hasta el
// 2026-09-15 esto contaba `href` y `src` por igual, y el día que se encendió el
// botón de WhatsApp empezó a avisar de que «la portada carga de wa.me» — cuando
// un `<a href>` no descarga nada hasta que alguien lo pulsa. Lo que esta
// comprobación protege es la privacidad del visitante: un recurso de terceros
// le filtra la IP con sólo abrir la página. Un enlace saliente, no.
//
// Cargan: cualquier `src` y el `href` de un `<link>` (hojas de estilo,
// precargas, iconos). No carga: el `href` de un `<a>`.
const cargas = [
  ...home.matchAll(/\ssrc="(https?:\/\/[^"]+)"/gi),
  ...home.matchAll(/<link\b[^>]*\shref="(https?:\/\/[^"]+)"/gi),
];
const terceros = cargas
  .map((m) => new URL(m[1]).host)
  .filter((h) => !/azucarhotel\.com$|pages\.dev$/.test(h));
if (terceros.length) A('Origen de terceros', `la portada carga de ${[...new Set(terceros)].join(', ')}`);
else OK('cero orígenes de terceros que se carguen');

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
