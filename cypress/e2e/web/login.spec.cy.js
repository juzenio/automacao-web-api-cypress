/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
describe('testando login web', () => {

    let acesso;

    before(() => {


        cy.fixture('login').then((Tacesso) => {
            acesso = Tacesso
            cy.log(acesso.username)
            cy.log(acesso.password)
          //  cy.log(faker.person.fullName())

        })

        //cy.intercept('GET','**/learn.cypress.io/_next/data/**/real-world-examples.json').as('visit')


    })

    it('Validando credenciais e verificando usuario logado', () => {

        //chamando comando personalizado fazer login
        cy.login_web(acesso.username, acesso.password)

    })




})