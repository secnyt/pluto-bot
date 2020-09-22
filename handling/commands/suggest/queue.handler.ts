var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let queueHandler: any = {};

queueHandler.handle = (msg: any, client: any) => {
  let pageNum = parseInt(msg.content.split(' ')[1], 10) - 1;
  if (!pageNum) { pageNum = 0; }
  
  MongoClient.connect(url, (err: any, db: any) => {
    if (err) { msg.channel.send('Something went wrong!'); return; }

    let dbo = db.db('pluto-suggestions');
    dbo.collection(msg.guild.id).find({}).toArray((err: any, res: any) => {
      if (err) { msg.channel.send('Something went wrong!'); return; }
      console.log(res);
      let pages: Array<any> = [];
      res.forEach((v: any, i: number) => {
        let page: number = Math.floor(i / 10); // 10 suggestions per page
        if (!pages[page]) pages[page] = '';
        pages[page] += (v.c + '\n');
      })

      console.log(pages);

      let getFormattedSuggestions = (num) => {
        return pages[num];
      }

      let getFields = () => {
        let fields: any = [
          { name: 'Suggestions', value: getFormattedSuggestions(pageNum), },
        ];
        if (pages[pageNum].split('\n').length > 10 && pages[pageNum + 1]) {
          fields.unshift({ name: `\u200b`, value: `\u200b` });
          fields.push({ name: `\u200b`, value: `\u200b` });
          fields.push({ name: `Expecting more?`, value: `Run \`=queue ${pageNum + 2}\` for more!` });
        }
        return fields;
      }

      if (!pages[pageNum]) { msg.channel.send(`There are no suggestions at page #${pageNum.toString()}!`); return; }
      let embed = {
        color: 0xf238d6,
        title: `Suggestion Queue`,
        description: `Suggestion Queue for ${msg.guild.name}.`,
        author: {
          name: `${msg.guild.name}`,
          icon_url: `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`
        },
        thumbnail: {
          url: `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`
        },
        timestamp: new Date(),
        footer: {
            text: `Suggestions Page ${pageNum}`,
            icon_url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128'
        }, 
        fields: getFields()
      }
      msg.channel.send({ embed: embed })
    })
  })
}

module.exports = queueHandler;