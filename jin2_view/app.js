ENV.append({
    code : 'jin2_view',
    clear : function( done ){
        $jin2_demo_jtt.widget().doClear( done )
    },
    fill : function( count , done ){
        $jin2_demo_jtt.widget().doFill( count , done )
    },
    update : function( count , done ){
        $jin2_demo_jtt.widget().doUpdate( count , done )
    },
    insert : function( index , done ){
        $jin2_demo_jtt.widget().doInsert( index , done )
    },
})

$( function( ){
    document.body.appendChild( $jin2_demo_jtt.widget().get() )
})
