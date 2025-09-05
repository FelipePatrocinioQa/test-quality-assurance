// ...existing code...

Cypress.Commands.add('req', (method, url, token, body = {}, headers = {}) => {
  const finalHeaders = {
    ...headers,
    Authorization: token ? `Bearer ${token}` : undefined
  };

  return cy.api({
    method,
    url,
    body,
    headers: finalHeaders,
    failOnStatusCode: false
  }).then((response) => {
    return {
      statusCod: response.status,
      retBody: response.body
    };
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