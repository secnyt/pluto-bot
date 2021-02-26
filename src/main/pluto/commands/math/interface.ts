import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/command/Genre'

const MathInterface = new CommandInterface()

MathInterface
    .setName('math')
    .setAlias(['equation'])
    .setDesc('Evaluates the given equation.')
    .setColor('#48db48')
    .setGenre(Genre.Math)

export default MathInterface