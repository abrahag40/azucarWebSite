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
 * ── QUINTA TANDA: LAS 74 DE BOOKING, POR DECISIÓN DEL CLIENTE ──────────────
 * El 2026-09-10 llegó `Galeria/booking/`: 74 fotografías descargadas del CDN de
 * Booking.com —los nombres son sus identificadores numéricos—. **El cliente las
 * pidió todas, tal cual**, y así entran. Lo que sí queda fuera son las tres
 * capturas de pantalla que venían en la misma carpeta: no son fotografías.
 *
 * ⚠️ **Se avisó de lo que traen, y la decisión fue del cliente:**
 *
 *   · **Ninguna pasa de 768 px de alto** —40 de las 74 son 576×768—, que es el
 *     tamaño al que Booking sirve sus derivadas. El visor las abre a 1120 px:
 *     una de 576 se estira al doble. Las 45 de la sesión con fotógrafo miden
 *     1600 y no se estiran nada. En la miniatura no se nota; al hacer clic, sí.
 *   · El contenido es desigual. Hay material que no teníamos —el arco en la
 *     playa al atardecer, la alberca con su fondo de arena y conchas, la luna
 *     sobre el mar—, y hay fotografías de inventario: un termostato de aire
 *     acondicionado, clósets vacíos, una puerta sola.
 *
 * Van al FINAL del banco, detrás de las 41 de septiembre y de las cuatro de
 * 2025: el orden del array es el orden de la rejilla, y lo que decide si
 * alguien sigue mirando es lo primero que ve.
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

