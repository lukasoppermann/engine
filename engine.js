/*
 * Engine
 *
 * @description: Paste in place easily extendable selector engine
 *
 * Copyright 2014, Lukas Oppermann
 * Released under the MIT license.
 */
// IE8+
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
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
	//
	
  // selection engine
	var instance = null;
	function engine( selector, context ){
		if ( !instance ){
    	instance = new engine.fn.init(selector, context);
		}
		return instance.init(selector, context);
  };
  // expose engine
  window.engine = window._ = engine;
  // set prototype
  engine.fn = engine.prototype = {
    version: 0.1,
    //init
    init: function(selector, context)
    {
			engine.selection = [];
      context = context || document;
			
      if( !selector ){
        return engine.fn;
      }

      if ( typeof selector === "string" ){
        selector = selector.trim();
        var idx = selector.indexOf(' ');
        // get id
        if( idx === -1 && selector[0] === '#'){
            engine.selection[0] = document.getElementById(selector.slice(1));
				// get class	
        } else if( idx === -1 && selector[0] === '.' ){
          engine.selection = document.getElementsByClassName(selector.slice(1));
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
        engine.fn[0] = selector;
      }
      // if a nodelist is passed
      else if ( typeof(selector) === "object" && selector[0].nodeType ) {
        for (var i = 0; i < selector.length; i++ ) {
          engine.fn[ i ] = selector[ i ];
        }
      }
      // add fns to array
      for (var key in engine.fn) {
        if (engine.fn.hasOwnProperty(key))
          engine.selection[key] = engine.fn[key];
      }

      return engine.selection;
    }
  };

	// EXTENDING engine
	// any of these can be deleted

	// each loop through selectors
	engine.fn.each = function( fn ){
		if( typeof(fn) === 'function' ){
		  this.forEach(function(el, i){
		    fn(el, i);
		  });
		}
		return this;
	};
	
	// parent
	engine.fn.parent = function(selector){
		var p = [];
	  this.forEach(function(el, i){
			el = el.parentNode;
			if( selector !== undefined ){
			  while(el.parentNode !== null && !el.matches(selector) && el.nodeName !== 'BODY'){
			    el = el.parentNode;
			  }
				el.matches(selector) ? p.push(el) : '';
			}else if(el !== null){
				p.push(el);
			}
		});
		this.selection = p;
		return this.selection;
	};

}(window, window.document));
