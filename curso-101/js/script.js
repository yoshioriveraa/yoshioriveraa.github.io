/* ============================================================
   LÓGICA DE LA PÁGINA
   La configuración editable (fechas, precio, cupos, horarios,
   WhatsApp) vive en js/config.js — este archivo no se debería
   tocar para actualizar esos datos.
   ============================================================ */

const waLink = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

document.addEventListener("DOMContentLoaded", () => {
  safeRun(initDiscountTimer);
  safeRun(initCourses);
  safeRun(initLearnCards);
  safeRun(initIncludes);
  safeRun(initPricing);
  safeRun(initFaq);
  safeRun(initAccordionGeneric);
  safeRun(initWhatsAppLinks);
  safeRun(initEnrollment);
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

/* ---------- Temporizador del descuento: termina a las 11:59 pm de Lima y se reinicia cada día ---------- */
function initDiscountTimer() {
  const boxes = document.querySelectorAll("[data-discount-timer]");
  if (!boxes.length) return;

  const DIA = 24 * 60 * 60 * 1000;
  const refs = [...boxes].map((box) => ({
    h: box.querySelector("[data-dt-h]"),
    m: box.querySelector("[data-dt-m]"),
    s: box.querySelector("[data-dt-s]"),
  }));
  const dos = (n) => String(n).padStart(2, "0");

  function tick() {
    // Hora "de pared" de Lima: lo que falta hasta la próxima medianoche allí
    const ahoraLima = Date.now() + DISCOUNT_UTC_OFFSET_HOURS * 60 * 60 * 1000;
    const total = Math.min(Math.floor((DIA - (ahoraLima % DIA)) / 1000), 86399);
    const vals = { h: Math.floor(total / 3600), m: Math.floor((total % 3600) / 60), s: total % 60 };
    refs.forEach((r) => {
      for (const k in vals) if (r[k]) r[k].textContent = dos(vals[k]);
    });
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- Cursos que abren en octubre y noviembre (agrupados por ciclo) ---------- */
function initCourses() {
  const el = document.querySelector("[data-courses-list]");
  if (!el) return;

  document.querySelectorAll("[data-price-launch]").forEach((n) => (n.textContent = PRICE_LAUNCH));
  document.querySelectorAll("[data-price-regular]").forEach((n) => (n.textContent = PRICE_REGULAR));

  const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  const fechaCorta = (dmy) => {
    const [d, m] = dmy.split("/");
    return { dia: String(Number(d)), mes: meses[Number(m) - 1] };
  };

  const cycles = [
    { id: "1", title: "Ciclo 1", sub: "Arranca el 26 de octubre" },
    { id: "2", title: "Ciclo 2", sub: "Arranca el 23 de noviembre" },
  ];
  // Los cursos "1–2" (Excel) abren en el ciclo 1
  const groupOf = (c) => (c.cycle === "2" ? "2" : "1");

  el.innerHTML = cycles
    .map((cy) => {
      const courses = OFFICIAL_COURSES.filter((c) => groupOf(c) === cy.id);
      if (courses.length === 0) return "";
      const cards = courses
        .map((c) => {
          const color = ROUTE_COLORS[c.route] || "#1e3a5f";
          const icon = ROUTE_ICONS[c.route] || "📘";
          const ini = fechaCorta(c.start);
          const fin = fechaCorta(c.end);
          return `
        <article data-animate class="relative bg-white text-ink rounded-3xl overflow-hidden flex flex-col shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition duration-300">
          <div class="relative px-5 pt-5 pb-8 text-white overflow-hidden" style="background:linear-gradient(135deg, ${color}, ${color}cc)">
            <span class="absolute -right-3 -bottom-6 text-8xl opacity-20 select-none" aria-hidden="true">${icon}</span>
            <div class="flex items-start justify-between gap-3 relative">
              <span class="text-[11px] font-extrabold uppercase tracking-widest bg-white/20 rounded-full px-3 py-1">${icon} ${c.route}</span>
              <div class="bg-white text-ink rounded-2xl text-center px-3 py-1.5 leading-none shadow-lg">
                <p class="text-[10px] font-bold text-slate-400">INICIA</p>
                <p class="text-2xl font-extrabold" style="color:${color}">${ini.dia}</p>
                <p class="text-[11px] font-extrabold">${ini.mes}</p>
              </div>
            </div>
            <h3 class="relative font-extrabold text-lg leading-snug mt-4 pr-16">${c.name}</h3>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <p class="text-sm text-slate-600">${c.learn}</p>
            <ul class="mt-4 space-y-2 text-sm">
              <li class="flex items-center gap-2"><span aria-hidden="true">📅</span><strong>${c.days}</strong></li>
              <li class="flex items-center gap-2"><span aria-hidden="true">🕒</span><span><strong>${c.time}</strong> <span class="text-slate-400">(Lima)</span></span></li>
              <li class="flex items-center gap-2"><span aria-hidden="true">🎬</span><span>${c.classes} clases · termina ${fin.dia} ${fin.mes.toLowerCase()}</span></li>
              <li class="flex items-center gap-2"><span aria-hidden="true">✅</span><span>Requisito: <strong>${c.requirement}</strong></span></li>
            </ul>
            <div class="mt-auto pt-4">
              <div class="border-t border-dashed border-slate-200 pt-4 flex items-center justify-between text-xs font-bold">
                <span class="text-slate-400">Incluido en tu suscripción</span>
                <span class="rounded-full px-3 py-1 text-white" style="background:${color}">Todo S/ ${PRICE_LAUNCH}</span>
              </div>
            </div>
          </div>
        </article>`;
        })
        .join("");
      return `
      <div>
        <div class="flex items-center gap-4 mb-6">
          <div class="shrink-0 w-14 h-14 rounded-2xl bg-amber-400 text-ink flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-amber-500/30">${cy.id}</div>
          <div>
            <h3 class="text-2xl font-extrabold leading-tight">${cy.title}</h3>
            <p class="text-amber-300 text-sm font-semibold">${cy.sub}</p>
          </div>
          <div class="hidden sm:block flex-1 h-px bg-white/15 ml-2"></div>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
      </div>`;
    })
    .join("");
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
  document.querySelectorAll("[data-wa-proof]").forEach((el) => {
    el.href = waLink(WHATSAPP_PROOF_MESSAGE);
  });
}

/* ---------- Inscripción: copiar Yape + formulario que se envía por WhatsApp ---------- */
function initEnrollment() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = "¡Copiado!";
      } catch (e) {
        btn.textContent = btn.dataset.copy;
      }
      setTimeout(() => (btn.textContent = "Copiar número"), 2500);
    });
  });

  const form = document.querySelector("[data-enroll-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const msg = [
      "Hola, ya pagué y quiero completar mi inscripción 📝",
      "• Nombre: " + d.nombre,
      "• WhatsApp: " + d.whatsapp,
      "• Correo: " + d.correo,
      "• País/ciudad: " + d.pais,
      "• Pagué con: " + d.metodo,
      d.cursos ? "• Cursos que quiero empezar: " + d.cursos : "",
    ]
      .filter(Boolean)
      .join("\n");
    trackEvent("enroll_form_submit", { metodo: d.metodo });
    window.open(waLink(msg), "_blank", "noopener");
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
