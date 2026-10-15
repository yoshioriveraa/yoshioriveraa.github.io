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
const OFFICIAL_CLASSES_START_LABEL = "26 de octubre de 2026";

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

/**
 * @typedef {Object} OfficialCourse
 * @property {string} cycle        - Ciclo ("1", "2", "1–2")
 * @property {string} route        - Ruta / herramienta (clave de ROUTE_COLORS)
 * @property {string} name
 * @property {string} days
 * @property {string} time         - Hora de Lima (UTC-5)
 * @property {number} classes      - Número de clases
 * @property {string} start        - Inicio, dd/mm/aaaa
 * @property {string} end          - Fin, dd/mm/aaaa
 * @property {string} requirement
 * @property {string} learn        - Qué aprenderás
 */

/** Color de la etiqueta de cada ruta */
const ROUTE_COLORS = {
  "Matemática y Estadística": "#c9573f",
  Python: "#1f5fa8",
  SQL: "#2e7d32",
  Excel: "#00796b",
};

/** Ícono grande de cada ruta */
const ROUTE_ICONS = {
  "Matemática y Estadística": "🧮",
  Python: "🐍",
  SQL: "🗄️",
  Excel: "📊",
};

/** @type {OfficialCourse[]} Cursos que abren en octubre y noviembre (cada fila es un grupo) */
const OFFICIAL_COURSES = [
  {
    cycle: "1", route: "Matemática y Estadística", name: "Matemática aplicada 1",
    days: "Lun a vie", time: "4:30 – 5:30 pm", classes: 10, start: "26/10/2026", end: "06/11/2026",
    requirement: "Ninguno", learn: "Álgebra, funciones y porcentajes aplicados a datos y negocios.",
  },
  {
    cycle: "1", route: "Python", name: "Python Básico 1 · Tu primer programa desde cero",
    days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 12, start: "26/10/2026", end: "19/11/2026",
    requirement: "Ninguno", learn: "Variables, condicionales y bucles. Resuelves ejercicios reales desde la primera clase.",
  },
  {
    cycle: "1", route: "SQL", name: "SQL Básico 1 · Consultas con PostgreSQL",
    days: "Lun, mar y jue", time: "7:30 – 8:30 pm", classes: 12, start: "26/10/2026", end: "19/11/2026",
    requirement: "Ninguno", learn: "SELECT, filtros, orden y funciones. Instalas PostgreSQL y consultas datos reales.",
  },
  {
    cycle: "1–2", route: "Excel", name: "Excel Básico · Tablas, fórmulas y gráficos",
    days: "Mié y vie", time: "9:00 – 10:00 am", classes: 16, start: "28/10/2026", end: "23/12/2026",
    requirement: "Ninguno", learn: "Fórmulas, formatos, tablas y gráficos para trabajar con orden y rapidez.",
  },
  {
    cycle: "1", route: "Matemática y Estadística", name: "Introducción a la Estadística",
    days: "Lun a vie", time: "4:30 – 5:30 pm", classes: 10, start: "09/11/2026", end: "20/11/2026",
    requirement: "Ninguno", learn: "Promedios, dispersión, probabilidad básica y cómo leer datos sin que te engañen.",
  },
  {
    cycle: "2", route: "Python", name: "Python Básico 1 · Tu primer programa desde cero",
    days: "Lun, mar y jue", time: "6:00 – 7:00 pm", classes: 12, start: "23/11/2026", end: "21/12/2026",
    requirement: "Ninguno", learn: "Variables, condicionales y bucles. Resuelves ejercicios reales desde la primera clase.",
  },
  {
    cycle: "2", route: "SQL", name: "SQL Básico 1 · Consultas con PostgreSQL",
    days: "Lun, mar y jue", time: "7:30 – 8:30 pm", classes: 12, start: "23/11/2026", end: "21/12/2026",
    requirement: "Ninguno", learn: "SELECT, filtros, orden y funciones. Instalas PostgreSQL y consultas datos reales.",
  },
  {
    cycle: "2", route: "Python", name: "Python Básico 2 · Funciones, listas y diccionarios",
    days: "Mié y vie", time: "5:30 – 7:00 pm", classes: 8, start: "25/11/2026", end: "23/12/2026",
    requirement: "Python Básico 1", learn: "Funciones, estructuras de datos y manejo de archivos para automatizar tareas.",
  },
  {
    cycle: "2", route: "SQL", name: "SQL Básico 2 · JOINs y agrupaciones",
    days: "Mié y vie", time: "7:15 – 8:45 pm", classes: 8, start: "25/11/2026", end: "23/12/2026",
    requirement: "SQL Básico 1", learn: "Unes tablas y resumes datos de un negocio: ventas, inventario y clientes.",
  },
];

/** Temas oficiales que entran con la suscripción (desde el 26 de octubre) — cada uno en su propio horario */
const SUBSCRIPTION_TOPICS = [
  { icon: "📊", name: "Excel básico e intermedio" },
  { icon: "📈", name: "Power BI" },
  { icon: "🗄️", name: "SQL con PostgreSQL" },
  { icon: "🐍", name: "Python — manipulación de datos" },
  { icon: "📉", name: "Python para gráficas y estadística" },
  { icon: "➗", name: "Fundamentos de matemáticas aplicada" },
  { icon: "📐", name: "Estadística descriptiva" },
  { icon: "📏", name: "Estadística inferencial" },
  { icon: "🤖", name: "Machine Learning y modelos predictivos" },
  { icon: "📑", name: "Looker Studio" },
  { icon: "🐙", name: "GitHub" },
  { icon: "🌐", name: "HTML y CSS" },
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
    a: 'No. No dictamos clases en los feriados oficiales del calendario peruano, según el listado publicado en <a href="https://www.gob.pe/feriados" target="_blank" rel="noopener" class="text-brand font-semibold underline">gob.pe/feriados</a>. Esas fechas se reprograman o se compensan con el material grabado.',
  },
];
