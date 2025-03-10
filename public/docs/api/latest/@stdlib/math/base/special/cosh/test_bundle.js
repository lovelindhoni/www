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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":14}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/assert/has-uint16array-support":22}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/assert/has-uint32array-support":25}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/assert/has-uint8array-support":28}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"./float64array.js":13,"@stdlib/assert/is-float64array":31}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/has-symbol-support":18}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":51}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":26}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":52}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":53}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":97}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":33}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":37}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":97}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":97}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":97}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":80}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":55}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":59}],59:[function(require,module,exports){
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

},{"./main.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":63}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/to-words":93}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* Copyright 1985, 1995, 2000 by Stephen L. Moshier
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Computes the hyperbolic cosine of a number.
*
* ## Method
*
* ```tex
* \operatorname{cosh}(x) = \frac{ \exp(x) + \exp(-x) }{2}
* ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain   | # trials | peak    | rms     |
*     |:----------:|:--------:|:--------:|:-------:|:-------:|
*     | DEC        | +- 88    | 50000    | 4.0e-17 | 7.7e-18 |
*     | IEEE       | +-MAXLOG | 30000    | 2.6e-16 | 5.7e-17 |
*
*
* @param {number} x - input value
* @returns {number} hyperbolic cosine
*
* @example
* var v = cosh( 0.0 );
* // returns 1.0
*
* @example
* var v = cosh( 2.0 );
* // returns ~3.762
*
* @example
* var v = cosh( -2.0 );
* // returns ~3.762
*
* @example
* var v = cosh( NaN );
* // returns NaN
*/
function cosh( x ) {
	if ( isnan( x ) ) {
		return x;
	}
	if ( x < 0.0 ) {
		x = -x;
	}
	if ( x > 21.0 ) {
		return exp( x ) / 2.0;
	}
	return ( exp(x) + exp(-x) ) / 2.0;
}


// EXPORTS //

module.exports = cosh;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":72}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the hyperbolic cosine of a number.
*
* @module @stdlib/math/base/special/cosh
*
* @example
* var cosh = require( '@stdlib/math/base/special/cosh' );
*
* var v = cosh( 0.0 );
* // returns 1.0
*
* v = cosh( 2.0 );
* // returns ~3.762
*
* v = cosh( -2.0 );
* // returns ~3.762
*
* v = cosh( NaN );
* // returns NaN
*/

// MODULES //

var cosh = require( './cosh.js' );


// EXPORTS //

module.exports = cosh;

},{"./cosh.js":64}],66:[function(require,module,exports){
module.exports={"expected":[1.3440585709080678e43,1.2162759870131366e43,1.100641972459074e43,9.960015362249354e42,9.013094948087966e42,8.156200325870043e42,7.380772546930164e42,6.679066380546126e42,6.044072951996769e42,5.469449735589009e42,4.949457203399863e42,4.478901496961774e42,4.053082549275605e42,3.66774713897719e42,3.319046407747075e42,3.003497416632373e42,2.7179483572935842e42,2.45954707069388e42,2.225712558785567e42,2.0141092046424003e42,1.8226234435405696e42,1.6493426519707942e42,1.4925360437181616e42,1.350637382193485e42,1.2222293363408658e42,1.106029323863504e42,1.0008767003648447e42,9.057211664460645e41,8.196122769661839e41,7.416899476796052e41,6.711758644284827e41,6.073657090818735e41,5.496221245718367e41,4.9736834875895595e41,4.500824535400923e41,4.072921316568229e41,3.6856997913335e41,3.33529226223343e41,3.018198742250134e41,2.7312519957756955e41,2.4715859032090517e41,2.236606833199504e41,2.023967736593588e41,1.831544703327135e41,1.6574157481045249e41,1.4998416129700284e41,1.3572483950204615e41,1.2282118257392666e41,1.1114430449284422e41,1.0057757271440295e41,9.101544320493994e40,8.236240623259014e40,7.453203238430328e40,6.7446109280094765e40,6.103386036176999e40,5.523123795310502e40,4.998028353034033e40,4.522854881315962e40,4.092857189380641e40,3.70374031717569e40,3.351617635881534e40,3.0329720269692164e40,2.7446207520501996e40,2.483683662625834e40,2.247554432205813e40,2.0338745234517415e40,1.8405096303212422e40,1.6655283599090027e40,1.5071829410514967e40,1.3638917670070474e40,1.234223597841297e40,1.1168832647264035e40,1.0106987333638131e40,9.146093973155288e39,8.276554843141008e39,7.489684697377736e39,6.77762401497559e39,6.133260496861352e39,5.550158025768774e39,5.0224923801572385e39,4.5449930599486114e39,4.112890643018682e39,3.721869146621291e39,3.36802291791656e39,3.0478176230104345e39,2.7580549448514695e39,2.495840637375863e39,2.2585556168143046e39,2.0438298014118137e39,1.849518438262351e39,1.6736806808029868e39,1.5145602029926033e39,1.370567656542733e39,1.2402647959780129e39,1.1223501129616951e39,1.0156458363972163e39,9.190861684585773e38,8.317066390468625e38,7.52634472341974e38,6.810798692272609e38,6.163281185130833e38,5.577324581636282e38,5.047076152223941e38,4.567239599111573e38,4.13302215511469e38,3.74008671189309e38,3.3845084994689796e38,3.062735884318502e38,2.7715548944740397e38,2.508057117302536e38,2.2696106493123317e38,2.0538338078249537e38,1.8585713419360408e38,1.681872905151993e38,1.5219735746800884e38,1.3772762227923416e38,1.24633556418209e38,1.127843719973444e38,1.020617154191784e38,9.235848522125457e37,8.357776231107647e37,7.563184190594837e37,6.844135750842277e37,6.193448816730893e37,5.604624110610911e37,5.071780255354043e37,4.589595029200858e37,4.1532522056389447e37,3.758393447329545e37,3.401074773583696e37,3.0777271665707286e37,2.785120922780083e37,2.5203333936679934e37,2.280719793271074e37,2.063886781204054e37,1.867668557179288e37,1.6901052282728344e37,1.5294232328616336e37,1.3840176256997475e37,1.2524360471911885e37,1.133364216738801e37,1.02561280527234e37,9.281055558338836e36,8.398685335651399e36,7.600203977220027e36,6.877635985498085e36,6.2237641109101e36,5.632057263560939e36,5.0966052785362823e36,4.6120598832088223e36,4.173581276910877e36,3.7767897893949243e36,3.4177221352295126e36,3.092791827185326e36,2.7987533532073217e36,2.532669759159919e36,2.2918833135518556e36,2.0739889612294938e36,1.8768103008855082e36,1.6983778464384192e36,1.5369093551499888e36,1.3907920259917264e36,1.2585663904514217e36,1.1389117348759993e36,1.030632908743899e36,9.326483871039919e35,8.43979467944412e35,7.637404965911337e35,6.911300194943821e35,6.254227790437822e35,5.65962469454023e35,5.12155181364241e35,4.63463469673661e35,4.1940098536109216e35,3.795276176690036e35,3.434450981308354e35,3.1079302253300187e35,2.8124525107765785e35,2.545066507898733e35,2.303101476312328e35,2.0841405887547354e35,1.8859967910097795e35,1.706690956882336e35,1.5444321200273356e35,1.397599585181711e35,1.2647267401208405e35,1.144486406647525e35,1.0356775842944487e35,9.372134543318737e34,8.481105242603744e34,7.674788043605072e34,6.9451291817928225e34,6.284840581621098e34,5.687327060804307e34,5.146620455441015e34,4.657320008007061e34,4.214538422791836e34,3.8138530499624667e34,3.451261710665021e34,3.1231427219304283e34,2.8262187220996093e34,2.557523935444461e34,2.3143745490130123e34,2.094341905812245e34,1.8952282465739317e34,1.715044757803604e34,1.5519917068494575e34,1.4044404655737583e34,1.2709172430728469e34,1.150088364963205e34,1.040746952197833e34,9.41800866356662e33,8.522618010045982e33,7.71235410157853e33,6.979123752586706e33,6.315603214322145e33,5.715165022825709e33,5.171811801612142e33,4.6801163578772716e33,4.2351674738904317e33,3.832520852117203e33,3.468154724096505e33,3.1384296796789463e33,2.840052315386727e33,2.5700423388038534e33,2.3257028004235462e33,2.104593155619142e33,1.9045048876719297e33,1.723439448371301e33,1.5595882958500597e33,1.4113148302663407e33,1.2771380468998037e33,1.1557177433834737e33,1.0458411333165598e33,9.464107325502424e32,8.564333971507328e32,7.7501040354719e32,7.013284717815193e32,6.3465164219753866e32,5.7431392443098926e32,5.1971264527612456e32,4.7030242898518934e32,4.255897498739005e32,3.85128002822697e32,3.4851304243616435e32,3.1537914630432015e32,2.853953620454867e32,2.5826220164373213e32,2.3370865006291557e32,2.1148945825830618e32,1.913826935475013e32,1.7318752287294576e32,1.5672220681449761e32,1.4182228431562753e32,1.2833892999164813e32,1.1613746761224921e32,1.0509602491047713e32,9.510431628198065e31,8.606254121568893e31,7.788038745309191e31,7.047612891935041e31,6.377580941605486e31,5.771250392210733e31,5.222565012433661e31,4.7260443500958195e31,4.276728991577422e31,3.8701310255431685e31,3.502189216190523e31,3.169228438274842e31,2.8679229687352928e31,2.5952632682662693e31,2.3485259210369642e31,2.1252464323078583e31,1.9231946122370223e31,1.740352300001733e31,1.5748932057366225e31,1.4251646689425502e31,1.2896711511636293e31,1.1670592980513808e31,1.0561044216110813e31,9.556982676105528e30,8.648379459679637e30,7.826159135519894e30,7.082109093389559e30,6.408797513844559e30,5.799499136746912e30,5.248128087128696e30,4.749177087447346e30,4.297662449064659e30,3.8890742935063236e30,3.519331506294424e30,3.1847409734180847e30,2.8819606932815754e30,2.607966395680102e30,2.3600213343826597e30,2.135648951599643e30,1.932608141299592e30,1.748870864296257e30,1.5826018915182451e30,1.4321404731303712e30,1.2959837504114582e30,1.1727717447013688e30,1.0612737734815137e30,9.603761579082667e29,8.690710990180926e29,7.864466114960117e29,7.116774144628215e29,6.440166882950009e29,5.827886151417576e29,5.273816286314532e29,4.7724230534309824e29,4.3186983702907716e29,3.9081102837568526e29,3.536557703375323e29,3.2003294383187614e29,2.8960671287773744e29,2.6207317015434826e29,2.371573014736867e29,2.1461023884725472e29,1.9420677470976347e29,1.7574311247103523e29,1.5903483092783275e29,1.439150422035029e29,1.302327248163319e29,1.178512152267125e29,1.0664684279623676e29,9.650769452419932e28,8.733249722329981e28,7.902960596934907e28,7.151608872125852e28,6.471689796821907e28,5.8564121130185515e28,5.299630222442467e28,4.795782802271008e28,4.3398372567885425e28,3.927239450145888e28,3.5538682181357357e28,3.2159942046329553e28,2.9102426115446574e28,2.633559490203404e28,2.3831812375117466e28,2.1566069921546663e28,1.9515736551645866e28,1.7660332853355226e28,1.5981326437048815e28,1.4461946827859039e28,1.3087017956592178e28,1.1842806576099377e28,1.071688508903245e28,9.698007416866411e27,8.775996670324207e27,7.941643499219586e27,7.18661410640299e27,6.503367007021376e27,5.885077701658153e27,5.325570510961656e27,4.819256890904419e27,4.361079612545811e27,3.946462248745878e27,3.5712634632883047e27,3.2317356458359555e27,2.9244874795515813e27,2.646450067496671e27,2.394846279467429e27,2.1671630130940156e27,1.9611260921378238e27,1.774677551262234e27,1.6059550803899854e27,1.4532734233303688e27,1.3151075448794503e27,1.1900773982610041e27,1.0769341407599516e27,9.745476598657377e26,8.818952853324852e26,7.980515744081805e26,7.221790682045277e26,6.535199268788135e26,5.913883600773895e26,5.351637770333492e26,4.8428458789943e26,4.382425944017272e26,3.96577913786179e26,3.588743853565944e26,3.2475541372309745e26,2.9388020724205046e26,2.6594037407570578e26,2.4065684187188124e26,2.177770702964458e26,1.970725285764025e26,1.783364128584778e26,1.6138158058341304e26,1.4603868124379158e26,1.3215446485481972e26,1.1959025124246747e26,1.0822054485974488e26,9.79317812954066e25,8.86211929548207e25,8.019578258303356e25,7.257139437723285e25,6.567187341058655e25,5.942830497148498e25,5.377832622046799e25,4.866550328943074e25,4.403876760136488e25,3.985190578041848e25,3.6063098057315263e25,3.2634500559583737e25,2.95318673143623e25,2.672420818822602e25,2.4183479347420783e25,2.188430314671732e25,1.9803714649046275e25,1.7920932244062736e25,1.6217150074506443e25,1.4675350197041097e25,1.3280132601371831e25,1.2017561389818077e25,1.0875025580928877e25,9.841113146803482e24,8.905497025958896e24,8.058831973202378e24,7.292661216212859e24,6.599331986484051e24,5.971919080926173e24,5.404155690632385e24,4.890370805905973e24,4.4254325723282456e24,4.00469703208845e24,3.623961738587892e24,3.2794237810044934e24,2.967641799553977e24,2.685501612043095e24,2.4301851083813177e24,2.1991421023595304e24,1.9900648595413283e24,1.8008650468435043e24,1.6296528735702394e24,1.4747182155546088e24,1.3345135338693646e24,1.2076384174930125e24,1.092825595538546e24,9.889282793300073e23,8.949087078955653e23,8.098277824655745e23,7.328356864414806e23,6.631633971448611e23,6.001150045629378e23,5.430607603677859e23,4.914307877804618e23,4.4470938945204895e23,4.024298965069406e23,3.6417000729877354e23,3.2954756932106425e23,2.9821676214077223e23,2.698646432287334e23,2.442080221855349e23,2.2099063214154487e23,1.9998057007814668e23,1.8096798050319815e23,1.6376295934454105e23,1.4819365712493017e23,1.341045624722541e23,1.2135494882020445e23,1.0981746878448992e23,9.937688217478343e22,8.992890493735059e22,8.137916753120964e22,7.364227233375495e22,6.664094066087677e22,6.0305240881750054e22,5.457188991842858e22,4.9383621153403175e22,4.468861243156835e22,4.0439968443287936e22,3.6595252318438148e22,3.31160617528234e22,2.9967645433182516e22,2.7118555929507078e22,2.4540335587643064e22,2.220723228477201e22,2.009594220863634e22,1.818537709130828e22,1.6456453572550405e22,1.4891902588863077e22,1.347609688433125e22,1.2194894920390814e22,1.1035499625435848e22,9.98633057340784e21,9.036908314646491e21,8.177749703659069e21,7.40027317830673e21,6.696713044306389e21,6.060041908891345e21,5.483900488873777e21,4.962534092007953e21,4.4907351372086253e21,4.063791139498331e21,3.677437640138833e21,3.3278156117982545e21,3.011432913301585e21,2.7251294089625144e21,2.4660454040965433e21,2.2315930814386114e21,2.0194306531631686e21,1.8274389703278912e21,1.65370035610884e21,1.496479451406162e21,1.3542058814997796e21,1.2254585706241505e21,1.1089515477904974e21,1.0035211020806689e21,9.081141591151395e20,8.217777625956682e20,7.436495558606568e20,6.729491683797761e20,6.089704211534437e20,5.510742731619185e20,4.9868243841093704e20,4.512716098187559e20,4.083682322508345e20,3.6954377249357726e20,3.344104389219559e20,3.0261730810771014e20,2.7384681967936274e20,2.478116044235284e20,2.2425161394558897e20,2.029315232197676e20,1.836383800844676e20,1.661794782051999e20,1.503804322595856e20,1.360834361187226e20,1.2314568662704384e20,1.1143795723688213e20,1.0084330725069814e20,9.125591377847802e19,8.258001474349128e19,7.47289523787937e19,6.7624307660615975e19,6.119511703305149e19,5.537716360044703e19,5.011233570767401e19,4.534804650157867e19,4.103670867599252e19,3.713525915387874e19,3.3604728958989574e19,3.0409853980760506e19,2.7518722744638816e19,2.490245766965595e19,2.253492662953683e19,2.03924819363272e19,1.845372413941507e19,1.6699288280696699e19,1.5111650470930653e19,1.3674952855299154e19,1.2374845219877503e19,1.119834165692076e19,1.0133690857296155e19,9.170258734495971e18,8.298422207842711e18,7.509473083956836e18,6.795531076422746e18,6.149465094865909e18,5.564822017248571e18,5.035762233939388e18,4.557001319749065e18,4.123757251332634e18,3.7317026427490734e18,3.376921522090108e18,3.055870217449759e18,2.765341961549813e18,2.5024348614811023e18,2.2645229136314122e18,2.0492297742873295e18,1.8544050239225093e18,1.6781026880916644e18,1.518561800390228e18,1.3741888133358756e18,1.2435416814858532e18,1.1253154578072584e18,1.0183292594317158e18,9.215144726043154e17,8.339040790138056e17,7.546229968918252e17,6.828793404050205e17,6.179565100357523e17,5.5920603494766675e17,5.060410958431345e17,4.5793066361682534e17,4.1439419526028314e17,3.749968340384075e17,3.393450659956859e17,3.0708278940782234e17,2.7788775791921238e17,2.5146836183910298e17,2.2756071544693834e17,2.0592602121397558e17,1.8634818461408234e17,1.6863165569969814e17,1.525994758838814e17,1.3809151041904181e17,1.2496284891779693e17,1.1308235793978787e17,1.023313711872426e17,9.260250422649498e16,8.37985818965261e16,7.583166769111717e16,6.8622185419755544e16,6.209812437416499e16,5.6194320061382296e16,5.0851803319116136e16,4.6017211312129896e16,4.1642254526481304e16,3.768323443778895e16,3.4100607035825228e16,3.0858587845783948e16,2.792479450103491e16,2.5269923297269856e16,2.2867456497351864e16,2.0693397463330336e16,1.872603097003633e16,1.6945706306185488e16,1.5334640996534436e16,1.3876743184600214e16,1.2557450901841508e16,1.1363586617871404e16,1.0283225618897656e16,9.305576899713036e15,8.420875379544206e15,7.62028436517461e15,6.895807287112244e15,6.240207827191812e15,5.646937639821024e15,5.110070944925159e15,4.624245339283709e15,4.184608235062467e15,3.7867683905510335e15,3.4267520489794445e15,3.100963247312859e15,2.806147898576109e15,2.539361288950067e15,2.297938664989866e15,2.0794686171807975e15,1.8817689939774168e15,1.702865105747797e15,1.5409700009161998e15,1.3944666172960762e15,1.261891630334809e15,1.1419208369410075e15,1.0333559289034062e15,9.351125237895858e14,8.462093337733788e14,7.657583642055008e14,6.929560440274212e14,6.270751994362445e14,5.674577906307221e14,5.135083390907363e14,4.646879797396728e14,4.205090785806725e14,3.805303620460117e14,3.443525094098246e14,3.116141642398204e14,2.8198832504895725e14,2.5517907909577138e14,2.309186467094383e14,2.0896470661728956e14,1.8909797555930962e14,1.711200180139447e14,1.5485126415807862e14,1.4012921626388067e14,1.2680682561741216e14,1.1475102374714145e14,1.0384139329175688e14,9.396896523149339e13,8.503513046929203e13,7.695065489032362e13,6.963478806195367e13,6.301445667154319e13,5.702353464588711e13,5.160218266198464e13,4.669625045196783e13,4.225673593220556e13,3.823929575418186e13,3.46038023883751e13,3.1313943317137688e13,2.8336858333184938e13,2.5642811320908734e13,2.3204893242158555e13,2.099875335981264e13,1.9002356014512094e13,1.7195760525161273e13,1.5560922014768758e13,1.4081511172210514e13,1.2742751149635965e13,1.153126996639368e13,1.0434966945238633e13,9.442891846740535e12,8.545135494648156e12,7.732730799739103e12,6.9975631935484e12,6.332289577358002e12,5.730264976883117e12,5.18547617005748e12,4.692481624970145e12,4.246357148033786e12,3.8426466995003784e12,3.477317885053133e12,3.146721678910154e12,2.847555976140455e12,2.5768326101409683e12,2.331847505834041e12,2.110153670465601e12,1.909536752227207e12,1.727992922573205e12,1.5637088613143389e12,1.4150436445722178e12,1.2805123546855168e12,1.1587712483581682e12,1.0486043349041454e12,9.489112305277834e11,8.586961673242197e11,7.77058047218164e11,7.031814414964346e11,6.36328446034583e11,5.75831310864936e11,5.2108577046767737e11,4.7154500816573645e11,4.26714194337834e11,3.861455438955448e11,3.494338436568036e11,3.162124049417944e11,2.8614940096437476e11,2.5894455243570398e11,2.3432612827477213e11,2.120482314679264e11,1.9188834296766824e11,1.736450990983478e11,1.5713628026875775e11,1.421969909022127e11,1.286780124046517e11,1.1644431271965814e11,1.0537369758334384e11,9.535559000737262e10,8.628992579920056e10,7.808615408761919e10,7.066233287051822e10,6.394431055089682e10,5.786498528603627e10,5.236363475196205e10,4.738530962866353e10,4.288028474799831e10,3.8803562422164185e10,3.511442299181736e10,3.1776018104564083e10,2.8755002661353035e10,2.6021201754528744e10,2.3547309270811577e10,2.1308615148750748e10,1.928275856640663e10,1.744950459401991e10,1.579054208079851e10,1.4289300757049564e10,1.2930785724811077e10,1.1701427683820524e10,1.058894739682819e10,9.582233040488726e9,8.671229216771564e9,7.846836516298903e9,7.100820630416534e9,6.425730104178484e9,5.814821908735296e9,5.261994089717653e9,4.761724818885414e9,4.309017240269453e9,3.899349559911275e9,3.528629880680032e9,3.193155331042259e9,2.889575079548609e9,2.614856865614173e9,2.3662567122906127e9,2.1412915185111964e9,1.937714257050925e9,1.753491530470836e9,1.5867832608676252e9,1.4359243105631707e9,1.2994078501552367e9,1.1758703078039289e9,1.0640777494223372e9,9.629135537322416e8,8.71367259079152e8,7.885244706050197e8,7.135577269680834e8,6.457182353835942e8,5.843283924322951e8,5.2877501593194944e8,4.785032202696369e8,4.3301087401958364e8,3.918435844873706e8,3.545901590844725e8,3.208784981998448e8,2.9037187854516673e8,2.6276558985057557e8,2.3778389131708214e8,2.1517725742570353e8,1.9471988559353304e8,1.7620744078239855e8,1.594550145324946e8,1.4429527803514796e8,1.3057681079698882e8,1.1816258820167007e8,1.0692861286239493e8,9.676267609475341e7,8.756323713903694e7,7.923840893733767e7,7.170504033503383e7,6.488788553938326e7,5.8718852539504915e7,5.313632298071172e7,4.808453669987739e7,4.351303477436982e7,3.937615552153905e7,3.563257841463391e7,3.2244911359630056e7,2.917931721054999e7,2.6405175792788025e7,2.389477805861574e7,2.1623049319991697e7,1.9567298794231944e7,1.7706992960921478e7,1.6023550466278335e7,1.4500156526408145e7,1.312159497564655e7,1.1874096282432577e7,1.0745200014644662e7,9.723630380658004e6,8.799183602984983e6,7.962625999549808e6,7.205601754598913e6,6.520549458032392e6,5.900626579523342e6,5.339641123047883e6,4.831989779168041e6,4.372601957312308e6,3.9568891390294656e6,3.5806990463392576e6,3.240274167398003e6,2.9322142252197633e6,2.653442214578218e6,2.4011736678543976e6,2.1728888428474125e6,1.966307554750795e6,1.7793664009077784e6,1.610198150858844e6,1.4571130958224873e6,1.3185821713215548e6,1.1932216843783588e6,1.0797794927287332e6,977122.4980083631,884225.3279892346,800160.0948205667,724087.1269761483,655246.5823356959,592950.8586288727,536577.7254349717,485564.1091384002,439400.46876200807,397625.70650222956,359822.5621307702,325613.44526057766,294656.66384739015,266643.01125588565,241292.67780090027,218352.4559151701,197593.21102788323,178807.59289232772,161807.96450261967,146424.52791284374,132503.62823865874,119906.21890117509,108506.47278345097,98190.52542737164,88855.33771754657,80407.66669233437,72763.13420210879,65845.38411221991,59585.31963250904,53920.41315557261,48794.08171021058,44155.12179187866,39957.19792504387,36158.37984903481,32720.72370464318,29609.89303822994,26794.815837799397,24247.374175402263,21942.123355913413,19856.03776694912,17968.280891387385,16259.997185300332,14714.123742506443,13315.219864584897,12049.312834040926,10903.75835015345,9867.114233491295,8929.026137616986,8080.124126428653,7311.929084119831,6616.768022948852,5987.697442883777,5418.433977613131,4903.291634192147,4437.124999452858,4015.2778459049414,3633.5366237859794,3288.088374724111,2975.4826466408335,2692.597029487345,2436.605967573807,2204.9525369787443,1995.322906141987,1805.6232245449758,1633.958708634934,1478.6147160961689,1338.0396194319617,1210.8293077927547,1095.7131622496822,991.5413644298444,897.2734117477358,811.9677245191323,734.7722411498454,664.915907460949,601.7009751430307,544.4960324138609,492.72969726737614,445.8849103200452,403.49377024966424,365.1328602412317,330.419018758886,299.00551240096536,270.57857261139856,244.8542616549435,221.57563655259082,200.51018264957816,181.44749118163622,164.1971576422269,148.58687995896315,134.46073748316795,121.6776336025441,110.10988642125253,99.64195343064367,90.16927743222836,81.59724218558154,73.84022734984451,66.82075327926566,60.46870713071279,54.72064255326218,49.5191459649303,44.81226308670955,40.55298000593859,36.69875358569651,33.21108652979262,30.055142858959893,27.199399957500617,24.615333714909845,22.27713361756674,20.161444944734644,18.24713549383778,16.515084504989083,14.947991676476898,13.530204363593915,12.247561234812533,11.08725082369258,10.037683563690832,9.088376027713283,8.229846216156409,7.45351884753948,6.751639705739205,6.1171981882984845,5.54385728219589,5.025890267650613,4.558123517739433,4.135884822489174,3.754956721288583,3.411534377488137,3.1021875744253267,2.8238264532790343,2.573670650531312,2.349221526771244,2.148237209452952,1.9687102003264987,1.8088473238772653,1.6670518164921317,1.5419073774530982,1.4321640224543635,1.3367255983430766,1.25463883437684,1.185083820638284,1.12736581850194,1.0809083213536375,1.0452472962505772,1.020026549005867,1.004994166402439,1.0,1.004994166402439,1.020026549005867,1.0452472962505772,1.0809083213536375,1.12736581850194,1.185083820638284,1.25463883437684,1.3367255983430766,1.4321640224543635,1.5419073774530982,1.6670518164921317,1.8088473238772653,1.9687102003264987,2.148237209452952,2.349221526771244,2.573670650531312,2.8238264532790343,3.1021875744253267,3.411534377488137,3.754956721288583,4.135884822489174,4.558123517739433,5.025890267650613,5.54385728219589,6.1171981882984845,6.751639705739205,7.45351884753948,8.229846216156409,9.088376027713283,10.037683563690832,11.08725082369258,12.247561234812533,13.530204363593915,14.947991676476898,16.515084504989083,18.24713549383778,20.161444944734644,22.27713361756674,24.615333714909845,27.199399957500617,30.055142858959893,33.21108652979262,36.69875358569651,40.55298000593859,44.81226308670955,49.5191459649303,54.72064255326218,60.46870713071279,66.82075327926566,73.84022734984451,81.59724218558154,90.16927743222836,99.64195343064367,110.10988642125253,121.6776336025441,134.46073748316795,148.58687995896315,164.1971576422269,181.44749118163622,200.51018264957816,221.57563655259082,244.8542616549435,270.57857261139856,299.00551240096536,330.419018758886,365.1328602412317,403.49377024966424,445.8849103200452,492.72969726737614,544.4960324138609,601.7009751430307,664.915907460949,734.7722411498454,811.9677245191323,897.2734117477358,991.5413644298444,1095.7131622496822,1210.8293077927547,1338.0396194319617,1478.6147160961689,1633.958708634934,1805.6232245449758,1995.322906141987,2204.9525369787443,2436.605967573807,2692.597029487345,2975.4826466408335,3288.088374724111,3633.5366237859794,4015.2778459049414,4437.124999452858,4903.291634192147,5418.433977613131,5987.697442883777,6616.768022948852,7311.929084119831,8080.124126428653,8929.026137616986,9867.114233491295,10903.75835015345,12049.312834040926,13315.219864584897,14714.123742506443,16259.997185300332,17968.280891387385,19856.03776694912,21942.123355913413,24247.374175402263,26794.815837799397,29609.89303822994,32720.72370464318,36158.37984903481,39957.19792504387,44155.12179187866,48794.08171021058,53920.41315557261,59585.31963250904,65845.38411221991,72763.13420210879,80407.66669233437,88855.33771754657,98190.52542737164,108506.47278345097,119906.21890117509,132503.62823865874,146424.52791284374,161807.96450261967,178807.59289232772,197593.21102788323,218352.4559151701,241292.67780090027,266643.01125588565,294656.66384739015,325613.44526057766,359822.5621307702,397625.70650222956,439400.46876200807,485564.1091384002,536577.7254349717,592950.8586288727,655246.5823356959,724087.1269761483,800160.0948205667,884225.3279892346,977122.4980083631,1.0797794927287332e6,1.1932216843783588e6,1.3185821713215548e6,1.4571130958224873e6,1.610198150858844e6,1.7793664009077784e6,1.966307554750795e6,2.1728888428474125e6,2.4011736678543976e6,2.653442214578218e6,2.9322142252197633e6,3.240274167398003e6,3.5806990463392576e6,3.9568891390294656e6,4.372601957312308e6,4.831989779168041e6,5.339641123047883e6,5.900626579523342e6,6.520549458032392e6,7.205601754598913e6,7.962625999549808e6,8.799183602984983e6,9.723630380658004e6,1.0745200014644662e7,1.1874096282432577e7,1.312159497564655e7,1.4500156526408145e7,1.6023550466278335e7,1.7706992960921478e7,1.9567298794231944e7,2.1623049319991697e7,2.389477805861574e7,2.6405175792788025e7,2.917931721054999e7,3.2244911359630056e7,3.563257841463391e7,3.937615552153905e7,4.351303477436982e7,4.808453669987739e7,5.313632298071172e7,5.8718852539504915e7,6.488788553938326e7,7.170504033503383e7,7.923840893733767e7,8.756323713903694e7,9.676267609475341e7,1.0692861286239493e8,1.1816258820167007e8,1.3057681079698882e8,1.4429527803514796e8,1.594550145324946e8,1.7620744078239855e8,1.9471988559353304e8,2.1517725742570353e8,2.3778389131708214e8,2.6276558985057557e8,2.9037187854516673e8,3.208784981998448e8,3.545901590844725e8,3.918435844873706e8,4.3301087401958364e8,4.785032202696369e8,5.2877501593194944e8,5.843283924322951e8,6.457182353835942e8,7.135577269680834e8,7.885244706050197e8,8.71367259079152e8,9.629135537322416e8,1.0640777494223372e9,1.1758703078039289e9,1.2994078501552367e9,1.4359243105631707e9,1.5867832608676252e9,1.753491530470836e9,1.937714257050925e9,2.1412915185111964e9,2.3662567122906127e9,2.614856865614173e9,2.889575079548609e9,3.193155331042259e9,3.528629880680032e9,3.899349559911275e9,4.309017240269453e9,4.761724818885414e9,5.261994089717653e9,5.814821908735296e9,6.425730104178484e9,7.100820630416534e9,7.846836516298903e9,8.671229216771564e9,9.582233040488726e9,1.058894739682819e10,1.1701427683820524e10,1.2930785724811077e10,1.4289300757049564e10,1.579054208079851e10,1.744950459401991e10,1.928275856640663e10,2.1308615148750748e10,2.3547309270811577e10,2.6021201754528744e10,2.8755002661353035e10,3.1776018104564083e10,3.511442299181736e10,3.8803562422164185e10,4.288028474799831e10,4.738530962866353e10,5.236363475196205e10,5.786498528603627e10,6.394431055089682e10,7.066233287051822e10,7.808615408761919e10,8.628992579920056e10,9.535559000737262e10,1.0537369758334384e11,1.1644431271965814e11,1.286780124046517e11,1.421969909022127e11,1.5713628026875775e11,1.736450990983478e11,1.9188834296766824e11,2.120482314679264e11,2.3432612827477213e11,2.5894455243570398e11,2.8614940096437476e11,3.162124049417944e11,3.494338436568036e11,3.861455438955448e11,4.26714194337834e11,4.7154500816573645e11,5.2108577046767737e11,5.75831310864936e11,6.36328446034583e11,7.031814414964346e11,7.77058047218164e11,8.586961673242197e11,9.489112305277834e11,1.0486043349041454e12,1.1587712483581682e12,1.2805123546855168e12,1.4150436445722178e12,1.5637088613143389e12,1.727992922573205e12,1.909536752227207e12,2.110153670465601e12,2.331847505834041e12,2.5768326101409683e12,2.847555976140455e12,3.146721678910154e12,3.477317885053133e12,3.8426466995003784e12,4.246357148033786e12,4.692481624970145e12,5.18547617005748e12,5.730264976883117e12,6.332289577358002e12,6.9975631935484e12,7.732730799739103e12,8.545135494648156e12,9.442891846740535e12,1.0434966945238633e13,1.153126996639368e13,1.2742751149635965e13,1.4081511172210514e13,1.5560922014768758e13,1.7195760525161273e13,1.9002356014512094e13,2.099875335981264e13,2.3204893242158555e13,2.5642811320908734e13,2.8336858333184938e13,3.1313943317137688e13,3.46038023883751e13,3.823929575418186e13,4.225673593220556e13,4.669625045196783e13,5.160218266198464e13,5.702353464588711e13,6.301445667154319e13,6.963478806195367e13,7.695065489032362e13,8.503513046929203e13,9.396896523149339e13,1.0384139329175688e14,1.1475102374714145e14,1.2680682561741216e14,1.4012921626388067e14,1.5485126415807862e14,1.711200180139447e14,1.8909797555930962e14,2.0896470661728956e14,2.309186467094383e14,2.5517907909577138e14,2.8198832504895725e14,3.116141642398204e14,3.443525094098246e14,3.805303620460117e14,4.205090785806725e14,4.646879797396728e14,5.135083390907363e14,5.674577906307221e14,6.270751994362445e14,6.929560440274212e14,7.657583642055008e14,8.462093337733788e14,9.351125237895858e14,1.0333559289034062e15,1.1419208369410075e15,1.261891630334809e15,1.3944666172960762e15,1.5409700009161998e15,1.702865105747797e15,1.8817689939774168e15,2.0794686171807975e15,2.297938664989866e15,2.539361288950067e15,2.806147898576109e15,3.100963247312859e15,3.4267520489794445e15,3.7867683905510335e15,4.184608235062467e15,4.624245339283709e15,5.110070944925159e15,5.646937639821024e15,6.240207827191812e15,6.895807287112244e15,7.62028436517461e15,8.420875379544206e15,9.305576899713036e15,1.0283225618897656e16,1.1363586617871404e16,1.2557450901841508e16,1.3876743184600214e16,1.5334640996534436e16,1.6945706306185488e16,1.872603097003633e16,2.0693397463330336e16,2.2867456497351864e16,2.5269923297269856e16,2.792479450103491e16,3.0858587845783948e16,3.4100607035825228e16,3.768323443778895e16,4.1642254526481304e16,4.6017211312129896e16,5.0851803319116136e16,5.6194320061382296e16,6.209812437416499e16,6.8622185419755544e16,7.583166769111717e16,8.37985818965261e16,9.260250422649498e16,1.023313711872426e17,1.1308235793978787e17,1.2496284891779693e17,1.3809151041904181e17,1.525994758838814e17,1.6863165569969814e17,1.8634818461408234e17,2.0592602121397558e17,2.2756071544693834e17,2.5146836183910298e17,2.7788775791921238e17,3.0708278940782234e17,3.393450659956859e17,3.749968340384075e17,4.1439419526028314e17,4.5793066361682534e17,5.060410958431345e17,5.5920603494766675e17,6.179565100357523e17,6.828793404050205e17,7.546229968918252e17,8.339040790138056e17,9.215144726043154e17,1.0183292594317158e18,1.1253154578072584e18,1.2435416814858532e18,1.3741888133358756e18,1.518561800390228e18,1.6781026880916644e18,1.8544050239225093e18,2.0492297742873295e18,2.2645229136314122e18,2.5024348614811023e18,2.765341961549813e18,3.055870217449759e18,3.376921522090108e18,3.7317026427490734e18,4.123757251332634e18,4.557001319749065e18,5.035762233939388e18,5.564822017248571e18,6.149465094865909e18,6.795531076422746e18,7.509473083956836e18,8.298422207842711e18,9.170258734495971e18,1.0133690857296155e19,1.119834165692076e19,1.2374845219877503e19,1.3674952855299154e19,1.5111650470930653e19,1.6699288280696699e19,1.845372413941507e19,2.03924819363272e19,2.253492662953683e19,2.490245766965595e19,2.7518722744638816e19,3.0409853980760506e19,3.3604728958989574e19,3.713525915387874e19,4.103670867599252e19,4.534804650157867e19,5.011233570767401e19,5.537716360044703e19,6.119511703305149e19,6.7624307660615975e19,7.47289523787937e19,8.258001474349128e19,9.125591377847802e19,1.0084330725069814e20,1.1143795723688213e20,1.2314568662704384e20,1.360834361187226e20,1.503804322595856e20,1.661794782051999e20,1.836383800844676e20,2.029315232197676e20,2.2425161394558897e20,2.478116044235284e20,2.7384681967936274e20,3.0261730810771014e20,3.344104389219559e20,3.6954377249357726e20,4.083682322508345e20,4.512716098187559e20,4.9868243841093704e20,5.510742731619185e20,6.089704211534437e20,6.729491683797761e20,7.436495558606568e20,8.217777625956682e20,9.081141591151395e20,1.0035211020806689e21,1.1089515477904974e21,1.2254585706241505e21,1.3542058814997796e21,1.496479451406162e21,1.65370035610884e21,1.8274389703278912e21,2.0194306531631686e21,2.2315930814386114e21,2.4660454040965433e21,2.7251294089625144e21,3.011432913301585e21,3.3278156117982545e21,3.677437640138833e21,4.063791139498331e21,4.4907351372086253e21,4.962534092007953e21,5.483900488873777e21,6.060041908891345e21,6.696713044306389e21,7.40027317830673e21,8.177749703659069e21,9.036908314646491e21,9.98633057340784e21,1.1035499625435848e22,1.2194894920390814e22,1.347609688433125e22,1.4891902588863077e22,1.6456453572550405e22,1.818537709130828e22,2.009594220863634e22,2.220723228477201e22,2.4540335587643064e22,2.7118555929507078e22,2.9967645433182516e22,3.31160617528234e22,3.6595252318438148e22,4.0439968443287936e22,4.468861243156835e22,4.9383621153403175e22,5.457188991842858e22,6.0305240881750054e22,6.664094066087677e22,7.364227233375495e22,8.137916753120964e22,8.992890493735059e22,9.937688217478343e22,1.0981746878448992e23,1.2135494882020445e23,1.341045624722541e23,1.4819365712493017e23,1.6376295934454105e23,1.8096798050319815e23,1.9998057007814668e23,2.2099063214154487e23,2.442080221855349e23,2.698646432287334e23,2.9821676214077223e23,3.2954756932106425e23,3.6417000729877354e23,4.024298965069406e23,4.4470938945204895e23,4.914307877804618e23,5.430607603677859e23,6.001150045629378e23,6.631633971448611e23,7.328356864414806e23,8.098277824655745e23,8.949087078955653e23,9.889282793300073e23,1.092825595538546e24,1.2076384174930125e24,1.3345135338693646e24,1.4747182155546088e24,1.6296528735702394e24,1.8008650468435043e24,1.9900648595413283e24,2.1991421023595304e24,2.4301851083813177e24,2.685501612043095e24,2.967641799553977e24,3.2794237810044934e24,3.623961738587892e24,4.00469703208845e24,4.4254325723282456e24,4.890370805905973e24,5.404155690632385e24,5.971919080926173e24,6.599331986484051e24,7.292661216212859e24,8.058831973202378e24,8.905497025958896e24,9.841113146803482e24,1.0875025580928877e25,1.2017561389818077e25,1.3280132601371831e25,1.4675350197041097e25,1.6217150074506443e25,1.7920932244062736e25,1.9803714649046275e25,2.188430314671732e25,2.4183479347420783e25,2.672420818822602e25,2.95318673143623e25,3.2634500559583737e25,3.6063098057315263e25,3.985190578041848e25,4.403876760136488e25,4.866550328943074e25,5.377832622046799e25,5.942830497148498e25,6.567187341058655e25,7.257139437723285e25,8.019578258303356e25,8.86211929548207e25,9.79317812954066e25,1.0822054485974488e26,1.1959025124246747e26,1.3215446485481972e26,1.4603868124379158e26,1.6138158058341304e26,1.783364128584778e26,1.970725285764025e26,2.177770702964458e26,2.4065684187188124e26,2.6594037407570578e26,2.9388020724205046e26,3.2475541372309745e26,3.588743853565944e26,3.96577913786179e26,4.382425944017272e26,4.8428458789943e26,5.351637770333492e26,5.913883600773895e26,6.535199268788135e26,7.221790682045277e26,7.980515744081805e26,8.818952853324852e26,9.745476598657377e26,1.0769341407599516e27,1.1900773982610041e27,1.3151075448794503e27,1.4532734233303688e27,1.6059550803899854e27,1.774677551262234e27,1.9611260921378238e27,2.1671630130940156e27,2.394846279467429e27,2.646450067496671e27,2.9244874795515813e27,3.2317356458359555e27,3.5712634632883047e27,3.946462248745878e27,4.361079612545811e27,4.819256890904419e27,5.325570510961656e27,5.885077701658153e27,6.503367007021376e27,7.18661410640299e27,7.941643499219586e27,8.775996670324207e27,9.698007416866411e27,1.071688508903245e28,1.1842806576099377e28,1.3087017956592178e28,1.4461946827859039e28,1.5981326437048815e28,1.7660332853355226e28,1.9515736551645866e28,2.1566069921546663e28,2.3831812375117466e28,2.633559490203404e28,2.9102426115446574e28,3.2159942046329553e28,3.5538682181357357e28,3.927239450145888e28,4.3398372567885425e28,4.795782802271008e28,5.299630222442467e28,5.8564121130185515e28,6.471689796821907e28,7.151608872125852e28,7.902960596934907e28,8.733249722329981e28,9.650769452419932e28,1.0664684279623676e29,1.178512152267125e29,1.302327248163319e29,1.439150422035029e29,1.5903483092783275e29,1.7574311247103523e29,1.9420677470976347e29,2.1461023884725472e29,2.371573014736867e29,2.6207317015434826e29,2.8960671287773744e29,3.2003294383187614e29,3.536557703375323e29,3.9081102837568526e29,4.3186983702907716e29,4.7724230534309824e29,5.273816286314532e29,5.827886151417576e29,6.440166882950009e29,7.116774144628215e29,7.864466114960117e29,8.690710990180926e29,9.603761579082667e29,1.0612737734815137e30,1.1727717447013688e30,1.2959837504114582e30,1.4321404731303712e30,1.5826018915182451e30,1.748870864296257e30,1.932608141299592e30,2.135648951599643e30,2.3600213343826597e30,2.607966395680102e30,2.8819606932815754e30,3.1847409734180847e30,3.519331506294424e30,3.8890742935063236e30,4.297662449064659e30,4.749177087447346e30,5.248128087128696e30,5.799499136746912e30,6.408797513844559e30,7.082109093389559e30,7.826159135519894e30,8.648379459679637e30,9.556982676105528e30,1.0561044216110813e31,1.1670592980513808e31,1.2896711511636293e31,1.4251646689425502e31,1.5748932057366225e31,1.740352300001733e31,1.9231946122370223e31,2.1252464323078583e31,2.3485259210369642e31,2.5952632682662693e31,2.8679229687352928e31,3.169228438274842e31,3.502189216190523e31,3.8701310255431685e31,4.276728991577422e31,4.7260443500958195e31,5.222565012433661e31,5.771250392210733e31,6.377580941605486e31,7.047612891935041e31,7.788038745309191e31,8.606254121568893e31,9.510431628198065e31,1.0509602491047713e32,1.1613746761224921e32,1.2833892999164813e32,1.4182228431562753e32,1.5672220681449761e32,1.7318752287294576e32,1.913826935475013e32,2.1148945825830618e32,2.3370865006291557e32,2.5826220164373213e32,2.853953620454867e32,3.1537914630432015e32,3.4851304243616435e32,3.85128002822697e32,4.255897498739005e32,4.7030242898518934e32,5.1971264527612456e32,5.7431392443098926e32,6.3465164219753866e32,7.013284717815193e32,7.7501040354719e32,8.564333971507328e32,9.464107325502424e32,1.0458411333165598e33,1.1557177433834737e33,1.2771380468998037e33,1.4113148302663407e33,1.5595882958500597e33,1.723439448371301e33,1.9045048876719297e33,2.104593155619142e33,2.3257028004235462e33,2.5700423388038534e33,2.840052315386727e33,3.1384296796789463e33,3.468154724096505e33,3.832520852117203e33,4.2351674738904317e33,4.6801163578772716e33,5.171811801612142e33,5.715165022825709e33,6.315603214322145e33,6.979123752586706e33,7.71235410157853e33,8.522618010045982e33,9.41800866356662e33,1.040746952197833e34,1.150088364963205e34,1.2709172430728469e34,1.4044404655737583e34,1.5519917068494575e34,1.715044757803604e34,1.8952282465739317e34,2.094341905812245e34,2.3143745490130123e34,2.557523935444461e34,2.8262187220996093e34,3.1231427219304283e34,3.451261710665021e34,3.8138530499624667e34,4.214538422791836e34,4.657320008007061e34,5.146620455441015e34,5.687327060804307e34,6.284840581621098e34,6.9451291817928225e34,7.674788043605072e34,8.481105242603744e34,9.372134543318737e34,1.0356775842944487e35,1.144486406647525e35,1.2647267401208405e35,1.397599585181711e35,1.5444321200273356e35,1.706690956882336e35,1.8859967910097795e35,2.0841405887547354e35,2.303101476312328e35,2.545066507898733e35,2.8124525107765785e35,3.1079302253300187e35,3.434450981308354e35,3.795276176690036e35,4.1940098536109216e35,4.63463469673661e35,5.12155181364241e35,5.65962469454023e35,6.254227790437822e35,6.911300194943821e35,7.637404965911337e35,8.43979467944412e35,9.326483871039919e35,1.030632908743899e36,1.1389117348759993e36,1.2585663904514217e36,1.3907920259917264e36,1.5369093551499888e36,1.6983778464384192e36,1.8768103008855082e36,2.0739889612294938e36,2.2918833135518556e36,2.532669759159919e36,2.7987533532073217e36,3.092791827185326e36,3.4177221352295126e36,3.7767897893949243e36,4.173581276910877e36,4.6120598832088223e36,5.0966052785362823e36,5.632057263560939e36,6.2237641109101e36,6.877635985498085e36,7.600203977220027e36,8.398685335651399e36,9.281055558338836e36,1.02561280527234e37,1.133364216738801e37,1.2524360471911885e37,1.3840176256997475e37,1.5294232328616336e37,1.6901052282728344e37,1.867668557179288e37,2.063886781204054e37,2.280719793271074e37,2.5203333936679934e37,2.785120922780083e37,3.0777271665707286e37,3.401074773583696e37,3.758393447329545e37,4.1532522056389447e37,4.589595029200858e37,5.071780255354043e37,5.604624110610911e37,6.193448816730893e37,6.844135750842277e37,7.563184190594837e37,8.357776231107647e37,9.235848522125457e37,1.020617154191784e38,1.127843719973444e38,1.24633556418209e38,1.3772762227923416e38,1.5219735746800884e38,1.681872905151993e38,1.8585713419360408e38,2.0538338078249537e38,2.2696106493123317e38,2.508057117302536e38,2.7715548944740397e38,3.062735884318502e38,3.3845084994689796e38,3.74008671189309e38,4.13302215511469e38,4.567239599111573e38,5.047076152223941e38,5.577324581636282e38,6.163281185130833e38,6.810798692272609e38,7.52634472341974e38,8.317066390468625e38,9.190861684585773e38,1.0156458363972163e39,1.1223501129616951e39,1.2402647959780129e39,1.370567656542733e39,1.5145602029926033e39,1.6736806808029868e39,1.849518438262351e39,2.0438298014118137e39,2.2585556168143046e39,2.495840637375863e39,2.7580549448514695e39,3.0478176230104345e39,3.36802291791656e39,3.721869146621291e39,4.112890643018682e39,4.5449930599486114e39,5.0224923801572385e39,5.550158025768774e39,6.133260496861352e39,6.77762401497559e39,7.489684697377736e39,8.276554843141008e39,9.146093973155288e39,1.0106987333638131e40,1.1168832647264035e40,1.234223597841297e40,1.3638917670070474e40,1.5071829410514967e40,1.6655283599090027e40,1.8405096303212422e40,2.0338745234517415e40,2.247554432205813e40,2.483683662625834e40,2.7446207520501996e40,3.0329720269692164e40,3.351617635881534e40,3.70374031717569e40,4.092857189380641e40,4.522854881315962e40,4.998028353034033e40,5.523123795310502e40,6.103386036176999e40,6.7446109280094765e40,7.453203238430328e40,8.236240623259014e40,9.101544320493994e40,1.0057757271440295e41,1.1114430449284422e41,1.2282118257392666e41,1.3572483950204615e41,1.4998416129700284e41,1.6574157481045249e41,1.831544703327135e41,2.023967736593588e41,2.236606833199504e41,2.4715859032090517e41,2.7312519957756955e41,3.018198742250134e41,3.33529226223343e41,3.6856997913335e41,4.072921316568229e41,4.500824535400923e41,4.9736834875895595e41,5.496221245718367e41,6.073657090818735e41,6.711758644284827e41,7.416899476796052e41,8.196122769661839e41,9.057211664460645e41,1.0008767003648447e42,1.106029323863504e42,1.2222293363408658e42,1.350637382193485e42,1.4925360437181616e42,1.6493426519707942e42,1.8226234435405696e42,2.0141092046424003e42,2.225712558785567e42,2.45954707069388e42,2.7179483572935842e42,3.003497416632373e42,3.319046407747075e42,3.66774713897719e42,4.053082549275605e42,4.478901496961774e42,4.949457203399863e42,5.469449735589009e42,6.044072951996769e42,6.679066380546126e42,7.380772546930164e42,8.156200325870043e42,9.013094948087966e42,9.960015362249354e42,1.100641972459074e43,1.2162759870131366e43,1.3440585709080678e43],"x":[-100.0,-99.9000999000999,-99.8001998001998,-99.7002997002997,-99.6003996003996,-99.5004995004995,-99.4005994005994,-99.3006993006993,-99.2007992007992,-99.1008991008991,-99.000999000999,-98.9010989010989,-98.80119880119881,-98.7012987012987,-98.6013986013986,-98.5014985014985,-98.4015984015984,-98.3016983016983,-98.2017982017982,-98.1018981018981,-98.001998001998,-97.9020979020979,-97.8021978021978,-97.7022977022977,-97.6023976023976,-97.5024975024975,-97.40259740259741,-97.3026973026973,-97.2027972027972,-97.1028971028971,-97.002997002997,-96.90309690309691,-96.8031968031968,-96.7032967032967,-96.6033966033966,-96.5034965034965,-96.40359640359641,-96.3036963036963,-96.2037962037962,-96.1038961038961,-96.00399600399601,-95.90409590409591,-95.8041958041958,-95.7042957042957,-95.6043956043956,-95.50449550449551,-95.4045954045954,-95.3046953046953,-95.2047952047952,-95.1048951048951,-95.00499500499501,-94.9050949050949,-94.8051948051948,-94.7052947052947,-94.60539460539461,-94.50549450549451,-94.4055944055944,-94.3056943056943,-94.2057942057942,-94.10589410589411,-94.00599400599401,-93.9060939060939,-93.8061938061938,-93.7062937062937,-93.60639360639361,-93.50649350649351,-93.4065934065934,-93.3066933066933,-93.20679320679321,-93.10689310689311,-93.00699300699301,-92.9070929070929,-92.8071928071928,-92.70729270729271,-92.60739260739261,-92.5074925074925,-92.4075924075924,-92.3076923076923,-92.20779220779221,-92.10789210789211,-92.007992007992,-91.9080919080919,-91.80819180819181,-91.70829170829171,-91.60839160839161,-91.5084915084915,-91.4085914085914,-91.30869130869131,-91.20879120879121,-91.10889110889111,-91.008991008991,-90.9090909090909,-90.80919080919081,-90.70929070929071,-90.60939060939062,-90.5094905094905,-90.40959040959041,-90.30969030969031,-90.20979020979021,-90.10989010989012,-90.00999000999,-89.91008991008991,-89.81018981018981,-89.71028971028971,-89.6103896103896,-89.5104895104895,-89.41058941058941,-89.31068931068931,-89.21078921078922,-89.1108891108891,-89.01098901098901,-88.91108891108891,-88.81118881118881,-88.71128871128872,-88.6113886113886,-88.51148851148851,-88.41158841158841,-88.31168831168831,-88.21178821178822,-88.1118881118881,-88.01198801198801,-87.91208791208791,-87.81218781218782,-87.71228771228772,-87.61238761238761,-87.51248751248751,-87.41258741258741,-87.31268731268732,-87.21278721278722,-87.11288711288711,-87.01298701298701,-86.91308691308691,-86.81318681318682,-86.7132867132867,-86.61338661338661,-86.51348651348651,-86.41358641358642,-86.31368631368632,-86.21378621378621,-86.11388611388611,-86.01398601398601,-85.91408591408592,-85.81418581418582,-85.71428571428571,-85.61438561438561,-85.51448551448551,-85.41458541458542,-85.31468531468532,-85.21478521478521,-85.11488511488511,-85.01498501498502,-84.91508491508492,-84.81518481518482,-84.71528471528471,-84.61538461538461,-84.51548451548452,-84.41558441558442,-84.31568431568432,-84.21578421578421,-84.11588411588411,-84.01598401598402,-83.91608391608392,-83.81618381618381,-83.71628371628371,-83.61638361638362,-83.51648351648352,-83.41658341658342,-83.31668331668331,-83.21678321678321,-83.11688311688312,-83.01698301698302,-82.91708291708292,-82.81718281718281,-82.71728271728271,-82.61738261738262,-82.51748251748252,-82.41758241758242,-82.31768231768231,-82.21778221778222,-82.11788211788212,-82.01798201798202,-81.91808191808192,-81.81818181818181,-81.71828171828172,-81.61838161838162,-81.51848151848152,-81.41858141858143,-81.31868131868131,-81.21878121878122,-81.11888111888112,-81.01898101898102,-80.91908091908093,-80.81918081918081,-80.71928071928072,-80.61938061938062,-80.51948051948052,-80.41958041958041,-80.31968031968032,-80.21978021978022,-80.11988011988012,-80.01998001998003,-79.92007992007991,-79.82017982017982,-79.72027972027972,-79.62037962037962,-79.52047952047953,-79.42057942057941,-79.32067932067932,-79.22077922077922,-79.12087912087912,-79.02097902097903,-78.92107892107892,-78.82117882117882,-78.72127872127872,-78.62137862137862,-78.52147852147853,-78.42157842157842,-78.32167832167832,-78.22177822177822,-78.12187812187813,-78.02197802197803,-77.92207792207792,-77.82217782217782,-77.72227772227772,-77.62237762237763,-77.52247752247752,-77.42257742257742,-77.32267732267732,-77.22277722277722,-77.12287712287713,-77.02297702297702,-76.92307692307692,-76.82317682317682,-76.72327672327673,-76.62337662337663,-76.52347652347652,-76.42357642357642,-76.32367632367632,-76.22377622377623,-76.12387612387613,-76.02397602397602,-75.92407592407592,-75.82417582417582,-75.72427572427573,-75.62437562437563,-75.52447552447552,-75.42457542457542,-75.32467532467533,-75.22477522477523,-75.12487512487513,-75.02497502497502,-74.92507492507492,-74.82517482517483,-74.72527472527473,-74.62537462537462,-74.52547452547452,-74.42557442557442,-74.32567432567433,-74.22577422577423,-74.12587412587412,-74.02597402597402,-73.92607392607393,-73.82617382617383,-73.72627372627373,-73.62637362637362,-73.52647352647352,-73.42657342657343,-73.32667332667333,-73.22677322677323,-73.12687312687312,-73.02697302697302,-72.92707292707293,-72.82717282717283,-72.72727272727273,-72.62737262737262,-72.52747252747253,-72.42757242757243,-72.32767232767233,-72.22777222777223,-72.12787212787212,-72.02797202797203,-71.92807192807193,-71.82817182817183,-71.72827172827172,-71.62837162837162,-71.52847152847153,-71.42857142857143,-71.32867132867133,-71.22877122877122,-71.12887112887113,-71.02897102897103,-70.92907092907093,-70.82917082917083,-70.72927072927072,-70.62937062937063,-70.52947052947053,-70.42957042957043,-70.32967032967034,-70.22977022977022,-70.12987012987013,-70.02997002997003,-69.93006993006993,-69.83016983016984,-69.73026973026973,-69.63036963036963,-69.53046953046953,-69.43056943056943,-69.33066933066934,-69.23076923076923,-69.13086913086913,-69.03096903096903,-68.93106893106894,-68.83116883116882,-68.73126873126873,-68.63136863136863,-68.53146853146853,-68.43156843156844,-68.33166833166833,-68.23176823176823,-68.13186813186813,-68.03196803196803,-67.93206793206794,-67.83216783216783,-67.73226773226773,-67.63236763236763,-67.53246753246754,-67.43256743256744,-67.33266733266733,-67.23276723276723,-67.13286713286713,-67.03296703296704,-66.93306693306694,-66.83316683316683,-66.73326673326673,-66.63336663336663,-66.53346653346654,-66.43356643356644,-66.33366633366633,-66.23376623376623,-66.13386613386614,-66.03396603396604,-65.93406593406593,-65.83416583416583,-65.73426573426573,-65.63436563436564,-65.53446553446554,-65.43456543456543,-65.33466533466533,-65.23476523476523,-65.13486513486514,-65.03496503496504,-64.93506493506493,-64.83516483516483,-64.73526473526474,-64.63536463536464,-64.53546453546454,-64.43556443556443,-64.33566433566433,-64.23576423576424,-64.13586413586414,-64.03596403596404,-63.93606393606394,-63.836163836163834,-63.73626373626374,-63.63636363636363,-63.536463536463536,-63.43656343656344,-63.336663336663335,-63.23676323676324,-63.136863136863134,-63.03696303696304,-62.93706293706294,-62.837162837162836,-62.73726273726274,-62.637362637362635,-62.53746253746254,-62.437562437562434,-62.33766233766234,-62.23776223776224,-62.137862137862136,-62.03796203796204,-61.938061938061935,-61.83816183816184,-61.73826173826174,-61.63836163836164,-61.53846153846154,-61.438561438561436,-61.33866133866134,-61.23876123876124,-61.13886113886114,-61.03896103896104,-60.93906093906094,-60.83916083916084,-60.739260739260736,-60.63936063936064,-60.53946053946054,-60.43956043956044,-60.33966033966034,-60.23976023976024,-60.13986013986014,-60.03996003996004,-59.94005994005994,-59.84015984015984,-59.74025974025974,-59.64035964035964,-59.54045954045954,-59.44055944055944,-59.34065934065934,-59.24075924075924,-59.14085914085914,-59.04095904095904,-58.94105894105894,-58.841158841158844,-58.74125874125874,-58.64135864135864,-58.54145854145854,-58.44155844155844,-58.341658341658345,-58.24175824175824,-58.141858141858144,-58.04195804195804,-57.94205794205794,-57.84215784215784,-57.74225774225774,-57.642357642357645,-57.54245754245754,-57.442557442557444,-57.34265734265734,-57.24275724275724,-57.142857142857146,-57.04295704295704,-56.943056943056945,-56.84315684315684,-56.743256743256744,-56.64335664335665,-56.54345654345654,-56.443556443556446,-56.34365634365634,-56.243756243756245,-56.14385614385614,-56.043956043956044,-55.94405594405595,-55.84415584415584,-55.744255744255746,-55.64435564435564,-55.544455544455545,-55.44455544455545,-55.344655344655344,-55.24475524475525,-55.14485514485514,-55.044955044955046,-54.94505494505494,-54.845154845154845,-54.74525474525475,-54.645354645354644,-54.54545454545455,-54.44555444555444,-54.345654345654346,-54.24575424575425,-54.145854145854145,-54.04595404595405,-53.946053946053944,-53.84615384615385,-53.74625374625375,-53.646353646353646,-53.54645354645355,-53.446553446553445,-53.34665334665335,-53.246753246753244,-53.14685314685315,-53.04695304695305,-52.947052947052946,-52.84715284715285,-52.747252747252745,-52.64735264735265,-52.54745254745255,-52.44755244755245,-52.34765234765235,-52.247752247752246,-52.14785214785215,-52.047952047952045,-51.94805194805195,-51.84815184815185,-51.74825174825175,-51.64835164835165,-51.548451548451546,-51.44855144855145,-51.34865134865135,-51.24875124875125,-51.14885114885115,-51.04895104895105,-50.94905094905095,-50.84915084915085,-50.74925074925075,-50.64935064935065,-50.54945054945055,-50.44955044955045,-50.34965034965035,-50.24975024975025,-50.14985014985015,-50.04995004995005,-49.95004995004995,-49.85014985014985,-49.75024975024975,-49.65034965034965,-49.55044955044955,-49.45054945054945,-49.35064935064935,-49.25074925074925,-49.15084915084915,-49.05094905094905,-48.95104895104895,-48.85114885114885,-48.75124875124875,-48.65134865134865,-48.55144855144855,-48.451548451548454,-48.35164835164835,-48.25174825174825,-48.15184815184815,-48.05194805194805,-47.952047952047955,-47.85214785214785,-47.752247752247754,-47.65234765234765,-47.55244755244755,-47.45254745254745,-47.35264735264735,-47.252747252747255,-47.15284715284715,-47.052947052947054,-46.95304695304695,-46.85314685314685,-46.753246753246756,-46.65334665334665,-46.553446553446555,-46.45354645354645,-46.353646353646354,-46.25374625374625,-46.15384615384615,-46.053946053946056,-45.95404595404595,-45.854145854145855,-45.75424575424575,-45.654345654345654,-45.55444555444556,-45.45454545454545,-45.354645354645356,-45.25474525474525,-45.154845154845155,-45.05494505494506,-44.955044955044954,-44.85514485514486,-44.75524475524475,-44.655344655344656,-44.55544455544455,-44.455544455544455,-44.35564435564436,-44.255744255744254,-44.15584415584416,-44.05594405594405,-43.956043956043956,-43.85614385614386,-43.756243756243755,-43.65634365634366,-43.556443556443554,-43.45654345654346,-43.35664335664335,-43.256743256743256,-43.15684315684316,-43.056943056943055,-42.95704295704296,-42.857142857142854,-42.75724275724276,-42.65734265734266,-42.557442557442556,-42.45754245754246,-42.357642357642355,-42.25774225774226,-42.15784215784216,-42.05794205794206,-41.95804195804196,-41.858141858141856,-41.75824175824176,-41.658341658341655,-41.55844155844156,-41.45854145854146,-41.35864135864136,-41.25874125874126,-41.158841158841156,-41.05894105894106,-40.95904095904096,-40.85914085914086,-40.75924075924076,-40.65934065934066,-40.55944055944056,-40.45954045954046,-40.35964035964036,-40.25974025974026,-40.15984015984016,-40.05994005994006,-39.96003996003996,-39.86013986013986,-39.76023976023976,-39.66033966033966,-39.56043956043956,-39.46053946053946,-39.36063936063936,-39.260739260739264,-39.16083916083916,-39.06093906093906,-38.96103896103896,-38.86113886113886,-38.76123876123876,-38.66133866133866,-38.561438561438564,-38.46153846153846,-38.36163836163836,-38.26173826173826,-38.16183816183816,-38.061938061938065,-37.96203796203796,-37.862137862137864,-37.76223776223776,-37.66233766233766,-37.562437562437566,-37.46253746253746,-37.362637362637365,-37.26273726273726,-37.162837162837164,-37.06293706293706,-36.96303696303696,-36.863136863136866,-36.76323676323676,-36.663336663336665,-36.56343656343656,-36.463536463536464,-36.36363636363637,-36.26373626373626,-36.163836163836166,-36.06393606393606,-35.964035964035965,-35.86413586413586,-35.764235764235764,-35.66433566433567,-35.56443556443556,-35.464535464535466,-35.36463536463536,-35.264735264735265,-35.16483516483517,-35.064935064935064,-34.96503496503497,-34.86513486513486,-34.765234765234766,-34.66533466533467,-34.565434565434565,-34.46553446553447,-34.365634365634364,-34.26573426573427,-34.16583416583416,-34.065934065934066,-33.96603396603397,-33.866133866133865,-33.76623376623377,-33.666333666333664,-33.56643356643357,-33.46653346653347,-33.366633366633366,-33.26673326673327,-33.166833166833165,-33.06693306693307,-32.967032967032964,-32.86713286713287,-32.76723276723277,-32.667332667332666,-32.56743256743257,-32.467532467532465,-32.36763236763237,-32.26773226773227,-32.16783216783217,-32.06793206793207,-31.96803196803197,-31.86813186813187,-31.768231768231768,-31.668331668331668,-31.568431568431567,-31.46853146853147,-31.36863136863137,-31.26873126873127,-31.16883116883117,-31.068931068931068,-30.969030969030968,-30.86913086913087,-30.76923076923077,-30.66933066933067,-30.56943056943057,-30.46953046953047,-30.369630369630368,-30.26973026973027,-30.16983016983017,-30.06993006993007,-29.97002997002997,-29.87012987012987,-29.77022977022977,-29.67032967032967,-29.57042957042957,-29.47052947052947,-29.37062937062937,-29.27072927072927,-29.170829170829172,-29.070929070929072,-28.97102897102897,-28.87112887112887,-28.77122877122877,-28.67132867132867,-28.571428571428573,-28.471528471528472,-28.371628371628372,-28.27172827172827,-28.17182817182817,-28.07192807192807,-27.972027972027973,-27.872127872127873,-27.772227772227772,-27.672327672327672,-27.57242757242757,-27.47252747252747,-27.372627372627374,-27.272727272727273,-27.172827172827173,-27.072927072927072,-26.973026973026972,-26.873126873126875,-26.773226773226774,-26.673326673326674,-26.573426573426573,-26.473526473526473,-26.373626373626372,-26.273726273726275,-26.173826173826175,-26.073926073926074,-25.974025974025974,-25.874125874125873,-25.774225774225773,-25.674325674325676,-25.574425574425575,-25.474525474525475,-25.374625374625374,-25.274725274725274,-25.174825174825173,-25.074925074925076,-24.975024975024976,-24.875124875124875,-24.775224775224775,-24.675324675324674,-24.575424575424574,-24.475524475524477,-24.375624375624376,-24.275724275724276,-24.175824175824175,-24.075924075924075,-23.976023976023978,-23.876123876123877,-23.776223776223777,-23.676323676323676,-23.576423576423576,-23.476523476523475,-23.376623376623378,-23.276723276723278,-23.176823176823177,-23.076923076923077,-22.977022977022976,-22.877122877122876,-22.77722277722278,-22.677322677322678,-22.577422577422578,-22.477522477522477,-22.377622377622377,-22.277722277722276,-22.17782217782218,-22.07792207792208,-21.978021978021978,-21.878121878121878,-21.778221778221777,-21.678321678321677,-21.57842157842158,-21.47852147852148,-21.37862137862138,-21.278721278721278,-21.178821178821178,-21.07892107892108,-20.97902097902098,-20.87912087912088,-20.77922077922078,-20.67932067932068,-20.579420579420578,-20.47952047952048,-20.37962037962038,-20.27972027972028,-20.17982017982018,-20.07992007992008,-19.98001998001998,-19.88011988011988,-19.78021978021978,-19.68031968031968,-19.58041958041958,-19.48051948051948,-19.38061938061938,-19.280719280719282,-19.18081918081918,-19.08091908091908,-18.98101898101898,-18.88111888111888,-18.781218781218783,-18.681318681318682,-18.581418581418582,-18.48151848151848,-18.38161838161838,-18.28171828171828,-18.181818181818183,-18.081918081918083,-17.982017982017982,-17.882117882117882,-17.78221778221778,-17.68231768231768,-17.582417582417584,-17.482517482517483,-17.382617382617383,-17.282717282717282,-17.182817182817182,-17.08291708291708,-16.983016983016984,-16.883116883116884,-16.783216783216783,-16.683316683316683,-16.583416583416582,-16.483516483516482,-16.383616383616385,-16.283716283716284,-16.183816183816184,-16.083916083916083,-15.984015984015985,-15.884115884115884,-15.784215784215784,-15.684315684315685,-15.584415584415584,-15.484515484515484,-15.384615384615385,-15.284715284715285,-15.184815184815184,-15.084915084915085,-14.985014985014985,-14.885114885114884,-14.785214785214785,-14.685314685314685,-14.585414585414586,-14.485514485514486,-14.385614385614385,-14.285714285714286,-14.185814185814186,-14.085914085914085,-13.986013986013987,-13.886113886113886,-13.786213786213786,-13.686313686313687,-13.586413586413586,-13.486513486513486,-13.386613386613387,-13.286713286713287,-13.186813186813186,-13.086913086913087,-12.987012987012987,-12.887112887112886,-12.787212787212788,-12.687312687312687,-12.587412587412587,-12.487512487512488,-12.387612387612387,-12.287712287712287,-12.187812187812188,-12.087912087912088,-11.988011988011989,-11.888111888111888,-11.788211788211788,-11.688311688311689,-11.588411588411589,-11.488511488511488,-11.38861138861139,-11.288711288711289,-11.188811188811188,-11.08891108891109,-10.989010989010989,-10.889110889110889,-10.78921078921079,-10.68931068931069,-10.589410589410589,-10.48951048951049,-10.38961038961039,-10.289710289710289,-10.18981018981019,-10.08991008991009,-9.99000999000999,-9.89010989010989,-9.79020979020979,-9.69030969030969,-9.59040959040959,-9.49050949050949,-9.390609390609391,-9.290709290709291,-9.19080919080919,-9.090909090909092,-8.991008991008991,-8.89110889110889,-8.791208791208792,-8.691308691308691,-8.591408591408591,-8.491508491508492,-8.391608391608392,-8.291708291708291,-8.191808191808192,-8.091908091908092,-7.992007992007992,-7.892107892107892,-7.792207792207792,-7.6923076923076925,-7.592407592407592,-7.492507492507492,-7.392607392607393,-7.292707292707293,-7.192807192807193,-7.092907092907093,-6.993006993006993,-6.893106893106893,-6.793206793206793,-6.693306693306694,-6.593406593406593,-6.4935064935064934,-6.393606393606394,-6.293706293706293,-6.193806193806194,-6.093906093906094,-5.994005994005994,-5.894105894105894,-5.794205794205794,-5.694305694305695,-5.594405594405594,-5.4945054945054945,-5.394605394605395,-5.294705294705294,-5.194805194805195,-5.094905094905095,-4.995004995004995,-4.895104895104895,-4.795204795204795,-4.695304695304696,-4.595404595404595,-4.495504495504496,-4.395604395604396,-4.2957042957042955,-4.195804195804196,-4.095904095904096,-3.996003996003996,-3.896103896103896,-3.796203796203796,-3.6963036963036964,-3.5964035964035963,-3.4965034965034967,-3.3966033966033966,-3.2967032967032965,-3.196803196803197,-3.096903096903097,-2.997002997002997,-2.897102897102897,-2.797202797202797,-2.6973026973026974,-2.5974025974025974,-2.4975024975024973,-2.3976023976023977,-2.2977022977022976,-2.197802197802198,-2.097902097902098,-1.998001998001998,-1.898101898101898,-1.7982017982017982,-1.6983016983016983,-1.5984015984015985,-1.4985014985014986,-1.3986013986013985,-1.2987012987012987,-1.1988011988011988,-1.098901098901099,-0.999000999000999,-0.8991008991008991,-0.7992007992007992,-0.6993006993006993,-0.5994005994005994,-0.4995004995004995,-0.3996003996003996,-0.2997002997002997,-0.1998001998001998,-0.0999000999000999,0.0,0.0999000999000999,0.1998001998001998,0.2997002997002997,0.3996003996003996,0.4995004995004995,0.5994005994005994,0.6993006993006993,0.7992007992007992,0.8991008991008991,0.999000999000999,1.098901098901099,1.1988011988011988,1.2987012987012987,1.3986013986013985,1.4985014985014986,1.5984015984015985,1.6983016983016983,1.7982017982017982,1.898101898101898,1.998001998001998,2.097902097902098,2.197802197802198,2.2977022977022976,2.3976023976023977,2.4975024975024973,2.5974025974025974,2.6973026973026974,2.797202797202797,2.897102897102897,2.997002997002997,3.096903096903097,3.196803196803197,3.2967032967032965,3.3966033966033966,3.4965034965034967,3.5964035964035963,3.6963036963036964,3.796203796203796,3.896103896103896,3.996003996003996,4.095904095904096,4.195804195804196,4.2957042957042955,4.395604395604396,4.495504495504496,4.595404595404595,4.695304695304696,4.795204795204795,4.895104895104895,4.995004995004995,5.094905094905095,5.194805194805195,5.294705294705294,5.394605394605395,5.4945054945054945,5.594405594405594,5.694305694305695,5.794205794205794,5.894105894105894,5.994005994005994,6.093906093906094,6.193806193806194,6.293706293706293,6.393606393606394,6.4935064935064934,6.593406593406593,6.693306693306694,6.793206793206793,6.893106893106893,6.993006993006993,7.092907092907093,7.192807192807193,7.292707292707293,7.392607392607393,7.492507492507492,7.592407592407592,7.6923076923076925,7.792207792207792,7.892107892107892,7.992007992007992,8.091908091908092,8.191808191808192,8.291708291708291,8.391608391608392,8.491508491508492,8.591408591408591,8.691308691308691,8.791208791208792,8.89110889110889,8.991008991008991,9.090909090909092,9.19080919080919,9.290709290709291,9.390609390609391,9.49050949050949,9.59040959040959,9.69030969030969,9.79020979020979,9.89010989010989,9.99000999000999,10.08991008991009,10.18981018981019,10.289710289710289,10.38961038961039,10.48951048951049,10.589410589410589,10.68931068931069,10.78921078921079,10.889110889110889,10.989010989010989,11.08891108891109,11.188811188811188,11.288711288711289,11.38861138861139,11.488511488511488,11.588411588411589,11.688311688311689,11.788211788211788,11.888111888111888,11.988011988011989,12.087912087912088,12.187812187812188,12.287712287712287,12.387612387612387,12.487512487512488,12.587412587412587,12.687312687312687,12.787212787212788,12.887112887112886,12.987012987012987,13.086913086913087,13.186813186813186,13.286713286713287,13.386613386613387,13.486513486513486,13.586413586413586,13.686313686313687,13.786213786213786,13.886113886113886,13.986013986013987,14.085914085914085,14.185814185814186,14.285714285714286,14.385614385614385,14.485514485514486,14.585414585414586,14.685314685314685,14.785214785214785,14.885114885114884,14.985014985014985,15.084915084915085,15.184815184815184,15.284715284715285,15.384615384615385,15.484515484515484,15.584415584415584,15.684315684315685,15.784215784215784,15.884115884115884,15.984015984015985,16.083916083916083,16.183816183816184,16.283716283716284,16.383616383616385,16.483516483516482,16.583416583416582,16.683316683316683,16.783216783216783,16.883116883116884,16.983016983016984,17.08291708291708,17.182817182817182,17.282717282717282,17.382617382617383,17.482517482517483,17.582417582417584,17.68231768231768,17.78221778221778,17.882117882117882,17.982017982017982,18.081918081918083,18.181818181818183,18.28171828171828,18.38161838161838,18.48151848151848,18.581418581418582,18.681318681318682,18.781218781218783,18.88111888111888,18.98101898101898,19.08091908091908,19.18081918081918,19.280719280719282,19.38061938061938,19.48051948051948,19.58041958041958,19.68031968031968,19.78021978021978,19.88011988011988,19.98001998001998,20.07992007992008,20.17982017982018,20.27972027972028,20.37962037962038,20.47952047952048,20.579420579420578,20.67932067932068,20.77922077922078,20.87912087912088,20.97902097902098,21.07892107892108,21.178821178821178,21.278721278721278,21.37862137862138,21.47852147852148,21.57842157842158,21.678321678321677,21.778221778221777,21.878121878121878,21.978021978021978,22.07792207792208,22.17782217782218,22.277722277722276,22.377622377622377,22.477522477522477,22.577422577422578,22.677322677322678,22.77722277722278,22.877122877122876,22.977022977022976,23.076923076923077,23.176823176823177,23.276723276723278,23.376623376623378,23.476523476523475,23.576423576423576,23.676323676323676,23.776223776223777,23.876123876123877,23.976023976023978,24.075924075924075,24.175824175824175,24.275724275724276,24.375624375624376,24.475524475524477,24.575424575424574,24.675324675324674,24.775224775224775,24.875124875124875,24.975024975024976,25.074925074925076,25.174825174825173,25.274725274725274,25.374625374625374,25.474525474525475,25.574425574425575,25.674325674325676,25.774225774225773,25.874125874125873,25.974025974025974,26.073926073926074,26.173826173826175,26.273726273726275,26.373626373626372,26.473526473526473,26.573426573426573,26.673326673326674,26.773226773226774,26.873126873126875,26.973026973026972,27.072927072927072,27.172827172827173,27.272727272727273,27.372627372627374,27.47252747252747,27.57242757242757,27.672327672327672,27.772227772227772,27.872127872127873,27.972027972027973,28.07192807192807,28.17182817182817,28.27172827172827,28.371628371628372,28.471528471528472,28.571428571428573,28.67132867132867,28.77122877122877,28.87112887112887,28.97102897102897,29.070929070929072,29.170829170829172,29.27072927072927,29.37062937062937,29.47052947052947,29.57042957042957,29.67032967032967,29.77022977022977,29.87012987012987,29.97002997002997,30.06993006993007,30.16983016983017,30.26973026973027,30.369630369630368,30.46953046953047,30.56943056943057,30.66933066933067,30.76923076923077,30.86913086913087,30.969030969030968,31.068931068931068,31.16883116883117,31.26873126873127,31.36863136863137,31.46853146853147,31.568431568431567,31.668331668331668,31.768231768231768,31.86813186813187,31.96803196803197,32.06793206793207,32.16783216783217,32.26773226773227,32.36763236763237,32.467532467532465,32.56743256743257,32.667332667332666,32.76723276723277,32.86713286713287,32.967032967032964,33.06693306693307,33.166833166833165,33.26673326673327,33.366633366633366,33.46653346653347,33.56643356643357,33.666333666333664,33.76623376623377,33.866133866133865,33.96603396603397,34.065934065934066,34.16583416583416,34.26573426573427,34.365634365634364,34.46553446553447,34.565434565434565,34.66533466533467,34.765234765234766,34.86513486513486,34.96503496503497,35.064935064935064,35.16483516483517,35.264735264735265,35.36463536463536,35.464535464535466,35.56443556443556,35.66433566433567,35.764235764235764,35.86413586413586,35.964035964035965,36.06393606393606,36.163836163836166,36.26373626373626,36.36363636363637,36.463536463536464,36.56343656343656,36.663336663336665,36.76323676323676,36.863136863136866,36.96303696303696,37.06293706293706,37.162837162837164,37.26273726273726,37.362637362637365,37.46253746253746,37.562437562437566,37.66233766233766,37.76223776223776,37.862137862137864,37.96203796203796,38.061938061938065,38.16183816183816,38.26173826173826,38.36163836163836,38.46153846153846,38.561438561438564,38.66133866133866,38.76123876123876,38.86113886113886,38.96103896103896,39.06093906093906,39.16083916083916,39.260739260739264,39.36063936063936,39.46053946053946,39.56043956043956,39.66033966033966,39.76023976023976,39.86013986013986,39.96003996003996,40.05994005994006,40.15984015984016,40.25974025974026,40.35964035964036,40.45954045954046,40.55944055944056,40.65934065934066,40.75924075924076,40.85914085914086,40.95904095904096,41.05894105894106,41.158841158841156,41.25874125874126,41.35864135864136,41.45854145854146,41.55844155844156,41.658341658341655,41.75824175824176,41.858141858141856,41.95804195804196,42.05794205794206,42.15784215784216,42.25774225774226,42.357642357642355,42.45754245754246,42.557442557442556,42.65734265734266,42.75724275724276,42.857142857142854,42.95704295704296,43.056943056943055,43.15684315684316,43.256743256743256,43.35664335664335,43.45654345654346,43.556443556443554,43.65634365634366,43.756243756243755,43.85614385614386,43.956043956043956,44.05594405594405,44.15584415584416,44.255744255744254,44.35564435564436,44.455544455544455,44.55544455544455,44.655344655344656,44.75524475524475,44.85514485514486,44.955044955044954,45.05494505494506,45.154845154845155,45.25474525474525,45.354645354645356,45.45454545454545,45.55444555444556,45.654345654345654,45.75424575424575,45.854145854145855,45.95404595404595,46.053946053946056,46.15384615384615,46.25374625374625,46.353646353646354,46.45354645354645,46.553446553446555,46.65334665334665,46.753246753246756,46.85314685314685,46.95304695304695,47.052947052947054,47.15284715284715,47.252747252747255,47.35264735264735,47.45254745254745,47.55244755244755,47.65234765234765,47.752247752247754,47.85214785214785,47.952047952047955,48.05194805194805,48.15184815184815,48.25174825174825,48.35164835164835,48.451548451548454,48.55144855144855,48.65134865134865,48.75124875124875,48.85114885114885,48.95104895104895,49.05094905094905,49.15084915084915,49.25074925074925,49.35064935064935,49.45054945054945,49.55044955044955,49.65034965034965,49.75024975024975,49.85014985014985,49.95004995004995,50.04995004995005,50.14985014985015,50.24975024975025,50.34965034965035,50.44955044955045,50.54945054945055,50.64935064935065,50.74925074925075,50.84915084915085,50.94905094905095,51.04895104895105,51.14885114885115,51.24875124875125,51.34865134865135,51.44855144855145,51.548451548451546,51.64835164835165,51.74825174825175,51.84815184815185,51.94805194805195,52.047952047952045,52.14785214785215,52.247752247752246,52.34765234765235,52.44755244755245,52.54745254745255,52.64735264735265,52.747252747252745,52.84715284715285,52.947052947052946,53.04695304695305,53.14685314685315,53.246753246753244,53.34665334665335,53.446553446553445,53.54645354645355,53.646353646353646,53.74625374625375,53.84615384615385,53.946053946053944,54.04595404595405,54.145854145854145,54.24575424575425,54.345654345654346,54.44555444555444,54.54545454545455,54.645354645354644,54.74525474525475,54.845154845154845,54.94505494505494,55.044955044955046,55.14485514485514,55.24475524475525,55.344655344655344,55.44455544455545,55.544455544455545,55.64435564435564,55.744255744255746,55.84415584415584,55.94405594405595,56.043956043956044,56.14385614385614,56.243756243756245,56.34365634365634,56.443556443556446,56.54345654345654,56.64335664335665,56.743256743256744,56.84315684315684,56.943056943056945,57.04295704295704,57.142857142857146,57.24275724275724,57.34265734265734,57.442557442557444,57.54245754245754,57.642357642357645,57.74225774225774,57.84215784215784,57.94205794205794,58.04195804195804,58.141858141858144,58.24175824175824,58.341658341658345,58.44155844155844,58.54145854145854,58.64135864135864,58.74125874125874,58.841158841158844,58.94105894105894,59.04095904095904,59.14085914085914,59.24075924075924,59.34065934065934,59.44055944055944,59.54045954045954,59.64035964035964,59.74025974025974,59.84015984015984,59.94005994005994,60.03996003996004,60.13986013986014,60.23976023976024,60.33966033966034,60.43956043956044,60.53946053946054,60.63936063936064,60.739260739260736,60.83916083916084,60.93906093906094,61.03896103896104,61.13886113886114,61.23876123876124,61.33866133866134,61.438561438561436,61.53846153846154,61.63836163836164,61.73826173826174,61.83816183816184,61.938061938061935,62.03796203796204,62.137862137862136,62.23776223776224,62.33766233766234,62.437562437562434,62.53746253746254,62.637362637362635,62.73726273726274,62.837162837162836,62.93706293706294,63.03696303696304,63.136863136863134,63.23676323676324,63.336663336663335,63.43656343656344,63.536463536463536,63.63636363636363,63.73626373626374,63.836163836163834,63.93606393606394,64.03596403596404,64.13586413586414,64.23576423576424,64.33566433566433,64.43556443556443,64.53546453546454,64.63536463536464,64.73526473526474,64.83516483516483,64.93506493506493,65.03496503496504,65.13486513486514,65.23476523476523,65.33466533466533,65.43456543456543,65.53446553446554,65.63436563436564,65.73426573426573,65.83416583416583,65.93406593406593,66.03396603396604,66.13386613386614,66.23376623376623,66.33366633366633,66.43356643356644,66.53346653346654,66.63336663336663,66.73326673326673,66.83316683316683,66.93306693306694,67.03296703296704,67.13286713286713,67.23276723276723,67.33266733266733,67.43256743256744,67.53246753246754,67.63236763236763,67.73226773226773,67.83216783216783,67.93206793206794,68.03196803196803,68.13186813186813,68.23176823176823,68.33166833166833,68.43156843156844,68.53146853146853,68.63136863136863,68.73126873126873,68.83116883116882,68.93106893106894,69.03096903096903,69.13086913086913,69.23076923076923,69.33066933066934,69.43056943056943,69.53046953046953,69.63036963036963,69.73026973026973,69.83016983016984,69.93006993006993,70.02997002997003,70.12987012987013,70.22977022977022,70.32967032967034,70.42957042957043,70.52947052947053,70.62937062937063,70.72927072927072,70.82917082917083,70.92907092907093,71.02897102897103,71.12887112887113,71.22877122877122,71.32867132867133,71.42857142857143,71.52847152847153,71.62837162837162,71.72827172827172,71.82817182817183,71.92807192807193,72.02797202797203,72.12787212787212,72.22777222777223,72.32767232767233,72.42757242757243,72.52747252747253,72.62737262737262,72.72727272727273,72.82717282717283,72.92707292707293,73.02697302697302,73.12687312687312,73.22677322677323,73.32667332667333,73.42657342657343,73.52647352647352,73.62637362637362,73.72627372627373,73.82617382617383,73.92607392607393,74.02597402597402,74.12587412587412,74.22577422577423,74.32567432567433,74.42557442557442,74.52547452547452,74.62537462537462,74.72527472527473,74.82517482517483,74.92507492507492,75.02497502497502,75.12487512487513,75.22477522477523,75.32467532467533,75.42457542457542,75.52447552447552,75.62437562437563,75.72427572427573,75.82417582417582,75.92407592407592,76.02397602397602,76.12387612387613,76.22377622377623,76.32367632367632,76.42357642357642,76.52347652347652,76.62337662337663,76.72327672327673,76.82317682317682,76.92307692307692,77.02297702297702,77.12287712287713,77.22277722277722,77.32267732267732,77.42257742257742,77.52247752247752,77.62237762237763,77.72227772227772,77.82217782217782,77.92207792207792,78.02197802197803,78.12187812187813,78.22177822177822,78.32167832167832,78.42157842157842,78.52147852147853,78.62137862137862,78.72127872127872,78.82117882117882,78.92107892107892,79.02097902097903,79.12087912087912,79.22077922077922,79.32067932067932,79.42057942057941,79.52047952047953,79.62037962037962,79.72027972027972,79.82017982017982,79.92007992007991,80.01998001998003,80.11988011988012,80.21978021978022,80.31968031968032,80.41958041958041,80.51948051948052,80.61938061938062,80.71928071928072,80.81918081918081,80.91908091908093,81.01898101898102,81.11888111888112,81.21878121878122,81.31868131868131,81.41858141858143,81.51848151848152,81.61838161838162,81.71828171828172,81.81818181818181,81.91808191808192,82.01798201798202,82.11788211788212,82.21778221778222,82.31768231768231,82.41758241758242,82.51748251748252,82.61738261738262,82.71728271728271,82.81718281718281,82.91708291708292,83.01698301698302,83.11688311688312,83.21678321678321,83.31668331668331,83.41658341658342,83.51648351648352,83.61638361638362,83.71628371628371,83.81618381618381,83.91608391608392,84.01598401598402,84.11588411588411,84.21578421578421,84.31568431568432,84.41558441558442,84.51548451548452,84.61538461538461,84.71528471528471,84.81518481518482,84.91508491508492,85.01498501498502,85.11488511488511,85.21478521478521,85.31468531468532,85.41458541458542,85.51448551448551,85.61438561438561,85.71428571428571,85.81418581418582,85.91408591408592,86.01398601398601,86.11388611388611,86.21378621378621,86.31368631368632,86.41358641358642,86.51348651348651,86.61338661338661,86.7132867132867,86.81318681318682,86.91308691308691,87.01298701298701,87.11288711288711,87.21278721278722,87.31268731268732,87.41258741258741,87.51248751248751,87.61238761238761,87.71228771228772,87.81218781218782,87.91208791208791,88.01198801198801,88.1118881118881,88.21178821178822,88.31168831168831,88.41158841158841,88.51148851148851,88.6113886113886,88.71128871128872,88.81118881118881,88.91108891108891,89.01098901098901,89.1108891108891,89.21078921078922,89.31068931068931,89.41058941058941,89.5104895104895,89.6103896103896,89.71028971028971,89.81018981018981,89.91008991008991,90.00999000999,90.10989010989012,90.20979020979021,90.30969030969031,90.40959040959041,90.5094905094905,90.60939060939062,90.70929070929071,90.80919080919081,90.9090909090909,91.008991008991,91.10889110889111,91.20879120879121,91.30869130869131,91.4085914085914,91.5084915084915,91.60839160839161,91.70829170829171,91.80819180819181,91.9080919080919,92.007992007992,92.10789210789211,92.20779220779221,92.3076923076923,92.4075924075924,92.5074925074925,92.60739260739261,92.70729270729271,92.8071928071928,92.9070929070929,93.00699300699301,93.10689310689311,93.20679320679321,93.3066933066933,93.4065934065934,93.50649350649351,93.60639360639361,93.7062937062937,93.8061938061938,93.9060939060939,94.00599400599401,94.10589410589411,94.2057942057942,94.3056943056943,94.4055944055944,94.50549450549451,94.60539460539461,94.7052947052947,94.8051948051948,94.9050949050949,95.00499500499501,95.1048951048951,95.2047952047952,95.3046953046953,95.4045954045954,95.50449550449551,95.6043956043956,95.7042957042957,95.8041958041958,95.90409590409591,96.00399600399601,96.1038961038961,96.2037962037962,96.3036963036963,96.40359640359641,96.5034965034965,96.6033966033966,96.7032967032967,96.8031968031968,96.90309690309691,97.002997002997,97.1028971028971,97.2027972027972,97.3026973026973,97.40259740259741,97.5024975024975,97.6023976023976,97.7022977022977,97.8021978021978,97.9020979020979,98.001998001998,98.1018981018981,98.2017982017982,98.3016983016983,98.4015984015984,98.5014985014985,98.6013986013986,98.7012987012987,98.80119880119881,98.9010989010989,99.000999000999,99.1008991008991,99.2007992007992,99.3006993006993,99.4005994005994,99.5004995004995,99.6003996003996,99.7002997002997,99.8001998001998,99.9000999000999,100.0]}
},{}],67:[function(require,module,exports){
module.exports={"expected":[1.3440585709080678e43,1.8219176949296494e43,2.469672199519686e43,3.347725745270745e43,4.537957574988376e43,6.151357822989538e43,8.338377439888467e43,1.130295787219387e44,1.5321548776316851e44,2.0768887185057587e44,2.8152942055857936e44,3.816228280977572e44,5.173028901788584e44,7.01221888431807e44,9.50530426469992e44,1.2884767383200457e45,1.7465746060936337e45,2.3675420470752883e45,3.2092848053059515e45,4.350296111653381e45,5.896976244606729e45,7.993554447088012e45,1.0835538426494194e46,1.4687945615333038e46,1.9910016273070862e46,2.698871294703883e46,3.658413014573174e46,4.959104871529954e46,6.72223749173976e46,9.112224497363724e46,1.235193421719859e47,1.6743472348617387e47,2.269635357178035e47,3.0765689143196367e47,4.170395149433499e47,5.653114292830453e47,7.662991170547722e47,1.0387448517424544e48,1.4080544307143133e48,1.9086662875184842e48,2.5872629052142033e48,3.507123997773507e48,4.754027397436248e48,6.444247910801803e48,8.735400043817208e48,1.1841135689025256e49,1.6051067346955457e49,2.1757774739064034e49,2.949341320193515e49,3.997933762676237e49,5.419336941883037e49,7.346097917839907e49,9.957888796584171e49,1.3498261307452798e50,1.8297358209781908e50,2.4802699387085055e50,3.3620913458274074e50,4.557430641429812e50,6.177754235387032e50,8.374158686234988e50,1.1351460584260441e51,1.5387295873414093e51,2.085800964012381e51,2.8273750613918778e51,3.832604297201424e51,5.195227155924514e51,7.042309382516827e51,9.546092971609116e51,1.294005788056376e52,1.754069423483916e52,2.3777015302400705e52,3.223056334724264e52,4.3689638942014284e52,5.922281066945244e52,8.02785600550469e52,1.0882035370597599e53,1.4750973824858842e53,1.9995453182369268e53,2.71045256208468e53,3.6741118214760086e53,4.980385145101837e53,6.75108363565984e53,9.151326439180997e53,1.240493824637186e54,1.681532113612059e54,2.2793747078391686e54,3.08977093965597e54,4.188290949579206e54,5.6773726664283154e54,7.695874231646988e54,1.0432022639547458e55,1.4140966065234445e55,1.9168566649773288e55,2.598365244013539e55,3.5221736004854e55,4.7744276523625216e55,6.471901159131704e55,8.772884974567406e55,1.1891947803991818e56,1.6119944919241712e56,2.1851140661091783e56,2.9619973925646977e56,4.015089504770026e56,5.442592141296858e56,7.3776211417738115e56,1.00006196125841e57,1.3556184400593342e57,1.837587495795172e57,2.4909131544087517e57,3.3765185913619014e57,4.5769872697622695e57,6.204263918806641e57,8.410093475353989e57,1.1400171428844413e58,1.5453325101309156e58,2.0947514533205426e58,2.839507757988386e58,3.8490505854026374e58,5.217520666146734e58,7.072529003621766e58,9.587056709065993e58,1.2995585637864515e59,1.7615964022759925e59,2.387904609292961e59,3.2368869598708524e59,4.387711783044783e59,5.947694476126748e59,8.062304757127792e59,1.0928731840162885e60,1.4814272498021977e60,2.0081256714445392e60,2.7220835264459533e60,3.689877994347965e60,5.001756735565513e60,6.78005356277275e60,9.190596173380284e60,1.2458169723899133e61,1.6887478237703587e61,2.2891558515359108e61,3.103029616891773e61,4.20626354332639e61,5.701735136398396e61,7.728898398964744e61,1.0476788036010864e62,1.4201647102283389e62,1.9250821885920541e62,2.6095152246380103e62,3.5372877833324485e62,4.794915447886816e62,6.4996730717579485e62,8.81053075885909e62,1.1942977961475345e63,1.6189118055670933e63,2.1944907230497337e63,2.9747077740681917e63,4.032318864763524e63,5.465947132309833e63,7.409279636658236e63,1.0043533793017328e64,1.3614356050540022e64,1.8454728633435152e64,2.5016020417670195e64,3.3910077464021105e64,4.596627818562666e64,6.230887359311466e64,8.446182466120631e64,1.1449091299074407e65,1.5519637670668e65,2.1037403505401556e65,2.8516925178321187e65,3.865567447128958e65,5.239909841213235e65,7.10287830171913e65,9.628196228153264e65,1.3051351673220295e66,1.7691556804793818e66,2.3981514713105486e66,3.2507769343342488e66,4.406540121931869e66,5.973216938113906e66,8.096901333585883e66,1.0975628691384477e67,1.4877842795423063e67,2.0167428442533647e67,2.733764401045085e67,3.705711822266665e67,5.023220034775801e67,6.809147804250913e67,9.230034419984232e67,1.2511629625796253e68,1.6959944976388767e68,2.2989789676085366e68,3.1163451891290553e68,4.224313260208019e68,5.7262021494340655e68,7.762064278009467e68,1.0521745527601914e69,1.4262588530895016e69,1.933343009180218e69,2.620713051525902e69,3.5524668234377384e69,4.81549115965909e69,6.527564157886994e69,8.848338086939032e69,1.1994227097129287e70,1.6258588024553825e70,2.203907616651893e70,2.987472697752705e70,4.0496221585623427e70,5.48940234314274e70,7.441073982961307e70,1.0086632124728535e71,1.3672777323887527e71,1.8533920682038313e71,2.512336796767343e71,3.405559076611336e71,4.616352647946434e71,6.257625045050471e71,8.482426320238126e71,1.1498221091911115e72,1.5586234797351957e72,2.1127678204855315e72,2.8639295643343513e72,3.882155185222122e72,5.26239509163679e72,7.133357833272521e72,9.669512283176649e72,1.3107357009119412e73,1.7767473966957477e73,2.4084423041721975e73,3.2647265127916324e73,4.425449256086005e73,5.998848920868902e73,8.131646369217706e73,1.10227267841304e74,1.494168588264261e74,2.0253969946618857e74,2.7454954000544623e74,3.721613595550105e74,5.044775436268816e74,6.838366893546184e74,9.269641902104943e74,1.2565318932266775e75,1.7032722680876045e75,2.308844236166831e75,3.1297179005128798e75,4.242440431171199e75,5.7507741541453625e75,7.79537247688763e75,1.0566895938630029e76,1.4323791468449957e76,1.9416392782064767e76,2.6319589299928094e76,3.567710999113836e76,4.8361551649413406e76,6.555574928910475e76,8.886307652016707e76,1.2045696150622294e77,1.6328356099643617e77,2.2133649195774185e77,3.000292397667036e77,4.0669997034276886e77,5.512958203854388e77,7.473004763642133e77,1.0129915397938878e78,1.3731449291808624e78,1.861345255577174e78,2.523117616234753e78,3.420172848792593e78,4.636162119574381e78,6.28447746626716e78,8.518825702248436e78,1.1547561708164381e79,1.5653117702439366e79,2.121834028678046e79,2.876219121865091e79,3.898814103823292e79,5.284976829691225e79,7.163968157133518e79,9.71100563167844e79,1.316360267243654e80,1.784371690121539e80,2.4187772965634206e80,3.2787359510127186e80,4.444439532211975e80,6.024590894361842e80,8.166540501084165e80,1.1070026981958651e81,1.5005802930264085e81,2.034088281346609e81,2.7572767385655557e81,3.7375836057623944e81,5.066423335269466e81,6.867711366399544e81,9.309419345958299e81,1.2619238627720625e82,1.7105812685567e82,2.3187518380936556e82,3.143147996236019e82,4.260645388583178e82,5.77545160106787e82,7.828823606315292e82,1.061224009694187e83,1.438525703712247e83,1.9499711477854721e83,2.6432530662352955e83,3.5830205898672855e83,4.856907842614454e83,6.583705898414298e83,8.92444015027551e83,1.2097386065655274e84,1.6398423560158932e84,2.2228628052288033e84,3.0131671088643205e84,4.084451817982071e84,5.536615146348565e84,7.505072564161389e84,1.0173384406260177e85,1.3790373030071489e85,1.8693325712876786e85,2.533944697838815e85,3.434849330893884e85,4.656056596659256e85,6.311445115309283e85,8.555381279545415e85,1.1597114052509566e86,1.5720287612249729e86,2.130939141349412e86,2.8885614157571514e86,3.91554450837908e86,5.307655469419648e86,7.194709834551812e86,9.752677034452477e86,1.3220089694453197e87,1.792028700550519e87,2.4291566379796166e87,3.292805505864861e87,4.463511298502327e87,6.050443330580063e87,8.201584368979889e87,1.111753015213258e88,1.5070195113892837e88,2.0428168636649465e88,2.7691086325927475e88,3.753622145718471e88,5.088164128698633e88,6.897181760850721e88,9.349367480875691e88,1.2673389700791988e89,1.7179216330588835e89,2.3287019550478706e89,3.1566357225434046e89,4.2789284662373225e89,5.800234942669996e89,7.862418279629189e89,1.0657778833936203e90,1.4446986363902646e90,1.9583387706845925e90,2.654595667334968e90,3.5983958764041364e90,4.877749573185151e90,6.611957582188803e90,8.96273628088651e90,1.2149297789978702e91,1.6468791690809118e91,2.232401447752699e91,3.026097067406345e91,4.1019788222156025e91,5.560373604382581e91,7.53727797249205e91,1.0217039946710637e92,1.3849549619060965e92,1.8773541617852315e92,2.5448182400975403e92,3.449588792013017e92,4.676036443972409e92,6.338528486636792e92,8.592093722386804e92,1.1646879033503798e93,1.5787745758363538e93,2.1400833254446675e93,2.9009566723102004e93,3.932346705646484e93,5.330431426641885e93,7.225583429185297e93,9.79452725555646e93,1.3276819110876286e94,1.799718568376275e94,2.4395805187291305e94,3.3069354353176717e94,4.482664904643627e94,6.076406703535755e94,8.236778615444962e94,1.1165237165638034e95,1.5134863614179333e95,2.0515829016581368e95,2.780991299077608e95,3.7697295094898945e95,5.109998215180443e95,6.926778617248843e95,9.389487039318448e95,1.2727773144357426e96,1.7252934961820907e96,2.338694769467927e96,3.1701813267366426e96,4.297289999359722e96,5.825124633361924e96,7.896157112797979e96,1.0703512984580374e97,1.450898058061665e97,1.966742300326775e97,2.665986941261828e97,3.613837140634992e97,4.898680738792828e97,6.640330498237109e97,9.001196746021031e97,1.2201432275409646e98,1.6539461781815007e98,2.2419810220430464e98,3.039082510367785e98,4.1195810374911763e98,5.584234013575064e98,7.569621579129957e98,1.0260882819727716e99,1.3908980143797998e99,1.8854101741481063e99,2.555738442380596e99,3.464391502402542e99,4.696102027850345e99,6.365728076831623e99,8.628963703906521e99,1.1696857563603956e100,1.5855493377646624e100,2.149266748625238e100,2.9134051187952404e100,3.949221003698954e100,5.3533051189621095e100,7.25658950711123e100,9.836557062327053e100,1.333379196185709e101,1.8074414345949983e101,2.450049129937019e101,3.321125998447748e101,4.501900701823384e101,6.102481489275338e101,8.272123885776708e101,1.121314889719745e102,1.5199809616840397e102,2.0603865560541212e102,2.7929249558923997e102,3.785905992410127e102,5.131925995049434e102,6.956502478261174e102,9.429778756891e102,1.2782389955553724e103,1.7326969930916486e103,2.3487304645751485e103,3.183785057178457e103,4.315730324614606e103,5.8501211295037805e103,7.930040724433309e103,1.0749443387423782e104,1.45712408239475e104,1.9751818907932612e104,2.677427096878383e104,3.629344665680176e104,4.919701723217112e104,6.668825166785348e104,9.039822250863515e104,1.2253790477850608e105,1.6610435128934436e105,2.2516017037442838e105,3.0521236758408997e105,4.1372587865508185e105,5.608196811413947e105,7.602103977105505e105,1.030491382918396e106,1.3968665693959511e106,1.8935007560858715e106,2.566705504913246e106,3.479257733474701e106,4.716253716201977e106,6.393044384606619e106,8.665991900126761e106,1.1747050559181412e107,1.5923531712272405e107,2.1584895792719475e107,2.92590698345828e107,3.9661677119319284e107,5.3762769657763456e107,7.28772863683537e107,9.878767225393676e107,1.3391009292009956e108,1.815197440807763e108,2.4605626635484847e108,3.3353774554433303e108,4.521219042735723e108,6.12866816588802e108,8.307620828041282e108,1.1261266225287147e109,1.526503431268094e109,2.069227988270725e109,2.8049098218443862e109,3.802151891079954e109,5.15394787035848e109,6.986353888883836e109,9.470243372354366e109,1.2837241135797621e110,1.7401322595329478e110,2.358809224377087e110,3.197447163297606e110,4.3342497801110046e110,5.875224889414001e110,7.964069735802285e110,1.0795570884614475e111,1.4633768235455473e111,1.9836576968267044e111,2.6889163439434015e111,3.644918735874821e111,4.940812911884216e111,6.697442110292025e111,9.078613503624207e111,1.230637335730532e112,1.6681713033485521e112,2.261263669254502e112,3.0652208029394663e112,4.1550123935214885e112,5.6322624372643315e112,7.634725761993444e112,1.0349133782401457e113,1.4028607363898012e113,1.9016260559418335e113,2.5777196287799514e113,3.4941877578063095e113,4.7364918785147035e113,6.420477910814677e113,8.70317898997137e113,1.1797458940539827e114,1.5991862009744655e114,2.167751986488352e114,2.938462495524765e114,3.98318714106851e114,5.399347388280768e114,7.31900138930302e114,9.921158518692635e114,1.3448472150432968e115,1.8229867292232745e115,2.471121312332397e115,3.3496900676094504e115,4.54062028158823e115,6.154967213514563e115,8.343270093086498e115,1.1309590032152799e116,1.5330538897615804e116,2.078107360418266e116,2.8169461166796873e116,3.818467503372918e116,5.1760642448852836e116,7.016333396451414e116,9.510881627639708e116,1.2892327690802e117,1.747599431833833e117,2.3689312336709015e117,3.211167895592913e117,4.3528487054087e117,5.900436373377738e117,7.998244770836384e117,1.0841896321913977e118,1.4696563961601111e118,1.9921698738333865e118,2.7004548931156817e118,3.660559636774601e118,4.962014691873848e118,6.726181853457396e118,9.117571215553416e118,1.2359181877895983e119,1.6753296802370074e119,2.2709670957290004e119,3.0783741318030725e119,4.1728421839209076e119,5.656431332377341e119,7.667487531923573e119,1.039354349016634e120,1.408880625266363e120,1.9097862226956996e120,2.588781015927984e120,3.509181849144248e120,4.7568168858610456e120,6.448029158457743e120,8.740525655277069e120,1.1848083631933369e121,1.6060485522919908e121,2.1770541401035346e121,2.9510718852041188e121,4.000279603165048e121,5.422516809478663e121,7.350408337910328e121,9.96373171948104e121,1.3506181590725301e122,1.8308094426606842e122,2.4817252698847547e122,3.3640640973722514e122,4.560104774108968e122,6.18137911435591e122,8.379072334552587e122,1.1358121203827215e123,1.5396324572691243e123,2.0870248353028203e123,2.829034061087708e123,3.8348531284406755e123,5.19827552414022e123,7.046441550647992e123,9.551694267861648e123,1.2947650630595397e124,1.7550986469073522e124,2.3790966780466743e124,3.2249475056381284e124,4.371527441525074e124,5.925756043655128e124,8.0325664561458205e124,1.0888420548714343e125,1.4759629153761684e125,2.0007185778868013e125,2.712042955958298e125,3.676267655159823e125,4.983307451927438e125,6.75504492323406e125,9.156696100951727e125,1.2412217007883746e126,1.682518774809992e126,2.2807121610828265e126,3.0915839036022185e126,4.1907484846641146e126,5.680703939896453e126,7.70038988759344e126,1.0438143766745134e127,1.414926346401989e127,1.917981405966742e127,2.5998898691714956e127,3.524240282409391e127,4.777229110906525e127,6.47569863269696e127,8.778032580805695e127,1.1898925561579965e128,1.612940351003274e128,2.1863962106751545e128,2.9637353836930396e128,4.0174454116174266e128,5.4457856541880255e128,7.381950058512515e128,1.0006487608352451e129,1.3564138671006118e129,1.8386657245516393e129,2.4923747306325897e129,3.3784998082836985e129,4.579672877551577e129,6.207904352682905e129,8.415028208883932e129,1.1406860630143051e130,1.5462392544109132e130,2.0959805764288516e130,2.8411738767043e130,3.851309066719024e130,5.220582115374363e130,7.076678903515025e130,9.5926820413333e130,1.3003210969542024e131,1.7626300422537182e131,2.3893057438911534e131,3.2387862460869117e131,4.390286330939995e131,5.951184364490608e131,8.067035421029702e131,1.0935144418050328e132,1.482296496825854e132,2.009303965730178e132,2.723680744941636e132,3.6920430790422486e132,5.0046915824545687e132,6.784031848834501e132,9.195988877186449e132,1.246547971968472e133,1.689738718881572e133,2.290499043994876e133,3.1048503605423045e133,4.2087316240681623e133,5.705080704867703e133,7.733433432278286e133,1.0482935429896427e134,1.4209980106469136e134,1.9262117560162734e134,2.61104639219443e134,3.539363333702938e134,4.797728927915833e134,6.503486840859904e134,8.815700454258747e134,1.1949985661683365e135,1.6198617234713785e135,2.195778369493069e135,2.9764532231809996e135,4.034684881165564e135,5.4691543490505794e135,7.413627129437556e135,1.0049426969248099e136,1.362234445393706e136,1.8465557189436903e136,2.5030698898367537e136,3.3929974650271775e136,4.599324950703765e136,6.234543414843238e136,8.45113837534301e136,1.145580920475396e137,1.5528744023244274e137,2.1049747480027433e137,2.8533657861170376e137,3.86783561993221e137,5.242984427585323e137,7.107046009464473e137,9.633845699576996e137,1.3059009726356285e138,1.770193755963579e138,2.3995586183904282e138,3.252684370676453e138,4.409125717603964e138,5.976721802119582e138,8.101652297486175e138,1.0982068786619675e139,1.4886572566371618e139,2.0179261947790127e139,2.735368473448441e139,3.707886197668703e139,5.026167475539275e139,6.813143161743678e139,9.235450264703235e139,1.2518970989885676e140,1.6969896448318333e140,2.3003279239107862e140,3.1181737458675427e140,4.2267919318599135e140,5.729562074246893e140,7.76661877184078e140,1.0527919300890315e141,1.427095729327047e141,1.9344774237500726e141,2.6222507895553598e141,3.5545512803108816e141,4.8183167127588685e141,6.531394292452649e141,8.853529966288763e141,1.2001264868444839e142,1.6268127966019793e142,2.2052007885821677e142,2.989225636853155e142,4.0519983279006564e142,5.492623322538836e142,7.445440131493439e142,1.009255058947492e143,1.3680800006739817e143,1.8544795705020991e143,2.5138109435964176e143,3.4075573334218716e143,4.61906135389181e143,6.261296789272651e143,8.487403496021301e143,1.1504967825145795e144,1.55953802266723e144,2.114007514935515e144,2.865610012868001e144,3.884433091099883e144,5.265482871526973e144,7.137543425285748e144,9.6751859973416e144,1.3115047924127018e145,1.7777899267197488e145,2.409855489534237e145,3.266642134233506e145,4.4280459469424225e145,6.002368824779148e145,8.136417720227223e145,1.102919451479385e146,1.4950453114366612e146,2.026585423124753e146,2.747106355776495e146,3.7237973015278414e146,5.047735524949227e146,6.842379395725682e146,9.2750809870377e146,1.257269179926691e147,1.7042716856085375e147,2.3101989810458284e147,3.131554303866651e147,4.2449297391801806e147,5.754148496906802e147,7.799946514745197e147,1.05730962045187e148,1.4332196142457733e148,1.9427785607219163e148,2.6335032666900564e148,3.5698044007084874e148,4.8389928429195385e148,6.55942149916615e148,8.891521810510462e148,1.2052764122085756e149,1.6337936978449528e149,2.21466364070515e149,3.002052858895975e149,4.069386069270302e149,5.5161930049630145e149,7.477389647982173e149,1.013585925971832e150,1.3739506401213362e150,1.862437424513329e150,2.5245980888522462e150,3.422179680427056e150,4.638882448989252e150,6.28816496650284e150,8.523824235849973e150,1.155433739265827e151,1.5662302376189364e151,2.1230790428454836e151,2.8779067814591744e151,3.901101784541998e151,5.288077859714599e151,7.168171710158741e151,9.716703692614725e151,1.3171326590330303e152,1.7854186938004518e152,2.420196546119014e152,3.2806597926775826e152,4.447047365863838e152,6.028125902715692e152,8.171332326686631e152,1.1076522466638183e153,1.5014607783513848e153,2.035281809536782e153,2.758894607143633e153,3.739776682354856e153,5.069396126140663e153,6.871741086836232e153,9.314881770832368e153,1.262664313281454e154,1.7115849747302363e154,2.3201123963891304e154,3.1449922798759156e154,4.2631453785914737e154,5.778840423647697e154,7.833417272065061e154,1.0618466969114588e155,1.4393697776865663e155,1.951115319135481e155,2.6448040299162936e155,3.585122974566809e155,4.859757697500494e155,6.587568974888226e155,8.929676683516991e155,1.2104484366859392e156,1.6408045551973607e156,2.224167099366568e156,3.0149351245001763e156,4.0868484240836196e156,5.539863828481108e156,7.509476264707115e156,1.0179353774054922e157,1.379846471375903e157,1.8704294268868676e157,2.535431523389576e157,3.436864774148344e157,4.6587885994214346e157,6.315148439169378e157,8.560401262615447e157,1.1603918812496266e158,1.5729511698831864e158,2.1321894980621416e158,2.8902563173552615e158,3.917842005883728e158,5.310769806434849e158,7.198931425662876e158,9.75839954663497e158,1.3227846756854275e159,1.793080197081579e159,2.430581977750934e159,3.2947376030271314e159,4.46613032276532e159,6.0539935081924675e159,8.206396757035363e159,1.1124053509925844e160,1.5079037750107193e160,2.0440155134662465e160,2.7707334436912232e160,3.755824633136179e160,5.0911496762679365e160,6.90122877343135e160,9.354853345845782e160,1.2680825979744277e161,1.71892964628843e161,2.3300683517059447e161,3.158487920284933e161,4.281439184083381e161,5.803638307202985e161,7.86703165749743e161,1.066403242656549e162,1.445546332414399e162,1.959487851847904e162,2.6561532864371885e162,3.600507282756198e162,4.880611657231998e162,6.615837235711869e162,8.967995284888657e162,1.2156426551073006e163,1.6478454972055204e163,2.233711338815004e163,3.027872669866226e163,4.104385712518713e163,5.5636362271043105e163,7.541700569986661e163,1.0223034929971168e164,1.3857676025394032e164,1.878455724158639e164,2.546311445843045e164,3.4516128838410506e164,4.678780170174003e164,6.342247702023242e164,8.597135246967776e164,1.1653712993751e165,1.5797009426905165e165,2.141339047628243e165,2.902658846988961e165,3.934654062062619e165,5.333559127750938e165,7.229823135786168e165,9.800274323909734e165,1.328460946001205e166,1.8007745770389436e166,2.441011974850353e166,3.3088758234027555e166,4.485295167538239e166,6.079972115500656e166,8.241611654189593e166,1.1171788516151854e167,1.5143744195491596e167,2.0527866950480601e167,2.782623082487656e167,3.771941448116345e167,5.112996574188496e167,6.930842996176046e167,9.394996444970111e167,1.2735241333513829e168,1.7263058349497336e168,2.3400670295420363e168,3.1720414725405973e168,4.299811491077962e168,5.828542602250139e168,7.900790287372841e168,1.0709793412326864e169,1.4517493916784643e169,1.967896312372256e169,2.6675512443445446e169,3.615957607353081e169,4.901555104478086e169,6.644226799943575e169,9.006478317209807e169,1.22085916271032e170,1.6549166529670797e170,2.243296534047274e170,3.0408657322081664e170,4.1219982561266886e170,5.587510636707168e170,7.574063154663782e170,1.026690352837331e171,1.391714142177674e171,1.886516463493377e171,2.5572380556990855e171,3.4664242799164928e171,4.698857527798817e171,6.369463251937024e171,8.634026862436335e171,1.1703720849414752e172,1.5864796797999057e172,2.15052785930371e172,2.9151145977646305e172,3.951538261332441e172,5.356446241512375e172,7.260847406938438e172,9.842328792224813e172,1.3341615740565983e173,1.80850197475157e173,2.4514867286541957e173,3.323074713033256e173,4.504542251576421e173,6.106062200965312e173,8.276977663825743e173,1.1219728360553485e174,1.520872830607789e174,2.0615955151046477e174,2.794563741533429e174,3.78812742280168e174,5.134937220472216e174,6.960584298056979e174,9.435311804240346e174,1.2789890191846141e175,1.7337136759590286e175,2.350108613225969e175,3.185653185151093e175,4.318262636437597e175,5.8535537654164e175,7.934693780665247e175,1.0755750765441656e176,1.457979069213595e176,1.9763408548800218e176,2.6789981126237256e176,3.631474231643495e176,4.9225884232427447e176,6.67273818811548e176,9.045126486077641e176,1.226098055141128e177,1.66201815213404e177,2.2529228608106236e177,3.0539145497574433e177,4.139686377839412e177,5.611487495034635e177,7.606564612115551e177,1.0310960373606745e178,1.3976861993224264e178,1.8946117926869996e178,2.568211553300736e178,3.4812992339463666e178,4.719021040419866e178,6.396795587916917e178,8.671076785440718e178,1.1753943296395593e179,1.5932875055017613e179,2.159756101568352e179,2.9276237980619555e179,3.9684949132706236e179,5.379431567361727e179,7.292004807958402e179,9.884563722662923e179,1.33988666437445e180,1.8162625319034649e180,2.4620064312204294e180,3.337334532259827e180,4.523871927780554e180,6.132264242956516e180,8.312495434390939e180,1.126787392212124e181,1.527399127337057e181,2.070442135148549e181,2.8065556397638755e181,3.804382853967218e181,5.156972017407879e181,6.990453224389267e181,9.47580016285152e181,1.2844773556745556e182,1.7411533051411584e182,2.3601932868733983e182,3.199323307691714e182,4.336792958469216e182,5.878672255289458e182,7.968742759006514e182,1.0801905328550835e183,1.4642354792429247e183,1.9848216342047067e183,2.690494101156274e183,3.64705744012972e183,4.943711999178894e183,6.70137192299189e183,9.083940500118718e183,1.231359428456567e184,1.6691501249143821e184,2.2625904956068384e184,3.067019361768482e184,4.157450401973562e184,5.63556724170914e184,7.639205538267041e184,1.0355206273466098e185,1.4036838834730043e185,1.9027418601700706e185,2.5792321398501563e185,3.4962380186671296e185,4.739271077741883e185,6.424245211108972e185,8.708285695301669e185,1.1804381255538852e186,1.600124544619479e186,2.1690239436245803e186,2.9401866772412998e186,3.9855243287821387e186,5.402515526741397e186,7.323295910127411e186,9.926979889613368e186,1.3456363219258983e187,1.824056390787034e187,2.4725712754311734e187,3.351655542540257e187,4.543284550566705e187,6.158578721897108e187,8.348165617113475e187,1.1316226083620065e188,1.5339534293987065e188,2.0793267173850263e188,2.818598997054454e188,3.820708039661499e188,5.1791013690096734e188,7.020450322829646e188,9.516462263170665e188,1.289989243451397e189,1.7486248589042086e189,2.370321235390048e189,3.2130520908079956e189,4.355402796932212e189,5.903898532424879e189,8.00293784669422e189,1.0848257947913106e190,1.4705187364797376e190,1.9933388058437804e190,2.702039420724823e190,3.662707518534879e190,4.964926219593226e190,6.7301285295815105e190,9.122921071000432e190,1.2366433791253932e191,1.676312702075112e191,2.272299615695102e191,3.0801804085216886e191,4.1752906542382106e191,5.6597503182408754e191,7.671986531598794e191,1.0399642039214118e192,1.4097073045989486e192,1.9109068150096586e192,2.590300017413332e192,3.5112409079863866e192,4.759608011054986e192,6.451812624810827e192,8.745654274256967e192,1.185503565163867e193,1.606990922512362e193,2.1783315554013733e193,2.9528034656465793e193,4.002626820106778e193,5.425698542903485e193,7.354721287176606e193,9.969578070790161e193,1.3514106521328338e194,1.8318836943048675e194,2.4831814549958116e194,3.366038006455049e194,4.562780475870761e194,6.185006120270445e194,8.383988866018057e194,1.136478573160041e195,1.5405358569677055e195,2.08824942471586e195,2.8306940342235006e195,3.837103279211387e195,5.201325681026646e195,7.050576143383335e195,9.557298850748807e195,1.2955247835774413e196,1.7561284742412137e196,2.380492644474697e196,3.226839786221758e196,4.374092493043939e196,5.929233059353535e196,8.03727967070671e196,1.0894809473418606e197,1.4768289561293185e197,2.001892525962428e197,2.713634283016509e197,3.678424753807552e197,4.9862314734555564e197,6.759008535145942e197,9.162068913442488e197,1.2419500040306056e198,1.6835060149443786e198,2.2820503990948561e198,3.0933979313292494e198,4.1932074617401046e198,5.684037168033338e198,7.704908193161265e198,1.044426848559482e199,1.4157565731413769e199,1.9191068069128273e199,2.6014153889233456e199,3.5263081769863234e199,4.780032213243365e199,6.47949833447985e199,8.783183207469996e199,1.1905907413459625e200,1.61388676507765e200,2.187679107556405e200,2.965474394610653e200,4.019802700824202e200,5.4489810409151e200,7.386281515300345e200,1.0012359047244612e201,1.3572097608692217e201,1.8397445859730838e201,2.493837164455528e201,3.3804821877107166e201,4.5823600611567594e201,6.211546922631697e201,8.419965837934011e201,1.1413553756418986e202,1.5471465307350605e202,2.0972104207413937e202,2.8428409730373976e202,3.853568873229071e202,5.223645360947798e202,7.0808312384169084e202,9.598310674338412e202,1.30108407754837e203,1.763664288733366e203,2.3907077006235272e203,3.240686646734267e203,4.392862389485221e203,5.9546763005924344e203,8.071768860710968e203,1.0941560758602625e204,1.4831662538916512e204,2.0104829513955088e204,2.7252789006263866e204,3.6942094341284954e204,5.007628151403693e204,6.788012469208192e204,9.20138474523365e204,1.2472794004706618e205,1.6907301954135921e205,2.29184302458997e205,3.1066721725381547e205,4.211201152988938e205,5.708428236394026e205,7.7379711265823605e205,1.0489086430846622e206,1.4218318000156466e206,1.9273419862290577e206,2.612578458183655e206,3.541440101930348e206,4.8005440587913154e206,6.5073028477413e206,8.820873183046277e206,1.1956997473751787e207,1.6208121987525523e207,2.1970667714801648e207,2.978199696459065e207,4.0370522858590056e207,5.472363447668614e207,7.417977173165529e207,1.0055323603377931e208,1.363033754463656e208,1.8476392099236516e208,2.5045385991857475e208,3.3949883511459517e208,4.602023665422674e208,6.238201615613928e208,8.456097192510644e208,1.1462531052253156e209,1.553785571909331e209,2.1062098697643614e209,2.855040036214163e209,3.8701051236158395e209,5.246060818011612e209,7.111216162667232e209,9.639498485902775e209,1.3066672272956195e210,1.77123244055224e210,2.4009665911324595e210,3.254592926232147e210,4.411712830408376e210,5.980228722650547e210,8.106406049077344e210,1.098851266066558e211,1.489530745962869e211,2.0191102396512256e211,2.736973487062407e211,3.7100618489142527e211,5.0291166457525835e211,6.817140863565076e211,9.240869287240726e211,1.2526316661617531e212,1.697985375940513e212,2.3016776717309804e212,3.120003375535871e212,4.229272057905048e212,5.7329239705400234e212,7.771175938081559e212,1.0534096696721512e213,1.427933096612748e213,1.9356125039526734e213,2.6237894298728613e213,3.556636960266551e213,4.8211439237892823e213,6.535226674400208e213,8.858724892042088e213,1.200830676926575e214,1.627767350517207e214,2.206494719298106e214,2.9909796045137967e214,4.054375891488088e214,5.49584619188702e214,7.449808841920942e214,1.0098472526959598e215,1.3688827397006947e215,1.8555677109067177e215,2.515285955400847e215,3.4095567627359117e215,4.6217716492062095e215,6.264970687939828e215,8.492383592227926e215,1.1511718517115394e216,1.5604531022195532e216,2.115247936792546e216,2.867291447427043e216,3.8867123335693634e216,5.268572463212679e216,7.141731473250423e216,9.68086304063417e216,1.3122743351880305e217,1.778833068462024e217,2.411269504101676e217,3.2685588796914916e217,4.430644161441529e217,6.00589079404006e217,8.141191870889791e217,1.1035666040483773e218,1.4959225490379733e218,2.027774548913675e218,2.748718256748095e218,3.7259822888239294e218,5.050697350500661e218,6.846394252293879e218,9.280523263425449e218,1.258006899239387e219,1.7052716895509136e219,2.311554520839294e219,3.133391784754279e219,4.247420507823546e219,5.757524819608466e219,7.804523236479726e219,1.057930010849535e220,1.4340605748019092e220,1.9439185117263783e220,2.635048509547277e220,3.5718990306341996e220,4.841832185942667e220,6.563270326447775e220,8.896739028480646e220,1.2059836240774574e221,1.634752347896274e221,2.2159631238746724e221,3.0038143530987292e221,4.071773835344622e221,5.519429704133957e221,7.481777105210857e221,1.014180660913724e222,1.3747568238233558e222,1.863530234293993e222,2.526079430156764e222,3.424187689596512e222,4.6416043745932394e222,6.291854630427497e222,8.528825702407182e222,1.1561117052874285e223,1.567149243916677e223,2.1243247875414432e223,2.8795954313097537e223,3.903390807587276e223,5.291180709308334e223,7.172377729674885e223,9.722405096962767e223,1.3179055040335004e224,1.7864663118227673e224,2.42161662843784e224,3.2825847631819777e224,4.4496567296969526e224,6.031662985281913e224,8.176126963956117e224,1.1083021762630167e225,1.5023417803126377e225,2.036476038045399e225,2.760513425027723e225,3.7419710457636825e225,5.0723706613362035e225,6.875773171765247e225,9.320347400855653e225,1.263405198259971e226,1.712589269841785e226,2.321473753009974e226,3.1468376456736203e226,4.265646835502321e226,5.782231234663479e226,7.838013633208938e226,1.062469749498778e227,1.4402143469323258e227,1.9522601618431558e227,2.646355903645886e227,3.5872265928680435e227,4.862609224576564e227,6.591434318073722e227,8.934916289362819e227,1.2111586833085581e228,1.641767318962012e228,2.2254721588159712e228,3.0167041775425795e228,4.0892464364257146e228,5.543114416820368e228,7.513882549182353e228,1.0185326644455716e229,1.380656114534777e229,1.8715269260805805e229,2.536919221355029e229,3.4388813999904855e229,4.661522205222351e229,6.318853936004066e229,8.56542419122618e229,1.1610727565265846e230,1.573874119776964e230,2.1334405884380205e230,2.891952213459292e230,3.920140851475633e230,5.313885970828013e230,7.203155493848333e230,9.764125416577692e230,1.323560837081314e231,1.7941323105921296e231,2.432008153859344e231,3.296670833872673e231,4.4687508837754245e231,6.057545768918865e231,8.21121196882245e231,1.1130580695385217e232,1.508788557485611e232,2.0452148665909896e232,2.772359208169012e232,3.75802841289271e232,5.094136975646312e232,6.905278160649918e232,9.3603424297202e232,1.268826662203047e233,1.7199382509830163e233,2.3314355501154552e233,3.1603412048280627e233,4.283951375126206e233,5.807043668705436e233,7.871647742326349e233,1.0670289688572623e234,1.4463945258354645e234,1.9606376072498342e234,2.657711819492934e234,3.6026199280040556e234,4.883475420644634e234,6.619719165672741e234,8.973257374681439e234,1.216355949506247e235,1.6488123923358843e235,2.235021998473334e235,3.02964931418441e235,4.1067940150964115e235,5.56690076421337e235,7.546125762499035e235,1.0229033430867089e236,1.3865807200004233e236,1.8795579328883853e236,2.5478055277466886e236,3.4536381633319192e236,4.681525506293352e236,6.3459690997083085e236,8.602179729730435e236,1.1660550963914724e237,1.5806278531026326e237,2.1425955066235318e237,2.904362020441218e237,3.936962772350523e237,5.33668866408027e237,7.234065330090936e237,9.806024764431061e237,1.3292404380238918e238,1.8018312053286555e238,2.4424442708973098e238,3.310817350036389e238,4.487926973774377e238,6.083539619517988e238,8.246447528784069e238,1.1178343710757197e239,1.5152629987601917e239,2.0539911947797861e239,2.7842558233681927e239,3.77415468462692e239,5.115996692523627e239,6.934909759931315e239,9.400509083338108e239,1.2742713904729673e240,1.7273187677205318e240,2.341440094807819e240,3.173902709809874e240,4.302334462314802e240,5.83196257667662e240,7.905426180524585e240,1.0716077525197362e241,1.4526012248264768e241,1.9690510015496728e241,2.669116465302776e241,3.618079318282947e241,4.9044311567349926e241,6.648125387856575e241,9.011762987430047e241,1.2215755179639962e242,1.655887697191569e242,2.2446128179454984e242,3.042650000377278e242,4.1244168930971907e242,5.590789182441688e242,7.578507336350125e242,1.0272927769749297e243,1.3925307488494417e243,1.8876234019683854e243,2.558738548935514e243,3.468458250189819e243,4.7016146445729125e243,6.373200618705799e243,8.639092991842086e243,1.1710588162348235e244,1.5874105677256372e244,2.1517897099557285e244,2.9168250797931565e244,3.9538568786474796e244,5.35958920715828e244,7.265107805144039e244,9.848103908761394e244,1.33494441099816e245,1.809563137193945e245,2.452925170901425e245,3.3250245710530934e245,4.507185351293313e245,6.109645013685209e245,8.281834289893922e245,1.122631168449567e246,1.5217652228474201e246,2.062805183527997e246,2.7962034887533594e246,3.7903501566468835e246,5.1379502127716154e246,6.964668512913917e246,9.440848098178374e246,1.2797394829002086e247,1.7347309553783735e247,2.3514875705237304e247,3.187522409272694e247,4.3207964341276596e247,5.856988415473521e247,7.939349567139893e247,1.0762061844396049e248,1.4588345577072588e248,1.9775004990043941e248,2.680570050183097e248,3.633605047157797e248,4.92547681707806e248,6.676653505462039e248,9.0504338336219e248,1.2268174843843369e249,1.6629933632569544e249,2.2542447930833384e249,3.0557064744931066e249,4.142115393548935e249,5.614780109507441e249,7.611027864462594e249,1.0317010465918527e250,1.3985063101775965e250,1.8957234812036494e250,2.5697184853818088e250,3.4833419322954236e250,4.7217899884020934e250,6.400548992294802e250,8.676164654378111e250,1.1760840078015126e251,1.5942223880091338e251,2.161023367013396e251,2.929341620029463e251,3.9708234801251314e251,5.382588019951141e251,7.296283488181788e251,9.89036362110273e251,1.340672860588367e252,1.8173282479555513e252,2.4634510460422127e252,3.3392927574169247e252,4.526526369441015e252,6.135862430070948e252,8.31737290098008e252,1.1274485496109448e253,1.528295348967573e253,2.071656994443046e253,2.808202423388947e253,3.806615125901558e253,5.159997938915393e253,6.9945549652344e253,9.481360213869226e253,1.2852310397440697e254,1.7421749498614774e254,2.3615781614867435e254,3.2012005529382574e254,4.339337629071198e254,5.882121643952584e254,7.973418524168887e254,1.0808243489306532e255,1.4650946387678846e255,1.9859862545383535e255,2.6920727841392016e255,3.6491973992976145e255,4.946612787551367e255,6.705304041561692e255,9.089270622298847e255,1.2320819448800554e256,1.6701295208168008e256,2.263918100492078e256,3.068818975925667e256,4.159889840959561e256,5.6388739852916464e256,7.64368794310859e256,1.0361282327645738e257,1.4045075135486404e257,1.9038583191111895e257,2.580745538406374e257,3.4982894825456156e257,4.7420519077009496e257,6.428014721916885e257,8.713395397058832e257,1.1811307632297045e258,1.6010634388501227e258,2.170296647098474e258,2.9419118706440834e258,3.987862887871783e258,5.4056855241491515e258,7.327592950818255e258,9.932804676301013e258,1.3464258918273953e259,1.8251266799887533e259,2.4740220893151074e259,3.353622170739463e259,4.545950382839968e259,6.162192349380291e259,8.353064013653896e259,1.1322866028877618e260,1.534853496852694e260,2.0805467898256067e260,2.8202528472784724e260,3.8229498906141507e260,5.182140275206795e260,7.024569664868458e260,9.522046173212755e260,1.2907461616939327e261,1.7496508876573742e261,2.3717120527109442e261,3.2149373915995297e261,4.357958387102939e261,5.907362722939276e261,8.00763367627636e261,1.0854623306681009e262,1.4713815827888634e262,1.994508423740485e262,2.70362487807664e262,3.664856660592967e262,4.967839455689985e262,6.734077521470399e262,9.128274065545338e262,1.2373689959767914e263,1.6772963007143712e263,2.2736329175347806e263,3.081987745097049e263,4.1777405612280796e263,5.663071251562921e263,7.676488171121552e263,1.0405744166666764e264,1.4105344689964814e264,1.9120280648459724e264,2.59181991019303e264,3.513301175008322e264,4.762400773978533e264,6.455598311163178e264,8.750785902521356e264,1.1861991750533435e265,1.6079338456810097e265,2.1796097202394018e265,2.9545360621167562e265,4.004975414309307e265,5.428882143252149e265,7.359036767122884e265,9.975427852523771e265,1.3522036101988407e266,1.8329585762804048e266,2.4846384945428747e266,3.368013073754905e266,4.5654577476359356e266,6.188635254379002e266,8.388908282322887e266,1.1371454169873384e267,1.5414397867480904e267,2.0894747326728083e267,2.832354981370477e267,3.839354750288029e267,5.204377627632358e267,7.054713162145627e267,9.562906722199613e267,1.2962849498712532e268,1.757158905839878e268,2.381889430004613e268,3.228733177125669e268,4.3766590496406936e268,5.9327121152372085e268,8.041995650807638e268,1.0901202146908904e269,1.4776955050434138e269,2.0030671628673804e269,2.715226543806909e269,3.6805831181616395e269,4.9891572106913954e269,6.762974472759513e269,9.167444878502531e269,1.242678734614251e270,1.6844938343549654e270,2.283389422335861e270,3.0952130234606793e270,4.1956678816534023e270,5.687372351986222e270,7.709429149903739e270,1.045039679820426e271,1.4165872870273601e271,1.920232868202796e271,2.602941803794078e271,3.5283772849279375e271,4.782836960337559e271,6.483300265787994e271,8.788336856333086e271,1.1912893362033178e272,1.614833734472996e272,2.1889627571944855e272,2.9672144259159116e272,4.022161373201583e272,5.45217830257789e272,7.390615513627708e272,1.0018233931281163e273,1.3580061216390992e273,1.8408240804307298e273,2.4953004563808463e273,3.3824657303252636e273,4.585048821502447e273,6.215191629906563e273,8.424906364203692e273,1.1420250809975245e274,1.5480543394155855e274,2.0984409866814642e274,2.8445090475613083e274,3.855830005710463e274,5.226710403921368e274,7.08498600975619e274,9.60394261001835e274,1.3018475058315621e275,1.7646991420708086e275,2.3921104799725478e275,3.24258816246701e275,4.3954399595668553e275,5.958170285633933e275,8.076505077801003e275,1.0947980864027567e276,1.484036521298905e276,2.0116626288463796e276,2.7268779940501137e276,3.6963770603522287e276,5.010566443423756e276,6.791995425263513e276,9.206783779377238e276,1.248011258148266e277,1.6917222537075747e277,2.293187793783315e277,3.108495053506455e277,4.213672130938457e277,5.711777732128402e277,7.742511483438997e277,1.0495241040977943e278,1.4226660786212336e278,1.9284728796194706e278,2.6141114231328543e278,3.5435180887287696e278,4.8033608414823285e278,6.511121093715182e278,8.826048947000306e278,1.1964013400094317e279,1.621763231737663e279,2.198355929454035e279,2.9799471945032455e279,4.039421079658449e279,5.475574429267378e279,7.422329769338746e279,1.0061223697435795e280,1.3638335325386926e280,1.8487233366561646e280,2.506008170319369e280,3.3969804054436698e280,4.604723963647861e280,6.241861962882281e280,8.461058919330288e280,1.1469256843884586e281,1.5546972761350345e281,2.1074457162501216e281,2.856715268699504e281,3.872375958960759e281,5.249139013550952e281,7.115388762762108e281,9.64515458907566e281,1.3074339315657367e282,1.7722717346027143e282,2.402375390021111e282,3.2565026016582307e282,4.4143014612351776e282,5.983737700913496e282,8.111162589995565e282,1.0994960315739147e283,1.4904047478199855e283,2.0202949792775357e283,2.7385794424391744e283,3.7122387767519337e283,5.032067546430788e283,6.821140911090481e283,9.246291489461332e283,1.2533666643520098e284,1.6989816913074887e284,2.3030282115335515e284,3.121834078763772e284,4.231753639196686e284,5.7362878394702487e284,7.775735778300319e284,1.0540277717220782e285,1.428770955234774e285,1.9367482501786992e285,2.6253289730077614e285,3.558723864022507e285,4.823972793723419e285,6.53906130504817e285,8.863922865986778e285,1.2015352802015746e286,1.6287224645294716e286,2.2077894092449976e286,2.9927346013383213e286,4.056754850141926e286,5.499070952296401e286,7.454180115747468e286,1.0104397939218237e287,1.3696859497451437e287,1.8566564897922093e287,2.5167618326876672e287,3.4115573652415344e287,4.624483534822478e287,6.268646742314906e287,8.497366610571838e287,1.1518473170143408e288,1.5613687187067235e288,2.1164890864835003e288,2.868973868590205e288,3.888992913414053e288,5.271663867757152e288,7.145921978608013e288,9.686543415005842e288,1.3130443295027564e289,1.779876822281608e289,2.4126843483605818e289,3.270476749825215e289,4.433243900477593e289,6.0094148298623135e289,8.145968822848376e289,1.104214136342758e290,1.4968003013700452e290,2.028964372437874e290,2.7503311035240557e290,3.728168558190199e290,5.053660913942392e290,6.850411464632634e290,9.285968733140815e290,1.2587450514186424e291,1.70627228025892e291,2.3129108560136535e291,3.1352303438081093e291,4.249912737958583e291,5.76090312341211e291,7.809102643666237e291,1.0585507652695277e292,1.4349020288027693e292,1.9450591316121623e292,2.6365946590963224e292,3.573994889611712e292,4.844673194987852e292,6.567121412080064e292,8.901959307722446e292,1.2066912509122525e293,1.6357115604482793e293,2.2172633695331238e293,3.0055768808814936e293,4.074163002472484e293,5.5226683024809276e293,7.486167136838072e293,1.0147757448242633e294,1.3755634805643206e294,1.8646236852952433e294,2.527561640657732e294,3.426196876991894e294,4.644327897323059e294,6.295546459312313e294,8.533830103641014e294,1.156790069114556e295,1.56806878945378e295,2.1255712631945724e295,2.881285071997957e295,3.9056811737477536e295,5.294285379540089e295,7.176586217128177e295,9.728109846686842e295,1.3186788025109916e296,1.7875145445487053e296,2.423037544009154e296,3.284510863188265e296,4.452267624608539e296,6.0352021432791195e296,8.180924414542409e296,1.1089524872169367e297,1.5032232992136943e297,2.0376709672833817e297,2.76213319277445e297,3.744166696744887e297,5.075346941879594e297,6.879807622573008e297,9.3258162379112e297,1.2641465179625433e298,1.71359415423667e298,2.322835908424944e298,3.148684094264102e298,4.268149760175837e298,5.785624035282782e298,7.8426126913284805e298,1.0630931676703793e299,1.4410594117403375e299,1.9534056763024242e299,2.6479086879577553e299,3.589331445495331e299,4.865462424823844e299,6.595301929300057e299,8.940158969617154e299,1.2118693466777728e300,1.6427306476409365e300,2.226777984026386e300,3.018474268600243e300,4.091645855833021e300,5.546366912485625e300,7.518291419103259e300,1.0191303019516599e301,1.3814662327625564e301,1.8726250692464544e301,2.5384077922467874e301,3.440899209114696e301,4.66425741500261e301,6.322561607087649e301,8.570450067107167e301,1.1617540313161128e302,1.574797611223704e302,2.1346924129078388e302,2.893649104652781e302,3.922441045945357e302,5.317003963672133e302,7.207382040561643e302,9.769854646249746e302,1.3243374539002357e303,1.7951850414441922e303,2.4334351667953018e303,3.298605199067159e303,4.471372982434346e303,6.06110011398086e303,8.216030005999178e303,1.113711171075695e304,1.5096738591182312e304,2.0464149234521504e304,2.773985926585601e304,3.7602334857459337e304,5.097126027862379e304,6.909329923899969e304,9.365834734386617e304,1.2695711630212609e305,1.720947447489741e305,2.3328035507465743e305,3.162195576810399e305,4.286465040230338e305,5.810451028348439e305,7.876266535704068e305,1.0676550622110961e306,1.4472432169451512e306,1.9617880372859468e306,2.659271267038554e306,3.6047338128742365e306,4.8863408644083123e306,6.623603373407337e306,8.978522552074461e306,1.217069662440112e307,1.6497798548047485e307,2.236333427178419e307,3.0314270009721357e307,4.109203730777486e307],"x":[100.0,100.3041958041958,100.60839160839161,100.91258741258741,101.21678321678321,101.52097902097903,101.82517482517483,102.12937062937063,102.43356643356644,102.73776223776224,103.04195804195804,103.34615384615384,103.65034965034965,103.95454545454545,104.25874125874125,104.56293706293707,104.86713286713287,105.17132867132867,105.47552447552448,105.77972027972028,106.08391608391608,106.3881118881119,106.6923076923077,106.9965034965035,107.3006993006993,107.6048951048951,107.9090909090909,108.2132867132867,108.51748251748252,108.82167832167832,109.12587412587412,109.43006993006993,109.73426573426573,110.03846153846153,110.34265734265735,110.64685314685315,110.95104895104895,111.25524475524476,111.55944055944056,111.86363636363636,112.16783216783217,112.47202797202797,112.77622377622377,113.08041958041959,113.38461538461539,113.68881118881119,113.99300699300699,114.2972027972028,114.6013986013986,114.9055944055944,115.20979020979021,115.51398601398601,115.81818181818181,116.12237762237763,116.42657342657343,116.73076923076923,117.03496503496504,117.33916083916084,117.64335664335664,117.94755244755245,118.25174825174825,118.55594405594405,118.86013986013987,119.16433566433567,119.46853146853147,119.77272727272727,120.07692307692308,120.38111888111888,120.68531468531468,120.9895104895105,121.2937062937063,121.5979020979021,121.9020979020979,122.2062937062937,122.5104895104895,122.81468531468532,123.11888111888112,123.42307692307692,123.72727272727273,124.03146853146853,124.33566433566433,124.63986013986013,124.94405594405595,125.24825174825175,125.55244755244755,125.85664335664336,126.16083916083916,126.46503496503496,126.76923076923077,127.07342657342657,127.37762237762237,127.68181818181819,127.98601398601399,128.2902097902098,128.5944055944056,128.8986013986014,129.2027972027972,129.506993006993,129.8111888111888,130.1153846153846,130.41958041958043,130.7237762237762,131.02797202797203,131.33216783216784,131.63636363636363,131.94055944055944,132.24475524475525,132.54895104895104,132.85314685314685,133.15734265734267,133.46153846153845,133.76573426573427,134.06993006993008,134.37412587412587,134.67832167832168,134.9825174825175,135.28671328671328,135.5909090909091,135.8951048951049,136.1993006993007,136.5034965034965,136.80769230769232,137.1118881118881,137.41608391608392,137.72027972027973,138.02447552447552,138.32867132867133,138.63286713286712,138.93706293706293,139.24125874125875,139.54545454545453,139.84965034965035,140.15384615384616,140.45804195804195,140.76223776223776,141.06643356643357,141.37062937062936,141.67482517482517,141.979020979021,142.28321678321677,142.5874125874126,142.8916083916084,143.1958041958042,143.5,143.8041958041958,144.1083916083916,144.4125874125874,144.71678321678323,145.020979020979,145.32517482517483,145.62937062937064,145.93356643356643,146.23776223776224,146.54195804195805,146.84615384615384,147.15034965034965,147.45454545454547,147.75874125874125,148.06293706293707,148.36713286713288,148.67132867132867,148.97552447552448,149.27972027972027,149.58391608391608,149.8881118881119,150.19230769230768,150.4965034965035,150.8006993006993,151.1048951048951,151.4090909090909,151.71328671328672,152.0174825174825,152.32167832167832,152.62587412587413,152.93006993006992,153.23426573426573,153.53846153846155,153.84265734265733,154.14685314685315,154.45104895104896,154.75524475524475,155.05944055944056,155.36363636363637,155.66783216783216,155.97202797202797,156.2762237762238,156.58041958041957,156.8846153846154,157.1888111888112,157.493006993007,157.7972027972028,158.1013986013986,158.4055944055944,158.7097902097902,159.01398601398603,159.3181818181818,159.62237762237763,159.9265734265734,160.23076923076923,160.53496503496504,160.83916083916083,161.14335664335664,161.44755244755245,161.75174825174824,162.05594405594405,162.36013986013987,162.66433566433565,162.96853146853147,163.27272727272728,163.57692307692307,163.88111888111888,164.1853146853147,164.48951048951048,164.7937062937063,165.0979020979021,165.4020979020979,165.7062937062937,166.01048951048952,166.3146853146853,166.61888111888112,166.92307692307693,167.22727272727272,167.53146853146853,167.83566433566435,168.13986013986013,168.44405594405595,168.74825174825176,169.05244755244755,169.35664335664336,169.66083916083917,169.96503496503496,170.26923076923077,170.5734265734266,170.87762237762237,171.1818181818182,171.48601398601397,171.7902097902098,172.0944055944056,172.3986013986014,172.7027972027972,173.006993006993,173.3111888111888,173.6153846153846,173.91958041958043,174.2237762237762,174.52797202797203,174.83216783216784,175.13636363636363,175.44055944055944,175.74475524475525,176.04895104895104,176.35314685314685,176.65734265734267,176.96153846153845,177.26573426573427,177.56993006993008,177.87412587412587,178.17832167832168,178.4825174825175,178.78671328671328,179.0909090909091,179.3951048951049,179.6993006993007,180.0034965034965,180.30769230769232,180.6118881118881,180.91608391608392,181.22027972027973,181.52447552447552,181.82867132867133,182.13286713286712,182.43706293706293,182.74125874125875,183.04545454545453,183.34965034965035,183.65384615384616,183.95804195804195,184.26223776223776,184.56643356643357,184.87062937062936,185.17482517482517,185.479020979021,185.78321678321677,186.0874125874126,186.3916083916084,186.6958041958042,187.0,187.3041958041958,187.6083916083916,187.9125874125874,188.21678321678323,188.520979020979,188.82517482517483,189.12937062937064,189.43356643356643,189.73776223776224,190.04195804195805,190.34615384615384,190.65034965034965,190.95454545454547,191.25874125874125,191.56293706293707,191.86713286713288,192.17132867132867,192.47552447552448,192.77972027972027,193.08391608391608,193.3881118881119,193.69230769230768,193.9965034965035,194.3006993006993,194.6048951048951,194.9090909090909,195.21328671328672,195.5174825174825,195.82167832167832,196.12587412587413,196.43006993006992,196.73426573426573,197.03846153846155,197.34265734265733,197.64685314685315,197.95104895104896,198.25524475524475,198.55944055944056,198.86363636363637,199.16783216783216,199.47202797202797,199.7762237762238,200.08041958041957,200.3846153846154,200.6888111888112,200.993006993007,201.2972027972028,201.6013986013986,201.9055944055944,202.2097902097902,202.51398601398603,202.8181818181818,203.12237762237763,203.4265734265734,203.73076923076923,204.03496503496504,204.33916083916083,204.64335664335664,204.94755244755245,205.25174825174824,205.55594405594405,205.86013986013987,206.16433566433565,206.46853146853147,206.77272727272728,207.07692307692307,207.38111888111888,207.6853146853147,207.98951048951048,208.2937062937063,208.5979020979021,208.9020979020979,209.2062937062937,209.51048951048952,209.8146853146853,210.11888111888112,210.42307692307693,210.72727272727272,211.03146853146853,211.33566433566435,211.63986013986013,211.94405594405595,212.24825174825176,212.55244755244755,212.85664335664336,213.16083916083917,213.46503496503496,213.76923076923077,214.0734265734266,214.37762237762237,214.6818181818182,214.98601398601397,215.2902097902098,215.5944055944056,215.8986013986014,216.2027972027972,216.506993006993,216.8111888111888,217.1153846153846,217.41958041958043,217.7237762237762,218.02797202797203,218.33216783216784,218.63636363636363,218.94055944055944,219.24475524475525,219.54895104895104,219.85314685314685,220.15734265734267,220.46153846153845,220.76573426573427,221.06993006993008,221.37412587412587,221.67832167832168,221.9825174825175,222.28671328671328,222.5909090909091,222.8951048951049,223.1993006993007,223.5034965034965,223.80769230769232,224.1118881118881,224.41608391608392,224.72027972027973,225.02447552447552,225.32867132867133,225.63286713286712,225.93706293706293,226.24125874125875,226.54545454545453,226.84965034965035,227.15384615384616,227.45804195804195,227.76223776223776,228.06643356643357,228.37062937062936,228.67482517482517,228.979020979021,229.28321678321677,229.5874125874126,229.8916083916084,230.1958041958042,230.5,230.8041958041958,231.1083916083916,231.4125874125874,231.71678321678323,232.020979020979,232.32517482517483,232.62937062937064,232.93356643356643,233.23776223776224,233.54195804195805,233.84615384615384,234.15034965034965,234.45454545454547,234.75874125874125,235.06293706293707,235.36713286713288,235.67132867132867,235.97552447552448,236.27972027972027,236.58391608391608,236.8881118881119,237.19230769230768,237.4965034965035,237.8006993006993,238.1048951048951,238.4090909090909,238.71328671328672,239.0174825174825,239.32167832167832,239.62587412587413,239.93006993006992,240.23426573426573,240.53846153846155,240.84265734265733,241.14685314685315,241.45104895104896,241.75524475524475,242.05944055944056,242.36363636363637,242.66783216783216,242.97202797202797,243.2762237762238,243.58041958041957,243.8846153846154,244.1888111888112,244.493006993007,244.7972027972028,245.1013986013986,245.4055944055944,245.7097902097902,246.01398601398603,246.3181818181818,246.62237762237763,246.9265734265734,247.23076923076923,247.53496503496504,247.83916083916083,248.14335664335664,248.44755244755245,248.75174825174824,249.05594405594405,249.36013986013987,249.66433566433565,249.96853146853147,250.27272727272728,250.57692307692307,250.88111888111888,251.1853146853147,251.48951048951048,251.7937062937063,252.0979020979021,252.4020979020979,252.7062937062937,253.01048951048952,253.3146853146853,253.61888111888112,253.92307692307693,254.22727272727272,254.53146853146853,254.83566433566435,255.13986013986013,255.44405594405595,255.74825174825176,256.0524475524476,256.35664335664336,256.66083916083915,256.965034965035,257.2692307692308,257.57342657342656,257.8776223776224,258.1818181818182,258.486013986014,258.7902097902098,259.0944055944056,259.3986013986014,259.7027972027972,260.006993006993,260.3111888111888,260.61538461538464,260.9195804195804,261.2237762237762,261.52797202797206,261.83216783216784,262.1363636363636,262.44055944055947,262.74475524475525,263.04895104895104,263.3531468531468,263.65734265734267,263.96153846153845,264.26573426573424,264.5699300699301,264.87412587412587,265.17832167832165,265.4825174825175,265.7867132867133,266.09090909090907,266.3951048951049,266.6993006993007,267.0034965034965,267.3076923076923,267.6118881118881,267.9160839160839,268.22027972027973,268.5244755244755,268.8286713286713,269.13286713286715,269.43706293706293,269.7412587412587,270.04545454545456,270.34965034965035,270.65384615384613,270.958041958042,271.26223776223776,271.56643356643355,271.8706293706294,272.1748251748252,272.47902097902096,272.7832167832168,273.0874125874126,273.3916083916084,273.6958041958042,274.0,274.3041958041958,274.6083916083916,274.9125874125874,275.2167832167832,275.52097902097904,275.8251748251748,276.1293706293706,276.43356643356645,276.73776223776224,277.041958041958,277.34615384615387,277.65034965034965,277.95454545454544,278.2587412587413,278.56293706293707,278.86713286713285,279.1713286713287,279.4755244755245,279.77972027972027,280.0839160839161,280.3881118881119,280.6923076923077,280.9965034965035,281.3006993006993,281.6048951048951,281.90909090909093,282.2132867132867,282.5174825174825,282.82167832167835,283.12587412587413,283.4300699300699,283.73426573426576,284.03846153846155,284.34265734265733,284.6468531468532,284.95104895104896,285.25524475524475,285.55944055944053,285.8636363636364,286.16783216783216,286.47202797202794,286.7762237762238,287.0804195804196,287.38461538461536,287.6888111888112,287.993006993007,288.2972027972028,288.6013986013986,288.9055944055944,289.2097902097902,289.513986013986,289.8181818181818,290.1223776223776,290.42657342657344,290.7307692307692,291.034965034965,291.33916083916085,291.64335664335664,291.9475524475524,292.25174825174827,292.55594405594405,292.86013986013984,293.1643356643357,293.46853146853147,293.77272727272725,294.0769230769231,294.3811188811189,294.68531468531467,294.9895104895105,295.2937062937063,295.5979020979021,295.9020979020979,296.2062937062937,296.5104895104895,296.81468531468533,297.1188811188811,297.4230769230769,297.72727272727275,298.03146853146853,298.3356643356643,298.63986013986016,298.94405594405595,299.24825174825173,299.5524475524476,299.85664335664336,300.16083916083915,300.465034965035,300.7692307692308,301.07342657342656,301.3776223776224,301.6818181818182,301.986013986014,302.2902097902098,302.5944055944056,302.8986013986014,303.2027972027972,303.506993006993,303.8111888111888,304.11538461538464,304.4195804195804,304.7237762237762,305.02797202797206,305.33216783216784,305.6363636363636,305.94055944055947,306.24475524475525,306.54895104895104,306.8531468531468,307.15734265734267,307.46153846153845,307.76573426573424,308.0699300699301,308.37412587412587,308.67832167832165,308.9825174825175,309.2867132867133,309.59090909090907,309.8951048951049,310.1993006993007,310.5034965034965,310.8076923076923,311.1118881118881,311.4160839160839,311.72027972027973,312.0244755244755,312.3286713286713,312.63286713286715,312.93706293706293,313.2412587412587,313.54545454545456,313.84965034965035,314.15384615384613,314.458041958042,314.76223776223776,315.06643356643355,315.3706293706294,315.6748251748252,315.97902097902096,316.2832167832168,316.5874125874126,316.8916083916084,317.1958041958042,317.5,317.8041958041958,318.1083916083916,318.4125874125874,318.7167832167832,319.02097902097904,319.3251748251748,319.6293706293706,319.93356643356645,320.23776223776224,320.541958041958,320.84615384615387,321.15034965034965,321.45454545454544,321.7587412587413,322.06293706293707,322.36713286713285,322.6713286713287,322.9755244755245,323.27972027972027,323.5839160839161,323.8881118881119,324.1923076923077,324.4965034965035,324.8006993006993,325.1048951048951,325.40909090909093,325.7132867132867,326.0174825174825,326.32167832167835,326.62587412587413,326.9300699300699,327.23426573426576,327.53846153846155,327.84265734265733,328.1468531468532,328.45104895104896,328.75524475524475,329.05944055944053,329.3636363636364,329.66783216783216,329.97202797202794,330.2762237762238,330.5804195804196,330.88461538461536,331.1888111888112,331.493006993007,331.7972027972028,332.1013986013986,332.4055944055944,332.7097902097902,333.013986013986,333.3181818181818,333.6223776223776,333.92657342657344,334.2307692307692,334.534965034965,334.83916083916085,335.14335664335664,335.4475524475524,335.75174825174827,336.05594405594405,336.36013986013984,336.6643356643357,336.96853146853147,337.27272727272725,337.5769230769231,337.8811188811189,338.18531468531467,338.4895104895105,338.7937062937063,339.0979020979021,339.4020979020979,339.7062937062937,340.0104895104895,340.31468531468533,340.6188811188811,340.9230769230769,341.22727272727275,341.53146853146853,341.8356643356643,342.13986013986016,342.44405594405595,342.74825174825173,343.0524475524476,343.35664335664336,343.66083916083915,343.965034965035,344.2692307692308,344.57342657342656,344.8776223776224,345.1818181818182,345.486013986014,345.7902097902098,346.0944055944056,346.3986013986014,346.7027972027972,347.006993006993,347.3111888111888,347.61538461538464,347.9195804195804,348.2237762237762,348.52797202797206,348.83216783216784,349.1363636363636,349.44055944055947,349.74475524475525,350.04895104895104,350.3531468531468,350.65734265734267,350.96153846153845,351.26573426573424,351.5699300699301,351.87412587412587,352.17832167832165,352.4825174825175,352.7867132867133,353.09090909090907,353.3951048951049,353.6993006993007,354.0034965034965,354.3076923076923,354.6118881118881,354.9160839160839,355.22027972027973,355.5244755244755,355.8286713286713,356.13286713286715,356.43706293706293,356.7412587412587,357.04545454545456,357.34965034965035,357.65384615384613,357.958041958042,358.26223776223776,358.56643356643355,358.8706293706294,359.1748251748252,359.47902097902096,359.7832167832168,360.0874125874126,360.3916083916084,360.6958041958042,361.0,361.3041958041958,361.6083916083916,361.9125874125874,362.2167832167832,362.52097902097904,362.8251748251748,363.1293706293706,363.43356643356645,363.73776223776224,364.041958041958,364.34615384615387,364.65034965034965,364.95454545454544,365.2587412587413,365.56293706293707,365.86713286713285,366.1713286713287,366.4755244755245,366.77972027972027,367.0839160839161,367.3881118881119,367.6923076923077,367.9965034965035,368.3006993006993,368.6048951048951,368.90909090909093,369.2132867132867,369.5174825174825,369.82167832167835,370.12587412587413,370.4300699300699,370.73426573426576,371.03846153846155,371.34265734265733,371.6468531468532,371.95104895104896,372.25524475524475,372.55944055944053,372.8636363636364,373.16783216783216,373.47202797202794,373.7762237762238,374.0804195804196,374.38461538461536,374.6888111888112,374.993006993007,375.2972027972028,375.6013986013986,375.9055944055944,376.2097902097902,376.513986013986,376.8181818181818,377.1223776223776,377.42657342657344,377.7307692307692,378.034965034965,378.33916083916085,378.64335664335664,378.9475524475524,379.25174825174827,379.55594405594405,379.86013986013984,380.1643356643357,380.46853146853147,380.77272727272725,381.0769230769231,381.3811188811189,381.68531468531467,381.9895104895105,382.2937062937063,382.5979020979021,382.9020979020979,383.2062937062937,383.5104895104895,383.81468531468533,384.1188811188811,384.4230769230769,384.72727272727275,385.03146853146853,385.3356643356643,385.63986013986016,385.94405594405595,386.24825174825173,386.5524475524476,386.85664335664336,387.16083916083915,387.465034965035,387.7692307692308,388.07342657342656,388.3776223776224,388.6818181818182,388.986013986014,389.2902097902098,389.5944055944056,389.8986013986014,390.2027972027972,390.506993006993,390.8111888111888,391.11538461538464,391.4195804195804,391.7237762237762,392.02797202797206,392.33216783216784,392.6363636363636,392.94055944055947,393.24475524475525,393.54895104895104,393.8531468531468,394.15734265734267,394.46153846153845,394.76573426573424,395.0699300699301,395.37412587412587,395.67832167832165,395.9825174825175,396.2867132867133,396.59090909090907,396.8951048951049,397.1993006993007,397.5034965034965,397.8076923076923,398.1118881118881,398.4160839160839,398.72027972027973,399.0244755244755,399.3286713286713,399.63286713286715,399.93706293706293,400.2412587412587,400.54545454545456,400.84965034965035,401.15384615384613,401.458041958042,401.76223776223776,402.06643356643355,402.3706293706294,402.6748251748252,402.97902097902096,403.2832167832168,403.5874125874126,403.8916083916084,404.1958041958042,404.5,404.8041958041958,405.1083916083916,405.4125874125874,405.7167832167832,406.02097902097904,406.3251748251748,406.6293706293706,406.93356643356645,407.23776223776224,407.541958041958,407.84615384615387,408.15034965034965,408.45454545454544,408.7587412587413,409.06293706293707,409.36713286713285,409.6713286713287,409.9755244755245,410.27972027972027,410.5839160839161,410.8881118881119,411.1923076923077,411.4965034965035,411.8006993006993,412.1048951048951,412.40909090909093,412.7132867132867,413.0174825174825,413.32167832167835,413.62587412587413,413.9300699300699,414.23426573426576,414.53846153846155,414.84265734265733,415.1468531468532,415.45104895104896,415.75524475524475,416.05944055944053,416.3636363636364,416.66783216783216,416.97202797202794,417.2762237762238,417.5804195804196,417.88461538461536,418.1888111888112,418.493006993007,418.7972027972028,419.1013986013986,419.4055944055944,419.7097902097902,420.013986013986,420.3181818181818,420.6223776223776,420.92657342657344,421.2307692307692,421.534965034965,421.83916083916085,422.14335664335664,422.4475524475524,422.75174825174827,423.05594405594405,423.36013986013984,423.6643356643357,423.96853146853147,424.27272727272725,424.5769230769231,424.8811188811189,425.18531468531467,425.4895104895105,425.7937062937063,426.0979020979021,426.4020979020979,426.7062937062937,427.0104895104895,427.31468531468533,427.6188811188811,427.9230769230769,428.22727272727275,428.53146853146853,428.8356643356643,429.13986013986016,429.44405594405595,429.74825174825173,430.0524475524476,430.35664335664336,430.66083916083915,430.965034965035,431.2692307692308,431.57342657342656,431.8776223776224,432.1818181818182,432.486013986014,432.7902097902098,433.0944055944056,433.3986013986014,433.7027972027972,434.006993006993,434.3111888111888,434.61538461538464,434.9195804195804,435.2237762237762,435.52797202797206,435.83216783216784,436.1363636363636,436.44055944055947,436.74475524475525,437.04895104895104,437.3531468531468,437.65734265734267,437.96153846153845,438.26573426573424,438.5699300699301,438.87412587412587,439.17832167832165,439.4825174825175,439.7867132867133,440.09090909090907,440.3951048951049,440.6993006993007,441.0034965034965,441.3076923076923,441.6118881118881,441.9160839160839,442.22027972027973,442.5244755244755,442.8286713286713,443.13286713286715,443.43706293706293,443.7412587412587,444.04545454545456,444.34965034965035,444.65384615384613,444.958041958042,445.26223776223776,445.56643356643355,445.8706293706294,446.1748251748252,446.47902097902096,446.7832167832168,447.0874125874126,447.3916083916084,447.6958041958042,448.0,448.3041958041958,448.6083916083916,448.9125874125874,449.2167832167832,449.52097902097904,449.8251748251748,450.1293706293706,450.43356643356645,450.73776223776224,451.041958041958,451.34615384615387,451.65034965034965,451.95454545454544,452.2587412587413,452.56293706293707,452.86713286713285,453.1713286713287,453.4755244755245,453.77972027972027,454.0839160839161,454.3881118881119,454.6923076923077,454.9965034965035,455.3006993006993,455.6048951048951,455.90909090909093,456.2132867132867,456.5174825174825,456.82167832167835,457.12587412587413,457.4300699300699,457.73426573426576,458.03846153846155,458.34265734265733,458.6468531468532,458.95104895104896,459.25524475524475,459.55944055944053,459.8636363636364,460.16783216783216,460.47202797202794,460.7762237762238,461.0804195804196,461.38461538461536,461.6888111888112,461.993006993007,462.2972027972028,462.6013986013986,462.9055944055944,463.2097902097902,463.513986013986,463.8181818181818,464.1223776223776,464.42657342657344,464.7307692307692,465.034965034965,465.33916083916085,465.64335664335664,465.9475524475524,466.25174825174827,466.55594405594405,466.86013986013984,467.1643356643357,467.46853146853147,467.77272727272725,468.0769230769231,468.3811188811189,468.68531468531467,468.9895104895105,469.2937062937063,469.5979020979021,469.9020979020979,470.2062937062937,470.5104895104895,470.81468531468533,471.1188811188811,471.4230769230769,471.72727272727275,472.03146853146853,472.3356643356643,472.63986013986016,472.94405594405595,473.24825174825173,473.5524475524476,473.85664335664336,474.16083916083915,474.465034965035,474.7692307692308,475.07342657342656,475.3776223776224,475.6818181818182,475.986013986014,476.2902097902098,476.5944055944056,476.8986013986014,477.2027972027972,477.506993006993,477.8111888111888,478.11538461538464,478.4195804195804,478.7237762237762,479.02797202797206,479.33216783216784,479.6363636363636,479.94055944055947,480.24475524475525,480.54895104895104,480.8531468531468,481.15734265734267,481.46153846153845,481.76573426573424,482.0699300699301,482.37412587412587,482.67832167832165,482.9825174825175,483.2867132867133,483.59090909090907,483.8951048951049,484.1993006993007,484.5034965034965,484.8076923076923,485.1118881118881,485.4160839160839,485.72027972027973,486.0244755244755,486.3286713286713,486.63286713286715,486.93706293706293,487.2412587412587,487.54545454545456,487.84965034965035,488.15384615384613,488.458041958042,488.76223776223776,489.06643356643355,489.3706293706294,489.6748251748252,489.97902097902096,490.2832167832168,490.5874125874126,490.8916083916084,491.1958041958042,491.5,491.8041958041958,492.1083916083916,492.4125874125874,492.7167832167832,493.02097902097904,493.3251748251748,493.6293706293706,493.93356643356645,494.23776223776224,494.541958041958,494.84615384615387,495.15034965034965,495.45454545454544,495.7587412587413,496.06293706293707,496.36713286713285,496.6713286713287,496.9755244755245,497.27972027972027,497.5839160839161,497.8881118881119,498.1923076923077,498.4965034965035,498.8006993006993,499.1048951048951,499.40909090909093,499.7132867132867,500.0174825174825,500.32167832167835,500.62587412587413,500.9300699300699,501.23426573426576,501.53846153846155,501.84265734265733,502.1468531468532,502.45104895104896,502.75524475524475,503.05944055944053,503.3636363636364,503.66783216783216,503.97202797202794,504.2762237762238,504.5804195804196,504.88461538461536,505.1888111888112,505.493006993007,505.7972027972028,506.1013986013986,506.4055944055944,506.7097902097902,507.013986013986,507.3181818181818,507.6223776223776,507.92657342657344,508.2307692307692,508.534965034965,508.83916083916085,509.14335664335664,509.4475524475524,509.75174825174827,510.05594405594405,510.36013986013984,510.6643356643357,510.96853146853147,511.27272727272725,511.5769230769231,511.8811188811189,512.1853146853147,512.4895104895105,512.7937062937064,513.0979020979021,513.4020979020979,513.7062937062936,514.0104895104895,514.3146853146853,514.6188811188811,514.9230769230769,515.2272727272727,515.5314685314685,515.8356643356643,516.1398601398602,516.4440559440559,516.7482517482517,517.0524475524476,517.3566433566433,517.6608391608391,517.965034965035,518.2692307692307,518.5734265734266,518.8776223776224,519.1818181818181,519.486013986014,519.7902097902098,520.0944055944055,520.3986013986014,520.7027972027972,521.006993006993,521.3111888111888,521.6153846153846,521.9195804195804,522.2237762237762,522.527972027972,522.8321678321678,523.1363636363636,523.4405594405595,523.7447552447552,524.048951048951,524.3531468531469,524.6573426573426,524.9615384615385,525.2657342657343,525.56993006993,525.8741258741259,526.1783216783217,526.4825174825174,526.7867132867133,527.0909090909091,527.3951048951049,527.6993006993007,528.0034965034965,528.3076923076923,528.6118881118881,528.916083916084,529.2202797202797,529.5244755244755,529.8286713286714,530.1328671328671,530.4370629370629,530.7412587412588,531.0454545454545,531.3496503496503,531.6538461538462,531.9580419580419,532.2622377622378,532.5664335664336,532.8706293706293,533.1748251748252,533.479020979021,533.7832167832167,534.0874125874126,534.3916083916084,534.6958041958042,535.0,535.3041958041958,535.6083916083916,535.9125874125874,536.2167832167833,536.520979020979,536.8251748251748,537.1293706293707,537.4335664335664,537.7377622377622,538.0419580419581,538.3461538461538,538.6503496503497,538.9545454545455,539.2587412587412,539.5629370629371,539.8671328671329,540.1713286713286,540.4755244755245,540.7797202797203,541.083916083916,541.3881118881119,541.6923076923077,541.9965034965035,542.3006993006993,542.6048951048951,542.9090909090909,543.2132867132867,543.5174825174826,543.8216783216783,544.1258741258741,544.43006993007,544.7342657342657,545.0384615384615,545.3426573426574,545.6468531468531,545.951048951049,546.2552447552448,546.5594405594405,546.8636363636364,547.1678321678322,547.472027972028,547.7762237762238,548.0804195804196,548.3846153846154,548.6888111888112,548.993006993007,549.2972027972028,549.6013986013986,549.9055944055945,550.2097902097902,550.513986013986,550.8181818181819,551.1223776223776,551.4265734265734,551.7307692307693,552.034965034965,552.3391608391609,552.6433566433567,552.9475524475524,553.2517482517483,553.5559440559441,553.8601398601398,554.1643356643357,554.4685314685315,554.7727272727273,555.0769230769231,555.3811188811189,555.6853146853147,555.9895104895105,556.2937062937064,556.5979020979021,556.9020979020979,557.2062937062936,557.5104895104895,557.8146853146853,558.1188811188811,558.4230769230769,558.7272727272727,559.0314685314685,559.3356643356643,559.6398601398602,559.9440559440559,560.2482517482517,560.5524475524476,560.8566433566433,561.1608391608391,561.465034965035,561.7692307692307,562.0734265734266,562.3776223776224,562.6818181818181,562.986013986014,563.2902097902098,563.5944055944055,563.8986013986014,564.2027972027972,564.506993006993,564.8111888111888,565.1153846153846,565.4195804195804,565.7237762237762,566.027972027972,566.3321678321678,566.6363636363636,566.9405594405595,567.2447552447552,567.548951048951,567.8531468531469,568.1573426573426,568.4615384615385,568.7657342657343,569.06993006993,569.3741258741259,569.6783216783217,569.9825174825174,570.2867132867133,570.5909090909091,570.8951048951049,571.1993006993007,571.5034965034965,571.8076923076923,572.1118881118881,572.416083916084,572.7202797202797,573.0244755244755,573.3286713286714,573.6328671328671,573.9370629370629,574.2412587412588,574.5454545454545,574.8496503496503,575.1538461538462,575.4580419580419,575.7622377622378,576.0664335664336,576.3706293706293,576.6748251748252,576.979020979021,577.2832167832167,577.5874125874126,577.8916083916084,578.1958041958042,578.5,578.8041958041958,579.1083916083916,579.4125874125874,579.7167832167833,580.020979020979,580.3251748251748,580.6293706293707,580.9335664335664,581.2377622377622,581.5419580419581,581.8461538461538,582.1503496503497,582.4545454545455,582.7587412587412,583.0629370629371,583.3671328671329,583.6713286713286,583.9755244755245,584.2797202797203,584.583916083916,584.8881118881119,585.1923076923077,585.4965034965035,585.8006993006993,586.1048951048951,586.4090909090909,586.7132867132867,587.0174825174826,587.3216783216783,587.6258741258741,587.93006993007,588.2342657342657,588.5384615384615,588.8426573426574,589.1468531468531,589.451048951049,589.7552447552448,590.0594405594405,590.3636363636364,590.6678321678322,590.972027972028,591.2762237762238,591.5804195804196,591.8846153846154,592.1888111888112,592.493006993007,592.7972027972028,593.1013986013986,593.4055944055945,593.7097902097902,594.013986013986,594.3181818181819,594.6223776223776,594.9265734265734,595.2307692307693,595.534965034965,595.8391608391609,596.1433566433567,596.4475524475524,596.7517482517483,597.0559440559441,597.3601398601398,597.6643356643357,597.9685314685315,598.2727272727273,598.5769230769231,598.8811188811189,599.1853146853147,599.4895104895105,599.7937062937064,600.0979020979021,600.4020979020979,600.7062937062936,601.0104895104895,601.3146853146853,601.6188811188811,601.9230769230769,602.2272727272727,602.5314685314685,602.8356643356643,603.1398601398602,603.4440559440559,603.7482517482517,604.0524475524476,604.3566433566433,604.6608391608391,604.965034965035,605.2692307692307,605.5734265734266,605.8776223776224,606.1818181818181,606.486013986014,606.7902097902098,607.0944055944055,607.3986013986014,607.7027972027972,608.006993006993,608.3111888111888,608.6153846153846,608.9195804195804,609.2237762237762,609.527972027972,609.8321678321678,610.1363636363636,610.4405594405595,610.7447552447552,611.048951048951,611.3531468531469,611.6573426573426,611.9615384615385,612.2657342657343,612.56993006993,612.8741258741259,613.1783216783217,613.4825174825174,613.7867132867133,614.0909090909091,614.3951048951049,614.6993006993007,615.0034965034965,615.3076923076923,615.6118881118881,615.916083916084,616.2202797202797,616.5244755244755,616.8286713286714,617.1328671328671,617.4370629370629,617.7412587412588,618.0454545454545,618.3496503496503,618.6538461538462,618.9580419580419,619.2622377622378,619.5664335664336,619.8706293706293,620.1748251748252,620.479020979021,620.7832167832167,621.0874125874126,621.3916083916084,621.6958041958042,622.0,622.3041958041958,622.6083916083916,622.9125874125874,623.2167832167833,623.520979020979,623.8251748251748,624.1293706293707,624.4335664335664,624.7377622377622,625.0419580419581,625.3461538461538,625.6503496503497,625.9545454545455,626.2587412587412,626.5629370629371,626.8671328671329,627.1713286713286,627.4755244755245,627.7797202797203,628.083916083916,628.3881118881119,628.6923076923077,628.9965034965035,629.3006993006993,629.6048951048951,629.9090909090909,630.2132867132867,630.5174825174826,630.8216783216783,631.1258741258741,631.43006993007,631.7342657342657,632.0384615384615,632.3426573426574,632.6468531468531,632.951048951049,633.2552447552448,633.5594405594405,633.8636363636364,634.1678321678322,634.472027972028,634.7762237762238,635.0804195804196,635.3846153846154,635.6888111888112,635.993006993007,636.2972027972028,636.6013986013986,636.9055944055945,637.2097902097902,637.513986013986,637.8181818181819,638.1223776223776,638.4265734265734,638.7307692307693,639.034965034965,639.3391608391609,639.6433566433567,639.9475524475524,640.2517482517483,640.5559440559441,640.8601398601398,641.1643356643357,641.4685314685315,641.7727272727273,642.0769230769231,642.3811188811189,642.6853146853147,642.9895104895105,643.2937062937064,643.5979020979021,643.9020979020979,644.2062937062936,644.5104895104895,644.8146853146853,645.1188811188811,645.4230769230769,645.7272727272727,646.0314685314685,646.3356643356643,646.6398601398602,646.9440559440559,647.2482517482517,647.5524475524476,647.8566433566433,648.1608391608391,648.465034965035,648.7692307692307,649.0734265734266,649.3776223776224,649.6818181818181,649.986013986014,650.2902097902098,650.5944055944055,650.8986013986014,651.2027972027972,651.506993006993,651.8111888111888,652.1153846153846,652.4195804195804,652.7237762237762,653.027972027972,653.3321678321678,653.6363636363636,653.9405594405595,654.2447552447552,654.548951048951,654.8531468531469,655.1573426573426,655.4615384615385,655.7657342657343,656.06993006993,656.3741258741259,656.6783216783217,656.9825174825174,657.2867132867133,657.5909090909091,657.8951048951049,658.1993006993007,658.5034965034965,658.8076923076923,659.1118881118881,659.416083916084,659.7202797202797,660.0244755244755,660.3286713286714,660.6328671328671,660.9370629370629,661.2412587412588,661.5454545454545,661.8496503496503,662.1538461538462,662.4580419580419,662.7622377622378,663.0664335664336,663.3706293706293,663.6748251748252,663.979020979021,664.2832167832167,664.5874125874126,664.8916083916084,665.1958041958042,665.5,665.8041958041958,666.1083916083916,666.4125874125874,666.7167832167833,667.020979020979,667.3251748251748,667.6293706293707,667.9335664335664,668.2377622377622,668.5419580419581,668.8461538461538,669.1503496503497,669.4545454545455,669.7587412587412,670.0629370629371,670.3671328671329,670.6713286713286,670.9755244755245,671.2797202797203,671.583916083916,671.8881118881119,672.1923076923077,672.4965034965035,672.8006993006993,673.1048951048951,673.4090909090909,673.7132867132867,674.0174825174826,674.3216783216783,674.6258741258741,674.93006993007,675.2342657342657,675.5384615384615,675.8426573426574,676.1468531468531,676.451048951049,676.7552447552448,677.0594405594405,677.3636363636364,677.6678321678322,677.972027972028,678.2762237762238,678.5804195804196,678.8846153846154,679.1888111888112,679.493006993007,679.7972027972028,680.1013986013986,680.4055944055945,680.7097902097902,681.013986013986,681.3181818181819,681.6223776223776,681.9265734265734,682.2307692307693,682.534965034965,682.8391608391609,683.1433566433567,683.4475524475524,683.7517482517483,684.0559440559441,684.3601398601398,684.6643356643357,684.9685314685315,685.2727272727273,685.5769230769231,685.8811188811189,686.1853146853147,686.4895104895105,686.7937062937064,687.0979020979021,687.4020979020979,687.7062937062936,688.0104895104895,688.3146853146853,688.6188811188811,688.9230769230769,689.2272727272727,689.5314685314685,689.8356643356643,690.1398601398602,690.4440559440559,690.7482517482517,691.0524475524476,691.3566433566433,691.6608391608391,691.965034965035,692.2692307692307,692.5734265734266,692.8776223776224,693.1818181818181,693.486013986014,693.7902097902098,694.0944055944055,694.3986013986014,694.7027972027972,695.006993006993,695.3111888111888,695.6153846153846,695.9195804195804,696.2237762237762,696.527972027972,696.8321678321678,697.1363636363636,697.4405594405595,697.7447552447552,698.048951048951,698.3531468531469,698.6573426573426,698.9615384615385,699.2657342657343,699.56993006993,699.8741258741259,700.1783216783217,700.4825174825174,700.7867132867133,701.0909090909091,701.3951048951049,701.6993006993007,702.0034965034965,702.3076923076923,702.6118881118881,702.916083916084,703.2202797202797,703.5244755244755,703.8286713286714,704.1328671328671,704.4370629370629,704.7412587412588,705.0454545454545,705.3496503496503,705.6538461538462,705.9580419580419,706.2622377622378,706.5664335664336,706.8706293706293,707.1748251748252,707.479020979021,707.7832167832167,708.0874125874126,708.3916083916084,708.6958041958042,709.0]}
},{}],68:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[-1.0e-300,-9.995004995054944e-301,-9.99000999010989e-301,-9.985014985164834e-301,-9.980019980219781e-301,-9.975024975274727e-301,-9.97002997032967e-301,-9.965034965384617e-301,-9.960039960439559e-301,-9.955044955494506e-301,-9.950049950549451e-301,-9.945054945604395e-301,-9.940059940659342e-301,-9.935064935714285e-301,-9.930069930769232e-301,-9.925074925824176e-301,-9.920079920879121e-301,-9.915084915934066e-301,-9.91008991098901e-301,-9.905094906043957e-301,-9.9000999010989e-301,-9.895104896153846e-301,-9.890109891208793e-301,-9.885114886263736e-301,-9.880119881318683e-301,-9.875124876373627e-301,-9.870129871428572e-301,-9.865134866483516e-301,-9.86013986153846e-301,-9.855144856593408e-301,-9.850149851648351e-301,-9.845154846703298e-301,-9.840159841758242e-301,-9.835164836813187e-301,-9.830169831868134e-301,-9.825174826923076e-301,-9.820179821978023e-301,-9.815184817032966e-301,-9.810189812087912e-301,-9.805194807142857e-301,-9.800199802197802e-301,-9.795204797252749e-301,-9.790209792307693e-301,-9.785214787362638e-301,-9.780219782417583e-301,-9.775224777472527e-301,-9.770229772527474e-301,-9.765234767582417e-301,-9.760239762637363e-301,-9.755244757692308e-301,-9.750249752747253e-301,-9.745254747802198e-301,-9.740259742857144e-301,-9.735264737912089e-301,-9.730269732967032e-301,-9.725274728021978e-301,-9.720279723076923e-301,-9.715284718131868e-301,-9.710289713186812e-301,-9.705294708241759e-301,-9.700299703296704e-301,-9.69530469835165e-301,-9.690309693406595e-301,-9.685314688461536e-301,-9.680319683516483e-301,-9.675324678571429e-301,-9.670329673626374e-301,-9.665334668681319e-301,-9.660339663736263e-301,-9.65534465879121e-301,-9.650349653846153e-301,-9.6453546489011e-301,-9.640359643956045e-301,-9.635364639010989e-301,-9.630369634065934e-301,-9.625374629120878e-301,-9.620379624175825e-301,-9.61538461923077e-301,-9.610389614285715e-301,-9.60539460934066e-301,-9.600399604395604e-301,-9.595404599450551e-301,-9.590409594505493e-301,-9.58541458956044e-301,-9.580419584615385e-301,-9.575424579670329e-301,-9.570429574725276e-301,-9.56543456978022e-301,-9.560439564835166e-301,-9.555444559890111e-301,-9.550449554945055e-301,-9.545454550000002e-301,-9.540459545054944e-301,-9.53546454010989e-301,-9.530469535164834e-301,-9.52547453021978e-301,-9.520479525274727e-301,-9.51548452032967e-301,-9.510489515384617e-301,-9.50549451043956e-301,-9.500499505494506e-301,-9.49550450054945e-301,-9.490509495604395e-301,-9.485514490659342e-301,-9.480519485714285e-301,-9.47552448076923e-301,-9.470529475824176e-301,-9.465534470879121e-301,-9.460539465934068e-301,-9.455544460989012e-301,-9.450549456043955e-301,-9.4455544510989e-301,-9.440559446153846e-301,-9.435564441208791e-301,-9.430569436263736e-301,-9.425574431318681e-301,-9.420579426373627e-301,-9.415584421428572e-301,-9.410589416483517e-301,-9.405594411538461e-301,-9.400599406593408e-301,-9.395604401648351e-301,-9.390609396703297e-301,-9.385614391758242e-301,-9.380619386813187e-301,-9.375624381868132e-301,-9.370629376923078e-301,-9.365634371978023e-301,-9.360639367032968e-301,-9.355644362087912e-301,-9.350649357142857e-301,-9.345654352197802e-301,-9.340659347252748e-301,-9.335664342307693e-301,-9.330669337362638e-301,-9.325674332417583e-301,-9.320679327472529e-301,-9.315684322527472e-301,-9.310689317582417e-301,-9.305694312637363e-301,-9.300699307692308e-301,-9.295704302747253e-301,-9.290709297802197e-301,-9.285714292857144e-301,-9.280719287912087e-301,-9.275724282967034e-301,-9.27072927802198e-301,-9.265734273076921e-301,-9.260739268131868e-301,-9.255744263186812e-301,-9.250749258241759e-301,-9.245754253296704e-301,-9.240759248351648e-301,-9.235764243406595e-301,-9.230769238461538e-301,-9.225774233516485e-301,-9.220779228571429e-301,-9.215784223626372e-301,-9.21078921868132e-301,-9.205794213736263e-301,-9.20079920879121e-301,-9.195804203846153e-301,-9.1908091989011e-301,-9.185814193956045e-301,-9.180819189010989e-301,-9.175824184065936e-301,-9.170829179120878e-301,-9.165834174175825e-301,-9.160839169230768e-301,-9.155844164285714e-301,-9.15084915934066e-301,-9.145854154395604e-301,-9.140859149450551e-301,-9.135864144505495e-301,-9.13086913956044e-301,-9.125874134615387e-301,-9.120879129670329e-301,-9.115884124725276e-301,-9.11088911978022e-301,-9.105894114835165e-301,-9.10089910989011e-301,-9.095904104945055e-301,-9.090909100000002e-301,-9.085914095054946e-301,-9.080919090109891e-301,-9.075924085164834e-301,-9.07092908021978e-301,-9.065934075274725e-301,-9.06093907032967e-301,-9.055944065384616e-301,-9.05094906043956e-301,-9.045954055494506e-301,-9.040959050549451e-301,-9.035964045604397e-301,-9.03096904065934e-301,-9.025974035714285e-301,-9.02097903076923e-301,-9.015984025824176e-301,-9.010989020879121e-301,-9.005994015934065e-301,-9.000999010989012e-301,-8.996004006043957e-301,-8.991009001098902e-301,-8.986013996153846e-301,-8.98101899120879e-301,-8.976023986263736e-301,-8.971028981318682e-301,-8.966033976373627e-301,-8.961038971428572e-301,-8.956043966483517e-301,-8.951048961538463e-301,-8.946053956593406e-301,-8.941058951648353e-301,-8.936063946703297e-301,-8.931068941758242e-301,-8.926073936813187e-301,-8.92107893186813e-301,-8.916083926923078e-301,-8.911088921978023e-301,-8.906093917032968e-301,-8.901098912087913e-301,-8.896103907142857e-301,-8.891108902197802e-301,-8.886113897252746e-301,-8.881118892307693e-301,-8.876123887362638e-301,-8.871128882417582e-301,-8.866133877472529e-301,-8.861138872527472e-301,-8.856143867582419e-301,-8.851148862637364e-301,-8.846153857692306e-301,-8.841158852747253e-301,-8.836163847802197e-301,-8.831168842857144e-301,-8.826173837912087e-301,-8.821178832967033e-301,-8.81618382802198e-301,-8.811188823076923e-301,-8.80619381813187e-301,-8.801198813186814e-301,-8.796203808241757e-301,-8.791208803296702e-301,-8.786213798351648e-301,-8.781218793406595e-301,-8.776223788461538e-301,-8.771228783516483e-301,-8.766233778571429e-301,-8.761238773626374e-301,-8.756243768681321e-301,-8.751248763736263e-301,-8.746253758791208e-301,-8.741258753846153e-301,-8.736263748901099e-301,-8.731268743956044e-301,-8.726273739010989e-301,-8.721278734065936e-301,-8.71628372912088e-301,-8.711288724175825e-301,-8.706293719230769e-301,-8.701298714285714e-301,-8.69630370934066e-301,-8.691308704395604e-301,-8.68631369945055e-301,-8.681318694505495e-301,-8.67632368956044e-301,-8.671328684615385e-301,-8.66633367967033e-301,-8.661338674725276e-301,-8.65634366978022e-301,-8.651348664835165e-301,-8.64635365989011e-301,-8.641358654945055e-301,-8.63636365e-301,-8.631368645054946e-301,-8.626373640109891e-301,-8.621378635164836e-301,-8.616383630219781e-301,-8.611388625274723e-301,-8.60639362032967e-301,-8.601398615384616e-301,-8.59640361043956e-301,-8.591408605494506e-301,-8.58641360054945e-301,-8.581418595604397e-301,-8.57642359065934e-301,-8.571428585714287e-301,-8.56643358076923e-301,-8.561438575824174e-301,-8.556443570879121e-301,-8.551448565934065e-301,-8.546453560989012e-301,-8.541458556043957e-301,-8.5364635510989e-301,-8.531468546153847e-301,-8.526473541208791e-301,-8.521478536263738e-301,-8.51648353131868e-301,-8.511488526373625e-301,-8.506493521428572e-301,-8.501498516483516e-301,-8.496503511538463e-301,-8.491508506593406e-301,-8.486513501648353e-301,-8.481518496703298e-301,-8.476523491758242e-301,-8.471528486813187e-301,-8.466533481868131e-301,-8.461538476923078e-301,-8.456543471978021e-301,-8.451548467032967e-301,-8.446553462087914e-301,-8.441558457142857e-301,-8.436563452197804e-301,-8.431568447252748e-301,-8.426573442307691e-301,-8.421578437362638e-301,-8.416583432417582e-301,-8.411588427472529e-301,-8.406593422527472e-301,-8.401598417582418e-301,-8.396603412637363e-301,-8.391608407692308e-301,-8.386613402747255e-301,-8.381618397802199e-301,-8.376623392857142e-301,-8.371628387912087e-301,-8.366633382967033e-301,-8.361638378021978e-301,-8.356643373076923e-301,-8.351648368131868e-301,-8.346653363186814e-301,-8.341658358241759e-301,-8.336663353296704e-301,-8.331668348351648e-301,-8.326673343406593e-301,-8.321678338461538e-301,-8.316683333516484e-301,-8.311688328571429e-301,-8.306693323626374e-301,-8.301698318681318e-301,-8.296703313736265e-301,-8.29170830879121e-301,-8.286713303846153e-301,-8.281718298901099e-301,-8.276723293956042e-301,-8.27172828901099e-301,-8.266733284065934e-301,-8.26173827912088e-301,-8.256743274175825e-301,-8.25174826923077e-301,-8.246753264285715e-301,-8.241758259340657e-301,-8.236763254395604e-301,-8.23176824945055e-301,-8.226773244505495e-301,-8.22177823956044e-301,-8.216783234615384e-301,-8.21178822967033e-301,-8.206793224725276e-301,-8.201798219780221e-301,-8.196803214835166e-301,-8.191808209890108e-301,-8.186813204945055e-301,-8.181818199999999e-301,-8.176823195054946e-301,-8.171828190109891e-301,-8.166833185164835e-301,-8.161838180219782e-301,-8.156843175274725e-301,-8.151848170329672e-301,-8.146853165384616e-301,-8.14185816043956e-301,-8.136863155494506e-301,-8.13186815054945e-301,-8.126873145604397e-301,-8.12187814065934e-301,-8.116883135714286e-301,-8.111888130769232e-301,-8.106893125824176e-301,-8.101898120879123e-301,-8.096903115934065e-301,-8.09190811098901e-301,-8.086913106043955e-301,-8.0819181010989e-301,-8.076923096153848e-301,-8.071928091208791e-301,-8.066933086263736e-301,-8.061938081318682e-301,-8.056943076373627e-301,-8.051948071428572e-301,-8.046953066483516e-301,-8.041958061538461e-301,-8.036963056593406e-301,-8.031968051648352e-301,-8.026973046703297e-301,-8.021978041758242e-301,-8.016983036813189e-301,-8.011988031868133e-301,-8.006993026923076e-301,-8.001998021978021e-301,-7.997003017032967e-301,-7.992008012087914e-301,-7.987013007142857e-301,-7.982018002197802e-301,-7.977022997252748e-301,-7.972027992307693e-301,-7.967032987362638e-301,-7.962037982417583e-301,-7.957042977472527e-301,-7.952047972527472e-301,-7.947052967582418e-301,-7.942057962637363e-301,-7.937062957692308e-301,-7.932067952747253e-301,-7.927072947802199e-301,-7.922077942857144e-301,-7.917082937912089e-301,-7.912087932967033e-301,-7.907092928021976e-301,-7.902097923076923e-301,-7.897102918131868e-301,-7.892107913186814e-301,-7.887112908241759e-301,-7.882117903296703e-301,-7.87712289835165e-301,-7.872127893406593e-301,-7.867132888461538e-301,-7.862137883516484e-301,-7.857142878571427e-301,-7.852147873626374e-301,-7.847152868681318e-301,-7.842157863736265e-301,-7.83716285879121e-301,-7.832167853846153e-301,-7.8271728489011e-301,-7.822177843956042e-301,-7.81718283901099e-301,-7.812187834065933e-301,-7.807192829120878e-301,-7.802197824175825e-301,-7.797202819230769e-301,-7.792207814285716e-301,-7.787212809340659e-301,-7.782217804395606e-301,-7.777222799450551e-301,-7.772227794505493e-301,-7.76723278956044e-301,-7.762237784615384e-301,-7.75724277967033e-301,-7.752247774725274e-301,-7.74725276978022e-301,-7.742257764835166e-301,-7.73726275989011e-301,-7.732267754945057e-301,-7.727272749999999e-301,-7.722277745054944e-301,-7.717282740109891e-301,-7.712287735164835e-301,-7.707292730219782e-301,-7.702297725274725e-301,-7.69730272032967e-301,-7.692307715384616e-301,-7.687312710439561e-301,-7.682317705494508e-301,-7.67732270054945e-301,-7.672327695604395e-301,-7.66733269065934e-301,-7.662337685714286e-301,-7.65734268076923e-301,-7.652347675824176e-301,-7.647352670879121e-301,-7.642357665934067e-301,-7.637362660989012e-301,-7.632367656043955e-301,-7.6273726510989e-301,-7.622377646153846e-301,-7.617382641208791e-301,-7.612387636263736e-301,-7.607392631318682e-301,-7.602397626373627e-301,-7.597402621428572e-301,-7.592407616483517e-301,-7.587412611538461e-301,-7.582417606593406e-301,-7.577422601648352e-301,-7.572427596703297e-301,-7.567432591758242e-301,-7.562437586813187e-301,-7.557442581868131e-301,-7.552447576923076e-301,-7.547452571978023e-301,-7.542457567032968e-301,-7.537462562087912e-301,-7.532467557142857e-301,-7.527472552197803e-301,-7.522477547252748e-301,-7.517482542307693e-301,-7.512487537362638e-301,-7.507492532417584e-301,-7.502497527472527e-301,-7.497502522527472e-301,-7.492507517582418e-301,-7.487512512637363e-301,-7.482517507692308e-301,-7.477522502747253e-301,-7.472527497802197e-301,-7.467532492857142e-301,-7.462537487912088e-301,-7.457542482967034e-301,-7.452547478021978e-301,-7.447552473076923e-301,-7.4425574681318685e-301,-7.437562463186813e-301,-7.432567458241758e-301,-7.427572453296703e-301,-7.422577448351649e-301,-7.417582443406594e-301,-7.4125874384615384e-301,-7.407592433516484e-301,-7.402597428571428e-301,-7.397602423626373e-301,-7.3926074186813194e-301,-7.387612413736264e-301,-7.382617408791209e-301,-7.377622403846154e-301,-7.372627398901099e-301,-7.367632393956043e-301,-7.362637389010989e-301,-7.3576423840659346e-301,-7.35264737912088e-301,-7.347652374175824e-301,-7.342657369230769e-301,-7.337662364285714e-301,-7.33266735934066e-301,-7.327672354395605e-301,-7.32267734945055e-301,-7.317682344505494e-301,-7.312687339560439e-301,-7.307692334615385e-301,-7.302697329670331e-301,-7.297702324725274e-301,-7.29270731978022e-301,-7.287712314835165e-301,-7.28271730989011e-301,-7.277722304945055e-301,-7.272727300000001e-301,-7.267732295054945e-301,-7.26273729010989e-301,-7.2577422851648356e-301,-7.252747280219781e-301,-7.247752275274725e-301,-7.2427572703296705e-301,-7.237762265384616e-301,-7.232767260439561e-301,-7.2277722554945054e-301,-7.222777250549451e-301,-7.217782245604395e-301,-7.212787240659341e-301,-7.2077922357142865e-301,-7.202797230769231e-301,-7.197802225824176e-301,-7.1928072208791206e-301,-7.187812215934066e-301,-7.182817210989011e-301,-7.177822206043956e-301,-7.172827201098902e-301,-7.167832196153847e-301,-7.162837191208791e-301,-7.157842186263736e-301,-7.152847181318681e-301,-7.147852176373627e-301,-7.142857171428572e-301,-7.137862166483517e-301,-7.132867161538461e-301,-7.127872156593406e-301,-7.122877151648352e-301,-7.117882146703298e-301,-7.112887141758242e-301,-7.107892136813187e-301,-7.102897131868132e-301,-7.097902126923077e-301,-7.092907121978022e-301,-7.087912117032967e-301,-7.082917112087912e-301,-7.077922107142857e-301,-7.0729271021978026e-301,-7.067932097252748e-301,-7.0629370923076914e-301,-7.0579420873626375e-301,-7.052947082417583e-301,-7.047952077472528e-301,-7.042957072527473e-301,-7.037962067582418e-301,-7.032967062637362e-301,-7.027972057692308e-301,-7.0229770527472535e-301,-7.017982047802198e-301,-7.012987042857143e-301,-7.0079920379120876e-301,-7.002997032967033e-301,-6.998002028021979e-301,-6.993007023076923e-301,-6.988012018131869e-301,-6.983017013186813e-301,-6.978022008241758e-301,-6.9730270032967035e-301,-6.968031998351648e-301,-6.963036993406594e-301,-6.9580419884615385e-301,-6.953046983516484e-301,-6.948051978571428e-301,-6.9430569736263734e-301,-6.938061968681319e-301,-6.933066963736265e-301,-6.928071958791209e-301,-6.923076953846154e-301,-6.918081948901099e-301,-6.913086943956044e-301,-6.908091939010989e-301,-6.903096934065935e-301,-6.898101929120879e-301,-6.893106924175824e-301,-6.8881119192307696e-301,-6.883116914285715e-301,-6.8781219093406584e-301,-6.8731269043956045e-301,-6.86813189945055e-301,-6.863136894505495e-301,-6.85814188956044e-301,-6.853146884615384e-301,-6.848151879670329e-301,-6.843156874725275e-301,-6.8381618697802205e-301,-6.833166864835166e-301,-6.828171859890109e-301,-6.823176854945055e-301,-6.81818185e-301,-6.813186845054946e-301,-6.80819184010989e-301,-6.803196835164836e-301,-6.79820183021978e-301,-6.793206825274725e-301,-6.7882118203296705e-301,-6.783216815384616e-301,-6.778221810439561e-301,-6.7732268054945055e-301,-6.768231800549451e-301,-6.763236795604396e-301,-6.7582417906593404e-301,-6.7532467857142865e-301,-6.748251780769231e-301,-6.743256775824176e-301,-6.738261770879121e-301,-6.733266765934066e-301,-6.728271760989011e-301,-6.7232767560439556e-301,-6.718281751098902e-301,-6.713286746153846e-301,-6.708291741208791e-301,-6.703296736263737e-301,-6.698301731318682e-301,-6.693306726373626e-301,-6.6883117214285715e-301,-6.683316716483517e-301,-6.678321711538462e-301,-6.673326706593407e-301,-6.668331701648351e-301,-6.663336696703296e-301,-6.658341691758242e-301,-6.6533466868131875e-301,-6.648351681868133e-301,-6.643356676923076e-301,-6.638361671978022e-301,-6.633366667032967e-301,-6.628371662087913e-301,-6.623376657142858e-301,-6.618381652197802e-301,-6.613386647252747e-301,-6.608391642307692e-301,-6.6033966373626376e-301,-6.598401632417583e-301,-6.593406627472527e-301,-6.5884116225274725e-301,-6.583416617582418e-301,-6.578421612637363e-301,-6.5734266076923074e-301,-6.5684316027472535e-301,-6.563436597802198e-301,-6.558441592857143e-301,-6.5534465879120885e-301,-6.548451582967033e-301,-6.543456578021978e-301,-6.538461573076923e-301,-6.533466568131869e-301,-6.528471563186813e-301,-6.523476558241758e-301,-6.518481553296704e-301,-6.513486548351648e-301,-6.508491543406593e-301,-6.5034965384615385e-301,-6.498501533516484e-301,-6.493506528571429e-301,-6.4885115236263735e-301,-6.483516518681319e-301,-6.478521513736263e-301,-6.473526508791209e-301,-6.4685315038461545e-301,-6.4635364989011e-301,-6.458541493956043e-301,-6.453546489010989e-301,-6.448551484065934e-301,-6.44355647912088e-301,-6.438561474175825e-301,-6.433566469230769e-301,-6.428571464285714e-301,-6.423576459340659e-301,-6.4185814543956046e-301,-6.413586449450551e-301,-6.408591444505494e-301,-6.4035964395604395e-301,-6.398601434615385e-301,-6.39360642967033e-301,-6.3886114247252745e-301,-6.38361641978022e-301,-6.378621414835165e-301,-6.37362640989011e-301,-6.3686314049450555e-301,-6.3636364e-301,-6.358641395054945e-301,-6.3536463901098904e-301,-6.348651385164836e-301,-6.343656380219781e-301,-6.338661375274725e-301,-6.333666370329671e-301,-6.328671365384615e-301,-6.323676360439561e-301,-6.3186813554945055e-301,-6.313686350549451e-301,-6.308691345604396e-301,-6.3036963406593405e-301,-6.298701335714286e-301,-6.293706330769231e-301,-6.288711325824176e-301,-6.2837163208791215e-301,-6.278721315934066e-301,-6.273726310989011e-301,-6.268731306043956e-301,-6.263736301098901e-301,-6.258741296153847e-301,-6.253746291208791e-301,-6.248751286263736e-301,-6.243756281318681e-301,-6.238761276373626e-301,-6.2337662714285716e-301,-6.228771266483518e-301,-6.223776261538461e-301,-6.2187812565934065e-301,-6.213786251648352e-301,-6.208791246703297e-301,-6.203796241758242e-301,-6.198801236813187e-301,-6.193806231868132e-301,-6.188811226923077e-301,-6.1838162219780225e-301,-6.178821217032967e-301,-6.173826212087911e-301,-6.1688312071428574e-301,-6.163836202197803e-301,-6.158841197252748e-301,-6.153846192307692e-301,-6.148851187362637e-301,-6.143856182417582e-301,-6.138861177472528e-301,-6.133866172527473e-301,-6.128871167582418e-301,-6.123876162637363e-301,-6.1188811576923075e-301,-6.113886152747253e-301,-6.108891147802198e-301,-6.103896142857143e-301,-6.0989011379120885e-301,-6.093906132967033e-301,-6.088911128021978e-301,-6.083916123076923e-301,-6.078921118131869e-301,-6.073926113186814e-301,-6.068931108241758e-301,-6.063936103296704e-301,-6.058941098351648e-301,-6.053946093406593e-301,-6.0489510884615394e-301,-6.043956083516484e-301,-6.038961078571428e-301,-6.0339660736263735e-301,-6.028971068681319e-301,-6.023976063736264e-301,-6.0189810587912085e-301,-6.013986053846154e-301,-6.008991048901099e-301,-6.003996043956044e-301,-5.9990010390109895e-301,-5.994006034065935e-301,-5.989011029120878e-301,-5.9840160241758244e-301,-5.97902101923077e-301,-5.974026014285715e-301,-5.969031009340659e-301,-5.964036004395604e-301,-5.959040999450549e-301,-5.954045994505495e-301,-5.94905098956044e-301,-5.944055984615385e-301,-5.939060979670329e-301,-5.9340659747252745e-301,-5.92907096978022e-301,-5.924075964835166e-301,-5.91908095989011e-301,-5.914085954945055e-301,-5.90909095e-301,-5.904095945054945e-301,-5.89910094010989e-301,-5.894105935164836e-301,-5.889110930219781e-301,-5.884115925274725e-301,-5.879120920329671e-301,-5.874125915384615e-301,-5.86913091043956e-301,-5.8641359054945064e-301,-5.859140900549451e-301,-5.854145895604396e-301,-5.8491508906593405e-301,-5.844155885714286e-301,-5.839160880769231e-301,-5.834165875824176e-301,-5.829170870879121e-301,-5.824175865934066e-301,-5.819180860989011e-301,-5.8141858560439565e-301,-5.809190851098901e-301,-5.804195846153845e-301,-5.7992008412087915e-301,-5.794205836263737e-301,-5.789210831318682e-301,-5.7842158263736256e-301,-5.779220821428571e-301,-5.774225816483516e-301,-5.769230811538462e-301,-5.764235806593407e-301,-5.759240801648352e-301,-5.754245796703296e-301,-5.7492507917582415e-301,-5.744255786813187e-301,-5.739260781868133e-301,-5.734265776923077e-301,-5.729270771978022e-301,-5.724275767032967e-301,-5.719280762087912e-301,-5.7142857571428575e-301,-5.709290752197803e-301,-5.704295747252747e-301,-5.6993007423076924e-301,-5.694305737362638e-301,-5.689310732417582e-301,-5.684315727472527e-301,-5.679320722527473e-301,-5.674325717582418e-301,-5.669330712637363e-301,-5.6643357076923076e-301,-5.659340702747253e-301,-5.654345697802198e-301,-5.649350692857143e-301,-5.6443556879120886e-301,-5.639360682967033e-301,-5.634365678021978e-301,-5.6293706730769235e-301,-5.624375668131868e-301,-5.619380663186813e-301,-5.6143856582417585e-301,-5.609390653296704e-301,-5.604395648351649e-301,-5.599400643406593e-301,-5.594405638461538e-301,-5.589410633516484e-301,-5.584415628571429e-301,-5.5794206236263744e-301,-5.574425618681318e-301,-5.569430613736263e-301,-5.5644356087912085e-301,-5.559440603846154e-301,-5.5544455989011e-301,-5.549450593956044e-301,-5.544455589010989e-301,-5.539460584065934e-301,-5.534465579120879e-301,-5.5294705741758245e-301,-5.52447556923077e-301,-5.519480564285714e-301,-5.5144855593406594e-301,-5.509490554395605e-301,-5.50449554945055e-301,-5.499500544505494e-301,-5.49450553956044e-301,-5.489510534615385e-301,-5.48451552967033e-301,-5.4795205247252746e-301,-5.47452551978022e-301,-5.469530514835164e-301,-5.46453550989011e-301,-5.459540504945056e-301,-5.4545455e-301,-5.449550495054945e-301,-5.44455549010989e-301,-5.439560485164835e-301,-5.434565480219781e-301,-5.4295704752747255e-301,-5.424575470329671e-301,-5.419580465384616e-301,-5.41458546043956e-301,-5.409590455494505e-301,-5.404595450549451e-301,-5.399600445604396e-301,-5.3946054406593414e-301,-5.389610435714286e-301,-5.38461543076923e-301,-5.3796204258241755e-301,-5.374625420879122e-301,-5.369630415934067e-301,-5.3646354109890105e-301,-5.359640406043956e-301,-5.354645401098901e-301,-5.349650396153846e-301,-5.3446553912087915e-301,-5.339660386263736e-301,-5.334665381318681e-301,-5.3296703763736264e-301,-5.324675371428572e-301,-5.319680366483517e-301,-5.314685361538461e-301,-5.309690356593407e-301,-5.304695351648352e-301,-5.299700346703297e-301,-5.294705341758242e-301,-5.289710336813187e-301,-5.284715331868131e-301,-5.279720326923077e-301,-5.274725321978023e-301,-5.269730317032967e-301,-5.264735312087912e-301,-5.259740307142857e-301,-5.254745302197802e-301,-5.249750297252748e-301,-5.2447552923076925e-301,-5.239760287362638e-301,-5.234765282417582e-301,-5.2297702774725274e-301,-5.224775272527472e-301,-5.219780267582418e-301,-5.214785262637363e-301,-5.209790257692308e-301,-5.204795252747253e-301,-5.199800247802197e-301,-5.1948052428571426e-301,-5.189810237912089e-301,-5.184815232967034e-301,-5.179820228021978e-301,-5.174825223076923e-301,-5.169830218131868e-301,-5.164835213186813e-301,-5.159840208241759e-301,-5.154845203296703e-301,-5.149850198351648e-301,-5.1448551934065935e-301,-5.139860188461539e-301,-5.134865183516484e-301,-5.129870178571428e-301,-5.124875173626374e-301,-5.119880168681319e-301,-5.114885163736264e-301,-5.1098901587912094e-301,-5.104895153846153e-301,-5.099900148901098e-301,-5.094905143956044e-301,-5.08991013901099e-301,-5.084915134065935e-301,-5.079920129120879e-301,-5.074925124175824e-301,-5.069930119230769e-301,-5.064935114285715e-301,-5.0599401093406595e-301,-5.054945104395605e-301,-5.049950099450549e-301,-5.0449550945054944e-301,-5.03996008956044e-301,-5.034965084615385e-301,-5.02997007967033e-301,-5.024975074725275e-301,-5.01998006978022e-301,-5.014985064835164e-301,-5.0099900598901096e-301,-5.004995054945056e-301,-5.00000005e-301,-4.995005045054945e-301,-4.99001004010989e-301,-4.985015035164835e-301,-4.98002003021978e-301,-4.9750250252747255e-301,-4.970030020329671e-301,-4.965035015384615e-301,-4.9600400104395605e-301,-4.955045005494506e-301,-4.950050000549451e-301,-4.945054995604395e-301,-4.940059990659341e-301,-4.935064985714286e-301,-4.930069980769231e-301,-4.9250749758241764e-301,-4.92007997087912e-301,-4.915084965934066e-301,-4.910089960989011e-301,-4.905094956043957e-301,-4.900099951098902e-301,-4.8951049461538455e-301,-4.890109941208791e-301,-4.885114936263737e-301,-4.880119931318682e-301,-4.8751249263736265e-301,-4.870129921428571e-301,-4.865134916483516e-301,-4.8601399115384614e-301,-4.855144906593407e-301,-4.850149901648352e-301,-4.845154896703297e-301,-4.840159891758242e-301,-4.835164886813187e-301,-4.830169881868132e-301,-4.8251748769230766e-301,-4.820179871978023e-301,-4.815184867032967e-301,-4.810189862087912e-301,-4.805194857142857e-301,-4.800199852197802e-301,-4.795204847252747e-301,-4.7902098423076925e-301,-4.785214837362638e-301,-4.780219832417582e-301,-4.7752248274725275e-301,-4.770229822527473e-301,-4.765234817582417e-301,-4.760239812637363e-301,-4.755244807692308e-301,-4.750249802747253e-301,-4.745254797802198e-301,-4.7402597928571434e-301,-4.735264787912087e-301,-4.730269782967033e-301,-4.725274778021978e-301,-4.720279773076924e-301,-4.715284768131869e-301,-4.7102897631868125e-301,-4.705294758241758e-301,-4.700299753296704e-301,-4.695304748351649e-301,-4.690309743406594e-301,-4.685314738461538e-301,-4.680319733516483e-301,-4.6753247285714285e-301,-4.6703297236263745e-301,-4.665334718681319e-301,-4.660339713736263e-301,-4.655344708791209e-301,-4.650349703846154e-301,-4.645354698901099e-301,-4.640359693956044e-301,-4.635364689010989e-301,-4.630369684065934e-301,-4.625374679120879e-301,-4.620379674175825e-301,-4.615384669230769e-301,-4.610389664285714e-301,-4.6053946593406596e-301,-4.600399654395605e-301,-4.595404649450549e-301,-4.5904096445054945e-301,-4.58541463956044e-301,-4.580419634615384e-301,-4.57542462967033e-301,-4.570429624725275e-301,-4.56543461978022e-301,-4.560439614835165e-301,-4.55544460989011e-301,-4.550449604945055e-301,-4.5454546e-301,-4.540459595054945e-301,-4.535464590109891e-301,-4.530469585164835e-301,-4.5254745802197795e-301,-4.520479575274725e-301,-4.515484570329671e-301,-4.510489565384616e-301,-4.505494560439561e-301,-4.500499555494505e-301,-4.49550455054945e-301,-4.4905095456043955e-301,-4.4855145406593416e-301,-4.480519535714287e-301,-4.47552453076923e-301,-4.470529525824176e-301,-4.465534520879121e-301,-4.460539515934066e-301,-4.4555445109890114e-301,-4.450549506043956e-301,-4.445554501098901e-301,-4.440559496153846e-301,-4.435564491208792e-301,-4.430569486263736e-301,-4.425574481318681e-301,-4.4205794763736266e-301,-4.415584471428572e-301,-4.410589466483517e-301,-4.4055944615384615e-301,-4.400599456593406e-301,-4.395604451648351e-301,-4.390609446703297e-301,-4.385614441758242e-301,-4.380619436813187e-301,-4.375624431868132e-301,-4.370629426923077e-301,-4.365634421978022e-301,-4.360639417032967e-301,-4.355644412087912e-301,-4.350649407142858e-301,-4.345654402197802e-301,-4.340659397252747e-301,-4.335664392307692e-301,-4.330669387362638e-301,-4.325674382417583e-301,-4.3206793774725275e-301,-4.315684372527472e-301,-4.310689367582417e-301,-4.3056943626373625e-301,-4.3006993576923086e-301,-4.295704352747253e-301,-4.2907093478021974e-301,-4.285714342857143e-301,-4.280719337912088e-301,-4.275724332967033e-301,-4.270729328021979e-301,-4.265734323076923e-301,-4.260739318131868e-301,-4.255744313186813e-301,-4.250749308241759e-301,-4.245754303296703e-301,-4.240759298351648e-301,-4.2357642934065936e-301,-4.230769288461539e-301,-4.225774283516484e-301,-4.2207792785714285e-301,-4.215784273626373e-301,-4.210789268681319e-301,-4.205794263736264e-301,-4.2007992587912095e-301,-4.195804253846154e-301,-4.190809248901098e-301,-4.185814243956044e-301,-4.180819239010989e-301,-4.175824234065934e-301,-4.1708292291208794e-301,-4.165834224175824e-301,-4.160839219230769e-301,-4.155844214285714e-301,-4.150849209340659e-301,-4.145854204395605e-301,-4.14085919945055e-301,-4.1358641945054946e-301,-4.13086918956044e-301,-4.125874184615384e-301,-4.1208791796703295e-301,-4.1158841747252756e-301,-4.11088916978022e-301,-4.1058941648351644e-301,-4.10089915989011e-301,-4.095904154945055e-301,-4.09090915e-301,-4.0859141450549455e-301,-4.08091914010989e-301,-4.075924135164835e-301,-4.07092913021978e-301,-4.065934125274726e-301,-4.06093912032967e-301,-4.055944115384615e-301,-4.050949110439561e-301,-4.045954105494506e-301,-4.040959100549451e-301,-4.0359640956043955e-301,-4.03096909065934e-301,-4.025974085714286e-301,-4.020979080769231e-301,-4.0159840758241766e-301,-4.010989070879121e-301,-4.005994065934065e-301,-4.000999060989011e-301,-3.996004056043957e-301,-3.991009051098902e-301,-3.9860140461538464e-301,-3.981019041208791e-301,-3.976024036263736e-301,-3.971029031318681e-301,-3.966034026373627e-301,-3.961039021428572e-301,-3.956044016483516e-301,-3.9510490115384616e-301,-3.946054006593407e-301,-3.941059001648351e-301,-3.9360639967032965e-301,-3.931068991758243e-301,-3.926073986813187e-301,-3.921078981868132e-301,-3.916083976923077e-301,-3.911088971978022e-301,-3.906093967032967e-301,-3.9010989620879125e-301,-3.896103957142857e-301,-3.891108952197802e-301,-3.886113947252747e-301,-3.881118942307693e-301,-3.876123937362637e-301,-3.871128932417582e-301,-3.866133927472528e-301,-3.861138922527473e-301,-3.856143917582418e-301,-3.8511489126373625e-301,-3.846153907692307e-301,-3.841158902747253e-301,-3.836163897802198e-301,-3.8311688928571436e-301,-3.826173887912087e-301,-3.8211788829670324e-301,-3.8161838780219785e-301,-3.811188873076923e-301,-3.806193868131868e-301,-3.8011988631868134e-301,-3.796203858241759e-301,-3.791208853296703e-301,-3.786213848351648e-301,-3.781218843406594e-301,-3.776223838461538e-301,-3.771228833516484e-301,-3.7662338285714286e-301,-3.761238823626374e-301,-3.756243818681319e-301,-3.7512488137362635e-301,-3.746253808791209e-301,-3.741258803846154e-301,-3.736263798901099e-301,-3.731268793956044e-301,-3.726273789010989e-301,-3.7212787840659342e-301,-3.716283779120879e-301,-3.7112887741758243e-301,-3.7062937692307696e-301,-3.701298764285714e-301,-3.6963037593406597e-301,-3.6913087543956045e-301,-3.6863137494505494e-301,-3.6813187445054946e-301,-3.6763237395604395e-301,-3.6713287346153847e-301,-3.66633372967033e-301,-3.661338724725275e-301,-3.6563437197802197e-301,-3.6513487148351653e-301,-3.6463537098901098e-301,-3.641358704945055e-301,-3.6363637000000003e-301,-3.631368695054945e-301,-3.6263736901098904e-301,-3.621378685164835e-301,-3.6163836802197805e-301,-3.6113886752747253e-301,-3.6063936703296706e-301,-3.601398665384616e-301,-3.5964036604395602e-301,-3.5914086554945055e-301,-3.5864136505494508e-301,-3.5814186456043956e-301,-3.5764236406593404e-301,-3.5714286357142857e-301,-3.566433630769231e-301,-3.5614386258241758e-301,-3.556443620879121e-301,-3.551448615934066e-301,-3.546453610989011e-301,-3.541458606043956e-301,-3.5364636010989012e-301,-3.531468596153846e-301,-3.5264735912087913e-301,-3.5214785862637366e-301,-3.516483581318681e-301,-3.5114885763736267e-301,-3.506493571428571e-301,-3.5014985664835164e-301,-3.496503561538462e-301,-3.4915085565934065e-301,-3.4865135516483517e-301,-3.481518546703297e-301,-3.476523541758242e-301,-3.4715285368131867e-301,-3.466533531868132e-301,-3.461538526923077e-301,-3.456543521978022e-301,-3.4515485170329673e-301,-3.446553512087912e-301,-3.441558507142857e-301,-3.4365635021978022e-301,-3.4315684972527475e-301,-3.4265734923076923e-301,-3.4215784873626376e-301,-3.416583482417583e-301,-3.4115884774725273e-301,-3.406593472527473e-301,-3.4015984675824173e-301,-3.3966034626373626e-301,-3.3916084576923083e-301,-3.3866134527472527e-301,-3.381618447802198e-301,-3.3766234428571432e-301,-3.371628437912088e-301,-3.366633432967033e-301,-3.3616384280219777e-301,-3.3566434230769234e-301,-3.3516484181318683e-301,-3.346653413186813e-301,-3.3416584082417583e-301,-3.336663403296703e-301,-3.331668398351648e-301,-3.3266733934065937e-301,-3.3216783884615385e-301,-3.3166833835164834e-301,-3.311688378571429e-301,-3.3066933736263735e-301,-3.3016983686813187e-301,-3.2967033637362636e-301,-3.291708358791209e-301,-3.286713353846154e-301,-3.281718348901099e-301,-3.276723343956044e-301,-3.2717283390109886e-301,-3.2667333340659343e-301,-3.261738329120879e-301,-3.256743324175824e-301,-3.2517483192307696e-301,-3.2467533142857145e-301,-3.2417583093406593e-301,-3.2367633043956046e-301,-3.2317682994505494e-301,-3.2267732945054943e-301,-3.22177828956044e-301,-3.2167832846153848e-301,-3.2117882796703296e-301,-3.2067932747252753e-301,-3.2017982697802197e-301,-3.196803264835165e-301,-3.19180825989011e-301,-3.186813254945055e-301,-3.1818182500000003e-301,-3.176823245054945e-301,-3.1718282401098904e-301,-3.166833235164835e-301,-3.1618382302197805e-301,-3.1568432252747254e-301,-3.15184822032967e-301,-3.146853215384616e-301,-3.1418582104395607e-301,-3.1368632054945056e-301,-3.1318682005494504e-301,-3.1268731956043957e-301,-3.1218781906593405e-301,-3.1168831857142858e-301,-3.111888180769231e-301,-3.106893175824176e-301,-3.1018981708791207e-301,-3.096903165934066e-301,-3.091908160989011e-301,-3.0869131560439556e-301,-3.0819181510989013e-301,-3.0769231461538466e-301,-3.071928141208791e-301,-3.0669331362637367e-301,-3.061938131318681e-301,-3.0569431263736263e-301,-3.0519481214285716e-301,-3.0469531164835164e-301,-3.0419581115384617e-301,-3.0369631065934065e-301,-3.0319681016483518e-301,-3.0269730967032966e-301,-3.021978091758242e-301,-3.0169830868131867e-301,-3.011988081868132e-301,-3.0069930769230772e-301,-3.001998071978022e-301,-2.997003067032967e-301,-2.992008062087912e-301,-2.9870130571428574e-301,-2.982018052197802e-301,-2.9770230472527475e-301,-2.9720280423076928e-301,-2.9670330373626372e-301,-2.962038032417583e-301,-2.9570430274725273e-301,-2.9520480225274726e-301,-2.947053017582418e-301,-2.9420580126373627e-301,-2.937063007692308e-301,-2.9320680027472528e-301,-2.927072997802198e-301,-2.922077992857143e-301,-2.917082987912088e-301,-2.912087982967033e-301,-2.9070929780219782e-301,-2.902097973076923e-301,-2.8971029681318683e-301,-2.892107963186813e-301,-2.887112958241758e-301,-2.8821179532967037e-301,-2.877122948351648e-301,-2.8721279434065933e-301,-2.8671329384615386e-301,-2.8621379335164834e-301,-2.8571429285714287e-301,-2.8521479236263735e-301,-2.847152918681319e-301,-2.8421579137362636e-301,-2.837162908791209e-301,-2.832167903846154e-301,-2.8271728989010986e-301,-2.8221778939560443e-301,-2.817182889010989e-301,-2.812187884065934e-301,-2.807192879120879e-301,-2.8021978741758244e-301,-2.7972028692307693e-301,-2.7922078642857145e-301,-2.7872128593406594e-301,-2.7822178543956042e-301,-2.77722284945055e-301,-2.7722278445054943e-301,-2.7672328395604396e-301,-2.762237834615385e-301,-2.7572428296703297e-301,-2.752247824725275e-301,-2.7472528197802198e-301,-2.742257814835165e-301,-2.73726280989011e-301,-2.732267804945055e-301,-2.7272728000000004e-301,-2.722277795054945e-301,-2.7172827901098905e-301,-2.7122877851648353e-301,-2.70729278021978e-301,-2.7022977752747254e-301,-2.6973027703296703e-301,-2.6923077653846155e-301,-2.6873127604395608e-301,-2.6823177554945056e-301,-2.6773227505494505e-301,-2.6723277456043957e-301,-2.6673327406593406e-301,-2.662337735714286e-301,-2.6573427307692307e-301,-2.652347725824176e-301,-2.647352720879121e-301,-2.6423577159340656e-301,-2.6373627109890113e-301,-2.6323677060439557e-301,-2.627372701098901e-301,-2.6223776961538466e-301,-2.617382691208791e-301,-2.6123876862637363e-301,-2.6073926813186816e-301,-2.6023976763736264e-301,-2.5974026714285712e-301,-2.5924076664835165e-301,-2.5874126615384617e-301,-2.5824176565934066e-301,-2.577422651648352e-301,-2.5724276467032967e-301,-2.567432641758242e-301,-2.5624376368131868e-301,-2.557442631868132e-301,-2.552447626923077e-301,-2.547452621978022e-301,-2.5424576170329674e-301,-2.537462612087912e-301,-2.5324676071428575e-301,-2.527472602197802e-301,-2.522477597252747e-301,-2.517482592307693e-301,-2.5124875873626373e-301,-2.5074925824175825e-301,-2.5024975774725278e-301,-2.4975025725274726e-301,-2.4925075675824175e-301,-2.4875125626373627e-301,-2.482517557692308e-301,-2.477522552747253e-301,-2.472527547802198e-301,-2.467532542857143e-301,-2.4625375379120878e-301,-2.457542532967033e-301,-2.4525475280219783e-301,-2.447552523076923e-301,-2.4425575181318684e-301,-2.4375625131868136e-301,-2.432567508241758e-301,-2.4275725032967033e-301,-2.422577498351648e-301,-2.4175824934065934e-301,-2.4125874884615387e-301,-2.4075924835164835e-301,-2.4025974785714288e-301,-2.3976024736263736e-301,-2.392607468681319e-301,-2.3876124637362637e-301,-2.3826174587912085e-301,-2.3776224538461542e-301,-2.372627448901099e-301,-2.367632443956044e-301,-2.362637439010989e-301,-2.357642434065934e-301,-2.352647429120879e-301,-2.3476524241758245e-301,-2.3426574192307693e-301,-2.337662414285714e-301,-2.33266740934066e-301,-2.3276724043956043e-301,-2.3226773994505495e-301,-2.3176823945054944e-301,-2.3126873895604396e-301,-2.307692384615385e-301,-2.3026973796703297e-301,-2.297702374725275e-301,-2.2927073697802194e-301,-2.287712364835165e-301,-2.28271735989011e-301,-2.2777223549450548e-301,-2.2727273500000004e-301,-2.2677323450549453e-301,-2.26273734010989e-301,-2.2577423351648354e-301,-2.2527473302197802e-301,-2.247752325274725e-301,-2.2427573203296707e-301,-2.2377623153846156e-301,-2.2327673104395604e-301,-2.2277723054945057e-301,-2.2227773005494505e-301,-2.2177822956043958e-301,-2.2127872906593406e-301,-2.207792285714286e-301,-2.202797280769231e-301,-2.1978022758241756e-301,-2.1928072708791212e-301,-2.1878122659340657e-301,-2.182817260989011e-301,-2.177822256043956e-301,-2.172827251098901e-301,-2.1678322461538463e-301,-2.1628372412087915e-301,-2.1578422362637364e-301,-2.152847231318681e-301,-2.1478522263736265e-301,-2.1428572214285713e-301,-2.1378622164835166e-301,-2.132867211538462e-301,-2.1278722065934067e-301,-2.1228772016483515e-301,-2.1178821967032967e-301,-2.112887191758242e-301,-2.1078921868131864e-301,-2.102897181868132e-301,-2.0979021769230774e-301,-2.0929071719780218e-301,-2.0879121670329675e-301,-2.082917162087912e-301,-2.077922157142857e-301,-2.0729271521978024e-301,-2.0679321472527472e-301,-2.0629371423076925e-301,-2.0579421373626373e-301,-2.0529471324175826e-301,-2.0479521274725274e-301,-2.0429571225274727e-301,-2.0379621175824175e-301,-2.0329671126373628e-301,-2.027972107692308e-301,-2.022977102747253e-301,-2.0179820978021977e-301,-2.012987092857143e-301,-2.0079920879120882e-301,-2.0029970829670327e-301,-1.9980020780219783e-301,-1.9930070730769236e-301,-1.988012068131868e-301,-1.9830170631868137e-301,-1.978022058241758e-301,-1.9730270532967034e-301,-1.9680320483516482e-301,-1.9630370434065935e-301,-1.9580420384615387e-301,-1.953047033516483e-301,-1.948052028571429e-301,-1.9430570236263737e-301,-1.9380620186813185e-301,-1.9330670137362638e-301,-1.928072008791209e-301,-1.9230770038461534e-301,-1.918081998901099e-301,-1.913086993956044e-301,-1.9080919890109892e-301,-1.903096984065934e-301,-1.898101979120879e-301,-1.893106974175824e-301,-1.8881119692307694e-301,-1.8831169642857142e-301,-1.8781219593406595e-301,-1.8731269543956043e-301,-1.8681319494505496e-301,-1.8631369445054947e-301,-1.8581419395604395e-301,-1.8531469346153847e-301,-1.8481519296703298e-301,-1.8431569247252746e-301,-1.8381619197802197e-301,-1.8331669148351652e-301,-1.82817190989011e-301,-1.823176904945055e-301,-1.8181819e-301,-1.813186895054945e-301,-1.8081918901098902e-301,-1.8031968851648352e-301,-1.7982018802197803e-301,-1.7932068752747253e-301,-1.7882118703296704e-301,-1.7832168653846154e-301,-1.7782218604395605e-301,-1.7732268554945053e-301,-1.7682318505494506e-301,-1.7632368456043958e-301,-1.7582418406593407e-301,-1.7532468357142857e-301,-1.748251830769231e-301,-1.7432568258241758e-301,-1.7382618208791209e-301,-1.733266815934066e-301,-1.728271810989011e-301,-1.7232768060439562e-301,-1.7182818010989013e-301,-1.7132867961538461e-301,-1.7082917912087912e-301,-1.7032967862637364e-301,-1.6983017813186813e-301,-1.6933067763736265e-301,-1.6883117714285716e-301,-1.6833167664835166e-301,-1.6783217615384617e-301,-1.6733267565934065e-301,-1.6683317516483516e-301,-1.6633367467032968e-301,-1.6583417417582419e-301,-1.653346736813187e-301,-1.648351731868132e-301,-1.6433567269230768e-301,-1.638361721978022e-301,-1.633366717032967e-301,-1.628371712087912e-301,-1.6233767071428572e-301,-1.6183817021978025e-301,-1.6133866972527473e-301,-1.6083916923076923e-301,-1.6033966873626374e-301,-1.5984016824175824e-301,-1.5934066774725275e-301,-1.5884116725274727e-301,-1.5834166675824176e-301,-1.5784216626373626e-301,-1.5734266576923079e-301,-1.5684316527472527e-301,-1.5634366478021978e-301,-1.5584416428571426e-301,-1.553446637912088e-301,-1.5484516329670331e-301,-1.543456628021978e-301,-1.538461623076923e-301,-1.5334666181318683e-301,-1.5284716131868131e-301,-1.5234766082417582e-301,-1.5184816032967034e-301,-1.5134865983516485e-301,-1.5084915934065935e-301,-1.5034965884615386e-301,-1.4985015835164834e-301,-1.4935065785714285e-301,-1.4885115736263737e-301,-1.4835165686813188e-301,-1.4785215637362638e-301,-1.4735265587912089e-301,-1.468531553846154e-301,-1.463536548901099e-301,-1.458541543956044e-301,-1.4535465390109889e-301,-1.4485515340659343e-301,-1.4435565291208792e-301,-1.4385615241758242e-301,-1.4335665192307693e-301,-1.4285715142857143e-301,-1.4235765093406594e-301,-1.4185815043956044e-301,-1.4135864994505495e-301,-1.4085914945054945e-301,-1.4035964895604398e-301,-1.3986014846153846e-301,-1.3936064796703297e-301,-1.3886114747252747e-301,-1.3836164697802197e-301,-1.378621464835165e-301,-1.37362645989011e-301,-1.3686314549450549e-301,-1.3636364500000002e-301,-1.3586414450549452e-301,-1.35364644010989e-301,-1.348651435164835e-301,-1.3436564302197806e-301,-1.3386614252747254e-301,-1.3336664203296704e-301,-1.3286714153846153e-301,-1.3236764104395603e-301,-1.3186814054945056e-301,-1.3136864005494504e-301,-1.3086913956043957e-301,-1.3036963906593407e-301,-1.2987013857142858e-301,-1.2937063807692308e-301,-1.2887113758241759e-301,-1.2837163708791207e-301,-1.278721365934066e-301,-1.2737263609890112e-301,-1.268731356043956e-301,-1.2637363510989011e-301,-1.2587413461538464e-301,-1.2537463412087912e-301,-1.2487513362637363e-301,-1.2437563313186813e-301,-1.2387613263736262e-301,-1.2337663214285716e-301,-1.2287713164835167e-301,-1.2237763115384615e-301,-1.2187813065934066e-301,-1.2137863016483516e-301,-1.2087912967032967e-301,-1.203796291758242e-301,-1.1988012868131868e-301,-1.193806281868132e-301,-1.188811276923077e-301,-1.183816271978022e-301,-1.178821267032967e-301,-1.173826262087912e-301,-1.1688312571428573e-301,-1.1638362521978023e-301,-1.1588412472527474e-301,-1.1538462423076922e-301,-1.1488512373626375e-301,-1.1438562324175825e-301,-1.1388612274725273e-301,-1.1338662225274724e-301,-1.1288712175824179e-301,-1.1238762126373627e-301,-1.1188812076923077e-301,-1.1138862027472528e-301,-1.1088911978021978e-301,-1.1038961928571429e-301,-1.0989011879120877e-301,-1.093906182967033e-301,-1.088911178021978e-301,-1.083916173076923e-301,-1.0789211681318681e-301,-1.0739261631868132e-301,-1.068931158241758e-301,-1.0639361532967033e-301,-1.0589411483516485e-301,-1.0539461434065934e-301,-1.0489511384615384e-301,-1.0439561335164837e-301,-1.0389611285714285e-301,-1.0339661236263736e-301,-1.0289711186813186e-301,-1.0239761137362639e-301,-1.018981108791209e-301,-1.013986103846154e-301,-1.0089910989010988e-301,-1.0039960939560439e-301,-9.990010890109891e-302,-9.94006084065934e-302,-9.890110791208792e-302,-9.84016074175824e-302,-9.790210692307693e-302,-9.740260642857144e-302,-9.690310593406592e-302,-9.640360543956043e-302,-9.590410494505495e-302,-9.540460445054946e-302,-9.490510395604396e-302,-9.440560346153847e-302,-9.390610296703297e-302,-9.340660247252748e-302,-9.290710197802198e-302,-9.240760148351649e-302,-9.190810098901099e-302,-9.14086004945055e-302,-9.090910000000001e-302,-9.04095995054945e-302,-8.991009901098901e-302,-8.941059851648351e-302,-8.891109802197803e-302,-8.841159752747252e-302,-8.791209703296704e-302,-8.741259653846154e-302,-8.691309604395605e-302,-8.641359554945054e-302,-8.591409505494507e-302,-8.541459456043956e-302,-8.491509406593406e-302,-8.441559357142858e-302,-8.391609307692308e-302,-8.341659258241758e-302,-8.291709208791208e-302,-8.24175915934066e-302,-8.19180910989011e-302,-8.14185906043956e-302,-8.091909010989011e-302,-8.041958961538462e-302,-7.992008912087912e-302,-7.942058862637363e-302,-7.892108813186814e-302,-7.842158763736264e-302,-7.792208714285714e-302,-7.742258664835165e-302,-7.692308615384616e-302,-7.642358565934065e-302,-7.592408516483517e-302,-7.542458467032967e-302,-7.492508417582418e-302,-7.442558368131868e-302,-7.392608318681319e-302,-7.342658269230769e-302,-7.292708219780221e-302,-7.24275817032967e-302,-7.192808120879122e-302,-7.142858071428571e-302,-7.092908021978023e-302,-7.042957972527472e-302,-6.993007923076924e-302,-6.943057873626374e-302,-6.893107824175824e-302,-6.843157774725275e-302,-6.793207725274726e-302,-6.743257675824176e-302,-6.693307626373626e-302,-6.643357576923077e-302,-6.593407527472528e-302,-6.543457478021978e-302,-6.493507428571429e-302,-6.44355737912088e-302,-6.393607329670329e-302,-6.34365728021978e-302,-6.293707230769231e-302,-6.243757181318682e-302,-6.193807131868131e-302,-6.143857082417584e-302,-6.093907032967033e-302,-6.043956983516483e-302,-5.994006934065933e-302,-5.944056884615385e-302,-5.894106835164835e-302,-5.844156785714285e-302,-5.794206736263737e-302,-5.744256686813187e-302,-5.694306637362637e-302,-5.644356587912088e-302,-5.594406538461539e-302,-5.544456489010989e-302,-5.494506439560439e-302,-5.444556390109891e-302,-5.394606340659341e-302,-5.344656291208791e-302,-5.294706241758241e-302,-5.244756192307693e-302,-5.194806142857142e-302,-5.144856093406594e-302,-5.094906043956044e-302,-5.044955994505495e-302,-4.995005945054945e-302,-4.945055895604396e-302,-4.895105846153846e-302,-4.845155796703297e-302,-4.795205747252747e-302,-4.745255697802198e-302,-4.695305648351648e-302,-4.6453555989010986e-302,-4.5954055494505496e-302,-4.5454555e-302,-4.4955054505494506e-302,-4.4455554010989016e-302,-4.3956053516483516e-302,-4.3456553021978026e-302,-4.295705252747253e-302,-4.2457552032967036e-302,-4.195805153846154e-302,-4.1458551043956045e-302,-4.0959050549450555e-302,-4.0459550054945055e-302,-3.996004956043956e-302,-3.9460549065934065e-302,-3.896104857142857e-302,-3.8461548076923075e-302,-3.7962047582417585e-302,-3.7462547087912084e-302,-3.6963046593406594e-302,-3.6463546098901104e-302,-3.5964045604395604e-302,-3.5464545109890114e-302,-3.4965044615384614e-302,-3.4465544120879124e-302,-3.396604362637363e-302,-3.3466543131868134e-302,-3.2967042637362644e-302,-3.246754214285714e-302,-3.196804164835165e-302,-3.1468541153846153e-302,-3.096904065934066e-302,-3.0469540164835163e-302,-2.997003967032967e-302,-2.947053917582418e-302,-2.8971038681318683e-302,-2.847153818681319e-302,-2.797203769230769e-302,-2.74725371978022e-302,-2.69730367032967e-302,-2.647353620879121e-302,-2.5974035714285717e-302,-2.547453521978022e-302,-2.497503472527473e-302,-2.4475534230769227e-302,-2.3976033736263737e-302,-2.347653324175824e-302,-2.297703274725275e-302,-2.2477532252747251e-302,-2.1978031758241756e-302,-2.1478531263736264e-302,-2.097903076923077e-302,-2.0479530274725276e-302,-1.998002978021978e-302,-1.9480529285714286e-302,-1.8981028791208793e-302,-1.8481528296703296e-302,-1.79820278021978e-302,-1.7482527307692305e-302,-1.6983026813186815e-302,-1.648352631868132e-302,-1.5984025824175825e-302,-1.548452532967033e-302,-1.4985024835164835e-302,-1.448552434065934e-302,-1.3986023846153845e-302,-1.3486523351648352e-302,-1.2987022857142857e-302,-1.2487522362637364e-302,-1.198802186813187e-302,-1.1488521373626374e-302,-1.0989020879120879e-302,-1.0489520384615385e-302,-9.99001989010989e-303,-9.490519395604396e-303,-8.991018901098901e-303,-8.491518406593407e-303,-7.992017912087912e-303,-7.492517417582418e-303,-6.993016923076923e-303,-6.493516428571428e-303,-5.994015934065934e-303,-5.494515439560439e-303,-4.9950149450549454e-303,-4.49551445054945e-303,-3.9960139560439565e-303,-3.4965134615384614e-303,-2.9970129670329675e-303,-2.4975124725274724e-303,-1.998011978021978e-303,-1.4985114835164835e-303,-9.990109890109891e-304,-4.995104945054945e-304,-1.0e-308]}
},{}],69:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var cosh = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var tiny = require( './fixtures/julia/tiny.json' );
var large = require( './fixtures/julia/large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cosh, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic cosine', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cosh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cosine (tiny values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cosh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cosine (large values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = large.x;
	expected = large.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cosh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `1` if provided `0`', function test( t ) {
	var v = cosh( 0 );
	t.equal( v, 1.0, 'returns 1' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = cosh( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+infinity` if provided a `+infinity`', function test( t ) {
	var v = cosh( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided a `-infinity`', function test( t ) {
	var v = cosh( NINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cosh/test/test.js")
},{"./../lib":65,"./fixtures/julia/data.json":66,"./fixtures/julia/large.json":67,"./fixtures/julia/tiny.json":68,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":207}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":71,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":78}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":73,"@stdlib/math/base/special/ldexp":76}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":70}],73:[function(require,module,exports){
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

},{"./main.js":75}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":62,"@stdlib/number/float64/base/exponent":82,"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/normalize":90,"@stdlib/number/float64/base/to-words":93}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/math/base/special/ceil":60,"@stdlib/math/base/special/floor":74}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":88}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":86}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":85,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":89}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":87,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":91}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./normalize.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/smallest-normal":50,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":95}],94:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":85}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./to_words.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":94,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":98,"./polyfill.js":99,"@stdlib/assert/has-tostringtag-support":20}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":100}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":100,"./tostringtag.js":101,"@stdlib/assert/has-own-property":16}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){

},{}],104:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],105:[function(require,module,exports){
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
},{"base64-js":102,"buffer":105,"ieee754":193}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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
},{"_process":199}],108:[function(require,module,exports){
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

},{"events":106,"inherits":194,"readable-stream/lib/_stream_duplex.js":110,"readable-stream/lib/_stream_passthrough.js":111,"readable-stream/lib/_stream_readable.js":112,"readable-stream/lib/_stream_transform.js":113,"readable-stream/lib/_stream_writable.js":114,"readable-stream/lib/internal/streams/end-of-stream.js":118,"readable-stream/lib/internal/streams/pipeline.js":120}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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
},{"./_stream_readable":112,"./_stream_writable":114,"_process":199,"inherits":194}],111:[function(require,module,exports){
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
},{"./_stream_transform":113,"inherits":194}],112:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"./internal/streams/async_iterator":115,"./internal/streams/buffer_list":116,"./internal/streams/destroy":117,"./internal/streams/from":119,"./internal/streams/state":121,"./internal/streams/stream":122,"_process":199,"buffer":105,"events":106,"inherits":194,"string_decoder/":206,"util":103}],113:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"inherits":194}],114:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"./internal/streams/destroy":117,"./internal/streams/state":121,"./internal/streams/stream":122,"_process":199,"buffer":105,"inherits":194,"util-deprecate":215}],115:[function(require,module,exports){
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
},{"./end-of-stream":118,"_process":199}],116:[function(require,module,exports){
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
},{"buffer":105,"util":103}],117:[function(require,module,exports){
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
},{"_process":199}],118:[function(require,module,exports){
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
},{"../../../errors":109}],119:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],120:[function(require,module,exports){
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
},{"../../../errors":109,"./end-of-stream":118}],121:[function(require,module,exports){
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
},{"../../../errors":109}],122:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":106}],123:[function(require,module,exports){
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

},{"./":124,"get-intrinsic":188}],124:[function(require,module,exports){
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

},{"function-bind":187,"get-intrinsic":188}],125:[function(require,module,exports){
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

},{"./lib/is_arguments.js":126,"./lib/keys.js":127}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],128:[function(require,module,exports){
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

},{"has-property-descriptors":189,"object-keys":197}],129:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],130:[function(require,module,exports){
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

},{"./ToNumber":160,"./ToPrimitive":162,"./Type":167}],131:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":178,"../helpers/isPrefixOf":179,"./ToNumber":160,"./ToPrimitive":162,"./Type":167,"get-intrinsic":188}],132:[function(require,module,exports){
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

},{"get-intrinsic":188}],133:[function(require,module,exports){
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

},{"./DayWithinYear":136,"./InLeapYear":140,"./MonthFromTime":150,"get-intrinsic":188}],134:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":183,"./floor":171}],135:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":171}],136:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":134,"./DayFromYear":135,"./YearFromTime":169}],137:[function(require,module,exports){
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

},{"./modulo":172}],138:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167,"get-intrinsic":188}],139:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":171,"./modulo":172}],140:[function(require,module,exports){
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

},{"./DaysInYear":137,"./YearFromTime":169,"get-intrinsic":188}],141:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./Type":167,"has":192}],142:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":195}],143:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./Type":167,"has":192}],144:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167}],145:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":180,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/timeConstants":183}],147:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"./DateFromTime":133,"./Day":134,"./MonthFromTime":150,"./ToInteger":159,"./YearFromTime":169,"./floor":171,"./modulo":172,"get-intrinsic":188}],148:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/timeConstants":183,"./ToInteger":159}],149:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":171,"./modulo":172}],150:[function(require,module,exports){
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

},{"./DayWithinYear":136,"./InLeapYear":140}],151:[function(require,module,exports){
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

},{"../helpers/isNaN":178}],152:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":171,"./modulo":172}],153:[function(require,module,exports){
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

},{"./Type":167}],154:[function(require,module,exports){
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


},{"../helpers/isFinite":176,"./ToNumber":160,"./abs":170,"get-intrinsic":188}],155:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":183,"./DayFromYear":135}],156:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":183,"./modulo":172}],157:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],158:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":160}],159:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":178,"../helpers/sign":182,"./ToNumber":160,"./abs":170,"./floor":171}],160:[function(require,module,exports){
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

},{"./ToPrimitive":162}],161:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":132,"get-intrinsic":188}],162:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":184}],163:[function(require,module,exports){
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

},{"./IsCallable":142,"./ToBoolean":157,"./Type":167,"get-intrinsic":188,"has":192}],164:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":188}],165:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":178,"../helpers/sign":182,"./ToNumber":160,"./abs":170,"./floor":171,"./modulo":172}],166:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":160}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":134,"./modulo":172}],169:[function(require,module,exports){
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

},{"call-bind/callBound":123,"get-intrinsic":188}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":188}],171:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],172:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":181}],173:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":183,"./modulo":172}],174:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":130,"./5/AbstractRelationalComparison":131,"./5/CheckObjectCoercible":132,"./5/DateFromTime":133,"./5/Day":134,"./5/DayFromYear":135,"./5/DayWithinYear":136,"./5/DaysInYear":137,"./5/FromPropertyDescriptor":138,"./5/HourFromTime":139,"./5/InLeapYear":140,"./5/IsAccessorDescriptor":141,"./5/IsCallable":142,"./5/IsDataDescriptor":143,"./5/IsGenericDescriptor":144,"./5/IsPropertyDescriptor":145,"./5/MakeDate":146,"./5/MakeDay":147,"./5/MakeTime":148,"./5/MinFromTime":149,"./5/MonthFromTime":150,"./5/SameValue":151,"./5/SecFromTime":152,"./5/StrictEqualityComparison":153,"./5/TimeClip":154,"./5/TimeFromYear":155,"./5/TimeWithinDay":156,"./5/ToBoolean":157,"./5/ToInt32":158,"./5/ToInteger":159,"./5/ToNumber":160,"./5/ToObject":161,"./5/ToPrimitive":162,"./5/ToPropertyDescriptor":163,"./5/ToString":164,"./5/ToUint16":165,"./5/ToUint32":166,"./5/Type":167,"./5/WeekDay":168,"./5/YearFromTime":169,"./5/abs":170,"./5/floor":171,"./5/modulo":172,"./5/msFromTime":173}],175:[function(require,module,exports){
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

},{"./isMatchRecord":177,"get-intrinsic":188,"has":192}],176:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],177:[function(require,module,exports){
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

},{"has":192}],178:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],179:[function(require,module,exports){
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

},{"call-bind/callBound":123}],180:[function(require,module,exports){
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

},{"get-intrinsic":188,"has":192}],181:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],182:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{"./helpers/isPrimitive":185,"is-callable":195}],185:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":186}],188:[function(require,module,exports){
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

},{"function-bind":187,"has":192,"has-symbols":190}],189:[function(require,module,exports){
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

},{"get-intrinsic":188}],190:[function(require,module,exports){
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

},{"./shams":191}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":187}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{"./isArguments":198}],197:[function(require,module,exports){
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

},{"./implementation":196,"./isArguments":198}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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
},{"_process":199,"through":213,"timers":214}],201:[function(require,module,exports){
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

},{"buffer":105}],202:[function(require,module,exports){
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

},{"es-abstract/es5":174,"function-bind":187}],203:[function(require,module,exports){
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

},{"./implementation":202,"./polyfill":204,"./shim":205,"define-properties":128,"function-bind":187}],204:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":202}],205:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":204,"define-properties":128}],206:[function(require,module,exports){
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
},{"safe-buffer":201}],207:[function(require,module,exports){
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
},{"./lib/default_stream":208,"./lib/results":210,"./lib/test":211,"_process":199,"defined":129,"through":213,"timers":214}],208:[function(require,module,exports){
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
},{"_process":199,"fs":104,"through":213}],209:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":199,"timers":214}],210:[function(require,module,exports){
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
},{"_process":199,"events":106,"function-bind":187,"has":192,"inherits":194,"object-inspect":212,"resumer":200,"through":213,"timers":214}],211:[function(require,module,exports){
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
},{"./next_tick":209,"deep-equal":125,"defined":129,"events":106,"has":192,"inherits":194,"path":107,"string.prototype.trim":203}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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
},{"_process":199,"stream":108}],214:[function(require,module,exports){
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
},{"process/browser.js":199,"timers":214}],215:[function(require,module,exports){
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
},{}]},{},[69]);
