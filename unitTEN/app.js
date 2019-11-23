const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const Employee = require("./lib/employee.js");
const Engineer = require("./lib/engineer.js");
const Manager = require("./lib/manager.js");
const Intern = require("./lib/intern.js");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./output/htmlrender.js")

const teamMembers = [];
const IDarray = [];

function appMenu (){
    function addManager(){
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?"
                //validate? uses a return
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the manager's ID?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email?"
            },
            {
                type: "input",
                name: "managerOffice",
                message: "What is the manager's office number?"
            }
            
        ])
        .then (answers => {
            const manager = new Manager (answers.managerName, answers.managerID, answers.managerOffice, answers.managerEmail)

            teamMembers.push(manager)

            IDarray.push(answers.managerID)
            
            createTeam();

        })}
        

        function createTeam (){
            inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: ["Intern", "Engineer", "No more plz"]
            },

            ])

            .then (userChoice =>{
                switch(userChoice.memberChoice){
                    case "Engineer":
                        addEngineer (); //function
                    break;
                    case "Intern":
                        addIntern (); //function
                    break;
                    default:
                    buildteam(); //function
                }

            })
        }



function addEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
            //validate? uses a return
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's github username?"
        }
    ])

    .then (answers => {
        const engineer = new Engineer (answers.engineerName, answers.engineerID, answers.engineerGithub, answers.engineerEmail)

        teamMembers.push(engineer)

        IDarray.push(answers.engineerID)
        
        createTeam();

    })
}

function addIntern(){

    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
            //validate? uses a return
        },
        {
            type: "input",
            name: "internID",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "Where did the intern go to school?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?"
        }
    ])
    .then (answers => {
        const intern = new Intern (answers.internName, answers.internID, answers.internSchool, answers.internEmail)

        teamMembers.push(intern)

        IDarray.push(answers.internID)
        
        createTeam();
    })
 
    }

    function buildteam(){
    
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    }

    addManager();
}

appMenu();


