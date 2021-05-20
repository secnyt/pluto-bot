import Command from "../Command";
import MessageHandler from "../../../handlers/MessageHandler";

export default function generateEx (cmd: Command) {
    let examples = cmd.arguments.map(a => a.getEx()).join(' ')
    return `${MessageHandler.prefix}${cmd.name} ${examples}`
}