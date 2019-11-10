const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "location",
        message: "Where are you from?"
      },
      {
        type: "input",
        name: "gitHubUser",
        message: "Enter your GitHub Username"
      },
      {
        type: "input",
        name: "gitHubLink",
        message: "Enter your GitHub URL"
      },
      {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL."
      }
    ]);
  }

  function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="style.css">
        <title></title>
    </head>
    
    <body>
    
    <div id="topCard">
            <img id="frontpageimage" src="../frontpage/images/brookekumar.jpg"/>
            <h1 class="display-4">Hello!</h1>
            <h2>My name is ${answers.name}</h2>
            <div id=contact>
                <p>I am from ${answers.location}</p> 
                <p class="github" href="${gitHubLink}">GitHub</a>
                <p class="contact" href="${linkedin}">Conact</a>
            </div>
    </div>
    
    
     <!-- git hub bio  -->
     <div id="bio">
        <h3></h3>
    </div>
    
        <div id="infoCards">
                <!-- pubic repo -->
                <div id="publicRepo">
                    <h4>Public Repositories</h4>
                    <p></p>
                </div>
                                    
                <!--  followers -->
                <div id="followers">
                    <h4>Followers</h4>
                    <p></p>
                </div>           
    
                <!-- stars -->
                <div id="stars">
                <h4>GitHub Stars</h4>
                <p></p>
                </div>
                                    
                <!-- following -->
                <div id="following">
                <h4>Following</h4>
                <p></p>
                </div>
    
        </div>
                        
    </body>
    
    </html>`;
  }

  async function init() {
    console.log("hi");
    try {
      const answers = await promptUser();
  
      const html = generateHTML(answers);
  
      await writeFileAsync("index.html", html);
  
      console.log("Successfully wrote to index.html");
    } catch (err) {
      console.log(err);
    }
  }
  
  init();