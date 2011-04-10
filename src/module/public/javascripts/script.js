window.addEventListener('load', function() {

  var input = document.querySelector('input[type=text]');
  var textarea = document.querySelector('textarea');

  document.querySelector('form').addEventListener('submit', function(e) {
    textarea.value += 'あなた> ' + input.value + '\n';
    var req = new XMLHttpRequest();
    req.open('POST', '/talk');
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        textarea.value += 'munode> ' + req.responseText + '\n';
        textarea.scrollTop = textarea.scrollHeight;
        input.value = '';
      }
    };
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send('input=' + encodeURIComponent(input.value));
    e.preventDefault();
  }, false);
  
  input.focus();

}, false);