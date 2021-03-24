import TrailingArgument from "../../../../api/command/argument/TrailingArgument";
import Expression from "../../arguments/expression";
import NumberArgument from "../../../../api/command/argument/NumberArgument";

export class QuadraticAArgument extends NumberArgument {
    constructor () {
        super('a', true, 0, '1', 'RationalNumber');
    }
}

export class QuadraticBArgument extends NumberArgument {
    constructor () {
        super('b', true, 1, '4', 'RationalNumber');
    }
}

export class QuadraticCArgument extends NumberArgument {
    constructor () {
        super('c', true, 2, '5', 'RationalNumber');
    }
}