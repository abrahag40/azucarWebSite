/**
 * Autorizacion de cargo a tarjeta — composicion del mensaje (cliente, 2026-09-14).
 *
 * ── QUE ES ESTO Y QUE NO ES ────────────────────────────────────────────────
 * El hotel necesita un documento firmado donde el TITULAR de una tarjeta
 * autoriza por escrito un cargo por una reserva. Es practica normal de
 * hoteleria, sobre todo cuando quien paga no es quien se hospeda.
 *
 * 🔴 ESTE FORMULARIO NO PIDE EL NUMERO DE TARJETA NI EL CVV, Y ESO NO ES UNA
 * OMISION: es la unica forma de que exista.
 *
 * El formulario del sitio vigente —`/autorizacion-de-pago-con-tdc/`— tiene 22
 * campos y captura los cuatro que no puede: numero, mes y ano de expiracion y
 * codigo de seguridad, y los manda por correo con Contact Form 7. Eso incumple
 * PCI-DSS 4.2.1 (el PAN no viaja por mensajeria de usuario final sin proteger)
 * y, sobre todo, **PCI-DSS 3.2: el codigo de seguridad no puede almacenarse
 * despues de autorizar, sin excepciones**. Un correo lo almacena para siempre,
 * en cada buzon y cada copia de seguridad por los que pasa. Es el hallazgo
 * critico del sprint 0 (R-13) y la regla 4 de CLAUDE.md.
 *
 * Los otros 18 campos son datos personales normales y estan todos aqui. Un
 * documento de autorizacion NO necesita el PAN completo para ser valido: lleva
 * los **ultimos cuatro digitos**, que es lo que PCI-DSS permite expresamente
 * mostrar y almacenar, y con eso el hotel identifica la tarjeta.
 *
 * ── COMO SE COBRA ENTONCES ─────────────────────────────────────────────────
 * Dos caminos, y ninguno depende de elegir pasarela (B4):
 *
 *   · Terminal virtual (MOTO) del banco adquirente: el manager teclea la
 *     tarjeta en el portal del banco mientras habla con el huesped.
 *   · Enlace de pago, cuando exista pasarela — ver
 *     `docs/02-requerimientos/estudio-pasarelas-de-pago.md`.
 *
 * En los dos, la tarjeta nunca toca este sitio ni el correo del hotel, y el
 * alcance PCI del hotel se queda en el mas pequeno que existe (SAQ-A).
 *
 * ── POR QUE `mailto:` Y NO UN ENDPOINT ─────────────────────────────────────
 * La misma razon que `solicitud.ts`: montar hoy un endpoint que reciba nombre,
 * domicilio y telefono inicia un tratamiento de datos personales sin aviso
 * conforme a la LFPDPPP (E-PRIV sigue abierto). El mensaje se compone en el
 * navegador del huesped y se lo entrega a SU cliente de correo.
 *
 * ── POR QUE UNA FUNCION PURA ───────────────────────────────────────────────
 * Igual que `componerSolicitud`: sin DOM, sin fechas del sistema y sin red, se
 * puede probar con `assert` y se prueba. Lo que puede equivocarse en silencio
 * aqui es el domicilio —siete campos opcionales que hay que unir sin dejar
 * comas sueltas— y el importe.
 */

export interface Autorizacion {
  /** ISO `YYYY-MM-DD`. */
  fecha: string;
  llegada: string;
  salida: string;
  habitaciones: string;
  huespedes: number;
  huespedPrincipal: string;
  nombreTitular: string;
  telefono: string;
  tipoTarjeta: string;
  /** SOLO los cuatro ultimos digitos. Nunca el PAN completo. */
  ultimos4: string;
  calle: string;
  numeroExterior: string;
  numeroInterior?: string;
  codigoPostal: string;
  colonia: string;
  ciudad: string;
  pais: string;
  total: string;
}

