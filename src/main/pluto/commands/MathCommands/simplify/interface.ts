import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const SimplifyInterface = new CommandInterface()

SimplifyInterface
    .setName('simplify')
    .setAlias(['simple'])
    .setDesc('Simplifies the given expression.')
    .setColor('#48db48')
    .setGenre(GenreRegistry.get('math'))

export default SimplifyInterface