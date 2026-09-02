/**
 * Políticas del hotel (H4.7).
 *
 * PROCEDENCIA. Arranca literal de `/politicas/` y `/en/policies/` del sitio
 * vigente, y el 2026-09-02 se AMPLÍA con el texto que envió la gerente del
 * hotel. Lo que llegó nuevo —y no estaba en el sitio viejo— son tres bloques
 * enteros: el uso de albercas y jacuzzi, las normas sobre fumar y sobre entrar
 * alimentos, y los CARGOS concretos por toallas y por daños.
 *
 * Esos cargos son la razón de que este archivo importe: 150 USD por una toalla
 * y el costo de la reparación más 250 USD por un desperfecto son cifras que un
 * huésped puede discutir, y un hotel sólo las puede cobrar si estaban
 * publicadas antes de la estancia. Publicarlas protege a las dos partes.
 *
 * Se corrigen ortografía y puntuación —«hábiles», «políticas», «PM» duplicado en
 * «15:00PM»— y se agrupan por tema, porque el original es una lista plana de
 * dieciséis frases en la que el huésped no encuentra lo que busca.
 *
 * NO se cambia ninguna condición. Un texto de políticas es la base de una
 * disputa con un huésped: reescribir su sentido no es trabajo de diseño, es
 * asumir una responsabilidad que no nos corresponde. Si alguna condición debe
 * cambiar, lo decide el hotel y se refleja después.
 *
 * ⚠️ Hay una frase del original que se traslada tal cual pese a estar mal
 * redactada, y conviene que el cliente la revise: «no reservamos el derecho de
 * no aceptar la reservación» dice, literalmente, lo contrario de lo que
 * pretende. Ver la nota en el grupo de identificación.
 */
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;
export interface GrupoPoliticas {
  titulo: Texto;
  puntos: Texto[];
  /**
   * Identificador estable para citar un grupo desde otra página.
   *
   * La ficha de cada tipo de alojamiento muestra los horarios de entrada y
   * salida, porque es donde el huésped decide y no debería tener que irse a
   * otra página a averiguarlo —es lo que hace la plantilla en `room-details`—.
   * Referenciarlo **por clave y no por posición**: reordenar los grupos es algo
   * que va a pasar, y con un índice la ficha empezaría a mostrar la política de
   * estacionamiento sin que nada fallara.
   */
  clave?: string;
}

