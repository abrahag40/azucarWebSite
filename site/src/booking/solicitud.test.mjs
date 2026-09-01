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
//
// `camposInvalidos` (ADR-0006) añadió dos patrones nuevos que las sustituciones
// de antes no cubrían: un tipo de retorno con corchetes (`string[]`) y `boolean`
// en la lista de tipos primitivos. El shim se extiende, no se reescribe: cada
// patrón nuevo se añade cuando aparece, no antes.
const fuente = readFileSync(new URL('./solicitud.ts', import.meta.url), 'utf8')
  .replace(/^export interface [\s\S]*?^}$/gm, '')
  .replace(/: \{ asunto: string; cuerpo: string \}/g, '')
  .replace(/\((\w+): [A-Za-z<>, |]+\)/g, '($1)')
  .replace(/\((\w+): \w+, (\w+): \w+\)/g, '($1, $2)')
  .replace(/\((\w+): \w+, (\w+): \w+, (\w+): \w+\)/g, '($1, $2, $3)')
  .replace(/: (number|string|boolean|void)\b(?=\s*[{;])/g, '')
  .replace(/: string\[\]/g, '');
const { noches, componerSolicitud, huespedes, enlaceCorreo, camposInvalidos } = await import(
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
  adultos: 'adultos', menores: 'menores', adulto: 'adulto', menor: 'menor', nombre: 'Nombre', correo: 'Correo',
  telefono: 'Teléfono', comentarios: 'Comentarios',
  tipos: { 'bungalow-mar': 'Bungalow Mar' }, cierre: 'Solicitud sujeta a confirmación del hotel.',
};
const base = {
  llegada: '2026-03-10', salida: '2026-03-13', tipo: 'bungalow-mar',
  adultos: 2, menores: 0, nombre: 'Ana Ruiz', correo: 'ana@example.com',
};

test('el mensaje lleva fechas, noches, tipo legible y contacto', () => {
  const { asunto, cuerpo } = componerSolicitud(base, R);
  assert.equal(asunto, 'Solicitud de reserva — 2026-03-10 → 2026-03-13');
  assert.match(cuerpo, /Salida: 2026-03-13 \(3 noches\)/);
  assert.match(cuerpo, /Alojamiento: Bungalow Mar/);   // el id, no; el nombre, sí
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

// `camposInvalidos` (ADR-0006, H3.4): la validación del endpoint.
const HOY = '2026-03-01';

test('camposInvalidos: una solicitud completa y futura no tiene errores', () => {
  assert.deepEqual(camposInvalidos(base, HOY), []);
});

test('camposInvalidos: llegada vacía o en el pasado', () => {
  // Con la llegada vacía, `noches('', salida)` no puede calcularse y da 0: la
  // salida se marca inválida TAMBIÉN, aunque su fecha por sí sola sea correcta.
  // No es un error: es el mismo comportamiento que ya tiene el cliente en
  // `FormularioSolicitud.astro` — no se puede confirmar la salida sin saber la
  // llegada, así que pedir las dos de nuevo es lo honesto.
  assert.deepEqual(camposInvalidos({ ...base, llegada: '' }, HOY), ['llegada', 'salida']);
  assert.deepEqual(camposInvalidos({ ...base, llegada: '2026-02-01' }, HOY), ['llegada']);
});

test('camposInvalidos: salida igual o anterior a la llegada cuenta como inválida', () => {
  assert.deepEqual(camposInvalidos({ ...base, salida: base.llegada }, HOY), ['salida']);
});

test('camposInvalidos: nombre en blanco no pasa con sólo espacios', () => {
  assert.deepEqual(camposInvalidos({ ...base, nombre: '   ' }, HOY), ['nombre']);
});

test('camposInvalidos: correo sin arroba o sin dominio se rechaza', () => {
  assert.deepEqual(camposInvalidos({ ...base, correo: 'no-es-correo' }, HOY), ['correo']);
  assert.deepEqual(camposInvalidos({ ...base, correo: 'ana@sin-dominio' }, HOY), ['correo']);
});

test('camposInvalidos: acumula más de un campo inválido a la vez', () => {
  const invalidos = camposInvalidos({ ...base, nombre: '', correo: 'x' }, HOY);
  assert.deepEqual(invalidos.sort(), ['correo', 'nombre']);
});

/* ── Concordancia de número ──────────────────────────────────────────────────
   El correo decía «1 menores», y en inglés habría dicho «1 children». Lo
   enseñó una MUESTRA generada para revisar el correo a ojo, no una prueba: las
   nueve que había vigilaban la aritmética de las noches —lo que puede
   equivocarse en silencio— y ninguna miraba la redacción.
   La lección no es «faltaban pruebas»: es que hay defectos que sólo se ven
   mirando el resultado, y por eso se generan muestras. Estas cuatro existen
   para que, una vez visto, no vuelva. */
test('un solo huésped va en singular', () => {
  assert.equal(huespedes({ ...base, adultos: 1, menores: 0 }, R), '1 adulto');
  assert.equal(huespedes({ ...base, adultos: 2, menores: 1 }, R), '2 adultos, 1 menor');
});

test('varios huéspedes van en plural', () => {
  assert.equal(huespedes({ ...base, adultos: 2, menores: 3 }, R), '2 adultos, 3 menores');
});

test('sin menores no se menciona a los menores', () => {
  assert.equal(huespedes({ ...base, adultos: 4, menores: 0 }, R), '4 adultos');
});

test('el plural del inglés no se deduce quitando una s', () => {
  const EN = { ...R, adultos: 'adults', menores: 'children', adulto: 'adult', menor: 'child' };
  assert.equal(huespedes({ ...base, adultos: 1, menores: 1 }, EN), '1 adult, 1 child');
  assert.equal(huespedes({ ...base, adultos: 2, menores: 2 }, EN), '2 adults, 2 children');
});
