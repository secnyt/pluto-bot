import TrailingArgument from "../../../../api/command/argument/TrailingArgument";
import Expression from "../../arguments/expression";
import NumberArgument from "../../../../api/command/argument/NumberArgument";

export class LegAArgument extends NumberArgument {
    constructor () {
        super('a', true, 0, '3');
    }
}

export class LegBArgument extends NumberArgument {
    constructor () {
        super('b', true, 1, '4');
    }
}