import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/command/Genre'

const SimplifyInterface = new CommandInterface()

SimplifyInterface
    .setName('simplify')
    .setAlias(['simple'])
    .setDesc('Simplifies the given expression.')
    .setColor('#48db48')
    .setGenre(Genre.Math)

export default SimplifyInterface