import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const QuadraticFormulaInterface = new CommandInterface()

QuadraticFormulaInterface
    .setName('quadraticformula')
    .setAlias(['quadformula', 'qf'])
    .setDesc('Takes in 3 number arguments (ℝ) and returns the solutions to the quadratic equation.')
    .setColor('#48db48')
    .setGenre(GenreRegistry.get('math'))

export default QuadraticFormulaInterface