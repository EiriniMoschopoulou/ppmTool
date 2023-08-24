/// <reference types="cypress" />

import CommonElements from './CommonElements'

const commonElements = new CommonElements()

class loginPage {
    elements = {
        getloginBtn: () => cy.get('[id="login"]')
    }


    visitLoginPage() {
        cy.visit('/' + 'login')
    }

    checkEmailInputField(Description) {
        commonElements.elements.getEmailField().should('be.visible')
        commonElements.elements.getEmailTitle().should('be.visible')
        commonElements.elements.getEmailTitle().invoke('text').should('eq', Description)
    }


    checkPasswordInputField(Description) {
        commonElements.elements.getPasswordField().should('be.visible')
        commonElements.elements.getPasswordTitle().should('be.visible')
        commonElements.elements.getPasswordTitle().invoke('text').should('eq', Description)


    }

    checkLoginBtn() {
        commonElements.elements.getActionBtn().should('be.visible')
        commonElements.elements.getActionBtn().invoke('text').should('eq', 'Loginsend')
        commonElements.elements.getActionBtn().should('have.attr', 'type', 'submit')
    }


    clickLoginBtn() {
        commonElements.elements.getActionBtn().click()
    }


    checkErrorMessage(error, input_field) {
        switch (input_field) {
            case 'Email Form':
                commonElements.elements.getErrorMessage().eq(0).invoke('text').should('eq', error)
                break;
            case 'Password Form':
                commonElements.elements.getErrorMessage().eq(1).invoke('text').should('eq', error)
                break;


        }
    }

    inputEmail(email) {
        commonElements.elements.getEmailField().focus().type(email)
    }

    inputPassword(password) {
        commonElements.elements.getPasswordField().focus().type(password)
    }

    clickLoginBtnAction() {
        this.elements.getloginBtn().click()
    }



}
export default loginPage