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
	if (window.Element){
		(function(ElementPrototype) {
			ElementPrototype.matches = ElementPrototype.matchesSelector =
	    ElementPrototype.matchesSelector ||
			ElementPrototype.webkitMatchesSelector ||
			ElementPrototype.mozMatchesSelector ||
			ElementPrototype.msMatchesSelector ||
			ElementPrototype.oMatchesSelector ||
			function (selector) {
	      var nodes = (this.parentNode || this.document).querySelectorAll(selector), i = -1;
				while (nodes[++i] && nodes[i] !== this);
				return !!nodes[i];
			};
		})(window.Element.prototype);
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
        var idx = selector.indexOf(' ');
        // get id
        if( idx === -1 && selector[0] === '#'){
					engine.selection[0] = document.getElementById(selector.slice(1));
				// get class	
        } else if( idx === -1 && selector[0] === '.' ){
          engine.selection = context.getElementsByClassName(selector.slice(1));
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
			// keep chain going
			return engine.fn.chain();

    },
		
		// chain
		chain: function()
		{
      // add fns to array
      for (var key in engine.fn) {
        if (engine.fn.hasOwnProperty(key))
          engine.selection[key] = engine.fn[key];
      }
			// return selection
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
	
	// parents
	engine.fn.parents = function(selector){
		engine.selection = [];
	  this.forEach(function(el, i){
			el = el.parentNode;
			if( selector !== undefined ){
			  while(el.parentNode !== null && !el.matches(selector) && el.nodeName !== 'BODY'){
			    el = el.parentNode;
			  }
				el.matches(selector) && engine.selection.indexOf(el) === -1 ? engine.selection.push(el) : '';
			}else if(el !== null){
				if(engine.selection.indexOf(el) === -1){
					engine.selection.push(el);
				}
			}
		});
		// keep chain going
		return engine.fn.chain();
	};
	
	// children
	engine.fn.children = function(selector, maxLvl){
		engine.selection = [];
	  this.forEach(function(el){
      var children = el.children, level = 0,
			findChild = function( children ){
        if( children !== undefined && (maxLvl === undefined || maxLvl === false || maxLvl > level ) )
        {
          level++;
          for(var i = 0; i < children.length; i++ ){
            if(selector === undefined || selector === false || children[i].matches(selector)){
              children[i].prototype = {
                depth : level
              };
							// check if child is in array
							if(engine.selection.indexOf(children[i]) === -1){
              	engine.selection.push(children[i]);
							}
            }
            findChild(children[i].children);
          }
          level--;
        }else{
          level--;
          return;
        }
      };
      findChild(children);
		});
		return engine.fn.chain();
	};
	
	// addClass
	engine.fn.addClass = function(classes){
		if( classes !== undefined && classes.trim().length > 0 ){
      classes = classes.split(' ');			
			this.forEach(function(el, i){
        for (var c = classes.length; c--;){
          if (el.classList){
            el.classList.add(classes[c]);
          }else{
            el.className += ' ' + classes[c];
          }
        }
			});
		}
		return this;
	};
	
	// removeClass
	engine.fn.removeClass = function(classes){
		if( classes !== undefined && classes.trim().length > 0 ){
      classes = classes.split(' ');			
			this.forEach(function(el, i){
        for (var c = classes.length; c--;){
          if (el.classList){
            el.classList.remove(classes[c]);
          }else{
						el.className = el.classes.replace(new RegExp('(^| )' + classes[c].join('|') + '( |$)', 'gi'), ' ');
          }
        }
			});
		}
		return this;
	};
	
}(window, document));
