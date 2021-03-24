import c from "../../pluto";
import * as rn from 'random-number'

export default async function RandIntHandle (i) {
    let options = i.data.options
    // @ts-ignore
    c.api.interactions(i.id, i.token).callback.post({
        data: {
            type: 4,
            data: {
                content: rn({ min: options[0].value, max: options[1].value, integer: true })
            }
        }
    })
}