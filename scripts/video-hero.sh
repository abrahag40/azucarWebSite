#!/usr/bin/env bash
# ============================================================================
#  Vídeo del héroe de la portada — de DOS reels del cliente a la web.
#
#  Se ejecuta A MANO y su salida se versiona en `site/src/assets/video/`. NO va
#  en el build: ffmpeg no está en CI ni en Cloudflare, y transcodificar en cada
#  despliegue serían minutos de CPU para un archivo que cambia dos veces al año.
#  Lo que sí se versiona es ESTE script, para que el resultado sea reproducible
#  y se sepa exactamente qué se le hizo al material del hotel.
#
#  Requisitos:  brew install ffmpeg
#  Uso:         ./scripts/video-hero.sh "…/22_mayo.mp4" "…/24_mayo.mp4"
#
#  ── QUÉ SON LOS ORIGINALES, Y POR QUÉ SON DOS ──────────────────────────────
#  Hasta el 2026-09-09 el héroe salía de UN reel. El cliente pidió fusionar los
#  dos que tiene, y la razón es de contenido, no de duración: **son reels
#  complementarios y ninguno de los dos cuenta el hotel entero.**
#
#    · `22_mayo.mp4` — 1080×1920 · 41.96 s a **25 fps** · 85.2 MB · 18 planos de
#      ~2.24 s. Es el reel de **HABITACIÓN**: camas, baños, clósets, terrazas.
#    · `24_mayo.mp4` — 1080×1920 · 24.13 s a **24 fps** · 46.9 MB · 8 planos de
#      ~2.71 s. Es el reel de **EXTERIOR**: playa, alberca, palapa, los arcos.
#
#  Un hotel de playa se vende con las dos cosas: el sitio y el cuarto. El reel
#  de exteriores solo enseñaba dónde está el hotel y nunca dónde duermes.
#
#  🔴 **Los dos terminan con EXACTAMENTE el mismo remate**: el logotipo fundido
#  sobre el agua de la alberca. Medido en los dos: la caja del logo cae en
#  x 188–891 · y 738–1181 en ambos, centro 50.0 % / 50.0 %. No es «parecido»,
#  es el mismo material. **Por eso el montaje lleva UN remate, no dos**, y da
#  igual de cuál de los dos se tome; se toma de `24_mayo` por continuidad con
#  lo que ya estaba desplegado.
#
#  ── EL PROBLEMA DE FONDO: UN 9:16 EN UN HÉROE APAISADO ─────────────────────
#  Con `cover`, de un 9:16 sólo se ve una BANDA de 608 px de los 1920 —el 32 %
#  de la altura del cuadro—. Qué caiga dentro de esa banda no es un detalle: es
#  la diferencia entre enseñar una cama o enseñar el techo de vigas.
#
#  ── POR QUÉ CADA PLANO LLEVA SU PROPIO RECORTE ─────────────────────────────
#  🔴 Un solo desplazamiento (lo que hace `object-position` en CSS) obliga a que
#  todos los planos tengan su asunto a la misma altura, y no la tienen: en el
#  material nuevo la alberca está abajo (y=700), la cabecera de una cama a media
#  altura (y=750) y el rótulo del arco arriba (y=500). **El encuadre es una
#  decisión POR PLANO**, y se toma antes de codificar, no en el CSS.
#
#  El CSS, en consecuencia, no reencuadra: `object-position: center`.
#
#  ⚠️ Y no se elige mirando el fotograma central: se eligió mirando el PRIMERO y
#  el ÚLTIMO de cada ventana **ya recortados**, porque estas cámaras se mueven.
#  Esa comprobación cambió dos decisiones y descartó un plano — ver abajo.
#
#  ── LA SELECCIÓN, Y LOS TRES DESCARTES QUE LA EXPLICAN ─────────────────────
#  De 26 planos disponibles entran 11. Lo que se descartó y por qué:
#
#  1. **Baños y clósets** (6 planos de `22_mayo`). Recortados a la banda, un
#     clóset es una repisa y un baño es un lavabo. Uno de ellos, además, tiene
#     los avisos impresos pegados en el espejo — lo contrario de un boutique.
#
#  2. **La cabecera tallada** (`22_mayo` 2.2–4.5 s), que visualmente era el
#     plano más bonito del material: madera calada, luz cálida, dos almohadas.
#     Se cayó por DOS medidas independientes:
#       · Color: U=87.9 · V=150.6, contra U≈112 · V≈137 del resto de habitación
#         y U≈120 · V≈129 de los exteriores. Luz de tungsteno contra luz de día.
#         Se intentó corregir: ni a 12000 K ni con `colorbalance` al ±0.28 se
#         acerca al objetivo —lo más lejos que llega es U=102— y por el camino
#         se lleva 24 puntos de luminancia. **Un plano ámbar entre diez de luz
#         de día no se lee como calidez: se lee como una errata de balance.**
#       · Movimiento: la cámara viaja y un poste de la cama barre el cuadro. La
#         ventana limpia mide 1.3 s, menos que el resto.
#     Su sitio lo ocupa `22_mayo` 11.2–13.5 —la cama con el ventanal—, medida
#     en U=110.9 · V=138.6, dentro del bloque.
#
#  3. **El segundo remate de logotipo.** Ver arriba: son el mismo.
#
#  ── EL SALTO DE COLOR QUE SÍ SE DEJA, Y POR QUÉ ────────────────────────────
#  Los cuatro planos de habitación son más cálidos que los cinco de exterior:
#  U 109.6–114.4 contra U 116.0–125.2. Parece un problema y no lo es, y el
#  argumento es una resta: **los cinco exteriores se separan 9.2 unidades entre
#  ellos** (116.0 a 125.2), y el bloque de habitación queda a 8.7 de su media.
#  Es decir, la habitación no está más lejos del exterior de lo que los
#  exteriores están entre sí. Corregirlo sería inventar un problema.
#
#  El plano que sí lo era estaba a 32 unidades, y ése se fue.
#
#  ── LOS DOS ARREGLOS DE ENCUADRE QUE SALIERON DE VERIFICAR ─────────────────
#  · **El arco con el rótulo pasa de y=560 a y=500.** A 560 —la altura que
#    llevaba el script anterior para ese plano— el rótulo «Hotel AZUCAR Tulum»
#    del arco **sale cortado por arriba**. A 500 entra entero y la alberca sigue
#    en cuadro. Es el único sitio del montaje donde se lee el nombre del hotel
#    antes del remate.
#  · **El primer plano de `24_mayo` sigue empezando en 1.05 y no antes:** el
#    original abre con un fundido desde negro. `22_mayo` NO lo tiene —medido,
#    Y=133 desde el fotograma cero—, así que sus ventanas pueden pegarse al
#    corte.
#
#  ── EL LOGOTIPO, QUE ES LA PETICIÓN EXPLÍCITA DEL CLIENTE ──────────────────
#  Medido buscando píxeles claros y poco saturados: x 188–891 · y 738–1181 del
#  cuadro de 1080×1920. Centro en 50.0 % / 50.0 %. De ahí sale y=655, que es
#  959 − 304: la banda de 608 centrada en el logo. Margen medido: 83 px arriba
#  y 82 abajo. No es un valor a ojo, es una resta.
#
#  ⚠️ Límite del material, dicho en voz alta: el logo mide 444 px de alto sobre
#  1080 de ancho, así que **su recorte más ancho posible es 1080/444 = 2.43:1**.
#  En un héroe más apaisado que eso el navegador lo corta por arriba y por
#  abajo. Eso no se arregla codificando —fuera de esos 1080 px no hay imagen que
#  enseñar—: se arreglaría con una tarjeta final de logotipo más pequeño (R-40).
#
#  ── EL ORDEN, QUE ES EL ARGUMENTO ──────────────────────────────────────────
#      llegas → la propiedad → el mar → la alberca → el descanso
#            → tu cuarto (×4) → tu terraza → la marca
#
#  Los cinco exteriores primero porque son el sitio; las cuatro habitaciones
#  después porque son la oferta; y el jacuzzi privado de `22_mayo` **entre las
#  habitaciones y el remate**, porque es el único plano que es las dos cosas a
#  la vez y devuelve el azul justo antes del logotipo.
#
#  Duración por plano: 1.4 s, contra los 2.24–2.71 s del original. Un montaje no
#  es el reel. El remate va a 2.4 s porque el logotipo tarda ~2.9 s en fundirse
#  del todo y necesita tiempo para leerse.
# ============================================================================
set -euo pipefail

