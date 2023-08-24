Feature: TasksDB Page Tests



        Background:
            Given user loged in with valid credentials

                  | Name     | Password |
                  | TestName | 123456   |

              And user navigates to Dashboard Page
              And user has a Project in Dashboard with name Test Project with Tasks


        Scenario Outline:  Users should be able to view all tasks belonging to their projects in TaskDB And Sort Functionality
              And user creates a task with details "<summary>" and "<description_task>" and "<status>" and "<labels>"
              And user navigates to TasksDB page
              And the tasks page of the project contains the last created task with summary "<summary>"
             When user clicks on Sort by Summary Button
             Then the tasks are sorted accordingly
                  | Task1              | Task2              | Task3           |
                  | ATestSummaryTask 2 | BTestSummaryTask 3 | TestSummaryTask |


        Examples:
                  | summary            | description_task      | status | labels  |
                  | TestSummaryTask    | TestDescriptionTask   | TO DO  | backend |
                  | ATestSummaryTask 2 | TestDescriptionTask 2 | TO DO  | backend |
                  | BTestSummaryTask 3 | TestDescriptionTask 3 | TO DO  | backend |


        Scenario Outline: User is able to perform searching on tasks DB Page
              And user creates a task with details "<summary>" and "<description_task>" and "<status>" and "<labels>"
              And user navigates to TasksDB page
             When user perform a search with keyword "<search_input>"
             Then the page returns the expected result "<resultOfSearching>"


        Examples:
                  | summary            | description_task      | status | labels  | search_input     | resultOfSearching  |
                  | TestSummaryTask    | TestDescriptionTask   | TO DO  | backend | another-notFound | null page          |
                  | ATestSummaryTask 2 | TestDescriptionTask 2 | TO DO  | backend | ATestSummary     | ATestSummaryTask 2 |
                  | BTestSummaryTask 3 | TestDescriptionTask 3 | TO DO  | backend | null             | null page          |
