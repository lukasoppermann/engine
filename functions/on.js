// fallback for define if no amd is present
if ( typeof define !== "function" || !define.amd ) {
	var define = function(arr, fn){
		fn.call(window, window.engine);
	};
}
// addEvent
define(["engine/engine"], function(engine){
	engine.fn.on = function(event, eventHandler, time){
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
	return engine;
});