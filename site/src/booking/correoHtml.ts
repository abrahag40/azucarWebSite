/**
 * Version HTML de los DOS correos del flujo de solicitud -- interior del
 * modulo `booking/`.
 *
 * ── LOS DOS TIENEN EL MISMO ASPECTO Y TRABAJOS DISTINTOS ───────────────────
 * Comparten el envoltorio de la plantilla -franja oscura, tipografia con
 * serifa, superficies calidas, acento del sitio- porque los manda el mismo
 * hotel. **La jerarquia de dentro no se parece en nada**, y no debe:
 *
 *   · ACUSE AL HUESPED. Es el primer contacto real con la marca despues de
 *     enviar el formulario. Abre con un saludo por su nombre y ordena los
 *     datos para tranquilizar: "esto es lo que recibimos".
 *
 *   · AVISO AL MANAGER. No viene a enamorar a nadie, viene a que alguien
 *     ACTUE, muchas veces desde un telefono y con prisa. Por eso arriba del
 *     todo van las FECHAS -lo primero que se comprueba contra el cuadrante-,
 *     el contacto del huesped es pulsable, y el aviso de no pedir datos de
 *     tarjeta va donde ocurre el trabajo y no en un documento que nadie
 *     reabre.
 *
 * El correo del manager se mando en texto plano hasta el 2026-09-01, con el
 * argumento de que "llega igual a cualquier cliente de correo". El argumento
 * era bueno y **sigue vigente**: el texto plano NO desaparece, se manda
 * siempre como alternativa junto al HTML. Lo que cambio es que ya no es la
 * unica version. Un correo transaccional con las dos partes es ademas lo que
 * evita que los filtros de spam lo castiguen por venir sin alternativa.
 *
 * ── POR QUE ES UN ARCHIVO APARTE Y NO MAS CODIGO EN `solicitud.ts` ─────────
 * `componerSolicitud` compone el MENSAJE (que dato va en que linea);
 * este archivo compone la PRESENTACION (como se ve esa linea). Son
 * preocupaciones distintas -el manager y el huesped reciben el MISMO dato,
 * en dos formatos-, y mezclarlas habria hecho `componerSolicitud` saber de
 * HTML sin necesitarlo nunca para el correo del manager.
 *
 * ── POR QUE SIGUE SIENDO UNA FUNCION PURA ──────────────────────────────────
 * Sin `Date.now()`, sin acceso a red, sin DOM -mismo criterio que el resto
 * del modulo. La hora del dia para el saludo la decide quien llama
 * (`saludoPorHoraUTC`, mas abajo), no esta funcion: eso es lo que la hace
 * comprobable con `node --test` sin fingir la hora del sistema.
 *
 * ── POR QUE NO HAY UNA IMAGEN DEL LOGOTIPO ─────────────────────────────────
 * Un correo no puede referenciar el logotipo del sitio: su URL cambia en
 * cada build (`/_astro/logo-azucar.HASH.webp`) y dejaria de existir en el
 * siguiente despliegue. Hasta que exista un activo publico y estable para
 * correo, la marca se resuelve con tipografia y color, no con una imagen que
 * se rompe sola.
 *
 * ── 🔴 LOS COLORES ESTAN COPIADOS A MANO, Y ESO YA FALLO UNA VEZ ──────────
 * Aqui no hay variables CSS: los clientes de correo no resuelven `var()`, asi
 * que cada color va escrito con su valor. La consecuencia es que este archivo
 * **no se entera** cuando cambia la paleta del sitio.
 *
 * Paso el 2026-09-01: el acento del sitio paso de oro (#856741) a pistacho
 * (#4A6E2C) y este correo siguio mandando en oro durante un dia, sin que
 * ninguna comprobacion dijera nada — ningun guardian compara un `.ts` con un
 * `.css`. Se descubrio al preparar muestras para revisar, no automaticamente.
 *
 * **Si vuelves a tocar `--color-accent-text` en `tokens.css`, actualiza los
 * dos usos de abajo.** El mapa es este:
 *
 *   tokens.css              este archivo
 *   --color-ink        #222222   titulares y valores
 *   --color-ink-muted  #666666   etiquetas
 *   --color-accent-text #4A6E2C  antetitulo de comentarios y caja de cierre
 *   --color-surface-warm #f8f5f0 fondo de las cajas
 *   --color-surface-alt  #f1eeeb fondo del lienzo
 *   --color-border       #e4dfd8 lineas de la tabla
 *   --color-error        #9b2c2c aviso de datos de tarjeta (manager)
 *   --color-error-suave  #fdf3f3 su fondo
 *
 * ── COMPATIBILIDAD DE CLIENTES DE CORREO ───────────────────────────────────
 * Todo el estilo va en `style=""` inline: los clientes de correo -sobre todo
 * Outlook de escritorio- ignoran o recortan las hojas de estilo en `<head>`.
 * Las tipografias de marca (Gilda Display, Barlow) no cargan en correo -casi
 * ningun cliente soporta `@font-face`-, asi que se usan directamente los
 * *fallbacks* que ya declara `--font-display`/`--font-body` en `tokens.css`:
 * Georgia/Times para los titulares, una pila sans para el cuerpo. La marca no
 * se pierde -mismo color, misma jerarquia-, sólo el tipo de letra exacto.
 */
