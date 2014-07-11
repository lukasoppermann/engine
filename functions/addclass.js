(function(define, undefined){
	// fallback for define
	if ( typeof define !== "function" || !define.amd ) {
		define = function(arr, fn){
			fn.call(window, window.engine);
		};
	}
	// export module
	define(["engine/engine"], function(engine){
		// Module: addClass
		engine.fn.addClass = function(classes){
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
		return engine;
	});
//	
}(window.define));