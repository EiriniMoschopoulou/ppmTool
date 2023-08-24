Feature: Dashboard Page


        Background:
            Given user loged in with valid credentials

                  | Name     | Password |
                  | TestName | 123456   |

             When user navigates to Dashboard Page

        Scenario:  Users should be able to Add / Edit / View / Delete projects
             Then the Welcome Text Message is appeared
                  | Welcome Text | Info Message                                               |
                  | Welcome!     | There are no projects created yet. Start by creating some! |
              And the Dashboard page contains the create Button

        Scenario Outline:  Users should be able to Add / Edit / View / Delete tasks for a specific project
              And creates a new project with name "<name>" and description "<description>"
             Then  user is redirected to Dashboard page
              And the Dashboard page contains the new project with name "<name>"
        Examples:
                  | name              | description              |
                  | Test Project name | Test Project Description |




        Scenario Outline: User can Edit / View / Delete tasks for a specific project
              And creates a new project with name "<name>" and description "<description>"
             Then the projects tab contains the buttons
                  | ButtonAdd | ButtonView | ButtonEdit | ButtonDelete |
                  | Add task  | View Tasks | Edit       | Delete       |


        Examples:
                  | name              | description              |
                  | Test Project name | Test Project Description |

        Scenario Outline: Create Task
              And creates a new project with name "<name>" and description "<description>"
              And user creates a task with details "<summary>" and "<description_task>" and "<status>" and "<labels>"
             Then user is redirected to the tasks page of the project
              And the tasks contains the columns TO DO and IN PROGRESS and IN REVIEW and DONE
              And the tasks page of the project contains the last created task with summary "<summary>"


        Examples:
                  | name              | description              | summary         | description_task    | status | labels  |
                  | Test Project name | Test Project Description | TestSummaryTask | TestDescriptionTask | TO DO  | backend |

        Scenario Outline:  Users should be able to edit or delete a task
              And creates a new project with name "<name>" and description "<description>"
              And user creates a task with details "<summary>" and "<description>" and "<status>" and "<labels>"
             Then the task tab with summary "<summary>" contains the button edit and delete


        Examples:
                  | name              | description              | summary         | description_task    | status | labels  |
                  | Test Project name | Test Project Description | TestSummaryTask | TestDescriptionTask | TO DO  | backend |


        Scenario Outline:Users should be able  to move tasks to different status(es) through drag and drop
              And creates a new project with name "<name>" and description "<description>"
              And user creates a task with details "<summary>" and "<description>" and "<status>" and "<labels>"
             Then user is able to drag and drop the task with summary "<summary>" to tab "<tab>"


        Examples:
                  | name              | description              | summary         | description_task    | status | labels  | tab         |
                  | Test Project name | Test Project Description | TestSummaryTask | TestDescriptionTask | TO DO  | backend | In PROGRESS |