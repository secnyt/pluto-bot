import EmbedInterface from "./EmbedInterface";

export default abstract class AbstractEmbed {
    title: string
    description: string
    color: string | number

    protected constructor (options: EmbedInterface) {
        this.title = options.title
        this.description = options.description
        this.color = options.color
    }
}