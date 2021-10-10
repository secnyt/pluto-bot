import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const FractionInterface = new CommandInterface()

FractionInterface
    .setName('fraction')
    .setAlias(['frac', 'ratio'])
    .setDesc('Turns an floating point number (decimal) into a fraction.')
    .setColor('#48db48')
    .setGenre(GenreRegistry.get('math'))

export default FractionInterface