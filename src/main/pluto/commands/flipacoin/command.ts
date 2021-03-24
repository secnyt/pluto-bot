import Command from '../../api/command/Command'
import CoinFlipInterface from './interface'
import CoinFlipHandle from './handle'

export default class CoinFlipCommand extends Command {
    constructor () {
        super(CoinFlipInterface, CoinFlipHandle)
    }
}