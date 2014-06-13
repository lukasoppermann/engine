// fallback for define if no amd is present
if ( typeof define !== "function" || !define.amd ) {
	var define = function(arr, fn){
		fn.call(window, window.engine);
	};
}
// export module
define(["engine/engine"], function(engine){
	// Module: each - loops through selections
	engine.fn.each = function( fn ){
		if( typeof(fn) === 'function' && this.length > 0){
		  this.forEach(function(el, i){
				fn.call(el,el, i);
		  });
		}
		return this;
	};
	return engine;
});