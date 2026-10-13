import { POST } from '../fixtures/api/common/methodRest';
import { bearerAuthorizationHeaders } from '../fixtures/api/common/headers';

Cypress.Commands.add('loginAsAdmin', () => {
  return cy.request({
    method: POST,
    url: '/login',
    body: {
      email: 'fulano@qa.com',
      password: 'teste'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('authorization');
    return response.body.authorization;
  });
});

Cypress.Commands.add('req', (method, url, token, body = {}, headers = {}) => {
  const finalHeaders = {
    ...headers,
    ...bearerAuthorizationHeaders(token)
  };

  return cy.request({
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