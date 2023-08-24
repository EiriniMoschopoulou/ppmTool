Feature: Test Base Page

        Scenario Outline: Check Base Page - Different Screen sizes
            Given user navigates to Base page of PMTool with screen size "<screenSize>"
             When  user checks the page
             Then a tip message "<note>" is shown
              And the Log in button exists
              And the Sign up button exists
              And the PMTool logo is shown
              And the title of the page is "<head_title>"


        Examples:
                  | screenSize | note                                                                          | head_title |
                  | LG         | Welcome to PPM tool. Signup for free, or login if you already have an account | PPM tool   |
                  | XL         | Welcome to PPM tool. Signup for free, or login if you already have an account | PPM tool   |
                  | XXL        | Welcome to PPM tool. Signup for free, or login if you already have an account | PPM tool   |