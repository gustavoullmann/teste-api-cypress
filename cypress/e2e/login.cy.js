/// <reference types = "cypress"/>
const { faker } = require('@faker-js/faker');

var usuario = faker.internet.email()

describe("Login - Testes da API ServeRest", () => {
  it("Cadastra usuário com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Fulano da Silva",
        email: usuario,
        password: "teste",
        administrador: "true"
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
    });
  })

  it("Deve fazer login com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        email: usuario,
        password: "teste",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Login realizado com sucesso");
    });
  });
});
