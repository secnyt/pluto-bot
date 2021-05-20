import Command from '../../../api/command/Command'
import PythagoreanTheoremInterface from './interface'
import PythagoreanTheoremHandle from './handle'
import * as PythagoreanTheoremArguments from './arguments/arguments'

export default class PythagoreanTheoremCommand extends Command {
    constructor () {
        super(PythagoreanTheoremInterface, PythagoreanTheoremHandle, Object.values(PythagoreanTheoremArguments).map(a => new a))
    }
}