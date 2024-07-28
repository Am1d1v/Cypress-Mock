///<reference types="cypress"/>

describe('Cypress Mock', () => {

  it('should return list with only one book and display specific message', () => {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo');

    cy.intercept({
      method: 'GET',
      url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }, {
      statusCode: 200,
      body: [{
        "book_name": 'RestAssured with Java',
        "isbn": "DSR",
        "aisle": "2304"
      }]
    }).as('boookRetrievals');

    cy.contains('Library').click();

    cy.wait('@boookRetrievals');

    cy.get('tbody').should('have.length', 1);
    cy.contains('Oops only 1 Book available');

  });


})