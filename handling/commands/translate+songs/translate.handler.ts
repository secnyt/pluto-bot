const translate = require('@vitalets/google-translate-api');

let translateHandler: any = {};

translateHandler.handle = async (msg: any, client: any, opt?: any) => {
  let content: string = msg.content;
  let commandless: string = content.substr(content.indexOf(' ') + 1).trim();

  let parameters: any = commandless.split(':');
  let toTranslate: string = parameters[0];

  if (!parameters[1]) { msg.channel.send(toTranslate); return; }

  if (parameters.length > 2) {
    msg.channel.send('You have more than one colon! If your translation includes colons, consider temporarily changing to an em dash. (—)')
    return;
  }
  if (parameters.length == 0) { msg.channel.send(toTranslate); return; }

  let language: any = parameters[1].split('->').map(l => l.trim());
  let toLanguage: string;
  let fromLanguage: string;

  switch (language.length) {
    case 0: toLanguage = 'en'; break;
    case 1: toLanguage = language[0]; break;
    case 2: toLanguage = language[1]; fromLanguage = language[0]; break;
    default:
      msg.channel.send('You can only specify two languages! One for translating to, and optionally translating from.\nex. `=tr hola : spanish -> english`');
      break;
  }

  if (!toLanguage) { return; }

  let result: string = '';
  await translate(toTranslate, { to: toLanguage, from: fromLanguage }).then((res) => { result = res.text; });

  if (result) { msg.channel.send(result); return; }

  msg.channel.send(toTranslate); 
  return;

}

module.exports = translateHandler;