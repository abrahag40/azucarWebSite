#!/usr/bin/env node
/**
 * Detecta clases CSS usadas en un componente pero definidas en el ámbito de OTRO.
 *
 *   node scripts/verificar-estilos.mjs
 *
 * ── QUÉ BUSCA Y POR QUÉ ─────────────────────────────────────────────────────
 * Astro limita cada bloque `<style>` al componente que lo contiene. Si dos
 * componentes escriben la misma clase y sólo uno la define, **el otro no recibe
 * nada**. Y no falla: se degrada. Una clase que no existe no da error, no rompe
 * el build, no la ve ningún auditor de accesibilidad ni de HTML, y el resultado
 * tiene aspecto de decisión de diseño.
 *
 * Pasó con `.encabezado--centrado`, definida dentro de `SeccionAmenidades` y
 * usada por cuatro secciones: tres se veían mal desde hacía días (L-055). Y
 * antes con el `max-width` del acordeón (L-046). Dos veces es un patrón.
 *
 * ── CÓMO ────────────────────────────────────────────────────────────────────
 * Para cada `.astro`: las clases que USA su plantilla y las que DEFINE su
 * `<style>`. Las hojas globales de `src/styles/` definen para todos. Después:
 *
 *   · 🔴 usada en A y definida SÓLO dentro de otro componente  → rota
 *   · 🟡 usada y no definida en ninguna parte                  → probablemente rota
 *
 * Sale con código 1 si hay alguna roja.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

const RAIZ = 'site/src';
const rec = (d, a = []) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    e.isDirectory() ? rec(p, a) : a.push(p);
  }
  return a;
};
const archivos = rec(RAIZ);
const astro = archivos.filter((f) => f.endsWith('.astro'));
const css = archivos.filter((f) => f.endsWith('.css'));

/** Clases que aparecen en un selector de un bloque de CSS. */
const definidas = (cssTexto) => {
  const s = new Set();
  // Se quitan primero los COMENTARIOS y después los cuerpos de regla. Sin lo
  // primero, un comentario que menciona `.rejilla` para explicar por qué NO se
  // usa ese nombre cuenta como si la definiera — pasó al escribir esta misma
  // herramienta, y el aviso resultante era exactamente lo contrario de la verdad.
  const soloSelectores = cssTexto
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\{[^{}]*\}/g, '{}');
  for (const m of soloSelectores.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) s.add(m[1]);
  return s;
};

/**
 * Prefijos de clases que la plantilla construye INTERPOLANDO, del estilo
 * `` `mosaico__celda--${ancho}` ``. El valor no se puede saber leyendo el
 * código, así que se guarda el prefijo —`mosaico__celda--`— y cualquier clase
 * definida que empiece por él cuenta como usada.
 *
 * Sin esto, el detector daba por muertas cuatro clases perfectamente vivas
 * —las proporciones de la galería y los anchos del mosaico— sólo porque su
 * nombre se compone en tiempo de ejecución. Un detector que no entiende cómo
 * se escribe el código que analiza produce ruido, y el ruido se ignora.
 */
