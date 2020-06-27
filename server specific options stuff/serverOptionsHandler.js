const fs = require('fs');
const Discord = require('discord.js');
const package = require('../package.json');
const { GuildMember, DiscordAPIError } = require('discord.js');

var soh = {};

var ASO = {};

const read = function(path){
    ASO = JSON.parse(fs.readFileSync(path, 'utf8'));
}
const write = function(data, path){
    fs.writeFile(path, JSON.stringify(data, null, 4), 'utf8', (err) => {
        if(err){
            console.log(err);
            console.log('there was an error');
        } else{
        }
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
                                write(ASO, jsonPath);
                                break;
                            case 'toggle':
                                ASO[g].welcome.on = !ASO[g].welcome.on;
                                if(ASO[g].welcome.on){
                                    msg.channel.send('I now handle welcome messages for this server.');
                                } else {
                                    msg.channel.send('Discord now handles welcome messages on this server.');
                                }
                                write(ASO, jsonPath);
                                break;
                            default:
                                const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
                                const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
                                const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

                                let getToggle = () => {var on = ASO[g].welcome.on; if(on){return "Handled by Pluto."}else{return "Not handled by Pluto."}};
                                let getChannel = () => {var channel = ASO[g].welcome.channel; if(channel.trim()){return `<#${ASO[g].welcome.channel}>`}else{return `No channel set! Use \`${package.prefix}server welcome channel #channel\` to set one! `}}

                                let welcomeEmbed = new Discord.MessageEmbed()
                                    .setColor('#7c339e')
                                    .setTitle('Server Welcome Settings')
                                    .setURL('https://github.com/secnyt/pluto-bot/blob/master/Documentation/Server%20Welcome%20Documentation.md')
                                    .setAuthor('Secnyt (@Secnyt#7070)', secnytImage, 'https://github.com/secnyt')
                                    .setDescription(`${msg.guild.name}`)
                                    .setThumbnail(guildImage)
                                    .addFields(
                                        { name: 'message', value: ASO[g].welcome.message },
                                        { name: `channel`, value:  getChannel()},
                                        { name: `toggle`, value: getToggle()},
                                    
                                    )
                                    //.setImage(plutoImage)
                                    .setTimestamp()
                                    .setFooter('Server Welcome Settings Info • Created by Secnyt', secnytImage);
                                
                                msg.channel.send(welcomeEmbed);
                                break;
                        } 
                    } else {
                        const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
                        const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
                        const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

                        let getToggle = () => {var on = ASO[g].welcome.on; if(on){return "Handled by Pluto."}else{return "Not handled by Pluto."}};
                        let getChannel = () => {var channel = ASO[g].welcome.channel; if(channel.trim()){return `<#${ASO[g].welcome.channel}>`}else{return `No channel set! Use \`${package.prefix}server welcome channel #channel\` to set one! `}}

                        let welcomeEmbed = new Discord.MessageEmbed()
                            .setColor('#7c339e')
                            .setTitle('Server Welcome Settings')
                            .setURL('https://github.com/secnyt/pluto-bot/blob/master/Documentation/Server%20Welcome%20Documentation.md')
                            .setAuthor('Secnyt (@Secnyt#7070)', secnytImage, 'https://github.com/secnyt')
                            .setDescription(`${msg.guild.name}`)
                            .setThumbnail(guildImage)
                            .addFields(
                                { name: 'message', value: ASO[g].welcome.message },
                                { name: `channel`, value:  getChannel()},
                                { name: `toggle`, value: getToggle()},
                            
                            )
                            //.setImage(plutoImage)
                            .setTimestamp()
                            .setFooter('Server Welcome Settings Info • Created by Secnyt', secnytImage);
                        
                        msg.channel.send(welcomeEmbed);
                    }
                    break;
                case 'prefix':
                    msg.channel.send('This is coming soon!')
                    break;
                case 'government':
                case 'gov':
                    if(contentParameters[1]){
                        switch(contentParameters[1]){
                            case 'steps':
                            case 'protocol':
                            case 'schedule':
                                var br = false;
                                if(contentParameters[2]){
                                    switch(contentParameters[2]){
                                        case 'add':
                                            if(contentParameters[3]){
                                                var stepRegex = /<#[0-9]*>, *<@&[0-9]*>, (vote|veto), *(100|[0-9]{1,2})/g;
                                                var step = '';
                                                for(var i = 3; i < contentParameters.length; i++){
                                                    step += (contentParameters[i] + ' ');
                                                }
                                                var match = step.match(stepRegex);
                                                var fits = step.toString().trim() == match[0].toString().trim();
                                                if(!fits){
                                                    msg.channel.send('Invalid syntax!');
                                                } else {
                                                    var stepParams = () => {
                                                        var params = {};
                                                        var separated = step.split(' ');

                                                        params.channel = separated[0].split('<#')[1].split('>,')[0];
                                                        params.role = separated[1].split('<@&')[1].split('>,')[0];
                                                        params.type = separated[2].split(',')[0];
                                                        params.percent = separated[3];
                                                        
                                                        return params;
                                                    };

                                                    ASO[g].government.steps.push(
                                                        new GovStep(stepParams().channel, stepParams().role, stepParams().type, stepParams().percent)
                                                    );
                                                    msg.channel.send(`New step (number ${ASO[g].government.steps.length}) created with channel <#${stepParams().channel}>, role <@&${stepParams().role}>, type \`${stepParams().type}\`, with the necessary success percentage of \`${stepParams().percent}\`.`)
                                                    write(ASO, jsonPath);
                                                }
                                            }
                                            br = true;
                                            break;
                                        case 'remove':
                                            // = server government steps remove <stepIndex>
                                            br = true;
                                            break;
                                        case 'move':
                                            // =server government steps move <indexFrom>, <indexTo>
                                            br = true;
                                            break;
                                        case 'replace':
                                            // =server government steps replace <channel>, <role>, type, percentage
                                            br = true;
                                            break;
                                        case 'branch':
                                        case 'result':
                                            // =server government steps branch <stepIndex>, <toStepTrue>, <toStepFalse>
                                            br = true;
                                            break;
                                    }
                                }
                                if(br){
                                    break;
                                }
                            default:
                                read(jsonPath);
                                var getFields = () => {
                                    var fields = [];
                                        if(ASO[g].government.steps != []){
                                        for(var i = 0; i < ASO[g].government.steps.length; i++){
                                            fields.push({ name: `Step ${i + 1}`, value: ASO[g].government.steps[i]});
                                        }
                                    }
                                    if(!fields[0]){
                                        fields.push({ name: "No steps yet!", value: `Add some with ${package.prefix}server government steps <steps>: [flags]`});
                                    }
                                    return fields;
                                }

                                const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
                                const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

                                let govEmbed = {
                                    color: 0xfcba03,
                                    title: 'Server Government Settings',
                                    url: 'https://github.com/secnyt/pluto-bot/blob/master/Documentation/Server%20Welcome%20Documentation.md',
                                    author: {name: 'Secnyt (@Secnyt#7070)', icon_url: secnytImage, url: 'https://github.com/secnyt'},
                                    description: `${msg.guild.name}`,
                                    thumbnail: { url: guildImage },
                                    fields: getFields(),
                                    timestamp: new Date(),
                                    footer: {text: 'Server Government Settings Info • Created by Secnyt', icon_url: secnytImage}
                                }
                                msg.channel.send({ embed: govEmbed });
                                break;
                        }
                    }
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

module.exports = [soh, ServerOptions];