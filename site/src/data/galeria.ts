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
 * ── LAS DOS PRIMERAS CURADURÍAS, EN CORTO ───────────────────────────────────
 * La primera eligió ocho fotos… mirando diez de las 244 del archivo. El defecto
 * no era de criterio sino de **cobertura**: se eligió bien dentro de una muestra
 * minúscula que nadie había cuestionado. Lo notó Abraham de un vistazo —«las
 * fotos son muy básicas y malas»— y la segunda pasada revisó **las 102 del banco
 * general** en hojas de contacto, dejando nueve.
 *
 * ── 🔴 TERCERA CURADURÍA: LA HACE EL CLIENTE, Y QUITA CINCO DE NUEVE ────────
 * El 2026-09-10 el cliente tachó cinco fotografías sobre la propia rejilla de
 * `/galeria/`. **No dio motivos, y aquí no se inventan**: se registra qué quitó,
 * no por qué. Se fueron el roof top al atardecer, el arco de la playa, la
 * escalera entre los edificios, la alberca del roof top de día y el patio de los
 * árboles. Quedan cuatro.
 *
 * **Los cinco archivos NO se borran de `src/assets/galeria/`**, y no es descuido:
 * tres de ellos son el banner de otras páginas y borrarlos rompe el build.
 *
 *     01-roof-top-atardecer  → banner de /restaurante/
 *     02-arco-playa          → banner de /eventos/
 *     06-alberca-roof-top    → la foto del restaurante dentro de /restaurante/
 *     03-escalera-mar        → sin usar
 *     08-patio-arboles       → sin usar
 *
 * Quitar una foto de la galería y dejarla de portada en otra página es una
 * contradicción que el código no puede resolver solo: **hace falta preguntar al
 * cliente** si esas tres también salen. Y si salen, el banco no da: quedan
 * cuatro fotos para seis banners, y de las cuatro sólo la alberca de noche está
 * libre. Ver R-41.
 *
 * ── CUARTA TANDA: LA SESIÓN PROFESIONAL DE SEPTIEMBRE ──────────────────────
 * El 2026-09-10, el mismo día del recorte del cliente, llegó «Fotos
 * definitivas»: 210 archivos de una sesión con fotógrafo. La carpeta `Galeria/`
 * trae 69, de las que **entran 41** — quedan fuera 18 llamadas «editar» o «para
 * editar», cuyo estado nadie ha confirmado, y 9 exports de Instagram a 1080 px.
 * Una más, `_MLS6946`, ya se publicó como banner de `/contacto/`: es el
 * mostrador de recepción, que no existía en el archivo viejo.
 *
 * ⚠️ **El recorte del cliente NO se deshace.** Las cinco que tachó siguen
 * fuera. Lo que quitó fueron esas cinco fotografías concretas, del banco de
 * 2025; esto es material distinto, de este mes, y lo mandó él para esta página.
 * Si aun así las quiere ver reducidas, se quitan de aquí, no se rescatan
 * aquéllas.
 *
 * Las 41 van **antes** que las cuatro supervivientes: son de 6K y de septiembre,
 * y la primera foto decide si alguien sigue mirando. Las cuatro de 2025
 * conservan entre sí su orden y su sitio al final, sin tocar.
 *
 * ── CÓMO SE ORDENAN ─────────────────────────────────────────────────────────
 * No por tipo de espacio, sino por **fuerza visual descendente**: la primera es
 * la que decide si alguien sigue mirando. Al quitar cinco **no se reordenó nada**:
 * el criterio era relativo, así que las cuatro supervivientes conservan entre sí
 * el orden que ya tenían.
 *
 * ── LA TRAMPA DE LA MINIATURA, QUE SIGUE VIGENTE ────────────────────────────
 * Una foto no se juzga en el visor: se juzga **en la miniatura**, que es el
 * tamaño al que la va a ver casi todo el mundo. Una panorámica de la alberca ya
 * se descartó por esto —funcionaba a lo grande, como hero, y en recorte cuadrado
 * quedaba en nada— y además resultó ser la MISMA imagen del hero de la portada,
 * byte a byte. Ambas comprobaciones se repitieron aquí: ninguna de las cuatro
 * está ya en el sitio ni duplica a otra (verificado por hash, no a ojo).
 *
 * ── LOS TEXTOS ALTERNATIVOS ─────────────────────────────────────────────────
 * Describen lo que se ve, no lo que queremos vender. «Camastros de tejido bajo
 * una pérgola de madera, con el sol poniéndose» le sirve a quien no ve la foto;
 * «un atardecer de ensueño» no le sirve a nadie (WCAG 1.1.1).
 */
import type { ImageMetadata } from 'astro';
import type { Idioma } from '../i18n/ui';

