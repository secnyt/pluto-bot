let commandHandler = {};
let commands = require('./commandRegistry');
commandHandler.handle = (msg, client, opt) => {
    let content = msg.content.trim() + ' '; // gets trimmed message content
    let msgCommand = content.substring(1, content.indexOf(' ')); // get the command (just after prefix)
    let command = commands.find(c => c.alias.includes(msgCommand));
    if (typeof command != 'undefined') {
        command.handle(msg, client, command);
    }
    else {
        console.log('no command');
    }
};
module.exports = commandHandler;
