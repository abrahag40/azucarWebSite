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
#  Es un reel de Instagram: 18 planos de unos 2.2 s, y el último lleva el
#  LOGOTIPO del hotel incrustado sobre el agua de la alberca.
#
#  ── EL PROBLEMA DE FONDO: UN 9:16 EN UN HÉROE APAISADO ─────────────────────
#  Con `cover`, de un 9:16 sólo se ve una BANDA de 608 px de los 1920 —el 32 %
#  de la altura del cuadro—. Qué caiga dentro de esa banda no es un detalle: es
#  la diferencia entre enseñar la alberca o enseñar una repisa.
#
#  ── POR QUÉ CADA PLANO LLEVA SU PROPIO RECORTE ─────────────────────────────
#  🔴 Primera versión: un solo desplazamiento (40 %) para todo el vídeo. Es lo
#  que hace `object-position` en CSS, y por eso parecía razonable. Está mal, y
#  se vio en cuanto entró el plano del logotipo: el logo está CENTRADO en el
#  cuadro —medido, 50.0 % en los dos ejes— y una banda al 40 % le cortaba la
#  base y lo dejaba al 71 % de la franja. Se veía descolgado hacia abajo.
#
#  Un desplazamiento único obliga a que todos los planos tengan su asunto a la
#  misma altura, y no la tienen: la alberca está abajo, las palmeras arriba, el
#  logotipo en el centro. **El encuadre es una decisión POR PLANO**, y aquí se
#  toma antes de codificar, no en el CSS.
#
#  El CSS, en consecuencia, ya no reencuadra: `object-position: center`.
#
#  ── LA SELECCIÓN, Y SU ORDEN ───────────────────────────────────────────────
#  De los 18 planos se eligen SIETE, y el orden no es el del original: cuenta
#  una llegada. Fuera quedan los de clóset y lavabo, que recortados a lo ancho
#  son una repisa y un espejo.
#
#      fuera → dentro → mirando afuera → marca
#
#  Cada `y` de recorte se eligió mirando el plano con las bandas candidatas
#  superpuestas, no a ojo sobre el vídeo entero.
# ============================================================================
set -euo pipefail

ORIGEN="${1:?Uso: $0 <ruta al mp4 original>}"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
DESTINO="$RAIZ/site/src/assets/video"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$DESTINO"

# ── EL MONTAJE ──────────────────────────────────────────────────────────────
#   inicio  fin    y-recorte  rótulo
#   El `y` es la esquina superior de la banda de 608 px dentro del cuadro de
#   1920. 655 es el centro exacto; por debajo se sube la mirada, por encima se
#   baja.
MONTAJE=(
  " 7.10  8.80  682  alberca y mar"          # la llegada: alberca, barandal, Caribe
  " 9.15 10.90  590  palmeras y camastro"    # se levanta la vista
  " 4.80  6.55  656  terraza con hamaca"     # el umbral
  "16.00 17.75  761  silla y puertas"        # se entra
  "11.40 13.20  722  recámara de piedra"     # dentro
  "27.00 28.80  722  cama con balcón"        # dentro, mirando afuera
  "39.20 41.80  655  agua y LOGOTIPO"        # la marca. 655 = centro medido
)

# ── 1. Cada plano, recortado a SU altura ────────────────────────────────────
#   El recorte se aplica AQUÍ, plano a plano, y no en un filtro común al final:
#   ése es justamente el cambio. Los intermedios van casi sin pérdida (crf 12)
#   para que la única compresión que cuenta sea la del paso final.
#
#   `hqdn3d` suave, y nada de afilado. Medido con presupuesto de bytes fijo: sin
#   denoise el cielo hace bandas; con denoise fuerte las palmeras se empastan.
#   El denoise no ahorra bytes, los REASIGNA — quita el grano del teléfono, que
#   es incompresible, y paga con ellos el movimiento de las palmas. `unsharp` se
#   probó y se descartó: afilar antes de comprimir es pedirle al códec que gaste
#   en halos.
#   `eq`: +4 % de contraste y +6 % de saturación. Poco a propósito — el Caribe
#   sobresaturado es el cliché que hace que una foto de hotel parezca falsa.
REALCE="hqdn3d=2:1.5:3:3,eq=contrast=1.04:saturation=1.06"

: > "$TMP/lista-ancho.txt"
: > "$TMP/lista-alto.txt"
i=0
for fila in "${MONTAJE[@]}"; do
  read -r ini fin y rot <<< "$fila"
  i=$((i+1))
  printf "  %d/7  %-24s %5.2f–%-5.2f s   recorte y=%s\n" "$i" "$rot" "$ini" "$fin" "$y"
  # Apaisado: recorte propio de este plano.
  ffmpeg -y -v error -ss "$ini" -to "$fin" -i "$ORIGEN" -an \
    -vf "crop=1080:608:0:$y,$REALCE" \
    -c:v libx264 -crf 12 -preset veryfast -pix_fmt yuv420p "$TMP/a$i.mp4"
  # Vertical: el cuadro entero, que en un teléfono es el acierto. No hace falta
  # recorte — y por eso el logotipo se ve completo sin tocar nada.
  ffmpeg -y -v error -ss "$ini" -to "$fin" -i "$ORIGEN" -an \
    -vf "$REALCE" \
    -c:v libx264 -crf 12 -preset veryfast -pix_fmt yuv420p "$TMP/v$i.mp4"
  echo "file '$TMP/a$i.mp4'" >> "$TMP/lista-ancho.txt"
  echo "file '$TMP/v$i.mp4'" >> "$TMP/lista-alto.txt"
