import CommandInterface from './CommandInterface'
import Permission from './permissions/Permission'
import Genre from './Genre'

export default class Command {
    handle: Function
    name: string
    alias: string[]
    permissions: Permission[]
    desc: string
    color: string
    genre: Genre

    constructor (options: CommandInterface, handle: Function) {
        this.handle = (msg: any) => { handle(msg) }
        this.name = options.name
        this.alias = options.alias
        this.permissions = options.permissions
        this.desc = options.desc
        this.color = options.color
        this.genre = options.genre
    }

    static createCommandHelp (cmd: Command) {

    }
}