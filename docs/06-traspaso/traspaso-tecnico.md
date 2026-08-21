# Traspaso técnico — quién puede mantener este sitio y cómo

> **Para quién es esto:** la persona o agencia que se haga cargo del sitio después de
> Abraham. Asume que sabe programar, pero **no** que conoce el proyecto.
>
> **Esto no repite documentación que ya existe.** Enlaza a la que hay y añade lo único
> que no está escrito en ningún sitio: **lo que hoy sólo vive en la cabeza de Abraham.**

---

## El sitio en un párrafo

Sitio estático en **Astro**, bilingüe ES/EN, desplegado en **Cloudflare Pages** con cada
empuje a `claude/hotel-tulum-web-audit-0yly29`. Cero JavaScript de terceros, cero
dependencias externas en tiempo de ejecución, CSP estricta generada en cada build. El
contenido vive como **datos** (`src/content/` y `src/data/`), nunca dentro del marcado.
No hay CMS, y es una decisión ([ADR-0004](../decisiones/ADR-0004-stack-tecnico.md)):
el contenido lo edita quien mantiene el repositorio.

## Los cinco documentos que hay que leer, en este orden

| # | Documento | Qué te da |
|---|---|---|
| 1 | [`CLAUDE.md`](../../CLAUDE.md) | El estado del proyecto y las **reglas que no se rompen**. Empieza por su §5 y §9 |
| 2 | [`site/README.md`](../../site/README.md) | Cómo correr el sitio y qué reglas hace cumplir el código |
| 3 | [`ADR-0003`](../decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md) | Por qué la reserva es una **solicitud** y no una reserva |
| 4 | [`runbook-accesos-y-despliegue.md`](../05-despliegue/runbook-accesos-y-despliegue.md) | Cloudflare, GA4, Search Console |
| 5 | [`plan-de-reversion.md`](../05-despliegue/plan-de-reversion.md) | Qué hacer cuando algo sale mal en producción |

Si además vas a tomar decisiones de arquitectura, la
[bitácora de aprendizaje](../decisiones/bitacora-aprendizaje.md) tiene 46 lecciones con
el porqué de casi todo, incluidas las equivocaciones.

---

## 🔴 Las cinco reglas que rompen el producto si las rompes

No son estilo. Cada una nace de un hallazgo documentado, y **tres de ellas las verifica
el código automáticamente**.

| # | Regla | Quién la vigila |
|---|---|---|
| 1 | La interfaz **nunca** dice «reserva confirmada». Siempre «solicitud sujeta a confirmación» | ✅ el CI falla |
| 2 | **Nunca** se muestra disponibilidad. El esquema de datos no tiene ese campo, a propósito | ✅ imposible por diseño |
| 3 | Todo total mostrado **incluye impuestos**. Es el diferenciador frente a las OTAs | ⚠️ humano |
| 4 | **Nunca** se capturan datos de tarjeta. Es el hallazgo crítico del sitio anterior | ⚠️ humano |
| 5 | Los datos que el cliente no ha confirmado no se publican como ciertos | ✅ `build:prod` falla |

> La regla 4 no es teórica: **el sitio anterior capturaba número de tarjeta y CVV por
> formulario y los mandaba por correo**. Ver
> [el aviso al cliente](../01-descubrimiento/aviso-cliente-datos-de-tarjeta.md).

---

## Comprobaciones antes de publicar

```bash
cd site && npm ci
npm run check        # tipos — el CI falla si no pasa
npm test             # lógica de la solicitud (9 casos)
npm run build        # avisa de los datos sin verificar
npm run build:prod   # FALLA si hay datos sin verificar
```

```bash
node scripts/audit-mirror.mjs site/dist            # 2 hallazgos, ninguno rojo
node scripts/auditar-accesibilidad.mjs site/dist   # debe dar 0
node scripts/verificar-301.mjs site/dist           # 12 reglas, 25 URLs, 0 fallos
```

Y después de desplegar, **contra la URL servida y no contra el build**:

```bash
node scripts/verificar-despliegue.mjs https://azucarhotel.com
```

> ⚠️ **Un build en verde no es un sitio sano.** Está comprobado: en el ensayo de reversión
> Cloudflare marcó ✓ un despliegue roto. Por eso el criterio se mide sobre la URL real.

---

## 🚨 Lo que sólo vive en la cabeza de Abraham

**Esta es la sección que justifica que este documento exista.** Todo lo demás está escrito
en algún sitio; esto no. Si mañana Abraham desaparece, esto es lo que se pierde.

| Qué | Estado | Riesgo si nadie lo recoge |
|---|---|---|
| **Cuenta de Cloudflare** que sirve el sitio | Sólo Abraham | Nadie puede desplegar ni revertir |
| **Titularidad del dominio `azucarhotel.com`** | 🔴 **Desconocida.** Puede estar a nombre de una agencia anterior | No se puede mover el DNS el día del lanzamiento (R-06) |
| Accesos al hosting actual (HostGator, `192.185.167.194`) | Del hotel o de la agencia anterior | Sin él no hay reversión de capa 2 |
| **Licencia de la plantilla Cappa** | 🔴 Sin resolver (R-01) | Exposición legal. Los iconos son sustituibles por un set libre |
| **Cesión de derechos de las 244 fotografías** | Sin confirmar | Igual |
| **Propiedad provisionada en ResNexus** por la agencia anterior (`18DC254A-…`) | Activa, con unidades cargadas. Se desconoce quién paga y quién accede | Puede haber un motor de reservas vivo compitiendo con el sitio (R-16) |
| Relación e historial con el cliente | Sólo Abraham | Se pierde el contexto de por qué se decidió cada cosa |

> **Acción antes de cualquier traspaso real:** convertir esta tabla en una lista de
> accesos entregados, con fecha y quién los recibió. Un traspaso sin credenciales
> transferidas no es un traspaso: es un aviso.

---

## Lo que está construido y lo que no

**38 páginas** ES + EN. Catálogo de 8 tipos, contenido institucional completo, galería,
página de solicitud, legales, 404, sitemap y redirecciones 301 verificadas.

**Lo que NO existe y por qué** — ninguna de estas ausencias es un olvido:

| Falta | Espera a |
|---|---|
| Envío de la solicitud a un servidor | **B1–B4** y **E-PRIV**. Ver [`src/booking/README.md`](../../site/src/booking/README.md) |
| Cotización con impuestos | **C3** |
| Analítica | ID de GA4 |
| Páginas de restaurante y spa | **C0** — el cliente se contradice a sí mismo |
| Core Web Vitals medidos | PageSpeed desde un navegador real |

El módulo `src/booking/` está aislado a propósito: es un *anti-corruption layer*. Si el
hotel contrata un PMS o un motor SaaS, **se sustituye entero y el resto del sitio no se
entera**.

---

## Si hay que entregar el sitio a otra agencia

1. Transferir la propiedad de Cloudflare Pages, no compartir la contraseña.
2. Dar acceso de escritura al repositorio de GitHub.
3. Entregar **esta carpeta completa**, no un ZIP del `dist`.
4. Recorrer con ellos las cinco reglas de arriba. Es lo único que no se deduce del código.
5. Que corran las comprobaciones **antes** de tocar nada, para que vean el punto de partida
   en verde y sepan reconocer cuándo lo rompieron.
