import RandomHandle from "./handle";
import RandomInterface from "./interface";
import Command from "../../api/command/Command";

export default class EchoCommand extends Command {
    constructor () {
        super(RandomInterface, RandomHandle);
    }
}