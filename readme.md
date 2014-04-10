# Engine
Engine is a paste in place selector engine / wrapper facilitating modern js DOM selectors (with polyfill).

The code is deliberately kept small and only optimises selections lightly around using `getElementByID`, `getElementsByClass` and `querySelectorAll`. The strength of engine is to make it dead simple to extend it.

## Use engine to select

```javascript
_('.class') or engine('.class')
_('#id')
_('div > li') (anything that querySelectorAll eats)

var node = document.querySelectorAll('.class')[0];
_(node)
```