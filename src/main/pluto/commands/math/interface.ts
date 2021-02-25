import CommandInterface from '../CommandInterface'
import Genre from '../Genre'

const MathInterface = new CommandInterface()

MathInterface
    .setName('math')
    .setAlias(['equation'])
    .setDesc('Evaluates the given equation.')
    .setColor('#48db48')
    .setGenre(Genre.Fun)

export default MathInterface