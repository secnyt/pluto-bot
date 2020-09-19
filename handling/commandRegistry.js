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
        'snatch'
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
        'snatch'
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
        suggest,
        'suggest'
    ),
    suggestList: new Command(
        "suggest-list",
        ["queue", "suggestions"],
        "Opens this server's suggestion queue.",
        "Brings up the server suggestion list, 10 at a time.",
        "`=queue 2`",
        [{
            name: "page",
            optional: true,
            desc: "Page number to open.",
            ex: "`=queue 2`"
        }],
        [],
        [],
        suggests,
        'suggest'
    ),
    suggestRemove: new Command(
        "suggest-remove",
        ["suggestremove", "sgr"],
        "Removes a suggestion from queue.",
        "Deletes the suggestion from the server's suggestion queue at the requested index.",
        "`=sgr 7`",
        [{
            name: "index",
            optional: false,
            desc: "Index of suggestion to remove",
            ex: "`=sgr 3`"
        }],
        [{
            permission: 'MANAGE_GUILD',
            error: 'You don\'t have the "Manage Server" permission.'
        }],
        [],
        suggestRemove,
        'suggest'
    ),
    translate: new Command(
        "translate",
        ["translate", "tr"],
        "Translates a word or phrase.",
        "Translates a phrase from the inferred language to the specified language.",
        "`=tr hola : en`",
        [
            {
                name: "phrase",
                optional: false,
                desc: "Phrase to be translated.",
                ex: "`=tr THIS ONE : es`"
            },
            {
                name: "language",
                optional: true,
                desc: "Language to be translated to. (Note: Defaults to `en`.) CASE SENSITIVE",
                ex: "`=tr good morning : zh-CN`"
            }
        ],
        [],
        [],
        translate,
        'misc'
    ),
    lyrics: new Command(
        "lyrics",
        ["lyrics", "lyric"],
        "Returns the lyrics of a song.",
        "Opens the lyrics for a specific song translated into the given language.",
        "`=lyrics darude sandstorm | it`",
        [
            {
                name: "title",
                optional: false,
                desc: "Title of the requested song.",
                ex: "`=lyrics Lake Washington Boulevard | en`"
            },
            {
                name: "language",
                optional: true,
                desc: "Language to be translated to. (Note: If omitted, ) CASE SENSITIVE",
                ex: "`=tr good morning : zh-CN`"
            }
        ],
        [],
        [],
        lyrics,
        'misc'
    ),
}

module.exports = commands