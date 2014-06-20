(function(define, undefined){
	// POLYFILLS
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^\s+|\s+$/g, '');
	  };
	}
	// fallback for define
	if ( typeof define !== "function" || !define.amd ) {
		define = function(arr, fn){
			fn.call(window, window.engine);
		};
	}
	// export module
	define(["engine/engine"], function(engine){
		// Module: hasClass
		engine.fn.hasClass = function(classname){
			var has = true;
			this.forEach(function(el, i){
				if( !el.classList.contains(classname) )
				{
					has = false;
					return;
				}
			});
			return has;
		};
		return engine;
	});
//	
}(window.define));