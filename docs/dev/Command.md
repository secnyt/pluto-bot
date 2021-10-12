# Command
> */src/main/pluto/api/command/Command.ts*

A `Command` is the main thing that the user interacts with on a bot -- pretty important!

The `Command` class has a few essential properties:

  `Command.handle` is the function which is eventually called when a command is called by a user. Type: `Function`\
  `Command.name` is the main name of the command; it comes after the prefix when used by a user. Type: `string`\
  `Command.alias` is a list of alternate names for the command. These can also be used by a user. Type: `string[]`\
  `Command.permissions` is a list of permissions required of the user to run the command. Type: `Permission[]`\
  `Command.desc` is a description of a command which is shown in the help menu for the command. Type: `string`\
  `Command.color` is the color of the command's help page menu. Type: `string`\
  `Command.genre` is the folder/grouping which the command is classified as in the help menu. Type: `Genre`\
  `Command.arguments` is a list of arguments which the user can pass into a command. Type: `Argument[]`\
  
[In Progress]

