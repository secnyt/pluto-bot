# Command
> */src/main/pluto/api/command/Command.ts*

A `Command` is the main thing that the user uses to interact with a bot -- they are pretty important!

## Property Overview

The `Command` class has a few essential properties:

  `Command.handle` is the function which is eventually called when a command is called by a user. Type: `(msg) => PlutoError<boolean>`\
  `Command.name` is the main name of the command; it comes after the prefix when used by a user. Type: `string`\
  `Command.alias` is a list of alternate names for the command. These can also be used by a user. Type: `string[]`\
  `Command.permissions` is a list of permissions required of the user to run the command. Type: `Permission[]`\
  `Command.desc` is a description of a command which is shown in the help menu for the command. Type: `string`\
  `Command.color` is the color of the command's help page menu. Type: `string`\
  `Command.genre` is the folder/grouping which the command is classified as in the help menu. Type: `Genre`\
  `Command.arguments` is a list of arguments which the user can pass into a command. Type: `Argument[]`
  
We also have some useful base methods:

  `Command.getUse` returns a string which explains how the user uses the command. Type: `() => string`\
  `Command.getEx` returns a generated example of the usage of the command. Type: `() => string`\
  `Command.checkArgumentValidity` validates a list of arguments. Type: `(string[]) => PlutoError<boolean>`

​
​

## `Command.handle`

This is a function specific to every command. It is the main processing of the command and handles logic, replying, and other functions necessary to the function of the command.

The `handle` function is a function of type `(msg) => PlutoError<boolean>`, where `msg` is a Discord.js `message` object and `PlutoError<boolean>` is the returned state of the function (boolean subtype signifies whether or not the handling of the command has produced an error or failed).

The `handle` function is called after the arguments passed into the command are validated, meaning the input is clean and regular as far as the command's arguments are concerned.

*TODO: Pass `PassedArgument[]` and Discord.js `user` object into `handle` instead of Discord.js `message` object.*

​

## `Command.name`

This is a `string` which represents the command in the `CommandRegistry`, help menu, and is the main way that a user calls the command.

`CommandRegistry.get(Command.name)` returns the Command if it is registered.

​

## `Command.alias`

This is a list of type `string[]`. Every entry is an alternative way to interact with the command in the `CommandRegistry` or by the user when calling the command.

​

## `Command.permissions`
*non functional*

This is a list of type `Permission[]` which includes `Permission`s that a user calling the command must have.

*TODO: this*

​

## `Command.desc`

This is a `string` which provides a brief description of the function of the command to be displayed in the help menu.

​

## `Command.color`

This is a `string` with a hex color (e.g. `#db4848`). This color represents the command when possible (e.g. help page).

​

## `Command.genre`

This is a `Genre`. `Genre`s organize commands into groups of similar function or use.

The main help menu is organized into a list of `Genre`s, and commands appear within a genre according to this field.

​

## `Command.arguments`

This is a list of type `Argument[]`. Entries in the array are arguments which can/need to be supplied for correct function of a command.

`Command.arguments` is used to validate a message when a command is called and to provide examples and usage information for the help menu.

​
​

## `Command.getUse`

This is a method of type `() => string` which constructs and returns an explanation for the syntax and use of the command from its `Command.arguments`.

ex. `=randomint <min: number> <max: number>`

​

## `Command.getEx`

This is a method of type `() => string` which constructs and returns an example for the syntax and use of the command from its `Command.arguments`.

ex. `=randomint 19 2`

​

## `Command.checkArgumentValidity`

This is a method of type `(string[]) => PlutoError<boolean>`, where `string[]` is an array of passed arguments and `PlutoError<boolean>` is the returned state of the function (boolean subtype signifies whether or not the handling of the command has produced an error or failed).

- *Note: This method is used automatically within the command API and most likely is not needed for most development purposes.*\
- *TODO: Pass `PassedArgument[]` instead.*


