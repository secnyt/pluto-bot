import StringArgument from "../../../api/command/argument/StringArgument";
import CommandRegistry from "../../../registries/CommandRegistry";
import PlutoError from "../../../api/error/PlutoError";
import GenreRegistry from "../../../registries/GenreRegistry";

export class SearchTermArgument extends StringArgument {
    checkValidity (arg: string): PlutoError {
        let err =  !CommandRegistry.get(arg) && !GenreRegistry.get(arg)
        let errorMessage: string[] = []

        if (arg == 'undefined') errorMessage.push(`Missing argument ${this.name} of type ${this.type} at ${this.index}.`)
        else if (err) {
            errorMessage.push(`Passed argument "${arg}" is not valid as type ${this.name} (at index ${this.index}).\n--\nTIP: Try using a genre name (e.g. math, fun) or a command name (e.g. evaluate, echo).`)
        }

        return new PlutoError(err, errorMessage)
    }

    constructor() {
        super('searchTerm', false, 0, 'echo', 'searchTerm');
    }
}