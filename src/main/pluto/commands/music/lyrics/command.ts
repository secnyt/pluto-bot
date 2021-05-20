import Command from '../../../api/command/Command'
import LyricsInterface from './interface'
import LyricsHandle from './handle'
import * as LyricsArguments from './arguments/arguments'

export default class Lyrics extends Command {
    constructor () {
        super(LyricsInterface, LyricsHandle, Object.values(LyricsArguments).map(a => new a))
    }
}