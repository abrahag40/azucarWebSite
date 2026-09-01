#!/usr/bin/env bash
#
# Una sola orden que corre TODAS las comprobaciones del proyecto y falla a
# gritos si alguna se cae.
#
#   ./scripts/verificar-todo.sh
#
# ── POR QUÉ EXISTE ───────────────────────────────────────────────────────────
# Porque comprobar a mano, comando a comando, ha fallado tres veces en este
# proyecto, siempre igual: **filtrando la salida y leyendo la ausencia de
# coincidencias como éxito**.
#
#   · `npm run check | tail -3` dejaba fuera la línea de errores → el CI llevaba
#     trece commits en rojo sin que nadie lo viera (L-040).
#   · El auditor listaba seis destinos rotos de dieciocho y escondió un 404 real
#     detrás del ruido conocido (L-041).
#   · `npm run build | grep "page(s)"` no imprimió nada porque el build estaba
#     ROTO, y esa nada se leyó como que todo iba bien. Tres comandos después
#     seguía roto (L-053).
#
# El patrón es siempre el mismo: un filtro que sólo sabe reconocer el éxito no
# distingue «no falló» de «no llegó a ejecutarse». Este script mira el CÓDIGO DE
# SALIDA, que no se puede confundir con nada.
#
# ── LO QUE NO HACE ───────────────────────────────────────────────────────────
# No corre Lighthouse ni axe-core: necesitan Chrome y un servidor, y son
# comprobaciones periódicas, no de cada cambio. Están en
# `docs/05-despliegue/medicion-calidad.md`.
#
# html-validate SÍ está, desde el 2026-09-01. Estaba en esa lista de «periódicas»
# y por eso el panel de precios llevaba semanas con un <form> sin botón de envío
# (WCAG H32) sin que nadie lo viera. Una comprobación que sólo se corre cuando
# uno se acuerda no es una comprobación, es una intención.
set -uo pipefail
cd "$(dirname "$0")/.."

verde=$'\033[32m'; rojo=$'\033[31m'; gris=$'\033[90m'; fin=$'\033[0m'
fallos=0

paso() {
  local nombre="$1"; shift
  local salida
  if salida=$("$@" 2>&1); then
    printf "  ${verde}✓${fin} %s\n" "$nombre"
  else
    printf "  ${rojo}✗ %s${fin}\n" "$nombre"
    printf "${gris}%s${fin}\n" "$(echo "$salida" | tail -12 | sed 's/^/      /')"
    fallos=$((fallos + 1))
  fi
}

echo
echo "  Verificación completa — Azúcar Hotel Tulum"
echo

paso "datos de alojamiento"         npm --prefix site run datos
paso "tipos (astro check)"          npm --prefix site run check
paso "pruebas unitarias"            npm --prefix site test
paso "build"                        npm --prefix site run build
paso "accesibilidad del marcado"    node scripts/auditar-accesibilidad.mjs site/dist
paso "auditoría del build"          node scripts/audit-mirror.mjs site/dist
paso "redirecciones 301"            node scripts/verificar-301.mjs site/dist
paso "clases con ámbito"            node scripts/verificar-estilos.mjs

# Comprobaciones baratas que no tienen script propio y han fallado alguna vez.
paso "sin comentarios HTML en el build" bash -c '
  n=$(grep -rho "<!--" site/dist --include="*.html" | wc -l | tr -d " ")
  [ "$n" -eq 0 ] || { echo "$n comentario(s) HTML viajan a producción"; exit 1; }'

paso "todos los <img> con src" bash -c '
  n=$(grep -rho "<img\b[^>]*>" site/dist --include="*.html" | grep -vc "src=")
  [ "$n" -eq 0 ] || { echo "$n <img> sin src"; exit 1; }'