import bk01 from '../assets/galeria/booking/booking-01.webp';
import bk02 from '../assets/galeria/booking/booking-02.webp';
import bk03 from '../assets/galeria/booking/booking-03.webp';
import bk04 from '../assets/galeria/booking/booking-04.webp';
import bk05 from '../assets/galeria/booking/booking-05.webp';
import bk06 from '../assets/galeria/booking/booking-06.webp';
import bk07 from '../assets/galeria/booking/booking-07.webp';
import bk08 from '../assets/galeria/booking/booking-08.webp';
import bk09 from '../assets/galeria/booking/booking-09.webp';
import bk10 from '../assets/galeria/booking/booking-10.webp';
import bk11 from '../assets/galeria/booking/booking-11.webp';
import bk12 from '../assets/galeria/booking/booking-12.webp';
import bk13 from '../assets/galeria/booking/booking-13.webp';
import bk14 from '../assets/galeria/booking/booking-14.webp';
import bk15 from '../assets/galeria/booking/booking-15.webp';
import bk16 from '../assets/galeria/booking/booking-16.webp';
import bk17 from '../assets/galeria/booking/booking-17.webp';
import bk18 from '../assets/galeria/booking/booking-18.webp';
import bk19 from '../assets/galeria/booking/booking-19.webp';
import bk20 from '../assets/galeria/booking/booking-20.webp';
import bk21 from '../assets/galeria/booking/booking-21.webp';
import bk22 from '../assets/galeria/booking/booking-22.webp';
import bk23 from '../assets/galeria/booking/booking-23.webp';
import bk24 from '../assets/galeria/booking/booking-24.webp';
import bk25 from '../assets/galeria/booking/booking-25.webp';
import bk26 from '../assets/galeria/booking/booking-26.webp';
import bk27 from '../assets/galeria/booking/booking-27.webp';
import bk28 from '../assets/galeria/booking/booking-28.webp';
import bk29 from '../assets/galeria/booking/booking-29.webp';
import bk30 from '../assets/galeria/booking/booking-30.webp';
import bk31 from '../assets/galeria/booking/booking-31.webp';
import bk32 from '../assets/galeria/booking/booking-32.webp';
import bk33 from '../assets/galeria/booking/booking-33.webp';
import bk34 from '../assets/galeria/booking/booking-34.webp';
import bk35 from '../assets/galeria/booking/booking-35.webp';
import bk36 from '../assets/galeria/booking/booking-36.webp';
import bk37 from '../assets/galeria/booking/booking-37.webp';
import bk38 from '../assets/galeria/booking/booking-38.webp';
import bk39 from '../assets/galeria/booking/booking-39.webp';
import bk40 from '../assets/galeria/booking/booking-40.webp';
import bk41 from '../assets/galeria/booking/booking-41.webp';
import bk42 from '../assets/galeria/booking/booking-42.webp';
import bk43 from '../assets/galeria/booking/booking-43.webp';
import bk44 from '../assets/galeria/booking/booking-44.webp';
import bk45 from '../assets/galeria/booking/booking-45.webp';
import bk46 from '../assets/galeria/booking/booking-46.webp';
import bk47 from '../assets/galeria/booking/booking-47.webp';
import bk48 from '../assets/galeria/booking/booking-48.webp';
import bk49 from '../assets/galeria/booking/booking-49.webp';
import bk50 from '../assets/galeria/booking/booking-50.webp';
import bk51 from '../assets/galeria/booking/booking-51.webp';
import bk52 from '../assets/galeria/booking/booking-52.webp';
import bk53 from '../assets/galeria/booking/booking-53.webp';
import bk54 from '../assets/galeria/booking/booking-54.webp';
import bk55 from '../assets/galeria/booking/booking-55.webp';
import bk56 from '../assets/galeria/booking/booking-56.webp';
import bk57 from '../assets/galeria/booking/booking-57.webp';
import bk58 from '../assets/galeria/booking/booking-58.webp';
import bk59 from '../assets/galeria/booking/booking-59.webp';
import bk60 from '../assets/galeria/booking/booking-60.webp';
import bk61 from '../assets/galeria/booking/booking-61.webp';
import bk62 from '../assets/galeria/booking/booking-62.webp';
import bk63 from '../assets/galeria/booking/booking-63.webp';
import bk64 from '../assets/galeria/booking/booking-64.webp';
import bk65 from '../assets/galeria/booking/booking-65.webp';
import bk66 from '../assets/galeria/booking/booking-66.webp';
import bk67 from '../assets/galeria/booking/booking-67.webp';
import bk68 from '../assets/galeria/booking/booking-68.webp';
import bk69 from '../assets/galeria/booking/booking-69.webp';
import bk70 from '../assets/galeria/booking/booking-70.webp';
import bk71 from '../assets/galeria/booking/booking-71.webp';
import bk72 from '../assets/galeria/booking/booking-72.webp';
import bk73 from '../assets/galeria/booking/booking-73.webp';
import bk74 from '../assets/galeria/booking/booking-74.webp';

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
  {
    imagen: bk01,
    alt: {
      es: 'Barandal de madera y troncos, con la vegetación del jardín detrás.',
      en: 'A wooden and log railing, with the garden greenery behind it.',
    },
  },
  {
    imagen: bk02,
    alt: {
      es: 'Terraza de azotea con un camastro blanco y cojines, bajo el alero de palma.',
      en: 'A rooftop terrace with a white daybed and cushions, under the palm eaves.',
    },
  },
  {
    imagen: bk03,
    alt: {
      es: 'Escalera de caracol de madera, vista desde arriba.',
      en: 'A wooden spiral staircase, seen from above.',
    },
  },
  {
    imagen: bk04,
    alt: {
      es: 'Cortinas abiertas al atardecer, con el mar al fondo.',
      en: 'Curtains open onto the sunset, with the sea beyond.',
    },
  },
  {
    imagen: bk05,
    alt: {
      es: 'El Caribe turquesa, sin orilla a la vista.',
      en: 'The turquoise Caribbean, with no shore in sight.',
    },
  },
  {
    imagen: bk06,
    alt: {
      es: 'Atardecer nublado sobre el mar, con el sol bajo en el horizonte.',
      en: 'A cloudy sunset over the sea, the sun low on the horizon.',
    },
  },
  {
    imagen: bk07,
    alt: {
      es: 'Mesa de madera en la terraza, con las palmeras y el mar detrás.',
      en: 'A wooden table on the terrace, with the palms and the sea behind.',
    },
  },
  {
    imagen: bk08,
    alt: {
      es: 'Entarimado de madera junto a la alberca, con el mar al fondo.',
      en: 'Wooden decking beside the pool, with the sea beyond.',
    },
  },
  {
    imagen: bk09,
    alt: {
      es: 'Paso estrecho entre un muro de piedra y una cerca de bambú.',
      en: 'A narrow passage between a stone wall and a bamboo fence.',
    },
  },
  {
    imagen: bk10,
    alt: {
      es: 'Entarimado con barandal, y el mar entre las palmeras.',
      en: 'Decking with a railing, and the sea between the palm trees.',
    },
  },
  {
    imagen: bk11,
    alt: {
      es: 'Terraza sobre las copas de las palmeras, con el mar al fondo.',
      en: 'A terrace above the palm crowns, with the sea beyond.',
    },
  },
  {
    imagen: bk12,
    alt: {
      es: 'Pasaderas de piedra dentro del agua de la alberca.',
      en: 'Stone stepping stones set into the water of the pool.',
    },
  },
  {
    imagen: bk13,
    alt: {
      es: 'Pasillo interior con paneles de bambú y una puerta de madera.',
      en: 'An interior passage with bamboo panels and a wooden door.',
    },
  },
  {
    imagen: bk14,
    alt: {
      es: 'Borde de la alberca, con arena y conchas incrustadas.',
      en: 'The edge of the pool, with sand and embedded shells.',
    },
  },
  {
    imagen: bk15,
    alt: {
      es: 'Una palmera plantada dentro de la alberca, en su propio brocal.',
      en: 'A palm tree planted inside the pool, in its own kerb.',
    },
  },
  {
    imagen: bk16,
    alt: {
      es: 'El fondo de arena de la alberca, con conchas incrustadas.',
      en: 'The sandy bottom of the pool, with shells set into it.',
    },
  },
  {
    imagen: bk17,
    alt: {
      es: 'Fachada con puertas de madera abiertas y escalones de piedra.',
      en: 'A facade with open wooden doors and stone steps.',
    },
  },
  {
    imagen: bk18,
    alt: {
      es: 'Arco de piedra en la playa entre las palmeras, al atardecer.',
      en: 'A stone arch on the beach between the palms, at sunset.',
    },
  },
  {
    imagen: bk19,
    alt: {
      es: 'Estar interior con sillones de madera y muro de piedra.',
      en: 'An interior lounge with wooden armchairs and a stone wall.',
    },
  },
  {
    imagen: bk20,
    alt: {
      es: 'Una palmera y el mar, desde un balcón de barandal blanco.',
      en: 'A palm tree and the sea, from a balcony with a white balustrade.',
    },
  },
  {
    imagen: bk21,
    alt: {
      es: 'Camastros bajo una pérgola de madera, al atardecer.',
      en: 'Loungers under a wooden pergola, at sunset.',
    },
  },
  {
    imagen: bk22,
    alt: {
      es: 'El mar y la arena, con una palmera en primer plano.',
      en: 'The sea and the sand, with a palm tree in the foreground.',
    },
  },
  {
    imagen: bk23,
    alt: {
      es: 'Paso entre muros de piedra, con vegetación a los lados.',
      en: 'A passage between stone walls, with greenery on both sides.',
    },
  },
  {
    imagen: bk24,
    alt: {
      es: 'Hamaca en un balcón de madera, con las palmeras y el mar.',
      en: 'A hammock on a wooden balcony, with the palms and the sea.',
    },
  },
  {
    imagen: bk25,
    alt: {
      es: 'Un pájaro posado en el barandal del balcón, con el mar detrás.',
      en: 'A bird perched on the balcony railing, with the sea behind.',
    },
  },
  {
    imagen: bk26,
    alt: {
      es: 'Regadera de latón en un baño de piedra.',
      en: 'A brass shower in a stone bathroom.',
    },
  },
  {
    imagen: bk27,
    alt: {
      es: 'Paso estrecho hacia la regadera, con muros de piedra.',
      en: 'A narrow passage to the shower, with stone walls.',
    },
  },
  {
    imagen: bk28,
    alt: {
      es: 'Terraza corrida con barandal blanco y las palmeras del jardín.',
      en: 'A long terrace with a white balustrade and the garden palms.',
    },
  },
  {
    imagen: bk29,
    alt: {
      es: 'Habitación en penumbra, con el ventanal abierto al atardecer.',
      en: 'A dim room, with the window wall open onto the sunset.',
    },
  },
  {
    imagen: bk30,
    alt: {
      es: 'Habitación con cama, ventilador de techo y ventanal al balcón.',
      en: 'A room with a bed, a ceiling fan and a window wall onto the balcony.',
    },
  },
  {
    imagen: bk31,
    alt: {
      es: 'Habitación con cama y ventanal, y una banca de madera a los pies.',
      en: 'A room with a bed and a window wall, and a wooden bench at its foot.',
    },
  },
  {
    imagen: bk32,
    alt: {
      es: 'El balcón al atardecer desde dentro del cuarto, con dos sillas.',
      en: 'The balcony at sunset from inside the room, with two chairs.',
    },
  },
  {
    imagen: bk33,
    alt: {
      es: 'Pasillo interior hacia el lavabo, con la puerta abierta al fondo.',
      en: 'An interior passage to the washbasin, with the door open at the end.',
    },
  },
  {
    imagen: bk34,
    alt: {
      es: 'Cortinas entreabiertas hacia el balcón y las palmeras.',
      en: 'Curtains half-drawn onto the balcony and the palm trees.',
    },
  },
  {
    imagen: bk35,
    alt: {
      es: 'El termostato del aire acondicionado de la habitación, marcando 27.5 grados.',
      en: 'The room air-conditioning thermostat, reading 27.5 degrees.',
    },
  },
  {
    imagen: bk36,
    alt: {
      es: 'Puerta de madera de la habitación, junto a un muro de piedra.',
      en: 'The wooden door of the room, beside a stone wall.',
    },
  },
  {
    imagen: bk37,
    alt: {
      es: 'Pasillo del cuarto con el clóset abierto y una lámpara colgante.',
      en: 'The room passage with the closet open and a hanging lamp.',
    },
  },
  {
    imagen: bk38,
    alt: {
      es: 'Cabecera de paneles de madera, iluminada desde abajo.',
      en: 'A headboard of wooden panels, lit from below.',
    },
  },
  {
    imagen: bk39,
    alt: {
      es: 'Cama junto al ventanal, con las cortinas abiertas al balcón.',
      en: 'A bed beside the window wall, curtains open onto the balcony.',
    },
  },
  {
    imagen: bk40,
    alt: {
      es: 'Clóset abierto de madera, con cajones y repisas.',
      en: 'An open wooden closet, with drawers and shelves.',
    },
  },
  {
    imagen: bk41,
    alt: {
      es: 'Clóset abierto de madera, vacío.',
      en: 'An open wooden closet, empty.',
    },
  },
  {
    imagen: bk42,
    alt: {
      es: 'Cielo nocturno con las palmeras recortadas contra las estrellas.',
      en: 'A night sky with the palms silhouetted against the stars.',
    },
  },
  {
    imagen: bk43,
    alt: {
      es: 'La alberca de noche, con las palmeras iluminadas alrededor.',
      en: 'The pool at night, with the palms lit around it.',
    },
  },
  {
    imagen: bk44,
    alt: {
      es: 'La luna llena sobre el mar, entre nubes.',
      en: 'A full moon over the sea, through the clouds.',
    },
  },
  {
    imagen: bk45,
    alt: {
      es: 'Cortina y ventanal hacia el balcón de barandal blanco.',
      en: 'A curtain and window wall onto the balcony with its white balustrade.',
    },
  },
  {
    imagen: bk46,
    alt: {
      es: 'Balcón de barandal blanco, sobre la vegetación del jardín.',
      en: 'A balcony with a white balustrade, above the garden greenery.',
    },
  },
  {
    imagen: bk47,
    alt: {
      es: 'Cama con lámpara colgante y un espejo sobre la cabecera.',
      en: 'A bed with a hanging lamp and a mirror above the headboard.',
    },
  },
  {
    imagen: bk48,
    alt: {
      es: 'Escalera de piedra con barandal de troncos.',
      en: 'A stone staircase with a railing of tree trunks.',
    },
  },
  {
    imagen: bk49,
    alt: {
      es: 'Clóset de puertas de madera, junto a una ventana.',
      en: 'A closet with wooden doors, beside a window.',
    },
  },
  {
    imagen: bk50,
    alt: {
      es: 'Cama bajo dosel, tras unas cortinas blancas.',
      en: 'A four-poster bed, behind white curtains.',
    },
  },
  {
    imagen: bk51,
    alt: {
      es: 'Paso hacia la regadera, con una toalla colgada.',
      en: 'The way through to the shower, with a towel hanging.',
    },
  },
  {
    imagen: bk52,
    alt: {
      es: 'Habitación con cama de madera y un sillón junto a la ventana.',
      en: 'A room with a wooden bed and an armchair by the window.',
    },
  },
  {
    imagen: bk53,
    alt: {
      es: 'Habitación con el ventanal abierto al balcón y al mar.',
      en: 'A room with the window wall open onto the balcony and the sea.',
    },
  },
  {
    imagen: bk54,
    alt: {
      es: 'Terraza de madera con palmeras y el mar al fondo.',
      en: 'A wooden terrace with palms and the sea beyond.',
    },
  },
  {
    imagen: bk55,
    alt: {
      es: 'Regadera de latón sobre un banco de piedra.',
      en: 'A brass shower above a stone bench.',
    },
  },
  {
    imagen: bk56,
    alt: {
      es: 'Cortina translúcida ante el ventanal del balcón.',
      en: 'A sheer curtain in front of the balcony window wall.',
    },
  },
  {
    imagen: bk57,
    alt: {
      es: 'Escalera exterior con una columna de piedra y vegetación.',
      en: 'An outdoor staircase with a stone column and greenery.',
    },
  },
  {
    imagen: bk58,
    alt: {
      es: 'Habitación con techo de madera y salida al balcón, con el mar al fondo.',
      en: 'A room with a wooden ceiling and a way out to the balcony, the sea beyond.',
    },
  },
  {
    imagen: bk59,
    alt: {
      es: 'Habitación con techo de madera, clóset y salida al balcón.',
      en: 'A room with a wooden ceiling, a closet and a way out to the balcony.',
    },
  },
  {
    imagen: bk60,
    alt: {
      es: 'Terraza bajo palapa con dos sillas de tijera, frente al mar.',
      en: 'A palm-thatched terrace with two folding chairs, facing the sea.',
    },
  },
  {
    imagen: bk61,
    alt: {
      es: 'Columna de piedra y vegetación junto a la terraza.',
      en: 'A stone column and greenery beside the terrace.',
    },
  },
  {
    imagen: bk62,
    alt: {
      es: 'El mar y el arco de piedra, desde un balcón de madera.',
      en: 'The sea and the stone arch, from a wooden balcony.',
    },
  },
  {
    imagen: bk63,
    alt: {
      es: 'Balcón con dos sillas y las palmeras, visto desde el cuarto.',
      en: 'A balcony with two chairs and the palms, seen from the room.',
    },
  },
  {
    imagen: bk64,
    alt: {
      es: 'Jacuzzi de mosaico en una terraza de piedra.',
      en: 'A mosaic jacuzzi on a stone terrace.',
    },
  },
  {
    imagen: bk65,
    alt: {
      es: 'Cama bajo dosel, tras una cortina blanca.',
      en: 'A four-poster bed, behind a white curtain.',
    },
  },
  {
    imagen: bk66,
    alt: {
      es: 'Regadera de latón, con una ventana al mar.',
      en: 'A brass shower, with a window onto the sea.',
    },
  },
  {
    imagen: bk67,
    alt: {
      es: 'Regadera con las toallas colgadas en el muro de piedra.',
      en: 'A shower with the towels hung on the stone wall.',
    },
  },
  {
    imagen: bk68,
    alt: {
      es: 'Amanecer anaranjado sobre las olas.',
      en: 'An orange sunrise over the waves.',
    },
  },
  {
    imagen: bk69,
    alt: {
      es: 'Lavabo de piedra con espejo y una repisa de madera.',
      en: 'A stone washbasin with a mirror and a wooden shelf.',
    },
  },
  {
    imagen: bk70,
    alt: {
      es: 'Escritorio de madera junto al ventanal del balcón.',
      en: 'A wooden desk beside the balcony window wall.',
    },
  },
  {
    imagen: bk71,
    alt: {
      es: 'La hamaca del balcón, vista desde dentro del cuarto.',
      en: 'The balcony hammock, seen from inside the room.',
    },
  },
  {
    imagen: bk72,
    alt: {
      es: 'Lavabo de piedra ante el ventanal.',
      en: 'A stone washbasin in front of the window wall.',
    },
  },
  {
    imagen: bk73,
    alt: {
      es: 'Cama con cabecera de listones de madera, bajo un techo de vigas.',
      en: 'A bed with a slatted wooden headboard, under a beamed ceiling.',
    },
  },
  {
    imagen: bk74,
    alt: {
      es: 'Los edificios del hotel entre las palmeras, desde el jardín.',
      en: 'The hotel buildings among the palms, seen from the garden.',
    },
  },
];
