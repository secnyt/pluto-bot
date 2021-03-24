import Command from '../../api/command/Command'
import RandIntInterface from './interface'
import RandIntHandle from './handle'

export default class RandIntCommand extends Command {
    constructor () {
        super(RandIntInterface, RandIntHandle)
    }
}