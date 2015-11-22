(function(){
    window.ENV = {};

    var setTimeout = window.setTimeout;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    //document.addEventListener('DOMContentLoaded', run);

    var app;
    ENV.append = function(option) {
        app = option;
        setTimeout(run, 500);
    };

    function time() {
        if(performance) return performance.now()
        return Date.now()
    };

    function buildBoard() {
        var div = document.createElement('div');
        document.body.insertBefore(div, document.body.firstChild);
        var fillResult=0, updateResult=0, insertResult=0;
        displayResult();

        function displayResult(fill, update, insert) {
            if(fill) fillResult = fill;
            if(update) updateResult = update;
            if(insert) insertResult = insert;
            div.innerHTML = 'Fill: <b>' + fillResult.toFixed(0) + 'ms</b>, Update: <b>' +
                updateResult.toFixed(0) + 'ms</b>, Insert: <b>' +
                insertResult.toFixed(0) + 'ms</b>'
        }

        return displayResult;
    };

    function run() {
        var displayResult = buildBoard();
        var count = 10000;
        var fillDuration=0, updateDuration=0, insertDuration=0;
        var total = { fill: 0, update: 0, insert: 0, count: 0 };

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

        function takeInsert(callback) {
            var start = time();
            if(!app.insert) return callback();
            app.insert(20, nextTick(0, function() {
                insertDuration = time() - start;
                displayResult(0, 0, insertDuration);
                callback()
            }));
        }

        function saveResult() {
            total.fill += fillDuration;
            total.update += updateDuration;
            total.insert += insertDuration;
            total.count++

            localStorage.setItem('fill:' + app.code, (total.fill/total.count).toFixed(0));
            localStorage.setItem('update:' + app.code, (total.update/total.count).toFixed(0));
            localStorage.setItem('insert:' + app.code, (total.insert/total.count).toFixed(0));
        };

        function next() {
            app.clear(nextTick(500, function() {
                requestAnimationFrame(function() {
                    takeFill(nextTick(1000, function() {
                        requestAnimationFrame(function() {
                            takeUpdate(nextTick(1000, function() {
                                requestAnimationFrame(function() {
                                    takeInsert(function() {
                                        saveResult();
                                        setTimeout(next, 2000)
                                    })
                                });
                            }))
                        })
                    }));
                })
            }))
        }
    }

})();
