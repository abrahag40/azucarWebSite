/**
 * Cadenas de interfaz. El contenido largo vive en las colecciones de contenido;
 * aquí sólo lo que es propiamente interfaz.
 *
 * `as const` hace que TypeScript conozca cada clave: una traducción que falte
 * en un idioma es un error de compilación, no un hueco silencioso en producción.
 */
export const idiomas = { es: 'Español', en: 'English' } as const;
export type Idioma = keyof typeof idiomas;
export const IDIOMA_POR_DEFECTO: Idioma = 'es';

export const ui = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.alojamiento': 'Alojamiento',
    'nav.servicios': 'Servicios',
    'nav.restaurante': 'Restaurante',
    'nav.galeria': 'Galería',
    'nav.ubicacion': 'Cómo llegar',
    'nav.contacto': 'Contacto',
    'nav.menu': 'Menú',
    'nav.cerrar': 'Cerrar menú',
    'nav.saltar': 'Saltar al contenido',

    // ADR-0003, regla 1: nunca "reservar" ni "confirmada". Siempre solicitud.
    'reserva.cta': 'Solicitar reserva',
    'reserva.aviso': 'Solicitud sujeta a confirmación del hotel',
    'reserva.whatsapp': 'Escribir por WhatsApp',

    'hero.eyebrow': 'Zona Hotelera de Tulum · Frente al mar',
    'hero.titulo': 'El único lugar donde el mar es dulce',
    'hero.entrada': 'Hotel boutique frente al Caribe mexicano, hecho a mano en Tulum desde 2008.',
    'hero.bajar': 'Bajar al contenido',

    'alojamiento.titulo': 'Alojamiento',
    'alojamiento.entrada': 'Suites con jacuzzi privado y habitaciones frente al Caribe.',
    'alojamiento.ver': 'Ver alojamiento',
    'alojamiento.detalle': 'Ver detalle',
    'alojamiento.suites': 'Suites',
    'alojamiento.habitaciones': 'Habitaciones',
    'alojamiento.capacidad': 'Hasta {n} personas',
    'alojamiento.tipos': '{n} tipos',
    'alojamiento.pagTitulo': 'Alojamiento',
    'alojamiento.pagAntetitulo': 'Suites y habitaciones',
    'alojamiento.pagMeta': 'Ocho tipos de alojamiento frente al Caribe en Tulum: suites con jacuzzi privado y habitaciones con vista al mar o a la selva.',

    'ficha.resumen': 'De un vistazo',
    'ficha.capacidad': 'Capacidad',
    'ficha.camas': 'Camas',
    'ficha.vista': 'Vista',
    'ficha.metros': 'Superficie',
    'ficha.amenidades': 'Incluye',
    'ficha.diferencia': 'Qué la distingue',
    'ficha.anterior': 'Anterior',
    'ficha.siguiente': 'Siguiente',
    'ficha.otras': 'Otros tipos de alojamiento',
    'ficha.porConfirmar': 'Dato por confirmar con el hotel',

    'footer.derechos': 'Todos los derechos reservados.',
    'footer.privacidad': 'Aviso de privacidad',
    'footer.terminos': 'Términos y condiciones',
    'footer.politicas': 'Políticas del hotel',
    'footer.direccion': 'Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, México',

    'amenidades.antetitulo': 'Servicios',
    'amenidades.titulo': 'Todo lo que el hotel pone a tu alcance',

    'error404.titulo': 'Esta página no existe',
    'error404.entrada': 'El enlace que seguiste puede estar roto, o la página se movió. Desde aquí puedes volver.',
    'error404.inicio': 'Ir al inicio',
    'error404.meta': 'La página que buscas no existe. Vuelve al inicio de Azúcar Hotel Tulum o consulta nuestro alojamiento.',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.alojamiento': 'Rooms',
    'nav.servicios': 'Services',
    'nav.restaurante': 'Restaurant',
    'nav.galeria': 'Gallery',
    'nav.ubicacion': 'Getting here',
    'nav.contacto': 'Contact',
    'nav.menu': 'Menu',
    'nav.cerrar': 'Close menu',
    'nav.saltar': 'Skip to content',

    'reserva.cta': 'Request a reservation',
    'reserva.aviso': 'Request subject to confirmation by the hotel',
    'reserva.whatsapp': 'Message us on WhatsApp',

    'hero.eyebrow': 'Tulum Hotel Zone · Beachfront',
    'hero.titulo': 'The sweetest place at the beach',
    'hero.entrada': 'A boutique hotel on the Mexican Caribbean, handcrafted in Tulum since 2008.',
    'hero.bajar': 'Scroll to content',

    'alojamiento.titulo': 'Rooms & Suites',
    'alojamiento.entrada': 'Suites with private jacuzzi and rooms facing the Caribbean.',
    'alojamiento.ver': 'View rooms',
    'alojamiento.detalle': 'View details',
    'alojamiento.suites': 'Suites',
    'alojamiento.habitaciones': 'Rooms',
    'alojamiento.capacidad': 'Up to {n} guests',
    'alojamiento.tipos': '{n} types',
    'alojamiento.pagTitulo': 'Rooms & Suites',
    'alojamiento.pagAntetitulo': 'Suites and rooms',
    'alojamiento.pagMeta': 'Eight types of accommodation facing the Caribbean in Tulum: suites with a private jacuzzi and rooms with sea or jungle views.',

    'ficha.resumen': 'At a glance',
    'ficha.capacidad': 'Capacity',
    'ficha.camas': 'Beds',
    'ficha.vista': 'View',
    'ficha.metros': 'Floor area',
    'ficha.amenidades': 'Includes',
    'ficha.diferencia': 'What sets it apart',
    'ficha.anterior': 'Previous',
    'ficha.siguiente': 'Next',
    'ficha.otras': 'Other room types',
    'ficha.porConfirmar': 'Detail pending confirmation by the hotel',

    'footer.derechos': 'All rights reserved.',
    'footer.privacidad': 'Privacy notice',
    'footer.terminos': 'Terms and conditions',
    'footer.politicas': 'Hotel policies',
    'footer.direccion': 'Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, Mexico',

    'amenidades.antetitulo': 'Our services',
    'amenidades.titulo': 'Everything the hotel puts within your reach',

    'error404.titulo': 'This page does not exist',
    'error404.entrada': 'The link you followed may be broken, or the page may have moved. You can head back from here.',
    'error404.inicio': 'Go to the homepage',
    'error404.meta': 'The page you are looking for does not exist. Return to the Azúcar Hotel Tulum homepage or browse our rooms.',
  },
} as const;

