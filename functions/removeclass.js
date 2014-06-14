(function(define, undefined){
	// POLYFILLS
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^\s+|\s+$/g, '');
	  };
	}
	// Module: removeClass
	var removeClass = function(classes){
		if( classes !== undefined && classes.trim().length > 0 ){
			classes = classes.split(' ');			
			this.forEach(function(el, i){
				for (var c = classes.length; c--;){
					if (el.classList){
						el.classList.remove(classes[c]);
					}else{
						el.className = el.classes.replace(new RegExp('(^| )' + classes[c].join('|') + '( |$)', 'gi'), ' ');
					}
				}
			});
		}
		return this;
	};
	// export module
	if ( typeof define === "function" && define.amd ) {
		define(["engine/engine"], function(engine){
			engine.fn.removeClass = removeClass;
			return engine;
		});
	}
	else {
		engine.fn.removeClass = removeClass;
	}
	//	
}(window.define));