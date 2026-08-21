/**
 * Galería general del hotel (H4.4).
 *
 * ── POR QUÉ ESTA GALERÍA NO REPITE LAS DE LAS FICHAS ────────────────────────
 * Cada tipo de alojamiento ya tiene su propia galería de cuatro fotos. Una
 * galería general que mostrara más habitaciones sería redundante: el huésped
 * que quiere ver habitaciones ya está en el catálogo.
 *
 * Ésta enseña **la propiedad**: la playa, el roof top, la fachada, el jardín.
 * Responde a una pregunta distinta —«¿cómo es el sitio?»— y por eso existe.
 *
 * ── SOBRE LA CURADURÍA, Y UN DATO PARA ABRAHAM ──────────────────────────────
 * De las diez fotografías de propiedad que se revisaron una por una, **ocho
 * entraron y dos se descartaron**: un recorte bajo de un borde de terraza,
 * ilegible fuera de contexto, y dos tomas dominadas por una columna de piedra a
 * mediodía. El archivo del hotel tiene 244 imágenes y es **desigual**: hay
 * material excelente y material que no se puede publicar, mezclados.
 *
 * Ocho fotos bien elegidas valen más que veinte sin elegir. Si en algún momento
 * se quiere ampliar, hay que revisarlas de nuevo una a una: no hay atajo, y
 * ordenar por tamaño de archivo —que es lo que se probó primero— no predice si
 * una foto es buena.
 *
 * ── UNA NOVENA DESCARTADA, YA PUESTA EN LA REJILLA ──────────────────────────
 * La panorámica de la alberca del roof top entró, se vio en la miniatura y
 * salió. Dos motivos, y ninguno se veía mirando la foto entera:
 *   1. Es la MISMA imagen del hero de la portada, byte a byte. Se descubrió
 *      porque Vite deduplica por hash y el enlace apuntaba al otro archivo.
 *   2. Es una toma ancha con mucha duela vacía: la alberca es una franja
 *      delgada que el recorte cuadrado deja en nada. Funciona a lo grande,
 *      como hero; no funciona pequeña.
 * Lección: una foto no se juzga en el visor, se juzga **en la miniatura**, que
 * es el tamaño al que la va a ver casi todo el mundo.
 *
 * ── LOS TEXTOS ALTERNATIVOS ─────────────────────────────────────────────────
 * Describen lo que se ve, no lo que queremos vender. «Terraza con hamaca y dos
 * sillas de madera frente al mar» le sirve a quien no ve la foto; «un rincón de
 * ensueño» no le sirve a nadie (WCAG 1.1.1).
 */
import type { ImageMetadata } from 'astro';
import type { Idioma } from '../i18n/ui';

import roofTop from '../assets/galeria/01-roof-top-terraza.webp';
import playa from '../assets/galeria/02-playa-arco.webp';
import terraza from '../assets/galeria/03-terraza-hamaca.webp';
import jacuzzi from '../assets/galeria/04-jacuzzi-roof-top.webp';
import vista from '../assets/galeria/05-vista-desde-habitacion.webp';
import fachada from '../assets/galeria/06-fachada.webp';
import jardin from '../assets/galeria/07-jardin.webp';
import lavabo from '../assets/galeria/08-lavabo-piedra.webp';

type Texto = Record<Idioma, string>;

export const fotos: { imagen: ImageMetadata; alt: Texto }[] = [
  {
    imagen: roofTop,
    alt: {
      es: 'Paso del roof top entre un lavabo de piedra y una pérgola de madera, con duela, jardinera y el mar al fondo.',
      en: 'Rooftop walkway between a stone basin and a wooden pergola, with timber decking, a planter and the sea beyond.',
    },
  },
  {
    imagen: playa,
    alt: {
      es: 'Paso de arena blanca entre los edificios del hotel, con palmeras, un arco de piedra y el mar al fondo.',
      en: 'A white-sand path between the hotel buildings, with palm trees, a stone arch and the sea at the end.',
    },
  },
  {
    imagen: terraza,
    alt: {
      es: 'Terraza techada de palma con hamaca y dos sillas de madera, mirando a la alberca y al Caribe.',
      en: 'Palm-thatched terrace with a hammock and two wooden chairs, looking out over the pool and the Caribbean.',
    },
  },
  {
    imagen: jacuzzi,
    alt: {
      es: 'Jacuzzi de piedra bajo una pérgola de madera, con la vegetación de la selva asomando por encima del muro.',
      en: 'Stone jacuzzi under a wooden pergola, with jungle greenery rising above the wall.',
    },
  },
  {
    imagen: vista,
    alt: {
      es: 'Vista desde el interior de una habitación hacia el balcón: cortinas, dos sillas de lona, palmeras y el mar.',
      en: 'View from inside a room out to the balcony: curtains, two canvas chairs, palm trees and the sea.',
    },
  },
  {
    imagen: fachada,
    alt: {
      es: 'Fachada del hotel desde la calle, con balcones blancos entre los árboles y locales de tiendas en la planta baja.',
      en: 'The hotel façade from the street, with white balconies among the trees and shop units at ground level.',
    },
  },
  {
    imagen: jardin,
    alt: {
      es: 'Rincón del jardín entre dos columnas de piedra caliza, con palmas y una flor roja de heliconia.',
      en: 'A corner of the garden between two limestone columns, with palms and a red heliconia flower.',
    },
  },
  {
    imagen: lavabo,
    alt: {
      es: 'Lavabo exterior de piedra sobre una base de madera curva, junto a una celosía de troncos y el cielo azul.',
      en: 'Outdoor stone basin on a curved wooden base, beside a lattice of timber poles and blue sky.',
    },
  },
];
