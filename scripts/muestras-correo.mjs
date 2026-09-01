/**
 * Genera muestras de los DOS correos del flujo de solicitud, para revisarlos
 * antes de que exista un solo huésped real.
 *
 *   node scripts/muestras-correo.mjs [carpeta]        # escribe los archivos
 *   node scripts/muestras-correo.mjs --enviar         # además los manda
 *
 * ── POR QUÉ ESTO EXISTE ────────────────────────────────────────────────────
 * El correo de acuse es la única pieza del proyecto que NO se puede revisar en
 * el navegador: se ve distinto en Gmail, en Outlook y en Mail de iOS, y sus
 * defectos son de los que sólo aparecen al abrirlo. Ya pasó una vez —los
 * acentos salían como «MarÃa JosÃ©» por un `charset` que faltaba, y ninguna
 * prueba unitaria podía verlo—. Generar muestras y mirarlas es la prueba.
 *
 * ── LAS SEIS VARIANTES, Y POR QUÉ ESAS ─────────────────────────────────────
 * No son seis ejemplos bonitos: cada una ejerce una rama distinta del código.
 *
 *   1. es-tarde-completa   todos los campos + comentarios + menores
 *   2. es-manana-minima    lo mínimo que el formulario acepta: sin teléfono,
 *                          sin comentarios, sin menores, sin tipo elegido
 *   3. es-noche-acentos    nombre y comentario con acentos, ñ, ¿? y comillas
 *                          — la prueba del `charset` que ya falló una vez
 *   4. en-tarde-completa   la misma que 1, en inglés
 *   5. es-tarde-inyeccion  un comentario con HTML dentro, para comprobar que
 *                          se escapa y no se ejecuta
 *   6. es-tarde-larga      un comentario de varios párrafos, para ver cómo
 *                          respira la caja cuando el texto es largo
 *
 * ── 🔴 NO MANDA NADA POR SU CUENTA ─────────────────────────────────────────
 * Sin `--enviar` sólo escribe archivos. Con `--enviar` necesita dos variables
 * de entorno, y si falta cualquiera se planta y lo dice:
 *
 *   RESEND_API_KEY=re_...  MUESTRAS_PARA=tu@correo.com \
 *     node scripts/muestras-correo.mjs --enviar
 *
 * La llave NUNCA se escribe en el repositorio ni en disco: se lee del entorno
 * y se usa para una petición. Es la misma regla de CLAUDE.md §6 —«nada de
 * credenciales del cliente en el repositorio»— aplicada también a lo temporal.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { componerSolicitud } from '../site/src/booking/solicitud.ts';
import { correoAcuseHtml, correoManagerHtml, saludoPorHoraUTC } from '../site/src/booking/correoHtml.ts';
import { ui } from '../site/src/i18n/ui.ts';

const args = process.argv.slice(2);
const enviar = args.includes('--enviar');
const salida = args.find((a) => !a.startsWith('--')) ?? 'muestras-correo';

/** Los rótulos, tal y como los arma el sitio: del diccionario, no a mano. */
function rotulos(idioma) {
  const t = ui[idioma];
  return {
    asunto: t['reserva.asunto'],
    llegada: t['reserva.llegada'],
    salida: t['reserva.salida'],
    noches: t['reserva.noches'],
    tipo: t['reserva.tipo'],
    sinPreferencia: t['reserva.sinPreferencia'],
    huespedes: t['reserva.fieldsetHuespedes'],
    adultos: t['reserva.adultos'].toLowerCase(),
    menores: t['reserva.menores'].toLowerCase(),
    adulto: t['reserva.adulto'].toLowerCase(),
    menor: t['reserva.menor'].toLowerCase(),
    nombre: t['reserva.nombre'],
    correo: t['reserva.correo'],
    telefono: t['reserva.telefono'],
    comentarios: t['reserva.comentarios'],
    cierre: t['reserva.cierre'],
    // Los nombres de los tipos vienen de la colección y SE TRADUCEN. Este
    // script los tenía en español para los dos idiomas, y la muestra inglesa
    // salía con «Habitación King…» dentro. Era un defecto del script, no del
    // sitio —`FormularioSolicitud.astro` los saca de `x.data.nombre[idioma]`—,
    // pero una muestra que miente sobre el producto no sirve para revisarlo.
    tipos: idioma === 'es'
      ? {
          'bungalow-mar': 'Bungalow Mar',
          'bungalow-cielo': 'Bungalow Cielo',
          'habitacion-king-mar': 'Habitación King · Vista parcial jardín y/o mar',
        }
      : {
          'bungalow-mar': 'Bungalow Mar',
          'bungalow-cielo': 'Bungalow Cielo',
          'habitacion-king-mar': 'King Room · Partial garden &/or ocean views',
        },
  };
}

