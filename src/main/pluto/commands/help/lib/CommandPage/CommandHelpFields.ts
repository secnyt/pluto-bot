import CommandHelpField from "./CommandHelpField";
import Command from "../../../../api/command/Command";

export class DescriptionCommandHelpField extends CommandHelpField {
    constructor (cmd: Command) {
        super('Description', cmd.desc);
    }
}

export class UsageCommandHelpField extends CommandHelpField {
    constructor (cmd: Command) {
        super('Usage', cmd.getUse());
    }
}

export class ExampleCommandHelpField extends CommandHelpField {
    constructor (cmd: Command) {
        super('Ex.', cmd.getEx());
    }
}