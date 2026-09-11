/**
 * Qué hacer en Tulum — el entorno del hotel, sin publicidad gratuita.
 *
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  🔴 DOS REGLAS QUE NO SE ROMPEN EN ESTE ARCHIVO                          ║
 * ║                                                                          ║
 * ║  1. **SÓLO LUGARES PÚBLICOS, NUNCA NEGOCIOS.** Petición literal del      ║
 * ║     cliente: «sin dar publicidad gratuita». Caben las ruinas, los        ║
 * ║     cenotes, Sian Ka'an, una laguna o el pueblo. NO caben beach clubs,   ║
 * ║     operadores de tours, restaurantes ni hoteles vecinos.                ║
 * ║                                                                          ║
 * ║     Es además lo que le conviene al hotel: recomendar un negocio es      ║
 * ║     responder por él. Si el tour sale mal, la reseña la recibe quien lo  ║
 * ║     recomendó.                                                           ║
 * ║                                                                          ║
 * ║  2. **NINGUNA DISTANCIA NI TIEMPO DE TRASLADO.** `distancia` sigue en    ║
 * ║     `null` en las ocho. C-LLEG —los tiempos desde el aeropuerto y las    ║
 * ║     referencias físicas— sigue sin responder, y un «a 15 minutos»        ║
 * ║     inventado es exactamente el dato sin confirmar que la regla 7        ║
 * ║     prohíbe. Un huésped que calcula su día con un tiempo falso llega     ║
 * ║     tarde a su vuelo.                                                    ║
 * ║                                                                          ║
 * ║     El ORDEN sí es geográfico —de lo más cercano a lo más lejano, como   ║
 * ║     pidió el cliente— y eso no exige publicar ninguna cifra.             ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ── CÓMO ESTÁN ESCRITOS ESTOS TEXTOS ───────────────────────────────────────
 * El cliente pidió «una breve psicología de venta y neuromarketing». Eso aquí
 * no significa adjetivos: significa cuatro recursos concretos, y cada uno se
 * puede señalar en el texto.
 *
 *   · **ANCLAJE NUMÉRICO.** Una cifra verificable y grande fija el recuerdo
 *     mejor que cualquier adjetivo. «Ocho mil años bajo el agua» se recuerda;
 *     «impresionantes cenotes» no. Todas las cifras de aquí son comprobables.
 *
 *   · **SIGNIFICADO EN MAYA.** Sian Ka'an, Akumal, sacbé. Un nombre que se
 *     traduce deja de ser un topónimo y pasa a ser una historia — y ata el
 *     lugar a la cultura local, que es lo que el cliente pidió.
 *
 *   · **UNICIDAD, NO SUPERLATIVO.** «La única ciudad maya amurallada frente al
 *     mar» es un hecho que se puede comprobar. «El lugar más bonito del
 *     Caribe» es una opinión que el lector descuenta al leerla.
 *
 *   · **DETALLE SENSORIAL CONCRETO.** El agua a la altura de la rodilla, el
 *     olor del comal, la piedra caliza blanca. El cerebro procesa lo concreto;
 *     lo abstracto lo archiva.
 *
 * 🔴 **Y UNA COSA QUE NO SE HACE: nombrar el sargazo.** El encargo era
 * enseñar que hay mucho que hacer además de la playa, precisamente por eso.
 * Nombrar un problema para decir que no importa es fijarlo en la cabeza de
 * quien lee — se llama *efecto del oso blanco*, y es el error clásico de este
 * tipo de texto. Aquí el mar simplemente no es el protagonista: la entradilla
 * dice que es «una de las ocho razones», y las otras siete hablan solas.
 *
 * ── LAS FOTOGRAFÍAS Y SUS LICENCIAS ────────────────────────────────────────
 * De estos ocho lugares NO hay una sola foto en el archivo del hotel: sus 244
 * imágenes son todas de la propiedad. Así que son fotografías de terceros con
 * licencia libre, de Wikimedia Commons y de Flickr vía Openverse.
 *
 * 🔴 **`credito` NO ES DECORACIÓN, ES LA CONDICIÓN DE USO.** Las licencias
 * Creative Commons BY y BY-SA permiten el uso comercial —incluido éste— **a
 * cambio de citar al autor y la licencia**. Si se borra el crédito, la
 * fotografía pasa a estar usada sin permiso. La página los publica al final,
 * en «Créditos fotográficos», y `verificar-todo.sh` comprueba que ninguna foto
 * de terceros se quede sin el suyo.
 *
 * Dominio público = sin condiciones. Se cita igual, por honestidad, pero ahí
 * no hay obligación.
 *
 * ── CÓMO EDITAR ────────────────────────────────────────────────────────────
 *   titulo / texto  — los dos idiomas, siempre.
 *   imagen          — se importa arriba; el orden de los imports da igual.
 *   credito         — OBLIGATORIO si la imagen no es del hotel.
 *   distancia       — sigue en `null`. Ver la regla 2.
 *
 * Para sustituir una foto por una del hotel: se cambia el import y se pone
 * `credito: null`. El pie de créditos se encoge solo.
 */
