#!/usr/bin/env node
/**
 * ¿Se lee el texto del héroe sobre el VÍDEO? — medición, no impresión.
 *
 *   node scripts/contraste-hero.mjs
 *
 * ── POR QUÉ EXISTE ESTE ARCHIVO ─────────────────────────────────────────────
 * `Hero.astro` lleva escrito desde el sprint 1 el aviso de que si cambia la
 * imagen de fondo hay que volver a medir el contraste. Con una fotografía eso
 * es mirar UN píxel: el más claro. Con un vídeo hay uno por FOTOGRAMA, y basta
 * que una toma tenga arena al sol o una sombrilla blanca para que el titular
 * caiga por debajo del mínimo durante segundo y medio — que es justo el fallo
 * que nadie ve revisando a ojo, porque pasa y se va.
 *
 * La medición se hizo dos veces a mano y las dos veces se perdió al cerrar la
 * sesión. Ahora es un archivo del repositorio: se vuelve a correr en cuanto el
 * cliente mande otro vídeo. Requiere ffmpeg.
 *
 * ── QUÉ CALCULA ─────────────────────────────────────────────────────────────
 * Para cada texto del héroe, y para cada fotograma, busca el píxel MÁS CLARO
 * que le queda debajo y le aplica encima, en el mismo orden que el navegador:
 *
 *   1. `.hero__velo` — dos degradados negros (viñeta lateral + vertical), en su
 *      variante de vídeo: `:global(.videohero[data-listo]) ~ .hero__velo`
 *   2. `.hero__contenido::before` — la elipse radial que asienta el texto
 *
 * Componer negro con alfa `a` es multiplicar el canal sRGB por (1-a), así que
 * las tres capas se resuelven como un producto de transmitancias. Después,
 * luminancia relativa y contraste de WCAG 2.x (1.4.3). El texto que no es
 * opaco —la entradilla al 92 %, el aviso al 85 %— se compone también sobre el
 * fondo ya velado, que es lo que de verdad ve el ojo.
 *
 * ── SOBRE LOS RECTÁNGULOS: SON DE LÍNEA, NO DE BLOQUE ───────────────────────
 * Se obtienen con `createRange().selectNodeContents(el).getClientRects()`.
 * Medir la caja del <p> —800 px de ancho— incluiría columnas enteras sin una
 * sola letra, y ahí la elipse ya casi no vela: el aviso salía a 4.77:1 cuando
 * el texto real está a 7.34:1. WCAG 1.4.3 habla del contraste del TEXTO.
 *
 * ── LO QUE **NO** MIDE ──────────────────────────────────────────────────────
 * La cabecera: desde el 2026-09-07 el menú va sobre banda blanca, fuera del
 * vídeo. Ni la flecha de bajada, que vive en la banda inferior, en tinta sobre
 * blanco (15.91:1).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// `sharp` es una dependencia del SITIO, no de `scripts/`. Se resuelve desde
// `site/` a propósito: añadir un `package.json` aquí sólo para esto duplicaría
// el árbol de dependencias del proyecto por un único import.
const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(RAIZ, 'site', 'package.json'));
const sharp = require('sharp');

const FOTOGRAMAS_POR_SEGUNDO = 4.5;

/**
 * Geometría leída del navegador sobre el despliegue real. NO se adivina: si
 * cambia la maqueta del héroe se vuelve a leer y se pega aquí.
 * `alfa` es la opacidad del color del texto; `grande` marca el texto que por
 * tamaño tiene umbral 3:1 en vez de 4.5:1 (WCAG 1.4.3).
 */
