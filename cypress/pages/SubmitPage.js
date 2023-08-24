/// <reference types="cypress" />

import CommonElements from './CommonElements'

const commonElements = new CommonElements()

class SubmitPage {
    elements = {
        getNameField: () => cy.get('[id="fullName"]'),
        getNameTitle: () => cy.get('[for="fullName"]'),
        getCompanyField: () => cy.get('[id="company"]'),
        getCompanyTitle: () => cy.get('[for="company"]'),
        getAddressField: () => cy.get('[id="address"]'),
        getAddressTitle: () => cy.get('[for="address"]'),
        getVerifyYourAccountMsg: () => cy.get('[class="card-title"]'),
        getSuccessfulSignUpMsg: () => cy.get('[class="card-content white-text"]')

    }


    visitSubmitPage() {
        cy.visit('/' + 'signup')
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

    checksumbitBtn() {
        commonElements.elements.getActionBtn().should('be.visible')
        commonElements.elements.getActionBtn().invoke('text').should('eq', 'Sign Upsend')
        commonElements.elements.getActionBtn().should('have.attr', 'type', 'submit')
    }

    clicksumbitBtn() {
        commonElements.elements.getActionBtn().click()
    }

    checkNameInputField(Description) {
        this.elements.getNameField().should('be.visible')
        this.elements.getNameTitle().should('be.visible')
        this.elements.getNameTitle().invoke('text').should('eq', Description)
    }

    checkCompanyFormInputField(Description) {
        this.elements.getCompanyField().should('be.visible')
        this.elements.getCompanyTitle().should('be.visible')
        this.elements.getCompanyTitle().invoke('text').should('eq', Description)
    }

    checkAddressInputField(Description) {
        this.elements.getAddressField().should('be.visible')
        this.elements.getAddressTitle().should('be.visible')
        this.elements.getAddressTitle().invoke('text').should('eq', Description)
    }

    inputCompanytitle() {
        this.elements.getCompanyField().focus().type('TestCompany')
    }

    inputCompany(Company) {
        this.elements.getCompanyField().focus().type(Company)

    }

    inputAddresstitle() {
        this.elements.getAddressField().focus().type('Athens Syntagma Square')
    }

    inputAddress(Address) {
        this.elements.getAddressField().focus().type(Address)

    }

    checkErrorMessage(error, input_field) {
        switch (input_field) {
            case 'Email Form':
                commonElements.elements.getErrorMessage().eq(1).invoke('text').should('eq', error)
                break;
            case 'Password Form':
                commonElements.elements.getErrorMessage().eq(2).invoke('text').should('eq', error)
                break;
            case 'Name Form':
                commonElements.elements.getErrorMessage().eq(0).invoke('text').should('eq', error)
                break;

        }
    }


    checkErrorMessageNonRequiredFields(input_field) {
        switch (input_field) {
            case 'Company':
                commonElements.elements.getErrorMessage().eq(3).should('not.exist')
                break;
            case ' Address':
                commonElements.elements.getErrorMessage().eq(4).should('not.exist')
                break;


        }
    }

    inputValidName() {
        this.elements.getNameField().focus().type('TestName')
    }

    inputName(Name) {
        this.elements.getNameField().focus().type(Name)

    }


    inputEmail(email_input) {

        commonElements.elements.getEmailField().focus().type(email_input)
    }

    inputValidPassword() {
        commonElements.elements.getPasswordField().focus().type('123456')

    }

    inputPassword(Password) {
        commonElements.elements.getPasswordField().focus().type(Password)

    }

    checkSuccessfulSignUpMsg(text) {
        this.elements.getSuccessfulSignUpMsg().find('p').should('be.visible')
        this.elements.getSuccessfulSignUpMsg().find('p').invoke('text').should('eq', text)


    }

    checkVerifyYourAccountMsg(text) {
        this.elements.getVerifyYourAccountMsg().should('be.visible')
        this.elements.getVerifyYourAccountMsg().invoke('text').should('eq', text)
    }


}
export default SubmitPage