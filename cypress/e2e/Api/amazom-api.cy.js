import 'cypress-plugin-api'

describe('Amazon Data API - Cenário Positivo', () => {
  it('Deve buscar produtos relacionados a Phone com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE',
      headers: {
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});

describe('Amazon Data API - Buscar Produtos por Categoria', () => {
  it('Deve buscar produtos da categoria 281407 com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=281407&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE',
      headers: {
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});

describe('Amazon Data API - Buscar Detalhes do Produto', () => {
  it('Deve buscar detalhes do produto pelo ASIN B07ZPKBL9V com sucesso', () => {
    cy.api({
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/product-details?asin=B07ZPKBL9V&country=US',
      headers: {
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        'x-rapidapi-key': '02d3d5a9ecmsh83d033fb7c0150fp10d3b4jsn1dee432eb1b6'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});