/*
 * Serialize
 *
 * @description: Serializer for HTML-Structures
 *
 * Copyright 2014, Lukas Oppermann
 * Released under the MIT license.
 */
(function( window, document, undefined ) {
	// set to strict in closure to not break other stuff
  'use strict';
	// define function
	// var serialize = function(){
	// 	console.log(engine);
	// 	// console.log(engine(this).children('.block'));
	// };
	// export module
	if ( typeof define === "function" && define.amd ) {		
		define(["engine/engine", "engine/functions/children"], function(engine){
			engine.fn.serialize =  function(){
				engine(this).children('.block-content');
				console.log(engine.selection);
				console.log(engine(this).children('.block-content')[0].prototype.parent);
				console.log(engine(this).children('.block-content')[0].prototype.domParent);
				console.log(engine(this).children('.block-content')[1].prototype.parent);
				console.log(engine(this).children('.block-content')[1].prototype.domParent);
			};
			//
			return engine;
		});
	}
	// else{ 
	// 	engine.fn.serialize = serialize;
	// }
	
}(window, document));