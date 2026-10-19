/* ============================================================
   CONFIGURACIÓN EDITABLE — "Cursos de Análisis de Datos"
   Todo lo que cambia seguido (fechas, precio, cupos, WhatsApp,
   horarios) vive en este archivo. No tocar index.html ni script.js
   para actualizar esta info.

   Nota de arquitectura: este proyecto es HTML + Tailwind (CDN) +
   JS vanilla, sin build ni TypeScript (ver README del repo). Por
   eso el "archivo de datos tipado" se implementa como objetos JS
   documentados con JSDoc (da autocompletado/chequeo en editores
   compatibles) en vez de un .ts real.
   ============================================================ */

// Número real de WhatsApp (código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "51900604267";

// Inicio de las clases oficiales (temario completo)
const OFFICIAL_CLASSES_START_LABEL = "2 de noviembre de 2026";

// Fecha límite de la suscripción (pago único, acceso hasta esta fecha)
const SUBSCRIPTION_ACCESS_UNTIL_LABEL = "20 de marzo de 2027";

// Costo del certificado de finalización, por cada curso completado (no está incluido en la suscripción)
const CERTIFICATE_PRICE = 10;

// ---------- Precio y cupos de lanzamiento ----------
// Precio regular (ancla) y precio de lanzamiento con 50% de descuento
const PRICE_REGULAR = 200;
const PRICE_LAUNCH = 100;

// Mensaje prellenado del único botón de WhatsApp de la página (no hay formulario:
// todo el sitio usa este mismo mensaje para inscribirse y pagar)
const WHATSAPP_MESSAGE = `Hola, quiero inscribirme y pagar mis S/ ${PRICE_LAUNCH} 🚀`;

// Cupos totales de lanzamiento con el precio de S/100
const CUPOS_LANZAMIENTO_TOTALES = 50;

// Vacantes que se muestran como disponibles (la página dice "solo quedan N vacantes").
const VACANTES_DISPONIBLES = 4;
const CUPOS_LANZAMIENTO_VENDIDOS = CUPOS_LANZAMIENTO_TOTALES - VACANTES_DISPONIBLES;

// El descuento termina cada día a las 11:59 pm (hora de Lima, UTC-5) y se reinicia solo a medianoche.
const DISCOUNT_UTC_OFFSET_HOURS = -5;

// Mensaje prellenado para enviar la captura del pago
const WHATSAPP_PROOF_MESSAGE = `Hola, ya pagué mis S/ ${PRICE_LAUNCH}. Te envío la captura de mi pago 🧾`;

// Aviso sobre los horarios de los cursos de la suscripción
const SUBSCRIPTION_SCHEDULE_NOTE =
  "Cada curso tiene su propio horario (no todos se dictan al mismo tiempo), así que puedes ir sumando cursos según tu disponibilidad.";

/** Color de la etiqueta de cada ruta */
const ROUTE_COLORS = {
  "Matemática y Estadística": "#ff8a65",
  Python: "#4da3ff",
  SQL: "#3ddc97",
  Excel: "#2ed3c0",
  "Power BI": "#f2b134",
  "Looker Studio": "#c9b037",
};

/** Ícono grande de cada ruta */
const ROUTE_ICONS = {
  "Matemática y Estadística": "🧮",
  Python: "🐍",
  SQL: "🗄️",
  Excel: "📊",
  "Power BI": "📈",
  "Looker Studio": "📑",
};

/**
 * Temario de cada curso: solo el tema de cada clase, en orden.
 * Cada grupo de OFFICIAL_COURSES apunta a uno de estos temarios con `syllabus`.
 */
