exports.init = function() {

  var munode = {};
  
  function parrot(msg) {
    return msg;
  }
  
  function talk(msg) {
    return parrot(msg);
  }

  munode.talk = talk;
  
  return munode;
};