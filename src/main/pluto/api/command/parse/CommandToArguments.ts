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
import Argument from "../argument/Argument";
import MessageHandler from "../../../handlers/MessageHandler";
import checkCommand from "../utility/checkCommand";

export default class CommandToArguments {
    static parse (msg: any): string[] {
        const command = checkCommand(msg)
        const content = MessageHandler.formatMessage(msg.content)
        const afterCommand = MessageHandler.afterCommand(content).trim()
        if (!afterCommand) return []
        return afterCommand.split(' ')
    }
}