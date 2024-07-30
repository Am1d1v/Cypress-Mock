///<reference types="cypress"/>

describe('JWT Session Token', () => {


    it('should log in through local storage', () => {
        // Session token injection into local storage
        cy.JWTLogin();
    });


    it('should log in through local storage using visit extra options', () => {
        // Session token injection into local storage
        cy.JWTLogin().then(() => {

            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: (window) => {
                    window.localStorage.setItem('token', Cypress.env('token'));
                } 
            });

        });

    });

    it.only('should log in through local storage and purchase certain item', () => {
        // Session token injection into local storage
        cy.JWTLogin().then(() => {

        // Add certain product to the cart
        cy.get(':nth-child(2) > .card > .card-body > .w-10').click();

        // Only 1 item in the cart
        cy.get(':nth-child(4) > .btn').contains(1);

        // Move to the cart
        cy.get(':nth-child(4) > .btn').click();

        // Click on 'Buy Now' button
        cy.get('.removeWrap > .btn-primary').click();

        // Insert in Personal Information input fields dummy data
        // Insert CVV Code
        cy.get(':nth-child(2) > :nth-child(2) > .input').type(123);

        // Insert Name on Card
        cy.get(':nth-child(3) > .field > .input').type('Customer Name');

        // Insert Country name
        cy.get('.form-group > .input').type('Australia');
        cy.get('.ta-item').click();

        // Click on 'Place Order' button
        cy.get('.btnn').click();

        // Item was successfully purchased
        cy.contains('Thankyou for the order.');

        cy.wait(3000);

        // Download purchase data in CSV Format
        cy.get('tbody > :nth-child(4) > .btn').click();

        });

    });


});