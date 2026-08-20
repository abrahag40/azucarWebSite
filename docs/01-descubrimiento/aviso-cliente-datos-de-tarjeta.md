# Aviso técnico — Captura de datos de tarjeta en el sitio web actual

**Para:** Dirección de Azúcar Hotel Tulum
**De:** Equipo técnico del proyecto de renovación del sitio web
**Fecha:** 20 de agosto de 2026
**Asunto:** Hallazgo de seguridad detectado durante la auditoría técnica
**Requiere decisión del hotel:** sí — ver sección 6

---

## Por qué recibes este documento

Durante la auditoría técnica del sitio actual —el primer paso del proyecto de renovación—
encontramos algo que **no forma parte del alcance que nos contrataste**, pero que
consideramos obligatorio informarte.

No es una recomendación de diseño ni una opinión sobre cómo se ve el sitio. Es un hallazgo
sobre **cómo se están manejando hoy los datos de tarjeta de tus huéspedes**, y tiene
implicaciones legales y financieras para el hotel que existen desde antes de que nosotros
llegáramos.

Te lo presentamos con la evidencia completa para que **la decisión la tomes tú, con
información suficiente**. Nosotros damos la recomendación; la decisión y la aceptación del
riesgo corresponden al hotel.

---

## 1. Qué encontramos

Dos páginas del sitio contienen un formulario que solicita los datos completos de una
tarjeta bancaria:

- `azucarhotel.com/autorizacion-de-pago-con-tdc/`
- `azucarhotel.com/en/cc-payment-authorization/`

Los campos que ese formulario captura son, textualmente:

| Nombre técnico del campo | Qué pide al huésped |
|---|---|
| `numero_tarjeta` | El número completo de la tarjeta |
| `codigo_cvc` | **El código de seguridad de 3 dígitos del reverso (CVV/CVC)** |
| `exp_tarjeta_1` y `exp_tarjeta_2` | Mes y año de vencimiento |
| `nombre_tarjeta` | Nombre del titular tal como aparece en la tarjeta |
| `tipo_tarjeta` | Marca (Visa, Mastercard…) |
| `total` | Monto en pesos a cargar |
| 8 campos más | Domicilio de facturación completo: calle, número exterior e interior, código postal, colonia, ciudad y país |

El formulario está construido con un componente llamado **Contact Form 7**, que es un
sistema de formularios de contacto para WordPress. Su funcionamiento es siempre el mismo:
**toma lo que el visitante escribe y lo envía por correo electrónico** a una o varias
direcciones del hotel. Según su configuración, también puede guardar una copia en la base
de datos del sitio.

Es decir: **cada vez que un huésped llena ese formulario, el número completo de su tarjeta y
su código de seguridad viajan por correo electrónico y quedan almacenados en un buzón.**

---

## 2. Cómo lo encontramos

Para que puedas verificarlo por tu cuenta o con cualquier otro técnico:

1. Descargamos una copia completa del sitio con **HTTrack**, una herramienta estándar de
   archivo web. La copia quedó fechada y guardada; el proceso terminó sin errores
   (*"mirror complete · 434 links scanned · 405 files written"*).
2. Analizamos los **24 formularios** del sitio con un programa que revisa uno por uno los
   campos que cada formulario solicita.
3. Dos de ellos —los citados arriba— resultaron pedir número de tarjeta y código de
   seguridad.

Cualquiera puede comprobarlo abriendo esas dos páginas en un navegador. **No hace falta
confiar en nuestra palabra.**

---

## 3. Qué dice la normativa

Existe un estándar internacional obligatorio para cualquier negocio que acepte tarjetas,
llamado **PCI-DSS** (*Payment Card Industry Data Security Standard*). No es una ley, es una
condición contractual: lo imponen Visa, Mastercard y American Express a través del banco con
el que el hotel cobra.

Tres puntos aplican directamente:

**a) El código de seguridad (CVV) no se puede guardar nunca.**
*Requisito 3.3.1.* El estándar prohíbe conservar el código de seguridad **después** de
procesar el cobro. No hay excepción, ni siquiera guardándolo cifrado. Un correo electrónico
lo conserva de forma indefinida.

**b) El número de tarjeta no se puede enviar por correo sin protección.**
*Requisito 4.2.1.* Prohíbe transmitir números de tarjeta por mensajería de usuario final
—correo, WhatsApp, SMS— sin cifrado extremo a extremo.

**c) Un sitio WordPress con un formulario de contacto no es un entorno válido para esto.**
No existe ninguna modalidad de autoevaluación que permita a un comercio capturar tarjetas de
esta forma. El único camino conforme es que el huésped teclee su tarjeta **directamente en
la página de una pasarela de pago certificada**, sin que el dato pase por el sitio del hotel.

**Además, en México aplica la LFPDPPP** (Ley Federal de Protección de Datos Personales en
Posesión de los Particulares). Los datos bancarios se clasifican como *datos personales
patrimoniales* y exigen consentimiento expreso y medidas de seguridad reforzadas. Una fuga
de esa información es un incidente notificable y sancionable.

---

## 4. Qué riesgo corre el hotel hoy

Lo planteamos sin dramatizar, porque no hace falta:

