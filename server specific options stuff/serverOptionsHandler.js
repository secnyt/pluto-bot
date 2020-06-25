const fs = require('fs');
const Discord = require('discord.js');
const package = require('../package.json');
const { GuildMember, DiscordAPIError } = require('discord.js');

var soh = {};

var ASO = {};

const read = function(path){
    fs.readFileSync(path, 'utf8', (data) => {
        ASO = JSON.parse(data);
    })
}
const write = function(data, path){
    fs.writeFile(path, JSON.stringify(data, null, 4), 'utf8', (err) => {
        if(err){
            console.log(err);
            console.log('there was an error');
        } else{
        }
        ASO = data;    
    })
}
var jsonPath = './server specific options stuff/serverOptions.json';
read(jsonPath);

class ServerOptions {
    constructor(){
        this.queue = {};
        this.snatches = {};
        this.welcome = {
            on: true,
            message: 'Welcome, <user>, to <guildnick>!',
            channel: ''
        };
        this.government = {
            steps: [

            ]
        }
    }
}

class GovStep {
    constructor(channel, role, type, percent){
        this.channel = channel;
        this.role = role;
        this.type = type;
        this.percent = percent;
    }
}

soh.handle = function(msg, client){
    if(msg.member.hasPermission('MANAGE_GUILD')){
        var content = msg.content;
        var g = msg.guild.id;
        if(!ASO[g]){
            ASO[g] = new ServerOptions();
        }
        content = content.split(`${package.prefix}server `)[1];
        try{
            contentParameters = content.split(' ');
            switch(contentParameters[0]){
                case 'welcome':
                    if(contentParameters[1]){
                        switch(contentParameters[1]){
                            case 'message':
                            case 'msg':
                                if(contentParameters[2]){
                                    let newMessage = '';
                                    for(var i = 2; i < contentParameters.length; ++i){
                                        newMessage += (contentParameters[i] + ' ');
                                    }
                                    ASO[g].welcome.message = newMessage;
                                    msg.channel.send(`The new welcome message for this server is \`${newMessage}\`.`);
                                } else {
                                    msg.channel.send(`The welcome message for this server is \`${ASO[g].welcome.message} \`. You can set this with \`${package.prefix}server welcome message <message>\`.`);
                                }
                                break;
                            case 'channel':
                            case 'redirect':
                                if(contentParameters[2] && msg.mentions.channels.first() && !contentParameters[3]){
                                    ASO[g].welcome.channel = contentParameters[2].split('<#')[1].split('>')[0];
                                    msg.channel.send(`The new welcome channel for this server is <#${ASO[g].welcome.channel}>.`);
                                } else if(contentParameters[2] && !contentParameters[3]){
                                    msg.channel.send('You need to mention the channel!');
                                } else if(contentParameters[3]){
                                    msg.channel.send('You can only specify one channel. (mention it) ');
                                } else {
                                    msg.channel.send(`The welcome channel for this server is \`${ASO[g].welcome.channel} \`. You can set this with \`${package.prefix}server welcome channel #channel\`.`);
                                }
                                break;
                            case 'toggle':
                                ASO[g].welcome.on = !ASO[g].welcome.on;
                                if(ASO[g].welcome.on){
                                    msg.channel.send('I now handle welcome messages for this server.');
                                } else {
                                    msg.channel.send('Discord now handles welcome messages on this server.');
                                }
                                break;
                            default:
                                const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
                                const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
                                let welcomeEmbed = new Discord.MessageEmbed()
                                    .setColor('#7c339e')
                                    .setTitle('Server Welcome Settings')
                                    .setURL('https://github.com/secnyt/pluto-bot')
                                    .setAuthor('Secnyt (@Secnyt#7070)', secnytImage, 'https://github.com/secnyt')
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
                                    .setFooter('Pluto Help Page · Created by Secnyt', secnytImage);
                                
                                msg.channel.send(welcomeEmbed);
                                break;
                        } 
                    } else {
                        const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
                        const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
                        const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

                        let welcomeEmbed = new Discord.MessageEmbed()
                            .setColor('#7c339e')
                            .setTitle('Server Welcome Settings')
                            .setURL('https://github.com/secnyt/pluto-bot/blob/master/Documentation/Server%20Welcome%20Documentation.md')
                            .setAuthor('Secnyt (@Secnyt#7070)', secnytImage, 'https://github.com/secnyt')
                            .setDescription(`${msg.guild.name}`)
                            .setThumbnail(guildImage)
                            .addFields(
                                { name: '\u200B', value: '\u200B' },
                                { name: `${package.prefix}help, ${package.prefix}commands`, value: `Brings up this menu.\n\`Usage: ${package.prefix}help\`` },
                                { name: `${package.prefix}suggest`, value: `Make a suggestion.\n\nUsage: \`${package.prefix}suggest <suggestion>\``},
                                { name: `${package.prefix}queue, ${package.prefix}suggestions`, value: `Shows suggestion queue for the server.\n\`Usage: ${package.prefix}suggestions\``},
                            )
                            //.setImage(plutoImage)
                            .setTimestamp()
                            .setFooter('Server Welcome Settings Info · Created by Secnyt', secnytImage);
                        
                        msg.channel.send(welcomeEmbed);
                    }
                    break;
                case 'prefix':
                    msg.channel.send('This is coming soon!')
                    break;
                default:
                    msg.channel.send('I don\'t understand your argument.');
            }
            write(ASO, jsonPath);
        }catch(err){
            console.error(err);
            msg.channel.send("I don't understand!");
        }
    } else {
        msg.channel.send('You don\'t have the permissions to change that!');
    }
}

module.exports = soh;