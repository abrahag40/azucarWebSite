# Estudio de mercado — pasarela de pagos

> **Para qué existe.** Responde a la mitad de **B4** («¿qué pasarela?»), que bloquea el
> sprint 3 completo. No es una decisión tomada: es un **straw-man** —una propuesta
> deliberadamente concreta y refutable— para que el cliente decida sobre algo escrito en
> vez de sobre una pregunta abierta.
>
> **Fecha de los precios: 2026-09-14.** Las tarifas de pasarela cambian sin aviso. Si esto
> se lee dentro de seis meses, **re-verificar antes de citar una sola cifra**.
>
> 🔴 **Esto no toca la regla 4.** En las cinco opciones el huésped paga en una página
> alojada por la pasarela. **Ni una cifra de tarjeta pasa por nuestro sitio ni por el correo
> del hotel** — que es exactamente el incumplimiento que le señalamos al cliente en el
> sprint 0. Nos deja en el alcance PCI-DSS más pequeño que existe (SAQ-A).

---

## 1. El encargo, y por qué la respuesta obvia es la equivocada

La instrucción fue «da gran prioridad al costo de comisión». La cumplo, y por eso el
resultado no es el que sale de ordenar la tabla de tarifas.

**Priorizar bien el costo significa mirar el ingreso neto, no la tarifa.** Una pasarela que
cobra 3.96 % pero rechaza una de cada doce tarjetas extranjeras es más cara que una que cobra
4.78 % y las acepta: en la primera no pierdes el 3.96 %, pierdes el **100 %** de la reserva
rechazada. Y este hotel está en Tulum: su demanda es extranjera.

> **El antipatrón evitado** tiene nombre en la industria: *rate shopping*. Elegir adquirente
> por la tarifa publicada e ignorar la **tasa de autorización** (*authorization rate*) es el
> error más caro y más común del comercio electrónico transfronterizo. La tarifa está en una
> página web; la tasa de autorización no la publica nadie, así que la gente compara lo que
> puede ver en vez de lo que decide el resultado.

Abajo doy **las dos ordenaciones** —por tarifa y por ingreso neto— y el punto exacto donde
se cruzan, para que la decisión sea del cliente y no mía.

---

## 2. Qué tiene que hacer la pasarela en ESTE hotel

Esto no es una tienda en línea. Es un hotel sin PMS, sin channel manager, donde un manager
confirma a mano ([ADR-0003](../decisiones/ADR-0003-arquitectura-de-reserva-sin-pms.md)). El
cobro llega **después** de que el hotel confirme, no durante la reserva. Consecuencias:

| Requisito | Por qué manda aquí |
|---|---|
| **Enlace de pago sin integración** | El manager genera el cobro **desde el teléfono**, al responder la solicitud. No hay carrito, no hay checkout, no hay nada que programar |
| **Aceptación de tarjeta extranjera** | Es el criterio que más dinero mueve, y no lo publica nadie |
| **Ticket alto** (estancias, no productos) | La cuota fija ($3, $4) es **ruido**: en una reserva de $18 000 pesa 0.02 %. **Decide el porcentaje, casi solo** |
| **Cobro en MXN** | `precios.json` ya fija `moneda: "MXN"`. Cobrar en USD añade 2–3.5 % de conversión que hoy no pagamos |
| **Contracargos de hotelería** | El giro 7011 es de los que más contracargos reciben: *no-show*, «no reconozco el cargo», cancelaciones. Hace falta política visible al pagar y buen expediente de disputa |
| **Cero alcance PCI** | Página de pago alojada por la pasarela. Las cinco lo cumplen |
| **Soporte para quien no tiene informático** | El hotel no tiene a nadie de sistemas. Un panel confuso se paga en horas del manager |

**Lo que NO hace falta, y conviene decirlo:** cobro recurrente, suscripciones, marketplace,
split de pagos, terminal virtual con captura manual de tarjeta —eso último está prohibido por
la regla 4—, y **antifraude propio**: las cinco lo traen.

---

## 3. Los números, con su procedencia

🔴 **Todas las tarifas de México se publican SIN IVA y el IVA se suma.** Comparar una tarifa
con IVA contra otra sin IVA es un error de 16 % — y es fácil de cometer porque cada sitio lo
menciona en un pie distinto. Aquí **todo lleva IVA incluido** en la columna de coste efectivo.

### 3.1 Tarifas publicadas