ORIGEN_22="${1:?Uso: $0 <ruta a 22_mayo.mp4> <ruta a 24_mayo.mp4>}"
ORIGEN_24="${2:?Uso: $0 <ruta a 22_mayo.mp4> <ruta a 24_mayo.mp4>}"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
DESTINO="$RAIZ/site/src/assets/video"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$DESTINO"

# ── EL MONTAJE ──────────────────────────────────────────────────────────────
#   origen  inicio  fin   y-recorte  rótulo
#
#   El `y` es la esquina superior de la banda de 608 px dentro del cuadro de
#   1920. 656 es el centro exacto; por debajo se sube la mirada, por encima se
#   baja.
#
#   Cortes detectados con `select=gt(scene,0.12)`:
#     · 22_mayo: 2.20 · 4.52 · 6.76 · 8.96 · 11.20 · 13.52 · 15.76 · 18.00 ·
#       20.08 · 22.36 · 24.60 · 26.80 · 29.08 · 31.16 · 33.56 · 35.76 · 38.00
#     · 24_mayo: 3.71 · 6.46 · 9.25 · 11.96 · 14.67 · 17.38 · 20.08
#   Cada ventana entra con ~0.35 s de holgura para no arrastrar el fundido del
#   corte.
MONTAJE=(
  "24  1.05  2.45  430  la playa, las sombrillas y las palmeras"
  "24  9.80 11.20  500  el arco de piedra con el rotulo, y la alberca"
  "24 17.90 19.30  500  columnas de piedra, palmeras y el Caribe"
  "24 12.50 13.90  700  la palapa, la alberca y el mar"
  "24  7.00  8.40  680  el camastro blanco bajo las sombrillas"
  "22 13.90 15.30  750  la cama king y su cabecera de madera"
  "22 25.00 26.40  810  las dos camas"
  "22 11.55 12.95  750  la cama, el ventanal y la cortina"
  "22 27.20 28.60  750  la cama, el ventanal y la hamaca del balcon"
  "22  7.20  8.60  580  el jacuzzi privado sobre el Caribe"
  "24 21.60 24.00  655  el agua y el LOGOTIPO"
)
# El logotipo termina de fundirse casi al final del original, así que se le
# añade una CONGELACIÓN del último fotograma para que se lea antes de que el
# bucle vuelva a empezar. Un fotograma quieto no cuesta bytes —el códec lo
# resuelve con macrobloques «sin cambio»—, así que el remate sale casi gratis.
CONGELAR=0.9