import arcoAlberca from '../assets/galeria/2026/10-arco-piedra-alberca.webp';
import albercaPergola from '../assets/galeria/2026/11-alberca-azotea-pergola.webp';
import deckTumbonas from '../assets/galeria/2026/12-deck-azotea-tumbonas.webp';
import hamacasArena from '../assets/galeria/2026/13-hamacas-palmeras-arena.webp';
import hamacasPergola from '../assets/galeria/2026/14-hamacas-pergola-azotea.webp';
import pasilloMar from '../assets/galeria/2026/15-pasillo-balcon-mar.webp';
import barraCocos from '../assets/galeria/2026/16-barra-cocos-playa.webp';
import panoramicaPalapa from '../assets/galeria/2026/17-panoramica-selva-palapa.webp';
import panoramicaBalcon from '../assets/galeria/2026/18-panoramica-selva-balcon.webp';
import albercaCamastros from '../assets/galeria/2026/19-alberca-azotea-camastros.webp';
import estarLobby from '../assets/galeria/2026/20-estar-lobby.webp';
import estarVentanales from '../assets/galeria/2026/21-estar-ventanales.webp';
import pasilloColumnas from '../assets/galeria/2026/22-pasillo-columnas.webp';
import camaBalcon from '../assets/galeria/2026/23-cama-balcon-mar.webp';
import banoTina from '../assets/galeria/2026/24-bano-tina.webp';
import banoLavabos from '../assets/galeria/2026/25-bano-lavabos-piedra.webp';
import lavaboDetalle from '../assets/galeria/2026/26-lavabo-detalle.webp';
import puerta301 from '../assets/galeria/2026/27-puerta-301.webp';
import ventanaSelva from '../assets/galeria/2026/28-ventana-selva.webp';
import sillasDeck from '../assets/galeria/2026/29-sillas-deck.webp';
import pozoPiedra from '../assets/galeria/2026/30-pozo-piedra.webp';
import andadorMadera from '../assets/galeria/2026/31-andador-madera.webp';
import senderoPalmeras from '../assets/galeria/2026/32-sendero-palmeras.webp';
import fachadaHamacas from '../assets/galeria/2026/33-fachada-hamacas.webp';
import pasoEntrada from '../assets/galeria/2026/34-paso-entrada-plantas.webp';
import columnaPiedra from '../assets/galeria/2026/35-columna-piedra.webp';
import cercaBambu from '../assets/galeria/2026/36-cerca-bambu.webp';
import interiorLampara from '../assets/galeria/2026/37-interior-lampara-terraza.webp';
import andadorEdificios from '../assets/galeria/2026/38-andador-edificios.webp';
import jardinTronco from '../assets/galeria/2026/39-jardin-tronco.webp';
import jardinPalmeras from '../assets/galeria/2026/40-jardin-palmeras.webp';
import escaleraEnredadera from '../assets/galeria/2026/41-escalera-enredadera.webp';
import fachadaPalmeras from '../assets/galeria/2026/42-fachada-palmeras.webp';
import senderoCemento from '../assets/galeria/2026/43-sendero-cemento.webp';
import accesoBandera from '../assets/galeria/2026/44-acceso-bandera.webp';
import entradaBanderines from '../assets/galeria/2026/45-entrada-banderines.webp';
import fachadaRotulo from '../assets/galeria/2026/46-fachada-rotulo.webp';
import candadosTronco from '../assets/galeria/2026/47-candados-tronco.webp';
import candadosDetalle from '../assets/galeria/2026/48-candados-detalle.webp';
import calleHotel from '../assets/galeria/2026/49-calle-hotel.webp';
import elevador from '../assets/galeria/2026/50-elevador.webp';

import panoramica from '../assets/galeria/04-vista-selva-mar.webp';
import camastros from '../assets/galeria/05-camastros-palapa.webp';
import albercaNoche from '../assets/galeria/07-alberca-noche.webp';
import entrada from '../assets/galeria/09-entrada-piedra.webp';

type Texto = Record<Idioma, string>;

