window.addEventListener('load', function() {

  var name = document.querySelector('#name');
  var input = document.querySelector('#input');
  var textarea = document.querySelector('textarea');

  var socket = new io.Socket();
  socket.connect();
  // 受信したmsgをtextareaに表示
  socket.on('message', function(msg){
    textarea.value += msg.name + '> ' + msg.input + '\n';
    textarea.scrollTop = textarea.scrollHeight;
    input.value = '';
  });  
  
  document.querySelector('form').addEventListener('submit', function(e) {
    textarea.value += 'あなた> ' + input.value + '\n';
    // Socket.IOで送信
    socket.send({
      name: name.value,
      input: input.value
    });
    e.preventDefault();
  }, false);
  
  name.focus();

}, false);