export default class PlutoError {
    err: boolean
    errorMessage: string[]

    constructor (err: boolean, errorMessage?: string | string[]) {
        this.err = err

        if (typeof errorMessage == "string") this.errorMessage = [errorMessage]
        else if (errorMessage != undefined) this.errorMessage = errorMessage
        else this.errorMessage = []
    }
}