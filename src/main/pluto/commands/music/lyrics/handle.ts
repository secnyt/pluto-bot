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

import MessageHandler from "../../../handlers/MessageHandler";
import PlutoError from "../../../api/error/PlutoError";
import * as solenolyrics from 'solenolyrics'
import LyricsEmbed from "./lib/LyricsEmbed";

export default async function LyricsHandle (msg: any): Promise<PlutoError> {
    const content = MessageHandler.formattedAfterCommand(msg.content)

    const song = {
        artistName: (await solenolyrics.requestAuthorFor(content)),
        lyrics: (await solenolyrics.requestLyricsFor(content)),
        songImg: (await solenolyrics.requestIconFor(content)),
        trackTitle: (await solenolyrics.requestTitleFor(content)),
    }
    console.log(song.lyrics.toString())

    let songParagraphs = song.lyrics.toString().split('\n\n').map(p => {
        if (p.length < 2000) { // if the paragraph fits on the embed without cutting
            console.log(p)
            return p
        } else { // if needs to be cut up
            const slicedParagraphs = []
            let sliceIndex = 0 // paragraph which lines are currently being distributed to

            p.split('\n').reduce((a, b) => { // reducing the array to be able to distribute lines amongst paragraphs

                if (parseInt(a) + b.length < 2000) { // if the char limit has not been filled for the paragraph
                    if (slicedParagraphs[sliceIndex]) slicedParagraphs[sliceIndex] += '\n' + b
                    else slicedParagraphs[sliceIndex] = b

                    return '' + (parseInt(a) + b.length) // add length to a
                }
                else {
                    sliceIndex += 1 // distribute lines to next paragraph
                    slicedParagraphs[sliceIndex] = b
                    return '' + b.length
                }

            })
            return slicedParagraphs
        }
    }).flat(2)

    song.lyrics = songParagraphs

    msg.channel.send({ embed: new LyricsEmbed(song, 0) })

    return new PlutoError(false)
}