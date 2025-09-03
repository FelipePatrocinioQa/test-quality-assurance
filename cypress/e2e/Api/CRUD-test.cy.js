import 'cypress-plugin-api'

import send_body_sucesso from '../../../fixtures/api/send_body_sucesso.json';

describe('Teste de API - cenários positivos', () => {
  it('[201 Sucess] Deve criar usuário e retornar sucesso (POST)', () => {
    cy.api({
      method: 'POST',
      url: '/post',
      body: send_body_sucesso,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      });
  });
  it('[200 OK] Deve buscar usuário e retornar sucesso (GET)', () => {
    cy.api({
      method: 'GET',
      url: '/get',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
  it('[201] Deve alterar usuário e retornar sucesso (PUT)', () => {
    cy.api({
      method: 'PUT',
      url: '/put',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
  it('[204 No Content] Deve deletar usuário e retornar sucesso (DELETE)', () => {
    cy.api({
      method: 'DELETE',
      url: '/delete',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });
});
describe('Teste de API - Cenários negativos', () => {
  it('[404 not found] Enviar uma requisição com a url inválida (POST)', () => {
    cy.api({
      method: 'POST',
      url: '/post2',
      body: send_body_sucesso,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      });
  });
  it('[404 not found] Enviar uma requisição com a url inválida (GET)', () => {
    cy.api({
      method: 'GET',
      url: '/get2',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
    });
  it('[404 not found] Enviar uma requisição com a url inválida (PUT)', () => {
    cy.api({
      method: 'PUT',
      url: '/put2',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
    });
  it('[404 not found] Enviar uma requisição com a url inválida (DELETE)', () => {
    cy.api({
      method: 'DELETE',
      url: '/delete2',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
    });
});
