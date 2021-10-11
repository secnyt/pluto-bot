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

import CommandInterface from '../../../api/command/CommandInterface'
import Genre from '../../../api/genre/Genre'
import GenreRegistry from "../../../registries/GenreRegistry";

const SimplifyInterface = new CommandInterface()

SimplifyInterface
    .setName('simplify')
    .setAlias(['simple'])
    .setDesc('Simplifies the given expression.')
    .setColor('#48db48')
    .setGenre(GenreRegistry.get('math'))

export default SimplifyInterface