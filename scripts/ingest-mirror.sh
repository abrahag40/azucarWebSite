#!/usr/bin/env bash
# Ingesta de las capturas HTTrack al repositorio para auditoría offline.
#
#   Uso:  ./scripts/ingest-mirror.sh /Users/abraham/Documents/Projects/azucarWeb
#
# Diseño:
#   - Cada captura se procesa AISLADA. Si una falla, las demás continúan y al final
#     se publica lo que sí salió. Un fallo parcial no puede volver a costar una ronda.
#   - Toda la salida queda en investigacion/ingest.log para diagnóstico posterior.
#   - hts-cache y "^" se excluyen en el momento de copiar, no después: son artefactos
#     internos de HTTrack (duplicación pura y stub de enlaces fuera de filtro). Leerlos
#     para luego borrarlos era trabajo inútil y una superficie de fallo de más.
#
# NOTA: no canalizar hacia `head` en este script. Con `set -o pipefail`, si el productor
# no cabe en el buffer de la tubería (64 KB) recibe SIGPIPE al cerrar head, sale con 141
# y `set -e` aborta. Para limitar filas se usa `awk NR<=N`, que consume toda la entrada.
#
# Compatible con macOS (bash 3.2, herramientas BSD) y Linux.

set -Eeuo pipefail

SRC_ROOT="${1:-}"
MAX_FILE_BYTES=$((50 * 1024 * 1024))   # GitHub rechaza >100 MB; cortamos antes
BRANCH="claude/hotel-tulum-web-audit-0yly29"
CAPTURAS="actualWebsite:azucarhotel propuestaAnterior:resnexus plantillaBase:cappa"

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
LOG="$REPO/investigacion/ingest.log"
mkdir -p "$REPO/investigacion"
exec > >(tee "$LOG") 2>&1

trap 'echo; echo "✗ Error inesperado en la línea $LINENO. Registro en $LOG"' ERR

echo "Origen : $SRC_ROOT"
echo "Destino: $BASE"
echo "Registro: $LOG"
echo

# ── Procesa una captura. Se invoca en subshell aislado. ────────────────────────
procesar_captura() {
  local ORIG="$1" NAME="$2" SRC="$3" DEST="$4"

  rm -rf "$DEST"; mkdir -p "$DEST/archivos"

  # 1. Manifiesto del ORIGINAL completo, antes de excluir nada.
  #    Conserva el peso de todo, incluso de lo que no se versiona.
  printf 'bytes\truta\n' > "$DEST/manifiesto.tsv"
  find "$SRC" -type f -print0 \
    | while IFS= read -r -d '' f; do
        printf '%s\t%s\n' "$(wc -c < "$f" | tr -d ' ')" "${f#$SRC/}"
      done \
    | sort -t"$(printf '\t')" -k1,1nr >> "$DEST/manifiesto.tsv"

  local TOTAL; TOTAL=$(( $(wc -l < "$DEST/manifiesto.tsv") - 1 ))
  if [ "$TOTAL" -eq 0 ]; then
    echo "   ⚠ La captura de origen está vacía: 0 archivos en $SRC"
    return 1
  fi

  # 2. Copia, excluyendo artefactos de HTTrack en origen
  ( cd "$SRC" && tar cf - --exclude './hts-cache' --exclude './^' . ) \
    | ( cd "$DEST/archivos" && tar xf - )

  # 3. Cortar archivos individuales demasiado grandes para git
  find "$DEST/archivos" -type f -size +"$((MAX_FILE_BYTES/1024))"k -print -delete \
    > "$DEST/excluidos-por-tamano.txt" 2>/dev/null || true
  [ -s "$DEST/excluidos-por-tamano.txt" ] || rm -f "$DEST/excluidos-por-tamano.txt"

  local COPIADOS PESO_ORIG PESO_DEST
  COPIADOS=$(find "$DEST/archivos" -type f | wc -l | tr -d ' ')
  PESO_ORIG=$(du -sh "$SRC" | cut -f1)
  PESO_DEST=$(du -sh "$DEST/archivos" | cut -f1)

  if [ "$COPIADOS" -eq 0 ]; then
    echo "   ⚠ No se copió ningún archivo pese a haber $TOTAL en origen"
    return 1
  fi

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
    tail -n +2 "$DEST/manifiesto.tsv" \
      | awk -F'\t' '{ n=split($2,a,"."); ext=(n>1 ? tolower(a[n]) : "(sin-ext)");
                      cnt[ext]++; sum[ext]+=$1 }
                    END { for (e in cnt) printf "| %s | %d | %.0f |\n", e, cnt[e], sum[e]/1024 }' \
      | sort -t'|' -k4 -rn | awk 'NR<=25'
    echo
    echo "## 30 archivos más pesados"
    echo
    echo '| KB | ruta |'
    echo '|---|---|'
    awk -F'\t' 'NR>1 && NR<=31 {printf "| %.0f | %s |\n", $1/1024, $2}' "$DEST/manifiesto.tsv"
  } > "$DEST/resumen.md"

  echo "   $TOTAL archivos en origen · $COPIADOS versionados · original $PESO_ORIG · versionado $PESO_DEST"
  return 0
}

