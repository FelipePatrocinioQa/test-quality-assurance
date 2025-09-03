import 'cypress-plugin-api'
describe('Consulta de Boleto API - Cenário Positivo', () => {
  it('Deve consultar boleto com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://consulta-de-boleto.p.rapidapi.com/consulta',
      headers: {
        'x-rapidapi-host': 'consulta-de-boleto.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});