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

import TrailingArgument from "../../../../api/command/argument/TrailingArgument";
import Expression from "../../arguments/expression";
import NumberArgument from "../../../../api/command/argument/NumberArgument";

export class QuadraticAArgument extends NumberArgument {
    constructor () {
        super('a', true, 0, '1', 'RationalNumber');
    }
}

export class QuadraticBArgument extends NumberArgument {
    constructor () {
        super('b', true, 1, '4', 'RationalNumber');
    }
}

export class QuadraticCArgument extends NumberArgument {
    constructor () {
        super('c', true, 2, '5', 'RationalNumber');
    }
}