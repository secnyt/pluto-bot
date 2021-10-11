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

import Registry from "../api/misc/Registry";
import Command from "../api/command/Command";

export default class CommandRegistry extends Registry {
    static shouldRegister (toRegister: Command): boolean {
        if (this.registry.some(cmd => cmd.name == toRegister.name)) {
            throw 'Cannot register multiple commands under the same name!'
        }
        return true
    }
}