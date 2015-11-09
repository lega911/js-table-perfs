'use strict';

$(function() {
  var root = $("#test-area")[0];
  var ul = document.createElement('ul');
  var list = [];

  ENV.append({
      code: 'js2',
      clear: clear,
      fill: fill,
      update: update
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
          text = document.createTextNode('vj: ' + i);
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
          list[i].textContent = 'vj: ' + i + ' ' + i;
      };
      callback();
  }

})
