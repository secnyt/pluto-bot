const fs = require('fs');
const soh = require('./../server specific options stuff/serverOptionsHandler');

var jh = {};
var ASO = {};

function read(path){
    ASO = JSON.parse(fs.readFileSync(path, 'utf8'));
};
const write = function(data, path){
    fs.writeFile(path, JSON.stringify(data, null, 4), 'utf8', (err) => {
        //console.log(ASO);
        if(err){
            console.log(err);
            console.log('there was an error');
        } else{
        }
    })
}
var jsonPath = './server specific options stuff/serverOptions.json';
read(jsonPath);

jh.handle = (client, member) => {
    read(jsonPath);
    var g =  member.guild.id;
    /*console.log(g);
    console.log(ASO);
    console.log(ASO[g]);*/
    if(!ASO[g]){
        ASO[g] = new soh[1]();
        //console.log('test');
        write(ASO, jsonPath);
    } 
    var a = ASO[g];
    if(a.welcome.on){
        var welcomeMessage = () => a.welcome.message.replace(/\<user\>|\<username\>|\<name\>/g, member.displayName).replace(/\<guildnick\>|\<guildname\>|\<servername\>|\<servernick\>/g, member.guild.name).replace(/\<guildacronym\>|\<serveracronym\>/g, member.guild.nameAcronym);
        //console.log(welcomeMessage());
        try{
            read(jsonPath);
            client.channels.cache.get(a.welcome.channel).send(welcomeMessage());
        }catch(err){
            //console.error(err);
        }
    }
};

module.exports = jh;