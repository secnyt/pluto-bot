# Welcome #

The `welcome` server settings configure this server's settings on member join.

Usage: `=server welcome <setting> [value]`

(<> signifies mandatory parameters, [] signifies optional parameters.)

Toggle Pluto Welcome Messages
`=server welcome toggle`

Change Other Settings
`=server welcome <setting> <value>`

Note: Server settings can only be changed by those with the `Manage Server` permission!

## Settings ##

Settings include

###  message

The message when a user joins the server.

#### Placeholders

> \<user\>
The user's display name.
> \<guildnick\>
The server's display name.
> \<guildacronym\>
A shortened acronym of the server's name.

#### Usage

Get current:
> `=server welcome message`

Set:
> `=server welcome message <message>`

# #

### channel

The channel in which the welcome message is sent.
(This is by default set to nothing, so if your messages aren't showing up, try setting it!)

#### Usage

Get current:
> `=server welcome channel`

Set:
> `=server welcome channel #<channel>`
(Make sure you mention the channel!)

# #

### toggle

Toggles whether or not Pluto handles welcome messages.

Usage:
> `=server welcome toggle`
