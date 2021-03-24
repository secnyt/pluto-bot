import TrailingArgument from "../../../api/command/argument/TrailingArgument";

export class EchoArgument extends TrailingArgument {
    constructor () {
        super('to_echo', true, 0)
    }
}