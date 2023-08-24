/// <reference types="cypress" />
import CommonElements from './CommonElements'
import SubmitPage from './SubmitPage'

const commonElements = new CommonElements()
const submitpage = new SubmitPage()
class Dashboard {
    elements = {
        getDashboardBtn: () => cy.get('[id="dashboard"]'),
        getWelcomeMsg: () => cy.get('[class="card-title"]'),
        getInfoMsg: () => cy.get('[class="card-content white-text"]'),
        getCreateBtnDashboard: () => cy.get('[class="waves-effect waves-light btn"]'),
        getAddtaskBtn: () => cy.get('[id="btn_add_task" i]'),
        getViewtaskBtn: () => cy.get('[id="btn_view_tasks"]'),
        getEditTaskBtn: () => cy.get('[id="btn_update_project"]'),
        getDeleteTaskBtn: () => cy.get('[id="delete_project"]'),
        getInputName: () => cy.get('[id="name"]'),
        getInputDescription: () => cy.get('[id="description"]'),
        getCreateBtn: () => cy.get('[name="action"]')


    }

    checkUrl() {
        cy.url().should('eq', 'https://node-fs-app.herokuapp.com/dashboard')
    }

    clickDashboardBtn() {
        this.elements.getDashboardBtn().click()
    }

    checkCreateBtn() {
        this.elements.getCreateBtnDashboard().should('be.visible')
    }

    clickCreateProjectBtnDashboard() {
        this.elements.getCreateBtnDashboard().click()

    }

    inputProjectName(name) {
        this.elements.getInputName().type(name)
    }

    inputProjectDescription(name) {
        this.elements.getInputDescription().type(name)
    }

    createProjectBtn() {
        this.elements.getCreateBtn().click()
    }

    checkExistenceOfProject(nameProject) {
        this.elements.getWelcomeMsg().eq(3).invoke('text').should('eq', nameProject)
    }

    checkExistenceBtnAddtask() {
        this.elements.getAddtaskBtn().should('exist')
    }

    checkExistenceBtnView() {
        this.elements.getViewtaskBtn().should('exist')

    }

    checkExistenceBtnEdit() {
        this.elements.getEditTaskBtn().should('exist')

    }


    checkExistenceBtnDelete() {
        this.elements.getDeleteTaskBtn().should('exist')

    }


    clickOncreateTask() {
        this.elements.getAddtaskBtn().eq(0).click()
    }

}

export default Dashboard