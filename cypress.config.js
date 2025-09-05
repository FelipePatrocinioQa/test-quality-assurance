// filepath: c:\WorkSpace\Repositorios\teste-api-qa\test-quality-assurance\cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
e2e: {
  baseUrl: 'https://httpbin.org',
  specPattern: 'cypress/e2e/**/*.cy.js',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  }
}
});