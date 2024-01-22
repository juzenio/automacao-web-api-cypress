/// <reference types="cypress" />



import { faker } from '@faker-js/faker';

describe('testando api login', () => {

  let acesso;

  before(() => {

    cy.fixture('login').then((Tacesso) => {

      acesso = Tacesso
      cy.log(acesso.username)
      cy.log(acesso.password)
      cy.log(faker.person.fullName())

    })

    //cy.intercept('GET','**/learn.cypress.io/_next/data/**/real-world-examples.json').as('visit')

  })
  it(' verificando autentificação login da api', { env: { hideCredentials: true, hideCredentialsOptions: { body: ["username", "password"] } } }, () => {

    cy.login_api(acesso.username, acesso.password).then((token) => Cypress.env('auth.token', token))
    

  })

  it(' verificando autentificação find-by/user-name', () => {
   
    assert.isDefined(Cypress.env('auth.token'), 'Token de autenticação não encontrado.');

    cy.find_by_user(Cypress.env('auth.token'), acesso.username)
   

  })


})