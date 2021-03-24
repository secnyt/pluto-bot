import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/command/Genre'

const FractionInterface = new CommandInterface()

FractionInterface
    .setName('fraction')
    .setAlias(['frac', 'ratio'])
    .setDesc('Turns an floating point number (decimal) into a fraction.')
    .setColor('#48db48')
    .setGenre(Genre.Math)

export default FractionInterface