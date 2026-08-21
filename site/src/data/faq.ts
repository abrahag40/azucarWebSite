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
 * ⚠️ La pregunta del restaurante es la que destapó la contradicción del
 * contenido del cliente. Ver C0 en `docs/02-requerimientos/preguntas-cliente.md`.
 * Se publica tal cual porque es la fuente MÁS específica y reciente que existe,
 * y porque decir «no hay restaurante» y que lo haya es un problema mucho menor
 * que lo contrario.
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
    p: { es: '¿Tienen camastros o camas de playa?', en: 'Do you have sun loungers or beach beds?' },
    r: { es: 'Sí, y su uso está incluido para huéspedes.',
         en: 'Yes, and they are included for hotel guests.' },
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
    p: { es: '¿Tienen restaurante o bar?', en: 'Do you have a restaurant or bar?' },
    r: { es: 'Por ahora no tenemos servicio de restaurante ni bar. A un lado y en toda la zona de alrededor, a muy pocos minutos caminando, están los mejores restaurantes, bares, boutiques y minimercados de la playa.',
         en: 'We do not have restaurant or bar service for now. Right next door and all around the area, a very short walk away, you will find the best restaurants, bars, boutiques and mini-markets on the beach.' },
  },
  {
    p: { es: '¿Incluyen desayuno?', en: 'Is breakfast included?' },
    r: { es: 'No, pero cada mañana ofrecemos una cortesía de fruta, café y pan en el área de snack, entre las habitaciones. No es un alimento completo, pero sí algo muy bueno para empezar el día.',
         en: 'No, but every morning we offer a courtesy of fruit, coffee and bread in the snack area between the rooms. It is not a full meal, but it is a good way to start the day.' },
  },
  {
    p: { es: '¿Rentan bicicletas?', en: 'Do you rent bicycles?' },
    r: { es: 'Por el momento no, aunque lo haremos pronto. A pocos metros del hotel hay un lugar de alquiler de bicicletas.',
         en: 'Not for the moment, though we will soon. There is a bike rental place a few metres from the hotel.' },
  },
  {
    p: { es: '¿Hay electricidad?', en: 'Is there electricity?' },
    r: { es: 'Sí, las 24 horas. La producimos nosotros mismos, así que sólo pedimos no usar durante mucho tiempo aparatos de consumo alto, para contribuir con la ecología.',
         en: 'Yes, 24 hours a day. We generate our own power, so we only ask that you avoid using high-consumption appliances for long stretches, to help the environment.' },
  },
  {
    p: { es: '¿Tienen Wi-Fi?', en: 'Do you have Wi-Fi?' },
    r: { es: 'Sí, y es gratuito. En toda la zona de playa la señal es algo lenta, pero el servicio está disponible.',
         en: 'Yes, and it is free. The signal is a little slow across the whole beach area, but the service is available.' },
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
      clave: 'mascotas',
    p: { es: '¿Aceptan mascotas?', en: 'Do you accept pets?' },
    r: { es: 'Amamos las mascotas, pero por ahora no podemos recibirlas: no todos los huéspedes se sienten cómodos con animales.',
         en: 'We love pets, but we cannot host them for now: not every guest is comfortable around animals.' },
  },
  {
      clave: 'menores',
    p: { es: '¿Aceptan niños?', en: 'Do you accept children?' },
    r: { es: 'Sí.', en: 'Yes.' },
  },
  {
    p: { es: '¿Tienen alberca o jacuzzi?', en: 'Do you have a pool or a jacuzzi?' },
    r: { es: 'Los dos: alberca infinita frente al mar, y un jacuzzi grande con camastros y hamacas en el roof top «Selvamar», con vista al mar y a la selva.',
         en: 'Both: an infinity pool facing the sea, and a large jacuzzi with loungers and hammocks on the “Selvamar” rooftop, overlooking the sea and the jungle.' },
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
