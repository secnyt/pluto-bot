var pt = {};

pt.handle = function(client){
    client.channels.cache.get('709861546385473617').send('DE DE DE DE, DE, DEDE, DE DEDE.');
}

pt.checkTime = function(msg){
    var time = new Date();
    h = time.getHours();
    m = time.getMinutes();

    if((h == 3 || h == 15) && m == 14){
        pt.handle(client);
    }
}

module.exports = pt;