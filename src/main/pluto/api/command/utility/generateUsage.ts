import Command from "../Command";
import MessageHandler from "../../../handlers/MessageHandler";

export default function generateUsage (cmd: Command) {
    let usageString: string = ''
    for (let i = 0; i < cmd.arguments.length; i++) {
        let arg = cmd.arguments[i]
        if (arg.required) usageString += `<${arg.name}: ${arg.type}> `
        else usageString += `[${arg.name}: ${arg.type}] `
    }
    return `${MessageHandler.prefix}${cmd.name} ${usageString}`
}