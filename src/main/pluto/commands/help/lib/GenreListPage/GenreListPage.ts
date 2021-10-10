import Genre from "../../../../api/genre/Genre";
import FieldEmbed from "../../../../embeds/FieldEmbed";
import HelpGenreField from "./HelpGenreField";
import GenreListPageInterface from "./interface";
import GenreRegistry from "../../../../registries/GenreRegistry";

export default class GenreListPage extends FieldEmbed {
    static getGenreFields () {
        const genres = GenreRegistry.registry
        return genres.map(genre => HelpGenreField.createGenreField(genre).getField())
    }
    static getEmbed () {
        return new FieldEmbed(GenreListPageInterface, GenreListPage.getGenreFields())
    }
}