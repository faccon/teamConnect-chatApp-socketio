var express = require("express");
var app = express();
const path = require("path");

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "build")));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);