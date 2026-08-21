# Mensaje al cliente — avance, dos avisos y cuatro decisiones

> **Estado:** listo para enviar. Sólo hay que ajustar el nombre y el tono a la relación real.
> **Fecha de redacción:** 2026-08-20
> **Sustituye a** [`mensaje-de-envio-aviso.md`](../01-descubrimiento/mensaje-de-envio-aviso.md),
> que cubría sólo el aviso de datos de tarjeta y sigue sin enviarse desde el sprint 0.
> El aviso técnico completo, para adjuntar, es
> [`aviso-cliente-datos-de-tarjeta.md`](../01-descubrimiento/aviso-cliente-datos-de-tarjeta.md).

---

## Por qué este mensaje va así, y no como una lista de preguntas

**El orden importa más que el contenido.** Cuatro decisiones de redacción, con su motivo:

1. **Abre con la URL, no con los problemas.** Es lo que hace que se lea el resto. Un cliente
   que ve su hotel funcionando contesta preguntas; uno que recibe un cuestionario, lo archiva.
   *Técnica: reciprocidad — se entrega algo antes de pedir.*

2. **Separa lo que es aviso de lo que es petición.** Los puntos 1 y 2 no piden nada: informan
   de dos cosas que están publicadas en su sitio ahora mismo. Mezclarlos con las preguntas los
   convertiría en «una más de la lista» y perderían urgencia.

3. **No culpa a nadie.** Ni al proveedor anterior ni al hotel. Culpar invita a discutir de
   quién fue la culpa en vez de qué se hace.

4. **Cada petición dice qué desbloquea.** «Necesito el desglose de impuestos» se ignora.
   «Sin el desglose no puedo construir la cotización, que es la pantalla que evita la queja de
   *me cobraron más de lo publicado*» se contesta.

> **Antipatrón evitado:** el *status report* sin decisión pedida. Informar del avance sin
> cerrar con una pregunta concreta y una fecha produce un acuse de recibo, no una respuesta.

---

## Correo

**Asunto:** Ya puedes ver el sitio nuevo — y dos cosas del actual que conviene revisar

---

Hola [Nombre]:

Ya hay algo que puedes abrir. El sitio nuevo está en línea, en una dirección de pruebas:

**https://azucar-hotel-tulum.pages.dev**

Ábrelo desde el teléfono, que es como lo van a ver seis de cada diez huéspedes. Están la
portada, los ocho tipos de alojamiento con su ficha y sus fotos, servicios, cómo llegar,
preguntas frecuentes, políticas y contacto — todo en español y en inglés. Falta la pantalla
de solicitud de reserva, y de eso te hablo al final.

Verás algunos datos marcados con un asterisco. Son los que todavía no me has confirmado: los
puse visibles a propósito, para que sepas exactamente qué falta en vez de tener que
buscarlo.

---

### Dos cosas del sitio actual que conviene revisar ya

**1. El formulario de autorización de pago pide el número de tarjeta y el código de
seguridad.**

Las páginas son `/autorizacion-de-pago-con-tdc/` y su versión en inglés. Los datos se envían
por correo electrónico.

Esto no cumple la normativa de las marcas de tarjeta (PCI-DSS): el código de seguridad no se
puede guardar nunca, ni siquiera cifrado, y el número completo no puede viajar por correo.
La exposición real para el hotel es de multas del banco y, en el peor caso, perder la
afiliación para cobrar con tarjeta. Es muy probable que en los buzones del hotel haya hoy un
histórico de tarjetas completas.

**Lo que recomiendo, y no requiere esperar al sitio nuevo:** despublicar hoy esas dos
páginas y sustituirlas por un enlace de pago de una pasarela (Stripe, Mercado Pago, Clip o
Conekta). El huésped teclea la tarjeta en el entorno del proveedor, nunca en el nuestro. Te
adjunto el detalle técnico.

**2. El sitio anuncia un restaurante y un spa que su propia página de preguntas frecuentes
desmiente.**

En `/servicios/` y en `/amenidades-y-facilidades/` aparecen «Restaurante y Bar Blanc» y
«Spa». En `/preguntas-frecuentes/` está escrito: *«¿Tienen restaurante o bar? Por ahora no
tenemos servicio de restaurante o bar»*. La versión en inglés dice lo mismo. Además, el roof
top aparece con dos nombres distintos: «Blanc» en amenidades y «Selvamar» en las preguntas.

Lo he retirado del sitio nuevo mientras me confirmas cuál es la versión correcta. Prefiero
prometer de menos: un huésped que llega esperando restaurante y no lo encuentra deja una
reseña que cuesta mucho más que la reserva.

**Necesito saber:** ¿hay hoy restaurante, bar y spa? Si los hay, con qué nombre y horario.

---

### Cuatro cosas que necesito para continuar

Las ordeno por lo que bloquean, no por lo que cuestan de contestar.

**a) El desglose de impuestos de una noche.** IVA, ISH y saneamiento, y si la tarifa
publicada los incluye o no.
→ *Sin esto no puedo construir la pantalla de cotización, que es justo la que evita la queja
de «me cobraron más de lo publicado». Es lo que más bloquea de esta lista.*

**b) Quién recibe las solicitudes de reserva y en cuánto tiempo responde.** Un nombre y un
compromiso realista: dos horas, seis, un día.
→ *El sitio va a decir al huésped cuándo tendrá respuesta. Si no lo decimos, asume que es
inmediato y se va a otra parte cuando no lo es.*

**c) El correo y el WhatsApp oficiales de reservas.** Los que se atienden de verdad.
→ *Son los dos canales por los que le llegará el aviso al teléfono.*

**d) La tabla de los ocho tipos de alojamiento.** Número de unidades, capacidad máxima y
camas de cada uno.
→ *Ahora mismo son estimaciones mías y suman 22 unidades contra las 21 que ustedes reportan.
Hasta que no las confirmes, el sitio no puede publicarse como definitivo.*

---

### Lo que propongo

Una llamada de **treinta minutos** esta semana. Con eso salen (a), (b) y (c), que son de
conversación. La tabla de habitaciones (d) y lo del restaurante puedes mandármelos por
escrito cuando los tengas a mano.

¿Te va bien [día] a las [hora]?

Un abrazo,
[Abraham]

---

## Checklist de envío

- [ ] Ajustar nombre, tono y despedida
- [ ] Adjuntar `aviso-cliente-datos-de-tarjeta.md` (convertido a PDF)
- [ ] Proponer día y hora concretos, no «cuando puedas»
- [ ] Enviar por **correo**, no por WhatsApp: de los puntos 1 y 2 conviene que quede
      constancia escrita y fechada
- [ ] Registrar la fecha de envío en `CLAUDE.md` §9

## Si no hay respuesta en 48 h hábiles

El SLA acordado en ADR-0002 es de 48 horas hábiles. Pasado ese plazo, un recordatorio corto
por WhatsApp que apunte al correo — no que lo repita:

> Hola [Nombre], ¿pudiste ver el correo del sitio nuevo? Hay dos cosas del sitio actual que
> convendría revisar pronto, sobre todo la del formulario de tarjetas. ¿Te llamo mañana?
