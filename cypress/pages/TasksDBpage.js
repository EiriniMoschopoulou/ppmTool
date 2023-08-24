/// <reference types="cypress" />

import Tasks from './Tasks'

const tasks = new Tasks()

class TasksDBpage {
    elements = {
        getDBTaskpage: () => cy.get('[id="task_db"]'),
        getSortBySummaryBtn: () => cy.get('[id="sort_tasks"]'),
        getSearchBoxInput: () => cy.get('[id="search"]')

    }

    checkUrl() {
        cy.url().should('contain', '/tasks/db')
    }

    visitTasksDBPage() {
        this.elements.getDBTaskpage().click()

    }

    clickSortBySummaryBtn() {
        this.elements.getSortBySummaryBtn().click()
    }

    checkTasksAfterSorting(ArrayOfTasks) {
        cy.log(ArrayOfTasks)
        var size = (ArrayOfTasks.length)
        for (let i = 0; i < size; i++) {
            tasks.elements.getTaskTitle().eq(i).invoke('text').should('contain', ArrayOfTasks[i])
        }
    }

    searchDBpage(search_input) {
        this.elements.getSearchBoxInput().click().type(search_input).type('{enter}')
    }

    checkNullPageResult() {
        this.elements.getSortBySummaryBtn().should('not.exist')
    }
}

export default TasksDBpage