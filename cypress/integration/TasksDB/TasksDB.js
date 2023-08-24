/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import CommonElements from '../../pages/CommonElements';
import SubmitPage from '../../pages/SubmitPage'
import Settings from '../../pages/Settings';
import LoginPage from '../../pages/loginPage';
import Dashboard from '../../pages/Dashboard';
import Tasks from '../../pages/Tasks';
import TasksDBpage from '../../pages/TasksDBpage'

const submitpage = new SubmitPage()
const commonElements = new CommonElements()
const settings = new Settings()
const login = new LoginPage()
const dashboard = new Dashboard()
const tasks = new Tasks()
const tasksDB = new TasksDBpage()

beforeEach(() => {
    cy.intercept('POST', '**/api/register', { fixture: 'Users/users.json' }).as('user')
    cy.intercept('POST', '**/api/login', { status: 200 }).as('login')
    cy.intercept('GET', '**/api/currentUser', { status: 200 }).as('CurrentUser')
    cy.intercept('GET', '**/api/projects', { fixture: 'Projects/newProjectWithTasks.json' }).as('Project')


    cy.intercept('GET', '**/**/tasks', { fixture: 'Tasks/getThreetasks.json' }).as('GetTasks')
    //cy.intercept('PUT', '**/tasks**', { fixture: 'Tasks/updatetask.json' }).as('UpdateTasks')

    cy.intercept('GET', '**/**/api/alltasks', { fixture: 'Tasks/getThreetasks.json' }).as('GetTasks')




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

And('user has a Project in Dashboard with name Test Project with Tasks', () => {
})




And('user creates a task with details {string} and {string} and {string} and {string}', (summary, description_task, status_task, labels) => {
    cy.wait('@Project')
    dashboard.clickOncreateTask()
    if (summary == 'TestSummaryTask') {
        cy.intercept('POST', '**/tasks', { fixture: 'Tasks/createtask.json' })
    }
    else if (summary == 'ATestSummaryTask 2') {
        cy.intercept('POST', '**/tasks', { fixture: 'Tasks/createATestSummaryTasks2.json' })
    }
    else if (summary == 'BTestSummaryTask 3') {
        cy.intercept('POST', '**/tasks', { fixture: 'Tasks/createBTestSummaryTask3.json' })
    }
    tasks.createTask(summary, description_task, status_task, labels)
})

And('user navigates to TasksDB page', () => {
    tasksDB.visitTasksDBPage()

})

And('the tasks page of the project contains the last created task with summary {string}', (summary) => {
    tasks.checktasksSummary(summary)

})

When('user clicks on Sort by Summary Button', () => {
    tasksDB.clickSortBySummaryBtn()
})

Then('the tasks are sorted accordingly', (Tasks) => {
    var TaskSummary;
    let ArrayOfTasks = new Array();

    Tasks.hashes().forEach(elem => {

        for (var propName in elem) {
            TaskSummary = elem[propName]
            //cy.log(TaskSummary)
            const addactions = ArrayOfTasks.push(TaskSummary)
            //cy.log(addactions)
        }
    })
    //cy.log(ArrayOfTasks)

    tasksDB.checkTasksAfterSorting(ArrayOfTasks)

})


When('user perform a search with keyword {string}', (search_input) => {
    tasksDB.searchDBpage(search_input)

})


Then('the page returns the expected result {string}', (pageResult) => {
    if (pageResult == 'null page') {
        tasksDB.checkNullPageResult()
    } else if (pageResult == 'ATestSummaryTask 2') {
        tasks.checktasksSummary(pageResult)
    }
})
