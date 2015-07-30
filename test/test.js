'use strict'

var richardson = require('../lib')
  , assert = require('chai').assert
  , selectStepsize = require('../lib/select-stepsize')

describe('stepsize selection', function() {
  describe('with stepsizes provided',function() {
    it('throws an error if incorrect number defined',function() {
      var h = [1, 0.5, 0.25]
      assert.throws(function() {
        selectStepsize( h, 2 )
      }, Error, /Number of stepsizes \(3\) not equal to number of unknowns \(2\)/)
    })

    it('Returns same as provided if stepsizes provided',function() {
      var h0 = [1, 0.5, 0.25]
      var h = selectStepsize( h0, 3 )
      assert.deepEqual( h, h0, 'returns original h')
    })
  })

  describe('without stepsizes provided',function() {
    it('subdivides based on provided stepsize for unknowns=3',function() {
      var h = selectStepsize( 4, 3 )
      assert.deepEqual( h, [4,2,1], 'returns original h')
    })

    it('subdivides based on provided stepsize for unknowns=2',function() {
      var h = selectStepsize( 4, 2 )
      assert.deepEqual( h, [4,2], 'returns original h')
    })

    it('subdivides based on provided stepsize for unknowns=1',function() {
      var h = selectStepsize( 4, 1 )
      assert.deepEqual( h, [4], 'returns original h')
    })
  })
})

describe('richardson extrapolation', function() {

  var func, n, f, c

  beforeEach(function() {
    f = 5.5
    n = 3.8
    c = 1.2
    func = function(h) { return f + c * Math.pow(h, n) }
  })

  it("calculates order, value, and constant (PENDING)",function() {
    assert.throws(function() {
      richardson( func, 1 )
    }, Error, /not yet implemented/, 'states not implemented')
    //assert.closeTo( result.f, f, 1e-5, 'calculates the f' )
    //assert.closeTo( result.n, n, 1e-5, 'calculates the n' )
    //assert.closeTo( result.c, c, 1e-5, 'calculates the c' )
  })

  describe('given a set of values of h',function() {
    it("given the value, computes the order of accuracy and error term constant",function() {
      var result = richardson(func, [1, 0.5], {f: f})

      assert.closeTo( result.n, n, 1e-5, 'calculates n' )
      assert.closeTo( result.c, c, 1e-5, 'calculates c' )
    })

    it("given the order, computes the value error term constant",function() {
      var result = richardson(func, [1, 0.5], {n: n})

      assert.closeTo( result.f, f, 1e-5, 'calculates f' )
      assert.closeTo( result.c, c, 1e-5, 'calculates c' )
    })
  })

  describe('given a single h',function() {
    it("given the value, computes the order of accuracy and error term constant",function() {
      var result = richardson(func, 1, {f: f})

      assert.closeTo( result.n, n, 1e-5, 'calculates n' )
      assert.closeTo( result.c, c, 1e-5, 'calculates c' )
    })

    it("given the order, computes the value error term constant",function() {
      var result = richardson(func, 1, {n: n})

      assert.closeTo( result.f, f, 1e-5, 'calculates f' )
      assert.closeTo( result.c, c, 1e-5, 'calculates c' )
    })
  })

})
