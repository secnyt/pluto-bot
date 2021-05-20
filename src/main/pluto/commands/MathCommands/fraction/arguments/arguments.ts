import TrailingArgument from "../../../../api/command/argument/TrailingArgument";
import NumberArgument from "../../../../api/command/argument/NumberArgument";

export class FractionArgument extends NumberArgument {
    constructor () {
        super('rational_number', true, 0, '5.45', 'RationalNumber');
    }
}