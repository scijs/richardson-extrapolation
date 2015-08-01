var richardson = require('../lib')

// Exact value = 3.5
// Order of convergence = 3
function func( h ) {
  return 3.5 + 2.0 * Math.pow( h, 3 )
}


// Solve for the order of convergence:
console.log( richardson( func, 1, { f: 3.5 } ) )
// => { f: 3.5,  n: 3,  c: 2 }


// Approximate the the exact value given order of convergence:
console.log( richardson( func, 1, { n: 3 } ) )
// => { f: 3.5,  n: 3,  c: 2 }
