import Registry from "../api/misc/Registry";
import Command from "../api/command/Command";

export default class CommandRegistry extends Registry {
    static shouldRegister (toRegister: Command): boolean {
        if (this.registry.some(cmd => cmd.name == toRegister.name)) {
            throw 'Cannot register multiple commands under the same name!'
        }
        return true
    }
}