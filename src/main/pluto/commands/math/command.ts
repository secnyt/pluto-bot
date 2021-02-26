import Command from '../../api/command/Command'
import MathInterface from './interface'
import MathHandle from './handle'

export default class MathCommand extends Command {
    constructor () {
        super(MathInterface, MathHandle)
    }
}