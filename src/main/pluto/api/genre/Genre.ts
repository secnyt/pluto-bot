export default class Genre {
    name: string
    desc: string
    color: string

    constructor (name: string, desc: string, color?: string) {
        this.name = name
        this.desc = desc
        this.color = color || '#4413d6'
    }
}

enum Genres {
    Pluto = 'pluto',
    Server = 'server',
    Fun = 'fun',
    Math = 'math',
    Music = 'music'
}