import type { ImageMetadata } from 'astro';
import type { Idioma } from '../i18n/ui';

import fotoHotel from '../assets/rooftop-white-pearl.webp';
import fotoBocaPaila from '../assets/actividades/boca-paila-2026.webp';
import fotoPueblo from '../assets/actividades/pueblo.jpg';
import fotoZona from '../assets/actividades/zona-arqueologica.jpg';
import fotoSianKaan from '../assets/actividades/sian-kaan.jpg';
import fotoKaanLuum from '../assets/actividades/kaan-luum.jpg';
import fotoCenotes from '../assets/actividades/cenotes.jpg';
import fotoCoba from '../assets/actividades/coba.jpg';
import fotoAkumal from '../assets/actividades/akumal.jpg';

type Texto = Record<Idioma, string>;

export interface Credito {
  /** Cómo se titula el archivo en su origen. */
  obra: string;
  autor: string;
  /** Nombre corto de la licencia, p. ej. «CC BY-SA 4.0». */
  licencia: string;
  /** El texto legal de la licencia. `null` para dominio público. */
  licenciaUrl: string | null;
  /** La página de origen, para que el crédito se pueda comprobar. */
  fuente: string;
}

export interface Actividad {
  id: string;
  titulo: Texto;
  texto: Texto;
  icono: string;
  imagen: ImageMetadata | null;
  /** `null` sólo si la fotografía es del propio hotel. */
  credito: Credito | null;
  distancia: Texto | null;
  /**
   * Palabra del texto que va en CURSIVA — el nombre del restaurante, que el
   * cliente pidió así (2026-09-11).
   *
   * Es un campo aparte y no un `<em>` dentro de la cadena **a propósito**:
   * marcado dentro de un texto traducido obliga a `set:html`, y ése es el
   * camino por el que un día deja de escaparse algo. La plantilla parte el
   * texto por esta palabra y envuelve la coincidencia. El escapado de Astro
   * sigue intacto en los tres trozos.
   */
  cursiva?: string;
}

/* El ORDEN es el que pidió el cliente: de lo más cercano al hotel a lo más
   lejano. No es maquetación — es como se planea un viaje: lo que está a la
   vuelta de la esquina se hace, lo que está a dos horas se decide. Poner Cobá
   primero sería enseñar el obstáculo antes que la puerta. */
