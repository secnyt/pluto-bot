import Command from '../../api/command/Command'
import HelpInterface from './interface'
import HelpHandle from './handle'

export default class HelpCommand extends Command {
    constructor () {
        super(HelpInterface, HelpHandle)
    }
}