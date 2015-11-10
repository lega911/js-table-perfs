$(function() {
    var ractive;
    
    ractive = new Ractive({
        el: 'ractive',
        template: '#ractive_template',
        data: { list:[] }
    });
    
    function clear(callback) {
        ractive.data.list.length = 0;
        ractive.update('list');
        callback()
    };
  
    function fill(n, callback) {
        var tmp = [];
        for (var i = 0; i < n; i++) {
            tmp.push({ t:i })
        };
        ractive.data.list = tmp;
        ractive.update('list');
        callback()
    };
    
    function update(n, callback) {
        for (var i = 0; i < n; i++) {
            ractive.data.list[i].t = i+' '+i
        }
        ractive.update('list');
        callback()
    };

    ENV.append({
        code: 'ractivejs',
        clear: clear,
        fill: fill,
        update: update
    });

});
