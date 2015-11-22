'use strict';

$(function() {
  ENV.append({
    code: 'basisjs',
    clear: basisClear,
    fill: basisFill,
    update: basisUpdate,
    insert: basisInsert
  });
  
  
  basis.require('basis.ui');
  var basisList = new basis.ui.Node({
      container: document.getElementById('test-area'),
      template: '<ul/>',
      childClass: {
          template: '<li>jj: {val}</li>',
          binding: {
              val: 'val'
          }
      }
  });
  
  function basisFill(n, callback){
      basisList.setChildNodes(basis.array.create(n, function(idx){
          return {
              val: idx
          };
      }));

      callback();
  }
  
  function basisUpdate(n, callback){
      basisList.childNodes.forEach(function(node){
          node.val += ' ' + node.val;
          node.updateBind('val');
      });
      
      callback();
  }
  
  function basisInsert(n, callback){
      basisList.insertBefore({val: 'xx'}, basisList.childNodes[n]);
      
      callback();
  }
  
  function basisClear(callback){
      basisList.clear();
      callback();
  }

});
