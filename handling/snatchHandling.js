const stuff = require('../pluto.js');
const package = require('../package.json');

var snh = {}

snh.handleSnatch1 = function(msg, tbs, parameters, client){
    console.log(tbs);
    // returns "soh"
    switch(tbs){ 
        case "soh":
            // Japanese
            if(parameters.includes('.j')){
                // DM
                if(parameters.includes('.D')){
                    // DM user
                    client.users.cache.get(msg.author.id).send('我々の頭を揺らす');
                }
                else {
                    msg.channel.send('我々の頭を揺らす');
                }
            }
            // delete
            if(parameters.includes('.d')){
               msg.delete();
            }
            break;

        case "smh":

            // coming soon
            stuff.er.CS(msg);
            break;

        case "secnytplaylist":

            // DM
            if(parameters.includes('.D')){
               // DM user
               client.users.cache.get(msg.author.id).send('r!play https://www.youtube.com/playlist?list=PLShq-al0vKZ2-Oi2RfRNVltc8dPt4xLcI');
            }
            else {
                msg.channel.send('https://www.youtube.com/playlist?list=PLShq-al0vKZ2-Oi2RfRNVltc8dPt4xLcI');
            }
            // delete
            if(parameters.includes('.d')){
               msg.delete();
            }
            break;

        default:
            msg.channel.send('No comprendo.')
            break;
    }
}


snh.handle = function(msg, client){
    let command = msg.content.split('/')[1];
    let parameters = command.split(" ");
    let c = parameters.splice(0, 1)[0];
    switch(c){
        case "s":
            var toBreak = false;
            // separate first parameter (to be snatched)
            let snatch = parameters.splice(0, 1)[0];
            let create = false;
            // organize and setup parameters
            
            // remove irrelevant flags
            parameters.forEach((p, i) => {
                if(!p.startsWith('.') || (!p === "create" && !i == 0)){
                    parameters.splice(i, 1);
                }
            });
            if(snatch == "create"){
                create = true;
            }
            if(create == false){
                // japanese, spanish
                var nec = [".j", ".s"];
                // delete, DM
                var opt = [".d", ".D"];
                
                // amounts of necessary and optional parameters
                var amount = [0, 0];
                // counts each type
                
                parameters.forEach(p => {
                    if(nec.includes(p)){
                        amount[0] += 1;
                        if(amount[0] > 1){
                            stuff.er.TMP(msg);
                            toBreak = true;
                        }
                    }
                    if(opt.includes(p)){
                        amount[1] += 1;
                    }
                });
                if(toBreak){
                    break;
                }
                if(amount[0] < 1){
                    stuff.er.NP(msg);
                    break;
                }
                snh.handleSnatch1(msg, snatch, parameters, client);

                break;
            }
            else if(create == true){
                msg.channel.send('I work, great.');
            }
    }
}

module.exports = snh;