| Pasarela | Tarjeta nacional | Tarjeta internacional | Fija | Conversión de divisa | Fuente |
|---|---|---|---|---|---|
| **Openpay (BBVA)** | 2.99 % | **3.70 %** | — | n/d | ⚠️ secundaria ×2 |
| **Mercado Pago** | 2.95 % / 3.19 % / 3.49 % · *(30 d / 7 d / al instante)* | **sin recargo publicado** | $4.00 | n/d | ✅ oficial |
| **Conekta** | 3.40 % | sin recargo publicado | $3.00 | n/d | ✅ oficial |
| **Stripe** | 3.60 % | **+0.50 % → 4.10 %** | $3.00 | **+2 %** | ✅ oficial |
| **PayPal** | 3.95 % *(baja a 3.65 % desde $50 000/mes y a 2.95 % desde $1 M/mes)* | **+0.50 % → 4.45 %** | $4.00 | **+3.50 %** | ✅ oficial |

**Openpay también publica, por la vía de BBVA, un «2.25 % de descuento» para Link de Pago y
2.55 % + $1.90 (Visa/Mastercard) en modo pasarela.** No los uso en la comparativa porque no
pude confirmar si esas cifras conviven con la tabla de 2.99/3.5/3.7 o la sustituyen. **Es una
pregunta al ejecutivo de BBVA, y si la respuesta es la buena, Openpay gana por más margen.**

### 3.2 Coste efectivo — reserva de **$18 000 MXN**, tarjeta extranjera, cobrada en pesos

*(4 noches. 🔴 **Es un supuesto**: el hotel no ha dado tarifas —C2 y C3 sin responder—. La
ordenación no cambia con el ticket; las diferencias en pesos sí.)*

| Pasarela | Cálculo | Comisión + IVA | **% efectivo** |
|---|---|---|---|
| **Mercado Pago · 30 días** | (18 000 × 2.95 % + 4) × 1.16 | $620.60 | **3.45 %** |
| **Mercado Pago · 7 días** | (18 000 × 3.19 % + 4) × 1.16 | $670.71 | **3.73 %** |
| **Conekta** | (18 000 × 3.40 % + 3) × 1.16 | $713.40 | **3.96 %** |
| **Mercado Pago · al instante** | (18 000 × 3.49 % + 4) × 1.16 | $733.35 | **4.07 %** |
| **Openpay (BBVA)** | (18 000 × 3.70 %) × 1.16 | $772.56 | **4.29 %** |
| **Stripe** | (18 000 × 4.10 % + 3) × 1.16 | $859.56 | **4.78 %** |
| **PayPal** | (18 000 × 4.45 % + 4) × 1.16 | $933.80 | **5.19 %** |

**Por tarifa pura el orden es: Mercado Pago → Conekta → Openpay → Stripe → PayPal.**
Entre la primera y la cuarta hay **1.33 puntos**, que son **$239 por reserva** y **$13 300 por
cada millón de pesos** que pase por la pasarela.

### 3.3 Y aquí está el cruce

Si en vez de la tarifa se compara el **ingreso neto**, Stripe sólo tiene que aceptar un poco
más para ganar. La cuenta es de una línea:

```
neto por cada 100 intentados  =  aceptación × (1 − comisión)

Conekta:  a × (1 − 0.0396)        Stripe:  a × (1 − 0.0478)
punto de empate:  0.96037 ÷ 0.95225  =  1.0085
```

🔴 **Stripe empata con Conekta aceptando un 0.85 % más de tarjetas extranjeras.** Si Conekta
autoriza el 90 % de ellas, a Stripe le basta con el **90.77 %** —**0.77 puntos** de diferencia—
para que su tarifa más cara salga gratis. A partir de ahí, gana.

**Nadie publica esa cifra, así que no puedo afirmar que Stripe la supere.** Lo que sí hay es
evidencia asimétrica: Stripe documenta y vende herramientas dedicadas a subirla —tokens de red,
reintentos adaptativos, 3DS selectivo— y las otras cuatro no publican equivalentes. **Conekta,
en su propia documentación de ayuda, dice lo contrario de sí misma:** *«hay menor aceptación
de este tipo de pagos»* hablando de tarjetas internacionales. Para un hotel de Tulum eso no es
un matiz, es una descalificación.

---

## 4. El top 3, y por qué esas tres

### 🥇 1 · Stripe — la que menos reservas pierde

**Coste: 4.78 % efectivo (4.20 % con tarjeta mexicana).** La más cara de la tabla, y aun así
la recomendada — por el cruce del §3.3.

