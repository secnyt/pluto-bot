export default class SlashCommandHandler {
    static async handle (interaction: any) {
        console.log(interaction)
        console.log(interaction.data)
        return interaction
    }
}