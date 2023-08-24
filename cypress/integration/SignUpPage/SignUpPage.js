/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import CommonElements from '../../pages/CommonElements';
import SubmitPage from '../../pages/SubmitPage'

const submitpage = new SubmitPage()
const commonElements = new CommonElements()


Given('user navigates to signUp page of PPm tool', () => {
    submitpage.visitSubmitPage()

})

When('user checks the submit page', () => {
})


Then('the sumbit page contains the Inputs {string} with the expected {string}', (InputFields, Description) => {
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

And('the submit page contains the Sign up Button', () => {
    submitpage.checksumbitBtn()
})

When('user does not give any input for the required field {string}', (input_field) => {
    submitpage.inputCompanytitle()
    submitpage.inputAddresstitle()
})

And('user clicks on Sign Up button', () => {
    submitpage.clicksumbitBtn()
})

Then('an error {string} message should be visible under the {string}', (error, input_field) => {
    submitpage.checkErrorMessage(error, input_field)

})

When('user does not give any input for the non required field {string}', (input_field) => {

})


And('user does give valid input for two of the three required fields', () => {
    submitpage.inputValidName()
    submitpage.inputValidPassword()
})

Then('no error message visible under the {string}', (input_field) => {
    submitpage.checkErrorMessageNonRequiredFields(input_field)
})

When('user inputs invalid email {string}', (email_input) => {
    submitpage.inputEmail(email_input)
})

Then('an error {string} message should be visible under the email input field', (error) => {
    submitpage.checkErrorMessage(error, 'Email Form')
})
