import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const PythagoreanTheoremInterface = new CommandInterface()

PythagoreanTheoremInterface
    .setName('pythagoreantheorem')
    .setAlias(['ptheorem', 'pyth', 'pt', 'pythagorean', 'pythagoras'])
    .setDesc('Takes in 2 number arguments (a, b) and returns c (a^2 + b^2 = c^2).')
    .setColor('#48db48')
    .setGenre(GenreRegistry.get('math'))

export default PythagoreanTheoremInterface