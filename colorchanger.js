function greyscale(color,d){
    var step = color.substring(0,4);
    var char = [];
    char = step.split("");
    dec = 0;
    dec = parseInt(step, 16);
    dec += 1;
    step = dec;
    step = step.toString(16);
    return "0x" + step + step + step;
};
console.log(greyscale("0x444444", 'f'));
function rainbow(color){
    color = color.split('0x')[1];
    var frequency = .3;
    for (var i = 0; i < 32; ++i){
        Document.write( Math.sin(frequency * i)  );
    }
};