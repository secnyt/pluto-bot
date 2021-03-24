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

// @ts-ignore
import * as auth from './auth.json'
import * as Discord from 'discord.js'
import registerCommands from './registers/RegisterCommands'

const c = new Discord.Client()

// login
c.login(auth.token)

// ready
c.on('ready', () => {
    setup()
    register()
})

c.ws.on(<WSEventType>'INTERACTION_CREATE', async interaction => {
    await SlashCommandHandler.handle(interaction)
})

const setup = () => {
    console.log(`Logged in as ${c.user.tag}.`)
}

const register = () => {
    registerCommands()
}

export default c
