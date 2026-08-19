# Scripts

## `ingest-mirror.sh` — traer las capturas HTTrack al repositorio

```bash
./scripts/ingest-mirror.sh /Users/abraham/Documents/Projects/azucarWeb
```

Procesa las tres capturas (`actualWebsite`, `propuestaAnterior`, `plantillaBase`) en una
sola ejecución, genera manifiesto y resumen de cada una, y **hace commit y push solo**.

Se ejecuta en la máquina local porque el entorno remoto de Claude no tiene acceso al
sistema de archivos del equipo. No es una limitación del método: el mirror versionado es
el artefacto correcto de todos modos (ADR-0001).

## `audit-mirror.mjs` — auditoría automatizada sobre una captura

```bash
node scripts/audit-mirror.mjs investigacion/mirrors/azucarhotel
```

Sin dependencias: Node puro. Produce `informe.md` (para humanos) y `datos.json` (para el
siguiente paso del análisis) dentro de la carpeta de la captura.

**Qué revisa:** integridad y peso · SEO on-page (title, description, canonical, h1,
jerarquía de encabezados, robots) · i18n (`lang`, `hreflang`, equilibrio ES/EN) ·
accesibilidad (alt, lang, jerarquía) · rendimiento (peso de imágenes, formatos modernos,
`width`/`height` y por tanto CLS) · datos estructurados schema.org · huella tecnológica
(WordPress, tema, plugins, jQuery) · dominios externos referenciados · formularios y su
destino · enlaces de reserva y a dónde apuntan realmente.

### Por qué la auditoría es un script y no una lectura manual

1. **Reproducible.** Mismo mirror, mismo resultado. Un hallazgo que no se puede reproducir
   no se puede defender ante el cliente.
2. **Comparable.** Al terminar el proyecto se corre contra el sitio nuevo y el "antes y
   después" sale con la misma vara, no con dos opiniones.
3. **Exhaustivo.** Nadie revisa 40 páginas a mano sin saltarse ninguna. La máquina no se
   cansa en la página 31.
4. **Auditable.** El criterio de cada hallazgo está en el código y se puede discutir. "Me
   pareció lento" no se puede discutir.

*Antipatrón evitado: la auditoría-opinión — un documento de hallazgos que nadie puede
verificar ni repetir, y que envejece el día que el sitio cambia.*
