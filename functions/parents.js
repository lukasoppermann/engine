// POLYFILLS
if (window.Element){
	(function(ElementPrototype) {
		ElementPrototype.matches = ElementPrototype.matchesSelector =
    ElementPrototype.matchesSelector ||
		ElementPrototype.webkitMatchesSelector ||
		ElementPrototype.mozMatchesSelector ||
		ElementPrototype.msMatchesSelector ||
		ElementPrototype.oMatchesSelector ||
		function (selector) {
      var nodes = (this.parentNode || this.document).querySelectorAll(selector), i = -1;
			while (nodes[++i] && nodes[i] !== this);
			return !!nodes[i];
		};
	})(window.Element.prototype);
}	
// fallback for define if no amd is present
if ( typeof define !== "function" || !define.amd ) {
	var define = function(arr, fn){
		fn.call(window, window.engine);
	};
}
// export module
define(["engine/engine"], function(engine){
	// Module: get parents of element	
	engine.fn.parents = function(selector){
		engine.selection = [];
	  this.forEach(function(el, i){
			el = el.parentNode;
			if( selector !== undefined ){
			  while(el.parentNode !== null && !el.matches(selector) && el.nodeName !== 'BODY'){
			    el = el.parentNode;
			  }
				el.matches(selector) && engine.selection.indexOf(el) === -1 ? engine.selection.push(el) : '';
			}else if(el !== null){
				if(engine.selection.indexOf(el) === -1){
					engine.selection.push(el);
				}
			}
		});
		// return a chainable engine object
		return engine.chain();
	};
	return engine;
});