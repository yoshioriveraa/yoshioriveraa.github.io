/* ══════════════════════════════════════════════
   Leonardo Rivera Agarie — Portfolio JS
══════════════════════════════════════════════ */

// ─── CUSTOM CURSOR ───
const cursorDot = document.getElementById('cursorDot');
if (cursorDot && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseenter', () => cursorDot.style.opacity = '1');
  document.addEventListener('mouseleave', () => cursorDot.style.opacity = '0');
}

// ─── TYPEWRITER ───
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'Analista de Datos',
  'Automatización con Python',
  'SQL & Dashboards',
  'ETL & Data Pipelines',
  'Creador de Contenido Tech',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeWriter() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typedTextEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typedTextEl.textContent = current.substring(0, charIndex);
  }

  let delay = isDeleting ? 45 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimeout = setTimeout(typeWriter, delay);
}

if (typedTextEl) {
  setTimeout(typeWriter, 700);
}

// ─── NAV SCROLL EFFECT ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ─── MOBILE NAV TOGGLE ───
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });

  // Close on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      navMobile.classList.remove('open');
    }
  });
}

// ─── SMOOTH SCROLL FOR NAV LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── REVEAL ON SCROLL ───
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within same parent
        entry.target.style.transitionDelay = (i * 0.05) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ─── PROJECT FILTER ───
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => activeSectionObserver.observe(section));

// ─── CONTACT FORM ───
async function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  const note = document.getElementById('formNote');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    note.textContent = '⚠ Por favor completa todos los campos requeridos.';
    note.style.color = '#f87171';
    return;
  }

  btn.textContent = 'Enviando...';
  btn.disabled = true;
  note.textContent = '';

  try {
    const response = await fetch('https://formspree.io/f/xnjwlpje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (response.ok) {
      btn.innerHTML = 'Mensaje enviado <i class="fa-solid fa-check"></i>';
      btn.style.background = 'var(--green)';
      note.textContent = '✓ Gracias por escribir. Te respondo en breve.';
      note.style.color = 'var(--green)';

      setTimeout(() => {
        btn.innerHTML = 'Enviar mensaje <i class="fa-solid fa-paper-plane"></i>';
        btn.style.background = '';
        btn.disabled = false;
        note.textContent = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
      }, 3500);
    } else {
      throw new Error('Error del servidor');
    }
  } catch (err) {
    btn.innerHTML = 'Enviar mensaje <i class="fa-solid fa-paper-plane"></i>';
    btn.style.background = '';
    btn.disabled = false;
    note.textContent = '✗ Hubo un error al enviar. Intenta de nuevo.';
    note.style.color = '#f87171';
  }
}

// ─── STAT COUNTER ANIMATION ───
function animateCounter(el, target, duration = 1400) {
  const suffix = el.textContent.replace(/[0-9]/g, '');
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * parseInt(target)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}


const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const value = el.textContent;
      const num = parseInt(value);
      if (!isNaN(num)) {
        animateCounter(el, num);
      }
      statsObserver.unobserve(el);
      
    }
  });
}, { threshold: 0.5 });




statNums.forEach(el => statsObserver.observe(el));

// ─── STAGGER REVEAL FOR GRIDS ───
// Add delay stagger to grid children
document.querySelectorAll('.projects-grid, .edu-grid, .stack-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.reveal');
  cards.forEach((card, i) => {
    card.style.transitionDelay = (i * 0.07) + 's';
  });
});
