import EmbedField from '../../../embeds/EmbedField'

export default class HelpCommandField extends EmbedField {
    cmd: string
    desc: string
    usage: string
    ex: string

    constructor (cmd: string, desc: string, usage: string, ex: string) {
        super()
    }

    getName () { return this.cmd }
    getValue () { 
        return `${this.cmd}\n${this.desc}\nUse: \`${this.usage}\`\nEx: \`${this.ex}\``
    }
}