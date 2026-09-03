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
  /* ORDEN INVERTIDO el 2026-09-03. El cliente lo pidió tres veces por
     separado —pie, sección de contacto y página de contacto—, así que no es
     una preferencia de una vista: es cuál de los dos números quiere que se
     marque primero. Se invierte AQUÍ y no en tres plantillas, porque además
     hay dos sitios —`FranjaLlamada` y `SeccionPresentacion`— que enseñan un
     solo número, `telefonos[0]`, y que con el cambio en las vistas habrían
     seguido enseñando el que el cliente ya no quiere de primero.
     El orden del sitio vigente era el contrario. */
  telefonos: ['+52\u00A0(81)\u00A01380-2176', '+52\u00A0(984)\u00A0210-0057'],
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
  // «Abril» lo precisó la gerencia el 2026-09-02. Es un dato pequeño y hace
  // trabajo: una fecha exacta se lee como memoria, una aproximada como relato.
  titulo: {
    es: 'Un sueño hecho realidad en abril de 2008',
    en: 'A dream that came true in April 2008',
  },
  parrafos: [
    {
      /* ⚠️ ÉSTA YA NO ES LA FRASE LITERAL DEL SITIO VIGENTE. El cliente la
         reescribió el 2026-09-03 y sustituye a «…gracias a nuestros huéspedes
         y a todos los que formamos el equipo de trabajo». La segunda frase,
         la de los premios, SÍ sigue siendo literal y se conserva.

         El pie del sitio muestra las DOS primeras frases de este párrafo, así
         que este texto es también lo que se lee al final de las 46 páginas.

         🟡 «AZUCAR», SIN ACENTO — y el cliente lo escribió CON acento.
         No es un descuido nuestro: el nombre va sin acento en las 46 páginas,
         en el `<title>`, en el `hotelSchema` de `Base.astro` y en los dos
         correos, porque así lo escribe el hotel en su propio sitio. Puesto con
         acento, este párrafo quedaba justo debajo del rótulo «Azucar Hotel
         Tulum» del pie, y dos grafías del mismo nombre a dos centímetros se
         leen como una errata, no como una decisión.

         Si la marca pasa a llevar acento, es un cambio de MARCA y se hace
         entero —46 páginas, schema.org, correos y el logotipo—, no en una
         frase. Pregunta abierta para el cliente. */
      es: 'Azucar Hotel Tulum nació de un sueño y se hizo realidad en 2008. Desde entonces, un equipo comprometido trabaja cada día con un propósito claro: que tu estancia sea inolvidable. Somos un Small Luxury Hotel que durante años ha ganado premios al mejor hotel y está entre los mejores de la zona hotelera de Tulum.',
      en: 'Azucar Hotel Tulum was born from a dream and became a reality in 2008. Since then, a committed team has worked every day with one clear purpose: to make your stay unforgettable. We are a Small Luxury Hotel that for years has won awards for best hotel and is among the best in the Tulum hotel zone.',
    },
    {
      es: 'Este lugar ha sido creado con mucho amor a estas tierras y a la gente que nos visita. La calidez y el trato personalizado nos han caracterizado siempre.',
      en: 'This place was created with a lot of love for these lands and the people who visit us. Warmth and personalized service have always characterized us.',
    },
  ],
};

/**
 * La bienvenida que escribió la gerencia del hotel (2026-09-02).
 *
 * Va aparte de `presentacion` y no dentro, porque hace otro trabajo: aquélla
 * CUENTA la historia del hotel —cuándo nació, qué premios tiene—; ésta HABLA
 * al huésped en segunda persona y termina invitándole a entrar. Mezcladas, la
 * bienvenida se leería como un párrafo más de la historia y perdería lo único
 * que la hace funcionar, que es el cambio de voz.
 *
 * ⚠️ FALTA SU PRIMERA FRASE, a propósito. El texto de la gerencia empieza con
 * «somos un hotel construido artesanalmente por manos mexicanas»; el héroe del
 * sitio dice «por manos mayas», que es lo que pidió el cliente el 2026-09-01.
 * No son lo mismo y no es un matiz: es de quién dice el hotel que es la obra.
 * Se deja fuera hasta que el cliente decida cuál de las dos vale.
 */
