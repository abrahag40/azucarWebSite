// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://azucarhotel.com',

  // i18n nativo: el español no lleva prefijo (/), el inglés sí (/en/).
  // Se conserva el esquema de URLs del sitio actual para no romper las 301
  // ya vigentes — ver docs/01-descubrimiento/auditoria-sitio-actual.md §5.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  build: { inlineStylesheets: 'auto' },

  // La plantilla Cappa cargaba 715 <img> sin dimensiones. Aquí el servicio de
  // imagen de Astro las escribe siempre, que es lo que mantiene el CLS en cero.
  image: { responsiveStyles: true },
});
