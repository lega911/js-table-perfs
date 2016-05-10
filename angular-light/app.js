alight.ctrl.main = function(scope) {
    scope.items = [];

    function redraw() {
        scope.$scan();
    }

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
    
    function insert(n, callback) {
        scope.items.splice(n, 0, { t: 'xx' });
        redraw();
        callback();
    }
    
    ENV.append({
        code: 'angular-light',
        clear: clear,
        fill: fill,
        update: update,
        insert: insert
    })
};