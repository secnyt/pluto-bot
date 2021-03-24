import MessageHandler from "../../handlers/MessageHandler";
import PlutoError from "../../api/error/PlutoError";

export default async function EchoHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formattedAfterCommand(msg.content)
    msg.channel.send(content).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}