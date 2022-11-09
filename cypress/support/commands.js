/*
Cypress.Commands.add('login', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
) => {
    cy.session([username, password], () => {
        onBeforeLoad: window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_VENCIMENTO_CERTIFICADO', 'true')
        onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '14/10/2022')
        onBeforeLoad: window.localStorage.setItem('ARRAY_CRMS_NAO_EXIBIR_NOVIDADES', '["401241"]')
        cy.request({
            method: 'POST',
            url: 'https://passaporte2-hml.alterdata.com.br/passaporte-rest-api/rest/login',
            body: {
                senha: (Cypress.env('USER_PASSWORD')),
                usuario: (Cypress.env('USER_EMAIL'))

            },
        }).then((response) => {
            console.log(response)
            expect(response.status).to.eq(200)
            console.log(response.headers["set-cookie"][0])
            window.localStorage.setItem('conpass.token', response.headers["set-cookie"][0])
            cy.AcessarSistema()
        })
    })
})

Cypress.Commands.add('AcessarSistema', () => {
    cy.visit('/')
    cy.get(":nth-child(3) > .alt-lista-item-container").click();
    cy.intercept('GET', 'https://erpforme-hml.alterdata.com.br/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as("AguardarPagina")
    cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
    cy.get('.alt-titulo-view-container li b')
        .should('be.visible')

})

*/

Cypress.Commands.add('login', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
  ) => {
    cy.session([username, password], () => {
      cy.intercept('GET', '/core/app/views/core_selecao_empresas_view.html').as("AguardarPagina")
      cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as("AguardarEmpresa")
  
  
  
      onBeforeLoad: window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_VENCIMENTO_CERTIFICADO', 'true')
      onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '14/10/2022')
      onBeforeLoad: window.localStorage.setItem('ARRAY_CRMS_NAO_EXIBIR_NOVIDADES', '["401241","355672"]')
      
      cy.visit('/')
      // cy.pause()
      cy.get('#email-login')
        .clear()
        .type(username, { delay: 0 })
      cy.get('.panel-body input[type="password"]').type(password, { delay: 0 }, { log: false })
      cy.get('#login-passaporte').click()
      cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
      cy.get(":nth-child(2) > .alt-lista-item-container").click();
      cy.AcessarSistema()
  
    })
  })
  
  
  Cypress.Commands.add('AcessarSistema', () => {
    cy.intercept('GET', '/passaporte-rest-api/rest/produtos').as("AguardarPagina")
    cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
    cy.contains('Painel Administrativo')
    .should('be.visible')
  
  })
  

  
Cypress.Commands.add('AcessarADM', () => {
    cy.visit('/')
    cy.get('#koopon-cabecalho-navbar-cadastro')
        .should('be.visible')
        .should('have.text', 'Cadastros')
        .click()
    cy.get('#koopon-cabecalho-navbar-cadastro-venda-administradora-cartoes')
        .should('be.visible')
        .click({ force: true })



})

Cypress.Commands.add('btnNovoAdm', () => {
    cy.get('.opcoes-listagem button')
        .should('be.visible')
        .click()
})

Cypress.Commands.add('btnNovoAdm', () => {
    cy.get('.opcoes-listagem button')
        .should('be.visible')
        .click()
})


Cypress.Commands.add('btnGravar', () => {
    cy.get('#gravar-modal-novo-cartao-operadora-especifico')
        .should('be.visible')
        .click()
})


Cypress.Commands.add('txtDescricao', (descricao) => {

    cy.get('#koopon-cartao-operadora-modal-input-descricao')
        .should('be.visible')
        .type(descricao)

})

Cypress.Commands.add('preenchecnpj', (cnpj) => {

    cy.get('#koopon-financeiro-modal-vue-cartao-operadora-especifico .modal-body input')
        .should('be.visible')
        .last()
        .type(cnpj)

})




