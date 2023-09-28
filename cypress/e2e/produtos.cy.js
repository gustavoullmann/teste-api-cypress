/// <reference types = "cypress"/>

describe('Teste da funcionalidade Produtos', () => {

    var token;

    beforeEach(() => {
        cy.gerarToken("Ralph_McKenzie21@yahoo.com", "teste")
            .then(returnedToken => { token = returnedToken })
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: '/produtos'
        }).then(response => {
            expect(response.status).to
                .equal(200)
            expect(response.duration).to.be
                .lessThan(50)
            expect(response.body).to.have
                .property('produtos')
        })
    });

    it('Cadastrar produto', () => {
        let productCode = Math.floor(Math.random() * 1000000)
        cy.cadastrarProduto(token, `Produto de teste ${productCode}`, 10, "Teste de produto", 10)
            .then(response => {
                expect(response.status).to
                    .equal(201)
                expect(response.body.message).to
                    .equal("Cadastro realizado com sucesso")
                expect(response.duration).to.be
                    .lessThan(100)
            });
    });

    it('Não cadastra produto repetido', () => {
        cy.cadastrarProduto(token, "Produto teste repetido", 10, "Teste de produto", 10)
            .then(response => {
                expect(response.status).to
                    .equal(400)
                expect(response.body.message).to
                    .equal("Já existe produto com esse nome")
                expect(response.duration).to.be
                    .lessThan(100)
            });
    });

    it('Deve editar um produto já cadastrado', () => {
        let productCode = Math.floor(Math.random() * 1000000)
        cy.request('/produtos')
            .then(response => {
                let productId = response.body.produtos[0]._id
                cy.request({
                    method: 'PUT',
                    url: `/produtos/${productId}`,
                    headers: {
                        authorization: token
                    },
                    body:
                    {
                        "nome": `Teste edição de produto ${productCode}`,
                        "preco": 100,
                        "descricao": "Produto editado",
                        "quantidade": 10
                    }
                }).then(response => {
                    expect(response.body.message).to
                        .equal('Registro alterado com sucesso')
                })
            })
    });

    it('Deve editar um produto cadastrado previamente', () => {
        let productCode = Math.floor(Math.random() * 1000000)
        cy.cadastrarProduto(token, `Produto de teste ${productCode}`, 100, "Teste de edição de produto", 10)
            .then(response => {
                expect(response.status).to
                    .equal(201)
                expect(response.body.message).to
                    .equal("Cadastro realizado com sucesso")
                let productId = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `/produtos/${productId}`,
                    headers: {
                        authorization: token
                    },
                    body:
                    {
                        "nome": `Teste edição de produto ${productCode}`,
                        "preco": 100,
                        "descricao": "Produto editado",
                        "quantidade": 10
                    }
                }).then(response => {
                    expect(response.body.message).to
                        .equal('Registro alterado com sucesso')
                })
            })
    });

    it('Deve deletar um produto previamente cadastrado', () => {
        let productCode = Math.floor(Math.random() * 1000000)
        cy.cadastrarProduto(token, `Produto de teste ${productCode}`, 100, "Teste de edição de produto", 10)
            .then(response => {
                expect(response.status).to
                    .equal(201)
                expect(response.body.message).to
                    .equal("Cadastro realizado com sucesso")
                let productId = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `/produtos/${productId}`,
                    headers: {
                        authorization: token
                    },
                }).then(response => {
                    expect(response.status).to
                        .equal(200)
                    expect(response.body.message).to
                        .equal('Registro excluído com sucesso')
                })
            })
    });
});