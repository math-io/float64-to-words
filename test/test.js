'use strict';

// MODULES //

var test = require( 'tape' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var lpad = require( 'utils-left-pad-string' );
var repeat = require( 'utils-repeat-string' );
var proxyquire = require( 'proxyquire' );
var words = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof words === 'function', 'main export is a function' );
	t.end();
});

test( 'if provided `NaN`, the sign bit may be either 0 or 1, the exponent must be all 1s, and the fraction cannot be all 0s (IEEE754-1985)', function test( t ) {
	var frac;
	var high;
	var low;
	var w;

	w = words( NaN );

	// Convert to binary strings...
	high = w[ 0 ].toString( 2 );
	low = w[ 1 ].toString( 2 );

	// Pad...
	high = lpad( high, 32, '0' );
	low = lpad( low, 32, '0' );

	// Sign: +-1.
	t.ok( high[0] === '1' || high[0] === '0', 'sign is either 1 or 0' );

	// Exponent all 1s.
	t.equal( high.substring( 1, 12 ), '11111111111', 'exponent all 1s' );

	// Fraction cannot be all zeros.
	frac = repeat( '0', 52 );

	t.ok( high.substring( 12 ) !== frac.substring( 0, 32-12 ) || low !== frac.substring( 32-12 ), 'fraction not all 0s' );

	t.end();
});

test( 'if provided `+infinity`, the higher order word corresponds to a sign of 0, all 1s in the exponent, and all 0s in the fraction, while the lower order word is all 0s (IEEE754-1985)', function test( t ) {
	var high;
	var low;
	var w;

	high = '0'; // sign
	high += repeat( '1', 11 ); // exponent
	high += repeat( '0', 20 ); // fraction
	high = parseInt( high, 2 );

	low = repeat( '0', 32 );
	low = parseInt( low, 2 );

	w = words( pinf );
	t.equal( w[0], high, 'equals high word' );
	t.equal( w[1], low, 'equals low word' );
	t.end();
});

test( 'if provided `-infinity`, the higher order word corresponds to a sign of 1, all 1s in the exponent, and all 0s in the fraction, while the lower order word is all 0s (IEEE754-1985)', function test( t ) {
	var high;
	var low;
	var w;

	high = '1'; // sign
	high += repeat( '1', 11 ); // exponent
	high += repeat( '0', 20 ); // fraction
	high = parseInt( high, 2 );

	low = repeat( '0', 32 ); // fraction
	low = parseInt( low, 2 );

	w = words( ninf );
	t.equal( w[0], high, 'equals high word' );
	t.equal( w[1], low, 'equals low word' );
	t.end();
});
