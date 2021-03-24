import Command from '../../../api/command/Command'
import FractionInterface from './interface'
import FractionHandle from './handle'
import * as FractionArguments from './arguments/arguments'

export default class MathCommand extends Command {
    constructor () {
        super(FractionInterface, FractionHandle, Object.values(FractionArguments).map(a => new a))
    }
}