const prefijosDinamicos = (fuente) => {
  const plantilla = fuente.split(/<style[\s>]/)[0];
  const s = new Set();
  for (const m of plantilla.matchAll(/([\w-]+)\$\{/g)) if (m[1]) s.add(m[1]);
  return s;
};

/** Clases que la plantilla de un componente escribe en el marcado. */
const usadas = (fuente) => {
  const plantilla = fuente.split(/<style[\s>]/)[0];
  const s = new Set();
  for (const m of plantilla.matchAll(/class(?::list)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([\s\S]*?)\}\s*(?=[\s/>]))/g)) {
    const crudo = m[1] ?? m[2] ?? m[3] ?? '';
    // de las expresiones sólo se sacan los literales entre comillas o acentos
    const trozos = m[3]
      ? [...crudo.matchAll(/['"`]([^'"`$]*)['"`]/g)].map((x) => x[1])
      : [crudo];
    for (const t of trozos) for (const c of t.split(/\s+/)) if (c && !c.includes('$')) s.add(c);
  }
  return s;
};

/**
 * Clases que existen a propósito SIN estilos: envoltorios de rejilla, secciones
 * con nombre semántico y ganchos para las pruebas del navegador.
 *
 * La lista existe para que el informe pueda quedar en CERO. Un verificador que
 * siempre devuelve trece avisos se deja de leer a la segunda semana, y entonces
 * el aviso número catorce —el que sí importa— pasa desapercibido (L-047). Cada
 * entrada lleva su motivo; si no se puede escribir el motivo, no es intencional.
 */
const INTENCIONALES = new Map([
  ['icono', 'el <svg> lleva width/height propios; la clase es un gancho por si algún día se estilan todos'],
  ['vecina--anterior', 'el caso por defecto; sólo `--siguiente` necesita regla (text-align: right)'],
  ['ficha', 'envoltorio de la ficha de alojamiento'],
  ['listado', 'envoltorio del listado'],
  ['presentacion', 'nombre de la sección; sus partes sí llevan estilo'],
  ['galeria-home', 'nombre de la sección'],
  ['preguntas-home', 'nombre de la sección'],
  ['contacto-home', 'nombre de la sección'],
  ['contacto-home__texto', 'columna de la rejilla; la rejilla la coloca el padre'],
  ['llamada__texto', 'columna de la rejilla; la rejilla la coloca el padre'],
  ['solicitud__formulario', 'columna de la rejilla de /reservar/'],
  ['legal__apartado', 'agrupador semántico dentro del texto legal'],
  ['politicas__grupo', 'agrupador semántico dentro de las políticas'],
]);

const globales = new Set();
for (const f of css) for (const c of definidas(readFileSync(f, 'utf8'))) globales.add(c);

const porComponente = new Map();
for (const f of astro) {
  const src = readFileSync(f, 'utf8');
  const bloques = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  porComponente.set(f, { usa: usadas(src), define: definidas(bloques), dinamicos: prefijosDinamicos(src) });
}

const rojas = [];
const amarillas = [];
/* Y el sentido contrario: clases DEFINIDAS en el ámbito de un componente que su
   plantilla no usa. No rompen nada, pero el CSS viaja en cada página que carga
   ese componente. `.marca__sub` sobrevivió así a la sustitución del wordmark por
   el logotipo real: nadie la usaba y sus reglas seguían en las 38 páginas.
   El detector sólo miraba una dirección; una clase huérfana no avisa de nada. */
const muertas = [];
for (const [f, { usa, define }] of porComponente) {
  for (const c of usa) {
    if (define.has(c) || globales.has(c) || INTENCIONALES.has(c)) continue;
    const otros = [...porComponente].filter(([g, d]) => g !== f && d.define.has(c)).map(([g]) => basename(g));
    if (otros.length) rojas.push({ f, c, otros });
    else amarillas.push({ f, c });
  }
}

// Misma clase definida en dos componentes distintos: no está rota —cada estilo
// vive en su ámbito— pero el mismo nombre con dos comportamientos engaña a quien
// lea. Aviso, no fallo.
const dobles = new Map();
for (const [f, { define }] of porComponente)
  for (const c of define) dobles.set(c, [...(dobles.get(c) ?? []), f]);
const repetidas = [...dobles].filter(([c, fs]) => fs.length > 1 && !globales.has(c));

for (const [f, { usa, define, dinamicos }] of porComponente)
  for (const c of define)
    if (!usa.has(c) && !INTENCIONALES.has(c) && ![...dinamicos].some((p) => c.startsWith(p)))
      muertas.push({ f, c });

const rel = (f) => relative(RAIZ, f);
console.log(`\n  Estilos con ámbito · ${astro.length} componentes · ${css.length} hojas globales\n`);

if (rojas.length) {
  console.log(`  ✗ ${rojas.length} clase(s) usadas aquí pero definidas dentro de OTRO componente:\n`);
  for (const { f, c, otros } of rojas)
    console.log(`    .${c}\n      usada en  ${rel(f)}\n      definida en  ${otros.join(', ')}  ← no llega\n`);
}
if (amarillas.length) {
  console.log(`  ⚠ ${amarillas.length} clase(s) usadas y no definidas en ninguna parte:\n`);
  const porClase = new Map();
  for (const { f, c } of amarillas) porClase.set(c, [...(porClase.get(c) ?? []), rel(f)]);
  for (const [c, fs] of porClase) console.log(`    .${c}  —  ${fs.join(', ')}`);
  console.log();
}
if (muertas.length) {
  console.log(`  ⚠ ${muertas.length} clase(s) definidas y no usadas por su propio componente:\n`);
  for (const { f, c } of muertas) console.log(`    .${c}  —  ${rel(f)}`);
  console.log();
}
if (repetidas.length) {
  console.log(`  ⚠ ${repetidas.length} clase(s) con el MISMO nombre definidas en varios componentes:\n`);
  for (const [c, fs] of repetidas) console.log(`    .${c}  —  ${fs.map((x) => basename(x)).join(', ')}`);
  console.log();
}
if (!rojas.length && !amarillas.length && !repetidas.length && !muertas.length)
  console.log(`  ✓ Ninguna clase huérfana. (${INTENCIONALES.size} declaradas sin estilo a propósito.)\n`);

process.exit(rojas.length ? 1 : 0);
