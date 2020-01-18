var express = require("express");
var path = require("path");
var app = express();
var fs = require("fs");
var notes;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))

//writes content that user inputs into JSON (parse)
var savedNotes = fs.readFileSync("./db/db.json", "UTF-8");
if (savedNotes) {
    var oldNotes = JSON.parse(savedNotes);
    notes = oldNotes;
}

//active port 8080
var PORT = process.env.PORT || 3000;


//routes that user can navigate
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
    assignID();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (err) {
        if (err) 
            throw err
    });
});

app.delete("/api/notes/:id", function (req, res) {
    console.log("You deleted your note!");
    var deleteID = req.params.id;
    notes.splice(deleteID, 1);
    assignID();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
        if (err) 
            throw err
    });
});

//for loop to assign ID in the db JSON 
function assignID() {
    for (i = 0; i < notes.length; i ++) {
        notes[i].id = i;
    }
}

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});