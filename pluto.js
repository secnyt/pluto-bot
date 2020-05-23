// file system
const fs = require('fs');
const package = require('./package.json');
const auth = require('./auth.json');

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(auth.token);

// startup
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);
});

// on message
client.on('message', msg => {
    // if bot, don't allow
    if(!msg.author.bot){
        // if the message starts with the prefix
        if(msg.content.startsWith(package.prefix)){
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
                    
                    msg.channel.send(embeds.help());
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
        if(msg.content.startsWith('/')){
            let command = msg.content.split('/')[1];
            //console.log(command);
            let parameters = command.split(" ");
            //console.log(parameters);
            let c = parameters.splice(0, 1)[0];
            //console.log(c);
            switch(c){
                case "s":
                    
                    // separate first parameter (to be snatched)
                    let snatch = parameters.splice(0, 1);
                    
                    
                    // organize and setup parameters
                    
                    // remove irrelevant flags
                    parameters.forEach((p, i) => {
                        if(!p.startsWith('.')){
                            parameters.splice(i, 1);
                        }
                    });
                    
                    // japanese, spanish
                    var nec = [".j", ".s"];
                    // delete, DM
                    var opt = [".d", ".D"];
                    
                    // amounts of necessary and optional parameters
                    var amount = [0, 0];
                    // counts each type
                    
                    parameters.forEach(p => {
                        if(nec.includes(p)){
                            amount[0] += 1;
                            if(amount[0] > 1){
                                errors.TMP(msg);
                                break;
                            }
                        }
                        if(opt.includes(p)){
                            amount[1] += 1;
                        }
                    });
                    
                    if(amount[0] < 1){
                        errors.NP(msg);
                        break;
                    }
                    
                    functions.snatch(msg, snatch, parameters);

                    break;
                    
            }
        }
    }
});

// list of functions for organization
var functions = {
    // snatch function
    snatch: function(msg, tbs, parameters){
        switch(tbs){
                
            case soh:
                // Japanese
                if(parameters.includes('.j')){
                    // DM
                    if(parameters.includes('.D')){
                        // DM user
                        client.users.cache.get(msg.author.id).send('我々の頭を揺らす');
                    }
                    else {
                        msg.channel.send('我々の頭を揺らす');
                    }
                }
                // delete
                if(parameters.includes('.d')){
                   msg.delete();
                }
                break;
    
            case smh:
    
                // coming soon
                errors.CS(msg);
                break;

            case secnytplaylist:

                // DM
                if(parameters.includes('.D')){
                   // DM user
                   client.users.cache.get(msg.author.id).send('r!play https://www.youtube.com/playlist?list=PLShq-al0vKZ2-Oi2RfRNVltc8dPt4xLcI');
                }
                else {
                    msg.channel.send('https://www.youtube.com/playlist?list=PLShq-al0vKZ2-Oi2RfRNVltc8dPt4xLcI');
                }
                // delete
                if(parameters.includes('.d')){
                   msg.delete();
                }
                break;

            default:
                break;
        }
    }
};


// aesthetics
const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
// embeds
const embeds = {
    help: function(){
        let embed = new Discord.MessageEmbed()
            .setColor('#a62121')
            .setTitle('Pluto Help Page')
            .setURL('https://github.com/secnyt/pluto-bot')
            .setAuthor('@Secnyt#7070', plutoImage, 'https://github.com/secnyt')
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
        msg.channel.send(`I don't understand any of your arguments! I understand:\n    .j; Use Japanese.\n    .d; Delete snatch command.`);
    },
    NP: function(msg){
        msg.channel.send(`You don't have acceptable arguments! I need only one of these:\n    .j; Use Japanese.\n    .s; Use Spanish\nAnd these are optional:\n    .d; Delete snatch command.\n    .D; DM the result.\nThese are coming soon:\n    none`);
    },
    CS: function(msg){
        msg.channel.send(`This functionality is coming soon! Try me later!`);
    },
    TMP: function(msg){
        msg.channel.send(`You have too many necessary flags! You need one, and only one.`);
    }
};
