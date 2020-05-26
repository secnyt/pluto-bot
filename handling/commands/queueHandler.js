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
    //console.log(sgs);
    var pageNum = parseInt(msg.content.split('=queue ')[1], 10) - 1;
    if(!pageNum){
        pageNum = 0;
    }
    //console.log(pageNum)
    var message = [];
    if(servSgs || (servSgs !== [] && servSgs !== undefined)){
        servSgs.forEach((s, i) => {
            var page = 0;
            page = Math.floor(i/10);
            //console.log(page);
            if(message[page]){
                message[page].push(`${i + 1}. ${s.content}`);
                //console.log('abc ', message)
            }
            else {
                message[page] = [];
                message[page].push(`${i + 1}. ${s.content}`);
                //console.log('123 ', message)
            }
        });

        const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
        const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
        const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

        var qem = function (num) {
            if(!message[num]){
                return 'There is nothing in the queue at this page number!';
            }
             let embed = new Discord.MessageEmbed()
            .setColor('#a62121')
            .setTitle('Suggestion Queue')
            .setURL('https://github.com/secnyt/pluto-bot')
            .setAuthor(msg.guild.name, guildImage, 'https://github.com/secnyt')
            .setDescription('Suggestion Queue')
            .setThumbnail(guildImage)
            .addFields(
                { name: `Queue:`, value: message[num]},
                { name: `\u200b`, value: `If you were expecting more suggestions, run \`=queue ${num + 2}\` for the next page! `}
            )
            //.setImage(plutoImage)
            .setTimestamp()
            .setFooter(`Pluto Suggestion Queue · Page ${num + 1} · Created by Secnyt`, secnytImage);
            return embed;
        }
        msg.channel.send(qem(pageNum));
    }
    else {
        msg.channel.send('There is nothing in your queue!')
    }
};

module.exports = qh;