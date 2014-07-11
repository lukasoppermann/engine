(function(define, undefined){
	// fallback for define
	if ( typeof define !== "function" || !define.amd ) {
		define = function(arr, fn){
			fn.call(window, window.engine);
		};
	}
	// export module
	define(["engine/engine"], function(engine){
		// Module: replaceClass
		engine.fn.replaceClass = function(regex, replace){
			if( regex !== undefined && regex.trim().length > 0 ){
				var regx = new RegExp('(' + regex + ')', 'g');
				this.forEach(function(el, i){
					el.className = el.className.replace(regx, replace).trim();
				});
			}
			return this;
		};
		return engine;
	});
	//	
}(window.define));