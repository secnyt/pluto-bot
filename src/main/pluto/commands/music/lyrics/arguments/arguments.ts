import TrailingArgument from "../../../../api/command/argument/TrailingArgument";

export class SongSearchQueryArgument extends TrailingArgument {
    constructor () {
        super('song_search_query', true, 0, 'Bergamo [by] Pinguini Tattici Nucleari',)
    }
}
