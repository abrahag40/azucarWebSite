/**
 * Qué hacer en Tulum — el entorno del hotel, sin publicidad gratuita.
 *
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  🔴 DOS REGLAS QUE NO SE ROMPEN EN ESTE ARCHIVO                          ║
 * ║                                                                          ║
 * ║  1. **SÓLO LUGARES PÚBLICOS, NUNCA NEGOCIOS.** Petición literal del      ║
 * ║     cliente (2026-09-01): «sin dar publicidad gratuita». Aquí caben las  ║
 * ║     ruinas, los cenotes, Sian Ka'an, una laguna o el pueblo. NO caben    ║
 * ║     beach clubs, operadores de tours, restaurantes ni hoteles vecinos —  ║
 * ║     y menos aún uno solo de cada, que es como una página de contenido se ║
 * ║     convierte en un anuncio que nadie pagó.                              ║
 * ║                                                                          ║
 * ║     Es además lo que le conviene al hotel: recomendar un negocio es      ║
 * ║     responder por él. Si el tour sale mal, la reseña la recibe quien lo  ║
 * ║     recomendó.                                                           ║
 * ║                                                                          ║
 * ║  2. **NINGUNA DISTANCIA NI TIEMPO DE TRASLADO.** `distancia` está en     ║
 * ║     `null` en las ocho, a propósito. C-LLEG —los tiempos y costos desde  ║
 * ║     el aeropuerto y las referencias físicas— sigue sin responder, y      ║
 * ║     publicar aquí un «a 15 minutos» inventado sería exactamente el dato  ║
 * ║     sin confirmar que la regla 7 prohíbe. Un huésped que calcula su día  ║
 * ║     con un tiempo falso llega tarde a su vuelo.                          ║
 * ║                                                                          ║
 * ║     En cuanto el hotel confirme, se rellena `distancia` y la tarjeta la  ║
 * ║     pinta sola. No hay que tocar ningún componente.                      ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ── ⚠️ POR QUÉ HAY GLIFOS Y NO FOTOGRAFÍAS ─────────────────────────────────
 * Porque de estos ocho lugares **no existe una sola fotografía** en lo que el
 * hotel entregó: las 244 imágenes del archivo son todas de la propiedad —
 * habitaciones, playa, roof top, jardines—. Ni un cenote, ni una ruina.
 *
 * Las tres salidas posibles eran: (a) dejar las tarjetas vacías, (b) ilustrar
 * «Cenotes» con una foto de la alberca del hotel, o (c) dibujar. La (b) es la
 * peor de las tres y es la que más se ve por ahí: es engañar con una imagen, y
 * es justo lo que este proyecto no hace. La (a) parece un sitio a medio hacer.
 *
 * Así que se dibujaron ocho glifos con el mismo trazo del resto del sitio
 * (`Icono.astro`). No son un marcador de posición: son una ilustración que
 * funciona hoy. Y el día que lleguen las fotos, se rellena `imagen` y la
 * tarjeta cambia sola — sin rediseñar nada.
 *
 * ── CÓMO EDITAR ────────────────────────────────────────────────────────────
 *   titulo / texto  — los dos idiomas, siempre.
 *   icono           — una clave de `Icono.astro`.
 *   imagen          — `null` hoy. Para poner una foto: se guarda en
 *                     `src/assets/actividades/`, se importa arriba y se pone
 *                     aquí. La foto sustituye al glifo automáticamente.
 *   distancia       — `null` hoy. Ver la regla 2 de arriba.
 *
 * Para AÑADIR un lugar: copia un bloque `{ … },` entero. Para QUITARLO,
 * bórralo. El orden aquí es el orden en la página, y son cuatro por fila.
 */
import type { ImageMetadata } from 'astro';
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;

export interface Actividad {
  id: string;
  titulo: Texto;
  texto: Texto;
  icono: string;
  imagen: ImageMetadata | null;
  distancia: Texto | null;
}

