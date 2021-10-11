import CommandInterface from '../../../../api/command/CommandInterface'
import Genre from '../../../../api/genre/Genre'
import GenreRegistry from "../../../../registries/GenreRegistry";

const RandomIntInterface = new CommandInterface()

RandomIntInterface
    .setName('randomint')
    .setAlias(['randint'])
    .setDesc('Returns a random integer between the two given values (rounds numbers given down if is given a decimal).')
    .setColor('#4848db')
    .setGenre(GenreRegistry.get('math'))

export default RandomIntInterface