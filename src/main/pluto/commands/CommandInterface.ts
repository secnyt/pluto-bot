import Permission from '../permissions/Permission'
import Genre from './Genre'

export default class CommandInterface {
    name: string
    alias: string[]
    permissions: Permission[]
    desc: string
    color: string
    genre: Genre

    setName (name: string) { this.name = name; return this }
    setAlias (alias: string[]) { this.alias = alias; return this }
    setPermissions (perms: Permission[]) { this.permissions = perms; return this }
    setDesc (desc: string) { this.desc = desc; return this }
    setColor (color: string) { this.color = color; return this }
    setGenre (genre: Genre) { this.genre = genre; return this }
}