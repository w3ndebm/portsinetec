// ==========================================
// ANIMAÇÕES — Reveal, Contadores, Scroll
// ==========================================

// ===== REVEAL =====
const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('active'), i * 80);
    }
  });
}, { threshold: 0.1 });

function observarReveals() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('active')) {
      observerReveal.observe(el);
    }
  });
}

// ===== CONTADORES =====
function animarContador(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = prefix + current + suffix;
  }, 25);
}

const observerCounter = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      observerCounter.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function observarContadores() {
  document.querySelectorAll('.num[data-target]').forEach(el => {
    observerCounter.observe(el);
  });
}

// ===== LOADER (corrigido) =====
function esconderLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
}

if (document.readyState === 'complete') {
  setTimeout(esconderLoader, 600);
} else {
  window.addEventListener('load', () => setTimeout(esconderLoader, 600));
}

// Fallback: esconde de qualquer forma após 3 segundos
setTimeout(esconderLoader, 3000);

// ===== SCROLL =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (docHeight > 0) ? (scrollTop / docHeight) * 100 : 0;

  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = progress + '%';

  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', scrollTop > 50);

  const backTop = document.getElementById('backTop');
  if (backTop) backTop.classList.toggle('visible', scrollTop > 400);
});

// Iniciar observadores
document.addEventListener('DOMContentLoaded', () => {
  observarReveals();
  observarContadores();
});