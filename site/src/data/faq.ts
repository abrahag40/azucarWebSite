/**
 * Preguntas frecuentes (H4.7).
 *
 * PROCEDENCIA. Literal de `/preguntas-frecuentes/` y `/en/frequent-questions/`
 * del sitio vigente. Ni una respuesta redactada por nosotros: es contenido que
 * el hotel ya publica en los dos idiomas, así que ya está aprobado y traducido.
 *
 * Se corrige sólo ortografía y puntuación —«Si» por «Sí» donde es adverbio,
 * tildes ausentes— porque no cambian lo que dice, y publicar faltas de un
 * original no es fidelidad, es descuido.
 *
 * ⚠️ RETIRADA la pregunta «¿Tienen restaurante o bar?», que en el sitio vigente
 * se responde con un «por ahora no tenemos». Decisión de Abraham como Proxy PO
 * (2026-08-25): el hotel SÍ tiene restaurante y esa respuesta del sitio viejo
 * está desactualizada. Con eso se cierra la contradicción C0 en la dirección
 * contraria a la que se había supuesto — ver `src/data/restaurante.ts`.
 *
 * Se retira en vez de reescribirse porque la respuesta correcta —horario, si
 * está abierto al público, qué se sirve— no la tenemos todavía. Una pregunta
 * frecuente sin respuesta buena es peor que ninguna; la carta de
 * `/restaurante/` la responde mejor.
 */
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;
export interface Pregunta {
  p: Texto;
  r: Texto;
  /** Identificador estable para citar una respuesta desde otra página. Ver la
   *  nota equivalente en `politicas.ts`: por clave, nunca por posición. */
  clave?: string;
}

