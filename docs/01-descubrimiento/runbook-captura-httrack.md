# Runbook — Captura de sitios con HTTrack (ejecución local)

> **Quién lo ejecuta:** Abraham, en su máquina Windows (cmd).
> **Por qué en local:** el entorno remoto de Claude tiene el egreso de red bloqueado por
> política corporativa. Verificado con `EGRESS_BLOCKED` en los tres dominios objetivo.
> **Por qué HTTrack y no `curl`:** HTTrack reescribe enlaces, resuelve dependencias
> (CSS/JS/fuentes/imágenes) y produce un **artefacto congelado y reproducible**. Auditar
> sobre un sitio vivo es un antipatrón: el sitio cambia y los hallazgos dejan de ser
> verificables. Con el mirror versionado, cualquiera puede reproducir la auditoría.

---

## Preparación

```cmd
mkdir C:\proyectos\azucar\captura
cd C:\proyectos\azucar\captura
```

Definimos un User-Agent realista una sola vez para reutilizarlo:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
```

> **Por qué un UA realista:** muchos sitios (y WAFs como Cloudflare) sirven contenido
> degradado o bloquean el UA por defecto de HTTrack. Queremos capturar lo que ve un
> visitante real, no una versión de fallback.

---

## Captura 1 — Sitio actual del cliente (prioridad máxima)

```cmd
httrack "https://azucarhotel.com/" ^
  -O "C:\proyectos\azucar\captura\01-azucarhotel" ^
  -%v -r8 -c2 -%c2 -s0 -%P -I0 ^
  -F "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" ^
  "+*.azucarhotel.com/*" ^
  "-*facebook.com*" "-*instagram.com*" "-*twitter.com*" "-*youtube.com*" ^
  "-*googletagmanager.com*" "-*google-analytics.com*"
```

| Flag | Qué hace | Por qué |
|---|---|---|
| `-r8` | profundidad 8 niveles | suficiente para un sitio de hotel; evita capturas infinitas |
| `-c2 -%c2` | 2 conexiones, máx 2/seg | **cortesía**: no tumbamos el sitio del cliente. Un scraping agresivo contra el servidor de producción de un cliente es una falta profesional |
| `-s0` | ignora `robots.txt` | es el sitio **del propio cliente** y tenemos su encargo; auditamos todo, incluidas rutas desindexadas. *En sitios de terceros no aplica esta justificación* |
| `-%P` | parsing extendido | recupera URLs dentro de JS/CSS que el parser básico pierde |
| `+*.azucarhotel.com/*` | filtro de dominio | evita que se salga a arrastrar medio internet |
| exclusión de redes/analytics | — | ruido, y además no queremos disparar eventos falsos en su Analytics |

---

## Captura 2 — Propuesta de la agencia anterior (ResNexus)

```cmd
httrack "https://webbuilder.resnexus.com/site/38e233bb/?preview=true" ^
  -O "C:\proyectos\azucar\captura\02-resnexus-propuesta" ^
  -%v -r5 -c2 -%c2 -%P -I0 ^
  -F "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" ^
  "+webbuilder.resnexus.com/site/38e233bb/*"
```

> ⚠️ Es un **preview** con querystring. HTTrack puede perder el `?preview=true` al seguir
> enlaces internos y traer 404s o redirecciones al login. Si el mirror sale vacío o roto,
> el plan B es captura manual: abrir en Chrome → `Ctrl+S` → "Página web completa" +
> screenshots de página completa. **No pelees con la herramienta más de 15 minutos**;
> el objetivo es el contenido, no lucir la técnica.

---

## Captura 3 — Plantilla base (Cappa / duruthemes)

```cmd
httrack "https://duruthemes.com/demo/html/cappa/demo1-light/index11.html" ^
  -O "C:\proyectos\azucar\captura\03-plantilla-cappa" ^
  -%v -r4 -c2 -%c2 -%P -I0 ^
  -F "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" ^
  "+duruthemes.com/demo/html/cappa/*"
```

> 🚨 **Bandera legal — leer antes de continuar.**
> Cappa es una plantilla **comercial** (ThemeForest / duruthemes). Capturar el demo para
> **analizar** su estructura, componentes y decisiones de diseño es legítimo. Entregarle al
> cliente un sitio de producción construido sobre archivos raspados del demo **sin comprar
> la licencia, no lo es** — y las plantillas comerciales suelen traer JS ofuscado, assets
> con watermark y dependencias de CDN que fallan fuera del dominio del demo.
>
> **Acción requerida:** confirmar quién compra la licencia (nosotros y se la facturamos, o
> el cliente a su nombre) **antes** de escribir la primera línea de producción. Registrado
> como pendiente en `docs/decisiones/bitacora-aprendizaje.md`.
> El demo capturado se usa como **referencia de análisis**, no como código fuente.

---

## Al terminar

```cmd
cd C:\proyectos\azucar\captura
dir /s
```

Comprime y sube al repo (o a Drive si supera ~50 MB) en `investigacion/mirrors/`.
Adjunta también:

- `hts-log.txt` de cada captura (registra qué se descargó, qué falló y con qué código HTTP —
  es evidencia de auditoría, no basura).
- Screenshots de página completa de home, habitaciones y contacto, en **desktop y móvil**.
  El mirror no conserva el layout responsivo real ni las animaciones.

---

## Complementos (opcionales, 10 min en total)

Estos no requieren HTTrack y aportan mucho por poco esfuerzo:

1. **Wappalyzer / BuiltWith** sobre `azucarhotel.com` → captura de pantalla del stack detectado.
2. **PageSpeed Insights** (`pagespeed.web.dev`) → correr home y "habitaciones", guardar el
   PDF/screenshot de móvil y desktop. Son los Core Web Vitals **de campo**, dato duro que
   sustenta el argumento de negocio ante el cliente.
3. **DevTools → Network**, recargar la home con caché deshabilitada → screenshot del
   waterfall y del peso total transferido.

> **Sobre Burp Suite y Wireshark:** son herramientas de interceptación y análisis de
> tráfico. Para una auditoría de sitio público de marketing aportan poco frente a lo que ya
> da DevTools, y Wireshark sobre HTTPS te da tráfico cifrado que no puedes leer sin
> configurar SSLKEYLOGFILE. **Recomendación: omitirlas en esta fase.** Su lugar natural es
> más adelante, si hay que depurar la integración con el motor de reservas (formularios,
> redirecciones, cookies de terceros, fuga de datos hacia el proveedor).
> *Elegir la herramienta por el problema, no el problema por la herramienta.*
