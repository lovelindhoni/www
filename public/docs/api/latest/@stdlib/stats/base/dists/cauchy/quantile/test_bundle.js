// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a filled "generic" array.
*
* @module @stdlib/array/base/filled
*
* @example
* var filled = require( '@stdlib/array/base/filled' );
*
* var out = filled( 0.0, 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*
* @example
* var filled = require( '@stdlib/array/base/filled' );
*
* var out = filled( 'beep', 3 );
* // returns [ 'beep', 'beep', 'beep' ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":2}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Returns a filled "generic" array.
*
* @param {*} value - fill value
* @param {NonNegativeInteger} len - array length
* @returns {Array} filled array
*
* @example
* var out = filled( 0.0, 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*
* @example
* var out = filled( 'beep', 3 );
* // returns [ 'beep', 'beep', 'beep' ]
*/
function filled( value, len ) {
	var arr;
	var i;

	// Manually push elements in order to ensure "fast" elements...
	arr = [];
	for ( i = 0; i < len; i++ ) {
		arr.push( value );
	}
	return arr;
}


// EXPORTS //

module.exports = filled;

},{}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a zero-filled "generic" array.
*
* @module @stdlib/array/base/zeros
*
* @example
* var zeros = require( '@stdlib/array/base/zeros' );
*
* var out = zeros( 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":4}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var filled = require( '@stdlib/array/base/filled' );


// MAIN //

/**
* Returns a zero-filled "generic" array.
*
* @param {NonNegativeInteger} len - array length
* @returns {Array} output array
*
* @example
* var out = zeros( 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*/
function zeros( len ) {
	return filled( 0.0, len );
}


// EXPORTS //

module.exports = zeros;

},{"@stdlib/array/base/filled":1}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float64
*
* @example
* var ctor = require( '@stdlib/array/float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var builtin = require( './float64array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float64array.js":5,"./polyfill.js":7,"@stdlib/assert/has-float64array-support":18}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint16
*
* @example
* var ctor = require( '@stdlib/array/uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
var builtin = require( './uint16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":9,"./uint16array.js":10,"@stdlib/assert/has-uint16array-support":26}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint32
*
* @example
* var ctor = require( '@stdlib/array/uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
var builtin = require( './uint32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":12,"./uint32array.js":13,"@stdlib/assert/has-uint32array-support":29}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint8
*
* @example
* var ctor = require( '@stdlib/array/uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
var builtin = require( './uint8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":15,"./uint8array.js":16,"@stdlib/assert/has-uint8array-support":32}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Float64Array` support.
*
* @module @stdlib/assert/has-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./main.js":19}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFloat64Array = require( '@stdlib/assert/is-float64array' );
var GlobalFloat64Array = require( './float64array.js' );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./float64array.js":17,"@stdlib/assert/is-float64array":35}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./main.js":21}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
}


// EXPORTS //

module.exports = hasOwnProp;

},{}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert/has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert/has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./main.js":23}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
}


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert/has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert/has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./main.js":25}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/assert/has-symbol-support' );


// VARIABLES //

var FLG = hasSymbols();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/assert/has-symbol-support":22}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint16Array` support.
*
* @module @stdlib/assert/has-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./main.js":27}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
var GlobalUint16Array = require( './uint16array.js' );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./uint16array.js":28,"@stdlib/assert/is-uint16array":40,"@stdlib/constants/uint16/max":56}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/assert/has-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./main.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
var GlobalUint32Array = require( './uint32array.js' );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./uint32array.js":31,"@stdlib/assert/is-uint32array":42,"@stdlib/constants/uint32/max":57}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint8Array` support.
*
* @module @stdlib/assert/has-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./main.js":33}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
var GlobalUint8Array = require( './uint8array.js' );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./uint8array.js":34,"@stdlib/assert/is-uint8array":44,"@stdlib/constants/uint8/max":58}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Float64Array.
*
* @module @stdlib/assert/is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert/is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./main.js":36}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasFloat64Array = ( typeof Float64Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return (
		( hasFloat64Array && value instanceof Float64Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float64Array]'
	);
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":137}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":8,"@stdlib/array/uint8":14}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './main.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./main.js":39}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ctors = require( './ctors.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @private
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	*
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// MAIN //

bool = isLittleEndian();


// EXPORTS //

module.exports = bool;

},{"./ctors.js":37}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert/is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert/is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = require( './main.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./main.js":41}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint16Array = ( typeof Uint16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return (
		( hasUint16Array && value instanceof Uint16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint16Array]'
	);
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":137}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert/is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert/is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = require( './main.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./main.js":43}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint32Array = ( typeof Uint32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return (
		( hasUint32Array && value instanceof Uint32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint32Array]'
	);
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":137}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert/is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert/is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = require( './main.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./main.js":45}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint8Array = ( typeof Uint8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return (
		( hasUint8Array && value instanceof Uint8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8Array]'
	);
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":137}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/float64/eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/float64/eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/float64/exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

},{}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

},{}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

},{}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

},{}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

},{}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/float64/ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/float64/ninf' );
* // returns -Infinity
*/

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{"@stdlib/number/ctor":83}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/constants/float64/pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

},{}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/float64/pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/float64/pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/float64/smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/uint16/max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;

},{}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/uint32/max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/uint8/max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;

},{}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a double-precision floating-point numeric value is infinite.
*
* @module @stdlib/math/base/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = require( './main.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./main.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a double-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var isnan = require( './main.js' );


// EXPORTS //

module.exports = isnan;

},{"./main.js":62}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests if a double-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute an absolute value of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var abs = require( './main.js' );


// EXPORTS //

module.exports = abs;

},{"./main.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Computes the absolute value of a double-precision floating-point number `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	return Math.abs( x ); // eslint-disable-line stdlib/no-builtin-math
}


// EXPORTS //

module.exports = abs;

},{}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/to-words":102}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Round a double-precision floating-point number toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var floor = require( './main.js' );


// EXPORTS //

module.exports = floor;

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = floor;

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the tangent of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-tan
*
* @example
* var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
*
* var out = kernelTan( 3.141592653589793/4.0, 0.0, 1 );
* // returns ~1.0
*
* out = kernelTan( 3.141592653589793/4.0, 0.0, -1 );
* // returns ~-1.0
*
* out = kernelTan( 3.141592653589793/6.0, 0.0, 1 );
* // returns ~0.577
*
* out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*/

// MODULES //

var kernelTan = require( './kernel_tan.js' );


// EXPORTS //

