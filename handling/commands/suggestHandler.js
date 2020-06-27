const fs = require('fs');
var suggestions = require('./../../storage/suggestions/suggestions.json');

var sgs = {};

sgs = JSON.parse(fs.readFileSync('./storage/suggestions/suggestions.json'));

//console.log(sgs);

var write = function(data){
    fs.writeFileSync('./storage/suggestions/suggestions.json', JSON.stringify(data, null, 4));
}

var sgh = {};

class Suggestion{
    constructor(content, g, u){
        this.content = content;
        this.g = g;
        this.user = u;
    }
}

sgh.handle = function(msg, client){
    sgs = JSON.parse(fs.readFileSync('./storage/suggestions/suggestions.json'));
    var gid = msg.guild.id;
    var uid = msg.author.id;
    // =suggest <content>
    var suggestion = '';
    for(var i = 1; i < msg.content.split(' ').length; i++){
        suggestion += (msg.content.split(' ')[i] + ' ');
    }
    if(suggestion.length > 80){
        msg.channel.send('Please keep your suggestion brief and keep it under 80 characters! Thank you for not crashing me or my creator\'s hardware :D.');
        return;
    }
    suggestion = new Suggestion(suggestion, gid, uid)

    if(!sgs[gid]){
        sgs[gid] = [];
    }
    sgs[gid].push(suggestion);
    msg.channel.send(`Your suggestion, \`${suggestion.content}\`, has been processed and uploaded.`)
    write(sgs);
}


module.exports = sgh;