function textosManager(idioma) {
  const t = ui[idioma];
  return {
    antetitulo: t['manager.antetitulo'], intro: t['manager.intro'],
    contacto: t['manager.contacto'], responder: t['manager.responder'],
    aviso: t['manager.aviso'], cierre: t['manager.cierre'], idioma,
  };
}

function textos(idioma, horaUTC) {
  const t = ui[idioma];
  const clave = saludoPorHoraUTC(horaUTC);
  const saludo = { manana: 'reserva.saludoManana', tarde: 'reserva.saludoTarde', noche: 'reserva.saludoNoche' }[clave];
  return { saludo: t[saludo], intro: t['reserva.acuseIntro'], cierre: t['reserva.acuseCierre'], idioma };
}

const VARIANTES = [
  {
    id: 'es-tarde-completa', idioma: 'es', horaUTC: 20,
    nota: 'Todo relleno: teléfono, menores, comentario y tipo elegido.',
    s: {
      llegada: '2026-12-18', salida: '2026-12-23', tipo: 'bungalow-cielo',
      adultos: 2, menores: 1, nombre: 'María José Fernández',
      correo: 'maria.jose@example.com', telefono: '+52 998 123 4567',
      comentarios: 'Llegamos sobre las 21:00, venimos del aeropuerto de Cancún.\n¿Se puede pedir cuna para la niña?',
    },
  },
  {
    id: 'es-manana-minima', idioma: 'es', horaUTC: 14,
    nota: 'El mínimo que el formulario acepta: sin teléfono, sin comentarios, sin menores y sin tipo elegido.',
    s: {
      llegada: '2027-02-03', salida: '2027-02-05', tipo: '',
      adultos: 1, menores: 0, nombre: 'Ana Ruiz',
      correo: 'ana@example.com', telefono: '', comentarios: '',
    },
  },
  {
    id: 'es-noche-acentos', idioma: 'es', horaUTC: 3,
    nota: 'La prueba del charset. Acentos, ñ, apertura de interrogación y comillas — el defecto que ya se coló una vez.',
    s: {
      llegada: '2026-10-31', salida: '2026-11-02', tipo: 'bungalow-mar',
      adultos: 2, menores: 0, nombre: 'Iñaki Peña-Muñoz',
      correo: 'inaki@example.com', telefono: '+34 600 11 22 33',
      comentarios: '¿Tenéis habitación con jacuzzi «de verdad»? Celebramos el cumpleaños de mi mujer, Begoña.',
    },
  },
  {
    id: 'en-tarde-completa', idioma: 'en', horaUTC: 20,
    nota: 'La misma que la primera, en inglés: comprueba que la traducción está completa y que nada se quedó en español.',
    s: {
      llegada: '2027-01-09', salida: '2027-01-16', tipo: 'habitacion-king-mar',
      adultos: 2, menores: 2, nombre: 'Jonathan Reed',
      correo: 'jonathan@example.com', telefono: '+1 415 555 0184',
      comentarios: 'We are celebrating our anniversary. Any chance of a late checkout on the last day?',
    },
  },
  {
    id: 'es-tarde-inyeccion', idioma: 'es', horaUTC: 18,
    nota: 'Comentario con HTML y un <script> dentro. Debe verse el texto LITERAL, con los signos visibles y nada ejecutado.',
    s: {
      llegada: '2026-11-20', salida: '2026-11-22', tipo: 'bungalow-mar',
      adultos: 2, menores: 0, nombre: '<b>Prueba</b> Inyección',
      correo: 'prueba@example.com', telefono: '',
      comentarios: '<script>alert(1)</script> ¿Cabe una <img src=x onerror=alert(2)> aquí? "comillas" & ampersand.',
    },
  },
  {
    id: 'es-tarde-larga', idioma: 'es', horaUTC: 17,
    nota: 'Comentario de varios párrafos: cómo respira la caja cuando el huésped escribe de verdad.',
    s: {
      llegada: '2027-03-14', salida: '2027-03-21', tipo: 'bungalow-cielo',
      adultos: 4, menores: 2, nombre: 'Familia Salgado Rivera',
      correo: 'salgado@example.com', telefono: '+52 81 1380 2176',
      comentarios: 'Somos dos matrimonios con dos niños de 6 y 9 años y buscamos dos unidades juntas, si puede ser en la misma planta.\n\nUno de los niños es alérgico a los frutos secos; nos gustaría saber si la cocina lo puede tener en cuenta en el desayuno.\n\nLlegamos en coche de alquiler desde Mérida, así que necesitaríamos dos plazas de estacionamiento. Y si hubiera forma de organizar una salida a los cenotes desde el hotel, nos interesa mucho.',
    },
  },
];

