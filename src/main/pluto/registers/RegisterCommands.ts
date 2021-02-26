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

export default function registerCommands () {
    readdir(__dirname + '/../commands', { withFileTypes: true }, (err, files) => {
        if (err) files = []
        files
            .filter(dir => dir.isDirectory() && dir.name != 'permissions')
            .map(dir => dir.name)
            .forEach(c => {
                CommandRegistry.register(new (require(__dirname + `\\..\\commands\\${c}\\command`).default)())
            })
    })
}