/** Traduce, con interpolación simple de {claves}. */
export function usarT(idioma: Idioma) {
  return function t(clave: keyof (typeof ui)['es'], vars: Record<string, string | number> = {}) {
    let s: string = ui[idioma][clave] ?? ui[IDIOMA_POR_DEFECTO][clave];
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  };
}

/**
 * Segmentos de URL traducidos.
 *
 * Las URLs en inglés no son las españolas con prefijo: son las que YA EXISTEN en
 * producción y acumulan enlaces y posicionamiento desde 2008. `/en/rooms/` tiene
 * 301 vigentes detrás —la captura HTTrack registró `?p=445 → /en/rooms/`— y
 * publicar `/en/alojamiento` las tiraría a la basura.
 *
 * Es también criterio de aceptación de la historia H2.1.
 */
export const segmentos = {
  alojamiento: { es: 'alojamiento', en: 'rooms' },
  servicios:   { es: 'servicios',   en: 'services' },
  restaurante: { es: 'restaurante', en: 'restaurant' },
  galeria:     { es: 'galeria',     en: 'gallery' },
  ubicacion:   { es: 'ubicacion',   en: 'location' },
  contacto:    { es: 'contacto',    en: 'contact' },
  reservar:    { es: 'reservar',    en: 'booking' },
  politicas:   { es: 'politicas',   en: 'policies' },
  terminos:    { es: 'terminos',    en: 'terms' },
  'aviso-de-privacidad': { es: 'aviso-de-privacidad', en: 'privacy-policy' },
} as const;

export type ClaveRuta = keyof typeof segmentos;

/**
 * Prefija una ruta con el idioma y traduce sus segmentos. El español no lleva
 * prefijo. Acepta rutas compuestas: `alojamiento/suite-mar` traduce el primer
 * segmento y deja el identificador intacto, porque el identificador es la
 * llave del dato y no cambia entre idiomas.
 */
export function ruta(idioma: Idioma, path = '') {
  const limpio = path.replace(/^\/+/, '');
  const base = idioma === IDIOMA_POR_DEFECTO ? '/' : `/${idioma}/`;
  if (!limpio) return base;
  const [primero, ...resto] = limpio.split('/');
  const traducido = (segmentos as Record<string, Record<Idioma, string>>)[primero]?.[idioma] ?? primero;
  return `${base}${[traducido, ...resto].join('/')}`;
}
