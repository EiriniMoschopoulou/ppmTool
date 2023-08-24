/// <reference types="cypress" />

class CommonElements {
    elements = {
        getEmailField: () => cy.get('[id="email"]'),
        getEmailTitle: () => cy.get('[for="email"]'),
        getPasswordField: () => cy.get('[id="password"]'),
        getPasswordTitle: () => cy.get('[for="password"]'),
        getErrorMessage: () => cy.get('[class="invalid-feedback"]'),
        getActionBtn: () => cy.get('[name="action"]')
    }

}

export default CommonElements