# 🔴 LOS DOS ORIGINALES NO VAN A LA MISMA CADENCIA: 25 fps `22_mayo` y 24 fps
# `24_mayo`. Concatenar sin igualarlas produce un archivo con marcas de tiempo
# incoherentes —se reproduce, pero se desincroniza y `concat -c copy` no avisa—.
# Se normaliza TODO a 24 fps en el filtro de cada segmento: el mismo destino que
# ya tenía la salida, y en un plano de 1.4 s la diferencia es UN fotograma.
FPS=24

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
  read -r src ini fin y rot <<< "$fila"
  i=$((i+1))
  case "$src" in
    22) ORIGEN="$ORIGEN_22" ;;
    24) ORIGEN="$ORIGEN_24" ;;
    *)  echo "origen desconocido: $src" >&2; exit 1 ;;
  esac
  cola=""
  [ "$i" -eq "$TOTAL" ] && cola=",tpad=stop_mode=clone:stop_duration=$CONGELAR"
  printf "  %2d/%d  %-46s %s_mayo  %5.2f–%-5.2f s   recorte y=%s\n" \
    "$i" "$TOTAL" "$rot" "$src" "$ini" "$fin" "$y"
  # Apaisado: recorte propio de este plano.
  ffmpeg -y -v error -ss "$ini" -to "$fin" -i "$ORIGEN" -an \
    -vf "crop=1080:608:0:$y,$REALCE,fps=$FPS$cola" \
    -c:v libx264 -crf 12 -preset veryfast -pix_fmt yuv420p "$TMP/a$i.mp4"
  # Vertical: el cuadro entero, que en un teléfono es el acierto. No hace falta
  # recorte — y por eso el logotipo se ve completo y con aire, sin tocar nada.
  ffmpeg -y -v error -ss "$ini" -to "$fin" -i "$ORIGEN" -an \
    -vf "$REALCE,fps=$FPS$cola" \
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
#   ✅ **El presupuesto NO sube al fusionar, y ésa es la gracia del material
#   mixto.** El montaje anterior era agua, palmeras y cielo en los ocho planos
#   —lo más caro que hay— y por eso hubo que subirlo entonces. Ahora cuatro de
#   los once planos son habitación: paredes lisas y ropa de cama blanca, casi
#   gratis de codificar. Con dos pasadas el códec ve el archivo entero antes de
#   repartir, así que **los bits que la habitación no gasta se los queda el
#   agua**.
#
#   Medido sobre los tres planos que están en las DOS versiones, a media de
#   archivo idéntica (166.9 contra 166.5 KB/s):
#
#         plano                  sólo exteriores    fusión
#         el arco y la alberca      243.6 KB/s      248.8 KB/s   (+2 %)
#         la palapa y el mar        134.6 KB/s      158.0 KB/s   (+17 %)
#         el agua y el LOGOTIPO     179.7 KB/s      222.8 KB/s   (+24 %)
#
#   Es decir: el vídeo dura 2.8 s más, pesa 0.5 MB más, **y sus planos de agua
#   se ven mejor que antes**. Reproducible con:
#     ffprobe -v error -select_streams v:0 -show_entries packet=pts_time,size \
#       -of csv=p=0 site/src/assets/video/hero-ancho.mp4
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
echo
echo "  🔴 Obligatorio ahora: node scripts/contraste-hero.mjs"
echo "     El material cambió, así que el contraste del texto del héroe sobre el"
echo "     vídeo hay que volver a medirlo. No es opcional."
