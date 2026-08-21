# Guion de la sesión de capacitación

> **Quién la da:** Abraham. **Quién la recibe:** la persona del hotel que va a atender las
> solicitudes, y su suplente. **Duración: 45 minutos.** **Se graba.**
>
> Este guion es la parte de software del criterio de H5.8. **La sesión en sí y su
> grabación no las hace Claude**: requieren personas reales frente a una pantalla.

---

## Por qué se graba, y por qué eso es la mitad del valor

Una capacitación sin grabar sirve **una vez, a quien estuvo**. En un hotel boutique el
personal rota, y el día que entre alguien nuevo la opción será repetir la sesión —que no se
va a repetir— o que aprenda por imitación de quien quedó, con los errores incluidos.

**La grabación convierte la capacitación en un activo del hotel en vez de un evento.** Es
lo mismo que un runbook escrito, pero para lo que no se deja escribir: el tono al responder,
qué se hace cuando el huésped insiste, cómo suena un «no» que no pierde la venta.

> **Antipatrón evitado:** el traspaso como reunión. Si el conocimiento sólo existe mientras
> dura la reunión, no se traspasó nada.

---

## Antes de empezar — comprobar, no suponer

- [ ] Alguien del hotel entra a `contacto@azucarhotel.com` **desde su propio teléfono**,
      delante de todos. Si no puede, la sesión no tiene sentido: arréglalo primero.
- [ ] El [runbook operativo](runbook-operativo-solicitudes.md) **impreso**, un ejemplar por
      persona. Que puedan rayarlo.
- [ ] Grabación empezada. Dilo en voz alta: «esto se está grabando para quien entre después».
- [ ] Ten a mano un teléfono con el sitio abierto en `/reservar/`.

---

## Minuto a minuto

### 0–5 · Qué cambia y qué no

Una sola idea: **el hotel sigue confirmando a mano, como siempre.** El sitio no reserva
nada por su cuenta. Lo único que cambia es que ahora la petición llega **ordenada y
completa**, en vez de un «hola, ¿tienen cuarto?» al que hay que contestar tres veces para
enterarse de las fechas.

> Si alguien se queda con la idea de que «la página ya reserva sola», la sesión falló.
> Compruébalo preguntando, no asumiendo.

### 5–15 · Mandar una solicitud de verdad, desde su propio teléfono

**No la mandes tú.** Que la mande quien va a atenderlas, desde su teléfono, en el sitio real.

1. Abrir `azucarhotel.com/reservar/`.
2. Llenarla con fechas reales de la semana que viene.
3. Ver que se abre su correo con el mensaje ya escrito. **Enviarla.**
4. Abrir la bandeja del hotel y encontrarla.

Ver el asunto con las fechas **en su propia bandeja** es lo que hace que se entienda. Que
lo digan ellos: «ah, entonces lo reconozco sin abrirlo».

### 15–25 · Los cuatro pasos, sobre esa solicitud

Con el runbook impreso delante, recorrer los cuatro pasos usando el correo que acaba de
llegar. Revisar disponibilidad de verdad. **Calcular el total con impuestos de verdad.**
Escribir la respuesta con la plantilla, y mandársela a sí mismos.

> Si en este punto no se puede calcular el total porque **C3** sigue sin respuesta, **dilo
> en la grabación**: «esta parte queda pendiente hasta que definamos los porcentajes». No
> la inventes. Quien vea el video después tiene que saber que ese hueco existe.

### 25–35 · Las dos reglas que cuestan dinero si se rompen

Dedícales diez minutos enteros. Son el motivo de que exista esta sesión.

**1. Nunca pedir datos de tarjeta.** Enseña la página del sitio anterior que los pedía.
Que la vean. Explica que esos correos siguen en el buzón del hotel y hay que borrarlos.
Pregunta: *«¿y si el huésped insiste en mandarla?»* — que respondan ellos, y corrige.

**2. Nunca decir "confirmada" antes de tiempo, y el precio siempre con impuestos.**
Enseña las reseñas reales de «me cobraron más de lo publicado». Es más convincente que
cualquier explicación: es su propio hotel y sus propios huéspedes.

### 35–42 · Los casos difíciles, en voz alta

Que contesten ellos, sin leer el runbook:

- No hay disponibilidad para lo que pidió. *(Se busca: una alternativa concreta, nunca un «no» seco.)*
- Escriben en inglés. *(Se busca: contestar en inglés.)*
- Preguntan si hay restaurante. *(Se busca: la verdad. Y este es el momento de resolver **C0** en vivo, con el dueño en la sala si es posible.)*
- Preguntan por el desayuno o las mascotas. *(Se busca: mandar el enlace de preguntas frecuentes.)*
- Dicen que reservaron y no aparece. *(Se busca: buscar por el asunto con sus fechas.)*

### 42–45 · Cerrar con lo pendiente, escrito

Delante de todos, y que quede en la grabación:

- El tiempo de respuesta que el hotel se compromete a cumplir → **anotarlo en el runbook** (B2).
- Quién atiende y quién es el suplente cuando no está (B1).
- Los porcentajes de impuestos (C3).
- ¿Hay restaurante, bar y spa? (C0).

---

## Después de la sesión

| | |
|---|---|
| Guardar la grabación | Donde el hotel pueda encontrarla sin ti. Un enlace en el mismo correo del hotel |
| Rellenar los huecos del runbook | Tiempo de respuesta, responsable, impuestos |
| Volver a enviarlo, ya completo | Un runbook con huecos se deja de usar |
| Anotar las preguntas que no supiste responder | Son requerimientos que faltaban, no fallos de la sesión |

## Cómo se sabe si funcionó

No por que asintieran. Por esto, dos semanas después:

- [ ] Han contestado una solicitud real **sin preguntarte nada**.
- [ ] En ninguna respuesta aparece «confirmada» antes de estarlo.
- [ ] Ningún total salió sin impuestos.
- [ ] Nadie pidió una tarjeta por correo.

Si algo de esto falla, no se repite la sesión: **se corrige el runbook**, que es donde iban
a buscar y no encontraron.
