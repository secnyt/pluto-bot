import EmbedField from '../../../../embeds/EmbedField'
import Command from "../../../../api/command/Command";

export default class HelpCommandField extends EmbedField {
    cmd: string
    desc: string
    usage: string
    ex: string

    constructor (cmd: Command) {
        super(cmd, `${cmd.name}\n${cmd.desc}\nUse: \`${cmd.getUse()}\`\nEx: \`${cmd.getEx()}\``)

        this.cmd = cmd.name
        this.desc = cmd.desc
        this.usage = cmd.getUse()
        this.ex = cmd.getEx()
    }

    getName () { return this.cmd }
    getValue () { 
        return `${this.cmd}\n${this.desc}\nUse: \`${this.usage}\`\nEx: \`${this.ex}\``
    }

    static createCommandField (cmd: Command) {
        return new HelpCommandField(cmd)
    }
}