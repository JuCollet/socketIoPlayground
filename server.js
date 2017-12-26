var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = 80;

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

io.on('connection', function(socket){
  socket.on('init nickname', function(nickname){
    socket.nickname = nickname;
    io.emit('notification', `${socket.nickname} a rejoint le chat.`)
  });
  socket.on('disconnect', function(){
    io.emit('notification', `${socket.nickname} a quitté le chat.`);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', {...msg, nickname: socket.nickname });
  });
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});