// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Session token injection into local storage
Cypress.Commands.add('JWTLogin', () => {

    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', {
        userEmail: "dimaa@gmail.com", 
        userPassword: "Dd1234567890"
    }).then(response => {
        expect(response.status).to.eql(200);

        // Set JWT Token as Cypress environmental variable
        Cypress.env('token', response.body.token)

        // Set JWT Token in local storage
        localStorage.setItem('token', Cypress.env('token'));
    });

    cy.visit('https://rahulshettyacademy.com/client');

});

