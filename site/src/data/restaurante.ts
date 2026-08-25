/**
 * Carta del restaurante — datos (patrón `restaurant-menu` de Cappa).
 *
 * ── ESTADO: LA PÁGINA SE PUBLICA, LA CARTA ESTÁ VACÍA ──────────────────────
 * Abraham resolvió **C0** como Proxy PO el 2026-08-25: el hotel SÍ tiene
 * restaurante, y la respuesta del FAQ del sitio vigente —«por ahora no
 * tenemos servicio de restaurante o bar»— está desactualizada. Se retiró esa
 * pregunta del FAQ nuevo, volvió la amenidad a la portada y volvió
 * `Restaurant` al `schema.org`.
 *
 * ── 🔴 POR QUÉ `categorias` SIGUE VACÍO ────────────────────────────────────
 * Porque **no tenemos la carta**. Ni un plato, ni un precio. Lo que se decidió
 * es que el restaurante existe, no qué se sirve en él.
 *
 * Inventar platos sería exactamente lo que este proyecto vino a corregir, y
 * además los de la plantilla son ficción de demo —«Rusty's Burger, 27$»—.
 * Un huésped que llega esperando un plato que no existe deja la misma reseña
 * que el que llega esperando un restaurante que no existe.
 *
 * Mientras la lista esté vacía, la página **se genera igual** —el restaurante
 * es real y merece su página— pero la sección de carta no se pinta: en su
 * lugar sale una invitación a preguntar al hotel. En cuanto llegue la carta se
 * rellena aquí y aparece sola.
 *
 * ── LO QUE HACE FALTA PARA COMPLETARLA ─────────────────────────────────────
 *   · **El nombre real.** El sitio vigente lo llama «Blanc» en amenidades y
 *     «Selvamar» en el FAQ. Hasta saber cuál es, `nombre` queda en `null` y la
 *     página no usa ninguno de los dos.
 *   · **Los platos**, por categoría.
 *   · **C3**, si se publican precios: la regla 3 vale para la carta igual que
 *     para el alojamiento — el precio mostrado incluye impuestos, o no se
 *     muestra. Un plato sin `precio` se pinta sin cifra y sin línea de puntos.
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
   *   · **C0** — que confirme que el restaurante existe, con su nombre real
   *     (su sitio lo llama «Blanc» en un sitio y «Selvamar» en otro).
   *   · **C3** — el desglose fiscal, si se publican precios. La regla 3 vale
   *     para la carta igual que para el alojamiento: el precio mostrado
   *     incluye impuestos, o no se muestra.
   */
  publicable: boolean;
  /** Nombre del local. Vacío a propósito: el hotel usa dos distintos (R-17). */
  nombre: Texto | null;
  categorias: CategoriaCarta[];
}

export const carta: Carta = {
  publicable: true,
  nombre: null,
  categorias: [],
};