| A favor | En contra |
|---|---|
| **Aceptación internacional**: es su mercado natural; procesa para medio mundo y la optimiza como producto | **La tarifa más alta** de las tres, y la única con **recargo explícito por tarjeta extranjera** (+0.5 %) |
| **Payment Links sin costo adicional** y sin escribir código: se crean desde el panel o la app | **+2 % si hay conversión de divisa** — evitable cobrando en MXN (§5.1), pero es una trampa fácil de pisar |
| **Multidivisa real**: el día que el hotel quiera publicar en USD, ya está | Panel en inglés por defecto y pensado para desarrolladores: al manager le sobra el 90 % |
| **Radar antifraude incluido**, y el expediente de disputa es el mejor documentado del grupo | **Disputa: $150 MXN.** *Smart Disputes* es opcional y cobra 30 % de lo disputado si gana — **no activarlo sin leerlo** |
| **Ya está en el proyecto por otro lado**: el endpoint de solicitud es una Cloudflare Function; enganchar Stripe ahí es lo más barato que podemos hacer | MSI **desde 5 % a 3 meses**, caro (ver §5.3) |

**Por qué es la número 1:** porque el criterio «costo» bien aplicado es el ingreso neto, y el
margen que tiene que ganar en aceptación para justificar su tarifa es **menos de un punto**.
En un hotel donde el 100 % de las reservas directas se cobra a distancia y con tarjeta emitida
fuera de México, esa es la variable que decide.

---

### 🥈 2 · Mercado Pago — la más barata de verdad, y la que no castiga al extranjero

**Coste: 3.45 % a 30 días · 3.73 % a 7 días · 4.07 % al instante.**

| A favor | En contra |
|---|---|
| **La tarifa efectiva más baja del estudio**, y **sin recargo publicado por tarjeta internacional** — cobra lo mismo venga la tarjeta de donde venga | **La aceptación internacional no está publicada** y su ecosistema está optimizado para México y LatAm, no para un turista de Chicago |
| **Link de pago en tres pasos, desde el celular.** Es, literalmente, el producto que este hotel necesita: monto, personalizar, compartir por WhatsApp | La marca lee «marketplace», no «hotel boutique». El huésped ve *Mercado Pago* en la pantalla de cobro |
| **El plazo de liberación es una palanca de precio**: esperar 30 días cuesta 0.54 puntos menos que cobrar al instante | **MSI caros y escalonados**: 4.69 % a 3 meses, 7.69 % a 6, 12.89 % a 12 |
| Cuenta sin renta, sin mínimos, alta en minutos y sin banco de por medio | Soporte de masas: bueno para lo común, lento para lo raro |
| Reconocimiento absoluto entre huéspedes mexicanos | Menos herramientas de disputa que Stripe |

**Por qué es la número 2:** porque si el cliente decide que el costo manda **sobre todo lo
demás**, esta es la respuesta correcta y hay que decirlo sin adornos. Ahorra **1.33 puntos**
contra Stripe —$239 por reserva de $18 000— y esa ventaja sólo se evapora si su tasa de
autorización con tarjeta extranjera es más de un punto peor. Que puede serlo. **No lo sabemos.**

---

### 🥉 3 · Openpay (BBVA) — la apuesta si el hotel ya es de BBVA

**Coste: 4.29 % internacional · 3.47 % nacional.** Y posiblemente bastante menos: ver la nota
del «2.25 %» en §3.1.

| A favor | En contra |
|---|---|
| **La tarifa nacional más baja** (2.99 %) y **sin cuota fija** | **La tarifa internacional (3.70 %) es de fuente secundaria.** Dos sitios coinciden, pero **no pude verificarla en la página oficial**: su sitio de comisiones devolvió 404, 503 y una página vacía |
| **Depósito al día hábil siguiente** a una cuenta BBVA — el flujo de caja más rápido del grupo | **Exige cuenta empresarial BBVA** para la versión buena. Si el hotel opera con otro banco, la ventaja desaparece y queda la fricción |
| Respaldo de un banco grande: para un hotel familiar eso pesa más que una API elegante | **Reputación de soporte mala** (1.8/5 en reseñas públicas), y el hotel no tiene informático que absorba eso |
| Link de pago por correo, SMS, WhatsApp o redes, sin costo por link | Límites de transacción «caso por caso», no publicados — opaco al dar de alta |
| Efectivo en 32 000 puntos y transferencia, incluidos | Documentación y herramientas por detrás de Stripe |

