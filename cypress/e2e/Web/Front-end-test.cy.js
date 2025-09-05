import 'cypress-plugin-api'

var url = 'https://bugbank.netlify.app/'

describe('Cenários positivos', () => {
  it('[cenário positivo] Deve registrar novo usuário com sucesso ', () => {
    cy.visit(url);
    cy.get('.ihdmxA').click();
    cy.get(':nth-child(2) > [name="email"]').type('testeQa@gmail.com', { force: true });
    cy.get('[name="name"]').type('Joao Paulo Teste', { force: true });
    cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > [name="password"]').type('Qualidade@123', { force: true });
    cy.get('[name="passwordConfirmation"]').type('Qualidade@123', { force: true });
    cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({force: true});
    cy.get('.styles__ContainerInformations-sc-8zteav-3').should('contain', 'foi criada com sucesso');
    cy.get('#btnCloseModal').click({ force: true });
    // cy.criaMockToken();
    // cy.get('.mat-mdc-text-field-wrapper').type('512282')
    // cy.contains('Validar Código').click()
  });

});
describe('Cenários negativos', () => {
  it('Deve registrar novo usuário com email em branco ', () => {
    cy.visit(url);
    cy.get('.ihdmxA').click();
    cy.get(':nth-child(2) > [name="email"]').type('      ', { force: true });
    cy.get('[name="name"]').type('Joao Paulo Teste', { force: true });
    cy.get(':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > [name="password"]').type('Qualidade@123', { force: true });
    cy.get('[name="passwordConfirmation"]').type('Qualidade@123', { force: true });
    cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({force: true});
    cy.get('.kOeYBn > .input__warging').should('contain', 'É campo obrigatório');
    // cy.criaMockToken();
    // cy.get('.mat-mdc-text-field-wrapper').type('512282')
    // cy.contains('Validar Código').click()
  });

});
