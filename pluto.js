// file system
var fs = require('fs');

// JSONs
var auth = require('./auth.json');
var package = require('./package.json');

//var suggests;
//embedsNErrors = require('./embeds.json');

// external js
var ch;
//var snatch;
//var sh;

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(auth.token);

// startup
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);

    // file system
    fs = require('fs');
    package = require('./package.json');
    auth = require('./auth.json');

    // external js
    ch = require('./handling/commandHandling.js');
    snh = require('./handling/snatchHandling.js');
    //snatch = require('./snatch.js');
    //sh = require('./suggestionHandling.js');
});

// on message
client.on('message', msg => {
    // if bot, don't allow
    if(!msg.author.bot){
        // if the message starts with the prefix
        if(msg.content.startsWith(package.prefix)){
            ch.handleP(msg, client);
            
        }
        if(msg.content.startsWith("/")){
            ch.handleS(msg, client);
        }
    }
});




// aesthetics
const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
// embeds
const embeds = {
    help: function(){
        let embed = new Discord.MessageEmbed()
            .setColor('#a62121')
            .setTitle('Pluto Help Page')
            .setURL('https://github.com/secnyt/pluto-bot')
            .setAuthor('Secnyt (@Secnyt#7070)', plutoImage, 'https://github.com/secnyt')
            .setDescription('Pluto Help Page')
            .setThumbnail(plutoImage)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: `${package.prefix}help, ${package.prefix}commands`, value: `Brings up this menu.\n\`Usage: ${package.prefix}help\`` },
                { name: '\u200B', value: '\u200B' },
                { name: `${package.prefix}suggest`, value: `Make a suggestion.\n\nUsage: \`${package.prefix}suggest <suggestion>\``, inline: true },
                { name: `${package.prefix}queue, ${package.prefix}suggestions`, value: `Shows suggestion queue for the server.\n\`Usage: ${package.prefix}suggestions\``, inline: true },
            )
            //.setImage(plutoImage)
            .setTimestamp()
            .setFooter('Pluto Help Page · Created by Secnyt');
        return embed
    }
};

// custom error messages
const errors = {
    NAP: function(msg){
        msg.channel.send(`I don't understand any of your arguments!`);
    },
    NP: function(msg){
        msg.channel.send(`You don't have acceptable arguments!`);
    },
    CS: function(msg){
        msg.channel.send(`This functionality is coming soon! Try me later!`);
    },
    TMP: function(msg){
        msg.channel.send(`You have too many necessary flags! You need one, and only one.`);
    }
};

var stuff = {
    e: embeds,
    er: errors
};

module.exports = stuff;