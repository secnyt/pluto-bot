const Discord = require('discord.js');

const package = require('./../../package.json');

e = {};

const plutoImage = 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.png?size=128';
const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';

e.help = function(){
    let embed = new Discord.MessageEmbed()
        .setColor('#a62121')
        .setTitle('Pluto Help Page')
        .setURL('https://github.com/secnyt/pluto-bot')
        .setAuthor('Secnyt (@Secnyt#7070)', secnytImage, 'https://github.com/secnyt')
        .setDescription('Pluto Help Page')
        .setThumbnail(plutoImage)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: `${package.prefix}help, ${package.prefix}commands`, value: `Brings up this menu.\nUsage: \`${package.prefix}help\`` },
            { name: '\u200B', value: '\u200B' },
            { name: `${package.prefix}suggest, =addqueue, =sg`, value: `Make a suggestion.\nUsage: \`${package.prefix}suggest <suggestion>\``, inline: true },
            { name: `${package.prefix}queue, ${package.prefix}suggestions`, value: `Shows suggestion queue for the server.\nUsage: \`${package.prefix}suggestions <page number>\``, inline: true },
            { name: `${package.prefix}sgr, ${package.prefix}suggestionremove`, value: `Used to remove Suggestions from queue.\nUsage: \`=sgr <suggestion number>\``, inline: true},
            { name: `/s create, /s get`, value: `Used to access Pluto's Snatch API.\nUsage: \`/s help\``, inline: true},
            { name: `${package.prefix}snatches`, value: `Shows snatch list for the server.\nUsage: \`${package.prefix}snatches <page number>\``, inline: true },
        )
        //.setImage(plutoImage)
        .setTimestamp()
        .setFooter('Pluto Help Page • Created by Secnyt', secnytImage);
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
            { name: `Create a Snatch`, value: `Creates a Snatch which is unique to the server.\n\`Usage: /s create; <keyword>; s("<value>"); [flags]\`` },
            { name: `Use a Snatch`, value: `Returns the <value> of the Snatch with the <keyword>.\nUsage: \`/s get; <keyword>\`\nReturns: \`<value>\``},
        )
        //.setImage(plutoImage)
        .setTimestamp()
        .setFooter('Pluto Snatch Help Page • Created by Secnyt');
    return embed
}

module.exports = e;