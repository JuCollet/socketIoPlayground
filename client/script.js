(function(){

  var socket = io();
  var form = document.getElementById('form');
  var msgList = document.getElementById('messages');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    socket.emit('chat message', e.target.m.value);
    e.target.m.value = "";
  });

  socket.on('chat message', function(msg){
    var node, textnode;
    node = document.createElement("LI");
    textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    msgList.appendChild(node);
  });

}());
