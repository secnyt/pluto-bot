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

import MessageHandler from "../../../handlers/MessageHandler";
import PlutoError from "../../../api/error/PlutoError";
import * as Complex from "complex.js"

export default async function PythagoreanTheoremHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formatMessage(msg.content)
    const [a, b] = MessageHandler.afterCommand(content).split(' ').map(a => parseFloat(a))

    let hypotenuse = Complex(a * a + b * b).sqrt()
    let calculated = `${hypotenuse.toString()}`

    msg.channel.send(calculated).catch(err => {
        return new PlutoError(true, err)
    })

    return new PlutoError(false)
}