///<reference types='cypress'/>
describe('first suite', () => {
    beforeEach('before each', () => {
        Cypress.Cookies.preserveOnce('firstCookie')
    })
    it('first test', () => {
        // cy.visit('https://www.example.com')
        // cy.visit('cypress/fixtures/registration.html', {timeout : 1200000})
        // cy.viewport('iphone-4')
        cy.visit('cypress/fixtures/registration.html')
        
        Cypress.env('theCookieValue', 'firstValue')
        cy.log(Cypress.env('theCookieValue'))

        cy.setCookie('firstCookie', Cypress.env('theCookieValue'))
        // cy.screenshot()
        cy.get('#name').as('nameAlias')
        cy.get('@nameAlias').parent().children().first().should('have.text', 'Name')
        cy.get('@nameAlias').clear().type('myName')
        cy.get('.email').type('myname@example.com')
        cy.get('#country').select('Spain').find(':selected').should('have.text', 'Spain')
        cy.get('#city').select(['Malaga', 'Valencia'])
        cy.get('[type="date"]').type('2022-10-04')
        cy.get('[type="checkbox"]').check().uncheck().should('have.length', 2)
        // cy.get('[type="radio"]').check('Weekly')

        cy.get('[type="radio"]').eq(-2).check().should('be.checked').and('have.attr', 'value', 'Monthly')
        cy.get('[type="submit"]').click()

        cy.get('[type="submit"]').parent().find('span')

        cy.contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html')

        cy.getCookie('firstCookie').then((theCookie) => {
            expect(theCookie.value).to.eq(Cypress.env('theCookieValue'))
            expect(theCookie.domain).to.contain('local')
        })

        // cy.contains('Accept our cookie policy').parents('form')
        // cy.get('form').children()
        // cy.contains('Estonia').siblings()
        // cy.get('[type="radio"]').eq(-2)
    })
    it('second test',() => {
        cy.log(Cypress.env('theCookieValue'))
        cy.getCookies().should('have.length', 1)
        cy.getCookies().then((cookies) => {
            expect(cookies[0].name).to.eq('firstCookie')
            expect(cookies[0].value).to.eq(Cypress.env('theCookieValue'))
        })
        cy.setCookie('secondCookie', Cypress.env('theSecondCookieValue'))

        cy.clearCookie('firstCookie')
        cy.getCookies().should('have.length', 1)
        cy.clearCookies()
        cy.getCookies().should('have.length', 0)
    })
    it('third test', () => {
        cy.intercept('https://api.demoblaze.com/entries', {fixture : 'stubbedResponse.json'}).as('theIntercepted')
        cy.visit('https://www.demoblaze.com')
        cy.wait('@theIntercepted').then((theIntercepted) => {
            expect(theIntercepted.response.statusCode).to.eq(200)
            expect(JSON.stringify(theIntercepted.response.body)).to.contain('HTC One M9')
        })
    })
    it('fourth test', () => {
        cy.intercept('https://api.demoblaze.com/view', {statusCode : 404}).as('theIntercepted')
        cy.visit('https://www.demoblaze.com/prod.html?idp_=7')
        cy.wait('@theIntercepted').then((theIntercepted) => {
            expect(theIntercepted.response.statusCode).to.eq(404)
        })
    })
    it.only('fifth test', () => {
        cy.visit('https://saucedemo.com')
        cy.origin('http://www.google.com', () => {
                 cy.visit('http://www.google.com')
                 ///
                 ///
                 ///
                 
    })
    })
})