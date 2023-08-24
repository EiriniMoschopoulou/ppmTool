/// <reference types="cypress" />


class Tasks {
    elements = {
        getTaskTitle: () => cy.get('[id="card_title"]'),
        getTaskDescription: () => cy.get('[id="card_description"]'),
        getTaskLabel: () => cy.get('[id="card_label"]'),
        getEditTaskBtn: () => cy.get('[id="btn_update_task"]'),
        getDeleteTaskBtn: () => cy.get('[id="btn_delete_task"]'),
        getTasksStatuses: () => cy.get('[class="col s3"]'),
        getSummaryField: () => cy.get('[id="summary"]'),
        getDescriptionField: () => cy.get('[id="description"]'),
        getStatusDropdown: () => cy.get('[class="select-dropdown dropdown-trigger"]'),
        getLabelsField: () => cy.get('[id="search_input"]'),
        getCreateBtn: () => cy.get('[name="action"]'),
        getDropdownStatusesValues: () => cy.get('[class="select-wrapper"]'),
        getFirstValueLabels: () => cy.get('[class="col s12"]'),
        getColumnsValues: () => cy.get('[class="col s3"] h6'),
        getTaskCard: () => cy.get('[id="6213f023c3d71c0021d1c831"]'),
        getInProgressItems: () => cy.get('[id="in_progress_items"]'),
        getTodoItems: () => cy.get('[id="to_do_items"]')
    }

    checkUrl() {
        cy.url().should('contain', '/tasks')
    }

    createTask(summary, description_task, status_task, labels) {
        this.elements.getSummaryField().click({ force: true }).type(summary)
        this.elements.getDescriptionField().click({ force: true }).type(description_task)
        this.elements.getStatusDropdown().click({ force: true })
        this.elements.getDropdownStatusesValues().eq(0).click()
        //this.elements.getLabelsField().click()
        this.elements.getCreateBtn().click()

    }

    checkColumns() {
        this.elements.getColumnsValues().should('have.length', 4)
        this.elements.getColumnsValues().eq(0).invoke('text').should('eq', 'TO DO')
        this.elements.getColumnsValues().eq(1).invoke('text').should('eq', 'IN PROGRESS')
        this.elements.getColumnsValues().eq(2).invoke('text').should('eq', 'IN REVIEW')
        this.elements.getColumnsValues().eq(3).invoke('text').should('eq', 'DONE')

    }


    checktasksSummary(summary) {
        let size = this.elements.getTaskTitle().its('length')
        for (let i = 0; i < size; i++) {
            this.elements.getTaskTitle().eq(i).invoke('text').should('eq', summary)
        }
    }

    checkTasksDetails(summary) {
        this.checktasksSummary(summary)
        this.elements.getEditTaskBtn().should('be.visible')
        this.elements.getDeleteTaskBtn().should('be.visible')

    }

    dragAndDrop(summary, tab) {
        const dataTransfer = new DataTransfer();


        this.elements.getTaskCard()
            .trigger('dragstart', { dataTransfer });

        this.elements.getInProgressItems()
            .trigger('drop', { dataTransfer });

    }


}

export default Tasks