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
# No corre Lighthouse, axe ni html-validate: necesitan red, Chrome o un
# servidor, y son comprobaciones periódicas, no de cada cambio. Están en
# `docs/05-despliegue/medicion-calidad.md`.
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
# Por eso el lockfile de este proyecto SE GENERA EN DOCKER:
#   docker run --rm -v "$PWD/site":/app -w /app node:22-slim \
#     sh -c "rm -f package-lock.json && npm install --package-lock-only"
#
# Sin Docker no se puede comprobar, y eso se dice en voz alta en vez de dar un
# falso verde: un guardián que no puede comprobar debe avisar, no callar.
paso "lockfile sincronizado (npm ci en Linux)" bash -c '
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
