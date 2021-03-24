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

import { readdir } from 'fs'
import CommandRegistry from "../registries/CommandRegistry";
import * as find from 'findit'

export default async function registerCommands () {
    const finder = find(__dirname + '/../commands')

    finder.on('file', (file, stat) => {
        if (file.endsWith('command.js')) {
            CommandRegistry.register(new (require(file).default))
        }
    })
}
