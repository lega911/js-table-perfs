'use strict';

function build(n) {
    var items = [];
    for (var i = 0; i < n; i += 1) {
        items.push({t: i});
    }
    return items;
}

var MithrilApp = {};
MithrilApp.view = function(ctrl) {
    return ctrl.items.map(function(item) {
        return m("li", "jj " + item.t);
    })
}; 

var clear = function (callback) {
    m.render(document.getElementById("mr-list"), "")
    callback();
};
var ctrl;
var fill = function (n, callback) {
    MithrilApp.controller = function() {
          this.items = build(n)
    };
    ctrl = m.module(document.getElementById("mr-list"), MithrilApp);
    callback();
};
var update = function (n, callback) {
    for (var i = 0; i < ctrl.items.length; i++) {
        ctrl.items[i].t += " " + i;
    };
    m.redraw();
    // m.moduxle(document.getElementById("mr-list"), MithrilApp);
    callback();
};

ENV.append({
    code: 'mithril',
    clear: clear,
    fill: fill,
    update: update
});
