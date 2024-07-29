///<reference types="cypress"/>

describe('JWT Session Token', () => {

    it('should inject JWT Session Token into browser local storage', () => {
        cy.visit('https://rahulshettyacademy.com/client');

        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE3N2ZjZWFlMmFmZDRjMGIzNmZiODEiLCJ1c2VyRW1haWwiOiJkaW1hYUBnbWFpbC5jb20iLCJ1c2VyTW9iaWxlIjoxMjM0NTY3ODkwLCJ1c2VyUm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzIyMjUzMjgzLCJleHAiOjE3NTM4MTA4ODN9.0MR-JTnZYuqCTedKUF2yl7rhznXh2w30pGrTmoEaXqU');
    });

})