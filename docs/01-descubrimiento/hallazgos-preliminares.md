# Hallazgos preliminares — Azúcar Hotel Tulum

> **Fecha:** 2026-08-19
> **Método:** *document analysis* sobre fuentes públicas indexadas (OTAs, agregadores,
> reseñas). **Sin acceso directo al sitio** (egreso bloqueado en el entorno remoto).
> **Nivel de confianza:** medio-bajo. Todo lo de aquí es **hipótesis a validar** contra el
> mirror de HTTrack y contra el cliente. No se cita a cliente ningún dato de este archivo
> sin verificarlo antes.

---

## 1. Ficha del negocio (a validar)

| Dato | Valor encontrado | Fuente | Confianza |
|---|---|---|---|
| Fundación | Abril 2008 | Sitio propio (vía índice de búsqueda) | Media |
| Dirección | Carretera a Boca Paila km 7.5, Zona Hotelera, Tulum, Q. Roo | Yelp / agregadores | Alta |
| Categoría | 3 estrellas | Agregadores | Media |
| Inventario | 21 habitaciones / **8 tipos** de alojamiento (cabañas, habitaciones, suites, bungalows) | Agregadores | **Conflictiva — ver §3** |
| Teléfono | "81 138 02176" (formato inconsistente, lada de Monterrey) | Yelp | **Baja — ver §3** |
| Servicios | Playa privada, 2 albercas exteriores, alberca infinita, spa/masajes, restaurante, camas de playa gratuitas, A/C, minibar, WiFi | Agregadores | Media |
| Idiomas del sitio | ES + EN (rutas `/en/…` y `/servicios/`) | Índice de búsqueda | Alta |
| Tarifa observada | ~USD 133–199 / noche | Agregadores | Baja (varía por temporada) |

---

## 2. Reputación online (dato duro de negocio)

| Plataforma | Calificación | Volumen |
|---|---|---|
| Booking.com | **8.3 / 10** | 327 reseñas verificadas |
| TripAdvisor | **3.0 / 5** — puesto #72 de 207 B&B/posadas en Tulum | 176 reseñas |

**Temas positivos recurrentes:** ubicación y acceso a playa, personal amable y servicial,
vistas al mar desde la habitación, experiencia "anti-resort" / auténtica.

**Temas negativos recurrentes:**
- Mantenimiento y mobiliario percibidos como descuidados / anticuados.
- **Discrepancias de cobro**: huéspedes reportan que se les cobró más que el precio
  publicado en Booking.
- **Habitación entregada distinta a la reservada.**
- Ruido de vida nocturna cercana.
- Sargazo en playa.

> 🔴 **Lectura de negocio.** Los dos hallazgos en negritas no son quejas de servicio: son
> **fallas de expectativa generadas por el contenido**. Un sitio que muestra tarifas claras
> con lo que incluye/no incluye, y fotos e inventario fiables por tipo de habitación, ataca
> directamente la causa raíz. Esto convierte el rediseño de "queremos un sitio más bonito"
> a "queremos reducir disputas de cobro y reseñas negativas": un argumento medible que se
> defiende ante el dueño. **Este es el gancho comercial del proyecto.**

---

## 3. Señales de alerta detectadas (esto es lo valioso)

### 3.1 Posible identidad duplicada en TripAdvisor
Aparecen **dos fichas distintas**:
- `d1425833` — "Azucar Hotel", 3.0/5, 176 reseñas.
- `d1503244` — "Azucar Hotel Tulum".

Una ficha duplicada fragmenta reseñas y calificación, y confunde al viajero. Si se
confirma, la consolidación ante TripAdvisor es una victoria rápida de alto impacto y
costo casi cero. **Validar.**

### 3.2 Ecosistema de dominios disperso
Se detectaron múltiples dominios que venden el hotel:
- `azucarhoteltulum.sys-rsrv.com` → aparenta ser **motor de reservas de un tercero**.
- `azucar.therivieramayahotels.com`, `azucar.tulum-hotels.net`,
  `azucar.tulumtownhotels.com`, `azucar.hotels-quintana-roo.com` → red de sitios
  afiliados / *parasite sites* que capturan tráfico de marca.

> **Por qué importa.** Estos sitios compiten por el nombre "Azucar Hotel Tulum" en Google
> y desvían reservas que deberían ser directas hacia canales con comisión. Cada reserva que
> se va por ahí cuesta 15–25 % de comisión. Recuperar tráfico de marca es la palanca de
> ROI más directa de todo el proyecto.

### 3.3 Teléfono con lada de Monterrey en un hotel de Tulum
El número publicado en agregadores usa lada 81 (Nuevo León). Puede ser el corporativo, un
dato viejo o un error de la ficha. **Impacto directo en NAP consistency** (Name, Address,
Phone), factor conocido de SEO local. **Validar con el cliente.**

### 3.4 El cliente ya evaluó ResNexus
La propuesta anterior se construyó sobre ResNexus, que no es solo un website builder: es
**PMS + channel manager + motor de reservas**. Esto reformula por completo el proyecto.

> ❓ **La pregunta que no se nos habría ocurrido preguntar en frío:**
> ¿el cliente hoy con qué PMS y con qué motor de reservas opera, y tiene contrato vigente?
> La respuesta determina si estamos construyendo un sitio de marketing que enlaza a un
> motor externo, o un sitio que debe integrar un motor. **Son dos proyectos distintos, con
> alcance, precio y plazo distintos.**
> *Este hallazgo, por sí solo, justifica haber hecho la auditoría antes del cuestionario.*

---

## 4. Pendientes que sólo resuelve el mirror de HTTrack

- [ ] Stack real del sitio actual (¿WordPress? ¿qué tema? ¿qué plugins?)
- [ ] Inventario y nombres exactos de habitaciones + copy actual (ES/EN)
- [ ] ¿Hay tarifas publicadas en el sitio? ¿hay calendario de disponibilidad?
- [ ] A dónde apunta realmente el botón de "Reservar"
- [ ] Calidad, peso y cantidad de fotografía disponible (insumo crítico del rediseño)
- [ ] Estado de SEO on-page: `<title>`, meta description, H1, datos estructurados
      `schema.org/Hotel`, `hreflang` ES/EN, sitemap, canonical
- [ ] Peso de página y Core Web Vitals
- [ ] Formularios existentes y a dónde envían los datos
- [ ] Políticas publicadas: cancelación, mascotas, niños, check-in/out
