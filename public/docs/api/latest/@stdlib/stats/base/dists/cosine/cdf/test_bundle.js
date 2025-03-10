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

},{"@stdlib/utils/native-class":143}],37:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":143}],42:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":143}],44:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":143}],46:[function(require,module,exports){
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

},{"@stdlib/number/ctor":89}],53:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":93,"@stdlib/number/float64/base/get-high-word":97,"@stdlib/number/float64/base/to-words":105}],67:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c}. The implementation follows the original, but has been modified for JavaScript.
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
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch array for storing temporary values:
var buffer = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word of π/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word of 2^-27: 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value (in radians)
* @returns {number} cosine
*
* @example
* var v = cos( 0.0 );
* // returns 1.0
*
* @example
* var v = cos( 3.141592653589793/4.0 );
* // returns ~0.707
*
* @example
* var v = cos( -3.141592653589793/6.0 );
* // returns ~0.866
*
* @example
* var v = cos( NaN );
* // returns NaN
*/
function cos( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< pi/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: x < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return 1.0;
		}
		return kernelCos( x, 0.0 );
	}
	// Case: cos(Inf or NaN) is NaN */
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, buffer );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( buffer[ 0 ], buffer[ 1 ] );
	case 1:
		return -kernelSin( buffer[ 0 ], buffer[ 1 ] );
	case 2:
		return -kernelCos( buffer[ 0 ], buffer[ 1 ] );
	default:
		return kernelSin( buffer[ 0 ], buffer[ 1 ] );
	}
}


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":71,"@stdlib/math/base/special/kernel-sin":75,"@stdlib/math/base/special/rempio2":79,"@stdlib/number/float64/base/get-high-word":97}],68:[function(require,module,exports){
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
* Compute the cosine of a number.
*
* @module @stdlib/math/base/special/cos
*
* @example
* var cos = require( '@stdlib/math/base/special/cos' );
*
* var v = cos( 0.0 );
* // returns 1.0
*
* v = cos( 3.141592653589793/4.0 );
* // returns ~0.707
*
* v = cos( -3.141592653589793/6.0 );
* // returns ~0.866
*/

// MODULES //

var cos = require( './cos.js' );


// EXPORTS //

module.exports = cos;

},{"./cos.js":67}],69:[function(require,module,exports){
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

},{"./main.js":70}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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
* Compute the cosine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-cos
*
* @example
* var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
*
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* v = kernelCos( 3.141592653589793/6.0, 0.0 );
* // returns ~0.866
*
* v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* v = kernelCos( NaN, 0.0 );
* // returns NaN
*/

// MODULES //

var kernelCos = require( './kernel_cos.js' );


// EXPORTS //

module.exports = kernelCos;

},{"./kernel_cos.js":72}],72:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c}. The implementation follows the original, but has been modified for JavaScript.
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

var polyval13 = require( './polyval_c13.js' );
var polyval46 = require( './polyval_c46.js' );


// MAIN //

/**
* Computes the cosine on \\( \[-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* -   Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* -   If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* -   \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( \[0,\pi/4] \\).
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*     ```
*
*     where the Remez error is
*
*     ```tex
*     \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*     ```
*
* -   Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*     ```
*
*     Since
*
*     ```tex
*     \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*     ```
*
*     a correction term is necessary in \\( \cos(x) \\). Hence,
*
*     ```tex
*     \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*     ```
*
*     For better accuracy, rearrange to
*
*     ```tex
*     \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*     ```
*
*     where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine
*
* @example
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* @example
* var v = kernelCos( 3.141592653589793/6.0, 0.0 );
* // returns ~0.866
*
* @example
* var v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* @example
* var v = kernelCos( NaN, 0.0 );
* // returns NaN
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = z * polyval13( z );
	r += w * w * polyval46( z );
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
}


// EXPORTS //

module.exports = kernelCos;

},{"./polyval_c13.js":73,"./polyval_c46.js":74}],73:[function(require,module,exports){
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
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],74:[function(require,module,exports){
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],75:[function(require,module,exports){
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
* Compute the sine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-sin
*
* @example
* var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
*
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* v = kernelSin( 3.141592653589793/6.0, 0.0 );
* // returns ~0.5
*
* v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* v = kernelSin( 3.0, NaN );
* // returns NaN
*
* v = kernelSin( NaN, NaN );
* // returns NaN
*/

// MODULES //

var kernelSin = require( './kernel_sin.js' );


// EXPORTS //

