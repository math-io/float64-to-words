'use strict';

// MODULES //

var test = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var words = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof words === 'function', 'main export is a function' );
	t.end();
});
