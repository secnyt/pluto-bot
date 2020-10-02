const lyrics = require('solenolyrics');
const translator = require('@vitalets/google-translate-api');
const languages = require('./languages');

let lyricsHandler: any = {};

lyricsHandler.handle = async (msg: any, client: any, opt?: any) => {

  let lyricmsg = msg.channel.send({
    embed: {
      color: 0xe3c12b,
      title: 'Loading...',
      description: 'Please wait a few seconds...',
      fields: [{ name: '\u200b', value: 'We are searching for your song! Please give a few seconds.' }]
    }
  })

  let content = msg.content.trim();
  let commandless = content.substr(content.indexOf(' ') + 1).trim();

  let parameters = commandless.split('|');
  let title = parameters[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let language = parameters[1];

  let song = {
    lyrics: undefined,
    title: undefined,
    author: undefined,
    icon: undefined,
  }

  let lyricPromise = lyrics.requestLyricsFor(title).then((l) => song.lyrics = l);
  let titlePromise = lyrics.requestTitleFor(title).then((t) => song.title = t);
  let authorPromise = lyrics.requestAuthorFor(title).then((a) => song.author = a);
  let iconPromise = lyrics.requestIconFor(title).then((i) => song.icon = i);

  let promiseTimeout = new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve('yay');
    }, 10000)
  })

  let timeout = Promise.race([
    lyricPromise,
    titlePromise,
    authorPromise,
    iconPromise,
    promiseTimeout
  ]);

  timeout.then(async (yay) => {
    if (yay == 'yay') {
      (await lyricmsg).edit({
        embed: {
          color: 0xf5424e,
          title: 'Timed out.',
          description: 'Please try again in a minute.',
          fields: [{ name: '\u200b', value: 'Pluto is most likely either bugged or overworked right now.\nPlease try again later.' }]
        }
      })
      return;
    }

    let getAll = Promise.all([
      lyricPromise,
      titlePromise,
      authorPromise,
      iconPromise
    ]);

    getAll.then(async (stuffs) => {
      if (!song.lyrics || title.toString().trim() == '') {
        (await lyricmsg).edit({
          embed: {
            color: 0xf5424e,
            title: 'Not found.',
            description: 'Check your spelling.',
            fields: [{ name: '\u200b', value: 'We couldn\'t find your song! Make sure you spelled the title correctly.' }]
          }
        })
      }
    
      let pages = [];
  
      let pagenum = 0;
  
      let lyricsembed = () => {
        return {
          color: 0x72f542,
          title: song.title,
          description: `*${song.title}* by **${song.author}**`,
          author: { name: song.author },
          thumbnail: { url: song.icon },
          fields: [
            { name: `Lyrics (Page ${pagenum + 1})`, value: pages[pagenum] },
            { name: `\u200b`, value: `\u200b` },
            { name: `Expecting more?`, value: `Use the reactions below to navigate throughout the pages!` }
          ]
        }
      }
  
      let react = async (sentmsg) => {
        if (pagenum > 0) {
          return (await sentmsg).react('⬅️')
          .then((sent) => { sent.message.react('❌'); return sent.message; })
          .then((sent) => { if (pagenum < pages.length - 1) { sent.react('➡️') } return sent; })
        }
        return (await sentmsg).react('❌')
        .then((sent) => { if (pagenum < pages.length - 1) { sent.message.react('➡️') } return sent.message; })
      }

      let lines: any;

      let sendlyrics = async () => {
        (await lyricmsg).edit({
          embed: lyricsembed()
        }).then(async (sent) => { return await react(sent); })
          .then((sent) => {
    
            const filter = (r, u) => {
              let emoji = r.emoji.name;
              return u.id == msg.author.id && (emoji == '⬅️' || emoji == '❌' || emoji == '➡️');
            }
    
            const collector = sent.createReactionCollector(filter, { time: 120000 });
            collector.on('collect', (r) => {
              const emoji = r.emoji.name;
              const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(msg.author.id));
              
              let removeUserReactions = async () => {
                try {
                  for (const reaction of userReactions.values()) {
                    await reaction.users.remove(msg.author.id);
                  }
                } catch (err) {
                  console.error(err);
                  msg.channel.send('Something went wrong!');
                }
              }
              
              switch (emoji) {
                case '❌':
                  sent.delete();
                  break;
                case '⬅️':
                  pagenum = pagenum > 0 ? pagenum -= 1 : pages.length - 1;
                  sent.reactions.removeAll();
                  react(sent);
                  sent.edit({ embed: lyricsembed() });
                  break;
                case '➡️':
                  pagenum = pagenum < pages.length - 1 ? pagenum += 1 : 0;
                  sent.reactions.removeAll();
                  react(sent);
                  sent.edit({ embed: lyricsembed() });
                  break;
              }
            });
            collector.on('end', () => {
              sent.reactions.removeAll();
              let rtimeoutembed = lyricsembed();
              rtimeoutembed.fields[2].value = `Run the command again, then use the reactions to navigate!\n(Reactions Timed Out)`
              sent.edit({ embed: rtimeoutembed });
            })
    
          })
      }

      if (language && language.trim() && languages.isSupported(language.trim())) { await translator(song.lyrics, { to: language.trim() }).then((res) => {
        song.lyrics = res.text; })
        .then(() => {
          lines = song.lyrics.split('\n');
          lines.forEach((l: string, i: number) => {
            if (typeof l != 'undefined') {
              let page: number = Math.floor(i / 20);
              if (pages[page]) {
                pages[page] += ('\n' + l);
              } else {
                pages[page] = l;
              }
            }
        }) 
      }).then(setTimeout(sendlyrics, 200)); // this is horrible solution if blocking, too lazy to think of something else
    }
      else { 
        lines = song.lyrics.split('\n');
        lines.forEach((l: string, i: number) => {
          if (typeof l != 'undefined') {
            let page: number = Math.floor(i / 20);
            if (pages[page]) {
              pages[page] += ('\n' + l);
            } else {
              pages[page] = l;
            }
          }
        })
        sendlyrics();
       }
    })
  })
}

module.exports = lyricsHandler;