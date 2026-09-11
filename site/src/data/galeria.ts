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
 * ── SEXTA TANDA: «TODAS», Y ESTA VEZ ES LITERAL ───────────────────────────
 * El 2026-09-11 la instrucción del cliente, vía Abraham, fue **«quiero que
 * existan todas, no me importa nada»**. Entran las 31 que las curadurías
 * anteriores habían apartado, y con ellas la carpeta `Galeria/` queda **completa
 * al 100 %: sus 146 imágenes están las 146 en la galería.**
 *
 *     18  las de 6K que se llamaban «editar» o «para editar»
 *      1  `_MLS6946`, la recepción — ya era el banner de /contacto/
 *      9  exports de Instagram a 1080 px
 *      3  las «capturas de pantalla» de `booking/`
 *
 * **Se comprobó por CONTENIDO, no por nombre de archivo.** Cada original se
 * re-codificó con esta misma tubería —1600 px, WebP q85— y se comparó su hash
 * contra las 119 ya cargadas. De ahí salen los tres números que cuadran solos:
 * 115 ya estaban, 31 faltaban, y 4 numeradas no tienen origen en esa carpeta
 * porque son las cuatro supervivientes de 2025. Cotejar por nombre no habría
 * servido: los archivos se llaman por su posición desde la quinta tanda.
 *
 * ✅ **Y corrige un error de la quinta tanda.** Aquí se escribió que las tres
 * capturas «no son fotografías». **Lo son**: miradas una a una, son el arco con
 * la alberca y el mar, la alberca de borde infinito entre las palmeras, y el
 * rincón de la palapa con su hamaca y sus pufs. Ni una pizca de interfaz, ni un
 * precio, ni un logotipo de Booking. Se descartaron por su NOMBRE de archivo, que
 * es exactamente el atajo que esta galería lleva tres curadurías evitando.
 *
 * ⚠️ **Lo que se advirtió de las otras 28 sigue siendo verdad, y la decisión es
 * del cliente:** las 9 de Instagram miden 1080 px y el visor las abre a 1120, así
 * que se estiran un poco; las 18 de «editar» son de 6K y nadie ha confirmado si
 * el nombre significaba que estaban pendientes de retoque. Se dijo, se decidió, y
 * queda escrito quién decidió.
 *
 * Entraron al FINAL, de la 120 a la 150, para no renumerar las 119 anteriores y
 * no romper la lista que el cliente tenía delante. **Ese apaño duró unas horas:
 * ese mismo día llegó su reordenación.** Ver la séptima tanda.
 *
 * ── 🔀 SÉPTIMA TANDA: EL CLIENTE ORDENA, Y LA NUMERACIÓN SE GANA EL SUELDO ──
 * El 2026-09-11 el cliente mandó **una lista de 105 números** con el orden que
 * quiere. Es la primera vez que se ejerce el contrato de arriba, y funcionó
 * exactamente como estaba escrito que funcionaría: llegó una instrucción por
 * número, se ejecutó sin una sola cacería, y **ninguna otra página se movió**
 * —nada fuera de este archivo importa `numeradas/`, que era el objetivo—.
 *
 * Qué traía la lista, y qué se hizo con ella:
 *
 *   · **105 entradas · 8 repetidas · 97 únicas · ninguna fuera de rango.**
 *     Regla de Abraham para las repetidas: gana la PRIMERA aparición y se borra
 *     la segunda. Repitió 22, 149, 138, 40, 110, 115, 74 y 82.
 *   · 🔴 **La lista sólo nombra 97 de las 150.** Las otras **53 se quedan**, en
 *     las posiciones 98–150 y conservando entre sí su orden anterior. Lo decidió
 *     Abraham como Proxy PO: la instrucción era «reordenar», no «quitar», y el
 *     día antes el cliente había pedido que estuvieran todas. Si quiere el
 *     recorte, quitarlas después es trivial; deshacer un borrado, no.
 *
 * **Se verificó por HASH, no a ojo.** Cada posición nueva se comprobó que
 * contiene byte a byte el archivo de su posición vieja, y cada texto alternativo
 * se comprobó contra la versión en git: los 150 siguen siendo los mismos textos,
 * viajando con su propia foto. Un reorden que mueve 150 archivos y 150 cadenas a
 * la vez no se revisa mirando la rejilla — se revisa con una aserción.
 *
 * ── 🔀 OCTAVA TANDA: EL AJUSTE FINO, QUE ES LA PRUEBA DE QUE ESTO SIRVE ────
 * El 2026-09-11, horas después de la reordenación grande, el cliente pidió dos
 * retoques **por número**: intercambiar la 3 y la 6, y juntar en la página 1
 * —de manera secuencial— la 9, 10, 5, 13, 111 y 17. Seis fotos de interior:
 * cama, lavabo, regadera, clóset, doble lavabo y escritorio.
 *
 * Cinco de esas seis ya estaban en la página 1; la única que subía era la **111**,
 * que vivía en la quinta. Así que lo que la petición pedía de verdad no era
 * «tráelas», era **«ponlas juntas y en ese orden»**.
 *
 * ⚠️ **Dónde juntarlas no estaba en la instrucción, y cambiaba el resultado.**
 * Al principio de la galería, el grupo habría empujado seis puestos a todo lo
 * demás y habría enterrado el intercambio 3↔6 en las posiciones 9 y 11 — dos
 * peticiones peleándose. Se preguntó, y Abraham eligió juntarlas **donde el
 * grupo ya empezaba, en las posiciones 5–10**: se mueve lo mínimo y el
 * intercambio se ve. La página 1 queda 1, 2, 6, 4 · 9, 10, 5, 13, 111, 17 · 3, 7…
 *
 * Que un cambio así se pueda pedir en una línea, ejecutar sin cacería y verificar
 * con tres aserciones es exactamente para lo que se numeraron los archivos.
 *
 * ── 🔢 LOS ARCHIVOS SE LLAMAN POR SU NÚMERO, Y ESO ES EL CONTRATO ──────────
 * Desde el 2026-09-10 las 119 viven en `assets/galeria/numeradas/` y se llaman
 * `001.webp` … `119.webp`, **en el mismo orden en que salen en la rejilla**. Lo
 * pidió Abraham con un motivo concreto: cuando el cliente diga «quita la 57 y
 * sube la 83», eso tiene que ser una instrucción ejecutable y no una cacería.
 *
 * 🔴 **Si se reordena la galería, hay que RENUMERAR los archivos.** El número
 * es la posición, no una etiqueta: una foto que se mueve del puesto 57 al 12
 * pasa a llamarse `012.webp`. Mantener el nombre viejo rompería justo lo que
 * esto viene a dar.
 *
 * ⚠️ **Y por eso CUATRO fotos están dos veces en el repositorio, a propósito.**
 * `04-vista-selva-mar`, `05-camastros-palapa` y `09-entrada-piedra` son además
 * la portada de `/actividades/`, `/reservar/` y `/nosotros/`, y una de ellas
 * ilustra el Day Pass. A ellas se suma `recepcion.webp` —el banner de
 * `/contacto/`—, que desde la sexta tanda está también como `138.webp`. Si esas páginas apuntaran a un número, la próxima
 * reordenación les cambiaría la foto **en silencio**. Cada una conserva su
 * archivo y su ruta de ORIGEN, y la galería usa una copia numerada.
 *
 * 🔴 **La garantía es de CÓDIGO FUENTE, no de URL, y conviene no confundirse.**
 * Astro deduplica por contenido: como la copia y el original son idénticos byte
 * a byte, el build emite UN solo archivo, y el nombre que gana es arbitrario.
 * Comprobado en producción: `/actividades/` sirve hoy `042.webp` y `/reservar/`
 * sirve `043.webp`, aunque sus vistas importen `04-vista-selva-mar.webp` y
 * `05-camastros-palapa.webp`. Eso **no rompe nada**: el día que se renumere, esas
 * vistas seguirán importando su archivo de siempre y enseñando su foto de
 * siempre; lo único que cambiará es con qué nombre sale del build, que es un
 * detalle de empaquetado y no algo a lo que nadie apunte.
 *
 * Al visitante la duplicación no le cuesta un byte, justamente por esa
 * deduplicación. Lo que se duplica son 150 KB en el repositorio, y compran que
 * una reordenación de la galería no pueda tocar cuatro páginas que no lo son.
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




