///<reference types="cypress"/>

describe('Stub Data Mock', () => {

  it('should return list of books with only one book and display specific message', () => {
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

    // Only 1 book exists
    cy.get('tbody').should('have.length', 1);

    // Specific message exists
    cy.contains('Oops only 1 Book available');

  });


  it('should validate yield list of books', () => {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo');

    cy.intercept({
      method: 'GET',
      url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }, {
      statusCode: 200,
      body: [
        {
        "book_name": 'RestAssured with Java',
        "isbn": "DSR",
        "aisle": "2304"
      },
      {
        "book_name": 'Cypress Tests Part 1',
        "isbn": "RCD",
        "aisle": "2305"
      },
      {
        "book_name": 'Cypress Tests Part 2',
        "isbn": "CYT2",
        "aisle": "2306"
      },
    ]
    }).as('boookRetrievals');

    cy.contains('Library').click();

    cy.wait('@boookRetrievals').then(({request, response}) => {
      cy.get('tbody tr').should('have.length', response.body.length);
    })

    // "Only 1 book" message does not appear
    cy.contains('Oops only 1 Book available').should('not.exist');
    
  });


  it('should return message that user is not authorized', () => {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo');

    cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (request) => {
      request.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra';
      request.continue((res) => {
        //expect(res.statusCode).to.equal('403');
      });  
    }).as('invalidUser');
    
    cy.contains('Library').click();

    cy.wait('@invalidUser');

  });

  it('should return message that the book already exist', () => {
    cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
      "name": 'New book in the library',
      "isbn": "abc",
      "aisle": "123",
      "author": 'Di'
    }).then(response => {
      expect(response.body.Msg).to.equal('Book Already Exists');
    });

  });

  it.only('should add new book in the Library', () => {
    cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
      "name": 'New book in the library',
      "isbn": "zxcvbnm",
      "aisle": "1q2w3e4r5t6y",
      "author": 'Di'
    }).then(response => {
      expect(response.body.Msg).to.equal('successfully added');
    });

  });


})