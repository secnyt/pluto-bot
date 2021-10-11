import CommandListPage from "./lib/CommandListPage/CommandListPage";
import MessageHandler from "../../handlers/MessageHandler";
import Command from "../../api/command/Command";
import CommandHelpPage from "./lib/CommandPage/CommandHelpPage";
import CommandRegistry from "../../registries/CommandRegistry";
import PlutoError from "../../api/error/PlutoError";
import GenreListPage from "./lib/GenreListPage/GenreListPage";
import Genre from "../../api/genre/Genre";
import GenreRegistry from "../../registries/GenreRegistry";
import GenreCommandListPage from "./lib/GenrePage/GenreCommandListPage";

export default async function HelpHandle (msg: any): Promise<PlutoError> {
    const content: string = MessageHandler.formatMessage(msg.content)
    const search: string[] = MessageHandler.afterCommand(content).trim().split(' ')

    if (!search[0]) {
        msg.channel.send({ embed: GenreListPage.getEmbed() }).catch(err => {
            return new PlutoError(true, err)
        })
        return new PlutoError(false)
    }
    /*if (!search[0]) {
        msg.channel.send({ embed: CommandListPage.getEmbed() }).catch(err => {
            return new PlutoError(true, err)
        })
        return new PlutoError(false)
    }*/

    const searched: any = CommandRegistry.get(search[0]) || GenreRegistry.get(search[0]) // finds the searched command

    if (searched instanceof Command) {
        msg.channel.send({ embed: CommandHelpPage.getEmbed(searched) }).catch(err => {
            return new PlutoError(true, err)
        })
    }
    if (searched instanceof Genre) {
        msg.channel.send({ embed: GenreCommandListPage.getEmbed(searched) }).catch(err => {
            return new PlutoError(true, err)
        })
    }

    return new PlutoError(false)
}