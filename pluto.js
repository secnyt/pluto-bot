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
    if(!msg.author.bot){
        //msg.channel.send('I hear message');
        // if the message starts with the prefix
        if(msg.content.startsWith(package.prefix)){
            //msg.channel.send('I hear command');
            // remove prefix
            let command = msg.content.split(package.prefix)[1];
            // separate arguments
            let parameters = command.split(" ");
            // differentiate between command type and arguments
            let c = parameters.splice(0, 1)[0];
            //msg.channel.send(c);
            switch(c){
                case "help":
                case "commands":
                case "wtf":
                    //msg.channel.send('I hear help');
                    let embed = new Discord.embed()
                    .setColor('#a62121')
                    .setTitle('Pluto Help Page')
                    .setURL('https://github.com/secnyt/pluto-bot')
                    .setAuthor('@Secnyt#7070', plutoImage, 'https://github.com/secnyt')
                    .setDescription('Pluto Help Page')
                    .setThumnail(plutoImage)
                    .addFields(
                        { name: `${package.prefix}help, ${package.prefix}commands`, value: `Brings up this menu.\nUsage: ${package.prefix}help` },
                        { name: '\u200B', value: '\u200B' },
                        { name: `${package.prefix}suggest`, value: `Make a suggestion.\nUsage: ${package.prefix}suggest <suggestion>`, inline: true },
                        { name: `${package.prefix}queue, ${package.prefix}suggestions`, value: `Shows suggestion queue for the server.\nUsage: ${package.prefix}suggestions`, inline: true },
                    )
                    .setImage(plutoImage)
                    .setTimestamp()
                    .setFooter('Pluto Help Page · Created by Secnyt');
                    msg.channel.send(embed);
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

var embeds = {
    help: function(){
        var plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
        let embed = new Discord.embed()
            .setColor('#a62121')
            .setTitle('Pluto Help Page')
            .setURL('https://github.com/secnyt/pluto-bot')
            .setAuthor('@Secnyt#7070', plutoImage, 'https://github.com/secnyt')
            .setDescription('Pluto Help Page')
            .setThumnail(plutoImage)
            .addFields(
                { name: `${package.prefix}help, ${package.prefix}commands`, value: `Brings up this menu.\nUsage: ${package.prefix}help` },
                { name: '\u200B', value: '\u200B' },
                { name: `${package.prefix}suggest`, value: `Make a suggestion.\nUsage: ${package.prefix}suggest <suggestion>`, inline: true },
                { name: `${package.prefix}queue, ${package.prefix}suggestions`, value: `Shows suggestion queue for the server.\nUsage: ${package.prefix}suggestions`, inline: true },
            )
            .setImage(plutoImage)
            .setTimestamp()
            .setFooter('Pluto Help Page · Created by Secnyt');
        return embed
    }
};