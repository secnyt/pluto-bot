import CommandRegistry from "../registries/CommandRegistry";

export default class SlashCommandHandler {
    static async handle (interaction) {
        console.log(interaction)
        const debug = t => {
            console.log(t)
            return t
        }
        CommandRegistry.registry.find(c => c.name == interaction.data.name).handle(interaction)
    }
}
