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

import Permission from '../../permissions/Permission'
import Genre from './Genre'
import Command from "./Command";

export default class CommandInterface {
    name: string
    alias: string[]
    permissions: Permission[]
    desc: string
    color: string
    genre: Genre

    setName (name: string): CommandInterface { this.name = name; return this }
    setAlias (alias: string[]): CommandInterface { this.alias = alias; return this }
    setPermissions (perms: Permission[]): CommandInterface { this.permissions = perms; return this }
    setDesc (desc: string): CommandInterface { this.desc = desc; return this }
    setColor (color: string): CommandInterface { this.color = color; return this }
    setGenre (genre: Genre): CommandInterface { this.genre = genre; return this }
}
