# Plan de reversión del lanzamiento — historia H5.6

> **Fecha:** 2026-08-21 · **Estado:** escrito y parcialmente ensayado
> **Verificación:** `node scripts/verificar-despliegue.mjs <url>`
> **Mapa de URLs:** [`mapa-301.md`](mapa-301.md)

---

## La parte difícil no es revertir. Es decidir revertir

Revertir son dos clics. Lo difícil es decidirlo **a las once de la noche, con el cliente
escribiendo por WhatsApp y sin criterio escrito de antemano**. Sin un umbral fijado antes, la
discusión se vuelve sobre sensaciones —«se ve raro», «a mí me carga bien»— y se acaba
revirtiendo por algo cosmético o, peor, no revirtiendo por algo grave.

Por eso este plan empieza por el criterio y no por el procedimiento.

> **Antipatrón evitado:** *rollback plan* que consiste en la frase «si algo sale mal, se
> revierte». Eso no es un plan: es una intención.

---

## Criterio de reversión

`scripts/verificar-despliegue.mjs` responde esto de forma binaria. Distingue a propósito
entre lo que justifica revertir y lo que sólo hay que arreglar:

| | Ejemplos | Acción |
|---|---|---|
| 🔴 **FALLO** | Página esencial caída · redirección rota o mal dirigida · señal de SEO perdida · portada con `noindex` · la interfaz promete «reserva confirmada» | **Revertir** |
| 🟡 **AVISO** | Cabecera de seguridad ausente · caché sin `immutable` · un origen de terceros | Arreglar hacia adelante, sin revertir |

**La excepción absoluta.** Si el verificador dice
`🚨 Página de datos de tarjeta viva`, **NO se revierte**: revertir restauraría precisamente el
sitio que captura números de tarjeta y CVV. Se despublican esas rutas y se sigue adelante. Es
el único escenario del proyecto en el que volver atrás es la decisión incorrecta.

---

## 🔴 Lo que hay que hacer ANTES, y es lo que decide todo

Medido hoy sobre el dominio real:

```
azucarhotel.com.   14400   IN   A   192.185.167.194
nameservers: ns1027.websitewelcome.com · ns1028.websitewelcome.com   (HostGator)
server: Apache
```

**El TTL es de 14 400 segundos: cuatro horas.** Esa cifra *es* la velocidad de la reversión.
Si se hace el cambio con este TTL y algo falla, hay hasta **cuatro horas** en las que parte del
mundo sigue viendo el sitio roto, y no hay nada que hacer salvo esperar.

| Preparativo | Cuándo | Por qué |
|---|---|---|
| **Bajar el TTL a 300 s** | ≥ 4 h antes del cambio, mejor 24 h | Es lo que convierte una reversión de 4 horas en una de 5 minutos. **Sin esto, el resto del plan es decorativo.** |
| **No borrar el WordPress** | Hasta 30 días después | No se puede revertir a un sitio que ya no existe. Sólo se despublica, no se elimina — salvo las dos páginas de tarjeta, que sí se borran |
| **Anotar el destino actual** | Antes | `192.185.167.194`. Es el valor exacto al que se vuelve |
| **Correr el verificador contra el sitio viejo** | Antes | Deja constancia de cómo se ve «el sitio de antes», para reconocerlo si aparece a mitad de una propagación |

---

## Separar la mudanza de DNS del cambio de sitio

Cloudflare Pages necesita gestionar el DNS para servir un dominio raíz —el aplanamiento de
CNAME no existe en HostGator—. Eso obliga a mover los nameservers, y **una mudanza de
nameservers tarda hasta 48 horas y no se revierte rápido**.

La forma correcta es **no hacer las dos cosas el mismo día**:

| Fase | Qué se hace | Qué ve el huésped | Reversión |
|---|---|---|---|
| **1. Mudanza** | Mover NS a Cloudflare **copiando los registros actuales tal cual**, apuntando aún a `192.185.167.194` | Nada. El sitio sigue siendo el de WordPress | No hace falta: nada cambió |
| **2. Espera** | 24-48 h de propagación. Verificar que el sitio viejo sigue sirviéndose desde Cloudflare | Nada | — |
| **3. Bajar el TTL** | Poner 300 s en el registro del sitio | Nada | — |
| **4. Cambio** | Apuntar el registro a Cloudflare Pages | Ve el sitio nuevo | **Un registro, 5 minutos** |

