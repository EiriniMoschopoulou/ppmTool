/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import CommonElements from '../../pages/CommonElements';
import SubmitPage from '../../pages/SubmitPage'
import Settings from '../../pages/Settings';
import LoginPage from '../../pages/loginPage';
import Dashboard from '../../pages/Dashboard';
import Tasks from '../../pages/Tasks';

const submitpage = new SubmitPage()
const commonElements = new CommonElements()
const settings = new Settings()
const login = new LoginPage()
const dashboard = new Dashboard()
const tasks = new Tasks()

beforeEach(() => {
    cy.intercept('POST', '**/api/register', { fixture: 'Users/users.json' }).as('user')
    cy.intercept('POST', '**/api/login', { status: 200 }).as('login')
    cy.intercept('GET', '**/api/currentUser', { status: 200 }).as('CurrentUser')
    cy.intercept('PUT', '**/api/currentUser', { fixture: 'Users/userUpdate.json' }).as('UpdatedUser')

    cy.intercept('GET', '**/api/projects', { fixture: 'Projects/nullProjects.json' }).as('ZeroProjects')
    cy.intercept('POST', '**/api/projects', { fixture: 'Projects/newProjectCreation.json' }).as('NewProject')

    cy.intercept('POST', '**/tasks', { fixture: 'Tasks/createtask.json' }).as('newTasks')
    cy.intercept('GET', '**/**/tasks', { fixture: 'Tasks/gettasks.json' }).as('GetTasks')
    //cy.intercept('PUT', '**/tasks**', { fixture: 'Tasks/updatetask.json' }).as('UpdateTasks')







});

Given('user loged in with valid credentials', (credentials) => {
    login.visitLoginPage()

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


And('user navigates to Dashboard Page', () => {
    dashboard.clickDashboardBtn()
})

Then('the Welcome Text Message is appeared', (text) => {

    var propValue;
    text.hashes().forEach(elem => {
        for (var propName in elem) {
            propValue = elem[propName]
            if (propName == 'Info Message') {
                submitpage.checkSuccessfulSignUpMsg(propValue)
            }
            else if (propName == 'Welcome Text') {
                submitpage.checkVerifyYourAccountMsg(propValue)
            }
        }
    })

})

And('the Dashboard page contains the create Button', () => {
    dashboard.checkCreateBtn()
})

And('creates a new project with name {string} and description {string}', (name, description) => {
    cy.intercept('GET', '**/api/projects', { fixture: 'Projects/newProjectGet.json' }).as('GetProjects')

    dashboard.clickCreateProjectBtnDashboard()
    dashboard.inputProjectName(name)
    dashboard.inputProjectDescription(description)
    dashboard.createProjectBtn()
})

Then('user is redirected to Dashboard page', () => {
    dashboard.checkUrl()

})


And('the Dashboard page contains the new project with name {string}', (nameProject) => {
    dashboard.checkExistenceOfProject(nameProject)
})


Then('the projects tab contains the buttons', (buttons) => {
    var propValue;
    buttons.hashes().forEach(elem => {
        for (var propName in elem) {

            if (propName == 'ButtonAdd') {
                dashboard.checkExistenceBtnAddtask()
            }
            else if (propName == 'ButtonView') {
                dashboard.checkExistenceBtnView()
            }
            else if (propName == 'ButtonEdit ') {
                dashboard.checkExistenceBtnEdit()
            }
            else if (propName == 'ButtonDelete') {
                dashboard.checkExistenceBtnDelete()
            }

        }
    })
})


And('user creates a task with details {string} and {string} and {string} and {string}', (summary, description_task, status_task, labels) => {
    dashboard.clickOncreateTask()
    tasks.createTask(summary, description_task, status_task, labels)
})

Then('user is redirected to the tasks page of the project', () => {
    tasks.checkUrl()
})

And('the tasks contains the columns TO DO and IN PROGRESS and IN REVIEW and DONE', () => {
    tasks.checkColumns()
})


And('the tasks page of the project contains the last created task with summary {string}', (summary) => {
    tasks.checktasksSummary(summary)

})


Then('the task tab with summary {string} contains the button edit and delete', (summary) => {
    tasks.checkTasksDetails(summary)
})


Then('user is able to drag and drop the task with summary {string} to tab {string}', (summary, tab) => {
    cy.intercept('GET', '**/**/tasks', { fixture: 'Tasks/getTasksAfterUpdate.json' }).as('GetTasksUpdated')
    tasks.dragAndDrop(summary, tab)
    cy.intercept('PUT', '**/tasks**', { fixture: 'Tasks/updatetask.json' }), (req) => {
        cy.log(req.body)
        expect(req.body).to.include('IN PROGRESS')
    }
})
