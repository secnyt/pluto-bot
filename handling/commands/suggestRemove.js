const fs = require('fs');

var sgr = {};

var write = function(data){
    fs.writeFileSync('./storage/suggestions/suggestions.json', JSON.stringify(data, null, 4));
}

sgr.remove = (msg, client) => {
    sgs = JSON.parse(fs.readFileSync('./storage/suggestions/suggestions.json'));
    try{
        sgs[msg.guild.id].splice(msg.content.split(' ')[1] - 1, 1);
        write(sgs);
    }catch(err){
        console.error(error);
    }
}

module.exports = sgr;
