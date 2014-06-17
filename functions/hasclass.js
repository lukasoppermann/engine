(function(define, undefined){
	// POLYFILLS
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^\s+|\s+$/g, '');
	  };
	}
	// Module: hasClass
	var hasClass = function(classname){
		if( el.classList.contains(classname) )
		{
			return true;
		}
		return false;
	};
	// export module
	if ( typeof define === "function" && define.amd ) {
		define(["engine/engine"], function(engine){
			engine.fn.hasClass = hasClass;
			return engine;
		});
	} 
	else {
		engine.fn.hasClass = hasClass;
	}
//	
}(window.define));