export const fotos: { imagen: ImageMetadata; alt: Texto }[] = [
  {
    imagen: arcoAlberca,
    alt: {
      es: 'Arco de piedra con el rótulo del hotel, y detrás la alberca y las palmeras.',
      en: 'Stone arch bearing the hotel sign, with the pool and the palm trees behind it.',
    },
  },
  {
    imagen: albercaPergola,
    alt: {
      es: 'Alberca alargada en la azotea, con pérgola de madera, camastros y el mar al fondo.',
      en: 'A long rooftop pool, with a wooden pergola, loungers and the sea beyond.',
    },
  },
  {
    imagen: deckTumbonas,
    alt: {
      es: 'Tumbonas de tijera en el entarimado de la azotea, frente al barandal y el mar.',
      en: 'Folding deckchairs on the rooftop decking, facing the railing and the sea.',
    },
  },
  {
    imagen: hamacasArena,
    alt: {
      es: 'Dos hamacas de red atadas entre palmeras, sobre la arena.',
      en: 'Two net hammocks slung between palm trees, over the sand.',
    },
  },
  {
    imagen: hamacasPergola,
    alt: {
      es: 'Hamacas blancas colgadas bajo la pérgola de la azotea, sobre el entarimado de madera.',
      en: 'White hammocks hung under the rooftop pergola, above the wooden decking.',
    },
  },
  {
    imagen: pasilloMar,
    alt: {
      es: 'Pasillo en penumbra que se abre a un balcón con una silla y el mar al fondo.',
      en: 'A dim passage opening onto a balcony with a chair and the sea beyond.',
    },
  },
  {
    imagen: barraCocos,
    alt: {
      es: 'Barra de madera con bancos altos y cocos verdes, frente a las palmeras y el mar.',
      en: 'A wooden bar with high stools and green coconuts, facing the palms and the sea.',
    },
  },
  {
    imagen: panoramicaPalapa,
    alt: {
      es: 'La selva de Tulum vista desde lo alto, bajo el alero de palma de una terraza.',
      en: 'The Tulum jungle seen from above, under the palm eaves of a terrace.',
    },
  },
  {
    imagen: panoramicaBalcon,
    alt: {
      es: 'Las copas de las palmas de la selva desde un balcón de barandal blanco.',
      en: 'The crowns of the jungle palms from a balcony with a white balustrade.',
    },
  },
  {
    imagen: albercaCamastros,
    alt: {
      es: 'La alberca de la azotea desde el otro extremo, con los camastros alineados a un lado.',
      en: 'The rooftop pool from the far end, with the loungers lined up along one side.',
    },
  },
  {
    imagen: estarLobby,
    alt: {
      es: 'Estar abierto con bancas y butacas de madera, junto al andador del jardín.',
      en: 'An open lounge with wooden benches and armchairs, beside the garden walkway.',
    },
  },
  {
    imagen: estarVentanales,
    alt: {
      es: 'Sala de estar con sillones de madera, ventanales y ventilador de techo.',
      en: 'A sitting room with wooden armchairs, large windows and a ceiling fan.',
    },
  },
  {
    imagen: pasilloColumnas,
    alt: {
      es: 'Pasillo con columnas de troncos, abierto al jardín de palmeras.',
      en: 'A passage lined with tree-trunk columns, open to the palm garden.',
    },
  },
  {
    imagen: camaBalcon,
    alt: {
      es: 'Cama frente a un ventanal, con una hamaca en el balcón y el mar entre las palmas.',
      en: 'A bed facing a window wall, with a hammock on the balcony and the sea between the palms.',
    },
  },
  {
    imagen: banoTina,
    alt: {
      es: 'Baño con puertas de madera y una tina de obra con borde de madera.',
      en: 'A bathroom with wooden doors and a masonry bathtub edged in wood.',
    },
  },
  {
    imagen: banoLavabos,
    alt: {
      es: 'Doble lavabo de piedra con dos espejos y apliques de pared.',
      en: 'A double stone washbasin with two mirrors and wall sconces.',
    },
  },
  {
    imagen: lavaboDetalle,
    alt: {
      es: 'Detalle del lavabo: grifo de latón, vaso de cristal y jabón sobre la piedra.',
      en: 'Washbasin detail: brass tap, glass tumbler and soap on the stone.',
    },
  },
  {
    imagen: puerta301,
    alt: {
      es: 'Puerta de madera de la habitación 301, con un colgante de macramé encima.',
      en: 'The wooden door of room 301, with a macramé hanging above it.',
    },
  },
  {
    imagen: ventanaSelva,
    alt: {
      es: 'Ventana vertical que enmarca las palmas de la selva.',
      en: 'A tall window framing the palms of the jungle.',
    },
  },
  {
    imagen: sillasDeck,
    alt: {
      es: 'Dos sillas de madera y una mesa de mimbre en un entarimado, junto a un muro claro.',
      en: 'Two wooden chairs and a wicker table on a deck, beside a pale wall.',
    },
  },
  {
    imagen: pozoPiedra,
    alt: {
      es: 'Pozo de piedra con dintel de madera, rodeado de vegetación.',
      en: 'A stone well with a wooden lintel, surrounded by greenery.',
    },
  },
  {
    imagen: andadorMadera,
    alt: {
      es: 'Andador de madera con barandal entre la vegetación, bajo un techo de vigas.',
      en: 'A wooden walkway with a railing through the greenery, under a beamed roof.',
    },
  },
  {
    imagen: senderoPalmeras,
    alt: {
      es: 'Sendero de piedra entre palmeras, hacia los bungalows.',
      en: 'A stone path between palm trees, leading to the bungalows.',
    },
  },
  {
    imagen: fachadaHamacas,
    alt: {
      es: 'Las terrazas de las habitaciones con sus hamacas, vistas entre la vegetación.',
      en: 'The room terraces with their hammocks, seen through the greenery.',
    },
  },
  {
    imagen: pasoEntrada,
    alt: {
      es: 'Paso de acceso entre plantas, con muro de piedra y puerta de madera.',
      en: 'An entrance passage between plants, with a stone wall and a wooden door.',
    },
  },
  {
    imagen: columnaPiedra,
    alt: {
      es: 'Columna de piedra entre plantas tropicales.',
      en: 'A stone column among tropical plants.',
    },
  },
  {
    imagen: cercaBambu,
    alt: {
      es: 'Cerca de bambú y vegetación junto a un muro claro.',
      en: 'A bamboo fence and greenery beside a pale wall.',
    },
  },
  {
    imagen: interiorLampara,
    alt: {
      es: 'Interior en penumbra con lámpara colgante, abierto a una terraza con sillones.',
      en: 'A dim interior with a hanging lamp, opening onto a terrace with armchairs.',
    },
  },
  {
    imagen: andadorEdificios,
    alt: {
      es: 'Andador entre los edificios del hotel, con vegetación a los lados.',
      en: 'A walkway between the hotel buildings, with greenery on both sides.',
    },
  },
  {
    imagen: jardinTronco,
    alt: {
      es: 'Jardín con un tronco a la deriva sobre la arena y una escalera al fondo.',
      en: 'A garden with a piece of driftwood on the sand and a staircase behind.',
    },
  },
  {
    imagen: jardinPalmeras,
    alt: {
      es: 'Jardín de palmeras con un edificio de piedra al fondo.',
      en: 'A palm garden with a stone building behind.',
    },
  },
  {
    imagen: escaleraEnredadera,
    alt: {
      es: 'Escalera de madera entre la vegetación, con una enredadera cubriendo el muro.',
      en: 'A wooden staircase among the greenery, with a creeper covering the wall.',
    },
  },
  {
    imagen: fachadaPalmeras,
    alt: {
      es: 'La fachada de las habitaciones con sus balcones, entre las palmeras.',
      en: 'The facade of the rooms with their balconies, among the palm trees.',
    },
  },
  {
    imagen: senderoCemento,
    alt: {
      es: 'Sendero de cemento entre la vegetación, hacia el interior del hotel.',
      en: 'A concrete path through the greenery, leading into the hotel.',
    },
  },
  {
    imagen: accesoBandera,
    alt: {
      es: 'Acceso al hotel con la bandera de México y el rótulo sobre la escalera de madera.',
      en: 'The hotel entrance with the Mexican flag and the sign above the wooden staircase.',
    },
  },
  {
    imagen: entradaBanderines,
    alt: {
      es: 'Entrada del hotel con el rótulo y una guirnalda de banderines de papel picado.',
      en: 'The hotel entrance with its sign and a garland of papel picado bunting.',
    },
  },
  {
    imagen: fachadaRotulo,
    alt: {
      es: 'La fachada del hotel con el rótulo «Azucar Hotel Tulum» sobre las columnas.',
      en: 'The hotel facade with the “Azucar Hotel Tulum” sign above the columns.',
    },
  },
  {
    imagen: candadosTronco,
    alt: {
      es: 'Candados atados a un tronco, con la fachada del hotel desenfocada detrás.',
      en: 'Padlocks tied to a tree trunk, with the hotel facade blurred behind.',
    },
  },
  {
    imagen: candadosDetalle,
    alt: {
      es: 'Detalle de los candados encadenados alrededor del tronco.',
      en: 'A close-up of the padlocks chained around the trunk.',
    },
  },
  {
    imagen: calleHotel,
    alt: {
      es: 'La calle frente al hotel, con palmeras y los locales de la acera.',
      en: 'The street in front of the hotel, with palm trees and the shopfronts along it.',
    },
  },
  {
    imagen: elevador,
    alt: {
      es: 'El elevador del hotel, con marco de madera y la señalética de las escaleras.',
      en: 'The hotel lift, with a wooden frame and the stairs signage beside it.',
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
    imagen: albercaNoche,
    alt: {
      es: 'La alberca del roof top de noche, iluminada por dentro y por las luces empotradas en su muro.',
      en: 'The rooftop pool at night, lit from within and by the lights set into its wall.',
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
