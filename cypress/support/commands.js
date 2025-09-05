// ...existing code...

Cypress.Commands.add('postApi', (endpoint, body) => {
  cy.request({
    method: 'POST',
    url: endpoint,
    body: body,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('criaMockToken', () => {
  cy.fixture('mock-body-portal').then((mockBodyPortal) => {
    cy.intercept('POST', 'https://api.serasaexperian.com.br/security/iam/v1/user-identities/**', {
      statusCode: 201,
      body: mockBodyPortal
    }).as('postRegister');
  });
  cy.wait('@postRegister').then((intercept) => {
    assert.equal(intercept.response.statusCode, 201);
  });
});