# 🔴 EL LOCKFILE SINCRONIZADO. Es la comprobación que faltaba, y su ausencia
# costó SEIS commits sin desplegar: `npm install` de una dependencia nueva dejó
# `package-lock.json` desincronizado con `package.json`, `npm ci` empezó a
# fallar, y con él el CI y Cloudflare — mientras aquí todo seguía en verde,
# porque en local se usa `npm install`, que es tolerante, y no `npm ci`, que no
# lo es. Es la segunda vez que el CI se queda en rojo sin que nadie lo note
# (L-040 fue la primera, trece commits). Ahora lo caza esta comprobación.
#
# 🔴 SE COMPRUEBA EN LINUX, NO AQUÍ. npm resuelve un árbol DISTINTO en macOS y
# en Linux cuando hay dependencias opcionales por plataforma —sharp y los
# binarios wasm de Astro son el caso—, y `npm ci` exige coincidencia exacta.
# Un lockfile generado en macOS es rechazado en Linux y viceversa. Como el CI y
# Cloudflare corren en Linux, la comprobación que vale es la de Linux.
#
# Por eso el lockfile de este proyecto SE GENERA EN DOCKER, con instalación
# REAL —`--package-lock-only` no descarga nada y deja fuera los binarios
# nativos de Linux, y entonces el build falla con "Cannot find native binding"—:
#   rm -rf /tmp/genlock && mkdir -p /tmp/genlock && cp site/package.json /tmp/genlock/
#   docker run --rm -v /tmp/genlock:/app -w /app node:22-slim npm install
#   cp /tmp/genlock/package-lock.json site/
# Ver `site/README.md` para el procedimiento completo.
#
# Sin Docker no se puede comprobar, y eso se dice en voz alta en vez de dar un
# falso verde: un guardián que no puede comprobar debe avisar, no callar.
paso "lockfile sincronizado (npm ci en Linux)" bash -c '
  # En el CI ya estamos EN Linux y el `npm ci` del propio workflow es la prueba
  # directa; levantar Docker dentro de Docker sería reproducir lo que acaba de
  # pasar de verdad.
  [ -z "${SALTAR_LOCKFILE:-}" ] || exit 0
  command -v docker > /dev/null 2>&1 || {
    echo "AVISO: sin Docker no se puede comprobar el lockfile como lo hace el CI."
    echo "El CI y Cloudflare instalan con npm ci EN LINUX, y npm resuelve"
    echo "distinto ahi que en macOS. Instala Docker o vigila el CI a mano."
    exit 0
  }
  docker run --rm -v "$PWD/site":/app -w /app node:22-slim \
    sh -c "cp package.json package-lock.json /tmp/ && cd /tmp && npm ci --no-audit --no-fund" \
    > /dev/null 2>&1 || {
      echo "package-lock.json desincronizado: npm ci FALLA en Linux, que es donde"
      echo "corren el CI y Cloudflare. El sitio no se desplegara."
      echo "Arreglo:"
      echo "  docker run --rm -v \"\$PWD/site\":/app -w /app node:22-slim \\"
      echo "    sh -c \"rm -f package-lock.json && npm install --package-lock-only\""
      exit 1
    }'

# ── GUARDIAS DE LA DEFINITION OF DONE ────────────────────────────────────────
# 🔴 ESTABAN SÓLO EN EL WORKFLOW DEL CI (R-27). Durante meses hubo DOS listas de
# comprobaciones que no se solapaban: ésta, que corre en la máquina de Abraham,
# y otra escrita a mano dentro de `.github/workflows/site.yml`. Nadie las
# comparó nunca, así que nadie sabía que el CI exigía cosas —`description`,
# `canonical`, `hreflang`, `width/height`— que aquí no se miraban.
#
# Se descubrió del peor modo posible: al desbloquearse el CI tras seis commits
# sin desplegar (L-087), falló en guardias que en local llevaban todo el tiempo
# en verde. Un guardián que sólo existe en un sitio no protege el otro sitio.
#
# La regla, que es de configuración y no de CI: **una sola fuente de verdad**.
# El workflow ahora invoca este script y no comprueba nada por su cuenta. Si
# quieres añadir una comprobación, va aquí y el CI la hereda gratis.
# HTML válido. Se ejecuta con `npx`, así que la primera vez baja el paquete; si
# no hay red, avisa en vez de dar un falso verde — mismo criterio que el
# lockfile. Un guardián que no puede comprobar tiene que decirlo.
paso "HTML válido (html-validate)" bash -c '
  cd site
  npx --yes html-validate@11 --config ../.htmlvalidate.json "dist/**/*.html" 2>&1 \
    | tee /tmp/htmlvalidate.log | tail -20
  estado=${PIPESTATUS[0]}
  if [ "$estado" -ne 0 ] && grep -qiE "network|ENOTFOUND|EAI_AGAIN|registry" /tmp/htmlvalidate.log; then
    echo "AVISO: sin red no se puede correr html-validate. Vigílalo a mano."
    exit 0
  fi
  exit "$estado"'

