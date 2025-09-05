const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, 'cypress', 'reports');

// Se a pasta não existir, cria ela
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
  console.log('📁 Pasta de relatórios criada.');
} else {
  // Se existir, limpa os arquivos .json e .html
  fs.readdirSync(reportDir).forEach(file => {
    if (file.endsWith('.json') || file.endsWith('.html')) {
      fs.unlinkSync(path.join(reportDir, file));
    }
  });
  console.log('🧹 Relatórios antigos removidos com sucesso.');
}
