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

import fotoPueblo from '../assets/actividades/pueblo.jpg';
import fotoZona from '../assets/actividades/zona-arqueologica.jpg';
import fotoBocaPaila from '../assets/actividades/boca-paila.jpg';
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
}

/* El ORDEN es el que pidió el cliente: de lo más cercano al hotel a lo más
   lejano. No es maquetación — es como se planea un viaje: lo que está a la
   vuelta de la esquina se hace, lo que está a dos horas se decide. Poner Cobá
   primero sería enseñar el obstáculo antes que la puerta. */
export const actividades: Actividad[] = [
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
    texto: {
      es: 'Cruzando la carretera federal está el Tulum que vive todo el año: el mercado, el olor del comal a las siete de la mañana y los precios de quien no está de paso.',
      en: 'Across the highway is the Tulum that lives here all year: the market, the smell of the comal at seven in the morning, and the prices of people who are not passing through.',
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
    imagen: fotoBocaPaila,
    credito: {
      obra: 'Boca Paila, east',
      autor: 'Wasquewhat',
      licencia: 'CC BY-SA 4.0',
      licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      fuente: 'https://commons.wikimedia.org/wiki/File:Boca_Paila,east.jpg',
    },
    titulo: { es: 'La carretera de Boca Paila', en: 'The Boca Paila road' },
    texto: {
      es: 'Una franja de arena con el mar de un lado y la laguna del otro, y el hotel justo en medio. Se recorre entera en bicicleta, sin una sola cuesta.',
      en: 'A strip of sand with the sea on one side and the lagoon on the other, and the hotel right in the middle. You can ride all of it, without a single hill.',
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
    texto: {
      es: 'En maya, «donde nace el cielo». Patrimonio de la Humanidad desde 1987, con canales que los mayas excavaron a mano y que mil años después siguen abiertos.',
      en: 'In Maya, “where the sky is born”. A World Heritage Site since 1987, with canals the Maya dug by hand that are still open a thousand years later.',
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
      es: 'Akumal es «lugar de las tortugas» en maya, y sigue siéndolo: comen en las praderas de pasto marino de su bahía. El acceso está regulado y tiene temporada.',
      en: 'Akumal means “place of the turtles” in Maya, and it still is: they feed on the seagrass meadows of its bay. Access is regulated and has a season.',
    },
  },
];
