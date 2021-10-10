import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const LyricsInterface = new CommandInterface()

LyricsInterface
    .setName('lyrics')
    .setAlias(['testo', 'letra', 'words'])
    .setDesc('Gives lyrics for the song given.')
    .setColor('#48dbdb')
    .setGenre(GenreRegistry.get('music'))

export default LyricsInterface