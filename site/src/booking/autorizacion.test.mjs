/**
 * Pruebas de `componerAutorizacion` y sus ayudantes.
 *
 * Lo que se prueba aqui es lo que puede equivocarse EN SILENCIO: el domicilio
 * -siete campos, uno opcional, unidos con comas- y el tope de cuatro digitos,
 * que es lo que mantiene el formulario fuera del alcance PCI-DSS.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  componerAutorizacion, domicilioEnLinea, camposFaltantes, ultimos4Validos,
} from './autorizacion.ts';

const R = {
  asunto: 'Autorizacion de cargo', fecha: 'Fecha', llegada: 'Llegada', salida: 'Salida',
  habitaciones: 'Habitaciones', huespedes: 'Huespedes', huespedPrincipal: 'Huesped principal',
  titular: 'Titular de la tarjeta', telefono: 'Telefono', tipoTarjeta: 'Tipo de tarjeta',
  ultimos4: 'Ultimos 4 digitos', domicilio: 'Domicilio de facturacion', total: 'Total autorizado',
  declaracion: 'Autorizo el cargo indicado.',
};

const base = {
  fecha: '2026-09-15', llegada: '2026-12-18', salida: '2026-12-23',
  habitaciones: '1 Bungalow Mar', huespedes: 2, huespedPrincipal: 'Maria Jose Fernandez',
  nombreTitular: 'Juan Perez', telefono: '+52 998 123 4567', tipoTarjeta: 'Visa',
  ultimos4: '4242', calle: 'Av. Constitucion', numeroExterior: '120', numeroInterior: '4B',
  codigoPostal: '64000', colonia: 'Centro', ciudad: 'Monterrey', pais: 'Mexico',
  total: '$18,000 MXN',
};

/* ── El domicilio ────────────────────────────────────────────────────────── */

test('domicilio: con interior, se arma entero y en orden', () => {
  assert.equal(domicilioEnLinea(base),
    'Av. Constitucion #120 int. 4B, Centro, C.P. 64000, Monterrey, Mexico');
});

test('domicilio: SIN interior no deja una coma huerfana', () => {
  const d = domicilioEnLinea({ ...base, numeroInterior: '' });
  assert.equal(d, 'Av. Constitucion #120, Centro, C.P. 64000, Monterrey, Mexico');
  assert.doesNotMatch(d, /,\s*,/, 'dos comas seguidas: el campo vacio dejo un hueco');
  assert.doesNotMatch(d, /(^,|,\s*$)/, 'coma al principio o al final');
});

test('domicilio: un interior con espacios se trata como vacio', () => {
  assert.equal(domicilioEnLinea({ ...base, numeroInterior: '   ' }),
    domicilioEnLinea({ ...base, numeroInterior: '' }));
});

/* ── Los ultimos cuatro digitos ──────────────────────────────────────────── */

test('ultimos4: acepta exactamente cuatro digitos', () => {
  assert.ok(ultimos4Validos('4242'));
  assert.ok(ultimos4Validos(' 0000 '));
});

test('🔴 ultimos4: RECHAZA cualquier cosa que se parezca a un numero de tarjeta', () => {
  // El tope de cuatro es lo que mantiene este formulario fuera del alcance
  // PCI-DSS. Si esto deja de fallar, el formulario captura datos de tarjeta.
  assert.equal(ultimos4Validos('4242424242424242'), false, 'un PAN de 16 digitos');
  assert.equal(ultimos4Validos('424242'), false, 'seis digitos');
  assert.equal(ultimos4Validos('123'), false, 'tres digitos');
  assert.equal(ultimos4Validos('42a2'), false, 'con letras');
  assert.equal(ultimos4Validos(''), false, 'vacio');
});

/* ── Campos obligatorios ─────────────────────────────────────────────────── */

test('faltantes: con todo relleno no falta ninguno', () => {
  assert.deepEqual(camposFaltantes(base), []);
});

test('faltantes: el interior es OPCIONAL y no se reclama', () => {
  assert.deepEqual(camposFaltantes({ ...base, numeroInterior: '' }), []);
});

test('faltantes: los nombra uno a uno, no dice "faltan datos"', () => {
  const f = camposFaltantes({ ...base, ciudad: '', total: '  ' });
  assert.deepEqual(f.sort(), ['ciudad', 'total']);
});

test('faltantes: cero huespedes se reclama', () => {
  assert.ok(camposFaltantes({ ...base, huespedes: 0 }).includes('huespedes'));
});

/* ── El mensaje ──────────────────────────────────────────────────────────── */

test('🔴 el mensaje NUNCA puede llevar un numero de tarjeta ni un CVV', () => {
  // La prueba que justifica que este formulario exista. PCI-DSS 3.2 y 4.2.1,
  // regla 4 de CLAUDE.md, hallazgo R-13. El tipo `Autorizacion` no tiene esos
  // campos, asi que esto comprueba que nadie los cuele por la puerta de atras.
  const { cuerpo } = componerAutorizacion({ ...base, habitaciones: '1 Bungalow Mar' }, R);
  assert.doesNotMatch(cuerpo, /\d{13,19}/, 'hay una secuencia con forma de PAN en el mensaje');
  assert.doesNotMatch(cuerpo, /\bcvv\b|\bcvc\b|seguridad/i, 'se menciona el codigo de seguridad');
  assert.match(cuerpo, /Ultimos 4 digitos: 4242/);
});

test('el asunto lleva el nombre del huesped, que es por lo que el manager busca', () => {
  const { asunto } = componerAutorizacion(base, R);
  assert.equal(asunto, 'Autorizacion de cargo — Maria Jose Fernandez');
});

test('la declaracion de autorizacion cierra el mensaje', () => {
  const { cuerpo } = componerAutorizacion(base, R);
  assert.ok(cuerpo.trimEnd().endsWith('Autorizo el cargo indicado.'),
    'sin la declaracion al final, el correo no es una autorizacion de nada');
});

test('el importe y las fechas viajan tal cual se escribieron', () => {
  const { cuerpo } = componerAutorizacion(base, R);
  assert.match(cuerpo, /Total autorizado: \$18,000 MXN/);
  assert.match(cuerpo, /Llegada: 2026-12-18/);
  assert.match(cuerpo, /Salida: 2026-12-23/);
});
