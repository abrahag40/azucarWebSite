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
    'nav.faq': 'Preguntas frecuentes',
    'nav.contacto': 'Contacto',
    'nav.menu': 'Menú',
    'nav.principal': 'Navegación principal',
    'nav.verTodo': 'Ver todo el alojamiento',
    // ── Bloque práctico de la ficha (patrón `room-details` de Cappa) ─────────
    'practicos.titulo': 'Antes de reservar',
    'practicos.horarios': 'Entrada y salida',
    'practicos.mascotas': 'Mascotas',
    'practicos.menores': 'Menores',
    'practicos.ver': 'Ver todas las políticas',
    'nav.cerrar': 'Cerrar menú',
    'nav.saltar': 'Saltar al contenido',

    // ADR-0003, regla 1: nunca "reservar" ni "confirmada". Siempre solicitud.
    // Metadatos de la portada. Estaban ESCRITOS A MANO en la plantilla, uno en
    // cada archivo de idioma, y por eso al unificar las dos portadas en una sola
    // vista la versión inglesa se perdió sin que nada avisara. El texto va en el
    // diccionario, siempre: es la regla 6 de CLAUDE.md y esto fue el recordatorio.
    'home.titulo': 'Hotel Boutique Frente al Mar en Tulum | Azúcar Hotel Tulum',
    'home.meta': 'Hotel boutique frente al Caribe en la Zona Hotelera de Tulum. Suites con jacuzzi privado, alberca infinita y playa. Solicita tu reserva directa.',
    'reserva.cta': 'Solicitar reserva',
    // ── Página de solicitud (H3.1, H3.2) ────────────────────────────────────
    'reserva.pagMeta': 'Envía tu solicitud de reserva a Azúcar Hotel Tulum. El hotel confirma disponibilidad y te responde con el total, impuestos incluidos.',
    'reserva.entrada': 'Dinos tus fechas y el hotel te responde con la disponibilidad y el total, impuestos incluidos.',
    'reserva.comoFunciona': 'Cómo funciona',
    'reserva.paso1': 'Nos escribes con tus fechas.',
    'reserva.paso2': 'El hotel revisa la disponibilidad a mano, una por una.',
    'reserva.paso3': 'Te responde con el total, impuestos incluidos, y cómo apartar.',
    'reserva.porQueNoHayCalendario': 'No verás un calendario de disponibilidad en línea. El hotel gestiona sus habitaciones manualmente y publicar disponibilidad que no podamos sostener acabaría en una reserva que no existe.',
    'reserva.fieldsetFechas': 'Fechas',
    'reserva.fieldsetAlojamiento': 'Alojamiento',
    'reserva.fieldsetHuespedes': 'Huéspedes',
    'reserva.fieldsetContacto': 'Tus datos',
    'reserva.llegada': 'Llegada',
    'reserva.salida': 'Salida',
    'reserva.noches': 'noches',
    'reserva.tipo': 'Tipo de alojamiento',
    'reserva.sinPreferencia': 'Sin preferencia',
    'reserva.adultos': 'Adultos',
    'reserva.menores': 'Menores',
    'reserva.nombre': 'Nombre completo',
    'reserva.correo': 'Correo electrónico',
    'reserva.telefono': 'Teléfono',
    'reserva.comentarios': 'Algo que debamos saber',
    'reserva.comentariosPista': 'Celebraciones, hora aproximada de llegada, necesidades de accesibilidad.',
    'reserva.opcional': 'opcional',
    'reserva.obligatorio': 'obligatorio',
    'reserva.revisar': 'Revisar mi solicitud',
    'reserva.resumenTitulo': 'Esto es lo que vas a enviar',
    'reserva.resumenPie': 'Nada se ha enviado todavía. Revisa el mensaje y mándalo desde tu correo.',
    'reserva.enviarCorreo': 'Enviar por correo',
    'reserva.copiar': 'Copiar el mensaje',
    'reserva.copiado': 'Mensaje copiado',
    'reserva.editar': 'Volver a editar',
    'reserva.directo': '¿Prefieres escribir tú?',
    'reserva.directoTexto': 'Escríbenos con tus fechas, el número de personas y tus datos de contacto.',
    'reserva.errTitulo': 'Revisa estos campos antes de continuar',
    'reserva.errFecha': 'Indica la fecha de llegada.',
    'reserva.errSalida': 'La salida tiene que ser posterior a la llegada.',
    'reserva.errPasado': 'La llegada no puede ser una fecha pasada.',
    'reserva.errNombre': 'Escribe tu nombre.',
    'reserva.errCorreo': 'Escribe un correo válido para que el hotel pueda responderte.',
    'reserva.asunto': 'Solicitud de reserva',
    'reserva.cierre': 'Entiendo que es una solicitud sujeta a confirmación del hotel.',
    'reserva.aviso': 'Solicitud sujeta a confirmación del hotel',
    'reserva.whatsapp': 'Escribir por WhatsApp',

    'hero.eyebrow': 'Zona Hotelera de Tulum · Frente al mar',
    // Titular corto a propósito: 36 caracteres caían en tres renglones y el
    // héroe perdía fuerza. Se conserva el núcleo del lema del hotel —«el mar es
    // dulce»— y se cede el lema completo a la franja de imagen, que tiene ancho
    // para lucirlo. Cappa resuelve su héroe en 24 caracteres y dos líneas.
    'hero.titulo': 'Donde el mar es dulce',
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

    'galeria.titulo': 'Galería',
    'galeria.pagMeta': 'La playa, el roof top, los jardines y las áreas comunes de Azúcar Hotel Tulum, en fotografías del propio hotel.',
    'galeria.entrada': 'La playa, el roof top y las áreas comunes. Cada habitación tiene su propia galería.',
    'galeria.verAlojamiento': 'Ver el alojamiento',
    'galeria.visor': 'Visor de fotografías',
    'galeria.ampliar': 'Ampliar la fotografía {n} de {total}',
    'galeria.alt': '{nombre}, fotografía {n}',
    'galeria.anterior': 'Fotografía anterior',
    'galeria.siguiente': 'Fotografía siguiente',
    'galeria.cerrar': 'Cerrar el visor',

    'servicios.titulo': 'Servicios',
    'servicios.meta': 'Playa privada, alberca infinita frente al mar, jacuzzi en roof top, Wi-Fi y estacionamiento gratuitos, y atención las 24 horas.',
    'faq.titulo': 'Preguntas frecuentes',
    'faq.meta': 'Respuestas a lo que más nos preguntan antes de reservar: playa, desayuno, Wi-Fi, estacionamiento, mascotas, horarios de check-in y check-out.',
    'politicas.titulo': 'Políticas del hotel',
    'politicas.meta': 'Condiciones de pago, identificación, horarios de check-in y check-out, cambios y cancelaciones del Azúcar Hotel Tulum.',
    'ubicacion.titulo': 'Cómo llegar',
    'ubicacion.meta': 'Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum. Cómo llegar desde el aeropuerto de Cancún y desde Tulum pueblo.',
    'ubicacion.direccion': 'Dirección',
    'ubicacion.mapa': 'Abrir en Google Maps',
    'contacto.titulo': 'Contacto',
    'contacto.meta': 'Teléfono, WhatsApp y correo del Azúcar Hotel Tulum. Recepción las 24 horas.',
    'contacto.telefono': 'Teléfono',
    'contacto.correo': 'Correo',
    'contacto.horario': 'Recepción las 24 horas, todos los días.',

    'privacidad.titulo': 'Aviso de privacidad',
    'privacidad.meta': 'Cómo Azúcar Hotel Tulum recopila, usa y protege la información personal que facilitas a través de este sitio web.',
    'privacidad.vigencia': 'Vigente desde el {fecha}.',

    'footer.derechos': 'Todos los derechos reservados.',
    'footer.privacidad': 'Aviso de privacidad',
    // ── Pie de tres columnas, patrón de Cappa ────────────────────────────────
    'footer.explorar': 'Explorar',
    'footer.contacto': 'Contacto',
    'footer.sobre': 'El hotel',
    'footer.legalTitulo': 'Legal',
    'footer.terminos': 'Términos y condiciones',
    'footer.politicas': 'Políticas del hotel',
    'footer.direccion': 'Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, México',

    'amenidades.antetitulo': 'Servicios',
    // ── Secciones nuevas de la portada, tomadas de Cappa ────────────────────
    'galeriaHome.antetitulo': 'La propiedad',
    // ── Experiencias (patrón `services` de Cappa) ──────────────────────────
    'exp.antetitulo': 'Lo que hace este lugar',
    'exp.titulo': 'Tres razones para venir',
    'exp.ver': 'Ver todos los servicios',
    'exp.playaEtiqueta': 'A pie de arena',
    'exp.albercaEtiqueta': 'Frente al mar',
    'exp.jacuzziEtiqueta': 'En las alturas',
    // ── Franja de llamada (patrón `pricing bg-blck` + `reservations`) ──────
    'cta.titulo': 'El hotel confirma cada solicitud a mano',
    'cta.texto': 'Sin calendario automático y sin sorpresas al llegar: te respondemos con la disponibilidad real y el total con impuestos incluidos.',
    'cta.etiquetaTel': 'Reservaciones',
    'cta.boton': 'Solicitar reserva',
    // ── Contacto (patrón `contact` de Cappa) ───────────────────────────────
    'contactoHome.antetitulo': 'Dónde estamos',
    'contactoHome.titulo': 'Carretera a Boca Paila, Tulum',
    'contactoHome.texto': 'En la zona hotelera, a pie de playa. Si vienes en coche, la entrada es fácil de pasar de largo: en «Cómo llegar» están las referencias exactas.',
    'contactoHome.telefono': 'Teléfono',
    'contactoHome.correo': 'Correo',
    'contactoHome.direccion': 'Dirección',
    'contactoHome.ver': 'Cómo llegar',
    'galeriaHome.titulo': 'La playa, el roof top y los rincones',
    'galeriaHome.texto': 'Ocho fotografías del hotel tal como es: sin retoques y sin promesas que no podamos cumplir.',
    'galeriaHome.ver': 'Ver la galería completa',
    'faqHome.antetitulo': 'Antes de reservar',
    'faqHome.titulo': 'Lo que más nos preguntan',
    'faqHome.ver': 'Ver las {n} preguntas',
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
    'nav.faq': 'Frequent questions',
    'nav.contacto': 'Contact',
    'nav.menu': 'Menu',
    'nav.principal': 'Main navigation',
    'nav.verTodo': 'See all rooms',
    'practicos.titulo': 'Before you book',
    'practicos.horarios': 'Check-in and check-out',
    'practicos.mascotas': 'Pets',
    'practicos.menores': 'Children',
    'practicos.ver': 'See all policies',
    'nav.cerrar': 'Close menu',
    'nav.saltar': 'Skip to content',

    'home.titulo': 'Beachfront Boutique Hotel in Tulum | Azúcar Hotel Tulum',
    'home.meta': 'Boutique hotel on the Caribbean in Tulum\u2019s Hotel Zone. Suites with private jacuzzi, infinity pool and beach. Request your reservation directly with us.',
    'reserva.cta': 'Request a reservation',
    // ── Request page (H3.1, H3.2) ───────────────────────────────────────────
    'reserva.pagMeta': 'Send your reservation request to Azúcar Hotel Tulum. The hotel checks availability and replies with the total, taxes included.',
    'reserva.entrada': 'Tell us your dates and the hotel replies with availability and the total, taxes included.',
    'reserva.comoFunciona': 'How it works',
    'reserva.paso1': 'You write to us with your dates.',
    'reserva.paso2': 'The hotel checks availability by hand, one room at a time.',
    'reserva.paso3': 'They reply with the total, taxes included, and how to hold it.',
    'reserva.porQueNoHayCalendario': 'You will not find an online availability calendar here. The hotel manages its rooms manually, and showing availability we cannot stand behind would end in a reservation that does not exist.',
    'reserva.fieldsetFechas': 'Dates',
    'reserva.fieldsetAlojamiento': 'Room',
    'reserva.fieldsetHuespedes': 'Guests',
    'reserva.fieldsetContacto': 'Your details',
    'reserva.llegada': 'Arrival',
    'reserva.salida': 'Departure',
    'reserva.noches': 'nights',
    'reserva.tipo': 'Room type',
    'reserva.sinPreferencia': 'No preference',
    'reserva.adultos': 'Adults',
    'reserva.menores': 'Children',
    'reserva.nombre': 'Full name',
    'reserva.correo': 'Email',
    'reserva.telefono': 'Phone',
    'reserva.comentarios': 'Anything we should know',
    'reserva.comentariosPista': 'Celebrations, approximate arrival time, accessibility needs.',
    'reserva.opcional': 'optional',
    'reserva.obligatorio': 'required',
    'reserva.revisar': 'Review my request',
    'reserva.resumenTitulo': 'This is what you are about to send',
    'reserva.resumenPie': 'Nothing has been sent yet. Check the message and send it from your own email.',
    'reserva.enviarCorreo': 'Send by email',
    'reserva.copiar': 'Copy the message',
    'reserva.copiado': 'Message copied',
    'reserva.editar': 'Back to editing',
    'reserva.directo': 'Rather write to us yourself?',
    'reserva.directoTexto': 'Write to us with your dates, the number of guests and your contact details.',
    'reserva.errTitulo': 'Please check these fields before continuing',
    'reserva.errFecha': 'Enter your arrival date.',
    'reserva.errSalida': 'Departure must be after arrival.',
    'reserva.errPasado': 'Arrival cannot be a date in the past.',
    'reserva.errNombre': 'Enter your name.',
    'reserva.errCorreo': 'Enter a valid email so the hotel can reply to you.',
    'reserva.asunto': 'Reservation request',
    'reserva.cierre': 'I understand this is a request subject to confirmation by the hotel.',
    'reserva.aviso': 'Request subject to confirmation by the hotel',
    'reserva.whatsapp': 'Message us on WhatsApp',

    'hero.eyebrow': 'Tulum Hotel Zone · Beachfront',
    'hero.titulo': 'Where the sea is sweet',
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

    'galeria.titulo': 'Gallery',
    'galeria.pagMeta': 'The beach, the rooftop, the gardens and the common areas of Azúcar Hotel Tulum, in the hotel’s own photographs.',
    'galeria.entrada': 'The beach, the rooftop and the common areas. Each room has its own gallery.',
    'galeria.verAlojamiento': 'View the rooms',
    'galeria.visor': 'Photo viewer',
    'galeria.ampliar': 'Enlarge photo {n} of {total}',
    'galeria.alt': '{nombre}, photo {n}',
    'galeria.anterior': 'Previous photo',
    'galeria.siguiente': 'Next photo',
    'galeria.cerrar': 'Close the viewer',

    'servicios.titulo': 'Services',
    'servicios.meta': 'Private beach, oceanfront infinity pool, rooftop jacuzzi, free Wi-Fi and parking, and 24-hour service.',
    'faq.titulo': 'Frequent questions',
    'faq.meta': 'Answers to what guests ask most before booking: beach, breakfast, Wi-Fi, parking, pets, check-in and check-out times.',
    'politicas.titulo': 'Hotel policies',
    'politicas.meta': 'Payment and identification conditions, check-in and check-out times, changes and cancellations at Azúcar Hotel Tulum.',
    'ubicacion.titulo': 'Getting here',
    'ubicacion.meta': 'Carretera a Boca Paila km 7.5, Hotel Zone, Tulum. How to get here from Cancún airport and from Tulum town.',
    'ubicacion.direccion': 'Address',
    'ubicacion.mapa': 'Open in Google Maps',
    'contacto.titulo': 'Contact',
    'contacto.meta': 'Phone, WhatsApp and email for Azúcar Hotel Tulum. Reception open 24 hours.',
    'contacto.telefono': 'Phone',
    'contacto.correo': 'Email',
    'contacto.horario': 'Reception is open 24 hours, every day.',

    'privacidad.titulo': 'Privacy notice',
    'privacidad.meta': 'How Azúcar Hotel Tulum collects, uses and protects the personal information you provide through this website.',
    'privacidad.vigencia': 'In effect since {fecha}.',

    'footer.derechos': 'All rights reserved.',
    'footer.privacidad': 'Privacy notice',
    'footer.explorar': 'Explore',
    'footer.contacto': 'Contact',
    'footer.sobre': 'The hotel',
    'footer.legalTitulo': 'Legal',
    'footer.terminos': 'Terms and conditions',
    'footer.politicas': 'Hotel policies',
    'footer.direccion': 'Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Quintana Roo, Mexico',

    'amenidades.antetitulo': 'Our services',
    'galeriaHome.antetitulo': 'The property',
    'exp.antetitulo': 'What makes this place',
    'exp.titulo': 'Three reasons to come',
    'exp.ver': 'See all services',
    'exp.playaEtiqueta': 'Steps from the sand',
    'exp.albercaEtiqueta': 'Facing the sea',
    'exp.jacuzziEtiqueta': 'Up on the roof',
    'cta.titulo': 'The hotel confirms every request by hand',
    'cta.texto': 'No automatic calendar and no surprises on arrival: we reply with real availability and the total, taxes included.',
    'cta.etiquetaTel': 'Reservations',
    'cta.boton': 'Request a reservation',
    'contactoHome.antetitulo': 'Where we are',
    'contactoHome.titulo': 'Carretera a Boca Paila, Tulum',
    'contactoHome.texto': 'In the hotel zone, right on the beach. If you are driving, the entrance is easy to miss: “How to get here” has the exact landmarks.',
    'contactoHome.telefono': 'Phone',
    'contactoHome.correo': 'Email',
    'contactoHome.direccion': 'Address',
    'contactoHome.ver': 'How to get here',
    'galeriaHome.titulo': 'The beach, the rooftop and the quiet corners',
    'galeriaHome.texto': 'Eight photographs of the hotel as it is: unretouched, and with no promises we cannot keep.',
    'galeriaHome.ver': 'See the full gallery',
    'faqHome.antetitulo': 'Before you book',
    'faqHome.titulo': 'What guests ask us most',
    'faqHome.ver': 'See all {n} questions',
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
/**
 * Segmento de ruta por idioma. Las URLs se traducen enteras: `/alojamiento/` y
 * `/en/rooms/`, no `/en/alojamiento/`.
 *
 * ── CONTRATO ────────────────────────────────────────────────────────────────
 * **Este mapa describe lo que EXISTE.** Una entrada aquí es la promesa de que
 * hay una página en los dos idiomas; añadir una página obliga a añadir su
 * segmento, y retirar una obliga a retirarlo.
 *
 * Había dos entradas huérfanas —`restaurante` y `terminos`— declaradas para
 * páginas que no existen y sin una sola referencia en el código. Ninguna hacía
 * daño hoy, pero un mapa de rutas que enumera destinos inexistentes deja de ser
 * una descripción del sitio y pasa a ser una lista de intenciones, que es justo
 * lo que nadie sabe interpretar seis meses después. `restaurante` sigue
 * bloqueado por **C0** y `terminos` está descartado porque el hotel no tiene ese
 * texto; cuando existan, se añaden aquí y en `_redirects` a la vez.
 */
