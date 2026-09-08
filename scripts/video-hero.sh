#!/usr/bin/env bash
# ============================================================================
#  Vídeo del héroe de la portada — del reel del cliente a la web.
#
#  Se ejecuta A MANO y su salida se versiona en `site/src/assets/video/`. NO va
#  en el build: ffmpeg no está en CI ni en Cloudflare, y transcodificar en cada
#  despliegue serían minutos de CPU para un archivo que cambia dos veces al año.
#  Lo que sí se versiona es ESTE script, para que el resultado sea reproducible
#  y se sepa exactamente qué se le hizo al material del hotel.
#
#  Requisitos:  brew install ffmpeg
#  Uso:         ./scripts/video-hero.sh "/ruta/al/24_mayo.mp4"
#
#  ── QUÉ ES EL ORIGINAL ─────────────────────────────────────────────────────
#  `24_mayo.mp4` — 1080×1920 VERTICAL · 24.1 s a 24 fps · H.264 a 15.5 Mbps ·
#  46.9 MB · con audio. Es un reel de Instagram: OCHO planos de unos 2.7 s, y
#  el último funde el LOGOTIPO del hotel sobre el agua de la alberca.
#
#  Sustituye a `22_mayo.mp4` (2026-09-07). La diferencia que manda: aquél tenía
#  planos de interior —clóset, lavabo— que recortados a lo ancho eran una
#  repisa y un espejo, y hubo que descartar 11 de 18. **Aquí los ocho planos
#  son de exterior y los ocho entran.**
#
#  ── EL PROBLEMA DE FONDO: UN 9:16 EN UN HÉROE APAISADO ─────────────────────
#  Con `cover`, de un 9:16 sólo se ve una BANDA de 608 px de los 1920 —el 32 %
#  de la altura del cuadro—. Qué caiga dentro de esa banda no es un detalle: es
#  la diferencia entre enseñar la alberca o enseñar el techo de la palapa.
#
#  ── POR QUÉ CADA PLANO LLEVA SU PROPIO RECORTE ─────────────────────────────
#  🔴 Lección heredada del vídeo anterior: un solo desplazamiento (lo que hace
#  `object-position` en CSS) obliga a que todos los planos tengan su asunto a
#  la misma altura, y no la tienen. Aquí la alberca está abajo, las palmeras
#  arriba y el logotipo justo en el centro. **El encuadre es una decisión POR
#  PLANO**, y se toma antes de codificar, no en el CSS.
#
#  El CSS, en consecuencia, no reencuadra: `object-position: center`.
#
#  Cada `y` se eligió mirando el recorte REAL de ese plano —el primer fotograma
#  y el último, por si la cámara se mueve—, no a ojo sobre el vídeo entero.
#
#  ── EL LOGOTIPO, QUE ES LA PETICIÓN EXPLÍCITA DEL CLIENTE ──────────────────
#  Medido sobre el fotograma a 23.6 s buscando píxeles claros y poco saturados:
#  el logo ocupa **x 190–890 · y 738–1179** del cuadro de 1080×1920. Su centro
#  cae en 50.0 % / 49.9 % — centrado exacto. De ahí sale y=655, que es
#  959 − 304: la banda de 608 centrada en el logo. Margen medido: 83 px arriba
#  y 84 abajo. No es un valor a ojo, es una resta.
#
#  ⚠️ Límite del material, dicho en voz alta: el logo mide 445 px de alto sobre
#  1080 de ancho, así que **su recorte más ancho posible es 1080/445 = 2.43:1**.
#  En un héroe más apaisado que eso el navegador recortaría el logo por arriba
#  y por abajo. Medido en producción: a 1920×1080 el elemento va a ~2.2:1 y el
#  logo entra entero. Un monitor ultrapanorámico (21:9) lo cortaría, y eso no
#  se arregla codificando: se arreglaría con un logo más pequeño en el original.
#
#  ── LA SELECCIÓN Y SU ORDEN ────────────────────────────────────────────────
#      la playa → la alberca → el descanso → la palapa → el arco → la marca
#
#  El orden es el del original, que ya cuenta ese recorrido. Sólo cambia la
#  duración: 1.6 s por plano en vez de 2.7. Un montaje no es el reel.
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
#   1920. 656 es el centro exacto; por debajo se sube la mirada, por encima se
#   baja.
#
#   Los cortes del original están en 3.71 · 6.46 · 9.25 · 11.96 · 14.67 ·
#   17.38 · 20.08 (detectados con `select=gt(scene,0.12)`). Cada ventana entra
#   con ~0.35 s de holgura para no arrastrar el fundido del corte.
#
#   🔴 El primer plano NO empieza en 0.60 sino en 1.00: el original abre con un
#   fundido desde negro y a 0.60 la imagen todavía está apagada.
MONTAJE=(
  " 1.00  2.60  430  playa, camastros y palmeras"
  " 4.30  5.90  650  alberca y arcos con el rotulo"
  " 7.00  8.60  680  camastros bajo las sombrillas"
  " 9.80 11.40  560  el arco de piedra y la alberca"
  "12.50 14.10  700  palapa, alberca y el Caribe"
  "15.10 16.70  680  palapa y tumbonas"
  "17.90 19.50  500  columnas, palmeras y el mar"
  "21.60 24.00  655  el agua y el LOGOTIPO"
)
# El logotipo termina de fundirse casi al final del original, así que se le
# añade una CONGELACIÓN del último fotograma para que se lea antes de que el
# bucle vuelva a empezar. Un fotograma quieto no cuesta bytes —el códec lo
# resuelve con macrobloques «sin cambio»—, así que el remate sale casi gratis.
CONGELAR=0.9