module.exports = kernelSin;

},{"./kernel_sin.js":76}],76:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c}. The implementation follows the original, but has been modified for JavaScript.
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

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx \[-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* -   Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* -   \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left\[0,\tfrac{pi}{4}\right] \\)
*
*     ```tex
*     \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*     ```
*
*     where
*
*     ```tex
*     \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*     ```
*
* -   We have
*
*     ```tex
*     \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*     ```
*
*     For better accuracy, let
*
*     ```tex
*     r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*     ```
*
*     then
*
*     ```tex
*     \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine
*
* @example
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* @example
* var v = kernelSin( 3.141592653589793/6.0, 0.0 );
* // returns ~0.5
*
* @example
* var v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.58
*
* @example
* var v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* @example
* var v = kernelSin( 3.0, NaN );
* // returns NaN
*
* @example
* var v = kernelSin( NaN, NaN );
* // returns NaN
*/
function kernelSin( x, y ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y === 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}


// EXPORTS //

module.exports = kernelSin;

},{}],77:[function(require,module,exports){
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

},{"./main.js":78}],78:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":65,"@stdlib/number/float64/base/exponent":91,"@stdlib/number/float64/base/from-words":93,"@stdlib/number/float64/base/normalize":102,"@stdlib/number/float64/base/to-words":105}],79:[function(require,module,exports){
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

},{"./rempio2.js":81}],80:[function(require,module,exports){
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/ldexp":77}],81:[function(require,module,exports){
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

},{"./kernel_rempio2.js":80,"./rempio2_medium.js":82,"@stdlib/number/float64/base/from-words":93,"@stdlib/number/float64/base/get-high-word":97,"@stdlib/number/float64/base/get-low-word":99}],82:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":83,"@stdlib/number/float64/base/get-high-word":97}],83:[function(require,module,exports){
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

},{"./round.js":84}],84:[function(require,module,exports){
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
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( 3.141592653589793/2.0 );
* // returns ~1.0
*
* v = sin( -3.141592653589793/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":86}],86:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c}. The implementation follows the original, but has been modified for JavaScript.
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
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes the sine of a number.
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
*     | 0 |   S    |   C    |    T   |
*     | 1 |   C    |  -S    |  -1/T  |
*     | 2 |  -S    |  -C    |    T   |
*     | 3 |  -C    |   S    |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} sine
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( 3.141592653589793/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -3.141592653589793/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[ 0 ], Y[ 1 ] );
	case 1:
		return kernelCos( Y[ 0 ], Y[ 1 ] );
	case 2:
		return -kernelSin( Y[ 0 ], Y[ 1 ] );
	default:
		return -kernelCos( Y[ 0 ], Y[ 1 ] );
	}
}


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":71,"@stdlib/math/base/special/kernel-sin":75,"@stdlib/math/base/special/rempio2":79,"@stdlib/number/float64/base/get-high-word":97}],87:[function(require,module,exports){
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
* Compute the value of `sin(πx)`.
*
* @module @stdlib/math/base/special/sinpi
*
* @example
* var sinpi = require( '@stdlib/math/base/special/sinpi' );
*
* var y = sinpi( 0.0 );
* // returns 0.0
*
* y = sinpi( 0.5 );
* // returns 1.0
*
* y = sinpi( 0.9 );
* // returns ~0.309
*
* y = sinpi( NaN );
* // returns NaN
*/

// MODULES //

var sinpi = require( './sinpi.js' );


// EXPORTS //

module.exports = sinpi;

},{"./sinpi.js":88}],88:[function(require,module,exports){
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

/*
* Notes:
*	=> sin(-x) = -sin(x)
*	=> sin(+n) = +0, where `n` is a positive integer
*	=> sin(-n) = -sin(+n) = -0, where `n` is a positive integer
*	=> cos(-x) = cos(x)
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var abs = require( '@stdlib/math/base/special/abs' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Computes the value of `sin(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = sinpi( 0.0 );
* // returns 0.0
*
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
*
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
*
* @example
* var y = sinpi( NaN );
* // returns NaN
*/
function sinpi( x ) {
	var ar;
	var r;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	// Argument reduction (reduce to [0,2))...
	r = x % 2.0; // sign preserving
	ar = abs( r );

	// If `x` is an integer, the mod is an integer...
	if ( ar === 0.0 || ar === 1.0 ) {
		return copysign( 0.0, r );
	}
	if ( ar < 0.25 ) {
		return sin( PI*r );
	}
	// In each of the following, we further reduce to [-π/4,π/4)...
	if ( ar < 0.75 ) {
		ar = 0.5 - ar;
		return copysign( cos( PI*ar ), r );
	}
	if ( ar < 1.25 ) {
		r = copysign( 1.0, r ) - r;
		return sin( PI*r );
	}
	if ( ar < 1.75 ) {
		ar -= 1.5;
		return -copysign( cos( PI*ar ), r );
	}
	r -= copysign( 2.0, r );
	return sin( PI*r );
}


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"@stdlib/math/base/special/copysign":65,"@stdlib/math/base/special/cos":68,"@stdlib/math/base/special/sin":85}],89:[function(require,module,exports){
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

},{"./number.js":90}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":48,"@stdlib/number/float64/base/get-high-word":97}],93:[function(require,module,exports){
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

},{"./indices.js":94,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],96:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":38}],97:[function(require,module,exports){
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

},{"./main.js":98}],98:[function(require,module,exports){
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

},{"./high.js":96,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],99:[function(require,module,exports){
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

},{"./main.js":101}],100:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":38}],101:[function(require,module,exports){
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

},{"./main.js":103}],103:[function(require,module,exports){
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

},{"./normalize.js":104}],104:[function(require,module,exports){
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63}],105:[function(require,module,exports){
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

},{"./main.js":107}],106:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":94}],107:[function(require,module,exports){
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

},{"./to_words.js":108}],108:[function(require,module,exports){
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

},{"./indices.js":106,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],109:[function(require,module,exports){
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
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a raised cosine distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 0.5, 0.0, 1.0 );
* // returns ~0.909
*
* @example
* var y = cdf( 1.2, 0.0, 1.0 );
* // returns 1.0
*
* @example
* var y = cdf( -0.9, 0.0, 1.0);
* // returns ~0.0
*
* @example
* var y = cdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*/
function cdf( x, mu, s ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( s ) ||
		s < 0.0
	) {
		return NaN;
	}
	if ( s === 0.0 ) {
		return ( x < mu ) ? 0.0 : 1.0;
	}
	if ( x < mu - s ) {
		return 0.0;
	}
	if ( x > mu + s ) {
		return 1.0;
	}
	z = ( x - mu ) / s;
	return ( 1.0 + z + ( sinpi( z ) / PI ) ) / 2.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/sinpi":87}],110:[function(require,module,exports){
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a raised cosine distribution with location parameter `mu` and scale parameter `s`.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.9 );
* // returns ~0.015
*
* y = cdf( 4.0 );
* // returns ~0.971
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a raised cosine distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < mu - s ) {
			return 0.0;
		}
		if ( x > mu + s ) {
			return 1.0;
		}
		z = ( x - mu ) / s;
		return ( 1.0 + z + ( sinpi( z ) / PI ) ) / 2.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/sinpi":87,"@stdlib/stats/base/dists/degenerate/cdf":120,"@stdlib/utils/constant-function":135}],111:[function(require,module,exports){
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
* Raised cosine distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/cosine/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/cosine/cdf' );
*
* var y = cdf( 0.5, 0.0, 1.0 );
* // returns ~0.909
*
* var mycdf = cdf.factory( 3.0, 1.5 );
*
* y = mycdf( 4.0 );
* // returns ~0.971
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":109,"./factory.js":110,"@stdlib/utils/define-nonenumerable-read-only-property":136}],112:[function(require,module,exports){
module.exports={"expected":[0.8767993010089374,0.6875305318857383,0.9902860659279271,0.8859848557516975,0.9995926130822881,0.942648517066363,0.6025950560885706,0.9986979828509028,0.6375308605607328,0.9344585966801077,0.8276663681626575,0.9527458194341375,0.8047847079581684,0.8599815213713117,0.9929404430020241,0.9883351823900943,0.5317119439721276,0.9975936554424196,0.9980153636067657,0.939001827103253,0.5922895381512391,0.9878415943433753,0.9989949954308616,0.9512875098995235,0.8212824679685602,0.905776213619411,0.8367189875617177,0.9858088261542763,0.9994637323356717,0.7569320333369839,0.6240540779333353,0.999970932026754,0.8152194796053919,0.682862725873328,0.9329224857315227,0.6640105426954243,0.8552132503387422,0.5478210331506506,0.513734489201927,0.8499058519301026,0.7524410214649069,0.802979191428477,0.835035961530255,0.9210084787260022,0.9995903759363889,0.99781797666605,0.9131737083406445,0.8843665539243047,0.5120047927600749,0.9920455388217797,0.7823688749295388,0.92809441003906,0.7766159667771495,0.9484773830545491,0.7727133545609143,0.783204480206906,0.9336012688661097,0.5697102122724681,0.7454021384036078,0.9663996484857256,0.9994845177706696,0.9514631239806903,0.8947736519698192,0.982386614209524,0.996128385861628,0.9357577910387886,0.767084489919242,0.9954658847782323,0.804473929275956,0.9152918291178326,0.7241252490472199,0.9999547413247311,0.7664006700444443,0.9991620358343892,0.5689603873671759,0.7513248285248155,0.959881643810577,0.7138471494939047,0.8967354233569558,0.8071765441214599,0.9981285501178209,0.7185806964837271,0.643250723586898,0.8074746218497432,0.999990994006711,0.7763224951830691,0.9993809194428944,0.9999934166027034,0.9896250917162277,0.5432401682527404,0.9928701283774513,0.5411490723949511,0.9915922369710157,0.7998568457715443,0.7990747633626556,0.9955811772988656,0.6256031432513309,0.8609049104120411,0.8993986563901573,0.6911467036163198,0.9564517385279263,0.998471593136294,0.8948380836302676,0.7365059121794854,0.8274901306248967,0.9108817325833118,0.6792829516468857,0.6559540926508807,0.9999910614567075,0.994826122556393,0.5780319409690466,0.7632915057780877,0.9999358031544519,0.9983096304374571,0.9999038152925664,0.9994547791903956,0.9715807953118872,0.8428779260019439,0.9988911978954604,0.9925759148173726,0.9933826723135718,0.9083365398710025,0.9563495900318854,0.8741056051824769,0.9996246846991591,0.5717312269396749,0.768215236089791,0.9643651709883152,0.8752681588453644,0.8812590601368488,0.941445949357771,0.9368378221496403,0.9306531264734232,0.5155963211481707,0.7220634299400086,0.7809590936641089,0.5298671825302309,0.9999807014150645,0.9499267951429141,0.6255441200036199,0.5811399022307445,0.9405575124485017,0.9979823391132524,0.9098368326148101,0.9265575941924056,0.9999742204647394,0.9998389111202572,0.9999935099422675,0.6030514721609362,0.9705601567999527,0.9972288252960211,0.8998675867114557,0.6342406073889418,0.8424026213461463,0.8789177370877733,0.9809340043731667,0.9793615433721347,0.722084586712823,0.9955186614406402,0.9497031359031124,0.9268410384255971,0.5046729239570246,0.905409189317935,0.8813308961443469,0.6604800726674501,0.9498473788744984,0.8604629267127122,0.9876299160756133,0.5217996223554314,0.90265782448594,0.6960880645698123,0.7904037770056201,0.9961514400299738,0.926585719068187,0.757036398291148,0.9991345305290777,0.9761489685302065,0.5760679498225447,0.5584278353131713,0.9781029980417373,0.6332756608714103,0.8219030795665195,0.9070083707795483,0.7158094122440064,0.9936288759592549,0.9577787111056183,0.5977823284102481,0.946913116440693,0.9950935670870298,0.6272561624066972,0.7833569091368331,0.9787265621252214,0.6872778457838598,0.9995860418232415,0.9606995789444579,0.9893820720919569,0.9980806472216803,0.7908565162477794,0.6656613197760937,0.6738672625905796,0.8558066533921975,0.9975227017079491,0.9485912511064547,0.9988905679676319,0.6660812506702422,0.9980746010972631,0.841646369391764,0.9942731389387877,0.9925658602802687,0.6449249871308615,0.9547234338434251,0.9805835336563571,0.8155691001111276,0.7507032215160302,0.9997448127247816,0.9836510695395321,0.5173953558966925,0.8004490614697981,0.8908570145552138,0.9991909145828497,0.8988312146323333,0.959500677254769,0.5785955565761703,0.9720470798296761,0.7566638251278924,0.8162252387564681,0.571866304049801,0.7969199479752807,0.9858879819835529,0.9675683915437501,0.984241004305306,0.9887821555773724,0.6689102898880989,0.6977273505310139,0.8268453309428374,0.9992549386421156,0.9195063174385903,0.9632582573807641,0.9990420691927037,0.907679161997804,0.9651310688084358,0.9956340841207886,0.8801099723349337,0.9777134263511111,0.8067826722459484,0.9903661654543122,0.6800402127566877,0.5643107338858464,0.999951681098883,0.9416694962955288,0.7400271747313245,0.9743334571522793,0.7672896220083704,0.9906907317233181,0.9834123778034438,0.5760827664744571,0.5573721226656739,0.9999999986949596,0.7840203945458885,0.6246631783891654,0.9061129587610398,0.9665012505195494,0.9233042590857944,0.9951340735993451,0.7382567204826493,0.9908008518389181,0.9209263990462482,0.6012190133776288,0.9411048453197297,0.9999860869398978,0.7732407019175538,0.9484336800017803,0.9963302184698173,0.8953376648101037,0.9604438871217635,0.9510907454924903,0.5765131272088532,0.9314670047857301,0.7383213706072955,0.9999856106315903,0.9993194512236468,0.9999118144629273,0.9999624389529524,0.8143151540362606,0.9969713586437426,0.9974199648733969,0.6929346340794686,0.82421937208101,0.9900265427686864,0.8760479620638016,0.631181201715219,0.9023583056870313,0.9822951782163201,0.9982127297370391,0.5972848186450823,0.563885295807476,0.7116017454053386,0.745521720672753,0.9979461193745804,0.8037636530876557,0.9591318916191975,0.9040447263111056,0.5707638549073318,0.7863442938774869,0.9944939180217354,0.9237514150725572,0.7852527661100022,0.7072167851378758,0.9352134359284914,0.5675530943716676,0.8815467088505705,0.9944367965352962,0.9993594628892412,0.7225803293900199,0.6130504289195879,0.9895196859934922,0.7899688135222722,0.9123443224927682,0.988145114548157,0.9300565010706974,0.9193732684179904,0.8267091656010882,0.8437285671599476,0.9988944281160331,0.8161154985176676,0.5838071454956335,0.8735192937795347,0.9959271151953404,0.999996549747459,0.9886349927703655,0.9086579467475124,0.6170928107978483,0.5069976194271446,0.6227101699573769,0.9583371453504269,0.9780466008105158,0.975622695282977,0.9881639160823678,0.9999990728829395,0.7979588058812401,0.5784699210518749,0.8277869398427127,0.98678891492112,0.9997504081575237,0.9988578323022301,0.6719746765628011,0.9871074122467944,0.9293388056904723,0.9570863095377764,0.9900263662397163,0.9067367552764384,0.9997295608318507,0.9209014665221685,0.6216096754798048,0.8442850248515525,0.7247086835786523,0.678112532311961,0.9995679472929193,0.9993086571962347,0.9964500804970002,0.7599639382762767,0.997973848994323,0.9758725003847761,0.584765667812993,0.9395727815554422,0.5551111229797433,0.5318410988070557,0.7781711652803909,0.9998911618149977,0.5146143632011494,0.7841441410744802,0.9624970895056952,0.999979141423716,0.8058035459532379,0.9075703134850265,0.8103187752522335,0.9983765271496533,0.5229779226364039,0.5684070764892529,0.9768139572181631,0.537553217388614,0.9947743111738885,0.6768410183124536,0.9986193559403854,0.5924208061869811,0.6268152607446819,0.9979693258547067,0.517590130093216,0.9888831402332509,0.9976499804506664,0.9956764619060103,0.7646087874472568,0.7554519085997737,0.9244532954900253,0.7286276468053173,0.9946731983574747,0.7018318538495449,0.6205796057210073,0.7634659455519456,0.9999984356121763,0.894521658820436,0.9786726814438103,0.5683645677609745,0.8439741343632631,0.9964515689262806,0.977401357250933,0.5728632283711879,0.9937480265954558,0.7268892605501961,0.9004460961208487,0.8581508219149643,0.9371909143906367,0.8365491554259276,0.8156693085395584,0.5269035361510832,0.9963608201175125,0.9628483041033924,0.8610177783693311,0.7892287646006063,0.9999811401532004,0.7400146445983411,0.6681406908761147,0.8362794477628339,0.8738023832495471,0.5490043160262407,0.9936848949614837,0.8565841906400841,0.6643812423086667,0.667004028895669,0.9990421921316414,0.9542618415713773,0.9528690192698892,0.9971355217225397,0.6835200461258335,0.9799258908744755,0.810370481725172,0.7199689844721407,0.9809121289225946,0.6912662964919893,0.9894322530583866,0.7570922144605121,0.9832000125256245,0.9999132867362301,0.9949910106433927,0.960680937091072,0.8879161240892126,0.9201657266052048,0.6529026806201763,0.5698330030387608,0.9980703458326495,0.9761553138023027,0.998660685772593,0.8007366613817611,0.8039614828679746,0.9427142997916442,0.9948654736564536,0.8509815154826363,0.9994482237306512,0.9905021760979276,0.8083848066558676,0.940755176005819,0.9963509540193358,0.8899608810909796,0.9999927772316587,0.5062690137582414,0.7810335689100587,0.9198207777881212,0.9920105821306889,0.7491949377706282,0.999730759240649,0.5012195706108659,0.8173952795913701,0.6718673233936724,0.9987326390152778,0.9314947531886881,0.8504586238939116,0.9989975873612639,0.8953548401352105,0.7397387061679082,0.8919306826380796,0.9999986013604414,0.999860368415979,0.8591607388001374,0.8959027842515175,0.960205759255359,0.9999840275813253,0.8310703845447497,0.8171901753993494,0.7664507539632157,0.7021947095280532,0.9999951623384242,0.9999996554604671,0.8751026121956819,0.6493164326347177,0.9989646729161213,0.9733720448502045,0.9564781329189478,0.9996353194278859,0.921180820495801,0.9574389874243766,0.602437079629814,0.5122927801054692,0.7020978796091863,0.6426925451103407,0.8706411332281427,0.9467655713020484,0.9341551797465935,0.9530440692390367,0.9970957211872695,0.8378795992780782,0.9998081736883997,0.6420730780562838,0.9921821705559261,0.5319699437682863,0.8770713087338003,0.9989009646715337,0.8694289752876997,0.9926115951812569,0.9421077301999137,0.9999050669125742,0.9933810004141856,0.8136172334421713,0.8436420116815582,0.989644317047423,0.9981343772853823,0.5682866082142228,0.6703935674805483,0.8058092222837544,0.75090714777174,0.9998466734171775,0.9373051418098484,0.6510654084943609,0.9975976903146739,0.6271867107171374,0.8610640237839116,0.999766045733669,0.9603138336624314,0.9374728754692658,0.6620245263823034,0.5467885693310741,0.8655777210617727,0.628171689301256,0.902407420541621,0.9998525843361652,0.8946234439275403,0.9551668100064414,0.9960227652846345,0.9473162643384914,0.9992756687427778,0.9985527924758059,0.9822374273660314,0.9945115403138731,0.8795436019642486,0.8985310836881327,0.9959915581968418,0.9996356907056964,0.766774246910056,0.8987160233360769,0.6523642077987589,0.9884858012766136,0.7761523396571063,0.5266000635036507,0.9099621026703715,0.8141439122924171,0.6434573742966773,0.8405263179821572,0.6033217141596253,0.9015656076990477,0.803569067618481,0.9604649889938417,0.8820575508035954,0.9999525817462436,0.5042184809279083,0.9435463045379332,0.8806834733566477,0.9765243383326386,0.949103553132512,0.9992301713476359,0.7330281917935932,0.9832821196861747,0.5450978391903053,0.6322027069059104,0.7276137100885887,0.9998478850990652,0.8180143197129114,0.5201515030877464,0.9035242270921342,0.8892680798581707,0.9861984973568241,0.9948170803789547,0.9999830503058398,0.9966622080655303,0.6969379550644665,0.9989127853262263,0.8651274899569997,0.6315063174573805,0.9999828278127378,0.9940253388479727,0.6258470473955324,0.9931321422925371,0.7018501711660844,0.831465605458539,0.941986432661681,0.9692512180412262,0.9870712817020454,0.9997910680107269,0.6349750640626548,0.9933234455338849,0.9935105028584128,0.999429022836456,0.8960510519006026,0.9989470751461137,0.938788794267701,0.9905329189736273,0.6548193371439449,0.9891963471631109,0.9370398156278426,0.7697606212924899,0.7876207837447993,0.9880214198014041,0.9971168742211635,0.5292228245876235,0.7085066724778949,0.6207214632104692,0.7206425724780967,0.8433168617081009,0.7448831425929275,0.6869367555651181,0.8224882610299231,0.924578468991661,0.9503814512028798,0.999982928443911,0.6965959498351216,0.8940660332453596,0.9293162921584006,0.9141689469929126,0.9607571962547222,0.7380536272799795,0.9202318983687763,0.9589726926244572,0.9208008813823595,0.9975362316362683,0.9715634101421716,0.9945486979903572,0.7672098643785231,0.5191132010345328,0.9985448718809575,0.9978720554999397,0.7204181551528207,0.8162956051269474,0.6416814974096849,0.6352264210052513,0.8651089086531345,0.8801944848658861,0.6607552254676359,0.544148480177528,0.9999260287563634,0.9804633613215682,0.5948971064619132,0.9822562091645178,0.675102360050953,0.5319397966660095,0.9987235529263565,0.5409374459777114,0.890555380994778,0.6534639922519418,0.9962815302612007,0.9835998841747364,0.6033226342865433,0.7488553336229347,0.9988357870820938,0.8410183352865361,0.897186658833901,0.9697546094562142,0.8911050894311225,0.995861979082327,0.9941290989655485,0.887092141461896,0.7998083683774063,0.8614345687567799,0.9908322012844464,0.5678507415775426,0.9748507928156311,0.8228357751167843,0.8720188075556015,0.6963179038199411,0.9999994769285796,0.6297213384442601,0.625918730490546,0.8743151283364525,0.8244926877046401,0.5521787675916893,0.6892368591753207,0.9618321521879495,0.7987759612353059,0.7278061249426006,0.926302171611584,0.8554058304292793,0.9954615001749707,0.8710846115408677,0.7106957578123261,0.9094568413785709,0.9996826002459658,0.8323973041419952,0.7521342131310909,0.9919946157898851,0.9589875357417152,0.999128801214965,0.9975546850270847,0.5586919571417479,0.9977841889173302,0.5555861658188147,0.7859950148452055,0.9129533291395461,0.9118674275764557,0.9853968748002657,0.9456437813188292,0.6430148649478427,0.9976547192905629,0.9135156373768081,0.9999992233645677,0.9800707446049164,0.8559400750326119,0.9883018990642461,0.9021847755768729,0.9999275158975743,0.7875043547829418,0.9998213649852212,0.5287923021667148,0.5466439917870213,0.5305335097561171,0.7283857473824753,0.9655602899536673,0.9587409819958448,0.9142666686259369,0.9294705415769632,0.8937066361256242,0.9908636150841368,0.9985873621661954,0.9989551129111818,0.7678029791261001,0.5191760025530311,0.6027036284930569,0.9227611647421462,0.9418557202867157,0.9757728403580511,0.8124379489636556,0.9998985461562425,0.6609872908150105,0.9917446853850981,0.5890290183503015,0.9914535762014585,0.9830505121001649,0.8212688191056192,0.8839034331973677,0.9938189844151073,0.9659112293225531,0.9382808765566316,0.5054860321670374,0.7598764667705123,0.9673045769628809,0.9863438130624264,0.7198460921031127,0.9999162359777397,0.862291204699832,0.8298414360378176,0.9989765167852749,0.9714682485893998,0.9999140423842927,0.537999916288185,0.7408801002406803,0.9268116653691876,0.6037730464665981,0.8918280488860769,0.9633900667917059,0.5854718975387907,0.8859958764658286,0.8574762162115299,0.9599561370690699,0.9096569604877253,0.9631848739619322,0.8946692810424018,0.5331934083130219,0.9109632859243176,0.796814285090444,0.809509115201624,0.9844581139001737,0.7852583107006358,0.9147606758748685,0.9503489223000945,0.630558885702838,0.7186344928838733,0.5826536726119922,0.8248746035002501,0.7239370510603396,0.9999972337761828,0.7181047111178034,0.9970873899178483,0.9886679627353344,0.9979985686015868,0.8052547213142653,0.8960797891018231,0.9994643236850752,0.9022079362001921,0.6083386032149956,0.8446479034948569,0.9968268698383332,0.9657186543998842,0.9997669924253194,0.9999854798155153,0.935236340567602,0.9996709790449573,0.9413081299940503,0.9959586445251464,0.525502423048352,0.6039313961675268,0.9862629563958286,0.9999960140588613,0.9977695720744163,0.8406083579925802,0.6794559188549532,0.9122055433894394,0.9966708743517904,0.9943189077905379,0.7478582799190653,0.6924526558825717,0.7144334158018701,0.7579366425459547,0.8482747953005767,0.9487365980160085,0.9912073432216572,0.870921401314906,0.9673696090267758,0.64354299731944,0.9955952950433303,0.9952520339092572,0.6865607450347575,0.9815127424504546,0.5126723504309051,0.8979026588567934,0.5355213271430641,0.6425591004294433,0.8247049561393939,0.9494380350643306,0.999988790105217,0.7474618824724947,0.9779856147386146,0.6393532213449031,0.999435737662713,0.8985851193720319,0.934190083727185,0.6839436472791529,0.932374892690466,0.7710672183440823,0.9964093242640615,0.7143005996072569,0.6071886199635304,0.8798943103522164,0.9889411866275379,0.9988271792807583,0.5091607079520992,0.6920589225962577,0.506703957606763,0.9992173013047398,0.9955590126885825,0.9600175694035465,0.7124445910648312,0.9284414117430608,0.9463874036996229,0.9995014315633114,0.5281792481783835,0.8823476570110785,0.7314671116900578,0.9937325703356035,0.7583996771341665,0.8606550092593207,0.9716345933931168,0.5312832197667162,0.5521569737076903,0.5321561202222728,0.9204236383033315,0.7304207146473385,0.8426649003558708,0.6827147214131883,0.774677923140641,0.9976705709182884,0.9104333745974102,0.7465046809846061,0.7684446254051973,0.9035374015728344,0.5842767832533883,0.9928374147305369,0.9670141490737546,0.9993704346833936,0.9765233896934131,0.9946388312036548,0.8954917002774601,0.9452039498278406,0.8247322462200422,0.9887195605435164,0.7522963333442575,0.9659993473465144,0.8357882647762862,0.9345481833076703,0.5344125863208773,0.8396165639136722,0.9841876672604319,0.9888697269587841,0.9355357349248994,0.8817385971887356,0.505365891568319,0.5513124325503411,0.6147756857630059,0.5122144937051042,0.9590828142082423,0.998207317381617,0.7847989696783638,0.9075605792168913,0.9991666041540734,0.9708228407680022,0.836081959568776,0.9863177914547131,0.9992527776023956,0.6419777362068173,0.7958028448803927,0.6112973443665476,0.9365915747731404,0.7690955882702832,0.9962987886464102,0.9983780689547247,0.946865117772313,0.663295724656513,0.7613304141715647,0.896540266225603,0.7728215321707558,0.9319974819287071,0.6678553840247835,0.99999222710552,0.982538116703325,0.9105006741681292,0.7610161647967778,0.999172815891116,0.9903840159100039,0.9933801719893678,0.8750668761425786,0.692879853297069,0.5586910206173109,0.9994616120112955,0.7390935806843563,0.9904505180433669,0.9886074471329424,0.9021249229790916,0.6616105416864677,0.9952344796592879,0.9942364350782594,0.5300612471502658,0.5704411826047963,0.997535724745018,0.904777685992341,0.5053637218925848,0.9973082702234355,0.7714932011110242,0.505103062495952,0.9895190998370194,0.9619988333099663,0.9127232089650397,0.6093395493205089,0.719686333365988,0.9148683906503774,0.9970010745867428,0.5808902623519205,0.7123854299320376,0.9726229048146579,0.6956174505237687,0.8031188146929016,0.9984426891496089,0.7274396358279529,0.7097735947235195,0.6927527148490771,0.7519757763391925,0.8577554134715917,0.9071437522170471,0.8097579683361161,0.9681497901313207,0.5510757710547103,0.9931199429646046,0.9035513287595645,0.9698861102648516,0.9899467618608071,0.9989883573487509,0.5264674840088697,0.9999544349777827,0.8942453109533592,0.9577330699324067,0.7397875255482295,0.6964050390788754,0.9989478285533133,0.7033036742037918,0.7428709094218078,0.9980290566888956],"x":[0.5673255363414662,3.5680374034900315,4.664684679004459,6.18326778740802,12.992383877637323,10.960798648359292,1.2514212165217207,7.234282789008609,3.403107292375361,2.293351019204896,4.403534372221422,1.3420381148374416,2.3676801389795976,6.015830759190649,10.648338964437395,6.414661676379965,0.7575121189449407,13.925206511255904,7.435281342275855,7.027330166979089,1.4423477766355568,10.918606544921255,10.906404385666386,1.6501429504928933,0.7667845910193427,1.0631652269242644,3.824025267616978,10.768743501968517,3.30776811724526,4.170665603191367,2.8426393202510636,10.068684049300325,2.8724070257338252,1.7908202275108944,9.967738106384147,3.571821575851976,7.1107224496302575,1.25393405266054,0.6444460553693099,5.099449119909031,5.647714883305862,5.463771023228849,5.449594647261604,6.4513353096714035,15.02667434213498,9.545894426901413,5.547076090738762,8.657596289496468,0.21999025171480385,11.078241473742581,6.368814782139081,0.7331232998232686,6.424935730355596,3.93122651601574,5.526610788971575,5.66791327994799,5.119617741427512,1.2748056390582065,4.740165982122837,5.434341776560887,14.838005550216167,5.5656657904623685,4.739457568322598,0.963675518719057,6.600976863830377,0.7888161449696511,0.9060808230395583,4.835231125651433,5.482763070825618,8.992842868608049,3.075690161234981,6.5373353536503505,3.1176798388764713,9.890452716791675,1.0733537023480582,2.8059050137141694,10.971432118486431,3.0982953341118087,8.236551488439986,3.5568543504570513,8.913211379188631,0.6899828937652176,0.9029570839292702,2.7950390299366363,18.92813467945215,3.5540754463416593,13.174263020403163,16.154497599008344,10.200018425654159,1.1337956166735235,2.0624920895286603,1.1137347985612658,11.651184230225821,1.3787401810264164,3.656303910842202,13.683610794420312,2.683754916261738,7.813216420357737,4.2992645115945995,1.1827339178068978,6.598494085597951,8.361507630837671,4.6203875732776645,5.513193936061322,6.193414366540329,4.185683082093807,1.6804263902554792,1.6063496070631733,5.502286911613865,11.304715182194146,1.7121730923130907,2.9640488126966575,8.763817074163406,14.420917323076207,12.76204578478492,15.681814072795715,3.762525586692469,4.976062656754367,5.787717015749568,12.213076732046327,11.237817987108265,2.902901247711889,6.217443445559216,9.037301687212812,14.07585080459616,0.7056748362974632,5.510007460129199,11.549318508050535,6.999436876581384,3.970404359917726,12.141249632388032,8.282920048096097,0.7311699107083192,0.5433738755002845,5.010913524555463,0.8772304473172914,1.20417978986946,7.7309144414379,5.735856816058005,2.1325329290809476,0.94043467270113,4.129228729093266,5.442596168213349,6.707830346016994,4.346983136490076,14.03332077257921,1.0850348253841302,12.110305901883017,2.166820524198963,1.437285876206082,14.368150659697841,1.6600530677424425,1.1169281710884078,5.432945734052755,2.370341904248599,10.129701201383913,12.635510183573794,1.2603852136476994,10.048733600074087,5.0410530284583395,2.018413982363299,0.7555579727515452,3.335155540698639,4.313873868306764,1.0840018382275924,4.479952929461226,4.834333098871359,0.5050535617352523,0.3228544924357494,8.627378428349157,3.486035097923714,1.8890889658376693,2.3535786296084558,3.637748060477656,2.3668205805950615,9.031281570017098,10.043797792352265,0.30770080282780277,0.938818129147776,4.979026741857273,2.435741628297703,4.758559444540365,7.940070793279925,2.8879633890982968,4.824468383685177,3.1695700047899775,2.1186018890025125,10.478231251914108,11.702091011835956,0.9418777410676398,5.95663273585578,12.478565661449245,2.9424695264865868,17.564826322425215,7.852932136041485,12.861331779292403,8.371288742344818,1.7603307542850017,2.6347850267386397,2.2921014136152733,1.473378031002671,8.150358098263606,8.17999736137796,14.932974499111994,2.4420253596595485,6.352905201039772,2.5409618582979827,8.666306287153049,14.527055716392624,0.2775742120800682,0.4702749760308931,9.546551215259543,2.4621507028079117,2.6890096527694283,1.6200238634291022,8.505095007382717,0.7896262867187515,4.501890813480306,5.424262809133325,14.474407484693339,4.966567650554735,4.95401974824736,0.9895913938830698,13.658895064693137,0.9175393606645629,4.736228990725626,2.0410918534973943,6.25922287873766,4.014242644984186,6.544565288418336,12.540143345850465,11.512736247014706,2.134389369411915,2.8481122428818786,0.5373258268356693,10.962605994273183,7.692291478284534,5.633062001189078,13.585966943361331,8.24298273389723,11.989663451240606,6.182621520795199,0.6995483870278557,3.8257528991407375,3.6845850568292384,7.178971599779981,3.48631345655481,1.3070281910778903,2.5771891419467474,5.196429492631013,2.552065556666744,3.458435682982703,4.312651256890304,4.316219023597903,3.2575387237749975,1.662100079916541,0.6995618262031842,10.633551406416554,2.7476690286264276,0.9914712590922227,9.678945557826376,8.005557946980769,10.571700958601497,0.6761200646412234,1.0808918899671371,0.6567938166271693,8.351031989979228,0.5467241062355886,5.27529238539067,17.95008508775879,1.5425107998436476,6.553159440294,13.348714045159362,4.079491351473844,1.0788660131352146,8.15369577236051,2.0180211641062584,0.8725559962153837,1.310794355101272,4.365997702246904,5.8198127034309035,16.35466207855271,13.153890657143805,2.9920254895755045,1.5653532337162417,16.632585734858708,3.824742702580897,5.790004177525285,10.568379988219895,3.968767107754945,1.0765002625459235,4.330487107827795,4.890455262676161,14.822807333515149,1.378786673119771,1.678711160491095,2.239021697964052,4.164980402087785,4.728547450874419,4.222127622917373,2.749483797603655,9.152656012550931,1.9167768760317347,4.336090207637609,2.1462505627602404,10.936979633586876,5.725847566429437,3.574784860909433,4.813123998962027,1.2812468644986679,7.228118703057137,12.7259168203849,16.155902804167752,2.3210297047794954,2.7698456294118174,6.306080643069475,6.330905696929316,1.8032757672544204,14.370297787570205,2.985839280878559,5.031639748316474,1.5801011358302939,4.406751932214466,14.482581998914458,1.2849475600477116,0.2971260793468008,7.907555597001272,8.224038234936858,6.97658682217535,4.790704823547243,6.7515549964285615,2.694830047571937,0.867966126986884,3.2552748133074623,5.616731361111757,7.80494629777065,8.827336569579348,2.544545281974094,10.050413196416166,2.68648933993408,1.2962539274438334,0.6029277058402702,5.036712283462036,3.156440960127287,3.031490590594377,3.9842531279524476,1.3676595194271566,7.644961466115888,11.327644724548229,6.605528495529314,4.581914027606551,9.53414290045346,6.34432241929414,0.768558334611921,1.5350695633309706,0.9252834616762033,1.02428973273667,1.133258738537203,1.4008406298503273,4.174134510906786,3.087320873953936,4.372602833233718,5.958831798105206,0.19925370817864832,1.5346001132186917,1.5784325396421484,1.3256737886737366,4.626537377832531,1.1014876731664924,1.2307895824193704,2.665334972536057,12.76232945665719,17.305358217981958,2.4800105350883355,0.8570653721379353,5.162704207796656,7.137999512802678,0.6030429890523301,0.7152995073809539,13.018619437822347,0.44023339540022083,6.0604550399627675,2.0068147859305046,17.50055971103602,1.1503802353760801,1.7891894857422048,2.935239263360722,0.5141761983117019,10.3004570124905,5.2201178330477385,9.2557704130294,5.542380735509184,2.834055362208386,5.1301230796808985,2.2674291425041937,6.113992090581585,2.067535534950844,1.8091703204708387,0.9966019495647512,2.725394964759505,1.9921291131189447,2.6095086711045457,1.709811584905625,5.589736442755795,7.6871009178383245,10.196320072570987,1.2625336853878157,2.0819096693294705,3.0260871615844214,7.396501202295514,7.178545197746393,9.530806000806617,4.717488930439005,2.4585939129819776,1.099956241048998,13.47278939481154,2.6975278599403163,3.2983289620410363,1.8771619399763027,8.899099129234601,2.853580010033454,3.5086112251998736,5.133141435084243,5.936620999050106,0.9424400827785337,4.9381506422679315,7.720493744610706,2.4919668817895855,2.0566615258202097,7.064733779727221,2.0488683938966115,1.7953716399628,2.9051996542185234,3.6537919473288527,12.502043984549507,4.376034994325091,1.5290488750279567,12.064358895706897,2.1788905529261147,4.485729306823957,4.9062922017990385,1.408474194175956,19.052226615810415,11.278106688730789,6.995909695645746,0.929424505793232,1.419117855233799,3.6890165171394966,0.891206853568958,1.53813155401407,7.474386532351527,13.75258733420392,3.4163453006372873,4.391394953454395,8.66852594902469,12.534120905195337,2.539896552146522,6.598155062783425,13.385479417043102,1.7637698091390244,10.749887812378763,10.991470615007078,8.181051433589893,10.536539890625068,0.4713815550764188,2.991159783184541,4.234824740377949,13.981066919169663,5.5603736483655535,12.91694520039693,0.11607872823338611,4.719275840972822,1.6048487189536762,3.5875427079863695,11.139164398099428,4.635598242827952,12.096834447270588,7.742099038953829,5.253691805675074,2.500750451581322,4.410571871982292,8.889175333310547,5.031727874762422,7.0275156397369996,9.007595538736425,8.817391806949155,1.1837381305476748,7.076567852631034,0.616942315469517,3.5985860447026283,20.19345327092161,13.356404349781211,8.86110787986055,3.002705781277763,10.21161473126789,6.7182229240688525,7.150175858398383,16.4485469863763,4.070077284694068,8.226117853577238,0.9932539595772264,0.2673143760901939,1.2812249841828431,2.008291791697916,2.111243115670331,8.49143249812085,7.050646368350709,7.09465803722786,10.719033963965659,5.859391931937049,5.383350878466825,1.4019742987550683,15.44124093297497,0.7751993313292002,1.4808517540235038,14.419334613985765,5.375924142787412,4.8004930972760675,10.92712980364636,4.5868780157712505,12.783558430971768,6.133147169237553,5.7674867886294265,8.505830096829195,4.103036672694532,1.0510142585660749,1.5920899939424957,2.2996552549912956,2.4711959837510307,7.834701666444554,5.207420018636093,1.886534071041402,12.614451224323918,0.4719586530235579,3.90293681431391,3.2845816754520483,11.69577477783236,11.179049308894317,1.5169588704123353,1.0190319791336435,1.7892998699308844,1.849694413455771,1.6771076327840082,19.04412233282446,6.476485102137879,7.444736068508594,10.453404100765407,2.9902951035501566,1.6155396139364282,12.946764015119811,13.840409895316649,9.590531586739553,8.591121447151503,2.5260238450259,12.597478721412763,13.117286692670895,4.608599434728676,5.979653851556183,0.3913796563832136,10.06706347411225,2.463686629173084,0.7503922669531874,9.315396264407086,3.58166622082725,2.67754011817936,1.3511118534102855,2.0560028398675327,4.878800173436966,2.8890613274845283,8.867980030515941,6.702686449552845,20.124650048976758,0.1982243352223006,8.353374826952292,3.0577242171474768,4.007344718121394,4.6516510891496345,3.790496774798868,4.305688667014813,10.687089671088849,0.261391213204196,2.0120883500046274,3.404223326533964,17.43037705943112,3.564340822547779,1.0047152934503223,4.529535034099922,2.803551938799986,9.215828466868274,9.916404752915428,17.25553951796194,2.937399927837067,2.1055975637165654,8.52703250026817,8.199951276696762,2.1567071210517845,13.955404507192318,13.526454561185489,0.8759074357749064,8.853662276228096,4.240647055872969,4.535382379052782,7.61542730244983,11.686102805025435,5.047199546921044,16.60521987261515,1.0180125202227013,3.8064511904807468,1.3900312308819907,11.878322308573196,4.661328285685212,3.555269410413329,0.9718791430772653,1.1568295596229001,2.8596007980852436,11.950463846175957,3.701792249536407,4.755706674522476,5.812143340187521,3.5018113299659945,13.525228426394964,0.1274516625156476,3.224946201382207,1.6593578646342813,3.1338230809621876,6.9705814907337835,1.3312788631355044,4.198715527734533,3.8632587305593384,10.29869913735036,4.560466776878694,19.274374732983258,1.0477077769258232,2.924055041839231,10.414639904759863,3.643938633727389,9.122365828034026,5.303764669137583,6.0830877055146475,3.5804779744671533,0.5132073648026154,7.155302611396477,12.305500037347802,14.13224611154693,6.564255823979325,0.43028974350252414,2.1037888332630996,8.617951625279606,1.4968493434680394,3.649142303857177,2.8644271239026873,1.2382087587435526,4.776217713834004,3.9753964404377378,1.139271024684069,1.257332406728099,7.210195642187869,8.300135568510983,2.1903779336194438,5.2466706868860955,0.8448121908958414,0.825196222420241,4.083670241627914,1.3233099224486717,9.636619389786667,1.2583353930252517,15.019731828811292,13.350709512976927,2.573741232578003,2.8053483084262028,5.601020138359093,3.5613529553350185,7.477531342548643,7.213623604304334,2.6893241533218673,3.111240279880987,13.968250963703339,0.36337032103126693,4.990386148032749,6.863866384319705,0.8537606160647326,0.964163399784888,7.262009757496571,5.6943504940047465,1.672729604702498,2.026624592774906,9.061519345005355,1.0211536057002752,1.3780435395428094,6.554784834972028,7.4555381291467056,0.7577837194230038,1.755502966827785,7.873056158758086,3.0855824582394034,4.678487351709984,3.500608934088761,6.972416877053682,15.312786910751813,6.714961777326344,3.340656717699608,8.251967089130707,12.060349348345431,2.3494212251741526,3.1694591975639677,2.3919703322071615,6.017505800210175,15.692060778505848,4.800969275411086,1.8099056916188805,3.8837068565908566,1.1308470044719054,4.999709283568689,2.596052392307749,5.033126116326374,6.431128317903702,2.467757723721762,1.8734468165267564,17.13410302864019,1.8513088513475382,0.5888629329232182,11.458167883174983,4.965607644757727,0.6817339641158114,1.2671497639940363,8.242096128792099,5.1273678299067,5.178883890617496,1.14236703502368,0.2916235762458327,1.0147741342864645,5.576708721522603,3.859486959925466,8.926756614015718,6.391137919766623,6.289860233451622,7.524878948026187,6.6005265980990675,7.5373658170447415,12.870777986284885,4.310732006508562,0.9376068006369355,2.0406858185811663,1.0130104457550326,11.31609820766301,3.3565111465312256,7.307488360078613,10.391893008937906,2.7270358045107983,2.837362133813018,0.9035529078847271,9.413605255794224,7.768046197606859,4.631506120785024,3.276179000543311,5.291622251509825,7.305087743088954,11.25213944781567,0.7999718538803733,2.069034372888521,13.108898930782427,8.78624297485455,2.5103008898337498,7.860981443796165,7.2636444297087825,3.618139111050154,9.34079953477775,9.565472730126947,11.23890842550462,0.12429871793172104,4.075977831593638,7.799506465062797,0.6993734089342738,5.903062653985289,9.23582942244671,2.1725737334495405,7.976472883008396,0.4580728757519209,11.881665076434203,6.088288079079936,12.006228702416676,6.271516766160381,1.5908953309029603,5.08742066194407,4.900580421170094,3.831237017707507,10.061691993179206,2.280998930856573,7.86046428648382,1.18267726653775,1.2987915008177624,2.3293639734130496,0.8857666738682857,1.0558795232835505,3.9545607241520804,19.29144358291421,3.3965006251017784,12.500339548696711,13.146410141751348,3.45862372096586,1.4001024345018829,5.923934224457848,0.22530355952598236,3.574064939042483,0.5540692491946853,1.336242734847482,11.954711194816545,10.465719200064205,3.113800271472064,7.063954850589855,7.040646184728587,12.743467167606237,10.863247515622188,6.268579116229813,1.3935055526799371,1.7351698732552752,13.507992764157484,11.20287060481698,8.899191220526589,6.123418256666495,1.349381110351675,7.010803705870217,14.79225891494492,13.69627473999719,1.0620920224585042,3.145856904659283,4.226110802005436,2.5675612675326818,0.5851895061153845,10.64439273837414,5.330067497927481,8.217732161291421,8.073773021964845,0.899063280130737,5.200234521592956,15.435666443437366,4.1344406074766,7.7946068867063305,0.2148145359283854,10.087147265161299,1.2202647712886152,2.456517392346191,7.0678123293434885,2.3751807716422775,17.907922892276446,4.095384979220768,3.949617916087953,1.4152718265619282,5.2295118505968174,5.386583863671703,6.071279582912115,1.5826272448547118,7.648249008993531,2.0733829162167536,2.6903411171628324,2.306756774484633,1.5914015383785212,5.095930552214353,12.780820318561434,8.830804704507846,0.038921595266692866,0.8324616792623285,0.8907949180401309,3.683323499199241,1.5205976458102142,6.142810801326675,4.890632143183396,5.078878920911802,2.8542879215153287,14.276937880434675,1.0184600213390635,1.587742638373156,3.1282500066437446,7.600229807818491,0.8057059113857106,8.753819989928774,1.1189322114323152,0.8309606706631127,1.3819830517757203,0.6976227669583837,2.057171096560368,1.2401375538964208,1.3899577149233902,2.7579476211594205,1.2730565004692065,2.3921786554183555,4.672436822148969,0.7182431217321128,0.9504688997704333,2.61042798897005,1.7106263659324725,3.5466698247768624,5.211090428166026,18.045604709142417,5.999321398106305,11.194682692975672,10.15230791356493,11.516771414082937,1.1754320894223818,4.414709580515524,5.027875215425766,12.802002492769411,7.8708262257781705,4.633082239111815,0.570843891452184,6.148176605248233,1.6025123863494788,5.807241646880878,10.302863332244687,3.311101856617868,0.5225431563817238,1.067241072123912,2.653274494108166,0.050857438158488755,0.5846561420617675,13.638015140370259,1.6538625907446196,8.074272271976772,16.06266704100825,13.84958684701099,2.3415141310436756,14.547071282411295,11.218674266359947,1.9026930468187135,3.538817821225786,2.018773761071075,6.159123870149251,5.623528012318757,14.306491548658562,9.271297068637846,3.401827680798436,1.0569352139713548,3.484985320436819,4.638499141190675,5.861823793542474,10.288449512997998,3.579268326244229,6.888043854876254,10.74915524112296,5.005597786005379,2.827562520322931,12.48283782773841,14.833651213963693,9.14724154736572,5.336012058716152,3.7936959092307534,0.8653000583289374,3.0128891090713994,4.258930235355054,15.311003508902841,9.144411149295237,6.4732367708511465,0.47632298485343616,14.764739689029623,3.0665111130766327,0.8203372581946704,0.6953528846405621,1.1459025091089883,8.750485178031585,0.1645105560846882,12.637627052229822,1.71698744656049,1.0051214968332576,1.2787774593209407,11.166505831065408,2.300038899891387,1.4990994383081047,3.834493374368222,1.396695380230975,17.042681804220482,0.8857773287491931,3.8647499572485056,4.056663895793882,4.154030531610183,3.1085073863678487,5.865088211890392,2.641377022213865,4.700279513022232,3.7674558730435077,3.2527624863796394,8.587362350520726,0.8789449824613125,6.163033024163267,2.3359183677502253,1.544789328001304,2.8671100713882494,8.749341185875569,4.5238421458120825,13.992661772276897,16.09917416701984,0.981535320625483,4.953823582332786,5.748710930947237,6.009455615666975,3.6852356432419358,1.2510279539141618,2.683954053853357,4.118322703154634,2.4890974739839846,13.505744687581636],"s":[0.4594622516772118,13.551180545790583,4.966068952280254,12.317578312750484,13.41439598722966,17.324213048899487,11.094573788765882,7.849378462206009,18.05755385335449,3.798626509986711,11.80565370470946,0.8632957051289258,6.740292853615157,12.243080313586802,12.372359717821784,7.687334435267852,7.533584118733971,15.834187750656072,7.589138239092228,12.190256942912656,11.379269863500049,14.221654878005744,11.520106707703416,2.7484274340043413,1.1078577900954967,0.5821809556757218,8.370471279961214,13.583844092149956,3.5130759152064073,15.259797630330954,19.774398622337838,10.344793150464016,7.358678323102823,7.149486927019542,16.99418790719992,15.933391405415263,17.22149184155859,12.428873443709847,9.739931341152154,12.710002758754273,19.979896981956458,14.265585899446066,13.943804683212914,12.028314060624217,16.20237610599108,10.777137346526388,9.073469968591032,18.685602836918353,16.86032363735908,13.222082800581369,18.783023913093512,0.9504309053748239,18.623673194187297,6.227763356523606,18.059140263036745,18.110934476751915,7.90460800861895,15.55501769322348,16.645066584689957,8.164568598587572,15.144190344052063,8.510693020199437,9.337785805671906,0.07770897328000625,6.838410117694855,0.5304677272774905,0.004181703206049825,4.723021841587918,13.557377864652276,16.9249143126752,10.250966037083353,6.2599313440663495,9.958586036327372,10.43169036377552,3.1554302040130855,8.497211556445684,17.232224010335763,11.055748286675247,15.532064727330548,10.067655409695583,9.640080954402528,0.8906172486286223,1.0536785414496785,6.702848874239082,18.510624841639583,11.315472295045556,13.984713109593368,15.626085741586678,12.064956291204677,8.4395026028437,2.1409453397827694,3.765749125812907,14.140963520105188,2.980574150031905,8.605556970193046,16.372515123305384,17.645065824560973,16.771722025917665,7.347118343663297,5.049897035142332,9.484300553249966,9.360605416986978,9.102581017607152,18.764601222947466,16.288004506005112,6.400358235877821,4.5640775469191075,4.434130042800177,5.122872648457841,13.403742826695598,15.442043476942109,7.303273352172708,8.755916072380296,16.034032906350188,12.631482887620198,16.552772193178015,4.865083542184849,10.602338083119655,6.422083895176267,14.925379365004442,12.892148874918007,4.959326831392072,8.491447628077848,19.463241468482856,15.10295258416365,5.552312534219115,15.963708278200448,16.797903854309105,14.696103191695906,7.21942012952804,19.81682103535601,13.86183318550331,1.1916205171129324,3.8397179216554234,17.761344910842432,0.06520138709945389,17.78146239046885,7.583157061730965,9.053959286846736,12.229224376481774,7.147759271854834,6.937255969512299,5.955619558811547,13.084786947603014,7.415501131991005,14.346382783542428,0.5258819889028876,12.27257967362581,19.656600913446304,1.4985826081422982,16.80217967032901,3.381674147273137,1.379851894772286,13.770552282955698,4.656042468953774,14.24738163483326,17.885157554750073,5.289413657696325,11.614862256686425,7.234997952765974,2.1586824672141214,2.3102039474708302,5.168185687624076,8.484423319415658,2.587377947495484,6.995774472999767,9.819195877610195,0.2939942850983579,4.123611740896793,16.120469261922103,12.7758205589917,3.7620175902987807,2.8203636080693695,5.820523169893286,8.074016448083192,9.364041109936414,13.528277524836426,0.40075828387621915,11.352831241498432,6.485830981376854,15.042814542683193,12.573267707306787,14.760335401251417,10.922195212387011,5.7124708234627875,4.939345378880011,19.64724038368198,16.282807745021643,13.42284724092643,1.2985727868396602,18.40632480531191,16.825552580244988,11.930917113796689,18.233962692185486,11.5803566262678,16.467058680496475,8.640276270567927,2.566134165019567,14.86448002180893,11.873946496322265,1.8101566206355102,9.064097613425158,13.272951770314938,16.227024785557372,9.506328189764673,6.777457311850541,5.883431862190074,10.087692255408385,18.204176891511867,1.248337964808739,0.7345277944914619,13.046677241558884,6.838059804894767,9.969194874482547,0.946743442004756,10.724719033084185,1.198252001161344,11.543299143067625,10.754223833871567,15.66188153052893,10.287907741060769,7.460354099594766,0.5720103463109094,18.951628345547114,3.323069307230049,10.888176176650441,14.535568187083117,19.049798019634064,4.114363033465902,9.73723340575738,16.1549446860976,13.993735993025215,7.286485576123365,12.381450175590093,1.1941696360993115,11.793666688643633,14.606404705512968,7.811839379886414,14.946923329730248,14.689906126026674,17.358577758118795,6.885639320743584,1.0888042775734563,4.904679260724918,10.327884148292954,8.583130359036808,15.352361369000347,17.192997639008972,1.9001640841415623,8.19475980677228,7.611420683420551,4.347066551314986,12.526242635360841,5.30357246459634,3.428254939080433,14.978211715044338,6.305320805292487,10.428908390745026,7.213111545457842,2.6826762391771553,18.05885469540437,11.264534374060338,18.57910658613024,0.38714547452481707,2.6956215036541264,0.7741987421320262,15.881444388323054,4.010084340201376,8.345439921351797,18.12995808428782,4.923274056971998,10.530235037661505,15.793092469649835,7.768940185087989,0.1772998102973089,12.199646663506144,17.905859323315223,1.2847035982800437,2.305687283150033,3.96266425925786,6.420070973826686,16.675917696472418,12.741945479227553,6.365179782900947,0.8261180433614035,18.479536506823095,14.654946213733782,13.344765707673258,12.667197172975673,8.91120891761867,7.798256609301357,7.169502381043764,5.451853628659404,16.323805336087744,11.065173641651542,15.212096361041517,7.395718439115897,15.086323119791857,5.264054317024671,11.88151290867899,4.009571590053143,17.550488751570317,19.849899212889042,12.493727801911625,2.6447039450016785,19.183439364428068,16.539705230121186,13.354760560862218,7.1653751855333025,5.265521279186376,13.952467623948547,15.366322536818222,16.841510495631905,7.194381018337688,19.386073280817335,7.703403325244529,19.695362605696715,1.9837926044951626,18.682793904463008,5.312578617947543,8.13172556240039,4.032695660092749,9.309606608238138,16.017450917632953,1.237886790742495,2.910859702105051,16.139828216139158,9.637050963658545,6.930511513973703,6.202434045667107,13.476315689451312,15.390149947503996,2.341516272595725,19.010999022199474,8.472183599123664,10.222745857630663,11.43879915216544,2.1300667785146343,9.620195060895869,6.945299216313066,11.179864548782778,0.2624790582823078,6.065851097554225,2.42345199377596,2.890079861590582,19.448540873232275,1.0716270594291455,12.393345561823956,17.129486344214865,8.176368066472165,8.446091704608897,9.79590391801584,10.273999564463626,6.019689197940705,3.2617890555639573,1.4695277371716164,4.995206905991969,0.5229244264549093,0.8555811117018086,4.649597554102622,8.992557683033269,4.931337675132816,8.416878328406492,1.6269201372231157,2.2693450227119305,15.540232231321749,16.909341711104812,13.221311596940186,0.8721317374574777,16.81006972324656,8.578821305022348,18.598690173829354,17.292486027486625,5.049957336730682,0.9003010085136731,13.566768010087461,8.048277523143351,17.767777289720932,7.316896576252825,18.727122016373016,6.339303437639656,7.0887423791851,9.589313339729628,19.12115813774045,4.87650558006445,10.573367222004668,3.2630559373976853,17.935569487810948,13.087036178764402,5.613890815058538,10.26085260420475,19.155811888761896,9.088930352661496,8.068134503785803,8.341218326051667,7.330454273261604,6.431989461000507,14.41339258114757,3.428666112348102,1.9466298902241608,2.504954908986008,3.097309661453873,14.202032997562188,11.93704716374734,8.784826947307508,13.514706896330138,11.014315541008347,1.59003443589945,12.052854914461744,14.297648038379464,17.417109804361584,16.788293808375002,12.143689770491136,4.930826562236099,8.696446102167101,15.085481143425422,4.235193220068578,6.586939174537245,5.356942489817689,8.371264658056031,9.97564156897328,17.41019462754393,13.227650424093728,12.313941043721917,13.743760381303085,5.255081898814047,17.907171061805155,11.57956994345648,6.212055084105095,7.167192873494477,2.9371235978070365,2.9340008287328745,3.037701578830756,19.138430379432812,17.078565824053822,11.132994925507615,3.815996112712301,16.90389337935567,8.137439506515825,4.774075073503936,14.955127625708936,1.3691556635186153,19.924392113826453,12.798763093721067,10.610239162735864,1.873870810224978,1.9225462590912157,18.399478279480796,8.009041657156502,0.7347279625595027,10.310935015537975,15.148949799340858,7.857443680886345,12.486867803640575,13.51135567477976,14.727782083514903,5.026381182385786,7.055414576703862,16.19526184498678,4.045988599996018,17.940190023344165,13.100070224227597,16.211602667276622,10.466980661178823,14.047057487814394,6.658082762042663,7.810450327540854,17.344527994295788,19.177489593087337,13.13204855903923,17.444800847164025,10.972142732607875,7.626035189390192,3.925055580332648,19.446362772417043,10.888836504221722,12.524887525905516,15.965847913226945,18.269842193289882,3.546039540927244,4.4605422274680295,8.577074863010207,10.91901805901812,14.248598081706767,13.819903895617074,8.77338837338398,1.9591921622508224,19.276836733825682,0.00028611604437234206,15.232522191913628,19.74219867648674,13.005735646223421,18.331481538913525,15.832634785660623,11.137300905346837,8.822649250639296,11.409364358075562,17.72595251441568,5.915243701693891,12.618048153703834,0.425925086577843,11.00125226177914,4.69971657473335,13.742390809356513,4.708341961830218,14.206560521891024,12.028725971529699,11.545272851050798,11.973699337591297,14.082367337386742,5.146820009471869,4.918208461693849,19.090644023369126,18.88371912770277,1.7871221643355417,15.995088801243584,10.481852459006769,5.925783571963388,17.30092849454817,4.062510435992848,15.37296846050483,15.228063830862215,13.269000140224136,9.93668554488423,4.552603590209658,3.347117587985422,8.884840264114171,6.507380823860425,5.81175402086171,7.311118008316759,8.790590870971684,11.782887983030799,14.262224994056973,2.724898477989539,7.743569102756505,3.33456765258636,17.398139673827213,19.28612034834999,5.32491726336918,14.749902199225765,3.456601187933619,9.596525172445016,1.7114412587716465,19.16338987374465,11.636153352132052,10.609705429205434,11.774489194928833,4.07625070642494,1.2290415260607945,14.326565464157799,18.098870277894008,11.173896730165346,18.019919577369418,3.9631950006845695,15.17571091548807,13.757134631549416,14.300988027139514,11.81567034852646,2.3985264787221183,12.304804869363473,7.632966721521868,15.294500142943836,17.662541339459104,9.868749746618143,11.794222547687747,1.7538027654016641,10.970018435921824,8.403352912196581,5.951211277687665,14.017083668495678,14.055971091195843,19.925252719699337,11.379974425094193,14.275713995481464,4.676593091216739,4.8514837771036134,6.629163213260321,3.250046446837418,15.675952731712686,14.757205276031215,0.7834583778435089,11.859412651460115,12.63995190679787,18.139705098841645,7.79296114217765,4.300817403403712,7.700481695967354,5.883076640956064,11.6848891226199,11.003514530120494,17.062646833594638,2.689968053639822,9.830322000563957,9.24904126919101,17.926268914057868,15.008292559218127,14.327176793643247,16.012593409044378,2.072347443830447,10.683153297040358,17.1487412834989,10.436221135624963,12.275555460008167,16.377605168391092,6.163541495402591,17.104973542539007,1.217734129113408,3.6162328912437847,1.560772087332305,12.678241068770376,8.541909202849926,2.900036246309603,0.5449597260429151,0.4848978403618309,15.816280914845562,15.104412627960428,6.264617154944783,13.489416321571932,18.405187664180414,4.5357091339271305,15.72875712221725,0.36540045779591246,13.47594314044851,11.75389998325301,10.796382812703529,16.58699198445872,4.174114558209916,19.320084457345814,9.26225618027905,19.136807087614418,7.357682118962168,19.392557064853413,1.4108024972967703,4.962258343033303,17.555004901463928,5.899512927359312,13.376532203101057,18.03194951879169,11.611509901995962,4.286868570210558,0.9272835151585879,8.322816997201308,17.864961875811915,17.3200843760069,19.672149363462104,12.397474792581086,2.229962421935423,9.023146430563123,4.657995076530286,9.122185331619065,17.022372178585023,8.343081904892443,10.926097673498552,6.928646673715506,5.55496868216053,7.004076771232111,7.197306252138027,11.451406579926967,18.397699896299788,7.007670670445192,0.1516047935749798,14.351052878267758,4.53966771443802,19.80143300115159,19.451058434817746,3.2590858227684683,17.973572004462426,17.235345376295854,16.068662563745498,7.04099582638718,5.59006190205162,9.030190376285766,15.02739788992102,9.854945128579558,3.8812905312571866,3.4224508474406035,16.221700650747465,0.4485797991445972,14.467107868975217,16.06900954316683,0.3459930706382375,7.01215590005456,9.59750349553703,15.416690912717502,2.7041319875850567,8.123713186936383,8.505408250220107,0.8309187213742186,4.547967165827962,14.994483579216183,18.528916500864334,4.220325987282201,7.820098133574804,12.381661467103271,6.580062614261295,16.655883659170918,5.705519540966826,14.754322090338196,18.281010897888194,15.47627735064085,12.128450903421406,15.624271108835956,12.777817429093389,3.7904793075704024,9.781912642103228,2.6279714329371506,8.954263424272622,16.907166522722722,5.4507894205269425,18.68631098436684,4.153342097851338,16.750344973172236,13.13993588262861,4.098452764991318,8.662430776507337,8.430610852811547,3.872963950206092,10.55009729799175,18.91807762210835,1.9099127535689142,0.3418841513404214,16.053684937320163,10.363298180567027,0.5049642026712897,1.2664036533512313,7.79354057410901,14.255998521800564,4.824662351015814,6.138401865936491,4.2974381571426346,3.7230464053043466,19.97434392604646,5.200902501997122,13.720740438568706,11.495157461779502,9.956388805343472,15.79985235275772,8.316955099244115,7.548482995694417,13.976594822359822,11.759504540379027,4.290833236848557,10.25362727143268,1.8005045693941568,18.91300286115124,3.77353366662327,19.275714408943102,10.377295094849943,15.661950384076292,3.2479606458385213,10.077273158939061,10.816044500927529,9.696608218296138,10.607908310873748,6.348000225170356,6.006772885669611,9.845787593734162,18.537431040781115,5.285239821819956,7.056265937396389,18.941150478004587,10.796822987475556,7.086323313380496,8.040629017926246,15.715799134883062,9.824579503212,10.441052962365095,13.527354358053781,10.943481301144375,1.4709482672147178,12.32703705030302,13.230761150472535,1.961333134951344,11.054641355914661,13.429391901147545,19.450203832699586,17.233991899111103,1.039120428061695,18.287625738198003,10.861452302628805,18.23886590025028,12.710104569628191,19.756978882005143,8.490165854710291,13.614547915936077,9.1418355375219,12.914128756879592,5.847782830039585,15.094847889533401,0.584768376861553,8.47213747982584,8.4364764492226,6.9743749766909025,2.5600347880709906,13.30485239505884,18.589256485334985,11.740363764842904,14.329102239787757,16.89280522133274,3.347729657324914,1.8447617454256493,10.381421050846154,0.18389906133227107,6.914838854982581,3.9322290857221542,2.314564997206401,13.563440568735796,15.068011589446328,3.2184267693593416,6.974127744781429,11.938513125605672,13.379946616693644,17.650206548063494,7.550284719360989,17.697205264835123,7.487307445537974,17.754300962128774,10.762091963738033,9.264961674558737,15.611497479679205,2.8744073502571243,13.77444322966694,17.16826735977442,15.983068783646424,0.35890230915941235,12.458249169024661,14.708509102993702,8.289491212525956,0.4160156825016159,16.46417227349998,6.0433551512227,17.17948171291034,11.873595040261291,1.3045747221101411,5.63207297585715,18.386091231206677,18.441591549617904,10.070024471637504,11.219363175397463,19.15747234895454,16.731972845624416,12.174146946901923,18.26322712042321,3.687918486353534,18.234858728064975,15.603019303129049,4.365756995973475,4.26031330866242,5.574311586410743,9.973139699453046,9.27220069271884,5.884767187840048,12.717562189624779,5.600249183661092,2.1066036499007845,9.310373007530583,9.270012610580816,9.25135109986936,16.503953648291198,9.300242690160863,3.0294660805057205,1.464575716059251,19.698430422000904,3.346469751247678,1.4214773496056843,9.173545831088363,18.37651853649451,7.94179254898618,3.60803551430513,15.397091641335617,15.562907395917605,1.5553040427452025,12.683108324399237,9.190735525572574,2.0652497055797925,18.91092308344915,0.35483153796684874,10.104533298577225,18.399025961234127,7.411158135908407,3.007786128233829,2.8835941562391287,2.156774547290956,9.990193008111884,2.698247744094129,1.6702260296499594,8.408139842159157,1.0530340105355274,2.178649349838908,4.537331638129136,17.91554098019339,3.269097997474919,6.53740053817653,18.83710779199365,7.867854699233017,12.933081130835937,19.754013931122625,19.438500938495103,2.8358397656823398,5.19071302175063,17.43890652752542,18.460493981539084,19.90345469067619,7.202701749079687,7.338153004828256,14.410169149972262,1.9095857887741952,7.309848507484218,18.41653690774912,6.798273633946703,9.989155024638322,6.37030902238362,18.981040533282968,4.103932750061103,0.7113526331071185,15.578986920357627,3.5122532602766965,15.303216562554622,16.830328976925564,19.741381979818037,4.871733126621174,18.550120255407112,11.393152670936214,7.40719746283919,8.36067130231655,9.464213879513101,9.512993104976681,16.41182778670997,16.038921990979485,10.276283341130341,4.206558708719186,5.394525904625169,10.484220990117192,8.034266326700067,16.827776132911847,18.62246299029494,15.451841183815112,6.78336890474402,14.064915847164436,8.784536472727979,8.200423076908262,13.84856488061677,18.250795944572168,10.423045809347876,11.743667284623198,17.850754249775758,13.73109932535237,2.953822054968551,15.712438078857232,18.826287440206695,11.909214479255494,11.698503471353924,1.7182565681385142,17.270043341282737,3.462280531629456,10.010114391411271,5.189448655995812,0.9661077760993564,16.90330577815498,6.190659603964441,14.010704325736443,5.09724664530065,19.116252733196962,0.48991911271368593,17.201700856051943,4.006282902889744,5.448685595696738,13.687818924841446,1.7835767948484005,19.258071187890682,8.460551464314005,15.808518788965094,5.986159736786374,17.882968724683224,7.396973239457116,5.58613598946283,10.701294745860848,18.940501460131124,16.69102152457779,9.700219176301044,19.57724152652829,1.327876574360407,16.93976258185706,2.217249667103629,12.564644095056083,3.119850479032178,15.951228554650978,6.214085000640082,17.384802141117113,17.873451638477114,19.710493125593107,4.7378334030194535,11.842626589303649,8.444945107835004,13.919180810998268,4.018494729783337,2.9874869198528398,14.978846379929657,7.553591783030695,14.986596798260692],"mu":[0.36480312895628053,0.9476665655489045,0.8394183019761257,0.5589104338310367,0.6404550046231963,0.9816650915991414,0.10310854357204091,0.30177810018716067,0.8794863076976687,0.18351954148325778,0.092596444692425,0.820580955446762,0.11834630823876768,0.95491813162297,0.826980791287937,0.6065032198945703,0.5184095273940175,0.36339663930077015,0.8670977316885959,0.11978050247943872,0.384676978603808,0.22279980022460255,0.6202339498444083,0.0017053823613362162,0.37217491119209356,0.7759679196355604,0.6586282384318116,0.7347094313596882,0.09970199652479539,0.00360617852251921,0.3575134521530332,0.06343604482632337,0.31291598241212304,0.4448947669554857,0.5915493731484804,0.8974663794618307,0.12018929918776444,0.6584494972793484,0.5106523113214896,0.04371844616810172,0.29979758851476124,0.7374287283701888,0.21065708879370448,0.1405363350364015,0.10993274307000611,0.2654354492830946,0.9364681142903286,0.17855763727142948,0.017561562750125104,0.6946755823318982,0.648187214817276,0.2194676862590048,0.887999831613937,0.24571569746997768,0.24557037386063363,0.13275961034161798,0.7455741408356416,0.18608607089039242,0.42463229053690843,0.13954072593659683,0.9913996503161093,0.4568398743627855,0.32800190685071495,0.9078293423191741,0.9140006727682797,0.49250691714338846,0.9048871065405759,0.950892772652687,0.9640883143851586,0.31848643230567775,0.6724625973992446,0.515563240920963,0.28326466148276896,0.5101983550268505,0.854894835332382,0.5428695343800092,0.18216814330723152,0.6360368801972953,0.8423452448230464,0.16490822956451168,0.5447107515654783,0.48683906998751914,0.749360480357518,0.5340649475283337,0.8285907880191099,0.1940777030063341,0.4634125191392091,0.8410121029088267,0.9692307121471555,0.7683068493023404,0.3644602901938483,0.958561191488368,0.6035054035504246,0.40356138437772704,0.8496205789181894,0.1933089007493467,0.437789315239445,0.8558485902701087,0.7649239615598808,0.1861481398408018,0.7635593269799694,0.15461093881798127,0.318970064651086,0.8447491416598876,0.24977438041754207,0.9632785916702691,0.839038318415368,0.9002878888229271,0.49289740890787725,0.38938172243740055,0.5010923134163878,0.9132366723424323,0.3822102378723149,0.43093532951640534,0.7485145445995949,0.5741485967528921,0.5110190735565123,0.8706465337567713,0.07651364404963612,0.41793534976407964,0.9463585752258128,0.43133452609004386,0.9960160090836392,0.5462380994781117,0.13678858595528487,0.3056978465658329,0.9307265175348005,0.777680634264512,0.5595199654116632,0.7333318500181962,0.7883609324594747,0.5031283392384105,0.08010715276723723,0.4834764151608133,0.8889722094510888,0.8574889413203459,0.6727072746765352,0.3648829344373574,0.3408460889732403,0.5766782545789058,0.35728423042011315,0.17080815650373582,0.29262287178464375,0.1475537219688816,0.36525071025842504,0.13934811641667388,0.5897099172270497,0.08207352168565718,0.12310521453687184,0.4418361409853797,0.09429134662860439,0.030297073203371827,0.9288482902028088,0.11045113848198551,0.3013189945793111,0.0009977846024473713,0.06313956059738901,0.0327231263646357,0.4882455846842555,0.7345075972782209,0.8579299294277645,0.7447623714905678,0.7893350228209879,0.5085444578426763,0.6595056085882995,0.3129382242805976,0.7679218574147584,0.2843759889702284,0.2329261454849303,0.7725080210692306,0.8949549622739017,0.7046318321047123,0.007147256678087022,0.5120642258451675,0.16099474420696014,0.621315988353512,0.7390568051195494,0.27706918057707974,0.27362167645869295,0.4593907819236531,0.40053642923987076,0.2691938787065751,0.6228496879786969,0.43113275039239185,0.24968962712076803,0.1102951698347312,0.18204896337346477,0.9128143308595542,0.7270123216530544,0.7743519705334219,0.3276334765023481,0.7033300134104925,0.6387170376951141,0.7827970957708863,0.5713130026484907,0.29306764674222285,0.8804116173742129,0.9508926516966296,0.1134965075335086,0.17296238655236285,0.7369353263923648,0.39980611134278177,0.3210072594441733,0.5025112329094465,0.8252875056586069,0.477991106121217,0.27352854547886496,0.5166527797566351,0.14251352931229078,0.0933967483689333,0.02226275844468173,0.295075140084345,0.08046459849919896,0.04136346214632325,0.7374221117453368,0.7217789906386509,0.7687770760020449,0.7161543109250645,0.4203840402137038,0.37271863161695173,0.02855919183133082,0.2922484581003464,0.9444026823423264,0.9569987655618188,0.011171792088329191,0.9340899827874114,0.9919910750619061,0.10007117712057911,0.9730203840988723,0.18804997293726444,0.7606242943104107,0.8946479621321022,0.8729923453723589,0.3144890798232305,0.10265235659719396,0.3118465947864868,0.07617007883030458,0.6537457134933948,0.21454033905502556,0.9411886647980383,0.8115856574215745,0.5042214277428412,0.21349474320663364,0.4169810867869288,0.21042067136887632,0.5620229734756785,0.6434416552412401,0.1975417163547064,0.7509115935125068,0.49697591798648855,0.6269849570138701,0.5032822909134484,0.7337227210600268,0.21352488640462153,0.7742006320020784,0.5170279117076675,0.33682644252562555,0.21680695090420965,0.5356747385708527,0.6526291362517564,0.7583573609083676,0.6962350244850335,0.7306921658982233,0.35937683904487905,0.40472033196519686,0.057189690957108796,0.021467012546994235,0.13733605905365787,0.5016130405084931,0.28558297617576267,0.0995629766142081,0.32278666232199194,0.167354298202673,0.4011284143520826,0.9675307968828408,0.8435875704926759,0.6413138750707972,0.1681808712437005,0.7322593277274079,0.5062163383484011,0.0033450535692274297,0.47126527662763484,0.8674924526353325,0.785967952672586,0.8673116874328168,0.867835314397517,0.9037028795285393,0.981924967993121,0.8372316546317236,0.05215394226868919,0.03852254553850787,0.8411966726566962,0.9751577368606792,0.6192374194709322,0.29377349207112324,0.7035931316223949,0.610688926724164,0.2514390962899202,0.18084960143551365,0.2732606332822456,0.24878655628044322,0.553994673945243,0.5062784666642537,0.46766675663214485,0.0029500276387703916,0.7569172586915809,0.627744953185394,0.7004157029332319,0.8202055405777644,0.9241973981957776,0.9651397657163019,0.2830210051269224,0.8660506659709608,0.6471411717458693,0.5546041420506187,0.4184985615336889,0.1409473506026484,0.7985959376470404,0.2797013467747833,0.09061574206614043,0.7938863904800437,0.11299067792659057,0.7901297715794715,0.23642235310661697,0.8528654148421353,0.051746111915025095,0.8821356187096367,0.23756144586203765,0.15785459505200472,0.09109921697805112,0.026771661065349672,0.8718630077754381,0.8515804272824634,0.8926478641708624,0.35433538210637816,0.6839915499418341,0.9866887315913098,0.9377625700545174,0.530340317824294,0.4314843256266314,0.41447310201084564,0.5070363128652906,0.5178301383280128,0.895966655303629,0.4645129766863798,0.5531015591913555,0.5670666113625853,0.9115384350244982,0.7554251352114503,0.32432001571224833,0.39941095620839073,0.4148967909206249,0.9563279695002567,0.027331570227528967,0.2652155768797073,0.5797832313697389,0.10978465319454589,0.6525730700724468,0.6261239846085338,0.28490962607881665,0.5986290605060236,0.10929176104237004,0.18016011832878198,0.06051998746629694,0.24540631187755202,0.7198405555823868,0.7868119059393885,0.6699286694925539,0.27381790547697515,0.9850779451834457,0.03317614791357659,0.9557779980544552,0.5210018025415251,0.7878929001053305,0.4097540905439532,0.5344171214062479,0.10194295303883383,0.1945989021927974,0.21282758712397798,0.08147284019859335,0.20189526161315485,0.29216891238685516,0.26448783363163164,0.6572030343967667,0.6964689079298716,0.43000255775479856,0.11454582982396055,0.19860686246605042,0.36066286793072844,0.4055029390866638,0.788024392405112,0.1323948253316205,0.3683472968074979,0.8360466721111892,0.2686372311638565,0.15787188316732959,0.721955898875533,0.04980690041115965,0.03307610921822568,0.8028846502726432,0.8098729613117073,0.4426882071169542,0.735128717338037,0.9480323688776042,0.33869943374409295,0.8233048533591631,0.45645357316792023,0.8065329235143048,0.1620778394657605,0.49024639464060527,0.028936806404691096,0.09388970672639396,0.12820511436731108,0.7405167887412296,0.8658516097082243,0.8750053978718124,0.003938605956369967,0.5647106655616612,0.19866318862569532,0.7656947750063772,0.3306876407973143,0.5090877542187235,0.13940258531453553,0.5707469243906611,0.26759993054631637,0.7265505014310454,0.41351199930953864,0.5437768825655596,0.9940151656376539,0.6529742352736319,0.2615084310931728,0.0220792834600414,0.3297107646974451,0.03713762318286373,0.44861981226698266,0.5772480613598994,0.6525995926725734,0.049017699583215446,0.571912135480553,0.8401628805689043,0.8195333535161529,0.418338786277646,0.06943564860297013,0.829635679601535,0.32494360612662665,0.06739009514223304,0.4139324314213819,0.8189359641076965,0.32964629122085465,0.9013185962203007,0.3822367814421166,0.38997710106146877,0.8364355819541893,0.2380472657703534,0.8833541099098352,0.5335275104113957,0.5322897825658062,0.16116441503703194,0.8823012826333501,0.3940440261312297,0.5040560736423232,0.053658062567212506,0.6640302875982123,0.28552266607109256,0.3833175117649805,0.9746154008577548,0.1570007610427273,0.36559305180701696,0.50172642176386,0.6906566119093791,0.09480353578182354,0.8701568886601458,0.2603327813546381,0.11684408048894834,0.4758739294969101,0.29512470239999544,0.9123481389221719,0.18223690387294567,0.6390799110951033,0.8439124491580099,0.003272368865555375,0.7872681047010022,0.5322469461908215,0.26633754992422776,0.3401940070962728,0.27985370310420365,0.45882244859608345,0.3195386466204495,0.6168608634266621,0.405753617702884,0.8076437331378103,0.44798355164608883,0.8332333504362512,0.5932601042718171,0.2791717377143328,0.756634520403223,0.12996997933400167,0.07557177858595687,0.9643625190939937,0.4243917670281576,0.9492388743850071,0.13206158833245274,0.2966430134038658,0.01312456615547486,0.08418724848612169,0.1514656198315505,0.378473381353186,0.11079551362677442,0.5757013404840905,0.5101285253931043,0.5535410706745476,0.6911420175906104,0.4250148324133627,0.17097937129756313,0.6923006192385188,0.1895572314161671,0.8840675019905682,0.11547616751484302,0.9858502590968174,0.7222453542593701,0.5119914515107393,0.8698830464463521,0.6144181284399803,0.9018934744872451,0.1503193194910004,0.8215661971307113,0.039781142578419804,0.11914111974830455,0.9262761700717659,0.9414622952816241,0.26362294602866987,0.07154036942932085,0.39785794709811007,0.12062324869697738,0.6887435946466851,0.16947289029549473,0.7780586188342067,0.3245625208772267,0.6345288370703495,0.3276571706716651,0.3296275379404765,0.6025100368250758,0.8440131753926345,0.9617715343127116,0.9824263966589333,0.9592680213022353,0.6795108559852459,0.5911604831022845,0.5044842918182901,0.3539730796824232,0.8482335130594121,0.532779048058637,0.5643004956458844,0.6259988041910194,0.007054398565459419,0.40984234252085616,0.5316758085812874,0.31090749266239825,0.018612544432256684,0.7569176687799775,0.19879379123928853,0.34332050418690807,0.4555399447061632,0.16364284922644856,0.9557053433772016,0.6781085326982013,0.9123944129464687,0.8017716951288782,0.9126940609510212,0.06499621755505824,0.3808513679774439,0.9693301973504662,0.15021742749306255,0.09650939714174278,0.9654437913839451,0.6622462514830159,0.7169528861426808,0.8588704965638871,0.4692723110610215,0.008249644182883875,0.22599959284639204,0.42089089817327086,0.39014077315952234,0.3247344862710724,0.8238536433185248,0.9180183888206113,0.7645307665865142,0.08298350298611101,0.5556544820322147,0.95689941322571,0.66075123336061,0.6783164190257294,0.10262966939376494,0.295081889521839,0.6429370394276068,0.1539464182968251,0.02279145533621163,0.634482424854067,0.6116008642004267,0.35281776483019067,0.6527598973628284,0.6679950089378575,0.5656517602285065,0.8905885087473113,0.44401703636055445,0.584268479085652,0.8510930982885856,0.9219082158936207,0.1420403936978185,0.3241357046278519,0.6057151659223299,0.9707399665467957,0.6633731762998523,0.7823538975439999,0.3602299477382924,0.44334537497051385,0.18271706079340455,0.8604276747453248,0.08325626930437835,0.08491445243464835,0.19496038196884213,0.11676611648620705,0.30494789430331615,0.2228937635703394,0.6458231971988331,0.5369814008902716,0.2516327872223747,0.47541548181786886,0.5485461478437039,0.10824783570399243,0.16668322857923656,0.41483408336105776,0.7607864619513895,0.586183968479068,0.8777524556412271,0.6340594339098244,0.7087850693857951,0.7849125415523872,0.010461999805444044,0.9090304346884845,0.027113951415651316,0.03639171835767563,0.36697088868767147,0.08478090625143775,0.9455712065082225,0.1932630686713197,0.14418616906515735,0.8373928217003277,0.424620872247786,0.46280366874399226,0.41119147113601495,0.09239337411622306,0.17052844034019765,0.881372694388431,0.2262643908115658,0.9476154482369497,0.3354625972859686,0.18693102871654088,0.4313229510475607,0.21553618048448198,0.8175524447235836,0.36644114445945686,0.07076421914170261,0.5115687973847338,0.5967278170070853,0.7480159738071988,0.03168936744126283,0.8474502485082707,0.8985914006203655,0.9509239915997927,0.6399222092366268,0.08956003183249273,0.3109476860219884,0.6984479774431451,0.8816440788652484,0.27810441184272205,0.8892846491772475,0.15766636182888094,0.2579890512644212,0.18452663326869057,0.5857044579901822,0.4865653597757509,0.71608122889146,0.16964397979352563,0.5023927115773417,0.3769736491955331,0.6292555278677545,0.9118221496175878,0.7976577075479032,0.008025130970177985,0.7725141220595659,0.5370765296666424,0.22867449090746916,0.04091094175711829,0.9420967310776824,0.7030778909229993,0.4403393497567225,0.9789527306380317,0.2790560185778319,0.04075361607562522,0.6827147990536524,0.43038868886211024,0.21363706651499115,0.9397014809774489,0.5547846419978588,0.32939176862107633,0.4370512144433103,0.511323268328844,0.13665642877260908,0.7100409523929934,0.3101424486976776,0.19737885557343948,0.9370712496473252,0.5153103429634873,0.6545098907698501,0.22526268895143864,0.20596227015072843,0.33816354153156203,0.9076568621456582,0.8794607295865122,0.25033295422176116,0.11634452260765649,0.7472648175321113,0.30032837612714847,0.6512315604731032,0.7954929610756145,0.6921066361838697,0.6444063882466586,0.9655076116507664,0.0908136705160918,0.9010091337558745,0.795876433904859,0.5023989159910673,0.3865984262022184,0.5240887732743873,0.8774225360331764,0.09149101585308417,0.15483447078855606,0.8950188619071116,0.4108598527929803,0.9434312091987107,0.8553008686406527,0.9782697044429853,0.06146855492362113,0.4609053099906182,0.7674438241085972,0.6761985725078712,0.5313846315294086,0.14897180566370127,0.295492293774932,0.0004411316843291324,0.9766759652004127,0.7638735354947783,0.8532594615778468,0.4007530904230405,0.46897859390704477,0.9374024250036728,0.7816185165402096,0.770976140439434,0.11696186416960086,0.7625429617676218,0.774188448235384,0.8837250527343672,0.19598128029383943,0.7097492891524135,0.00022424337109083758,0.024942488968519916,0.5308037651449218,0.8110942106223047,0.06833623294260205,0.9458501272529687,0.6876751251733417,0.4939977987709916,0.7399913389313062,0.6697555226855618,0.49999236198876096,0.10688634959266352,0.032616895260353385,0.42716444725996006,0.6466393982314296,0.3852588256805298,0.2693157824211829,0.9344982829981703,0.8114550200993991,0.5006294433461311,0.7225122409556661,0.6287086409318128,0.47847094585226135,0.14071508854537296,0.8335257916729149,0.17662618539699615,0.4045427463843281,0.3060255261064344,0.131150098387516,0.8382590718717913,0.980714329533467,0.7249721084999581,0.3637728411496335,0.3426336743192775,0.562533241711356,0.7833210457716642,0.9943863003417581,0.0573649670206946,0.21071068618256517,0.12384632896926928,0.43390092815483783,0.5272573287624396,0.731037240411242,0.10690226005769587,0.2714439912259905,0.3872217425587565,0.35028003300687227,0.7578832039710435,0.008082160876902167,0.9419422099849828,0.9499387186795589,0.3421891776675283,0.6229113526132013,0.9304098012800521,0.13078304570664234,0.8189425154805878,0.038720233945393145,0.37163706660399876,0.7755567998049644,0.9679924978032286,0.6692972691914516,0.9405605084506143,0.29383542466556767,0.42073717790409026,0.8891601970189003,0.628872265626305,0.8136266499693192,0.33138464042327653,0.7084910420910262,0.558562293127902,0.36554323061309435,0.5880497581331872,0.6050697154826539,0.07262004981866976,0.9252972315723218,0.6253045648547066,0.6907451633056767,0.47517033846486556,0.18275983552644015,0.1086805276886611,0.01183874548384134,0.9097851906722036,0.8117188474769212,0.1474694012925173,0.604273613177897,0.9273333296779753,0.4678361337564645,0.6481759779046492,0.44715629604662954,0.9295663503789289,0.22843085409169994,0.5881527907460735,0.9694464221257113,0.2387736688804296,0.5795591731762662,0.011167625481116383,0.5419571258773697,0.7587325937437523,0.6665437152790776,0.3497788031140967,0.39509881305779015,0.8271217160467812,0.7804566021593322,0.7399198859316578,0.18447533890962609,0.5796221255044349,0.8874463491570868,0.04729346897133224,0.22979949025504154,0.23806944858634327,0.9165249516951179,0.8817087081677655,0.514603411671555,0.4201868381005214,0.4591055873814267,0.48290522379840795,0.5431608380991906,0.5554977638811334,0.8788612059399596,0.47739656148933696,0.9590493151626285,0.4467813946660051,0.44384677915170134,0.3248940247861021,0.3918703219759432,0.19181620562473944,0.954922403172586,0.9568362499513883,0.9340215159678071,0.5744689167810708,0.6915963081457455,0.7937474872455572,0.18784153391515246,0.1516446294040954,0.4784997429019713,0.36311913556381836,0.8569587973743584,0.3710250896979306,0.6309992179748913,0.3180725351966551,0.6377173113281649,0.21071852197861962,0.2560259519354988,0.0257353102762381,0.25724476741567437,0.4689411642629582,0.7396534574166245,0.4504733991877292,0.0007238246128100645,0.1411107458220593,0.0845740031655231,0.5732997906260309,0.4712197818715649,0.9256101127430125,0.7156280378234743,0.5037227378474889,0.7845923202633722,0.9306853965904227,0.8328692340392458,0.8478755299596386,0.9544295562337608,0.8258537345592147,0.8978569093630695,0.9275750521764756,0.2870365549885705,0.9312177242115927,0.15562163351987035,0.5660388249853598,0.8166155545550358,0.9386055884662292,0.054829374259487196,0.9218878849588461,0.2481023521522101,0.6296090604854072,0.5895854911045533,0.5475950904098574,0.024072745513538107,0.7610295956218265,0.827069798145452,0.19383086968172392,0.23674448637016354,0.057108991147409194,0.3158600964452887,0.3021794782462275,0.784505474309116,0.12313376649229557,0.7849864481848563,0.19234008385986412,0.6132583287734295,0.27083645408369117,0.5191966806514432,0.32829535568029944,0.31955310591741815,0.4448317936576225,0.13130479389739835,0.7147007371531591,0.23412991350519108,0.907567974976814,0.9043426837123352,0.27575308603805637,0.26797859821456105,0.8973421492864866,0.6951251058276255,0.4841467080547084,0.7603944561919782,0.19766969501487952,0.37014664276768805,0.030425478461455047,0.5364921885053557,0.6564382049776532,0.9717868188780612,0.09173091173334558,0.5691809384474407,0.4439376207475505,0.661767242028718,0.563144296085504,0.22031459435365042,0.39689370974235216,0.8836688263269274,0.9016563701579006,0.384951667442313,0.9494553248276705,0.41248901209425215,0.6482818143399731,0.1443970552267193,0.45954716687866304,0.39664713374414573,0.16539335061881122,0.7801388303133159,0.16871857141700608,0.4346194455681842,0.02141020969422769,0.960099621110799,0.5533245376009588,0.5305955544688099]}
},{}],113:[function(require,module,exports){
module.exports={"expected":[0.9886415339302679,0.5740745700168247,0.8361930764763631,0.9716782605294902,0.6398388632862587,0.5204516315255718,0.7284678967159282,0.6203229941678766,0.7401514372525906,0.9066532938187463,0.5292426263417679,0.8656913735980267,0.7958781534003281,0.9885791303937804,0.9979483172630886,0.9343402803063511,0.9998813711598858,0.7247288818411259,0.9958330276444287,0.998814591218445,0.7568505667283739,0.9649538973108966,0.8975059673640807,0.7783172947646162,0.9999226207965978,0.5483066277264088,0.9903430415727394,0.7873169301905198,0.9661389341215076,0.9279644192012302,0.5316101660578091,0.9115926724500317,0.9864707820410266,0.9981169289467314,0.541696295385291,0.7382414146837972,0.566115573806791,0.9970338486248679,0.9050534503541166,0.704557384272595,0.5485095229546428,0.7505041152456849,0.9979496000247687,0.8251435238269786,0.6085459289003534,0.9834790816845795,0.9984007044612883,0.7269536533240856,0.7535666891018517,0.57126709756542,0.9696106770608094,0.8441692617428959,0.9733433298666141,0.8138473911262898,0.8958666298498787,0.999328164588646,0.9964631849828904,0.8908199026662215,0.6760133942400802,0.9999999588986302,0.8935783641001616,0.9824805775540454,0.7272344204998891,0.9998962288390167,0.7764119240000407,0.7126127437864007,0.9817728316552218,0.9257992269282398,0.6558553308354492,0.929059790923392,0.7815721004709391,0.7534783338826392,0.9727050990550579,0.9175673358321145,0.9378813647855848,0.5357814689163807,0.998509645695131,0.8543165643198686,0.9995127914778362,0.8620078827530179,0.9999999913011891,0.8430486149941676,0.9999999026092073,0.62556359957742,0.9997112926857722,0.9850232116627318,0.9194797854243117,0.9895878370907751,0.9666292442002838,0.8608605389891808,0.5802822838575229,0.8331628083665426,0.9749553973248022,0.9132046587585918,0.9745492115918513,0.9068064815683095,0.8781069933742042,0.9999999602821998,0.9689690725389386,0.566087803567249,0.9722555528879714,0.5395082682838858,0.9978482770133089,0.6790164391600136,0.8235303810500552,0.9006642589921845,0.859543215877638,0.9999993267697775,0.9935047232296201,0.9958285974915149,0.6002488961940586,0.9925572302479709,0.6505549842362413,0.5710114236502581,0.8512381053681077,0.9041261067818815,0.9999431708211485,0.955231476262508,0.961144608820312,0.9999941718201298,0.999972868848811,0.521447808986721,0.9178875666961921,0.9970908532642302,0.9364514451931654,0.6068818174742131,0.6353439284848627,0.7000945929047956,0.9869375174363293,0.9881089643174962,0.9953996764609154,0.8100869409268014,0.5273658851293006,0.7272339191616218,0.7041039174966439,0.9993392353963675,0.9757884687047027,0.9222839093681322,0.6485373727744972,0.9999593216217735,0.8285555910589356,0.9998716215448981,0.9285394670933427,0.9947510234787575,0.7197481511914523,0.9737521531307599,0.9756771027042003,0.7211801280254008,0.7785748071340847,0.9763093773958302,0.9934741126174602,0.9843520736485721,0.9628793957424582,0.8694848344089775,0.9994486049405314,0.9907900699334597,0.9282707768892204,0.9013991043964733,0.8982897610243958,0.9930132532885508,0.7742851169413483,0.7479515716172294,0.9941508768247886,0.8441387836664598,0.520955713564986,0.6866083138350201,0.9981027055016138,0.9623740562714006,0.9733954869062041,0.6419876997709284,0.8107717670290195,0.541180344739828,0.8122052422641495,0.5913235919470848,0.7971972999369263,0.9999760182257728,0.8317549213920897,0.7586972664080425,0.9067779232969417,0.9718868318654502,0.5572285937239778,0.9901792405874319,0.9995959988728309,0.5335924763547201,0.9058624534271726,0.8228731328974547,0.9255202902803352,0.7415972026530615,0.9907084694171221,0.9996127753529703,0.9715324008109114,0.875391263978056,0.8868933496809303,0.9574047739997145,0.9981134164746672,0.950445581870931,0.9989689370047468,0.913624264648817,0.9999956416531961,0.6155215566951671,0.9857049033901807,0.8540528408330031,0.9894487873440488,0.8683460489603743,0.6877900819957671,0.9998491595897856,0.619185257367429,0.8523175538447347,0.9599163590619748,0.8429965609001504,0.5657639619762935,0.9999998200155646,0.931350939748314,0.9999809414750312,0.8995101410050022,0.9439708011885919,0.5647841587838865,0.5302512034080654,0.5950279524661732,0.9922947829630294,0.9808141376558459,0.8149955363616693,0.9969560027002198,0.9900644717934736,0.9736311493912849,0.9772944942769014,0.6013056291537896,0.8660943972517388,0.8221198201354426,0.5757199137071201,0.5001975034509171,0.9041624543990764,0.9959635832542828,0.9921873981402185,0.9881482999815049,0.9999470958470981,0.9062896342360254,0.9646080547275119,0.9922252929239114,0.9965102067839884,0.9457236529181308,0.9993366229293358,0.8709870677435884,0.9976160293089174,0.5322259317077073,0.7502172807169492,0.8703896832772825,0.5315982141407634,0.9847356538280696,0.8742860638499226,0.9490075581893378,0.9759367056778113,0.8027403815502777,0.6981668336785608,0.8054588986917217,0.99599754713603,0.7552838507056423,0.5204312890202757,0.6783779267607217,0.9540936580820654,0.9071728056680161,0.9993855049403337,0.6405389065666386,0.9583320050983313,0.6014418133214572,0.5336811870877738,0.919951557307608,0.7944653562452672,0.9777156623460765,0.6940446520760135,0.7317182043142405,0.8301213062657395,0.9825151909600244,0.668137339549957,0.9537733134680466,0.5648248781380673,0.9971903728923149,0.7613088390535669,0.8917182961285333,0.9530608647200567,0.9812539630342296,0.8115121307192037,0.5666329204449637,0.9887119221575295,0.9506696096378997,0.99230426876649,0.9940172099991605,0.9965714942164318,0.9324459648879557,0.9984256964098615,0.9631774412551822,0.8202904262101434,0.8291846601638238,0.9997112565770563,0.5728782687992189,0.9998212422683176,0.8464993785128754,0.9612219180428737,0.8333835519695072,0.950912646584456,0.6423909788070172,0.8991985877377789,0.8050215524325832,0.9389607320067499,0.9961082116849889,0.9966255806400771,0.7788428978669519,0.9586557921494826,0.8563596146355634,0.7100346785222238,0.8001580496250087,0.5798841612196852,0.7676001227569186,0.9709676113693491,0.6216572012476129,0.999078939439688,0.5526002211165912,0.7753129621959429,0.733483913597126,0.9975430248328672,0.9863911729000217,0.9712028219033215,0.5002785496992784,0.8758581235394646,0.9993496798643533,0.9955975616686037,0.6356710657329141,0.9980898488504836,0.9738042273766475,0.97360263147875,0.9783180801105393,0.9541059449977467,0.9767846633275872,0.9980750715452531,0.7002960796183523,0.838620323378725,0.6137433963682002,0.5191285415614961,0.9522676803349495,0.834446175874781,0.6297280378601225,0.8109749644799176,0.8192151726585821,0.750875845649843,0.9988715101985283,0.9999999367613519,0.587349306230097,0.9999811160443467,0.9183316668535406,0.9976796455813306,0.9984237974311473,0.9886541565626072,0.9999820645902375,0.526754259974174,0.8483994225394654,0.9168803335229546,0.5067773044557374,0.9931501084796143,0.6451885210370534,0.7513346354910935,0.7128264083552984,0.8677339821431711,0.9176990456333579,0.7514737260583094,0.8446315877597479,0.9222756419827058,0.9388577291812842,0.852833131592143,0.7766359500631126,0.9997831732562636,0.9917363258184368,0.5041799824720927,0.983647337114688,0.9973914103194389,0.8065301728218535,0.9498360849221644,0.5725323355647144,0.9171576098921986,0.7768872302989305,0.9513321582492108,0.9997865026399781,0.7725539120974675,0.9623538431999625,0.7208652145074138,0.9989786182290397,0.903356748329353,0.9738624824679272,0.7225250629183665,0.9138474424542665,0.9898328665932407,0.850426864007277,0.9991745467909184,0.6896081028441874,0.5985290171279725,0.7381075893955593,0.8108365142906341,0.9323585787741602,0.9586095346413651,0.7253605056557932,0.9953010935043651,0.9161678990861724,0.8641902668247629,0.8935364149613877,0.9976898891030518,0.9821706682247375,0.9900124575148537,0.9716975405031181,0.9992914098278076,0.9604954493883435,0.749581011842563,0.7176224159435032,0.9987544710867197,0.5534559169528991,0.618728056501187,0.9714581098994715,0.9574352133993524,0.9963716639340005,0.5480134148873962,0.8308458821790539,0.8215265267942002,0.9985819665224298,0.6793946152827225,0.8324173597120875,0.9997682806227037,0.8153315059223629,0.632462277941445,0.9981699412283611,0.8302434771810667,0.6432138496668534,0.6673138233240337,0.5600777469423173,0.5647645808429534,0.5980249367613873,0.6192274955312655,0.8556710779882768,0.9939253077722281,0.9999989552430175,0.5957247318811432,0.5672190992588829,0.8199360547041104,0.7796650176740297,0.5981305934328889,0.8512063627262194,0.959030068413663,0.9966031123067419,0.9941983160579858,0.9991355546071292,0.9999984681071791,0.6511484730609653,0.5712476193790097,0.9923159567660083,0.7063788372206132,0.9136294045449942,0.7683927732551248,0.8148780965168461,0.9846993353261191,0.590443383378372,0.8481768343473802,0.7836102185238503,0.585117868820357,0.9998288414699623,0.9999034242750781,0.615821970481777,0.6467722534580463,0.9858675284119328,0.9937381477169632,0.7436716164396746,0.9999292074809762,0.6109651300667116,0.8381853383135487,0.5666696326904003,0.9990609552805918,0.7978282473186491,0.9999830483365374,0.9874033944938009,0.9994414796313192,0.7498209789478498,0.9181116253333826,0.9499538855604466,0.96793077358404,0.9767673588473751,0.9591688321703027,0.7420625703071474,0.6750361975037308,0.5646837419085682,0.9088041589823881,0.7570957174924581,0.8942201931172267,0.9365866214081987,0.995534019319347,0.9898008619260914,0.7800061248501075,0.9201832004015915,0.9951437252159399,0.5475300288956402,0.7067862926623087,0.6250057007925836,0.6409097178554269,0.5492331162171037,0.6651152043046207,0.6758956019842887,0.9836527697032773,0.9952938557923726,0.7881931530104487,0.9617458519940434,0.9970603539810388,0.9088620241980118,0.999075166896888,0.9068854586542987,0.7997554689037323,0.9614481094105927,0.9999988189718857,0.8791497473800318,0.9666330969281762,0.8443071813196291,0.6441033109941992,0.779629233201212,0.8159520818003709,0.8851838156043192,0.9997336514473533,0.930908862510289,0.8742309314530082,0.9999655543767693,0.9252510769843731,0.7380208014664682,0.947797576719955,0.6084441568845792,0.7848094071236678,0.9876892220351288,0.6207003132845923,0.9863116919807938,0.7999066820527386,0.9352764167467569,0.9946925345643929,0.6435366054440096,0.60722233753936,0.8919100481526147,0.5986228981639585,0.9966536009010234,0.9503332591871653,0.5145428903181338,0.9693469243806406,0.9999552874087899,0.6954803859769635,0.9335364658535185,0.8365000854081149,0.7262160779957222,0.9875616871045825,0.7927751021820278,0.9725694440138036,0.9499872085010487,0.8518941314988142,0.8041613367476972,0.9441818572876955,0.9563724606332035,0.8798885428690207,0.9621999641523494,0.622058779810448,0.8944397615308332,0.9999863573472844,0.9672284805779208,0.8736524535605967,0.7806114220452336,0.5527527148151925,0.7376671141148421,0.8399793833227414,0.8030464255696791,0.9843554774326663,0.9991827789638782,0.9972427447749115,0.7823937041230127,0.99758301970498,0.597660939144734,0.9923875217962764,0.9830680356560949,0.9805580782676475,0.9269500335985332,0.870312919982348,0.5714241657296171,0.8265392756054257,0.6988161722238897,0.9870481365102595,0.7170057871665156,0.9992806797424849,0.9998725983784225,0.6474395921458137,0.9972505042065122,0.704548060089402,0.5542096220593358,0.7831612218099565,0.9985895113930807,0.6293936323945128,0.8502304465413518,0.5255943377831754,0.9991320248553301,0.966416234406373,0.910835272377622,0.6636690403420189,0.9954298871801459,0.9814455115087628,0.9999996202777246,0.6608727311627126,0.640802894534557,0.8021284588190619,0.9790610846572652,0.7265496295773625,0.598234720905433,0.9973050667351091,0.9996291728574079,0.7108464870187,0.790157014144362,0.9240894864517912,0.9384548340072435,0.8744965866398872,0.94539182835893,0.994802490930147,0.9689435315199719,0.871698555453599,0.9622333517429345,0.9960199122365135,0.7533088186842829,0.9401035452852212,0.8169059018345507,0.9573155915114193,0.9389099862325736,0.9974150856585862,0.9999967123197613,0.8141993282472455,0.9998966460151676,0.9994101580732851,0.9955849819404721,0.8900099785089001,0.9340763707492932,0.5055836636384449,0.9620504968192167,0.9999649353138372,0.6947379404915414,0.96767494668178,0.7256509647590403,0.9990478169804652,0.694348050467882,0.999999999974408,0.8966558745427193,0.9159202457585175,0.5792245724342603,0.8484890014943137,0.9043411635820734,0.9951160602028446,0.8397201847730129,0.7912920318308824,0.638613299360366,0.8201530006072291,0.9875965049089901,0.7009730590855363,0.5497771850921658,0.6913804700541838,0.988797817557151,0.9999138907861294,0.6699669917657737,0.9297263004786066,0.7005910636686631,0.9954895127225755,0.8585547946294653,0.999643700743843,0.8277784820510324,0.5082522646681272,0.9706695788384685,0.8832625813398209,0.9762416735880148,0.863247094928304,0.857143971973244,0.5384216293020322,0.9997618603747245,0.8495797407186089,0.5513836879523667,0.6662241203788648,0.9922773317560017,0.9581789021839013,0.9999994704128785,0.6395636808294816,0.9488783508923673,0.9944660541196182,0.5750717880528794,0.6472343522546373,0.5829954667309174,0.9009305503815023,0.9992603706533999,0.8892540090125703,0.8754953127388241,0.7831933595877929,0.814415185492352,0.9163943547288695,0.9932286857854004,0.591450478055063,0.6501954230810615,0.8482345282154953,0.9964557297583839,0.9963344872387383,0.9763412027917702,0.9300673981198833,0.8967052928961622,0.9755023132450173,0.9110161677934723,0.7886458423983121,0.7701049127146495,0.9519813884785766,0.982341978919532,0.6742244536181428,0.9896365628869531,0.7818693563079238,0.9930556545419909,0.9406403561400835,0.9421430090110268,0.9695542291163778,0.6451869068120815,0.75571187063425,0.9430661691271568,0.9972122904581037,0.996413255005291,0.9986950474057702,0.8029174143163621,0.965324539225627,0.9698343153357039,0.8765854693613756,0.5795243859230894,0.7759832952343382,0.9971028777960965,0.616636732676055,0.9108358441183594,0.9138160118035814,0.9983484566366851,0.9165525410903209,0.8151026664584949,0.9976506542392871,0.5438257435032988,0.9913759375415038,0.97893188530341,0.9974521767717734,0.8089750032707206,0.7648032076017158,0.9816402829343004,0.8698916660549292,0.7192272893114386,0.9174484637476121,0.8607584132658809,0.7451640274845214,0.7978041148323693,0.9457559406349278,0.9851915240900511,0.971406233310128,0.5718242720027568,0.7436923376570854,0.9564311589959924,0.9816957131259694,0.6653333761445066,0.9223664634571868,0.978001516887216,0.9737038867376606,0.9960802784587626,0.9542304042494607,0.7572076635847446,0.9809829255375954,0.7640815812006994,0.804896918491615,0.9382881269506547,0.9573515746974156,0.9921859078111732,0.8486480340461916,0.5996583060797779,0.7480716624865718,0.8440985278778802,0.7959659060211653,0.6800464645619883,0.9885068463919355,0.9742763910560376,0.9993680999894895,0.8994340286187066,0.9851645634474216,0.9024361852564704,0.6512460237375493,0.9968692409998542,0.9999999994783892,0.9790876607402594,0.5517972696666658,0.8972433821281859,0.7786922923024886,0.7527248838468008,0.8141061962066571,0.738873183801386,0.8580340589715145,0.9485763203021391,0.9208298690245921,0.8449017329588852,0.9879602052313765,0.9999857915914016,0.5232689774888444,0.9969614396269282,0.7566272467239987,0.9985998074916259,0.9932135428321011,0.8720289306455976,0.5888162612136083,0.8400423824934948,0.7676536529074411,0.6655004669285816,0.9999997355357356,0.8422001279716133,0.5502070358310603,0.6576794166047584,0.9989592011553702,0.5284151800078833,0.9955097848007922,0.9611445914789674,0.6759827388841517,0.983355936874249,0.8012225202675277,0.6900316968293543,0.623169179738366,0.6990408696882606,0.9974912093731687,0.9178733208672383,0.9398594365723983,0.8518601660580114,0.8575839716495819,0.6642545779799309,0.9927384900961166,0.9899793228492233,0.9960410884053059,0.95180128924481,0.8663405389139824,0.9971940467080691,0.8280519062758552,0.9998558690690197,0.6025220839159513,0.80509329871385,0.76586375135324,0.673554627974112,0.9988515385997314,0.9831290696888868,0.9933660121619896,0.8744079770879938,0.9999955605495038,0.7355071205454146,0.7627219096651832,0.9991566919138002,0.6218581182644473,0.9930707244426744,0.5244194469185428,0.9911429333315542,0.9457773268180981,0.830133187864263,0.5155391494628823,0.9069306418714228,0.9960331148181648,0.9371919807360973,0.6007302083851661,0.5309663608686891,0.8698286292126566,0.9999992842604613,0.9821546269301491,0.7405114393870531,0.6485400545186631,0.9767590467942473,0.9725264936388569,0.8050267221088042,0.9992863752497567,0.857926318261732,0.8172477035588588,0.8581544290737031,0.9317403683094565,0.9943771361429602,0.9937837909175999,0.8096833150191308,0.8710636465230738,0.9999956962160722,0.8474272681398746,0.982373787556045,0.6084430289898977,0.7176285893564461,0.9704639917650915,0.7050800534386309,0.9998244784967814,0.5644671951157814,0.6623099802156491,0.8839354448374748,0.6013545816945612,0.879143396635689,0.7402149709867892,0.9846035374976904,0.9164642896872168,0.881705965189273,0.8881207575169592,0.9350329432496425,0.9291621285617624,0.638008440534426,0.7719072911595432,0.870892912003631,0.8405397041099614,0.5126789053293559,0.9982551542896735,0.7789632018001178,0.9161552460373432,0.9994626935478685,0.9977620678162944,0.7401447646831903,0.5910619587115009,0.972404324262232,0.8742384384894394,0.7805545484107334,0.5362718002943087,0.9450636965219233,0.650407031019206,0.5549904272558739,0.5149916891117604,0.9857226554963551,0.9922952047497156,0.5720286486903572,0.9880907329855212,0.6765571938499996,0.6527834805213973,0.999894873369853,0.9999086348564172,0.7225932332927119,0.988571251801856,0.9985564782248892,0.9999424993708407,0.9996002376736365,0.9999999365136651,0.710315421362816,0.9508658938850132,0.7198637010199672,0.6809326885930597,0.8970724125491091,0.6634861918687097,0.6345145049563521,0.9671101895713262,0.8794093413103493,0.6340707461286688,0.8771923192342042,0.5786207610559378,0.8658125915562604,0.9574302700429927,0.5939529985970828,0.9548770718989426,0.960416174851291,0.9559666026242458,0.9993362437094984,0.9852033304186054,0.6105110014196561,0.9994553091991075,0.997387415819858,0.5516291801777256,0.6819653663194646,0.695008410072273,0.9618542298524826,0.995599183176875,0.6893591366765995,0.8533128398532814,0.8853717390288127,0.7112928756612003,0.9592870258158437,0.8832408052573903,0.6956893502905098,0.6783478350791473,0.5989332653678011,0.6797460651154147,0.9555571998485777,0.8844242808262353,0.9683861607530686,0.9983341941750596,0.9999962451229765,0.9902335146024359,0.9215988030932933,0.9932927170680087,0.7174846043245027,0.9986416964395894,0.7071257379342686,0.8480958779255179,0.8586892805575316,0.8324805520815994,0.7589456686793999,0.9999742668190765,0.9999957099976605,0.8009920682211423,0.9912249813716432,0.8709350522403498,0.9961174347231082,0.9999988562997091,0.9876728354538845,0.5720799642663545,0.5451752807788599,0.9341697031128354,0.7898281931914118,0.9889160841808069,0.843105802996456,0.9165199544697724,0.5544665536340144,0.6452810513074552,0.9965261344826477,0.9992401802275024],"x":[-1.2577436617792785,-5.319783743706062,1.0492061598924478,-0.5008867436276438,-8.42227444139301,-1.5801439887201219,-5.4683249597876085,0.1065693259611934,0.9512080173095669,-1.1281439530991504,-4.2868821821061935,-9.39662968145133,-3.1405058488517303,-0.6282450213938371,-1.616082951329472,-4.504693403397805,-0.8239724106350748,-7.948835756887341,-2.6534465695072096,2.0219364504819994,-1.7956488994622033,-5.229983558103493,-4.060147722175017,-1.7465409547712716,-2.720443165481827,-8.479141321040858,-1.5723815996194093,-4.461755054343711,-5.328362743850326,-6.121865053654865,-9.485355092614977,-7.084123104198973,-5.90122940096979,-0.37353767562635554,-4.542628543392258,-1.5407508789151656,-0.222124978490786,-6.233611077622211,-1.4946761616613347,-9.168522971659899,-2.9228871242762198,-6.855539087906274,-6.580547128920399,-9.331243990806973,-4.124405872722218,-5.707682735363408,1.401723635516917,-3.7564721163017287,-1.1089698301728548,-5.398568848439489,-6.715656596927497,-5.566589534010839,-6.266436253874302,1.3494788633897072,-8.071954037802389,0.35504093905176193,-0.30742652663034664,-2.2090287169027554,-7.295243166335352,-3.858074548127938,-1.2299612253950967,-4.8568604478196145,-7.85065924226898,1.4324306963875792,0.1042567772234042,-6.323703970028413,-5.724773161067548,-7.557732193767974,-3.0383898721683966,-1.8194347980110257,-7.369418643522902,-2.0693141841418643,-1.8695104056462601,-2.719277159687848,-5.115039913731175,-5.9690209718202905,1.7901169597998048,-2.4430931575421564,-2.317662520618344,-9.310003596032876,-6.731178077723047,0.29005860957437557,-5.306464365463236,-4.526118236577279,-5.295601182954821,-2.9515637103042813,-4.32676750072789,-0.1844721640890734,0.26401877640511234,-8.286108698280477,-5.940950562102168,-3.0125760999433817,-5.906648416678975,-4.28812550392065,-3.037852211959244,-7.835392777782455,0.37483693082852987,1.7737892773715704,-7.847430999528175,-8.744416125603461,-1.464169995817807,-5.441792302120825,-3.435407201435396,-7.044639334313074,-5.7621987268428745,-1.4044158376464393,-8.729835326551154,-5.4311276745329415,-4.4910818304192475,2.0002273789835447,-7.979736175684234,-3.427542497340316,-6.241083556910837,-7.623471593461381,-2.469534561716076,-3.168359426293815,0.3125350293362794,-4.62680061488024,-5.929457163551822,3.6309595787974525,-1.167335480787212,-2.6696998863151253,-7.072557883415759,-5.633596744187432,-6.280677367060986,-6.05936616457002,-4.428723325942498,-3.5658946894652943,-0.24829697119521343,1.4644147497096918,-6.983749161303315,-1.6008431271501058,-5.432287373925627,-4.592777105093454,-9.661587698895461,0.42319783432482083,0.8445259987157452,-8.546799930798109,-0.8081021252253427,-2.0101879157094684,-2.2821770821678307,-5.1473032231691525,-6.3729327441056425,0.9461290105343307,-4.562877892726483,-1.446161027769532,-2.335201436941541,-7.880899039653649,-6.002953158674688,-2.0196505735051065,-0.45819818007575996,-0.6176104210796654,1.9410470167262712,0.2802124499376879,-6.423673997155087,-1.31111372013105,-0.2832217352269726,-3.12750173977751,-3.2178745988695003,-7.320462123194186,-5.6169909547485375,-6.808697179802843,-2.25015612754906,-3.572672580358346,-4.780047938846207,-8.455710073133654,-5.6993571613596785,0.8814263053765354,-4.811950250847179,-2.2094890104378933,-6.184429246664667,-2.3680977699620964,-0.966072939486553,-7.475496142585646,-2.7826675178470466,-2.2533918294415027,-1.1725151930639295,-0.5949426354102427,-9.092444865970306,-7.068633702639947,-5.286254649119773,-6.619894400647654,-0.16835828995177304,-9.12479639017378,-5.038494313489921,-3.9765259292827246,-6.160310217089748,-4.681450707936063,2.724312035575657,-6.403079618204934,-5.262602708936772,-4.670509858530731,-5.586463700568721,-2.7416496665453547,-5.919541241915946,-1.1959924723108475,0.8710712758496879,-7.2234018438414225,0.8200242598041316,-4.520576892034188,-7.730137393446272,-0.29054728097156746,-2.0335095892212443,-7.152545187264554,-0.2516843438178836,-6.9725193063129245,-2.1892777895461593,-4.077696581882146,-7.66095651902536,-7.330394377123432,-9.702682830010335,-3.872605525355769,-6.56623188749065,-0.034597297895170076,-8.873469380490494,-3.0844780974930037,-6.52755174965,-5.282054571107256,-4.617478932205647,-3.530771371734744,-3.455727010758858,-6.723388483471303,-3.325035065616673,-2.046366725862597,-4.8086864355174495,-0.3432895760455432,-5.362474478322893,-7.1558519234002675,-2.9566711417545104,-2.3923257635353137,-0.12141303713444832,-2.449079392032442,-1.2634057437181134,-7.8122977400613545,-2.099981465470471,-3.339002676514138,-9.75891433642659,-6.378948659321185,-2.62984232800234,1.7727020646137848,-3.873816216027265,-1.4225933321189683,-5.489137641371226,0.09631795774787033,-3.609780210117764,-3.4965574652480016,0.5070546017068296,-9.520861018209368,-5.545394173318028,-8.356504660959956,-5.070276159481999,-6.303067021282483,-8.897612300754755,-0.49834042763403963,0.09503107668443478,-1.413546274695846,-5.326130980190217,-6.349524223001943,-2.9948028732136414,-6.647562480034388,-0.31229128189304034,-7.085390937020006,-6.698441223908999,-1.6392531000312305,-6.12698246527593,-4.974595620081168,0.7341253080371409,-8.18496565189641,-1.3380796784175168,-9.452871792203531,-3.880276730656994,-5.578272739562859,-4.209638823611163,-3.8430457510553366,-6.879804528616918,-3.898505748344053,1.974361978367614,-3.8959234004882832,-4.30265024819538,-3.5900119643934056,-0.3345179235899145,-0.4635784377659844,-2.9196253916061363,-5.199539092654194,-3.3084968173518567,1.7041293371619664,-6.493117826419639,-1.6059171495244904,-1.900187317172128,-1.4806971768760793,2.3167250383031646,-1.0571129774795092,-2.4856155200086807,-0.5213037760840908,-0.6864679972243795,-6.266674979533094,-0.18386965226857988,-5.51732685629442,-6.4973111399123855,0.31498388953631296,-0.8915059913483925,0.03488673642900375,-0.3925351447642317,-5.546383462953182,-3.701936795127875,-2.103108466481092,-3.6536694689224727,0.6605074842629288,-0.14678087250439142,-7.52917383147791,-1.7538860248660282,-0.7654520852690219,-4.332866275559115,-3.0868075371668127,-8.305937312973033,-1.4678309117012178,-6.359138015468379,-4.146878486252122,-6.04875433293346,-0.7748962346171395,0.3577216369538494,-3.3536956757473027,-2.812636736723924,0.36073706043411513,-1.7315747206961216,-0.3695246526952747,-9.265411689443258,-9.57642772851849,-0.12433521952371795,-0.3776040086034711,-5.204377229749826,-5.99942476248044,-4.809960261030263,1.1455451734566782,-1.9561035996884732,-1.247037940548133,-0.675690343767579,-1.6622743817017718,1.4426583682927863,-7.376127860107417,-1.9718834774932283,-7.7012850833487265,-2.5511127232000597,0.7210656008811951,-0.1919664440991391,-3.8853426156859454,-7.052849956284288,3.263825114674025,0.1787174546006316,-4.353778327586253,-1.783325020363066,-6.641280011916555,-5.5042117214020365,-6.014481790674156,-4.883637801879422,-1.3551864534037974,-7.823314728581532,-3.146670859437694,-7.05651769245904,-8.822996020986096,-7.319318967466023,-7.024786087997297,-4.021368355570681,-8.585721984728998,-4.652505963519439,-1.9185766995862195,-1.193620786191996,-1.0934925865217067,0.04491585921560948,-1.2077054293770861,-0.5046353503124901,-0.32557172772875037,-4.954604997927287,-7.58160538801128,-6.951120222178177,-1.0819880422906534,-6.985248042640235,-9.282180421566078,-0.5514824062469098,-1.730406064833593,-3.822881420069013,-1.2725330860842499,-8.355555183774404,-7.595391805249277,-8.554071826065492,-5.239935565248782,2.019469185554395,-5.051851935790795,-7.60624793370508,-8.155553327243094,-2.4488969947443113,-0.3019770688794132,-0.9550441042397915,-4.089713124961403,-0.9334488777157633,0.6333704272279677,-2.778923444892604,-2.699960341141826,-4.617798092069439,1.5164682591175485,-2.5745891557333116,-8.177923495048883,-6.190270830308528,-6.0195518776350845,-7.6196426015548955,-8.142033960527717,-5.583464447129948,-2.6257547677248505,-8.935999281050874,-0.8030509218401147,-7.0515598164117215,-6.5080782214427355,-7.673797310704999,-1.7547720839988483,-5.632790394417107,-4.3019712953299605,-6.5164285752543645,-2.3038417451775484,1.239390518343448,-0.1431878383608337,-2.208308391951533,-7.855461688248007,-5.980759098359958,2.103410626249924,-4.334586232860242,-4.987946275614742,-4.398999788968108,0.3539775016397161,-4.575204990280585,-6.230540659550792,-8.54509302957796,-7.169508965836853,-8.493624623611478,-1.0406860832580902,1.7270542454127782,-2.4029875274388934,-2.7516409159632915,-2.1660661079816506,-5.219799796576787,-9.127380006388364,-8.902987185885502,-0.4142239511369288,-6.688589224657264,-0.01484825932911149,-2.3676743787699377,-1.0081637249916424,-0.3286710626555476,1.8531411325639633,-1.4735845945454953,-1.2281217187810258,1.1817635243255307,0.24282872460775373,-5.246903473732934,-8.377340632291157,-4.194748485600273,-2.643525589125674,-6.991563920172443,-8.69417039941152,-3.2620711567668597,-2.3958062948142254,-5.967129381158998,-0.7218180755224619,-4.046200693897718,-6.0329382113786085,-3.5799563882324286,-8.43519052259045,-5.314977824531216,2.0056877420138215,-7.5696755137786935,-7.5330761067307,-7.939650982618343,0.13090335166620493,-6.303521340849455,0.23244942052306827,-3.736339794344373,1.762941325021122,-2.0301121791547465,-2.551441815761114,-3.757109997550315,-3.2422298149414104,-3.4514799541245895,-1.705499974647957,-5.123175721216357,-4.567384197505865,-9.252969611642362,-1.407161810676338,-8.487073361488068,-5.031248689166869,-1.2904714753661128,2.5076646326001044,-7.222314626951936,-2.6305920772492613,0.22998612780706695,-4.616431129163854,-2.50271147967295,-2.8303738152326456,-7.336059572210435,-6.212779666095975,-4.258548293663639,-6.944181629907977,-2.050537447842761,-3.7827153540578125,-0.014675546018703578,-8.155090677836155,-8.250047739154384,-0.5419973987996731,-3.7693140092038293,-0.6305989417488159,-6.476245570848238,-6.022302185237382,-1.2177742582258966,-0.5318876111758275,-5.08973564942911,-6.8175057934974825,-5.60480779273944,-2.5971577811944124,-4.409783195217294,-6.327349925058771,-2.952094725056429,-8.465859152131415,-5.912581654678925,-5.460163372847216,0.4154483848590771,-5.588395375978711,-5.145366368772796,-2.4370477061457265,-3.9752197744480644,-2.695028361978463,0.008348940021547513,-3.693134884244072,-8.341440685381668,-6.266624268115931,0.05776070058292171,-4.846246054984215,-2.9252753901799164,0.08397717906772165,-4.391521837888472,-6.004017079209947,-8.596529888005483,-6.923706409485396,-5.579684146940287,2.2131126437539326,1.105025267857954,-6.983013931814265,-2.395247437098635,-0.1882342632169945,-6.6963108327807355,1.1558303669899304,-0.703061334586472,-0.4905536042379136,-8.565220440462117,-0.3928350263663284,-9.099894096061513,-4.533865449586595,-6.519306356739476,-8.237542847789662,0.5534239149910443,-2.2590494224145923,-6.772403970936525,0.9264458673466134,-1.4046233705667286,-2.7096988644153006,-6.939713097085597,-9.49452900133226,-0.8163837926910793,-4.593985372826642,-3.309977908612699,-7.551390159579948,-3.4302983324732006,-1.47580384199851,-2.1793710602248817,-5.970606879187715,-9.718060816540937,-2.1115832346754795,0.3472774685483295,-3.076113835490692,-8.240727850938782,-5.95075458037993,-0.1333116713832462,-1.7080750179582038,-8.174335573346065,-6.00241627416645,-1.4888718347967078,-4.720734097357761,2.9018257717836695,-2.3292942399795007,-2.751994735217979,-0.8820038935553796,-9.389447492352993,-5.072601114916665,2.6310186023479307,-5.530584600107027,-1.996711828119618,-0.4035761520665073,-3.9695111927512254,-3.469339372033043,-9.40406688755066,-7.738158703715951,0.6464786024237763,-4.4054208800097046,-3.634702830200609,-9.642536604379961,-0.32157594699603154,0.30298097015313596,-7.088759258677244,-1.6188302534856762,-4.687624504130769,-4.597550169752229,-1.2089123273452214,-8.19571865530164,-2.616160895815801,-8.22408525582273,-1.6343761249377062,-8.151605815615536,-1.4300306653375405,-8.056224309926423,-0.9899580168210482,-4.310915059000407,-7.513698774742773,0.8708135822574263,0.03993605238587766,-4.739441289907907,-0.6053505853808473,0.3691020599702288,-1.7307985058149291,-8.218734841710639,2.2726027777290856,-0.010750335797262922,-6.677138804232169,-1.8390133245946156,-8.315330742832389,-6.023790991455942,-5.18026246392928,-9.42050914653115,-2.7573621591504875,-5.263914811876976,-1.28112118766339,-7.47869288808015,-5.576739967270085,0.055147242279640185,-5.686062094858275,-3.512602051633506,-8.835676706281447,-5.698124922724646,-8.035604218585826,-5.062373990716044,-6.1706936561023795,-6.285689071522393,-8.763709912756505,-0.13596290430055208,-3.939774542502844,-4.899808732725891,-3.3096202369831387,-2.9574974088526287,-0.6592435709275082,-4.037340681791235,-6.483560168253328,-4.827293077015701,-8.292012664186673,-3.876200848928982,-2.5116511590386392,-4.831406445686833,-4.689153356016849,-0.4536747211888038,-7.033541739267775,-0.5297634455508609,-0.608088981293862,-0.39081649236049354,-3.083219087269144,-3.075855686051475,-1.4267037603222896,-7.917371766696774,-2.37757197986645,-2.213974001606479,-6.429479391566009,-6.7612119776326765,-0.4162708326332982,-2.4919532165613316,4.1074954383625855,-0.6209238464007854,-6.787983490897362,-2.9926892382382286,-0.39419586531270984,-8.868774500502523,-5.211232383850388,-5.836028355688967,-2.584939887233525,-3.2532873023374305,-1.9538994184759932,-2.2991295081739533,-3.298522360035924,-2.177432459462455,-3.196452407857804,-8.8398462461841,-7.600665119498699,0.9366944517443014,-4.019101486172745,-3.789351975385728,-5.804639160908742,-0.4191740779269566,-2.8327350324386407,-3.747617279612393,-5.496798886278986,-8.285007187343957,-1.5930369272661966,-1.5114972073614035,-4.225223280283404,-1.8775797457389207,-2.514999702411544,0.8129335565548708,-6.182616877686636,-3.4911385374015853,1.0047204145726076,0.34481480400090314,-5.27637369776695,-6.820009478807284,1.3997184152929494,-4.868334327223934,-0.22529825817213167,-5.787859429133524,-8.49748413097707,-2.7390351626213896,-0.791123964217556,-5.346556515650212,-0.960004160223733,-3.7695996801819165,-3.7268865158372595,-7.088732574478716,-4.840298981325632,-2.5963526291625243,-4.093733214170605,-1.499740057893641,-4.385479817944741,-3.086387805111866,-3.0311964742430066,-3.2647330468492393,-5.903804009507946,-1.1052138424545488,-3.363415323324751,0.1413382021752161,-2.359419469450079,-3.742113364695442,-8.811748274915189,-1.0381759166756774,-2.1637019659093752,-3.5356249511802,-3.6065928179273934,-0.08806928458199037,-3.493555107649199,-6.878811726314947,-8.173138107408194,-2.368235993876544,-7.085486181415719,-3.930846235508772,-2.783303965096973,-1.8434058242983506,-6.507120136226879,0.35979615357126804,-6.663267852853639,1.1053200792496058,-2.1426401984573507,-9.57983160813564,-8.512013679803289,0.29891726730620294,-5.438812974645237,-4.702595698967588,-6.751201271371624,-8.429979971921565,-5.796773936153548,-7.635724305724763,0.14005431432754323,-1.4592138200247409,-4.2461806267106565,-6.107551198616359,-5.47484183765736,0.1285942680365284,-2.3334443096292086,-6.645402438797852,-4.896424648471896,-6.112867651093402,-5.628485416750895,-5.466038174831831,-0.5183712492608589,-6.7808543838700235,-0.3423752062588661,-4.272712713222758,-5.192615895791325,-5.065731489693455,-1.4515199009873765,-2.1656633763096274,-0.47525886251730354,-2.6427538914913953,-1.2429247856192143,-2.383358521252585,-4.612175828412405,-0.9433403799931239,-1.475234188580469,-5.095760657181381,2.674358167295032,-1.2836800578629939,0.6036746173754699,-8.221419107604905,-3.3822655396993513,-6.254390985595506,-1.9963284633793656,0.19351332267600085,-9.171257500901238,-0.2199180421955588,-7.1880312013232945,-0.367878393821953,-5.953609158246817,-3.3941417032665866,-8.969562438263871,-8.101347407337931,-1.6734387172282514,-1.3209620150577752,-3.4361415972897134,-4.336067982727675,-4.04594428937644,-7.446114725815015,-0.14036342366504134,-7.3968540421804825,-6.97430152515237,-7.723143612632515,-7.423308330076708,-4.47635879541348,-8.41890772193907,-5.86721834216772,-6.542622697850043,0.126360417675627,-2.8690521722830926,-2.0277660848745866,4.099824170986574,-9.106255166973718,-7.077150775609762,-8.143281283831541,-5.439366367278877,-2.9858087745623934,2.3796521144581004,1.1250948221687032,-0.07804411516395163,-6.765760795993082,-3.0094069080094963,-6.885270078613683,-0.6695360795624508,-8.075571893530396,-3.2055082111139344,-4.124325872319777,-0.04029086833222073,-0.3130400222737305,-1.1213494100107344,-5.853283948125717,-1.1723888161919787,-6.154570401057905,-7.4455593277063095,-9.121990749609264,-0.41687850836484347,-4.871519356158175,-3.217878273921735,-1.313553741469307,-7.81834971595945,-5.286984915717247,-2.9886757058311346,-2.559261425013852,-5.551986452836533,2.539722942414891,-0.6746201516225975,-5.766956176134754,-5.165331890919864,-5.763295777419405,-3.123956111797871,-1.0824546739164165,-7.052343847231333,-2.8819476691999606,-1.7485819796048254,-8.284924050943319,-0.24098009220491678,-1.905938354734973,-4.800576412014485,-2.489905057007787,-7.030947072129078,-2.3394479511652433,-7.034434681194224,-5.448025455546484,-1.0757547620565824,0.31135122167985346,-3.1176528706232842,-4.738751256398425,0.4011442235610181,-5.655741429374258,-4.2540084724536715,-5.172824518406914,-0.1970674682264221,-4.996131636223719,0.08916987847193783,-3.0964539644212223,-2.714332732568674,-2.144659197943353,-9.272732118648191,-6.254105008285187,-6.965214325531491,-5.3956627103499075,-6.371130914993861,-8.990405551326713,-8.505669985655219,-2.075946281319629,-4.830692761249143,-7.6961072480434165,0.6794765279361841,-9.094799231273575,1.6789801042711896,-1.3422383116217245,-0.11853613568556187,-3.493858282139653,1.4001067788847061,-1.090443390876473,-2.6105288594292615,0.7966529462472038,0.5947771179002057,-9.27840527713145,-7.639022090011066,-1.5915707936521652,-7.1331585964739155,-3.4409789880864343,-5.91652659080566,-5.580271418451527,1.0501064655269632,1.8032199485296543,-0.12948063486366101,-2.2267084163248696,-4.901289053963932,-8.519172636577649,0.14301039717018577,-4.19121291797166,-9.635148043426394,0.20756643842742317,-0.9433328801400243,-3.2057532489103804,0.5151125266017331,-5.004152063885149,-8.33659519493512,-0.646660830991278,-8.756170169233828,-0.39300759935646523,1.9070891675183859,0.26953487342474447,-4.439343294857219,0.6512617506953031,-1.1891347938650145,0.26521817040790996,-7.769739824436684,-3.7277310374690003,-9.113958360974014,-1.1123526892498192,-3.12356425740739,-6.247995593297916,-6.703397113097213,-9.299707470734763,1.2958600786751455,-4.757002736920802,-9.414743416326644,-8.229103659618309,-7.182131359257049,-2.783034180019175,-0.07150850262639023,-5.696888051383556,-1.027138821320547,-2.884611902579806,-8.025625524880112,-2.2857032186273285,-2.507675545618991,0.4659727700557723,-5.852346544979987,-2.782595266928449,-2.497490824862685,-5.606726670096672,-3.3014173147992847,-1.9438280408479711,-8.54473801491358,0.33180733900361226,-3.337613766083872,-8.760050475508685,-3.076413628866845,-4.111842203469588,1.4482352668969667,-2.5853638860768235,-6.4810165856134585,-0.9309114272957992,-2.3819647139260427,-6.55728199296092,-4.510131559087741,-7.961161649139863,-1.7031717676679046,-3.2264266386667275,-3.3741897475218012,-1.5126631788888791,-8.30200216013789,-9.010410746349523,-0.8136198712098567,-6.9356772911013715],"s":[0.7657935452240039,4.965200946535566,4.114856624440616,4.581519406938725,1.7375449209818883,2.813850070182604,4.268396151063523,2.180739349904041,4.270140603945999,0.613650696633089,4.010535658024957,0.7384438242946689,2.087649280818261,4.957316319302892,4.390126224803304,4.078588929376046,0.7381746715389581,0.24777627235098576,1.5868884892152457,3.2920385768438387,2.801150168968114,2.227274624063905,0.6598421773327123,2.6594914590208587,4.57272913295498,1.9114817008751128,2.9626293126854897,3.5671127539896874,0.8731844496700314,4.18161188492949,2.6084897039392407,1.739373407309398,0.626263901632631,4.6447806925415165,2.7856098682591703,0.7435964883153967,4.051323332950111,2.0472594665347197,0.377305725289121,2.481705829759726,0.5324999552999932,3.92667564552435,3.27145051744235,1.4480108111459666,1.9333019242351057,2.291694503824381,3.3903135470811643,3.4614277399358007,0.6906786280087351,0.6161640888691555,2.2905398923785136,0.7341439252760196,1.4675763838962441,4.454880014134456,3.599979643186372,0.8355615744718314,0.659672481757595,0.5320222984249612,2.3949727061277857,2.3591677359670102,4.61232624332062,1.397159197269573,1.643077934840328,4.740619861914728,3.8166150723115857,3.7451105937299523,2.251213032536424,2.8172385848588166,2.46611814134037,3.6761789458078997,2.61365226925818,1.6042069894592736,4.308025548377597,2.125090815759445,0.05823549042140885,3.0146004244928424,3.4648644278560106,4.993945861949781,3.551820435891818,1.2955136505135367,1.2330117851901057,4.58584885685251,1.469816335126809,2.5505038779346645,4.979621483769207,3.5045590450462907,3.9424608382807658,4.956003045741134,0.5006863910543313,3.345584753480736,2.2431912161540746,4.172796219729058,2.422179586330376,1.457738796433814,0.5376270250226534,0.8115319755327322,1.4678602267494056,4.652019955952027,1.1105259169292803,3.3289905524563936,3.7953502620920765,4.129611917240382,3.6889183135194714,0.029043982011064395,4.60217351297786,3.712920227096108,1.5387842091401427,3.8131398306093276,3.152503118789749,2.524732055099851,3.492894246804119,4.170703327903668,2.95810778115855,2.213842839147311,4.520916865161308,2.029242713977879,1.5754592465289396,3.260932535381942,1.4631488749742316,4.274101442973407,0.09633050802784315,2.6683004964488513,0.7071898934210152,2.199567196017588,3.556873005276998,0.5263969660765877,2.9130329380555886,3.8094624070022887,3.0835614262798607,3.975401422932181,0.9605727898012273,0.7110554981165296,3.480531280437976,4.6483019787777895,1.4467898457276918,4.8672468461898255,2.2973605999356184,1.40664760253998,4.3206576098934155,1.686082150708349,4.086302853717751,4.462946944181649,0.37703895302286905,2.5749774565571535,4.182676553055273,3.4334722880840762,3.932766045333196,2.011430637020707,4.83221371543531,4.988776477835145,2.0688301903168496,1.5687851597403824,4.898006807142105,2.500732578183312,1.242014444380689,0.8737636132629589,0.3222741960905773,0.004246062701279696,3.354768093355279,2.277163837474406,4.524658285404712,1.2708443649757317,0.9476338155412967,4.864298384352114,3.316451652534326,2.8734823606669027,4.1729304946808785,4.677421016436618,2.052873319210958,2.4011034779344955,0.5496070154415256,1.8244350258175202,1.5185342820420777,4.027196426491857,0.3033097742982005,4.250203256366647,3.3468556565903307,4.340055056687949,0.30105192965800054,2.082909523323936,3.5180693992990664,2.0587441706453546,1.7103838465510246,1.3540667447547594,4.897718223550873,1.4902082310704068,4.588652360672857,0.7219246879521157,4.228288652739904,3.576790554472841,1.649124161923029,2.0232351310142427,1.1516145419144397,1.3001119234249392,3.1067049577153174,1.994079931646432,1.4234141830058666,4.702438219781096,1.1270994255616562,2.4518140334080787,0.815967564742488,2.934169885167174,2.9139035537382596,2.3842395647116166,0.21295319102843768,0.8352356862353771,4.6651523449741195,2.047940130015734,3.5921406771940956,2.2500267765513593,3.2888829028422495,2.2865511053233103,2.798109093860024,3.23054653404256,2.337889459224934,1.9638108747186,0.02425915722591765,3.099580904082827,2.4408183638029035,0.15688463456576707,0.04370567422653737,1.1657585789669145,2.4395257410891236,1.8960759036929997,2.3436353730187087,0.7519888746516845,1.4328852376917045,4.965692095955583,4.909491581429455,0.9663207534225415,2.977746064721564,1.2641138481098013,1.1529732361331546,1.7438211670167125,1.3258005799873973,0.3506912564208031,0.20511532463604043,0.9813480070827907,0.1943589692242198,3.4028389994179955,4.05258840473814,3.882413669866466,3.9577760914376303,4.670939205543872,0.36031195893141854,1.8736343755776408,2.9344542879850923,3.338785408072683,2.3900072166658735,0.4068928493697954,2.248158485184378,4.8523231142624565,2.94504936606373,3.6941063142847277,1.2553260338082761,1.6965836563070447,2.2531976288147426,2.624596400268743,2.2389166052828724,1.8175602915690259,2.6824975035491483,0.829172861563725,0.36959057983753096,1.4066108703316038,3.89279683058119,0.6767130949032474,1.558863309471531,2.713734133217854,0.545601695211152,0.8514159788200526,2.3427107048552243,0.8377882591817498,2.689792199822021,4.378513296874092,3.588682591869131,0.4471156648044672,3.234637931497671,3.457324522484063,2.4769920713866354,2.9037158295824863,1.8607919575881837,4.192703639346559,2.827884560315299,2.2354484653064945,2.329309875865755,2.64349954163275,3.821519310974819,3.30716579328741,4.444746443805875,4.7544206666619395,4.933792995061782,2.9343501262515015,2.087523373044733,4.755134285854322,2.9113642677044194,3.4969144316277645,2.82481705550767,1.4193705998417117,3.0481689142937105,1.377486648304873,1.931152020132172,2.924419116408963,2.6373339913787897,3.987528949605915,2.7092047371053773,3.936854985765886,0.369761006134659,3.402930297791066,1.4698368584189003,2.006339494272422,3.52570679993498,4.045856042587603,2.5971222879995848,1.5372489903656306,3.227879216921922,0.3785311652650525,0.6012342448710251,4.182988085608309,3.5992968469877393,3.7830129989676387,3.426693512511286,3.6858671351322405,4.716495068054501,4.060681122654085,0.7927154300661787,1.8786666777732952,1.3156229333136682,0.08606911992820376,2.465560520791298,3.836144903809232,0.249662717397946,4.561411210438195,0.2692871762834337,2.1917763888847306,2.4192401255829754,3.4881084661027195,1.3724286353472792,3.7965079416483514,3.510250805443235,1.7378680516398326,0.27329619998430865,4.657653577018021,3.9239274620594635,3.316942698429537,2.3676936849447117,4.721383306389077,1.6266613227875082,4.770213809602051,4.966182916952952,2.88523784637173,0.5472782821324385,0.6510337499125596,4.393572352295239,4.983861486574174,2.9226515564521294,4.117606394705151,0.3530022793090348,0.8028205199486238,1.5253878711445168,3.01412430702244,1.4951024168935823,4.334008140667609,3.263829637783843,1.094023770758562,0.5370794648029587,0.4926857757531733,4.856509686627872,2.1920103438688554,1.7573373685015925,0.842281507821695,0.07079034821823593,1.0155025816755048,3.0817737296289383,1.1166056712597094,3.0164111600708243,2.657887795101815,0.24070947155584,1.0913019846723548,1.1792439633137952,3.326544985936266,4.952233786469487,1.0894301911909865,1.6770780483871195,4.490840905333075,1.5779219856048199,4.359694674070205,4.983764825208832,3.3224261414765346,2.3725364275129603,2.0001980808836595,1.2816622921053022,2.209509492900935,1.450014918855601,3.232591184214393,2.3826986999646804,4.41084823513677,1.7440984030053197,1.4337705506372622,3.4605228245142716,4.681803485982715,3.8516941901410586,0.5809904987397063,0.9458727757923657,0.7813935016855356,2.916622472687811,0.11356210523168819,3.078950651056541,0.5869145842966994,0.27950065358570475,2.5060183689458206,1.6688406591340776,2.5039647491511063,2.895609012475374,0.3846645156411266,2.4972969673123746,0.93824740451111,2.2139919494117755,0.6420952440973227,4.859298900919847,1.5702836130966202,4.498571743304551,3.5296462863977487,2.074473999003763,3.529607896716697,0.14784206632519448,4.552195735287703,2.0306633102074856,2.549298633998769,0.6628717645139637,0.4697574201696131,2.072644179038463,2.451488101856294,4.809574417256744,0.36594640347797136,4.731317548718516,0.5618959187986872,3.498086060084471,1.9789931053104781,1.642420569884232,0.8621997066584752,3.493648069355223,3.6304919142201273,4.841995073156497,0.5066459641120413,0.4896781718725096,1.0958905924817586,0.8615698801480498,2.11112739143248,3.7047643319233323,0.38543336898974934,3.7677564234626146,4.218562984123714,1.1742851639843699,1.95641613672625,4.947228258447133,2.592675525778503,3.695312817200287,0.6103589085673433,3.8276510539468567,0.2282224776704478,3.4776589617125397,2.8403670298118033,3.762314553970599,1.9947058745419943,1.4755606157930534,1.855196851233858,1.118974210924234,4.28211511101207,0.8345689334345763,4.358321929922799,3.880966799944867,0.8663288060445617,1.0232289325872779,3.7024972723072027,4.010382689519272,4.67790756546486,2.438904655438775,4.26121189369491,3.121733471018333,4.127305003517735,3.366838941366569,0.5617399619561692,1.671854798987371,4.422792778589761,2.211463683295807,3.530740487021369,2.2176525860423233,4.082995473735284,1.460948865886097,4.057866164199764,0.6709596394447703,0.8789606682649465,3.4687706244080774,3.1267645792828027,4.803071306314979,1.629743724924212,3.8169888778456285,0.3419246756135641,0.24142294106504703,2.0279208175302377,1.394222565381853,1.0069104822860797,3.2364410410167066,2.9740692711466488,0.026390496105255234,2.4964649070053357,2.447456138099321,0.790009923860896,0.3422054041743128,1.3271538153682083,0.05189748359228252,4.342226390322753,1.8926680283972452,1.8930977423529782,2.095307648275152,3.8664443967824536,2.9446658603479294,0.789668826977159,4.705798341455928,1.0785644828571694,4.060190732951571,3.2296715460903593,3.806627326276298,0.4318339406031213,1.5443563908642965,4.089729106286791,4.626011680190784,2.9980914637187106,3.66993697201208,3.3562162832633624,1.296257527246114,2.82769857204763,2.2733068815701305,3.8714038967173092,2.4267118640140706,2.0588203477396094,4.600470907349599,0.4008850200999048,0.9140785901061366,1.2001493210186887,2.3090549015141546,4.0640304644942296,2.144234837972394,3.156879953652382,1.4450407477335736,0.7797086471493075,1.608593683163283,2.0861847994276927,3.178467149154401,1.4491673779780956,0.44048274981595803,0.9214765557846527,0.2746341818207554,0.24570578454304548,4.58146306518821,2.187042882768555,3.838746274344922,4.940619586514395,2.6425993334934628,3.470990970298944,2.7261750823977637,4.156891237409999,0.2046340927983159,1.0686881174441198,4.097397497969873,4.924673348943843,0.7580941707567879,1.1333562445729572,3.8371069221470853,3.5351649258732785,1.7377230699735458,1.1824770975533094,1.3201006290383632,3.6796216977107155,3.3995254546613873,2.4697341455968633,0.8959260141708791,4.146842046463056,3.163888436048452,4.982515038324589,3.565047373643957,0.510771960131905,0.842519927364791,2.2924871929080846,3.279905956356047,1.7327088166017002,0.46901628210570534,3.6780311888799186,0.41222191045913514,1.0620148909106275,4.13942281149938,4.829673469290821,2.635417041542386,2.2990261033719728,2.321826105765483,2.2078918874257116,0.6092562867306006,4.694921358643722,2.9077756030794655,1.1550175297559973,3.8364453606140603,1.876093475060736,3.703154304347832,0.9558424187630143,1.0375358902302156,3.1597946554644976,0.6452200900479876,3.3754963886741507,3.6165067663496475,4.80153499168313,4.097286470518304,1.3121440146855912,1.9094795342164406,1.76799155717553,3.2233829295557093,1.9066326494512564,4.7052527782106175,0.8419778014729307,0.3546788892914865,3.7747521423884303,1.4439554084341777,2.766402123373699,1.0965686241833161,2.918787436350697,3.181718570301313,0.6906710422805151,3.0498110864609607,4.590880701293399,1.3014591598322012,0.47099693334838544,1.8150833175350412,2.031423893289712,0.4323847476565612,3.0307532311603658,2.91770958398022,3.7840801810843927,4.739633524824227,2.407072882417285,0.7389918894447389,3.230869377699095,0.00879520473706541,1.3925326997137877,0.34169725581570387,2.9997228381871666,4.432793256927007,3.2970081239281046,0.7242017623691954,3.3695179880995463,0.8730146624560353,0.8072274192357143,4.243206188501521,1.9304178469991762,2.199298925295733,0.49616455164211537,3.121356260310586,2.0032476929596776,1.3251872890032557,1.5732666502443848,4.244985323424819,4.498037128815048,3.2896864290080288,0.07723549228523696,1.109316916181169,1.0758099346085248,0.7520064694982875,0.9564474604724038,0.9385555699801706,0.5171407497696667,4.066467092417819,2.6844762737562187,4.420564524884441,2.0828855564469495,4.412912446704764,1.8740854625207792,4.445939833207105,1.9878178146806236,3.812288592648838,1.4747557870368488,4.562639618278683,3.0651243319029806,2.1486646956822906,4.264387541038173,2.19181592878416,4.982777000225845,0.4819574402695581,4.3746266343182665,4.43721684827704,3.5509848807473365,4.613660923415707,0.9423839632329567,2.717802940182239,3.8874941161959207,2.9995047751891457,4.9846304498404095,0.7172051955974312,4.786847199605377,1.0263653167617715,3.878650942088,4.681926978817794,2.2106841991734614,4.929247186880129,0.1645749793933149,1.8492984018932435,3.0964228583240025,3.88222993674054,0.11085238532181796,2.415441647601538,2.637358417449348,1.0848644138562102,4.579881786814951,4.092893836360936,4.556518969426296,3.1468548591018743,2.254418451619704,1.5622972667935253,1.3578398403702663,3.2879945426243107,1.557795091617259,4.45786999393798,3.212607486820863,2.50812564556278,0.9512290198215567,0.19381543969721693,2.9424157007445597,0.8568774402442325,3.8521774834541267,4.334452912718122,3.959286761254861,0.010173415471194103,0.5025636211603512,3.3395531603826867,4.2869859883617885,4.78804718638857,2.7321692006085705,2.6858222003627175,4.683296958734492,2.9951076790116438,2.0730493927960003,1.2825509952394754,4.455509562977933,3.2278116082441066,0.8612879525153716,4.888866199988876,4.327806122319138,4.298393875459818,0.02334092986561509,0.2840112720217647,2.5234148615436345,3.63611173359872,2.904486812774707,1.4588301464956954,2.419966169279155,4.423350509756605,3.466857254702367,2.2522399850741817,0.3447851282001957,4.924161881161583,0.9935510649315571,1.950700918502234,4.331934276906279,0.3242122199175157,0.5267809178062144,0.5544922099133764,2.6480461872865177,4.378521583534809,3.535247919365273,1.1565114412789224,3.701595662552628,4.609768068058507,4.9094184003854355,3.59292024488023,4.67208729249867,0.9224116845051089,0.3908549202873657,3.8755589086588538,0.2971365436161377,2.1869680862483767,3.03191564070427,0.05297963538313355,0.09952324721843042,0.5396668142755046,0.6052348862786738,1.301465332004963,1.5451088669484558,1.145123480347744,4.263258826029364,0.32836203810233444,2.8682273887539225,1.1533432823949585,0.3271338684032421,3.971017231587457,3.365673375538678,1.167423910141191,3.698401979997189,2.096764939259388,4.671754767951867,1.0919575500573464,0.8751993446599504,3.806267956284043,1.2069966874516669,2.0572929904232726,1.3120286301677964,0.42667599081241736,4.168986923084215,1.356298728802,3.855152013641159,1.0521656305784177,1.399804599693707,1.8853997411057655,4.793654131945547,2.8031343122461685,2.1198524278093367,0.3457815063469083,4.443839480160704,3.043528571462024,1.937007437785524,0.06557254863433615,4.791768944738845,2.256592075071472,0.9471011341389479,0.16716209931299297,3.332856058759466,3.333613086247924,3.0985050186749916,2.765841988689368,4.970253994070904,1.7386199012897963,3.881222366878667,4.305664590929812,3.6844400864344817,0.9200900046234628,1.2136071214148447,4.861186955012635,2.766987234315926,4.149291362532184,1.0055783990367828,1.9620974681391934,3.987934633963407,3.7580845799840725,4.372994718158182,0.27601275815319015,1.2367268396320208,3.8853822744588196,1.9699693887733782,4.362557453219859,3.3928077491042066,4.625539818750738,4.691032499348061,1.6492401658256794,0.9063830844099752,0.5577826971064992,4.592359533774072,0.9832329034029796,2.3730007423421573,2.2767028650703702,1.6681549021870135,0.36719072971756694,0.8232995901784346,4.53609168933626,1.8327868091714739,2.7441072569173155,3.1623483235758654,0.7598038587521527,1.3016218716028938,0.8172243254012568,4.485372819076737,0.5556839904146227,2.5526057532817745,2.618059783622061,1.6307988007920715,0.827105285405132,1.2752331348555324,0.5547831700447658,4.320387606073299,4.164664029100049,3.229002316849754,2.1398702600173216,4.251259567669243,4.829532992212744,2.5987854318206582,1.707431941974078,2.2779936293050076,1.5976581219925168,2.412900468011646,3.6237940223642493,3.3242071902757475,3.6343810355401605,4.966716876373911,3.085351762513876,3.8904882149683284,1.1821784277649128,2.095805142514797,0.007153793061293046,1.64287092716919,1.762361961770128,2.5308754724866276,2.0295790627482146,3.4801772833995437,2.5049869105742903,3.3057620313579097,4.522229988445953,2.71065879186676,0.4529448250614754,0.9536029201452045,0.8774214418616821,3.3173989715172536,0.24346517998299788,3.980490164543975,4.494475870341912,2.982034195688791,3.684486608941807,1.8861756732549828,0.7640195123468074,4.4397382617397785,3.37458960658076,4.251029032719473,1.6519843351276786,1.8932413583332464,4.0282804542858575,1.531182398767894,1.651456399016763,3.7882546402697246,3.450561523431095,1.9047277098693816,3.4525097718171716,2.0978766821725428,4.0761007944040735,2.9351398277225513,2.498467272528898,2.754408906664183,0.3748871414450716,2.1195966472351047,0.74060997250877,3.0225185829148637,2.440597249933991,1.1453210306971218,0.26196448352275303,1.4778656830800296,2.8760987037932786,4.480680320793608,2.1824590923997023,2.5506316450741595,4.216451406946193,1.7874591445070476,4.019847252701735,3.052345277549231,4.082864630999015,3.479543017442701,3.946009021884901,4.636367243820932,1.4519224444169476,3.325524618724348,2.9377775932094217,1.6392580742595564,1.5332312230381673,3.09605514191845,4.065838603632543,1.169586133841951,2.88637564248491,0.44535666873857904,0.7138242842803788,2.930209167988248,2.8990881532793744,0.09004143327863146,1.0004314642194045,1.3747572859573742,4.37628313695826,1.2923557969336497,2.1036245687527098,2.6707030944185197,2.7582877766967906,1.5612860401596806,2.10696282636357,2.3787473660587133,3.1082141361352145,1.97422325347554,0.12652347830458988,0.00023366958012527306,3.105131541537208,4.430180785372194,3.7627085038060457,0.6415883042667592,2.3003343058380588,3.664799545524746,3.3517076758974262,0.09687492457831515,0.550793361305485,3.5700226682204605,2.6817484389708888,2.0535286908893005,4.713254641378595,2.3700123389630945,2.4988496855549727,0.2543812793893063,0.7107385674407818,1.2658617686209184,3.7374556511010706,3.377374731408822,0.4842797840882396,1.9548367116180498],"mu":[-1.838024371126663,-5.689256926271553,-0.503729039851617,-3.564681807884502,-8.66931733544263,-1.637711627066114,-6.490365132203411,-0.1590408676615218,-0.12942008970444618,-1.431922781127033,-4.404243401371122,-9.708598958524075,-3.8126362212366938,-4.382417026185257,-5.4089953088675085,-6.768854766781294,-1.5234171802856311,-8.007096117309441,-3.9664451975590476,-0.8974556915410736,-2.560295268701158,-6.662840281860727,-4.375220471706811,-2.542909185424629,-7.085126663417354,-8.5716565955169,-3.8557940915263478,-5.570681481613004,-5.893805682229614,-8.380551978499655,-9.567877781577467,-7.962356008658138,-6.3664776745774425,-4.404373076279196,-4.658944813081403,-1.727261786605394,-0.4909519484860003,-7.965690913931899,-1.6802728732861438,-9.69526146808757,-2.948768670830837,-7.89746116948259,-9.407056941518977,-9.85483863402035,-4.33634024604803,-7.368595764835972,-1.5643330859281845,-4.579236514853862,-1.2947740462887936,-5.442666372609195,-8.22867119494192,-5.852273907191035,-7.257921136251757,-0.19165697761041267,-9.779958523365694,-0.4023003530724867,-0.8593534524921931,-2.4565400358250766,-7.728245004302899,-6.208552565317625,-3.3988489328152327,-5.861659049047246,-8.241743034782951,-3.070322060055186,-1.0294705036412277,-7.152554475432568,-7.3351539251847235,-9.065622363795551,-3.4308188692725983,-3.814367348638721,-8.162801918979323,-2.5007025722555554,-4.768515200552685,-3.8185749387096246,-5.147874922880251,-6.077001676656586,-1.2512893301657324,-4.463306773262707,-5.570838200592765,-9.84968298058485,-7.961483321346508,-1.4868271876440642,-6.769063015561423,-4.850656062539997,-9.923663153954394,-5.523300469289454,-6.382234622987641,-3.974847118518756,-0.06109992170242995,-9.673713728549036,-6.122006072449302,-4.569079563313842,-7.559789748848667,-5.028955910318508,-3.4038337985072142,-8.23737477675267,-0.27541766756090214,-2.861289976215875,-8.57824839446743,-8.965218994409764,-4.0111517042155365,-5.605156221042352,-6.614423312694406,-7.049985168178427,-7.415901848320916,-3.199422815202706,-9.364859104555263,-9.208597430534656,-7.01162821496641,-0.0885913053575349,-8.332848179496581,-6.72279751448015,-6.695138326012846,-7.78133830248068,-4.277022609443977,-4.162883937131834,-1.1982578454593873,-6.620775137905781,-6.851626727186355,-0.5610419568027014,-1.2605760211843342,-2.7269507575659446,-7.438862797890906,-7.496736574220002,-8.273538540887053,-6.116169324439065,-4.82914982641576,-4.355458799486483,-2.5484844065814727,-1.5328276749028902,-7.772914715322557,-1.8431959672667153,-5.527593946842668,-5.699158676963361,-9.967932205481617,-3.9909302962230475,-0.7318813338598318,-9.288722045373301,-1.4620645903722296,-3.6343653970495082,-3.779483214057824,-9.369839586206218,-6.577086562762617,-1.1484745492760173,-5.522490502636499,-3.771719802415636,-5.031841486108628,-8.345665038612802,-7.45149602155152,-5.454543243217664,-2.111647543666273,-1.7625290868402632,-1.1746128980110226,-0.7916713339173831,-7.556848051020506,-1.987750926852474,-0.45752347370585866,-3.1295604383643294,-4.824689258181618,-9.129750345467727,-6.9490034827004,-7.142037261592247,-3.014428880835769,-5.465341990691246,-4.849571673003457,-9.008442037699746,-9.319318033397508,-2.0858744796060535,-6.199308106543276,-2.5563063243949102,-6.3722639956985265,-2.4433337748386874,-1.4880032858558545,-7.845839339440137,-2.8808433892621332,-6.3727577570288085,-2.4141596749427463,-1.7893783076392844,-9.241550148876236,-8.46329729122326,-5.488134676914993,-8.20394696648541,-1.7436508613195123,-9.170325156319503,-7.455428910303934,-4.510632971231699,-8.613451833225769,-4.86537453502015,-0.5471917603873777,-9.701338291495334,-6.364448429623155,-5.55752081968512,-6.114151232213121,-3.5453678631717733,-8.615346514463404,-2.3871620473795674,-0.39856731636751297,-9.617261689634919,-0.2874241483795048,-4.807007846460878,-8.332340275799066,-1.4763203837407368,-4.258982971395033,-8.170064637147043,-0.29292348401892765,-7.76027547460691,-2.7519802224042533,-4.89985703425035,-9.91043716567158,-8.202041666989723,-9.919748803035004,-6.145377483987547,-8.099609682283615,-3.1730301071517486,-9.99860621418313,-4.2225274781027995,-6.529128829181284,-5.375891326063922,-4.85117902361665,-3.6543369159526495,-3.4867709370252875,-7.128504430897351,-5.385707811440086,-3.5035311393228197,-6.39487540105621,-0.8644510565070918,-5.508884569931443,-9.256927985210208,-4.711120868627514,-2.465844490636526,-0.12200115227705366,-3.0687061466889776,-2.2195017837561726,-9.184028364578863,-3.0999324079434376,-3.67563895689786,-9.860306955510323,-7.009074133820161,-2.78279783196693,-1.0768406414449339,-6.241387831647636,-4.943094737894375,-7.195309110442716,-3.90638892863036,-3.621401536844704,-3.993073566942449,-0.7550869921542414,-9.626447480928581,-7.295100407554451,-8.534138897848024,-6.4040492266431,-9.635861714990998,-9.872404828815027,-1.2560714607482448,-0.32501963665095834,-2.8212506537832804,-5.9369374257101715,-6.4031665364200085,-3.4053421906623593,-7.752704813160236,-1.6429712829961174,-7.839222185831738,-6.751261495781837,-2.5129296906681864,-6.525286731929123,-4.997409434164853,-0.08019313808224515,-9.053665910077628,-1.7172807923409694,-9.623621744551972,-4.450046622146164,-5.88712398972437,-6.144574713667119,-4.5973841456452895,-9.058413797601697,-3.9275909826696287,-0.7712835314915045,-4.8583976127684,-5.45903698066136,-5.346645834618819,-1.6604972774856597,-1.9006924156371041,-3.108749789893037,-6.89459504066428,-4.701412337552904,-0.37817887915280624,-9.569536787522496,-4.378537038372574,-4.347440342567943,-5.643290878060014,-0.8267359139379726,-2.0982567458814594,-3.2523951664914796,-4.940713247592914,-0.8995798837717373,-9.55321527449708,-1.2929700565258373,-6.412269285553163,-7.635284569716456,-0.5097082588533808,-1.1712635667028448,-1.3708049259095056,-1.2734855507799492,-7.805483657653012,-5.954174165912383,-5.407032037827248,-3.764636825067771,-1.4566405577800023,-0.7460309696038503,-7.967365592279505,-2.9088212140274505,-1.0903699528204847,-5.075895357740253,-4.110425641398734,-8.703557405356841,-1.8069830684695187,-6.39083543108856,-5.383680036699472,-6.931528911341205,-4.0111984591867085,-2.186188396692248,-5.811490066619958,-2.8139505150906174,-1.4226983780193003,-2.4508839316925934,-1.9178848168389107,-9.446708815193947,-9.651065674234225,-1.7948533685080292,-2.9734712207625003,-5.378610453312507,-8.773095649032495,-4.995954133730008,-0.7543797512856965,-2.4580678499222652,-2.5757950500916738,-0.8334999631733053,-1.734917912329761,-0.6727122967142418,-8.027592575621911,-2.0078454301570514,-9.294375682695286,-3.9375211993449266,-0.16054231122736962,-2.296024320147201,-8.58664924140881,-7.1958430370443,-1.3707905561367562,-2.3983108179323276,-6.829978755419619,-2.262450963079916,-7.134660983796428,-9.775020037251721,-6.147899926523783,-6.039522038538276,-3.4792334268979963,-7.825707222889062,-3.7856397636353933,-7.28199500767603,-9.62577361718296,-7.650569544571708,-8.870091373696077,-5.71063900547683,-8.877284995466123,-4.86187531168798,-2.1784299375626226,-3.9437727081758167,-1.9752251321695002,-0.47759570753919567,-1.9959426850774986,-0.5600309470325127,-0.3298165717216506,-7.191093567259332,-8.533565812792945,-7.964780384318269,-2.6650666613439378,-7.002783603065039,-9.845760663133436,-0.9024804162868993,-3.726013579008449,-8.458996461980686,-1.590899353527837,-9.419358892811758,-8.631438448449138,-9.962063562335048,-7.370114916075005,-1.3584698725890565,-5.824657351914839,-8.815120670181598,-9.689102225753244,-2.959727167328796,-2.2899022047308892,-1.23874346065461,-4.410810208876241,-1.5307099545784797,-0.8744763117613785,-3.7388524637874943,-3.591775032191955,-5.43399536192492,-2.323912414242366,-4.555705317723944,-8.421972512781101,-6.634982890914394,-6.6903323068188,-9.712266811533963,-8.229261621032432,-7.642688342694739,-3.156738779034043,-9.111558767417458,-1.4652446483989245,-7.430388903899612,-8.723870165338653,-7.8289505983115255,-1.8009873277492638,-7.300586760499872,-4.882077572460841,-8.36568465574467,-2.3347296509325033,-0.5570250909444852,-0.7030434568582478,-6.166172016178065,-8.506581418760433,-6.752337932572521,-1.1946452646133165,-4.386031260918861,-5.599957886643356,-6.163808111402682,-0.5862679710318375,-4.6718072217053885,-6.311054873190209,-8.669985124302777,-7.3288308716917445,-8.968881217300211,-1.0848419173801593,-0.19683588783076633,-2.854762598150755,-6.211841641185778,-2.356958823951203,-5.330615810045003,-9.432875123497642,-9.955072093366734,-0.7733628637903767,-8.624211437788157,-0.33066819886775844,-2.7784507429239635,-1.8925884924469405,-1.102492792760752,-0.23201088047017038,-2.0445796616226963,-1.255698743784952,-1.7865431237916973,-0.6611703473963182,-5.844706655934249,-8.93897848233172,-5.913178029101058,-4.541039961472924,-7.328066125919312,-8.93535685431666,-4.4338718032622815,-2.4153495469294217,-9.238583823355484,-3.4230417734067853,-4.486898974227637,-6.3311262033810305,-4.670459476656568,-9.92305993419161,-5.602798503725128,-2.0873001722926277,-7.6632449589767475,-9.190556530328875,-8.199347901397225,-0.6447154216005013,-6.635568721651217,-3.3685212762531536,-6.7404115982587705,-2.5032684607490174,-2.675270733616013,-4.760657703765547,-5.617507495746099,-5.942133205912441,-5.776653739785706,-2.055913857181586,-5.550029609397049,-5.3623202155930105,-9.396511714388877,-3.170057722637083,-9.093096397480828,-6.956027026936948,-2.1095055097239723,-0.8332974076551602,-7.736571307118602,-2.8956627187170425,-1.583758914939708,-7.174975154065908,-2.7314276717969155,-3.180358384301447,-7.8195342893175095,-6.261779466664066,-4.270458107122601,-7.286964531447455,-2.302429306235927,-4.5134764806640675,-2.669155418878244,-9.082999182248306,-8.266733670519827,-2.655283827638557,-4.9916095829804386,-1.3383108190875892,-6.6458059323441265,-6.45634054251498,-1.2505358035583791,-4.825124599910406,-5.931536128073165,-8.04680784058225,-6.420605691970689,-3.164252980629221,-5.296413417394337,-6.602805258568798,-5.094195570870534,-9.47029929702847,-8.133369976663225,-6.869820239285136,-3.2589585617975447,-5.8189977854056245,-5.532326546136115,-4.8495579028769376,-4.481852067236591,-3.6174465481067886,-2.7478694544695004,-4.103230117710865,-9.303093436821985,-7.1919713567204235,-1.2093925637348324,-7.992717904966462,-3.2797530323118007,-0.13891048029516906,-6.540856176272081,-6.043876027439808,-9.364062692107943,-7.640233680450574,-5.61327032279001,-0.46724244598752795,-0.9579616914011169,-7.621138405407455,-3.1946412695705906,-0.482842260557208,-7.077297838799275,-0.4091239140431835,-1.7135442027795311,-1.4649308803288918,-8.827767957480468,-0.7621708092382784,-9.191315268659237,-4.676392506022696,-9.336791621755188,-9.213032584888794,-1.879570234559882,-2.86971063240675,-8.01922598960818,-2.456014504489483,-3.180851778300533,-4.520051286560296,-7.001581688749161,-9.55103494856977,-1.8413456358167934,-6.479811068087013,-3.5612103917523275,-8.37855021045609,-6.883882310218297,-4.479911064590105,-2.708673207573604,-6.98313431801841,-9.848013914110453,-5.012923558465161,-2.1086432374591313,-4.827094107430807,-8.722589346812793,-7.733834999119271,-0.3602475818049289,-3.5195372802170266,-8.908168061346357,-6.383802687044852,-1.6795336337500655,-6.793656063075863,-0.20184749790970846,-2.5895391746039143,-3.150621346682496,-1.6626223206598278,-9.411848212533195,-5.397120981449623,-1.011752373269632,-6.164416104046502,-3.04631790838505,-0.4624499463321974,-6.054544176969441,-4.9013115778047744,-9.710753457399177,-8.524462346733808,-1.7435759085135794,-5.229639479701602,-7.441496521834292,-9.951124456131247,-0.8518432519624763,-0.012620750737541986,-7.81656171662942,-2.3684258186971974,-4.751520404255791,-7.469852560241906,-4.547835039174657,-9.248788675691346,-3.9048714573003407,-8.921382708649737,-2.7137433804923083,-8.924066631588794,-3.3102790285301853,-9.608345680590775,-4.0859423751987345,-4.67487393616794,-7.738533977709783,-2.262418035757554,-0.34806479715745464,-6.314746461596547,-0.9892971541566409,-1.4344511020592088,-3.532966388435741,-8.807876615138856,-0.7288043044078352,-1.6011409788576048,-7.913383163929222,-2.2677954906737385,-9.810979949980922,-6.965903891109972,-5.420018308810304,-9.437432287108926,-4.60513232992112,-8.91577472425916,-2.2352825216003214,-9.050996412520565,-5.751285325127524,-2.835853825817496,-5.6878289097719374,-4.904696758575138,-8.99829480196625,-7.239475652628498,-8.388626100139174,-6.36675984333229,-6.52592460280122,-9.041698053672725,-9.097684309773786,-0.39104186641467864,-4.537604488972676,-5.584376626038963,-4.95995118824194,-3.0608202066354795,-0.8149340881799283,-4.4331934990794135,-7.48923007206386,-6.326382341496652,-9.031718452598998,-6.324066889572597,-3.1953043557537675,-4.894951076557545,-5.145222716994113,-1.4480059423566938,-7.308263011628055,-0.537656745273436,-1.2319406367507035,-0.6244865882837525,-5.881834219211244,-4.199439785677399,-3.2343611416638796,-7.997497072929727,-6.498332001435834,-2.9585111842468237,-6.658426866503233,-7.099584738221525,-3.418287226579888,-3.4072385197884336,-0.41574433917774156,-1.0558341441762176,-8.061949344198974,-6.447223402002762,-0.559510712066571,-9.616083122913409,-5.251462418363122,-7.953152945648179,-6.593203222498502,-4.895314427199797,-3.9773900846540045,-2.587132250363573,-4.24083584769866,-4.17880750574652,-5.586155748722314,-9.298881484778725,-7.710479103573533,-0.9552701739927549,-4.877709862736173,-7.026834343662937,-9.028933449534211,-1.6239981976094242,-5.179079841335838,-3.8603361387214985,-6.428372735922194,-9.252891523479423,-2.715746074918599,-1.5782070658843073,-5.960510833515329,-2.349288482362526,-3.3451152408028784,-0.5790307712489007,-9.436296197074247,-6.0920712082836115,-0.8037818424194643,-1.143847542535792,-5.507304163387142,-7.188799511736834,-0.4978452955979895,-6.191250254383551,-3.9516151641258235,-8.62492412481324,-9.328247353882656,-3.35223514596648,-0.9193167749335962,-6.64245714330312,-1.028505745285473,-4.911821591052528,-7.3992995965813275,-7.555841595808868,-4.845420072607006,-2.8523900901623556,-7.010855689805315,-3.7082063711768942,-6.0500894813767525,-5.429602713859973,-3.1490912821312445,-6.914723588654428,-8.002897458503151,-2.8749981190236618,-3.7986288157652326,-1.1180492144623133,-4.666116320352563,-4.111859222108163,-9.930471778824208,-3.275838654905583,-3.9457972300526856,-3.5416699175086896,-3.698748142663675,-1.5624997357294124,-6.165554400931912,-8.817939788731039,-8.278366674213256,-2.990754965980733,-9.80653961414198,-6.409396794194997,-3.1645316813793123,-2.025321577747521,-9.9361360477713,-0.31295227517397217,-8.284147093619508,-1.5304301536873877,-2.231282321901613,-9.954463075863647,-8.668255237174003,-0.5851708009659595,-7.912018525405811,-6.887465949719555,-7.660924363278065,-9.89532241697555,-6.260003731920136,-8.924157751616143,-1.2577138329300297,-2.96395424262478,-4.416994390897706,-6.403341670029981,-8.10851123028991,-0.14129015256022281,-3.385634109601545,-8.872908652719742,-4.922216973572649,-6.128216925951008,-6.083547945860735,-6.070753065075545,-1.4314822590313891,-6.861064349228531,-0.8886070822811476,-5.551331871790568,-5.2806187602318015,-6.058989025419798,-1.7416596147479324,-2.299889879105914,-2.8263548000409155,-4.407292429142262,-1.6984920939497172,-5.167901558786783,-6.654731549563897,-1.0520957978134482,-2.397714956974377,-5.334432697564353,-0.6763493862211423,-2.245108159426712,-0.2867475287114818,-8.338716627643324,-3.5456939026972356,-7.447401032522865,-2.2261472130076565,-3.635227112355508,-9.577617211226439,-0.29034451828638064,-7.491717662805626,-4.642028871094577,-6.033313703671805,-5.138796078078611,-9.187495935757791,-8.904628632960822,-3.877116281506612,-1.9582025297456274,-3.44900162575567,-4.933859704070816,-4.511007247867031,-8.255381201645983,-0.2269437462201429,-9.292647722584235,-8.310269210612876,-8.992312584982596,-7.8882679274265355,-8.411998510292895,-9.7538975562036,-9.090008664889437,-9.131469265329068,-1.434058655541759,-3.650109810246265,-2.471588908744433,-0.48918928257627003,-9.392437060989334,-8.46353876166152,-8.42882555194029,-5.788877037860736,-6.527083504671429,-0.33659014026509615,-2.365000749085522,-0.1985971794209651,-7.98079231813261,-3.9715151416370675,-7.437080291477467,-4.591444642002999,-8.494216281210763,-6.883314982068853,-4.238934539299928,-1.322346702518018,-0.8426918721460797,-1.326985867185717,-5.92465948822952,-1.659661400209933,-8.124729489069518,-8.725329370632682,-9.291455445259862,-0.42825805371713654,-5.224871986223249,-7.710662058509287,-2.628385901519932,-8.513952778317144,-5.76563795554224,-3.5133751619620113,-3.434202836156266,-5.824970071432773,-1.517199114500578,-0.902529528029461,-6.661912639319663,-6.240042903085046,-6.658478927243019,-3.7931381864581093,-2.105815700385769,-7.241130996308112,-4.744983388305217,-5.840939261260232,-9.557227904784343,-1.7786649829025558,-2.3715235455396044,-5.896920887093319,-4.215190743512551,-7.394346828641112,-4.481230675802619,-7.137786199563971,-5.848622137923279,-2.7174111465748663,-0.02847834174960928,-4.734074315932421,-5.996030450370529,-1.8551827141629929,-7.6592287793453036,-4.7849890712961995,-6.1377177562901775,-0.20105079008009286,-5.888047983880971,-0.1580115271724769,-3.8340215215760343,-3.5889564789174266,-3.480209191562784,-9.304496811097556,-9.133937979543632,-8.323046445075788,-6.789816298147368,-6.784725045842432,-9.810447753300558,-8.727708778380638,-2.380129860737956,-4.99422593274522,-9.433524287177452,-0.6790495919188433,-9.20308032617321,-0.46698083868295104,-1.631460935234017,-0.1606550159113329,-3.56042976682738,-1.0907927529022166,-4.438657451924383,-2.7300320662937128,-0.6305081106391275,-0.135898318035943,-9.517056001237552,-9.20725486535931,-5.197649197303544,-7.9360383156283,-4.883319503612366,-8.95157671478389,-7.591700562693429,-2.7051838128672956,-1.1194225461721974,-0.6759459319766625,-3.875384286405603,-4.987347192857438,-8.913730872049179,-0.2100296313349137,-4.696830480652943,-9.96851232825098,-0.538163214477474,-1.0599626712071797,-3.4069299552230414,-0.7545277219707991,-5.35823967119212,-9.2590418784002,-2.223643908539017,-9.155245738729953,-1.484067854379636,-0.6168034895120655,-1.60376024823786,-8.141537233235518,-1.9059339754396154,-1.629701362026077,-3.9665118216427775,-9.00746403258468,-3.89980355395106,-9.664129633088908,-1.4428515376946205,-4.093538888081181,-8.79977093731189,-7.497775403702674,-9.771033945908691,-0.018983081630610243,-4.854902578589353,-9.860299684743657,-9.553008045999258,-7.768817703895213,-2.79954169519963,-0.1712970093629007,-5.951018023074512,-3.70747051601378,-3.4711795800424317,-9.405326329546277,-4.617605758159147,-5.220203431845441,-0.7359984604537839,-6.960491974045642,-4.679291797022238,-3.202571901347333,-7.347052581388422,-3.3286362479816223,-1.9439203479982603,-9.821994174463937,-1.3163543140740952,-4.374290583135356,-9.38141856704581,-5.3368522930333695,-5.316378168593607,-1.1596028378488366,-2.6271177392687983,-6.938980592238573,-4.4610856744062,-4.39572545066091,-6.7059393442465325,-4.723412997725811,-9.275858753354205,-2.4880698341801177,-3.4196945786667943,-3.6496410873730833,-2.1646927796851867,-8.506068107977205,-9.509972051428523,-1.2192775509854914,-8.69982703323731]}
},{}],114:[function(require,module,exports){
module.exports={"expected":[0.7234242812152284,0.9999160090834326,0.654348637708166,0.986201806470283,0.5671637852501116,0.7891739767081594,0.7701585773016716,0.9997245552159005,0.999907329925841,0.8971777447424669,0.5796119139414733,0.9635988335101766,0.9716354065698022,0.5903360949018598,0.5333936456397286,0.6638898453557838,0.6607269739850339,0.9705673939122474,0.520171422643503,0.9999634690962206,0.5687718232679151,0.6559055259521667,0.9128306106687919,0.6011516604999422,0.8824872408245388,0.7386351833555972,0.5716596226212698,0.6500144385964464,0.8252983235699445,0.9999832711772101,0.525560237545515,0.8877248830686423,0.8529683517712503,0.6455305105007867,0.9993624167275607,0.9979435603662513,0.8543314509807811,0.9982022713404247,0.7303751238637828,0.7698964888048436,0.8186368214794911,0.9999915223941304,0.9488145377012323,0.5822413888599685,0.9333254865095204,0.8265210404395167,0.5845018164483127,0.5852972622305006,0.9390794635195485,0.9336611995620249,0.9821373845952559,0.8765776580173106,0.8768154335460836,0.9975714012885426,0.9801550928766136,0.876753626101604,0.7326996266651171,0.7837865105791862,0.657973208464111,0.9558934851734104,0.7567283393355845,0.9644073832210822,0.5768829122173764,0.9999945342569962,0.7628761119630629,0.9981241307666093,0.5881223076172793,0.7102673496878948,0.9936798857212564,0.9614447254617511,0.5306380145246066,0.5205770676246089,0.9973512215541037,0.5859753121141797,0.9649374171841589,0.8362418597359271,0.9291990319757528,0.7189585176725087,0.8854303535704708,0.894225900292865,0.9999479503694741,0.9999984292918862,0.9581163918556725,0.7854911635196515,0.9860985977667038,0.7962034052515122,0.6601173829653835,0.8875497954234702,0.5351588373408888,0.9356004922688066,0.5568632468385064,0.8357717511200817,0.6578855990752369,0.5658408514363935,0.9928452024028314,0.5397577066383051,0.7999799533091385,0.9333038878376104,0.6249314307328714,0.5199693935566426,0.7279125088421202,0.6837775806852435,0.6703629132533877,0.9456171529317715,0.9453003400008614,0.9958829249998302,0.8302941724748206,0.5956780222173667,0.7265381072360784,0.723219002441414,0.5602355183502459,0.6919771521430929,0.9549660186329259,0.9920283779567818,0.9919162266033091,0.6387849704757412,0.6146802510460259,0.8372250981128233,0.6456096771330585,0.9783342325737727,0.8953536890732711,0.8999577469496303,0.6030548033999727,0.7082873789976184,0.8218809367229301,0.6831820324574386,0.9996887272974444,0.9273349126348851,0.617947861246813,0.6268732236572193,0.6463206418032019,0.7347767117936997,0.6036502409375273,0.7889353149873756,0.700058045484555,0.992129439957476,0.6922108476414965,0.782270605006642,0.9707419445715411,0.9791450787884803,0.8440581181281952,0.759559550318783,0.9986460517571588,0.9024806757686037,0.9877883507466823,0.9134984472889447,0.9636808618339741,0.9866475474326357,0.5726096199242077,0.9992246836133559,0.9988382985598012,0.5312049295229948,0.9555644921387204,0.8120835871472951,0.7959308278815522,0.8437673815058161,0.9997707582184782,0.9255770155514406,0.9520531824254048,0.8367240064592631,0.5548501967865999,0.9910921351801055,0.9969507752924945,0.6369784723781596,0.9921169849048311,0.9706674223632183,0.9666394753976314,0.9994642974653065,0.9317474742851918,0.8803894468752993,0.6625434476804211,0.5126629370792865,0.8803046132942544,0.9973150268044898,0.998827164648519,0.8805926416475542,0.7925365473561514,0.5396367438752115,0.5487443531100664,0.9403207076400983,0.6422578415643158,0.89109220883669,0.9904221387262344,0.77056207329065,0.5166880973616371,0.5483082604671173,0.7300626904647067,0.9800901090755603,0.801984220837644,0.9999859721910883,0.9068067606477653,0.650972388005311,0.8820522704798494,0.9997418602027008,0.6897212624552577,0.9603856807032651,0.9705159652443432,0.5968640750385902,0.6992576325371879,0.5020972031737855,0.9999174639256883,0.5510341651201065,0.7171829437261696,0.7254885921277601,0.9982538596776318,0.998927950217421,0.9534482361135931,0.5524152811447874,0.9992030007171733,0.9875234189946104,0.8711960235644125,0.9964748867950468,0.9920853601297723,0.9309513262255106,0.6257790619563955,0.9935979653075919,0.639516569770081,0.9905803232990935,0.961805395593417,0.8570263892373042,0.9285765623476698,0.7516909503167652,0.6826351975548595,0.8782729062946418,0.7235118712532544,0.8011010187007559,0.5975093881944595,0.999972847375062,0.997412091757799,0.7666761700125527,0.9985075085681349,0.8985084634710082,0.9985395150992398,0.5044974886265773,0.7030548834110799,0.9922420716432251,0.9714967699547371,0.9998197695785156,0.7769161000302999,0.8014978788260149,0.9982780364003738,0.7979440232501258,0.9935741599718925,0.9816607052141948,0.7962600411320975,0.9149812687308525,0.7016024367315333,0.7972610860364282,0.9003154045917645,0.9999993340245721,0.9956915784716232,0.6571548128451671,0.7009595096842213,0.8761664754800853,0.9201977629406005,0.9397051123361748,0.7352652650535576,0.9720479663523186,0.6999920271380589,0.9955633621475215,0.9993143974217173,0.5118377797245987,0.9984422836416867,0.7886627117447534,0.6054437144198149,0.9988841732001847,0.7248445665174491,0.9972395550468662,0.9963169425847156,0.9876592926036978,0.9904979884831674,0.9976685183979955,0.6017307986863802,0.5414316870538233,0.8748000928044218,0.9999979096609884,0.6710361726377835,0.5260729181019479,0.6992533990656761,0.5777650242227766,0.8985249578845342,0.938728217571605,0.9959899287737357,0.7921329766306106,0.9008037484726272,0.8304969226754613,0.9995553975059991,0.9299186264791517,0.6612178957003634,0.8294590534119597,0.9123979088738782,0.9622748880510469,0.7237420733048535,0.9712057784261992,0.9382887644324828,0.9942971439886656,0.9759505375451596,0.6408698921746329,0.9998247372855384,0.998059240522743,0.9824649892656953,0.9670096500802636,0.6031082605357644,0.9828767120397479,0.9992548592408566,0.6806040712908149,0.9849287409418541,0.5069329943015202,0.5030031712390622,0.9822786771421851,0.5698983803871159,0.7168018766046198,0.5212168759931236,0.9994280524490893,0.6503248215957618,0.9961678806447231,0.9957967559677536,0.938496873633963,0.9898374392947576,0.9435165645001728,0.9172817719117671,0.9710855836354052,0.859573899081294,0.9981483777893443,0.64345989943422,0.7082759151401432,0.6793455393502809,0.9585132341098413,0.9049617704771427,0.976649465696061,0.9690376999985038,0.7118191353087747,0.9997030911748893,0.7683397547580347,0.6977303607004931,0.9679545343215111,0.6957678308669051,0.9999885309144938,0.912533523261225,0.9631981896518378,0.6903453259082528,0.6416529495573711,0.5618545260246625,0.8756452984238245,0.9243597322907974,0.9697964841399596,0.9121470703671886,0.6593963102089854,0.6144594118687198,0.999999861274274,0.9510952844459293,0.9998793535597141,0.9723595606017258,0.8826608710496485,0.6334985941640705,0.9155304593925279,0.9965604222888138,0.5703318101776866,0.9991645765933385,0.6282972618544188,0.9963425551424621,0.8157789117448496,0.6300562004548957,0.9625157973627124,0.6632869848579948,0.8647750884476959,0.9998153528075372,0.9996305130401908,0.7177405412787465,0.797769545393025,0.7906696119207811,0.8427609279434622,0.9985224087019975,0.9959974955961517,0.9972998747068161,0.9991097250007914,0.7087793774610032,0.9470122346895007,0.9999926900566264,0.7695684445965068,0.9916457855807141,0.5381248079397113,0.7803501333377737,0.9111456653708916,0.9745759407991781,0.549379242551082,0.7425847775056692,0.920621806512727,0.9950673587537057,0.6417577627778475,0.9424869114688572,0.964548424363734,0.994025673769759,0.9999465629573085,0.7600122443821807,0.9597705900938784,0.9993021367199806,0.5328426013341301,0.9646381529127761,0.9981858818659908,0.9443666290565245,0.9231863887745217,0.8567274822461364,0.8996358164940715,0.9989469145087037,0.688478219636655,0.9979940048169791,0.876374651297873,0.9243082084600553,0.9823404466967331,0.8271866086558339,0.9868205953769703,0.9695128923666891,0.9065425729574224,0.9414502742055849,0.969357915017826,0.9956103284298964,0.8171198999232232,0.6579223573122105,0.9259800640743104,0.5419855346027802,0.9453231675551697,0.9998468036891629,0.5241355196326876,0.9655766400907305,0.686321702932561,0.9981750303470622,0.9261342607331937,0.9767148000197883,0.5857837016596741,0.8495366075727376,0.9999838579035843,0.8195324488712596,0.888840423941695,0.9137140458414365,0.9990610252246935,0.9730442009810237,0.9893502908375208,0.9129315254264294,0.6436690755721762,0.8931263123661671,0.9009231958277244,0.6714294692996534,0.8153570678432309,0.9397653669151892,0.6389382916478186,0.9927244359385554,0.7115369938682885,0.9853552201370098,0.7638785452537267,0.6316049222751086,0.9766703877513677,0.9984021156809537,0.8995273106230142,0.923874438855314,0.8427934405796145,0.7345005959936645,0.8931455944117681,0.6135899839055725,0.9419859436271346,0.7198335588941446,0.8836280470398561,0.5387149238778114,0.8348071204950749,0.7463049045910718,0.9999994937780698,0.9993974086691816,0.5486181402948581,0.7380490745745468,0.9999869505022841,0.99573413184311,0.9273563400458233,0.717871467532917,0.999986376833739,0.9330419794927369,0.5207270664031962,0.9907606545549325,0.6368930325805562,0.6236242705451518,0.8599038635546656,0.6003445071740886,0.9519887382419587,0.9862408611305111,0.8869717568787503,0.9999652441358162,0.9958669325111761,0.9965227006886797,0.9937329149934641,0.7169445991450587,0.999858979161352,0.9998230484813134,0.9998496346499852,0.9958273848102717,0.9838325179257913,0.9998800108091234,0.8821964581822589,0.9503601006838682,0.976819647199674,0.8806851475079118,0.7871214348268837,0.7552011708842339,0.979012370192454,0.9128351108600624,0.6375096261415186,0.9978681452811153,0.7633817744440544,0.982520287516561,0.946150865758076,0.7535043517960448,0.81721306276579,0.9999921777080972,0.9440069604959485,0.5603738372866189,0.9433462022106345,0.9993436083417045,0.6767793329439331,0.9999644317930647,0.5861535109884417,0.6630641819330548,0.9426781650619733,0.7153680833793642,0.892759108384271,0.993966849151274,0.9394598334410926,0.934943798362772,0.8599265011958764,0.9999982319903903,0.9759892922492848,0.9914408419827652,0.9999999999771694,0.9665045549566034,0.8840097546771387,0.8334909958263343,0.7705941439192266,0.7077767222951391,0.7322327826638743,0.8704564644506424,0.9999995741807486,0.965804076804455,0.9995834347917227,0.9539039711492949,0.748977668810629,0.9599012045005388,0.6457576414180322,0.7257832274040579,0.9980598887569619,0.8776680051754874,0.8980320227697204,0.9728057142934714,0.5533132974230761,0.988292357990483,0.5169433233043014,0.975555090711989,0.9999983738998998,0.9061232008665847,0.9691192162082176,0.9999876178868502,0.5829844512507653,0.724398635244993,0.8336607187928343,0.5992736063793839,0.8021886928186813,0.9707802648809186,0.99539446280181,0.9718422180275469,0.5194666204853557,0.8710389596363147,0.998430995937327,0.9966187873829491,0.7754295864351823,0.5400253339164751,0.7148446210863911,0.9173940965081795,0.6917790664085423,0.8696240779261706,0.6179887412355298,0.8659237764917066,0.8364003837861348,0.9510396292696895,0.9988176004499443,0.9904418440209828,0.9768517816911787,0.7403387055703069,0.9800511018733155,0.9951536049404542,0.7175862313101391,0.988142970317349,0.9999822965668651,0.662901473775151,0.9625455104583629,0.9716605209236194,0.981230410952993,0.9270299821410969,0.9999758613221154,0.9999943375385076,0.6183233137464287,0.5316308830945456,0.9948794303647083,0.6902973228920745,0.7277577721763534,0.7829920717482983,0.8157331598995115,0.5570109292585335,0.9059592337039809,0.7245782606393376,0.8089412985603407,0.9976596336955152,0.779058569624092,0.6812252942808641,0.8792414226217798,0.9765563411801036,0.7924547479089827,0.8997444194569731,0.5568458263621969,0.9965849445655343,0.9980390967776093,0.646397582383246,0.9808617166509402,0.9160137161060924,0.6814727407215777,0.9240785366291525,0.9807233600475627,0.575754895955446,0.999843972708417,0.5386878012608479,0.633591489446343,0.7617006351843532,0.8994195943935296,0.6865240697281696,0.990900271897148,0.9999996830605083,0.9706953889067799,0.5598030646463642,0.8878064122138681,0.5944845202917342,0.9980639495824424,0.999999875117121,0.8276517302041237,0.9927378233920207,0.6720128572775041,0.6610932606823026,0.9279018983295003,0.921922522979339,0.8806686606112367,0.9999919194788415,0.6784214165285078,0.9991952641133167,0.9999426351843553,0.9894779980786261,0.8815675951179596,0.6465215002232942,0.9888678333160326,0.7003297976182097,0.9951318699036068,0.9999968208787774,0.6423940436554808,0.9997985799167608,0.9914410039124117,0.6859820311195213,0.7008384827274683,0.9992333958369957,0.9999998341110898,0.6033860865572733,0.9989891931674544,0.8166414265916263,0.5928608651577681,0.9251605468154163,0.9980584282586479,0.85022256393055,0.6184226829340277,0.8301100482644167,0.5921850232454413,0.9925262623010133,0.655879622277515,0.798124021026414,0.9999652279270552,0.9806929379271552,0.5844362212852633,0.9998641562489532,0.7384069312541759,0.6258657788756314,0.5685792857838468,0.9730970892662721,0.9989149117913103,0.9630462280319958,0.5680060873970105,0.6546744218383728,0.7141514576115029,0.8078757355409854,0.9931619864625282,0.9950279202251865,0.999040314418094,0.9999310513692686,0.9434869589980107,0.8276872959435156,0.6390718911224503,0.9974380430196508,0.9058210402684147,0.9636458424171692,0.9998924534344865,0.958059211559656,0.8284748424861629,0.7393243900076696,0.9931210053980991,0.9375745282747965,0.754888648943484,0.758598552791249,0.9714920228231296,0.9747937030307849,0.8523716974364149,0.83354219997317,0.6104827585347845,0.552118959309389,0.8052202038374028,0.9986132713851035,0.7552461761765953,0.7447547586569742,0.9360446815754966,0.9783763213597991,0.9949877597435957,0.6642263290541005,0.7204859874556252,0.9844186412699331,0.7620839109073475,0.5864901730219689,0.8361453021208061,0.915440094464005,0.9775541139924269,0.9996226921294341,0.5251271721071147,0.9188077870062297,0.6836648142567623,0.9981884889814086,0.6919967293048271,0.9233695124501649,0.9560373839331731,0.9678694268259624,0.9546395261584841,0.9764320921695422,0.9144141256637721,0.8272233173691002,0.8081979701953043,0.5422978963615908,0.9816146152083276,0.9999534130677787,0.8347233180079972,0.8901554242729105,0.9675686169254063,0.6000813333352251,0.9055888645393878,0.7043685931690112,0.5349872391694669,0.6674114732813858,0.5045861899405508,0.9955966206792053,0.7764952704432873,0.6882072451546526,0.7842999448612415,0.9999904033383579,0.99938905776378,0.996248856344655,0.8177633251070278,0.9817230067243764,0.9998762900200565,0.974511236359515,0.9812111173086968,0.7703355218933904,0.9986904557586721,0.997019792153141,0.7604711617777907,0.9756678132434831,0.9570102554006454,0.8668303109092641,0.8573690502028715,0.8617962558970055,0.6488976934547709,0.9991341704936642,0.9998297096089882,0.976223999373276,0.9513773296666034,0.9847175233037181,0.9697983832899965,0.9800440190439415,0.7171725810650855,0.9192511100802985,0.9993193376116978,0.7506251484856028,0.9532693704419346,0.9981437085810332,0.9299393067731327,0.6679586406953626,0.9985780613748916,0.9803437086394003,0.9123393865883159,0.5758240350092934,0.5230394446159617,0.8683287979871939,0.6434897614892321,0.599411043687548,0.6101718877291935,0.9393270116663505,0.5960385480793235,0.9999988020469404,0.7115460585974402,0.8771149057201948,0.6971277738790729,0.9464529714708727,0.8683681333123408,0.9839652405869187,0.5380497828731863,0.8794676153349084,0.7998887316337964,0.9805227463550625,0.8122557470554794,0.8940109503522669,0.9965905160378689,0.92983534746563,0.7594606642087744,0.7570258664625585,0.6379355863653017,0.9757887001531724,0.6794465876052789,0.9915501107439353,0.8363371475833836,0.7853852166265908,0.619631204494838,0.565112548753103,0.9578777549421098,0.8475851372311627,0.9716986935991635,0.6869358362350513,0.808656384974366,0.8181126941316894,0.9055274898802476,0.8648519779215756,0.9919662254662438,0.6976766966952058,0.9652435465163955,0.9905698226552999,0.9141430832514159,0.626764065203513,0.9881480866812785,0.9985335705773063,0.7241979039310089,0.6088906120607539,0.5564226734991959,0.880028912440757,0.960177601355091,0.6949310603253592,0.7549723573209378,0.7437877128887685,0.9027762370345164,0.999868662750666,0.9832992364186952,0.751237678709205,0.9997114062692818,0.6149206361180314,0.5722203546555088,0.6585738723293414,0.8580043568563324,0.6773235974649624,0.9783639175843039,0.9725912679785618,0.5665088272827509,0.9581372795021728,0.9999431349626884,0.958797909007128,0.9869644474526352,0.6298701503440507,0.992633786113054,0.9570448435030541,0.9978336343790393,0.5411716365659301,0.9837534805147505,0.991568641887302,0.9999917652169095,0.837468843779693,0.9534454700046322,0.9979550577185172,0.8827596271410073,0.8839584463751051,0.9994639568472121,0.575098624984708,0.9063203452317343,0.7260636751888189,0.5946524068889727,0.9940299369026221,0.8891000426617646,0.9993192491141255,0.569271773727127,0.9963797522656381,0.7383919895356285,0.99832873692498,0.8048849087300831,0.9238050610573166,0.8232671954766384,0.7876344630614781,0.9713047534214405,0.9999791756392111,0.5565305443717599,0.99446343405125,0.9216172794238541,0.9974579138146713,0.5165881801959741,0.8570496047279043,0.803310479991756,0.9358452078891938,0.9996116447114242,0.8571537416604483,0.998092251627619,0.9608209094590614,0.9448195038074355,0.9925676670652012,0.7863613365266977,0.6648104102684443,0.7756503422701286,0.9913175578858515,0.9239148638004776,0.9997941345804916,0.7053544003657388,0.9949298993732782,0.9965572199981603,0.9806249869399313,0.7521642423792969,0.9858416269931789,0.9493090822665959,0.7400749131044122,0.7298421148085211,0.8877281938663755,0.8437756490604521,0.9167832386542007,0.8992319994422888,0.7655612706250969,0.8410108153851814,0.8533602987549354,0.7581468162727071,0.6834961926008968,0.6885746306072636,0.5005811581386693,0.5420249813385116,0.9727270427382011,0.9952222403032811,0.6473996642973884,0.9597102444376358,0.9754476123148619,0.7981458922268044,0.9987698905034402,0.9705461400129674,0.6446168016588777,0.6773634087135875,0.9445041507446521,0.8233903377435203,0.9178061976651861,0.8238451791414086,0.9938361636331531,0.7940654842244037,0.5186728467098156,0.9999739519587353,0.9999159065824474,0.8177526781382776,0.966251735221491,0.5355514726934995,0.9420302378804791,0.8953052784209985,0.9815083507083677,0.7394103742080441,0.6524662944288977,0.9999162590897228,0.6056914979567305,0.8008862145029321,0.9953904460321186,0.9984628315243984,0.6693707105647302,0.7332162239673194,0.5629930219282077,0.8749969457883874,0.9568843324557559,0.7646304036656886,0.6578518975304672,0.7821715871127426,0.5002815980561002,0.8613722200643562,0.9990760061038755,0.6874519009060214,0.800621451484296,0.9750261206695164,0.8812941481825274,0.9463240050561097,0.5440075254043167,0.7149899738775388,0.9910486607555862,0.500975801499308,0.515567557830943,0.9448913160631472,0.7562820905874403,0.6967113426907499,0.5649006362192913,0.6941844232089672,0.6570499794721161,0.9331934823862911],"x":[6.076348279294763,9.036499851128411,1.7644663692650786,5.745646787672174,6.408594826357136,10.731742884181951,10.830597348802073,5.6153525447156625,5.478185888902152,8.687942792315853,2.846171846614597,4.217689029976459,2.701756739696306,4.458235343178014,0.39316994287903384,4.357961735900031,6.026035338565666,1.169811241654194,1.8196785079203435,9.328251778825868,5.288637441541078,5.670785677017321,1.5870763612108103,9.856963292126073,2.4900802803680855,3.6295821598851816,4.701599292492542,9.922184150285991,2.3075078772330153,10.189078038868242,2.0944892874584617,6.873678405189475,7.406318173427636,7.668554007861353,5.0867624687696,4.979665523865908,5.049721368491265,2.267921756461592,0.21672062481906895,4.652566140447429,4.222034077133181,5.353627354079526,6.485208570304685,8.29380586163265,2.4379167567428435,8.394329585953166,3.1314240608667876,0.8417769324997888,2.4404980668475376,2.585344544313161,5.941875458390312,2.102710264319499,2.8512572514371706,5.010950681400988,3.3141771281057935,7.79400030098778,8.94535534908536,5.5484103350379606,3.054025035520807,9.736197088879324,10.223462827221692,4.600138005222447,0.9717593669544513,11.604161830993604,5.380514544380466,6.818983427422825,2.6354416091535247,7.937680209290892,2.673883601669427,8.821680116385696,8.648561861489123,0.6217202377286767,9.420111361933527,3.1302145956067586,9.465673072488313,7.112050340717188,2.6349863485310676,8.852209113961358,10.057654845028122,6.3096924934874306,3.964441566075756,13.25858503537168,3.588714139368525,1.4367577183205078,5.421831942464594,11.00506377010349,6.982132541393795,2.7513433879202207,1.062744876942533,8.258123550366006,1.9045571664213126,8.908999624372015,4.232804081798779,1.4027059299971034,7.157775167563671,6.771876541664773,4.801999838392532,10.720221675970118,6.605002572577318,1.765894247395027,2.2438504525716874,5.162898948778166,10.624392807752587,7.914749229321233,8.775431578842694,4.804735360884047,10.340560305566605,6.935833228335011,1.7624322675381277,0.6925081261280052,4.7321542037844875,10.240766848969825,8.71228675182288,9.94605867629821,9.356137624246776,9.777863218105196,5.150969331538997,7.634940974843907,3.184978561191649,12.279744670439085,9.303966164085846,7.030042294326915,7.450517431341798,3.9410047058273907,9.371214755809184,7.006888424687492,5.311261102188619,6.866827475695246,1.099057431234486,3.1540819667306925,8.76581178201414,7.802363369134903,3.5950346664041435,5.110308877787165,5.079822959689347,4.485837548573997,9.334056104100952,6.416209238864596,4.8413835199472075,10.720636813218562,7.61319284713101,7.008491913642712,8.470379739945184,5.313950885914899,7.9173622503025065,8.280871134158058,5.869325298461178,10.020087951993101,9.501975449440312,5.280420489490371,5.309496219296987,4.697568342007694,5.908995306309947,4.077107235249074,3.108348392999993,2.8299563294280885,4.427518222574358,2.4865017331212345,11.592114657217707,9.471028232070784,5.02986863426586,2.235449802202473,10.74359626337127,8.486503098499004,3.666841383468427,4.494721384763617,12.205255443642638,5.286906616737208,8.531482677162593,4.665536938779426,2.668489426551214,7.580864752874149,2.9905737492015683,10.972795602237609,1.6299630569058285,5.5802510584064,7.042555804634434,7.144844271074344,3.363454749011268,5.830188899097099,8.482288410823209,4.240135007325189,9.921213413160581,3.397394482282719,2.341599246995215,3.910990888663465,6.461025487184761,4.787421283397742,10.176615856947112,11.462882527017234,3.7374654750150365,8.697471145931031,9.076380705042247,4.703090982610877,1.0578128769320787,1.8187881920818696,4.64232074094298,0.9017573054288819,5.638009592866722,5.1341607132826725,4.638431914889324,9.166003438580988,10.069206962101596,6.707793798926975,4.611053301547178,1.403677050819722,12.206704623431952,5.7156990030968355,10.23990617444348,4.198448733135744,3.1068730164468286,6.415165127675186,4.283560359897951,7.039726420946535,3.0151457664936787,10.798895752857305,2.1952907328737203,11.565707618874587,5.153708765278354,4.013052851439972,8.335851455473508,10.048031826301534,5.6137358993373425,2.8810207400064582,3.3976715736814294,6.5677933233220696,1.4754082945576772,6.400726181944765,13.127758737884736,9.840677398599793,10.272325742678268,6.859292901389884,9.833137391205973,8.51902527899478,5.131613221213694,6.710013284055725,0.8217550748687645,9.06466561027887,0.6245402139019883,6.1859911126810525,7.95522335295806,2.2949951325788476,6.865686331826412,9.323535371876957,7.539071979927364,4.264766332053716,2.741251096275322,5.74432457424033,10.386595959301083,1.2919296901667159,10.373697234371425,5.875280629865572,8.865227586340515,10.044886964002938,7.667493886773049,6.305205549677938,9.808125888428137,10.86009139198414,5.858817365916388,10.958899875511346,7.440661881273303,5.635635575286605,2.104776685110193,2.232706288988097,4.171174370882676,9.916069721603856,6.361894026797176,8.6084940952749,9.439194758292432,3.252199230441218,2.4079015731149234,4.137703046597987,0.2867953836493796,7.103160959131444,11.265496659520245,10.22826289924908,3.7752968375974403,9.549343606482777,7.996883168341786,7.654340426502505,2.0045473077470195,4.162567707457228,4.418688742430386,7.643103682552932,10.144558929135314,6.780654720448093,8.723452000781268,9.835380290224837,1.6536736307276743,10.428746343562926,3.5078169580019813,7.130320305494805,3.85189183399575,9.351208660459235,2.3871584229463463,5.188916802325241,4.669135798653068,8.705879386947874,10.818132813413284,1.376155199868068,11.275037768068337,7.249301777962565,1.871233107984315,12.623290526970415,9.387050040295923,7.714819098351226,0.6913970171482,5.548338728765286,7.149811010515221,3.123449204005394,1.3965079330666015,2.0461044693277266,3.1462566687404547,8.597657663857298,5.718278911557102,7.6529074404447766,2.5076984876619184,6.695311272478366,10.357328913714156,5.8465584438328975,8.007578620706317,3.228096643010447,7.35332878583915,10.491140724866915,7.109644919056403,0.9867968933448612,9.096718677244958,3.113859328660768,8.577400113348427,8.30396782292724,4.968779676093644,10.701239051724722,4.079038095450778,9.129294223994687,2.592284520072922,12.255716728946549,8.087993400445951,10.871123048525892,4.717304981034661,2.9285837594741277,7.15631415811794,1.9419397285089732,5.262660701992052,2.439194177427187,3.615965157617863,7.723359245459237,4.065616749650795,7.179785398460166,2.3865647244589745,4.42125714675416,3.1203719694543577,9.175373007130078,3.357142374913858,7.244786986731148,6.496958999952001,2.1202365697574392,8.952071269145872,5.326932727218208,8.167281820473933,3.8817152638195958,3.314332915937073,11.24961042734692,3.2667873542955554,10.043346737618233,5.077811307830121,3.45020957656564,7.896678465336893,12.012971803548854,6.453700177654427,5.621494772917576,2.2282271573030625,1.2354269343124666,3.8321828758795533,8.538104104645802,6.075863195633848,4.086219260444308,7.118726948691033,7.483981546850311,2.1749374840419025,7.998636916076176,13.167847548259754,8.586666728728954,8.287396369611514,5.827579502532758,9.941390253256316,2.6864307801047187,3.1410069447527826,8.038908111325934,5.262461179829953,8.023095714497286,3.312303917135936,7.796332374256369,6.363946920486254,6.628022124714727,4.56588408862505,7.56115490161935,8.487906919929886,9.629705530835496,5.4331796578028815,7.607287390893312,8.100939161109839,2.2385294163995284,8.95427921041068,5.593171958785504,7.035321196562592,1.445012308914922,9.563369989919627,8.598711300966505,9.832106738925162,10.012841785034398,6.13502106996152,2.340371548973465,6.248178449613112,0.8367937092174043,6.095350575618968,9.64833876016403,2.7320424749028547,8.199100348990342,1.7157824105845016,5.5642581147905394,2.8954599388682425,4.924578794820416,4.005503771003372,9.854631667086574,0.7715992327576122,7.943762639046495,5.728476343092542,1.7746708057427452,5.5415917968011765,6.334891238810996,8.809689985364292,8.036936626659823,7.330517358165493,6.319822809620143,3.3144559444758244,5.425278828807333,3.133996234915397,7.352772864344066,9.948713211404382,5.16217499839175,3.081723385183299,9.904021527711526,10.014242297125898,2.1476096466330583,1.3019871326522399,2.2077661252996164,7.721751542179892,5.242537034101992,6.669766857830412,7.125507788802575,5.02892933811372,4.768102338899814,7.142707901604262,10.703633950305422,10.040927784723749,9.257745879949043,6.506693734996839,7.065761561107631,8.20745656936314,4.5348242485818115,8.659709953163023,9.475423229862148,3.950610675523854,0.7983918929951951,8.162097654390713,3.3289585525377907,10.825497919101696,8.869145250978718,3.9420852858863733,10.974655280628987,8.893314099226027,3.8881441459353603,6.064424709441672,13.50254167330692,8.327402275509568,1.8997682818956279,8.900443921093572,6.218967658586513,7.95585934643817,10.871601236720027,1.5260077116515756,6.557139641383076,3.623326424804466,5.699365287900402,2.432710129326589,4.462599330675688,1.9321196324057706,6.820275928787531,6.876040996432985,12.354683395578263,8.823170062227678,5.382377695508217,11.387183958360376,10.69927042658905,6.839437336692801,9.695577671123761,7.355380844689009,2.605057589457364,6.839896449427309,10.525176702811084,4.652176684153535,7.3557940617441195,4.063501005600594,2.1381652708400467,7.909154866170242,3.540830156076397,8.170614138042861,0.9641688306952314,10.08076192524336,9.193933259848002,3.6841174810595563,4.797416671813017,2.066508704192461,8.348111148758248,2.564731774277283,10.08778497019675,12.799306141547278,2.0998233339487564,10.455527783944127,8.322855179870544,3.2011160503610117,6.380987888495794,12.738307835164596,1.9840342827000081,1.8029795634643078,8.838170776342178,13.46935615592021,6.940059720256682,5.257028963864956,8.042446784343381,7.687983303315244,3.3381720204497327,8.235453290513929,2.80012766240057,5.660571304752415,1.2693815768152048,11.02143255785886,8.524302960722789,10.193854400309753,4.571789614932668,7.158269453699216,9.53366394924738,4.128865971176128,7.8121038108834,8.27299556158208,2.1961001296274913,6.685098222242223,2.930810903111738,10.435447075786112,3.386925971003348,6.3718251798794885,1.5122006655739735,4.542594838966289,6.767171576281637,11.562780965003874,9.893583095761416,7.021484837755784,6.371762763733567,10.494362202354125,10.798857752034401,9.753145034268885,3.2071923395276514,0.29789288625626675,5.3313817126137195,5.1539045792692235,9.761398789442186,9.76095215714217,1.4397636438758243,8.987952560019197,3.8928727470245317,9.766539373833519,5.426622540228838,1.3757041758519852,9.91103028875624,9.281849947753223,7.322062195103319,4.814416036658804,5.924191406187909,11.793065208672202,5.04968826391802,7.839855446928716,7.223225422136025,1.1832034223940826,4.4725032706374135,8.863498226671684,5.7665848024199,4.811960326196471,8.978627826871978,6.324000572130268,4.143068475641064,10.084202207494988,5.09568050626118,3.7806466526016074,11.51963459502173,2.8101374160898684,4.794769826555957,9.334490609951873,8.36554526575826,4.553544936598912,7.8151988833454435,9.662540499411314,4.952038402434022,5.742731204704763,8.607209753588801,7.86489444498456,10.195119476781926,2.9406312872677427,8.878144406672419,5.086088784474729,9.61980447540204,6.854394835212222,1.2792970428947328,6.5966450419120255,0.5624274321919052,5.457925133183389,7.382079827895547,10.554882975735497,8.265292789994833,3.985706226288913,3.4029270818873036,2.0436341178159347,9.620950581930343,2.9290868340163465,3.8723782550919688,3.2299046407462684,8.183105979969708,1.7409475317675644,3.7477159566443707,9.011566937012525,7.18453279927104,10.029077945097416,7.693727306140405,7.942597630297159,5.548643115388622,5.629277443736187,7.949500391921399,10.502798765647269,8.799851185873203,8.006581748035794,0.6216896757683834,1.591549692023049,3.7904705934107734,5.58965734466639,2.1464767022977895,13.371376973468248,5.748075722541305,4.6983041723121355,12.499662268460316,7.052822804180648,9.32897457280274,1.5998933981375965,4.208065616368467,9.092186792772209,2.7649240434229165,4.9782974865017735,7.650118193574644,10.217351595161126,3.4264941804306726,9.47162624642114,9.2798002968178,5.465127037498835,8.187559798364086,2.317624338562088,4.256273345383952,3.6511953807321733,5.185371483022076,0.5806893258794215,9.979235340321434,8.68311316208162,2.329511703853869,2.9109525313077667,2.2344074566003407,10.916197090672188,9.467486043456297,11.157617236579602,5.627573975749578,12.544621795201728,7.277807085599898,11.49034495012494,1.7896320180778242,2.124622963825485,5.9152470221354045,4.11559473615136,7.455023885653569,6.665505794033549,4.960906676527059,8.726274633236175,6.378585343950586,4.664468703254853,5.604237712875916,2.3915289487630456,11.46024876122758,3.7341756876404695,5.8690827744210985,5.091276977512764,2.7779999137144027,6.577488058223611,3.5261827716385237,7.916205641125185,5.470522234842788,8.69089191496423,4.5211275875134955,6.276497252433205,6.1150561426772985,6.689955202109573,1.8126190385142302,1.5538173197436236,10.342408237042536,4.582429013321053,11.134942297461402,4.37991163007152,6.549630738882369,8.623802544162677,1.1729568628771387,9.769172610376529,7.859052840007785,7.80406191927017,10.34808543436095,10.43426300064402,10.265769148645115,8.358585320053633,5.898680549537118,4.7246860683458385,0.9391151085001056,3.3939496963164295,9.668906193178595,8.996357598611672,4.349688148501379,1.067282563230761,1.9029243589583877,2.860320221101142,10.540944926724976,13.437266771806264,7.692098742261685,3.864530086332006,4.645063096827658,10.87866646680153,1.5767710665873464,9.995094865272367,3.307691772880897,11.063742669272862,3.029732954199153,4.158318118717529,6.582664369373283,4.521686286617576,1.7921801031578866,8.549861046840775,5.4304476155284584,6.43993634306012,2.756135302895104,7.966698639214863,7.055079521085064,5.357070535160987,2.319691821226075,7.889210896733146,8.742243406933126,6.719404904263696,4.179525474059068,11.319887105167213,11.306577844470306,9.59695247062939,3.0155816922551706,7.260282034882101,11.168119939955785,8.17802471231163,12.400064130402379,0.3424522398055303,10.299814748612123,13.09845248569824,10.558316803943873,2.7154495878910376,6.561905985833267,3.8022781810356094,1.7830889063948316,6.961200560968109,0.9626723975451948,5.642718428323805,10.017447149032847,2.7599618020737418,4.297241269329062,1.5820484829577446,1.9024021467654935,4.129456210565693,1.6315749082666495,9.338551571810424,5.497350260968201,7.862466640910471,10.465717366222119,9.475086109606655,5.3272227986993315,6.369730015789621,5.520786400350722,0.8699826917872877,7.622989040779452,4.92113860034779,5.8427092832584435,8.900708392653058,1.8636310826075686,8.492430910458218,3.2109088672536212,5.389026614065072,4.142758728469472,5.555481021308385,1.2923540621440077,10.529161605363509,3.5086383447083818,3.404584206772216,7.9453921957619205,4.566445129798922,8.956709224054391,8.514992617481429,1.9545955837304447,9.916421088508525,2.7957928179899567,10.463483048957796,8.455124001013695,2.1918920615941384,2.207311819268521,1.0458335407139432,9.111358929573392,1.7499576570284712,5.032830326504577,2.940493675851981,7.48657482603873,2.3583901284246562,9.253908742704642,3.4632719014133335,7.36012591624578,6.488124968726447,6.3429037849605745,5.133775657286681,2.237485653863783,8.976922298651775,3.2049316860217614,5.163065686300689,4.09966325068009,5.037243688624895,5.757482006531798,11.528182265943684,3.913573818609144,3.241418196811681,6.389812900576781,10.678436017568414,8.126429854023156,7.082785981914759,3.8395233415197016,9.457806780913568,3.0322826939997283,0.4845474792395495,1.1026497007674851,1.158969791066416,7.358133761046407,9.332094850871592,8.58934924721158,5.304319256368315,2.5290022317959697,7.147750518823486,9.202131325569505,6.361532264366708,3.479470272641585,2.734788985772613,4.762922996279098,6.563860468354077,3.65959587036193,2.7285522126066724,6.51344467743734,4.844347744525533,7.106383390562448,8.684320517712047,2.395251749886193,7.879717438402105,2.930504253828244,1.9030667266958607,6.149619941101198,12.867971969374159,10.796088172918228,2.2238539297997137,7.964417225392225,5.744287110690893,6.332668117443683,3.7146100412972283,7.131344355209536,5.905073500709805,5.004046750208579,2.4167581492051786,8.992671238600796,6.755855364770864,8.568992441644797,3.031989276413861,3.431635144006936,10.268093560489199,1.2520071577613796,9.380825722267163,1.4494758588212784,6.055726716576094,3.320151973941842,3.9757667033049735,2.7595290241454387,6.276478622209719,10.178287456474296,6.726327134954147,8.500309806957443,6.747497702836455,2.124740276963866,5.664560479334279,9.576988316373008,8.754366854161104,11.49910732214763,10.611923213696913,3.423180176988909,6.547486331682219,11.036637606249426,4.099521843408378,3.309948180276052,3.808531740170802,8.435407639008293,4.334971792522909,10.5732077120334,7.245434717199082,7.549627704739154,6.214452305753936,12.317855522401281,3.366657024131099,1.5625052767339316,4.349907504200688,3.387668811771545,7.938959222778016,7.2500123894697905,10.604500415152547,2.7476917164114325,6.650147204590239,6.153449936428299,6.5185454176466795,1.6745714789944022,2.472342760065418,4.711220529819841,8.847305405080455,10.28316296608444,9.776638647234895,4.800596459817743,7.568997644601662,3.260854745112111,8.153751870188607,4.116393276971808,9.381752834332818,8.1797133331456,10.823661077889412,5.132178730104647,5.482100955188909,7.905121350727756,3.9225796093629395,6.775888312797173,2.3225017361527827,7.544453629761397,10.40419460688928,10.622987898032498,8.46961925203929,10.898514936639197,9.83601681973537,5.145717408555237,6.551703089126583,2.2824472783711105,9.16597923100089,1.2005093516971466,9.106139607199509,7.373806063516898,6.46390310528963,3.3805353093439905,1.9651928672395467,0.9971118309448077,4.783985481764757,8.380041452325164,8.616880352308721,3.2884398455350246,4.761758150118968,10.338128826577593,8.429466849384035,1.3038536419952407,2.3083631072325117,5.2520769924537385,3.8177441499465337,7.79203892261593,2.316252987764975,1.3433513644416526,1.4710556689299277,9.517720753719912,4.571109856096442,11.292224732801634,1.81226652943153,2.1861334999595465,13.129662408985787,4.8905852157450305,3.343952993491431,6.640014005197291,5.206414124207464,3.9636838885986836,3.874188347068672,5.224977789117234,8.421394640783559,2.404038945277305],"s":[0.7657935452240039,4.965200946535566,4.114856624440616,4.581519406938725,1.7375449209818883,2.813850070182604,4.268396151063523,2.180739349904041,4.270140603945999,0.613650696633089,4.010535658024957,0.7384438242946689,2.087649280818261,4.957316319302892,4.390126224803304,4.078588929376046,0.7381746715389581,0.24777627235098576,1.5868884892152457,3.2920385768438387,2.801150168968114,2.227274624063905,0.6598421773327123,2.6594914590208587,4.57272913295498,1.9114817008751128,2.9626293126854897,3.5671127539896874,0.8731844496700314,4.18161188492949,2.6084897039392407,1.739373407309398,0.626263901632631,4.6447806925415165,2.7856098682591703,0.7435964883153967,4.051323332950111,2.0472594665347197,0.377305725289121,2.481705829759726,0.5324999552999932,3.92667564552435,3.27145051744235,1.4480108111459666,1.9333019242351057,2.291694503824381,3.3903135470811643,3.4614277399358007,0.6906786280087351,0.6161640888691555,2.2905398923785136,0.7341439252760196,1.4675763838962441,4.454880014134456,3.599979643186372,0.8355615744718314,0.659672481757595,0.5320222984249612,2.3949727061277857,2.3591677359670102,4.61232624332062,1.397159197269573,1.643077934840328,4.740619861914728,3.8166150723115857,3.7451105937299523,2.251213032536424,2.8172385848588166,2.46611814134037,3.6761789458078997,2.61365226925818,1.6042069894592736,4.308025548377597,2.125090815759445,0.05823549042140885,3.0146004244928424,3.4648644278560106,4.993945861949781,3.551820435891818,1.2955136505135367,1.2330117851901057,4.58584885685251,1.469816335126809,2.5505038779346645,4.979621483769207,3.5045590450462907,3.9424608382807658,4.956003045741134,0.5006863910543313,3.345584753480736,2.2431912161540746,4.172796219729058,2.422179586330376,1.457738796433814,0.5376270250226534,0.8115319755327322,1.4678602267494056,4.652019955952027,1.1105259169292803,3.3289905524563936,3.7953502620920765,4.129611917240382,3.6889183135194714,0.029043982011064395,4.60217351297786,3.712920227096108,1.5387842091401427,3.8131398306093276,3.152503118789749,2.524732055099851,3.492894246804119,4.170703327903668,2.95810778115855,2.213842839147311,4.520916865161308,2.029242713977879,1.5754592465289396,3.260932535381942,1.4631488749742316,4.274101442973407,0.09633050802784315,2.6683004964488513,0.7071898934210152,2.199567196017588,3.556873005276998,0.5263969660765877,2.9130329380555886,3.8094624070022887,3.0835614262798607,3.975401422932181,0.9605727898012273,0.7110554981165296,3.480531280437976,4.6483019787777895,1.4467898457276918,4.8672468461898255,2.2973605999356184,1.40664760253998,4.3206576098934155,1.686082150708349,4.086302853717751,4.462946944181649,0.37703895302286905,2.5749774565571535,4.182676553055273,3.4334722880840762,3.932766045333196,2.011430637020707,4.83221371543531,4.988776477835145,2.0688301903168496,1.5687851597403824,4.898006807142105,2.500732578183312,1.242014444380689,0.8737636132629589,0.3222741960905773,0.004246062701279696,3.354768093355279,2.277163837474406,4.524658285404712,1.2708443649757317,0.9476338155412967,4.864298384352114,3.316451652534326,2.8734823606669027,4.1729304946808785,4.677421016436618,2.052873319210958,2.4011034779344955,0.5496070154415256,1.8244350258175202,1.5185342820420777,4.027196426491857,0.3033097742982005,4.250203256366647,3.3468556565903307,4.340055056687949,0.30105192965800054,2.082909523323936,3.5180693992990664,2.0587441706453546,1.7103838465510246,1.3540667447547594,4.897718223550873,1.4902082310704068,4.588652360672857,0.7219246879521157,4.228288652739904,3.576790554472841,1.649124161923029,2.0232351310142427,1.1516145419144397,1.3001119234249392,3.1067049577153174,1.994079931646432,1.4234141830058666,4.702438219781096,1.1270994255616562,2.4518140334080787,0.815967564742488,2.934169885167174,2.9139035537382596,2.3842395647116166,0.21295319102843768,0.8352356862353771,4.6651523449741195,2.047940130015734,3.5921406771940956,2.2500267765513593,3.2888829028422495,2.2865511053233103,2.798109093860024,3.23054653404256,2.337889459224934,1.9638108747186,0.02425915722591765,3.099580904082827,2.4408183638029035,0.15688463456576707,0.04370567422653737,1.1657585789669145,2.4395257410891236,1.8960759036929997,2.3436353730187087,0.7519888746516845,1.4328852376917045,4.965692095955583,4.909491581429455,0.9663207534225415,2.977746064721564,1.2641138481098013,1.1529732361331546,1.7438211670167125,1.3258005799873973,0.3506912564208031,0.20511532463604043,0.9813480070827907,0.1943589692242198,3.4028389994179955,4.05258840473814,3.882413669866466,3.9577760914376303,4.670939205543872,0.36031195893141854,1.8736343755776408,2.9344542879850923,3.338785408072683,2.3900072166658735,0.4068928493697954,2.248158485184378,4.8523231142624565,2.94504936606373,3.6941063142847277,1.2553260338082761,1.6965836563070447,2.2531976288147426,2.624596400268743,2.2389166052828724,1.8175602915690259,2.6824975035491483,0.829172861563725,0.36959057983753096,1.4066108703316038,3.89279683058119,0.6767130949032474,1.558863309471531,2.713734133217854,0.545601695211152,0.8514159788200526,2.3427107048552243,0.8377882591817498,2.689792199822021,4.378513296874092,3.588682591869131,0.4471156648044672,3.234637931497671,3.457324522484063,2.4769920713866354,2.9037158295824863,1.8607919575881837,4.192703639346559,2.827884560315299,2.2354484653064945,2.329309875865755,2.64349954163275,3.821519310974819,3.30716579328741,4.444746443805875,4.7544206666619395,4.933792995061782,2.9343501262515015,2.087523373044733,4.755134285854322,2.9113642677044194,3.4969144316277645,2.82481705550767,1.4193705998417117,3.0481689142937105,1.377486648304873,1.931152020132172,2.924419116408963,2.6373339913787897,3.987528949605915,2.7092047371053773,3.936854985765886,0.369761006134659,3.402930297791066,1.4698368584189003,2.006339494272422,3.52570679993498,4.045856042587603,2.5971222879995848,1.5372489903656306,3.227879216921922,0.3785311652650525,0.6012342448710251,4.182988085608309,3.5992968469877393,3.7830129989676387,3.426693512511286,3.6858671351322405,4.716495068054501,4.060681122654085,0.7927154300661787,1.8786666777732952,1.3156229333136682,0.08606911992820376,2.465560520791298,3.836144903809232,0.249662717397946,4.561411210438195,0.2692871762834337,2.1917763888847306,2.4192401255829754,3.4881084661027195,1.3724286353472792,3.7965079416483514,3.510250805443235,1.7378680516398326,0.27329619998430865,4.657653577018021,3.9239274620594635,3.316942698429537,2.3676936849447117,4.721383306389077,1.6266613227875082,4.770213809602051,4.966182916952952,2.88523784637173,0.5472782821324385,0.6510337499125596,4.393572352295239,4.983861486574174,2.9226515564521294,4.117606394705151,0.3530022793090348,0.8028205199486238,1.5253878711445168,3.01412430702244,1.4951024168935823,4.334008140667609,3.263829637783843,1.094023770758562,0.5370794648029587,0.4926857757531733,4.856509686627872,2.1920103438688554,1.7573373685015925,0.842281507821695,0.07079034821823593,1.0155025816755048,3.0817737296289383,1.1166056712597094,3.0164111600708243,2.657887795101815,0.24070947155584,1.0913019846723548,1.1792439633137952,3.326544985936266,4.952233786469487,1.0894301911909865,1.6770780483871195,4.490840905333075,1.5779219856048199,4.359694674070205,4.983764825208832,3.3224261414765346,2.3725364275129603,2.0001980808836595,1.2816622921053022,2.209509492900935,1.450014918855601,3.232591184214393,2.3826986999646804,4.41084823513677,1.7440984030053197,1.4337705506372622,3.4605228245142716,4.681803485982715,3.8516941901410586,0.5809904987397063,0.9458727757923657,0.7813935016855356,2.916622472687811,0.11356210523168819,3.078950651056541,0.5869145842966994,0.27950065358570475,2.5060183689458206,1.6688406591340776,2.5039647491511063,2.895609012475374,0.3846645156411266,2.4972969673123746,0.93824740451111,2.2139919494117755,0.6420952440973227,4.859298900919847,1.5702836130966202,4.498571743304551,3.5296462863977487,2.074473999003763,3.529607896716697,0.14784206632519448,4.552195735287703,2.0306633102074856,2.549298633998769,0.6628717645139637,0.4697574201696131,2.072644179038463,2.451488101856294,4.809574417256744,0.36594640347797136,4.731317548718516,0.5618959187986872,3.498086060084471,1.9789931053104781,1.642420569884232,0.8621997066584752,3.493648069355223,3.6304919142201273,4.841995073156497,0.5066459641120413,0.4896781718725096,1.0958905924817586,0.8615698801480498,2.11112739143248,3.7047643319233323,0.38543336898974934,3.7677564234626146,4.218562984123714,1.1742851639843699,1.95641613672625,4.947228258447133,2.592675525778503,3.695312817200287,0.6103589085673433,3.8276510539468567,0.2282224776704478,3.4776589617125397,2.8403670298118033,3.762314553970599,1.9947058745419943,1.4755606157930534,1.855196851233858,1.118974210924234,4.28211511101207,0.8345689334345763,4.358321929922799,3.880966799944867,0.8663288060445617,1.0232289325872779,3.7024972723072027,4.010382689519272,4.67790756546486,2.438904655438775,4.26121189369491,3.121733471018333,4.127305003517735,3.366838941366569,0.5617399619561692,1.671854798987371,4.422792778589761,2.211463683295807,3.530740487021369,2.2176525860423233,4.082995473735284,1.460948865886097,4.057866164199764,0.6709596394447703,0.8789606682649465,3.4687706244080774,3.1267645792828027,4.803071306314979,1.629743724924212,3.8169888778456285,0.3419246756135641,0.24142294106504703,2.0279208175302377,1.394222565381853,1.0069104822860797,3.2364410410167066,2.9740692711466488,0.026390496105255234,2.4964649070053357,2.447456138099321,0.790009923860896,0.3422054041743128,1.3271538153682083,0.05189748359228252,4.342226390322753,1.8926680283972452,1.8930977423529782,2.095307648275152,3.8664443967824536,2.9446658603479294,0.789668826977159,4.705798341455928,1.0785644828571694,4.060190732951571,3.2296715460903593,3.806627326276298,0.4318339406031213,1.5443563908642965,4.089729106286791,4.626011680190784,2.9980914637187106,3.66993697201208,3.3562162832633624,1.296257527246114,2.82769857204763,2.2733068815701305,3.8714038967173092,2.4267118640140706,2.0588203477396094,4.600470907349599,0.4008850200999048,0.9140785901061366,1.2001493210186887,2.3090549015141546,4.0640304644942296,2.144234837972394,3.156879953652382,1.4450407477335736,0.7797086471493075,1.608593683163283,2.0861847994276927,3.178467149154401,1.4491673779780956,0.44048274981595803,0.9214765557846527,0.2746341818207554,0.24570578454304548,4.58146306518821,2.187042882768555,3.838746274344922,4.940619586514395,2.6425993334934628,3.470990970298944,2.7261750823977637,4.156891237409999,0.2046340927983159,1.0686881174441198,4.097397497969873,4.924673348943843,0.7580941707567879,1.1333562445729572,3.8371069221470853,3.5351649258732785,1.7377230699735458,1.1824770975533094,1.3201006290383632,3.6796216977107155,3.3995254546613873,2.4697341455968633,0.8959260141708791,4.146842046463056,3.163888436048452,4.982515038324589,3.565047373643957,0.510771960131905,0.842519927364791,2.2924871929080846,3.279905956356047,1.7327088166017002,0.46901628210570534,3.6780311888799186,0.41222191045913514,1.0620148909106275,4.13942281149938,4.829673469290821,2.635417041542386,2.2990261033719728,2.321826105765483,2.2078918874257116,0.6092562867306006,4.694921358643722,2.9077756030794655,1.1550175297559973,3.8364453606140603,1.876093475060736,3.703154304347832,0.9558424187630143,1.0375358902302156,3.1597946554644976,0.6452200900479876,3.3754963886741507,3.6165067663496475,4.80153499168313,4.097286470518304,1.3121440146855912,1.9094795342164406,1.76799155717553,3.2233829295557093,1.9066326494512564,4.7052527782106175,0.8419778014729307,0.3546788892914865,3.7747521423884303,1.4439554084341777,2.766402123373699,1.0965686241833161,2.918787436350697,3.181718570301313,0.6906710422805151,3.0498110864609607,4.590880701293399,1.3014591598322012,0.47099693334838544,1.8150833175350412,2.031423893289712,0.4323847476565612,3.0307532311603658,2.91770958398022,3.7840801810843927,4.739633524824227,2.407072882417285,0.7389918894447389,3.230869377699095,0.00879520473706541,1.3925326997137877,0.34169725581570387,2.9997228381871666,4.432793256927007,3.2970081239281046,0.7242017623691954,3.3695179880995463,0.8730146624560353,0.8072274192357143,4.243206188501521,1.9304178469991762,2.199298925295733,0.49616455164211537,3.121356260310586,2.0032476929596776,1.3251872890032557,1.5732666502443848,4.244985323424819,4.498037128815048,3.2896864290080288,0.07723549228523696,1.109316916181169,1.0758099346085248,0.7520064694982875,0.9564474604724038,0.9385555699801706,0.5171407497696667,4.066467092417819,2.6844762737562187,4.420564524884441,2.0828855564469495,4.412912446704764,1.8740854625207792,4.445939833207105,1.9878178146806236,3.812288592648838,1.4747557870368488,4.562639618278683,3.0651243319029806,2.1486646956822906,4.264387541038173,2.19181592878416,4.982777000225845,0.4819574402695581,4.3746266343182665,4.43721684827704,3.5509848807473365,4.613660923415707,0.9423839632329567,2.717802940182239,3.8874941161959207,2.9995047751891457,4.9846304498404095,0.7172051955974312,4.786847199605377,1.0263653167617715,3.878650942088,4.681926978817794,2.2106841991734614,4.929247186880129,0.1645749793933149,1.8492984018932435,3.0964228583240025,3.88222993674054,0.11085238532181796,2.415441647601538,2.637358417449348,1.0848644138562102,4.579881786814951,4.092893836360936,4.556518969426296,3.1468548591018743,2.254418451619704,1.5622972667935253,1.3578398403702663,3.2879945426243107,1.557795091617259,4.45786999393798,3.212607486820863,2.50812564556278,0.9512290198215567,0.19381543969721693,2.9424157007445597,0.8568774402442325,3.8521774834541267,4.334452912718122,3.959286761254861,0.010173415471194103,0.5025636211603512,3.3395531603826867,4.2869859883617885,4.78804718638857,2.7321692006085705,2.6858222003627175,4.683296958734492,2.9951076790116438,2.0730493927960003,1.2825509952394754,4.455509562977933,3.2278116082441066,0.8612879525153716,4.888866199988876,4.327806122319138,4.298393875459818,0.02334092986561509,0.2840112720217647,2.5234148615436345,3.63611173359872,2.904486812774707,1.4588301464956954,2.419966169279155,4.423350509756605,3.466857254702367,2.2522399850741817,0.3447851282001957,4.924161881161583,0.9935510649315571,1.950700918502234,4.331934276906279,0.3242122199175157,0.5267809178062144,0.5544922099133764,2.6480461872865177,4.378521583534809,3.535247919365273,1.1565114412789224,3.701595662552628,4.609768068058507,4.9094184003854355,3.59292024488023,4.67208729249867,0.9224116845051089,0.3908549202873657,3.8755589086588538,0.2971365436161377,2.1869680862483767,3.03191564070427,0.05297963538313355,0.09952324721843042,0.5396668142755046,0.6052348862786738,1.301465332004963,1.5451088669484558,1.145123480347744,4.263258826029364,0.32836203810233444,2.8682273887539225,1.1533432823949585,0.3271338684032421,3.971017231587457,3.365673375538678,1.167423910141191,3.698401979997189,2.096764939259388,4.671754767951867,1.0919575500573464,0.8751993446599504,3.806267956284043,1.2069966874516669,2.0572929904232726,1.3120286301677964,0.42667599081241736,4.168986923084215,1.356298728802,3.855152013641159,1.0521656305784177,1.399804599693707,1.8853997411057655,4.793654131945547,2.8031343122461685,2.1198524278093367,0.3457815063469083,4.443839480160704,3.043528571462024,1.937007437785524,0.06557254863433615,4.791768944738845,2.256592075071472,0.9471011341389479,0.16716209931299297,3.332856058759466,3.333613086247924,3.0985050186749916,2.765841988689368,4.970253994070904,1.7386199012897963,3.881222366878667,4.305664590929812,3.6844400864344817,0.9200900046234628,1.2136071214148447,4.861186955012635,2.766987234315926,4.149291362532184,1.0055783990367828,1.9620974681391934,3.987934633963407,3.7580845799840725,4.372994718158182,0.27601275815319015,1.2367268396320208,3.8853822744588196,1.9699693887733782,4.362557453219859,3.3928077491042066,4.625539818750738,4.691032499348061,1.6492401658256794,0.9063830844099752,0.5577826971064992,4.592359533774072,0.9832329034029796,2.3730007423421573,2.2767028650703702,1.6681549021870135,0.36719072971756694,0.8232995901784346,4.53609168933626,1.8327868091714739,2.7441072569173155,3.1623483235758654,0.7598038587521527,1.3016218716028938,0.8172243254012568,4.485372819076737,0.5556839904146227,2.5526057532817745,2.618059783622061,1.6307988007920715,0.827105285405132,1.2752331348555324,0.5547831700447658,4.320387606073299,4.164664029100049,3.229002316849754,2.1398702600173216,4.251259567669243,4.829532992212744,2.5987854318206582,1.707431941974078,2.2779936293050076,1.5976581219925168,2.412900468011646,3.6237940223642493,3.3242071902757475,3.6343810355401605,4.966716876373911,3.085351762513876,3.8904882149683284,1.1821784277649128,2.095805142514797,0.007153793061293046,1.64287092716919,1.762361961770128,2.5308754724866276,2.0295790627482146,3.4801772833995437,2.5049869105742903,3.3057620313579097,4.522229988445953,2.71065879186676,0.4529448250614754,0.9536029201452045,0.8774214418616821,3.3173989715172536,0.24346517998299788,3.980490164543975,4.494475870341912,2.982034195688791,3.684486608941807,1.8861756732549828,0.7640195123468074,4.4397382617397785,3.37458960658076,4.251029032719473,1.6519843351276786,1.8932413583332464,4.0282804542858575,1.531182398767894,1.651456399016763,3.7882546402697246,3.450561523431095,1.9047277098693816,3.4525097718171716,2.0978766821725428,4.0761007944040735,2.9351398277225513,2.498467272528898,2.754408906664183,0.3748871414450716,2.1195966472351047,0.74060997250877,3.0225185829148637,2.440597249933991,1.1453210306971218,0.26196448352275303,1.4778656830800296,2.8760987037932786,4.480680320793608,2.1824590923997023,2.5506316450741595,4.216451406946193,1.7874591445070476,4.019847252701735,3.052345277549231,4.082864630999015,3.479543017442701,3.946009021884901,4.636367243820932,1.4519224444169476,3.325524618724348,2.9377775932094217,1.6392580742595564,1.5332312230381673,3.09605514191845,4.065838603632543,1.169586133841951,2.88637564248491,0.44535666873857904,0.7138242842803788,2.930209167988248,2.8990881532793744,0.09004143327863146,1.0004314642194045,1.3747572859573742,4.37628313695826,1.2923557969336497,2.1036245687527098,2.6707030944185197,2.7582877766967906,1.5612860401596806,2.10696282636357,2.3787473660587133,3.1082141361352145,1.97422325347554,0.12652347830458988,0.00023366958012527306,3.105131541537208,4.430180785372194,3.7627085038060457,0.6415883042667592,2.3003343058380588,3.664799545524746,3.3517076758974262,0.09687492457831515,0.550793361305485,3.5700226682204605,2.6817484389708888,2.0535286908893005,4.713254641378595,2.3700123389630945,2.4988496855549727,0.2543812793893063,0.7107385674407818,1.2658617686209184,3.7374556511010706,3.377374731408822,0.4842797840882396,1.9548367116180498],"mu":[5.897432724484915,4.303464376465806,1.1162762259137216,2.3499887381069007,6.291457860379317,9.850273535747176,9.595928392338111,3.5861742180942646,1.4143690708566914,8.395302256716104,2.5251998746252524,3.746132892972698,1.3060467831679423,4.007355582636595,0.24643286849790336,3.673915223266997,5.904732323589084,1.0052160875864913,1.787657988806881,6.152823039533811,5.095240803554473,5.316244336845615,1.2522472085414438,9.585640587083004,0.4300432802410947,3.149256050482925,4.488392543115283,9.37669447953047,1.9915777839778492,6.1216257945763335,2.027779798385443,6.07410761717742,7.154274467717483,6.9803018306982185,2.557402886218645,4.337303296369505,3.4107361263882385,0.4870933970187563,0.1255441996987816,3.9355175724202818,4.0343163459022,1.5124145071753392,4.546117206869051,8.17404797990086,1.3693953944998682,7.56121138831497,2.8432297509010596,0.5447340071953621,2.048992955893487,2.2442992375634496,4.298867559698783,1.779387791243574,2.204336939707463,1.197372597465085,0.7692787564090886,7.425764720761158,8.78416415801208,5.385417190710573,2.667509515166653,8.288851368056413,8.96509061631646,3.704004395540854,0.8448133376070066,6.952674715599381,4.310719384511774,3.5682645522688294,2.43577266330095,7.321645940398101,0.6975843673695459,6.5010445103924,8.568422807750691,0.5886988568650664,5.750580020092997,2.946381981180093,9.42821224710701,5.974134891715838,0.7536123478839496,7.710971621986533,8.439313206504204,5.698956568015118,2.78057867928029,8.72963322591916,2.6767859684998663,0.6498288160612842,1.73439317078814,9.875261410273415,6.336844629625493,0.4746635949228195,1.045123384441775,6.390630587173982,1.7766606289905607,7.336752446305958,3.842124187378131,1.306382002208113,6.731502422583613,6.739569814288728,4.321509686741816,8.149325983808941,6.464424853092976,1.6993945042529846,1.3375137630642242,4.381348952107212,9.980007984941155,7.8977897523051315,6.092049155220969,1.7300551289520016,9.772906568264808,6.568201868841957,1.014608342129446,0.10323917066932697,4.521125511244064,9.41386726870057,6.905868026705868,8.207830450207478,5.811083571518694,9.491594978537686,4.968288482942702,6.399373988600483,2.9680504146536,9.296627921526904,9.258353673274055,5.7436324590069665,7.376987812296882,3.4649402069709145,8.10132035671549,6.9076079404024675,2.6091204468770024,4.814628420750553,0.7310780813631945,2.6428113315104107,8.622674590463124,7.62689626683239,3.2310195862533475,3.6556051590372007,4.780014526481149,0.659748053259277,8.877980017868722,5.9879708058330205,1.968232776484351,9.537202969941763,6.023728236986081,5.775563725591657,8.137962697757274,4.0601424437079014,4.773202211429972,6.533889914013777,3.356819399554254,8.523494174516188,9.149572788014233,0.7815769177277954,3.4732715733055097,4.648575230203047,2.909015522243137,3.218002216111171,2.7083894004591635,2.490463682618267,4.126310373187387,2.484231203048526,9.572545837262368,8.60987397822033,4.781072462396507,1.248093172440119,9.943212768047122,7.8095166075702345,1.0601947719163474,2.584761261272075,9.495423900606685,1.0154422855450562,7.404578619655149,3.592508959364773,2.57710461949888,7.557758999128001,2.3121776012628326,7.545197834303792,1.3608644780377377,3.6793978444284625,5.97957539302808,6.972595644583781,3.3487513551955383,4.642937232497372,7.9731345089360595,3.2813392378373463,8.601862360164588,3.00504248257353,2.259846916971422,3.838862705945878,5.353833036139384,4.277315559396624,8.781320543213074,7.978171829528675,2.9205919772888334,8.386018938192795,8.558439295007421,3.491400315586375,0.44959062458385546,0.5669890890934659,3.6970506830983485,0.44267825462098287,5.405452871565655,5.129018742509491,3.8603960567644036,9.015938103302501,9.409204750050124,6.145096692148679,4.425544766882286,0.6598590987779795,9.379112408675445,5.608111766222159,7.003807897782024,2.5111762254713343,1.6879251069829193,4.501664762396289,2.0851298533774854,5.272403976635196,2.7171375385236796,9.226836079996978,2.191849804148669,9.170770671307691,3.6099637141329377,3.9489283484506887,8.312182586454064,9.737047701638469,5.155089893179956,2.040534543763124,2.8498825939966443,6.320523401296474,1.3345748987655615,1.5943592734764023,8.940247384182964,9.565315446722153,7.65867941204494,6.253308314721431,8.820122328265477,8.511182332648119,4.852442863460942,6.433973700336486,0.6847387920113768,8.142517310640132,0.5666828770977128,5.065278455959503,4.4224833453829575,1.0345254679023785,3.698418362000222,5.985025595323963,7.422887655992549,3.305701424568579,2.1281112461688423,4.663341173294739,9.232733321262943,0.8888294040510103,8.517946342283691,5.096418855369198,8.25198615014652,8.420533823713773,7.011071695705871,5.340821750427532,9.250819734126033,9.101006074650916,5.3950265250647345,9.46173626836786,5.010992461868087,5.6258188779937335,1.7810295071287707,1.7929953157803236,3.756865094663804,9.31442261029572,5.995146554704805,6.302579433744418,8.983929878715845,2.61293885140498,0.5993456885357484,3.418878049248968,0.010782677986980183,6.921494775111898,9.695728660204303,9.787249146348344,3.207915212059893,9.459150599954828,7.4858120163579205,7.427396161108022,1.1124724922978002,1.7896850732272163,2.0726196386063744,6.934281994579425,9.01783880352967,5.804708472171414,5.2135792427829415,8.03411779157717,0.9209412179234611,8.680516077705512,1.0085873905630849,5.26978837718106,3.3634134056998954,6.180353771886898,0.7426712359450027,2.36287501911435,2.7287486590154164,8.502534790833312,7.952137126300672,0.18259564899920422,9.886371256848232,5.346266174953545,1.5968731699514072,9.746840272717993,6.94039979571124,6.98339295026992,0.42026821328053465,5.5247452996306805,7.145396805991608,1.6827588650523784,1.1490667696134382,1.1314680245471265,3.0911334278919522,7.1967787317152565,5.223603357942464,7.337892874507972,2.0105377954673176,4.330361175718142,7.597625159632768,3.658816225245334,6.237036327392951,0.7720299492065519,5.406703026513593,6.9641768244555236,6.993914536355986,0.5802109003306977,8.854093826502057,3.060350232257252,7.36503147400573,5.656756153084242,4.804415573770465,9.695821880767177,3.8289411423178255,8.50023380998665,2.0972259529942816,9.973637663449006,7.810136647790491,7.166004502614351,2.938203010438838,1.8212143578987527,7.102621148311583,1.2708265460183443,5.019178449549178,0.9835918007732647,2.3563081126659946,4.601250708237519,3.242458470514915,6.402690115042702,1.8118496589346211,1.5519608292573528,2.7924320719559703,8.55868986262696,0.4068312353975223,4.998033618281957,6.1008593189014215,0.007833825233658498,8.656187562795699,5.270236918808866,6.795485515517175,3.4895986676532464,2.066198449610337,9.738834745007178,2.836194793215703,9.348784890331842,4.988081482653197,3.2427914702556127,3.335513954013263,9.989005332688862,6.054545809606298,5.348231417882284,2.2059147835244364,0.8423824408628833,1.1259643516081308,7.611625006839264,3.5094069837476582,1.701707885457644,7.066495579438965,6.842593684178642,1.020122171988307,7.03883632129267,9.296555542525695,8.545082616468331,7.780906422685643,3.5641657739335275,8.867060818441425,2.4707185429043776,1.8654924977673404,6.298538443331026,3.323354152430811,7.734669887439621,2.5745799712244177,6.37806547928879,5.1965134462389635,3.525420241654831,3.9063319107015704,4.801073645732452,6.909168533633137,9.58257491259362,3.2108045078397307,3.5366319353982,5.864782082322087,1.9309404631372962,8.568106879692294,5.216931578126099,4.436026208648991,1.4229347246688095,6.900115171864614,8.340430543425326,9.683439207246671,8.212503587578803,5.526763303785918,0.47446881642077443,4.336580651671853,0.6464549950342557,4.6646423784380575,9.029495576174183,0.9069333004173541,7.974091505964727,0.9318223555416161,4.723145391513519,2.706310205116025,2.866336006056136,2.0495660235138025,9.769401884858183,0.6761612114958271,7.069551102808102,3.9634199602159303,0.40826909908047604,5.083965281852194,6.294346201343819,7.986405080739464,5.651583154693773,5.629077199411521,6.150874382804337,0.905019826336142,4.922215453454568,0.77509437844415,5.8428084444953114,9.114946676642441,5.036110249041245,1.4417653355459858,8.14707586187637,9.16286029794206,1.9712928509949679,1.0235658497343203,2.0529906737801817,7.0396444289820685,4.777879578128035,3.943599495987624,7.016998457936737,4.5257579822195915,1.8565917308160018,6.115326895630282,9.762022193430056,7.414238164330563,8.254140453519735,5.595991890330454,6.779230684787219,7.767938330185831,4.403757782224096,7.861507131217634,8.190197341940998,3.8047728610133835,0.04960614695650012,7.777950839240724,1.4895427545953144,9.807535112233426,8.660550141954422,3.732944656608903,6.725860770269225,5.6874952863643475,3.4214010890331137,5.831860113092324,9.894434772804981,6.113613230221762,1.802774692366218,7.01236621033649,5.62629748774552,7.564934140019732,9.166005514965121,1.1853090208173378,6.219078097986768,2.3837896712102347,3.6721600732182758,0.2982900131459121,1.539575241421296,0.0746192787853528,3.5459382475009016,6.545530775252885,8.522365777870586,8.192438734889462,4.553329555646048,8.51738044329834,8.426799603838969,2.289329848170354,8.962190242452179,5.076224397150129,2.3688388646126413,6.731884541960891,9.895254901163156,4.274363849875646,6.649714459271601,2.421177235648493,1.722592567084813,7.8864008735974895,2.8395290947572427,6.409937225581206,0.501719206196598,9.988728535893864,8.728689741211657,3.6333196366672604,2.2806328696396183,1.9518960228830462,7.254171722920521,0.6640553189195053,9.385531728636114,9.958020766178562,2.031369070854372,9.670454425192009,7.701494168621366,2.28985472626847,4.867105588870249,9.675980427021534,1.7388372070477343,0.9433971641638794,7.147957276750978,8.903049012337043,4.880127822079039,2.3947446853120313,4.687246709872081,6.846853055376281,2.0567975031774033,7.386407111026527,1.678202571193601,5.136738440158711,0.7674256626660059,9.042213965568461,8.126636983035079,9.603033812171812,3.467406368101078,5.7555921750005545,8.462705677174807,2.786202949611958,7.343567719701136,7.931465717213233,1.5204893956648702,5.973697019671613,1.932610592570887,8.295231744804827,3.309484448129636,6.039153099496762,1.4965841019144088,4.354431168514559,6.5245497102519785,9.299569406186771,8.453072652585053,3.2775349382528662,5.959413883797923,9.874003341044597,9.501644807214944,9.480270352505446,1.8343307435244371,0.16178422087334,4.453466003416393,2.4111332996369472,9.665502140865389,9.434077929085205,0.4473275008390498,5.76815772032208,2.847099947164655,9.696894492738481,5.161932204922898,0.693306746539164,9.18229875059415,7.823943716060951,7.027229834323398,4.435579820734922,4.357934820001271,9.897708885645859,0.6306955877579568,5.089290160702264,6.870283145717455,0.9698045167383129,2.8531035213943,6.1792339722307155,5.373328951925642,4.458234502109246,5.402922096559992,6.255301043020536,3.4687208740061104,7.316346969923158,1.6547070427754407,2.362745565755635,9.29153526824721,0.5324837243692992,4.53043034181565,9.315203406025407,4.539199512441674,3.982423929245764,7.539584962935518,8.491062640529679,4.298175737872391,5.531042914796565,8.135337602882304,7.6211152676834315,9.12303646171958,2.38714740287153,7.864221614434063,4.41172975781236,7.483478606162485,4.028718130665898,0.8626918181903398,5.676839989144606,0.46165566063534724,2.7548579488012637,5.730910770027975,9.853359667470814,7.667032545334484,3.8033918638298014,2.698041391753727,1.2763247444681958,7.657286715320759,2.84561979434089,1.1213936499523713,3.106658964317486,8.089433894801763,0.8904632245651123,1.5390855393501712,8.761343568363092,6.819362918627043,8.227203111351198,6.343245782608708,7.9166630949257915,4.155000393541128,5.351538409399517,4.670273152337845,5.788450937876224,7.920937364339331,7.421424109169214,0.05155971736628073,1.5901009439844205,3.038496759864515,5.409702438970143,0.8044945415020854,9.033531291300896,5.143363301750197,4.046115424471126,9.26888307899568,6.385869907509177,8.966597529925346,0.9667025382752525,2.7421023234332242,8.635775160913495,2.3590005847603557,1.9059293116185416,7.359909963478164,8.975127480211944,2.199458245928523,8.657993143385458,8.343790485405115,2.497292412965939,8.110777258231096,2.201906307249588,3.295917234568433,3.388165478349414,5.095914074020731,0.07968409773736695,9.531154819407428,7.063612355036968,2.007836809400463,1.2813792505754273,2.0410315571949766,7.430875531454257,9.16921766252631,9.71314156955672,3.7090190613219387,9.83915888397155,7.15254364333444,7.178165401563826,1.0202340526248088,1.8505410053096583,5.621656503718131,2.637079972602938,3.0198297475010105,6.358653820978977,4.662263356487902,8.025766867747544,5.586510306965393,3.1057231495560678,4.854076777047609,0.17156526314260567,7.982771168367222,0.8659882895881799,2.9868270901408978,4.8293619392533955,2.101269061377309,5.7015481896252185,1.6124540568905643,4.925654872438172,3.3720924927068285,5.633499026550258,4.460842783088359,5.810300329334305,3.6515037597969413,4.504001972894612,1.7826215037814364,0.8893477231705771,8.58071295050288,3.8427725639285137,9.295935293543732,2.850974686623411,6.0410342900087315,8.459423342748218,0.4193139607446472,8.393257752734677,7.491025489435598,6.954113402113686,9.476835093505045,7.321985153879544,7.643235667593665,7.937025879225901,5.679642448011024,4.5831609896821135,0.11720392609245067,3.3193753840738682,8.215372883889467,6.773525373956124,1.6009296292035091,1.057894537149926,1.8902897906375293,1.123988441064081,9.730139858538953,9.273935096426326,7.150349404043932,2.441513188778446,1.7697950526870598,8.920084536016962,0.3128769516041041,9.111313913252099,1.0322713900572533,9.887104644098168,2.7383697760593573,3.951223996683906,3.4904675958321563,0.3884100607634444,1.7834210634031278,8.41807099993657,3.7831474917122487,6.072970731638716,1.3243801441585212,7.657372449398389,6.970326136703349,4.598464203491295,2.303791880298496,6.032987453884973,8.63978879381624,5.76356636604584,3.874486383469886,9.413434291412186,7.36749649581353,9.326752775947693,2.8305153311024234,6.863779703008596,8.6609669026864,5.198130503437726,9.881681544068632,0.0076682174259712355,7.0314321252534295,9.199495406758542,9.19660600147884,0.2519854165237678,3.6794304751769236,3.4108915698398357,1.6231232269507356,5.3480395274916575,0.9175852857798916,3.678605303096185,7.165001282597469,2.7235045033811778,4.237523868612296,1.1870210909768963,1.5021740846277098,3.210155136814612,1.281624351133086,8.742083433327574,1.63493759638079,7.775290017443595,8.728781370907711,8.473460998490781,5.1490321569381265,5.686359967074075,2.560024638316536,0.043588171148891686,5.749992872077607,4.761392987773904,5.735027607734475,8.434725477529739,1.7358311203078403,8.110908760718019,3.0765714401832067,4.221579809021245,4.015779715131343,5.133641715668123,0.37472066961319994,9.930607398796083,2.7223232557327393,2.7878095841997874,7.347948687536087,3.194724811610261,8.77409391123421,7.266723984136214,1.260937006989884,9.671333247703448,1.2681105331674614,9.029891424400677,6.830615067126478,2.156190375090312,0.88411921689866,0.4293600581280721,8.978595004834201,1.635253872170177,4.417824197079485,0.33733178788224016,6.316558711981499,1.5053953376036744,8.65210718736813,3.3496678434584104,4.95500505843742,4.790565646788725,3.8787070934509016,4.956460013156352,1.8261882467719937,7.266768272103135,1.8412886160654751,3.415723649818383,3.3106886419206005,4.635848976495649,3.187851546327838,8.624765574141385,1.6827443416535903,3.205951986467135,5.457045393239726,7.265338245123106,7.664427497491295,6.6029999754425965,3.6475876504024196,7.393559467589952,0.09064946236808202,0.152177355939489,0.857283823679178,1.0154212548511898,5.11941154364094,8.402231065358855,6.871931607015071,4.698209798330348,0.9786030028349901,7.105082005959669,9.142414608427147,5.6265613983725205,2.7275435507039636,2.234760766921897,2.555306360242946,6.052922372116081,3.5727087953091896,2.2214620051933864,2.212217410980344,4.498373767972468,5.201807532996354,8.33943207634549,1.1055695705113266,7.369339986337655,1.831942198929608,1.8801934440081025,3.0116164298941794,9.61517820850366,7.636686421767913,1.412296336043466,5.387724228257936,1.5710183192435268,5.160675804681087,2.941038283982822,5.051101406149366,5.784528744653638,3.8111560313085713,1.5591177738785844,8.675666603311875,3.829578222421204,6.273677929428674,0.23674543714147234,3.161060293809377,9.280522593335776,0.7259614129047409,9.374580441651034,0.9010062504616712,5.120286067734945,2.411662994587751,3.343994558741523,0.4374701816853066,3.8450590093758796,9.99091662687642,3.0630547419055887,7.074544776876501,6.360763772371126,2.10891815794918,5.305894402018206,8.476437710028158,8.618319693336176,7.828887938864401,8.773973512948345,0.837034423436327,4.229239910860699,9.939306166952234,3.4957971659422227,1.9351785750572814,3.2392235856579066,7.176693345960823,3.048309581398423,9.567837441335634,3.4711884212394772,7.223269023349501,4.86750217074767,9.142762398492714,0.9191081034902382,1.0533089385564476,1.7989162334493858,2.141271785475347,6.907802912618646,6.542544719536679,9.455967853518477,1.67745808943206,6.456840104985966,5.134481803763675,6.308516811575546,0.5125521576263559,1.488638792589534,4.396778615712071,8.79780791839101,9.995694769224068,9.774967178601262,4.612021477701873,6.100154496946151,1.1712051918858069,7.520638245984168,2.9982441018510153,6.629497858375808,7.1879256624454,7.208723931886272,2.821047111481636,4.9011977921761645,7.060087017975452,3.07911177636907,5.5815768636217555,0.8013202787819607,6.954694343145231,9.172928944185557,9.633513683586363,8.39367668395331,9.765939102600434,7.084658763676743,4.989263196201845,6.089164480892308,2.178165465726918,7.500720358478645,1.157882785065174,8.391900558142373,7.027099203288644,5.783288343434636,2.148548103288259,1.7407685698573427,0.11968642846921007,2.518226581833254,7.011555122684254,8.251088588812149,2.7057623086865545,4.565318284255671,9.47391001153746,8.35145702580672,1.3037876428220674,1.8076397071723749,3.903913516891191,3.8166845784770853,7.525415919935803,0.2554796414665028,0.6350112049535372,0.37106759181153803,9.45157349283048,4.324109640624359,9.200750144728687,1.6940607122348705,1.7261248520060857,9.469531436641942,4.888272552340142,3.3050442488909537,6.4919721221879945,5.012887892346933,3.7060777626329866,3.6307777219432014,4.547129094928355,8.343715492061804,1.3242330219058895]}
},{}],115:[function(require,module,exports){
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
var cdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `s`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `s`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `sigma` equals `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to mu' );

	y = cdf( 3.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than mu' );

	y = cdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than mu' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large variance ( = large `s` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/cdf/test/test.cdf.js")
},{"./../lib":111,"./fixtures/julia/large_variance.json":112,"./fixtures/julia/negative_mean.json":113,"./fixtures/julia/positive_mean.json":114,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":253}],116:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `mu` and `s`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `mu` and `s`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 2.0, 0.0 );

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to mu' );

	y = cdf( 3.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than mu' );

	y = cdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than mu' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], s[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], s[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], s[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/cdf/test/test.factory.js")
},{"./../lib/factory.js":110,"./fixtures/julia/large_variance.json":112,"./fixtures/julia/negative_mean.json":113,"./fixtures/julia/positive_mean.json":114,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":253}],117:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/cdf/test/test.js")
},{"./../lib":111,"tape":253}],118:[function(require,module,exports){
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


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with mean value `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 3.0 );
* // returns 0.0
*
* @example
* var y = cdf( 4.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( 3.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*/
function cdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return (x < mu) ? 0.0 : 1.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":61}],119:[function(require,module,exports){
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


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - constant value of distribution
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*
* y = cdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated cumulative distribution function
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return (x < mu) ? 0.0 : 1.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":61,"@stdlib/utils/constant-function":135}],120:[function(require,module,exports){
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
* Degenerate distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/degenerate/cdf' );
*
* var y = cdf( 2.0, 5.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
*
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":118,"./factory.js":119,"@stdlib/utils/define-nonenumerable-read-only-property":136}],121:[function(require,module,exports){
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

},{"./is_number.js":124}],122:[function(require,module,exports){
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

},{"./is_number.js":124,"./zero_pad.js":128}],123:[function(require,module,exports){
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

},{"./main.js":126}],124:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./format_double.js":121,"./format_integer.js":122,"./is_string.js":125,"./space_pad.js":127,"./zero_pad.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./main.js":130}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{"./main.js":133}],132:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],133:[function(require,module,exports){
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

},{"./is_string.js":132,"@stdlib/string/base/format-interpolate":123,"@stdlib/string/base/format-tokenize":129}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{"./constant_function.js":134}],136:[function(require,module,exports){
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

},{"./main.js":137}],137:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":141}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./define_property.js":139}],141:[function(require,module,exports){
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

},{"./builtin.js":138,"./has_define_property_support.js":140,"./polyfill.js":142}],142:[function(require,module,exports){
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

},{"@stdlib/string/format":131}],143:[function(require,module,exports){
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

},{"./native_class.js":144,"./polyfill.js":145,"@stdlib/assert/has-tostringtag-support":24}],144:[function(require,module,exports){
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

},{"./tostring.js":146}],145:[function(require,module,exports){
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

},{"./tostring.js":146,"./tostringtag.js":147,"@stdlib/assert/has-own-property":20}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){

},{}],150:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],151:[function(require,module,exports){
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
},{"base64-js":148,"buffer":151,"ieee754":239}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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
},{"_process":245}],154:[function(require,module,exports){
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

},{"events":152,"inherits":240,"readable-stream/lib/_stream_duplex.js":156,"readable-stream/lib/_stream_passthrough.js":157,"readable-stream/lib/_stream_readable.js":158,"readable-stream/lib/_stream_transform.js":159,"readable-stream/lib/_stream_writable.js":160,"readable-stream/lib/internal/streams/end-of-stream.js":164,"readable-stream/lib/internal/streams/pipeline.js":166}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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
},{"./_stream_readable":158,"./_stream_writable":160,"_process":245,"inherits":240}],157:[function(require,module,exports){
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
},{"./_stream_transform":159,"inherits":240}],158:[function(require,module,exports){
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
},{"../errors":155,"./_stream_duplex":156,"./internal/streams/async_iterator":161,"./internal/streams/buffer_list":162,"./internal/streams/destroy":163,"./internal/streams/from":165,"./internal/streams/state":167,"./internal/streams/stream":168,"_process":245,"buffer":151,"events":152,"inherits":240,"string_decoder/":252,"util":149}],159:[function(require,module,exports){
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
},{"../errors":155,"./_stream_duplex":156,"inherits":240}],160:[function(require,module,exports){
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
},{"../errors":155,"./_stream_duplex":156,"./internal/streams/destroy":163,"./internal/streams/state":167,"./internal/streams/stream":168,"_process":245,"buffer":151,"inherits":240,"util-deprecate":261}],161:[function(require,module,exports){
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
},{"./end-of-stream":164,"_process":245}],162:[function(require,module,exports){
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
},{"buffer":151,"util":149}],163:[function(require,module,exports){
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
},{"_process":245}],164:[function(require,module,exports){
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
},{"../../../errors":155}],165:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],166:[function(require,module,exports){
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
},{"../../../errors":155,"./end-of-stream":164}],167:[function(require,module,exports){
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
},{"../../../errors":155}],168:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":152}],169:[function(require,module,exports){
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

},{"./":170,"get-intrinsic":234}],170:[function(require,module,exports){
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

},{"function-bind":233,"get-intrinsic":234}],171:[function(require,module,exports){
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

},{"./lib/is_arguments.js":172,"./lib/keys.js":173}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],174:[function(require,module,exports){
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

},{"has-property-descriptors":235,"object-keys":243}],175:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],176:[function(require,module,exports){
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

},{"./ToNumber":206,"./ToPrimitive":208,"./Type":213}],177:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/isNaN":224,"../helpers/isPrefixOf":225,"./ToNumber":206,"./ToPrimitive":208,"./Type":213,"get-intrinsic":234}],178:[function(require,module,exports){
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

},{"get-intrinsic":234}],179:[function(require,module,exports){
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

},{"./DayWithinYear":182,"./InLeapYear":186,"./MonthFromTime":196,"get-intrinsic":234}],180:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":229,"./floor":217}],181:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":217}],182:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":180,"./DayFromYear":181,"./YearFromTime":215}],183:[function(require,module,exports){
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

},{"./modulo":218}],184:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./IsAccessorDescriptor":187,"./IsDataDescriptor":189,"./Type":213,"get-intrinsic":234}],185:[function(require,module,exports){
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

},{"../helpers/timeConstants":229,"./floor":217,"./modulo":218}],186:[function(require,module,exports){
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

},{"./DaysInYear":183,"./YearFromTime":215,"get-intrinsic":234}],187:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./Type":213,"has":238}],188:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":241}],189:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./Type":213,"has":238}],190:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./IsAccessorDescriptor":187,"./IsDataDescriptor":189,"./Type":213}],191:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":226,"./IsAccessorDescriptor":187,"./IsDataDescriptor":189,"./Type":213}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/timeConstants":229}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"./DateFromTime":179,"./Day":180,"./MonthFromTime":196,"./ToInteger":205,"./YearFromTime":215,"./floor":217,"./modulo":218,"get-intrinsic":234}],194:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/timeConstants":229,"./ToInteger":205}],195:[function(require,module,exports){
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

},{"../helpers/timeConstants":229,"./floor":217,"./modulo":218}],196:[function(require,module,exports){
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

},{"./DayWithinYear":182,"./InLeapYear":186}],197:[function(require,module,exports){
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

},{"../helpers/isNaN":224}],198:[function(require,module,exports){
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

},{"../helpers/timeConstants":229,"./floor":217,"./modulo":218}],199:[function(require,module,exports){
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

},{"./Type":213}],200:[function(require,module,exports){
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


},{"../helpers/isFinite":222,"./ToNumber":206,"./abs":216,"get-intrinsic":234}],201:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":229,"./DayFromYear":181}],202:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":229,"./modulo":218}],203:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],204:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":206}],205:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/isNaN":224,"../helpers/sign":228,"./ToNumber":206,"./abs":216,"./floor":217}],206:[function(require,module,exports){
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

},{"./ToPrimitive":208}],207:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":178,"get-intrinsic":234}],208:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":230}],209:[function(require,module,exports){
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

},{"./IsCallable":188,"./ToBoolean":203,"./Type":213,"get-intrinsic":234,"has":238}],210:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":234}],211:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/isNaN":224,"../helpers/sign":228,"./ToNumber":206,"./abs":216,"./floor":217,"./modulo":218}],212:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":206}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":180,"./modulo":218}],215:[function(require,module,exports){
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

},{"call-bind/callBound":169,"get-intrinsic":234}],216:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":234}],217:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],218:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":227}],219:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":229,"./modulo":218}],220:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":176,"./5/AbstractRelationalComparison":177,"./5/CheckObjectCoercible":178,"./5/DateFromTime":179,"./5/Day":180,"./5/DayFromYear":181,"./5/DayWithinYear":182,"./5/DaysInYear":183,"./5/FromPropertyDescriptor":184,"./5/HourFromTime":185,"./5/InLeapYear":186,"./5/IsAccessorDescriptor":187,"./5/IsCallable":188,"./5/IsDataDescriptor":189,"./5/IsGenericDescriptor":190,"./5/IsPropertyDescriptor":191,"./5/MakeDate":192,"./5/MakeDay":193,"./5/MakeTime":194,"./5/MinFromTime":195,"./5/MonthFromTime":196,"./5/SameValue":197,"./5/SecFromTime":198,"./5/StrictEqualityComparison":199,"./5/TimeClip":200,"./5/TimeFromYear":201,"./5/TimeWithinDay":202,"./5/ToBoolean":203,"./5/ToInt32":204,"./5/ToInteger":205,"./5/ToNumber":206,"./5/ToObject":207,"./5/ToPrimitive":208,"./5/ToPropertyDescriptor":209,"./5/ToString":210,"./5/ToUint16":211,"./5/ToUint32":212,"./5/Type":213,"./5/WeekDay":214,"./5/YearFromTime":215,"./5/abs":216,"./5/floor":217,"./5/modulo":218,"./5/msFromTime":219}],221:[function(require,module,exports){
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

},{"./isMatchRecord":223,"get-intrinsic":234,"has":238}],222:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],223:[function(require,module,exports){
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

},{"has":238}],224:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],225:[function(require,module,exports){
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

},{"call-bind/callBound":169}],226:[function(require,module,exports){
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

},{"get-intrinsic":234,"has":238}],227:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],228:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{"./helpers/isPrimitive":231,"is-callable":241}],231:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":232}],234:[function(require,module,exports){
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

},{"function-bind":233,"has":238,"has-symbols":236}],235:[function(require,module,exports){
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

},{"get-intrinsic":234}],236:[function(require,module,exports){
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

},{"./shams":237}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":233}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{"./isArguments":244}],243:[function(require,module,exports){
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

},{"./implementation":242,"./isArguments":244}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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
},{"_process":245,"through":259,"timers":260}],247:[function(require,module,exports){
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

},{"buffer":151}],248:[function(require,module,exports){
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

},{"es-abstract/es5":220,"function-bind":233}],249:[function(require,module,exports){
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

},{"./implementation":248,"./polyfill":250,"./shim":251,"define-properties":174,"function-bind":233}],250:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":248}],251:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":250,"define-properties":174}],252:[function(require,module,exports){
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
},{"safe-buffer":247}],253:[function(require,module,exports){
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
},{"./lib/default_stream":254,"./lib/results":256,"./lib/test":257,"_process":245,"defined":175,"through":259,"timers":260}],254:[function(require,module,exports){
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
},{"_process":245,"fs":150,"through":259}],255:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":245,"timers":260}],256:[function(require,module,exports){
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
},{"_process":245,"events":152,"function-bind":233,"has":238,"inherits":240,"object-inspect":258,"resumer":246,"through":259,"timers":260}],257:[function(require,module,exports){
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
},{"./next_tick":255,"deep-equal":171,"defined":175,"events":152,"has":238,"inherits":240,"path":153,"string.prototype.trim":249}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
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
},{"_process":245,"stream":154}],260:[function(require,module,exports){
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
},{"process/browser.js":245,"timers":260}],261:[function(require,module,exports){
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
},{}]},{},[115,116,117]);
