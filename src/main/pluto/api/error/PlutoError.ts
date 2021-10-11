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

export default class PlutoError {
    err: boolean
    errorMessage: string[]

    constructor (err: boolean, errorMessage?: string | string[]) {
        this.err = err

        if (typeof errorMessage == "string") this.errorMessage = [errorMessage]
        else if (errorMessage != undefined) this.errorMessage = errorMessage
        else this.errorMessage = []
    }
}