# richardson-extrapolation [![Build Status](https://travis-ci.org/scijs/richardson-extrapolation.svg)](https://travis-ci.org/scijs/richardson-extrapolation) [![npm version](https://badge.fury.io/js/richardson-extrapolation.svg)](http://badge.fury.io/js/richardson-extrapolation) [![Dependency Status](https://david-dm.org/scijs/richardson-extrapolation.svg)](https://david-dm.org/scijs/richardson-extrapolation)

> Use Richardson Extrapolation sequence acceleration to compute the order of convergence and exact value of a sequence


## Introduction

[Richardson Extrapolation](https://en.wikipedia.org/wiki/Richardson_extrapolation) is a numerical method that uses solutions at multiple values of a small parameter <img alt="h" valign="middle" src="docs/images/h-2b9e85d03c.png" width="15.5" height="18"> (think: <img alt="h" valign="middle" src="docs/images/h-2b9e85d03c.png" width="15.5" height="18"> = grid size) to accelerate the converenge of a sequence. To make that concrete, consider an method <img alt="f&lpar;h&rpar;" valign="middle" src="docs/images/fh-40c071b989.png" width="43" height="23"> that approximates the value of <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22">. Writing this as <p align="center"><img alt="f&lpar;h&rpar; &equals; f &plus; c h&Hat;n &plus; o&lpar;h&Hat;&lcub;n&plus;1&rcub;&rpar;&comma;" valign="middle" src="docs/images/fh-f-c-hn-ohn1-935ed4e5b7.png" width="234.5" height="33"></p> the unknowns are the exact value <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22">, the error constant <img alt="c" valign="middle" src="docs/images/c-414b23564a.png" width="13" height="18">, and the order of convergence <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18">.

In its current form, this module solves for two of three unknowns using the solution at two parameter sizes <img alt="h" valign="middle" src="docs/images/h-2b9e85d03c.png" width="15.5" height="18">. So for example, given the the order of convergence <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18">, you may approximate the exact value <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22"> (with error of order <img alt="o&lpar;h&Hat;&lcub;n&plus;1&rcub;&rpar;" valign="middle" src="docs/images/ohn1-b67532f9e1.png" width="72" height="23">), or given the exact value <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22">, you may solve for the order of convergence <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18">.

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

#### `require('richardson-extrapolation')( func, h, knowns )`
**Arguments:**
- `func`: a function that takes small parameter <img alt="h" valign="middle" src="docs/images/h-2b9e85d03c.png" width="15.5" height="18"> as its only argument
- `h`: either a starting parameter size or a set of parameter sizes
  - if a number, then <img alt="h" valign="middle" src="docs/images/h-2b9e85d03c.png" width="15.5" height="18"> is subdivided by a factor of 2 as needed t solve for the unknowns
  - if an array of numbers, then the first <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18"> are used as values of <img alt="h" valign="middle" src="docs/images/h-2b9e85d03c.png" width="15.5" height="18"> in order solve for <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18"> unknowns
- `knowns`: a hash of known parameters. Possibilities are:
  - <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18"> provided (solves for <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22"> and <img alt="c" valign="middle" src="docs/images/c-414b23564a.png" width="13" height="18">)
  - <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22"> provided (solves for <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18"> and <img alt="c" valign="middle" src="docs/images/c-414b23564a.png" width="13" height="18">)

**Returns**: A hash containing three values: the approximated exact value <img alt="f" valign="middle" src="docs/images/f-d5a8c687ff.png" width="16" height="22">, order of convergence <img alt="n" valign="middle" src="docs/images/n-faeb6a01dd.png" width="16" height="18">, and the constant of the error term <img alt="c" valign="middle" src="docs/images/c-414b23564a.png" width="13" height="18">.

## TODO

Implement nonlinear simultaneous equation solver as a separate module in order to solve for all three unknowns.

## Credits

(c) 2015 Ricky Reusser. MIT License