import FieldEmbed from "./FieldEmbed";
import EmbedInterface from "./EmbedInterface";

export default class LyricsEmbed extends FieldEmbed {
    artist: string
    song: string
    lyrics: string
    thumbnail: any
    author: any
    url: string

    constructor (song: any, page: number) {

        const options: EmbedInterface = new EmbedInterface()
            .setTitle(song.trackTitle)
            .setDescription(`by ${song.artistName}`)
            .setColor('#48dbdb')
        super(options, [{ name: 'Lyrics:', value: song.lyrics[page] }]);

        this.thumbnail = {
            url: song.songImg
        }
        this.author = {
            name: this.artist,
            icon_url: song.artistImg
        }

    }

}