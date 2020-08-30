var PlutoObjectNotation = {};

PlutoObjectNotation.compile = (pon, type) => {
    //console.log(pon);
    // s("hello");
    // f(hello);
    if(type == "msg"){
        pon = pon.content.split(' ');
        var r = ""
        pon.forEach((w, i) => {
            if(i != 0){
                r += (w + ' ');
            }
        })
        pon = r;
    }
    pon = pon.toString().trim();
    var out = "";
    if(pon.includes("s(\"")){
        p = pon.split("\"");
        //console.log(p);
        p.forEach((w, i) => {
            w = w.trim();
            if(w == "s(" || w == ")"){
                //console.log(w);
                p[i] = "";
            }
        });
        pon = "";
        for(var i of p){
            pon += i;
        }
        out = pon;
    }
    //console.log(out);
    return out;
}

module.exports = PlutoObjectNotation;