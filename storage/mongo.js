var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("pluto-bot");
  var myobj = { name: "Test", address: "ABC 123" };
  dbo.collection("snatches").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("snatch inserted");
    db.close();
  });
});