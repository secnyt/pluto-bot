var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let suggestRemoveHandler: any = {};


suggestRemoveHandler.handle = (msg: any, client: any) => {
    if(msg.member.hasPermission('MANAGE_GUILD')){
        MongoClient.connect(url, async (err: any, db: any) => {
            if (err) { throw err; }

            let dbo = db.db('pluto-suggestions');

            let deletionMessage = '';

            let suggestions: any = [];
            await dbo.collection(msg.guild.id).find({}).toArray().then((res: any) => {
                suggestions = res;
            }).catch((err) => {
                throw err;
            })

            let deleteSuggestions: any = [];
            msg.content
                .split(' ')
                .filter(n => Number(n) == n)
                .map(n => parseInt(n, 10) - 1)
                .sort((a, b) => b - a)
                .forEach((num: number) => {
                    if (suggestions[num]) {
                        deleteSuggestions.push(suggestions[num]._id)
                        deletionMessage += `Deleted suggestion ${num + 1}.\n`
                    }
                });
            
            deleteSuggestions
                .filter(s => typeof s != 'undefined')
                .forEach((id) => {
                    dbo.collection(msg.guild.id).deleteMany({ _id: id });
                });
            
            if (deletionMessage) {
                msg.channel.send(deletionMessage);
            }
        });
    }
    else {
        msg.channel.send('You do not have the required permissions to do this!');
    }
}

module.exports = suggestRemoveHandler;
