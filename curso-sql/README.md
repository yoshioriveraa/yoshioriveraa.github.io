# curso-sql

Landing page estática (HTML + Tailwind CSS vía CDN + JS vanilla) para vender el curso
**SQL con PostgreSQL desde Cero** y generar leads por WhatsApp.

Esta carpeta vive dentro del repositorio principal `yoshioriveraa.github.io`, que ya se
publica desde la raíz en GitHub Pages. Por eso **no se necesita ninguna configuración
adicional**: al hacer push a `main`, esta página queda disponible automáticamente en:

```
https://yoshioriveraa.github.io/curso-sql/
```

## Estructura

```
curso-sql/
├── index.html          <- página principal
├── css/
│   └── style.css       <- animaciones y detalles que Tailwind CDN no cubre
├── js/
│   └── script.js       <- countdown, contador de cupos, acordeones, tracking WhatsApp
└── assets/
    └── img/            <- imágenes (favicon, og-image, foto del instructor)
```

No hay proceso de build: `index.html` funciona abriéndolo directamente en el navegador,
porque Tailwind se carga desde su CDN oficial.

## Datos del curso

- **Inicio:** 21 de agosto de 2026, 7:00 pm (hora Perú)
- **Modalidad:** 18 sesiones en vivo repartidas en 6 semanas — miércoles y viernes
  (7:00–8:30 pm, teoría + práctica) y sábados (12:00–2:00 pm, sesión de ejercicios)
- **Grupo:** máximo 15 estudiantes por cohorte
- **Evaluación:** examen cada 3 clases (6 en total, incluyendo el examen final con proyecto)
- **Precio:** S/150 regular · S/99.90 para estudiantes que ya llevaron otro curso
  (por ejemplo, el curso de Data Studio)

## Antes de publicar: contenido a reemplazar

Busca los comentarios `<!-- TODO -->` y `// TODO` en el código:

- **`js/script.js`** (arriba del archivo):
  - `WHATSAPP_NUMBER`: número real de WhatsApp (código de país + número, sin `+` ni espacios).
  - `COURSE_START_DATE`: fecha y hora real de inicio del curso (actualmente 21 de agosto de 2026, 7:00 pm hora Perú).
  - `CUPOS_TOTALES` / `CUPOS_RESTANTES`: cupos disponibles (máximo 15), actualizar según inscripciones.
- **`index.html`**:
  - Meta tags Open Graph (`og:image`) → agrega `assets/img/og-image.jpg`.
  - Foto del instructor → agrega `assets/img/instructor.jpg`.
  - Favicon → agrega `assets/img/favicon.png`.
  - Sección de testimonios → reemplazar por testimonios reales de exalumnos del curso de SQL.
  - Cifras de logros del instructor (bases de datos implementadas, estudiantes formados).

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con un
servidor estático simple, por ejemplo:

```bash
cd curso-sql
python -m http.server 8080
```

Y abrir `http://localhost:8080` en el navegador.
