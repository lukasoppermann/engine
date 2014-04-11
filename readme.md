# Engine
Engine is a paste in place selector engine / wrapper facilitating modern js DOM selectors (with polyfill).

The code is deliberately kept small and only optimises selections lightly around using `getElementByID`, `getElementsByClass` and `querySelectorAll`. The strength of engine is to make it dead simple to extend it.

## Use engine to select

You can use `engine(selector)` or the shortcut `_(selector)` to get a selection of DOM-Elements. 

```javascript
engine('.class')
_('#id')
_('div > li') (anything that querySelectorAll eats)

var node = document.querySelectorAll('.class')[0];
_(node)
```

As a return value you get an array of the DOM-Selection 

```Javascript
[<div class="class">DOM Element</div>]
```

## Extending engine

Engine is build to easily add functionality like `parent()` or `each()` to a selection of DOM elements.

To extend engine simply add your function to `engine.fn` like so:
```javascript
engine.fn.each = function( fn ){
	if( typeof(fn) === 'function' ){
	  this.forEach(function(el, i){
	    fn(el, i);
	  });
	}
	return this; // return this to enable chaining
};
```
 