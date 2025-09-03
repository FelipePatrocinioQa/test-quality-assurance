// ...existing code...

Cypress.Commands.add('postApi', (endpoint, body) => {
  cy.request({
    method: 'POST',
    url: endpoint,
    body: body,
    failOnStatusCode: false
  });
});