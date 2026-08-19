const {Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow,
  TableCell, WidthType, ShadingType, BorderStyle, PageBreak, Footer, PageNumber,
  LevelFormat, convertInchesToTwip} = require('docx');
const fs = require('fs');

const TEAL='0F5257', SAND='C89B6B', INK='1C1C1C', GREY='6B6B6B', LIGHT='F2EDE6', BOX='F7F4F0';
const CW = 9360; // content width DXA (Letter 12240 - 2*1440)

const noBorder = {top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},
                  left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}};
const hair = c => ({style:BorderStyle.SINGLE, size:4, color:c||'D8D0C6'});
const cellBorders = {top:hair(),bottom:hair(),left:hair(),right:hair()};

const p = (text, o={}) => new Paragraph({
  alignment:o.align, spacing:{before:o.before??0, after:o.after??120, line:o.line??276},
  indent:o.indent, border:o.border,
  children:[new TextRun({text, bold:o.bold, italics:o.italics, size:o.size??21,
    color:o.color??INK, font:'Calibri', allCaps:o.caps})]
});

const rich = (runs, o={}) => new Paragraph({
  alignment:o.align, spacing:{before:o.before??0, after:o.after??120, line:276}, indent:o.indent,
  children: runs.map(r => new TextRun({text:r.t, bold:r.b, italics:r.i, size:r.s??21,
    color:r.c??INK, font:'Calibri'}))
});

const h1 = t => new Paragraph({heading:HeadingLevel.HEADING_1, spacing:{before:400,after:180},
  border:{bottom:{style:BorderStyle.SINGLE,size:8,color:SAND,space:6}},
  children:[new TextRun({text:t, bold:true, size:30, color:TEAL, font:'Calibri'})]});

const h2 = t => new Paragraph({heading:HeadingLevel.HEADING_2, spacing:{before:280,after:120},
  children:[new TextRun({text:t, bold:true, size:23, color:TEAL, font:'Calibri'})]});

const bullet = t => new Paragraph({numbering:{reference:'vinetas', level:0},
  spacing:{after:80,line:276},
  children:[new TextRun({text:t, size:21, color:INK, font:'Calibri'})]});

// Caja destacada
const box = (title, lines, fill) => new Table({
  width:{size:CW,type:WidthType.DXA}, columnWidths:[CW],
  borders:{top:hair(SAND),bottom:hair(SAND),left:{style:BorderStyle.SINGLE,size:18,color:SAND},right:hair(SAND)},
  rows:[new TableRow({children:[new TableCell({
    width:{size:CW,type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR, fill: fill||BOX},
    margins:{top:180,bottom:180,left:220,right:220},
    children:[ p(title,{bold:true,color:TEAL,size:21,after:80}),
      ...lines.map(l => p(l,{size:20,color:INK,after:60})) ]
  })]})]
});

// Tabla genérica
const table = (headers, rows, widths) => new Table({
  width:{size:CW,type:WidthType.DXA}, columnWidths:widths,
  rows:[
    new TableRow({tableHeader:true, children: headers.map((htxt,i)=> new TableCell({
      width:{size:widths[i],type:WidthType.DXA}, borders:cellBorders,
      shading:{type:ShadingType.CLEAR, fill:TEAL}, margins:{top:100,bottom:100,left:130,right:130},
      children:[p(htxt,{bold:true,color:'FFFFFF',size:19,after:0})]}))}),
    ...rows.map((r,ri)=> new TableRow({children: r.map((c,i)=> new TableCell({
      width:{size:widths[i],type:WidthType.DXA}, borders:cellBorders,
      shading:{type:ShadingType.CLEAR, fill: i===r.length-1 ? LIGHT : (ri%2?'FBFAF8':'FFFFFF')},
      margins:{top:100,bottom:100,left:130,right:130},
      children:[p(c,{size:19,after:0, color: c==='' ? GREY : INK})]}))}))
  ]});