export const actividades: Actividad[] = [
  {
    id: 'zona-arqueologica',
    icono: 'piramide',
    imagen: null,
    distancia: null,
    titulo: { es: 'Zona arqueológica de Tulum', en: 'Tulum archaeological site' },
    texto: {
      es: 'La única ciudad maya amurallada construida frente al mar. El Castillo se asoma al acantilado sobre una playa a la que se puede bajar.',
      en: 'The only walled Maya city built facing the sea. El Castillo looks out from the cliff over a beach you can walk down to.',
    },
  },
  {
    id: 'cenotes',
    icono: 'cenote',
    imagen: null,
    distancia: null,
    titulo: { es: 'Los cenotes', en: 'The cenotes' },
    texto: {
      es: 'Pozos de agua dulce abiertos en la roca, conectados bajo tierra por el sistema de cuevas inundadas más largo del mundo. Los hay de caverna y a cielo descubierto.',
      en: 'Freshwater sinkholes opened in the rock, linked underground by the longest flooded cave system in the world. Some are caverns, some are fully under the sky.',
    },
  },
  {
    id: 'sian-kaan',
    icono: 'manglar',
    imagen: null,
    distancia: null,
    titulo: { es: 'Reserva de Sian Ka’an', en: 'Sian Ka’an Reserve' },
    texto: {
      es: 'Patrimonio de la Humanidad de la UNESCO. Manglar, canales de agua salobre y la barrera de coral, empezando justo al sur por la misma carretera de Boca Paila.',
      en: 'A UNESCO World Heritage Site. Mangrove, brackish canals and the coral reef, starting just south along the same Boca Paila road.',
    },
  },
  {
    id: 'kaan-luum',
    icono: 'laguna',
    imagen: null,
    distancia: null,
    titulo: { es: 'Laguna Kaan Luum', en: 'Kaan Luum Lagoon' },
    texto: {
      es: 'Agua turquesa y poco profunda casi por completo, con un cenote hondo de color azul oscuro en el centro. El contraste se ve desde la orilla.',
      en: 'Turquoise water, shallow almost everywhere, with a deep dark-blue cenote at its centre. The contrast is visible from the shore.',
    },
  },
  {
    id: 'coba',
    icono: 'arbol',
    imagen: null,
    distancia: null,
    titulo: { es: 'Cobá', en: 'Cobá' },
    texto: {
      es: 'Una ciudad maya tierra adentro, dentro de la selva y junto a dos lagunas. Sus calzadas de piedra blanca —los sacbés— salían de aquí hacia todo el norte de la península.',
      en: 'A Maya city inland, inside the jungle and beside two lagoons. Its white stone causeways — the sacbés — ran from here across the whole northern peninsula.',
    },
  },
  {
    id: 'akumal',
    icono: 'tortuga',
    imagen: null,
    distancia: null,
    titulo: { es: 'Bahía de Akumal', en: 'Akumal Bay' },
    texto: {
      es: 'Una bahía poco profunda con praderas de pasto marino donde las tortugas verdes vienen a comer. El acceso está regulado y tiene temporada.',
      en: 'A shallow bay with seagrass meadows where green turtles come to feed. Access is regulated and there is a season.',
    },
  },
  {
    id: 'boca-paila',
    icono: 'bici',
    imagen: null,
    distancia: null,
    titulo: { es: 'La carretera de Boca Paila', en: 'The Boca Paila road' },
    texto: {
      es: 'La franja de arena entre el mar y la laguna, que es donde está el hotel. Se recorre entera en bicicleta, con la playa a un lado y la selva al otro.',
      en: 'The strip of sand between the sea and the lagoon, which is where the hotel sits. You can ride the whole of it by bicycle, beach on one side, jungle on the other.',
    },
  },
  {
    id: 'pueblo',
    icono: 'mercado',
    imagen: null,
    distancia: null,
    titulo: { es: 'El pueblo de Tulum', en: 'Tulum town' },
    texto: {
      es: 'Tierra adentro, al otro lado de la carretera federal, está el Tulum que vive todo el año: el mercado, las tortillerías y los precios de quien no está de paso.',
      en: 'Inland, across the federal highway, is the Tulum that lives here all year: the market, the tortillerías and the prices of people who are not passing through.',
    },
  },
];
