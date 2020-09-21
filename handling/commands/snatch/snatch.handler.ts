var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let snatchHandler: any = {};

snatchHandler.handle = (msg: any, client: any) => {

    let content: string = msg.content.trim(); // trimmed message content
    let commandless: string = content.substr(content.indexOf(' ') + 1).trim(); // <function>; <key>; <value>;

    let parameters = commandless.split(';', 4).map(p => p.trim()); // split into pieces with maximum of 4 values by ';'
    let flags: any;
    if (typeof parameters[3] != 'undefined') {
        flags = parameters[3].split(',').map(p => p.toLowerCase().trim()); // get specific flags
    }

    let snatchfunction = snatchfunctions.find(c => c.alias.includes(parameters[0])); // specific snatch function
    if (typeof snatchfunction != 'undefined') {
        snatchfunction.handle(msg, parameters, flags);
    } else {
        msg.channel.send('Please check your `function` parameter. \nTo see how to use, run `=help snatch function`.');
    }
}

module.exports = snatchHandler;

snatchHandler.create = (msg: any, parameters: Array<string>, flags: Array<string>) => { // code to be run on create
    if (typeof parameters[1] == 'undefined' || typeof parameters[2] == 'undefined') { // didn't include a parameter
        msg.channel.send(`You are missing a parameter or two!\nPlease refer to \`=help sn\`.`)
        return;
    }
    if (!parameters[1] || !parameters[2]) { // had an empty string parameter
        msg.channel.send(`Please make sure your keys and values aren't empty!`);
        return;
    }
    if (parameters[1].length > 200 || parameters[2].length > 200) { // has a parameter over 200 characters
        msg.channel.send(`Please limit your snatch keys / values to 200 characters. Thank you!`);
        return;
    }
    MongoClient.connect(url, (err: any, db: any) => {
        if (err) { console.error(err); msg.channel.send('Something went wrong.'); return; }
        let dbo: any = db.db('pluto-snatches');
        
        dbo.collection(msg.guild.id).find({ key: parameters[1] }, (err, res) => {
            if (err) { console.error(err); msg.channel.send('Something went wrong.'); return; }
            if ((!flags.includes('.o') || !flags.includes('..overwrite')) && res[0]) { // no overwrite + exists
                msg.channel.send('This snatch already exists!\nPlease specify the `.o` flag to overwrite.');
                return;
            } else if (res[0]) { // overwrite + exists
                msg.channel.send('Your snatch has been overwritten and updated.');
            } else { // overwrite or no overwrite + exists
                msg.channel.send(`Your snatch, \`${parameters[1]}\`, with value \`${parameters[2]}\` has been processed and uploaded.`)
            }
            let ins: any = {
                key: parameters[1],
                snatch: parameters[2],
                reserved: false,
                permissions: []
            }
            dbo.collection(msg.guild.id).insertOne(ins, (err: any) => {
                if (err) {
                    console.error(err);
                    msg.channel.send('Something went wrong on the insertion of your snatch into the database.\nPlease join OPSS (`=support`) for help.'); return;
                }

                db.close();
            })
        })

    })
}
snatchHandler.get = (msg: any, parameters: Array<string>, flags: Array<string>) => { // code to be run on get
    
}
snatchHandler.help = (msg: any, parameters: Array<string>, flags: Array<string>) => { // code to be run on help
    // generate and send help page
    let helpPage = require('./../../commandRegistry').find(c => c.alias.includes('snatch')).createHelp(parameters[1]);
    msg.channel.send({ embed: helpPage });
};

let SnatchFunc: any = require('./snatchfunction.class');

let snatchfunctions = [
    new SnatchFunc('create', ['create', 'add', 'make'], snatchHandler.create),
    new SnatchFunc('get', ['get', 'retrieve', 'snatch'], snatchHandler.get),
    new SnatchFunc('help', ['help', 'wtf' ], snatchHandler.help),
]