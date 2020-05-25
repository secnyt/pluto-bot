// Importing
const package = require('../package.json');
const snh = require('./commands/snatchHandler.js');
const embeds = require('../storage/constants/embeds.js');
const hh = require('./commands/helpHandler.js');
const sgh = require('./commands/suggestHandler.js');

var ch = {};

ch.handleP = function(msg, client){
    // remove prefix
    let command = msg.content.split(package.prefix)[1];
    // separate arguments
    let parameters = command.split(" ");
    // differentiate between command type and arguments
    let c = parameters.splice(0, 1)[0];
    switch(c){
        case "help":
        case "commands":
        case "wtf":
            hh.handle(msg, client, parameters);
            break;
            
        case "suggest":
            sgh.handle(msg, client);
            break;
            
        case "init":
            
            break;
            
        case "queue":
        case "votequeue":
        case "suggestions":
            
            break;
    }
}
ch.handleS = function(msg, client){
    let command = msg.content.split('/')[1];
    //console.log(command);
    let parameters = command.split(" ");
    //console.log(parameters);
    let c = parameters.splice(0, 1)[0];
    //console.log(c);
    switch(c){
        case "s":
            snh.handle(msg, client);
    }
}


module.exports = ch;
