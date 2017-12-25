(function(){

  var socket = io();
  var form = document.getElementById('form');
  var msgList = document.getElementById('messages');

  form.addEventListener('submit', function(e){
    var currentTime = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()
    };
    e.preventDefault();
    socket.emit('chat message', {
      currentTime,
      message: e.target.m.value
    });
    e.target.m.value = "";
  });

  socket.on('chat message', function(msg){
    node = document.createElement("LI");
    textnode = document.createTextNode(`${msg.currentTime.hours}:${msg.currentTime.minutes} - ${msg.message}`);
    node.appendChild(textnode);
    msgList.appendChild(node);
  });

}());
