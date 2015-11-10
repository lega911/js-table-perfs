// Code goes here

$(function() {

  var rapp = React.createClass({
    displayName: 'rapp',
      render: function() {
        var data = this.props.data;
  
        var rows = data.map(function(row) {
          return (
            React.DOM.li(null, 'jj: ' + row)
          );
        });
  
        return (
          React.DOM.ul(null,
            rows
          )
        );
      }
  });
  
  var list = [];

  var r = React.renderComponent(
    rapp({data: list}),
    document.getElementById('react')
  );

  function clear(callback) {
    list.length = 0;
    r.setState({data: list});
    callback()
  };
  
  function fill(n, callback) {
    for(var i=0;i<n;i++) {
      list.push(''+i)
    }
    r.setState({data: list});
    callback()
  };
  
  function update(n, callback) {
    for(var i=0;i<n;i++) {
      list[i] += ' ' + i
    }
    r.setState({data: list});
    r.render();
    callback()
  };
  
  ENV.append({
    code: 'reactjs',
    clear: clear,
    fill: fill,
    update: update
  });

});