import foto001 from '../assets/galeria/numeradas/001.webp';
import foto002 from '../assets/galeria/numeradas/002.webp';
import foto003 from '../assets/galeria/numeradas/003.webp';
import foto004 from '../assets/galeria/numeradas/004.webp';
import foto005 from '../assets/galeria/numeradas/005.webp';
import foto006 from '../assets/galeria/numeradas/006.webp';
import foto007 from '../assets/galeria/numeradas/007.webp';
import foto008 from '../assets/galeria/numeradas/008.webp';
import foto009 from '../assets/galeria/numeradas/009.webp';
import foto010 from '../assets/galeria/numeradas/010.webp';
import foto011 from '../assets/galeria/numeradas/011.webp';
import foto012 from '../assets/galeria/numeradas/012.webp';
import foto013 from '../assets/galeria/numeradas/013.webp';
import foto014 from '../assets/galeria/numeradas/014.webp';
import foto015 from '../assets/galeria/numeradas/015.webp';
import foto016 from '../assets/galeria/numeradas/016.webp';
import foto017 from '../assets/galeria/numeradas/017.webp';
import foto018 from '../assets/galeria/numeradas/018.webp';
import foto019 from '../assets/galeria/numeradas/019.webp';
import foto020 from '../assets/galeria/numeradas/020.webp';
import foto021 from '../assets/galeria/numeradas/021.webp';
import foto022 from '../assets/galeria/numeradas/022.webp';
import foto023 from '../assets/galeria/numeradas/023.webp';
import foto024 from '../assets/galeria/numeradas/024.webp';
import foto025 from '../assets/galeria/numeradas/025.webp';
import foto026 from '../assets/galeria/numeradas/026.webp';
import foto027 from '../assets/galeria/numeradas/027.webp';
import foto028 from '../assets/galeria/numeradas/028.webp';
import foto029 from '../assets/galeria/numeradas/029.webp';
import foto030 from '../assets/galeria/numeradas/030.webp';
import foto031 from '../assets/galeria/numeradas/031.webp';
import foto032 from '../assets/galeria/numeradas/032.webp';
import foto033 from '../assets/galeria/numeradas/033.webp';
import foto034 from '../assets/galeria/numeradas/034.webp';
import foto035 from '../assets/galeria/numeradas/035.webp';
import foto036 from '../assets/galeria/numeradas/036.webp';
import foto037 from '../assets/galeria/numeradas/037.webp';
import foto038 from '../assets/galeria/numeradas/038.webp';
import foto039 from '../assets/galeria/numeradas/039.webp';
import foto040 from '../assets/galeria/numeradas/040.webp';
import foto041 from '../assets/galeria/numeradas/041.webp';
import foto042 from '../assets/galeria/numeradas/042.webp';
import foto043 from '../assets/galeria/numeradas/043.webp';
import foto044 from '../assets/galeria/numeradas/044.webp';
import foto045 from '../assets/galeria/numeradas/045.webp';
import foto046 from '../assets/galeria/numeradas/046.webp';
import foto047 from '../assets/galeria/numeradas/047.webp';
import foto048 from '../assets/galeria/numeradas/048.webp';
import foto049 from '../assets/galeria/numeradas/049.webp';
import foto050 from '../assets/galeria/numeradas/050.webp';
import foto051 from '../assets/galeria/numeradas/051.webp';
import foto052 from '../assets/galeria/numeradas/052.webp';
import foto053 from '../assets/galeria/numeradas/053.webp';
import foto054 from '../assets/galeria/numeradas/054.webp';
import foto055 from '../assets/galeria/numeradas/055.webp';
import foto056 from '../assets/galeria/numeradas/056.webp';
import foto057 from '../assets/galeria/numeradas/057.webp';
import foto058 from '../assets/galeria/numeradas/058.webp';
import foto059 from '../assets/galeria/numeradas/059.webp';
import foto060 from '../assets/galeria/numeradas/060.webp';
import foto061 from '../assets/galeria/numeradas/061.webp';
import foto062 from '../assets/galeria/numeradas/062.webp';
import foto063 from '../assets/galeria/numeradas/063.webp';
import foto064 from '../assets/galeria/numeradas/064.webp';
import foto065 from '../assets/galeria/numeradas/065.webp';
import foto066 from '../assets/galeria/numeradas/066.webp';
import foto067 from '../assets/galeria/numeradas/067.webp';
import foto068 from '../assets/galeria/numeradas/068.webp';
import foto069 from '../assets/galeria/numeradas/069.webp';
import foto070 from '../assets/galeria/numeradas/070.webp';
import foto071 from '../assets/galeria/numeradas/071.webp';
import foto072 from '../assets/galeria/numeradas/072.webp';
import foto073 from '../assets/galeria/numeradas/073.webp';
import foto074 from '../assets/galeria/numeradas/074.webp';
import foto075 from '../assets/galeria/numeradas/075.webp';
import foto076 from '../assets/galeria/numeradas/076.webp';
import foto077 from '../assets/galeria/numeradas/077.webp';
import foto078 from '../assets/galeria/numeradas/078.webp';
import foto079 from '../assets/galeria/numeradas/079.webp';
import foto080 from '../assets/galeria/numeradas/080.webp';
import foto081 from '../assets/galeria/numeradas/081.webp';
import foto082 from '../assets/galeria/numeradas/082.webp';
import foto083 from '../assets/galeria/numeradas/083.webp';
import foto084 from '../assets/galeria/numeradas/084.webp';
import foto085 from '../assets/galeria/numeradas/085.webp';
import foto086 from '../assets/galeria/numeradas/086.webp';
import foto087 from '../assets/galeria/numeradas/087.webp';
import foto088 from '../assets/galeria/numeradas/088.webp';
import foto089 from '../assets/galeria/numeradas/089.webp';
import foto090 from '../assets/galeria/numeradas/090.webp';
import foto091 from '../assets/galeria/numeradas/091.webp';
import foto092 from '../assets/galeria/numeradas/092.webp';
import foto093 from '../assets/galeria/numeradas/093.webp';
import foto094 from '../assets/galeria/numeradas/094.webp';
import foto095 from '../assets/galeria/numeradas/095.webp';
import foto096 from '../assets/galeria/numeradas/096.webp';
import foto097 from '../assets/galeria/numeradas/097.webp';
import foto098 from '../assets/galeria/numeradas/098.webp';
import foto099 from '../assets/galeria/numeradas/099.webp';
import foto100 from '../assets/galeria/numeradas/100.webp';
import foto101 from '../assets/galeria/numeradas/101.webp';
import foto102 from '../assets/galeria/numeradas/102.webp';
import foto103 from '../assets/galeria/numeradas/103.webp';
import foto104 from '../assets/galeria/numeradas/104.webp';
import foto105 from '../assets/galeria/numeradas/105.webp';
import foto106 from '../assets/galeria/numeradas/106.webp';
import foto107 from '../assets/galeria/numeradas/107.webp';
import foto108 from '../assets/galeria/numeradas/108.webp';
import foto109 from '../assets/galeria/numeradas/109.webp';
import foto110 from '../assets/galeria/numeradas/110.webp';
import foto111 from '../assets/galeria/numeradas/111.webp';
import foto112 from '../assets/galeria/numeradas/112.webp';
import foto113 from '../assets/galeria/numeradas/113.webp';
import foto114 from '../assets/galeria/numeradas/114.webp';
import foto115 from '../assets/galeria/numeradas/115.webp';
import foto116 from '../assets/galeria/numeradas/116.webp';
import foto117 from '../assets/galeria/numeradas/117.webp';
import foto118 from '../assets/galeria/numeradas/118.webp';
import foto119 from '../assets/galeria/numeradas/119.webp';
import foto120 from '../assets/galeria/numeradas/120.webp';
import foto121 from '../assets/galeria/numeradas/121.webp';
import foto122 from '../assets/galeria/numeradas/122.webp';
import foto123 from '../assets/galeria/numeradas/123.webp';
import foto124 from '../assets/galeria/numeradas/124.webp';
import foto125 from '../assets/galeria/numeradas/125.webp';
import foto126 from '../assets/galeria/numeradas/126.webp';
import foto127 from '../assets/galeria/numeradas/127.webp';
import foto128 from '../assets/galeria/numeradas/128.webp';
import foto129 from '../assets/galeria/numeradas/129.webp';
import foto130 from '../assets/galeria/numeradas/130.webp';
import foto131 from '../assets/galeria/numeradas/131.webp';
import foto132 from '../assets/galeria/numeradas/132.webp';
import foto133 from '../assets/galeria/numeradas/133.webp';
import foto134 from '../assets/galeria/numeradas/134.webp';
import foto135 from '../assets/galeria/numeradas/135.webp';
import foto136 from '../assets/galeria/numeradas/136.webp';
import foto137 from '../assets/galeria/numeradas/137.webp';
import foto138 from '../assets/galeria/numeradas/138.webp';
import foto139 from '../assets/galeria/numeradas/139.webp';
import foto140 from '../assets/galeria/numeradas/140.webp';
import foto141 from '../assets/galeria/numeradas/141.webp';
import foto142 from '../assets/galeria/numeradas/142.webp';
import foto143 from '../assets/galeria/numeradas/143.webp';
import foto144 from '../assets/galeria/numeradas/144.webp';
import foto145 from '../assets/galeria/numeradas/145.webp';
import foto146 from '../assets/galeria/numeradas/146.webp';
import foto147 from '../assets/galeria/numeradas/147.webp';
import foto148 from '../assets/galeria/numeradas/148.webp';
import foto149 from '../assets/galeria/numeradas/149.webp';
import foto150 from '../assets/galeria/numeradas/150.webp';

