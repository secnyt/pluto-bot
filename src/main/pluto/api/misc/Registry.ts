import Command from "../command/Command";

export default class Registry {
    static registry: any[] = []
    static get (name: string) {
        return this.registry.find(e => e.name == name || (e.alias && e.alias.includes(name)))
    }
    static register (toRegister: any): void {
        if (this.shouldRegister(toRegister)) {
            this.registry.push(toRegister)
        }
    }
    static shouldRegister (toRegister: any): boolean {
        return true
    }
}