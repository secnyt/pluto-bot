import FrontPage from "./lib/FrontPage/FrontPage";
import MessageHandler from "../../handlers/MessageHandler";
import Command from "../../api/command/Command";
import CommandHelpPage from "./lib/CommandPage/CommandHelpPage";
import CommandRegistry from "../../registries/CommandRegistry";

export default async function HelpHandle (msg: any): Promise<boolean> {
    const content: string = MessageHandler.formatMessage(msg.content)
    const search: string[] = MessageHandler.afterCommand(content).trim().split(' ')

    if (!search[0]) {
        msg.channel.send({ embed: FrontPage.getEmbed() })
        return true
    }

    const commandToHelp: Command = CommandRegistry.registry.find(c => c.name == search[0] || c.alias.includes(search[0])) // finds the searched command
    if (typeof commandToHelp == "undefined") {
        msg.channel.send('Command not found.')
        return true
    }
    msg.channel.send({ embed: CommandHelpPage.getEmbed(commandToHelp) })

    return true
}