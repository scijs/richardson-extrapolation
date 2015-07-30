'use strict'

module.exports = selectStepsize

function selectStepsize( h, numUnknowns ) {

  if( Array.isArray( h ) ) {
    if( h.length !== numUnknowns ) {
      throw new Error('richardson-extrapolation: Number of stepsizes (' + h.length + ') not equal to number of unknowns (' + numUnknowns + ')')
    } else {
      return h
    }
  } else {
    var h0 = h
    var stepsizes = [h0]
    for(var i=1; i<numUnknowns; i++) {
      h0 /= 2
      stepsizes.push(h0)
    }
    return stepsizes
  }
}
