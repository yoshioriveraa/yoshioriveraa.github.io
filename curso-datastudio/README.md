# curso-datastudio

Landing page estática (HTML + Tailwind CSS vía CDN + JS vanilla) para vender el curso
**Looker Studio (Google Data Studio) desde Cero** y generar leads por WhatsApp.

Esta carpeta vive dentro del repositorio principal `yoshioriveraa.github.io`, que ya se
publica desde la raíz en GitHub Pages. Por eso **no se necesita ninguna configuración
adicional**: al hacer push a `main`, esta página queda disponible automáticamente en:

```
https://yoshioriveraa.github.io/curso-datastudio/
```

## Estructura

```
curso-datastudio/
├── index.html          <- página principal
├── css/
│   └── style.css       <- animaciones y detalles que Tailwind CDN no cubre
├── js/
│   └── script.js       <- countdown, contador de cupos, acordeones, tracking WhatsApp
└── assets/
    └── img/            <- imágenes (ver assets/img/README.md para la lista exacta)
```

No hay proceso de build: `index.html` funciona abriéndolo directamente en el navegador,
porque Tailwind se carga desde su CDN oficial.

## Antes de publicar: contenido a reemplazar

Busca los comentarios `<!-- TODO -->` y `// TODO` en el código:

- **`js/script.js`** (arriba del archivo):
  - `WHATSAPP_NUMBER`: número real de WhatsApp (código de país + número, sin `+` ni espacios).
  - `COURSE_START_DATE`: fecha y hora real de inicio del curso (actualmente 18 de agosto de 2026, 7:00 pm hora Perú).
  - `CUPOS_TOTALES` / `CUPOS_RESTANTES`: cupos disponibles, para actualizar según inscripciones.
- **`index.html`**:
  - Meta tags Open Graph (`og:image`) → agrega `assets/img/og-image.jpg`.
  - Foto del instructor → agrega `assets/img/instructor.jpg`.
  - Favicon → agrega `assets/img/favicon.png`.
  - Sección de testimonios → reemplazar los placeholders por testimonios reales de exalumnos.
  - Cifras de logros del instructor (dashboards implementados, estudiantes formados).

Ver también [`assets/img/README.md`](assets/img/README.md) para el detalle de imágenes requeridas.

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con un
servidor estático simple, por ejemplo:

```bash
cd curso-datastudio
python -m http.server 8080
```

Y abrir `http://localhost:8080` en el navegador.
