import StringArgument from "../../../api/command/argument/StringArgument";
import CommandRegistry from "../../../registries/CommandRegistry";
import PlutoError from "../../../api/error/PlutoError";

export class CommandNameArgument extends StringArgument {
    checkValidity (arg: string): PlutoError {
        let err =  !CommandRegistry.registry.some(c => c.name == arg || c.alias.includes(arg))
        let errorMessage: string[] = []

        if (arg == 'undefined') errorMessage.push(`Missing argument ${this.name} of type ${this.type} at ${this.index}.`)
        else if (err) errorMessage.push(`Passed argument "${arg}" is not valid as type ${this.name} (at index ${this.index}).`)

        return new PlutoError(err, errorMessage)
    }

    constructor() {
        super('command_name', false, 0, 'echo', 'commandName');
    }
}