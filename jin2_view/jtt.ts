class $jin2_demo_jtt extends $jin2_view {
	
	@$jin2_lazy
	static widget( id : string ) { return new this() }

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
		})
		this.items().notify()
		$jin2_atom.induce()
		done()
	}

	@$jin2_lazy
	items() { return new $jin2_atom<$jin2_demo_jtt_row[]>({
		pull_ : prev => []
	}) }

	child() { return this.items() }

	@$jin2_lazy
	tagName() { return new $jin2_prop({
		pull_ : () => 'ul'
	}) }
	
	@$jin2_lazy
	item( id ) { return new $jin2_demo_jtt_row() }
}

class $jin2_demo_jtt_row extends $jin2_view {

	@$jin2_lazy
	val() { return new $jin2_atom<string>({
		pull_ : prev => '' + this.objectId
	}) }
	
	@$jin2_lazy
	tagName() { return new $jin2_prop({
		pull_ : () => 'li'
	}) }
	
	@$jin2_lazy
	child() { return new $jin2_prop<any[]>({
		pull_ : prev => [ 'jj: ' + this.val().get() ],
	}) }

}
