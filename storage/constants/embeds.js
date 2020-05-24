const Discord = require('discord.js');

const package = require('./../../package.json');

e = {};

const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';

e.help = function(){
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

e.snatch = function(){
    let embed = new Discord.MessageEmbed()
        .setColor('#0af5e5')
        .setTitle('Snatch Help Page')
        .setURL('https://github.com/secnyt/pluto-bot/blob/master/Documentation/Snatch%20Documentation.md')
        .setAuthor('Secnyt (@Secnyt#7070)', plutoImage, 'https://github.com/secnyt')
        .setDescription('Snatch Command Help Page\n\nA quick and easy way to store copypastas with Pluto.\nCreate and use Snatches which are unique to the server.')
        .setThumbnail(plutoImage)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: `Create a Snatch`, value: `Creates a Snatch which is unique to the server.\n\`Usage: /s create <keyword> <value>: [flags]\`` },
            { name: `Use a Snatch`, value: `Returns the <value> of the Snatch with the <keyword>.\nUsage: \`/s <keyword>\`\nReturns: \`<value>\``},
        )
        //.setImage(plutoImage)
        .setTimestamp()
        .setFooter('Pluto Snatch Help Page · Created by Secnyt');
    return embed
}

module.exports = e;