// Requer o módulo 'cypress-plugin-api' para suporte a chamadas de API no Cypress
require('cypress-plugin-api')

// Comando personalizado Cypress para autenticação via API
Cypress.Commands.add('login_api', (usuario, senha) => {
    cy.api({
        method: 'POST',
        url: 'https://curso-automacao-user-service.herokuapp.com/auth',
        failOnStatusCode: false,
        body: {
            username: usuario,
            password: senha
        }
    }).then(({ status, body }) => {
        // Verificações na resposta da autenticação
        expect(status).to.eq(200);
        expect(body).to.have.property('token');
        // Retorna o token para uso posterior nos testes
        return body.token;
    });
});

// Comando personalizado Cypress para buscar usuário por nome via API
Cypress.Commands.add('find_by_user', (token, username) => {
    cy.api({
        method: 'GET',
        url: 'https://curso-automacao-user-service.herokuapp.com/api/v1/users/find-by/user-name/',
        failOnStatusCode: false,
        headers: {
            "Authorization": token
        },
        qs: {
            username: username
        }
    }).then(({ status, body }) => {
        // Verificações na resposta da busca por usuário
        expect(status).to.eq(200);
        expect(body.id).to.eq(1);
        expect(body).to.have.property('name', 'Administrator');
        // Retorna o ID do usuário para uso posterior nos testes
        return body.id;
    });
});