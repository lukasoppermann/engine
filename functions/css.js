(function(window, undefined){
	// Module: css getter and setter
	var css = function(attr, val){
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
			this[0].style[attr] = val;
		}
    // return properties
		return this;
	};
	// export module
	if ( typeof define === "function" && define.amd ) {		
		define(["engine/engine"], function(engine){
			engine.fn.css = css;			
			return engine;
		});
	}
	else{ 
		engine.fn.css = css;
	}

})(window);