///<reference types="cypress"/>

describe('Cypress Mock', () => {

  it('Library mock', () => {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo');
    cy.contains('Library').click();

    cy.intercept({
      method: 'GET',
      url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }, {
      statusCode: 200,
      body: {
        "book_name": 'RestAssured with Java',
        "isbn": "DSR",
        "aisle": "2304"
      }
    });


  });


})