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


class CommandHandler { // handler class
  constructor(options: any) {
    this.commands = {}
    this.register = (id: string, path: string) => { // registers a command
      commands[id] = require(`./reworked-handling/commands/${path}`) // import the command
    }

    this.handle = (msg: any) => {
      let content: string = msg.content.trim() + ' ' // gets trimmed message content
      let command: string = content.substring(1, content.indexOf(' ')) // get the command (just after prefix)

      let cmd: any = this.commands.find(c => c.alias.includes(command)) // search in the commands list for a command with the given alias

      if (typeof cmd == 'undefined') return // if the command doesnt exist, just ignore the message
      if (cmd.perms.map(p => p.permission)) { // checks if there are permissions needed to run the command
        if (!msg.member.hasPermission(command.perms.map(p => p.permission)))  { // if person does not have perms, dont run command
          msg.channel.send(`You do not have one or more of the following permissions:\n${cmd.formattedPerms()}`)
          return // dont run the command
        }
      }
      cmd.handle(msg) // if the permission check didnt fail, or the command doesnt have perms, run the command
    }
  }
}
