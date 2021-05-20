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

import Command from '../api/command/Command'
// @ts-ignore
import * as auth from '../auth.json'
import CommandRegistry from "../registries/CommandRegistry";
import checkCommand from "../api/command/utility/checkCommand";
import CommandToArguments from "../api/command/parse/CommandToArguments";

export default class MessageHandler { // handler class

    static prefix: string = auth.prefix

    static checkPrefix (content: string): boolean { return content.startsWith(this.prefix) }

    // handle message string
    static formatMessage (string: string): string { return (string.trim().replace(/ +(?= )/g,'') + ' ') }
    static extractCommand (string: string): string { return string.substring(this.prefix.length, string.indexOf(' ')) } // command after prefix
    static afterCommand (string: string): string { return string.substring(string.indexOf(' ') + 1) }
    static formattedAfterCommand (string: string): string { return this.afterCommand(this.formatMessage(string))}

    static async handle (msg: any): Promise<boolean> {
        const cmd = checkCommand(msg)
        if (!(cmd instanceof Command)) return false
        let valid = cmd.checkArgumentValidity(CommandToArguments.parse(msg), msg)
        if (valid.err) {
            msg.channel.send('Check your command syntax:' + valid.errorMessage.reduce((a, b) => a + b ))
            return false
        }
        let handle = cmd.handle(msg)
    }
}
