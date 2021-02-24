import { readdir } from 'fs'
import MessageHandler from './MessageHandler'

export default function registerCommands () {
    readdir(__dirname, { withFileTypes: true }, (err, files) => {
        if (err) files = []
        files
            .filter(dir => dir.isDirectory() && dir.name != 'permissions')
            .map(dir => dir.name)
            .forEach(c => {
                MessageHandler.registerCommand(new (require(`./${c}/command`).default)())
            })
    })
}