const PERFILES = {
  escritorio: {
    video: 'site/src/assets/video/hero-ancho.mp4',
    viewport: [1440, 900],
    caja: { x: 0, y: 105, w: 1440, h: 691 },          // vídeo y velo coinciden
    contenido: { x: 272, y: 155.0625, w: 896, h: 608.8671875 },
    textos: {
      antetitulo: { alfa: 1, lineas: [[530.59, 158.06, 378.8, 17]] },
      titulo: { alfa: 1, grande: true, lineas: [
        [486.25, 193.16, 467.50, 84.5], [375.88, 272.35, 688.25, 84.5],
        [543.63, 351.55, 352.73, 84.5], [488.55, 430.74, 462.89, 84.5]] },
      entrada: { alfa: 0.92, lineas: [
        [490.38, 539.94, 459.23, 24], [493.77, 572.94, 452.46, 24],
        [460.10, 601.44, 519.80, 33], [642.94, 605.94, 154.13, 24]] },
      'boton contorno': { alfa: 1, lineas: [[766.38, 686.94, 126.53, 19]] },
      aviso: { alfa: 0.85, lineas: [[601.34, 743.84, 237.30, 17]] },
    },
  },
  movil: {
    video: 'site/src/assets/video/hero-alto.mp4',
    viewport: [375, 812],
    caja: { x: 0, y: 85, w: 375, h: 657.98 },
    contenido: { x: 24, y: 115.56, w: 327, h: 600.91 },
    textos: {
      antetitulo: { alfa: 1, lineas: [[55.41, 118.56, 264.17, 17], [162.24, 141.66, 50.52, 17]] },
      titulo: { alfa: 1, grande: true, lineas: [
        [57.63, 176.48, 259.73, 47], [100.18, 220.48, 174.64, 47],
        [92.63, 264.48, 189.73, 47], [89.52, 308.48, 195.96, 47],
        [58.91, 352.48, 257.16, 47]] },
      entrada: { alfa: 0.92, lineas: [
        [78.92, 421.78, 217.16, 19], [52.20, 448.18, 270.61, 19],
        [68.30, 474.58, 238.39, 19], [40.00, 497.48, 295.00, 26.4],
        [125.85, 500.98, 123.30, 19]] },
      'boton contorno': { alfa: 1, lineas: [[124.23, 641.25, 126.53, 19]] },
      aviso: { alfa: 0.85, lineas: [[68.84, 696.38, 237.30, 17]] },
    },
  },
};

const interpolar = (t, paradas) => {
  if (t <= paradas[0][0]) return paradas[0][1];
  const ultima = paradas[paradas.length - 1];
  if (t >= ultima[0]) return ultima[1];
  for (let i = 1; i < paradas.length; i++) {
    const [p0, a0] = paradas[i - 1];
    const [p1, a1] = paradas[i];
    if (t <= p1) return a0 + ((a1 - a0) * (t - p0)) / (p1 - p0);
  }
  return ultima[1];
};

const VERTICAL = [[0, 0.24], [0.18, 0.14], [0.40, 0.12], [0.82, 0.14], [1, 0.24]];
const LATERAL = [[0, 0.26], [0.10, 0.10], [0.18, 0]];
const ELIPSE = [[0, 0.72], [0.42, 0.64], [0.66, 0.32], [0.82, 0]];

