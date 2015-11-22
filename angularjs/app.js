'use strict';

var ngApp = angular.module('list', []);
ngApp.controller('ListCtrl', ['$scope', function ($scope) {
    $scope.items = [];
    $scope.fill = function (n) {
        var i;
        for (i = 0; i < n; i += 1) {
            $scope.items.push({ t:i });
        }
    };
    $scope.update = function (n) {
        var i,
        items = $scope.items;
        for (i = 0; i < n; i += 1) {
            items[i].t += ' ' + items[i].t;
        }
    };
    $scope.insert = function (n) {
        $scope.items.splice(n, 0, { t:'xx' })
    };
}]);
ngApp.fill = function (n, callback) {
    var scope = angular.element($('#ng-list')).scope();
    scope.$apply(function () {
        scope.fill(n);
    });
    callback();
};
ngApp.update = function (n, callback) {
    var scope = angular.element($('#ng-list')).scope();
    scope.$apply(function () {
        scope.update(n);
    });
    callback();
};
ngApp.insert = function (n, callback) {
    var scope = angular.element($('#ng-list')).scope();
    scope.$apply(function () {
        scope.insert(n);
    });
    callback();
};
ngApp.clear = function (callback) {
    var scope = angular.element($('#ng-list')).scope();
    scope.$apply(function () {
        scope.items = [];
    });
    callback();
};

ENV.append({
    code: 'angularjs',
    clear: ngApp.clear,
    fill: ngApp.fill,
    update: ngApp.update,
    insert: ngApp.insert
})
