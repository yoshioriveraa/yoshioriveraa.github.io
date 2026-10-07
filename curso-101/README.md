# curso-101

Landing page estática (HTML + Tailwind CSS vía CDN + JS vanilla) para las **clases gratis de
Análisis de Datos** (12 al 23 de octubre) y para captar leads hacia la suscripción de pago
único a todos los cursos.

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
│   └── script.js        <- countdown, tabs de semanas, acordeones, validación de formulario, tracking
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

## Sobre el formulario de registro

El sitio es 100% estático (GitHub Pages), sin backend propio. El formulario valida los datos
(nombre, WhatsApp, correo) en el navegador, incluye un honeypot anti-spam y un rate limit básico,
y al enviarse muestra un mensaje de éxito con un botón que abre WhatsApp con el mensaje
prellenado.

### Conectar un formulario de Google (opcional)

Sí se puede conectar un Google Form como "backend" de los leads, sin exponer ninguna clave
secreta (Google Forms acepta envíos públicos por diseño). Pasos:

1. Crea un Google Form con 3 preguntas de **texto corto**, en este orden: Nombre, WhatsApp, Correo.
2. Publícalo y ábrelo como lo vería un estudiante (la URL `.../viewform`, no la de edición).
3. Click derecho → "Ver código fuente de la página" (o F12 → pestaña Elements/Network) y busca
   `entry.` — cada pregunta tiene un campo `name="entry.123456789"`. Copia esos 3 números.
4. En `js/config.js`, completa:
   - `GOOGLE_FORM_ACTION_URL`: la misma URL del formulario, cambiando `/viewform` por `/formResponse`.
   - `GOOGLE_FORM_ENTRY_IDS`: los 3 `entry.XXXXXXX` que copiaste, cada uno en su campo
     (`nombre`, `whatsapp`, `correo`).

Mientras `GOOGLE_FORM_ACTION_URL` esté vacío, el formulario sigue funcionando igual que antes
(solo valida y abre WhatsApp). En cuanto lo completes, cada envío válido también se guarda como
una fila nueva en las respuestas de tu Google Form (y puedes verlas en una hoja de cálculo
vinculada desde el mismo Form, en la pestaña "Respuestas" → ícono de Sheets).

Nota técnica: el envío usa `fetch(..., { mode: "no-cors" })`, el método estándar para mandar un
Google Form desde un sitio externo sin backend propio. Por esa misma restricción de Google, el
navegador no puede confirmar si el envío tuvo éxito — por eso el mensaje de éxito en pantalla se
muestra siempre, igual que si solo se fuera a WhatsApp.

## Analítica

Los eventos `generate_lead` (envío del formulario) y `cta_click` (clicks en botones de
WhatsApp) ya se disparan y se loguean en consola desde `trackEvent()` en `js/script.js`. Están
listos para conectar Meta Pixel (`fbq`) o Google Analytics (`gtag`) — solo descomenta las líneas
`TODO` dentro de esa función cuando instales esos scripts.

## Desarrollo local

No requiere instalación. Abre `index.html` en el navegador, o sírvelo con un servidor estático:

```bash
cd curso-101
python -m http.server 8080
```

Y abre `http://localhost:8080` en el navegador.
