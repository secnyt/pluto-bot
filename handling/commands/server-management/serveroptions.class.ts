class ServerOptions {

    constructor (
        // constructor arguments
        private welcomeMsg: any,
        private guildhelp: any,
    ){}

    get welcome () { return this.welcome; }
    get customhelp () {
        let helpPage: any = {
            color: 0x611af0,
            title: this.guildhelp.title,
            description: this.guildhelp.description,
            thumbnail: {
                url: this.guildhelp.thumnail,
            },
            timestamp: new Date(),
            footer: {
                text: 'Custom Pluto Help Page',
                icon_url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128',
            },
            fields: this.guildhelp.getFields(),
        };

        return helpPage;
    }
}

module.exports = ServerOptions;