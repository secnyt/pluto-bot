import EmbedField from '../../../embeds/EmbedField'
import Command from "../../Command";

export default class HelpCommandField extends EmbedField {
    cmd: string
    desc: string
    usage: string
    ex: string

    constructor (cmd: string, desc: string, usage: string, ex: string) {
        super(cmd, `${cmd}\n${desc}\nUse: \`${usage}\`\nEx: \`${ex}\``)

        this.cmd = cmd
        this.desc = desc
        this.usage = usage
        this.ex = ex
    }

    getName () { return this.cmd }
    getValue () { 
        return `${this.cmd}\n${this.desc}\nUse: \`${this.usage}\`\nEx: \`${this.ex}\``
    }

    static createCommandField (cmd: Command) {
        return new HelpCommandField(cmd.name, cmd.desc, 'Coming Soon', 'Coming Soon')
    }
}