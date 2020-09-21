var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let snatchHandler: any = {};

snatchHandler.handle = (msg: any, client: any) => {

    let content: string = msg.content.trim(); // trimmed message content
    let commandless: string = content.substr(content.indexOf(' ') + 1).trim(); // <function>; <key>; <value>;

    let parameters = commandless.split(';', 4).map(p => p.trim()); // split into pieces with maximum of 4 values by ';'
    let flags: any;
    if (typeof parameters[3] != 'undefined') {
        flags = parameters[3].split(',').map(f => f.toLowerCase().trim()); // get specific flags
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
        
        dbo.collection(msg.guild.id).find({ key: parameters[1] }).toArray((err, res) => {
            if (err) { console.error(err); msg.channel.send('Something went wrong.'); return; }

            if (typeof flags == 'undefined') flags = [];

            let ins: any = {
                key: parameters[1],
                snatch: parameters[2],
                reserved: false,
                permissions: []
            }

            if ((!flags.includes('.o') || !flags.includes('..overwrite')) && res[0]) { // no overwrite + exists
                msg.channel.send('This snatch already exists!\nPlease specify the `.o` flag to overwrite.');
                return;
            } else if (res[0]) { // overwrite + exists
                dbo.collection(msg.guild.id).findOneAndReplace({ key: parameters[1] }, ins, (err: any) => {
                    if (err) { console.error(err); msg.channel.send('Something went wrong on the insertion of your snatch into the database.\nPlease try again, or join OPSS (`=support`) for help.'); return; }
                    db.close();
                })
                msg.channel.send('Your snatch has been overwritten and updated.');
                return;
            } else { // overwrite or no overwrite + exists
                dbo.collection(msg.guild.id).insertOne(ins, (err: any) => {
                    if (err) {
                        console.error(err);
                        msg.channel.send('Something went wrong on the insertion of your snatch into the database.\nPlease try again, or join OPSS (`=support`) for help.');
                        return;
                    }
                    msg.channel.send(`Your snatch, \`${parameters[1]}\`, with value \`${parameters[2]}\` has been processed and uploaded.`);
                    db.close();
                })
            }
        })  
        if (flags.includes('.d') || flags.includes('..delete')) msg.delete();
    })
}
snatchHandler.get = (msg: any, parameters: Array<string>, flags: Array<string>) => { // code to be run on get
    if (parameters[2]) {
        flags = parameters[2].split(',').map(f => f.toLowerCase().trim());
    }
    MongoClient.connect(url, (err, db) => {
        if (err) { console.error(err); msg.channel.send('Something went wrong.'); return; }
        if (!parameters[1]) { msg.channel.send('You need to pass in a key to snatch!\nCheck `=snatches` if you need a key to snatch.'); return; }

        let dbo = db.db('pluto-snatches');
        dbo.collection(msg.guild.id).find({ key: parameters[1] }).toArray((err, res) => { 
            if (err) { console.error(err); msg.channel.send('Something went wrong.'); return; }
            if (!res) { msg.channel.send('This snatch doesn\'t exist! Please make sure you spelled it right.'); return; }
            msg.channel.send(res[0].snatch);
        })
    })
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