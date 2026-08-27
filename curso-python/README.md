# curso-python

Landing page estática (HTML + Tailwind CSS vía CDN + JS vanilla) para vender el curso
**Python para Análisis de Datos** y generar leads por WhatsApp.

Esta carpeta vive dentro del repositorio principal `yoshioriveraa.github.io`, que ya se
publica desde la raíz en GitHub Pages. Por eso **no se necesita ninguna configuración
adicional**: al hacer push a `main`, esta página queda disponible automáticamente en:

```
https://yoshioriveraa.github.io/curso-python/
```

## Estructura

```
curso-python/
├── index.html          <- página principal
├── css/
│   └── style.css       <- animaciones, acordeones y bloques de código
├── js/
│   └── script.js       <- countdown, contador de cupos, promo, acordeones, tracking WhatsApp
└── assets/
    └── img/            <- imágenes (favicon, og-image, foto del instructor)
```

No hay proceso de build: `index.html` funciona abriéndolo directamente en el navegador,
porque Tailwind se carga desde su CDN oficial.

## Datos del curso

- **Inicio:** sábado 5 de septiembre de 2026, 7:00 pm (hora Perú)
- **Fin:** domingo 4 de octubre de 2026
- **Modalidad:** 10 clases (20 horas) en vivo — sábados y domingos, 7:00–9:00 pm (hora Perú)
- **Entorno:** 100% Google Colab, de la clase 1 a la 10 (incluida la publicación en GitHub,
  que Colab permite hacer sin salir del navegador)
- **Grupo:** máximo 10 estudiantes por cohorte
- **Enfoque:** 100% práctico desde la primera clase
- **Precio:** S/170 regular · **S/99.90 para los primeros 5 estudiantes** (descuento de lanzamiento)

### Calendario

| Clase | Fecha | Tema |
|-------|-------|------|
| 1 | Sáb 5 set | Bienvenida y primer programa |
| 2 | Dom 6 set | Variables, tipos de datos y operadores |
| 3 | Sáb 12 set | Condicionales y bucles |
| 4 | Dom 13 set | Listas, tuplas y diccionarios |
| 5 | Sáb 19 set | NumPy y Pandas: exploración de datos |
| 6 | Dom 20 set | Manipulación de datos I con Pandas |
| 7 | Sáb 26 set | Manipulación de datos II con Pandas |
| 8 | Dom 27 set | Visualización con Matplotlib y Seaborn |
| 9 | Sáb 3 oct | Proyecto final integrador |
| 10 | Dom 4 oct | Publicar el proyecto en GitHub (desde Colab) |

## Antes de publicar: contenido a reemplazar

Busca los comentarios `<!-- TODO -->` y `// TODO` en el código:

- **`js/script.js`** (arriba del archivo):
  - `WHATSAPP_NUMBER`: número real de WhatsApp (código de país + número, sin `+` ni espacios).
  - `COURSE_START_DATE`: fecha y hora de inicio (actualmente 5 de septiembre de 2026, 7:00 pm hora Perú).
  - `CUPOS_TOTALES` / `CUPOS_RESTANTES`: cupos disponibles (máximo 10), actualizar según inscripciones.
  - `PROMO_TOTALES` / `PROMO_RESTANTES`: cupos con precio de S/99.90 (los primeros 5).
    Cuando `PROMO_RESTANTES` llega a 0, la página oculta la promo y muestra el aviso de
    "cupos con descuento agotados" automáticamente.
- **`index.html`**:
  - Meta tags Open Graph (`og:image`) → agrega `assets/img/og-image.jpg` (1200x630px).
  - Foto del instructor → agrega `assets/img/instructor.jpg`.
  - Favicon → agrega `assets/img/favicon.png` (512x512px).
  - Sección de testimonios → reemplazar por testimonios reales de exalumnos del curso de Python.
  - Cifras de logros del instructor (proyectos con Python, estudiantes formados).

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con un
servidor estático simple, por ejemplo:

```bash
cd curso-python
python -m http.server 8080
```

Y abrir `http://localhost:8080` en el navegador.
