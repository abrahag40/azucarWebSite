/**
 * Carta del restaurante — datos (patrón `restaurant-menu` de Cappa).
 *
 * ── 🔴 POR QUÉ ESTÁ VACÍO, Y NO ES UN OLVIDO ───────────────────────────────
 * El propio sitio del hotel se contradice sobre este servicio, y la
 * contradicción sigue sin resolverse (pregunta **C0**, riesgo **R-17**):
 *
 *   · `/servicios/` y `/amenidades-y-facilidades/` anuncian «Restaurante y Bar
 *     Blanc, nuestro icónico Roof Top frente al mar».
 *   · `/preguntas-frecuentes/` dice, literal: **«¿Tienen restaurante o bar?
 *     Por ahora no tenemos servicio de restaurante o bar»**.
 *   · `/restaurante/` no existe como página, pese a estar en su menú.
 *
 * Ya se retiró el restaurante del sitio nuevo por este motivo, incluido el
 * `amenityFeature: Restaurant` que se estaba emitiendo a Google en 20 páginas
 * (L-031). Publicar ahora una carta con platos y precios sería **inventar un
 * servicio que el hotel niega tener**, y encima inventar su contenido: los
 * platos de la plantilla —«Rusty's Burger, 27$»— son ficción de demo.
 *
 * Regla 7 de CLAUDE.md: dato sin confirmar, dato que no se publica.
 *
 * ── QUÉ SÍ ESTÁ HECHO ──────────────────────────────────────────────────────
 * El **mecanismo entero**: el componente `MenuRestaurante.astro` con el diseño
 * de Cappa —fondo oscuro, categorías, platos con precio— y la página que lo
 * usa. En cuanto el hotel confirme que hay restaurante y entregue su carta, se
 * rellena `categorias`, se pone `publicable: true` y aparece. Ni una línea de
 * código más.
 *
 * Es el mismo patrón que ya se usó dos veces en este proyecto: el número de
 * WhatsApp (`contacto.whatsapp = null`) y los precios del panel
 * (`precios.publicable = false`). Construir el mecanismo, dejar el dato vacío,
 * fallar cerrado.
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
  publicable: false,
  nombre: null,
  categorias: [],
};
