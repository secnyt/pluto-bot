# Snatch Documentation

The `snatch` commands is a quick and easy way to get copypastas. 

Usage: `=snatch <action>; [name of snatch]; [flags or the snatch content]; [flags]`

Each server has its own snatches, each with their own keywords.

(<> signifies mandatory parameters, [] signifies optional parameters.)

Create a snatch with
`=snatch create; <name of snatch>; <content>; [flags]`

Get a snatch with
`=snatch get; <name of snatch>; [flags]`

## Flags

### Flags on Snatching

Snatching flags include:

#### Delete

>  `.d`

Delete the command request.

Usage:
> `=snatch get; hello; .d`

*Deletes the snatch request message*

#### DM

> `.D`

DM the value to the user.

Usage:
> `=snatch get; hello; .D`

*DMs to user*

### Flags on Creation of Snatches

Creating flags include:

#### Owner Only

> `.w`

Makes the created flag only usable by the owner of the server. (only useable by the owner of the server)

Usage:
> `=snatch create; hi; Hi, how are you?; .w`

#### Administrator Only

> `.a`

Makes the created flag only usable by those with admin permissions. (only useable by administrators)

Usage:
> `=snatch create; hi; Hi, how are you?; .a`

#### Override If Present

> `.o`

Overrides a snatch with the same name (if a snatch has the same name).

Usage:
> `=snatch create; hi; Hi, how are you?; .o`

#### Cancel If Present

> `.c`

Cancels creation of snatch (if a snatch has the same name).

Usage:
> `=snatch create; hi; Hi, how are you?; .c`

## Permissions

Snatches can be created and used by anyone (unless the `.a` or `.w` flag is used on creation).