const SYLLABI = {
  py1: [
    "Bienvenida e instalación", "Variables y tipos de datos", "Operadores y expresiones",
    "Condicionales if / elif / else", "Bucle while", "Bucle for y range", "Listas",
    "Cadenas de texto", "Diccionarios y errores", "Mini proyecto de cierre",
  ],
  py1i: [
    "Instalación, primer programa y variables", "Operadores y condicionales", "Bucles while y for",
    "Listas y cadenas de texto", "Diccionarios y manejo de errores", "Proyecto de cierre",
  ],
  py2: [
    "Repaso exprés y funciones", "Funciones en profundidad", "Listas avanzadas", "Tuplas y conjuntos",
    "Diccionarios avanzados", "Archivos de texto", "Archivos CSV", "Manejo de errores",
    "Módulos y librerías", "Mini proyecto de cierre",
  ],
  pyint: [
    "Repaso y funciones avanzadas", "Comprensiones y funciones de orden superior",
    "Programación orientada a objetos 1", "Programación orientada a objetos 2",
    "Programación orientada a objetos 3", "Excepciones propias y buenas prácticas",
    "Fechas, horas y expresiones regulares", "JSON y archivos",
    "Entornos virtuales, módulos propios y pruebas", "Proyecto de cierre",
  ],
  scrap: [
    "HTML esencial y herramientas del navegador", "Peticiones con requests", "BeautifulSoup 1",
    "BeautifulSoup 2", "Varias páginas y datos limpios", "Proyecto de cierre",
  ],
  pydatos: [
    "Entorno de datos", "NumPy 1", "NumPy 2", "Pandas 1", "Pandas 2", "Pandas 3", "Pandas 4",
    "Matplotlib", "Seaborn", "Proyecto de cierre",
  ],
  ml: [
    "Qué es Machine Learning", "Preparación de datos", "Regresión", "Clasificación",
    "Mejorar el modelo", "Proyecto de cierre",
  ],
  sql1: [
    "Bienvenida e instalación", "Tablas y SELECT", "Filtros con WHERE", "Filtros avanzados",
    "Ordenar y limitar", "Funciones de texto y números", "Fechas y CASE", "Funciones de resumen",
    "Insertar, actualizar y borrar", "Práctica integradora",
  ],
  sql1i: [
    "Instalación y primeras consultas", "Filtros y orden", "Funciones de texto, números y fechas",
    "CASE y funciones de resumen", "Insertar, actualizar y borrar", "Práctica integradora",
  ],
  sql2: [
    "Repaso y GROUP BY", "HAVING y agrupaciones múltiples", "Relaciones entre tablas", "INNER JOIN",
    "LEFT y RIGHT JOIN", "Más de dos tablas", "UNION y operaciones de conjuntos",
    "Crear tablas y restricciones", "Vistas y diseño básico", "Proyecto de cierre",
  ],
  sqlint: [
    "Repaso y subconsultas 1", "Subconsultas 2", "CTE con WITH", "Funciones ventana 1",
    "Funciones ventana 2", "Funciones ventana 3", "Fechas y series de tiempo",
    "Índices y rendimiento", "Consultas de negocio", "Proyecto de cierre",
  ],
  pbi1: [
    "Introducción e instalación", "Obtener datos", "Power Query 1", "Power Query 2", "Modelo de datos",
    "Primeros gráficos", "Segmentaciones e interacciones", "Medidas con DAX básico",
    "Diseño de un dashboard", "Proyecto de cierre",
  ],
  pbi2: [
    "Repaso y buenas prácticas de modelado", "Tabla calendario", "DAX 1", "DAX 2",
    "Inteligencia de tiempo", "Visuales avanzados", "Parámetros y marcadores",
    "Seguridad y publicación", "Rendimiento", "Proyecto de cierre",
  ],
  looker: [
    "Introducción y primera conexión", "Gráficos y controles", "Campos calculados y diseño",
    "Proyecto de cierre",
  ],
  xl1: [
    "Conociendo Excel y formatos", "Fórmulas y referencias", "Función SI", "Funciones de texto y fecha",
    "Ordenar, filtrar y formato condicional", "Tablas y búsquedas", "Gráficos y validación de datos",
    "Proyecto de cierre",
  ],
  xl2: [
    "Repaso y funciones lógicas avanzadas", "Búsquedas y resúmenes avanzados",
    "Funciones de matriz dinámica", "Tablas dinámicas 1", "Tablas dinámicas 2", "Power Query",
    "Paneles de control", "Proyecto de cierre",
  ],
  mat1: [
    "Números y operaciones", "Porcentajes", "Regla de tres y proporciones", "Álgebra básica 1",
    "Álgebra básica 2", "Funciones 1", "Funciones 2", "Funciones cuadráticas y exponenciales",
    "Logaritmos y escalas", "Práctica integradora",
  ],
  est: [
    "Qué es la estadística", "Tablas de frecuencia y gráficos", "Medidas de tendencia central",
    "Medidas de dispersión", "Valores atípicos y diagrama de cajas", "Probabilidad básica",
    "Distribución normal", "Muestreo e intervalos de confianza", "Correlación y regresión simple",
    "Cómo no dejarte engañar por los datos",
  ],
  mat2: [
    "Repaso y funciones", "Sucesiones y series", "Vectores", "Matrices 1", "Matrices 2", "Cálculo 1",
    "Cálculo 2", "Optimización", "Matemática del Machine Learning", "Práctica integradora",
  ],
};

