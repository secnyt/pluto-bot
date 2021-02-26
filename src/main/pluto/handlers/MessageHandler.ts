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
import checkCommand from "../utility/checkCommand";

export default class MessageHandler { // handler class

    static checkPrefix (content: string): boolean { return content.startsWith(auth.prefix) }

    // handle message string
    static formatMessage (string: string): string { return string.trim() + ' ' }
    static extractCommand (string: string): string { return string.substring(auth.prefix.length, string.indexOf(' ')) } // command after prefix
    static afterCommand (string: string): string { return string.substring(string.indexOf(' ')) }

    static async handle (msg: any): Promise<boolean> {
        const cmd = checkCommand(msg)
        if (!(cmd instanceof Command)) return false
        return cmd.handle(msg)
    }
}
