// module writes to JSON db

const fs = require('fs');

function writeJSON(arr, res) {
    fs.writeFile('./Develop/db/db.json', JSON.stringify(arr), err => {
        if (err) {
            // console log to server if there's an error here
          console.error("Error in Write File: ", err);
            return
        }
        
        // finalize. file is saved locally. Putting the res.send() here ensures this occurs ONLY after the writing of the file.
        console.log('saved notes array as JSON to database!')
        res.send();
        })
}
  
module.exports = writeJSON;