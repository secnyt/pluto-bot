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

export default class EmbedField {
    name: string
    content: string
    inline: boolean

    constructor (name, content, inline?) {
        this.name = name
        this.content = content
        this.inline = inline || false
    }

    getName () { return this.name }
    getValue () { return this.content }

    getField () {
        return {
            name: this.getName(),
            value: this.getValue(),
            inline: this.inline,
        }
    }
}