let supportHandler: any = {};

supportHandler.support = (msg: any, client: any, opt?: any) => {
  msg.channel.send('Join OPSS for support.\nhttps://bit.ly/join-pluto-support');
}
supportHandler.docs = (msg: any, client: any, opt?: any) => {
  msg.channel.send('Documentation for Pluto can be found on its GitHub!\nhttps://github.com/secnyt/pluto-bot/tree/master/Documentation');
}
supportHandler.discordjs = (msg: any, client: any, opt?: any) => {
  msg.channel.send(`DiscordJS, the basis of Pluto.\nhttps://discord.js.org\nPluto would not be possible without DiscordJS.`)
}

module.exports = supportHandler;