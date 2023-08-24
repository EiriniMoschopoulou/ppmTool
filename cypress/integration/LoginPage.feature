Feature: Test Login Page

        Background:
            Given user navigates to login page of PPm tool

        Scenario Outline: Expected Forms and Login Button
             When user checks the login page
             Then the login page contains the Inputs "<InputFields>" with the expected "<Description>"
              And the login page contains the Login Button

        Examples:
                  | InputFields   | Description |
                  | Email Form    | Email       |
                  | Password Form | Password    |



        Scenario Outline: Check Required Fields
             When user does not give any input for the required field "<input_field>"
              And user clicks on Log in button
             Then an error "<error>" message should be visible under the "<input_field>"

        Examples:
                  | input_field   | error              |
                  | Email Form    | Invalid login info |
                  | Password Form | Invalid login info |