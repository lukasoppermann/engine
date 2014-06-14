(function(define, undefined){
	// Module: each - loops through selections
	var each = function( fn ){
		if( typeof(fn) === 'function' && this.length > 0){
		  this.forEach(function(el, i){
				fn.call(el,el, i);
		  });
		}
		return this;
	};
	// export module
	if ( typeof define === "function" && define.amd ) {
		define(["engine/engine"], function(engine){
			engine.fn.each = each;
			return engine;
		});
	} 
	else {
		engine.fn.each = each;		
	}
//	
}(window.define));