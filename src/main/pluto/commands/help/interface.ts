import CommandInterface from '../CommandInterface'
import Genre from '../Genre'

const HelpInterface = new CommandInterface()

HelpInterface
    .setName('help')
    .setAlias(['pluto'])
    .setDesc('Opens help interface.')
    .setColor('#db4848')
    .setGenre(Genre.Pluto)

export default HelpInterface