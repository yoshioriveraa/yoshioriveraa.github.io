# Yoshio Agarie

Landing page estática (HTML + Tailwind CSS compilado + JS vanilla) con los cursos que abren en
octubre y noviembre, y para dirigir a WhatsApp a quien quiera inscribirse a la suscripción de
pago único (S/ 99) a todos los cursos.

Esta carpeta vive dentro del repositorio principal `yoshioriveraa.github.io`, que ya se
publica desde la raíz en GitHub Pages. Al hacer push a `main`, esta página queda disponible
automáticamente en:

```
https://yoshioagarie.com/
```

## Estructura

```
curso-101/
├── index.html          <- página principal
├── css/
│   ├── style.css       <- animaciones y acordeones (a mano)
│   └── tailwind.css    <- Tailwind ya compilado (generado, no editar a mano)
├── js/
│   ├── config.js        <- TODA la info editable: fechas, precio, cupos, WhatsApp, cursos (OFFICIAL_COURSES), vacantes, duración del descuento, FAQ
│   └── script.js        <- temporizador del descuento, tarjetas de cursos, acordeones, botón de WhatsApp, tracking
└── assets/
    └── img/              <- favicon.png, og-image.jpg, instructor.jpg (ver TODOs abajo)
```

Para ver la página basta con abrir `index.html`. El CSS de Tailwind está precompilado en
`css/tailwind.css` (más rápido que el CDN). Si agregas clases nuevas de Tailwind en el HTML o
en los JS, vuelve a compilarlo con Tailwind 3: `npx tailwindcss@3 -c tailwind.config.js -i in.css -o css/tailwind.css --minify`
(el config usa los colores `ink`, `brand`, `brand-dark`, `brand-light` y escanea `index.html` y `js/*.js`).

## Antes de publicar: contenido a reemplazar

- **`js/config.js`** (todo lo editable está arriba del archivo):
  - `VACANTES_DISPONIBLES`: vacantes que muestra la página (hoy 5). Cuando llegue a 0 la tarjeta
    de precio cambia sola a S/200.
  - El descuento termina cada día a las 11:59 pm (hora de Lima) y se reinicia solo (`DISCOUNT_UTC_OFFSET_HOURS`).
  - `WHATSAPP_NUMBER`: ya tiene el número real del sitio; cámbialo si usarás otro.
- **`index.html`**:
  - `og:image` → agrega `assets/img/og-image.jpg` (1200×630px).
  - Favicon → agrega `assets/img/favicon.png` (512×512px).
  - Foto del instructor → agrega `assets/img/instructor.jpg`.
  - Sección de testimonios → está comentada en el HTML; descomenta y completa con testimonios
    reales cuando los tengas (no se inventó ninguno).

## Sobre la inscripción

La sección `#inscripcion` explica 2 pasos: pagar (Yape +51 900 604 267 o paypal.me/yoshioriveraa) y
enviar la captura por WhatsApp (`data-wa-proof`, mensaje en `WHATSAPP_PROOF_MESSAGE`). El resto de
la inscripción se coordina por ese mismo chat. No hay formulario en la página ni se guarda ningún
dato. Los demás botones (`data-wa-cta`) usan `WHATSAPP_MESSAGE`.

## Analítica

El evento `cta_click` (clicks en cualquier botón de WhatsApp) ya se dispara y se loguea en
consola desde `trackEvent()` en `js/script.js`. Está listo para conectar Meta Pixel (`fbq`) o
Google Analytics (`gtag`) — solo descomenta las líneas `TODO` dentro de esa función cuando
instales esos scripts.

## Desarrollo local

No requiere instalación. Abre `index.html` en el navegador, o sírvelo con un servidor estático:

```bash
cd .  # raíz del repo
python -m http.server 8080
```

Y abre `http://localhost:8080` en el navegador.
