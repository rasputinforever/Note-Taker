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


// npms
const express = require("express");
const path = require("path");

const fs = require('fs');

// imports
const readJSON = require('./fileSystem.js')
// const writeJSON = require('./fileSystem.js')


const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// get the sent HTML to use the public js and css
app.use(express.static('./Develop/public'));

//html routes

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")));


// getNotes from db
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/db/db.json")));

// deleteNote. REceives a DELETE funciton. Very similar to the POST function below, but deletes instead of adds the new item.
app.delete("/api/notes/:id", (req, res) => {
    // get file
    fs.readFile('./Develop/db/db.json', 'utf8' , (err, data) => {
        if (err) {
            // console log to server if there's an error here
          console.error("Error in Read File: ", err);
          return
        }
        // get id of deleted item
        const delNoteID = req.params.id;
        console.log(req.params.id)
        // parse out the JSON string which is an array of objects
        let savedNotes = JSON.parse(data);
        // find target obj in notes array
        delObj = savedNotes.find(note => note.id === delNoteID);
        // get index of that object
        delIndex = savedNotes.indexOf(delObj);
        // delete that object
        savedNotes.splice(delIndex, 1);

        
        writeJSON(savedNotes, res);

      });


  });

// put saveNote here which is a POST. There are a series of "daisy-chained" fs functions that allow the series of steps to work despite being asynchronous in nature. The steps are simple. Refractor this later into a new module... if you can!
app.post("/api/notes", (req, res) => {
    // get file
    fs.readFile('./Develop/db/db.json', 'utf8' , (err, data) => {
        if (err) {
            // console log to server if there's an error here
          console.error("Error in Read File: ", err);
          return
        }

        // get new note which is an object
        const newNote = req.body
        // create a unique id, save as string so it jives with getNote
        // using Date.now gives time in milliseconds. This would scale poorly, but for this project it seems fine.
        newNote.id = `${Date.now()}`;

        // parse out the JSON string which is an array of objects
        let savedNotes = JSON.parse(data);
        // jam it into savedNotes
        savedNotes = [...savedNotes, newNote];


        writeJSON(savedNotes, res);

      });



});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

// things to send to a module if possible

function writeJSON(arr, res) {
    fs.writeFile('./Develop/db/db.json', JSON.stringify(arr), err => {
        if (err) {
            // console log to server if there's an error here
          console.error("Error in Write File: ", err);
            return
        }
        
        // finalize. file is saved locally.
        res.send();
        })
}