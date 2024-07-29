///<reference types="cypress"/>

describe('JWT Session Token', () => {

    it('should inject JWT Session Token into browser local storage', () => {
        // Session token injection into local storage
        cy.JWTLogin();
    });

})