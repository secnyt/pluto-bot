// JSONs
var { token } = require('./auth.json');
var { prefix } = require('./package.json');

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(token);

client.on('ready', () => {
    setup();
});

// on message
client.on('message', msg => {
    if(msg.channel.type == 'text' && !msg.author.bot){ // make sure message is eligible to be read
        if(msg.content.startsWith(prefix)){
            require('./handling/command.handler').handle(msg, client);
        }
    }
});

client.on('guildMemberAdd', member => {
    require('./handling/joinHandler.js').handle(client, member);
});

function setup(){
    console.log(`Logged in as ${client.user.tag}.`);
}
