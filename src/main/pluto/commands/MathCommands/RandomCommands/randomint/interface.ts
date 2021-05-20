import CommandInterface from '../../../../api/command/CommandInterface'
import Genre from '../../../../api/command/Genre'

const RandomIntInterface = new CommandInterface()

RandomIntInterface
    .setName('randomint')
    .setAlias(['randint'])
    .setDesc('Returns a random integer between the two given values (rounds numbers given down if is given a decimal).')
    .setColor('#4848db')
    .setGenre(Genre.Math)

export default RandomIntInterface