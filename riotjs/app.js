(function(){
    app = {};

    riot.observable(app);
    riot.mount('app', app);

    function insert(n, callback) {
        app.trigger('insert',n);
        callback();
    }

    function clear(callback) {
        app.trigger('clear');
        callback();
    }

    function fill(n, callback) {
        app.trigger('fill', n);
        callback();
    }

    function update(n, callback) {
        app.trigger('update', n);
        callback();
    }

    ENV.append({
        code: 'riotjs',
        clear: clear,
        fill: fill,
        update: update,
        insert: insert
    })
})();