export const segmentos = {
  alojamiento: { es: 'alojamiento', en: 'rooms' },
  servicios:   { es: 'servicios',   en: 'services' },
  galeria:     { es: 'galeria',     en: 'gallery' },
  ubicacion:   { es: 'ubicacion',   en: 'location' },
  contacto:    { es: 'contacto',    en: 'contact' },
  reservar:    { es: 'reservar',    en: 'booking' },
  politicas:   { es: 'politicas',   en: 'policies' },
  'preguntas-frecuentes': { es: 'preguntas-frecuentes', en: 'frequent-questions' },
  'aviso-de-privacidad': { es: 'aviso-de-privacidad', en: 'privacy-policy' },
} as const;

/**
 * Fragmentos de URL — el mismo criterio que `segmentos`, y por el mismo motivo.
 *
 * Un `#` acaba en la barra de direcciones en cuanto alguien pulsa el enlace, y
 * desde ahí se copia y se comparte. Es parte de la dirección pública, no un
 * detalle de implementación, así que sigue las mismas dos reglas que el resto de
 * la ruta: **se traduce** y **no expone nombres internos**.
 *
 * `#presentacion` fallaba en las dos: era el nombre del componente que dibuja
 * esa sección —`SeccionPresentacion`— y aparecía igual en inglés. Al visitante
 * no le dice nada; a quien mantenga el sitio le hace creer que renombrar el
 * componente es seguro.
 *
 * Los `id` de los CAMPOS del formulario NO entran aquí, y es deliberado: son
 * identificadores técnicos que enlazan `<label for>` con su control y que el
 * script usa para componer el mensaje. Traducirlos obligaría a bifurcar esa
 * lógica por idioma a cambio de un fragmento que aparece un segundo al saltar a
 * un error. El coste no lo paga el beneficio.
 */
export const anclas = {
  contenido: { es: 'contenido', en: 'content' },
  elHotel: { es: 'el-hotel', en: 'the-hotel' },
} as const;

export type ClaveAncla = keyof typeof anclas;

/** El identificador, sin `#`. Para el atributo `id` del destino. */
export function idAncla(idioma: Idioma, clave: ClaveAncla): string {
  return anclas[clave][idioma];
}

/** El destino con `#`. Para el `href` del enlace. */
export function ancla(idioma: Idioma, clave: ClaveAncla): string {
  return `#${anclas[clave][idioma]}`;
}

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
  const ruta = `${base}${[traducido, ...resto].join('/')}`;
  // Barra final SOLO en las secciones, que se compilan como `index.html`.
  // Sin ella Cloudflare Pages responde 308 y redirige a la version con barra:
  // un salto de red extra en los enlaces mas pulsados del sitio. Las fichas
  // (`alojamiento/suite-mar`) son archivos, no directorios, y no la llevan.
  return resto.length === 0 ? `${ruta}/` : ruta;
}
