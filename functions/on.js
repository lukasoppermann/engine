(function(define, undefined){
	// fallback for define
	if ( typeof define !== "function" || !define.amd ) {
		define = function(arr, fn){
			fn.call(window, window.engine);
		};
	}
	// export module
	define(["engine/engine"], function(engine){
		// Module: addEvent
		engine.fn.on = function(event, eventHandler, target, time){
			// set time
			time = (typeof target === "number" ? target : (time !== undefined ? time : 10));
			if(this.length > 0 && this[0] != null){

				this.forEach(function(el, i){
					// console.log(target);
					// target = ( target === undefined || typeof target === "number" ? el : engine.fn.find(target, engine.fn.find(el))[0] );
					// console.log(target);
					// console.log('***');
					// prepare fn and storage
					var fn = function(e, f){
						e = event || window.event;
						clearTimeout( f );
						f = setTimeout(eventHandler.bind(el, e), time);
					}
					!('events' in el) ? el['events'] = [] : '' ;
					!(event in el['events']) ? el['events'][event] = [] : '' ;
					// add event to listener and storage
					el['events'][event].push(fn);
					el.addEventListener(event, fn, false);
				});
				
			}
				
			return this;
		};
		return engine;
	});
//	
}(window.define));