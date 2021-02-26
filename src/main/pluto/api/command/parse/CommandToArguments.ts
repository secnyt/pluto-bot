import Command from "../Command";
import Argument from "../argument/Argument";
import MessageHandler from "../../../handlers/MessageHandler";

export default class CommandToArguments {
    static parse (msg: any): Argument[] {
        const content = MessageHandler.formatMessage(msg.content)
        const givenArguments = MessageHandler.afterCommand(content).trim()
        if (!givenArguments) return []


    }
}