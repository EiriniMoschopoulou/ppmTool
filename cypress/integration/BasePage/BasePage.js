/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import BasePage from '../../pages/BasePage'

const basepage = new BasePage()


Given('user navigates to Base page of PMTool with screen size {string}', (screenSize) => {

    if (screenSize == 'LG') {
        cy.viewport(1280, 809)
    } else if (screenSize == 'XL') {
        cy.viewport(1919, 1080)
    } else if (screenSize == 'ΧXL') {
        cy.viewport(1922, 1080)
    }
    basepage.visitBasePage()

})

When('user checks the page', () => { })

Then('a tip message {string} is shown', (note) => {
    basepage.chckTipMessage(note)

})

And('the Log in button exists', () => {
    basepage.checklogInBtn()
})

And('the Sign up button exists', () => {
    basepage.checkSignUpBtn()
})

And('the PMTool logo is shown', () => {
    basepage.checkLogo()
})

And('the title of the page is {string}', (head_title) => {
    basepage.getTitleOfPage(head_title)
})