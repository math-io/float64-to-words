'use strict';

// MODULES //

var isLittleEndian = require( 'utils-is-little-endian' );


// NOTES //

/**
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
*
* If little endian (most significant bits last):
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
*
* If big endian (most significant bits first):
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
*
*
* Note: in which Uint32 we can find the higher order bits? If LE, the second; if BE, the first.
* Refs: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*/


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH, LOW;
if ( isLittleEndian ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}


// WORDS //

/**
* FUNCTION: words( x )
*	Splits a floating-point number into a lower order word (32-bit integer) and a higher order word (32-bit integer).
*
* @param {Number} x - input value
* @returns {Number[]} two-element array containing a lower order word and a higher order word
*/
function words( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return [ UINT32_VIEW[ LOW ], UINT32_VIEW[ HIGH ] ];
} // end FUNCTION words()


// EXPORTS //

module.exports = words;
