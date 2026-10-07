/* ============================================================
   LÓGICA DE LA PÁGINA
   La configuración editable (fechas, precio, cupos, horarios,
   WhatsApp) vive en js/config.js — este archivo no se debería
   tocar para actualizar esos datos.
   ============================================================ */

const waLink = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

document.addEventListener("DOMContentLoaded", () => {
  safeRun(initCountdown);
  safeRun(initSchedule);
  safeRun(initLearnCards);
  safeRun(initIncludes);
  safeRun(initPricing);
  safeRun(initFaq);
  safeRun(initAccordionGeneric);
  safeRun(initWhatsAppLinks);
  safeRun(initWhatsAppTracking);
  safeRun(initScrollAnimations);
  safeRun(initMobileMenu);
});

function safeRun(fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[error] Falló ${fn.name}:`, err);
  }
}

/* ---------- Countdown al inicio de las clases gratis ---------- */
function initCountdown() {
  const elDias = document.querySelector("[data-cd-dias]");
  const elHoras = document.querySelector("[data-cd-horas]");
  const elMin = document.querySelector("[data-cd-min]");
  const elSeg = document.querySelector("[data-cd-seg]");
  const contenedor = document.querySelector("[data-countdown]");

  if (!elDias || !elHoras || !elMin || !elSeg) return;

  function tick() {
    const ahora = new Date().getTime();
    const distancia = FREE_CLASSES_START.getTime() - ahora;

    if (distancia <= 0) {
      if (contenedor) {
        contenedor.innerHTML =
          '<p class="text-lg font-semibold text-brand-dark">¡Las clases gratis ya empezaron! Escríbenos para saber cómo unirte 🚀</p>';
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

/* ---------- Cuadro de clases gratis (tabs por semana) ---------- */
function initSchedule() {
  const tabsEl = document.querySelector("[data-week-tabs]");
  const panelsEl = document.querySelector("[data-week-panels]");
  if (!tabsEl || !panelsEl) return;

  tabsEl.innerHTML = "";
  panelsEl.innerHTML = "";

  FREE_WEEKS.forEach((week, index) => {
    const isActive = index === 0;

    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.dataset.weekTab = week.id;
    tabBtn.setAttribute("aria-selected", String(isActive));
    tabBtn.className = `week-tab ${isActive ? "week-tab-active" : ""}`;
    tabBtn.innerHTML = `${week.title}<span class="block text-xs font-normal opacity-80 mt-0.5">${week.dateRange}</span>`;
    tabsEl.appendChild(tabBtn);

    const panel = document.createElement("div");
    panel.dataset.weekPanel = week.id;
    panel.className = isActive ? "" : "hidden";
    panel.innerHTML = week.days
      .map(
        (day) => `
        <div class="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
          <p class="font-bold text-ink mb-3">${day.day}</p>
          <ul class="space-y-2">
            ${day.slots
              .map(
                (slot) => `
              <li class="flex gap-3 text-sm">
                <span class="shrink-0 font-mono text-xs text-brand-dark bg-brand-light rounded-lg px-2 py-1 whitespace-nowrap">${slot.time}</span>
                <span class="text-slate-600">${slot.topic}</span>
              </li>`
              )
              .join("")}
          </ul>
        </div>`
      )
      .join("");
    panel.className += " grid gap-4 sm:grid-cols-2";
    panelsEl.appendChild(panel);
  });

  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-week-tab]");
    if (!btn) return;
    const id = btn.dataset.weekTab;

    tabsEl.querySelectorAll("[data-week-tab]").forEach((el) => {
      const active = el.dataset.weekTab === id;
      el.classList.toggle("week-tab-active", active);
      el.setAttribute("aria-selected", String(active));
    });
    panelsEl.querySelectorAll("[data-week-panel]").forEach((el) => {
      el.classList.toggle("hidden", el.dataset.weekPanel !== id);
    });
  });
}

/* ---------- Tarjetas "Qué vas a aprender" ---------- */
function initLearnCards() {
  const el = document.querySelector("[data-learn-cards]");
  if (el) {
    el.innerHTML = SUBSCRIPTION_TOPICS.map(
      (t) => `
      <div data-animate class="rounded-2xl border border-slate-100 hover:border-brand/40 hover:shadow-lg transition p-6 text-center">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-brand-light text-brand flex items-center justify-center text-2xl mb-4" aria-hidden="true">${t.icon}</div>
        <p class="font-bold text-sm sm:text-base">${t.name}</p>
      </div>`
    ).join("");
  }

  const noteEl = document.querySelector("[data-subscription-schedule-note]");
  if (noteEl) noteEl.textContent = SUBSCRIPTION_SCHEDULE_NOTE;
}

/* ---------- Qué incluye tu suscripción ---------- */
function initIncludes() {
  const el = document.querySelector("[data-includes-list]");
  if (!el) return;
  el.innerHTML = SUBSCRIPTION_INCLUDES.map(
    (i) => `
    <li data-animate class="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
      <span class="text-2xl" aria-hidden="true">${i.icon}</span>
      <span class="text-white/80 text-sm sm:text-base">${i.text}</span>
    </li>`
  ).join("");
}

/* ---------- Precio: cupos de lanzamiento ---------- */
function initPricing() {
  const restantes = Math.max(CUPOS_LANZAMIENTO_TOTALES - CUPOS_LANZAMIENTO_VENDIDOS, 0);
  const agotado = restantes <= 0;

  document.querySelectorAll("[data-cupos-restantes]").forEach((el) => {
    el.textContent = restantes;
  });

  const porcentaje = Math.min(
    100,
    Math.round((CUPOS_LANZAMIENTO_VENDIDOS / CUPOS_LANZAMIENTO_TOTALES) * 100)
  );
  document.querySelectorAll("[data-cupos-barra]").forEach((el) => {
    el.style.width = `${porcentaje}%`;
  });

  const precioAncla = document.querySelector("[data-precio-ancla]");
  const precioFinal = document.querySelector("[data-precio-final]");
  const badgeLanzamiento = document.querySelector("[data-badge-lanzamiento]");
  const bloquesCupos = document.querySelectorAll("[data-bloque-cupos]");

  if (agotado) {
    if (precioAncla) precioAncla.classList.add("hidden");
    if (precioFinal) precioFinal.textContent = `S/ ${PRICE_REGULAR}`;
    if (badgeLanzamiento) badgeLanzamiento.classList.add("hidden");
    bloquesCupos.forEach((el) => el.classList.add("hidden"));
  } else {
    if (precioFinal) precioFinal.textContent = `S/ ${PRICE_LAUNCH}`;
  }

  document.querySelectorAll("[data-subscripcion-hasta]").forEach((el) => {
    el.textContent = SUBSCRIPTION_ACCESS_UNTIL_LABEL;
  });
  document.querySelectorAll("[data-clases-oficiales-desde]").forEach((el) => {
    el.textContent = OFFICIAL_CLASSES_START_LABEL;
  });
}

/* ---------- FAQ (contenido desde config.js) ---------- */
function initFaq() {
  const el = document.querySelector("[data-faq-list]");
  if (!el) return;
  el.innerHTML = FAQ_ITEMS.map(
    (item, i) => `
    <div data-animate class="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <button data-accordion-trigger aria-expanded="false" class="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold">
        ${item.q}
        <svg data-accordion-icon class="w-5 h-5 shrink-0 text-slate-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div data-accordion-panel class="px-5">
        <p class="pb-5 text-sm text-slate-600 border-t border-slate-100 pt-4">${item.a}</p>
      </div>
    </div>`
  ).join("");
}

/* ---------- Acordeones genéricos (FAQ) ---------- */
function initAccordionGeneric() {
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

/* ---------- Botón único de WhatsApp (sin formulario: no se guarda ningún dato) ---------- */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa-cta]").forEach((el) => {
    el.href = waLink(WHATSAPP_MESSAGE);
  });
}

/* ---------- Tracking de clicks a WhatsApp + eventos de analítica ---------- */
function initWhatsAppTracking() {
  document.querySelectorAll("a[href*='wa.me']").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.dataset.ctaLabel || el.textContent.trim();
      trackEvent("cta_click", { cta: label });
    });
  });
}

/**
 * Hook central de analítica. Hoy solo loguea en consola; cuando se
 * active Meta Pixel / Google Analytics, se dispara aquí también.
 */
function trackEvent(name, params = {}) {
  console.log(`[tracking] ${name}`, params);
  // TODO: cuando tengas Meta Pixel instalado:
  // if (typeof fbq === "function") fbq("track", "Contact", params);
  // TODO: cuando tengas Google Analytics (gtag.js) instalado:
  // if (typeof gtag === "function") gtag("event", name, params);
}

/* ---------- Animaciones al hacer scroll ---------- */
function initScrollAnimations() {
  const elementos = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window) || elementos.length === 0) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

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
