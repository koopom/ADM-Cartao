/// <reference types="cypress"/> 


import reg from '../support/api/request'
import assert from '../support/api/asserts'

describe('Administradora de cartõe', () => {
    beforeEach(() => {
        cy.login()
    });
 
  


    var dadosAdm = {
        descricao: 'Numback',
        CNPJCadastrado: '61.599.277/0001-77',
        CNPJinvalido: '81.552.500/0001',
        CNPJ: '85.906.743/0001-88'


    }


    it('Quando criar uma Administradora de cartão e Gravar sem preencher dados, então não deve permitir gravar e deve ocorrer validação - Informe a Descrição / Informe o CNPJ', () => {
        cy.AcessarADM()
        cy.btnNovoAdm()
        cy.btnGravar()
        cy.get('#koopon-financeiro-modal-vue-cartao-operadora-especifico .text-danger ')
            .should('have.text', 'Informe a Descrição.Informe o CNPJ.')
    })


    it('Quando criar uma Administradora de cartão e preencher a descrição e Gravar, então não deve permitir gravar e deve ocorrer validação - Informe o CNPJ', () => {
        cy.AcessarADM()
        cy.btnNovoAdm()
        cy.btnGravar()
        cy.txtDescricao(dadosAdm.descricao)
        cy.get('#koopon-financeiro-modal-vue-cartao-operadora-especifico .text-danger ').contains('Informe o CNPJ.')
            .should('have.text', 'Informe o CNPJ.')

    })

    it('Quando criar uma Administradora de cartão e preencher o CNPJ e Gravar, então não deve permitir gravar e deve ocorrer validação - Informe a Descrição.', () => {
        cy.AcessarADM()
        cy.btnNovoAdm()
        cy.btnGravar()
        cy.preenchecnpj(dadosAdm.CNPJ)
        cy.get('#koopon-financeiro-modal-vue-cartao-operadora-especifico .text-danger ').contains('Informe a Descrição.')
            .should('have.text', 'Informe a Descrição.')

    })

    it('Quando criar uma Administradora de cartão e Gravar com um CNPJ já ultilizado, então não deve permitir gravar e deve ocorrer validação - CNPJ já cadastrado..', () => {
        cy.AcessarADM()
        cy.btnNovoAdm()
        cy.wait(300)
        cy.preenchecnpj(dadosAdm.CNPJCadastrado)
        cy.txtDescricao(dadosAdm.descricao)
        cy.btnGravar()
        cy.get('#koopon-comum-alerta-generico')
        .should('be.visible')


    })


    it('Quando criar uma Administradora de cartão e preencher o CNPJ invalido e Gravar, então não deve permitir gravar e deve ocorrer validação - Informe o CNPJ valido.', () => {
        cy.AcessarADM()
        cy.btnNovoAdm()
        cy.wait(3000)
        cy.preenchecnpj(dadosAdm.CNPJinvalido)
        cy.txtDescricao(dadosAdm.descricao)
        cy.btnGravar()
        cy.get('#koopon-financeiro-modal-vue-cartao-operadora-especifico .text-danger ').contains('Informe o CNPJ valido.')
            .should('have.text', 'Informe o CNPJ valido.')



    })


    it('Quando excluir uma Adm de cartão já movimentada -, então a Adm de cartão não deve ser excluida e deve exibir a validação (Não foi possível excluir, pois a informação está sendo utilizada em outra parte do sistema.)', () => {
        cy.visit('/')
        reg.DeleteAdmCartaoMovimentada().then(DeleteAdmMovimentadaResponse => {
            assert.validaStatus(DeleteAdmMovimentadaResponse, 400)
        })


    })

    it('Quando criar uma Administradora de cartão, então o cadastro deve ser criado com sucesso e excluida', () => {

        cy.visit('/')
        reg.getAdmCartao().then(getCriarAdmCartaoResponse => {
            expect(getCriarAdmCartaoResponse.body.descricao).to.equal('Inter')
            reg.getDeleteAdmCartao(getCriarAdmCartaoResponse).then(getDeleteAdmCartaoResponse => {
                assert.validaStatus(getDeleteAdmCartaoResponse, 200)

            })

        })
    })


});

