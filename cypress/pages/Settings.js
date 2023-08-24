/// <reference types="cypress" />
import CommonElements from './CommonElements'
import SubmitPage from './SubmitPage'

const commonElements = new CommonElements()
const submitpage = new SubmitPage()
class Settings {
    elements = {
        getUpdateInfo: () => cy.get('[id="update_info"]'),
        getSuccessfulToastMessage: () => cy.get('[class="toast rounded teal lighten-1"]')

    }
    visitSettingsPage() {
        cy.visit('/' + 'settings')

    }
    checkNameInputField(Description) {
        submitpage.elements.getNameField().should('have.value', Description)

    }

    checkCompanyFormInputField(Description) {
        submitpage.elements.getCompanyField().should('have.value', Description)

    }
    checkAddressInputField(Description) {
        submitpage.elements.getAddressField().should('have.value', Description)

    }

    clearNameField() {
        submitpage.elements.getNameField().clear({ force: true })
    }

    clearEmailField() {
        commonElements.elements.getEmailField().clear({ force: true })
    }

    clearPasswordField() {

        commonElements.elements.getPasswordField().clear({ force: true })

    }


    clearCompanyField() {
        submitpage.elements.getCompanyField().clear({ force: true })
    }

    checkUpdateInfobtn() {
        this.elements.getUpdateInfo().should('be.visible')

    }

    clickupdateInfo() {
        this.elements.getUpdateInfo().click()

    }

    checkSuccessfulMessage() {
        this.elements.getSuccessfulToastMessage().should('be.visible')
    }

}

export default Settings