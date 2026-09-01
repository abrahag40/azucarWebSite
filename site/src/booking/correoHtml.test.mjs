/**
 * Pruebas de `correoHtml.ts` -- `node --test`.
 *
 * A diferencia de `solicitud.test.mjs`, este archivo importa el `.ts`
 * DIRECTO, sin el truco de despojar tipos a mano: Node 22+ entiende sintaxis
 * de TypeScript "erasable" (interfaces, anotaciones de tipo simples, `import
 * type`) de forma nativa, siempre que el import interno lleve la extensión
 * `.ts` explícita -por eso `correoHtml.ts` importa de `./solicitud.ts` y no
 * de `./solicitud`-. Astro (Vite) y Cloudflare (esbuild) aceptan esa
 * extensión igual de bien, así que no hay coste en el build real.
 *
 * No se migra `solicitud.test.mjs` a este patrón en el mismo cambio: es una
 * mejora aparte, con su propia verificación, no un efecto colateral de
 * añadir el correo HTML.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { saludoPorHoraUTC, correoAcuseHtml, correoManagerHtml } from './correoHtml.ts';

test('saludoPorHoraUTC: mañana en Tulum (UTC-5)', () => {
  // 12:00 UTC = 07:00 en Tulum
  assert.equal(saludoPorHoraUTC(12), 'manana');
  // 16:59 UTC = 11:59 en Tulum, el último minuto de "mañana"
  assert.equal(saludoPorHoraUTC(16), 'manana');
});

test('saludoPorHoraUTC: tarde en Tulum', () => {
  // 17:00 UTC = 12:00 en Tulum, primer minuto de "tarde"
  assert.equal(saludoPorHoraUTC(17), 'tarde');
  // 23:59 UTC = 18:59 en Tulum, último minuto de "tarde"
  assert.equal(saludoPorHoraUTC(23), 'tarde');
});

test('saludoPorHoraUTC: noche en Tulum, con el envolvimiento de medianoche', () => {
  // 00:00 UTC = 19:00 en Tulum, primer minuto de "noche"
  assert.equal(saludoPorHoraUTC(0), 'noche');
  // 09:59 UTC = 04:59 en Tulum, sigue siendo "noche"
  assert.equal(saludoPorHoraUTC(9), 'noche');
  // 04:00 UTC = 23:00 del día anterior en Tulum -- el caso que prueba que la
  // resta no da un número negativo sin el `+ 24) % 24` de la función
  assert.equal(saludoPorHoraUTC(4), 'noche');
});

const R = {
  asunto: 'Solicitud de reserva', llegada: 'Llegada', salida: 'Salida', noches: 'noches',
  tipo: 'Alojamiento', sinPreferencia: 'Sin preferencia', huespedes: 'Huéspedes',
  adultos: 'adultos', menores: 'menores', adulto: 'adulto', menor: 'menor', nombre: 'Nombre', correo: 'Correo',
  telefono: 'Teléfono', comentarios: 'Comentarios',
  tipos: { 'bungalow-mar': 'Bungalow Mar' }, cierre: 'Solicitud sujeta a confirmación del hotel.',
};
const base = {
  llegada: '2026-03-10', salida: '2026-03-13', tipo: 'bungalow-mar',
  adultos: 2, menores: 0, nombre: 'Ana Ruiz', correo: 'ana@example.com',
};
const textos = { saludo: 'Buenas tardes', intro: 'Esto es lo que recibimos.', cierre: 'Sujeta a confirmación.', idioma: 'es' };

test('el HTML incluye el saludo, el nombre y las noches calculadas', () => {
  const html = correoAcuseHtml(base, R, textos);
  assert.match(html, /Buenas tardes, Ana Ruiz\./);
  assert.match(html, /2026-03-13 \(3 noches\)/);
  assert.match(html, /Bungalow Mar/);
});

test('escapa HTML del nombre y los comentarios -- no se inyecta marcado', () => {
  const html = correoAcuseHtml(
    { ...base, nombre: 'Ana <script>alert(1)</script>', comentarios: 'Llegamos & <b>tarde</b>' },
    R, textos,
  );
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /Llegamos &amp; &lt;b&gt;tarde&lt;\/b&gt;/);
});

test('los saltos de línea de los comentarios se ven como <br>, no como \\n literal', () => {
  const html = correoAcuseHtml({ ...base, comentarios: 'Primera línea\nSegunda línea' }, R, textos);
  assert.match(html, /Primera línea<br>Segunda línea/);
});

test('sin comentarios, no se pinta el bloque de comentarios', () => {
  const html = correoAcuseHtml(base, R, textos);
  assert.ok(!html.includes(R.comentarios));
});

test('sin preferencia de tipo se dice, igual que en el correo de texto', () => {
  const html = correoAcuseHtml({ ...base, tipo: '' }, R, textos);
  assert.match(html, /Sin preferencia/);
});

test('ADR-0003: el correo HTML tampoco afirma nunca que la reserva esté confirmada', () => {
  const html = correoAcuseHtml(base, R, textos);
  assert.ok(!/reserva confirmada|booking confirmed/i.test(html));
});

test('declara su propia codificación y su idioma -- sin esto los acentos se ven mal', () => {
  const html = correoAcuseHtml(base, R, textos);
  assert.match(html, /<meta charset="utf-8">/);
  assert.match(html, /<html lang="es">/);

  const enIngles = correoAcuseHtml(base, R, { ...textos, idioma: 'en' });
  assert.match(enIngles, /<html lang="en">/);
});


/* ── Aviso al manager en HTML (cliente, 2026-09-01) ──────────────────────────
   Lo que se comprueba aquí NO es que se vea bonito -eso son las muestras de
   `scripts/muestras-correo.mjs`, que hay que MIRAR-. Es lo que un `assert`
   sí puede afirmar y una mirada se deja: que el texto del huésped nunca se
   ejecute, que los enlaces de acción existan, y que el aviso de tarjeta esté.
   Ese último no es cosmético: es el hallazgo crítico del proyecto (R-13), y
   una prueba es lo que impide que alguien lo quite "porque estorba". */
