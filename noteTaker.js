// starting off...
    // need an express server that servs up the given index.html, notes.html
        // delivers CSS and JS files with those... HOW? Google!
    
    // both pages have functionality that write data back to the JSON string
        // write to requires... all info provided AND a unique key
            // if we're going off the dome, the key can = something based on the exact moment of submission in milliseconds or something like that

    // where is the JSON file served and saved from? Local file directory. 
        // fs stuff needs to be on its own .js file called "db.js" and will be async because reading/writing is just nice that way.

    // step 1: outline the IN and OUTs
    // step 2: connect to inputs on given pages



const express = require("express");
const path = require("path");


const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// get the sent HTML to use the public js and css
app.use(express.static('./Develop/public'));


// connect this to fs eventually
// const savedNotes = getSavedNotes();
const savedNotes = [
    {
        title: "Test Title",
        text: "Test text",
        id: 1234
    }
];


//html routes

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")));


// getNotes pathway: /api/notes
app.get("/api/notes", (req, res) => res.json(savedNotes));

// put post stuff here

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));