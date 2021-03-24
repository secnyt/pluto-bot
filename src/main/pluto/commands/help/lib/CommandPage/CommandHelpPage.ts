import CommandHelpPageInterface from "./interface";
import FieldEmbed from "../../../../embeds/FieldEmbed";
import {DescriptionCommandHelpField, ExampleCommandHelpField, UsageCommandHelpField} from "./CommandHelpFields";

export default class CommandHelpPage extends FieldEmbed {
    static getCommandFields (cmd) {
        const fields = []
        fields.push(new DescriptionCommandHelpField(cmd).getField())
        fields.push(new UsageCommandHelpField(cmd).getField())
        fields.push(new ExampleCommandHelpField(cmd).getField())
        return fields
    }

    static getEmbed (cmd) {
        return new CommandHelpPage(new CommandHelpPageInterface(cmd), CommandHelpPage.getCommandFields(cmd))
    }
}