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

},{"./polyfill.js":9,"./uint16array.js":10,"@stdlib/assert/has-uint16array-support":28}],9:[function(require,module,exports){
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

},{"./polyfill.js":12,"./uint32array.js":13,"@stdlib/assert/has-uint32array-support":31}],12:[function(require,module,exports){
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

},{"./polyfill.js":15,"./uint8array.js":16,"@stdlib/assert/has-uint8array-support":34}],15:[function(require,module,exports){
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

},{"./float64array.js":17,"@stdlib/assert/is-float64array":37}],20:[function(require,module,exports){
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
* Test for native `function*()` support.
*
* @module @stdlib/assert/has-generator-support
*
* @example
* var hasGeneratorSupport = require( '@stdlib/assert/has-generator-support' );
*
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/

// MODULES //

var hasGeneratorSupport = require( './main.js' );


// EXPORTS //

module.exports = hasGeneratorSupport;

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

// MODULES //

var evil = require( '@stdlib/utils/eval' );


// MAIN //

/**
* Tests for native `function*()` support.
*
* @returns {boolean} boolean indicating if an environment has native `function*()` support
*
* @example
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/
function hasGeneratorSupport() {
	var bool;
	try {
		evil( '"use strict"; (function* () {})' );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"@stdlib/utils/eval":280}],22:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"@stdlib/assert/has-symbol-support":24}],28:[function(require,module,exports){
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

},{"./main.js":29}],29:[function(require,module,exports){
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

},{"./uint16array.js":30,"@stdlib/assert/is-uint16array":42,"@stdlib/constants/uint16/max":70}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./main.js":32}],32:[function(require,module,exports){
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

},{"./uint32array.js":33,"@stdlib/assert/is-uint32array":44,"@stdlib/constants/uint32/max":71}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./main.js":35}],35:[function(require,module,exports){
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

},{"./uint8array.js":36,"@stdlib/assert/is-uint8array":46,"@stdlib/constants/uint8/max":72}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{"./main.js":38}],38:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":281}],39:[function(require,module,exports){
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

},{"@stdlib/array/uint16":8,"@stdlib/array/uint8":14}],40:[function(require,module,exports){
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

},{"./ctors.js":39}],42:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":281}],44:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":281}],46:[function(require,module,exports){
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

},{"./main.js":47}],47:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":281}],48:[function(require,module,exports){
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
* Smallest positive single-precision floating-point normal number.
*
* @module @stdlib/constants/float32/smallest-normal
* @type {number}
*
* @example
* var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/constants/float32/smallest-normal' );
* // returns 1.1754943508222875e-38
*/


// MAIN //

/**
* The smallest positive single-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{127-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000001 00000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 1.1754943508222875e-38
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_SMALLEST_NORMAL = 1.1754943508222875e-38;


// EXPORTS //

module.exports = FLOAT32_SMALLEST_NORMAL;

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
* Euler's number.
*
* @module @stdlib/constants/float64/e
* @type {number}
*
* @example
* var E = require( '@stdlib/constants/float64/e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/
var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

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
* The Euler-Mascheroni constant.
*
* @module @stdlib/constants/float64/eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/constants/float64/eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

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

},{}],53:[function(require,module,exports){
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
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/constants/float64/gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/constants/float64/gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

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
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/float64/half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
* // returns 3.46573590279972654709e-01
*/

// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

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
* Natural logarithm of `2`.
*
* @module @stdlib/constants/float64/ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/float64/ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ```tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

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
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/constants/float64/max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* ## Notes
*
* The natural logarithm of the maximum is given by
*
* ```tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

},{}],60:[function(require,module,exports){
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
* Maximum double-precision floating-point number.
*
* @module @stdlib/constants/float64/max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/constants/float64/max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* Maximum double-precision floating-point number.
*
* ## Notes
*
* The maximum is given by
*
* ```tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/constants/float64/min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

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

},{"@stdlib/number/ctor":218}],64:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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
* Square root of double-precision floating-point epsilon.
*
* @module @stdlib/constants/float64/sqrt-eps
* @type {number}
*
* @example
* var FLOAT64_SQRT_EPSILON = require( '@stdlib/constants/float64/sqrt-eps' );
* // returns 0.14901161193847656e-7
*/


// MAIN //

/**
* Square root of double-precision floating-point epsilon.
*
* ```tex
* \sqrt{\frac{1}{2^{52}}}
* ```
*
* @constant
* @type {number}
* @default 0.14901161193847656e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_SQRT_EPSILON = 0.1490116119384765625e-7;


// EXPORTS //

module.exports = FLOAT64_SQRT_EPSILON;

},{}],68:[function(require,module,exports){
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
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/constants/float64/sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

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
* The mathematical constant `π` times `2`.
*
* @module @stdlib/constants/float64/two-pi
* @type {number}
*
* @example
* var TWO_PI = require( '@stdlib/constants/float64/two-pi' );
* // returns 6.283185307179586
*/


// MAIN //

/**
* The mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 6.283185307179586
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var TWO_PI = 6.28318530717958647692528676655900576839433879875021164194988918461563281257241799725606965068423413596429617303; // eslint-disable-line max-len


// EXPORTS //

module.exports = TWO_PI;

},{}],70:[function(require,module,exports){
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
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
* // returns false
*/

// MODULES //

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":74}],74:[function(require,module,exports){
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

var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
}


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":77}],75:[function(require,module,exports){
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

},{"./main.js":76}],76:[function(require,module,exports){
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

},{"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65}],77:[function(require,module,exports){
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
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
*/

// MODULES //

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":78}],78:[function(require,module,exports){
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

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":112}],79:[function(require,module,exports){
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

},{"./main.js":80}],80:[function(require,module,exports){
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
* Test if a double-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./main.js":82}],82:[function(require,module,exports){
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

var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/float64/ninf":63}],83:[function(require,module,exports){
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
* Test if a finite numeric value is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
* // returns false
*/

// MODULES //

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":84}],84:[function(require,module,exports){
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

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite numeric value is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
}


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":73}],85:[function(require,module,exports){
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
* Test if a double-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZero;

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

var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/float64/pinf":65}],87:[function(require,module,exports){
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

},{"./main.js":88}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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
* Round a double-precision floating-point number toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './main.js' );


// EXPORTS //

module.exports = ceil;

},{"./main.js":90}],90:[function(require,module,exports){
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
* Rounds a double-precision floating-point number toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = ceil;

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

},{"@stdlib/number/float64/base/from-words":222,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/to-words":240}],93:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":163,"@stdlib/math/base/special/kernel-sin":167,"@stdlib/math/base/special/rempio2":195,"@stdlib/number/float64/base/get-high-word":226}],94:[function(require,module,exports){
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

},{"./cos.js":93}],95:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalPP = require( './polyval_pp.js' );
var polyvalQQ = require( './polyval_qq.js' );
var polyvalPA = require( './polyval_pa.js' );
var polyvalQA = require( './polyval_qa.js' );
var polyvalRA = require( './polyval_ra.js' );
var polyvalSA = require( './polyval_sa.js' );
var polyvalRB = require( './polyval_rb.js' );
var polyvalSB = require( './polyval_sb.js' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1;  // 0x3FEB0AC1, 0x60000000

var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var QQC = 1.0;

var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var QAC = 1.0;

var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var SAC = 1.0;

var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var SBC = 1.0;


// MAIN //

/**
* Evaluates the complementary error function.
*
* ```tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ```tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* ## Method
*
* 1.  For \\(|x| \in [0, 0.84375)\\),
*
*     ```tex
*     \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*     0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*     \end{cases}
*     ```
*
*     where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*     ```tex
*     \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*     ```
*
*     <!-- <note> -->
*
*     The formula is derived by noting
*
*     ```tex
*     \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*     ```
*
*     and that
*
*     ```tex
*     \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*     ```
*
*     is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*
*     <!-- </note> -->
*
* 2.  For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*     ```tex
*     \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*     1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*     where
*
*     ```tex
*     \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*     ```
*
*     <!-- <note> -->
*
*     Here, we use the Taylor series expansion at \\(x = 1\\)
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*     &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*     \end{align*}
*     ```
*
*     using a rational approximation to approximate
*
*     ```tex
*     \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*     ```
*
*     <!-- </note> -->
*
*     Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*     -   \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*     -   \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3.  For \\(x \in [1.25,1/0.35)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*     \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*     \end{align*}
*     ```
*
*     where
*
*     -   \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4.  For \\(x \in [1/0.35,28)\\),
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*     2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*     2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*     \end{cases}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erf}(x) = \begin{cases}
*     \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*     \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*     \end{cases}
*     ```
*
*     where
*
*     -   \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5.  For \\(x \in [28, \infty)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*     \end{align*}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*     2 - \mathrm{tiny} & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*     ```tex
*     -x^2 = -s^2 + (s-x)(s+x)
*     ```
*
*     and
*
*     ```tex
*     e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*     ```
*
* -   `#4` and `#5` make use of the asymptotic series
*
*     ```tex
*     \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*     ```
*
*     We use a rational approximation to approximate
*
*     ```tex
*     g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*     ```
*
* -   The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*     ```tex
*     |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*     ```
*
*     and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*     ```tex
*     |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*     ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Infinity );
* // returns 0.0
*
* @example
* var y = erfc( -Infinity );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
}


// EXPORTS //

module.exports = erfc;

},{"./polyval_pa.js":97,"./polyval_pp.js":98,"./polyval_qa.js":99,"./polyval_qq.js":100,"./polyval_ra.js":101,"./polyval_rb.js":102,"./polyval_sa.js":103,"./polyval_sb.js":104,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/exp":107,"@stdlib/number/float64/base/set-low-word":237}],96:[function(require,module,exports){
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
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Infinity );
* // returns 0.0
*
* y = erfc( -Infinity );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":95}],97:[function(require,module,exports){
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
		return 0.41485611868374833;
	}
	return 0.41485611868374833 + (x * (-0.3722078760357013 + (x * (0.31834661990116175 + (x * (-0.11089469428239668 + (x * (0.035478304325618236 + (x * -0.002166375594868791))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],98:[function(require,module,exports){
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
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],99:[function(require,module,exports){
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
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],100:[function(require,module,exports){
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
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],101:[function(require,module,exports){
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
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],102:[function(require,module,exports){
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
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],103:[function(require,module,exports){
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
		return 19.651271667439257;
	}
	return 19.651271667439257 + (x * (137.65775414351904 + (x * (434.56587747522923 + (x * (645.3872717332679 + (x * (429.00814002756783 + (x * (108.63500554177944 + (x * (6.570249770319282 + (x * -0.0604244152148581))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],104:[function(require,module,exports){
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
		return 30.33806074348246;
	}
	return 30.33806074348246 + (x * (325.7925129965739 + (x * (1536.729586084437 + (x * (3199.8582195085955 + (x * (2553.0504064331644 + (x * (474.52854120695537 + (x * -22.44095244658582))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],105:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*     ```tex
*     \begin{align*}
*     x &= k \cdot \ln(2) + r \\
*     |r| &\leq 0.5 \cdot \ln(2)
*     \end{align*}
*     ```
*
*     <!-- <note> -->
*
*     \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*     <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\(\[0,0.34658]\\):
*
*     ```tex
*     \begin{align*}
*     R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*     &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*     ```tex
*     R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*     ```
*
*     where \\( z = r^2 \\) and
*
*     ```tex
*     \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*     <!-- </note> -->
*
*     The computation of \\( e^{r} \\) thus becomes
*
*     ```tex
*     \begin{align*}
*     e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*     \end{align*}
*     ```
*
*     where
*
*     ```tex
*     R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*     ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*     ```tex
*     e^{x} = 2^k e^{r}
*     ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision.
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":106,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/trunc":207}],106:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":108,"@stdlib/math/base/special/ldexp":169}],107:[function(require,module,exports){
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
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":105}],108:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],109:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_expm1.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\(\[0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
*
* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.9999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = getHighWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > HALF_LN2 ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (FLOAT64_EXPONENT_BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
	return setHighWord( y, hi );
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":111,"@stdlib/constants/float64/exponent-bias":52,"@stdlib/constants/float64/half-ln-two":54,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/set-high-word":235}],110:[function(require,module,exports){
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
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":109}],111:[function(require,module,exports){
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
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],112:[function(require,module,exports){
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

},{"./main.js":113}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MAIN //

/**
* Calculates the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @name gammaLanczosSumExpGScaled
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* @example
* var v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* @example
* var v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./rational_pq.js":116}],115:[function(require,module,exports){
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
* Calculate the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum-expg-scaled
*
* @example
* var gammaLanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
*
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":114}],116:[function(require,module,exports){
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 709811.662581658 + (x * (679979.8474157227 + (x * (293136.7857211597 + (x * (74887.54032914672 + (x * (12555.290582413863 + (x * (1443.4299244417066 + (x * (115.24194596137347 + (x * (6.309239205732627 + (x * (0.22668404630224365 + (x * (0.004826466289237662 + (x * 0.00004624429436045379))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00004624429436045379 + (x * (0.004826466289237662 + (x * (0.22668404630224365 + (x * (6.309239205732627 + (x * (115.24194596137347 + (x * (1443.4299244417066 + (x * (12555.290582413863 + (x * (74887.54032914672 + (x * (293136.7857211597 + (x * (679979.8474157227 + (x * 709811.662581658))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],117:[function(require,module,exports){
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
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );
var rateval = require( './rational_pq.js' );


// MAIN //

/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
*
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
*
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
*
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
*
* @example
* var v = gamma( 0.0 );
* // returns Infinity
*
* @example
* var v = gamma( -0.0 );
* // returns -Infinity
*
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if ( x > 171.61447887182298 ) {
		return PINF;
	}
	if ( x < -170.5674972726612 ) {
		return 0.0;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
}


// EXPORTS //

module.exports = gamma;

},{"./rational_pq.js":120,"./small_approximation.js":121,"./stirling_approximation.js":122,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pi":64,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-integer":77,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/assert/is-negative-zero":81,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/floor":112,"@stdlib/math/base/special/sin":201}],118:[function(require,module,exports){
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
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Infinity
*
* v = gamma( -0.0 );
* // returns -Infinity
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":117}],119:[function(require,module,exports){
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
		return 0.08333333333334822;
	}
	return 0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],120:[function(require,module,exports){
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
		s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],121:[function(require,module,exports){
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
* The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var EULER = require( '@stdlib/constants/float64/eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @private
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( (1.0+( EULER*x )) * x );
}


// EXPORTS //

module.exports = gamma;

},{"@stdlib/constants/float64/eulergamma":51}],122:[function(require,module,exports){
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
* The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var polyval = require( './polyval_s.js' );


// VARIABLES //

var MAX_STIRLING = 143.01608;


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + ( w * polyval( w ) );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, ( 0.5*x ) - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
}


// EXPORTS //

module.exports = gamma;

},{"./polyval_s.js":119,"@stdlib/constants/float64/sqrt-two-pi":68,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/pow":182}],123:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14.
* (C) Copyright Christopher Kormanyos 2013-14.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var gamma = require( '@stdlib/math/base/special/gamma' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var lgammaSmallImp = require( './lgamma_small_imp.js' );


// MAIN //

/**
* Computes `gamma(x+1) - 1`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammap1m1( 0.2 );
* // returns ~-0.082
*
* @example
* var v = gammap1m1( -9.2 );
* // returns ~-1.0
*
* @example
* var v = gammap1m1( 0.0 );
* // returns 0.0
*
* @example
* var v = gammap1m1( -3.0 );
* // returns NaN
*
* @example
* var v = gammap1m1( NaN );
* // returns NaN
*/
function gammap1m1( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x < 0.0 ) {
		if ( x < -0.5 ) {
			// Best method is simply to subtract 1 from gamma:
			return gamma( 1.0+x ) - 1.0;
		}
		// Use expm1 on the logarithm of gamma:
		return expm1( -log1p( x ) + lgammaSmallImp( x+2.0, x+1.0, x ) );
	}
	if ( x < 2.0 ) {
		// Use expm1 on the logarithm of gamma:
		return expm1( lgammaSmallImp( x+1.0, x, x-1.0 ) );
	}
	// Best method is simply to subtract 1 from gamma:
	return gamma( 1.0+x ) - 1.0;
}


// EXPORTS //

module.exports = gammap1m1;

},{"./lgamma_small_imp.js":125,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/expm1":110,"@stdlib/math/base/special/gamma":118,"@stdlib/math/base/special/log1p":175}],124:[function(require,module,exports){
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
* Compute `gamma(x+1) - 1` without cancellation errors.
*
* @module @stdlib/math/base/special/gamma1pm1
*
* @example
* var gamma1pm1 = require( '@stdlib/math/base/special/gamma1pm1' );
*
* var v = gamma1pm1( 0.2 );
* // returns ~-0.082
*
* v = gamma1pm1( -5.3 );
* // returns ~-1.102
*
* v = gamma1pm1( 0.0 );
* // returns 0.0
*
* v = gamma1pm1( NaN );
* // returns NaN
*/

// MODULES //

var gamma1pm1 = require( './gamma1pm1.js' );


// EXPORTS //

module.exports = gamma1pm1;

},{"./gamma1pm1.js":123}],125:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/lgamma_small.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14.
* (C) Copyright Christopher Kormanyos 2013-14.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var ln = require( '@stdlib/math/base/special/ln' );
var EPS = require( '@stdlib/constants/float64/eps' );
var rateval1 = require( './rational_p1q1.js' );
var rateval2 = require( './rational_p2q2.js' );
var rateval3 = require( './rational_p3q3.js' );


// VARIABLES //

var Y1 = 0.158963680267333984375;
var Y2 = 0.52815341949462890625;
var Y3 = 0.452017307281494140625;


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function for small arguments.
*
* ## Method
*
* 1.  For \\( z > 2 \\), begin by performing argument reduction until \\( z \\) is in \\(\[2,3)\\). Use the following form:
*
*     ```tex
*     \operatorname{gammaln}(z) = (z-2)(z+1)(Y + R(z-2))
*     ```
*
*     where \\( R(z-2) \\) is a rational approximation optimized for low absolute error. As long as the absolute error is small compared to the constant \\( Y \\), then any rounding error in the computation will get wiped out.
*
* 2.  If \\( z < 1 \\), use recurrence to shift to \\( z \\) in the interval \\(\[1,2\]\\). Then, use one of two approximations: one for \\( z \\) in \\(\[1,1.5\]\\) and one for \\( z \\) in \\(\[1.5,2\]\\):
*
*     -   For \(( z \\) in \\(\[1,1.5\]\\), use
*
*         ```tex
*         \operatorname{gammaln}(z) = (z-1)(z-2)(Y + R(z-1))
*         ```
*
*         where \\( R(z-1) \\) is a rational approximation optimized for low absolute error. As long as the absolute error is small compared to the constant \\( Y \\), then any rounding error in the computation will get wiped out.
*
*     -   For \\( z \\) in \\(\[1.5,2\]\\), use
*
*         ```tex
*         \operatorname{gammaln}(z) = (2-z)(1-z)(Y + R(2-z))
*         ```
*
*         where \\( R(2-z) \\) is a rational approximation optimized for low absolute error. As long as the absolute error is small compared to the constant \\( Y \\), then any rounding error in the computation will get wiped out.
*
*
* ## Notes
*
* -   Relative error:
*
*     | function | peak         | maximum deviation |
*     |:--------:|:------------:|:-----------------:|
*     | R(Z-2)   | 4.231e-18    | 5.900e-24         |
*     | R(Z-1)   | 1.230011e-17 | 3.139e-021        |
*     | R(2-Z)   | 1.797565e-17 | 2.151e-021        |
*
*
* @private
* @param {number} z - input value
* @param {number} zm1 - `z` minus one
* @param {number} zm2 - `z` minus two
* @returns {number} function value
*/
function lgammaSmallImp( z, zm1, zm2 ) {
	var prefix;
	var result;
	var r;
	var R;

	if ( z < EPS ) {
		return -ln( z );
	}
	if ( zm1 === 0.0 || zm2 === 0.0 ) {
		return 0.0;
	}
	result = 0.0;
	if ( z > 2.0 ) {
		if ( z >= 3.0 ) {
			do {
				z -= 1.0;
				zm2 -= 1.0;
				result += ln(z);
			} while ( z >= 3.0 );
			zm2 = z - 2.0;
		}
		r = zm2 * ( z+1.0 );
		R = rateval1( zm2 );
		result += ( r*Y1 ) + ( r*R );
		return result;
	}
	if ( z < 1.0 ) {
		result += -ln(z);
		zm2 = zm1;
		zm1 = z;
		z += 1.0;
	}
	if ( z <= 1.5 ) {
		r = rateval2( zm1 );
		prefix = zm1 * zm2;
		result += ( prefix*Y2 ) + ( prefix*r );
		return result;
	}
	// Case: 1.5 < z <= 2
	r = zm2 * zm1;
	R = rateval3( -zm2 );
	result += ( r*Y3 ) + ( r*R );
	return result;
}


// EXPORTS //

module.exports = lgammaSmallImp;

},{"./rational_p1q1.js":126,"./rational_p2q2.js":127,"./rational_p3q3.js":128,"@stdlib/constants/float64/eps":50,"@stdlib/math/base/special/ln":171}],126:[function(require,module,exports){
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.01803556856784494;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.01803556856784494 + (x * (0.02512664961998968 + (x * (0.049410315156753225 + (x * (0.0172491608709614 + (x * (-0.0002594535632054381 + (x * (-0.0005410098692152044 + (x * (-0.00003245886498259485 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (1.962029871977952 + (x * (1.4801966942423133 + (x * (0.5413914320717209 + (x * (0.09885042511280101 + (x * (0.008213096746488934 + (x * (0.00022493629192211576 + (x * -2.2335276320861708e-7))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (-0.00003245886498259485 + (x * (-0.0005410098692152044 + (x * (-0.0002594535632054381 + (x * (0.0172491608709614 + (x * (0.049410315156753225 + (x * (0.02512664961998968 + (x * -0.01803556856784494))))))))))))); // eslint-disable-line max-len
		s2 = -2.2335276320861708e-7 + (x * (0.00022493629192211576 + (x * (0.008213096746488934 + (x * (0.09885042511280101 + (x * (0.5413914320717209 + (x * (1.4801966942423133 + (x * (1.962029871977952 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],127:[function(require,module,exports){
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 0.04906224540690395;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 0.04906224540690395 + (x * (-0.09691175301595212 + (x * (-0.4149833583594954 + (x * (-0.4065671242119384 + (x * (-0.1584135863906922 + (x * (-0.024014982064857155 + (x * -0.0010034668769627955))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (3.0234982984646304 + (x * (3.4873958536072385 + (x * (1.9141558827442668 + (x * (0.5071377386143635 + (x * (0.05770397226904519 + (x * 0.001957681026011072))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -0.0010034668769627955 + (x * (-0.024014982064857155 + (x * (-0.1584135863906922 + (x * (-0.4065671242119384 + (x * (-0.4149833583594954 + (x * (-0.09691175301595212 + (x * 0.04906224540690395))))))))))); // eslint-disable-line max-len
		s2 = 0.001957681026011072 + (x * (0.05770397226904519 + (x * (0.5071377386143635 + (x * (1.9141558827442668 + (x * (3.4873958536072385 + (x * (3.0234982984646304 + (x * 1.0))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],128:[function(require,module,exports){
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.029232972183027003;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.029232972183027003 + (x * (0.14421626775719232 + (x * (-0.14244039073863127 + (x * (0.05428096940550536 + (x * (-0.008505359768683364 + (x * (0.0004311713426792973 + (x * 0.0))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-1.5016935605448505 + (x * (0.846973248876495 + (x * (-0.22009515181499575 + (x * (0.02558279715597587 + (x * (-0.0010066679553914337 + (x * -8.271935218912905e-7))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0004311713426792973 + (x * (-0.008505359768683364 + (x * (0.05428096940550536 + (x * (-0.14244039073863127 + (x * (0.14421626775719232 + (x * -0.029232972183027003))))))))))); // eslint-disable-line max-len
		s2 = -8.271935218912905e-7 + (x * (-0.0010066679553914337 + (x * (0.02558279715597587 + (x * (-0.22009515181499575 + (x * (0.846973248876495 + (x * (-1.5016935605448505 + (x * 1.0))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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
*
*
* ## Notice
*
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Calculates normalized Q when a is an integer.
*
* @private
* @param {integer} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteGammaQ( a, x ) {
	var term;
	var sum;
	var e;
	var n;

	e = exp( -x );
	sum = e;
	if ( sum !== 0.0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ) {
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
}


// EXPORTS //

module.exports = finiteGammaQ;

},{"@stdlib/math/base/special/exp":107}],130:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Calculates normalized Q when a is a half-integer.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteHalfGammaQ( a, x ) {
	var half;
	var term;
	var sum;
	var e;
	var n;

	e = erfc( sqrt(x) );
	if ( e !== 0 && a > 1.0 ) {
		term = exp( -x ) / sqrt( PI * x );
		term *= x;
		half = 0.5;
		term /= half;
		sum = term;
		for ( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
}


// EXPORTS //

module.exports = finiteHalfGammaQ;

},{"@stdlib/constants/float64/pi":64,"@stdlib/math/base/special/erfc":96,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/sqrt":205}],131:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/float64/max-ln' );
var MIN_LN = require( '@stdlib/constants/float64/min-ln' );


// MAIN //

/**
* Calculates the power term prefix `(z^a)(e^-z)` used in the non-normalized incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else {
		/* eslint-disable no-lonely-if */
		if ( alz > MIN_LN ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( z/a < MAX_LN ) {
			prefix = pow( z / exp(z/a), a );
		} else {
			prefix = exp( alz - z );
		}
	}
	return prefix;
}


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/constants/float64/max-ln":59,"@stdlib/constants/float64/min-ln":62,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/ln":171,"@stdlib/math/base/special/pow":182}],132:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14.
* (C) Christopher Kormanyos 2013-14.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_EPSILON = require( '@stdlib/constants/float64/sqrt-eps' );
var FLOAT64_MAX = require( '@stdlib/constants/float64/max' );
var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
var MAX_LN = require( '@stdlib/constants/float64/max-ln' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var finiteGammaQ = require( './finite_gamma_q.js' );
var finiteHalfGammaQ = require( './finite_half_gamma_q.js' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var igammaTemmeLarge = require( './igamma_temme_large.js' );
var lowerGammaSeries = require( './lower_gamma_series.js' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );
var tgammaSmallUpperPart = require( './tgamma_small_upper_part.js' );
var upperGammaFraction = require( './upper_gamma_fraction.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method for computing continued fractions, the lower tail using a power expansion.
*
*
* ## Notes
*
* -   When `a >= MAX_FACTORIAL` and computing the non-normalized incomplete gamma, result is rather hard to compute unless we use logs. There are really two options a) if `x` is a long way from `a` in value then we can reliably use methods 2 and 4 below in logarithmic form and go straight to the result. Otherwise we let the regularized gamma take the strain (the result is unlikely to underflow in the central region anyway) and combine with `lgamma` in the hopes that we get a finite result.
*
* @param {NonNegativeNumber} x - function parameter
* @param {PositiveNumber} a - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {number} function value
*/
function gammainc( x, a, regularized, upper ) {
	var optimisedInvert;
	var normalized;
	var evalMethod;
	var initValue;
	var isHalfInt;
	var useTemme;
	var isSmallA;
	var invert;
	var result;
	var isInt;
	var sigma;
	var gam;
	var res;
	var fa;
	var g;

	if ( x < 0.0 || a <= 0.0 ) {
		return NaN;
	}
	normalized = ( regularized === void 0 ) ? true : regularized;
	invert = upper;
	result = 0.0;
	if ( a >= MAX_FACTORIAL && !normalized ) {
		if ( invert && ( a * 4.0 < x ) ) {
			// This is method 4 below, done in logs:
			result = ( a * ln(x) ) - x;
			result += ln( upperGammaFraction( a, x ) );
		}
		else if ( !invert && ( a > 4.0 * x ) ) {
			// This is method 2 below, done in logs:
			result = ( a * ln(x) ) - x;
			initValue = 0;
			result += ln( lowerGammaSeries( a, x, initValue ) / a );
		}
		else {
			result = gammainc( a, x, true, invert );
			if ( result === 0.0 ) {
				if ( invert ) {
					// Try http://functions.wolfram.com/06.06.06.0039.01
					result = 1.0 + ( 1.0 / (12.0*a) ) + ( 1.0 / (288.0*a*a) );
					result = ln( result ) - a + ( ( a-0.5 ) * ln(a) );
					result += ln( SQRT_TWO_PI );
				} else {
					// This is method 2 below, done in logs, we're really outside the range of this method, but since the result is almost certainly infinite, we should probably be OK:
					result = ( a * ln( x ) ) - x;
					initValue = 0.0;
					result += ln( lowerGammaSeries( a, x, initValue ) / a);
				}
			}
			else {
				result = ln( result ) + gammaln( a );
			}
		}
		if ( result > MAX_LN ) {
			return PINF;
		}
		return exp( result );
	}
	isSmallA = ( a < 30 ) && ( a <= x + 1.0 ) && ( x < MAX_LN );
	if ( isSmallA ) {
		fa = floor( a );
		isInt = ( fa === a );
		isHalfInt = ( isInt ) ? false : ( abs( fa - a ) === 0.5 );
	} else {
		isInt = isHalfInt = false;
	}
	if ( isInt && x > 0.6 ) {
		// Calculate Q via finite sum:
		invert = !invert;
		evalMethod = 0;
	}
	else if ( isHalfInt && x > 0.2 ) {
		// Calculate Q via finite sum for half integer a:
		invert = !invert;
		evalMethod = 1;
	}
	else if ( x < SQRT_EPSILON && a > 1.0 ) {
		evalMethod = 6;
	}
	else if ( x < 0.5 ) {
		// Changeover criterion chosen to give a changeover at Q ~ 0.33:
		if ( -0.4 / ln( x ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else if ( x < 1.1 ) {
		// Changeover here occurs when P ~ 0.75 or Q ~ 0.25:
		if ( x * 0.75 < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else {
		// Begin by testing whether we're in the "bad" zone where the result will be near 0.5 and the usual series and continued fractions are slow to converge:
		useTemme = false;
		if ( normalized && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				// Limit chosen so that we use Temme's expansion only if the result would be larger than about 10^-6. Below that the regular series and continued fractions converge OK, and if we use Temme's method we get increasing errors from the dominant erfc term as it's (inexact) argument increases in magnitude.
				if ( 20 / a > sigma * sigma ) {
					useTemme = true;
				}
			} else if ( sigma < 0.4 ) {
				useTemme = true;
			}
		}
		if ( useTemme ) {
			evalMethod = 5;
		}
		// Regular case where the result will not be too close to 0.5: Changeover occurs at P ~ Q ~ 0.5. Note that series computation of P is about x2 faster than continued fraction calculation of Q, so try and use the CF only when really necessary, especially for small x.
		else if ( x - ( 1.0 / (3.0 * x) ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 4;
			invert = !invert;
		}
	}

	/* eslint-disable default-case */
	switch ( evalMethod ) {
	case 0:
		result = finiteGammaQ( a, x );
		if (normalized === false ) {
			result *= gamma( a );
		}
		break;
	case 1:
		result = finiteHalfGammaQ( a, x );
		if ( normalized === false ) {
			result *= gamma( a );
		}
		break;
	case 2:
		// Compute P:
		result = ( normalized ) ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0.0 ) {
			initValue = 0.0;
			optimisedInvert = false;
			if ( invert ) {
				initValue = ( normalized ) ? 1.0 : gamma(a);
				if (
					normalized ||
					result >= 1.0 ||
					FLOAT64_MAX * result > initValue
				) {
					initValue /= result;
					if (
						normalized ||
						a < 1.0 ||
						( FLOAT64_MAX / a > initValue )
					) {
						initValue *= -a;
						optimisedInvert = true;
					}
					else {
						initValue = 0.0;
					}
				}
				else {
					initValue = 0.0;
				}
			}
		}
		result *= lowerGammaSeries( a, x, initValue ) / a;
		if ( optimisedInvert ) {
			invert = false;
			result = -result;
		}
		break;
	case 3:
		// Compute Q:
		invert = !invert;
		res = tgammaSmallUpperPart( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalized ) {
			result /= g;
		}
		break;
	case 4:
		// Compute Q:
		result = ( normalized ) ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0 ) {
			result *= upperGammaFraction( a, x );
		}
		break;
	case 5:
		result = igammaTemmeLarge( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
		break;
	case 6:
		// Since x is so small that P is necessarily very small too, use http://functions.wolfram.com/GammaBetaErf/GammaRegularized/06/01/05/01/01/
		result = ( normalized ) ?
			pow(x, a) / gamma( a + 1.0 ) :
			pow( x, a ) / a;
		result *= 1.0 - ( a * x / ( a + 1.0 ) );
		break;
	}
	if ( normalized && result > 1.0 ) {
		result = 1.0;
	}
	if ( invert ) {
		gam = ( normalized ) ? 1.0 : gamma( a );
		result = gam - result;
	}
	return result;
}


// EXPORTS //

module.exports = gammainc;

},{"./finite_gamma_q.js":129,"./finite_half_gamma_q.js":130,"./full_igamma_prefix.js":131,"./igamma_temme_large.js":133,"./lower_gamma_series.js":135,"./regularised_gamma_prefix.js":146,"./tgamma_small_upper_part.js":148,"./upper_gamma_fraction.js":149,"@stdlib/constants/float64/max":60,"@stdlib/constants/float64/max-ln":59,"@stdlib/constants/float64/pinf":65,"@stdlib/constants/float64/sqrt-eps":67,"@stdlib/constants/float64/sqrt-two-pi":68,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/floor":112,"@stdlib/math/base/special/gamma":118,"@stdlib/math/base/special/gammaln":152,"@stdlib/math/base/special/ln":171,"@stdlib/math/base/special/pow":182}],133:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var TWO_PI = require( '@stdlib/constants/float64/two-pi' );
var polyvalC0 = require( './polyval_c0.js' );
var polyvalC1 = require( './polyval_c1.js' );
var polyvalC2 = require( './polyval_c2.js' );
var polyvalC3 = require( './polyval_c3.js' );
var polyvalC4 = require( './polyval_c4.js' );
var polyvalC5 = require( './polyval_c5.js' );
var polyvalC6 = require( './polyval_c6.js' );
var polyvalC7 = require( './polyval_c7.js' );
var polyvalC8 = require( './polyval_c8.js' );


// VARIABLES //

// Pre-allocate workspace array:
var workspace = [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Asymptotic expansions of the incomplete gamma functions when `a` is large and `x ~ a` (IEEE double precision or 10^-17).
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} value of asymptotic expansion
*/
function igammaTemmeLarge( a, x ) {
	var result;
	var sigma;
	var phi;
	var y;
	var z;

	sigma = ( x-a ) / a;
	phi = -ln( 1.0 + sigma ) + sigma;
	y = a * phi;
	z = sqrt( 2.0 * phi );
	if ( x < a ) {
		z = -z;
	}
	workspace[ 0 ] = polyvalC0( z );
	workspace[ 1 ] = polyvalC1( z );
	workspace[ 2 ] = polyvalC2( z );
	workspace[ 3 ] = polyvalC3( z );
	workspace[ 4 ] = polyvalC4( z );
	workspace[ 5 ] = polyvalC5( z );
	workspace[ 6 ] = polyvalC6( z );
	workspace[ 7 ] = polyvalC7( z );
	workspace[ 8 ] = polyvalC8( z );
	workspace[ 9 ] = -0.00059676129019274625;
	result = evalpoly( workspace, 1.0/a );
	result *= exp( -y ) / sqrt( TWO_PI * a );
	if ( x < a ) {
		result = -result;
	}
	result += erfc( sqrt(y) ) / 2.0;
	return result;
}


// EXPORTS //

module.exports = igammaTemmeLarge;

},{"./polyval_c0.js":137,"./polyval_c1.js":138,"./polyval_c2.js":139,"./polyval_c3.js":140,"./polyval_c4.js":141,"./polyval_c5.js":142,"./polyval_c6.js":143,"./polyval_c7.js":144,"./polyval_c8.js":145,"@stdlib/constants/float64/two-pi":69,"@stdlib/math/base/special/erfc":96,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/ln":171,"@stdlib/math/base/special/sqrt":205,"@stdlib/math/base/tools/evalpoly":214}],134:[function(require,module,exports){
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
* Evaluate the incomplete gamma function.
*
* @module @stdlib/math/base/special/gammainc
*
* @example
* var gammainc = require( '@stdlib/math/base/special/gammainc' );
*
* var v = gammainc( 6.0, 2.0 );
* // returns ~0.9826
*
* v = gammainc( 1.0, 2.0, true, true );
* // returns ~0.7358
*
* v = gammainc( 7.0, 5.0 );
* // returns ~0.8270
*
* v = gammainc( 7.0, 5.0, false );
* // returns ~19.8482
*
* v = gammainc( NaN, 2.0 );
* // returns NaN
*
* v = gammainc( 6.0, NaN );
* // returns NaN
*/

// MODULES //

var gammainc = require( './gammainc.js' );


// EXPORTS //

module.exports = gammainc;

},{"./gammainc.js":132}],135:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var lowerIncompleteGammaSeries = require( './lower_incomplete_gamma_series.js' );


// MAIN //

/**
* Sums elements of the series expansion of the lower incomplete gamma function.
*
* ## Method
*
* -   Multiply result by `((z^a) * (e^-z) / a)` to get the full lower incomplete integral.
* -   Divide by `tgamma(a)` to get the normalized value.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @param {number} initialValue - initial value of the resulting sum
* @returns {number} sum of terms of lower gamma series
*/
function lowerGammaSeries( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lowerIncompleteGammaSeries( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;
}


// EXPORTS //

module.exports = lowerGammaSeries;

},{"./lower_incomplete_gamma_series.js":136,"@stdlib/math/base/tools/sum-series":217}],136:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MAIN //

/**
* Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function lowerIncompleteGammaSeries( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	}
}


// EXPORTS //

module.exports = lowerIncompleteGammaSeries;

},{}],137:[function(require,module,exports){
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
		return -0.3333333333333333;
	}
	return -0.3333333333333333 + (x * (0.08333333333333333 + (x * (-0.014814814814814815 + (x * (0.0011574074074074073 + (x * (0.0003527336860670194 + (x * (-0.0001787551440329218 + (x * (0.00003919263178522438 + (x * (-0.0000021854485106799924 + (x * (-0.00000185406221071516 + (x * (8.296711340953087e-7 + (x * (-1.7665952736826078e-7 + (x * (6.707853543401498e-9 + (x * (1.0261809784240309e-8 + (x * (-4.382036018453353e-9 + (x * 9.14769958223679e-10))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],138:[function(require,module,exports){
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
		return -0.001851851851851852;
	}
	return -0.001851851851851852 + (x * (-0.003472222222222222 + (x * (0.0026455026455026454 + (x * (-0.0009902263374485596 + (x * (0.00020576131687242798 + (x * (-4.018775720164609e-7 + (x * (-0.000018098550334489977 + (x * (0.00000764916091608111 + (x * (-0.0000016120900894563446 + (x * (4.647127802807434e-9 + (x * (1.378633446915721e-7 + (x * (-5.752545603517705e-8 + (x * 1.1951628599778148e-8))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],139:[function(require,module,exports){
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
		return 0.004133597883597883;
	}
	return 0.004133597883597883 + (x * (-0.0026813271604938273 + (x * (0.0007716049382716049 + (x * (0.0000020093878600823047 + (x * (-0.00010736653226365161 + (x * (0.000052923448829120125 + (x * (-0.000012760635188618728 + (x * (3.423578734096138e-8 + (x * (0.0000013721957309062932 + (x * (-6.298992138380055e-7 + (x * 1.4280614206064242e-7))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],140:[function(require,module,exports){
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
		return 0.0006494341563786008;
	}
	return 0.0006494341563786008 + (x * (0.00022947209362139917 + (x * (-0.0004691894943952557 + (x * (0.00026772063206283885 + (x * (-0.00007561801671883977 + (x * (-2.396505113867297e-7 + (x * (0.000011082654115347302 + (x * (-0.0000056749528269915965 + (x * 0.0000014230900732435883))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return -0.0008618882909167117;
	}
	return -0.0008618882909167117 + (x * (0.0007840392217200666 + (x * (-0.0002990724803031902 + (x * (-0.0000014638452578843418 + (x * (0.00006641498215465122 + (x * (-0.00003968365047179435 + (x * 0.000011375726970678419))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],142:[function(require,module,exports){
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
		return -0.00033679855336635813;
	}
	return -0.00033679855336635813 + (x * (-0.00006972813758365858 + (x * (0.0002772753244959392 + (x * (-0.00019932570516188847 + (x * (0.00006797780477937208 + (x * (1.419062920643967e-7 + (x * (-0.000013594048189768693 + (x * (0.000008018470256334202 + (x * -0.000002291481176508095))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],143:[function(require,module,exports){
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
		return 0.0005313079364639922;
	}
	return 0.0005313079364639922 + (x * (-0.0005921664373536939 + (x * (0.0002708782096718045 + (x * (7.902353232660328e-7 + (x * (-0.00008153969367561969 + (x * (0.0000561168275310625 + (x * -0.000018329116582843375))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],144:[function(require,module,exports){
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
		return 0.00034436760689237765;
	}
	return 0.00034436760689237765 + (x * (0.00005171790908260592 + (x * (-0.00033493161081142234 + (x * (0.0002812695154763237 + (x * -0.00010976582244684731))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],145:[function(require,module,exports){
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
		return -0.0006526239185953094;
	}
	return -0.0006526239185953094 + (x * (0.0008394987206720873 + (x * -0.000438297098541721))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],146:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/float64/max-ln' );
var MIN_LN = require( '@stdlib/constants/float64/min-ln' );
var G = require( '@stdlib/constants/float64/gamma-lanczos-g' );
var E = require( '@stdlib/constants/float64/e' );


// MAIN //

/**
* Computes `(z^a)*(e^-z) / gamma(a)`.
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} function value
*/
function regularisedGammaPrefix( a, z ) {
	var prefix;
	var amza;
	var agh;
	var alz;
	var amz;
	var sq;
	var d;

	agh = a + G - 0.5;
	d = ( (z - a) - G + 0.5 ) / agh;
	if ( a < 1.0 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimized against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= MIN_LN ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	if ( abs(d*d*a) <= 100.0 && a > 150.0 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * ( 0.5-G ) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. Direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2.0 > MIN_LN &&
				max(alz, amz)/2.0 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2.0 ) * exp( amz / 2.0 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4.0 > MIN_LN &&
				max(alz, amz)/4.0 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4.0 ) * exp( amz / 4.0 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > MIN_LN &&
				amza < MAX_LN
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
}


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/constants/float64/e":49,"@stdlib/constants/float64/gamma-lanczos-g":53,"@stdlib/constants/float64/max-ln":59,"@stdlib/constants/float64/min-ln":62,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/gamma":118,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":115,"@stdlib/math/base/special/gammaln":152,"@stdlib/math/base/special/ln":171,"@stdlib/math/base/special/log1p":175,"@stdlib/math/base/special/max":178,"@stdlib/math/base/special/min":180,"@stdlib/math/base/special/pow":182,"@stdlib/math/base/special/sqrt":205}],147:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

/**
* Series representation for upper fraction when `z` is small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {Function} series function
*/
function smallGamma2Series( a, x ) {
	var result;
	var apn;
	var n;
	var r;

	result = -x;
	x = -x;
	apn = a + 1.0;
	n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		r = result / apn;
		result *= x;
		n += 1;
		result /= n;
		apn += 1.0;
		return r;
	}
}


// EXPORTS //

module.exports = smallGamma2Series;

},{}],148:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var powm1 = require( '@stdlib/math/base/special/powm1' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var gamma1pm1 = require( '@stdlib/math/base/special/gamma1pm1' );
var smallGamma2Series = require( './small_gamma2_series.js' );


// MAIN //

/**
* Compute the full upper fraction (Q) when `a` is very small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @param {boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {Array} full upper fraction (Q) and pgam
*/
function tgammaSmallUpperPart( a, x, invert ) {
	var initialValue;
	var result;
	var pgam;
	var p;
	var s;

	result = gamma1pm1( a );
	pgam = ( result + 1.0 ) / a;
	p = powm1( x, a );
	result -= p;
	result /= a;
	s = smallGamma2Series( a, x );
	p += 1.0;
	initialValue = ( invert ) ? pgam : 0.0;
	result = -p * sumSeries( s, {
		'initialValue': (initialValue - result) / p
	});
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
}


// EXPORTS //

module.exports = tgammaSmallUpperPart;

},{"./small_gamma2_series.js":147,"@stdlib/math/base/special/gamma1pm1":124,"@stdlib/math/base/special/powm1":193,"@stdlib/math/base/tools/sum-series":217}],149:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var upperIncompleteGammaFract = require( './upper_incomplete_gamma_fract.js' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by `gamma(z)` to normalize.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upperGammaFraction( a, z ) {
	var f = upperIncompleteGammaFract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
}


// EXPORTS //

module.exports = upperGammaFraction;

},{"./upper_incomplete_gamma_fract.js":150,"@stdlib/math/base/tools/continued-fraction":211}],150:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MAIN //

/**
* Creates a function to evaluate a series expansion of the upper incomplete gamma fraction.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function upperIncompleteGammaFract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		k += 1;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	}
}


// EXPORTS //

module.exports = upperIncompleteGammaFract;

},{}],151:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_lgamma_r.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/float64/pi' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var polyvalA1 = require( './polyval_a1.js' );
var polyvalA2 = require( './polyval_a2.js' );
var polyvalR = require( './polyval_r.js' );
var polyvalS = require( './polyval_s.js' );
var polyvalT1 = require( './polyval_t1.js' );
var polyvalT2 = require( './polyval_t2.js' );
var polyvalT3 = require( './polyval_t3.js' );
var polyvalU = require( './polyval_u.js' );
var polyvalV = require( './polyval_v.js' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var RC = 1.0;
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var VC = 1.0;
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* ## Method
*
* 1.  Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in \[0,8]\\), we may reduce \\(x\\) to a number in \\(\[1.5,2.5]\\) by
*
*     ```tex
*     \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*     ```
*
*     For example,
*
*     ```tex
*     \begin{align*}
*     \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*     &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*     &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*     \end{align*}
*     ```
*
* 2.  Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\(\[\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\(\[1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*     ```tex
*     \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*     ```
*
*     where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3.  Compute a rational approximation in the primary interval \\(\[2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*     ```tex
*     \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*     ```
*
*     with accuracy
*
*     ```tex
*     \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*     ```
*
*     The algorithms are based on the observation
*
*     ```tex
*     \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*     ```
*
*     where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 4.  For \\(x \geq 8\\),
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*     ```
*
*     which can be expressed
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*     ```
*
*     Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*     ```tex
*     f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*     ```
*
*     by
*
*     ```tex
*     w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*     ```
*
*     where
*
*     ```tex
*     |w - f(z)| < 2^{-58.74}
*     ```
*
* 5.  For negative \\(x\\), since
*
*     ```tex
*     -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*     ```
*
*     where \\(\Gamma\\) is the gamma function, we have
*
*     ```tex
*     \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*     ```
*
*     Since \\(\Gamma(-x)\\) is positive,
*
*     ```tex
*     \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*     ```tex
*     \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     and
*
*     ```tex
*     \begin{align*}
*     \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*     &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*     \end{align*}
*     ```
*
*     <!-- <note> -->
*
*     Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*
*     <!-- </note> -->
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{lgamma}(2+s) &\approx s (1-\gamma) & \mathrm{for\ tiny\ s} \\
* \operatorname{lgamma}(x) &\approx -\ln(x) & \mathrm{for\ tiny\ x} \\
* \operatorname{lgamma}(1) &= 0 & \\
* \operatorname{lgamma}(2) &= 0 & \\
* \operatorname{lgamma}(0) &= \infty & \\
* \operatorname{lgamma}(\infty) &= \infty & \\
* \operatorname{lgamma}(-\mathrm{integer}) &= \pm \infty
* \end{align*}
* ```
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammaln( 1.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
*
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
*
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
*
* @example
* var v = gammaln( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaln( NaN );
* // returns NaN
*/
function gammaln( x ) {
	var isNegative;
	var nadj;
	var flg;
	var p3;
	var p2;
	var p1;
	var p;
	var q;
	var t;
	var w;
	var y;
	var z;
	var r;

	// Special cases: NaN, +-infinity
	if ( isnan( x ) || isInfinite( x ) ) {
		return x;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	if ( x < 0.0 ) {
		isNegative = true;
		x = -x;
	} else {
		isNegative = false;
	}
	// If |x| < 2**-70, return -ln(|x|)
	if ( x < TINY ) {
		return -ln( x );
	}
	if ( isNegative ) {
		// If |x| >= 2**52, must be -integer
		if ( x >= TWO52 ) {
			return PINF;
		}
		t = sinpi( x );
		if ( t === 0.0 ) {
			return PINF;
		}
		nadj = ln( PI / abs( t*x ) );
	}
	// If x equals 1 or 2, return 0
	if ( x === 1.0 || x === 2.0 ) {
		return 0.0;
	}
	// If x < 2, use lgamma(x) = lgamma(x+1) - log(x)
	if ( x < 2.0 ) {
		if ( x <= 0.9 ) {
			r = -ln( x );

			// 0.7316 <= x <=  0.9
			if ( x >= ( YMIN - 1.0 + 0.27 ) ) {
				y = 1.0 - x;
				flg = 0;
			}
			// 0.2316 <= x < 0.7316
			else if ( x >= (YMIN - 1.0 - 0.27) ) {
				y = x - (TC - 1.0);
				flg = 1;
			}
			// 0 < x < 0.2316
			else {
				y = x;
				flg = 2;
			}
		} else {
			r = 0.0;

			// 1.7316 <= x < 2
			if ( x >= (YMIN + 0.27) ) {
				y = 2.0 - x;
				flg = 0;
			}
			// 1.2316 <= x < 1.7316
			else if ( x >= (YMIN - 0.27) ) {
				y = x - TC;
				flg = 1;
			}
			// 0.9 < x < 1.2316
			else {
				y = x - 1.0;
				flg = 2;
			}
		}
		switch ( flg ) { // eslint-disable-line default-case
		case 0:
			z = y * y;
			p1 = A1C + (z*polyvalA1( z ));
			p2 = z * (A2C + (z*polyvalA2( z )));
			p = (y*p1) + p2;
			r += ( p - (0.5*y) );
			break;
		case 1:
			z = y * y;
			w = z * y;
			p1 = T1C + (w*polyvalT1( w ));
			p2 = T2C + (w*polyvalT2( w ));
			p3 = T3C + (w*polyvalT3( w ));
			p = (z*p1) - (TT - (w*(p2+(y*p3))));
			r += ( TF + p );
			break;
		case 2:
			p1 = y * (UC + (y*polyvalU( y )));
			p2 = VC + (y*polyvalV( y ));
			r += (-0.5*y) + (p1/p2);
			break;
		}
	}
	// 2 <= x < 8
	else if ( x < 8.0 ) {
		flg = trunc( x );
		y = x - flg;
		p = y * (SC + (y*polyvalS( y )));
		q = RC + (y*polyvalR( y ));
		r = (0.5*y) + (p/q);
		z = 1.0; // gammaln(1+s) = ln(s) + gammaln(s)
		switch ( flg ) { // eslint-disable-line default-case
		case 7:
			z *= y + 6.0;

			/* falls through */
		case 6:
			z *= y + 5.0;

			/* falls through */
		case 5:
			z *= y + 4.0;

			/* falls through */
		case 4:
			z *= y + 3.0;

			/* falls through */
		case 3:
			z *= y + 2.0;
			r += ln( z );
		}
	}
	// 8 <= x < 2**58
	else if ( x < TWO58 ) {
		t = ln( x );
		z = 1.0 / x;
		y = z * z;
		w = WC + (z*polyvalW( y ));
		r = ((x-0.5)*(t-1.0)) + w;
	}
	// 2**58 <= x <= Inf
	else {
		r = x * ( ln(x)-1.0 );
	}
	if ( isNegative ) {
		r = nadj - r;
	}
	return r;
}


// EXPORTS //

module.exports = gammaln;

},{"./polyval_a1.js":153,"./polyval_a2.js":154,"./polyval_r.js":155,"./polyval_s.js":156,"./polyval_t1.js":157,"./polyval_t2.js":158,"./polyval_t3.js":159,"./polyval_u.js":160,"./polyval_v.js":161,"./polyval_w.js":162,"@stdlib/constants/float64/pi":64,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-infinite":75,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/ln":171,"@stdlib/math/base/special/sinpi":203,"@stdlib/math/base/special/trunc":207}],152:[function(require,module,exports){
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
* Evaluate the natural logarithm of the gamma function.
*
* @module @stdlib/math/base/special/gammaln
*
* @example
* var gammaln = require( '@stdlib/math/base/special/gammaln' );
*
* var v = gammaln( 1.0 );
* // returns 0.0
*
* v = gammaln( 2.0 );
* // returns 0.0
*
* v = gammaln( 4.0 );
* // returns ~1.792
*
* v = gammaln( -0.5 );
* // returns ~1.266
*
* v = gammaln( 0.5 );
* // returns ~0.572
*
* v = gammaln( 0.0 );
* // returns Infinity
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":151}],153:[function(require,module,exports){
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
		return 0.06735230105312927;
	}
	return 0.06735230105312927 + (x * (0.007385550860814029 + (x * (0.0011927076318336207 + (x * (0.00022086279071390839 + (x * 0.000025214456545125733))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],154:[function(require,module,exports){
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
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],155:[function(require,module,exports){
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
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],156:[function(require,module,exports){
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
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],157:[function(require,module,exports){
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
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],158:[function(require,module,exports){
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
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],159:[function(require,module,exports){
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
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],160:[function(require,module,exports){
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],161:[function(require,module,exports){
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
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],162:[function(require,module,exports){
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
		return 0.08333333333333297;
	}
	return 0.08333333333333297 + (x * (-0.0027777777772877554 + (x * (0.0007936505586430196 + (x * (-0.00059518755745034 + (x * (0.0008363399189962821 + (x * -0.0016309293409657527))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],163:[function(require,module,exports){
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

},{"./kernel_cos.js":164}],164:[function(require,module,exports){
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

},{"./polyval_c13.js":165,"./polyval_c46.js":166}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"./kernel_sin.js":168}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{"./main.js":170}],170:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":52,"@stdlib/constants/float64/max-base2-exponent":58,"@stdlib/constants/float64/max-base2-exponent-subnormal":57,"@stdlib/constants/float64/min-base2-exponent-subnormal":61,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-infinite":75,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/copysign":91,"@stdlib/number/float64/base/exponent":220,"@stdlib/number/float64/base/from-words":222,"@stdlib/number/float64/base/normalize":231,"@stdlib/number/float64/base/to-words":240}],171:[function(require,module,exports){
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
* Evaluate the natural logarithm.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":172}],172:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c}. The implementation follows the original, but has been modified for JavaScript.
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
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


// MAIN //

/**
* Evaluates the natural logarithm.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":173,"./polyval_q.js":174,"@stdlib/constants/float64/exponent-bias":52,"@stdlib/constants/float64/ninf":63,"@stdlib/math/base/assert/is-nan":79,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/set-high-word":235}],173:[function(require,module,exports){
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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],174:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],175:[function(require,module,exports){
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
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns -Infinity
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":176}],176:[function(require,module,exports){
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_log1p.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
*
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns -Infinity
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":177,"@stdlib/constants/float64/exponent-bias":52,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/set-high-word":235}],177:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],178:[function(require,module,exports){
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
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":179}],179:[function(require,module,exports){
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

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/assert/is-positive-zero":85}],180:[function(require,module,exports){
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
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":181}],181:[function(require,module,exports){
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

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = min;

},{"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/assert/is-negative-zero":81}],182:[function(require,module,exports){
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
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( 3.141592653589793, 5.0 );
* // returns ~306.0197
*
* v = pow( 3.141592653589793, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":188}],183:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyvalL = require( './polyval_l.js' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000|0; // asm type annotation

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000|0; // asm type annotation

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = log2ax( [ 0.0, 0.0 ], 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( out, ax, ahx ) {
	var tmp;
	var ss; // `hs + ls`
	var s2; // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp; // `BP` constant
	var dp; // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0|0; // asm type annotation

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53|0; // asm type annotation
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += ((ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK)|0; // asm type annotation

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0)|0; // asm type annotation

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1|0; // asm type annotation
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = log2ax;

},{"./polyval_l.js":185,"@stdlib/constants/float64/exponent-bias":52,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/set-high-word":235,"@stdlib/number/float64/base/set-low-word":237}],184:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = logx( [ 0.0, 0.0 ], 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( out, ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = logx;

},{"./polyval_w.js":187,"@stdlib/number/float64/base/set-low-word":237}],185:[function(require,module,exports){
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
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],186:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],187:[function(require,module,exports){
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25)));
}


// EXPORTS //

module.exports = evalpoly;

},{}],188:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000|0; // asm type annotation

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000|0; // asm type annotation

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00|0; // asm type annotation

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00>>>0; // asm type annotation

var HIGH_NUM_NONSIGN_BITS = 31|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* 1.  Let \\(x = 2^n (1+f)\\).
*
* 2.  Compute \\(\operatorname{log2}(x)\\) as
*
*     ```tex
*     \operatorname{log2}(x) = w_1 + w_2
*     ```
*
*     where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3.  Compute
*
*     ```tex
*     y \cdot \operatorname{log2}(x) = n + y^\prime
*     ```
*
*     by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4.  Return
*
*     ```tex
*     x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
* ## Notes
*
* -   \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) **always** returns the correct integer, provided the value is representable.
* -   The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( 3.141592653589793, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( 3.141592653589793, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	toWords( WORDS, y );
	hy = WORDS[ 0 ];
	ly = WORDS[ 1 ];

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];
	lx = WORDS[ 1 ];

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// `pow( 1/x, -y )`
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// Signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK)|0; // asm type annotation
	ahy = (hy & ABS_MASK)|0; // asm type annotation

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// Signal overflow...
				return sx * HUGE * HUGE;
			}
			// Signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// Signal overflow...
				return sx * HUGE * HUGE;
			}
			// Signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( LOG_WORKSPACE, ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( LOG_WORKSPACE, ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	toWords( WORDS, z );
	j = uint32ToInt32( WORDS[0] );
	i = uint32ToInt32( WORDS[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// Signal overflow...
			return sx * HUGE * HUGE;
		}
		if ( (lp+OVT) > (z-hp) ) {
			// Signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":183,"./logx.js":184,"./pow2.js":189,"./x_is_zero.js":190,"./y_is_huge.js":191,"./y_is_infinite.js":192,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-infinite":75,"@stdlib/math/base/assert/is-integer":77,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/assert/is-odd":83,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/sqrt":205,"@stdlib/number/float64/base/set-low-word":237,"@stdlib/number/float64/base/to-words":240,"@stdlib/number/uint32/base/to-int32":244}],189:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/constants/float64/ln-two' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns ~0.79
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK)|0; // asm type annotation
	k = ((i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = (j + (HIGH_MIN_NORMAL_EXP>>(k+1)))>>>0; // asm type annotation
		k = (((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)))>>>0; // asm type annotation
		t = setHighWord( 0.0, tmp );
		n = (((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >> (HIGH_NUM_SIGNIFICAND_BITS-k))>>>0; // eslint-disable-line max-len
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS)>>>0; // asm type annotation

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
}


// EXPORTS //

module.exports = pow2;

},{"./polyval_p.js":186,"@stdlib/constants/float64/exponent-bias":52,"@stdlib/constants/float64/ln-two":56,"@stdlib/math/base/special/ldexp":169,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/set-high-word":235,"@stdlib/number/float64/base/set-low-word":237,"@stdlib/number/uint32/base/to-int32":244}],190:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns -Infinity
*
* @example
* var v = pow( 0.0, -9 );
* // returns Infinity
*
* @example
* var v = pow( -0.0, 9 );
* // returns 0.0
*
* @example
* var v = pow( 0.0, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 0.0, Infinity );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-odd":83,"@stdlib/math/base/special/copysign":91}],191:[function(require,module,exports){
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Infinity
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":226}],192:[function(require,module,exports){
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

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Infinity );
* // returns NaN
*
* @example
* var v = pow( -1.0, -Infinity  );
* // returns NaN
*
* @example
* var v = pow( 1.0, Infinity );
* // returns 1.0
*
* @example
* var v = pow( 1.0, -Infinity  );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Infinity );
* // returns 0.0
*
* @example
* var v = pow( 0.5, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 1.5, -Infinity  );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Infinity );
* // returns Infinity
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/special/abs":87}],193:[function(require,module,exports){
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
* Evaluate `bˣ - 1`.
*
* @module @stdlib/math/base/special/powm1
*
* @example
* var powm1 = require( '@stdlib/math/base/special/powm1' );
*
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* y = powm1( 3.141592653589793, 5.0 );
* // returns ~305.0197
*
* y = powm1( NaN, 3.0 );
* // returns NaN
*
* y = powm1( 5.0, NaN );
* // returns NaN
*/

// MODULES //

var powm1 = require( './powm1.js' );


// EXPORTS //

module.exports = powm1;

},{"./powm1.js":194}],194:[function(require,module,exports){
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/powm1.hpp}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var ln = require( '@stdlib/math/base/special/ln' );
var pow = require( '@stdlib/math/base/special/pow' );
var trunc = require( '@stdlib/math/base/special/trunc' );


// MAIN //

/**
* Evaluates `bˣ - 1`.
*
* @param {number} b - base
* @param {number} x - exponent
* @returns {number} function value
*
* @example
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* @example
* var y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* @example
* var y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* @example
* var y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( 3.141592653589793, 5.0 );
* // returns ~305.0197
*
* @example
* var y = powm1( NaN, 3.0 );
* // returns NaN
*
* @example
* var y = powm1( 5.0, NaN );
* // returns NaN
*/
function powm1( b, x ) {
	var y;
	if (
		isnan( b ) ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		// Any number raised to zero (including 0) is always 1 => b^0 - 1 = 0
		return 0.0;
	}
	if ( b === 0.0 ) {
		// Zero raised to any number (except 0) is always zero => 0^x - 1 = -1
		return -1.0;
	}
	if ( b < 0.0 && x%2.0 === 0 ) {
		// If `x` is even, recognize that `(-b)**x == (b)**x`...
		b = -b;
	}
	if ( b > 0.0 ) {
		if (
			abs( x*(b-1.0) ) < 0.5 ||
			abs( x ) < 0.2
		) {
			// No good/quick approximation for ln(b)*x, so we have to evaluate...
			y = ln( b ) * x;
			if ( y < 0.5 ) {
				return expm1( y );
			}
		}
	} else if ( trunc( x ) !== x ) {
		// Exponentiation would yield a complex result...
		return NaN;
	}
	return pow( b, x ) - 1.0;
}


// EXPORTS //

module.exports = powm1;

},{"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/expm1":110,"@stdlib/math/base/special/ln":171,"@stdlib/math/base/special/pow":182,"@stdlib/math/base/special/trunc":207}],195:[function(require,module,exports){
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

},{"./rempio2.js":197}],196:[function(require,module,exports){
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":112,"@stdlib/math/base/special/ldexp":169}],197:[function(require,module,exports){
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

},{"./kernel_rempio2.js":196,"./rempio2_medium.js":198,"@stdlib/number/float64/base/from-words":222,"@stdlib/number/float64/base/get-high-word":226,"@stdlib/number/float64/base/get-low-word":228}],198:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":199,"@stdlib/number/float64/base/get-high-word":226}],199:[function(require,module,exports){
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

},{"./round.js":200}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{"./sin.js":202}],202:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":163,"@stdlib/math/base/special/kernel-sin":167,"@stdlib/math/base/special/rempio2":195,"@stdlib/number/float64/base/get-high-word":226}],203:[function(require,module,exports){
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

},{"./sinpi.js":204}],204:[function(require,module,exports){
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

},{"@stdlib/constants/float64/pi":64,"@stdlib/math/base/assert/is-infinite":75,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/copysign":91,"@stdlib/math/base/special/cos":94,"@stdlib/math/base/special/sin":201}],205:[function(require,module,exports){
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
* Compute the principal square root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var sqrt = require( './main.js' );


// EXPORTS //

module.exports = sqrt;

},{"./main.js":206}],206:[function(require,module,exports){
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
* Compute the principal square root of a double-precision floating-point number.
*
* @type {Function}
* @param {number} x - input value
* @returns {number} principal square root
*
* @example
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/
var sqrt = Math.sqrt; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = sqrt;

},{}],207:[function(require,module,exports){
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
* Round a double-precision floating-point number toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
*/

// MODULES //

var trunc = require( './main.js' );


// EXPORTS //

module.exports = trunc;

},{"./main.js":208}],208:[function(require,module,exports){
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

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a double-precision floating-point number toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":89,"@stdlib/math/base/special/floor":112}],209:[function(require,module,exports){
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

var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/constants/float32/smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates a continued fraction expansion.
*
* ```text
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var delta;
	var a0;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0 ) {
		f = FLOAT32_SMALLEST_NORMAL;
	}
	C = f;
	D = 0.0;

	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = FLOAT32_SMALLEST_NORMAL;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = FLOAT32_SMALLEST_NORMAL;
			}
			D = 1.0 / D;
			delta = C * D;
			f *= delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus

	return a0 / f;
}

/**
* Evaluates a continued fraction expansion.
*
* ```text
*      b0 +   a1
*      ---------------
*      b1 +   a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var delta;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = FLOAT32_SMALLEST_NORMAL;
	}
	C = f;
	D = 0.0;
	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = FLOAT32_SMALLEST_NORMAL;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = FLOAT32_SMALLEST_NORMAL;
			}
			D = 1.0 / D;
			delta = C * D;
			f *= delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	return f;
}


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* ## References
*
* -   Lentz, William J. 1976. "Generating bessel functions in Mie scattering calculations using continued fractions." _Applied Optics_ 15 (3): 668–71. doi:[10.1364/AO.15.000668](https://doi.org/10.1364/AO.15.000668).
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator();
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || EPS;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
}


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/constants/float32/smallest-normal":48,"@stdlib/constants/float64/eps":50,"@stdlib/math/base/special/abs":87}],210:[function(require,module,exports){
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

var abs = require( '@stdlib/math/base/special/abs' );
var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/constants/float32/smallest-normal' );
var EPS = require( '@stdlib/constants/float64/eps' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates a continued fraction expansion.
*
* ```text
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var isgenerator;
	var delta;
	var a0;
	var f;
	var C;
	var D;
	var v;

	isgenerator = typeof gen.next === 'function';
	v = ( isgenerator ) ? gen.next().value : gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0.0 ) {
		f = FLOAT32_SMALLEST_NORMAL;
	}
	C = f;
	D = 0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = FLOAT32_SMALLEST_NORMAL;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = FLOAT32_SMALLEST_NORMAL;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = FLOAT32_SMALLEST_NORMAL;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = FLOAT32_SMALLEST_NORMAL;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return a0 / f;
}

/**
* Evaluates a continued fraction expansion.
*
* ```text
*      b0 +    a1
*      ---------------
*      b1 +     a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var isgenerator;
	var delta;
	var f;
	var C;
	var D;
	var v;

	isgenerator = typeof gen.next === 'function';
	v = ( isgenerator ) ? gen.next().value : gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = FLOAT32_SMALLEST_NORMAL;
	}
	C = f;
	D = 0.0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = FLOAT32_SMALLEST_NORMAL;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = FLOAT32_SMALLEST_NORMAL;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = FLOAT32_SMALLEST_NORMAL;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = FLOAT32_SMALLEST_NORMAL;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return f;
}


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* ## References
*
* -   Lentz, William J. 1976. "Generating bessel functions in Mie scattering calculations using continued fractions." _Applied Optics_ 15 (3): 668–71. doi:[10.1364/AO.15.000668](https://doi.org/10.1364/AO.15.000668).
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator();
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function* generator() {
*    var i = 0;
*    while ( true ) {
*        i++;
*        yield [ i, i ];
*    }
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	maxIter = opts.maxIter || MAX_ITER;
	eps = opts.tolerance || EPS;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
}


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/constants/float32/smallest-normal":48,"@stdlib/constants/float64/eps":50,"@stdlib/math/base/special/abs":87}],211:[function(require,module,exports){
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
* Calculate a continued fraction approximation.
*
* @module @stdlib/math/base/tools/continued-fraction
*
* @example
* var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
*
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/

// MODULES //

var hasGeneratorSupport = require( '@stdlib/assert/has-generator-support' );
var generator = require( './generators.js' );
var basic = require( './basic.js' );


// MAIN //

var continuedFraction;
if ( hasGeneratorSupport() ) {
	continuedFraction = generator;
} else {
	continuedFraction = basic;
}


// EXPORTS //

module.exports = continuedFraction;

},{"./basic.js":209,"./generators.js":210,"@stdlib/assert/has-generator-support":20}],212:[function(require,module,exports){
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
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*
* @example
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*/
function evalpoly( c, x ) {
	var p;
	var i;

	i = c.length;
	if ( i < 2 || x === 0.0 ) {
		if ( i === 0 ) {
			return 0.0;
		}
		return c[ 0 ];
	}
	i -= 1;
	p = ( c[ i ] * x ) + c[ i-1 ];
	i -= 2;
	while ( i >= 0 ) {
		p = ( p * x ) + c[ i ];
		i -= 1;
	}
	return p;
}


// EXPORTS //

module.exports = evalpoly;

},{}],213:[function(require,module,exports){
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

var evalpoly = require( './evalpoly.js' );


// MAIN //

/**
* Generates a function for evaluating a polynomial.
*
* ## Notes
*
* -   The compiled function uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: http://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a polynomial
*
* @example
* var polyval = factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/
function factory( c ) {
	var f;
	var n;
	var m;
	var i;

	// Avoid exceeding the maximum stack size on V8 :(. Note that the choice of `500` was empirically determined...
	if ( c.length > 500 ) {
		return polyval;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalpoly(x){';

	// Create the function body...
	n = c.length;

	// If no coefficients, the function always returns 0...
	if ( n === 0 ) {
		f += 'return 0.0;';
	}
	// If only one coefficient, the function always returns that coefficient...
	else if ( n === 1 ) {
		f += 'return ' + c[ 0 ] + ';';
	}
	// If more than one coefficient, apply Horner's method...
	else {
		// If `x == 0`, return the first coefficient...
		f += 'if(x===0.0){return ' + c[ 0 ] + ';}';

		// Otherwise, evaluate the polynomial...
		f += 'return ' + c[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += c[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalpoly.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	*    function evalpoly( x ) {
	*        if ( x === 0.0 ) {
	*            return c[ 0 ];
	*        }
	*        return c[0]+x*(c[1]+x*(c[2]+x*(c[3]+...+x*(c[n-2]+x*c[n-1]))));
	*    }
	*/

	/**
	* Evaluates a polynomial.
	*
	* @private
	* @param {number} x - value at which to evaluate a polynomial
	* @returns {number} evaluated polynomial
	*/
	function polyval( x ) {
		return evalpoly( c, x );
	}
}


// EXPORTS //

module.exports = factory;

},{"./evalpoly.js":212}],214:[function(require,module,exports){
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
* Evaluate a polynomial.
*
* @module @stdlib/math/base/tools/evalpoly
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var evalpoly = require( './evalpoly.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalpoly, 'factory', factory );


// EXPORTS //

module.exports = evalpoly;

},{"./evalpoly.js":212,"./factory.js":213,"@stdlib/utils/define-nonenumerable-read-only-property":273}],215:[function(require,module,exports){
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

var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10.0
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/
function sumSeries( generator, options ) {
	var tolerance;
	var nextTerm;
	var counter;
	var result;
	var opts;

	opts = {};

	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || EPS;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	// Repeatedly call function...
	do {
		nextTerm = generator();
		result += nextTerm;
	}
	while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus

	return result;
}


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/constants/float64/eps":50,"@stdlib/math/base/special/abs":87}],216:[function(require,module,exports){
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

var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesGenerator( 0.9 );
* var out = sumSeries( gen );
* // returns 10.0
*
* function* geometricSeriesGenerator( x ) {
*     var exponent = 0;
*     while ( true ) {
*         yield Math.pow( x, exponent );
*         exponent += 1;
*     }
* }
*/
function sumSeries( generator, options ) {
	var isgenerator;
	var tolerance;
	var nextTerm;
	var counter;
	var result;
	var opts;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || EPS;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( nextTerm of generator ) {
			result += nextTerm;
			if (
				abs(tolerance * result) >= abs(nextTerm) ||
				--counter === 0 // eslint-disable-line no-plusplus
			) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			nextTerm = generator();
			result += nextTerm;
		}
		while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus
	}
	return result;
}


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/constants/float64/eps":50,"@stdlib/math/base/special/abs":87}],217:[function(require,module,exports){
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
* Sum the elements of the series given by the supplied function.
*
* @module @stdlib/math/base/tools/sum-series
*
* @example
* var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
*
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/

// MODULES //

var hasGeneratorSupport = require( '@stdlib/assert/has-generator-support' );
var generator = require( './generators.js' );
var basic = require( './basic.js' );


// MAIN //

var sumSeries;
if ( hasGeneratorSupport() ) {
	sumSeries = generator;
} else {
	sumSeries = basic;
}


// EXPORTS //

module.exports = sumSeries;

},{"./basic.js":215,"./generators.js":216,"@stdlib/assert/has-generator-support":20}],218:[function(require,module,exports){
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

},{"./number.js":219}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{"./main.js":221}],221:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":52,"@stdlib/constants/float64/high-word-exponent-mask":55,"@stdlib/number/float64/base/get-high-word":226}],222:[function(require,module,exports){
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

},{"./main.js":224}],223:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":40}],224:[function(require,module,exports){
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

},{"./indices.js":223,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],225:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":40}],226:[function(require,module,exports){
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

},{"./main.js":227}],227:[function(require,module,exports){
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

},{"./high.js":225,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],228:[function(require,module,exports){
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

},{"./main.js":230}],229:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":40}],230:[function(require,module,exports){
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

},{"./low.js":229,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],231:[function(require,module,exports){
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

},{"./main.js":232}],232:[function(require,module,exports){
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

},{"./normalize.js":233}],233:[function(require,module,exports){
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

},{"@stdlib/constants/float64/smallest-normal":66,"@stdlib/math/base/assert/is-infinite":75,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/abs":87}],234:[function(require,module,exports){
arguments[4][225][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":40,"dup":225}],235:[function(require,module,exports){
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
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './main.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./main.js":236}],236:[function(require,module,exports){
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
* Sets the more significant 32 bits of a double-precision floating-point number.
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
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":234,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],237:[function(require,module,exports){
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

},{"./main.js":239}],238:[function(require,module,exports){
arguments[4][229][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":40,"dup":229}],239:[function(require,module,exports){
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

},{"./low.js":238,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],240:[function(require,module,exports){
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

},{"./main.js":242}],241:[function(require,module,exports){
arguments[4][223][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":40,"dup":223}],242:[function(require,module,exports){
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

},{"./to_words.js":243}],243:[function(require,module,exports){
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

},{"./indices.js":241,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],244:[function(require,module,exports){
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
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/number/uint32/base/to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './main.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./main.js":245}],245:[function(require,module,exports){
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
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
}


// EXPORTS //

module.exports = uint32ToInt32;

},{}],246:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":79}],247:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":79,"@stdlib/utils/constant-function":272}],248:[function(require,module,exports){
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

},{"./cdf.js":246,"./factory.js":247,"@stdlib/utils/define-nonenumerable-read-only-property":273}],249:[function(require,module,exports){
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

var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Poisson distribution with mean parameter `lambda` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} lambda - mean parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 0.5 );
* // returns ~0.986
*
* @example
* var y = cdf( 2.0, 10.0 );
* // returns ~0.003
*
* @example
* var y = cdf( -1.0, 4.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*
* @example
* // Negative mean parameter:
* var y = cdf( 2.0, -1.0 );
* // returns NaN
*/
function cdf( x, lambda ) {
	if ( isnan( x ) || isnan( lambda ) || lambda < 0.0 ) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return 0.0;
	}
	if ( lambda === 0.0 ) {
		return 1.0;
	}
	if ( x === PINF ) {
		return 1.0;
	}
	return gammainc( lambda, floor( x ) + 1.0, true, true );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/floor":112,"@stdlib/math/base/special/gammainc":134}],250:[function(require,module,exports){
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
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Poisson distribution with mean parameter `lambda`.
*
* @param {NonNegativeNumber} lambda - mean parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 5.0 );
* var y = cdf( 3.0 );
* // returns ~0.265
*
* y = cdf( 8.0 );
* // returns ~0.932
*/
function factory( lambda ) {
	if ( isnan( lambda ) || lambda < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( lambda === 0.0 ) {
		return degenerate( 0.0 );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Poisson distribution.
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
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 ) {
			return 0.0;
		}
		if ( x === PINF ) {
			return 1.0;
		}
		return gammainc( lambda, floor( x ) + 1.0, true, true );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/floor":112,"@stdlib/math/base/special/gammainc":134,"@stdlib/stats/base/dists/degenerate/cdf":248,"@stdlib/utils/constant-function":272}],251:[function(require,module,exports){
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
* Poisson distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/poisson/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/poisson/cdf' );
*
* var y = cdf( 2.0, 0.5 );
* // returns ~0.986
*
* y = cdf( 2.0, 10.0 );
* // returns ~0.003
*
* y = cdf( -1.0, 4.0 );
* // returns 0.0
*
* var mycdf = cdf.factory( 5.0 );
* y = mycdf( 3.0 );
* // returns ~0.265
*
* y = mycdf( 8.0 );
* // returns ~0.932
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":249,"./factory.js":250,"@stdlib/utils/define-nonenumerable-read-only-property":273}],252:[function(require,module,exports){
module.exports={"expected":[0.0005293434495124466,1.0,0.9999999999999998,0.9606333303492124,1.9135708318616185e-5,2.428129610469441e-13,0.9999661047568467,0.5846963205863417,8.789350603096669e-9,0.08024731367698544,0.3206792775463955,0.020229887154622192,0.9999977870894662,0.2859843342003196,0.0014314878261448116,2.0695658872701618e-5,0.7218966853660879,1.0,0.07796444719818013,3.09031676689003e-5,0.024647273885029988,0.18833697290855594,0.9718841101204975,0.29024719213116784,0.0008360185340998274,0.021025731966605322,0.0025490154080603884,0.3095030971602576,1.8188742226792156e-16,2.217981980648786e-5,7.866531908851147e-13,1.0,4.4910715403747075e-13,0.07890954665463537,0.017407170905930587,2.636808825551526e-7,1.0,0.9941759610119637,4.173187695457422e-8,0.04041992721279048,3.849514174897676e-12,0.9999881589056148,1.6621426326801184e-10,0.5183828080407198,8.856165592255194e-15,0.006272464006452403,0.12083582898320407,0.08870374850452607,0.9118508693708972,0.9999733027089183,2.5371825893355303e-10,5.421560894266746e-7,0.038724380513371646,6.3728420907687654e-21,0.04678314592112764,0.03759856612197793,6.044747376226255e-6,5.864312046853341e-6,8.824184599198714e-10,0.999999975557197,0.9999117831070781,3.837463893096041e-11,1.8071335762067415e-7,0.010149901137777265,0.12795656393935217,0.7151633424243444,0.0011887248002171017,0.9865086489516547,0.9999966102939227,0.5821432548022548,0.9999729364872053,1.2633009344680167e-10,1.4032558687690666e-13,1.7442200111987552e-10,0.0011318968452526104,1.0,0.3174096754532068,0.3923557640731575,0.22196348582158043,0.032571065396918134,1.0,0.9999999993148536,0.09249498925404522,0.45467470369013246,0.737808282728251,0.35462930052721653,0.11763587208592179,0.9999942309695152,0.9999970227443216,0.021567946897864308,0.9878430207066877,1.0,0.9261959587091091,0.48377676066751163,0.8102087020493463,0.3145506264172641,1.0,1.0,0.985037130538504,2.5255110759900297e-7,0.4511142219453478,0.16162464673823468,0.9269769076330632,0.999998477488348,0.0010236080961824228,0.003717375764153658,0.999999722678624,0.00014182702336234786,3.991481161063674e-11,0.05386776212756509,1.0120433328976929e-14,0.27865440509562533,0.3386436763236196,0.9988433531421982,0.9851635423685138,0.99999989272777,0.999999999995962,1.9519556263872464e-14,3.9911256512876636e-11,0.2013526248741938,3.8897840667583627e-13,0.9980198589703541,0.9999999999989431,0.9999892371486613,1.4066814251897067e-5,0.9968634493909807,1.816980172606892e-5,0.9999347979393427,0.9488622426651744,1.2200822893717576e-13,0.014298371448451754,0.728389844750875,0.004009350339948494,0.9999987241985625,0.9964821811089564,0.031465003221169914,0.000966590208063856,0.9711567504009366,3.322954502963766e-11,0.01943604599256033,4.398857694771302e-6,5.131234312448932e-8,0.04688421979792908,1.7653580420780348e-8,0.999270189772537,0.9999999999965422,0.015179656689728841,2.2898971264157153e-14,0.009799999919521721,0.22490368432666566,0.6957739109740291,1.0,1.0,3.673861857440673e-5,0.6804498219986299,0.02575789252044894,4.796690792249117e-20,4.147012476824724e-10,0.9999999846375403,0.00026496183096005773,0.7488066484626625,8.288661555175787e-5,0.999976949553597,0.0376701809956265,0.8162710183449343,1.8807023758840376e-6,1.0,0.00917287875482833,1.8169326424830694e-6,9.778781682042832e-6,1.0,0.0014835240380124016,9.940918983866719e-5,1.93550834804821e-6,1.2735463691734336e-5,7.079673237951803e-7,0.9915172454664941,0.09901042199031157,0.04067953881822087,1.0,0.9988886302854676,1.0,0.9999988866531032,0.9999999953740335,1.0,0.0010140051262967629,0.36341224744399386,4.123660294279427e-10,0.9999556825863896,1.0239112540403085e-12,0.9990906477750467,0.0011346873644824107,0.7329758490676682,5.236097051720737e-6,0.9999872101509399,0.4518625412030743,0.9894686338138763,0.9999996010077872,0.7144370064861403,0.9606591091022694,0.9983153888306073,0.007608445880855839,2.3380594107157594e-6,0.27844933202352834,0.00044211186239344764,2.526584764434631e-6,2.5666158789484722e-8,0.39286619261429656,1.0515377993869102e-10,1.7016768165521857e-11,0.9984269542882769,2.629985811043214e-6,0.9983516065802437,0.00011659634786140057,0.999997732099576,0.18851383132247437,0.1477589071800293,0.77395308011129,0.9988103391434675,0.5259430021226686,0.9849702759106014,0.6962893882312204,5.13383937822552e-20,2.950059267421607e-5,4.034254031597028e-9,0.019466147306629145,0.9999990525534366,3.5982697618769424e-8,0.9999999999999784,0.26879749893793903,0.041325611015873016,1.0261849313141097e-7,0.595232501684804,0.0009259571690331856,0.953017335762972,0.1507135731335076,0.9999749057778795,0.2893504209806189,0.9980995307018301,1.8729656480469527e-5,6.956334835263738e-10,0.5495988702433581,0.2447701001853423,0.9999978201461865,0.12511384242592868,0.025150728618690634,0.026173817489461213,1.0,1.0,1.7524574805962516e-8,0.16698576255735637,0.004576342842796778,0.9997235319067053,8.923382295912173e-7,0.9500381011480116,0.9923791805631234,0.0035147215458109253,0.13493020223639687,0.0013233168543154699,0.10108981549770311,0.00227158913195352,0.192750504300462,0.9999999999991346,5.030786553610382e-7,0.8680101288195957,0.9999999974309529,0.9999999999999905,0.7466021656861404,5.477462921276759e-9,0.9999937304086941,0.932004359124896,0.5711505326704944,1.0,0.8386785888620107,0.9999375546607333,0.3152836735410855,0.9999999958146747,0.9844533592953889,1.0,0.8922909551515578,0.9998834636339987,0.0008019719040553773,0.06614870096018165,4.758727888532171e-13,0.00019777943584739738,0.058353147324000584,0.9999999999999685,0.00016002365376758165,0.5244662028857023,0.6331743431965242,2.4202919205140684e-6,6.9422902297020375e-6,0.4437118742197236,8.453595108079796e-11,0.8989885590990954,6.103093734994853e-14,0.01401774989128456,1.712605886516528e-7,2.0938350863143733e-16,6.338485655195353e-11,0.33917305973331685,0.000526073730646627,0.9999999999896089,2.978118453735153e-8,1.0,4.606103562839134e-5,0.21029765139977435,0.9999991048594814,0.9975696283603255,0.0004679377124766653,4.93182392367985e-9,0.017450547938219912,0.018338881412708185,1.1029353141094489e-7,0.9999163830001536,0.23300118645489937,0.9999962622201938,1.0,0.0002846238979767494,0.9999999510578069,0.6223058305315399,0.09929905010832672,0.7362507310555799,0.17561021945770797,1.8835154952012133e-5,4.3018108148895166e-13,5.910088798594951e-5,0.999999203317622,0.8837611700101142,0.9999999981538547,0.3000578841675179,2.8900423121246244e-7,1.0,4.864941166648423e-14,0.9999612309398901,0.5781371777420066,5.409507796113835e-5,0.2052610354172254,5.293228799504568e-11,0.9944970566412862,0.9999999994830546,1.0,1.4462973128753584e-10,0.9997183233035654,1.0,3.9525020640851533e-10,0.9999999999644558,0.020682340170227416,0.0042330256896054965,0.9780995220303605,0.46421162641238417,0.0005000950026840484,0.006957328927034917,0.043014541014907946,0.9117611196519967,0.7910379127889835,0.9999999999999896,0.0005765231199340748,0.9595081875136005,9.864400754452789e-7,1.0,0.3206727848708204,0.9999999999999999,0.6507040493822025,0.219093245728734,2.0905251992846396e-7,0.1318915759312421,0.9084902765223278,0.9999999999999999,0.39895403626593495,0.9453335858943694,0.999999890304762,0.791040781240662,1.6160946877264572e-7,1.441956452418146e-16,8.842529579146192e-7,0.9956098331128924,1.933147056236714e-6,5.101192754820022e-10,0.38421680606413966,5.495149562855089e-13,0.9999999999502828,0.9156261497324519,0.9122636751029758,2.0404819778765806e-8,3.376513510516688e-6,0.5954740380952175,3.249560822809197e-5,0.9998392647684221,0.9999924044508013,6.894912984153816e-5,0.9999999955367317,0.0012938791944160678,0.9928792010397143,0.00039459121445197627,1.0,2.0924973638703146e-9,3.842699118621405e-6,0.39655911526639137,2.5579193795680273e-6,0.6759379133070758,1.0,0.13980953690128242,0.0021530545972431865,1.0,0.008252027766136628,0.2335709886327312,0.9929070535628299,5.553465147130819e-10,0.4965165935285835,0.23005770431420947,1.2505810552431412e-6,4.3131745929725686e-5,0.10176720154244778,0.38479837962833213,0.9999998901346312,0.9999999996752181,1.0,0.7330521907425811,0.0007504587418631279,6.655526434028466e-12,1.0,0.001733842699822113,0.9961721677872744,1.4193513701395339e-7,1.391692332297775e-5,0.00013825511531128336,1.5470637999110996e-5,1.0379709105275765e-12,0.00014641928867792746,0.9999782528964583,1.0,0.999999999999999,0.9447238025435005,1.0,7.262665774562315e-17,0.007821213646428146,9.791633975518933e-5,5.389773085572822e-8,1.7848868138569708e-10,0.9999999965701686,0.5631125962363622,9.655056903685364e-5,6.073846783624328e-9,2.441347730842129e-5,0.27614543398852337,0.8608379305868361,0.05084846466900209,0.9944366537249595,0.05372373013384116,0.13806924111054739,0.015550821508758873,8.43856914760474e-5,2.0388836550231527e-7,0.18931173171215698,0.06114012520760557,0.9907677829272502,0.3358258688174373,0.9999999999706933,0.00015962400642551027,1.2539754841451946e-11,0.021475342690468868,0.06844678350629307,0.0025859105343328005,0.1115060591501358,0.07442033606915072,1.0,1.2459168212283086e-6,1.9367763705939345e-14,0.01516735980184932,0.999999996367887,0.9999999999886848,0.9999999999999996,0.9770849684503661,0.06345136609354293,0.9999999955570829,0.04581851348621227,0.8862486771081975,0.5291081082835466,0.5120313138899228,5.179892813760226e-5,0.890782434136017,0.9999999994696603,0.23401767541253862,0.5729259754485252,6.515893819279139e-17,5.115574924546844e-10,0.08263030576179972,0.9479032287943853,0.2780971275927348,0.9999191843770985,0.9171898691677388,1.0,0.9999999372870644,2.0003597141865635e-12,0.99693511241047,0.00030149739088784636,0.9996613159219694,5.119241733268721e-13,1.0,0.9986841030908259,0.949395501062487,0.7418622269287417,0.7951011894385769,0.6623799904606307,0.9999999969910901,0.027020440297861274,0.028677215135220434,0.07803091757696362,7.626439498381422e-5,2.4916541211519007e-5,0.9127791593475352,0.9999999919577065,0.00022392619348717027,0.974340754880914,2.3495291181941472e-6,0.9999973128618856,0.0005508781778481458,9.935016861611857e-8,0.9761346245765904,4.791605931484128e-7,0.22900750980004525,0.7008306888148862,0.9970377912281468,1.0,0.018063805626144003,1.0,5.8014715889018475e-9,6.0425022536828474e-5,0.16227016048744178,0.13926250926579808,1.2608978409527833e-13,0.9999992816050037,0.01882733292888691,2.181560119392011e-8,0.9999999999332649,1.1041005787807211e-5,0.030735775098120293,0.2985354414762559,0.999999999898443,0.9999984239596701,0.3476338150864521,0.9968652030420223,0.9999987646537748,0.00023340935067081776,1.127179229446359e-9,0.07852015504853205,0.99564430758349,3.970097370698482e-5,0.0025400380797814715,0.06238205719638684,4.4449672870847746e-11,1.7361229645450534e-10,0.04335876333325815,0.0018641602036672943,2.8103813562192866e-15,2.0216122486801905e-13,0.8712527849884575,6.360297407929485e-5,0.0004040748536107723,2.709657019763244e-15,0.18284738388104133,0.3101413761965756,0.0009418909209167419,0.9742560894129152,0.9687106606667021,0.6204124495794375,0.9999999995402942,1.3108523126754709e-12,0.9914700835027236,1.3588560486845402e-15,9.065189282721591e-16,0.9713904143016127,1.0683219790082756e-9,0.2141437210010069,0.9827718025222638,0.9541912382907994,0.1203147923680633,0.02450835406215767,0.9999988695124291,2.3177131475089484e-5,0.6240575637260068,0.14187090571928807,1.9732091361165896e-10,0.9999999999997474,0.2267992292429971,0.9744906500015728,0.001191166802335477,0.6600883906434702,3.980595089093721e-6,0.07627425532435426,7.865586924551362e-7,5.014298612488316e-15,0.9999979775668933,0.004027634139777732,0.9999999994449945,0.35596755015218845,0.0023153677282996455,1.0,0.061615706433835585,0.7968612721437001,0.9999999983087303,0.05021117695964984,0.0084171897826399,0.9905371182995608,0.0003560089923172696,0.9858700535739965,0.9808078282300762,9.014169156206962e-15,0.5403839387738318,4.6292256050701974e-8,1.0,0.9988554847590861,0.9999565535945336,0.4274658287204803,0.009331718835660327,0.024252901370690954,0.0034356748632337385,2.9263882570386026e-8,4.1204345768566554e-14,0.9116637981875876,0.4468964850434914,0.9908048192318663,0.018516071894387955,0.005094701952007306,0.47538308650612904,0.999772058343943,2.5804235085058037e-5,0.10183825588287475,0.03026891115313553,0.9995606742624473,0.9999999974264501,0.4332453479117651,0.9999854563665858,4.8822297203594656e-8,0.999999999738282,0.11854327527291093,1.9455536723403694e-8,0.16381363167245128,0.0163788030146614,0.9999999988489219,0.45096468815606183,0.03145661511404457,1.0,4.546249354426484e-5,0.9999332348342472,0.10402530110292373,0.0001269736021266081,0.9999941708412057,0.9999999997214132,0.606737880853034,2.3130812470805158e-6,0.9879486157546563,0.00022218289448316106,0.71342126115823,0.9973463349039174,0.9677109393601369,0.9509070595296264,0.08054129629382162,0.9999999999998016,0.9297825135328484,0.7101414756873228,0.0002983522087207226,0.15464285363049965,0.002750000439049443,0.9999999999914105,0.012535164060952156,0.9999999849341947,0.9696436456212837,0.3062060904195364,9.166058080341e-19,0.870677550081856,0.927070323005599,3.124615172556219e-6,0.055447409789636096,0.947509701644183,0.014554749081242503,0.9535869907475435,7.680363687490957e-6,6.8376856919649524e-15,0.5721239263109985,0.9999999999666003,6.411472378319716e-8,0.9999645593689112,0.20653259911496538,0.9315429451591628,1.7400402779338554e-5,5.290591738801884e-11,3.3223963683935416e-11,0.07487931571459823,0.05441451375263382,0.9999983447118544,0.9999999999999656,0.00971297146689872,1.390303987350991e-11,0.007880435140695162,0.13798664194450244,1.0155272846623033e-12,0.28673016474812635,1.0,0.008039794236360424,7.613021295261634e-7,0.175785472093504,0.0006718333493027494,0.36186742231700775,0.2174435282065273,0.9999995362135203,0.7700368159633388,0.9999999999999875,0.014279581599634886,0.27842559524481064,0.31934567098663574,2.9678206085211765e-11,0.016064009776150818,0.05486075857245896,0.013320972433973727,0.018129075119920367,5.442006345494277e-5,0.009212482485355548,0.20912505701726553,0.5386735242387896,0.999611714547456,1.0,0.5387821811555488,1.0,0.0015313393007540957,0.998924149103806,2.1073632288302085e-7,2.363228312312867e-8,0.6382171608878082,0.13319436105342242,0.9999733227255636,0.03845567394965517,0.11712366712684955,0.26007819644951563,0.9524660803185332,0.3997234573854902,0.9886095990539526,0.9832594008277606,0.005091186270160486,1.0,1.0,0.911542101653392,0.16540899174676996,0.775227286782531,4.490942024227278e-18,0.0077892346588317694,0.2711590433447877,0.9778939927478996,0.11607502172149471,0.031042597594220504,0.9795598174109592,5.877265740244679e-15,2.127187024959169e-6,0.12745934348792862,1.0942945264042871e-11,6.367771046405435e-5,0.1504291583803086,0.027586236024005572,0.9999999573886514,9.866547206760484e-11,0.04597111393536734,0.7242942934323418,2.3385966068128626e-10,0.9999999999988459,0.000519244535980211,9.643530082073599e-9,0.0002456406325100435,0.9905234523156121,0.8126112034510139,0.018059195330018377,0.05130088312249958,0.0004878272483049944,0.9999998881811412,0.2541762631787474,1.0,5.278450543354136e-12,2.289629353983857e-10,0.6101458319903481,0.9999999999992288,0.9596820922496435,3.5096069755641613e-13,0.18201591492314034,0.7909106707979112,0.0006199461366647846,0.999721507487719,0.8125927393393063,0.9860400038921951,0.8516935817567418,0.007944536150000008,0.9999999274346375,0.7726962216339991,0.19977119805342702,0.7000319786953073,2.854096450396235e-7,0.7183940616957301,0.9999999266334602,0.8453393712979701,0.0359500626015032,5.016529619070161e-10,0.033004805058381215,0.9999999999999787,1.0224147866921919e-5,1.1674470917144613e-7,0.9959867780354387,0.9999999873115372,0.9986335589544806,0.16722915691993379,2.6201204748104495e-9,0.19733740004024553,0.08594369803498912,0.5495135995877906,0.9992561924545247,0.00023050447916654222,0.9999999999482511,0.003446304598127297,1.0,0.02755614352741007,0.5113365850496305,0.0727814540038213,0.9999678846647342,0.9954331009433903,5.533964956751709e-5,0.18353410685769986,0.9997700839977864,0.00012545790818186696,0.11816982502504472,0.5537354291085533,1.0561016430145367e-17,1.0,0.25990893745924704,0.999999999788686,1.0,1.034496885843572e-9,0.1989506327502712,0.9999954993378269,0.9972316146977488,0.7240856973270536,0.09274686931866365,0.999999999999975,0.7839901576169559,0.3919594133539465,0.35947309647809295,0.020937908320404236,2.2264834055633168e-6,4.3107677647001796e-11,0.02030493242003082,0.13598383316559573,0.053004950200188944,0.024011662883435755,0.10507510921068713,5.542623755638844e-13,1.6682817982118331e-13,0.9999999999999705,3.9375013415516033e-13,0.0037764487780960116,0.999936020154335,0.9999995028287585,0.07532797357409235,0.0016049851356246243,0.007588834285142192,0.4874880677444166,0.03873593096893059,0.9983930528513004,4.95492943714202e-15,0.6184984807430997,5.93107374746065e-6,0.4287591466416061,0.997145182823062,0.9999999998840159,0.0047250354458151225,0.11506781942223245,0.001086243357161534,0.1521785115712617,0.20607134079346587,1.4749400692059044e-16,0.1475315993804335,0.648553996428669,0.9999999999999999,0.027936425986316,6.560955779254183e-5,0.42673203278083,0.9999999998666147,0.0005206127422836258,0.25529769874047975,0.9963037464936773,0.9465317396817023,0.0044580148000244995,0.9999999999999464,0.008323195050519754,0.07025012578655061,0.04242881460236898,0.9999999999999973,0.9999997885971698,0.008687256427859428,0.5343625083919916,0.9999987629330739,8.75908952481496e-12,1.6357328289613788e-7,0.005595525289554327,0.951772926539962,2.485798799440249e-6,0.4181981478590468,0.0356224987348042,0.9999816589541073,0.9999999968165275,0.0054593805471163,1.7079845217702457e-9,0.04767714103989516,8.444380202523011e-12,0.28937376999462805,0.9999008435785633,0.03891428240793079,0.07088747794758331,6.31113054312993e-11,8.95769820286559e-6,0.9965969967906617,2.714590397957718e-13,0.08808672843470611,0.00012401743778539672,0.9482023016207606,0.9853630637150265,1.0,0.9954476812784177,3.2259695323667815e-5,0.4574816135267504,2.8825529909298e-5,4.6846690348096145e-7,0.9999939068626607,1.0,0.9295149633017352,0.009320335894658242,0.16923911192548657,6.882797226965202e-6,1.607767516022099e-5,0.9999698273375822,0.593606658719722,0.9999999972168578,0.000438413200679829,0.004790039663129232,0.5930071801270622,0.9261307353346507,0.9999950865934882,0.699512095257731,0.9999972762220796,0.000860414444486268,0.008214154589613082,0.0017859126813561108,0.9999999999999174,1.598956952124179e-7,1.9251585776975517e-6,0.9748738166881218,0.7189231441853294,1.6230201742025913e-7,0.7961517949511302,0.9999999999999999,0.1508634078322918,3.5553450635668477e-16,0.00553397110004504,0.9999999999917977,0.9974305216311329,0.9999824632910765,0.12276520365763953,0.0003535690556456081,0.00010438290155087652,0.8520808038256742,0.959746775245526,1.0924954672812418e-17,0.9964301916291104,0.3706478721391206,0.4068379414731451,0.9999999999999913,0.029657844679754353,0.9996849540559005,0.00416356248792528,0.6592891194662427,0.9998819062645236,0.0006392511001798002,0.00012676027283292779,0.9895777344572183,0.27097450814532315,0.9794508550337641,0.6284308430458443,0.9999994002833705,0.9999999999999989,0.0008266300749539496,0.390036259110952,0.9959297314533709,0.1597146790696449,0.9999999589637296,0.5379362649158881,0.8526573038802152,0.0008103544427847897,7.561543352747385e-5,0.00011794481336335656,0.9990454322351258,0.0011359065042087183,5.5479522941556855e-6,1.0,0.9254432014516928],"x":[8.0,37.0,11.0,36.0,12.0,6.0,38.0,38.0,2.0,38.0,19.0,28.0,25.0,9.0,12.0,13.0,38.0,21.0,31.0,10.0,31.0,4.0,39.0,3.0,4.0,31.0,12.0,15.0,4.0,23.0,4.0,27.0,2.0,31.0,7.0,13.0,29.0,16.0,10.0,22.0,5.0,29.0,6.0,22.0,6.0,4.0,11.0,19.0,14.0,23.0,1.0,2.0,18.0,0.0,9.0,23.0,9.0,20.0,8.0,39.0,7.0,5.0,13.0,14.0,39.0,10.0,15.0,5.0,29.0,1.0,22.0,4.0,4.0,6.0,21.0,37.0,28.0,30.0,32.0,13.0,38.0,28.0,32.0,15.0,7.0,32.0,7.0,30.0,13.0,26.0,35.0,39.0,28.0,18.0,29.0,38.0,39.0,32.0,30.0,11.0,22.0,33.0,29.0,38.0,13.0,24.0,26.0,22.0,10.0,7.0,5.0,12.0,40.0,18.0,21.0,22.0,35.0,5.0,11.0,6.0,6.0,36.0,28.0,21.0,21.0,31.0,11.0,11.0,35.0,1.0,31.0,39.0,9.0,25.0,10.0,9.0,28.0,38.0,11.0,11.0,8.0,13.0,34.0,8.0,29.0,39.0,34.0,5.0,9.0,20.0,11.0,33.0,30.0,17.0,17.0,11.0,1.0,4.0,36.0,17.0,9.0,10.0,27.0,9.0,21.0,16.0,27.0,33.0,15.0,7.0,34.0,26.0,1.0,2.0,12.0,7.0,26.0,20.0,9.0,33.0,30.0,34.0,30.0,9.0,39.0,27.0,24.0,6.0,30.0,2.0,9.0,19.0,32.0,12.0,9.0,18.0,22.0,30.0,31.0,38.0,33.0,8.0,3.0,34.0,20.0,14.0,14.0,32.0,8.0,2.0,28.0,12.0,14.0,13.0,16.0,12.0,37.0,9.0,17.0,2.0,36.0,26.0,1.0,12.0,10.0,30.0,40.0,12.0,29.0,16.0,25.0,7.0,16.0,4.0,31.0,13.0,39.0,34.0,10.0,21.0,0.0,12.0,2.0,22.0,28.0,18.0,12.0,32.0,29.0,2.0,9.0,11.0,35.0,9.0,13.0,23.0,14.0,26.0,8.0,25.0,17.0,11.0,28.0,15.0,21.0,37.0,37.0,40.0,7.0,24.0,36.0,24.0,35.0,30.0,33.0,30.0,35.0,34.0,34.0,8.0,12.0,25.0,3.0,4.0,1.0,28.0,31.0,11.0,5.0,15.0,17.0,10.0,23.0,11.0,33.0,0.0,1.0,15.0,2.0,3.0,27.0,19.0,37.0,13.0,39.0,1.0,35.0,14.0,35.0,19.0,14.0,33.0,25.0,12.0,31.0,6.0,31.0,37.0,24.0,27.0,37.0,15.0,25.0,15.0,7.0,5.0,9.0,13.0,38.0,25.0,27.0,16.0,37.0,6.0,22.0,4.0,17.0,9.0,10.0,39.0,38.0,24.0,6.0,12.0,31.0,11.0,25.0,2.0,25.0,35.0,39.0,24.0,13.0,12.0,39.0,2.0,25.0,6.0,6.0,13.0,30.0,32.0,25.0,38.0,31.0,6.0,25.0,38.0,22.0,9.0,29.0,26.0,23.0,12.0,3.0,4.0,23.0,12.0,3.0,22.0,2.0,40.0,39.0,9.0,14.0,10.0,16.0,11.0,34.0,26.0,14.0,20.0,16.0,24.0,10.0,38.0,4.0,15.0,17.0,13.0,25.0,38.0,31.0,4.0,32.0,26.0,10.0,38.0,11.0,28.0,26.0,14.0,15.0,27.0,14.0,36.0,23.0,36.0,22.0,17.0,3.0,35.0,6.0,39.0,17.0,17.0,18.0,12.0,7.0,25.0,17.0,35.0,24.0,3.0,33.0,4.0,7.0,13.0,16.0,2.0,31.0,19.0,14.0,1.0,17.0,1.0,33.0,8.0,38.0,12.0,33.0,21.0,22.0,15.0,37.0,6.0,15.0,37.0,38.0,5.0,7.0,14.0,9.0,9.0,21.0,5.0,27.0,15.0,6.0,20.0,6.0,36.0,38.0,16.0,23.0,39.0,8.0,28.0,28.0,28.0,13.0,37.0,31.0,37.0,2.0,1.0,4.0,21.0,19.0,37.0,8.0,24.0,27.0,27.0,1.0,38.0,13.0,28.0,6.0,39.0,37.0,24.0,25.0,35.0,37.0,35.0,17.0,31.0,14.0,14.0,13.0,17.0,34.0,18.0,19.0,9.0,27.0,21.0,14.0,6.0,9.0,13.0,40.0,7.0,38.0,30.0,36.0,1.0,17.0,34.0,27.0,1.0,9.0,18.0,12.0,30.0,4.0,22.0,20.0,27.0,18.0,31.0,10.0,34.0,21.0,12.0,10.0,20.0,2.0,17.0,9.0,10.0,2.0,23.0,27.0,5.0,6.0,33.0,10.0,4.0,2.0,29.0,39.0,20.0,11.0,40.0,32.0,28.0,7.0,30.0,2.0,3.0,38.0,3.0,31.0,38.0,35.0,31.0,17.0,23.0,6.0,23.0,30.0,5.0,40.0,20.0,35.0,18.0,27.0,20.0,10.0,14.0,1.0,28.0,12.0,25.0,31.0,29.0,38.0,15.0,39.0,25.0,15.0,0.0,31.0,21.0,39.0,8.0,3.0,20.0,11.0,30.0,29.0,35.0,23.0,6.0,30.0,4.0,2.0,1.0,26.0,31.0,5.0,9.0,22.0,25.0,36.0,2.0,11.0,11.0,28.0,35.0,19.0,36.0,3.0,36.0,17.0,13.0,38.0,35.0,29.0,27.0,30.0,36.0,3.0,39.0,40.0,2.0,38.0,27.0,18.0,18.0,20.0,12.0,16.0,35.0,21.0,26.0,22.0,22.0,38.0,33.0,20.0,23.0,14.0,15.0,20.0,37.0,27.0,33.0,0.0,31.0,22.0,17.0,15.0,20.0,27.0,21.0,17.0,5.0,37.0,29.0,3.0,29.0,17.0,29.0,16.0,3.0,10.0,30.0,32.0,31.0,22.0,26.0,7.0,18.0,34.0,2.0,15.0,20.0,20.0,10.0,28.0,19.0,25.0,13.0,15.0,4.0,25.0,27.0,27.0,28.0,8.0,3.0,38.0,34.0,33.0,2.0,16.0,27.0,40.0,29.0,38.0,4.0,39.0,5.0,3.0,11.0,14.0,21.0,39.0,26.0,5.0,2.0,38.0,16.0,16.0,38.0,25.0,14.0,28.0,30.0,11.0,17.0,35.0,0.0,14.0,21.0,32.0,23.0,26.0,27.0,1.0,19.0,12.0,10.0,18.0,30.0,34.0,33.0,9.0,14.0,7.0,11.0,24.0,27.0,11.0,11.0,35.0,26.0,14.0,7.0,15.0,14.0,10.0,40.0,8.0,2.0,26.0,40.0,35.0,6.0,39.0,9.0,1.0,35.0,18.0,22.0,17.0,26.0,39.0,26.0,17.0,29.0,3.0,22.0,27.0,21.0,32.0,10.0,25.0,30.0,13.0,0.0,31.0,39.0,30.0,24.0,11.0,38.0,25.0,16.0,35.0,5.0,17.0,25.0,36.0,12.0,23.0,30.0,39.0,18.0,10.0,23.0,2.0,15.0,25.0,4.0,1.0,36.0,15.0,20.0,30.0,2.0,39.0,35.0,28.0,39.0,0.0,30.0,16.0,21.0,38.0,29.0,10.0,1.0,28.0,12.0,29.0,10.0,28.0,2.0,7.0,26.0,7.0,7.0,27.0,14.0,34.0,4.0,20.0,26.0,7.0,19.0,2.0,36.0,16.0,25.0,31.0,18.0,30.0,3.0,22.0,1.0,14.0,2.0,38.0,32.0,34.0,30.0,11.0,16.0,18.0,1.0,15.0,13.0,28.0,25.0,34.0,12.0,22.0,17.0,17.0,26.0,28.0,25.0,35.0,4.0,3.0,18.0,5.0,16.0,34.0,37.0,28.0,16.0,5.0,8.0,23.0,10.0,19.0,18.0,6.0,24.0,11.0,7.0,25.0,8.0,6.0,17.0,20.0,29.0,22.0,28.0,6.0,33.0,15.0,13.0,27.0,21.0,19.0,29.0,21.0,11.0,18.0,12.0,3.0,30.0,20.0,32.0,12.0,10.0,31.0,26.0,26.0,11.0,4.0,9.0,29.0,2.0,12.0,37.0,26.0,11.0,39.0,30.0,9.0,4.0,26.0,27.0,11.0,32.0,13.0,0.0,19.0,35.0,33.0,1.0,23.0,26.0,23.0,30.0,14.0,21.0,16.0,19.0,36.0,16.0,18.0,10.0,32.0,26.0,16.0,38.0,37.0,25.0,24.0,25.0,8.0,22.0,24.0,6.0,24.0,9.0,24.0,15.0,18.0,19.0,29.0,37.0],"lambda":[22.13054900501985,5.392703242097596,0.2581693029126364,27.033086671652875,33.4025907388809,45.51295267791915,18.89100513653662,37.3531016938732,24.32143911274659,48.05579125305158,21.80333750236717,41.068306600471395,8.855186485239008,11.528705524140703,26.40322630660824,34.834736384455375,35.12487546557025,1.578639460418596,40.32913206330656,29.52264794785592,44.044425254872586,6.837516492868434,28.833135614611273,4.826386068253963,15.032340713929083,44.51392569315426,25.379633329044914,17.715845639550587,48.69086813344873,49.41136020287553,39.502127296047775,1.1841682274594478,34.90065432860304,40.28658230791524,15.058274849978748,41.34439263096663,3.4521112917771823,8.385091401626443,38.74511194524174,32.01377350345786,40.07931752737608,12.188756884653662,37.91778872110427,22.449054823763415,49.2916989316137,12.273756277194714,16.126624861519147,26.26120123313501,10.088502737044092,9.049532882337353,25.366906358106846,19.807498636286446,27.356573589250345,46.50224141469871,15.842039522502349,33.398091607543414,30.22972652057243,47.41338644224885,39.96361873088053,14.443359628927288,1.361628429977424,37.45004333327231,41.88601794513019,25.41549745878018,47.25382439489805,8.92228170217514,30.924843496320864,1.908756293835634,11.403753284406449,1.4281812323104215,8.466979894419268,33.8199637631085,41.409703717077505,37.86083355382557,39.121598360173515,4.946327650955773,31.28355820624553,32.20373655990011,37.23659002095998,21.648514041851495,5.8128250672758615,7.146827638388031,40.83323415472611,16.122136382311037,6.044662032872161,34.84305411847942,11.42804832801736,12.336621938804072,2.9646757653863154,38.5045963556579,23.861035587952216,1.3024941647566513,21.60378119775075,18.843763862271288,25.1395173705937,41.74661013675344,6.430443118989437,4.7604307387294265,20.1709149153226,38.042868928883465,23.256733944767515,39.72360830714432,22.444591817021063,16.418220043325682,28.40501038391874,40.43260685562201,8.42055452363023,44.567634334446836,47.72244473052467,13.00571038615368,46.77366412609728,14.868446474219999,43.37727696843869,8.413314317384323,13.06766059959057,6.022508803447801,8.712346535471582,46.039517826482644,49.637994611828404,9.060194081140715,44.97166530656978,21.881411957264728,5.39521498028993,7.409630100031627,47.36747214055059,18.680650978508197,31.904442952682754,2.9709043735234197,26.78490051320881,33.268926925176466,45.61997902944768,35.962980936139566,20.375468833639953,8.584452063699699,4.1173446089743715,16.637706749442426,48.59545788995171,28.041120067107663,49.87160905889537,20.192610454832828,28.965547449357874,43.670721896454786,45.48337516815001,36.20090894756619,15.544117713705031,10.52894908523896,49.01393184193237,45.86085222368552,18.819289637757276,24.291415154976626,10.008808046201134,2.1758761933953097,2.939587542530997,39.90359657945186,15.772234410131613,19.620675039281167,48.38338972528003,32.474050708060155,12.49710271459702,36.45398896294923,7.735885603274784,28.047134551858875,11.389376951467934,16.280771469952636,17.74374728050685,43.21361207383405,3.001987986835164,49.25362120862986,41.70556206407551,26.15253330395888,5.383281889614877,45.065166217908484,11.762800743289537,18.39464203253456,34.02087489425174,29.60990831257284,16.171467424771002,27.075796935021746,16.126321969125712,3.4363442141512768,16.705249279272007,2.335880760618414,11.349308840538953,0.7085903764694534,6.6671850511286435,47.19949017247973,26.441491607401225,36.841519200408925,13.765075963737184,34.027315182118635,2.92273888220812,36.45083823456285,29.243771426326347,35.35226015415358,1.7133003061836294,19.19443533945513,13.393231169376163,10.793503066780719,28.588721240408045,28.745572958135323,19.40340356549338,17.871940074463822,20.366681540748242,38.23921725166767,39.64827980261397,39.627652913014934,46.33769249105657,34.24446347994944,42.58481801564425,31.038526733895132,15.631553425688915,36.36801597473551,6.103865436567268,32.0813659687616,4.21634846965615,16.0702944856714,44.4522918314187,7.521402505054087,7.785116398659908,2.5701729259426265,25.05959878803765,24.104264466160586,48.31405724095256,32.73901570349087,41.82252852568779,43.55414063063181,17.346526865247537,42.45459045644463,4.948343317380122,19.308430920598497,35.48092246348222,32.0809807946165,15.704720399596416,14.89659527537861,23.160712615097477,17.844044298339035,19.303706678808,38.03755937774401,3.7926113950063622,46.86473516079591,21.086198198427553,12.230708813433145,3.9550086004364493,7.207418782445474,35.2655617104562,28.433131430815518,20.864462499531932,3.7927580420294205,2.1128771137517544,23.57133006744383,12.982276743134157,22.93998801936009,18.82302345482836,32.865125573150344,8.462954117340493,13.749466638975683,27.519120367950155,32.771846979723605,20.71998494992965,32.67447831487169,32.395877461556225,14.881220061969913,5.350173987118301,43.651277208241034,16.88145767912873,12.183118453755249,7.854540774232244,36.58222318141087,35.74189526322363,8.826805264034277,28.37087959205261,23.7886095199196,3.812392324423275,25.515974751681327,16.032555345426502,33.40576590418098,11.334031366497266,23.482251845815338,2.931065282188028,5.5242064136158735,3.657118571199325,45.109263224480245,7.328952673676891,40.05931378407024,11.014469853004815,37.89746659568536,5.761752748106352,28.56972118727058,5.526008252283299,14.36168860709104,44.3588581369547,31.6955705660382,24.362082354615033,48.67792464990182,26.802571708598055,30.427395489633156,6.248181514906159,45.252445822971346,42.977070639936784,32.200504319427935,29.904259158763214,37.949967583102186,9.960050342697036,44.43308877764118,6.985423498428201,12.595264729985189,40.69186281580796,3.0719996705519947,21.392714976746152,38.17388305748306,48.65006046980859,47.42230349104546,37.74223316550167,40.90095145845761,14.935242607235466,8.724880295439686,12.670888787762113,2.6218103853389296,45.92559311024929,8.205651015342497,35.788749550603285,21.311746985168146,22.601398776917403,19.646082349423665,25.267351325527663,42.56370942005062,26.968600816626974,2.6415124007232005,31.71495399835894,6.094819312696831,30.514337622314947,46.08229812705077,1.0089589177538771,47.352802940849045,8.672970488522413,4.2602200628442555,39.24459590038046,12.45029164932423,47.36736337279628,25.741958519878473,11.99339721552649,0.5748853881528349,38.082072319934355,4.012256753293886,3.1790896508509303,46.68824150518539,5.036219898665717,7.47290905896979,41.394018550325725,24.95053218492934,40.2352177976967,44.77986846308731,24.857576318254903,19.78258601323265,31.757393097071752,1.5701696137209842,3.477915073680904,18.852369256553814,3.1299698783674113,39.428780997785765,2.657431966116164,35.400157963260156,0.8910225544379813,36.310736389436705,36.228564491174645,29.28269713366457,31.746145015800188,30.973095253774208,2.1141141045360357,10.484544345170733,21.786197532296736,8.023060771103951,19.946737820930572,40.36596831658258,46.251410385820456,23.57837828708189,13.109864838020435,36.81801876160227,29.900099943133817,24.096592370529844,34.68694816502551,12.039065189759368,31.624512140848402,6.054634305415707,46.661946416283506,32.72235382622348,15.702279205759172,31.03083090978396,17.575347871615154,10.09638024732733,34.42840425856177,4.2015921076684615,32.13831898715045,14.419828210961594,25.632307511660947,2.5382578343103757,30.629447840191116,40.54934929730878,18.79143103636679,38.0193206047862,23.426665305365326,5.257312445565743,38.14153382019185,13.760365547323595,3.3246389971858137,41.01979002511244,13.216317759460349,25.361707927283984,46.2463054427556,28.714087633748843,30.661708124301825,40.68776505273887,36.68606934873587,34.89792663375675,15.816388494303757,13.542486515431285,4.770220489384824,2.541987559924075,19.836886708672818,34.53640780376035,34.669064576837435,1.6525269824628208,17.257043992637733,25.162956460685347,48.75041457797745,41.52690043384181,39.03481241691124,33.72613570133494,46.035020801702316,48.60041325991287,5.560117062632508,2.2171518195801543,2.8507083631279517,1.413646022997872,4.43457093446974,49.68832328003911,16.40694662910547,32.365398969957006,48.58211056529972,28.524967782510647,9.172287234594734,18.972507272311525,33.87439143900236,22.05725412824915,40.592060533599806,2.555254176245214,27.767361479846365,14.40118763009992,24.961784287257437,19.277987120772664,40.38205696910403,33.29308684402742,45.54702148758773,44.995116685878166,43.3279930793427,11.473423886835398,8.105911601390902,40.32697896520177,10.824520262870285,18.94854102362543,43.092646169505144,23.82535251548481,15.043794444704384,21.11175360026204,27.837301151614746,9.814916804823714,2.12803754730716,42.28177128682721,48.40238808304562,32.11982118244441,0.2162462711471913,9.514695260348738,7.4848849093432595,9.79784216651719,31.880066077793188,13.543713153113735,14.60730359145761,22.687717439802658,28.278504317197807,28.506319884509455,33.38929788897349,30.61537038487342,8.472917846976424,42.294776307827306,2.3876985940240236,41.00755158749926,32.23563956914239,28.774707147722147,13.32252532449325,41.39265902446224,1.7274879311276137,18.413959534579615,0.6912399494548804,8.307348734710962,30.38399205004245,24.041179688969784,30.508493837855266,14.113104637565133,44.6557451713542,6.2746164010660905,22.102944646452816,17.40496638906066,22.52125450078324,30.972115132834222,35.15587304215282,11.186365297098222,27.03265268651014,43.58883703075623,20.779395384989385,34.26305106565823,34.54494681735598,12.564952173744281,11.09588250768143,38.163077537095106,12.252279713342473,31.541345048731053,10.095799341623268,40.57227861777876,44.40538844503193,2.786499307333268,33.70577884846053,16.592382294272014,37.40186167855367,2.3522656558598753,2.4930020540320563,43.76761746474631,5.493909274740227,22.10521246945295,39.05476066410473,40.79084957172087,33.75916756555738,33.23503160529266,1.2300988716252736,29.12764685706334,43.14197052046595,7.324837267034335,20.526717337526613,32.76088892366042,23.161481742855393,6.131308425951176,5.041153340748783,33.92108592262344,4.053552528161319,13.796712082860019,42.24296504062881,47.13808348912902,15.96723371609945,10.929719427773122,14.988650024131022,32.17312379074322,15.241983497875388,47.587152928279295,28.554677543630014,32.99565259245107,45.828694024728975,48.201925579494755,45.7231667024,27.522411203018414,28.44666356791059,15.988216110735765,40.29066647683608,34.86588600954209,42.86771122019526,38.16177919309231,6.2283808484101755,29.9259204953496,30.94775008398416,7.01961594841054,45.76080532956418,19.292221855234594,41.01563598934174,44.28561165775202,28.023322313408773,29.08042429208596,36.33234905716633,26.972245087460166,26.52507268628257,38.73108417639176,27.265934836291137,7.448836606490772,23.252547474786546,22.164342307528496,36.986916202532306,35.56157134181716,10.113033189631505,24.25955779847654,25.254757358288384,35.01052831634044,25.555096689694302,48.06498828765149,16.03310327355646,41.379598970328416,36.55221521132014,10.518682101021437,24.546363682568728,5.745375002264574,33.78907707120909,47.85498633450638,0.8661861486950251,22.573250334578297,34.66759165553049,6.068441850136786,23.086708060293184,4.777479261467398,20.23855297678966,41.429016543581334,27.414933544142038,3.924232044971454,41.82096272083705,20.210676675142803,40.371903089586525,2.7305983896379837,16.01253313262592,17.07050064050347,24.567072051227235,14.681135403422441,42.9161598560136,13.117894974910005,23.012659715204485,34.3865648895056,20.291796294613327,32.42386772044933,1.7525861966096956,17.654793993441388,37.175571995865695,25.981185434957975,19.336206954629986,15.479766860546807,16.553441913185452,19.285981975349575,14.350573047209291,11.117383624453625,20.421625592645942,16.82582787442879,24.798931622574294,10.676336637805072,23.105322376031502,45.02620264987528,45.07322318229103,49.969778329552305,7.7880645552845795,28.31995302967172,42.14009895017149,4.173717774383501,16.86511661504946,20.219737340687704,49.226498777090846,13.652214221735925,17.414802944373676,6.419148033035304,17.523622427191277,45.95645813406004,12.046139886506458,29.54355725094644,14.475922333463132,21.51238537905884,14.173091200666931,19.021726511064173,30.00106136153797,2.9936726281729165,30.21604836577182,30.55790878804413,40.40231761580495,28.95800039970855,27.986425137848194,1.5115658305190793,32.574196815945434,13.045883898158761,18.94667189842626,36.69059443576227,41.533609444321975,25.733865103935106,16.43745738346023,43.9519828380033,22.839693667117277,14.15502566388348,40.77069684481371,14.764975856022078,42.50174633714522,47.21127963045305,36.56332173245791,6.680512033845842,24.49047331425579,12.950929772631103,21.32933980117612,22.29285742347491,39.66684449354783,32.399069921543465,47.9528984893551,39.34213220698003,42.699894710916055,12.16903846057229,2.7456693721547687,40.60847480890802,42.97001430777626,31.10859483166927,41.47767771218985,34.036034457641264,17.99901660317129,0.8419453587581116,33.60459863183502,34.80576128772008,33.943290395959544,37.478667436572735,27.498133111965394,16.755419297524497,3.3185608008034606,3.2589597545152893,3.5062148533803628,40.82167753563443,30.870649058212162,31.252813462342075,44.126844464126606,9.391520627333193,49.47570584886033,49.394281612289646,47.30993565725804,14.627822245005307,28.20607621405944,32.14179429053677,40.05154634835488,14.929522130464811,3.3202496515014723,4.464880994337905,5.457795079999917,15.857183248401018,0.4372018585752757,38.29375214612105,46.4544920527518,20.064674983640884,47.07957145962126,10.866617213032882,10.958716725051909,5.091881092120676,42.80225251333256,10.758139860799398,17.72495394126381,26.189504507098714,16.356433770344626,26.800554433811673,2.56380316253082,1.1223842523279903,7.6520854413941635,22.069588275900497,31.34313755022029,39.944469189194244,25.954804097515083,24.625113439157364,22.483840557297142,29.958265777914207,37.48434760621448,18.267608185597297,36.38906297925708,47.60539098811463,17.15367614494242,49.34210425920366,40.407075629333434,36.753414791012226,47.20490353025101,11.340333699461013,44.64457441186972,22.08788433072355,6.141395875765299,47.367885549756,3.9424541659951906,48.65662923907804,42.48467997377349,27.88914386962018,23.435187081477704,22.347267906819557,24.202199140463655,13.099157954718965,32.54166429292344,2.5969033085926685,12.971050080122637,0.15464767832815696,46.21397395538769,28.257771799961272,25.250470245266364,10.483561901998872,26.23264547753311,45.089885001758965,45.65778260528132,7.371578850512394,9.761889062830488,18.83060442381276,15.096492991062982,13.75674927655387,13.642409493523665,41.114814403994416,15.065840628294735,22.99389477534769,21.443299624390377,26.90409429769013,22.790927853416786,20.028786919593188,8.372612896080255,17.27896809119639,44.05109139623383,44.51319444896651,36.12892994924841,5.307054205800943,35.92450585615302,15.963276259013604,19.00501924489403,14.087080811590392,16.934318421515414,29.77081703847143,44.21405356366789,44.200237565392065,33.21635173645635,16.165832701193207,19.90966974983197,18.458095307730314,2.2841373951443367,41.87381919465468,1.6385851595269951,20.754999252279216,23.52967068368611,39.44004133016148,19.52727893108104,9.559244475687434,28.65557197770593,28.32538128419865,0.1145444764859449,34.90186730585923,32.136172306767584,4.386699976073283,42.870606691783486,2.2816977822443407,18.35072917464582,3.524377267225609,0.37737394959029835,26.635731024643093,45.22844650606794,15.288563710474289,16.273008815522005,36.03923069184716,2.377881332040943,5.339520167697842,13.66741445850318,22.967525193778314,40.946674839928434,42.15959517631844,33.309760949843934,27.206886136390253,41.0579242589462,16.980996538720582,39.35407085208957,18.4704352596452,35.903360538491356,34.677835622060805,48.17340916196721,3.9689455476406565,47.1708714710524,17.580939944466532,12.098739130072078,2.927720715444704,43.824221806902955,14.159190679746791,33.735845436434076,26.829552148774216,13.627427267920156,9.333671214618011,39.656151394175396,34.87282620507427,41.40401201528564,26.58678894325819,18.559902837871444,2.7241863961951274,47.352599378717564,6.453810995215226,40.528748310118715,3.3537351640631874,18.03074079470296,43.34406303183567,45.54376939276089,30.53729873748472,5.763223604242018,42.49726939756074,29.95882212905263,17.43204964162972,2.7474772222913835,9.954229749745181,18.41348241574069,6.012935477952652,20.887006522474028,41.27210544968404,7.064315440400504,23.177463698201272,30.417662295024062,25.91981436492872,1.2502440148564165,8.301427417197548,43.34122766941907,25.233462464327506,14.408809640433395,36.81839592480607,23.426389546840333,31.850700677410813,2.5889278671544003,42.777960476428035,35.8963855077905,49.83981690864868,11.858712893329926,2.625407182724848,14.01962234473756,39.141906392707895,32.723248277193015,49.664961184705234,22.230137073538003,6.851413102848869,12.291502150740019,32.692138133943736,49.05241277700152,26.270215989673872,14.293711300573797,49.75879950618227,10.780705601668906,37.80554754982184,14.132228033133176,19.332319982126368,1.8711573758281586,16.88360502164764,22.813350974114567,34.29012184904905,37.34570182640206,40.51474061533228,10.560328233782545,1.5470807054294045,13.848565436324945,44.375797891913614,26.4274876125809,33.33918899327689,42.76694374218148,3.190029004720485,3.240091158511793,8.591994708198836,39.664514998019165,49.77652734840714,11.850944005328856,6.622022356374879,12.846765851753883,24.059748647372626,9.528109633063586,25.84138855994884,11.888616038321354,21.721398003811533,5.219070236011492,21.15363568857761,36.82405577058695,26.901581887660775,23.788038908571696,38.65465793272859,34.68201457187734,4.2774345176627815,13.234687863800243,47.9615674503361,42.00540310207362,5.481084610864251,4.537697981930966,14.361101504927042,18.412612476381973,7.947431743344668,40.95383312997186,29.787327442076762,24.525330218054,42.83593601992891,12.884915955809939,28.406962318358275,24.831319362890923,5.126956320334641,23.105971672996372,9.403365586338651,29.85401277240892,17.90531565111767,18.67548598279215,33.45303002654722,39.190188647797456,4.800369070282828,36.27499020733737,17.471534412688115,15.36771316422223,15.781207949731769,7.314358196085835,45.04463827911991,26.078790051725576,14.498211970192132,11.929305928589894,5.699892743424739,24.19801623164902,4.326162083143492,43.77539339989301,26.6064461568947,47.6648282269385,6.376081867928429,35.10338794021873,46.02677400660765,3.2868842946228494,29.498792254189965]}
},{}],253:[function(require,module,exports){
module.exports={"expected":[1.0,0.9997308841834851,5.4934864025724024e-6,0.9604580069405105,1.0,0.06622837586390799,0.15754636146830525,0.9999838644461587,1.0,0.07995878977681782,0.8794437909554602,0.02948651772470737,0.9999999994698453,0.9998651327129089,1.0,0.999871718634839,0.9999652093770127,0.0016135264797832456,1.0,0.012736685865305842,0.5967009864713828,0.01095980429561856,0.44031217271748235,1.0,0.9999999966774901,0.9999961368560338,0.7877823227014704,0.9738130083356005,2.8237187478143494e-5,0.02750541478220794,0.9999999999999946,0.9999992032280688,0.9998664038047258,1.0,0.194422915848188,0.9901898522560583,0.9999999999966667,0.003506944864130512,0.9988484839078612,0.9913825563929975,0.004267859938589251,0.9999972060732754,0.9999999999058253,0.9959924498783077,0.9994378206804844,0.5756247143445761,0.9999999968951161,1.2862196617272532e-5,0.9999998464529556,0.9999972255543721,0.9998543591098659,0.9999969308340709,0.990261557391933,0.2689574350980465,0.9906331080178716,0.6066585086185912,0.9982173434909368,0.9996243305981579,0.09537416324433577,0.9926749149296963,0.3358706850255076,0.9869728994888679,1.0,0.001228742844479131,0.9999774078344655,0.9997839840262337,1.0,0.9985822212237936,0.5951949357230182,0.9999948160861211,0.9999999999999514,0.9991676848825631,0.9999998958116129,0.999999999999988,0.001075900275153977,0.45829290409048473,0.9999890270166736,0.989165197976189,1.0,0.9999917869265385,0.9999621658017848,0.9982973810558677,1.0,0.024046983624746523,0.26343905085263747,0.32031617568605536,0.9999952962695476,0.00023283825643159286,0.9910853168185638,0.9999999999066923,0.9999999999999744,0.9022071281969917,0.9999978513301464,0.9999370989491069,0.999854082772817,0.999998036360196,0.5366528500384916,0.9999999999999887,0.9999999999982122,0.7075258869484653,0.834125495288086,0.14985003167810562,0.7056095161928201,0.99995196670625,0.9999990242852336,0.681726787046846,0.9048206846938196,0.9999999997941819,0.9999999991136238,0.9999999985610447,0.9912017582941786,0.999836427079625,0.9999999997244792,1.0,0.9999999969216385,0.9999999999999998,0.9975509645190029,0.9999998070513906,0.9999997439381705,0.1587656182937718,0.710668267742458,0.005899210093873124,0.00038786367452641255,0.006502789531696324,0.5292150713675036,0.9112187143107132,8.599377290961484e-5,8.905061989701565e-6,0.9749930204724278,0.9999999991623499,0.9999999961024902,0.9284208478588634,0.9302659962453909,0.9999937537992339,0.9999999930314282,0.9470146785066681,0.999999941806354,0.999857751624052,1.0,1.0,0.081265157247264,0.9999999999637932,0.3516137446327217,0.9999999999886694,0.43524436119178983,5.9435508387829856e-5,0.0017071000695936052,0.01366348054775775,1.0,0.33885251575992115,0.9999999999999981,0.9956094806989901,1.0,0.18393866410021498,0.8385862340384095,0.9999981566836357,1.0,0.9999999997638054,0.9315761343220815,0.9999999998843798,0.9999994954727899,0.999999999795813,1.0,0.999999693063848,0.3625668076193148,0.999518175093552,0.9994410917874689,0.9999999442949418,0.01566082198511112,0.2787266225989761,0.9999994436724816,0.4852104440225394,0.4162858094237708,1.0,0.9999999950464912,0.999311631474106,0.9999999999999959,1.0,0.5538554244079441,0.003914354841490281,0.9999999997869814,0.9039494245307836,0.017583684944530435,0.999999999065282,0.9999491080018189,0.021504507870464606,0.9999944319268029,1.0,1.0,0.3736885446945908,0.9999995875331684,0.9638838333567378,0.9999999999999999,0.9956207452025616,0.38473025588946813,0.9985161061056257,0.9992926649886688,0.10544956526262149,1.0,0.9999999999999556,0.9999999641247966,0.999617363209867,1.0,0.9999847668674755,1.5322146391039635e-6,0.26732675414954354,0.9999999931494159,0.09000211935339114,1.0,0.9892009934492202,1.0,0.3417516909962597,0.6414650101397092,0.9999990622304671,0.9998886839276321,2.330138808960692e-6,1.0,0.0080069476852573,0.9999141300334299,0.9972009374638799,0.9875007972101284,0.04872381973517352,0.01963217684097213,1.0,0.13291200140742515,0.9999999999972744,0.18115418139934822,0.1294180966766289,0.1678174288623993,0.9999999999998532,0.22110539941846666,1.0,0.9915598831073693,0.9212268536755925,0.006380735271958185,1.0,0.8032966260557408,0.2853146470462127,0.9999128701476389,0.051459013166537726,1.0,0.0003070137020969071,0.9999999999999952,0.021402026498376484,0.49301190625048863,0.9999986415365059,8.247655115073708e-5,0.5637364852230073,3.0096495349689252e-9,0.00033041703258685574,0.24776593093321514,0.01255334700666191,0.9999999852303301,0.9999927556695805,0.0005034765158255966,1.0,0.999966339270619,0.9979303644362151,0.9984361998935284,0.9999999999999999,0.38380981589262975,0.0006515786229118733,0.5137939000748233,0.983660858155045,0.28156458259590816,0.934520759279466,0.9999718620774951,1.0,0.9999999999999191,0.9999999982999352,0.9999999999896689,0.9896316729524957,0.9984782405724536,0.9999782198285252,0.9998280608268592,0.9999999933638786,0.9999956658767025,0.9999999999999836,0.8958588416557328,0.9889535800004196,0.9999999999999895,0.9570662809658427,0.9999996107892953,0.041692476506057584,6.762729375883164e-5,1.0,0.2775844243351349,0.5082468196272676,0.9995975735412121,0.9876541280444079,0.25938781616571965,0.9999999848180002,0.1500789389263507,0.9999999508114739,1.0,0.9999999999999999,0.44298488102217587,0.9996954884537352,0.9999999986790016,0.9996781608901104,0.9999999999104012,0.9999999999957501,0.9999999896092278,0.006839554853237348,0.9939267048466038,0.9512780104265857,0.8414412217659702,1.0,0.9125381889072663,0.8942526017283855,0.9999999999999991,0.9999999999999734,0.9999336753315083,0.7338331983169334,0.9670457696049847,0.9999999996318903,0.9999999511327362,0.3500280705327205,0.0038837604354054135,0.9752448655581012,0.9999999947318271,0.9999999999998012,0.012658591152671268,1.0,0.025364679499975767,0.9999999999997112,0.12743105696832716,6.336118049451904e-6,0.0009120635835333024,1.0,0.9999999997251086,0.038824671859111405,0.945589997994422,0.31638670992124035,0.6461832091767583,4.014888738211582e-5,0.9998295292146392,0.7001901491595632,0.9999957028348432,1.0,1.0,0.9999999737118758,0.8561793712447409,0.999999998035389,7.655789977386902e-5,1.2699682944524177e-5,0.9859500155680758,0.9999992378240895,0.0020755666570807657,0.9959705609486903,0.05290160066388097,0.9963228780190628,0.0009457547634311185,0.9998378952033534,0.9999297874774303,0.7510309323724633,0.9999831006293458,0.9206591484583124,0.9999990265688323,0.9314550101712957,0.39537818777977685,0.00031371134064670577,0.9823185971008807,0.9711816581655823,0.9999999959202035,0.9999999988889039,0.5978278259788152,0.8686980896289765,0.0010116092374655745,0.7296840626547093,0.9999912929518742,1.0,0.999999999959372,0.9999998265124743,0.999999999945178,0.6778018895871972,0.7435339151554586,0.9999999209411319,1.0,0.7651174790875795,0.6116957254565151,0.9999999986021891,0.9999999836517178,0.9999299615276026,0.9974623962267809,0.925808097168615,0.6801166324828103,0.999999999999986,4.915514367720076e-6,1.0,0.9403768721733885,0.9117124974233644,1.0,0.9936895477013427,0.9039480262802536,1.0,0.9999922127620139,0.9999999169608454,0.3323596912448733,0.999798833708379,0.00010232363358345351,0.9962650638808105,0.06244414698296446,1.0,0.44205413940100446,0.5688076934562788,1.0,0.14417728332956262,0.9999999219127347,0.8624755406229349,1.0,0.9999998482849182,0.9854416930714238,0.9999999999643007,1.0,0.0001982343763902622,0.9973375620926099,0.8898692537022223,0.9999798046777573,0.9999999748775317,0.9776329893251786,0.005166238169417793,0.9034059275161994,0.9981795830309672,0.5245530033628734,0.00015067822854216494,0.9999999723828175,1.0,0.9999444747218903,0.9982726446797181,0.8417682242721323,0.9999849933051741,0.9999999985827477,0.9221472974054816,0.8565771772249628,1.0,0.9999999980055283,0.9999998704974853,0.9999999999976118,0.999980909582132,0.9999999999999658,1.0,1.0,0.9999999984440479,0.9999985247394609,0.9974396446307603,0.14788817072217086,0.9979740548092418,0.9999999961914229,0.9905877553478549,0.9999993397659198,0.06688114350162949,0.9999999835780675,0.9971674644200497,0.09618488308574638,0.9999999999988781,0.9990971371265802,0.488418478450139,0.369200939604623,0.9999999999999852,0.9999999660642793,0.03439791685776746,0.7415282007778348,0.9999836643248441,0.9975953573145868,0.023772799062193966,0.00019884644528353422,0.0007851186376777343,0.9971768545516021,0.6559273033785037,0.17318831918489563,0.20784319275740698,0.999999999998916,0.9999569550170866,0.999952792793455,0.9999988554719247,1.0,1.0,0.9590269252259274,0.9999999999837889,0.9999997443436717,0.3447535518604473,0.06059640076160164,1.0,0.18918443853500153,0.6580054243918191,1.235055553633477e-7,0.18677874067019556,0.9708254815820652,0.9863544832297072,0.5202392984494929,0.9999997965432929,0.9999998304144553,0.9999999999973114,0.000895256806856783,0.9999750285844328,0.68772930772135,0.9999999997655713,0.9880979327297228,0.9945186340565288,0.9999999999136984,0.9999999999999999,0.9992902636573706,0.9999590332816878,0.9999999392260303,0.9991352196195856,0.9402149120728581,0.4433189194947664,0.07423621169358406,0.9999999999301947,0.9995025289269003,0.9990500675403768,0.9999999946000349,0.9762325212394312,1.0,1.0,0.9997513029103304,0.845449431292817,0.999961617948613,0.99992425898699,0.6051875406935138,0.9883038263396124,8.528747383872741e-5,0.9890867530157195,1.0,0.9999909983946144,0.9982459107297859,0.9999999999999999,0.9999614622622228,0.1592933651733096,0.9999993989775351,0.7155346285959701,0.9999956419280789,0.933764339707711,0.9020693307248036,0.9609190279024448,0.955985615212261,0.9998538114422612,0.510034551871591,0.26919654018586825,0.8865750944578564,0.9999999369436463,1.0,0.12510611789642195,0.8140954842820248,0.7467251406827724,0.8346609183126625,0.9726058443284203,0.03767480933947186,1.0,0.9427355001016582,0.9999895236891014,0.00862872808462652,0.9999998809470765,0.9998161356770031,0.6862737585874195,0.8483341045568806,0.9999999999999937,0.6661231534582506,0.5846350651066283,0.999999920903503,0.0008549813602704139,0.8466343039235507,0.9999999998242856,0.9014679134681476,0.6533872976120645,3.724452401317971e-6,0.9866397439509369,0.8682790888794605,0.9945438211397368,0.9999789085726282,0.9999999999946401,0.9361983848794558,0.9999998885583132,0.0003524749392612068,1.0,0.9998670934801249,0.9999999909892752,1.0,0.013043688628485069,0.9999999999981486,0.9999999995520958,0.9999917607483318,2.4064002886414244e-7,0.5325342462636753,0.999999999999884,0.9987548024683144,0.878644603362525,0.9999403595702998,0.21137481763725766,1.0,1.0,0.11106836767956964,0.9999999999999999,0.2285281823432472,0.9999990513954714,0.999999999909038,0.8675039061666387,0.999999999999959,0.9999999999999999,0.5723760398350536,0.9165372694490841,0.00040775266069295114,0.9999999257457586,0.9999999999389726,1.0,0.02048493690723599,0.8001912339881493,0.999999999983712,0.6919134590193299,1.0,0.9999999959255306,0.9502349513340453,0.9995203053017968,0.9999999999829378,0.9999999998848611,1.0,0.18582009257333754,0.6031996688166402,0.9999122918219974,0.9954006197593241,0.9994194378224383,1.891725185967233e-5,0.9945329077558192,0.45750100607394795,0.9999999999857647,0.00593064580786127,0.2474742300690953,0.12403333732601496,1.0,0.6719604282528939,0.028641397202484313,0.04743715972919178,0.9974197327655528,0.9757547757487933,0.9999999873174061,0.9996430504146513,0.9999999999976844,0.9999999999999661,0.9999999999996201,0.20388051211137087,0.9999803303281434,0.9999974885954729,0.8105751600678929,0.9995380196512814,0.982014473091307,0.9999999999864543,0.9999745207269075,0.9988797056284558,0.0185918850702794,0.9999999999998966,0.00023348570095719018,0.999562895068617,0.08113982360667205,0.9996853295392631,0.9999999946375218,1.0,0.9436089554155993,0.5928614563597197,0.6948059189230286,0.8864788424055784,1.0,0.9612458715956653,0.0003740111482888183,0.0005621913499140571,0.9989318412187715,0.23123713658196066,0.9999997731839695,1.0,5.525260605305873e-5,0.00014786113725059452,0.9999999999999516,0.22753572711738343,0.33897522797173313,0.9999997186507802,0.9450687832168461,0.9999999999994713,3.7080112418455976e-6,0.9773667221901455,0.469591832050115,1.0,0.8836202387218591,0.9999882408834894,0.1573245651482527,0.9999999999998375,0.9999999999999951,0.9999999999675956,0.9999952864987222,0.9999787223427491,0.9656595193489246,0.28925175569970984,0.9999999974365285,0.9461882306769807,0.9988466406541815,0.9999999952329726,0.9996270175460069,0.9985744217341505,0.9679071690664033,1.0,0.9999999997239296,0.5150719370481842,0.9999999973639583,4.9601950921371405e-8,0.9909338178044147,0.99994895455114,0.9999981715843475,1.0,1.0,0.9999999999947414,0.12401696366841629,0.00010616732479030403,0.9999933337001214,0.9999581116677199,1.0,0.9999999999999999,0.9999997809330371,1.0,0.9986915106009977,0.9996354790169321,0.9616448386881118,0.9999319970713573,0.999999999999857,0.9999999998518748,1.0,0.999923354574098,0.9187440101480695,0.9998802215749192,0.9999999999999956,0.04051024266111586,1.0,0.9999999999999989,0.9912583625421933,0.9994196130403563,0.9999999246446452,0.999919283181938,0.9279545969599216,0.2563952030039416,0.04081559174041475,1.0,0.5637687112555964,0.9999999283311933,0.971715706193014,0.9999999999999912,0.8656224187235837,0.9999999891124051,0.9718432161595911,0.009453269931256676,1.749794460890832e-5,0.9999999999999999,0.9999999999975566,0.007912041588086196,0.9999984825402599,0.9999825340162222,0.9576071145615755,0.9999790417076734,0.8251680870824284,0.9990715686895982,0.9999997725640584,0.999978342583199,1.0,0.00232799877292433,0.9999999999999938,0.9306406441316301,0.9999999998207814,0.998956464539691,0.9999999999999323,0.9993969576567603,0.999999999965475,0.9999999703843743,0.9999806864508074,0.6556577365679865,0.6332741038610714,0.9964204284214379,2.505715586785278e-6,0.9995981721384937,0.5491570247610056,0.5971877581321016,0.9504620688583207,0.9993417703949637,1.0,0.7276682136854318,0.010082366332503869,0.9877313376862665,0.9999997616749791,0.9999710218438149,0.9999999999965131,0.9923095577458068,0.9999903753809559,1.2533618870775434e-5,0.9998620521820943,0.00016161149674881367,0.018932905832629306,0.029885358977704394,0.8833917079542057,0.919799635627959,0.01942171133780021,0.9999999939272377,0.999258860389101,0.9447042554359701,1.0,0.02452985520225122,0.9613755367030912,0.9537639620984323,0.9999985906193659,0.9829017033594273,0.9796918010491563,0.9999999852118104,0.999999999999997,1.0,0.005236847613627234,0.015705953103812856,0.9999999999998864,0.9999613506788179,0.00041742529293430455,0.9999999999974188,0.03829847380759334,0.9999997467956109,0.9485385990263264,0.9999998182939984,0.9999999999663589,1.0,0.00457181514377497,0.31371023380316,0.9999999999999982,0.0012709218522918802,0.9575469804953884,0.999999999999978,0.9999955969260328,1.0,0.9999999999999992,1.0,0.07349202065494477,0.9993461514992695,1.0,0.9999994388825086,1.0,1.0,0.9999999998519191,0.016751190557529685,0.3179996238863287,0.9999999999605581,0.9982614682916828,0.9999999997460184,0.9989910687188539,0.06273292729550796,0.9972348824639572,0.9999999999999998,0.99993600847206,0.9999999144128731,0.9999552803160197,1.0,1.0,0.06560976419768974,0.9893880674775436,0.03928449353706547,1.0,0.9999999999995286,0.8670963070523052,7.696698176405562e-8,0.05849076875983999,0.006598469673757813,1.0,0.9963057137638532,0.2777575384269599,0.0010429262017703008,0.9999999639188386,0.9999701844315375,3.7755713770886146e-6,0.9995070360756863,0.9997696219022814,0.8425861032898307,0.9999999999999996,0.9295726020160375,0.987419613380011,0.9999919061394545,0.9999999998967238,0.8792975242264294,1.0,0.29111654978571394,0.933051190188795,0.9999999999981362,0.6077486630445633,0.342642522957165,0.8177331833365167,0.9999922025321006,0.7135091023426834,0.9999999701987712,0.957939307189681,0.8384708948307069,0.9999731476257052,0.9966770980408519,0.5603207775615351,0.999677880453843,1.0,0.0010592411499328468,0.94523922617286,0.9783124254353448,0.9531681661817828,0.3062360735162999,0.6423513611586209,0.9999999999907001,0.00045580789859494555,0.11784515376067971,0.8500221715079358,0.9996606177545917,0.45567969738720165,1.0,0.8840700061686897,0.9993650645359311,0.6988370567997342,0.001341799926947452,0.2614556839671384,0.9999999999999997,0.9999999999999858,0.9999999999999996,0.993625740598387,0.5760534688881151,0.9977618608173362,6.778671585670252e-5,1.2786010336269608e-6,0.05646385783412109,0.9910672111060694,0.999999990738009,1.0,0.9997292748965605,0.9999999990650873,0.5610172071438048,0.9944983484269786,0.5004835930830581,0.0023646787417029923,0.9832202640323873,0.6820578954122508,0.31176353748504954,0.9999999842919932,0.9999879941074914,0.8923030777461419,0.2303581728699854,0.7070773731405812,0.15902978631666317,1.0,0.009394754191089472,1.0,0.029099171963259618,1.0,0.9999472428683259,0.9839605073979066,0.9979862074865702,0.0020235078673640217,0.34366033117118194,0.9999999999999749,0.9928168172594382,0.9999999987212417,0.9999999999942986,0.020988111559763163,0.9999999999999777,0.9991380966306933,1.0,0.9968388273805515,0.03764544063303444,0.9788232362076802,1.0,0.9481614445166745,1.0,0.9999999996054403,0.45033275228262176,0.9999999999999999,0.9999805914444023,0.9158940976778036,0.9866254981709115,0.9999959383849597,0.8982989067838412,0.9999998255678735,0.9999994213899998,0.9999991180325721,0.8026743186852326,0.0461929578553782,0.9711869808528941,0.004402927604497628,0.9999999953770564,0.9999999999362887,0.009034871159960881,0.003846732581414819,0.9999479299702609,0.9919837143147704,0.9896446121282813,0.9687446301167942,0.9977656861749682,0.9999994716017633,0.9999742496299513,0.9999979973167096,0.9999788189794834,0.9999782410674554,0.9999999981931105,0.24158942518270188,0.0001796069082352887,0.5025480701750753,0.8860152511284717,0.9071255140711687,0.383201895435662,0.999686252965044],"x":[10.0,29.0,0.0,7.0,34.0,12.0,13.0,30.0,26.0,7.0,18.0,8.0,18.0,27.0,35.0,27.0,29.0,4.0,28.0,10.0,18.0,6.0,18.0,22.0,27.0,40.0,15.0,11.0,0.0,2.0,20.0,14.0,37.0,38.0,2.0,6.0,36.0,0.0,30.0,10.0,1.0,5.0,14.0,10.0,31.0,18.0,31.0,2.0,24.0,29.0,3.0,20.0,29.0,8.0,5.0,9.0,27.0,32.0,13.0,13.0,11.0,28.0,31.0,4.0,33.0,16.0,37.0,17.0,5.0,37.0,16.0,31.0,38.0,38.0,4.0,13.0,30.0,6.0,40.0,36.0,33.0,13.0,37.0,11.0,15.0,9.0,27.0,2.0,9.0,38.0,30.0,4.0,33.0,25.0,29.0,31.0,2.0,32.0,38.0,13.0,8.0,5.0,9.0,11.0,36.0,9.0,8.0,34.0,26.0,20.0,8.0,23.0,38.0,22.0,36.0,39.0,13.0,37.0,27.0,6.0,19.0,8.0,1.0,5.0,12.0,9.0,1.0,0.0,13.0,22.0,34.0,24.0,7.0,29.0,29.0,25.0,14.0,37.0,33.0,26.0,5.0,37.0,7.0,36.0,13.0,1.0,5.0,5.0,29.0,8.0,17.0,26.0,22.0,10.0,23.0,28.0,27.0,39.0,16.0,33.0,37.0,39.0,22.0,23.0,13.0,19.0,10.0,11.0,8.0,9.0,23.0,11.0,17.0,31.0,23.0,32.0,39.0,38.0,9.0,4.0,32.0,16.0,5.0,40.0,28.0,5.0,13.0,34.0,39.0,10.0,31.0,27.0,34.0,30.0,14.0,8.0,18.0,13.0,17.0,27.0,39.0,36.0,32.0,32.0,2.0,16.0,36.0,5.0,37.0,25.0,25.0,16.0,15.0,2.0,15.0,1.0,33.0,4.0,3.0,31.0,14.0,9.0,8.0,39.0,13.0,21.0,3.0,4.0,1.0,35.0,8.0,38.0,11.0,25.0,1.0,31.0,12.0,13.0,25.0,6.0,37.0,3.0,24.0,8.0,17.0,15.0,4.0,20.0,0.0,0.0,12.0,6.0,27.0,37.0,1.0,26.0,21.0,32.0,33.0,27.0,7.0,3.0,15.0,26.0,4.0,21.0,14.0,18.0,20.0,36.0,23.0,5.0,14.0,22.0,9.0,38.0,30.0,14.0,22.0,26.0,34.0,6.0,37.0,12.0,1.0,38.0,13.0,0.0,24.0,5.0,15.0,29.0,14.0,38.0,7.0,24.0,18.0,34.0,32.0,18.0,27.0,36.0,35.0,3.0,12.0,16.0,9.0,32.0,5.0,15.0,23.0,31.0,31.0,6.0,21.0,24.0,36.0,4.0,4.0,20.0,36.0,32.0,2.0,39.0,11.0,23.0,14.0,2.0,7.0,39.0,27.0,9.0,24.0,6.0,12.0,3.0,21.0,14.0,6.0,40.0,33.0,19.0,3.0,28.0,0.0,1.0,15.0,25.0,5.0,14.0,7.0,18.0,5.0,21.0,25.0,9.0,32.0,21.0,12.0,4.0,1.0,0.0,17.0,4.0,27.0,26.0,13.0,14.0,5.0,21.0,10.0,36.0,31.0,38.0,19.0,14.0,22.0,39.0,34.0,2.0,16.0,31.0,23.0,32.0,28.0,13.0,15.0,38.0,3.0,32.0,24.0,4.0,17.0,27.0,12.0,33.0,28.0,22.0,2.0,21.0,1.0,5.0,3.0,39.0,1.0,8.0,28.0,14.0,9.0,16.0,29.0,28.0,21.0,32.0,30.0,2.0,26.0,6.0,31.0,19.0,27.0,3.0,5.0,22.0,10.0,4.0,32.0,37.0,27.0,28.0,11.0,30.0,22.0,21.0,19.0,27.0,40.0,12.0,35.0,5.0,18.0,15.0,29.0,35.0,14.0,26.0,8.0,25.0,25.0,22.0,12.0,12.0,37.0,32.0,9.0,10.0,25.0,13.0,4.0,35.0,27.0,1.0,14.0,32.0,25.0,11.0,5.0,4.0,27.0,16.0,10.0,14.0,30.0,23.0,17.0,31.0,25.0,32.0,21.0,25.0,27.0,3.0,1.0,33.0,15.0,3.0,1.0,11.0,21.0,27.0,2.0,22.0,19.0,37.0,2.0,11.0,15.0,26.0,8.0,21.0,32.0,34.0,35.0,19.0,40.0,23.0,19.0,16.0,9.0,39.0,27.0,15.0,35.0,4.0,38.0,24.0,13.0,7.0,23.0,33.0,10.0,18.0,1.0,29.0,29.0,36.0,18.0,34.0,35.0,14.0,30.0,15.0,21.0,15.0,15.0,19.0,22.0,24.0,18.0,8.0,8.0,21.0,21.0,6.0,8.0,6.0,2.0,7.0,3.0,33.0,21.0,15.0,8.0,35.0,16.0,20.0,22.0,34.0,11.0,15.0,37.0,6.0,17.0,40.0,13.0,18.0,3.0,29.0,23.0,27.0,31.0,39.0,26.0,23.0,0.0,38.0,13.0,40.0,39.0,7.0,39.0,24.0,21.0,1.0,13.0,33.0,5.0,15.0,33.0,15.0,31.0,36.0,6.0,33.0,10.0,30.0,16.0,19.0,39.0,14.0,6.0,24.0,3.0,34.0,26.0,36.0,9.0,3.0,26.0,14.0,19.0,15.0,21.0,31.0,29.0,32.0,24.0,13.0,9.0,26.0,7.0,24.0,3.0,31.0,18.0,32.0,7.0,1.0,5.0,29.0,16.0,1.0,3.0,24.0,18.0,26.0,31.0,36.0,23.0,33.0,5.0,18.0,35.0,20.0,21.0,21.0,35.0,25.0,15.0,8.0,22.0,4.0,35.0,6.0,26.0,20.0,21.0,3.0,12.0,11.0,10.0,36.0,18.0,1.0,1.0,29.0,9.0,26.0,34.0,3.0,4.0,10.0,9.0,16.0,32.0,24.0,14.0,1.0,8.0,17.0,40.0,12.0,37.0,6.0,34.0,37.0,22.0,30.0,39.0,19.0,13.0,34.0,12.0,5.0,24.0,20.0,15.0,20.0,31.0,28.0,17.0,40.0,1.0,8.0,20.0,25.0,30.0,35.0,25.0,11.0,5.0,37.0,15.0,35.0,32.0,28.0,31.0,23.0,30.0,25.0,16.0,20.0,12.0,37.0,23.0,18.0,22.0,33.0,7.0,31.0,34.0,25.0,12.0,33.0,25.0,21.0,13.0,8.0,23.0,11.0,36.0,11.0,26.0,8.0,35.0,15.0,1.0,1.0,31.0,37.0,8.0,34.0,34.0,27.0,31.0,15.0,20.0,39.0,36.0,35.0,8.0,28.0,17.0,28.0,25.0,28.0,22.0,38.0,19.0,32.0,19.0,11.0,32.0,1.0,26.0,19.0,20.0,14.0,33.0,27.0,10.0,4.0,24.0,40.0,38.0,36.0,23.0,25.0,3.0,9.0,1.0,9.0,7.0,11.0,10.0,8.0,25.0,1.0,10.0,38.0,7.0,23.0,6.0,13.0,29.0,16.0,30.0,39.0,32.0,6.0,8.0,18.0,35.0,6.0,29.0,2.0,9.0,22.0,25.0,37.0,28.0,6.0,17.0,19.0,7.0,25.0,35.0,28.0,35.0,16.0,35.0,4.0,9.0,36.0,38.0,36.0,39.0,32.0,6.0,5.0,18.0,11.0,34.0,29.0,11.0,17.0,23.0,25.0,18.0,36.0,29.0,32.0,6.0,20.0,5.0,32.0,39.0,22.0,0.0,9.0,3.0,30.0,29.0,8.0,6.0,39.0,20.0,1.0,28.0,15.0,20.0,34.0,16.0,15.0,38.0,38.0,13.0,38.0,7.0,11.0,35.0,16.0,7.0,13.0,33.0,9.0,24.0,18.0,2.0,12.0,22.0,8.0,12.0,35.0,3.0,25.0,21.0,27.0,16.0,1.0,35.0,2.0,8.0,14.0,33.0,11.0,31.0,23.0,24.0,10.0,7.0,6.0,22.0,32.0,25.0,18.0,16.0,28.0,4.0,0.0,11.0,25.0,35.0,23.0,29.0,37.0,16.0,15.0,13.0,4.0,27.0,15.0,11.0,21.0,24.0,21.0,13.0,20.0,12.0,27.0,2.0,21.0,7.0,38.0,35.0,28.0,21.0,4.0,1.0,30.0,11.0,28.0,15.0,10.0,25.0,18.0,33.0,30.0,9.0,9.0,14.0,5.0,35.0,31.0,17.0,33.0,31.0,19.0,29.0,27.0,21.0,37.0,23.0,21.0,22.0,8.0,25.0,6.0,31.0,29.0,7.0,1.0,21.0,11.0,15.0,26.0,7.0,34.0,13.0,26.0,15.0,7.0,29.0,4.0,2.0,12.0,24.0,4.0,9.0,13.0],"lambda":[0.06349753080811205,14.592804697001007,12.11194745799332,3.7888144701058746,2.0177612587644145,18.789429760829464,17.71768325966711,13.025019084074305,0.347013518663446,12.229222359651892,14.057233535978902,15.454879659340218,2.990245496888404,12.664675751527392,5.460286307006115,12.625282351695004,12.937412720949549,14.152017295670127,3.1053213988162742,19.693617389571525,17.631401814194266,14.423488040002827,19.323145968989806,0.31146981941611696,7.203753420643566,18.400196394107997,12.72051629899594,6.244664704900318,10.47487074384916,7.098784221303731,1.988074757661229,3.0427579441763397,19.500460856921457,5.154864991761334,4.323519233154465,2.3213736162879206,9.10842721910113,5.653010029609926,16.744152596151828,4.668740835289316,7.609510191175244,0.37476869676349,1.5148130092086598,4.191269234477617,16.702246418789013,17.857022920129534,9.133053616341629,16.269276375363408,7.138222448190166,11.285433683289018,0.2558592545950056,6.301501815499813,18.702926891383143,10.604934638819191,1.7597287005832651,8.853835911748508,15.041211669175553,17.003065185629993,19.080966545284035,6.524883537329371,13.172745070833965,18.35245354713807,4.052888519494355,14.518752059016746,15.20304087246636,6.1120592166366405,2.662488357159165,7.912725761529882,5.118399847214894,16.674599105183454,1.268777431886221,17.115866860801127,14.687146354109384,8.331135111041942,14.69652319584827,14.058191720772598,12.75980559585177,2.367690378150624,4.345279661414758,16.3768761688312,15.614079812380561,5.506300107163211,6.575952577620776,19.761636291311962,18.30317057413616,11.189385209058948,10.41000942759846,12.947788403498514,4.057069441858343,11.276282877958712,5.344958764574543,2.4152665674134477,13.539431491699482,10.815644182886581,14.060274586100787,12.271672521652789,2.527992939432373,5.917469656698144,9.830028326711183,11.751014959023331,6.124439138195843,8.496643149217032,8.08830057124835,2.8754080251717395,14.868714658480005,8.276909823359206,5.373025400893594,9.586482892850245,6.320069684554075,3.9333103496261135,3.433435615102005,10.214873151683644,11.72258283509076,1.1536175129835557,11.729038748161663,7.738154084625024,5.735249689610806,14.459699579936029,8.919170526123882,9.582152254515366,17.309907993275996,18.3019774638589,10.277682398201268,13.759110331926077,12.409707318995991,6.0693578931963765,11.920013191747078,11.628890680022671,7.65422650189334,4.59909645815181,10.772480058283321,18.09938148518154,4.28216676399376,11.777039288086977,8.445104099756225,18.332271184217646,2.466253712289679,19.563672500454224,1.4371909363226942,0.12732727475836203,9.656153701212006,10.411474608388968,8.769175493116999,9.515160890872952,14.27851503231385,12.319876088277763,15.703493588059372,12.627066139112912,1.1589546733620582,9.946704954265861,1.2231054004614261,15.332286921265803,1.0195078196482132,13.87756952337432,19.18316479894073,10.46752039637056,0.3318644730554432,12.177420132353856,11.317496488300911,8.89442299735789,15.054941729933056,12.114841027725198,0.9563162833694738,6.90547963988688,15.006812597198165,8.427442987715974,3.24646370182049,1.4716558574786687,16.613992970002343,11.60369236046634,7.146273665431346,11.795180030708622,18.56991797233064,1.485741264891729,5.500604894383718,17.63390010576089,8.466518557442848,1.6662196159034348,9.254961785880397,12.936658739534423,8.630743804236097,11.90187473875473,12.231426758899953,13.33269785332243,12.573762121265943,11.911024952593309,3.1351618203528586,2.2373829665584033,6.790844931223288,11.75260575679578,11.3811292094435,19.265285143221504,5.676872347820203,18.35615369354928,15.817104955061989,2.5992042257361714,8.058193943643456,18.818897012539985,0.9542282955785986,4.380825522750662,14.658268309887251,19.889503272568216,1.7358516234930477,14.257091110947119,18.654886388758523,19.328498634194432,12.102398634700776,9.46968599898366,0.17969053494026443,15.727659899753093,2.4292157830051986,18.385273014674553,14.279457212484527,0.01786575354623121,5.216165028200073,15.790389379474385,3.8853270641820226,11.925304451347042,0.22273416574094984,18.534808782309153,7.683016955454276,15.758538874955805,16.206840205935812,1.774205588032407,18.19544125870406,3.085109102928185,5.689316738498285,7.5365682341417095,3.2261762472391986,7.741839784226983,11.124643791352673,0.4911266391759428,5.302703870367584,19.163728272342095,7.1528380334808705,0.7012347745325087,9.87453294525039,15.868864755473467,11.042379372422282,11.79012734238949,0.030469785268829597,14.539979307984643,3.059584748823494,16.049426240984662,17.74140346126364,3.6095635251411906,18.02576917919739,19.94772341648131,19.62144219852968,8.015154966233178,15.245562154826406,14.204058170244886,7.737568359627378,16.931230616879507,9.9910552738318,0.8547649440503724,8.00417002631768,18.908528957463954,19.311883543098745,3.3774865153724543,8.51382694614471,13.602544601555309,15.531682028025884,17.112302716745106,6.026202204358162,15.384183273320108,4.124356985592668,0.5684483457131284,2.2919271397843133,11.462516779669247,4.008887645021346,1.7996268323634768,6.052608346455077,8.34608580323775,2.352135534983697,13.188792365457576,12.155552963518481,0.8140244133701691,17.19916586762573,16.53633133030993,6.670900481146895,3.1719308680517377,14.890464953540178,19.852347771616977,12.180215805200918,5.1276409817081925,15.962369695467213,0.6767880839900275,11.55126003534875,1.871023322230534,18.357784854206006,8.752587912100015,18.99359070606654,14.254051164502716,0.0056246461785747215,0.27730075490551176,19.29326559850351,18.209929687447897,9.301319474971915,7.537679457026929,6.096724280972001,9.187336793374463,11.755671684187451,10.559183920418938,5.718261279899628,10.794120421019757,6.890322933672981,3.59732858474612,3.0347491728138554,11.236200363493873,2.5669948834987943,5.725816993109549,14.74338294625488,5.190487765220757,14.204895971823209,5.211321211214863,13.096638432590474,5.548388566505382,12.947586285789875,12.985405859726997,11.977941480433675,6.580447555911282,8.106161984720256,6.3800038142301085,19.652304908808723,3.3667053188056117,19.462207222536772,17.067371069873836,19.76403485292659,2.937931619784604,6.415228113083118,16.22025864270434,17.544419991086166,7.975411370064434,11.382697058016573,17.01417423550121,8.982853795536837,12.75197605107457,0.6251991159308812,3.9017342280511036,2.028164991973509,4.241973372134269,2.0052251327368342,7.497462823297787,9.47746324361658,13.980695966534569,8.51583708336702,8.341914099546695,15.425599716857343,6.727260020398096,13.040410297113771,9.360838715627606,16.532366470611407,8.949743156918984,10.891306617628773,7.717235521948189,14.333635591246452,15.758929658640435,2.301031634893742,2.1629005467131046,2.0396573201413437,8.067037292172419,10.244894766880574,1.6873641185203647,7.274247874500168,6.388664145338385,12.774425897651662,10.792657575903291,16.43866463328258,18.946386558754355,2.0102313975831665,6.159011754529393,7.622024442169355,14.993171493275499,2.928219979455764,12.973815724388725,19.69718062768876,15.116625018444783,0.6968288700583836,1.6700125974460622,15.538020233402552,8.826617196663808,5.865192134515107,15.457222097496658,16.170798512017225,9.006761611847107,13.89082078600017,8.371869938675491,19.49996848363994,1.711318006816196,17.724565827393583,2.3382691321750038,0.25749241846318327,16.54508375727056,8.583548248336804,3.278592796381652,11.307915834357726,5.934242459494374,3.438565907120892,9.093188432962997,11.73144479042357,1.4455637245352015,7.417259268058229,4.39977029430894,1.8709744021762598,8.170172726597524,0.013712114494888183,19.110101767681623,0.9617479769100612,12.606393869159035,0.11956256077974903,9.217555952419602,13.043061112170742,8.03530782363251,2.0857131896722825,13.13524892048286,14.752531171529032,3.994779605561858,13.822393398926959,4.229973274078032,18.41704911924813,10.934030324417527,3.120896434084508,11.499944109894095,10.469158910030858,17.260467185137777,10.58764243345578,1.4369129272034131,11.995975899912313,15.734236310994664,8.579885694031088,12.974447323672461,4.731190438614297,15.720937399937199,15.320767089479759,2.867471264088901,13.69923683157345,1.917691191711146,8.54852770638088,0.5275492478965171,1.6865201795055462,0.3429586358720371,0.8779498167234268,10.899331476407479,3.20150245016801,14.709062525544061,12.111003762709167,13.732244623331095,6.318577641096077,13.25383584721321,2.2207083444296183,18.76617811667637,13.0901954477306,19.307699805404695,14.294224662505343,0.41658592966887564,12.936748205907813,13.775518006615691,5.425769557372497,7.148391925838582,8.058569096176914,5.193213343375183,12.328450343934726,14.308543493716638,13.91294783574184,19.785066237308225,18.655764889555417,15.115612156781658,15.554866343434446,15.08510944211971,14.037814504976076,18.003577646909147,6.191880725336953,9.335485779116679,5.910709386676314,11.95184798506197,2.2378085539359205,4.062574849992706,14.555180682584496,4.853768421266342,8.918445957024733,4.485468868884435,4.5101031188966045,5.134422719828571,19.411489179886754,2.9519066047145115,18.897577699888743,14.969545676582543,14.01725947708436,17.630948885863013,2.5927972048030856,6.250908673537814,4.774562597790277,9.500144052087197,11.360843785941919,2.683711859843241,13.812979815652305,5.934845373957671,3.611976982434313,11.890040599966355,8.32255354296386,0.6097520867184869,19.855348940133844,6.958334003095494,15.554018691409656,11.519920358398235,13.556043702248086,17.255680844091334,14.868281767442987,11.667203108300157,13.773065661980684,6.373032130134084,11.44995968854522,1.6015436295457475,4.977161819501448,0.5752565947306509,4.494752573736376,5.195305438138211,9.26558644038565,16.199120107895748,9.822880116901697,10.517766194823679,11.928952108649975,18.87403350799131,0.8643355197525082,16.447502482120377,8.734792185976454,0.9793114772626721,16.96731650636993,18.818508132711695,11.010383131904389,13.523859055109412,6.982833598779674,10.451544061333653,11.098091188837955,12.86368026771813,15.49415595045371,10.7738962989689,18.559411927982524,10.60250478367231,5.589859069792378,5.3768267319818674,1.1815346030284912,10.081163712469433,6.30593380737233,5.104660602165203,1.3951818176687558,3.5168549582929876,8.173482135949147,3.5539415646448225,15.135531074202632,4.258036270743424,17.656866742601487,13.006726781236946,6.026305299829917,18.541976609819322,18.119142743581484,6.554617768134614,10.266280251686135,14.838432424777356,13.93975763493632,18.287974282705992,13.71875507496853,12.572881519738841,9.445454215846055,17.01726831910503,19.82430826588054,19.18707569642333,18.641640973709155,16.356352490454455,13.854284302686404,10.68530565194898,19.560786580997288,6.520111313535559,7.950531032533719,0.4261934154635316,4.22247716339418,14.474199316743913,3.9806964228344865,15.552899390067466,10.31134945918649,5.262670318845459,7.279681766952177,18.194592262610595,13.36911195303581,6.851245153240377,1.1562232419392782,11.494446480900846,15.993348924457216,19.05285854541706,2.3036012003181927,4.49831051121012,10.322745416481593,5.257659102540186,13.278606266738073,11.259769070220603,2.0651764044657828,15.135933144555986,9.104607687514736,0.21031983584310243,6.211477420122384,18.43132786498324,14.188114473107095,12.180624121760403,5.574736345521623,2.830307783822077,17.46456983500046,2.2958451359818532,5.247353821735827,12.834500084870179,0.37011631768484765,2.3305708127729163,14.885511478830598,16.54043771474617,6.493664719359322,8.419282901094132,0.6213837003957501,17.23507729298069,8.880114006021076,11.686718656996945,2.5343997334900115,11.85666011996188,17.911658871620745,19.429718129180177,19.131982416600216,7.749699191178312,16.858413123922446,2.7065504768044857,8.866624115425523,3.0030962294002705,14.918161463494446,5.410902156084991,7.832394751626648,13.264817174823552,11.39887268763465,7.193204556241981,16.24688129331638,8.991757463703859,3.0393904252245907,7.156208175489378,7.865387885690911,6.050124419034919,14.880577530151688,16.925846847320525,9.681993651505616,13.323531018057576,9.10577562906532,10.224595312748633,6.477657412246209,16.305573289782348,2.8984794023948135,16.69880131572526,19.310904336658233,10.93938619914653,12.688674284482872,4.247180927468417,0.5821140114177714,1.423327289014189,11.852219351593977,10.01730786032114,7.20256671491998,0.8275433257256415,12.051683502259758,10.317582437072105,9.869642056888575,15.938887284501533,12.1297890679419,8.332086471220933,2.187722877367917,16.63073250601393,17.284563008525907,0.3103390981410481,12.173826805958466,18.418244996784733,11.748401179253985,17.562970239864928,1.0411600670712406,15.295930278986457,4.0417762043755046,17.98991532122399,4.668067546568251,8.890143253210493,17.314977215519338,9.60166393522143,7.3492245170717885,7.681839672505042,3.8749483758538883,12.208241681438817,19.156791814248848,12.668716687054777,15.821844708259999,10.591492579161418,7.780605262135851,1.1387748997536828,5.934802993972013,8.884734024834353,6.635406590881336,13.363998215032261,3.500763111745173,6.861297597050049,17.509674672933684,13.837844226614324,19.856921532014873,3.4505714702367207,7.651303430096754,8.759971791882535,3.028390867015114,4.665738519088887,4.605916355757542,16.060569319389014,19.48835946700294,16.866834508032632,4.787398084805075,1.8620514800465582,4.972163696769907,9.387318943220283,4.285292868546939,11.890215677100272,15.56655671885029,17.720727103530255,5.5338311169604415,2.3624716416761338,1.0727276298751542,5.283358673911014,9.700096886367495,13.273229828130146,9.372358984097296,6.089387239904882,13.544234846826523,1.5051471746353995,6.168737140970468,15.443021155073598,4.339423118433969,11.625082403326399,10.988485664508293,15.567811711060756,16.227458807764137,14.833352832490343,0.9189083524738972,11.129856258337632,13.304562845069006,6.319134726161049,3.768656906568917,5.816211877754247,11.777936100882238,9.286631361186313,6.703005098055415,13.636978216074933,0.9088629310484464,9.468681692406413,17.805242354353894,13.927902587934682,15.656537933027149,19.571562755928433,13.849625244552701,12.257708311974298,9.560459983901964,15.765533816337296,17.151528624401422,0.5445772517835934,19.82548691372027,4.367635724465839,12.161351835269354,6.730747158599986,13.072872693653785,4.8138605411445745,10.545472207393235,10.886920965849761,4.273710637619694,14.433123966541412,17.946444818203613,10.546151871006014,19.61745494775799,15.713130892274405,12.897513845132353,19.125675506619274,19.570504370340984,9.23378246111791,18.30943695516254,0.3147782049096648,8.81515640170985,11.592725028605035,15.127997193522585,16.406394606896214,18.750587939505984,9.12299461570961,13.760542331721837,9.642819631144356,18.399251905182968,2.287735354728868,11.234581785670091,17.613021423985657,14.102297857599106,8.064118767423366,6.725746976150653,16.226419992712124,6.468401426874495,0.03900337015542377,6.280146314882038,3.6309065890950265,14.456466540470373,16.088231292755605,3.226296108671467,2.775782041543753,19.585804619629464,9.655458592547648,9.255441822447041,8.381031030177981,4.339612940911635,15.588157715301794,16.60885263871366,1.807436001759819,16.96979171746355,19.309982429039408,6.002299191501748,6.657472246178542,1.094869771198117,15.7715298062078,7.715970946250357,10.384139479311862,2.477411064012389,15.797570397868945,19.78383872186461,1.6444542300356257,19.265003350767355,17.90721082380618,7.247052530617162,10.963330456153644,2.3852512992876385,0.9897306290879371,2.408755602195667,8.519806664068433,2.796466953647081,2.5800597767127487,15.737269434655516,3.422196649240936,2.6756319304163645,8.504926020156356,13.731424362061677,6.867124711763606,2.5519239726619114,4.322535438474309,9.665145646770576,15.878537564773403,17.698293429625423,8.432020060778127,2.4141451477890596,10.827414089089956,4.135642365228236,17.77420745961321,1.9461031123419525,4.59929551869684,11.342002966978551,11.894533866219064,10.922913461680848,2.2268939340242744,9.855227467895977,17.78006982796954,16.379889315316298,15.378158326593873,10.60734494750298,0.5149768086247519,17.37523765583682,10.516439209356413,18.00072198483438,14.661511517951151,7.362647517758485,15.276693038153702,14.458065168062975,5.571286542206391,16.434176260674175,5.957879659990222,11.364628408203421,8.404368563692405,17.67429500949619,11.31710817898794,9.78987049648178,1.0791435029536611,9.289328608539336,7.278556266049696,8.472586490596443,15.578050484976455,8.842665143160623,10.590369037309063,14.411110615523665,8.02506770927729,6.53328059083214,12.17408584229602,1.3793284803968842,3.1534481374798773,12.088012883144623,8.231124899825586,4.070314540903199,5.0235477423148245,12.989241351452122,18.397734011430337,13.582864041198288,19.768384674166036,18.818704743901723,1.2563828602894533,8.981078811528551,12.160486899831744,12.63143220732851,11.054871438127826,17.609637678658984,12.0518557429964,4.2786856816855545,18.323774333404486,11.933425626144425,9.060110752568281,19.182809318854602,8.450835941021193,2.1819524105665566,5.966110050860669,3.019372686240076,9.879809624843086,15.898282725259492,16.02561708454434,18.27312368175275,13.569744020208855,17.936500383312946,15.471642485067907,11.70111176909769,1.0875074618988867,14.598169726541936,11.726734253720856,16.04984344563966,7.6468748228926575,13.663642743140056,13.632292587901373,17.950106522578288,13.8710183926035,13.42214406511272,4.957495251821364,9.18130943179651,16.407447097253996,16.573713471942458,18.291739996213366,16.55326356313381,1.13687899387108,8.484916508916243,0.15628040483025352,14.150463800239553,4.142312935640651,17.24002903607474,18.678235508368473,10.896845024682328,13.844920256438176,2.2453134630905547,5.3401541192407675,5.187660078142735,7.3518605720697705,1.469738839117647,18.73552415872494,3.59686310282636,8.197910672873295,2.1040108613075725,17.933633174119066,16.282086304664706,4.662678557939057,0.32520670799557116,2.6374458418182822,5.419368962896263,8.368774138406252,18.196815650155568,0.5698038570685249,13.793312347420784,14.180231594933508,19.18875691649557,10.326213328874147,16.280453404339525,14.399377751996902,7.162579514110172,6.309198146634749,18.857411118250962,14.591284236510607,17.22005955829839,15.85537375207634,9.291354304572135,6.866643165170174,16.168769991217204,7.726946735968916,8.250598129283876,5.265507487016725,8.214374769509242,18.177420293147254,2.2446008981952748,13.27521413695537,3.60754433908256,9.36704200680667,4.516512485277717,1.1122910771984484,7.945967441053523,6.344451297870095,13.250022174083721,12.645559527828523,19.16026242171332,2.375931516344809,10.6193728689326,4.601945025726035]}
},{}],254:[function(require,module,exports){
module.exports={"expected":[0.07034511978315104,0.9999999999998774,1.0,0.999999999999865,1.0,1.0,1.0,0.9999999999999999,0.9999999999999802,0.82494503117,0.3005654597977249,1.0,1.0,1.0,0.99999999870701,1.0,0.8953194697359592,1.0,1.0,1.0,1.0,0.9999600588102947,0.9998607753691371,0.9999999153476119,0.9999999999407667,0.9999999999999868,1.0,0.9731793292296098,1.0,0.8940782881002683,0.9999999999999949,1.0,0.9096340412810962,1.0,0.9414637944221814,0.9999999508179319,0.9999999999850194,1.0,1.0,1.0,0.9999999999999999,0.9999999999972211,0.9999999515164688,0.9999999997606114,0.9999882607306896,0.45593626597191617,0.9999999999950697,1.0,0.9999999999999999,0.9999999998275517,1.0,0.9999985092420404,1.0,1.0,0.658020414386519,1.0,0.9999566971777568,0.9999316365545431,1.0,0.9999999999999993,0.4636868621431341,0.9999831597950616,1.0,0.9999999999999999,0.9997356675235047,0.9999999833580776,1.0,0.9999567953567773,0.9615381018162171,0.6405457392635356,1.0,1.0,0.9955462950243537,0.9999999999998842,0.999856748201026,1.0,0.9999999999951907,0.9999997752666172,0.999999999999992,1.0,1.0,1.0,1.0,0.3076193909657627,0.9999997120461163,0.9999999999748042,0.9866255582281062,0.9999999999971415,0.9510088807706344,0.9999999999999999,0.9887431332219683,0.9999999999513249,1.0,0.9999999990433671,0.999999999999987,0.9999999999999999,1.0,0.9983095679345502,0.9997660494716786,0.9999999999995655,1.0,0.6935184304088806,0.9999986617986591,0.9999999999985428,0.9999999999999173,0.6471552581423564,0.9999999985859493,0.9625868635436055,0.9999641394940749,0.9999999554752852,0.9999999999932854,1.0,1.0,0.9953411017592444,0.9981314540293247,1.0,0.999999999999959,1.0,1.0,0.9999999981039873,0.9999999999814579,0.9999999092739965,1.0,0.9999999990238437,0.9999999999999999,0.9996502399038276,0.9998340257464364,0.9988753060174052,0.9869729448463344,1.0,1.0,1.0,0.9876386842119097,0.9999999971349717,0.20765794348636177,0.7124811535515911,0.8796310494711026,0.9999999999999999,1.0,0.9948626295364621,1.0,1.0,1.0,1.0,1.0,0.9854160828314632,0.8915849493421006,0.99999999811423,0.9999998029570724,0.9999780101300373,0.9999999999999993,1.0,1.0,1.0,0.9999999999999998,0.983352208676248,0.9999530627108897,0.9999999999982723,0.999999999999991,1.0,0.3546037559646912,0.9995618650007042,0.9999999999814112,1.0,1.0,0.999999999999999,1.0,1.0,1.0,0.9999999973277944,1.0,1.0,1.0,0.7393903483780695,0.9992928751867127,1.0,0.999999999919415,0.9999999997535436,0.9999999999999758,0.9999999999999999,0.9999999843430372,1.0,1.0,0.9999999923042359,1.0,1.0,0.9497902015648654,1.0,0.999999999673523,0.6690870427484908,1.0,0.9744816874143457,1.0,0.9957245121439798,0.7957174691910711,1.0,0.996305884050302,0.9940737842272352,1.0,1.0,0.99999999999986,1.0,0.9930210487035107,1.0,0.9999999999999998,1.0,0.20731061592227076,0.9999999997709441,1.0,0.3710677288792498,1.0,0.9999999999902085,0.9999999999999599,0.9837952025229011,0.999999998257447,1.0,1.0,0.9640769677674867,1.0,0.9996105070605934,0.7901662247460948,0.9999981424103674,0.9999999998582184,0.7117260837274088,1.0,0.212147727147521,0.9999999999999901,1.0,1.0,0.999999999885499,0.9999999773754152,1.0,0.9999725149866998,0.9999999999997391,1.0,1.0,0.14359319063779674,1.0,1.0,1.0,0.9983318157013836,1.0,1.0,0.20363735994100732,0.9999990908834439,1.0,1.0,1.0,0.9148995947607228,0.04392873414418172,1.0,1.0,1.0,1.0,1.0,0.999998774727746,0.8760091463743175,1.0,0.16541063398285374,0.9975167538145053,0.733668191717852,0.9999999999996635,0.9999999999999999,0.2991284776090765,1.0,1.0,0.37963161687882846,0.9653095090799901,1.0,0.9999999999999879,1.0,1.0,0.9999999999999998,0.9993331452183183,0.9999990302516077,0.9999999392912131,0.9999697875360448,0.18793725645195247,0.9981127710506824,1.0,1.0,0.9999999966521093,1.0,0.9999999999984772,1.0,0.9998385644318253,0.06904500936685563,1.0,0.9999999999925289,0.9999999999896464,1.0,0.9999999873040142,1.0,1.0,0.999999999685565,0.9720076400826887,0.9999999998921393,0.9999999999999801,1.0,1.0,0.9998281628926603,0.9999999999999999,0.9999586062121704,1.0,1.0,0.9566657418983019,0.9999999999999902,0.9999999999999558,1.0,1.0,0.9999997065382985,0.9999999999978954,0.9999990214850137,1.0,0.9999999999999999,1.0,0.9999953414421626,1.0,1.0,0.9999995553957212,0.013267800188144989,0.6854773311280536,0.999999886521937,0.9999931398377518,0.9999999999717067,1.0,0.9999999999999999,1.0,0.9999684277743499,1.0,0.9999999999979683,0.9999999996264615,0.9390345752334277,1.0,0.9999903981815111,0.999999951331426,1.0,1.0,0.04626782797362096,1.0,1.0,0.9999999999999998,1.0,0.9999999999920882,0.9986257040907239,0.24553158034584757,1.0,0.9879888089606289,1.0,1.0,0.8993420745615711,1.0,1.0,0.9999999999982474,0.9999999999232674,0.9966871146097765,1.0,0.980575968603532,0.9999999999996236,1.0,0.33924793055749697,0.7004982862362257,1.0,0.9999990659828676,0.9986182351722035,0.9999999999999999,0.9999450453268462,1.0,0.9125652589116927,1.0,1.0,0.7939523155509877,0.999999999999807,0.9999999999999999,0.9999999999834678,1.0,0.999995675557279,0.9999999999999972,0.6695591165558816,1.0,1.0,1.0,1.0,0.9999999996793569,1.0,0.9993550405733125,0.9944941386173496,1.0,0.9999982928200681,1.0,1.0,1.0,0.9698993638536633,1.0,0.8473688256038987,0.9999999999999989,0.9999999999923552,0.9999999915160402,1.0,0.9207472489323346,1.0,0.9764353703186179,0.47970578839005296,0.9999999999991086,1.0,1.0,0.9999999999953385,0.9999999999999999,0.9999999999999997,0.29372844460267683,0.014700102893557809,0.9999999999999528,1.0,0.9999999999999998,1.0,1.0,1.0,1.0,0.9999999986739633,1.0,1.0,0.9999983759402549,0.9999999999956268,0.45846573844141336,0.9698391286007468,1.0,0.9999999387028673,1.0,1.0,0.9988291578965797,0.9410691956101938,0.9999999953864583,0.9999999999961885,0.9734712077548721,0.9802055884473313,0.9999999999997221,1.0,0.9999999951000311,1.0,0.9999999997924285,0.9999999998415968,1.0,0.9999999995127173,0.9999999999999997,0.05779569404280682,0.9875642740836243,0.9820915952072778,0.9999999999999595,0.9999999999958645,0.9999999999999999,0.7198518311050577,0.8801880815112708,0.9999999998899382,0.9433554628347034,1.0,0.9999766779330544,1.0,1.0,1.0,0.9926403491152596,1.0,0.1833881622311801,0.9999999999999392,1.0,0.9999996295906026,0.21084967310909314,1.0,1.0,0.9999991583470942,1.0,0.9999961352084848,1.0,1.0,0.9999999999999998,1.0,1.0,0.9999999881655631,1.0,1.0,1.0,0.9996689174959874,0.9999999999999992,1.0,1.0,0.9999665823917161,0.6596698635905693,0.9999999975421842,0.9999996389502409,0.014685179352415643,1.0,1.0,0.46438987889561184,0.9892196276065998,0.9999996181371217,0.9996259449027375,0.9999999999974344,1.0,0.9972276108864434,1.0,0.9999999999999998,0.9999999995396142,0.9999999999998207,1.0,0.9999999987372654,0.999999999999959,1.0,0.9929424541475764,1.0,1.0,0.8246396617051088,0.9999999980119967,0.9999999999999598,0.9999999991461255,1.0,1.0,1.0,0.9999999978744222,0.7619462081536874,0.9821910724531957,0.9999999999831457,0.9999999999999999,0.9999999999999999,1.0,1.0,0.999941988345224,0.8261101310377899,0.9999999999483729,1.0,0.9999999999999999,0.9999999999988349,0.9999838723089127,0.9999999999999999,0.9999999999903715,1.0,0.9999999999714999,1.0,1.0,1.0,0.9999999999999999,0.9999999999999893,0.9999999472013286,0.045335068326404444,0.9877610941769908,1.0,0.9608971140345177,0.9999997363070008,0.9999999987018624,0.9656665190992663,1.0,0.999999997053843,1.0,1.0,1.0,0.9999659457413835,0.8713749740610089,0.9755427647953135,0.9999920436147535,0.9709330893202582,0.9999942067804756,0.9999999999885842,0.9560376953594212,0.9999999999991069,1.0,0.9953963612871954,1.0,1.0,1.0,1.0,0.9999968799188126,0.3680664296912277,0.9999999999999947,1.0,0.9999999999999999,1.0,0.862555453191634,1.0,0.9999999230033109,1.0,1.0,1.0,1.0,0.9999993792655895,0.9999999999996539,0.9999999999999996,0.5159959219775179,0.9999871651109741,1.0,0.9999999998267506,1.0,0.9959414836248893,0.9999999999999974,0.248338769611406,0.9999999997167015,1.0,0.9999999999999999,1.0,1.0,0.972593515386868,1.0,1.0,1.0,0.912666462205395,0.9991900023999081,0.9604339085722307,1.0,0.9646851958998819,0.2874018687428955,1.0,0.9999986186212126,1.0,1.0,0.8526800110597178,1.0,0.9999999999999224,0.9997733108328488,1.0,1.0,0.9999999999999993,0.9999999999996864,0.9999817149937462,0.9999999999999999,1.0,0.9999999999977653,1.0,0.6415899624480446,0.9999999999999979,1.0,0.9999999999999925,0.9451360028395202,0.08661955607756794,1.0,0.9999999999914384,0.9999973479223493,0.9999999686553798,0.9999999999999999,0.9999999999996991,0.9999756700422211,0.9999914503857542,1.0,0.9999998710004995,1.0,0.9999997938669137,1.0,0.99999999999925,0.9999999715901585,1.0,1.0,1.0,0.9999987086935506,0.9999999916297517,0.9999999999994599,0.9868367634319734,0.9999999999999999,0.6848062972302321,1.0,1.0,0.9990167681199147,0.999999639252589,0.9840376073072608,0.9999999999999984,1.0,1.0,0.04860869648369361,1.0,0.9578193468484935,0.648012820631879,0.9999999998994459,0.9999999999999999,0.9999995844785424,0.9565962238101874,1.0,0.9999999999999906,1.0,1.0,0.999999999999851,1.0,1.0,0.9999992604396333,1.0,0.9999999999514317,1.0,0.9985500163615675,0.9666807691607398,0.9999976528570431,0.9999999662771354,0.9999905195175647,0.9949740491366523,0.9999999999997801,1.0,1.0,1.0,0.9692704390610003,1.0,0.9890914243412089,0.9999998560870126,1.0,1.0,0.9999999999999885,1.0,1.0,0.7785043880297506,0.42368053823330154,0.9959443909673591,0.9999999999994817,1.0,0.9999999997093637,1.0,1.0,0.23753543408570912,1.0,1.0,0.9999999999459223,1.0,0.4936077180300006,0.9999800175284504,0.9986569738022855,0.9999999999994725,0.9999999999999996,1.0,1.0,0.9163280628144331,0.01576923208187784,0.9999997439010498,1.0,0.9999999999999994,0.9902638818600675,1.0,1.0,0.8980112657364372,0.9999911077009594,1.0,0.8147865175124147,0.9999999999982441,1.0,0.9999999975461938,1.0,0.9983628841223797,0.9999999997427472,1.0,0.9999999978933402,1.0,1.0,1.0,0.9999999992975074,1.0,1.0,1.0,1.0,1.0,1.0,0.999994035788192,0.9999999999999921,1.0,1.0,0.9999982210616294,0.9316290538262634,0.37611879486603306,1.0,1.0,1.0,0.7825229434968239,0.15284557112213143,0.9999999999999775,0.9999997912449003,1.0,0.9995268406209814,0.5456261392361595,0.9999999534237096,1.0,1.0,0.6092080714109271,1.0,0.9999999999999999,0.9999999999994745,0.9999999999925278,1.0,1.0,1.0,0.7048799931987322,1.0,0.9999999999999996,0.9999715683315357,0.999999999844795,0.951428928275985,1.0,1.0,1.0,0.15741683750117216,0.999999999998207,1.0,0.9999999699242094,1.0,0.1576899971734253,0.9999933186454926,1.0,0.9999999999814781,0.9999999999999827,0.9202042180226315,1.0,0.7303907746536425,1.0,0.9999999999999996,0.9719013518048476,1.0,1.0,1.0,1.0,0.5127893851429653,0.9999999993586549,0.9999752992049593,1.0,0.9573683536085318,1.0,1.0,0.9999999966518465,1.0,0.9999999999990248,0.9691555185796294,0.9999999999998299,1.0,0.8862531715501885,1.0,1.0,1.0,0.5002538436763554,1.0,0.9999998781153066,0.9999999901407567,1.0,1.0,1.0,0.5698511841915233,1.0,0.8579177306659904,0.9988488127104869,1.0,0.9370598152678349,1.0,0.9999999999999282,0.9998873517353408,0.023349506755975157,0.843413695424533,0.9999999999985403,1.0,0.4785363699561338,1.0,0.9999988211323433,0.9999999999999963,0.9623971283850349,0.9999999999999963,0.9999999998944716,0.9753946919959622,1.0,0.999810296488211,1.0,1.0,0.9996797977077372,0.3978253042836566,1.0,0.9999999984578419,0.9999999999728639,1.0,0.9999999999998352,0.9999999839054718,1.0,0.9999999999999999,1.0,0.9999937471032416,0.5730999314111613,0.2809317680826332,0.9729170387978197,0.9999474366765901,0.29285224124379966,0.9999872238671075,0.23879559319753377,1.0,0.9708466337134685,1.0,0.01449909072374429,0.9814710418728164,0.9823908531242288,0.9999999866968292,1.0,1.0,0.9999999999999992,0.9999999595526023,0.999999562435729,1.0,1.0,1.0,0.9999999999999999,1.0,1.0,0.999999887303843,1.0,0.10962142985326759,0.9999999861413628,1.0,0.9859613645615869,0.9999961509707098,0.999999774945406,0.999999999993,0.7694552107227077,1.0,0.9953500987061754,0.9999999999999375,0.9311408221888903,0.9999993838953882,1.0,0.740094083927419,0.8741534158625152,1.0,0.7364534066479311,1.0,1.0,1.0,0.9999999999999999,0.9999999999999967,1.0,1.0,0.9999999999999997,0.9999982410776745,1.0,1.0,0.9999999999999973,0.9999999999999967,0.9999999999999872,0.9985827044138308,1.0,0.6053779017657246,0.9999999988826098,1.0,0.05586053698802217,1.0,0.9999912724839564,0.9997822522228451,1.0,0.9999605477078531,1.0,0.8746031136243451,0.9999999999994453,0.9995379706813184,1.0,0.9276817354123781,1.0,1.0,0.9998330551675525,1.0,0.9999999999970137,0.9996827134294741,1.0,0.9999999999999998,1.0,1.0,1.0,0.0570318110311423,0.9963316431983127,1.0,0.0789466077841958,0.9999997689220004,1.0,1.0,0.24432878671204292,0.9941517718473476,0.9999999999998465,0.9999999999999798,1.0,1.0,0.7939976598873975,1.0,0.998595993176228,0.9999999999999829,0.9999999999946884,0.9999960720204277,1.0,1.0,1.0,0.5391697391352924,0.7597512560182446,1.0,0.9999967982623346,0.9999999994869253,1.0,1.0,0.9999999999499234,0.9999999998946679,0.9999999992330307,0.9999999999998851,1.0,1.0,1.0,0.33122993968204045,0.999999984356973,1.0,0.9999999999999994,0.9999999999999999,1.0,1.0,0.9999352148453724,0.9999999713783154],"x":[1.0,24.0,36.0,20.0,30.0,37.0,35.0,37.0,12.0,5.0,3.0,33.0,21.0,24.0,17.0,35.0,2.0,32.0,38.0,17.0,37.0,10.0,4.0,11.0,22.0,29.0,30.0,8.0,21.0,7.0,25.0,34.0,5.0,20.0,7.0,20.0,17.0,36.0,29.0,36.0,29.0,20.0,10.0,20.0,12.0,4.0,14.0,31.0,37.0,22.0,39.0,17.0,21.0,17.0,5.0,29.0,11.0,11.0,26.0,30.0,2.0,13.0,21.0,36.0,11.0,16.0,37.0,12.0,6.0,5.0,34.0,26.0,7.0,24.0,8.0,39.0,14.0,10.0,24.0,14.0,39.0,29.0,38.0,1.0,19.0,6.0,5.0,22.0,6.0,27.0,10.0,15.0,27.0,21.0,28.0,22.0,26.0,3.0,7.0,10.0,28.0,5.0,15.0,26.0,23.0,3.0,9.0,8.0,12.0,8.0,12.0,37.0,32.0,7.0,4.0,34.0,28.0,32.0,38.0,19.0,24.0,8.0,21.0,15.0,31.0,12.0,5.0,1.0,5.0,30.0,39.0,39.0,9.0,21.0,0.0,3.0,4.0,31.0,38.0,9.0,21.0,40.0,37.0,31.0,20.0,5.0,7.0,20.0,18.0,10.0,25.0,39.0,22.0,22.0,26.0,5.0,9.0,10.0,20.0,27.0,3.0,8.0,14.0,28.0,37.0,23.0,14.0,29.0,25.0,20.0,19.0,40.0,35.0,5.0,11.0,26.0,19.0,19.0,24.0,38.0,19.0,39.0,27.0,12.0,25.0,32.0,6.0,30.0,15.0,1.0,38.0,5.0,33.0,8.0,1.0,37.0,4.0,7.0,27.0,38.0,24.0,35.0,5.0,34.0,28.0,36.0,2.0,15.0,30.0,2.0,16.0,11.0,17.0,7.0,16.0,15.0,34.0,5.0,22.0,11.0,0.0,11.0,18.0,3.0,34.0,0.0,18.0,28.0,38.0,15.0,19.0,39.0,11.0,21.0,24.0,17.0,2.0,36.0,13.0,39.0,11.0,29.0,38.0,0.0,11.0,29.0,28.0,39.0,4.0,1.0,32.0,32.0,38.0,39.0,36.0,17.0,4.0,39.0,2.0,11.0,3.0,22.0,36.0,1.0,32.0,31.0,2.0,6.0,36.0,17.0,31.0,23.0,30.0,10.0,6.0,17.0,15.0,0.0,10.0,23.0,30.0,20.0,33.0,21.0,36.0,9.0,0.0,23.0,23.0,17.0,36.0,11.0,19.0,34.0,23.0,7.0,17.0,26.0,29.0,25.0,14.0,10.0,8.0,32.0,24.0,5.0,21.0,17.0,32.0,29.0,12.0,21.0,16.0,38.0,31.0,39.0,11.0,30.0,16.0,5.0,0.0,4.0,19.0,16.0,12.0,36.0,17.0,28.0,12.0,33.0,25.0,22.0,4.0,31.0,15.0,6.0,26.0,24.0,0.0,31.0,29.0,23.0,39.0,20.0,6.0,1.0,22.0,5.0,22.0,36.0,2.0,30.0,17.0,22.0,20.0,8.0,37.0,7.0,13.0,37.0,3.0,2.0,34.0,15.0,9.0,35.0,9.0,17.0,6.0,34.0,33.0,6.0,27.0,23.0,23.0,38.0,12.0,27.0,4.0,35.0,27.0,38.0,35.0,19.0,17.0,10.0,10.0,36.0,10.0,37.0,32.0,28.0,7.0,20.0,3.0,23.0,25.0,7.0,23.0,1.0,34.0,5.0,1.0,23.0,16.0,31.0,22.0,27.0,29.0,3.0,0.0,26.0,32.0,24.0,35.0,16.0,27.0,39.0,17.0,17.0,29.0,12.0,16.0,3.0,9.0,32.0,19.0,25.0,33.0,10.0,2.0,18.0,23.0,6.0,2.0,18.0,40.0,21.0,33.0,23.0,15.0,26.0,23.0,29.0,0.0,8.0,6.0,24.0,21.0,29.0,4.0,3.0,24.0,2.0,30.0,14.0,35.0,37.0,24.0,2.0,37.0,0.0,25.0,26.0,17.0,1.0,34.0,26.0,7.0,23.0,17.0,35.0,33.0,9.0,31.0,29.0,16.0,39.0,35.0,22.0,12.0,19.0,21.0,38.0,11.0,1.0,11.0,10.0,0.0,33.0,31.0,2.0,5.0,8.0,13.0,21.0,40.0,5.0,34.0,26.0,8.0,23.0,38.0,15.0,11.0,39.0,4.0,37.0,33.0,5.0,14.0,26.0,21.0,27.0,35.0,39.0,19.0,1.0,8.0,10.0,17.0,32.0,27.0,35.0,12.0,1.0,13.0,25.0,28.0,26.0,16.0,27.0,25.0,25.0,23.0,36.0,33.0,18.0,31.0,26.0,14.0,1.0,3.0,32.0,3.0,18.0,18.0,3.0,31.0,20.0,36.0,31.0,26.0,15.0,4.0,6.0,16.0,1.0,13.0,22.0,6.0,9.0,30.0,7.0,25.0,28.0,32.0,38.0,17.0,1.0,17.0,30.0,24.0,30.0,5.0,38.0,17.0,37.0,28.0,31.0,23.0,15.0,25.0,23.0,2.0,14.0,17.0,22.0,37.0,9.0,14.0,1.0,16.0,26.0,22.0,21.0,22.0,3.0,37.0,34.0,23.0,7.0,7.0,4.0,25.0,2.0,3.0,37.0,5.0,35.0,38.0,3.0,28.0,11.0,9.0,35.0,39.0,20.0,22.0,12.0,25.0,40.0,25.0,30.0,4.0,25.0,22.0,9.0,3.0,1.0,38.0,20.0,13.0,14.0,36.0,17.0,7.0,16.0,28.0,19.0,32.0,14.0,28.0,26.0,14.0,31.0,37.0,29.0,18.0,6.0,20.0,9.0,30.0,3.0,14.0,19.0,9.0,11.0,7.0,28.0,19.0,30.0,1.0,36.0,4.0,5.0,23.0,40.0,17.0,7.0,38.0,21.0,29.0,19.0,24.0,30.0,35.0,9.0,31.0,9.0,29.0,12.0,4.0,11.0,11.0,14.0,10.0,22.0,22.0,23.0,24.0,8.0,33.0,10.0,6.0,26.0,37.0,29.0,34.0,17.0,5.0,3.0,9.0,24.0,38.0,17.0,37.0,39.0,0.0,32.0,26.0,11.0,37.0,4.0,12.0,9.0,23.0,19.0,19.0,37.0,6.0,0.0,16.0,27.0,19.0,1.0,26.0,18.0,2.0,12.0,27.0,5.0,16.0,35.0,13.0,30.0,4.0,22.0,32.0,19.0,25.0,28.0,38.0,14.0,34.0,31.0,27.0,34.0,36.0,31.0,12.0,22.0,33.0,35.0,15.0,3.0,2.0,35.0,37.0,31.0,6.0,2.0,26.0,8.0,32.0,7.0,3.0,17.0,39.0,25.0,4.0,37.0,31.0,25.0,13.0,33.0,32.0,30.0,4.0,25.0,28.0,14.0,24.0,6.0,19.0,31.0,25.0,1.0,22.0,40.0,16.0,40.0,0.0,6.0,36.0,21.0,12.0,1.0,23.0,3.0,36.0,29.0,7.0,23.0,35.0,25.0,36.0,3.0,14.0,15.0,39.0,7.0,23.0,34.0,15.0,36.0,19.0,5.0,12.0,35.0,6.0,35.0,23.0,32.0,3.0,37.0,9.0,16.0,18.0,36.0,30.0,3.0,34.0,3.0,4.0,22.0,5.0,24.0,15.0,6.0,0.0,3.0,21.0,33.0,2.0,36.0,14.0,19.0,8.0,17.0,20.0,8.0,22.0,10.0,33.0,36.0,6.0,2.0,29.0,11.0,12.0,37.0,16.0,21.0,40.0,17.0,36.0,14.0,4.0,3.0,9.0,15.0,1.0,5.0,1.0,34.0,2.0,32.0,0.0,1.0,7.0,16.0,32.0,19.0,27.0,20.0,16.0,35.0,20.0,39.0,24.0,28.0,18.0,15.0,23.0,1.0,19.0,32.0,1.0,13.0,7.0,25.0,6.0,25.0,6.0,23.0,7.0,12.0,29.0,2.0,5.0,33.0,4.0,33.0,29.0,28.0,34.0,22.0,38.0,40.0,24.0,13.0,32.0,26.0,20.0,10.0,13.0,12.0,19.0,4.0,19.0,35.0,1.0,39.0,8.0,8.0,33.0,8.0,39.0,6.0,20.0,9.0,35.0,6.0,32.0,39.0,10.0,25.0,21.0,9.0,20.0,21.0,31.0,22.0,29.0,1.0,8.0,32.0,1.0,13.0,34.0,27.0,1.0,9.0,17.0,17.0,34.0,34.0,4.0,37.0,5.0,28.0,13.0,6.0,15.0,26.0,33.0,3.0,4.0,28.0,8.0,22.0,40.0,36.0,16.0,21.0,20.0,28.0,38.0,18.0,24.0,1.0,13.0,22.0,19.0,27.0,38.0,28.0,9.0,16.0],"lambda":[4.32716016190181,3.550582508611395,1.996423763387215,2.3552146091671213,2.130011641358589,3.4348963403024713,3.2512471797965867,0.6525571102636873,0.5189910046267987,3.7357768700082064,4.758555961496784,0.0820890529418028,1.147439784455464,2.3081723440414157,2.8069331327237688,1.555040149661887,1.1250543343066632,3.5563078681617553,3.0276598603378115,0.1645382759989067,0.4981464685322734,2.3798402043915736,0.47746052488341295,1.53076510124601,3.998248658306652,4.852454244021741,1.545270373292652,4.168692469762359,1.4660646412792078,4.72125047047451,3.3706663642916035,3.7969037830557104,3.0626528599134595,0.15740430916845627,4.118987468707046,4.849440576605367,2.1131440054449735,3.412510083907001,0.045598163351424637,3.9102144875424116,0.6841166035303858,2.7717628625416246,1.170177589050918,3.549372793180108,2.9085560987606796,4.912737262745562,1.221935351838912,3.660712435403455,0.8737481895071508,4.2284367556399,3.27516397138806,4.545973777062939,0.060976129128434975,0.6399534819163266,4.759826303266222,1.5205755138388333,2.8438999145444055,2.986060940169951,1.5628657027429471,4.635989498844389,2.824276781291284,3.467902476050355,1.2267757064312912,0.653492189057312,3.4649479521564053,2.9450315278454955,0.06008887269537855,3.3061583114699564,3.0938177239377884,4.85979487463333,3.4283761125754895,0.9666542030313696,2.5204453757830048,3.5413367094783643,1.866160049856661,3.9432839631991854,1.2197460103883573,1.3673407552814942,3.132732151691645,0.037849568448319326,2.1452028364673623,1.618715986803121,1.7010667692932047,2.403777992891678,4.941192213196658,0.10483588011147682,1.9050103764651583,3.422004244610548,3.26978115680936,0.1793412113507542,4.855369327275269,1.703692708966127,0.9092017939595887,4.230925636314301,4.500765481310232,0.07049780884210266,1.0232548246981987,0.4950976415829944,1.574273257048715,0.38103449594783956,2.208771199790772,4.5549355565170755,3.605278902467841,4.707618861609834,3.171030868344725,3.0003420372348133,0.6246319147516055,4.437078617544612,3.2452249531874133,0.6764139051788465,0.8311451253674784,3.150246568352687,4.38196748158246,2.5400035706179294,0.8536221489379892,1.636193947222938,4.715740074702339,3.9701598017875517,2.811509989486216,3.610262182742235,4.50048239450156,0.7364625866268593,0.5635505160481791,2.1033960378960295,0.14457190478504578,4.10651615822236,0.784403385740633,0.04819422176986721,1.8937429506361536,0.2341086724555641,3.8696369966309696,2.512715509084813,4.270557761414272,4.498840743311528,1.5718630554287083,2.707304355256468,2.5843238894650633,0.43296090139216536,0.4861654426871942,3.731905924239791,1.5682512343043298,1.6606428132139683,0.42996728969465603,2.2186595801701117,0.49784900889981665,1.942715442394255,4.748068578623128,3.995454083479374,4.371913368079791,2.225914341105193,3.0911370419491835,0.006281243970799322,1.2525433475171488,1.4585427507569726,3.194000224901349,2.0023285503513,2.002290956447681,0.4338836980026861,2.0412902359222587,3.0901727519163638,4.427914543479611,2.1785924408616273,1.3452519882669167,2.3136681268249646,0.733517872271231,2.582403510382356,0.06966965383060963,2.3047954455183106,1.5882241768683492,4.077330178340989,1.2489063801478095,2.4654277388665493,4.129390881277092,4.2835672132859495,3.879917942370925,0.41210469953597895,2.994541262469949,3.1971478728523484,3.295294249406303,0.1526534384153544,4.107344257242912,4.875423501417119,1.7808150892018804,1.498209599066519,0.6870781780990076,3.9539591704733956,3.2885211617431698,3.1107664507052246,1.9462902980997066,1.1821532264651624,4.7454995844146,2.212685922820572,0.9574651963252867,3.055683401647017,0.8362204503115378,0.3312729833816086,1.0022282185269082,2.648065117145464,1.4671628834420747,2.17904513446856,3.572613637403154,1.4862444866420466,1.6504473372724948,4.822313168360913,3.8211763443365134,2.454462792107288,4.222262803845909,1.8983283931802941,3.289877988042358,3.2426800557111446,0.2218197226169083,0.6735845636953308,1.4701603845069022,3.177200500401214,2.519188052436916,0.46483528806781416,3.1678590608237,2.404152410060635,1.682438417577693,3.6208271649914536,0.23551194458336866,2.061708313896294,2.7577206304013515,2.710725839000774,1.3498354075437136,1.5504724208132004,1.5708152899016392,1.760502500621508,2.958457677613392,1.808278588045853,4.202425724833879,1.9557459761108498,2.7107896015597985,2.7308644973542187,0.9915606181681724,0.14536328880852878,4.7889188106505465,2.901698372641881,0.3468294975281838,2.7764299277261193,4.300664412110919,3.26075372558569,4.7337284901180885,1.591414514375944,1.9220161664060298,2.800228173452355,1.1753902966083152,3.92481624221284,2.311496632519714,4.9001673519490785,3.8491046496743255,1.483423590203684,4.902440283361164,3.8193638670283034,2.9931030184619436,4.481761338961564,2.609974143239456,0.7051511257529441,4.574125232637956,4.518273997271179,2.6107162167544784,3.0733370405060922,0.272838928920931,2.443317504336775,2.651767845626595,3.6546736950403247,3.2013042047183573,3.0231778330020664,2.6783823958726605,1.3685598072295646,3.8546250471052277,1.2714952032844318,4.439577845045447,3.3182927495659476,0.49748641257367887,3.6281892024681497,4.654920576153936,1.6716471141333844,3.789139046384278,1.5167699989193861,2.866502517221151,4.131373844361007,0.005594086482146876,2.992549031576981,1.0788691121657434,2.333475950893975,2.672996677381777,0.3339832010925414,3.945108631377482,2.065011147596034,4.071147789378783,1.2823771857688615,1.0607698180646807,3.5179491964083365,4.762292411124128,3.532000941941311,2.3928174409331584,3.90237250422547,3.5459248402278165,2.386286840586287,4.870484934338961,0.019640629828769907,1.5807585831549376,2.4772789966088373,2.3025481790937263,2.5194689418689,2.3101298092480027,1.4788611918143213,2.255511259705991,2.671891724573685,2.063378492159369,3.0436034677295556,3.9561857798710287,2.7590139538872682,4.563847182066504,0.30231062922665974,2.2595541734638336,3.7183142259466093,0.1119012562122268,0.2718801409472471,4.322415217692295,3.709019729624435,4.652918161889593,4.593849420021164,0.9352850738491414,1.4041711179182692,0.5636328993722883,1.0734628431148796,3.2044029211489433,0.4449197018202067,4.408346794182108,4.404957106916213,2.0882405708921525,3.483720815130469,4.227410921163411,0.31726687368034523,1.6043720243161597,2.339032081460932,3.0733084195981486,0.4839483291418478,0.8664085625950069,2.3830889291425175,0.2379113059802862,2.9349079430495904,1.6081002836425917,2.7173373486964114,1.0106538417705835,1.859537309426088,1.8128448884997073,4.51373996590131,1.105322478161186,0.34372022451989115,0.4961835011252902,3.338418156332902,3.328925660104618,2.9361927216115635,4.721524102403745,3.2886072176871073,0.827814583584302,3.656859275807738,4.51812057193525,1.9119312577706893,3.680189177224311,3.5046365344909125,3.094130282020142,0.2441202562099487,2.0411977996672914,0.14992250849876654,3.7626352220712334,3.311383589872233,1.5434981711659823,4.7774196272591745,4.661416859125325,0.8279289012090929,4.103601296415787,2.751730814050626,2.6438034903412913,3.9036303881433563,3.7911713738501462,3.9906369033090536,1.836086981154863,3.0080668995246453,3.9978914311150726,3.2471525771417395,0.7453923575915877,3.3045494186348154,4.379924710006257,1.0073065673746961,1.688181145793377,3.8133470113292867,3.517461563605967,2.2980470699595457,3.583664927079291,1.2500012663594728,2.053359101106417,2.593882213601587,4.686553914055781,0.3848535890946303,1.6239987591054905,0.46318587836542635,4.215778537448319,2.171208010517124,1.7439984481968451,3.5551594729956584,0.35659031707112154,4.161926613345669,3.508010569049146,3.476491371863278,4.183719115124974,4.803307935932148,4.219900785660188,4.050210658709586,1.994519757182539,2.6454167706822096,3.4178858791315214,0.5367182500713863,2.148282854108512,0.46696319958719257,2.8115485638344184,0.14838721834605217,0.6066002583806962,2.412289844055795,1.6923165395161244,3.8739985545550546,4.953155495050087,0.6372264642662973,4.474000571498329,0.7349674106859216,2.667102205592778,3.5622668567745785,0.875795953260311,3.4236548213695626,3.816460909767506,2.850571060961692,0.5649495671032323,1.903736794448151,2.0871136398329204,4.637537768291946,1.812547127201355,4.662018561926136,1.8498192698739102,2.5839255203366465,4.8709551004823854,4.17994729402495,2.8508410036081777,3.6390389911297683,2.622826094103601,3.3738744296975254,3.1534245243524053,4.011133732322994,3.529561556381985,1.8676089957316844,4.908650844400616,0.8613493885605727,4.012254413180216,4.056030170519316,3.9549345910424574,1.3712135081768528,2.08261339227744,0.3892001145806845,2.9650554121107464,1.6961502674197382,3.7612270699750914,0.9309093858866657,4.1143635805331265,2.9236261011797238,2.0756718230535034,1.256695360558726,0.7085730364856546,0.8207252708507407,4.8756238703304176,3.1440797484847636,0.5902518180677374,0.12101700935654658,3.9995336341061205,0.1966966467684017,2.8755483174385468,1.4264907697266394,2.826337052761235,1.0639938912340596,4.082333886349025,1.5683322320965742,1.4280749681693528,3.3053841035497253,2.7670364121042255,1.2081880831697145,1.1031759114372275,1.435628677964771,4.2209165010989755,3.982152754085609,0.32024435202667956,2.8213081176980905,1.8152497563379622,0.8760277303234631,4.685470029260902,3.0753360808335337,3.783559261495386,1.3591012835379046,4.499437562119695,3.20456590228312,0.3958025306610624,3.290501364583288,4.03598993595282,2.142379163909487,0.4185700767429201,1.6703987230889294,1.1726917871033016,0.2825479338779735,0.38548415541114434,3.7378873173027536,1.9014291886228463,4.022621668520394,4.204302706730932,2.997031929485383,2.1311323765386714,1.577725520460731,3.635232820748385,0.9287529976471165,3.872669946795111,0.5383612991805753,0.3832241514789414,4.992583105143793,2.6305553416952963,3.6726773995618256,3.4056008595007627,0.7514994113888129,1.206428090984344,0.6276049933801064,3.7746907106660768,4.661072801706277,4.9166047116165785,0.9989656820039727,4.7371226785778,2.569827011776228,4.216669204613684,2.7942802760994114,2.317349139314724,1.1657841840041039,0.26630381716777896,3.79859325601531,2.4474626986750536,4.862199241026671,0.8745560732035473,4.233754028717051,1.2588853526281774,4.458484924908172,3.16124697780897,1.2064763417022206,3.959712155597969,4.1006212918052585,4.70356408274167,1.214575515691687,2.331472989545691,4.702864234183226,2.642291619481477,2.8011446082474145,4.647745258179828,0.2629402805459402,3.1463635506329113,3.672174003129216,3.189143952655029,0.29006908076144144,3.0596829089638122,2.5348025249516457,0.639819696472369,1.0667165376777,0.6220352852288247,3.0584273123363657,4.798874167421191,2.145448249204035,1.303546122740491,2.195735784192576,0.939508185487028,4.113012835076125,3.4623026150194383,2.7287537025319972,3.6878432429267494,2.573976552043259,1.5432296641060872,1.9393945190152206,0.48742224005097423,3.394505726530559,4.066779111139037,2.474940364964148,2.609705010884291,3.8483325860362383,0.5985971830441561,4.2294695498441754,4.078228636525992,3.6044637482734068,0.7146542265360789,2.701773483000757,2.227800357139306,2.6587406422520212,0.401116808630928,0.30537514668348864,1.0073635630624511,1.1221202197348212,1.6920655269138574,0.2114730582501012,0.7947242504338936,4.509047680770576,1.9061836675398713,1.8425863849866453,0.8497714724315808,0.7095584191336246,4.845399228937768,2.2258751763140108,0.33120296780169034,4.973112844884742,2.1804965060366346,2.0244761282657517,3.1179171017782235,0.4421988064356708,2.4362251052056982,1.8727235546360443,4.758666377241118,1.7834862660138961,3.0626057523512253,3.0365958496442946,0.1978705734202435,4.977925077783607,4.4276614136616,3.244035366182547,3.934710963762961,3.245857993015676,0.28032996303560487,0.17814983951073837,1.410039771043179,4.069464947060125,3.3179791384863355,2.947657348300586,2.9344510050331296,2.3495680102390706,0.8584215462893607,1.660974701393656,1.1301365652644368,4.674193078630803,2.7508485948154657,4.6912998349031625,1.5140960955052574,2.726782266637231,3.053518819163391,4.571024290793314,2.3316295305658064,4.126951046783837,4.196195349781512,3.4995222325835416,4.971467495083553,0.2444974288448254,2.536696450055623,4.313599284883182,0.7301029533519776,2.8320178323270273,0.42612663612039414,0.10094592393181334,2.9537490722272333,1.7573886786584836,3.168187762866743,4.126649144414291,0.5113154057425007,0.964960004024833,4.778012608243585,1.3444454569463593,1.8762859619391636,4.817125150673168,4.493132491605243,0.19433643187765193,4.147945580807616,3.86321698971279,1.4770177023904685,2.3062523987989825,3.4496069409079135,0.7038513449504014,3.582865640613959,3.109222186565457,3.0566781045019384,1.2341226142889417,1.044505993756114,0.4384212707801516,0.3500450212919659,4.81095464869704,1.756125459884309,2.1100172210303834,1.4041237770963666,3.7482827695452636,4.324473968845109,3.0090211982866877,0.1727273186806666,1.8889631730565526,1.9708793349334797,4.27510358216654,4.934407539350652,4.832809344990473,0.3729919535562798,2.2020918996337446,2.7025381441031304,4.827163637949105,4.451361893425958,0.7381832127893817,4.042175392378207,4.050429227269868,3.604085989312693,3.7970482824208194,3.1807643610519265,2.548997928679384,0.8032071354428172,0.3684026546710806,1.4374384704857257,2.932894541505725,2.5771923969206387,0.783226147650391,1.2902686933324525,4.705415555299945,3.0630955861366758,3.082056925569263,3.465961012002782,1.5251562696165255,0.6390047281903788,0.41511331493221615,3.721005799009908,4.1496945740642355,3.5819719093522817,1.396158725597978,1.5418916422803697,0.14648158732261107,1.4339717561740661,0.19334276893926972,1.1118847510153063,2.8317437369797007,1.695773366278871,3.8052067786504518,1.5952970205757921,3.179050521996314,1.6354051395238856,2.9077222134107927,0.8278582848429261,4.318684710517461,4.481370917150179,3.6332720931864038,0.7232621891605617,2.864170134989905,0.5901921617280514,1.7583566519780458,3.3563100086628816,2.3354172878390633,2.8168059575803426,2.4245192269932234,3.1737415829204463,3.8413305427017033,2.725653975150423,2.555173697496639,4.474080861448348,3.9966851073020715,3.6875517926777923,1.5215083729628343,3.2181977526594907,0.4509877126505146,4.329007376485862,0.5115465705346722,4.858814343648742,4.694581696848977,3.923179481999166,0.814163915404198,4.669589986839592,1.7528910054847824,3.458442806054455,3.563069752911485,2.9720519588864924,1.761636600831501,4.100513614763999,0.444124981915901,4.708825194625188,4.1444815708829585,1.0392650688630711,4.889500298393003,2.049130258188412,3.029960876775294,3.6081463104863234,1.7631094333961728,3.9266959546372537,4.128181611682084,4.992551567705687,3.263253588336733,1.1058481436420864,1.9286735095448815,2.2469131635996167,3.3097342100418334,3.3422584600650995,2.0066873455351386,3.070464929285829,1.1306257136303355,1.847124216489524,0.6695558538628565,1.8962376306628714,3.4140358522312955,0.5138559061123305,0.4650469411716307,1.6599198850363728,2.625738788145646,2.904371427727251,4.249201428610718,3.534668599860422,1.946177358801191,4.820264174459927,1.4105330499711177,1.4626218860071583,3.611432478147006,1.746419478033705,4.5757319155654885,1.4892072252152477,3.848702065011035,1.905524903171406,3.673742148748608,2.297744196679888,0.30067670631397037,2.326751610902126,2.3160053163039898,0.6169975302759556,0.3400755793569399,4.029277398142302,1.8717750587370119,1.0551579921043075,3.585024612609875,3.670850998680044,4.052318403872539,1.0099148005089686,2.839131210676812,0.8690499505141058,4.827700481769059,2.172797219786192,3.3475791535332844,3.7081122410374623,1.9955934583525337,0.763492343451353,1.3229075164446968,2.7748689313989883,0.8046603004101627,1.0938539118263957,1.0507020010763768,3.757179419031451,2.074619575081791,2.9859550386045877,3.4790372293695535,2.762101141009903,1.6448254195081102,3.142548797948473,1.7085124729206969,4.4413753788004575,1.2736941813130387,3.3889944745796874,4.103454242085695,0.4213053530267963,2.84911603890511,3.6388602295048567,0.2896490155216591,1.250048663962089,3.1154625057779084,2.9636799924700217,1.057446368204964,0.9320719394186694,4.530590705238739,1.3709122819865727,4.964463428552017,0.9800187720595788,0.5406893197309914,4.157542352726646,3.616238087280882,4.28623496091442,4.889154960169306,4.861624663847205,4.882494634128809,2.4731486748846354,0.49083729868032,2.755321162409492,3.667637355335458,0.6572991831216257,4.210226323182123,4.233669340229172,0.20606946968118267,3.227588926481617,2.899170735739234,3.5683515340838987,0.19309621119334874,3.7091667540546003,4.792146903684228,3.7259414471807126,3.1762102973170068,1.3525765940449386,2.714138419763409,2.530545449757484,0.3896917168789815,0.47500837722102784,2.9782389391991106,0.9837398150638588,3.7738822607323352,4.076420280775006,2.1736602248533754,0.1777098947471334,3.0331807100517363,0.5932770361665984,4.667410881423314,4.95001540354476,2.080752296897481,2.0095589416025383,3.1289585097697725,4.270029962602928,2.2067470824798563,2.5598079579144617,1.7645501679330033,3.3712270921015266,3.9981182542285163,3.4414411008565473,2.5734120631736634,1.2615540481543297,1.1884669558142258,0.06581451312639874,2.450241876810625,2.919257531769459,2.702805254339112,2.706969782712921,2.83016114065596,3.956481118909594,1.5610986425470719,1.9170895146350309,0.24248770129067787,0.6420368050651115,4.798324169532606,1.2582978764179464,4.120148021456675,3.4973842843562606,3.5461517309375323,4.609328038541029,2.0026817545318334,1.2924334257556003,1.976243035959535,4.266030546588792,1.5708041064988043,1.3513258201375233,4.1366865914162005,2.540321665530066,2.671196506322725,3.492823868797319,3.588392640180377,4.859984929040825,3.3369241167942465,2.806420224643195,1.4453595582471879,3.0999293449963305,2.543719307918809,0.576276008012252,1.925932861664188,0.5421486745801163,1.9322211742929685,3.6003558851785025,4.58406266645507,2.9831462620774305,0.2855747008827858,4.184694408096501,2.3761036538948135,0.5944470962370585,2.2542493200070157,2.72405308958818,3.8047903933751535,1.5944662517655417,1.411091152435232,3.450451795534406,4.0763758790124935,3.124097706872908,2.907654286343341,1.184203338131159,4.551324316804461,1.0124322780750505,0.6165676814624954,0.28513741263354264,2.805914541441502,2.1481308220647577,3.4882524191222353,3.315552521836035,2.906226193452178,1.1387385044520226,4.480037960827125,3.06628140511204,0.7725201197232712,1.985134503462248,3.7484132816775704,3.7931836728637416,4.919629047726897,4.189587055273627,0.4692659698019974,0.40389966956326684,2.29837124855227,1.8996674079817788,1.1576481796463634,1.5398475506470133,3.330919714908301,2.5945536311636843,2.317461017137016,2.082786786913251,3.0597191409522404]}
},{}],255:[function(require,module,exports){
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

var smallMean = require( './fixtures/julia/small_mean.json' );
var mediumMean = require( './fixtures/julia/medium_mean.json' );
var largeMean = require( './fixtures/julia/large_mean.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `lambda`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided a nonpositive number for `x` and a valid `lambda`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -10.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -2.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `lambda`, the function always returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a `lambda` equal to `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = cdf( 0.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = cdf( 3.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than 0' );

	y = cdf( -1.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than 0' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given small parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var x;
	var y;

	expected = smallMean.expected;
	x = smallMean.x;
	lambda = smallMean.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given medium parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var x;
	var y;

	expected = mediumMean.expected;
	x = mediumMean.x;
	lambda = mediumMean.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeMean.expected;
	x = largeMean.x;
	lambda = largeMean.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 60.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/poisson/cdf/test/test.cdf.js")
},{"./../lib":251,"./fixtures/julia/large_mean.json":252,"./fixtures/julia/medium_mean.json":253,"./fixtures/julia/small_mean.json":254,"@stdlib/constants/float64/eps":50,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/abs":87,"tape":391}],256:[function(require,module,exports){
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

var smallMean = require( './fixtures/julia/small_mean.json' );
var mediumMean = require( './fixtures/julia/medium_mean.json' );
var largeMean = require( './fixtures/julia/large_mean.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `lambda`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `lambda`, the function returns a function which returns `0` for a negative `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -100.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -2.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `lambda`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `lambda` equals `0`, the created function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0 );

	y = cdf( 0.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = cdf( 3.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than 0' );

	y = cdf( -1.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than 0' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given small parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = smallMean.expected;
	x = smallMean.x;
	lambda = smallMean.lambda;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( lambda[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given small parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = mediumMean.expected;
	x = mediumMean.x;
	lambda = mediumMean.lambda;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( lambda[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeMean.expected;
	x = largeMean.x;
	lambda = largeMean.lambda;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( lambda[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 60.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/poisson/cdf/test/test.factory.js")
},{"./../lib/factory.js":250,"./fixtures/julia/large_mean.json":252,"./fixtures/julia/medium_mean.json":253,"./fixtures/julia/small_mean.json":254,"@stdlib/constants/float64/eps":50,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":79,"@stdlib/math/base/special/abs":87,"tape":391}],257:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/poisson/cdf/test/test.js")
},{"./../lib":251,"tape":391}],258:[function(require,module,exports){
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

},{"./is_number.js":261}],259:[function(require,module,exports){
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

},{"./is_number.js":261,"./zero_pad.js":265}],260:[function(require,module,exports){
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

},{"./main.js":263}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
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

},{"./format_double.js":258,"./format_integer.js":259,"./is_string.js":262,"./space_pad.js":264,"./zero_pad.js":265}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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

},{"./main.js":267}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{"./main.js":270}],269:[function(require,module,exports){
arguments[4][262][0].apply(exports,arguments)
},{"dup":262}],270:[function(require,module,exports){
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

},{"./is_string.js":269,"@stdlib/string/base/format-interpolate":260,"@stdlib/string/base/format-tokenize":266}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
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

},{"./constant_function.js":271}],273:[function(require,module,exports){
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

},{"./main.js":274}],274:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":278}],275:[function(require,module,exports){
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

},{}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
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

},{"./define_property.js":276}],278:[function(require,module,exports){
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

},{"./builtin.js":275,"./has_define_property_support.js":277,"./polyfill.js":279}],279:[function(require,module,exports){
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

},{"@stdlib/string/format":268}],280:[function(require,module,exports){
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
* Alias for `eval` global.
*
* @module @stdlib/utils/eval
*
* @example
* var evil = require( '@stdlib/utils/eval' );
*
* var v = evil( '5*4*3*2*1' );
* // returns 120
*/

// MODULES //

var evil = eval; // eslint-disable-line no-eval


// EXPORTS //

module.exports = evil;

},{}],281:[function(require,module,exports){
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

},{"./native_class.js":282,"./polyfill.js":283,"@stdlib/assert/has-tostringtag-support":26}],282:[function(require,module,exports){
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

},{"./tostring.js":284}],283:[function(require,module,exports){
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

},{"./tostring.js":284,"./tostringtag.js":285,"@stdlib/assert/has-own-property":22}],284:[function(require,module,exports){
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

},{}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
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

},{}],287:[function(require,module,exports){

},{}],288:[function(require,module,exports){
arguments[4][287][0].apply(exports,arguments)
},{"dup":287}],289:[function(require,module,exports){
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
},{"base64-js":286,"buffer":289,"ieee754":377}],290:[function(require,module,exports){
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

},{}],291:[function(require,module,exports){
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
},{"_process":383}],292:[function(require,module,exports){
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

},{"events":290,"inherits":378,"readable-stream/lib/_stream_duplex.js":294,"readable-stream/lib/_stream_passthrough.js":295,"readable-stream/lib/_stream_readable.js":296,"readable-stream/lib/_stream_transform.js":297,"readable-stream/lib/_stream_writable.js":298,"readable-stream/lib/internal/streams/end-of-stream.js":302,"readable-stream/lib/internal/streams/pipeline.js":304}],293:[function(require,module,exports){
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

},{}],294:[function(require,module,exports){
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
},{"./_stream_readable":296,"./_stream_writable":298,"_process":383,"inherits":378}],295:[function(require,module,exports){
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
},{"./_stream_transform":297,"inherits":378}],296:[function(require,module,exports){
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
},{"../errors":293,"./_stream_duplex":294,"./internal/streams/async_iterator":299,"./internal/streams/buffer_list":300,"./internal/streams/destroy":301,"./internal/streams/from":303,"./internal/streams/state":305,"./internal/streams/stream":306,"_process":383,"buffer":289,"events":290,"inherits":378,"string_decoder/":390,"util":287}],297:[function(require,module,exports){
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
},{"../errors":293,"./_stream_duplex":294,"inherits":378}],298:[function(require,module,exports){
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
},{"../errors":293,"./_stream_duplex":294,"./internal/streams/destroy":301,"./internal/streams/state":305,"./internal/streams/stream":306,"_process":383,"buffer":289,"inherits":378,"util-deprecate":399}],299:[function(require,module,exports){
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
},{"./end-of-stream":302,"_process":383}],300:[function(require,module,exports){
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
},{"buffer":289,"util":287}],301:[function(require,module,exports){
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
},{"_process":383}],302:[function(require,module,exports){
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
},{"../../../errors":293}],303:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],304:[function(require,module,exports){
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
},{"../../../errors":293,"./end-of-stream":302}],305:[function(require,module,exports){
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
},{"../../../errors":293}],306:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":290}],307:[function(require,module,exports){
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

},{"./":308,"get-intrinsic":372}],308:[function(require,module,exports){
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

},{"function-bind":371,"get-intrinsic":372}],309:[function(require,module,exports){
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

},{"./lib/is_arguments.js":310,"./lib/keys.js":311}],310:[function(require,module,exports){
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

},{}],311:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],312:[function(require,module,exports){
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

},{"has-property-descriptors":373,"object-keys":381}],313:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],314:[function(require,module,exports){
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

},{"./ToNumber":344,"./ToPrimitive":346,"./Type":351}],315:[function(require,module,exports){
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

},{"../helpers/isFinite":360,"../helpers/isNaN":362,"../helpers/isPrefixOf":363,"./ToNumber":344,"./ToPrimitive":346,"./Type":351,"get-intrinsic":372}],316:[function(require,module,exports){
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

},{"get-intrinsic":372}],317:[function(require,module,exports){
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

},{"./DayWithinYear":320,"./InLeapYear":324,"./MonthFromTime":334,"get-intrinsic":372}],318:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":367,"./floor":355}],319:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":355}],320:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":318,"./DayFromYear":319,"./YearFromTime":353}],321:[function(require,module,exports){
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

},{"./modulo":356}],322:[function(require,module,exports){
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

},{"../helpers/assertRecord":359,"./IsAccessorDescriptor":325,"./IsDataDescriptor":327,"./Type":351,"get-intrinsic":372}],323:[function(require,module,exports){
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

},{"../helpers/timeConstants":367,"./floor":355,"./modulo":356}],324:[function(require,module,exports){
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

},{"./DaysInYear":321,"./YearFromTime":353,"get-intrinsic":372}],325:[function(require,module,exports){
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

},{"../helpers/assertRecord":359,"./Type":351,"has":376}],326:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":379}],327:[function(require,module,exports){
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

},{"../helpers/assertRecord":359,"./Type":351,"has":376}],328:[function(require,module,exports){
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

},{"../helpers/assertRecord":359,"./IsAccessorDescriptor":325,"./IsDataDescriptor":327,"./Type":351}],329:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":364,"./IsAccessorDescriptor":325,"./IsDataDescriptor":327,"./Type":351}],330:[function(require,module,exports){
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

},{"../helpers/isFinite":360,"../helpers/timeConstants":367}],331:[function(require,module,exports){
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

},{"../helpers/isFinite":360,"./DateFromTime":317,"./Day":318,"./MonthFromTime":334,"./ToInteger":343,"./YearFromTime":353,"./floor":355,"./modulo":356,"get-intrinsic":372}],332:[function(require,module,exports){
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

},{"../helpers/isFinite":360,"../helpers/timeConstants":367,"./ToInteger":343}],333:[function(require,module,exports){
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

},{"../helpers/timeConstants":367,"./floor":355,"./modulo":356}],334:[function(require,module,exports){
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

},{"./DayWithinYear":320,"./InLeapYear":324}],335:[function(require,module,exports){
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

},{"../helpers/isNaN":362}],336:[function(require,module,exports){
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

},{"../helpers/timeConstants":367,"./floor":355,"./modulo":356}],337:[function(require,module,exports){
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

},{"./Type":351}],338:[function(require,module,exports){
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


},{"../helpers/isFinite":360,"./ToNumber":344,"./abs":354,"get-intrinsic":372}],339:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":367,"./DayFromYear":319}],340:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":367,"./modulo":356}],341:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],342:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":344}],343:[function(require,module,exports){
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

},{"../helpers/isFinite":360,"../helpers/isNaN":362,"../helpers/sign":366,"./ToNumber":344,"./abs":354,"./floor":355}],344:[function(require,module,exports){
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

},{"./ToPrimitive":346}],345:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":316,"get-intrinsic":372}],346:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":368}],347:[function(require,module,exports){
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

},{"./IsCallable":326,"./ToBoolean":341,"./Type":351,"get-intrinsic":372,"has":376}],348:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":372}],349:[function(require,module,exports){
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

},{"../helpers/isFinite":360,"../helpers/isNaN":362,"../helpers/sign":366,"./ToNumber":344,"./abs":354,"./floor":355,"./modulo":356}],350:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":344}],351:[function(require,module,exports){
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

},{}],352:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":318,"./modulo":356}],353:[function(require,module,exports){
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

},{"call-bind/callBound":307,"get-intrinsic":372}],354:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":372}],355:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],356:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":365}],357:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":367,"./modulo":356}],358:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":314,"./5/AbstractRelationalComparison":315,"./5/CheckObjectCoercible":316,"./5/DateFromTime":317,"./5/Day":318,"./5/DayFromYear":319,"./5/DayWithinYear":320,"./5/DaysInYear":321,"./5/FromPropertyDescriptor":322,"./5/HourFromTime":323,"./5/InLeapYear":324,"./5/IsAccessorDescriptor":325,"./5/IsCallable":326,"./5/IsDataDescriptor":327,"./5/IsGenericDescriptor":328,"./5/IsPropertyDescriptor":329,"./5/MakeDate":330,"./5/MakeDay":331,"./5/MakeTime":332,"./5/MinFromTime":333,"./5/MonthFromTime":334,"./5/SameValue":335,"./5/SecFromTime":336,"./5/StrictEqualityComparison":337,"./5/TimeClip":338,"./5/TimeFromYear":339,"./5/TimeWithinDay":340,"./5/ToBoolean":341,"./5/ToInt32":342,"./5/ToInteger":343,"./5/ToNumber":344,"./5/ToObject":345,"./5/ToPrimitive":346,"./5/ToPropertyDescriptor":347,"./5/ToString":348,"./5/ToUint16":349,"./5/ToUint32":350,"./5/Type":351,"./5/WeekDay":352,"./5/YearFromTime":353,"./5/abs":354,"./5/floor":355,"./5/modulo":356,"./5/msFromTime":357}],359:[function(require,module,exports){
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

},{"./isMatchRecord":361,"get-intrinsic":372,"has":376}],360:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],361:[function(require,module,exports){
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

},{"has":376}],362:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],363:[function(require,module,exports){
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

},{"call-bind/callBound":307}],364:[function(require,module,exports){
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

},{"get-intrinsic":372,"has":376}],365:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],366:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],367:[function(require,module,exports){
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

},{}],368:[function(require,module,exports){
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

},{"./helpers/isPrimitive":369,"is-callable":379}],369:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],370:[function(require,module,exports){
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

},{}],371:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":370}],372:[function(require,module,exports){
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

},{"function-bind":371,"has":376,"has-symbols":374}],373:[function(require,module,exports){
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

},{"get-intrinsic":372}],374:[function(require,module,exports){
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

},{"./shams":375}],375:[function(require,module,exports){
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

},{}],376:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":371}],377:[function(require,module,exports){
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

},{}],378:[function(require,module,exports){
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

},{}],379:[function(require,module,exports){
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

},{}],380:[function(require,module,exports){
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

},{"./isArguments":382}],381:[function(require,module,exports){
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

},{"./implementation":380,"./isArguments":382}],382:[function(require,module,exports){
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

},{}],383:[function(require,module,exports){
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

},{}],384:[function(require,module,exports){
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
},{"_process":383,"through":397,"timers":398}],385:[function(require,module,exports){
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

},{"buffer":289}],386:[function(require,module,exports){
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

},{"es-abstract/es5":358,"function-bind":371}],387:[function(require,module,exports){
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

},{"./implementation":386,"./polyfill":388,"./shim":389,"define-properties":312,"function-bind":371}],388:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":386}],389:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":388,"define-properties":312}],390:[function(require,module,exports){
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
},{"safe-buffer":385}],391:[function(require,module,exports){
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
},{"./lib/default_stream":392,"./lib/results":394,"./lib/test":395,"_process":383,"defined":313,"through":397,"timers":398}],392:[function(require,module,exports){
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
},{"_process":383,"fs":288,"through":397}],393:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":383,"timers":398}],394:[function(require,module,exports){
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
},{"_process":383,"events":290,"function-bind":371,"has":376,"inherits":378,"object-inspect":396,"resumer":384,"through":397,"timers":398}],395:[function(require,module,exports){
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
},{"./next_tick":393,"deep-equal":309,"defined":313,"events":290,"has":376,"inherits":378,"path":291,"string.prototype.trim":387}],396:[function(require,module,exports){
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

},{}],397:[function(require,module,exports){
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
},{"_process":383,"stream":292}],398:[function(require,module,exports){
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
},{"process/browser.js":383,"timers":398}],399:[function(require,module,exports){
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
},{}]},{},[255,256,257]);