> **Por qué importa el orden.** Hecho todo junto, una reversión obliga a deshacer la mudanza de
> nameservers: hasta 48 horas. Separado, la reversión es cambiar un registro dentro de
> Cloudflare, donde el TTL ya está bajo y bajo nuestro control.
>
> **Técnica:** *decoupling* de cambios de infraestructura — mover una variable por vez, para
> que al fallar se sepa cuál fue y se pueda deshacer sola.

---

## Las tres capas de reversión

De la más barata a la más cara. **Siempre se intenta la primera.**

### Capa 1 — Volver a un despliegue anterior · segundos

El fallo está en el sitio nuevo, no en el cambio de DNS. Cloudflare Pages conserva **todos**
los despliegues.

1. `dash.cloudflare.com` → Workers & Pages → `azucar-hotel-tulum` → **Deployments**
2. Localizar el último despliegue con la verificación en verde
3. **⋯ → Rollback to this deployment**
4. `node scripts/verificar-despliegue.mjs https://azucarhotel.com`

Cubre la inmensa mayoría de los casos: un build malo, un enlace roto, una regresión. **No
requiere tocar DNS.**

### Capa 2 — Devolver el DNS al sitio viejo · 5 minutos con TTL 300

El sitio nuevo está roto de forma que ningún despliegue anterior arregla, o el cliente
necesita el sitio de antes ya.

1. Cloudflare → DNS → registro `A` de `azucarhotel.com`
2. Cambiar el valor a **`192.185.167.194`**
3. Esperar el TTL (300 s si se hizo el preparativo; **4 h si no**)
4. Verificar: `node scripts/verificar-despliegue.mjs https://azucarhotel.com` debe volver a dar
   los 19 fallos característicos del sitio viejo — que aquí significan «la reversión funcionó»
5. **Despublicar de inmediato las dos páginas de datos de tarjeta**, que vuelven vivas con él

### Capa 3 — Deshacer la mudanza de nameservers · hasta 48 h

Sólo si Cloudflare mismo es el problema. Devolver los NS a
`ns1027/ns1028.websitewelcome.com` en el registrador.

**Es la última opción y no es rápida.** Si se siguió el orden de fases de arriba, esta capa no
debería hacer falta nunca: la fase 1 ya se verificó por separado.

---

## Qué se puede ensayar, y qué se ensayó

| Ensayo | Estado |
|---|---|
| El verificador detecta un despliegue sano | ✅ 36 comprobaciones en verde sobre staging |
| El verificador detecta un despliegue enfermo | ✅ **calibrado contra el sitio vigente: 19 fallos**, incluidas las dos páginas de tarjeta |
| Volver a un despliegue anterior (capa 1) | ⬜ Requiere el panel de Cloudflare. **Ensayar en staging antes del lanzamiento** |
| Cambio de registro DNS (capa 2) | ⬜ No se puede ensayar sin el dominio conectado |

> **Sobre la calibración.** Un verificador que sólo se ha probado contra un sitio sano no
> prueba nada: no se sabe si sabe fallar. Pasarlo por el sitio vigente costó un minuto y
> confirmó que detecta lo que debe (L-035).

**El ensayo pendiente de la capa 1 es el importante**, y es barato: hacer un despliegue
deliberadamente roto en staging, comprobar que el verificador lo caza, revertir desde el panel
y comprobar que vuelve a verde. Media hora, y convierte el plan en algo probado.

---

## Durante las 72 horas de vigilancia (H5.7)

```bash
node scripts/verificar-despliegue.mjs https://azucarhotel.com
```

A los 15 minutos, 1 hora, 6 horas, 24 y 72. Cualquier 🔴 dispara el criterio de reversión.

Y una comprobación que ninguna máquina hace: **preguntarle al manager si siguen llegando
solicitudes de reserva**. Un sitio que responde 200 en todo y no genera una sola solicitud en
24 horas está roto de una forma que ningún verificador detecta.
