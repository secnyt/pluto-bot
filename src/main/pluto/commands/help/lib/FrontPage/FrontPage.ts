import MessageHandler from "../../../../handlers/MessageHandler";
import HelpCommandField from "./HelpCommandField";
import FieldEmbed from "../../../../embeds/FieldEmbed";
import HelpFrontPageInterface from "./interface";
import CommandRegistry from "../../../../registries/CommandRegistry";

export default class FrontPage extends FieldEmbed {
    static getCommandFields () {
        const commands = CommandRegistry.registry
        return commands.map(cmd => HelpCommandField.createCommandField(cmd).getField())
    }
    static getEmbed () {
        return new FieldEmbed(HelpFrontPageInterface, FrontPage.getCommandFields())
    }
}