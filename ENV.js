
(function(){
    window.ENV = {};
    document.addEventListener('DOMContentLoaded', run);

    var app;
    ENV.append = function(option) {
        app = option;
    };

    function time() {
        if(performance) return performance.now()
        return Date.now()
    }

    function run() {
        if(!app) return;

        var div = document.createElement('div');
        setResult(0, 0);

        document.body.insertBefore(div, document.body.firstChild);

        function setResult(fill, update) {
            div.innerHTML = 'Fill: <b>' + fill.toFixed(0) + 'ms</b>, Update: <b>' + update.toFixed(0) + 'ms</b>';
        }

        var count = 10000;
        next();

        function nextTick(delay, fn) {
            return function() {
                setTimeout(fn, delay)
            }
        };

        var total = {
            fill: 0,
            update: 0,
            count: 0
        };

        function next() {
            app.clear(nextTick(500, function() {
                var start = time();
                app.fill(count, nextTick(0, function() {
                    var fillDuration = time() - start;
                    setResult(fillDuration, 0);

                    nextTick(1000, function() {
                        start = time();
                        app.update(count, nextTick(0, function() {
                            var updateDuration = time() - start;
                            setResult(fillDuration, updateDuration);

                            total.fill += fillDuration;
                            total.update += updateDuration;
                            total.count++

                            localStorage.setItem('fill:' + app.code, (total.fill/total.count).toFixed(0));
                            localStorage.setItem('update:' + app.code, (total.update/total.count).toFixed(0));
                            nextTick(2000, next)();
                        }));
                    })();

                }))
            }))
        }
    }

})();
