 const Discord = require('discord.js');
 const client = new Discord.Client();
 const fs = require('fs');
 const package = require('./package.json');
 var guild = client.guilds.cache.get('691793782466674718');
 const supremeid = '282924172139560961';

 var channelid = {
    'parliamentaryDecisions': '696846999965663323',
    'declasion':'697457937240686705',
    'foreignAffairs': '697458000889380885',
    'supremeLeader': '697458067285082142',
    'policial': '697458197660827728',
    'cra': '697459291719860224',
    'suggestionsRequestsDemands': '697472683809701929',
    'protocol': '697485262221082744',
}

 //client.login(package.token);
 console.log(`Please don't use this! It isn't functional. Please see and use pluto.js. This is an old file.`)

 var currentVote;
 var votingQueue;

const botid = '697569067241832652';
const declasialid = '697597599200313436';
const policialid = '697597599200313436';

 var updateJson = function(){
    let jsonData = JSON.stringify({
        "current": currentVote,
        "queue": votingQueue,
    },null,4);
    fs.writeFileSync('suggestions.json', jsonData);
 }
//test
const read = function(){
    fs.readFile('suggestions.json', 'utf8', (err, data) => {
        if(err){
            console.log("File read failed:", err)
            return
        }
        data = JSON.parse(data);
        currentVote = data.current;
        votingQueue = data.queue;
    });
};

 var discmembers;
 //console.log(discmembers);
 var discArray;

 client.on('ready', () => {
    guild = client.guilds.cache.get('691793782466674718');
    console.log(`Logged in as ${client.user.tag}!`);
    discmembers = guild.members.cache;
    discArray = Array.from(discmembers);
    //console.log(discArray);
    read();
 });

