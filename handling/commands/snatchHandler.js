//const stuff = require('./../../pluto.js');
const package = require('./../../package.json');
const fs = require('fs');

var allSnatches = JSON.parse(fs.readFileSync('./storage/snatches/snatches.json'));

var snh = {};

class Snatch {
    constructor(k, v, p, r){
        this.key = k;
        this.val = v;
        this.perms = p;
        this.reserved = false;
    }
}

var write = function(data){
    fs.writeFileSync('./storage/snatches/snatches.json', JSON.stringify(data, null, 4));
};

snh.handle = function(msg, client){
    allSnatches = JSON.parse(fs.readFileSync('./storage/snatches/snatches.json'));
    //console.log(allSnatches);
    var gid = msg.guild.id;
    var gsn = allSnatches[gid];
    //console.log(gsn);
    let parameters = msg.content.split(" ");
    var command = parameters.splice(0, 1)[0].split('/')[1];
    switch(command){
        case "s":

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
                if(Object.keys(gsn).includes(snatch)){
                    //console.log('yay');
                    var value = gsn[snatch].val;
                    if(parameters.includes('.D')){
                        msg.author.send(value);
                    }
                    else{
                        msg.channel.send(value);
                    }
                    if(parameters.includes('.d')){
                        msg.delete();
                    }
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

                parameters.forEach((p, i) => {
                    //console.log('I');
                    let newi = i + 1;
                    var w = parameters[i];
                    var wArray;
                    if(i){
                        //console.log('work');
                        wArray = p.split('');
                        if(!d){
                            //console.log(d);
                            //console.log(wArray[wArray.length - 1])
                            if(wArray[wArray.length - 1] == ":"){
                                //console.log(':');
                                d = true;
                                wArray.splice((wArray.length - 1), 1);
                                var newW = ''
                                wArray.forEach(word => {
                                    newW += (word);
                                })
                                value += (newW + ' ');
                            } else {
                                //console.log('!:');
                                value += (p + ' ');
                            }
                        }
                        else {
                            flags.push(w);
                        }
                    }
                });

                var perms = [];
                var onDup = 'a';
                //console.log(flags);
                flags.forEach((f, i) => {
                    //console.log(f)
                    switch(f){
                        case '.w':
                            perms.push('w');
                            //flags.splice(i, 1)
                            break;
                        case '.a':
                            perms.push('a');
                            //flags.splice(i, 1)
                            break;
                        case '.o':
                            onDup = 'o';
                            //flags.splice(i, 1)
                            break;
                        case '.c':
                            onDup = 'c';
                            //flags.splice(i, 1)
                            break;
                    }
                });
                
                var newSnatch = new Snatch(key, value, perms, false);

                if(!gsn){
                    gsn = {};
                }

                var toPush = true;

                if(gsn[newSnatch.key]){
                    switch(onDup){
                        case 'a':
                            //console.log('abc' + gsn[newSnatch.key])
                            if(gsn[newSnatch.key]){
                                msg.channel.send('This key is already in use, or it is reserved.\nYou didn\'t specify an option in case of this happening, so by default, the creation is canceled.');
                                toPush = false;
                            }
                            else {
                                toPush = true;  
                            }
                            break;
                        case 'c':
                            msg.channel.send('This key is in use and the creation has been canceled.');
                            toPush = false;
                            break;
                        case 'o':
                            if(!gsn[newSnatch.key].reserved){
                                msg.channel.send('This key is in use, but has been overwritten.');
                                toPush = true;
                                break;
                            }
                            else {
                                msg.channel.send('This key is reserved! It cannot be overwritten.');
                                toPush = false;
                            }
                            break;
                    }
                }

                gsn[newSnatch.key] = newSnatch;
                allSnatches[gid] = gsn;
                if(toPush){
                    write(allSnatches);
                    msg.channel.send(`The snatch \`${newSnatch.key}\` has been created with value \`${newSnatch.val}\`.`)
                }
            }
    }
}

module.exports = snh;