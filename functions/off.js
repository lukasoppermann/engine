// fallback for define if no amd is present
if ( typeof define !== "function" || !define.amd ) {
	var define = function(arr, fn){
		fn.call(window, window.engine);
	};
}
// removeEvent	
define(["engine/engine"], function(engine){
	engine.fn.off = function(event, eventHandler){
		if(event !== undefined)
		{
			if( eventHandler !== undefined )
			{
				this.forEach(function(el, i){
					el.removeEventListener(event, eventHandler, false);
				});
			}
			else
			{
				this.forEach(function(el, i){
					if( ('events' in el) && (event in el['events']) )
					{
						el['events'][event].forEach(function(ev, l){
		 					el.removeEventListener(event, ev, false);
		 				});
					}
				});
			}
		}
		else
		{
			this.forEach(function(el, i){
				if( 'events' in el )
				{
					for(event in el['events'])
					{
						el['events'][event].forEach(function(ev, l){
		 					el.removeEventListener(event, ev, false);
		 				});
					}
				}
			});
		}
		return this;
	};
	return engine;
});