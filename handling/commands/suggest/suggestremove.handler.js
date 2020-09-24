var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let suggestRemoveHandler = {};
suggestRemoveHandler.handle = (msg, client) => {
    if (msg.member.hasPermission('MANAGE_GUILD')) {
        MongoClient.connect(url, async (err, db) => {
            if (err) {
                throw err;
            }
            let dbo = db.db('pluto-suggestions');
            let deletionMessage = '';
            let suggestions = [];
            await dbo.collection(msg.guild.id).find({}).toArray().then((res) => {
                suggestions = res;
            }).catch((err) => {
                throw err;
            });
            let deleteSuggestions = [];
            msg.content
                .split(' ')
                .filter(n => Number(n) == n)
                .map(n => parseInt(n, 10) - 1)
                .sort((a, b) => b - a)
                .forEach((num) => {
                if (suggestions[num]) {
                    deleteSuggestions.push(suggestions[num]._id);
                    deletionMessage += `Deleted suggestion ${num + 1}.\n`;
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
};
module.exports = suggestRemoveHandler;
