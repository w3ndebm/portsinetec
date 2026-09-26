// ==========================================
// CONFIGURAÇÕES DO SITE SINETEC
// ==========================================

const CONFIG = {
  // WhatsApp comercial (formato internacional, sem símbolos)
  whatsapp: '5511973751687',

  // Mensagem padrão que abre no WhatsApp
  whatsappMsgPadrao: 'Olá! Gostaria de um orçamento.',

  // URL do Google Apps Script (já configurada)
  sheetsUrl: 'https://script.google.com/macros/s/AKfycbx5LBgCPAUtKZ5SttkBFurFybyFdVFYAWKh1etXtpooPcq2jx4IgTJWsyjGRidAbCvRvQ/exec',

  // Nome da empresa
  empresa: 'Sinetec Manutenção'
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function montarLinkWhatsApp(mensagem) {
  const msg = mensagem || CONFIG.whatsappMsgPadrao;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function configurarBotoesWhatsApp() {
  document.querySelectorAll('.js-whats').forEach(el => {
    const msg = el.dataset.msg || CONFIG.whatsappMsgPadrao;
    el.href = montarLinkWhatsApp(msg);
  });
}