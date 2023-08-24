/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import CommonElements from '../../pages/CommonElements';
import SubmitPage from '../../pages/SubmitPage'
import Settings from '../../pages/Settings';
import LoginPage from '../../pages/loginPage';

const submitpage = new SubmitPage()
const commonElements = new CommonElements()
const settings = new Settings()
const login = new LoginPage()

beforeEach(() => {
    cy.intercept('POST', '**/api/register', { fixture: 'Users/users.json' }).as('user')
    cy.intercept('POST', '**/api/login', { status: 200 }).as('login')
    cy.intercept('GET', '**/api/currentUser', { status: 200 }).as('CurrentUser')
    cy.intercept('PUT', '**/api/currentUser', { fixture: 'Users/userUpdate.json' }).as('UpdatedUser')

    cy.intercept('GET', '**/api/projects', { status: 200 }).as('Projects')



});


Given('user with details has succesfully signedUp', (dataTable) => {
    submitpage.visitSubmitPage()

    var propValue;
    dataTable.hashes().forEach(elem => {
        for (var propName in elem) {
            propValue = elem[propName]
            if (propName == 'Name') {
                submitpage.inputName(propValue)
            }
            else if (propName == 'Password') {
                submitpage.inputPassword(propValue)
            }
            else if (propName == 'Email') {
                let value1 = Math.random();
                submitpage.inputEmail(propValue + value1)
            }
            else if (propName == 'Company') {
                submitpage.inputCompany(propValue)
            }
            else if (propName == 'Address') {
                submitpage.inputAddress(propValue)
            }
        }

    });
    submitpage.clicksumbitBtn()


})

And('the Verify Your Account Message is appeared', (text) => {

    var propValue;
    text.hashes().forEach(elem => {
        for (var propName in elem) {
            propValue = elem[propName]
            if (propName == 'SuccesfulSignUpMessage') {
                submitpage.checkSuccessfulSignUpMsg(propValue)
            }
            else if (propName == 'VerifyYourAccountMessage') {
                submitpage.checkVerifyYourAccountMsg(propValue)
            }
        }
    })
})

And('user loged in with the above credentials', (credentials) => {
    login.clickLoginBtnAction()
    var propValue;
    credentials.hashes().forEach(elem => {
        for (var propName in elem) {
            propValue = elem[propName]
            if (propName == 'Name') {
                login.inputEmail(propValue)
            }
            else if (propName == 'Password') {
                login.inputPassword(propValue)
            }
        }
    })
    login.clickLoginBtn()
})


When('user navigates to Setting Page', () => {
    cy.intercept('GET', '**/api/currentUser', { fixture: 'Users/users.json' }).as('user')
    settings.visitSettingsPage()
})


Then('the page contains the Inputs {string} with the expected {string}', (InputFields, Description) => {
    switch (InputFields) {
        case 'Email Form':
            submitpage.checkEmailInputField(Description)
            break;
        case 'Password Form':
            submitpage.checkPasswordInputField(Description)
            break;
        case 'Name Form':
            submitpage.checkNameInputField(Description)
            break;
        case 'Company Form':
            submitpage.checkCompanyFormInputField(Description)
            break;
        case 'Address':
            submitpage.checkAddressInputField(Description)
            break;
    }

})

And('the {string} are prefilled with the expected {string}', (InputFields, values) => {
    switch (InputFields) {

        case 'Name Form':
            settings.checkNameInputField(values)
            break;
        case 'Company Form':
            settings.checkCompanyFormInputField(values)
            break;
        case 'Address':
            settings.checkAddressInputField(values)
            break;
    }

})

And('the Settings page contains the Update Info Button', () => {
    settings.checkUpdateInfobtn()
})

And('user modify his name to {string}', (name) => {
    settings.clearNameField()
    submitpage.inputName(name)
})

And('user modify his Company to {string}', (company) => {
    settings.clearCompanyField()
    submitpage.inputCompany(company)
})


And('user clicks on Update Info Button', () => {
    settings.clickupdateInfo()
})


Then('a pop up window message is shown up', () => {
    settings.checkSuccessfulMessage()
})

And('the Settings page contains the Inputs {string} with the expected {string}', (name, Company) => {
    cy.intercept('GET', '**/api/currentUser', { fixture: 'Users/userUpdate.json' }).as('UpdatedFields')

    settings.visitSettingsPage()
    settings.checkNameInputField(name)
    settings.checkCompanyFormInputField(Company)

})


And('user does not give any input for the required field {string}', (input_field) => {
    switch (input_field) {

        case 'Name Form':
            settings.clearNameField()
            break;
        case 'Email Form':
            settings.clearEmailField()
            break;
        case 'Password Form':
            settings.clearPasswordField()
            break;
    }
})


Then('an error {string} message should be visible under the {string}', (error, input_field) => {
    submitpage.checkErrorMessage(error, input_field)

})
