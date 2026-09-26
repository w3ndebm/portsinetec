// ==========================================
// NAVEGAÇÃO ENTRE TELAS (SPA) + WHATSAPP
// ==========================================

function irPara(tela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));

  const alvo = document.getElementById('tela-' + tela);
  if (!alvo) return;

  alvo.classList.add('ativa');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('aberto');

  setTimeout(() => {
    alvo.querySelectorAll('.reveal').forEach((el, i) => {
      el.classList.remove('active');
      setTimeout(() => el.classList.add('active'), i * 80);
    });
    alvo.querySelectorAll('.num[data-target]').forEach(el => {
      el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
      if (typeof animarContador === 'function') animarContador(el);
    });
  }, 100);
}

// Configurar tudo ao carregar
document.addEventListener('DOMContentLoaded', () => {
  // ===== WHATSAPP — APLICAR EM TODOS OS BOTÕES =====
  document.querySelectorAll('.js-whats').forEach(el => {
    const msg = el.dataset.msg || CONFIG.whatsappMsgPadrao;
    el.href = montarLinkWhatsApp(msg);
  });

  // ===== NAVEGAÇÃO =====
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      irPara(el.dataset.nav);
    });
  });

  // ===== MENU MOBILE =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('aberto');
    });
  }

  // ===== BOTÃO VOLTAR AO TOPO =====
  const backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});