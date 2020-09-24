const Discord = require('discord.js');
const lyrics = require('solenolyrics');
const { fa } = require('@vitalets/google-translate-api/languages');
const translate = require('@vitalets/google-translate-api');

const lyrh = {};
const languages = require('./languages.js');

lyrh.handle = async (msg) => {
    var page = 0;
    var gimmeSec = msg.channel.send('This may take a few seconds. \n(If it takes too long, the song may not be supported, or you are using illegal characters.)');
    var song = Buffer.from(msg.content.trim().substr(8, msg.content.trim().indexOf('|') - 8), 'utf-8');
    var lang = msg.content.split('|')[1] ? msg.content.split('|')[1].trim() : false;
    var songStuff = {
        lyrics: await lyrics.requestLyricsFor(song),
        title: await lyrics.requestTitleFor(song),
        author: await lyrics.requestAuthorFor(song),
        icon: await lyrics.requestIconFor(song)
    };
    var getPages = async function(text){//(':', 'ː')
        var translatedText = await require('./translate.handler').handle({content: `=tr ${text.trim().replace(/:/g, 'ː')} : ${languages.isSupported(lang) ? lang : 'false'}`});
        var pages = [];
        var lines = translatedText.split('\n');
        lines.forEach((l, i) => {
            if(l != undefined){
                var pageNum = Math.floor(i/15);
                if(pages[pageNum]){
                    pages[pageNum] += ('\n' + l);
                } else {
                    pages[pageNum] = l;
                }
            }
        });

        return pages;
    };

    var embedPages = await getPages(songStuff.lyrics);

    if(songStuff.lyrics){
        var lyricEmbed = {
            color: 0xe3c12b,
            title: songStuff.title,
            author: {
                name: songStuff.author
            },
            description: `Lyrics for ${songStuff.title}`,
            thumbnail: {
                url: songStuff.icon
            },
            fields: [
                {
                    name: 'Lyrics (Page 1)',
                    value: embedPages[page]
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: 'Expecting more?',
                    value: 'Use the reactions below to move throughout pages!'
                }
            ]
        };
        var lyricmsg = () => {
            msg.channel.send({ embed: lyricEmbed })
            .then((sent) => {
                if(page > 0){
                    sent.react('⬅️');
                }
                return sent;
            })
            .then((sent) => {
                sent.react('❌');
                return sent;
            }).then((sent) => {
                if(page < embedPages.length - 1){
                    sent.react('➡️');
                }
                return sent;
            }).then((sent) => {
                const filter = (reaction, user) => {
                    return user.id == msg.author.id && (reaction.emoji.name === '⬅️' || reaction.emoji.name === '❌' || reaction.emoji.name === '➡️' )
                };
                
                const collector = sent.createReactionCollector(filter, { time: 90000 });
                
                collector.on("collect", (reaction) => {
                    const chosen = reaction.emoji.name;
                    switch(chosen){
                        case '❌':
                            sent.delete();
                            collector.stop();
                            break;
                        case '⬅️':
                            page = page > 0 ? page -= 1 : embedPages.length - 1;
                            sent.delete();
                            lyricEmbed.fields[0].value = embedPages[page];
                            lyricEmbed.fields[0].name = `Lyrics (Page ${page + 1})`;
                            collector.stop();
                            lyricmsg();
                            break;
                        case '➡️':
                            page = page < embedPages.length - 1 ? page += 1 : 0;
                            sent.delete();
                            lyricEmbed.fields[0].value = embedPages[page];
                            lyricEmbed.fields[0].name = `Lyrics (Page ${page + 1})`;
                            collector.stop();
                            lyricmsg();
                            break;
                    }
                    collector.stop();
                });

                collector.on("end", () => {
                    sent.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                });
            });
        }
        lyricmsg();
        (await gimmeSec).delete();
    } else {
        msg.channel.send('your song title may be spelled wrong, or the song is asupported.');
        (await gimmeSec).delete();
    }
};

module.exports = lyrh;