const Mongo = require('mongodb');
var url = "mongodb://localhost:27017";

const { prefix } = require('./../../../package.json');
const { Server } = require('./serveroptions.class');
const { defaultHelp } = require('./serveroptions.class');

let serverOptionsHandler: any = {};

serverOptionsHandler.handle = (msg, client) => {

    let content = msg.content.trim();
    let commandless = content.substr(content.indexOf(' ') + 1).trim();
    let parameters = commandless.split(' ', 3);
    
    if (!msg.member.hasPermission('MANAGE_GUILD')) { msg.channel.send('You do not have the "Manage Server" permission!'); return; }
    var guild = msg.guild.id;
    var channel = msg.channel;

    Mongo.connect(url, (err: any, db: any) => {
        if (err) { console.error(err); channel.send('Something went wrong when accessing database. Please try again, and if the error persists, get help from OPSS at https://bit.ly/join-pluto-support.'); return; }
        let dbo: any = db.db('pluto-options');
        dbo.collection(guild).find({}).toArray((err: any, res: any) => {
            if (!res[0]) {
                dbo.collection(guild).insertOne( new Server(null, defaultHelp(msg.guild)) );
            }
            switch (parameters[0]) {
                case 'help':
                    serverOptionsHandler.helpHandle(commandless, client, msg);
                    break;
                case 'welcome':
                    serverOptionsHandler.welcomeHandle(commandless, client, msg);
                    break;
                default:
                    serverOptionsHandler.menuHandle(commandless, client, msg);
                    break;
            }
        })
    })

}

serverOptionsHandler.helpHandle = (commandless: string, client: any, msg: any) => {

    let parameter2 = commandless.split(' ', 3)[2];
    if (!parameter2 || !parameter2.trim()) { 
        Mongo.connect(url, (err: any, db: any) => {
            if (err) { console.error(err); msg.channel.send('Something went wrong when accessing database. Please try again, and if the error persists, get help from OPSS at https://bit.ly/join-pluto-support.'); return; }
            let dbo = db.db('pluto-options');
            dbo.collection(msg.guild.id).find({}).toArray((err: any, res: any) => {
                msg.channel.send({ embed: serverOptionsHandler.gethelp(res[0].guildhelp) })
            })
        })
    } 
}

serverOptionsHandler.welcomeHandle = (commandless: string, client: any, msg: any) => {
    
}

serverOptionsHandler.menuHandle = (commandless: string, client: any, msg: any) => {
    
}

serverOptionsHandler.gethelp = (guildhelp) => {
    return {
        color: guildhelp.color,
        title: guildhelp.title,
        description: guildhelp.description,
        thumbnail: {
            url: guildhelp.thumbnail,
        },
        timestamp: new Date(),
        footer: {
            text: guildhelp.footer + ' • Custom Pluto Help Page',
            icon_url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128',
        },
        fields: guildhelp.fields,
    }
}

module.exports = serverOptionsHandler;