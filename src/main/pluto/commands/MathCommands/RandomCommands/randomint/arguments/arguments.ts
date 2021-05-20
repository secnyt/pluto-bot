import NumberArgument from "../../../../../api/command/argument/NumberArgument";

export class MinIntArgument extends NumberArgument {
    constructor () {
        super('min', true, 0)
    }
}

export class MaxIntArgument extends NumberArgument {
    constructor () {
        super('max', true, 1)
    }
}