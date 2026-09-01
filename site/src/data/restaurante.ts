/**
 * Carta del restaurante.
 *
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  ⚠️  CONTENIDO DE EJEMPLO — HAY QUE SUSTITUIRLO ANTES DE PRODUCCIÓN       ║
 * ║                                                                          ║
 * ║  Los platos, las descripciones y los precios de abajo **NO son del        ║
 * ║  hotel**: son un relleno plausible para que la página se vea completa y   ║
 * ║  para que editarla sea sólo cambiar textos.                              ║
 * ║                                                                          ║
 * ║  Antes de que el sitio salga a producción hay que reemplazarlos por la    ║
 * ║  carta real. Un huésped que llega esperando un plato que no existe deja   ║
 * ║  la misma reseña mala que el que llega esperando un restaurante que no    ║
 * ║  existe — y ésa es justo la queja que este proyecto vino a corregir.      ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ── CÓMO EDITAR ESTO ───────────────────────────────────────────────────────
 * Todo lo editable está al final del archivo, en `carta`. Sólo hay que tocar
 * los textos entre comillas:
 *
 *   nombre:  el nombre del restaurante, en `es` y en `en`.
 *   categorias: cada bloque es una sección de la carta (Entradas, Principales…).
 *     · `clave`  — identificador interno. Sin espacios, sin acentos. Sólo se
 *                  usa para el `id` del HTML; puede quedarse como está.
 *     · `nombre` — el título que se ve, en los dos idiomas.
 *     · `platos` — la lista. Cada plato tiene:
 *         `nombre`      (obligatorio, los dos idiomas)
 *         `descripcion` (opcional — se puede borrar la línea entera)
 *         `precio`      (opcional — un número, sin `$` ni comas: 320, no "$320")
 *
 * Para AÑADIR un plato: copia un bloque `{ … },` entero y cambia los textos.
 * Para QUITARLO: borra el bloque completo, de `{` a `},`.
 * Para dejar un plato SIN precio: borra la línea `precio: …`.
 *
 * El orden en que aparecen aquí es el orden en que se ven en la página.
 *
 * ── SI SE QUIERE OCULTAR LA PÁGINA ENTERA ──────────────────────────────────
 * `publicable: false` y la página deja de existir: el menú no la enlaza y la
 * URL da 404. Útil si el restaurante cierra por temporada.
 *
 * ── 🔴 LOS PRECIOS Y LOS IMPUESTOS ─────────────────────────────────────────
 * La página imprime «Los precios incluyen impuestos» debajo de la carta.
 * Regla 3 del proyecto: el precio que se muestra es el que se cobra. Si los
 * precios reales del hotel son SIN impuestos, hay que sumárselos aquí antes de
 * publicarlos — o quitar los precios y dejar sólo los nombres.
 */
import type { Idioma } from '../i18n/ui';

type Texto = Record<Idioma, string>;

export interface Plato {
  nombre: Texto;
  /** Descripción breve. Opcional: no todo plato la necesita. */
  descripcion?: Texto;
  /** Precio en MXN, sin impuestos aplicados aquí — ver la nota de `publicable`. */
  precio?: number;
}

export interface CategoriaCarta {
  /** Identificador estable para el ancla y el `id` del panel. */
  clave: string;
  nombre: Texto;
  platos: Plato[];
}

export interface Carta {
  /**
   * 🔴 Interruptor de publicación. Mientras sea `false`, la página de
   * restaurante NO se genera y no aparece en el menú ni en el sitemap.
   *
   * Ponerlo en `true` exige DOS respuestas del cliente, no una:
   *   · **C0** — RESUELTA. El restaurante existe y se llama «Tenedor»
   *     (cliente, 2026-09-01). Su sitio vigente lo llamaba «Blanc» en un sitio
   *     y «Selvamar» en otro; ninguno de los dos era el nombre.
   *   · **C3** — el desglose fiscal, si se publican precios. La regla 3 vale
   *     para la carta igual que para el alojamiento: el precio mostrado
   *     incluye impuestos, o no se muestra.
   */
  publicable: boolean;
  /** Nombre del local. «Tenedor», confirmado por el cliente el 2026-09-01. */
  nombre: Texto | null;
  categorias: CategoriaCarta[];
}

