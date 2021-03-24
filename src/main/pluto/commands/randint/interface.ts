import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/command/Genre'

const RandIntInterface = new CommandInterface()

RandIntInterface
    .setName('randint')
    .setDesc('Returns a random number between a min and max integer.')
    .setColor('#4848db')
    .setGenre(Genre.Math)

export default RandIntInterface