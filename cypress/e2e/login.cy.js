/// <reference types = "cypress"/>

describe('Login - Testes da API ServeRest', () => {
    
    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                "email": "Ralph_McKenzie21@yahoo.com",
                "password": "teste"
              }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Login realizado com sucesso")
        })
    });
});