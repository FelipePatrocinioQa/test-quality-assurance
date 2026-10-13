const { defineConfig } = require('cypress');
const environments = require('./cypress/config/environments');

const environmentName = process.env.TEST_ENVIRONMENT || 'dev';
const baseUrl = environments[environmentName];

if (!baseUrl) {
  throw new Error(
    `URL não configurada para o ambiente "${environmentName}". Configure UAT_URL ou escolha local/dev.`
  );
}

module.exports = defineConfig({
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/**/*.cy.js',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    }
  }
});