let commandHandler: any = {};
let commands = require('./command.registry');

commandHandler.handle = (msg: any, client: any, opt?: any) => {
    let content: string = msg.content.trim() + ' '; // gets trimmed message content
    let msgCommand: string = content.substring(1, content.indexOf(' ')); // get the command (just after prefix)

    let command = commands.find(c => c.alias.includes(msgCommand));
    if (typeof command == 'undefined') { return; }
    if (command.perms.map(p => p.permission)) {
        if(msg.member.hasPermission(command.perms.map(p => p.permission))){
            command.handle(msg, client, command);
            return;
        } 
        if (!msg.member.hasPermission(command.perms.map(p => p.permission))) {
            msg.channel.send(`You do not have one or more of the following permissions: ${command.formattedPerms()}`);
        }
    }
    command.handle(msg, client, command);
}

module.exports = commandHandler;
