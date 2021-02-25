export default class EmbedField {
    name: string
    content: string
    inline: boolean

    constructor (name, content, inline?) {
        this.name = name
        this.content = content
        this.inline = inline || false
    }

    getName () { return this.name }
    getValue () { return this.content }

    getField () {
        return {
            name: this.getName(),
            value: this.getValue(),
            inline: this.inline,
        }
    }
}