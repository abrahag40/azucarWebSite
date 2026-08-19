# ADR-0003 — Arquitectura de reserva sin PMS: solicitud de reserva, no confirmación instantánea

- **Fecha:** 2026-08-19
- **Estado:** Propuesta — requiere visto bueno de Abraham y confirmación del cliente
- **Decisor:** Claude (líder de proyecto)

## Contexto

Datos nuevos aportados por el cliente:

1. **No opera ningún PMS.** La gestión es manual.
2. **No hay channel manager.** El manager actualiza tarifas y disponibilidad
   **personalmente en cada OTA**.
3. **El cliente quiere que el huésped pueda reservar desde el sitio web.**
4. El cliente acepta que por ahora sea manual y revisar el tema más adelante.

## El problema

Los puntos 1–3 son incompatibles entre sí si "reservar" significa **confirmación
instantánea**. La razón es una sola fuente de verdad inexistente:

```
Sitio web confirma la habitación 5 el 14 de marzo
        ↓ (nadie le avisa a nadie)
Booking.com sigue mostrando la habitación 5 disponible el 14 de marzo
        ↓
Booking.com vende la habitación 5 el 14 de marzo
        ↓
Dos huéspedes, una habitación → SOBREVENTA
```

Sin channel manager, cualquier canal que venda en tiempo real y en paralelo a las OTAs
genera sobreventa por diseño. No es un bug corregible: es una consecuencia aritmética de
tener inventario compartido sin sincronización.

> 🔗 **Hallazgo conectado.** La auditoría detectó como queja recurrente en reseñas
> *"habitación entregada distinta a la reservada"*. Esta arquitectura es la causa raíz más
> probable. Construir confirmación instantánea sobre el estado actual **amplificaría** el
> problema que el cliente nos contrató a resolver.

## Opciones evaluadas

| # | Opción | Costo dev | Costo recurrente | Riesgo de sobreventa | Fricción para el huésped |
|---|---|---|---|---|---|
| **A** | **Solicitud de reserva** (*request-to-book*): el sitio captura la petición, el manager confirma a mano | Bajo | $0 | **Nulo** | Media |
| **B** | Contratar motor de reservas SaaS con channel manager (Cloudbeds, Little Hotelier, Sirvoy, Beds24) | Muy bajo — se integra, no se construye | ~USD 50–150/mes | Nulo | Nula |
| **C** | Construir nuestro propio motor con calendario de disponibilidad | **Muy alto** | Hosting + pasarela | **Alto — no resuelve nada** | Nula |

### Por qué se descarta la opción C

Construir un motor propio significa construir **un PMS**: disponibilidad, tarifas por
temporada, políticas de cancelación, cobros, reembolsos, cumplimiento PCI-DSS. Meses de
trabajo. Y aun terminándolo, **seguiría sin hablar con las OTAs**: la sobreventa persiste
idéntica. Es máximo esfuerzo para cero mitigación del riesgo real.

> **Antipatrón: construir infraestructura de commodity.** Se construye lo que diferencia al
> negocio y se compra lo que ya es un producto maduro. Un motor de reservas es commodity
> desde hace quince años. Nuestro valor está en la experiencia, la marca y la conversión —
> no en reimplementar disponibilidad de inventario.

### Por qué la opción B es la correcta a mediano plazo

Un motor SaaS **no es sólo un botón de reservar**: incluye mini-PMS y channel manager. Por
el costo de una noche de hospedaje al mes resuelve estructuralmente el problema que hoy
genera reseñas negativas. **Es la recomendación de negocio y así se le debe plantear al
cliente**, aunque hoy la decline.

## Decisión

**Opción A para el lanzamiento, con la arquitectura diseñada para que migrar a la opción B
sea el reemplazo de un componente y no una reescritura.**

### Cómo se implementa

1. **El sitio no muestra disponibilidad.** No hay calendario que diga "libre" u "ocupado",
   porque no tenemos el dato y **mostrar disponibilidad falsa es peor que no mostrarla**.
