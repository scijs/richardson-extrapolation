'use strict'

var selectStepsize = require('./select-stepsize')
  , calculateOrderValueAndConstant = require('./calculate-order-value-and-constant')
  , calculateValueAndConstant = require('./calculate-value-and-constant')
  , calculateOrderAndConstant = require('./calculate-order-and-constant')

module.exports = Richardson

function Richardson( func, h, knowns ) {

  knowns = knowns || {}
  var n = knowns.n
  var f = knowns.f
  var numUnknowns = 1

  if( n === undefined ) numUnknowns++
  if( f === undefined ) numUnknowns++

  var hset = selectStepsize(h, numUnknowns)

  if( numUnknowns === 3 ) {
    throw new Error('richardson-extrapolation: calculation of order, value, and error term constant not yet implemented.')
    //return calculateOrderValueAndConstant( func, hset )
  } else if( numUnknowns == 2 ) {
    if( n === undefined ) {
      return calculateOrderAndConstant( func, f, hset )
    } else if( f === undefined ) {
      return calculateValueAndConstant( func, n, hset )
    }
  } else {
    throw new Error('richardson-extrapolation: invalid set of knowns and unknowns.')
  }
}

