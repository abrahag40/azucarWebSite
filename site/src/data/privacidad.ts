/**
 * Aviso de privacidad (H4.8, parcial).
 *
 * PROCEDENCIA. Traslado fiel de `/politica-de-privacidad/` del sitio vigente,
 * vigente «a partir del 01 de enero de 2022». Se agrupa por apartados y se
 * corrige puntuación; NO se cambia ninguna afirmación. Un texto legal es la base
 * de una reclamación: reescribir su sentido no es trabajo de diseño.
 *
 * ⚠️ TRES COSAS QUE HAY QUE DECIR EN VOZ ALTA
 *
 * 1. La versión inglesa del sitio vigente NO ESTÁ TRADUCIDA: `/en/privacy-policy/`
 *    sirve el mismo texto en español. Aquí sí se traduce, porque servir un aviso
 *    legal en un idioma que el usuario no eligió equivale a no dárselo.
 *
 * 2. ESTE TEXTO NO ES UN AVISO DE PRIVACIDAD COMPLETO conforme a la LFPDPPP.
 *    Es una plantilla genérica de política de privacidad. Le faltan, al menos:
 *      · Identidad y domicilio del responsable
 *      · Los derechos ARCO nombrados —acceso, rectificación, cancelación,
 *        oposición— y el procedimiento para ejercerlos
 *      · El mecanismo para revocar el consentimiento
 *      · La distinción entre finalidades primarias y secundarias, y cómo
 *        oponerse a las segundas
 *    Se publica porque es mejor que no tener nada y porque arregla un enlace
 *    roto, NO porque cumpla. Redactar un aviso conforme requiere abogado, y es
 *    la pregunta E-PRIV del banco del cliente.
 *
 * 3. EL SITIO NO RECOGE HOY NINGÚN DATO PERSONAL. No hay formulario: llega en el
 *    sprint 3. Ese es el plazo real — **el aviso conforme es requisito de entrada
 *    del sprint 3**, porque es cuando empezamos a tratar datos.
 *
 * Nota menor pero material: el original remite a `info@azucarhotel.com`, y el
 * resto del sitio usa `contacto@azucarhotel.com`. Se conserva el del original
 * —es la dirección legalmente señalada— y se traslada la discrepancia al
 * cliente. Cambiar por nuestra cuenta la dirección donde alguien ejerce sus
 * derechos sería peor que la incoherencia.
 */
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;
export interface Apartado { titulo: Texto; parrafos: Texto[]; lista?: Texto[] }

export const vigenciaDesde = '2022-01-01';
export const correoDerechos = 'info@azucarhotel.com';

export const avisoPrivacidad: Apartado[] = [
  {
    titulo: { es: 'Alcance', en: 'Scope' },
    parrafos: [
      { es: 'Este aviso establece la manera en que azucarhotel.com usa y protege cualquier información personal que usted proporcione al utilizar este sitio web.',
        en: 'This notice sets out how azucarhotel.com uses and protects any personal information you provide when using this website.' },
      { es: 'La información personal que proporcione sólo se utilizará de acuerdo con esta declaración. Podemos cambiar este aviso de vez en cuando; conviene visitar esta página para comprobar que sigue conforme con los cambios.',
        en: 'Any personal information you provide will only be used in accordance with this statement. We may update this notice from time to time; please revisit this page to make sure you remain comfortable with any changes.' },
    ],
  },
  {
    titulo: { es: 'Qué información recopilamos', en: 'What information we collect' },
    parrafos: [
      { es: 'Podemos recopilar la siguiente información:', en: 'We may collect the following information:' },
    ],
    lista: [
      { es: 'Nombre y apellidos.', en: 'First name and surname.' },
      { es: 'Datos de contacto, incluidos dirección de correo electrónico y teléfono.', en: 'Contact details, including email address and telephone number.' },
      { es: 'Otra información pertinente recopilada a través de nuestro formulario de contacto.', en: 'Other relevant information collected through our contact form.' },
    ],
  },
  {
    titulo: { es: 'Para qué la usamos', en: 'What we use it for' },
    parrafos: [
      { es: 'Necesitamos esta información para entender sus necesidades y ofrecerle un mejor servicio, en particular por las siguientes razones:',
        en: 'We need this information to understand your needs and provide you with a better service, in particular for the following reasons:' },
    ],
    lista: [
      { es: 'Registro interno.', en: 'Internal record keeping.' },
      { es: 'Mejorar nuestros productos y servicios.', en: 'Improving our products and services.' },
      { es: 'Enviarle por correo electrónico información sobre novedades, ofertas especiales u otra información que consideremos de su interés.', en: 'Sending you email about news, special offers or other information we believe may interest you.' },
      { es: 'Comunicarnos con usted con fines de investigación de mercado, por correo electrónico o teléfono.', en: 'Contacting you for market research purposes, by email or telephone.' },
      { es: 'Personalizar el sitio web de acuerdo con sus intereses.', en: 'Tailoring the website according to your interests.' },
    ],
  },
  {
    titulo: { es: 'Seguridad', en: 'Security' },
    parrafos: [
      { es: 'Estamos comprometidos con la seguridad de su información. Para evitar el acceso no autorizado o su divulgación, hemos puesto en marcha procedimientos físicos, electrónicos y administrativos para salvaguardar la información que recopilamos en línea.',
        en: 'We are committed to keeping your information secure. To prevent unauthorised access or disclosure, we have put in place physical, electronic and administrative procedures to safeguard the information we collect online.' },
    ],
  },
  {
    titulo: { es: 'Enlaces a otros sitios', en: 'Links to other websites' },
    parrafos: [
      { es: 'Nuestro sitio puede contener enlaces a otros sitios de interés. Una vez que utilice esos enlaces para salir del nuestro, no tenemos control sobre el sitio de destino, por lo que no podemos responsabilizarnos de la protección ni de la privacidad de la información que usted proporcione allí. Esos sitios no se rigen por este aviso: conviene leer la declaración de privacidad que les corresponda.',
        en: 'Our website may contain links to other sites of interest. Once you use those links to leave our site, we have no control over the destination site, so we cannot be responsible for the protection or privacy of any information you provide there. Those sites are not governed by this notice: please read the privacy statement that applies to them.' },
    ],
  },
  {
    titulo: { es: 'Transferencia de su información', en: 'Transfer of your information' },
    parrafos: [
      { es: 'No vendemos, distribuimos ni cedemos su información personal a terceros, salvo que contemos con su permiso o que la ley nos lo requiera.',
        en: 'We do not sell, distribute or transfer your personal information to third parties, unless we have your permission or are required by law to do so.' },
      { es: 'Podemos usar su información para enviarle información promocional de terceros que consideremos de su interés, únicamente si usted nos indica que desea recibirla.',
        en: 'We may use your information to send you promotional material from third parties we believe may interest you, only if you tell us you wish to receive it.' },
    ],
  },
  {
    titulo: { es: 'Corregir su información', en: 'Correcting your information' },
    parrafos: [
      { es: `Si considera que alguna información que tenemos sobre usted es incorrecta o está incompleta, escríbanos a ${correoDerechos} lo antes posible. Corregiremos de inmediato cualquier dato que resulte incorrecto.`,
        en: `If you believe any information we hold about you is incorrect or incomplete, please write to us at ${correoDerechos} as soon as possible. We will promptly correct any information found to be incorrect.` },
    ],
  },
];
