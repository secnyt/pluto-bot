import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/command/Genre'

const RandomInterface = new CommandInterface()

RandomInterface
    .setName('random')
    .setAlias(['rand'])
    .setDesc('Returns a random integer between the two given values.')
    .setColor('#4848db')
    .setGenre(Genre.Math)

export default RandomInterface