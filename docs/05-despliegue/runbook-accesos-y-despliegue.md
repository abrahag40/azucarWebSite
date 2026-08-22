# Runbook — Despliegue y accesos de Google

> Lo ejecuta **Abraham**. Paso a paso, sin dar por supuesto nada.

---

## Parte 1 — Los tres productos de Google que se confunden

Es la confusión más común y conviene deshacerla de una vez, porque **cada uno resuelve un
problema distinto y se consigue de forma distinta**.

| | Qué hace | ¿Aparece en Google Maps? | Cómo se consigue |
|---|---|---|---|
| **Google Business Profile** | La ficha del negocio: mapa, horario, teléfono, fotos, reseñas | ✅ **Sí. Es esta** | Reclamar la ficha existente, o crearla |
| **Google Analytics (GA4)** | Cuánta gente entra al sitio y por dónde llega | ❌ No | **Se crea nueva, desde cero** |
| **Google Search Console** | Cómo aparece el sitio en resultados de búsqueda y qué errores tiene | ❌ No | Verificar que el dominio es tuyo |

### Lo que preguntaste

> *"¿Tengo que solicitar acceso a la cuenta con la que dieron de alta el sitio para que
> exista en Google Maps?"*

**Para Analytics, no.** Se crea una propiedad nueva en cinco minutos; no hay nada que heredar
ni que pedirle a nadie.

**Para Google Maps, sí, y es una pregunta muy pertinente.** Eso es Business Profile, y para
un hotel es de las cosas que más importan: es el panel que sale a la derecha en Google, con
fotos, reseñas y el botón de cómo llegar. Si alguien la reclamó —una agencia anterior, un
exempleado— hay que recuperar el control. Es la pregunta **E4** del brief.

> **La regla que se lleva de aquí:** antes de pedir un acceso, saber **qué producto** lo
> tiene. Pedir "acceso a Google" no significa nada; pedir "administrador del perfil de
> empresa de Azúcar Hotel Tulum" sí.

---

## Parte 2 — Google Analytics 4 · 5 minutos

1. Entrar en `analytics.google.com`. **Idealmente con una cuenta del hotel, no personal**,
   para que la propiedad la posea el cliente y no dependa de nadie.
2. *Administrar* → *Crear* → *Propiedad*. Nombre: `Azucar Hotel Tulum`. Zona horaria:
   México (Quintana Roo). Moneda: MXN.
3. Tipo de negocio: hotelería. Objetivo: generar clientes potenciales.
4. Crear un **flujo de datos** de tipo Web con URL `https://azucarhotel.com`.
5. Copiar el **ID de medición**: tiene la forma `G-` seguido de diez caracteres.

### Ese ID no es un secreto

Va escrito en el HTML de todas las páginas: cualquiera que abra el sitio puede leerlo.
**Se puede pegar en el chat o en el repositorio sin problema.**

| | Ejemplo | ¿Compartir? |
|---|---|---|
| **Identificador público** | `G-ABC1234XYZ` | ✅ Sí |
| **Credencial** | contraseña, clave de API, token | ❌ **Nunca** por chat, correo ni WhatsApp |

> Confundirlos cuesta en las dos direcciones: o se filtran credenciales, o alguien se
> bloquea protegiendo algo que es público. **Un identificador que viaja en el HTML no es un
> secreto; una llave que abre una cuenta sí lo es.**

---

## Parte 3 — Google Search Console

1. Entrar en `search.google.com/search-console`.
2. Añadir propiedad de tipo **Dominio** (cubre `www` y todos los subdominios).
3. Google pedirá verificar la propiedad con un **registro TXT en el DNS**.
4. Ese registro se añade donde esté administrado el DNS del dominio.

> Requiere resolver antes la pregunta **E2**: a nombre de quién está `azucarhotel.com` y
> quién tiene los accesos del registrador. Es el riesgo R-06, y **se verifica ahora, no la
> semana del lanzamiento**.

---

## Parte 4 — Cloudflare Pages · el despliegue

### Qué es y por qué

Alojamiento gratuito para sitios estáticos conectado a GitHub:

```
push a GitHub  →  Cloudflare detecta el commit  →  compila  →  publica
```

