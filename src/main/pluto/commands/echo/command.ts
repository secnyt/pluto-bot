import Command from '../../api/command/Command'
import EchoInterface from './interface'
import EchoHandle from './handle'
import * as EchoArguments from './arguments/arguments'

export default class EchoCommand extends Command {
    constructor () {
        super(EchoInterface, EchoHandle, Object.values(EchoArguments).map(a => new a))
    }
}