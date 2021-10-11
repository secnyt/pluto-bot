import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/genre/Genre'
import GenreRegistry from "../../registries/GenreRegistry";

const EchoInterface = new CommandInterface()

EchoInterface
    .setName('echo')
    .setAlias(['repeat'])
    .setDesc('Echoes what it is given.')
    .setColor('#4848db')
    .setGenre(GenreRegistry.get('fun'))

export default EchoInterface