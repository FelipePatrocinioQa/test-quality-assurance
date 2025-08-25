import 'cypress-plugin-api'

import send_body_sucesso from '../../fixtures/payload/send/send_body_post_200.json';

import return_body_sucesso from '../../fixtures/payload/return/return_body_post_200.json';

describe('Teste de API com cy.api e mock', () => {
  it('Deve criar usuário e retornar sucesso (mock)', () => {
    cy.intercept('GET', '/minha-api/endpoint', {
      statusCode: 200,
      body: return_body_sucesso
    }).as('postMock');

    cy.api({
      method: 'GET',
      url: '/get',
      failOnStatusCode: false
    })
  });
});
