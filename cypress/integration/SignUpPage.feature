Feature: Test SignUp Page

        Background:
            Given user navigates to signUp page of PPm tool

        Scenario Outline: Expected Forms and Sign up Button
             When user checks the submit page
             Then the sumbit page contains the Inputs "<InputFields>" with the expected "<Description>"
              And the submit page contains the Sign up Button

        Examples:
                  | InputFields   | Description |
                  | Name Form     | Name        |
                  | Email Form    | Email       |
                  | Password Form | Password    |
                  | Company Form  | Company     |
                  | Address       | Address     |




        Scenario Outline: Check Required Fields
             When user does not give any input for the required field "<input_field>"
              And user clicks on Sign Up button
             Then an error "<error>" message should be visible under the "<input_field>"

        Examples:
                  | input_field   | error                  |
                  | Name Form     | This field is required |
                  | Email Form    | This field is required |
                  | Password Form | This field is required |



        Scenario Outline: Check Non Required Fields
             When user does not give any input for the non required field "<input_field>"
              And user does give valid input for two of the three required fields
              And user clicks on Sign Up button
             Then no error message visible under the "<input_field>"

        Examples:
                  | input_field |
                  | Company     |
                  | Address     |



        Scenario Outline: Validation of Email Field
             When user inputs invalid email "<email_input>"
              And user clicks on Sign Up button
             Then an error "<error>" message should be visible under the email input field

        Examples:
                  | email_input      | error                |
                  | 123456635        | Invalid email format |
                  | test@@@gmail.com | Invalid email format |
                  | test2-hotmail    | Invalid email format |

