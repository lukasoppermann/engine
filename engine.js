/*
 * Engine
 *
 * @description: Paste in place easily extendable selector engine
 *
 * Copyright 2014, Lukas Oppermann
 * Released under the MIT license.
 */
(function( window, document, undefined ) {
	// set to strict in closure to not break other stuff
  'use strict';
	// POLYFILLS
	if (!document.querySelectorAll) {
	  document.querySelectorAll = function (selectors) {
	    var style = document.createElement('style'), elements = [], element;
	    document.documentElement.firstChild.appendChild(style);
	    document._qsa = [];

	    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
	    document.window.scrollBy(0, 0);
	    style.parentNode.removeChild(style);

	    while (document._qsa.length) {
	      element = document._qsa.shift();
	      element.style.removeAttribute('x-qsa');
	      elements.push(element);
	    }
	    document._qsa = null;
	    return elements;
	  };
	}
	if (!document.getElementsByClassName) {
	  document.getElementsByClassName = function (classNames) {
	    classNames = String(classNames).replace(/^|\s+/g, '.');
	    return document.querySelectorAll(classNames);
	  };
	}
  // selection engine
	var instance = null;
	function engine( selector, context ){
		if ( !instance ){
    	instance = new engine.fn.find(selector, context);
		}
		return instance.find(selector, context);
  };
  // expose engine
	if ( typeof define === "function" && define.amd ) {
    define(function() {
			return engine;
    });
	}
	else{ window.engine = window._ = engine; }
	// version
	engine.version = 0.2;
	// extend 
	engine.extend = function(out){
	  out = out || {};
	  for (var i = 1; i < arguments.length; i++) 
		{
	    var obj = arguments[i];
	    if ( !obj ){
	      continue;
			}
			for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        if (typeof obj[key] === 'object'){
	          engine.extend(out[key], obj[key]);
	        }
					else
					{
	          out[key] = obj[key];
					}
	      }
	    }
	  }
	  return out;
	};
	// chain
	engine.chain = function(){
    // add fns to array
    for (var key in engine.fn) {
      if (engine.fn.hasOwnProperty(key) && isNaN(key))
        engine.selection[key] = engine.fn[key];
    }
		// return selection
		return engine.selection;
	};
  // set prototype
  engine.fn = engine.prototype = {
    //init
    find: function(selector, context)
    {
			// if no selector is present
			if( !selector ){ return engine.fn; }
			// add selection var
			engine.selection = [];
			// check context
			if( typeof(context) === "object" && context[0] !== undefined && context[0].nodeType ) {
				context = context[0];
			}else if( typeof(context) === "object" && context.nodeType ){
				context = context;
			}else if( typeof(context) === "string" ){
				context = _(context)[0];
			}else{
				context = document;
			}
			// traverse DOM
      if ( typeof selector === "string" ){
        selector = selector.trim();
        var singleSelector =/^[.|#][a-z0-9-_]+$/i.test(selector);
        // get id
        if( selector[0] === '#' && singleSelector === true){
					engine.selection[0] = document.getElementById(selector.slice(1));
				// get class	
        } else if( selector[0] === '.' && singleSelector === true){
          engine.selection = Array.prototype.slice.call(context.getElementsByClassName(selector.slice(1)),0);
				// else
				}else{
          selector = context.querySelectorAll(selector);
          for (var i = 0; i < selector.length; i++ ) {
            engine.selection[ i ] = selector[ i ];
          }
        }
      }
      // if a node is passed
      else if ( selector.nodeType ){
        engine.selection[0] = selector;
      }
      // if a nodelist is passed
      else if ( typeof(selector) === "object" && selector[0].nodeType ) {
        for (var i = 0; i < selector.length; i++ ) {
          engine.selection[ i ] = selector[ i ];
        }
      }
			// keep chain going
			return engine.chain();

    },
  };	
}(window, document));