var USER;

 var initiateVote = function(msg){
    if(votingQueue != []){
        //console.log('I work 0');
        currentVote = votingQueue[0];
        votingQueue.splice(0,1);
        currentVote.current = true;
        currentVote.stage = 1;
        //updateJson();
        //var numberofdec = 0;
        //console.log('I work 1');
        for(var i = 0; i < discArray.length; i++){
            //console.log('I work 2');
            if(discArray[i][1]._roles.includes(declasialid)){
                client.users.cache.get((discArray[i][0])).send('Good day, Declasion! I have a new vote for you today. To submit your vote, simply react to this message.\n> Suggestion: ' + currentVote.suggestion)
                .then((sent) => {
                    sent.react("👍");
                    sent.react("👎");
                    return sent
                }).then((sent) => {
                    const thumbsup = "👍";
                    const thumbsdown = "👎";
                    const collector = sent.createReactionCollector((reaction, user) => {
                        USER = user.id;
                        return user.id !== botid && (reaction.emoji.name === "👍" || reaction.emoji.name === "👎")
                    })
                    .once("collect", reaction => {
                        const chosen = reaction.emoji.name;
                        if(chosen === "👍"){
                            sent.channel.send('Thank you for your vote! (Yes)');
                            currentVote.voters.push(USER);
                            currentVote.total += 1;
                            currentVote.votes[0] += 1;
                            updateJson();
                        }
                        else if(chosen === "👎"){
                            sent.channel.send('Thank you for your vote! (No)');
                            currentVote.voters.push(USER);
                            currentVote.total += 1;
                            currentVote.votes[1] += 1;
                            updateJson();
                        }
                        collector.stop()
                    })
                })
            }
            //console.log(declasionArray[i][1]._roles, declasionArray[i][0]);
        }
            msg.channel.send('Initiating Vote!' + '\n> Suggestion: ' + currentVote.suggestion);

            client.channels.cache.get(channelid.declasion).send('A new vote has started! Please check your DMs to vote.');

        }
    else{
        msg.reply('There are no suggestions in queue!')
        console.log(`I'm broken :(`);
    }
}
var initiateStage2 = function(){
    client.channels.cache.get(channelid.supremeLeader).send('Hello **Supreme Leader**! I have a new vote for you today. To submit your vote, simply react to this message.\n> Suggestion: ' + currentVote.suggestion)
    .then((sent) => {
        sent.react("👍");
        sent.react("👎");
        return sent
    }).then((sent) => {
        const thumbsup = "👍";
        const thumbsdown = "👎";
        const collector = sent.createReactionCollector((reaction, user) => {
            //console.log(user.id === '282924172139560961' && (reaction.emoji.name === "👍" || reaction.emoji.name === "👎"));
            return user.id === '282924172139560961' || user.id === '539505577286434816' && (reaction.emoji.name === "👍" || reaction.emoji.name === "👎")
        })
        .once("collect", reaction => {
            const chosen = reaction.emoji.name;
            if(chosen === "👍"){
                sent.channel.send('Thank you for your vote!');
                currentVote.total += 1;
                currentVote.votes[0] += 1;
                updateJson();
            }
            else if(chosen === "👎"){
                sent.channel.send('Thank you for your vote!');
                currentVote.total += 1;
                currentVote.votes[1] += 1;
                updateJson();
            }
            sent.delete();
            collector.stop()
        })
    })
};
var initiateStage3 = function(){
    //console.log('I work 0');
    //updateJson();
    //var numberofdec = 0;
    //this for loop apparently doesn't work and IDK why
    //console.log('I work 1');
    //console.log('I work (function)');
    for(var i = 0; i < discArray.length; i++){
        //console.log('I work 2');
        //console.log('I work (for loop)');
        if(discArray[i][1]._roles.includes(policialid)){
            //console.log('I work (messaging)');
            client.users.cache.get((discArray[i][0])).send('Good day, Policial! I have a new vote for you today. To submit your vote, simply react to this message.\n> Suggestion: ' + currentVote.suggestion)
            .then((sent) => {
                sent.react("👍");
                sent.react("👎");
                return sent
            }).then((sent) => {
                const thumbsup = "👍";
                const thumbsdown = "👎";
                const collector = sent.createReactionCollector((reaction, user) => {
                    USER = user.id;
                    return user.id !== botid && (reaction.emoji.name === "👍" || reaction.emoji.name === "👎")
                })
                .once("collect", reaction => {
                    const chosen = reaction.emoji.name;
                    if(chosen === "👍"){
                        sent.channel.send('Thank you for your vote! (Yes)');
                        currentVote.voters.push(USER);
                        currentVote.total += 1;
                        currentVote.votes[0] += 1;
                        updateJson();
                    }
                    else if(chosen === "👎"){
                        sent.channel.send('Thank you for your vote! (No)');
                        currentVote.voters.push(USER);
                        currentVote.total += 1;
                        currentVote.votes[1] += 1;
                        updateJson();
                    }
                    collector.stop()
                })
            })
        }
        //console.log(declasionArray[i][1]._roles, declasionArray[i][0]);
    }
    client.channels.cache.get(channelid.policial).send('A new vote has started! Please check your DMs to vote.');
}
client.on('message', msg => {
    if(!msg.member.roles.cache.find(r => r.name === "ranting") && (msg.channel.id == '696727249331683368' || msg.channel.id == '692003736192680027') && msg.author.id != '697569067241832652'){
        //msg.channel.send('hi');
        if(!msg.author.bot){
            msg.delete();
            msg.channel.send(`<@${msg.author.id}>, your message has been deleted because this is not your chat. Please take your business elsewhere.\n - Ranting Group`);
        }
        else{
            msg.delete();
        }
    }
        //discArray[i][1]._roles.includes(declasialid)
    if(!msg.author.bot){
        if(msg.channel.type === 'text'){
            if(msg.content.slice(0,9) === '=suggest '){
                msg.reply('Suggested!');
                let suggestion = msg.content.slice(9,-1) + msg.content.slice(-1);
                client.channels.cache.get(channelid.declasion).send("<@" + msg.author.id + ">" + " suggested " + suggestion + '.');
                votingQueue.push({
                    current: false,
                    suggestion: suggestion,
                    stage: 0,
                    votes: [0,0],
                    total: 0,
                    voters: []
                });
                updateJson();
            }
            else if(msg.content.slice(0,11) === '=votequeue ' || msg.content === '=votequeue' || msg.content === '=votingqueue'){
                msg.reply('Showing queue!');
                if(votingQueue[0]){
                    for(var i = 0; i < votingQueue.length; i++){
                        msg.channel.send('> ' + votingQueue[i].suggestion);
                    }
                }
                else {
                    msg.channel.send('> Queue is empty!');
                }
            }
            else if(msg.content.slice(0,12) === '=clearqueue ' || msg.content === '=clearqueue'){
                msg.channel.send('Cleared queue!');
                votingQueue = [];
                updateJson();
            }
            else if(msg.content.slice(0,15) === '=intitiatevote ' || msg.content === '=initiatevote'){
                //initiateVote(msg);
                initiateVote(msg);
            }
            else if(msg.content.slice(0,14) === '=clearcurrent ' || msg.content === '=clearcurrent'){
                msg.channel.send('Current vote has been cancelled!');
                currentVote = {};
                updateJson();
            }
            else if(msg.content.split('@Pluto') != msg.content || msg.content.split('<@697569067241832652>') != msg.content || msg.content.split('<!@697569067241832652>') != msg.content){
                msg.channel.send('Hello <@' + msg.author.id + '> ! My prefix is `=`. Do `=help` for help.');
            }
            else if(msg.content === '=test'){
                initiateStage3();
            }
            else if(msg.content === '=clearall'){
                msg.channel.send('All votes have been cleared.');
                votingQueue = [];
                currentVote = {};
                updateJson();
            }
            else if(msg.content.split('easter egg') != msg.content || msg.content.split('Easter egg') != msg.content){
                msg.channel.send('Heh. You got me there.');
            }
            if(msg.content.startsWith('/s')){
                //msg.channel.send('I hear /s');
                var params = msg.content.split(" ");
                //console.log(JSON.stringify(params));
                params.splice(0, 1);
                //console.log(JSON.stringify(params));
                var snatch = params.splice(0, 1);
                //console.log(snatch)
                //console.log(JSON.stringify(params));
                for(var i of params){
                    if(!params[i].startsWith('.')){
                        params.splice(i, 1);
                    }
                }
                
                var errors = {
                    NAP: function(msg){
                        msg.channel.send(`I don't understand any of your arguments! I understand:\n    .j; Use Japanese.\n    .d; Delete snatch command.`
                    },
                    NP: function(msg){
                        msg.channel.send(`I don't understand any of your arguments! I understand:\n    .j; Use Japanese.\n    .d; Delete snatch command.`
                    },
                    CS: function(msg){
                        msg.channel.send(`This functionality is coming soon! Try me later!`);
                    }
                };
                switch(snatch[0]){
                    case 'benplaylist':
                        msg.channel.send('​r!play https://www.youtube.com/playlist?list=PLShq-al0vKZ2-Oi2RfRNVltc8dPt4xLcI');
                        break;
                    case 'soh':
                        if(params.length == 0){
                            errors.NP(msg);
                            break;
                        }
                        // send japanese
                        if(params.includes('.j')){
                            msg.channel.send('我々の頭を揺らす');
                            for(var i of params){
                                if(params[i] == '.j'){
                                   params.splice(i, 1);
                                }
                            }
                            if(params.length == 0){
                                break;  
                            }
                        }
                        // delete message 
                        if(params.includes('.d')){
                            msg.delete();
                            for(var i of params){
                                if(params[i] == '.d'){
                                   params.splice(i, 1);
                                }
                            }
                            if(params.length == 0){
                                break;
                            }
                        }
                        else {
                            errors.NAP(msg);
                        }
                        
                        break;
                    case 'smh':
                        errors.CS(msg);
                        break;
                    
                    default:
                        msg.channel.send('Invalid request. Some things you can snatch include,\n`benplaylist\`, `soh`,\n and coming soon,\nother people\'s playlists, smh, and more!')
                }
                
            }
        }
    }
    if(msg.content.includes("I'm Dad") || msg.content.includes("im dad") || msg.content.includes("I'm dad") || msg.content.includes("im Dad") || msg.content.includes("im dad") || msg.content.includes("I’m Dad") || msg.content.includes("I’m dad")){
        msg.channel.send(`​​​​​<@${msg.author.id}>, Your message has been deleted for the following reasons: How. Dare. You.`);
        msg.delete();
    }
    if(msg.content.includes("true power")){
        msg.channel.send(`​​​​​<@${msg.author.id}>, You **DARE** challenge ***ME***?!`);
        msg.delete();
    }
    if(msg.content.includes('⒨⒠⒣⒤▁⒝⒜⒟')){
        msg.channel.send('⒲⒠⒧⒧┄▁⒯⒣⒜⒯┃⒮▁⒪⒝⒱⒤⒪⒰⒮┅');
    }
    if(msg.content.includes('⒴⒰⒨⒨⒴▁⒴⒰⒨⒨⒴')){
        msg.channel.send('⒤⒩▁⒨⒴▁⒯⒠⒠⒠⒧⒪⒪⒫⒣⒜⒜⒮⒠');
    }
    if(msg.content.includes("shut up")){
        msg.channel.send(`​​​​​<@${msg.author.id}>, No you`);
    }
    if(msg.content.startsWith("r!") && msg.channel.id != "697523799175987292" && msg.author.id != "697569067241832652" && msg.bot === false){
        msg.channel.send(`​​​​​<@${msg.author.id}>, OMG, I THOUGHT WE ESTABLISHED THIS ALREADY. 𝔾𝕆 𝕋𝕆 <#697523799175987292> 𝔽𝔽𝕊.`);
        msg.delete();
    }
    if(msg.author.id === "235088799074484224" && msg.channel.id != "697523799175987292"){
        msg.delete();
    }
    if(msg.content.includes('69') && !msg.mentions.members.first()){
        msg.channel.send('ℕ𝕆𝕀ℂ𝔼');
    }
    if(msg.content.toLowercase().includes('crease') || msg.content.toLowercase().includes('chris')){
        msg.channel.send('crease bad, WAFFLE GOD');
    }
    if(msg.content.includes("big brain")){
        msg.channel.send('big bran Raisin Bran with TWO FULL CUPS OF RAISINS\*\*\*\*\*\*');
    }
    if(msg.content.includes("small brain")){
        msg.channel.send('smol bran Normal Bran with NO CUPS OF RAISINS\*\*\*\*\*\*');
    }
    if(msg.content.toLowercase().includes('koala')){
        msg.channel.send('koala = smoooth bran = dumb = crease');
    }
    if(msg.content.includes("I win this battle")){
        msg.channel.send('Are you ***SURE ABOUT THAT***?????');
        msg.delete();
    }
    /*if(msg.author.id === '471499670871343125' && msg.channel.id != "713048489633906768"){
        var mehichat = client.channels.cache.get('713048489633906768');
        mehichat.send(`Mehi said on <#${msg.channel.id}>: \n"${msg.content}"`)
        msg.reply("Hey, you aren't allowed to talk here, go talk in your chat\n( <#713048489633906768> ).")
        msg.delete();
    }*/
    
})
setInterval(function(){
    if(currentVote && currentVote.stage === 1 && currentVote.total >= 1){
        currentVote.total = 0;
        if(currentVote.votes[0] > 0){
            initiateStage2();
            currentVote.votes = [0, 0];
            currentVote.stage = 2;
            currentVote.voters = [];
            updateJson();
        }
        else{
            client.channels.cache.get(channelid.declasion).send('The suggestion \n`' + currentVote.suggestion + '`\nHas not received enough votes! The vote is not able to move on.')
            currentVote = {};
            updateJson();
        }
    }
    if(currentVote && currentVote.stage === 2 && currentVote.total === 1 && currentVote.votes[0] > 0){
        currentVote.total = 0;
        currentVote.stage = 3;
        initiateStage3();
        currentVote.votes = [0, 0];
        currentVote.stage = 2;
        currentVote.voters = [];
        updateJson();
    }
    else if(currentVote === 1){
        client.channels.cache.get(channelid.declasion).send('The suggestion \n`' + currentVote.suggestion + '`\nHas not received enough votes! The vote is not able to move on.');
        client.channels.cache.get(channelid.supremeLeader).send('The suggestion \n`' + currentVote.suggestion + '`\nHas not received enough votes! The vote is not able to move on.')
    }
 }, 1000)
 setInterval(function(){
     var rn = new Date();
     var time = (rn.getHours() === 3 || rn.getHours() === 15) && (rn.getMinutes() === 14);
     if(time){
         client.channels.cache.get('709861546385473617').send('DE DE DE DE, DE, DE DE, DEDE DE.')
     }
 }, 1000)
