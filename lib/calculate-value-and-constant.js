'use strict'

module.exports = calculateValueAndConstant

function calculateValueAndConstant( func, n, h ) {
  var f0 = func(h[0]),
      f1 = func(h[1])

  var h0h1n = Math.pow(h[0]/h[1],n)
  var f = (f0 - f1*h0h1n) / (1 - h0h1n)
  var c = (f0 - f) / Math.pow(h[0],n)

  return {
    f: f,
    n: n,
    c: c
  }
}
