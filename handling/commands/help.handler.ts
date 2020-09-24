let helpHandler: any = {};

helpHandler.handle = (msg: any, client: any) => {

    let content = msg.content.trim();
    let commandless = content.substr(content.indexOf(' ') + 1).trim();
    let parameters = commandless.split(' ');

    let commands = require('./../commandRegistry');
    let command = commands.find(c => c.alias.includes(parameters[0]));

    let helpPage: any;
    let types = [...new Set(commands.map(c => c.sector))];
    let names = commands.map(c => [c.sector, c.alias]);
    let getFields = () => {
        let fields: any = {};
        types.forEach((v: any, i: number) => {
            fields[v] = { name: v, value: ''};
        })
        names.forEach((v: any, i: number) => {
            let name = v[0];
            let value = v[1][0];
            let field = fields[name];
            if(!field.value){
                field.value += value;
            } else {
                field.value += (`, ` + value);
            }
            fields[name] = field;
        })

        return Object.keys(fields).map((key) => fields[key]);
    };

    helpPage = {
        color: 0xa83246,
        title: 'Pluto Help',
        author: {
            name: 'Secnyt',
            icon_url: 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp',
            url: 'https://bit.ly/secnyt-github'
        },
        description: `Pluto Help Page`,
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128'
        },
        timestamp: new Date(),
        footer: {
            text: 'Pluto Help Page',
            icon_url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128'
        }, 
        fields: getFields()
    }

    if(typeof command != 'undefined'){ // if specified a command + the command exists (if doesn't = undefined)
        helpPage = command.createHelp(parameters[1]);
    }

    msg.channel.send({ embed: helpPage });

}

module.exports = helpHandler;