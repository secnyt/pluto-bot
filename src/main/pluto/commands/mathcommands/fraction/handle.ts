import MessageHandler from "../../../handlers/MessageHandler";
import * as fraction from "fraction.js"
import PlutoError from "../../../api/error/PlutoError";

export default async function FractionHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formatMessage(msg.content)
    const number = MessageHandler.afterCommand(content)

    if (number == undefined) return new PlutoError(true, 'Error in handling arguments. Please report this issue.')

    const calculated = new fraction.default(parseFloat(number))

    msg.channel.send(calculated.toFraction()).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}