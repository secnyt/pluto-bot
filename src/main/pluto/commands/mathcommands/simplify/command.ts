import Command from '../../../api/command/Command'
import * as MathArguments from './arguments/arguments'
import SimplifyInterface from "./interface";
import SimplifyHandle from "./handle";

export default class SimplifyCommand extends Command {
    constructor () {
        super(SimplifyInterface, SimplifyHandle, Object.values(MathArguments).map(a => new a))
    }
}