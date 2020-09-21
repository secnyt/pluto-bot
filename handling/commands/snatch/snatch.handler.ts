let snatchHandler: any = {};

snatchHandler.handle = (msg: any, client: any) => {

    let content: string = msg.content.trim(); // trimmed message content
    let commandless: string = content.substr(content.indexOf(' ') + 1).trim(); // <function>; <key>; <value>;

    let parameters = commandless.split(';', 4).map(p => p.trim()); // split into pieces with maximum of 4 values by ';'
    let flags: any;
    if(typeof parameters[3] != 'undefined') {
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
    
}
snatchHandler.get = (msg: any, parameters: Array<string>, flags: Array<string>) => { // code to be run on get
    
}
snatchHandler.help = (msg: any, parameters: Array<string>, flags: Array<string>) => { // code to be run on help
    // generate and send help page
    let helpPage = require('./../../commandRegistry').find(c => c.alias.includes('snatch')).createHelp();
    msg.channel.send({ embed: helpPage });
};

let SnatchFunc: any = require('./snatchfunction.class');

let snatchfunctions = [
    new SnatchFunc('create', ['create', 'add', 'make'], snatchHandler.create),
    new SnatchFunc('get', ['get', 'retrieve', 'snatch'], snatchHandler.get),
    new SnatchFunc('help', ['help', 'wtf' ], snatchHandler.help),
]