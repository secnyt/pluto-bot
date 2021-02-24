import HelpPage from '../page'
import MessageHandler from "../../../MessageHandler";
import HelpCommandField from "../HelpCommandField";
import FieldEmbed from "../../../../embeds/FieldEmbed";
import HelpFrontPageInterface from "./interface";

export default class FrontPage extends HelpPage {
    static getCommandFields () {
        const commands = MessageHandler.commands
        return commands.map(cmd => HelpCommandField.createCommandField(cmd).getField())
    }
    static getFrontHelpPageEmbed () {
        return new FieldEmbed(HelpFrontPageInterface, FrontPage.getCommandFields())
    }
}