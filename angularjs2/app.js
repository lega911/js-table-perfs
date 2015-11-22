
var AppComponent = ng.
  Component({
    selector: 'my-app'
  }).
  View({
    directives: [ng.NgFor],
    templateUrl: 'app-component.html'
  }).
  Class({
    constructor: function AppComponent() {
      scope = this;
      scope.name = 'test';
      scope.items = [];
      var appZone = zone;

      ENV.append({
          code: 'angularjs2',
          clear: clear,
          fill: fill,
          update: update,
          insert: insert
      });

      function clear(callback) {
        scope.items.length = 0;
        appZone.run(function(){});
        callback();
      }

      function fill(n, callback) {
        var i;
        for (i = 0; i < n; i += 1) {
            scope.items.push({ t:i });
        }
        appZone.run(function(){});
        callback();
      };

      function update(n, callback) {
        var i,
        items = scope.items;
        for (i = 0; i < n; i += 1) {
            items[i].t += ' ' + items[i].t;
        }

        appZone.run(function(){});
        callback();
      };

      function insert(n, callback) {
        scope.items.splice(n, 0, { t:'xx' });

        appZone.run(function(){});
        callback();
      };

    }
  });

document.addEventListener('DOMContentLoaded', function() {
  ng.bootstrap(AppComponent);
});