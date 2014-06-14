(function(define, undefined){
	// POLYFILLS
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^\s+|\s+$/g, '');
	  };
	}
	// Module: addClass
	var addClass = function(classes){
		if( classes !== undefined && classes.trim().length > 0 ){
	    classes = classes.split(' ');			
			this.forEach(function(el, i){
	      for (var c = classes.length; c--;){
	        if (el.classList){
	          el.classList.add(classes[c]);
	        }else{
	          el.className += ' ' + classes[c];
	        }
	      }
			});
		}
		return this;
	};
	// export module
	if ( typeof define === "function" && define.amd ) {
		define(["engine/engine"], function(engine){
			engine.fn.addClass = addClass;
			return engine;
		});
	} 
	else {
		engine.fn.addClass = addClass;
	}
//	
}(window.define));