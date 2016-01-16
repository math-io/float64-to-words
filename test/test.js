'use strict';

// MODULES //

var tape = require( 'tape' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var lpad = require( 'utils-left-pad-string' );
var repeat = require( 'utils-repeat-string' );
var pow = require( 'math-power' );
var bits = require( 'math-float64-bits' );
var words = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof words === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a two-element numeric array containing integers', function test( t ) {
	var w = words( pow( 2, 53 ) );

	t.equal( typeof w[ 0 ], 'number', 'first element is a number' );
	t.equal( w[0]%1, 0, 'first element is an integer' );

	t.equal( typeof w[ 1 ], 'number', 'second element is a number' );
	t.equal( w[1]%1, 0, 'second element is an integer' );

	t.end();
});

tape( 'the function splits a floating-point number into a higher order word and a lower order word', function test( t ) {
	var expected;
	var values;
	var high;
	var low;
	var str;
	var v;
	var w;
	var i;

	values = [
		5,
		pow( 2, 53 ),
		1e308,
		-1e308,
		-3.14,
		1e-324,
		4.94e-324,
		1.234567890123456789,
		-4.94e-324,
		6.333333333333333333e-310,
		-0,
		0,
		100,
		1/10,
		0.625,
		1/3,
		5e-240,
		-5e-240,
		10,
		15,
		-10,
		-15,
		pow( 2, -42 ),
		-pow( 2, 100 ),
		1,
		-1,
		1.5,
		1111111111111.111111111,
		-1111111111111.111111111,
		pow( 2, 54 ),
		pow( 2, 53 ) + 1,
		pow( 2, 53 ) + 2,
		pow( 2, 55 ),
		pow( 2, 56 ) - 1,
		-pow( 2, 57 ) + 5,
		3*pow( 2, 53 ),
		8*pow( 2, 54 )
	];

	for ( i = 0; i < values.length; i++ ) {
		v = values[ i ];
		w = words( v );

		// Convert to binary strings:
		high = w[ 0 ].toString( 2 );
		low = w[ 1 ].toString( 2 );

		// Combine into a single bit literal:
		if ( v > 0 ) {
			str = '0'; // sign bit
			str += lpad( high, 31, '0' );
		} else {
			str = lpad( high, 32, '0' );
		}
		str += lpad( low, 32, '0' );

		expected = bits( v );
		t.equal( str, expected, 'high+low equals bit string for ' + v );
	}
	t.end();
});

tape( 'if provided `NaN`, the sign bit may be either 0 or 1, the exponent must be all 1s, and the fraction cannot be all 0s (IEEE754-1985)', function test( t ) {
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

tape( 'if provided `+infinity`, the higher order word corresponds to a sign of 0, all 1s in the exponent, and all 0s in the fraction, while the lower order word is all 0s (IEEE754-1985)', function test( t ) {
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

tape( 'if provided `-infinity`, the higher order word corresponds to a sign of 1, all 1s in the exponent, and all 0s in the fraction, while the lower order word is all 0s (IEEE754-1985)', function test( t ) {
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
