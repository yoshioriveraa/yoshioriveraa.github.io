/* ============================================================
   CONFIGURACIÓN EDITABLE — "Clases gratis: Análisis de Datos"
   Todo lo que cambia seguido (fechas, precio, cupos, WhatsApp,
   horarios) vive en este archivo. No tocar index.html ni script.js
   para actualizar esta info.

   Nota de arquitectura: este proyecto es HTML + Tailwind (CDN) +
   JS vanilla, sin build ni TypeScript (ver README del repo). Por
   eso el "archivo de datos tipado" se implementa como objetos JS
   documentados con JSDoc (da autocompletado/chequeo en editores
   compatibles) en vez de un .ts real.
   ============================================================ */

/**
 * @typedef {Object} ClassSlot
 * @property {string} time  - Horario en hora de Lima (UTC-5), ej. "9:00 - 10:00 am"
 * @property {string} topic - Tema de la clase
 */

/**
 * @typedef {Object} ClassDay
 * @property {string} day    - Ej. "Lunes 12"
 * @property {ClassSlot[]} slots
 */

/**
 * @typedef {Object} FreeWeek
 * @property {number} id
 * @property {string} title     - Ej. "Semana 1: ¿Para qué sirve cada herramienta?"
 * @property {string} dateRange - Ej. "12 al 16 de octubre"
 * @property {ClassDay[]} days
 */

// Número real de WhatsApp (código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "51900604267";

// Mensaje prellenado para el botón de WhatsApp tras registrarse en las clases gratis
const WHATSAPP_MESSAGE_REGISTRO = (nombre) =>
  `Hola, me registré en las clases gratis y quiero más información${nombre ? ` (soy ${nombre})` : ""}`;

// Mensaje prellenado para el CTA de "Ver cursos y precio"
const WHATSAPP_MESSAGE_CURSOS = "Hola, quiero más información sobre la suscripción con acceso a todos los cursos 🚀";

// ---------- Google Forms (backend de leads) ----------
// TODO: reemplaza con tu propio formulario de Google.
// 1. Crea un Google Form con 3 preguntas de texto corto: Nombre, WhatsApp, Correo.
// 2. Publícalo y ábrelo como lo vería un estudiante (no en modo edición).
// 3. Click derecho → "Ver código fuente de la página" (o F12 → pestaña Elements) y busca
//    "entry." — cada <input> de pregunta tiene un atributo name="entry.123456789".
//    Copia esos 3 números abajo, en el mismo orden que tus preguntas.
// 4. La URL de envío es la misma del formulario, cambiando "/viewform" por "/formResponse".
// Mientras GOOGLE_FORM_ACTION_URL esté vacío, el formulario de esta página NO intenta
// guardar nada en Google Forms: solo valida y abre WhatsApp (comportamiento actual).
const GOOGLE_FORM_ACTION_URL = ""; // ej: "https://docs.google.com/forms/d/e/TU_ID_AQUI/formResponse"
const GOOGLE_FORM_ENTRY_IDS = {
  nombre: "", // ej: "entry.123456789"
  whatsapp: "", // ej: "entry.987654321"
  correo: "", // ej: "entry.456789123"
};

// Inicio de las clases gratis en vivo: 12 de octubre de 2026, 9:00 am (hora de Lima, UTC-5)
const FREE_CLASSES_START = new Date("2026-10-12T09:00:00-05:00");

// Inicio de las clases oficiales (temario completo)
const OFFICIAL_CLASSES_START_LABEL = "26 de octubre de 2026";

// Fecha límite de la suscripción (pago único, acceso hasta esta fecha)
const SUBSCRIPTION_ACCESS_UNTIL_LABEL = "20 de marzo de 2027";

// Costo del certificado de finalización, por cada curso completado (no está incluido en la suscripción)
const CERTIFICATE_PRICE = 30;

// ---------- Precio y cupos de lanzamiento ----------
// Precio regular (ancla) y precio de lanzamiento con 50% de descuento
const PRICE_REGULAR = 200;
const PRICE_LAUNCH = 100;

// Cupos totales de lanzamiento con el precio de S/100
const CUPOS_LANZAMIENTO_TOTALES = 50;

// TODO: actualiza este número según las inscripciones reales confirmadas.
// Empieza en 0 — NO inventar cifras. Cuando llegue a CUPOS_LANZAMIENTO_TOTALES,
// la tarjeta de precio cambia automáticamente a PRICE_REGULAR.
const CUPOS_LANZAMIENTO_VENDIDOS = 0;

