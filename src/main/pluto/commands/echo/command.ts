import Command from '../Command'
import EchoInterface from './interface'
import EchoHandle from './handle'

export default class EchoCommand extends Command {
    constructor () {
        super(EchoInterface, EchoHandle)
    }
}