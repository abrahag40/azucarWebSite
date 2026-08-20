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
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build:prod` |
| Build output directory | `dist` |
| **Root directory** | `site` ← **el que más se olvida** |

4. **Environment variables** → añadir `PUBLIC_GA4_ID` con el `G-…` del paso 2.
5. Guardar y desplegar.

### Qué se obtiene

- URL de producción: `azucar-hotel-tulum.pages.dev`
- **Una URL por rama**, que es la que se manda al cliente en cada Review
- Despliegue automático en cada push

### Si el build falla

Es esperado y **es correcto**: `npm run build:prod` falla a propósito mientras haya datos de
alojamiento sin confirmar por el cliente (pregunta **C1**). No es un error de configuración,
es la guardia haciendo su trabajo.

Para desbloquear la primera demo hay dos caminos legítimos:
- **Recomendado:** conseguir la respuesta a C1 y marcar los datos como verificados.
- **Provisional:** cambiar el comando a `npm run build`, que avisa pero no bloquea.
  Si se toma este camino, **se registra como deuda con fecha**, no se olvida.

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
