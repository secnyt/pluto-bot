import MessageHandler from "../../../handlers/MessageHandler";
import PlutoError from "../../../api/error/PlutoError";
import * as nerdamer from "nerdamer"

export default async function SimplifyHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formatMessage(msg.content)
    const expression = MessageHandler.afterCommand(content)

    if (expression == undefined) return new PlutoError(true, 'Error handling arguments. Please report this issue.')

    let calculated: string = nerdamer(expression).text()

    msg.channel.send(calculated).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}