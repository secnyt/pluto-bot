
const translate = require('@vitalets/google-translate-api');
const trh = {};

trh.handle = async (msg) => {
    var transText = msg.content.trim().substr(msg.content.trim().indexOf(' ') + 1).trim();
    transText = transText.split(':');
    var language = transText[1].trim();
    transText = transText[0];
    var result = "";
    if(language == 'false') return transText;
    await translate(transText, {to: language}).then((res) => {
        result = res.text;
    });
    return result;
};

module.exports = trh;