export interface RotulosAutorizacion {
  asunto: string;
  fecha: string;
  llegada: string;
  salida: string;
  habitaciones: string;
  huespedes: string;
  huespedPrincipal: string;
  titular: string;
  telefono: string;
  tipoTarjeta: string;
  ultimos4: string;
  domicilio: string;
  total: string;
  declaracion: string;
}

/** `true` si el valor tiene contenido util. */
const lleno = (v: string | undefined) => Boolean(v && v.trim());

/**
 * El domicilio en una linea, sin comas huerfanas.
 *
 * Se arma filtrando ANTES de unir, no uniendo y limpiando despues: unir
 * siempre y quitar comas dobles a golpe de expresion regular es como se cuelan
 * los « , ,» del principio y del final, y depende del campo que falte.
 */
export function domicilioEnLinea(a: Autorizacion): string {
  const calle = [a.calle, a.numeroExterior && `#${a.numeroExterior}`,
                 lleno(a.numeroInterior) && `int. ${a.numeroInterior!.trim()}`]
    .filter(Boolean).map((x) => String(x).trim()).join(' ');
  return [calle, a.colonia, a.codigoPostal && `C.P. ${a.codigoPostal}`, a.ciudad, a.pais]
    .filter((x) => lleno(String(x ?? ''))).map((x) => String(x).trim()).join(', ');
}

/** Los campos obligatorios que faltan, por nombre de campo. */
export function camposFaltantes(a: Partial<Autorizacion>): string[] {
  const obligatorios: (keyof Autorizacion)[] = [
    'fecha', 'llegada', 'salida', 'habitaciones', 'huespedPrincipal',
    'nombreTitular', 'telefono', 'tipoTarjeta', 'ultimos4',
    'calle', 'numeroExterior', 'codigoPostal', 'colonia', 'ciudad', 'pais', 'total',
  ];
  const faltan = obligatorios.filter((k) => !lleno(String(a[k] ?? '')));
  if (!a.huespedes || a.huespedes < 1) faltan.push('huespedes');
  return faltan;
}

/**
 * `true` si son exactamente cuatro digitos.
 *
 * 🔴 El tope de CUATRO no es cosmetico ni una validacion de comodidad: es el
 * limite que mantiene este formulario fuera del alcance PCI-DSS. Un PAN tiene
 * 13-19 digitos; cuatro no identifican una tarjeta ni permiten un cargo. Si
 * alguna vez alguien sube este maximo, deja de ser un truncamiento permitido y
 * pasa a ser captura de datos de tarjeta.
 */
export function ultimos4Validos(v: string): boolean {
  return /^\d{4}$/.test(v.trim());
}

export function componerAutorizacion(
  a: Autorizacion,
  r: RotulosAutorizacion,
): { asunto: string; cuerpo: string } {
  const lineas = [
    `${r.fecha}: ${a.fecha}`,
    '',
    `${r.llegada}: ${a.llegada}`,
    `${r.salida}: ${a.salida}`,
    `${r.habitaciones}: ${a.habitaciones.trim()}`,
    `${r.huespedes}: ${a.huespedes}`,
    `${r.huespedPrincipal}: ${a.huespedPrincipal.trim()}`,
    '',
    `${r.titular}: ${a.nombreTitular.trim()}`,
    `${r.telefono}: ${a.telefono.trim()}`,
    `${r.tipoTarjeta}: ${a.tipoTarjeta.trim()}`,
    `${r.ultimos4}: ${a.ultimos4.trim()}`,
    `${r.domicilio}: ${domicilioEnLinea(a)}`,
    '',
    `${r.total}: ${a.total.trim()}`,
    '',
    r.declaracion,
  ];
  return { asunto: `${r.asunto} — ${a.huespedPrincipal.trim()}`, cuerpo: lineas.join('\n') };
}

/** El `mailto:` con el mensaje ya escrito. Mismo mecanismo que la solicitud. */
export function enlaceCorreo(destino: string, asunto: string, cuerpo: string): string {
  return `mailto:${destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
