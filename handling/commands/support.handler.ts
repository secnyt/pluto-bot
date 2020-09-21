let supportHandler: any = {};

supportHandler.support = (msg: any, client: any, opt?: any) => {
  msg.channel.send('Join OPSS for support.\nhttps://bit.ly/join-pluto-support');
}
supportHandler.docs = (msg: any, client: any, opt?: any) => {
  msg.channel.send('Documentation for Pluto can be found on its GitHub!\nhttps://github.com/secnyt/pluto-bot/tree/master/Documentation');
}

module.exports = supportHandler;