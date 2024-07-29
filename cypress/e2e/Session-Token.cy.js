///<reference types="cypress"/>

describe('JWT Session Token', () => {


    it('should log in through local storage', () => {
        // Session token injection into local storage
        cy.JWTLogin();
    });


    it.only('should log in through local storage using visit extra options', () => {
        // Session token injection into local storage
        cy.JWTLogin().then(() => {

            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: (window) => {
                    window.localStorage.setItem('token', Cypress.env('token'));
                } 
            });

        });

    });


});