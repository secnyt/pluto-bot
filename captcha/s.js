//Convert svg to png
const elementRegex = /<.*>/isg;

function convert(svgStr) {
    //Read every single svg element
    return elementRegex.exec(svgStr);
}

const fs = require('fs');
const path = require('path');

fs.writeFileSync("./test.txt", fs.readFileSync("./../storage/images/captcha.svg"));
console.log('yay');

