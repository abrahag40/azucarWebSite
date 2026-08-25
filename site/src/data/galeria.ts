/**
 * Galería general del hotel (H4.4).
 *
 * ── POR QUÉ ESTA GALERÍA NO REPITE LAS DE LAS FICHAS ────────────────────────
 * Cada tipo de alojamiento ya tiene su propia galería de cuatro fotos. Una
 * galería general que mostrara más habitaciones sería redundante: el huésped
 * que quiere ver habitaciones ya está en el catálogo.
 *
 * Ésta enseña **la propiedad**: la playa, el roof top, la alberca, los pasos
 * entre los edificios. Responde a una pregunta distinta —«¿cómo es el sitio?»—
 * y por eso existe.
 *
 * ── 🔴 SEGUNDA CURADURÍA: LA PRIMERA MIRÓ 10 FOTOS DE 244 ───────────────────
 * La versión original de este archivo decía haber revisado «las diez
 * fotografías de propiedad» y presumía de que ocho entraron. El dato que
 * faltaba: **eran diez de 244**. Nunca se abrió el grueso del archivo, y ahí
 * estaba lo bueno — el atardecer con los camastros, el arco de piedra hacia la
 * playa, la panorámica de la selva y el mar, la alberca de noche—. Ninguna de
 * esas cuatro se había visto siquiera.
 *
 * Lo notó Abraham de un vistazo: «las fotos son muy básicas y malas». Tenía
 * razón, y el defecto no era de criterio sino de **cobertura**: se eligió bien
 * dentro de una muestra minúscula que nadie había cuestionado.
 *
 * En esta segunda pasada se revisaron **las 102 del banco general** en hojas de
 * contacto. Tres de las ocho anteriores sobrevivieron —el arco, la escalera y
 * los camastros bajo palapa—; las otras cinco eran detalles de baño, un lavabo
 * o un rincón de vegetación, cosas que no venden un hotel frente al mar.
 *
 * ── CÓMO SE ORDENAN ─────────────────────────────────────────────────────────
 * No por tipo de espacio, sino por **fuerza visual descendente**: la primera es
 * la que decide si alguien sigue mirando. Se alterna día/noche y abierto/cerrado
 * para que la rejilla no se lea monótona.
 *
 * ── LA TRAMPA DE LA MINIATURA, QUE SIGUE VIGENTE ────────────────────────────
 * Una foto no se juzga en el visor: se juzga **en la miniatura**, que es el
 * tamaño al que la va a ver casi todo el mundo. Una panorámica de la alberca ya
 * se descartó por esto —funcionaba a lo grande, como hero, y en recorte cuadrado
 * quedaba en nada— y además resultó ser la MISMA imagen del hero de la portada,
 * byte a byte. Ambas comprobaciones se repitieron aquí: ninguna de las nueve
 * está ya en el sitio ni duplica a otra (verificado por hash, no a ojo).
 *
 * ── LOS TEXTOS ALTERNATIVOS ─────────────────────────────────────────────────
 * Describen lo que se ve, no lo que queremos vender. «Camastros de tejido bajo
 * una pérgola de madera, con el sol poniéndose» le sirve a quien no ve la foto;
 * «un atardecer de ensueño» no le sirve a nadie (WCAG 1.1.1).
 */
import type { ImageMetadata } from 'astro';
import type { Idioma } from '../i18n/ui';

import atardecer from '../assets/galeria/01-roof-top-atardecer.webp';
import arco from '../assets/galeria/02-arco-playa.webp';
import escalera from '../assets/galeria/03-escalera-mar.webp';
import panoramica from '../assets/galeria/04-vista-selva-mar.webp';
import camastros from '../assets/galeria/05-camastros-palapa.webp';
import alberca from '../assets/galeria/06-alberca-roof-top.webp';
import albercaNoche from '../assets/galeria/07-alberca-noche.webp';
import patio from '../assets/galeria/08-patio-arboles.webp';
import entrada from '../assets/galeria/09-entrada-piedra.webp';

type Texto = Record<Idioma, string>;

export const fotos: { imagen: ImageMetadata; alt: Texto }[] = [
  {
    imagen: atardecer,
    alt: {
      es: 'Camastros de tejido bajo una pérgola de madera en el roof top, con el sol poniéndose sobre la selva.',
      en: 'Woven sun loungers under a wooden pergola on the rooftop, with the sun setting over the jungle.',
    },
  },
  {
    imagen: arco,
    alt: {
      es: 'Arco de piedra entre palmeras, en la arena, con las sombrillas de la playa y el Caribe turquesa detrás.',
      en: 'A stone arch among palm trees on the sand, with the beach parasols and the turquoise Caribbean behind.',
    },
  },
  {
    imagen: escalera,
    alt: {
      es: 'Escalera de madera entre los edificios del hotel, sobre arena blanca, con palmeras y el mar al fondo.',
      en: 'A wooden staircase between the hotel buildings, over white sand, with palm trees and the sea beyond.',
    },
  },
  {
    imagen: panoramica,
    alt: {
      es: 'Vista desde lo alto: las palmas del jardín del hotel y, detrás, la franja azul del Caribe.',
      en: 'View from above: the palms of the hotel garden and, beyond them, the blue band of the Caribbean.',
    },
  },
  {
    imagen: camastros,
    alt: {
      es: 'Dos camastros de tejido en una terraza techada de palma, mirando a las palmeras y al mar.',
      en: 'Two woven loungers on a palm-thatched terrace, looking out to the palm trees and the sea.',
    },
  },
  {
    imagen: alberca,
    alt: {
      es: 'Alberca alargada del roof top, con muro de piedra caliza, duela de madera y camastros bajo la pérgola.',
      en: 'The long rooftop pool, with a limestone wall, timber decking and loungers under the pergola.',
    },
  },
  {
    imagen: albercaNoche,
    alt: {
      es: 'La alberca del roof top de noche, iluminada por dentro y por las luces empotradas en su muro.',
      en: 'The rooftop pool at night, lit from within and by the lights set into its wall.',
    },
  },
  {
    imagen: patio,
    alt: {
      es: 'Patio interior con árboles altos entre los balcones blancos del hotel.',
      en: 'Inner courtyard with tall trees between the hotel white balconies.',
    },
  },
  {
    imagen: entrada,
    alt: {
      es: 'Acceso de piedra caliza a la playa, con vegetación a los lados y una escalera de madera al fondo.',
      en: 'Limestone passage down to the beach, with greenery on both sides and a wooden staircase at the end.',
    },
  },
];
