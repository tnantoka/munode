exports.init = function() {

  var munode = {};
   
  function parrot(msg) {
    return msg;
  }
  
  var words = JSON.parse(require('fs').readFileSync(__dirname + '/random.json')).words;
  function random() {
    return words[Math.floor(Math.random() * words.length)];
  }
  
  function talk(msg) {
    var r = Math.floor(Math.random() * 2);
    switch (r) {
      case 0:
        return parrot(msg); 
      case 1:
        return random();
    }
  }

  munode.talk = talk;
  
  return munode;
};