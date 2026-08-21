/**
 * Pruebas de la composición del mensaje — `node --test`.
 *
 *   node --test site/src/booking/
 *
 * Es la primera prueba automatizada de lógica del proyecto, y existe por un
 * motivo concreto: el cálculo de noches es la única aritmética del sitio que
 * puede equivocarse **en silencio**. Un error de un día en una reserva no lanza
 * ninguna excepción, no rompe el build y no lo ve el auditor: lo descubre el
 * huésped al llegar. Eso es exactamente lo que una prueba unitaria paga.
 *
 * El resto del sitio no lleva pruebas unitarias y no debe llevarlas: son páginas
 * estáticas cuya corrección se verifica mirándolas y con los auditores. Poner
 * un framework de pruebas para comprobar que un <h1> dice lo que dice seria
 * ceremonia sin beneficio (CLAUDE.md §2.5). Aqui hay logica, y por eso hay
 * pruebas.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// El módulo es TypeScript y estas pruebas corren en Node sin transpilar: se le
// quitan las anotaciones de tipo con una sustitución mínima. Es menos elegante
// que un runner con TS, y a cambio no añade una sola dependencia al proyecto.
const fuente = readFileSync(new URL('./solicitud.ts', import.meta.url), 'utf8')
  .replace(/^export interface [\s\S]*?^}$/gm, '')
  .replace(/: \{ asunto: string; cuerpo: string \}/g, '')
  .replace(/\((\w+): [A-Za-z<>, |]+\)/g, '($1)')
  .replace(/\((\w+): \w+, (\w+): \w+\)/g, '($1, $2)')
  .replace(/\((\w+): \w+, (\w+): \w+, (\w+): \w+\)/g, '($1, $2, $3)')
  .replace(/: (number|string|void)\b(?=\s*[{;])/g, '');
const { noches, componerSolicitud, enlaceCorreo } = await import(
  'data:text/javascript;base64,' + Buffer.from(fuente).toString('base64')
);

test('noches: caso normal', () => {
  assert.equal(noches('2026-03-10', '2026-03-13'), 3);
});

test('noches: el cambio de horario de verano NO descuenta una noche', () => {
  // En México el horario de verano se abolió en 2022, pero el huésped puede
  // tener el navegador en un huso que sí lo aplique, y `new Date(iso)` se
  // interpreta en hora LOCAL. Anclar a mediodía UTC es lo que salva el cálculo.
  assert.equal(noches('2026-03-07', '2026-03-09'), 2);   // EE. UU. adelanta el 8
  assert.equal(noches('2026-10-24', '2026-10-26'), 2);   // Europa atrasa el 25
});

test('noches: mismo día y orden invertido dan 0, no negativo', () => {
  assert.equal(noches('2026-03-10', '2026-03-10'), 0);
  assert.equal(noches('2026-03-13', '2026-03-10'), 0);
});

test('noches: fecha vacía o mal formada da 0 y no lanza', () => {
  assert.equal(noches('', ''), 0);
  assert.equal(noches('10/03/2026', '2026-03-13'), 0);
});

const R = {
  asunto: 'Solicitud de reserva', llegada: 'Llegada', salida: 'Salida', noches: 'noches',
  tipo: 'Alojamiento', sinPreferencia: 'Sin preferencia', huespedes: 'Huéspedes',
  adultos: 'adultos', menores: 'menores', nombre: 'Nombre', correo: 'Correo',
  telefono: 'Teléfono', comentarios: 'Comentarios',
  tipos: { 'suite-mar': 'Suite Mar' }, cierre: 'Solicitud sujeta a confirmación del hotel.',
};
const base = {
  llegada: '2026-03-10', salida: '2026-03-13', tipo: 'suite-mar',
  adultos: 2, menores: 0, nombre: 'Ana Ruiz', correo: 'ana@example.com',
};

test('el mensaje lleva fechas, noches, tipo legible y contacto', () => {
  const { asunto, cuerpo } = componerSolicitud(base, R);
  assert.equal(asunto, 'Solicitud de reserva — 2026-03-10 → 2026-03-13');
  assert.match(cuerpo, /Salida: 2026-03-13 \(3 noches\)/);
  assert.match(cuerpo, /Alojamiento: Suite Mar/);   // el id, no; el nombre, sí
  assert.match(cuerpo, /Correo: ana@example\.com/);
});

test('los campos opcionales vacíos no dejan líneas huérfanas', () => {
  const { cuerpo } = componerSolicitud(base, R);
  assert.ok(!cuerpo.includes('Teléfono'));
  assert.ok(!cuerpo.includes('Comentarios'));
  assert.ok(!/\n\n\n/.test(cuerpo), 'no debe haber huecos dobles');
});

test('sin preferencia de tipo se dice, no se deja en blanco', () => {
  const { cuerpo } = componerSolicitud({ ...base, tipo: '' }, R);
  assert.match(cuerpo, /Alojamiento: Sin preferencia/);
});

test('ADR-0003: el mensaje NUNCA afirma que la reserva esté confirmada', () => {
  const { asunto, cuerpo } = componerSolicitud({ ...base, comentarios: 'gracias' }, R);
  assert.match(cuerpo, /sujeta a confirmación/);
  assert.ok(!/reserva confirmada|booking confirmed/i.test(asunto + cuerpo));
});

test('el mailto escapa & ? y # de los comentarios, que si no parten la URL', () => {
  const { asunto, cuerpo } = componerSolicitud(
    { ...base, comentarios: 'Llegamos tarde & preguntamos: ¿cuna? #luna-de-miel' }, R);
  const url = enlaceCorreo('hola@example.com', asunto, cuerpo);
  assert.ok(url.startsWith('mailto:hola@example.com?subject='));
  // Tras el cuerpo no puede aparecer ningun separador de parametros sin escapar
  assert.equal(url.split('&body=').length, 2);
  assert.ok(!url.split('&body=')[1].includes('&'));
  assert.ok(!url.split('&body=')[1].includes('#'));
});
