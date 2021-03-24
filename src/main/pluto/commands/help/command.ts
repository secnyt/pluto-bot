import Command from '../../api/command/Command'
import HelpInterface from './interface'
import HelpHandle from './handle'
import * as HelpArguments from './arguments/arguments'

export default class HelpCommand extends Command {
    constructor () {
        super(HelpInterface, HelpHandle, Object.values(HelpArguments).map(a => new a))
    }
}