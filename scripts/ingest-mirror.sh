#!/usr/bin/env bash
# Ingesta de una captura HTTrack al repositorio para auditoría offline.
#
#   Uso:  ./scripts/ingest-mirror.sh /ruta/a/la/captura [nombre-destino]
#   Ej.:  ./scripts/ingest-mirror.sh ~/Documents/Projects/azucarWeb azucarhotel
#
# Copia sólo los archivos de texto (HTML/CSS/JS/SVG/…) y genera un manifiesto
# completo con el tamaño de TODO, imágenes incluidas. Así el repositorio queda
# ligero y no se pierde el dato de peso, que es justo lo que necesita el
# análisis de rendimiento.
#
# Compatible con macOS (bash 3.2, herramientas BSD) y Linux.

set -euo pipefail

SRC="${1:-}"
NAME="${2:-captura}"
MAX_TEXT_BYTES=$((5 * 1024 * 1024))   # no copiar "texto" de más de 5 MB (bundles minificados)

if [ -z "$SRC" ] || [ ! -d "$SRC" ]; then
  echo "ERROR: pasa la ruta de la captura. Ej.: $0 ~/Documents/Projects/azucarWeb azucarhotel" >&2
  exit 1
fi

REPO="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "$REPO" ]; then
  echo "ERROR: ejecuta este script desde dentro del repositorio azucarWebSite." >&2
  exit 1
fi

SRC="$(cd "$SRC" && pwd)"
DEST="$REPO/investigacion/mirrors/$NAME"
rm -rf "$DEST"; mkdir -p "$DEST/archivos"

echo "Origen : $SRC"
echo "Destino: $DEST"
echo

# ---------- 1. Manifiesto completo (todo, con tamaños) ----------
echo "bytes	ruta" > "$DEST/manifiesto.tsv"
find "$SRC" -type f -print0 | while IFS= read -r -d '' f; do
  printf '%s\t%s\n' "$(wc -c < "$f" | tr -d ' ')" "${f#$SRC/}"
done | sort -t"$(printf '\t')" -k1,1nr >> "$DEST/manifiesto.tsv"

TOTAL_FILES=$(( $(wc -l < "$DEST/manifiesto.tsv") - 1 ))
echo "Manifiesto: $TOTAL_FILES archivos"

# ---------- 2. Copia de archivos de texto ----------
COPIED=0; SKIPPED_BIG=0
find "$SRC" -type f \( \
     -iname '*.html' -o -iname '*.htm'  -o -iname '*.css'  -o -iname '*.js'   \
  -o -iname '*.mjs'  -o -iname '*.json' -o -iname '*.xml'  -o -iname '*.txt'  \
  -o -iname '*.svg'  -o -iname '*.webmanifest' -o -iname '*.map' -o -iname '*.php' \
  \) -print0 | while IFS= read -r -d '' f; do
    sz=$(wc -c < "$f" | tr -d ' ')
    if [ "$sz" -gt "$MAX_TEXT_BYTES" ]; then
      echo "  omitido por tamaño ($sz B): ${f#$SRC/}" >> "$DEST/omitidos.txt"
      continue
    fi
    rel="${f#$SRC/}"
    mkdir -p "$DEST/archivos/$(dirname "$rel")"
    cp "$f" "$DEST/archivos/$rel"
done
COPIED=$(find "$DEST/archivos" -type f | wc -l | tr -d ' ')
echo "Copiados : $COPIED archivos de texto"

# ---------- 3. Logs de HTTrack ----------
find "$SRC" -maxdepth 3 -type f \( -name 'hts-log.txt' -o -name '*.whtt' -o -name 'hts-cache' \) \
  -exec cp {} "$DEST/" \; 2>/dev/null || true

# ---------- 4. Resumen por extensión ----------
{
  echo "# Resumen de la captura: $NAME"
  echo
  echo "- Archivos totales: $TOTAL_FILES"
  echo "- Archivos de texto copiados al repositorio: $COPIED"
  echo "- Peso total del original: $(du -sh "$SRC" | cut -f1)"
  echo
  echo "## Por extensión (cantidad y peso total)"
  echo
  echo '| ext | archivos | KB |'
  echo '|---|---|---|'
  tail -n +2 "$DEST/manifiesto.tsv" | awk -F'\t' '
    { n=split($2,a,"."); ext = (n>1 ? tolower(a[n]) : "(sin ext)");
      cnt[ext]++; sum[ext]+=$1 }
    END { for (e in cnt) printf "| %s | %d | %.0f |\n", e, cnt[e], sum[e]/1024 }' | sort -t'|' -k4 -rn
  echo
  echo "## 25 archivos más pesados"
  echo
  echo '| KB | ruta |'
  echo '|---|---|'
  tail -n +2 "$DEST/manifiesto.tsv" | head -25 | awk -F'\t' '{printf "| %.0f | %s |\n", $1/1024, $2}'
} > "$DEST/resumen.md"

echo
echo "Listo. Revisa $DEST/resumen.md"
echo
echo "Siguiente paso:"
echo "  git add investigacion/mirrors/$NAME"
echo "  git commit -m \"chore: captura HTTrack de $NAME\""
echo "  git push -u origin claude/hotel-tulum-web-audit-0yly29"
