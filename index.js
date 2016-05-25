var express = require('express');
var app = express();
var Parse = require('parse/node').Parse;

if (typeof process.env.PORT === 'undefined' || typeof process.env.PARSE_APPID === 'undefined' ||
  typeof process.env.PARSE_JSKEY === 'undefined' || typeof process.env.PARSE_CLASS === 'undefined') {
  console.error("Please set the env variables PORT, PARSE_APPID, PARSE_JSKEY, PARSE_CLASS");
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/importparse', function (req, res) {
  console.log("Starting to import data to parse....");
  var json = require('./json/' + process.env.PARSE_CLASS + '.json');
  Parse.initialize(process.env.PARSE_APPID, process.env.PARSE_JSKEY);
  var parseObjs = json.results;
  var objsToSave = [];
  for (var i = 0; i < parseObjs.length; i++) {
    var obj = parseObjs[i];
    var ParseObj = Parse.Object.extend(process.env.PARSE_CLASS);
    var parseObj = new ParseObj();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key !== 'objectId') {
          parseObj.set(key, obj[key]);
        }
      }
    }
    objsToSave.push(parseObj);
  }
  Parse.Object.saveAll(objsToSave).then(function () {
    res.send(objsToSave.length + " objects saved in parse");
  }, function (err) {
    res.status(500).send("Error in save to parse " + err.message);
  });
});

app.listen(process.env.PORT, function () {
  console.log("ParseExportImport listening on 3000!");
});