/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import loginPage from '../../pages/loginPage'
import Submitpage from '../../pages/SubmitPage'


const submitpage = new Submitpage()
const loginpage = new loginPage()


Given('user navigates to login page of PPm tool', () => {
    loginpage.visitLoginPage()

})

When('user checks the login page', () => {
})


Then('the login page contains the Inputs {string} with the expected {string}', (InputFields, Description) => {
    switch (InputFields) {
        case 'Email Form':
            loginpage.checkEmailInputField(Description)
            break;
        case 'Password Form':
            loginpage.checkPasswordInputField(Description)
            break;
    }

})

And('the login page contains the Login Button', () => {
    loginpage.checkLoginBtn()
})


When('user does not give any input for the required field {string}', (input_field) => { })

And('user clicks on Log in button', () => {
    loginpage.clickLoginBtn()
})

Then('an error {string} message should be visible under the {string}', (error, input_field) => {
    loginpage.checkErrorMessage(error, input_field)

})