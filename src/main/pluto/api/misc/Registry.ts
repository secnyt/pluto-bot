import Command from "../command/Command";

export default class Registry {
    static registry: any[] = []
    static register (toRegister: any): void {
        if (this.shouldRegister(toRegister)) {
            this.registry.push(toRegister)
        }
    }
    static shouldRegister (toRegister: any): boolean {
        return true
    }
}