const fs = require('fs');
var suggestions = require('./../../storage/suggestions/suggestions.json');

var sgs = {};

fs.readFileSync('./storage/suggestions/suggestions.json', {}, (err, data) => {
    if(err) throw err;
    else {
        sgs = data;
    }
});

//console.log(sgs);

var write = function(data){
    fs.writeFileSync('./storage/suggestions/suggestions.json', JSON.stringify(data));
}

var sgh = {};

sgh.handle = function(msg, client){
    // =suggest <content>
    var suggestion = msg.content.split('=suggest ')[1];
    var gid = msg.guild.id;
    if(!sgs[gid]){
        sgs[gid] = [];
    }
    sgs[gid].push(suggestion);
    write(sgs);
}


module.exports = sgh;