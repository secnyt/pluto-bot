/*  This file is part of Pluto.
 *  Copyright (C) 2021 Secnyt
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
 */

import MessageHandler from "../../../handlers/MessageHandler";
import Command from "../Command";
import CommandRegistry from "../../../registries/CommandRegistry";

export default function checkCommand (msg: any): Command | boolean {
    const content = MessageHandler.formatMessage(msg.content)
    if (!MessageHandler.checkPrefix(content)) return false
    const command = MessageHandler.extractCommand(content)

    let cmd: any = CommandRegistry.get(command) // search in the commands list for a command with the given alias

    if (typeof cmd == 'undefined') return false // if the command doesnt exist, just ignore the message

    return cmd
}