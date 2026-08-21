# Mapa de redirecciones 301 — historia H5.3

> **Fecha:** 2026-08-20 · **Estado:** construido y verificado; 4 destinos pendientes
> **Reglas:** [`site/public/_redirects`](../../site/public/_redirects)
> **Prueba:** `node scripts/verificar-301.mjs site/dist` · o contra la URL de staging

---

## Por qué esto se hizo hoy y no en el sprint 5

El sprint 5 es donde vive esta historia, pero **el insumo caduca**. El inventario de URLs del
sitio vigente sólo existe mientras exista la captura HTTrack: cuando el sitio viejo se apague,
no hay forma de reconstruir qué URLs tenía ni qué redirecciones ya estaban activas.

Y romper una cadena de redirecciones no avisa. Un enlace roto se ve; una 301 perdida se nota
semanas después, cuando el tráfico orgánico ya cayó y nadie sabe atribuirlo. Construirlo el
día del lanzamiento significa improvisarlo con el reloj corriendo.

> **Técnica:** *inventario de activos digitales* previo a una migración. **Antipatrón
> evitado:** *big-bang migration* — cambiar el sitio y descubrir el mapa de URLs después.

---

## El resultado que más importa

**De las 22 URLs del sitio vigente que se conservan, 11 mantienen exactamente su dirección** —10 ya funcionando y una pendiente de H4.8—. Otras 9 cambian con 301 y 2 se dejan morir a propósito.

No es casualidad: es el dividendo de una decisión tomada en el sprint 1. ADR-0004 eligió
conservar el esquema de URLs en español, y en el sprint 2 se corrigió la ruta inglesa del
alojamiento —que iba a ser `/en/alojamiento`— para que fuera `/en/rooms/`, que es la que ya
existe y tiene 301 acumuladas detrás.

Cada URL conservada es una redirección que **no hace falta escribir, no se puede romper y no
pierde nada por el camino**. La forma más barata de no perder posicionamiento es no cambiar
la URL.

---

## Mapa completo

### Conservan su dirección — sin regla

`/` · `/servicios/` · `/preguntas-frecuentes/` · `/politicas/` · `/contacto/` ·
`/en/rooms/` · `/en/services/` · `/en/frequent-questions/` · `/en/policies/` · `/en/contact/` ·
`/en/privacy-policy/` ⏳

### Cambian de dirección — 301

| Antes | Después | Motivo |
|---|---|---|
| `/habitaciones/` | `/alojamiento/` | «Alojamiento» cubre suites y habitaciones; «habitaciones» excluía a las suites |
| `/amenidades-y-facilidades/` | `/servicios/` | Dos páginas para lo mismo se fusionan en una |
| `/nosotros/` | `/` | La presentación vive en la portada; no hay página propia |
| `/reservaciones/` | `/reservar/` | ⏳ pendiente del sprint 3 |
| `/politica-de-privacidad/` | `/aviso-de-privacidad/` | ⏳ pendiente de H4.8. El nombre correcto en México es *aviso de privacidad* (LFPDPPP) |
| `/en/home/` | `/en/` | La auditoría ya lo señaló: `/en/home/` es más largo y no casa con la española |
| `/en/about-us/` | `/en/` | Igual que `/nosotros/` |
| `/en/amenities-facilities/` | `/en/services/` | Igual que la fusión española |
| `/en/reservations/` | `/en/booking/` | ⏳ pendiente del sprint 3 |

### 🚨 Las dos que NO se redirigen, a propósito

`/autorizacion-de-pago-con-tdc/` y `/en/cc-payment-authorization/`

Son las páginas que capturan número de tarjeta y CVV. **Redirigirlas las mantendría vivas
como URL**; dejarlas caer en 404 le dice a Google que desaparecieron y las saca del índice.

Es el único caso de todo el proyecto en el que perder posicionamiento es exactamente lo que
queremos. La prueba automatizada **falla** si alguna de las dos llega a resolver.

### Artefactos de WordPress

