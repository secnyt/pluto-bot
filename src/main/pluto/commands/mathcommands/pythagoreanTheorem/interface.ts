import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/command/Genre'

const PythagoreanTheoremInterface = new CommandInterface()

PythagoreanTheoremInterface
    .setName('pythagoreantheorem')
    .setAlias(['ptheorem', 'pyth', 'pt', 'pythagorean', 'pythagoras'])
    .setDesc('Takes in 2 number arguments (a, b) and returns c (a^2 + b^2 = c^2).')
    .setColor('#48db48')
    .setGenre(Genre.Math)

export default PythagoreanTheoremInterface