(function(window, undefined){
	// addEvent
	var on = function(event, eventHandler, time){
		this.forEach(function(el, i){
			// prepare fn and storage
			var fn = function(f){
				clearTimeout( f );
				f = setTimeout(eventHandler.bind(el), (time !== undefined ? time : 10));
			}
			!('events' in el) ? el['events'] = [] : '' ;
			!(event in el['events']) ? el['events'][event] = [] : '' ;
			// add event to listener and storage
			el['events'][event].push(fn);
			el.addEventListener(event, fn, false);
		});
		return this;
	};
	
	if ( typeof define === "function" && define.amd ) {		
		define(["engine/engine"], function(engine){
			engine.fn.on = on;
			return engine;
		});
	}
	else{ 
		engine.fn.on = on; 
	}

})(window);