export const carta: Carta = {
  publicable: true,

  // ✅ NOMBRE OFICIAL, confirmado por el cliente el 2026-09-01: «Tenedor».
  // Resuelve R-17: el sitio vigente usaba dos nombres distintos para su
  // roof top. «Selvamar» resultó ser el nombre del ROOF TOP, no del restaurante.
  nombre: { es: 'Tenedor', en: 'Tenedor' },

  categorias: [
    {
      clave: 'desayuno',
      nombre: { es: 'Desayuno', en: 'Breakfast' },
      platos: [
        {
          nombre: { es: 'Fruta de la casa', en: 'House fruit plate' },
          descripcion: {
            es: 'Papaya, piña y melón de la región, con miel y granola.',
            en: 'Local papaya, pineapple and melon, with honey and granola.',
          },
          precio: 180,
        },
        {
          nombre: { es: 'Huevos al gusto', en: 'Eggs your way' },
          descripcion: {
            es: 'Dos huevos, frijoles refritos, plátano frito y tortillas hechas a mano.',
            en: 'Two eggs, refried beans, fried plantain and hand-made tortillas.',
          },
          precio: 220,
        },
        {
          nombre: { es: 'Chilaquiles verdes', en: 'Green chilaquiles' },
          descripcion: {
            es: 'Con crema, queso fresco y cebolla morada. Con pollo o con huevo.',
            en: 'With cream, fresh cheese and red onion. With chicken or egg.',
          },
          precio: 240,
        },
        {
          nombre: { es: 'Pan francés de la casa', en: 'House French toast' },
          descripcion: {
            es: 'Con miel de abeja melipona y fruta de temporada.',
            en: 'With melipona honey and seasonal fruit.',
          },
          precio: 210,
        },
      ],
    },
    {
      clave: 'entradas',
      nombre: { es: 'Entradas', en: 'Starters' },
      platos: [
        {
          nombre: { es: 'Guacamole con totopos', en: 'Guacamole with totopos' },
          descripcion: {
            es: 'Preparado al momento, con totopos de maíz azul.',
            en: 'Made to order, with blue corn totopos.',
          },
          precio: 240,
        },
        {
          nombre: { es: 'Ceviche de pescado', en: 'Fish ceviche' },
          descripcion: {
            es: 'Pesca del día en limón, con cebolla morada, chile y cilantro.',
            en: 'Catch of the day in lime, with red onion, chilli and coriander.',
          },
          precio: 320,
        },
        {
          nombre: { es: 'Aguachile de camarón', en: 'Shrimp aguachile' },
          descripcion: {
            es: 'Camarón fresco, chile serrano, pepino y limón.',
            en: 'Fresh shrimp, serrano chilli, cucumber and lime.',
          },
          precio: 340,
        },
        {
          nombre: { es: 'Sopa de lima', en: 'Lima soup' },
          descripcion: {
            es: 'Receta yucateca, con pollo y tiras de tortilla.',
            en: 'Yucatecan recipe, with chicken and tortilla strips.',
          },
          precio: 190,
        },
      ],
    },
    {
      clave: 'principales',
      nombre: { es: 'Platos fuertes', en: 'Mains' },
      platos: [
        {
          nombre: { es: 'Pescado a la talla', en: 'Grilled fish a la talla' },
          descripcion: {
            es: 'Pesca del día al carbón, con adobo de la casa y arroz.',
            en: 'Catch of the day over charcoal, house adobo and rice.',
          },
          precio: 480,
        },
        {
          nombre: { es: 'Camarones al ajillo', en: 'Garlic shrimp' },
          descripcion: {
            es: 'Con guajillo, ajo confitado y verduras salteadas.',
            en: 'With guajillo, confit garlic and sautéed vegetables.',
          },
          precio: 460,
        },
        {
          nombre: { es: 'Cochinita pibil', en: 'Cochinita pibil' },
          descripcion: {
            es: 'Cocción lenta en achiote, con cebolla morada y tortillas.',
            en: 'Slow-cooked in achiote, with red onion and tortillas.',
          },
          precio: 380,
        },
        {
          nombre: { es: 'Tacos de pescado', en: 'Fish tacos' },
          descripcion: {
            es: 'Tres tacos con col, chipotle y limón.',
            en: 'Three tacos with cabbage, chipotle and lime.',
          },
          precio: 290,
        },
        {
          nombre: { es: 'Ensalada de la huerta', en: 'Garden salad' },
          descripcion: {
            es: 'Verdes locales, aguacate, jícama y vinagreta de cítricos.',
            en: 'Local greens, avocado, jicama and citrus vinaigrette.',
          },
          precio: 240,
        },
      ],
    },
    {
      clave: 'postres',
      nombre: { es: 'Postres', en: 'Desserts' },
      platos: [
        {
          nombre: { es: 'Flan de coco', en: 'Coconut flan' },
          precio: 160,
        },
        {
          nombre: { es: 'Helado de vainilla y chocolate', en: 'Vanilla and chocolate ice cream' },
          precio: 140,
        },
        {
          nombre: { es: 'Fruta con chile y limón', en: 'Fruit with chilli and lime' },
          precio: 130,
        },
      ],
    },
    {
      clave: 'bebidas',
      nombre: { es: 'Bebidas', en: 'Drinks' },
      platos: [
        {
          nombre: { es: 'Agua fresca del día', en: 'Agua fresca of the day' },
          descripcion: {
            es: 'Jamaica, horchata o la fruta de temporada.',
            en: 'Hibiscus, horchata or the seasonal fruit.',
          },
          precio: 90,
        },
        {
          nombre: { es: 'Limonada o naranjada', en: 'Lemonade or orangeade' },
          precio: 90,
        },
        {
          nombre: { es: 'Café de olla', en: 'Café de olla' },
          precio: 70,
        },
        {
          nombre: { es: 'Cerveza nacional', en: 'Mexican beer' },
          precio: 120,
        },
        {
          nombre: { es: 'Margarita de la casa', en: 'House margarita' },
          descripcion: {
            es: 'Tequila, limón y sal de gusano en el borde.',
            en: 'Tequila, lime and worm salt on the rim.',
          },
          precio: 220,
        },
        {
          nombre: { es: 'Copa de vino', en: 'Glass of wine' },
          precio: 190,
        },
      ],
    },
  ],
};
