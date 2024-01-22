/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
describe('Cadastrando novos usuarios', () => {

    let acesso;

    before(() => {


        cy.fixture('login').then((Tacesso) => {
            acesso = Tacesso
            cy.log(acesso.username)
            cy.log(acesso.password)
            // cy.log(faker.name.fullName())

        })

        //cy.intercept('GET','**/learn.cypress.io/_next/data/**/real-world-examples.json').as('visit')


    })

    it('Cadastrando novos usuarios com biblioteca faker', () => {
        // logando com credenciais do usuario admin
        cy.login_web(acesso.username, acesso.password)

        // passando a senha do faker para uma variavel
        const senha = faker.internet.password(10)
        //chamando o comando personalizado para a criação de um novo usuario
        cy.novo_usuario(faker.name.fullName(), faker.internet.email(), senha, "ROLE_USER")



    })


})