// ==========================================
// FORMULÁRIO — Envio para Google Sheets
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContato');
  if (!form) return;

  form.addEventListener('submit', enviarForm);
});

async function enviarForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('btnEnviar');
  const msg = document.getElementById('formMsg');

  // Monta objeto com os dados
  const dados = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    telefone: form.telefone.value.trim(),
    empresa: form.empresa.value.trim(),
    servico: form.servico.value,
    mensagem: form.mensagem.value.trim(),
    origem: 'Site Sinetec',
    data: new Date().toLocaleString('pt-BR')
  };

  // Estado de carregamento
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  msg.className = 'form-msg';
  msg.textContent = '';

  try {
    // Verifica se a URL foi configurada
    if (!CONFIG.sheetsUrl || CONFIG.sheetsUrl.includes('COLE_AQUI')) {
      throw new Error('URL do Google Sheets não configurada. Veja o arquivo config.js.');
    }

    // Envia para o Google Sheets
    await fetch(CONFIG.sheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    // Sucesso
    msg.className = 'form-msg sucesso';
    msg.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
    form.reset();

    // Abre WhatsApp como fallback (garantia de contato)
    const texto = encodeURIComponent(
      `Olá! Sou ${dados.nome}, da empresa ${dados.empresa || 'não informada'}.\n\n` +
      `📋 Serviço de interesse: ${dados.servico}\n` +
      `📞 Telefone: ${dados.telefone}\n` +
      `📧 E-mail: ${dados.email}\n\n` +
      `💬 Mensagem:\n${dados.mensagem}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${texto}`, '_blank');
    }, 1500);

  } catch (err) {
    msg.className = 'form-msg erro';
    msg.textContent = 'Erro: ' + err.message;
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar Mensagem';
  }
}