import { noches, huespedes, type Solicitud, type Rotulos } from './solicitud.ts';

export type SaludoHora = 'manana' | 'tarde' | 'noche';

/**
 * Qué saludo corresponde a una hora UTC dada. Devuelve la CLAVE, no el
 * texto: el texto vive traducido en `ui.ts` (`reserva.saludoManana` y
 * hermanas) y quien llama lo resuelve con `usarT`.
 *
 * Calcula la hora de Tulum, no la del huésped: no la sabemos -no hay forma
 * de saber en qué huso está quien llena un formulario web-, y la que sí
 * tiene sentido para un saludo que firma el hotel es la suya. Quintana Roo
 * usa UTC-5 fijo, SIN horario de verano, desde 2015 (adoptó la "Zona
 * Sureste" por decreto, para alinearse con la industria turística). No hay
 * que ajustar esta cuenta dos veces al año como en el resto de México.
 */
export function saludoPorHoraUTC(horaUTC: number): SaludoHora {
  const horaTulum = ((horaUTC - 5) % 24 + 24) % 24;
  if (horaTulum >= 5 && horaTulum < 12) return 'manana';
  if (horaTulum >= 12 && horaTulum < 19) return 'tarde';
  return 'noche';
}

/** Los textos que este correo necesita y `Rotulos` no tiene, ya traducidos
 *  por quien llama -mismo criterio que el resto del módulo: esta función no
 *  sabe de i18n, se los dan hechos. */
export interface TextosAcuse {
  /** Ya resuelto por `saludoPorHoraUTC` + `usarT`, p. ej. "Buenas tardes". */
  saludo: string;
  intro: string;
  cierre: string;
  /** Para el `lang` del documento -- no se adivina desde el texto. */
  idioma: 'es' | 'en';
}

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** `\n` del huésped a `<br>`, DESPUÉS de escapar -si no, un comentario con
 *  `<br>` literal se colaría sin escapar y el orden importaría al revés. */
function conSaltos(textoEscapado: string): string {
  return textoEscapado.replace(/\n/g, '<br>');
}

