# Snatch #

The `snatch` commands is a quick and easy way to get copypastas. 

Each server has its own snatches, each with their own keywords.

(<> signify mandatory parameters, [] signify optional parameters.)

Create a snatch with
`/s create <keyword> <value>: [flags]`

Get a snatch with
`/s <keyword> [flags]`

## Flags ##

### Flags on Snatching

Snatching flags include

>  `.d`

Delete the command request.

Usage:
> `/s hello .d`

*Deletes previous message*

Example output:
> `Hi, how are you?`

# #

> `.D`

DM the value to the user.

Usage:
> `/s hello .D`

*DMs to user*

Example output:
> `Hi, how are you?`

### Flags on Creation of Snatches

Creating flags include

> `.a`

Makes the created flag only usable by those with admin permissions. (only useable by administrators)

Usage:
> `/s create hi Hi, how are you?: .a`

Expected output:
> `Created snatch "hi" with value "Hi, how are you?" for Administrators.`

# #

> `.o`

Overrides a snatch with the same name (if a snatch has the same name).

Usage:
> `/s create hi Hi, how are you?: .o`

Expected output:
> `Overwrote snatch "hi" with value "Hi, how are you?".`

# #

> `.c`

Cancels creation of snatch (if a snatch has the same name).

Usage:
> `/s create hi Hi, how are you?: .c`

Expected output:
> Snatch "hi" was not created since a snatch with name "hi" already exists.

# #

> `.w`

Makes the created flag only usable by the owner of the server. (only useable by the owner of the server)

Usage:
> `/s create hi Hi, how are you?: .w`

Expected output:
> `Created snatch "hi" with value "Hi, how are you?" for Administrators.`



## Permissions ##

Snatches can only be created by those with admin permissions. 

They can be used by anyone (unless the `.a` or `.w` flag is used on creation).