// ==========================================
// FILTROS DO PORTFÓLIO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const filtros = document.querySelectorAll('.filtro');
  const casos = document.querySelectorAll('#gridPortfolio .case');

  if (!filtros.length) return;

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      // Ativa apenas o botão clicado
      filtros.forEach(f => f.classList.remove('ativo'));
      btn.classList.add('ativo');

      const cat = btn.dataset.filtro;

      casos.forEach(c => {
        if (cat === 'todos' || c.dataset.cat === cat) {
          c.style.display = 'block';
          setTimeout(() => c.classList.add('active'), 50);
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
});