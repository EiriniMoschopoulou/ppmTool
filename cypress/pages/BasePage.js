/// <reference types="cypress" />

class BasePage {
    elements = {
        getTipMsg: () => cy.get('[id="welcome_card"]'),
        getLoginBtn: () => cy.get('[id="login"]'),
        getSignUpBtn: () => cy.get('[id="signup"]'),
        getLogo: () => cy.get('[id="app-logo"]')
    }



    visitBasePage() {
        cy.visit('/')
    }

    chckTipMessage(note) {
        this.elements.getTipMsg().should('be.visible')
        this.elements.getTipMsg().invoke('text').should('eq', note)
    }

    checklogInBtn() {
        this.elements.getLoginBtn().should('be.visible')

    }

    checkSignUpBtn() {
        this.elements.getSignUpBtn().should('be.visible')

    }

    checkLogo() {
        this.elements.getLogo().should('be.visible')

    }

    getTitleOfPage(head_title) {
        cy.title().should('eq', head_title)
    }


}

export default BasePage