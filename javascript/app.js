'use strict';

$(function() {
  var root = $("#test-area")[0];
  var ul = document.createElement('ul');
  var list = [];

  ENV.append({
      code: 'js',
      clear: clear,
      fill: fill,
      update: update,
      insert: insert
  })

  function clear(callback) {
      ul.innerHTML = '';
      list.length = 0
      callback();
  };
  
  function fill(n, callback) {
      var i, li, text;
      for (i = 0; i < n; i++) {
          li = document.createElement('li');
          text = document.createTextNode('jj: ' + i);
          li.appendChild(text);
          ul.appendChild(li);
          list.push(text);
      };
      root.appendChild(ul);
      callback();
  };
  
  function update(n, callback) {
      var i;
      for (i = 0; i < n; i++) {
          list[i].textContent = 'jj: ' + i + ' ' + i;
      };
      callback();
  };

  function insert(n, callback) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode('jj: xx'));

    var base = list[n].parentNode;    
    base.parentNode.insertBefore(li, base);
    callback()
  }

})
