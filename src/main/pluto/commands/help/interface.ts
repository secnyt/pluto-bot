import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/genre/Genre'
import GenreRegistry from "../../registries/GenreRegistry";

const HelpInterface = new CommandInterface()

HelpInterface
    .setName('help')
    .setAlias(['?'])
    .setDesc('Opens help interface.')
    .setColor('#db4848')
    .setGenre(GenreRegistry.get('pluto'))

export default HelpInterface