/**
 * sitemap.xml generado desde las rutas reales (H4.9).
 *
 * No se usa `@astrojs/sitemap` a propósito: la integración añade una dependencia
 * y un paso de build para producir treinta líneas de XML que aquí se derivan de
 * la misma fuente que las páginas. Con tan pocas rutas, la dependencia cuesta
 * más de lo que ahorra.
 *
 * Cada URL declara su alternativa en el otro idioma con `xhtml:link`, que es lo
 * que Google usa para emparejar versiones. Las páginas de error quedan fuera:
 * llevan `noindex` y no deben aparecer en un sitemap.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ruta, type Idioma } from '../i18n/ui';
import { carta } from '../data/restaurante';

const SITIO = 'https://azucarhotel.com';

export const GET: APIRoute = async () => {
  const alojamiento = (await getCollection('alojamiento', ({ data }) => data.publicado))
    .sort((a, b) => a.data.orden - b.data.orden);

  const secciones = [
    '', 'alojamiento', 'servicios', 'galeria', 'reservar', 'ubicacion',
    'preguntas-frecuentes', 'politicas', 'contacto', 'aviso-de-privacidad',
    // Sólo si la página existe: la ruta se genera condicionalmente según
    // `carta.publicable`, y un sitemap que apunta a un 404 es peor que uno
    // incompleto — Search Console lo reporta como error.
    ...(carta.publicable ? ['restaurante'] : []),
  ];
  const fichas = alojamiento.map((e) => `alojamiento/${e.id}`);
  const rutas = [...secciones, ...fichas];

  const url = (idioma: Idioma, r: string) => `${SITIO}${ruta(idioma, r)}`;

  const cuerpo = rutas
    .map((r) => (['es', 'en'] as Idioma[])
      .map((idioma) => [
        '  <url>',
        `    <loc>${url(idioma, r)}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${url('es', r)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${url('en', r)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('es', r)}"/>`,
        '  </url>',
      ].join('\n'))
      .join('\n'))
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${cuerpo}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
