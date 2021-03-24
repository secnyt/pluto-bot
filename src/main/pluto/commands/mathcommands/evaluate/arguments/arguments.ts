import TrailingArgument from "../../../../api/command/argument/TrailingArgument";
import Expression from "../../arguments/expression";

export class MathArgument extends Expression {
    constructor () {
        super(true, 0, '5+3*(6-2)', 'mathExpression');
    }
}