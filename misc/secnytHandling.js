const fs = require('fs');

var sch = {};

sch.handle = function(msg, client){
    //msg.channel.send('i hear you');
    if(msg.content == 'please clear snatch'){
        var deleteSnatches = function(msg){
            snatch = JSON.parse(fs.readFileSync('./storage/snatches/snatches.json'));
            //msg.channel.send('okay, file read')
            //console.log(snatch)
            Object.keys(snatch).forEach((s, i) => {
                //msg.channel.send('okay, guild found')
                var guild = snatch[Object.keys(snatch)[i]];
                //console.log(guild);
                //msg.channel.send('okay, guild read')
                for(var j = 0; j <= Object.keys(guild).length + 100; j++){
                    //msg.channel.send('okay, snatch read')
                    Snatch = guild[Object.keys(guild)[j]];
                    //msg.channel.send('okay, snatch found')
                    try{
                        if(!Snatch.reserved){
                            //msg.channel.send('okay, deleting snatch')
                            //console.log(snatch[Object.keys(snatch)[i]][Object.keys(snatch[Object.keys(snatch)[i]])[j]]);
                            if(snatch[Object.keys(snatch)[i]][Object.keys(snatch[Object.keys(snatch)[i]])[j]]){
                                delete snatch[Object.keys(snatch)[i]][Object.keys(snatch[Object.keys(snatch)[i]])[j]];
                            }
                            //console.log(snatch[Object.keys(snatch)[i]][Object.keys(snatch[Object.keys(snatch)[i]])[j]]);
                            //msg.channel.send('okay, snatch deleted')
                        }
                        else{
                            //msg.channel.send('okay, snatch reserved')
                        }
                        //msg.channel.send('okay done')
                        fs.writeFileSync('./storage/snatches/snatches.json', JSON.stringify(snatch, null, 4))
                    }
                    catch(err){
                        
                    }
                }
            })
        };
        var d = 0;
        while(d < 20){
            d++;
            deleteSnatches(msg);
        }
        
        msg.channel.send('okay everything deleted')
    }
    if(msg.content.startsWith('color me ')){
        msg.channel.send('i hear color me')
        var hex = msg.content.split('color me ')[1];
        msg.channel.send('your color is ' + hex)
        var secnytRole = client.guilds.cache.get('691793782466674718').roles.cache.get('716457447916830791');
        secnytRole.edit({
            color: hex
        })

    }
}

module.exports = sch;