/**
 * @typedef {Object} OfficialCourse
 * @property {string} group        - Grupo (G01…)
 * @property {string} route        - Ruta / herramienta (clave de ROUTE_COLORS)
 * @property {string} name
 * @property {string} days
 * @property {string} time         - Hora de Lima (UTC-5)
 * @property {number} classes      - Número de clases
 * @property {string} dur          - Duración de cada clase
 * @property {string} start        - Inicio, dd/mm/aaaa
 * @property {string} end          - Fin, dd/mm/aaaa
 * @property {string} requirement
 * @property {string} learn        - Qué aprenderás
 * @property {string} syllabus     - Clave de SYLLABI
 */

const LEARN = {
  mat1: "Álgebra, funciones y porcentajes aplicados a datos y negocios.",
  py1: "Variables, condicionales y bucles. Resuelves ejercicios reales desde la primera clase.",
  sql1: "SELECT, filtros, orden y funciones. Instalas PostgreSQL y consultas datos reales.",
  est: "Promedios, dispersión, probabilidad básica y cómo leer datos sin que te engañen.",
  xl1: "Lo esencial de Excel en 8 clases: fórmulas, funciones, tablas, gráficos y un reporte final.",
  py2: "Funciones, estructuras de datos, archivos y errores. Cierras con un mini proyecto.",
  sql2: "JOINs, GROUP BY, HAVING y diseño básico de tablas con datos de un negocio.",
  xl2: "Funciones avanzadas, tablas dinámicas, Power Query y paneles de control en 8 clases.",
  py1i: "Todo el Básico 1 en versión intensiva de fin de semana: 6 clases de 1 h 30 min.",
  pbi1: "Conectas datos, los limpias, creas gráficos e indicadores y publicas un dashboard completo.",
  mat2: "Funciones, álgebra lineal básica y optimización para análisis de datos.",
  pyint: "Clases y objetos, módulos, manejo de errores, fechas, JSON y pruebas. Base para librerías de datos.",
  sqlint: "Consultas avanzadas para análisis: CTE, ranking, acumulados e índices.",
  pbi2: "Modelo estrella, relaciones, medidas DAX, inteligencia de tiempo y buenas prácticas.",
  scrap: "HTML esencial, requests y BeautifulSoup para extraer datos de páginas web y guardarlos en un archivo.",
  pydatos: "Arreglos con NumPy, tablas con Pandas y gráficas con Matplotlib y Seaborn en un proyecto real.",
  ml: "Preparas datos, entrenas, evalúas y guardas un modelo de Machine Learning que ya predice.",
  looker: "Un reporte online gratuito conectado a Google Sheets, listo para compartir.",
};

const MAT = "Matemática y Estadística";