export const actividades: Actividad[] = [
  /* ── LA CASA, LA PRIMERA ──────────────────────────────────────────────────
     Pedida por el cliente el 2026-09-11: el hotel como «actividad». Va la
     primera porque el orden de esta lista es «de lo más cercano a lo más
     lejano», y nada está más cerca que donde ya duermes.

     Nació ocupando 10 de 12 columnas, centrada, para que pesara más que un
     cenote dentro de su propia página. **El cliente lo canceló el mismo día**:
     todas iguales, de 6. Se anota para que no vuelva a proponerse como idea
     nueva dentro de un mes.

     🔴 **Falta el SPA a propósito.** El dictado decía «nuestro spa debe ser
     imperdible en tu estancia», y el spa **no existe todavía**: en todo el
     sitio se anuncia como «próximamente» y sin enlace, porque no hay una sola
     línea que diga qué es. Escribirlo aquí en presente sería prometer un
     servicio que el huésped no va a encontrar al llegar — exactamente el
     defecto que este proyecto vino a corregir. Entra el día que abra.

     La fotografía es del hotel, así que `credito: null`. */
  {
    id: 'hotel',
    icono: 'alberca',
    distancia: null,
    imagen: fotoHotel,
    credito: null,
    cursiva: 'Tenedor',
    titulo: { es: 'Azucar Hotel Tulum', en: 'Azucar Hotel Tulum' },
    texto: {
      es: 'Empieza por casa: habitaciones hechas para descansar de verdad, y una playa de arena blanca y suave donde el amanecer se ve desde la cama. Las albercas y los roof tops son de los que se recuerdan, y el restaurante Tenedor sirve cocina internacional de autor frente al mar.',
      en: 'Start at home: rooms made for real rest, and a beach of soft white sand where the sunrise arrives before you leave the bed. The pools and the rooftops are the kind you remember, and the Tenedor restaurant serves signature international cooking facing the sea.',
    },
  },
  {
    id: 'pueblo',
    icono: 'mercado',
    distancia: null,
    imagen: fotoPueblo,
    credito: {
      obra: 'Street Dancers — Tulum QR 2020',
      autor: 'Bernard DUPONT',
      licencia: 'CC BY-SA 2.0',
      licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
      fuente: 'https://commons.wikimedia.org/wiki/File:Street_Dancers_-_Tulum_QR_2020.jpg',
    },
    titulo: { es: 'El pueblo de Tulum', en: 'Tulum town' },
    /* Texto del cliente (2026-09-11). Pidió expresamente **no decir dónde
       está** —lo anterior abría con «cruzando la carretera federal»— sino qué
       se hace allí. Los platos son el «(ejemplos)» que dejó indicado: son la
       cocina yucateca de diario, no una carta de restaurante concreto. */
    texto: {
      es: 'Recorrer sus calles entre artesanías, boutiques locales y el folclor de un pueblo mágico lleno de vida todo el año. Color, y la peculiar gastronomía maya de siempre —cochinita pibil, panuchos, sopa de lima—: sin lujo, y sin perder nunca su encanto.',
      en: 'Wander its streets among craft stalls, local boutiques and the folklore of a pueblo mágico that is alive all year round. Colour, and the Maya cooking of always — cochinita pibil, panuchos, sopa de lima: no luxury, and never any less charming for it.',
    },
  },
  {
    id: 'zona-arqueologica',
    icono: 'piramide',
    distancia: null,
    imagen: fotoZona,
    credito: {
      obra: 'Tulum, Mexico (076B5427 8 9 fused)',
      autor: 'Bruce Tuten',
      licencia: 'CC BY 2.0',
      licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
      fuente: 'https://commons.wikimedia.org/wiki/File:Tulum,_Mexico_076B5427_8_9_fused_(15781369495).jpg',
    },
    titulo: { es: 'Zona arqueológica de Tulum', en: 'Tulum archaeological site' },
    texto: {
      es: 'La única ciudad maya amurallada frente al mar. Seguía siendo un puerto activo en 1518: los españoles la vieron desde sus barcos y la compararon con Sevilla.',
      en: 'The only walled Maya city facing the sea. Still an active port in 1518: the Spanish saw it from their ships and compared it to Seville.',
    },
  },
  {
    id: 'boca-paila',
    icono: 'bici',
    distancia: null,
    /* La del puente viejo salió el 2026-09-11 —«horrible, un puente viejo sin
       sentido», dijo el cliente, y tenía razón— y estuvo unas horas en modo
       glifo porque en Wikimedia Commons no hay otra de Boca Paila con licencia
       usable. La sustituye ésta, que **Abraham confirmó como del hotel**, así
       que va sin crédito y cierra la parte de R-38 que dependía de la imagen.

       ⚠️ Queda anotado un detalle que no juzga nada pero conviene que esté
       escrito: el archivo llegó llamándose
       `boca-paila-casa-playa-tulum-quintana-roo-1618440219.jpg`, con el sufijo
       numérico largo típico de una descarga de banco de imágenes. Se preguntó
       por su procedencia antes de publicarla y la respuesta fue «es del hotel».
       Si algún día resulta que no lo es, lo que hay que cambiar es esta línea
       —`credito: null`— y no buscar el porqué otra vez desde cero. */
    imagen: fotoBocaPaila,
    credito: null,
    titulo: { es: 'La carretera de Boca Paila', en: 'The Boca Paila road' },
    texto: {
      es: 'Donde el agua dulce de la laguna se funde con la salada del Caribe: una franja de arena con el mar de un lado y el manglar del otro, y el hotel justo en medio. Se recorre en bicicleta, sin una sola cuesta, o en coche hasta la entrada de Sian Ka’an.',
      en: 'Where the fresh water of the lagoon meets the salt water of the Caribbean: a strip of sand with the sea on one side and the mangrove on the other, and the hotel right in the middle. Ride it by bicycle, without a single hill, or drive it as far as the Sian Ka’an entrance.',
    },
  },
  {
    id: 'sian-kaan',
    icono: 'manglar',
    distancia: null,
    imagen: fotoSianKaan,
    credito: {
      obra: "Sian Ka'an Biosphere Reserve",
      autor: 'Ken Thomas',
      licencia: 'Dominio público',
      licenciaUrl: null,
      fuente: "https://commons.wikimedia.org/wiki/File:SianKa'anBR-27527-1.jpg",
    },
    titulo: { es: 'Reserva de Sian Ka’an', en: 'Sian Ka’an Reserve' },
    /* ⚠️ El cliente dictó también «lobos marinos» (2026-09-11) y NO entran: no
       los hay en el Caribe mexicano. Lo que sí vive en Sian Ka'an y es igual de
       vendedor son los manatíes, los delfines y las tortugas. Prometer un
       animal que no existe allí es de las pocas cosas que un huésped puede
       desmentir el mismo día, y con razón.

       Y se escribe «puedes encontrarte», no «encontrarás»: la fauna silvestre
       no se garantiza. */
    texto: {
      es: 'En maya, «donde nace el cielo». Patrimonio de la Humanidad desde 1987, con canales que los mayas excavaron a mano y que mil años después siguen abiertos. Selva de monos araña por el camino; y en el agua puedes encontrarte delfines nadando a tu alrededor, tortugas enormes, manatíes y la isla de las aves.',
      en: 'In Maya, “where the sky is born”. A World Heritage Site since 1987, with canals the Maya dug by hand that are still open a thousand years later. Spider monkeys in the jungle along the way; and in the water you may find dolphins swimming around you, huge turtles, manatees and the island of the birds.',
    },
  },
  {
    id: 'kaan-luum',
    icono: 'laguna',
    distancia: null,
    imagen: fotoKaanLuum,
    credito: {
      obra: 'Laguna Kaan Luum',
      autor: 'Tinker & Rove',
      licencia: 'CC BY 2.0',
      licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
      fuente: 'https://www.flickr.com/photos/145712985@N08/33445217974',
    },
    titulo: { es: 'Laguna Kaan Luum', en: 'Kaan Luum Lagoon' },
    texto: {
      es: 'Se camina con el agua a la rodilla decenas de metros y el fondo desaparece de golpe: en el centro hay un cenote hondo, y su borde se ve desde la orilla.',
      en: 'You wade out knee-deep for dozens of metres and the bottom vanishes: at its centre lies a deep cenote, and you can see its edge from the shore.',
    },
  },
  {
    id: 'cenotes',
    icono: 'cenote',
    distancia: null,
    imagen: fotoCenotes,
    credito: {
      obra: 'Cenote, Solidaridad, Quintana Roo, Mayo 2011',
      autor: 'Laslovarga',
      licencia: 'CC BY-SA 3.0',
      licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      fuente: 'https://commons.wikimedia.org/wiki/File:Cenote,_Solidaridad,_Quintana_Roo,_Mexico,_Mayo_2011.jpg',
    },
    titulo: { es: 'Los cenotes', en: 'The cenotes' },
    texto: {
      es: 'Cuevas que el mar inundó hace ocho mil años, sobre el sistema sumergido más largo del mundo. Para los mayas eran la entrada al inframundo y su única agua dulce.',
      en: 'Caves the sea flooded eight thousand years ago, above the longest submerged cave system on earth. To the Maya they were the underworld’s door — and their only fresh water.',
    },
  },
  {
    id: 'coba',
    icono: 'arbol',
    distancia: null,
    imagen: fotoCoba,
    credito: {
      obra: 'Coba Nohoch Mul',
      autor: 'Ken Thomas',
      licencia: 'Dominio público',
      licenciaUrl: null,
      fuente: 'https://commons.wikimedia.org/wiki/File:Coba_Nohoch_Mul-27527.jpg',
    },
    titulo: { es: 'Cobá', en: 'Cobá' },
    texto: {
      es: 'Una ciudad maya dentro de la selva. De aquí salía el sacbé más largo que se conoce: cien kilómetros de piedra caliza en línea recta, levantados a mano.',
      en: 'A Maya city inside the jungle. The longest known sacbé started here: a hundred kilometres of white limestone, dead straight, built by hand.',
    },
  },
  {
    id: 'akumal',
    icono: 'tortuga',
    distancia: null,
    imagen: fotoAkumal,
    credito: {
      obra: 'Green Sea Turtle grazing seagrass',
      autor: 'P. Lindgren',
      licencia: 'CC BY-SA 3.0',
      licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      fuente: 'https://commons.wikimedia.org/wiki/File:Green_Sea_Turtle_grazing_seagrass.jpg',
    },
    titulo: { es: 'Bahía de Akumal', en: 'Akumal Bay' },
    texto: {
      es: 'Akumal es «lugar de las tortugas» en maya, y sigue siéndolo: comen en las praderas de pasto marino de su bahía. Hay tours guiados para hacer snorkel o bucear y asomarte a ese mundo marino. El acceso está regulado y tiene temporada.',
      en: 'Akumal means “place of the turtles” in Maya, and it still is: they feed on the seagrass meadows of its bay. Guided tours take you snorkelling or diving into that underwater world. Access is regulated and has a season.',
    },
  },
];
