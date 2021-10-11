import EmbedInterface from "../../../../embeds/EmbedInterface";

const GenreListPageInterface = new EmbedInterface()

GenreListPageInterface
    .setTitle('Help')
    .setDescription('Get help with all things \'Pluto\'.\nRun \`=help [genre]\` for a list of commands under that genre.')
    .setColor('#DB4848')

export default GenreListPageInterface