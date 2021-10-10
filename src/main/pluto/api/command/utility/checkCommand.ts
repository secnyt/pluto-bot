import MessageHandler from "../../../handlers/MessageHandler";
import Command from "../Command";
import CommandRegistry from "../../../registries/CommandRegistry";

export default function checkCommand (msg: any): Command | boolean {
    const content = MessageHandler.formatMessage(msg.content)
    if (!MessageHandler.checkPrefix(content)) return false
    const command = MessageHandler.extractCommand(content)

    let cmd: any = CommandRegistry.get(command) // search in the commands list for a command with the given alias

    if (typeof cmd == 'undefined') return false // if the command doesnt exist, just ignore the message

    return cmd
}