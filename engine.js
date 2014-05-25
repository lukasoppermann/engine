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
        var singleSelector =/^[.|#][a-z0-9-_]+$/i.test(selector);
        // get id
        if( selector[0] === '#' && singleSelector === true){
					engine.selection[0] = document.getElementById(selector.slice(1));
				// get class	
        } else if( selector[0] === '.' && singleSelector === true){
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
		chain: function(){
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
		if( typeof(fn) === 'function' && this.length > 0){
		  this.forEach(function(el, i){
				fn.call(el,el, i);
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
	
	// addEvent
	engine.fn.on = function(event, eventHandler, opts){
		this.forEach(function(el, i){
			// prepare fn and storage
			var fn = eventHandler.bind(el);
			!('events' in el) ? el['events'] = [] : '' ;
			!(event in el['events']) ? el['events'][event] = [] : '' ;
			// add event to listener and storage
			el['events'][event].push(fn);
			el.addEventListener(event, fn, false);
		});
		return this;
	};
	
	// removeEvent
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
	
	// addClass
	engine.fn.css = function(attr){
    if ('getComputedStyle' in window)
    {
			return window.getComputedStyle(this[0], null).getPropertyValue(attr).replace(/^px+|px+$/g, '');
    }
    else if ('currentStyle' in window.element)
    {
			return this[0].currentStyle[attr].replace(/^px+|px+$/g, '');
    }
    // return properties
		return this;
	};
	
}(window, document));
