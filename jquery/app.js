'use strict';

ENV.append({
    code: 'jquery',
    clear: jqClear,
    fill: jqFill,
    update: jqUpdate
})

function jqClear(callback) {
    $("#jq-list").html('');
    callback()
}

function jqFill(n, callback) {
    var i, li,
    ul = $("#jq-list");
    for (i = 0; i < n; i += 1) {
        li = '<li>jj: <span id="jq-list-' + i + '">' + i + '</span></li>';
        ul.append(li);
    };
    callback()
}

function jqUpdate(n, callback) {
    var i, el,
    ul = $("#jq-list");
    for (i = 0; i < n; i += 1) {
        el = $('#jq-list-' + i);
        el.html(el.html() + ' ' + i);
    };
    callback()
}
