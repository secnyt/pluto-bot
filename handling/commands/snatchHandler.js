//const stuff = require('./../../pluto.js');
const package = require('./../../package.json');
const fs = require('fs');

var allSnatches = JSON.parse(fs.readFileSync('./storage/snatches/snatches.json'));

var snh = {};

class Snatch {
    constructor(k, v, p){
        this.key = k;
        this.val = v;
        this.perms = p;
    }
}

var write = function(data){
    fs.writeFileSync('./storage/snatches/snatches.json', JSON.stringify(data, null, 4));
};

snh.handleSnatch1 = function(msg, tbs, parameters, client, data){
    //console.log(tbs);
    // returns "soh"
    switch(tbs){ 
        case "soh":
            if(data.hasTMNec){
                //stuff.er.TMP(msg);
                break;
            }
            if(!data.hasNec){
                //stuff.er.NP(msg);
                break;
            }
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
            //stuff.er.CS(msg);
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
        
        case "icon":

            // DM
            if(parameters.includes('.D')){
                // DM user
                client.users.cache.get(msg.author.id).send(client.users.cache.get(msg.author.id).avatarURL());
            }
            else {
                //console.log(msg);
                try{
                    msg.channel.send(client.users.cache.get(msg.author.id).avatarURL());
                }catch(err){
                    throw err;
                }
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
    allSnatches = JSON.parse(fs.readFileSync('./storage/snatches/snatches.json'));
    console.log(allSnatches);
    var gid = msg.guild.id;
    var gsn = allSnatches[gid];
    console.log(gsn);
    let command = msg.content.split('/')[1];
    let parameters = command.split(" ");
    let c = parameters.splice(0, 1)[0];
    switch(c){
        case "s":
            //var toBreak = false;

            // basically useless, though may be useful later 
            var errs = {
                hasTMNec: false,
                hasNec: true
            };

            // separate first parameter (to be snatched)
            let snatch = parameters.splice(0, 1)[0];

            // is the user trying to create a Snatch (default no)
            let create = false;
            // organize and setup parameters
            
            // remove irrelevant flags
            /*
            parameters.forEach((p, i) => {
                if(!p.startsWith('.') || (!p === "create" && !i == 0)){
                    parameters.splice(i, 1);
                }
            });
            */
            if(snatch == "create"){
                create = true;
            }
            // ADD IN PERMISSION CHECKER (must have admin or higher) PLUS CAPTCHA SYSTEM
            if(create == false){
                if(!gsn){
                    gsn = {};
                    allSnatches[gid] = gsn;
                    write(allSnatches);
                }
                console.log(Object.keys(gsn));
                console.log(snatch);
                if(Object.keys(gsn).includes(snatch)){
                    console.log('yay');
                    msg.channel.send(gsn[snatch].value);
                }
            }
            else if(create == true){

                let key;
                let value = '';

                //console.log(parameters);
                key = parameters[0];
                //console.log(key);
                let d = false;

                let flags = [];

                for(var i of parameters){
                    console.log('I');
                    let newi = i + 1;
                    var w = parameters[i];
                    var wArray;
                    if(i < parameters.length){
                        console.log('work');
                        wArray = w.split('');
                        if(!d){
                            console.log(d);
                            if(!wArray[wArray.length - 1] == ":"){
                                console.log('!:');
                                value += w;
                            }
                            else if(wArray[wArray.length - 1] == ":"){
                                console.log(':');
                                d = true;
                                wArray.splice((wArray.length - 1), 1);
                                var newW = ''
                                wArray.forEach(word => {
                                    newW += (word + ' ');
                                })
                                value += newW;
                            }
                        }
                        else {
                            flags.push(w);
                        }
                    }
                }

                var perms = [];
                var onDup = 'a';

                flags.forEach((f, i) => {
                    if(f == '.w'){
                        perms.push('w');
                        flags.splice(i, 1)
                    }
                    else if(f == '.a'){
                        perms.push('w');
                        flags.splice(i, 1)
                    }
                    else if(f == '.o'){
                        onDup = 'o';
                        flags.splice(i, 1)
                    }
                    else if(f == '.c'){
                        onDup = 'c';
                        flags.splice(i, 1)
                    }
                });
                
                var newSnatch = new Snatch(key, value, perms);

                if(!gsn){
                    gsn = {};
                }

                let toPush = true;

                if(gsn[newSnatch.key]){
                    switch(onDup){
                        case 'a':
                            if(gsn[newSnatch.key]){
                                msg.channel.send('This key is already in use, or it is reserved.\nYou didn\'t specify an option in case of this happening, so by default, the creation is canceled.');
                                toPush = false;
                            }
                            else {
                                msg.channel.send(`The snatch \`${newSnatch.key}\` has been created with value \`${newSnatch.value}\`.`)
                            }
                            break;
                        case 'c':
                            msg.channel.send('This key is in use and the creation has been canceled.');
                            toPush = false;
                        case 'o':
                            msg.channel.send('This key is in use, but has been overwritten.');
                            toPush = true;
                    }
                }

                gsn[newSnatch.key] = newSnatch;
                allSnatches[gid] = gsn;

                write(allSnatches);
            }
    }
}

module.exports = snh;