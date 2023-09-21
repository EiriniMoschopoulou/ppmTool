# Setup

## Getting Started

### Clone the repository:

```sh
git clone git@github.com:EiriniMoschopoulou/ppmTool.git
```

## Some tips

1. Make sure you already have npm installed. If not, use this command to install npm:

```sh
npm install
```

2. Make sure you already have cypress installed. If not, use this command to install cypress:

```sh
npm install cypress --save-dev
```

3. Make sure you have _cypress-cucumber-preprocessor_ plugin. If not, use this command to install it:

```sh
npm install --save-dev cypress-cucumber-preprocessor
```

_Find more info here: https://www.npmjs.com/package/cypress-cucumber-preprocessor_

4. Also highly recommended to use these plugins in your IDE:

- Cucumber (Gherkin) Full Support
- Gherkin Beautifier
- Snippets and Syntax Highlight for Gherkin (Cucumber)
- Prettier - Code formatter

## How to run Tests

Go to cypress/package.json and run the script "cypress:open" or "cypress:run". The first will open the IDE of cypress. The second one will run the test headless.

## How to Export Test Report

After you have run at least one time at least one feature file (otherwise you will not see any result) the go to cypress/package.json and run the script "test:report". You can find the latest report under : \cypress\report.
