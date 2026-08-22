/**
 * Contenido institucional del hotel, modelado como DATOS (regla 6 de CLAUDE.md).
 *
 * Por qué un módulo tipado y no una *content collection* como `alojamiento`:
 * proporcionalidad. El alojamiento son ocho fichas con una decena de campos cada
 * una, que alimentan cuatro vistas distintas y `schema.org/HotelRoom`: ahí una
 * colección con esquema validado se paga sola. Esto son tres listas cortas que
 * sólo pinta la home. Un archivo por amenidad sería ceremonia sin beneficio
 * —CLAUDE.md §2.5—. Sigue siendo dato: versionado, tipado y fuera del marcado.
 *
 * PROCEDENCIA. Todo el texto de este archivo está tomado literalmente de las
 * páginas del sitio vigente capturadas en `investigacion/mirrors/azucarhotel`:
 * `/nosotros/`, `/servicios/` y `/amenidades-y-facilidades/`, con sus versiones
 * `/en/about-us/` y `/en/services/`. No hay una sola frase inventada por
 * nosotros: es contenido que el hotel ya publica y que, por tanto, ya aprobó.
 */
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;

/**
 * Datos de contacto. Tomados del encabezado del sitio vigente.
 *
 * Los espacios de los teléfonos son **espacios duros** (U+00A0), no espacios
 * normales. Un número de teléfono partido a mitad de línea —«+52 (984)» arriba
 * y «210-0057» abajo— se lee mal y se copia peor. Lo señaló `html-validate` con
 * su regla `tel-non-breaking`, y es de esas cosas que sólo se ven cuando el
 * ancho es justo el que parte el número.
 */
export const contacto = {
  correo: 'contacto@azucarhotel.com',
  telefonos: ['+52\u00A0(984)\u00A0210-0057', '+52\u00A0(81)\u00A01380-2176'],
  /**
   * Numero de WhatsApp para el boton flotante, en formato wa.me: solo digitos,
   * con codigo de pais, sin `+` ni espacios (p. ej. `529841234567`).
   *
   * `null` a proposito. El sitio vigente muestra el icono de WhatsApp junto a
   * los dos telefonos de arriba, pero no publica un enlace `wa.me` en ningun
   * lado: no hay forma de saber cual de los dos numeros lo tiene. Adivinar
   * aqui mandaria a un huesped a escribirle a un numero que puede no
   * responder por ese canal, peor que no ofrecer el boton. Pregunta B3,
   * riesgo R-24 en la bitacora.
   *
   * Mientras siga en `null`, `BotonWhatsApp.astro` no inventa un numero: cae
   * a `/contacto/`, que es cierto hoy. En cuanto el cliente confirme, este
   * campo es el unico cambio que hace falta para que el boton abra WhatsApp.
   */
  whatsapp: null as string | null,
} as const;

/** Presentación. Fuente: `/nosotros/` y `/en/about-us/`. */
export const presentacion: { antetitulo: Texto; titulo: Texto; parrafos: Texto[] } = {
  antetitulo: { es: 'Azúcar Hotel Tulum', en: 'Azúcar Hotel Tulum' },
  titulo: {
    es: 'Un sueño hecho realidad en 2008',
    en: 'A dream that came true in 2008',
  },
  parrafos: [
    {
      es: 'Azúcar Hotel Tulum nació de un sueño y se hizo realidad en 2008 gracias a nuestros huéspedes y a todos los que formamos el equipo de trabajo. Somos un Small Luxury Hotel que durante años ha ganado premios al mejor hotel y está entre los mejores de la zona hotelera de Tulum.',
      en: 'Azúcar Hotel Tulum was born from a dream and became a reality in 2008 thanks to our guests and everyone on the team. We are a Small Luxury Hotel that for years has won awards for best hotel and is among the best in the Tulum hotel zone.',
    },
    {
      es: 'Este lugar ha sido creado con mucho amor a estas tierras y a la gente que nos visita. La calidez y el trato personalizado nos han caracterizado siempre.',
      en: 'This place was created with a lot of love for these lands and the people who visit us. Warmth and personalized service have always characterized us.',
    },
  ],
};

/** Frase de la franja de imagen. Es el lema que el hotel ya usa en su sitio. */
export const lema: Texto = {
  es: 'El único lugar donde el mar es dulce',
  en: 'The sweetest temptation',
};

/**
 * Amenidades y facilidades. Fuente: `/servicios/` y `/amenidades-y-facilidades/`.
 * `icono` referencia una clave de `Icono.astro`, que dibuja SVG propio: los
 * iconos de Cappa —Flaticon, Themify y Font Awesome Pro— son recursos
 * licenciados y siguen bloqueados por el riesgo R-01.
 */
export const amenidades: { icono: string; titulo: Texto; texto: Texto }[] = [
  {
    icono: 'ola',
    titulo: { es: 'Playa privada', en: 'Private beach' },
    texto: {
      es: 'Playa privada gratuita para huéspedes, con camastros y camas de playa.',
      en: 'Free private beach for guests, with sun loungers and beach beds.',
    },
  },
  {
    icono: 'alberca',
    titulo: { es: 'Alberca infinita', en: 'Infinity pool' },
    texto: {
      es: 'Alberca infinita frente al mar, a unos pasos de la arena.',
      en: 'Oceanfront infinity pool, a few steps from the sand.',
    },
  },
  {
    icono: 'jacuzzi',
    titulo: { es: 'Jacuzzi en roof top', en: 'Rooftop jacuzzi' },
    texto: {
      es: 'Jacuzzi extra grande climatizado en el roof top común, con vistas panorámicas al mar y a la selva.',
      en: 'Extra-large heated jacuzzi on the shared rooftop, with panoramic views of the ocean and the jungle.',
    },
  },
  // ⚠️ AQUÍ IBAN «Restaurante y Bar Blanc» y «Spa», y se retiran.
  //
  // El contenido del propio cliente se contradice. `/servicios/` y
  // `/amenidades-y-facilidades/` los anuncian; `/preguntas-frecuentes/` dice
  // literalmente: «¿Tienen restaurante o bar? Por ahora no tenemos servicio de
  // restaurante o bar». Ni `/restaurante/` ni `/spa/` existen como página, pese
  // a estar en el menú del sitio vigente.
  //
  // Publicar un restaurante que quizá no exista es exactamente la promesa
  // incumplida que este proyecto viene a corregir. Regla 7: dato sin confirmar,
  // dato que no se publica. Vuelven en cuanto el cliente responda la pregunta
  // C-REST del banco de preguntas.
  //
  // En su lugar van dos que el FAQ del hotel confirma sin ambigüedad.
  {
    icono: 'wifi',
    titulo: { es: 'Wi-Fi y estacionamiento', en: 'Wi-Fi and parking' },
    texto: {
      es: 'Los dos gratuitos para huéspedes. El estacionamiento, sujeto a disponibilidad.',
      en: 'Both free for guests. Parking is subject to availability.',
    },
  },
  {
    icono: 'cafe',
    titulo: { es: 'Cortesía de la mañana', en: 'Morning courtesy' },
    texto: {
      es: 'Fruta, café y pan cada mañana en el área de snack, entre las habitaciones.',
      en: 'Fruit, coffee and bread every morning in the snack area, between the rooms.',
    },
  },
  {
    icono: 'reloj',
    titulo: { es: 'Atención 24 horas', en: '24-hour service' },
    texto: {
      es: 'Recepción, concierge y seguridad las 24 horas, todos los días.',
      en: 'Reception, concierge and security 24 hours a day, every day.',
    },
  },
];
