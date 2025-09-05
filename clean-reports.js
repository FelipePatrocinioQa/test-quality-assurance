const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, 'cypress', 'reports');

fs.readdirSync(reportDir).forEach(file => {
  if (file.endsWith('.json') || file.endsWith('.html')) {
    fs.unlinkSync(path.join(reportDir, file));
  }
});

console.log('🧹 Relatórios antigos removidos com sucesso.');
