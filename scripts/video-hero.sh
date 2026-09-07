#!/usr/bin/env bash
# ============================================================================
#  Vídeo del héroe de la portada — de los 85 MB del original a la web.
#
#  Se ejecuta A MANO y su salida se versiona en `site/src/assets/video/`. NO va
#  en el build: ffmpeg no está en CI ni en Cloudflare, y transcodificar en cada
#  despliegue serían minutos de CPU para un archivo que cambia dos veces al año.
#  Lo que sí se versiona es ESTE script, para que el resultado sea reproducible
#  y se sepa exactamente qué se le hizo al material del hotel.
#
#  Requisitos:  brew install ffmpeg
#  Uso:         ./scripts/video-hero.sh "/ruta/al/22_mayo.mp4"
#
#  ── QUÉ ES EL ORIGINAL ─────────────────────────────────────────────────────
#  1080×1920 VERTICAL · 42 s · H.264 a 16.2 Mbps · 85.2 MB · con audio.
#  Es un reel de Instagram: 19 planos de unos 2.2 s cada uno.
#
#  ── POR QUÉ NO SE USA ENTERO, QUE ES LA DECISIÓN QUE MÁS PESA ──────────────
#  El héroe es apaisado en escritorio. Un 9:16 dentro de él, con `cover`, sólo
#  enseña una BANDA CENTRAL del 29 % de la altura del cuadro. Se simuló plano a
#  plano, y el resultado manda:
#
#      plano 4  (6.8– 9.0 s)  alberca, barandal, palmeras, mar   ✅ excelente
#      plano 5  (9.0–11.2 s)  palmeras y cielo, camastro         ✅ excelente
#      plano 18 (38.0–42.0 s) agua de la alberca, cáusticas      ✅ excelente
#      planos de habitación                                       ⚠️ cabecera y pared
#      planos de baño y clóset                                    ❌ lavabo, repisas
#
#  Recortado a lo ancho, un clóset es una repisa y un baño es un espejo. Se
#  eligen TRES PLANOS COMPLETOS —no se corta a mitad de toma— y todos son
#  exteriores: es además lo que promete el titular, «el mar es dulce».
#
#  ── DOS RECORTES, COMO UN <picture> ────────────────────────────────────────
#  · apaisado 16:9 para escritorio, recortando la banda que sí se ve
#  · vertical 9:16 para teléfono, donde el cuadro entero es el acierto
#  Los elige el navegador con <source media>, y así el móvil no descarga
#  píxeles que va a tirar.
# ============================================================================
set -euo pipefail

ORIGEN="${1:?Uso: $0 <ruta al mp4 original>}"
DESTINO="$(cd "$(dirname "$0")/.." && pwd)/site/src/assets/video"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$DESTINO"

# ── 1. Los tres planos, sin re-encodar todavía ──────────────────────────────
#   Los límites salen de `select='gt(scene,0.35)'` sobre el original, así que
#   son los cortes REALES del montaje. Se entra 40 ms después y se sale 50 ms
#   antes para no arrastrar el fotograma de transición.
segmento () { # inicio fin salida
  ffmpeg -y -v error -ss "$1" -to "$2" -i "$ORIGEN" \
    -an -c:v libx264 -crf 14 -preset slow "$TMP/$3"
}
segmento 6.80 11.15 a.mp4   # alberca de la terraza + palmeras y mar
segmento 38.05 41.90 b.mp4  # agua de la alberca

printf "file '%s'\n" "$TMP/a.mp4" "$TMP/b.mp4" > "$TMP/lista.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$TMP/lista.txt" -c copy "$TMP/maestro.mp4"

# ── 2. Realce: denoise suave, y NADA de afilado ─────────────────────────────
#   Medido, no supuesto. Se codificó el plano caro TRES veces con el MISMO
#   presupuesto de bytes (1.4 Mbps) y se compararon a tamaño real:
#
#       sin denoise    palmeras ruidosas y CIELO CON BANDAS
#       hqdn3d suave   cielo limpio, palmeras aún separadas   ← gana
#       hqdn3d fuerte  cielo limpísimo, palmeras empastadas
#
#   La pregunta correcta no era «cuál pesa menos» —con presupuesto fijo pesan
#   lo mismo— sino «cuál se ve mejor». El denoise no ahorra bytes: los
#   REASIGNA. Quita el grano del teléfono, que es incompresible y no aporta
#   nada, y con esos bits paga el movimiento de las palmeras, que sí se ve.
#
#   `unsharp` se probó y se DESCARTÓ: a bitrate limitado, afilar añade energía
#   de alta frecuencia que hay que codificar, y esos bits salen de otro sitio.
#   Afilar antes de comprimir es pedirle al códec que gaste en halos.
#
#   eq: +4 % de contraste y +6 % de saturación, poco a propósito. El Caribe
#   sobresaturado es el cliché que hace que una foto de hotel parezca falsa.
REALCE="hqdn3d=2:1.5:3:3,eq=contrast=1.04:saturation=1.06"

