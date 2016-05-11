(function() {
    var ractive;
    
    ractive = new Ractive({
        el: 'ractive',
        template: '#ractive_template',
        data: { list:[] }
    });
    
    function clear(callback) {
        ractive.set('list', []);
        callback()
    };
  
    function fill(n, callback) {
        var tmp = [];
        for (var i = 0; i < n; i++) {
            tmp.push({ t:i })
        };
        ractive.set('list', tmp);
        callback()
    };
    
    function update(n, callback) {
        var list = ractive.get('list');
        for (var i = 0; i < n; i++) {
            list[i].t = i+' '+i;
        }
        ractive.set('list', list);
        callback()
    };

    function insert(n, callback) {
        var list = ractive.get('list');
        list.splice(n, 0, {t: 'XX'});
        callback();
    }

    ENV.append({
        code: 'ractivejs',
        clear: clear,
        fill: fill,
        update: update,
        insert: insert,
    });

})();
