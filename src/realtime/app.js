
/**
 * Module dependencies.
 */

var express = require('express'),
  munode = require('./lib/munode').init(),
  io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

// socket.IO
var socket = io.listen(app);
socket.on('connection', function(client){
  client.on('message', function(msg){
    // 受信データを全員に送信
    client.broadcast(msg);
    // 応答送信
    var reply = {
      name: 'munode', 
      input: munode.talk(msg.input)
    };
    client.send(reply);
    client.broadcast(reply);
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
