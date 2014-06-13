// fallback for define if no amd is present
if ( typeof define !== "function" || !define.amd ) {
	var define = function(arr, fn){
		fn.call(window, window.engine);
	};
}
// export module
define(["engine/engine"], function(engine){
	// Module: css getter and setter
	engine.fn.css = function(attr, val){
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
	return engine;
});