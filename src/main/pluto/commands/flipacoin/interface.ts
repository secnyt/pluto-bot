import CommandInterface from '../../api/command/CommandInterface'
import Genre from '../../api/command/Genre'

const CoinFlipInterface = new CommandInterface()

CoinFlipInterface
    .setName('flipacoin')
    .setDesc('Returns heads or tails.')
    .setColor('#4848db')
    .setGenre(Genre.Math)

export default CoinFlipInterface