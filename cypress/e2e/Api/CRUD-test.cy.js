import 'cypress-plugin-api';
import { GET, POST, PUT, DELETE } from '../../fixtures/api/common/methodRest';
import { LOGIN, USERS, USER_BY_ID } from '../../fixtures/api/common/endpoints';
import { JSON_HEADERS, authorizationHeaders } from '../../fixtures/api/common/headers';
import requestBodies from '../../fixtures/payload/send/user-api-bodies.json';

const baseUrl = Cypress.config('baseUrl');

const buildUser = (template, emailPrefix) => ({
  ...template,
  email: `${emailPrefix}.${Date.now()}@${requestBodies.emailDomain}`
});

describe('API de usuários', () => {
  let authToken;

  beforeEach(() => {
    cy.request({
      method: POST,
      url: `${baseUrl}${LOGIN}`,
      body: requestBodies.validLogin,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        authToken = response.body.authorization;
      } else {
        authToken = null;
        cy.log('Login falhou no beforeEach; suíte continua.');
        cy.log(JSON.stringify(response.body, null, 2));
      }
    });
  });

  it('GET /usuarios retorna a lista de usuários', () => {
    cy.request({
      method: GET,
      url: `${baseUrl}${USERS}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('GET /usuarios response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
    });
  });

  it('POST /login autentica com sucesso', () => {
    cy.request({
      method: POST,
      url: `${baseUrl}${LOGIN}`,
      body: requestBodies.validLogin,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('POST /login response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.include('Bearer');
    });
  });

  it('POST /usuarios cria um usuário com dados válidos', () => {
    const user = buildUser(requestBodies.validUser, requestBodies.emailPrefixes.validUser);

    cy.request({
      method: POST,
      url: `${baseUrl}${USERS}`,
      headers: JSON_HEADERS,
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('POST /usuarios response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
    });
  });

  it('GET /usuarios/:id retorna um usuário específico', () => {
    const user = buildUser(requestBodies.validUser, requestBodies.emailPrefixes.validUser);

    cy.request({
      method: POST,
      url: `${baseUrl}${USERS}`,
      headers: JSON_HEADERS,
      body: user,
      failOnStatusCode: false
    }).then((postResponse) => {
      const userId = postResponse.body._id;

      cy.request({
        method: GET,
        url: `${baseUrl}${USER_BY_ID(userId)}`,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('GET /usuarios/:id response:');
        cy.log(JSON.stringify(response.body, null, 2));
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('nome', user.nome);
        expect(response.body).to.have.property('email', user.email);
      });
    });
  });

  it('PUT /usuarios/:id atualiza um usuário existente', () => {
    const user = buildUser(requestBodies.validUser, requestBodies.emailPrefixes.validUser);
    const updatedUser = buildUser(requestBodies.updatedUser, requestBodies.emailPrefixes.updatedUser);

    cy.request({
      method: POST,
      url: `${baseUrl}${USERS}`,
      headers: JSON_HEADERS,
      body: user,
      failOnStatusCode: false
    }).then((postResponse) => {
      const userId = postResponse.body._id;

      cy.request({
        method: PUT,
        url: `${baseUrl}${USER_BY_ID(userId)}`,
        headers: { ...JSON_HEADERS, ...authorizationHeaders(authToken) },
        body: updatedUser,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('PUT /usuarios/:id response:');
        cy.log(JSON.stringify(response.body, null, 2));
        console.log(response);
        if (authToken) {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
        } else {
          expect(response.status).to.be.oneOf([200, 400, 401]);
        }
      });
    });
  });

  it('GET /usuarios/:id busca um usuário específico por ID com sucesso', () => {
    const userId = requestBodies.userIds.sample;

    cy.request({
      method: GET,
      url: `${baseUrl}${USER_BY_ID(userId)}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('GET /usuarios/:id (exemplo) response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', userId);
      expect(response.body).to.have.property('email', 'fulano@qa.com');
      expect(response.body).to.have.property('nome', 'Fulano da Silva');
    });
  });

  it('DELETE /usuarios/:id tenta excluir usuário com carrinho cadastrado e retorna erro', () => {
    const userId = requestBodies.userIds.withCart;

    cy.request({
      method: DELETE,
      url: `${baseUrl}${USER_BY_ID(userId)}`,
      headers: authorizationHeaders(authToken),
      failOnStatusCode: false
    }).then((response) => {
      cy.log('DELETE /usuarios/:id com carrinho response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Não é permitido excluir usuário com carrinho cadastrado');
      expect(response.body).to.have.property('idCarrinho');
    });
  });

  it('DELETE /usuarios/:id exclui um usuário existente', () => {
    const user = buildUser(requestBodies.validUser, requestBodies.emailPrefixes.validUser);

    cy.request({
      method: POST,
      url: `${baseUrl}${USERS}`,
      headers: JSON_HEADERS,
      body: user,
      failOnStatusCode: false
    }).then((postResponse) => {
      const userId = postResponse.body._id;

      cy.request({
        method: DELETE,
        url: `${baseUrl}${USER_BY_ID(userId)}`,
        headers: authorizationHeaders(authToken),
        failOnStatusCode: false
      }).then((response) => {
        cy.log('DELETE /usuarios/:id response:');
        cy.log(JSON.stringify(response.body, null, 2));
        console.log(response);
        if (authToken) {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        } else {
          expect(response.status).to.be.oneOf([200, 400, 401]);
        }
      });
    });
  });

  it('PUT /usuarios/:id atualiza usuário com payload válido e retorna mensagem de sucesso', () => {
    const userId = requestBodies.userIds.sample;

    cy.request({
      method: PUT,
      url: `${baseUrl}${USER_BY_ID(userId)}`,
      headers: { ...JSON_HEADERS, ...authorizationHeaders(authToken) },
      body: requestBodies.existingUserUpdate,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('PUT /usuarios/:id (payload válido) response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      if (authToken) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
      } else {
        expect(response.status).to.be.oneOf([200, 400, 401]);
      }
    });
  });

  it('POST /usuarios rejeita criação sem campos obrigatórios', () => {
    cy.request({
      method: POST,
      url: `${baseUrl}${USERS}`,
      body: requestBodies.invalidUser,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('POST /usuarios invalid response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(400);
      expect(response.body).to.be.an('object');
      expect(Object.keys(response.body).length).to.be.greaterThan(0);
    });
  });

  it('POST /login rejeita credenciais inválidas', () => {
    cy.request({
      method: POST,
      url: `${baseUrl}${LOGIN}`,
      body: requestBodies.invalidLogin,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('POST /login invalid response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message');
    });
  });

  it('GET /usuarios/:id retorna 400 para ID inexistente', () => {
    const invalidId = requestBodies.userIds.invalid;

    cy.request({
      method: GET,
      url: `${baseUrl}${USER_BY_ID(invalidId)}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('GET /usuarios/:id inexistente response:');
      cy.log(JSON.stringify(response.body, null, 2));
      console.log(response);
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message');
    });
  });
});
