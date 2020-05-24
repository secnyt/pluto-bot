const embeds = require('./../../storage/constants/embeds.js');

var hh = {};

hh.handle = function(msg, client, parameters){
    if(parameters[0] === "snatch"){
        msg.channel.send(embeds.snatch());
    }
    else {
        msg.channel.send(embeds.help());
    }
}

module.exports = hh;