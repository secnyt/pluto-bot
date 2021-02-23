/*  This file is part of Pluto.
 *
 *  Pluto is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import Command from './Command'
import * as auth from '../auth.json'

export default class MessageHandler { // handler class
    static commands = []

    static getPath (path: string) { return require(`./${path}`) }
    static registerCommand (cmd: Command) { this.commands.push(cmd) }

    static checkCommand (content: string): boolean { return content.startsWith(auth.prefix) }

    // handle message string
    static formatMessage (string: string): string { return string.trim() + ' ' }
    static extractCommand (string: string): string { return string.substring(1, string.indexOf(' ')) } // command after prefix

    static async handle (msg: any) {
        let content: string = this.formatMessage(msg.content)
        if (!this.checkCommand(content)) return false
        let command: string = this.extractCommand(content)

        let cmd: any = this.commands.find(c => c.name == command) // search in the commands list for a command with the given alias

        if (typeof cmd == 'undefined') return false // if the command doesnt exist, just ignore the message

        return await cmd.handle(msg) // if the permission check didnt fail, or the command doesnt have perms, run the command, then return the state of the command
    }
}
