exports.init = function() {

  var munode = {};
  var segmenter = require('../tinysegmenter');
     
  function parrot(msg) {
    return msg;
  }
  
  var words = JSON.parse(require('fs').readFileSync(__dirname + '/random.json')).words;
  function random() {
    return words[Math.floor(Math.random() * words.length)];
  }
  
  var dic = {
    __start: []
  };
  var data =   require('fs').readFileSync(__dirname + '/markov.txt', 'utf-8').split('\n');
  for (var i = 0; i < data.length; i++) {
    study(data[i]);
  }
    
  function study(msg) {
    if (!msg) {
      return;
    }
    var segs = segmenter.segment(msg);
    dic['__start'].push(segs[0]);
    var end = segs[segs.length - 1];
    if (dic[end]) {
      dic[end].push('__end');
    } else {
      dic[end] = ['__end'];        
    }
    for (var j = 1; j < segs.length; j++) {
      var prev = segs[j - 1];
      if (dic[prev]) {
        dic[prev].push(segs[j]);
      } else {
        dic[prev] = [segs[j]];        
      }
    }
  }
  
  function markov(msg) {
    var start = dic['__start'][Math.floor(Math.random() * dic['__start'].length)];
    s = [start];
    for (var i = 0; i < 100; i++) {
      var chain = dic[start][Math.floor(Math.random() * dic[start].length)];
      if (chain == '__end') {
        break;
      }
      s.push(chain);
      start = chain;
    }
    return s.join('');
  }
  
  function talk(msg) {
    var r = Math.floor(Math.random() * 10);
    study(msg);
    switch (r) {
      case 0:
        return parrot(msg); 
      case 1:
        return random();
      default:
        return markov();
    }
  }

  munode.talk = talk;
  
  return munode;
};