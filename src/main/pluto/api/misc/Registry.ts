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

import Command from "../command/Command";

export default class Registry {
    static registry: any[] = []
    static get (name: string) {
        return this.registry.find(e => e.name == name || (e.alias && e.alias.includes(name)))
    }
    static register (toRegister: any): void {
        if (this.shouldRegister(toRegister)) {
            this.registry.push(toRegister)
        }
    }
    static shouldRegister (toRegister: any): boolean {
        return true
    }
}