Sin servidores, sin FTP, sin subir nada a mano. **Y da una URL por cada rama**, que es
exactamente lo que necesita la Sprint Review: el cliente abre un enlace en su teléfono y ve
el avance real. Sin esto no hay demo, y sin demo no fue un sprint (ADR-0002).

*(Alternativas equivalentes: Netlify, Vercel, GitHub Pages. Se eligió Cloudflare por plan
gratuito generoso, red global y vistas previas por rama.)*

### Configuración

1. `dash.cloudflare.com` → **Workers & Pages** → **Create** → pestaña **Pages** →
   **Connect to Git**.
2. Autorizar GitHub y elegir el repositorio `abrahag40/azucarWebSite`.
3. Configurar la compilación:

| Campo | Valor |
|---|---|
| Production branch | `claude/hotel-tulum-web-audit-0yly29` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| **Root directory** | `site` ← **el que más se olvida** |

4. **Environment variables** → dos, y las dos importan:

| Variable | Valor | Por qué |
|---|---|---|
| `PUBLIC_GA4_ID` | el `G-…` del paso 2 | Activa la analítica (H1.7). Sin ella el componente queda inerte, que es su estado por defecto |

**La versión de Node ya no se configura aquí.** Está fijada en el repositorio, en
`site/.nvmrc` (`22.12.0`) y en `engines.node` de `package.json`. Cloudflare Pages lee
`.nvmrc` de la carpeta raíz del proyecto. Es preferible a una variable de entorno: la
configuración vive versionada junto al código y no se pierde si alguien recrea el proyecto
en el panel.

5. Guardar y desplegar.

> ### ⚠️ Tres correcciones sobre la versión anterior de este runbook
>
> Verificadas contra el repositorio el 2026-08-20. Las tres impedían que el primer
> despliegue funcionara:
>
> 1. **`Production branch` no es `main`.** Ese nombre estaba escrito por costumbre y **la
>    rama no existe** en el remoto (`git ls-remote --heads origin main` no devuelve nada).
>    Con esa configuración Cloudflare no compila nada y no da ningún error: simplemente
>    nunca hay despliegue. La rama real es la de trabajo.
> 2. **`Build command` no puede ser `build:prod` todavía.** Ese comando falla a propósito
>    mientras C1 siga sin respuesta — ver más abajo. Configurarlo hoy garantiza que **no
>    haya URL de staging**, y sin URL no hay demo ni cierre del sprint 1. Se usa
>    `npm run build`, que avisa y compila. **Se cambia a `build:prod` en el sprint 5**, que
>    es cuando corresponde exigirlo.
> 3. **Faltaba fijar la versión de Node.** Astro 7.2.4 declara `engines.node >= 22.12.0` y
>    Cloudflare Pages arranca con Node 18: el build falla y el mensaje de error no dice que
>    la causa sea la versión. Resuelto en el repositorio con `site/.nvmrc`, no en el panel.

### Qué se obtiene

- URL de producción: `azucar-hotel-tulum.pages.dev`
- **Una URL por rama**, que es la que se manda al cliente en cada Review
- Despliegue automático en cada push

### Sobre `build` y `build:prod`

Son dos comandos con dos propósitos, y confundirlos es lo que rompía este runbook.

| Comando | Datos sin verificar | Uso |
|---|---|---|
| `npm run build` | **Avisa** y compila | Staging, sprints 1 a 4 |
| `npm run build:prod` | **Falla** y no compila | Producción, sprint 5 |

Que `build:prod` falle no es un error de configuración: es la regla 7 —*datos sin confirmar
por el cliente no se publican*— haciendo su trabajo. Hoy fallaría por **C1**: las unidades,
la capacidad y las camas de los 8 tipos son estimaciones nuestras y suman 22 contra las 21
que el hotel reporta.

**Deuda registrada:** el cambio de `build` a `build:prod` es criterio de entrada del
sprint 5 y está en su lista. No se olvida porque está escrito en los dos sitios.

---

## Parte 5 — Resend · el correo de solicitudes

### Qué es y por qué

