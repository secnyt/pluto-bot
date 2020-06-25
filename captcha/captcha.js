// Captcha stuff, epic

//Dependencies
const svgCaptcha = require('svg-captcha');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const Discord = require('discord.js');
const fsPromises = fs.promises;
const tinyColor = require('tinycolor2');

async function convert(svgPath) {
    var img = await loadImage(svgPath);
    var { width, height } = img;
    var canvas = createCanvas(width, height);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = tinyColor.random().toHexString();
    ctx.globalCompositeOperation = 'difference'
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0);
    return new Buffer.from((canvas.toDataURL()).split(',')[1], 'base64');
};

var c = {};


c.answer = function (msg, client, channel) {
    if (msg.cleanContent.split(" ")[1].trim() === answer) {
        channel.send("You are not a bot:)");
    }
    else {
        channel.send("You are incorrect, you bot!");
    }
}

var answer;
c.captcha = async function (msg, client, channel) {
    var captcha = svgCaptcha.create({ size: 6, noise: 3 });
    answer = captcha.text;
    await fsPromises.writeFile('./storage/images/captcha.svg', Buffer.from(captcha.data));
    var data = await convert('./storage/images/captcha.svg');
    var attachment = new Discord.MessageAttachment(data, "captcha.png");
    channel.send(attachment);
}


module.exports = c;
