import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/command/Genre'

const EchoInterface = new CommandInterface()

EchoInterface
    .setName('echo')
    .setAlias(['repeat'])
    .setDesc('Echoes what it is given.')
    .setColor('#4848db')
    .setGenre(Genre.Fun)

export default EchoInterface