# ── 3. Los dos recortes ─────────────────────────────────────────────────────
#   La banda apaisada se toma al 40 % de la altura, que es el mismo
#   `object-position: center 40%` que ya usaba la fotografía del héroe: así el
#   encuadre del vídeo y el del póster de respaldo coinciden y no hay salto.
#
#   1280×720 y no 1920×1080: el original mide 1080 de ancho, y ampliar a 1920
#   sería inventar detalle y pagarlo en bytes. De 1280 en adelante escala el
#   navegador, que para eso está.
CROP_ANCHO="crop=1080:608:0:525,${REALCE},scale=1280:720:flags=lanczos"
CROP_ALTO="${REALCE},scale=720:1280:flags=lanczos"

# ── 4. Presupuesto de BYTES, no de calidad ──────────────────────────────────
#   🔴 Aquí hubo una corrección. El primer intento usó VP9 con calidad
#   constante (`-crf 34 -b:v 0`) y produjo **15 MB y subiendo** para 8 segundos:
#   las palmeras al viento y las cáusticas del agua son de lo más caro que
#   existe de codificar, y a calidad constante el códec gasta lo que haga falta.
#
#   Un héroe no puede tener un peso «el que salga». Se pasa a VBR de dos
#   pasadas con objetivo explícito: la primera pasada mira el material entero y
#   la segunda reparte el presupuesto donde hace falta. El tamaño deja de ser
#   una sorpresa.
#
#   Cada navegador descarga UN archivo, no los cuatro.
VP9_ANCHO=850k;  X264_ANCHO=1250k
VP9_ALTO=650k;   X264_ALTO=950k

codificar () { # filtro nombre bitrate_vp9 bitrate_x264
  local filtro="$1" nombre="$2" bv="$3" bx="$4"
  echo "  · $nombre"
  # VP9 — Chrome, Edge, Firefox, Android. Dos pasadas.
  ffmpeg -y -v error -i "$TMP/maestro.mp4" -vf "$filtro" -an \
    -c:v libvpx-vp9 -b:v "$bv" -row-mt 1 -deadline good -cpu-used 2 \
    -pix_fmt yuv420p -pass 1 -passlogfile "$TMP/vp9-$nombre" -f null /dev/null
  ffmpeg -y -v error -i "$TMP/maestro.mp4" -vf "$filtro" -an \
    -c:v libvpx-vp9 -b:v "$bv" -row-mt 1 -deadline good -cpu-used 2 \
    -pix_fmt yuv420p -pass 2 -passlogfile "$TMP/vp9-$nombre" "$DESTINO/${nombre}.webm"
  # H.264 High — el respaldo universal y lo único que reproduce Safari viejo.
  # `+faststart` mueve el índice al principio del archivo: sin él el navegador
  # se descarga el archivo entero antes de pintar el primer fotograma.
  ffmpeg -y -v error -i "$TMP/maestro.mp4" -vf "$filtro" -an \
    -c:v libx264 -b:v "$bx" -maxrate $(( ${bx%k} * 13 / 10 ))k -bufsize $(( ${bx%k} * 3 ))k \
    -preset veryslow -profile:v high -level 4.0 -pix_fmt yuv420p \
    -passlogfile "$TMP/x264-$nombre" -pass 1 -f null /dev/null
  ffmpeg -y -v error -i "$TMP/maestro.mp4" -vf "$filtro" -an \
    -c:v libx264 -b:v "$bx" -maxrate $(( ${bx%k} * 13 / 10 ))k -bufsize $(( ${bx%k} * 3 ))k \
    -preset veryslow -profile:v high -level 4.0 -pix_fmt yuv420p -movflags +faststart \
    -passlogfile "$TMP/x264-$nombre" -pass 2 "$DESTINO/${nombre}.mp4"
}
codificar "$CROP_ANCHO" hero-ancho "$VP9_ANCHO" "$X264_ANCHO"
codificar "$CROP_ALTO"  hero-alto  "$VP9_ALTO"  "$X264_ALTO"

# ── 5. NO se genera póster, y es una decisión medida ────────────────────────
#   La primera versión extraía el primer fotograma y lo ponía como `poster` del
#   <video>. Medido en el navegador con `performance.getEntriesByType`, ese
#   póster se pedía a los **615 ms, a la vez que la fotografía del héroe**, y le
#   disputaba el ancho de banda al elemento LCP: `preload="none"` cubre el
#   medio, no el póster.
#
#   Y encima no se veía nunca: el vídeo va a `opacity: 0` hasta que pinta su
#   primer fotograma, y hasta entonces lo que se ve es la fotografía de debajo.
#   Un archivo descargado en el peor momento posible para no enseñarse jamás.
#   Ver `VideoHero.astro`, nota 4.

echo
echo "  Listo. En $DESTINO:"
ls -lh "$DESTINO" | awk 'NR>1 {printf "    %-26s %s\n", $9, $5}'
