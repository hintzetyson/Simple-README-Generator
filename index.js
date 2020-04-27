const fs = require("fs")
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

const titleValidation = async (input) => {
    if (input === '') {
       return 'Field cannot be left blank';
    }

    return true;
}

const questions = [
    {
        type: 'input',
        message: 'What is your github name?',
        name: 'githubName',
        validate: titleValidation
    },
    {
        type: 'input',
        message: 'What is name of your project?',
        name: 'title',
        validate: titleValidation
    },
    {
        type: 'input',
        message: 'Make a short description for your project',
        name: 'description',
        validate: titleValidation
    },
    {
        type: 'confirm',
        message: 'Would like a table of contents?',
        name: 'table',
    },
    {
        type: 'input',
        message: 'How does a user install your project?',
        name: 'install'
    },
    {
        type: 'input',
        message: 'How is your project supposed to be used?',
        name: 'usage'
    },
    {
        type: 'confirm',
        message: 'Would you like to list any credits?',
        name: 'creditTrueOrFalse'
    }, {
        when: function (response) {
          return response.creditTrueOrFalse;
        },
        type: 'input',
        message: 'Who would you like to credit?',
        name: 'creditor'
    },
    {
        type: 'list',
        message: 'Finally, what type of license would you like to use?',
        name: 'license',
        choices: ['MIT', 'GNU', 'No license']
    }
];

function writeToFile(fileName, data) {
    let generated = generateMarkdown(data);

    fs.writeFile(fileName, generated, () => {
        console.log(`${fileName} has been generated!`)
    })
}

function init() {
    inquirer.prompt(questions).then(function (answers) {
        writeToFile(`${answers.title}-README.md`, answers);
    });
}

init();
