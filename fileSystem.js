// this module reads and writes to the JSON file
// it's asynchronous so, you know, make it work right with the server functionality.



// read file

const fs = require('fs');

function readJSON(){
    fs.readFile('./Develop/db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return
        }

        // send back the JSON arr
        return JSON.parse(data);
      });
}

module.exports = readJSON;

//exports
// module.exports = mdTostr;

function writeJSON(arr){
    const arrJSON = JSON.stringify(arr)
    fs.writeFile('./Develop/db/db.json', arrJSON, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('JSON saved!');
    });
}


module.exports = writeJSON;

// write file


