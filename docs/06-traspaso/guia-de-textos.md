# Guía de textos — dónde se cambia cada cosa

> **Para quién es esto:** para ti, Abraham, cuando quieras cambiar textos del sitio sin
> acordarte de dónde vive cada uno. Nada de esto requiere entender Astro.
>
> **La regla de oro del proyecto:** el contenido nunca está dentro del HTML. Vive en archivos
> de datos, separado del diseño. Por eso cambiar un texto es abrir un archivo, buscar la frase
> y sustituirla — nunca hay que tocar plantillas.

---

## Antes de empezar: las tres reglas que no conviene romper

1. **Cada texto va dos veces: `es` y `en`.** Si cambias uno y no el otro, el sitio queda a
   medias. No se rompe, pero se nota.
2. **Respeta las comillas y las comas.** El formato es `es: 'texto aquí',`. Si borras una
   comilla o una coma, el sitio no compila. No pasa nada grave —te avisa— pero hay que
   arreglarlo antes de publicar.
3. **Si tu texto lleva un apóstrofo** (`'`), escríbelo con comillas dobles fuera:
   `es: "el día d'ahir"`. Si no, la comilla corta la frase.

### Cómo comprobar que no rompiste nada

```bash
cd site && npm run build
```

Si termina sin error rojo, está bien. Si falla, el mensaje dice el archivo y la línea.

### Cómo ver los cambios antes de publicar

```bash
cd site && npm run dev
```

Abre `http://localhost:4321`. Se actualiza solo al guardar.

---

## Mapa rápido: qué quiero cambiar → qué archivo abro

| Quiero cambiar… | Archivo |
|---|---|
| **La carta del restaurante** (platos, precios) | `site/src/data/restaurante.ts` |
| Textos de botones, menús, etiquetas, títulos de página | `site/src/i18n/ui.ts` |
| Teléfonos, correo, dirección | `site/src/data/hotel.ts` |
| El texto de «quiénes somos» y las amenidades de la portada | `site/src/data/hotel.ts` |
| Preguntas frecuentes | `site/src/data/faq.ts` |
| Políticas del hotel | `site/src/data/politicas.ts` |
| Aviso de privacidad | `site/src/data/privacidad.ts` |
| Descripciones de las habitaciones | `site/src/content/alojamiento/*.json` |
| Precios de las habitaciones | El panel en `/panel/`, o `site/src/data/precios.json` |
| Textos alternativos de las fotos de la galería | `site/src/data/galeria.ts` |

---

## 1. La carta del restaurante

**Archivo:** `site/src/data/restaurante.ts`

> ⚠️ **Lo que hay ahora es contenido de EJEMPLO, no la carta real del hotel.** Los platos y
> los precios los inventé para que la página se vea completa. **Hay que sustituirlos antes de
> que el sitio salga a producción.**

Baja hasta `export const carta` y verás la estructura. Cada plato es un bloque así:

```js
{
  nombre: { es: 'Ceviche de pescado', en: 'Fish ceviche' },
  descripcion: {
    es: 'Pesca del día en limón, con cebolla morada, chile y cilantro.',
    en: 'Catch of the day in lime, with red onion, chilli and coriander.',
  },
  precio: 320,
},
```

- **Añadir un plato:** copia un bloque entero (de `{` a `},`) y cambia los textos.
- **Quitar un plato:** borra el bloque entero.
- **Plato sin precio:** borra la línea `precio: 320,`.
- **Sin descripción:** borra las cuatro líneas de `descripcion`.
- **El precio va sin `$` ni comas:** `320`, nunca `"$320"` ni `3,200`.

**El nombre del restaurante** está arriba, en `nombre:`. Ahora dice `Selvamar` — el sitio viejo
lo llama así en un sitio y «Blanc» en otro, así que confirma cuál es.

**Para ocultar la página entera** (por ejemplo, si el restaurante cierra por temporada):
cambia `publicable: true` por `publicable: false`. La página desaparece del menú y la URL da
404.

🔴 **Sobre los impuestos:** la página dice debajo de la carta «Los precios incluyen impuestos».
Si los precios que pongas son sin impuestos, súmaselos antes — o quita los precios y deja sólo
los nombres.

---

## 2. Textos de interfaz — botones, menús, títulos

**Archivo:** `site/src/i18n/ui.ts`

Es el archivo más grande, pero está ordenado por secciones. Cada línea es así:

```js
'reserva.cta': 'Solicitar reserva',
```

La parte de la izquierda (`reserva.cta`) es el **identificador** — **no lo cambies**, porque el
código lo busca por ese nombre. Cambia sólo lo de la derecha.

El archivo tiene dos bloques grandes: primero todo en español (`es:`), y más abajo lo mismo en
inglés (`en:`). **Cambia siempre los dos.**

### Los que más se suelen tocar

| Identificador | Qué es |
|---|---|
| `home.titulo` | El título de la portada que sale en Google |
| `home.meta` | La descripción de la portada en Google |
| `hero.titulo` | El titular grande de la portada |
| `hero.entrada` | La frase debajo del titular |
| `reserva.cta` | El botón «Solicitar reserva» de todo el sitio |
| `nav.*` | Los nombres del menú |
| `restaurante.entrada` | La frase de entrada de la página de restaurante |