function fila(etiqueta: string, valor: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e4dfd8;color:#666666;font-size:14px;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(etiqueta)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e4dfd8;color:#222222;font-size:14px;font-family:Arial,Helvetica,sans-serif;text-align:right;font-weight:600;">${escaparHtml(valor)}</td>
  </tr>`;
}

export function correoAcuseHtml(s: Solicitud, r: Rotulos, textos: TextosAcuse): string {
  const tipoTexto = s.tipo ? (r.tipos[s.tipo] ?? s.tipo) : r.sinPreferencia;
  const n = noches(s.llegada, s.salida);

  const filas = [
    fila(r.llegada, s.llegada),
    fila(r.salida, `${s.salida}${n ? ` (${n} ${r.noches})` : ''}`),
    fila(r.tipo, tipoTexto),
    // La misma función que el correo del manager: el huésped recibe los dos y
    // no pueden decir cosas distintas.
    fila(r.huespedes, huespedes(s, r)),
  ];
  if (s.telefono?.trim()) filas.push(fila(r.telefono, s.telefono.trim()));

  const comentariosHtml = s.comentarios?.trim()
    ? `<div style="margin-top:20px;padding:16px 18px;background:#f8f5f0;border-radius:4px;">
         <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#4A6E2C;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(r.comentarios)}</p>
         <p style="margin:0;font-size:15px;color:#222222;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">${conSaltos(escaparHtml(s.comentarios.trim()))}</p>
       </div>`
    : '';

  return `<!doctype html>
<html lang="${textos.idioma}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escaparHtml(textos.saludo)}</title>
</head>
<body style="margin:0;padding:0;background:#f1eeeb;">
  <div style="background:#f1eeeb;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:4px;overflow:hidden;">

      <div style="background:#222222;padding:28px 32px;text-align:center;">
        <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:0.12em;color:#ffffff;text-transform:uppercase;">Azucar Hotel Tulum</span>
      </div>

      <div style="padding:32px;font-family:Arial,Helvetica,sans-serif;color:#222222;font-size:16px;line-height:1.6;">
        <p style="margin:0 0 16px;font-size:18px;">${escaparHtml(textos.saludo)}, ${escaparHtml(s.nombre)}.</p>
        <p style="margin:0 0 24px;color:#444444;">${escaparHtml(textos.intro)}</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:8px;">
          ${filas.join('\n')}
        </table>

        ${comentariosHtml}

        <div style="margin-top:24px;padding:14px 18px;background:#f8f5f0;border-radius:4px;">
          <p style="margin:0;font-size:14px;color:#4A6E2C;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(textos.cierre)}</p>
        </div>
      </div>

      <div style="padding:20px 32px;text-align:center;background:#f8f5f0;">
        <p style="margin:0;font-size:12px;color:#999999;font-family:Arial,Helvetica,sans-serif;">Azucar Hotel Tulum · Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, C.P. 77780</p>
      </div>

    </div>
  </div>
</body>
</html>`;
}


/* ════════════════════════════════════════════════════════════════════════════
   AVISO AL MANAGER

   Petición del cliente (2026-09-01): el correo del manager, con diseño, sobre
   la misma plantilla que el del huésped.

   ── LAS TRES DECISIONES QUE LO SEPARAN DEL CORREO DEL HUÉSPED ──────────────
   1. **Las fechas mandan.** Van arriba, grandes y con las noches al lado. Es
      el primer dato que el manager coteja contra su cuadrante, y hoy ese
      cotejo es a mano: sin PMS, la disponibilidad vive en su cabeza y en una
      libreta (ADR-0003). Que tenga que buscar las fechas entre otras seis
      filas es tiempo de respuesta perdido, y el tiempo de respuesta es lo que
      decide si la solicitud se convierte en reserva.

   2. **El contacto se pulsa.** `mailto:` y `tel:` de verdad. La mitad de estos
      correos se van a abrir en un teléfono: copiar a mano un correo
      electrónico desde una pantalla es donde se cuelan las erratas que hacen
      que la respuesta no llegue nunca.

   3. **El aviso de datos de tarjeta va DENTRO.** Es el hallazgo crítico del
      proyecto —el sitio vigente captura número y CVV por Contact Form 7,
      incumpliendo PCI-DSS 3.3.1 y 4.2.1 (R-13)—, y el runbook operativo lo
      pone arriba del todo. Pero un runbook se lee una vez. Esto se lee cada
      vez que llega una solicitud, que es justo el momento en el que alguien
      podría pedir una tarjeta "para apartar". El recordatorio tiene que estar
      donde ocurre el trabajo, no donde está documentado el trabajo.
   ════════════════════════════════════════════════════════════════════════════ */

/** Los textos del envoltorio del aviso, ya traducidos por quien llama. */
export interface TextosManager {
  /** Antetítulo de la franja oscura, p. ej. "Nueva solicitud". */
  antetitulo: string;
  /** Qué hacer, en una línea. */
  intro: string;
  /** Encabezado del bloque de contacto del huésped. */
  contacto: string;
  /** Etiqueta del botón que abre la respuesta. */
  responder: string;
  /** 🔴 El aviso de no pedir datos de tarjeta. */
  aviso: string;
  /** Recordatorio de que es una solicitud, no una reserva. */
  cierre: string;
  idioma: 'es' | 'en';
}

/** Una fila del bloque de datos, con el valor opcionalmente enlazado. */
function filaContacto(etiqueta: string, valor: string, href?: string): string {
  const contenido = href
    ? `<a href="${escaparHtml(href)}" style="color:#4A6E2C;text-decoration:none;font-weight:600;">${escaparHtml(valor)}</a>`
    : `<span style="color:#222222;font-weight:600;">${escaparHtml(valor)}</span>`;
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e4dfd8;color:#666666;font-size:14px;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(etiqueta)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e4dfd8;font-size:15px;font-family:Arial,Helvetica,sans-serif;text-align:right;">${contenido}</td>
  </tr>`;
}

