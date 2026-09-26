// ==========================================
// FAQ — Accordion
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const perguntas = document.querySelectorAll('.faq-pergunta');

  perguntas.forEach(p => {
    p.addEventListener('click', () => {
      const item = p.parentElement;
      item.classList.toggle('aberto');
    });
  });
});