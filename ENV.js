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
    };

    function buildBoard() {
        var div = document.createElement('div');
        document.body.insertBefore(div, document.body.firstChild);
        var fillResult=0, updateResult=0;
        displayResult();

        function displayResult(fill, update) {
            if(fill) fillResult = fill;
            if(update) updateResult = update;
            div.innerHTML = 'Fill: <b>' + fillResult.toFixed(0) + 'ms</b>, Update: <b>' + updateResult.toFixed(0) + 'ms</b>';
        }

        return displayResult;
    };

    function run() {
        if(!app) return;
        var displayResult = buildBoard();
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        var count = 10000;
        var fillDuration, updateDuration;
        var total = { fill: 0, update: 0, count: 0 };

        next();

        function nextTick(delay, fn) {
            return function() {
                setTimeout(fn, delay)
            }
        };

        function takeFill(callback) {
            var start = time();
            app.fill(count, nextTick(0, function() {
                fillDuration = time() - start;
                displayResult(fillDuration, 0);
                callback()
            }))
        }

        function takeUpdate(callback) {
            var start = time();
            app.update(count, nextTick(0, function() {
                updateDuration = time() - start;
                displayResult(0, updateDuration);
                callback()
            }));
        }

        function saveResult() {
            total.fill += fillDuration;
            total.update += updateDuration;
            total.count++

            localStorage.setItem('fill:' + app.code, (total.fill/total.count).toFixed(0));
            localStorage.setItem('update:' + app.code, (total.update/total.count).toFixed(0));
        };

        function next() {
            app.clear(nextTick(500, function() {
                requestAnimationFrame(function() {
                    takeFill(nextTick(1000, function() {
                        requestAnimationFrame(function() {
                            takeUpdate(function() {
                                saveResult();
                                setTimeout(next, 2000)
                            })
                        })
                    }));
                })
            }))
        }
    }

})();
