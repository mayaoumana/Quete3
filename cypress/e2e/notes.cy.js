import faker from 'faker';

describe('test api notes', () => {
      
      let notes;

    beforeEach(() => {
      cy.fixture('notes').then((data) => {
        notes = data;
      });
    });

    it('Register', () => {

        const name = faker.name.findName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        cy.request('POST', 'https://practice.expandtesting.com/notes/api/users/register', {   
        name : name,
        email : email,
        password : password }).then((response) => {
          expect(response.status).to.equal(201);
        });
      });

    
      it('Login', () => {
        cy.loginWithCredentials();
         
      });

      it('Add Notes', () => {


        notes.forEach((note) => {

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
            expect(response.body.data.title).to.equal(note.title);
            
          
          });
        });

      })
      

});
  
