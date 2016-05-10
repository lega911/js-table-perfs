(function(){
    var vue = new Vue({
        el: '#app'
    });

    function insert(n, callback) {
        vue.items.splice(n, 0, { t: 'xx' });
        callback();
    }

    function clear(callback) {
        vue.$set('items', []);
        callback();
    }

    function fill(n, callback) {
        var tmp = [];
        for (i = 0; i < n; i += 1) {
            tmp.push({t: i});
        }
        vue.$set('items', tmp);
        callback();
    }

    function update(n, callback) {
        var i,
            items = vue.items;
        for (i = 0; i < n; i += 1) {
            items[i].t = i + ' ' + i;
        }
        vue.$set('items', items);
        callback();
    }

    ENV.append({
        code: 'vuejs',
        clear: clear,
        fill: fill,
        update: update,
        insert: insert
    })
})();