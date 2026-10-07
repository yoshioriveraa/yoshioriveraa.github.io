# curso-101

Landing page estática (HTML + Tailwind CSS vía CDN + JS vanilla) para las **clases gratis de
Análisis de Datos** (12 al 23 de octubre) y para dirigir a WhatsApp a quien quiera inscribirse
a la suscripción de pago único a todos los cursos.

Esta carpeta vive dentro del repositorio principal `yoshioriveraa.github.io`, que ya se
publica desde la raíz en GitHub Pages. Al hacer push a `main`, esta página queda disponible
automáticamente en:

```
https://yoshioriveraa.github.io/curso-101/
```

## Estructura

```
curso-101/
├── index.html          <- página principal
├── css/
│   └── style.css       <- animaciones, acordeones, tabs (lo que Tailwind CDN no cubre)
├── js/
│   ├── config.js        <- TODA la info editable: fechas, precio, cupos, WhatsApp, horario de clases, FAQ
│   └── script.js        <- countdown, tabs de semanas, acordeones, botón de WhatsApp, tracking
└── assets/
    └── img/              <- favicon.png, og-image.jpg, instructor.jpg (ver TODOs abajo)
```

No hay proceso de build: basta con abrir `index.html`, porque Tailwind se carga desde su CDN.

## Antes de publicar: contenido a reemplazar

- **`js/config.js`** (todo lo editable está arriba del archivo):
  - `CUPOS_LANZAMIENTO_VENDIDOS`: empieza en `0`. Actualízalo según las inscripciones reales
    confirmadas. Cuando llegue a `CUPOS_LANZAMIENTO_TOTALES` (50), la tarjeta de precio cambia
    sola a S/200.
  - `WHATSAPP_NUMBER`: ya tiene el número real del sitio; cámbialo si usarás otro.
- **`index.html`**:
  - `og:image` → agrega `assets/img/og-image.jpg` (1200×630px).
  - Favicon → agrega `assets/img/favicon.png` (512×512px).
  - Foto del instructor → agrega `assets/img/instructor.jpg`.
  - Sección de testimonios → está comentada en el HTML; descomenta y completa con testimonios
    reales cuando los tengas (no se inventó ninguno).

## Sobre la inscripción

No hay formulario de registro: la página no guarda nombre, WhatsApp ni correo de nadie en
ningún lado. Todos los botones de la página (`data-wa-cta`) abren WhatsApp directo con el mismo
mensaje prellenado — "Hola, quiero inscribirme y pagar mis S/ 100 🚀" — definido en
`WHATSAPP_MESSAGE` dentro de `js/config.js`. Si cambias `PRICE_LAUNCH`, el mensaje se actualiza
solo porque usa esa misma variable.

## Analítica

El evento `cta_click` (clicks en cualquier botón de WhatsApp) ya se dispara y se loguea en
consola desde `trackEvent()` en `js/script.js`. Está listo para conectar Meta Pixel (`fbq`) o
Google Analytics (`gtag`) — solo descomenta las líneas `TODO` dentro de esa función cuando
instales esos scripts.

## Desarrollo local

No requiere instalación. Abre `index.html` en el navegador, o sírvelo con un servidor estático:

```bash
cd curso-101
python -m http.server 8080
```

Y abre `http://localhost:8080` en el navegador.