export const politicas: GrupoPoliticas[] = [
  {
    titulo: { es: 'Pago y vigencia de la tarifa', en: 'Payment and rate validity' },
    puntos: [
      { es: 'Toda reservación debe pagarse en su totalidad en el momento de realizarla.',
        en: 'All reservations must be paid in full at the time of booking.' },
      { es: 'La tarifa ofertada tiene una vigencia de 24 horas.',
        en: 'The rate offered is valid for 24 hours only.' },
    ],
  },
  {
    titulo: { es: 'Identificación del huésped', en: 'Guest identification' },
    puntos: [
      { es: 'Para reservar hay que enviar fotografía completa de la identificación: INE para viajeros mexicanos y pasaporte para viajeros extranjeros.',
        en: 'To book, a full photo of your ID is required: INE for Mexican travellers and a passport for international travellers.' },
      { es: 'El mismo documento debe presentarse físicamente al hacer el check-in.',
        en: 'The same document must be presented in person at check-in.' },
      { es: 'Si la identificación no coincide con la del huésped principal, el hotel se reserva el derecho de no aceptar la reservación, aunque ya esté pagada.',
        en: 'If the identification does not match the primary guest, the hotel reserves the right to refuse the reservation, even if it has already been paid.' },
    ],
  },
  {
    clave: 'horarios',
    titulo: { es: 'Check-in y check-out', en: 'Check-in and check-out' },
    puntos: [
      { es: 'Check-in a partir de las 15:00. Check-out hasta las 12:00.',
        en: 'Check-in from 3:00 pm. Check-out by 12:00 noon.' },
      { es: 'Hay una tolerancia de 30 minutos en el check-out antes de que se generen cargos.',
        en: 'There is a 30-minute grace period at check-out before additional charges apply.' },
      { es: 'Salida tardía hasta las 14:00: se cobra el 50 % de la tarifa de la habitación del día.',
        en: 'Late check-out until 2:00 pm: 50 % of that day’s room rate applies.' },
      { es: 'Después de las 14:00 se cobra el importe completo de una noche, a la tarifa del día.',
        en: 'After 2:00 pm, the full amount of one night is charged at that day’s rate.' },
    ],
  },
  {
    titulo: { es: 'Cambios y cancelaciones', en: 'Changes and cancellations' },
    puntos: [
      { es: 'No hay devoluciones ni cancelaciones si el huésped no se presenta al check-in.',
        en: 'There are no refunds or cancellations if the guest does not show up for check-in.' },
      { es: 'Un cambio de fecha requiere avisar con 16 días hábiles de anticipación, y queda sujeto a disponibilidad y a cambio de tarifa.',
        en: 'A date change requires 16 business days’ notice, and is subject to availability and to a rate change.' },
      { es: 'Si al cambiar las fechas la tarifa resulta menor, no hay reembolso de la diferencia.',
        en: 'If the rate is lower after a date change, the difference is not refunded.' },
      { es: 'No hay reembolso ni cambio de fechas por condiciones climáticas, huracanes, cambios de vuelo, desastres naturales, enfermedad o motivos personales.',
        en: 'There are no refunds or date changes due to weather, hurricanes, flight changes, natural disasters, illness or personal reasons.' },
    ],
  },
  {
    titulo: { es: 'Convivencia y responsabilidad', en: 'Conduct and liability' },
    puntos: [
      { es: 'Cualquier comportamiento impropio con el personal, o que moleste a otros huéspedes, es motivo para pedir que se abandone el hotel sin reembolso. En casos extremos se llamará a la policía.',
        en: 'Any inappropriate behaviour towards staff, or that disturbs other guests, is grounds for being asked to leave without a refund. In extreme cases the police will be called.' },
      { es: 'El hotel se reserva el derecho de pedir que se abandone el sitio si no se respetan las políticas y reglamentos.',
        en: 'The hotel reserves the right to ask guests to leave if the policies and regulations are not respected.' },
      { es: 'El hotel no se hace responsable por accidentes, robos o extravío de pertenencias, ni por daños a terceros.',
        en: 'The hotel is not responsible for accidents, theft or loss of belongings, or for damage to third parties.' },
    ],
  },
  {
    /* NUEVO — texto de la gerencia, 2026-09-02. No estaba en el sitio vigente.
       El jacuzzi de «Selvamar» sólo para mayores de 18 es la clase de condición
       que un huésped con hijos necesita saber ANTES de reservar, no al llegar. */
    clave: 'albercas',
    titulo: { es: 'Albercas y jacuzzi', en: 'Pools and jacuzzi' },
    puntos: [
      { es: 'La alberca frente al mar puede usarla todo el mundo: niños, jóvenes y adultos.',
        en: 'The oceanfront pool is open to everyone: children, young people and adults.' },
      { es: 'El jacuzzi del roof top «Selvamar» es de uso exclusivo para mayores de 18 años.',
        en: 'The jacuzzi on the “Selvamar” rooftop is for guests aged 18 and over only.' },
      { es: 'No se permite entrar alimentos ni bebidas de ningún tipo a las albercas ni a los jacuzzis.',
        en: 'No food or drinks of any kind are allowed in the pools or jacuzzis.' },
    ],
  },
  {
    /* NUEVO — texto de la gerencia, 2026-09-02. */
    titulo: { es: 'Normas de la casa', en: 'House rules' },
    puntos: [
      { es: 'No se permite fumar en áreas cerradas —habitaciones o áreas comunes techadas— ni dentro de una alberca o de un jacuzzi.',
        en: 'Smoking is not permitted in enclosed areas — rooms or roofed common areas — nor inside a pool or jacuzzi.' },
      { es: 'No se permite introducir alimentos ni bebidas de fuera del hotel a la playa, al restaurante ni a las áreas comunes.',
        en: 'Outside food and drinks may not be brought onto the beach, into the restaurant or into the hotel’s common areas.' },
    ],
  },
  {
    /* NUEVO — texto de la gerencia, 2026-09-02. Son las únicas CIFRAS de todo
       el sitio, y están aquí a propósito: un cargo que el huésped no pudo leer
       antes de llegar es un cargo difícil de sostener. */
    titulo: { es: 'Cargos por pérdida o daño', en: 'Charges for loss or damage' },
    puntos: [
      { es: 'Toalla perdida o que salga del hotel: 150 USD.',
        en: 'Towel lost or taken from the hotel: USD 150.' },
      { es: 'Daño a la propiedad: el costo de la reparación más 250 USD.',
        en: 'Damage to the property: the cost of the repair plus USD 250.' },
    ],
  },
  {
    titulo: { es: 'Estacionamiento', en: 'Parking' },
    puntos: [
      { es: 'El estacionamiento es gratuito y está sujeto a disponibilidad.',
        en: 'Parking is free and subject to availability.' },
    ],
  },
];
