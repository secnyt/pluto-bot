export default class Argument {
    name: string
    required: boolean
    index: number | number[]

    static check (arg: string): boolean {
        return this.checkValidity(arg)
    }

    static checkValidity (arg: string): boolean {
        return true
    }
}