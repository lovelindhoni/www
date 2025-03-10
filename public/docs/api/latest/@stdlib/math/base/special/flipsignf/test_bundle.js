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
* Return a single-precision floating-point number with the magnitude of `x` and the sign of `x*y`.
*
* @module @stdlib/math/base/special/flipsignf
*
* @example
* var flipsignf = require( '@stdlib/math/base/special/flipsignf' );
*
* var z = flipsignf( -3.0, 10.0 );
* // returns -3.0
*
* z = flipsignf( -3.0, -1.0 );
* // returns 3.0
*
* z = flipsignf( 1.0, -0.0 );
* // returns -1.0
*
* z = flipsignf( -3.0, -0.0 );
* // returns 3.0
*
* z = flipsignf( -0.0, 1.0 );
* // returns -0.0
*
* z = flipsignf( 0.0, -1.0 );
* // returns -0.0
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


// MAIN //

/**
* Returns a single-precision floating-point number with the magnitude of `x` and the sign of `x*y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a single-precision floating-point number
*
* @example
* var z = flipsignf( -3.0, 10.0 );
* // returns -3.0
*
* @example
* var z = flipsignf( -3.0, -1.0 );
* // returns 3.0
*
* @example
* var z = flipsignf( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = flipsignf( -3.0, -0.0 );
* // returns 3.0
*
* @example
* var z = flipsignf( -0.0, 1.0 );
* // returns -0.0
*
* @example
* var z = flipsignf( 0.0, -1.0 );
* // returns -0.0
*/
function flipsignf( x, y ) {
	var wx;
	var wy;

	x = float64ToFloat32( x );
	y = float64ToFloat32( y );

	// Convert `x` and `y` to unsigned integers:
	wx = toWord( x );
	wy = toWord( y );

	// Leave only the sign bit of `y` turned on (if on):
	wy &= SIGN_MASK;

	// Flip the sign bit of `x` only when the sign bit of `y` is on:
	wx ^= wy; // 1^1=0 (flipped), 0^1=1 (flipped), 1^0=1 (unchanged), 0^0=0 (unchanged)

	// Return a new value having the same magnitude as `x`, but with the sign of `x*y`:
	return fromWord( wx );
}


// EXPORTS //