2. El huésped elige fechas, tipo de alojamiento y número de personas, y envía una
   **solicitud**. El lenguaje es explícito en toda la interfaz: *"Solicitud de reserva —
   sujeta a confirmación"*. Nunca "Reserva confirmada".
3. **Confirmación automática e inmediata de recepción** (correo + pantalla), con: resumen
   de la solicitud, **cotización estimada desglosada con impuestos**, y el compromiso de
   respuesta (*"te respondemos en menos de X horas"*).
4. La solicitud llega al manager por **correo y WhatsApp**, con formato estructurado y
   accionable.
5. El manager confirma o propone alternativa, y envía **enlace de pago** (pasarela: la
   pasarela es del cliente, nosotros sólo enlazamos — no tocamos datos de tarjeta y por
   tanto **no entramos en alcance PCI-DSS**).
6. **WhatsApp como canal paralelo de primera clase**, no como enlace escondido en el pie.
   En México es el canal preferido y reduce el abandono de quien no quiere llenar formularios.

### Frontera de reemplazo (lo que hace que esto no sea deuda técnica)

Todo el flujo vive detrás de **un único módulo** `booking/` con una interfaz definida. El
resto del sitio —habitaciones, galería, contenido— no conoce su implementación interna.
Migrar a la opción B consiste en sustituir ese módulo por el widget o la API del proveedor.

> Técnica: *anti-corruption layer* (Eric Evans, *Domain-Driven Design*). Se aísla la decisión
> volátil detrás de una frontera estable, para que el cambio previsto sea contenido en vez
> de sistémico. **Una decisión provisional deja de ser deuda técnica cuando se documenta
> como provisional y se aísla su punto de cambio.**

## Cómo se compensa la fricción

*Request-to-book* convierte peor que la reserva instantánea. Es un costo real y se mitiga
con diseño, no ignorándolo:

- **Formulario corto.** Cada campo extra cuesta conversión. Sólo lo imprescindible para
  cotizar y contactar.
- **Compromiso de tiempo visible y cumplido.** El compromiso lo define el cliente; nosotros
  lo mostramos. Un tiempo publicado y no cumplido es peor que no publicarlo.
- **Acuse inmediato.** El silencio entre solicitud y confirmación es donde se pierde al
  huésped: si en 30 segundos no recibe nada, se va a Booking.
- 🔴 **Cotización desglosada con impuestos incluidos** (IVA, ISH de Quintana Roo,
  saneamiento ambiental de Tulum). **Esto ataca directamente la queja de "me cobraron más
  de lo publicado"** que encontró la auditoría. Es la ventaja inesperada de no tener motor
  externo: controlamos por completo cómo se presenta el precio. Convertimos una limitación
  técnica en el diferenciador frente a las OTAs.
- **WhatsApp visible en todo momento.**

## Consecuencias

**Positivas:** riesgo de sobreventa eliminado · costo recurrente cero · alcance de
desarrollo acotado y estimable · sin alcance PCI-DSS · control total sobre la presentación
del precio · el cliente conserva contacto directo con el huésped, que es justo el activo
que las OTAs le quitan.

**Negativas / costo asumido:** conversión menor que un motor instantáneo · carga operativa
para el manager (cada solicitud exige respuesta humana) · el compromiso de tiempo de
respuesta es una promesa que el hotel debe poder cumplir, incluso en fin de semana.

**Requisito no técnico, y es condición de éxito:** el cliente debe designar responsable y
horario de atención de solicitudes. **Si nadie responde en horas, el sitio genera
frustración en vez de reservas.** Esto se acuerda antes del lanzamiento; no es negociable.

## Preguntas al cliente que se derivan

1. ¿Cuál es el compromiso de respuesta que **sí puede cumplir**? (2 h en horario / 12 h / 24 h)
2. ¿Quién responde y en qué horario? ¿Y fines de semana?
3. ¿Con qué pasarela de pago cuenta o puede contratar? (Stripe, Mercado Pago, Clip, Conekta, PayPal)
4. ¿Correo y número de WhatsApp oficiales para recibir solicitudes?
5. ¿Autoriza que le presentemos el costo/beneficio de un motor SaaS con channel manager
   (opción B) como siguiente paso después del lanzamiento?
