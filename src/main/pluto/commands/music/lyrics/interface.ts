import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/command/Genre'

const LyricsInterface = new CommandInterface()

LyricsInterface
    .setName('lyrics')
    .setAlias(['testo', 'letra', 'words'])
    .setDesc('Gives lyrics for the song given.')
    .setColor('#48dbdb')
    .setGenre(Genre.Music)

export default LyricsInterface