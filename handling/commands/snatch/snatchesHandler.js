var snqh = {};
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Discord = require('discord.js');

snqh.handle = (msg, client) => {

    var gid = msg.guild.id;

    var pageNum = parseInt(msg.content.split(' ')[1], 10) - 1;
    if(!pageNum){
        pageNum = 0;
    }
    var servSns;
    MongoClient.connect(url, (err, db) => {
        var dbo = db.db('pluto-snatches');

        dbo.collection(gid).find().toArray((err, res) => {
            servSns = res;
            //console.log(servSns);

            var message = [];
            if(servSns || (servSns !== [] && servSns !== undefined)){
                servSns.forEach((s, i) => {
                    var page = 0;
                    page = Math.floor(i/10);
                    if(message[page]){
                        message[page].push(`\`${s.key}\`   \|​\|   \`${s.snatch}\``);
                        //console.log('abc ', message)
                    }
                    else {
                        message[page] = [];
                        message[page].push(`\`${s.key}\`   \|​\|   \`${s.snatch}\``);
                        //console.log('123 ', message)
                    }
                });

                const plutoImage = 'https://cdn.discordapp.com/attachments/710653500669034607/713585355592564797/697_nh-pluto-charon-v2-10-1-15_1600.jpg';
                const secnytImage = 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp';
                const guildImage = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`;

                var qem = function (num) {
                    if(!message[num]){
                        return 'There are no snatches at this page number!';
                    }
                    let embed = new Discord.MessageEmbed()
                    .setColor('#a62121')
                    .setTitle('Snatches')
                    .setURL('https://github.com/secnyt/pluto-bot')
                    .setAuthor(msg.guild.name, guildImage, 'https://github.com/secnyt')
                    .setDescription('This server\'s snatches')
                    .setThumbnail(guildImage)
                    .addFields(
                        { name: `Snatches:`, value: message[num]},
                        { name: `\u200b`, value: `If you were expecting more snatches, run \`=snatches ${num + 2}\` for the next page!\nYou can get any of these snatches by running \`/s get; <key>\`!`}
                    )
                    //.setImage(plutoImage)
                    .setTimestamp()
                    .setFooter(`Pluto Snatches · Page ${num + 1} · Created by Secnyt`, secnytImage);
                    return embed;
                }
                msg.channel.send(qem(pageNum));
            }
            else {
                msg.channel.send('This server does not have snatches!')
            }


            db.close();
        });

    });
    
}
module.exports = snqh;