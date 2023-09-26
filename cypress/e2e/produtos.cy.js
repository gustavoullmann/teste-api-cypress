/// <reference types = "cypress"/>

describe('Teste da funcionalidade Produtos', () => {

    it('Listar produtos', () => {

        cy.request({
            method: 'GET',
            url: '/produtos'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(20)
            //expect(response.body.produtos[0].nome).to.equal('Imac pro')
            expect(response.body).to.have.property('produtos')
        })
    });

    it.only('Cadastrar produto', () => {
        cy.request({
            method: 'POST', 
            url: '/produtos',
            body: {
                "nome": "Monitor Dell 4",
                "preco": 1270,
                "descricao": "Monitor slim 4k",
                "quantidade": 12
            },
            headers: {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJhbHBoX01jS2VuemllMjFAeWFob28uY29tIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTY5NTc2Njc3NCwiZXhwIjoxNjk1NzY3Mzc0fQ.hjlTmEa8Tn93mnPcDZPAJGSuT6d8isy90tfKxog1fSQ'}
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
            expect(response.duration).to.be.lessThan(100)
        });
    });
});