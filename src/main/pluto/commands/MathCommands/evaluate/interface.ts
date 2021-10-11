import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const MathInterface = new CommandInterface()

MathInterface
    .setName('evaluate')
    .setAlias(['calculate'])
    .setDesc('Evaluates the given expression.')
    .setColor('#48db48')
    .setGenre(GenreRegistry.get('math'))

export default MathInterface