export function correoManagerHtml(s: Solicitud, r: Rotulos, textos: TextosManager): string {
  const tipoTexto = s.tipo ? (r.tipos[s.tipo] ?? s.tipo) : r.sinPreferencia;
  const n = noches(s.llegada, s.salida);
  // `tel:` sólo admite dígitos y `+`; un número con espacios y paréntesis no
  // marca en algunos teléfonos. Se limpia para el enlace y se muestra tal cual
  // lo escribió el huésped, que es como él lo reconoce.
  const telLimpio = s.telefono?.replace(/[^+\d]/g, '') ?? '';
  const asuntoRespuesta = encodeURIComponent(`${r.asunto} — ${s.llegada} → ${s.salida}`);

  const comentariosHtml = s.comentarios?.trim()
    ? `<div style="margin-top:20px;padding:16px 18px;background:#f8f5f0;border-radius:4px;">
         <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#4A6E2C;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(r.comentarios)}</p>
         <p style="margin:0;font-size:15px;color:#222222;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">${conSaltos(escaparHtml(s.comentarios.trim()))}</p>
       </div>`
    : '';

  return `<!doctype html>
<html lang="${textos.idioma}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escaparHtml(textos.antetitulo)}</title>
</head>
<body style="margin:0;padding:0;background:#f1eeeb;">
  <div style="background:#f1eeeb;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:4px;overflow:hidden;">

      <div style="background:#222222;padding:24px 32px;text-align:center;">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#6F9440;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(textos.antetitulo)}</p>
        <span style="font-family:Georgia,'Times New Roman',serif;font-size:18px;letter-spacing:0.12em;color:#ffffff;text-transform:uppercase;">Azucar Hotel Tulum</span>
      </div>

      <!-- LAS FECHAS PRIMERO. Es el dato con el que empieza el trabajo. -->
      <div style="padding:26px 32px;background:#f8f5f0;text-align:center;border-bottom:1px solid #e4dfd8;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#666666;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(r.llegada)} → ${escaparHtml(r.salida)}</p>
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#222222;">${escaparHtml(s.llegada)} → ${escaparHtml(s.salida)}</p>
        ${n ? `<p style="margin:8px 0 0;font-size:14px;color:#4A6E2C;font-family:Arial,Helvetica,sans-serif;font-weight:600;">${n} ${escaparHtml(r.noches)}</p>` : ''}
      </div>

      <div style="padding:28px 32px;font-family:Arial,Helvetica,sans-serif;color:#222222;font-size:16px;line-height:1.6;">
        <p style="margin:0 0 20px;color:#444444;">${escaparHtml(textos.intro)}</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${fila(r.tipo, tipoTexto)}
          ${fila(r.huespedes, huespedes(s, r))}
        </table>

        <p style="margin:24px 0 4px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#4A6E2C;">${escaparHtml(textos.contacto)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${filaContacto(r.nombre, s.nombre)}
          ${filaContacto(r.correo, s.correo, `mailto:${s.correo}?subject=${asuntoRespuesta}`)}
          ${telLimpio ? filaContacto(r.telefono, s.telefono!.trim(), `tel:${telLimpio}`) : ''}
        </table>

        ${comentariosHtml}

        <div style="margin-top:26px;text-align:center;">
          <a href="mailto:${escaparHtml(s.correo)}?subject=${asuntoRespuesta}"
             style="display:inline-block;background:#4A6E2C;color:#ffffff;text-decoration:none;
                    padding:14px 30px;border-radius:2px;font-size:14px;letter-spacing:0.12em;
                    text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${escaparHtml(textos.responder)}</a>
        </div>

        <!-- 🔴 El aviso de PCI-DSS, donde ocurre el trabajo. Ver la nota de
             arriba: un runbook se lee una vez; esto, cada vez. -->
        <div style="margin-top:26px;padding:16px 18px;background:#fdf3f3;border-left:3px solid #9b2c2c;border-radius:2px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#9b2c2c;font-family:Arial,Helvetica,sans-serif;font-weight:600;">${escaparHtml(textos.aviso)}</p>
        </div>

        <p style="margin:20px 0 0;font-size:14px;color:#666666;">${escaparHtml(textos.cierre)}</p>
      </div>

      <div style="padding:18px 32px;text-align:center;background:#f8f5f0;">
        <p style="margin:0;font-size:12px;color:#999999;font-family:Arial,Helvetica,sans-serif;">Azucar Hotel Tulum · Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, C.P. 77780</p>
      </div>

    </div>
  </div>
</body>
</html>`;
}
