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
        allSnatches = JSON.parse(fs.readFileSync('./storage/snatches/snatches.json'));
        //console.log(allSnatches);
        var gid = msg.guild.id;
        var gsn = allSnatches[gid];
        //console.log(gsn);
        let parameters = msg.content.split(";");
        
        var command = parameters[0].split(" ")[1];
        var key = parameters[1];
        var flags = [];
        if(parameters[3]){
            flags = parameters[3].split(' ');
            console.log(flags);
        }
        parameters.forEach((v, i) => {
            parameters[i] = v.trim();
        });
        

        switch(command){
            case "create":
            case "add":
                var snatch = pon.compile(parameters[2], "vanilla");
                if(!parameters[2]){
                    msg.channel.send("You are missing the snatch parameter! Make sure you are separating with a semicolon (;)");
                }
                else if(!parameters[2].trim().startsWith("s(\"")){
                    msg.channel.send("Your `snatch` parameter must be in PlutoObjectNotation<String> form. ex. `s(\"ABC 123.\")`");
                }
                else if(!snatch){
                    msg.channel.send("You can't create an empty snatch!");
                } else {
                    var exists = true;
                    MongoClient.connect(url, (err, db) => {
                        if(err) console.error(err);

                        var dbo = db.db('pluto-snatches');
                        var get = {
                            guild: gid
                        }
                        dbo.collection(" guilds").find(get).toArray((err, res) => {
                            if(err) throw err;
                            //console.log(res);
                            if(!res){
                                exists = false;
                            }
                        });
                    });
                    MongoClient.connect(url, (err, db) => {
                        if(err) throw err;

                        var dbo = db.db('pluto-snatches');
                        var ins = {
                            key: parameters[1],
                            snatch: snatch,
                            reserved: false,
                            permissions: []
                        };
                        
                        if(!exists){
                            dbo.createCollection(gid, (err, res) => {
                                if(err) throw err;
                                //console.log('collection created');
                            })
                        }
                        var get = {
                            key: parameters[1]
                        }
                        snatchExists = false;
                        dbo.collection(gid).find(get).toArray((err, res) => {
                            if(err) console.error(err);
                            snatchExists = res[0];
                            console.log(snatchExists);
                            if(!snatchExists){
                                console.log('abc');
                                snatchExists = false;
                            }
                            if(flags.includes('.o') || flags.includes('..overwrite') || flags.includes('..override')){
                                dbo.collection(gid).findOneAndReplace(get, ins, (err, res) => {
                                    if(err) throw err;
                                    //console.log('snatch inserted');
                                    msg.channel.send('Your snatch has been processed and updated.')
                                    db.close();
                                })
                            } else if(snatchExists){
                                msg.channel.send('A snatch with this key exists. Please specify in a flag whether you would like to overwrite. ```/s command; key; PON<string>; **flags**\n```')
                            } else {
                                console.log(snatchExists);
                                dbo.collection(gid).insertOne(ins, (err, res) => {
                                    if(err) throw err;
                                    //console.log('snatch inserted');
                                    msg.channel.send('Your snatch has been processed and uploaded.')
                                    db.close();
                                }) 
                            }
                        });
                        
                        if(flags.includes('.d') || flags.includes('..delete')){
                            msg.delete();
                        }

                    });
                }
                break;
            case "get":
            case "snatch":
            case "use":
                try {
                    var key = parameters[1];

                    MongoClient.connect(url, (err, db) => {
                        var dbo = db.db('pluto-snatches');
                        var get = {
                            key: key
                        };

                        dbo.collection(gid).find(get).toArray((err, res) => {
                            try{
                                console.log(res);
                                console.log(res[0]);
                                res = res[0].snatch;
                                if(err){
                                    console.error(err);
                                    msg.channel.send(`This snatch does (most likely) not exist. If you believe this was in error, please join the support server for help. (\`${require('./../../../package.json').prefix}support\`)`);
                                };
                                msg.channel.send(res);
                                console.log(res);
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
            default:
                msg.channel.send("I don't understand what you are trying to do! Parameter 1, ```/s **command**; key; PON<string>; flags\n```");
                break;
        }
    } catch(err){
        console.error(err);
        msg.channel.send('Something went wrong. Check your syntax for both the command and PlutoObjectNotation.')
    }
}

module.exports = snh;