import Command from './Command'
import MessageHandler from './MessageHandler'

export default function registerCommands () {
    const commands: string[] = ['help']

    commands.forEach(c => {
        MessageHandler.registerCommand(require(`./${c}/${c}`).default)
    })
}