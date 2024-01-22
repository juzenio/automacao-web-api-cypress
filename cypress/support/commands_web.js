
// Definindo uma função de comando personalizado no Cypress para realizar o login
Cypress.Commands.add('login_web', (usuario, senha) => {
    
    // Visita a URL do aplicativo da web
    cy.visit('https://curso-automacao-web-app.herokuapp.com/')

    // Localiza e verifica o campo de entrada de usuário
    cy.xpath("//input[@id='yourUsername']").should('exist').and('be.visible').as('Getuser')

    // Localiza e verifica o campo de entrada de senha
    cy.xpath("//input[@id='yourPassword']").should('exist').and('be.visible').as('Getpass')

    // Localiza e verifica o botão de login
    cy.xpath("//button[@id='logginButton']").should('exist').and('be.visible').as('Getbutt')

    // Digita o nome de usuário no campo de entrada de usuário
    cy.get('@Getuser').type(usuario)

    // Digita a senha no campo de entrada de senha
    cy.get('@Getpass').type(senha)

    // Clica no botão de login
    cy.get('@Getbutt').click()

    // Verifica se a página de dashboard foi carregada com sucesso
    cy.xpath("//div[@class='pagetitle']").find('h1').should('exist').and('be.visible').and('have.text', 'Dashboard')

    // Clica no botão de perfil
    cy.xpath("//span[@class='d-none d-md-block dropdown-toggle ps-2']").should('be.visible').click()

    // Verifica e navega pelo menu suspenso do perfil
    cy.xpath("//ul[@class='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show']")
        .should('be.visible')
        .within(() => {

            // Dentro do terceiro item do menu suspenso, realiza algumas verificações
            cy.xpath("//li[@class='dropdown-header']").eq(2).within(() => {
                // Verifica se o nome do usuário é "Kevin Anderson"
                cy.get('h6').should('be.visible').and('have.text', 'Kevin Anderson')

                // Verifica se a função do usuário é "Web Designer"
                cy.get('span').should('be.visible').and('have.text', 'Web Designer')
            })
        })
})



// Comando personalizado Cypress para criar um novo usuário na aplicação web
Cypress.Commands.add('novo_usuario', (nome, sobrenome, senha, roles) => {
    // Visita a página de edição de usuários na aplicação web
    cy.visit('https://curso-automacao-web-app.herokuapp.com/users-edit') 

    // Preenche o campo de nome de usuário
    cy.get('#userName1').click({force: true}).type(nome) // Força um clique e insere o nome fornecido

    // Preenche o campo de sobrenome de usuário
    cy.get('#userName2').type(sobrenome) // Insere o sobrenome fornecido

    // Preenche o campo de senha do usuário
    cy.get('#userPassword1').type(senha) // Insere a senha fornecida

    // Confirmação da senha
    cy.get('#userPasswordConfirmation').type(senha) // Insere novamente a senha para confirmação

    // Preenche o campo de funções do usuário
    cy.get('#userRoles').type(roles) // Insere as funções fornecidas

    // Submete o formulário para criar o novo usuário
    cy.get('#submit').click() // Clica no botão de submissão

    // Verifica se a mensagem de sucesso está visível
    cy.get('#alert-success').should('be.visible') // Verifica se a mensagem de sucesso está presente na página
})