import Command from '../../../api/command/Command'
import QuadraticFormulaInterface from './interface'
import QuadraticFormulaHandle from './handle'
import * as QuadraticFormulaArguments from './arguments/arguments'

export default class QuadraticFormulaCommand extends Command {
    constructor () {
        super(QuadraticFormulaInterface, QuadraticFormulaHandle, Object.values(QuadraticFormulaArguments).map(a => new a))
    }
}