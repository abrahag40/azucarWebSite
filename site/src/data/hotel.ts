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
   * responder por ese canal, peor que no ofrecer el boton. Pregunta B4,
   * riesgo R-21 en la bitacora.
   *
   * Mientras siga en `null`, `BotonWhatsApp.astro` no inventa un numero: cae
   * a `/contacto/`, que es cierto hoy. En cuanto el cliente confirme, este
   * campo es el unico cambio que hace falta para que el boton abra WhatsApp.
   */
  whatsapp: null as string | null,
} as const;

/** Presentación. Fuente: `/nosotros/` y `/en/about-us/`. */
export const presentacion: { antetitulo: Texto; titulo: Texto; parrafos: Texto[] } = {
  antetitulo: { es: 'Azucar Hotel Tulum', en: 'Azucar Hotel Tulum' },
  titulo: {
    es: 'Un sueño hecho realidad en 2008',
    en: 'A dream that came true in 2008',
  },
  parrafos: [
    {
      es: 'Azucar Hotel Tulum nació de un sueño y se hizo realidad en 2008 gracias a nuestros huéspedes y a todos los que formamos el equipo de trabajo. Somos un Small Luxury Hotel que durante años ha ganado premios al mejor hotel y está entre los mejores de la zona hotelera de Tulum.',
      en: 'Azucar Hotel Tulum was born from a dream and became a reality in 2008 thanks to our guests and everyone on the team. We are a Small Luxury Hotel that for years has won awards for best hotel and is among the best in the Tulum hotel zone.',
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
  // El RESTAURANTE vuelve. Estuvo retirado mientras duró la contradicción C0
  // —su FAQ decía «por ahora no tenemos servicio de restaurante o bar» y sus
  // páginas de servicios lo anunciaban—; Abraham la resolvió como Proxy PO el
  // 2026-08-25: el restaurante existe y la respuesta del FAQ viejo estaba
  // desactualizada. Ver `src/data/restaurante.ts`.
  //
  // 🔴 EL **SPA** NO VUELVE. La decisión de Abraham fue sobre el restaurante;
  // del spa no se ha dicho nada, y sigue sin página propia en el sitio vigente.
  // Una decisión sobre una cosa no se estira a la de al lado sólo porque
  // estuvieran en el mismo comentario.
  {
    icono: 'restaurante',
    titulo: { es: 'Restaurante', en: 'Restaurant' },
    texto: {
      es: 'Cocina del hotel en el roof top, frente al mar.',
      en: 'The hotel kitchen on the rooftop, facing the sea.',
    },
  },
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

/**
 * Instalaciones con nombre propio — los apartados de «Amenidades» del menú.
 *
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  ⚠️  DOS DE LAS CUATRO SON CONTENIDO DE EJEMPLO                           ║
 * ║                                                                          ║
 * ║  El cliente pidió estos cuatro apartados en el menú (2026-09-01). De los  ║
 * ║  cuatro, sólo DOS tienen respaldo en algo que el hotel ya publique:       ║
 * ║                                                                          ║
 * ║    ✅ rooftop-selvamar — su FAQ y su página de amenidades lo describen    ║
 * ║    ✅ spa             — aparece en su lista de amenidades. Se anuncia     ║
 * ║                         como «próximamente» porque no hay una sola línea  ║
 * ║                         que diga qué es ni si está abierto                ║
 * ║    ⚠️ daypass          — INVENTADO. No existe en ninguna de las 26        ║
 * ║                         páginas capturadas del sitio vigente              ║
 * ║    ⚠️ rooftop-white-pearl — INVENTADO. El único roof top con nombre en su ║
 * ║                         sitio es «Selvamar»                               ║
 * ║                                                                          ║
 * ║  Los precios y las condiciones del Day Pass son especialmente delicados:  ║
 * ║  publicar un precio que no es el del hotel es la queja que este proyecto  ║
 * ║  vino a curar. POR ESO NO HAY NINGUNA CIFRA aquí.                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ── CÓMO EDITAR ────────────────────────────────────────────────────────────
 * `id` es el ancla de la URL (`/servicios/#daypass`) y lo usa el menú. Si lo
 * cambias aquí, cámbialo también en `Header.astro`; el guardián «fragmentos de
 * URL sanos» de `verificar-todo.sh` avisa si dejan de coincidir.
 *
 * `proximamente: true` pinta la etiqueta y **quita el enlace del menú**: se
 * anuncia sin prometer una página que no dice nada.
 */
export const instalaciones: {
  id: string;
  titulo: Texto;
  parrafos: Texto[];
  proximamente?: boolean;
  ejemplo?: boolean;
}[] = [
  {
    id: 'rooftop-selvamar',
    titulo: { es: 'Rooftop SelvaMar · alberca y jacuzzi', en: 'SelvaMar Rooftop · pool and jacuzzi' },
    parrafos: [
      {
        es: 'El roof top del hotel se llama SelvaMar y hace honor al nombre: de un lado el Caribe, del otro la selva de Tulum. Arriba están el jacuzzi extra grande climatizado, los camastros y las hamacas.',
        en: 'The hotel rooftop is called SelvaMar and lives up to the name: the Caribbean on one side, the Tulum jungle on the other. Up there are the extra-large heated jacuzzi, the loungers and the hammocks.',
      },
      {
        es: 'Abajo, a pie de playa, la alberca infinita da directamente al mar.',
        en: 'Below, at beach level, the infinity pool opens straight onto the sea.',
      },
    ],
  },
  {
    id: 'rooftop-white-pearl',
    titulo: { es: 'Rooftop «White Pearl»', en: '“White Pearl” Rooftop' },
    ejemplo: true,
    parrafos: [
      {
        es: 'La terraza alta del hotel, reservada para atardeceres y celebraciones pequeñas. Blanco, madera y el mar de fondo.',
        en: 'The hotel’s upper terrace, kept for sunsets and small celebrations. White, wood and the sea behind.',
      },
    ],
  },
  {
    id: 'daypass',
    titulo: { es: 'Day Pass / Beach Club', en: 'Day Pass / Beach Club' },
    ejemplo: true,
    parrafos: [
      {
        es: 'Acceso por el día a la playa privada, a la alberca infinita y al roof top, sin quedarse a dormir. Incluye camastro y servicio de restaurante y bar.',
        en: 'Day access to the private beach, the infinity pool and the rooftop, without staying the night. Includes a sun lounger and restaurant and bar service.',
      },
      {
        // 🔴 Regla 3: ninguna cifra hasta que responda C3. Un precio de day
        // pass sin impuestos reproduce exactamente la queja del sitio viejo.
        es: 'El cupo es limitado y se confirma por escrito. Escríbenos con la fecha y te decimos disponibilidad y precio, impuestos incluidos.',
        en: 'Places are limited and confirmed in writing. Write to us with the date and we will tell you availability and price, taxes included.',
      },
    ],
  },
  {
    id: 'spa',
    titulo: { es: 'Spa', en: 'Spa' },
    proximamente: true,
    parrafos: [
      {
        es: 'Estamos preparando el espacio de spa del hotel. En cuanto abra lo publicamos aquí con sus servicios y horarios.',
        en: 'We are getting the hotel spa space ready. As soon as it opens we will publish its services and hours here.',
      },
    ],
  },
];
