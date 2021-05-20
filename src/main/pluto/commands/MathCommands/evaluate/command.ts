import Command from '../../../api/command/Command'
import MathInterface from './interface'
import MathHandle from './handle'
import * as MathArguments from './arguments/arguments'

export default class MathCommand extends Command {
    constructor () {
        super(MathInterface, MathHandle, Object.values(MathArguments).map(a => new a))
    }
}