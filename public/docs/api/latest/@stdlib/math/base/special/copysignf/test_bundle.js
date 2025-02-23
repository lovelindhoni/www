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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of single-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float32
*
* @example
* var ctor = require( '@stdlib/array/float32' );
*
* var arr = new ctor( 10 );
* // returns <Float32Array>
*/

// MODULES //

var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
var builtin = require( './float32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":8}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array which represents an array of single-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":5,"./uint32array.js":6,"@stdlib/assert/has-uint32array-support":16}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test for native `Float32Array` support.
*
* @module @stdlib/assert/has-float32array-support
*
* @example
* var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
*
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./main.js":9}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var GlobalFloat32Array = require( './float32array.js' );


// MAIN //

/**
* Tests for native `Float32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float32Array` support
*
* @example
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/
function hasFloat32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat32Array( [ 1.0, 3.14, -3.14, 5.0e40 ] );
		bool = (
			isFloat32Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.140000104904175 &&
			arr[ 2 ] === -3.140000104904175 &&
			arr[ 3 ] === PINF
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./float32array.js":7,"@stdlib/assert/is-float32array":31,"@stdlib/constants/float64/pinf":43}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":11}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":13}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":15}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":12}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":17}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":18,"@stdlib/assert/is-uint32array":37,"@stdlib/constants/uint32/max":44}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

},{"./main.js":20}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var f;


// FUNCTIONS //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
}


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":100}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":22,"./object.js":23,"./primitive.js":24,"@stdlib/utils/define-nonenumerable-read-only-property":81}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":23,"./primitive.js":24}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":26,"@stdlib/assert/has-tostringtag-support":14,"@stdlib/utils/native-class":100}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

},{}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

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

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":25}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./main.js":28}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&

				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
}


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":35}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var isError = require( './main.js' );


// EXPORTS //

module.exports = isError;

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

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
}


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":90,"@stdlib/utils/native-class":100}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a Float32Array.
*
* @module @stdlib/assert/is-float32array
*
* @example
* var isFloat32Array = require( '@stdlib/assert/is-float32array' );
*
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* bool = isFloat32Array( [] );
* // returns false
*/

// MODULES //

var isFloat32Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat32Array;

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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasFloat32Array = ( typeof Float32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float32Array
*
* @example
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat32Array( [] );
* // returns false
*/
function isFloat32Array( value ) {
	return (
		( hasFloat32Array && value instanceof Float32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float32Array]'
	);
}


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":100}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

},{"./main.js":34}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":111}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":36,"@stdlib/assert/tools/array-function":40,"@stdlib/utils/define-nonenumerable-read-only-property":81}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
}


// EXPORTS //

module.exports = isObjectLike;

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

},{"@stdlib/utils/native-class":100}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isArray = require( '@stdlib/assert/is-array' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( format( 'invalid argument. Must provide a function. Value: `%s`.', predicate ) );
	}
	return every;

	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":19,"@stdlib/string/format":76}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":39}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Single-precision floating-point negative infinity.
*
* @module @stdlib/constants/float32/ninf
* @type {number}
*
* @example
* var FLOAT32_NINF = require( '@stdlib/constants/float32/ninf' );
* // returns -infinity
*/

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );
var v;


// MAIN //

/**
* Single-precision floating-point negative infinity.
*
* ## Notes
*
* Single-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111 00000000000000000000000
* ```
*
* This bit sequence corresponds to the unsigned 32-bit integer `4286578688` and to the HEX value `0xff800000`.
*
* @constant
* @type {number}
* @default 0xff800000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_NINF = 0xff800000;

// Set the ArrayBuffer bit sequence:
UINT32_VIEW[ 0 ] = FLOAT32_NINF;

v = FLOAT32_VIEW[ 0 ];


// EXPORTS //

module.exports = v;

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":4}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Single-precision floating-point positive infinity.
*
* @module @stdlib/constants/float32/pinf
* @type {number}
*
* @example
* var FLOAT32_PINF = require( '@stdlib/constants/float32/pinf' );
* // returns +infinity
*/

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );
var v;


// MAIN //

/**
* Single-precision floating-point positive infinity.
*
* ## Notes
*
* Single-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111 00000000000000000000000
* ```
*
* This bit sequence corresponds to the unsigned 32-bit integer `2139095040` and to the HEX value `0x7f800000`.
*
* @constant
* @type {number}
* @default 0x7f800000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_PINF = 0x7f800000;

// Set the ArrayBuffer bit sequence:
UINT32_VIEW[ 0 ] = FLOAT32_PINF;

v = FLOAT32_VIEW[ 0 ];


// EXPORTS //

module.exports = v;

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":4}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a single-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nanf
*
* @example
* var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
*
* var bool = isnanf( NaN );
* // returns true
*
* bool = isnanf( 7.0 );
* // returns false
*/

// MODULES //

var isnanf = require( './main.js' );


// EXPORTS //

module.exports = isnanf;

},{"./main.js":46}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a single-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnanf( NaN );
* // returns true
*
* @example
* var bool = isnanf( 7.0 );
* // returns false
*/
function isnanf( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnanf;

},{}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a single-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zerof
*
* @example
* var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
*
* var bool = isNegativeZerof( -0.0 );
* // returns true
*
* bool = isNegativeZerof( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZerof = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZerof;

},{"./main.js":48}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var NINF = require( '@stdlib/constants/float32/ninf' );


// MAIN //

/**
* Tests if a single-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZerof( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZerof( 0.0 );
* // returns false
*/
function isNegativeZerof( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZerof;

},{"@stdlib/constants/float32/ninf":41}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a single-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zerof
*
* @example
* var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
*
* var bool = isPositiveZerof( 0.0 );
* // returns true
*
* bool = isPositiveZerof( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZerof = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZerof;

},{"./main.js":50}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var PINF = require( '@stdlib/constants/float32/pinf' );


// MAIN //

/**
* Tests if a single-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZerof( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZerof( -0.0 );
* // returns false
*/
function isPositiveZerof( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZerof;

},{"@stdlib/constants/float32/pinf":42}],51:[function(require,module,exports){
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
* Return a single-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysignf
*
* @example
* var copysignf = require( '@stdlib/math/base/special/copysignf' );
*
* var z = copysignf( -3.0, 10.0 );
* // returns 3.0
*
* z = copysignf( 3.0, -1.0 );
* // returns -3.0
*
* z = copysignf( 1.0, -0.0 );
* // returns -1.0
*
* z = copysignf( -3.0, -0.0 );
* // returns -3.0
*
* z = copysignf( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":52}],52:[function(require,module,exports){
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

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
var toWord = require( '@stdlib/number/float32/base/to-word' );
var fromWord = require( '@stdlib/number/float32/base/from-word' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation


// MAIN //

/**
* Returns a single-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a single-precision floating-point number
*
* @example
* var z = copysignf( -3.0, 10.0 );
* // returns 3.0
*
* @example
* var z = copysignf( 3.0, -1.0 );
* // returns -3.0
*
* @example
* var z = copysignf( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysignf( -3.0, -0.0 );
* // returns -3.0
*
* @example
* var z = copysignf( -0.0, 1.0 );
* // returns 0.0
*/
function copysignf( x, y ) {
	var wx;
	var wy;

	x = float64ToFloat32( x );
	y = float64ToFloat32( y );

	// Convert `x` to an unsigned integer:
	wx = toWord( x );

	// Turn off the sign bit of `x`:
	wx &= MAGNITUDE_MASK;

	// Convert `y` to an unsigned integer:
	wy = toWord( y );

	// Leave only the sign bit of `y` turned on:
	wy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	wx |= wy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWord( wx );
}


// EXPORTS //

module.exports = copysignf;

},{"@stdlib/number/float32/base/from-word":56,"@stdlib/number/float32/base/to-word":58,"@stdlib/number/float64/base/to-float32":60}],53:[function(require,module,exports){
module.exports={"expected":[0.16390947997570038,0.17741049826145172,0.17633239924907684,-0.09937668591737747,-0.17492926120758057,0.49138107895851135,0.4879721999168396,0.3409014046192169,0.29603111743927,0.49294400215148926,0.30929866433143616,0.018742496147751808,0.3160450756549835,-0.0008204213809221983,-0.1695658266544342,0.5771421790122986,-0.3650011718273163,-0.27549561858177185,-0.6256791949272156,0.27315354347229004,-0.11017370969057083,-0.08591567724943161,-0.019510459154844284,-0.604396402835846,0.2518349587917328,0.36808595061302185,0.7224323153495789,0.567703902721405,-0.010503794066607952,-0.4211890995502472,0.1730017066001892,0.14716695249080658,-0.4726475179195404,0.4973057508468628,-0.7929930686950684,-0.441302627325058,0.2616303861141205,-0.9459652304649353,-0.4307897090911865,-0.36268311738967896,0.048557840287685394,0.6109356880187988,0.0751485526561737,-0.11446232348680496,-0.9925433397293091,-0.24378719925880432,0.7458689212799072,-1.0347713232040405,0.9299558401107788,-1.108157753944397,-0.1970641016960144,0.4612664580345154,0.8431442379951477,-0.4568299949169159,-0.7629883289337158,0.49360746145248413,-0.22049592435359955,1.1917293071746826,0.2610762417316437,0.44763270020484924,-1.092314600944519,-0.2736184298992157,-1.0649402141571045,-0.6888793110847473,-0.47331562638282776,1.3902745246887207,-0.12936770915985107,-0.03314552456140518,-0.9005795121192932,0.3354150652885437,1.356326937675476,0.08423946797847748,-1.5360571146011353,-1.5663427114486694,-1.4266254901885986,0.5889589190483093,0.3843419849872589,1.4933892488479614,-1.8328224420547485,1.4862945079803467,-0.3927731215953827,1.9212208986282349,1.5515795946121216,-1.2340718507766724,0.0048138899728655815,-0.9966809749603271,-1.6040858030319214,-0.8268719911575317,0.8850365281105042,-0.4202438294887543,1.8823206424713135,1.2420601844787598,0.11919307708740234,1.5175220966339111,-0.9658482670783997,-0.2224278748035431,0.33249005675315857,-0.07807408273220062,-2.3054540157318115,2.596453905105591,0.05289508402347565,-0.2790322005748749,0.3299397826194763,1.978955626487732,-2.7323057651519775,0.12114664912223816,-0.9054070711135864,-2.237013578414917,0.8168228268623352,-0.6564851999282837,-1.7222938537597656,3.128180503845215,1.3484201431274414,1.1462299823760986,-1.9178359508514404,-0.1694573163986206,3.3794026374816895,2.22418475151062,1.0175193548202515,1.4654393196105957,4.039455890655518,-2.5281176567077637,-1.1240025758743286,-1.69240140914917,-1.0936537981033325,-3.0801165103912354,-0.3561369478702545,-3.706244468688965,-0.4786240756511688,-3.2355568408966064,1.1319154500961304,1.8327065706253052,4.179240703582764,4.85785436630249,-0.9135448336601257,0.22230395674705505,3.475861072540283,-4.219207286834717,-2.1770565509796143,-0.44317325949668884,2.801795721054077,0.17766790091991425,-3.0706818103790283,0.2072368711233139,6.015251636505127,-5.068697929382324,5.881152629852295,5.3539628982543945,-1.1265984773635864,3.8811187744140625,1.730151653289795,6.558053016662598,3.1886186599731445,4.449847221374512,5.461958408355713,-2.666482448577881,-6.996956825256348,4.3184661865234375,-3.392521619796753,-2.8287689685821533,2.825561046600342,7.852718830108643,5.925490379333496,5.307723522186279,-2.655337333679199,0.0678354799747467,4.676330089569092,3.0861542224884033,-3.308459997177124,-5.956984996795654,-5.211745738983154,8.453361511230469,-8.724895477294922,-7.57435941696167,-2.2680256366729736,8.713016510009766,4.355711460113525,0.0744427889585495,4.373448371887207,4.5266947746276855,-3.361943483352661,5.127299785614014,-3.7992072105407715,8.910932540893555,1.8940900564193726,9.251111030578613,4.6686811447143555,0.1272599697113037,10.037120819091797,1.0782703161239624,1.7591464519500732,3.2850472927093506,-13.923357009887695,-2.7124292850494385,6.742124557495117,-13.974934577941895,11.853111267089844,-14.048827171325684,-8.807260513305664,-2.0480690002441406,-15.890495300292969,11.285120964050293,-4.792008876800537,12.366426467895508,-9.220491409301758,-16.78047752380371,-12.589882850646973,15.193556785583496,-9.862443923950195,-4.643677711486816,-5.068387508392334,6.052977085113525,0.4178391695022583,10.45095157623291,10.953493118286133,-17.853479385375977,-10.591062545776367,8.721418380737305,-0.19242994487285614,7.139888286590576,-13.58214282989502,9.965584754943848,8.628629684448242,-19.61918830871582,8.693117141723633,-21.51690101623535,19.89244842529297,-18.7230224609375,-0.45777973532676697,-11.297719955444336,16.793649673461914,-8.926749229431152,-20.157262802124023,16.763418197631836,13.87546443939209,-22.33013343811035,-13.619887351989746,-20.835397720336914,12.838163375854492,-26.62335777282715,-11.429534912109375,21.430957794189453,0.5243489146232605,8.582876205444336,15.4364595413208,16.793771743774414,-32.5208854675293,-25.763532638549805,2.0341367721557617,4.553894996643066,13.019928932189941,11.991907119750977,-6.817974090576172,-2.7661216259002686,16.215761184692383,20.079980850219727,28.88783073425293,14.02102279663086,10.111291885375977,-9.731059074401855,8.089550018310547,43.60093688964844,29.645410537719727,-16.4378604888916,4.080965518951416,8.409317970275879,-7.437786102294922,20.488780975341797,19.023866653442383,-27.985111236572266,35.71626663208008,53.177825927734375,33.899681091308594,38.701778411865234,-60.2728157043457,46.250675201416016,-49.62556457519531,-7.439086437225342,60.43344497680664,18.549545288085938,-4.1874284744262695,35.83077621459961,5.551090717315674,25.621673583984375,44.53787612915039,-5.959287643432617,12.901060104370117,43.70757293701172,-24.09247589111328,-0.5187585949897766,54.75581359863281,-69.12527465820312,-19.570199966430664,-38.36020278930664,-80.00547790527344,35.30550003051758,-33.26262283325195,13.33659553527832,88.57068634033203,53.74416732788086,82.43169403076172,3.8196730613708496,44.184043884277344,63.76070785522461,63.720947265625,-85.00387573242188,-98.67569732666016,51.27690124511719,-1.9263641834259033,63.99650955200195,15.03432559967041,89.30550384521484,-99.00045776367188,36.37162780761719,-102.37142944335938,33.92371368408203,-39.424400329589844,87.09545135498047,55.72795486450195,-6.564014911651611,-131.4588623046875,92.82127380371094,-13.233418464660645,24.60902976989746,66.73882293701172,-132.76443481445312,105.03406524658203,99.67430114746094,-62.716590881347656,-60.70638656616211,-35.49585723876953,-131.1391143798828,30.590900421142578,82.453857421875,57.46230697631836,-94.80921936035156,-107.71790313720703,-59.1127815246582,-134.78216552734375,61.70934295654297,-159.02755737304688,45.48247146606445,-148.8025665283203,101.11576080322266,205.32228088378906,163.2877197265625,184.4635467529297,-128.31625366210938,78.20352172851562,116.9819564819336,-88.08817291259766,-47.51617431640625,-155.04957580566406,59.582149505615234,-136.59925842285156,-193.986328125,117.69913482666016,-58.43017578125,52.539031982421875,-180.3975067138672,61.68259048461914,-261.867919921875,-148.675048828125,27.870914459228516,-247.40267944335938,-192.74952697753906,0.8493172526359558,25.712127685546875,261.0455627441406,60.31364440917969,168.4949188232422,-325.5363464355469,-23.111591339111328,125.45279693603516,106.33160400390625,115.61592864990234,-116.90057373046875,105.53917694091797,-223.39501953125,-256.9246520996094,-181.2147979736328,117.40105438232422,369.4042663574219,322.15850830078125,-328.0469055175781,417.0895690917969,-318.1668701171875,-429.6959228515625,-413.3526916503906,403.07025146484375,198.40318298339844,140.52366638183594,152.37010192871094,-199.48666381835938,360.1226806640625,294.07049560546875,-118.80645751953125,-59.675411224365234,0.3231492042541504,377.17962646484375,243.8986053466797,-415.1178283691406,-459.4206237792969,-538.1993408203125,-161.2109832763672,-90.1253890991211,-509.08563232421875,-438.5242919921875,176.72882080078125,-194.20480346679688,334.30841064453125,232.65093994140625,-140.88478088378906,-531.81005859375,-551.5360717773438,-341.90509033203125,-209.1575164794922,-483.67608642578125,-640.097900390625,-643.2876586914062,653.6963500976562,-312.0966491699219,592.7056884765625,-585.6439208984375,-400.7239990234375,-710.7198486328125,-206.50843811035156,-534.4703979492188,593.3109130859375,-798.5231323242188,753.9283447265625,-666.2205200195312,-573.6994018554688,558.7852172851562,120.7817153930664,-778.54052734375,-68.92882537841797,-610.9812622070312,1055.723876953125,734.5311889648438,-1019.7610473632812,-47.37622833251953,-545.9259643554688,-558.0863647460938,1167.8089599609375,270.403564453125,-575.25,369.4997863769531,1243.440673828125,535.06298828125,-1259.64794921875,-549.12939453125,-689.3191528320312,906.49609375,993.7135009765625,676.0762939453125,-887.9119262695312,85.4851303100586,1161.6566162109375,-1307.666259765625,-546.2069702148438,-399.6806335449219,1071.154052734375,-306.4884948730469,568.8560180664062,546.232177734375,115.52466583251953,1203.0882568359375,960.6669921875,-695.3493041992188,-1453.3388671875,563.4910888671875,-1245.4681396484375,-904.2647705078125,1158.009521484375,-895.30517578125,1523.0072021484375,2077.62548828125,-985.452392578125,1565.544189453125,491.9247131347656,2108.87890625,-1918.10986328125,-2176.44921875,364.2140808105469,36.42549514770508,-67.7793960571289,2373.87646484375,2326.852783203125,-1930.6309814453125,622.5875244140625,645.8900146484375,-2009.2808837890625,497.65606689453125,-176.57366943359375,2244.39306640625,53.34918212890625,-1033.1981201171875,-228.80914306640625,850.2298583984375,1643.073974609375,-1543.0185546875,2820.163818359375,-571.77099609375,2997.72021484375,-400.99267578125,2074.41259765625,2219.759521484375,241.0549774169922,-1096.7933349609375,2595.957275390625,2183.147216796875,1270.91015625,891.7335815429688,-2667.390625,-2434.227294921875,-1852.0721435546875,1253.2550048828125,-3306.23876953125,1290.394775390625,1726.6422119140625,3643.614990234375,2131.27587890625,3966.483642578125,-2450.370361328125,2855.301025390625,4534.6025390625,-946.5574340820312,3371.79541015625,1848.3214111328125,-1862.180908203125,-1829.6353759765625,-3366.1474609375,88.15815734863281,2777.27001953125,1316.81103515625,2912.4736328125,3057.12744140625,-4420.68701171875,-1283.55615234375,4745.62109375,-5004.76416015625,3965.189208984375,6504.01123046875,4397.4072265625,-2993.440673828125,5549.6298828125,6045.80859375,-5764.0732421875,-4484.74169921875,-2828.259765625,1374.462158203125,3355.0654296875,-2033.4842529296875,-4053.39892578125,226.015380859375,7169.89501953125,-820.27197265625,2646.18505859375,-6923.54345703125,-1026.5701904296875,-6409.90576171875,-7095.21728515625,5509.927734375,231.84967041015625,815.5526733398438,-8508.5771484375,-7989.3046875,3265.494140625,-2837.830078125,3538.379638671875,8684.9130859375,-10413.623046875,10137.521484375,-873.6587524414062,-9663.4130859375,-3941.467529296875,-1351.419921875,8620.6025390625,-10814.970703125,869.2523803710938,9405.70703125,5857.39892578125,5610.4755859375,-9231.9140625,2724.6611328125,9621.3525390625,8686.6982421875,13288.859375,-7731.13037109375,1329.7532958984375,7440.5048828125,-2495.962646484375,-14617.5458984375,12604.5830078125,9276.9296875,-216.94601440429688,1886.9876708984375,475.3821716308594,6383.8349609375,-5845.00341796875,-647.1842041015625,16081.7197265625,-11216.2841796875,-1041.9281005859375,-18447.32421875,-5265.8896484375,14406.443359375,8248.8505859375,8609.16796875,5232.15380859375,-5576.92822265625,-13671.337890625,10985.171875,-22423.236328125,12845.732421875,-22316.4609375,8888.22265625,-20.93508529663086,12660.794921875,21851.796875,5203.07470703125,-20622.642578125,-10359.078125,8524.6611328125,-9019.2001953125,25288.162109375,-26639.654296875,20371.962890625,2003.829345703125,-15258.244140625,-7151.2041015625,9602.2353515625,-1497.185546875,-14924.65625,-24401.728515625,-32694.630859375,10912.5107421875,33539.33984375,-21194.716796875,-5513.23291015625,18291.623046875,9620.212890625,-2338.815185546875,23979.708984375,-21049.9765625,-167.34921264648438,-36410.46875,-23650.935546875,2160.14990234375,-32510.546875,-43610.34765625,12860.1279296875,37432.953125,23230.369140625,-5169.4755859375,19415.162109375,39448.765625,-28021.25,23298.39453125,-48040.02734375,-8680.916015625,41274.234375,32527.716796875,47150.1484375,-11277.591796875,-39497.05078125,-50559.39453125,-57211.79296875,-5917.9677734375,36899.609375,7890.42041015625,36191.11328125,26649.65625,54193.90625,208.28887939453125,19168.046875,37423.265625,66352.546875,-11541.6689453125,63129.203125,-28584.712890625,-19019.529296875,43388.32421875,-73889.75,39072.5234375,46121.80859375,-62632.70703125,72941.8125,83495.7578125,34019.62890625,-48917.70703125,-48505.125,-56083.125,-20365.837890625,-65858.4765625,-28754.64453125,27294.76953125,60700.3984375,-98067.0234375,93382.8515625,-80742.3671875,67609.1640625,-7426.361328125,-35007.98046875,-87966.125,-105715.9140625,-49330.76953125,82198.734375,6100.4921875,-25061.802734375,-31864.4921875,-75322.1328125,-53622.703125,58797.44140625,-130509.4609375,-66583.671875,3619.75048828125,105575.0,67813.265625,104721.7578125,-127887.0234375,21845.03515625,-74903.8515625,29724.3203125,148934.875,-32792.3203125,-76403.03125,-67591.5859375,150562.265625,-140749.546875,-174914.15625,97034.25,-41700.46484375,31831.765625,-25556.419921875,-87368.5390625,67263.0,123375.421875,-14630.2177734375,1034.1788330078125,197888.546875,163584.078125,-211979.203125,-94189.2109375,62830.390625,134947.203125,-65351.66015625,-1588.7845458984375,180426.734375,226658.28125,-150900.109375,-24605.951171875,161283.390625,-188523.921875,31532.603515625,-153070.328125,-136594.3125,249579.734375,-247605.125,108065.3359375,-71283.703125,-30606.2890625,-136021.890625,167108.859375,97145.09375,-242860.734375,-165690.671875,280654.78125,21008.17578125,4141.30712890625,33051.8125,118871.0234375,195566.359375,-200479.6875,-219186.71875,118152.8984375,-16906.794921875,-148669.1875,-32356.650390625,190071.15625,-62094.828125,-176673.84375,-240663.4375,-37663.3984375,-443840.34375,115493.1171875,-448478.5625,38601.2265625,-4088.41552734375,-343693.625,11781.994140625,319479.71875,187217.40625,49365.875,-153910.203125,345259.625,351056.65625,381564.8125,287076.8125,-334879.8125,283224.09375,615699.375,-617249.9375,564436.375,596565.0,479949.53125,-269485.28125,202330.4375,131672.515625,-286122.6875,447802.21875,367475.90625,-37455.16796875,618856.0625,-221633.421875,-662295.625,725405.5,-132150.890625,-360015.65625,555102.875,352161.625,308288.53125,-460125.3125,625080.25,639870.375,659080.6875,-758595.8125,292698.3125,124336.6953125,797105.5625,-966650.4375,771138.4375,-1.0061451875e6,633079.375,101564.203125,805286.875,-444299.34375,-983565.9375,974529.5,15490.0263671875,-962588.5,-1.095477625e6,-879438.8125,-323360.21875,-1.043914e6,-854032.0,533157.9375,385638.09375,-209503.125,507155.15625,408353.9375,1.383567e6,-419812.375,-1.472057875e6,-425892.75,-257581.703125,-1.503067625e6,-289468.6875,-781115.9375,-1.688135375e6,862183.6875,-516587.75,-1.559966625e6,939651.6875,406275.0,1.781351125e6,938539.0,1.080640875e6,18417.708984375,126629.609375,-1.236505125e6,703203.3125,-512897.71875,473577.3125,-1.671117625e6,69549.640625,1.15572025e6,570507.1875,-2.22262625e6,2.093341375e6,1.381617125e6,1.39851225e6,-391881.0,1.264525e6,1.545512375e6,-931132.25,1.843270875e6,1.533882625e6,-1.05504975e6,-2.067367e6,710152.5,-871064.25,-604472.75,653920.1875,1.5484445e6,1.97314025e6,-1.9300905e6,-1.281492625e6,137833.640625,2.459804e6,-2.030123e6,-3.33091225e6,1.8501985e6,-3.55760325e6,2.037157625e6,1.40741575e6,410268.09375,-1.521125625e6,2.01325175e6,-1.855685625e6,3.341691e6,-2.22893975e6,-1.062004625e6,1.861095125e6,733388.75,178135.6875,-3.8825635e6,-788619.3125,-3.12488025e6,-3.32866875e6,555986.875,3.591256e6,-2.70050425e6,-2.33601675e6,-749807.125,281144.84375,-1.416727375e6,3.6144015e6,-3.086098e6,-4.16102125e6,1.136538125e6,-4.858082e6,-4.235142e6,3.52232425e6,-2.46939975e6,-722981.75,3.56215925e6,-1.650634375e6,5.0556725e6,987514.4375,111477.375,2.84502225e6,143584.640625,-840239.0,-4.056562e6,-7.5226735e6,-5.0189595e6,-3.8430735e6,2.255573e6,-7.7193985e6,4.5664455e6,-4.160244e6,-2.1604395e6,4.3973025e6,-8.863884e6,9.037906e6,3.938028e6,-5.4625395e6,396168.25,-8.553064e6,-171309.125,7.7575885e6,4.700132e6,5.904701e6,3.454468e6,-1.008056e7,-1.3414005e6,9.349362e6,-7.1521395e6,1.737041125e6,-8.835528e6,1.0639881e7,-6.2027265e6,8.657128e6,-3.76487825e6,-8.407675e6,-1.8835345e6,7.2702665e6,1.2244515e7,2.4938085e6,6.792034e6,-2.5464745e6,1.994638e6,-8.525583e6,-9.411357e6,1.031847e7,1.4002065e7,6.532373e6,-6.812353e6,-7.690915e6,7.657697e6,-9.288994e6,-5.0217665e6,-1.1406192e7,7.498857e6,-4.2050915e6,-7.937346e6,-1.0962921e7,-8.569031e6,-2.88011475e6,5.134205e6,-1.7429518e7,-6.4539635e6,-1.7504008e7,-1.4885414e7,-1.3943673e7,2.1883944e7,2.879301e6,2.2269996e7,-3.793978e6,2.1958096e7,-2.0875856e7,-2.1161154e7,-1.6545739e7,-1.988405e7,-1.4654559e7,767197.1875,-9.12787e6,-1.9850098e7,-5.7007445e6,-5.137868e6,-2.2984154e7,-2.948748e7,-2.5287295e6,-1.853785e7,4.6638615e6,3.863706e6,-8.691044e6,-596292.875,2.5088996e7,-5.378908e6,1.3325107e7,1.6254129e7,3.1435584e7,1.83746e7,3.0111742e7,3.7147505e6,-3.7455496e7,2.4630782e7,-2.3438778e7,2.8833052e7,-4.1147408e7,-2.2553426e7,1.334224e7,4.172534e7,5.404232e6,-3.5630856e7,3.040797e7,-2.0009954e7,-3.4405328e7,3.0112738e7,1.6863072e7,2.5803402e7,-3.2148246e7,-2.326306e7,-5.2325632e7,-2.2246166e7,-1.6413593e7,-3.1903506e7,5.3095232e7,2.2161518e7,-2.7627464e7,-2.2717862e7,-1.1521491e7,-5.2398136e7,-2.63784e7,2.9643118e7,2.083527e7,-8.186477e6,1.742445e7,6.5305568e7,-4.9542816e7,-6.3540655e6,-6.9894264e7,-3.1290414e7,5.541612e7,-2.4558538e7,1.7371904e7,595805.5625,-7.6309864e7,694851.3125,-4.8595284e7,-569955.3125,-5.8428312e7,-3.0412386e7,-4.6258424e7,-5.5268616e7,7.8316784e7,3.777882e7,-4.807566e7,-7.8540888e7,2.364137e7,-7.9609472e7,-3.0988912e7,3.5472288e7,7.4620208e7,9.888264e7,-4.2582952e7,-8.7514624e7,5.8129944e7,8.994508e7,-9.661304e7,-5.5931384e7,-7.8202536e7,-6.2819736e7,-5.8545564e7,1.27703936e8,-1.6093216e7,-9.4157584e7,-3.0823874e7,-4.0578836e7,4.28342e6,1.32758272e8,-1.3745928e8,-8.0112864e7,-9.4962856e7,9.7006096e7,-4.8892936e7,-2.5908506e7,-7.4657368e7,-1.1199208e8,-1.62465312e8,-3.6442055e6,1.05752808e8,-1.09866336e8,6.22621e7,8.717792e7,-1.09844408e8,1.6891928e8,1.0432776e8,-5.1326172e7,6.5923828e7,1.23454152e8,2.01823776e8,1.03341744e8,-1.56487776e8,-9.1837696e7,-1.48362048e8,1.03962936e8,2.031428e8,-1.07427392e8,-2.29709104e8,1.76274992e8,2.42198176e8,-1.1330778e7,-1.44053904e8,-1.87387968e8,2.634744e8,-1.77598048e8,1.09112672e8,1.41165568e8,1.69455232e8,4.392292e7,-7.77404e7,-1.84559936e8,1.16764456e8,8.2997024e7,1.45023008e8,-2.1728506e7,-2.0813256e8,1.11918856e8,2.34429088e8,1.60491808e8,-2.93840224e8,1.87762e8,1.42590448e8,1.89478272e8,-1.78925504e8,-2.18133264e8,-1.11952568e8,-3.7522296e7,-1.51420064e8,-2.80495552e8,-1.9087272e8,2.75946112e8,-9.9212968e7,4.6745352e7,2.05745232e8,3.69882048e8,-8.6729192e7,3.31375744e8,-1.13701568e8,-1.6510987e7,-5.9565348e7,-2.2003768e8,-1.39297904e8,-4.35998688e8,-1.08013512e8,2.38553008e8,2.1593256e8,-3.67097056e8,-3.5980368e7,4.2155904e8,-4.55019552e8,5.5076192e8,2.2462716e7,-5.64752832e8,1.45942432e8,-3.70835648e8,-342281.125,-5.76817344e8,6.78573376e8,1.4049236e7,5.6512564e7,6.46551424e8,-4.65557024e8,4.11554304e8,-1.82834528e8,-7.07925312e8,1.81386416e8,3.64438784e8,6.0217764e7,5.66680448e8,-4.6693232e8,-7.06839424e8,-3.176016e8,-7.75359232e8,-4.1664576e8,4.0164496e8,5.875648e8,-3.67271104e8,-5.50537536e8,-3.96948224e8,9.23833728e8,9.57928576e8,2.47666544e8,-6.18114624e8,7.55666048e8,-1.084713984e9,-8.171647e6,5.31693664e8,9.95259968e8,-3.86366112e8,-2.6737392e8,1.55814752e8,-5.9482784e7,1.043297536e9,5.65720128e8,1.48850176e8,-9.1712352e8,-7.77994432e8,-1.028346368e9,4.72616032e8,7.42930496e8,-1.13968064e9,-1.60579536e8,1.028821248e9,-4.9819712e8,-1.171343104e9,1.7843656e7,1.453096448e9,2.75437696e8,-7.36516608e8,1.22294208e9,-1.31950976e9,-1.41079296e9,1.715981696e9,1.128123776e9,-1.37718368e8,-6.86336128e8,-2.60313296e8,4.86714976e8,-5.16072256e8,-5.07191712e8,-1.898920192e9,2.01304e9,-2.04018432e9,3.7003504e8,-2.066115712e9,1.54639552e9,7.66853504e8,-3.9528e6,1.75267648e9,1.410868224e9,-2.629837e7,8.87756928e8,-2.436783104e9,-1.111905664e9,2.318071296e9,1.337104512e9,6.09650432e8,-2.650002176e9,6.136464e8,2.442480128e9,2.665680896e9,-2.680791552e9,2.80925312e8,1.781076864e9,2.35418752e9,-2.307176704e9,2.43265024e8,3.201961984e9,1.887264768e9,-1.684620672e9,-7.30539264e8,-4.3045456e8,2.96065792e9,-1.483106048e9,-3.134179584e9,9.97936e8,-6.19432128e8,1.26369408e9,-3.758106368e9,3.805061376e9,2.019819776e9,-1.20936896e9,-1.89495936e9,3.444787712e9,2.24818816e9,1.470831616e9,-2.271870464e9,4.4549248e9,6.61192768e8,3.844004096e9,-2.053655936e9,-4.707297792e9,-4.221696768e9,3.279051008e9,1.29740416e9,1.992719488e9,4.115079936e9,1.701518976e9,5.037858816e9,-5.048454144e9,-3.18674176e9,-1.72939456e9,2.087134464e9,-5.340726272e9,5.36026624e9,-4.434600448e9,-5.280431104e9,-6.357907968e9,-1.01439872e9,2.74664384e8,-2.35587888e8,7.04534784e9,3.997887232e9,-2.616509696e9,6.759259136e9,3.948748544e9,9.46959872e8,-6.013327872e9,-5.657696768e9,-1.747501696e9,1.916381184e9,-1.403698048e9,6.661410304e9,8.54649856e9,4.832315392e9,3.213538816e9,5.991214592e9,-2.359689984e9,-1.380079872e9,2.88586912e8,8.177383424e9,-9.645077504e9,1.7580456e8,-7.147216384e9,4.359481344e9,-2.438371072e9,-9.719764992e9,-5.383309824e9,1.215515392e9,-5.73225216e9,-1.0447900672e10,9.92030208e9,1.70876352e9,-4.319076864e9,6.430926336e9,-5.248875008e9,1.1090825216e10,-5.499101696e9,1.0603378688e10,-3.978515712e9,6.250441728e9,1.1665770496e10,-1.2359677952e10,-9.789906944e9,1.4695677952e10,-1.1290089472e10,-5.759117312e9,-2.751337728e9,-1.2175468544e10,1.0362150912e10,8.953563136e9,-4.949940224e9,-1.0005552128e10,-9.664710656e9,9.306962944e9,3.15145216e9,-1.7938264064e10,-1.5587784704e10,1.8653329408e10,2.012469504e9,-5.231453184e9,-1.500239872e10,-7.159030272e9,2.0024592384e10,1.781561344e10,4.333793792e9,1.3260204032e10,-1.0508234752e10,-1.419947008e10,1.4865301504e10,1.9254585344e10,-6.896449024e9,9.679186944e9,1.5470814208e10,1.6552180736e10,1.2382708736e10,1.3818660864e10,4.909051904e9,-2.6821029888e10,-2.1862711296e10,-1.5303574528e10,-2.2386743296e10,1.7099680768e10,2.8096915456e10,-1.98888448e10,-6.020830208e9,2.4488400896e10,1.8960355328e10,-2.673096704e9,-2.774648832e10,2.3214166016e10,-2.5118896128e10,2.435145728e10,2.4593549312e10,1.5569543168e10,5.979846656e9,-2.485977088e10,3.4300153856e10,-3.2972423168e10,7.60184576e9,-3.9523221504e10,3.9704178688e10,-1.7083802624e10,1.1842788352e10,-5.650813952e9,2.008868096e9,-1.25907392e9,-2.4799848448e10,2.963593216e10,-2.9108166656e10,-1.7793849344e10,-3.0200283136e10,-3.8005649408e10,2.3719389184e10,1.9378024448e10,-4.98156544e10,-3.05642496e8,2.2584301568e10,4.5083246592e10,3.8195011584e10,1.3838466048e10,-1.330291712e10,2.7224246272e10,2.0469755904e10,1.7210150912e10,-3.2811286528e10,-3.8610685952e10,2.3594694656e10,-5.0211217408e10,2.9154543616e10,-4.6088306688e10,3.0629347328e10,2.363100672e9,-2.7423762432e10,1.6386408448e10,-3.0450849792e10,-9.534359552e9,4.1195040768e10,-7.1637417984e10,-3.0107705344e10,-6.7224670208e10,6.9278408704e10,-4.2483273728e10,3.4411245568e10,-3.541624832e10,5.3535916032e10,-1.357021696e10,4.3231879168e10,5.7352302592e10,-1.278560256e10,-1.3709914112e10,4.16777216e10,2.2011394048e10,8.3850051584e10,2.3985498112e10,-1.9242469376e10,6.486390784e10,5.556798976e9,-1.02898786304e11,-2.681145344e10,9.434169344e10,5.0768154624e10,9.8548555776e10,-8.609910784e10,-1.17186813952e11,2.7123398656e10,1.24611018752e11,-7.1672758272e10,-6.1518749696e10,-6.9134802944e10,-7.9897780224e10,7.7805797376e10,-1.894795264e10,-1.787501568e9,7.5867185152e10,-9.771708416e10,-5.6054095872e10,-5.453770752e10,-1.54374291456e11,3.944654848e10,4.4716302336e10,1.14764398592e11,2.8075421696e10,-5.3368098816e10,1.9373971456e10,-2.0622036992e10,3.1275671552e10,-6.032896e10,-1.30282528768e11,1.36380530688e11,-4.4261584896e10,1.38172121088e11,-3.6407394304e10,-1.47060670464e11,5.2638359552e10,-4.3264258048e10,-1.56932816896e11,5.4587977728e10,-4.354742272e10,1.26408851456e11,1.0429964288e11,1.87903475712e11,8.9942327296e10,-1.4787698688e11,1.7340858368e10,1.60464748544e11,-9.7022640128e10,-3.958450176e10,-4.0696143872e10,9.338200064e10,1.76688791552e11,-1.91575293952e11,-2.05971881984e11,-2.44314750976e11,4.226390016e10,-1.6897859584e11,-2.6166990848e10,-2.69020004352e11,-1.53571835904e11,-1.53217482752e11,-3.16733423616e11,-6.0575797248e10,9.2496740352e10,4.5258469376e10,-3.33820362752e11,-9.8014437376e10,7.02390016e9,1.80975681536e11,-8.4161632e8,-2.9521958912e10,3.42850011136e11,-2.37643923456e11,8.8514732032e10,-5.741836288e10,5.5999864832e10,-1.57156261888e11,-1.78926747648e11,-2.9567500288e11,3.44569085952e11,2.70863630336e11,1.55517943808e11,2.0580089856e11,1.26514618368e11,5.0820468736e10,2.59445161984e11,-1.99123304448e11,2.8524544e11,4.65694621696e11,4.74791575552e11,4.20310089728e11,-1.65665488896e11,1.76928997376e11,1.30093088768e11,2.93403557888e11,-1.72012716032e11,-4.04009582592e11,-1.2307562496e11,-5.9377565696e10,6.22173421568e11,2.1979447296e11,-2.64716107776e11,-9.9715883008e10,-6.09117995008e11,1.71813388288e11,-2.3657078784e11,-2.54090657792e11,-2.73963548672e11,5.792587776e10,7.34770495488e11,-5.56590497792e11,-5.2881539072e11,-1.19252426752e11,-4.72572952576e11,5.8121814016e11,-8.42682400768e11,7.1190020096e11,1.12452755456e11,8.16824844288e11,-6.7223322624e11,7.45962405888e11,4.15961055232e11,-6.1467394048e11,-9.44010756096e11,7.89979856896e11,-7.92099422208e11,-7.6706889728e10,2.71430959104e11,-6.88738074624e11,1.053222912e11,-2.56452378624e11,1.07129929728e12,7.012544512e10,3.23052535808e11,-1.02325223424e12,-3.75940186112e11,9.55952857088e11,9.67697170432e11,8.14565490688e11,4.49825538048e11,4.02355126272e11,1.06061889536e12,-1.323968495616e12,-1.07148673024e12,-1.24236570624e11,1.182349787136e12,-7.5885010944e10,-1.77266262016e11,1.094408863744e12,-1.089014136832e12,3.41776760832e11,5.5943692288e11,5.47846651904e11,3.02743617536e11,1.493970976768e12,-4.16644694016e11,-1.175964090368e12,1.459742441472e12,1.441281212416e12,1.083344224256e12,1.31080126464e12,-1.549878951936e12,1.578976280576e12,-5.19098171392e11,-3.12182767616e11,-1.46045648896e11,-3.37901518848e11,-4.03365199872e11,-1.521224384512e12,-6.18936336384e11,-2.51074985984e11,-4.04270022656e11,-1.645253492736e12,9.272672256e11,-1.095017299968e12,1.952376160256e12,-2.29854871552e11,7.82787280896e11,1.603693969408e12,-3.912095744e10,2.391792943104e12,4.98698420224e11,-1.143523770368e12,4.76683272192e11,1.064930443264e12,-2.1117206528e12,-1.307626176512e12,2.186042277888e12,-2.000595058688e12,-1.379222028288e12,1.7825169408e12,3.027868844032e12,1.622116139008e12,1.3470429184e10,3.290035126272e12,-2.92961124352e12,1.036287606784e12,2.394570620928e12,-3.557231951872e12,2.371555426304e12,-2.25413300224e11,2.36577357824e12,3.288640520192e12,-2.77117140992e12,2.712130289664e12,1.049042747392e12,-2.9361242112e12,4.186516226048e12,-9.547638784e9,5.390761984e11,3.94046210048e12,-2.646571483136e12,-4.035349315584e12,3.62395860992e12,3.931778842624e12,-2.23308283904e12,4.729500336128e12,4.72164630528e11,1.565792141312e12,4.967933411328e12,-1.399894966272e12,4.3584651264e12,2.20913205248e12,-2.86080630784e12,2.573272088576e12,-1.06914578432e12,-1.80985331712e12,2.537322971136e12,-3.429587484672e12,-2.852950376448e12,-2.954025238528e12,4.57307062272e12,-4.730214416384e12,2.724145659904e12,3.06434801664e12,-1.77716789248e12,6.377869672448e12,6.013752180736e12,-4.123345289216e12,6.359672160256e12,2.3809032192e12,-1.79085508608e11,2.619177172992e12,-1.552401563648e12,2.64520056832e11,-3.436985974784e12,3.0694572032e12,-8.132180836352e12,5.21055502336e12,-2.183445741568e12,5.953656717312e12,-7.66862688256e12,9.103601565696e12,6.81262972928e12,1.70715316224e12,6.083798106112e12,8.002513403904e12,7.758011695104e12,-1.360708108288e12,3.862667198464e12,6.854658752512e12,1.48307050496e12,1.132115787776e12,-5.923503341568e12,-1.0268852617216e13,1.0393187516416e13,3.942570262528e12,-7.09543067648e12,-7.698950127616e12,7.470735425536e12,-1.0515553189888e13,7.034433437696e12,3.15086897152e11,9.860328456192e12,-1.2244270186496e13,5.73913432064e12,-8.685469827072e12,9.326157627392e12,-6.469044404224e12,2.14989389824e11,-1.815274192896e12,-1.351265026048e12,-4.407184850944e12,-1.156586668032e12,-5.5539007488e11,-1.091398795264e13,1.0577917247488e13,3.599479341056e12,1.6083402620928e13,2.923005476864e12,1.327987949568e13,3.918687371264e12,4.28954484736e12,1.6076291178496e13,1.4266654523392e13,-7.241881092096e12,-1.117943103488e12,3.575557390336e12,1.323708186624e13,3.574986440704e12,-7.545097289728e12,-1.9303925547008e13,-1.7680159473664e13,-6.95383621632e12,3.730773377024e12,2.925957742592e12,1.389104201728e12,-2.629586649088e12,2.2830758494208e13,-1.9377407655936e13,-1.5275983372288e13,8.427331387392e12,-1.7638403080192e13,-5.870246690816e12,9.61405779968e12,8.48353099776e11,-1.910897639424e13,-2.319665856512e12,2.989240614912e12,2.4233941925888e13,1.8544882352128e13,2.9847403364352e13,7.69376452608e11,1.7210122698752e13,4.015027126272e12,-3.36789602304e11,-3.3871192129536e13,2.7986675892224e13,1.3328786128896e13,-3.4672180461568e13,9.162402562048e12,-5.425137188864e12,-1.8826657792e13,-1.7299053477888e13,1.7172684341248e13,2.2089717252096e13,-1.0334320459776e13,1.4900928708608e13,-6.387291652096e12,-1.634563260416e13,3.01712539648e13,2.7183428927488e13,-4.634540244992e12,-3.8929449353216e13,3.6483863937024e13,-3.508607647744e12,4.4093707124736e13,-4.076106416128e13,3.4112670793728e13,3.5102425874432e13,8.332093947904e12,-3.6859698741248e13,-3.953127325696e13,-6.489436585984e12,7.6673712128e12,-3.2384261029888e13,4.453117198336e12,-5.0762960863232e13,2.759240974336e12,-2.1509718409216e13,1.3300254375936e13,4.256320978944e13,2.157070778368e13,-1.593884278784e13,-1.817369903104e13,1.7778610274304e13,-2.801791926272e13,1.333438971904e13,-6.5984845053952e13,-2.6172345810944e13,5.9350894772224e13,1.9889962090496e13,6.6087286734848e13,6.9238358278144e13,-7.623138607104e12,7.72668391424e13,5.9528817147904e13,-1.184198295552e12,1.213666951168e13,8.2335722635264e13,-4.13907419136e12,-5.0499827007488e13,-6.2172075917312e13,4.375397269504e13,-2.0194569224192e13,-2.50853982208e13,9.4558134206464e13,3.6371716636672e13,-3.827342245888e13,-5.9162239172608e13,5.8127311437824e13,1.0237684744192e13,-1.07168963493888e14,-9.6580208164864e13,9.9762720210944e13,8.7940654956544e13,-5.0212563320832e13,6.906472562688e12,6.527879479296e12,-9.1810957361152e13,7.9213625344e12,9.8894289567744e13,-9.6403032375296e13,-5.3787704164352e13,-8.5057230340096e13,-1.1258766032896e14,-9.7673445113856e13,1.9372246564864e13,1.3788812148736e14,5.9745041907712e13,-4.7936356483072e13,6.2629993250816e13,-1.10670771126272e14,1.1606685646848e13,9.95299950592e13,-1.36001464827904e14,-5.3897947250688e13,-1.8427152433152e13,2.1376987561984e13,1.00866753298432e14,1.0682837762048e14,6.993039327232e13,-1.23859340623872e14,-7.2488167931904e13,-1.67606266888192e14,-4.517334614016e13,-2.481233854464e13,1.45321610969088e14,-1.10385139023872e14,-6.5700810981376e13,1.23728000188416e14,1.22231153754112e14,-1.34835741917184e14,-1.79049099952128e14,-1.19670933815296e14,2.09552913989632e14,-3.8489357811712e13,2.30012712124416e14,2.1051706703872e14,7.9991484186624e13,-1.0057127297024e14,-1.18794299113472e14,2.28190505140224e14,2.9970481020928e13,1.6735580192768e13,1.42990400028672e14,-1.39002313179136e14,2.33003385094144e14,-1.90335099600896e14,-7.0013876699136e13,2.28959453184e12,-4.5765439258624e13,2.92562736775168e14,2.09827909337088e14,-2.64045714210816e14,2.5403328561152e13,3.906677506048e13,-3.2851701530624e14,2.109301325824e12,-3.28935472627712e14,2.80120568840192e14,1.79229169811456e14,1.38131550502912e14,-2.08574080876544e14,2.3825777426432e14,5.8093622788096e13,-8.799129698304e13,3.20696685166592e14,3.2411224113152e13,4.6587103412224e13,-3.389173792768e14,9.3226258137088e13,2.10346174316544e14,2.6072955486208e13,9.52777048064e12,1.87610513276928e14,-8.6967064723456e13,2.92549751209984e14,-1.01994467426304e14,4.5320696233984e14,-2.89730172289024e14,-3.13792290357248e14,-4.77365046083584e14,-1.33739342462976e14,-4.3200442007552e13,5.45517822017536e14,-5.16926224728064e14,1.34733392510976e14,1.11446876749824e14,-3.9892583186432e13,-4.33134097137664e14,3.5075219521536e14,4.51533971914752e14,-3.63193541066752e14,-5.7794040430592e13,-3.3666973564928e14,-1.63820135776256e14,-5.15424898777088e14,-2.3441948278784e14,8.8305332912128e13,-2.05218016919552e14,7.02221582860288e14,-3.1813930057728e14,-2.198704488448e14,1.65051700871168e14,-7.67275976097792e14,2.86980957011968e14,3.68066919661568e14,5.8232743657472e14,8.2762073636864e14,7.66920366227456e14,-8.43434000646144e14,4.1943341989888e14,6.7585571815424e13,1.6352853098496e14,-1.1866444136448e13,-5.75474413600768e14,1.2409599164416e14,2.0699534065664e13,9.0803972079616e13,-3.69494291644416e14,1.06498822766592e14,1.23118416822272e14,-5.11566239760384e14,-1.20546234728448e14,-6.20576200720384e14,1.4783990464512e14,-2.19375789408256e14,-4.4496129622016e14,2.84313346113536e14,4.35705876578304e14,-6.68749828980736e14,-6.9079226384384e13,-4.97041163681792e14,4.80269752598528e14,6.7212412977152e14,1.206251094540288e15,-8.96614218596352e14,-2.3227996831744e14,2.4358454034432e14,1.050825623339008e15,1.54177095335936e14,1.8803433930752e14,-1.226759294943232e15,-1.13809452695552e15,1.165608624324608e15,5.3735980007424e14,-8.1845324611584e13,-1.483274069213184e15,-6.50060010356736e14,8.56893220192256e14,7.82816711278592e14,1.924287954944e14,-1.083266517958656e15,1.369810428493824e15,9.31184880123904e14,-6.40469616820224e14,-9.32338817040384e14,1.83275179999232e15,-1.855496738832384e15,6.61181895278592e14,-1.324559458369536e15,-4.58517152530432e14,1.91497609674752e14,-1.753406037295104e15,-6.0945430740992e13,-9.65211154546688e14,-9.51097489358848e14,5.5683462463488e14,1.10127633924096e14,3.74133292531712e14,2.71841046298624e14,6.926037417984e14,1.2503589322752e15,2.113907204292608e15,-1.655208052523008e15,2.496899101753344e15,5.73167949053952e14,1.410050648178688e15,-2.280633808191488e15,-1.562671371517952e15,1.273521422467072e15,-2.551007636619264e15,1.80288500006912e15,-8.11308719013888e14,-1.111072203341824e15,4.5058384461824e14,2.445544446230528e15,-3.161703667728384e15,2.455534003290112e15,4.03821750648832e14,3.15047494549504e14,3.450749598040064e15,-2.406710962552832e15,3.522178930704384e15,-2.97168250339328e15,-1.954376818098176e15,2.039288187322368e15,-1.79043412475904e14,2.047445001306112e15,-2.62125645725696e14,-3.1873684209664e13,3.679427883958272e15,-2.231366506774528e15,-1.36301047185408e14,-1.621632548339712e15,2.559561332424704e15,2.625335535337472e15,4.639923499958272e15,-2.897259846959104e15,-2.02895328804864e15,-2.899542622076928e15,3.3850918961152e15,-1.153551443165184e15,-4.68299343200256e14,-2.080145137467392e15,4.108045219004416e15,2.031796422180864e15,9.99410838274048e14,-3.959168230752256e15,-5.588997455740928e15,-5.637315837820928e15,-1.721465976127488e15,6.42317258063872e14,-2.950753127759872e15,-1.39207473364992e15,3.314803682574336e15,6.130989042499584e15,4.36328311291904e14,2.4527081832448e15,3.37696534822912e14,-5.451543469883392e15,3.07048151515136e15,6.070853594775552e15,5.230202330284032e15,-2.60375144562688e15,-2.559460132257792e15,6.16901453545472e15,-8.03139825434624e14,2.517453741490176e15,-7.682023602782208e15,4.546497760722944e15,5.792654067499008e15,4.105636816093184e15,-2.389798186647552e15,1.242639668084736e15,-2.024312575885312e15,-8.1017981370368e15,-7.811264537427968e15,1.518688087834624e15,-2.512201264922624e15,-1.42920757805056e14,-7.904175417458688e15,-5.738607272787968e15,-9.365849425051648e15,-3.635562846093312e15,3.85857613725696e14,-8.767891730071552e15,8.642903349919744e15,8.91563202838528e14,-1.20743140524032e15,-5.50195779600384e15,-5.33199151169536e14,-4.451076472307712e15,-9.300647526531072e15,7.672976254173184e15,-1.30015547097088e14,1.200521742385152e16,-8.987107397730304e15,1.074620681682944e16,-9.431837302587392e15,4.174906048643072e15,-7.63698335449088e15,-4.863560299577344e15,-1.2111397605343232e16,8.43565936672768e15,8.56355275538432e15,-1.3300098523987968e16,1.2178865099112448e16,6.525808743022592e15,-1.5395388655665152e16,1.1452217835913216e16,9.047988559151104e15,-2.172108708773888e15,-6.610570996350976e15,-2.317097812099072e15,-4.700270474821632e15,1.7043639263821824e16,-1.1958371141812224e16,4.027562363715584e15,-2.042923071832064e15,-1.9621843707101184e16,-1.677831792754688e15,-2.023031816637645e16,-1.132863659442176e15,8.865713905205248e15,-1.9867805746724864e16,-4.126444322029568e15,9.336054163177472e15,3.93223784628224e14,2.859847997456384e15,-2.082966796763136e16,-1.9028867637313536e16,1.5325604027039744e16,-2.001915609926861e16,-1.82462156111872e15,3.014313811902464e15,7.409823071076352e15,1.7042579480641536e16,-1.906430970744013e16,2.079629821922509e16,-2.2627094601138176e16,1.8176769748107264e16,-1.0731977590177792e16,2.23651832004608e16,-9.683015579992064e15,4.76893404987392e14,-1.0552626198347776e16,-2.95608640339968e16,1.162050109702144e16,2.446025536254771e16,-1.430335107629056e15,-1.0467338885267456e16,-9.9109692243968e13,1.180269360971776e16,3.47392524156928e16,1.4731799028563968e16,7.66481474256896e15,3.740200543767757e16,2.7727529326411776e16,3.544126696770765e16,3.122960915234816e16,-1.1357499848392704e16,3.609612922126336e16,7.802543069462528e15,-3.538449823747277e16,2.8244409313132544e16,2.154113789014835e16,-2.175746411855872e15,3.653365217099776e15,-5.575866666975232e15,-2.258900253618995e16,1.5607951955853312e16,-1.6562469782683648e16,-1.0232345118375936e16,-4.6365648355328e15,-3.4455662167588864e16,-4.408595219218432e15,2.600423168095027e16,4.508612283701658e16,-2.260563694452736e16,4.011837038893466e16,9.885494296969216e15,-5.417248692895744e16,5.98398465998848e16,4.967159313098342e16,-2.239955582373069e16,5.239063384686592e16,1.830878845285171e16,-3.022886888747827e16,-2.5716853271691264e16,5.852804762356941e16,1.8977899260411904e16,4.172132090327859e16,2.503544812024627e16,6.072762922486989e16,3.774270801340006e16,5.187581759193088e16,7.034145502920704e15,-1.6940345300353024e16,-1.72708956471296e16,6.317612887703552e15,9.517929922035712e15,6.751107909733581e16,-6.749649338839859e16,-6.847622267325645e16,-8.042955044972134e16,7.4099997016064e16,7.139372523795251e16,-2.7878572588793856e16,-5.538556608197427e16,-5.900805638979584e15,3.646982573575373e16,3.252345946033357e16,-9.573666786377728e16,7.093866486300672e16,-1.008025066274816e16,-3.5449957834031104e16,-2.8891207765590016e16,-3.82170527915049e16,1.002656357154816e16,-1.639578532315136e16,5.7545045573632e16,-7.517710609442406e16,5.283368978821939e16,5.069508383762022e16,-1.1766182307482829e17,1.7502031459647488e16,-9.52265116483584e16,2.6776902739951616e16,5.879302992586342e16,-1.7483092801355776e16,7.610964657360077e16,1.0930223616884736e16,1.3060323814250906e17,7.113862995037389e16,3.771143206155059e16,1.489843581395927e17,-2.462703109013504e16,-3.834899848180531e16,6.464447189509734e16,1.0597615336528282e17,1.1232769703149568e17,5.934793540553933e16,3.890308362272768e15,4.692835886432256e16,5.286714328848794e16,1.462128157434839e17,1.7405306863406285e17,-6.423429070716928e15,1.443324962411643e17,-1.4500556915605504e17,1.9086422346563584e17,-1.087308015075328e16,-8.169573257838592e16,-3.640117927346176e16,1.4273878849644134e17,-3.177321457306829e16,1.8303140570857472e17,-2.805262399098061e16,4.233970170462208e16,5.729745788888678e16,-1.309263914818601e17,-1.5719585457320755e17,1.3867374583218176e16,-7.661913277412147e16,9.861956158200218e16,1.096683593138176e15,-1.794412597257175e17,-2.612084347901051e17,1.4282192188342272e17,2.6508618896297165e17,4.290571396972544e16,-2.8823508343586816e17,-1.728148811022336e17,-1.5228845930053632e17,2.944921292316344e17,1.4006238821587354e17,-1.2222394592657408e17,3.142766383826207e17,-2.6670164642208154e17,3.166725772987597e17,-1.9713178334134272e17,-3.2118349555040256e17,5.13798304736215e16,-1.7223969908195328e17,-6.990863292117811e16,-9.546479643394048e16,-3.293726925138166e17,-1.543777547316101e17,1.319480611223634e17,4.297073977458688e16,-3.995490908760965e17,-3.8118257376781926e17,2.2619517419834573e17,-2.0737062459775386e17,-2.5086727023283405e17,-2.9010535271471514e17,-3.635681226129408e17,-4.1412744682930176e17,1.0345924454776832e16,6.303203379799654e16,-3.501270052802396e17,-6.150001466854605e16,-1.3360040376061133e17,2.528677972798341e17,-2.5188558979884646e17,-1.653561206369157e17,-3.7745196517451366e17,-3.193728747773624e17,8.907446062311014e16,-6.934725063081984e16,-8.74027992219648e16,-8.659936545970586e16,3.630832036253532e17,-7.700711434983834e16,8.849826499054797e16,7.477275210337485e16,-4.378273770163405e16,-1.756027443740672e17,-1.4732620870556058e17,-5.6961567394522726e17,-2.306877271698309e17,-2.900615784080343e17,2.985269589484503e17,2.418477701917573e17,3.3323496762454835e17,-1.5646777171718963e17,-4.803419611993211e17,-3.395880145293148e17,-1.7327963092339917e17,-1.9675382621929472e17,2.8711946568073216e16,-1.0079345927887258e17,-1.253857720008704e17,-1.2255798271305318e17,-1.075136657579049e17,5.034564787539804e17,4.76731706179584e16,-7.965915701187707e17,4.805395984144138e17,5.84222548481278e17,-5.833321502212096e17,-2.4735163334262784e17,-4.6648117402219315e17,7.926404750843576e17,-7.955714982061015e17,5.692025324510904e17,8.956006680546509e16,1.5015970170994688e17,-1.0006777645057966e18,7.598914525315727e17,-8.675631902658396e17,1.453722047443108e17,-6.066403536210493e17,6.645914883525181e17,-7.720745911231447e17,-9.458552213916877e17,2.7358711465272934e17,4.9964787355457946e17,1.2582823953170432e17,-1.6920092382068736e17,-1.126676368210264e18,5.6865394486830694e17,9.360651011384934e17,1.4051546946988933e18,9.745390745786778e17,7.615434000328294e17,-9.166091741655204e17,-1.5375291601744036e18,-5.2647166230501786e17,-9.656691768384553e17,-1.436592893232939e18,6.64108390431064e17,2.4888601899905843e17,-6.400512134542787e17,5.6967913638199296e17,-1.5412303911914045e18,8.31440316283224e17,1.527498865350017e18,1.308734809207472e18,-6.525949918597612e17,1.8528583747821896e18,-1.8158269605976474e17,1.0729470145320714e18,-5.476749881324339e17,-1.158463592966652e18,-1.7616780745139814e17,5.269129444248781e16,7.830112271262024e17,6.411827483582136e17,-4.64538062098006e17,2.1764794876113715e17,1.4408723299271967e18,1.8123430205660856e18,-1.9795167541827994e17,4.1063477942419456e17,-2.0557202973314253e17,-2.32573973727019e17,-7.00251742817747e17,-2.37159820260121e18,-1.9391348531905167e18,2.624185160559493e18,1.0408465664007209e18,-1.8988334914249687e18,-1.7755829108756972e18,8.765574702589542e17,2.033839363103654e18,-3.846220866576712e17,-2.355933735318192e18,2.935412372161954e18,-1.6976219014692864e18,5.200051939038986e17,-1.2907623982982758e17,1.3336821782858957e18,2.4585354874978304e18,-4.810415254724936e17,-2.9322474279414006e18,2.713290682386088e18,1.3454486019705405e18,-3.5777443163296236e18,3.3887863711486444e18,-2.978444508494037e18,-1.5020763698094408e18,-1.1162055815399997e18,2.8947440483906355e17,5.4265145694407885e17,3.577132438108766e18,-3.6110430259768197e18,3.2991956210968166e17,2.4280718685828547e18,-6.007721913441321e17,-2.6048249598176133e18,2.5402274834546688e17,-1.891996315806597e18,-3.420614758871597e18,9.417419483921777e17,-2.493427664371581e18,-4.24380097264563e18,-5.266943821291192e18,4.155675321837814e17,3.624735794033328e18,-3.8829481283572204e18,-4.35187224541764e18,4.636084731203551e18,-4.736716983179936e18,-3.9246056002766766e18,-2.8936999246611087e18,-1.515306106031702e18,2.0949023906196357e18,-6.30298723986545e18,2.758133714369118e18,-3.827964850387026e18,-4.286696494657962e18,-4.67234332615272e18,5.351128478827676e18,-3.2096734530827715e18,6.43067242568745e18,-1.3702799382124954e17,6.441354730907107e18,-3.4497592387111485e18,6.889687194202538e18,3.2926970263403233e18,-1.401627461396988e18,5.597961692437807e18,-6.592595853842579e18,-1.1280790701693993e18,1.7557912892588687e18,-6.139156159036129e18,-8.141286019111584e18,2.1192191897795297e18,2.741254836493222e18,-1.6575196887473193e18,-1.0112457892356424e18,6.420337016386355e18,-2.458551980172247e18,2.2869176653205996e18,2.991732381393617e18,-7.114332812919964e18,-1.0438655641965822e19,4.985700841533997e18,1.9158609408095683e18,1.7959429800040858e18,2.9086975381418803e18,4.0220943485092495e18,-5.680456950358213e18,-8.273493496258626e18,-6.251232815229174e17,8.899984226649113e18,-1.2801415970102968e18,-1.1232057735010845e19,-1.2895120474190643e18,6.999229888410419e18,-3.300502184507998e18,-1.2639865826145468e19,-1.6506521391202304e18,8.132147428217324e18,-1.2333175749275025e19,2.3519746688244777e18,-1.1014295059083297e19,1.0274675577310937e19,1.7027809474657649e18,-8.04649932070427e18,9.038098830016381e18,3.5337924385209057e18,1.4985490265563726e19,-1.5846391377437917e19,1.6430255141531156e18,6.665323600217637e18,4.967058072129241e18,-5.043164617736454e18,1.8512796135236567e19,1.8088683714077786e19,-3.4229141125631836e18,-1.294109352924912e19,3.960436210324734e18,1.9967010214133105e19,8.559240625399005e18,1.1635422371753492e18,1.3126039081622438e19,8.08399101794399e18,-9.28574623198688e18,3.2053591756138086e17,1.2540455681343357e19,-1.7613136138971644e19,1.7383237053696705e19,-1.8146060628861649e19,-1.6402634309929796e19,1.1257356398054343e19,1.1389246116340957e19,1.487872548748342e19,-1.9874341175120888e19,-1.7961617553302225e19,-2.1740310813747446e18,-2.6005039890716164e19,1.5463408387739353e19,-2.1422897749727117e19,2.3015648094700175e19,-1.7068630218228367e18,4.914422251484348e18,8.711200279183229e18,-3.641483830025519e18,4.90258326003227e18,1.3332961672411742e19,-2.9357337044351713e18,-1.7672495748098294e18,3.029822212958847e18,-2.2695822152412692e19,2.9376608734407557e19,2.7690549434654917e19,-1.5857793313017954e19,6.174579125148189e18,2.282303784676963e19,-2.7879480716678922e19,1.4522491416665391e19,-3.9656217820392325e19,-1.0543014688604553e19,-3.331034687826454e19,-2.81805709808291e18,1.4202988730796474e19,3.311108018693944e19,-2.643206161964204e19,-2.9797020199427244e19,-1.648470955440839e19,-2.663403750761798e19,-1.1613467323570061e19,-2.6609879038132486e19,-2.9028345023379276e19,4.072225591617231e19,4.354774131481248e19,1.4563455921381442e19,-1.620678160220894e19,-3.4713543617632272e19,2.7867669762773352e19,-4.465277249095991e19,-1.6592639814814138e19,5.10627988370568e18,2.0288034624094863e19,2.107088910209463e19,2.370198524299051e19,-5.010911213793785e19,5.104915499726773e19,-5.748027327492024e19,-3.1624780159721144e19,2.061799366554393e19,-4.094020990712309e19,-6.258961145021858e19,6.004390778038229e19,8.661935011433284e18,2.792416486923174e19,-6.672986646507422e19,2.8926996439577395e19,-4.607406719172084e19,-6.5279535861246984e19,-5.873183416667813e19,8.683580547093496e18,-5.148306516654162e18,-4.418880497231751e19,-7.536307783474348e19,-1.2284677390885454e19,-2.322459708541947e19,-1.7183395317790278e19,-1.6018349498463945e19,-3.4576755575043916e19,5.968865997149438e19,2.285750753630041e19,-3.1933709941777367e19,8.238975758069714e19,2.641258706969087e19,6.777183405229893e19,5.7806045376090735e19,9.965819462533775e19,1.0866454065905559e20,6.871740965413978e18,-9.714091992814925e19,8.977603040549169e19,5.649494812871203e19,-3.790076834181074e19,-1.0730858773531014e20,-8.399231776841322e19,-7.306079724320378e19,-1.0344403306209608e20,1.1568416593840544e20,-8.744591897562972e19,4.511050797769608e19,9.944930500824636e19,1.0637197095421241e20,-4.281807901034126e19,7.692160478079038e19,3.927294565913566e19,-4.4317073998813856e19,1.3579338918549835e20,-5.369705607388253e19,3.621833303238325e19,1.5585378532022498e20,-1.95230648022325e19,3.689884057002312e19,-1.2299261093213949e20,-1.6928837485239206e20,1.338998014640495e20,1.501290065063953e20,-1.3232180876414445e20,-1.3673345183603753e19,-1.0911082803072336e20,-1.2007818383890527e20,1.4790421069828823e20,-1.8055460430928255e20,1.4436150506875676e20,1.6912059817408646e20,2.051413379718421e20,-6.3639592278186525e19,9.446503408158428e19,1.5053765539602104e20,7.037064853180331e19,1.432481835749359e20,1.1250569112776081e19,4.266850144849861e19,-4.942802185913526e19,-1.1638461641794991e20,-1.5692120880065597e20,-1.7335894282027926e20,-2.1660966206396432e19,1.1560077897655491e20,-1.3560616434552065e20,-7.822093725375188e19,-1.2991503938359394e20,1.2168193149917934e20,2.422257013378431e20,-6.0093069144283415e19,1.0326735253862875e19,-2.480552108332417e19,1.748829890816791e20,-3.107242026249392e20,2.8340290437926355e20,8.463650843698764e19,-2.249034849804647e20,-2.300816042051502e19,1.9169487371409503e20,2.381074057692174e20,5.903633291687441e19,1.2067242149520658e20,3.062947012851878e20,-2.9665506294215003e20,2.9296056313533432e20,3.482512315713061e18,-2.362776776831098e20,-2.1606585680700585e20,-3.804577281489114e20,3.694290107958066e20,1.2729230832716218e20,-2.297199440444491e20,3.842812138638048e20,-1.4134430442465106e20,8.318603159811391e18,-4.061445715735725e20,2.311886804729253e20,-4.5421089226217226e20,1.6837845421361673e20,3.394711716276543e20,-1.269156068473931e20,-2.338825191453486e20,2.0382734241181257e20,-2.0027030794674792e20,3.592185411999996e20,5.4335414932783235e19,-3.958619036462392e20,-1.6698168741824823e20,2.1676231386031823e20,-2.388447822472691e20,-2.126026942466742e20,3.5815773238152135e19,4.881029071798094e20,-9.679754711971922e17,-2.586411812421202e20,-6.514435310563518e19,-6.40336009505861e20,-3.1926077571862e20,-2.637989814919244e20,-3.973873572825226e20,2.069345446797215e20,-2.1640068888398922e20,5.5370188195525086e20,3.4488576501714885e20,6.325547041434391e20,2.179606759814778e20,4.992171577414622e19,-2.8771800373316813e20,1.3020585581109418e20,6.348564657654905e20,7.413414049423871e20,7.897997147204286e20,7.105246800671744e20,-7.08646749391305e20,5.112700921660729e20,1.0564997884285655e20,8.831416020722862e20,-5.3620835289017195e20,7.873527823791387e20,-8.712948832524881e20,-2.9031600017602144e20,-9.057490388829885e20,-5.474130976568372e20,-5.4020909747164886e20,3.9970730922494394e20,8.415934326037472e20,-5.804206654210913e19,-3.441187457056123e20,7.64131642158277e19,1.0603471995164793e21,7.422122885203299e20,2.961464024748618e20,-7.307199466962105e20,3.746394996428138e20,1.302780277543414e20,4.495631422623538e20,-8.581006557582459e19,9.479526580191704e19,4.720625630507434e20,7.776940389220567e20,-1.0638426261460164e21,1.08148294441145e21,3.946899825807044e20,1.0009972858833632e21,1.1396918288577253e20,-1.0921188986189272e21,8.876909413833722e20,-2.7049931739066112e20,7.808447290738674e20,-4.079640961917743e20,-9.820065914171603e20,-1.4789162524839206e21,-8.014964777463841e20,-1.1060452249354077e21,8.826942679655488e19,2.4016746834720457e20,-1.7322086878889105e21,1.3630009164247985e21,-4.127132827363249e20,1.739943901723896e21,-3.13379426448995e20,1.036242175092188e21,1.8979327099268434e21,-1.9134224186327192e21,-1.3892291769671625e21,1.0360942599919265e21,-7.385066880441201e19,2.1504178750986272e21,-2.0865544398452115e21,2.0546916132190536e21,-2.2232405181232547e21,3.161181779723897e20,1.645586311918578e21,-2.4741647638116895e21,-1.4506446243481256e21,-2.5139546294694613e21,-2.5348493614156234e21,-2.2686597425777512e21,2.2108601227476132e21,-1.6458621573957545e21,-1.8547211288990607e20,-1.711998643823597e21,2.2831395190671891e21,2.2681041109737244e21,-4.761355411481187e20,2.9121550272222126e21,-9.99529341103259e19,-1.8625197801569224e21,1.2901343984881762e20,-6.042184071317448e20,9.172468694691537e20,-3.3004224545218217e21,-1.7428663156695944e21,4.874988618797883e20,1.8374692109171158e21,2.155737892895947e21,-3.7570001994944097e21,3.040288629070391e21,1.5584609401648636e21,-2.588371265287201e21,1.1000624039366786e21,8.186872101052665e20,-2.448610776576036e21,-3.595370653205198e20,-4.18658069428826e20,5.1580722250004405e20,4.3613326743604665e20,2.2371590335091316e21,1.089943589630163e21,-3.003508856813563e21,4.191439656073728e21,2.2128412843711912e21,7.825268235346903e20,1.7311782079991728e21,-2.4682093162544455e21,2.1383448503975538e21,-1.4011416201940225e21,-4.878439290906123e21,-8.08497112260899e20,3.7761616085339876e21,-8.685023700085417e20,2.4674386377682117e21,-2.0111087315126174e21,2.051890655725806e21,3.3717028961490515e21,6.783356239430088e20,-6.324800429058666e20,3.658131832449815e21,6.234317764520235e21,-5.752596985777991e21,2.5546291709790346e21,-3.2279643215920345e21,3.6968898108429655e21,-4.329491873151236e21,2.2704438717176317e21,2.3551679804450275e21,1.7562429917253033e21,4.9676079598845244e20,4.1588434463957503e21,-1.0533728829122869e21,-3.763445694986107e21,5.265484835331831e21,-8.146910394921611e21,6.273560442823281e21,7.926182784734696e21,-4.123275142438685e21,-1.9490810760573087e21,-1.4771774408152905e21,2.3236002803319508e21,-5.766307068943614e21,4.335592280321486e21,4.148757916505231e21,-9.38462736216245e21,9.318579258877295e21,1.5546113476458803e21,6.185935593723394e21,1.0826454219915161e22,9.369619679354192e21,3.7301429831165857e21,5.837098588536297e21,3.9314271463372594e21,-7.402653401801711e21,1.0769165054955288e22,7.481937021441755e21,1.04906793424973e22,-4.947203627716536e21,2.5242670281912096e21,-4.4297242679329706e21,1.1040955040667284e22,-6.86065644564674e21,1.8779106207772285e20,-2.6560654342361606e21,1.0408753235775896e21,1.2659304426464455e22,-8.24996119864515e20,-7.836962535466812e21,-1.0798267456484845e21,3.5538301539297746e21,-1.1705537726879466e22,-4.6396961563098187e21,-4.1541000300882223e21,-1.1783680809913878e22,9.486659507945273e20,-7.888955467264898e20,7.011849040537009e21,-7.878383267139646e21,1.5727970518261884e22,-1.0793293089958925e22,-1.5445835764205818e22,3.762705134322381e21,1.4782308046206348e22,9.025309354742556e21,-1.6222653782631607e22,1.2479589409234142e22,2.0051182966157682e22,5.956238501928617e21,-1.2996231099487017e22,-1.8827486830456755e21,1.0819488277191526e22,1.136577378609166e22,1.8168207695755755e22,-8.212586951237509e21,-8.594085186822203e21,-8.174001235530105e21,-1.087019092769637e22,6.642962572758812e21,1.904296887297769e22,2.2326016440137117e22,-1.3564173574570246e20,1.3986758431030418e22,-7.012042695320986e21,-1.8709995234528053e22,-2.1930640925250634e22,2.146375725548076e22,-5.896380033381328e21,1.5968614734850892e22,2.63152059108701e22,-1.0931952167086222e22,-1.3224849860646016e21,2.7917606924486846e22,2.979884380543261e22,8.739955652852827e21,-3.0003921969864365e22,-1.5712404952049785e22,2.1912904342543165e21,5.924383415864318e21,3.392421987709746e22,-3.743980180381691e22,3.3337939025806557e22,-3.202175527930809e22,2.895071691640694e22,3.956659069904561e22,-3.078506006623271e22,-4.746758541401437e21,-3.8620933856489604e22,9.061959648510097e21,3.0590069964966262e22,-4.40519259781273e21,-1.69179831064498e21,-6.616792718274116e21,7.916126246766777e20,1.3413100043595126e22,8.743525318507471e21,-2.9016791478339908e22,-4.914627402761905e22,2.859404533671808e22,-8.672857084954587e21,-2.9359418582590814e22,-4.5947614910277296e21,-2.210618673512591e22,6.840697617998141e21,1.6905011050673114e22,2.992281664417505e22,5.361466451310277e22,1.7625127623890401e22,1.2886738459446479e22,4.779040230940438e22,2.234934058260727e22,-3.2851881280623155e22,-1.2455586349120164e22,1.932260638104038e22,2.637059568268713e22,-3.059096167769248e22,5.1818642492506296e22,-5.924574030718547e22,6.790825656444566e22,5.564325692205628e21,7.535085576904224e22,4.569652572025251e22,-4.130313142756358e21,-6.49261350207875e22,-8.064904799666785e22,8.173078560556448e22,3.2118992498862645e22,-5.892462605392958e20,-2.360131369446855e21,2.1564806772119887e22,7.342836816730958e22,-5.984214299863889e21,1.0416990319494356e22,-9.372013342556139e22,2.5192134264593465e21,-8.11146931765402e22,3.1942870228235067e22,-8.988479592529864e22,-2.493699408670386e21,8.687737315893391e22,1.3028525286514984e21,-2.9393391486379883e22,5.493248982166541e22,-1.0131021200715547e23,-9.662428865247051e22,7.880987698804154e22,-1.3515868809392e22,-1.5300654348918183e22,6.7717790329004905e22,-1.1446065086148328e23,-9.152308837614571e22,-1.1343510016153773e23,3.837767755211672e21,-1.0862628258022108e22,-9.647584100155312e22,-6.3179720150086515e22,-6.992502702437732e22,9.16292652409606e22,-1.1360568750822327e23,-1.2517293995674451e23,1.1144315804635176e23,-1.3508797482437085e23,-3.878910727377487e22,5.617418177852736e22,-9.489831111687853e22,-2.620137067488887e22,-7.931872970273888e22,-7.31262892223037e22,4.835314960084246e22,1.700461581255178e23,-6.065138580848184e22,9.551802669180303e21,8.243543681766137e22,9.304363871833481e22,1.1660342753538915e23,-1.213279017028844e23,4.424063806151319e22,-6.030604528545544e22,2.0740256227143505e23,-1.763001447984606e23,-6.623543051165591e22,-8.263408384182525e21,5.171091188581997e22,2.1145812579347622e23,-1.1321527946372577e23,4.592398452303248e22,8.093908881986976e22,-6.416909793782503e22,1.9663305043930846e23,-1.7551496922502633e23,8.734492786504826e22,-1.3451743180197779e23,-3.5102845676577526e22,-1.138993852543226e23,-9.455420908374966e22,4.876989919956045e22,-5.9223222309048614e22,-6.253183681129262e22,-2.4157672292065232e23,-2.0870117522398733e22,4.583331805533426e22,-1.139438267754455e23,-2.0719721614282547e23,6.2619832644411815e22,-1.491568777867046e23,1.4046272374206213e22,2.1653654686288578e23,1.7479073636174963e23,1.7751842254085986e23,3.330828057046051e23,-9.477265168007564e22,2.2232900014241604e22,-3.5502585629862894e23,3.210855765852603e23,-1.6721319580151814e23,-1.1672728553234109e23,-9.791973107088512e22,-4.128151820259187e23,-4.090050286547722e23,-2.3148584950917493e23,-4.0267631825681203e23,1.9911383127244773e23,2.9293723223746473e23,-3.235388854606726e23,-9.995670017514554e22,1.5676529502598133e23,-3.412470752242904e23,4.583543564787905e23,3.684110903195297e22,-1.3606925513997935e23,-5.162627573802279e23,-5.403292281769592e22,1.080164771762766e23,3.549482502698501e23,-5.2704646455838e23,3.082408420736384e23,-3.083003616463137e23,3.625097580154081e23,-4.80598751931081e22,3.999227453870437e23,2.0875292158370582e22,-1.4414375891189191e23,-3.816865085671167e22,5.803680753401301e23,4.2943317642053966e23,2.6658177090132537e23,4.753861776359713e23,5.3660448106914616e22,5.002304471099472e23,-8.287224094552004e22,-9.621647869901286e22,3.6905564549819897e22,-6.942853669065712e22,-2.4005755518354882e22,5.007283290559523e23,-2.2260047712795394e22,6.129842247054578e23,5.317805404002808e23,-5.694427029320995e23,-6.300212069878116e22,-6.779087654519772e23,-8.875234778459782e22,7.807666574854771e23,8.686451448127785e23,7.593484023488315e23,6.630360780425489e23,-6.719168162197533e23,2.9096860075395002e23,5.846736967278814e23,9.943335487684733e23,-6.380298591259727e23,-1.0274745656487732e24,9.955189862623897e22,8.583486190279168e23,9.496847179475341e23,-7.929482099303709e23,-6.0226187456862906e23,-3.900224282829996e23,-7.893735047477434e23,-5.6293085815889195e23,1.0087228017795011e24,9.689575302792945e23,5.482197599040937e22,1.270833957417127e24,1.095677961111199e23,4.928251241994664e23,-3.442397712198736e23,-1.1634013809397381e23,1.2678372261962775e24,-1.3690970249092042e24,4.422450110109837e21,-1.809272151132151e23,-1.1433491576420665e24,1.5520858438166415e24,3.040872622093071e23,1.4372211390037898e24,2.1348481768338698e23,1.5312119838029524e23,-9.887237209574325e23,-2.3030516781646497e23,1.8919628789982895e22,1.0417285305269949e23,-1.2734385512112218e24,-1.0284042527270506e24,-1.7093080200176203e24,-1.5417618640884514e24,-1.6469222844818392e24,1.179640190260133e23,1.6826286958250775e24,-1.207287878444553e24,-1.5199321600898492e24,1.1202392063701925e24,-2.1291819999842914e24,-1.7888898680249886e24,-1.0520444037758557e24,4.648229306667783e23,-8.212774368536002e23,-9.344678114113866e23,-6.347878438550183e23,-1.7097338803983844e24,-5.431703600306829e23,3.320550122120451e23,2.502484148117933e24,-1.7690887294137422e24,8.10259758667607e23,2.2497166286416115e23,-2.0828482464419634e24,5.1041355424179316e23,-3.5678950194150424e23,-1.537340121887908e24,5.2239172412751494e23,-2.7996395778671827e24,5.382797030369377e23,3.8505290425257985e23,-2.7745874582632043e24,-1.1533279814948149e24,1.6942099364540413e24,2.0175774689560917e24,-2.326025332497401e24,5.602478296736867e23,-6.866565573681817e23,7.045440624545629e23,3.0674413378787657e24,3.7112811287544225e24,2.689826398626766e24,-3.859385137005842e24,-1.1709679687456758e24,2.9791696322607994e24,2.612461042212004e24,5.072429840753273e23,-1.2510351246488897e23,-1.8719604565052973e24,1.6966852589244322e24,1.923750122837801e24,4.0083440365529273e24,-1.489936853506072e23,4.2273599230970716e24,-3.9227084859552446e24,-4.67840155067372e24,-7.130127032514644e23,4.6706187540568715e24,-1.8086778921541202e24,2.454154831566319e24,2.758105580663721e24,-5.040597029492732e24,4.2553675569781096e24,-7.860966136012745e23,3.6367897174202695e24,-3.5493625268044277e24,3.995067280736251e24,1.1912818691960962e24,8.306555165448544e23,2.0491303364637957e24,-1.125274879271939e24,2.5846234642528957e24,5.898376393527749e24,2.902517069566261e24,-3.9778576214369846e24,-1.869932899924258e24,-6.937235338458574e24,1.7554048481907516e24,2.3322688708192084e23,5.850766499995009e24,1.237010987466852e24,-4.3870372456421107e24,-1.9295471562781524e24,7.613616194686571e23,2.503192366180935e23,-1.639824035008351e24,-4.7930209714364666e24,5.780175998571693e24,-1.7947981223617375e23,1.5922850461481445e24,2.917307611318486e24,-4.6712629489475706e24,-8.860055918333286e24,1.7851692462144343e24,1.2837325549802921e24,-2.7648778055529846e23,1.718303257711751e24,5.635024910523948e24,5.863934592959876e24,4.2125996455343425e24,-6.868965668024032e24,7.071237675556771e24,-6.36406271828629e24,2.8021791757114554e24,4.6003637527913964e24,1.0277762563834912e25,-5.37494484228947e24,-1.3033098466756598e23,-5.7837478214505595e23,6.787045695205321e23,4.469415504758903e24,-1.090821347727757e25,-5.225286268007876e21,-9.78614876382002e24,-1.3040093313582641e25,1.2863363129062962e25,8.189147259911718e24,-5.066745865677967e24,1.8512541303977464e24,-4.8257760478430994e24,7.317529379056904e24,-4.401867851416621e24,-1.503319714129969e24,-1.4127362856031156e25,-1.323534518207383e25,6.899689296739548e24,-1.3130406843185266e24,-2.6193258250808095e24,8.276845387081142e24,9.835764740770776e24,4.444125090691441e23,-1.5089192232935437e25,-5.794382297351459e24,1.957540522755571e24,-3.8500732782435086e24,1.271941396168377e25,1.0116237108117989e25,-6.925443833770208e24,4.6594233097863867e24,1.227924697796895e25,-1.575436337748933e25,5.503130113936173e24,-1.024565831161763e25,-7.485247752635824e24,-2.283619755459494e25,-2.1392174899289912e25,3.5225490313717863e24,1.4112765716861329e25,-1.9008595004706597e25,-1.1505144350895288e25,-3.8327024981639734e24,1.2068578243118159e25,1.8225778596901117e25,2.5481829589646366e25,1.8211676349287142e24,-1.7686972260938153e25,-1.6858216542860109e25,2.875507001017084e24,-1.7567784388713402e25,-2.11068729437599e25,1.1733082696963585e25,-2.5390331433197757e25,-2.591140583641987e25,-1.4653371763292984e25,2.8253508226953447e25,1.282771249029751e25,-2.848226860605453e25,1.8824214033082347e25,1.0789453338931028e25,-3.5713881121666626e25,5.732499812052439e24,3.578770729729262e25,-2.6090913408844145e25,-2.4510698442042917e25,8.999582478820807e24,-3.9550626339086503e24,7.526843431139782e24,2.4323466295537775e25,1.3383314586739586e25,8.12383425667574e24,-2.735742074008486e25,-6.757511016791431e24,-2.485405921870192e25,4.395135539228695e25,3.3798103739263558e25,3.2987925045389243e25,-2.912286638165923e25,-1.7992195547146265e25,3.7464294972663935e25,5.215251955304118e24,-1.711252105081726e25,-1.4775996494522968e25,-2.408245958421476e25,-1.19407296245508e25,1.120737470221446e25,-2.483302704815413e24,1.5010317414040768e25,1.7560964858013653e25,-6.235683755826813e24,-3.4771264028715114e25,-3.7447190229221588e25,1.5232865852075028e25,4.353789468230484e25,-7.210075365445289e24,1.8429857232431575e25,-3.422230737182559e25,4.602205775479307e25,4.94782166660132e25,-4.737304195051933e25,-1.411340443537488e25,3.884779155482011e25,-1.998918241449083e25,3.7552509608667423e25,-6.574784372234142e25,1.758814267664175e25,6.039363013808704e25,-3.765386293813741e25,6.435410458553831e25,-7.559870481729352e25,6.529367104818863e25,4.261739754134072e25,-2.763664968158935e24,-2.176713033686116e25,-5.675169406730058e25,-5.549570138018188e25,3.022681178075038e25,-1.266594261522161e25,2.5804767514772762e25,2.986258773654401e25,8.227003437515483e25,-9.939172115193372e25,-6.511698928637215e24,6.429336868067562e25,-1.0969890396672319e26,1.8946319949635258e25,-4.366552770455084e25,-5.453027258234022e25,7.116674081469026e25,-3.8657144454818326e25,-3.3600200151311774e25,6.359734535665845e25,-1.238790360400202e26,1.537215260488959e25,-6.984647967121876e25,2.2312478349441263e25,1.1967395315446552e26,-2.431678338603632e24,-6.822472494260655e25,8.281549537404239e25,-1.144383060177449e26,-1.5659618594083748e25,1.4502451110159735e26,-1.4074816844368593e26,-1.120684435832234e26,-6.5344565615088e25,2.3328142243081656e25,-1.2140731068472367e26,-1.456900972978929e26,-9.603121322042179e25,1.608431014302653e26,-9.569152795751948e24,3.5277534919818073e25,-1.649578875035792e26,1.632015730003213e26,-1.3445733987583302e26,-1.1507596614935587e25,1.337771991984633e26,1.0454371230428006e26,-1.686228866161438e26,4.586894977898128e25,3.695945139838368e25,-7.685758903154577e25,-1.9719938349676985e26,-1.818198349004282e26,-5.763524699157108e25,-9.057260028808225e25,6.867422136713665e25,7.351758004438575e25,8.078698993860488e25,1.6647341665644294e26,2.2284399176780865e26,2.4836131750473885e26,-2.3748801333769927e26,2.4157435453165148e26,1.6369985645124034e26,6.232469064795517e25,-3.59531008046575e25,1.67848123365048e26,7.452225890193025e25,-2.6531948311867633e26,-2.6083323495995017e26,2.043501531564789e26,4.699736017240018e25,-2.2046491518462233e26,2.4874967680772266e26,-2.0963615990452075e26,1.357806724021928e25,3.0560523526753025e26,1.1424363752753505e26,-3.226156974009167e26,-2.113150349761572e26,9.35026626700062e25,-1.130996995872921e26,1.8123481485887458e26,-2.6909206364267882e26,2.741328209282607e26,-3.9644257400318635e25,-3.603538250659828e26,1.626585746417676e26,4.6184259975433195e24,-1.3425644560949828e26,3.490839712415907e26,6.789229616765423e25,-1.984740350655191e26,1.644222493959109e26,-8.148116909261784e22,1.6990334890927628e26,-1.71221663921248e26,3.281688683433781e26,-3.113558048183244e26,-4.928016688761463e26,1.8599230394246057e26,-1.384328069145302e26,6.04588901069338e25,-3.298539415210233e26,8.300775656415063e25,2.005314926657803e26,5.2616584293703495e25,-7.19741732495406e25,-1.8218462157032882e25,5.1671960656165365e26,4.349022460626956e26,-4.969285006733403e26,2.6829221281964278e26,-2.820281565190169e26,1.1663881811829772e26,-6.202072058742257e26,-2.872231101383109e26,-2.6621765508762525e26,-6.986632836784207e25,5.5539999391400485e26,9.939939499746838e25,4.725673984082061e26,6.738525512498619e26,6.803744345106101e26,-5.340222466744236e26,-1.7787979483372458e26,2.703584141765949e26,2.5686283155250122e26,4.380663146165666e25,7.594250047594406e26,-5.809283692506352e26,7.43148040510657e26,-8.115459849918017e26,8.617472494619001e26,-1.4922753717518781e26,-9.267462706669993e26,-2.9873446873611603e26,6.0285826443383074e26,-1.1495270269961233e26,3.133117130924598e26,7.976842898380771e26,-9.41167824503361e25,-4.452532306712881e26,-2.4424893411984057e25,2.9730230041972136e26,4.710463905723525e26,-6.306651078114694e26,-6.251594187882538e26,-8.810317708644612e26,-8.6251854472511e26,6.557491379768522e26,1.0967839303198763e27,-1.2620561318957274e27,-2.9472754077540113e26,2.479429453491471e26,1.1729447074290957e27,3.73761693422006e26,-1.0221332036805307e27,1.2303117941020673e27,1.1996283654535744e27,-8.317853836545944e26,-8.907743818535028e26,2.5930842709481734e26,1.1790048317921908e27,1.9450650935014565e26,-1.5225933704002709e27,-1.6053373477475395e27,3.593788777481991e26,-5.46937402496238e26,-1.7087801952589887e27,-4.6756965892980415e26,3.812071682650367e26,-1.1007138062305953e26,2.188241879797303e26,8.938534385873101e26,2.0832610903389405e26,-3.197070885823505e26,8.230721009848658e26,4.906228870401123e26,1.2175452452505107e27,1.376667523713116e27,-7.232599416420041e26,3.738344842741209e26,-4.604920675038355e25,1.4831298818685025e27,1.5629982331756087e27,1.6923398666446884e27,2.0677195977763758e27,6.463376091504456e26,1.0315346974781612e27,-2.4372179166015542e27,7.88607237375215e26,-1.4311110965983097e27,-2.0272270760731996e27,1.6676342160937455e27,-2.1886477450604128e27,-2.0409335972157762e27,2.2803341136388054e27,1.9462060246224155e27,-1.590455104924681e27,-1.070593612018905e27,-1.5876866175740986e27,-1.3015891277591655e27,-2.680960353857677e27,-2.70174939170689e27,9.178024036963494e26,-1.2644776728837714e27,1.5564382758350924e27,1.1567405709259152e27,-2.787403084677369e27,-1.844391803251746e27,9.087713943066953e26,-1.6170008550904645e27,1.4138679656819216e27,6.044864847462408e26,2.9602104491659372e26,-3.1311987433279087e27,1.3353738230213305e27,3.1447300941887613e27,-2.6847347052691105e27,1.722158807078911e27,9.806213886868177e26,-2.3197574620554694e27,-1.544708360213502e27,3.591524402753455e27,-7.473081317874159e25,3.73550817622453e27,8.261946182477108e26,3.716973773222982e27,-4.3377804982796035e27,-1.6245092702242747e27,1.1938935678689633e27,-7.196535293886176e26,-1.6061900300456026e27,1.0158630815829005e27,9.889242681943944e26,-6.4544119884555575e25,-2.4778481985894728e26,3.0423722103767514e27,-4.0668052065344396e27,5.101670500548597e27,2.780416933761774e27,5.295989388064769e27,-2.4068744983398279e27,2.46863832956928e27,6.205345396584649e27,-1.7977529739971624e27,-6.31929196774562e27,-5.776015579865227e27,2.6003342103040227e27,-1.5199726045762308e27,5.511872371829155e27,3.615834850259363e27,-1.5567651521400786e27,4.201777966886436e26,5.168636608754741e27,7.219856700761828e27,6.788844540982884e27,-1.8869062356793532e27,6.64408925088767e27,-8.260613146963365e27,-7.824828445557671e27,-1.3677012255016724e27,2.2094482936779277e27,5.08882330253195e27,2.2035600929695996e27,3.4841918009996474e27,-1.5783806041237936e27,-8.64112372927869e27,-8.837288471793854e27,-8.263856232145476e27,-1.2072318182128523e27,-9.803275099176306e27,4.505953118319652e27,7.661937497280807e27,3.970951201960962e27,6.578413529322971e27,1.964139211341113e27,-9.740449916079829e27,-3.7888324744663074e26,8.835413102004344e27,-1.1570459014338233e28,1.1793221157902586e27,1.2231683293530114e27,-1.0932787242831758e28,5.178092557340877e27,-4.800987686703416e27,1.2923316661392625e28,1.0187970878787075e28,-3.028141949276434e27,-3.706303291007033e27,-1.376124628656329e28,1.2805584523199822e28,7.801741976414542e27,-1.3502154830072268e28,-6.133415490909199e27,-1.1772040606357153e27,-5.870349572727031e27,-3.98668022412378e27,4.702541102930843e27,-6.730834991107313e27,-1.5869795907672415e28,-1.4645503212374623e27,-1.5034573379088054e28,-7.558076130039814e27,-8.357068662967598e27,1.4439628398926964e28,1.8577105000469168e28,-2.8034996397691117e26,6.513616758219896e27,3.9845200366057723e27,-1.5803256288189256e27,-3.434855467465677e27,-1.5550778801105397e28,6.701667884821679e27,3.210384860252193e27,-1.075374816236672e28,1.7841065154532898e28,1.817931173741816e28,2.235632517174657e28,-9.030687088141677e27,-1.6948815328301404e28,-1.6826758683001913e28,-1.750208542425117e28,1.382570658905446e28,-2.477454397496987e27,6.719522562197599e27,-1.7332622122421772e28,-8.268608703714674e27,-1.844884906856929e28,-5.801064782577799e27,-1.4203498268867274e28,1.1115660884880885e28,1.9514082720843162e28,8.292989101274109e27,-2.923485099401401e28,8.892938609315421e27,-1.0098179802481791e28,-1.48266416798892e28,-1.4787829730358115e28,8.758372415202809e27,2.3801591266729377e28,-1.6335564094469469e28,-2.3708161607049043e28,1.5747268206316258e28,2.8663317145691747e28,6.374766197115701e27,2.703168285746249e28,2.377495239739951e28,-1.8890952296329064e28,-2.2249550104385647e28,-3.846632425057015e28,1.7626192757195846e28,7.502106052189032e27,-7.381515701682473e27,-7.382292530968905e27,1.8352673352779168e28,-2.249503288126466e28,3.314020144197819e27,-3.0199115728517647e28,1.7357651255076791e27,4.159241752543427e28,1.9529738546325496e28,3.6931784178411935e28,1.0777860565628253e28,2.7649311134728235e27,-2.991722114487247e28,-3.729054236011554e28,-3.690870597341015e27,-5.425351652372421e28,9.769012559455656e27,-3.541307820107078e28,5.402823130829243e28,1.181659229720026e28,3.9327835012773025e28,-5.868081538164471e28,-2.3479407813435595e28,6.720793764225207e26,-3.7728102671318794e28,-2.9279271344039314e27,5.553321172745112e28,-3.0905529808323635e28,3.579458402212237e28,-8.97210790280911e27,-3.4352099400997975e28,6.860776335604927e28,-6.070617225301674e28,7.657832934393059e28,4.476526222847879e28,5.037548555615924e28,3.4952739555137407e28,7.2882010316259965e28,3.9791899605861384e27,-1.7503428937515546e28,8.439526494420796e27,-1.235685227348972e28,-1.1856686369231445e28,-4.999091491926027e28,2.2718603877663157e28,-9.096378157397445e28,-2.324716891335779e28,-6.464195304030072e28,5.012211170488735e28,2.1420729924160437e28,-7.3745783092008135e28,-7.920933916146362e28,7.532536273449672e28,9.298015650429607e28,2.707323259896202e28,4.719035325552629e28,-8.495370130908998e28,1.0764889405491431e29,-7.560905417858863e28,-5.547703917813739e28,-9.997881696870447e28,-6.031316746957936e28,-4.943521516575507e28,1.2446323881702438e29,-4.6302626275793764e27,8.16713272184334e27,7.48511001909886e28,6.663321914803292e28,1.189329698762654e29,-9.100271276325923e28,1.0820284653282085e29,1.5907712968754996e28,-4.130430122394791e28,-3.720886667061107e28,3.1223578829761664e28,1.6164379017820417e29,-2.810408978442384e27,1.1851131921774293e29,1.2585005618204871e29,-1.2160080470763184e29,-9.484924082401697e28,1.5748430144589368e29,3.9984012557934245e28,1.6266130903953512e29,-7.550875583685896e28,3.859237837909739e28,-1.1568555900645636e28,-7.2472727535556136e28,1.351650846299695e29,-2.0217654172144786e29,-1.0359247569345894e29,-1.6681965495915675e29,8.048709819493256e28,-7.281690777192712e28,8.888958598843658e28,-7.6871668582747005e28,3.9987450440733774e28,1.5576422667817325e29,-2.263439322183068e29,2.207729753679314e29,1.0919284344228965e29,-5.045197372608228e28,1.4413377472003664e29,3.460683093263369e28,-1.610186621926678e29,-1.4176988084024065e29,1.9426798040548662e28,7.2565474813279695e28,-1.750072750776902e29,2.9857230562257333e28,-1.8274621371195326e29,-2.7051987616628885e29,2.249340602601131e29,9.491492894179369e28,9.548671307553955e28,2.783458196806323e29,9.946282523377048e27,3.243072715063214e29,-8.840139718617049e28,9.567930062544394e28,1.9497404503017288e29,2.4369275441894806e29,9.986898416904589e27,3.028104737028549e29,-3.709911887354918e29,-1.9446799623786856e29,-3.865582242832145e29,3.12130385077719e29,-3.615861992060723e29,1.9111284929911934e29,3.340398799328564e29,-4.11560472505847e29,-3.52507015185039e29,-2.5442786458139852e29,-6.11427928132899e28,4.448684188985506e29,1.0488987977149662e29,-2.214386212578908e29,-4.8455412901049494e29,1.925115386934816e29,4.9690851975045546e29,-1.771228197041521e29,1.8195850409314467e29,-2.1512196496093842e29,-3.938865814859909e29,3.265326394877089e29,-4.5516570901964125e29,5.168846210991083e29,-2.57058751617403e29,2.3979621649713673e29,-3.1626481693347136e29,3.7261160268095775e29,-4.5399357987966114e29,6.677170726750955e28,2.1758677581247334e29,9.189981127927701e28,5.719196089955172e29,1.5115468697531232e29,1.0102758845141906e29,-4.89142682516706e29,5.243501347140132e28,4.205267352995419e29,-4.67799852750047e29,4.117879394545938e29,-1.4179000756619064e29,-1.087179811582382e29,5.1157407442606425e29,-3.0058115782308774e29,-2.343072588183699e29,1.4366642099869296e29,7.42643886567904e29,1.639520640255649e29,8.377663257376879e29,-9.258500776647547e28,-7.625107879140069e28,-8.423721819946922e29,-4.8025802221583504e29,6.856949329807209e27,6.901618477710662e29,4.95744475301894e29,-5.0265019959391955e29,-7.610008206758423e29,5.527414364667419e29,4.856269656728062e28,1.1281940367227532e29,8.283500780865733e29,9.406721315656057e29,4.572051196536663e28,1.1365558932750386e30,-1.2918349912444267e29,-2.1952047155041287e29,6.780817320764308e29,5.3236121388395104e29,-1.0312454584340436e30,-1.0847718769127668e29,-1.1300827755317758e30,1.0386768010050784e30,7.044039006204913e29,4.038624484547915e29,-1.2570255778732276e30,2.380939167168578e29,8.162174496766483e29,1.3200180933036586e30,-7.54692419075502e29,-9.714940731259993e29,-1.45219327770813e30,1.0284063717045423e29,-3.813877241105864e29,-3.031243599582383e29,7.276807094670788e29,-1.207294449778923e30,1.2512259073693539e30,7.462893268190881e29,2.1792157270664286e29,1.5992275204772122e30,2.128882006119444e28,-8.998028830762587e29,-3.277544479230888e29,1.8392335989408477e30,1.389207335811843e30,-7.229331822155884e29,9.88322320535035e29,1.8347445929200955e29,8.105958690575766e29,-1.677521334448642e30,-5.1773136029895274e29,1.5654557243590952e30,4.429921282475768e29,-2.1062679341850623e30,-6.381939046790196e29,4.638378250498512e29,-1.8074320496772476e30,-6.037122424311976e29,-2.11629038257685e30,-3.9786168069661125e29,-1.387879481914724e30,-1.8618024306043234e30,-3.521575978442385e29,-2.786007028002321e30,1.1921963263334833e30,-2.338493366073658e30,2.4451017338977368e30,-2.3340330342621898e30,3.020141202644361e30,-2.997280717626903e30,-1.2965180865276248e30,-3.154086254448748e30,-1.493888978110911e30,6.887335774730553e29,-2.978467716253515e30,-2.0260712709735592e30,1.826740861752405e30,4.261903260908453e29,-2.5197202622618106e30,-4.814221422222602e29,1.6291287894681055e30,1.799607277309792e30,5.393198003463858e28,-1.0268393771687306e30,1.1334598342510056e30,-4.047375445208923e30,-1.3849842556924743e30,-2.334234471526883e30,-1.1322428237399723e30,3.5978357747223133e30,-2.5520789752125255e30,-1.25424172394211e30,-1.551995242052051e30,-1.9503472743947775e28,1.9657165561236635e30,4.118275922214772e30,3.47415238750627e30,-3.578594209145872e30,2.0882407345944238e30,3.121608160073346e30,-4.314639023011682e30,-1.2228408580298485e30,-2.7108447852508756e30,2.5029541234167576e30,3.382114447007369e30,-2.4628885083659994e30,-5.542958732856024e30,8.482206628785329e29,-2.0376190815182456e30,2.3429656360275949e30,2.544485712139526e30,8.959099908213721e29,2.2371719330902088e30,-2.8774967206420267e30,-1.5949607679126098e30,2.1624575973549306e30,4.8442461527628235e30,-2.4478598981551876e30,3.3509368545824176e30,-3.513490531445075e30,1.3284974990024357e30,2.4413895760528826e30,-1.7597285924138916e30,-2.649938195764326e30,-4.795103015964034e30,-4.515500839014833e30,-1.478221752835888e30,-3.5935060068993635e30,7.277440269568811e29,-3.1310810005643913e30,5.38062900950145e30,-1.7429999302692467e30,6.059488005322029e30,-3.191669567002519e29,-2.1054315086336164e30,-5.902913977794641e30,6.74213879697583e30,5.978387216713182e30,-1.3382384187939805e30,8.204183460072272e30,-5.317984966938523e29,-5.380388433263347e30,-9.621587932816534e30,9.572718315484432e30,7.142696420029114e30,7.347890421706854e30,1.140557316845381e31,-1.0625980428713843e31,-5.926859171503748e30,6.623139997310793e30,-6.254161934517483e30,-8.78783652528365e30,5.331404572441291e30,-7.666225372990688e30,1.070178007760368e31,-1.203850386346141e31,-5.831419313748451e30,-8.986051398204755e30,1.121246298480603e31,7.598116305702329e30,-4.426317172376042e30,-1.124075789361411e31,7.104537885458797e30,-1.3653128263177235e31,-9.510306311121008e30,-1.7059368336072288e30,-2.257418682706728e29,1.4567483590807105e31,-4.951603903479336e30,-1.6195403454455596e30,-2.1119840376916552e30,3.186189884051524e30,1.6774646056045565e31,1.6520272347562992e31,1.8660090391094e31,-1.6313712864171997e31,-8.806625650372101e30,1.1042797499578033e31,4.187901586943837e30,3.119876071605293e30,-4.2233092108116203e30,1.5588561680866734e31,2.046913061434279e31,-1.579217138525787e31,1.2188185804891176e31,3.7048867605120985e30,2.296339603677825e31,1.763521264718332e31,-1.6435802282694878e31,2.2727870690749288e31,1.5691223661468409e31,4.38673452319022e30,-2.206839440259459e31,2.5414374661316587e31,-2.278063546707219e31,2.948007621302505e30,-5.406915288060241e30,-2.6065978424533955e31,2.0410761257920156e31,1.3143317595953738e30,2.6347774197382846e31,-1.7801620077327455e31,-8.05775232017145e30,-1.9989560622034042e31,2.5722568538362584e31,1.0221898182433472e31,-2.3840244440854575e31,2.4763867696049065e30,-2.6757450143430573e31,1.0034987219272947e30,-3.571142934410386e31,-1.8473004284805357e31,1.8553830647253152e31,-2.137190805939821e31,-7.963402157926809e29,-7.786318854985385e30,-9.082094509944039e30,-3.819760221710282e31,-3.1313630429581074e31,-1.4165510920081962e31,-1.3531493400762529e31,3.7151637180120605e31,1.2356957893938477e31,-4.022906182157013e31,-1.8980114816210745e31,-4.10233357564635e31,2.478752728103329e31,-2.6978857049275165e29,-2.267359717500351e31,2.4768818247280387e30,6.949735538720054e30,-3.4165513034420016e31,-4.244215467241671e30,1.373028432683668e31,2.457897065218829e31,3.5846391404754e31,-3.9653209350209816e31,-3.0541690190279266e31,1.3417344207022876e31,-4.615474229039975e31,-1.0141827398622937e31,-3.2331466180592497e31,-5.990468737784083e31,-4.0375854430291017e31,3.8406710116121564e31,2.511637444678158e31,8.35235243083879e30,3.2626569808863707e31,-5.913479505887745e31,-6.9441405091342955e31,-3.6100916228964025e31,-5.370158261192604e31,1.6463040590336616e31,-6.493554513350809e31,2.447805919617342e31,3.8153727881257368e31,-2.362085341881419e31,-5.584327569940327e30,4.1323313773639395e31,-1.566985831545836e31,-8.803444241185203e31,-8.594896800176434e31,-1.9186332173594788e31,-2.80840842343978e31,-7.841233584985888e31,-4.535064220644456e31,-2.121442975535775e30,4.576047773070047e31,3.575649084510418e31,1.0263425267907563e32,7.467607323308741e31,-7.341478158267036e31,3.550636167517427e31,-1.787379053090681e31,-1.3004161922751084e29,-4.876033043800861e31,6.143792930923183e31,-5.954706294188243e31,1.07603914609754e32,-3.3642916163265365e31,4.505800962254864e31,2.7565075455075766e31,1.0671327477992751e32,-1.2129618184634126e31,6.168761117660848e31,-4.077395853839339e31,-3.7213838831391417e31,7.481416641161035e31,1.199575890611664e32,1.3904053148081611e32,8.597263393360911e31,1.1203955048457909e32,-8.717053434974886e31,1.3855078112418039e32,8.884428731130203e31,-6.103426414235923e31,-7.1183626775615825e31,-6.154424224580874e31,-1.0402901457568142e32,-7.549172097647157e31,-5.775248026251041e31,-2.2864803300485397e31,-1.1020618062921056e32,1.7447573336439623e32,1.4640366343479376e32,-8.981537390086896e31,1.876436628766486e32,-3.937353161539689e31,-1.855219110205659e32,-8.009122674614542e30,6.194522843306508e31,5.372932020593128e31,1.4726077249808742e32,-1.9028902468372276e32,-2.1959559163187635e32,-1.9282656965050043e32,-1.4137205614511833e32,-6.466890566365971e30,-2.6773352353661784e31,-9.751832039563044e31,2.9530933908867507e31,8.773345735946839e30,-1.65640303847446e32,4.34425027069845e31,6.1556002676181955e31,5.314463532253286e31,1.7453929384828829e31,-1.687637426234417e32,-1.3959483364051598e31,6.153034685243809e30,2.626659821358802e32,-1.5473135861461569e31,2.5562417299334956e31,3.001471700765761e32,1.3030865371387078e32,-2.8796813704906523e31,-3.0594504290775607e32,9.040779590951291e31,-1.938989545523445e32,1.897527451901417e32,-1.1674197210927673e32,-1.0317915906730545e32,2.759957698904175e30,-2.5238771416032973e32,2.6638483138514593e32,-3.420329921983789e31,-2.2736424566278553e32,-2.4978517734148958e32,1.1482598909909901e32,-1.1869550919111496e32,-1.19042238787587e32,-1.5620813887452741e32,8.208143145478692e29,-3.623837351250585e32,-2.8838250362729306e32,-1.253301714604125e32,-1.345454357984791e32,1.647615405048714e32,-3.6181911841026566e32,9.986117994841736e31,2.4295250269434572e32,4.002349365735122e31,-2.525299998935951e32,-1.5079222857390633e32,1.3217008031966093e32,4.6061184004790106e32,-1.710823849742101e32,-5.412512542069507e32,2.5593849370644936e31,3.298052152818212e32,2.487906666052418e32,-3.472356431487167e32,-3.341813720063212e32,5.6077031903387805e32,-2.5292672099055983e31,-3.972574731723833e32,2.457225869603779e31,3.966879433830596e32,-5.4941063306275935e32,-4.962452090518324e32,-3.721561885376822e32,-1.173672769002142e32,2.8171611914448883e32,7.470308160303826e32,5.6180148440097654e32,-7.702295802528333e32,1.0297700732745277e32,-1.6240966720117342e32,5.177490786179965e32,6.282131763172669e32,5.61554321935008e32,8.939075079598752e31,-4.389484889876134e31,-8.459925164833804e32,-3.931639149474764e32,-7.505991008223702e32,3.382259155427977e32,-8.762456046484464e32,3.2410755756538398e32,-4.480108870736414e32,3.585003559074465e32,6.1433331522554675e32,8.212679911625106e32,7.933478783727304e32,7.36698658977497e32,-1.401860709018567e32,8.510473351487925e32,9.160587645559978e30,1.04283078557369e33,-7.527511822094154e32,8.430715195894341e32,-9.828106554514826e31,-6.0036331662471614e32,-2.7559170094232112e32,-4.930300466560509e32,-1.078772827189292e33,9.0424972327558e31,2.49206324316245e32,9.998876514371621e32,1.1272222412493088e33,6.096046550748602e32,1.0929649586559218e33,1.0586098014281789e33,-2.5019385229695867e32,1.1532643216282406e33,1.0254770326179778e33,-8.884977293310112e32,-7.987015048151249e32,4.760715544149133e31,8.919259721560547e32,1.2814158744950632e33,-2.1814693098652886e32,-3.989486540085521e32,1.0602888349777121e33,1.7044136414761763e33,1.3581757393134974e33,1.18090427311288e33,-7.610762516023572e32,9.317423018671051e32,-1.356295308393823e33,-1.8477912378561894e33,-9.988028291064859e32,-6.4390750933594334e32,-7.30326439996528e32,-1.72730841404773e33,-7.958817868906426e32,2.1963965456014967e33,-3.666728491905463e32,-1.657286966348136e33,-1.2380630595767843e33,-1.7971118295579049e33,6.315404883434824e32,9.421294698804864e32,1.7404171158662277e33,-1.0595521059118324e32,-1.208477375835398e33,7.156212597548667e32,-6.479090731416809e32,6.922011363791414e32,7.093057539019475e32,-1.343405277077577e32,-2.1882170115344234e33,1.4846023774780807e33,7.173832352870321e32,2.863725764423841e33,-1.6217817628238968e33,-4.335624633332532e32,-2.0375788968240016e32,-1.4388459472310243e33,6.4171275770316905e32,-1.2996535166388252e33,2.4776054575005145e33,1.1136235472890114e33,1.9916205421151466e31,-7.99879404762505e32,-3.191727262382797e33,-3.066232328840281e33,-3.7127171132811376e33,1.8929313287061866e33,7.922161690630662e32,2.539591745890117e33,-1.0262273016530372e33,9.224175958924404e32,3.36836459379829e33,-1.508071090000348e33,-7.424038603910486e32,-1.0496459549749659e33,3.9361346513561764e33,-1.571208353141476e33,4.451777220254824e33,-4.11880013179297e33,-3.5154631284513854e33,4.771333800750785e33,-3.035022622509857e33,1.4955652649809822e33,3.5446919759764476e32,-2.1932764724749828e33,-3.3007213836566684e33,5.519609056005659e32,-3.497191752441553e33,-3.9071133135301994e33,-7.899354966544402e32,5.118733509640333e33,2.8605179522970425e33,3.9075741367098234e33,4.663975075640062e32,1.0239155260009242e33,-9.370495829292789e32,6.391988264426408e33,-1.2861929303641606e33,3.6113530354394015e33,4.4583813208794015e33,4.186587252464159e33,5.998418034346662e33,-2.70719598358145e33,-3.4465910307070154e32,2.3158571791081425e32,-7.242500113136957e33,-7.769684306506872e33,3.1083413235040877e32,6.376449254197035e32,6.4050135600347585e32,-5.580402202311148e33,5.203201253370873e33,6.057254229563798e33,-8.059107260051558e32,-1.0137401231055131e33,-8.858234693611449e33,2.1691525801869237e33,6.6334856072902e33,3.25285457512764e33,5.611390936344559e33,6.267634711600112e33,-1.0023135032638953e34,2.7982173818799664e33,-9.260448840015505e33,9.555003055023029e33,5.064837933119985e33,-4.066132050192826e32,-9.801576571017911e33,-5.644963870209979e33,-7.773109067625555e33,2.0630775602113133e32,4.887426270209919e33,-8.707223958949202e33,-4.4159510807754e32,-3.449666924848377e33,9.788658047737948e32,-8.647122589011917e33,-2.149309948782228e33,-8.113858872109071e33,-5.8721023465581e33,-4.075341627743837e33,1.1709221745546034e34,-7.717467376679795e33,6.912272180017346e33,1.434056728601041e34,-3.7367359354083623e33,-4.4539798250697224e33,1.4612869528811779e34,2.9805579030564476e33,5.620200388463498e31,1.3891306466353352e34,-1.415990479255718e34,9.919923638773593e33,4.6792227057326875e33,-1.4193404687960281e34,2.3575689110762175e33,1.4974697119374188e34,-1.08645368806004e34,1.06319601336597e34,1.7814756874582e34,-3.17633873923945e33,1.9809604402387444e34,5.306747684102177e31,1.7422185043143939e34,-7.572508311899594e33,-1.232868446532436e34,-2.8984944323103312e32,-9.379768000187036e32,1.4296829626482418e34,4.6066147370635115e33,-1.3373483266075503e33,1.3715465749353139e34,1.4331015340667283e34,-1.80964473451563e33,1.4862049527559376e34,-2.3299578964399963e34,-1.9719279345361026e34,-2.567453211270536e32,8.077340259920172e33,1.9373489268007559e34,1.747818945052121e34,1.0967129923416137e34,1.4171104436092594e34,-1.4825660280104582e34,1.1298975844167094e34,-1.568526820273879e33,1.6567495146800801e34,-1.5870656222806982e34,-5.0448535575807915e33,5.761879879280247e33,4.313248325523682e33,1.0861485513146067e33,1.4755360141153644e34,-2.441670100761125e34,1.4692158350387968e34,3.4810831814743558e34,1.802597667996495e34,-3.3980711314360117e34,3.785783553043863e34,-1.7059433949312222e34,2.334708119958742e34,1.1632444704309554e34,2.5641377757315725e34,3.1300368107140826e34,-4.264114671055451e34,3.8992209506037394e34,-3.864336295472693e34,-2.7434472007218634e34,4.02382803355008e34,2.236692484232267e34,-2.183216198003225e34,2.6344176124658663e34,-1.923609896862755e34,-3.9625609573748014e33,2.0376833480148163e33,-3.5160431033597906e34,-5.200094890430294e34,-4.724293131506974e34,-6.870812330161639e33,3.637428571147895e34,-3.8769429816567597e34,-4.906433230191095e34,2.3716435465588687e34,2.9326876282953094e34,-6.292224904952469e34,-2.6108056393325527e34,1.8480886220021267e34,-4.209918646487568e34,5.84381232181033e34,-2.7920118360510367e34,2.929850517313275e34,-8.676709355950837e33,1.7390112802091143e33,3.7670854591024886e34,-2.121570745454939e34,3.7960757865304815e34,4.0979130503771293e34,-4.984002057876701e34,1.1411315188912125e34,2.5713247604236477e34,-7.486937563594051e34,-4.256569178927999e34,4.928727539946593e34,6.029759828879277e34,-8.63088923368876e34,6.629012310958242e33,-3.8260812247906884e34,-6.6419548502749665e34,-6.942481135620011e34,6.4968291587654785e34,-3.160492116384566e34,-3.468629009503129e34,4.66081156629242e34,-2.3858853039468234e34,8.052882649946023e34,4.983442013802928e34,-3.9161401247086605e34,-3.305603695377606e34,-4.394847576492191e34,1.5720631507386026e34,-7.034996356163933e34,-1.024845992682952e35,-1.7549134556232615e34,-8.487036515921669e33,1.0087548519115081e35,-6.033335990064765e34,2.836162224788126e34,7.019901410500903e34,-1.2767928369359535e35,1.1734582185190834e35,-1.0952883461856033e35,3.462340645485571e33,6.529071554676674e34,1.2902166625811516e35,-1.0758461512454154e35,4.062247007493286e34,-7.1551107071196995e34,1.0432589147568765e35,1.6072628120920455e35,1.8792624280714112e34,1.4831411006763078e35,9.242966403192709e34,-3.1127417980132344e34,1.173039893821008e35,9.294293377925544e34,5.3808742454232325e34,6.587074492453367e34,-3.4973105946853242e34,1.5195508979357537e35,-1.9264195008171162e35,-1.7196589535260783e35,-1.7176532925920297e35,7.760138055687926e34,-9.913668451549088e34,1.1563083914260426e35,5.620992027907245e34,1.6308502244949797e35,1.587603928127381e35,6.432861825879509e34,3.456463525149064e33,-3.1308026004223846e34,-1.6849243367277934e35,-1.7653020998801397e35,-1.8425442104305777e35,-1.9953260163894285e35,-3.5994725867793817e34,-2.347251572165602e35,-5.104644761641234e34,-2.2886059021102124e33,2.729720574943056e35,3.8454549864055046e34,2.0525210249788822e35,8.578515456858705e34,-2.0347549018166836e35,-2.2389646984155748e35,-4.356983942450609e34,-1.2181396340154248e35,-1.7101194866185483e35,2.132263378267864e35,1.1475509064825284e35,-3.1684968347489914e35,-3.1042804283271173e35,2.422364227778063e35,-4.604214928400355e34,2.245776537758145e35,1.2358032557423706e35,1.705995066548462e35,1.737967987671906e35,-3.859101987880985e35,3.912902267777109e35,2.7325719965119444e35,-1.6222260409348957e35,1.4239097054810305e34,-3.884593253029137e35,1.6159209647268074e35,-1.336685564459018e35,-3.655722502425243e35,1.3568061505407342e35,1.9407946586237044e35,4.128863185440116e35,1.5677273647862087e35,-4.2558964327930494e35,2.8332404882250064e35,-4.723741109284656e35,-1.8188577628245007e35,-7.955247804575632e34,-3.853660201538693e35,4.044212647483375e35,1.9975224191247302e35,3.0318025052590683e35,2.555995794575591e35,-2.0684924321897265e35,-3.625540533915434e35,-5.65381675081292e35,4.820326577642545e35,3.420178363692773e35,1.208578082257594e34,5.378619709023686e35,-4.1584529234351306e35,-2.0407523251662087e34,4.150335205903919e35,5.387164862491662e35,-2.5843745301065753e35,6.343344995145939e35,8.2014017826912e34,-1.9649049768992327e35,1.7062386931481934e35,-6.208611166537431e35,-6.272370030320785e35,-5.958905389896349e35,-3.4157479248449755e35,-4.461245134228083e35,1.8808161666147182e35,-2.2387448402645977e35,-7.087659513857571e35,-4.600599945415235e35,-3.858017354336165e35,5.52134567852582e35,-6.915031647400116e35,6.618652164081068e35,-6.699371004473038e35,-8.07714637375122e35,-5.4321890388260806e35,-5.0181636569896015e35,1.269096019018099e35,-3.388302893209222e35,-7.965500423980994e35,6.789693486584175e35,6.173683034952205e35,9.917103982746113e35,9.518128386520031e35,-4.359968962508537e35,7.340612852880113e35,-3.27323587138163e35,8.158234021239694e35,-1.1731001072245189e36,1.0901800707934149e36,-1.1230779014860504e36,-2.1065498781238596e35,-7.076096163538614e35,8.440523171996392e35,-8.258794366510924e35,9.40734602372121e35,1.2469046266457068e36,4.962518549329333e35,3.7729572067792254e35,1.3043272973601452e36,-5.120538723323221e35,-4.911211579707533e35,-1.0352358946869102e36,-3.9344784732746184e35,1.122667420376064e36,-4.4307181270705245e35,1.0867276243836933e36,5.363430481847264e35,9.458656558610323e35,4.663427878289047e35,1.6777118009533073e36,-1.371299655415078e35,1.3672394497707095e36,5.177074157459743e34,5.227903579331988e35,-1.5957813242720065e36,-7.643136876342955e35,-1.898243232855437e36,1.9501188229996018e36,2.1704765867695003e36,-2.0892298491306976e36,-1.8639656437126157e36,1.1718298420949277e36,6.259342543558565e35,-1.6939762335232106e36,1.8461030206484747e36,1.1132914803959634e36,-2.0127143004445966e36,2.393945165112359e36,-2.093161705151793e35,4.0162823433522215e35,-8.691546512980087e35,1.330728101813961e36,-1.589635278793125e36,-2.1636027513897627e36,2.368971576778075e35,1.2266062129532272e36,-1.9081215586140406e36,-1.2475513661363107e36,-5.665032685639252e35,-2.2549574180021354e36,-4.138083362852713e35,-2.88428224157279e36,6.047894858173183e35,-4.67461707361053e34,1.1194681079455754e36,2.0319488383708346e36,1.7467193720469065e36,3.051951851163777e36,-3.364536108246355e36,2.0114641988823653e35,2.7643469660713465e36,3.449804625870707e36,-2.0832406754135943e36,-2.2563868525102177e36,3.304381650488425e36,1.6473677316229941e36,-3.248465899425008e36,7.162496851605295e35,2.5489747136558206e36,7.197899956024794e35,-2.9951655410506534e36,5.025481170079419e35,1.2500349313466454e36,2.8565764700542016e36,3.3302670757450855e36,-1.9105413847676325e35,4.858952604484962e36,4.439915486772318e36,-4.423535856454119e36,3.3227419848694806e36,3.626495470958219e36,6.895275312795559e35,2.4731524113917195e36,-1.9158065319215992e36,2.449301208821694e35,-7.479613910321639e35,2.240969844366567e36,4.1064087357611355e35,5.1668687382321995e36,4.108729724781991e36,3.5563934420276475e36,-7.773973471637386e35,-5.197680887546647e36,6.14175828455157e36,6.524460733109872e36,6.528517215030602e36,-8.601433985499613e35,-2.937426274598808e36,1.408227981191139e36,-6.241674504861559e36,3.139692287458574e36,-5.542150677089416e36,-6.740854394996532e36,7.750848058457113e34,1.6266018717716804e36,-8.326455851123406e36,-4.2271064238704535e36,-1.0888216247189453e36,-2.071718840651795e36,-6.347040355101929e36,8.980745468702305e36,-1.858573691884545e36,-5.290249171152413e36,5.569869125114006e36,4.630365411474707e36,9.038777879355453e36,-8.576951215632105e36,9.97026909046336e36,5.093238837681193e36,-4.708130388283658e35,-1.2655840920653698e36,-1.0176010684356302e37,-2.327899301189868e36,9.136523881837851e36,8.333266303973132e36,-1.076325869846623e37,-8.4780560878806e36,7.83270404085861e36,1.0936137084373556e37,-4.20670200289653e36,-9.66922742592116e36,1.131806626606572e37,4.696158379102452e36,1.1115854603725437e36,-5.740818780633084e36,4.1244457400109704e36,2.894349288814502e36,3.0245285676586337e35,-9.15357061328442e36,-1.0866267986240776e37,8.532234206883754e36,2.2019048142756587e36,-9.653021146822542e36,-5.752764486064335e36,8.794690488630907e36,-1.4202450553511827e37,-7.669667060386156e36,9.366579014243171e36,-3.112820313122286e36,1.4584906444028385e36,-1.0133222405996198e37,-4.908865039604267e34,6.67219083258457e36,-6.246482703588225e36,-1.0353864598869523e37,1.2430197529249823e36,1.0625013160782441e37,-5.636081051265127e36,-1.5321282776225063e37,1.597561993070147e37,-8.060036953021061e33,4.127780294914871e36,-1.366114092950357e37,-6.708112881468537e36,2.1264341899793259e37,1.0524856720683708e37,2.0906518361915036e37,1.8739029786066598e37,-9.232114244474561e36,-2.0103822987091517e37,-1.837184147937919e36,1.6175871963670124e37,1.4432486037332843e37,1.5860064704936466e37,-2.440240842535704e37,1.5880513176768747e37,1.6459641888784215e37,-7.694407797150811e36,-4.205420408139699e36,1.8004938394076832e37,-1.3327926292727577e36,-2.867904069052781e37,-2.0382301738600255e37,1.6549127879955526e37,-2.587390484800557e37,-7.802698751151208e36,2.6724896443047184e37,2.6445701468949317e37,-1.2901497504365002e37,6.597497056267322e36,-1.3483511389146588e37,-3.198634237417386e36,-2.5991121963707474e37,2.3691258973930204e37,8.673745846339032e36,-2.8559582368564703e37,2.9721657956203525e37,-3.8863454630713025e37,3.605851654168442e37,-1.6237411329708804e37,2.8702535089067953e35,-9.413091650066745e36,-2.2531082326890524e37,-3.7589901849290133e37,7.530000486379511e36,-5.400456495947705e36,8.968292069205663e36,9.474226635563952e36],"x":[0.16390948,-0.1774105,-0.1763324,-0.099376686,-0.17492926,0.49138108,0.4879722,-0.3409014,0.29603112,0.492944,0.30929866,-0.018742496,-0.31604508,-0.0008204214,0.16956583,-0.5771422,0.36500117,0.27549562,0.6256792,-0.27315354,0.11017371,-0.08591568,-0.01951046,0.6043964,-0.25183496,-0.36808595,0.7224323,0.5677039,0.010503794,-0.4211891,-0.1730017,0.14716695,-0.47264752,0.49730575,-0.79299307,0.44130263,-0.2616304,-0.94596523,-0.4307897,0.36268312,-0.04855784,-0.6109357,0.07514855,0.11446232,-0.99254334,-0.2437872,0.7458689,1.0347713,0.92995584,-1.1081578,-0.1970641,0.46126646,-0.84314424,0.45683,0.7629883,-0.49360746,0.22049592,1.1917293,0.26107624,0.4476327,-1.0923146,-0.27361843,1.0649402,0.6888793,0.47331563,1.3902745,0.12936771,-0.033145525,-0.9005795,-0.33541507,1.3563269,-0.08423947,1.5360571,1.5663427,-1.4266255,-0.5889589,-0.38434198,-1.4933892,1.8328224,1.4862945,-0.39277312,-1.9212209,-1.5515796,-1.2340719,-0.00481389,0.996681,-1.6040858,-0.826872,-0.8850365,-0.42024383,1.8823206,-1.2420602,0.11919308,1.5175221,0.96584827,-0.22242787,0.33249006,-0.07807408,2.305454,2.596454,-0.052895084,-0.2790322,-0.32993978,-1.9789556,2.7323058,-0.12114665,0.9054071,-2.2370136,0.8168228,-0.6564852,1.7222939,3.1281805,1.3484201,-1.14623,1.917836,0.16945732,3.3794026,2.2241848,1.0175194,-1.4654393,4.039456,-2.5281177,-1.1240026,1.6924014,1.0936538,3.0801165,0.35613695,-3.7062445,0.47862408,3.2355568,1.1319155,1.8327066,4.1792407,4.8578544,0.91354483,-0.22230396,-3.475861,4.2192073,2.1770566,-0.44317326,2.8017957,-0.1776679,3.0706818,-0.20723687,6.0152516,-5.068698,5.8811526,5.353963,1.1265985,-3.8811188,-1.7301517,6.558053,3.1886187,4.449847,-5.4619584,-2.6664824,6.996957,4.318466,3.3925216,2.828769,2.825561,7.852719,-5.9254904,-5.3077235,2.6553373,-0.06783548,4.67633,3.0861542,-3.30846,5.956985,-5.2117457,8.4533615,8.7248955,-7.5743594,-2.2680256,8.7130165,-4.3557115,0.07444279,4.3734484,4.526695,3.3619435,5.1273,3.7992072,8.910933,1.89409,-9.251111,4.668681,-0.12725997,10.037121,-1.0782703,-1.7591465,-3.2850473,-13.923357,-2.7124293,-6.7421246,-13.974935,-11.853111,-14.048827,8.8072605,2.048069,-15.890495,-11.285121,-4.792009,-12.366426,-9.220491,-16.780478,12.589883,-15.193557,-9.862444,4.6436777,5.0683875,-6.052977,-0.41783917,-10.450952,-10.953493,17.85348,10.591063,-8.721418,0.19242994,-7.1398883,13.582143,9.965585,8.62863,19.619188,8.693117,21.516901,19.892448,-18.723022,-0.45777974,11.29772,16.79365,-8.926749,20.157263,16.763418,-13.875464,22.330133,13.619887,20.835398,12.838163,26.623358,11.429535,-21.430958,-0.5243489,-8.582876,15.43646,16.793772,32.520885,25.763533,2.0341368,-4.553895,-13.019929,11.991907,-6.817974,-2.7661216,-16.215761,-20.07998,-28.88783,-14.021023,-10.111292,9.731059,8.08955,-43.600937,-29.64541,-16.43786,-4.0809655,-8.409318,-7.437786,-20.488781,-19.023867,27.985111,-35.716267,53.177826,-33.89968,38.70178,-60.272816,-46.250675,49.625565,-7.4390864,-60.433445,-18.549545,4.1874285,35.830776,5.5510907,-25.621674,-44.537876,-5.9592876,-12.90106,43.707573,24.092476,0.5187586,54.755814,69.125275,-19.5702,38.360203,80.00548,35.3055,33.262623,-13.336596,-88.57069,53.744167,-82.431694,3.819673,44.184044,63.760708,-63.720947,85.003876,-98.6757,51.2769,-1.9263642,63.99651,-15.034326,-89.305504,99.00046,36.371628,-102.37143,33.923714,39.4244,87.09545,-55.727955,-6.564015,-131.45886,-92.82127,-13.233418,-24.60903,-66.73882,-132.76443,-105.034065,99.6743,62.71659,60.706387,35.495857,131.13911,-30.5909,82.45386,-57.462307,94.80922,-107.7179,59.11278,134.78217,-61.709343,159.02756,-45.48247,148.80257,-101.11576,205.32228,163.28772,-184.46355,128.31625,-78.20352,-116.98196,-88.08817,47.516174,155.04958,-59.58215,136.59926,-193.98633,-117.699135,58.430176,-52.539032,180.3975,-61.68259,261.86792,148.67505,27.870914,-247.40268,192.74953,0.84931725,25.712128,261.04556,60.313644,-168.49492,-325.53635,-23.111591,-125.4528,106.331604,115.61593,-116.90057,-105.53918,223.39502,256.92465,181.2148,-117.401054,369.40427,-322.1585,328.0469,-417.08957,318.16687,429.69592,413.3527,-403.07025,-198.40318,-140.52367,152.3701,-199.48666,360.12268,294.0705,-118.80646,-59.67541,0.3231492,-377.17963,-243.8986,415.11783,-459.42062,-538.19934,-161.21098,-90.12539,-509.08563,-438.5243,-176.72882,194.2048,-334.3084,-232.65094,-140.88478,531.81006,551.5361,-341.9051,209.15752,483.6761,-640.0979,643.28766,-653.69635,312.09665,592.7057,-585.6439,400.724,-710.71985,-206.50844,534.4704,-593.3109,-798.52313,-753.92834,666.2205,573.6994,558.7852,-120.781715,-778.5405,68.928825,-610.98126,-1055.7239,734.5312,-1019.76105,47.37623,545.92596,558.08636,-1167.809,-270.40356,-575.25,369.4998,-1243.4407,535.063,1259.648,-549.1294,-689.31915,-906.4961,993.7135,676.0763,887.9119,85.48513,-1161.6566,1307.6663,546.207,-399.68063,1071.154,-306.4885,-568.856,546.2322,-115.524666,-1203.0883,-960.667,695.3493,-1453.3389,563.4911,1245.4681,-904.2648,-1158.0095,-895.3052,-1523.0072,-2077.6255,-985.4524,-1565.5442,-491.9247,2108.879,1918.1099,2176.4492,-364.21408,36.425495,67.779396,2373.8765,-2326.8528,1930.631,622.5875,-645.89,-2009.2809,-497.65607,176.57367,-2244.393,-53.349182,1033.1981,228.80914,-850.22986,-1643.074,1543.0186,-2820.1638,-571.771,-2997.7202,-400.99268,-2074.4126,2219.7595,241.05498,1096.7933,2595.9573,2183.1472,-1270.9102,-891.7336,-2667.3906,2434.2273,-1852.0721,-1253.255,3306.2388,1290.3948,-1726.6422,3643.615,-2131.276,3966.4836,2450.3704,-2855.301,4534.6025,946.55743,-3371.7954,-1848.3214,1862.1809,-1829.6354,-3366.1475,88.15816,-2777.27,-1316.811,-2912.4736,-3057.1274,4420.687,-1283.5562,4745.621,-5004.764,-3965.1892,6504.011,4397.407,-2993.4407,5549.63,6045.8086,-5764.073,4484.7417,-2828.2598,1374.4622,-3355.0654,-2033.4843,-4053.399,-226.01538,7169.895,820.272,2646.185,-6923.5435,-1026.5702,-6409.906,-7095.2173,-5509.9277,231.84967,-815.5527,8508.577,-7989.3047,-3265.4941,2837.83,3538.3796,8684.913,10413.623,10137.521,873.65875,-9663.413,3941.4675,-1351.4199,-8620.603,10814.971,869.2524,9405.707,-5857.399,-5610.4756,9231.914,2724.6611,-9621.353,8686.698,-13288.859,7731.1304,-1329.7533,7440.505,2495.9626,-14617.546,12604.583,-9276.93,216.94601,1886.9877,475.38217,6383.835,-5845.0034,-647.1842,16081.72,-11216.284,-1041.9281,18447.324,-5265.8896,-14406.443,-8248.851,8609.168,-5232.154,5576.928,13671.338,-10985.172,-22423.236,12845.732,-22316.46,-8888.223,20.935085,-12660.795,-21851.797,5203.0747,-20622.643,10359.078,-8524.661,9019.2,25288.162,26639.654,-20371.963,-2003.8293,15258.244,-7151.204,9602.235,1497.1855,14924.656,-24401.729,-32694.63,-10912.511,-33539.34,-21194.717,5513.233,-18291.623,9620.213,-2338.8152,-23979.709,-21049.977,167.34921,36410.47,-23650.936,-2160.15,-32510.547,43610.348,-12860.128,37432.953,-23230.37,-5169.4756,19415.162,39448.766,28021.25,-23298.395,-48040.027,-8680.916,41274.234,-32527.717,47150.15,11277.592,-39497.05,50559.395,57211.793,-5917.968,-36899.61,-7890.4204,36191.113,-26649.656,-54193.906,208.28888,-19168.047,-37423.266,66352.55,-11541.669,-63129.203,28584.713,-19019.53,-43388.324,-73889.75,-39072.523,46121.81,-62632.707,-72941.81,-83495.76,-34019.63,-48917.707,-48505.125,56083.125,-20365.838,65858.48,28754.645,27294.77,-60700.4,-98067.02,93382.85,-80742.37,-67609.164,7426.3613,-35007.98,87966.125,-105715.914,49330.77,-82198.734,6100.492,25061.803,-31864.492,-75322.13,53622.703,-58797.44,130509.46,66583.67,-3619.7505,-105575.0,-67813.266,104721.76,127887.02,21845.035,-74903.85,-29724.32,-148934.88,32792.32,76403.03,-67591.586,150562.27,-140749.55,-174914.16,97034.25,-41700.465,31831.766,-25556.42,-87368.54,67263.0,-123375.42,-14630.218,1034.1788,197888.55,-163584.08,-211979.2,-94189.21,62830.39,-134947.2,-65351.66,1588.7845,-180426.73,-226658.28,-150900.11,24605.951,-161283.39,188523.92,31532.604,153070.33,136594.31,249579.73,-247605.12,-108065.336,71283.7,-30606.29,-136021.89,167108.86,-97145.09,242860.73,165690.67,280654.78,21008.176,4141.307,-33051.812,-118871.02,195566.36,-200479.69,219186.72,-118152.9,16906.795,-148669.19,-32356.65,190071.16,-62094.83,-176673.84,-240663.44,37663.4,-443840.34,-115493.12,448478.56,-38601.227,-4088.4155,-343693.62,11781.994,319479.72,187217.4,-49365.875,-153910.2,345259.62,-351056.66,-381564.8,287076.8,-334879.8,283224.1,-615699.4,-617249.94,-564436.4,596565.0,479949.53,269485.28,202330.44,131672.52,286122.7,-447802.22,-367475.9,37455.168,-618856.06,-221633.42,662295.6,725405.5,132150.89,360015.66,555102.9,352161.62,308288.53,-460125.3,625080.25,639870.4,-659080.7,-758595.8,292698.3,124336.695,-797105.56,966650.44,-771138.44,-1.0061452e6,-633079.4,101564.2,-805286.9,-444299.34,-983565.94,974529.5,-15490.026,962588.5,1.0954776e6,879438.8,323360.22,-1.043914e6,-854032.0,-533157.94,385638.1,209503.12,-507155.16,-408353.94,-1.383567e6,-419812.38,-1.4720579e6,-425892.75,-257581.7,-1.5030676e6,-289468.7,781115.94,1.6881354e6,862183.7,516587.75,-1.5599666e6,939651.7,-406275.0,-1.7813511e6,-938539.0,-1.0806409e6,18417.709,126629.61,1.2365051e6,703203.3,-512897.72,473577.3,1.6711176e6,69549.64,-1.1557202e6,570507.2,2.2226262e6,-2.0933414e6,-1.3816171e6,-1.3985122e6,-391881.0,1.264525e6,1.5455124e6,-931132.25,-1.8432709e6,1.5338826e6,-1.0550498e6,-2.067367e6,-710152.5,-871064.25,604472.75,-653920.2,-1.5484445e6,-1.9731402e6,-1.9300905e6,-1.2814926e6,-137833.64,-2.459804e6,-2.030123e6,3.3309122e6,-1.8501985e6,3.5576032e6,-2.0371576e6,1.4074158e6,410268.1,-1.5211256e6,-2.0132518e6,-1.8556856e6,-3.341691e6,2.2289398e6,1.0620046e6,-1.8610951e6,-733388.75,178135.69,-3.8825635e6,788619.3,3.1248802e6,-3.3286688e6,-555986.9,3.591256e6,-2.7005042e6,2.3360168e6,749807.1,-281144.84,-1.4167274e6,-3.6144015e6,-3.086098e6,-4.1610212e6,1.1365381e6,4.858082e6,4.235142e6,-3.5223242e6,-2.4693998e6,722981.75,3.5621592e6,1.6506344e6,5.0556725e6,-987514.44,111477.375,-2.8450222e6,-143584.64,840239.0,-4.056562e6,-7.5226735e6,5.0189595e6,-3.8430735e6,-2.255573e6,-7.7193985e6,-4.5664455e6,4.160244e6,-2.1604395e6,4.3973025e6,-8.863884e6,9.037906e6,-3.938028e6,5.4625395e6,396168.25,8.553064e6,171309.12,7.7575885e6,4.700132e6,5.904701e6,-3.454468e6,1.008056e7,1.3414005e6,-9.349362e6,7.1521395e6,1.7370411e6,8.835528e6,-1.0639881e7,6.2027265e6,8.657128e6,-3.7648782e6,-8.407675e6,-1.8835345e6,7.2702665e6,-1.2244515e7,-2.4938085e6,6.792034e6,2.5464745e6,-1.994638e6,-8.525583e6,-9.411357e6,1.031847e7,-1.4002065e7,-6.532373e6,-6.812353e6,7.690915e6,-7.657697e6,-9.288994e6,-5.0217665e6,1.1406192e7,7.498857e6,4.2050915e6,-7.937346e6,-1.0962921e7,8.569031e6,-2.8801148e6,5.134205e6,-1.7429518e7,6.4539635e6,-1.7504008e7,-1.4885414e7,1.3943673e7,-2.1883944e7,-2.879301e6,-2.2269996e7,3.793978e6,2.1958096e7,2.0875856e7,2.1161154e7,1.6545739e7,1.988405e7,1.4654559e7,-767197.2,9.12787e6,1.9850098e7,5.7007445e6,-5.137868e6,2.2984154e7,2.948748e7,2.5287295e6,1.853785e7,-4.6638615e6,3.863706e6,-8.691044e6,-596292.9,2.5088996e7,5.378908e6,1.3325107e7,1.6254129e7,-3.1435584e7,1.83746e7,-3.0111742e7,3.7147505e6,3.7455496e7,-2.4630782e7,2.3438778e7,-2.8833052e7,4.114741e7,2.2553426e7,1.334224e7,4.172534e7,5.404232e6,3.5630856e7,3.040797e7,2.0009954e7,-3.440533e7,-3.0112738e7,-1.6863072e7,2.5803402e7,3.2148246e7,-2.326306e7,5.232563e7,2.2246166e7,-1.6413593e7,3.1903506e7,-5.309523e7,2.2161518e7,2.7627464e7,-2.2717862e7,-1.1521491e7,5.2398136e7,2.63784e7,2.9643118e7,-2.083527e7,8.186477e6,1.742445e7,-6.530557e7,-4.9542816e7,6.3540655e6,-6.9894264e7,-3.1290414e7,5.541612e7,-2.4558538e7,1.7371904e7,595805.56,7.6309864e7,-694851.3,4.8595284e7,-569955.3,5.842831e7,3.0412386e7,-4.6258424e7,5.5268616e7,7.831678e7,-3.777882e7,-4.807566e7,-7.854089e7,2.364137e7,-7.960947e7,-3.0988912e7,3.547229e7,-7.462021e7,-9.888264e7,-4.258295e7,-8.751462e7,5.8129944e7,-8.994508e7,-9.661304e7,5.5931384e7,7.8202536e7,6.2819736e7,-5.8545564e7,-1.2770394e8,1.6093216e7,-9.415758e7,3.0823874e7,4.0578836e7,4.28342e6,-1.3275827e8,1.3745928e8,-8.011286e7,-9.4962856e7,-9.70061e7,-4.8892936e7,2.5908506e7,-7.465737e7,-1.1199208e8,1.6246531e8,3.6442055e6,-1.0575281e8,1.0986634e8,6.22621e7,8.717792e7,-1.0984441e8,-1.6891928e8,1.0432776e8,-5.1326172e7,6.5923828e7,-1.2345415e8,2.0182378e8,1.0334174e8,-1.5648778e8,-9.18377e7,-1.4836205e8,1.03962936e8,2.031428e8,1.0742739e8,-2.297091e8,-1.7627499e8,-2.4219818e8,-1.1330778e7,1.440539e8,1.8738797e8,-2.634744e8,-1.7759805e8,-1.0911267e8,-1.4116557e8,1.6945523e8,4.392292e7,-7.77404e7,1.8455994e8,1.16764456e8,8.299702e7,1.45023e8,2.1728506e7,2.0813256e8,-1.11918856e8,-2.3442909e8,-1.604918e8,-2.9384022e8,-1.87762e8,1.4259045e8,-1.8947827e8,-1.789255e8,-2.1813326e8,-1.1195257e8,-3.7522296e7,-1.5142006e8,2.8049555e8,-1.9087272e8,2.759461e8,9.921297e7,4.674535e7,2.0574523e8,3.6988205e8,8.672919e7,-3.3137574e8,-1.1370157e8,-1.6510987e7,5.9565348e7,2.2003768e8,-1.392979e8,4.359987e8,1.0801351e8,2.3855301e8,-2.1593256e8,3.6709706e8,3.598037e7,-4.2155904e8,-4.5501955e8,-5.507619e8,2.2462716e7,5.6475283e8,1.4594243e8,-3.7083565e8,-342281.12,5.7681734e8,6.785734e8,-1.4049236e7,-5.6512564e7,-6.465514e8,-4.6555702e8,-4.115543e8,1.8283453e8,7.079253e8,1.8138642e8,3.644388e8,6.0217764e7,-5.6668045e8,4.6693232e8,7.068394e8,-3.176016e8,-7.753592e8,4.1664576e8,4.0164496e8,-5.875648e8,3.672711e8,5.5053754e8,3.9694822e8,9.238337e8,-9.579286e8,-2.4766654e8,6.181146e8,-7.5566605e8,-1.084714e9,8.171647e6,5.3169366e8,-9.9525997e8,-3.863661e8,2.6737392e8,-1.5581475e8,-5.9482784e7,-1.04329754e9,5.657201e8,1.4885018e8,-9.171235e8,7.7799443e8,-1.0283464e9,-4.7261603e8,7.429305e8,1.1396806e9,1.6057954e8,-1.02882125e9,4.9819712e8,-1.1713431e9,-1.7843656e7,1.4530964e9,2.754377e8,-7.365166e8,-1.2229421e9,1.3195098e9,1.410793e9,1.7159817e9,-1.1281238e9,-1.3771837e8,-6.863361e8,2.603133e8,-4.8671498e8,5.1607226e8,5.071917e8,1.8989202e9,-2.01304e9,-2.0401843e9,3.7003504e8,2.0661157e9,1.5463955e9,7.668535e8,-3.9528e6,1.7526765e9,-1.4108682e9,2.629837e7,8.877569e8,2.436783e9,1.1119057e9,2.3180713e9,-1.3371045e9,-6.096504e8,-2.6500022e9,-6.136464e8,-2.44248e9,-2.665681e9,-2.6807916e9,2.809253e8,1.7810769e9,-2.3541875e9,-2.3071767e9,-2.4326502e8,-3.201962e9,1.8872648e9,-1.6846207e9,-7.3053926e8,-4.3045456e8,2.960658e9,1.483106e9,3.1341796e9,9.97936e8,-6.194321e8,-1.2636941e9,-3.7581064e9,3.8050614e9,-2.0198198e9,1.209369e9,-1.8949594e9,3.4447877e9,2.2481882e9,-1.4708316e9,-2.2718705e9,-4.454925e9,6.6119277e8,3.844004e9,2.0536559e9,-4.707298e9,-4.2216968e9,3.279051e9,-1.2974042e9,1.9927195e9,-4.11508e9,1.701519e9,-5.037859e9,5.048454e9,3.1867418e9,-1.7293946e9,2.0871345e9,5.3407263e9,5.360266e9,-4.4346004e9,5.280431e9,6.357908e9,1.0143987e9,2.746644e8,2.3558789e8,-7.045348e9,3.9978872e9,-2.6165097e9,6.759259e9,-3.9487485e9,-9.469599e8,6.013328e9,-5.657697e9,1.7475017e9,-1.9163812e9,1.403698e9,-6.6614103e9,-8.5464986e9,4.8323154e9,-3.2135388e9,5.9912146e9,2.35969e9,-1.3800799e9,2.885869e8,-8.1773834e9,-9.645078e9,-1.7580456e8,7.1472164e9,-4.3594813e9,2.438371e9,9.719765e9,-5.38331e9,-1.2155154e9,-5.732252e9,1.0447901e10,9.920302e9,1.7087635e9,-4.319077e9,-6.4309263e9,5.248875e9,1.1090825e10,-5.4991017e9,1.0603379e10,-3.9785157e9,6.2504417e9,1.166577e10,-1.2359678e10,-9.789907e9,1.4695678e10,-1.1290089e10,5.7591173e9,-2.7513377e9,1.2175469e10,1.0362151e10,8.953563e9,4.94994e9,-1.0005552e10,-9.664711e9,9.306963e9,-3.1514522e9,-1.7938264e10,-1.5587785e10,-1.865333e10,-2.0124695e9,5.231453e9,-1.5002399e10,-7.1590303e9,-2.0024592e10,1.7815613e10,4.333794e9,-1.3260204e10,-1.0508235e10,1.419947e10,1.4865302e10,-1.9254585e10,6.896449e9,-9.679187e9,1.5470814e10,1.6552181e10,-1.2382709e10,1.3818661e10,4.909052e9,2.682103e10,-2.1862711e10,1.5303575e10,-2.2386743e10,1.7099681e10,-2.8096915e10,-1.9888845e10,-6.02083e9,-2.44884e10,-1.8960355e10,2.6730967e9,-2.7746488e10,-2.3214166e10,2.5118896e10,-2.4351457e10,-2.459355e10,-1.5569543e10,-5.9798467e9,2.485977e10,-3.4300154e10,-3.2972423e10,-7.601846e9,-3.952322e10,-3.970418e10,1.7083803e10,1.1842788e10,-5.650814e9,2.0088681e9,1.2590739e9,2.4799848e10,-2.9635932e10,2.9108167e10,1.779385e10,-3.0200283e10,-3.800565e10,-2.371939e10,1.9378024e10,-4.9815654e10,3.056425e8,-2.2584302e10,-4.5083247e10,-3.819501e10,-1.3838466e10,-1.3302917e10,-2.7224246e10,-2.0469756e10,1.721015e10,-3.2811287e10,3.8610686e10,-2.3594695e10,5.0211217e10,2.9154544e10,4.6088307e10,-3.0629347e10,2.3631007e9,-2.7423762e10,1.6386408e10,-3.045085e10,-9.53436e9,-4.119504e10,-7.163742e10,3.0107705e10,-6.722467e10,6.927841e10,4.2483274e10,-3.4411246e10,3.541625e10,5.3535916e10,1.3570217e10,-4.323188e10,5.7352303e10,-1.2785603e10,1.3709914e10,-4.167772e10,-2.2011394e10,-8.385005e10,-2.3985498e10,-1.924247e10,6.4863908e10,5.556799e9,-1.0289879e11,-2.6811453e10,-9.434169e10,5.0768155e10,-9.8548556e10,-8.609911e10,-1.1718681e11,2.7123399e10,1.2461102e11,7.167276e10,6.151875e10,6.91348e10,7.989778e10,-7.78058e10,1.8947953e10,1.7875016e9,7.5867185e10,-9.7717084e10,-5.6054096e10,-5.4537708e10,1.5437429e11,-3.944655e10,4.4716302e10,1.147644e11,-2.8075422e10,-5.33681e10,1.9373971e10,2.0622037e10,3.1275672e10,6.032896e10,-1.3028253e11,1.3638053e11,4.4261585e10,1.3817212e11,-3.6407394e10,1.4706067e11,5.263836e10,-4.326426e10,1.5693282e11,5.4587978e10,4.3547423e10,1.2640885e11,-1.0429964e11,1.8790348e11,8.994233e10,-1.4787699e11,-1.7340858e10,-1.6046475e11,-9.702264e10,3.95845e10,4.0696144e10,-9.3382e10,-1.7668879e11,1.915753e11,2.0597188e11,2.4431475e11,4.22639e10,1.689786e11,2.616699e10,2.6902e11,-1.5357184e11,1.5321748e11,-3.1673342e11,6.0575797e10,-9.249674e10,-4.525847e10,3.3382036e11,-9.801444e10,7.0239e9,-1.8097568e11,-8.416163e8,-2.9521959e10,-3.4285e11,-2.3764392e11,8.851473e10,-5.7418363e10,5.5999865e10,-1.5715626e11,1.7892675e11,2.95675e11,3.445691e11,-2.7086363e11,1.5551794e11,2.058009e11,-1.2651462e11,-5.082047e10,-2.5944516e11,-1.991233e11,-2.8524544e11,4.6569462e11,4.7479158e11,4.203101e11,1.6566549e11,1.76929e11,1.3009309e11,2.9340356e11,-1.7201272e11,-4.0400958e11,-1.23075625e11,5.9377566e10,6.221734e11,2.1979447e11,2.647161e11,9.971588e10,-6.09118e11,-1.7181339e11,-2.3657079e11,-2.5409066e11,-2.7396355e11,-5.7925878e10,7.347705e11,-5.565905e11,5.288154e11,1.1925243e11,4.7257295e11,-5.8121814e11,8.426824e11,7.119002e11,-1.12452755e11,8.1682484e11,-6.722332e11,7.459624e11,-4.1596106e11,6.1467394e11,-9.4401076e11,-7.8997986e11,7.920994e11,-7.670689e10,-2.7143096e11,-6.887381e11,-1.0532229e11,2.5645238e11,1.0712993e12,-7.0125445e10,-3.2305254e11,1.02325223e12,-3.759402e11,9.5595286e11,-9.676972e11,8.145655e11,-4.4982554e11,-4.0235513e11,-1.0606189e12,1.3239685e12,1.0714867e12,-1.2423657e11,1.1823498e12,-7.588501e10,1.7726626e11,-1.09440886e12,1.08901414e12,3.4177676e11,5.594369e11,-5.4784665e11,3.0274362e11,-1.493971e12,-4.166447e11,1.1759641e12,-1.4597424e12,-1.4412812e12,1.0833442e12,-1.3108013e12,-1.549879e12,1.5789763e12,-5.1909817e11,3.1218277e11,-1.4604565e11,3.3790152e11,-4.033652e11,1.5212244e12,6.1893634e11,2.5107499e11,4.0427002e11,-1.6452535e12,-9.272672e11,-1.0950173e12,-1.9523762e12,-2.2985487e11,7.827873e11,-1.603694e12,3.9120957e10,2.391793e12,-4.9869842e11,-1.1435238e12,4.7668327e11,1.06493044e12,-2.1117207e12,-1.3076262e12,-2.1860423e12,2.000595e12,1.379222e12,1.782517e12,3.0278688e12,-1.6221161e12,-1.3470429e10,-3.290035e12,2.9296112e12,-1.0362876e12,-2.3945706e12,-3.557232e12,2.3715554e12,-2.254133e11,2.3657736e12,-3.2886405e12,2.7711714e12,2.7121303e12,1.04904275e12,-2.9361242e12,4.1865162e12,9.547639e9,5.390762e11,3.940462e12,-2.6465715e12,4.0353493e12,-3.6239586e12,-3.9317788e12,-2.2330828e12,-4.7295003e12,4.7216463e11,1.5657921e12,-4.9679334e12,-1.399895e12,4.358465e12,2.209132e12,2.8608063e12,-2.573272e12,1.0691458e12,-1.8098533e12,2.537323e12,-3.4295875e12,-2.8529504e12,2.9540252e12,-4.5730706e12,-4.7302144e12,-2.7241457e12,3.064348e12,-1.7771679e12,-6.3778697e12,-6.013752e12,-4.1233453e12,-6.359672e12,2.3809032e12,-1.7908551e11,2.6191772e12,1.5524016e12,-2.6452006e11,3.436986e12,3.0694572e12,-8.132181e12,5.210555e12,-2.1834457e12,-5.9536567e12,7.668627e12,-9.103602e12,-6.8126297e12,-1.7071532e12,-6.083798e12,-8.0025134e12,-7.7580117e12,-1.3607081e12,3.8626672e12,6.854659e12,1.4830705e12,-1.1321158e12,-5.9235033e12,1.0268853e13,1.0393188e13,-3.9425703e12,7.0954307e12,-7.69895e12,-7.4707354e12,-1.0515553e13,7.0344334e12,3.150869e11,9.860328e12,1.224427e13,-5.7391343e12,-8.68547e12,9.326158e12,6.4690444e12,-2.1498939e11,1.8152742e12,1.351265e12,4.407185e12,1.1565867e12,5.553901e11,-1.0913988e13,1.0577917e13,-3.5994793e12,1.6083403e13,-2.9230055e12,1.327988e13,3.9186874e12,-4.2895448e12,1.6076291e13,-1.4266655e13,7.241881e12,-1.1179431e12,3.5755574e12,1.3237082e13,-3.5749864e12,-7.5450973e12,-1.9303926e13,1.768016e13,6.953836e12,-3.7307734e12,2.9259577e12,-1.3891042e12,2.6295866e12,2.2830758e13,1.9377408e13,-1.5275983e13,8.4273314e12,1.7638403e13,5.8702467e12,9.614058e12,-8.483531e11,1.9108976e13,-2.3196659e12,2.9892406e12,-2.4233942e13,-1.8544882e13,2.9847403e13,-7.6937645e11,-1.7210123e13,-4.015027e12,-3.367896e11,3.3871192e13,-2.7986676e13,1.3328786e13,3.467218e13,-9.162403e12,-5.425137e12,1.8826658e13,-1.7299053e13,-1.7172684e13,2.2089717e13,1.033432e13,1.4900929e13,6.3872917e12,1.6345633e13,3.0171254e13,2.7183429e13,4.63454e12,-3.892945e13,3.6483864e13,-3.5086076e12,4.4093707e13,-4.0761064e13,-3.411267e13,-3.5102426e13,8.332094e12,-3.68597e13,-3.9531273e13,6.4894366e12,-7.667371e12,-3.238426e13,-4.453117e12,-5.076296e13,2.759241e12,2.1509718e13,-1.3300254e13,4.256321e13,2.1570708e13,1.5938843e13,-1.81737e13,-1.777861e13,2.801792e13,-1.333439e13,6.5984845e13,-2.6172346e13,5.9350895e13,-1.9889962e13,-6.6087287e13,6.923836e13,-7.6231386e12,7.726684e13,5.9528817e13,1.1841983e12,-1.213667e13,-8.233572e13,4.1390742e12,-5.0499827e13,-6.2172076e13,-4.3753973e13,2.019457e13,2.5085398e13,-9.4558134e13,-3.6371717e13,-3.8273422e13,-5.916224e13,-5.812731e13,-1.0237685e13,1.0716896e14,-9.658021e13,9.976272e13,-8.7940655e13,-5.0212563e13,-6.9064726e12,-6.5278795e12,9.181096e13,7.9213625e12,9.889429e13,9.640303e13,-5.3787704e13,8.505723e13,-1.1258766e14,9.7673445e13,1.9372247e13,1.3788812e14,-5.974504e13,-4.7936356e13,-6.2629993e13,1.1067077e14,-1.1606686e13,-9.9529995e13,-1.36001465e14,5.3897947e13,1.8427152e13,2.1376988e13,-1.0086675e14,-1.0682838e14,6.9930393e13,1.2385934e14,7.248817e13,-1.6760627e14,-4.5173346e13,-2.4812339e13,-1.4532161e14,-1.1038514e14,6.570081e13,-1.23728e14,1.2223115e14,1.3483574e14,1.790491e14,1.1967093e14,2.0955291e14,-3.8489358e13,-2.3001271e14,-2.1051707e14,-7.999148e13,-1.0057127e14,1.187943e14,-2.281905e14,-2.997048e13,1.673558e13,1.429904e14,1.3900231e14,2.3300339e14,-1.903351e14,7.0013877e13,2.2895945e12,4.576544e13,2.9256274e14,2.0982791e14,2.6404571e14,-2.5403329e13,3.9066775e13,3.28517e14,2.1093013e12,-3.2893547e14,2.8012057e14,-1.7922917e14,1.3813155e14,-2.0857408e14,-2.3825777e14,-5.8093623e13,8.79913e13,3.206967e14,3.2411224e13,-4.6587103e13,-3.3891738e14,-9.322626e13,2.1034617e14,-2.6072955e13,-9.52777e12,1.8761051e14,-8.6967065e13,2.9254975e14,-1.0199447e14,-4.5320696e14,2.8973017e14,3.137923e14,4.7736505e14,1.3373934e14,4.320044e13,5.4551782e14,5.1692622e14,-1.3473339e14,1.1144688e14,-3.9892583e13,4.331341e14,3.507522e14,-4.5153397e14,-3.6319354e14,-5.779404e13,3.3666974e14,-1.6382014e14,5.154249e14,2.3441948e14,-8.830533e13,2.0521802e14,7.022216e14,-3.181393e14,2.1987045e14,1.650517e14,-7.67276e14,2.8698096e14,3.6806692e14,5.8232744e14,8.2762074e14,7.6692037e14,-8.43434e14,4.1943342e14,-6.758557e13,-1.6352853e14,1.1866444e13,-5.754744e14,-1.2409599e14,2.0699534e13,9.080397e13,-3.694943e14,-1.0649882e14,-1.2311842e14,-5.1156624e14,1.20546235e14,-6.205762e14,1.478399e14,-2.1937579e14,-4.449613e14,2.8431335e14,4.3570588e14,-6.687498e14,6.9079226e13,-4.9704116e14,-4.8026975e14,6.721241e14,1.2062511e15,-8.966142e14,2.3227997e14,2.4358454e14,-1.0508256e15,1.541771e14,1.8803434e14,1.2267593e15,1.1380945e15,-1.1656086e15,5.373598e14,8.1845325e13,-1.4832741e15,-6.5006e14,8.568932e14,-7.828167e14,-1.924288e14,-1.0832665e15,-1.3698104e15,9.311849e14,6.404696e14,-9.323388e14,1.8327518e15,1.8554967e15,6.611819e14,1.3245595e15,-4.5851715e14,-1.9149761e14,-1.753406e15,6.094543e13,-9.6521115e14,-9.510975e14,5.5683462e14,-1.1012763e14,-3.741333e14,-2.7184105e14,-6.9260374e14,-1.2503589e15,2.1139072e15,1.655208e15,-2.496899e15,-5.7316795e14,1.4100506e15,2.2806338e15,1.5626714e15,1.2735214e15,-2.5510076e15,-1.802885e15,-8.113087e14,1.1110722e15,-4.5058384e14,-2.4455444e15,3.1617037e15,2.455534e15,-4.0382175e14,3.150475e14,3.4507496e15,-2.406711e15,-3.522179e15,2.9716825e15,-1.9543768e15,2.0392882e15,1.7904341e14,2.047445e15,2.6212565e14,-3.1873684e13,3.679428e15,2.2313665e15,-1.3630105e14,1.6216325e15,-2.5595613e15,-2.6253355e15,4.6399235e15,-2.8972598e15,-2.0289533e15,-2.8995426e15,3.385092e15,1.1535514e15,4.6829934e14,2.0801451e15,4.1080452e15,2.0317964e15,9.9941084e14,-3.9591682e15,5.5889975e15,5.637316e15,-1.721466e15,6.4231726e14,-2.950753e15,1.3920747e15,3.3148037e15,-6.130989e15,-4.363283e14,-2.4527082e15,-3.3769653e14,5.4515435e15,-3.0704815e15,-6.0708536e15,-5.2302023e15,2.6037514e15,2.55946e15,6.1690145e15,-8.031398e14,-2.5174537e15,-7.6820236e15,4.546498e15,5.792654e15,-4.1056368e15,2.3897982e15,1.2426397e15,2.0243126e15,-8.101798e15,-7.8112645e15,-1.5186881e15,2.5122013e15,-1.4292076e14,7.9041754e15,5.7386073e15,-9.365849e15,-3.6355628e15,3.858576e14,-8.7678917e15,-8.6429033e15,8.915632e14,1.2074314e15,-5.501958e15,5.3319915e14,4.4510765e15,-9.300648e15,7.672976e15,-1.3001555e14,-1.2005217e16,8.9871074e15,1.0746207e16,9.431837e15,-4.174906e15,7.6369834e15,-4.8635603e15,-1.2111398e16,-8.4356594e15,8.563553e15,-1.3300099e16,1.2178865e16,-6.525809e15,1.5395389e16,-1.1452218e16,9.047989e15,2.1721087e15,6.610571e15,-2.3170978e15,4.7002705e15,1.7043639e16,1.1958371e16,4.0275624e15,-2.0429231e15,-1.9621844e16,1.6778318e15,-2.0230318e16,1.1328637e15,8.865714e15,-1.9867806e16,4.1264443e15,-9.336054e15,-3.932238e14,2.859848e15,-2.0829668e16,-1.9028868e16,-1.5325604e16,-2.0019156e16,1.8246216e15,-3.0143138e15,-7.409823e15,-1.704258e16,1.906431e16,-2.0796298e16,2.2627095e16,-1.817677e16,-1.0731978e16,2.2365183e16,9.683016e15,-4.768934e14,-1.0552626e16,-2.9560864e16,1.1620501e16,2.4460255e16,1.4303351e15,-1.0467339e16,-9.910969e13,-1.1802694e16,-3.4739252e16,-1.4731799e16,-7.664815e15,-3.7402005e16,-2.772753e16,3.5441267e16,3.122961e16,-1.13575e16,3.609613e16,-7.802543e15,-3.5384498e16,2.824441e16,2.1541138e16,2.1757464e15,3.6533652e15,-5.5758667e15,-2.2589003e16,1.5607952e16,1.656247e16,-1.0232345e16,4.636565e15,-3.4455662e16,-4.4085952e15,-2.6004232e16,4.5086123e16,2.2605637e16,-4.011837e16,-9.885494e15,-5.4172487e16,5.9839847e16,-4.9671593e16,2.2399556e16,-5.2390634e16,-1.8308788e16,3.0228869e16,2.5716853e16,-5.8528048e16,1.89779e16,4.172132e16,-2.5035448e16,-6.072763e16,-3.774271e16,5.1875818e16,-7.0341455e15,-1.6940345e16,1.7270896e16,-6.317613e15,-9.51793e15,-6.751108e16,6.7496493e16,6.8476223e16,8.042955e16,7.41e16,-7.1393725e16,-2.7878573e16,5.5385566e16,-5.9008056e15,-3.6469826e16,3.252346e16,9.573667e16,-7.0938665e16,-1.0080251e16,-3.5449958e16,2.8891208e16,3.8217053e16,-1.0026564e16,1.6395785e16,-5.7545046e16,-7.517711e16,-5.283369e16,5.0695084e16,-1.1766182e17,1.7502031e16,9.522651e16,-2.6776903e16,-5.879303e16,-1.7483093e16,-7.610965e16,1.0930224e16,-1.3060324e17,-7.113863e16,-3.771143e16,-1.4898436e17,2.4627031e16,-3.8349e16,6.464447e16,1.0597615e17,-1.123277e17,5.9347935e16,3.8903084e15,4.692836e16,5.2867143e16,1.4621282e17,-1.7405307e17,-6.423429e15,-1.443325e17,1.4500557e17,1.9086422e17,-1.087308e16,8.169573e16,3.640118e16,1.4273879e17,3.1773215e16,1.830314e17,-2.8052624e16,-4.23397e16,-5.729746e16,-1.3092639e17,1.5719585e17,1.3867375e16,-7.661913e16,-9.861956e16,1.0966836e15,-1.7944126e17,-2.6120843e17,1.4282192e17,-2.6508619e17,4.2905714e16,-2.882351e17,1.7281488e17,-1.5228846e17,2.9449213e17,1.4006239e17,1.2222395e17,3.1427664e17,-2.6670165e17,3.1667258e17,-1.9713178e17,-3.211835e17,5.137983e16,-1.722397e17,-6.9908633e16,-9.54648e16,3.293727e17,-1.5437775e17,1.3194806e17,4.297074e16,3.995491e17,-3.8118257e17,-2.2619517e17,2.0737062e17,2.5086727e17,-2.9010535e17,-3.6356812e17,4.1412745e17,1.0345924e16,6.3032034e16,-3.50127e17,6.1500015e16,1.336004e17,2.528678e17,-2.5188559e17,1.6535612e17,3.7745197e17,3.1937287e17,-8.907446e16,6.934725e16,8.74028e16,-8.6599365e16,-3.630832e17,-7.7007114e16,8.8498265e16,-7.477275e16,4.3782738e16,1.7560274e17,-1.4732621e17,-5.6961567e17,-2.3068773e17,-2.9006158e17,-2.9852696e17,-2.4184777e17,3.3323497e17,-1.5646777e17,4.8034196e17,-3.39588e17,-1.7327963e17,-1.9675383e17,2.8711947e16,-1.0079346e17,-1.2538577e17,1.2255798e17,1.0751367e17,-5.0345648e17,-4.767317e16,7.965916e17,4.805396e17,5.8422255e17,-5.8333215e17,-2.4735163e17,4.6648117e17,-7.926405e17,-7.955715e17,-5.6920253e17,8.956007e16,1.501597e17,1.00067776e18,7.5989145e17,-8.675632e17,1.453722e17,6.0664035e17,6.645915e17,-7.720746e17,-9.458552e17,-2.7358711e17,4.9964787e17,-1.2582824e17,-1.6920092e17,1.1266764e18,5.6865394e17,-9.360651e17,-1.4051547e18,9.745391e17,7.615434e17,-9.166092e17,1.5375292e18,-5.2647166e17,9.656692e17,1.4365929e18,-6.641084e17,2.4888602e17,-6.400512e17,5.6967914e17,1.5412304e18,8.314403e17,-1.5274989e18,-1.3087348e18,-6.52595e17,1.8528584e18,-1.815827e17,1.072947e18,-5.47675e17,-1.1584636e18,1.761678e17,5.2691294e16,7.830112e17,6.4118275e17,-4.6453806e17,-2.1764795e17,1.4408723e18,-1.812343e18,1.9795168e17,-4.1063478e17,2.0557203e17,2.3257397e17,7.0025174e17,-2.3715982e18,-1.9391349e18,-2.6241852e18,-1.0408466e18,1.8988335e18,-1.7755829e18,-8.765575e17,2.0338394e18,3.846221e17,2.3559337e18,2.9354124e18,-1.6976219e18,5.200052e17,1.2907624e17,-1.3336822e18,-2.4585355e18,-4.8104153e17,-2.9322474e18,-2.7132907e18,-1.3454486e18,-3.5777443e18,-3.3887864e18,2.9784445e18,1.5020764e18,-1.1162056e18,-2.894744e17,5.4265146e17,3.5771324e18,-3.611043e18,-3.2991956e17,-2.428072e18,6.007722e17,-2.604825e18,-2.5402275e17,1.8919963e18,-3.4206148e18,-9.4174195e17,2.4934277e18,-4.243801e18,5.266944e18,4.1556753e17,-3.6247358e18,3.882948e18,4.3518722e18,-4.636085e18,-4.736717e18,-3.9246056e18,-2.8937e18,1.5153061e18,2.0949024e18,6.302987e18,-2.7581337e18,3.8279649e18,4.2866965e18,4.6723433e18,-5.3511285e18,3.2096735e18,-6.4306724e18,1.3702799e17,6.441355e18,3.4497592e18,-6.889687e18,3.292697e18,-1.4016275e18,5.5979617e18,6.592596e18,1.1280791e18,-1.7557913e18,6.139156e18,-8.141286e18,-2.1192192e18,-2.7412548e18,-1.6575197e18,-1.0112458e18,-6.420337e18,-2.458552e18,-2.2869177e18,2.9917324e18,-7.114333e18,1.0438656e19,4.985701e18,1.915861e18,-1.795943e18,-2.9086975e18,4.0220943e18,-5.680457e18,8.2734935e18,6.251233e17,-8.899984e18,1.2801416e18,-1.1232058e19,-1.289512e18,6.99923e18,-3.3005022e18,-1.2639866e19,1.6506521e18,8.1321474e18,1.2333176e19,2.3519747e18,-1.1014295e19,1.0274676e19,1.702781e18,8.0464993e18,9.038099e18,3.5337924e18,-1.498549e19,-1.5846391e19,1.6430255e18,-6.6653236e18,4.967058e18,5.0431646e18,-1.8512796e19,-1.8088684e19,-3.422914e18,-1.2941094e19,3.9604362e18,1.996701e19,-8.5592406e18,-1.1635422e18,-1.3126039e19,8.083991e18,-9.285746e18,-3.2053592e17,1.2540456e19,-1.7613136e19,-1.7383237e19,-1.8146061e19,1.6402634e19,1.1257356e19,1.1389246e19,-1.4878725e19,-1.9874341e19,-1.7961618e19,-2.1740311e18,-2.600504e19,1.5463408e19,-2.1422898e19,-2.3015648e19,-1.706863e18,4.914422e18,8.7112003e18,-3.6414838e18,-4.902583e18,-1.3332962e19,-2.9357337e18,1.7672496e18,3.0298222e18,-2.2695822e19,2.9376609e19,-2.769055e19,-1.5857793e19,-6.174579e18,-2.2823038e19,-2.787948e19,1.4522491e19,3.965622e19,-1.0543015e19,3.3310347e19,2.818057e18,-1.4202989e19,-3.311108e19,2.6432062e19,2.979702e19,1.648471e19,-2.6634038e19,-1.1613467e19,-2.660988e19,-2.9028345e19,-4.0722256e19,-4.354774e19,1.4563456e19,-1.6206782e19,3.4713544e19,2.786767e19,-4.4652772e19,-1.659264e19,-5.10628e18,-2.0288035e19,-2.107089e19,2.3701985e19,5.010911e19,-5.1049155e19,5.7480273e19,-3.162478e19,2.0617994e19,4.094021e19,6.258961e19,-6.0043908e19,-8.661935e18,-2.7924165e19,6.6729866e19,-2.8926996e19,-4.6074067e19,6.5279536e19,5.8731834e19,8.6835805e18,5.1483065e18,4.4188805e19,7.536308e19,-1.2284677e19,2.3224597e19,-1.7183395e19,-1.601835e19,3.4576756e19,-5.968866e19,-2.2857508e19,-3.193371e19,8.238976e19,-2.6412587e19,6.7771834e19,5.7806045e19,-9.9658195e19,-1.0866454e20,6.871741e18,9.714092e19,-8.977603e19,-5.649495e19,-3.790077e19,-1.0730859e20,8.399232e19,7.3060797e19,-1.0344403e20,-1.1568417e20,-8.744592e19,-4.511051e19,-9.9449305e19,-1.0637197e20,4.281808e19,-7.6921605e19,3.9272946e19,4.4317074e19,1.3579339e20,5.3697056e19,-3.6218333e19,-1.5585379e20,-1.9523065e19,-3.689884e19,1.2299261e20,-1.6928837e20,-1.338998e20,-1.50129e20,-1.3232181e20,1.3673345e19,1.0911083e20,1.2007818e20,1.4790421e20,-1.805546e20,1.44361505e20,-1.691206e20,2.0514134e20,-6.3639592e19,9.446503e19,-1.5053766e20,-7.037065e19,-1.4324818e20,1.1250569e19,4.26685e19,4.942802e19,-1.1638462e20,-1.5692121e20,1.7335894e20,-2.1660966e19,-1.1560078e20,-1.3560616e20,-7.822094e19,-1.2991504e20,1.2168193e20,2.422257e20,-6.009307e19,-1.0326735e19,-2.480552e19,1.7488299e20,3.107242e20,-2.834029e20,8.463651e19,2.2490348e20,2.300816e19,1.9169487e20,2.381074e20,-5.9036333e19,-1.2067242e20,-3.062947e20,-2.9665506e20,2.9296056e20,-3.4825123e18,-2.3627768e20,2.1606586e20,-3.8045773e20,-3.69429e20,1.2729231e20,2.2971994e20,-3.842812e20,1.41344304e20,8.318603e18,-4.0614457e20,2.3118868e20,4.542109e20,-1.6837845e20,-3.3947117e20,1.2691561e20,-2.3388252e20,-2.0382734e20,2.002703e20,-3.5921854e20,-5.4335415e19,-3.958619e20,1.6698169e20,-2.1676231e20,2.3884478e20,2.126027e20,3.5815773e19,4.881029e20,-9.679755e17,-2.5864118e20,6.5144353e19,6.40336e20,3.1926078e20,-2.6379898e20,3.9738736e20,-2.0693454e20,-2.1640069e20,-5.5370188e20,-3.4488577e20,6.325547e20,2.1796068e20,4.9921716e19,2.87718e20,1.3020586e20,6.348565e20,-7.413414e20,7.897997e20,7.105247e20,-7.0864675e20,-5.112701e20,1.0564998e20,-8.831416e20,5.3620835e20,-7.873528e20,8.712949e20,-2.90316e20,-9.0574904e20,5.474131e20,5.402091e20,-3.997073e20,-8.415934e20,-5.8042067e19,-3.4411875e20,7.641316e19,-1.0603472e21,7.422123e20,-2.961464e20,-7.3071995e20,-3.746395e20,1.3027803e20,4.4956314e20,8.5810066e19,9.479527e19,-4.7206256e20,-7.7769404e20,-1.0638426e21,1.08148294e21,-3.9469e20,1.0009973e21,-1.1396918e20,1.0921189e21,-8.8769094e20,2.7049932e20,7.808447e20,4.079641e20,-9.820066e20,-1.4789163e21,8.014965e20,-1.1060452e21,-8.826943e19,2.4016747e20,1.7322087e21,1.3630009e21,-4.127133e20,-1.7399439e21,-3.1337943e20,1.0362422e21,-1.8979327e21,1.9134224e21,-1.3892292e21,1.03609426e21,-7.385067e19,-2.1504179e21,-2.0865544e21,2.0546916e21,-2.2232405e21,3.1611818e20,1.6455863e21,-2.4741648e21,1.4506446e21,2.5139546e21,2.5348494e21,2.2686597e21,-2.2108601e21,1.6458622e21,1.8547211e20,1.7119986e21,-2.2831395e21,-2.2681041e21,4.7613554e20,2.912155e21,9.995293e19,1.8625198e21,-1.2901344e20,6.042184e20,9.172469e20,3.3004225e21,1.7428663e21,4.8749886e20,-1.8374692e21,-2.1557379e21,-3.7570002e21,3.0402886e21,-1.558461e21,2.5883713e21,1.1000624e21,8.186872e20,2.4486108e21,-3.5953707e20,-4.1865807e20,-5.1580722e20,4.3613327e20,2.237159e21,-1.0899436e21,-3.0035089e21,4.1914397e21,-2.2128413e21,-7.825268e20,-1.7311782e21,-2.4682093e21,-2.1383449e21,-1.4011416e21,4.8784393e21,-8.084971e20,-3.7761616e21,8.685024e20,-2.4674386e21,-2.0111087e21,2.0518907e21,-3.371703e21,-6.783356e20,6.3248004e20,3.6581318e21,-6.234318e21,5.752597e21,2.5546292e21,-3.2279643e21,-3.6968898e21,4.329492e21,2.2704439e21,2.355168e21,1.756243e21,4.967608e20,-4.1588434e21,1.0533729e21,-3.7634457e21,5.265485e21,8.1469104e21,6.2735604e21,-7.926183e21,-4.1232751e21,1.9490811e21,1.4771774e21,-2.3236003e21,5.766307e21,-4.3355923e21,-4.148758e21,-9.3846274e21,9.318579e21,1.5546113e21,6.1859356e21,-1.0826454e22,-9.3696197e21,-3.730143e21,-5.8370986e21,-3.9314271e21,-7.4026534e21,1.0769165e22,7.481937e21,1.0490679e22,-4.9472036e21,2.524267e21,4.4297243e21,-1.1040955e22,6.8606564e21,-1.8779106e20,2.6560654e21,-1.0408753e21,-1.2659304e22,8.249961e20,-7.8369625e21,1.07982675e21,-3.5538302e21,-1.1705538e22,4.6396962e21,4.1541e21,1.1783681e22,-9.4866595e20,-7.8889555e20,7.011849e21,-7.878383e21,1.572797e22,-1.0793293e22,1.5445836e22,3.762705e21,-1.4782308e22,-9.0253094e21,-1.6222654e22,1.2479589e22,2.0051183e22,-5.9562385e21,-1.2996231e22,1.8827487e21,-1.0819488e22,-1.1365774e22,-1.8168208e22,8.212587e21,8.594085e21,8.174001e21,-1.0870191e22,6.6429626e21,1.9042969e22,-2.2326016e22,1.3564174e20,-1.3986758e22,-7.0120427e21,-1.8709995e22,2.193064e22,2.1463757e22,5.89638e21,-1.5968615e22,-2.6315206e22,1.0931952e22,1.322485e21,2.7917607e22,2.9798844e22,8.7399557e21,-3.0003922e22,1.5712405e22,2.1912904e21,-5.9243834e21,-3.392422e22,-3.7439802e22,3.333794e22,-3.2021755e22,2.8950717e22,-3.956659e22,3.078506e22,-4.7467585e21,3.8620934e22,-9.0619596e21,-3.059007e22,4.4051926e21,-1.6917983e21,6.6167927e21,7.916126e20,1.34131e22,-8.7435253e21,-2.9016791e22,4.9146274e22,2.8594045e22,-8.672857e21,-2.9359419e22,4.5947615e21,-2.2106187e22,-6.8406976e21,-1.6905011e22,2.9922817e22,5.3614665e22,-1.7625128e22,1.2886738e22,-4.7790402e22,-2.234934e22,3.2851881e22,1.2455586e22,1.9322606e22,-2.6370596e22,3.0590962e22,-5.1818642e22,5.924574e22,-6.7908257e22,5.5643257e21,-7.5350856e22,-4.5696526e22,4.1303131e21,6.4926135e22,8.064905e22,8.173079e22,3.2118992e22,5.8924626e20,-2.3601314e21,-2.1564807e22,-7.342837e22,-5.9842143e21,-1.041699e22,9.372013e22,2.5192134e21,8.111469e22,-3.194287e22,8.98848e22,-2.4936994e21,8.687737e22,1.3028525e21,-2.9393391e22,5.493249e22,-1.0131021e23,9.662429e22,7.880988e22,-1.3515869e22,-1.5300654e22,6.771779e22,-1.1446065e23,9.152309e22,-1.134351e23,-3.8377678e21,1.0862628e22,-9.647584e22,-6.317972e22,6.9925027e22,9.1629265e22,1.1360569e23,1.2517294e23,1.1144316e23,1.35087975e23,3.8789107e22,-5.617418e22,-9.489831e22,-2.620137e22,7.931873e22,7.312629e22,-4.835315e22,-1.7004616e23,6.0651386e22,9.551803e21,8.243544e22,9.304364e22,-1.1660343e23,1.213279e23,-4.424064e22,-6.0306045e22,-2.0740256e23,-1.7630014e23,6.623543e22,-8.2634084e21,-5.171091e22,2.1145813e23,-1.1321528e23,4.5923985e22,8.093909e22,6.41691e22,-1.9663305e23,-1.7551497e23,8.734493e22,-1.3451743e23,-3.5102846e22,-1.13899385e23,-9.455421e22,-4.87699e22,-5.9223222e22,-6.2531837e22,2.4157672e23,2.0870118e22,4.583332e22,-1.1394383e23,2.0719722e23,6.2619833e22,1.4915688e23,-1.4046272e22,-2.1653655e23,-1.7479074e23,-1.7751842e23,3.330828e23,9.477265e22,2.22329e22,-3.5502586e23,-3.2108558e23,1.672132e23,1.1672729e23,-9.791973e22,-4.128152e23,4.0900503e23,-2.3148585e23,-4.0267632e23,-1.9911383e23,2.9293723e23,3.235389e23,-9.99567e22,-1.567653e23,-3.4124708e23,4.5835436e23,-3.684111e22,-1.36069255e23,-5.1626276e23,-5.4032923e22,1.0801648e23,3.5494825e23,-5.2704646e23,3.0824084e23,-3.0830036e23,3.6250976e23,4.8059875e22,-3.9992275e23,-2.0875292e22,1.4414376e23,-3.816865e22,5.8036808e23,-4.2943318e23,2.6658177e23,4.7538618e23,5.366045e22,-5.0023045e23,8.287224e22,9.621648e22,3.6905565e22,-6.9428537e22,-2.4005756e22,5.0072833e23,2.2260048e22,6.129842e23,-5.3178054e23,5.694427e23,6.300212e22,-6.779088e23,8.875235e22,-7.8076666e23,8.6864514e23,7.593484e23,-6.630361e23,-6.719168e23,-2.909686e23,-5.846737e23,9.9433355e23,6.3802986e23,-1.0274746e24,9.95519e22,8.583486e23,9.496847e23,-7.929482e23,-6.0226187e23,3.9002243e23,7.893735e23,5.6293086e23,1.0087228e24,9.689575e23,-5.4821976e22,-1.270834e24,1.095678e23,-4.9282512e23,-3.4423977e23,1.1634014e23,-1.2678372e24,1.369097e24,-4.42245e21,-1.8092722e23,-1.14334916e24,1.5520858e24,-3.0408726e23,1.4372211e24,-2.1348482e23,1.531212e23,-9.887237e23,2.3030517e23,1.8919629e22,-1.0417285e23,-1.2734386e24,1.02840425e24,1.709308e24,-1.5417619e24,-1.6469223e24,-1.1796402e23,1.6826287e24,-1.2072879e24,1.5199322e24,1.1202392e24,2.129182e24,1.7888899e24,1.0520444e24,-4.6482293e23,-8.2127744e23,9.344678e23,6.3478784e23,1.7097339e24,5.4317036e23,-3.32055e23,-2.5024841e24,1.7690887e24,8.1025976e23,2.2497166e23,-2.0828482e24,5.1041355e23,-3.567895e23,-1.5373401e24,-5.2239172e23,2.7996396e24,-5.382797e23,3.850529e23,2.7745875e24,-1.153328e24,-1.69421e24,2.0175775e24,2.3260253e24,5.6024783e23,-6.8665656e23,-7.0454406e23,-3.0674413e24,-3.711281e24,2.6898264e24,3.859385e24,-1.170968e24,2.9791696e24,2.612461e24,5.07243e23,1.2510351e23,-1.8719605e24,1.6966853e24,1.9237501e24,4.008344e24,1.48993685e23,-4.22736e24,3.9227085e24,4.6784016e24,7.130127e23,4.6706188e24,-1.8086779e24,2.4541548e24,2.7581056e24,-5.040597e24,-4.2553676e24,7.860966e23,-3.6367897e24,-3.5493625e24,3.9950673e24,-1.1912819e24,-8.306555e23,-2.0491303e24,-1.1252749e24,-2.5846235e24,-5.8983764e24,2.902517e24,-3.9778576e24,1.8699329e24,-6.9372353e24,-1.7554048e24,-2.3322689e23,-5.8507665e24,-1.237011e24,4.3870372e24,1.9295472e24,-7.613616e23,2.5031924e23,-1.639824e24,-4.793021e24,-5.780176e24,-1.7947981e23,1.592285e24,2.9173076e24,4.671263e24,8.860056e24,1.7851692e24,-1.2837326e24,-2.7648778e23,1.7183033e24,5.635025e24,5.8639346e24,-4.2125996e24,-6.8689657e24,-7.0712377e24,-6.364063e24,-2.8021792e24,4.6003638e24,1.0277763e25,-5.374945e24,-1.30330985e23,5.783748e23,6.787046e23,-4.4694155e24,1.0908213e25,-5.225286e21,-9.786149e24,1.3040093e25,1.2863363e25,8.189147e24,-5.066746e24,1.8512541e24,4.825776e24,-7.3175294e24,-4.4018679e24,-1.5033197e24,-1.4127363e25,1.3235345e25,-6.8996893e24,-1.3130407e24,2.6193258e24,8.2768454e24,9.835765e24,-4.444125e23,-1.5089192e25,-5.7943823e24,-1.9575405e24,3.8500733e24,1.2719414e25,1.0116237e25,6.925444e24,-4.6594233e24,-1.2279247e25,-1.5754363e25,-5.50313e24,1.0245658e25,7.485248e24,2.2836198e25,-2.1392175e25,-3.522549e24,1.4112766e25,1.9008595e25,-1.1505144e25,3.8327025e24,1.2068578e25,-1.8225779e25,-2.548183e25,1.8211676e24,-1.7686972e25,-1.6858217e25,-2.875507e24,-1.7567784e25,2.1106873e25,-1.1733083e25,-2.5390331e25,-2.5911406e25,1.4653372e25,2.8253508e25,-1.2827712e25,-2.8482269e25,1.8824214e25,-1.0789453e25,3.571388e25,-5.7325e24,-3.5787707e25,-2.6090913e25,-2.4510698e25,8.9995825e24,-3.9550626e24,7.5268434e24,2.4323466e25,1.3383315e25,8.123834e24,-2.735742e25,6.757511e24,2.485406e25,4.3951355e25,-3.3798104e25,3.2987925e25,-2.9122866e25,1.7992196e25,3.7464295e25,-5.215252e24,1.7112521e25,-1.4775996e25,2.408246e25,-1.194073e25,1.1207375e25,-2.4833027e24,1.5010317e25,1.7560965e25,6.235684e24,3.4771264e25,-3.744719e25,1.5232866e25,4.3537895e25,7.2100754e24,1.8429857e25,3.4222307e25,4.602206e25,4.9478217e25,-4.737304e25,1.4113404e25,-3.884779e25,1.9989182e25,-3.755251e25,6.5747844e25,-1.7588143e25,6.039363e25,3.7653863e25,6.4354105e25,-7.5598705e25,-6.529367e25,-4.2617398e25,2.763665e24,2.176713e25,-5.6751694e25,-5.54957e25,3.0226812e25,1.2665943e25,2.5804768e25,2.9862588e25,-8.227003e25,9.939172e25,6.511699e24,6.429337e25,-1.096989e26,1.894632e25,-4.366553e25,5.4530273e25,-7.116674e25,-3.8657144e25,3.36002e25,6.3597345e25,-1.2387904e26,-1.5372153e25,-6.984648e25,2.2312478e25,1.1967395e26,-2.4316783e24,6.8224725e25,8.2815495e25,-1.1443831e26,1.5659619e25,-1.4502451e26,-1.4074817e26,1.1206844e26,-6.5344566e25,-2.3328142e25,1.2140731e26,-1.456901e26,-9.603121e25,1.608431e26,9.569153e24,3.5277535e25,1.6495789e26,-1.6320157e26,1.3445734e26,-1.1507597e25,1.337772e26,1.0454371e26,1.6862289e26,4.586895e25,3.6959451e25,7.685759e25,1.9719938e26,1.8181983e26,-5.7635247e25,9.05726e25,-6.867422e25,-7.351758e25,8.078699e25,-1.6647342e26,-2.22844e26,2.4836132e26,-2.3748801e26,2.4157435e26,1.6369986e26,6.232469e25,3.59531e25,-1.6784812e26,7.452226e25,2.6531948e26,2.6083323e26,2.0435015e26,-4.699736e25,-2.2046492e26,2.4874968e26,2.0963616e26,1.3578067e25,-3.0560524e26,1.1424364e26,-3.226157e26,-2.1131503e26,9.350266e25,1.130997e26,-1.8123481e26,-2.6909206e26,2.7413282e26,3.9644257e25,3.6035383e26,1.6265857e26,-4.618426e24,-1.3425645e26,3.4908397e26,6.7892296e25,-1.9847404e26,-1.6442225e26,8.148117e22,1.6990335e26,-1.7122166e26,-3.2816887e26,-3.113558e26,-4.9280167e26,-1.859923e26,-1.3843281e26,-6.045889e25,-3.2985394e26,-8.300776e25,-2.005315e26,-5.2616584e25,7.1974173e25,1.8218462e25,-5.167196e26,-4.3490225e26,4.969285e26,2.6829221e26,2.8202816e26,1.1663882e26,-6.202072e26,-2.8722311e26,2.6621766e26,-6.986633e25,-5.554e26,9.9399395e25,4.725674e26,6.7385255e26,6.803744e26,5.3402225e26,-1.778798e26,2.7035841e26,-2.5686283e26,-4.380663e25,-7.59425e26,5.8092837e26,-7.4314804e26,-8.11546e26,8.6174725e26,1.4922754e26,-9.267463e26,-2.9873447e26,6.0285826e26,-1.149527e26,3.133117e26,-7.976843e26,9.411678e25,4.4525323e26,-2.4424893e25,-2.973023e26,-4.710464e26,6.306651e26,6.251594e26,-8.810318e26,-8.6251854e26,-6.5574914e26,-1.0967839e27,-1.2620561e27,2.9472754e26,-2.4794295e26,1.1729447e27,3.737617e26,1.0221332e27,1.2303118e27,1.1996284e27,-8.317854e26,-8.907744e26,-2.5930843e26,-1.1790048e27,-1.9450651e26,1.5225934e27,-1.6053373e27,3.5937888e26,-5.469374e26,-1.7087802e27,4.6756966e26,3.8120717e26,1.1007138e26,-2.1882419e26,8.9385344e26,-2.083261e26,-3.197071e26,8.230721e26,-4.906229e26,1.21754525e27,1.3766675e27,7.2325994e26,3.738345e26,-4.6049207e25,-1.4831299e27,-1.5629982e27,-1.6923399e27,-2.0677196e27,6.463376e26,-1.0315347e27,-2.4372179e27,-7.8860724e26,-1.4311111e27,2.0272271e27,-1.6676342e27,2.1886477e27,2.0409336e27,-2.2803341e27,-1.946206e27,1.5904551e27,1.0705936e27,-1.5876866e27,-1.3015891e27,2.6809604e27,2.7017494e27,-9.178024e26,-1.2644777e27,1.5564383e27,-1.1567406e27,-2.787403e27,-1.8443918e27,-9.087714e26,-1.6170009e27,1.413868e27,6.044865e26,-2.9602104e26,3.1311987e27,-1.3353738e27,-3.14473e27,-2.6847347e27,-1.7221588e27,-9.806214e26,-2.3197575e27,-1.5447084e27,-3.5915244e27,-7.4730813e25,3.7355082e27,-8.261946e26,3.7169738e27,4.3377805e27,1.6245093e27,1.1938936e27,7.196535e26,1.60619e27,-1.0158631e27,9.889243e26,-6.454412e25,2.4778482e26,-3.0423722e27,-4.0668052e27,5.1016705e27,2.780417e27,-5.2959894e27,2.4068745e27,-2.4686383e27,-6.2053454e27,1.797753e27,-6.319292e27,5.7760156e27,2.6003342e27,1.5199726e27,-5.5118724e27,-3.6158349e27,-1.5567652e27,-4.201778e26,-5.1686366e27,-7.2198567e27,6.7888445e27,1.8869062e27,-6.644089e27,-8.260613e27,-7.8248284e27,-1.3677012e27,-2.2094483e27,5.0888233e27,-2.2035601e27,-3.4841918e27,1.5783806e27,-8.641124e27,8.8372885e27,-8.263856e27,1.2072318e27,9.803275e27,-4.505953e27,7.6619375e27,3.9709512e27,6.5784135e27,1.9641392e27,9.74045e27,-3.7888325e26,8.835413e27,-1.1570459e28,-1.1793221e27,-1.2231683e27,1.0932787e28,5.1780926e27,4.8009877e27,-1.2923317e28,1.0187971e28,-3.028142e27,-3.7063033e27,-1.3761246e28,-1.2805585e28,7.801742e27,-1.3502155e28,-6.1334155e27,-1.17720406e27,-5.8703496e27,3.9866802e27,4.702541e27,-6.730835e27,1.5869796e28,1.4645503e27,1.5034573e28,-7.558076e27,-8.3570687e27,1.4439628e28,1.8577105e28,2.8034996e26,6.513617e27,-3.98452e27,-1.5803256e27,-3.4348555e27,-1.5550779e28,-6.701668e27,-3.210385e27,-1.0753748e28,1.7841065e28,1.8179312e28,2.2356325e28,9.030687e27,1.6948815e28,-1.6826759e28,1.7502085e28,-1.3825707e28,-2.4774544e27,6.7195226e27,-1.7332622e28,-8.2686087e27,-1.8448849e28,-5.801065e27,-1.4203498e28,1.1115661e28,1.9514083e28,-8.292989e27,-2.923485e28,8.8929386e27,1.009818e28,1.4826642e28,-1.478783e28,8.7583724e27,2.3801591e28,-1.6335564e28,2.3708162e28,-1.5747268e28,-2.8663317e28,-6.374766e27,2.7031683e28,-2.3774952e28,-1.8890952e28,2.224955e28,-3.8466324e28,-1.7626193e28,7.502106e27,-7.3815157e27,7.3822925e27,-1.8352673e28,-2.2495033e28,3.31402e27,-3.0199116e28,1.7357651e27,4.1592418e28,1.9529739e28,-3.6931784e28,1.077786e28,-2.764931e27,-2.991722e28,3.7290542e28,3.6908706e27,-5.4253517e28,-9.7690126e27,3.5413078e28,5.402823e28,1.1816592e28,-3.9327835e28,5.8680815e28,-2.3479408e28,6.720794e26,3.7728103e28,-2.927927e27,5.553321e28,3.090553e28,3.5794584e28,-8.972108e27,3.43521e28,6.8607763e28,6.070617e28,7.657833e28,4.476526e28,-5.0375486e28,-3.495274e28,-7.288201e28,-3.97919e27,1.7503429e28,8.4395265e27,-1.2356852e28,1.1856686e28,-4.9990915e28,-2.2718604e28,9.096378e28,-2.324717e28,6.4641953e28,-5.012211e28,2.142073e28,7.3745783e28,-7.920934e28,-7.5325363e28,-9.298016e28,2.7073233e28,-4.7190353e28,8.49537e28,-1.0764889e29,-7.5609054e28,5.547704e28,-9.997882e28,6.0313167e28,4.9435215e28,-1.2446324e29,-4.6302626e27,8.167133e27,-7.48511e28,6.663322e28,1.1893297e29,-9.100271e28,1.0820285e29,1.5907713e28,4.13043e28,-3.7208867e28,-3.122358e28,-1.6164379e29,-2.810409e27,-1.1851132e29,-1.2585006e29,-1.216008e29,9.484924e28,-1.574843e29,-3.9984013e28,-1.626613e29,7.5508756e28,-3.8592378e28,-1.1568556e28,7.2472728e28,-1.3516508e29,-2.0217654e29,1.0359248e29,-1.6681965e29,8.04871e28,-7.281691e28,-8.888959e28,7.687167e28,3.998745e28,-1.5576423e29,2.2634393e29,-2.2077298e29,1.0919284e29,5.0451974e28,-1.4413377e29,-3.460683e28,1.6101866e29,-1.4176988e29,-1.9426798e28,-7.2565475e28,-1.7500728e29,2.985723e28,-1.8274621e29,2.7051988e29,2.2493406e29,9.491493e28,-9.548671e28,2.7834582e29,-9.946283e27,-3.2430727e29,-8.84014e28,9.56793e28,1.9497405e29,2.4369275e29,-9.986898e27,-3.0281047e29,-3.709912e29,-1.94468e29,3.8655822e29,-3.1213039e29,3.615862e29,1.9111285e29,3.3403988e29,4.1156047e29,-3.52507e29,-2.5442786e29,-6.1142793e28,4.4486842e29,-1.0488988e29,2.2143862e29,4.8455413e29,1.9251154e29,4.9690852e29,-1.7712282e29,1.819585e29,-2.1512196e29,-3.938866e29,3.2653264e29,4.551657e29,-5.1688462e29,-2.5705875e29,-2.3979622e29,3.1626482e29,3.726116e29,4.5399358e29,6.6771707e28,2.1758678e29,9.189981e28,-5.719196e29,1.5115469e29,1.0102759e29,-4.891427e29,-5.2435013e28,-4.2052674e29,4.6779985e29,4.1178794e29,-1.4179001e29,-1.0871798e29,-5.1157407e29,-3.0058116e29,-2.3430726e29,1.4366642e29,7.426439e29,1.6395206e29,8.377663e29,9.258501e28,7.625108e28,8.423722e29,4.8025802e29,6.8569493e27,6.9016185e29,-4.9574448e29,5.026502e29,7.610008e29,-5.5274144e29,4.8562697e28,-1.128194e29,-8.283501e29,-9.406721e29,4.572051e28,-1.1365559e30,1.291835e29,-2.1952047e29,-6.780817e29,5.323612e29,1.03124546e30,1.0847719e29,-1.1300828e30,-1.0386768e30,-7.044039e29,4.0386245e29,1.2570256e30,2.3809392e29,-8.1621745e29,-1.3200181e30,-7.546924e29,-9.714941e29,-1.4521933e30,-1.0284064e29,3.8138772e29,-3.0312436e29,-7.276807e29,1.20729445e30,-1.2512259e30,-7.462893e29,-2.1792157e29,-1.5992275e30,-2.128882e28,8.998029e29,3.2775445e29,1.8392336e30,1.3892073e30,7.229332e29,-9.883223e29,-1.8347446e29,8.105959e29,1.6775213e30,-5.1773136e29,1.5654557e30,-4.4299213e29,2.106268e30,-6.381939e29,4.6383783e29,1.807432e30,6.0371224e29,-2.1162904e30,3.9786168e29,-1.3878795e30,-1.8618024e30,-3.521576e29,-2.786007e30,-1.1921963e30,-2.3384934e30,2.4451017e30,-2.334033e30,3.0201412e30,2.9972807e30,1.2965181e30,-3.1540863e30,1.493889e30,-6.887336e29,2.9784677e30,2.0260713e30,1.8267409e30,-4.2619033e29,-2.5197203e30,4.8142214e29,1.6291288e30,-1.7996073e30,-5.393198e28,1.0268394e30,-1.1334598e30,-4.0473754e30,1.3849843e30,-2.3342345e30,-1.1322428e30,-3.5978358e30,-2.552079e30,-1.2542417e30,1.5519952e30,1.9503473e28,1.9657166e30,-4.118276e30,-3.4741524e30,-3.5785942e30,-2.0882407e30,3.1216082e30,-4.314639e30,-1.22284086e30,2.7108448e30,-2.5029541e30,-3.3821144e30,2.4628885e30,-5.542959e30,-8.482207e29,2.0376191e30,2.3429656e30,2.5444857e30,-8.9591e29,2.237172e30,-2.8774967e30,-1.5949608e30,-2.1624576e30,4.8442462e30,2.4478599e30,3.350937e30,3.5134905e30,1.3284975e30,2.4413896e30,-1.7597286e30,2.6499382e30,4.795103e30,4.5155008e30,-1.4782218e30,3.593506e30,7.27744e29,3.131081e30,-5.380629e30,-1.743e30,6.059488e30,-3.1916696e29,-2.1054315e30,-5.902914e30,6.742139e30,5.978387e30,-1.3382384e30,8.2041835e30,5.317985e29,5.3803884e30,-9.621588e30,9.5727183e30,-7.1426964e30,-7.3478904e30,1.1405573e31,-1.062598e31,-5.926859e30,-6.62314e30,6.254162e30,8.7878365e30,-5.3314046e30,7.6662254e30,1.070178e31,-1.2038504e31,5.8314193e30,8.9860514e30,1.1212463e31,7.5981163e30,-4.4263172e30,1.1240758e31,-7.104538e30,-1.3653128e31,9.5103063e30,-1.7059368e30,-2.2574187e29,1.4567484e31,4.951604e30,-1.6195403e30,2.111984e30,-3.18619e30,-1.6774646e31,1.6520272e31,1.866009e31,1.6313713e31,-8.8066257e30,1.1042797e31,4.1879016e30,3.119876e30,4.2233092e30,-1.5588562e31,2.046913e31,1.5792171e31,-1.2188186e31,3.7048868e30,-2.2963396e31,1.7635213e31,1.6435802e31,-2.272787e31,-1.5691224e31,4.3867345e30,2.2068394e31,-2.5414375e31,-2.2780635e31,-2.9480076e30,5.406915e30,2.6065978e31,-2.0410761e31,-1.3143318e30,2.6347774e31,1.780162e31,-8.0577523e30,-1.9989561e31,2.5722569e31,-1.0221898e31,-2.3840244e31,2.4763868e30,2.675745e31,1.0034987e30,-3.571143e31,1.8473004e31,-1.8553831e31,-2.1371908e31,-7.963402e29,-7.786319e30,9.0820945e30,-3.8197602e31,3.131363e31,1.4165511e31,1.3531493e31,-3.7151637e31,-1.2356958e31,4.0229062e31,1.8980115e31,4.1023336e31,2.4787527e31,2.6978857e29,-2.2673597e31,-2.4768818e30,-6.9497355e30,-3.4165513e31,-4.2442155e30,-1.3730284e31,-2.457897e31,3.5846391e31,-3.965321e31,-3.054169e31,-1.3417344e31,4.615474e31,-1.0141827e31,-3.2331466e31,-5.9904687e31,4.0375854e31,3.840671e31,-2.5116374e31,-8.3523524e30,3.262657e31,-5.9134795e31,6.9441405e31,-3.6100916e31,-5.3701583e31,1.646304e31,-6.4935545e31,-2.447806e31,-3.8153728e31,2.3620853e31,-5.5843276e30,-4.1323314e31,-1.5669858e31,8.803444e31,8.594897e31,1.9186332e31,-2.8084084e31,-7.8412336e31,4.535064e31,2.121443e30,4.576048e31,-3.575649e31,1.0263425e32,-7.4676073e31,-7.341478e31,-3.5506362e31,1.787379e31,1.3004162e29,4.876033e31,6.143793e31,5.9547063e31,1.0760391e32,3.3642916e31,4.505801e31,2.7565075e31,-1.0671327e32,-1.2129618e31,6.168761e31,-4.077396e31,-3.721384e31,-7.4814166e31,-1.1995759e32,-1.3904053e32,8.597263e31,-1.1203955e32,8.717053e31,-1.3855078e32,8.884429e31,6.1034264e31,-7.1183627e31,-6.154424e31,1.0402901e32,7.549172e31,-5.775248e31,2.2864803e31,-1.1020618e32,1.7447573e32,-1.4640366e32,8.981537e31,-1.8764366e32,-3.9373532e31,1.8552191e32,-8.0091227e30,-6.194523e31,-5.372932e31,1.4726077e32,-1.9028902e32,-2.195956e32,-1.9282657e32,1.4137206e32,-6.4668906e30,2.6773352e31,-9.751832e31,-2.9530934e31,8.773346e30,-1.656403e32,-4.3442503e31,-6.1556003e31,-5.3144635e31,1.7453929e31,-1.6876374e32,1.3959483e31,6.1530347e30,2.6266598e32,-1.5473136e31,-2.5562417e31,-3.0014717e32,-1.3030865e32,2.8796814e31,3.0594504e32,9.04078e31,1.9389895e32,1.8975275e32,1.1674197e32,-1.0317916e32,-2.7599577e30,-2.5238771e32,2.6638483e32,-3.42033e31,2.2736425e32,-2.4978518e32,-1.1482599e32,-1.1869551e32,1.1904224e32,-1.5620814e32,-8.208143e29,3.6238374e32,2.883825e32,1.2533017e32,1.3454544e32,-1.6476154e32,3.618191e32,9.986118e31,2.429525e32,-4.0023494e31,-2.5253e32,-1.5079223e32,1.3217008e32,-4.6061184e32,-1.7108238e32,5.4125125e32,-2.559385e31,-3.298052e32,-2.4879067e32,3.4723564e32,3.3418137e32,-5.607703e32,2.5292672e31,3.9725747e32,2.4572259e31,3.9668794e32,5.4941063e32,4.962452e32,3.721562e32,1.1736728e32,2.8171612e32,-7.470308e32,5.618015e32,7.702296e32,1.0297701e32,1.6240967e32,5.1774908e32,-6.2821318e32,5.6155432e32,8.939075e31,4.389485e31,-8.459925e32,3.931639e32,7.505991e32,3.382259e32,-8.762456e32,-3.2410756e32,4.480109e32,3.5850036e32,6.143333e32,8.21268e32,-7.933479e32,7.3669866e32,1.4018607e32,-8.510473e32,-9.1605876e30,1.0428308e33,-7.527512e32,-8.430715e32,9.828107e31,-6.003633e32,-2.755917e32,4.9303005e32,-1.0787728e33,-9.042497e31,-2.4920632e32,-9.9988765e32,1.12722224e33,-6.0960466e32,1.09296496e33,1.0586098e33,2.5019385e32,1.1532643e33,-1.025477e33,-8.884977e32,-7.987015e32,4.7607155e31,-8.91926e32,-1.2814159e33,-2.1814693e32,3.9894865e32,1.0602888e33,1.7044136e33,1.3581757e33,1.1809043e33,7.6107625e32,-9.317423e32,1.3562953e33,-1.8477912e33,9.988028e32,6.439075e32,-7.3032644e32,1.7273084e33,-7.958818e32,2.1963965e33,3.6667285e32,-1.657287e33,1.23806306e33,-1.7971118e33,-6.315405e32,-9.421295e32,-1.7404171e33,-1.0595521e32,-1.2084774e33,7.1562126e32,6.4790907e32,-6.922011e32,-7.0930575e32,-1.3434053e32,-2.188217e33,1.4846024e33,7.173832e32,2.8637258e33,1.6217818e33,4.3356246e32,2.0375789e32,-1.438846e33,-6.4171276e32,1.2996535e33,2.4776055e33,-1.11362355e33,1.9916205e31,7.998794e32,-3.1917273e33,-3.0662323e33,-3.712717e33,1.8929313e33,7.922162e32,2.5395917e33,-1.0262273e33,-9.224176e32,3.3683646e33,-1.5080711e33,-7.4240386e32,-1.04964595e33,3.9361347e33,1.5712084e33,4.4517772e33,4.1188e33,3.515463e33,4.7713338e33,-3.0350226e33,-1.4955653e33,3.544692e32,-2.1932765e33,3.3007214e33,-5.519609e32,3.4971918e33,3.9071133e33,7.899355e32,5.1187335e33,-2.860518e33,-3.907574e33,4.663975e32,-1.0239155e33,-9.370496e32,-6.391988e33,1.2861929e33,3.611353e33,-4.4583813e33,-4.1865873e33,5.998418e33,2.707196e33,-3.446591e32,2.3158572e32,-7.2425e33,-7.769684e33,-3.1083413e32,6.3764493e32,-6.4050136e32,-5.580402e33,-5.203201e33,-6.057254e33,-8.059107e32,1.0137401e33,8.858235e33,2.1691526e33,6.6334856e33,-3.2528546e33,5.611391e33,6.267635e33,1.0023135e34,2.7982174e33,-9.260449e33,9.555003e33,5.064838e33,-4.066132e32,9.8015766e33,-5.644964e33,7.773109e33,2.0630776e32,4.8874263e33,8.707224e33,-4.415951e32,-3.449667e33,-9.788658e32,8.6471226e33,2.14931e33,-8.113859e33,-5.8721023e33,4.0753416e33,1.1709222e34,7.7174674e33,6.912272e33,1.4340567e34,-3.736736e33,-4.4539798e33,1.461287e34,-2.980558e33,5.6202004e31,1.3891306e34,1.4159905e34,-9.9199236e33,4.6792227e33,-1.4193405e34,2.3575689e33,-1.4974697e34,1.0864537e34,-1.063196e34,-1.7814757e34,-3.1763387e33,-1.9809604e34,5.3067477e31,-1.7422185e34,-7.5725083e33,1.2328684e34,-2.8984944e32,-9.379768e32,1.429683e34,4.6066147e33,1.3373483e33,1.3715466e34,-1.4331015e34,-1.8096447e33,-1.486205e34,-2.329958e34,1.9719279e34,2.5674532e32,8.07734e33,-1.9373489e34,-1.747819e34,1.096713e34,-1.4171104e34,1.482566e34,-1.1298976e34,-1.5685268e33,1.6567495e34,1.5870656e34,-5.0448536e33,5.76188e33,-4.3132483e33,-1.08614855e33,-1.475536e34,-2.44167e34,-1.4692158e34,3.4810832e34,-1.8025977e34,3.3980711e34,-3.7857836e34,1.7059434e34,-2.334708e34,-1.1632445e34,-2.5641378e34,3.1300368e34,-4.2641147e34,3.899221e34,-3.8643363e34,2.7434472e34,4.023828e34,-2.2366925e34,-2.1832162e34,2.6344176e34,-1.9236099e34,3.962561e33,-2.0376833e33,-3.516043e34,5.200095e34,4.724293e34,6.8708123e33,-3.6374286e34,-3.876943e34,-4.906433e34,-2.3716435e34,2.9326876e34,-6.292225e34,2.6108056e34,1.8480886e34,-4.2099186e34,5.8438123e34,2.7920118e34,2.9298505e34,-8.6767094e33,1.7390113e33,3.7670855e34,2.1215707e34,-3.7960758e34,4.097913e34,4.984002e34,-1.1411315e34,-2.5713248e34,7.4869376e34,4.256569e34,4.9287275e34,6.02976e34,-8.630889e34,6.6290123e33,-3.8260812e34,6.641955e34,-6.942481e34,-6.496829e34,-3.160492e34,-3.468629e34,-4.6608116e34,-2.3858853e34,-8.0528826e34,4.983442e34,3.9161401e34,-3.3056037e34,4.3948476e34,1.5720632e34,-7.0349964e34,1.024846e35,-1.7549135e34,8.4870365e33,-1.0087549e35,-6.033336e34,-2.8361622e34,7.0199014e34,-1.2767928e35,1.1734582e35,1.0952883e35,-3.4623406e33,-6.5290716e34,-1.2902167e35,-1.0758462e35,-4.062247e34,7.1551107e34,1.0432589e35,1.6072628e35,-1.8792624e34,-1.4831411e35,-9.242966e34,3.1127418e34,-1.1730399e35,9.294293e34,-5.380874e34,-6.5870745e34,3.4973106e34,1.5195509e35,-1.9264195e35,-1.719659e35,1.7176533e35,7.760138e34,9.913668e34,-1.1563084e35,5.620992e34,1.6308502e35,-1.5876039e35,6.432862e34,3.4564635e33,-3.1308026e34,-1.6849243e35,-1.7653021e35,-1.8425442e35,1.995326e35,3.5994726e34,-2.3472516e35,5.104645e34,2.2886059e33,2.7297206e35,-3.845455e34,2.052521e35,8.578515e34,2.034755e35,-2.2389647e35,4.356984e34,1.2181396e35,-1.7101195e35,2.1322634e35,-1.1475509e35,3.1684968e35,3.1042804e35,-2.4223642e35,4.604215e34,2.2457765e35,1.2358033e35,-1.705995e35,1.737968e35,3.859102e35,3.9129023e35,2.732572e35,-1.622226e35,1.4239097e34,3.8845933e35,-1.615921e35,1.3366856e35,-3.6557225e35,-1.3568062e35,-1.9407947e35,-4.128863e35,1.5677274e35,4.2558964e35,2.8332405e35,4.723741e35,1.8188578e35,-7.955248e34,-3.8536602e35,-4.0442126e35,1.9975224e35,3.0318025e35,2.5559958e35,-2.0684924e35,3.6255405e35,5.6538168e35,-4.8203266e35,3.4201784e35,1.2085781e34,-5.3786197e35,-4.158453e35,-2.0407523e34,-4.1503352e35,5.387165e35,-2.5843745e35,6.343345e35,8.201402e34,1.964905e35,-1.7062387e35,6.208611e35,6.27237e35,5.9589054e35,-3.415748e35,-4.461245e35,-1.8808162e35,2.2387448e35,-7.0876595e35,4.6006e35,3.8580174e35,5.5213457e35,6.915032e35,6.618652e35,6.699371e35,8.077146e35,-5.432189e35,-5.0181637e35,-1.269096e35,-3.388303e35,7.9655004e35,-6.7896935e35,-6.173683e35,-9.917104e35,-9.518128e35,4.359969e35,-7.340613e35,-3.2732359e35,-8.158234e35,-1.1731001e36,1.0901801e36,-1.1230779e36,2.1065499e35,-7.076096e35,-8.440523e35,8.258794e35,9.407346e35,1.2469046e36,4.9625185e35,-3.7729572e35,-1.3043273e36,5.1205387e35,4.9112116e35,-1.0352359e36,3.9344785e35,1.1226674e36,-4.430718e35,-1.0867276e36,-5.3634305e35,-9.4586566e35,-4.663428e35,-1.6777118e36,-1.3712997e35,-1.3672394e36,5.177074e34,-5.2279036e35,-1.5957813e36,-7.643137e35,-1.8982432e36,-1.9501188e36,2.1704766e36,-2.0892298e36,1.8639656e36,-1.17182984e36,-6.2593425e35,-1.6939762e36,1.846103e36,-1.1132915e36,-2.0127143e36,-2.3939452e36,-2.0931617e35,4.0162823e35,8.6915465e35,1.3307281e36,-1.5896353e36,-2.1636028e36,2.3689716e35,-1.2266062e36,-1.9081216e36,1.2475514e36,5.6650327e35,-2.2549574e36,4.1380834e35,-2.8842822e36,-6.047895e35,-4.674617e34,1.1194681e36,2.0319488e36,1.7467194e36,3.051952e36,3.364536e36,2.0114642e35,-2.764347e36,3.4498046e36,-2.0832407e36,2.2563869e36,3.3043817e36,-1.6473677e36,3.248466e36,7.162497e35,2.5489747e36,7.1979e35,-2.9951655e36,-5.025481e35,-1.2500349e36,2.8565765e36,-3.330267e36,-1.9105414e35,-4.8589526e36,4.4399155e36,-4.423536e36,3.322742e36,-3.6264955e36,-6.895275e35,2.4731524e36,-1.9158065e36,-2.4493012e35,-7.479614e35,-2.2409698e36,4.1064087e35,5.1668687e36,4.1087297e36,3.5563934e36,-7.7739735e35,-5.197681e36,-6.141758e36,6.524461e36,6.528517e36,8.601434e35,-2.9374263e36,1.408228e36,6.2416745e36,-3.1396923e36,5.5421507e36,-6.7408544e36,-7.750848e34,1.6266019e36,8.326456e36,-4.2271064e36,-1.0888216e36,-2.0717188e36,-6.3470404e36,-8.9807455e36,-1.8585737e36,-5.2902492e36,-5.569869e36,-4.6303654e36,9.038778e36,-8.576951e36,-9.970269e36,5.0932388e36,-4.7081304e35,1.2655841e36,1.0176011e37,-2.3278993e36,-9.136524e36,-8.333266e36,-1.0763259e37,8.478056e36,-7.832704e36,-1.0936137e37,4.206702e36,9.6692274e36,-1.1318066e37,-4.6961584e36,1.11158546e36,-5.740819e36,4.1244457e36,-2.8943493e36,-3.0245286e35,9.1535706e36,1.0866268e37,8.532234e36,2.2019048e36,9.653021e36,-5.7527645e36,8.7946905e36,1.420245e37,-7.669667e36,-9.366579e36,-3.1128203e36,1.4584906e36,-1.01332224e37,-4.908865e34,6.672191e36,6.246483e36,-1.03538646e37,1.24301975e36,-1.0625013e37,-5.636081e36,1.5321283e37,1.597562e37,8.060037e33,-4.1277803e36,1.3661141e37,6.708113e36,2.1264342e37,1.0524857e37,2.0906518e37,-1.873903e37,9.232114e36,-2.0103823e37,-1.8371841e36,1.6175872e37,-1.4432486e37,-1.5860065e37,-2.4402408e37,-1.5880513e37,1.6459642e37,-7.694408e36,-4.2054204e36,1.8004938e37,1.3327926e36,2.867904e37,2.0382302e37,1.6549128e37,2.5873905e37,7.802699e36,2.6724896e37,-2.6445701e37,1.2901498e37,6.597497e36,1.3483511e37,-3.1986342e36,-2.5991122e37,-2.369126e37,-8.673746e36,-2.8559582e37,2.9721658e37,3.8863455e37,3.6058517e37,-1.6237411e37,-2.8702535e35,-9.4130917e36,2.2531082e37,3.7589902e37,7.5300005e36,5.4004565e36,-8.968292e36,9.4742266e36],"y":[0.15631643,0.35851794,0.49576083,-0.35089532,-0.32020158,0.049384873,0.19618508,0.041394044,0.35245305,0.047546003,0.21874185,0.13860554,0.07038974,-0.056576546,-0.17445067,0.21558675,-0.3711927,-0.002671075,-0.4535244,0.4498474,-0.2139014,-0.4812149,-0.25516486,-0.38869485,0.03731344,0.09031632,0.16372427,0.46911544,-0.21487951,-0.26596805,0.2631921,0.22581267,-0.0035715832,0.18329476,-0.14454727,-0.24139173,0.011119866,-0.4578668,-0.4878731,-0.13414915,0.4028731,0.32572418,0.032403186,-0.1890883,-0.1561011,-0.38802207,0.28921935,-0.14206551,0.19497319,-0.36744097,-0.17214957,0.36374798,0.12254231,-0.34980786,-0.47836602,0.20480715,-0.24561158,0.35329705,0.30535427,0.24224888,-0.419627,-0.01592396,-0.068697706,-0.13935728,-0.114032194,0.0014703216,-0.42703497,-0.20615762,-0.27486196,0.38700283,0.08412901,0.079715855,-0.13213731,-0.48922157,-0.25437018,0.008693174,0.0742291,0.28890184,-0.27098995,0.1863563,-0.10841176,0.35838097,0.090119906,-0.34084913,0.28422248,-0.20034876,-0.27112043,-0.1757167,0.45986584,-0.2981491,0.33822837,0.29983532,0.3428426,0.15425669,-0.49586567,-0.19310273,0.062820286,-0.48321515,-0.3074259,0.19489415,0.19137286,-0.46346873,0.017114326,0.43443015,-0.48284546,0.34347227,-0.3234494,-0.22076549,0.105050236,-0.29829642,-0.37265885,0.2887565,0.46345904,0.24692887,-0.25482938,-0.23042135,0.11629904,0.23111549,0.040596023,0.1424888,0.34164265,-0.38571137,-0.07082188,-0.08652168,-0.087715104,-0.21183458,-0.20886484,-0.048697844,-0.11555839,-0.37202632,0.2929575,0.13841745,0.018647002,0.029874332,-0.36889288,0.25971955,0.26571167,-0.17749831,-0.10450317,-0.23568988,0.37772498,0.19682868,-0.23391166,0.45544624,0.042230826,-0.18158285,0.07982696,0.3552561,-0.12301709,0.048768423,0.1338373,0.31432858,0.1451237,0.10603771,0.25865173,-0.23243138,-0.3276953,0.19827352,-0.01640196,-0.17314368,0.09059269,0.22560284,0.43821374,0.42246416,-0.46431494,0.05980687,0.42050093,0.2325651,-0.44589517,-0.35116115,-0.04512683,0.19391786,-0.039777685,-0.22414662,-0.1383597,0.23461653,0.2907835,0.15032537,0.13161191,0.023848083,-0.20123942,0.06729956,-0.48873085,0.47469023,0.25761667,0.3373559,0.05039866,0.1613305,0.4395778,0.46986514,0.1137291,0.20122586,-0.12339645,-0.045825846,0.24501,-0.15537572,0.47656474,-0.10239788,-0.19753575,-0.20794116,-0.3482512,0.104309306,-0.35086915,0.39370468,-0.036306474,-0.40317625,-0.45562762,0.21145862,-0.34059128,-0.16632934,-0.11934895,0.13127339,0.018539425,0.093154244,0.28585613,-0.12377213,-0.23290941,0.10030975,-0.33221868,0.24710904,-0.16124485,0.12232216,0.41396216,-0.24279614,0.3215528,-0.45509344,0.34825608,-0.034147825,-0.35209948,-0.49793336,0.33396554,-0.41672963,-0.23771407,0.028634548,0.062177826,-0.28086123,-0.08925325,-0.1958293,0.28088158,-0.46607158,-0.11042512,0.33465227,0.36499226,0.17234446,0.12901463,0.40478265,-0.0860952,-0.29828742,0.188276,0.37843296,0.042336196,0.15602109,-0.1076843,-0.16470952,0.07037637,0.24701166,0.08337146,0.17677416,0.22913654,-0.2999495,0.17809229,0.3874089,0.36831662,-0.424371,0.17446391,0.2067169,-0.18055187,0.017027924,0.44611385,-0.20417629,0.24906415,0.13137972,0.43122673,0.32373533,-0.0018382586,0.2205983,-0.02117614,-0.39858243,0.11312396,0.06910316,-0.48853117,0.18467028,0.36564255,0.38563693,0.23945633,-0.22458509,0.039115906,0.37668762,-0.32272345,-0.045002155,0.3019562,-0.016162958,-0.18394275,-0.4910719,-0.23407564,0.29018423,-0.295377,0.4853338,0.24111044,0.37509182,0.17477891,0.256402,0.29123452,0.32908615,0.039619964,-0.40035078,-0.06362196,0.4494739,-0.07009277,0.18009675,0.36573008,0.17862742,-0.24695258,0.1829313,-0.48958445,0.43027735,-0.44832802,0.22460547,0.47727016,-0.12207356,-0.4906713,0.24820857,-0.3757104,0.40200764,0.44129068,-0.08356893,0.421355,0.013781404,-0.25085884,-0.40060928,-0.40909857,-0.057854623,0.31385785,0.01877835,0.039447624,-0.44029942,-0.14621688,-0.32951117,-0.37713078,0.48587063,-0.40984592,0.1967323,-0.045442726,0.2975329,0.15873566,0.37514332,0.47970024,-0.16769584,0.096510954,0.27622962,-0.4274582,-0.40948036,-0.35017905,0.14324114,-0.35687804,-0.23644483,0.10573518,-0.103060804,0.39063337,-0.034022514,0.025391206,-0.4204479,-0.13037543,0.41435906,-0.42152914,-0.45166403,0.19108158,0.1948555,0.23615667,0.138833,0.17835529,-0.2263173,-0.13035567,0.22356741,0.20796305,0.042383455,-0.4403428,0.042879466,-0.18852344,-0.44918138,-0.40421844,0.24816078,0.0048380047,0.02572817,-0.054087836,0.30782923,-0.08441281,-0.35873997,-0.13780297,0.2092294,0.114192456,0.32936496,0.268577,-0.16757144,0.12504882,0.06668722,-0.4962231,-0.410361,0.13103947,0.38638422,0.07839984,-0.22669527,-0.2829213,-0.23665763,-0.4661581,-0.16251534,-0.38272098,-0.15038402,0.073042125,-0.12776738,0.43564457,0.34437934,-0.070465475,-0.42951787,-0.29620793,-0.043288987,-0.49118432,-0.3731725,-0.35758764,-0.13987686,0.042920273,-0.040092885,0.28642207,-0.322292,-0.4701873,-0.22455108,-0.14157814,-0.3924565,0.43593234,-0.038754344,0.15565677,-0.30384946,-0.3312807,0.3201865,0.12822928,-0.37776974,-0.46218932,-0.29937494,0.40391177,0.13506229,-0.49148348,-0.063539505,-0.40122125,-0.22708333,0.38000977,0.12755553,-0.26979074,0.07420495,0.17430995,0.25388113,-0.47683576,-0.07701776,-0.2127477,0.3704482,0.4371723,0.37454057,-0.47482276,0.35235956,0.086231545,-0.028534362,-0.36729446,-0.17386055,0.4115071,-0.018357852,0.39800084,0.18783018,0.4862894,0.35525075,0.34997272,-0.21447337,-0.02220318,0.43029538,-0.28887546,-0.17464647,0.41843015,-0.28545755,0.47145447,0.09413386,-0.26059288,0.056450784,0.43596363,0.21657583,-0.31150982,-0.41290122,0.12763211,0.06005592,-0.40092492,0.16734934,0.38974094,-0.13500535,0.34496742,0.16240554,-0.056017686,0.044771068,-0.032612436,0.2716744,0.19583803,-0.38962686,-0.2869655,0.2127935,0.2202871,-0.2003375,0.19938304,-0.26746202,0.20436174,-0.4394547,0.17239733,0.38443148,0.40813133,-0.17485401,0.38029602,0.1302571,0.17373893,0.41591355,-0.0533924,-0.102619395,-0.3596655,0.031819586,-0.3704613,0.31410548,0.25570074,0.07784767,0.26315895,0.37516785,-0.45719784,0.272901,0.31686378,-0.24429709,0.30835125,0.30886376,-0.17233258,-0.1637555,-0.03576552,0.31119767,0.019964654,0.114621036,0.39230087,0.08501565,-0.048521224,-0.4589069,0.40677395,-0.30136833,0.2772822,0.20177187,0.18208237,-0.010923198,0.07208751,0.051949613,-0.4715418,-0.17096126,-0.13020073,0.26136893,0.2232756,-0.2375441,-0.38729915,0.40319756,0.44008717,-0.4476907,0.18378127,-0.16003853,-0.20208651,-0.22314745,-0.43723705,0.1113349,0.31585914,0.1830413,-0.28642938,-0.32383242,0.29820913,-0.05523361,0.3336388,0.17813674,-0.11130454,0.20871697,-0.25068456,-0.40948465,-0.08071485,-0.14279802,0.49711052,-0.02515569,0.060994342,0.017477216,0.20023829,0.18212971,-0.013156354,0.1277558,0.39661473,0.27232972,0.24623916,-0.1488547,0.29639244,0.26843137,-0.15578394,-0.13412122,0.03521533,0.35490927,-0.050561003,0.077795945,0.3588855,0.23547725,-0.25068054,-0.063224666,0.10784445,-0.088903196,-0.47763696,-0.4197,-0.2637944,0.4328926,0.3103213,0.09353094,0.21328257,-0.35591444,-0.19700009,0.13139924,-0.18092433,0.46787867,-0.03468512,0.36645237,-0.023571732,0.15251024,0.4239452,0.49950954,-0.17410925,-0.22615574,0.42370585,-0.37639976,0.07472527,-0.2519082,0.46664312,0.029292123,-0.12690862,-0.16911401,0.31851065,-0.116889365,-0.021451807,-0.18856154,-0.15087177,0.2540059,0.3954906,-0.15944925,-0.20449078,0.09192874,0.45577157,-0.18503767,0.21680748,-0.42385197,-0.08511291,-0.3221837,-0.46261194,0.07711257,-0.19600005,-0.38675863,0.11537584,0.45864025,0.48004848,-0.009095852,0.3916531,0.4831177,-0.27817777,0.3802689,-0.17917748,-0.3777471,0.13383153,0.47133014,0.019501721,-0.30731183,-0.49697202,-0.0019371303,-0.398991,-0.19373758,0.067243956,0.4715032,0.22399288,0.13761541,0.08083579,0.4171319,0.0557045,0.1802597,0.16479048,-0.43274808,0.47592467,-0.49563548,-0.48279724,0.15823388,-0.21265094,0.26207379,0.10800016,-0.29210877,0.37475047,0.21615365,0.023313992,-0.28825182,-0.18533544,-0.2443536,-0.29904932,-0.44797894,-0.23784815,0.1596617,0.3098227,-0.04266856,0.016881553,-0.39030686,0.08658717,-0.16783142,-0.48868847,-0.03985853,-0.3603248,-0.3443428,0.15531348,0.4430716,-0.3363213,-0.25489402,-0.4107766,-0.269995,0.28531593,-0.3824386,-0.20017667,0.27849466,0.1834365,0.20540227,0.3174096,-0.07384801,0.01422425,-0.116716795,0.1424067,0.11461248,-0.17425343,-0.16476181,-0.25759637,0.26234838,-0.495742,-0.37641397,0.10538213,-0.4456914,0.084466465,-0.19075054,-0.04391971,0.24213046,0.06436742,-0.2777025,0.18157415,0.25798088,0.04737594,-0.44838393,-0.15711474,0.4844215,0.41626862,-0.1671112,-0.06809078,0.23734242,0.40966117,-0.37143523,-0.47596705,0.0016387284,-0.34041548,0.18698399,-0.23498403,-0.28572357,0.13327773,-0.47913215,0.28112414,-0.22663896,-0.19119494,-0.41055822,0.018695846,0.31587425,-0.3152379,-0.32589722,0.4992757,0.42198956,0.4176324,0.32697505,0.41504046,0.18493274,-0.37102646,-0.0864785,0.34823057,-0.2455506,-0.46324888,-0.012366762,0.416388,-0.13117252,-0.25677127,-0.17284647,-0.3394328,-0.094225064,0.26887834,-0.21604308,0.3735447,-0.45322615,-0.42468944,0.26535037,0.40945476,0.002226723,0.23185214,-0.42011434,0.47398865,0.35024527,0.21048316,0.018227663,-0.35083374,0.14779669,0.40957507,-0.47322005,0.4335645,0.46487045,0.45624122,-0.01624449,0.34935814,0.4561038,-0.2645239,0.22039834,0.36810052,-0.40164164,0.4032305,-0.40319318,-0.108361304,0.29995275,-0.24146645,-0.20956029,0.4650239,0.019867925,0.26775572,-0.04085827,0.022487413,0.0425118,0.3018464,-0.44492248,0.27955937,0.20521268,0.4758401,-0.15581836,0.04632049,-0.11837766,0.42861938,0.2540435,0.37954712,-0.014754795,-0.08840778,0.4488781,0.03650858,-0.17116491,-0.29543015,-0.043987285,-0.3310837,-0.081285454,-0.3645639,0.37147987,0.4674732,-0.37434092,0.26157466,0.2573899,0.29187432,-0.009317184,-0.06587908,-0.27234286,-0.16662958,-0.003876383,-0.2837049,-0.017665673,-0.17765528,0.03693622,-0.20101112,-0.029828792,0.2730528,0.48931,0.4020617,0.4887251,0.15152282,0.48284483,0.36553162,-0.316458,0.17993598,-0.25931036,0.15358002,-0.3179956,0.4379457,0.48255423,0.27264866,-0.14550546,0.07412797,0.23164591,0.109719455,-0.20376301,0.0775154,0.14958803,-0.29155815,0.25971532,0.15485966,-0.18964049,-0.054205325,0.072927676,-0.38598886,-0.3632675,0.021607839,0.27494225,0.06271782,-0.28886676,-0.40039062,0.20739925,0.0151780145,-0.29028136,-0.28626347,0.32269365,-0.31054518,0.45871,0.42597365,0.064071134,-0.30025238,0.49854374,-0.2606966,0.27618128,-0.17844507,-0.009159452,0.49272713,0.4002535,0.36270478,-0.38576263,-0.3680684,-0.012074033,-0.30647135,0.17022653,0.4652934,-0.035624385,-0.29548305,-0.4827177,0.31573448,-0.26603863,0.42548257,-0.06981458,-0.17594723,0.2597252,-0.38984603,-0.14267439,0.41338322,-0.23923957,-0.36372936,0.29108548,-0.27836233,0.026102804,0.4234777,0.41749075,0.44343677,0.20419757,-0.38035235,-0.1068119,-0.08512269,-0.35811847,-0.09327293,0.10458217,-0.006074808,0.015589242,-0.49795985,-0.22160311,0.22878337,-0.24938217,0.15893349,0.2472607,-0.27009237,0.36120194,-0.31925762,-0.43384016,0.17896852,0.4821659,0.19856113,0.4098422,-0.04808372,-0.11501868,0.49837917,-0.2624872,0.19420417,-0.385303,0.3435859,-0.4259481,0.060262717,-0.32172838,-0.1866026,-0.42250302,0.12487297,0.13640615,0.38210914,0.3714451,-0.3063839,0.4831645,-0.040398944,-0.4849346,0.49389827,0.33929893,0.4388718,-0.2634424,-0.16072914,0.4450487,-0.15499789,-0.3767389,-0.32455721,0.08387716,-0.0950268,-0.3620793,-0.44451228,-0.15757285,-0.43251804,0.05960515,-0.28302613,-0.4185244,-0.19857533,-0.33697197,-0.09302428,0.24036802,0.29614893,0.30423537,-0.23655492,0.12005854,-0.4189878,-0.17224692,-0.29659775,-0.3742224,-0.40810367,0.04543395,-0.4191709,-0.38280296,-0.02755584,-0.28536972,-0.374074,-0.43880364,-0.16670933,-0.49961054,0.3990773,0.18040437,-0.3262897,-0.08409742,0.14264333,-0.0205669,0.21001306,0.32415304,0.06458017,0.29985857,0.200721,0.09493274,-0.49011582,0.010320927,-0.05557242,0.39939716,-0.11159059,-0.42432025,0.47822347,0.043720253,0.11700125,-0.0062643522,0.39132974,-0.26925066,-0.29981717,0.47954768,0.28692317,0.11441348,-0.07995579,-0.38463286,-0.4334622,-0.19882794,-0.42372608,-0.2907903,0.32094094,0.17133462,-0.4684129,-0.2846104,-0.012081451,-0.4084678,-0.090817764,0.091069795,0.17698431,-0.2650451,0.27784437,0.06064529,-0.4900606,-0.21105061,-0.25160733,-0.49343708,0.1803819,-0.35146013,0.25143287,0.32581523,-0.26705775,0.11029902,-0.10730888,-0.26256442,-0.4408646,-0.20490558,-0.0983699,-0.48027113,0.38514048,0.14049987,-0.44617113,-0.30098417,0.3189953,-0.4378134,-0.47876132,0.19523184,0.1296778,0.019650238,-0.33292726,-0.0046066456,0.49955526,0.3088439,-0.4112011,-0.10237442,-0.0487218,-0.28036532,-0.0014447947,0.40194818,-0.36525258,-0.47954497,-0.057597425,-0.45334858,0.44639438,0.07949622,-0.21493335,-0.063576564,-0.3266665,0.45408598,-0.4279042,-0.37243596,-0.44188133,-0.47437227,-0.05032925,-0.2821169,0.3150759,-0.24195127,0.35583156,0.3524729,-0.07789784,0.41661143,0.3343311,-0.2645268,0.3039024,0.25911185,0.068964355,0.20160285,-0.41622856,-0.08929715,-0.13488439,0.18253298,0.42170015,-0.16195391,-0.49185866,0.4287841,0.39972988,-0.30555144,-0.43855366,-0.20801306,0.23977041,-0.37359032,0.37601134,0.120834336,0.010591086,0.0594233,-0.100100465,-0.42300665,0.1962092,0.16226922,0.469727,-0.29425102,-0.35219312,0.30043414,0.1589379,0.19053134,-0.4391019,0.20096685,0.42790428,0.3574925,-0.28005707,-0.0009812459,-0.4897115,-0.057074767,-0.13165396,-0.22344713,-0.47882396,0.187495,-0.03160305,0.13681889,0.20392641,0.026538312,-0.14415713,0.01604534,-0.032796375,-0.17711283,-0.06320633,-0.24359564,-0.42952442,-0.066753015,-0.14336123,0.27909493,0.05418883,-0.38639548,-0.2076728,0.20946439,-0.4256108,0.4437142,0.35050818,-0.050150327,0.11317245,-0.36787042,-0.43802673,-0.17127933,0.14573947,0.35941607,0.32520375,0.014113814,-0.32867244,0.3582897,-0.16103345,-0.41454595,0.25575992,0.23039395,0.22011079,0.16599649,-0.35268697,-0.425536,-0.09654921,-0.115469895,-0.37856862,0.013828547,0.0051584393,-0.1302873,-0.11818872,-0.023751542,0.34305614,0.46781304,0.4298794,-0.025741078,0.46307668,-0.15872633,-0.26621103,0.26327586,0.16543484,-0.022400323,-0.34158376,0.22867432,-0.28618047,0.26464367,0.36834553,0.4632685,-0.022185922,-0.14913999,-0.06369616,0.38192916,0.38538286,-0.35346955,-0.06047837,0.4870862,-0.297039,-0.40310514,0.3305011,0.35796532,0.030895395,-0.34010312,0.47695315,-0.26696688,-0.46898407,0.47046784,0.32023108,-0.22650689,-0.44102025,-0.28525457,0.12544458,-0.098538786,-0.49877134,-0.23937811,0.28489166,-0.2464161,0.07256917,-0.1661762,0.17136,0.09323714,-0.15704033,0.22583508,0.07295785,-0.11843478,0.15722403,-0.25322816,-0.4344438,0.35848853,0.42451328,0.07472677,-0.47505522,0.12094991,0.12918735,0.044694107,-0.49178016,0.03357034,0.32091135,0.27291763,-0.09745293,0.45961756,0.4300806,0.37778857,-0.45839274,-0.06671792,-0.33070654,0.46517143,-0.28711125,-0.22237946,0.34838584,-0.23845433,0.0034585977,-0.40552422,0.35949576,0.30574852,-0.26127493,-0.052800916,0.08797274,0.25882822,0.398386,-0.41281226,0.21060155,0.21637912,0.46056744,-0.4844021,-0.25500134,-0.3035734,0.39816403,0.047893424,0.0683856,0.2832864,0.17556676,0.42959484,-0.12434551,-0.12527929,-0.3449992,0.17969887,-0.13143964,0.22938153,-0.37079746,-0.27677575,-0.3736493,-0.34739533,0.32369056,-0.49347353,0.47479934,0.34368718,-0.48975682,0.09616799,0.3004879,0.09721571,-0.25461784,-0.39697552,-0.3914072,0.35899323,-0.4905617,0.3595711,0.28152624,0.20947859,0.057625517,0.05315343,-0.48480237,-0.325241,0.19848509,0.039422538,-0.41379818,0.38699925,-0.043811038,0.016112985,-0.3045746,-0.28000998,-0.3946895,0.310007,-0.44238287,-0.16446364,0.2943678,0.21255589,-0.23080787,0.3330375,-0.44016686,0.47955042,-0.33565313,0.0929383,-0.3188223,0.10218699,0.381064,-0.0857477,-0.120625265,0.091175914,-0.040313616,-0.42741305,-0.25142014,-0.17351773,0.396055,0.31353658,-0.046077814,-0.32125604,-0.2310004,0.18329252,0.13600826,-0.48570672,-0.37193593,0.35762352,0.27639988,-0.10051051,-0.1328932,-0.42173725,0.29735726,0.42539945,0.48300982,0.38491338,-0.1426221,-0.08432633,0.13936523,0.018284949,-0.06361976,0.17862098,0.4926618,0.042613976,0.2564408,0.29717976,0.016407544,-0.44255826,-0.117858,-0.3372862,-0.09383199,0.02716181,0.10093753,-0.33396956,-0.4368033,0.31776887,0.33692008,-0.21397479,-0.31535193,0.34619397,-0.014202872,0.47311938,0.46440944,0.0042483183,0.38895637,-0.36650118,0.22556837,-0.43155068,0.08392983,-0.43403575,0.05664442,-0.1294481,0.2261526,-0.15257438,0.44223464,-0.14528833,-0.44515985,0.43443498,-0.20315328,-0.29265246,-0.021537798,-0.31205773,0.055864774,0.16023876,-0.36248457,-0.22131921,0.036180735,0.48403218,0.0666255,0.034872226,-0.44883248,0.30953926,0.20590477,0.25403148,-0.15211658,-0.43935153,0.46243384,-0.39824542,0.3638275,-0.47176293,0.253988,0.116044,-0.21378298,0.23006582,-0.26424894,-0.41727787,0.11004557,-0.26403815,-0.40386134,-0.26836815,0.29667854,-0.24958849,0.2106543,-0.44093078,0.18392181,-0.0061063645,0.05688324,0.13589731,-0.29260212,-0.13809077,0.19073875,0.4858373,0.334741,0.24117726,-0.124097526,0.12766358,0.3605438,-0.1796385,-0.18341032,0.41224506,0.25476333,0.36996666,-0.14248812,-0.073045366,0.19757438,0.13776782,-0.008926797,-0.09988307,-0.126364,-0.04030905,0.21778302,-0.26174763,-0.1085285,0.49303365,-0.48644632,-0.0022644391,-0.20462044,-0.22979046,0.21285039,0.41026706,0.40884995,0.07126383,-0.48632598,0.48016623,-0.13123591,0.44312966,-0.48497766,-0.1936184,0.38587597,-0.43718144,0.3876327,-0.1680477,-0.14711201,0.24696068,-0.03289697,-0.23545371,0.33958098,-0.44325045,0.083280794,0.049562857,0.2463408,0.47121435,-0.2505663,0.11664182,0.3114814,-0.09368839,-0.37604955,-0.24712178,0.05446515,0.35524604,-0.025726777,-0.35187173,-0.08156379,0.24410713,-0.061500434,-0.25801027,-0.15719974,-0.21342106,-0.4623513,-0.14548458,-0.15254547,0.017634738,0.4999974,-0.3165837,-0.46950915,0.021666551,0.3650562,-0.2479213,-0.26626235,0.027992768,-0.002791737,0.0054144976,-0.40355548,0.08519079,-0.103573054,-0.39476836,-0.4382765,0.13052356,0.4640966,0.08154287,0.010908448,0.4567736,0.2629431,0.15504962,-0.30346066,0.08415024,0.36707053,0.27594736,0.48119587,-0.36099172,0.3392285,0.27020872,0.08599667,-0.3323048,-0.47110778,-0.10590745,-0.17351584,0.30042157,0.39546192,-0.27193218,-0.3872813,-0.009570749,0.16187713,-0.24691294,-0.15863921,-0.1888684,0.28787223,0.3183559,-0.21686447,-0.08304908,-0.1780203,-0.26031855,0.14364146,-0.17629075,0.23515601,0.30808467,0.037409384,-0.116116896,0.031851113,0.12735224,-0.050650973,-0.27829698,0.09778524,-0.277303,-0.02923976,0.10185351,-0.36757484,0.26529402,-0.3004365,0.047749437,0.47642654,0.27439615,-0.15001199,-0.2720875,0.47748652,0.037718363,0.37152606,0.37780795,0.312103,0.315044,-0.047399037,-0.4654954,-0.49980438,0.057881404,-0.029227637,-0.18772532,0.19327196,-0.11486795,0.24704447,0.4179044,0.48765257,0.1744199,0.28861803,-0.14914325,-0.40095767,0.25186205,0.20220634,0.2980074,0.11163519,-0.24147356,0.11553129,-0.43163744,-0.40234873,-0.42895323,-0.05417185,-0.16642337,-0.119912975,-0.2788059,-0.2640317,-0.37679192,-0.29697716,0.13926728,-0.33464018,0.40578797,-0.23029397,0.2039488,0.072954565,-0.14488333,0.21391097,0.018388422,-0.44775596,0.4000634,0.28709283,-0.451571,-0.40914074,0.10388653,-0.18915339,-0.0048020952,0.058599636,0.2952155,0.20657484,0.2999285,0.19724354,-0.27952635,0.40630144,0.008301893,-0.22158295,0.09479265,-0.16632386,0.16875659,0.2466074,-0.49145436,0.435354,0.14426258,-0.48550376,0.27010357,-0.47680783,0.23225479,0.2088314,-0.39742193,-0.44695628,0.20707287,0.45673612,-0.18874106,0.26923606,0.4175584,0.4446266,0.26245588,-0.20857161,0.2853779,0.19429311,-0.13899195,0.15484722,-0.13273664,-0.14194283,0.14136143,-0.16209577,-0.48218375,-0.20359708,0.3142964,-0.003040363,0.12738186,0.43725723,-0.06396051,0.15493892,0.29932317,-0.26955515,0.021157699,0.22487617,-0.23442754,0.44277608,-0.12130117,0.09019597,-0.13772011,0.42060485,-0.105256766,0.01517214,-0.13663435,0.04748252,-0.06132167,0.15713084,0.3433613,0.25439182,0.32599774,0.4848096,0.1195073,-0.35239276,0.3809309,0.24173206,0.39434674,0.09136009,-0.41857496,-0.31830812,0.31790495,0.0018943014,-0.08625724,-0.48182285,0.26345775,-0.32174408,0.010086038,0.045010384,0.2140376,-0.16483743,0.42214692,-0.35754067,0.37725222,-0.33993515,0.27881396,-0.45206046,-0.33022997,-0.2967975,-0.04370406,-0.43324754,-0.12821177,0.25795865,0.26531783,0.11434792,0.14159769,0.20365934,0.2239664,0.26576978,0.477707,0.40749812,-0.109141685,-0.3443838,0.079369575,0.2024099,0.009434368,-0.2890031,-0.39715973,-0.044319153,-0.24802761,0.32679233,0.23366033,0.33355275,-0.20089029,0.123500705,-0.3781546,-0.27902564,0.38492313,-0.25713617,-0.08805765,0.11822554,0.20958708,-0.06272886,-0.31440616,0.110979296,0.3147543,0.31329614,0.12714915,0.16398059,0.027818713,0.33325517,-0.25160822,-0.40999633,0.32043862,0.01572894,-0.20997234,0.33117762,-0.34514365,-0.0128495805,-0.16364516,0.248864,0.4289254,-0.4481065,0.055434197,-0.46118858,-0.3613304,0.47781795,0.025730068,-0.1518345,-0.0704366,0.4901227,-0.47066176,0.46763802,-0.35102084,0.1847715,0.032183364,0.4813699,-0.07415753,-0.38458875,-0.45757806,0.24848105,-0.09674514,0.007925942,-0.37584168,0.10617306,-0.3718839,0.44824764,0.36781943,0.24570242,-0.15106401,-0.25965488,0.3330646,-0.23380277,0.15138438,-0.2653511,-0.018305745,0.47940522,0.38435394,0.3361039,0.117487095,-0.17572178,0.14484386,0.4985625,-0.15848128,0.2627141,0.10147238,-0.46407935,-0.37371486,-0.22956087,0.08676748,-0.17693567,-0.061960902,0.45219818,0.3235891,-0.0033999109,-0.42440328,0.15265444,0.05384903,-0.21288443,-0.13993625,0.14354819,0.28109622,-0.37518755,0.3048852,0.35880697,-0.3833746,0.06505783,0.09390736,-0.05906752,-0.18276523,-0.15613696,-0.26109084,-0.4090816,0.28773713,0.104824126,0.09916522,-0.20439816,0.29121098,-0.35436296,0.3678655,0.3740078,-0.23844473,-0.20168176,-0.20587459,0.15849486,0.20931095,0.048985418,0.14788432,-0.10002243,-0.24306478,-0.34597936,-0.25003722,-0.0066999136,0.14959222,-0.47829378,-0.18176048,0.22532149,0.29859564,-0.32756498,-0.09634856,-0.32843423,0.16184717,-0.2545272,0.1011301,0.27145743,0.051844597,-0.19181265,-0.36743006,0.336331,0.42524236,0.24301606,0.17197661,-0.0639861,0.3072108,-0.23655938,-0.20930876,0.41149092,-0.18816319,0.1860421,0.2815501,-0.03275116,0.15339972,0.08036769,-0.12614298,0.02730658,-0.34505898,0.45962304,0.44423923,0.43377718,-0.046326976,0.46621242,0.13440652,-0.18081562,0.31737542,0.30272684,0.39336142,-0.060222477,0.1432728,0.20590268,0.3220374,0.18581505,0.40383965,-0.09237884,0.4229399,-0.23431706,0.47288513,-0.2889913,-0.19206978,-0.06644817,-0.4559366,-0.24684523,0.10261228,-0.46341679,0.18669853,0.3691759,-0.49764618,-0.47450104,0.10361405,0.43822986,-0.0063211517,-0.13988957,-0.27829063,-0.4717778,-0.49429092,-0.22499357,0.14527419,-0.45586535,0.40643343,-0.17142795,-0.48775208,0.030030478,-0.43624482,0.39302823,0.3709722,0.46833572,0.17123723,0.089994736,-0.47082084,0.08696681,0.33457056,0.24024773,-0.2658873,-0.3002159,0.39336303,0.10127258,0.43137223,-0.39445478,0.2642392,0.09549561,-0.3705545,-0.3955492,-0.13463724,0.025564361,-0.4624236,-0.20059687,0.34094265,0.42820698,-0.028920045,-0.25452584,-0.1623817,0.37984148,0.47927243,0.40503162,-0.21844815,-0.07434676,0.3257319,0.4131891,0.24649087,0.3296052,-0.15754674,-0.488644,0.014355936,0.28380856,-0.31007376,-0.3862369,-0.47179508,0.3456134,0.3789333,0.33700314,-0.36581343,0.07418803,0.020851783,-0.35623163,-0.4908435,0.36392716,-0.46619958,0.4863382,-0.44207317,-0.3249226,0.4799898,-0.37895408,-0.03628628,-0.34817463,-0.07928695,0.2970775,0.40515634,0.23022124,0.4297824,0.022617424,0.4768882,0.28855062,-0.24733947,0.21949606,0.15800597,0.13772242,-0.0733196,-0.20695703,0.24732019,-0.3264784,0.033337273,-0.18436964,-0.23593818,0.4023707,0.008081389,-0.17225343,0.18325527,0.10506448,0.30183306,0.1960056,-0.26150176,0.21594374,-0.4475964,-0.018520208,0.40610644,-0.49366283,0.49587712,-0.28825316,-0.12738928,0.25074086,-0.35344246,-0.09847867,-0.49024928,0.2864068,0.08816202,0.04733383,-0.4763215,-0.40673628,-0.053812776,0.026889225,-0.35731253,-0.42365998,-0.21147528,0.45786786,0.1471686,0.3174957,-0.06105707,-0.2200713,-0.08405527,-0.36626726,0.22006902,-0.3816421,-0.2521167,0.15232266,0.12125388,0.1326057,0.39895788,0.3151444,-0.23777111,0.07776639,0.22177826,0.34881112,-0.012342721,-0.4057756,0.4414782,-0.09557471,0.16207854,-0.34906206,0.16386123,0.09003216,0.2280408,-0.042509507,0.08836255,-0.16815294,-0.31002,-0.09586149,0.2593818,-0.4546955,-0.13100183,-0.3902661,-0.3196228,-0.005998148,-0.1247435,0.43247396,-0.3050804,0.36821643,0.018572757,-0.37704283,-0.11929194,-0.28282443,-0.34673265,-0.29922506,0.47799218,-0.40552026,0.34418753,-0.39673173,0.41401246,-0.4297318,0.24123392,-0.4558053,-0.42292544,-0.4197607,0.038365886,0.495528,-0.05348148,0.4903791,0.2314567,-0.049534015,0.22197714,0.20150599,-0.28628007,-0.48994115,-0.04505298,-0.110416785,0.4476878,-0.32338625,0.12984598,-0.13205089,-0.3516659,-0.3214325,-0.22084135,-0.30695024,0.2345706,-0.404891,-0.20760585,0.2493829,0.3378527,0.2999735,-0.2534941,-0.0360783,0.12720457,-0.30222222,-0.0048326706,0.2506963,0.3784347,0.41731977,-0.3823917,0.15581727,-0.12503934,0.085500516,-0.4279179,0.04056505,-0.33793807,0.060832582,-0.31634095,-0.33145854,0.24418543,0.38987288,-0.16685441,-0.23342663,-0.20490931,0.21528928,0.17974396,0.43813744,0.079086766,0.3585639,0.008023973,0.25612232,0.028224183,-0.07723938,0.1621652,0.19808565,-0.062148917,0.02542251,0.005954466,-0.35808212,0.45623654,-0.48118252,-0.07273311,0.4866735,-0.28276417,-0.10573237,-0.2590447,-0.42571172,-0.40322325,0.087643854,0.14183715,-0.029982923,0.29571646,0.40720567,-0.37570775,0.082640104,0.30105206,-0.22962524,0.11248507,0.039668195,-0.3851696,-0.29340133,0.3948378,0.47236437,0.4196279,0.46306267,0.40488783,0.091018006,0.043642733,0.3951668,-0.1986398,-0.37089312,0.0803786,0.34927455,0.1190115,-0.18451704,-0.33235905,-0.25497666,0.26325148,0.058452874,-0.17631984,-0.18098164,-0.18882248,0.22343335,0.31448895,-0.2645107,0.40961105,-0.20499499,-0.2906063,-0.16119663,-0.45937803,0.3943989,-0.39526364,0.15963364,-0.13445629,0.43360138,0.122503124,-0.042968635,0.10382319,-0.08760927,0.29300842,0.06092328,-0.44408697,0.25380054,0.067990616,0.07860133,0.032667335,0.36743152,0.00039199393,-0.20494527,-0.18446395,0.06213649,0.43173832,0.24131857,0.3694569,0.26953185,0.028583797,0.03928238,0.31398335,0.115119584,-0.24598591,0.3774431,-0.16588159,0.22972848,-0.42421898,-0.46765727,-0.03862277,0.019273855,-0.005844436,0.45952323,-0.22125556,0.084182486,0.33211592,-0.29800943,-0.4169158,0.14809185,-0.37414852,0.060509637,0.120806836,-0.026065603,-0.30147922,0.3459648,0.15057603,0.4167684,-0.34664226,-0.06577515,-0.12297513,0.111268714,0.049320076,-0.20837252,0.3561142,-0.16179824,0.055607703,-0.2977191,-0.2781098,0.41386214,-0.16696292,-0.081748284,-0.16196702,-0.17042488,-0.24608576,0.32128108,0.23054913,-0.103153944,-0.2591873,0.07893295,-0.24569167,-0.054952655,-0.06248598,-0.24047798,-0.21631595,0.12571691,0.08094462,-0.37701258,-0.4081999,-0.054935638,0.2543676,-0.31949836,-0.15388766,-0.48874852,-0.39949355,0.17047763,-0.33925417,-0.48459455,-0.24563326,0.35940504,-0.27998132,0.13803478,0.13100006,-0.0833037,-0.21731046,-0.16605017,-0.48880473,-0.16811533,-0.007349312,0.27808774,0.2954674,0.089691915,-0.108765125,-0.48756403,-0.06748138,-0.40718216,-0.091295876,0.48930222,-0.4827974,-0.26041806,-0.15542084,-0.1161457,0.45635962,0.28215668,-0.33627707,0.2652659,0.3490317,-0.14509043,-0.17446774,-0.27381274,0.13952012,-0.42509985,0.44881475,0.1963834,0.46424702,-0.41642433,0.41654772,-0.039083872,0.30837145,-0.08980836,0.39931002,-0.32038605,-0.40354252,0.16286199,0.056180794,0.38452268,-0.30513462,-0.44875908,0.036090516,0.31915256,0.16792199,0.2016709,0.06428351,-0.0546627,-0.3044963,-0.4175588,-0.101600006,-0.031466193,0.10746563,0.21922866,-0.24668558,0.26354897,-0.21202055,0.21064848,0.41018993,0.3016437,-0.13150115,0.0042834673,-0.053878516,0.016066523,-0.06378583,-0.4334764,-0.073186114,0.20326912,0.010450812,0.41224894,-0.23702033,0.36787936,0.20860024,0.47657493,-0.14543438,0.43822557,-0.26849434,-0.037815917,-0.014684744,-0.49004462,-0.02916051,0.32660106,0.41717222,-0.46247974,-0.02274417,0.17269003,0.3598939,-0.48208666,-0.26408452,0.22457601,-0.20626467,0.43354705,-0.37183607,0.28299344,0.4811662,-0.26763892,-0.15729526,0.39808038,0.394794,-0.32885313,0.095338084,-0.26037306,-0.45171866,-0.38356817,0.27930573,0.010100113,0.34022367,-0.04731329,0.055352267,0.16881464,-0.4229793,-0.20947523,0.292974,-0.15396705,-0.3791887,0.36997327,-0.3314356,-0.22038502,-0.19426475,0.018279808,0.19975495,-0.21988228,-0.4470878,0.18223347,-0.0925937,-0.2573902,-0.47779682,-0.28716892,0.048660226,-0.057576917,0.3603537,-0.40847623,-0.2096614,-0.104871154,0.23182535,-0.43457645,0.24155885,-0.24998683,0.13202,-0.09657349,0.22037049,0.21629244,-0.13241513,0.4631594,-0.14480977,-0.39574587,0.30645224,-0.28381014,-0.1582114,0.4230919,0.33409393,-0.13849474,-0.26666573,0.16948521,-0.17845473,0.3795474,0.35638732,-0.37315965,-0.084555894,0.4316646,0.47356832,0.40780392,0.17520761,0.42642695,-0.19172633,-0.45429137,-0.1837245,0.4521338,-0.036621038,-0.41653877,-0.41773647,0.051940408,-0.10581337,-0.12623233,-0.3493138,0.17256641,-0.48234838,0.14617464,-0.23204894,0.37453446,0.19376051,-0.22169027,0.0064050546,0.10245455,0.07044831,-0.18502001,0.26527983,0.2852753,0.08656958,-0.38520455,0.11438947,0.42383626,-0.075201884,-0.033636466,0.34809688,0.17076604,0.09908092,0.47440377,0.34710094,0.48005778,-0.1689784,0.013459849,0.17521511,-0.31643376,0.16273685,-0.47941095,-0.15651079,0.20408161,0.37571123,0.05343712,-0.08030488,-0.2914275,-0.16687086,-0.2596198,0.41503653,-0.22579813,0.24945223,-0.18507175,0.4499377,0.34421515,-0.085033774,0.18509296,0.10030737,-0.33010188,-0.3118616,0.24290678,-0.15512803,0.01627702,0.0345999,-0.46085608,0.2939922,0.4350585,-0.4202811,0.22420666,-0.24484606,-0.47333756,-0.07169834,-0.4295088,0.08896027,0.015668754,-0.42787412,-0.15760581,-0.17819542,-0.39247283,-0.29069626,-0.17597634,-0.15535407,0.35734805,0.014266685,0.32409096,-0.019765178,-0.09478742,0.1503314,-0.4098873,-0.41129336,0.4327049,0.0785637,0.08276572,0.120333575,-0.21548575,0.47509226,-0.11066861,-0.3931273,0.02264402,-0.039750867,-0.20268789,0.18325268,0.43671885,0.14482932,-0.35044414,0.42670736,-0.26257107,-0.4334855,-0.10955803,0.104540415,-0.38682166,-0.3628479,-0.36485308,-0.4224462,-0.1458659,-0.13167697,-0.22142941,-0.46268082,0.49125078,0.30830368,-0.117982835,0.009241756,0.19478066,0.38331434,0.42750013,0.40957344,0.24916464,0.39553002,-0.20690939,0.48610982,0.16148792,-0.16643627,-0.018369088,-0.17319202,-0.2043,-0.29525033,0.16204724,-0.39001524,0.22899295,0.2543329,0.21533923,-0.17728288,0.44829035,0.4846501,-0.30140403,0.33451414,-0.38795757,0.14972396,0.13138333,-0.08652945,0.39709997,-0.28486347,-0.21169639,0.35786775,0.4651518,-0.37247723,-0.32322794,-0.16581143,-0.09218365,0.44960946,-0.24166633,0.2556891,0.020076558,0.2375307,-0.19538118,0.45606092,0.2511606,0.28597182,0.09876267,0.2104627,0.25082383,-0.38035703,-0.1744548,-0.38307163,-0.020195762,-0.08305296,0.022807667,-0.018361302,-0.1012583,-0.3029915,0.39007953,0.42231074,-0.2963672,0.2226301,-0.22226165,0.28882125,-0.018376332,0.2632311,0.4186996,-0.00044993448,-0.057979006,0.43090847,0.3073294,0.054154713,0.04227862,0.35734382,-0.19135913,0.48312035,0.0620067,-0.23882955,-0.25567597,-0.34743056,0.4088552,0.14528076,-0.18423842,0.4232066,-0.41084456,0.04746084,-0.16121203,0.29804876,-0.01844535,0.22582294,0.47921115,-0.39970875,-0.2883244,0.22787324,-0.13290016,0.1870102,0.17873059,-0.2101305,-0.2797372,0.02053744,-0.23448765,-0.3276505,0.0762065,0.36490956,-0.39727163,-0.107495755,-0.31055775,-0.39246467,-0.4659809,-0.24904098,-0.21652572,0.1362486,-0.08771865,0.036550943,0.17984465,0.079445474,0.14780274,0.047163185,-0.2894899,0.3465205,0.3783851,0.27392268,0.44527295,0.43654618,-0.22410257,0.4558043,0.08166024,0.007738163,-0.013098636,0.31329605,-0.4272072,-0.4263888,-0.03498797,-0.29383373,-0.37319836,0.44902074,0.020174311,-0.37906057,-0.3131731,0.36864826,0.2272473,0.47927782,0.2613849,-0.46062046,0.46939176,0.38777295,0.055283654,-0.32443362,0.21536097,0.19081236,0.20631719,-0.273436,0.03623916,0.18934786,0.15997763,0.19083981,-0.35190755,0.111750945,-0.009985034,0.47030511,-0.24467112,-0.31900537,-0.44128472,-0.34688166,-0.23782732,0.06673435,0.4135324,-0.006975924,0.2141338,-0.046893302,0.2647973,-0.18901952,0.10927169,0.28458107,-0.36346695,-0.41202667,0.14059462,-0.07362936,0.32894686,-0.25557974,0.34882274,-0.33147702,0.14786993,0.30284834,-0.4009681,-0.25578865,-0.2145828,-0.1533763,-0.11623067,0.27694958,-0.12064432,-0.32131657,-0.108912565,0.06083356,0.44857565,-0.39472258,0.334486,-0.4185794,-0.054268025,0.0091746235,-0.24952774,0.020597067,-0.20673698,-0.09810936,0.04250241,0.09755368,0.17767508,-0.05137124,0.3160546,0.4478292,-0.15046044,0.4456774,0.41346955,-0.3349693,-0.24806823,-0.26547047,0.0864069,0.09720853,0.1880397,0.23946373,-0.4319146,0.17045663,0.268241,0.28094387,0.27942264,-0.49318963,0.35534233,-0.39591697,-0.18536708,-0.45680466,0.016012302,-0.40399823,0.038761538,-0.19123505,0.2722672,0.014781164,0.21533938,-0.3627732,0.051447343,0.17899288,-0.24074858,0.03857101,-0.44960725,0.21331994,-0.17412315,0.16001129,0.2820669,0.18032041,0.48159838,0.16161588,-0.35564214,-0.13656789,0.33622828,-0.28355888,0.20005816,0.22720456,-0.30589363,-0.1473564,-0.44093147,0.46947807,-0.012110367,0.41849548,0.32804304,-0.05769672,0.31008145,0.06508473,0.072024256,0.054496087,0.16782704,0.35999563,0.27535513,0.44969502,-0.12817094,0.3736352,0.016401643,0.3577001,-0.32061303,0.34732878,-0.070723094,0.30990177,-0.40221894,0.33838424,-0.49098206,0.46161574,0.38176936,-0.08681002,-0.111363925,-0.37250507,0.30203414,-0.15156844,-0.48511338,-0.22011471,-0.017567838,0.3199531,-0.3245168,0.25686145,-0.2538752,0.13408017,-0.32595143,-0.20187382,0.33598062,0.15343122,0.094504446,-0.19759002,0.32636207,0.35007703,0.29258755,-0.00074658124,-0.18103048,0.11624514,0.06295066,0.2123122,-0.24093722,-0.020095631,-0.18472259,-0.4070079,0.22589652,0.13069694,0.3485017,-0.48878008,0.16610985,-0.2849071,-0.11669194,-0.4517533,0.34157494,-0.46238068,0.042243302,0.19283015,-0.19773169,-0.26756808,0.18960652,0.48169202,0.42794415,-0.48245132,-0.0831457,0.3767896,0.0043754485,0.38092408,-0.0028262697,0.322744,-0.43341172,0.2809964,0.2199176,-0.44213516,-0.35676187,-0.40442222,0.15312347,0.37066892,-0.3673443,-0.23574498,-0.493898,0.44273284,0.4483823,0.30616075,-0.31207183,-0.007130168,0.2741978,-0.12892972,-0.113154136,-0.25480187,-0.20817052,0.23630184,0.4003083,0.29241696,0.39380288,0.37476832,0.23177642,0.0548486,0.16146588,-0.46664414,-0.31375492,0.34434032,0.12500727,-0.41022056,0.37266138,-0.19359434,0.35208565,0.2583324,0.3400528,0.1943589,-0.39163464,-0.3609376,-0.30599493,0.15990137,0.13965757,-0.25204632,-0.4295234,0.14492379,0.2065295,-0.42785284,0.12623948,-0.27482334,0.3485417,-0.018999849,0.08554827,-0.47048265,-0.018181168,0.40722373,0.27652875,-0.49175566,0.36544836,-0.041024342,-0.062478468,0.3201724,-0.43595237,-0.08018843,0.32370818,-0.47969726,-0.39748648,-0.2601191,0.14010936,-0.110259905,-0.44361055,-0.4601901,-0.38953128,0.1834162,-0.41484153,-0.23866278,0.29891375,-0.3416189,-0.23579554,0.38213038,-0.28821835,-0.17602149,-0.29429138,-0.165084,0.27215594,0.40714633,-0.00938431,0.38756594,0.24149288,0.18477681,0.31401688,-0.03147645,0.44824138,-0.2974927,0.4073433,-0.377682,-0.089186184,-0.16201533,0.08989567,0.14253823,-0.07640913,0.3861327,0.36871284,-0.08827792,0.4454161,-0.08898605,0.015852971,-0.3075395,-0.050087623,-0.05869592,-0.4719266,0.49283805,-0.1573322,-0.13545647,-0.059430517,-0.040600903,0.056289125,-0.10892047,-0.37714705,0.4351062,-0.17681526,0.49611658,0.24278876,0.07221396,0.3946617,0.49650824,-0.12966827,0.18483877,-0.43294334,0.14975435,-0.30982563,-0.42788124,-0.09043072,-0.23400958,-0.15953311,-0.45797873,-0.31611264,0.087735765,0.05908038,-0.035735417,-0.19928393,0.46662915,-0.29582846,0.38356134,0.48423153,-0.11034291,-0.23721302,-0.46051466,0.06882582,0.31140622,-0.40440783,0.4112156,-0.1547694,0.23925778,-0.090946995,0.07347759,0.07207605,-0.22153749,-0.4435764,0.26607114,0.037511222,0.254709,0.08829432,0.45309561,0.08123409,-0.366048,-0.2081573,0.021649715,-0.4049498,-0.29303646,0.43394887,-0.49679148,0.3345407,0.14492723,-0.0772628,-0.45383257,-0.44141617,-0.3824336,0.025393622,0.19778432,0.17131223,0.17840731,-0.16187946,0.41566172,0.0321482,0.45981345,-0.40866518,-0.14225598,0.018109266,0.46740717,0.0042339335,-0.08822584,-0.4135777,-0.049453843,-0.056646287,-0.4684289,0.33410686,0.30314878,0.3307124,0.46647674,0.28225806,0.46876088,-0.26045692,-0.21082291,0.45345467,-0.317161,0.09409182,-0.13844894,-0.2048954,0.33957037,0.1113202,0.16615076,0.11407127,0.4113017,-0.4129659,-0.17148013,0.2462537,0.4786558,-0.38125956,-0.4625959,-0.049301002,-0.32652062,-0.15116921,0.44066775,0.2182925,-0.3247017,-0.23117,0.44667977,-0.19127059,-0.027486227,-0.24476482,0.36062562,-0.31410417,-0.15296426,-0.074360795,-0.4330184,-0.28791252,0.124329396,0.08655665,-0.418462,0.07553268,0.42530346,-0.0848336,0.27712566,-0.30435503,-0.111952536,0.44881555,-0.4165045,0.009664737,0.25273746,-0.37522954,-0.45214498,0.039633527,0.033467393,-0.45477915,0.37604803,-0.35884666,0.21872449,0.1676103,0.17938632,0.05604077,-0.39662647,-0.34623247,0.11098052,0.2414024,0.2873638,-0.35350245,-0.28756052,0.11413015,0.3143057,0.13306417,-0.29445025,0.4344189,-0.22995955,-0.3775485,-0.4999471,0.08445274,-0.023948941,0.41464975,0.45907605,-0.26752338,0.40139243,-0.018643314,0.2664023,-0.18809466,0.18623638,0.44254434,0.4105238,0.35438597,-0.11448963,0.17884995,0.12511273,0.41479334,-0.4716061,-0.35806242,-0.32088053,0.43581796,0.18884015,0.27512443,0.39609492,-0.1901913,-0.17015608,0.3361959,0.19599104,-0.045359932,-0.45091608,0.20903724,-0.26076758,0.28618577,0.22705437,-0.18278418,-0.1425845,0.2784875,0.31549662,-0.3340649,0.110908054,0.15905468,0.23663269,0.17095771,-0.24402185,0.33670366,-0.03712848,0.16425548,0.018178746,0.4678641,-0.49829978,-0.3821355,-0.3408486,0.32994315,0.029215343,-0.39014697,-0.33598724,-0.3988187,-0.1551226,0.42635417,0.23667483,-0.108378865,0.38992313,-0.49203038,0.47925493,-0.2172064,-0.12774408,-0.21343799,-0.29460138,0.3024808,-0.22060019,-0.43204013,0.4036038,0.004065377,0.011104762,-0.1484272,-0.30627796,0.38395932,-0.1879062,0.055380356,0.06302679,-0.03720566,0.13574919,0.27287108,-0.13699682,0.22466473,-0.15948567,-0.3516079,-0.28459388,-0.2233047,0.30967352,0.43612593,-0.021094153,-0.02776865,-0.45404822,0.4950881,0.003026409,0.38719663,0.12341425,-0.22782515,-0.07050799,0.4011614,-0.17553984,-0.44733506,0.017194586,-0.39527532,-0.355712,-0.14709051,0.19572923,0.20170884,-0.13624644,0.10454089,0.45719436,-0.36739045,0.19224203,0.26387432,-0.25805667,-0.22111478,0.23243429,-0.3802748,0.20652674,0.41032392,0.042371582,0.15563647,-0.27053937,-0.2255775,-0.4936826,0.21342249,0.4408221,0.06794845,-0.3198994,-0.31272602,0.01598078,0.3017367,-0.2739445,-0.3138742,-0.021061664,-0.19657628,0.018177718,-0.29953948,0.060939524,0.3653838,-0.24992232,-0.21896797,-0.35704213,0.17946899,0.28297007,-0.44661546,0.10058341,-0.1415483,0.026479539,0.44121826,-0.4715745,-0.48402038,0.2178598,-0.15260027,0.12114732,-0.23662429,0.4253839,0.44946665,-0.29293656,0.08668392,-0.34253234,0.020948017,0.44175005,-0.01761765,-0.044069313,-0.44934672,-0.36698478,0.15092987,-0.26326284,0.41416666,0.06022662,0.39601123,-0.23794666,-0.28010195,0.07403042,-0.24401663,0.06403963,-0.18386863,-0.44889623,0.18968713,-0.12740389,-0.36104664,0.33723772,-0.18447208,0.076813884,-0.37631124,0.19279246,0.49982038,-0.4125724,-0.07070078,0.47298253,-0.36407346,-0.38650164,0.37305573,-0.32155713,-0.06636247,-0.44209644,0.44283843,-0.3947092,-0.43156594,-0.46754667,0.4552239,-0.37724343,0.38695103,-0.22565396,0.08187468,-0.13829476,-0.16943184,0.35670075,0.21823914,-2.8435676e-5,0.16788037,0.22368577,-0.29120636,-0.14930888,-0.05116549,-0.19860353,-0.29462826,0.36796266,0.45392546,0.28646073,0.1353455,0.32689673,0.19037549,-0.44904843,0.26786104,0.13924974,0.29817402,-0.15762435,0.3180689,0.16063508,-0.28530818,-0.45089495,0.3247351,0.010351203,-0.32404035,0.28796956,-0.20272672,0.33752757,0.091441676,0.16372947,-0.35226586,-0.30761063,0.3989482,-0.4898162,0.32630968,-0.49337983,0.47867194,-0.10225716,-0.26935768,0.35998005,0.31866118,-0.008339226,0.09040915,0.38392785,-0.12313498,0.09055949,-0.35579854,0.18231978,-0.20644447,0.32683238,-0.252311,-0.31754652,0.12780266,-0.0016922799,0.3587626,-0.39318538,0.4941852,0.23414586,0.2846843,-0.024076618,-0.29554453,0.06316894,0.26412693,-0.034258805,0.27289152,-0.0815532,0.3848194,-0.14692268,-0.48838645,-0.0011186574,-0.18390377,0.43898326,0.102442436,0.22830632,0.13291816,0.2172999,-0.26862392,-0.40796414,0.04489517,0.35342574,0.037524555,0.21327083,-0.3758376,0.020739611,-0.383027,0.1368242,-0.26939255,-0.16003336,-0.44551736,0.45300257,-0.46247864,0.21722974,0.028701551,-0.098651215,-0.43759093,-0.21379091,0.26627252,0.27546194,-0.36106274,-0.31016135,-0.2642535,-0.13629544,0.26946366,0.03607265,-0.25855148,-0.43060806,0.24331129,0.10724184,0.4035373,-0.181518,0.0068818913,0.21385449,-0.25673717,-0.06590875,0.18809961,0.2869939,0.39974397,-0.38629436,-0.26095957,0.36850312,-0.0030578321,-0.32955652,-0.32670927,0.29899898,-0.1279067,0.32849097,0.37077367,0.22877245,-0.021150613,0.09200675,0.3708868,0.36807293,0.09414634,-0.21177197,0.1994395,-0.09115153,0.191645,0.45101193,0.12775235,0.16070119,0.4734804,0.3495635,-0.3390716,0.37143862,-0.14968695,-0.22397152,0.097773686,-0.25597987,-0.29582313,0.090602495,0.1881059,-0.034130074,-0.013422435,-0.31843147,-0.2391504,-0.06282337,-0.10325961,0.42440608,-0.37819573,0.22514233,0.49507073,-0.12001777,-0.119628854,0.32325184,-0.45279437,0.4031289,0.4301576,0.19175096,-0.28192502,0.3098986,0.3192512,-0.33962324,0.4489437,0.30154973,-0.29841077,-0.26907086,0.23432997,-0.20515701,0.21179534,0.43926856,0.3443486,-0.4506629,-0.10602331,0.4138419,-0.26154178,-0.2751313,0.088008635,0.32658464,-0.23133194,-0.43508762,0.05040527,-0.13277382,0.23767668,0.4526867,0.42021832,-0.35329252,0.046425566,0.173747,-0.33870485,-0.46141806,-0.13741633,0.2750217,-0.06724195,0.42811584,0.11955629,-0.06332687,0.25547203,0.02771717,0.44799533,0.40185812,-0.27899432,0.18629277,-0.31630844,-0.018122548,-0.14101264,0.39696366,0.23894018,0.32927078,0.2119937,-0.48110047,-0.37453046,-0.14704774,-0.46627095,-0.28677586,-0.1620588,0.22511837,0.12736806,0.35570446,0.1825838,0.01316251,-0.021955855,-0.074764945,0.44946498,-0.13694203,0.24298087,0.19990583,-0.26389366,0.009502094,-0.25965178,0.4239023,0.2957103,-0.49125028,-0.2559811,-0.30575693,0.20167941,0.42913115,-0.44764397,-0.250391,-0.022217525,-0.042114962,-0.059202284,0.231535,-0.27129146,-0.06686758,-0.02591686,-0.28581315,-0.39937538,-0.18650492,0.19640684,0.46790174,-0.4252731,0.3426897,0.47598156,-0.07107506,-0.33377013,-0.14828207,0.45515585,0.39219752,-0.06861115,0.44718793,0.06674736,0.0213913,-0.22878559,-0.03517644,-0.42731693,-0.42128903,0.23000468,-0.019891953,0.34088075,-0.41896227,-0.055216428,-0.37347093,-0.17105949,-0.2089893,0.18654132,0.45371956,0.47672567,-0.15165159,0.44110656,-0.49469054,-0.16575758,-0.33548364,0.43702525,0.27291852,-0.31019735,-0.3689981,0.42334798,0.25503364,0.13493182,0.3639314,0.031041274,-0.057016723,-0.3253839,-0.26824257,0.32267925,0.31137702,-0.046399698,-0.21115251,0.32397515,-0.33067137,0.2550217,-0.23478636,0.16428204,0.0033604845,0.09079986,0.36280206,0.002957938,0.09239171,-0.18051858,-0.44620207,-0.25452605,-0.08404512,0.41709617,-0.24962237,0.2947102,0.44672734,0.27362153,-0.03029617,-0.049200337,0.033411957,-0.46201107,-0.44582537,0.39026633,-0.32361266,0.4843233,-0.35348257,-0.36594063,0.032431778,-0.41452226,0.37707704,0.49768278,0.24764551,0.45806944,0.3527964,0.4055543,-0.0007784909,0.3330711,-0.46923503,-0.4955872,-0.16434577,0.23095009,-0.17153564,-0.11864808,-0.20988306,0.20323071,0.05404488,-0.32620576,-0.33734444,0.48544526,0.29538575,0.49692133,0.08768544,-0.31775498,0.35551238,-0.35818085,-0.31507,-0.08621877,-0.3206277,-0.295253,0.11618931,-0.33845305,0.36168706,0.04914188,0.3969061,0.4761321,-0.34087592,0.2898415,0.20165978,-0.38659427,-0.43755084,0.44269618,0.4557604,-0.26875728,0.2406775,0.39504817,-0.34431776,-0.15270367,0.32349253,0.0619679,0.1387522,-0.0273783,0.02963271,-0.15933979,-0.3890409,0.16027294,-0.33461803,-0.1799879,-0.05801848,0.42143664,-0.14223069,0.09779236,-0.046921495,0.24765809,0.33397862,-0.30838034,0.3936448,0.42606455,-0.28592908,0.17961577,0.17625417,-0.15185797,-0.14908215,0.37315568,0.26290897,-0.35316125,0.34936783,-0.04270453,-0.41624144,0.4431744,0.40164298,0.40503845,0.41422,0.39708483,0.1799956,-0.18050626,0.17417984,0.4273178,0.30167946,0.44703597,0.25843468,-0.3521509,-0.48390073,-0.017721461,0.18757704,-0.15087038,0.3759555,0.2547689,-0.48911542,-0.49865705,-0.498065,-0.18425247,0.3660412,0.11745789,-0.44682917,-0.2902564,0.23831138,0.08051943,-0.32411185,0.011184691,-0.006468636,-0.12707606,0.111889966,-0.4444761,0.10840653,-0.16209194,0.3327995,-0.14903691,0.09865125,-0.24239486,0.31805393,0.20772289,0.36709654,0.35976982,0.37478623,0.48915887,-0.26256695,0.1853518,0.077772096,-0.06502105,0.49451572,-0.4186289,-0.43494114,0.45366865,-0.26510164,-0.04180469,0.07132048,0.17335652,0.3742335,0.18437965,-0.40858665,-0.13275634,-0.4190681,-0.3272322,0.346451,0.0044273646,0.03949732,-0.040885344,-0.42327067,0.21798867,0.09223818,0.22075944,0.43541533,0.12289238,0.22941045,0.06485795,-0.45389503,-0.34680578,0.109427005,0.083283976,-0.19546306,-0.12586161,-0.22139823,0.0077904454,0.2522263,0.3150212,-0.4936189,0.005802209,0.08445447,0.30095148,-0.08109742,-0.052439086,-0.33638474,0.28797737,-0.32752928,-0.26983795,0.3185859,-0.2252404,0.053478718,0.40391108,0.44390124,0.48676944,0.46707395,-0.19812994,-0.039620247,0.05556778,0.003956156,-0.19109078,0.3862738,0.22697325,0.33087182,-0.15867761,-0.25012216,0.106179304,0.13816807,-0.4461642,-0.3553539,0.33366394,-0.09611319,-0.13038442,-0.20549446,-0.079937615,-0.20068058,-0.24442889,-0.37257668,-0.27248392,0.2975219,-0.34130472,0.04300348,-0.4206595,0.09303504,-0.31431657,-0.04368683,-0.46815744,-0.35632998,0.21553126,-0.2931732,-0.19752537,0.06969634,0.073516026,-0.32700285,-0.10290318,0.31921595,0.0738651,0.046893153,-0.26351583,0.34557787,-0.30530936,-0.272883,-0.0010041576,-0.40960714,0.19785823,-0.43514192,-0.13084444,-0.4825821,-0.39379534,0.011570671,0.2468849,0.0015545761,-0.40424335,0.15636921,0.3821965,-0.46416655,-0.19474909,-0.32059154,0.48333856,0.14035264,-0.066019125,-0.33336774,0.24337937,-0.09279008,0.08574487,0.19542393,0.20328453,0.036632456,-0.13005705,-0.030166002,0.3870448,0.09232141,-0.25936958,0.106518455,-0.09694183,0.19665173,0.48000965,-0.23305428,-0.013847998,-0.41303998,-0.26598534,-0.09793508,-0.25877485,0.45178476,-0.04466845,0.35036355,-0.3898346,0.37093207,-0.23834951,-0.3556773,-0.24813278,0.2564965,0.4804263,-0.3660102,0.41886052,-0.06805282,-0.27492297,-0.065024294,0.33043918,0.12027591,0.41433585,0.3562989,-0.4637538,-0.11873864,0.29623032,-0.26031247,-0.39199683,0.20248199,-0.09863217,0.3393912,-0.06240497,-0.0073742857,-0.12702061,0.4287468,0.3523805,-0.39546064,-0.007846826,0.18140106,-0.0014745503,-0.26104933,-0.028843436,-0.08184107,0.19856827,-0.07973056,-0.33941182,-0.22757089,0.14082062,0.46357766,0.45029023,0.37199116,-0.09468993,-0.15312876,0.26465845,0.47224447,0.20710588,-0.3110141,0.33089614,0.35231215,-0.033122465,0.47634348,0.058396272,0.24364963,0.28815758,-0.47070634,0.31824014,0.014280063,0.21428291,-0.14180249,0.19828293,-0.015477149,0.11081678,-0.21681553,-0.021597177,0.3781055,0.033234395,0.12983508,-0.04601048,-0.21032317,-0.2615602,0.013674689,0.29639247,-0.058443237,0.10495645,-0.24201448,0.20341563,-0.051912267,-0.4470595,0.27334592,-0.497544,-0.3409202,-0.05532376,-0.31229722,-0.010519818,-0.43924415,-0.11743631,-0.4454864,0.27018407,0.3592245,-0.10182747,-0.34110972,-0.3114585,0.18862231,-0.22760613,-0.13833854,0.22266841,0.05562636,-0.3596132,-0.42894813,0.07477967,0.15533498,0.40151253,-0.45832655,-0.35492158,0.47825122,-0.14770997,-0.30383444,-0.3180096,-0.40469947,-0.423134,0.11644917,0.36791596,0.49586824,0.017104996,-0.035458326,-0.031009547,-0.16313843,-0.35676476,0.31519112,-0.21029603,0.13360105,0.0076549887,-0.42509118,-0.14344086,0.002276292,-0.048256837,-0.15574121,-0.19305281,-0.02690911,-0.14212,-0.15134464,-0.37745622,-0.45312658,0.29034737,0.1539889,0.48405686,0.15265755,-0.28214574,0.46263018,-0.44359678,-0.4022838,-0.22240563,0.27547404,-0.11881149,0.4494903,-0.044871926,0.12644985,0.14761452,0.41714114,-0.4509769,0.10585112,-0.3177968,-0.34379262,0.45471975,0.061735876,0.2308667,0.43891618,0.055085525,-0.30326062,0.48645192,0.4139094,-0.22771549,-0.34235898,-0.29532298,-0.052359615,-0.004306396,-0.0029741926,-0.11025168,-0.289687,0.47183365,0.3126584,-0.13385603,0.33051106,-0.22432944,-0.1357833,-0.17287415,0.04784326,0.13881755,0.30347562,-0.35216507,-0.20885752,-0.025175234,-0.04919155,-0.46738946,-0.3708185,-0.22381212,0.4661085,0.17918587,-0.4188934,0.1488379,0.44301105,0.2949809,0.38558963,-0.2555804,-0.29231554,0.44486532,0.35236079,-0.059224546,0.111712776,0.199829,0.45248476,-0.053704116,-0.36540252,0.3705613,-0.44085285,0.07815322,-0.047291335,-0.24687815,0.39093074,-0.36229602,0.46346918,-0.02117323,-0.21766303,-0.4164498,0.21670562,-0.085385405,-0.0889562,-0.11085349,0.029657999,-0.005496942,-0.09487661,-0.103548735,-0.1590908,0.43506005,-0.05516164,0.14623229,0.45005232,0.07305541,-0.18073583,-0.45856294,0.040005364,0.49429086,-0.13465637,-0.43905544,0.1846649,0.069910444,0.0574907,-0.47129735,-0.22074278,0.3875389,-0.14689983,-0.055466246,0.4058885,0.4722251,-0.45675957,-0.45543122,-0.49153978,-0.11472345,0.26758528,0.35092682,0.24727564,-0.463075,0.4813109,-0.30687445,0.44862026,0.34260458,0.03719857,0.48479295,-0.42669946,-0.321094,-0.09941576,-0.065699495,0.3224476,-0.42115057,0.004501617,-0.16974409,0.4127709,0.44508168,0.10762148,0.38633138,0.19512823,-0.16210644,0.24285613,0.40734884,0.43922597,-0.15812486,0.30575132,-0.06424342,-0.09364092,-0.14863588,-0.40386426,-0.14987226,0.14545426,0.15556777,0.49787676,0.41574344,0.1457907,0.32993263,0.47363204,-0.2787393,0.18952936,0.4547715,-0.43185765,-0.37138584,0.34173077,0.062463958,0.44222495,-0.29579493,-0.36091104,0.47477308,0.10282365,0.27382508,0.33905292,-0.17092118,0.05211985,-0.035364885,-0.08030515,-0.18678117,-0.40408114,-0.0063167876,-0.46427655,-0.22933719,0.45078784,-0.4358451,-0.32165605,-0.21974462,-0.14519997,0.31646982,0.106780544,0.050083335,-0.47287396,-0.14168417,0.26087657,-0.31436315,0.0017892786,0.42000505,-0.24435636,-0.2396881,0.18377946,0.4267652,0.14093895,-0.14176449,-0.3619106,-0.13060401,-0.24606346,0.22538835,-0.10006188,0.44738397,0.48990917,0.2828408,-0.48107558,-0.39997092,-0.23508883,-0.31810537,0.050159648,0.17002358,0.37214136,-0.30762714,0.093436696,0.4267153,-0.27087247,-0.35439083,-0.012439441,0.01803502,-0.07667726,0.29924405,-0.36406738,-0.2491763,0.09338148,-0.16967869,0.46603394,0.3651154,-0.013729323,-0.28781915,0.41250446,-0.08865331,-0.23534651,-0.14661291,0.13426857,0.3987587,0.030408263,0.44448018,0.25011712,-0.3977356,0.041289054,-0.43655825,0.2855972,0.4930741,0.3256694,0.115483835,-0.2262544,-0.38267365,0.2770768,-0.112789065,-0.111615926,0.20625137,0.25783592,0.21095866,-0.41820896,0.10251106,0.03875384,-0.26609787,-0.24980405,-0.088057704,0.3555936,0.3405179,0.062235694,0.47981948,0.42416507,-0.47858804,0.3676487,-0.35416737,0.40036064,0.17289409,-0.44533524,-0.24384284,-0.46524084,-0.22398637,0.3296705,0.09817876,-0.24894615,-0.47749788,-0.319271,0.1323619,-0.47495854,-0.38100308,-0.33996934,-0.06984049,-0.054269973,0.1132892,-0.277065,0.36052585,0.25925952,-0.46530637,-0.0530909,0.44245568,0.26341116,0.12585172,0.17216215,-0.46501425,0.008377403,0.15794949,-0.43817985,0.3642538,0.2797104,-0.19372337,0.28734216,0.24740045,-0.42876744,0.33847708,0.12156313,0.14614141,-0.4522389,-0.42416075,-0.4103469,-0.3937626,0.4035914,0.30625358,-0.0647085,0.3581676,0.23070121,-0.30082285,0.4524598,-0.3685943,-0.2419658,-0.17552109,0.4216685,0.13600707,0.30760393,0.34547555,0.3208799,-0.48816603,0.34905976,-0.0037832584,0.4964507,-0.31472072,-0.2610808,0.100517504,0.36207613,0.36279467,0.1383032,-0.3525676,0.44057345,0.49283886,0.11555547,-0.108208306,0.10221314,-0.28134614,0.27398387,0.07084196,0.14917633,0.48743334,-0.373443,0.20562114,-0.17847878,-0.3218188,0.009135396,0.015324305,-0.100664146,0.41906035,-0.49063528,-0.4853873,0.30391002,-0.4460195,-0.019106247,-0.25482607,-0.013114906,0.22540848,-0.40225288,-0.20705709,0.09454792,0.17696731,-0.008349611,-0.03830516,0.2584962,-0.111282505,0.3979335,-0.14371552,0.18685423,-0.4820286,0.2939021,0.09120046,-0.34298953,0.30745384,0.024678009,-0.0006958902,0.29168078,0.29009485,-0.17679822,-0.46974197,0.4294979,0.11500405,-0.13610753,0.36865094,-0.013320808,-0.34323275,-0.12667689,0.026727092,-0.3675586,-0.2782531,0.4072612,-0.36316508,0.15129639,0.1858136,-0.36289945,-0.31164548,-0.2040606,0.2779728,-0.12470304,-0.46650866,-0.4026848,-0.10204229,0.39399475,-0.15896502,0.49329826,0.3571312,-0.33936545,0.38525587,-0.12067864,0.43485442,0.124700844,0.104689136,-0.33960688,0.25880843,-0.121705316,0.16243234,0.46132997,0.226046,0.49242708,0.06890366,-0.4417341,0.22353856,0.44347355,0.14277391,0.02746396,-0.27298304,0.30717883,-0.172717,-0.05216693,-0.46765718,0.24312513,-0.26077524,0.4094202,0.1526884,0.24844053,0.14206883,0.26355112,0.15659757,-0.064799435,-0.31527856,-0.31637272,-0.16433223,-0.31943828,-0.16087781,-0.029779293,-0.18423083,-0.46813133,0.23956837,0.2713137,0.09777,0.28109658,-0.23653845,-0.40085232,-0.024181932,-0.051725652,-0.32395408,0.2840256,0.12677753,-0.036829147,-0.12800834,0.4942973,-0.029545685,0.024579588,0.44111192,0.36027226,0.4769208,-0.4533723,0.0050842683,0.03155901,-0.37383702,0.409427,-0.07566347,0.46359769,-0.32008702,-0.0074480684,0.41704312,0.3409971,0.17578898,0.07218806,-0.034769543,0.17794688,-0.30619466,-0.3621429,-0.25144732,-0.20941332,0.08139743,0.46754926,0.07792441,0.20515098,-0.27495787,-0.41891092,-0.011073167,0.19079816,0.3756212,0.18898526,0.06623363,-0.34759742,-0.111291364,0.36521727,0.23747006,-0.043169998,0.2934109,0.17308621,-0.26403663,0.3227459,-0.1302374,-0.41037896,-0.104718156,-0.423129,-0.17456156,0.26069608,-0.23773627,-0.30647978,-0.4410517,-0.28798574,0.19697002,-0.3251959,0.24387845,-0.3270986,-0.041746464,-0.15494834,-0.46028778,0.16968115,-0.04031676,-0.2716547,0.14385009,0.07432748,0.25426856,0.016709732,-0.08530728,0.47511348,-0.07987748,0.13697256,-0.08272582,0.08180307,-0.36587057,-0.13359743,-0.18288562,0.40094712,-0.353092,0.017083604,0.1613082,0.055861,0.15453808,0.21914142,-0.105872534,-0.29715842,-0.024667528,-0.3025321,0.081761196,-0.38466546,0.47290474,0.129479,0.41670337,0.44002005,0.45941508,-0.45644155,0.35690975,0.057827406,0.43738446,-0.13094945,-0.13371828,-0.07445418,0.21243547,0.116639175,-0.049410917,-0.34216294,0.41823423,0.28790632,-0.007892051,0.096942306,0.1396378,-0.13399471,0.07185784,-0.4284194,0.4427249,-0.41093475,0.45790893,-0.20225391,-0.31144112,0.42931154,0.4374679,-0.2622802,-0.28314164,-0.3076883,-0.31686953,-0.095877625,-0.10033896,0.112291455,-0.17148575,0.12806565,0.049480524,0.20940004,0.33888456,-0.33014485,0.1807567,0.46284997,0.30705467,-0.293868,-0.24588823,0.07607571,0.3020784,-0.34116232,0.14823979,0.4917143,0.15080154,-0.3326092,0.4260237,0.100043006,0.39821002,0.04003094,-0.4393557,0.49077487,0.08355981,-0.16276444,0.4737454,0.30550307,0.22827522,0.11399298,-0.18355756,0.48893008,-0.061079074,0.34194964,0.34991613,0.045149118,0.018061642,0.36717674,-0.014896322,-0.39460963,0.18194748,0.41456845,0.2685335,-0.040410947,-0.19826613,0.2744291,-0.08797762,0.43782997,-0.32175502,-0.041796193,0.48666844,0.17217936,-0.1301852,-0.36141133,-0.36521703,-0.24580853,-0.36043307,0.014596792,-0.3487459,-0.2931596,0.49684086,0.03331244,0.39887574,-0.43921074,0.44340146,0.41490194,-0.260845,-0.3607638,-0.12583113,-0.08900924,0.30604246,0.00019985146,-0.31272176,-0.34975827,0.469633,0.036717746,-0.104299635,-0.20803978,0.31311628,0.19662935,0.020018525,-0.05385674,0.22762349,0.39932528,0.01907301,-0.42732292,-0.43949187,0.014642848,0.14312251,-0.04352049,-0.12474732,0.18498062,-0.34423998,-0.0958322,0.035197314,-0.3271816,0.1349155,-0.28507724,-0.43502548,0.30910105,-0.49776664,-0.13543682,0.28616038,0.332723,-0.34795025,-0.49798304,0.067947395,-0.19295934,0.007505484,-0.16391268,-0.36569682,0.15901232,0.46453476,0.3717689,0.3677985,-0.0395944,-0.41707343,-0.07637275,0.04551493,0.4739106,0.103702106,-0.49126226,0.46006757,0.39709607,-0.4932534,-0.11750444,0.28991604,-0.4593011,-0.18340193,-0.21971363,0.10625789,-0.37307355,-0.31886718,0.3046709,0.29895425,-0.1080859,0.29468405,-0.34315073,-0.42983308,-0.14463161,0.3399261,0.03252902,-0.023909485,0.1786236,-0.011154707,0.31585836,-0.06946511,0.26552626,-0.12388023,-0.09202548,-0.3637682,0.13888547,-0.007786828,0.46741107,0.35592782]}
},{}],54:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var NINF = require( '@stdlib/constants/float32/ninf' );
var PINF = require( '@stdlib/constants/float32/pinf' );
var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var copysignf = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof copysignf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a single-precision floating-point number with the magnitude of `x` and the sign of `y`', function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = copysignf( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z;

	z = copysignf( NaN, -1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	z = copysignf( NaN, 1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', function test( t ) {
	var z;

	z = copysignf( -1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	z = copysignf( 1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = copysignf( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysignf( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns a positive number', function test( t ) {
	var z;

	z = copysignf( -1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	z = copysignf( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = copysignf( NINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysignf( NINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns a negative number', function test( t ) {
	var z;

	z = copysignf( -1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	z = copysignf( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports copying a sign from `0`', function test( t ) {
	var x;
	var z;

	x = 3.0;

	z = copysignf( x, 0.0 );
	t.equal( z, 3.0, 'returns +3.0' );

	z = copysignf( x, -0.0 );
	t.equal( z, -3.0, 'returns -3.0' );

	t.end();
});

tape( 'the function supports copying a sign to `0`', function test( t ) {
	var z;

	z = copysignf( -0.0, 1.0 );
	t.equal( isPositiveZerof( z ), true, 'returns +0' );

	z = copysignf( 0.0, -1.0 );
	t.equal( isNegativeZerof( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/copysignf/test/test.js")
},{"./../lib":51,"./fixtures/julia/data.json":53,"@stdlib/constants/float32/ninf":41,"@stdlib/constants/float32/pinf":42,"@stdlib/math/base/assert/is-nanf":45,"@stdlib/math/base/assert/is-negative-zerof":47,"@stdlib/math/base/assert/is-positive-zerof":49,"tape":219}],55:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var NINF = require( '@stdlib/constants/float32/ninf' );
var PINF = require( '@stdlib/constants/float32/pinf' );
var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var copysignf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( copysignf instanceof Error )
};


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof copysignf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a single-precision floating-point number with the magnitude of `x` and the sign of `y`', opts, function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = copysignf( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', opts, function test( t ) {
	var z;

	z = copysignf( NaN, -1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	z = copysignf( NaN, 1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', opts, function test( t ) {
	var z;

	z = copysignf( -1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	z = copysignf( 1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = copysignf( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysignf( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns a positive number', opts, function test( t ) {
	var z;

	z = copysignf( -1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	z = copysignf( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = copysignf( NINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysignf( NINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns a negative number', opts, function test( t ) {
	var z;

	z = copysignf( -1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	z = copysignf( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports copying a sign from `0`', opts, function test( t ) {
	var x;
	var z;

	x = 3.0;

	z = copysignf( x, 0.0 );
	t.equal( z, 3.0, 'returns +3.0' );

	z = copysignf( x, -0.0 );
	t.equal( z, -3.0, 'returns -3.0' );

	t.end();
});

tape( 'the function supports copying a sign to `0`', opts, function test( t ) {
	var z;

	z = copysignf( -0.0, 1.0 );
	t.equal( isPositiveZerof( z ), true, 'returns +0' );

	z = copysignf( 0.0, -1.0 );
	t.equal( isNegativeZerof( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/copysignf/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/copysignf/test")
},{"./fixtures/julia/data.json":53,"@stdlib/constants/float32/ninf":41,"@stdlib/constants/float32/pinf":42,"@stdlib/math/base/assert/is-nanf":45,"@stdlib/math/base/assert/is-negative-zerof":47,"@stdlib/math/base/assert/is-positive-zerof":49,"@stdlib/utils/try-require":105,"path":119,"tape":219}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Create a single-precision floating-point number from an unsigned integer corresponding to an IEEE 754 binary representation.
*
* @module @stdlib/number/float32/base/from-word
*
* @example
* var fromWord = require( '@stdlib/number/float32/base/from-word' );
*
* var word = 1068180177; // => 0 01111111 01010110010001011010001
*
* var f32 = fromWord( word ); // when printed, implicitly promoted to float64
* // returns 1.3370000123977661
*/

// MODULES //

var fromWordf = require( './main.js' );


// EXPORTS //

module.exports = fromWordf;

},{"./main.js":57}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var Float32Array = require( '@stdlib/array/float32' );


// VARIABLES //

var UINT32_VIEW = new Uint32Array( 1 );
var FLOAT32_VIEW = new Float32Array( UINT32_VIEW.buffer );


// MAIN //

/**
* Creates a single-precision floating-point number from an unsigned integer corresponding to an IEEE 754 binary representation.
*
* @param {uinteger32} word - unsigned integer
* @returns {number} single-precision floating-point number
*
* @example
* var word = 1068180177; // => 0 01111111 01010110010001011010001
*
* var f32 = fromWordf( word ); // when printed, implicitly promoted to float64
* // returns 1.3370000123977661
*/
function fromWordf( word ) {
	UINT32_VIEW[ 0 ] = word;
	return FLOAT32_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWordf;

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":4}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return an unsigned 32-bit integer corresponding to the IEEE 754 binary representation of a single-precision floating-point number.
*
* @module @stdlib/number/float32/base/to-word
*
* @example
* var toWordf = require( '@stdlib/number/float32/base/to-word' );
*
* var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var f32 = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*
* var w = toWordf( f32 ); // => 0 01111111 01010110010001011010001
* // returns 1068180177
*/

// MODULES //

var toWordf = require( './main.js' );


// EXPORTS //

module.exports = toWordf;

},{"./main.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1.0 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the IEEE 754 binary representation of a single-precision floating-point number.
*
* @param {number} x - single-precision floating-point number
* @returns {unsigned32} unsigned 32-bit integer
*
* @example
* var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var f32 = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*
* var w = toWordf( f32 ); // => 0 01111111 01010110010001011010001
* // returns 1068180177
*/
function toWordf( x ) {
	FLOAT32_VIEW[ 0 ] = x;
	return UINT32_VIEW[ 0 ];
}


// EXPORTS //

module.exports = toWordf;

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":4}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Convert a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @module @stdlib/number/float64/base/to-float32
*
* @example
* var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/

// MODULES //

var float64ToFloat32 = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

if ( typeof float64ToFloat32 !== 'function' ) {
	float64ToFloat32 = polyfill;
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"./main.js":61,"./polyfill.js":62}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fround = ( typeof Math.fround === 'function' ) ? Math.fround : null; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = fround;

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

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );


// MAIN //

/**
* Converts a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @param {number} x - double-precision floating-point number
* @returns {number} nearest single-precision floating-point number
*
* @example
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/
function float64ToFloat32( x ) {
	FLOAT32_VIEW[ 0 ] = x;
	return FLOAT32_VIEW[ 0 ];
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"@stdlib/array/float32":2}],63:[function(require,module,exports){
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
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
*
* @example
* var reFunctionName = require( '@stdlib/regexp/function-name' );
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var reFunctionName = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reFunctionName, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = reFunctionName;

},{"./main.js":64,"./regexp.js":65,"@stdlib/utils/define-nonenumerable-read-only-property":81}],64:[function(require,module,exports){
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
* Returns a regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @returns {RegExp} regular expression
*
* @example
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/
function reFunctionName() {
	return /^\s*function\s*([^(]*)/i;
}


// EXPORTS //

module.exports = reFunctionName;

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

// MODULES //

var reFunctionName = require( './main.js' );


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = reFunctionName();


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{"./main.js":64}],66:[function(require,module,exports){
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

},{"./is_number.js":69}],67:[function(require,module,exports){
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

},{"./is_number.js":69,"./zero_pad.js":73}],68:[function(require,module,exports){
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

},{"./main.js":71}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"./format_double.js":66,"./format_integer.js":67,"./is_string.js":70,"./space_pad.js":72,"./zero_pad.js":73}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./main.js":75}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./main.js":78}],77:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"dup":70}],78:[function(require,module,exports){
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

},{"./is_string.js":77,"@stdlib/string/base/format-interpolate":68,"@stdlib/string/base/format-tokenize":74}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Determine the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

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

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
* // returns 'Function'
*/
function constructorName( v ) {
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":27,"@stdlib/regexp/function-name":63,"@stdlib/utils/native-class":100}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":86}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"./define_property.js":84}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":83,"./has_define_property_support.js":85,"./polyfill.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":76}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFunction = require( '@stdlib/assert/is-function' );
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":91,"./polyfill.js":92,"@stdlib/assert/is-function":33}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":88}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":89}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":93,"@stdlib/utils/native-class":100}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
}


// EXPORTS //

module.exports = getProto;

},{}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],95:[function(require,module,exports){
(function (global){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

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

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a boolean. Value: `%s`.', codegen ) );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":94,"./global.js":95,"./self.js":98,"./window.js":99,"@stdlib/assert/is-boolean":21,"@stdlib/string/format":76}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

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

'use strict';

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

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

},{"./native_class.js":101,"./polyfill.js":102,"@stdlib/assert/has-tostringtag-support":14}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":103}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":103,"./tostringtag.js":104,"@stdlib/assert/has-own-property":10}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

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
*/

'use strict';

/**
* Wrap `require` in a try/catch block.
*
* @module @stdlib/utils/try-require
*
* @example
* var tryRequire = require( '@stdlib/utils/try-require' );
*
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.log( out.message );
* }
*/

// MODULES //

var tryRequire = require( './try_require.js' );


// EXPORTS //

module.exports = tryRequire;

},{"./try_require.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Wraps `require` in a try/catch block.
*
* @param {string} id - module id
* @returns {*|Error} `module.exports` of the resolved module or an error
*
* @example
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.error( out.message );
* }
*/
function tryRequire( id ) {
	try {
		return require( id ); // eslint-disable-line stdlib/no-dynamic-require
	} catch ( error ) {
		if ( isError( error ) ) {
			return error;
		}
		// Handle case where a literal is thrown...
		if ( typeof error === 'object' ) {
			return new Error( JSON.stringify( error ) );
		}
		return new Error( error.toString() );
	}
}


// EXPORTS //

module.exports = tryRequire;

},{"@stdlib/assert/is-error":29}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||

		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||

		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":108,"./fixtures/re.js":109,"./fixtures/typedarray.js":110}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":96}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":107,"./polyfill.js":112,"./typeof.js":113}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":79}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ```text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":79}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){

},{}],116:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"dup":115}],117:[function(require,module,exports){
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
},{"base64-js":114,"buffer":117,"ieee754":205}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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
},{"_process":211}],120:[function(require,module,exports){
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

},{"events":118,"inherits":206,"readable-stream/lib/_stream_duplex.js":122,"readable-stream/lib/_stream_passthrough.js":123,"readable-stream/lib/_stream_readable.js":124,"readable-stream/lib/_stream_transform.js":125,"readable-stream/lib/_stream_writable.js":126,"readable-stream/lib/internal/streams/end-of-stream.js":130,"readable-stream/lib/internal/streams/pipeline.js":132}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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
},{"./_stream_readable":124,"./_stream_writable":126,"_process":211,"inherits":206}],123:[function(require,module,exports){
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
},{"./_stream_transform":125,"inherits":206}],124:[function(require,module,exports){
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
},{"../errors":121,"./_stream_duplex":122,"./internal/streams/async_iterator":127,"./internal/streams/buffer_list":128,"./internal/streams/destroy":129,"./internal/streams/from":131,"./internal/streams/state":133,"./internal/streams/stream":134,"_process":211,"buffer":117,"events":118,"inherits":206,"string_decoder/":218,"util":115}],125:[function(require,module,exports){
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
},{"../errors":121,"./_stream_duplex":122,"inherits":206}],126:[function(require,module,exports){
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
},{"../errors":121,"./_stream_duplex":122,"./internal/streams/destroy":129,"./internal/streams/state":133,"./internal/streams/stream":134,"_process":211,"buffer":117,"inherits":206,"util-deprecate":227}],127:[function(require,module,exports){
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
},{"./end-of-stream":130,"_process":211}],128:[function(require,module,exports){
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
},{"buffer":117,"util":115}],129:[function(require,module,exports){
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
},{"_process":211}],130:[function(require,module,exports){
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
},{"../../../errors":121}],131:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],132:[function(require,module,exports){
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
},{"../../../errors":121,"./end-of-stream":130}],133:[function(require,module,exports){
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
},{"../../../errors":121}],134:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":118}],135:[function(require,module,exports){
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

},{"./":136,"get-intrinsic":200}],136:[function(require,module,exports){
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

},{"function-bind":199,"get-intrinsic":200}],137:[function(require,module,exports){
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

},{"./lib/is_arguments.js":138,"./lib/keys.js":139}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],140:[function(require,module,exports){
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

},{"has-property-descriptors":201,"object-keys":209}],141:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],142:[function(require,module,exports){
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

},{"./ToNumber":172,"./ToPrimitive":174,"./Type":179}],143:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/isNaN":190,"../helpers/isPrefixOf":191,"./ToNumber":172,"./ToPrimitive":174,"./Type":179,"get-intrinsic":200}],144:[function(require,module,exports){
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

},{"get-intrinsic":200}],145:[function(require,module,exports){
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

},{"./DayWithinYear":148,"./InLeapYear":152,"./MonthFromTime":162,"get-intrinsic":200}],146:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":195,"./floor":183}],147:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":183}],148:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":146,"./DayFromYear":147,"./YearFromTime":181}],149:[function(require,module,exports){
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

},{"./modulo":184}],150:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./Type":179,"get-intrinsic":200}],151:[function(require,module,exports){
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

},{"../helpers/timeConstants":195,"./floor":183,"./modulo":184}],152:[function(require,module,exports){
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

},{"./DaysInYear":149,"./YearFromTime":181,"get-intrinsic":200}],153:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./Type":179,"has":204}],154:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":207}],155:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./Type":179,"has":204}],156:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./Type":179}],157:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":192,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./Type":179}],158:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/timeConstants":195}],159:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"./DateFromTime":145,"./Day":146,"./MonthFromTime":162,"./ToInteger":171,"./YearFromTime":181,"./floor":183,"./modulo":184,"get-intrinsic":200}],160:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/timeConstants":195,"./ToInteger":171}],161:[function(require,module,exports){
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

},{"../helpers/timeConstants":195,"./floor":183,"./modulo":184}],162:[function(require,module,exports){
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

},{"./DayWithinYear":148,"./InLeapYear":152}],163:[function(require,module,exports){
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

},{"../helpers/isNaN":190}],164:[function(require,module,exports){
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

},{"../helpers/timeConstants":195,"./floor":183,"./modulo":184}],165:[function(require,module,exports){
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

},{"./Type":179}],166:[function(require,module,exports){
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


},{"../helpers/isFinite":188,"./ToNumber":172,"./abs":182,"get-intrinsic":200}],167:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":195,"./DayFromYear":147}],168:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":195,"./modulo":184}],169:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],170:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":172}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/isNaN":190,"../helpers/sign":194,"./ToNumber":172,"./abs":182,"./floor":183}],172:[function(require,module,exports){
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

},{"./ToPrimitive":174}],173:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":144,"get-intrinsic":200}],174:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":196}],175:[function(require,module,exports){
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

},{"./IsCallable":154,"./ToBoolean":169,"./Type":179,"get-intrinsic":200,"has":204}],176:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":200}],177:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/isNaN":190,"../helpers/sign":194,"./ToNumber":172,"./abs":182,"./floor":183,"./modulo":184}],178:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":172}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":146,"./modulo":184}],181:[function(require,module,exports){
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

},{"call-bind/callBound":135,"get-intrinsic":200}],182:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":200}],183:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],184:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":193}],185:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":195,"./modulo":184}],186:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":142,"./5/AbstractRelationalComparison":143,"./5/CheckObjectCoercible":144,"./5/DateFromTime":145,"./5/Day":146,"./5/DayFromYear":147,"./5/DayWithinYear":148,"./5/DaysInYear":149,"./5/FromPropertyDescriptor":150,"./5/HourFromTime":151,"./5/InLeapYear":152,"./5/IsAccessorDescriptor":153,"./5/IsCallable":154,"./5/IsDataDescriptor":155,"./5/IsGenericDescriptor":156,"./5/IsPropertyDescriptor":157,"./5/MakeDate":158,"./5/MakeDay":159,"./5/MakeTime":160,"./5/MinFromTime":161,"./5/MonthFromTime":162,"./5/SameValue":163,"./5/SecFromTime":164,"./5/StrictEqualityComparison":165,"./5/TimeClip":166,"./5/TimeFromYear":167,"./5/TimeWithinDay":168,"./5/ToBoolean":169,"./5/ToInt32":170,"./5/ToInteger":171,"./5/ToNumber":172,"./5/ToObject":173,"./5/ToPrimitive":174,"./5/ToPropertyDescriptor":175,"./5/ToString":176,"./5/ToUint16":177,"./5/ToUint32":178,"./5/Type":179,"./5/WeekDay":180,"./5/YearFromTime":181,"./5/abs":182,"./5/floor":183,"./5/modulo":184,"./5/msFromTime":185}],187:[function(require,module,exports){
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

},{"./isMatchRecord":189,"get-intrinsic":200,"has":204}],188:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],189:[function(require,module,exports){
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

},{"has":204}],190:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],191:[function(require,module,exports){
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

},{"call-bind/callBound":135}],192:[function(require,module,exports){
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

},{"get-intrinsic":200,"has":204}],193:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],194:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{"./helpers/isPrimitive":197,"is-callable":207}],197:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":198}],200:[function(require,module,exports){
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

},{"function-bind":199,"has":204,"has-symbols":202}],201:[function(require,module,exports){
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

},{"get-intrinsic":200}],202:[function(require,module,exports){
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

},{"./shams":203}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":199}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
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

},{"./isArguments":210}],209:[function(require,module,exports){
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

},{"./implementation":208,"./isArguments":210}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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
},{"_process":211,"through":225,"timers":226}],213:[function(require,module,exports){
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

},{"buffer":117}],214:[function(require,module,exports){
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

},{"es-abstract/es5":186,"function-bind":199}],215:[function(require,module,exports){
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

},{"./implementation":214,"./polyfill":216,"./shim":217,"define-properties":140,"function-bind":199}],216:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":214}],217:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":216,"define-properties":140}],218:[function(require,module,exports){
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
},{"safe-buffer":213}],219:[function(require,module,exports){
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
},{"./lib/default_stream":220,"./lib/results":222,"./lib/test":223,"_process":211,"defined":141,"through":225,"timers":226}],220:[function(require,module,exports){
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
},{"_process":211,"fs":116,"through":225}],221:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":211,"timers":226}],222:[function(require,module,exports){
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
},{"_process":211,"events":118,"function-bind":199,"has":204,"inherits":206,"object-inspect":224,"resumer":212,"through":225,"timers":226}],223:[function(require,module,exports){
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
},{"./next_tick":221,"deep-equal":137,"defined":141,"events":118,"has":204,"inherits":206,"path":119,"string.prototype.trim":215}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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
},{"_process":211,"stream":120}],226:[function(require,module,exports){
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
},{"process/browser.js":211,"timers":226}],227:[function(require,module,exports){
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
},{}]},{},[54,55]);
