/**
 * Endpoint de recepcion de solicitudes -- H3.4, H3.5, H3.6 (ADR-0006).
 *
 * Vive fuera de `src/`: no es una ruta de Astro, es una Cloudflare Pages
 * Function -- el mecanismo que ya elegia ADR-0004 ("formulario contra una
 * funcion serverless del propio proveedor"). Cloudflare la sirve directo,
 * sin pasar por el build estatico de Astro. El archivo mapea, por convencion
 * de nombre, a `POST /api/solicitud`.
 *
 * ── QUE NO HACE, A PROPOSITO ────────────────────────────────────────────────
 * No guarda nada. Recibe, valida, reparte por dos canales y olvida. No hay
 * base de datos ni historial propio -es la aplicacion directa del principio
 * de minimizacion de datos de la LFPDPPP: no se guarda lo que no hace falta
 * guardar (ver ADR-0006, "Arquitectura propuesta"). La unica persistencia es
 * el contador de limite de tasa, y no es un dato personal: es un numero con
 * expiracion de una hora, bajo la clave de un hash de IP.
 *
 * ── POR QUE FALLA CERRADO ────────────────────────────────────────────────
 * Mientras `RESEND_API_KEY`, `CORREO_MANAGER` o `TURNSTILE_SECRET_KEY` no
 * esten configuradas en Cloudflare, la funcion se niega a operar (503) en vez
 * de enviar sin verificar. Es el mismo criterio que `check-datos.mjs`: un
 * hueco de configuracion es un fallo ruidoso, no un comportamiento
 * degradado en silencio. El limite de tasa (KV) es la unica pieza que SI se
 * salta si no esta configurada -es defensa en profundidad, no la garantia
 * central de que no se envien correos falsos-.
 *
 * ── POR QUE NO ESTA CABLEADO AL FORMULARIO TODAVIA ──────────────────────────
 * E-PRIV (aviso de privacidad conforme a la LFPDPPP) y B4 (correo y WhatsApp
 * oficiales) siguen sin resolverse. Esta funcion puede escribirse, deplegarse
 * a Preview y probarse por su cuenta -con `wrangler pages dev` o un `fetch`
 * directo a la URL de Preview-, pero `FormularioSolicitud.astro` sigue usando
 * el `mailto:` de siempre hasta que ambos bloqueos se resuelvan. Cablear el
 * `fetch()` del formulario a esta ruta es un cambio aparte, deliberadamente
 * pequeno, para cuando llegue el momento.
 */
import { componerSolicitud, camposInvalidos, type Solicitud, type Rotulos } from '../../src/booking/solicitud';
import { usarT, type Idioma } from '../../src/i18n/ui';

/** Sólo lo que este archivo necesita de un almacén KV -- no hace falta el
 *  paquete `@cloudflare/workers-types` para tres métodos. */
interface AlmacenTasa {
  get(clave: string): Promise<string | null>;
  put(clave: string, valor: string, opciones?: { expirationTtl?: number }): Promise<void>;
}

interface Entorno {
  RESEND_API_KEY?: string;
  /** Remitente verificado en Resend, p. ej. `Azúcar Hotel Tulum <solicitudes@azucarhotel.com>`. */
  CORREO_REMITENTE?: string;
  /** El correo oficial de recepción -- B4, todavía sin respuesta. */
  CORREO_MANAGER?: string;
  TURNSTILE_SECRET_KEY?: string;
  /** Opcional: si no está enlazado, se omite el límite de tasa (ver arriba). */
  LIMITE_TASA?: AlmacenTasa;
}

interface CuerpoPeticion {
  idioma: Idioma;
  solicitud: Solicitud;
  /** Los rótulos YA resueltos por el cliente -- incluye `tipos`, el nombre
   *  legible de cada alojamiento por `id`, que sale de la *content collection*
   *  y esta funcion no puede leer (no corre dentro de Astro). Repetir esa
   *  tabla aquí sería la misma clase de duplicación que `componerSolicitud`
   *  evita desde el día uno: una sola fuente, dos consumidores. */
  rotulos: Rotulos;
  turnstileToken: string;
  /** Honeypot: un campo que ningún huésped real llena. Si llega con
   *  contenido, se descarta en silencio (ver `respuestaHoneypot`). */
  sitioWeb?: string;
}

const VENTANA_LIMITE_SEGUNDOS = 60 * 60; // 1 hora
const MAX_PETICIONES_POR_VENTANA = 5;
/** Tope defensivo: nadie llena este formulario con más de unos pocos KB. */
const TAMANO_MAXIMO_BYTES = 20_000;

