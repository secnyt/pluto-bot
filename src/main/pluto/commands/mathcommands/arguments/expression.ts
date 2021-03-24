import TrailingArgument from "../../../api/command/argument/TrailingArgument";

export default class Expression extends TrailingArgument {
    constructor (required: boolean, index: number, ex?: string, type?: string, name?: string) {
        super(name || 'expression', required, index, ex || 'x^2+2*(cos(x)+x*x)', type || 'expression');
    }
}
