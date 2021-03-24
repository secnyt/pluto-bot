import c from "../../pluto";

export default async function EchoHandle (i) {
    // @ts-ignore
    c.api.interactions(i.id, i.token).callback.post({
        data: {
            type: 4,
            data: {
                content: i.data.options[0].value
            }
        }
    })
}