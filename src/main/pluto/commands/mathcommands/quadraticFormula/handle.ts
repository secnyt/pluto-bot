import MessageHandler from "../../../handlers/MessageHandler";
import PlutoError from "../../../api/error/PlutoError";
import * as Complex from "complex.js"

export default async function QuadraticFormulaHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formatMessage(msg.content)
    const [a, b, c] = MessageHandler.afterCommand(content).split(' ').map(a => parseFloat(a))

    let sqrt = Complex(b * b - 4 * a * c).sqrt().div(2 * a)
    let plusOrMinus = Complex(-b).div(2 * a)
    let calculated = `${plusOrMinus.toString()} ${sqrt.toString() != '0' ?`± ${sqrt.toString()}` : ''}`

    msg.channel.send(calculated).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}