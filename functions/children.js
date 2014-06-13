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
	// Module children
	engine.fn.children = function(selector, maxLvl){
		engine.selection = [];
	  this.forEach(function(el){
			var children = el.children, id = domLevel = level = 0, leveled = false, p = undefined,
			findChild = function( children, parent ){
				if( children !== undefined && (maxLvl === undefined || maxLvl === 0 || maxLvl === false || maxLvl > level ) )
				{
          domLevel++;
          for(var i = 0; i < children.length; i++ ){
						if(selector === undefined || selector === false || children[i].matches(selector)){
							level++;
							leveled = true;
              children[i].prototype = {
              	domLevel: domLevel,
								level: level,
								id: id++
              };
							if( parent )
							{
								children[i].prototype.parent = parent.parent;
								children[i].prototype.parentId = parent.id;
								children[i].prototype.domParent = parent.domParent;
							}
							p = children[i];
							// check if child is in array
							if(engine.selection.indexOf(children[i]) === -1){
              	engine.selection.push(children[i]);
							}
            }
            findChild(children[i].children, {'parent':p, id:p.prototype.id,'domParent': children[i]});
          }
				}
				// level within selected elements
				if(leveled === true){
					p = p.prototype.parent;
					level--;
					leveled = false;
				}
				// level in actual dom structure
        domLevel--;
      };
      findChild(children, {'parent': undefined, 'domParent': el});
		});
		// return a chainable engine object
		return engine.chain();
	};
	return engine;
});
