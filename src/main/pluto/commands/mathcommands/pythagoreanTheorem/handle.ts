import MessageHandler from "../../../handlers/MessageHandler";
import PlutoError from "../../../api/error/PlutoError";
import * as Complex from "complex.js"

export default async function PythagoreanTheoremHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formatMessage(msg.content)
    const [a, b] = MessageHandler.afterCommand(content).split(' ').map(a => parseFloat(a))

    let hypotenuse = Complex(a * a + b * b).sqrt()
    let calculated = `${hypotenuse.toString()}`

    msg.channel.send(calculated).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}