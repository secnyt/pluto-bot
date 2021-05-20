import Argument from "./Argument";
import * as random from 'random'
import PlutoError from "../../error/PlutoError";

export default class NumberArgument extends Argument {
    constructor (name: string, required: boolean, index: number, ex?: string, type?: string) {
        super(name, required, index, ex || random.int(0, 20).toString(),type || 'number');
    }

    checkValidity (arg: string): PlutoError {
        let err: boolean = isNaN(parseFloat(arg)) || !isFinite(parseFloat(arg))
        let errorMessage: string[] = []

        if (arg == undefined) errorMessage.push(`Missing argument "${this.name}" of type ${this.type} (at index ${this.index}).`)
        else if (err) errorMessage.push(`Passed argument "${arg}" is not valid as type ${this.type} for argument "${this.name}" (at index ${this.index}).`)

        return new PlutoError(err, errorMessage)
    }
}