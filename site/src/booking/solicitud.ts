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
  adultos: string;
  menores: string;
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
export function componerSolicitud(s: Solicitud, r: Rotulos): { asunto: string; cuerpo: string } {
  const n = noches(s.llegada, s.salida);
  const tipo = s.tipo ? (r.tipos[s.tipo] ?? s.tipo) : r.sinPreferencia;

  const lineas = [
    `${r.llegada}: ${s.llegada}`,
    `${r.salida}: ${s.salida}${n ? ` (${n} ${r.noches})` : ''}`,
    `${r.tipo}: ${tipo}`,
    `${r.huespedes}: ${s.adultos} ${r.adultos}${s.menores ? `, ${s.menores} ${r.menores}` : ''}`,
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
