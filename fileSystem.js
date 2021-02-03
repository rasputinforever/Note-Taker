// this module reads and writes to the JSON file
// it's asynchronous so, you know, make it work right with the server functionality.

// file system, read/write files

const fs = require('fs');
// this allows asynchronicity
const util = require('util');

// simply reads and returns the file

const readFile = util.promisify(fs.readFile);

function readJSON() {
    return readFile('./Develop/db/db.json', 'utf8');
}

//export
 module.exports = readJSON;



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


