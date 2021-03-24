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

import CommandInterface from './CommandInterface'
import Permission from '../../permissions/Permission'
import Genre from './Genre'
import Argument from "./argument/Argument";
import PlutoError from "../error/PlutoError";

export default class Command {
    handle: Function
    name: string
    alias: string[]
    permissions: Permission[]
    desc: string
    color: string
    genre: Genre
    arguments: Argument[]

    constructor (options: CommandInterface, handle: Function, args?: Argument[]) {
        this.handle = (msg: any) => { handle(msg) }
        this.name = options.name
        this.alias = options.alias
        this.permissions = options.permissions
        this.desc = options.desc
        this.color = options.color
        this.genre = options.genre
        this.arguments = args
    }
}