paso "guardias de la Definition of Done" bash -c '
  fallos=0
  # El panel de precios (ADR-0007) queda fuera: es una herramienta INTERNA,
  # protegida por Cloudflare Access y marcada `noindex`. No tiene description,
  # canonical ni hreflang a propósito — no es contenido público, no se indexa y
  # no tiene versión en el otro idioma. Exigirle metadatos de página pública
  # sería pedirle que finja ser una.
  for f in $(find site/dist -name "*.html" -not -path "site/dist/panel/*"); do
    grep -q "name=\"viewport\""    "$f" || { echo "sin viewport: $f"; fallos=1; }
    grep -q "<html lang="          "$f" || { echo "sin lang: $f"; fallos=1; }
    grep -q "name=\"description\"" "$f" || { echo "sin description: $f"; fallos=1; }
    grep -cE "<h1" "$f" | grep -qx 1 || { echo "no hay exactamente un h1: $f"; fallos=1; }
    # `alt` a secas es alt vacío (imagen decorativa) y es correcto: Astro lo emite
    # así cuando el valor es "". Exigir `alt=` marcaba como fallo el marcado bien
    # hecho.
    grep -oE "<img[^>]*>" "$f" | grep -vE "alt(=|[[:space:]>/])" | grep -q . \
      && { echo "<img> sin alt: $f"; fallos=1; } || true
    # width/height en toda imagen: es lo que mantiene el CLS en cero. Se excluye
    # el contenido de los <dialog> cerrados —el hueco del visor de la galería—
    # porque no participa del layout y se rellena en ejecución con fotos de
    # dimensiones distintas cada vez. Mismo criterio que el auditor.
    perl -0777 -pe "s/<dialog\b(?![^>]*\bopen\b)[^>]*>.*?<\/dialog>//gs" "$f" \
      | grep -oE "<img[^>]*>" | grep -v "width=" | grep -q . \
      && { echo "<img> sin width/height: $f"; fallos=1; } || true

    # Las páginas de error no son contenido indexable: no tienen URL canónica ni
    # versión en otro idioma que ofrecer a Google. En vez de eximirlas sin más,
    # se les exige lo contrario — que declaren noindex.
    if [ "$(basename "$f")" = "404.html" ]; then
      grep -q "name=\"robots\"[^>]*noindex" "$f" || { echo "404 sin noindex: $f"; fallos=1; }
      grep -q "rel=\"canonical\"" "$f" && { echo "404 con canonical: $f"; fallos=1; } || true
      grep -q "schema.org"        "$f" && { echo "404 con datos estructurados: $f"; fallos=1; } || true
    else
      grep -q "rel=\"canonical\"" "$f" || { echo "sin canonical: $f"; fallos=1; }
      grep -q "rel=\"alternate\"" "$f" || { echo "sin hreflang: $f"; fallos=1; }
    fi
  done
  # ADR-0003 regla 1: la interfaz nunca promete una reserva confirmada.
  if grep -rniE "reserva confirmada|booking confirmed" site/dist --include="*.html" -q; then
    echo "La interfaz promete una reserva confirmada. Prohibido por ADR-0003."; fallos=1
  fi
  [ "$fallos" -eq 0 ]'

paso "og:image en todas las páginas" bash -c '
  # Lista EXPLÍCITA de lo que no lleva metadatos sociales, en vez del margen
  # numérico difuso que había antes ("al menos total - 2"). Ese margen decía
  # reservarse para los dos 404 — que en realidad SÍ llevan og:image, así que
  # estaba sin usar—, y al añadir el panel de precios lo consumió por accidente:
  # el guardián siguió en verde por la razón equivocada. Un umbral con holgura
  # tolera lo que nadie decidió tolerar (L-077).
  excluidas="site/dist/panel/index.html"
  faltan=""
  for f in $(find site/dist -name "*.html"); do
    case " $excluidas " in *" $f "*) continue ;; esac
    grep -q "og:image" "$f" || faltan="$faltan $f"
  done
  [ -z "$faltan" ] || { echo "sin og:image:$faltan"; exit 1; }'

paso "fragmentos de URL sanos" bash -c '
  fallos=0
  # 1. Ningun `href="#"` a secas: no lleva a ninguna parte y ensucia la barra
  #    de direcciones. Es el defecto que se le senalo a la plantilla.
  n=$(grep -rho "href=\"#\"" site/dist --include="*.html" | wc -l | tr -d " ")
  [ "$n" -eq 0 ] || { echo "$n enlace(s) con href=\"#\" vacio"; fallos=1; }
  # 2. Todo fragmento apunta a un id que EXISTE en su propia pagina.
  for f in $(find site/dist -name "*.html"); do
    for frag in $(grep -o "href=\"#[^\"]\+\"" "$f" | sed "s/href=\"#//;s/\"//" | sort -u); do
      grep -q "id=\"$frag\"" "$f" || { echo "$f: #$frag no existe"; fallos=1; }
    done
  done
  [ "$fallos" -eq 0 ]'

paso "sin enlaces a recursos inexistentes" bash -c '
  rotos=0
  for u in $(grep -rho "href=\"/_astro/[^\"]*\"" site/dist --include="*.html" | sed "s/href=\"//;s/\"//" | sort -u); do
    [ -f "site/dist$u" ] || { echo "ROTO $u"; rotos=$((rotos+1)); }
  done
  [ "$rotos" -eq 0 ]'

echo
if [ "$fallos" -eq 0 ]; then
  printf "  ${verde}Todo en verde.${fin}\n\n"
else
  printf "  ${rojo}%s comprobación(es) fallaron.${fin}\n\n" "$fallos"
  exit 1
fi
