import * as random from 'random'
import CommandToArguments from "../../../../api/command/parse/CommandToArguments";
import PlutoError from "../../../../api/error/PlutoError";

export default async function RandomIntHandle (msg: any): Promise<PlutoError> {
    const args = CommandToArguments.parse(msg)
    const generatedRandomInt = random.int(parseInt(args[0]), parseInt(args[1]))

    msg.channel.send(generatedRandomInt).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}