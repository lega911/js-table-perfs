
alight.f$.ready(function() {
    var scope = alight.Scope();
    scope.list = ENV.libraryList;

    scope.getTime = function(kind, code) {
        var r = localStorage.getItem(kind + ':' + code)
        if(r) return r + 'ms'
        return ''
    };

    alight.applyBindings(scope, document.body);
});