mkdirSync(salida, { recursive: true });
const generadas = [];

for (const v of VARIANTES) {
  const r = rotulos(v.idioma);
  const { asunto, cuerpo } = componerSolicitud(v.s, r);
  const html = correoAcuseHtml(v.s, r, textos(v.idioma, v.horaUTC));
  const htmlAdmin = correoManagerHtml(v.s, r, textosManager(v.idioma));

  writeFileSync(join(salida, `${v.id}--huesped.html`), html, 'utf8');
  writeFileSync(join(salida, `${v.id}--admin.html`), htmlAdmin, 'utf8');
  // El texto plano se sigue generando: no es un resto del pasado, es la
  // alternativa que viaja SIEMPRE junto al HTML en los dos correos.
  writeFileSync(join(salida, `${v.id}--admin.txt`), `Asunto: ${asunto}\n\n${cuerpo}\n`, 'utf8');
  generadas.push({ ...v, asunto, cuerpo, html, htmlAdmin });
  console.log(`  ✓ ${v.id}`);
}

/**
 * Índice para abrir todo de una vez, con la nota de qué prueba cada uno.
 *
 * Los correos del huésped van en `srcdoc` y no en `src`: así el índice es UN
 * SOLO ARCHIVO que se puede mandar por chat o abrir en cualquier sitio sin
 * arrastrar los otros doce detrás. Con `src` relativo, el archivo suelto
 * enseñaba seis marcos vacíos.
 */
