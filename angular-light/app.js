
alight.directives.ctrl.main = function(changeDetector) {
    var scope = changeDetector.scope;
    function redraw() {
        changeDetector.scan()
    }

    scope.items = [];
    function clear(callback) {
        scope.items = [];
        redraw();
        callback();
    }

    function fill(n, callback) {
        var i;
        for (i = 0; i < n; i += 1) {
            scope.items.push({ t:i });
        }
        redraw();
        callback();
    }

    function update(n, callback) {
        var i,
        items = scope.items;
        for (i = 0; i < n; i += 1) {
            items[i].t += ' ' + items[i].t;
        }
        redraw();
        callback();
    }
    
    ENV.append({
        code: 'angular-light',
        clear: clear,
        fill: fill,
        update: update
    })
};