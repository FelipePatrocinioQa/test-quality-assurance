import 'cypress-plugin-api'

describe('Teste de API - cenários positivos', () => {
  it('[201 Sucess] Deve criar usuário e retornar sucesso (POST)', () => {
    cy.visit('https://developer.serasaexperian.com.br/register');
    cy.get('#mat-mdc-form-field-label-0 > .seds-default-fonts').type('64.116.406/0001-17')
    cy.get('[label="CPF"] > seds-form-field-core > .mat-mdc-form-field > .mat-mdc-text-field-wrapper').type('059.274.380-24')
    cy.get('[label="Nome Completo"] > seds-form-field-core > .mat-mdc-form-field > .mat-mdc-text-field-wrapper').type('Joao da Silva')
    cy.get('[label="E-mail principal"] > seds-form-field-core > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex').type('dasdadas@uorak.com')
    cy.get('[label="Nome da Empresa"] > seds-form-field-core > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex').type('Nome da empresa')
    cy.get('[label="Número do seu celular"] > seds-form-field-core > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex').type('11982665789')
    cy.get('[label="Data de Nascimento"] > seds-form-field-core > .mat-mdc-form-field > .mat-mdc-text-field-wrapper').type('18071990')
    cy.get('seds-basic-button > seds-core-button > .seds-buttons > .mdc-button > .mdc-button__label > .seds-flex > .seds-align-middle').click()

    cy.fixture('mock-body-portal').then(function(mockBodyPortal){
      this.mockBodyPortal = mockBodyPortal
      cy.intercept('POST', 'https://api.serasaexperian.com.br/security/iam/v1/user-identities/**', {
        statusCode: 201,
        body: this.mockBodyPortal
      }).as('postRegister')
    })
    cy.wait('@postRegister').then((intercept) => {
      assert.equal(intercept.response.statusCode, 201)
    })
    cy.get('.mat-mdc-text-field-wrapper').type('512282')
    cy.contains('Validar Código').click()
  });

});
