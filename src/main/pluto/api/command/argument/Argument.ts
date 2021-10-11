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

import PlutoError from "../../error/PlutoError";

export default class Argument {
    name: string
    required: boolean
    index: number | number[]
    type: string
    ex: string

    constructor(name: string, required: boolean, index: number, ex: string, type: string) {
        this.name = name
        this.required = required
        this.index = index
        this.type = type
        this.ex = ex
    }


    check (arg: string): PlutoError {
        return this.checkValidity(arg)
    }

    checkValidity (arg: string): PlutoError {
        return new PlutoError(false)
    }

    getEx () {
        return this.ex
    }
}