import Command from '../Command'
import HelpInterface from './interface'
import HelpHandle from './handle'

const HelpCommand = new Command (HelpInterface, HelpHandle)

export default HelpCommand