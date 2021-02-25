import Command from '../Command'
import MathInterface from './interface'
import MathHandle from './handle'

export default class EchoCommand extends Command {
    constructor () {
        super(MathInterface, MathHandle)
    }
}