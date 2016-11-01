var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(require('express').static('client'));
app.use(function(req, res, next){
  res.io = io;
  next();
});

var btDownloadController = require('./server/controllers/btDownload');
app.use(btDownloadController);

server.listen(9250, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Cozy BTDownload app listening at http://%s:%s', host, port);
});