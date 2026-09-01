/**
 * Composición del mensaje de solicitud — interior del módulo `booking/`.
 *
 * Ver `README.md` de esta carpeta para la frontera y para qué NO hace este
 * módulo hoy. Aquí sólo interesa una cosa: convertir lo que el huésped escribió
 * en un texto que el hotel pueda leer y responder.
 *
 * ── POR QUÉ ES UNA FUNCIÓN PURA Y NO UN MÉTODO DEL FORMULARIO ───────────────
 * Sin fechas del sistema, sin acceso a red, sin leer el DOM. Mismas entradas,
 * misma salida. Eso permite tres cosas que importan:
 *   · Comprobarla con `node --test`, sin navegador ni build.
 *   · Que el MISMO texto alimente el resumen en pantalla y el correo. Si fueran
 *     dos caminos distintos acabarían diciendo cosas distintas.
 *   · Que el día que exista el endpoint (H3.4) se reutilice tal cual.
 */

/** Lo que el huésped rellena. Es el contrato de entrada del módulo. */
export interface Solicitud {
  /** Fecha ISO `yyyy-mm-dd`. */
  llegada: string;
  /** Fecha ISO `yyyy-mm-dd`. */
  salida: string;
  /** `id` de la colección `alojamiento`, o cadena vacía si no tiene preferencia. */
  tipo: string;
  adultos: number;
  menores: number;
  nombre: string;
  correo: string;
  telefono?: string;
  comentarios?: string;
}

/** Los rótulos ya traducidos. El módulo no sabe de i18n: se los dan hechos. */
export interface Rotulos {
  asunto: string;
  llegada: string;
  salida: string;
  noches: string;
  tipo: string;
  sinPreferencia: string;
  huespedes: string;
  /** Plural: «adultos» / «adults». */
  adultos: string;
  /** Plural: «menores» / «children». */
  menores: string;
  /**
   * Singulares. Existen porque el correo decía «1 menores» —y en inglés, «1
   * children», que es peor—. Lo enseñó una muestra generada para revisar el
   * correo, no una prueba: las nueve que había comprobaban la ARITMÉTICA de las
   * noches, que es lo que puede equivocarse en silencio, y nunca miraron la
   * concordancia. Un dato correcto mal redactado sigue siendo un correo que se
   * lee mal, y éste es el primer contacto del huésped con el hotel.
   *
   * En español bastaba con quitar la «s»; en inglés no —«child» / «children»—,
   * y ésa es la razón de que sea un dato del diccionario y no una regla de
   * código: la pluralización no se puede deducir de la cadena.
   */
  adulto: string;
  menor: string;
  nombre: string;
  correo: string;
  telefono: string;
  comentarios: string;
  /** Nombre legible de cada tipo, por `id`. */
  tipos: Record<string, string>;
  /** Cierre del mensaje. Recuerda que es una solicitud, no una reserva. */
  cierre: string;
}

/**
 * Noches entre dos fechas ISO.
 *
 * Se restan como **fechas UTC a mediodía**, no con `new Date(cadena)` a secas.
 * `new Date('2026-03-29')` se interpreta como medianoche UTC y al convertirla a
 * hora local puede caer en el día anterior; peor aún, en los husos con horario
 * de verano una de las dos medianoches dura 23 horas y la resta da 2.96 noches,
 * que redondeada son 2 en vez de 3. Anclar a las 12:00 UTC deja 12 horas de
 * margen por cada lado y elimina la clase entera de errores.
 */
export function noches(llegada: string, salida: string): number {
  const aUTC = (iso: string) => {
    const [a, m, d] = iso.split('-').map(Number);
    return Date.UTC(a, m - 1, d, 12, 0, 0);
  };
  if (!/^\d{4}-\d\d-\d\d$/.test(llegada) || !/^\d{4}-\d\d-\d\d$/.test(salida)) return 0;
  const diff = aUTC(salida) - aUTC(llegada);
  return diff > 0 ? Math.round(diff / 86_400_000) : 0;
}