---

## 3. Datos de contacto

**Archivo:** `site/src/data/hotel.ts`, al principio.

```js
export const contacto = {
  correo: 'contacto@azucarhotel.com',
  telefonos: ['+52 (984) 210-0057', '+52 (81) 1380-2176'],
  whatsapp: null,
};
```

⚠️ **Los espacios de los teléfonos no son espacios normales.** Son «espacios duros»
(`\u00A0`), que impiden que el número se parta en dos líneas. En el editor se ven igual que un
espacio corriente, pero no lo son.

**Si cambias un número, copia el formato tal cual y sustituye sólo los dígitos.** Si escribes
el número de cero con espacios normales, funciona igual — pero puede partirse a mitad en
pantallas estrechas.

**El WhatsApp** está en `null` porque no sabemos cuál de los dos números lo tiene. Cuando lo
sepas, ponlo así — sólo dígitos, con el 52 delante, sin espacios ni signos:

```js
whatsapp: '529842100057',
```

En cuanto lo pongas, el botón verde flotante deja de llevar a `/contacto/` y abre WhatsApp
directamente.

---

## 4. Preguntas frecuentes

**Archivo:** `site/src/data/faq.ts`

Cada pregunta es un bloque:

```js
{
  p: { es: '¿Tienen alberca?', en: 'Do you have a pool?' },
  r: { es: 'Sí, alberca infinita frente al mar.', en: 'Yes, an infinity pool facing the sea.' },
},
```

`p` es la pregunta, `r` la respuesta. Mismo sistema: copia un bloque para añadir, bórralo entero
para quitar.

---

## 5. Las habitaciones

**Carpeta:** `site/src/content/alojamiento/` — un archivo `.json` por tipo.

Los campos que más se tocan:

```json
"nombre":           { "es": "Suite Mar", "en": "Suite Mar" },
"descripcionCorta": { "es": "…", "en": "…" },
"descripcion":      { "es": "…", "en": "…" },
"vista":            { "es": "…", "en": "…" },
"camas":            { "es": "1 cama king size", "en": "1 king size bed" },
"capacidadMaxima":  2,
"unidades":         4,
```

🔴 **El campo `verificado`** es importante. Lista qué datos ha confirmado el hotel:

```json
"verificado": ["nombre", "vista"]
```

Los que **no** están en esa lista salen en la web **con un asterisco**, avisando de que están
por confirmar. Cuando el hotel confirme las camas y la capacidad, añade `"camas"` y
`"capacidad"` a la lista y los asteriscos desaparecen solos.

**Para ocultar una habitación:** `"publicado": false`.

---

## 6. Precios de las habitaciones

Dos formas:

- **El panel**, en `tudominio.com/panel/` — pensado para el hotel. Necesita configurarse
  primero (Parte 6 del runbook de despliegue).
- **A mano**, en `site/src/data/precios.json`.

🔴 Ahora mismo `"publicable": false`, así que **los precios no se ven en el sitio**. Ponerlo en
`true` los publica — pero antes hay que confirmar el desglose de impuestos, porque el precio que
se muestra tiene que ser el que se cobra.

---

## 7. Textos alternativos de las fotos

**Archivo:** `site/src/data/galeria.ts`

Son las descripciones que lee un lector de pantalla y que Google usa para entender la imagen.
Describen **lo que se ve**, no lo que se quiere vender: «camastros bajo una pérgola con el sol
poniéndose» sirve; «un atardecer de ensueño» no.

Para **cambiar una foto**, hay que sustituir el archivo en `site/src/assets/galeria/` con el
mismo nombre, y actualizar aquí su descripción.

---

## Cuando termines: publicar

```bash
cd site && npm run build
```

Si sale bien:

```bash
git add -A
git commit -m "contenido: actualiza la carta del restaurante"
git push
```

Cloudflare detecta el push y republica solo en uno o dos minutos.

### Antes de publicar de verdad, la comprobación completa

```bash
./scripts/verificar-todo.sh
```

Corre las doce comprobaciones del proyecto: tipos, pruebas, accesibilidad, enlaces rotos,
redirecciones. Si sale todo en verde, puedes publicar tranquilo.

---

## Lo que sigue pendiente y no es texto

Estas cosas necesitan una respuesta del hotel o una configuración, no una edición:

| Qué | Dónde está documentado |
|---|---|
| La carta real del restaurante | Este documento, sección 1 |
| Cuál de los dos números tiene WhatsApp | Sección 3 · pregunta **B4** |
| Desglose de impuestos, para publicar precios | Pregunta **C3** |
| Unidades, capacidad y camas confirmadas | Pregunta **C1** |
| Aviso de privacidad conforme a la ley | Pregunta **E-PRIV** |
| Tiempos y costos desde el aeropuerto | Pregunta **C-LLEG** |
| Cuenta de Resend, para que el formulario envíe correos | `runbook-accesos-y-despliegue.md`, Parte 5 |
| Cloudflare Access, para que funcione el panel de precios | `runbook-accesos-y-despliegue.md`, Parte 6 |

El mensaje al cliente que pide casi todo esto está escrito y listo para enviar en
[`mensaje-cliente-desbloqueo.md`](../02-requerimientos/mensaje-cliente-desbloqueo.md).
