// JSONs
var auth = require('./auth.json');
var package = require('./package.json');

// external js
var ch, jh;

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(auth.token);

client.on('ready', () => {
    setup();
});

// on message
client.on('message', msg => {

    // if bot, don't allow
    if(msg.channel.type == 'text'){
        if(!msg.author.bot){
            // if the message starts with the prefix
            if(msg.content.startsWith(package.prefix)){
                ch.handle(msg, client);
            }
        }
    }
});

client.on('guildMemberAdd', member => {
    jh.handle(client, member);
});

function setup(){
    console.log(`Logged in as ${client.user.tag}.`);

    package = require('./package.json');
    auth = require('./auth.json');
    ready = true;

    // external js
    ch = require('./handling/command.handler');
    jh = require('./handling/joinHandler');

}
