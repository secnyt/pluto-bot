// file system
var fs = require('fs');

// JSONs
var auth = require('./auth.json');
var package = require('./package.json');

// external js
var ch, sch, jh, embeds;

// js storage
var discArray;

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(auth.token);

// startup
var doCustom = false;
var ready = false;


client.on('ready', () => {
    setup();
});

// on message
client.on('message', msg => {
    //c.test(msg, client);
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

var stuff = {

};

module.exports = stuff;

//setInterval(pt.checkTime(client), 1000);





// FUNCTIONS AND STUFF. GO DOWN IF YOU WANT TO BE LOOKING AT CHAOS.






function setup(){
    console.log(`Logged in as ${client.user.tag}.`);

    // file system
    fs = require('fs');
    package = require('./package.json');
    auth = require('./auth.json');
    ready = true;

    // external js
    ch = require('./handling/command.handler');
    snh = require('./handling/commands/snatch/snatchHandler.js');
    c = require('./captcha/captcha.js');
    pt = require('./misc/piTime.js');
    jh = require('./handling/joinHandler');

    // js storage
    embeds = require('./storage/constants/embeds.js');

    var guild = client.guilds.cache.get('691793782466674718');
    discArray = Array.from(guild.members.cache);
}