export const onRequestPost = async (contexto: { request: Request; env: Entorno }): Promise<Response> => {
  const { request, env } = contexto;

  // 1. Configuración mínima, o no se opera. Ver el porqué en el comentario de cabecera.
  if (!env.RESEND_API_KEY || !env.CORREO_REMITENTE || !env.CORREO_MANAGER || !env.TURNSTILE_SECRET_KEY) {
    return json(503, { error: 'configuracion-incompleta' });
  }

  // 2. Tamaño del cuerpo, antes de parsear nada.
  const longitud = Number(request.headers.get('content-length') ?? '0');
  if (longitud > TAMANO_MAXIMO_BYTES) return json(413, { error: 'peticion-demasiado-grande' });

  let cuerpo: CuerpoPeticion;
  try {
    cuerpo = await request.json();
  } catch {
    return json(400, { error: 'json-invalido' });
  }

  // 3. Honeypot. Un bot de relleno automático completa este campo; ningún
  //    huésped lo ve (queda oculto en el formulario, no con `hidden`, que
  //    algunos bots sí respetan). Se responde éxito falso: no vale la pena que
  //    el bot aprenda que lo detectamos.
  if (cuerpo.sitioWeb?.trim()) return json(200, { recibido: true });

  // 4. Límite de tasa por IP -- defensa en profundidad, se omite si no hay KV.
  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
  if (env.LIMITE_TASA && (await tasaExcedida(env.LIMITE_TASA, ip))) {
    return json(429, { error: 'demasiadas-solicitudes' });
  }

  // 5. Turnstile: el CAPTCHA sin pantalla de CAPTCHA (Decisión 2 de ADR-0006).
  const turnstileOk = await turnstileValido(cuerpo.turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!turnstileOk) return json(400, { error: 'verificacion-fallida' });

  // 6. La MISMA validación que ya corre en el navegador -- nunca sólo en
  //    cliente, criterio de aceptación de H3.4.
  const hoy = new Date().toISOString().slice(0, 10);
  const invalidos = camposInvalidos(cuerpo.solicitud, hoy);
  if (invalidos.length) return json(400, { error: 'campos-invalidos', campos: invalidos });

  // 7. El mensaje para el manager: la MISMA función pura de hoy, sin cambios.
  const { asunto, cuerpo: cuerpoManager } = componerSolicitud(cuerpo.solicitud, cuerpo.rotulos);

  try {
    await enviarCorreo(env, env.CORREO_MANAGER, asunto, cuerpoManager);
    await enviarCorreo(env, ...correoAcuse(cuerpo.idioma, cuerpo.solicitud, cuerpoManager));
  } catch (err) {
    // No se reintenta ni se guarda para reintentar después -- no hay dónde
    // guardarlo (ver "qué no hace, a propósito"). El huésped se entera del
    // fallo y decide si insiste; el `catch` del `fetch()` en el cliente, el
    // día que exista, cae de vuelta al `mailto:` que hoy ya funciona.
    console.error('solicitud: fallo al enviar', err);
    return json(502, { error: 'envio-fallido' });
  }

  return json(200, { recibido: true });
};

function json(estado: number, datos: unknown): Response {
  return new Response(JSON.stringify(datos), {
    status: estado,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * El correo de acuse al huésped (H3.5). Reutiliza el CUERPO ya compuesto para
 * el manager -mismo criterio "una sola fuente"- y sólo añade un saludo y un
 * cierre. Deliberadamente NO inventa una cotización ni un compromiso de
 * tiempo: eso depende de C3 y de B1/B2, que ADR-0006 no resuelve. Ver
 * `reserva.acuseIntro` en `ui.ts`.
 */
function correoAcuse(idioma: Idioma, s: Solicitud, resumen: string): [string, string, string] {
  const t = usarT(idioma);
  const cuerpo = [
    t('reserva.acuseSaludo', { nombre: s.nombre }),
    '',
    t('reserva.acuseIntro'),
    '',
    resumen,
    '',
    t('reserva.acuseCierre'),
  ].join('\n');
  return [s.correo, t('reserva.acuseAsunto'), cuerpo];
}

async function enviarCorreo(env: Entorno, destino: string, asunto: string, texto: string): Promise<void> {
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ from: env.CORREO_REMITENTE, to: destino, subject: asunto, text: texto }),
  });
  if (!resp.ok) throw new Error(`Resend respondio ${resp.status}`);
}

async function turnstileValido(token: string | undefined, secreto: string, ip: string): Promise<boolean> {
  if (!token) return false;
  const cuerpo = new URLSearchParams({ secret: secreto, response: token, remoteip: ip });
  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: cuerpo,
  });
  if (!resp.ok) return false;
  const datos = (await resp.json()) as { success: boolean };
  return datos.success === true;
}

async function tasaExcedida(kv: AlmacenTasa, ip: string): Promise<boolean> {
  const clave = `tasa:${await hashIP(ip)}`;
  const actual = Number((await kv.get(clave)) ?? '0');
  if (actual >= MAX_PETICIONES_POR_VENTANA) return true;
  await kv.put(clave, String(actual + 1), { expirationTtl: VENTANA_LIMITE_SEGUNDOS });
  return false;
}

/** Se guarda el hash, no la IP: ni siquiera en un contador efímero de una hora
 *  hace falta el dato crudo. */
async function hashIP(ip: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
