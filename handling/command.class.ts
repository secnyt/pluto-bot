class Command {

    constructor(
        // constructor arguments
        private main: string, 
        private aliases: Array<string>, 
        private description: string, 
        private inDepth: string,
        private use: string, 
        private arg: Array<any>, 
        private flag: Array<object>, 
        private perm: Array<string>, 
        private func: Function,
        private sect: string
    ){}

    // getter functions
    get name() { return this.main };
    get alias() { return this.aliases };
    get desc() { return this.description };
    get depth() { return this.inDepth };
    get usage() { return this.use };
    get args() { return this.arg };
    get flags() { return this.flag };
    get perms() { return this.perm };
    get sector() { return this.sect };

    handle(msg: any, client: any, opt?: Array<any>) { this.func(msg, client, opt); };
    
    formattedArguments() {
        let formattedArgs: string = '';
        for(let i in this.arg){
            let argument = this.arg[i];
            formattedArgs += (argument.name + '\n'); // adds name of argument and moves down a line
        }
        formattedArgs = formattedArgs.trim(); // removes ultimate linebreak (unnecessary)

        return formattedArgs;
    }

    createHelp(argument?: string){
        let helpPage: any;
        let defaultPage: object = { // the default help page if specifications lead nowhere
            color: 0x32a891,
            title: this.main + 'help',
            author: {
                name: 'Secnyt',
                icon_url: 'https://cdn.discordapp.com/avatars/539505577286434816/bd289c17a1dff59e88df42b73bde2c22.webp',
                url: 'https://bit.ly/secnyt-github'
            },
            description: `Help page for ${this.main} command.`,
            thumbnail: {
                url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128'
            },
            timestamp: new Date(),
            footer: {
                text: 'Pluto Help Page',
                icon_url: 'https://cdn.discordapp.com/avatars/697569067241832652/15233f2bf99ff02ac4598ec37fc0dea0.webp?size=128'
            }, 

            fields: [
                {
                    name: `=${this.aliases[0]}`,
                    value: this.description
                },
                {
                    name:  `arguments`,
                    value: this.formattedArguments()
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: `Want more depth?`,
                    value: `You can get explanations of each argument by running \`=help ${this.aliases[0]} <argument>\`.`
                }
            ]
        }
        if(argument){ // Argument is optional. If not given, create a normal help page.
            let parameter: object = this.arg.find(par => par.name == argument);
            if(typeof parameter != "undefined"){
                // create argument help page

            } else {
                helpPage = defaultPage;
                helpPage.fields.unshift({ name: "\u200b", value: `We couldn't find argument \`${argument}\`.` });
            }
        }
    }

}

module.exports = Command;