import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/command/Genre'

const HelpInterface = new CommandInterface()

HelpInterface
    .setName('help')
    .setAlias(['pluto'])
    .setDesc('Opens help interface.')
    .setColor('#db4848')
    .setGenre(Genre.Pluto)

export default HelpInterface