/** @type {FreeWeek[]} */
const FREE_WEEKS = [
  {
    id: 1,
    title: "Semana 1 · ¿Para qué sirve cada herramienta?",
    dateRange: "12 al 16 de octubre",
    days: [
      {
        day: "Lunes 12",
        slots: [
          { time: "9:00 - 10:00 am", topic: "¿Qué es el análisis de datos?" },
          { time: "11:00 pm - 12:00 am", topic: "Excel: para qué sirve y 3 trucos" },
          { time: "3:00 - 4:00 pm", topic: "Power BI: qué es y qué dashboards puedes crear" },
        ],
      },
      {
        day: "Martes 13",
        slots: [
          { time: "9:00 - 10:00 am", topic: "SQL: dónde viven los datos de una empresa" },
          { time: "11:00 pm - 12:00 am", topic: "Python: qué puedes hacer con él" },
          { time: "3:00 - 4:00 pm", topic: "Looker Studio: reportes profesionales gratis" },
        ],
      },
      {
        day: "Miércoles 14",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Google Sheets: automatiza tu hoja" },
          { time: "11:00 pm - 12:00 am", topic: "Gráficas con Python" },
          { time: "3:00 - 4:00 pm", topic: "Estadística: cómo leer datos sin que te engañen" },
        ],
      },
      {
        day: "Jueves 15",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Automatizaciones con Python" },
          { time: "11:00 pm - 12:00 am", topic: "Machine Learning: cómo predice un modelo" },
          { time: "3:00 - 4:00 pm", topic: "GitHub: guarda y muestra tus proyectos" },
        ],
      },
      {
        day: "Viernes 16",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Matemáticas básicas para datos" },
          { time: "11:00 pm - 12:00 am", topic: "Ruta del analista de datos" },
          { time: "3:00 - 4:00 pm", topic: "Demo: de un Excel desordenado a un dashboard" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Semana 2 · Clases prácticas",
    dateRange: "19 al 23 de octubre",
    days: [
      {
        day: "Lunes 19",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Matemáticas básicas" },
          { time: "11:00 pm - 12:00 am", topic: "Python: Pandas" },
          { time: "3:00 - 4:00 pm", topic: "Python: gráficas" },
          { time: "7:00 - 8:00 pm", topic: "Excel básico" },
        ],
      },
      {
        day: "Martes 20",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Excel intermedio" },
          { time: "11:00 pm - 12:00 am", topic: "GitHub desde cero" },
          { time: "3:00 - 4:00 pm", topic: "Looker Studio" },
          { time: "7:00 - 8:00 pm", topic: "Power BI: tu primer dashboard" },
        ],
      },
      {
        day: "Miércoles 21",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Power BI" },
          { time: "11:00 pm - 12:00 am", topic: "Python: automatizaciones" },
          { time: "3:00 - 4:00 pm", topic: "Estadística con Python" },
          { time: "7:00 - 8:00 pm", topic: "SQL con PostgreSQL" },
        ],
      },
      {
        day: "Jueves 22",
        slots: [
          { time: "9:00 - 10:00 am", topic: "SQL con PostgreSQL" },
          { time: "11:00 pm - 12:00 am", topic: "Excel básico" },
          { time: "3:00 - 4:00 pm", topic: "Intro a Machine Learning" },
          { time: "7:00 - 8:00 pm", topic: "Python: Pandas" },
        ],
      },
      {
        day: "Viernes 23",
        slots: [
          { time: "9:00 - 10:00 am", topic: "Python: gráficas" },
          { time: "11:00 pm - 12:00 am", topic: "GitHub" },
          { time: "3:00 - 4:00 pm", topic: "Python: automatizaciones" },
          { time: "7:00 - 8:00 pm", topic: "Machine Learning: modelo predictivo" },
        ],
      },
    ],
  },
];

// Aviso sobre los horarios de los cursos de la suscripción
const SUBSCRIPTION_SCHEDULE_NOTE =
  "Cada curso tiene su propio horario (no todos se dictan al mismo tiempo), así que puedes ir sumando cursos según tu disponibilidad.";

/** Temas oficiales que entran con la suscripción (desde el 26 de octubre) — cada uno en su propio horario */
const SUBSCRIPTION_TOPICS = [
  { icon: "📊", name: "Excel básico, intermedio y avanzado" },
  { icon: "📈", name: "Power BI — niveles 1, 2 y 3" },
  { icon: "🗄️", name: "SQL con PostgreSQL" },
  { icon: "🐍", name: "Python — manipulación de datos" },
  { icon: "📉", name: "Python para gráficas y estadística" },
  { icon: "🧮", name: "Python para matemáticas" },
  { icon: "➗", name: "Fundamentos de matemáticas aplicada" },
  { icon: "📐", name: "Estadística descriptiva" },
  { icon: "📏", name: "Estadística inferencial" },
  { icon: "⚙️", name: "Python — automatizaciones" },
  { icon: "📧", name: "Automatizaciones con Gmail" },
  { icon: "💬", name: "Automatizaciones con WhatsApp" },
  { icon: "🤖", name: "Machine Learning y modelos predictivos" },
  { icon: "📑", name: "Looker Studio y Google Sheets" },
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
    a: "No, ninguna. Las clases gratis están pensadas para quien nunca ha usado datos. Empezamos desde cero y avanzamos paso a paso.",
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
    a: "Por Yape, Plin o transferencia bancaria. Escríbenos por WhatsApp con la palabra INSCRIPCIÓN y te enviamos los datos para pagar.",
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
