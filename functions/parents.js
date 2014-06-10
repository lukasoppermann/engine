(function(window, undefined){
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
	// Module: get parents of element	
	var parents = function(selector){
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
	// export module
	if ( typeof define === "function" && define.amd ) {		
		define(["engine/engine"], function(engine){
			engine.fn.parents = parents;
			return engine;
		});
	}
	else{ 
		engine.fn.parents = parents;		
	}

})(window);