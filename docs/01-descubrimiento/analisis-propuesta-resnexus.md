# Análisis competitivo — Propuesta de la agencia anterior (ResNexus)

> **Fase:** Sprint 0 · **Fuente:** captura HTTrack en `investigacion/mirrors/resnexus`
> **Naturaleza:** inteligencia competitiva. Es la propuesta que el cliente **evaluó y no
> concretó**. Nos dice qué le mostraron, qué le gustó lo suficiente para llegar tan lejos, y
> dónde estaba el listón.

---

## 1. Qué es realmente

| Dato | Valor |
|---|---|
| Páginas capturadas | 13 |
| Constructor real | **Duda** (`irp.cdn-website.com`, `static.cdn-website.com`, `ms-cdn.multiscreensite.com`) |
| Motor de reservas | **ResNexus**, propiedad `18DC254A-5D17-46EB-B1CF-6EAA4EB76602` |
| URL de producción prevista | `13855-azucar-hotel-tulum.resnexuswebsites.com` |
| Accesibilidad | Superposición **UserWay** (`cdn.userway.org`) |
| WhatsApp | 12 enlaces `wa.me` |
| Indexación | 12 de 13 páginas con `noindex` — es un preview, esperado |

> 🔍 **El "website builder" de ResNexus es Duda con marca blanca.** No es tecnología propia.
> Importa para valorar la propuesta: lo que diferencia a ResNexus no es el sitio, es el
> **PMS y el motor de reservas** que lleva detrás.

---

## 2. 🔴 Hallazgo que exige preguntar al cliente

Los botones de reserva apuntan a una **propiedad real y provisionada** en el motor de
ResNexus, con enlaces a unidades concretas (`unit=1`, `unit=2`, `unit=8`):

```
https://resnexus.com/resnexus/reservations/book/18DC254A-5D17-46EB-B1CF-6EAA4EB76602/
```

Esto no es una maqueta con enlaces de relleno. **Alguien dio de alta el hotel en ResNexus y
cargó inventario.**

**Preguntas que se añaden a la entrevista, bloque B:**

1. ¿Existe todavía esa cuenta de ResNexus? ¿Está activa o en periodo de prueba?
2. ¿Se está pagando algo por ella hoy?
3. ¿Quién tiene los accesos: el hotel o la agencia anterior?
4. ¿Se cargaron datos reales de habitaciones y tarifas ahí?

> Si la cuenta existe y está pagada, **cambia la conversación del ADR-0003**: el motor con
> channel manager que recomendamos como paso posterior podría estar ya contratado. Y si
> los accesos los tiene la agencia anterior, es un riesgo de titularidad idéntico al del
> dominio (R-06).

---

## 3. Dónde la propuesta anterior es mejor que el sitio actual

Hay que decirlo sin rodeos: **en redacción y en arquitectura de contenido, esta propuesta
supera al sitio vigente.**

### Redacción
| Elemento | Propuesta ResNexus | Sitio actual |
|---|---|---|
| Título de la home | *"Hotel Boutique Frente al Mar en Tulum \| Azúcar Hotel"* | *"Inicio - Azucar Hotel Tulum"* |
| Meta description | *"Despierta frente al Caribe mexicano y disfruta una experiencia diseñada para descansar, explorar y vivir Tulum a tu ritmo."* | **Ausente en 24 de 26 páginas** |
| Frase de marca | *"El único lugar donde el Mar es dulce"* | — |
| Sección de destino | *"Tulum no se recorre, se vive a tu ritmo"* | — |

El `<title>` de la propuesta contiene las palabras que un viajero realmente teclea —*hotel
boutique frente al mar Tulum*—. El del sitio actual dice "Inicio", que no busca nadie.

### Arquitectura de contenido
La propuesta añade secciones que el sitio actual no tiene y que sí venden:

- **Beach Club** — servicio monetizable e invisible hoy
- **Experiencias y atracciones en Tulum** — contenido de destino, capta búsquedas previas a la elección de hotel
- **Galería** dedicada
- **Testimonios** — *"Descubre por qué nuestros huéspedes regresan"*
- **Preguntas frecuentes** en la home
- **Términos y condiciones** separados de políticas

### 🎯 Y coincide con nuestra recomendación sobre el inventario

La propuesta reduce el catálogo a **tres nombres en la home** —Villa Cielo, Villa Mar, Villa
Aire— frente a los ocho tipos actuales. Y **renombra "Suite" como "Villa"**, que es un
reposicionamiento hacia arriba en la categoría.

> Llegamos a la misma conclusión por caminos distintos: nosotros desde la evidencia de que
> los tipos 5 a 8 son dos pares casi idénticos, ellos por criterio comercial. **Dos análisis
> independientes coincidiendo es la mejor validación disponible** de que ocho tipos son
> demasiados. Refuerza la propuesta de la auditoría §4.

---

## 4. Dónde es peor, y qué no copiamos

| Hallazgo | Por qué importa |
|---|---|
| **0 imágenes en WebP/AVIF** | El sitio actual del cliente ya está mejor en esto: 244 de 251 en WebP |
| **40 `<img>` sin `width`/`height`** | Provoca CLS |
| **Sin datos estructurados `schema.org`** | Mismo defecto que el sitio actual. Nadie está aprovechando esto — es hueco competitivo abierto |
| **41 páginas sin `canonical`** | — |
| **Superposición de accesibilidad UserWay** | ⚠️ Ver abajo |

### ⚠️ Sobre la superposición de accesibilidad

UserWay pertenece a la categoría de *accessibility overlays*: un script que se inyecta y
promete "hacer accesible" el sitio desde fuera. **La comunidad de accesibilidad las rechaza
de forma consistente**, porque no corrigen el marcado subyacente, a veces interfieren con
los lectores de pantalla que el usuario ya tiene configurados, y **no han evitado demandas
por accesibilidad** — en varios casos documentados, sitios con superposición fueron
demandados igual.

**No la usamos.** La accesibilidad va en la Definition of Done de cada historia, construida
en el marcado (ADR-0002). Es más trabajo y es la única forma que funciona.

---

## 5. Nota sobre los tokens de Mapbox — corrección

La ingesta redactó **12 tokens de Mapbox** repartidos en las páginas capturadas, y GitHub
Push Protection bloqueó el push por ellos.

**Son tokens `pk.` — públicos, no secretos.** Mapbox los diseña explícitamente para ir
incrustados en el cliente; lo correcto con ellos es restringirlos por dominio, no ocultarlos.
El detector de GitHub los etiqueta como *"Mapbox Secret Access Token"*, y esa etiqueta nos
llevó a un diagnóstico más grave del que corresponde.

**La redacción sigue siendo correcta** —no republicamos credenciales de terceros en nuestro
repositorio, y sin ella el push no pasa— pero **la severidad baja de "ResNexus filtra un
secreto" a "aparecen tokens públicos, que es su uso previsto"**. El riesgo R-15 se degrada a
informativo y no hay nada que notificar a nadie.

---

## 6. Qué nos llevamos

| Lo adoptamos | Lo descartamos |
|---|---|
| La línea editorial: títulos con intención de búsqueda, no etiquetas de navegación | La superposición de accesibilidad |
| Beach Club y Experiencias como secciones propias | Imágenes sin optimizar |
| Testimonios y FAQ en la home | Ausencia de `schema.org` — ahí ganamos nosotros |
| Consolidación del catálogo de alojamiento | El acoplamiento a Duda y a ResNexus |
| WhatsApp como canal de primera clase *(ya en ADR-0003)* | |