done

ffmpeg -y -v error -f concat -safe 0 -i "$TMP/lista-ancho.txt" -c copy "$TMP/maestro-ancho.mp4"
ffmpeg -y -v error -f concat -safe 0 -i "$TMP/lista-alto.txt"  -c copy "$TMP/maestro-alto.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/maestro-ancho.mp4")
printf "\n  Montaje: %.1f s\n\n" "$DUR"
# ── 2. Resolución NATIVA, que es lo que más calidad da por byte ─────────────
#   🔴 Segunda corrección. La versión anterior ampliaba la banda de 1080×608 a
#   1280×720 con lanczos «para que se viera mejor en escritorio». No se ve
#   mejor: **el original mide 1080 de ancho y ahí no hay más detalle que
#   inventar**. Ampliar antes de codificar sólo obliga al códec a gastar bits en
#   reproducir el desenfoque de la propia ampliación.
#
#   Codificando en nativo, esos bits se quedan en la imagen real. De 1080 en
#   adelante escala el navegador, que para eso está, y con menos píxeles que
#   codificar el mismo presupuesto rinde bastante más.
#
#   El vertical sí se REDUCE —de 1080×1920 a 608×1080—: reducir sí es honesto,
#   y en un teléfono 608 de ancho sobran.
#
# ── 3. Presupuesto de BYTES, no de calidad ─────────────────────────────────
#   VP9 con calidad constante daba 15 MB para 8 s: las palmeras al viento y las
#   cáusticas del agua son de lo más caro que existe de codificar, y a calidad
#   constante el códec gasta lo que haga falta. Un héroe no puede pesar «lo que
#   salga». VBR de dos pasadas: la primera mira el material entero y la segunda
#   reparte el presupuesto donde hace falta.
#
#   Cada navegador descarga UN archivo, no los cuatro.
VP9_ANCHO=700k;  X264_ANCHO=1000k
VP9_ALTO=560k;   X264_ALTO=820k

codificar () { # maestro escala nombre bitrate_vp9 bitrate_x264
  local maestro="$1" escala="$2" nombre="$3" bv="$4" bx="$5"
  local vf=""; [ -n "$escala" ] && vf="-vf scale=$escala:flags=lanczos"
  echo "  · $nombre"
  ffmpeg -y -v error -i "$maestro" $vf -an \
    -c:v libvpx-vp9 -b:v "$bv" -row-mt 1 -deadline good -cpu-used 2 \
    -pix_fmt yuv420p -pass 1 -passlogfile "$TMP/vp9-$nombre" -f null /dev/null
  ffmpeg -y -v error -i "$maestro" $vf -an \
    -c:v libvpx-vp9 -b:v "$bv" -row-mt 1 -deadline good -cpu-used 2 \
    -pix_fmt yuv420p -pass 2 -passlogfile "$TMP/vp9-$nombre" "$DESTINO/${nombre}.webm"
  # H.264 High: el respaldo universal y lo único que reproduce Safari viejo.
  # `+faststart` mueve el índice al principio del archivo; sin él el navegador
  # se descarga el archivo entero antes de pintar el primer fotograma.
  ffmpeg -y -v error -i "$maestro" $vf -an \
    -c:v libx264 -b:v "$bx" -maxrate "$(( ${bx%k} * 13 / 10 ))k" -bufsize "$(( ${bx%k} * 3 ))k" \
    -preset veryslow -profile:v high -level 4.0 -pix_fmt yuv420p \
    -passlogfile "$TMP/x264-$nombre" -pass 1 -f null /dev/null
  ffmpeg -y -v error -i "$maestro" $vf -an \
    -c:v libx264 -b:v "$bx" -maxrate "$(( ${bx%k} * 13 / 10 ))k" -bufsize "$(( ${bx%k} * 3 ))k" \
    -preset veryslow -profile:v high -level 4.0 -pix_fmt yuv420p -movflags +faststart \
    -passlogfile "$TMP/x264-$nombre" -pass 2 "$DESTINO/${nombre}.mp4"
}
codificar "$TMP/maestro-ancho.mp4" ""        hero-ancho "$VP9_ANCHO" "$X264_ANCHO"
codificar "$TMP/maestro-alto.mp4"  "608:1080" hero-alto  "$VP9_ALTO"  "$X264_ALTO"

# ── 4. NO se genera póster, y es una decisión medida ────────────────────────
#   Una versión anterior extraía el primer fotograma y lo ponía como `poster`.
#   Medido en el navegador con `performance.getEntriesByType`, ese póster se
#   pedía a los **615 ms, a la vez que la fotografía del héroe**, y le disputaba
#   el ancho de banda al elemento LCP: `preload="none"` cubre el medio, no el
#   póster. Y encima no se veía nunca, porque el vídeo va a `opacity: 0` hasta
#   que pinta su primer fotograma. Ver `VideoHero.astro`, nota 4.

echo
echo "  Listo. En $DESTINO:"
ls -lh "$DESTINO" | awk 'NR>1 {printf "    %-22s %s\n", $9, $5}'
