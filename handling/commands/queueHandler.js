const suggestions = require('./../../storage/suggestions/suggestions.json');

var qh = {};

var sgs = {};

fs.readFileSync('./storage/suggestions/suggestions.json', {}, (err, data) => {
    if(err) throw err;
    else {
        sgs = data;
    }
});

qh.handle = function(msg, client){
    var servSgs = sgs[msg.guild.id];
    var message = "";
    servSgs.forEach(s => {

    });
};