/** @type {OfficialCourse[]} Todos los grupos de noviembre a marzo (cada fila es un grupo) */
const OFFICIAL_COURSES = [
  { group: "G01", route: MAT, name: "Matemática aplicada 1", days: "Lun, mié y vie", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "02/11/2026", end: "23/11/2026", requirement: "Ninguno", syllabus: "mat1", learn: LEARN.mat1 },
  { group: "G02", route: "Python", name: "Python Básico 1 · Tu primer programa desde cero", days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 10, dur: "1 h", start: "02/11/2026", end: "23/11/2026", requirement: "Ninguno", syllabus: "py1", learn: LEARN.py1 },
  { group: "G03", route: "SQL", name: "SQL Básico 1 · Consultas con PostgreSQL", days: "Lun, mar y jue", time: "7:30 – 8:30 pm", classes: 10, dur: "1 h", start: "02/11/2026", end: "23/11/2026", requirement: "Ninguno", syllabus: "sql1", learn: LEARN.sql1 },
  { group: "G04", route: MAT, name: "Introducción a la Estadística", days: "Mar y jue", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "03/11/2026", end: "03/12/2026", requirement: "Ninguno", syllabus: "est", learn: LEARN.est },
  { group: "G05", route: "Excel", name: "Excel Básico · Tablas, fórmulas y gráficos", days: "Mié y vie", time: "9:00 – 10:00 am", classes: 8, dur: "1 h", start: "04/11/2026", end: "27/11/2026", requirement: "Ninguno", syllabus: "xl1", learn: LEARN.xl1 },
  { group: "G06", route: "Python", name: "Python Básico 1 · Tu primer programa desde cero", days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 10, dur: "1 h", start: "24/11/2026", end: "17/12/2026", requirement: "Ninguno", syllabus: "py1", learn: LEARN.py1 },
  { group: "G07", route: "SQL", name: "SQL Básico 1 · Consultas con PostgreSQL", days: "Lun, mar y jue", time: "7:30 – 8:30 pm", classes: 10, dur: "1 h", start: "24/11/2026", end: "17/12/2026", requirement: "Ninguno", syllabus: "sql1", learn: LEARN.sql1 },
  { group: "G08", route: MAT, name: "Matemática aplicada 1", days: "Lun, mié y vie", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "25/11/2026", end: "18/12/2026", requirement: "Ninguno", syllabus: "mat1", learn: LEARN.mat1 },
  { group: "G09", route: "Python", name: "Python Básico 2 · Funciones, listas y diccionarios", days: "Mié y vie", time: "5:30 – 7:00 pm", classes: 10, dur: "1 h 30 min", start: "25/11/2026", end: "08/01/2027", requirement: "Python Básico 1", syllabus: "py2", learn: LEARN.py2 },
  { group: "G10", route: "SQL", name: "SQL Básico 2 · JOINs y agrupaciones", days: "Mié y vie", time: "7:15 – 8:45 pm", classes: 10, dur: "1 h 30 min", start: "25/11/2026", end: "08/01/2027", requirement: "SQL Básico 1", syllabus: "sql2", learn: LEARN.sql2 },
  { group: "G11", route: "Excel", name: "Excel Intermedio · Tablas dinámicas y análisis", days: "Mié y vie", time: "9:00 – 10:00 am", classes: 8, dur: "1 h", start: "02/12/2026", end: "08/01/2027", requirement: "Excel Básico", syllabus: "xl2", learn: LEARN.xl2 },
  { group: "G12", route: "Python", name: "Python Básico 1 Intensivo · 6 clases", days: "Sáb y dom", time: "9:00 – 10:30 am", classes: 6, dur: "1 h 30 min", start: "05/12/2026", end: "20/12/2026", requirement: "Ninguno", syllabus: "py1i", learn: LEARN.py1i },
  { group: "G13", route: "SQL", name: "SQL Básico 1 Intensivo · 6 clases", days: "Sáb y dom", time: "11:00 am – 12:30 pm", classes: 6, dur: "1 h 30 min", start: "05/12/2026", end: "20/12/2026", requirement: "Ninguno", syllabus: "sql1i", learn: LEARN.py1i },
  { group: "G14", route: "Power BI", name: "Power BI Básico · Tu primer dashboard", days: "Sáb y dom", time: "7:00 – 8:30 pm", classes: 10, dur: "1 h 30 min", start: "05/12/2026", end: "10/01/2027", requirement: "Ninguno", syllabus: "pbi1", learn: LEARN.pbi1 },
  { group: "G15", route: MAT, name: "Matemática aplicada 2", days: "Lun, mié y vie", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "04/01/2027", end: "25/01/2027", requirement: "Matemática aplicada 1", syllabus: "mat2", learn: LEARN.mat2 },
  { group: "G16", route: "Python", name: "Python Básico 2 · Funciones, listas y diccionarios", days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 10, dur: "1 h", start: "04/01/2027", end: "25/01/2027", requirement: "Python Básico 1", syllabus: "py2", learn: LEARN.py2 },
  { group: "G17", route: "Power BI", name: "Power BI Básico · Tu primer dashboard", days: "Lunes", time: "7:00 – 8:30 pm", classes: 10, dur: "1 h 30 min", start: "04/01/2027", end: "15/03/2027", requirement: "Ninguno", syllabus: "pbi1", learn: LEARN.pbi1 },
  { group: "G18", route: MAT, name: "Introducción a la Estadística", days: "Mar y jue", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "05/01/2027", end: "04/02/2027", requirement: "Ninguno", syllabus: "est", learn: LEARN.est },
  { group: "G19", route: "SQL", name: "SQL Básico 2 · JOINs y agrupaciones", days: "Mar y jue", time: "7:30 – 8:30 pm", classes: 10, dur: "1 h", start: "05/01/2027", end: "04/02/2027", requirement: "SQL Básico 1", syllabus: "sql2", learn: LEARN.sql2 },
  { group: "G20", route: "Excel", name: "Excel Básico · Tablas, fórmulas y gráficos", days: "Mié y vie", time: "9:00 – 10:00 am", classes: 8, dur: "1 h", start: "13/01/2027", end: "05/02/2027", requirement: "Ninguno", syllabus: "xl1", learn: LEARN.xl1 },
  { group: "G21", route: "Python", name: "Python Intermedio · Programación orientada a objetos y buenas prácticas", days: "Mié y vie", time: "5:30 – 7:00 pm", classes: 10, dur: "1 h 30 min", start: "13/01/2027", end: "12/02/2027", requirement: "Python Básico 2", syllabus: "pyint", learn: LEARN.pyint },
  { group: "G22", route: "SQL", name: "SQL Intermedio 1 · Subconsultas, CTE y funciones ventana", days: "Mié y vie", time: "7:15 – 8:45 pm", classes: 10, dur: "1 h 30 min", start: "13/01/2027", end: "12/02/2027", requirement: "SQL Básico 2", syllabus: "sqlint", learn: LEARN.sqlint },
  { group: "G23", route: "Power BI", name: "Power BI Intermedio · Modelo de datos y DAX", days: "Sáb y dom", time: "7:00 – 8:30 pm", classes: 10, dur: "1 h 30 min", start: "16/01/2027", end: "14/02/2027", requirement: "Power BI Básico", syllabus: "pbi2", learn: LEARN.pbi2 },
  { group: "G24", route: "Python", name: "Python Intermedio · Programación orientada a objetos y buenas prácticas", days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 10, dur: "1 h", start: "26/01/2027", end: "16/02/2027", requirement: "Python Básico 2", syllabus: "pyint", learn: LEARN.pyint },
  { group: "G25", route: MAT, name: "Matemática aplicada 1", days: "Lun, mié y vie", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "27/01/2027", end: "17/02/2027", requirement: "Ninguno", syllabus: "mat1", learn: LEARN.mat1 },
  { group: "G26", route: MAT, name: "Introducción a la Estadística", days: "Mar y jue", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "09/02/2027", end: "18/03/2027", requirement: "Ninguno", syllabus: "est", learn: LEARN.est },
  { group: "G27", route: "SQL", name: "SQL Intermedio 1 · Subconsultas, CTE y funciones ventana", days: "Mar y jue", time: "7:30 – 8:30 pm", classes: 10, dur: "1 h", start: "09/02/2027", end: "18/03/2027", requirement: "SQL Básico 2", syllabus: "sqlint", learn: LEARN.sqlint },
  { group: "G28", route: "Excel", name: "Excel Intermedio · Tablas dinámicas y análisis", days: "Mié y vie", time: "9:00 – 10:00 am", classes: 8, dur: "1 h", start: "10/02/2027", end: "12/03/2027", requirement: "Excel Básico", syllabus: "xl2", learn: LEARN.xl2 },
  { group: "G29", route: "Python", name: "Web scraping con Python y BeautifulSoup · 6 clases", days: "Mié y vie", time: "5:30 – 7:00 pm", classes: 6, dur: "1 h 30 min", start: "17/02/2027", end: "12/03/2027", requirement: "Python Intermedio", syllabus: "scrap", learn: LEARN.scrap },
  { group: "G30", route: "Python", name: "Python para datos · NumPy, Pandas y gráficas", days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 10, dur: "1 h", start: "18/02/2027", end: "18/03/2027", requirement: "Python Intermedio", syllabus: "pydatos", learn: LEARN.pydatos },
  { group: "G31", route: MAT, name: "Matemática aplicada 2", days: "Lun, mié y vie", time: "4:30 – 5:30 pm", classes: 10, dur: "1 h", start: "19/02/2027", end: "19/03/2027", requirement: "Matemática aplicada 1", syllabus: "mat2", learn: LEARN.mat2 },
  { group: "G32", route: "Python", name: "Machine Learning con scikit-learn · 6 clases", days: "Sáb y dom", time: "7:00 – 8:30 pm", classes: 6, dur: "1 h 30 min", start: "20/02/2027", end: "07/03/2027", requirement: "Python Intermedio (recomendado: Python para datos)", syllabus: "ml", learn: LEARN.ml },
  { group: "G33", route: "Looker Studio", name: "Looker Studio (Data Studio) Express · Tu primer reporte", days: "Mié y vie", time: "7:15 – 8:45 pm", classes: 4, dur: "1 h 30 min", start: "10/03/2027", end: "19/03/2027", requirement: "Ninguno", syllabus: "looker", learn: LEARN.looker },
];

