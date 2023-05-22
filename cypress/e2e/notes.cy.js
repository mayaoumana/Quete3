describe('test api notes', () => {
      
      let notes;

    beforeEach(() => {
      cy.fixture('notes').then((data) => {
        notes = data;
      });
    });

    it.skip('Register', () => {
        cy.request('POST', 'https://practice.expandtesting.com/notes/api/users/register', {   
        name : "user",
        email : "user3@mail.com",
        password : "password" }).then((response) => {
          expect(response.status).to.equal(201);
        });
      });

    
      it('Login', () => {
        cy.loginWithCredentials();
         
      });

      it('Add Notes', () => {

        //const inputString = Cypress.env('userToken');
        //const spaceIndex = inputString.indexOf(' '); // Find the index of the first space

        // Extract the substring starting after the space
        //const result = inputString.substring(spaceIndex + 1);

        // Output the result to the Cypress console
        //cy.log(result);

        notes.forEach((note) => {
          console.log(Cypress.env('userToken'));
          const inputString = Cypress.env('userToken');
          const ntoken = inputString.substr(inputString.length - 64);
          cy.request({
            method: 'POST',
            url: 'https://practice.expandtesting.com/notes/api/notes',
            headers: {'x-auth-token': ntoken},
            body: note
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.success).to.be.true;
          
          });
        });

      })
      

});
  