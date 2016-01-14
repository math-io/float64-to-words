Words
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Splits a [double-precision floating-point number][ieee754] into a lower order word and a higher order word.


## Installation

``` bash
$ npm install math-float64-words
```


## Usage

``` javascript
var words = require( 'math-float64-words' );
```

#### words( x )

Splits a [double-precision floating-point number][ieee754] into a lower order word and a higher order word.

``` javascript
var w = words( 3.14e201 );
// returns [ 2479577218, 1774486211 ]
```

The returned `array` contains two elements: a lower order word and a higher order word. The lower order word contains the least significant bits, while the higher order word contains the most significant bits, including the exponent and the sign bit.

``` javascript
var low = w[ 0 ];
var high = w[ 1 ];
```


## Examples

``` javascript
var floor = require( 'math-floor' );
var pow = require( 'math-power' );
var words = require( 'math-float64-words' );

var frac;
var exp;
var w;
var x;
var i;

for ( i = 0; i < 100; i++ ) {
	frac = Math.random() * 10;
	exp = -floor( Math.random()*324 );
	x = frac * pow( 10, exp );
	w = words( x );
	console.log( 'x: %d. lower: %d. upper: %d.', x, w[ 0 ], w[ 1 ] );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float64-words.svg
[npm-url]: https://npmjs.org/package/math-float64-words

[build-image]: http://img.shields.io/travis/math-io/float64-words/master.svg
[build-url]: https://travis-ci.org/math-io/float64-words

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float64-words/master.svg
[coverage-url]: https://codecov.io/github/math-io/float64-words?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float64-words.svg
[dependencies-url]: https://david-dm.org/math-io/float64-words

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float64-words.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float64-words

[github-issues-image]: http://img.shields.io/github/issues/math-io/float64-words.svg
[github-issues-url]: https://github.com/math-io/float64-words/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[ieee754]: https://en.wikipedia.org/wiki/IEEE_754-1985
