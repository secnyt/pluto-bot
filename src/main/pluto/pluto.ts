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
import MessageHandler from './handlers/MessageHandler'
import registerCommands from './registers/RegisterCommands'
import {WSEventType} from "discord.js";
import SlashCommandHandler from "./handlers/SlashCommandHandler";
import registerGenres from "./registers/RegisterGenres";

const client = new Discord.Client()

// login
client.login(auth.token)

// ready
client.on('ready', () => {
    setup()
    register()
})

// on message
client.on('message', msg => {
    if(msg.channel.type == 'text' && !msg.author.bot){ // make sure message is eligible to be read
        MessageHandler.handle(msg).catch((err) => {
            console.error(err)
             msg.channel.send(`There was an error: \`\`\`${ err }\`\`\``)
        });
    }
})

client.ws.on(<WSEventType>'INTERACTION_CREATE', async interaction => {
    SlashCommandHandler.handle(interaction)
    // @ts-ignore
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: interaction.data.options[0].value
            }
        }
    })
})

const setup = () => {
    console.log(`Logged in as ${client.user.tag}.`)
}

const register = () => {
    registerCommands()
    registerGenres()
}
