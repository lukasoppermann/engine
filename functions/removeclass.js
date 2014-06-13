// POLYFILLS
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
// fallback for define if no amd is present
if ( typeof define !== "function" || !define.amd ) {
	var define = function(arr, fn){
		fn.call(window, window.engine);
	};
}
// export module
define(["engine/engine"], function(engine){
	// Module: removeClass
	engine.fn.removeClass = function(classes){
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
	return engine;
});