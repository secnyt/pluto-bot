import MessageHandler from "../../../handlers/MessageHandler";
import PlutoError from "../../../api/error/PlutoError";
import * as solenolyrics from 'solenolyrics'
import LyricsEmbed from "../../../embeds/LyricsEmbed";

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