/** Temas oficiales que entran con la suscripción (desde el 2 de noviembre) — cada uno en su propio horario */
const SUBSCRIPTION_TOPICS = [
  { icon: "📊", name: "Excel básico e intermedio" },
  { icon: "📈", name: "Power BI básico e intermedio" },
  { icon: "🗄️", name: "SQL con PostgreSQL" },
  { icon: "🐍", name: "Python" },
  { icon: "📉", name: "Python para datos: NumPy, Pandas y gráficas" },
  { icon: "🕸️", name: "Web scraping con BeautifulSoup" },
  { icon: "🤖", name: "Machine Learning con scikit-learn" },
  { icon: "📑", name: "Looker Studio" },
  { icon: "➗", name: "Matemática aplicada 1 y 2" },
  { icon: "📐", name: "Introducción a la Estadística" },
];

/** Qué incluye la suscripción */
const SUBSCRIPTION_INCLUDES = [
  { icon: "🔓", text: `Acceso a todos los cursos hasta el ${SUBSCRIPTION_ACCESS_UNTIL_LABEL}` },
  { icon: "🎯", text: "Cursos 100% enfocados en análisis de datos" },
  { icon: "🗂️", text: "Proyectos reales, con data real" },
  { icon: "📝", text: "Asesoría para armar tu CV de analista de datos" },
  { icon: "🔗", text: "Cómo usar LinkedIn para mostrar tu trabajo" },
  { icon: "🎥", text: "Todas las clases grabadas" },
  { icon: "👥", text: "Comunidad privada de estudiantes" },
  { icon: "📄", text: "Material y ejercicios" },
  { icon: "✨", text: "Cursos nuevos incluidos mientras dure tu suscripción" },
  { icon: "🏅", text: `Certificado de finalización por cada curso (costo aparte: S/ ${CERTIFICATE_PRICE} por curso)` },
];

