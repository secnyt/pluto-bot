// discord.js setup
const Discord = require('discord.js');

// Importing
const package = require('../package.json');
const stuff = require('../pluto.js');
const snh = require('./snatchHandling.js')

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
            
            msg.channel.send(stuff.e.help());
            break;
            
        case "suggest":
            
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