const indice = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Muestras de correo · Azucar Hotel Tulum</title>
<style>
 body{font:16px/1.6 system-ui,sans-serif;margin:0;background:#f1eeeb;color:#222}
 .env{max-width:1100px;margin:0 auto;padding:32px 20px}
 h1{font:400 30px/1.2 Georgia,serif;margin:0 0 6px}
 .sub{color:#666;margin:0 0 28px}
 .v{background:#fff;border-radius:6px;margin-bottom:28px;overflow:hidden;border:1px solid #e4dfd8}
 .v>h2{font:600 15px/1.4 system-ui;letter-spacing:.08em;text-transform:uppercase;
   color:#4A6E2C;margin:0;padding:14px 18px;border-bottom:1px solid #e4dfd8}
 .nota{margin:0;padding:12px 18px;color:#666;font-size:14px;background:#f8f5f0}
 .par{display:grid;gap:0}
 @media(min-width:64rem){.par{grid-template-columns:1fr 1fr}}
 .col{padding:16px 18px;min-width:0}
 .col+.col{border-top:1px solid #e4dfd8}
 @media(min-width:64rem){.col+.col{border-top:0;border-left:1px solid #e4dfd8}}
 .col>h3{font:600 12px/1.4 system-ui;letter-spacing:.1em;text-transform:uppercase;color:#666;margin:0 0 10px}
 iframe{width:100%;height:660px;border:1px solid #e4dfd8;border-radius:4px;background:#fff}
 details{margin-top:12px}
 summary{cursor:pointer;font-size:13px;color:#4A6E2C;padding:6px 0}
 pre{white-space:pre-wrap;word-break:break-word;background:#f8f5f0;border:1px solid #e4dfd8;
   border-radius:4px;padding:14px;font:13px/1.6 ui-monospace,Menlo,monospace;margin:0;overflow-x:auto}
</style></head><body><div class="env">
<h1>Muestras de correo</h1>
<p class="sub">Los dos correos del flujo de solicitud, en seis situaciones distintas. Izquierda: lo que recibe el <strong>huésped</strong>. Derecha: lo que recibe el <strong>manager</strong> — los dos en HTML desde el 2026-09-01, y los dos con su alternativa en texto plano viajando siempre debajo.</p>
${generadas.map((v) => `<section class="v">
  <h2>${v.id}</h2>
  <p class="nota">${v.nota}</p>
  <div class="par">
    <div class="col"><h3>Huésped · HTML</h3><iframe srcdoc="${v.html.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}" title="${v.id}"></iframe></div>
    <div class="col"><h3>Manager · HTML</h3>
      <iframe srcdoc="${v.htmlAdmin.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}" title="${v.id} manager"></iframe>
      <details><summary>Ver la alternativa en texto plano, que viaja siempre</summary>
      <pre>Asunto: ${v.asunto.replace(/&/g,'&amp;').replace(/</g,'&lt;')}\n\n${v.cuerpo.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</pre></details></div>
  </div>
</section>`).join('\n')}
</div></body></html>`;
writeFileSync(join(salida, 'index.html'), indice, 'utf8');
console.log(`\n  ${generadas.length} variantes en ${salida}/ · abre ${salida}/index.html\n`);

if (!enviar) process.exit(0);

// ── Envío ────────────────────────────────────────────────────────────────────
const LLAVE = process.env.RESEND_API_KEY;
const PARA = process.env.MUESTRAS_PARA;
if (!LLAVE || !PARA) {
  console.error('\n  ✗ Faltan variables de entorno para enviar.\n');
  console.error('      RESEND_API_KEY=re_...  MUESTRAS_PARA=tu@correo.com \\');
  console.error('        node scripts/muestras-correo.mjs --enviar\n');
  console.error('  La llave no se guarda en ningún sitio: se lee del entorno.\n');
  process.exit(1);
}
// `onboarding@resend.dev` es el remitente de pruebas de Resend y sólo puede
// escribir al correo dueño de la cuenta — que es justo lo que hace falta aquí.
// Con el dominio del hotel verificado (Parte 5 del runbook) se cambia por
// `solicitudes@azucarhotel.com` y ya podría escribir a cualquiera.
const DE = process.env.MUESTRAS_DE ?? 'Azucar Hotel Tulum <onboarding@resend.dev>';

for (const v of generadas) {
  for (const envio of [
    { asunto: `[MUESTRA ${v.id}] Huésped · ${v.asunto}`, html: v.html, texto: undefined },
    { asunto: `[MUESTRA ${v.id}] Manager · ${v.asunto}`, html: v.htmlAdmin, texto: v.cuerpo },
  ]) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LLAVE}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: DE, to: [PARA], subject: envio.asunto,
        ...(envio.html ? { html: envio.html } : {}),
        ...(envio.texto ? { text: envio.texto } : {}),
      }),
    });
    const cuerpo = await res.text();
    console.log(res.ok ? `  ✓ enviado · ${envio.asunto}` : `  ✗ ${res.status} · ${envio.asunto}\n     ${cuerpo}`);
  }
}
