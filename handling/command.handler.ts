let commandHandler: any = {};
let commands = require('./commandRegistry');

commandHandler.handle = (msg: any, client: any, opt?: any) => {
    let content: string = msg.content.trim() + ' '; // gets trimmed message content
    let msgCommand: string = content.substring(1, content.indexOf(' ')); // get the command (just after prefix)

    let command = commands.find(c => c.alias.includes(msgCommand));
    if(typeof command != 'undefined'){
        command.handle(msg, client, command);
    } else {
        console.log('no command');
    }
}

module.exports = commandHandler;