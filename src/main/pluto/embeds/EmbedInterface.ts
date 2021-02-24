export default class EmbedInterface {
    title: string
    description: string
    color: string

    setTitle (title: string) { this.title = title; return this }
    setDescription (description: string) { this.description = description; return this }
    setColor (color: string) { this.color = color; return this }
}