**Por qué es la número 3:** porque es la única que puede ganarle a Mercado Pago en precio **y**
a Stripe en velocidad de depósito, pero todo depende de un dato que no tenemos: **con qué banco
opera el hotel.** Si es BBVA, sube al primer puesto de la conversación. Si no, no vale la pena.

---

### Las dos descartadas, y el motivo

| | Coste | Por qué no entra |
|---|---|---|
| **Conekta** | **3.96 %** | Precio intermedio y buena tecnología mexicana, pero **su propia ayuda admite que las tarjetas internacionales tienen «menor aceptación»**. Es la variable que más decide aquí y la descarta sola. Sería la respuesta correcta para un hotel de clientela mexicana — **no para éste** |
| **PayPal** | **5.19 %** | La más cara, y con **doble cobro** si entra divisa: 3.95 % + 0.5 % transfronterizo **+ 3.50 % de conversión**. Sus descuentos por volumen (3.65 % desde $50 000/mes) no alcanzan a las otras. **Sí merece existir como segundo botón**, porque hay huéspedes estadounidenses que sólo pagan por PayPal — pero como excepción cara, nunca como pasarela principal |
| **Clip** | — | Fuera de categoría: es terminal física primero. **Sí es el candidato natural para el cobro en recepción** (§5.2), que es otra decisión |

---

## 5. Cuatro palancas que bajan la comisión sin negociar con nadie

Esto vale más dinero que elegir bien la pasarela, y no cuesta nada implementarlo.

### 5.1 · Cobrar en pesos, siempre — ahorro: **2 a 3.5 puntos**

Si el hotel publica y cobra en MXN, **la conversión la hace el banco del huésped y al hotel le
cuesta cero**. Si publica en USD y liquida en pesos, paga 2 % (Stripe) o 3.50 % (PayPal)
encima de todo lo demás. En la reserva de ejemplo son **$418 tirados** por reserva con Stripe.

`precios.json` ya fija `moneda: "MXN"`. **Esta palanca ya está tomada — el riesgo es que
alguien la deshaga** el día que pida «pon los precios en dólares, que los gringos entienden
mejor». Queda escrito aquí para que ese día haya un número que enseñar.

### 5.2 · Cobrar anticipo en línea y el resto en recepción — ahorro: **~1.3 puntos, y casi todo el riesgo de contracargo**

Un anticipo del 30 % por enlace y el 70 % con terminal física al llegar:

- la terminal física cobra **menos** que la pasarela en línea, y
- el 70 % del dinero pasa a ser **card-present**: el huésped está delante, con su tarjeta y su
  NIP. Los contracargos de «no reconozco el cargo» **prácticamente desaparecen** en ese tramo.

🔴 Requiere saber si el hotel ya tiene terminal y a qué tasa. **Es la pregunta nueva del §7.**

### 5.3 · No ofrecer MSI por defecto — ahorro: **hasta 11 puntos en las ventas donde se usa**

Los meses sin intereses **son un producto de tarjetas emitidas en México**. Un huésped europeo
o estadounidense no puede usarlos. Ofrecerlos a todos es pagar visibilidad por una función que
casi nadie del público objetivo puede tomar — y cuando alguien la toma, cuesta:

| Plazo | Mercado Pago | Stripe |
|---|---|---|
| 3 meses | 4.69 % | desde 5 % |
| 6 meses | 7.69 % | — |
| 12 meses | **12.89 %** | — |

Una reserva a 12 MSI con Mercado Pago se lleva **cerca del 15 % con IVA**. **Regla propuesta:
MSI hasta 3 meses o ninguno**, y sólo si el cliente lo pide como argumento comercial para el
mercado nacional.

### 5.4 · Renegociar con historial, no antes

Las cinco tienen tarifa a medida por volumen —PayPal la publica: **2.95 % desde $1 M/mes**; las
demás la dan por trato—. **Hoy no hay con qué negociar**: el hotel no tiene ni línea base de
reserva directa (ésa es la razón por la que instrumentar analítica fue entregable del sprint 1).
**A los seis meses de operación sí la habrá**, y esa conversación vale uno o dos décimos.

---

## 6. Qué NO pude verificar — dicho en voz alta

