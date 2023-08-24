Feature: Check Settings Page


        Background:

            Given user with details has succesfully signedUp
                  | Name     | Password | Email             | Company     | Address       |
                  | TestName | 123456   | test123@gmail.com | TestCompany | TestAddress 8 |
              And the Verify Your Account Message is appeared
                  | VerifyYourAccountMessage | SuccesfulSignUpMessage                                 |
                  | Verify your account      | Successfull registration, login to start using PPMTool |
              And user loged in with the above credentials
                  | Name     | Password |
                  | TestName | 123456   |

             When user navigates to Setting Page




        Scenario Outline: User can validate their personal details in the Settings tab

             Then the page contains the Inputs "<InputFields>" with the expected "<Description>"
              And the "<InputFields>" are prefilled with the expected "<values>"
              And the Settings page contains the Update Info Button

        Examples:
                  | InputFields  | Description | values        |
                  | Name Form    | Name        | TestName      |
                  | Company Form | Company     | TestCompany   |
                  | Address      | Address     | TestAddress 8 |


        Scenario Outline: User can modify their personal details in the Settings tab
              And user modify his name to "<name>"
              And user modify his Company to "<Company>"
              And user clicks on Update Info Button
             Then a pop up window message is shown up
              And the Settings page contains the Inputs "<name>" with the expected "<Company>"

        Examples:
                  | name  | Company       |
                  | Test2 | Company Test2 |


        Scenario Outline: Check Required Fields
              And user does not give any input for the required field "<input_field>"
              And user clicks on Update Info Button
             Then an error "<error>" message should be visible under the "<input_field>"

        Examples:
                  | input_field   | error                  |
                  | Name Form     | This field is required |
                  | Email Form    | This field is required |
                  | Password Form | This field is required |
