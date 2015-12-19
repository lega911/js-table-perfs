class $jin2_demo_jtt extends $jin2_view {
	
	@$jin2_lazy
	static widget( id : string ) {
		return new this()
	}

	@$jin2_lazy
	items() {
		return new $jin2_atom<$jin2_demo_jtt_item[]>( prev => [] )
	}

	child() {
		return this.items()
	}

	tagName() {
		return { get : () => 'ul' }
	}
	
	@$jin2_lazy
	item( id ) { 
		return new $jin2_demo_jtt_item 
	}


	doClear( done ) {
		this.items().set([])
		$jin2_atom.induce()
		done()
	}

	doFill( count , done ) {
		var items = []
		for( var i = 0; i < count; i += 1 ){
			items.push( this.item( i ) )
		}
		this.items().set( items )
		$jin2_atom.induce()
		done()
	}

	doUpdate( count , done ) {
		this.items().get().forEach( ( item , index ) => {
			item.val().mutate( prev => prev + ' ' + prev ) 
		})
		$jin2_atom.induce()
		done()
	}

	doInsert( index , done ) {
		this.items().mutate( prev => {
			prev.splice( index , 0 , this.item( 'xx' ) )
			return prev
			//return prev.slice( 0 , index ).concat( this.item( 'xx' ) ).concat( prev.slice( index ) )
		})
		this.items().notify()
		$jin2_atom.induce()
		done()
	}

}

class $jin2_demo_jtt_item extends $jin2_view {

	@$jin2_lazy
	val() {
		return new $jin2_atom( prev => '' + this.objectId )
	}
	
	tagName() {
		return { get : () => 'li' }
	}
	
	child() {
		return { get : () => [ 'jj: ' + this.val().get() ] }
	}

}
