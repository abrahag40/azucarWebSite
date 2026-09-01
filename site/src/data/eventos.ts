/**
 * Eventos y celebraciones.
 *
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  ⚠️  TODO ESTE ARCHIVO ES CONTENIDO DE EJEMPLO                            ║
 * ║                                                                          ║
 * ║  El cliente pidió el apartado «Eventos» en el menú el 2026-09-01, con dos ║
 * ║  hijos: «Solicitud de información» y «Visita guiada». No dijo qué tipo de ║
 * ║  eventos hace el hotel, ni para cuánta gente, ni en qué espacios.         ║
 * ║                                                                          ║
 * ║  El sitio vigente no menciona eventos en ninguna de sus 26 páginas. Así   ║
 * ║  que lo de abajo es un relleno plausible para un hotel boutique de playa  ║
 * ║  de 21 unidades: da forma a la página y deja el trabajo en cambiar        ║
 * ║  textos, no en escribir componentes.                                     ║
 * ║                                                                          ║
 * ║  🔴 NO HAY NI UNA CIFRA: ni precios, ni capacidad máxima, ni mínimo de    ║
 * ║  noches. Inventar «hasta 80 personas» es prometer un aforo que nadie ha   ║
 * ║  medido, y un aforo equivocado en una boda no se arregla con una          ║
 * ║  disculpa. Lo mismo que la regla 2 hace con la disponibilidad.            ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ── CÓMO EDITAR ────────────────────────────────────────────────────────────
 * `tipos` son las tarjetas de arriba: título y una línea. Añadir o quitar es
 * copiar o borrar un bloque `{ … },` entero.
 *
 * Los dos bloques de abajo —`informacion` y `visitaGuiada`— son los que enlaza
 * el menú. Sus `id` salen de `anclas` en `src/i18n/ui.ts`, no de aquí: son
 * palabras comunes y se traducen.
 */
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;

export const eventos: {
  entrada: Texto;
  tipos: { titulo: Texto; texto: Texto }[];
  informacion: { titulo: Texto; parrafos: Texto[] };
  visitaGuiada: { titulo: Texto; parrafos: Texto[] };
} = {
  entrada: {
    es: 'Somos un hotel pequeño, y eso es exactamente lo que lo hace posible: en una celebración aquí no se comparte la playa con nadie más.',
    en: 'We are a small hotel, and that is precisely what makes it possible: at a celebration here you share the beach with no one else.',
  },
  tipos: [
    {
      titulo: { es: 'Bodas en la playa', en: 'Beach weddings' },
      texto: {
        es: 'Ceremonia sobre la arena, con el mar de fondo y el hotel entero para los invitados.',
        en: 'A ceremony on the sand, the sea behind, and the whole hotel for your guests.',
      },
    },
    {
      titulo: { es: 'Celebraciones privadas', en: 'Private celebrations' },
      texto: {
        es: 'Cumpleaños, aniversarios y cenas de grupo en el roof top o a pie de alberca.',
        en: 'Birthdays, anniversaries and group dinners on the rooftop or by the pool.',
      },
    },
    {
      titulo: { es: 'Retiros y grupos', en: 'Retreats and groups' },
      texto: {
        es: 'Yoga, formación o descanso de equipo, con el hotel reservado en exclusiva.',
        en: 'Yoga, training or a team break, with the hotel booked exclusively.',
      },
    },
    {
      titulo: { es: 'Sesiones de fotografía', en: 'Photo shoots' },
      texto: {
        es: 'La playa privada, los jardines y los dos roof tops, fuera del horario de huéspedes.',
        en: 'The private beach, the gardens and both rooftops, outside guest hours.',
      },
    },
  ],
  informacion: {
    titulo: { es: 'Solicitud de información', en: 'Information request' },
    parrafos: [
      {
        es: 'Cuéntanos qué tienes en mente —la fecha aproximada, cuánta gente y qué tipo de celebración— y te respondemos con las opciones y el presupuesto, impuestos incluidos.',
        en: 'Tell us what you have in mind — the approximate date, how many people and what kind of celebration — and we will reply with the options and the quote, taxes included.',
      },
      {
        es: 'Cada evento se cotiza aparte porque cada uno ocupa el hotel de una forma distinta. No hay paquetes cerrados y no publicamos precios que después haya que corregir.',
        en: 'Every event is quoted separately because each one uses the hotel differently. There are no fixed packages, and we do not publish prices that would later need correcting.',
      },
    ],
  },
  visitaGuiada: {
    titulo: { es: 'Visita guiada', en: 'Guided visit' },
    parrafos: [
      {
        es: 'Antes de decidir, ven a verlo. Recorremos contigo la playa, los jardines, el roof top SelvaMar y los espacios donde se montaría tu evento.',
        en: 'Before you decide, come and see it. We will walk you through the beach, the gardens, the SelvaMar rooftop and the spaces where your event would be set up.',
      },
      {
        es: 'Se agenda con antelación y dura alrededor de una hora. Si no puedes venir a Tulum, la hacemos por videollamada.',
        en: 'It is booked in advance and takes about an hour. If you cannot come to Tulum, we do it by video call.',
      },
    ],
  },
};
