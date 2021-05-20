import PlutoError from "../../error/PlutoError";

export default class Argument {
    name: string
    required: boolean
    index: number | number[]
    type: string
    ex: string

    constructor(name: string, required: boolean, index: number, ex: string, type: string) {
        this.name = name
        this.required = required
        this.index = index
        this.type = type
        this.ex = ex
    }


    check (arg: string): PlutoError {
        return this.checkValidity(arg)
    }

    checkValidity (arg: string): PlutoError {
        return new PlutoError(false)
    }

    getEx () {
        return this.ex
    }
}