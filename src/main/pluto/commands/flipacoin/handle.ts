import c from "../../pluto";
import * as rn from 'random-number'

export default async function CoinFlipHandle (i) {
    let options = i.data.options
    let random = Math.random() > 0.5 ? 'Heads!' : 'Tails!'

    // @ts-ignore
    c.api.interactions(i.id, i.token).callback.post({
        data: {
            type: 4,
            data: {
                content: random
            }
        }
    })
}