| Riesgo | En qué consiste |
|---|---|
| **Sanciones económicas** | Las marcas de tarjeta multan al banco adquirente por incumplimiento, y el banco lo traslada al comercio por contrato |
| **Pérdida de la afiliación bancaria** | En incumplimientos graves el banco puede cancelar la afiliación. En la práctica significa **dejar de poder cobrar con tarjeta** |
| **Responsabilidad por fraude** | Si un huésped desconoce un cargo y el hotel manejó los datos fuera de norma, la posición del hotel en la disputa se debilita mucho |
| **Datos ya acumulados** | Este es el punto más delicado. Si el formulario lleva tiempo en línea, **los buzones de correo del hotel contienen hoy un histórico de tarjetas completas con su código de seguridad**. Ese archivo es un objetivo muy atractivo: basta con que una sola cuenta de correo se vea comprometida |
| **Reputación** | Un incidente de datos bancarios en un hotel se convierte en noticia y en reseñas, y el daño supera con mucho al costo de prevenirlo |

**Una observación adicional que quizá te interese más que todo lo anterior.**
Al revisar las opiniones públicas de tus huéspedes encontramos un comentario recurrente:
haber pagado más de lo esperado. Este formulario puede ser parte de la explicación. El monto
se teclea a mano en un campo libre, sin una cotización desglosada previa que el huésped haya
visto y aceptado. **Un monto capturado a mano es un monto que se puede escribir mal**, y no
queda constancia de qué aceptó el huésped exactamente.

---

## 5. Opciones

### Opción A — Despublicar y sustituir por enlace de pago *(nuestra recomendación)*

1. Retirar hoy mismo las dos páginas del sitio.
2. Contratar o activar una pasarela de pago: **Stripe, Mercado Pago, Clip, Conekta o PayPal**.
   Todas permiten generar un **enlace de cobro** que se envía por correo o WhatsApp.
3. El huésped abre el enlace y teclea su tarjeta **en la página del proveedor**. El dato
   nunca toca el sitio del hotel ni el correo.
4. Depurar el histórico: eliminar de los buzones los correos con datos de tarjeta, y sus
   respaldos.
5. Si el hotel necesita garantizar la reserva sin cobrar todavía, todas estas pasarelas
   ofrecen **preautorización**, que es exactamente la figura correcta para eso.

| | |
|---|---|
| **Costo** | Sin costo de instalación. Las pasarelas cobran comisión por transacción cobrada, del orden del 3 % |
| **Tiempo** | Retirar las páginas: minutos. Activar la pasarela: entre un día y una semana según el proveedor |
| **Efecto en la operación** | Mínimo. El manager envía un enlace en vez de pedir que llenen un formulario |
| **Riesgo residual** | Prácticamente nulo. El hotel deja de manejar datos de tarjeta |

### Opción B — Mantener el formulario aplicando mitigaciones parciales

Restringir accesos al buzón, activar verificación en dos pasos, borrar correos periódicamente.

**Es importante ser claro: esto reduce la probabilidad de una fuga, pero no vuelve conforme
la operación.** Guardar el código de seguridad seguiría estando prohibido, y el hotel
seguiría expuesto a sanción aunque nunca ocurra un incidente.

### Opción C — No hacer cambios

El hotel conserva el mecanismo actual y acepta el riesgo descrito en la sección 4.

---

## 6. Decisión del hotel

Este documento es informativo. **La decisión corresponde exclusivamente al hotel**, que es
quien tiene la relación con su banco, conoce su operación y asume sus riesgos. Nuestro papel
es asegurarnos de que la decisión se tome con la información completa.

Te pedimos indicar la opción elegida y devolvernos este documento firmado, o confirmarnos
por escrito por el medio que prefieras.

- [ ] **Opción A** — Despublicar y migrar a enlace de pago. *(Recomendada)*
- [ ] **Opción B** — Mantener con mitigaciones parciales.
- [ ] **Opción C** — Sin cambios. El hotel acepta el riesgo descrito.
- [ ] Solicito una llamada para revisarlo antes de decidir.

**Comentarios del hotel:**

<br><br><br>

| | |
|---|---|
| Nombre | |
| Cargo | |
| Fecha | |
| Firma | |

---

## 7. Alcance y límites de este aviso

Para que quede constancia clara de qué es y qué no es este documento:

- **Somos un equipo de desarrollo de software.** No somos auditores certificados de PCI-DSS
  (QSA) ni asesores legales. Este aviso describe un hallazgo técnico y cita la normativa
  aplicable; **no constituye una certificación de cumplimiento ni una opinión legal.**
- Para una evaluación formal de cumplimiento, quien corresponde es el **banco adquirente del
  hotel** o un QSA acreditado. Con gusto acompañamos esa conversación.
- **Este hallazgo es independiente del proyecto de renovación** y existe desde antes de
  nuestra contratación. No es un requisito que hayamos añadido al alcance.
- Con independencia de la opción que elijas, **el sitio nuevo no incluirá captura de datos
  de tarjeta**. Está resuelto por diseño mediante enlace de pago, que era ya nuestra
  decisión de arquitectura antes de este hallazgo.
- Quedamos a disposición para explicar cualquier punto, acompañarte en la conversación con
  tu banco o ayudarte a elegir pasarela.

---

*Documento elaborado a partir de la auditoría técnica del sitio azucarhotel.com realizada el
19 de agosto de 2026 sobre una copia archivada del sitio. La evidencia completa está
disponible y puede compartirse si la requieres o si tu banco la solicita.*
