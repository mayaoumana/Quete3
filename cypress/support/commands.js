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
Cypress.Commands.add('loginWithCredentials', () => {
    cy.fixture('credentials').then((credentials) => {
      cy.request('POST', 'https://practice.expandtesting.com/notes/api/users/login', {
        email: credentials.email,
        password: credentials.password
      }).then((response) => {
        expect(response.status).to.equal(200);
   

        
      // Extract and store the id and token values
      const  token  = response.body.data.token;

      // Store the values as environment variables
      //Cypress.env('userId', id);
      Cypress.env('userToken', token);
      console.log( token);
      });
    });
  });
  