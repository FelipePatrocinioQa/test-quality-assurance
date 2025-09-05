const cypress = require('cypress');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

(async () => {
  try {
    const results = await cypress.run();

    if (results.totalTests > 0) {
      const report = await merge({ files: ['cypress/reports/mochawesome*.json'] });

      // Validação extra: garantir que há testes dentro dos resultados
      const hasValidTests = report.results.some(result => {
        const hasDirectTests = Array.isArray(result.tests) && result.tests.length > 0;
        const hasSuiteTests = Array.isArray(result.suites) && result.suites.some(suite =>
          Array.isArray(suite.tests) && suite.tests.length > 0
        );
        return hasDirectTests || hasSuiteTests;
      });

      if (!hasValidTests) {
        console.warn('⚠️ Nenhum teste válido encontrado no JSON mesclado. Relatório não gerado.');
        return;
      }

      // Geração do relatório diretamente a partir do objeto
      await generator.create(report, {
        reportDir: 'cypress/reports/html',
        inline: true
      });

      console.log('✅ Relatório HTML gerado com sucesso!');
    } else {
      console.warn('⚠️ Nenhum teste foi executado. Relatório não gerado.');
    }
  } catch (err) {
    console.error('❌ Erro ao gerar relatório:', err);
  }
})();
