(function(define, document, undefined){
	// fallback for define
	if ( typeof define !== "function" || !define.amd ) {
		define = function(arr, fn){
			fn.call(window, window.engine);
		};
	}
	// export module
	define(["engine/engine"], function(engine){
		// Module: create
		engine.create = function(htmlString, string){
			
			var doc = document.createElement('div');
			
			if( typeof(htmlString) === "string" )
			{
				// create closing tag
				var closingTag = htmlString;
				var index = htmlString.indexOf(' ');
				if( index >= 0)
				{
					closingTag = htmlString.substr(0,index);
				}
				// close
				closingTag.replace('<','</');
				// create element
				doc.innerHTML = htmlString+closingTag;
			}
			else
			{
				if( typeof(htmlString[0]) === "object" )
				{
					doc.appendChild(htmlString[0]);
				}
				else
				{
					doc.appendChild(htmlString);
				}
			}
			// return string
			if( string === true )
			{
				return doc.innerHTML;
			}
			// return node
			return doc.children[0];
		};
		
		// Module: after
		engine.fn.after = function( element ){

			this.forEach(function(el, i){
				el.insertAdjacentHTML('afterend', engine.create(element, true));
			});
			return this;
		}

		// Module: before
		engine.fn.before = function( element ){
			this.forEach(function(el, i){
				el.insertAdjacentHTML('beforebegin', engine.create(element, true));
			});
			return this;
		}

		// Module: before
		engine.fn.append = function( element ){
			this.forEach(function(el, i){
				el.appendChild(engine.create(element));
			});
			return this;
		}
		
		return engine;
	});
//	
}(window.define, document));