El proveedor de correo transaccional que envía el endpoint de solicitudes
([ADR-0006](../decisiones/ADR-0006-endpoint-de-solicitud-correo-y-whatsapp.md)): el mensaje al
manager y el acuse al huésped. Decidido el 2026-08-22, sin evaluar más alternativas — cualquiera
de las de la tabla del ADR servía; Resend se eligió por su API mínima, pensada para runtimes
tipo *edge* como el de Cloudflare Pages Functions, y un nivel gratuito que cubre de sobra el
volumen de un hotel boutique.

**Esto NO activa el envío real todavía.** El endpoint sigue sin cablearse al formulario
(`FormularioSolicitud.astro` sigue con el `mailto:` de siempre) hasta que se resuelvan **B4** y
**E-PRIV**. Configurar Resend ahora deja el terreno listo para cuando lleguen esas dos
respuestas — no las adelanta.

### Configuración

1. `resend.com` → crear cuenta (correo o GitHub).
2. **Domains → Add Domain.** El dominio que se verifique aquí es el que aparecerá como
   remitente (`CORREO_REMITENTE`). 🔴 **Depende de tener acceso a su DNS** — y la titularidad
   de `azucarhotel.com` sigue sin confirmar (**R-06**, checklist de abajo). Si esa duda no está
   resuelta todavía, Resend permite probar con restricciones sin verificar un dominio propio;
   revisar el modo de prueba vigente en su documentación al configurar, no asumir que sigue
   igual que en 2026.
3. Añadir los registros que Resend entregue (SPF y DKIM, típicamente TXT y CNAME) en la zona
   DNS de ese dominio. Resend marca el dominio como verificado solo cuando los detecta —puede
   tardar minutos u horas por la propagación de DNS.
4. **API Keys → Create API Key.** Copiar la llave (empieza con `re_`) — sólo se muestra una vez.
5. En Cloudflare Pages: proyecto → **Settings → Environment variables**. Cloudflare separa
   variables de **Preview** y de **Production**: configúrense **sólo en Preview** por ahora. Es
   una segunda red de seguridad, además de que el propio endpoint falla cerrado sin ellas — así,
   aunque alguien cablee el `fetch()` del formulario antes de tiempo, Production sigue inerte.

| Variable | Valor | Nota |
|---|---|---|
| `RESEND_API_KEY` | la llave del paso 4 | — |
| `CORREO_REMITENTE` | `Azúcar Hotel Tulum <solicitudes@dominio-verificado>` | El dominio debe coincidir con el verificado en el paso 2 |
| `CORREO_MANAGER` | — | 🔴 Sigue vacía: es la pregunta **B4**, todavía sin responder. No inventar un valor — el endpoint falla cerrado mientras falte |
| `TURNSTILE_SECRET_KEY` | — | Producto aparte de Cloudflare (**dash.cloudflare.com → Turnstile**), no de Resend. También hace falta para que el endpoint opere; se documenta su alta cuando se retome |

6. Probar en local antes de tocar Cloudflare: `cp site/.dev.vars.example site/.dev.vars`,
   rellenar, y `npm run functions:dev` — ver
   [`site/functions/README.md`](../../site/functions/README.md).

### Qué se obtiene

Nada visible todavía para un huésped real — el endpoint queda **configurado y probable**, no
**conectado**. Lo visible llega en el cambio, deliberadamente pequeño, que cablee el `fetch()`
del formulario, y ese cambio espera a B4 y E-PRIV.

---

## Checklist de accesos pendientes

- [ ] Titularidad de `azucarhotel.com` y acceso al registrador (**E2** · R-06)
- [ ] Acceso al hosting actual (**E3**)
- [ ] **Google Business Profile** — administrador (**E4** · el de Maps)
- [ ] Google Analytics — propiedad creada, ID de medición entregado (**E4**)
- [ ] Google Search Console — verificado por DNS (**E4**)
- [ ] Cloudflare Pages — repositorio conectado
- [ ] Correo y WhatsApp oficiales de reservas (**B4**)
- [ ] Pasarela de pago elegida (**B3**)
- [ ] Cuenta de Resend creada y dominio de correo verificado (**Parte 5**)
- [ ] `RESEND_API_KEY` y `CORREO_REMITENTE` en Cloudflare Pages, sólo en Preview (**Parte 5**)
- [ ] Cuenta de Cloudflare Turnstile, `TURNSTILE_SECRET_KEY` en Cloudflare Pages (**Parte 5**)
