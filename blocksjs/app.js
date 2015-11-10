
$(function(){
  var App = blocks.Application();
  
  var Product = App.Model({
    name: App.Property(),
  
    editing: blocks.observable(false),
  
    toggleEdit: function () {
      this.editing(!this.editing());
    },
  
    remove: function () {
      this.destroy(true);
    }
  });
  
  var Products = App.Collection(Product);
  var model = {
      products: Products([])
  };
  App.View('Blocksjs', model);

  ENV.append({
    code: 'blocksjs',
    clear:function(callback) {
      model.products.removeAll();
      callback()
    },
    fill: function (n, callback) {
        var i, data = [];
        for (i = 0; i < n; i += 1) {
            data.push({ name:i });
        }
        model.products.push.apply(model.products, data);
        callback()
    },
    update: function (n, callback) {
        var i, v, data = model.products();
        for (i = 0; i < n; i += 1) {
          v = data[i].name();
          data[i].name(v + ' ' + v);
        }
        callback()
    }
  });
});
