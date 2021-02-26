import MessageHandler from "../../handlers/MessageHandler";
import * as stringMath from "string-math";

export default async function MathHandle (msg: any) {
    const content = MessageHandler.formatMessage(msg.content)
    const equation = MessageHandler.afterCommand(content)

    if (typeof equation == "undefined") return true
    const calculated = stringMath(equation)
    msg.channel.send(calculated)
}