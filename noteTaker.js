// MVP todos... 
    // how does this work with Heroku?

// npms
const express = require("express");
const path = require("path");

// imports
const writeJSON = require('./fileSystemWrite.js')
const readJSON = require('./fileSystemRead.js')

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
    console.log("initiating DELETE request to REMOVE Note!")
    // get file
    readJSON().then((data) => {
        // action! first, delete the note from the notes array, THEN save it to the JSON db!
        console.log('file data retrieved!')
        newNoteDELETE(req, data).then((noteArr) => {
            console.log("new notes array retrieved!")
            writeJSON(noteArr, res);
        });
    });
});

// put saveNote here which is a POST. There are a series of "daisy-chained" fs functions that allow the series of steps to work despite being asynchronous in nature. The steps are simple. Refractor this later into a new module... if you can!
app.post("/api/notes", (req, res) => {
    console.log("initiating POST request to ADD new Note!")
    // get file
    readJSON().then((data) => {
            //usage. create the notes array, then write to file, then end the transmission
            newNotePOST(req, data).then((noteArr) => {
                writeJSON(noteArr, res)
            })
      });
});

// open the lines
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
  
// refactored functions
// adds note from POSTED request
  function newNotePOST(req, data) {
    return new Promise((resolve, reject) => {
        // get new note which is an object
        const newNote = req.body

        // create a unique id, save as string so it jives with getNote
        // using Date.now gives time in milliseconds. This would scale poorly, but for this project it seems fine.
        newNote.id = `${Date.now()}`;

        // parse out the JSON string which is an array of objects
        let savedNotes = JSON.parse(data);
        // jam it into savedNotes
        savedNotes = [...savedNotes, newNote];
        // error catcher, basically. Sends back the notes array if all goes to plan
        if (savedNotes) {
            resolve(savedNotes)
        } else (
            console.log("Error in adding Note to Notes Array")
        )
        
    });
  }
// Removes note from DELETE request
  function newNoteDELETE(req, data) {
    return new Promise((resolve, reject) => {

        // get id of deleted item
        const delNoteID = req.params.id;
        console.log("deleted note id: ", req.params.id)

        // parse out the JSON string which is an array of objects
        let savedNotes = JSON.parse(data);
        // find target obj in notes array
        delObj = savedNotes.find(note => note.id === delNoteID);
        // get index of that object
        delIndex = savedNotes.indexOf(delObj);
        // delete that object
        savedNotes.splice(delIndex, 1);

        // error catcher, basically. Sends back the notes array if all goes to plan
        if (savedNotes) {
            resolve(savedNotes)
        } else (
            console.log("Error in deleting Note from Notes Array")
        )        
    });
  }