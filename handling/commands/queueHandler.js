const suggestions = require('./../../storage/suggestions/suggestions.json');
const Discord = require('discord.js');
const fs = require('fs');
const package = require('./../../package.json')

var qh = {};

var sgs = {};

sgs = JSON.parse(fs.readFileSync('./storage/suggestions/suggestions.json'));

qh.handle = function(msg, client){
    sgs = JSON.parse(fs.readFileSync('./storage/suggestions/suggestions.json'));
    var servSgs = sgs[msg.guild.id];
    console.log(sgs);
    if(servSgs || (servSgs !== [] && servSgs !== undefined)){
        var message = "";
        servSgs.forEach((s, i) => {
            message += (`${i + 1}. ${s.content}\n`);
        });

        const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
        const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
        const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

        var qem = new Discord.MessageEmbed()
            .setColor('#a62121')
            .setTitle('Suggestion Queue')
            .setURL('https://github.com/secnyt/pluto-bot')
            .setAuthor(msg.guild.name, guildImage, 'https://github.com/secnyt')
            .setDescription('Suggestion Queue')
            .setThumbnail(guildImage)
            .addFields(
                { name: `Queue:`, value: message},
            )
            //.setImage(plutoImage)
            .setTimestamp()
            .setFooter('Pluto Suggestion Queue · Created by Secnyt', secnytImage);
        msg.channel.send(qem);
    }
    else {
        msg.channel.send('There is nothing in your queue!')
    }
};

module.exports = qh;