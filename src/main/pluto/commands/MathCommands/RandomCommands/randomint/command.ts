import RandomIntHandle from "./handle";
import RandomIntInterface from "./interface";
import Command from "../../../../api/command/Command";
import * as RandomIntArguments from './arguments/arguments'

export default class RandomIntCommand extends Command {
    constructor () {
        super(RandomIntInterface, RandomIntHandle, Object.values(RandomIntArguments).map(a => new a))
    }
}