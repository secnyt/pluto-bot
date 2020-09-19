// Importing
const package = require('../package.json');
const snh = require('./commands/snatch/snatchHandler.js');
const embeds = require('../storage/constants/embeds.js');
const hh = require('./commands/helpHandler.js');
const sgh = require('./commands/suggest/suggestHandler.js');
const qh = require('./commands/suggest/queueHandler.js');
const cph = require('./../captcha/captcha.js');
const sgr = require('./commands/suggest/suggestRemove');
const Discord = require('discord.js');
const soh = require('./../server specific options stuff/serverOptionsHandler.js');
const pon = require('./commands/PlutoObjectNotation/plutoObjectNotation.js');
const snqh = require('./commands/snatch/snatchesHandler');
const trh = require('./commands/translate+songs/translateHandler');
const lyrh = require('./commands/translate+songs/lyricsHandler');

var ch = {};


class Command {

    constructor(main, alias, desc, use, arg, flag, perm, func){
        this.main = main;
        this.alias = alias;
        this.desc = desc;
        this.use = use;
        this.arg = arg;
        this.flag = flag;
        this.perm = perm;
        this.func = func;
    }
    handle = () => {
        
    }

}


ch.handleP = async function (msg, client) {
    // remove prefix
    let command = msg.content.split(package.prefix)[1];
    // separate arguments
    let parameters = command.split(" ");
    // differentiate between command type and arguments
    let c = parameters.splice(0, 1)[0];
    switch (c) {
        case "help":
        case "commands":
        case "wtf":
            hh.handle(msg, client, parameters);
            break;

        case "suggest":
        case "sg":
        case "addqueue":
            sgh.handle(msg, client);
            break;

        case "initvote":
        case "startvote":
        case "nextvote":

            break;
            
        case 'server':
            soh[0].handle(msg, client);
            break;
        case "queue":
        case "votequeue":
        case "suggestions":
            qh.handle(msg, client);
            break;
        case "snatches":
            snqh.handle(msg, client);
            break;
        case "sgr":
        case "sr":
        case "suggestionr":
        case "sremove":
        case "suggestionremove":
        case "suggestremove":
        case "removesuggestion":
        case "rs":
            sgr.remove(msg, client);
            break;
        case "compile":
            msg.channel.send(pon.compile(msg, "msg"));
            break;
        case "support":
            msg.channel.send("Come join us at the Official Pluto Support Server! (OPSS)\nhttps://bit.ly/join-pluto-support");
            break;
        case "tr":
        case "translate":
        case "trans":
            trh.handle(msg).then(res => { msg.channel.send(res) });
            break;
        case "lyrics":
            lyrh.handle(msg);
            break;
    }
}
ch.handleS = async function (msg, client) {
    let command = msg.content.split('/')[1];
    //console.log(command);
    let parameters = command.split(" ");
    //console.log(parameters);
    let c = parameters.splice(0, 1)[0];
    //console.log(c);
    let channel = client.channels.cache.get(msg.channel.id);
    switch (c) {
        case "s":
            snh.handle(msg, client);
            break;
        case "captcha":
            cph.captcha(msg, client, channel);
            break;
        case "bot":
            cph.answer(msg, client, channel);
            break;
    }
}


module.exports = ch;