module.exports = kernelTan;

},{"./kernel_tan.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_tan.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalOdd = require( './polyval_t_odd.js' );
var polyvalEven = require( './polyval_t_even.js' );


// VARIABLES //

var PIO4 = 7.85398163397448278999e-01;
var PIO4LO = 3.06161699786838301793e-17;
var T0 = 3.33333333333334091986e-01; // 3FD55555, 55555563

// Absolute value mask: 2147483647 => 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation


// MAIN //

/**
* Computes the tangent on \\( \approx\[-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \tan(-x) = -\tan(x) \\), we need only to consider positive \\( x \\).
*
* -   Callers must return \\( \tan(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\( -0 \\). Callers may do the optimization \\( \tan(x) \approx x \\) for tiny \\( x \\).
*
* -   \\( \tan(x) \\) is approximated by a odd polynomial of degree 27 on \\( \[0, 0.67434] \\)
*
*     ```tex
*     \tan(x) \approx x + T_1 x^3 + \ldots + T_{13} x^{27}
*     ```
*     where
*
*     ```tex
*     \left| \frac{\tan(x)}{x} - \left( 1 + T_1 x^2 + T_2 x^4 + \ldots + T_{13} x^{26} \right) \right|  \le 2^{-59.2}
*     ```
*
* -   Note: \\( \tan(x+y) = \tan(x) + \tan'(x) \cdot y \approx \tan(x) + ( 1 + x \cdot x ) \cdot y \\). Therefore, for better accuracy in computing \\( \tan(x+y) \\), let
*
*     ```tex
*     r = x^3 \cdot \left( T_2+x^2 \cdot (T_3+x^2 \cdot (\ldots+x^2 \cdot (T_{12}+x^2 \cdot T_{13}))) \right)
*     ```
*
*     then
*
*     ```tex
*     \tan(x+y) = x^3 + \left( T_1 \cdot x^2 + (x \cdot (r+y)+y) \right)
*     ```
*
* -   For \\( x \\) in \\( \[0.67434, \pi/4] \\),  let \\( y = \pi/4 - x \\), then
*
*     ```tex
*     \tan(x) = \tan\left(\tfrac{\pi}{4}-y\right) = \frac{1-\tan(y)}{1+\tan(y)} \\
*     = 1 - 2 \cdot \left( \tan(y) - \tfrac{\tan(y)^2}{1+\tan(y)} \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~π/4 in magnitude)
* @param {number} y - tail of `x`
* @param {integer} k - indicates whether tan (if k = 1) or -1/tan (if k = -1) is returned
* @returns {number} tangent
*
* @example
* var out = kernelTan( 3.141592653589793/4.0, 0.0, 1 );
* // returns ~1.0
*
* @example
* var out = kernelTan( 3.141592653589793/4.0, 0.0, -1 );
* // returns ~-1.0
*
* @example
* var out = kernelTan( 3.141592653589793/6.0, 0.0, 1 );
* // returns ~0.577
*
* @example
* var out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*
* @example
* var out = kernelTan( NaN, 0.0, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( 3.0, NaN, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( NaN, NaN, 1 );
* // returns NaN
*/
function kernelTan( x, y, k ) {
	var hx;
	var ix;
	var a;
	var r;
	var s;
	var t;
	var v;
	var w;
	var z;

	hx = getHighWord( x );

	// High word of |x|:
	ix = (hx & HIGH_WORD_ABS_MASK)|0; // asm type annotation

	// Case: |x| >= 0.6744
	if ( ix >= 0x3FE59428 ) {
		if ( x < 0 ) {
			x = -x;
			y = -y;
		}
		z = PIO4 - x;
		w = PIO4LO - y;
		x = z + w;
		y = 0.0;
	}
	z = x * x;
	w = z * z;

	// Break x^5*(T[1]+x^2*T[2]+...) into x^5(T[1]+x^4*T[3]+...+x^20*T[11]) + x^5(x^2*(T[2]+x^4*T[4]+...+x^22*T[12]))...
	r = polyvalOdd( w );
	v = z * polyvalEven( w );
	s = z * x;
	r = y + (z * ((s * (r + v)) + y));
	r += T0 * s;
	w = x + r;
	if ( ix >= 0x3FE59428 ) {
		v = k;
		return ( 1.0 - ( (hx >> 30) & 2 ) ) * ( v - (2.0 * (x - ((w * w / (w + v)) - r)) )); // eslint-disable-line max-len
	}
	if ( k === 1 ) {
		return w;
	}
	// Compute -1/(x+r) accurately...
	z = w;
	setLowWord( z, 0 );
	v = r - (z - x); // z + v = r + x
	a = -1.0 / w; // a = -1/w
	t = a;
	setLowWord( t, 0 );
	s = 1.0 + (t * z);
	return t + (a * (s + (t * v)));
}


// EXPORTS //

module.exports = kernelTan;

},{"./polyval_t_even.js":71,"./polyval_t_odd.js":72,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/set-low-word":99}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.05396825397622605;
	}
	return 0.05396825397622605 + (x * (0.0088632398235993 + (x * (0.0014562094543252903 + (x * (0.0002464631348184699 + (x * (0.00007140724913826082 + (x * 0.00002590730518636337))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.13333333333320124;
	}
	return 0.13333333333320124 + (x * (0.021869488294859542 + (x * (0.0035920791075913124 + (x * (0.0005880412408202641 + (x * (0.00007817944429395571 + (x * -0.000018558637485527546))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":74}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' );
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		exp === 0 ||
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords( WORDS, frac );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":65,"@stdlib/number/float64/base/exponent":85,"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/normalize":96,"@stdlib/number/float64/base/to-words":102}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `x - nπ/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var y = [ 0.0, 0.0 ];
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*/

// MODULES //

var rempio2 = require( './rempio2.js' );


// EXPORTS //

module.exports = rempio2;

},{"./rempio2.js":77}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

/* eslint-disable array-element-newline */

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var zeros = require( '@stdlib/array/base/zeros' );


// VARIABLES //

/*
* Table of constants for `2/π` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (`24*i`)-th to (`24*i+23`)-th bit of `2/π` after binary point. The corresponding floating value is
*
* ```tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (`e0 <= 16360`, `jk = 6`), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `π/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zeros( 20 );
var Q = zeros( 20 );
var FQ = zeros( 20 );
var IQ = zeros( 20 );


// FUNCTIONS //

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - output object for storing double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/π`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @returns {number} last three binary digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	for ( i = 0; j > 0; i++ ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
		j -= 1;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // Trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) { // eslint-disable-line default-case
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// `k` is the number of terms needed...
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	fw = 0.0;
	for ( i = jz; i >= 0; i-- ) {
		fw += FQ[ i ];
	}
	if ( ih === 0 ) {
		y[ 0 ] = fw;
	} else {
		y[ 0 ] = -fw;
	}
	fw = FQ[ 0 ] - fw;
	for ( i = 1; i <= jz; i++ ) {
		fw += FQ[i];
	}
	if ( ih === 0 ) {
		y[ 1 ] = fw;
	} else {
		y[ 1 ] = -fw;
	}
	return ( n & 7 );
}


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* -   The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @returns {number} last three binary digits of `N`
*/
function kernelRempio2( x, y, e0, nx ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk` for double-precision floating-point numbers:
	jk = 4;

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
		j += 1;
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
}


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":67,"@stdlib/math/base/special/ldexp":73}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
*
* Optimized by Bruce D. Evans.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff|0; // asm type annotation

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb|0; // asm type annotation

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c|0; // asm type annotation

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a|0; // asm type annotation

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c|0; // asm type annotation

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc|0; // asm type annotation

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb|0; // asm type annotation

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b|0; // asm type annotation

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb|0; // asm type annotation

// Arrays for storing temporary values:
var TX = [ 0.0, 0.0, 0.0 ]; // WARNING: not thread safe
var TY = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @param {number} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*
* @example
* var y = [ 0.0, 0.0 ];
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = [ 0.0, 0.0 ];
* var n = rempio2( NaN, y );
* // returns 0
*
* var y1 = y[ 0 ];
* // returns NaN
*
* var y2 = y[ 1 ];
* // returns NaN
*/
function rempio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = (hx & ABS_MASK)|0; // asm type annotation

	// Case: |x| ~<= π/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5π/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= π/2 or π
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3π/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9π/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7π/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3π/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return rempio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4π/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return rempio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*π/2 (medium size)
	if ( ix < MEDIUM ) {
		return rempio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // `e0 = ilogb(z) - 23` => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = rempio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
}


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":76,"./rempio2_medium.js":78,"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/get-low-word":93}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 53 bits of 2/π:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of π/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = π/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of π/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = π/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff|0; // asm type annotation


// MAIN //

/**
* Computes `x - nπ/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*/
function rempio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = (ix >> 20)|0; // asm type annotation
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
}


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":79,"@stdlib/number/float64/base/get-high-word":91}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = round;

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the tangent of a number.
*
* @module @stdlib/math/base/special/tan
*
* @example
* var tan = require( '@stdlib/math/base/special/tan' );
*
* var v = tan( 0.0 );
* // returns ~0.0
*
* v = tan( -3.141592653589793/4.0 );
* // returns ~-1.0
*
* v = tan( 3.141592653589793/4.0 );
* // returns ~1.0
*
* v = tan( NaN );
* // returns NaN
*/

// MODULES //

var tan = require( './tan.js' );


// EXPORTS //

module.exports = tan;

},{"./tan.js":82}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_tan.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch buffer:
var buffer = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word for pi/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for a small value: 2^-27 = 7.450580596923828e-9 => high word => 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation


// MAIN //

/**
* Evaluates the tangent of a number.
*
* ## Method
*
* -   Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\(\[-\pi/4, +\pi/4\]\\).
*
* -   Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\(\[-\pi/4, +\pi/4\]\\), and let \\(n = k \mod 4\\).
*
* -   We have
*
*     | n | sin(x) | cos(x) | tan(x) |
*     | - | ------ | ------ | ------ |
*     | 0 |    S   |    C   |   T    |
*     | 1 |    C   |   -S   |  -1/T  |
*     | 2 |   -S   |   -C   |   T    |
*     | 3 |   -C   |    S   |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} tangent
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* @example
* var v = tan( -3.141592653589793/4.0 );
* // returns ~-1.0
*
* @example
* var v = tan( 3.141592653589793/4.0 );
* // returns ~1.0
*
* @example
* var v = tan( NaN );
* // returns NaN
*/
function tan( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: |x| < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return x;
		}
		return kernelTan( x, 0.0, 1 );
	}
	// Case: tan(Inf or NaN) is NaN
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction needed...
	n = rempio2( x, buffer );
	return kernelTan( buffer[ 0 ], buffer[ 1 ], 1-((n&1)<<1) );
}


// EXPORTS //

module.exports = tan;

},{"@stdlib/math/base/special/kernel-tan":69,"@stdlib/math/base/special/rempio2":75,"@stdlib/number/float64/base/get-high-word":91}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number/ctor
*
* @example
* var Number = require( '@stdlib/number/ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent' );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns -1023
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = require( './main.js' );


// EXPORTS //

module.exports = exponent;

},{"./main.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* @example
* var exp = exponent( -3.14 );
* // returns 1
*
* @example
* var exp = exponent( 0.0 );
* // returns -1023
*
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":48,"@stdlib/number/float64/base/get-high-word":91}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":89}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":38}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
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
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
*
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
*
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":88,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":38}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./main.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
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
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":90,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-low-word
*
* @example
* var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './main.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./main.js":95}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":38}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
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
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
}


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":94,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = require( './main.js' );


// EXPORTS //

module.exports = normalize;

},{"./main.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './normalize.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var setLowWord = require( './main.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./main.js":101}],100:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":94}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
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
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":100,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Split a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":104}],103:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":88}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":105}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
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
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":103,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var tan = require( '@stdlib/math/base/special/tan' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Cauchy distribution with location parameter `x0` and scale parameter `gamma`.
*
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 2.0 );
* var y = quantile( 0.2 );
* // returns ~7.247
*
* y = quantile( 0.8 );
* // returns ~12.753
*/
function factory( x0, gamma ) {
	if (
		isnan( x0 ) ||
		isnan( gamma ) ||
		gamma <= 0
	) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a Cauchy distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return x0 + ( gamma * tan( PI*( p-0.5 ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/tan":81,"@stdlib/utils/constant-function":129}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Cauchy distribution quantile function.
*
* @module @stdlib/stats/base/dists/cauchy/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/cauchy/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~1.376
*
* @example
* var factory = require( '@stdlib/stats/base/dists/cauchy/quantile' ).factory;
*
* var quantile = factory( 10.0, 2.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":106,"./quantile.js":108,"@stdlib/utils/define-nonenumerable-read-only-property":130}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var tan = require( '@stdlib/math/base/special/tan' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the quantile function for a Cauchy distribution with location parameter `x0` and scale parameter `gamma` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.3, 2.0, 2.0 );
* // returns ~0.547
*
* @example
* var y = quantile( 0.8, 10, 2.0 );
* // returns ~12.753
*
* @example
* var y = quantile( 0.1, 10.0, 2.0 );
* // returns ~3.845
*
* @example
* var y = quantile( 1.1, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = quantile( 0.5, 0.0, -1.0 );
* // returns NaN
*/
function quantile( p, x0, gamma ) {
	if (
		isnan( x0 ) ||
		isnan( gamma ) ||
		gamma <= 0.0 ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	return x0 + ( gamma * tan( PI*( p-0.5 ) ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/tan":81}],109:[function(require,module,exports){
module.exports={"expected":[-84.71360197121949,-4.53297529322243,26.598736391545156,15.459600226961456,54.97988048395963,10.589012097254262,26.134789139425653,-0.6534962725142495,0.8756567100911596,-29.206494140662535,-33.904039381397496,52.2862482337596,-14.65069837452565,22.614189234205142,-2.3432519690059803,32.78503593200029,-37.09361880292395,-453.52804928769535,-287.5859935782343,1.4613364300645655,-105.33341430280824,-3.7954541115268463,2.1742898582432097,18.285696946385418,183.31126609663482,-22.534869797121676,79.4146743320989,36.31807507136191,-24.75589876033614,-17.58305077353144,8.012645218395843,4.842726887030516,14.265267793492653,-21.655889955868336,-19.374674988153846,10.36530604254177,-235.83985916521186,13.601057095823148,5.098507397556865,-2.2956647189224726,-119.37334437780851,-3.7329173496205383,-37.00960090686328,-14.716989904364032,4.61366585606324,-148.20238178455602,-18.462805064173146,35.92719448242775,-183.96474411875803,-3.4194902553649804,-15.795420434270676,16.205319642335844,-12.867292819488206,72.63561413945308,82.70541228395751,-198.8252509118333,39.33967840649599,2.3476856049669355,575.0116425234638,-5.092027325695886,5.009821615536988,14.188916163402588,-0.6476526517163456,5.174321090642914,0.2888467434332298,49.46083212723681,7.676221245631594,20.142847968045963,-5.2089967889044715,-1.0829311279731457,23.89522506133711,81.39069683404965,2.4955133422068605,7.736617044793619,-32.87935669788485,-15.867798716100596,0.44222188170932,-77.57146309990097,-21.415307288376166,-21.692354465204847,-177.9767558393913,72.60731181861242,4.762615927644094,2.6918016382107415,8.78118965318114,50.20722959857909,42.13686672414562,23.1695445646956,112.23102644952169,12.72364616076693,8.468063526590942,137.42729394789558,-63.061615605364636,-12.086648207828857,38.64718771686799,-109.40548760876392,-13.327074499107786,20.27103847157376,-14.59187733168681,-153.96675283086702,-16.197069468742047,2.974997008629282,25.846891785333924,-79.2060157706025,51.67174040051991,-13.840593311186764,-48.52167366749489,-21.7322806064981,5.461857644239603,0.9552227152170377,-2.9004685220050823,23.81753789069585,0.6112635902393848,2.463968559548623,-34.73105381374378,-214.89600050843757,19.262152164093717,-33.29988734496109,1.8828296494127827,-23.77020216165421,-517.9203202057404,5.091395837145246,55.06757809237785,-28.108368977688507,-30.75815164781324,-12.355323521233121,24.98023344560318,-18.141797060376447,-6.431130820258886,-491.44475174846224,-3.4263921700094864,24.358150768569637,-7.530510112956314,-26.360497150268117,-9.202596687745215,0.18343699118566542,15.709627347251384,-1.012828579665584,7.7806628600032415,371.28025656548715,36.81277206827871,-5.232111962895384,-55.033948037413666,-1.2550265410781187,14.398878666109875,48.32955286584031,-0.4045170521867796,-42.18211655676982,249.6670864137628,54.782982481748235,28.709043691936387,-1.2127223013274173,-122.17152801835607,-49.91818795514882,6.590899843332876,11.813200415118384,-18.457749754770333,5.734302758701567,64.52852693753381,-7.039794515333068,-39.15610112739217,24.248988111550165,2.111708486774856,-3.5425757341768014,27.5702111335674,3.760444299061826,11.609191533218345,-32.49182833159304,3.8729434397404976,-0.9759407267660987,-50.992459905246974,5.083674132858123,41.26216785046,-48.59112946997128,-80.74293441083378,-103.06300963946866,11.577401025420258,-1.1792120037431975,-1.7932299927642832,-10.754120092012116,14.013812705830913,-2.9120287694248623,-39.52213990994379,-8.008274797283228,-21.800828300844334,65.22569889330445,-23.244291801103778,5.187065636437493,13.232442986887394,1.8111319545522426,78.84611607326579,29.452145842066273,5.378622849597059,47.820548437369375,-7.644078747751119,-7.400690791084347,0.6008880198557168,78.64779935350442,16.520746690685996,42.15858461238849,-0.15190755807628398,-3.479204731091578,-49.67984186452003,7.6703935663258465,3.6699921072910735,-169.38504645753594,14.125539366443412,28.03713681127147,-1.688745983239969,-10.288867646831251,2.9273266145301946,114.12931134114828,-43.937654677641156,41.63245109031452,722.7999110385308,29.44034945347074,-46.710930430932315,-69.60448652593324,-0.3674700735647215,-11.999529164168877,-2.86518532236164,23.69460420602203,-243.06091235658226,24.09279753510923,7.8301678308125116,-38.91503106584775,-0.08038557985461076,30.703649782155857,-44.54464598200044,-1.4864429881120431,19.754485416787364,0.8474026431703595,-46.698034610276835,0.16715881047833936,113.5355983151569,-4.780285869329381,-30.07308842574623,741.6713849428234,-14.474295454126345,-6.644321409436004,-48.35341878462018,9.515362680578022,-77.79141036151823,14.939213527112928,4.563294311516609,-10.676772776779453,12.905207542985847,5.18905009435999,119.71107523228116,-8.815361010019018,-12.781159997451143,15.45587554795808,52.74313659691442,-9.321587688442529,-7.948835971967235,-195.3969062061648,26.160840121080252,-2.4222355236381774,30.73243651569132,244.60387675919517,175.17032978036795,-49.65994774400596,64.50026987216248,14.66351844322806,-20.160569452803898,-1.6982063187556207,25.660328611426152,77.77254364922833,1.9923341365355218,-281.9665355375253,60.80411068021413,-4.280280469544004,-7.790333044558391,-14.068166488895875,-62.96389523689622,-8.400506809453235,16.22993425648664,0.07141506323611113,2.6091946659990315,-66.11849576384026,-5.7990956905553865,-0.884771530357148,63.07267452815009,-44.44561346836562,-0.40617282586233694,15.45426680223464,62.28489794067487,2.092489624160721,-4.391242651292271,-8.000235666917806,-10.387302007007364,33.807169506108345,0.9556797483379078,-1.2620416403077643,0.1147720615845127,85.87336935850433,10.855970721562672,-25.02476874880286,59.02716255117801,6.1069955365661945,13.265660157618015,-39.89199368679319,0.24657514204066644,160.33572273062572,26.263914191723867,130.00639507001185,-174.6961451367796,50.33797234588831,22.26450354307864,-71.21245665593703,-12.013214881169572,104.62856637990627,126.34644801302225,1.1936924751032443,-24.340095657505223,1.3917749448251906,-56.04294114835499,113.7810936711347,9.733734099898383,-16.873434581278836,-22.647686456946197,99.49852962330584,11.226947363914828,8.016432653816056,-53.16137783757166,-28.21037521106356,-4.834038340672525,43.133995864882266,4.612466104538046,52.748347146640846,17.00190252593547,-8.643374175471926,-13.086142435280571,-0.948584096669775,2.078612472232119,179.20965188046952,100.94503742123177,27.360746290059183,102.2969983717505,-22.73791120516455,41.48536583007217,-74.6006337323722,-17.43878879979567,-39.870689495398786,15.597584379853593,-22.473129402129427,-161.89289725534692,2.357951488690481,4.518814669645582,194.44117797809602,-102.58981154049901,38.61780434117075,-1.0507183243257128,-1.4814168920689252,35.743820925056426,-3.1367313101708145,-1.1418771306782607,-9.939987928726762,13.33839315672512,-62.595896971659265,132.55363286161563,98.13507353987654,-4.04887618702106,-0.9027012963746628,346.8726466042698,-7.971793335893772,-9.501031045882023,19.219668575768615,84.01935076992544,-18.29813429061417,12.509818898909959,34.35650833078838,32.03060267307272,8.460565569365166,-38.80314572824472,19.438829732030484,-4.806761121235571,-0.9651996866035979,35.64913421636739,6.144977462088635,-9.22960460792191,-11.379466193083584,-17.74476559235008,43.60107086521641,-18.701354512429972,-15.323487117417674,14.767207142456215,3.9671397784814624,27.933060850452417,-23.596627781365072,-242.18017180455703,-42.9464083011561,749.4371045605327,4.173155950839909,22.296783092992392,-24.11544186147082,104.88479647093943,28.225962849266118,200.2742139597237,32.13382093106979,-47.571073771934984,12.271264387403473,-45.6037155543813,-15.13385502328962,16.908862692554404,33.87355658790659,-11.62185700957297,-39.709437294006676,57.46803111854098,2089.3841208167273,-6.663629119103061,20.0457273243995,-43.654059844300974,86.42888735286391,-10.701067889050496,53.97718784290034,172.09708990389584,6.508197913371069,8.013377363167441,227.53476224972826,-41.40519432485355,30.097374305656473,15.806619796212829,43.69744990202959,-2431.5114526424345,40.514239211568125,-18.796194443729004,339.4296917747691,206.45132744787185,8.83939056384711,42.599906565183694,11.582413490401661,367.9304199911259,1447.2813105325035,53.907414065490634,6.901147179340538,10.880939722869035,949.8630788194829,-91.0683656034066,-5559.419152670024,-52.00527995817711,-18.061627295550416,-5.291742892470729,6.181097738370383,49.67413091748929,-8.174520561355846,15.383807074058884,4.365118246761235,-7.032052025597839,-7.819241954941502,-45.04045894851417,-258.4268902722323,-10.366719464866033,17.431228382788934,29.30118753306029,1.3427766459874593,7.672375428094477,-3.68524747771178,47.93125968782836,2.704489935496161,-3.138663278856381,-38.58728783137167,28.204141617471205,22.41464645203768,-85.71534011934743,-9.37789349472684,13.638658944098887,-1.452310394981461,-54.52210820349569,-0.1076679327540277,-2.081428161737969,73.68060276276027,-7.8023698183425525,-4.458089930010751,-17.597199886048177,-60.32049042757697,318.89911323630474,-260.0508348038415,17.630941131989026,-71.23038427862141,-15.847885033471904,-63.12338240478473,78.08956625253072,-20.01775080230817,139.68531705226687,-3.7553708982371323,-905.9578756273816,10.112121695495727,-62.236074151123155,-31.69931909246282,1570.724805570292,-5.758522928295905,-0.8844248556204153,-8.904621757865858,0.37042462808168325,0.6850361845603348,17.495423792569888,1.0373108702577436,-13.562538561542075,-18.180560519781405,27.902504748356037,6.810176947780256,-40.306441506292934,-2.0228986737948835,63.01980987882444,33.12662459848139,-2.4193498231287967,-175.53336738871272,0.7033525538553768,6.847382753307615,2.2904603371566656,26.551373595751844,281.3859678866206,-43.60316981420441,-25.644421836510563,-30.901829465587156,-1.0445796520598996,-12.58397556039768,-122.19354649036528,-257.88701173474936,-1.6412509420564811,9.28517296742741,-34.55164699335974,-74.02174218411963,-2.7899588234771673,2.8302926474181875,0.6539053495111231,3.4185824059688636,-9.7481953071457,-12.828463095569354,7.550543101363056,85.54884750334578,-73.6468867177022,-1408.9675040569957,135.37583178517215,-10.010092835620092,-314.57732357296686,-10.497122525495367,334.4160971369518,208.55385100185072,13.107826744027339,-47.46080090027873,11.45619534600939,192.03678084549443,-3.4089289860105554,24.560357855330427,1579.077935487761,-49.78254700172798,-55.096698825330435,-3.348200580815351,-4.3032711978839755,43.335530606545426,0.02864351433216375,0.28234616386019007,11.764929178931283,8.32089232078978,-393.2925521876433,148.2230405999407,-1015.037219887063,-41.999125614702514,-80.21518520279056,-20.732835854074025,129.45554887429475,6.833236892606967,-15.955420251267592,-27.02478725855503,42.48440326339218,-32.08382056245923,-101.84274010741856,1.3923156742065506,2.351277619883132,-25.340643147675568,116.19374675664805,4.978682621166476,-3.9578190761683127,-6.832692554363694,97.7048196859084,7.309323550168838,93.93983664862188,16.30444103992208,654.9404861476133,15.435581212853979,15.68870704717975,3.539468307836374,-5.452824596099226,-3.9409374179564067,23.249495263056893,40.71636665104508,-50.39180246022864,-114.52435746954717,-11.876445286940049,-252.70261208040367,-23.48631353797501,-192.22531690763793,-0.8988707359590264,-20.978314973207013,15.001845825803109,25.966994585176103,16.502105552692363,16.99895767471422,-52.65292949927589,-693.7738648119916,-5.401546224371229,-151.26677846961744,-3.954734469161477,315.8071357922583,12.16115052514311,-2.8955471190844477,-13.768215738678457,20.795369034549402,15.115499680030828,183.05607723176223,4.731888950273455,-442.43230823782005,129.65077125438938,-10.562789044423772,-4.986889372257004,31.33324157761099,142.33829689528912,-2.6255281128958448,-25.039416183237012,-1.9852890577465703,-11.32063952952412,-8.301495458720492,29.32395092967783,73.17278579080175,-20.05258320751388,70.30324864237922,28.418560724956897,-285.96289570007133,-19.028370278215036,16.716678768966723,-12.562256874736114,5.288012130011534,8.817850908821367,12.990006093578812,5.964978981576823,16.186263374023742,91.08697912589183,81.94025869508717,12.831379337199225,51.400118070407025,-222.10076449584844,3.259350492420813,136.23503155019532,-356.51562113796484,-39.433580268000895,149.58686952345477,53.777549340646594,-5.8307555853176805,-3.130598127606844,47.59528735996944,27.265826851955747,-49.81996191213404,-66.92350259562386,-17.78079837469017,-20.652030122254914,16.022637285130532,5.143054693250448,43.414912334882274,-3.5524527684326443,-105.14423535386656,11.951225581550682,-12.646702070614092,101.83097402628256,85.2674353335904,63.86567383282644,-71.92651964889518,-39.77414443711514,-1.5297796079741963,-4.3481715813837845,-4.493695066271936,-67.8107425082968,9.553416807993628,3.1155947529057286,-4.605238646651995,2.905119325337605,118.11104083831371,25.01270193772785,-119.25825255528905,-86.14848651823517,43.76312291626852,207.04882071501632,-14.771134791275088,7.107878660477635,-2.537726631694481,-29.47141626540996,-16.07120496316202,-5.588550816853697,-37.07502137052448,-1.5739814182094867,212.91699286097676,54.6641603360222,23.370969013431363,8.683961869516,62.93489067467602,11.533040842863723,67.16763593767669,-26.481153509445782,-2.9750924086342962,2.5424042731218037,-193.18366101541602,-10.596608292723914,62.74507076634164,57.525632075774375,-4.636306284518809,53.086615202159244,46.393795932772925,-10.806305399151029,11.066303775030665,-88.64874172619187,-18.037813179980752,18.830064376013212,14.14347327308403,-286.49672070571586,-5.728877627284694,3.4164129483858066,19.98534094047092,16.37891639197852,-10.610164018106506,-403.5222155443148,-164.85058766715179,1.998422843887379,53.75512066649548,-215.66289567642818,-105.99149448324144,-19.939647927906243,-9.08696408550311,0.5071669379903705,0.5523558605983012,82.58368981187996,-8.86880174446023,1378.7139962942297,112.29097148992042,797.6971598294622,10.128619746898062,3.739819381229901,4.217401155683895,-15.410794387761177,27.207804548888692,2.669728702366872,-72.96807405046435,16.308662190160597,-6.140667267315028,-1.9958389680711104,28.973995951368888,5.854203518646203,-49.472145529823095,-304.75260721935587,90.43476944272004,-3.2291170208590003,-929.5220429766288,15.915707772683295,115.99856076171332,8.31600756037832,-11.224592942270908,126.3051599503909,47.53503196959158,-2.95805527594407,0.17680029216733018,21.048762890413414,-5.725421982508389,-4.792327624190339,-19.221497149081813,-7.965281109173928,-51.3992060912963,-33.947304138704425,17.805564726322256,-76.9156842834788,-128.75592931164792,-27.76900694129776,-39.11444039182031,-76.50797230408101,-14.523322825781266,18.94129100312974,-23.68825969291776,-4.114960633997503,302.59379779170933,-2.869356647760278,1.7568159757351542,0.025693569408637762,15.092257779280972,-31.85963348174004,-6.719757607139933,6.327864909283359,109.22197061323271,270.13908507758475,-4.637322352853517,-85.25879699727366,-58.455872722074055,-31.28379730356054,-10.567258364346,-66.23040109082639,233.76636224081696,42.45615403135373,-85.30018457438963,33.74265210611004,-0.7588568335187573,-16.823430298376874,18.515115692756602,2.9064391399432634,-12.733832578069897,0.1905760023900276,102.97129438533338,-10.86830207754744,-16.400267365028288,1.7831362996434583,0.2254927866782579,-31.806872210861396,-1.2197923394678767,-822.792653856514,-117.55195948249019,-5.341797141574598,-33.97607688738226,12.483376529968504,-5355.4087841094115,53.99238596041701,11.113039292057776,-3.1893518720541456,-42.306071207510165,-84.91632263253604,1.0266410057145345,-20.172982264293356,18.89463389531752,37.16339265293054,6184.180417400643,-139.38340047603847,8.331454830872813,-18.509132234433114,-2.9922593494236414,16.0262710102081,60.30525079720869,-61.221009468064615,2.75330706910974,-692.9822792100944,-1.1786596426948486,5.463291855916109,12.609035362266036,-155.3051663128034,11.643662888006459,-4.680525742046834,1.1784759052165987,22.092048550233446,18.606996787668503,-1.5182471333135978,-6.445694118169912,-0.5814884884942788,141.95818448890498,0.35365046369535286,40.81594994406256,320.8147759560927,-16.585412079877134,-2.4762449272912086,-5.747182757133845,-7.163728445870339,4.565436692633446,2.200704697020823,-75.50335347567915,-1115.86638090745,-3.1001586920865387,-1265.336424879088,-86.82921284955451,0.8707408591118542,1.5150739961615025,-40.46470070199232,1.1141167551224505,12.532129842102258,-26.10615816998014,-48.944268203311786,-0.1122370756046206,23.416738936211026,-57.4949323480835,29.336982451812833,63.57852765166053,8.493710201228721,47.53877982245347,-4.093241116001501,14.04908209893474,-81.32492025649042,-23.947932863429227,7.398093648164358,-0.5961027808635089,5.937311395644169,-46.42021337636118,12.7939778722855,0.4429012364938242,16.940974125859874,-248.4473489947437,2.9923327695232396,586.8644864020874,0.0049038552516792455,-2.334093990502603,-5.8324640463724915,-62.31516228166528,2.2243880481860865,47.79404494225524,-63.89808342592532,2.3686734303292956,-71.40671039027914,0.34547948067017387,-1.7593704388140932,1.2848908962458336,-63.890297718938285,-10.332859915412541,-466.1790665517875,-11.582069134810562,60.400831682818016,230.6071551053001,16.56546624221665,56.56464667568099,-6.2688687069046924,-1.096351464410444,-0.3716615437445495,-0.590402801370465,-6.303232126793749,23.089068795903053,301.4035107551781,-43.355566921585904,-5.649580144589043,3.6468192793543537,-12.211484015967107,-13.95618028629886,-0.007219862826815082,-6.403553545441547,-0.5591530708954493,-38.62429764248656,-1.0266686250471142,1.6350792945040098,-75.43129763385117,7.721884629958406,-4.926299220946191,-51.020018804418925,-17.35650908717876,-47.9732089461492,446.2376790308841,-47.32131852030589,-28.117062464026805,-13.592860306803857,-20.375933800115796,14.968046142614222,-16.921979859261306,9.023033154643441,-7.029402854361748,118.05129243965847,20.204736195931424,-58.624808725898795,10.513860765091412,79.61301748178067,-78.47379563181629,68.19390112204738,-16.30937093028889,-1.921850918576552,25.356450632918644,-3.646673468025175,-137.0105764092927,-10.125409052744255,-15.541777950035751,0.26918821386063696,-34.27487003635024,-318.2915032195255,21.141485435939604,914.7303029249758,-27.596723830856057,1.4443307315118177,41.25937479239543,22.514962459118806,1.679727081493657,43.660827066113356,7.994215776154254,23.999577971139594,-520.7889954255351,33.45168227468128,658.8346217161906,4.980768490565873,1.5532307075701297,59.33817188933436,-268.2915922801703,88.09105749901815,-5.089842436035393,-67.77306507620108,23.064733673410917,1.3185496115081745,-29.328813737848517,-2.811115438768577,-1.3670334350224995,156.06226058386235,-4.6053207348570036,-22.486601507720835,-3.2042787738246084,3.031966198034647,11.710690695209658,312.7660830291982,21.915456552468918,5.242828512741754,21.188040954371488,-733.1749450462279,-129.9907485207911,-10.91954296999536,3.0836284102315776,-938.7547496416189],"x0":[0.4105435716130481,0.9295495666663842,0.8104124583111818,0.17652735536393815,0.28907753929068125,0.09588194999133792,0.10602300844847079,0.5533652905262585,0.9124580332437404,0.926517762883668,0.4225095012942095,0.031227094182286752,0.07965173336333731,0.4949346513489792,0.7381246205781529,0.6155928089790372,0.20153467150071624,0.5469655406544689,0.5825508219423219,0.5570879875596801,0.6818526865054699,0.3435967741590562,0.13899819945692715,0.6118320838985214,0.02287496450036386,0.26525947539978056,0.16248336415334053,0.9637150217864112,0.6448339505861111,0.9178296526539003,0.7066903482920228,0.5444554661994268,0.7315553803370884,0.6781526741776318,0.7334327769007258,0.5175884386023764,0.5414832052753689,0.21701290340350754,0.39796127041363527,0.22272036236191584,0.09399333238040342,0.7124836819288973,0.837515356410061,0.8649531282289309,0.8754062914860221,0.7739715561894038,0.4351430130989815,0.057772203646034415,0.603002323478284,0.5254922991007744,0.5993796417630282,0.3511871115906744,0.9989193483365293,0.6883089794089405,0.5480981984805435,0.2802390081341313,0.23387203917289812,0.8423115300471777,0.9677669376254345,0.015869216704149203,0.3996396441986354,0.9174819815056579,0.10335148050048315,0.25099099126344093,0.4157431431005243,0.31138152968351207,0.46956494084140643,0.4591809581192583,0.413504822429807,0.31221955959206693,0.7071861867203935,0.528402171261561,0.8577910149012009,0.3327469875185216,0.9488883456887065,0.7389590114776199,0.055648487365585586,0.4012708852097475,0.6526010573574703,0.6143758996266615,0.706689281818365,0.1515836873833072,0.41124395127420854,0.23860172859882312,0.7641355171872506,0.08149017757516885,0.2550817514722561,0.4378169401778178,0.7997634321332945,0.35592194887033535,0.3962645152255826,0.6128567299086796,0.7933218071744466,0.6347789793767,0.015460203186375532,0.42871296845217866,0.993834071019468,0.9528235278800512,0.6901263249771106,0.6641773938147906,0.8208113534805004,0.3837724813762313,0.15377991402873858,0.9253128545973512,0.6427356946801068,0.5377346431114292,0.9405019874609577,0.39486016534345203,0.8037453770127598,0.02026645246872505,0.7074120882266342,0.7924397247568673,0.9184224800782441,0.5062650895247838,0.4752606294749466,0.37624143828335255,0.9551667355047937,0.09924886505279007,0.02015883625733883,0.6355645993103549,0.42418073815913626,0.5313807495948044,0.05979534203825754,0.020051856975277005,0.6301229698755066,0.21002261518638465,0.5359128267614777,0.64390602000573,0.645538082073601,0.25186011910338935,0.4820502564860194,0.25826442701946384,0.37481823252608026,0.8403022726962266,0.7324024245707437,0.47604585708792224,0.9072194502708291,0.8775425033584046,0.748511858961822,0.7851168811174702,0.2298470014086138,0.5030882978599491,0.48507960658102545,0.7846577405186062,0.7643539792264034,0.8910467434187455,0.20013398286568784,0.8699562708594855,0.10076977428515854,0.9486963806055155,0.5363294999393837,0.8551390037747113,0.5976200471373245,0.639020963319024,0.43125262862142,0.36102098979106345,0.8523108662223431,0.32773978846570695,0.7300014234010037,0.20257769752638288,0.7929398903981626,0.8004295725867723,0.29386551621270596,0.42400549758380346,0.8972907124874319,0.5094519479270812,0.018459099756825692,0.7904525153524196,0.32446757662294257,0.574927368973527,0.10373027348249297,0.4802117631636271,0.45651439779169056,0.6231091423925197,0.8870200122548193,0.4374947687205766,0.25615289779474826,0.16707188096608605,0.20730340752656784,0.4094965830510866,0.11074970619785596,0.8830113506680148,0.768083667520626,0.7435329402709825,0.7355723024078415,0.3850224073545616,0.9911366008870357,0.9220214030280689,0.699012036094486,0.5646410916740505,0.6003301932709324,0.5138920457274689,0.012753386155924584,0.1879267710541246,0.5128726690922438,0.6447826054990933,0.706763547759828,0.5060871555225508,0.1708996726041605,0.4714204985114234,0.33624579433158974,0.22573315037443598,0.4351472311349349,0.23620111823274748,0.8868913781300458,0.6670028106213508,0.362234304242371,0.6909561829420785,0.7542448042331822,0.8662261489167071,0.8728322516965457,0.39622971456523715,0.5352983330786887,0.9003130585866905,0.48092338356574493,0.4700284834520163,0.5228381365747983,0.9843295389272606,0.17189189326341037,0.315975352330653,0.15875207105052103,0.46190632090891337,0.3532042599830265,0.7113995063692533,0.6009119828665441,0.6480930117366055,0.291382648575095,0.3344423215642234,0.6759991827858731,0.5100669673843816,0.04360103594196696,0.763617648423764,0.0970432673012489,0.6344731695823138,0.4978527759278426,0.37450406053301766,0.5122096786759482,0.014222345017838478,0.9375171131143674,0.334369863714411,0.42500277175356094,0.23355631186313652,0.7978272249341987,0.22586863418236436,0.7562913034450218,0.6106165151229574,0.805136840059206,0.06368213156530644,0.2421690328274928,0.32379584023998365,0.5626475695817574,0.5338728312462981,0.23761181851238034,0.3191883423887687,0.8577587056912557,0.19985139074929514,0.08240219049586717,0.017986570272787272,0.9854510153315932,0.24937072857047626,0.2847848018660408,0.017613467755658085,0.5348688544087472,0.9277036760975106,0.08572717931132923,0.772311099536447,0.33161118625010877,0.2310780371689325,0.5370656901021345,0.2914529870400133,0.76690832374366,0.24413260309056106,0.3469256297244796,0.5118781657560818,0.34020163529878955,0.1490434766718598,0.4072871308832424,0.7058976893962894,0.773554974570136,0.2890558342786689,0.024782623835634565,0.5252411739902778,0.907740361565281,0.73210301200539,0.8660798881307052,0.7008810498231028,0.8790331976276928,0.9261204563771188,0.39838854138151336,0.2900835115237652,0.6416351421932032,0.09305035566899389,0.6870203733081957,0.5623349913548155,0.6655742770254371,0.38137340188375446,0.1675324494394328,0.9499132701223216,0.6819161263089477,0.7565807664369177,0.0858211986224533,0.237971705121093,0.8451231933394074,0.38360409841786103,0.5173473274060554,0.7853728618339586,0.22903956559625982,0.06819937123507702,0.1387320801877845,0.4957715249422914,0.5734818090023972,0.7045250616949879,0.940444897437583,0.746874380211537,0.7000403734446539,0.8437262910178176,0.8149650828648083,0.43077443251722913,0.5236383252150711,0.2489693270532083,0.6121271743617811,0.04202939458386745,0.38460273602662487,0.10677178089789474,0.718562718689838,0.9708536649188308,0.6421987379447895,0.6738089242509142,0.7096875817731336,0.08849428499498058,0.9266752459695897,0.7764747531291649,0.27716962885461616,0.812598323926472,0.6960605627854453,0.24192491092068225,0.8288847621618558,0.37399020468319444,0.00712825509942161,0.9806398931345484,0.9762587837500161,0.7619910526936879,0.9782836039828013,0.2235856264360172,0.10252440702194998,0.31142946168790697,0.7021640540935503,0.8545355074414769,0.029304620925841185,0.0060055617136769435,0.7954222937634807,0.9757721304013849,0.7061950916106043,0.7762293432186076,0.9848093237467317,0.18668823532261958,0.04621847816349578,0.09846842983712634,0.284923272618812,0.47851963206481285,0.6893528720027731,0.6962984841537714,0.9839786368755208,0.42262852491488,0.16031492522404145,0.31233295773542014,0.2665697201092232,0.3654188387230539,0.5065551327799349,0.12390255783405335,0.7685721307782207,0.4806754271513085,0.8194694380630139,0.44976050623170627,0.7102007025764676,0.7174851518638121,0.33445117360495,0.6805786647201044,0.912260246902967,0.08669795488522758,0.6392654635662776,0.4752271091563931,0.8450134328369185,0.6824564040226826,0.8133047168368479,0.7331008071846594,0.26553232411672867,0.2447403081524513,0.6540899799289703,0.7942588883925683,0.01713782176389178,0.8175904853887455,0.7030591919253937,0.40565735878753806,0.7879080026293723,0.44182540471976317,0.15200133499803004,0.5246542278779303,0.0160920855683635,0.2629158255989703,0.6035558256286377,0.013167907717505534,0.38547632488420436,0.9108909373832115,0.7956552994884158,0.2143590273802225,0.2723301333990029,0.015944581880510622,0.8870249081842314,0.41756132907059906,0.35259407523661856,0.11190389177666726,0.3343985393352793,0.31171753893169707,0.24981864581397506,0.24078585282172504,0.2500556635789293,0.6590549276415623,0.9477545315585247,0.4127908996479126,0.17194732472549723,0.7927546332342903,0.4604435091256438,0.9242208167424606,0.07699896328724987,0.6854706419376455,0.1655006193361166,0.8365649974821261,0.5052269669786307,0.7139789808108272,0.7853729634661699,0.3887421982690249,0.3646862057140001,0.9109149259184046,0.18076037011549406,0.757615077435819,0.4430911638211845,0.38695047545313366,0.13894442868422296,0.27676364362271433,0.6389037283097865,0.1755563884143978,0.7798805955499972,0.17792639545876932,0.4931894711251472,0.5812687030429011,0.6594505520996559,0.4811133338390483,0.4722488226997483,0.12423615882270478,0.6912614520167881,0.25669530311443656,0.15445909460501173,0.31040398085754006,0.2945544268104636,0.4234814247595795,0.4844857166603116,0.9792097498757384,0.2976051585303612,0.08582637190456732,0.6321427752773816,0.10895930610574656,0.3760393864809122,0.7379653275290123,0.4827148514187134,0.7729325108276346,0.7373549980967098,0.42729280643231404,0.5381595773495076,0.2028566499246216,0.18885611524364476,0.70949937557375,0.20141290946771195,0.3369234310320388,0.310132516934843,0.13790180934779528,0.20031706331200483,0.10027771857417767,0.5419911683209702,0.8749705876481417,0.12267792436456904,0.4987367376499183,0.05243275333232278,0.7704708556182416,0.1805913039364193,0.2428279764800898,0.1649979904661476,0.6038616144782152,0.10928765757287628,0.044860620883797164,0.06751965481108169,0.22194229151268186,0.1780235246218902,0.6405871458354819,0.700397873967431,0.5566629673465162,0.9274899881929866,0.5699254578348389,0.8531197939047426,0.5841596310454935,0.34959090300864726,0.7241965002775146,0.950456478295151,0.019560555418481895,0.36476521199833245,0.18876539131349102,0.0966020436551569,0.020016110341902316,0.30842205469072703,0.3540007355370476,0.8287757078778155,0.1342455912975553,0.820355855775524,0.08521626927043502,0.26522363197865917,0.3682178503197837,0.5873845000855995,0.2916016209323291,0.2580689728883865,0.9661690443714666,0.7905105451193077,0.24422230522946742,0.3476447283895958,0.7632662022296073,0.6994625370312249,0.722002671425739,0.30030958025241916,0.7126383110688779,0.9398727729023248,0.8912866029902227,0.39082042670248773,0.06402344838041207,0.18098514494713047,0.5180635439376351,0.530742565912083,0.9320496311779352,0.3144180204336984,0.7169203060140046,0.9860513582692647,0.44055301869553953,0.9661613155845243,0.038097061247488684,0.8537784364775074,0.978407575002662,0.06168038401902476,0.1607436582386037,0.852303448532044,0.8961677670169224,0.5808094348924147,0.5406722627031444,0.13419682138401323,0.5048458112855894,0.12460812964952206,0.37822323483572884,0.004377241770924689,0.3607592116171836,0.43317800148376695,0.43381422507160483,0.39798317708327224,0.57439666388724,0.8770151576288523,0.45458634547233046,0.47077569364837024,0.08752170036254481,0.5857985082803316,0.6919691471761191,0.9267783073259988,0.3422614787419529,0.01990168536972514,0.907119882185677,0.06594014772265622,0.9063310230374924,0.3941396866681517,0.7732804830925326,0.9502260467724706,0.726476054495024,0.4937799662815656,0.6813801541969899,0.24404975753741187,0.17405329680240889,0.9976906699128234,0.4999044841202762,0.006433646842290308,0.47728853128675386,0.8170077154302475,0.9064119810289237,0.14599131774736263,0.8249650806248883,0.6297366959851163,0.8050020745346467,0.18574619098186163,0.7308260105053783,0.6635004149826278,0.7752231076819345,0.8074100626427905,0.12199415134927971,0.16647719408494543,0.580378535389491,0.7703315942341777,0.020057740499065613,0.6713845969125827,0.7320175341169537,0.9071721232754897,0.05506018695519188,0.10657157534756467,0.3723137780769321,0.8062323470930284,0.7292565825370951,0.3548634892571705,0.20348814803456095,0.05128108857213509,0.07167844053552397,0.5877793662561555,0.4550808825267696,0.760130314621497,0.28780771519659765,0.5369087431279351,0.8908811720476029,0.7342002304625288,0.7499577618087483,0.7680416704384032,0.9889813271219137,0.6734479124268942,0.23600146932674826,0.10880678826283097,0.7916501977230848,0.2189808034851699,0.3954411704612957,0.5119529909880465,0.319569135568748,0.7988827723635032,0.14656887262000518,0.8812589593236544,0.4697069728840937,0.8285882048969635,0.6754279010283464,0.5929661520451635,0.4750302456341484,0.9574487826451779,0.049706889444778746,0.009774193831326494,0.11859568066404114,0.8552231364905634,0.009322465741465447,0.1810081521001079,0.4434609386545638,0.40225101683095454,0.0175245254543952,0.9970061568637134,0.7817407272442254,0.3838822172295353,0.2448806994333128,0.8596773483071691,0.5461373929454487,0.24064687840262078,0.24070774679441875,0.040037759371009285,0.7042106912979811,0.6313629566323558,0.9935168453748464,0.12740163111691172,0.5025664681591893,0.9512768308580088,0.049881984643277644,0.49788785776337385,0.6915071488786768,0.05751275146276469,0.305905387877228,0.9533905426462208,0.17500359014481304,0.8493412298053102,0.7886247909583337,0.5708307192683815,0.1711078007790683,0.1883267538353277,0.8751229520760946,0.536956423784994,0.6928207399540445,0.0017445509054754282,0.0012832556876196666,0.7055530103512373,0.8257515540268869,0.9858136917869407,0.2368489867901844,0.6771693297598493,0.7288093231660588,0.33335779034347124,0.7798633147991825,0.3395014972953958,0.018979649998427384,0.6888061017739713,0.6709350810366641,0.3319089708334382,0.6938156528923194,0.8641242728205303,0.7684778801676289,0.8457050991501363,0.3216332799536743,0.1981494021408321,0.08125009797858485,0.9176394281669922,0.7348103987807426,0.2737978535630141,0.3028022413692819,0.014033728163378001,0.922192084473761,0.36561659304491334,0.3239134552298366,0.9784082303696102,0.8251667625990626,0.7262570052140533,0.5121452226042607,0.9397224455353146,0.7336220160301681,0.1178496049202411,0.6264497311109705,0.7914338526470488,0.8293639610683226,0.24616833342073163,0.9039571110578999,0.5340997565860546,0.7797140093389214,0.5513625470561496,0.8726042177351301,0.08977841163799782,0.06175908068651026,0.33963383378321543,0.7048244047148913,0.22776293674562487,0.7817147514536724,0.15037485661380012,0.46262136151442346,0.0522665632017727,0.39710651401275876,0.6115658764767244,0.3235374760755294,0.8070126325296201,0.6120800785861795,0.02747309489032923,0.6955934792103937,0.6200471834680639,0.90106025916538,0.9257541076539411,0.49471691189928624,0.4362753731123643,0.917833372921993,0.16705758194047826,0.1361364838694763,0.10973241846647652,0.7156527666646886,0.8208172497589539,0.04336398470180525,0.6336666985721933,0.605466815880491,0.5790055296660448,0.8104668157585306,0.38638062609738366,0.13688618979199885,0.015958654600641387,0.40723879790165785,0.934430050758527,0.826345543013187,0.6593989299086489,0.5579722384849879,0.7541196448668952,0.09670613413595652,0.24870843648281826,0.3410558482302073,0.09744567127460102,0.3372390876538236,0.16473972493159095,0.35864347575756184,0.06048454484691934,0.8861043690024812,0.6888406576482591,0.6221490818604367,0.46482832948984454,0.9176609752417564,0.3211017908334697,0.7059398575879996,0.3714745709741789,0.6793380494080588,0.6763526930102364,0.396308483335887,0.4372626677738267,0.43721331249628337,0.41972005574366533,0.6995031732434052,0.6120346496961244,0.4674198093926736,0.056254150381263246,0.6190753311830377,0.5709813610897283,0.6070807143572157,0.5583552869877078,0.21755448316068415,0.3379707036206021,0.33380988184999083,0.7131470192995844,0.8474637283405351,0.9797403301897463,0.22913552735719378,0.5482887837047796,0.11276536895545552,0.6587820647763127,0.3577009053798308,0.3624545233894083,0.8961681342203771,0.48082196061119875,0.6068308259031461,0.3322003801596274,0.9725656861757854,0.9181748091660358,0.29654902635133285,0.8696977225279412,0.6145526261046368,0.949266417064115,0.1425799361881004,0.519482818842609,0.1072255677365348,0.07894979860085027,0.8920268721557685,0.11814064416465775,0.738190458555875,0.6685803665668202,0.656704752202188,0.6962814196086342,0.4454769729993244,0.9974195926698151,0.807632543285203,0.5293652047187059,0.047658306879629686,0.051086183339222435,0.6341909208881189,0.9342792944253666,0.7681342943083753,0.5046362628221543,0.3747796476262233,0.0037755685663196648,0.9196734847291219,0.5482450085825341,0.18766542344428006,0.1593449765609034,0.06461568981961707,0.1951109873481991,0.8634883618453468,0.24402852672949193,0.0528527923637756,0.28736589751314123,0.6013991624075206,0.9114682164977599,0.42148889417717816,0.7008620114853545,0.2248553649274756,0.21769478826445976,0.2273371265438422,0.11268548017258428,0.08765717953306074,0.42289647844354383,0.6763227060000447,0.4756071317173598,0.45212446269505047,0.3564824561242954,0.28853534030294137,0.879954944824372,0.621705494748986,0.6861754885802467,0.05156475141318273,0.8112595099144035,0.8189924361329608,0.8904496617265365,0.9038582764118814,0.9077093641003722,0.21250303285040828,0.5202151516640854,0.6425667761227356,0.48260311937635336,0.8888002017350141,0.2861311591692297,0.4554447714828014,0.6034541674373084,0.7495792089691518,0.21451959643776686,0.30345345963579584,0.5325724338235418,0.06356489673948218,0.4706220628677762,0.43905735539628954,0.6176634753317929,0.9221102563808592,0.1449956869768081,0.2512506285942391,0.518336426026569,0.3772657086595341,0.3295679905285076,0.18479718210999163,0.9029177148707686,0.27998554076685345,0.11985338098255394,0.21347898882104088,0.7626208071520675,0.5223636552376654,0.349518759484825,0.01222898668195338,0.6613933897075,0.12489735263128976,0.7525429276415889,0.28684374205650265,0.677557771822848,0.525273427000404,0.34520912606911236,0.38702429906252656,0.27566777707262036,0.01689827279071654,0.39161773162090774,0.505688843926754,0.010005385446528514,0.8822614221950298,0.6363850482475946,0.8421055091201806,0.21232062939336438,0.5417515552926595,0.8241880276898366,0.9358086844974358,0.7879267171659825,0.9879582713248742,0.5727286504271398,0.6473928372403841,0.3546992634682018,0.9722884311720643,0.014336913283409691,0.16711032371333268,0.5051563391302214,0.4123834365805663,0.04729037180124229,0.6201641639728221,0.6743772134176977,0.3935978003071472,0.8851585406693445,0.33253439566949927,0.5563112631595628,0.7434774672221807,0.554130874967429,0.23969700121134774,0.6163254472347826,0.43932853923722615,0.13017570868138217,0.698894299267282,0.026845566267363008,0.5730178809942839,0.6580113591837233,0.4543373751626578,0.01062509258551847,0.18488824775329893,0.788172395755071,0.5847292902762218,0.9382977956561254,0.3986923470742616,0.13654845665702786,0.8741916349292456,0.8846139400552007,0.13172603828106655,0.8148882992422859,0.9164684807350088,0.9508833756706006,0.24989131460041092,0.42236275931142986,0.24214263269886116,0.8740525234002177,0.7908136934347523,0.15834612649977564,0.43169718562206727,0.31693947597349936,0.4490256841676705,0.9064952940196336,0.11142349200976653,0.4054269390205194,0.5747579396010642,0.4765315179613936,0.9346284355241397,0.25450822837156184,0.21170109099404,0.21473519230888227,0.8300261201431438,0.669806702114899,0.5170068582869232,0.48489984572875233,0.996604511869404,0.4695612371219364,0.3922905696579233,0.550613491856609,0.13130276834165633,0.01631972699781903,0.36268270879552333,0.7058502392162331,0.6048323690529838,0.021477773445266024,0.013287304232881159,0.08788624635221631,0.6652836402803828],"gamma":[23.20922859368032,25.077954640317323,21.866976114919122,35.7938792387833,49.837490499017825,21.284973739944146,17.980652771692498,39.55791229940434,4.792747794953678,30.757601645748455,18.698577654653135,9.17963238580487,14.560411276489782,38.22287304119324,20.85813931948558,28.623234360778294,29.015876124268235,45.76294810347804,45.511893651126435,14.854181303251213,43.2579790784699,3.268816507870409,2.820589161976894,44.19790044020107,34.89124116279253,46.88736668515333,40.44881521824668,32.44770039964982,9.238031816656168,36.05749130906094,27.305710173089448,20.357677361232028,4.158901285621075,15.582111767265516,36.46310824029283,38.986047396696875,30.38122874032204,44.24574146982526,16.93779978973412,3.610638353814577,43.02101895049023,0.710903783058503,27.329668589428614,40.05306963731176,16.92609755312703,49.07181552864742,25.978172997040282,12.661431603934837,10.623243911563918,25.662699533914047,44.355047824434,47.59808448473875,18.809474329020947,38.014624939943154,13.31036242407021,29.411077473536196,44.48773264613264,23.616208608483035,23.30200831839553,6.382187532032113,10.22915891632893,17.38440121132666,3.4849132599874766,21.012767508404963,24.935423729022943,47.97829758678765,16.096162212840103,7.3203767379588776,2.091982295599526,8.542741262180865,32.55525259926121,32.87576028928455,3.4488211622639375,30.02908826922398,41.51095386382645,19.629722212134904,1.2130978213180765,40.83689268165177,11.966341220373133,24.246051351170895,49.53172059214776,26.421506571990548,49.92911391141439,29.362396758526533,10.371638206832545,44.63972970561099,38.38166189125269,8.387851238535971,38.437755455551645,34.72332047999066,3.862386243843663,29.293309399996392,27.620646877151078,15.525906318355954,34.21037773570218,45.33582428310534,9.33368899874434,7.712808323513931,8.457526420389861,41.83346543681109,23.065133478887557,13.275951648615836,11.397175298563155,45.872279567988116,3.3671274989779065,10.120123919949942,14.1019526442693,12.512353336785754,6.834985852430275,2.630037103518812,7.060218023152409,31.283490965178085,0.2519166320545052,9.499574025282797,24.86805726194309,46.53249578279265,22.619324318626923,39.75312237220632,29.514302929391377,31.52676792529554,26.698307039209958,28.674306747131574,36.647127054614614,18.08504514638184,24.7016257560823,12.650256397901206,44.81691572731514,37.54846346245875,19.626464207663396,44.94875848229422,10.194335837034119,13.677323622563309,25.658591103082728,20.42820034174977,35.20743824645861,21.82537070357692,14.608556377402927,27.9594466502049,29.17849061135106,19.92887369133903,35.093914922708436,5.785897956564778,22.294101857323245,1.1425661344452331,28.476459463003323,15.218176150299145,3.0183038523280192,20.865350417800844,35.57615223015902,15.679195211551267,41.7646100565109,4.669809910889223,37.72934358753908,42.999911045427,8.654550803662342,16.624850286224092,40.66444974695155,19.2298184098445,45.70885484439786,3.634390997721526,21.985550050574552,44.477187268683096,1.8217343728075597,46.62872675853952,30.498305984369434,0.8550224266002715,6.857682952871313,24.268286879920996,15.45169549852119,6.439485111869581,35.19671904248944,27.59664210405248,43.38402600793416,17.144583324948748,27.062540043918514,49.60148629730511,3.516400018404331,4.867738777055863,0.8504692487930954,31.16355184820675,2.9072404234253835,1.5575315692061054,30.594933212505705,27.066185133019584,16.158121768400147,48.46474786871669,12.828211118514455,16.97036594621294,8.56428405125409,13.647253394045478,30.968436538384413,34.721472455389154,14.709151820661958,5.6257832960106,36.17565606745763,4.431747319055579,1.498969604657585,46.89773302317206,25.110605870309342,28.228432927870816,22.485973806947445,8.055947591300505,37.377043886947746,0.09904931630188019,31.071272109639803,49.6423438350007,19.208237374689073,31.721241769609023,2.673279610160517,20.963710254760937,5.357258315107993,39.02789738235284,20.778156105688662,15.690112305897175,37.499582714513025,33.636275915765054,30.046905197359543,34.56711621020876,0.4763877295492325,22.094852326822835,2.211058031912838,38.669015895010396,34.16368471412107,14.814818077674197,8.824053157835133,40.22958668126001,0.5572897488528294,36.8188744481591,24.48731928187341,25.61031866629204,9.132493840106815,4.616248740042095,33.78942988023661,1.294730822850243,31.915333988044125,20.523984076479685,18.470975360114362,40.64729851213552,9.230312989106903,2.9859680072886308,20.493970669714912,35.99363964840505,40.58379496016884,40.21085836185716,3.1757948283659854,18.7178841141488,12.860047297676779,6.921036710380979,40.323477566478324,10.463435470712968,43.66836905165321,15.869056070071409,24.424299052375652,39.80187564753954,41.318151997278264,32.147773106372725,46.291797905275324,3.9203497266884546,24.866326231022818,30.299428547087025,44.939141008158416,26.051329059121542,31.89001878768317,35.68716401911081,15.787611000846514,4.925863240500428,36.78784229679706,18.490443700978275,13.174277295782133,42.30976797029069,48.197011441808044,1.616378835175114,28.471149304126143,9.048268167652774,48.09225510932883,27.48652842092231,14.119115398725569,0.9524081600231882,14.963847979410104,32.04736742980588,32.53366704656834,1.7663105598847872,26.82914171872106,36.308738236034664,0.5334666078895323,27.78675372439945,25.93423840383766,2.979655203957232,14.300585634885799,21.559277337119575,20.974629993948557,32.374183772737595,1.0845974793191826,9.299567018071365,5.120677885071478,31.30246789462423,35.89299505710796,27.43108869068942,24.44078729926674,3.4864889347940298,6.153758850780955,44.28705546260549,3.772464070942372,42.72230496989794,16.565079258952064,26.919129530856978,11.05570284680435,37.348373998308304,41.04286654395018,20.339865332711504,15.64661497907035,47.552725009014516,34.087052468006064,4.99335839004047,46.615542648005345,9.405241462668002,28.475801045906046,29.54933748613794,26.406543532310412,20.064708759934845,36.38964894677195,41.54852114543046,7.42703267574406,40.39581326324878,40.0553448385782,45.56937187215343,38.50290021251311,43.88954299883133,34.97956594442455,8.390537840804313,36.78817136533815,10.850436639402938,14.28123142510982,2.840135074724337,3.2699801189005284,45.457349474261,38.52052948207294,11.356505228158243,29.00435660811562,19.541835023710885,8.254057234691226,38.855836808864666,18.543565858218813,42.41829319597117,43.476358319359456,38.34714575356073,45.77722452226691,44.71355921697814,17.848414076899076,27.380933288348498,24.30778172451834,36.89437484599011,5.73791790595145,37.32237228889239,3.760451532414788,48.573960313251106,3.401664106133251,32.17963108635764,49.608386547495485,26.504892313859674,21.342244460718383,25.879277779444877,17.122648200395517,1.0095346054753374,31.05938182574304,1.9776242270994615,6.150114066172785,47.09057001741767,38.73170469052572,47.84687146971297,0.13575005317763011,31.873601510217973,22.581431826808274,20.202289892053425,38.504965309630414,9.207797670366025,16.703832723075372,11.483834160716588,22.939703424790782,24.04555529485449,45.423507032820396,15.928458699210656,19.108948012927584,26.28186049610627,29.92199368996865,48.691080651315275,7.641552071637559,3.7416172542262593,49.700097944575894,6.860082927666755,15.136592700626295,41.130909538183666,12.214595521117822,28.769800482846975,14.740357316956166,0.5673677287035828,37.248102775009905,18.55281606221858,38.10954429241627,21.37706227824806,28.793645296069425,26.209330811099242,45.51576420271608,21.88133750208262,5.583560933789833,42.42594019445698,29.94094551264599,47.37544095479368,12.870350467388448,11.60584588196054,29.477491031084913,42.239325490098956,26.759531367779754,32.47635288525604,14.963932761890497,32.079732101892155,38.23599766205801,10.608913904439865,21.94071012616857,19.103107239734072,43.46959052334595,32.401262421302604,39.31252835033385,6.715680079164422,46.292508710278135,48.20644943907971,44.08178206529707,26.425615619982747,22.017517316193068,2.1501676682693427,29.917324744477202,38.634527143176726,29.360301099349872,11.688898713489127,47.80449101427333,35.31926727106407,24.319584205930887,9.0749442807606,38.808151368344056,1.7000266142128573,31.094798817400616,16.3658162845402,2.4590657897535895,9.117747469996583,32.96586548363707,4.618447925729596,11.34813603795337,38.3940111403305,38.44077355597461,21.491909892094828,14.843009910405824,39.10307941436319,16.461605063696215,22.99376773394006,27.43569452736201,18.062179459462037,17.32240200705324,10.883042378893293,45.32116924949268,2.4372692672983476,4.468529100985174,34.826224338221,21.2268979715471,32.3888092753477,41.518095267381014,30.72867475287857,38.113799240833146,28.905404202661867,39.76936425059411,0.7156519826346464,20.689069012472405,38.117443125818426,14.912454552250853,36.87107698752728,23.72658997928938,41.18637050345328,48.34976040917803,43.89776726600143,30.6638425281633,30.57343504869998,14.70148156179355,40.29640870926167,36.90037065563857,35.05369148086657,17.91247782174892,41.74315087442859,43.66479845766398,23.832756651860297,38.10815614043644,40.369315047139786,21.19415146568635,17.198933548136097,5.0235479110375625,12.577068823319193,5.326661516433506,1.3438721387941888,20.767876914375982,2.8794118464785856,12.990758993807205,9.888673761302258,43.454707634321835,1.2060075369064283,24.66873742086313,40.982937323835685,39.092561393774325,10.118700924077517,6.9426130614448915,40.82501665217939,44.54444124394376,7.44128793561104,4.664417215210204,10.014408657231677,31.80889849760812,29.885306496807694,16.519465313608684,38.52460523316328,0.7968429463283577,23.887658960523428,28.588952651968846,27.43500117675267,6.469219277377891,32.95792801453503,43.963877320648436,35.12490111464651,35.34129057942484,3.5974398731886126,1.167815364421343,3.1153559006446896,33.676307933435226,20.500352455099325,13.873081003972343,13.653201852285468,6.049119080303312,21.447864677906892,13.407463917078788,15.129839640318178,47.115015102894944,9.964393810600015,42.44083172399387,45.81431970960984,28.05692421172821,35.97891448724491,48.349041958972194,33.66596422503475,11.441589445116506,17.412098366862182,44.49594727790477,20.197553388940182,37.39896763637174,22.204088205186512,13.351488144213718,42.102076298684146,0.20196740214429854,0.46357989026473145,5.813533946817017,24.835301327650594,22.962944876823023,34.917820095023735,21.867715683810108,30.827981334916434,32.041314599637936,41.774274333354725,29.35353441543198,9.939594236769489,21.77566818037825,10.974485695638469,38.71612702003257,37.640691108870236,28.10984380018653,9.768483866717848,43.34051407458253,17.82146270259062,23.167890989410388,2.366760478840113,29.813112640516493,38.72850952931456,36.13457914554646,25.25210995074224,37.882965069474665,25.43319344732955,47.298429525250455,7.808774803140239,47.12869044897911,9.254974928987492,11.195806924129649,2.443547798388168,20.808385469005607,47.46553480779916,46.52002831096873,39.02957677315435,39.42751139403215,20.932278274053207,46.40762669584627,41.772977578048085,3.0920369281871474,34.20724446109736,42.060967091611964,17.86675870111466,9.213284197508365,42.86830436357327,13.193362446660439,47.289811105669834,10.266424739375035,32.25114579470021,40.95811831669211,36.2762191092847,15.734089020026964,19.692446750852778,16.916527301434325,23.819441629150727,18.198158473386616,35.39602484417288,44.36937912198105,46.56053430564137,37.15541588861772,39.27280356953011,14.305467146899387,38.01137055511264,41.50281980580529,20.410288005202194,28.32934427171463,42.77940087600012,42.4820681633701,47.982387505980164,20.65692468201492,40.95935144557351,2.385247246559008,39.734118967995194,13.970736436281939,46.761037275173514,28.334586987842304,42.56012183467411,41.75523111193581,11.896641306451505,11.34121772346619,9.064974532580528,25.48847096854441,26.96618504456769,45.20332595058585,6.377725614233743,28.439153841128505,45.83565338103392,45.95862477904411,6.647631069798299,32.52204855055337,49.36196780983815,16.725203056372795,32.60918441930909,35.51974898583939,6.068544245321639,1.4027131319755193,15.308489793253521,39.05116883666665,47.472745120829586,17.37897172773888,13.28087609595453,41.4115524503884,4.5676633900542996,10.072013214266295,22.207352792382128,2.120307266207111,25.681283631002415,20.73874361628881,43.03509999460249,45.032840604636235,38.067232110592556,37.585217370104004,38.44489208118959,8.303558920608223,6.639030766915233,19.62524504515225,24.814042070710485,42.86546542615904,8.155431610316032,2.675633231611063,5.359236811951462,26.29936832512394,22.698788174352703,39.04687655860801,43.20547474129657,22.061872380278146,39.63820204542786,39.30047522626562,17.750273389284065,21.32941341877007,8.829598585936916,32.701850133631424,26.894744744176926,8.948390462704836,5.663754238151553,8.869215630359884,45.663589755565084,3.051800661458448,45.66904546972631,23.501709848584973,25.7776661252918,7.8240044501095,43.457020876758946,33.448092123910676,2.8793020344143105,23.088951922593747,21.464770652325804,41.85966078051927,16.52183481633349,34.55628163598911,16.47111738728766,26.542001583483188,28.17001325091776,10.626002432915838,9.612466000530873,21.85680994186224,27.32262351949746,2.2874153304162093,10.101367424752494,47.921015955592615,4.676082693235029,45.82663949997025,15.94664415983723,48.280385548291136,23.920409919154608,30.791488328896687,47.075441744992595,2.2287654911554156,28.450085663166604,17.593389129503468,36.169326959393686,39.57008544466406,7.445585478509442,0.5957936908821071,0.1979433518031204,17.115142568515974,13.845368061633112,37.84881535773636,21.712065498644318,25.810698273119158,24.485796774198654,0.866985389002628,39.853000318761964,45.44884229527051,17.925467265869454,19.379791652865997,23.99695623596547,26.144009306290485,9.146022927973284,23.88944645639096,39.0992922195758,48.08083575817006,9.68674303963757,38.531580541943164,34.50261160794844,15.332136311739653,28.60329232284251,23.165096525820328,32.450588451972436,47.43460727026526,33.669035092995436,38.087109984647874,30.081288895222247,33.913099565055695,0.7667856599762657,25.275261743152754,15.25985913217217,11.574646097851016,45.209234461837866,24.553423257124372,48.295199739544174,46.46638804033334,28.42736389823336,27.716046877066137,33.22691245662581,5.228253547519579,35.63444057464844,27.911861600458266,12.490241820510473,26.519651780402164,20.906161316887296,5.9457026250608225,46.75861256285968,24.258388009140518,1.2434718644687814,33.41168632298592,13.36705409266743,5.185520306369373,22.31195581183033,44.23088190722089,34.81998553491093,25.427663643568465,7.120008487825158,22.428657447059376,36.857263449187215,21.8364915695493,43.3818008659146,31.59332772912393,36.84745480829744,15.335488783856533,28.458120790561136,15.064793196746795,37.46676622131372,16.69725111177065,15.510847789922677,7.799513648133294,12.183832204983513,39.82018441998881,47.422105192733135,15.992028196708663,22.531872846991043,11.777251749449869,17.822294344022392,37.83653538379704,0.4773935269192564,28.12720433824675,22.009453835627525,2.760311018781836,35.724730628495834,38.059276559088985,45.04973392971131,41.9137807177581,22.577582468275047,10.95099447062845,24.832727105386333,32.08464044375944,9.468680416750496,8.729122580115611,12.944632695166014,17.947638704087822,14.697575001476459,9.443527210314306,18.56799775472522,18.043282508549517,8.352917216564204,27.562059362556212,32.0413805099909,35.98761790087076,9.338666607517599,20.18040473450633,3.3743506518258304,32.931525053834996,10.159881658211622,33.44357213291309,13.012811609454744,29.839212142329284,6.385894428275652,48.74095872348997,15.792024221176415,11.363877943938283,39.59934158081235,10.877982308476962,15.882188745081505,4.6030833909219915,20.807545684588234,43.947574620570606,35.30497259537096,12.524037294636713,2.1454370845791826,6.99381370137635,2.600906861124641,5.2478361322424005,31.274634608172093,34.44271822981414,7.223288854674104,20.39416212858719,14.663131343962466,1.1857651727871232,14.078836268877925,6.993570251284309,2.7603200048187393,25.30159891678475,17.292216402684257,34.92329252489996,11.011329652670454,12.804677095212257,35.34199308921948,20.24162860242422,32.44625850400645,16.14125604507153,12.054391148129916,48.48397100364286,29.11999692763422,37.38105132046863,4.914297708032822,6.152759997479807,18.253254769674665,4.229127669317445,13.561206396610014,10.18538644282394,25.742787088141096,44.4823984401104,27.044070063828972,13.844648497120582,31.55872120809169,1.533259922417396,7.4081701730010945,33.70605004196305,25.783061419841935,16.795526830558384,47.7978062003578,4.315957981308982,17.1733309391762,47.7162265338426,15.063850423614378,4.330921566732416,5.523859874730908,39.34495978387488,3.043003513714171,27.56389349071755,28.498157796696454,49.32970075179052,40.79233612648711,37.46043952317611,45.292395409235034,22.183112953902505,3.661299248928518,5.530243120496181,0.40301750529742053,20.02984843508261,47.68671002252686,31.9517727101461,33.8733860818996,26.76354438169679,6.259774184712008,15.095664416233923,46.5621808421244,1.9324917059783342,13.649464283918999,2.197789732666,34.7154272889875,35.65702200549071,13.529809730908937,46.361419227855606,12.187006454051918,26.15202704828421,27.6181694095441,18.214652454572345,10.203508743256705,27.467302939965222,21.331277338519826,46.42022819028945,21.341763632918553,15.08547591932925,16.04510517094341,34.244118437000346,8.198960526447364,5.664183125008504,40.97772826765035,16.087190175475342,46.677687617000764,14.24289860656125,48.52310212812364,23.34337198322194,11.142213007654,9.66574386420821,23.879219131705575,31.887271294258703,25.266488721325064,37.03516840872309,31.610859808537896,47.11193308003878,2.1752283481240586,19.405652323963785,39.39388075004563,13.883388966744691,11.280161432124203,43.0997080295202,21.110953047414316,15.386228932615376,48.30747187532215,1.6760986054277338,32.659092149938786,23.37366466452161,23.449738948142198,39.06540089206963,26.889538633823662,27.339887321049417,49.550343243462656,15.88753423317717,14.149697904208358,48.316291016262845,45.85400257669514,23.02072504903032,41.411514651220784,12.027154421421038,2.215957795186785,32.2618943699249,2.3632315027970474,12.220715060235033,42.96748197195106,1.5560887846171378,48.23182198573674,21.08480484473132,4.978073045648756,49.60569288372446,20.868452063343533,12.178075681243783,4.169775448066471,28.268840548758423,24.498306647408107,43.07983155739128,18.477943878850635,14.160894860655926,40.87927806154412],"p":[0.08472821875014036,0.43173153693057387,0.7761334625861094,0.6284513628635953,0.7647687155293466,0.6457917419681343,0.8075739536755309,0.49029178178465105,0.497555891678487,0.25326497149093075,0.1587683154769428,0.9446473272313256,0.24815325377023312,0.6669866937464273,0.4533137006960519,0.7685468980758707,0.21046195651919697,0.03197220189069272,0.049860424148441274,0.5193532350431191,0.12331776129191607,0.212777355581645,0.6989644935154151,0.6210860639895561,0.9401221485428954,0.3559307128787599,0.8497838651743914,0.763637525554349,0.11103277262127276,0.34909952984732784,0.5832181618058778,0.5662344013142229,0.9050991105223234,0.1939048773253782,0.3395823693578197,0.5787563632062396,0.04068814034468393,0.5935012158015833,0.586168320954398,0.30613667811725787,0.11002389473821217,0.05047637734232113,0.1990739724688131,0.38190194952952705,0.5691904770929583,0.10128632048587805,0.29981001135830443,0.8919869006773997,0.018300905258648026,0.4514480761859143,0.3873019600904697,0.6023447806725069,0.29779234122584985,0.8452748793866773,0.9488746138514168,0.04668190044793641,0.7295347913314414,0.5202626950121962,0.9870860225580254,0.285158019560241,0.6347812461039744,0.7075471874710213,0.4324369824236145,0.5732590954503922,0.49838013461144426,0.7538379507733408,0.6339958990322372,0.8866654364574094,0.11338270179408916,0.44847039618321527,0.6970056908358302,0.8770837397724358,0.6411187657890338,0.5769467053763211,0.2823478075554584,0.2764930959798588,0.5981962640338241,0.15356963366856946,0.15815999470426667,0.26325266275533377,0.08607540525347424,0.8886958287784779,0.5276711080038001,0.5265328612450577,0.7094625267713952,0.7684065390269068,0.7638720476466558,0.8874793657086972,0.8942685363639205,0.6089157836946157,0.8579372752420444,0.9328604493012167,0.12995023416698448,0.28149952308855086,0.769297009785149,0.12460650570655973,0.18385778635069472,0.8790867589921532,0.1608971011854119,0.0841015291813676,0.29766338664377034,0.5613569170666186,0.8671025822984506,0.1654976238707484,0.9790268590159446,0.19522018303005684,0.08840643181622032,0.16381716937882151,0.6904157076479023,0.6087215323727317,0.349623693791949,0.7019644526208741,0.21864956188747264,0.5646926569788897,0.19575308954201298,0.06776222427215317,0.7165835082637806,0.27757909507167744,0.5200621791834152,0.29030848974624246,0.01638067300036017,0.5501997906605935,0.8129320428005369,0.18188229647898435,0.21223154887574847,0.25107186308454765,0.6589400474720357,0.3523385949298852,0.38984630153331623,0.02901784773737459,0.3834638854918333,0.8356885666097944,0.4048672506179636,0.20503937794783256,0.412454153056494,0.4957327315886939,0.7520979917908426,0.4785113976858528,0.5752785908696469,0.9828946471907287,0.7566115984760331,0.25140068883352473,0.12154619614592743,0.1625342183260361,0.6421394044640041,0.9011881383130707,0.43706663164994586,0.1436518016452366,0.9549279878267902,0.9097879954514787,0.6889000409926638,0.36730847032859204,0.09490672164967995,0.22434347134510246,0.6968908442036705,0.6920075955664662,0.3588814778739149,0.5872422384517471,0.8021114281571784,0.14804757405556535,0.16014301209950776,0.6544354727096244,0.74965966615984,0.47298726176105355,0.728733257985198,0.9181372762278215,0.8299401295554021,0.2005457541417477,0.5718538661414951,0.4247717517954437,0.19200186410591424,0.5526135932773495,0.7402545652961321,0.1067034220378571,0.10189864743694788,0.14225312004491197,0.9041395098024101,0.4141111461022309,0.12795208751218135,0.39050621963529597,0.9343843547707362,0.12396586225350004,0.20673176398460114,0.40045260602497157,0.19799845257244586,0.7956886626818023,0.15496114240436132,0.5783753756178347,0.8091922795132811,0.5289928319341808,0.8800396068373522,0.7211620432238801,0.6113437188793098,0.9625784859310742,0.42940747350919795,0.16026452988673578,0.47755434787672946,0.8279410767651993,0.6837149033108993,0.8105340852964216,0.4930908202636535,0.3627903020186414,0.20398066603990483,0.9957592554363479,0.528435612024577,0.09041007495431042,0.697904368408111,0.726466099849663,0.26431780561135176,0.3443439470829601,0.6165649244952154,0.8947787025629395,0.13912442453257245,0.8829622311070002,0.9834895917407915,0.7263207244696595,0.18034299624670935,0.14494912764971946,0.2302907167666206,0.33813907380203556,0.2009650883259102,0.6722101805488943,0.044385533335113525,0.8202278667972929,0.718481291258313,0.2526585975147184,0.3127373906535391,0.719537434154198,0.15797710037428137,0.4752355236372505,0.8618925275084879,0.505776695688481,0.1990667086272333,0.3897426974643394,0.9124076865500628,0.42167364803065066,0.17293601820635396,0.982572128330311,0.17176600068410108,0.12869220604997134,0.12660793501114576,0.5803335186943646,0.15173339071096303,0.6116545218624931,0.7786955491848806,0.3272716054987004,0.7403112096420548,0.7028987066100103,0.8963849412656257,0.27147121420332465,0.4056019051769826,0.7402126964844704,0.8614071746809286,0.42435613860854815,0.4331553456823445,0.05185299188294068,0.6633038456927283,0.3227766481179599,0.7783712135327243,0.9607307073382134,0.9199382500150675,0.15373829398722672,0.8527855644716986,0.6169526180003,0.21081284295266323,0.3520244678069069,0.6919317530506979,0.9254877311938516,0.5350194470007534,0.04736123423510619,0.7846833286756283,0.10922017008862395,0.4113871326245344,0.17679685040549842,0.2068000726313679,0.40401083056454823,0.768090686228194,0.3129385249446166,0.5388534767127164,0.14311841620129084,0.4436162948582363,0.2855571505578429,0.8703107702159574,0.2154910193318158,0.12638181782520386,0.6553671199895164,0.8727980762050751,0.6187643215108829,0.3971277055957825,0.38314694025503093,0.345908812260622,0.7564528249370603,0.5772909773524519,0.43833748232391123,0.46589235407736274,0.888278041561724,0.5921266928117546,0.25867834628606534,0.8737290027955609,0.8161696759411148,0.8609544488305252,0.26566241936484536,0.4499137041096215,0.9169206021753988,0.8180176838787567,0.9346251422107938,0.02009124600734169,0.7966064959670052,0.6573812963716805,0.08797699748915133,0.2843642046304562,0.863402761305613,0.9155201109848339,0.52840749871395,0.3430942303467561,0.5185271437744452,0.14779336500239415,0.9188263276822495,0.6068210650284178,0.2751328375028217,0.31896549552685705,0.8740388239166317,0.8088264495674589,0.5615476628873828,0.20348775240220962,0.31869859271612655,0.455028661598053,0.7447314645236012,0.5353685415954321,0.9497049921729348,0.6311319659883359,0.2724277259307757,0.2605653941565458,0.3233151948353352,0.6273261420269589,0.920824416123635,0.8830852872345099,0.8732098848827812,0.9120515666103655,0.21936268697346573,0.9360176572915855,0.1515275089858037,0.2510893740416771,0.25896302732474585,0.6089787098874861,0.32934817080916967,0.08735612961897798,0.5106985881290116,0.5784389827337795,0.9554675002916775,0.07350547538762986,0.7531927853620164,0.40542083368667714,0.4807687325560983,0.9656966237359443,0.4782551973002447,0.3930404327949675,0.40374808749565605,0.5819004690788645,0.12662741832097035,0.948924428140504,0.9173661619041045,0.40900206360807556,0.20720760783504577,0.9715608950795935,0.07459230458801591,0.17886853065434827,0.6212239435366029,0.861772186278271,0.3830125586504425,0.9963199258489033,0.7596903213308166,0.8006336028418581,0.6201654963025696,0.24588609646843906,0.8545025687697867,0.40495748385542196,0.45469069081695657,0.814221300378384,0.5785630771022143,0.4319012151196391,0.2963426507365272,0.25438333568069016,0.8251008482152604,0.3160457453522736,0.39860711680656413,0.8456296541661596,0.7491804416692216,0.6597840642480957,0.08727197646923912,0.01986755664971196,0.2401305066235615,0.9948076601096261,0.541447858473848,0.8087587199574928,0.007352879766052034,0.8912340366873712,0.812155529563136,0.940140705534219,0.8119372081541671,0.1714803946640706,0.6392526581411877,0.2483531453192307,0.2986046258089019,0.8938207598075909,0.7134844723406801,0.3796350416629295,0.27788557757840926,0.928806182187651,0.9982315573909899,0.42561999352813173,0.6403546063410619,0.17396352638455848,0.8852090401545039,0.2989035261084394,0.8286861438494675,0.9303112017491446,0.6603878154985958,0.5991680461710127,0.9732899935224362,0.2570818216871593,0.7340393532718967,0.6184658832808105,0.9504279323417464,0.006059242182417046,0.7197996742729951,0.37069518843508487,0.9752076526307072,0.9660985370064494,0.9176554363367169,0.8023175695757649,0.5897667277576677,0.9746280121581448,0.9974276222518539,0.7685455356279791,0.5548192310155751,0.6290487604995567,0.996957736547329,0.12805252947235823,9.733180903404026e-5,0.16982575344457929,0.2328022129377303,0.12249122171879101,0.6853395030402059,0.8120341624565126,0.15450258197810207,0.7909909830573894,0.5320916066779842,0.4386322319745237,0.38730848615493585,0.0998984597622965,0.04775475882935032,0.3189775192341544,0.7037268474247074,0.7588571155771686,0.516186777456364,0.6251993911759628,0.37111162244353535,0.7579171268382303,0.76141527088968,0.2768909487469733,0.23326048246544095,0.7925783575052872,0.6877388419122892,0.14287902394880758,0.3984427015286358,0.6038925953229302,0.47933067689563513,0.19911180734053313,0.3696875741013408,0.46520993244336983,0.8467726386699734,0.343204134155489,0.4588354332534421,0.2942044388665208,0.19035588473383647,0.9520746924515042,0.05321020929664999,0.6618383909852559,0.1276525526154786,0.2368371712472619,0.17971658900300547,0.8594031499633596,0.32961326231935506,0.9593512625311083,0.46960469741365474,0.015327053275306701,0.6208328068668791,0.17463922579674795,0.28789145795284843,0.995705047445073,0.3934792210877984,0.4336571194640977,0.2933543042101707,0.4803066706589716,0.5303145284815398,0.714342899118176,0.5512212450828444,0.23346549512553172,0.1543801831400855,0.6798731667235463,0.9377299184938586,0.17153594309657616,0.4841495617613014,0.8224366240137597,0.9051263293892644,0.38933253574981896,0.0727304142835461,0.5028220578153888,0.728380276779198,0.5966632414636952,0.8846605419071956,0.9640653154776557,0.190968428892196,0.18067088608974524,0.28296720965063327,0.14458320546175019,0.34263940446491636,0.07300847442756209,0.03361114410981281,0.3855494412506948,0.5852217384308551,0.2864268970477315,0.13976905006271534,0.4686732161599989,0.668736431622722,0.5935859496704461,0.7276500792457985,0.40217658888030416,0.31226554406412466,0.6516538322115881,0.9495869441486446,0.026022730296090923,0.0048432851362909535,0.9684545613859956,0.3006941292156271,0.04727574202441809,0.23123964651439577,0.9597004531805604,0.9310270154321947,0.6300033458176346,0.20634876958085901,0.5687142247073214,0.9444812560912637,0.4062540467295719,0.8027084204559576,0.9910280579379438,0.12071842515334663,0.18827517218426726,0.4448102742244564,0.3978632379593514,0.7527306023677107,0.3588073076929654,0.43508277108716586,0.8538648064856731,0.5987307297593201,0.018543521984880185,0.9261479770734404,0.006853843862388187,0.1994929632133995,0.11977815374422329,0.35059117089148195,0.9287741152657796,0.6897977998312377,0.29321662983920715,0.1200064087325361,0.7612627026806011,0.27364611806990613,0.08570714517737055,0.5157973131454716,0.5167688926628919,0.18986753813135593,0.9371459778938256,0.8368311282538514,0.44806343133494075,0.43864255028005505,0.8867181099179682,0.5817041262578082,0.8776977344119055,0.6799106942314916,0.9770172769210017,0.846656763154358,0.6022504666331061,0.6017097414775407,0.3375026151188829,0.1486259067799005,0.7666218023527234,0.7224703342692902,0.23532052028846606,0.10387091620138444,0.4054965558474699,0.026231193320307655,0.34726792063381096,0.06784833647554889,0.33949299543685973,0.3240675586735968,0.6079350564186001,0.8047924041635048,0.8313594796086852,0.6200393953067862,0.07720494727508309,0.02164073123627186,0.32460707563323865,0.06684113075515241,0.4685400145426448,0.9635532547913752,0.6989838260836798,0.4420570548089289,0.27856972896282084,0.7269076566030839,0.7200975123160034,0.9391781522880946,0.5296442102591685,0.033341290679471,0.9106626111140728,0.4141954067277105,0.3827046195997841,0.7149464904884801,0.9092479927495059,0.44782962328981,0.26481730438973416,0.4779048187345225,0.4124104362808838,0.44394976938439923,0.8040961803044047,0.8360842109601736,0.03728240595102328,0.8354834227138819,0.8522573498346155,0.05153724375131108,0.30565235301415217,0.618181464343049,0.4008528665675892,0.6224923995301606,0.6953476929040445,0.7980142841303057,0.5661200735557899,0.6679235646994153,0.8520251397638006,0.9752596183962245,0.6348217714021309,0.7678306300627777,0.06470788762246293,0.6447445413598956,0.9253133771706386,0.0437399762312316,0.1265292098938251,0.9316711497402776,0.8114478295091874,0.23635449175798584,0.12087846506643407,0.9004659261369372,0.6892572505220278,0.2405894748877726,0.08059616297186167,0.2021567117965437,0.35250068885385333,0.9077578914389355,0.6340537675674722,0.8464900288397965,0.16639031030873608,0.07590452010357551,0.6552318665630481,0.4086801935710127,0.8668857808576103,0.865376175657969,0.8305580070073186,0.15568686668286258,0.06401982626777603,0.4199923614549599,0.41759133472679855,0.43323598300809807,0.17823238340125647,0.7722315981425107,0.7642861782420776,0.2464432619158068,0.5285855585921393,0.9392154844848024,0.6813391824450723,0.11063607812546383,0.07917959906291805,0.7627107802312805,0.940012141063221,0.27658466759791267,0.593209950571906,0.3872105443969813,0.2647425732114328,0.3218363618219897,0.31375926423601275,0.04822914195879857,0.42048638042466036,0.9325455668686129,0.9821395465155622,0.646704926371946,0.6022448950182788,0.8748798543658931,0.7988489952135882,0.8165102388419965,0.28568322763198184,0.24050869206207182,0.5223625380750281,0.03509076689561508,0.41912548726814336,0.9176640194417531,0.8277784810817295,0.3964001910725672,0.8515409152536353,0.8253098387056335,0.23355692441373432,0.7600760227042913,0.07634482336549797,0.31014729906194316,0.9595212995455296,0.7945001712384023,0.05273260365788235,0.20191476086368398,0.5182130909146831,0.7790214842863097,0.6026494360214238,0.3572005569711585,0.024210308224886345,0.08814560668893656,0.6833014936209931,0.8428907975801687,0.02589903619440137,0.10462153992530943,0.34925169003694045,0.20693901670571724,0.6395819186353744,0.2266396791912595,0.9348370137478321,0.31122800000890716,0.9912635373054388,0.9389927821358324,0.9896963002027988,0.6212395473462538,0.9085081300480347,0.5287178866388866,0.39576762094145757,0.8107585651193248,0.5335409891686784,0.09998214682973527,0.6692899215782517,0.3002185688194956,0.4677050746625204,0.6981210054545317,0.5374765221360631,0.06138230704188863,0.040019023430432066,0.8831395916640425,0.41779700735188197,0.00979149906862431,0.6856271259836233,0.9127392972776116,0.5514659301475027,0.390724860463209,0.9065045464960331,0.8199927665578968,0.4721569999124009,0.4070730353062948,0.7139620123480725,0.37091056289549273,0.35988493299528246,0.3687231422002779,0.3913836362871381,0.23979398813278197,0.2980529465792441,0.6753595386801754,0.10996199673326057,0.08018831627278677,0.0588954390355354,0.233745757876614,0.11126974726136307,0.2168154931020574,0.6918785133871055,0.2260803355844887,0.2910781283464048,0.9510527081699685,0.458374852090365,0.7233424309090271,0.49670589562711887,0.7619781329051034,0.05030847204923505,0.40172606498013574,0.5421440361984633,0.9013949663263727,0.9700799192787501,0.29525826529410537,0.08132275944823308,0.17792499602852585,0.19370687601495362,0.419671185625877,0.14061965296349377,0.9501083440070162,0.8883127530709936,0.10225625464013577,0.8651424935249175,0.49071956034604836,0.24219741615183743,0.7706630044770373,0.5770881619580905,0.2401407995388798,0.4971406347392999,0.8624906237138841,0.3011992527675915,0.2964453193763481,0.5382128657605161,0.48802724816244547,0.2751350843769782,0.08137115139283146,0.010872815722485552,0.05844297694234246,0.1321938886072087,0.25660243499791413,0.594274543129732,0.0026772544915962815,0.7871377933491008,0.643973008792849,0.3960556298411806,0.1686039629962024,0.11489381922183473,0.5045250363473281,0.12931718198615338,0.8028502092609224,0.8545149182750749,0.999243412844687,0.02142656616413241,0.6278406749558054,0.23760214140348856,0.36410200158415695,0.6630393841007332,0.8444368248132459,0.16904147540881875,0.571027584963921,0.009254444549856355,0.33343157329348694,0.547572044733629,0.7794012179578735,0.06751259808295007,0.7194015522125377,0.4447826865842961,0.548997038217848,0.6345946321943494,0.7754438772901613,0.4523664608499822,0.44190078345167305,0.4758900580278935,0.9645220787319937,0.5045833570097407,0.848013061124677,0.9565433439571931,0.35710683461340476,0.42091913347241183,0.10978153323349327,0.24141926779446132,0.828084514013516,0.620537310800541,0.12486991143571258,0.009818226172967126,0.3466584561886883,0.005128013989920355,0.05298083688909938,0.6302558567101701,0.5276611016971964,0.05333816239068345,0.5561919595275988,0.6393806739902594,0.18593163080278297,0.19480516687591498,0.47314439657583107,0.8354704915101532,0.17323133532091806,0.8030508468498694,0.8493639392671666,0.6460475415334854,0.9199141038802634,0.4700471147187604,0.6351098414688445,0.1367201712365731,0.06325453568752404,0.7657676021375313,0.4765756637624874,0.7974205505939116,0.08991660399837964,0.7793557689684347,0.504690159160583,0.6128773035065411,0.03445247594704237,0.5540711602224544,0.9828724517930394,0.470996996312955,0.39312082680304417,0.44071991542824507,0.12419744966828938,0.535759549184994,0.7493709067096628,0.02116921115114878,0.5385248826143874,0.1872651513999759,0.5027891929998822,0.3321489567047726,0.5436643254769207,0.1749234388952452,0.09106235587807743,0.01877233488979524,0.3759292974347037,0.7800496050468251,0.9442023399168884,0.6276834126531381,0.7836333713505272,0.4077645386978561,0.3774703588482011,0.4629097814388723,0.18649484174975672,0.39732289941284993,0.6407844925379471,0.9663804362054662,0.20800929593933315,0.4265693570521869,0.634082959828191,0.28080808219798237,0.40391738425600554,0.3706743057075419,0.3429607392573282,0.32497130869008095,0.22905948879764892,0.48573176017282305,0.5231957193180841,0.17475469296573798,0.6609957686431949,0.4405654351878947,0.15749563228634944,0.2531143886628673,0.06615561243277801,0.9804296661656422,0.13325771113640217,0.32328539848389903,0.31533844485186324,0.19642783865232327,0.7353858148550767,0.3497783895540163,0.7515568168654925,0.20420142336085334,0.8934504807802002,0.781139366780714,0.21288277525016586,0.700520313604561,0.8245181656816156,0.09200363721131644,0.9480176672702172,0.16482612203729574,0.4684293505822863,0.7137760221906186,0.45209457585934554,0.08357489542910113,0.3960166859781511,0.3928878588423166,0.4810714839891299,0.1634443446412297,0.03909054345045604,0.8087475080569251,0.9960743380218777,0.31448258542894747,0.5079574223406522,0.8839308430987707,0.6374729446371237,0.7048680540233871,0.7947215988458116,0.5941219904164046,0.7483560566106393,0.023825196809709404,0.7824591655264352,0.9867922127863817,0.5290310138583534,0.5129503217130913,0.9253526831214332,0.05663231746262176,0.8463766262403258,0.42448266096986376,0.17265677179868621,0.8455480556864245,0.6474536932946535,0.26399098340977645,0.18325009586741903,0.4474301673346963,0.9142101893949042,0.09443599069210262,0.35577434926447293,0.445088602881373,0.6551957888097015,0.5704392232208999,0.9787842054798479,0.8384535153489283,0.7749344948412329,0.6995845071276363,0.010623293249353516,0.10184848006978298,0.32993613375932984,0.5663601599010344,0.013842662368887204]}
},{}],110:[function(require,module,exports){
module.exports={"expected":[-17.689215056281274,-54.49397808771287,-3.1700131237230273,-49.103088530519784,-41.566822767276754,4.332709438080368,-45.212296124514374,-47.183345718922595,-47.028818683367994,-30.0451954353141,-38.89348034310168,-19.99962032988972,-6.88787501406782,-18.018441108122833,-33.42925170907952,-14.874350501347394,-15.52500497026806,3.014137013807975,-10.772651207588659,-29.314317065529917,-53.10646914484756,-39.4067817068853,-2.5955382174448918,-11.854427859554058,132.15891987278383,-8.455528253702592,-35.76711099262973,-23.338702237753918,7.4027962010674155,18.152804619896948,-49.153330558996124,-18.71500962971261,-30.54508807582643,-24.83061608774593,-65.08350567585171,-15.48807923380976,3.891960666411123,-42.335659907726075,-19.553364472361682,-132.3941553411198,-50.59680207043765,-50.44047740267932,-48.583157037409904,-19.00402818947784,92.04541724182823,-47.06161414118638,-90.07830409073063,-47.56297333346512,-29.161760839712358,4.11292969267643,-4.120843725876497,-22.777768089493833,-41.56212291631867,1.583698753362313,-10.755738847885262,-64.94571965331848,-34.72164103193566,-31.405917207189123,-43.21986277988342,-48.339765366523636,-3.9401814649966016,-45.76205871606825,-31.657285699840045,-88.37178724462859,-24.25790075820237,-41.80144222953777,-41.3851583238917,-9.984144955663014,-14.913047592209491,-47.11725503494843,-4.9280776379981015,-50.5535208636626,-59.19583526150692,-28.821958703877062,-13.150430279099819,-80.78862343566126,-34.886949099092234,32.1525377304032,-23.007561535021654,-35.04145533969114,-37.67103121899377,-29.24552499889552,-53.360480343372515,-21.78832018013081,-38.98242068028,-22.799582153337422,18.09875318848661,-21.60626420882743,-259.8043171072412,-9.552766855344307,-25.783834739745256,-7.856883626165789,63.18730653770256,2.1970724782880673,-0.0012190797127908937,3.920911359457664,-24.490388308662197,-47.83481921226405,-19.347701794047072,-7.050019045850796,-15.338097690164606,-5.895351815446908,-6.974080325179402,-59.661003100918876,-12.278507833402582,-29.955027856515976,-3.966484144226981,-38.4903478065233,-33.289091293212955,-7.242735199458748,-56.76142258248427,-28.748116812203122,-1.6255384091465501,-41.09702485309056,-2.517633937170643,-13.546277649590571,-31.948259615861488,-32.383175516297996,-2189.5894761499203,7.0303245290421685,-37.10758004020573,-15.936886517455648,-18.836005835356666,-6.860224421755979,-41.09105811564731,-26.75989629067404,-6.795128646747314,-36.048307478833344,-24.69117258634254,-5.7764181223250475,-49.21518751953712,7.257893428042738,-11.360716662101456,-37.00609406506887,-19.099282524641634,-109.31056254490929,-19.076744388445913,-24.086329977546164,-158.62929815286788,-36.04138308559095,-31.94751396581125,-45.30707572156634,-33.04461848113205,-4.999233857702377,-19.517619170582314,-51.635421885482714,38.308479071440516,-51.326330267500126,21.590285668893014,-23.95252136082282,-12.358924549056882,-18.942972981964612,-110.52842903001907,-25.08803168223122,-18.26606645235818,-7.362631046382113,-30.616527993057367,-22.586868912875985,-11.83071139019295,-42.86115277831488,-4.423240425359793,-14.845482343959315,-24.644629012528117,-47.30312550576788,-824.3244154936355,-23.547112896342476,-0.10345577414910889,-20.497934318612852,-86.61434433411866,32.42081816575292,-50.037127408689415,-45.48228851574692,-20.29811802852611,-0.10442518475494834,0.7020133019422872,-43.90739784870432,-35.96007969201982,-27.230151378769865,-19.90693074950009,-50.67106072165208,-15.109922629941618,-2.36294260930962,-10.34028733948301,-26.589211566308354,-26.123259058948722,54.33211103458548,-24.373640431379314,-7.016514699620428,-47.70423080281156,-53.38756556547926,-39.24710867433984,-52.434824246687946,-19.394120055989728,218.20103285939766,-31.796630699692237,39.32605030722897,-37.637231875813995,-0.4711351474798544,-1.7359981202685262,-44.0170787189314,-45.56156883908906,-94.68473669366679,-29.256067848126584,-56.48385808226406,-5.399885904094814,-43.97792418387903,-55.328053110737045,-11.08554626376878,-48.33970684401587,-342.6201917913363,-42.48647763865824,33.3658963408956,3.5885769893694293,-1402.6503698891802,-11.84148038730758,-48.3485541704329,-16.39488009693436,-47.824179653433646,-67.2440047460477,-24.040371188380043,-2.483321356433218,-43.45722953169539,92.52346749364888,-2.636982541630724,-47.96352546644236,-39.44627732696538,-3.227716445028829,-29.881932205373097,-6.743825604297084,-21.583054383786607,-14.376881250494765,-19.55123126102325,-28.689187274407963,-31.122827836982,-15.91134905423683,-12.824659379989708,-19.7758787458302,-34.03389800599662,-21.28454079917206,-9.415660614880629,-59.42106565446089,-50.284131624788145,-52.684604211723105,-62.55129055374063,-42.1485110331095,-6.451931787998155,-15.147445389097653,-54.732423073388944,-49.851068415478736,-11.593115108388936,-14.686025377708322,-78.66135474423528,-19.929884908336483,0.8438429767663527,-76.76049970218887,-34.775159042197956,-23.304366398874038,-58.266687476749105,-25.0938098200351,-18.326623357244337,-20.63278138893927,-16.079913507148767,-15.31653283975772,-39.625378841477584,-6.842467985438782,-4.8745556554549,-94.5810707735959,-38.967217096936906,-15.768837013139223,-113.72025303857822,-140.10283199531503,-7.16001069606055,84.70047319005687,-53.99777055821565,7.300530298407132,-69.39732234749766,-15.30411049567594,-33.03167155101329,6.299906015684574,8.29601568860259,-42.86176852250659,282.49029686342084,-54.563508959403904,24.654503276663423,-1.638354737637182,-36.05860455142736,-43.88157344232097,-2.7009297349743764,-24.097465959142163,-40.49883778260541,-31.395644188388218,-47.37743896069313,-46.11352855649844,39.808869438709664,-25.570076171492463,-16.298097369527998,196.4940061465726,-34.71738345234697,-70.14907525462053,-22.298901357458675,-34.7448853439808,-11.92938408580916,-37.81911098594832,-493.930097943638,31.513955405488872,-45.05805970208039,-33.964780287126494,71.99032070722171,-63.591481891382976,-23.408570080145132,-51.43839755639002,-176.52556157321268,-106.3674262070451,-46.27896057056279,-63.10003071807377,-29.59096791301851,22.785758854409842,-26.438273502374447,-48.06859305910203,38.358591358735424,-30.566353727176924,-112.12859680623507,-25.954341735927386,-117.06365019587855,-5.530241771737202,15.798859445817982,-5.327180668429054,-5.47386375890258,-34.49945840111836,4.950585502108254,-35.659714477860796,-53.299751969077754,-52.66247649374161,-29.417755652273566,-32.28141656430925,-35.18406995887346,-42.586122609394295,-18.99484181604704,-0.3237976874323252,-4.283812857260656,-19.356248161866894,1.7793545394009644,-28.076626570320435,1.689062123436623,-13.834929991706826,-17.105215471927394,-31.54730020928691,67.75657627883689,12.570972449474183,-492.30468503708374,-42.56129694395894,-19.12314624519688,-6.120720418276333,-0.37098945155676866,-2.3946067244265095,0.396083340107829,-280.03130157550515,-59.1202201936155,-55.88042890678935,-25.7863972330811,-20.945104004767202,-35.89897575274235,-10.684981422186759,14.485254505126363,-32.28419482841393,-0.254387890980734,-35.26573188989158,3.6205390433680975,-1.6155880571186145,0.8311102206666359,257.0167419854662,-14.151276114157273,-40.1732068505936,-0.04925344961027811,-30.080790378980318,-79.33286718011387,3.651895332356146,-4.600957799077878,-6.251710250875221,-78.44255196238174,-14.70747089455532,-48.85905553358111,-11.971947489805913,17.271380617219002,-20.301129811730117,7.514096233169994,9.042312047088862,-17.422246969184503,-31.605686560265525,-173.5911028019145,-25.435213725420226,-13.542294423367203,-33.5252934636236,-8.804488972096475,-13.20019385859343,8.965392155847633,-62.25231817718637,-50.416210915628476,-123.02769138315645,-45.20029493975774,-20.494966362596987,-17.050385076225606,-13.034390502198166,-74.02698195265668,-7.0757604584094045,-13.388218591374127,19.842118656167827,-18.562287240056154,23.79698798536075,-90.68909853868868,-18.054651324986953,-14.9855396766807,-15.299665703983601,-6.11800865267851,-10.078266545206956,-49.02997054971391,-8.803983129378622,-40.70394460575896,-9.980631813938476,-2.4514516851177253,-24.706877761014596,-57.133195822329505,-49.703290434930835,-2.2150527053076976,-13.806109439983512,-43.52788581840974,-46.599260400922105,-38.36945996382888,-18.619951457049787,-24.77535188406359,2.0563762830125616,-48.56411108567344,-47.7627542024137,-20.723297001761747,-12.732800782564293,-38.24690836758819,-9.682367291092962,-8.70235835441974,-9.39714064255837,-28.666563280829635,-26.261733192683575,-9.269420217914046,11.48679721633378,-28.319591999711008,-80.78167043394174,-47.15485661651333,-43.9432585274858,-25.3956156054668,-5.856781984908058,-32.7790681484519,-8.236993576405055,-79.34161327957256,0.9503905600275857,-1.7415993547732458,-44.132277583543534,-50.15883570216923,-2.897291296622626,-25.446968747146897,-19.444021443137444,531.0889302837243,-14.65632522211892,-20.067908352746233,46.64480639776866,-202.3504044867247,3.125736985084828,-18.43408051243984,21.976012568376188,164.1834932140594,-13.836266611814692,-43.57674473715018,-28.612579911199767,-15.581480525882059,67.62140629910327,-72.71194511505138,-41.625847853948294,-42.645649529414385,-9.306131665387033,-45.48554099413297,-28.91420227599548,-36.31733012685196,-15.695883058689727,-28.87409848162037,-8.581569089855899,-49.065784036871875,-8.267537059227804,-31.226982580489786,-28.213716439019677,-71.49289062670647,3.30031703457557,20.72198528844707,-6.910081655715098,-33.47576742670137,-30.532053123701708,-5.06361078252127,-4.177314510203534,-19.472167350257724,-26.13245642124862,-31.227500861386336,-34.38609438108355,-11.988687321579821,-24.19252169218213,-39.57561349368814,14.084134351199314,-10.68913946324086,-40.58886502262445,130.7241402774371,-35.57881588025483,-96.10417177630859,-72.79528956778779,8.614025921994227,-14.551150084053223,-5.597091123967231,-34.20301247795072,-13.234750604823642,-53.79838358131413,-17.032142903898112,-17.855653306602694,-409.02508816099225,-63.92602072831468,-12.51773917627957,-53.813483000912925,-60.5485627674375,-28.3210523973112,-94.17522626576009,-18.20553850191852,-32.55096121257064,1.7837578214484542,421.0338104169244,-53.56331992852037,-45.95143458749773,-31.419385363982038,0.2678890871058641,-72.67456511060385,-42.95777675328226,-50.35707509177205,-86.90988347385122,-32.52917859765203,-3228.483712120106,-31.72136123276124,1.5137181673123477,726.553275070699,-102.10545886775596,-34.71741767125654,-44.563290805316086,-35.78185956545772,-33.7983545619763,-20.587813925207453,-243.65782632912155,-73.0213407038819,-14.93022297732832,-51.02690785697593,-43.49517060203363,-12.710594914922552,-4.794401170725216,-82.86576564504281,-18.09361592705287,-51.59602092632046,-8.224717778586102,55.84260053245313,485.7771998859331,-24.959404846123952,52.55682464877977,-42.224188137855336,-9.306428312153232,-28.39858200530267,-28.216077671217406,-15.475562791932504,-31.77949001746387,265.6636634056013,-20.128318756753956,-6.085061492612516,-47.97209305195118,-24.33098814254764,-34.7880670598782,-40.367448088983096,-12.060821808736032,-8.688374562433967,-27.82707503250104,5.783613083856537,-39.48303098815299,-32.31240195686647,-4.140258692245935,-22.00016231336828,-263.9048185868066,-41.11028517003318,-27.53405809543797,-26.684314037755865,-31.053126645040454,29.358746220606,-7.245657739383567,-11.320271614425145,-49.7786903004213,-9.561179346728384,-21.0644325408783,-11.431915555097383,-35.41635665292661,35.72323201807741,-3.189473175035046,-23.32648370341249,-40.760453087937655,-45.35857530988279,-8.192843687432607,-17.104699258588855,-24.309386145712423,-75.22970595566092,3.1936666393491553,-37.68942161600574,-27.411472595317676,-75.94252493456146,-27.392943257333684,-17.725981984172147,-83.1442044266933,-29.256764567122566,-4.422155305499487,-43.02418327606091,-11.502469852016663,-6.949124103202329,-78.67052662473117,-8.996021232530975,8.246114228415331,-9.424389096735156,-4.0016493629765835,-39.795584550679855,-880.0622477018903,-33.366135812784485,-4.174231780093577,19.969786590591724,-57.48057017320656,3.834194662028714,-30.75177878398546,-48.499983169087955,-16.509917673298663,-136.0869282814965,-17.89871228908433,-11.685831293092077,-7.353571310542067,-3.1994124100589536,-20.3333060277755,-25.920345454910077,13.744555470290509,5.011331115904902,-31.66194120651899,-52.211527296378534,-0.5842168491736794,-18.42264864849532,-6.56733992071225,-50.55399134665166,-19.437820804433002,-303.057679272443,-98.36916698444522,-47.99773487215303,-38.95819015581644,-40.291739657870075,-1.1222907788040484,-16.831362555061478,-42.65168681669115,-32.70727020401449,-230.64422983241474,-35.30682588532416,-4.325629797946018,-31.959387781290427,-47.25747555446112,-46.19967093257694,-72.40870051054858,19.096504162620068,-25.679917937376214,-49.61027034049113,-21.364789886271936,-19.693408955508872,-44.905527535571885,-30.74556102280716,-16.77733769169025,-0.7122330944256374,-53.68298581983558,-23.88146263884726,-46.1691303692643,-54.59634848068018,-40.23644012121804,-11.033475301366993,-58.90816944660192,-4.889125597322437,-34.840575930569464,-14.848629969176631,-25.93219646606713,-26.130361651338422,-3.0592512216977834,4.881292107098943,-14.033913790652571,-61.797646529312544,-38.315276471961894,-46.0840842608696,-8.621479829478346,22.203640670090273,-108.7001796059699,-45.0548461599672,-8.391216365403475,-39.84892895131094,-158.57264203872776,-20.052518040705266,-62.70204238808911,8.591883102494066,-4.173616632871236,-18.132262524391713,-31.247119615489996,-36.184353910712034,-44.13151673170935,-35.48354969234456,-10.16666026714988,-36.63687370347863,-52.58866709215119,-6.727526592194,-14.286455976505593,-4.569780267571574,29.630789699676704,-36.11606483350057,12.496693050315361,1222.5244983648988,-24.038232016071333,-9.55981737236635,-139.12168875881014,-19.35359707661955,-24.388149110646587,-37.63417474731818,7.283312732187664,-105.82658947178876,-27.12685634265421,-53.3818946472641,-8.02451948993879,-31.380608703944553,-9.898468592472412,-3.050853524777514,12.843699594452314,1.1714615550916108,68.77700216293113,-41.80071400619003,-53.385732305182096,-34.75677881428887,-71.22213208061343,-23.53231116102629,2.7947927512551836,5.489762784860236,-37.09415605974462,-23.514947614880068,-38.98941655908531,104.37543750803104,-0.4481434057134286,110.9267231225536,-17.4022010459716,-33.96720685651281,-12.619047934046971,-37.61235506961733,-1.046729961619333,-27.72354033871523,-15.967637504136327,-11.940378267988418,-10.219338550745935,-31.5289498191687,-10.250034753051136,-118.5643255628831,-42.845436265745306,-27.80111447219277,123.76756170596693,-69.93919572988574,-6.186572670060112,-46.53253094489329,-23.008716739636917,-18.686202294620163,-35.35528147232304,-37.86382784102749,-14.055405596034358,-39.49719879668575,-14.907220453518633,27.533561113560452,-8.236039492202982,-3.301029726217898,32.546045095641674,-10.277108261225566,-44.17011766669651,-1.3877070152022526,-20.05762810627931,-0.7514584349842046,3.922246514765071,-24.971387627191504,-44.39039149560079,-28.320493983538235,-7.940940119300944,21.60524308385121,-23.10067894599669,-223.64506202695858,-36.075524175861176,-77.16710344363152,-39.64922095642802,-32.4905253613416,-36.350001006362724,-4.501238184114822,-701.1876331342683,-30.65212594187164,-31.174464179891917,-24.14940550276611,-5.54628273278888,-50.17440640867693,1.3202986763314262,-24.311581924560567,-34.653764215980566,-18.833008434780197,0.9084870112143637,-8.513505052709593,-22.598407584569728,-30.37288969083358,49.11443387000665,34.36968892679265,62.622141823051166,-33.684453549399294,-77.46083204139583,-42.33344663720803,-37.58353009568713,-38.328919645596834,-26.268825672981386,-9.311390554268558,-46.16731596253894,-44.60708880836882,1.7243904977854037,-16.182366042221332,-35.068513063397354,-24.54173547294762,-4.152466335674049,-15.385051382013383,-39.436178229961406,-7.7470597739827145,-16.474459066074406,-16.287444185793653,-2.7998054094413014,-19.482448261861407,-9.991358956559605,-57.60291214358647,440.92027133350336,-12.482040819351155,-29.144120765667736,-22.646136146592788,-52.1518616131394,-14.67784813994165,-12.485754111406784,-38.36397983254229,-45.12074675501593,-23.01747890547847,-29.565430591182228,-0.2814063001495697,-3.420624679344134,-54.239759323206286,-74.65372585455317,-1.529977806356921,46.97117121610039,15.618572607603742,-32.98268992041803,4.884596070847567,-11.310913032010621,-65.15309138258658,6.629382011432249,-29.846144122746995,-7.415647956327674,-40.05862253788317,-75.07816332478733,-181.31567258394426,-19.18277485066845,-27.33875236934228,-44.53898417519067,-19.94379901823655,-23.778454891390346,-29.61769546131587,-37.35588437514138,6.286921299381355,-54.743130516697256,-45.63295312375538,203.87365704781206,-16.864328606758335,-16.474042764494595,4.694053341071231,-42.68228094827158,-47.454704036295695,-23.70482191138453,-18.717900963620874,-40.45667364554417,-41.65699469663824,-15.901979912123648,-19.221444275069807,-40.80297299081929,-25.361911628083213,-24.16126170168741,42.50454035843875,-25.042835166654953,-29.324261130885574,-1.5197505552419222,-19.157499814528855,-11.460826471203418,-44.544941046920435,-8.599526555797539,-167.11758657518521,-89.6976680862421,-16.987226097125685,-2408.3378509559147,-24.62245924467293,-0.07345407959092398,214.56737410919334,-56.609257619247686,16.251273487677214,-114.78188811982372,-35.99628456414428,-6.838767420695898,449.4921732391675,-12.989635758988378,12.511155904945834,-28.175377808977178,12.53180822836951,-40.941575677322874,3.6050218819182227,-36.304237881882614,-30.663456640401854,-32.8858316055342,-40.998632884457756,-18.714359738225042,-27.339288503999676,-12.452823950961909,102.66987833199579,-1.4085931077791318,-26.813735422145438,-62.19805461938995,-22.580154265543037,-6.009780625818909,-15.498677685473787,-33.176738881439164,-10.876961427147632,-46.447275036088,3.728849423161126,-115.2110273293294,-27.367791509766175,-5.108052554039039,-86.24015059287692,-26.752991993259123,-51.53760970815967,-20.56888155063295,-36.12684316449822,31.81389482246454,-41.700807171593816,-9.567634917507016,-665.3616320113605,2.64497672008148,-18.087051155809267,-37.668772009677426,-16.739625719455724,-20.681640867038965,-22.51078797798048,-18.772508120173228,-4.444887678778265,-51.462184309499825,-70.28609539505081,-5.3388355440398465,-34.7739346353455,-22.132451802274698,-24.909663210133797,-46.55289541058036,-35.86125364609867,-38.66198511317383,-19.623647517297126,-27.105872847696006,77.60727474872124,-50.31829184201722,-49.052134192020844,-20.810013941955113,65.87248397833187,-28.70413838792951,-0.7381709231700544,72.64096717608842,-35.76481634312177,-65.37669767252487,-28.02301814643256,-27.760646573539617,-35.620120246882124,-27.520565883044693,-38.110001861363095,-27.070913422934122,-37.96917943042426,-19.502064607890027,-14.15455503553804,-20.019615544410833,-36.48654665229911,-35.64542099472881,-34.076690562919474,-14.034984631831838,-39.55142750226407,1.842589965906754,-129.03299630691797,-53.977344607226065,-27.506036398885374,-37.52028299908751,48.57070234371515,-26.359423399429744,-49.34539184891031,-2.596463569642019,-47.22370824354087,51.28097695271384],"x0":[-18.121452069365006,-29.981135708674213,-0.7732463095494246,-45.1181855214006,-41.71034150764314,-7.5506343882220435,-41.87510583208365,-45.58679996377104,-41.17830090325146,-30.101216652407924,-37.24154839530887,-13.464557176559522,-9.249647591226273,-17.439507465527747,-35.10314409102578,-11.86348257850417,-32.192235518859334,-34.0136011364963,-24.44613383548929,-28.24186843224904,-46.4153132391054,-39.523313974180915,-7.634197991485481,-11.406586832417265,-32.13813919929781,-10.251159003256028,-31.225830625145345,-20.375446567383758,-1.020244397545833,-5.808176140877086,-18.78419123040572,-5.533759346608846,-32.624682329137045,-21.470764620199734,-12.874290757121976,-20.809031482023222,-46.194383159649256,-34.53478021555439,-13.28562889748055,-43.75786620402771,-49.107885722258125,-28.8744579167886,-37.994011955991404,-13.290668468663059,-48.346509219373644,-49.05739977231749,-4.973026274410164,-44.33316630346638,-18.21707847498264,-1.1685113608893793,-5.07263858084711,-21.276317336101858,-23.918669520664892,-33.39872353771508,-8.07427022341215,-48.329156026274504,-35.90943224468452,-29.136852543987857,-41.2468050894456,-41.25812268394572,-3.890741308769985,-6.397583618095471,-19.211489958845227,-25.438795728305365,-42.93867663099896,-47.33337323033493,-39.958176268695226,-24.592697030668408,-11.906682810541792,-47.10694275234425,-11.696687277494611,-33.06194136889449,-41.330970451136004,-31.01106616736684,-23.759900325477766,-13.029877899918018,-37.917721644503175,-2.8487938783576694,-23.965331680697087,-32.10990252791933,-38.57475755941847,-37.51609149335881,-34.72650471221047,-14.212736899033274,-42.25717249105239,-16.080169905777364,-21.000811132968224,-27.091751254210983,-44.01281215773799,-9.56837353569756,-24.648442604236344,-19.380640918412894,-29.715921215008258,-31.02847791777278,-1.7598600336150794,-9.3022253483256,-17.75752323287604,-49.938511132871014,-21.90636331387109,-7.985382127055807,-45.01249410825214,-36.975095922944355,-6.170984792376554,-41.4431015242772,-22.92792334185162,-27.82365151681596,-4.423107232326052,-39.300531801077966,-34.57479542746265,-17.964193473195056,-42.21743141025171,-34.85397029558934,-12.805674363016294,-37.790946873218324,-5.890974258575787,-13.013710121562161,-33.87054510340148,-18.77974639600999,-44.70266779190564,-5.574362876716954,-36.870967541906786,-20.04420774030867,-18.8822522733498,-10.824891735616117,-40.05106486664716,-43.51805406407635,-11.576871607823836,-36.38032275761556,-34.24304434400589,-8.70800954822496,-47.57050105841961,-21.876949090325716,-23.77136922163836,-32.297027251362444,-45.054486146136256,-45.65620709548022,-16.740051840879744,-21.122499164645703,-45.79788628794395,-25.35984013685394,-31.648347527621866,-44.02767392025313,-33.67382424231858,-10.865932480275909,-35.60663192896083,-45.79663403632747,-27.74781142726258,-44.582769486654726,-2.999579353338322,-22.762386186478878,-12.57602715390509,-17.679798028260574,-40.79038428331161,-14.983919332845208,-8.963442402391198,-7.991270610461321,-28.982173534701072,-25.037826210681622,-7.995710552042068,-24.679140060143357,-4.10837584045638,-30.08215355239261,-10.804255333700763,-10.829899133731324,-34.08627014442143,-30.7132329817845,-0.6789562778405034,-21.61404863948776,-29.555639621285433,-12.707092163805356,-44.985423374536424,-46.41208788513098,-43.725320754023464,-0.11909476262409457,-34.47286341728956,-39.01544553815995,-25.701753533958005,-26.909775914689916,-19.66445577796977,-4.562754268795832,-21.08222346089902,-38.44569850705928,-13.174014890636377,-24.475050616217153,-22.825806034628325,-30.371102775874135,-33.90294492358223,-2.2486386511574863,-47.76536432038553,-37.48057671824171,-47.27070788843214,-41.769420000636394,-19.566009242081826,-19.96205343585101,-35.31315083001174,-35.17551339513432,-44.1809072627172,-12.711878442980218,-5.74287821667403,-30.125714507049437,-48.22433095818673,-49.15028553929092,-32.31178299284691,-49.093620956735805,-6.624970039304435,-43.31734853390813,-23.42616563795068,-27.38947435512108,-48.20703779006988,-27.096425560001503,-48.06012464808798,-10.378264764506495,-1.387864753311152,-32.78895416294827,-7.310195384246021,-22.183742610949697,-3.6700343040346417,-47.14383887273422,-49.58395645177097,-24.09644602360418,-6.956083460353635,-39.79517483771319,-21.834392618257425,-2.921299496964258,-28.578985215785114,-32.12002998884576,-15.687498254392363,-36.70003434349698,-7.117191922461874,-27.843349078494107,-6.587384684627173,-18.2917382879061,-9.180732833957972,-45.5010600558197,-44.105128132833556,-10.468104633404085,-19.79769230343781,-43.58554772506624,-43.36299856495198,-35.284739244227566,-38.59933867033334,-45.14931457302344,-41.065486970281405,-41.651213526208075,-42.64992930770948,-4.6680703736780345,-13.90698568210722,-45.79015055573049,-15.167625984701239,-13.54446831504399,-36.141199568419545,-18.41034436095462,-19.673013899222937,-4.6050823121707385,-44.33869095492419,-31.99068934708098,-32.10840270086489,-43.68546903440542,-25.20842664238835,-7.287120414066106,-22.958087429538455,-14.677704877628528,-22.43523007699183,-37.28771331116211,-7.3366858707076705,-5.318966286046523,-46.888635558366545,-33.06812321348538,-15.958447596035718,-44.11370397593443,-39.223430207453134,-6.892049703243708,-38.018829451400784,-31.09960545858572,-15.49144003212859,-32.097976826833,-15.318949960572725,-47.64808312453442,-9.717041914388336,-2.4916980063485306,-44.47206541797398,-0.42197351819051043,-28.587102420228618,-5.104935597334381,-1.7157659294817718,-34.79590635531026,-43.92729959197354,-1.2835502930940934,-23.819482044711194,-38.9808667686041,-26.121110115494773,-20.92768566612143,-43.30246779640758,-10.328589038030955,-20.734871829186908,-17.643313929050542,-27.141620661679468,-33.98638358738162,-39.94767768836821,-25.76886580663902,-19.338044876579907,-0.4333156101883895,-31.985907014269046,-20.304571056381306,-43.61471209638134,-41.72023710566097,-39.85931119092611,-6.929021386377887,-8.349404678756434,-30.761898424360112,-33.366532422660924,-49.614392620137,-47.54605410268977,-49.63844728510257,-37.89885628637113,-40.40500164039729,-34.89764134455026,-26.613614658588713,-36.72474003048609,-27.4941908749863,-32.404113647847545,-37.40179394919269,-12.456235894091606,-47.99895824072663,-4.258997578819901,-21.782462626303534,-3.6443821967391488,-6.299608801370482,-29.760352778155298,-3.3051431768615136,-37.45079690686934,-45.9522791967734,-39.31770488563912,-34.97289745687634,-31.887448279588458,-28.702993082532814,-32.002422885122186,-2.2662897837083196,-11.447825195057447,-23.182254572002847,-17.271000670669,-1.0931716896929733,-43.5003479455959,-0.11682014919341954,-10.522881817059048,-1.8615273077756456,-28.785349383604963,-10.321519123564949,-19.36402481283015,-24.290011096504806,-39.64522707566795,-25.36021140249082,-11.664923363875811,-1.365895389408811,-10.567700723742778,-39.261465204912035,-4.298783945364926,-33.18485350708471,-31.48752735824739,-25.939464620349952,-8.307146070614557,-37.24708809753912,-9.812380040309755,-3.4395180423692606,-31.76305379081883,-19.55465147587968,-38.83747901960694,-15.08927522336787,-10.321822623370814,-4.766629559401814,-6.1820814150638554,-36.143409398586314,-2.39331077199727,-4.727119953779413,-24.48043550550585,-16.085565948490544,-11.47580811232698,-4.171193500908865,-6.993859791635804,-25.60207040607505,-5.866263829298035,-48.61740939351902,-30.05327430415008,-44.9610610417838,-17.790466171318474,-20.714643148181878,-13.635428735033939,-17.519484742518266,-13.694375730204278,-27.07615105769332,-45.388031443446955,-3.679595478701736,-38.60972042070722,-9.567401826086464,-40.233166217388636,-8.287200230133129,-39.510005014531004,-48.37636215499512,-49.27403842125271,-26.064906212239237,-25.635730390926813,-24.477991195932603,-12.30749228695549,-48.729079946411105,-2.8481575834875983,-45.003626161618946,-20.034543986975052,-14.376353854060097,-15.525554049044421,-11.001833164428099,-19.68579706513267,-12.328232924707095,-15.751732338472713,-5.492052406019521,-12.40829906079849,-46.179078528653925,-14.066607464526415,-41.771060100353075,-16.507172571877792,-3.5677310706448306,-22.567278706639105,-12.602738223400955,-14.686184476442342,-10.19145458361601,-8.519503894468949,-41.506235424494,-47.92525649175161,-36.87217679594645,-5.243630507782992,-29.11075965599118,-0.6342372304060317,-27.442771907342735,-47.119923907345274,-19.032039878080976,-15.377318560385145,-35.151308854491305,-12.20523831933269,-4.074238026914001,-17.160109094876518,-39.347482868261864,-26.317615985537547,-25.790424070186802,-9.833836046247768,-27.928063763183843,-42.455013395414,-39.04023235531523,-44.47803223201675,-8.540149190644685,-10.820877965616592,-20.16039126061736,-7.234734889964011,-2.4062839988484686,-19.443848439088374,-1.1914919365300314,-45.074234646611174,-49.48572494895945,-3.5925813937872197,-29.520718960037694,-19.500523695571147,-34.46510032000799,-8.050353723181436,-20.90158840728934,-26.9989589880831,-30.9784500881932,-40.63787374020363,-11.85551139176555,-22.2829853683857,-1.4139498206787504,-10.788790724171482,-45.35512229818563,-30.666678058616682,-14.602792975222146,-30.461386369534395,-32.2233687128407,-40.69650128975396,-28.244623771494982,-8.21053527490706,-48.00453880642125,-22.500477540621024,-39.51204051879007,-19.35372984181226,-19.85729998853316,-7.430156195976744,-46.716379633919644,-20.514461528316662,-44.4786614190557,-43.38846459204269,-33.277554816666836,-0.09796555558966302,-8.353677482298494,-10.884671278769808,-35.22091364519569,-49.116279370736294,-2.410031994639783,-7.85540915962244,-40.65059010076778,-19.101096446931244,-28.823793710286736,-34.30563189971598,-32.28249073658386,-29.65713402813803,-41.80016828792476,-14.79461396192292,-41.547042282527556,-1.2418672405370201,-5.916727756211948,-43.51773911937206,-35.25034082689129,-5.708450191591307,-23.61068944927429,-7.434785185929538,-4.02653584268532,-34.9173464296132,-33.115639937202026,-22.506629226039532,-1.659708552112471,-17.640369305746262,-27.155298444420684,-41.94746132435374,-5.606553668807912,-13.94229465504101,-23.286070923646474,-48.559549113218694,-24.33091998023117,-28.412413979178886,-34.30156123653134,-1.6903939369135923,-9.995156723125842,-40.58814703617699,-31.546903507823743,-22.124340755149852,-40.81064642460037,-21.080905009757345,-45.34991976831881,-48.25717278221896,-40.42501060218628,-36.80637900949672,-15.80526024319916,-34.67249608754981,-0.15294302656252423,-25.177311266886548,-24.191938363086607,-32.72663215236159,-49.39076145741351,-25.596438136150248,-27.94220501956697,-19.689527790800476,-26.40651381885679,-44.613936206652184,-10.296901421437898,-47.61701879872624,-36.167675773168106,-47.41287671144663,-7.936971594877096,-33.199043646436046,-26.607222307405433,-5.868522594230374,-10.204084594341435,-35.31014858201108,-40.192660490240314,-29.44309559446684,-22.0429797838128,-26.45275714858095,-24.465063714393732,-29.502948232309013,-34.842260886520684,-34.45973150611215,-27.622411855614683,-28.080232847097875,-29.46585709559014,-6.58661981444787,-23.4488641560594,-20.037840145993446,-46.73834682439959,-39.13767796120358,-14.14671664453363,-8.6559954182849,-23.144536007810768,-8.72813269464141,-42.16587530619497,-45.60670452560803,-15.430021719982179,-31.49769167580879,-21.512811709128222,-41.55526050160838,-43.22959418504486,-22.29665181183783,-30.226831251023377,-3.0702228378066243,-28.91881958627828,-31.61056746597225,-41.746448611540856,-3.0896142300420704,-10.708837251521697,-3.5110808446048525,-37.92088356011618,-10.390023517587576,-2.1964641732665324,-19.366498959817502,-38.46822999718713,-46.71301063387552,-9.64925819531569,-12.056276476378603,-24.285985389932407,-41.49854181226531,-9.875534836837618,-39.08656874302592,-39.75645267093617,-48.80297889363378,-25.75632937732716,-32.34780137294454,-0.14008013657864637,-16.415489178216113,-13.595334007294246,-48.00911789838138,-24.903824578008116,-13.742749508635644,-2.4262162511183294,-9.502386984894285,-3.6437016167320757,-11.287394987356391,-2.346594109489686,-34.5261025073942,-20.995016771369855,-41.07090027066308,-8.53859442516619,-17.951076640520725,-20.4255506366702,-0.38280881703253167,-44.60115084033768,-47.60433384325026,-0.6820005353141756,-35.432826333721735,-48.74247032485709,-13.221169979150215,-5.204611467759879,-2.8024580461060156,-16.638767419402622,-47.64584907847432,-0.6529958620662524,-33.86779495767212,-18.95967132604921,-39.086309408630036,-2.900807741256861,-48.17659121586586,-0.0023324336268393253,-30.13055216112176,-15.576325948621994,-8.110121012712224,-42.7591243808941,-47.958490666898044,-27.33880116150109,-48.25364193028252,-11.401662024863391,-11.935985920729376,-45.46913670010544,-32.31795322020707,-19.228787855790873,-48.432315299384875,-23.418287132530157,-31.30221229405906,-47.31750998182635,-45.44281101544117,-38.713838836717315,-0.538172092359035,-24.600437796779996,-48.687725836490436,-5.404803072701336,-36.49585332080321,-34.48101225668426,-32.824590523531995,-36.435142208557245,-0.46357363494329284,-0.666863171397547,-44.4570843110975,-47.76547413026274,-47.06942219493912,-42.78542081257505,-22.15327186584002,-47.61677323942326,-21.800547170102202,-39.205792674572415,-4.027393753714326,-32.10015307786237,-47.87188909428767,-17.244439503037324,-37.109153080015666,-14.752881437766607,-47.37362215542124,-22.369132312314164,-40.5651821448563,-18.900701171011946,-9.782871586262177,-10.268678491790373,-5.6849601670895815,-15.349785057235776,-39.224236207804054,-5.515817564763825,-23.98485744095733,-37.10685932490446,-20.185393148134324,-1.9088981594678311,-19.678699564705838,-32.8863942531728,-31.073329345147048,-40.06376059171078,-37.19753928986689,-15.839913132387384,-9.778926956653155,-49.77340639604476,-22.284106718685702,-15.50000351252666,-6.705503929657586,-6.6066054519886785,-37.37477605236481,-2.0290524645847685,-40.83199095548069,-49.653960232461216,-5.3543423736830515,-33.88918423875521,-38.08160308068204,-19.676221283452342,-39.707149443138576,-13.122801298844234,-46.51261168297135,-27.04823051224423,-47.52337479558745,-46.44343530689735,-10.08321493072647,-15.156392622472403,-15.652024749002702,-14.417018117482893,-45.09342867372854,-4.684307735699933,-41.59181529232915,-16.503220195729227,-30.566865786640484,-36.10010429920499,-23.701672421952868,-10.70685328189882,-30.902470960619365,-25.69155644589769,-44.6206821696769,-24.602361723507638,-7.693665657434156,-3.649224983247168,-3.0438990594971127,-6.859452573188662,-49.641669380330775,-8.513733230388754,-41.8470533502073,-0.219753554114821,-21.790734531834755,-16.755445242278533,-16.758458216622905,-5.335297023078345,-29.590708130127286,-8.51013577442119,-5.723111046253459,-42.12491831604819,-26.38342893557899,-4.967423757332334,-44.01470064576095,-27.765335258810886,-41.64299941867468,-28.682459358837786,-35.75369917293463,-39.72548305852056,-40.37275209102103,-11.30093767272201,-33.28468064264416,-36.937927264409865,-18.978132515546477,-21.372238671741293,-41.54883088092966,-8.531135312483862,-18.825444870889473,-22.295775419159767,-6.84350339432378,-31.66763386926319,-0.24800872206385272,-48.35305079784771,-27.95229298919316,-31.226578456711195,-30.606419463799494,-11.743184747883294,-3.706755188379185,-21.862962104014837,-25.48484724606904,-22.004618081810612,-42.336634156148314,-34.674341186868695,-26.165309833701965,-39.049717181207946,-14.541309641593347,-23.819818547580816,-33.75367445231188,-22.23320464259456,-21.194839161773736,-16.777669465653144,-45.69201471274133,-2.8628744153656016,-24.498202271834437,-44.492888380315335,-9.769160447830572,-5.975522906063146,-14.094112673010939,-25.158480549670404,-32.878721036677575,-7.846326620946009,-7.173662298431838,-29.469747151137295,-34.13774102461243,-14.76253595244794,-43.15297941153068,-29.341556867295825,-36.159993094018894,-22.619928612420804,-6.481937573996643,-46.25135938999131,-46.39908313673361,-26.443025728010195,-25.89569363069728,-45.87574540323164,-19.7983429530614,-36.85278708644263,-9.46365735028245,-40.12789036545783,-12.126500671375684,-6.738772401679594,-24.314779442512403,-4.510588301690676,-14.146842464508946,-12.488224924808279,-38.898357628307245,-35.82055262349847,-12.274918752754171,-38.70692192705486,-40.67273736035036,-30.915192532998237,-14.151538929804254,-32.5326690803748,-38.4271696790236,-39.58927842557715,-20.721069809566394,-32.47963154534872,-45.23413210194172,-3.917891323609657,-3.9791504279618084,-47.92554176600618,-0.854291879833069,-42.05397490313473,-2.302697916223484,-22.149422376662308,-5.545573101287515,-8.11046715445729,-25.82585589572194,-28.931160133460565,-31.479737583046898,-9.83311471848064,-36.30269898153892,-46.41448804215344,-14.041091456846699,-19.05425728151998,-12.887132170648085,-33.431173041693654,-22.391144234030357,-16.19737185343665,-29.879774927808867,-25.33043374400673,-22.104884109566424,-48.52872865313345,-28.971374695691342,-32.056683151612496,-20.771291128999238,-16.549991632807536,-4.313804145854916,-49.06435593419965,-33.508553934855755,-24.728568157967413,-18.846693680639337,-38.52059434874252,-32.71230330392019,-16.19708745838887,-20.604701647226207,-45.49167964949091,-33.897050126207574,-23.753655346120016,-48.41430952110246,-22.572964389275306,-22.833107072265733,-2.4232766971090114,-16.28397795628336,-13.722953064227738,-43.89826697150385,-11.245921075015207,-24.413412747322806,-6.7901271561310095,-22.10018981013391,-2.005368296412424,-17.537805483740797,-29.305765060232748,-49.6076632724165,-37.70693907932009,-7.055271902570137,-39.72102434839939,-36.963489993493695,-9.604227218160432,-32.94420276828836,-43.39621735412027,-11.695212282995183,-34.615884798425554,-19.119379962970807,-31.776414690387313,-9.313972553142925,-33.508234735640166,-32.85569313600196,-39.04638559090808,-37.14079933905803,-18.672469795541026,-21.238623722643958,-12.100982037640328,-7.356032681504077,-2.353794111420149,-45.17210196305144,-17.890335340134133,-24.484653839462357,-31.99069510982482,-34.35538725526869,-34.14837131754792,-12.090963086109852,-32.15079907126164,-5.365699150217074,-3.027859446986414,-28.261042736308518,-3.9608883341038847,-40.98735370290474,-27.128594282678964,-46.85008628299116,-13.977161799853144,-38.51610811660303,-5.316461691601182,-29.873248005699836,-8.676939137340323,-8.94045124840498,-1.1629538036803888,-3.488739210459124,-43.72645513603871,-14.0869853447533,-21.829885756955704,-24.280863045924317,-9.102680543133157,-21.007577051628047,-33.48675530732946,-47.32118982530028,-5.37840351254909,-48.82675824691055,-21.320684835220483,-20.399992791375254,-46.688462447487844,-34.7479098376676,-17.00229201652711,-19.008717193360546,-15.929253134359822,-28.695188949920393,-49.93647674331368,-46.23794619942644,-33.3469973497053,-46.74529537105454,-32.76031627168421,-8.347342442720374,-19.96980239524223,-40.58597170471929,-41.158136214859,-9.14922703066291,-20.392545984237632,-30.470933119685384,-31.01456108141315,-34.89493495124181,-34.37134625580009,-35.89579810802328,-19.59962123089768,-21.788493910280838,-21.395973172653626,-32.119314202738714,-35.33636590498137,-28.427821117938368,-12.622285113310072,-41.93522057741947,-35.095066045567,-13.053435219234611,-49.44009394920155,-24.47024793687359,-32.11168314783658,-23.975103993346004,-21.5834602776551,-46.7806357790737,-39.718038514495404,-39.84976351964382,-9.84911567676441],"gamma":[0.723222942161521,17.836798626782915,4.8557017796062985,3.486243679061354,1.3100217186833651,5.554252882992072,9.949230690823473,14.369255993278966,3.51072300725384,0.7242119360324928,8.52883945557863,1.3716122892891214,6.609266909250309,2.513142942202906,16.300177217818117,16.666389257164113,7.4707243045003535,18.01740520736013,17.025273044472016,16.42165884635471,4.736027341286846,0.5164724326181869,13.958359146968991,0.9152491867105716,8.866656315735518,13.557270756404712,5.348430560001565,2.0931655997633003,8.184677751104775,11.621399666798556,17.389382828620448,13.068927255895657,3.4392856535336236,12.613563865882874,6.06589881114576,15.315087401222254,12.955365336301185,9.971602195500534,0.3486060504515809,19.75269488463807,11.277627908902641,16.829788459728817,14.391853629468097,2.5247916208062238,6.734479282975734,2.4060134987806547,10.817639079953105,17.62014521332301,8.872243059008099,8.747689542422169,1.870560654361011,13.566042372899773,13.853344355424081,18.916602073229306,7.298158841222326,9.560681713328885,10.869646899152992,1.0584752011810084,17.827331332055195,11.442071423192486,0.5094396774572463,18.664913681830374,15.410523878121944,6.619086184101781,1.991016940333803,5.28076443954729,4.414627007865173,6.6062037450996325,1.2570315401719778,0.03202030223244723,11.834844249037136,5.558923587314899,12.262259678944542,5.930599802559828,7.716608615675877,12.218317692551315,4.835109011436609,7.3518565863780205,16.497011460273086,1.4609410283020008,0.4692195168024238,16.47111757722427,16.896759935197853,8.581868218897121,1.013065904197079,6.844725665597826,18.00618325342201,4.301059224730159,18.981594023422762,0.27268824030374894,1.0738349075769316,17.799780527872567,12.377261794543383,17.078060022685722,15.457276147576998,19.85426465468217,6.652645458386206,1.3028812853445793,9.241996451284752,1.614894658004573,14.588042389862537,17.1745849698303,1.1384780996043453,6.751400792964235,6.836052004796702,15.517416656920888,19.55553605703765,10.202585320676585,16.42895895579497,13.622347077090007,13.038612367441047,6.367532403642393,8.390208816115825,6.706098938854037,14.075454715962966,15.240080390405035,1.3394683944034425,13.387963533495455,10.196400613468658,0.5328708057625908,1.6350855327299474,2.993504842355983,0.040978985244124466,7.416577172474659,1.445771104366247,4.697990805141021,12.492511726640249,1.2384917073993496,2.465034188276345,7.171993361111655,1.2362461971512806,16.072022528838367,10.4359337046767,6.33770561445663,9.958855635890359,5.812167541099509,5.806939797902282,4.838602182300855,11.90277800216112,18.32974327382366,0.7514028249678306,19.420769497462537,15.634559601492075,1.694623575126979,10.701284529589103,10.022394065899345,18.4227879092451,10.529082247599376,13.183203228887542,10.169666479477533,3.6151371661543674,10.558224715261195,18.138325452141316,12.339986004906628,4.3973277550679635,1.448834740646845,18.701707635594488,9.945605390537384,1.6547181474412032,16.624468512848022,0.23707300501757622,8.715254750209915,18.24639832293198,5.745190695770823,18.222175334974914,11.511736137282167,4.275453618487028,12.81018279482105,16.100035303049633,15.59885752819433,1.7336675624575681,0.9699436198496647,18.19781030988372,12.290678021286165,15.21210780844127,4.009298298283217,16.575907897362733,2.2400591303875927,10.653159500845074,9.365421206046696,8.195873553480894,15.261955812883663,1.6917387127393413,13.656822126259097,8.174506545828667,13.275280099111274,1.6829328130106624,3.567081084657877,3.9405319195399136,13.140790968033667,18.276569682669294,14.955948041204529,2.904013123625533,15.248174229404219,17.433719773423178,12.43558258808596,6.983190617030948,5.759589450857452,13.06039217120475,14.371782317002069,1.1708634383989436,18.12580427756767,8.419638470422157,12.091435276102107,4.15627422560231,7.53372859454204,13.430876210309478,1.8942350384419537,8.172493605399644,14.538444183457724,5.977935966020178,12.483072511140008,16.899776184843844,15.800670177144,9.257626068321457,16.569955951950522,19.756199299600077,3.1807191515713162,8.935233653152835,0.27070565258473067,4.855182298760088,7.994693623138396,15.865243601090423,3.797577932668017,17.098731771851327,4.238375132089045,16.008138301893794,18.637854941775096,3.869443239727093,17.438485110617954,12.80423833331457,7.308295860628342,18.442259610000917,16.406044267271316,15.037484558356242,19.2391649617754,1.3625124537239897,6.868245006214,15.657784780173829,18.905123566700148,12.876645642410107,12.094210667891891,8.014766147520248,17.865738198464793,7.737004936322869,5.990477084933996,1.942543495011848,18.798823683846543,9.143380198395178,12.936585166992272,13.76718508829402,18.36931188283883,0.844911206687895,19.962918850610873,18.06242621531265,7.8504381292384995,3.074714387559938,2.7840838490868824,0.144239838846425,8.640124798001455,4.9157046509115165,8.237098324673177,4.991181236083273,0.7495925586006535,1.136364930838658,2.2132519568904385,4.416961012767029,10.4499782843655,0.5305628740880852,18.026029153475317,18.396935663862788,0.8626759337048284,19.048275547315075,5.5130107590038735,18.850244991890442,17.637819716051645,0.4582940112892109,6.789889714873234,16.148156275355575,18.1335740325005,6.2160609895348395,19.6983932617942,13.745863156102903,15.490171291936917,11.733464946208318,5.430939571645306,0.36292093602650954,4.08659527183453,0.6456680754519173,13.395585351569617,3.085364620488793,16.074627303568537,9.361186836760766,9.63090983181878,17.07788094417756,3.0680901043067754,19.624178409952297,2.488123257235486,17.295561226019075,14.514849595479609,10.119284215051735,4.4559801822980205,10.72450907111065,14.319124855149724,19.5171479986289,2.444864914392597,14.711486980453138,19.33884323470743,8.039485315175465,4.400092986643553,9.48025858040545,15.119740619082362,12.676973195245704,3.7179192164751917,15.299962046501792,12.657591898315136,3.007850719026308,0.08349820823839504,15.35876515008345,19.526785838310133,7.258648058723582,19.078770466582956,19.062800984335283,19.882407806820375,7.243362309207502,7.961885292512578,5.253664883066027,0.6336598362619439,11.709629681135368,12.276483098264471,5.817282099492886,14.646548309236117,14.453696741375408,17.126601472978017,1.4950786784514092,8.188685485655277,9.486596803432956,17.84126489896062,15.124928880616014,18.651301145310025,12.219395670819093,7.723060515030653,7.461985869326044,2.777113500705033,10.092601058921788,5.592852561357291,4.57860307519494,11.434614376899903,10.764166163466179,16.28783855738998,4.37577066087766,2.394350595367256,7.292629911562125,18.37493939400922,11.071310267009302,9.688383709659298,8.72034230607575,13.428334458103087,5.097820443177357,17.867524830854244,11.037979824927593,12.220701653198596,2.348638451013003,12.287066036284223,0.09252395873692532,6.59681287449827,2.258276776676542,10.918153907922715,11.384628560015235,5.846965646577722,14.191445583931701,3.390126233601789,7.466291990711595,13.080849666841718,10.639657538182377,15.877329486173814,17.211891502762057,2.119963328532477,3.6074224914489594,12.687791599704452,5.404596595917104,1.4869071795411193,14.51831275220643,14.351383897654134,3.831311251809808,15.462457855761995,11.626661638218403,1.3114063587045388,11.574400073838106,12.17866723360887,8.931519930117343,0.18314761096405174,0.9500580106574663,7.707767856760359,11.61620825058625,10.691369784348419,1.5880540897254125,4.108875615886527,10.88267959153801,10.90265144264579,4.486898361597036,5.927022580403154,4.882758873534523,13.677649818585579,2.1003472221357145,10.366195208308842,5.51991795551845,17.677841404429454,10.5764549363187,19.28898100973065,1.464676629328996,4.029229582151834,4.034215787331541,7.17977151416286,9.96821684914953,7.888080063386087,18.331003378604716,14.088986537404065,5.986443252621068,0.391030217824313,2.087196771134696,15.675865600176365,19.10254699128462,12.82274681222242,16.56983472008065,2.734188766992207,0.6780862582147229,17.981853027630162,6.7264884274476255,10.582962218330469,10.563951016800113,16.078806425859273,9.255518181998337,0.3783955315780174,2.115030014932615,10.921258095248575,14.539843708023996,4.164068427204453,11.361196263720302,19.498858946846347,0.05463808063572717,12.536232971247458,18.377814102307543,4.356502624977843,18.26707237274008,16.586086453101675,0.6922951518164444,3.192047532473117,15.392928256360268,5.730069906520425,4.40665672629398,9.148267542190865,19.000285684296575,16.96926690205912,2.2059944489376493,2.58189172388116,7.791533702804432,1.4973523665076227,14.385665236944835,17.33737554921798,9.897916584812183,1.115160853856163,17.129732324525477,19.864605523101375,11.753619738945979,18.207974153014753,16.871914193488408,16.634455239507663,6.767210916554096,11.363977519594481,10.351614319913178,5.599665739759154,14.922788087980017,3.5929652468245754,8.174895508738246,18.153163979114705,17.44167954601425,1.460422194471076,7.567336894062211,13.245753754086849,4.317266738166121,18.812108691021407,5.896479016869396,2.291707083696908,14.1183912543924,9.618289069876717,10.129526813744704,12.543163804075096,6.518059587919955,19.338143250972706,11.970047465343004,2.4014620066413617,14.45755942819742,4.9037065355329545,8.617458565109551,6.27512558703982,3.4365325009990277,4.088982785333557,1.4435299509082,8.805597206024846,13.98277234182041,5.113396648769144,5.2413369372731555,19.034633828865402,12.886892355342061,8.765907269380318,1.0054017620730393,6.214148578962382,14.275932504389113,15.522121338464224,4.867904845826874,5.40150886096598,0.3144278469766615,13.129057144430426,16.911918160671465,17.866272624584877,10.917110421249445,18.640591079880238,10.101047473469098,10.684920487286963,17.676284414675024,12.737834750725408,14.829162862060418,16.809333999271644,18.2793926426883,8.594037872032496,8.504597076343114,8.84231745587381,9.604824602817313,15.792086290211698,7.2381349564158715,12.475707661515486,19.594819044953347,5.325704301531,4.152385709362441,12.364259007947172,9.295220263702557,13.939625043124874,7.336917167833423,0.18048626988925953,9.04599596782277,7.08082236370895,1.254119266339302,9.913318066808468,4.705466488935164,12.80811967660226,13.84821605127084,10.211604169338413,13.393104280140594,5.791222770384454,4.806727693447934,13.308222371428666,7.509775611431193,5.52176063076196,18.865651307419654,17.706766451402565,14.520603084509771,16.32109434556154,16.23010658236497,15.010926386719209,6.664982313894288,1.9590488822280605,11.905489468311266,12.532926903296167,0.8139425495282815,18.023912655046104,10.072508308956895,6.426526882574821,9.761560033971634,18.007566396582092,2.8703528220847696,5.12231185835633,18.049480736167006,19.47808156541111,18.491968896534885,2.8389828157123276,0.6936393068285085,4.462516227513436,13.04445886220677,1.8450756564441262,15.782419439333562,11.590253656452973,12.407947128108464,1.1522595849341855,12.803049292849828,16.21771761721174,9.624921851801624,1.3047501320703025,16.108085529688232,4.941040836395172,19.88057511448753,7.450973452579497,8.120513260821367,16.719601087546245,4.004331197026261,6.9979791793147905,7.452365706189048,6.972377792402931,10.03579329703598,15.973071767485223,4.795228300287038,9.852666146545772,11.857376077605775,0.013570977387367122,12.480430011036315,7.605775629385629,7.716282013363065,2.533491755922981,19.072507626012033,2.8316673992132246,15.588647682209444,8.257863134909789,13.308066889803719,10.147931596666284,11.332771102807882,19.019898293808332,8.492329343154443,17.380174903739203,0.9907166016071978,7.7242547471152445,17.428733614565335,4.79570288235724,8.059235091869157,19.854185548896062,10.169623119757958,6.305097823410373,16.46692495609622,14.520766227096207,10.589989338646557,11.191333557263313,11.51287046628735,4.951664808806759,19.356604801191946,16.357771782302283,9.515441043294794,18.561144569126284,15.971350112044851,9.413613510622918,10.228113338193348,19.944897335716814,9.867767661861194,4.782296002040849,8.882815604560763,3.9145720671083994,16.117187485478667,13.251773289210753,9.848712844465211,2.1516350044124977,18.989821880153027,19.882410433718967,0.26578248177084873,10.415583007918308,11.635664925999532,13.884284674856842,2.4311594558563066,3.0983751445949403,3.1742273788138498,11.908166354689588,12.104196969318096,14.270224005436344,5.750124115918966,6.855862667336523,17.519913469524063,6.981478670393453,6.1654004352128,5.382437752613365,1.736776354553129,13.05136706308,17.454667949458027,12.512613320657962,2.741367263445027,1.7809448208797063,0.7520527358879736,10.41402157424292,7.731936297807236,7.074253019212251,1.3190159086046593,3.5546824314004066,10.275409623991024,9.832028270914993,0.8307289245570226,5.612737961781806,12.145674161750385,9.143125061582026,18.23375065482343,7.124106524602243,16.491368796772523,3.3942765546893217,17.748696453988675,6.4432450509298045,12.948603069475846,12.111884393379464,15.839718879286767,13.521068011106134,18.427740468054978,8.623162682182386,0.8149842015488762,15.878243135102998,6.681565145465087,12.90741169542963,13.331657706592303,14.046433708465496,6.716335571199337,9.144888039564641,5.0655124291662235,6.5473008936157395,2.3616830400120303,10.636451542731189,14.026831709104721,13.229485292732752,17.969112867819483,3.972089016239262,2.5520904546429346,11.078745696487292,17.360562699541575,4.439677925062262,6.634369176707802,12.025873408409527,2.269301343610106,17.822572690047345,14.87917160299547,1.8691195661360949,16.527980843635753,19.353871278960042,17.22468056651724,0.38771225450281666,17.31397160524466,13.058281874595137,16.497808493565774,0.7075389885860606,12.402267463164428,10.582079574135893,8.695340573565748,5.507664818154012,16.503982550471946,19.67392582124614,6.281352952922847,13.14995413117602,11.473463723370578,16.81609214968851,11.355389119848759,13.76126811137189,18.701497661990857,10.036709448038902,6.918246209967642,8.181284415309356,16.341744604360336,17.58574403080992,14.664458700868948,17.857369365662873,3.28677464213182,1.435031959754376,11.4243695845451,2.866770476670104,4.514140918474272,15.458308915845329,8.820586565358957,5.072584908234625,4.601552632492485,8.358583423115519,1.4610687207865736,19.76308962345581,11.360517816778604,13.978736345247999,8.550697357999862,8.384678666311181,16.592403773137285,16.590671347145907,5.2974608532262435,18.905576623015712,16.389067948020664,18.66825798198022,19.867793398603713,6.320148433072115,11.69043163262915,11.378942919040721,1.0712087455026698,2.950434859669855,2.0874553483276914,5.273323784170905,2.868586095797885,10.795108980001356,3.8141312883608336,11.313679955547364,7.434115623675996,7.528943846459528,13.343017792523625,12.761496009709346,16.313636427628616,15.365062300934639,10.333437484814798,11.98040543443376,11.436006428835519,18.6413583254743,8.157647463785418,12.441376660680724,14.553221335200321,9.201119389263376,2.2005449130127097,8.502452031166875,18.771662698546024,12.11147433269755,0.24575185283512102,10.793277438974084,12.565330160089951,11.983847704937647,14.190808192904356,2.7987030691440618,13.372981510968236,7.388946857108043,19.31254446474049,10.456700951672397,1.062205356301411,7.497042232350735,1.2939716953412317,8.237037572756511,5.014493735532057,11.459031382734706,1.1660470087522068,0.04389546282714818,15.401193882023346,14.73762382977213,17.473378932880497,15.233640991269311,12.831689057907765,19.669445333588857,19.24275056057324,2.6182410516598686,4.608659010270206,4.440172631618662,17.910665057575926,6.904885462286399,14.118892942574991,16.587384982983085,12.82430628414673,8.837692222142222,2.5893204095097255,3.5047957545664588,12.408150640912602,7.122566940051853,13.154583579797556,19.593387750158662,0.06820734820786267,8.316026349731933,8.722505815649914,7.724588563764065,8.292814344071395,1.5351029664478721,19.205686847537272,19.969920106114678,2.514410796919382,19.801739331945065,19.972797851257724,12.020557898618932,19.705982634600126,4.776111837166099,4.2157842014806945,14.183791389095305,10.187468113778436,3.109338233179688,2.711749413691069,12.424684046365186,6.239823231107646,0.29299357623825184,4.289806310811892,5.028606643625886,14.504581714192351,19.847638294097703,18.83111471656429,0.8469442712629949,14.863090363623792,17.812016897926732,10.712274754165886,15.258098216089051,18.759226533011713,0.07984789026138195,18.621332155444993,4.833096876437906,14.850847896706663,15.957430210424942,9.651356748767217,14.77106331570309,9.75728574693341,0.45770503873646895,0.2754563414327249,19.66881466721732,18.79347953724973,4.767164957464227,5.207856788694025,0.5780309581438692,14.919029130590719,1.70542613076631,2.33381585757388,13.830184620240473,0.9440652649849879,13.055738605715748,19.77703154656797,18.56769711978952,11.23821213744295,19.775568284465734,2.8497711782044055,13.847899550696736,17.556987150806293,6.130330964660917,14.5311368877312,2.459178845588057,3.7653794582512257,1.9849551193028159,14.608907990946577,2.640613887854628,13.027022308117022,14.617083033985669,13.316269847194517,8.076866429267113,7.029009975632969,7.71362558078077,1.9820026806406776,15.844878124249199,5.177098643149423,1.6606129508106449,17.996079657597875,0.966238391067038,4.451894645447796,1.8495094050971206,8.27951709418624,19.291253894886246,1.8545605040043434,18.838734219972586,12.887930356845349,15.680838057069817,0.700102978472108,4.597584171974987,18.943198752033588,16.953738421012176,11.737795793831918,0.6806098273280314,13.75091102753923,10.947517207797643,16.436326896300205,4.63281803684493,5.968272496565352,8.72271043709565,17.9210518001329,4.690747931343298,18.381866668960797,3.7543395989649175,2.793297595323594,14.275656106580751,13.055311611512078,3.7337714770615227,1.671387206852124,13.654438425071515,7.234897639456346,16.61147168721008,7.15194103676156,1.705404727552895,18.986233721665574,0.9210456959293545,12.742297407892757,2.941352802530881,5.424615022271042,18.8224751892604,1.7178389018111506,10.902018747673377,18.129728681318124,4.921893625415783,6.627574075499005,7.093813268592837,11.273476059696357,13.590764705178469,15.109576348724705,6.929972366388215,8.48739373926997,15.183974648121072,13.902987108955717,9.088282902025684,3.8288443952452145,2.9812610685711505,1.4160546350493064,5.970341808074444,6.750246954878976,8.768975556592604,15.56702254815615,0.7175292646905884,11.877890737316946,11.654175832607017,8.286439970026755,1.2551720940568067,2.2633421602720905,8.261119593718016,5.778647194530762,5.8500379731905605,8.26747582441293,12.03874691228435,15.687420316985715,16.090705018461023,14.598761056325756,10.856806775595032,16.0405615445624,7.344288820074536],"p":[0.6714711936372839,0.2002308504892023,0.35405069725046645,0.22878597146605117,0.5347337538531975,0.8608261134803734,0.3969856503562117,0.4647775493803963,0.17203736483907028,0.524573837930695,0.4391013306933671,0.06585262755522092,0.6092442937785492,0.42793064568776384,0.5325735908283638,0.4431093050187611,0.8658707084306236,0.855848950743878,0.7153830085687742,0.47924162667972525,0.19606119533942157,0.5706377688738085,0.6102692460993395,0.3551500657373541,0.9828383467901145,0.5419154821189696,0.27592145488470887,0.1957576380863384,0.754568239902931,0.8562554864748524,0.16553039854560203,0.24863797828614098,0.6731090218155271,0.417136406120282,0.036817585824163945,0.606438142414699,0.9194316011722903,0.28868660142039015,0.017685899492701385,0.06979522092087143,0.4582171339787424,0.21093292868796643,0.2980852712931128,0.13245067560447654,0.9847426454875183,0.7204203907074271,0.0402442110415453,0.4422937871541033,0.2168319561077694,0.6728977369191675,0.6498238667765901,0.4649131721148969,0.21188005519330955,0.8422104158250321,0.38792112690192426,0.16619364355453392,0.5346461521319139,0.13893416690016025,0.46491353075565156,0.3235895065256753,0.4692050655490121,0.14093479738881087,0.28375044317355735,0.03335615645752532,0.9662017859508276,0.7573926455279287,0.4004839757170273,0.8648156232801161,0.12606081783203194,0.4008256218626809,0.6653677542860417,0.09794751677809321,0.19147391025851923,0.6125563891867472,0.7998355555130872,0.056787676048757785,0.6782253312636912,0.934098602951744,0.5184594564311689,0.14716331787162007,0.8475634494980686,0.6481243859408043,0.23444915606621675,0.2697987452558579,0.9045011382929449,0.25294064873858324,0.8626273412646579,0.788337359299734,0.027927502173915375,0.5181978774630338,0.24113300476035593,0.6828857032484268,0.9578406466982514,0.8488703480954554,0.5360604258279664,0.6870222661127077,0.2480923856791306,0.8234932766357153,0.5859713030205256,0.6671102792447614,0.854561661070502,0.8393059749904483,0.30444676348374955,0.11296822861923705,0.8183492348363639,0.45655080085341804,0.5074312069820717,0.5252239539070369,0.5248597566291173,0.7122471592209965,0.23264478422988066,0.743323162496567,0.7950742014588545,0.35420500364749796,0.5748743172539281,0.48888112459061595,0.8062823200550049,0.24745906517298777,0.0015131757337774054,0.9865512646485564,0.4542550671676302,0.7995256793337597,0.7691990876183108,0.6562641609271707,0.3015068180731537,0.9129981263714413,0.6163626872724968,0.5833722813870235,0.9196083829152295,0.6235142065470922,0.20517081266573656,0.839538869542007,0.777444546412809,0.2965931576676779,0.8833805116618689,0.02898394738574095,0.37822397655003526,0.3250606701217371,0.03345531623689024,0.3320487466877826,0.37939071218405984,0.47906063231065477,0.5128033278145208,0.9104910490627343,0.8131718383684636,0.3320890411512729,0.9134248017329163,0.31867588346309295,0.8433510966345268,0.462917522310178,0.5190927773395795,0.4620978902947077,0.08099537398027268,0.2816056485405263,0.14055548597017875,0.6303094153494462,0.4722531829552068,0.5769105775510415,0.1296618374450278,0.23576554787854387,0.205430119228583,0.8346154826107677,0.2934373610961847,0.04973092546260949,0.00733863692925385,0.6772360811189473,0.5425903347640986,0.5276635651891719,0.08754038994138602,0.8940657943499732,0.10523020314500053,0.7432746637918504,0.7897811752950816,0.5003799195973142,0.8700718109934649,0.21853902496374622,0.3235994041313015,0.4547816562390037,0.49275624696254083,0.06378666263028987,0.7004482017206652,0.8726280670968833,0.8286819353053101,0.451111721499307,0.3779539626017474,0.9505148020377301,0.9443582970194699,0.2044553206804527,0.5049378719543616,0.2197787277994172,0.6316775604440041,0.30281403090539816,0.5188188766265294,0.9796482775311199,0.5633555380051138,0.9473539953583794,0.7396611054621343,0.8600099450705025,0.5947545561699028,0.25541012327428336,0.8681336753369608,0.12058841618126626,0.6108178199428356,0.32537162438469136,0.591239800355273,0.4721610131485654,0.12684094275467506,0.9631829505792542,0.49483313606910273,0.014656454186686929,0.7388641524879564,0.9115171323471174,0.5911556069974522,0.003671383423046626,0.3551103571598029,0.17969854312035793,0.317859252515188,0.43292574070696777,0.1490970612670195,0.5650162240803362,0.7369574696297068,0.3632741503761485,0.956119906772311,0.523786838198742,0.23008277272889588,0.1669455995602631,0.7105281440335933,0.6116307548700071,0.530619236497518,0.6097099139146211,0.3260313058794799,0.4456768980130017,0.2410596910563998,0.7290626406234899,0.8440346865007189,0.4612043077872805,0.505095643621968,0.8015636523180154,0.8036454370959296,0.7991148002258561,0.17629789617411662,0.3721970407247783,0.1922087470683782,0.2251354451624894,0.5206001553552422,0.40787428029533745,0.319103979226671,0.35866878896901544,0.08204735775660144,0.5476545753554867,0.818404699747616,0.09419667376621921,0.4060533927059924,0.5848173351693671,0.1617916590374353,0.3915051517095467,0.8930488761901754,0.06005408271996471,0.713731057725042,0.2113816458691371,0.6406435674577609,0.44632831883035906,0.8053571429398407,0.0987716388539972,0.6305820215739084,0.5630763416820228,0.029395923021812376,0.33641630384701426,0.6092538005130748,0.08066078214590577,0.057417812697425186,0.4041353716459186,0.9509836440264423,0.0752056342599643,0.780040737164907,0.14060089122039665,0.5103032082042855,0.8615739163899963,0.7487015530391885,0.6708251761657902,0.5806858172738623,0.9778726806211184,0.15492403586645387,0.8472357886548385,0.5021000096968979,0.42728455395140785,0.5398951680083013,0.39373110752324547,0.3705907764704919,0.4640827375441301,0.16847616361835982,0.17382671976799924,0.4071420527330847,0.9395916414998426,0.4121764735291409,0.6315291288406872,0.9721394550876439,0.40904133192337166,0.16554807734081467,0.5746942435756683,0.18498385849921495,0.11770434280349718,0.341431328149717,0.009620535225404403,0.9190968456494701,0.2012320522262645,0.6213042311061161,0.9235068371967421,0.046001299517326455,0.8283582977716202,0.15378278982597604,0.03774439211976599,0.0675675560666642,0.7338930795632785,0.17368046736227716,0.725049853391637,0.9834170267895528,0.8585333913878628,0.2975041158501077,0.9082431191233713,0.5789317328664976,0.07956901400503513,0.3038789860131057,0.08922278162160358,0.44469832501889495,0.933546260107194,0.40132914964974065,0.7916561418181218,0.3775883449350921,0.688445383907089,0.595072614970166,0.35199593829588305,0.2626911587059979,0.5998381119150051,0.41798648671261307,0.2868863160478361,0.232617521342819,0.2602420347320129,0.7018533471334962,0.7520949850690546,0.44619848705752374,0.6133458526783224,0.8565685253886688,0.6835270396978976,0.3990662470662869,0.11193277549768132,0.327224216838389,0.9537122551363708,0.8965158063761023,0.011073345978206639,0.31288889432188105,0.8833259674855392,0.7069101007961234,0.5172179869023854,0.7024199455533366,0.9237304475953421,0.010063543809129216,0.15207434257037988,0.06557903452858027,0.5027268282098953,0.2285218352933145,0.5349725764984474,0.38676781358271417,0.8087230968914314,0.05593029372562297,0.8951645423964321,0.8205356923031151,0.8318566995289689,0.707813572972033,0.7430694135173528,0.9828536186366326,0.9513151831812745,0.062106042280753115,0.609320281935491,0.3457733492858259,0.07828933069254074,0.7295142312319376,0.43633420714127547,0.564584310542807,0.0750109035039328,0.17465159841390632,0.4487179062826274,0.7846524897124159,0.9278559998902589,0.31535065723690225,0.8404889820437975,0.8492012107693894,0.5235588364531609,0.18261552744923693,0.026397980264550203,0.8660287926182266,0.0059102478835848515,0.9411998270219495,0.5314039414632301,0.8708141818123374,0.82340918306931,0.02219097580862983,0.353321823284529,0.04663155685752862,0.16484957660172483,0.7715849682072857,0.7856172716267846,0.45295856984398397,0.15776926083053566,0.14677217736239223,0.8991471993519868,0.9562162644475325,0.42599057688269926,0.9163645526162925,0.07559556459284189,0.7670997474713963,0.3144158500742291,0.5355210224296947,0.47231868345750794,0.5730914042244366,0.38960692000601793,0.5889898638468829,0.524063200054258,0.7637306761351055,0.892748635335562,0.24605391152230638,0.1077409931826776,0.15896316264255517,0.6771317616903274,0.4016928759450997,0.29733832010616923,0.8495320083431563,0.47355650022780105,0.14831243855224407,0.623760613804881,0.5793849169043344,0.20711403148945307,0.47792763543805794,0.0700635915937029,0.7852661693344625,0.4120820526125919,0.5546868372880813,0.23321517221025356,0.690801803360489,0.6595148482208033,0.7535847296717846,0.7933809087483461,0.773553017961075,0.47146945669265516,0.14157324839452712,0.3551674364580728,0.7093601482690808,0.05957524429750172,0.5993005298753515,0.13568072559936373,0.4288139647557765,0.03767287255143237,0.761258520828398,0.4896846853110828,0.6284579210357017,0.4188221227113391,0.5283298574207582,0.887880736514429,0.5012502121217197,0.9902450871726449,0.3126691406703317,0.7043406771841714,0.9272538306156521,0.0367330042307612,0.9164821415600626,0.3896396335687844,0.8840706624308545,0.9681323021220689,0.3653141586623392,0.5494123514767624,0.5623530961247765,0.4449233564723296,0.9519393768034687,0.028173091792942806,0.46396827158929166,0.28652665682618816,0.4800316494552874,0.8327578939934128,0.2762051767768954,0.5753336095460213,0.7237403740036297,0.35772898023280364,0.43861566100977933,0.2460430424621931,0.727443512631075,0.8001512802343953,0.8126438392861592,0.10095022966528089,0.6529773399020136,0.8131790593191892,0.6020470448280166,0.7000331324422502,0.7895496901143155,0.3421140235799083,0.6284094893326269,0.9083085871707961,0.14470432434894898,0.330838182988749,0.4822757210704314,0.8696872372599809,0.6185892956358456,0.6306176743756329,0.9428505612613463,0.8240651374508607,0.10074782513669422,0.9796074444603893,0.9599020309705439,0.03239224541323238,0.06674013531652712,0.8571146635680553,0.19096575076604716,0.40993088609510475,0.8680132283676882,0.8142210762730158,0.15771897197281293,0.2738375358887908,0.49372378381627935,0.015525654370976305,0.13712705174025075,0.31724741558132763,0.13282986211116543,0.10484729993286379,0.7987166652680753,0.0751775076772132,0.6621010267307745,0.5639644015867986,0.6234452919361682,0.9934709670499102,0.20283645084934965,0.26461627539964216,0.21060118461666666,0.9061459130570853,0.11553520775678372,0.634378631904136,0.350965707041865,0.08274958017149125,0.6372752649000237,0.0013811194250137326,0.6217306427609393,0.9656633552372897,0.9961697833977663,0.028848922972817492,0.17894094379996495,0.6442478299127639,0.1377556567329412,0.36349497171454304,0.4793812193727429,0.01495072182541013,0.1402347166561586,0.28521178086913723,0.3036007708745796,0.3397936693912147,0.9321619643258197,0.6646959652422102,0.11555014222820104,0.6426597503515796,0.0978725501661335,0.5384159328295404,0.9439114683006982,0.9909180544450689,0.688498064876286,0.9916428555875645,0.20582396198076736,0.7800921120917643,0.7978275385086866,0.6121393787913876,0.8447263122373536,0.3172371857016134,0.9894259657356457,0.6522682321562661,0.5550647361936796,0.06554488968053107,0.42566979397591376,0.6751674142004203,0.4788625840614136,0.7016997726770873,0.4851520448364659,0.24234319300923857,0.7669330749230352,0.8082360225755207,0.7228281762925957,0.745819774067682,0.7079547790607812,0.0015131392298608493,0.5110585419424838,0.7447921101129469,0.36385239788403,0.3203000522748778,0.8532529746365385,0.928651239096371,0.7532464727777544,0.2380556735437649,0.2858180157122929,0.32348459833102505,0.1489922761500473,0.6093995934282956,0.948998883827775,0.45496900469892254,0.3803694221377616,0.4546305430945283,0.5876254909746126,0.5467140714602094,0.37187515274277216,0.16728364666999984,0.1128017956929297,0.8322346168352763,0.5570169840063677,0.9355696271475162,0.19498834287178446,0.33318583834244286,0.7398165757624702,0.03156395385852884,0.2556815413727276,0.7339548223851058,0.6319066975894052,0.6953799578941422,0.7147712714014933,0.07134090401530147,0.6504003156735827,0.8166117248933902,0.5338963209845722,0.39422124687129645,0.31567542839130436,0.007355255179723352,0.7063805146184519,0.6927267890855509,0.86959650464367,0.11888191041146334,0.6206265150045827,0.7836621303046731,0.4752867043388047,0.09651091983067839,0.06047529282606545,0.8447837160063325,0.5509211683230479,0.4633102823816151,0.4920903061071671,0.38095333151049826,0.8599416197747405,0.6990236246834265,0.920881577457143,0.11461626020563509,0.18938415680479248,0.6700915202716184,0.8419798540193308,0.3535883930816752,0.14302540122313956,0.16181481084164506,0.020465728106784375,0.10929796015695525,0.4533370101879708,0.23262748826134305,0.6910141727274426,0.7028598491792548,0.14672265795443096,0.7348957393762181,0.46115350571768965,0.01791016814465851,0.7628780868312388,0.7956935861253105,0.46377787123895375,0.5027872587677957,0.4862575638169926,0.0650326843014597,0.9031522981295874,0.4369968892348426,0.3445753331524912,0.21819317995945253,0.7439404076669034,0.2788979151673321,0.7065353830869019,0.9712404840511042,0.39835553979898064,0.06173992538747797,0.8855817373393438,0.5706451305471878,0.055219820783499296,0.698019074863232,0.7625559572476877,0.22804360432998605,0.984376425961345,0.7104078789365069,0.26833574001690996,0.6889090086639222,0.7778599043636787,0.8518511850609305,0.8808779412866388,0.5664415939276555,0.2827772374353168,0.12223225419831651,0.37175288967611086,0.7240049758350673,0.8536410535234915,0.04345277316444407,0.1393485461401074,0.7161234866581958,0.2918306086135729,0.032904031501397535,0.6693240508585769,0.1486743483503341,0.8619061725278345,0.4491165222645057,0.5720354129313834,0.5564592752263748,0.24857644438569348,0.32304351608658366,0.6998346602566061,0.6559694140093559,0.1532014742884833,0.43325859413541923,0.7271336095795948,0.5943827375603099,0.7218020398157112,0.9055566626653,0.5230384446168781,0.9055813711125624,0.998328448143134,0.8602847090943173,0.15750880255423905,0.053403398227288124,0.78629604564877,0.1202064102039484,0.5397157207667547,0.7584220631605152,0.08996227407838342,0.43631226344436014,0.3961430495556917,0.8957084113832972,0.20979326542754317,0.9574220125348183,0.7525321196353234,0.8821375429695026,0.9408645189127385,0.9761797011321822,0.49597121634698405,0.15598011530673128,0.3127507241596075,0.11403490023204599,0.5046982715985318,0.7153388468417841,0.9037257000550756,0.2797490148495081,0.7692016328946121,0.19389128457740434,0.9803750084439811,0.6187158746066748,0.9546679319784495,0.328094917942376,0.760592845768971,0.4280720296816134,0.7899058819732951,0.3335895941587641,0.34753684241323657,0.5853664123125635,0.7603633008658484,0.40258947898839303,0.4311486348036415,0.39482226640980334,0.012973172990191628,0.4726290413821168,0.2547966064208993,0.9515123698092325,0.13146545483880923,0.8170267087300247,0.3346547362122114,0.6893634326191977,0.754492490710482,0.581984676114421,0.6407924914398544,0.4539475382229623,0.3846669295120986,0.7762383936438144,0.8714995124031812,0.8572591591566838,0.9055791093930905,0.9139807661527293,0.9603188098945203,0.042676421583218715,0.883680719825672,0.8642900508925195,0.44469839547821,0.9351785956066943,0.7111618602495287,0.22598618583509245,0.5949566930051713,0.648858620501308,0.8455800087088758,0.46922389946570875,0.02614605498969902,0.2639855294585116,0.09180260875148272,0.3747181368943284,0.3391842814669277,0.5457806159307694,0.7828101877277038,0.00584581649803706,0.566837530483844,0.2545589558183925,0.20376966712320743,0.7937407261202132,0.4253894843449939,0.6058575688246,0.7067361272821544,0.7352901183969625,0.30108701488931033,0.6659711841253155,0.619263811600683,0.7358347928004632,0.5589612317493515,0.9589381533214645,0.8614853980586605,0.9640112006102606,0.628388727017914,0.037881506676197496,0.6797110686123058,0.24990466248518595,0.3700555369481635,0.4018720813737602,0.12442815868296031,0.8467897739808239,0.5368709138686083,0.8465597014532855,0.6614965142332092,0.6964061613397667,0.38729190998807983,0.8276268388519066,0.4049765626602486,0.5822157458075565,0.7418840933272164,0.13620218765479564,0.6341184649130651,0.5773089418993533,0.384989727052099,0.5475575003725905,0.19130834136100572,0.9940999333612128,0.4745922049444209,0.8881775597933739,0.8081078464848999,0.10300521666988649,0.48727134783536363,0.753641644717336,0.7378509978530028,0.3131657350920938,0.418056751321253,0.614831289622092,0.9419315106051236,0.5997151087078108,0.11618310578681612,0.20425104691546236,0.41643620198902953,0.930332912330009,0.7327839928210305,0.26652182064170904,0.6549544327539141,0.31207878491322427,0.03399223868075385,0.8791931262160899,0.550611163776747,0.7103586872167749,0.19905005352776506,0.13019453864880925,0.011868371810348277,0.368422263622443,0.09184971610179593,0.135314961927671,0.5532069963744422,0.38386079894474356,0.5044297483667148,0.022381390560977987,0.8464887436886386,0.39314847181265833,0.18187940086938648,0.9794428758383611,0.5653597105949462,0.7420355324824537,0.6434158177618288,0.7936868326246709,0.25999686029024116,0.5203931694027881,0.5042474403290871,0.45851483959179085,0.2638217595002965,0.6822894213648276,0.9374315274513363,0.5744893759118597,0.6356965304594155,0.4728496211662798,0.9817870236659212,0.07317793157105057,0.36936952811742385,0.6550800922966205,0.21712666504113898,0.5516071992720735,0.30882942092157406,0.563658822351544,0.043834595224232054,0.07013040593366715,0.6359097177700992,0.002615855136244516,0.12173468258798326,0.8591788810941792,0.9788762921936289,0.09982625752502527,0.8225407523364656,0.010424887295623853,0.5800333324553191,0.8018359543633715,0.9903640365875093,0.9724260364256443,0.8428467407561189,0.6321056247077068,0.8732364662411023,0.2299353075350401,0.8413895757563761,0.3893091183553159,0.7660180100793668,0.6180349267026994,0.2961528871864656,0.49197214758092134,0.3959631050153207,0.3888423771899405,0.987127491350589,0.6503862806808021,0.8651383375839086,0.13071085269981997,0.7542284944262299,0.8003009532583998,0.8091594416904253,0.51969826482654,0.8334909348763111,0.09904000356252851,0.6424747936532458,0.04774346165410437,0.5241769171642221,0.17044753411460434,0.09390215502453914,0.5109167257754523,0.4115679306277813,0.19500257949818356,0.621208860892968,0.9265540211443382,0.3143107495979569,0.4402692984653547,0.008911353468713745,0.7522557030288248,0.06017924657381979,0.6277404924819219,0.43619289048034826,0.5949678186163068,0.7591253987280466,0.30385867009832745,0.8689076648916596,0.23745374017806986,0.09610061724184038,0.5073839459312683,0.7028183962714216,0.2700474617062185,0.3917246879834331,0.5146605367798471,0.4355651130165459,0.22772747378987113,0.3905793795263073,0.24604125518571207,0.9462300660879437,0.4753565168306,0.37218357537828095,0.8360970840274071,0.9682417459692356,0.5923210481661982,0.6484988423701048,0.9762254938880301,0.6644343691078161,0.17825503452050673,0.20209137669422672,0.28315246886054224,0.20352132864157513,0.7751524427043395,0.13205983253604692,0.7817970827560485,0.40514070393885326,0.5035411156419014,0.6451274967154834,0.8470325267719014,0.3878481311074824,0.49156077265097364,0.30954294482719025,0.23122683831894908,0.7582485515420796,0.9299624499447572,0.01584659117640652,0.290017120249765,0.3879829996179083,0.36559575904446295,0.9322119030242595,0.4081573323453458,0.44464322982736726,0.9094310267975545,0.3628414860998388,0.9619400487487262]}
},{}],111:[function(require,module,exports){
module.exports={"expected":[15.841069081848287,75.88625666059343,9.859686735984507,34.68599558313751,29.52204873189569,65.98366116107388,47.863626137290154,3.501551312194147,35.471129588276945,59.52475748678227,33.04093072942297,28.33035208804235,53.85116392266618,-4.396735336136512,21.47321326658287,33.13298782164242,-6.428280410165823,6.820795359919739,12.029956309533091,3.027345925123363,15.025658709139647,27.198855705623522,-20.445468061645848,111.11798618581871,19.03425316205789,96.63095780843054,42.712001437767164,128.07093619628267,141.55823502624,29.963556572174507,-0.2679462256492853,30.707256572818004,59.29864670930654,10.301199213165628,38.361942134578214,-801.3999006166074,-8.555496371094812,82.87027949267151,-11.861288833785979,1.6408718158507432,59.2813440636252,-9.061209155382588,26.189636044590177,32.76695434430283,10.894547667504606,15.313547171123151,32.72502617434631,60.027186402802805,-31.57732308891416,15.437661654336173,17.71762875747442,-19.577967652532642,41.877702432943465,9.43071867856224,40.30615816171992,56.516822134356815,-10.548995442527186,34.65337996931859,39.56884179273475,18.38702960790811,-3.0934555461548925,5.918056610624295,15.452932664465944,-9.484041686842819,81.68068815029855,20.210876801837145,32.76997091286568,27.471314781385967,33.19975219416133,119.79704748165605,13.144551776374712,69.86682712333757,37.764842244605525,4.255306221226311,44.65209109232012,3.4923089943411645,34.33503829879825,15.209726271237017,18.002451340560118,87.3411010708567,4.343957959759999,-60.694850739420346,2.091868692362488,24.172545905824006,-25.855523829263145,31.387223928079383,50.18153860715746,9.586077359561717,-24.81896555171871,9.739766066281097,53.27988961520749,-61.621993237571104,22.08528494651445,23.59282180768986,107.83308467099629,59.14371564935273,30.233070599119316,20.45905670263008,2.3931404550770274,-12.210734657601032,-4.162789073694814,29.033321680513417,9.155973074215655,11.270487086325225,76.32899311211071,-12.314690548817296,112.11969304080135,44.972235463719564,43.29966201192429,-3.9910456894443485,24.2391621479282,-198.06105218605336,18.660108433179865,23.57034002436336,47.30996544373466,12.612619749533923,9.015661915755313,-2.0054147677115366,17.343733500165914,14.529355479088991,47.915466060630266,8.280624468935091,46.30071916838173,46.0941779493773,-0.8748424433884416,41.886242276441465,-1327.8583648536483,1.646185726034556,26.101818700939884,49.22930364152615,2.487937916981557,38.84857510801395,16.98589753603793,60.27983689931982,109.54490078203642,-5.611600535139161,60.298081565790625,-4.823052212322128,26.670010695799085,18.761241629953997,76.04431237516481,28.204683512099116,-39.19830745977698,-30.525409197014675,38.20865141941685,29.63284791499929,37.00725004528974,-6.82707922108296,-14.741285609371872,-5.312679579467236,-3.5786424935656793,-0.08774976133353718,13.189353694312757,25.29696042063469,20.1461669971475,28.489107819920257,52.494117001134484,-0.4124992609769009,-3.843278786680825,10.29547664840443,71.53010480714725,84.11152663045534,7.01987973896393,8.477876118047504,31.798487876817624,60.98632696056901,27.596267816820188,0.5635678362319645,-2.8631550762488223,66.14851590250716,31.687797839733875,-1.2241043562927079,-1006.4549434178647,-23.638584597273642,33.643483230503215,19.797106867026475,3.927245689707453,47.49037560542225,36.76559656248606,52.23009279684372,21.271287171492816,-61.97790603781386,-30.067062715800688,9.90019357024298,24.700125943905988,18.07674733831602,26.778893521621487,107.3831346552663,30.602880876604406,27.535113090608494,35.10162266380258,-7.458565363241238,126.86007610121845,31.29113069246624,9.586980030502787,35.649232059381845,-15.483501145925443,27.231479561812243,7.3337873139141045,-30.74771459354107,32.9381119502242,41.33048851843626,39.164171028601714,43.311273404644325,20.08231805251604,-17.845866326755324,2.717427273996212,106.6546049828191,-2.0001772295833185,18.258361660777048,24.47666131804636,59.777499571152305,35.768058718980754,5.337640251479225,0.3162229157904397,375.29421661732636,98.72065288097936,22.059270577097205,41.970717730977704,27.80872844810482,26.153915682675645,53.92479727436347,44.46477136399417,9.399682199252148,28.37060922509417,28.96941610686387,15.672163036854485,4.296140204818736,-48.18927393647875,11.576973822821035,32.497944871036594,-2.6243847436668677,82.29256722457475,27.558852919492757,37.18138429113162,13.266866771114067,46.289402418199714,3.655235479933335,0.2865889686711611,5.859988852400911,4.75672080057805,34.74326469855588,52.06229858116666,113.85411169495289,16.02428925461834,44.36638754758513,38.366580397671484,19.435371720698257,5.50680828719779,35.824593063757824,41.42918741234674,-108.53549165863147,36.32758208253299,40.90212919842639,4.573364855136255,7.6976843713212055,14.583045532764583,40.2924203972661,8.949598459694055,-4.108589118790661,1.725294309779521,77.98323716317657,28.598198528763536,31.294926732591662,-7.876881233401296,7.953826588773124,37.888277831149395,30.253719299901114,108.36075005977335,23.388416425452373,42.268363048643636,17.279618670023986,-95.66295222282201,77.59856265190405,45.50742639856722,17.99101970846897,20.473033127468284,-88.84205777304001,30.185569037499302,-10.767674302529581,29.50020167240302,38.950998973785204,-47.78148805906067,1.6940065380157527,245.84305262905158,138.86417389519764,-2.044082192269858,-95.1551179706333,-4.264709419997082,-17.79418936910192,14.724777308334268,-159.10978327363594,-179.12904551494745,18.638095277991788,25.350222046759374,1.9126127732264369,29.966444955658133,15.959640999430773,-2.0606179986962374,47.31420242906797,61.39735926282577,36.01746739032305,20.830234985467722,14.888968856199021,51.5136389878103,25.99263317946868,60.60765367036316,-11.6449330068853,-63.4540971969834,31.72772758410938,10.590944609781893,1.4041013139052552,13.708175923967666,-7.054721755779351,26.84028602855168,36.186877205521014,19.323216137114176,45.71766056441576,25.16020596312884,38.71056077178336,19.40214094847572,1.4182600527339808,10.832952014507223,32.8753499509738,11.786169685698102,14.889173480930204,25.49434055174863,13.162840884216758,51.02342583238665,29.67134623138228,29.601800988693075,-22.852509769942046,12.72268251293869,46.011084284744335,26.77873837747201,22.479316057109976,-1894.7099353237809,9.981935116487568,12.937310072301276,42.76474952657334,-1.6782144850028535,9.607927255075545,10.51957461606644,0.1856666989322875,-1.6944461331544645,-2.0181014829975936,660.758582103626,18.593576393996432,2.972349443038429,24.961516024008265,14.094505175703313,8.032136738181306,-1.3057658888537507,-16.023884648616054,34.952845604445656,198.13473088263567,24.759070017084518,49.73002573346386,41.71861149267324,9.065645584842981,5.439102337117738,3.7155839715620527,11.812032301290255,72.40878777583798,63.454747837981486,16.414691137721704,30.66984741044492,790.70379722928,38.58824302714025,129.82678584107404,52.80684841121627,68.74766928157044,36.63569268848436,7.172016183682697,40.1690355290087,-14.301233551279772,-41.52266568641798,202.9744415766877,14.968377154136531,12.842112576086544,8.418145758106911,25.00946092027111,21.03940598804438,0.3435351110967726,50.28431261971149,-77.9598771469071,50.65297436654182,-45.64755838526847,26.469417533574653,20.642095295584078,25.951123586452823,10.569294956020766,119.31730701258425,27.662163728449325,34.17266727546559,42.78087433306616,63.28626588989361,129.7743741132731,26.74335010069195,13.83190506118702,20.924744861645827,41.72079220997893,14.54354688490789,-31.358853385156987,-10.78069541499298,-318.2515118298515,42.19578753842236,0.31498190202912646,32.470034668522224,62.60350468000176,9.534053127662514,30.40559874952116,9.282298664583253,23.229987222340366,20.694768574803174,27.084432652869264,-74.53217100033564,901.8449605444785,81.19817670948606,48.47433991223381,25.762268306288945,7.546837555758,59.05887564989335,8.78905731048441,32.57898502958187,8.073264349376466,2.58264113479599,23.870393229595678,58.5558519961109,13.108224282098236,17.86149682768224,16.2827775805964,21.30934756165261,45.69076417937567,25.548948498547862,37.81390315714996,28.753075271021306,21.621359018809333,16.58441913327989,36.673463026292204,3.735150861367119,13.6360363846297,29.1106587909172,-18.05264106358719,46.5168304290252,130.45484001594076,18.060492234340323,19.84093073096095,59.55321462620729,63.223340278946104,-136.90659980445778,37.260933777257534,11.924304307190809,28.29928948726597,22.095250884098107,-9.632407383454236,13.590786458931543,138.14059181116022,15.550629459625615,47.3871390505231,70.60499085299833,-26.748302660831904,-14.2495180624202,33.76883479338751,34.89319738173914,53.5575865162508,10.972750132391514,39.185198136934396,39.056475065385726,-11.055036810648918,9.925837439257357,41.104973889072006,33.567524076265755,4.633485372263443,70.52940223144934,-351.2346539046008,8.437835527050131,-145.17698416265307,21.03565673488967,-16.40770325451799,69.28903245269333,23.590547115240362,2.7655549699731807,41.10011243672364,47.52109085909276,1.5426946350765471,49.77689263844694,-0.13574490566843522,41.8335741159138,86.52602934082688,24.030895057013613,10.86219380774847,8.644302585829239,63.58934013921429,-25.85063890929145,124.12955499151863,94.10953482431017,8.741004791296547,56.68158371916136,6.094529837320142,-39.97274552501184,23.630698857674147,8.190726523033973,15.11441352138067,48.140538181106656,13.856671918676938,11.265455788705623,-133.21207158239312,40.52296711162522,27.84533290030278,-157.90813174595533,12.199834254040661,35.56756708380046,45.511852256433464,-4.583615847869446,1.4669467936134701,64.38525246782217,47.74610762174595,-21.409842754179937,108.22912109166951,16.350908957277785,2.1415029421625853,15.852695390255233,22.751280294150877,66.30063599662604,11.568106226954253,11.189627256018937,119.59642809850595,42.60586031077872,-16.30323884697578,24.66032618561578,1.952317210952021,28.643455916980592,38.552667754123426,41.998544992192436,34.403294417800865,30.554512089073263,669.2252634618235,258.44070239055253,3.0346527991942587,54.20227528537085,42.7687852316525,42.197994022704705,32.961282843569876,25.74663265886216,171.58193491231037,29.72459883314955,7.643011664519242,33.15096415918923,-9.678540173626452,22.11270276699748,23.389475548975447,28.571648116225855,17.151744104391412,-2.1440959288044006,17.206364200365243,15.735715873575902,33.23220126061152,50.00048844592702,-4.945631628745727,34.036510808886064,32.60570891005965,-4.558556641097228,-7.998726955263548,29.647923871954184,36.94928523567617,39.79596594888146,56.35981478224447,20.25620428412759,-115.47007966756283,16.24906370252801,-6.72231126376324,37.369298084575185,-4.052960717202574,49.82683566744946,17.93748137590616,29.06443799158461,4.632472617037148,79.64019393980507,25.273629266552536,-48.67395669944411,11.240612993434578,-39.113375720545235,134.92454008386645,15.62786026762311,32.76171180800032,-35.591382147128556,40.69190555400071,11.825810801228094,-1.4591400801252021,47.12387717025035,3.970766700562398,-24.045470928062453,5.603417053921733,25.06261685538719,19.339478932789756,14.111493221329626,25.073887672565252,15.873952351229013,26.500774013298113,19.37514563401129,-318.41715026546973,-188.44414524747955,14.896440406888651,21.932152422058582,9.531767476204376,37.91581418966054,12.281234465926238,45.18941998163406,36.77539150695115,19.100543153157922,508.64595066094216,26.719047244087964,12.848081951001774,26.026030079584924,26.039498526534455,19.154534898970713,35.21056468187843,11.802133890881771,-8.49477959179956,8.86651212797961,37.04024254373732,11.64342430320343,27.65153503299242,40.25112135853804,26.408390463904166,51.91984207641113,-3.052847174178537,5.809750454862245,26.653605010881932,-15.469565490846943,53.91982056146763,51.11994446763801,-29.665885058354036,38.65296296097775,-6675.787721113684,22.094777063582935,91.6962219020813,14.290377394488335,70.2399732292239,24.753856635068264,80.33113320868107,-2.2118794258975,-25.519012957003373,45.297034975112254,20.455344578245672,42.332569694839954,19.71570515459289,84.67232036360026,-4.575996888104611,-223.2222182812079,447.97293245384685,422.72573775291465,41.75646017802267,42.794479236919045,35.36101934607268,13.97061210755724,11.834719718994563,-19.102781081277513,7.493505472627659,14.940250430075347,95.15763094467235,18.726384608069687,46.87717394507852,41.40253639660237,22.593847620919917,43.404837183631784,15.885544384484092,27.912331575487855,37.10655011034285,19.789649569892582,-39.53193728906035,27.54703290502949,-22.884708484042996,-4.534163359787506,-17.315060755979285,5.14057380827702,6.360421908971343,33.267060343494045,16.8592648976065,47.16196815953355,15.019721955464341,-13.430156468490182,42.54358163880116,11.583052388407939,-14.01711729045142,33.660268248179825,-20.609432762649156,9.429021775200884,108.42076034031022,45.95769547791763,37.64018399967997,10.937424713277343,15.055261888993591,25.263614585491997,113.17406739873618,21.75115540850113,-113.19336223140354,-18.231579045685926,15.537826325743236,42.567175779022804,-3.4064648199572423,-20.660471487028207,27.61129072450337,40.04375703923282,-15.493885151257565,71.48417544290069,37.31063571309443,10.942403192591925,37.351589534117565,18.388790848863042,23.42550824507331,98.26181364620132,54.15846059552099,50.01243300140633,33.282206679151344,41.908758401468305,37.49380897624589,37.985212119557715,4.943901315075209,14.8438054446698,-127.76095274109866,36.54878956915724,5.897012277864754,31.364710914513626,1.4673809597953262,9.674588594833665,34.647533001449176,-19.534572490423685,4.680863312415436,60.19517816980847,-174.90966692233673,-95.19187745041071,34.34082384179075,38.72637662704702,80.80292421985945,41.68286621681784,43.74891299163503,18.36397041670324,-1.819082009655503,299.2732872030922,42.27189654276709,44.32418974491977,22.59825033692382,121.32615890132757,29.469108759622234,22.047242264093462,26.290950693668623,27.91150290072579,37.47076001335672,394.2233556730536,17.02951210161264,-66.43349545757951,83.78836517946517,7.900122322991891,-2.7066365845811444,38.19742858081101,3.885001164659837,27.92707181799714,20.761548880581568,22.335285857292174,62.09071681833002,57.02292158910788,-197.5933969552409,33.866203018556796,18.307579583895887,6.290164775738176,-27.601711274820346,287.04923507710157,20.12799152948706,26.3076579038956,36.074471304355,45.08384523737324,132.6499172850907,-10.103703229520399,47.04783215224996,-13.862682415589646,18.773032967684998,27.01654396520511,21.280583787175768,57.78429501316991,41.992549143717,35.57010310728873,-63.72573853951976,41.12687387738525,-10.235994369335398,57.13908495490233,318.7702451394937,-110.41244827493405,32.426347663149485,31.342546198331583,0.09940592086718603,6.895081145587539,0.004971197280625006,48.40778007663655,50.18150118111823,30.321365133338556,19.788864095503584,21.43099338618384,38.426620168305675,35.543075119638615,20.859527908590323,42.043124075565224,5.671668796302682,-13.959198946199635,64.99521631625689,38.676167826826116,32.95706929478744,30.54601611263488,-51.12197196747618,-0.7570335001763162,40.57362349096169,-0.761948484850766,61.666824552491796,2.0502371628648035,28.49472617995689,159.39132854282457,31.603331584713256,42.065886636848994,10.659641729698112,19.65519047024411,-1.598104131967288,-13.35329723694214,0.9316725494147278,7.183580379312815,-10.286831023988078,-20.273103367229737,32.05488448912803,2.1821623095268965,68.09383427223038,13.675196869129431,68.58080966500516,93.33645107542924,24.94852044626827,28.427725855016057,46.652862634242105,17.18713147119314,59.40233261506761,72.07630925711592,18.445738895581172,17.391959507937017,-66.89711196943242,38.171967828608715,1.9785864531548842,17.631766177572903,40.438192756471494,26.39026342554925,9.449853980409483,41.054347793259645,4.8053268587565565,108.3350875681976,24.956603666788688,-8.00433416972211,-106.90634738786706,35.331814680602946,11.121893743038672,35.30648085704156,38.36615748637649,189.30718005244933,14.801910733082057,30.56930701244371,107.90032508794884,15.728431707035975,23.70488548782309,73.53814487547592,-8.329135938990571,10.002154421158384,44.90287807696208,41.65987142533063,11.495423956361217,48.125009233504905,-2.2655806228201123,20.14316275623156,-127.75180031144617,45.20910201552029,34.89441266033144,12.668667117622745,22.007402162668573,29.18810250969733,66.93659018841191,44.69852984325248,-55.48586383238052,23.74777398963313,43.205760298495605,70.46271518686329,-43.487086779044304,12.31858742660869,39.99705126666378,65.3048030336553,28.956358779795572,3.3513711110156907,7.4959881458773125,-9.735283418386118,8.908196739040076,42.0638850168612,14.7035098257055,30.915815426638776,48.03606311658404,22.379726934273165,-211.9152178982944,43.97428215836553,36.54536964308636,69.40192668463345,38.80608604005974,26.23599382503532,12.589803162717562,16.780604361075397,17.28244036943495,43.8235731723701,22.973751257896403,16.583488653963002,68.13547495001063,8.579821383079864,61.54591677768886,40.1596319213626,33.65681277689567,21.83538913707004,29.60043247246279,-0.5757610616615167,16.85956178795803,31.6437080312611,41.79248683328328,37.8224575671258,2.066026175953218,36.20641604247878,11.279443546405354,24.398542954943938,23.961705333600598,9.608560716123293,34.2337554427319,5.597741454227318,3.7639461514090726,20.957054591162343,24.623173749474827,41.302634017009886,-1.3130727808287013,-60.5427004711825,48.597355122345846,27.93575630214634,46.72922252418597,33.349253888072404,49.03443686568702,18.636618209418103,105.16439165624212,-12.931562920795479,120.78630241438893,31.856317180289142,-1.9766367089008425,53.13257855597829,70.43475757225872,32.102376140833684,34.786637474112,23.71476134878122,25.644001579413654,29.660959499894606,9.980440530745236,19.324547038804308,2.3755612055679114,38.71609778770114,11.212494249803402,-12.051971866168152,-173.3626083850178,33.96580947001106,21.343974756039405,20.2765042133722,35.05795079513067,57.0597865889973,40.245369683010594,44.881074212853804,48.39013171591665,23.468488282109845,15.674415721380804,-46.817442309404456,37.339900554161325,58.383445963500776,-29.326527350663707,9.387654615284966,27.22912343625977,51.4431614764941,31.052740536792108,44.38701470699397,9.524744092503195,49.76905744223036,36.500020261374054,26.512223069017747,7.51444308026959,25.046319940098044,11.984485655229573,28.131891491360747,160.32195097937037,0.09413422046886451,13.095523797931557,-37.184663570203604,23.84746496902737,-21.95192057902998,41.03277226102524,41.11448328441737,13.664204491613734,21.760021950940093,7.603982010092996],"x0":[15.887401692600244,40.07718044218939,13.435387946902166,35.86126684523543,31.60101672323391,35.69453657861025,35.818966960695384,1.5415543461105297,34.110063236357824,35.08539986262622,29.752150448274783,28.842818665119996,8.478004439213171,1.9222928617721569,27.109242066166694,32.82167824529887,6.4917422310003525,16.89989218500827,44.286250266500815,8.313751774289745,26.260930018297813,2.5818369537339403,0.9392211637906045,31.501087976939257,18.022201058474373,49.324973368624136,37.34081149055706,11.293638127735173,45.90985354366701,27.950885674972525,0.9660266608973234,32.00722759993132,41.861811955483184,11.798041938401404,29.945683433505067,33.311549756637916,0.05725205697728608,45.37035753798494,14.736936631626152,2.1770912334459602,15.873295185014314,30.32128439130526,33.86209457264366,23.00442520923236,0.03886472784114803,15.703043642380521,34.95176855819331,44.13567144766509,24.666812050325827,24.544280438021882,38.528020109846054,28.769746335571035,23.327845619384046,11.903314187159197,48.9259839638831,44.458326077896174,4.341006706715311,45.96622904465495,6.748556988545573,24.76084105380506,29.16144369230259,2.944128945465041,23.096162782115037,4.751728096166863,39.76952003119256,7.1434682079981275,33.283457973701836,26.90357104479314,24.111492750185135,32.184405870600195,25.243838531083174,46.2785832157495,28.399760530870633,7.5851226505253555,42.39282335048662,6.437716648680015,38.28992525693822,12.498801482998578,19.526658582890576,48.2805050020592,1.653758840965125,40.64142736984766,8.115798142640084,25.31192841161789,7.428488709632508,34.1302860900692,40.867768274934335,10.046348519921944,9.34237496939858,18.157322952586075,45.27709562376814,35.52071788036504,31.803343897495427,30.735989990696456,39.597420336756926,43.02495835351209,45.919780214895134,22.758553852784647,5.31270088202247,1.9398879229141186,21.706706858409376,12.487826295183124,4.843890184957289,11.12838446955795,49.87503586308666,28.101916310909758,41.20835050068163,38.85555095964095,43.26498683364953,12.943299874904103,22.839517915433195,7.908109509682348,13.435962172455017,14.773858970212562,45.52353232746682,6.641526676093634,9.099642820844679,2.5275769203440768,35.96974082079498,34.58112956434623,40.7799402354519,0.04778122062382151,35.664546270782,42.49794767558056,16.19648101532569,43.35307877090586,32.770459620526374,28.23734450445039,2.0803180439085245,38.36941273765255,7.7079926907774325,42.07828790103164,16.03368428341231,42.57184687050612,39.64103142873859,1.9163645952304242,42.67056853956493,0.10882106716675333,19.977938662442508,20.036256093865923,49.856110518939126,38.83083752775255,3.2198322284899827,36.48866659003986,39.381777229210435,29.806486295076052,37.40843675676702,6.284776031221795,4.2030074376932625,31.695442429031175,13.966923839349787,10.621501776964571,4.804474301888062,25.13745445419564,18.594219029104753,32.42606934317601,2.4819226426178176,38.20862793536467,15.037693260424467,8.566324940810832,47.04127445578339,5.543208822365553,23.878365781040678,5.625727722564033,30.404069277967437,13.586339681361892,29.746844039509334,3.6965817472975115,2.8773007679296025,35.267503027837186,33.98811179482048,0.05295163578716844,38.833508938436744,6.965513768426068,35.289691495557385,18.245902272724024,18.304610929691666,40.529872210073506,48.07306111385235,34.262883771583844,20.61927327432166,32.881113514774604,14.820266941023386,25.313336332818935,2.5725412597440878,43.597040293373176,41.80059689501594,35.28230337897722,17.47643768467525,30.79096516767913,38.686132723381036,5.055303781583243,36.18802363811239,31.631546902627328,1.0822235789213708,34.73023424676964,0.331193653877182,26.95115420411036,14.816461385447067,16.327530307510287,29.67700888786964,39.71548357667179,39.61493734444389,20.66929997400353,31.35642347795875,11.509318186534657,7.575332444523431,5.269316821362069,12.438946979787923,24.57576860339775,22.092420161824776,31.80798244309727,20.20328076605353,25.240479050065357,5.323544651179779,31.2645679118988,38.20788638994138,26.389464410332085,37.22651754247095,20.226330197047215,32.11887301979005,32.54589052294381,36.76891874198299,26.336862279191198,27.350647927760598,29.377399136217175,14.187427644800877,2.322288212269763,11.688429929429889,7.48020201291939,32.08315363659149,5.766452464807459,8.919667004233212,24.33384744198862,43.65952659390512,6.716021331544974,37.64488647386928,21.719127037187068,13.294773749545852,0.11443085308442402,17.71191743101168,32.063703478795645,42.27009088124297,7.980054539381831,5.804158668765158,47.096879665007286,23.458400092903542,25.14854973512485,2.6907466527630097,0.9313989447456317,41.501873970165526,2.8291563626162475,3.7412047269047344,47.11976079779794,13.851559434489147,10.153276656362852,6.341655614883967,31.63316540216261,12.330540695029523,35.682723728102594,18.6523992362415,4.896174722897584,25.340773240922243,33.24003299349025,21.908398045414113,5.868276754136559,28.88493310966688,31.934329593070597,26.452617103795205,28.1058741381793,41.934132111545274,19.99353927509221,3.553268975474466,49.609482976831075,46.2415698822265,9.956941136705888,21.00549279881624,22.220315632509102,36.7554796210806,23.38586704372948,34.50517119550498,37.96881963938248,17.55484541682494,15.691243669462873,22.00068535524331,13.83282012979581,1.2164168917512486,26.309828175887773,41.74179043998086,2.139888329764017,10.955727819886619,7.69777652416892,30.633918666169237,44.77283205441941,22.72286871530622,4.253984415473456,35.81462781471103,4.260097234851967,26.78835467966172,44.51534007395325,47.89025574437061,30.976422463909405,30.07753006123056,15.39730116088146,45.711325646101066,19.83043546974381,20.240695079206827,22.38905743885844,26.583594892545303,33.22810532060518,18.596657522940475,3.3219424506829576,11.050688382499963,10.955171481335668,20.907298195232894,24.27606145652046,25.510698017431487,33.93526695074096,4.512697347334161,40.07196305649108,12.679287799091943,1.0462780205429567,12.422658888168048,19.325634061416952,5.839473573528942,20.914168063522197,25.38052410715116,21.82945995391038,33.66659136481972,24.076856539818415,30.242835159901173,24.41287424653691,10.798219396213792,46.627458306848965,29.97654123671587,33.04679647417878,7.1918724736494966,3.727747150454619,10.21038270874788,36.72028416526789,7.53075040339064,46.45668761143942,13.78971204826902,26.134393486431872,39.25991806674446,5.8790705389574205,16.839238180420924,19.640607589590843,3.6544923226872306,24.59658172624575,20.82047148409942,7.897921334646663,13.952347897114404,43.31880251557568,34.043912767927985,36.026371748484955,16.414560815828338,31.94078187434165,39.64072890573445,3.916585033564368,10.092844200571715,3.088779761858451,5.637139250840651,46.83842867519456,34.13442037306049,20.705807041450253,37.46780016341542,12.137520853086292,31.14876998030428,33.22204965272544,41.510522067871314,15.84831659559105,33.36624696728771,10.454826753081658,31.318774703779294,11.741289612475125,22.55016075296281,46.79112924401267,18.416261807452273,9.243886498949394,6.605105030992142,8.16962161553948,24.248019151797063,0.007490546142496779,47.037661980263564,35.90406962094048,47.09694726239357,41.92237091799811,23.40027249912151,23.0432739851973,42.99087547233834,3.55398729247951,23.210280672982762,26.148222222795305,28.711055790934026,36.566331824818235,44.40563193713083,36.82871539400112,25.533599878964285,18.13327259042541,24.027903532617746,37.09352907829423,20.218415560379643,24.071320402083597,27.98162744502267,36.83253016985151,44.13139064375723,2.412777549681544,21.413645303821237,35.859061052098454,9.792229354431093,32.281381729657745,16.005573668700023,19.27551615511448,21.107745588271996,25.909895225153655,43.84022009076769,17.111491571470026,6.467567491847259,44.49220902105148,43.465296703938726,8.934622568656147,48.05358717099618,8.646376508115761,17.153718595482403,42.93043159621175,2.5212614797654798,13.289846861920473,33.359241883499735,18.064637231081115,18.452778249459122,19.415819106800015,24.20754537620291,46.86744619261604,26.25610713223493,29.045958089798308,40.0507571231999,8.828353574479797,18.58913904434576,0.3558442860252087,2.2607135034368064,19.926930421210788,39.97647098611466,36.00596605580157,46.53581954098666,38.902096420356855,17.544185946969215,16.1235439046994,45.2785652574373,7.197976620150492,19.135476762882174,21.844190148873853,19.791870139593605,24.171590590573267,33.220694719171625,4.119491287943966,12.451124849700179,3.960875264481567,36.72982307321095,27.41832789922709,2.461921403808842,48.97721096936473,12.526824910565882,41.57855568959617,32.44532136065048,46.00599888518023,29.896237575619445,45.31119920920676,29.278101864099614,13.529585160332314,23.916087342036874,40.5349301333075,30.300191474092443,7.541667865373125,49.44494551169858,26.894219494459502,3.480294997463196,25.648659830962227,31.582182642021415,6.382268883140096,11.077801166032053,27.77503195764738,16.540857867614456,36.18617318668817,48.192271866810486,1.3137191531969683,41.15049564500085,16.686844030887716,35.55750908265228,39.02771966877842,29.14380635350512,12.706810061358897,6.828630399784186,44.414968021244825,28.790647083073896,9.366226576015436,47.828221788886204,22.49139311868521,31.443892904433703,11.101967039022043,43.663955727938664,23.687572346987686,13.877919898649981,36.142570781435744,42.200711656685854,9.092344009406029,4.528309650025763,21.122842390957675,40.65927235066522,27.73712839459932,13.48117408661107,12.189145108574795,30.853229015621174,46.55497030096443,1.6102895341186918,25.15538647329707,41.70630752716583,45.94385077593491,2.80128362941211,11.666394701848548,16.97503565767935,21.22699005170202,23.48606339004621,19.367412263942374,27.26432247819869,32.132827101402206,10.510769390075914,43.49056926945515,29.139348830959065,4.427436706373178,23.060374653533998,7.374480257448035,26.443906226034976,33.18890299539128,44.72945825436189,16.008803137856997,30.967931277964677,23.37858016770268,33.149178095136534,26.05699319611108,39.2033130500942,32.269489150076225,38.191741545346446,36.059727975713315,24.854485911550995,14.544888284632595,16.63768976852189,11.256000888524198,31.75351898475036,20.888419101636167,12.055964642749373,22.891686075298267,27.937985519908317,17.375909772016882,25.923863044824603,9.536872207225544,12.626660548200086,28.981480646561742,30.208888460085216,1.2977559975683617,35.54987316517477,36.689705636378875,7.309478107757606,7.985184104781895,30.33612758361084,15.67573476399956,45.81234556389836,11.61141380205506,25.31082162773066,17.265562410280644,16.274830984980603,8.487264082876923,46.736071063595595,2.851241343695854,45.38761420121159,39.1503377535163,38.91092765344501,36.35132849632872,31.721123897499247,24.600656527650045,2.1652760144686423,13.730820413656797,13.340972993599465,23.10345311293198,12.212863586184497,25.26776378303932,40.084291292899024,40.83508541361829,12.641831284694904,20.90300054501425,48.48132133047262,0.980333250703147,1.8705445821259326,1.9178680510285706,26.675160984407665,13.343799135149027,15.050353596548538,28.386421869525037,17.786074852389177,25.597015546723554,21.390862243006094,11.249928108510343,15.865685219590041,8.028882476744059,29.00404881226851,11.725234597341384,39.61173275074471,16.456124129326323,46.006337584514455,36.62357255019724,16.0849776377189,7.760621167300097,7.4874585770423385,17.734595469331605,21.06091768907866,11.797487768954095,12.837847963138083,22.787598231949058,13.221346718889858,3.3901133796777616,8.703274477257173,35.32708398951851,12.287029912209801,25.620900087759157,44.759621020171956,25.845014182856307,35.27879620346095,0.5998177615897271,20.590813926418882,0.7039845355621965,6.692375384980553,49.817621278282786,46.834446025425756,20.521500237039426,32.70552243200194,42.724905876009764,19.581122294047137,48.614073728943076,11.249833073350569,48.163355305856015,49.32926979676847,31.799424850064185,19.593608969411935,16.899315472541243,47.49558217196493,20.46863056458694,49.736027138254855,19.172324872285085,39.089340940576456,1.174076236815691,49.68418758275956,32.118633719255975,26.722340546707525,42.11764731099139,47.84224726130666,49.84910863184788,33.40996771815159,9.070996004008869,9.124396263140467,23.30198089728053,16.792392097368236,6.373479657286818,36.723462990498525,16.711230610808393,42.66900338643369,22.459614353503245,40.483242495231295,22.18546098189439,33.56480293268916,38.603488454667165,32.01147501718191,47.368310100084784,29.485719116125196,36.49033151130734,37.274664069321,22.2498922240305,4.9228625476334775,3.116101121996173,34.835457868656164,13.37460029727433,42.60233451329955,35.8067464334214,1.871487829333618,47.441415070773516,2.253444831403295,1.2129271767829963,37.69581560099519,1.373211653519213,12.944530861658421,42.496786732089745,38.302678726990116,39.41670571037851,20.09348856143658,8.521736874378083,27.324751016894655,15.677797964007812,11.000716245131937,11.420595627458674,39.464413867138944,43.61149947390608,44.38165123226213,7.467091409282545,4.249374737206835,20.534017227736168,40.100512751031616,29.544672983043107,31.108153060374278,18.843518306977792,33.64463368712875,31.71033759129861,20.38844060695888,22.801553369313577,28.03049015543352,1.8533185712471756,49.32417629831397,39.60609053148049,42.436387880664995,36.846386789173316,32.887280517105,39.45749697259636,13.287565202832374,23.223981978107698,36.51865067264127,41.87243838470622,38.22149230623122,13.302544518495818,44.59033122017305,36.530311108322365,47.0599993484789,2.5709277154086663,25.179637800663947,19.365087307794504,45.750291259752196,34.449391445633296,42.455745392703506,31.471509227492255,49.21062388584501,30.40946296006051,21.774659515468887,14.818116478094545,30.650524278589685,43.07115068576975,35.272722445941554,37.83235729936233,21.255623713709138,27.624314496488665,18.113949312247435,20.403369546212836,29.18916123491031,31.086716729424978,46.84382327135369,41.00856368300347,28.852325971028016,26.504091369073237,6.315373860762207,3.7350210781986415,35.9743899408547,13.339064234468722,28.62253893627714,21.046768155041594,16.937438226119816,46.21299582853622,37.28608245974476,41.29944549180276,38.14925805757598,4.6418894923919485,8.87033897728029,25.460140513082095,37.2481364175934,21.332041550259827,24.762609564022032,31.393696675260152,30.838357084353884,7.273014637825437,8.898256881935819,44.50447218104938,30.673461180395,15.2095411797737,14.106138425817761,13.390147875315183,26.11666826947021,45.55540270071538,34.39033552390729,5.034276163467643,16.756320039670435,2.2224312366766585,35.819348866669856,21.585590923805086,27.586847128846937,41.19371464469601,31.152039927467314,5.138941897153815,8.15540604942776,1.5720223386652021,47.30479538291922,48.434440049768824,5.43706338797485,20.88526396700142,24.936292933938333,43.02307324974534,40.5945867224669,10.359939282446673,29.784893376477516,4.804954979971865,28.853538513286246,27.29059436917145,33.8960572032466,30.440844949733215,32.71485261564154,3.0894515024554314,25.2806781324591,48.28395362469753,3.985908045994524,41.541111788734156,10.568443176301056,29.158769953940777,36.60141691654455,43.45978568796372,41.70388052558106,23.23639909126982,3.174990207993944,6.9125080256736915,26.348472650893285,6.823538560193998,27.45662772763894,37.07948109485483,21.441095774451945,12.004591379086415,10.654519970492181,36.13880678807345,21.27409117603968,37.54774613892165,20.63269334430402,27.722344369008933,20.30202062790525,38.7361815929522,6.521780313054382,39.71878683632861,49.13201481439848,14.629551174906352,10.166207598513022,21.518017887038344,35.56564868140828,12.21673192663525,14.010546687147741,43.56636756684935,25.81402759932383,11.72576424873738,27.018019347665557,0.3076496939191098,2.163549044382296,23.604252126303106,11.038568507515322,3.09914882740574,34.49514165707049,11.83775701441736,35.25692504281035,36.52351574978652,32.50644624591531,0.6760752519958002,41.33594602467411,44.02524754045116,16.983583431764483,5.762339244020486,14.678934771611008,15.992326280672831,2.4827671518060757,31.237535150556727,42.05849544005582,11.920822769298622,30.25563134760423,3.9696053825537203,23.433532176090743,33.5025666354392,19.337611684921452,25.476013003228726,5.782716593451442,17.81644519756169,47.531914097153894,46.47523755097151,44.596472154216016,11.068852934291229,14.930171026842121,37.356046359732545,28.34816805362935,8.463343856692552,9.51800500571942,46.75865256280445,9.393845024415338,14.97455230056033,1.710506475979201,44.680211236980064,26.46341281592712,9.432121306380125,47.911384353688334,18.33178215760095,30.999140545177163,47.138279444308374,22.10258308172731,48.539896574488836,45.506145912953556,41.225279969333215,47.99794374616513,39.66037749056067,19.272366158484267,12.398083814427208,8.131423804856075,26.205230681649383,43.326197843878674,5.393702927144462,16.217640521346087,44.15779676657572,32.49714092653087,40.93639475197012,48.98921408713098,27.87881568977636,10.35602406047138,41.741272897586555,10.746807430185656,17.22794867533888,44.68167002520529,47.9416064939077,37.6810048374009,3.983506695287975,35.620455480399585,49.99273999390227,23.39958401683928,16.000361778048312,14.884340906967996,32.13389304689114,42.863246663858014,6.446952057495214,25.096484314964542,24.631372546879582,39.938075868539855,18.567370408823823,25.005030725955468,49.860889912025016,22.916647573848547,2.6462542996741,31.559980337130423,46.37201562548384,14.119162026426624,20.657447346723636,35.53002100786459,42.772138551282644,33.01870431000391,2.488193807558259,41.026896967858896,25.13713773483619,33.28389282826533,28.57535286856291,6.713403858180644,16.56870781036116,32.894418213554445,14.41943036518506,41.26492887495339,1.4377236596137766,39.17309410458073,11.01441409487267,28.837841191619916,16.560224290745108,29.891664536391747,19.244876290201063,0.6899644576645381,34.82161197866694,47.554320180214106,17.691074777166982,44.767812960493714,17.2159603433228,24.532677159135307,1.068247987571258,41.58288475888057,36.649092780678195,42.55189466778899,21.995139820980935,12.519438475514821,27.094214350488087,49.26273542674515,24.030923464975164,43.98153386968089,9.894966462359655,48.11288830765393,36.721769632130986,22.200450677545835,5.204990647820451,30.551516303021675,1.6073817085589193,36.48972479440866,29.81970044530293,0.11689132353245313,9.153985718980806,28.65015478295404,26.723493402625863,4.922002166801265,44.31902506802017,19.04148831840933,22.250834933414755,46.3223287854352,14.244706170058452],"gamma":[0.15496947814298778,4.864731980991559,9.961572736037736,8.532343542363186,9.705590572886841,4.454226908464456,13.038670077740822,1.0622990980656155,8.35754413241174,11.427644051987652,11.437318226129989,13.755211135829434,12.727299060671161,5.494261203399087,13.828559070955766,2.756318926672252,16.084274404133623,19.436543795352822,9.270486414698942,19.34123924692548,6.7890845611587824,14.273641716651744,19.315544098321137,15.29610248771187,6.489524478033539,14.35430024229992,11.100249487223524,18.113671709777023,12.143609326034305,1.760869904720277,19.33114983825356,4.092774070595833,19.642664864721024,3.8472312586500568,15.534829615403316,19.927542788191076,18.22909002071658,18.26069267349105,17.14120561347685,1.1720340832582865,5.75514615563077,12.778396308540078,16.81172023176692,0.9942576552702764,19.04671068177427,0.11478650691024939,9.238227508349631,10.858568927359507,19.492268738290125,4.252890324139331,13.05551108362938,0.38818879931338923,11.140559854425675,16.390375038176458,19.76750211754842,7.651906960463926,17.968401426239488,14.328911291571291,3.5754314674740417,19.02221656317673,12.383866149393633,8.857833733225018,6.587547350397904,16.29469866243056,14.540781367078242,8.182446819251773,0.7501393134408829,0.3397611839554582,13.05532418978196,11.040682061162062,19.347796466897208,15.145910222443923,11.703047892908419,11.872892592867297,2.389121321701513,11.280416044704161,3.4242341766602635,19.00735303400507,0.7894975371208934,15.40543032436798,2.1328998441667135,7.248971472957213,0.8612697856190588,5.493354655733036,6.986662877559819,3.392528214810051,14.28953646565013,1.2679262806748204,19.619653983667845,12.49552806456855,16.77372229282037,12.67215686643976,11.197921668201936,8.810419909005272,8.73766779667461,5.466824534588239,15.364786629565103,0.6166825627079886,1.404584352363556,19.707606174537176,14.383482222253683,18.220227476778916,6.031176250789376,0.6038614732605696,7.1358283886919605,5.147898893133536,16.55953719754209,14.062743468307755,0.0761469161725481,13.236739991340674,0.44423391409060375,16.018323406901423,4.477045543656035,8.58893684358636,5.344662940474825,8.810534282238764,4.275309524188873,12.740159473010273,13.027121272996425,8.71014238178265,3.86726907007084,10.525552778766283,3.087694678182591,0.6152048554514478,10.215151982826217,5.739940790407898,9.881541616119298,9.212989914105808,8.981943351930983,14.993149290548033,17.422041102366524,2.8353246549539213,4.910760912148651,11.628710286886697,3.8043339123412556,4.816478058346698,17.585316626289888,6.381251879217542,3.712654544248526,7.628949507990703,13.146903567436246,16.993490689236918,14.249506980061621,17.63565406464064,6.6822931745019565,0.2609748988661087,6.195399331729585,5.943849421900853,17.52351342665738,14.598928686522278,7.438199685089022,10.584629010732138,16.91142147080278,1.0673198170636988,17.884085937630715,5.542204641532815,17.139495341327628,17.36115837532648,11.876185202713758,9.03045444082192,8.122033410449493,17.995442231160016,4.093802130554338,4.883588918990465,1.7555658307012,16.255137254439965,1.1285391905033038,10.06412786837978,3.263172118713822,8.747844748187084,18.960526162925913,7.722069500591444,13.21251011048691,11.940694433478004,1.6845315832228103,3.6181078219821217,11.541359100773153,17.085650448842333,3.703259729275943,15.451495945893999,5.557477888597155,15.146943016778378,8.173926467244975,12.209289021333465,13.60629189683014,16.850825186239224,18.25557008094397,8.871641626708664,12.98816234670953,7.214983062430722,17.182579096160087,6.489289520435513,10.739209966610229,1.4451934301266478,7.430120186758629,4.178512624246009,10.08437218808834,0.31391415351684326,9.899238514078036,14.318021201669113,3.7182597790031258,0.43080901281137063,1.5859940565121278,10.635630360918853,14.054006340779623,13.828297607502948,9.568761989330135,17.214731067609577,8.462814871722198,9.441406406066918,3.61358674289892,12.29198902658152,18.886245752815643,9.67711076695149,1.4923906577226376,8.526759787718996,14.223208421859631,8.524441254879234,3.765763110008238,5.436479145672886,11.5132557403984,14.093681064848326,8.785684044152863,10.53173744199892,10.338064666675969,1.9948662497102498,4.370586764938285,6.643851196851491,3.4881145023833815,5.81009832682212,2.3773657686176275,4.570425328417627,5.497681926296218,3.4601530668529668,11.68683967065935,8.08980906732646,7.3155315711614,12.309836024067993,10.041864408516087,3.866994245911428,11.29888720967028,2.5810051519542254,13.549066981516141,18.608569638139794,6.949358820215523,3.5436832685459407,14.988599631031047,1.4088696140442636,5.376024480376067,10.897293905671512,7.904280528860852,19.82575657165327,8.152088233565586,3.9758403515526686,9.91363863677828,11.361113770605318,5.480180081478028,9.237831719256278,14.062538143970439,16.819805583384166,18.934944949722304,7.179383827150128,8.27999360126908,19.067961204766434,12.590958492563452,11.234895243386056,18.274387066969062,3.6768290275092497,10.078007316479326,6.88383098955458,1.7209881459127274,1.9420038850333077,13.302421608552532,14.41576230931052,0.7371824226660983,2.810262120784115,1.257044444813591,15.775166375522964,8.249378069911625,14.014275462429104,15.24039253294427,7.684618268138657,2.828624778265736,14.437560015081306,18.401658971860805,6.204985931082385,1.5303479128585273,13.970000898166681,10.569778411062307,12.54655221528635,13.122022646149683,15.399437749191254,15.620008310543554,18.11075327037593,1.704132167381327,13.955025615939324,5.57224967207123,16.43444377398521,3.724851105962599,9.138387044497724,17.01667079802332,17.282568254447543,5.319542457645721,1.1327548442998125,8.691161228704662,4.49339708745375,13.393939910972277,12.973061271543997,5.503876715014555,4.578723004281353,6.571681235123719,18.653861830395222,18.80704073843912,12.504259857917944,15.427079849002814,4.641241467636412,1.633959962803333,16.401212847477638,5.074771459920466,16.441403367750063,5.859335460244788,0.5439870813625225,3.5585202852651987,16.383793491945916,17.57360596250291,9.248032092957935,10.427356314560217,7.040250743283369,13.691466334426611,10.451602382875773,5.690999359422091,9.587378805262055,14.356327635736656,1.75276822619169,2.0475794383976975,6.708578569932784,7.630609002209581,10.952275384347207,15.524674351629152,11.624436591759233,18.826822210019238,15.226410550738866,3.4212996208640734,13.753307252954524,15.646278029451764,13.637748660890235,18.129580517694734,11.573041185754454,1.1088753839148513,3.896794372487067,11.986938775977226,1.5188188426233884,15.253299720849277,11.722266580487904,7.41784541618697,9.285265545900065,13.438947917021036,8.445487622938765,1.2175212335110475,15.941852083898853,16.034100153310842,7.550777903800667,9.323799131628526,8.776014369015028,17.049950463372475,6.568840309502146,3.5029333874385093,9.274712684494943,1.3857970304538014,11.086714223951116,18.15188155146492,7.08064043934443,6.976176351375605,12.799689425458315,19.76682488102158,19.078219882163005,17.750744192597846,19.30572692297948,11.891642381165264,3.837440788564277,2.961938952565668,17.869859509419868,2.9824246916341712,1.6897677108739328,17.23228495081623,14.740650027921722,10.204500258236596,5.492127466921519,16.5480095668021,13.370922004478762,18.465682787073632,15.262346002128954,11.160447034329026,8.450533310883799,7.686801800370318,6.062337571594991,6.313534748379852,14.459640293668672,13.345281319994978,7.4010968634333985,1.6021395323289855,15.228048982313585,14.042276177337389,9.957719226060767,4.7889621836737195,11.357304011577419,19.100135850394064,10.093288342787353,19.403292131229477,16.189214878634534,0.9506944751114821,1.7290206541828956,5.441733593370128,6.647643931687184,0.4178585165555715,15.669003728898602,16.805526919201355,12.860364979156556,13.555024064991063,16.286969406950472,9.901177411465634,6.74053064634776,16.205491701545256,1.0087480215467792,17.585255752127434,15.986172263150005,1.3233483036076743,7.045374535076672,10.406876151250666,11.193792228811441,9.452842962759647,5.671705903214415,5.103793121605302,1.7528327634062268,3.639395946249837,11.555355222413803,15.771061341361223,15.049251679388526,1.117392356134519,18.520750750478726,18.449423302880824,7.808585753639941,14.166657139281753,6.613322301189601,1.1096601376010318,18.094539129561554,1.724933389754142,1.2594149849322767,3.7845796323542036,15.076361257386743,6.993528869035295,12.57930882102642,19.710555313123372,12.839858463321372,5.655427519961647,5.561993283754791,1.8852379020826593,19.356726778453094,12.839758636075311,5.2124822229952406,18.28077073178529,9.472668145571532,5.674440225143966,14.990755190468175,6.365355338669132,3.6757363178234304,7.0075650951792445,2.76564813036988,16.17221737960588,18.68280308026659,4.115595275653425,10.504000164306554,7.0512160748094255,5.3031196791732915,19.803163843140897,14.702612481275544,3.5956688659354175,15.977837947138545,5.312263394667047,11.5948473172375,10.691638020073363,13.766859299220812,17.63914270753835,9.304304090695963,0.6908407714984577,0.44406203048148907,15.337000481882615,12.923241788772897,12.0637211367033,14.08762686134934,16.717979285413943,2.905001815305628,6.963376271831594,11.472532664901468,13.075064926608135,11.425935178293173,12.376808029151757,15.419865117464035,15.72256793742405,16.24900225547234,13.702290846718954,0.12089262740406781,13.076119053308446,13.414919677157208,2.054411068826094,3.2021599213924024,4.782413205037033,11.278127476783872,1.4625624366222745,4.222175438771498,5.1198389741417705,0.009397853540034085,13.040804632529621,1.1412818398024749,3.531121385359901,13.535506903968484,16.960247647767417,18.555652996959836,13.727645080059725,8.882744441673175,2.5287035350384057,19.422912109111774,4.331040733425771,14.917958687676641,14.60218661219061,15.670167076386639,13.477361230224027,14.894019377930473,7.678831235433776,14.685812989415314,8.187832844928383,9.88128779582905,6.3375136313306335,6.5623051241363095,18.841879028329092,16.483873133586975,7.847112870951345,7.5013781854621575,5.862665838833223,2.1317210292118327,18.769291464306956,6.610578628330526,13.360426102980858,4.166146132732744,1.4382124582313294,14.45090699979431,7.93609474172845,18.171594594157575,1.037545655737846,16.89586982861183,15.04241980729602,8.70980008589784,1.6714489485652928,0.2085180746355908,10.880606940840982,17.424623540601054,7.046245633127417,16.04506637505453,9.270368487662726,19.61718589617618,3.5581408204025555,7.097296064079361,10.391256642004528,7.6547438719503536,14.308959785296057,17.508748076389274,9.188189631074746,11.416362774613038,5.38107231505081,9.307754084988922,0.030244271506982834,18.223187765603782,11.154067856244488,11.51731781218337,8.205777087225377,12.947401358628516,17.521932847387674,19.96458319395544,6.446128655195911,2.5170922888028135,19.2189826233841,19.583355544923016,19.756322029872358,17.061204068957004,12.244042842540889,17.22760654529898,12.706683112845099,13.14440633273204,12.145511646222111,7.939930574276142,13.484477124568963,5.2586048945926045,9.876365518751108,1.4367539516045058,16.092336485975487,6.696814405436871,2.3974883275672987,8.156545413810585,12.859447683193967,19.534186269045804,14.56695077764422,17.750889791211108,18.274719932313268,2.2946741743870325,3.8142328091760147,7.968763452463867,1.7775190777789307,0.3977505372737955,1.4699529741256923,0.25481121596330425,11.825990892299894,12.724380420929604,16.21785756602598,5.213911853502928,9.237574448922032,5.721596306160328,14.44742468447564,6.2345566741868375,10.809657305366347,7.575312540261283,4.059202022827466,18.83442466620363,0.8420436836870193,3.137121201052371,9.185349479285737,0.538248899098468,13.242659013593556,14.951977137793966,10.358384561783108,19.63353477915781,16.81957720232044,10.295937944785422,2.0145050094153794,18.690766446225105,5.404766635837137,5.606650426229192,11.643739816522194,12.340712909943008,12.818134815055817,18.977612134651114,11.78878028202857,17.225800349915335,19.368875472229664,18.6175872236047,14.481228110275337,0.41665484020450005,15.88335086052945,0.47859297654114563,13.8112852741786,2.0203661254428518,18.67343543342383,11.071399673157686,18.860988758887153,4.654920924911612,8.811262518994294,11.019973266148178,12.991694868436507,1.6943949101715061,7.3561655127647985,13.505167795078235,5.359736668461004,18.83937289435217,11.586370144825459,1.8771729971577633,10.979934804334626,4.411461093571951,0.45611571706642984,6.887961351983036,8.400944538249732,12.089779011486366,3.47411039014609,14.572398644156245,11.049663717108423,15.077804659721377,17.407179871790063,19.844058986358423,7.628415105153685,0.2818630467956229,6.364735708446401,3.2111502087139376,2.9582517820852594,12.655392754000223,17.034203279696463,9.688251690103398,17.38340395315431,16.876909883417216,8.187093922831444,14.047928823250203,14.227144563274884,14.50504096960981,11.187296298584975,12.88709580740656,12.109629740633569,19.638591514879643,19.82347611505325,15.171323358909476,8.757446006723146,2.985139114828952,17.84117239935288,8.767380127835889,0.4345558387585946,11.994602333340985,14.389566846235136,17.454613485102634,5.221412226675084,3.0273858369613738,9.90704775018228,19.983966251089903,17.477389997189565,11.086643957156731,4.645110580328264,3.056390925239625,4.979064413739027,17.840383764832136,15.94729869137408,17.366417559739887,4.611966705446653,1.5210228518993274,6.17907654306868,12.578760488444987,1.529325123030496,15.159169099411267,12.238638777996833,8.029061566693262,4.384029344202753,16.19458629127767,13.62903955031317,8.295950234051585,19.23142256008465,3.2912148981329548,15.4816449145481,2.9619896200762375,16.737241785305383,0.2016357530102253,11.815002710998428,12.061699514550446,3.9877852716538698,9.559768481839775,9.525810384721009,5.9651816310682815,7.9138328121124335,12.764766762192856,12.238032371098647,19.37337046332475,6.258527228654187,1.9234997739780235,6.692079451458901,19.677102969110685,3.2318752663202988,6.829294194658018,18.276145528403514,11.095899542949695,15.643193149372294,15.020186564630254,4.5478067507631526,9.026053741352836,4.379687549472475,17.784743686690128,1.0432156499751288,0.1369297653020496,18.35593391153109,6.780518209621307,6.5666200246269035,13.626085715851172,7.344633409506303,14.08450020795756,2.540305446070761,18.332177358996333,17.460107535003107,3.3883957666693743,13.631353488133463,16.078305264849888,15.473737457204265,16.69455743155805,14.766707559870627,8.058958647562173,7.810062679828187,4.220213647505275,1.489635445408437,1.6974481944595832,16.287080576667513,17.305737341362196,2.4901705216459957,11.460494277796304,8.800119100566008,17.681470305234686,17.94052103799317,17.0102273467976,10.408067871901935,2.2491664900037778,12.707419277701092,8.510641624987922,1.7013180135747774,7.231316403980048,3.659124346446885,10.56679244119643,6.902912938742816,0.8642273161943637,19.0138569874042,6.146755935342982,7.55739461570617,17.46523718618626,18.770285984110487,3.066474279304421,12.281491999562775,14.142443863194814,12.193063061652957,7.5216006476568875,9.111798852487713,19.418354951351162,5.04929991205374,3.8058994741121666,2.1633495299953154,0.800383694141229,13.643148351356924,15.917253513222228,12.746404901581375,9.981099764174868,1.0334044002570497,18.708909374914917,8.114939919933558,16.40910907104996,17.253646269672608,3.133202243493356,9.145183197781162,10.710712147100029,4.083831183086497,11.334803007281785,8.183749568157692,18.17823827727318,15.458663181109982,7.097647504461442,5.78085808328392,8.48507190345102,9.37375575957262,7.741016095666646,13.618821204877452,12.86142438706448,12.57590294298376,2.2378291590468002,5.869642519857257,12.09218325262487,9.409674794209586,19.126014691782697,2.752725999136305,5.43180223056464,1.7023733086565285,6.391680382535609,17.4200960983951,18.898300401956305,2.1832800611197234,5.475672264630216,12.47093590580774,17.046576070306166,5.029905715926817,10.514375941977248,0.01673569455498569,5.153171887098917,5.725656903702774,17.27190622894021,19.627551474230348,13.118647066820195,2.6230301344838747,15.385684780363814,10.39700432465322,10.294337466898362,9.455155087107578,19.876202141203485,1.8863795567374808,1.0357957850939137,9.537142509131709,4.060675713112225,18.414299111121505,11.464624981330577,18.255183790304205,7.8459039091258065,8.905225880441861,7.887411755133686,13.379820567022218,13.1875857197896,0.3940343560685555,9.152535488864793,13.464990270518244,17.671195509871154,17.100284912959115,17.17446336613009,6.937893983911327,12.10311387094174,19.714851073896863,17.626883866680345,6.960225928490504,15.083186769248297,18.690786867169898,1.6704854665901037,6.691683320698574,14.012524094233555,0.16318557966388703,4.251344440047564,12.327424753947053,17.19011926334602,18.13656747900508,8.39161998720735,16.807020929782826,5.842213431754755,4.42547022980333,13.673046825028727,6.602763242014391,10.886592361982594,1.9993643209304501,6.809693554635219,4.467792907913273,12.238912424201258,11.627021589602808,11.298570720548376,4.560503664896682,19.188189906206254,7.866581221897095,18.41565441204967,5.137337636348387,7.448024042289703,15.183285303797938,4.430117131218472,6.044439088738445,1.464466348044584,1.8497120871906336,10.838647397390853,6.621537668045496,10.27710529640359,2.882575370471896,4.584983568302712,18.0804684239397,16.841322982055228,4.900558815488458,0.019253114085509004,3.7297120016476404,18.06281847536228,14.562219563464453,9.968456901538008,15.07703254067728,8.17094745816247,4.575727040754032,5.158860630909006,19.52365969417942,15.143345609101786,8.244601803474389,19.396304376898442,1.2031757276534938,7.747465120779955,6.748481442694461,11.130843435210478,16.24313648986817,15.247954399479312,15.438564903307284,15.518663268943605,7.958946717178219,18.40419856937737,9.214121195417825,1.2742246494875165,1.9812657019362634,0.7342788369081088,4.593973343233491,14.753159176569785,13.842022879070871,3.3870121785623075,1.7908887285205166,2.601854257759908,3.793474312409888,11.127427691655347,3.223308235960949,12.003298685536938,7.149938869297272,6.100029721368827,19.24272403312306,5.641976486429852,15.211627515866839,18.739941060855863,9.632425802159545,1.0540877594447595,1.759424134033587,18.875947548835047,0.8768780990778335,8.149632970438404,3.8373573109268966,2.318903669872374,12.473525364663093,12.149027577798677,8.217359727973994,17.586162184746836,15.619059984427231,16.533802040755333,6.6979978425467745,16.60910894636435,10.386867490285066,16.298539101953683,6.253968917878665,5.99893599589596,11.997731984740518,8.546314808282851,16.681954136190917,11.666619993764296],"p":[0.40752468133208253,0.9570201086086894,0.39030237150955815,0.45642919457156395,0.4328320353506989,0.9535234321331703,0.7373925019212539,0.8419041244575702,0.5513871769057728,0.8607755185654888,0.5891249674804029,0.4881464729175271,0.9129502342951128,0.22781260057263464,0.3768107698115679,0.5357994702552697,0.28458952953070304,0.34772421901419204,0.0890816454933756,0.41507286449256453,0.1730172901655489,0.8327424052287433,0.23383147342965405,0.9395820643285486,0.5492442891652145,0.9062242029599925,0.6434523134956018,0.9510163730515544,0.9598021382176005,0.7712087547692856,0.47970873032011085,0.4021044679999499,0.7310862872264201,0.38189152991661146,0.6580409719310087,0.007597750338466769,0.3595030090416116,0.8557561277329544,0.1822206918773952,0.3634185914251271,0.9580423936396592,0.09987020651079126,0.3637177890740779,0.9676933522568685,0.6648944499670151,0.09122501127536364,0.4247120669347435,0.8091969905793119,0.10619191258141569,0.13907270998209054,0.17834625444985774,0.0025556881015491584,0.8278448422512603,0.45234024108542004,0.36911049024976506,0.8200121820342101,0.27973464723389174,0.28726933511019537,0.9654596317276811,0.3970857969820689,0.11668705420793746,0.603105296796212,0.2264299683260873,0.27143388593593487,0.8937008160842796,0.821924164238039,0.3089305065957417,0.8283442449763498,0.6935727868326753,0.960097875712288,0.32211053197642814,0.8183091887951388,0.714820547646166,0.4129642371242661,0.7411102683568926,0.4187018454858549,0.22714880259346115,0.5450948348759439,0.15212731847857475,0.8804211728622433,0.7866176711723403,0.022731203587145865,0.04520392038658305,0.4349020261848122,0.06586036818323526,0.2835688142569712,0.6838660440876267,0.38915859438249045,0.16594308497923538,0.31129998240769763,0.6416997309512151,0.04129000888501699,0.27248382557379003,0.2831450974393481,0.9594606107789103,0.8959175621279485,0.24670007534488247,0.08340231752557092,0.14273305352432408,0.30178097847087093,0.16152295136689832,0.7346782415500903,0.6975747756367121,0.5735672167533028,0.9161335108677966,0.040326271072698816,0.9269754976072526,0.6305941893231191,0.6360177439987043,0.2111832221750023,0.9021725075189035,0.024705388980881038,0.7744651468434036,0.7537997496769158,0.6026778190561688,0.6895908770714487,0.49374816846560443,0.39119038847058096,0.19427295055286042,0.13044049570731842,0.8419081179568706,0.7112871836269574,0.9100662164409679,0.9460689760516316,0.17164162005936334,0.4203606318681514,0.00231167900643392,0.10616429132369976,0.8861032953697823,0.6995372148300201,0.40733634976085464,0.22933052368414808,0.5609648210318223,0.8150410029880251,0.9826938953334299,0.18117542903844464,0.7503814383838032,0.29055926059485726,0.838773263018127,0.44728853823964587,0.8519033561224847,0.3221219820110799,0.10315956616463962,0.08191033033579975,0.44468206373341457,0.31312435899874846,0.4794163958093087,0.13547598048664655,0.237604969057172,0.11960108578781226,0.12763246182325494,0.2481371112899522,0.6465152713472295,0.5472204576288586,0.5275533197957176,0.30339738820936835,0.8949060456793034,0.1344728007948106,0.17872227661870865,0.5602210545703252,0.8980624372065369,0.9283298869647778,0.07582850101272198,0.6682560401639934,0.7136642718131394,0.8948407753096155,0.1538263926599348,0.4039353916022326,0.164534114228148,0.9121325312552298,0.46157007333248745,0.44783091273620435,0.004023242215816625,0.11841146809244907,0.253662295263968,0.6289246815542182,0.21530879446955442,0.6231412980407443,0.10074399606755602,0.7739168105457743,0.5371747808361449,0.05040174163347122,0.05733559150218248,0.21324430591626675,0.8245142577948719,0.18575795627146396,0.2808363476600786,0.9610294670239472,0.7516854839587936,0.3650673518515808,0.43453529197933505,0.1522766691866242,0.9624741547374633,0.42636419600162045,0.7714341274943963,0.5689101234412919,0.18068867325056837,0.7320269758595945,0.29397197776391915,0.0939846333161205,0.7291800584110266,0.9170217322636658,0.41185530138771465,0.8602173006285734,0.2847969988284458,0.14013133045645776,0.3504657459227625,0.9464631220385371,0.16874832196124534,0.31229355980077544,0.6856488389439968,0.8681975828978012,0.7194058900818034,0.14405465030517783,0.09220139255839,0.9921123182550096,0.9265167706522508,0.35039232373865836,0.7864378311036064,0.8019998770832271,0.34784201847331087,0.8144767259863817,0.7289825524061764,0.17707685575843657,0.5313033885007228,0.43578590279688934,0.6042398744172155,0.591924431475428,0.01852188484546957,0.695489636467973,0.5549836914220103,0.15875996956245841,0.9761941724617218,0.7388082002120597,0.3388884453046992,0.7166630361149133,0.776444481388225,0.19040500421445516,0.20926048300997246,0.8114324569580473,0.22829634023524514,0.7559627992268432,0.6992025806631099,0.9446190710538698,0.8099197937282014,0.29102719246468745,0.7491437805373764,0.07695972227274872,0.6535910198514949,0.9036455117960533,0.497072953355276,0.05607978165769767,0.9219703630146208,0.18109290895148789,0.2605354323212441,0.4322427645083371,0.8132097397596056,0.7397132658009016,0.42489673326115707,0.12729890065306226,0.2678029082371045,0.9688322301639138,0.6193062802425673,0.46764141322787944,0.127305317491196,0.5584233113825214,0.6457130170846765,0.3635318866177981,0.9610308951194744,0.3087629911058225,0.5610584851856137,0.19770235972012884,0.04242441802744312,0.8486071649239839,0.25065744982105675,0.8928918618872526,0.3724634750406195,0.044911929586824106,0.28592074446717564,0.1239438321724402,0.39899853492980486,0.5404641446329055,0.01377208186509482,0.2549287471493398,0.9738910550528213,0.9842160449262867,0.13968601880044562,0.03644949813192877,0.0718828068881614,0.17881334014658568,0.5890316530130968,0.029302859677333926,0.023659293487763744,0.19289467789635162,0.8168449184320463,0.4470868553268288,0.2423106961344803,0.6969263741803631,0.0408726316103698,0.5946029628237068,0.7135613269207342,0.5903394923751919,0.16616573851972638,0.36573044894744,0.6873750143973807,0.799449663828435,0.8980217868941445,0.11592124242979573,0.01943365107688444,0.39920454827686846,0.21878711787811933,0.46738850141044774,0.5446822631198192,0.19317904557290988,0.6168659946359247,0.8817267899566459,0.08218167040139757,0.698293993528037,0.9232859819908847,0.4737028858578798,0.771811458424815,0.690914353106397,0.366267385338491,0.7199522780779783,0.6038622147191461,0.3162010231333241,0.503474270922754,0.21715763311163272,0.7874045495564568,0.6564392496095808,0.4642960677921575,0.06370215426460812,0.5424165228083422,0.3923633100102635,0.18128760696095458,0.18004834423958904,0.001277082360717774,0.6651560984400036,0.5553469037995056,0.6526305222168307,0.35519367544093083,0.12472823173588488,0.25718952239627657,0.15513567047069676,0.11616080912412086,0.3329237669223577,0.9910403365993437,0.47128019303725566,0.3244531507977588,0.5297229895163091,0.33723817689192637,0.5280556191788468,0.24994977733473367,0.06207819194855113,0.5388100853250031,0.9817877007601463,0.676872031800158,0.8589103009013976,0.8312895480014058,0.5994441303267406,0.41008412378218617,0.5263630547597893,0.6861966772550805,0.8947624666421188,0.832342977523221,0.3158071907367075,0.15145392882353992,0.9962082956955014,0.9413783053079001,0.9636287102070304,0.6771941008827036,0.9576455933578736,0.6395030325466753,0.42008378794207624,0.6339979997433187,0.20125412522277464,0.08602703872123252,0.9608524792263076,0.41017174962522907,0.7397631032036394,0.6748407425686769,0.7405568347122202,0.23837577479462024,0.5624871106265328,0.5592763616657852,0.04097998411752135,0.6067346562334266,0.019937343098755278,0.558373366434977,0.4434401034590387,0.26277675143931956,0.6371432487808433,0.9632010243400355,0.5564276706395521,0.6966360078954126,0.753946104691366,0.8972804010865294,0.9508740373930129,0.5287761523835783,0.3324206311713509,0.15170553602153847,0.5939009084000173,0.37775009108945934,0.05657909136275685,0.039127901479113714,0.01017761903342107,0.46785230361272445,0.43477093310870063,0.664863153017399,0.8267345622713334,0.41559351720078963,0.23704780665619674,0.21659038730018643,0.6708170126687798,0.25187018098829483,0.5238157443236982,0.04489098575930939,0.9953734167631878,0.9428842852251047,0.5763286773368692,0.16232207511156083,0.4353673996592504,0.6898931250647022,0.5447261563468,0.72920156443092,0.136872817563918,0.5147533030439413,0.8130063709326354,0.8753225622514205,0.36731714310026065,0.4801154177559128,0.33935448716874883,0.33561026599032506,0.31181342690639346,0.43891149890394376,0.7066134081423197,0.30213269161651013,0.7242614419861513,0.16185808596150686,0.8498886910779628,0.5253846754374405,0.2841319902720165,0.29173238382016486,0.038748270051836675,0.4945534385247474,0.9378895034765387,0.5925748320572979,0.8960228497385294,0.9175057308461898,0.9163253296309095,0.014256543569858726,0.7821513167027421,0.37911301040757395,0.5990073431641378,0.14969845619898026,0.12233892057304874,0.6730763749383113,0.9543953294089993,0.17347825700145836,0.9187247601417057,0.9165712700710449,0.03961230828225304,0.0664727495441706,0.34712153758633635,0.6168603555788432,0.855808281296691,0.1128895420793723,0.13498500486186304,0.6731046984196891,0.20684779883762383,0.09107008701082675,0.517257496329925,0.6381203459236133,0.3403335436080699,0.7599715943333489,0.012370466496562482,0.8002605013296966,0.029686116264611595,0.14852389726921889,0.14980896112789965,0.942180549505873,0.40607315524577015,0.28895507754263705,0.6546675185903581,0.25459424563932487,0.6515409704407791,0.6630881339913175,0.20850969980918332,0.6526965810417393,0.9082225309922223,0.4055257446689251,0.31991830330544935,0.5811902368455484,0.828371132618084,0.07476230353296898,0.9684128885557561,0.9168221864621804,0.268197712604215,0.8226551861960194,0.4048462730342699,0.05168985321963748,0.360030747671251,0.3694130209056905,0.1807547364783244,0.8940055784195315,0.8116360866038539,0.8035037759314883,0.02321943636170465,0.47042017439740147,0.5081557545392397,0.009505907318055229,0.7704344204300428,0.6104181224794627,0.26429477191055595,0.16492942482348782,0.16524180048302606,0.7956074941003366,0.5308198453567978,0.1641840155425247,0.970801049761292,0.42297520096678487,0.2527890789197613,0.16427680801612055,0.5710013530996507,0.8860602694594111,0.20726186588515394,0.5160198049722384,0.9384837983322294,0.835041581178608,0.19618960788875017,0.5614256463668226,0.3402504697151467,0.6063347982917753,0.7181176948913244,0.4541836954813825,0.7674194352030739,0.4832455750126621,0.9963030614937629,0.9917186257332165,0.029389653193383047,0.714606315268423,0.8211367496830344,0.5927325866870061,0.29645050020228925,0.6767333608061892,0.9707906625136498,0.8264819963130974,0.43752638237928765,0.7967090574125986,0.16073110527256396,0.6875835854590551,0.5181725323708375,0.6153455916132335,0.23849364233706583,0.11771629245460646,0.6319823083846796,0.6322710306514114,0.582434165113811,0.8605647141910036,0.40192083185902017,0.3719932810683313,0.3337921567381772,0.22891284175469995,0.14216612700537667,0.4847023564819637,0.7808035024476963,0.3154634762969917,0.9204878413527284,0.2599542983233689,0.022284205391531753,0.27538845192949846,0.27861495986366025,0.27765391478795753,0.32810492355187315,0.6578490368777672,0.17443371448289935,0.33703384632335265,0.1788181254401835,0.9574361036720709,0.583158672508099,0.11504622452783964,0.4597399781891591,0.11465722712326265,0.9518052674353763,0.5865798022978725,0.6306048340399497,0.052953369229057135,0.49653283980873963,0.47864580688998304,0.10859989485361643,0.46806423210918346,0.6645876502423502,0.1158966866535156,0.8816802785458084,0.46820965021094674,0.7324343835484932,0.38119226208685664,0.3772053192881295,0.45301350555831466,0.5147162650195642,0.45623149254959405,0.01712282780810903,0.0283960141018873,0.8973547334218344,0.15744577065453114,0.41449999130609516,0.2574765914913446,0.03023479596226708,0.33853969035812126,0.6710382763251885,0.5794737170266377,0.9919154646913848,0.776996169223944,0.260314184515257,0.656986811035557,0.8784036703983436,0.6311992074825521,0.8519437706436732,0.4584463853471572,0.18062795097031636,0.5127936907725319,0.5288736631495168,0.2922664570031608,0.6828593237420832,0.35475853396009405,0.7572591908581596,0.7860434842626471,0.4237328562548519,0.19456828487097333,0.7938265432363232,0.20664614844623053,0.6206875917783619,0.860127573541281,0.11347954133313487,0.7652047143108669,0.0002656319849123623,0.5676782436702132,0.9111991486358837,0.5741349808262406,0.7739823507533199,0.14237193379758062,0.8914346504634472,0.23118502827537823,0.13164931922231737,0.4520402800014349,0.48985340406739897,0.3611616620199676,0.7701520735219451,0.9063533501240777,0.10755342487131991,0.021746242178211084,0.9915275525571339,0.9848508731871455,0.47535091604421575,0.3344033600951626,0.20698584346667226,0.18753093335944282,0.8249344602230393,0.08114845662450954,0.22504021243459782,0.3940922283009449,0.9334440729466664,0.18207277483037854,0.9802176503872033,0.4634464739591271,0.509682641541108,0.9507037873706947,0.26418397664639337,0.3114769499902641,0.4607869256795909,0.08815580845184434,0.05288568002456473,0.4447145844375888,0.0791589385735374,0.12558050342906402,0.14797972802748594,0.5090819442685761,0.9724148493047644,0.42309431738610837,0.7629952756399188,0.8168046307666215,0.17407534621293141,0.26703879302321787,0.3510078541224324,0.6567904895596055,0.26631280655188494,0.3542254847067501,0.18100257611681436,0.42289064605476745,0.9310617601745055,0.6910125906638187,0.45639493264595044,0.2939286425987193,0.6022314908795552,0.46702237849520256,0.9508621141056244,0.7824072045335939,0.007623685296322291,0.09546129512011214,0.0963529573524029,0.07482396165618677,0.2655917503868317,0.16674198954843744,0.6226163387554924,0.49654017114180804,0.021363904232870157,0.9234095810886618,0.7374495668063874,0.20883888166358844,0.6498250036829052,0.3706047452264327,0.5641013844361542,0.9774710478663906,0.8953687469352605,0.5137291617768907,0.38883993562180197,0.46374157458211074,0.6280943955956093,0.7195761033604002,0.11124822438863635,0.7527765190837477,0.03185216361551069,0.5007838689825568,0.06989550757628549,0.18107600986003192,0.29911275880110133,0.11845961725434373,0.42896243185167915,0.08948806681403587,0.681462021839579,0.8674890769496264,0.0048527022376512186,0.037623910988364706,0.3427803026647773,0.4026770054919895,0.9236696855106159,0.15506745683343715,0.8020698729579625,0.3905568828222066,0.10958351743393391,0.9906250580511851,0.48009530406280776,0.702707170969296,0.28789178243148883,0.980118425464374,0.7433526683579648,0.6691390616907666,0.592542755543142,0.38016449765773674,0.7392779428497755,0.9832686769641532,0.1379529996988258,0.05179529996336907,0.9183752445614859,0.6067312435127898,0.3026974784825496,0.6495078075991962,0.3444758809882371,0.31283506672864236,0.14247226631523202,0.5910377362170087,0.8715293652099401,0.8977625673305913,0.018136262472794318,0.33195118967764037,0.7451963832008823,0.24752164573490743,0.10588535118274733,0.9777875252123489,0.39131987199165863,0.5359255709638644,0.5901751458275282,0.7368522304323832,0.9578633219529409,0.21028507685244002,0.5973077216366682,0.05525840631359369,0.7232072149363504,0.9634342912357967,0.9325508242846539,0.8487924444095505,0.43537032984392887,0.64083433843934,0.052570671983311,0.8896973978329377,0.304618566940803,0.7773302602856653,0.9818004662445579,0.023961937075907436,0.07993491505146877,0.5047716602160868,0.3298239187318923,0.29705112206353324,0.4320714713928584,0.5931921973263874,0.5521559562357654,0.9138664955745102,0.21248126179899351,0.44196954979423286,0.29561891168994925,0.3124469528804066,0.6722947288716674,0.6841509843598219,0.5876806103333143,0.08892417981361067,0.8857759863330459,0.6189273915027462,0.6027599649900863,0.42561837386766155,0.10948532421163892,0.0609707004244453,0.14595237543624928,0.1360903846199344,0.9873477347626498,0.3223393568723023,0.4867282882823707,0.967075254364683,0.22273124940193223,0.6072532354380318,0.3116093337007264,0.8543561953349939,0.34770228598574904,0.13049368856721255,0.15557415070016445,0.13488979319049355,0.0707873669596828,0.031063632110548856,0.8362206540049224,0.24448504890699763,0.8353654194480133,0.35457229699047144,0.9284295598378687,0.9747435191769978,0.39942834769039837,0.7273367127246346,0.7535709940314799,0.7114759734578413,0.8157722233275839,0.84040329455555,0.8311802998228939,0.7828458868043582,0.04326554124606785,0.5860101242115665,0.3435548915347777,0.7931064281860831,0.3336797811691321,0.6038912797584377,0.3911139723542212,0.7158905649312708,0.5743721895680753,0.9934552922183786,0.5770720969785788,0.18455688601387332,0.04893643429213923,0.5524671884749917,0.47836150761619467,0.8963302893795146,0.609309686825948,0.9883819178872255,0.7182112812390073,0.34029528574098333,0.9355221950338153,0.3579351106971389,0.7743722262415946,0.9443472219301374,0.12745037518737412,0.7138562526575469,0.691718953140517,0.4337109458559829,0.3759564615642388,0.8439473433672227,0.18374586915699287,0.4437166171341913,0.02259271108341876,0.8044045626786709,0.7789130453011697,0.7095162581074435,0.6554657416452565,0.20059274481029798,0.8177652061985863,0.5806717533456807,0.043500792918616416,0.6845496961500326,0.6017563642852675,0.8772265002695294,0.10163077127899878,0.6221232627047313,0.33782989558531296,0.8920931096073585,0.7134543039948049,0.5736955556359651,0.12266194192394386,0.15171697987156296,0.40325939690184187,0.2713975055911384,0.41935103917223593,0.34972461169466285,0.5662462245380264,0.5071550037134005,0.020978127118697953,0.4731783429428842,0.33806718151268034,0.7881110055331935,0.45378194615616496,0.8197974681117464,0.5044629529741644,0.7924554141998477,0.28145286468598174,0.5776095537939383,0.8823663777344251,0.5260069880812084,0.8497716461026186,0.14403311694787146,0.8403751444841274,0.1517582161320885,0.5931012993671894,0.8087662904142487,0.3144690978924767,0.13558336440947327,0.48426888724667894,0.2741508379442381,0.19872647301187096,0.5074477688888488,0.20761446917802995,0.5976522616436246,0.08689316819911297,0.5476624182341712,0.7097988583575356,0.1591736924567151,0.6367064397100304,0.14378734570083118,0.4497123643837546,0.2767372957401477,0.3718534769462525,0.6116423837538418,0.23476340886741287,0.05366934019559566,0.45986718883765065,0.6022915524632699,0.9416621135272054,0.6186515700807751,0.651653741238559,0.572377985932748,0.9435590382124175,0.05363939982564969,0.9224328067779004,0.2554879655637641,0.3335852179711474,0.8381217097574285,0.9233023128444084,0.47688702287513696,0.6231312372408051,0.7653227256735895,0.6684391084088734,0.37716504185040534,0.42466431513790037,0.12655857145308613,0.701962819820726,0.4278410671890449,0.5838713189261118,0.035612797629956505,0.02467667948199148,0.5911156833924123,0.6766029804751481,0.9709761449037095,0.5288344730336512,0.8791326442999641,0.8541112687192967,0.5111802368561074,0.8830072515384453,0.4529683829158817,0.8740718580894455,0.06822448339863696,0.538781068114615,0.7563557164840033,0.11144168076531069,0.39993965580371493,0.5405191094898043,0.783885166032126,0.6133617033717291,0.6378693829737878,0.4855497204969925,0.6296922017200992,0.4696533167343453,0.6059385157684514,0.5597952401591431,0.3121111473296161,0.6696870544366229,0.3436030694483023,0.9598858859408623,0.49891851517675434,0.5741667358994933,0.04980969615346753,0.44440360381745436,0.07278015079271039,0.34047672276120156,0.8415210966768945,0.24925098453046401,0.1899062578086934,0.33528420119599267]}
},{}],112:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `x0` and `gamma`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `gamma`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, -1.0 );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, 0.0 );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given parameters `x0` and `gamma` (large `gamma`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var gamma;
	var tol;
	var x0;
	var p;
	var y;
	var i;

	/*
	* Higher tolerance than EPS because Julia gives slightly different results for
	* |x| ~<= 3*pi/4:
	*
	* Example 1:
	* x = -1.35646279095478;
	* Julia (tan):  -4.593961172862999
	* stdlib (tan): -4.593961172863
	* Mathematica:  -4.59396117286300026311049650877442413097818001966176559315
	*
	* Example 2:
	* x = 1.4710248292410089
	* Julia (tan):  9.989623320530624
	* stdlib (tan): 9.989623320530626
	* Mathematica:  9.989623320530629158499137574831736702146195199133529403233
	*
	* Example 3:
	* x = 1.528545878614728
	* Julia (tan):  23.654302824341386
	* stdlib (tan): 23.65430282434139
	* Mathematica:  23.65430282434144042648214719732782590575979471046811610915...
	*/

	expected = largeGamma.expected;
	p = largeGamma.p;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( x0[i], gamma[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var gamma;
	var tol;
	var x0;
	var p;
	var y;
	var i;

	expected = positiveMedian.expected;
	p = positiveMedian.p;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( x0[i], gamma[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 125.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var gamma;
	var tol;
	var x0;
	var p;
	var y;
	var i;

	expected = negativeMedian.expected;
	p = negativeMedian.p;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( x0[i], gamma[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/quantile/test/test.factory.js")
},{"./../lib/factory.js":106,"./fixtures/julia/large_gamma.json":109,"./fixtures/julia/negative_median.json":110,"./fixtures/julia/positive_median.json":111,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":247}],113:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/quantile/test/test.js")
},{"./../lib":107,"tape":247}],114:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var quantile = require( './../lib' );


// FIXTURES //

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a finite `x0` and `gamma`, the function returns `NaN`', function test( t ) {
	var y = quantile( PINF, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( PINF, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a nonpositive `gamma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = quantile( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile function at `p` given `x0` and `gamma` ( large `gamma`)', function test( t ) {
	var expected;
	var gamma;
	var delta;
	var tol;
	var x0;
	var p;
	var y;
	var i;

	/*
	* Higher tolerance than EPS because Julia gives slightly different results for
	* |x| ~<= 3*pi/4:
	*
	* Example 1:
	* x = -1.35646279095478;
	* Julia (tan):  -4.593961172862999
	* stdlib (tan): -4.593961172863
	* Mathematica:  -4.59396117286300026311049650877442413097818001966176559315
	*
	* Example 2:
	* x = 1.4710248292410089
	* Julia (tan):  9.989623320530624
	* stdlib (tan): 9.989623320530626
	* Mathematica:  9.989623320530629158499137574831736702146195199133529403233
	*
	* Example 3:
	* x = 1.528545878614728
	* Julia (tan):  23.654302824341386
	* stdlib (tan): 23.65430282434139
	* Mathematica:  23.65430282434144042648214719732782590575979471046811610915...
	*/

	expected = largeGamma.expected;
	p = largeGamma.p;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var p;
	var y;
	var i;

	expected = positiveMedian.expected;
	p = positiveMedian.p;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 125.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var p;
	var y;
	var i;

	expected = negativeMedian.expected;
	p = negativeMedian.p;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/quantile/test/test.quantile.js")
},{"./../lib":107,"./fixtures/julia/large_gamma.json":109,"./fixtures/julia/negative_median.json":110,"./fixtures/julia/positive_median.json":111,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":247}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( './is_number.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var abs = Math.abs; // eslint-disable-line stdlib/no-builtin-math
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;
var replace = String.prototype.replace;


// VARIABLES //

var RE_EXP_POS_DIGITS = /e\+(\d)$/;
var RE_EXP_NEG_DIGITS = /e-(\d)$/;
var RE_ONLY_DIGITS = /^(\d+)$/;
var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
var RE_TRAILING_PERIOD_ZERO = /\.0$/;
var RE_PERIOD_ZERO_EXP = /\.0*e/;
var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;


// MAIN //

/**
* Formats a token object argument as a floating-point number.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid floating-point number
* @returns {string} formatted token argument
*/
function formatDouble( token ) {
	var digits;
	var out;
	var f = parseFloat( token.arg );
	if ( !isFinite( f ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( token.arg ) ) {
			throw new Error( 'invalid floating-point number. Value: ' + out );
		}
		// Case: NaN, Infinity, or -Infinity
		f = token.arg;
	}
	switch ( token.specifier ) {
	case 'e':
	case 'E':
		out = f.toExponential( token.precision );
		break;
	case 'f':
	case 'F':
		out = f.toFixed( token.precision );
		break;
	case 'g':
	case 'G':
		if ( abs( f ) < 0.0001 ) {
			digits = token.precision;
			if ( digits > 0 ) {
				digits -= 1;
			}
			out = f.toExponential( digits );
		} else {
			out = f.toPrecision( token.precision );
		}
		if ( !token.alternate ) {
			out = replace.call( out, RE_ZERO_BEFORE_EXP, '$1e' );
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
			out = replace.call( out, RE_TRAILING_PERIOD_ZERO, '' );
		}
		break;
	default:
		throw new Error( 'invalid double notation. Value: ' + token.specifier );
	}
	out = replace.call( out, RE_EXP_POS_DIGITS, 'e+0$1' );
	out = replace.call( out, RE_EXP_NEG_DIGITS, 'e-0$1' );
	if ( token.alternate ) {
		out = replace.call( out, RE_ONLY_DIGITS, '$1.' );
		out = replace.call( out, RE_DIGITS_BEFORE_EXP, '$1.e' );
	}
	if ( f >= 0 && token.sign ) {
		out = token.sign + out;
	}
	out = ( token.specifier === uppercase.call( token.specifier ) ) ?
		uppercase.call( out ) :
		lowercase.call( out );
	return out;
}


// EXPORTS //

module.exports = formatDouble;

},{"./is_number.js":118}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( './is_number.js' );
var zeroPad = require( './zero_pad.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;


// MAIN //

/**
* Formats a token object argument as an integer.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid integer
* @returns {string} formatted token argument
*/
function formatInteger( token ) {
	var base;
	var out;
	var i;

	switch ( token.specifier ) {
	case 'b':
		// Case: %b (binary)
		base = 2;
		break;
	case 'o':
		// Case: %o (octal)
		base = 8;
		break;
	case 'x':
	case 'X':
		// Case: %x, %X (hexadecimal)
		base = 16;
		break;
	case 'd':
	case 'i':
	case 'u':
	default:
		// Case: %d, %i, %u (decimal)
		base = 10;
		break;
	}
	out = token.arg;
	i = parseInt( out, 10 );
	if ( !isFinite( i ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( out ) ) {
			throw new Error( 'invalid integer. Value: ' + out );
		}
		i = 0;
	}
	if ( i < 0 && ( token.specifier === 'u' || base !== 10 ) ) {
		i = 0xffffffff + i + 1;
	}
	if ( i < 0 ) {
		out = ( -i ).toString( base );
		if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		out = '-' + out;
	} else {
		out = i.toString( base );
		if ( !i && !token.precision ) {
			out = '';
		} else if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		if ( token.sign ) {
			out = token.sign + out;
		}
	}
	if ( base === 16 ) {
		if ( token.alternate ) {
			out = '0x' + out;
		}
		out = ( token.specifier === uppercase.call( token.specifier ) ) ?
			uppercase.call( out ) :
			lowercase.call( out );
	}
	if ( base === 8 ) {
		if ( token.alternate && out.charAt( 0 ) !== '0' ) {
			out = '0' + out;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInteger;

},{"./is_number.js":118,"./zero_pad.js":122}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Generate string from a token array by interpolating values.
*
* @module @stdlib/string/base/format-interpolate
*
* @example
* var formatInterpolate = require( '@stdlib/string/base/format-interpolate' );
*
* var tokens = ['Hello ', { 'specifier': 's' }, '!' ];
* var out = formatInterpolate( tokens, 'World' );
* // returns 'Hello World!'
*/

// MODULES //

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":120}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );  // NOTE: we inline the `isNumber.isPrimitive` function from `@stdlib/assert/is-number` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isNumber;

},{}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' ); // NOTE: we inline the `isString.isPrimitive` function from `@stdlib/assert/is-string` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isString;

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var formatInteger = require( './format_integer.js' );
var isString = require( './is_string.js' );
var formatDouble = require( './format_double.js' );
var spacePad = require( './space_pad.js' );
var zeroPad = require( './zero_pad.js' );


// VARIABLES //

var fromCharCode = String.fromCharCode;
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Initializes token object with properties of supplied format identifier object or default values if not present.
*
* @private
* @param {Object} token - format identifier object
* @returns {Object} token object
*/
function initialize( token ) {
	var out = {};
	out.specifier = token.specifier;
	out.precision = ( token.precision === void 0 ) ? 1 : token.precision;
	out.width = token.width;
	out.flags = token.flags || '';
	out.mapping = token.mapping;
	return out;
}


// MAIN //

/**
* Generates string from a token array by interpolating values.
*
* @param {Array} tokens - string parts and format identifier objects
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be an array
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var tokens = [ 'beep ', { 'specifier': 's' } ];
* var out = formatInterpolate( tokens, 'boop' );
* // returns 'beep boop'
*/
function formatInterpolate( tokens ) {
	var hasPeriod;
	var flags;
	var token;
	var flag;
	var num;
	var out;
	var pos;
	var i;
	var j;

	if ( !isArray( tokens ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array. Value: `' + tokens + '`.' );
	}
	out = '';
	pos = 1;
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isString( token ) ) {
			out += token;
		} else {
			hasPeriod = token.precision !== void 0;
			token = initialize( token );
			if ( !token.specifier ) {
				throw new TypeError( 'invalid argument. Token is missing `specifier` property. Index: `'+ i +'`. Value: `' + token + '`.' );
			}
			if ( token.mapping ) {
				pos = token.mapping;
			}
			flags = token.flags;
			for ( j = 0; j < flags.length; j++ ) {
				flag = flags.charAt( j );
				switch ( flag ) {
				case ' ':
					token.sign = ' ';
					break;
				case '+':
					token.sign = '+';
					break;
				case '-':
					token.padRight = true;
					token.padZeros = false;
					break;
				case '0':
					token.padZeros = flags.indexOf( '-' ) < 0; // NOTE: We use built-in `Array.prototype.indexOf` here instead of `@stdlib/assert/contains` in order to avoid circular dependencies.
					break;
				case '#':
					token.alternate = true;
					break;
				default:
					throw new Error( 'invalid flag: ' + flag );
				}
			}
			if ( token.width === '*' ) {
				token.width = parseInt( arguments[ pos ], 10 );
				pos += 1;
				if ( isnan( token.width ) ) {
					throw new TypeError( 'the argument for * width at position ' + pos + ' is not a number. Value: `' + token.width + '`.' );
				}
				if ( token.width < 0 ) {
					token.padRight = true;
					token.width = -token.width;
				}
			}
			if ( hasPeriod ) {
				if ( token.precision === '*' ) {
					token.precision = parseInt( arguments[ pos ], 10 );
					pos += 1;
					if ( isnan( token.precision ) ) {
						throw new TypeError( 'the argument for * precision at position ' + pos + ' is not a number. Value: `' + token.precision + '`.' );
					}
					if ( token.precision < 0 ) {
						token.precision = 1;
						hasPeriod = false;
					}
				}
			}
			token.arg = arguments[ pos ];
			switch ( token.specifier ) {
			case 'b':
			case 'o':
			case 'x':
			case 'X':
			case 'd':
			case 'i':
			case 'u':
				// Case: %b (binary), %o (octal), %x, %X (hexadecimal), %d, %i (decimal), %u (unsigned decimal)
				if ( hasPeriod ) {
					token.padZeros = false;
				}
				token.arg = formatInteger( token );
				break;
			case 's':
				// Case: %s (string)
				token.maxWidth = ( hasPeriod ) ? token.precision : -1;
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
				}
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
				// Case: %e, %E (scientific notation), %f, %F (decimal floating point), %g, %G (uses the shorter of %e/E or %f/F)
				if ( !hasPeriod ) {
					token.precision = 6;
				}
				token.arg = formatDouble( token );
				break;
			default:
				throw new Error( 'invalid specifier: ' + token.specifier );
			}
			// Fit argument into field width...
			if ( token.maxWidth >= 0 && token.arg.length > token.maxWidth ) {
				token.arg = token.arg.substring( 0, token.maxWidth );
			}
			if ( token.padZeros ) {
				token.arg = zeroPad( token.arg, token.width || token.precision, token.padRight ); // eslint-disable-line max-len
			} else if ( token.width ) {
				token.arg = spacePad( token.arg, token.width, token.padRight );
			}
			out += token.arg || '';
			pos += 1;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInterpolate;

},{"./format_double.js":115,"./format_integer.js":116,"./is_string.js":119,"./space_pad.js":121,"./zero_pad.js":122}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

/**
* Returns `n` spaces.
*
* @private
* @param {number} n - number of spaces
* @returns {string} string of spaces
*/
function spaces( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += ' ';
	}
	return out;
}


// MAIN //

/**
* Pads a token with spaces to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function spacePad( str, width, right ) {
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	str = ( right ) ?
		str + spaces( pad ) :
		spaces( pad ) + str;
	return str;
}


// EXPORTS //

module.exports = spacePad;

},{}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

/**
* Tests if a string starts with a minus sign (`-`).
*
* @private
* @param {string} str - input string
* @returns {boolean} boolean indicating if a string starts with a minus sign (`-`)
*/
function startsWithMinus( str ) {
	return str[ 0 ] === '-';
}

/**
* Returns a string of `n` zeros.
*
* @private
* @param {number} n - number of zeros
* @returns {string} string of zeros
*/
function zeros( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += '0';
	}
	return out;
}


// MAIN //

/**
* Pads a token with zeros to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function zeroPad( str, width, right ) {
	var negative = false;
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	if ( startsWithMinus( str ) ) {
		negative = true;
		str = str.substr( 1 );
	}
	str = ( right ) ?
		str + zeros( pad ) :
		zeros( pad ) + str;
	if ( negative ) {
		str = '-' + str;
	}
	return str;
}


// EXPORTS //

module.exports = zeroPad;

},{}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tokenize a string into an array of string parts and format identifier objects.
*
* @module @stdlib/string/base/format-tokenize
*
* @example
* var formatTokenize = require( '@stdlib/string/base/format-tokenize' );
*
* var str = 'Hello %s!';
* var tokens = formatTokenize( str );
* // returns [ 'Hello ', {...}, '!' ]
*/

// MODULES //

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":124}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// VARIABLES //

var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;


// FUNCTIONS //

/**
* Parses a delimiter.
*
* @private
* @param {Array} match - regular expression match
* @returns {Object} delimiter token object
*/
function parse( match ) {
	var token = {
		'mapping': ( match[ 1 ] ) ? parseInt( match[ 1 ], 10 ) : void 0,
		'flags': match[ 2 ],
		'width': match[ 3 ],
		'precision': match[ 5 ],
		'specifier': match[ 6 ]
	};
	if ( match[ 4 ] === '.' && match[ 5 ] === void 0 ) {
		token.precision = '1';
	}
	return token;
}


// MAIN //

/**
* Tokenizes a string into an array of string parts and format identifier objects.
*
* @param {string} str - input string
* @returns {Array} tokens
*
* @example
* var tokens = formatTokenize( 'Hello %s!' );
* // returns [ 'Hello ', {...}, '!' ]
*/
function formatTokenize( str ) {
	var content;
	var tokens;
	var match;
	var prev;

	tokens = [];
	prev = 0;
	match = RE.exec( str );
	while ( match ) {
		content = str.slice( prev, RE.lastIndex - match[ 0 ].length );
		if ( content.length ) {
			tokens.push( content );
		}
		tokens.push( parse( match ) );
		prev = RE.lastIndex;
		match = RE.exec( str );
	}
	content = str.slice( prev );
	if ( content.length ) {
		tokens.push( content );
	}
	return tokens;
}


// EXPORTS //

module.exports = formatTokenize;

},{}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Insert supplied variable values into a format string.
*
* @module @stdlib/string/format
*
* @example
* var format = require( '@stdlib/string/format' );
*
* var out = format( '%s %s!', 'Hello', 'World' );
* // returns 'Hello World!'
*
* out = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/

// MODULES //

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":127}],126:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"dup":119}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var interpolate = require( '@stdlib/string/base/format-interpolate' );
var tokenize = require( '@stdlib/string/base/format-tokenize' );
var isString = require( './is_string.js' );


// MAIN //

/**
* Inserts supplied variable values into a format string.
*
* @param {string} str - input string
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be a string
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var str = format( 'Hello %s!', 'world' );
* // returns 'Hello world!'
*
* @example
* var str = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/
function format( str ) {
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":126,"@stdlib/string/base/format-interpolate":117,"@stdlib/string/base/format-tokenize":123}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @private
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

},{}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":128}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-only property.
*
* @module @stdlib/utils/define-nonenumerable-read-only-property
*
* @example
* var setNonEnumerableReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
*
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"./main.js":131}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"@stdlib/utils/define-property":135}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @name defineProperty
* @type {Function}
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
var defineProperty = Object.defineProperty;


// EXPORTS //

module.exports = defineProperty;

},{}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @private
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":133}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define (or modify) an object property.
*
* @module @stdlib/utils/define-property
*
* @example
* var defineProperty = require( '@stdlib/utils/define-property' );
*
* var obj = {};
* defineProperty( obj, 'foo', {
*     'value': 'bar',
*     'writable': false,
*     'configurable': false,
*     'enumerable': false
* });
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var hasDefinePropertySupport = require( './has_define_property_support.js' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var defineProperty;
if ( hasDefinePropertySupport() ) {
	defineProperty = builtin;
} else {
	defineProperty = polyfill;
}


// EXPORTS //

module.exports = defineProperty;

},{"./builtin.js":132,"./has_define_property_support.js":134,"./polyfill.js":136}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle, no-proto */

'use strict';

// MODULES //

var format = require( '@stdlib/string/format' );


// VARIABLES //

var objectProtoype = Object.prototype;
var toStr = objectProtoype.toString;
var defineGetter = objectProtoype.__defineGetter__;
var defineSetter = objectProtoype.__defineSetter__;
var lookupGetter = objectProtoype.__lookupGetter__;
var lookupSetter = objectProtoype.__lookupSetter__;


// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
function defineProperty( obj, prop, descriptor ) {
	var prototype;
	var hasValue;
	var hasGet;
	var hasSet;

	if ( typeof obj !== 'object' || obj === null || toStr.call( obj ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. Property descriptor must be an object. Value: `%s`.', descriptor ) );
	}
	hasValue = ( 'value' in descriptor );
	if ( hasValue ) {
		if (
			lookupGetter.call( obj, prop ) ||
			lookupSetter.call( obj, prop )
		) {
			// Override `__proto__` to avoid touching inherited accessors:
			prototype = obj.__proto__;
			obj.__proto__ = objectProtoype;

			// Delete property as existing getters/setters prevent assigning value to specified property:
			delete obj[ prop ];
			obj[ prop ] = descriptor.value;

			// Restore original prototype:
			obj.__proto__ = prototype;
		} else {
			obj[ prop ] = descriptor.value;
		}
	}
	hasGet = ( 'get' in descriptor );
	hasSet = ( 'set' in descriptor );

	if ( hasValue && ( hasGet || hasSet ) ) {
		throw new Error( 'invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.' );
	}

	if ( hasGet && defineGetter ) {
		defineGetter.call( obj, prop, descriptor.get );
	}
	if ( hasSet && defineSetter ) {
		defineSetter.call( obj, prop, descriptor.set );
	}
	return obj;
}


// EXPORTS //

module.exports = defineProperty;

},{"@stdlib/string/format":125}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":138,"./polyfill.js":139,"@stdlib/assert/has-tostringtag-support":24}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":140}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":140,"./tostringtag.js":141,"@stdlib/assert/has-own-property":20}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],142:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],143:[function(require,module,exports){

},{}],144:[function(require,module,exports){
arguments[4][143][0].apply(exports,arguments)
},{"dup":143}],145:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":142,"buffer":145,"ieee754":233}],146:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],147:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":239}],148:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":146,"inherits":234,"readable-stream/lib/_stream_duplex.js":150,"readable-stream/lib/_stream_passthrough.js":151,"readable-stream/lib/_stream_readable.js":152,"readable-stream/lib/_stream_transform.js":153,"readable-stream/lib/_stream_writable.js":154,"readable-stream/lib/internal/streams/end-of-stream.js":158,"readable-stream/lib/internal/streams/pipeline.js":160}],149:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],150:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":152,"./_stream_writable":154,"_process":239,"inherits":234}],151:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":153,"inherits":234}],152:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":149,"./_stream_duplex":150,"./internal/streams/async_iterator":155,"./internal/streams/buffer_list":156,"./internal/streams/destroy":157,"./internal/streams/from":159,"./internal/streams/state":161,"./internal/streams/stream":162,"_process":239,"buffer":145,"events":146,"inherits":234,"string_decoder/":246,"util":143}],153:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":149,"./_stream_duplex":150,"inherits":234}],154:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":149,"./_stream_duplex":150,"./internal/streams/destroy":157,"./internal/streams/state":161,"./internal/streams/stream":162,"_process":239,"buffer":145,"inherits":234,"util-deprecate":255}],155:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":158,"_process":239}],156:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":145,"util":143}],157:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":239}],158:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":149}],159:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],160:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":149,"./end-of-stream":158}],161:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":149}],162:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":146}],163:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":164,"get-intrinsic":228}],164:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":227,"get-intrinsic":228}],165:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":166,"./lib/keys.js":167}],166:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],167:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],168:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = require('has-property-descriptors')();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"has-property-descriptors":229,"object-keys":237}],169:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],170:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.3

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

},{"./ToNumber":200,"./ToPrimitive":202,"./Type":207}],171:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

},{"../helpers/isFinite":216,"../helpers/isNaN":218,"../helpers/isPrefixOf":219,"./ToNumber":200,"./ToPrimitive":202,"./Type":207,"get-intrinsic":228}],172:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

},{"get-intrinsic":228}],173:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

},{"./DayWithinYear":176,"./InLeapYear":180,"./MonthFromTime":190,"get-intrinsic":228}],174:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":223,"./floor":211}],175:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":211}],176:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":174,"./DayFromYear":175,"./YearFromTime":209}],177:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

},{"./modulo":212}],178:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsDataDescriptor(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/assertRecord":215,"./IsAccessorDescriptor":181,"./IsDataDescriptor":183,"./Type":207,"get-intrinsic":228}],179:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

},{"../helpers/timeConstants":223,"./floor":211,"./modulo":212}],180:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

},{"./DaysInYear":177,"./YearFromTime":209,"get-intrinsic":228}],181:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":215,"./Type":207,"has":232}],182:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":235}],183:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":215,"./Type":207,"has":232}],184:[function(require,module,exports){
'use strict';

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"../helpers/assertRecord":215,"./IsAccessorDescriptor":181,"./IsDataDescriptor":183,"./Type":207}],185:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

},{"../helpers/isPropertyDescriptor":220,"./IsAccessorDescriptor":181,"./IsDataDescriptor":183,"./Type":207}],186:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

},{"../helpers/isFinite":216,"../helpers/timeConstants":223}],187:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

},{"../helpers/isFinite":216,"./DateFromTime":173,"./Day":174,"./MonthFromTime":190,"./ToInteger":199,"./YearFromTime":209,"./floor":211,"./modulo":212,"get-intrinsic":228}],188:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

},{"../helpers/isFinite":216,"../helpers/timeConstants":223,"./ToInteger":199}],189:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

},{"../helpers/timeConstants":223,"./floor":211,"./modulo":212}],190:[function(require,module,exports){
'use strict';

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

},{"./DayWithinYear":176,"./InLeapYear":180}],191:[function(require,module,exports){
'use strict';

var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

},{"../helpers/isNaN":218}],192:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

},{"../helpers/timeConstants":223,"./floor":211,"./modulo":212}],193:[function(require,module,exports){
'use strict';

var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

},{"./Type":207}],194:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


},{"../helpers/isFinite":216,"./ToNumber":200,"./abs":210,"get-intrinsic":228}],195:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":223,"./DayFromYear":175}],196:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":223,"./modulo":212}],197:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],198:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":200}],199:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.4

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if ($isNaN(number)) { return 0; }
	if (number === 0 || !$isFinite(number)) { return number; }
	return $sign(number) * floor(abs(number));
};

},{"../helpers/isFinite":216,"../helpers/isNaN":218,"../helpers/sign":222,"./ToNumber":200,"./abs":210,"./floor":211}],200:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":202}],201:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":172,"get-intrinsic":228}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":224}],203:[function(require,module,exports){
'use strict';

var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":182,"./ToBoolean":197,"./Type":207,"get-intrinsic":228,"has":232}],204:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":228}],205:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

},{"../helpers/isFinite":216,"../helpers/isNaN":218,"../helpers/sign":222,"./ToNumber":200,"./abs":210,"./floor":211,"./modulo":212}],206:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":200}],207:[function(require,module,exports){
'use strict';

// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

},{}],208:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":174,"./modulo":212}],209:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

},{"call-bind/callBound":163,"get-intrinsic":228}],210:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":228}],211:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],212:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":221}],213:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":223,"./modulo":212}],214:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	CheckObjectCoercible: require('./5/CheckObjectCoercible'),
	DateFromTime: require('./5/DateFromTime'),
	Day: require('./5/Day'),
	DayFromYear: require('./5/DayFromYear'),
	DaysInYear: require('./5/DaysInYear'),
	DayWithinYear: require('./5/DayWithinYear'),
	floor: require('./5/floor'),
	FromPropertyDescriptor: require('./5/FromPropertyDescriptor'),
	HourFromTime: require('./5/HourFromTime'),
	InLeapYear: require('./5/InLeapYear'),
	IsAccessorDescriptor: require('./5/IsAccessorDescriptor'),
	IsCallable: require('./5/IsCallable'),
	IsDataDescriptor: require('./5/IsDataDescriptor'),
	IsGenericDescriptor: require('./5/IsGenericDescriptor'),
	IsPropertyDescriptor: require('./5/IsPropertyDescriptor'),
	MakeDate: require('./5/MakeDate'),
	MakeDay: require('./5/MakeDay'),
	MakeTime: require('./5/MakeTime'),
	MinFromTime: require('./5/MinFromTime'),
	modulo: require('./5/modulo'),
	MonthFromTime: require('./5/MonthFromTime'),
	msFromTime: require('./5/msFromTime'),
	SameValue: require('./5/SameValue'),
	SecFromTime: require('./5/SecFromTime'),
	TimeClip: require('./5/TimeClip'),
	TimeFromYear: require('./5/TimeFromYear'),
	TimeWithinDay: require('./5/TimeWithinDay'),
	ToBoolean: require('./5/ToBoolean'),
	ToInt32: require('./5/ToInt32'),
	ToInteger: require('./5/ToInteger'),
	ToNumber: require('./5/ToNumber'),
	ToObject: require('./5/ToObject'),
	ToPrimitive: require('./5/ToPrimitive'),
	ToPropertyDescriptor: require('./5/ToPropertyDescriptor'),
	ToString: require('./5/ToString'),
	ToUint16: require('./5/ToUint16'),
	ToUint32: require('./5/ToUint32'),
	Type: require('./5/Type'),
	WeekDay: require('./5/WeekDay'),
	YearFromTime: require('./5/YearFromTime')
};

},{"./5/AbstractEqualityComparison":170,"./5/AbstractRelationalComparison":171,"./5/CheckObjectCoercible":172,"./5/DateFromTime":173,"./5/Day":174,"./5/DayFromYear":175,"./5/DayWithinYear":176,"./5/DaysInYear":177,"./5/FromPropertyDescriptor":178,"./5/HourFromTime":179,"./5/InLeapYear":180,"./5/IsAccessorDescriptor":181,"./5/IsCallable":182,"./5/IsDataDescriptor":183,"./5/IsGenericDescriptor":184,"./5/IsPropertyDescriptor":185,"./5/MakeDate":186,"./5/MakeDay":187,"./5/MakeTime":188,"./5/MinFromTime":189,"./5/MonthFromTime":190,"./5/SameValue":191,"./5/SecFromTime":192,"./5/StrictEqualityComparison":193,"./5/TimeClip":194,"./5/TimeFromYear":195,"./5/TimeWithinDay":196,"./5/ToBoolean":197,"./5/ToInt32":198,"./5/ToInteger":199,"./5/ToNumber":200,"./5/ToObject":201,"./5/ToPrimitive":202,"./5/ToPropertyDescriptor":203,"./5/ToString":204,"./5/ToUint16":205,"./5/ToUint32":206,"./5/Type":207,"./5/WeekDay":208,"./5/YearFromTime":209,"./5/abs":210,"./5/floor":211,"./5/modulo":212,"./5/msFromTime":213}],215:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var isMatchRecord = require('./isMatchRecord');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Desc) {
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},
	// https://262.ecma-international.org/13.0/#sec-match-records
	'Match Record': isMatchRecord
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (Type(value) !== 'Object' || !predicate(value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"./isMatchRecord":217,"get-intrinsic":228,"has":232}],216:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],217:[function(require,module,exports){
'use strict';

var has = require('has');

// https://262.ecma-international.org/13.0/#sec-match-records

module.exports = function isMatchRecord(record) {
	return (
		has(record, '[[StartIndex]]')
        && has(record, '[[EndIndex]]')
        && record['[[StartIndex]]'] >= 0
        && record['[[EndIndex]]'] >= record['[[StartIndex]]']
        && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]'])
        && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]'])
	);
};

},{"has":232}],218:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],219:[function(require,module,exports){
'use strict';

var $strSlice = require('call-bind/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"call-bind/callBound":163}],220:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"get-intrinsic":228,"has":232}],221:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],222:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],223:[function(require,module,exports){
'use strict';

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

module.exports = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

},{}],224:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":225,"is-callable":235}],225:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],226:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],227:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":226}],228:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":227,"has":232,"has-symbols":230}],229:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"get-intrinsic":228}],230:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":231}],231:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],232:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":227}],233:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],234:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],235:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

},{}],236:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":238}],237:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":236,"./isArguments":238}],238:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],239:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],240:[function(require,module,exports){
(function (process,setImmediate){(function (){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":239,"through":253,"timers":254}],241:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":145}],242:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":214,"function-bind":227}],243:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":242,"./polyfill":244,"./shim":245,"define-properties":168,"function-bind":227}],244:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":242}],245:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":244,"define-properties":168}],246:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":241}],247:[function(require,module,exports){
(function (process,setImmediate){(function (){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":248,"./lib/results":250,"./lib/test":251,"_process":239,"defined":169,"through":253,"timers":254}],248:[function(require,module,exports){
(function (process){(function (){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this)}).call(this,require('_process'))
},{"_process":239,"fs":144,"through":253}],249:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":239,"timers":254}],250:[function(require,module,exports){
(function (process,setImmediate){(function (){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":239,"events":146,"function-bind":227,"has":232,"inherits":234,"object-inspect":252,"resumer":240,"through":253,"timers":254}],251:[function(require,module,exports){
(function (__dirname){(function (){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this)}).call(this,"/node_modules/tape/lib")
},{"./next_tick":249,"deep-equal":165,"defined":169,"events":146,"has":232,"inherits":234,"path":147,"string.prototype.trim":243}],252:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],253:[function(require,module,exports){
(function (process){(function (){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this)}).call(this,require('_process'))
},{"_process":239,"stream":148}],254:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":239,"timers":254}],255:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[112,113,114]);
