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

## Checklist de accesos pendientes

- [ ] Titularidad de `azucarhotel.com` y acceso al registrador (**E2** · R-06)
- [ ] Acceso al hosting actual (**E3**)
- [ ] **Google Business Profile** — administrador (**E4** · el de Maps)
- [ ] Google Analytics — propiedad creada, ID de medición entregado (**E4**)
- [ ] Google Search Console — verificado por DNS (**E4**)
- [ ] Cloudflare Pages — repositorio conectado
- [ ] Correo y WhatsApp oficiales de reservas (**B4**)
- [ ] Pasarela de pago elegida (**B3**)