type Texto = Record<Idioma, string>;

export const fotos: { imagen: ImageMetadata; alt: Texto }[] = [
  {
    imagen: foto001,
    alt: {
      es: 'El mar y la arena, con una palmera en primer plano.',
      en: 'The sea and the sand, with a palm tree in the foreground.',
    },
  },
  {
    imagen: foto002,
    alt: {
      es: 'Atardecer nublado sobre el mar, con el sol bajo en el horizonte.',
      en: 'A cloudy sunset over the sea, the sun low on the horizon.',
    },
  },
  {
    imagen: foto003,
    alt: {
      es: 'Entrada del hotel con el rótulo y una guirnalda de banderines de papel picado.',
      en: 'The hotel entrance with its sign and a garland of papel picado bunting.',
    },
  },
  {
    imagen: foto004,
    alt: {
      es: 'Andador de madera con barandal entre la vegetación, bajo un techo de vigas.',
      en: 'A wooden walkway with a railing through the greenery, under a beamed roof.',
    },
  },
  {
    imagen: foto005,
    alt: {
      es: 'Cama bajo dosel, tras una cortina blanca.',
      en: 'A four-poster bed, behind a white curtain.',
    },
  },
  {
    imagen: foto006,
    alt: {
      es: 'Detalle del lavabo: grifo de latón, vaso de cristal y jabón sobre la piedra.',
      en: 'Washbasin detail: brass tap, glass tumbler and soap on the stone.',
    },
  },
  {
    imagen: foto007,
    alt: {
      es: 'Regadera de latón sobre un banco de piedra.',
      en: 'A brass shower above a stone bench.',
    },
  },
  {
    imagen: foto008,
    alt: {
      es: 'Pasillo del cuarto con el clóset abierto y una lámpara colgante.',
      en: 'The room passage with the closet open and a hanging lamp.',
    },
  },
  {
    imagen: foto009,
    alt: {
      es: 'Doble lavabo de piedra con dos espejos y apliques de pared.',
      en: 'A double stone washbasin with two mirrors and wall sconces.',
    },
  },
  {
    imagen: foto010,
    alt: {
      es: 'Escritorio de madera junto al ventanal del balcón.',
      en: 'A wooden desk beside the balcony window wall.',
    },
  },
  {
    imagen: foto011,
    alt: {
      es: 'La calle frente al hotel, con palmeras y los locales de la acera.',
      en: 'The street in front of the hotel, with palm trees and the shopfronts along it.',
    },
  },
  {
    imagen: foto012,
    alt: {
      es: 'Arco de piedra con el rótulo del hotel, y detrás la alberca y las palmeras.',
      en: 'Stone arch bearing the hotel sign, with the pool and the palm trees behind it.',
    },
  },
  {
    imagen: foto013,
    alt: {
      es: 'Recepción del hotel: el mostrador de madera con el logotipo detrás, y las bancas de la sala.',
      en: 'The hotel reception: the wooden counter with the logo behind it, and the seating benches.',
    },
  },
  {
    imagen: foto014,
    alt: {
      es: 'Fachada del hotel con su rótulo, los banderines de papel picado y las columnas de madera.',
      en: 'The hotel facade with its sign, papel picado bunting and wooden columns.',
    },
  },
  {
    imagen: foto015,
    alt: {
      es: 'Patio interior con palmeras altas entre los ventanales de madera del hotel.',
      en: 'Inner courtyard with tall palms between the hotel wooden window fronts.',
    },
  },
  {
    imagen: foto016,
    alt: {
      es: 'Pozo de piedra con dintel de madera, rodeado de vegetación.',
      en: 'A stone well with a wooden lintel, surrounded by greenery.',
    },
  },
  {
    imagen: foto017,
    alt: {
      es: 'Sendero de piedra entre palmeras, hacia los bungalows.',
      en: 'A stone path between palm trees, leading to the bungalows.',
    },
  },
  {
    imagen: foto018,
    alt: {
      es: 'Las terrazas de las habitaciones con sus hamacas, vistas entre la vegetación.',
      en: 'The room terraces with their hammocks, seen through the greenery.',
    },
  },
  {
    imagen: foto019,
    alt: {
      es: 'Columna de piedra entre plantas tropicales.',
      en: 'A stone column among tropical plants.',
    },
  },
  {
    imagen: foto020,
    alt: {
      es: 'Cerca de bambú y vegetación junto a un muro claro.',
      en: 'A bamboo fence and greenery beside a pale wall.',
    },
  },
  {
    imagen: foto021,
    alt: {
      es: 'Andador entre los edificios del hotel, con vegetación a los lados.',
      en: 'A walkway between the hotel buildings, with greenery on both sides.',
    },
  },
  {
    imagen: foto022,
    alt: {
      es: 'Alberca de borde infinito entre las palmeras, con la playa y el mar justo detrás.',
      en: 'An infinity-edge pool among the palm trees, with the beach and the sea right behind.',
    },
  },
  {
    imagen: foto023,
    alt: {
      es: 'La alberca bajo la pérgola de troncos, vista a lo largo desde un extremo.',
      en: 'The pool under the timber pergola, seen lengthwise from one end.',
    },
  },
  {
    imagen: foto024,
    alt: {
      es: 'Cama de playa con cojines bajo una sombrilla, con un sombrero de palma, una bebida y un teléfono encima.',
      en: 'A beach bed with cushions under a parasol, with a straw hat, a drink and a phone on it.',
    },
  },
  {
    imagen: foto025,
    alt: {
      es: 'Camas de playa con colchón y cojines bajo sombrillas blancas, sobre la arena.',
      en: 'Beach beds with mattresses and cushions under white parasols, on the sand.',
    },
  },
  {
    imagen: foto026,
    alt: {
      es: 'El arco de piedra con el logotipo del hotel, las palmeras y los camastros en la arena.',
      en: 'The stone arch bearing the hotel logo, the palm trees and the loungers on the sand.',
    },
  },
  {
    imagen: foto027,
    alt: {
      es: 'Edificio blanco del hotel con sus balcones, entre la vegetación del jardín.',
      en: 'A white hotel building with its balconies, among the garden greenery.',
    },
  },
  {
    imagen: foto028,
    alt: {
      es: 'Paso de arena entre los edificios blancos, con la vegetación a los lados y el mar al fondo.',
      en: 'A sand path between the white buildings, with greenery on both sides and the sea at the end.',
    },
  },
  {
    imagen: foto029,
    alt: {
      es: 'Mesa alta de madera con cocos verdes y banquetas, en una terraza frente a las palmeras y el mar.',
      en: 'A tall wooden table with green coconuts and stools, on a terrace facing the palms and the sea.',
    },
  },
  {
    imagen: foto030,
    alt: {
      es: 'El arco de piedra en la arena, con un tronco seco, la vegetación de la duna y el mar.',
      en: 'The stone arch on the sand, with a piece of driftwood, the dune greenery and the sea.',
    },
  },
  {
    imagen: foto031,
    alt: {
      es: 'Vista aérea en vertical: las palmas del jardín, los edificios del hotel y la franja del mar.',
      en: 'Vertical aerial view: the garden palms, the hotel buildings and the band of sea.',
    },
  },
  {
    imagen: foto032,
    alt: {
      es: 'Vista desde lo alto: los techos de palma del hotel entre las palmeras, y el mar al fondo.',
      en: 'View from above: the hotel palm-thatched roofs among the palm trees, with the sea beyond.',
    },
  },
  {
    imagen: foto033,
    alt: {
      es: 'El agua turquesa de la alberca de la azotea, con los camastros y la franja del mar arriba.',
      en: 'The turquoise water of the rooftop pool, with the loungers and the band of sea above.',
    },
  },
  {
    imagen: foto034,
    alt: {
      es: 'Duela de la azotea con camastros alineados frente a la barandilla y el mar.',
      en: 'Rooftop decking with loungers lined up facing the railing and the sea.',
    },
  },
  {
    imagen: foto035,
    alt: {
      es: 'Terraza de madera en la azotea con una hamaca colgada y dos sillas de tijera.',
      en: 'A wooden rooftop terrace with a hanging hammock and two folding deck chairs.',
    },
  },
  {
    imagen: foto036,
    alt: {
      es: 'Alberca de la azotea con el muro de piedra caliza y el mar abierto al fondo.',
      en: 'The rooftop pool with its limestone wall and the open sea beyond.',
    },
  },
  {
    imagen: foto037,
    alt: {
      es: 'La alberca de la azotea desde un extremo, con la fila de camastros y el horizonte del mar.',
      en: 'The rooftop pool seen from one end, with the row of loungers and the sea horizon.',
    },
  },
  {
    imagen: foto038,
    alt: {
      es: 'Alberca alargada en la azotea, con pérgola de madera, duela y camastros mirando al mar.',
      en: 'The long rooftop pool, with a wooden pergola, decking and loungers facing the sea.',
    },
  },
  {
    imagen: foto039,
    alt: {
      es: 'Los edificios del hotel entre las palmeras, desde el jardín.',
      en: 'The hotel buildings among the palms, seen from the garden.',
    },
  },
  {
    imagen: foto040,
    alt: {
      es: 'La hamaca del balcón, vista desde dentro del cuarto.',
      en: 'The balcony hammock, seen from inside the room.',
    },
  },
  {
    imagen: foto041,
    alt: {
      es: 'Amanecer anaranjado sobre las olas.',
      en: 'An orange sunrise over the waves.',
    },
  },
  {
    imagen: foto042,
    alt: {
      es: 'Balcón con dos sillas y las palmeras, visto desde el cuarto.',
      en: 'A balcony with two chairs and the palms, seen from the room.',
    },
  },
  {
    imagen: foto043,
    alt: {
      es: 'El mar y el arco de piedra, desde un balcón de madera.',
      en: 'The sea and the stone arch, from a wooden balcony.',
    },
  },
  {
    imagen: foto044,
    alt: {
      es: 'Columna de piedra y vegetación junto a la terraza.',
      en: 'A stone column and greenery beside the terrace.',
    },
  },
  {
    imagen: foto045,
    alt: {
      es: 'Terraza bajo palapa con dos sillas de tijera, frente al mar.',
      en: 'A palm-thatched terrace with two folding chairs, facing the sea.',
    },
  },
  {
    imagen: foto046,
    alt: {
      es: 'Escalera exterior con una columna de piedra y vegetación.',
      en: 'An outdoor staircase with a stone column and greenery.',
    },
  },
  {
    imagen: foto047,
    alt: {
      es: 'Escalera de piedra con barandal de troncos.',
      en: 'A stone staircase with a railing of tree trunks.',
    },
  },
  {
    imagen: foto048,
    alt: {
      es: 'Balcón de barandal blanco, sobre la vegetación del jardín.',
      en: 'A balcony with a white balustrade, above the garden greenery.',
    },
  },
  {
    imagen: foto049,
    alt: {
      es: 'Cortina y ventanal hacia el balcón de barandal blanco.',
      en: 'A curtain and window wall onto the balcony with its white balustrade.',
    },
  },
  {
    imagen: foto050,
    alt: {
      es: 'La luna llena sobre el mar, entre nubes.',
      en: 'A full moon over the sea, through the clouds.',
    },
  },
  {
    imagen: foto051,
    alt: {
      es: 'La alberca de noche, con las palmeras iluminadas alrededor.',
      en: 'The pool at night, with the palms lit around it.',
    },
  },
  {
    imagen: foto052,
    alt: {
      es: 'Cielo nocturno con las palmeras recortadas contra las estrellas.',
      en: 'A night sky with the palms silhouetted against the stars.',
    },
  },
  {
    imagen: foto053,
    alt: {
      es: 'Cabecera de paneles de madera, iluminada desde abajo.',
      en: 'A headboard of wooden panels, lit from below.',
    },
  },
  {
    imagen: foto054,
    alt: {
      es: 'Cortinas entreabiertas hacia el balcón y las palmeras.',
      en: 'Curtains half-drawn onto the balcony and the palm trees.',
    },
  },
  {
    imagen: foto055,
    alt: {
      es: 'El balcón al atardecer desde dentro del cuarto, con dos sillas.',
      en: 'The balcony at sunset from inside the room, with two chairs.',
    },
  },
  {
    imagen: foto056,
    alt: {
      es: 'Habitación en penumbra, con el ventanal abierto al atardecer.',
      en: 'A dim room, with the window wall open onto the sunset.',
    },
  },
  {
    imagen: foto057,
    alt: {
      es: 'Terraza corrida con barandal blanco y las palmeras del jardín.',
      en: 'A long terrace with a white balustrade and the garden palms.',
    },
  },
  {
    imagen: foto058,
    alt: {
      es: 'Un pájaro posado en el barandal del balcón, con el mar detrás.',
      en: 'A bird perched on the balcony railing, with the sea behind.',
    },
  },
  {
    imagen: foto059,
    alt: {
      es: 'Hamaca en un balcón de madera, con las palmeras y el mar.',
      en: 'A hammock on a wooden balcony, with the palms and the sea.',
    },
  },
  {
    imagen: foto060,
    alt: {
      es: 'Camastros bajo una pérgola de madera, al atardecer.',
      en: 'Loungers under a wooden pergola, at sunset.',
    },
  },
  {
    imagen: foto061,
    alt: {
      es: 'Una palmera y el mar, desde un balcón de barandal blanco.',
      en: 'A palm tree and the sea, from a balcony with a white balustrade.',
    },
  },
  {
    imagen: foto062,
    alt: {
      es: 'Estar interior con sillones de madera y muro de piedra.',
      en: 'An interior lounge with wooden armchairs and a stone wall.',
    },
  },
  {
    imagen: foto063,
    alt: {
      es: 'El fondo de arena de la alberca, con conchas incrustadas.',
      en: 'The sandy bottom of the pool, with shells set into it.',
    },
  },
  {
    imagen: foto064,
    alt: {
      es: 'Una palmera plantada dentro de la alberca, en su propio brocal.',
      en: 'A palm tree planted inside the pool, in its own kerb.',
    },
  },
  {
    imagen: foto065,
    alt: {
      es: 'Borde de la alberca, con arena y conchas incrustadas.',
      en: 'The edge of the pool, with sand and embedded shells.',
    },
  },
  {
    imagen: foto066,
    alt: {
      es: 'Pasillo interior con paneles de bambú y una puerta de madera.',
      en: 'An interior passage with bamboo panels and a wooden door.',
    },
  },
  {
    imagen: foto067,
    alt: {
      es: 'Pasaderas de piedra dentro del agua de la alberca.',
      en: 'Stone stepping stones set into the water of the pool.',
    },
  },
  {
    imagen: foto068,
    alt: {
      es: 'Terraza sobre las copas de las palmeras, con el mar al fondo.',
      en: 'A terrace above the palm crowns, with the sea beyond.',
    },
  },
  {
    imagen: foto069,
    alt: {
      es: 'Entarimado con barandal, y el mar entre las palmeras.',
      en: 'Decking with a railing, and the sea between the palm trees.',
    },
  },
  {
    imagen: foto070,
    alt: {
      es: 'Paso estrecho entre un muro de piedra y una cerca de bambú.',
      en: 'A narrow passage between a stone wall and a bamboo fence.',
    },
  },
  {
    imagen: foto071,
    alt: {
      es: 'Entarimado de madera junto a la alberca, con el mar al fondo.',
      en: 'Wooden decking beside the pool, with the sea beyond.',
    },
  },
  {
    imagen: foto072,
    alt: {
      es: 'Mesa de madera en la terraza, con las palmeras y el mar detrás.',
      en: 'A wooden table on the terrace, with the palms and the sea behind.',
    },
  },
  {
    imagen: foto073,
    alt: {
      es: 'El Caribe turquesa, sin orilla a la vista.',
      en: 'The turquoise Caribbean, with no shore in sight.',
    },
  },
  {
    imagen: foto074,
    alt: {
      es: 'Cortinas abiertas al atardecer, con el mar al fondo.',
      en: 'Curtains open onto the sunset, with the sea beyond.',
    },
  },
  {
    imagen: foto075,
    alt: {
      es: 'Terraza de azotea con un camastro blanco y cojines, bajo el alero de palma.',
      en: 'A rooftop terrace with a white daybed and cushions, under the palm eaves.',
    },
  },
  {
    imagen: foto076,
    alt: {
      es: 'Barandal de madera y troncos, con la vegetación del jardín detrás.',
      en: 'A wooden and log railing, with the garden greenery behind it.',
    },
  },
  {
    imagen: foto077,
    alt: {
      es: 'Dos camastros de tejido en una terraza techada de palma, mirando a las palmeras y al mar.',
      en: 'Two woven loungers on a palm-thatched terrace, looking out to the palm trees and the sea.',
    },
  },
  {
    imagen: foto078,
    alt: {
      es: 'Detalle de los candados encadenados alrededor del tronco.',
      en: 'A close-up of the padlocks chained around the trunk.',
    },
  },
  {
    imagen: foto079,
    alt: {
      es: 'La fachada del hotel con el rótulo «Azucar Hotel Tulum» sobre las columnas.',
      en: 'The hotel facade with the “Azucar Hotel Tulum” sign above the columns.',
    },
  },
  {
    imagen: foto080,
    alt: {
      es: 'Acceso al hotel con la bandera de México y el rótulo sobre la escalera de madera.',
      en: 'The hotel entrance with the Mexican flag and the sign above the wooden staircase.',
    },
  },
  {
    imagen: foto081,
    alt: {
      es: 'Sendero de cemento entre la vegetación, hacia el interior del hotel.',
      en: 'A concrete path through the greenery, leading into the hotel.',
    },
  },
  {
    imagen: foto082,
    alt: {
      es: 'La fachada de las habitaciones con sus balcones, entre las palmeras.',
      en: 'The facade of the rooms with their balconies, among the palm trees.',
    },
  },
  {
    imagen: foto083,
    alt: {
      es: 'Escalera de madera entre la vegetación, con una enredadera cubriendo el muro.',
      en: 'A wooden staircase among the greenery, with a creeper covering the wall.',
    },
  },
  {
    imagen: foto084,
    alt: {
      es: 'Jardín de palmeras con un edificio de piedra al fondo.',
      en: 'A palm garden with a stone building behind.',
    },
  },
  {
    imagen: foto085,
    alt: {
      es: 'Jardín con un tronco a la deriva sobre la arena y una escalera al fondo.',
      en: 'A garden with a piece of driftwood on the sand and a staircase behind.',
    },
  },
  {
    imagen: foto086,
    alt: {
      es: 'Dos sillas de madera y una mesa de mimbre en un entarimado, junto a un muro claro.',
      en: 'Two wooden chairs and a wicker table on a deck, beside a pale wall.',
    },
  },
  {
    imagen: foto087,
    alt: {
      es: 'Ventana vertical que enmarca las palmas de la selva.',
      en: 'A tall window framing the palms of the jungle.',
    },
  },
  {
    imagen: foto088,
    alt: {
      es: 'Pasillo en penumbra que se abre a un balcón con una silla y el mar al fondo.',
      en: 'A dim passage opening onto a balcony with a chair and the sea beyond.',
    },
  },
  {
    imagen: foto089,
    alt: {
      es: 'Habitación con techo de madera y salida al balcón, con el mar al fondo.',
      en: 'A room with a wooden ceiling and a way out to the balcony, the sea beyond.',
    },
  },
  {
    imagen: foto090,
    alt: {
      es: 'Jacuzzi de mosaico en una terraza de piedra.',
      en: 'A mosaic jacuzzi on a stone terrace.',
    },
  },
  {
    imagen: foto091,
    alt: {
      es: 'Regadera de latón, con una ventana al mar.',
      en: 'A brass shower, with a window onto the sea.',
    },
  },
  {
    imagen: foto092,
    alt: {
      es: 'Regadera con las toallas colgadas en el muro de piedra.',
      en: 'A shower with the towels hung on the stone wall.',
    },
  },
  {
    imagen: foto093,
    alt: {
      es: 'Lavabo de piedra con espejo y una repisa de madera.',
      en: 'A stone washbasin with a mirror and a wooden shelf.',
    },
  },
  {
    imagen: foto094,
    alt: {
      es: 'Lavabo de piedra ante el ventanal.',
      en: 'A stone washbasin in front of the window wall.',
    },
  },
  {
    imagen: foto095,
    alt: {
      es: 'Cama con cabecera de listones de madera, bajo un techo de vigas.',
      en: 'A bed with a slatted wooden headboard, under a beamed ceiling.',
    },
  },
  {
    imagen: foto096,
    alt: {
      es: 'Habitación con cama, ventilador de techo y ventanal al balcón.',
      en: 'A room with a bed, a ceiling fan and a window wall onto the balcony.',
    },
  },
  {
    imagen: foto097,
    alt: {
      es: 'Clóset abierto de madera, vacío.',
      en: 'An open wooden closet, empty.',
    },
  },
  {
    imagen: foto098,
    alt: {
      es: 'Pasillo interior hacia el lavabo, con la puerta abierta al fondo.',
      en: 'An interior passage to the washbasin, with the door open at the end.',
    },
  },
  {
    imagen: foto099,
    alt: {
      es: 'Alberca alargada en la azotea, con pérgola de madera, camastros y el mar al fondo.',
      en: 'A long rooftop pool, with a wooden pergola, loungers and the sea beyond.',
    },
  },
  {
    imagen: foto100,
    alt: {
      es: 'Tumbonas de tijera en el entarimado de la azotea, frente al barandal y el mar.',
      en: 'Folding deckchairs on the rooftop decking, facing the railing and the sea.',
    },
  },
  {
    imagen: foto101,
    alt: {
      es: 'Dos hamacas de red atadas entre palmeras, sobre la arena.',
      en: 'Two net hammocks slung between palm trees, over the sand.',
    },
  },
  {
    imagen: foto102,
    alt: {
      es: 'Hamacas blancas colgadas bajo la pérgola de la azotea, sobre el entarimado de madera.',
      en: 'White hammocks hung under the rooftop pergola, above the wooden decking.',
    },
  },
  {
    imagen: foto103,
    alt: {
      es: 'Barra de madera con bancos altos y cocos verdes, frente a las palmeras y el mar.',
      en: 'A wooden bar with high stools and green coconuts, facing the palms and the sea.',
    },
  },
  {
    imagen: foto104,
    alt: {
      es: 'La selva de Tulum vista desde lo alto, bajo el alero de palma de una terraza.',
      en: 'The Tulum jungle seen from above, under the palm eaves of a terrace.',
    },
  },
  {
    imagen: foto105,
    alt: {
      es: 'Las copas de las palmas de la selva desde un balcón de barandal blanco.',
      en: 'The crowns of the jungle palms from a balcony with a white balustrade.',
    },
  },
  {
    imagen: foto106,
    alt: {
      es: 'La alberca de la azotea desde el otro extremo, con los camastros alineados a un lado.',
      en: 'The rooftop pool from the far end, with the loungers lined up along one side.',
    },
  },
  {
    imagen: foto107,
    alt: {
      es: 'Estar abierto con bancas y butacas de madera, junto al andador del jardín.',
      en: 'An open lounge with wooden benches and armchairs, beside the garden walkway.',
    },
  },
  {
    imagen: foto108,
    alt: {
      es: 'Sala de estar con sillones de madera, ventanales y ventilador de techo.',
      en: 'A sitting room with wooden armchairs, large windows and a ceiling fan.',
    },
  },
  {
    imagen: foto109,
    alt: {
      es: 'Pasillo con columnas de troncos, abierto al jardín de palmeras.',
      en: 'A passage lined with tree-trunk columns, open to the palm garden.',
    },
  },
  {
    imagen: foto110,
    alt: {
      es: 'Cama frente a un ventanal, con una hamaca en el balcón y el mar entre las palmas.',
      en: 'A bed facing a window wall, with a hammock on the balcony and the sea between the palms.',
    },
  },
  {
    imagen: foto111,
    alt: {
      es: 'Baño con puertas de madera y una tina de obra con borde de madera.',
      en: 'A bathroom with wooden doors and a masonry bathtub edged in wood.',
    },
  },
  {
    imagen: foto112,
    alt: {
      es: 'Puerta de madera de la habitación 301, con un colgante de macramé encima.',
      en: 'The wooden door of room 301, with a macramé hanging above it.',
    },
  },
  {
    imagen: foto113,
    alt: {
      es: 'Paso de acceso entre plantas, con muro de piedra y puerta de madera.',
      en: 'An entrance passage between plants, with a stone wall and a wooden door.',
    },
  },
  {
    imagen: foto114,
    alt: {
      es: 'Interior en penumbra con lámpara colgante, abierto a una terraza con sillones.',
      en: 'A dim interior with a hanging lamp, opening onto a terrace with armchairs.',
    },
  },
  {
    imagen: foto115,
    alt: {
      es: 'Candados atados a un tronco, con la fachada del hotel desenfocada detrás.',
      en: 'Padlocks tied to a tree trunk, with the hotel facade blurred behind.',
    },
  },
  {
    imagen: foto116,
    alt: {
      es: 'El elevador del hotel, con marco de madera y la señalética de las escaleras.',
      en: 'The hotel lift, with a wooden frame and the stairs signage beside it.',
    },
  },
  {
    imagen: foto117,
    alt: {
      es: 'Vista desde lo alto: las palmas del jardín del hotel y, detrás, la franja azul del Caribe.',
      en: 'View from above: the palms of the hotel garden and, beyond them, the blue band of the Caribbean.',
    },
  },
  {
    imagen: foto118,
    alt: {
      es: 'La alberca del roof top de noche, iluminada por dentro y por las luces empotradas en su muro.',
      en: 'The rooftop pool at night, lit from within and by the lights set into its wall.',
    },
  },
  {
    imagen: foto119,
    alt: {
      es: 'Acceso de piedra caliza a la playa, con vegetación a los lados y una escalera de madera al fondo.',
      en: 'Limestone passage down to the beach, with greenery on both sides and a wooden staircase at the end.',
    },
  },
  {
    imagen: foto120,
    alt: {
      es: 'Escalera de caracol de madera, vista desde arriba.',
      en: 'A wooden spiral staircase, seen from above.',
    },
  },
  {
    imagen: foto121,
    alt: {
      es: 'Fachada con puertas de madera abiertas y escalones de piedra.',
      en: 'A facade with open wooden doors and stone steps.',
    },
  },
  {
    imagen: foto122,
    alt: {
      es: 'Arco de piedra en la playa entre las palmeras, al atardecer.',
      en: 'A stone arch on the beach between the palms, at sunset.',
    },
  },
  {
    imagen: foto123,
    alt: {
      es: 'Paso entre muros de piedra, con vegetación a los lados.',
      en: 'A passage between stone walls, with greenery on both sides.',
    },
  },
  {
    imagen: foto124,
    alt: {
      es: 'Regadera de latón en un baño de piedra.',
      en: 'A brass shower in a stone bathroom.',
    },
  },
  {
    imagen: foto125,
    alt: {
      es: 'Paso estrecho hacia la regadera, con muros de piedra.',
      en: 'A narrow passage to the shower, with stone walls.',
    },
  },
  {
    imagen: foto126,
    alt: {
      es: 'Habitación con cama y ventanal, y una banca de madera a los pies.',
      en: 'A room with a bed and a window wall, and a wooden bench at its foot.',
    },
  },
  {
    imagen: foto127,
    alt: {
      es: 'El termostato del aire acondicionado de la habitación, marcando 27.5 grados.',
      en: 'The room air-conditioning thermostat, reading 27.5 degrees.',
    },
  },
  {
    imagen: foto128,
    alt: {
      es: 'Puerta de madera de la habitación, junto a un muro de piedra.',
      en: 'The wooden door of the room, beside a stone wall.',
    },
  },
  {
    imagen: foto129,
    alt: {
      es: 'Cama junto al ventanal, con las cortinas abiertas al balcón.',
      en: 'A bed beside the window wall, curtains open onto the balcony.',
    },
  },
  {
    imagen: foto130,
    alt: {
      es: 'Clóset abierto de madera, con cajones y repisas.',
      en: 'An open wooden closet, with drawers and shelves.',
    },
  },
  {
    imagen: foto131,
    alt: {
      es: 'Cama con lámpara colgante y un espejo sobre la cabecera.',
      en: 'A bed with a hanging lamp and a mirror above the headboard.',
    },
  },
  {
    imagen: foto132,
    alt: {
      es: 'Clóset de puertas de madera, junto a una ventana.',
      en: 'A closet with wooden doors, beside a window.',
    },
  },
  {
    imagen: foto133,
    alt: {
      es: 'Cama bajo dosel, tras unas cortinas blancas.',
      en: 'A four-poster bed, behind white curtains.',
    },
  },
  {
    imagen: foto134,
    alt: {
      es: 'Paso hacia la regadera, con una toalla colgada.',
      en: 'The way through to the shower, with a towel hanging.',
    },
  },
  {
    imagen: foto135,
    alt: {
      es: 'Habitación con cama de madera y un sillón junto a la ventana.',
      en: 'A room with a wooden bed and an armchair by the window.',
    },
  },
  {
    imagen: foto136,
    alt: {
      es: 'Habitación con el ventanal abierto al balcón y al mar.',
      en: 'A room with the window wall open onto the balcony and the sea.',
    },
  },
  {
    imagen: foto137,
    alt: {
      es: 'Terraza de madera con palmeras y el mar al fondo.',
      en: 'A wooden terrace with palms and the sea beyond.',
    },
  },
  {
    imagen: foto138,
    alt: {
      es: 'Cortina translúcida ante el ventanal del balcón.',
      en: 'A sheer curtain in front of the balcony window wall.',
    },
  },
  {
    imagen: foto139,
    alt: {
      es: 'Habitación con techo de madera, clóset y salida al balcón.',
      en: 'A room with a wooden ceiling, a closet and a way out to the balcony.',
    },
  },
  {
    imagen: foto140,
    alt: {
      es: 'Arco de piedra con el rótulo del hotel, entre palmeras, con los camastros de la playa y el Caribe detrás.',
      en: 'A stone arch bearing the hotel sign among palm trees, with the beach loungers and the Caribbean behind.',
    },
  },
  {
    imagen: foto141,
    alt: {
      es: 'Camastros de madera junto al borde de la alberca de la azotea, con las palmeras y el mar detrás.',
      en: 'Wooden loungers beside the rooftop pool edge, with the palm trees and the sea behind.',
    },
  },
  {
    imagen: foto142,
    alt: {
      es: 'Vista aérea del hotel entre la vegetación, con la alberca asomando y el Caribe al fondo.',
      en: 'Aerial view of the hotel among the greenery, with the pool showing and the Caribbean beyond.',
    },
  },
  {
    imagen: foto143,
    alt: {
      es: 'Andador entre la vegetación y las palmeras, camino del mar.',
      en: 'A walkway through the greenery and palm trees, heading to the sea.',
    },
  },
  {
    imagen: foto144,
    alt: {
      es: 'El arco de piedra con el rótulo del hotel, la escalera y los camastros sobre la arena.',
      en: 'The stone arch with the hotel sign, the staircase and the loungers on the sand.',
    },
  },
  {
    imagen: foto145,
    alt: {
      es: 'Edificio del hotel con su escalera de madera y su techo de palma, entre las palmeras.',
      en: 'A hotel building with its wooden staircase and palm-thatched roof, among the palm trees.',
    },
  },
  {
    imagen: foto146,
    alt: {
      es: 'Balcón con una hamaca y una silla de madera, con la vegetación al otro lado de la barandilla.',
      en: 'A balcony with a hammock and a wooden chair, greenery beyond the railing.',
    },
  },
  {
    imagen: foto147,
    alt: {
      es: 'Palapa sobre la arena con una hamaca y dos sillas de tijera de madera.',
      en: 'A palapa on the sand with a hammock and two wooden folding chairs.',
    },
  },
  {
    imagen: foto148,
    alt: {
      es: 'Alberca bajo una pérgola de troncos, con los camastros alineados en el borde.',
      en: 'A pool under a timber pergola, with loungers lined along its edge.',
    },
  },
  {
    imagen: foto149,
    alt: {
      es: 'El arco de piedra y la alberca desde la terraza alta, con la playa y el mar al fondo.',
      en: 'The stone arch and the pool from the upper terrace, with the beach and the sea beyond.',
    },
  },
  {
    imagen: foto150,
    alt: {
      es: 'Rincón bajo techo de palma con una hamaca, dos pufs y una mesa baja de madera.',
      en: 'A palm-roofed corner with a hammock, two bean bags and a low wooden table.',
    },
  },
];
