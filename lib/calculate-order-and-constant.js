'use strict'

module.exports = calculateOrderAndConstant

function calculateOrderAndConstant( func, f, h ) {
  var f0 = func(h[0]),
      f1 = func(h[1])

  var n = Math.log( (f0 - f) / (f1 - f) ) / Math.log( h[0] / h[1] )
  var c = (f0 - f) / Math.pow(h[0],n)

  return {
    f: f,
    n: n,
    c: c
  }
}