# ── 1. Cada plano, recortado a SU altura ────────────────────────────────────
#   El recorte se aplica AQUÍ, plano a plano, y no en un filtro común al final.
#   Los intermedios van casi sin pérdida (crf 12) para que la única compresión
#   que cuente sea la del paso final.
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
TOTAL=${#MONTAJE[@]}
for fila in "${MONTAJE[@]}"; do
  read -r ini fin y rot <<< "$fila"
  i=$((i+1))
  cola=""
  [ "$i" -eq "$TOTAL" ] && cola=",tpad=stop_mode=clone:stop_duration=$CONGELAR"
  printf "  %d/%d  %-32s %5.2f–%-5.2f s   recorte y=%s\n" "$i" "$TOTAL" "$rot" "$ini" "$fin" "$y"
  # Apaisado: recorte propio de este plano.
  ffmpeg -y -v error -ss "$ini" -to "$fin" -i "$ORIGEN" -an \
    -vf "crop=1080:608:0:$y,$REALCE$cola" \
    -c:v libx264 -crf 12 -preset veryfast -pix_fmt yuv420p "$TMP/a$i.mp4"
  # Vertical: el cuadro entero, que en un teléfono es el acierto. No hace falta
  # recorte — y por eso el logotipo se ve completo y con aire, sin tocar nada.
  ffmpeg -y -v error -ss "$ini" -to "$fin" -i "$ORIGEN" -an \
    -vf "$REALCE$cola" \
    -c:v libx264 -crf 12 -preset veryfast -pix_fmt yuv420p "$TMP/v$i.mp4"
  echo "file '$TMP/a$i.mp4'" >> "$TMP/lista-ancho.txt"
  echo "file '$TMP/v$i.mp4'" >> "$TMP/lista-alto.txt"
done

ffmpeg -y -v error -f concat -safe 0 -i "$TMP/lista-ancho.txt" -c copy "$TMP/maestro-ancho.mp4"
ffmpeg -y -v error -f concat -safe 0 -i "$TMP/lista-alto.txt"  -c copy "$TMP/maestro-alto.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/maestro-ancho.mp4")
printf "\n  Montaje: %.1f s\n\n" "$DUR"

# ── 2. Resolución NATIVA, que es lo que más calidad da por byte ─────────────
#   🔴 Lección heredada: una versión anterior ampliaba la banda de 1080×608 a
#   1280×720 con lanczos «para que se viera mejor en escritorio». No se ve
#   mejor: **el original mide 1080 de ancho y ahí no hay más detalle que
#   inventar**. Ampliar antes de codificar sólo obliga al códec a gastar bits en
#   reproducir el desenfoque de la propia ampliación.
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
#   🔴 SUBE respecto al vídeo anterior (700k/1000k), y por una razón medida: el
#   material cambió. `22_mayo` tenía recámaras —paredes lisas, casi gratis—;
#   aquí los ocho planos son agua, palmeras y cielo, que es justo lo caro. Al
#   presupuesto viejo este material se bloqueaba en el agua. El cliente pidió
#   expresamente que no se viera pixeleado, así que el presupuesto sigue al
#   contenido, no al revés.
#
#   Cada navegador descarga UN archivo, no los cuatro.
VP9_ANCHO=1000k;  X264_ANCHO=1400k
VP9_ALTO=700k;    X264_ALTO=1000k

codificar () { # maestro escala nombre bitrate_vp9 bitrate_x264
  local maestro="$1" escala="$2" nombre="$3" bv="$4" bx="$5"
  local vf=""; [ -n "$escala" ] && vf="-vf scale=$escala:flags=lanczos"
  echo "  · $nombre"
  # `-auto-alt-ref` + `-lag-in-frames`: fotogramas de referencia alternativos.
  # Es lo que hace que un plano de agua no gaste el presupuesto entero.
  # `-cpu-used 1` en vez de 2: más lento de codificar, mejor a igualdad de bytes.
  ffmpeg -y -v error -i "$maestro" $vf -an \
    -c:v libvpx-vp9 -b:v "$bv" -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 \
    -auto-alt-ref 1 -lag-in-frames 25 \
    -pix_fmt yuv420p -pass 1 -passlogfile "$TMP/vp9-$nombre" -f null /dev/null
  ffmpeg -y -v error -i "$maestro" $vf -an \
    -c:v libvpx-vp9 -b:v "$bv" -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 \
    -auto-alt-ref 1 -lag-in-frames 25 \
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
codificar "$TMP/maestro-ancho.mp4" ""         hero-ancho "$VP9_ANCHO" "$X264_ANCHO"
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
