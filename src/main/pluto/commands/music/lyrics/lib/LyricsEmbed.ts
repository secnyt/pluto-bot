/*  This file is part of Pluto.
 *  Copyright (C) 2021 Secnyt
 *
 *  Pluto is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import FieldEmbed from "../../../../embeds/FieldEmbed";
import EmbedInterface from "../../../../embeds/EmbedInterface";

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