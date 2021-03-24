import TrailingArgument from "../../../../api/command/argument/TrailingArgument";
import Expression from "../../arguments/expression";

export class SimplifyArgument extends Expression {
    constructor () {
        super(true, 0);
    }
}