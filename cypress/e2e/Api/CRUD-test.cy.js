import 'cypress-plugin-api'

import send_body_sucesso from '../../fixtures/payload/send/send_body_post_200.json';

describe('Teste de API', () => {
  it('Deve criar usuário e retornar sucesso (POST)', () => {
    cy.api({
      method: 'POST',
      url: '/post',
      body: send_body_sucesso,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      });
  });
  it('Deve buscar usuário e retornar sucesso (GET)', () => {
    cy.api({
      method: 'GET',
      url: '/get',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
  it('Deve alterar usuário e retornar sucesso (PUT)', () => {
    cy.api({
      method: 'PUT',
      url: '/put',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
  it('Deve deletar usuário e retornar sucesso (DELETE)', () => {
    cy.api({
      method: 'DELETE',
      url: '/delete',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
});
describe('Teste de API 2', () => {
  it('Deve criar usuário e retornar sucesso (POST)', () => {
    cy.api({
      method: 'POST',
      url: '/post',
      body: send_body_sucesso,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      });
  });
  it('Deve buscar usuário e retornar sucesso (GET)', () => {
    cy.api({
      method: 'GET',
      url: '/get',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
  it('Deve alterar usuário e retornar sucesso (PUT)', () => {
    cy.api({
      method: 'PUT',
      url: '/put',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
  it('Deve deletar usuário e retornar sucesso (DELETE)', () => {
    cy.api({
      method: 'DELETE',
      url: '/delete',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
});
