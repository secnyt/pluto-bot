# PlutoError
> */src/main/pluto/api/command/Command.ts*

A `PlutoError` is the main form in which errors -- both user-induced and not -- are handled and communicated to the user.

usage -

```ts
import PlutoError from "./PlutoError";

new PlutoError(true)
```

A `PlutoError` object is returned on the lowest level user-called functions (typically `Command.handle` functions).

`PlutoError.err` is a `boolean` which describes the state of the object. A state of `true` signifies an error, whereas a state of `false` signifies that the function was completed successfully.

If `PlutoError.err == true`, `PlutoError.errorMessage` is sent in the channel in which the issue command was sent.

### example of built in `PlutoError` usage:

Let us assume that `=` is the bot's prefix and `abc` is not a defined command.

A user types and sends `=help abc`. The bot sees the message, sees the prefix, and searches the `CommandRegistry` for a command with name `abc` (normal API function).

It does not find a registered `Command` named `abc` and returns the following PlutoError:

```ts
PlutoError {
    "err": true,
    "errorMessage": "```Passed argument \"abc\" is not valid as type searchTerm (at index 0)."
}
```

The bot then sends the `PlutoError.errorMessage`:

```
Passed argument "abc" is not valid as type searchTerm (at index 0).
```

