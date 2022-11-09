class Request {

    getAdmCartao() {
        return cy.request({
            method: 'POST',
            url: 'koopon-financeiro-rest-api/commons/cartoes_operadora/',
            body: {
                "propsPendenciasLista": [],
                "descricao": "Inter",
                "cnpj": "13.000.882/0001-37"
            }

        })
    }

    getDeleteAdmCartao(response) {
        const id = response.body.idCartaoOperadora

        return cy.request({
            method: 'DELETE',
            url: `koopon-financeiro-rest-api/commons/cartoes_operadora/${id}`,

            failOnStatusCode: false

        })




    }

    getCriarAdmCartaoSemDados() {
        return cy.request({
            method: 'POST',
            url: 'koopon-financeiro-rest-api/commons/cartoes_operadora/',
            body: {
                
                "descricao": "Inter",
                "cnpj": "81.552.500/0001-38",

                failOnStatusCode: false

            }

        })
    }

    DeleteAdmCartaoMovimentada(response) {
        

        return cy.request({
            method: 'DELETE',
            url: `koopon-financeiro-rest-api/commons/cartoes_operadora/64`,

            failOnStatusCode: false

        })




    }



}


export default new Request();