import Command from '../Command'
import HelpInterface from './interface'
import HelpHandle from './handle'
import HelpPage from './lib/page'

export default class HelpCommand extends Command {
    constructor () {
        super(HelpInterface, HelpHandle)
    }

    static createHelpPageFromCommand (cmd: Command) {

    }
}