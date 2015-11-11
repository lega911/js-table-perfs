'use strict';

$(function() {
    var root = $("#test-area")[0];
    var ul = document.createElement('ul');
    root.appendChild(ul);
    var list = [];

    ENV.append({
        code: 'js2',
        clear: clear,
        fill: fill,
        update: update
    })
    
    function clear(callback) {
        ul.innerHTML = '';
        list.length = 0;
        callback()
    };
    
    function fill(n, callback) {
        var i, li, text, fragment = document.createDocumentFragment();;
        for (i = 0; i < n; i++) {
          li = document.createElement('li');
          text = document.createTextNode('jj: ' + i);
          li.appendChild(text);
          fragment.appendChild(li);
          list.push(text);
        };
        ul.appendChild(fragment);
        callback()
    };
    
    function update(n, callback) {
        var i;
        for (i = 0; i < n; i++) {
            list[i].textContent = 'jj: ' + i + ' ' + i;
        };
        callback()
    }

})
