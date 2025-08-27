// filepath: c:\WorkSpace\Repositorios\teste-api-qa\test-quality-assurance\cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://httpbin.org',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true
    }
  }
});