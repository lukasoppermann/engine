(function(window, define, undefined){
	// fallback for define
	if ( typeof define !== "function" || !define.amd ) {
		define = function(arr, fn){
			fn.call(window, window.engine);
		};
	}
	// export module
	define(["engine/engine"], function(engine){
		// Module: css getter and setter
		engine.fn.css = function(attr, val){
			if( attr !== undefined )
			{
				if( val === undefined )
				{
			    if ('getComputedStyle' in window)
			    {
						return window.getComputedStyle(this[0], null).getPropertyValue(attr).replace(/^px+|px+$/g, '');
			    }
			    else if ('currentStyle' in window.element)
			    {
						return this[0].currentStyle[attr].replace(/^px+|px+$/g, '');
			    }
				}
				else
				{
					this.forEach(function(el, i){
						el.style[attr] = val;
					});
				}
			}
	    // return properties
			return this;
		};
		return engine;
	});
//	
}(window, window.define));