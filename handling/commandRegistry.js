let helpHandler = require('./commands/help.handler');
let snatchHandler = require('./commands/snatch/snatch.handler');
let snatchListHandler = require('./commands/snatch/snatchesHandler');
let suggestHandler = require('./commands/suggest/suggestHandler');
let suggestListHandler = require('./commands/suggest/queueHandler');
let suggestRemoveHandler = require('./commands/suggest/suggestRemove');
let translateHandler = require('./commands/translate+songs/translateHandler');
let lyricsHandler = require('./commands/translate+songs/lyricsHandler');
let supportHandler = require('./commands/support.handler');
let Command = require('./command.class');

var help = (msg, client, opt) => { helpHandler.handle(msg, client, opt); };
var snatch = (msg, client, opt) => { snatchHandler.handle(msg, client, opt); };
var snatches = (msg, client, opt) => { snatchListHandler.handle(msg, client, opt); };
var suggest = (msg, client, opt) => { suggestHandler.handle(msg, client, opt); };
var suggests = (msg, client, opt) => { suggestListHandler.handle(msg, client, opt); };
var suggestRemove = (msg, client, opt) => { suggestRemoveHandler.handle(msg, client, opt); };
var translate = async (msg, client, opt) => { translateHandler.handle(msg, client, opt); };
var lyrics = async (msg, client, opt) => { lyricsHandler.handle(msg, client, opt); };
var support = (msg, client, opt) => { supportHandler.support(msg, client, opt); };
var docs = (msg, client, opt) => { supportHandler.docs(msg, client, opt); };

const commands = [
    new Command(
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
    new Command(
        "snatch",
        ["snatch", "sn"],
        "Used to work with snatches.",
        "Used to handle creating, editing, and retrieving of snatches in a specific server. Has a different syntax style from other commands.",
        "`=snatch help`",
        [{
            name: "function",
            optional: false,
            desc: "The specific function to be run.",
            ex: "`=sn CREATE; key name; value string; ..overwrite`"
        },
        {
            name: "key",
            optional: true,
            desc: "The key of the snatch being created and/or retrieved.",
            ex: "`=sn get; KEY NAME; value string; ..delete`"
        }],
        [{
            name: "overwrite",
            optional: true,
            desc: "Overwrites current snatch with the key on creation."
        }],
        [],
        snatch,
        'snatch'
    ),
    new Command(
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
    new Command(
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
    new Command(
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
    new Command(
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
    new Command(
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
    new Command(
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
    new Command(
        "support",
        ["support", "supportserver"],
        "Gives the link to Pluto Support Server.",
        "Gives the link to Pluto Support Server.",
        "`=support`",
        [],
        [],
        [],
        support,
        'Pluto'
    ),
    new Command(
        "documentation",
        ["docs", "documentation"],
        "Gives the link to Documentation on GitHub.",
        "Gives the link to Documentation on GitHub.",
        "`=docs`",
        [],
        [],
        [],
        docs,
        'Pluto'
    ),
]

module.exports = commands;