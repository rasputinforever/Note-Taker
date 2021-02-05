# Note-Taker
An expresss based note taker application.

## User Experience

Note Taker allows a user to create and edit notes. Those notes are stored on the server as a .json object.

* ### Heroku Deployment

[LIVE Note Taker!](https://json-note-taker.herokuapp.com/)

Using the application through Heroku allows for immediate usage; no set-up required, simply click the link and enjoy!

* ### Doing it yourself with Node.js

By clonging this project you are able to investigate the back-end code yourself. To begin, after cloning, be sure to send 'npm i' then 'node start' to initiate the server! The terminal console will let you know which PORT to access on your browser. 

## Scope of Project

This project was focused on the building of the server and balancing the interactions between the front-end requests and asynchronous back-end functions so that the served information meets the requirements of that pre-built front-end. The challenge is to meet the requirements of that "given" front end without editing it.

### Back-End Development

noteTaker.js is the server script which utilizes two modules which read and write files into the "db" folder. All development occured here.

### Front-End Given

All files located in "Develop" were given. This includes the two HTML files and Assetts that accompany those pages.

## Tools Used

This project was built using [Node.js](https://nodejs.org/en/) in order to use JavaScript in creating the server and interacting with the file system.

* ### npm [express](https://www.npmjs.com/package/express)
This node.js library opens up the ability to create a server. Basic functionality includes the GET function which allow the routes to the server to specify what, exactly, the user is served given a specific URL. 

Additionally, POST and DELETE allow for front-end javascript (and more) to send requests that may alter the saved information on the server itself, in this app's case, the .json object in the 'db' folder.

* ### npm [fs](https://www.npmjs.com/package/fs)

In order for the back-end to perform the read and write to the .json object the fs library was used. The functions are asynchronous, accounting for the time it takes the host PC/Server to actually access and interact with the file. It is key to set up these actions with ascynchronicity in mind so that reads, writes, and all actions in between are done in the correct order then sent back to the user. 

### Credits

**Author:** Erik Portillo
**Date:** February 4, 2021
**School:** University of Oregon
**Program:** Coding Bootcamp