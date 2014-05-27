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
	// Module
	var children = function(selector, maxLvl){
		engine.selection = [];
	  this.forEach(function(el){
			var children = el.children, level = 0,
			findChild = function( children ){
				if( children !== undefined && (maxLvl === undefined || maxLvl === false || maxLvl > level ) )
				{
          level++;
          for(var i = 0; i < children.length; i++ ){
						if(selector === undefined || selector === false || children[i].matches(selector)){
							children[i].prototype = {
                depth : level
              };
							// check if child is in array
							if(engine.selection.indexOf(children[i]) === -1){
              	engine.selection.push(children[i]);
							}
            }
            findChild(children[i].children);
          }
          level--;
				}else{
          level--;
          return;
        }
      };
      findChild(children);
		});
		// return a chainable engine object
		return engine.fn.chain();
	};
	// export module
	if ( typeof define === "function" && define.amd ) {		
		define(["engine/engine"], function(engine){
			engine.fn.children = children;
			return engine;
		});
	}
	else{ 
		engine.fn.children = children;		
	}

})(window);