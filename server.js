var path = require('path');
var express = require('express');

var PORT = process.env.PORT || 1337;

var app = express();

app.use('/js', express.static(__dirname + '/dist'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/icons', express.static(__dirname + '/icons'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});