import EmbedInterface from "../../../../embeds/EmbedInterface";
import Command from "../../../../api/command/Command";

export default class CommandHelpPageInterface extends EmbedInterface {
    constructor (cmd: Command) {
        super()
        this.setTitle(cmd.name)
        this.setDescription(`\`${cmd.name}\` help page`)
        this.setColor(cmd.color)
    }
}