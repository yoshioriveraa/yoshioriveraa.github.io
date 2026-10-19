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

/* ---------- Cursos de noviembre a marzo (agrupados por mes de inicio) ---------- */
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

  const mesesLargo = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const orden = (dmy) => {
    const [d, m, y] = dmy.split("/").map(Number);
    return y * 10000 + m * 100 + d;
  };

  // Un bloque por mes de inicio, con los grupos ordenados por fecha
  const porMes = new Map();
  [...OFFICIAL_COURSES]
    .sort((x, y) => orden(x.start) - orden(y.start))
    .forEach((c) => {
      const [, m, y] = c.start.split("/").map(Number);
      const key = `${y}-${m}`;
      if (!porMes.has(key)) porMes.set(key, { m, y, courses: [] });
      porMes.get(key).courses.push(c);
    });

  el.innerHTML = [...porMes.values()]
    .map((mes, i) => {
      const cards = mes.courses
        .map((c) => {
          const color = ROUTE_COLORS[c.route] || "#4da3ff";
          const ini = fechaCorta(c.start);
          const fin = fechaCorta(c.end);
          const temas = (SYLLABI[c.syllabus] || [])
            .map((t, n) => `<li><i>${String(n + 1).padStart(2, "0")}</i>${t}</li>`)
            .join("");
          return `
        <article class="course" style="--c:${color}">
          <div class="course-top">
            <span class="chip">${c.route}</span>
            <div class="date"><small>INICIA</small><b>${ini.dia}</b><span>${ini.mes}</span></div>
          </div>
          <h4>${c.name}</h4>
          <p class="learn">${c.learn}</p>
          <ul>
            <li><span>días</span><b>${c.days}</b></li>
            <li><span>hora</span><b>${c.time} (Lima)</b></li>
            <li><span>clases</span><b>${c.classes} de ${c.dur} · termina ${fin.dia} ${fin.mes.toLowerCase()}</b></li>
            <li><span>requisito</span><b>${c.requirement}</b></li>
          </ul>
          <details class="syl">
            <summary>Ver temario<span class="syl-n">${c.classes} clases</span></summary>
            <ol>${temas}</ol>
          </details>
          <div class="course-foot"><span>Incluido en tu membresía</span><b>Todo S/ ${PRICE_LAUNCH}</b></div>
        </article>`;
        })
        .join("");
      return `
      <div class="month-panel" data-month-panel="${i}"${i === 0 ? "" : " hidden"}>
        <div class="carousel">
          <div class="car-bar">
            <p class="car-count"><b>${mes.courses.length}</b> ${mes.courses.length === 1 ? "curso" : "cursos"} · <span data-car-pos>1</span> de ${mes.courses.length}</p>
            <div class="car-ctrl">
              <button type="button" class="car-btn" data-car-prev aria-label="Cursos anteriores"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
              <button type="button" class="car-btn" data-car-next aria-label="Cursos siguientes"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
            </div>
          </div>
          <div class="courses" data-car-track tabindex="0">${cards}</div>
        </div>
      </div>`;
    })
    .join("");

  const nombreMes = (mes) => mesesLargo[mes.m - 1].charAt(0).toUpperCase() + mesesLargo[mes.m - 1].slice(1);
  const tabs = [...porMes.values()]
    .map(
      (mes, i) => `
      <button type="button" role="tab" class="month-tab${i === 0 ? " on" : ""}" data-month-tab="${i}" aria-selected="${i === 0}">
        ${nombreMes(mes)} <small>${mes.y}</small><span>${mes.courses.length}</span>
      </button>`
    )
    .join("");

  el.innerHTML = `<div class="month-tabs" role="tablist" aria-label="Mes de inicio">${tabs}</div>${el.innerHTML}`;

  const tabEls = el.querySelectorAll("[data-month-tab]");
  const panels = el.querySelectorAll("[data-month-panel]");
  tabEls.forEach((t) =>
    t.addEventListener("click", () => {
      tabEls.forEach((x) => {
        x.classList.toggle("on", x === t);
        x.setAttribute("aria-selected", x === t ? "true" : "false");
      });
      panels.forEach((p) => {
        p.hidden = p.dataset.monthPanel !== t.dataset.monthTab;
        if (!p.hidden) {
          p.querySelector("[data-car-track]").scrollLeft = 0;
          if (p.__actualizarCarrusel) p.__actualizarCarrusel();
        }
      });
    })
  );
  panels.forEach((p) => {
    const track = p.querySelector("[data-car-track]");
    const prev = p.querySelector("[data-car-prev]");
    const next = p.querySelector("[data-car-next]");
    const pos = p.querySelector("[data-car-pos]");
    const paso = () => {
      const card = track.querySelector(".course");
      return card ? card.getBoundingClientRect().width + 16 : 300;
    };
    const actualizar = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
      pos.textContent = Math.min(Math.round(track.scrollLeft / paso()) + 1, track.children.length);
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -paso(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: paso(), behavior: "smooth" }));
    track.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    p.__actualizarCarrusel = actualizar;
    actualizar();
  });
}

/* ---------- Tarjetas "Qué vas a aprender" ---------- */
function initLearnCards() {
  const el = document.querySelector("[data-learn-cards]");
  if (el) {
    el.innerHTML = SUBSCRIPTION_TOPICS.map(
      (t, i) => `
      <div data-animate class="tile">
        <small>${String(i + 1).padStart(2, "0")}</small>
        <b>${t.name}</b>
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
  el.innerHTML = SUBSCRIPTION_INCLUDES.map((i) => `<li data-animate>${i.text}</li>`).join("");
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
    (item) => `
    <details data-animate>
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>`
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

/* ---------- Inscripción: copiar el número de Yape ---------- */
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

}

/* ---------- Tracking de clicks a WhatsApp + eventos de analítica ---------- */
// Un solo listener delegado en el documento: cada clic dispara un único evento.
// - Botones de inscripción ([data-wa-cta]) -> Lead
// - Botón de enviar captura ([data-wa-proof]) -> PagoEnviado (evento personalizado, no Lead)
function initWhatsAppTracking() {
  document.addEventListener("click", (e) => {
    const proof = e.target.closest("[data-wa-proof]");
    const cta = proof ? null : e.target.closest("[data-wa-cta]");
    const el = proof || cta;
    if (!el) return;
    const label = el.dataset.ctaLabel || el.textContent.trim();
    trackEvent(proof ? "PagoEnviado" : "Lead", { cta: label });
  });
}

/**
 * Hook central de analítica (Meta Pixel). Lead es evento estándar;
 * PagoEnviado es personalizado (trackCustom).
 */
function trackEvent(name, params = {}) {
  console.log(`[tracking] ${name}`, params);
  if (typeof fbq === "function") {
    if (name === "Lead") fbq("track", "Lead", params);
    else fbq("trackCustom", name, params);
  }
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
