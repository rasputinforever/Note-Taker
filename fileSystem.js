// this module reads and writes to the JSON file
// it's asynchronous so, you know, make it work right with the server functionality.

// file system, read/write files

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



//exports
// module.exports = mdTostr;

// function writeJSON(arr){
//     const arrJSON = JSON.stringify(arr)
//     fs.writeFile('./Develop/db/db.json', arrJSON, (err) => {
//         // throws an error, you could also catch it here
//         if (err) throw err;
    
//         // success case, the file was saved
//         console.log('JSON saved!');
//     });
// }


// module.exports = writeJSON;

// write file


