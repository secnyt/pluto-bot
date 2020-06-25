const fs = require('fs');

var jh = {};
var ASO = {};

const read = function(path){
    fs.readFileSync(path, 'utf8', (data) => {
        ASO = JSON.parse(data);
    })
}
const write = function(data, path){
    fs.writeFile(path, JSON.stringify(data, null, 4), 'utf8', (err) => {
        if(err){
            console.log(err);
            console.log('there was an error');
        } else{
        }
        ASO = data;    
    })
}
var jsonPath = './server specific options stuff/serverOptions.json';
read(jsonPath);

jh.handle = (msg, client, member) => {
    var g =  msg.guild.id;
    if(!ASO[g]){
        var a = ASO[g];
        if(a.welcome.on){
            var welcomeMessage = () => a.welcome.message.replace(/\<user\>/g, member.displayName).replace(/\<guildnick\>/g, msg.guild.name).replace(/\<guildacronym\>/g, msg.guild.nameAcronym);
            
            client.channels.get(a.welcome.channel).send(welcomeMessage);
        }
    }
};