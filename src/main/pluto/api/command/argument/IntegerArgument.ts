import Argument from "./Argument";

export default class IntegerArgument extends Argument {
    static checkValidity (arg: string) {
        return !isNaN(parseFloat(arg)) && isFinite(parseFloat(arg))
    }
}