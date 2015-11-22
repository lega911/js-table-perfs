'use strict';
/*global app MK alight window*/

ENV.append({
  code: 'matreshka',
  clear: function(callback) { matreshkaCollection && matreshkaCollection.recreate(); callback(); },
  fill: mkFill,
  update: mkUpdate,
  insert: mkInsert
});

var MatreshkaCollection = MK.Class({ 
        'extends': MK.Array,
        itemRenderer: function() { return document.createElement('li'); },
        constructor: function() {
                this.bindNode( 'sandbox', '#mk-list' );
        },
        onItemRender: function(item, evt) {
            MK.bindNode(item, 'value', evt.node, {
                    setValue: function(v) {
                            this.textContent = 'jj: ' + v;
                    }
            })
        }
});

var matreshkaCollection;

function mkFill(n, callback) {
    matreshkaCollection = matreshkaCollection || new MatreshkaCollection();
    var i; 
    for (i = 0; i < n; i = i + 1) {
       matreshkaCollection.push({ value: i });
    }
    callback();
}

function mkUpdate(n, callback) {
    var i;
    for (i = 0; i < n; i += 1) {
        matreshkaCollection[ i ].value = i + ' ' + i;
    }
    callback();
}

function mkInsert(n, callback) {
    matreshkaCollection.splice(n, 0, { value: 'xx' })
    callback();
}