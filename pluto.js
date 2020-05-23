// file system
const fs = require('fs');
const package = require('./package.json');

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(package.token);

// startup
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on('message', msg => {
    // if bot, don't allow
    if(!msg.bot){
        // if the message starts with the prefix
        if(msg.content.startsWith(package.prefix)){
            // remove prefix
            let command = msg.content.split(package.prefix)[1];
            // separate arguments
            let parameters = command.split(" ");
            // differentiate between command type and arguments
            let c = parameters.splice(0, 1);
            
            switch(c){
                case "help":
                case "commands":
                case "wtf":
                    break;
                case "suggest":
                    break;
                case "init":
                    break;
                case "s":
                    break;
                case "queue":
                case "votequeue":
                case "suggestions":
                    break;
            }
        }
    }
});