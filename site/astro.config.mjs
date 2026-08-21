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

  build: {
    inlineStylesheets: 'auto',
    // 'preserve' respeta la estructura de src/pages en la salida. Con el valor
    // por defecto ('directory'), `en/404.astro` se emite como `en/404/index.html`
    // y Cloudflare Pages nunca lo encuentra: busca un `404.html` en el directorio
    // pedido y va subiendo. Sin esto, una ruta inexistente bajo /en/ caeria en el
    // 404 en espanol.
    //
    // No cambia ninguna URL actual. Consecuencia para las paginas futuras: se
    // crean como `alojamiento/index.astro`, no como `alojamiento.astro`, para
    // seguir sirviendo /alojamiento/ y no /alojamiento.html.
    format: 'preserve',
  },

  // La plantilla Cappa cargaba 715 <img> sin dimensiones. Aquí el servicio de
  // imagen de Astro las escribe siempre, que es lo que mantiene el CLS en cero.
  image: { responsiveStyles: true },
});
