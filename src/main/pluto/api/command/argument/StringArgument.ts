import Argument from "./Argument";
import PlutoError from "../../error/PlutoError";

export default class StringArgument extends Argument {
    constructor (name: string, required: boolean, index: number, ex: string, type?: string) {
        super(name, required, index, ex || 'hello', type || 'string');
    }

    checkValidity (arg: string): PlutoError {
        let err = !arg
        let errorMessage: string[] = []

        if (arg == undefined) errorMessage.push(`Missing argument "${this.name}" of type ${this.type} (at index ${this.index}).`)
        else if (err) errorMessage.push(`Passed argument "${arg}" is not valid as type ${this.type} for argument ${this.name} (at index ${this.index}).`)

        return new PlutoError(err, errorMessage)
    }
}