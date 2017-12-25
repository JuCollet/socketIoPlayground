var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/client/index.html'));
});

var server = app.listen(80, function () {
  var port = server.address().port;
  console.log('Example app listening on port ', port);
});