`/feed/` y `/en/feed/` van a su portada, y `/wp-json/*` a la raíz. No tienen equivalente en un
sitio estático, pero algún agregador puede seguir apuntando a ellos.

---

## Las 20 redirecciones `?p=<id>` heredadas

La captura reveló que **ya existe una capa previa de redirecciones**: el esquema antiguo de
WordPress `?p=<id>` hacia las URLs legibles. Hubo una migración anterior, y esas 301 siguen
recibiendo tráfico.

| `?p=` | Destino de entonces | Destino ahora |
|---|---|---|
| 887 | `/habitaciones/` | `/alojamiento/` |
| 1067 | `/nosotros/` | `/` |
| 938 | `/servicios/` | `/servicios/` |
| 2347 | `/amenidades-y-facilidades/` | `/servicios/` |
| 947 | `/preguntas-frecuentes/` | `/preguntas-frecuentes/` |
| 2424 | `/politicas/` | `/politicas/` |
| 958 | `/contacto/` | `/contacto/` |
| 898 | `/reservaciones/` | `/reservar/` ⏳ |
| 990 | `/politica-de-privacidad/` | `/aviso-de-privacidad/` ⏳ |
| 928 | `/autorizacion-de-pago-con-tdc/` | 🚨 404 deliberado |
| 445 | `/en/rooms/` | `/en/rooms/` |
| 505 | `/en/about-us/` | `/en/` |
| 730 | `/en/services/` | `/en/services/` |
| 2356 | `/en/amenities-facilities/` | `/en/services/` |
| 761 | `/en/frequent-questions/` | `/en/frequent-questions/` |
| 2433 | `/en/policies/` | `/en/policies/` |
| 423 | `/en/contact/` | `/en/contact/` |
| 586 | `/en/reservations/` | `/en/booking/` ⏳ |
| 993 | `/en/privacy-policy/` | `/en/privacy-policy/` ⏳ |
| 606 | `/en/cc-payment-authorization/` | 🚨 404 deliberado |

**Todavía no están implementadas, y es una decisión de proporcionalidad.** El archivo
`_redirects` de Cloudflare Pages **no compara cadenas de consulta**: `?p=887` requiere código
de servidor. Montar una función sólo para esto añadiría un runtime a un sitio estático.

El sprint 3 va a añadir de todos modos una función serverless para el formulario de solicitud
(ADR-0003). **Estas veinte reglas se cuelgan de ahí**, sin infraestructura nueva. El mapa
queda escrito aquí, que es la parte que caduca; implementarlo son quince líneas.

> Valoración honesta de su importancia: **baja**. WordPress emite enlaces legibles, no `?p=`,
> así que casi nadie enlaza a esas URLs desde fuera. Existen porque WordPress redirige sus
> propios identificadores. Se conservan porque cuestan poco, no porque pesen mucho.

---

## Estado de la verificación

```
25 URLs del sitio vigente · 12 reglas declaradas · 0 fallos

  ✓ 21 resuelven                    ⏳ 4 con destino aún sin construir
  ✓ 2 mueren, como deben
```

Los cuatro pendientes son exactamente las historias bloqueadas, y el script los distingue de
un fallo real:

| Pendiente | Historia | Bloqueado por |
|---|---|---|
| `/reservaciones/` → `/reservar/` | H3.x | C3, B1–B4 |
| `/en/reservations/` → `/en/booking/` | H3.x | ídem |
| `/politica-de-privacidad/` → `/aviso-de-privacidad/` | H4.8 | texto legal revisado |
| `/en/privacy-policy/` | H4.8 | ídem |

## Qué falta antes del lanzamiento

1. Construir los cuatro destinos pendientes.
2. Colgar las 20 reglas `?p=` de la función del sprint 3.
3. Correr `verificar-301.mjs` **contra el dominio real** ya conectado, no contra staging:
   sólo ahí se comprueba que Cloudflare emite 301 y no 302.
4. Añadir el script al CI, para que una regla rota falle el build y no el tráfico.
