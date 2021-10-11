import EmbedField from '../../../../embeds/EmbedField'
import Command from "../../../../api/command/Command";
import Genre from "../../../../api/genre/Genre";

export default class HelpGenreField extends EmbedField {
    genre: string
    desc: string

    constructor (genre: Genre) {
        super(genre, `\`${genre.name}\n${genre.desc}\``)

        this.genre = genre.name
        this.desc = genre.desc
    }

    getName () { return this.genre }
    getValue () { 
        return `${this.genre}\n${this.desc}`
    }

    static createGenreField (genre: Genre) {
        return new HelpGenreField(genre)
    }
}