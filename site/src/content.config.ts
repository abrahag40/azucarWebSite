import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Alojamiento modelado como DATOS, nunca incrustado en el marcado (ADR-0004).
 *
 * De esta única fuente salen el listado, la ficha de detalle, el selector del
 * formulario de solicitud de reserva y los datos estructurados schema.org.
 * Es imposible que se contradigan entre sí porque no hay dos fuentes.
 *
 * El esquema se valida en tiempo de compilación: un tipo de habitación mal
 * escrito ROMPE EL BUILD y nunca llega a producción. Es la Definition of Ready
 * hecha código.
 */

const texto = z.object({ es: z.string(), en: z.string() });

const alojamiento = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/alojamiento' }),
  schema: ({ image }) =>
    z.object({
      // Identidad
      nombre: texto,
      // Categoría comercial. La auditoría encontró 8 tipos para 21 unidades, con
      // los tipos 5-8 formando dos pares casi idénticos. Agrupar por categoría y
      // tratar la vista como atributo permite consolidar la presentación sin
      // perder ni una unidad de inventario.
      categoria: z.enum(['suite', 'habitacion']),
      orden: z.number().int(),

      // Inventario físico
      unidades: z.number().int().positive(),
      capacidadMaxima: z.number().int().positive(),
      camas: texto,
      metrosCuadrados: z.number().positive().optional(),
      vista: texto,
      /**
       * Versión corta de `vista`, para el <title> y poco más.
       *
       * Existe porque los cuatro nombres de suite son NOMBRES PROPIOS —«Suite
       * Agua» se llama igual en inglés— y traducirlos sería el error. El
       * resultado era que el <title> de la ficha ES y el de la EN eran
       * idénticos, y además no decían nada: «Suite Agua» a secas no posiciona
       * para nada. Las cuatro habitaciones no tienen el problema porque su
       * nombre ya lleva la vista dentro.
       *
       * No es un dato nuevo del cliente: es `vista` recortada, y `vista` sí
       * está verificada. Por eso no entra en `verificado` — la redacción corta
       * es nuestra— pero tampoco afirma nada que el cliente no haya dicho.
       */
      vistaCorta: texto.optional(),

      // Contenido
      descripcionCorta: texto,
      descripcion: texto,
      amenidades: z.array(texto).default([]),
      // Lo que lo distingue del tipo inmediatamente inferior. Es el dato que
      // ayuda al huésped a decidir y el que casi ningún hotel escribe.
      diferenciador: texto.optional(),

      // Medios. `image()` valida que el archivo exista y extrae sus dimensiones,
      // que es lo que permite emitir width/height y mantener el CLS en cero.
      imagenPrincipal: image().optional(),
      galeria: z.array(image()).default([]),

      // Estado
      publicado: z.boolean().default(true),

      /**
       * Qué campos ha confirmado el cliente. Los que NO estén aquí son
       * marcadores puestos por nosotros y no se publican como si fueran ciertos.
       *
       * Origen de los datos actuales: el selector del formulario de reservación
       * del sitio vigente (auditoría §4). De ahí salen nombre, vista y
       * descripción — son texto que el hotel ya publica.
       * NO salen de ahí: unidades, capacidad, camas ni metros cuadrados.
       * Esos son la pregunta C1 del brief y hasta que el cliente responda son
       * estimaciones nuestras.
       */
      verificado: z
        .array(z.enum(['nombre', 'vista', 'descripcion', 'unidades', 'capacidad', 'camas', 'metros', 'amenidades']))
        .default([]),
      // Sin PMS no hay disponibilidad en tiempo real (ADR-0003). Este campo NO
      // existe a propósito: mostrar disponibilidad que no podemos respaldar es
      // peor que no mostrar ninguna.
    }),
});

export const collections = { alojamiento };
