import MessageHandler from "../../handlers/MessageHandler";

export default async function EchoHandle (msg: any) {
    const content = MessageHandler.formatMessage(msg.content)
    const echo = MessageHandler.afterCommand(content)

    if (typeof echo == "undefined") return true
    msg.channel.send(echo)
}