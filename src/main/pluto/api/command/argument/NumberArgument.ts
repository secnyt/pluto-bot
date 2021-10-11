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

import Argument from "./Argument";
import * as random from 'random'
import PlutoError from "../../error/PlutoError";

export default class NumberArgument extends Argument {
    constructor (name: string, required: boolean, index: number, ex?: string, type?: string) {
        super(name, required, index, ex || random.int(0, 20).toString(),type || 'number');
    }

    checkValidity (arg: string): PlutoError {
        let err: boolean = isNaN(parseFloat(arg)) || !isFinite(parseFloat(arg))
        let errorMessage: string[] = []

        if (arg == undefined) errorMessage.push(`Missing argument "${this.name}" of type ${this.type} (at index ${this.index}).`)
        else if (err) errorMessage.push(`Passed argument "${arg}" is not valid as type ${this.type} for argument "${this.name}" (at index ${this.index}).`)

        return new PlutoError(err, errorMessage)
    }
}