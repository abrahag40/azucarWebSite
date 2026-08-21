// @ts-check
import { defineConfig } from 'astro/config';
import csp from './integraciones/csp.mjs';

export default defineConfig({
  // Genera la CSP con los hashes reales del build. Ver integraciones/csp.mjs.
  integrations: [csp()],
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
    /* Se mantiene 'auto' —CSS pequeño incrustado— y NO se pasa a 'never', pese a
       que 'never' dejaría la CSP sin hashes de estilo y 539 bytes más corta.
       Medido sobre la portada:
         'auto'   39 871 B en 2 peticiones de CSS
         'never'  40 060 B en 5 peticiones de CSS
       Los bytes son los mismos; las peticiones no. Tres viajes de ida y vuelta
       menos en el camino crítico pesan mucho más que media cabecera, que además
       viaja comprimida por HPACK en HTTP/2 y es casi gratis tras la primera
       respuesta. */
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
