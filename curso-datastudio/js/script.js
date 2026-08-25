/* ============================================================
   CONFIGURACIÓN EDITABLE
   Todo lo que necesitas cambiar antes de publicar está aquí arriba.
   ============================================================ */

// Número real de WhatsApp (código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "51900604267";

// Mensaje predefinido que se envía al hacer click en cualquier botón CTA
const WHATSAPP_MESSAGE = "Hola, quiero mi cupo para el curso de Looker Studio 🚀";

// Fecha y hora de inicio del curso (formato ISO). Se usa para el countdown del Hero.
// 18 de agosto de 2026, 7:00 pm hora Perú (UTC-5)
const COURSE_START_DATE = new Date("2026-08-18T19:00:00-05:00");

// TODO: Cupos totales y cupos restantes disponibles. Edita CUPOS_RESTANTES según inscripciones reales.
const CUPOS_TOTALES = 25;
const CUPOS_RESTANTES = 15;

/* ============================================================
   FIN DE CONFIGURACIÓN EDITABLE
   ============================================================ */

const waLink = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

document.addEventListener("DOMContentLoaded", () => {
  safeRun(initWhatsAppLinks);
  safeRun(initCupos);
  safeRun(initCountdown);
  safeRun(initAccordion);
  safeRun(initScrollAnimations);
  safeRun(initMobileMenu);
});

// Aísla cada init: si uno falla, no bloquea a los demás (evita que un error
// deje el resto de la página sin inicializar).
function safeRun(fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[error] Falló ${fn.name}:`, err);
  }
}

/* ---------- Links de WhatsApp ---------- */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa-cta]").forEach((el) => {
    el.href = waLink(WHATSAPP_MESSAGE);
  });

  // Tracking de clicks a WhatsApp (consola + hook para Meta Pixel / GA4 si se agrega después)
  document.querySelectorAll("a[href*='wa.me']").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.dataset.ctaLabel || el.textContent.trim();
      console.log(`[tracking] Click en CTA de WhatsApp: ${label}`);

      // TODO: si usas Meta Pixel o Google Analytics, dispara el evento aquí, ej:
      // if (typeof fbq === "function") fbq("track", "Lead", { content_name: label });
      // if (typeof gtag === "function") gtag("event", "generate_lead", { cta: label });
    });
  });
}

/* ---------- Contador de cupos restantes ---------- */
function initCupos() {
  const restantes = Math.max(CUPOS_RESTANTES, 0);
  document.querySelectorAll("[data-cupos-restantes]").forEach((el) => {
    el.textContent = restantes;
  });
  document.querySelectorAll("[data-cupos-totales]").forEach((el) => {
    el.textContent = CUPOS_TOTALES;
  });

  const porcentaje = Math.min(
    100,
    Math.round(((CUPOS_TOTALES - restantes) / CUPOS_TOTALES) * 100)
  );
  document.querySelectorAll("[data-cupos-barra]").forEach((el) => {
    el.style.width = `${porcentaje}%`;
  });
}

/* ---------- Countdown al inicio del curso ---------- */
function initCountdown() {
  const elDias = document.querySelector("[data-cd-dias]");
  const elHoras = document.querySelector("[data-cd-horas]");
  const elMin = document.querySelector("[data-cd-min]");
  const elSeg = document.querySelector("[data-cd-seg]");
  const contenedor = document.querySelector("[data-countdown]");

  if (!elDias || !elHoras || !elMin || !elSeg) return;

  function tick() {
    const ahora = new Date().getTime();
    const distancia = COURSE_START_DATE.getTime() - ahora;

    if (distancia <= 0) {
      if (contenedor) {
        contenedor.innerHTML =
          '<p class="text-lg font-semibold text-emerald-600">¡El curso ya ha comenzado! Escríbenos para saber cómo unirte 🚀</p>';
      }
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    elDias.textContent = String(dias).padStart(2, "0");
    elHoras.textContent = String(horas).padStart(2, "0");
    elMin.textContent = String(minutos).padStart(2, "0");
    elSeg.textContent = String(segundos).padStart(2, "0");
  }

  tick();
  const intervalo = setInterval(tick, 1000);
}

/* ---------- Acordeones (temario y FAQ) ---------- */
function initAccordion() {
  document.querySelectorAll("[data-accordion-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;
      const icon = trigger.querySelector("[data-accordion-icon]");
      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";

      if (isOpen) {
        panel.style.maxHeight = "0px";
        trigger.setAttribute("aria-expanded", "false");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

/* ---------- Animaciones al hacer scroll (Intersection Observer) ---------- */
function initScrollAnimations() {
  const elementos = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window) || elementos.length === 0) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Solo a partir de aquí el CSS oculta los elementos para animarlos.
  // Si el script no llega a ejecutar esta función, el contenido queda
  // visible por defecto (ver css/style.css).
  document.documentElement.classList.add("js-animate-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  elementos.forEach((el) => observer.observe(el));

  // Red de seguridad: algunos navegadores internos (WhatsApp, Instagram, TikTok)
  // no disparan el IntersectionObserver de forma confiable. Si algo se quedó
  // sin revelar, se muestra igual pasado un momento.
  setTimeout(() => {
    elementos.forEach((el) => el.classList.add("is-visible"));
  }, 2500);
}

/* ---------- Menú móvil ---------- */
function initMobileMenu() {
  const btn = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}
