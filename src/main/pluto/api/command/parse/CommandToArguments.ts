import Argument from "../argument/Argument";
import MessageHandler from "../../../handlers/MessageHandler";
import checkCommand from "../utility/checkCommand";

export default class CommandToArguments {
    static parse (msg: any): string[] {
        const command = checkCommand(msg)
        const content = MessageHandler.formatMessage(msg.content)
        const afterCommand = MessageHandler.afterCommand(content).trim()
        if (!afterCommand) return []
        return afterCommand.split(' ')
    }
}