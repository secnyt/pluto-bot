//Captcha stuff

//Dependancies
const svgCaptcha = require('svg-captcha');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

var c = {};

c.test = function (msg, client) {
    msg.channel.send({
        files: [{
            attachment: './storage/images/pluto.jpg',
            name: 'pluto.jpg'
        }]
    })
        .then(console.log('hi'))
        .catch(console.error);

        var embed = new Discord.MessageEmbed();
        embed.setTitle("Can You See The Image?");
        embed.setImage(fs.readFileSync(path.join(__dirname, "./image.txt")));
        msg.channel.send(embed);
};

module.exports = c;
