#!/usr/bin/env bash
# Ingesta de las capturas HTTrack al repositorio para auditoría offline.
#
# Se ejecuta UNA sola vez, desde dentro del repositorio, y procesa las tres
# capturas de golpe. No deja nada fuera de la carpeta del proyecto.
#
#   Uso:  ./scripts/ingest-mirror.sh /Users/abraham/Documents/Projects/azucarWeb
#
# Qué hace:
#   1. Copia cada captura íntegra —imágenes incluidas— excepto los artefactos
#      internos de HTTrack (hts-cache, ^), que son duplicación pura.
#   2. Genera un manifiesto con el tamaño de TODOS los archivos del original,
#      incluso los que no se copian. El dato de peso no se pierde nunca.
#   3. Produce un resumen por extensión y el ranking de archivos más pesados.
#
# Compatible con macOS (bash 3.2, herramientas BSD) y Linux.

set -euo pipefail

SRC_ROOT="${1:-}"
MAX_FILE_BYTES=$((50 * 1024 * 1024))   # GitHub rechaza >100 MB; cortamos antes

if [ -z "$SRC_ROOT" ] || [ ! -d "$SRC_ROOT" ]; then
  echo "ERROR: pasa la carpeta que contiene las capturas." >&2
  echo "  Ej.: $0 /Users/abraham/Documents/Projects/azucarWeb" >&2
  exit 1
fi

REPO="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "$REPO" ]; then
  echo "ERROR: ejecuta este script desde dentro del repositorio azucarWebSite." >&2
  exit 1
fi

SRC_ROOT="$(cd "$SRC_ROOT" && pwd)"
BASE="$REPO/investigacion/mirrors"

# captura_origen:nombre_destino
CAPTURAS="actualWebsite:azucarhotel propuestaAnterior:resnexus plantillaBase:cappa"

echo "Origen : $SRC_ROOT"
echo "Destino: $BASE"
echo

for par in $CAPTURAS; do
  ORIG="${par%%:*}"
  NAME="${par##*:}"
  SRC="$SRC_ROOT/$ORIG"

  if [ ! -d "$SRC" ]; then
    echo "!! No encontrada: $ORIG — se omite"
    continue
  fi

  DEST="$BASE/$NAME"
  rm -rf "$DEST"; mkdir -p "$DEST"

  echo "── $ORIG → $NAME"

  # 1. Manifiesto del ORIGINAL completo, antes de excluir nada
  printf 'bytes\truta\n' > "$DEST/manifiesto.tsv"
  find "$SRC" -type f -print0 | while IFS= read -r -d '' f; do
    printf '%s\t%s\n' "$(wc -c < "$f" | tr -d ' ')" "${f#$SRC/}"
  done | sort -t"$(printf '\t')" -k1,1nr >> "$DEST/manifiesto.tsv"

  TOTAL=$(( $(wc -l < "$DEST/manifiesto.tsv") - 1 ))

  # 2. Copia íntegra, menos artefactos internos de HTTrack
  mkdir -p "$DEST/archivos"
  ( cd "$SRC" && tar cf - . ) | ( cd "$DEST/archivos" && tar xf - )
  find "$DEST/archivos" \( -name 'hts-cache' -o -name '^' \) -type d -prune -exec rm -rf {} + 2>/dev/null || true

  # 3. Cortar archivos individuales demasiado grandes para git
  find "$DEST/archivos" -type f -size +"$((MAX_FILE_BYTES/1024))"k -print -delete \
    >> "$DEST/excluidos-por-tamano.txt" 2>/dev/null || true
  [ -s "$DEST/excluidos-por-tamano.txt" ] || rm -f "$DEST/excluidos-por-tamano.txt"

  COPIADOS=$(find "$DEST/archivos" -type f | wc -l | tr -d ' ')
  PESO_ORIG=$(du -sh "$SRC" | cut -f1)
  PESO_DEST=$(du -sh "$DEST/archivos" | cut -f1)

  # 4. Resumen legible
  {
    echo "# Captura: $NAME  (origen: $ORIG)"
    echo
    echo "| dato | valor |"
    echo "|---|---|"
    echo "| Archivos en el original | $TOTAL |"
    echo "| Archivos versionados | $COPIADOS |"
    echo "| Peso del original | $PESO_ORIG |"
    echo "| Peso versionado (sin hts-cache) | $PESO_DEST |"
    echo
    echo "## Por extensión"
    echo
    echo '| ext | archivos | KB |'
    echo '|---|---|---|'
    tail -n +2 "$DEST/manifiesto.tsv" | awk -F'\t' '
      { n=split($2,a,"."); ext=(n>1 ? tolower(a[n]) : "(sin-ext)");
        cnt[ext]++; sum[ext]+=$1 }
      END { for (e in cnt) printf "| %s | %d | %.0f |\n", e, cnt[e], sum[e]/1024 }' \
      | sort -t'|' -k4 -rn | head -25
    echo
    echo "## 30 archivos más pesados"
    echo
    echo '| KB | ruta |'
    echo '|---|---|'
    tail -n +2 "$DEST/manifiesto.tsv" | head -30 | awk -F'\t' '{printf "| %.0f | %s |\n", $1/1024, $2}'
  } > "$DEST/resumen.md"

  echo "   $TOTAL archivos · original $PESO_ORIG · versionado $PESO_DEST"
done

echo
echo "════════════════════════════════════════════"
du -sh "$BASE" | awk '{print "Total a versionar: " $1}'
echo "════════════════════════════════════════════"

# ---------- Publicar ----------
BRANCH="claude/hotel-tulum-web-audit-0yly29"
cd "$REPO"
git add investigacion/mirrors
if git diff --cached --quiet; then
  echo "No hay cambios que publicar."
  exit 0
fi
git commit -q -m "chore: capturas HTTrack de los tres sitios

Ingesta generada por scripts/ingest-mirror.sh. Incluye manifiesto con el tamano
de todos los archivos del original y resumen por extension de cada captura."
echo "Publicando en $BRANCH ..."
for intento in 1 2 3 4; do
  if git push -u origin "$BRANCH"; then
    echo
    echo "Listo. Las capturas ya estan en el repositorio."
    exit 0
  fi
  espera=$((2 ** intento))
  echo "Push fallido, reintento en ${espera}s ..."
  sleep "$espera"
done
echo "ERROR: no se pudo publicar despues de 4 intentos." >&2
exit 1
