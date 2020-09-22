var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let Suggestion = require('./suggest.class');

let suggestHandler: any = {};

suggestHandler.handle = (msg: any, client: any) => {
  let content: string = msg.content.trim(); // trimmed message content
  let commandless: string = content.substr(content.indexOf(' ') + 1).trim(); // plain suggestion

  if (!commandless) { msg.channel.send('You can\'t have an empty suggestion!'); return; }
  if (commandless.length > 100) { msg.channel.send('Please keep your suggestions below 100 characters!'); return; }

  var suggestion = new Suggestion(commandless, msg.guild.id, msg.author.id);

  MongoClient.connect(url, (err, db) => {
    if (err) { msg.channel.send('Something went wrong!'); return; }

    let dbo = db.db('pluto-suggestions');
    dbo.collection(suggestion.guild).insertOne(suggestion, (err: any) => {
      if (err) { msg.channel.send('Something went wrong on the insertion of your suggestion into the database.'); return; }
      msg.channel.send(`Your suggestion, \`${suggestion.content}\`, has been processed and uploaded.`)
    })
  })
}

module.exports = suggestHandler;