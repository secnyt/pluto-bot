import FieldEmbed from "../../../../embeds/FieldEmbed";
import CommandRegistry from "../../../../registries/CommandRegistry";
import HelpCommandField from "../CommandListPage/HelpCommandField";
import Genre from "../../../../api/genre/Genre";
import GenreCommandListPageInterface from "./interface";

export default class GenreCommandListPage extends FieldEmbed {
    static getGenreFields (genre: Genre) {
        const commands = CommandRegistry.registry.filter(c => c.genre == genre)
        return commands.map(cmd => HelpCommandField.createCommandField(cmd).getField())
    }
    static getEmbed (genre: Genre) {
        return new FieldEmbed(new GenreCommandListPageInterface(genre), GenreCommandListPage.getGenreFields(genre))
    }
}