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
import Genre from '../genre/Genre'
import Argument from "./argument/Argument";
import generateUsage from "./utility/generateUsage";
import generateEx from "./utility/generateEx";
import TrailingArgument from "./argument/TrailingArgument";
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
        this.arguments = args || []
    }

    getUse (): string {
        return generateUsage(this)
    }
    getEx (): string {
        return generateEx(this)
    }

    checkArgumentValidity (args: string[], msg): PlutoError {
        let errorMessage: string[] = []

        // if no args are needed to pass in, then don't error
        if (!this.arguments[0]) return new PlutoError(false)

        let hasErrored: boolean = false
        this.arguments.forEach((a, i) => {
            // if argument is nonexistent but it is not required
            if (!args[i] && !a.required) return
            let valid: PlutoError = a.checkValidity(args[i])
            if (valid.err) {
                errorMessage.push(`\`\`\`${valid.errorMessage[0]}\`\`\``)
                hasErrored = true
            }
        })

        return new PlutoError(hasErrored, errorMessage)
    }

}