/**
 * El mensaje que el hotel recibe.
 *
 * Texto plano y no HTML: llega igual a cualquier cliente de correo, se lee en el
 * teléfono del manager —que es donde se va a leer— y no puede romperse.
 *
 * El orden no es casual: **primero lo que el hotel necesita para responder**
 * —fechas, tipo, personas— y al final los datos de contacto. Un manager mirando
 * la notificación en el móvil decide con las tres primeras líneas.
 */
/**
 * «2 adultos, 1 menor» — con la concordancia bien. Exportada porque el correo
 * HTML del huésped pinta exactamente lo mismo y no puede tener su propia copia:
 * dos redacciones del mismo dato acaban divergiendo, y el huésped recibe los
 * dos correos.
 */
export function huespedes(s: Solicitud, r: Rotulos): string {
  const parte = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;
  const adultos = parte(s.adultos, r.adulto, r.adultos);
  return s.menores ? `${adultos}, ${parte(s.menores, r.menor, r.menores)}` : adultos;
}

export function componerSolicitud(s: Solicitud, r: Rotulos): { asunto: string; cuerpo: string } {
  const n = noches(s.llegada, s.salida);
  const tipo = s.tipo ? (r.tipos[s.tipo] ?? s.tipo) : r.sinPreferencia;

  const lineas = [
    `${r.llegada}: ${s.llegada}`,
    `${r.salida}: ${s.salida}${n ? ` (${n} ${r.noches})` : ''}`,
    `${r.tipo}: ${tipo}`,
    `${r.huespedes}: ${huespedes(s, r)}`,
    '',
    `${r.nombre}: ${s.nombre}`,
    `${r.correo}: ${s.correo}`,
  ];
  if (s.telefono?.trim()) lineas.push(`${r.telefono}: ${s.telefono.trim()}`);
  if (s.comentarios?.trim()) lineas.push('', `${r.comentarios}:`, s.comentarios.trim());
  lineas.push('', r.cierre);

  // El asunto lleva las fechas porque es lo que el manager ve en la bandeja sin
  // abrir el mensaje, y es lo que le permite ordenar por urgencia.
  return {
    asunto: `${r.asunto} — ${s.llegada} → ${s.salida}`,
    cuerpo: lineas.join('\n'),
  };
}

/**
 * El enlace `mailto:` con el mensaje ya escrito.
 *
 * `encodeURIComponent` y no `encodeURI`: hay que escapar `&`, `?` y `#`, que en
 * un comentario del huésped son caracteres normales y aquí romperían la URL
 * partiéndola en parámetros falsos.
 */
export function enlaceCorreo(destino: string, asunto: string, cuerpo: string): string {
  return `mailto:${destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

/**
 * Campos inválidos de una solicitud. Devuelve sus NOMBRES, no el texto del
 * error: el texto vive traducido en `Rotulos.errores` y cada quien lo pinta a
 * su manera. El endpoint de ADR-0006 (H3.4) la usa para repetir en servidor la
 * misma validación que ya corre en el navegador — "nunca sólo en cliente" es
 * el criterio de aceptación, y una petición sin JavaScript de por medio salta
 * ese cliente entero.
 *
 * NO sustituye la validación de `FormularioSolicitud.astro` para el correo:
 * ahí se usa `checkValidity()` nativo del navegador a propósito, porque
 * reimplementar la sintaxis del correo con una expresión regular termina
 * rechazando direcciones válidas (ver el comentario de ese archivo). Aquí, sin
 * DOM, no hay esa opción — así que la expresión es deliberadamente permisiva:
 * su trabajo es descartar basura evidente, no certificar RFC 5322.
 */
export function camposInvalidos(s: Solicitud, hoy: string): string[] {
  const invalidos: string[] = [];
  if (!s.llegada || s.llegada < hoy) invalidos.push('llegada');
  if (!s.salida || noches(s.llegada, s.salida) === 0) invalidos.push('salida');
  if (!s.nombre?.trim()) invalidos.push('nombre');
  if (!correoPlausible(s.correo)) invalidos.push('correo');
  return invalidos;
}

function correoPlausible(correo: string | undefined): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((correo ?? '').trim());
}
