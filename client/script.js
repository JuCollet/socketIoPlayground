(function(){

  var socket = io();
  var form = document.getElementById('form');
  var chatInput = form.m;
  var msgList = document.getElementById('messages');
  var chatWindow = document.querySelector('.chatWindow');
  var nickname = '';

  function getCurrentTime(){
    var currentTime = {
      hours: new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours(), 
      minutes: new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()
    };
    return currentTime;
  };

  function setNickname(nm){
    nickname = nm;
    chatInput.removeAttribute('placeholder');
    chatInput.classList.remove('userInit');
    socket.emit('init nickname', nm);
  }

  function appendMessage(msg, notification){
    node = document.createElement('li');

    if(!notification){
      nicknameSpan = document.createElement('span');
      nicknameSpanText = document.createTextNode(`${msg.nickname} - ${msg.currentTime.hours}:${msg.currentTime.minutes}`);
      nicknameSpan.appendChild(nicknameSpanText);
      messageSpan = document.createElement('span');
      messageSpanText = document.createTextNode(msg.message);
      messageSpan.appendChild(messageSpanText);
      nicknameSpan.classList.add('nickname');
      messageSpan.classList.add('messageText');
      node.classList.add('message');
      node.appendChild(nicknameSpan);
      node.appendChild(messageSpan);
    } else {
      textnode = document.createTextNode(msg);
      node.classList.add('notification');
      node.appendChild(textnode);
    }

    msgList.appendChild(node);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(e.target.m.value === '') return;
    if(nickname === ''){
      setNickname(e.target.m.value);
      e.target.m.value = "";
      return;
    };
    socket.emit('chat message', {
      currentTime: getCurrentTime(),
      message: e.target.m.value
    });
    e.target.m.value = "";
  });

  socket.on('notification', function(msg){
    appendMessage(msg, true);
  });

  socket.on('chat message', function(msg){
    appendMessage(msg, false);
  });

}());
