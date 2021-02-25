import MessageHandler from "../../../MessageHandler";
import HelpCommandField from "./HelpCommandField";
import FieldEmbed from "../../../../embeds/FieldEmbed";
import HelpFrontPageInterface from "./interface";

export default class FrontPage extends FieldEmbed {
    static getCommandFields () {
        const commands = MessageHandler.commands
        return commands.map(cmd => HelpCommandField.createCommandField(cmd).getField())
    }
    static getEmbed () {
        return new FieldEmbed(HelpFrontPageInterface, FrontPage.getCommandFields())
    }
}