// Pregunta con espacio de respuesta
const ask = (num, question, hint) => {
  const out = [ rich([{t:num+'  ', b:true, c:SAND, s:21},{t:question, b:true, s:21}], {after:60, before:160}) ];
  if (hint) out.push(p(hint, {italics:true, size:18, color:GREY, after:80}));
  out.push(new Table({width:{size:CW,type:WidthType.DXA}, columnWidths:[CW],
    borders:{top:hair(),bottom:hair(),left:hair(),right:hair()},
    rows:[new TableRow({children:[new TableCell({
      width:{size:CW,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR, fill:'FCFBF9'},
      margins:{top:140,bottom:140,left:160,right:160},
      children:[p('Respuesta:',{size:18,color:GREY,after:0})]})]})]}));
  out.push(p('',{size:10,after:0}));
  return out;
};

const doc = new Document({
  creator:'Consultoría · Proyecto sitio web Azúcar Hotel Tulum',
  title:'Brief de proyecto — Azúcar Hotel Tulum',
  numbering:{config:[{reference:'vinetas', levels:[{level:0, format:LevelFormat.BULLET,
    text:'•', alignment:AlignmentType.LEFT,
    style:{paragraph:{indent:{left:convertInchesToTwip(0.3), hanging:convertInchesToTwip(0.18)}}}}]}]},
  styles:{default:{document:{run:{font:'Calibri', size:21, color:INK}}}},
  sections:[{
    properties:{page:{size:{width:12240,height:15840}, margin:{top:1440,bottom:1440,left:1440,right:1440}}},
    footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,
      children:[new TextRun({text:'Brief de proyecto — Azúcar Hotel Tulum   ·   página ', size:17, color:GREY, font:'Calibri'}),
                new TextRun({children:[PageNumber.CURRENT], size:17, color:GREY, font:'Calibri'})]})]})},
    children:[

// ---------- PORTADA ----------
p('', {after:1400}),
p('PROYECTO DE RENOVACIÓN DEL SITIO WEB', {align:AlignmentType.CENTER, size:19, color:SAND, bold:true, caps:true, after:160}),
new Paragraph({alignment:AlignmentType.CENTER, spacing:{after:120},
  children:[new TextRun({text:'Azúcar Hotel Tulum', bold:true, size:52, color:TEAL, font:'Calibri'})]}),
p('Documento de información inicial', {align:AlignmentType.CENTER, size:24, color:GREY, after:400}),
new Paragraph({alignment:AlignmentType.CENTER, spacing:{after:400},
  border:{bottom:{style:BorderStyle.SINGLE, size:8, color:SAND, space:10}},
  children:[new TextRun({text:'', size:2})]}),
p('Agosto de 2026', {align:AlignmentType.CENTER, size:21, color:GREY, after:80}),
p('Documento de trabajo — versión 1.0', {align:AlignmentType.CENTER, size:19, color:GREY, italics:true}),

new Paragraph({children:[new PageBreak()]}),

// ---------- INTRO ----------
h1('Antes de empezar'),
p('Gracias por la confianza. Este documento es el punto de partida del proyecto: reúne la información que necesitamos para diseñar un sitio web que refleje fielmente lo que es Azúcar Hotel Tulum y que ayude a que más huéspedes reserven directamente contigo.', {after:160}),
p('No hace falta contestarlo de una sentada, ni de corrido. Puedes contestar por secciones, dejar en blanco lo que no tengas a la mano y avisarnos.', {after:200}),

h2('Cómo está organizado'),
...[['Secciones 1 a 6','Información que puedes ir llenando cuando te acomode. Es la parte más larga, pero la mayoría son datos que ya tienes.'],
    ['Sección 7','Accesos y datos legales. Aburrida, pero es la que evita sorpresas el día del lanzamiento.'],
    ['Sección 8','No se llena. Son los temas que conversaremos en videollamada.']].map(([a,b])=>
  rich([{t:a+' — ', b:true, c:TEAL},{t:b}],{after:100, indent:{left:convertInchesToTwip(0.2)}})),

p('', {after:120}),
box('Ya hicimos la tarea', [
 'Antes de escribirte revisamos tu sitio actual, tus fichas en Booking y TripAdvisor, y lo que dicen tus huéspedes.',
 'Por eso verás algunos campos ya llenos: son datos que encontramos publicados. Sólo necesitamos que los confirmes o los corrijas.',
 'Donde veas la palabra Confirmar, basta con un "sí" o con el dato correcto.']),

p('', {after:200}),
h2('Sobre las fotografías'),
p('Es la sección que más impacto tendrá en el resultado final. En un hotel frente al mar, la fotografía no acompaña al sitio: la fotografía es el sitio. Vale la pena dedicarle atención a la sección 6.', {after:100}),

new Paragraph({children:[new PageBreak()]}),

// ---------- 1 ----------
h1('1. Datos generales'),
p('Encontramos esta información publicada. Confírmala o corrígela.', {italics:true, color:GREY, size:19, after:160}),
table(['Dato','Lo que encontramos','Confirmar o corregir'],[
 ['Nombre comercial','Azucar Hotel Tulum',''],
 ['Dirección','Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Q. Roo',''],
 ['Año de apertura','Abril de 2008',''],
 ['Número de habitaciones','21',''],
 ['Tipos de alojamiento','8 tipos distintos',''],
 ['Teléfono principal','81 138 02176',''],
 ['WhatsApp de reservas','(no lo encontramos)',''],
 ['Correo de reservas','(no lo encontramos)',''],
 ['Idiomas del sitio','Español e inglés','']],
 [2100,3600,3660]),
p('', {after:160}),
box('Una observación sobre el teléfono', [
 'El número publicado usa lada 81, que corresponde a Monterrey. Si el número de contacto para huéspedes es otro, conviene corregirlo también en Google y en las OTAs: cuando los datos no coinciden entre plataformas, Google muestra el hotel más abajo en resultados locales.']),

p('', {after:200}),
h2('Presencia en internet'),
p('Marca con qué cuentas y, si es posible, comparte el enlace.', {italics:true, color:GREY, size:19, after:140}),
table(['Plataforma','¿Existe?','Enlace o comentario'],[
 ['Google (ficha del negocio)','',''],
 ['Instagram','',''],
 ['Facebook','',''],
 ['TripAdvisor','',''],
 ['Booking.com','',''],
 ['Otras OTAs (Expedia, Airbnb, Hoteles.com…)','','']],
 [3400,1600,4360]),

new Paragraph({children:[new PageBreak()]}),

// ---------- 2 ----------
h1('2. Alojamiento'),
p('Esta es la información más importante del documento. Todo el sitio se construye alrededor de ella: el catálogo, las fichas de cada habitación y el formulario de reserva salen de aquí.', {after:120}),
p('Llena una fila por cada tipo de alojamiento. Si son ocho tipos, son ocho filas. Si necesitas más espacio, puedes mandarnos esta tabla aparte en Excel.', {after:180}),
table(['Nombre del tipo','Cuántas hay','Capacidad máx.','Camas','Vista'],[
 ['','','','',''],['','','','',''],['','','','',''],['','','','',''],
 ['','','','',''],['','','','',''],['','','','',''],['','','','','']],
 [2600,1300,1400,2060,2000]),
p('', {after:200}),

h2('Para cada tipo, cuéntanos también'),
bullet('Qué lo hace distinto del tipo inmediatamente inferior en precio. Es lo que ayuda al huésped a decidir entre uno y otro.'),
bullet('Amenidades propias: terraza, hamaca, cocineta, aire acondicionado, caja fuerte, alberca privada.'),
bullet('Superficie aproximada en metros cuadrados, si la tienes.'),
p('', {after:160}),

box('Una recomendación, con toda franqueza', [
 'Ocho tipos distintos para 21 habitaciones es mucha variedad. Sabemos por investigación de comportamiento que cuando se ofrecen demasiadas opciones parecidas, el visitante no elige mejor: pospone la decisión y muchas veces no reserva.',
 'Una vez que veamos la lista completa, es posible que te propongamos agrupar los tipos en cuatro o cinco categorías comerciales. No implica cambiar nada en tu operación interna: sólo cómo se presentan en el sitio.',
 'Es una sugerencia y la decisión es tuya. Preferimos planteártela a callarla.']),

new Paragraph({children:[new PageBreak()]}),

// ---------- 3 ----------
h1('3. Tarifas, impuestos y lo que incluye'),
box('Por qué insistimos tanto en esta sección', [
 'Al revisar las opiniones de tus huéspedes encontramos un comentario que se repite: haber pagado más de lo que esperaban según el precio publicado.',
 'Casi siempre esto no es un error de cobro, sino un precio mostrado sin impuestos que aparecen al final. La diferencia sorprende al huésped y termina en una reseña negativa.',
 'Con la información de esta sección podemos mostrar desde el inicio el total real que se va a pagar, desglosado. Es una ventaja concreta frente a Booking y una de las mejoras de mayor impacto de todo el proyecto.'], 'FDF6EE'),
p('', {after:200}),

h2('3.1  Temporadas'),
p('¿Cómo divides el año y qué fechas abarca cada temporada?', {after:140}),
table(['Temporada','Desde','Hasta'],[
 ['','',''],['','',''],['','',''],['','','']],[3760,2800,2800]),
p('', {after:200}),

h2('3.2  Tarifas por tipo y temporada'),
p('Puedes mandarnos tu tarifario actual como archivo aparte si lo tienes; no hace falta transcribirlo aquí.', {italics:true, color:GREY, size:19, after:200}),

h2('3.3  Impuestos y cargos'),
p('Indica cuáles aplican y, muy importante, si el precio que publicas hoy ya los incluye o se suman al final.', {after:140}),
table(['Concepto','¿Aplica?','¿Ya incluido en el precio publicado?'],[
 ['IVA (16 %)','',''],
 ['Impuesto Sobre Hospedaje de Quintana Roo','',''],
 ['Derecho de saneamiento ambiental (municipio de Tulum)','',''],
 ['Cargo por servicio','',''],
 ['Otro (especificar)','','']],
 [4200,1500,3660]),
p('', {after:200}),

h2('3.4  Qué incluye la tarifa'),
p('Por ejemplo: desayuno, camas de playa, toallas, wifi, estacionamiento, uso de alberca, kayaks, bicicletas.', {after:140}),
...ask('3.4', '¿Qué incluye la tarifa?', null),
...ask('3.5', '¿Qué se cobra aparte y suele sorprender al huésped?', 'Este dato es oro: es exactamente lo que queremos aclarar antes de que reserve, no después.'),

new Paragraph({children:[new PageBreak()]}),

// ---------- 4 ----------
h1('4. Políticas'),
p('Necesitamos las políticas tal como las aplicas hoy. Si las tienes redactadas en algún documento, mándanoslas y nosotros las adaptamos.', {after:180}),
table(['Política','Cómo funciona hoy'],[
 ['Check-in y check-out (horarios)',''],
 ['Cancelación y reembolso',''],
 ['Anticipo o garantía para reservar',''],
 ['Niños (edades, costo, cunas)',''],
 ['Mascotas',''],
 ['No-show',''],
 ['Edad mínima para hospedarse',''],
 ['Fumar',''],
 ['Formas de pago aceptadas','']],
 [3400,5960]),

p('', {after:240}),
h1('5. Restaurante, bar y otros servicios'),
...ask('5.1', '¿El restaurante tiene nombre propio? ¿Cuál y en qué horario abre?', null),
...ask('5.2', '¿Está abierto a visitantes que no se hospedan en el hotel?', null),
...ask('5.3', '¿Ofrecen spa, masajes, tours, transportación desde el aeropuerto, day pass o beach club?', 'Indícanos también cuáles te gustaría poder vender desde el sitio.'),
...ask('5.4', '¿Reciben bodas o eventos?', 'Suele ser el servicio de mayor valor en hoteles como el tuyo, y casi siempre el peor representado en la web. Si lo hacen, queremos darle su espacio.'),

new Paragraph({children:[new PageBreak()]}),

// ---------- 6 ----------
h1('6. Imagen, marca y fotografía'),
h2('6.1  Identidad'),
table(['Elemento','¿Lo tienes?','Comentario'],[
 ['Logotipo en archivo editable (.ai, .eps, .svg)','',''],
 ['Manual de marca o guía de colores','',''],
 ['Tipografías de la marca','','']],
 [4200,1500,3660]),
p('', {after:200}),

h2('6.2  Fotografía y video'),
p('Esta es, con diferencia, la sección que más influye en cómo se verá el sitio terminado.', {after:160}),
...ask('6.2.1', '¿Conservas las fotografías originales en alta resolución?', 'No las del sitio actual, que están comprimidas: los archivos originales del fotógrafo.'),
...ask('6.2.2', '¿De cuándo es la última sesión fotográfica profesional?', null),
...ask('6.2.3', '¿El contrato con el fotógrafo te cede los derechos de uso de las imágenes?', 'Lo preguntamos ahora y no después: publicar imágenes sin los derechos cedidos puede traerte una reclamación cuando el sitio ya está en línea.'),
...ask('6.2.4', '¿Tienes video, tomas con dron o recorrido 360°?', null),
p('', {after:120}),
box('Nuestra recomendación', [
 'Si la última sesión tiene más de tres años, vale la pena considerar una nueva antes del lanzamiento. Un diseño excelente con fotografía antigua se percibe como un hotel descuidado, y es justo lo contrario de lo que queremos comunicar.',
 'Podemos indicarte qué tomas hacen falta y en qué orden de prioridad.']),

p('', {after:200}),
h2('6.3  Tono'),
p('En TripAdvisor, un huésped describió al hotel como "the anti-resort".', {after:100}),
...ask('6.3.1', '¿Te reconoces en esa descripción?', 'Si la respuesta es sí, ahí tenemos la personalidad del sitio completo. Si no, cuéntanos cómo te describirías tú.'),

new Paragraph({children:[new PageBreak()]}),

// ---------- 7 ----------
h1('7. Accesos y datos legales'),
p('La sección menos entretenida y la que más problemas evita. Un proyecto puede quedar detenido semanas por no tener a la mano un acceso que nadie sabía dónde estaba.', {after:180}),
box('No nos mandes contraseñas por este documento', [
 'Ni por correo ni por WhatsApp. Aquí sólo indícanos si tienes el acceso o no.',
 'Cuando llegue el momento de usarlos, te diremos cómo compartirlos de forma segura.'], 'FDF6EE'),
p('', {after:200}),

h2('7.1  Dominio y hosting'),
table(['Pregunta','Respuesta'],[
 ['¿A nombre de quién está registrado azucarhotel.com?',''],
 ['¿En qué empresa está registrado el dominio?',''],
 ['¿Tienes tú los accesos a esa cuenta?',''],
 ['¿Con qué empresa está contratado el hosting?',''],
 ['¿Tienes los accesos del hosting?','']],
 [5000,4360]),
p('', {after:160}),
box('Por qué preguntamos esto primero', [
 'Es más común de lo que parece que el dominio esté registrado a nombre de una agencia anterior o de alguien que ya no trabaja con el hotel.',
 'Si eso ocurre, se resuelve, pero toma tiempo. Descubrirlo ahora es un trámite; descubrirlo la semana del lanzamiento es un problema.']),
p('', {after:200}),

h2('7.2  Herramientas'),
table(['Herramienta','¿Tienes acceso de administrador?'],[
 ['Google Business Profile (la ficha del negocio)',''],
 ['Google Analytics',''],
 ['Google Search Console',''],
 ['Meta Business Suite (Facebook / Instagram)',''],
 ['Cuenta de extranet de Booking.com','']],
 [5400,3960]),
p('', {after:200}),

h2('7.3  Datos fiscales'),
p('Los necesitamos para redactar el aviso de privacidad y los términos del sitio, que son obligatorios por ley cuando se capturan datos de personas.', {after:140}),
table(['Dato','Respuesta'],[
 ['Razón social',''],
 ['RFC',''],
 ['Domicilio fiscal',''],
 ['¿Tienen aviso de privacidad publicado hoy?','']],
 [3400,5960]),
p('', {after:200}),

h2('7.4  Un hallazgo que queremos comentarte'),
p('Durante la revisión encontramos varios sitios de terceros que venden tu hotel usando tu nombre:', {after:120}),
bullet('azucar.therivieramayahotels.com'),
bullet('azucar.tulum-hotels.net'),
bullet('azucar.tulumtownhotels.com'),
bullet('azucar.hotels-quintana-roo.com'),
p('', {after:80}),
...ask('7.4.1', '¿Los conoces? ¿Autorizaste que usaran el nombre del hotel?', 'Si no los autorizaste, están capturando búsquedas de tu propia marca y cobrando comisión sobre reservas que podrían haber sido directas. Hay acciones concretas que podemos tomar.'),
p('', {after:80}),
...ask('7.4.2', '¿Tienes acceso a tus fichas de TripAdvisor?', 'Detectamos dos fichas que parecen ser del mismo hotel. Si es así, tus reseñas y tu calificación están divididas entre las dos. Consolidarlas no cuesta nada y mejora de inmediato cómo te ve un viajero.'),

new Paragraph({children:[new PageBreak()]}),

// ---------- 8 ----------
h1('8. Temas para nuestra videollamada'),
p('Esta sección no se llena. Son los temas que conversaremos en una llamada de 45 a 60 minutos. Los compartimos por adelantado para que puedas pensarlos con calma.', {after:200}),

h2('Sobre el negocio'),
bullet('Si dentro de un año el sitio nuevo hubiera funcionado muy bien, ¿qué habría cambiado en tu día a día?'),
bullet('¿Por dónde sientes que te entran hoy la mayoría de las reservas?'),
bullet('¿Qué meses se te llenan solos y en cuáles batallas?'),
bullet('¿Cómo es el huésped que te gustaría llenar el hotel? ¿Y cuál preferirías no recibir?'),
bullet('¿Qué tres hoteles de la zona consideras tu competencia directa?'),
bullet('¿Qué del sitio actual te gusta y no quieres perder?'),
p('', {after:160}),

h2('Sobre las reservas desde el sitio'),
p('Nos comentaste que quieres que el huésped pueda reservar desde el sitio y que, por ahora, la gestión seguirá siendo manual. Trabajaremos con eso, y en la llamada te explicaremos cómo lo vamos a resolver sin arriesgar que una habitación se venda dos veces.', {after:140}),
bullet('¿En cuánto tiempo puedes responder una solicitud de reserva, siempre y sin excepción?'),
bullet('¿Quién responde, en qué horario, y qué pasa los fines de semana?'),
bullet('¿Con qué medio de cobro en línea cuentas o podrías contratar?'),
bullet('¿Qué correo y qué WhatsApp usamos para que te lleguen las solicitudes?'),
p('', {after:160}),

h2('Sobre el proyecto'),
bullet('¿Quién toma la decisión final sobre el sitio? ¿Hay alguien más que deba aprobar?'),
bullet('¿Hay alguna fecha importante que debamos considerar?'),
bullet('¿En qué temporada preferirías que no hagamos el cambio del sitio?'),

p('', {after:400}),
new Paragraph({alignment:AlignmentType.CENTER, spacing:{before:200, after:200},
  border:{bottom:{style:BorderStyle.SINGLE, size:8, color:SAND, space:10}},
  children:[new TextRun({text:'', size:2})]}),
p('Gracias por el tiempo que le dediques a este documento.', {align:AlignmentType.CENTER, bold:true, color:TEAL, size:23, after:100}),
p('Cada respuesta aquí es una decisión que no tendremos que adivinar después.', {align:AlignmentType.CENTER, italics:true, color:GREY, size:20, after:200}),
p('Cualquier duda mientras lo llenas, escríbenos. No hace falta que esté completo para empezar a conversar.', {align:AlignmentType.CENTER, size:20, color:GREY}),
]}]});

Packer.toBuffer(doc).then(b => {fs.writeFileSync('brief-azucar-hotel-tulum.docx', b); console.log('OK', b.length, 'bytes');});