const canalLineal = (v) => {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminancia = (r, g, b) =>
  0.2126 * canalLineal(r) + 0.7152 * canalLineal(g) + 0.0722 * canalLineal(b);

async function medir(nombrePerfil, P) {
  const dir = mkdtempSync(join(tmpdir(), 'contraste-'));
  try {
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', join(RAIZ, P.video),
      '-vf', `fps=${FOTOGRAMAS_POR_SEGUNDO}`, join(dir, 'f%04d.png')]);
    const archivos = readdirSync(dir).filter((f) => f.endsWith('.png')).sort();
    const meta = await sharp(join(dir, archivos[0])).metadata();

    // `object-fit: cover`: el vídeo se escala hasta cubrir y se centra.
    const escala = Math.max(P.caja.w / meta.width, P.caja.h / meta.height);
    const desX = P.caja.x + (P.caja.w - meta.width * escala) / 2;
    const desY = P.caja.y + (P.caja.h - meta.height * escala) / 2;

    // La elipse: `inset: -55% -28%` sobre el contenido, y `farthest-corner`,
    // que en una elipse centrada da radios = semiejes × √2.
    const c = P.contenido;
    const ew = c.w * 1.56, eh = c.h * 2.1;
    const E = {
      cx: c.x - 0.28 * c.w + ew / 2,
      cy: c.y - 0.55 * c.h + eh / 2,
      rx: (ew / 2) * Math.SQRT2,
      ry: (eh / 2) * Math.SQRT2,
    };
    const transmitancia = (px, py) => {
      const aV = interpolar((py - P.caja.y) / P.caja.h, VERTICAL);
      const aL = interpolar((P.caja.x + P.caja.w - px) / P.caja.w, LATERAL);
      const aE = interpolar(Math.hypot((px - E.cx) / E.rx, (py - E.cy) / E.ry), ELIPSE);
      return (1 - aV) * (1 - aL) * (1 - aE);
    };

    const peores = {};
    for (const n of Object.keys(P.textos)) peores[n] = { c: Infinity, f: '' };

    for (const archivo of archivos) {
      const { data, info } = await sharp(join(dir, archivo)).raw().toBuffer({ resolveWithObject: true });
      for (const [nombre, t] of Object.entries(P.textos)) {
        let peor = Infinity;
        for (const [lx, ly, lw, lh] of t.lineas) {
          const sx0 = Math.max(0, Math.floor((lx - desX) / escala));
          const sx1 = Math.min(info.width - 1, Math.ceil((lx + lw - desX) / escala));
          const sy0 = Math.max(0, Math.floor((ly - desY) / escala));
          const sy1 = Math.min(info.height - 1, Math.ceil((ly + lh - desY) / escala));
          for (let sy = sy0; sy <= sy1; sy++) {
            const py = desY + sy * escala;
            for (let sx = sx0; sx <= sx1; sx++) {
              const T = transmitancia(desX + sx * escala, py);
              const i = (sy * info.width + sx) * info.channels;
              const r = data[i] * T, g = data[i + 1] * T, b = data[i + 2] * T;
              const Lf = luminancia(r, g, b);
              const a = t.alfa;
              const Lt = luminancia(255 * a + r * (1 - a), 255 * a + g * (1 - a), 255 * a + b * (1 - a));
              const con = (Math.max(Lt, Lf) + 0.05) / (Math.min(Lt, Lf) + 0.05);
              if (con < peor) peor = con;
            }
          }
        }
        if (peor < peores[nombre].c) peores[nombre] = { c: peor, f: archivo };
      }
    }

    console.log(`\n  ${nombrePerfil.toUpperCase()} · ${P.video}`);
    console.log(`  fuente ${meta.width}×${meta.height} · elemento ${P.caja.w}×${P.caja.h} · ` +
      `${archivos.length} fotogramas · ventana ${P.viewport.join('×')}\n`);
    console.log('  texto                peor contraste   mínimo   fotograma');
    console.log('  ' + '─'.repeat(62));
    let falla = false;
    for (const [nombre, { c: con, f }] of Object.entries(peores)) {
      const min = P.textos[nombre].grande ? 3 : 4.5;
      const ok = con >= min;
      if (!ok) falla = true;
      console.log(`  ${nombre.padEnd(20)} ${con.toFixed(2).padStart(8)}:1 ${ok ? '  ✓' : '  ✗'}` +
        `   ${String(min).padStart(5)}:1   ${f}`);
    }
    return falla;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

let falla = false;
for (const [nombre, perfil] of Object.entries(PERFILES)) {
  falla = (await medir(nombre, perfil)) || falla;
}
console.log('\n  El titular es texto grande (WCAG 1.4.3): su umbral es 3:1, no 4.5:1.');
console.log(falla ? '\n  ✗ HAY TEXTO QUE NO CUMPLE\n' : '\n  ✓ Todos cumplen, en las dos maquetas\n');
process.exit(falla ? 1 : 0);
