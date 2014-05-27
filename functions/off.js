(function(window, undefined){
	// removeEvent
	var off = function(event, eventHandler){
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
	
	if ( typeof define === "function" && define.amd ) {		
		define(["engine/engine"], function(engine){
			engine.fn.off = off;
			return engine;
		});
	}
	else{ 
		engine.fn.off = off; 
	}

})(window);