class Asserts {
    validaStatus(response, status) {
        expect(response.status).to.eq(status)
        

    }

}

export default new Asserts();