export const faq: Pregunta[] = [
  {
    p: { es: '¿Están ubicados a orilla de playa?', en: 'Are you located on the beach?' },
    r: { es: 'Sí. El hotel está a pie de playa, en la zona hotelera de Tulum.',
         en: 'Yes. The hotel sits right on the beach, in the Tulum hotel zone.' },
  },
  {
    p: { es: '¿Tienen camastros, sombrillas o camas en la playa?',
         en: 'Do you have sun loungers, umbrellas or beds on the beach?' },
    r: { es: 'Sí, contamos con todo esto para que disfrutes tu estancia en nuestro mar.',
         en: 'Yes, we have all of it so you can enjoy your stay by our sea.' },
  },
  {
    p: { es: '¿Su playa tiene rocas?', en: 'Does your beach have rocks?' },
    r: { es: '¡No! Nuestra playa tiene las arenas más blancas y suaves de Tulum.',
         en: 'No! Our beach has the whitest and softest sand in Tulum.' },
  },
  {
    p: { es: '¿Proporcionan toallas de playa?', en: 'Do you provide beach towels?' },
    r: { es: 'Sí.', en: 'Yes.' },
  },
  {
    p: { es: '¿Incluyen desayuno?', en: 'Is breakfast included?' },
    /* ⚠️ Texto del cliente (2026-09-11). Deja de mencionar la cortesía de
       fruta, café y pan de la mañana, que SIGUE anunciada como amenidad en
       `hotel.ts` y en `/servicios/`. No es contradicción —una cosa es que el
       desayuno no esté incluido y otra que haya cortesía— pero el huésped ya no
       se entera por aquí. Se anota por si se quiere recuperar. */
    r: { es: 'No, sin embargo tenemos un exquisito y amplio menú para todo paladar.',
         en: 'No, but we have a delicious and extensive menu for every palate.' },
  },
  {
    p: { es: '¿Rentan bicicletas?', en: 'Do you rent bicycles?' },
    r: { es: 'Por el momento no, aunque lo haremos pronto. A pocos metros del hotel hay un lugar de alquiler de bicicletas.',
         en: 'Not for the moment, though we will soon. There is a bike rental place a few metres from the hotel.' },
  },
  {
    p: { es: '¿Hay electricidad?', en: 'Is there electricity?' },
    /* ⚠️ Texto del cliente (2026-09-11). La respuesta anterior explicaba que el
       hotel genera su propia electricidad y pedía moderar los aparatos de
       consumo alto. Esa petición ya no se hace en ningún sitio del sitio. */
    r: { es: 'Sí, las 24 horas.', en: 'Yes, 24 hours a day.' },
  },
  {
    p: { es: '¿Tienen Wi-Fi?', en: 'Do you have Wi-Fi?' },
    r: { es: 'Sí, de alta velocidad en las habitaciones, áreas comunes y todo el hotel.',
         en: 'Yes, high-speed in the rooms, the common areas and throughout the hotel.' },
  },
  {
    p: { es: '¿Tienen estacionamiento?', en: 'Do you have parking?' },
    r: { es: 'Sí, gratuito y sujeto a disponibilidad.', en: 'Yes, free and subject to availability.' },
  },
  {
    p: { es: '¿Todas las habitaciones tienen aire acondicionado?', en: 'Do all rooms have air conditioning?' },
    r: { es: 'Sí. Todas las habitaciones y bungalows tienen aire acondicionado y ventilador de techo.',
         en: 'Yes. Every room and bungalow has air conditioning and a ceiling fan.' },
  },
  {
    /* 🔴 CONTRADICE al 2026-09-03, y gana ésta por ser posterior. Aquel día el
       cliente dijo «Smart TV sólo en Mar y Cielo» y así se escribieron las diez
       fichas; hoy dice Mar, Cielo, Agua y Arrecife. Se añadió también a las
       listas de «Incluye» de Agua y Arrecife, porque si no el sitio diría dos
       cosas distintas sobre lo mismo en dos páginas. */
    p: { es: '¿Hay TV en las habitaciones?', en: 'Is there a TV in the rooms?' },
    r: { es: 'Solamente contamos con Smart TV en los bungalows Mar, Cielo, Agua y Arrecife.',
         en: 'We only have a Smart TV in the Mar, Cielo, Agua and Arrecife bungalows.' },
  },
  {
    p: { es: '¿Tienen cunas o camas extra?', en: 'Do you have cots or extra beds?' },
    r: { es: 'Sí, contamos con una sujeta a disponibilidad, sin que genere un cargo adicional a tu reservación.',
         en: 'Yes, we have one subject to availability, at no additional charge to your booking.' },
  },
  {
    p: { es: '¿Cuentan con restaurante y bar?', en: 'Do you have a restaurant and bar?' },
    r: { es: 'Sí, tenemos restaurante y bar frente al mar.',
         en: 'Yes, we have a restaurant and bar facing the sea.' },
  },
  {
    p: { es: '¿El hotel cuenta con seguridad?', en: 'Does the hotel have security?' },
    r: { es: 'Sí, tenemos guardias las 24 horas, además de contar con caja de seguridad en cada habitación.',
         en: 'Yes, we have guards 24 hours a day, and every room has a safety box.' },
  },
  {
      clave: 'mascotas',
    p: { es: '¿Aceptan mascotas?', en: 'Do you accept pets?' },
    r: { es: 'Amamos las mascotas, pero por el momento no podemos recibirlas.',
         en: 'We love pets, but we cannot welcome them for the time being.' },
  },
  {
      clave: 'menores',
    p: { es: '¿Aceptan niños?', en: 'Do you accept children?' },
    r: { es: 'Sí, nos encanta tener familias felices disfrutando de Azucar Hotel Tulum.',
         en: 'Yes — we love having happy families enjoying Azucar Hotel Tulum.' },
  },
  {
    p: { es: '¿Tienen alberca o jacuzzi?', en: 'Do you have a pool or a jacuzzi?' },
    r: { es: 'Los dos: alberca infinita frente al mar, y un jacuzzi grande con camastros y hamacas en el roof top «Selvamar», con vista al mar y a la selva. Si deseas tu jacuzzi privado, entonces la mejor opción para ti son los Bungalows.',
         en: 'Both: an infinity pool facing the sea, and a large jacuzzi with loungers and hammocks on the “Selvamar” rooftop, overlooking the sea and the jungle. If you would like your own private jacuzzi, then the Bungalows are your best option.' },
  },
  {
      clave: 'llegadaTarde',
    p: { es: '¿Puedo llegar después de las 15:00, que es la hora de check-in?', en: 'Can I arrive after 3:00 pm, the check-in time?' },
    r: { es: 'Sí, a cualquier hora. Sólo te pedimos avisarnos para esperarte.',
         en: 'Yes, at any time. We only ask that you let us know so we can expect you.' },
  },
  {
    p: { es: '¿Habrá alguien para recibirme?', en: 'Will someone be there to receive me?' },
    r: { es: 'Por supuesto. La recepción atiende las 24 horas.',
         en: 'Of course. Reception is staffed 24 hours a day.' },
  },
];
