//const stuff = require('./../../pluto.js');
const package = require('./../../../package.json');
const fs = require('fs');
const pon = require('./plutoObjectNotation.js');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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
    try{
        var gid = msg.guild.id; // needed for guild-specific snatches

        let parameters = msg.content.split(";"); // separates command into its specific parts
        
        var command = parameters[0].split(" ")[1]; // the first part of the command needs to be split into two parts (since there are no semicolons between)
        var key = parameters[1]; // the key of the snatch

        var flags = [];
        if(parameters[3]){ // if flags are specified,
            flags = parameters[3].split(' '); // turn them into an array.
        }
        parameters.forEach((v, i) => { // trims all parameters
            parameters[i] = v.trim();
        });
        

        switch(command){ // checks to see which function the user wants to use
            case "create":
            case "add":
                var snatch = pon.compile(parameters[2], "vanilla"); // compiles the PlutoObjectNotation
                if(!parameters[2]){ // if the user didn't specify a snatch parameter
                    msg.channel.send("You are missing the snatch parameter! Make sure you are separating with a semicolon (;)");
                }
                else if(!parameters[2].trim().startsWith("s(\"") || !parameters[2].trim().endsWith("\")")){ // if the user didn't use PlutoObjectNotation<String>
                    msg.channel.send("Your `snatch` parameter must be in PlutoObjectNotation<String> form. ex. `s(\"ABC 123.\")`");
                }
                else if(!snatch){ // if the user had an empty PlutoObjectNotation and/or PlutoObjectNotation included forbidden characters.
                    msg.channel.send("You can't create an empty snatch, or snatches with \"s!");
                } else { // syntax = good

                    MongoClient.connect(url, (err, db) => { // connect to DB
                        if(err) throw err;

                        var dbo = db.db('pluto-snatches'); // connect to snatches DB
                        var ins = { // snatch class
                            key: parameters[1],
                            snatch: snatch,
                            reserved: false,
                            permissions: []
                        };

                        var get = { // query for seeing if a snatch with the same key exists
                            key: parameters[1]
                        }
                        snatchExists = false; // default does not exist
                        dbo.collection(gid).find(get).toArray((err, res) => { // checks for snatches with the same name
                            if(err) console.error(err);
                            snatchExists = res[0]; // sets snatchExists to the first snatch with the same name, if there isn't one, undefined.
                            if(!snatchExists){ // if undefined, return false
                                snatchExists = false;
                            } else { 
                                snatchExists = true;
                            }
                            if(flags.includes('.o') || flags.includes('..overwrite') || flags.includes('..override')){ // is there a flag for overriding?
                                if(snatchExists){ // if there already exists && overwrite
                                    dbo.collection(gid).findOneAndReplace(get, ins, (err, res) => { // find a replace the already existing
                                        if(err) throw err;
                                        msg.channel.send('Your snatch has been processed and updated.')
                                        db.close();
                                    });
                                }
                                else { // doesnt exist && overwrite
                                    dbo.collection(gid).insertOne(ins, (err, res) => { // just insert
                                        if(err) throw err;
                                        msg.channel.send('Your snatch has been processed and updated.')
                                        db.close();
                                    });
                                }
                            } else if(snatchExists){ // no overwrite flag, but exists => no insert
                                msg.channel.send('A snatch with this key exists. Please specify in a flag whether you would like to overwrite.')
                            } else { // no overwrite flag, but doesn't exist => insert
                                dbo.collection(gid).insertOne(ins, (err, res) => {
                                    if(err) throw err;
                                    msg.channel.send('Your snatch has been processed and uploaded.')
                                    db.close();
                                }) 
                            }
                        });
                        
                        if(flags.includes('.d') || flags.includes('..delete')){ // delete message if a delete flag existed
                            msg.delete();
                        }

                    });
                }
                break;
            case "get":
            case "snatch":
            case "use":
                try {
                    if(parameters[2]){ // flags are in the 2nd index since there is one less parameter 
                        flags = parameters[2].split(' '); // separate flags
                    }
                    MongoClient.connect(url, (err, db) => {
                        var dbo = db.db('pluto-snatches');
                        var get = { // query to find snatch
                            key: key
                        };

                        dbo.collection(gid).find(get).toArray((err, res) => { // find query and return array
                            try {
                                res = res[0].snatch; // find first match and get the snatch value
                                if(err){
                                    console.error(err);
                                    msg.channel.send(`This snatch does (most likely) not exist. If you believe this was in error, please join the support server for help. (\`${require('./../../../package.json').prefix}support\`)`);
                                }
                                msg.channel.send(res); // send matching snatch
                                db.close();
                            } catch(err){
                                console.error(err);
                                msg.channel.send(`This snatch does (most likely) not exist. If you believe this was in error, please join the support server for help. (\`${require('./../../../package.json').prefix}support\`)`)
                            }
                        })
                    });
                } catch(err){
                    if(err) {
                        console.error(err);
                        msg.channel.send(`This snatch does (most likely) not exist. If you believe this was in error, please join the support server for help. (\`${require('./../../../package.json').prefix}support\`)`);
                    }
                }
                break;
            default: // didn't specify a working command
                msg.channel.send("I don't understand what you are trying to do!");
                break;
        }
    } catch(err){
        console.error(err);
        msg.channel.send('Something went wrong. Check your syntax for both the command and PlutoObjectNotation.')
    }
}

module.exports = snh;