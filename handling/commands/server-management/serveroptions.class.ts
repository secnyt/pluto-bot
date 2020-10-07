class ServerOptions {

    constructor (
        // constructor arguments
        private welcomeMsg: any,
        private guildhelp: any,
    ){
        
    }

}

let help = (g) => {
    return {
        color: 0x611af0,
        title: g.name,
        description: 'You can change this description with `=server help description <description>`.',
        thumbnail: g.iconURL(),
        fields: [{ name: '\u200b', value: 'This server\'s help page hasn\'t been configured!\nUse `=server help help` for help.\n\u200b'}],
        footer: 'You can change this footer with `=server help footer <footer>` '
    }
}

module.exports.Server = ServerOptions;
module.exports.defaultHelp = help;