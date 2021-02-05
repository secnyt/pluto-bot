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

// JSONs
var { token } = require('./auth.json');
var { prefix } = require('./package.json');

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(token);

client.on('ready', () => {
    setup();
});

// on message
client.on('message', msg => {
    if(msg.channel.type == 'text' && !msg.author.bot){ // make sure message is eligible to be read
        if(msg.content.startsWith(prefix)){
            require('./reworked-handling/CommandHandler').handle(msg);
        }
    }
});

function setup(){
    console.log(`Logged in as ${client.user.tag}.`);
}
