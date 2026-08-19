# Generadores de documentos

## `brief.js` — brief pre-llenado para el cliente

Genera `../brief-azucar-hotel-tulum.docx`.

```bash
npm install docx
node brief.js
```

**Por qué el documento se genera con un script y no se maquetó a mano.** El brief va a
cambiar: tras la entrevista habrá preguntas que sobran y otras nuevas. Con un script, la
siguiente versión es un `git diff` legible y regenerar toma un segundo. Maquetado a mano,
cada versión es un archivo binario opaco del que nadie sabe qué cambió.

*Técnica: documento como código (docs-as-code). El costo extra de la primera versión se
recupera en la segunda.*

> El `.docx` se versiona porque es el entregable que se envía al cliente y queremos su
> historial. El script se versiona porque es la fuente de verdad.
