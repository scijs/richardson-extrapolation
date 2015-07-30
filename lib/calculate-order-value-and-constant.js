'use strict'

module.exports = calculateOrderValueAndConstant

function calculateOrderValueAndConstant( func, h ) {
  var n, f, c,
      f0 = func(h[0]),
      f1 = func(h[1]),
      f2 = func(h[2])

  //f = f[0] - f[1]*Math.

  // NOT YET IMPLEMENTED


  return {
    n: n,
    f: f,
    c: c
  }
}
