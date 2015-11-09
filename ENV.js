
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
            div.innerHTML = 'Fill: <b>' + fill + 'ms</b>, Update: <b>' + update + 'ms</b>';
        }

        var count = 10000;
        next();

        function nextTick(delay, fn) {
            return function() {
                setTimeout(fn, delay)
            }
        };

        function next() {
            app.clear(nextTick(500, function() {
                var start = time();
                app.fill(count, nextTick(0, function() {
                    var fillDuration = (time() - start).toFixed(0);
                    setResult(fillDuration, 0);

                    nextTick(1000, function() {
                        start = time();
                        app.update(count, nextTick(0, function() {
                            var updateDuration = (time() - start).toFixed(0);
                            setResult(fillDuration, updateDuration);

                            localStorage.setItem('fill:' + app.code, fillDuration);
                            localStorage.setItem('update:' + app.code, updateDuration);
                            nextTick(2000, next)();
                        }));
                    })();

                }))
            }))
        }
    }

})();
