// MVP todos... 
    // how does this work with Heroku?
    // READFILE should be refactored. I think I can...


// npms
const express = require("express");
const path = require("path");

const fs = require('fs');

// imports
const writeJSON = require('./fileSystem.js')


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
        // action! first, delete the note from the notes array, THEN save it to the JSON db!
        newNoteDELETE(req, data).then((noteArr) => {
            writeJSON(noteArr, res);
        })
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
          //usage. create the notes array, then write to file, then end the transmission
          newNotePOST(req, data).then((noteArr) => {
                writeJSON(noteArr, res)
          });
      });
});

// open the lines
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
  
// this right here will stay on this js file. Refactored into a promise. DO THIS before writing file! 
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
            console.log("Error in creating Notes Array")
        )
        
    });
  }
// DELETE actions as PROMISE!
  function newNoteDELETE(req, data) {
    return new Promise((resolve, reject) => {

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


        // error catcher, basically. Sends back the notes array if all goes to plan
        if (savedNotes) {
            resolve(savedNotes)
        } else (
            console.log("Error in creating Notes Array")
        )
        
    });
  }
