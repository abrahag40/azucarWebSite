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


# ── Redacta credenciales encontradas en los archivos capturados. ──────────────
# Un mirror de un sitio ajeno puede contener credenciales que su dueño dejó
# expuestas en el cliente. Versionarlas seria propagar la fuga; ignorarlas seria
# perder el hallazgo. Se redacta el valor y se registra la ubicacion y el tipo.
redactar_secretos() {
  local DEST="$1" NAME="$2"
  local REPORTE="$DEST/secretos-redactados.md"
  local TMP="$DEST/.hits"
  : > "$TMP"

  # tipo|regex-perl  (solo prefijos inequivocos; evitamos falsos positivos)
  local PATRONES='mapbox-secret|sk\.ey[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}
mapbox-public|pk\.ey[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}
google-api-key|AIza[0-9A-Za-z_-]{35}
aws-access-key|AKIA[0-9A-Z]{16}
stripe-live|[sr]k_live_[0-9a-zA-Z]{16,}
github-token|gh[pousr]_[A-Za-z0-9]{30,}
slack-token|xox[baprs]-[A-Za-z0-9-]{10,}
session-cookie|(?i:JSESSIONID|PHPSESSID|ASP\.NET_SessionId|AWSALB|AWSALBCORS|connect\.sid|laravel_session|_session_id)[\t ;=]+\K[A-Za-z0-9%+\/=_.-]{16,}'

  local ARCHIVOS
  ARCHIVOS=$(find "$DEST/archivos" -type f \( -iname '*.html' -o -iname '*.htm' -o -iname '*.js' \
    -o -iname '*.css' -o -iname '*.json' -o -iname '*.xml' -o -iname '*.txt' -o -iname '*.svg' \
    -o -iname '*.map' -o -iname '*.php' \) 2>/dev/null || true)
  [ -z "$ARCHIVOS" ] && return 0

  local TIPO RE N=0
  while IFS='|' read -r TIPO RE; do
    [ -z "$TIPO" ] && continue
    # 1) Registrar ubicaciones SIN el valor
    echo "$ARCHIVOS" | while IFS= read -r f; do
      [ -z "$f" ] && continue
      perl -ne "print \"$TIPO\t\$ARGV\t\$.\n\" if /$RE/" "$f" 2>/dev/null || true
    done >> "$TMP"
    # 2) Sustituir el valor
    echo "$ARCHIVOS" | while IFS= read -r f; do
      [ -z "$f" ] && continue
      perl -pi -e "s/$RE/[[REDACTADO:$TIPO]]/g" "$f" 2>/dev/null || true
    done
  done <<EOF
$PATRONES
EOF

  N=$(wc -l < "$TMP" | tr -d ' ')
  if [ "$N" -eq 0 ]; then rm -f "$TMP"; return 0; fi

  {
    echo "# Credenciales redactadas en la captura \`$NAME\`"
    echo
    echo "GitHub bloquea el push de repositorios que contengan credenciales, y con razón."
    echo "Estas se encontraron **en el sitio capturado**, expuestas del lado del cliente por"
    echo "su propietario. El valor se sustituyó por \`[[REDACTADO:tipo]]\`; aquí queda la"
    echo "ubicación y el tipo, que es lo que necesita el análisis."
    echo
    echo "**No son credenciales nuestras ni del cliente.** Si procede avisar a su dueño, es"
    echo "una decisión de Abraham, no de este script."
    echo
    echo "| tipo | archivo | línea |"
    echo "|---|---|---|"
    sort -u "$TMP" | awk -F'\t' -v d="$DEST/archivos/" '{ p=$2; sub(d,"",p); printf "| %s | `%s` | %s |\n", $1, p, $3 }'
  } > "$REPORTE"
  rm -f "$TMP"
  echo "   ⚠ $N credencial(es) redactada(s) — ver $(basename "$REPORTE")"
}

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
  ( cd "$SRC" && tar cf - --exclude './hts-cache' --exclude './^' --exclude './cookies.txt' . ) \
    | ( cd "$DEST/archivos" && tar xf - )

  # 3. Redactar credenciales antes de que git las vea
  redactar_secretos "$DEST" "$NAME"

  # 4. Cortar archivos individuales demasiado grandes para git
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

  # 5. Resumen legible
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
  # Dos causas distintas con el mismo sintoma. Distinguirlas importa: una es exito
  # (idempotencia) y la otra es fallo. Reportarlas igual asusta sin motivo.
  if git ls-files --error-unmatch investigacion/mirrors >/dev/null 2>&1; then
    echo
    echo "  ✓ Sin cambios: las capturas ya estaban publicadas e identicas."
    git fetch -q origin "$BRANCH" 2>/dev/null || true
    if [ -n "$(git log --oneline "origin/$BRANCH..HEAD" 2>/dev/null)" ]; then
      echo "    Hay commits locales sin publicar; empujando..."
    else
      echo "    Nada pendiente. Todo esta en el remoto."
      exit 0
    fi
  else
    echo
    echo "  ✗ NO HAY NADA QUE PUBLICAR: la ingesta produjo archivos pero git no los ve."
    echo "     Revisa exclusiones:  git check-ignore -v investigacion/mirrors/*/archivos/*"
    exit 1
  fi
else
  git commit -q -m "chore: capturas HTTrack ingeridas ($(echo $OK_LIST | tr ' ' ','))

Generado por scripts/ingest-mirror.sh. Incluye manifiesto con el tamano de todos
los archivos del original y resumen por extension de cada captura."
fi

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
