/**
 * Precios por tipo de alojamiento -- el dato que edita el panel (ADR-0007).
 *
 * ── POR QUE UN .json APARTE Y NO DENTRO DE `content/alojamiento/*.json` ─────
 * El panel escribe este archivo con la API de GitHub. Escribir dentro de las
 * fichas de alojamiento significaria que el panel puede tocar TAMBIEN el
 * nombre, las fotos y la descripcion -toda la ficha en el mismo archivo-, y
 * un fallo de validacion podria corromper contenido que el panel no deberia
 * poder tocar. Un archivo separado hace que el peor caso posible sea
 * "los precios quedaron mal", nunca "se rompio el catalogo".
 *
 * Es la misma idea que la frontera de `booking/`: limitar el radio de dano
 * por diseno, no por cuidado al escribir el codigo.
 *
 * ── POR QUE EL ESQUEMA ES TAN POBRE ────────────────────────────────────────
 * Porque C2 no esta respondida. No sabemos si hay temporadas, ni cuantas, ni
 * si hay minimo de noches o reglas de fin de semana. Un precio base por tipo
 * es el MINIMO COMUN DENOMINADOR: cualquier esquema tarifario tiene al menos
 * eso. Si C2 revela cuatro temporadas, se anade una dimension a `porTipo` y
 * el panel crece; no se tira nada.
 *
 * Inventar hoy un esquema de temporadas seria adivinar, y ya sabemos como
 * termina eso (L-071: las cinco primeras fotos tampoco eran las cinco
 * mejores).
 *
 * ── 🔴 POR QUE `publicable` EXISTE Y ESTA EN `false` ───────────────────────
 * La regla 3 de CLAUDE.md: el total cotizado incluye impuestos, y es el
 * diferenciador frente a las OTAs. **C3 -el desglose fiscal- sigue sin
 * responder**, asi que un precio publicado hoy seria un precio sin impuestos:
 * exactamente la queja de "me cobraron mas de lo publicado" que este proyecto
 * existe para curar, reproducida con nuestra propia herramienta.
 *
 * Mientras `publicable` sea `false`, NINGUNA pagina del sitio muestra estas
 * cifras. El panel deja capturarlas -para que el hotel las tenga listas y las
 * use al responder una solicitud-, pero el sitio publico calla. Ponerlo en
 * `true` es una decision consciente que requiere C3 respondida, no un
 * descuido de configuracion.
 */
import datos from './precios.json';

export interface Precios {
  /** Codigo ISO 4217. Hoy siempre MXN; existe para no dar por hecho la moneda. */
  moneda: string;
  /** ISO 8601 del ultimo cambio, o `null` si nunca se ha tocado. */
  actualizado: string | null;
  /** Correo de quien hizo el ultimo cambio, segun Cloudflare Access. */
  actualizadoPor: string | null;
  /** 🔴 Interruptor de publicacion. Ver el comentario de cabecera. */
  publicable: boolean;
  /** Precio base por noche, por `id` de la coleccion `alojamiento`. `null` = sin capturar. */
  porTipo: Record<string, number | null>;
}

export const precios = datos as Precios;

/**
 * Los `id` validos, tomados de este mismo archivo.
 *
 * El endpoint del panel los usa para rechazar cualquier clave que no
 * reconozca: sin esto, una peticion manipulada podria anadir tipos
 * inventados al archivo de precios. Es el mismo criterio que fijar la ruta
 * de escritura en el codigo y no aceptarla del cliente (ADR-0007, Decision 3).
 */
export const TIPOS_VALIDOS = Object.keys(precios.porTipo);

/** Tope de cordura, no una regla de negocio. Un precio por noche fuera de
 *  este rango es casi seguro un error de tecleo -un cero de mas o de menos-,
 *  y el panel lo rechaza antes de escribirlo. */
export const PRECIO_MINIMO = 100;
export const PRECIO_MAXIMO = 500_000;

/** `true` si el valor sirve como precio. Se usa en el navegador y en el
 *  servidor -misma funcion, mismo veredicto, igual que `camposInvalidos`. */
export function precioValido(valor: unknown): valor is number {
  return (
    typeof valor === 'number' &&
    Number.isFinite(valor) &&
    Number.isInteger(valor) &&
    valor >= PRECIO_MINIMO &&
    valor <= PRECIO_MAXIMO
  );
}