| Dato | Estado |
|---|---|
| **Tasa de autorización de tarjeta extranjera de cada pasarela** | **Nadie la publica.** Es la variable que decide el ranking y es la única que no tengo. Todo el §3.3 es un cálculo de sensibilidad, **no una medición** |
| **Tarifa internacional de Openpay (3.70 %)** | Dos fuentes secundarias coinciden. **Su sitio oficial de comisiones no respondió** — 404, 503 y una página vacía. Hay que confirmarla con un ejecutivo antes de decidir |
| **Si el «2.25 %» de Link de Pago de BBVA convive con la tabla 2.99/3.5/3.7 o la sustituye** | Sin confirmar. Si la sustituye, **Openpay es la más barata del estudio por bastante** |
| **Ticket medio real del hotel** | Supuesto de $18 000. **C2 y C3 siguen sin responder** y `precios.json` está entero en `null` |
| **Con qué banco opera el hotel y si ya tiene terminal** | **Nunca se ha preguntado.** Ver §7 |
| **Tasa de su terminal física, si la tiene** | Igual |

---

## 7. Lo que hay que preguntarle al cliente

**B4 se queda corta.** Pedía «pasarela» como si fuera una sola pregunta, y son cuatro. Propongo
sustituirla por esto en [`mensaje-cliente-desbloqueo.md`](mensaje-cliente-desbloqueo.md):

| # | Pregunta | Qué desbloquea |
|---|---|---|
| **B4.a** | ¿Con qué banco opera el hotel su cuenta empresarial? | Decide si Openpay entra o sale. Si es BBVA, cambia el ranking |
| **B4.b** | ¿Tienen ya terminal física en recepción? ¿A qué tasa cobra? | Habilita la palanca del anticipo (§5.2), que vale más que la elección de pasarela |
| **B4.c** | ¿Quieren cobrar **anticipo** o **el total** al reservar? ¿Qué porcentaje? | Define el flujo, el importe del enlace y la política de cancelación que se enseña al pagar |
| **B4.d** | ¿Ofrecen meses sin intereses? ¿A cuántos plazos? | §5.3. Un «sí» sin límite de plazo cuesta 15 % en esas ventas |

Y una que no es de pasarela pero viaja con ella: **¿en qué momento cancela sin costo el
huésped?** El texto que se enseña **en la pantalla de pago** es la primera defensa contra un
contracargo, y hoy `/politicas/` dice lo que decía el sitio viejo.

---

## 8. Recomendación

**Stripe**, y la razón es de costo: es la que más ingreso neto deja si acepta **menos de un
punto** más de tarjetas extranjeras que la alternativa barata, y es la única de las cinco que
trata esa aceptación como un producto.

**Con una condición honesta:** si el cliente prefiere la certeza de una tarifa 1.33 puntos más
baja frente a una ventaja que no puedo medir, **Mercado Pago es una decisión defendible y no
voy a discutirla**. Es más barata, no castiga a la tarjeta extranjera, y su link de pago es
exactamente la herramienta que un manager sin PMS necesita.

**Y antes que cualquiera de las dos:** las palancas del §5. Cobrar en pesos y partir el cobro
en anticipo + recepción ahorra **más** que la diferencia entre la mejor y la peor pasarela de
esta tabla, y no depende de con quién se firme.

---

## Fuentes

Consultadas el **2026-09-14**.

- [Stripe — Tarifas y comisiones (México)](https://stripe.com/mx/pricing) · oficial
- [Mercado Pago — Link de pago](https://www.mercadopago.com.mx/herramientas-para-vender/link-de-pago) · oficial
- [Conekta — Planes y calculadora de comisiones](https://www.conekta.com/pricing) · oficial
- [Conekta — ¿Aceptan tarjetas internacionales?](https://help.conekta.com/hc/es-419/articles/360018086674--Aceptan-tarjetas-internacionales) · oficial
- [PayPal — Comisiones para empresas (México)](https://www.paypal.com/mx/business/paypal-business-fees) · oficial
- [BBVA — Link de Pago Openpay](https://www.bbva.mx/empresas/productos/medios-de-cobro/pago-electronico-Openpay.html) · oficial
- [LaGuiaEmprendedor — Openpay: comisiones, métodos y opiniones](https://laguiaemprendedor.com/pasarelas-pagos/mx/openpay) · ⚠️ secundaria
- [Atempora — Comisiones Mercado Pago México 2026](https://atempora.studio/blog/comisiones-mercado-pago-2026) · ⚠️ secundaria
- [Tiendanube — Pasarelas de pago en México 2026](https://www.tiendanube.com/blog/pasarelas-de-pago-mexico/) · ⚠️ secundaria
