// this module reads and writes to the JSON file
// it's asynchronous so, you know, make it work right with the server functionality.

// file system, read/write files

const fs = require('fs');

function readJSON() {
    return new Promise((resolve, reject) => {
        fs.readFile('./Develop/db/db.json', 'utf8' , (err, data) => {
            if (err) {
                // console log to server if there's an error here
              console.error("Error in Read File: ", err);
              return
            }
                console.log('JSON File read!')
                   // error catcher, basically. Sends back the notes array if all goes to plan
                if (data) {
                    resolve(data)
                } else (
                    console.log("Error in reading Notes Array from JSON db!")
                )        
          });


    });
  }

module.exports = readJSON;