export const bienvenida: { parrafos: Texto[]; cierre: Texto } = {
  parrafos: [
    {
      es: 'Aquí se funden las aguas turquesas del Caribe, la arena suave y blanca y la vegetación de la selva: en cada habitación, en cada bungalow y en cada rincón del hotel.',
      en: 'Here the turquoise waters of the Caribbean, the soft white sand and the jungle vegetation blend together: in every room, in every bungalow and in every corner of the hotel.',
    },
    {
      es: 'Nos emociona que, estando aquí, te sientas como en casa y puedas conectar todos tus sentidos con la naturaleza y con este lugar tan mágico.',
      en: 'It moves us that, while you are here, you feel at home and can connect all your senses with nature and with this magical place.',
    },
  ],
  cierre: {
    es: 'Bienvenido a Azucar Hotel Tulum, el único lugar donde el mar es dulce.',
    en: 'Welcome to Azucar Hotel Tulum, the sweetest temptation.',
  },
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
    titulo: { es: 'Jacuzzi en el roof top «Selvamar»', en: 'Jacuzzi on the “Selvamar” rooftop' },
    texto: {
      es: 'Jacuzzi extra grande climatizado, con vistas al mar y a la selva. Uso exclusivo para mayores de 18 años.',
      en: 'Extra-large heated jacuzzi, with views of the sea and the jungle. For guests aged 18 and over.',
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
    titulo: { es: 'Restaurante y bar', en: 'Restaurant and bar' },
    texto: {
      es: 'Cocina del hotel en el roof top, frente al mar, con servicio al cuarto.',
      en: 'The hotel kitchen on the rooftop, facing the sea, with room service.',
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


/**
 * Facilidades — el inventario práctico, tal y como lo envió la gerencia del
 * hotel el 2026-09-02.
 *
 * ── POR QUÉ UNA LISTA Y NO MÁS TARJETAS ────────────────────────────────────
 * `amenidades` son SIETE y llevan icono, título y una frase: son los
 * argumentos de venta, lo que hace que alguien elija este hotel. Esto son
 * DIECIOCHO datos de comprobación —¿hay elevador?, ¿hay cafetera?, ¿el
 * estacionamiento es gratis?— y el huésped no viene a leerlos, viene a
 * buscarlos.
 *
 * Convertirlos en dieciocho tarjetas más habría diluido las siete que sí
 * persuaden y habría alargado la página a tres pantallas de iconos. Una lista
 * densa se recorre con la vista en dos segundos, que es exactamente lo que se
 * hace con ella. *Distinto trabajo, distinta forma.*
 */
export const facilidades: Texto[] = [
  { es: 'Aire acondicionado', en: 'Air conditioning' },
  { es: 'Ventilador', en: 'Ceiling fan' },
  { es: 'Wi-Fi de alta velocidad', en: 'High-speed Wi-Fi' },
  { es: 'Minibar', en: 'Minibar' },
  { es: 'Cafetera', en: 'Coffee maker' },
  { es: 'Secadora de pelo', en: 'Hairdryer' },
  { es: 'Caja de seguridad 24 horas', en: '24-hour safe' },
  { es: 'Servicio al cuarto', en: 'Room service' },
  { es: 'Amenidades orgánicas en cada habitación', en: 'Organic amenities in every room' },
  { es: 'Colchones, almohadas y blancos de lujo', en: 'Luxury mattresses, pillows and linens' },
  { es: 'Elevador', en: 'Lift' },
  { es: 'Escaleras de emergencia', en: 'Emergency stairs' },
  { es: 'Sistema contra incendio en cada habitación', en: 'Fire suppression system in every room' },
  { es: 'Seguridad 24 horas', en: '24-hour security' },
  { es: 'Recepción y atención 24 horas', en: '24-hour reception and assistance' },
  { es: 'Estacionamiento gratuito, sujeto a disponibilidad', en: 'Free parking, subject to availability' },
  { es: 'Hermosos jardines', en: 'Beautiful gardens' },
  { es: 'Ubicación privilegiada', en: 'Prime location' },
];
