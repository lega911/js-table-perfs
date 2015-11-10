$jin.sample.strings( '<ul my-app-list="">{items}</ul><li my-app-item="">atom: <span my-app-item-val="">{val}</span></li>' )

$jin.klass({ '$my.app.list': [ '$jin.view' ] })
$jin.atom.prop.list({ '$my.app.list..items': {} })
$jin.method({ '$my.app.list..clear': function( done ){
    this.items( [] )
    done()
}})
$jin.method({ '$my.app.list..fill': function( count, done ){
    var items = []
    var prefix = this.id() + ';item='
    for( var i = 0; i < count; i += 1 ){
        items.push( $my.app.item( prefix + i ).val( i ) )
    }
    this.items( items )
    done()
}})
$jin.method({ '$my.app.list..update': function( count, done ){
    var items = this.items()
    for( var i = 0; i < count; i += 1 ){
        var item = items[i]
        var val = item.val()
        item.val( val + ' ' + val )
    }
    done()
}})

$jin.klass({ '$my.app.item': [ '$jin.view' ] })
$jin.atom.prop({ '$my.app.item..val': {} })

var atomApp = $my.app.list( 'list' )
atomApp.code = 'atom'

ENV.append(atomApp)

$( function( ){
  atomApp.element().parent( $('#atom-list').get(0) )
})