# ── Bucle con aislamiento por captura ─────────────────────────────────────────
OK_LIST=""; FAIL_LIST=""
for par in $CAPTURAS; do
  ORIG="${par%%:*}"; NAME="${par##*:}"; SRC="$SRC_ROOT/$ORIG"

  echo "── $ORIG → $NAME"
  if [ ! -d "$SRC" ]; then
    echo "   ✗ Carpeta no encontrada: $SRC"
    FAIL_LIST="$FAIL_LIST $ORIG(no-existe)"
    continue
  fi

  # Subshell aislado dentro de un `if`. Dos razones, ambas necesarias:
  #  - `set +e` NO silencia el trap ERR: en bash son mecanismos independientes.
  #    Un contexto de condición sí lo suprime, y el fallo ya se reporta abajo.
  #  - El subshell reafirma `set -e` para abortar esa captura al primer error,
  #    sin arrastrar a las demás.
  if ( set -euo pipefail; procesar_captura "$ORIG" "$NAME" "$SRC" "$BASE/$NAME" ); then
    st=0
  else
    st=$?
  fi

  if [ "$st" -eq 0 ]; then OK_LIST="$OK_LIST $NAME"
  else
    echo "   ✗ FALLÓ (código $st) — continúo con las demás"
    rm -rf "$BASE/$NAME"   # sin restos a medias: o la captura está completa o no está
    FAIL_LIST="$FAIL_LIST $ORIG(err:$st)"
  fi
done

echo
echo "════════════════════════════════════════════"
echo "  Correctas :${OK_LIST:- ninguna}"
echo "  Fallidas  :${FAIL_LIST:- ninguna}"
[ -d "$BASE" ] && du -sh "$BASE" | awk '{print "  Total a versionar: " $1}'
echo "════════════════════════════════════════════"

if [ -z "$OK_LIST" ]; then
  echo "  ✗ Ninguna captura se ingirió. No hay nada que publicar. Registro: $LOG" >&2
  exit 1
fi

# ── Publicar lo que sí salió ──────────────────────────────────────────────────
cd "$REPO"
git add investigacion/mirrors
if git diff --cached --quiet; then
  echo
  echo "  ✗ NO HAY NADA QUE PUBLICAR: git no ve cambios."
  echo "     Revisa exclusiones:  git check-ignore -v investigacion/mirrors/*/archivos/*"
  exit 1
fi
git commit -q -m "chore: capturas HTTrack ingeridas ($(echo $OK_LIST | tr ' ' ','))

Generado por scripts/ingest-mirror.sh. Incluye manifiesto con el tamano de todos
los archivos del original y resumen por extension de cada captura."

echo "Publicando en $BRANCH ..."
for intento in 1 2 3 4; do
  if git push -u origin "$BRANCH"; then
    echo; echo "Listo. Capturas publicadas:${OK_LIST}"
    [ -n "$FAIL_LIST" ] && echo "Pendientes por fallo:${FAIL_LIST} — revisa $LOG"
    exit 0
  fi
  espera=$((2 ** intento))
  echo "Push fallido, reintento en ${espera}s ..."
  sleep "$espera"
done
echo "  ✗ No se pudo publicar tras 4 intentos. El commit SÍ existe en local." >&2
echo "     Prueba: git push -u origin $BRANCH" >&2
exit 1
