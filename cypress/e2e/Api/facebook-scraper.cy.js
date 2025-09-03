import 'cypress-plugin-api'

describe('Facebook Scraper API - Cenário Positivo', () => {
  it('Deve buscar vídeos relacionados ao Facebook com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://facebook-scraper3.p.rapidapi.com/search/videos?query=facebook',
      headers: {
        'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      // Adicione outras asserções conforme necessário
    });
  });
});
describe('Facebook Scraper API - Buscar Posts', () => {
  it('Deve buscar posts relacionados ao Facebook com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://facebook-scraper3.p.rapidapi.com/search/posts?query=facebook',
      headers: {
        'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});
describe('Facebook Scraper API - Buscar Lugares', () => {
  it('Deve buscar lugares relacionados a pizza com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://facebook-scraper3.p.rapidapi.com/search/places?query=pizza',
      headers: {
        'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});
describe('Facebook Scraper API - Buscar Páginas', () => {
  it('Deve buscar páginas relacionadas a beer com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://facebook-scraper3.p.rapidapi.com/search/pages?query=beer',
      headers: {
        'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});