const TM = {
  antetitulo: 'Nueva solicitud', intro: 'Comprueba la disponibilidad.',
  contacto: 'Contacto del huésped', responder: 'Responder al huésped',
  aviso: 'Nunca pidas número de tarjeta ni CVV.',
  cierre: 'Nada queda apartado hasta que tú lo confirmes.', idioma: 'es',
};

test('manager: el correo del huésped se puede pulsar, con el asunto ya puesto', () => {
  const html = correoManagerHtml(base, R, TM);
  assert.match(html, /href="mailto:ana@example\.com\?subject=/);
  assert.match(html, /Responder al huésped/);
});

test('manager: el teléfono se limpia para `tel:` y se muestra tal cual lo escribieron', () => {
  const html = correoManagerHtml({ ...base, telefono: '+52 (998) 123-4567' }, R, TM);
  assert.match(html, /href="tel:\+529981234567"/, 'el enlace va sin espacios ni paréntesis');
  assert.match(html, /\+52 \(998\) 123-4567/, 'lo visible conserva el formato del huésped');
});

test('manager: sin teléfono no hay fila de teléfono ni enlace roto', () => {
  const html = correoManagerHtml({ ...base, telefono: '' }, R, TM);
  assert.ok(!html.includes('tel:'), 'no debe quedar un tel: vacío');
});

test('manager: el texto del huésped NO se ejecuta', () => {
  const html = correoManagerHtml(
    { ...base, nombre: '<b>x</b>', comentarios: '<script>alert(1)</script>' }, R, TM,
  );
  assert.ok(!html.includes('<script>alert(1)</script>'), 'el script llegaría al buzón del hotel');
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
});

test('manager: el aviso de datos de tarjeta SIEMPRE viaja', () => {
  // R-13, PCI-DSS 3.3.1 y 4.2.1. Va en el correo y no sólo en el runbook
  // porque el runbook se lee una vez y esto se lee en cada solicitud.
  assert.match(correoManagerHtml(base, R, TM), /Nunca pidas número de tarjeta ni CVV\./);
});

test('manager: las fechas van arriba, antes que ningún otro dato', () => {
  const html = correoManagerHtml(base, R, TM);
  assert.ok(html.indexOf('2026-03-10') < html.indexOf('Contacto del huésped'),
    'el manager comprueba las fechas primero: si no van arriba, el diseño no hace su trabajo');
});
