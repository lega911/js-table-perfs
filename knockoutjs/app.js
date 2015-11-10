'use strict';

function KoApp() {
    var self = this;
    self.items = ko.observableArray([]);
    self.fill = function (n, callback) {
        var i,
        items = [];
        for (i = 0; i < n; i += 1) {
            items.push({
                val: ko.observable(i)
            });
        }
        self.items(items);
        callback();
    };
    self.update = function (n, callback) {
        var i;
        ko.utils.arrayForEach(self.items(), function (item) {
            item.val(item.val() + ' ' + item.val());
        });
        callback();
    };
    self.clear = function (callback) {
        self.items([]);
        callback();
    };
}
var koApp = new KoApp();
$(function() {
  ko.applyBindings(koApp, $('#ko-list').get(0));
});

ENV.append({
    code: 'knockoutjs',
    clear: koApp.clear,
    fill: koApp.fill,
    update: koApp.update
})