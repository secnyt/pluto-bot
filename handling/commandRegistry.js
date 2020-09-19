import helpHandler from './commands/helpHandler';
import snatchHandler from './commands/snatch/snatchHandler';
import snatchListHandler from './commands/snatch/snatchesHandler';
import suggestHandler from './commands/suggest/suggestHandler';
import suggestListHandler from './commands/suggest/queueHandler';
import suggestRemoveHandler from './commands/suggest/suggestRemove';
import translateHandler from './commands/translate+songs/translateHandler';
import lyricsHandler from './commands/translate+songs/lyricsHandler';

var help = (msg, client, opt) => { helpHandler.handle(msg, client, opt); };
var snatch = (msg, client, opt) => { snatchHandler.handle(msg, client, opt); };
var snatches = (msg, client, opt) => { snatchListHandler.handle(msg, client, opt); };
var suggest = (msg, client, opt) => { suggestHandler.handle(msg, client, opt); };
var suggests = (msg, client, opt) => { suggestListHandler.handle(msg, client, opt); };
var suggestRemove = (msg, client, opt) => { suggestRemoveHandler.handle(msg, client, opt); };
var translate = (msg, client, opt) => { translateHandler.handle(msg, client, opt); };
var lyrics = (msg, client, opt) => { lyricsHandler.handle(msg, client, opt); };

const commands = {
    help: new Command(
        "help", 
        ["help", "wtf", "pluto"], 
        "Opens the Pluto Help Page.",
        "This command is used to open the general help page, or the specific help page of a function, like the one you see right now.",
        "`=help`",
        [{
            name: "command",
            optional: true,
            desc: "The command to be helped with.",
            ex: "`=help SNATCH function`",
            defaults: "general"
        },
        {
            name: "arguments",
            optional: true,
            desc: "Explanation of arguments of the command.",
            ex: "`=help snatch FUNCTION`",
            defaults: "general"
        }],
        [],
        [],
        help,
        'Pluto'
    ),
    snatch: new Command(
        "snatch",
        ["sn", "snatch"],
        "Used to work with snatches.",
        "Used to handle creating, editing, and retrieving of snatches in a specific server. Has a different syntax style from other commands.",
        "`=snatch help`",
        [{
            name: "function",
            optional: false,
            desc: "The specific function to be run.",
            ex: "`=sn CREATE; key name; value string; ..overwrite`"
        }],
        [{
            name: "overwrite",
            optional: true,
            desc: ""
        }],
        [],
        snatch,
        'Snatch'
    ),
    snatchList: new Command(
        "snatch-list",
        ["snatches", "sns"],
        "Displays the snatch list for the server.",
        "Shows the list of snatches for the server run in, with 10 per page.",
        "`=snatches 1`",
        [{
            name: "page-number",
            optional: true,
            desc: "The page of snatches requested.",
            ex: "`=snatches 2`"
        }],
        [],
        [],
        snatches,
        'Snatch'
    ),
    suggest: new Command(
        "suggest",
        ["suggest", "sg"],
        "Suggests something to this server's queue.",
        "Adds a suggestion to the end of the server's suggestion queue.",
        "`=suggest That the developer gets a brain.`",
        [{
            name: "suggestion",
            optional: false,
            desc: "The suggestion to suggest",
            ex: "`=suggest THAT PLUTO BECOMES BETTER.`"
        }],
        [],
        [],
        snatchListHandler,
        'Suggest'
    ),
}

module.exports = commands