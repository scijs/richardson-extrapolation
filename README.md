# richardson-extrapolation [![Build Status](https://travis-ci.org/scijs/richardson-extrapolation.svg)](https://travis-ci.org/scijs/richardson-extrapolation) [![npm version](https://badge.fury.io/js/richardson-extrapolation.svg)](http://badge.fury.io/js/richardson-extrapolation) [![Dependency Status](https://david-dm.org/scijs/richardson-extrapolation.svg)](https://david-dm.org/scijs/richardson-extrapolation)

> Use Richardson Extrapolation sequence acceleration to compute the order of convergence and exact value of a sequence


## Introduction

[Richardson Extrapolation](https://en.wikipedia.org/wiki/Richardson_extrapolation) is a numerical method that uses solutions at multiple values of a small parameter <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18"> (think: <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18"> = grid size) to accelerate the converenge of a sequence. To make that concrete, consider an method <img alt="undefined" valign="middle" src="images/fh-3caba7f6fa.png" width="43" height="24"> that computes an approximate value of the exact value <img alt="undefined" valign="middle" src="images/f-58027db718.png" width="16" height="22">. Writing this as <p align="center"><img alt="undefined" valign="middle" src="images/fh-f-c-hn-ohn1-f5a5766d32.png" width="234.5" height="26.5"></p> it's clear that, given a set of values of <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18">, the unknowns are the exact value <img alt="undefined" valign="middle" src="images/f-58027db718.png" width="16" height="22"> (approximate, with error term <img alt="undefined" valign="middle" src="images/ohn1-1a69cde86d.png" width="72" height="25.5">), the error constant <img alt="undefined" valign="middle" src="images/c-7a405d3eea.png" width="13" height="13">, and the order of convergence <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13">.

In its current form, this module solves for two of three parameters using the solution at two parameter sizes <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18">. So for example, given the the order of convergence <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13">, you may solve for the exact value <img alt="undefined" valign="middle" src="images/f-58027db718.png" width="16" height="22"> with error of order <img alt="undefined" valign="middle" src="images/ohn1-1a69cde86d.png" width="72" height="25.5">, or given the exact value <img alt="undefined" valign="middle" src="images/f-58027db718.png" width="16" height="22">, you may solve for the order of convergence <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13">.

The solution of all three unknowns requires the solution of a set of three nonlinear equations and is not implemented yet. :(

## Install

```bash
$ npm install richardson-extrapolation
```

## Example

```javascript
var richardson = require('richardson-extrapolation')

// Exact value = 3.5
// Order of convergence = 3
function func( h ) {
  return 3.5 + 2.0 * Math.pow( h, 3 )
}


// Solve for the order of convergence:
richardson( func, 1, { f: 3.5 } )
// => { f: 3.5,  n: 3,  c: 2 }


// Approximate the the exact value given order of convergence:
richardson( func, 1, { n: 3 } )
// => { f: 3.5,  n: 3,  c: 2 }
```


## API

### `require('richardson-extrapolation')( func, h, knowns )`
**Arguments:**
- `func`: a function that takes small parameter <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18"> as its only argument
- `h`: either a starting parameter size or a set of parameter sizes
  - if a number, then <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18"> is subdivided by a factor of 2 as needed t solve for the unknowns
  - if an array of numbers, then the first <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13"> are used as values of <img alt="undefined" valign="middle" src="images/h-a627851cd6.png" width="15.5" height="18"> in order solve for <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13"> unknowns

**Returns**: A hash containing three values: the approximated exact value <img alt="undefined" valign="middle" src="images/f-58027db718.png" width="16" height="22">, order of convergence <img alt="undefined" valign="middle" src="images/n-66e1b1ee17.png" width="16" height="13">, and the constant of the error term <img alt="undefined" valign="middle" src="images/c-7a405d3eea.png" width="13" height="13">.

## TODO

Implement nonlinear simultaneous equation solver as a separate module in order to solve for all three unknowns.

## Credits

(c) 2015 Ricky Reusser. MIT License