import EmbedInterface from "../../../../embeds/EmbedInterface";
import Genre from "../../../../api/genre/Genre";

export default class GenreCommandListPageInterface extends EmbedInterface {
    constructor (genre: Genre) {
        super()
        this.setTitle(genre.name)
        this.setDescription(`\`${genre.name}\` command list`)
        this.setColor(genre.color)
    }
}