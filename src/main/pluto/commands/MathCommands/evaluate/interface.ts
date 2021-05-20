import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/command/Genre'

const MathInterface = new CommandInterface()

MathInterface
    .setName('evaluate')
    .setAlias(['math'])
    .setDesc('Evaluates the given expression.')
    .setColor('#48db48')
    .setGenre(Genre.Math)

export default MathInterface