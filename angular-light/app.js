
alight.controllers.main = function(scope) {
    scope.items = [];
    scope.clear = function(callback) {
        scope.items = [];
        scope.$scan();
        callback();
    }
    scope.fill = function (n, callback) {
        var i;
        for (i = 0; i < n; i += 1) {
            scope.items.push({ t:i });
        }
        scope.$scan();
        callback();
    };
    scope.update = function (n, callback) {
        var i,
        items = scope.items;
        for (i = 0; i < n; i += 1) {
            items[i].t += ' ' + items[i].t;
        }
        scope.$scan();
        callback();
    };
    
    ENV.append({
        code: 'angular-light',
        clear: scope.clear,
        fill: scope.fill,
        update: scope.update
    })
};