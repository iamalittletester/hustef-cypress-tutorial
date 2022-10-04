describe('second suite', () => {
    it('third test', () => {
        cy.log(Cypress.env('theCookieValue'))
        cy.log(Cypress.env('theSecondCookieValue'))
    })
})