/** Preguntas frecuentes */
const FAQ_ITEMS = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No, ninguna. Los cursos están pensados para quien nunca ha usado datos. Empezamos desde cero y avanzamos paso a paso.",
  },
  {
    q: "¿Y si no puedo conectarme en vivo?",
    a: "No hay problema: todas las clases quedan grabadas y puedes verlas cuando quieras durante tu acceso.",
  },
  {
    q: "¿Cuánto dura el acceso?",
    a: `Tu suscripción con pago único te da acceso a todos los cursos hasta el ${SUBSCRIPTION_ACCESS_UNTIL_LABEL}.`,
  },
  {
    q: "¿Cómo pago?",
    a: "Yapea al +51 900 604 267 o paga por PayPal en paypal.me/yoshioriveraa. Luego envía la captura de tu pago por WhatsApp y rellena el formulario de inscripción que está en esta página.",
  },
  {
    q: "¿Qué pasa después del 20 de marzo?",
    a: "Tu acceso a los cursos y comunidad vence en esa fecha. Si quieres seguir, te avisaremos de las condiciones para renovar.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "Lo único que necesitas instalar en todo el programa es Excel y Power BI; el resto de herramientas son en la nube. Esas instalaciones las haces de forma asíncrona, a tu propio ritmo y antes de la clase que las usa — no se pierde tiempo de clase instalando software.",
  },
  {
    q: "¿Las clases son teoría o práctica?",
    a: "30% teoría y 70% práctica. Las sesiones de aprendizaje son sincrónicas (en vivo), y además tendrás ejercicios de práctica de forma diaria para afianzar lo visto en cada clase.",
  },
  {
    q: "¿Obtengo un certificado al finalizar?",
    a: `Sí. El certificado de finalización de cada curso tiene un costo adicional de S/ ${CERTIFICATE_PRICE} (no está incluido en el pago único de la suscripción). Para obtenerlo necesitas presentar el proyecto final del curso que completes.`,
  },
  {
    q: "¿Hay devoluciones si me arrepiento después de pagar?",
    a: "No hay devoluciones. Al confirmar tu pago se reserva tu vacante y se le retira el cupo a otras personas interesadas, por lo que el pago no es reembolsable. Antes de inscribirte, resuelve todas tus dudas por WhatsApp.",
  },
  {
    q: "¿Hay clases los días feriados?",
    a: "No. No hay clases en feriados ni el 8 y 9 de diciembre, 24, 25, 30 y 31 de diciembre, y 1 de enero. Además hay semanas de descanso del 26 de diciembre al 1 de enero y del 1 al 5 de marzo. Las clases quedan grabadas.",
  },
];
