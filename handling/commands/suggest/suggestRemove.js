const fs = require('fs');

var sgr = {};

var write = function(data){
    fs.writeFileSync('./storage/suggestions/suggestions.json', JSON.stringify(data, null, 4));
}

sgr.remove = (msg, client) => {
    if(msg.member.hasPermission('MANAGE_GUILD')){
        sgs = JSON.parse(fs.readFileSync('./storage/suggestions/suggestions.json'));
        try{
            var num = msg.content.split(' ')[1];
            if(num ){
                sgs[msg.guild.id].splice(num - 1, 1);
                msg.channel.send("Deleted suggestion number " + (num));
                write(sgs);
            } else {
                msg.channel.send('You must specify an index (integer) to delete!');
            }
        }catch(err){
            msg.channel.send(`Could not delete suggestion.`);
            console.error(error);
        }
    }
    else {
        msg.channel.send('You do not have the required permissions to do this!');
    }
}

module.exports = sgr;
