const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const open = require("open");
const util = require("util");
const generateHTML = require("./generateHTML");

const prompt = [

    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["green","blue","pink","red"]
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username."
    },

];

const writeFile = util.promisify(fs.writeFile);

function init() {
    inquirer.prompt(prompt)
        

    .then(async function (html) {

        await writeFile("index.html", html);
        

    })
    .catch(function(error){
        console.log(error)
    })
}

init();