module.exports = flipsignf;

},{"@stdlib/number/float32/base/from-word":56,"@stdlib/number/float32/base/to-word":58,"@stdlib/number/float64/base/to-float32":60}],53:[function(require,module,exports){
module.exports={"expected":[0.16179752349853516,0.35643133521080017,0.148187518119812,-0.07873617112636566,0.24858537316322327,0.12760591506958008,-0.38228747248649597,0.09506531059741974,-0.33313170075416565,-0.03456626087427139,-0.20235823094844818,0.42022180557250977,-0.12445783615112305,0.15918101370334625,0.1901341825723648,0.3091031312942505,-0.2109939306974411,0.2361181229352951,0.29714858531951904,-0.6267533302307129,-0.2976101338863373,-0.14880961179733276,-0.0656394362449646,-0.5686396360397339,-0.3678670823574066,-0.5679317116737366,-0.46927785873413086,0.3476855456829071,0.40874138474464417,-0.2955717444419861,0.6359983086585999,0.48393502831459045,0.3107435405254364,-0.8337380886077881,0.668025553226471,-0.3125618100166321,0.867922842502594,0.5737491250038147,-0.6782562732696533,-0.7819615006446838,0.6598969101905823,-0.46001705527305603,1.0187931060791016,-0.044356588274240494,0.29139575362205505,-0.10276508331298828,1.0536777973175049,1.076917052268982,-0.9245086908340454,-0.19748623669147491,-0.2526494264602661,-1.2082160711288452,0.36444127559661865,-0.10402578115463257,-0.3498198986053467,0.1579834222793579,-1.200698733329773,-1.0426381826400757,1.1060057878494263,1.3142189979553223,-1.0281904935836792,-0.3303810954093933,1.0542043447494507,-0.7862500548362732,-0.392521470785141,-0.9308026432991028,0.6213763356208801,-0.8012648820877075,1.099418044090271,-0.8298394083976746,0.8663318753242493,0.11446085572242737,-0.965995728969574,-0.34227049350738525,0.2651160657405853,0.45417243242263794,0.8631370067596436,1.4318586587905884,1.6171481609344482,1.7687426805496216,-0.7974947094917297,-0.1325525939464569,-0.2923648953437805,1.3173558712005615,-0.7223547101020813,-0.016599679365754128,-0.8888141512870789,1.608124852180481,1.682254672050476,-1.4994298219680786,2.0502991676330566,-1.0432201623916626,0.3487679958343506,-0.7899524569511414,2.2355072498321533,1.2767729759216309,2.1908037662506104,-0.7768122553825378,2.362992286682129,0.23676668107509613,0.4451678395271301,-0.04157010093331337,-2.024061679840088,-1.2050470113754272,1.6064327955245972,-1.2507606744766235,0.16653697192668915,2.687985897064209,-2.4181385040283203,-2.5159451961517334,-1.4299246072769165,-3.2557666301727295,-0.18423841893672943,1.078950047492981,1.241781234741211,-1.8412621021270752,-1.2070459127426147,-0.2940637469291687,0.4422791600227356,-0.006209576036781073,-2.3119077682495117,-2.05556058883667,3.6899759769439697,-0.2651510536670685,1.0343049764633179,-0.7407417297363281,-0.852225124835968,1.2458486557006836,-1.8742554187774658,2.9127368927001953,1.4577115774154663,-0.37088051438331604,-0.16702254116535187,4.3123459815979,-3.5647945404052734,4.204099178314209,-5.136241912841797,-5.074391841888428,-0.689373254776001,3.192056655883789,-1.2817076444625854,3.240809917449951,-0.11201230436563492,-6.095127582550049,-3.5303561687469482,4.0063629150390625,-3.0925955772399902,-0.4102917015552521,2.142622232437134,0.5478556752204895,-1.8352546691894531,-2.132378339767456,-3.1983301639556885,4.667224407196045,5.461503505706787,5.592278957366943,-3.309305429458618,-3.990100145339966,-3.3547372817993164,-0.4873366951942444,-0.20530952513217926,-6.2305450439453125,-2.0338706970214844,4.8704938888549805,-7.429155349731445,6.992901802062988,-7.103273868560791,-3.645479202270508,1.6783993244171143,5.41555118560791,3.8016839027404785,-7.496221542358398,5.677573204040527,-6.666072368621826,1.053745150566101,-9.231130599975586,-8.49032211303711,-7.147806644439697,9.264310836791992,-11.152483940124512,-7.493948459625244,3.377756118774414,-9.386359214782715,8.11794376373291,-6.642657279968262,5.533156871795654,6.813206672668457,12.28791332244873,13.289458274841309,4.553596496582031,-3.2192013263702393,0.9109198451042175,8.122292518615723,-8.98349380493164,-1.0237349271774292,9.197864532470703,13.039495468139648,10.081032752990723,12.53249740600586,-11.511326789855957,-0.3337952494621277,-9.583900451660156,2.6157491207122803,4.292358875274658,0.3115488886833191,17.511463165283203,15.608548164367676,11.754182815551758,-9.971382141113281,4.520063400268555,8.853095054626465,-14.9509916305542,-8.336721420288086,17.335451126098633,-12.349981307983398,-14.799893379211426,15.1714448928833,-13.057123184204102,-4.087097644805908,8.339642524719238,14.555302619934082,-16.22025489807129,-20.6251277923584,-10.843497276306152,-18.743698120117188,-15.154315948486328,-16.583030700683594,18.839736938476562,26.732139587402344,0.413401335477829,12.408072471618652,9.900320053100586,-10.836772918701172,4.92994499206543,11.648024559020996,-24.259952545166016,-23.03777313232422,-16.56763458251953,27.484777450561523,-16.125696182250977,-1.8222078084945679,-13.03527545928955,-14.999290466308594,7.339444160461426,12.026505470275879,17.74711799621582,-13.491937637329102,-34.79182815551758,-29.324851989746094,-17.90614128112793,22.93793296813965,25.029560089111328,39.21253204345703,39.61386489868164,-19.23404312133789,-15.651294708251953,28.618736267089844,7.69203519821167,18.599647521972656,2.0848960876464844,32.68960189819336,-17.360855102539062,-39.52024459838867,2.3126723766326904,11.180535316467285,-2.451876640319824,11.695775985717773,-2.47515869140625,-9.421119689941406,46.56699752807617,11.516924858093262,21.173866271972656,28.822860717773438,0.594097375869751,30.219974517822266,-6.588607311248779,23.05694580078125,16.891441345214844,-4.998416900634766,-10.433500289916992,-19.624370574951172,35.73125457763672,-17.535755157470703,-29.106048583984375,-27.741355895996094,-60.96916961669922,68.66194915771484,42.32199478149414,-49.276851654052734,37.64820861816406,-30.12366485595703,-58.50269317626953,20.720155715942383,46.62308120727539,5.571222305297852,3.089306592941284,43.084407806396484,-70.35745239257812,53.735836029052734,53.56627655029297,-29.011106491088867,-39.157554626464844,0.9317222237586975,50.86892318725586,-60.28681182861328,94.2350082397461,7.9137864112854,11.703559875488281,-72.70790100097656,-34.026695251464844,-112.7799072265625,20.24228858947754,10.999913215637207,-56.47443771362305,-91.7822265625,114.34927368164062,118.3844223022461,-22.06523895263672,-85.3391342163086,-65.04411315917969,-11.968923568725586,-105.92724609375,6.374486446380615,98.03462982177734,1.2926404476165771,-17.06757926940918,132.83790588378906,142.53073120117188,98.37889862060547,-129.20785522460938,-61.25520706176758,33.56178283691406,164.63739013671875,-25.79514503479004,-23.660903930664062,62.3276252746582,68.3080062866211,-50.27395248413086,97.84109497070312,57.006839752197266,-92.39221954345703,-61.236419677734375,-196.30857849121094,164.85292053222656,-97.16011047363281,109.90614318847656,-186.37538146972656,-22.403583526611328,55.55733108520508,-86.09687805175781,-85.26061248779297,-195.14476013183594,90.23789978027344,29.463457107543945,-229.58648681640625,-169.71022033691406,32.74147033691406,-184.97305297851562,37.362979888916016,95.72233581542969,-221.4158477783203,82.09770965576172,62.026248931884766,-132.3034210205078,12.9501314163208,39.63521957397461,-143.54287719726562,-217.060302734375,-109.40758514404297,-194.97152709960938,-312.0654296875,247.07501220703125,-249.44676208496094,268.4319152832031,-122.27069854736328,209.71287536621094,264.437744140625,333.19818115234375,363.8157653808594,-195.6219940185547,377.9454345703125,-202.08773803710938,391.99627685546875,336.5646667480469,271.7935485839844,-410.1396179199219,-180.94090270996094,-55.949214935302734,287.4501953125,-15.454557418823242,257.12359619140625,-445.2697448730469,453.3943176269531,117.22855377197266,295.1828308105469,-166.40248107910156,-33.14741516113281,-378.8907165527344,286.2635192871094,108.55438232421875,-288.030517578125,-415.8954162597656,57.25416564941406,175.9337615966797,36.99058532714844,-347.1170959472656,-31.088397979736328,-544.2138671875,-604.4913940429688,-137.85740661621094,-205.14833068847656,-392.7277526855469,90.5765151977539,171.28712463378906,-645.0106811523438,-710.992919921875,-356.734619140625,639.4964599609375,-331.24993896484375,623.3355712890625,104.68765258789062,-670.2560424804688,797.2661743164062,547.416015625,-352.1692199707031,294.76470947265625,-100.71076965332031,606.0488891601562,-332.66949462890625,-731.636962890625,427.13970947265625,-447.825927734375,176.00460815429688,-518.8678588867188,-29.83962059020996,-66.78697967529297,-847.6766357421875,-70.45343017578125,507.4864501953125,-279.93695068359375,1096.4979248046875,831.0347290039062,-1031.8433837890625,786.2737426757812,-259.7406311035156,-13.833113670349121,-75.19485473632812,-860.8505859375,166.18865966796875,345.3019104003906,-461.3868408203125,-668.4715576171875,-940.7340698242188,785.7249145507812,-756.0001220703125,-938.43408203125,-344.509521484375,-657.0450439453125,-332.5583801269531,83.21957397460938,-19.72966766357422,-30.043127059936523,-534.8123779296875,836.0628662109375,1003.0782470703125,-1633.341064453125,-23.209566116333008,1363.3709716796875,-1129.3463134765625,-245.77685546875,755.3812255859375,831.5110473632812,1010.9940795898438,-1010.9793090820312,457.10064697265625,-599.9287719726562,-1545.3822021484375,138.2865753173828,2069.854736328125,1448.404296875,1735.11669921875,-1115.948486328125,-1347.2515869140625,1020.484375,-1551.54345703125,2179.03125,2051.193115234375,-1728.296875,-226.735595703125,-374.78167724609375,159.13223266601562,2103.326904296875,-1059.4864501953125,1720.02294921875,1259.8399658203125,-2001.4461669921875,-2236.9384765625,-1690.0162353515625,2516.220947265625,-2787.5419921875,684.39794921875,-1831.5733642578125,3172.366943359375,3244.5673828125,2280.91552734375,2180.4814453125,3300.28466796875,-3386.2509765625,3018.15283203125,-2952.466552734375,-247.63302612304688,-425.46014404296875,-2579.60009765625,-2142.0478515625,2807.69140625,-259.7676086425781,1548.5218505859375,2483.716064453125,657.724609375,1295.8834228515625,-3302.128662109375,-4541.8427734375,2245.20556640625,943.278076171875,-3420.447265625,4876.48583984375,682.3865356445312,1263.4093017578125,-1171.392822265625,2185.497802734375,4483.96875,5293.48046875,2095.43310546875,4220.451171875,-2434.998779296875,-5389.96337890625,-13.471128463745117,1268.7275390625,-1031.8775634765625,3325.109619140625,2104.74853515625,324.84881591796875,4541.140625,-4867.03076171875,2767.52978515625,3983.389892578125,286.83251953125,-6131.8837890625,728.5286865234375,5390.08251953125,4614.6044921875,-2953.263427734375,-725.4569091796875,4678.15673828125,22.368247985839844,-2046.3946533203125,1275.58740234375,-2732.381591796875,-7711.6708984375,-2167.545166015625,-1800.35302734375,-1630.375,-8262.048828125,2577.781494140625,5111.76318359375,-2362.884033203125,-4312.57763671875,-6835.501953125,-1131.3582763671875,9283.37109375,-4547.771484375,-3587.40869140625,-8009.2568359375,-5747.0732421875,-8286.2822265625,-9908.7890625,2862.650390625,714.8557739257812,-10530.697265625,-9324.705078125,-5229.18212890625,3367.092041015625,11562.9248046875,-4898.705078125,12682.02734375,5656.27294921875,-4893.06591796875,4812.82080078125,2037.1715087890625,468.91217041015625,-8038.3935546875,13894.490234375,-13067.517578125,13447.7138671875,-13726.8701171875,15675.7578125,-5518.57666015625,-12125.1748046875,6693.2412109375,-2381.072265625,6808.64013671875,9952.716796875,-8304.240234375,11817.6806640625,13081.583984375,252.3960723876953,19488.658203125,12331.6181640625,1852.4149169921875,-17199.318359375,7942.9853515625,-11106.962890625,-1514.3857421875,-16104.8154296875,-10003.5205078125,-4610.72802734375,23927.57421875,858.997314453125,22403.703125,21681.46875,9466.4375,22685.94921875,-6135.20703125,-8421.708984375,24935.947265625,27291.80859375,-22929.220703125,-27347.419921875,-24766.63671875,-27158.3828125,811.68212890625,55.59425354003906,-16970.984375,-26201.25390625,20806.24609375,-32454.51953125,-21013.98046875,-7658.2626953125,26082.501953125,8995.1650390625,18721.279296875,10439.0830078125,-20241.328125,-11057.0810546875,12607.25390625,-38315.65625,30271.037109375,16101.7705078125,9642.6240234375,-27290.353515625,-43479.234375,-16966.404296875,29865.037109375,-9032.6826171875,19427.62890625,17245.1796875,2224.338134765625,35958.8203125,41196.8359375,-20743.185546875,-20286.642578125,-33130.83984375,23460.990234375,54136.88671875,12424.0419921875,-19003.2109375,26049.7109375,-34968.46484375,18114.15625,6519.5927734375,-36756.8046875,-43095.21484375,-41816.0703125,22106.392578125,-34952.515625,9825.44921875,-49677.78125,54033.16796875,45134.79296875,-30934.486328125,8920.669921875,-55538.56640625,48141.5390625,-24129.59765625,-41546.5546875,52027.0234375,74114.90625,-68962.8671875,73544.7734375,56788.32421875,-47322.01953125,82124.53125,54843.4453125,15481.26171875,928.3264770507812,88020.234375,36448.3125,-8048.962890625,28904.005859375,-64393.171875,70427.734375,30780.119140625,-27980.359375,-100942.71875,76025.734375,-95616.203125,-39941.9609375,87132.53125,93592.59375,-45701.37109375,-51513.39453125,87894.40625,38259.0390625,6966.72900390625,101443.4765625,120022.0703125,91228.1953125,-72369.578125,-80582.890625,-122696.671875,95609.3984375,56791.609375,-49551.50390625,-88919.1796875,-80388.5,-31580.697265625,48947.0625,93502.6875,75521.359375,-21145.716796875,15803.2001953125,179386.890625,64641.91015625,160901.046875,-138574.4375,17854.322265625,158329.15625,-116327.8203125,-3548.386474609375,-178981.484375,115048.3671875,-87326.0390625,-74277.0234375,138729.484375,134263.828125,193844.65625,170433.796875,25999.865234375,-39168.4375,-64321.171875,-114319.359375,-146480.015625,240536.875,78764.0390625,242017.875,-155551.46875,-113416.546875,-260747.28125,-141187.359375,58831.88671875,10255.814453125,-101782.7109375,271656.53125,276752.40625,-116331.703125,-134301.5,-69351.1328125,154526.578125,174506.484375,13001.3359375,80605.375,-214179.859375,-200576.5625,300156.0,-30907.826171875,-343261.21875,-45658.37890625,141718.296875,-189866.484375,-273490.34375,173390.078125,-423788.3125,-390510.65625,193692.625,150182.578125,-355668.75,-275257.84375,-204603.453125,-315092.25,-67292.515625,-449028.5625,475460.5625,406961.0,440392.875,18352.12890625,388977.15625,530874.0,-434251.46875,-356952.8125,163337.515625,-173650.8125,278801.90625,-307909.71875,194257.75,101976.640625,411556.0,272561.59375,151299.359375,-526053.5625,-6997.416015625,-266895.03125,-636022.125,-390340.96875,213988.5,206719.875,418323.75,-265788.375,241779.890625,102272.640625,202914.578125,34607.48828125,-661732.375,127796.4765625,-898223.4375,325706.75,-160663.328125,-513237.65625,710128.5,813528.75,-442069.40625,184845.328125,424376.0625,-1.0361955625e6,-216726.375,810015.0625,-81171.4921875,49783.08984375,956067.9375,-53319.93359375,1.11746625e6,-1.185251125e6,15119.35546875,57945.42578125,-40707.9375,1.295838625e6,1.0333735625e6,10194.40234375,368873.28125,577455.0625,595161.625,-218882.265625,-1.057265375e6,-621363.1875,-1.0178593125e6,-1.478368e6,-1.563894625e6,-1.176531625e6,198154.90625,-1.0073200625e6,-1.475260875e6,1.609758875e6,512976.3125,-1.47668575e6,1.362214875e6,-49867.69140625,-1.727622125e6,-1.60971075e6,886409.0,-680976.1875,-812955.375,-949375.3125,568390.25,-523921.96875,-1.134483125e6,1.862777375e6,-197538.265625,-778724.625,-2.15612925e6,-2.012619625e6,2.366395e6,2.183463e6,-529086.6875,143227.5625,-417220.125,1.248925125e6,1.76474375e6,340128.53125,-1.595204375e6,-691712.25,-1.304665375e6,2.89101e6,2.2316065e6,1.801204e6,-265969.15625,1.32414225e6,1.456649375e6,-235982.671875,-499606.125,-2.1557225e6,2.12451e6,2.57849275e6,572549.625,-10838.4580078125,393009.96875,1.997282625e6,1.1684845e6,3.24262075e6,-2.5763535e6,-3.46692325e6,-1.842885375e6,1.381740375e6,-3.15209625e6,-4.11569875e6,-1.115358375e6,-3.62393925e6,-585720.5,1.323472625e6,-2.2762625e6,4.6795105e6,3.8670355e6,-4.5897565e6,-3.5047505e6,-3.82839425e6,-1.054583375e6,-3.7948025e6,-5.207976e6,-4.4438915e6,1.6033705e6,-1.163565375e6,3.971708e6,5.518783e6,-957213.6875,-2.194634e6,1.091234e6,3.576854e6,-2.6208725e6,-917204.5,4.165551e6,5.5861795e6,2.720419e6,-3.3739595e6,-2.52101325e6,-404096.84375,638828.125,3.18695725e6,5.8379005e6,4.0810785e6,1.721206e6,6.635847e6,-5.8311065e6,-4.08634125e6,-543935.375,-2.3564115e6,-6.41265e6,2.14154675e6,-7.102744e6,5.6297995e6,-1.999821625e6,8.1036575e6,4.9848425e6,543758.1875,-2.041290875e6,3.3782465e6,1.06520025e6,5.0354405e6,-2.76095625e6,1.0640421e7,-6.717726e6,-2.014743375e6,-1.1068244e7,-1.0070151e7,1.076283e7,4.9681105e6,8.1170865e6,-1.2305437e7,-2.31687375e6,4.312491e6,1.1488151e7,-2.4945335e6,4.5894945e6,-1.290521e7,-5.225487e6,-6.4589655e6,1.1080257e7,5.1463405e6,-1.01609175e6,-2.63583375e6,-401377.9375,7.020719e6,-1.6011479e7,9.140915e6,1.0830408e7,-1.5566582e7,-1.2669125e7,-4.10878525e6,-7.482704e6,-1.6339529e7,-9.545278e6,6.460817e6,-3.239371e6,1.1503377e7,612778.3125,-2.53570425e6,-1.9802538e7,8.234353e6,-1.9015028e7,2.7854555e6,-9.494398e6,-3.760431e6,573969.25,-1.8545668e7,-4.270651e6,-641996.375,2.3369234e7,-1.7662332e7,-1.31993475e6,-1.4017649e7,394033.25,9.731749e6,-2.7484012e7,-2.4802012e7,1.6293711e7,-733562.6875,-1.925968125e6,76969.3984375,1.0918796e7,2.61275975e6,1.6175091e7,2.0116968e7,1.064239375e6,-2.3738396e7,9.877692e6,-8.3148585e6,-2.3781168e7,-2.3083392e7,9.014563e6,-1.7407276e7,3.6450675e6,-8.476177e6,3.1901742e7,3.014492e7,-2.0724802e7,2.2935358e7,2.2019546e7,3.3932552e7,-2.6233938e7,-1.0665492e7,-1.6637925e7,1.0940879e7,1.1095663e7,-3.7693725e6,2.259723e7,1.5710582e7,1.5815967e7,-5.4071955e6,-9.625777e6,4.9184748e7,-1.6603339e7,3.271294e7,-1.4882322e7,6.640677e6,4.857128e7,4.6810164e7,1.4403165e7,3.978094e7,-5.688858e7,3.083245e7,-5.8711972e7,-2.2309805e6,-6.1708848e7,5.5757468e7,5.9706432e7,-6.2819788e7,7.0379856e7,5.6901816e7,4.3207164e7,6.1967084e7,-4.2014108e7,4.928934e7,-1.3134689e7,-5.136802e7,4.2015405e6,6.9511896e7,8.0404936e7,-3.2367848e7,4.1287204e7,-2.7295688e7,8.7484488e7,7.0993448e7,-1.3226354e7,-8.6473344e7,7.2426672e7,-4.1923732e7,1.0425736e7,8.8013464e7,5.06008e7,7.2083168e7,-3.5014016e7,2.271173e7,8.827424e7,-7.3227512e7,-8.4605864e7,3.2202464e7,4.9786804e7,1.19598168e8,-7.339072e7,-7.7419032e7,-3.2238776e7,7.3480176e7,-5.0621925e6,-7.2065736e7,9.893092e7,-2.7907062e7,-9.592043e6,3.6277672e7,1.21520176e8,-3.303216e7,7.2756912e7,1.2828764e7,-1.1630092e7,-9.4482712e7,-9.0677328e7,-1.52223744e8,-5.9994e7,1.53628864e8,-1.40334448e8,-1.6187144e8,-1.297122e8,2.036648125e6,-4.0640812e7,-2.4052706e7,-4.2369152e7,5.0563868e7,9.2623936e7,3.2682208e7,-9.0267648e7,-5.8612604e7,-5.9149128e7,-9.354564e7,4.326944e7,-2.015556e8,1.44933712e8,-2.3282264e8,2.11354064e8,2.07780336e8,8.716512e7,1.053634e8,-5.8305392e7,1.10597792e8,2.5165128e7,2.42609616e8,-1.74334528e8,-2.47234048e8,1.0026452e8,-2.3334888e8,9.5801568e7,1.80679808e8,-1.40304528e8,-2.53461376e8,2.28567424e8,2.4992288e8,2.09821952e8,-3.0104848e8,1.11043496e8,-1.674341e6,4.447422e6,2.17306528e8,2.49516896e8,-1.41933008e8,1.43266944e8,-1.64732832e8,3.4409704e7,-9.3648e7,-3.244754e7,-1.958488e8,-3.1781056e8,-1.43847296e8,2.18834096e8,1.85231488e8,3.45234496e8,-4.5649744e8,-2.72078592e8,1.03801696e8,-2.87718272e8,4.70079072e8,-3.1910816e8,2.0393824e7,-3.5564452e7,4.23616224e8,-2.8912816e8,3.99455968e8,-3.94224416e8,-5.61310272e8,1.92492736e8,-3.9436908e7,2.50921264e8,5.47265472e8,2.42189425e6,-3.60856544e8,-6.35145216e8,-3.26464e8,3.6055952e8,6.58842176e8,1.39747312e8,-3.79134912e8,3.1842048e8,5.7011424e8,-1.9357712e8,1.40551392e8,-5.10863296e8,-3.53967136e8,-7.68083392e8,1.627688e8,-3.86303424e8,-4.26005376e8,2.33036e8,3.695052e7,-4.16030144e8,-8.1924736e8,6.07983744e8,-3.70671648e8,8.47381632e8,8.9599552e8,-9.8110784e8,-8.00002048e8,-4.36779872e8,-3.98983488e8,-6.29958336e8,-9.43061632e8,-5.82590592e8,-2.45379296e8,8.67897536e8,-1.040524096e9,-6.77199936e8,3.27638976e8,-2.98203456e8,4.47958176e8,-3.20456288e8,1.235649152e9,-2.35865008e8,8.3629312e8,-9.88570176e8,1.363283712e9,9.14409024e8,9.026528e8,-3.09720032e8,5.45769024e8,-1.475646848e9,-6.30309376e8,9.42996992e8,1.434346624e9,1.170275072e9,-8.15850368e8,-3.49577856e8,-5.70486272e8,4.24313248e8,1.52185408e9,4.95453792e8,1.612873088e9,2.69063968e8,9.41521408e8,-8.0421672e7,1.464104576e9,-8.9123936e8,-1.187348608e9,1.945900672e9,-1.88179968e9,1.157975168e9,-9.57585728e8,-1.59989376e9,2.001383168e9,-1.025032128e9,-6.58199616e8,-2.16052992e9,-7.30296064e8,-2.11351856e8,-2.41714944e9,-7.85443072e8,9.08295808e8,1.50929856e9,3.46650976e8,-1.60061184e9,-1.33491008e9,2.82623296e8,-2.84476928e9,9.0843456e8,-1.562693888e9,-1.343411968e9,2.653843968e9,-2.991158016e9,-2.305543424e9,2.255124e8,-1.709545216e9,1.480540032e9,1.423881344e9,2.73690784e8,2.223809792e9,-3.073446656e9,2.820246528e9,-2.40773376e9,-2.30443264e9,-3.716046848e9,5.03915104e8,-2.041122304e9,-4.012465664e9,1.68960576e9,8.4059424e8,-2.640400128e9,2.261524224e9,-3.93812096e9,2.232694272e9,-3.064695296e9,4.118098432e9,-4.259981312e9,4.162405376e9,-8.06601856e8,-4.092276992e9,6.86401088e8,-3.925080832e9,5.240333824e9,4.902115328e9,8.486576e8,6.0974784e8,3.084201728e9,-4.689391616e9,3.020741376e9,-9.8880576e8,-3.07236832e8,8.2552896e8,2.9905408e9,-1.119291776e9,5.020727808e9,9.2690496e8,-4.954039296e9,-1.22222656e9,-3.721169664e9,6.02461056e8,-6.698969088e9,-1.046264576e9,5.198878208e9,7.360425984e9,-4.742899712e9,-7.330916352e9,2.165951232e9,2.208134144e9,-3.303987968e9,8.40887808e9,6.513632256e9,-5.06177376e8,-5.886154752e9,3.409221376e9,-2.863025152e9,5.413865472e9,2.899278336e9,6.49796096e9,3.347267584e9,-7.986688e9,8.866510848e9,-1.11095296e9,2.30383232e9,-5.009843712e9,-1.44163264e9,-7.079788544e9,6.902111232e9,5.34424064e9,3.67533184e9,5.235515904e9,-6.489613824e9,-9.463896064e9,1.0553009152e10,-9.403872256e9,-7.403843584e9,-1.0856620032e10,6.8286208e9,-1.233168768e9,-6.712910848e9,4.773246464e9,-3.46062208e9,1.0307789824e10,-1.2387417088e10,-7.7545792e8,6.927640064e9,-1.278494208e10,-1.1466131456e10,2.302035456e9,-1.479903744e10,-1.0684546048e10,-2.681297152e9,1.3626658816e10,-1.16590912e9,2.40102608e8,7.130286592e9,8.344553984e9,1.2752269312e10,1.4182129664e10,-1.645444608e10,-6.123933696e9,1.5053509632e10,5.686625792e9,4.165722112e9,-1.846125568e10,-7.036710912e9,-6.100256768e9,-1.7229791232e10,4.91438336e9,-3.88569088e9,8.840942592e9,-2.0399941632e10,-1.6647150592e10,8.738765824e9,-2.5206591488e10,-5.927110144e9,-2.2974089216e10,-2.6333206528e10,1.8317662208e10,-7.357477376e9,9.8629376e9,-1.8791469056e10,1.5562105856e10,2.4812322816e10,-2.1421983744e10,1.769428992e9,2.6858405888e10,-1.4108291072e10,-5.909110272e9,7.143456768e9,2.66472448e9,9.74665152e8,-2.4031819776e10,9.472319488e9,-3.0854742016e10,-2.622906368e10,9.4022144e9,2.6220371968e10,3.3183715328e10,5.281241088e9,2.8914352128e10,2.2777423872e10,-1.8417848e8,3.3906839552e10,-3.6903047168e10,-1.4812663808e10,4.1030270976e10,1.8210338816e10,-4.2581905408e10,5.854352384e9,2.4236691456e10,-2.8562470912e10,3.424709632e10,3.0829062144e10,6.615405056e9,4.4854808576e10,4.3614789632e10,-5.4378242048e10,-2.847222016e9,-3.3305495552e10,-4.797675008e9,9.994749952e9,-2.0242055168e10,3.920912384e10,2.5260576768e10,5.3289648128e10,5.0097713152e10,4.0848556032e10,-4.00861184e9,-1.7861920768e10,5.1251204096e10,8.38471424e9,2.383496192e10,-5.9336470528e10,-4.3938398208e10,2.3086884864e10,-1.1640434688e10,7.1941464064e10,-5.2859056128e10,3.5733024768e10,-2.0498057216e10,-7.0365896704e10,2.158317568e10,4.9044815872e10,5.1667218432e10,7.2803606528e10,-8.4328103936e10,1.321735936e9,-1.2599998464e10,-7.7996990464e10,-2.0478019584e10,-2.8839913472e10,-4.9483800576e10,-9.9888889856e10,1.01748015104e11,6.1996314624e10,-1.71373056e10,-3.661996288e9,-9.1820834816e10,1.0418479104e11,8.2381422592e10,8.8647696384e10,8.410738688e10,9.1058683904e10,2.0226029568e10,-5.0415960064e10,3.63112448e10,7.004143104e9,1.617547136e9,7.2391540736e10,-3.556608768e9,4.3505733632e10,3.2696131584e10,3.6023750656e10,-6.82957824e10,-1.2182043648e10,-1.3863084032e11,1.7413822464e10,8.9378021376e10,7.4348183552e10,7.38207744e10,4.9716957184e10,-8.6932955136e10,-1.50753230848e11,-4.669886464e10,1.29093992448e11,4.9946615808e10,1.57190733824e11,6.815576064e10,4.0133009408e10,-1.36747286528e11,9.7157627904e10,-1.6661364736e11,3.1264526336e10,-1.92191905792e11,1.84959926272e11,1.07951710208e11,-1.75875981312e11,-1.76921264128e11,-1.53808093184e11,-1.27587721216e11,-9.9252174848e10,6.4469856256e10,1.64558454784e11,8.814747648e10,-1.86836680704e11,-1.37879535616e11,-2.06693810176e11,-2.26253406208e11,-1.27892586496e11,1.17781184512e11,-4.6317105152e10,1.02780502016e11,-1.12662921216e11,2.14783131648e11,1.85093095424e11,-3.1148333056e10,-4.7038369792e10,2.9853171712e10,-3.04195534848e11,6.6621640704e10,-2.01527902208e11,3.1156436992e11,-1.4939541504e10,2.4989093888e10,-2.28040065024e11,1.32867956736e11,-6.4167862272e10,-4.5973991424e10,2.47600955392e11,-1.66508314624e11,-9.362976768e10,-2.9688397824e11,3.37824120832e11,-1.43174811648e11,6.306820096e10,3.79052654592e11,-2.57218838528e11,2.39094513664e11,4.49839300608e11,-1.68569585664e11,2.8086419456e11,8.9819348992e10,4.2940481536e11,-2.15917543424e11,3.45585778688e11,3.00943081472e11,3.37260511232e11,-3.09125709824e11,4.18850504704e11,-4.46132453376e11,3.97875707904e11,3.51222366208e11,-7.445011456e9,-9.8812370944e10,4.40006148096e11,2.05568999424e11,-6.3920807936e10,-2.508324864e11,-2.86603280384e11,-2.4641787904e10,-3.47639939072e11,-5.64777189376e11,2.46842556416e11,5.62771591168e11,-1.57049765888e11,1.63271852032e11,-1.4623126528e10,-5.30712788992e11,4.59989417984e11,-5.88526256128e11,7.92451022848e11,-5.66495019008e11,-7.535476736e11,2.71023783936e11,2.63787036672e11,2.44353482752e11,5.3477801984e11,-4.43314307072e11,9.38299949056e11,2.48026742784e11,-1.8046605312e10,-3.92848441344e11,4.39418978304e11,6.86642561024e11,5.18170148864e11,-9.28590462976e11,7.6593528832e11,8.6503120896e10,2.11609157632e11,5.96171227136e11,-5.06412367872e11,-2.81987842048e11,8.5078212608e10,2.27583131648e11,3.66462664704e11,8.92507062272e11,1.96123721728e11,1.031869431808e12,-5.85865756672e11,-4.0135344128e11,-5.4734897152e11,-1.071015002112e12,-1.136613392384e12,1.176066850816e12,-9.58695211008e11,5.58291091456e11,-6.4571768832e11,-1.872351232e11,-3.51769853952e11,8.60480733184e11,-7.719448576e10,-5.63435143168e11,-2.3228469248e10,1.729282179072e12,8.93755654144e11,3.63451875328e11,-7.98405361664e11,-1.55741257728e12,2.6863763456e11,-8.70507216896e11,-1.20916344832e12,-1.793454637056e12,-1.711372763136e12,5.24505645056e11,-1.83889608704e11,6.94083190784e11,-1.553424973824e12,3.05789796352e11,-1.100036702208e12,7.8208376832e10,-6.90701533184e11,8.37385388032e11,-2.115698163712e12,1.931269636096e12,-2.458284720128e12,1.60076660736e12,-7.41771771904e11,-3.28467218432e11,2.227280805888e12,1.67242006528e11,-1.420419137536e12,1.333614477312e12,2.031389114368e12,-4.32495755264e11,-2.576002842624e12,1.76748560384e12,-2.848357351424e12,1.704337866752e12,-1.283286499328e12,-8.5513895936e11,-7.873839104e11,2.9949952e12,-3.166126997504e12,1.236385398784e12,8.7520837632e11,-2.821093851136e12,-3.02887763968e11,1.992762851328e12,-3.4352693248e11,2.216665546752e12,7.33921017856e11,3.236343840768e12,-2.171875098624e12,-1.26582013952e11,-2.822231031808e12,-1.05904267264e11,-6.3469289472e11,-3.074658926592e12,-3.369393455104e12,-6.41300037632e11,2.25888960512e12,1.213258530816e12,2.4871370752e12,2.016974471168e12,2.475573116928e12,1.783529865216e12,4.133361287168e12,3.451272298496e12,3.397384142848e12,-3.482699956224e12,4.3209588736e12,5.167382003712e12,3.54380414976e12,-4.503229693952e12,-7.76906604544e11,-5.54915397632e11,-1.634630631424e12,-3.416872189952e12,-6.68457238528e11,6.157313245184e12,6.210860875776e12,1.2877365248e12,-6.40938934272e12,4.576966606848e12,-3.223191289856e12,5.906501206016e12,-1.61548402688e12,2.844880011264e12,-1.062079954944e12,-6.470271762432e12,-7.640666079232e12,-7.396960239616e12,-7.194241662976e12,-2.38950416384e12,-8.391871168512e12,6.916231135232e12,7.70205220864e11,2.388523220992e12,9.109985296384e12,7.645205889024e12,4.0605843456e12,1.985971093504e12,7.383643324416e12,4.805719228416e12,-2.180998627328e12,4.438209593344e12,-4.067296018432e12,5.194693738496e12,-8.719858925568e12,8.105511878656e12,-9.463624892416e12,1.3274873856e12,9.457350213632e12,-6.43184984064e12,-1.0930689671168e13,1.41332840448e12,-2.37551747072e12,8.209601921024e12,4.0669560832e11,6.068182188032e12,1.2210637111296e13,-1.2645507792896e13,-9.233373331456e12,1.1067626356736e13,5.58355447808e12,1.79539083264e12,1.1767569711104e13,-7.89264924672e11,7.79995578368e12,-1.151375245312e13,-4.378795966464e12,-1.1046436732928e13,-2.921316483072e12,6.755600826368e12,-1.4381304774656e13,-1.2345610862592e13,7.677831806976e12,-4.047531147264e12,-1.3654621683712e13,1.532926754816e12,-1.0891551571968e13,-2.409929375744e12,8.431821914112e12,2.558099193856e12,1.0979631955968e13,-5.02443802624e12,1.8389082832896e13,-9.40649545728e11,1.2454604046336e13,-1.5186167595008e13,-1.2443370651648e13,-1.3448981250048e13,2.842137985024e12,1.54497449984e12,-2.1619772751872e13,1.7683617677312e13,-1.8386910183424e13,-1.7513870000128e13,-1.1800719392768e13,1.96765024256e12,5.506325282816e12,-2.3261156999168e13,-3.185869324288e12,1.7044567228416e13,1.560458297344e13,-4.202607935488e12,-2.32248573952e13,2.313009758208e13,-9.936699392e12,2.218648403968e13,4.89145237504e12,-1.125126766592e13,1.2163431268352e13,8.742411173888e12,-2.3625012871168e13,-6.402819489792e12,2.1452338233344e13,-1.799658405888e12,-2.1477430657024e13,3.1160656723968e13,1.764898111488e13,-2.1714312364032e13,2.6186858102784e13,3.6460694601728e13,1.770176643072e13,1.3862167379968e13,-1.32657127424e11,-1.8117774278656e13,-2.1302270230528e13,1.779264651264e13,-1.6733718970368e13,3.6248043388928e13,-3.1626335617024e13,-2.3759721332736e13,4.1778531008512e13,-2.2064715005952e13,2.125706821632e13,-3.3121990868992e13,-3.1519137595392e13,-5.1121338974208e13,1.0032842276864e13,1.8091360649216e13,3.1947996790784e13,-2.0221658136576e13,-5.0895601532928e13,-4.3206796378112e13,3.4592660652032e13,-2.2399560974336e13,4.3881852829696e13,2.333707862016e12,-1.624609128448e13,-3.4898855329792e13,-2.9934900740096e13,2.7552032751616e13,3.312296394752e12,-4.4797188374528e13,7.727012642816e12,-3.7620314800128e13,7.2466265276416e13,1.9909117476864e13,-6.0857199362048e13,-8.54241837056e12,-5.759484035072e13,7.1915667456e12,8.1457586372608e13,2.1864768339968e13,5.2289398112256e13,-5.1114296737792e13,7.13018834944e11,6.4670618615808e13,-4.679095287808e12,5.4555211464704e13,5.8943170674688e13,-2.273017593856e12,-9.5094208200704e13,-4.1131492507648e13,-5.893382995968e13,-4.2895163785216e13,-5.8899977732096e13,9.445841043456e13,-8.6681600393216e13,-3.8084242571264e13,-4.7174394052608e13,-6.538121445376e12,7.868222275584e12,9.8847674073088e13,2.339000549376e12,8.5757142237184e13,-7.1944250589184e13,1.460904525824e12,-5.3765478547456e13,1.24403425738752e14,-8.1841709121536e13,7.3095343767552e13,1.0103646322688e14,-3.9239882375168e13,-2.4111719907328e13,1.11043435036672e14,4.998630998016e13,-1.50261796438016e14,-8.9136870457344e13,-5.811717799936e13,-5.0520819499008e13,1.09102722187264e14,1.44126804754432e14,8.6816858308608e13,1.54949820350464e14,1.18062393065472e14,4.2843645149184e13,-1.40541211705344e14,-3.9062710779904e13,-7.4395108245504e13,5.40124643328e13,9.2496247914496e13,-1.7126257590272e14,1.42813383622656e14,-1.52633641795584e14,5.1258878590976e13,-7.4884579328e12,-2.5787394686976e13,1.13105086447616e14,1.5087599353856e14,9.68919875584e12,-1.78983668809728e14,1.5015742537728e14,-3.67522742272e13,-1.28157495590912e14,4.537668599808e13,-2.35414002597888e14,-2.11037815046144e14,-2.34694562021376e14,2.12636297854976e14,-6.2480961241088e13,2.3001483444224e13,1.3427284115456e13,-9.775299428352e13,2.26961641177088e14,-9.5953293934592e13,-1.11246372241408e14,-8.617866559488e12,-2.43016765800448e14,-2.39798392455168e14,8.6355711361024e13,-1.93662793285632e14,3.27008273825792e14,1.17942427582464e14,1.77320040071168e14,-2.35116894879744e14,-3.52973397950464e14,2.6863944597504e13,-3.27921826791424e14,3.54192799563776e14,3.60540392128512e14,-2.44977762304e13,-2.40793935675392e14,-2.78019977510912e14,-5.5140748886016e13,2.6294989357056e14,-2.81585840553984e14,-2.6052617306112e14,5.333208530944e12,-1.91999248433152e14,-3.9386544603136e14,2.43395142352896e14,2.86711816912896e14,-2.44421236883456e14,2.38969178554368e14,-4.30681838583808e14,-3.20326848217088e14,-1.09130345873408e14,-8.9533299294208e13,4.0759843618816e14,-6.606333411328e12,-2.42945982726144e14,-1.50784339607552e14,-3.18067057885184e14,-5.80823392714752e14,8.2143967444992e13,3.57955056697344e14,3.18966786424832e14,-3.91367251460096e14,-1.02515433537536e14,1.0731416190976e14,6.47918700724224e14,4.87448287117312e14,4.27204156588032e14,5.64237436977152e14,5.2093608001536e14,3.21294356709376e14,-5.51775824248832e14,6.62877669163008e14,-9.8796503564288e13,5.4138415087616e14,-5.11941848072192e14,6.8882115067904e14,5.44083739148288e14,-2.56219444936704e14,-6.22249291808768e14,7.17239674208256e14,3.04105427828736e14,-4.40982982098944e14,8.52105606725632e14,2.07945304375296e14,-4.8872852291584e14,4.94592529006592e14,1.35053585678336e14,-2.65939559907328e14,9.16299664326656e14,8.49096512372736e14,-7.04838425903104e14,-8.06004904165376e14,-4.0713131655168e13,-1.99721868066816e14,-3.04373661958144e14,-6.8292697915392e14,5.74866474401792e14,2.92803791814656e14,-6.57927518027776e14,9.60573328064512e14,5.81563939028992e14,8.8621818314752e14,-6.590526652416e14,-3.5218027184128e14,1.6579974660096e14,1.342046686150656e15,3.13280551714816e14,-1.3457709596672e15,-7.59534163329024e14,-4.53254240534528e14,-2.1983848824832e14,4.868815192064e14,9.70268210102272e14,7.17228064374784e14,-1.534611813302272e15,-7.43467764416512e14,-1.341117496819712e15,1.282509983711232e15,1.619594183704576e15,1.741102969257984e15,1.047430921453568e15,-1.683732675166208e15,7.83075281731584e14,1.98347897962496e14,1.284714107240448e15,-3.45453547749376e14,6.4282599358464e13,-7.912105181184e12,1.46527557255168e14,-2.2372417536e14,-7.21466458898432e14,1.365568477200384e15,-2.63403029397504e14,-5.1804670787584e14,-1.097831288930304e15,-7.33098438295552e14,1.420752498720768e15,-1.192448411828224e15,1.938281965027328e15,4.21249687748608e14,-1.46122572038144e15,-1.149480753692672e15,-8.65124994777088e14,-1.03345394024448e14,5.33629117661184e14,1.070460267659264e15,-1.8809473728512e15,-2.572285709910016e15,-5.92746893017088e14,4.26792712142848e14,2.576662550020096e15,9.66091018862592e14,-1.100908364562432e15,4.5020451176448e14,-2.430033171841024e15,3.177389693599744e15,-9.347912433664e13,1.533988371955712e15,2.32932333584384e14,2.013046205579264e15,2.696885395521536e15,7.60276924235776e14,6.92394831904768e14,-1.678584754208768e15,-8.23302884950016e14,7.8704369729536e14,1.749355212046336e15,1.662731895701504e15,6.018232745984e13,-1.697391073820672e15,-4.206765847609344e15,5.2797949083648e13,3.826398980472832e15,-1.682767783919616e15,4.356727315103744e15,-1.218259152011264e15,1.9862411804672e15,-3.265535844286464e15,1.156671065817088e15,3.689421467549696e15,-9.82055546519552e14,-2.831585233600512e15,-3.632515835232256e15,-5.25276647784448e15,5.68479790923776e14,-1.305735958888448e15,-2.41523996229632e15,-2.297080580145152e15,4.085582540046336e15,-4.904700180692992e15,4.772392102526976e15,2.632563696861184e15,5.361672352956416e15,-3.767606515335168e15,1.990616946835456e15,4.4596591591424e15,4.788922894778368e15,-2.742393795248128e15,-5.7546790404096e15,4.341592118788096e15,4.496694125264896e15,-4.568671066259456e15,3.6418168553472e14,5.874184357937152e15,-5.36592812867584e15,-4.86797230473216e15,3.7772291211264e15,2.9472468238336e15,8.14585913278464e15,-6.26099126009856e15,-1.07101317758976e15,1.434211852484608e15,-5.814041930891264e15,8.92379313733632e15,-5.212581153210368e15,-1.764216738414592e15,-1.397705972645888e15,-2.504672187252736e15,-9.010260492681216e15,-2.382045770678272e15,-5.537688165810176e15,1.372877035143168e15,-1.968481759133696e15,-4.194772956741632e15,-2.633709379387392e15,2.19460447240192e14,9.414116267524096e15,3.19982982397952e15,2.18862876360704e15,1.849619478740992e15,3.203917290668032e15,-8.135879776272384e15,1.2301839676473344e16,7.444777125543936e15,-1.056974808547328e16,1.505591121936384e15,-9.334650782613504e15,-7.297837167542272e15,-1.3877584794222592e16,4.365501664854016e15,-2.736921738477568e15,6.717827604021248e15,9.703268498276352e15,-3.576951574888448e15,-1.4425546385522688e16,-8.807499381604352e15,-3.08037604605952e15,-1.2461229134053376e16,-9.25325001228288e14,-1.4092794868006912e16,1.6559644767944704e16,-1.389826855141376e15,-9.169203273662464e15,-1.1649112021663744e16,1.0520773647138816e16,9.736365516259328e15,-1.6378976968638464e16,-1.2213910958505984e16,-1.8517004172394496e16,3.050085252333568e15,-9.45819981185024e15,4.2032982654976e14,1.941103812227891e16,5.35316133838848e15,1.828159271993344e16,-2.454393421037568e15,-4.485470838849536e15,1.863653096475853e16,1.5558972148809728e16,-5.15314739576832e15,2.0375191708237824e16,1.0243114748870656e16,6.225674280894464e15,2.0469165592674304e16,-1.8670817688682496e16,7.788184456921088e15,-7.40314922876928e15,2.7102944444809216e16,2.2122674314543104e16,1.7630301731684352e16,-9.263301712150528e15,6.494896789651456e15,-1.694222864351232e16,-1.2717808332832768e16,1.1498423094083584e16,-1.6564646257360896e16,-3.528528771416064e15,3.194528814281523e16,3.326996772605133e16,-2.648340722352128e15,-2.0361716248346624e16,1.896140873347891e16,3.313458820939776e16,2.080832198017024e16,3.4664998873595904e16,2.440374433035059e16,-1.5333121293549568e16,9.034266138640384e15,3.73728769694761e16,3.1642059156750336e16,-3.437667986649907e16,-2.245821219209216e16,2.136133982171955e16,2.997704421749555e16,-2.040663731129549e16,2.5284852576157696e16,-3.738971324127642e16,2.646318329626624e16,1.4422601111699456e16,-1.2183633586552832e16,-8.4511501058048e14,1.5524586640637952e16,3.999392800650035e16,-4.815531505667277e16,4.747327854503526e16,1.7712236822790144e16,2.266795477250867e16,4.562688498938675e16,2.3801242023100416e16,2.075871296041779e16,3.142454698049536e16,5.828031390993613e16,-3.2290214818873344e16,-5.027217129288499e16,6.095253948229222e16,5.407111711083725e16,5.103586801772134e16,2.655955162497024e16,2.606593103364096e16,-4.660605592849613e16,-6.01634680906711e16,-5.076166549438464e15,1.392926076698624e15,-3.3773769537355776e16,-3.68376080802775e16,4.452531177730867e16,5.130496919365222e16,4.41444254875648e16,-3.651075677408461e16,3.355419577679872e16,-7.977291007970509e16,-2.098354805591245e16,-7.16445642129408e15,1.963372573412557e16,2.316256750128333e16,-6.895360399323955e16,-3.526679251124224e16,-2.559061559292723e16,6.131667969454899e16,1.9191249613357056e16,-3.978269292494848e16,1.1974931461963776e16,-4.97355065393152e16,5.494427644592128e15,-4.799031100309504e16,9.766829504541491e16,4.524746757845811e16,5.968277535090278e16,6.575402515641139e16,-1.2552923464597504e16,-1.178290948711383e17,7.545730117088051e16,3.445735438470349e16,8.146148506206208e16,5.279337293021184e16,-5.847356596341965e16,1.1712630937249382e17,-1.29046166468821e17,4.041814622129357e16,8.134739999326208e15,1.0186335281217536e17,1.031895871735726e17,-3.3374414888239104e16,1.0136907938581709e17,3.2106744553406464e16,-8.532850181668864e16,-1.5320187858531123e17,-2.649936839573504e16,2.442346896765747e16,3.806215050100736e16,2.8355217321885696e16,8.319368832221184e16,8.514659277183386e16,-6.969613941420851e16,-7.156807943533363e16,1.384858603403346e17,7.374196854226944e16,-1.861872617783296e17,-7.463265027017933e16,3.856618209306214e16,-2.446755680695091e16,-1.6429782351531213e17,-2.1142614317203456e16,-9.817272177446093e16,-7.54053492464681e16,1.1950699256479744e17,8.604056444469248e16,-2.2717557349810176e16,7.442916330962944e16,-2.1769454056636416e17,-1.949017332420444e17,1.3298396428448563e17,-9.896941243806515e16,4.219111731101696e16,2.226223068689203e16,1.8966603066926694e17,2.2853364645206426e17,1.700011449474089e17,-2.3390665053936026e17,2.5641927137715814e17,-1.6056614977011712e17,1.935916565476147e16,-4.98049819302953e16,2.7280929607542374e17,-2.533298498615378e17,1.4591285522753126e17,2.3586024218374963e17,-2.7028911234534605e17,2.668451498693755e17,4.499259562917888e16,-9.727901638957466e16,2.305925163348132e17,-3.319049021523231e17,3.727381354879386e16,8.409830292402995e16,-1.4014094961016832e16,-3.59071613976576e16,1.9041821688175e17,3.179041334010839e17,3.794647930078495e17,1.987420868396974e17,-2.6179191468720128e17,2.4151446354971853e17,1.778793862785925e17,3.1461683415220224e17,6.088500541652992e16,-3.407078671222047e17,1.4011230432578765e17,-2.8416173645234176e17,2.140557927335854e17,-2.7921601289152102e17,3.528826906570916e17,-7.843379081641984e16,-4.569485456483287e17,-2.2363825990795264e17,1.641109237184594e17,-1.9774316334599373e17,5.096073529581896e17,2.795941933518684e17,4.32650919222444e17,1.0538416943294054e17,4.168337572621189e17,-4.545485436931277e16,2.4120563822126694e17,3.357700978408161e17,3.561861389830062e17,4.123895312626483e17,-1.64033927839744e16,5.4420678486104474e17,-4.5929514398017126e17,-5.869094800216556e17,-5.2929819746238464e17,-6.891898312085996e17,6.67095626084778e17,-1.487120572130263e17,7.13796763999273e17,-5.3458389345448755e17,-4.14090029074219e17,-7.311520052879032e17,-5.090344043209032e17,2.3752857928020787e17,6.69077564513321e17,-3.365469715253166e17,-1.1092555341810893e17,-3.4672728096741786e17,-1.3679391810361754e17,8.113630278016041e17,-5.870533786059407e17,4.6133796786510234e17,-7.469471082961961e17,-1.4505946240568525e17,4.10190198769451e17,8.028267631209349e17,3.2673303997343334e17,4.96400088004821e17,-3.7410288711604634e17,-2.920145859368714e17,-4.332248642921431e17,4.89176605847978e17,4.443317871585526e17,-1.1378220488615526e18,1.0771798594211021e18,-8.680036821117174e17,-8.187823432872755e16,-1.0827053863870136e18,1.091193203836584e18,-1.0349565513302016e18,3.293462355152732e17,4.464721153910374e16,-1.457109402250117e17,4.1770704437248e17,-7.010910137871237e17,7.724910998716416e17,-3.821535456143606e17,1.1562824367750513e18,-8.744284721501962e17,5.513113479633961e17,-7.413839230570332e17,-3.052406113073889e17,-8.16848903629439e17,-1.2637065095151616e18,1.2596902684168028e18,-5.540459708206285e17,-4.215055478088008e17,-1.7366483795024282e18,-5.510343397526733e17,-1.0656314826361405e18,3.859501936248095e17,-1.354473393411326e18,1.900501450564305e18,-1.4678048672495698e18,-7.831026240302612e17,7.525118053638472e17,1.515735877639209e18,1.198730869871739e18,-1.920816852032815e18,7.193399518707057e17,-1.308014079335465e18,1.7029047799628431e18,1.1072887483971666e18,8.002902585151324e17,-1.9905634100681114e18,-1.6231049747979305e18,1.0852798928634511e18,1.9014000264421048e18,-1.3772202274057093e18,-1.0919536879258829e17,-2.5983741250974515e18,-2.042691393779925e18,-6.107303307179459e17,3.803797928405893e17,-1.2253481222348472e18,9.353491816298578e17,1.629584259381461e18,1.636804477363159e18,2.42294979366486e18,-1.9905602489721815e18,1.285821811518341e18,9.248044528026255e17,2.002242972334162e18,-2.36356681991612e18,-2.4139217036891914e18,-1.438870806447784e18,2.2548857305075548e18,1.6493009767686472e18,1.613694667092656e18,-1.369599237435687e18,1.4044870162629263e18,-3.4500640783099494e18,-1.0475504262342246e18,-3.1973619465086566e18,-3.112793353255649e17,2.2644454343552532e18,-7.937351076292854e17,-1.0898473328847094e18,3.206249024118063e18,-4.29726362603461e18,8.977325523814318e17,-3.033047630318928e18,-3.6739221718239805e18,-1.4574548894194074e18,3.0144766040478843e18,-2.359752785878057e17,-1.5373515890465178e18,1.927428765206446e18,2.1164338519484662e18,5.161601261501415e18,-2.8902598276557046e18,5.083543632510714e18,2.944368169248096e18,-1.7879878415784346e17,3.671504895510315e18,-1.647127517158441e18,4.3822731921698324e18,3.6468225087341855e18,-3.3213219869357507e18,-3.162358169204687e18,-5.43410147455035e18,-3.451578930455118e18,-4.975948723151438e18,-1.1947308465698898e18,2.588098639180071e18,-4.934051832575033e18,-2.496354014568907e18,-4.403712019644023e18,5.501034794647028e18,3.7039033800122696e18,-6.741079951371403e18,-3.1520626172000993e18,4.455933324405244e18,-7.061685997158793e18,-1.398671699263619e18,6.014395674144014e18,-5.052312004723737e18,-4.901374896753345e18,5.228021659423736e18,1.7886510188886753e18,1.697954916053549e18,1.9084037780720845e18,-6.871872357053497e18,3.655841802616832e18,-8.738727102540415e18,6.65679908656749e18,-4.693079565696762e18,-7.196902287875244e18,-6.811949127958528e16,4.236771245053444e18,-5.686945168473719e18,6.612258420282098e18,9.93863623656027e18,1.0928814352215572e18,2.027271705273041e18,8.56686408927019e18,7.329985663472763e17,1.014113109402452e19,4.70214009126545e18,2.28235235560312e18,1.0638113648314155e19,-3.265756242680742e18,2.330881088001409e18,1.050228877791173e19,-8.070205341154935e18,-1.3096125768277164e19,4.018802135817781e18,1.608523526468272e18,-9.647974874559283e16,-1.3522047985575264e19,-4.7943307740001075e17,9.089863837452075e18,-4.295257017313919e18,-1.2635587626401792e19,1.6887826526156882e18,-5.1606743731992e18,1.2930252619477156e18,1.421674911881809e19,-1.5397287331857695e18,-3.0969185356543427e18,-1.4928389328198435e19,7.353249542810108e18,3.2801504991557714e18,2.972673781845197e16,1.615900452344719e19,1.2940363453528277e19,1.0721012427001954e19,2.8587076922292306e18,1.945169110442705e19,1.382777269123652e19,7.93348148255785e17,-8.915154188577538e18,1.5226325093488525e19,1.5026597706791387e19,-2.0162165281726136e18,2.5974373411905864e18,-1.078148226799475e19,5.699663219472204e18,2.3377717273726812e19,-2.1385147117499056e19,1.327448744502336e19,-1.530667520422314e19,-1.939881119220079e19,1.6201732644814193e19,3.622498012992897e18,-2.2543185749221573e19,1.0400269492016906e19,2.8449387829924987e18,-1.0443945529846006e18,-1.2912086213485134e19,2.9192891336522465e19,-2.7145613879743087e19,1.6859160333875413e19,2.7114093080398004e19,1.9954651703436902e19,2.400813326062846e19,2.964104787795745e19,3.071746866203853e18,2.15633009865476e19,-2.0190096725362344e19,-2.749886497551496e19,-1.4653593884626518e19,-2.6990288071110427e19,8.511018244428005e18,5.080921297278468e18,-1.581723122955767e19,-9.815671254156313e18,-6.03860801969927e18,2.2761552331910676e18,-3.96851613644819e19,-2.389965104538557e19,3.2805796385440924e19,-3.939606897121401e19,-2.4302844158314283e19,1.0361048812742509e19,-2.440265122681402e19,1.0626182847641158e19,3.5211560812363645e19,-1.3204050531124773e19,3.782893065009837e19,2.7641513415079363e19,-3.0834332454419956e19,-1.8729549459489817e19,-5.27922811495252e19,3.6116403906441904e19,-4.538731222901195e19,2.7542915809370178e19,-4.062019484883563e19,-3.3398468337184276e19,4.49402815874838e19,4.631338249457605e19,9.375436693999452e18,-2.9595345577637315e19,5.582393377446638e19,1.6177613757747298e19,-1.0190150620925657e19,-1.9466015541913715e19,5.159866012250459e19,-2.0642270882285224e19,-4.690926941831902e19,-5.865184689478068e19,-1.9699059230444093e19,-4.16234068502045e19,-5.45455898789675e18,1.539531783165444e19,-7.768224692488582e19,-2.2396407543983243e19,2.3125964295338197e19,-4.980963595685724e19,-1.7676173339615298e19,2.684723061322049e19,4.782824563486071e19,1.4583332892588376e19,-2.1845923853397656e19,5.671758164115063e19,-8.34280571971316e19,-9.046720100689773e18,-4.139861829497546e19,1.706078217910721e19,-1.6282646805013856e19,9.208193498735654e19,7.144177956544315e19,-6.263078156360902e19,-6.813427706527901e19,-8.021221438430537e19,-2.224982505181466e19,-9.549740513132177e19,8.018163036886716e19,-1.1406418069041237e20,9.012805004824045e19,-5.826353457222228e19,-1.1846125963128393e20,1.2030554964938981e19,-5.251249062462829e19,-6.708447655721802e19,-2.562712015206351e18,-1.0093618777662738e20,-1.1178674246459064e19,1.1934313832550446e20,-2.4243021929670246e19,1.1315885161219464e20,1.0714722340881773e20,1.0816260920292934e20,1.3426848090698233e20,1.4732772355770574e20,-9.980851985508729e19,1.6034137605829506e20,1.061259618245673e20,9.76002343135829e19,7.399193405834868e19,-4.161590378285656e19,1.441201771098669e18,-7.737276518799245e19,-6.713139051935197e19,3.1009053648166584e19,3.2493904519059472e19,1.5385330747637026e20,-8.772271443085256e19,-3.8573000954939965e19,-1.229345479220999e19,1.687356987356207e20,-4.691746737701572e19,-1.5064153725461332e20,-1.2048050833764804e20,1.6780046294112744e20,1.3947539854022253e20,-3.784868227697974e19,4.93945307349532e19,4.071112885849922e19,1.455433393311276e20,-1.507236399868826e20,3.976997769144854e19,5.8420619599459385e19,2.4536170201430675e20,1.0306793851274553e20,4.922879914827527e19,8.061437175728072e19,-4.977898707023299e18,-3.218553328891016e19,-3.732627351629778e19,-4.84799085844575e19,1.8612237286266582e20,3.556479211692622e18,-4.339428907399355e19,-2.9801131493305824e20,1.4827491324261617e20,3.189556568438656e20,-2.951867487261389e20,-9.119650267155504e19,-1.7564108915489112e20,9.783834455169407e19,-2.1459828146280858e20,-2.580684852176303e20,7.890343490743802e19,-2.3560317567798084e20,3.4314413859875167e20,3.41591852480704e19,-2.2346894776165886e20,4.01890112484963e20,-6.6991950454717415e19,2.1490480771244648e20,1.3083138117027548e20,1.3702262559316587e20,2.5977999381351943e20,4.1019387058853197e20,-3.393039403071161e20,-1.780018197845634e20,-3.754480013290431e20,3.996909836762947e20,-1.1686344933379985e20,-2.564879856312139e20,3.8815328919655285e19,1.1240825460633056e20,-3.9750076530985796e19,2.8275100833320167e20,-4.7897932681829155e19,-3.278819320428023e20,-2.569556738972047e20,2.033010017975497e20,-2.4557177030786312e20,5.3491033103507076e20,2.89386622579481e20,-5.31358785332052e20,-5.2850360872141534e20,-2.7028706766603525e20,4.6346670429009294e20,-2.7247875498000672e20,-4.555078234017387e20,4.126884073852581e19,-5.8648090963060195e19,-7.750710791672064e19,2.0010817836016258e20,-5.30811035027373e20,-1.2479122723722756e20,-7.505725175411014e20,-6.467138102656594e20,3.58556441686032e20,-6.076721930569148e19,-1.210385236828839e20,-1.8268697077191226e20,-6.794178248597171e20,-1.9829702762251787e20,2.9154764671317705e20,5.6828443199556026e20,-5.5511520299768716e20,7.535882404415794e20,-3.721516478767846e20,-6.405298050273263e20,-1.3114410866549404e20,5.6902921478393666e20,-2.133986527042538e20,-7.402421044208437e20,-6.159002519839347e20,7.976880509427447e20,-8.218559850243309e20,2.281628068810997e20,-2.2180215850269462e20,1.0508581854703539e21,2.9351973076875608e20,-3.7276927434443194e20,7.785780814551607e20,1.703419532824061e20,3.7017678425581054e20,7.727728007979918e20,-4.696263267585685e20,2.3383274205493592e19,5.19687566160233e20,-5.105006451328622e20,4.174316477709256e20,9.899978771122084e20,-9.696699654003973e20,-5.845164605837662e20,5.0444537951200215e20,-6.979533039198347e20,5.3203239013569266e20,5.968160374567196e20,-1.3935448920475786e21,9.148619319914843e20,1.2061388525536239e21,-2.5927863410343962e20,1.6326280484157496e21,1.187703508216471e21,1.3686494155199396e21,-1.7094185034495788e21,-8.088080013726759e20,8.18124963839287e20,1.3952949627152771e21,5.838821919081208e20,-4.8721742208744974e20,9.920151379015495e20,-1.14167411638121e21,-4.248909105756184e20,1.7084692290906221e21,1.6839029375482462e20,-1.9892690880696376e21,-3.825568629721032e20,-7.98455773941723e20,2.168462672905594e21,-8.575180201486409e20,1.6015738993976814e21,-2.8292833317048287e19,-2.7454723981706265e19,1.4947328943752458e21,7.437315497071257e20,9.61700775491021e20,-6.92679659124928e20,-1.9125582904542175e21,2.5348786348132013e21,-2.4996178598603784e19,2.6945709295752016e21,-2.3633882812180018e20,-2.4241683340234127e21,2.8174702227564685e21,-4.089761042861654e20,1.914427565774553e21,-2.403608838774513e21,8.050948538486531e20,-9.820030729799514e20,-1.6587635629532874e21,4.664471020809937e20,-1.7459564887014124e21,1.5014661980306297e21,3.5181166088847266e21,-1.0508706407380733e21,-1.2935747263910222e20,-1.7663095220548948e21,-2.2463411694618982e21,1.275886240720199e21,-1.200116132476946e21,1.2168938706762497e21,2.403909172574663e21,-3.44822215004282e21,-9.932465909246586e20,-2.6224888472143e21,2.97482543078684e21,-2.0439557353948441e21,-2.47860418714437e21,1.1873527903954896e21,-4.5712918963633625e20,-1.1464983863757982e21,-3.471953868279249e21,2.699222585040322e21,-1.0580105349973158e21,-7.569753695738271e20,2.651735223194444e21,2.6873853308166157e20,-3.795110222491172e21,-1.4073767131406286e21,1.9831773362549214e20,-4.497136398955266e21,-3.964260639420604e21,-4.08607196144814e20,-5.255306700173974e21,3.30486891472892e21,-2.7986046439174135e21,-5.788174296934311e21,-6.388824445786295e21,4.534589177881409e21,6.058927610307082e20,3.983882260047104e21,4.6050150614793454e21,-4.175546734463714e21,-6.493037178213695e21,4.2942244659442745e21,6.018566209709099e20,-4.747941862203529e21,3.6666394136208946e21,3.9787501267967384e21,-3.0152978732631353e21,3.291631709524171e20,-4.838901626827484e21,-5.876376169736456e21,-3.727347092172919e21,-8.337499916402164e21,5.791768732386906e21,-5.58451364048527e21,-3.7472890313229153e21,-7.610848620125562e21,7.44112483866857e21,3.8685839171369315e21,-7.607235607324504e21,6.112905785115907e21,-7.048320597694339e20,9.566048680701583e21,-1.632697572734997e21,-2.93561990718072e21,-2.095455663771221e21,6.037509897854191e21,9.456866789035333e21,-7.05383460452717e19,6.467474183778787e21,8.638088732881334e21,1.0845976198399905e22,1.2174543717973736e22,5.840589441197463e21,1.1789016449572405e22,1.463608798825465e21,-3.953129992941558e21,5.201693598409942e21,-1.1573547354900398e22,-1.1418020045368785e22,-1.3199802809843418e22,-1.1557780252604974e22,1.9395990285168568e21,3.7404210418911753e21,3.5634884048056473e21,-1.3378617107148257e22,2.0664530451209084e21,5.902839321146885e21,2.6544514567197017e21,7.382652352906605e21,1.3158521689759034e22,2.441040507077403e21,3.314891675699633e21,1.6726340868556351e22,1.26958567669401e22,5.062856629097364e21,-1.5300158952959172e22,-3.4146821547679317e21,1.0205387565102447e22,-7.193229263729542e21,-1.324999993129009e22,1.0251270238106097e22,-5.204738031758044e21,-1.7188567816311522e22,6.913522231347606e20,-5.607622736073214e21,-1.6783986943786693e22,1.1967025728443851e22,-6.13838715180757e21,2.15197077254514e22,9.213614425312124e21,-1.3693594361486922e21,-8.108427136105731e21,1.564853377623451e22,1.512927999819776e22,4.057865705875686e21,1.8815251113219142e22,8.108551548045437e21,-1.6530159565188465e22,1.3423979614394946e22,1.0683989601102737e22,2.682597941080851e22,-2.8256516307245358e22,2.8816219165335335e22,-4.502026745200637e21,1.8074451758713156e22,1.4935572296925207e22,4.835832423681431e21,1.8321100399505356e22,-3.851653478762762e21,3.180943532667552e22,-9.912410394943486e21,-1.6404367272196566e22,-1.4377136076230427e22,-3.2559948945577745e22,1.5768882343176825e22,7.772196269225597e21,3.1248329597301616e22,1.5274489560983067e22,1.246799038839385e22,3.824377089849621e22,3.977381933229943e22,2.252191401672848e22,-1.2711579959139158e22,-4.1303331837747e22,-3.6559116141285167e22,3.4640539915828876e22,-3.627960923761167e22,-2.270457101041537e22,2.383089425562297e22,-1.1668586817836798e22,4.666493024452636e22,4.75287499264536e21,1.2786430066421033e21,-4.2482171558209364e22,3.903605315214248e21,2.097028883711052e22,4.285035884214541e22,1.7441408906591356e22,3.791367055660883e22,2.6946970866597633e22,-5.482078704010774e22,-4.642070904393331e22,-4.314715506478838e22,-2.5417550684942426e22,2.741378923417291e22,2.044836442449474e22,-7.577409955842289e21,-1.250975789723799e22,3.045373474524669e22,5.747656424396775e22,-6.714696808343495e22,2.649313862854788e22,2.104073414248185e22,-3.894390950376648e22,-4.041242075226131e22,1.6136551713155725e22,6.565272326666932e22,7.359603267783695e22,-5.571477408413892e22,5.961179288489814e22,-6.82816094771543e22,-6.648029572699567e22,-2.784007520510185e22,-2.8182409575376976e22,-7.043579376891629e22,3.7051420942101685e21,-8.357063215413489e22,-4.014086270193013e22,5.215002636028747e22,-6.770187010432215e22,-1.2343545797590441e22,3.593642143520716e22,3.776440099875945e22,8.26206338415381e22,9.927753933693956e22,7.1416353508584415e22,1.0767078086887965e23,-6.5742853806011886e22,-5.375618112419363e22,-9.874552010575903e22,-7.621266009013623e22,6.945836403098919e22,3.706600528654497e22,-8.563111905564944e22,-1.140490849059364e23,-1.0726552896001034e23,1.1233111477048189e23,1.0164328922839654e23,1.6343672260018494e22,5.817384306347464e22,6.217084177596149e22,-6.517955257181964e22,2.0762596333095076e22,1.4144862925448794e22,-5.3730465570321345e22,1.384850220088979e23,-6.780279577197152e21,-7.238171810310979e22,-1.6540676596218282e22,9.758553695693647e22,1.3832504514293445e23,6.2606285816732685e22,-1.3417851791561965e23,-1.6878041244304606e23,-5.8530735319545245e22,3.8392695930974095e22,1.188815373780975e23,2.12240419063149e22,-1.3864947545289096e23,-1.4028176910903438e23,3.97849207053809e22,-1.6118406485077068e23,1.639752630436259e22,-1.3041521098779706e23,1.410221789021726e23,1.292935174430064e23,-1.7325735076062252e23,4.3824428894750494e22,8.063652798970376e22,-1.0341883338148736e23,6.3946764231421e22,-6.210918299346316e22,-1.5551896886510282e23,6.67002110003998e22,2.3900477121665656e23,2.3605822811005463e23,-1.1697146169693786e23,2.425191822074729e23,-2.2073460427713695e23,1.9224926457642452e23,-2.2269408444620883e23,1.8880102047133352e23,2.1526707219992258e23,-2.2808927069900912e23,2.4861536274947265e23,-8.554504625957114e22,1.900505171663497e23,-2.1569700383474988e23,3.139805176691355e23,-1.0366206379016238e23,3.0014340597242324e23,-6.036366433908802e22,-2.9710988934981753e23,-3.300680961140433e23,2.8350997323827963e23,1.3099879193111136e22,6.689599598700047e22,5.909746379305392e22,1.908260190077844e23,-2.139797452680365e23,1.9167256963694048e23,8.821271747004703e22,2.5002102626516753e23,2.6700464089193695e23,-3.907789249340068e23,-2.4073662144616263e23,-5.378581480974173e21,2.1072117476485182e23,1.0588309501119344e23,-4.140071587464941e23,-2.9873658953522375e23,3.41745929947815e23,-2.464591473342787e23,-4.8263793680635805e22,8.754160906797479e22,4.4269717804307125e23,-4.888600109723413e23,1.3138461981478781e23,-4.3603192265215695e23,-3.0076349759791663e23,-1.693297615255927e23,-2.9221231482704466e23,4.529716542041573e23,-2.6946155264705116e23,9.609029684465319e22,1.1866908456927592e22,4.120755828807134e22,6.640567108117014e22,-3.0637155999790346e23,5.932626737068263e23,-1.3189150896004762e23,4.6676794527384704e23,-3.72155099322949e23,4.924911012223036e23,1.5751791182590954e22,-1.2117988639753124e23,6.119138091460244e23,-6.593336147456921e23,-5.1607490323257104e23,-4.078043329653182e23,1.825017996437334e23,-7.017783478801991e23,-3.4394177703972977e23,-6.874718169871268e23,6.581407012763942e23,2.4074633120695924e23,-4.528397888070679e23,-7.070226275166855e23,-8.891508986073248e22,5.5504548755693044e23,-4.840893659014663e23,-3.62598785172842e23,5.2803660795805516e23,-7.841094092728966e23,-4.8239921900450965e23,8.014155536905798e23,-3.4368489171698455e23,1.7043226072877152e23,6.370915251364108e23,5.847788647863798e23,2.6320126093463002e23,-6.760328901063879e23,6.611506190369525e23,4.9698724288869114e23,-2.869851488691423e23,1.0042777129184894e24,-9.764272366500482e23,5.958911185645478e23,8.790831917123306e23,-1.0026794754827282e24,6.871212567921323e23,3.898793939588343e23,8.882202387515279e23,8.59194286951546e23,7.721159992060358e23,8.732633160146693e23,1.1450974910462088e24,5.434128338346205e23,-8.807874258689216e23,9.612898096401245e23,6.983574856608425e23,6.358847045514636e23,7.446327284368118e23,7.41410889292188e23,-4.243465948286053e23,-7.341286047235269e23,-1.6852282455875897e24,1.758700041966106e24,3.3342075582064296e23,-5.80077142804202e23,-7.383004511879468e23,1.5500891278858505e24,-2.242270196873732e23,1.092139554941568e24,1.9310936563613944e24,-1.271871298540897e24,1.8071796706588836e24,-2.7782846613556964e23,-1.168435648718401e24,-3.478169984182925e23,1.2580611724131519e24,8.43505475232044e23,-1.7556123740615808e24,-2.0172640184220267e24,-1.973077725297217e24,-1.9721101359244757e24,-1.6370851258589693e24,-1.951611335687754e24,1.1799020295424683e24,1.152076124913594e24,1.364162664984675e24,-1.4987037046558995e24,6.846997613444877e23,-3.706069058862471e23,2.682742272441709e24,-2.17081658958903e24,-8.89683296140874e23,3.065996583118305e23,-2.6855378188600045e24,2.6727326079387124e24,-1.601826768635459e24,-2.892680055058579e24,2.1545576581855e24,-1.877138947558427e24,2.5735260183103025e24,-6.99025243384792e23,1.7538778036578998e24,-1.6023624447895368e24,2.3295802218416682e24,3.1257206552455133e24,-1.8901877131475674e24,5.4805193776757934e23,-3.6243416239350294e24,-1.688879555873979e21,-9.196626419675718e23,-1.8285738585591205e24,-1.249120554375302e24,1.153334664836662e23,-7.103679733774903e23,-1.5360585055203494e24,1.935167936843487e24,4.5734825232203593e24,-2.553844495305159e24,3.7776471096120766e23,-1.1774463067376557e24,4.114002086690741e24,4.8141396110971025e24,5.092010987529922e24,3.2946103970731134e24,-2.920434910899732e24,4.1356519349346246e24,-1.219950343272056e24,1.1938326359674448e24,-1.1977727452094387e24,4.344842336186133e24,-4.6975077658480647e24,2.5141079027273794e24,5.905383850432749e24,4.5838562226884355e24,-1.6988383398342855e24,-5.755861460500287e24,-3.8233476930755934e24,-5.197831311369509e24,-6.85697009622935e24,-3.5685010237809014e24,4.4769455233358665e24,4.7937867995459017e24,4.783913756241201e24,-1.7066848353642635e24,-3.8547316575828725e24,-2.9415016690926606e24,7.838094767434731e24,-1.4839343478363215e24,2.55065111891018e23,3.130746816544847e23,-3.9869066140962676e24,4.453149223480781e24,7.542772771108183e24,-8.858845350753449e24,-1.6585330687243586e24,3.159887267861755e23,-4.757661157120551e24,-2.509290996681132e24,-1.501917617465179e24,-7.220248024226e23,-6.532001876333341e24,5.939855050498989e24,5.89582151947354e24,-5.855634134587459e24,-8.649328384485761e24,1.7992631351475007e24,9.93283727269416e24,-1.9093541684705277e24,4.4941903467410234e24,-6.027330663818025e24,-3.054186703743459e23,5.228724419546202e24,-8.275751841034022e24,9.078224984032297e24,3.156387502576927e24,9.698606281053718e24,2.875769578889758e24,2.0139596012746354e24,1.4547260903234236e24,-2.5069471072622663e24,9.453684248301058e24,-5.967551107343407e24,-1.919060902848189e24,1.173868013086845e25,-1.1389883329315228e25,3.590291240217971e24,-1.2698231334879628e25,-1.155531488308976e25,-4.7888583483440836e24,6.307086490450124e24,7.079360584017479e24,-7.46699758167865e24,-1.4752067608694853e25,-5.719339213077352e24,1.3413560329491442e25,-1.4008435544066446e25,6.209061645363936e24,7.986750160395729e24,1.8246601512195821e25,-5.330681879884604e24,-2.82108766484776e24,1.2148969153791385e25,8.97530022255153e24,-1.7849129517639602e25,1.7409438690506184e25,-2.65844819872701e24,1.6300730572679505e25,-2.0953935600330795e25,-2.1205194089672774e25,2.9944787004597214e24,1.0639255336996866e25,1.3576163766815173e25,-1.9708386076200824e25,2.367865343891223e25,-7.444189912013765e24,-1.6329792841506882e24,-2.3326129242134613e25,1.8867938581144562e25,-2.1599846038228725e25,-2.3706694795747277e25,-2.216674676541595e25,1.0068276726447848e25,-1.236082539779192e25,-2.82252916260497e25,-1.2299223648879272e25,-2.9442783652443557e25,1.2819930846602166e24,-5.828864450171993e24,-3.3030110443242808e25,-1.0896675038859465e25,1.1793335527715843e25,2.6289799285917854e25,-3.1948702353723714e25,-1.1159410861779805e25,1.2184104436644279e25,1.1103354665304316e25,7.948659939726528e24,-1.2770399609381999e25,-1.9884748478760534e25,-1.4817261861015856e25,-4.534884152398003e24,-2.3234126106066986e25,3.332352666032224e25,-6.073591062729622e24,-5.387071847135677e24,1.3043714640028611e25,-2.0580296799117808e25,6.724869503153002e24,-1.0163455008339162e25,-1.9127796711989404e25,1.6414433997306841e25,2.3379142878759445e25,-3.5394069919660724e25,-5.152978053154284e25,1.5716583292704868e25,-2.2807074757388573e25,3.610814338275402e25,-2.7148142428568624e25,1.177420971287592e25,-4.834164820002769e25,3.0282975198925797e25,-2.8422380098497726e24,1.4028228900457536e25,5.6985040768146985e25,1.8637862718606724e25,5.636262456466993e25,2.6314713919632408e25,-3.948885741655569e25,1.8093242199496028e25,-4.820142988663741e25,6.915624862484073e25,-3.830848485092415e25,-5.542924237297032e25,5.580798169891969e25,3.890064090013054e24,3.0030778231479068e25,-2.096561700101547e25,5.4788803700533255e25,-4.2427903362843535e25,-6.463369266209149e25,-9.331060669992578e24,7.026649358703305e25,3.34492988672598e25,2.031378285242687e25,6.230722158131737e25,2.808641070160476e25,-7.03302732046679e25,4.918421707065243e25,-9.14534876578341e25,9.424383440014378e25,7.0510147406130644e25,-5.857294110969792e25,-9.552792147848674e25,9.087329143985575e25,-9.225399334028476e25,1.0066129064269067e26,-1.4858782023161263e25,7.544890803204296e25,-5.934030721642017e25,-1.1494899490405352e26,-1.1049483485664357e26,1.0333661271232873e26,2.3877629243863298e25,-1.2022180300671062e26,-1.0280722805090141e26,1.2558523996300185e26,-7.711272594882925e25,6.107071326762653e24,-7.86202722731951e25,2.165578348378924e25,-8.369073342842167e24,-1.4207834471209705e26,1.113285446784269e25,6.944113552862908e25,1.64767390283373e25,-5.396989277918305e25,2.1298617625034076e25,-1.4456139636825483e26,1.2826654800109183e26,-1.173556678163741e26,1.4884813376645179e26,4.028514801798551e25,1.4974871303550233e26,1.668130581083281e26,-1.302318272212167e26,1.2251451193414383e26,-1.424000213410974e25,-6.214124700151417e24,1.3107774878757684e26,1.7592945747629942e26,2.1594775489451464e25,9.225406712726106e25,2.3299466779419075e25,2.0083737657601055e26,-2.0367360037083154e26,8.229369232442937e24,-1.7676847073700395e26,9.89276287411553e25,-1.9760866140753324e26,1.026628730551526e26,-2.0689276012587867e26,8.494133044289881e24,1.947399897898866e26,-5.37285770848968e25,-9.112007198207384e25,2.393468179510307e26,2.9360305953846993e25,1.6055955652710833e26,-1.8277255389160308e26,-2.1127653662127538e26,1.5995241883941032e26,7.059692089025337e25,2.2836218768350627e26,2.187929807004436e25,-1.6325794625021056e26,2.8530239825186812e26,-2.3910127334066554e26,2.2221951414068136e26,-3.0668403775444894e26,1.759681956388542e26,2.7468048631306506e26,-1.2192487328904275e25,-2.246685223306511e26,1.850775783265485e25,-7.891667455697147e25,2.339773396860553e26,2.9905706539647706e26,2.6943115169224175e26,-2.316230924203922e26,8.360499757365308e25,-3.1904035868792236e25,2.5440816021210084e26,-3.19744756833749e26,1.4383411503640476e26,3.1997120906399785e26,-3.687112377607274e25,2.594931343432274e26,6.094020716499105e25,3.851346645457702e26,-8.445278226116466e25,1.2775278773189495e25,-2.1062171410014683e26,-1.1961179685030915e26,-1.983782042300562e26,3.635426399270287e26,4.133992085373657e26,-5.211821691009892e26,-1.8498581269231083e26,4.9375075385873864e26,4.8150558378168136e26,-3.455352972971549e26,-6.979070132882588e25,2.7700876056307238e26,4.300551795898877e26,4.9824932444250605e26,4.203880157841076e26,-3.2716208194532316e26,-3.327016760841463e26,7.29026716657467e25,-2.7011133848647164e26,5.851735553578061e26,4.9783836787803194e26,-3.452199317604708e26,6.822938551249677e26,-4.827183465240633e26,-4.755015006270822e26,-3.879391230472962e26,-7.16407492727455e26,3.273409046823737e26,-1.5265369591593657e24,4.039816660723911e26,1.3855974818387343e26,-7.2258870151865e26,6.721613537531842e26,6.30009067805232e26,-6.565523092138216e26,-7.821218786677328e26,3.3113990094388974e26,3.6437602693079075e26,3.175601827200759e26,-4.3173881392149516e26,-1.1122325988662621e26,-5.390334891694875e26,1.0027088559578909e27,-7.866701816735229e26,2.6943022935503806e26,3.887495623014306e26,6.1409738598259605e26,-6.236117369604695e26,1.0019684036507722e27,1.0943372279729158e27,-1.241737688934579e26,-9.992630779518982e26,1.0042493804489745e27,5.939027391209262e26,3.260661239864159e26,4.829000838466775e26,-7.213129246985122e26,-1.6507054176963733e26,1.1410876231356571e27,-7.13984918721743e26,1.1090633560006785e26,3.788154372154158e26,-1.214496883898842e27,7.87313382745885e26,7.604525621913225e26,-3.0825355591553042e25,-7.65999276773358e26,1.4868452036989002e27,-3.7605850674999563e25,1.1177417189838755e27,-5.9711671534088864e26,-1.0616209681275e27,1.2359046439910312e26,-1.9257185172518314e26,1.3705647504777225e27,1.0924699747507986e27,-2.108865540048131e26,7.373994447614788e26,1.8923778351195207e27,1.865208437430093e27,8.07410224970476e26,1.3632037617225494e27,-1.3766676712870685e27,-2.83229445386585e26,-1.9851038621939076e27,-8.302554844880972e26,-1.2855009105957441e27,-1.0359997687746908e27,1.5557806863023528e27,2.961208233552884e26,2.129971456067042e27,1.183494105216945e27,9.023255854185071e26,-1.4221116126942776e26,-1.6818486867811357e27,-1.1465671915692644e27,-2.297267781976613e27,-1.2341485692954463e27,1.65197942362908e27,-2.2157080855988766e27,5.748487651257983e26,-1.7403315063226615e27,2.25183935428117e27,-2.689805641427997e27,2.0114577662213246e27,2.4659123435170434e27,2.7985151081594665e27,-5.0450616488440315e26,2.4791745194883725e27,-3.1471547342298097e27,8.019070815979426e25,9.267749000138017e26,-3.255113566051432e26,7.415997683870624e26,-2.858634375261259e27,-2.680687342045386e27,4.1391062607006524e26,-4.1076980963709916e26,3.787868595194968e27,3.614067799751054e27,-2.197266359039555e27,1.232509022682175e27,-3.6006262476403524e26,2.977730982219706e27,-2.7648880218786673e27,4.166529485588534e27,2.2687837955175166e27,-2.7734620685241275e27,-3.279822537016308e27,-3.9094252599430844e27,-1.1167029828250849e26,-3.57339700871315e27,1.3984720179300984e27,1.401156240553752e27,3.248512361791167e27,-4.025847531732701e27,3.101181020779548e27,-3.935539356297543e27,3.1545564533958975e27,4.960631712875402e27,-5.244028009062134e27,-3.315549305494553e27,2.3566516880726514e27,-4.878763586936753e27,3.9626315728097663e27,5.64642676002556e27,-2.0201444117926107e27,-6.008149997584599e27,5.494697715226769e27,-4.553655217902644e27,9.03075334884639e26,-2.4174992326304742e27,-5.943535037591114e27,-4.044810784640474e27,2.126348441743989e26,-5.645749690731078e27,2.551736336828811e27,-6.313496443479519e27,1.8220439417413283e26,3.5953805101346235e27,-3.5157324867387337e27,1.365211505347532e27,-2.974183599547355e27,-1.1920708819805282e27,-1.8111090070023384e27,2.7674838477047197e26,7.831230793916822e27,4.547911639667854e27,-7.821247711172036e27,1.647749511426002e27,-4.307283160385326e27,-8.029839951382681e27,3.2872549515645345e27,7.800953341211903e27,-2.3539556226393025e26,-6.985705832554271e27,-4.503231264338088e27,-6.666358750629263e27,-8.149867159686158e27,7.212914822032009e27,-1.6035522932170147e27,-2.7158724403306507e26,-4.974410987976605e27,-7.696409592014135e27,5.436135058176892e27,7.633189501020528e27,6.935211928936187e27,-5.601930852136531e27,-1.0816504871149196e28,-2.862674359787354e27,-1.1424325383525831e28,2.538330718975565e27,3.8330944038535054e27,-1.0692208643545205e28,-6.455389979486113e27,-8.537974258784989e27,7.266164816788658e27,-2.3257356828748772e27,7.38052282412945e27,-1.1488561373609066e28,1.128773683596693e28,-1.17456647138108e28,9.031825768759859e27,-5.840972985215696e26,1.0432871623997074e28,1.5475317745892382e28,7.440140339792438e27,4.3258647870517026e27,1.392673099463087e28,-1.842055855156204e28,2.6942287279350147e27,1.3103039304406057e28,1.8928015199374056e27,3.545077862359096e27,3.609843347784222e27,1.1280240079175375e28,-1.508212642897893e28,-9.584480186179421e27,3.0229196022421906e27,1.9202799669983465e28,-1.792616337914583e28,-1.6368124811368855e28,2.1605945859985067e28,-1.6629931628587527e28,1.0813346788563777e28,-6.54877359609324e27,1.0918846816974327e28,1.2657469859647858e28,-2.148573802116362e28,2.0855833361929845e28,2.5406581963262283e28,-1.9751881026862926e28,-1.4128507089119304e28,2.0070947718278013e28,-9.731488340234868e26,-1.4700601423313504e27,6.836997331417085e27,-6.932673804525597e26,2.054761394632591e28,-2.725321851390687e28,1.6741165790499901e28,-4.195067631688231e27,-1.2563906202818572e27,-1.6406681753109865e28,1.7266756915901948e28,3.5097123549167905e28,-1.3590028625585506e28,-3.3664359919448496e28,2.563652107086293e28,8.61194540737266e27,7.959836476084337e26,-1.4437229436753666e28,-3.9432938362399014e28,-1.8707889759620622e28,1.3999983162921524e28,1.484839526109254e28,-1.1759720837647061e28,1.8312866164511818e28,-3.290235886377265e28,1.5149404803668754e27,1.0875946478660697e28,-5.780633463989663e27,3.1182040894178342e28,-2.558168495126385e28,-7.212394771423083e27,-1.0279911812433684e28,2.6172606475181534e28,3.5882403510421056e28,-5.003558378382173e28,4.666901816291693e28,2.1966071166785465e28,-5.175348154059357e28,4.928050099504329e28,5.035728083336778e28,5.4809008493104166e28,-4.58196249931091e28,-9.586888593085684e27,1.990152809833858e28,5.087483803279084e28,5.465133812097411e28,-6.146736106165753e28,-3.664933471670502e28,4.978972321762409e28,6.864127326861171e28,-4.093978647750168e28,4.788263270215324e27,3.9263228316920886e28,-6.578347652310535e28,5.053996558075759e28,-3.0401294404748745e28,3.0384230133462896e28,-5.575161173255088e28,3.633377202122022e28,-7.217475565522003e28,2.4444338401613316e28,4.426346828837555e28,1.5892543547020398e28,1.7855365660834648e28,-7.528203029964991e27,6.542507606066282e27,-8.653894306899153e28,-9.404580572482043e28,-6.081125435199356e28,-6.098914471681164e27,3.3291741592117666e28,-9.851134158415273e28,-4.770446784978334e28,-9.252140693468418e28,5.934920024416415e28,-9.646872918565229e28,2.876395313662494e28,-3.016021523461501e28,5.290479448911719e28,-8.487596171204898e28,-9.612176865601451e27,2.974906003560072e28,-2.504373185100127e28,2.3899816489573066e28,7.487127886296991e28,-1.1716891098712351e29,4.48523993348207e28,9.97604736320025e28,-6.530653285602659e27,1.0435619569053455e29,1.3557111370016664e29,-7.962295235223224e28,5.578614167627362e28,-3.3409892840335823e28,7.436304833735051e28,-1.9944150407325532e27,-2.837352912647045e28,6.228330098730072e28,-1.5285281218362038e29,3.173322370414268e28,-1.651935363949795e29,-1.5152763114593047e29,-9.749947067313528e28,1.026132457795711e29,-1.3567972812927264e29,3.184825110693242e28,-1.2442580934028116e29,-1.5530184088636955e29,-1.8029789336417652e29,-7.950863330441493e28,-1.4804148576094644e29,-1.3932321332073292e29,1.0695168386738344e29,-7.094486252842146e28,-1.4357624268833608e29,3.5617339440920825e28,1.704682497511515e29,5.166817671244701e28,6.480399632379391e28,1.0014897327781523e29,-5.025307709455678e28,-3.567996274285016e28,2.3236846292462886e29,-1.4055995387893165e29,1.1302691390026558e29,-2.547115088018256e29,-3.5956884674588876e28,-2.3373337795390564e29,6.771048539010514e28,-8.611117222350726e28,-2.070263554309572e29,8.466581640356128e28,1.0679987867442511e29,-7.312876340972287e28,-1.22359962898685e29,-1.3869335352398073e29,2.4997301071505047e29,-4.16585684351263e28,2.6549805498000747e29,-2.2032125267964604e29,1.2158563646648887e29,-1.968655417012215e29,7.493823021378079e27,1.815656032017699e29,-8.989080324066868e28,1.8992154971240202e28,-3.464568892523798e27,2.97069020532982e29,-3.3141023960160344e29,1.8515248610856652e29,3.9082720580479676e29,3.9915088674643466e29,8.275353187525508e28,-1.0384686957589113e29,3.0156331560419496e29,1.5367860296574683e29,2.4408335079547918e29,2.5458085036597756e29,3.9026433749897056e29,-3.405287137117742e29,2.5228838700160146e29,-3.639869511562671e28,1.9897207605243404e29,-3.821733747776085e29,4.3306571390058484e29,3.3128866699886844e29,-2.8733416426000112e29,3.3128232013831546e29,-2.408357793652097e28,-2.881858902788515e29,-5.499576958724199e29,5.6747926223900454e29,-4.7371093332398456e29,3.264585172233938e29,4.9228026058685644e29,-5.466231006726041e29,-4.4776848082407865e29,-5.6397160175232455e29,4.217499415554007e29,6.085829667794931e29,3.1262776360516075e29,1.5242961258889154e29,7.730242396384844e28,-1.084739575926024e29,-4.929288776232786e28,-6.901552742369221e29,4.620212251112209e29,-6.84565201247024e29,7.353906338816711e29,1.1290242287504417e29,1.2912114499740286e29,-6.700847633375437e29,6.952301937119368e29,4.201051696436161e28,-3.925261621496058e29,8.740081084210051e29,4.453032921832251e29,5.725643064677586e29,1.5104092516674e29,-8.192356841010437e29,-3.9518217217529915e29,6.635283052705912e29,5.671907067574353e29,9.836490666635872e29,2.5114486477718295e27,-3.159846105958438e29,1.2801054829269454e29,8.21578809013048e29,5.813772245770218e29,4.5820279513103624e29,-1.7956022194062042e29,-9.745114764138937e29,1.107820784352891e30,7.665968627369747e28,-1.1644466430700491e30,-9.005450124137746e29,4.192841106727055e29,-7.757736675179419e29,1.6775470241223087e29,-8.481873418606297e29,-1.5358647904039901e29,5.083047184240614e26,5.734505624303317e29,2.8724321148154105e29,-5.782935192637079e29,5.824841850595383e29,7.49936807132593e29,6.815412999828492e29,1.3281911874228908e30,-7.081169651597102e29,1.5528100580544713e30,5.487833377754599e29,1.2612550804110131e30,-9.959840390325701e29,-1.454699966505635e29,-3.403266719841711e29,1.8025656699061163e30,-9.62398644164265e29,3.005034843391775e29,2.2376484009788645e29,-1.2299715558611179e30,-8.173875387543078e29,-6.950372944858446e29,-6.1782550690190185e28,-1.3399049230363193e30,-1.7704699738790313e29,3.9567027597496856e29,-1.3267221914363316e30,9.676975171473633e29,1.8185515982503355e30,7.387379983604565e29,-1.0871848739592517e30,1.8348914396282468e30,-5.319206737594971e29,1.4202421238743526e30,2.3265157824000986e30,-1.488655387122072e30,-4.159789074818791e29,1.1331452113064509e30,9.754535318588284e29,1.0843642989063633e30,1.840585933585814e30,-2.0161403987126074e30,-8.758340775347374e28,-1.090846559151137e30,2.8511182614894904e30,-7.235557034548262e29,2.4457551583032385e30,1.0636107449189027e30,-1.6483380162788722e30,1.867500702455077e30,-2.837714598695968e30,-2.4234143602724876e30,3.3951221865949676e30,-1.219378267808881e30,-2.8137814942450573e30,-2.89858250255629e30,1.3547053484986788e30,1.0015309684822807e30,1.0959288077389331e30,3.247354276969107e30,2.57127883284819e30,-3.7104079247302785e30,-1.8692858325434654e30,-1.22964733706787e30,-8.583093755168081e29,-1.879626681772994e30,4.355595767507224e29,-3.0187711874592825e30,-3.205822234899156e30,-1.9578026254770113e30,3.6986635126241773e30,-2.4081299111350999e30,4.401332000230612e30,1.055441655366448e30,4.020829852061825e30,7.87607993481877e29,-1.0125737502658231e30,-2.0025999761857412e30,5.419564883373778e30,6.565252246711549e29,4.9285823290964145e30,-1.6150319588327617e30,2.9820270960979154e30,8.761317377388856e29,-4.397726681205066e30,1.2171159142531997e30,-4.589873502090343e29,2.2641692111466604e30,-5.964783778927968e30,4.5124915204183573e30,6.260189034191172e30,2.5066804861399923e30,1.2641441864463009e30,-2.7195025075080457e30,5.474824278125453e30,-2.8886185359510264e30,4.7238147760015435e30,-1.0456942375986227e30,5.757574497908931e30,1.158828462554845e30,-6.593893663882676e30,-6.870925664539376e30,3.343067956422546e30,-3.761734381559292e30,3.8128723215183096e29,7.460463780640638e30,-7.321750423172236e30,5.592819140455164e29,-6.085033212353396e30,-1.375397020595748e30,7.70091187260707e30,6.694505306294284e30,-6.493925774470013e30,2.7191703551391066e30,-2.4361692832480592e30,9.59123301441183e30,-6.122597559883372e30,5.078945802456988e30,-7.699082163379084e30,-9.634440023204857e30,3.348523838646467e30,2.801070243714719e30,-8.178045879389294e30,-2.573557053555254e30,4.005708607910085e30,-8.180491536322374e30,-5.781852146218432e30,4.018514759117263e28,1.475577227605481e30,-5.981251766442759e30,-7.023026666534191e30,-3.417553502946462e30,4.947792160370091e30,-1.2694394477635132e31,1.345488256264773e31,-1.4016615989360765e31,-1.2694203165124178e30,-9.389276516079018e30,8.036556223776147e30,-9.673024704126588e30,-1.0740381079023975e31,-1.0637544559757094e30,-1.1924375221460692e31,1.236375447489635e31,-8.201405953001707e30,2.564788110122679e30,-8.048319676463907e30,-1.2414902917398426e31,-1.249171443719928e31,1.2300804498543197e31,1.777980501091251e31,-6.525224259476926e30,-1.5643211172542414e31,1.7502933192926908e31,1.6081837265192452e31,-3.688355304391778e30,1.6389630987792156e31,1.9344707500593403e31,1.0094342605817204e31,-9.610245186314e30,7.418556971566607e30,-4.4751852785508695e30,1.432808001074882e31,4.962197418205164e30,-6.723836264529774e30,-1.7801435111677054e31,-2.250808555889171e31,1.090167112617368e31,-9.187512841414435e30,1.9599239578358345e31,-2.32763143959273e31,2.291918803740658e31,-1.4755487271792835e31,1.7188017688323854e31,2.057566841112215e31,-1.6957042739079922e31,-2.1537240754488706e31,-1.913465784836118e31,1.8881924652215825e31,7.060791091287313e30,1.0807565922523238e31,2.229367047552486e31,2.9012819734651986e31,2.4648781282567757e31,-1.7874232997756788e31,-2.6970663554532727e31,7.676813145318872e30,-2.0954093624732837e31,2.7673769975517317e31,3.5114157125071615e31,2.3404953472309398e30,-1.6986642078847366e31,4.922972308830493e30,3.404864133973459e31,1.234505843709601e31,-2.648391616963293e31,3.1724732908095946e31,-3.887900841962533e31,-1.8507112917879964e30,-2.918483778952495e31,1.8744177226477295e31,-3.8155340588300733e31,-2.956360633806841e31,4.673589046131289e30,2.058830410378876e31,2.3691488536602634e31,3.2308126658719017e31,-1.5230434331767375e31,5.018242856524752e31,-3.5716161079761834e31,5.291534561588147e31,2.6857070466670097e31,3.65161483980787e30,-4.558792049491196e31,2.4374981345089796e31,-2.9237972497148654e31,5.318261010037859e31,-3.7454922818338966e31,-8.990948756700014e30,-4.2577938198161276e30,-4.8895043459939905e31,5.064047605118967e31,4.210223193277202e30,7.662933467983877e30,-3.515218690904214e30,5.842811988887335e31,4.840228529586498e31,1.3421331244375965e31,3.419392037332932e31,4.86934816758872e31,-5.509490830465813e31,-1.7118707553233708e31,6.851738440178527e31,-5.391406824968478e31,-1.3263950863326893e31,-5.865737695452761e30,4.537861674991044e31,3.509585398816265e31,-7.185578469561828e31,-7.830194157971495e31,-6.403054326494458e31,7.342482292052808e30,1.8705173652759068e31,-7.953071312558437e31,-7.803606010635547e31,-1.5421923837017168e29,-4.348188951018754e31,8.835473038279745e31,5.034000962798265e31,-8.804128976769433e31,3.553795332469244e31,1.0585839014014195e32,3.0577496155204613e31,-8.087882982836615e31,5.151270635863507e31,1.165839413261367e32,-9.402287096642293e31,-9.890022899292209e31,-7.1643956713505405e31,-5.6972713437452415e31,-1.2829811336178609e32,-3.293120219044512e31,-8.770855469651015e31,1.1634753346425943e32,1.457929479606474e31,-1.3652532746318493e32,-1.2714631654070317e32,8.776308208667805e31,-4.2589958547585705e31,-1.959110229866652e31,1.3637478234871996e32,-7.831559760577332e31,-7.559704742957967e31,-1.2298765040685507e32,1.2780830497671102e32,-1.5650926778908358e32,-1.4958091391687214e32,-2.6497516585103593e31,7.282258201637721e31,-8.933691007568516e31,-1.1746646684586194e32,1.4217838065258162e32,1.0128072966002853e32,-1.8081377359459312e32,1.314209428391687e32,5.48234464297153e31,-6.281625465039414e31,-2.021684713860233e32,-4.860353759490787e31,2.6911324639602763e31,-1.9239263298110468e32,1.1268235084997802e32,9.66740017675083e30,-1.7128910161795763e32,-3.4237477970610035e31,-1.762001064678683e32,1.2039163211603429e32,-5.928586122037067e30,-8.96244409926223e31,-1.1332365214736063e32,1.4479066624923113e32,2.0104112388071626e31,-5.223252980585329e31,1.703181310852694e32,-8.642738346991535e31,-2.6930275277180714e32,6.559161466870312e31,1.4361008732223483e31,1.572250292455479e32,-1.4131906650859298e32,2.873360187522084e32,2.6311094420875083e32,2.3722621761450006e32,1.617940048025732e32,-3.056888086624371e32,1.711334113152044e32,2.674018378130451e32,-2.042283068973286e32,1.7290293054448415e32,-3.4841113975156734e31,2.2463849512441026e32,-2.7981609395513003e32,3.1391350819813115e32,1.2208302572314728e32,3.1359083138976617e32,3.0459145218886307e32,2.798468296851679e32,-3.768950278437699e31,4.282739834854261e32,2.1413294909477225e32,1.8343337077459967e32,-2.4336046680143287e31,-7.283182304534235e31,-2.910790078322402e32,-3.1022812201555235e32,3.992630134072781e32,1.68982993410087e32,1.0375913397571065e32,-1.8595136015731925e32,-2.7650394669439576e32,-3.9130913259799085e32,-2.7290506157206203e32,5.0087781279259566e32,-5.231726486726106e32,-3.1476052998438594e32,-9.134872705343537e31,-4.498912019364372e32,-3.803388174548536e32,5.666491028523132e32,5.89850613754226e32,3.858995280544449e32,-5.328121395878898e32,-6.2169526726792445e32,6.8272291616819875e31,1.4290482901329133e32,-4.45750524618785e32,-5.624483467571294e32,-2.775678981297222e32,-3.100243648222112e32,5.272397749433975e31,-1.3751393864143299e32,-3.093972514782476e32,3.0550180234525256e32,-2.603896038317655e32,1.331361087635986e32,-4.2151753886476384e32,-5.901884553280722e32,2.4950882657053223e32,3.802152168790562e32,-6.1823065995422694e32,-6.891293429141596e32,-4.284810676426228e32,-3.0113558782669302e32,4.408428273899168e32,5.103725034089047e32,-2.3636463068997055e32,4.393016694122589e32,-2.94504581349074e32,-3.3864519035985316e32,7.961588533456852e32,1.0583499887624339e33,9.672825545687064e32,-2.6882388274754795e32,2.4303267865470256e32,1.134974763374081e33,-6.1514080030179686e32,-8.368880864644561e32,1.0908368623571378e33,3.3448327463340194e32,1.0472530942502797e33,5.165702115299607e32,-9.526364859639211e32,1.1820101404242242e33,-2.8949003442056497e32,1.268619752536485e33,-1.0158176186051913e33,2.964118794361636e32,1.2064787990132243e33,1.1393988515894772e32,-3.6788560488715744e32,6.602566352641493e32,1.326568963715473e33,-5.9663985411452275e31,1.8912018442643492e31,-3.75952370353777e32,-8.238140469670583e32,2.78524690380398e32,-1.0174814873892433e33,6.855867453779871e32,9.488856823873913e32,1.0894390733102797e33,-3.12898203937786e32,-5.197876563776897e32,1.266932440262939e33,-1.4849106245478627e33,1.7031227795002115e33,-1.680970925694734e32,5.777326508234188e32,2.1603125277376392e32,-4.695047370626125e32,8.058739746602395e32,1.0591773195649388e33,-2.001808039104457e32,-1.9822773299040352e33,-6.968403940476158e32,-1.0083081969556338e33,1.0015628937953251e33,1.4117581170039061e33,-2.4240221513550763e33,2.210025955949019e33,-1.3255868130368048e33,-9.204352090048429e31,-1.5205950198927884e33,-2.47284960135459e33,-8.070001132397269e32,-3.8523937234997955e31,-7.27416197706673e32,-2.5460587059697176e32,1.1738928902153775e33,-2.7521226845171753e33,-1.1935439503989936e33,-2.7736993604319e33,-6.202801567319229e31,-1.8998082403669218e33,1.7808982193783744e33,5.9455045311337295e32,-1.8342265098757198e33,2.783103990910351e33,2.0226911204265458e33,-1.2251100287182266e33,-1.4522364544937775e32,-4.429956945787447e30,-3.307673964402305e33,1.0063108580734992e33,2.0797799632782304e33,-3.5453748546506184e33,-1.6617522160698382e33,-3.379734454089107e33,-3.556841583749509e33,1.9905023582675522e33,-1.0724033935734113e33,-1.1404451285293209e31,9.165896063012422e32,-1.6795576623973848e33,-4.3750623855053187e33,-6.572722713144421e32,-3.66810639654044e33,-7.63669890727165e32,3.421804608384181e33,-5.515718829432205e32,1.448185121629898e33,-1.2605466813127902e33,-2.6866879594056385e33,-3.681597467088572e33,4.428793006515432e33,-1.1440199270136246e33,2.8430509278277356e33,-6.552435970750632e32,-4.7613095812826716e33,4.5455022795991396e33,-4.3747751834162045e33,-4.151625659359671e33,-3.5177892177852026e33,9.67311878273387e32,5.999383008607285e33,4.950724310813649e33,1.0423013340931382e33,-6.568242453399742e33,-1.4995113535987093e33,1.892282493383096e33,-6.290444994763985e33,-2.793433053113138e33,2.716120293324658e33,-5.241067363292534e33,-1.6704218196499636e33,-1.7257479906282107e33,-5.929819443979721e33,-2.1568921767803462e33,-8.053911625706677e33,1.922618678273299e33,-8.094448591263096e33,5.959599329564771e33,6.763487261545734e33,-4.2084013033814163e33,2.2921764306685213e33,-5.524122353275136e33,-2.1745037307492396e33,8.163140027132983e33,-9.437556588645927e33,6.843614787498539e33,-5.994135999750774e33,9.402708576540043e33,9.107867159443405e33,2.5748003080324423e33,9.046447383364281e33,1.0313072969239982e34,8.021355040613511e33,9.836121906784189e33,-1.9138727866382528e33,-6.875754186798466e33,8.528105795694981e33,-1.0844623377128456e34,9.768851780821907e32,7.602210826232188e33,-8.429078639162406e33,-6.743454296859998e33,1.0295207018593015e34,1.945341377179392e33,8.966309334921141e33,-1.303215503410863e34,9.85011681892831e33,1.0621891967320191e34,-4.927883698118814e33,-7.184377590352469e33,9.073551461554414e33,-1.0906359446887618e34,1.528552281825808e34,-4.4913925394519953e33,4.378751446822389e33,1.4015270068067272e34,-1.4999160052490507e34,-1.3038541566771303e34,1.1519321743519656e34,-1.6644944389478613e34,-1.6137673699580642e34,1.0858815121738824e34,-8.597951610651502e33,-1.6331933726425383e34,1.1432835538555062e34,2.709436964537566e33,6.371569681418434e33,1.0143512941029083e34,1.69846029498175e34,-1.0610744317266426e34,1.2004158484025697e34,-5.542347925503515e33,5.039304181869685e33,-4.150658596075232e32,1.7257191156767944e34,2.4326398233505536e34,7.924022623994717e33,1.4953073865965486e32,1.74832278664811e34,1.1438465689853732e34,-9.362549182695606e33,-2.1703988144244723e34,-4.010775317569859e33,-1.9359001655727802e34,-2.656116968238484e34,2.1973564443079586e34,2.0635619893600614e34,5.0112471993343113e33,-2.4582973686047824e34,-2.557332076571597e34,-3.089461840398457e34,3.1907236024959462e34,3.406066986149756e33,-1.9958870879534338e33,2.9324534100398766e34,-3.228171041096321e34,-3.090824069617687e34,1.7729939722275373e33,-1.6536632063681378e34,1.6304721018996802e33,2.399805444512572e34,3.7133910478385245e34,-3.8898903489396376e34,-1.075425994396082e34,-3.5999182451935244e34,2.3664437032178544e34,3.807410860706194e34,2.624873342350984e34,8.342995383680599e33,1.2033522421757546e34,-4.316274531846717e34,-1.404254188713273e33,-4.231720751283447e34,4.647515099918463e34,2.32243369688122e34,1.5939009082076124e34,-4.781572617124708e34,1.4396782143194358e34,3.7146559749706663e34,-3.997689177208577e34,2.6212174578269663e34,5.0997192458129255e34,-3.638194113268189e34,-4.338185575366052e34,2.869601213541295e34,5.860016956924576e34,-5.665612338683247e34,4.360044625403738e34,-2.9993363393063715e34,7.781108017189397e33,-5.189754129694135e34,-3.9674096590236724e34,5.964082158035031e34,-7.916162942685294e33,-1.0336869890615165e34,-6.419846619482478e34,3.6178609481229267e34,-7.956191114885568e33,4.8810815180235714e32,7.756802921428087e33,-1.940449595217154e34,6.927408968053704e34,-3.442860792409388e34,7.065491399709678e33,4.2274197762049576e33,-7.568579709184922e34,5.586051417886423e34,1.296378236779886e34,-6.895637484533452e34,2.010651070346961e34,-4.221087836698017e34,6.281523160900855e34,4.887663088139434e34,6.425290584599239e34,1.2404552858572003e34,-6.506006751040725e34,8.39502303247567e34,-6.929680340437785e34,6.408155761339475e33,-5.643501244053563e34,-9.40730566687593e33,6.672419069113733e34,-9.363822032644e34,5.567672464887176e34,-5.615207876867688e34,1.0439901906968832e35,8.71143159334873e34,-3.2223589126118763e34,7.40665764722241e34,-8.857355013419533e34,9.825348857386312e34,8.723064268309886e34,-2.598951435001366e33,8.80604289396717e34,3.5812768489059494e34,7.2453966452408765e34,1.9658560862314157e34,-2.5331749146449822e34,1.1975630898584389e35,1.4414365843512368e35,-9.341677761221262e34,-2.0107440705924124e33,-1.0105891819441196e35,-3.8937178119531e34,3.269491746491612e34,-1.5699593211594387e35,4.460501478887684e34,1.2158742037435325e35,-9.272620514069767e34,3.97962688927138e34,1.3429219968919278e33,1.1737204637370056e35,1.7187755595140443e35,1.7547146424529523e35,-1.3527634345132407e35,1.5326304772148273e35,1.4848807530547148e35,-1.33006664569217e35,6.778200550294653e34,1.4830155240387227e35,1.810963270641173e35,2.1352203713633027e35,-6.530801699675579e34,9.452397137630884e34,-5.306666672532294e34,-2.097677116203887e35,4.76900306914182e34,1.1942782902405975e35,5.459090268161377e34,-7.85801058554586e34,1.6933565157877842e34,1.8934837594487177e35,3.6177240319545818e34,1.3793320046011804e35,-1.1387500441200376e35,2.7771247652794033e35,-2.7342589621622794e35,1.3574976143290774e35,2.1101784784494114e34,1.9844450186201257e35,7.299001429645996e34,1.4991094873134562e34,-4.0916973534398774e34,-3.080471771280362e35,3.0555038081456167e35,3.368152002355344e35,-1.4181251830594617e34,-2.652824493392399e35,-2.8351526599272882e35,1.2730498014331702e35,-7.930260232470665e34,-5.592471374930157e34,1.910753122031952e35,-1.2733941468344979e35,2.885493045966414e35,-2.6407489330027875e35,-2.6212657374884985e35,-3.912163069020851e35,1.8974835437156488e34,-3.4869043221622866e35,-3.4263953976052675e35,-2.767497157041076e35,-2.1038705797380335e35,-1.9655344446504085e35,-4.30868794010996e34,2.215261216754557e35,-1.8047543576153365e35,-5.233133034198742e34,-6.266063270514244e34,-5.0897062915991696e35,-2.302453196094349e35,1.825630532779431e34,-1.2919662184798728e35,-2.6163623065104906e35,2.460757650638858e34,3.483236454378689e35,-4.2087053662138656e35,-3.955958812695486e35,2.8663632080569386e35,4.595051201053549e35,-2.3614405437902817e35,3.745811707115377e34,6.4151320486368634e35,8.89047535640659e34,-4.277107792602181e35,2.0459141885068177e35,-2.3808999708558165e35,-1.9254810432321348e35,-4.292731190109181e35,-2.27497964232009e35,3.997204994100412e35,7.541579840787295e35,4.218595417740521e35,-7.576197001834653e35,-2.602653061409835e35,4.37470698529944e35,7.267951120475031e35,4.936737012000769e34,-7.413013132348898e35,2.320619025336432e35,8.280238260977034e35,-6.468864192313225e35,-3.541782501209417e35,3.537817131675578e35,-4.4610942045784935e35,5.7890045567926346e35,4.5459550933067094e35,6.1076978598022e35,-8.968479839950821e35,-4.8697070154576075e34,-5.985820385124882e35,-1.1728078543400444e35,-7.093301351310212e35,1.4788434680359247e35,-7.187158994032735e35,3.664150794353511e35,3.2378614871710424e35,-8.378977943073687e35,5.011534636632033e35,1.2262904094974454e36,7.033766140870493e35,-8.631165145764716e35,-1.1660292314046084e36,-1.260547240861688e36,8.421303212052057e35,6.899967303614857e34,-5.439177358900651e35,-8.567824606679437e35,3.365057350327537e35,1.6097276002278642e35,1.4720933276249125e36,-8.256862783908826e35,-3.404998643895853e35,1.4877732148117856e36,-3.7210172041389366e35,1.1155743606706494e36,3.475268874215442e35,2.5253578679905123e35,-5.0922946756685106e35,6.985591456653695e35,6.63462822594646e34,1.6488911307318184e36,-8.782729412936129e35,-1.5933106732521616e36,1.0033289706228406e36,-9.619892999861478e35,-5.6962113444334905e35,-1.0416960798301608e36,-1.6136002133904396e36,6.976499232723558e35,1.4989369382790205e36,-1.8576004531362197e36,-3.6348082482255404e35,-7.605200847567875e35,1.8589032810406043e36,1.4033749393244904e36,2.1046993063179327e36,2.094836984648157e36,-2.5194551718127934e35,5.807669127317745e35,1.5616171898579055e36,-2.2997585670590764e36,1.6510516827235824e36,1.847537525758958e36,-3.1160014426894776e35,5.623963183036733e35,-6.013406442889911e35,-1.4829683436679455e36,-2.214508747281078e36,-2.3217656153043386e36,-3.927485399510297e35,1.3424410349037448e36,1.429666329685874e36,-2.5418703243231665e36,-1.0665719798400645e36,-2.372072487830721e36,-3.0942935995999505e36,-7.457962438069741e35,2.800446486039346e36,-4.671669587894593e35,-2.5571679752399895e35,-1.9543177571565328e36,-1.4571621465737993e36,-2.454581330098376e36,3.277864935232851e36,-3.0152448096456185e36,2.0871676985167763e36,2.184172283854366e36,-3.3277615643337344e36,-1.7670291945947881e36,1.5675886164666056e36,1.9436809009700177e36,4.083490484418797e36,9.807522718891009e35,-2.1218114802267386e36,-2.9830525057401725e36,-3.516683336237548e36,4.3845429239910986e36,8.69581453409473e35,-9.285257802131604e35,4.5485493402600765e36,1.4736636298059452e36,-3.428778976874509e35,4.7717813433096675e36,-8.707870683584526e35,-5.086982981969067e36,-1.2799075138818362e36,5.238636776964121e36,3.531035676333332e36,2.3655455133464708e36,6.308867671805419e35,6.198361419152961e36,-1.8052073446345118e35,5.613089672328788e36,-2.5399659565948924e35,-5.76006995647345e36,2.8618749326505055e36,4.245458122381795e35,-2.773331122787814e35,5.921213066949163e36,-6.896858449938919e36,-5.256138515748009e35,-7.537956895371843e36,-1.418803197867218e36,-1.8640740278389352e36,-5.690441711954714e36,-2.8279145730703913e35,2.943904286078624e36,4.1202146392200586e36,9.784319563076269e34,2.360837459017223e36,5.78500971438234e36,6.454942140368056e36,-1.1578024166936147e36,-2.2923543783594684e36,-1.3903409558529437e36,9.533314840710765e35,2.5412333298965518e36,6.980934742173756e36,-4.746571892735579e36,-9.229284214509552e36,-6.69302086724752e36,4.5935227313423236e36,-1.5562388652737872e36,-1.086856243382719e37,-3.862286405416921e36,-6.172456979137297e36,6.751654461197826e35,-1.479343972145568e36,-5.1155200153687546e36,2.2568864653030327e36,-8.535548479378051e36,6.185345816615117e36,9.08564292204589e36,3.481328877909833e36,-1.488697332099352e36,-5.684616857446666e36,-6.338294833610955e36,-1.0400625694210742e37,7.528491348339939e36,1.349602183292024e37,9.457675555502072e36,1.179779342391489e37,7.167960108779629e36,4.325460264815661e36,-1.5340082034626448e37,-1.5174614334128057e37,1.0842786026522149e37,1.6256432426965228e37,3.049089813021112e36,-5.729982269477033e36,-6.32993911467955e36,8.604403457030648e36,7.206314779165434e36,3.6122252112387996e36,-1.532065275387675e37,-1.1698753150169658e37,1.8280557325831454e37,-4.5029975835914753e36,-8.300791630896485e36,1.0818617000178197e37,1.389648786933954e37,-1.2597045859708188e37,1.9683314127032009e37,2.7977009132955766e35,-1.9511780718411525e37,1.962094159763633e36,-5.767243591220142e36,1.2470951386852886e37,-9.852880841930425e36,2.3676227173112698e37,2.1058100217738527e37,1.8129388724103638e37,2.607352178802351e37,-6.19241740548849e36,-2.296518927493868e37,-2.543134013515269e37,3.181291509555664e36,2.8422063828500144e36,-1.5239293670703502e37,-1.2103702866761966e37,1.3295746982240783e37,2.892770556756978e37,-2.694637782061786e37,2.8434122354834815e36,-1.6783811838527579e37,-1.2058656902682856e37,-5.077765260629507e36,2.8745777424027426e36,-2.78563886923049e37,7.603586336072159e36,1.5844671623697895e37,-2.3394390415163955e37,2.2429158148029774e37,-9.882396818506139e36,-3.803805690129002e37,3.719802794863918e37,-2.714511754642044e37,-1.3699344115642647e37,-3.066215075422365e37,-1.9640469755132845e36,-1.0285542034469022e37,3.3707810621633196e37,8.681627147033301e35,-6.953549052431726e36,-2.736500421953603e37,2.2405795347467567e37,-7.944964484257296e35,-3.706910534729477e37,5.921675759418246e36,-3.9146041837817102e37],"x":[-0.16179752,0.35643134,-0.14818752,0.07873617,0.24858537,0.12760592,-0.38228747,-0.09506531,-0.3331317,-0.03456626,-0.20235823,-0.4202218,-0.124457836,0.15918101,-0.19013418,-0.30910313,-0.21099393,0.23611812,-0.2971486,-0.62675333,-0.29761013,0.14880961,-0.065639436,-0.56863964,0.36786708,-0.5679317,0.46927786,-0.34768555,-0.40874138,0.29557174,-0.6359983,-0.48393503,0.31074354,0.8337381,-0.66802555,-0.3125618,-0.86792284,0.5737491,0.6782563,0.7819615,-0.6598969,0.46001706,-1.0187931,0.04435659,-0.29139575,0.10276508,-1.0536778,1.076917,0.9245087,0.19748624,-0.25264943,-1.2082161,0.36444128,-0.10402578,0.3498199,-0.15798342,-1.2006987,-1.0426382,-1.1060058,-1.314219,1.0281905,-0.3303811,1.0542043,0.78625005,0.39252147,-0.93080264,-0.62137634,0.8012649,-1.099418,-0.8298394,0.8663319,-0.114460856,-0.9659957,-0.3422705,-0.26511607,-0.45417243,0.863137,1.4318587,1.6171482,1.7687427,-0.7974947,0.1325526,-0.2923649,1.3173559,0.7223547,0.01659968,-0.88881415,-1.6081249,1.6822547,1.4994298,2.0502992,1.0432202,0.348768,-0.78995246,-2.2355072,1.276773,2.1908038,0.77681226,2.3629923,-0.23676668,-0.44516784,0.0415701,-2.0240617,-1.205047,1.6064328,1.2507607,0.16653697,2.687986,2.4181385,2.5159452,1.4299246,-3.2557666,-0.18423842,-1.07895,1.2417812,-1.8412621,1.2070459,-0.29406375,-0.44227916,-0.006209576,-2.3119078,2.0555606,-3.689976,0.26515105,-1.034305,0.7407417,-0.8522251,1.2458487,-1.8742554,-2.912737,1.4577116,-0.3708805,-0.16702254,4.312346,3.5647945,-4.204099,-5.136242,5.074392,-0.68937325,-3.1920567,-1.2817076,3.24081,0.112012304,6.0951276,3.5303562,-4.006363,3.0925956,0.4102917,-2.1426222,-0.5478557,-1.8352547,2.1323783,-3.1983302,4.6672244,-5.4615035,-5.592279,-3.3093054,3.9901001,-3.3547373,-0.4873367,-0.20530953,6.230545,2.0338707,-4.870494,-7.4291553,6.992902,7.103274,3.6454792,1.6783993,5.415551,-3.801684,-7.4962215,-5.677573,-6.6660724,-1.0537452,-9.231131,-8.490322,-7.1478066,9.264311,-11.152484,-7.4939485,-3.377756,9.386359,-8.117944,6.6426573,-5.533157,6.8132067,12.287913,-13.289458,-4.5535965,-3.2192013,0.91091985,-8.1222925,8.983494,1.0237349,-9.197865,-13.039495,-10.081033,-12.532497,11.511327,-0.33379525,9.5839,2.6157491,4.292359,0.3115489,-17.511463,-15.608548,-11.754183,-9.971382,-4.5200634,-8.853095,-14.950992,-8.336721,-17.335451,12.349981,14.799893,-15.171445,13.057123,4.0870976,-8.339643,14.555303,-16.220255,-20.625128,10.843497,-18.743698,-15.154316,16.58303,18.839737,-26.73214,0.41340134,12.408072,-9.90032,-10.836773,4.929945,-11.648025,-24.259953,23.037773,16.567635,27.484777,-16.125696,-1.8222078,13.035275,14.99929,7.339444,12.026505,-17.747118,-13.491938,-34.79183,29.324852,-17.906141,-22.937933,25.02956,39.212532,-39.613865,-19.234043,15.651295,28.618736,7.692035,-18.599648,-2.084896,-32.6896,17.360855,39.520245,2.3126724,11.180535,2.4518766,11.695776,-2.4751587,9.42112,46.566998,-11.516925,21.173866,-28.82286,0.5940974,30.219975,6.5886073,23.056946,-16.891441,-4.998417,-10.4335,-19.62437,-35.731255,-17.535755,-29.106049,27.741356,-60.96917,68.66195,-42.321995,-49.27685,37.64821,30.123665,58.502693,-20.720156,-46.62308,-5.5712223,-3.0893066,43.084408,-70.35745,-53.735836,53.566277,29.011106,39.157555,-0.9317222,-50.868923,-60.28681,-94.23501,-7.9137864,11.70356,-72.7079,34.026695,-112.77991,20.242289,10.999913,56.474438,91.78223,-114.34927,118.38442,-22.065239,85.339134,-65.04411,11.968924,105.927246,6.3744864,98.03463,1.2926404,17.06758,-132.8379,142.53073,-98.3789,-129.20786,61.255207,-33.561783,-164.63739,-25.795145,-23.660904,-62.327625,68.30801,-50.273952,97.841095,57.00684,92.39222,-61.23642,196.30858,-164.85292,-97.16011,-109.90614,-186.37538,-22.403584,-55.55733,-86.09688,-85.26061,195.14476,-90.2379,-29.463457,-229.58649,169.71022,-32.74147,184.97305,-37.36298,95.722336,221.41585,-82.09771,62.02625,132.30342,12.950131,-39.63522,-143.54288,217.0603,-109.407585,194.97153,-312.06543,247.07501,249.44676,268.43192,-122.2707,-209.71288,-264.43774,-333.19818,-363.81577,195.622,377.94543,202.08774,-391.99628,-336.56467,271.79355,-410.13962,180.9409,-55.949215,287.4502,15.454557,-257.1236,-445.26974,453.39432,117.22855,295.18283,-166.40248,-33.147415,378.89072,-286.26352,108.55438,-288.03052,415.89542,57.254166,175.93376,-36.990585,347.1171,-31.088398,-544.21387,-604.4914,-137.8574,-205.14833,-392.72775,90.576515,-171.28712,-645.0107,710.9929,356.73462,-639.49646,-331.24994,623.3356,-104.68765,-670.25604,-797.2662,-547.416,352.16922,-294.7647,100.71077,-606.0489,-332.6695,-731.63696,-427.1397,447.82593,176.00461,-518.86786,-29.83962,66.78698,847.67664,-70.45343,-507.48645,-279.93695,1096.4979,831.0347,-1031.8434,-786.27374,259.74063,13.833114,75.194855,-860.8506,-166.18866,345.3019,-461.38684,-668.47156,940.7341,-785.7249,-756.0001,938.4341,344.50952,657.04504,-332.55838,-83.219574,19.729668,-30.043127,534.8124,-836.06287,-1003.07825,-1633.3411,-23.209566,-1363.371,-1129.3463,-245.77686,755.3812,-831.51105,-1010.9941,-1010.9793,457.10065,-599.9288,-1545.3822,-138.28658,2069.8547,1448.4043,1735.1167,1115.9485,-1347.2516,1020.4844,1551.5435,2179.0312,2051.193,-1728.2969,226.7356,374.78168,159.13223,2103.327,1059.4865,-1720.023,1259.84,2001.4462,-2236.9385,-1690.0162,2516.221,-2787.542,684.39795,-1831.5734,-3172.367,-3244.5674,-2280.9155,2180.4814,3300.2847,-3386.251,3018.1528,2952.4666,247.63303,425.46014,-2579.6,2142.0479,-2807.6914,-259.7676,1548.5219,2483.716,-657.7246,-1295.8834,3302.1287,4541.843,2245.2056,943.2781,3420.4473,4876.486,-682.38654,-1263.4093,1171.3928,-2185.4978,-4483.9688,-5293.4805,2095.433,-4220.451,-2434.9988,-5389.9634,13.471128,1268.7275,1031.8776,-3325.1096,2104.7485,-324.84882,-4541.1406,4867.031,-2767.5298,3983.39,-286.83252,6131.884,-728.5287,5390.0825,4614.6045,2953.2634,-725.4569,-4678.1567,-22.368248,2046.3947,-1275.5874,-2732.3816,7711.671,2167.5452,-1800.353,-1630.375,8262.049,-2577.7815,5111.763,2362.884,-4312.5776,6835.502,1131.3583,-9283.371,4547.7715,3587.4087,-8009.257,5747.073,-8286.282,9908.789,-2862.6504,-714.8558,10530.697,9324.705,-5229.182,3367.092,11562.925,4898.705,12682.027,-5656.273,4893.066,-4812.821,2037.1715,468.91217,-8038.3936,13894.49,-13067.518,13447.714,13726.87,15675.758,-5518.5767,12125.175,-6693.241,-2381.0723,-6808.64,-9952.717,8304.24,11817.681,13081.584,252.39607,19488.658,-12331.618,1852.4149,-17199.318,-7942.9854,-11106.963,-1514.3857,-16104.815,-10003.5205,4610.728,-23927.574,858.9973,22403.703,21681.469,-9466.4375,-22685.95,-6135.207,-8421.709,-24935.947,-27291.809,22929.22,27347.42,-24766.637,27158.383,-811.6821,-55.594254,16970.984,26201.254,-20806.246,-32454.52,21013.98,-7658.2627,26082.502,-8995.165,-18721.28,-10439.083,-20241.328,-11057.081,-12607.254,-38315.656,30271.037,16101.7705,9642.624,-27290.354,-43479.234,16966.404,29865.037,-9032.683,-19427.629,17245.18,2224.3381,-35958.82,41196.836,-20743.186,-20286.643,-33130.84,-23460.99,-54136.887,-12424.042,-19003.21,26049.71,-34968.465,18114.156,6519.593,36756.805,43095.215,-41816.07,-22106.393,34952.516,-9825.449,49677.78,-54033.168,45134.793,-30934.486,8920.67,55538.566,48141.54,-24129.598,41546.555,52027.023,74114.91,-68962.87,73544.77,-56788.324,47322.02,-82124.53,-54843.445,-15481.262,-928.3265,-88020.234,36448.312,-8048.963,-28904.006,-64393.17,70427.734,-30780.12,27980.36,-100942.72,-76025.734,-95616.2,-39941.96,-87132.53,-93592.59,-45701.37,-51513.395,87894.41,-38259.04,6966.729,-101443.48,120022.07,91228.195,72369.58,-80582.89,-122696.67,95609.4,56791.61,49551.504,88919.18,-80388.5,31580.697,48947.062,93502.69,-75521.36,-21145.717,-15803.2,-179386.89,64641.91,-160901.05,138574.44,-17854.322,-158329.16,-116327.82,-3548.3865,178981.48,115048.37,87326.04,74277.02,138729.48,134263.83,-193844.66,-170433.8,-25999.865,39168.438,64321.17,114319.36,-146480.02,-240536.88,-78764.04,242017.88,155551.47,113416.55,260747.28,-141187.36,-58831.887,10255.814,101782.71,271656.53,-276752.4,-116331.7,134301.5,69351.13,154526.58,174506.48,-13001.336,-80605.375,-214179.86,200576.56,-300156.0,-30907.826,343261.22,-45658.38,-141718.3,-189866.48,-273490.34,-173390.08,423788.3,390510.66,193692.62,150182.58,355668.75,-275257.84,-204603.45,-315092.25,67292.516,449028.56,475460.56,-406961.0,440392.88,18352.129,388977.16,530874.0,-434251.47,-356952.8,163337.52,173650.81,278801.9,-307909.72,-194257.75,101976.64,411556.0,272561.6,-151299.36,526053.56,-6997.416,266895.03,-636022.1,390340.97,213988.5,206719.88,418323.75,-265788.38,-241779.89,-102272.64,-202914.58,34607.49,-661732.4,-127796.48,898223.44,-325706.75,-160663.33,-513237.66,-710128.5,-813528.75,-442069.4,-184845.33,-424376.06,1.03619556e6,216726.38,-810015.06,-81171.49,49783.09,-956067.94,53319.934,-1.1174662e6,-1.1852511e6,15119.355,-57945.426,-40707.938,-1.2958386e6,1.03337356e6,10194.402,368873.28,-577455.06,595161.6,218882.27,-1.0572654e6,621363.2,1.0178593e6,1.478368e6,1.5638946e6,1.1765316e6,-198154.9,-1.00732006e6,1.4752609e6,-1.6097589e6,512976.3,-1.4766858e6,-1.3622149e6,49867.69,1.7276221e6,-1.6097108e6,-886409.0,680976.2,-812955.4,949375.3,568390.25,-523921.97,1.1344831e6,1.8627774e6,197538.27,778724.6,2.1561292e6,2.0126196e6,-2.366395e6,2.183463e6,-529086.7,143227.56,-417220.12,-1.2489251e6,1.7647438e6,-340128.53,1.5952044e6,691712.25,-1.3046654e6,-2.89101e6,-2.2316065e6,-1.801204e6,265969.16,-1.3241422e6,-1.4566494e6,235982.67,499606.12,-2.1557225e6,-2.12451e6,2.5784928e6,572549.6,-10838.458,-393009.97,1.9972826e6,1.1684845e6,-3.2426208e6,2.5763535e6,-3.4669232e6,-1.8428854e6,1.3817404e6,-3.1520962e6,-4.1156988e6,1.1153584e6,3.6239392e6,-585720.5,1.3234726e6,-2.2762625e6,4.6795105e6,3.8670355e6,4.5897565e6,3.5047505e6,3.8283942e6,1.0545834e6,-3.7948025e6,5.207976e6,-4.4438915e6,1.6033705e6,1.1635654e6,-3.971708e6,5.518783e6,957213.7,2.194634e6,1.091234e6,3.576854e6,2.6208725e6,917204.5,4.165551e6,-5.5861795e6,2.720419e6,-3.3739595e6,2.5210132e6,-404096.84,638828.1,-3.1869572e6,5.8379005e6,4.0810785e6,-1.721206e6,-6.635847e6,5.8311065e6,-4.0863412e6,543935.4,-2.3564115e6,-6.41265e6,2.1415468e6,-7.102744e6,-5.6297995e6,1.9998216e6,8.1036575e6,4.9848425e6,-543758.2,2.0412909e6,3.3782465e6,-1.0652002e6,-5.0354405e6,2.7609562e6,1.0640421e7,-6.717726e6,2.0147434e6,-1.1068244e7,-1.0070151e7,-1.076283e7,-4.9681105e6,8.1170865e6,-1.2305437e7,2.3168738e6,-4.312491e6,1.1488151e7,-2.4945335e6,4.5894945e6,1.290521e7,-5.225487e6,-6.4589655e6,-1.1080257e7,-5.1463405e6,-1.01609175e6,-2.6358338e6,401377.94,7.020719e6,-1.6011479e7,-9.140915e6,-1.0830408e7,-1.5566582e7,1.2669125e7,4.1087852e6,7.482704e6,1.6339529e7,9.545278e6,6.460817e6,3.239371e6,1.1503377e7,612778.3,-2.5357042e6,1.9802538e7,-8.234353e6,-1.9015028e7,2.7854555e6,9.494398e6,-3.760431e6,573969.25,1.8545668e7,-4.270651e6,641996.4,2.3369234e7,-1.7662332e7,1.3199348e6,1.4017649e7,-394033.25,-9.731749e6,2.7484012e7,-2.4802012e7,-1.6293711e7,733562.7,-1.9259681e6,76969.4,-1.0918796e7,2.6127598e6,1.6175091e7,2.0116968e7,1.0642394e6,2.3738396e7,9.877692e6,-8.3148585e6,2.3781168e7,-2.3083392e7,9.014563e6,1.7407276e7,3.6450675e6,-8.476177e6,3.1901742e7,3.014492e7,2.0724802e7,-2.2935358e7,2.2019546e7,3.393255e7,-2.6233938e7,1.0665492e7,1.6637925e7,-1.0940879e7,-1.1095663e7,3.7693725e6,-2.259723e7,-1.5710582e7,-1.5815967e7,-5.4071955e6,9.625777e6,4.9184748e7,-1.6603339e7,-3.271294e7,-1.4882322e7,-6.640677e6,4.857128e7,4.6810164e7,-1.4403165e7,3.978094e7,-5.688858e7,3.083245e7,5.8711972e7,-2.2309805e6,6.170885e7,5.5757468e7,-5.970643e7,6.2819788e7,-7.037986e7,5.6901816e7,-4.3207164e7,-6.1967084e7,4.2014108e7,-4.928934e7,1.3134689e7,-5.136802e7,-4.2015405e6,6.9511896e7,8.0404936e7,-3.2367848e7,-4.1287204e7,-2.7295688e7,-8.748449e7,-7.099345e7,-1.3226354e7,-8.647334e7,7.242667e7,-4.1923732e7,1.0425736e7,8.8013464e7,-5.06008e7,7.208317e7,-3.5014016e7,-2.271173e7,-8.827424e7,7.322751e7,8.4605864e7,-3.2202464e7,-4.9786804e7,1.1959817e8,-7.339072e7,-7.741903e7,-3.2238776e7,7.348018e7,5.0621925e6,7.2065736e7,-9.893092e7,2.7907062e7,-9.592043e6,-3.627767e7,-1.2152018e8,-3.303216e7,-7.275691e7,-1.2828764e7,1.1630092e7,9.448271e7,9.067733e7,1.5222374e8,-5.9994e7,1.5362886e8,-1.4033445e8,1.6187144e8,1.297122e8,-2.0366481e6,-4.0640812e7,2.4052706e7,-4.236915e7,-5.0563868e7,9.262394e7,-3.2682208e7,-9.026765e7,-5.8612604e7,5.914913e7,-9.354564e7,4.326944e7,2.015556e8,1.4493371e8,2.3282264e8,-2.1135406e8,-2.0778034e8,-8.716512e7,1.053634e8,-5.830539e7,1.1059779e8,-2.5165128e7,2.4260962e8,-1.7433453e8,-2.4723405e8,1.0026452e8,2.3334888e8,-9.580157e7,1.806798e8,1.4030453e8,-2.5346138e8,-2.2856742e8,2.4992288e8,2.0982195e8,3.0104848e8,-1.11043496e8,-1.674341e6,4.447422e6,-2.1730653e8,-2.495169e8,1.4193301e8,-1.4326694e8,1.6473283e8,-3.4409704e7,-9.3648e7,-3.244754e7,-1.958488e8,3.1781056e8,-1.438473e8,2.188341e8,1.8523149e8,3.452345e8,-4.5649744e8,2.720786e8,1.038017e8,-2.8771827e8,4.7007907e8,3.1910816e8,-2.0393824e7,-3.5564452e7,4.2361622e8,2.8912816e8,-3.9945597e8,3.9422442e8,5.613103e8,-1.9249274e8,3.9436908e7,2.5092126e8,-5.472655e8,2.4218942e6,3.6085654e8,-6.351452e8,-3.26464e8,3.6055952e8,6.588422e8,1.3974731e8,-3.791349e8,3.1842048e8,-5.7011424e8,1.9357712e8,-1.405514e8,-5.108633e8,3.5396714e8,-7.680834e8,1.627688e8,3.8630342e8,4.2600538e8,-2.33036e8,-3.695052e7,-4.1603014e8,8.1924736e8,6.0798374e8,-3.7067165e8,8.473816e8,-8.959955e8,-9.8110784e8,8.0000205e8,4.3677987e8,3.989835e8,6.2995834e8,9.430616e8,-5.825906e8,2.453793e8,8.6789754e8,-1.0405241e9,6.7719994e8,3.2763898e8,-2.9820346e8,4.4795818e8,3.204563e8,1.2356492e9,2.3586501e8,8.362931e8,-9.885702e8,1.3632837e9,-9.14409e8,9.026528e8,-3.0972003e8,-5.45769e8,1.4756468e9,6.303094e8,-9.42997e8,1.4343466e9,1.1702751e9,-8.158504e8,-3.4957786e8,5.704863e8,4.2431325e8,-1.5218541e9,-4.954538e8,-1.6128731e9,-2.6906397e8,-9.415214e8,-8.042167e7,1.4641046e9,-8.9123936e8,1.1873486e9,-1.9459007e9,1.8817997e9,1.1579752e9,9.575857e8,-1.5998938e9,-2.0013832e9,1.0250321e9,6.581996e8,-2.16053e9,-7.3029606e8,-2.1135186e8,2.4171494e9,7.854431e8,9.082958e8,1.5092986e9,-3.4665098e8,1.6006118e9,-1.3349101e9,2.826233e8,2.8447693e9,-9.0843456e8,-1.5626939e9,1.343412e9,-2.653844e9,-2.991158e9,-2.3055434e9,-2.255124e8,-1.7095452e9,1.48054e9,-1.4238813e9,2.7369078e8,-2.2238098e9,3.0734467e9,-2.8202465e9,2.4077338e9,-2.3044326e9,3.7160468e9,-5.039151e8,-2.0411223e9,-4.0124657e9,1.6896058e9,8.4059424e8,-2.6404001e9,-2.2615242e9,-3.938121e9,2.2326943e9,3.0646953e9,-4.1180984e9,-4.2599813e9,4.1624054e9,8.0660186e8,4.092277e9,-6.864011e8,-3.9250808e9,-5.240334e9,4.9021153e9,-8.486576e8,-6.0974784e8,3.0842017e9,-4.6893916e9,3.0207414e9,-9.8880576e8,-3.0723683e8,8.2552896e8,2.9905408e9,-1.1192918e9,-5.020728e9,-9.2690496e8,4.9540393e9,1.2222266e9,3.7211697e9,-6.0246106e8,6.698969e9,1.0462646e9,-5.198878e9,-7.360426e9,-4.7428997e9,-7.3309164e9,2.1659512e9,-2.2081341e9,-3.303988e9,8.408878e9,-6.513632e9,5.0617738e8,-5.886155e9,-3.4092214e9,-2.8630252e9,-5.4138655e9,-2.8992783e9,-6.497961e9,-3.3472676e9,7.986688e9,8.866511e9,1.110953e9,-2.3038323e9,-5.0098437e9,1.4416326e9,-7.0797885e9,-6.902111e9,5.3442406e9,-3.6753318e9,5.235516e9,-6.489614e9,-9.463896e9,-1.0553009e10,9.403872e9,7.4038436e9,1.085662e10,-6.828621e9,1.2331688e9,-6.712911e9,-4.7732465e9,3.460622e9,1.030779e10,-1.2387417e10,7.754579e8,-6.92764e9,1.2784942e10,1.1466131e10,2.3020355e9,1.4799037e10,1.0684546e10,2.6812972e9,-1.3626659e10,1.1659091e9,2.4010261e8,7.1302866e9,8.344554e9,-1.2752269e10,1.418213e10,-1.6454446e10,-6.1239337e9,1.505351e10,-5.686626e9,4.165722e9,1.8461256e10,7.036711e9,-6.100257e9,1.7229791e10,4.9143834e9,3.885691e9,8.840943e9,2.0399942e10,-1.6647151e10,8.738766e9,-2.5206591e10,-5.92711e9,-2.297409e10,2.6333207e10,1.8317662e10,7.3574774e9,-9.862938e9,-1.879147e10,-1.5562106e10,-2.4812323e10,2.1421984e10,1.769429e9,-2.6858406e10,1.4108291e10,5.9091103e9,7.143457e9,2.6647245e9,9.7466515e8,-2.403182e10,9.47232e9,3.0854742e10,2.6229064e10,-9.402214e9,2.6220372e10,3.3183715e10,5.281241e9,2.8914352e10,2.2777424e10,1.8417848e8,-3.390684e10,3.6903047e10,1.4812664e10,4.103027e10,1.8210339e10,4.2581905e10,-5.8543524e9,2.4236691e10,2.856247e10,-3.4247096e10,3.0829062e10,6.615405e9,4.485481e10,4.361479e10,-5.437824e10,-2.847222e9,3.3305496e10,4.797675e9,-9.99475e9,2.0242055e10,3.9209124e10,2.5260577e10,-5.328965e10,5.0097713e10,4.0848556e10,4.0086118e9,-1.786192e10,5.1251204e10,8.384714e9,2.3834962e10,5.933647e10,-4.39384e10,-2.3086885e10,-1.1640435e10,7.194146e10,5.2859056e10,3.5733025e10,2.0498057e10,7.03659e10,-2.1583176e10,-4.9044816e10,-5.166722e10,7.280361e10,8.43281e10,1.321736e9,1.2599998e10,7.799699e10,2.047802e10,-2.8839913e10,-4.94838e10,-9.988889e10,-1.01748015e11,-6.1996315e10,-1.7137306e10,3.6619963e9,-9.1820835e10,-1.0418479e11,-8.238142e10,8.86477e10,-8.410739e10,-9.105868e10,2.022603e10,5.041596e10,3.6311245e10,-7.004143e9,1.6175471e9,-7.239154e10,-3.5566088e9,-4.3505734e10,3.2696132e10,-3.602375e10,-6.8295782e10,1.2182044e10,1.3863084e11,-1.7413822e10,-8.937802e10,7.434818e10,-7.3820774e10,-4.9716957e10,-8.6932955e10,1.5075323e11,-4.6698865e10,-1.2909399e11,-4.9946616e10,1.5719073e11,6.815576e10,4.013301e10,1.3674729e11,9.715763e10,1.6661365e11,3.1264526e10,1.921919e11,-1.8495993e11,-1.0795171e11,-1.7587598e11,-1.7692126e11,1.538081e11,-1.2758772e11,9.9252175e10,-6.4469856e10,1.6455845e11,-8.814748e10,-1.8683668e11,1.3787954e11,2.0669381e11,2.262534e11,1.2789259e11,-1.17781185e11,4.6317105e10,-1.027805e11,1.1266292e11,2.1478313e11,1.850931e11,3.1148333e10,-4.703837e10,2.9853172e10,-3.0419553e11,6.662164e10,2.015279e11,3.1156437e11,1.4939542e10,-2.4989094e10,-2.2804007e11,-1.3286796e11,6.4167862e10,4.597399e10,2.4760096e11,-1.6650831e11,9.362977e10,-2.9688398e11,3.3782412e11,-1.4317481e11,-6.30682e10,-3.7905265e11,-2.5721884e11,-2.3909451e11,4.498393e11,1.6856959e11,-2.808642e11,-8.981935e10,4.294048e11,-2.1591754e11,-3.4558578e11,3.0094308e11,-3.372605e11,3.091257e11,-4.188505e11,4.4613245e11,3.978757e11,3.5122237e11,7.4450115e9,-9.881237e10,-4.4000615e11,2.05569e11,6.3920808e10,-2.5083249e11,2.8660328e11,-2.4641788e10,3.4763994e11,-5.647772e11,-2.4684256e11,-5.627716e11,-1.5704977e11,1.6327185e11,-1.4623127e10,-5.307128e11,-4.5998942e11,5.8852626e11,-7.92451e11,5.66495e11,7.535477e11,2.7102378e11,-2.6378704e11,2.4435348e11,5.3477802e11,-4.433143e11,9.3829995e11,-2.4802674e11,1.8046605e10,-3.9284844e11,4.3941898e11,-6.8664256e11,-5.1817015e11,-9.2859046e11,-7.659353e11,-8.650312e10,-2.1160916e11,-5.961712e11,5.0641237e11,2.8198784e11,-8.507821e10,-2.2758313e11,-3.6646266e11,-8.9250706e11,1.9612372e11,1.0318694e12,5.8586576e11,-4.0135344e11,-5.4734897e11,1.071015e12,-1.1366134e12,1.1760669e12,-9.586952e11,-5.582911e11,6.457177e11,1.8723512e11,-3.5176985e11,8.6048073e11,7.7194486e10,-5.6343514e11,2.322847e10,-1.7292822e12,-8.9375565e11,-3.6345188e11,-7.9840536e11,-1.5574126e12,2.6863763e11,8.705072e11,-1.2091634e12,-1.7934546e12,-1.7113728e12,-5.2450565e11,1.8388961e11,6.940832e11,1.553425e12,3.057898e11,1.1000367e12,-7.820838e10,6.9070153e11,-8.373854e11,2.1156982e12,-1.9312696e12,-2.4582847e12,1.6007666e12,7.417718e11,3.2846722e11,-2.2272808e12,-1.67242e11,-1.4204191e12,-1.3336145e12,2.0313891e12,4.3249576e11,2.5760028e12,-1.7674856e12,2.8483574e12,-1.7043379e12,1.2832865e12,-8.5513896e11,7.873839e11,-2.9949952e12,3.166127e12,-1.2363854e12,8.752084e11,-2.8210939e12,-3.0288776e11,-1.9927629e12,3.4352693e11,2.2166655e12,7.33921e11,-3.2363438e12,-2.1718751e12,1.2658201e11,-2.822231e12,-1.0590427e11,-6.346929e11,3.074659e12,3.3693935e12,6.4130004e11,-2.2588896e12,-1.2132585e12,-2.487137e12,-2.0169745e12,2.475573e12,1.7835299e12,4.1333613e12,-3.4512723e12,3.3973841e12,3.4827e12,4.320959e12,-5.167382e12,-3.5438041e12,4.5032297e12,7.769066e11,-5.549154e11,-1.6346306e12,3.4168722e12,-6.6845724e11,-6.157313e12,6.210861e12,-1.2877365e12,6.4093893e12,4.5769666e12,-3.2231913e12,5.906501e12,1.615484e12,-2.84488e12,-1.06207995e12,-6.470272e12,7.640666e12,-7.39696e12,7.1942417e12,2.3895042e12,8.391871e12,-6.916231e12,-7.702052e11,2.3885232e12,-9.109985e12,7.645206e12,4.0605843e12,1.9859711e12,7.3836433e12,4.805719e12,2.1809986e12,4.4382096e12,4.067296e12,-5.194694e12,-8.719859e12,8.105512e12,9.463625e12,-1.3274874e12,9.45735e12,-6.43185e12,1.093069e13,-1.4133284e12,-2.3755175e12,-8.209602e12,4.066956e11,6.068182e12,-1.2210637e13,1.2645508e13,9.233373e12,1.1067626e13,5.5835545e12,1.7953908e12,-1.176757e13,-7.892649e11,-7.799956e12,-1.1513752e13,-4.378796e12,-1.1046437e13,-2.9213165e12,-6.755601e12,1.4381305e13,-1.2345611e13,-7.677832e12,4.0475311e12,1.3654622e13,1.5329268e12,1.0891552e13,-2.4099294e12,-8.431822e12,2.5580992e12,1.0979632e13,-5.024438e12,-1.8389083e13,-9.4064955e11,1.2454604e13,1.5186168e13,-1.2443371e13,1.3448981e13,-2.842138e12,1.5449745e12,2.1619773e13,1.7683618e13,-1.838691e13,1.751387e13,-1.1800719e13,1.9676502e12,-5.5063253e12,-2.3261157e13,3.1858693e12,1.7044567e13,1.5604583e13,-4.202608e12,2.3224857e13,2.3130098e13,9.936699e12,2.2186484e13,-4.8914524e12,1.1251268e13,-1.2163431e13,-8.742411e12,2.3625013e13,-6.4028195e12,2.1452338e13,1.7996584e12,-2.147743e13,3.1160657e13,-1.7648981e13,-2.1714312e13,2.6186858e13,3.6460695e13,-1.7701766e13,-1.3862167e13,1.3265713e11,1.8117774e13,2.130227e13,1.7792647e13,-1.6733719e13,3.6248043e13,-3.1626336e13,-2.3759721e13,-4.177853e13,2.2064715e13,2.1257068e13,3.312199e13,3.1519138e13,-5.112134e13,1.0032842e13,1.809136e13,-3.1947997e13,2.0221658e13,-5.08956e13,4.3206796e13,-3.459266e13,2.239956e13,-4.3881853e13,2.3337079e12,1.6246091e13,-3.4898855e13,-2.99349e13,-2.7552033e13,-3.3122964e12,-4.479719e13,7.7270126e12,-3.7620315e13,-7.2466265e13,-1.9909117e13,6.08572e13,-8.5424184e12,-5.759484e13,7.191567e12,-8.145759e13,-2.1864768e13,5.22894e13,5.1114297e13,-7.1301883e11,-6.467062e13,-4.6790953e12,-5.455521e13,-5.894317e13,-2.2730176e12,-9.509421e13,-4.1131493e13,-5.893383e13,4.2895164e13,5.8899978e13,9.445841e13,-8.66816e13,-3.8084243e13,-4.7174394e13,6.5381214e12,7.8682223e12,-9.884767e13,-2.3390005e12,8.575714e13,-7.194425e13,1.4609045e12,-5.376548e13,1.24403426e14,-8.184171e13,-7.309534e13,1.0103646e14,3.9239882e13,2.411172e13,-1.11043435e14,-4.998631e13,-1.502618e14,-8.913687e13,-5.811718e13,5.052082e13,1.0910272e14,1.441268e14,-8.681686e13,-1.5494982e14,1.1806239e14,-4.2843645e13,-1.4054121e14,-3.906271e13,-7.439511e13,5.4012464e13,-9.249625e13,-1.7126258e14,1.4281338e14,-1.5263364e14,5.125888e13,7.488458e12,2.5787395e13,1.1310509e14,1.50876e14,-9.689199e12,1.7898367e14,1.5015743e14,3.6752274e13,1.28157496e14,-4.5376686e13,2.35414e14,2.1103782e14,-2.3469456e14,-2.126363e14,-6.248096e13,-2.3001483e13,-1.3427284e13,9.7752994e13,-2.2696164e14,9.595329e13,1.1124637e14,-8.6178666e12,2.4301677e14,-2.397984e14,-8.635571e13,-1.936628e14,3.2700827e14,-1.1794243e14,-1.7732004e14,2.351169e14,-3.529734e14,2.6863945e13,3.2792183e14,-3.541928e14,-3.605404e14,2.4497776e13,-2.4079394e14,2.7801998e14,5.514075e13,-2.629499e14,2.8158584e14,-2.6052617e14,-5.3332085e12,1.9199925e14,-3.9386545e14,2.4339514e14,-2.8671182e14,-2.4442124e14,-2.3896918e14,-4.3068184e14,-3.2032685e14,-1.0913035e14,-8.95333e13,4.0759844e14,-6.6063334e12,-2.4294598e14,-1.5078434e14,3.1806706e14,5.808234e14,8.214397e13,-3.5795506e14,-3.189668e14,3.9136725e14,-1.0251543e14,1.0731416e14,-6.479187e14,-4.874483e14,4.2720416e14,5.6423744e14,-5.2093608e14,3.2129436e14,-5.5177582e14,-6.628777e14,9.87965e13,-5.4138415e14,-5.1194185e14,-6.8882115e14,-5.4408374e14,-2.5621944e14,-6.222493e14,7.172397e14,3.0410543e14,-4.4098298e14,8.521056e14,-2.079453e14,4.8872852e14,4.9459253e14,-1.35053586e14,2.6593956e14,9.1629966e14,-8.490965e14,7.048384e14,-8.060049e14,-4.071313e13,1.9972187e14,3.0437366e14,6.82927e14,-5.748665e14,2.928038e14,6.579275e14,-9.605733e14,-5.8156394e14,8.862182e14,6.5905267e14,-3.5218027e14,-1.6579975e14,1.3420467e15,3.1328055e14,-1.345771e15,7.5953416e14,4.5325424e14,2.1983849e14,4.8688152e14,9.702682e14,-7.1722806e14,1.5346118e15,7.4346776e14,-1.3411175e15,1.28251e15,-1.6195942e15,1.741103e15,1.0474309e15,-1.6837327e15,7.830753e14,1.983479e14,-1.2847141e15,3.4545355e14,6.42826e13,-7.912105e12,1.4652756e14,-2.2372418e14,-7.2146646e14,1.3655685e15,-2.6340303e14,-5.180467e14,1.0978313e15,7.3309844e14,-1.4207525e15,1.1924484e15,-1.938282e15,-4.212497e14,-1.4612257e15,1.1494808e15,8.65125e14,-1.0334539e14,-5.3362912e14,-1.0704603e15,1.8809474e15,-2.5722857e15,5.927469e14,-4.267927e14,-2.5766626e15,9.66091e14,1.10090836e15,4.502045e14,-2.4300332e15,-3.1773897e15,9.3479124e13,-1.5339884e15,2.3293233e14,-2.0130462e15,-2.6968854e15,7.602769e14,6.923948e14,-1.6785848e15,-8.233029e14,7.870437e14,1.7493552e15,-1.6627319e15,-6.0182327e13,-1.6973911e15,-4.2067658e15,5.279795e13,-3.826399e15,1.6827678e15,4.3567273e15,-1.2182592e15,1.9862412e15,-3.2655358e15,-1.156671e15,-3.6894215e15,9.8205555e14,2.8315852e15,-3.6325158e15,-5.2527665e15,-5.684798e14,1.305736e15,2.41524e15,2.2970806e15,4.0855825e15,-4.9047e15,4.772392e15,2.6325637e15,-5.3616724e15,3.7676065e15,1.990617e15,-4.4596592e15,4.788923e15,-2.7423938e15,-5.754679e15,-4.341592e15,-4.496694e15,-4.568671e15,-3.641817e14,5.8741844e15,5.365928e15,4.8679723e15,-3.777229e15,-2.9472468e15,8.145859e15,-6.260991e15,1.0710132e15,1.4342119e15,5.814042e15,-8.923793e15,-5.212581e15,-1.7642167e15,1.397706e15,2.5046722e15,9.01026e15,2.3820458e15,-5.537688e15,1.372877e15,-1.9684818e15,-4.194773e15,2.6337094e15,-2.1946045e14,-9.414116e15,3.1998298e15,2.1886288e15,-1.8496195e15,-3.2039173e15,-8.13588e15,1.230184e16,-7.444777e15,1.0569748e16,1.5055911e15,-9.334651e15,7.297837e15,-1.3877585e16,4.3655017e15,-2.7369217e15,6.7178276e15,9.703268e15,-3.5769516e15,-1.4425546e16,-8.8074994e15,3.080376e15,1.2461229e16,9.25325e14,-1.4092795e16,-1.6559645e16,1.3898269e15,9.169203e15,1.1649112e16,-1.0520774e16,-9.736366e15,-1.6378977e16,1.2213911e16,1.8517004e16,-3.0500853e15,9.4582e15,4.2032983e14,-1.9411038e16,-5.3531613e15,-1.8281593e16,2.4543934e15,-4.4854708e15,1.863653e16,1.5558972e16,-5.1531474e15,2.0375192e16,1.0243115e16,6.2256743e15,2.0469166e16,1.8670818e16,-7.7881845e15,-7.403149e15,2.7102944e16,2.2122674e16,-1.7630302e16,-9.263302e15,-6.494897e15,-1.6942229e16,-1.2717808e16,-1.1498423e16,-1.6564646e16,3.5285288e15,-3.1945288e16,3.3269968e16,-2.6483407e15,-2.0361716e16,-1.8961409e16,-3.3134588e16,-2.0808322e16,3.4664999e16,2.4403744e16,1.5333121e16,-9.034266e15,-3.7372877e16,-3.164206e16,3.437668e16,-2.2458212e16,2.136134e16,-2.9977044e16,-2.0406637e16,2.5284853e16,-3.7389713e16,-2.6463183e16,1.4422601e16,1.2183634e16,8.45115e14,1.5524587e16,3.999393e16,4.8155315e16,4.747328e16,1.7712237e16,2.2667955e16,-4.5626885e16,2.3801242e16,2.0758713e16,3.1424547e16,-5.8280314e16,-3.2290215e16,-5.027217e16,6.095254e16,5.4071117e16,-5.103587e16,-2.6559552e16,2.606593e16,-4.6606056e16,6.016347e16,5.0761665e15,-1.3929261e15,3.377377e16,3.683761e16,-4.452531e16,5.130497e16,-4.4144425e16,3.6510757e16,-3.3554196e16,-7.977291e16,-2.0983548e16,7.1644564e15,1.9633726e16,-2.3162568e16,-6.8953604e16,3.5266793e16,-2.5590616e16,6.131668e16,-1.919125e16,3.9782693e16,1.1974931e16,4.9735507e16,-5.4944276e15,4.799031e16,-9.7668295e16,4.5247468e16,-5.9682775e16,6.5754025e16,1.2552923e16,1.17829095e17,-7.54573e16,3.4457354e16,-8.1461485e16,-5.2793373e16,-5.8473566e16,-1.1712631e17,1.2904617e17,4.0418146e16,8.13474e15,1.0186335e17,1.0318959e17,-3.3374415e16,1.0136908e17,-3.2106745e16,-8.53285e16,-1.5320188e17,2.6499368e16,-2.442347e16,-3.806215e16,-2.8355217e16,8.319369e16,8.514659e16,6.969614e16,-7.156808e16,-1.3848586e17,-7.374197e16,-1.8618726e17,7.463265e16,-3.856618e16,2.4467557e16,1.6429782e17,-2.1142614e16,9.817272e16,7.540535e16,-1.1950699e17,8.6040564e16,2.2717557e16,7.442916e16,-2.1769454e17,-1.9490173e17,-1.3298396e17,-9.896941e16,4.2191117e16,-2.226223e16,1.8966603e17,2.2853365e17,1.7000114e17,2.3390665e17,2.5641927e17,-1.6056615e17,-1.9359166e16,4.980498e16,-2.728093e17,2.5332985e17,-1.4591286e17,2.3586024e17,2.7028911e17,-2.6684515e17,4.4992596e16,-9.727902e16,-2.3059252e17,-3.319049e17,-3.7273814e16,8.40983e16,-1.4014095e16,3.5907161e16,-1.9041822e17,-3.1790413e17,-3.794648e17,-1.9874209e17,-2.6179191e17,2.4151446e17,1.7787939e17,-3.1461683e17,-6.0885005e16,3.4070787e17,-1.40112304e17,2.8416174e17,-2.140558e17,2.7921601e17,-3.528827e17,-7.843379e16,4.5694855e17,2.2363826e17,-1.6411092e17,-1.9774316e17,-5.0960735e17,2.795942e17,4.3265092e17,-1.0538417e17,4.1683376e17,4.5454854e16,2.4120564e17,-3.357701e17,-3.5618614e17,4.1238953e17,1.6403393e16,-5.442068e17,4.5929514e17,5.869095e17,-5.292982e17,6.891898e17,-6.670956e17,-1.4871206e17,7.1379676e17,5.345839e17,-4.1409003e17,-7.31152e17,-5.090344e17,-2.3752858e17,-6.6907756e17,3.3654697e17,-1.1092555e17,-3.4672728e17,-1.3679392e17,-8.11363e17,5.870534e17,4.6133797e17,-7.469471e17,-1.4505946e17,4.101902e17,-8.0282676e17,3.2673304e17,4.964001e17,-3.741029e17,2.920146e17,4.3322486e17,4.891766e17,4.443318e17,-1.13782205e18,-1.07717986e18,8.680037e17,-8.1878234e16,1.0827054e18,-1.0911932e18,-1.03495655e18,3.2934624e17,4.464721e16,1.4571094e17,4.1770704e17,7.01091e17,-7.724911e17,3.8215355e17,1.1562824e18,-8.744285e17,5.5131135e17,7.413839e17,-3.052406e17,-8.168489e17,-1.2637065e18,1.2596903e18,5.5404597e17,4.2150555e17,-1.7366484e18,-5.5103434e17,1.0656315e18,3.859502e17,1.3544734e18,1.9005015e18,1.4678049e18,-7.831026e17,-7.525118e17,1.5157359e18,-1.1987309e18,1.9208169e18,7.1933995e17,-1.3080141e18,1.7029048e18,-1.10728875e18,-8.0029026e17,-1.9905634e18,1.623105e18,-1.0852799e18,1.9014e18,1.3772202e18,1.0919537e17,-2.598374e18,-2.0426914e18,-6.107303e17,3.803798e17,-1.2253481e18,-9.353492e17,-1.6295843e18,1.6368045e18,-2.4229498e18,-1.9905602e18,-1.2858218e18,-9.2480445e17,2.002243e18,2.3635668e18,2.4139217e18,1.4388708e18,2.2548857e18,-1.649301e18,-1.6136947e18,-1.3695992e18,-1.404487e18,3.450064e18,-1.0475504e18,-3.197362e18,-3.1127934e17,2.2644454e18,7.937351e17,1.0898473e18,3.206249e18,-4.2972636e18,8.9773255e17,3.0330476e18,3.6739222e18,-1.4574549e18,-3.0144766e18,-2.3597528e17,1.5373516e18,1.9274288e18,2.1164339e18,-5.161601e18,-2.8902598e18,-5.0835436e18,-2.9443682e18,1.7879878e17,-3.671505e18,-1.6471275e18,4.3822732e18,-3.6468225e18,3.321322e18,3.1623582e18,-5.4341015e18,-3.451579e18,4.9759487e18,-1.1947308e18,2.5880986e18,-4.934052e18,-2.496354e18,-4.403712e18,5.501035e18,3.7039034e18,-6.74108e18,3.1520626e18,4.4559333e18,7.061686e18,-1.3986717e18,-6.0143957e18,5.052312e18,-4.901375e18,-5.2280217e18,1.788651e18,-1.6979549e18,1.9084038e18,6.8718724e18,-3.6558418e18,8.738727e18,6.656799e18,4.6930796e18,7.1969023e18,6.811949e16,-4.2367712e18,5.686945e18,-6.6122584e18,-9.938636e18,1.09288144e18,-2.0272717e18,-8.566864e18,7.329986e17,-1.0141131e19,-4.70214e18,2.2823524e18,-1.0638114e19,-3.2657562e18,2.330881e18,-1.0502289e19,-8.0702053e18,-1.3096126e19,4.018802e18,-1.6085235e18,9.647975e16,-1.3522048e19,-4.7943308e17,-9.089864e18,4.295257e18,-1.2635588e19,1.6887827e18,-5.1606744e18,1.2930253e18,1.4216749e19,1.5397287e18,-3.0969185e18,1.4928389e19,7.3532495e18,3.2801505e18,2.9726738e16,-1.6159005e19,1.2940363e19,-1.0721012e19,-2.8587077e18,1.9451691e19,-1.3827773e19,7.9334815e17,-8.915154e18,-1.5226325e19,1.5026598e19,2.0162165e18,-2.5974373e18,-1.0781482e19,5.699663e18,2.3377717e19,-2.1385147e19,1.3274487e19,-1.5306675e19,-1.9398811e19,-1.6201733e19,-3.622498e18,-2.2543186e19,1.040027e19,-2.8449388e18,1.04439455e18,1.2912086e19,2.9192891e19,-2.7145614e19,-1.685916e19,2.7114093e19,-1.9954652e19,2.4008133e19,2.9641048e19,-3.071747e18,2.15633e19,2.0190097e19,-2.7498865e19,1.4653594e19,2.6990288e19,-8.511018e18,-5.0809213e18,-1.5817231e19,9.815671e18,-6.038608e18,-2.2761552e18,-3.968516e19,2.389965e19,3.2805796e19,-3.939607e19,2.4302844e19,1.0361049e19,2.4402651e19,1.0626183e19,3.521156e19,1.320405e19,-3.782893e19,-2.7641513e19,3.0834332e19,1.872955e19,5.279228e19,-3.6116404e19,4.5387312e19,2.7542916e19,-4.0620195e19,-3.3398468e19,-4.494028e19,-4.6313382e19,9.375437e18,-2.9595346e19,5.5823934e19,1.6177614e19,-1.0190151e19,1.9466016e19,5.159866e19,-2.064227e19,-4.690927e19,-5.8651847e19,1.969906e19,4.1623407e19,-5.454559e18,1.5395318e19,-7.768225e19,-2.2396408e19,-2.3125964e19,-4.9809636e19,-1.7676173e19,2.684723e19,4.7828246e19,-1.4583333e19,2.1845924e19,-5.671758e19,8.342806e19,9.04672e18,4.139862e19,1.7060782e19,1.6282647e19,-9.2081935e19,7.144178e19,-6.263078e19,-6.8134277e19,-8.021221e19,-2.2249825e19,-9.5497405e19,-8.018163e19,-1.1406418e20,9.012805e19,-5.8263535e19,-1.1846126e20,-1.2030555e19,5.251249e19,-6.7084477e19,2.562712e18,-1.0093619e20,1.1178674e19,1.1934314e20,-2.4243022e19,-1.1315885e20,1.0714722e20,-1.0816261e20,1.3426848e20,1.4732772e20,9.980852e19,1.6034138e20,-1.0612596e20,-9.760023e19,7.399193e19,4.1615904e19,-1.4412018e18,7.7372765e19,6.713139e19,3.1009054e19,-3.2493905e19,-1.538533e20,-8.7722714e19,-3.8573e19,1.2293455e19,1.687357e20,-4.6917467e19,-1.5064154e20,1.2048051e20,-1.6780046e20,-1.394754e20,3.7848682e19,4.939453e19,-4.071113e19,1.4554334e20,1.5072364e20,3.9769978e19,-5.842062e19,-2.453617e20,1.0306794e20,4.92288e19,-8.061437e19,-4.9778987e18,3.2185533e19,-3.7326274e19,-4.847991e19,-1.8612237e20,-3.5564792e18,4.339429e19,2.980113e20,-1.4827491e20,-3.1895566e20,-2.9518675e20,-9.11965e19,1.7564109e20,-9.7838345e19,-2.1459828e20,2.5806849e20,7.8903435e19,-2.3560318e20,-3.4314414e20,3.4159185e19,2.2346895e20,4.018901e20,6.699195e19,-2.149048e20,-1.3083138e20,1.37022626e20,2.5978e20,-4.1019387e20,-3.3930394e20,1.7800182e20,-3.75448e20,3.99691e20,-1.1686345e20,2.5648799e20,-3.881533e19,-1.12408255e20,-3.9750077e19,2.82751e20,4.7897933e19,-3.2788193e20,2.5695567e20,2.03301e20,2.4557177e20,5.3491033e20,2.8938662e20,5.313588e20,5.285036e20,-2.7028707e20,4.634667e20,-2.7247875e20,4.5550782e20,4.126884e19,-5.864809e19,7.750711e19,-2.0010818e20,5.3081104e20,1.2479123e20,-7.505725e20,6.467138e20,-3.5855644e20,-6.076722e19,1.2103852e20,-1.8268697e20,-6.794178e20,1.9829703e20,-2.9154765e20,-5.6828443e20,-5.551152e20,7.5358824e20,-3.7215165e20,-6.405298e20,-1.3114411e20,-5.690292e20,2.1339865e20,7.402421e20,-6.1590025e20,7.9768805e20,-8.21856e20,2.281628e20,-2.2180216e20,1.0508582e21,2.9351973e20,3.7276927e20,7.785781e20,1.7034195e20,3.701768e20,7.727728e20,4.6962633e20,-2.3383274e19,5.1968757e20,-5.1050065e20,4.1743165e20,-9.899979e20,-9.6967e20,-5.8451646e20,-5.0444538e20,6.979533e20,-5.320324e20,-5.9681604e20,-1.3935449e21,-9.148619e20,-1.2061389e21,-2.5927863e20,-1.632628e21,-1.1877035e21,1.3686494e21,-1.7094185e21,8.08808e20,8.1812496e20,1.395295e21,-5.838822e20,4.8721742e20,-9.9201514e20,1.1416741e21,4.248909e20,1.7084692e21,1.683903e20,1.9892691e21,-3.8255686e20,-7.984558e20,-2.1684627e21,8.57518e20,1.6015739e21,-2.8292833e19,2.7454724e19,1.4947329e21,7.4373155e20,-9.617008e20,6.9267966e20,-1.9125583e21,-2.5348786e21,-2.4996179e19,2.694571e21,-2.3633883e20,2.4241683e21,2.8174702e21,-4.089761e20,1.9144276e21,2.4036088e21,-8.0509485e20,9.820031e20,1.6587636e21,4.664471e20,-1.7459565e21,-1.5014662e21,3.5181166e21,1.05087064e21,-1.2935747e20,-1.7663095e21,2.2463412e21,-1.2758862e21,-1.2001161e21,-1.2168939e21,2.4039092e21,-3.4482222e21,-9.932466e20,-2.6224888e21,-2.9748254e21,-2.0439557e21,2.4786042e21,1.1873528e21,4.571292e20,-1.1464984e21,3.471954e21,-2.6992226e21,1.0580105e21,7.569754e20,-2.6517352e21,-2.6873853e20,-3.7951102e21,-1.4073767e21,-1.9831773e20,4.4971364e21,3.9642606e21,-4.086072e20,5.2553067e21,3.304869e21,2.7986046e21,-5.7881743e21,-6.3888244e21,-4.5345892e21,-6.0589276e20,-3.9838823e21,-4.605015e21,-4.1755467e21,-6.493037e21,4.2942245e21,6.018566e20,4.747942e21,-3.6666394e21,-3.97875e21,3.015298e21,-3.2916317e20,4.8389016e21,-5.876376e21,3.727347e21,-8.3375e21,5.791769e21,5.5845136e21,3.747289e21,7.6108486e21,7.441125e21,3.868584e21,7.6072356e21,-6.112906e21,-7.0483206e20,9.566049e21,-1.6326976e21,2.93562e21,2.0954557e21,-6.03751e21,-9.456867e21,-7.0538346e19,6.467474e21,-8.638089e21,1.0845976e22,1.2174544e22,5.8405894e21,1.1789016e22,1.4636088e21,3.95313e21,-5.2016936e21,1.1573547e22,-1.141802e22,-1.3199803e22,1.155778e22,-1.939599e21,-3.740421e21,-3.5634884e21,-1.3378617e22,-2.066453e21,5.9028393e21,2.6544515e21,-7.3826524e21,-1.3158522e22,2.4410405e21,3.3148917e21,-1.6726341e22,1.2695857e22,-5.0628566e21,1.5300159e22,-3.4146822e21,-1.0205388e22,7.193229e21,1.325e22,1.025127e22,5.204738e21,1.7188568e22,6.913522e20,5.607623e21,-1.6783987e22,1.1967026e22,6.138387e21,2.1519708e22,-9.2136144e21,1.3693594e21,-8.108427e21,-1.5648534e22,1.512928e22,-4.0578657e21,-1.8815251e22,-8.1085515e21,-1.653016e22,-1.342398e22,1.068399e22,-2.682598e22,-2.8256516e22,-2.881622e22,-4.5020267e21,1.8074452e22,1.4935572e22,-4.8358324e21,1.83211e22,-3.8516535e21,3.1809435e22,9.91241e21,-1.6404367e22,1.4377136e22,3.255995e22,-1.5768882e22,-7.772196e21,-3.124833e22,1.527449e22,1.246799e22,3.824377e22,3.977382e22,-2.2521914e22,1.271158e22,-4.130333e22,-3.6559116e22,-3.464054e22,3.627961e22,2.270457e22,-2.3830894e22,-1.1668587e22,4.666493e22,4.752875e21,1.278643e21,-4.248217e22,-3.9036053e21,-2.0970289e22,-4.285036e22,1.7441409e22,3.791367e22,2.694697e22,5.4820787e22,4.642071e22,4.3147155e22,-2.541755e22,-2.741379e22,-2.0448364e22,7.57741e21,1.2509758e22,-3.0453735e22,-5.7476564e22,-6.714697e22,2.6493139e22,-2.1040734e22,-3.894391e22,4.041242e22,-1.6136552e22,6.5652723e22,7.3596033e22,-5.5714774e22,-5.9611793e22,6.828161e22,6.6480296e22,2.7840075e22,2.818241e22,-7.0435794e22,-3.705142e21,8.357063e22,4.0140863e22,5.2150026e22,6.770187e22,1.2343546e22,-3.5936421e22,3.77644e22,-8.262063e22,-9.927754e22,7.1416354e22,1.0767078e23,-6.5742854e22,-5.375618e22,-9.874552e22,-7.621266e22,6.9458364e22,3.7066005e22,8.563112e22,-1.14049085e23,1.0726553e23,1.12331115e23,-1.0164329e23,-1.6343672e22,-5.8173843e22,6.217084e22,6.5179553e22,2.0762596e22,-1.4144863e22,5.3730466e22,-1.3848502e23,-6.7802796e21,7.238172e22,-1.6540677e22,-9.758554e22,1.38325045e23,6.2606286e22,1.3417852e23,-1.6878041e23,-5.8530735e22,-3.8392696e22,-1.1888154e23,-2.1224042e22,1.38649475e23,-1.4028177e23,3.978492e22,-1.6118406e23,-1.6397526e22,1.3041521e23,-1.4102218e23,-1.2929352e23,1.7325735e23,4.382443e22,-8.063653e22,1.0341883e23,-6.3946764e22,-6.2109183e22,1.5551897e23,6.670021e22,-2.3900477e23,-2.3605823e23,1.1697146e23,-2.4251918e23,2.207346e23,-1.9224926e23,-2.2269408e23,-1.8880102e23,2.1526707e23,2.2808927e23,-2.4861536e23,-8.554505e22,-1.9005052e23,-2.15697e23,-3.139805e23,-1.0366206e23,3.001434e23,-6.0363664e22,-2.9710989e23,-3.300681e23,-2.8350997e23,1.3099879e22,-6.6895996e22,-5.9097464e22,1.9082602e23,2.1397975e23,-1.9167257e23,-8.821272e22,-2.5002103e23,-2.6700464e23,3.9077892e23,2.4073662e23,-5.3785815e21,2.1072117e23,1.05883095e23,4.1400716e23,-2.9873659e23,-3.4174593e23,-2.4645915e23,-4.8263794e22,-8.754161e22,4.4269718e23,-4.8886e23,1.3138462e23,4.3603192e23,-3.007635e23,1.6932976e23,-2.9221231e23,-4.5297165e23,-2.6946155e23,-9.60903e22,1.1866908e22,-4.120756e22,6.640567e22,3.0637156e23,-5.9326267e23,-1.3189151e23,-4.6676795e23,3.721551e23,-4.924911e23,-1.5751791e22,1.2117989e23,6.119138e23,-6.593336e23,-5.160749e23,-4.0780433e23,1.825018e23,-7.0177835e23,-3.4394178e23,-6.874718e23,-6.581407e23,-2.4074633e23,4.528398e23,-7.070226e23,-8.891509e22,-5.550455e23,4.8408937e23,-3.625988e23,5.280366e23,7.841094e23,-4.8239922e23,8.0141555e23,3.436849e23,1.7043226e23,6.370915e23,-5.8477886e23,2.6320126e23,6.760329e23,-6.611506e23,4.9698724e23,-2.8698515e23,1.0042777e24,-9.7642724e23,5.9589112e23,-8.790832e23,-1.0026795e24,-6.8712126e23,-3.898794e23,8.8822024e23,8.591943e23,-7.72116e23,-8.732633e23,1.1450975e24,5.4341283e23,8.807874e23,-9.612898e23,-6.983575e23,-6.358847e23,7.446327e23,-7.414109e23,4.243466e23,-7.341286e23,-1.6852282e24,-1.7587e24,-3.3342076e23,-5.8007714e23,-7.3830045e23,-1.5500891e24,2.2422702e23,1.09213955e24,1.9310937e24,-1.2718713e24,-1.8071797e24,-2.7782847e23,-1.16843565e24,-3.47817e23,-1.2580612e24,8.435055e23,-1.7556124e24,2.017264e24,1.9730777e24,1.9721101e24,-1.6370851e24,-1.9516113e24,-1.179902e24,1.1520761e24,1.3641627e24,1.4987037e24,6.8469976e23,-3.706069e23,2.6827423e24,-2.1708166e24,-8.896833e23,-3.0659966e23,-2.6855378e24,2.6727326e24,1.6018268e24,2.89268e24,-2.1545577e24,-1.877139e24,-2.573526e24,6.9902524e23,-1.7538778e24,1.6023624e24,-2.3295802e24,-3.1257207e24,1.8901877e24,5.4805194e23,3.6243416e24,1.6888796e21,9.1966264e23,1.8285739e24,-1.2491206e24,-1.1533347e23,7.10368e23,1.5360585e24,1.935168e24,4.5734825e24,2.5538445e24,3.777647e23,-1.1774463e24,-4.114002e24,-4.8141396e24,5.092011e24,-3.2946104e24,2.920435e24,4.135652e24,-1.2199503e24,-1.1938326e24,-1.19777275e24,4.3448423e24,-4.6975078e24,-2.514108e24,5.905384e24,4.5838562e24,-1.6988383e24,5.7558615e24,3.8233477e24,-5.1978313e24,6.85697e24,3.568501e24,4.4769455e24,-4.7937868e24,4.7839138e24,1.7066848e24,3.8547317e24,-2.9415017e24,-7.838095e24,1.4839343e24,-2.5506511e23,-3.1307468e23,3.9869066e24,4.4531492e24,7.542773e24,8.8588454e24,1.658533e24,-3.1598873e23,-4.7576612e24,2.509291e24,-1.5019176e24,7.220248e23,-6.532002e24,-5.939855e24,5.8958215e24,-5.855634e24,-8.6493284e24,1.7992631e24,-9.932837e24,-1.9093542e24,4.4941903e24,6.0273307e24,-3.0541867e23,-5.2287244e24,-8.275752e24,9.078225e24,-3.1563875e24,9.698606e24,2.8757696e24,2.0139596e24,-1.4547261e24,2.506947e24,-9.453684e24,-5.967551e24,1.9190609e24,-1.173868e25,-1.1389883e25,-3.5902912e24,-1.2698231e25,-1.1555315e25,-4.7888583e24,6.3070865e24,7.0793606e24,7.4669976e24,-1.4752068e25,-5.719339e24,1.341356e25,1.4008436e25,6.2090616e24,-7.98675e24,1.8246602e25,-5.330682e24,2.8210877e24,1.2148969e25,8.9753e24,1.784913e25,1.7409439e25,2.6584482e24,-1.630073e25,2.0953936e25,-2.1205194e25,-2.9944787e24,-1.0639255e25,1.3576164e25,-1.9708386e25,2.3678653e25,-7.44419e24,-1.6329793e24,2.332613e25,-1.8867939e25,-2.1599846e25,-2.3706695e25,2.2166747e25,1.0068277e25,1.2360825e25,2.8225292e25,-1.2299224e25,2.9442784e25,-1.2819931e24,5.8288645e24,3.303011e25,1.0896675e25,1.1793336e25,2.62898e25,3.1948702e25,1.1159411e25,1.2184104e25,-1.1103355e25,-7.94866e24,-1.27704e25,1.9884748e25,-1.4817262e25,4.5348842e24,-2.3234126e25,-3.3323527e25,-6.073591e24,-5.387072e24,1.3043715e25,-2.0580297e25,-6.7248695e24,-1.0163455e25,-1.9127797e25,-1.6414434e25,2.3379143e25,3.539407e25,-5.152978e25,-1.5716583e25,2.2807075e25,-3.6108143e25,2.7148142e25,1.177421e25,4.834165e25,3.0282975e25,2.842238e24,1.4028229e25,5.698504e25,1.8637863e25,5.6362625e25,2.6314714e25,3.9488857e25,-1.8093242e25,-4.820143e25,-6.915625e25,-3.8308485e25,5.5429242e25,-5.580798e25,3.890064e24,3.0030778e25,-2.0965617e25,-5.4788804e25,4.2427903e25,-6.4633693e25,-9.3310607e24,7.0266494e25,3.34493e25,-2.0313783e25,-6.230722e25,-2.808641e25,7.0330273e25,4.9184217e25,9.145349e25,9.424383e25,-7.0510147e25,5.857294e25,-9.552792e25,-9.087329e25,-9.225399e25,-1.0066129e26,-1.4858782e25,7.544891e25,5.9340307e25,-1.14948995e26,1.10494835e26,-1.0333661e26,-2.387763e25,1.202218e26,1.0280723e26,1.2558524e26,-7.7112726e25,-6.1070713e24,7.862027e25,-2.1655783e25,-8.3690733e24,1.42078345e26,1.1132854e25,-6.9441136e25,1.6476739e25,5.3969893e25,2.1298618e25,-1.445614e26,-1.2826655e26,-1.1735567e26,1.4884813e26,-4.028515e25,-1.4974871e26,-1.6681306e26,1.3023183e26,1.2251451e26,-1.4240002e25,-6.2141247e24,-1.3107775e26,1.7592946e26,-2.1594775e25,-9.225407e25,2.3299467e25,2.0083738e26,-2.036736e26,8.229369e24,-1.7676847e26,9.892763e25,-1.9760866e26,-1.0266287e26,-2.0689276e26,-8.494133e24,1.9473999e26,-5.3728577e25,-9.112007e25,2.3934682e26,2.9360306e25,-1.6055956e26,1.8277255e26,-2.1127654e26,-1.5995242e26,7.059692e25,-2.2836219e26,-2.1879298e25,1.6325795e26,2.853024e26,-2.3910127e26,-2.2221951e26,3.0668404e26,1.759682e26,2.7468049e26,-1.2192487e25,-2.2466852e26,-1.8507758e25,-7.891667e25,2.3397734e26,-2.9905707e26,-2.6943115e26,2.316231e26,8.3605e25,-3.1904036e25,2.5440816e26,-3.1974476e26,1.43834115e26,-3.199712e26,3.6871124e25,2.5949313e26,-6.0940207e25,3.8513466e26,-8.445278e25,-1.2775279e25,2.1062171e26,-1.196118e26,1.983782e26,-3.6354264e26,-4.133992e26,5.2118217e26,1.8498581e26,-4.9375075e26,4.815056e26,3.455353e26,-6.97907e25,-2.7700876e26,4.3005518e26,-4.9824932e26,-4.20388e26,3.271621e26,-3.3270168e26,-7.290267e25,-2.7011134e26,5.8517356e26,-4.9783837e26,-3.4521993e26,-6.8229386e26,4.8271835e26,4.755015e26,-3.8793912e26,7.164075e26,3.273409e26,1.526537e24,-4.0398167e26,1.3855975e26,-7.225887e26,-6.7216135e26,6.300091e26,6.565523e26,-7.821219e26,3.311399e26,-3.6437603e26,-3.175602e26,-4.317388e26,1.1122326e26,-5.390335e26,-1.00270886e27,7.866702e26,-2.6943023e26,-3.8874956e26,6.140974e26,6.2361174e26,-1.0019684e27,-1.0943372e27,1.2417377e26,9.992631e26,1.0042494e27,-5.9390274e26,3.2606612e26,4.829001e26,-7.213129e26,1.6507054e26,1.1410876e27,7.139849e26,-1.1090634e26,-3.7881544e26,1.2144969e27,-7.873134e26,7.6045256e26,3.0825356e25,-7.659993e26,1.4868452e27,-3.760585e25,-1.1177417e27,-5.971167e26,-1.061621e27,1.2359046e26,-1.9257185e26,-1.3705648e27,-1.09247e27,2.1088655e26,7.3739944e26,1.8923778e27,-1.8652084e27,-8.074102e26,1.3632038e27,-1.3766677e27,2.8322945e26,-1.9851039e27,-8.302555e26,-1.2855009e27,1.0359998e27,1.5557807e27,2.9612082e26,-2.1299715e27,1.1834941e27,9.023256e26,1.4221116e26,1.6818487e27,-1.1465672e27,-2.2972678e27,-1.2341486e27,-1.6519794e27,2.2157081e27,5.7484877e26,1.7403315e27,-2.2518394e27,2.6898056e27,2.0114578e27,-2.4659123e27,2.798515e27,-5.0450616e26,2.4791745e27,3.1471547e27,-8.019071e25,9.267749e26,3.2551136e26,7.415998e26,2.8586344e27,-2.6806873e27,-4.1391063e26,-4.107698e26,-3.7878686e27,-3.6140678e27,2.1972664e27,1.232509e27,-3.6006262e26,2.977731e27,-2.764888e27,4.1665295e27,-2.2687838e27,2.773462e27,-3.2798225e27,-3.9094253e27,-1.116703e26,-3.573397e27,1.398472e27,-1.4011562e27,3.2485124e27,-4.0258475e27,3.101181e27,3.9355394e27,-3.1545565e27,-4.960632e27,5.244028e27,-3.3155493e27,2.3566517e27,-4.8787636e27,-3.9626316e27,-5.646427e27,2.0201444e27,-6.00815e27,-5.494698e27,4.5536552e27,9.030753e26,2.4174992e27,-5.943535e27,4.0448108e27,-2.1263484e26,-5.6457497e27,2.5517363e27,6.3134964e27,-1.822044e26,3.5953805e27,-3.5157325e27,-1.3652115e27,2.9741836e27,1.1920709e27,1.811109e27,2.7674838e26,7.831231e27,4.5479116e27,7.821248e27,-1.6477495e27,4.3072832e27,8.02984e27,3.287255e27,7.8009533e27,2.3539556e26,6.985706e27,4.5032313e27,-6.666359e27,-8.149867e27,7.212915e27,-1.6035523e27,2.7158724e26,-4.974411e27,7.6964096e27,5.436135e27,-7.6331895e27,6.935212e27,5.601931e27,-1.0816505e28,-2.8626744e27,-1.1424325e28,2.5383307e27,-3.8330944e27,1.0692209e28,6.45539e27,8.537974e27,7.266165e27,-2.3257357e27,7.380523e27,1.1488561e28,-1.1287737e28,-1.1745665e28,-9.031826e27,-5.840973e26,1.0432872e28,-1.5475318e28,-7.4401403e27,4.3258648e27,1.3926731e28,1.8420559e28,2.6942287e27,-1.3103039e28,1.8928015e27,3.545078e27,3.6098433e27,-1.128024e28,-1.5082126e28,9.58448e27,-3.0229196e27,-1.92028e28,-1.7926163e28,1.6368125e28,2.1605946e28,-1.6629932e28,-1.0813347e28,-6.5487736e27,1.0918847e28,-1.265747e28,2.1485738e28,-2.0855833e28,2.5406582e28,1.9751881e28,-1.4128507e28,2.0070948e28,-9.731488e26,1.4700601e27,6.8369973e27,6.932674e26,-2.0547614e28,2.7253219e28,-1.6741166e28,-4.1950676e27,-1.2563906e27,-1.6406682e28,1.7266757e28,3.5097124e28,-1.3590029e28,3.366436e28,-2.563652e28,-8.6119454e27,-7.9598365e26,-1.443723e28,3.9432938e28,1.870789e28,-1.3999983e28,-1.4848395e28,-1.1759721e28,1.8312866e28,-3.290236e28,-1.5149405e27,1.0875946e28,5.7806335e27,-3.118204e28,2.5581685e28,7.212395e27,-1.0279912e28,-2.6172606e28,-3.5882404e28,-5.0035584e28,4.666902e28,-2.196607e28,5.175348e28,4.92805e28,5.035728e28,-5.480901e28,4.5819625e28,-9.5868886e27,-1.9901528e28,-5.087484e28,-5.465134e28,-6.146736e28,-3.6649335e28,4.9789723e28,-6.8641273e28,-4.0939786e28,-4.7882633e27,3.9263228e28,6.5783477e28,-5.0539966e28,-3.0401294e28,3.038423e28,5.575161e28,3.6333772e28,7.2174756e28,-2.4444338e28,-4.426347e28,-1.5892544e28,-1.7855366e28,-7.528203e27,-6.5425076e27,8.653894e28,9.404581e28,6.0811254e28,-6.0989145e27,-3.3291742e28,9.851134e28,4.770447e28,-9.252141e28,5.93492e28,9.646873e28,2.8763953e28,3.0160215e28,5.2904794e28,8.487596e28,9.612177e27,2.974906e28,-2.5043732e28,-2.3899816e28,-7.487128e28,-1.1716891e29,-4.48524e28,9.976047e28,6.530653e27,1.043562e29,-1.3557111e29,-7.962295e28,5.578614e28,3.3409893e28,7.436305e28,1.994415e27,2.837353e28,6.22833e28,-1.5285281e29,-3.1733224e28,1.6519354e29,1.5152763e29,-9.749947e28,-1.0261325e29,-1.3567973e29,3.184825e28,-1.2442581e29,1.5530184e29,-1.802979e29,7.950863e28,-1.4804149e29,-1.3932321e29,-1.0695168e29,7.0944863e28,-1.4357624e29,3.561734e28,1.7046825e29,-5.1668177e28,-6.4803996e28,-1.0014897e29,-5.0253077e28,3.5679963e28,-2.3236846e29,-1.4055995e29,-1.1302691e29,2.547115e29,-3.5956885e28,-2.3373338e29,-6.7710485e28,8.611117e28,2.0702636e29,8.466582e28,-1.0679988e29,-7.3128763e28,1.2235996e29,-1.3869335e29,2.4997301e29,4.165857e28,-2.6549805e29,-2.2032125e29,1.2158564e29,-1.9686554e29,-7.493823e27,-1.815656e29,8.98908e28,-1.8992155e28,3.464569e27,2.9706902e29,3.3141024e29,1.8515249e29,3.908272e29,3.991509e29,8.275353e28,-1.0384687e29,3.0156332e29,1.536786e29,2.4408335e29,2.5458085e29,-3.9026434e29,3.405287e29,2.5228839e29,-3.6398695e28,-1.9897208e29,3.8217337e29,4.330657e29,3.3128867e29,2.8733416e29,-3.3128232e29,-2.4083578e28,2.8818589e29,-5.499577e29,-5.6747926e29,4.7371093e29,3.264585e29,-4.9228026e29,5.466231e29,4.4776848e29,-5.639716e29,4.2174994e29,6.0858297e29,-3.1262776e29,-1.5242961e29,7.7302424e28,-1.0847396e29,-4.929289e28,-6.901553e29,-4.6202123e29,-6.845652e29,7.353906e29,1.1290242e29,1.29121145e29,6.700848e29,6.952302e29,4.2010517e28,3.9252616e29,8.740081e29,4.453033e29,5.725643e29,-1.51040925e29,-8.192357e29,3.9518217e29,6.635283e29,-5.671907e29,-9.836491e29,-2.5114486e27,-3.1598461e29,1.2801055e29,-8.215788e29,5.8137722e29,4.582028e29,1.7956022e29,-9.745115e29,1.1078208e30,7.6659686e28,1.16444664e30,9.00545e29,-4.192841e29,-7.757737e29,1.677547e29,8.4818734e29,1.5358648e29,-5.083047e26,5.7345056e29,2.8724321e29,5.7829352e29,5.824842e29,7.499368e29,6.815413e29,-1.3281912e30,-7.08117e29,1.55281e30,5.4878334e29,-1.2612551e30,-9.9598404e29,-1.4547e29,3.4032667e29,1.8025657e30,9.6239864e29,-3.0050348e29,2.2376484e29,1.22997156e30,8.1738754e29,6.950373e29,6.178255e28,-1.3399049e30,1.77047e29,-3.9567028e29,1.3267222e30,9.676975e29,1.8185516e30,7.38738e29,1.0871849e30,-1.8348914e30,5.3192067e29,1.4202421e30,2.3265158e30,1.4886554e30,-4.159789e29,-1.1331452e30,-9.754535e29,-1.0843643e30,1.840586e30,-2.0161404e30,8.758341e28,1.09084656e30,-2.8511183e30,-7.235557e29,-2.4457552e30,-1.06361074e30,1.648338e30,-1.8675007e30,-2.8377146e30,2.4234144e30,-3.3951222e30,1.2193783e30,2.8137815e30,-2.8985825e30,1.3547053e30,1.001531e30,-1.0959288e30,3.2473543e30,2.5712788e30,-3.710408e30,-1.8692858e30,1.2296473e30,-8.583094e29,-1.8796267e30,4.3555958e29,-3.0187712e30,3.2058222e30,1.9578026e30,3.6986635e30,2.4081299e30,4.401332e30,-1.05544166e30,4.02083e30,7.87608e29,1.01257375e30,2.0026e30,5.419565e30,-6.565252e29,-4.9285823e30,1.615032e30,-2.982027e30,-8.761317e29,4.3977267e30,-1.2171159e30,4.5898735e29,2.2641692e30,-5.964784e30,-4.5124915e30,-6.260189e30,2.5066805e30,-1.2641442e30,2.7195025e30,5.474824e30,2.8886185e30,4.7238148e30,-1.0456942e30,-5.7575745e30,1.1588285e30,6.5938937e30,6.8709257e30,-3.343068e30,-3.7617344e30,-3.8128723e29,7.460464e30,7.3217504e30,5.592819e29,6.085033e30,1.375397e30,-7.700912e30,6.6945053e30,6.493926e30,2.7191704e30,-2.4361693e30,-9.591233e30,6.1225976e30,5.078946e30,-7.699082e30,-9.63444e30,-3.3485238e30,2.8010702e30,8.178046e30,-2.573557e30,-4.0057086e30,-8.1804915e30,5.781852e30,4.0185148e28,-1.4755772e30,-5.981252e30,-7.0230267e30,-3.4175535e30,-4.9477922e30,1.2694394e31,-1.3454883e31,1.4016616e31,1.2694203e30,9.3892765e30,-8.036556e30,-9.673025e30,1.0740381e31,1.06375446e30,-1.1924375e31,1.2363754e31,-8.201406e30,2.564788e30,8.0483197e30,-1.2414903e31,-1.2491714e31,-1.2300804e31,-1.7779805e31,-6.525224e30,1.5643211e31,-1.7502933e31,-1.6081837e31,3.6883553e30,1.6389631e31,1.9344708e31,-1.00943426e31,9.610245e30,7.418557e30,-4.4751853e30,1.432808e31,-4.9621974e30,6.723836e30,-1.7801435e31,2.2508086e31,-1.0901671e31,-9.187513e30,1.959924e31,-2.3276314e31,2.2919188e31,-1.4755487e31,-1.7188018e31,-2.0575668e31,-1.6957043e31,-2.153724e31,1.9134658e31,1.8881925e31,-7.060791e30,-1.0807566e31,-2.229367e31,-2.901282e31,-2.4648781e31,1.7874233e31,2.6970664e31,7.676813e30,2.0954094e31,2.767377e31,-3.5114157e31,2.3404953e30,1.6986642e31,-4.9229723e30,3.4048641e31,-1.2345058e31,2.6483916e31,3.1724733e31,-3.8879008e31,1.8507113e30,2.9184838e31,1.8744177e31,-3.815534e31,-2.9563606e31,4.673589e30,2.0588304e31,2.3691489e31,3.2308127e31,1.5230434e31,-5.018243e31,3.571616e31,5.2915346e31,-2.685707e31,3.6516148e30,-4.558792e31,2.4374981e31,-2.9237972e31,5.318261e31,3.7454923e31,-8.990949e30,-4.2577938e30,-4.8895043e31,-5.0640476e31,-4.2102232e30,-7.6629335e30,-3.5152187e30,-5.842812e31,4.8402285e31,1.3421331e31,3.419392e31,-4.869348e31,-5.509491e31,1.7118708e31,6.8517384e31,5.391407e31,-1.3263951e31,5.8657377e30,4.5378617e31,-3.5095854e31,7.1855785e31,-7.830194e31,6.4030543e31,7.342482e30,1.8705174e31,-7.9530713e31,-7.803606e31,1.5421924e29,-4.348189e31,8.835473e31,5.034001e31,-8.804129e31,-3.5537953e31,1.0585839e32,3.0577496e31,8.087883e31,-5.1512706e31,1.1658394e32,9.402287e31,9.890023e31,-7.1643957e31,-5.6972713e31,-1.2829811e32,-3.2931202e31,8.770855e31,1.1634753e32,-1.4579295e31,1.3652533e32,1.2714632e32,-8.776308e31,-4.258996e31,-1.9591102e31,-1.3637478e32,-7.83156e31,7.5597047e31,1.2298765e32,1.27808305e32,1.5650927e32,1.4958091e32,2.6497517e31,-7.282258e31,-8.933691e31,-1.1746647e32,1.4217838e32,1.0128073e32,-1.8081377e32,1.3142094e32,5.4823446e31,6.2816255e31,-2.0216847e32,-4.860354e31,2.6911325e31,-1.9239263e32,-1.1268235e32,9.6674e30,-1.712891e32,-3.4237478e31,1.762001e32,-1.2039163e32,5.928586e30,8.962444e31,1.1332365e32,-1.4479067e32,2.0104112e31,-5.223253e31,1.7031813e32,8.642738e31,2.6930275e32,6.5591615e31,1.4361009e31,-1.5722503e32,1.4131907e32,-2.8733602e32,2.6311094e32,-2.3722622e32,-1.61794e32,-3.056888e32,-1.7113341e32,2.6740184e32,-2.042283e32,1.7290293e32,-3.4841114e31,2.246385e32,-2.798161e32,-3.139135e32,1.2208303e32,3.1359083e32,-3.0459145e32,-2.7984683e32,3.7689503e31,-4.28274e32,-2.1413295e32,-1.8343337e32,2.4336047e31,7.2831823e31,-2.91079e32,3.1022812e32,-3.99263e32,-1.68983e32,1.0375913e32,-1.8595136e32,2.7650395e32,3.9130913e32,-2.7290506e32,-5.008778e32,-5.2317265e32,3.1476053e32,9.134873e31,-4.498912e32,-3.803388e32,5.666491e32,-5.898506e32,-3.8589953e32,5.3281214e32,-6.2169527e32,6.827229e31,1.4290483e32,-4.4575052e32,5.6244835e32,-2.775679e32,3.1002436e32,-5.2723977e31,1.3751394e32,-3.0939725e32,3.055018e32,-2.603896e32,-1.3313611e32,-4.2151754e32,-5.9018846e32,-2.4950883e32,3.802152e32,-6.1823066e32,-6.8912934e32,-4.2848107e32,-3.0113559e32,4.4084283e32,-5.103725e32,2.3636463e32,-4.3930167e32,2.9450458e32,3.386452e32,-7.9615885e32,-1.05835e33,-9.6728255e32,2.6882388e32,-2.4303268e32,1.1349748e33,-6.151408e32,-8.368881e32,-1.0908369e33,-3.3448327e32,-1.0472531e33,-5.165702e32,-9.526365e32,-1.18201014e33,-2.8949003e32,1.26861975e33,1.0158176e33,2.9641188e32,1.2064788e33,-1.13939885e32,3.678856e32,-6.602566e32,-1.326569e33,-5.9663985e31,-1.8912018e31,3.7595237e32,8.2381405e32,2.785247e32,1.0174815e33,-6.8558675e32,9.488857e32,-1.0894391e33,-3.128982e32,-5.1978766e32,1.26693244e33,1.4849106e33,1.7031228e33,-1.680971e32,5.7773265e32,2.1603125e32,4.6950474e32,8.05874e32,-1.0591773e33,2.001808e32,-1.9822773e33,6.968404e32,1.0083082e33,1.0015629e33,-1.4117581e33,2.4240222e33,2.210026e33,1.3255868e33,9.204352e31,-1.520595e33,2.4728496e33,8.070001e32,-3.8523937e31,-7.274162e32,2.5460587e32,-1.1738929e33,-2.7521227e33,1.19354395e33,2.7736994e33,-6.2028016e31,-1.8998082e33,1.7808982e33,-5.9455045e32,-1.8342265e33,2.783104e33,2.0226911e33,-1.22511e33,-1.4522365e32,4.429957e30,-3.307674e33,-1.00631086e33,2.07978e33,3.545375e33,-1.6617522e33,-3.3797345e33,3.5568416e33,-1.9905024e33,-1.0724034e33,-1.1404451e31,-9.165896e32,1.6795577e33,-4.3750624e33,6.572723e32,3.6681064e33,-7.636699e32,3.4218046e33,5.515719e32,1.4481851e33,1.2605467e33,2.686688e33,-3.6815975e33,-4.428793e33,1.1440199e33,2.843051e33,6.552436e32,-4.7613096e33,4.5455023e33,4.3747752e33,-4.1516257e33,3.5177892e33,-9.673119e32,5.999383e33,4.9507243e33,-1.0423013e33,6.5682425e33,1.4995114e33,1.8922825e33,6.290445e33,2.793433e33,-2.7161203e33,5.2410674e33,1.6704218e33,1.725748e33,5.9298194e33,2.1568922e33,-8.0539116e33,1.9226187e33,-8.0944486e33,-5.9595993e33,-6.763487e33,4.2084013e33,-2.2921764e33,5.5241224e33,-2.1745037e33,-8.16314e33,-9.4375566e33,6.843615e33,5.994136e33,-9.4027086e33,9.107867e33,2.5748003e33,9.0464474e33,-1.0313073e34,8.021355e33,-9.836122e33,-1.9138728e33,-6.875754e33,-8.528106e33,-1.0844623e34,-9.768852e32,7.602211e33,-8.4290786e33,6.743454e33,1.0295207e34,1.9453414e33,8.9663093e33,-1.3032155e34,-9.850117e33,-1.0621892e34,-4.9278837e33,7.1843776e33,9.0735515e33,1.090636e34,1.5285523e34,4.4913925e33,4.3787514e33,1.401527e34,-1.499916e34,-1.3038542e34,-1.1519322e34,1.6644944e34,1.6137674e34,-1.0858815e34,-8.5979516e33,-1.6331934e34,-1.1432836e34,2.709437e33,6.3715697e33,-1.0143513e34,1.6984603e34,-1.0610744e34,1.2004158e34,-5.542348e33,5.0393042e33,4.1506586e32,1.7257191e34,-2.4326398e34,-7.9240226e33,1.4953074e32,-1.7483228e34,1.1438466e34,-9.362549e33,2.1703988e34,-4.0107753e33,1.9359002e34,-2.656117e34,-2.1973564e34,2.063562e34,-5.0112472e33,2.4582974e34,2.557332e34,3.0894618e34,-3.1907236e34,3.406067e33,1.9958871e33,-2.9324534e34,3.228171e34,3.090824e34,1.772994e33,1.6536632e34,-1.6304721e33,-2.3998054e34,-3.713391e34,3.8898903e34,-1.075426e34,-3.5999182e34,-2.3664437e34,3.8074109e34,2.6248733e34,-8.3429954e33,-1.2033522e34,-4.3162745e34,1.4042542e33,-4.2317208e34,4.647515e34,-2.3224337e34,-1.5939009e34,-4.7815726e34,-1.4396782e34,3.714656e34,-3.9976892e34,2.6212175e34,-5.099719e34,-3.638194e34,-4.3381856e34,-2.8696012e34,-5.860017e34,5.6656123e34,-4.3600446e34,-2.9993363e34,7.781108e33,5.189754e34,-3.9674097e34,5.964082e34,7.916163e33,1.033687e34,6.4198466e34,3.617861e34,-7.956191e33,4.8810815e32,7.756803e33,-1.9404496e34,6.927409e34,-3.4428608e34,-7.0654914e33,-4.2274198e33,-7.5685797e34,-5.5860514e34,1.2963782e34,6.8956375e34,2.0106511e34,-4.221088e34,6.281523e34,-4.887663e34,-6.4252906e34,1.2404553e34,6.5060068e34,-8.395023e34,-6.9296803e34,-6.408156e33,5.643501e34,9.4073057e33,-6.672419e34,9.363822e34,-5.5676725e34,5.615208e34,1.0439902e35,8.711432e34,-3.222359e34,-7.4066576e34,-8.857355e34,9.825349e34,-8.723064e34,2.5989514e33,-8.806043e34,-3.5812768e34,-7.2453966e34,1.9658561e34,-2.533175e34,1.1975631e35,1.4414366e35,-9.341678e34,-2.010744e33,-1.0105892e35,3.8937178e34,-3.2694917e34,1.5699593e35,-4.4605015e34,-1.2158742e35,-9.272621e34,3.979627e34,-1.342922e33,-1.1737205e35,1.7187756e35,-1.7547146e35,1.3527634e35,-1.5326305e35,1.4848808e35,1.3300666e35,-6.7782006e34,-1.4830155e35,1.8109633e35,-2.1352204e35,6.5308017e34,-9.452397e34,-5.3066667e34,-2.0976771e35,4.769003e34,1.1942783e35,-5.4590903e34,7.8580106e34,1.6933565e34,-1.8934838e35,3.617724e34,1.379332e35,1.13875e35,-2.7771248e35,2.734259e35,-1.3574976e35,2.1101785e34,-1.984445e35,7.2990014e34,1.4991095e34,-4.0916974e34,3.0804718e35,3.0555038e35,3.368152e35,1.4181252e34,2.6528245e35,2.8351527e35,-1.2730498e35,-7.93026e34,5.5924714e34,1.9107531e35,-1.2733941e35,-2.885493e35,2.640749e35,-2.6212657e35,3.912163e35,1.8974835e34,3.4869043e35,-3.4263954e35,-2.7674972e35,-2.1038706e35,-1.9655344e35,-4.308688e34,-2.2152612e35,1.8047544e35,5.233133e34,6.2660633e34,-5.0897063e35,-2.3024532e35,-1.8256305e34,-1.2919662e35,2.6163623e35,2.4607577e34,-3.4832365e35,-4.2087054e35,-3.955959e35,-2.8663632e35,-4.5950512e35,2.3614405e35,3.7458117e34,-6.415132e35,8.890475e34,4.2771078e35,2.0459142e35,2.3809e35,-1.925481e35,4.292731e35,-2.2749796e35,-3.997205e35,7.54158e35,-4.2185954e35,7.576197e35,2.602653e35,4.374707e35,-7.267951e35,4.936737e34,-7.413013e35,2.320619e35,-8.280238e35,-6.468864e35,3.5417825e35,-3.537817e35,4.4610942e35,5.7890046e35,4.545955e35,-6.107698e35,8.96848e35,4.869707e34,-5.9858204e35,1.1728079e35,-7.093301e35,1.4788435e35,-7.187159e35,-3.6641508e35,3.2378615e35,-8.378978e35,5.0115346e35,1.2262904e36,7.033766e35,-8.631165e35,1.1660292e36,1.26054724e36,-8.421303e35,-6.8999673e34,5.4391774e35,8.567825e35,3.3650574e35,-1.6097276e35,1.4720933e36,8.256863e35,3.4049986e35,-1.4877732e36,3.7210172e35,-1.1155744e36,3.475269e35,-2.5253579e35,5.0922947e35,6.9855915e35,6.634628e34,1.6488911e36,8.7827294e35,1.5933107e36,-1.003329e36,9.619893e35,5.6962113e35,1.0416961e36,1.6136002e36,-6.976499e35,1.498937e36,1.8576005e36,-3.6348082e35,7.605201e35,1.8589033e36,-1.403375e36,2.1046993e36,2.094837e36,-2.5194552e35,-5.807669e35,-1.5616172e36,-2.2997586e36,1.6510517e36,-1.8475375e36,3.1160014e35,-5.623963e35,-6.0134064e35,1.4829683e36,2.2145087e36,-2.3217656e36,3.9274854e35,1.342441e36,-1.4296663e36,-2.5418703e36,1.066572e36,-2.3720725e36,3.0942936e36,7.4579624e35,2.8004465e36,4.6716696e35,2.557168e35,1.9543178e36,-1.4571621e36,-2.4545813e36,3.277865e36,-3.0152448e36,2.0871677e36,-2.1841723e36,3.3277616e36,1.7670292e36,-1.5675886e36,-1.9436809e36,-4.0834905e36,-9.807523e35,-2.1218115e36,2.9830525e36,3.5166833e36,-4.384543e36,-8.6958145e35,9.285258e35,4.5485493e36,1.4736636e36,-3.428779e35,4.7717813e36,-8.707871e35,5.086983e36,1.2799075e36,-5.2386368e36,-3.5310357e36,-2.3655455e36,-6.3088677e35,-6.1983614e36,1.8052073e35,-5.6130897e36,-2.539966e35,5.76007e36,-2.861875e36,-4.245458e35,2.7733311e35,5.921213e36,-6.8968584e36,-5.2561385e35,7.537957e36,1.4188032e36,1.864074e36,-5.690442e36,2.8279146e35,-2.9439043e36,-4.1202146e36,-9.78432e34,-2.3608375e36,-5.78501e36,6.454942e36,-1.1578024e36,2.2923544e36,-1.390341e36,9.533315e35,-2.5412333e36,-6.980935e36,-4.746572e36,-9.229284e36,-6.693021e36,4.5935227e36,1.5562389e36,-1.0868562e37,3.8622864e36,-6.172457e36,6.7516545e35,-1.479344e36,5.11552e36,2.2568865e36,-8.5355485e36,6.185346e36,9.085643e36,-3.481329e36,1.4886973e36,5.684617e36,-6.338295e36,-1.0400626e37,7.5284913e36,1.3496022e37,9.4576756e36,1.1797793e37,-7.16796e36,-4.3254603e36,1.5340082e37,1.5174614e37,1.0842786e37,-1.6256432e37,-3.0490898e36,5.729982e36,6.329939e36,8.6044035e36,7.206315e36,-3.6122252e36,-1.5320653e37,-1.1698753e37,1.8280557e37,4.5029976e36,-8.3007916e36,1.0818617e37,-1.3896488e37,1.2597046e37,1.9683314e37,-2.797701e35,-1.9511781e37,-1.9620942e36,5.7672436e36,1.2470951e37,9.852881e36,2.3676227e37,2.10581e37,1.8129389e37,2.6073522e37,6.1924174e36,-2.296519e37,-2.543134e37,-3.1812915e36,2.8422064e36,1.5239294e37,-1.2103703e37,1.3295747e37,2.8927706e37,-2.6946378e37,2.8434122e36,-1.6783812e37,1.2058657e37,-5.0777653e36,2.8745777e36,2.7856389e37,7.6035863e36,-1.5844672e37,-2.339439e37,2.2429158e37,9.882397e36,3.8038057e37,3.7198028e37,-2.7145118e37,-1.3699344e37,3.066215e37,1.964047e36,1.0285542e37,-3.370781e37,-8.681627e35,-6.953549e36,-2.7365004e37,-2.2405795e37,7.9449645e35,3.7069105e37,-5.921676e36,-3.9146042e37],"y":[-0.13530141,0.049573183,-0.15619385,-0.440655,0.13045087,0.21459995,0.02996883,-0.34293404,0.22373007,0.20570563,0.4362125,-0.10767086,0.44690484,0.04435251,-0.2762553,-0.022583421,0.37932646,0.17936707,-0.23549706,0.09695574,0.22982441,-0.18104805,0.25226682,0.46544245,-0.05339599,0.40926012,-0.38016278,-0.05327388,-0.49846223,-0.0042899107,-0.4603504,-0.07250753,0.4528812,-0.17662778,-0.09065519,0.029129364,-0.37262723,0.09181625,-0.039771557,-0.4374936,-0.4709681,-0.29433918,-0.13689755,-0.48189393,-0.19040234,-0.30326468,-0.06999206,0.4004957,-0.3249594,-0.16800033,0.48767614,0.3379897,0.03182333,0.3961574,-0.29572394,-0.32039794,0.104079634,0.28585315,-0.23409534,-0.031267524,-0.38807374,0.065372035,0.31294963,-0.14258663,-0.23088579,0.37967798,-0.19079866,-0.42902556,-0.10555846,0.25108892,0.091064654,-0.22986054,0.041069582,0.13636257,-0.14788243,-0.4527322,0.18012403,0.049419302,0.02471016,0.41288644,0.32370389,-0.12034691,0.4686247,0.14142153,-0.46040455,-0.21269041,0.23602585,-0.34781244,0.04362984,-0.21764086,0.43435037,-0.35369968,0.21541229,0.47334293,-0.14297855,0.47877693,0.27622202,-0.022226892,0.31297708,-0.19382758,-0.23669426,-0.40773165,0.26356852,0.36829764,0.33444363,-0.080309995,0.37252694,0.02674223,-0.4952242,-0.16788636,-0.34548035,0.020661915,0.16713797,-0.4519953,0.30875075,0.4657518,-0.03905377,0.23272228,-0.22053647,0.30885494,0.34708297,-0.36118585,-0.37148058,-0.21051829,-0.08446567,-0.15625757,0.3248929,0.03242164,0.30113333,-0.30056512,0.071261995,0.07286184,0.171174,0.047492467,-0.06144292,-0.41415703,0.03825065,-0.2132003,0.30927545,-0.4772247,0.19098014,0.0053372853,-0.40960512,-0.4869475,-0.27527437,-0.23341423,-0.15223747,-0.3243448,-0.4324398,-0.45776707,0.36899215,-0.3922856,0.4218117,0.43367827,-0.26581165,-0.18010898,0.4048662,-0.38537455,0.42476332,0.29827073,0.11121006,-0.28998575,-0.4819115,-0.033341415,0.4731982,0.30913582,-0.36325502,-0.25981477,0.09055521,0.25073558,-0.40754074,0.17054504,-0.2820732,0.018665181,-0.25478294,0.3978975,0.100277886,0.36624706,0.06011383,0.12183784,0.28696743,-0.2815191,-0.49569455,-0.30074704,-0.26641795,-0.42382833,0.151412,0.3996125,-0.39535478,-0.35346442,0.446453,0.04804506,-0.0182609,-0.113857545,-0.36084116,-0.4857192,-0.39778325,-0.4407807,-0.17639054,-0.33747527,0.28898326,-0.26393908,0.31451285,0.1982662,0.117746726,-0.06713607,-0.2868291,-0.31380966,0.018304313,-0.3391543,-0.3596064,0.122542,0.17987736,-0.4068802,-0.49797052,-0.41820958,-0.4816853,-0.37980202,-0.39133978,-0.28421456,0.30508643,0.308308,0.16588801,-0.07242601,0.33893448,0.4561672,-0.1344598,0.09281319,-0.15573831,0.12110383,0.3159237,-0.39916557,0.07602094,0.018981054,-0.014554736,0.39045286,-0.25517097,-0.10986795,0.06469508,0.230082,0.2216065,-0.39934808,-0.4930108,0.42038405,0.047041357,-0.04585311,0.44871333,0.48332354,-0.4326156,0.4681763,-0.3431033,0.16341107,0.25868455,-0.3795944,0.26665288,-0.2493608,0.26728055,0.30556777,-0.08937447,-0.44903007,-0.33794355,-0.20227386,-0.028627142,0.2401535,0.19856383,-0.35464275,0.07057075,0.35255378,-0.043250494,0.4131991,-0.30086976,0.45202276,-0.4709273,0.043692805,0.33740103,-0.30110088,0.006798048,-0.3528178,0.070993766,0.005045938,0.05766936,-0.09693692,0.41812742,0.30955702,-0.42834595,0.30438706,0.032481924,-0.22080891,0.21612148,0.27060312,-0.17203984,-0.4618071,-0.11075065,-0.07307847,-0.46586013,-0.129449,0.15646896,0.44814822,-0.28585792,0.27286217,-0.20517798,-0.44032365,-0.42465904,-0.10978698,0.33628345,-0.47523394,-0.4202194,0.28330868,0.32224172,-0.34484684,0.39713916,0.2982245,0.3620421,-0.12531555,-0.39961904,-0.12301013,0.042361807,0.19228707,-0.05996955,0.3305674,-0.22138745,-0.35785857,0.23244762,0.27053657,0.1952555,-0.35853198,-0.27943236,0.482179,-0.10852309,0.4559995,-0.020616656,-0.11184384,-0.031885076,0.06175608,0.031459473,-0.38037893,0.20471226,0.18699332,0.294975,0.1227187,-0.09695821,0.096166536,-0.02732115,-0.2137003,0.12457933,-0.4409094,0.23544204,0.33829695,-0.009824866,0.38858986,0.2207731,-0.28125304,-0.19000272,-0.36716262,0.31161016,-0.3960073,-0.37581217,-0.21421872,-0.45773938,0.1329749,-0.3634059,-0.075404204,0.076412514,-0.23005325,0.05533182,-0.33384937,0.08423685,-0.23291446,0.19229273,-0.1407577,0.39828056,0.48893544,-0.06959772,0.025949793,0.3614862,-0.26182154,-0.44045645,-0.30783,-0.47498015,-0.33921418,0.39572027,-0.49220017,-0.41013145,-0.09895309,0.2899782,0.16647255,-0.27104256,0.3677426,0.34223717,-0.07872404,-0.2710959,0.44156903,0.13699378,0.29240072,0.25690016,0.13211735,0.101963416,-0.15597442,-0.08319601,0.46494263,0.20157696,-0.17792326,0.3531551,0.25485006,-0.36815336,-0.3152275,0.49392658,0.05000666,0.18479444,0.405811,0.26029745,0.035364922,0.09597695,-0.3178348,0.03103603,-0.05373839,-0.36509296,-0.07117173,0.17978843,0.1482658,-0.44957966,0.48008767,-0.36505672,-0.026164342,-0.46007088,-0.34315786,-0.21626952,-0.03000402,0.35027012,0.106478825,-0.22505479,-0.27408847,0.32933468,0.38911194,0.42378256,-0.47774228,-0.3319149,0.10107671,-0.30641216,0.13125613,0.1765967,0.19153158,0.19686075,-0.38495412,-0.35510468,-0.114934914,-0.32501468,0.4752635,-0.0149495695,0.17480199,0.4399123,0.18913116,-0.042986155,-0.17756218,0.034975063,-0.24987727,-0.37416264,-0.2167327,0.21844125,-0.49352053,-0.11555818,0.3855784,-0.20147444,-0.09796707,-0.14478864,0.41903538,0.1886245,-0.068961136,0.37275004,0.4370154,0.06413311,-0.22671211,-0.39074692,0.15973248,0.19421932,0.35453457,0.3357829,-0.12801492,0.15408094,0.16607542,0.21978493,-0.35124156,0.32703283,0.37404448,-0.30223724,0.0791696,0.1421368,0.21950378,-0.2289601,-0.4925266,0.2461157,0.17970647,-0.16731939,-0.15465856,0.2969092,-0.031184565,0.44393402,0.41487172,0.007053783,0.26504847,0.47502935,0.32534447,-0.3544963,-0.1483464,-0.48292756,0.36822185,0.38204533,0.055552226,0.29399082,-0.24514534,-0.0026672718,-0.40617535,0.4720113,-0.39772442,-0.001010647,0.32235032,0.039586764,0.2796959,-0.3067952,-0.42152023,-0.43123516,-0.2984319,0.2966078,0.1345904,-0.30495638,0.37020183,-0.08138719,-0.27852315,-0.10131519,-0.17013958,-0.19527462,-0.23452702,0.09086363,-0.24183168,0.09238448,0.2911701,-0.10005607,0.18084294,-0.4815737,-0.4809149,0.37274268,-0.044222414,-0.47694284,-0.20485756,-0.32171813,0.05878651,-0.21607114,-0.0049394257,-0.21163088,0.11982475,0.30679947,-0.29450068,0.0105283875,-0.05296657,-0.14710341,-0.0049196943,-0.22678691,0.20398077,-0.40229765,-0.30146214,0.09268818,0.1673188,-0.46682262,-0.20762926,0.42574686,-0.16523711,0.3945965,-0.1366742,-0.19069736,-0.42315918,-0.3687994,-0.27545673,0.2968045,-0.4971289,0.49884355,-0.041703045,-0.15044565,-0.3126372,-0.0075964537,-0.43708962,0.32174248,0.091296546,0.3550363,-0.11585432,0.43071637,-0.0135317175,-0.19739257,-0.14019364,0.41104805,0.1466327,0.34824958,0.096827045,0.42311248,0.22324775,-0.45294338,0.08544986,0.43970203,-0.34932315,-0.31814185,0.11184074,-0.035389885,-0.26616934,-0.12483595,0.16415189,0.41871488,0.06773202,0.13150872,-0.16605188,0.37175432,0.15142351,-0.4031158,0.16164011,0.4960785,0.05880428,0.48547292,-0.22752629,-0.4777706,0.051309675,0.2979374,0.3853405,-0.19965021,-0.44334796,0.38059017,0.4536571,-0.099534824,-0.43092683,-0.15583983,-0.25233597,0.33958718,-0.38849837,-0.47081,-0.22454573,-0.021166513,-0.48368457,-0.46037933,0.12709174,-0.14086092,0.004816107,0.46071374,-0.4195637,-0.39750966,-0.07322267,0.13498347,0.0069680926,-0.34820542,0.2283801,0.33573827,0.08933705,0.13083105,0.13422513,0.49257526,-0.3907261,0.19734009,0.3886455,-0.061292954,0.4421463,0.15280119,-0.3575879,0.12449576,0.16494049,0.22505516,0.46094996,-0.38633263,-0.29770064,-0.15164115,0.3146055,0.09758144,0.0659106,0.14905645,0.43959084,-0.21735243,-0.079681344,0.23052575,-0.1723194,-0.017627802,-0.32688686,-0.115311205,-0.48815468,0.13193466,0.25860074,0.32710692,-0.13080059,0.48784786,0.44955638,-0.22161677,0.3323355,0.3688453,0.12306965,0.3313494,-0.08027844,-0.2771999,-0.17378928,-0.49697763,-0.3547699,-0.12617615,-0.096412316,0.22730568,0.3295911,-0.008502681,0.11551499,0.46771118,-0.40932518,-0.2766324,0.3587491,-0.048799083,0.33438286,0.30535173,-0.039062433,-0.14006974,0.25069907,0.33764192,0.1898038,-0.2323772,0.36128116,-0.2898237,0.24009176,0.16824426,-0.32284853,0.08463517,0.15318717,0.29932266,0.1695706,-0.17470826,-0.46857494,0.09083336,-0.45197326,0.3123452,0.3688264,-0.43846124,0.45605102,-0.4156948,-0.13055573,0.44075146,-0.21918078,-0.07801335,-0.26094905,-0.19190362,0.30080208,0.39085525,-0.30322617,0.33934036,-0.39884445,-0.32894975,0.21477729,0.2544493,-0.17566457,-0.35199448,-0.23505951,-0.04120194,-0.43053013,-0.39372292,0.44033214,-0.4029979,-0.3967074,0.22688821,-0.07546578,-0.10056287,-0.12944897,0.09980143,-0.42438298,0.399999,-0.31967956,0.40892264,-0.39489236,0.40259546,-0.3064903,-0.14034548,0.15131043,0.40096354,-0.34363547,-0.3782566,0.41564807,-0.11665653,-0.26989803,0.03675829,-0.052621037,0.21565594,-0.36160555,0.2756812,0.14914265,-0.24651037,-0.18546562,-0.4663026,0.3373893,0.4378785,-0.25391296,0.3306224,0.092761554,0.29074404,-0.11832037,-0.32623816,0.04520155,-0.11872318,0.087129384,0.38239387,0.31248572,0.48158455,0.37414524,0.19800024,0.1575602,-0.23456585,0.32302785,0.14712061,-0.46837717,0.33341593,0.05728209,0.2827391,-0.10370813,-0.26362354,0.4674392,-0.09725725,0.21135461,-0.46107098,0.3473825,0.43060422,0.075981624,0.32384646,-0.29759765,-0.2532197,-0.48880088,0.21535707,0.12129946,-0.22070223,-0.16202572,-0.47691107,0.055165328,0.46646288,-0.32861143,-0.14281633,0.31729022,-0.123222075,-0.08938102,-0.06121346,-0.23396432,-0.089988545,0.456499,0.23244397,-0.1392996,-0.37541282,-0.29442844,0.12307986,0.05265396,-0.4213696,0.23807056,-0.14853396,0.16188161,0.4725467,0.2488787,-0.08193054,0.3274882,-0.08681648,0.42296246,-0.25066134,-0.07486222,-0.017205574,-0.33520532,-0.14883024,-0.44073224,0.12882139,-0.38974681,-0.09783277,0.02619956,0.23618212,-0.38869792,-0.026641462,-0.35594285,0.14790913,-0.08713838,-0.3624793,0.016191084,-0.07425049,0.09745508,0.25596282,-0.16495869,0.18428232,-0.26876867,-0.48933592,-0.12651753,-0.12888739,-0.41235116,0.092910685,0.25412863,0.038083095,0.16615818,-0.21788168,0.19797246,-0.11068593,-0.034227073,-0.32748076,0.43206015,-0.36901972,-0.40764558,-0.044674892,-0.06707877,-0.23037311,-0.43091357,-0.2108658,-0.028959183,0.072987914,-0.18333459,0.19182193,0.46142614,0.32788742,-0.12375649,0.13042265,0.4575233,-0.31068486,-0.18085216,0.061346337,0.14988075,0.005168613,0.2420252,0.3522647,-0.38729322,-0.12574367,0.08022967,0.31605434,0.058950204,0.37931463,0.108497165,-0.118495025,-0.20983815,-0.24053323,-0.39607695,0.34632534,-0.051888008,0.41469315,0.46473855,-0.2934268,-0.016020393,0.24116176,-0.11610771,-0.11732468,0.07702825,0.4040229,-0.23137178,-0.23425362,0.41797295,-0.376545,0.37917155,0.20269156,-0.4379735,0.48017067,0.2924785,-0.24871941,0.34251177,0.021095991,-0.2758356,-0.330615,-0.25986385,0.05778318,-0.4850636,0.24131651,0.19653907,0.21052942,0.48782519,-0.26444164,-0.2244586,0.4631511,0.04468607,-0.03821539,-0.19030991,0.13637371,-0.42550433,-0.39806378,-0.024061464,0.0717314,0.2782914,-0.15338936,0.030161705,0.15193735,-0.3587627,-0.10901683,0.11904691,0.1184376,-0.0019313232,-0.37648022,0.46619672,0.22374469,0.2594056,-0.22999312,0.3474918,0.3393769,-0.44138265,-0.090748236,0.14779505,0.29851368,-0.022808123,0.013978729,0.19397719,-0.19972594,-0.2827681,0.37923267,-0.04634332,-0.23550645,-0.07067044,-0.29713336,-0.11966391,0.21626042,-0.2459791,0.45376432,0.014019692,0.101998456,-0.101645745,-0.028713742,0.2483755,0.3906014,-0.013612467,0.21979769,0.06410222,-0.18880384,0.4375792,-0.23921594,0.3912512,0.2819262,-0.3818527,-0.36304566,-0.13465223,-0.031074889,-0.43370083,0.31719384,-0.42084953,-0.009587879,0.33490694,0.114076234,-0.113634385,0.20497866,0.023345044,0.27599916,0.06121832,-0.36824957,0.26031035,0.25651422,-0.22248867,0.046559688,0.015543081,-0.07866476,0.1943735,0.03233345,0.2917288,0.26634437,-0.2653997,-0.46423024,0.37104353,0.006429601,0.34100866,-0.03502518,-0.20803776,-0.070617996,-0.26020348,-0.07962622,-0.0096430415,-0.09830382,-0.018198676,0.3449966,-0.28058222,0.29410395,0.09124156,-0.22578241,0.08303463,-0.38936186,0.19114509,0.057796974,-0.4187469,0.2584752,0.34057626,0.039921083,-0.20415148,0.122660555,-0.108701535,0.28939462,-0.3353078,-0.23702382,-0.48025566,0.19326472,-0.13724494,-0.35372964,-0.16940796,-0.013273357,-0.49566358,0.47330067,-0.35931346,0.41105518,0.10195073,0.25361624,-0.07572788,0.33617657,-0.09690925,-0.2543573,0.022794891,0.110367924,0.28615618,0.48192143,0.37378013,0.25921473,-0.4544412,0.39614895,0.06397734,-0.09449218,-0.025705433,-0.4069046,-0.064821854,-0.46332029,-0.09627163,0.41500798,0.44352636,0.36489037,0.03572953,0.14636263,-0.20334662,-0.024577925,-0.41269815,-0.22175905,0.48285118,-0.28587776,-0.11360107,0.49783093,-0.41861352,-0.239353,-0.43800426,-0.19755279,-0.4460061,-0.19114691,0.17172621,0.35597923,0.1434964,-0.2692041,-0.08546478,-0.17331104,0.17751583,-0.45584387,0.27004665,-0.44890484,0.111925066,-0.48351815,0.36490867,0.46991858,-0.43512574,0.42072287,0.2672146,-0.045322496,0.4468746,-0.24476638,-0.15838648,-0.22732736,-0.2983874,0.013156137,0.43554977,0.22258008,-0.024164299,0.15899085,0.15884413,0.40822956,0.46073374,-0.13456677,-0.19077353,0.20480555,-0.2307401,0.12287508,-0.2935031,0.17094675,0.026155557,-0.10821082,-0.0864436,0.10916183,0.27624017,-0.2189429,-0.40319705,-0.40511847,-0.34341273,-0.37815946,-0.35498586,0.20325339,0.1254546,0.27201718,-0.316731,0.1587426,0.15255931,0.34929985,0.30623102,0.21695721,-0.350106,0.2162721,0.44517046,0.3461319,-0.26094976,-0.42755654,0.22885357,0.28436023,-0.16917233,-0.13742474,-0.39010745,-0.22613941,-0.0098111965,-0.026342673,0.29373935,-0.35205242,0.371809,-0.027222574,0.4309587,0.415936,0.12760562,0.12601466,0.2516932,0.34434438,0.4101175,-0.4876105,-0.10934146,-0.12506293,0.16520636,-0.2942287,0.4320606,0.22757171,-0.113298915,-0.02183666,-0.26766565,-0.22334212,0.03652231,-0.30454522,0.2030868,0.24065146,0.21902041,-0.29494783,0.1751541,-0.090284474,-0.19478275,-0.4381392,-0.43570817,-0.048359476,0.17908973,-0.36659133,0.28164667,0.17535956,-0.4435379,0.47217992,0.0024249943,0.46217465,-0.29623756,0.25927767,-0.10808629,0.39894912,0.15744646,0.10584325,-0.062397674,0.16496551,0.024914661,-0.05014721,-0.4622532,-0.42852768,-0.45487204,0.29709467,0.060251363,0.45833004,0.40754357,-0.45882258,0.33404753,-0.32921717,-0.24516885,-0.19724558,-0.37856987,-0.20372526,0.26738802,0.1856225,0.24340564,-0.3119009,-0.04719235,-0.095954,0.29850718,-0.30353808,0.4836051,-0.41085395,-0.30307168,-0.26507774,0.23524486,0.031881597,0.43238753,-0.45798156,-0.38036612,0.32049444,0.27052397,-0.32248276,-0.043384425,0.45376304,0.261287,-0.32498318,-0.461508,0.08754762,-0.059239674,-0.07266843,0.36982957,0.11504907,-0.028327119,0.007504379,0.31352726,-0.4258866,0.40083748,-0.36597258,-0.06300014,-0.31743008,-0.16276447,0.097683184,-0.47104093,-0.24337508,0.4255491,0.119343765,0.104152784,0.4755456,0.19808947,-0.3085291,0.43704346,0.29243174,-0.42239022,-0.045432314,0.4030192,0.066420294,-0.078974225,-0.45642152,-0.16344069,0.031234981,-0.0861214,0.13394006,-0.24486613,-0.043978374,0.21804158,0.44573662,0.340612,0.39128983,0.2827026,0.034626905,0.49997863,0.0944057,-0.46036595,-0.35489848,-0.19019186,-0.24695972,-0.47358665,-0.23853895,-0.33147073,-0.4340668,-0.035589673,-0.29114214,0.10187856,0.07773664,0.111152664,-0.34997305,0.19714232,0.13616681,-0.49354583,-0.37647495,0.4218383,-0.2533803,0.0045733545,-0.04336019,-0.13668092,-0.108229496,-0.40598443,-0.1616299,0.2127895,-0.27806634,-0.20512956,0.35678878,-0.3917926,0.41238487,-0.106827855,0.44163716,-0.2657296,0.43394855,0.22507851,0.34328508,-0.051959395,-0.016412394,-0.4176423,-0.49610826,-0.23911673,-0.36826795,0.22074501,-0.08003677,-0.100054815,0.40422264,0.39999062,-0.3545556,-0.3186522,-0.35710353,-0.31274557,0.28723657,-0.24030052,-0.4058082,-0.42670152,-0.4062083,-0.17863494,0.016390314,0.45781085,0.18618353,-0.48323753,0.23227891,0.3348063,0.07759968,0.43333584,-0.3315149,0.2967729,-0.08875197,-0.443814,0.3932428,-0.2826469,0.30156344,-0.1736588,0.2818796,-0.42070606,0.047174,0.11866507,0.16643655,0.38060474,0.038325105,-0.19963685,0.13829333,-0.14189298,-0.34395888,0.2113786,-0.23168863,-0.03494037,-0.36856204,0.15466642,-0.29764995,-0.04428314,-0.10070789,0.10692091,0.15597479,0.076578945,0.25868532,0.090804674,-0.36927503,-0.06701549,-0.18077278,0.30437443,0.08287887,0.2529073,0.40987626,0.11356487,-0.38101807,-0.22272788,-0.2680144,-0.011690796,0.03356645,0.44404393,-0.48922348,-0.25582254,0.06410144,-0.09207339,-0.4697271,0.26725397,0.2650157,0.14408758,0.15830177,0.46863174,0.46403375,-0.13197988,-0.40236947,-0.3924006,-0.03546719,0.20515935,0.31372795,-0.012770657,0.30971873,0.4983495,-0.088352025,0.3413517,0.38752905,0.1761167,0.2554475,-0.37544388,0.2532865,-0.0760154,0.032401126,0.053769067,-0.27155337,0.41593572,-0.19756411,-0.38261372,-0.44829586,-0.09412322,-0.08696242,0.08495173,-0.2141103,0.11354095,-0.06200294,-0.4793563,-0.08124803,0.10967811,0.060353097,0.49766302,-0.053750064,-0.17328443,0.45929593,-0.013803725,0.31663907,-0.4633988,-0.45972243,0.3826736,-0.0991087,-0.25808048,0.49499235,-0.040553115,0.01851158,-0.21019623,0.48078075,-0.40955573,0.16938585,-0.090050764,0.3855734,-0.29520267,0.25429022,-0.23310643,-0.19440949,-0.4863685,-0.19723198,0.4499661,-0.36600894,-0.4320785,0.43950877,-0.20662835,0.09287634,-0.22375475,-0.19804096,0.4910041,0.3156898,0.3417588,-0.2535381,0.21073382,-0.068328425,0.27004144,-0.1612382,-0.41520548,-0.38805592,0.1271945,0.49523023,-0.12706508,0.21452509,-0.014006024,-0.28865877,0.18172888,-0.357355,0.13432705,-0.2297382,-0.43846545,-0.3602871,-0.22557864,-0.3465168,-0.4951449,-0.04949226,-0.37207252,0.36216208,0.39970204,-0.11470503,0.06713277,0.3564308,0.23426549,0.13743834,-0.4622686,0.4450969,-0.4414187,-0.1769346,0.056683287,-0.11910861,-0.46396452,-0.36013603,0.45617673,0.15298809,-0.10190085,0.06432642,0.016087534,0.46576217,-0.122812346,-0.040285166,0.02612939,-0.49322122,0.2499492,-0.092380576,-0.43444726,-0.4659912,0.11611117,0.07860191,-0.08092585,0.27052554,-0.3505984,-0.26954007,-0.23315252,-0.024881097,0.32315716,0.3146262,-0.21310067,0.26228768,-0.49047735,0.49513727,-0.35076654,0.32788175,-0.2413192,0.1369159,-0.03750155,0.20464782,-0.09160855,-0.44920278,0.10617083,0.3831281,0.25049064,0.0047972547,-0.12027103,-0.48350087,-0.18131171,-0.16882011,-0.30741325,0.4801503,-0.13029113,0.28117117,0.4267324,0.09091105,0.3482065,-0.19602549,-0.08126694,0.14120695,0.33309087,-0.36476353,-0.2726434,0.13579437,-0.4816032,-0.008333617,-0.31592107,-0.019460658,-0.3259269,-0.20087777,-0.40841943,-0.15911345,-0.024417339,-0.467019,0.058535878,0.31463856,-0.41411853,0.4994638,0.20274916,-0.46322772,0.36092594,0.03312472,0.2983225,-0.07793013,-0.21546975,-0.4989405,0.15127248,0.112103395,-0.2289524,0.13390943,-0.01410583,-0.013940517,-0.009690488,-0.35703638,0.30646792,0.31463456,0.31086132,-0.056870285,0.46398607,0.38056532,0.03335171,-0.050359894,-0.0835843,0.48836276,-0.114200376,0.20306055,-0.18952979,-0.12611488,-0.07118838,-0.11037942,-0.33218977,-0.32802916,0.36286178,0.09155047,-0.2968166,-0.27195978,-0.45909956,-0.30166295,0.16532294,-0.34658495,0.0065082903,-0.27746958,-0.3443656,-0.43767786,-0.065137595,-0.15166771,-0.3660625,0.25622812,-0.487164,-0.0700988,-0.4239299,-0.06505815,0.24554563,0.06602907,0.41144574,-0.17729384,-0.08502017,0.30059415,0.2879003,-0.03959443,0.40606454,-0.4623244,0.39634278,0.25105253,0.06769553,-0.10806269,-0.33445445,-0.09814343,-0.320591,-0.1498926,-0.18995078,-0.23618431,0.37564507,0.31364313,0.24108796,-0.2969397,0.17652272,-0.163021,0.33003747,-0.4899244,-0.23697081,-0.4258634,-0.14681113,0.18637782,0.14078481,-0.3401794,0.4773777,-0.36086765,0.1141595,-0.17069802,-0.26510474,0.23377347,0.095240876,0.3895105,-0.29430515,-0.29896042,0.46229064,0.34986275,-0.42273653,0.11709132,-0.26816478,-0.062602416,-0.24245909,-0.055018853,-0.14193375,0.14178309,-0.26678923,0.2685347,0.24893011,0.0025016363,0.18997048,0.34020394,-0.10134238,0.3675725,-0.029468266,-0.009852389,0.043922156,0.45198354,-0.38972962,-0.040752992,0.03213188,0.20334296,-0.14852159,-0.3030687,0.07424043,-0.40441206,0.12663354,0.0773024,-0.41371256,-0.10612829,-0.08061358,0.39674747,0.49536088,0.13644116,-0.4045968,0.29924828,-0.49818602,0.2204162,0.1942593,0.36238217,0.23988184,-0.3380573,-0.06300025,0.3624584,-0.15788664,-0.077659585,-0.14023681,0.30560276,-0.33830515,0.016402103,-0.45708978,0.33930013,0.10536875,0.2567556,-0.15889888,0.37551498,0.45212397,-0.32514334,0.23498607,-0.42712465,-0.37556222,0.34919322,-0.16897917,0.097465426,0.09104092,-0.026621379,0.45310423,0.3036643,-0.24016218,0.16358322,-0.28358972,0.15668403,0.3244972,0.42123875,-0.27084804,0.003340366,-0.48110837,0.3256093,-0.08751515,-0.25849763,-0.05517547,-0.10279134,-0.4506836,0.35157695,0.39955238,-0.20329218,0.021733873,0.43286875,-0.32102606,0.22803916,0.26429072,0.33995274,-0.2447335,-0.4386834,-0.43500108,-0.3153516,-0.48169187,0.36484557,0.042518843,0.19322756,0.4978292,0.0037602643,-0.3201544,-0.38123575,0.10198691,-0.00067690416,-0.200591,0.32660967,0.45334545,0.27241072,-0.22597189,-0.091871955,0.3567588,-0.28050765,-0.33519548,-0.23597527,-0.0623113,0.46971622,-0.20906743,0.370949,0.471939,-0.03979677,-0.21268703,0.15738635,0.068912216,0.22907668,-0.4000754,-0.063477285,-0.3876575,0.23654921,0.4861232,0.2600153,-0.037520822,-0.069559045,0.45279983,-0.148942,-0.3999603,-0.1965431,0.36011738,-0.1996122,-0.19322374,0.3844461,0.08397507,0.15360269,0.262934,-0.05740106,-0.19858584,0.3238991,0.10502696,0.4317074,0.0014141402,-0.47014448,0.40326828,-0.38063776,-0.0847427,0.09107691,0.18400107,0.024904994,0.07672843,0.25030926,0.2381768,-0.025239773,0.004407686,-0.4247073,-0.39473584,-0.33668536,-0.4542451,0.14252768,0.39090696,0.11358744,-0.43519288,0.32239538,0.46076858,-0.20990276,-0.4615087,0.41678149,-0.3733516,0.21952768,0.42139885,0.29977018,0.13381131,-0.45001268,0.43671614,0.20271125,0.36535847,0.024611907,-0.15951437,-0.011902067,0.45449138,0.29325518,-0.3469882,-0.42825013,0.24419552,-0.2781767,-0.20877263,-0.36631292,-0.090130925,-0.3015486,0.15188728,-0.40474015,0.062841594,-0.031149663,-0.12986155,-0.33711174,-0.04429835,-0.11279238,-0.27656654,0.4706081,-0.350264,0.00076690945,-0.119284466,0.22088997,0.44550294,-0.43481117,-0.41469705,-0.12615454,0.09046119,0.23076074,-0.28002414,-0.29255682,-0.4509381,-0.3198751,0.08297261,-0.3449594,-0.18578191,-0.46006164,-0.22018981,0.025949627,-0.268916,-0.10451143,0.44923863,0.2324482,-0.48844248,0.29133055,-0.31342858,0.23524739,0.059242595,0.46590945,0.011873711,0.20374767,0.20052046,0.17762047,0.45590535,-0.41873354,-0.021142455,0.48247018,-0.37345538,-0.48517972,-0.12187909,0.47991523,0.277201,-0.21496391,-0.49536085,0.31409281,0.29165283,-0.033019047,0.3206063,0.3100368,-0.3364595,-0.19015203,-0.30237472,0.23791228,-0.41930777,-0.043561336,0.29862276,0.07704192,0.158493,0.37831202,0.27175283,0.32629338,-0.30773476,-0.23021552,0.084371135,-0.15979064,-0.3297726,0.35465136,-0.3291244,-0.074597195,0.35521555,0.20190835,-0.017898012,-0.2565353,-0.32642606,-0.310616,0.1867984,-0.22147718,-0.025368482,-0.013780215,0.32884598,-0.25166926,0.24145788,-0.19898523,0.22739428,0.46912104,0.27517545,-0.07141937,-0.4330299,-0.44577476,0.42532864,0.4280947,-0.005037547,-0.12133859,-0.041989014,0.16597518,0.30432433,-0.31538454,0.121704824,0.016263248,0.32102132,0.23900554,0.015975077,-0.4100459,-0.4506276,0.22502,0.4952779,0.3045569,0.0049355724,0.019624857,0.05455411,0.2220206,0.1146961,-0.0988689,-0.44353715,-0.053549737,-0.09386245,-0.24623512,-0.34947246,0.28853044,-0.15388292,-0.22664812,0.40750533,-0.30514526,-0.24880749,-0.07532831,0.025366174,-0.12346421,-0.49725994,-0.39348355,0.32589743,-0.43760335,0.21876693,0.29486555,-0.003578383,-0.42566386,-0.3150417,0.08173302,-0.07917701,-0.40790513,0.07402448,0.30556327,0.09659073,0.032971114,0.4940838,0.3150935,-0.45453462,-0.3203675,0.2652011,0.1602856,0.10966889,-0.26380762,-0.019051082,0.11857759,0.14830753,0.18150392,0.34930328,-0.13371237,-0.40500593,-0.26062664,-0.26279986,0.07137459,0.23816618,-0.48341262,-0.19256513,-0.12391421,-0.29167432,0.433516,0.47123474,0.14931926,0.017349755,-0.13815023,-0.15609065,0.45974693,-0.43918678,0.49695212,0.14813344,0.36980397,-0.3819854,-0.4929917,0.3747445,-0.1203029,0.4672446,-0.18270524,-0.19881225,-0.17891386,-0.3974614,0.4211466,0.32979694,-0.46477023,0.4885642,-0.19933487,-0.40595686,0.09101858,0.10355097,-0.2250862,-0.4941972,-0.30863538,-0.13761151,0.1379066,0.30545524,0.088028,0.2320624,-0.3859465,-0.120078474,-0.48814535,0.18475652,0.23447551,-0.10370943,-0.0053520673,0.3252118,0.17928344,-0.12817115,-0.0684147,0.32632342,0.47682208,-0.17408045,0.23227519,0.019522041,0.16087428,0.41178593,0.42560658,0.11724349,0.3218816,0.016851066,-0.05431697,-0.35187617,-0.109874286,0.43327338,-0.042522077,-0.2542837,-0.4687832,-0.13190664,-0.31213972,-0.29570112,0.4488564,-0.35581234,-0.28842518,-0.48489782,-0.025891509,0.41396025,-0.040527206,-0.17116454,-0.3764545,-0.49091113,0.3940573,0.44711843,0.3471955,0.25630832,0.46238324,0.049764916,0.4766186,0.38102376,-0.20024705,-0.31112728,0.11262154,0.058514416,0.10001359,-0.1457985,0.21424362,-0.44548532,0.037493363,0.47698843,-0.27395418,0.015133105,-0.073396415,-0.07097552,0.022465516,0.2672477,0.10338076,-0.4242453,-0.31798008,-0.49220243,0.39391297,0.1580254,-0.41270393,-0.12320012,-0.33942446,-0.46222535,-0.4543865,0.4015871,0.10244286,-0.26396626,0.2502728,0.101021945,0.4619306,-0.106299736,0.39380184,-0.06822816,-0.092454165,0.031298835,0.33406702,-0.15879317,0.241342,0.30705297,0.25612473,-0.4448604,0.22759289,0.09107455,0.1600799,-0.41643372,0.22022766,0.27614403,0.13258648,0.32498702,-0.24182998,-0.24852808,0.33615574,0.10819617,-0.0010722927,-0.19518033,-0.08251069,-0.036782283,-0.27734366,-0.41765717,0.22626223,-0.13487977,-0.2426805,-0.020105254,0.035757773,0.44592312,-0.49956957,0.1978918,-0.18136898,0.16595821,-0.020206051,0.3106609,0.26205954,-0.46537715,-0.43948612,0.16463138,-0.22851317,-0.39799216,-0.36420122,-0.03321391,0.46102244,-0.1241571,0.17901291,-0.41403073,-0.30033255,-0.09703668,0.035200585,-0.21789558,-0.39234608,0.3141184,-0.474157,-0.1195144,0.43741566,0.25448933,0.29566577,0.14326748,0.2578301,0.033618398,-0.25235084,0.3493823,0.39866984,-0.43538582,-0.035559665,-0.040310707,-0.17882848,0.029762607,0.38695636,-0.47443905,0.34866872,-0.3510004,-0.28806174,0.24008934,-0.3857125,-0.43123358,-0.44323957,-0.44052213,0.24122787,-0.26243332,-0.45954683,-0.30173588,0.090402305,-0.04404288,0.44283286,0.23224497,0.020627243,-0.17444958,0.23073494,0.05219392,-0.01892005,0.340681,0.079477094,0.43521044,-0.29085588,0.16683604,0.31611437,-0.1837631,-0.26380837,-0.14315318,-0.33786365,-0.34711105,0.37076253,-0.31785092,-0.09616186,0.11742828,0.23184307,-0.014634827,0.3557783,-0.033580802,0.48879132,0.066536136,-0.430236,-0.4453844,-0.36435413,-0.2924148,-0.2807706,0.12992564,0.1741465,0.17713897,-0.44652635,-0.37943074,-0.17104395,-0.26136407,-0.35004008,-0.11309287,-0.3580163,-0.43210888,0.15787844,-0.47480464,-0.28523117,-0.4219189,0.41551563,-0.014067295,0.05196553,0.022774676,-0.4792091,0.1272201,-0.18568365,0.22129925,-0.11074841,-0.39498806,0.15891093,-0.19136868,-0.21177368,-0.3309615,-0.37710643,0.11200202,-0.31301594,-0.45221734,0.01721097,0.30379304,-0.2692555,0.06145593,0.16668329,0.47148192,-0.34903663,-0.20901233,-0.32151943,0.11645053,0.18968937,0.47664768,-0.054637812,-0.42275336,0.29252264,0.043209348,0.45556962,0.23427312,-0.19537085,0.39375126,0.02014897,0.345872,-0.41851762,-0.33870518,0.2277305,0.22901806,0.4741541,-0.34029713,-0.239791,0.21311943,-0.14070971,-0.28934282,0.24416237,0.21989274,0.17248093,-0.27043962,0.19351426,-0.16219757,-0.3616345,-0.06613409,0.21042222,0.062192526,0.0008383232,-0.10924663,0.41097188,0.26574394,0.42557684,0.45780218,-0.24970989,-0.078282006,0.15806842,0.22564338,-0.47686678,0.2489295,-0.2854407,0.49364474,-0.21144341,0.4093155,-0.31356475,0.3970342,-0.39997646,-0.45452657,0.027197128,0.29385516,0.34414324,-0.06632485,-0.13806349,0.10051844,-0.15136622,-0.4153655,0.42622265,-0.36224055,-0.31211275,0.021894325,0.3928214,0.15305424,0.3133908,0.21642943,-0.007270243,-0.12771408,0.07652881,-0.052807387,0.21570653,-0.28140134,-0.1790164,0.46243075,-0.006586193,-0.31144366,-0.37623203,0.09427175,-0.06650081,-0.36814794,0.24339361,-0.30043098,-0.22421555,0.27539587,0.42110196,0.4010391,0.25334924,-0.035164982,-0.07101515,0.31775612,0.2927336,0.3395379,-0.094819605,-0.19957942,0.21804418,-0.30536094,0.2819885,-0.07454199,0.47641847,0.39843127,-0.39597115,0.17454515,-0.15575936,-0.47764313,-0.37944788,-0.19597565,0.35580572,0.32002735,-0.22623394,-0.3476154,-0.4252451,0.22023013,0.18415399,-0.063212,0.31886587,0.17633148,0.3348543,0.31113967,0.31358868,0.08169168,0.05202016,0.18880266,-0.07300969,0.045525048,-0.4589757,0.37157357,-0.23507771,-0.29606065,0.3030498,-0.14467275,0.19333008,-0.29754877,0.31918606,-0.011870756,-0.42813304,-0.3610741,0.45330077,-0.05571931,-0.37853178,-0.039253097,-0.11306687,-0.25169122,-0.46608084,-0.34338447,0.020365497,-0.2671887,-0.39247373,0.13093019,-0.18330902,-0.069659956,0.10568117,-0.41409197,0.03027451,0.3177905,-0.17344841,0.28431624,0.35567027,0.18890975,-0.48656616,-0.4335454,0.22471042,0.20988256,-0.47864503,-0.20517403,0.39955598,0.20951387,0.09094322,0.4310755,0.4335926,-0.38985863,0.44551837,-0.011894631,0.398332,0.17015645,0.23599835,-0.23404334,0.022301987,-0.3180893,-0.2950418,0.16861896,-0.4819049,0.493655,0.21874571,-0.42778158,0.04736266,-0.24600749,-0.3177471,0.27172408,0.16471514,0.2875249,0.119001746,0.47646734,0.23763293,0.3520451,-0.34258246,-0.33292007,0.43489757,0.31947947,-0.4803235,-0.0061198357,-0.002233305,0.028166214,0.41102523,-0.13430327,0.053303655,-0.44999465,0.39882642,0.47897676,-0.47333357,0.3601474,-0.011492832,0.34546956,-0.34891623,-0.15347145,-0.014721714,-0.35558686,0.3057344,-0.15102908,0.25671318,-0.4675233,0.18114646,-0.20034303,0.40455675,0.38589746,-0.43224838,0.29560947,-0.12180218,0.2639395,0.04253273,-0.14420713,-0.2556076,-0.4611575,-0.30262128,-0.29620662,-0.45138276,-0.3743389,-0.10964856,0.42470816,0.12976317,0.060863364,-0.3138246,-0.04397737,0.31256,0.48531982,0.3547714,0.30029535,0.48894298,-0.45715284,0.20400758,0.27522025,0.4713204,0.36508936,-0.4550021,-0.10895028,0.34657452,0.26603618,0.45283198,0.08541068,-0.31710818,0.30247942,0.2841778,0.2931824,0.40971163,-0.34765995,-0.38779956,-0.12691532,-0.39153457,-0.16216393,-0.035915088,0.48628813,-0.03285984,-0.25708002,0.07388317,0.12851812,0.2947206,0.37382653,0.32614207,0.011342155,-0.4988207,0.21398365,0.3322286,0.47258404,0.3973934,-0.4944355,-0.015569026,0.10323496,-0.16550122,0.28344783,-0.19771305,0.31942815,0.44111434,-0.06025282,0.14831024,-0.26018235,0.015066273,0.053878505,-0.11049836,0.46409252,-0.0070827096,-0.45800695,0.32911924,-0.07827494,-0.41021895,-0.47695103,-0.34706622,0.059745595,-0.34877834,-0.36380404,0.17552538,0.22366779,-0.13026662,0.43132085,0.47937104,0.38370457,-0.09476843,-0.4729966,-0.39201224,-0.097564876,0.15649706,-0.1219742,0.3145419,-0.2814976,0.0077193286,-0.098397866,-0.2145556,0.25187802,0.42222178,-0.01864127,0.082149945,-0.49441078,0.1060989,0.4546472,-0.41866928,-0.097244054,-0.096609235,-0.0028030877,-0.33808756,-0.019283857,0.17917082,0.43785316,-0.17268541,-0.4870709,0.21661924,-0.4656032,0.1561516,0.23870338,-0.07363541,0.28408703,-0.12603956,0.10965966,-0.070082195,-0.04510175,-0.11257389,0.08259544,0.45307314,-0.39653948,0.39195493,-0.49465665,0.2907066,0.35285184,0.17775224,-0.14172025,-0.07615305,-0.42700845,0.03266598,0.08353265,-0.100179434,0.15778722,-0.47329628,0.23923422,-0.20312108,0.072193965,0.27028057,-0.011139713,-0.3415409,0.22719781,0.04980015,0.09308436,-0.24375704,0.14600459,0.10190801,-0.06917764,-0.30459794,-0.35702375,-0.40130582,0.27062094,-0.032744322,-0.2593897,0.052477792,-0.30057883,0.45069575,0.08733097,-0.114367306,-0.14594555,-0.0331763,0.38236302,0.3910159,0.079595335,0.22552629,0.2893279,-0.08076877,-0.4119825,-0.46694958,0.20910779,0.097985595,0.29557464,0.1694139,0.21732485,0.25401974,0.33034766,-0.3256178,0.10599576,0.06659225,0.21468174,0.17586948,-0.34023064,-0.1748914,0.49854237,0.28261778,0.32611895,-0.1950155,0.47725752,0.44122532,-0.4995714,-0.3095388,-0.35385215,-0.32585055,0.4077487,-0.11169314,-0.22436677,0.40760052,-0.054429095,-0.1942328,0.30773592,0.34453848,-0.42508462,0.31333873,0.3055913,-0.036411915,-0.31413615,-0.14185928,-0.3394901,-0.3932084,0.39931062,0.32874665,-0.123542204,0.044397544,0.1761239,-0.10409096,-0.10295548,0.2129754,0.064262666,-0.26355657,0.03386594,0.0014783565,-0.25520375,-0.10834463,0.44350857,-0.30679792,0.22117811,0.07330908,0.2839573,-0.46928254,0.2256435,0.2773178,0.22095776,-0.16543318,-0.03877777,-0.13001244,-0.30665508,0.36504033,0.46447116,-0.10399755,0.20796996,-0.43113643,0.45911106,0.10044327,-0.110718794,-0.06503698,0.35694924,-0.32661653,0.023995621,0.38329417,0.26580194,0.16738547,-0.46617714,0.28048566,-0.4605772,0.09438967,-0.17152068,0.07682192,-0.09502434,-0.483157,-0.36333323,-0.06988845,-0.194247,-0.46628317,0.38647532,0.42136875,-0.27282554,-0.063850194,-0.46237534,0.30444402,-0.05978272,0.37956944,-0.27967158,0.03416964,0.06824158,-0.44395885,-0.27607828,-0.4956184,-0.30001378,0.41986388,0.035402212,0.08947178,0.12701173,-0.29450068,-0.03362018,-0.0667586,-0.12304351,-0.18126221,-0.29039645,0.39720634,-0.44358265,0.47732666,0.2517767,-0.01053443,-0.40383795,-0.09293986,0.24691066,0.42503187,-0.3694487,-0.45801374,0.44534147,0.09081396,0.10571583,-0.29770872,-0.31570223,-0.49263826,-0.2525929,0.2135376,0.46800825,-0.26678133,0.30041355,0.45405045,0.2988852,0.030923028,0.16993013,-0.19226062,-0.3718522,-0.06134153,0.22671153,0.011496199,-0.10195025,-0.40541956,-0.17762008,-0.3738114,0.056378845,-0.32407832,0.12146596,0.092712864,-0.15930457,-0.38951093,0.15998307,0.16981539,-0.33074778,0.020213818,-0.4544425,-0.4229864,0.0760761,-0.03008027,-0.1233817,-0.3256708,0.18246566,-0.13679646,-0.32741985,0.23977569,-0.014147908,0.23892714,0.363508,-0.47956362,0.10734841,-0.22224496,-0.049209405,0.040921118,-0.46467054,0.3194197,-0.025548974,-0.4568204,-0.397359,0.039682653,-0.41334832,0.21842101,-0.09555478,0.0718143,-0.32278877,0.18858576,0.4125565,0.14928973,-0.17377207,0.097371414,0.45032275,0.29226997,-0.119748764,0.33641383,-0.31381348,-0.06206879,-0.06561044,-0.28597698,-0.3883943,0.13227874,0.4080555,0.49875712,0.054985203,-0.20739533,-0.20337185,0.45211664,0.030182606,-0.013366829,-0.014560965,-0.088669926,-0.47186506,0.06670221,0.026733253,0.06633622,0.3690344,0.017002387,-0.40600225,-0.16063873,-0.22192957,0.41858548,0.027236443,0.298065,-0.32405317,-0.08101965,-0.44166383,0.28156355,-0.21101062,-0.21331312,-0.02498593,-0.2861361,-0.12301699,-0.017368803,0.041878346,0.17010689,-0.30825385,0.3036099,-0.26912403,-0.11727858,0.22652549,0.098709516,0.10705405,-0.23749676,-0.33491486,-0.2670899,-0.42021555,-0.25248164,0.057572007,-0.12619938,-0.26558,-0.2860563,0.123047754,-0.09362279,-0.20401035,-0.24421073,0.1507251,-0.39161447,-0.46425876,0.40631977,0.38341242,0.47253466,0.41115114,0.36199307,0.16078472,0.097919464,0.014037589,-0.24382395,0.015974296,-0.34683546,0.14070825,-0.16337737,-0.006665109,-0.37909412,0.48315355,-0.4821101,0.25894594,-0.41197518,-0.07774309,-0.21624875,0.3847326,-0.17404428,0.3674259,-0.22674146,0.253305,0.42109793,-0.045078862,0.17638017,0.19151716,-0.2873133,-0.4460818,-0.20349984,-0.13144435,0.2138431,0.441698,0.14352785,-0.41810754,-0.4652101,-0.48237273,-0.009933088,-0.49776796,0.3833572,-0.25856346,-0.034806184,-0.49235627,0.43948305,-0.30182472,0.09083311,-0.3852673,-0.38846123,-0.0656204,-0.16721897,-0.15681769,-0.44627187,0.1719005,-0.19793901,0.3225554,-0.1480469,-0.1754026,0.106750414,-0.3377288,0.3705907,-0.06769019,0.02095607,0.46131352,0.37557822,0.12777509,0.124118604,-0.15865639,0.37236926,-0.046228074,-0.304224,0.34762907,-0.19071952,-0.08485447,-0.00075763726,-0.010525895,-0.49922347,-0.46348193,-0.21244606,0.11852465,0.42430276,0.28395787,-0.46491116,0.2961215,-0.046639066,0.48703632,0.40336993,-0.44570324,0.053904362,0.10077452,0.22149049,-0.23592556,0.09106101,-0.2941553,0.4144182,-0.0007593777,0.27811152,-0.052147426,0.095166475,-0.14470702,0.34450957,-0.11374162,-0.08931315,0.1546387,-0.45219454,-0.19054808,-0.26670367,-0.38887978,-0.06789196,0.268129,0.4764474,0.15966257,0.114040606,0.37445456,0.07571238,0.40350485,0.03552614,-0.21796188,-0.23683116,-0.34481892,0.40903887,0.22252898,-0.35169095,-0.36299935,0.2969068,0.3827835,-0.41385219,0.13830398,0.4230723,-0.19004141,0.41275775,0.09749753,-0.16639052,0.036134437,-0.08770472,-0.15840857,0.29113978,0.41133463,0.2279353,0.20739754,0.08300199,-0.18785289,0.08823395,-0.07624397,-0.4843575,0.45142362,0.29313242,-0.4088019,-0.28799835,0.4735585,0.30758598,-0.23876362,-0.10200478,-0.20003074,-0.2903793,0.46567094,-0.44991076,-0.20240018,0.3625024,0.11783107,-0.49775937,-0.39060226,0.4197676,0.32541004,-0.08943035,-0.009008332,0.26288223,0.28617525,0.07601165,-0.18787467,0.20478593,0.24676146,0.23340592,-0.45665243,0.34483233,0.4879767,-0.11639637,-0.44990167,-0.0037898766,0.38327762,0.3165954,-0.09591151,0.3397523,0.44001096,-0.3253739,0.3439626,0.0037068464,0.19795856,0.32473293,0.37633833,-0.3422481,0.23420054,0.33226562,-0.012029609,-0.2901011,-0.40141913,0.41704282,-9.028093e-5,-0.4208962,-0.30659714,-0.26319492,-0.053226244,-0.29434517,-0.09561803,0.27644345,-0.32660642,-0.15802658,-0.27119362,-0.4796235,0.02445194,-0.08383277,-0.47935605,-0.46467075,0.109833166,0.2220666,-0.084326826,0.23765664,0.4386544,-0.2401504,-0.30272236,0.07275482,-0.38387108,-0.42210826,0.2988748,0.261018,-0.1796176,0.038386982,0.29156387,0.13837,-0.42984873,0.006301547,0.19032457,0.47722888,-0.099581815,-0.22911328,0.049700875,-0.37272236,-0.015171823,0.47672397,-0.090661645,0.42058387,-0.30507147,-0.19910492,0.013650714,-0.02494742,-0.4839785,-0.38873586,-0.26821703,-0.055108223,0.44889218,0.4982565,-0.44014293,-0.05493015,-0.13149804,0.20499925,-0.07855737,0.050021328,-0.3190965,0.3198788,-0.08976643,0.37925377,0.028992577,0.2500479,0.15728945,-0.32953724,0.1456431,0.31077617,-0.4877165,0.024847047,-0.124725,0.44425023,0.14478534,-0.04181194,0.11981696,0.39468762,0.054694794,-0.33583385,-0.43023348,-0.001536222,0.06280821,-0.23440848,-0.036352478,0.12038586,-0.4873308,0.36097595,0.20488179,0.2936156,0.2036137,0.17316525,-0.48127827,0.021196065,0.2970033,0.04947629,-0.47514293,0.4404331,-0.32654753,0.1422368,0.24746239,-0.020388033,0.135651,0.36568156,-0.27510995,0.26261193,-0.10584749,-0.39965156,-0.0682562,0.41395497,-0.027205618,-0.12827311,0.08940863,0.44058764,0.29206097,0.033643533,0.33662736,-0.12261863,-0.24561721,0.45554775,0.27886447,-0.034477536,0.29554906,-0.37903482,-0.03635113,0.14767177,-0.36018294,-0.29003033,-0.09025341,-0.28023836,-0.027324371,0.29092523,0.0015748907,-0.025808128,-0.24686612,0.26220465,-0.058306925,-0.251921,0.28738013,-0.1694308,0.024987897,-0.12408179,0.19296545,-0.16341206,0.48184934,0.18256095,0.39897135,0.46763223,-0.20284633,0.46822578,0.35550317,-0.07458892,0.48202235,-0.19955175,0.34178472,-0.38452178,-0.017287053,-0.45047688,-0.039945927,0.16274723,-0.3750488,0.3009671,-0.0892731,0.4875691,0.2927061,0.10227751,0.06059588,0.39672643,-0.13265118,-0.109673806,0.06812766,-0.017995987,0.056285657,-0.47233328,-0.11407081,0.33005857,0.3473333,0.46693787,-0.34344268,-0.20787914,0.039450698,0.17018598,0.43892637,0.18359241,-0.48372418,-0.34152615,-0.101079725,-0.031340055,0.32184675,-0.058455672,0.302779,-0.45910493,-0.1496427,0.12065226,-0.21822757,0.044986214,-0.1368782,0.24368176,0.4982439,-0.2577364,0.31033474,-0.14575133,-0.26125118,-0.22916074,-0.015681606,-0.0040108073,0.015125387,0.042896397,-0.29305753,-0.14592397,-0.06797325,0.23582837,-0.11652771,0.21182144,-0.34849206,0.4955933,-0.2181253,0.3943366,0.15235487,-0.014773111,0.4783124,0.3030214,-0.0849884,-0.3002566,-0.051915832,-0.49608815,0.36061466,0.41614476,0.43847558,-0.37281007,0.40527934,-0.4952707,-0.18616703,0.46620426,0.059645895,0.2636773,0.14526567,0.2935251,0.47286198,0.24491371,-0.3096816,0.33586296,-0.41615388,0.22996153,0.26715994,0.13893472,0.36372212,0.01254634,-0.31682855,-0.35513762,0.036462218,-0.32530552,0.07168607,-0.367038,-0.1506037,-0.10177643,0.18065566,0.17392984,-0.3997394,-0.10735645,0.15186894,0.4421445,0.027266216,0.0694262,-0.48595703,0.065308474,0.38539982,-0.08254755,-0.4589921,-0.27326044,0.17736825,0.21939334,0.03496416,0.4513648,0.42251515,-0.08029404,-0.29572144,0.3424544,-0.3135513,0.066391155,0.45791557,-0.13888507,-0.017396245,0.23134972,-0.26071754,-0.42941773,-0.2124005,-0.44719598,-0.2891199,-0.32088494,0.24990186,-0.1792375,0.0885429,-0.21111746,0.34833577,-0.16869934,-0.17566487,-0.38635534,0.11840656,-0.3439008,0.203565,0.46907884,-0.032676883,0.36715117,-0.11118017,-0.38041347,-0.31566226,0.46946114,-0.1862364,0.106037594,-0.28269413,-0.018680973,0.16583903,0.4533595,-0.17049034,0.17350067,-0.40790507,0.2504819,0.12129835,-0.49397516,-0.3103956,0.30112773,-0.35074762,0.33859032,-0.20064099,-0.046302088,-0.47827005,-0.49098268,0.41307124,-0.36492157,-0.3369525,-0.4509823,-0.014807143,-0.26661393,0.48908144,-0.17361589,0.37019062,0.18066749,0.09667078,-0.20899941,0.1297746,-0.4265125,-0.22895299,-0.10023696,-0.05669907,-0.19804575,0.23382217,-0.12610494,0.38662115,0.1659379,0.45369384,-0.11133315,0.097579606,0.43811697,0.22079134,0.1708482,-0.38545164,-0.109952115,-0.37820035,0.16737643,0.21883257,-0.13155557,-0.4191939,0.30952936,0.043795165,-0.3401482,0.14710665,0.46361142,0.31937578,-0.13301198,0.05815889,0.108715884,-0.36550274,0.2762131,0.35957593,-0.008636416,-0.13052139,0.37867862,0.4167656,0.31896433,-0.16363604,-0.37190372,0.29655057,-0.046366647,-0.027659537,-0.0390769,0.35327974,-0.36478913,0.36695725,0.0073016384,0.43238786,-0.4238395,-0.16882555,0.30554673,-0.15122776,0.47322595,-0.3255169,0.24702924,-0.41586542,0.03930915,-0.40677342,-0.3895741,-0.22783129,0.24758874,0.18878782,0.47159728,0.29868865,0.09180604,-0.038618185,-0.20989905,0.08407476,0.19620505,0.05047941,0.4090572,0.019025445,-0.32833,0.3017255,0.34434262,0.068315625,-0.26338002,-0.045624297,-0.18102792,-0.16482566,0.27251297,0.058719963,0.41225985,-0.041048504,-0.46910477,-0.26092806,0.055442106,-0.044135332,-0.38963902,0.28735638,-0.09203289,0.36397764,-0.21245433,-0.0018503262,0.3283018,0.22542417,-0.16777784,-0.2799403,0.034176286,0.105487905,-0.26161608,-0.3494358,-0.42202654,-0.34707326,0.012207121,0.09821011,0.32993886,-0.43950677,-0.49816245,-0.30440247,-0.050782934,0.4661899,0.44671345,-0.3646301,-0.21960667,-0.24290805,0.14615104,0.45969802,0.14346597,0.057611547,-0.09266483,0.32347742,-0.29639104,0.14628479,-0.25633195,0.13947207,-0.2522089,0.20264502,0.46860397,0.451145,0.028658273,-0.040269785,-0.45961797,-0.4896616,-0.40236562,0.1636393,0.4979727,0.07419363,-0.20227617,-0.28157026,0.41496286,-0.16495128,0.24283741,0.11567462,-0.18838389,-0.4140152,0.47281924,0.13480976,-0.0060871867,0.04012448,-0.49450406,0.4777293,0.45524135,0.2523655,-0.4236597,0.23210096,-0.45510206,-0.4349298,-0.28113663,0.1584879,-0.13412733,0.3581712,0.12305189,-0.19719116,0.12342223,0.29782048,-0.46922943,-0.36888584,-0.48465896,0.18402115,-0.22855385,0.19368877,0.40070668,0.15787907,-0.08303715,0.4836315,-0.038273193,-0.28275645,-0.34430188,-0.043908037,0.28215244,0.26399705,0.33252716,0.14065267,0.16655299,0.41576496,-0.10395253,-0.18216027,-0.2571918,-0.115263544,0.45701456,-0.4893158,-0.27404472,-0.36969063,-0.036821384,0.17790216,0.35737616,0.27002704,-0.24259622,0.43097514,-0.06445755,-0.08670408,-0.34603402,-0.30651242,0.24046439,-0.030263882,-0.37524444,0.0681286,0.04469329,-0.2823272,-0.16877201,0.4254383,0.16709709,-0.34103665,-0.14508034,0.48311204,-0.13059363,-0.20925982,-0.27362755,0.00606312,0.17737535,0.33693203,-0.10658783,0.32663155,-0.49363714,0.35496578,-0.23224847,-0.44349623,0.10138234,0.454436,-0.05045864,0.17438154,-0.09851176,-0.40243647,-0.002243933,-0.3801528,-0.46403614,0.14550942,-0.0075685815,-0.14367583,-0.17597836,-0.49305207,0.108431116,-0.09125019,-0.1954422,-0.20038974,0.14145638,0.33604276,-0.22841078,0.10428465,-0.14807194,0.21840444,-0.3358467,-0.3879431,0.13457851,0.3237785,-0.015375294,-0.30773872,0.18693802,-0.30852276,0.43764186,-0.042170208,0.35993323,-0.39386407,0.025453042,0.47249237,-0.40505013,0.04089468,-0.21573624,-0.024639254,0.046760596,0.14233457,-0.05005811,-0.4333098,-0.27379093,0.30233464,-0.28704467,0.16045982,0.2658326,0.37880427,-0.09468182,0.41641152,-0.25137004,0.040381826,0.078148685,-0.46094155,-0.48477086,0.45241633,0.37799364,0.38818997,-0.40168747,-0.37557203,-0.19094457,0.02778299,-0.43164724,-0.2528824,0.2898579,-0.4081954,-0.30174962,0.11997834,0.22193961,-0.04389633,-0.41959432,-0.12875085,0.3647931,-0.27469614,0.46503276,-0.32381523,0.08702036,0.019227423,-0.4844174,-0.2714583,0.33433655,0.40828422,0.058431312,-0.4034849,-0.42485443,-0.1472473,-0.32338703,-0.24955943,0.004755812,-0.36289132,0.15168789,0.16884528,0.40183666,0.1681717,0.08038385,0.08341073,0.15174071,0.11892558,0.047793478,-0.11647957,-0.4127097,0.14679201,0.25874096,-0.040165074,-0.31601653,0.22305895,0.083741836,-0.19506167,-0.38917282,0.15052508,-0.3841043,0.16635616,-0.43328846,-0.10966016,0.46133682,-0.24422652,-0.41813147,-0.25530222,0.2559943,0.1112097,0.08783544,-0.49638528,-0.3770775,0.39618927,0.054853916,0.09571722,0.17031802,-0.09624972,0.439084,0.1887924,0.020153116,0.14058456,-0.119177945,0.14440615,0.08495007,-0.47383174,0.3411571,0.4970407,0.3849692,-0.25924686,0.11836999,-0.43417305,0.23817323,-0.10619393,-0.064989656,-0.030215094,0.31667572,0.31469905,-0.21170652,0.2774859,0.3776477,-0.38182762,0.30896688,0.16921344,0.40217105,-0.07426728,-0.14167488,-0.2140697,0.096625574,0.27920112,-0.03561645,-0.04452181,-0.30170715,0.42722312,0.3615928,-0.18077756,0.256091,0.25289872,0.43199334,-0.48656985,0.47740647,0.30729395,0.31523037,-0.21254128,0.019011376,0.016823776,-0.24352045,0.4239622,-0.41281655,-0.2993569,0.20414233,-0.0756789,-0.35681581,-0.10276579,-0.32858044,0.4691289,-0.44815788,-0.34801513,-0.31327108,0.060768224,0.13432541,0.065253764,-0.043073725,-0.2921406,-0.25138253,0.46320453,0.37531936,-0.097218424,0.117650926,-0.15429412,-0.068389565,-0.2978682,0.008392274,0.3626081,-0.002888006,-0.41279352,-0.3744123,0.4009303,-0.45489687,-0.1446658,-0.4803572,-0.027473431,0.40857738,-0.20115349,-0.36330953,-0.0053043403,-0.24750209,0.1679624,0.12984371,0.41409144,-0.41940716,0.14513172,0.15828006,0.020150326,0.19446176,-0.45571837,0.117342524,0.21368541,0.40300924,0.36973774,-0.17192234,-0.34803548,0.49594775,-0.3121126,0.13094592,-0.0189362,0.008183512,0.28374895,-0.1823645,-0.37898904,0.37875152,-0.34097657,-0.05619736,-0.03221139,-0.3836507,-0.2512512,-0.005321087,-0.3341541,-0.1330795,0.057749256,0.17764863,-0.18664438,-0.04781515,0.18166125,-0.060077623,-0.16366488,0.33956635,-0.036736302,0.4338418,0.05888662,-0.20788822,0.36903402,-0.33099127,-0.08186142,-0.07152436,0.43614304,-0.33597538,0.037257858,-0.07226855,0.36116096,-0.40522408,-0.48348272,-0.33453795,0.29149973,-0.24967252,0.26763687,0.338671,-0.119922884,-0.09524546,0.2823578,0.29352963,0.13480856,-0.03439569,0.31018496,-0.4155237,0.47531703,-0.4182998,0.33554956,-0.24800105,0.4138006,-0.18321711,0.13642937,0.06768284,0.1601356,-0.340312,-0.3595966,-0.3997361,-0.21721609,-0.28063995,-0.2939067,-0.3403184,0.37205335,-0.28660682,-0.36189607,0.4336096,0.08478377,0.16229337,0.42027622,-0.10156388,0.14844382,0.16755027,-0.40135592,-0.12380943,0.20104408,-0.11855672,-0.18359405,-0.059277162,-0.48677763,0.27511123,0.29916087,-0.29809815,-0.22582641,0.10933995,0.21232922,0.40085554,-0.17317493,-0.2642315,0.3568874,-0.42970738,-0.39685717,0.35582525,0.39619055,0.4160141,0.2845104,0.45207804,-0.0584645,-0.30395883,0.27547547,0.2358963,-0.031264316,0.17658482,-0.3678102,-0.48042685,-0.18600047,-0.26309356,-0.16787975,-0.45762256,-0.3294734,0.46613985,-0.4022132,0.081167474,-0.42482436,0.44315073,-0.4946152,-0.20650652,0.017894687,-0.1792951,-0.35425547,0.2853711,0.027845958,-0.31430826,-0.21837245,0.4928375,0.3135292,0.12255975,0.421878,0.4660738,0.24049208,0.25632837,-0.09375742,-0.23912244,-0.3080585,0.24817622,-0.39153337,0.08744623,0.26114616,0.07882123,0.32965738,0.050376527,-0.20086011,0.00886259,0.33586305,0.46006832,-0.49997935,-0.22428362,-0.12296338,0.18690953,-0.03206774,0.4198608,0.45438066,0.12672819,-0.0019621549,0.17579603,-0.16492744,0.2853053,-0.4735507,0.36225605,-0.25919983,0.3151298,-0.33875036,-0.2143943,0.020647757,-0.3092682,0.30988052,0.21886581,0.036140155,0.11858294,-0.0967817,0.4174284,0.46232834,0.2255394,0.49030384,-0.30187556,0.21427979,0.26254863,-0.3517697,-0.34699267,0.28160867,-0.084296644,-0.24735592,0.3893772,0.027595537,0.36298615,0.4611216,-0.45315284,0.09867611,-0.30657002,-0.15110688,-0.35950872,-0.42567238,0.15461993,0.05405855,-0.22708353,0.37756062,-0.37416032,-0.23150958,0.14075,-0.2755378,-0.35961702,-0.3236847,-0.28124145,0.0767798,0.14945708,0.45337144,0.029078236,0.39693812,0.18317463,0.38176763,-0.039787825,0.2543273,0.07187314,0.47026774,0.44924828,-0.21887264,0.16946137,0.42700976,0.3034485,-0.2759184,-0.13593583,-0.406856,-0.46283174,-0.17039743,-0.47144875,0.18326995,0.18825015,0.16430558,-0.30156833,-0.048490193,0.31685328,0.39689273,-0.18799731,-0.14520472,-0.06616335,0.34237063,-0.25380674,-0.03543957,0.27497634,-0.4579166,0.4199329,0.33666047,0.48964277,0.33959967,0.32091236,0.3086888,-0.23966396,0.13181181,0.07600739,-0.14623325,-0.20122565,-0.052072592,-0.17509633,-0.2686856,-0.1097151,-0.008948123,-0.42754155,0.38537258,-0.3926236,-0.12912439,-0.30167425,0.28513774,0.25023887,-0.4100889,-0.3595359,0.04439543,-0.1934121,0.21654776,-0.15538193,-0.06805587,0.48133945,0.15863787,0.25198886,-0.44084415,-0.24187723,-0.20998573,0.03516859,0.20854843,0.07669516,0.10182562,-0.052600004,0.38054264,-0.26665306,-0.46674198,-0.47373444,0.121645324,0.04318436,0.085551515,-0.29593676,0.18574812,0.39823377,-0.32231638,0.35309088,0.32491466,0.43282303,0.38815442,0.34264824,0.18310653,-0.49795204,-0.2892937,-0.06711208,-0.04804333,-0.123225935,-0.14988331,-0.31341413,-0.39075664,-0.093492836,-0.39624783,0.19599178,0.27117363,0.42882437,-0.08436555,-0.14013675,-0.30001175,-0.1282563,0.28040022,-0.2082692,0.1609504,0.4189852,-0.08232251,0.41199896,0.010169308,-0.118492156,-0.41273785,-0.087853715,-0.32672307,0.37942755,-0.44708106,-0.10249439,-0.17343047,0.16730459,-0.15203103,-0.026310155,0.00050902064,-0.43548706,0.21829304,0.043140016,0.31613266,-0.054611236,0.1945147,0.11227831,0.30149096,0.07928804,-0.48187226,0.2073287,-0.40671867,-0.083447404,0.20841439,-0.06996195,-0.36570385,0.36667064,-0.21166919,-0.4643381,0.4404855,-0.042311106,-0.4114574,0.11807576,-0.26370314,-0.26301786,0.04809378,0.059912607,-0.13910463,-0.2854888,0.105001666,-0.33605844,-0.26030597,0.12603194,0.093943596,0.12314021,-0.12670769,0.034718413,0.47293824,0.22784825,0.4217065,0.30589062,-0.47763267,0.40963802,-0.052126396,0.37660778,-0.46206513,0.21348877,0.08688124,-0.3414953,-0.08091287,0.09617511,0.39387247,-0.0946122,-0.30555156,0.20589173,-0.32179698,-0.2759572,0.059837475,0.26210806,-0.03457537,0.40344542,-0.118006386,-0.32409835,0.2585151,-0.44023988,-0.45152107,0.10284314,-0.43500608,0.01804377,0.32312223,-0.23425013,0.016730202,-0.38547632,-0.040441133,0.091918,0.15458082,-0.20187426,-0.3811332,-0.13200717,0.36428878,-0.3469165,-0.24333733,-0.18084311,-0.47805685,-0.228794,-0.17249708,-0.014922572,-0.2403185,0.30641562,0.44943622,0.14607665,-0.12649453,-0.21126428,-0.36425474,-0.2707312,-0.21462116,0.22319669,-0.32080945,0.44502223,0.31655487,-0.37003323,-0.05241711,0.17953944,0.23336402,0.18530819,-0.42249355,0.28752053,-0.013716591,0.08212381,0.15213946,-0.44428346,0.3449303,-0.23356345,0.48257428,0.008993095,-0.093973264,0.31100753,0.31858507,0.31568688,0.009013835,-0.24031904,-0.10465975,0.28322658,-0.17643093,0.17307687,-0.42422742,0.46883354,-0.4655115,0.24173512,0.0006786554,0.3872623,0.22425821,-0.42589158,-0.37211287,-0.45782438,-0.02254859,0.40815118,0.014800627,-0.19241235,0.16205913,0.48051184,-0.07428239,0.23288208,0.23548706,0.25018162,0.13070396,0.37244606,-0.19766353,0.21435452,-0.14144607,-0.33360782,0.2619632,-0.09585229,0.28650185,0.41172853,-0.037189562,0.39099434,-0.002071521,0.0429581,-0.36832124,0.23615038,-0.20439537,-0.2737173,-0.32808825,-0.053798895,-0.16782923,0.084102094,-0.1334467,-0.24435303,-0.40090182,-0.43706384,0.10158991,-0.33161837,-0.07313983,-0.31697884,-0.11893207,-0.1944792,0.4685723,0.018402299,-0.41826785,0.21027297,0.41616875,-0.17474243,-0.28027606,0.22736357,-0.2300256,0.4361126,0.0032211498,-0.34686017,-0.14598307,0.13307662,-0.17503592,0.20399812,0.26273504,0.48785537,-0.4903078,0.38330683,0.31480008,-0.41718206,-0.48735073,-0.27156803,-0.2310306,0.06861383,0.3570233,-0.15599266,0.47309375,0.35065505,-0.3873831,-0.36475763,-0.26114342,0.31155145,0.3615737,0.08533669,0.1498646,0.22488889,0.08207083,0.15292005,-0.41930875,-0.38015056,0.47698167,-0.28455853,0.3698403,-0.3524307,0.17238168,0.12222262,0.4389069,-0.11551845,-0.3382627,0.32567027,-0.40419218,-0.3239288,0.061136756,-0.06310021,-0.083803624,-0.17428109,-0.36813763,-0.470383,-0.21282049,-0.46698764,0.04656846,0.3980185,0.3230191,-0.112528875,0.07517157,0.42253032,-0.090542056,-0.47453806,-0.16145474,-0.4845012,-0.23663536,0.1740751,0.44417086,0.3283132,0.20511246,0.14208515,0.44232515,0.49402025,-0.4551694,-0.029952,-0.27845308,-0.2711188,-0.1600241,0.073647134,0.14890495,-0.25900328,-0.47269583,0.12241958,-0.37665376,-0.102886334,-0.032826535,0.099791974,-0.3076458,-0.08079635,-0.04576474,0.0016274315,-0.09859961,-0.4215991,-0.11959251,0.13403736,0.10644822,0.24081673,0.48959327,-0.1005456,-0.3908852,0.054326076,-0.008152089,0.46767348,0.49983996,-0.48597062,-0.43835333,-0.43019292,-0.40782133,0.2170667,-0.21985959,0.279135,0.29681894,0.28611746,-0.026990227,0.3206273,0.045828205,-0.28918874,-0.27373767,-0.046928927,-0.26947752,0.43411544,-0.30364516,0.05909637,0.18885086,-0.2422922,-0.48643637,0.18895939,-0.49717942,0.3803888,-0.32481366,0.19538657,0.37522253,0.086871654,0.17543544,0.48329028,-0.079749554,-0.41613892,-0.4000892,-0.41689706,0.37295422,0.30700508,-0.48279017,0.24269421,-0.22470029,0.3596495,-0.26288244,0.44100872,0.36525473,-0.41215885,-0.38271078,-0.47668603,0.3362622,-0.11469506,0.07731321,-0.45629242,0.39911255,-0.288146,0.03947879,-0.42464957,0.05755925,-0.058671754,0.48160812,-0.027585808,-0.31471807,-0.06046357,0.124486804,-0.30026624,0.051641215,0.11707499,0.07844941,-0.14483738,0.22143899,-0.12562512,-0.38249525,-0.019854365,0.1797541,0.2851629,-0.3774895,-0.050526787,-0.027512802,0.48249283,-0.087278455,0.057322282,0.43435737,0.30514756,-0.14794254,0.16806257,0.4156816,0.29211283,0.37907192,0.2079379,0.33112633,-0.21592128,-0.29511997,-0.019399798,-0.23181342,-0.4436983,-0.12409562,0.29136866,-0.41774315,0.09643468,-0.31944045,-0.31350273,-0.18979758,-0.12077156,-0.37103003,0.46132296,-0.42622235,-0.37416238,0.41476405,0.05667433,0.4207579,-0.48546746,-0.44330806,-0.29873163,-0.49677822,-0.28472874,-0.10885801,-0.41537994,-0.2779718,0.29197374,-0.2155046,0.0076022367,-0.29712832,0.36161387,-0.18748656,0.20438685,0.068839945,0.0985157,-0.24822792,-0.10668641,0.25739616,0.3364367,-0.37892994,-0.40973282,-0.35480005,0.1016935,-0.16239968,-0.36882028,0.32075483,-0.38240293,0.472815,-0.3382896,0.49699023,-0.40490794,0.074482575,-0.07550381,-0.41695032,0.14242816,-0.13893442,-0.38372955,-0.10068064,0.33792046,0.036573064,0.3216125,0.41494432,0.45044065,-0.37987784,-0.36085692,-0.0076897494,-0.49488118,-0.16089325,-0.2683508,-0.028084047,0.46243146,-0.2877676,-0.11232234,-0.0245734,-0.4914404,-0.37006173,0.19180013,0.39648476,0.42616087,0.17990546,0.1338465,-0.15523401,-0.40760735,-0.27764735,-0.34044215,-0.39000806,-0.33052638,-0.16166133,-0.24226156,-0.4799269,0.1266278,-0.15011302,-0.07521513,-0.07579122,-0.43005005,0.15961085,0.09073886,0.44736305,-0.14514501,-0.25395447,-0.41384947,0.3658854,-0.20257531,-0.24753942,-0.39567134,-0.35059515,-0.19446865,-0.08510901,0.2517469,0.22224729,-0.40630934,0.21473742,0.15478595,-0.4489262,-0.42215037,0.06053244,0.45785686,0.46769926,0.15981779,-0.437929,0.0030219916,-0.4157268,0.108267605,0.42308804,0.42641392,-0.004952181,0.4245414,0.29846722,0.44306067,0.055279724,-0.49833202,-0.19822906,-0.11464935,0.27627283,0.1929363,0.2864295,0.3429811,0.4594909,0.2756134,-0.41369146,-0.3924292,-0.12890719,-0.13175426,0.47056106,-0.38693112,-0.46899545,-0.27200237,-0.30642816,0.34225208,0.46022058,-0.2212737,0.42844403,0.23213428,0.29635206,-0.07265776,0.31083557,0.42417464,-0.47623163,-0.20052424,0.47566727,-0.45688823,0.39724004,-0.18921962,-0.25785092,0.0015120701,-0.43499416,0.49526066,0.44471473,0.14123459,0.10746294,-0.0971118,0.3350027,0.382336,-0.4905283,0.10710375,-0.3907312,0.36718002,0.33593413,0.19585727,0.38828483,0.41070658,0.2468319,-0.0266342,0.2039945,0.30071473,-0.30764952,0.4232036,-0.11829046,0.2929916,0.25512025,-0.25520134,-0.45317414,0.40547878,0.44258723,0.32005933,-0.47720912,-0.46541125,-0.1974354,-0.24403249,-0.46108276,0.17862363,0.0624253,-0.18613313,-0.08528199,-0.39688787,-0.03341442,0.4238411]}
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
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var flipsignf = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof flipsignf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a single-precision floating-point number with the magnitude of `x` and the sign of `x*y`', function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = flipsignf( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z;

	z = flipsignf( NaN, -1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	z = flipsignf( NaN, 1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', function test( t ) {
	var z;

	z = flipsignf( -1.0, NaN );
	t.equal( isnanf( z ), false, 'does not return NaN' );

	z = flipsignf( 1.0, NaN );
	t.equal( isnanf( z ), false, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = flipsignf( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = flipsignf( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns `x`', function test( t ) {
	var z;

	z = flipsignf( -1.0, PINF );
	t.equal( z, -1.0, 'returns -1' );

	z = flipsignf( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = flipsignf( NINF, -1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	z = flipsignf( NINF, 1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns `-x`', function test( t ) {
	var z;

	z = flipsignf( -1.0, NINF );
	t.equal( z, +1.0, 'returns +1' );

	z = flipsignf( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports using `+-0` to flip a sign', function test( t ) {
	var x;
	var z;

	x = 3.0;

	z = flipsignf( x, 0.0 );
	t.equal( z, 3.0, 'returns +3.0' );

	z = flipsignf( x, -0.0 );
	t.equal( z, -3.0, 'returns -3.0' );

	t.end();
});

tape( 'the function supports `x` being `+-0`', function test( t ) {
	var z;

	z = flipsignf( -0.0, 1.0 );
	t.equal( isNegativeZerof( z ), true, 'returns -0' );

	z = flipsignf( -0.0, -1.0 );
	t.equal( isPositiveZerof( z ), true, 'returns +0' );

	z = flipsignf( 0.0, 1.0 );
	t.equal( isPositiveZerof( z ), true, 'returns +0' );

	z = flipsignf( 0.0, -1.0 );
	t.equal( isNegativeZerof( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/flipsignf/test/test.js")
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
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var flipsignf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( flipsignf instanceof Error )
};


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof flipsignf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a single-precision floating-point number with the magnitude of `x` and the sign of `x*y`', opts, function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = flipsignf( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', opts, function test( t ) {
	var z;

	z = flipsignf( NaN, -1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	z = flipsignf( NaN, 1.0 );
	t.equal( isnanf( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', opts, function test( t ) {
	var z;

	z = flipsignf( -1.0, NaN );
	t.equal( isnanf( z ), false, 'does not return NaN' );

	z = flipsignf( 1.0, NaN );
	t.equal( isnanf( z ), false, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = flipsignf( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = flipsignf( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns `x`', opts, function test( t ) {
	var z;

	z = flipsignf( -1.0, PINF );
	t.equal( z, -1.0, 'returns -1' );

	z = flipsignf( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = flipsignf( NINF, -1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	z = flipsignf( NINF, 1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns `-x`', opts, function test( t ) {
	var z;

	z = flipsignf( -1.0, NINF );
	t.equal( z, +1.0, 'returns +1' );

	z = flipsignf( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports using `+-0` to flip a sign', opts, function test( t ) {
	var x;
	var z;

	x = 3.0;

	z = flipsignf( x, 0.0 );
	t.equal( z, 3.0, 'returns +3.0' );

	z = flipsignf( x, -0.0 );
	t.equal( z, -3.0, 'returns -3.0' );

	t.end();
});

tape( 'the function supports `x` being `+-0`', opts, function test( t ) {
	var z;

	z = flipsignf( -0.0, 1.0 );
	t.equal( isNegativeZerof( z ), true, 'returns -0' );

	z = flipsignf( -0.0, -1.0 );
	t.equal( isPositiveZerof( z ), true, 'returns +0' );

	z = flipsignf( 0.0, 1.0 );
	t.equal( isPositiveZerof( z ), true, 'returns +0' );

	z = flipsignf( 0.0, -1.0 );
	t.equal( isNegativeZerof( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/flipsignf/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/flipsignf/test")
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
