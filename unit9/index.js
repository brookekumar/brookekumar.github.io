const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const open = require("open");
const convertFactory = require("electron-html-to");
const api = require("./api");
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

function writetoFile(data, fileName) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}

function init() {
    inquirer.prompt(prompt)
        .then(({ github, color }) => {
            console.log("searching");
            api.getUser(github)
                .then(response =>
                    api.getStars(github)
                        .then(stars => {
                            return generateHTML({
                                stars, color, ...response.data
                            })
                        }
                        ))
                .then(html => {
                    const conversion = convertFactory({
                        converterPath: convertFactory.converters.PDF
                    })
                    conversion({ html }, function (err, result) {
                        if (err) {
                            return console.error(err)
                        }
                        result.stream.pipe(
                            fs.createWriteStream(path.join(__dirname, "git.pdf"))
                        )
                        conversion.kill();
                    })
                    open(path.join(process.cwd(), "git.pdf"))
                })
                .catch(function(error){
                    console.log(error)
                })
        })
}
init();
