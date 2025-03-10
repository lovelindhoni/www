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

},{"./float64array.js":13,"@stdlib/assert/is-float64array":43}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":64}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":65}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":66}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":148}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":129}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./object.js":35,"./primitive.js":36}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/utils/native-class":148}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":37}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":40}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-object-like":50}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":42}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/get-prototype-of":138,"@stdlib/utils/native-class":148}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":44}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":148}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":46}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":159}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":49}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./ctors.js":47}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":59,"@stdlib/utils/define-nonenumerable-read-only-property":129}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":53}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":148}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":148}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":148}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":124}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./arrayfcn.js":58}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":96}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":61,"@stdlib/constants/float64/pinf":62}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":61}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":62}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":76}],76:[function(require,module,exports){
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
* Compute the cube root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/cbrt
*
* @example
* var cbrt = require( '@stdlib/math/base/special/cbrt' );
*
* var v = cbrt( 64.0 );
* // returns 4.0
*
* v = cbrt( 27.0 );
* // returns 3.0
*
* v = cbrt( 0.0 );
* // returns 0.0
*
* v = cbrt( -0.0 );
* // returns -0.0
*
* v = cbrt( -9.0 );
* // returns ~-2.08
*
* v = cbrt( NaN );
* // returns NaN
*/

// MODULES //

var cbrt = require( './main.js' );


// EXPORTS //

module.exports = cbrt;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cbrt.c?view=markup}. The implementation follows the original, but has been modified for JavaScript.
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

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var polyval = require( './polyval_p.js' );


// VARIABLES //

// 0x80000000 = 2147483648 => 1 00000000000 00000000000000000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff>>>0; // asm type annotation

// 2**32 - 1 = 4294967295 => 11111111111111111111111111111111
var HIGH_WORD_MASK = 4294967295>>>0; // asm type annotation

// 2**31 + 2**30 = 3221225472 => 11000000000000000000000000000000
var LOW_WORD_MASK = 3221225472>>>0; // asm type annotation

// 2**54
var TWO_54 = 18014398509481984.0;

// 2**31 = 0x80000000 = 2147483648 => 1 00000000000 00000000000000000000
var TWO_31 = 0x80000000>>>0; // asm type annotation

// 0x00000001 = 1 => 0 00000000000 00000000000000000001
var ONE = 0x00000001>>>0; // asm type annotation

// B1 = (1023-1023/3-0.03306235651)*2**20
var B1 = 715094163>>>0; // asm type annotation

// B2 = (1023-1023/3-54/3-0.03306235651)*2**20
var B2 = 696219795>>>0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000
var FLOAT64_SMALLEST_NORMAL_HIGH_WORD = getHighWord( FLOAT64_SMALLEST_NORMAL ); // eslint-disable-line id-length

// Words workspace:
var WORDS = [ 0>>>0, 0>>>0 ]; // asm type annotations


// MAIN //

/**
* Computes the cube root of a double-precision floating-point number.
*
* ## Method
*
* 1.  Rough cube root to \\( 5 \\) bits:
*
*     ```tex
*     \sqrt\[3\]{2^e (1+m)} \approx 2^(e/3) \biggl(1 + \frac{(e \mathrm{mod}\ 3) + m}{3}\biggr)
*     ```
*
*     where \\( e \\) is a nonnegative integer, \\( m \\) is real and in \\( \[0, 1) \\), and \\( / \\) and \\( \mathrm{mod} \\) are integer division and modulus with rounding toward \\( -\infty \\).
*
*     The RHS is always greater than or equal to the LHS and has a maximum relative error of about \\( 1 \\) in \\( 16 \\).
*
*     Adding a bias of \\( -0.03306235651 \\) to the \\( (e \mathrm{mod} 3+ m )/ 3 \\) term reduces the error to about \\( 1 \\) in \\( 32 \\).
*
*     With the IEEE floating point representation, for finite positive normal values, ordinary integer division of the value in bits magically gives almost exactly the RHS of the above provided we first subtract the exponent bias (\\( 1023 \\) for doubles) and later add it back.
*
*     We do the subtraction virtually to keep \\( e \geq 0 \\) so that ordinary integer division rounds toward \\( -\infty \\); this is also efficient.
*
* 2.  New cube root to \\( 23 \\) bits:
*
*     ```tex
*     \sqrt[3]{x} = t \cdot \sqrt\[3\]{x/t^3} \approx t \mathrm{P}(t^3/x)
*     ```
*
*     where \\( \mathrm{P}(r) \\) is a polynomial of degree \\( 4 \\) that approximates \\( 1 / \sqrt\[3\]{r} \\) to within \\( 2^{-23.5} \\) when \\( |r - 1| < 1/10 \\).
*
*     The rough approximation has produced \\( t \\) such than \\( |t/sqrt\[3\]{x} - 1| \lesssim 1/32 \\), and cubing this gives us bounds for \\( r = t^3/x \\).
*
* 3.  Round \\( t \\) away from \\( 0 \\) to \\( 23 \\) bits (sloppily except for ensuring that the result is larger in magnitude than \\( \sqrt\[3\]{x} \\) but not much more than \\( 2 \\) 23-bit ulps larger).
*
*     With rounding toward zero, the error bound would be \\( \approx 5/6 \\) instead of \\( \approx 4/6 \\).
*
*     With a maximum error of \\( 2 \\) 23-bit ulps in the rounded \\( t \\), the infinite-precision error in the Newton approximation barely affects the third digit in the final error \\( 0.667 \\); the error in the rounded \\( t \\) can be up to about \\( 3 \\) 23-bit ulps before the final error is larger than \\( 0.667 \\) ulps.
*
* 4.  Perform one step of a Newton iteration to get \\( 53 \\) bits with an error of \\( < 0.667 \\) ulps.
*
*
* @param {number} x - input value
* @returns {number} cube root
*
* @example
* var v = cbrt( 64.0 );
* // returns 4.0
*
* @example
* var v = cbrt( 27.0 );
* // returns 3.0
*
* @example
* var v = cbrt( 0.0 );
* // returns 0.0
*
* @example
* var v = cbrt( -9.0 );
* // returns ~-2.08
*
* @example
* var v = cbrt( NaN );
* // returns NaN
*/
function cbrt( x ) {
	var sgn;
	var hx;
	var hw;
	var r;
	var s;
	var t;
	var w;
	if (
		x === 0.0 || // handles +-0
		isnan( x ) ||
		isinfinite( x )
	) {
		return x;
	}
	hx = getHighWord( x )>>>0;
	sgn = (hx & SIGN_MASK)>>>0;
	hx &= ABS_MASK;

	// Rough cbrt...
	if ( hx < FLOAT64_SMALLEST_NORMAL_HIGH_WORD ) {
		t = TWO_54 * x;
		hw = ( getHighWord( t )&ABS_MASK )>>>0;
		hw = ( ( (hw/3)>>>0 ) + B2 )>>>0;
		t = fromWords( sgn|hw, 0 );
	} else {
		t = 0.0;
		hw = ( ( (hx/3)>>>0 ) + B1 )>>>0;
		t = setHighWord( t, sgn|hw );
	}
	// New cbrt...
	r = ( t*t ) * ( t/x );
	t *= polyval( r );

	// Round `t` away from `0` to `23` bits...
	toWords( WORDS, t );
	if ( WORDS[ 1 ]&TWO_31 ) {
		// Perform manual addition, since we are split across two words...
		WORDS[ 0 ] += ONE;  // carry the one
		WORDS[ 1 ] &= ~TWO_31; // clear the bit
	} else {
		WORDS[ 1 ] |= TWO_31;
	}
	t = fromWords( WORDS[0]&HIGH_WORD_MASK, WORDS[1]&LOW_WORD_MASK );

	// Newton iteration...
	s = t * t; // `t*t` is exact
	r = x / s; // error `<= 0.5` ulps; `|r| < |t|`
	w = t + t; // `t+t` is exact
	r = ( r-t ) / ( w+r ); // `r-t` is exact; `w+r ~= 3*t`
	t += t * r; // error `<= 0.5 + 0.5/3 + eps`

	return t;
}


// EXPORTS //

module.exports = cbrt;

},{"./polyval_p.js":79,"@stdlib/constants/float64/smallest-normal":63,"@stdlib/math/base/assert/is-infinite":67,"@stdlib/math/base/assert/is-nan":69,"@stdlib/number/float64/base/from-words":98,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/set-high-word":105,"@stdlib/number/float64/base/to-words":107}],79:[function(require,module,exports){
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
		return 1.87595182427177;
	}
	return 1.87595182427177 + (x * (-1.8849797954337717 + (x * (1.6214297201053545 + (x * (-0.758397934778766 + (x * 0.14599619288661245))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],80:[function(require,module,exports){
module.exports={"expected":[-4.641588833612779e66,-2.7108125414841653e68,-3.4154069257873256e68,-3.9096638617043493e68,-4.303141279611747e68,-4.635418036622312e68,-4.925866423606693e68,-5.185590403653221e68,-5.421617144833752e68,-5.638708927827073e68,-5.840259782133321e68,-6.028783950485213e68,-6.206201930652543e68,-6.374017715313268e68,-6.533433724795023e68,-6.685428179921247e68,-6.830808850858518e68,-6.970251406201511e68,-7.104327411960393e68,-7.233525188052582e68,-7.358265620722861e68,-7.478914339581764e68,-7.595791226744377e68,-7.709177936162852e68,-7.819323907146848e68,-7.926451223241238e68,-8.030758575074756e68,-8.132424520228405e68,-8.231610186025725e68,-8.328461526775463e68,-8.423111221620822e68,-8.515680280194655e68,-8.606279408968251e68,-8.69501018026672e68,-8.78196603752222e68,-8.867233163812284e68,-8.950891235623453e68,-9.033014079751765e68,-9.113670248051017e68,-9.192923522179692e68,-9.270833358436696e68,-9.347455281107316e68,-9.422841231381775e68,-9.49703987779599e68,-9.570096893228407e68,-9.642055202729366e68,-9.712955205830398e68,-9.78283497645572e68,-9.851730443118313e68,-9.919675551712834e68,-9.986702412905003e68,-1.0052841435852186e69,-1.0118121449764521e69,-1.0182569814623585e69,-1.0246212522210926e69,-1.0309074288457382e69,-1.0371178638002203e69,-1.0432547981745849e69,-1.0493203688089075e69,-1.0553166148471797e69,-1.061245483775625e69,-1.0671088369938795e69,-1.072908454962203e69,-1.0786460419632745e69,-1.084323230513059e69,-1.0899415854516673e69,-1.0955026077419642e69,-1.1010077380009e69,-1.10645835978606e69,-1.1118558026577367e69,-1.117201345034871e69,-1.1224962168614771e69,-1.1277416020986038e69,-1.1329386410555064e69,-1.1380884325724507e69,-1.1431920360664668e69,-1.1482504734503575e69,-1.1532647309343764e69,-1.1582357607191713e69,-1.1631644825878606e69,-1.1680517854044496e69,-1.1728985285251906e69,-1.1777055431289594e69,-1.1824736334722147e69,-1.187203578073675e69,-1.191896130833435e69,-1.1965520220908733e69,-1.2011719596253717e69,-1.2057566296035564e69,-1.210306697476493e69,-1.2148228088300067e69,-1.2193055901910743e69,-1.2237556497930082e69,-1.2281735783019644e69,-1.2325599495071237e69,-1.2369153209767252e69,-1.2412402346819854e69,-1.24553521759079e69,-1.2498007822329194e69,-1.2540374272384489e69,-1.258245637850851e69,-1.262425886416234e69,-1.2665786328500461e69,-1.2707043250824957e69,-1.2748033994838566e69,-1.2788762812707454e69,-1.2829233848944019e69,-1.2869451144119251e69,-1.2909418638413697e69,-1.2949140175015437e69,-1.2988619503373023e69,-1.3027860282310835e69,-1.3066866083013824e69,-1.3105640391888274e69,-1.3144186613304744e69,-1.318250807222907e69,-1.3220608016746881e69,-1.3258489620486865e69,-1.329615598494762e69,-1.333361014173277e69,-1.3370855054698643e69,-1.3407893622018682e69,-1.3444728678168424e69,-1.3481362995834778e69,-1.3517799287753044e69,-1.3554040208474987e69,-1.3590088356071064e69,-1.3625946273769781e69,-1.3661616451536974e69,-1.3697101327597622e69,-1.3732403289902801e69,-1.3767524677544068e69,-1.3802467782117598e69,-1.3837234849040232e69,-1.3871828078819424e69,-1.3906249628279114e69,-1.3940501611743288e69,-1.3974586102179053e69,-1.4008505132300848e69,-1.4042260695637412e69,-1.407585474756302e69,-1.4109289206294417e69,-1.4142565953854832e69,-1.4175686837006395e69,-1.420865366815218e69,-1.4241468226209098e69,-1.4274132257452749e69,-1.4306647476335325e69,-1.4339015566277632e69,-1.437123818043616e69,-1.440331694244621e69,-1.4435253447141928e69,-1.4467049261254156e69,-1.449870592408689e69,-1.4530224948173154e69,-1.4561607819911042e69,-1.4592856000180652e69,-1.4623970924942598e69,-1.4654954005818775e69,-1.4685806630656005e69,-1.471653016407318e69,-1.474712594799245e69,-1.47775953021551e69,-1.480793952462254e69,-1.4838159892263023e69,-1.4868257661224508e69,-1.48982340673942e69,-1.4928090326845192e69,-1.495782763627064e69,-1.498744717340591e69,-1.5016950097439089e69,-1.5046337549410252e69,-1.5075610652599846e69,-1.5104770512906558e69,-1.5133818219215023e69,-1.5162754843753673e69,-1.5191581442443059e69,-1.5220299055234976e69,-1.5248908706442637e69,-1.5277411405062228e69,-1.5305808145086085e69,-1.5334099905807761e69,-1.5362287652119255e69,-1.539037233480063e69,-1.541835489080225e69,-1.5446236243519877e69,-1.5474017303062851e69,-1.5501698966515532e69,-1.552928211819225e69,-1.5556767629885924e69,-1.558415636111056e69,-1.5611449159337803e69,-1.5638646860227708e69,-1.5665750287853934e69,-1.5692760254923478e69,-1.5719677562991149e69,-1.5746503002668909e69,-1.5773237353830246e69,-1.5799881385809707e69,-1.5826435857597733e69,-1.5852901518030946e69,-1.587927910597799e69,-1.5905569350521071e69,-1.5931772971133308e69,-1.595789067785201e69,-1.598392317144801e69,-1.6009871143591125e69,-1.6035735277011903e69,-1.6061516245659703e69,-1.6087214714857254e69,-1.6112831341451756e69,-1.6138366773962634e69,-1.6163821652726029e69,-1.6189196610036107e69,-1.621449227028329e69,-1.6239709250089462e69,-1.6264848158440258e69,-1.628990959681449e69,-1.6314894159310799e69,-1.6339802432771593e69,-1.6364634996904361e69,-1.638939242440041e69,-1.6414075281051082e69,-1.6438684125861569e69,-1.646321951116232e69,-1.6487681982718134e69,-1.6512072079835007e69,-1.6536390335464761e69,-1.6560637276307533e69,-1.6584813422912172e69,-1.6608919289774584e69,-1.66329553854341e69,-1.6656922212567866e69,-1.668082026808339e69,-1.6704650043209186e69,-1.6728412023583651e69,-1.6752106689342148e69,-1.67757345152024e69,-1.6799295970548186e69,-1.682279151951139e69,-1.6846221621052489e69,-1.6869586729039421e69,-1.6892887292324986e69,-1.6916123754822707e69,-1.6939296555581273e69,-1.696240612885754e69,-1.6985452904188144e69,-1.7008437306459774e69,-1.7031359755978093e69,-1.705422066853539e69,-1.7077020455476944e69,-1.7099759523766168e69,-1.7122438276048534e69,-1.714505711071431e69,-1.7167616421960166e69,-1.7190116599849612e69,-1.7212558030372369e69,-1.723494109550263e69,-1.7257266173256287e69,-1.7279533637747104e69,-1.7301743859241903e69,-1.732389720421472e69,-1.7345994035400053e69,-1.7368034711845108e69,-1.739001958896115e69,-1.741194901857394e69,-1.7433823348973277e69,-1.7455642924961686e69,-1.7477408087902242e69,-1.7499119175765577e69,-1.7520776523176056e69,-1.754238046145718e69,-1.756393131867616e69,-1.7585429419687804e69,-1.7606875086177566e69,-1.7628268636703947e69,-1.7649610386740113e69,-1.7670900648714833e69,-1.7692139732052746e69,-1.7713327943213923e69,-1.773446558573279e69,-1.7755552960256394e69,-1.7776590364582024e69,-1.7797578093694234e69,-1.7818516439801237e69,-1.7839405692370713e69,-1.786024613816502e69,-1.788103806127584e69,-1.790178174315827e69,-1.7922477462664324e69,-1.794312549607595e69,-1.7963726117137475e69,-1.7984279597087547e69,-1.8004786204690555e69,-1.802524620626757e69,-1.8045659865726774e69,-1.8066027444593426e69,-1.8086349202039324e69,-1.8106625394911866e69,-1.812685627776258e69,-1.8147042102875275e69,-1.816718312029371e69,-1.8187279577848862e69,-1.8207331721185748e69,-1.8227339793789875e69,-1.8247304037013223e69,-1.8267224690099905e69,-1.8287101990211364e69,-1.830693617245124e69,-1.832672746988983e69,-1.8346476113588202e69,-1.8366182332621923e69,-1.8385846354104458e69,-1.840546840321018e69,-1.8425048703197087e69,-1.844458747542915e69,-1.8464084939398316e69,-1.848354131274624e69,-1.8502956811285637e69,-1.852233164902137e69,-1.8541666038171187e69,-1.8560960189186196e69,-1.858021431077101e69,-1.8599428609903623e69,-1.8618603291854993e69,-1.863773856020832e69,-1.8656834616878103e69,-1.867589166212885e69,-1.869490989459359e69,-1.8713889511292082e69,-1.8732830707648777e69,-1.8751733677510524e69,-1.8770598613164033e69,-1.8789425705353087e69,-1.8808215143295514e69,-1.8826967114699908e69,-1.8845681805782167e69,-1.8864359401281727e69,-1.888300008447764e69,-1.8901604037204374e69,-1.8920171439867454e69,-1.8938702471458833e69,-1.895719730957208e69,-1.8975656130417373e69,-1.899407910883625e69,-1.901246641831621e69,-1.903081823100506e69,-1.904913471772513e69,-1.9067416047987235e69,-1.9085662390004506e69,-1.9103873910705987e69,-1.912205077575011e69,-1.9140193149537914e69,-1.915830119522615e69,-1.917637507474021e69,-1.9194414948786827e69,-1.9212420976866707e69,-1.9230393317286877e69,-1.9248332127172985e69,-1.9266237562481364e69,-1.9284109778010963e69,-1.9301948927415134e69,-1.9319755163213245e69,-1.9337528636802175e69,-1.9355269498467617e69,-1.9372977897395287e69,-1.939065398168194e69,-1.9408297898346283e69,-1.9425909793339744e69,-1.944348981155706e69,-1.9461038096846823e69,-1.9478554792021793e69,-1.949604003886914e69,-1.951349397816055e69,-1.9530916749662204e69,-1.9548308492144595e69,-1.956566934339229e69,-1.958299944021353e69,-1.9600298918449696e69,-1.9617567912984703e69,-1.963480655775424e69,-1.965201498575493e69,-1.9669193329053327e69,-1.968634171879488e69,-1.9703460285212694e69,-1.9720549157636275e69,-1.9737608464500115e69,-1.9754638333352175e69,-1.9771638890862287e69,-1.978861026283045e69,-1.980555257419502e69,-1.982246594904079e69,-1.9839350510607e69,-1.985620638129525e69,-1.9873033682677287e69,-1.9889832535502732e69,-1.9906603059706703e69,-1.992334537441735e69,-1.994005959796331e69,-1.995674584788106e69,-1.997340424092217e69,-1.9990034893060544e69,-2.0006637919499467e69,-2.0023213434678673e69,-2.003976155228125e69,-2.005628238524054e69,-2.007277604574688e69,-2.008924264525434e69,-2.0105682294487334e69,-2.012209510344718e69,-2.0138481181418566e69,-2.015484063697597e69,-2.0171173577989972e69,-2.018748011163353e69,-2.020376034438816e69,-2.022001438205006e69,-2.0236242329736147e69,-2.0252444291890064e69,-2.0268620372288072e69,-2.0284770674044907e69,-2.030089529961957e69,-2.0316994350821045e69,-2.0333067928813946e69,-2.034911613412413e69,-2.0365139066644208e69,-2.0381136825639037e69,-2.0397109509751112e69,-2.041305721700594e69,-2.042898004481732e69,-2.044487808999257e69,-2.046075144873774e69,-2.04766002166627e69,-2.0492424488786224e69,-2.0508224359541005e69,-2.0523999922778612e69,-2.0539751271774386e69,-2.0555478499232306e69,-2.0571181697289788e69,-2.0586860957522435e69,-2.0602516370948727e69,-2.061814802803469e69,-2.063375601869847e69,-2.0649340432314915e69,-2.066490135772006e69,-2.068043888321557e69,-2.0695953096573196e69,-2.071144408503908e69,-2.0726911935338123e69,-2.074235673367822e69,-2.0757778565754516e69,-2.077317751675357e69,-2.0788553671357515e69,-2.0803907113748132e69,-2.0819237927610927e69,-2.0834546196139137e69,-2.0849832002037704e69,-2.08650954275272e69,-2.0880336554347736e69,-2.089555546376279e69,-2.0910752236563052e69,-2.0925926953070154e69,-2.0941079693140458e69,-2.095621053616871e69,-2.0971319561091723e69,-2.0986406846392e69,-2.100147247010132e69,-2.1016516509804272e69,-2.1031539042641804e69,-2.1046540145314684e69,-2.106151989408694e69,-2.107647836478929e69,-2.109141563282251e69,-2.1106331773160767e69,-2.1121226860354965e69,-2.113610096853598e69,-2.115095417141795e69,-2.1165786542301447e69,-2.1180598154076697e69,-2.119538907922672e69,-2.121015938983043e69,-2.122490915756577e69,-2.123963845371273e69,-2.12543473491564e69,-2.126903591438997e69,-2.12837042195177e69,-2.1298352334257873e69,-2.1312980327945687e69,-2.1327588269536183e69,-2.134217622760706e69,-2.135674427036155e69,-2.1371292465631185e69,-2.1385820880878616e69,-2.140032958320033e69,-2.1414818639329405e69,-2.1429288115638188e69,-2.1443738078140995e69,-2.145816859249673e69,-2.147257972401155e69,-2.1486971537641426e69,-2.150134409799475e69,-2.1515697469334866e69,-2.153003171558262e69,-2.1544346900318838e69],"x":[-1.0e200,-1.9920418525896414e205,-3.9840737051792828e205,-5.9761055577689245e205,-7.9681374103585654e205,-9.960169262948207e205,-1.195220111553785e206,-1.3944232968127489e206,-1.5936264820717132e206,-1.7928296673306774e206,-1.9920328525896414e206,-2.1912360378486056e206,-2.39043922310757e206,-2.5896424083665338e206,-2.7888455936254977e206,-2.988048778884462e206,-3.1872519641434262e206,-3.3864551494023905e206,-3.5856583346613544e206,-3.784861519920318e206,-3.984064705179284e206,-4.183267890438247e206,-4.382471075697211e206,-4.5816742609561754e206,-4.780877446215139e206,-4.980080631474103e206,-5.179283816733068e206,-5.378487001992032e206,-5.577690187250996e206,-5.77689337250996e206,-5.976096557768924e206,-6.175299743027888e206,-6.374502928286853e206,-6.573706113545815e206,-6.77290929880478e206,-6.972112484063746e206,-7.17131566932271e206,-7.370518854581674e206,-7.569722039840636e206,-7.7689252250996e206,-7.968128410358567e206,-8.167331595617531e206,-8.366534780876495e206,-8.565737966135459e206,-8.764941151394421e206,-8.964144336653385e206,-9.16334752191235e206,-9.362550707171316e206,-9.56175389243028e206,-9.760957077689242e206,-9.960160262948206e206,-1.0159363448207171e207,-1.0358566633466135e207,-1.05577698187251e207,-1.0756973003984063e207,-1.0956176189243027e207,-1.1155379374501991e207,-1.1354582559760956e207,-1.155378574501992e207,-1.1752988930278886e207,-1.1952192115537848e207,-1.2151395300796812e207,-1.2350598486055777e207,-1.2549801671314741e207,-1.2749004856573705e207,-1.294820804183267e207,-1.3147411227091633e207,-1.3346614412350597e207,-1.354581759760956e207,-1.3745020782868527e207,-1.394422396812749e207,-1.4143427153386455e207,-1.434263033864542e207,-1.454183352390438e207,-1.4741036709163344e207,-1.494023989442231e207,-1.5139443079681275e207,-1.533864626494024e207,-1.5537849450199203e207,-1.5737052635458167e207,-1.5936255820717133e207,-1.6135459005976094e207,-1.633466219123506e207,-1.6533865376494025e207,-1.6733068561752986e207,-1.693227174701195e207,-1.7131474932270914e207,-1.733067811752988e207,-1.7529881302788845e207,-1.7729084488047809e207,-1.7928287673306772e207,-1.8127490858565736e207,-1.8326694043824703e207,-1.8525897229083664e207,-1.872510041434263e207,-1.8924303599601592e207,-1.9123506784860556e207,-1.9322709970119523e207,-1.9521913155378484e207,-1.972111634063745e207,-1.9920319525896412e207,-2.0119522711155378e207,-2.0318725896414345e207,-2.0517929081673306e207,-2.0717132266932273e207,-2.0916335452191234e207,-2.1115538637450198e207,-2.1314741822709165e207,-2.1513945007968126e207,-2.1713148193227092e207,-2.1912351378486054e207,-2.211155456374502e207,-2.231075774900398e207,-2.2509960934262948e207,-2.2709164119521915e207,-2.2908367304780876e207,-2.3107570490039843e207,-2.33067736752988e207,-2.3505976860557768e207,-2.3705180045816732e207,-2.3904383231075696e207,-2.4103586416334662e207,-2.4302789601593623e207,-2.450199278685259e207,-2.4701195972111554e207,-2.4900399157370518e207,-2.5099602342629485e207,-2.5298805527888443e207,-2.549800871314741e207,-2.5697211898406374e207,-2.589641508366534e207,-2.60956182689243e207,-2.6294821454183265e207,-2.649402463944223e207,-2.66932278247012e207,-2.6892431009960157e207,-2.709163419521912e207,-2.729083738047809e207,-2.7490040565737054e207,-2.768924375099602e207,-2.788844693625498e207,-2.8087650121513946e207,-2.828685330677291e207,-2.8486056492031874e207,-2.868525967729083e207,-2.8884462862549796e207,-2.908366604780876e207,-2.928286923306773e207,-2.9482072418326694e207,-2.968127560358565e207,-2.988047878884462e207,-3.0079681974103585e207,-3.027888515936255e207,-3.0478088344621513e207,-3.0677291529880477e207,-3.087649471513944e207,-3.1075697900398405e207,-3.1274901085657375e207,-3.147410427091634e207,-3.1673307456175297e207,-3.1872510641434266e207,-3.207171382669323e207,-3.2270917011952194e207,-3.247012019721115e207,-3.266932338247012e207,-3.2868526567729086e207,-3.3067729752988044e207,-3.3266932938247014e207,-3.346613612350597e207,-3.3665339308764936e207,-3.38645424940239e207,-3.406374567928287e207,-3.4262948864541833e207,-3.446215204980079e207,-3.466135523505976e207,-3.4860558420318725e207,-3.505976160557769e207,-3.525896479083666e207,-3.5458167976095617e207,-3.565737116135458e207,-3.5856574346613544e207,-3.6055777531872514e207,-3.625498071713147e207,-3.6454183902390436e207,-3.6653387087649406e207,-3.685259027290837e207,-3.7051793458167334e207,-3.725099664342629e207,-3.7450199828685256e207,-3.764940301394422e207,-3.7848606199203184e207,-3.8047809384462153e207,-3.824701256972111e207,-3.8446215754980075e207,-3.8645418940239045e207,-3.884462212549801e207,-3.9043825310756967e207,-3.924302849601593e207,-3.94422316812749e207,-3.9641434866533865e207,-3.984063805179283e207,-4.003984123705179e207,-4.0239044422310756e207,-4.043824760756972e207,-4.063745079282869e207,-4.0836653978087654e207,-4.103585716334661e207,-4.1235060348605576e207,-4.1434263533864545e207,-4.1633466719123504e207,-4.183266990438247e207,-4.203187308964143e207,-4.2231076274900395e207,-4.243027946015936e207,-4.262948264541833e207,-4.2828685830677287e207,-4.302788901593625e207,-4.3227092201195215e207,-4.3426295386454185e207,-4.362549857171315e207,-4.3824701756972107e207,-4.4023904942231076e207,-4.422310812749004e207,-4.4422311312749004e207,-4.462151449800797e207,-4.482071768326693e207,-4.5019920868525896e207,-4.521912405378486e207,-4.541832723904383e207,-4.5617530424302793e207,-4.5816733609561746e207,-4.6015936794820715e207,-4.621513998007968e207,-4.6414343165338643e207,-4.66135463505976e207,-4.681274953585657e207,-4.7011952721115535e207,-4.72111559063745e207,-4.741035909163347e207,-4.7609562276892427e207,-4.780876546215139e207,-4.800796864741036e207,-4.8207171832669324e207,-4.840637501792829e207,-4.8605578203187246e207,-4.8804781388446216e207,-4.900398457370518e207,-4.9203187758964144e207,-4.9402390944223113e207,-4.960159412948207e207,-4.9800797314741035e207,-5.0000000500000005e207,-5.019920368525897e207,-5.039840687051792e207,-5.0597610055776885e207,-5.0796813241035855e207,-5.099601642629482e207,-5.119521961155378e207,-5.139442279681275e207,-5.159362598207171e207,-5.179282916733067e207,-5.199203235258964e207,-5.219123553784861e207,-5.239043872310757e207,-5.258964190836653e207,-5.278884509362549e207,-5.298804827888446e207,-5.318725146414343e207,-5.33864546494024e207,-5.358565783466136e207,-5.378486101992031e207,-5.398406420517928e207,-5.418326739043824e207,-5.438247057569722e207,-5.458167376095618e207,-5.478087694621514e207,-5.498008013147411e207,-5.517928331673307e207,-5.537848650199204e207,-5.5577689687251e207,-5.577689287250996e207,-5.597609605776893e207,-5.617529924302789e207,-5.637450242828686e207,-5.657370561354582e207,-5.677290879880477e207,-5.697211198406374e207,-5.717131516932271e207,-5.737051835458168e207,-5.756972153984063e207,-5.776892472509959e207,-5.796812791035856e207,-5.816733109561752e207,-5.836653428087648e207,-5.856573746613546e207,-5.876494065139442e207,-5.896414383665339e207,-5.916334702191235e207,-5.93625502071713e207,-5.956175339243027e207,-5.976095657768924e207,-5.996015976294821e207,-6.015936294820717e207,-6.035856613346613e207,-6.05577693187251e207,-6.075697250398406e207,-6.095617568924303e207,-6.1155378874502e207,-6.135458205976095e207,-6.155378524501992e207,-6.175298843027888e207,-6.195219161553785e207,-6.215139480079681e207,-6.235059798605577e207,-6.254980117131475e207,-6.274900435657371e207,-6.294820754183268e207,-6.314741072709163e207,-6.334661391235059e207,-6.354581709760956e207,-6.374502028286853e207,-6.39442234681275e207,-6.414342665338646e207,-6.434262983864542e207,-6.454183302390439e207,-6.474103620916335e207,-6.494023939442232e207,-6.513944257968128e207,-6.533864576494023e207,-6.55378489501992e207,-6.573705213545816e207,-6.593625532071712e207,-6.613545850597609e207,-6.633466169123505e207,-6.653386487649403e207,-6.673306806175299e207,-6.693227124701194e207,-6.713147443227091e207,-6.733067761752987e207,-6.752988080278883e207,-6.77290839880478e207,-6.792828717330677e207,-6.812749035856574e207,-6.83266935438247e207,-6.852589672908367e207,-6.872509991434263e207,-6.892430309960158e207,-6.912350628486056e207,-6.932270947011952e207,-6.952191265537849e207,-6.972111584063745e207,-6.992031902589641e207,-7.011952221115538e207,-7.031872539641434e207,-7.051792858167332e207,-7.071713176693227e207,-7.091633495219123e207,-7.11155381374502e207,-7.131474132270916e207,-7.151394450796812e207,-7.171314769322709e207,-7.191235087848606e207,-7.211155406374503e207,-7.231075724900399e207,-7.250996043426296e207,-7.270916361952191e207,-7.290836680478087e207,-7.310756999003984e207,-7.330677317529881e207,-7.350597636055778e207,-7.370517954581674e207,-7.39043827310757e207,-7.410358591633466e207,-7.430278910159362e207,-7.450199228685258e207,-7.470119547211155e207,-7.490039865737051e207,-7.509960184262948e207,-7.529880502788844e207,-7.54980082131474e207,-7.569721139840637e207,-7.589641458366534e207,-7.609561776892431e207,-7.629482095418327e207,-7.649402413944222e207,-7.669322732470119e207,-7.689243050996015e207,-7.709163369521911e207,-7.729083688047809e207,-7.749004006573705e207,-7.768924325099602e207,-7.788844643625498e207,-7.808764962151395e207,-7.82868528067729e207,-7.848605599203186e207,-7.868525917729084e207,-7.88844623625498e207,-7.908366554780876e207,-7.928286873306773e207,-7.948207191832669e207,-7.968127510358566e207,-7.988047828884463e207,-8.00796814741036e207,-8.027888465936255e207,-8.047808784462151e207,-8.067729102988048e207,-8.087649421513944e207,-8.10756974003984e207,-8.127490058565738e207,-8.147410377091634e207,-8.167330695617531e207,-8.187251014143427e207,-8.207171332669322e207,-8.227091651195219e207,-8.247011969721114e207,-8.266932288247012e207,-8.286852606772908e207,-8.306772925298804e207,-8.326693243824701e207,-8.346613562350597e207,-8.366533880876493e207,-8.38645419940239e207,-8.406374517928286e207,-8.426294836454183e207,-8.446215154980079e207,-8.466135473505975e207,-8.486055792031872e207,-8.505976110557768e207,-8.525896429083666e207,-8.545816747609562e207,-8.565737066135459e207,-8.585657384661354e207,-8.60557770318725e207,-8.625498021713147e207,-8.645418340239043e207,-8.66533865876494e207,-8.685258977290837e207,-8.705179295816733e207,-8.72509961434263e207,-8.745019932868526e207,-8.764940251394422e207,-8.784860569920318e207,-8.804780888446215e207,-8.824701206972112e207,-8.844621525498008e207,-8.864541844023904e207,-8.884462162549801e207,-8.904382481075697e207,-8.924302799601594e207,-8.944223118127491e207,-8.964143436653386e207,-8.984063755179283e207,-9.003984073705179e207,-9.023904392231076e207,-9.043824710756972e207,-9.06374502928287e207,-9.083665347808766e207,-9.103585666334662e207,-9.123505984860559e207,-9.143426303386454e207,-9.163346621912349e207,-9.183266940438245e207,-9.203187258964143e207,-9.223107577490039e207,-9.243027896015936e207,-9.262948214541832e207,-9.282868533067729e207,-9.302788851593625e207,-9.322709170119521e207,-9.342629488645418e207,-9.362549807171314e207,-9.38247012569721e207,-9.402390444223107e207,-9.422310762749003e207,-9.4422310812749e207,-9.462151399800797e207,-9.482071718326694e207,-9.50199203685259e207,-9.521912355378486e207,-9.541832673904382e207,-9.561752992430278e207,-9.581673310956174e207,-9.601593629482072e207,-9.621513948007968e207,-9.641434266533865e207,-9.661354585059761e207,-9.681274903585658e207,-9.701195222111554e207,-9.721115540637449e207,-9.741035859163347e207,-9.760956177689243e207,-9.78087649621514e207,-9.800796814741036e207,-9.820717133266932e207,-9.840637451792829e207,-9.860557770318725e207,-9.880478088844623e207,-9.900398407370519e207,-9.920318725896414e207,-9.940239044422311e207,-9.960159362948207e207,-9.980079681474102e207,-1.0e208]}
},{}],81:[function(require,module,exports){
module.exports={"expected":[1.0e100,5.84026857754698e101,7.358271161491365e101,8.423115450019868e101,9.270836848903738e101,9.986705420898593e101,1.0612457501481551e102,1.1172015853926938e102,1.168052005290145e102,1.2148230121103134e102,1.258245827342608e102,1.2988621281632806e102,1.337085673274069e102,1.3732404880748676e102,1.407585626172262e102,1.4403318388539051e102,1.4716531549266418e102,1.5016951427764054e102,1.5305809425671903e102,1.5584157596359888e102,1.5852902711754323e102,1.6112832496971848e102,1.6364636117137924e102,1.6608920377297651e102,1.6846222678152817e102,1.7077021484196584e102,1.7301744861412076e102,1.7520777500445974e102,1.773446653959363e102,1.7943126427880963e102,1.8147043013856737e102,1.8346477004871797e102,1.8541666910788298e102,1.8732831562547007e102,1.8920172277919712e102,1.9103874732718352e102,1.928411058472952e102,1.9461038888963637e102,1.9634807335912596e102,1.980555333899402e102,1.9973404992920812e102,2.0138481921139336e102,2.0300896027551645e102,2.0460752165339845e102,2.061814873373764e102,2.0773178211962557e102,2.0925927638166787e102,2.1076479040133449e102,2.1224909823497276e102,2.1371293122471298e102,2.1515698117387656e102,2.165819032278988e102,2.1798831849328382e102,2.193768164229658e102,2.2074795699290305e102,2.2210227269168343e102,2.2344027034229572e102,2.2476243277295373e102,2.2606922035189607e102,2.2736107239937806e102,2.286384084885875e102,2.2990162964591926e102,2.3115111945990813e102,2.3238724510712655e102,2.336103583024773e102,2.3482079618054227e102,2.360188821139679e102,2.372049264742674e102,2.3837922733988666e102,2.395420711559072e102,2.406937333493406e102,2.4183447890359186e102,2.429645628953366e102,2.4408423099675636e102,2.4519371994581003e102,2.4629325798697764e102,2.4738306528469846e102,2.4846335431153073e102,2.495343302128851e102,2.5059619115002743e102,2.5164912862290233e102,2.5269332777420217e102,2.537289676759871e102,2.547562216000586e102,2.557752572731901e102,2.567862371182333e102,2.577893184820374e102,2.587846538510478e102,2.597723910553827e102,2.607526734621281e102,2.6172564015853376e102,2.62691426125745e102,2.636501624036566e102,2.6460197624743416e102,2.655469912762094e102,2.6648532761441793e102,2.674171020262186e102,2.683424280434008e102,2.6926141608715856e102,2.701741735840849e102,2.710808050767168e102,2.7198141232893854e102,2.728760944265296e102,2.737649478731281e102,2.746480666818594e102,2.7552554246286663e102,2.7639746450696256e102,2.772639198656103e102,2.781249934274264e102,2.7898076799138794e102,2.798313243369154e102,2.8067674129099036e102,2.8151709579246027e102,2.8235246295367145e102,2.831829161195644e102,2.840085269243564e102,2.8482936534593106e102,2.8564549975804566e102,2.8645699698046207e102,2.872639223271002e102,2.880663396523092e102,2.888643113953429e102,2.8965789862312565e102,2.904471610713861e102,2.912321571842345e102,2.9201294415225496e102,2.9278957794917876e102,2.9356211336720303e102,2.9433060405101543e102,2.9509510253058085e102,2.9585566025274563e102,2.9661232761170966e102,2.973651539784159e102,2.9811418772890368e102,2.988594762716691e102,2.9960106607407513e102,3.003390026878513e102,3.0107333077372e102,3.0180409412518624e102,3.0253133569152487e102,3.032550975999975e102,3.0397542117733115e102,3.046923469704871e102,3.054059147667493e102,3.0611616361315833e102,3.0682313183531724e102,3.0752685705559325e102,3.082273762107393e102,3.0892472556895703e102,3.096189407464235e102,3.103100567233008e102,3.10998107859249e102,3.1168312790846087e102,3.1236515003423573e102,3.1304420682310973e102,3.13720330298559e102,3.1439355193429115e102,3.1506390266713983e102,3.1573141290957687e102,3.1639611256185555e102,3.1705803102379864e102,3.177171972062426e102,3.1837363954215143e102,3.1902738599741045e102,3.196784640813122e102,3.20326900856744e102,3.209727229500887e102,3.216159565608468e102,3.2225662747099077e102,3.2289476105405993e102,3.235303822840045e102,3.241635157437877e102,3.247941856337531e102,3.2542241577976577e102,3.2604822964113393e102,3.2667165031831886e102,3.2729270056043926e102,3.2791140277257734e102,3.2852777902289236e102,3.291418510495481e102,3.297536402674602e102,3.303631677748688e102,3.3097045435974183e102,3.3157552050601474e102,3.3217838639967124e102,3.3277907193466995e102,3.3337759671872217e102,3.3397398007892465e102,3.3456824106725197e102,3.3516039846591325e102,3.3575047079257643e102,3.363384763054645e102,3.3692443300832777e102,3.3750835865529485e102,3.380902707556073e102,3.386701865782399e102,3.392481231564112e102,3.39824097291986e102,3.4039812555977464e102,3.4097022431173064e102,3.415404096810498e102,3.421086975861746e102,3.426751037347049e102,3.432396436272193e102,3.4380233256100784e102,3.4436318563372034e102,3.4492221774693145e102,3.454794436096248e102,3.460348777415993e102,3.465885344767985e102,3.4714042796656637e102,3.4769057218283043e102,3.4823898092121453e102,3.487856678040836e102,3.4933064628352156e102,3.4987392964424404e102,3.5041553100644893e102,3.5095546332860436e102,3.514937394101775e102,3.520303718943049e102,3.5256537327040566e102,3.5309875587674e102,3.536305319029129e102,3.541607133923262e102,3.5468931224457854e102,3.5521634021781617e102,3.5574180893103456e102,3.562657298663326e102,3.5678811437112075e102,3.5730897366028406e102,3.578283188183008e102,3.583461608013186e102,3.588625104391885e102,3.5937737843745803e102,3.598907753793248e102,3.6040271172755077e102,3.6091319782633903e102,3.614222439031726e102,3.6192986007061857e102,3.624360563280953e102,3.6294084256360634e102,3.634442285554403e102,3.6394622397383727e102,3.6444683838262445e102,3.6494608124081897e102,3.6544396190420117e102,3.6594048962685745e102,3.6643567356269386e102,3.669295227669216e102,3.6742204619751386e102,3.6791325271663607e102,3.6840315109204917e102,3.6889174999848686e102,3.693790580190073e102,3.6986508364632025e102,3.703498352840894e102,3.7083332124821103e102,3.7131554976806986e102,3.717965289877712e102,3.7227626696735195e102,3.727547716839687e102,3.7323205103306553e102,3.7370811282952014e102,3.741829648087701e102,3.74656614627919e102,3.751290698668231e102,3.756003380291586e102,3.760704265434707e102,3.7653934276420405e102,3.7700709397271504e102,3.7747368737826717e102,3.7793913011900873e102,3.7840342926293367e102,3.788665918088266e102,3.793286246871906e102,3.797895347611605e102,3.8024932882739946e102,3.807080136169815e102,3.811655957962583e102,3.816220819677119e102,3.8207747867079335e102,3.825317923827468e102,3.829850295194204e102,3.8343719643606376e102,3.83888299428112e102,3.8433834473195717e102,3.8478733852570703e102,3.852352869299314e102,3.8568219600839623e102,3.861280717687864e102,3.865729201634158e102,3.8701674708992736e102,3.874595583919804e102,3.879013598599283e102,3.883421572314846e102,3.887819561923787e102,3.892207623770014e102,3.8965858136904e102,3.900954187021038e102,3.9053127986033934e102,3.9096617027903636e102,3.9140009534522454e102,3.918330603982602e102,3.9226507073040504e102,3.9269613158739505e102,3.9312624816900133e102,3.9355542562958167e102,3.939836690786247e102,3.9441098358128466e102,3.94837374158909e102,3.9526284578955755e102,3.9568740340851373e102,3.9611105190878873e102,3.9653379614161756e102,3.969556409169478e102,3.9737659100392166e102,3.9779665113134984e102,3.9821582598817963e102,3.9863412022395504e102,3.9905153844927106e102,3.994680852362205e102,3.9988376511883496e102,4.002985825935191e102,4.0071254211947867e102,4.011256481191422e102,4.01537904978577e102,4.019493170478989e102,4.0235988864167607e102,4.0276962403932735e102,4.0317852748551474e102,4.0358660319053044e102,4.039938553306782e102,4.0440028804864965e102,4.048059054538949e102,4.0521071162298846e102,4.056147105999897e102,4.0601790639679814e102,4.0642030299350447e102,4.0682190433873613e102,4.0722271434999805e102,4.076227369140094e102,4.0802197588703477e102,4.084204350952119e102,4.0881811833487367e102,4.0921502937286707e102,4.096111719468668e102,4.100065497656851e102,4.1040116650957737e102,4.1079502583054347e102,4.1118813135262533e102,4.115804866722005e102,4.119720953582713e102,4.12362960952751e102,4.127530869707452e102,4.131424769008306e102,4.1353113420532907e102,4.1391906232057883e102,4.143062646572016e102,4.1469274460036686e102,4.1507850551005175e102,4.1546355072129867e102,4.158478835444687e102,4.1623150726549207e102,4.1661442514611565e102,4.1699664042414656e102,4.173781563136935e102,4.177589760054044e102,4.1813910266670136e102,4.185185394420124e102,4.1889728945300025e102,4.1927535579878865e102,4.1965274155618533e102,4.200294497799023e102,4.204054835027736e102,4.207808457359702e102,4.2115553946921184e102,4.2152956767097703e102,4.2190293328870993e102,4.2227563924902436e102,4.2264768845790626e102,4.230190838009126e102,4.233898281433686e102,4.2375992433056204e102,4.2412937518793584e102,4.2449818352127743e102,4.248663521169064e102,4.252338837418599e102,4.256007811440756e102,4.259670470525723e102,4.2633268417762876e102,4.266976952109602e102,4.270620828258926e102,4.274258496775349e102,4.277889984029495e102,4.2815153162132027e102,4.2851345193411906e102,4.288747619252696e102,4.292354641613101e102,4.2959556119155377e102,4.2995505554824705e102,4.303139497467267e102,4.306722462855743e102,4.3102994764676967e102,4.3138705629584195e102,4.317435746820192e102,4.320995052383763e102,4.3245485038198096e102,4.328096125140383e102,4.3316379402003355e102,4.335173972698731e102,4.3387042461802435e102,4.3422287840365336e102,4.345747609507615e102,4.3492607456832e102,4.3527682155040374e102,4.3562700417632245e102,4.359766247107518e102,4.3632568540386166e102,4.3667418849144374e102,4.370221361950378e102,4.3736953072205613e102,4.377163742659067e102,4.3806266900611514e102,4.3840841710844525e102,4.387536207250182e102,4.390982819944305e102,4.394424030418703e102,4.39785985979233e102,4.4012903290523535e102,4.4047154590552794e102,4.408135270528071e102,4.4115497840692504e102,4.4149590201499933e102,4.418362999115206e102,4.4217617411845946e102,4.4251552664537234e102,4.4285435948950596e102,4.4319267463590085e102,4.435304740574933e102,4.438677597152173e102,4.4420453355810407e102,4.4454079752338156e102,4.448765535365723e102,4.4521180351159064e102,4.4554654935083856e102,4.4588079294530077e102,4.4621453617463866e102,4.465477809072834e102,4.468805290005279e102,4.472127823006181e102,4.4754454264284277e102,4.4787581185162305e102,4.482065917406005e102,4.485368841127248e102,4.488666907603399e102,4.491960134652695e102,4.495248539989024e102,4.498532141222757e102,4.501810955861582e102,4.505085001311323e102,4.508354294876755e102,4.511618853762404e102,4.514878695073354e102,4.518133835816024e102,4.521384292898956e102,4.524630083133587e102,4.527871223235013e102,4.531107729822745e102,4.534339619421464e102,4.537566908461755e102,4.540789613280852e102,4.544007750123359e102,4.547221335141972e102,4.550430384398194e102,4.553634913863041e102,4.55683493941774e102,4.560030476854424e102,4.563221541876812e102,4.566408150100899e102,4.569590317055617e102,4.57276805818351e102,4.575941388841386e102,4.579110324300976e102,4.582274879749576e102,4.585435070290691e102,4.58859091094467e102,4.59174241664933e102,4.594889602260582e102,4.598032482553045e102,4.601171072220659e102,4.604305385877285e102,4.60743543805731e102,4.610561243216235e102,4.613682815731265e102,4.616800169901889e102,4.61991331995046e102,4.62302228002276e102,4.626127064188574e102,4.629227686442242e102,4.632324160703219e102,4.635416500816625e102,4.638504720553787e102,4.641588833612779e102],"x":[1.0e300,1.9920418525896412e305,3.9840737051792825e305,5.9761055577689246e305,7.968137410358567e305,9.960169262948207e305,1.195220111553785e306,1.3944232968127491e306,1.5936264820717133e306,1.7928296673306775e306,1.9920328525896417e306,2.1912360378486053e306,2.3904392231075695e306,2.5896424083665337e306,2.788845593625498e306,2.988048778884462e306,3.187251964143426e306,3.3864551494023906e306,3.5856583346613545e306,3.7848615199203184e306,3.984064705179283e306,4.183267890438247e306,4.382471075697211e306,4.581674260956175e306,4.78087744621514e306,4.9800806314741036e306,5.179283816733068e306,5.378487001992032e306,5.5776901872509965e306,5.77689337250996e306,5.976096557768924e306,6.175299743027889e306,6.374502928286853e306,6.573706113545817e306,6.772909298804781e306,6.972112484063744e306,7.17131566932271e306,7.370518854581673e306,7.569722039840638e306,7.768925225099601e306,7.968128410358566e306,8.16733159561753e306,8.366534780876494e306,8.565737966135458e306,8.764941151394423e306,8.964144336653387e306,9.16334752191235e306,9.362550707171315e306,9.561753892430278e306,9.760957077689244e306,9.960160262948207e306,1.0159363448207172e307,1.0358566633466135e307,1.0557769818725101e307,1.0756973003984064e307,1.0956176189243027e307,1.1155379374501992e307,1.1354582559760956e307,1.155378574501992e307,1.1752988930278888e307,1.1952192115537849e307,1.2151395300796812e307,1.2350598486055778e307,1.2549801671314743e307,1.2749004856573704e307,1.2948208041832667e307,1.3147411227091633e307,1.33466144123506e307,1.3545817597609562e307,1.3745020782868526e307,1.3944223968127491e307,1.4143427153386455e307,1.4342630338645418e307,1.454183352390438e307,1.4741036709163347e307,1.494023989442231e307,1.5139443079681273e307,1.533864626494024e307,1.5537849450199205e307,1.5737052635458168e307,1.5936255820717132e307,1.6135459005976095e307,1.633466219123506e307,1.6533865376494024e307,1.6733068561752987e307,1.6932271747011953e307,1.7131474932270919e307,1.7330678117529882e307,1.7529881302788845e307,1.7729084488047808e307,1.7928287673306772e307,1.8127490858565737e307,1.83266940438247e307,1.8525897229083664e307,1.872510041434263e307,1.8924303599601596e307,1.912350678486056e307,1.9322709970119522e307,1.9521913155378485e307,1.972111634063745e307,1.9920319525896414e307,2.0119522711155378e307,2.0318725896414343e307,2.051792908167331e307,2.0717132266932272e307,2.0916335452191233e307,2.11155386374502e307,2.1314741822709165e307,2.1513945007968128e307,2.171314819322709e307,2.1912351378486055e307,2.2111554563745023e307,2.2310757749003986e307,2.2509960934262944e307,2.2709164119521913e307,2.290836730478088e307,2.310757049003984e307,2.33067736752988e307,2.350597686055777e307,2.3705180045816734e307,2.3904383231075697e307,2.410358641633466e307,2.430278960159362e307,2.4501992786852587e307,2.4701195972111555e307,2.490039915737052e307,2.5099602342629487e307,2.529880552788845e307,2.5498008713147413e307,2.5697211898406377e307,2.5896415083665335e307,2.6095618268924303e307,2.6294821454183267e307,2.649402463944223e307,2.66932278247012e307,2.689243100996016e307,2.7091634195219125e307,2.7290837380478083e307,2.7490040565737046e307,2.7689243750996014e307,2.788844693625498e307,2.8087650121513946e307,2.8286853306772914e307,2.8486056492031877e307,2.868525967729084e307,2.88844628625498e307,2.908366604780876e307,2.928286923306773e307,2.9482072418326694e307,2.9681275603585657e307,2.9880478788844625e307,3.007968197410359e307,3.0278885159362547e307,3.047808834462151e307,3.0677291529880473e307,3.087649471513944e307,3.1075697900398405e307,3.127490108565737e307,3.147410427091634e307,3.1673307456175305e307,3.1872510641434263e307,3.2071713826693226e307,3.227091701195219e307,3.247012019721116e307,3.266932338247012e307,3.2868526567729084e307,3.3067729752988053e307,3.326693293824701e307,3.3466136123505974e307,3.3665339308764937e307,3.38645424940239e307,3.406374567928287e307,3.426294886454183e307,3.4462152049800796e307,3.4661355235059764e307,3.486055842031872e307,3.505976160557769e307,3.5258964790836654e307,3.5458167976095617e307,3.5657371161354585e307,3.585657434661355e307,3.605577753187251e307,3.625498071713148e307,3.645418390239044e307,3.66533870876494e307,3.6852590272908365e307,3.705179345816733e307,3.7250996643426296e307,3.745019982868526e307,3.7649403013944223e307,3.7848606199203186e307,3.804780938446215e307,3.8247012569721113e307,3.844621575498008e307,3.8645418940239044e307,3.884462212549801e307,3.9043825310756976e307,3.924302849601594e307,3.94422316812749e307,3.9641434866533866e307,3.984063805179283e307,4.003984123705179e307,4.0239044422310755e307,4.0438247607569724e307,4.0637450792828687e307,4.0836653978087645e307,4.1035857163346613e307,4.1235060348605577e307,4.143426353386454e307,4.1633466719123503e307,4.183266990438247e307,4.203187308964144e307,4.2231076274900403e307,4.243027946015936e307,4.262948264541833e307,4.2828685830677293e307,4.3027889015936256e307,4.322709220119522e307,4.3426295386454183e307,4.362549857171315e307,4.382470175697211e307,4.402390494223107e307,4.422310812749004e307,4.4422311312749004e307,4.4621514498007967e307,4.482071768326693e307,4.50199208685259e307,4.521912405378486e307,4.541832723904383e307,4.561753042430279e307,4.581673360956175e307,4.601593679482071e307,4.621513998007968e307,4.641434316533864e307,4.66135463505976e307,4.681274953585657e307,4.701195272111555e307,4.72111559063745e307,4.741035909163348e307,4.760956227689243e307,4.780876546215139e307,4.800796864741037e307,4.820717183266932e307,4.840637501792829e307,4.860557820318725e307,4.880478138844622e307,4.900398457370518e307,4.920318775896414e307,4.940239094422311e307,4.960159412948207e307,4.980079731474104e307,5.00000005e307,5.019920368525897e307,5.039840687051793e307,5.059761005577689e307,5.079681324103585e307,5.099601642629482e307,5.119521961155379e307,5.139442279681274e307,5.159362598207172e307,5.179282916733067e307,5.199203235258964e307,5.219123553784861e307,5.239043872310756e307,5.258964190836653e307,5.27888450936255e307,5.298804827888446e307,5.318725146414342e307,5.33864546494024e307,5.358565783466135e307,5.378486101992032e307,5.398406420517929e307,5.418326739043825e307,5.438247057569722e307,5.458167376095618e307,5.478087694621515e307,5.49800801314741e307,5.517928331673307e307,5.537848650199204e307,5.557768968725099e307,5.577689287250997e307,5.597609605776893e307,5.617529924302789e307,5.637450242828686e307,5.657370561354582e307,5.677290879880478e307,5.697211198406374e307,5.717131516932271e307,5.737051835458167e307,5.756972153984064e307,5.77689247250996e307,5.796812791035857e307,5.816733109561752e307,5.836653428087649e307,5.856573746613546e307,5.876494065139441e307,5.896414383665339e307,5.916334702191235e307,5.936255020717131e307,5.956175339243028e307,5.976095657768924e307,5.99601597629482e307,6.015936294820717e307,6.035856613346613e307,6.055776931872509e307,6.075697250398408e307,6.095617568924303e307,6.115537887450199e307,6.135458205976096e307,6.155378524501992e307,6.175298843027889e307,6.195219161553785e307,6.215139480079682e307,6.235059798605578e307,6.254980117131474e307,6.274900435657371e307,6.294820754183267e307,6.314741072709164e307,6.33466139123506e307,6.354581709760956e307,6.374502028286853e307,6.39442234681275e307,6.414342665338645e307,6.434262983864542e307,6.454183302390438e307,6.474103620916334e307,6.494023939442232e307,6.513944257968127e307,6.533864576494024e307,6.553784895019921e307,6.573705213545816e307,6.593625532071713e307,6.61354585059761e307,6.633466169123506e307,6.653386487649402e307,6.673306806175299e307,6.693227124701195e307,6.713147443227091e307,6.733067761752987e307,6.752988080278885e307,6.772908398804781e307,6.792828717330677e307,6.812749035856575e307,6.83266935438247e307,6.852589672908366e307,6.872509991434264e307,6.892430309960159e307,6.912350628486056e307,6.932270947011953e307,6.952191265537849e307,6.972111584063745e307,6.992031902589642e307,7.011952221115538e307,7.031872539641434e307,7.051792858167331e307,7.071713176693227e307,7.091633495219123e307,7.11155381374502e307,7.131474132270917e307,7.151394450796812e307,7.171314769322709e307,7.191235087848606e307,7.211155406374501e307,7.231075724900399e307,7.250996043426295e307,7.270916361952191e307,7.290836680478088e307,7.310756999003983e307,7.33067731752988e307,7.350597636055777e307,7.370517954581673e307,7.390438273107569e307,7.410358591633466e307,7.430278910159362e307,7.45019922868526e307,7.470119547211156e307,7.490039865737052e307,7.509960184262949e307,7.529880502788845e307,7.549800821314742e307,7.569721139840638e307,7.589641458366535e307,7.609561776892431e307,7.629482095418326e307,7.649402413944224e307,7.66932273247012e307,7.689243050996016e307,7.709163369521913e307,7.729083688047809e307,7.749004006573705e307,7.768924325099601e307,7.788844643625498e307,7.808764962151394e307,7.828685280677291e307,7.848605599203187e307,7.868525917729084e307,7.88844623625498e307,7.908366554780876e307,7.928286873306773e307,7.948207191832668e307,7.968127510358566e307,7.988047828884462e307,8.007968147410358e307,8.027888465936255e307,8.047808784462151e307,8.067729102988047e307,8.087649421513944e307,8.10756974003984e307,8.127490058565737e307,8.147410377091635e307,8.16733069561753e307,8.187251014143427e307,8.207171332669324e307,8.227091651195219e307,8.247011969721116e307,8.266932288247012e307,8.286852606772909e307,8.306772925298805e307,8.326693243824702e307,8.346613562350598e307,8.366533880876493e307,8.386454199402391e307,8.406374517928287e307,8.426294836454183e307,8.44621515498008e307,8.466135473505977e307,8.486055792031872e307,8.505976110557769e307,8.525896429083666e307,8.545816747609561e307,8.565737066135459e307,8.585657384661354e307,8.605577703187251e307,8.625498021713148e307,8.645418340239044e307,8.66533865876494e307,8.685258977290836e307,8.705179295816733e307,8.725099614342629e307,8.745019932868526e307,8.764940251394422e307,8.784860569920319e307,8.804780888446215e307,8.824701206972112e307,8.844621525498009e307,8.864541844023904e307,8.884462162549802e307,8.904382481075697e307,8.924302799601594e307,8.944223118127491e307,8.964143436653386e307,8.984063755179283e307,9.003984073705178e307,9.023904392231075e307,9.043824710756972e307,9.063745029282868e307,9.083665347808765e307,9.10358566633466e307,9.123505984860558e307,9.143426303386453e307,9.163346621912352e307,9.183266940438248e307,9.203187258964143e307,9.223107577490042e307,9.243027896015938e307,9.262948214541833e307,9.28286853306773e307,9.302788851593626e307,9.322709170119523e307,9.34262948864542e307,9.362549807171316e307,9.38247012569721e307,9.402390444223108e307,9.422310762749006e307,9.4422310812749e307,9.462151399800796e307,9.482071718326694e307,9.50199203685259e307,9.521912355378486e307,9.541832673904384e307,9.561752992430279e307,9.581673310956174e307,9.601593629482074e307,9.621513948007969e307,9.641434266533864e307,9.661354585059762e307,9.681274903585659e307,9.701195222111554e307,9.72111554063745e307,9.741035859163347e307,9.760956177689242e307,9.78087649621514e307,9.800796814741037e307,9.820717133266932e307,9.840637451792827e307,9.860557770318725e307,9.880478088844622e307,9.900398407370517e307,9.920318725896415e307,9.94023904442231e307,9.960159362948207e307,9.980079681474105e307,1.0e308]}
},{}],82:[function(require,module,exports){
module.exports={"expected":[-3.684031498640387,-3.682563171861245,-3.6810936732328057,-3.67962300041418,-3.6781511510569853,-3.6766781228053174,-3.6752039132957135,-3.6737285201571206,-3.6722519410108627,-3.6707741734706048,-3.669295215142321,-3.66781506362426,-3.6663337165069096,-3.664851171372963,-3.663367425797285,-3.6618824773468748,-3.6603963235808332,-3.658908962050326,-3.657420390298549,-3.6559306058606924,-3.654439606263903,-3.6529473890272524,-3.6514539516616953,-3.649959291670037,-3.6484634065468953,-3.646966293778663,-3.645467950843472,-3.6439683752111542,-3.642467564343205,-3.640965515692746,-3.6394622267044863,-3.6379576948146832,-3.6364519174511063,-3.634944892032996,-3.6334366159710263,-3.6319270866672655,-3.6304163015151363,-3.628904257899376,-3.6273909531959982,-3.6258763847722504,-3.6243605499865756,-3.622843446188571,-3.621325070718947,-3.6198054209094863,-3.6182844940830035,-3.6167622875533025,-3.615238798625135,-3.613714024594159,-3.6121879627468956,-3.610660610360688,-3.6091319647036566,-3.607602023034659,-3.6060707826032434,-3.604538240649608,-3.6030043944045542,-3.601469241089446,-3.599932777916164,-3.598395002087058,-3.5968559107949094,-3.5953155012228786,-3.593773770544464,-3.5922307159234537,-3.590686334513883,-3.5891406234599845,-3.587593579896145,-3.5860452009468546,-3.584495483726665,-3.5829444253401372,-3.581392022881797,-3.5798382734360854,-3.5782831740773124,-3.5767267218696057,-3.575168913866865,-3.5736097471127097,-3.5720492186404327,-3.5704873254729486,-3.5689240646227445,-3.5673594330918297,-3.565793427871684,-3.5642260459432102,-3.5626572842766775,-3.5610871398316752,-3.559515609557057,-3.5579426903908917,-3.5563683792604084,-3.554792673081945,-3.553215568760895,-3.5516370631916536,-3.5500571532575638,-3.5484758358308626,-3.5468931077726267,-3.545308965932716,-3.543723407149722,-3.542136428250908,-3.5405480260521562,-3.538958197357911,-3.537366938961121,-3.5357742476431833,-3.5341801201738865,-3.5325845533113522,-3.5309875438019778,-3.529389088380376,-3.527789183769319,-3.5261878266796787,-3.5245850138103645,-3.5229807418482673,-3.5213750074681958,-3.5197678073328187,-3.5181591380926025,-3.516548996385748,-3.514937378838133,-3.5133242820632455,-3.5117097026621242,-3.510093637223294,-3.508476082322703,-3.5068570345236583,-3.5052364903767628,-3.5036144464198484,-3.5019908991779136,-3.500365845163056,-3.498739280874407,-3.4971112027980658,-3.4954816074070316,-3.493850491161138,-3.4922178505069836,-3.490583681877864,-3.488947981693706,-3.4873107463609934,-3.4856719722727028,-3.4840316558082307,-3.482389793333324,-3.4807463812000083,-3.4791014157465185,-3.4774548932972236,-3.475806810162559,-3.4741571626389502,-3.4725059470087403,-3.4708531595401166,-3.4691987964870368,-3.4675428540891544,-3.4658853285717424,-3.464226216145618,-3.4625655130070663,-3.4609032153377646,-3.4592393193047037,-3.457573821060112,-3.455906716741373,-3.4542380024709534,-3.4525676743563163,-3.4508957284898467,-3.4492221609487683,-3.4475469677950636,-3.4458701450753924,-3.4441916888210087,-3.442511595047679,-3.440829859755598,-3.4391464789293074,-3.4374614485376087,-3.435774764533478,-3.4340864228539836,-3.4323964194201975,-3.4307047501371084,-3.429011410893536,-3.427316397562042,-3.425619705998842,-3.4239213320437147,-3.422221271519916,-3.420519520234084,-3.4188160739761515,-3.4171109285192527,-3.415404079619631,-3.4136955230165467,-3.4119852544321816,-3.4102732695715487,-3.408559564122392,-3.4068441337550954,-3.4051269741225836,-3.403408080860227,-3.4016874495857428,-3.399965075899097,-3.3982409553824064,-3.3965150835998372,-3.3947874560975055,-3.3930580684033766,-3.391326916027162,-3.389593994460217,-3.3878592991754393,-3.3861228256271616,-3.3843845692510497,-3.3826445254639954,-3.3809026896640106,-3.37915905723012,-3.377413623522253,-3.3756663838811365,-3.373917333628183,-3.3721664680653824,-3.3704137824751905,-3.368659272120416,-3.3669029322441095,-3.365144758069449,-3.363384744799625,-3.361622887617728,-3.359859181686628,-3.358093622148863,-3.3563262041265163,-3.354556922721101,-3.35278577301344,-3.3510127500635436,-3.3492378489104926,-3.3474610645723115,-3.3456823920458483,-3.3439018263066482,-3.342119362308832,-3.340334994984968,-3.3385487192459444,-3.3367605299808445,-3.3349704220568146,-3.3331783903189374,-3.3313844295900994,-3.32958853467086,-3.3277907003393183,-3.3259909213509817,-3.3241891924386273,-3.3223855083121703,-3.3205798636585238,-3.3187722531414647,-3.316962671401491,-3.3151511130556854,-3.313337572697573,-3.3115220448969778,-3.3097045241998826,-3.307885005128283,-3.306063482180041,-3.3042399498287423,-3.302414402523545,-3.3005868346890317,-3.298757240725062,-3.2969256150066184,-3.2950919518836566,-3.2932562456809493,-3.291418490697936,-3.2895786812085617,-3.2877368114611243,-3.2858928756781154,-3.2840468680560586,-3.2821987827653514,-3.280348613950102,-3.2784963557279663,-3.276642002189983,-3.2747855474004086,-3.2729269853965484,-3.2710663101885897,-3.2692035157594317,-3.2673385960645134,-3.265471545031642,-3.263602356560817,-3.2617310245240585,-3.2598575427652263,-3.257981905099844,-3.2561041053149187,-3.2542241371687615,-3.2523419943908003,-3.2504576706814023,-3.248571159711683,-3.2466824551233224,-3.2447915505283738,-3.242898439509076,-3.2410031156176613,-3.23910557237616,-3.237205803276209,-3.235303801778852,-3.2333995613143434,-3.2314930752819495,-3.229584337049744,-3.227673339954408,-3.2257600773010235,-3.2238445423628677,-3.221926728381206,-3.220006628565079,-3.2180842360910935,-3.21615954410321,-3.2142325457125236,-3.2123032339970505,-3.2103716020015085,-3.208437642737095,-3.2065013491812664,-3.2045627142775115,-3.2026217309351277,-3.2006783920289905,-3.1987326903993245,-3.1967846188514715,-3.194834170155655,-3.1928813370467464,-3.1909261122240244,-3.188968488350936,-3.1870084580548546,-3.1850460139268346,-3.1830811485213664,-3.181113854356126,-3.1791441239117257,-3.177171949631461,-3.1751973239210542,-3.1732202391483986,-3.171240687643299,-3.169258661697208,-3.167274153562963,-3.1652871554545214,-3.163297659546688,-3.1613056579748475,-3.1593111428346883,-3.1573141061819276,-3.1553145400320335,-3.1533124363599434,-3.151307787099779,-3.1493005841445645,-3.1472908193459332,-3.1452784845138404,-3.1432635714162673,-3.141246071778925,-3.139225977284956,-3.1372032795746323,-3.1351779702450524,-3.1331500408498307,-3.1311194828987907,-3.1290862878576506,-3.1270504471477083,-3.1250119521455217,-3.12297079418259,-3.120926964545026,-3.1188804544732305,-3.1168312551615625,-3.1147793577580036,-3.112724753363824,-3.110667433033241,-3.1086073877730773,-3.106544608542415,-3.104479086252245,-3.102410811765117,-3.1003397758947813,-3.0982659694058325,-3.096189383013344,-3.094110007382504,-3.0920278331282467,-3.089942850814878,-3.0878550509557,-3.0857644240126314,-3.083670960395824,-3.0815746504632746,-3.079475484520435,-3.0773734528198187,-3.0752685455605993,-3.073160752888212,-3.0710500648939454,-3.068936471614531,-3.0668199630317323,-3.0647005290719243,-3.062578159605672,-3.0604528444473056,-3.0583245733544877,-3.0561933360277824,-3.054059122110215,-3.0519219211868274,-3.0497817227842337,-3.0476385163701676,-3.0454922913530247,-3.0433430370814043,-3.0411907428436424,-3.0390353978673432,-3.0368769913189033,-3.0347155123030336,-3.0325509498622742,-3.030383292976508,-3.028212530562463,-3.026038651473218,-3.0238616444976945,-3.0216814983601523,-3.0194982017196716,-3.0173117431696372,-3.0151221112372113,-3.0129292943828054,-3.0107332809995446,-3.008534059412727,-3.0063316178792765,-3.0041259445871944,-3.001917027654997,-2.9997048551311565,-2.9974894149935296,-2.995270695148783,-2.9930486834318137,-2.9908233676051603,-2.9885947353584106,-2.986362774307603,-2.9841274719946194,-2.9818888158865753,-2.979646793375199,-2.9774013917762088,-2.975152598328681,-2.9729004001944097,-2.9706447844572654,-2.9683857381225396,-2.9661232481162894,-2.9638573012846683,-2.961587884393255,-2.9593149841263737,-2.9570385870864055,-2.9547586797930925,-2.952475248682839,-2.950188280107997,-2.9478977603361507,-2.945603675549391,-2.94330601184358,-2.9410047552276137,-2.938699891622666,-2.9363914068614365,-2.93407928668738,-2.9317635167539358,-2.9294440826237387,-2.927120969767833,-2.9247941635648678,-2.9224636493002882,-2.9201294121655157,-2.917791437257122,-2.9154497095759893,-2.913104214026465,-2.910754935415506,-2.9084018584518097,-2.9060449677449416,-2.9036842478044473,-2.9013196830389574,-2.8989512577552796,-2.8965789561574864,-2.8942027623459827,-2.891822660316572,-2.889438633959505,-2.887050667058523,-2.8846587432898847,-2.882262846221385,-2.8798629593113625,-2.877459065907693,-2.875051149246773,-2.872639192452492,-2.8702231785351917,-2.86780309039061,-2.8653789107988192,-2.862950622423145,-2.8605182078090774,-2.858081649383165,-2.8556409294518983,-2.8531960302005794,-2.850746933692177,-2.848293621866169,-2.84583607653737,-2.843374279394746,-2.840908212000211,-2.838437855787416,-2.835963192060515,-2.8334842019929227,-2.8310008666260518,-2.8285131668680386,-2.82602108349245,-2.8235245971369785,-2.8210236883021147,-2.8185183373498095,-2.8160085245021165,-2.813494229839817,-2.8109754333010306,-2.8084521146798056,-2.8059242536246916,-2.803391829637296,-2.800854822070822,-2.7983132101285855,-2.795766972862516,-2.793216089171636,-2.7906605378005254,-2.788100297337758,-2.7855353462143273,-2.7829656627020434,-2.780391224911917,-2.777812010792516,-2.7752279981283046,-2.7726391645379582,-2.770045487472658,-2.767446944214364,-2.7648435118740617,-2.762235167389989,-2.759621887525838,-2.757003648868933,-2.7543804278283863,-2.7517522006332267,-2.749118943330502,-2.7464806317833608,-2.7438372416691044,-2.7411887484772124,-2.7385351275073444,-2.735876353867312,-2.7332124024710245,-2.730543248036404,-2.7278688650832756,-2.725189227931228,-2.722504310697441,-2.7198140872944867,-2.7171185314280972,-2.7144176165949063],"x":[-50.0,-49.940239043824704,-49.8804780876494,-49.820717131474105,-49.7609561752988,-49.701195219123505,-49.64143426294821,-49.581673306772906,-49.52191235059761,-49.462151394422314,-49.40239043824701,-49.342629482071715,-49.28286852589641,-49.223107569721115,-49.16334661354582,-49.103585657370516,-49.04382470119522,-48.98406374501992,-48.92430278884462,-48.864541832669325,-48.80478087649402,-48.745019920318725,-48.68525896414343,-48.625498007968126,-48.56573705179283,-48.50597609561753,-48.44621513944223,-48.386454183266935,-48.32669322709163,-48.266932270916335,-48.20717131474104,-48.147410358565736,-48.08764940239044,-48.02788844621514,-47.96812749003984,-47.908366533864545,-47.84860557768924,-47.788844621513945,-47.72908366533864,-47.669322709163346,-47.60956175298805,-47.54980079681275,-47.49003984063745,-47.430278884462155,-47.37051792828685,-47.310756972111555,-47.25099601593625,-47.191235059760956,-47.13147410358566,-47.07171314741036,-47.01195219123506,-46.95219123505976,-46.89243027888446,-46.832669322709165,-46.77290836653386,-46.713147410358566,-46.65338645418327,-46.59362549800797,-46.53386454183267,-46.47410358565737,-46.41434262948207,-46.354581673306775,-46.29482071713147,-46.235059760956176,-46.17529880478088,-46.11553784860558,-46.05577689243028,-45.99601593625498,-45.93625498007968,-45.876494023904385,-45.81673306772908,-45.756972111553786,-45.69721115537848,-45.63745019920319,-45.57768924302789,-45.51792828685259,-45.45816733067729,-45.398406374501995,-45.33864541832669,-45.278884462151396,-45.21912350597609,-45.1593625498008,-45.0996015936255,-45.0398406374502,-44.9800796812749,-44.9203187250996,-44.8605577689243,-44.800796812749006,-44.7410358565737,-44.68127490039841,-44.62151394422311,-44.56175298804781,-44.50199203187251,-44.44223107569721,-44.38247011952191,-44.322709163346616,-44.26294820717131,-44.20318725099602,-44.14342629482072,-44.08366533864542,-44.02390438247012,-43.96414342629482,-43.90438247011952,-43.844621513944226,-43.78486055776892,-43.72509960159363,-43.66533864541832,-43.60557768924303,-43.54581673306773,-43.48605577689243,-43.42629482071713,-43.366533864541836,-43.30677290836653,-43.24701195219124,-43.18725099601593,-43.12749003984064,-43.06772908366534,-43.00796812749004,-42.94820717131474,-42.88844621513944,-42.82868525896414,-42.76892430278885,-42.70916334661354,-42.64940239043825,-42.58964143426295,-42.52988047808765,-42.47011952191235,-42.41035856573705,-42.35059760956175,-42.29083665338646,-42.23107569721115,-42.17131474103586,-42.11155378486056,-42.05179282868526,-41.99203187250996,-41.93227091633466,-41.87250996015936,-41.81274900398407,-41.75298804780876,-41.69322709163347,-41.633466135458164,-41.57370517928287,-41.51394422310757,-41.45418326693227,-41.39442231075697,-41.33466135458168,-41.27490039840637,-41.21513944223108,-41.155378486055774,-41.09561752988048,-41.03585657370518,-40.97609561752988,-40.91633466135458,-40.85657370517928,-40.79681274900398,-40.73705179282869,-40.677290836653384,-40.61752988047809,-40.55776892430279,-40.49800796812749,-40.43824701195219,-40.37848605577689,-40.31872509960159,-40.2589641434263,-40.199203187250994,-40.1394422310757,-40.0796812749004,-40.0199203187251,-39.9601593625498,-39.9003984063745,-39.8406374501992,-39.78087649402391,-39.721115537848604,-39.66135458167331,-39.601593625498005,-39.54183266932271,-39.48207171314741,-39.42231075697211,-39.36254980079681,-39.30278884462152,-39.243027888446214,-39.18326693227092,-39.123505976095615,-39.06374501992032,-39.00398406374502,-38.94422310756972,-38.88446215139442,-38.82470119521912,-38.764940239043824,-38.70517928286853,-38.645418326693225,-38.58565737051793,-38.52589641434263,-38.46613545816733,-38.40637450199203,-38.34661354581673,-38.286852589641434,-38.22709163346614,-38.167330677290835,-38.10756972111554,-38.04780876494024,-37.98804780876494,-37.92828685258964,-37.86852589641434,-37.808764940239044,-37.74900398406375,-37.689243027888445,-37.62948207171315,-37.569721115537845,-37.50996015936255,-37.45019920318725,-37.39043824701195,-37.330677290836654,-37.27091633466136,-37.211155378486055,-37.15139442231076,-37.091633466135455,-37.03187250996016,-36.97211155378486,-36.91235059760956,-36.852589641434264,-36.79282868525896,-36.733067729083665,-36.67330677290837,-36.613545816733065,-36.55378486055777,-36.49402390438247,-36.43426294820717,-36.374501992031874,-36.31474103585657,-36.254980079681275,-36.19521912350598,-36.135458167330675,-36.07569721115538,-36.01593625498008,-35.95617529880478,-35.896414342629484,-35.83665338645418,-35.776892430278885,-35.71713147410359,-35.657370517928285,-35.59760956175299,-35.537848605577686,-35.47808764940239,-35.418326693227094,-35.35856573705179,-35.298804780876495,-35.2390438247012,-35.179282868525895,-35.1195219123506,-35.059760956175296,-35.0,-34.940239043824704,-34.8804780876494,-34.820717131474105,-34.7609561752988,-34.701195219123505,-34.64143426294821,-34.581673306772906,-34.52191235059761,-34.462151394422314,-34.40239043824701,-34.342629482071715,-34.28286852589641,-34.223107569721115,-34.16334661354582,-34.103585657370516,-34.04382470119522,-33.98406374501992,-33.92430278884462,-33.864541832669325,-33.80478087649402,-33.745019920318725,-33.68525896414343,-33.625498007968126,-33.56573705179283,-33.50597609561753,-33.44621513944223,-33.386454183266935,-33.32669322709163,-33.266932270916335,-33.20717131474104,-33.147410358565736,-33.08764940239044,-33.02788844621514,-32.96812749003984,-32.908366533864545,-32.84860557768924,-32.788844621513945,-32.72908366533864,-32.669322709163346,-32.60956175298805,-32.54980079681275,-32.49003984063745,-32.430278884462155,-32.37051792828685,-32.310756972111555,-32.25099601593625,-32.191235059760956,-32.13147410358566,-32.07171314741036,-32.01195219123506,-31.95219123505976,-31.89243027888446,-31.83266932270916,-31.772908366533866,-31.713147410358566,-31.653386454183266,-31.593625498007967,-31.53386454183267,-31.47410358565737,-31.41434262948207,-31.35458167330677,-31.294820717131476,-31.235059760956176,-31.175298804780876,-31.115537848605577,-31.05577689243028,-30.99601593625498,-30.93625498007968,-30.87649402390438,-30.816733067729082,-30.756972111553786,-30.697211155378486,-30.637450199203187,-30.577689243027887,-30.51792828685259,-30.45816733067729,-30.39840637450199,-30.338645418326692,-30.278884462151396,-30.219123505976096,-30.159362549800797,-30.099601593625497,-30.0398406374502,-29.9800796812749,-29.9203187250996,-29.860557768924302,-29.800796812749002,-29.741035856573706,-29.681274900398407,-29.621513944223107,-29.561752988047807,-29.50199203187251,-29.44223107569721,-29.382470119521912,-29.322709163346612,-29.262948207171316,-29.203187250996017,-29.143426294820717,-29.083665338645417,-29.02390438247012,-28.96414342629482,-28.904382470119522,-28.844621513944222,-28.784860557768923,-28.725099601593627,-28.665338645418327,-28.605577689243027,-28.545816733067728,-28.48605577689243,-28.426294820717132,-28.366533864541832,-28.306772908366533,-28.247011952191237,-28.187250996015937,-28.127490039840637,-28.067729083665338,-28.00796812749004,-27.948207171314742,-27.888446215139442,-27.828685258964143,-27.768924302788843,-27.709163346613547,-27.649402390438247,-27.589641434262948,-27.529880478087648,-27.470119521912352,-27.410358565737052,-27.350597609561753,-27.290836653386453,-27.231075697211157,-27.171314741035857,-27.111553784860558,-27.051792828685258,-26.99203187250996,-26.932270916334662,-26.872509960159363,-26.812749003984063,-26.752988047808763,-26.693227091633467,-26.633466135458168,-26.573705179282868,-26.51394422310757,-26.454183266932272,-26.394422310756973,-26.334661354581673,-26.274900398406373,-26.215139442231077,-26.155378486055778,-26.095617529880478,-26.03585657370518,-25.97609561752988,-25.916334661354583,-25.856573705179283,-25.796812749003983,-25.737051792828684,-25.677290836653388,-25.617529880478088,-25.55776892430279,-25.49800796812749,-25.438247011952193,-25.378486055776893,-25.318725099601593,-25.258964143426294,-25.199203187250998,-25.139442231075698,-25.0796812749004,-25.0199203187251,-24.9601593625498,-24.900398406374503,-24.840637450199203,-24.780876494023904,-24.721115537848604,-24.661354581673308,-24.60159362549801,-24.54183266932271,-24.48207171314741,-24.422310756972113,-24.362549800796813,-24.302788844621514,-24.243027888446214,-24.183266932270918,-24.12350597609562,-24.06374501992032,-24.00398406374502,-23.94422310756972,-23.884462151394423,-23.824701195219124,-23.764940239043824,-23.705179282868524,-23.64541832669323,-23.58565737051793,-23.52589641434263,-23.46613545816733,-23.406374501992033,-23.346613545816734,-23.286852589641434,-23.227091633466134,-23.16733067729084,-23.10756972111554,-23.04780876494024,-22.98804780876494,-22.92828685258964,-22.868525896414344,-22.808764940239044,-22.749003984063744,-22.689243027888445,-22.62948207171315,-22.56972111553785,-22.50996015936255,-22.45019920318725,-22.390438247011954,-22.330677290836654,-22.270916334661354,-22.211155378486055,-22.15139442231076,-22.09163346613546,-22.03187250996016,-21.97211155378486,-21.91235059760956,-21.852589641434264,-21.792828685258964,-21.733067729083665,-21.673306772908365,-21.61354581673307,-21.55378486055777,-21.49402390438247,-21.43426294820717,-21.374501992031874,-21.314741035856574,-21.254980079681275,-21.195219123505975,-21.13545816733068,-21.07569721115538,-21.01593625498008,-20.95617529880478,-20.89641434262948,-20.836653386454184,-20.776892430278885,-20.717131474103585,-20.657370517928285,-20.59760956175299,-20.53784860557769,-20.47808764940239,-20.41832669322709,-20.358565737051794,-20.298804780876495,-20.239043824701195,-20.179282868525895,-20.1195219123506,-20.0597609561753,-20.0]}
},{}],83:[function(require,module,exports){
module.exports={"expected":[2.7144176165949063,2.7171185314280972,2.7198140872944867,2.722504310697441,2.725189227931228,2.7278688650832756,2.730543248036404,2.7332124024710245,2.735876353867312,2.7385351275073444,2.7411887484772124,2.7438372416691044,2.7464806317833608,2.749118943330502,2.7517522006332267,2.7543804278283863,2.757003648868933,2.759621887525838,2.762235167389989,2.7648435118740617,2.767446944214364,2.770045487472658,2.7726391645379582,2.7752279981283046,2.777812010792516,2.780391224911917,2.7829656627020434,2.7855353462143273,2.788100297337758,2.7906605378005254,2.793216089171636,2.795766972862516,2.7983132101285855,2.800854822070822,2.803391829637296,2.8059242536246916,2.8084521146798056,2.8109754333010306,2.813494229839817,2.8160085245021165,2.8185183373498095,2.8210236883021147,2.8235245971369785,2.82602108349245,2.8285131668680386,2.8310008666260518,2.8334842019929227,2.835963192060515,2.838437855787416,2.840908212000211,2.843374279394746,2.84583607653737,2.848293621866169,2.850746933692177,2.8531960302005794,2.8556409294518983,2.858081649383165,2.8605182078090774,2.862950622423145,2.8653789107988192,2.86780309039061,2.8702231785351917,2.872639192452492,2.875051149246773,2.877459065907693,2.8798629593113625,2.882262846221385,2.8846587432898847,2.887050667058523,2.889438633959505,2.891822660316572,2.8942027623459827,2.8965789561574864,2.8989512577552796,2.9013196830389574,2.9036842478044473,2.9060449677449416,2.9084018584518097,2.910754935415506,2.913104214026465,2.9154497095759893,2.917791437257122,2.9201294121655157,2.9224636493002882,2.9247941635648678,2.927120969767833,2.9294440826237387,2.9317635167539358,2.93407928668738,2.9363914068614365,2.938699891622666,2.9410047552276137,2.94330601184358,2.945603675549391,2.9478977603361507,2.950188280107997,2.952475248682839,2.9547586797930925,2.9570385870864055,2.9593149841263737,2.961587884393255,2.9638573012846683,2.9661232481162894,2.9683857381225396,2.9706447844572654,2.9729004001944097,2.975152598328681,2.9774013917762088,2.979646793375199,2.9818888158865753,2.9841274719946194,2.986362774307603,2.9885947353584106,2.9908233676051603,2.9930486834318137,2.995270695148783,2.9974894149935296,2.9997048551311565,3.001917027654997,3.0041259445871944,3.0063316178792765,3.008534059412727,3.0107332809995446,3.0129292943828054,3.0151221112372113,3.0173117431696372,3.0194982017196716,3.0216814983601523,3.0238616444976945,3.026038651473218,3.028212530562463,3.030383292976508,3.0325509498622742,3.0347155123030336,3.0368769913189033,3.0390353978673432,3.0411907428436424,3.0433430370814043,3.0454922913530247,3.0476385163701676,3.0497817227842337,3.0519219211868274,3.054059122110215,3.0561933360277824,3.0583245733544877,3.0604528444473056,3.062578159605672,3.0647005290719243,3.0668199630317323,3.068936471614531,3.0710500648939454,3.073160752888212,3.0752685455605993,3.0773734528198187,3.079475484520435,3.0815746504632746,3.083670960395824,3.0857644240126314,3.0878550509557,3.089942850814878,3.0920278331282467,3.094110007382504,3.096189383013344,3.0982659694058325,3.1003397758947813,3.102410811765117,3.104479086252245,3.106544608542415,3.1086073877730773,3.110667433033241,3.112724753363824,3.1147793577580036,3.1168312551615625,3.1188804544732305,3.120926964545026,3.12297079418259,3.1250119521455217,3.1270504471477083,3.1290862878576506,3.1311194828987907,3.1331500408498307,3.1351779702450524,3.1372032795746323,3.139225977284956,3.141246071778925,3.1432635714162673,3.1452784845138404,3.1472908193459332,3.1493005841445645,3.151307787099779,3.1533124363599434,3.1553145400320335,3.1573141061819276,3.1593111428346883,3.1613056579748475,3.163297659546688,3.1652871554545214,3.167274153562963,3.169258661697208,3.171240687643299,3.1732202391483986,3.1751973239210542,3.177171949631461,3.1791441239117257,3.181113854356126,3.1830811485213664,3.1850460139268346,3.1870084580548546,3.188968488350936,3.1909261122240244,3.1928813370467464,3.194834170155655,3.1967846188514715,3.1987326903993245,3.2006783920289905,3.2026217309351277,3.2045627142775115,3.2065013491812664,3.208437642737095,3.2103716020015085,3.2123032339970505,3.2142325457125236,3.21615954410321,3.2180842360910935,3.220006628565079,3.221926728381206,3.2238445423628677,3.2257600773010235,3.227673339954408,3.229584337049744,3.2314930752819495,3.2333995613143434,3.235303801778852,3.237205803276209,3.23910557237616,3.2410031156176613,3.242898439509076,3.2447915505283738,3.2466824551233224,3.248571159711683,3.2504576706814023,3.2523419943908003,3.2542241371687615,3.2561041053149187,3.257981905099844,3.2598575427652263,3.2617310245240585,3.263602356560817,3.265471545031642,3.2673385960645134,3.2692035157594317,3.2710663101885897,3.2729269853965484,3.2747855474004086,3.276642002189983,3.2784963557279663,3.280348613950102,3.2821987827653514,3.2840468680560586,3.2858928756781154,3.2877368114611243,3.2895786812085617,3.291418490697936,3.2932562456809493,3.2950919518836566,3.2969256150066184,3.298757240725062,3.3005868346890317,3.302414402523545,3.3042399498287423,3.306063482180041,3.307885005128283,3.3097045241998826,3.3115220448969778,3.313337572697573,3.3151511130556854,3.316962671401491,3.3187722531414647,3.3205798636585238,3.3223855083121703,3.3241891924386273,3.3259909213509817,3.3277907003393183,3.32958853467086,3.3313844295900994,3.3331783903189374,3.3349704220568146,3.3367605299808445,3.3385487192459444,3.340334994984968,3.342119362308832,3.3439018263066482,3.3456823920458483,3.3474610645723115,3.3492378489104926,3.3510127500635436,3.35278577301344,3.354556922721101,3.3563262041265163,3.358093622148863,3.359859181686628,3.361622887617728,3.363384744799625,3.365144758069449,3.3669029322441095,3.368659272120416,3.3704137824751905,3.3721664680653824,3.373917333628183,3.3756663838811365,3.377413623522253,3.37915905723012,3.3809026896640106,3.3826445254639954,3.3843845692510497,3.3861228256271616,3.3878592991754393,3.389593994460217,3.391326916027162,3.3930580684033766,3.3947874560975055,3.3965150835998372,3.3982409553824064,3.399965075899097,3.4016874495857428,3.403408080860227,3.4051269741225836,3.4068441337550954,3.408559564122392,3.4102732695715487,3.4119852544321816,3.4136955230165467,3.415404079619631,3.4171109285192527,3.4188160739761515,3.420519520234084,3.422221271519916,3.4239213320437147,3.425619705998842,3.427316397562042,3.429011410893536,3.4307047501371084,3.4323964194201975,3.4340864228539836,3.435774764533478,3.4374614485376087,3.4391464789293074,3.440829859755598,3.442511595047679,3.4441916888210087,3.4458701450753924,3.4475469677950636,3.4492221609487683,3.4508957284898467,3.4525676743563163,3.4542380024709534,3.455906716741373,3.457573821060112,3.4592393193047037,3.4609032153377646,3.4625655130070663,3.464226216145618,3.4658853285717424,3.4675428540891544,3.4691987964870368,3.4708531595401166,3.4725059470087403,3.4741571626389502,3.475806810162559,3.4774548932972236,3.4791014157465185,3.4807463812000083,3.482389793333324,3.4840316558082307,3.4856719722727028,3.4873107463609934,3.488947981693706,3.490583681877864,3.4922178505069836,3.493850491161138,3.4954816074070316,3.4971112027980658,3.498739280874407,3.500365845163056,3.5019908991779136,3.5036144464198484,3.5052364903767628,3.5068570345236583,3.508476082322703,3.510093637223294,3.5117097026621242,3.5133242820632455,3.514937378838133,3.516548996385748,3.5181591380926025,3.5197678073328187,3.5213750074681958,3.5229807418482673,3.5245850138103645,3.5261878266796787,3.527789183769319,3.529389088380376,3.5309875438019778,3.5325845533113522,3.5341801201738865,3.5357742476431833,3.537366938961121,3.538958197357911,3.5405480260521562,3.542136428250908,3.543723407149722,3.545308965932716,3.5468931077726267,3.5484758358308626,3.5500571532575638,3.5516370631916536,3.553215568760895,3.554792673081945,3.5563683792604084,3.5579426903908917,3.559515609557057,3.5610871398316752,3.5626572842766775,3.5642260459432102,3.565793427871684,3.5673594330918297,3.5689240646227445,3.5704873254729486,3.5720492186404327,3.5736097471127097,3.575168913866865,3.5767267218696057,3.5782831740773124,3.5798382734360854,3.581392022881797,3.5829444253401372,3.584495483726665,3.5860452009468546,3.587593579896145,3.5891406234599845,3.590686334513883,3.5922307159234537,3.593773770544464,3.5953155012228786,3.5968559107949094,3.598395002087058,3.599932777916164,3.601469241089446,3.6030043944045542,3.604538240649608,3.6060707826032434,3.607602023034659,3.6091319647036566,3.610660610360688,3.6121879627468956,3.613714024594159,3.615238798625135,3.6167622875533025,3.6182844940830035,3.6198054209094863,3.621325070718947,3.622843446188571,3.6243605499865756,3.6258763847722504,3.6273909531959982,3.628904257899376,3.6304163015151363,3.6319270866672655,3.6334366159710263,3.634944892032996,3.6364519174511063,3.6379576948146832,3.6394622267044863,3.640965515692746,3.642467564343205,3.6439683752111542,3.645467950843472,3.646966293778663,3.6484634065468953,3.649959291670037,3.6514539516616953,3.6529473890272524,3.654439606263903,3.6559306058606924,3.657420390298549,3.658908962050326,3.6603963235808332,3.6618824773468748,3.663367425797285,3.664851171372963,3.6663337165069096,3.66781506362426,3.669295215142321,3.6707741734706048,3.6722519410108627,3.6737285201571206,3.6752039132957135,3.6766781228053174,3.6781511510569853,3.67962300041418,3.6810936732328057,3.682563171861245,3.684031498640387],"x":[20.0,20.0597609561753,20.1195219123506,20.179282868525895,20.239043824701195,20.298804780876495,20.358565737051794,20.41832669322709,20.47808764940239,20.53784860557769,20.59760956175299,20.657370517928285,20.717131474103585,20.776892430278885,20.836653386454184,20.89641434262948,20.95617529880478,21.01593625498008,21.07569721115538,21.13545816733068,21.195219123505975,21.254980079681275,21.314741035856574,21.374501992031874,21.43426294820717,21.49402390438247,21.55378486055777,21.61354581673307,21.673306772908365,21.733067729083665,21.792828685258964,21.852589641434264,21.91235059760956,21.97211155378486,22.03187250996016,22.09163346613546,22.15139442231076,22.211155378486055,22.270916334661354,22.330677290836654,22.390438247011954,22.45019920318725,22.50996015936255,22.56972111553785,22.62948207171315,22.689243027888445,22.749003984063744,22.808764940239044,22.868525896414344,22.92828685258964,22.98804780876494,23.04780876494024,23.10756972111554,23.16733067729084,23.227091633466134,23.286852589641434,23.346613545816734,23.406374501992033,23.46613545816733,23.52589641434263,23.58565737051793,23.64541832669323,23.705179282868524,23.764940239043824,23.824701195219124,23.884462151394423,23.94422310756972,24.00398406374502,24.06374501992032,24.12350597609562,24.183266932270918,24.243027888446214,24.302788844621514,24.362549800796813,24.422310756972113,24.48207171314741,24.54183266932271,24.60159362549801,24.661354581673308,24.721115537848604,24.780876494023904,24.840637450199203,24.900398406374503,24.9601593625498,25.0199203187251,25.0796812749004,25.139442231075698,25.199203187250998,25.258964143426294,25.318725099601593,25.378486055776893,25.438247011952193,25.49800796812749,25.55776892430279,25.617529880478088,25.677290836653388,25.737051792828684,25.796812749003983,25.856573705179283,25.916334661354583,25.97609561752988,26.03585657370518,26.095617529880478,26.155378486055778,26.215139442231077,26.274900398406373,26.334661354581673,26.394422310756973,26.454183266932272,26.51394422310757,26.573705179282868,26.633466135458168,26.693227091633467,26.752988047808763,26.812749003984063,26.872509960159363,26.932270916334662,26.99203187250996,27.051792828685258,27.111553784860558,27.171314741035857,27.231075697211157,27.290836653386453,27.350597609561753,27.410358565737052,27.470119521912352,27.529880478087648,27.589641434262948,27.649402390438247,27.709163346613547,27.768924302788843,27.828685258964143,27.888446215139442,27.948207171314742,28.00796812749004,28.067729083665338,28.127490039840637,28.187250996015937,28.247011952191237,28.306772908366533,28.366533864541832,28.426294820717132,28.48605577689243,28.545816733067728,28.605577689243027,28.665338645418327,28.725099601593627,28.784860557768923,28.844621513944222,28.904382470119522,28.96414342629482,29.02390438247012,29.083665338645417,29.143426294820717,29.203187250996017,29.262948207171316,29.322709163346612,29.382470119521912,29.44223107569721,29.50199203187251,29.561752988047807,29.621513944223107,29.681274900398407,29.741035856573706,29.800796812749002,29.860557768924302,29.9203187250996,29.9800796812749,30.0398406374502,30.099601593625497,30.159362549800797,30.219123505976096,30.278884462151396,30.338645418326692,30.39840637450199,30.45816733067729,30.51792828685259,30.577689243027887,30.637450199203187,30.697211155378486,30.756972111553786,30.816733067729082,30.87649402390438,30.93625498007968,30.99601593625498,31.05577689243028,31.115537848605577,31.175298804780876,31.235059760956176,31.294820717131476,31.35458167330677,31.41434262948207,31.47410358565737,31.53386454183267,31.593625498007967,31.653386454183266,31.713147410358566,31.772908366533866,31.83266932270916,31.89243027888446,31.95219123505976,32.01195219123506,32.07171314741036,32.13147410358566,32.191235059760956,32.25099601593625,32.310756972111555,32.37051792828685,32.430278884462155,32.49003984063745,32.54980079681275,32.60956175298805,32.669322709163346,32.72908366533864,32.788844621513945,32.84860557768924,32.908366533864545,32.96812749003984,33.02788844621514,33.08764940239044,33.147410358565736,33.20717131474104,33.266932270916335,33.32669322709163,33.386454183266935,33.44621513944223,33.50597609561753,33.56573705179283,33.625498007968126,33.68525896414343,33.745019920318725,33.80478087649402,33.864541832669325,33.92430278884462,33.98406374501992,34.04382470119522,34.103585657370516,34.16334661354582,34.223107569721115,34.28286852589641,34.342629482071715,34.40239043824701,34.462151394422314,34.52191235059761,34.581673306772906,34.64143426294821,34.701195219123505,34.7609561752988,34.820717131474105,34.8804780876494,34.940239043824704,35.0,35.059760956175296,35.1195219123506,35.179282868525895,35.2390438247012,35.298804780876495,35.35856573705179,35.418326693227094,35.47808764940239,35.537848605577686,35.59760956175299,35.657370517928285,35.71713147410359,35.776892430278885,35.83665338645418,35.896414342629484,35.95617529880478,36.01593625498008,36.07569721115538,36.135458167330675,36.19521912350598,36.254980079681275,36.31474103585657,36.374501992031874,36.43426294820717,36.49402390438247,36.55378486055777,36.613545816733065,36.67330677290837,36.733067729083665,36.79282868525896,36.852589641434264,36.91235059760956,36.97211155378486,37.03187250996016,37.091633466135455,37.15139442231076,37.211155378486055,37.27091633466136,37.330677290836654,37.39043824701195,37.45019920318725,37.50996015936255,37.569721115537845,37.62948207171315,37.689243027888445,37.74900398406375,37.808764940239044,37.86852589641434,37.92828685258964,37.98804780876494,38.04780876494024,38.10756972111554,38.167330677290835,38.22709163346614,38.286852589641434,38.34661354581673,38.40637450199203,38.46613545816733,38.52589641434263,38.58565737051793,38.645418326693225,38.70517928286853,38.764940239043824,38.82470119521912,38.88446215139442,38.94422310756972,39.00398406374502,39.06374501992032,39.123505976095615,39.18326693227092,39.243027888446214,39.30278884462152,39.36254980079681,39.42231075697211,39.48207171314741,39.54183266932271,39.601593625498005,39.66135458167331,39.721115537848604,39.78087649402391,39.8406374501992,39.9003984063745,39.9601593625498,40.0199203187251,40.0796812749004,40.1394422310757,40.199203187250994,40.2589641434263,40.31872509960159,40.37848605577689,40.43824701195219,40.49800796812749,40.55776892430279,40.61752988047809,40.677290836653384,40.73705179282869,40.79681274900398,40.85657370517928,40.91633466135458,40.97609561752988,41.03585657370518,41.09561752988048,41.155378486055774,41.21513944223108,41.27490039840637,41.33466135458168,41.39442231075697,41.45418326693227,41.51394422310757,41.57370517928287,41.633466135458164,41.69322709163347,41.75298804780876,41.81274900398407,41.87250996015936,41.93227091633466,41.99203187250996,42.05179282868526,42.11155378486056,42.17131474103586,42.23107569721115,42.29083665338646,42.35059760956175,42.41035856573705,42.47011952191235,42.52988047808765,42.58964143426295,42.64940239043825,42.70916334661354,42.76892430278885,42.82868525896414,42.88844621513944,42.94820717131474,43.00796812749004,43.06772908366534,43.12749003984064,43.18725099601593,43.24701195219124,43.30677290836653,43.366533864541836,43.42629482071713,43.48605577689243,43.54581673306773,43.60557768924303,43.66533864541832,43.72509960159363,43.78486055776892,43.844621513944226,43.90438247011952,43.96414342629482,44.02390438247012,44.08366533864542,44.14342629482072,44.20318725099602,44.26294820717131,44.322709163346616,44.38247011952191,44.44223107569721,44.50199203187251,44.56175298804781,44.62151394422311,44.68127490039841,44.7410358565737,44.800796812749006,44.8605577689243,44.9203187250996,44.9800796812749,45.0398406374502,45.0996015936255,45.1593625498008,45.21912350597609,45.278884462151396,45.33864541832669,45.398406374501995,45.45816733067729,45.51792828685259,45.57768924302789,45.63745019920319,45.69721115537848,45.756972111553786,45.81673306772908,45.876494023904385,45.93625498007968,45.99601593625498,46.05577689243028,46.11553784860558,46.17529880478088,46.235059760956176,46.29482071713147,46.354581673306775,46.41434262948207,46.47410358565737,46.53386454183267,46.59362549800797,46.65338645418327,46.713147410358566,46.77290836653386,46.832669322709165,46.89243027888446,46.95219123505976,47.01195219123506,47.07171314741036,47.13147410358566,47.191235059760956,47.25099601593625,47.310756972111555,47.37051792828685,47.430278884462155,47.49003984063745,47.54980079681275,47.60956175298805,47.669322709163346,47.72908366533864,47.788844621513945,47.84860557768924,47.908366533864545,47.96812749003984,48.02788844621514,48.08764940239044,48.147410358565736,48.20717131474104,48.266932270916335,48.32669322709163,48.386454183266935,48.44621513944223,48.50597609561753,48.56573705179283,48.625498007968126,48.68525896414343,48.745019920318725,48.80478087649402,48.864541832669325,48.92430278884462,48.98406374501992,49.04382470119522,49.103585657370516,49.16334661354582,49.223107569721115,49.28286852589641,49.342629482071715,49.40239043824701,49.462151394422314,49.52191235059761,49.581673306772906,49.64143426294821,49.701195219123505,49.7609561752988,49.820717131474105,49.8804780876494,49.940239043824704,50.0]}
},{}],84:[function(require,module,exports){
module.exports={"expected":[-1.4422495703074083,-1.4476560690856095,-1.4530224838724708,-1.4583495494668979,-1.4636379793500618,-1.4688884665266435,-1.4741016843242778,-1.4792782871536894,-1.484418911231847,-1.4895241752702957,-1.49459468113068,-1.499631014449346,-1.5046337452327647,-1.5096034284254254,-1.514540604451723,-1.519445799733274,-1.524319527183002,-1.5291622866772439,-1.5339745655070565,-1.5387568388098245,-1.5435095699822035,-1.54823321107537,-1.55292820317349,-1.5575949767562651,-1.56223395204636,-1.5668455393424712,-1.5714301393387524,-1.5759881434312675,-1.5805199340121054,-1.5850258847517567,-1.5895063608703142,-1.5939617193980302,-1.5983923094257357,-1.6027984723455921,-1.6071805420826302,-1.6115388453174968,-1.6158737017008136,-1.6201854240595275,-1.6244743185956132,-1.6287406850774708,-1.632984817024338,-1.6372070018840308,-1.6414075212042958,-1.6455866507980563,-1.6497446609028132,-1.6538818163344486,-1.6579983766356685,-1.6620945962193137,-1.6661707245067485,-1.6702270060615323,-1.6742636807185685,-1.6782809837089159,-1.682279145780436,-1.686258393314445,-1.6902189484385308,-1.6941610291356852,-1.6980848493498975,-1.701990619088349,-1.705878544520337,-1.7097488280730593,-1.7136016685243731,-1.7174372610926516,-1.7212557975238394,-1.7250574661758182,-1.728842452100181,-1.73261093712151,-1.7363630999142496,-1.7400991160772679,-1.743819158206181,-1.7475233959635315,-1.751211996146889,-1.7548851227549542,-1.758542937051731,-1.7621855976288399,-1.7658132604660344,-1.7694260789899838,-1.7730242041313835,-1.7766077843804475,-1.7801769658408422,-1.7837318922821097,-1.787272705190638,-1.790799543819219,-1.7943125452352473,-1.7978118443676039,-1.801297574052266,-1.8047698650766852,-1.808228846222977,-1.8116746443099565,-1.8151073842340593,-1.8185271890091836,-1.8219341798054858,-1.8253284759871666,-1.8287101951492746,-1.8320794531535616,-1.8354363641634186,-1.8387810406779197,-1.8421135935650028,-1.8454341320938124,-1.84874276396623,-1.85203959534762,-1.8553247308968088,-1.8585982737953246,-1.8618603257759196,-1.865110987150394,-1.8683503568367434,-1.8715785323856506,-1.8747956100063379,-1.878001684591803,-1.8811968497434512,-1.884381197795146,-1.8875548198366912,-1.8907178057367626,-1.8938702441653055,-1.8970122226154087,-1.9001438274246776,-1.9032651437961112,-1.9063762558185056,-1.9094772464863885,-1.9125681977195057,-1.9156491903818662,-1.9187203043003593,-1.9217816182829583,-1.9248332101365166,-1.9278751566841723,-1.930907533782368,-1.9339304163374984,-1.9369438783221946,-1.939947992791255,-1.942942831897231,-1.9459284669056789,-1.9489049682100834,-1.9518724053464642,-1.9548308470076727,-1.9577803610573858,-1.9607210145438068,-1.963652873713077,-1.9665760040224114,-1.9694904701529585,-1.9723963360223968,-1.9752936647972703,-1.9781825189050732,-1.981062960046087,-1.9839350492049785,-1.986798846662162,-1.9896544120049338,-1.9925018041383835,-1.9953410812960877,-1.9981723010505907,-2.0009955203236793,-2.003810795396452,-2.006618181919195,-2.009417734921063,-2.0122095088195713,-2.0149935574299045,-2.017769933974045,-2.0205386910897296,-2.0232998808392293,-2.0260535547179663,-2.0287997636629647,-2.031538558061142,-2.0342699877574475,-2.0369941020628426,-2.0397109497621377,-2.0424205791216785,-2.045123037896895,-2.0478183733397053,-2.050506632205789,-2.0531878607617235,-2.055862104791992,-2.058529409605863,-2.061189820044149,-2.063843380485836,-2.066490134854602,-2.0691301266252147,-2.0717633988298134,-2.0743899940640858,-2.077009954493329,-2.0796233218584073,-2.082230137481604,-2.0848304422723722,-2.087424276732984,-2.0900116809640834,-2.09259269467014,-2.095167357164813,-2.09773570737622,-2.1002977838521177,-2.102853624764992,-2.105403267917064,-2.10794675074521,-2.110484110325799,-2.1130153833794503,-2.115540606275707,-2.1180598150376384,-2.12057304534636,-2.1230803325454812,-2.125581711645481,-2.1280772173280083,-2.130566883950114,-2.1330507455484145,-2.1355288358431865,-2.138001188242395,-2.140467835845657,-2.142928811448141,-2.1453841475444064,-2.147833876332175,-2.1502780297160515,-2.152716639311176,-2.1551497364468255,-2.157577352169955,-2.159999517248684,-2.1624162621757286,-2.164827617171779,-2.167233612188826,-2.169634276913434,-2.1720296407699657,-2.1744197329237553,-2.1768045822842335,-2.1791842175080047,-2.1815586670018767,-2.183927958925848,-2.186292121196041,-2.1886511814876033,-2.191005167237553,-2.1933541056475914,-2.195698023686866,-2.1980369480946966,-2.2003709053832603,-2.2026999218402357,-2.205024023531408,-2.2073432363032364,-2.2096575857853855,-2.211967097393215,-2.214271796330237,-2.2165717075905373,-2.21886685596116,-2.2211572660244587,-2.223442962160412,-2.2257239685489107,-2.228000309172005,-2.230272007816126,-2.2325390880742715,-2.2348015733481637,-2.237059486850374,-2.2393128516064196,-2.2415616904568285,-2.243806026059178,-2.2460458808901054,-2.2482812772472833,-2.2505122372513795,-2.2527387828479797,-2.254960935809488,-2.2571787177370006,-2.259392150062154,-2.261601254048946,-2.2638060507955364,-2.2660065612360176,-2.268202806142164,-2.270394806125159,-2.272582581637297,-2.27476615297366,-2.2769455402737786,-2.279120763523264,-2.2812918425554205,-2.2834587970528397,-2.2856216465489667,-2.2877804104296544,-2.2899351079346872,-2.2920857581592955,-2.294232380055641,-2.2963749924342873,-2.298513613965652,-2.300648263181437,-2.3027789584760416,-2.3049057181079586,-2.307028560201149,-2.3091475027464035,-2.311262563602684,-2.313373760498446,-2.3154811110329483,-2.3175846326775447,-2.3196843427769562,-2.3217802585505316,-2.32387239709349,-2.3259607753781464,-2.328045410255126,-2.3301263184545573,-2.332203516587257,-2.3342770211458954,-2.3363468485061474,-2.338413014927833,-2.3404755365560397,-2.3425344294222348,-2.344589709445359,-2.3466413924329115,-2.3486894940820195,-2.350734029980496,-2.3527750156078815,-2.3548124663364773,-2.356846397432364,-2.3588768240564075,-2.360903761265255,-2.3629272240123154,-2.3649472271487317,-2.3669637854243395,-2.368976913488616,-2.3709866258916135,-2.3729929370848892,-2.374995861422416,-2.3769954131614885,-2.3789916064636145,-2.3809844553953985,-2.3829739739294142,-2.3849601759450665,-2.386943075229443,-2.3889226854781564,-2.3908990202961777,-2.392872093198658,-2.394841917611742,-2.3968085068733735,-2.3987718742340873,-2.400732032857798,-2.4026889958225746,-2.404642776121409,-2.406593386662975,-2.408540840272379,-2.410485149691903,-2.412426327581736,-2.414364386520701,-2.416299339006974,-2.418231197458789,-2.4201599742151423,-2.422085681536487,-2.4240083316054153,-2.4259279365273403,-2.4278445083311646,-2.429758058969944,-2.431668600321544,-2.433576144189289,-2.4354807023026024,-2.437382286317643,-2.439280907817931,-2.441176578314972,-2.4430693092488673,-2.4449591119889247,-2.4468459978342576,-2.4487299780143803,-2.4506110636897955,-2.452489265952577,-2.454364595826945,-2.456237064269835,-2.458106682171461,-2.4599734603558745,-2.461837409581514,-2.463698540541752,-2.4655568638654346,-2.467412390117414,-2.46926512979908,-2.471115093348881,-2.472962291142842,-2.4748067334950767,-2.4766484306582943,-2.478487392824302,-2.480323630124499,-2.48215715263037,-2.4839879703539713,-2.485816093248409,-2.4876415312083195,-2.4894642940703364,-2.4912843916135614,-2.4931018335600217,-2.4949166295751306,-2.4967287892681367,-2.4985383221925743,-2.5003452378467053,-2.502149545673958,-2.503951255063362,-2.505750375349977,-2.507546915815319,-2.509340885687784,-2.5111322941430596,-2.5129211503045448,-2.5147074632437527,-2.5164912419807197,-2.518272495484405,-2.520051232673086,-2.521827462414753,-2.5236011935274987,-2.5253724347799,-2.5271411948914047,-2.5289074825327047,-2.5306713063261124,-2.5324326748459303,-2.534191596618818,-2.5359480801241565,-2.537702133794405,-2.5394537660154604,-2.541202985127008,-2.542949799422873,-2.5446942171513633,-2.546436246515616,-2.548175895673933,-2.549913172740121,-2.5516480857838224,-2.553380642830845,-2.5551108518634904,-2.556838720820875,-2.5585642575992527,-2.5602874700523324,-2.5620083659915918,-2.5637269531865887,-2.5654432393652704,-2.5671572322142793,-2.5688689393792568,-2.5705783684651413,-2.572285527036467,-2.5739904226176584,-2.5756930626933223,-2.5773934547085364,-2.5790916060691353,-2.580787524141996,-2.5824812162553177,-2.5841726896989017,-2.5858619517244255,-2.5875490095457185,-2.5892338703390325,-2.590916541243309,-2.592597029360448,-2.5942753417555684,-2.5959514854572734,-2.5976254674579056,-2.599297294713806,-2.6009669741455688,-2.602634512638291,-2.6042999170418244,-2.6059631941710233,-2.607624350805989,-2.609283393692312,-2.6109403295413163,-2.612595165030295,-2.6142479068027487,-2.6158985614686197,-2.617547135604526,-2.6191936357539887,-2.620838068427665,-2.62248044010357,-2.624120757227306,-2.625759026212281,-2.627395253439932,-2.6290294452599423,-2.6306616079904592,-2.632291747918309,-2.6339198712992093,-2.6355459843579805,-2.6371700932887565,-2.6387922042551906,-2.6404123233906613,-2.642030456798479,-2.643646610552085,-2.6452607906952537,-2.646873003242292,-2.6484832541782355,-2.650091549459045,-2.6516978950117984,-2.653302296734885,-2.6549047604981966,-2.656505292143313,-2.6581038974836932,-2.6597005823048594,-2.661295352364581,-2.662888213393059,-2.6644791710931046,-2.6660682311403217,-2.6676553991832823,-2.6692406808437057,-2.6708240817166327,-2.6724056073705977,-2.6739852633478054,-2.6755630551642957,-2.677138988310119,-2.6787130682495004,-2.6802853004210085,-2.68185569023772,-2.6834242430873827,-2.684990964332581,-2.6865558593108934,-2.688118933335056,-2.68968019169312,-2.6912396396486082,-2.6927972824406714,-2.694353125284245,-2.695907173370201,-2.6974594318655,-2.699009905913345,-2.700558600633327,-2.7021055211215796,-2.7036506724509204,-2.705194059671001,-2.706735687808454,-2.7082755618670302,-2.70981368682775,-2.7113500676490387,-2.7128847092668704,-2.7144176165949063],"x":[-3.0,-3.0338645418326693,-3.0677290836653386,-3.101593625498008,-3.135458167330677,-3.1693227091633465,-3.2031872509960158,-3.237051792828685,-3.270916334661355,-3.304780876494024,-3.3386454183266934,-3.3725099601593627,-3.406374501992032,-3.4402390438247012,-3.4741035856573705,-3.50796812749004,-3.541832669322709,-3.5756972111553784,-3.6095617529880477,-3.643426294820717,-3.6772908366533863,-3.7111553784860556,-3.745019920318725,-3.7788844621513946,-3.812749003984064,-3.846613545816733,-3.8804780876494025,-3.914342629482072,-3.948207171314741,-3.9820717131474104,-4.01593625498008,-4.049800796812749,-4.083665338645418,-4.117529880478088,-4.151394422310757,-4.185258964143427,-4.219123505976095,-4.252988047808765,-4.286852589641434,-4.320717131474104,-4.354581673306773,-4.388446215139442,-4.422310756972111,-4.456175298804781,-4.49003984063745,-4.5239043824701195,-4.557768924302789,-4.591633466135458,-4.625498007968128,-4.659362549800797,-4.693227091633466,-4.727091633466135,-4.760956175298805,-4.794820717131474,-4.828685258964144,-4.862549800796812,-4.896414342629482,-4.930278884462151,-4.964143426294821,-4.99800796812749,-5.031872509960159,-5.065737051792829,-5.099601593625498,-5.133466135458168,-5.1673306772908365,-5.201195219123506,-5.235059760956175,-5.268924302788845,-5.302788844621514,-5.336653386454183,-5.370517928286852,-5.404382470119522,-5.438247011952191,-5.472111553784861,-5.50597609561753,-5.539840637450199,-5.573705179282869,-5.607569721115538,-5.6414342629482075,-5.675298804780876,-5.709163346613546,-5.743027888446215,-5.776892430278885,-5.8107569721115535,-5.844621513944223,-5.878486055776892,-5.912350597609562,-5.946215139442231,-5.9800796812749,-6.01394422310757,-6.047808764940239,-6.081673306772909,-6.115537848605578,-6.149402390438247,-6.183266932270916,-6.217131474103586,-6.250996015936255,-6.2848605577689245,-6.318725099601593,-6.352589641434263,-6.386454183266932,-6.420318725099602,-6.4541832669322705,-6.48804780876494,-6.52191235059761,-6.555776892430279,-6.589641434262949,-6.623505976095617,-6.657370517928287,-6.691235059760956,-6.725099601593626,-6.758964143426295,-6.792828685258964,-6.826693227091633,-6.860557768924303,-6.894422310756972,-6.9282868525896415,-6.96215139442231,-6.99601593625498,-7.02988047808765,-7.063745019920319,-7.097609561752988,-7.131474103585657,-7.165338645418327,-7.199203187250996,-7.233067729083666,-7.266932270916334,-7.300796812749004,-7.334661354581673,-7.368525896414343,-7.402390438247012,-7.436254980079681,-7.47011952191235,-7.50398406374502,-7.53784860557769,-7.5717131474103585,-7.605577689243028,-7.639442231075697,-7.673306772908367,-7.707171314741036,-7.741035856573705,-7.774900398406374,-7.808764940239044,-7.842629482071713,-7.876494023904383,-7.910358565737051,-7.944223107569721,-7.97808764940239,-8.01195219123506,-8.04581673306773,-8.079681274900398,-8.113545816733067,-8.147410358565738,-8.181274900398407,-8.215139442231076,-8.249003984063744,-8.282868525896415,-8.316733067729084,-8.350597609561753,-8.384462151394422,-8.418326693227092,-8.452191235059761,-8.48605577689243,-8.5199203187251,-8.55378486055777,-8.587649402390438,-8.621513944223107,-8.655378486055778,-8.689243027888446,-8.723107569721115,-8.756972111553784,-8.790836653386455,-8.824701195219124,-8.858565737051793,-8.892430278884461,-8.926294820717132,-8.9601593625498,-8.99402390438247,-9.02788844621514,-9.06175298804781,-9.095617529880478,-9.129482071713147,-9.163346613545817,-9.197211155378486,-9.231075697211155,-9.264940239043824,-9.298804780876495,-9.332669322709163,-9.366533864541832,-9.400398406374501,-9.434262948207172,-9.46812749003984,-9.50199203187251,-9.53585657370518,-9.569721115537849,-9.603585657370518,-9.637450199203187,-9.671314741035857,-9.705179282868526,-9.739043824701195,-9.772908366533864,-9.806772908366534,-9.840637450199203,-9.874501992031872,-9.908366533864541,-9.942231075697212,-9.97609561752988,-10.00996015936255,-10.04382470119522,-10.077689243027889,-10.111553784860558,-10.145418326693227,-10.179282868525897,-10.213147410358566,-10.247011952191235,-10.280876494023904,-10.314741035856574,-10.348605577689243,-10.382470119521912,-10.41633466135458,-10.450199203187251,-10.48406374501992,-10.51792828685259,-10.55179282868526,-10.585657370517929,-10.619521912350598,-10.653386454183266,-10.687250996015937,-10.721115537848606,-10.754980079681275,-10.788844621513944,-10.822709163346614,-10.856573705179283,-10.890438247011952,-10.92430278884462,-10.958167330677291,-10.99203187250996,-11.025896414342629,-11.0597609561753,-11.093625498007968,-11.127490039840637,-11.161354581673306,-11.195219123505977,-11.229083665338646,-11.262948207171315,-11.296812749003983,-11.330677290836654,-11.364541832669323,-11.398406374501992,-11.43227091633466,-11.466135458167331,-11.5,-11.533864541832669,-11.56772908366534,-11.601593625498008,-11.635458167330677,-11.669322709163346,-11.703187250996017,-11.737051792828685,-11.770916334661354,-11.804780876494023,-11.838645418326694,-11.872509960159363,-11.906374501992032,-11.9402390438247,-11.974103585657371,-12.00796812749004,-12.041832669322709,-12.07569721115538,-12.109561752988048,-12.143426294820717,-12.177290836653386,-12.211155378486056,-12.245019920318725,-12.278884462151394,-12.312749003984063,-12.346613545816734,-12.380478087649402,-12.414342629482071,-12.44820717131474,-12.48207171314741,-12.51593625498008,-12.549800796812749,-12.58366533864542,-12.617529880478088,-12.651394422310757,-12.685258964143426,-12.719123505976096,-12.752988047808765,-12.786852589641434,-12.820717131474103,-12.854581673306773,-12.888446215139442,-12.922310756972111,-12.95617529880478,-12.99003984063745,-13.02390438247012,-13.057768924302788,-13.091633466135459,-13.125498007968128,-13.159362549800797,-13.193227091633466,-13.227091633466136,-13.260956175298805,-13.294820717131474,-13.328685258964143,-13.362549800796813,-13.396414342629482,-13.430278884462151,-13.46414342629482,-13.49800796812749,-13.53187250996016,-13.565737051792828,-13.599601593625499,-13.633466135458168,-13.667330677290837,-13.701195219123505,-13.735059760956176,-13.768924302788845,-13.802788844621514,-13.836653386454183,-13.870517928286853,-13.904382470119522,-13.93824701195219,-13.97211155378486,-14.00597609561753,-14.0398406374502,-14.073705179282868,-14.107569721115539,-14.141434262948207,-14.175298804780876,-14.209163346613545,-14.243027888446216,-14.276892430278885,-14.310756972111554,-14.344621513944222,-14.378486055776893,-14.412350597609562,-14.44621513944223,-14.4800796812749,-14.51394422310757,-14.547808764940239,-14.581673306772908,-14.615537848605578,-14.649402390438247,-14.683266932270916,-14.717131474103585,-14.750996015936256,-14.784860557768924,-14.818725099601593,-14.852589641434262,-14.886454183266933,-14.920318725099602,-14.95418326693227,-14.98804780876494,-15.02191235059761,-15.055776892430279,-15.089641434262948,-15.123505976095618,-15.157370517928287,-15.191235059760956,-15.225099601593625,-15.258964143426295,-15.292828685258964,-15.326693227091633,-15.360557768924302,-15.394422310756973,-15.428286852589641,-15.46215139442231,-15.49601593625498,-15.52988047808765,-15.563745019920319,-15.597609561752988,-15.631474103585658,-15.665338645418327,-15.699203187250996,-15.733067729083665,-15.766932270916335,-15.800796812749004,-15.834661354581673,-15.868525896414342,-15.902390438247012,-15.936254980079681,-15.97011952191235,-16.00398406374502,-16.03784860557769,-16.07171314741036,-16.105577689243027,-16.139442231075698,-16.173306772908365,-16.207171314741036,-16.241035856573706,-16.274900398406373,-16.308764940239044,-16.342629482071715,-16.37649402390438,-16.410358565737052,-16.44422310756972,-16.47808764940239,-16.51195219123506,-16.545816733067728,-16.5796812749004,-16.61354581673307,-16.647410358565736,-16.681274900398407,-16.715139442231077,-16.749003984063744,-16.782868525896415,-16.816733067729082,-16.850597609561753,-16.884462151394423,-16.91832669322709,-16.95219123505976,-16.98605577689243,-17.0199203187251,-17.05378486055777,-17.08764940239044,-17.121513944223107,-17.155378486055778,-17.189243027888445,-17.223107569721115,-17.256972111553786,-17.290836653386453,-17.324701195219124,-17.358565737051794,-17.39243027888446,-17.426294820717132,-17.4601593625498,-17.49402390438247,-17.52788844621514,-17.561752988047807,-17.595617529880478,-17.62948207171315,-17.663346613545816,-17.697211155378486,-17.731075697211157,-17.764940239043824,-17.798804780876495,-17.83266932270916,-17.866533864541832,-17.900398406374503,-17.93426294820717,-17.96812749003984,-18.00199203187251,-18.03585657370518,-18.06972111553785,-18.10358565737052,-18.137450199203187,-18.171314741035857,-18.205179282868524,-18.239043824701195,-18.272908366533866,-18.306772908366533,-18.340637450199203,-18.374501992031874,-18.40836653386454,-18.44223107569721,-18.47609561752988,-18.50996015936255,-18.54382470119522,-18.577689243027887,-18.611553784860558,-18.64541832669323,-18.679282868525895,-18.713147410358566,-18.747011952191237,-18.780876494023904,-18.814741035856574,-18.84860557768924,-18.882470119521912,-18.916334661354583,-18.95019920318725,-18.98406374501992,-19.01792828685259,-19.051792828685258,-19.08565737051793,-19.1195219123506,-19.153386454183266,-19.187250996015937,-19.221115537848604,-19.254980079681275,-19.288844621513945,-19.322709163346612,-19.356573705179283,-19.390438247011954,-19.42430278884462,-19.45816733067729,-19.49203187250996,-19.52589641434263,-19.5597609561753,-19.593625498007967,-19.627490039840637,-19.661354581673308,-19.695219123505975,-19.729083665338646,-19.762948207171316,-19.796812749003983,-19.830677290836654,-19.86454183266932,-19.89840637450199,-19.932270916334662,-19.96613545816733,-20.0]}
},{}],85:[function(require,module,exports){
module.exports={"expected":[1.4422495703074083,1.4476560690856095,1.4530224838724708,1.4583495494668979,1.4636379793500618,1.4688884665266435,1.4741016843242778,1.4792782871536894,1.484418911231847,1.4895241752702957,1.49459468113068,1.499631014449346,1.5046337452327647,1.5096034284254254,1.514540604451723,1.519445799733274,1.524319527183002,1.5291622866772439,1.5339745655070565,1.5387568388098245,1.5435095699822035,1.54823321107537,1.55292820317349,1.5575949767562651,1.56223395204636,1.5668455393424712,1.5714301393387524,1.5759881434312675,1.5805199340121054,1.5850258847517567,1.5895063608703142,1.5939617193980302,1.5983923094257357,1.6027984723455921,1.6071805420826302,1.6115388453174968,1.6158737017008136,1.6201854240595275,1.6244743185956132,1.6287406850774708,1.632984817024338,1.6372070018840308,1.6414075212042958,1.6455866507980563,1.6497446609028132,1.6538818163344486,1.6579983766356685,1.6620945962193137,1.6661707245067485,1.6702270060615323,1.6742636807185685,1.6782809837089159,1.682279145780436,1.686258393314445,1.6902189484385308,1.6941610291356852,1.6980848493498975,1.701990619088349,1.705878544520337,1.7097488280730593,1.7136016685243731,1.7174372610926516,1.7212557975238394,1.7250574661758182,1.728842452100181,1.73261093712151,1.7363630999142496,1.7400991160772679,1.743819158206181,1.7475233959635315,1.751211996146889,1.7548851227549542,1.758542937051731,1.7621855976288399,1.7658132604660344,1.7694260789899838,1.7730242041313835,1.7766077843804475,1.7801769658408422,1.7837318922821097,1.787272705190638,1.790799543819219,1.7943125452352473,1.7978118443676039,1.801297574052266,1.8047698650766852,1.808228846222977,1.8116746443099565,1.8151073842340593,1.8185271890091836,1.8219341798054858,1.8253284759871666,1.8287101951492746,1.8320794531535616,1.8354363641634186,1.8387810406779197,1.8421135935650028,1.8454341320938124,1.84874276396623,1.85203959534762,1.8553247308968088,1.8585982737953246,1.8618603257759196,1.865110987150394,1.8683503568367434,1.8715785323856506,1.8747956100063379,1.878001684591803,1.8811968497434512,1.884381197795146,1.8875548198366912,1.8907178057367626,1.8938702441653055,1.8970122226154087,1.9001438274246776,1.9032651437961112,1.9063762558185056,1.9094772464863885,1.9125681977195057,1.9156491903818662,1.9187203043003593,1.9217816182829583,1.9248332101365166,1.9278751566841723,1.930907533782368,1.9339304163374984,1.9369438783221946,1.939947992791255,1.942942831897231,1.9459284669056789,1.9489049682100834,1.9518724053464642,1.9548308470076727,1.9577803610573858,1.9607210145438068,1.963652873713077,1.9665760040224114,1.9694904701529585,1.9723963360223968,1.9752936647972703,1.9781825189050732,1.981062960046087,1.9839350492049785,1.986798846662162,1.9896544120049338,1.9925018041383835,1.9953410812960877,1.9981723010505907,2.0009955203236793,2.003810795396452,2.006618181919195,2.009417734921063,2.0122095088195713,2.0149935574299045,2.017769933974045,2.0205386910897296,2.0232998808392293,2.0260535547179663,2.0287997636629647,2.031538558061142,2.0342699877574475,2.0369941020628426,2.0397109497621377,2.0424205791216785,2.045123037896895,2.0478183733397053,2.050506632205789,2.0531878607617235,2.055862104791992,2.058529409605863,2.061189820044149,2.063843380485836,2.066490134854602,2.0691301266252147,2.0717633988298134,2.0743899940640858,2.077009954493329,2.0796233218584073,2.082230137481604,2.0848304422723722,2.087424276732984,2.0900116809640834,2.09259269467014,2.095167357164813,2.09773570737622,2.1002977838521177,2.102853624764992,2.105403267917064,2.10794675074521,2.110484110325799,2.1130153833794503,2.115540606275707,2.1180598150376384,2.12057304534636,2.1230803325454812,2.125581711645481,2.1280772173280083,2.130566883950114,2.1330507455484145,2.1355288358431865,2.138001188242395,2.140467835845657,2.142928811448141,2.1453841475444064,2.147833876332175,2.1502780297160515,2.152716639311176,2.1551497364468255,2.157577352169955,2.159999517248684,2.1624162621757286,2.164827617171779,2.167233612188826,2.169634276913434,2.1720296407699657,2.1744197329237553,2.1768045822842335,2.1791842175080047,2.1815586670018767,2.183927958925848,2.186292121196041,2.1886511814876033,2.191005167237553,2.1933541056475914,2.195698023686866,2.1980369480946966,2.2003709053832603,2.2026999218402357,2.205024023531408,2.2073432363032364,2.2096575857853855,2.211967097393215,2.214271796330237,2.2165717075905373,2.21886685596116,2.2211572660244587,2.223442962160412,2.2257239685489107,2.228000309172005,2.230272007816126,2.2325390880742715,2.2348015733481637,2.237059486850374,2.2393128516064196,2.2415616904568285,2.243806026059178,2.2460458808901054,2.2482812772472833,2.2505122372513795,2.2527387828479797,2.254960935809488,2.2571787177370006,2.259392150062154,2.261601254048946,2.2638060507955364,2.2660065612360176,2.268202806142164,2.270394806125159,2.272582581637297,2.27476615297366,2.2769455402737786,2.279120763523264,2.2812918425554205,2.2834587970528397,2.2856216465489667,2.2877804104296544,2.2899351079346872,2.2920857581592955,2.294232380055641,2.2963749924342873,2.298513613965652,2.300648263181437,2.3027789584760416,2.3049057181079586,2.307028560201149,2.3091475027464035,2.311262563602684,2.313373760498446,2.3154811110329483,2.3175846326775447,2.3196843427769562,2.3217802585505316,2.32387239709349,2.3259607753781464,2.328045410255126,2.3301263184545573,2.332203516587257,2.3342770211458954,2.3363468485061474,2.338413014927833,2.3404755365560397,2.3425344294222348,2.344589709445359,2.3466413924329115,2.3486894940820195,2.350734029980496,2.3527750156078815,2.3548124663364773,2.356846397432364,2.3588768240564075,2.360903761265255,2.3629272240123154,2.3649472271487317,2.3669637854243395,2.368976913488616,2.3709866258916135,2.3729929370848892,2.374995861422416,2.3769954131614885,2.3789916064636145,2.3809844553953985,2.3829739739294142,2.3849601759450665,2.386943075229443,2.3889226854781564,2.3908990202961777,2.392872093198658,2.394841917611742,2.3968085068733735,2.3987718742340873,2.400732032857798,2.4026889958225746,2.404642776121409,2.406593386662975,2.408540840272379,2.410485149691903,2.412426327581736,2.414364386520701,2.416299339006974,2.418231197458789,2.4201599742151423,2.422085681536487,2.4240083316054153,2.4259279365273403,2.4278445083311646,2.429758058969944,2.431668600321544,2.433576144189289,2.4354807023026024,2.437382286317643,2.439280907817931,2.441176578314972,2.4430693092488673,2.4449591119889247,2.4468459978342576,2.4487299780143803,2.4506110636897955,2.452489265952577,2.454364595826945,2.456237064269835,2.458106682171461,2.4599734603558745,2.461837409581514,2.463698540541752,2.4655568638654346,2.467412390117414,2.46926512979908,2.471115093348881,2.472962291142842,2.4748067334950767,2.4766484306582943,2.478487392824302,2.480323630124499,2.48215715263037,2.4839879703539713,2.485816093248409,2.4876415312083195,2.4894642940703364,2.4912843916135614,2.4931018335600217,2.4949166295751306,2.4967287892681367,2.4985383221925743,2.5003452378467053,2.502149545673958,2.503951255063362,2.505750375349977,2.507546915815319,2.509340885687784,2.5111322941430596,2.5129211503045448,2.5147074632437527,2.5164912419807197,2.518272495484405,2.520051232673086,2.521827462414753,2.5236011935274987,2.5253724347799,2.5271411948914047,2.5289074825327047,2.5306713063261124,2.5324326748459303,2.534191596618818,2.5359480801241565,2.537702133794405,2.5394537660154604,2.541202985127008,2.542949799422873,2.5446942171513633,2.546436246515616,2.548175895673933,2.549913172740121,2.5516480857838224,2.553380642830845,2.5551108518634904,2.556838720820875,2.5585642575992527,2.5602874700523324,2.5620083659915918,2.5637269531865887,2.5654432393652704,2.5671572322142793,2.5688689393792568,2.5705783684651413,2.572285527036467,2.5739904226176584,2.5756930626933223,2.5773934547085364,2.5790916060691353,2.580787524141996,2.5824812162553177,2.5841726896989017,2.5858619517244255,2.5875490095457185,2.5892338703390325,2.590916541243309,2.592597029360448,2.5942753417555684,2.5959514854572734,2.5976254674579056,2.599297294713806,2.6009669741455688,2.602634512638291,2.6042999170418244,2.6059631941710233,2.607624350805989,2.609283393692312,2.6109403295413163,2.612595165030295,2.6142479068027487,2.6158985614686197,2.617547135604526,2.6191936357539887,2.620838068427665,2.62248044010357,2.624120757227306,2.625759026212281,2.627395253439932,2.6290294452599423,2.6306616079904592,2.632291747918309,2.6339198712992093,2.6355459843579805,2.6371700932887565,2.6387922042551906,2.6404123233906613,2.642030456798479,2.643646610552085,2.6452607906952537,2.646873003242292,2.6484832541782355,2.650091549459045,2.6516978950117984,2.653302296734885,2.6549047604981966,2.656505292143313,2.6581038974836932,2.6597005823048594,2.661295352364581,2.662888213393059,2.6644791710931046,2.6660682311403217,2.6676553991832823,2.6692406808437057,2.6708240817166327,2.6724056073705977,2.6739852633478054,2.6755630551642957,2.677138988310119,2.6787130682495004,2.6802853004210085,2.68185569023772,2.6834242430873827,2.684990964332581,2.6865558593108934,2.688118933335056,2.68968019169312,2.6912396396486082,2.6927972824406714,2.694353125284245,2.695907173370201,2.6974594318655,2.699009905913345,2.700558600633327,2.7021055211215796,2.7036506724509204,2.705194059671001,2.706735687808454,2.7082755618670302,2.70981368682775,2.7113500676490387,2.7128847092668704,2.7144176165949063],"x":[3.0,3.0338645418326693,3.0677290836653386,3.101593625498008,3.135458167330677,3.1693227091633465,3.2031872509960158,3.237051792828685,3.270916334661355,3.304780876494024,3.3386454183266934,3.3725099601593627,3.406374501992032,3.4402390438247012,3.4741035856573705,3.50796812749004,3.541832669322709,3.5756972111553784,3.6095617529880477,3.643426294820717,3.6772908366533863,3.7111553784860556,3.745019920318725,3.7788844621513946,3.812749003984064,3.846613545816733,3.8804780876494025,3.914342629482072,3.948207171314741,3.9820717131474104,4.01593625498008,4.049800796812749,4.083665338645418,4.117529880478088,4.151394422310757,4.185258964143427,4.219123505976095,4.252988047808765,4.286852589641434,4.320717131474104,4.354581673306773,4.388446215139442,4.422310756972111,4.456175298804781,4.49003984063745,4.5239043824701195,4.557768924302789,4.591633466135458,4.625498007968128,4.659362549800797,4.693227091633466,4.727091633466135,4.760956175298805,4.794820717131474,4.828685258964144,4.862549800796812,4.896414342629482,4.930278884462151,4.964143426294821,4.99800796812749,5.031872509960159,5.065737051792829,5.099601593625498,5.133466135458168,5.1673306772908365,5.201195219123506,5.235059760956175,5.268924302788845,5.302788844621514,5.336653386454183,5.370517928286852,5.404382470119522,5.438247011952191,5.472111553784861,5.50597609561753,5.539840637450199,5.573705179282869,5.607569721115538,5.6414342629482075,5.675298804780876,5.709163346613546,5.743027888446215,5.776892430278885,5.8107569721115535,5.844621513944223,5.878486055776892,5.912350597609562,5.946215139442231,5.9800796812749,6.01394422310757,6.047808764940239,6.081673306772909,6.115537848605578,6.149402390438247,6.183266932270916,6.217131474103586,6.250996015936255,6.2848605577689245,6.318725099601593,6.352589641434263,6.386454183266932,6.420318725099602,6.4541832669322705,6.48804780876494,6.52191235059761,6.555776892430279,6.589641434262949,6.623505976095617,6.657370517928287,6.691235059760956,6.725099601593626,6.758964143426295,6.792828685258964,6.826693227091633,6.860557768924303,6.894422310756972,6.9282868525896415,6.96215139442231,6.99601593625498,7.02988047808765,7.063745019920319,7.097609561752988,7.131474103585657,7.165338645418327,7.199203187250996,7.233067729083666,7.266932270916334,7.300796812749004,7.334661354581673,7.368525896414343,7.402390438247012,7.436254980079681,7.47011952191235,7.50398406374502,7.53784860557769,7.5717131474103585,7.605577689243028,7.639442231075697,7.673306772908367,7.707171314741036,7.741035856573705,7.774900398406374,7.808764940239044,7.842629482071713,7.876494023904383,7.910358565737051,7.944223107569721,7.97808764940239,8.01195219123506,8.04581673306773,8.079681274900398,8.113545816733067,8.147410358565738,8.181274900398407,8.215139442231076,8.249003984063744,8.282868525896415,8.316733067729084,8.350597609561753,8.384462151394422,8.418326693227092,8.452191235059761,8.48605577689243,8.5199203187251,8.55378486055777,8.587649402390438,8.621513944223107,8.655378486055778,8.689243027888446,8.723107569721115,8.756972111553784,8.790836653386455,8.824701195219124,8.858565737051793,8.892430278884461,8.926294820717132,8.9601593625498,8.99402390438247,9.02788844621514,9.06175298804781,9.095617529880478,9.129482071713147,9.163346613545817,9.197211155378486,9.231075697211155,9.264940239043824,9.298804780876495,9.332669322709163,9.366533864541832,9.400398406374501,9.434262948207172,9.46812749003984,9.50199203187251,9.53585657370518,9.569721115537849,9.603585657370518,9.637450199203187,9.671314741035857,9.705179282868526,9.739043824701195,9.772908366533864,9.806772908366534,9.840637450199203,9.874501992031872,9.908366533864541,9.942231075697212,9.97609561752988,10.00996015936255,10.04382470119522,10.077689243027889,10.111553784860558,10.145418326693227,10.179282868525897,10.213147410358566,10.247011952191235,10.280876494023904,10.314741035856574,10.348605577689243,10.382470119521912,10.41633466135458,10.450199203187251,10.48406374501992,10.51792828685259,10.55179282868526,10.585657370517929,10.619521912350598,10.653386454183266,10.687250996015937,10.721115537848606,10.754980079681275,10.788844621513944,10.822709163346614,10.856573705179283,10.890438247011952,10.92430278884462,10.958167330677291,10.99203187250996,11.025896414342629,11.0597609561753,11.093625498007968,11.127490039840637,11.161354581673306,11.195219123505977,11.229083665338646,11.262948207171315,11.296812749003983,11.330677290836654,11.364541832669323,11.398406374501992,11.43227091633466,11.466135458167331,11.5,11.533864541832669,11.56772908366534,11.601593625498008,11.635458167330677,11.669322709163346,11.703187250996017,11.737051792828685,11.770916334661354,11.804780876494023,11.838645418326694,11.872509960159363,11.906374501992032,11.9402390438247,11.974103585657371,12.00796812749004,12.041832669322709,12.07569721115538,12.109561752988048,12.143426294820717,12.177290836653386,12.211155378486056,12.245019920318725,12.278884462151394,12.312749003984063,12.346613545816734,12.380478087649402,12.414342629482071,12.44820717131474,12.48207171314741,12.51593625498008,12.549800796812749,12.58366533864542,12.617529880478088,12.651394422310757,12.685258964143426,12.719123505976096,12.752988047808765,12.786852589641434,12.820717131474103,12.854581673306773,12.888446215139442,12.922310756972111,12.95617529880478,12.99003984063745,13.02390438247012,13.057768924302788,13.091633466135459,13.125498007968128,13.159362549800797,13.193227091633466,13.227091633466136,13.260956175298805,13.294820717131474,13.328685258964143,13.362549800796813,13.396414342629482,13.430278884462151,13.46414342629482,13.49800796812749,13.53187250996016,13.565737051792828,13.599601593625499,13.633466135458168,13.667330677290837,13.701195219123505,13.735059760956176,13.768924302788845,13.802788844621514,13.836653386454183,13.870517928286853,13.904382470119522,13.93824701195219,13.97211155378486,14.00597609561753,14.0398406374502,14.073705179282868,14.107569721115539,14.141434262948207,14.175298804780876,14.209163346613545,14.243027888446216,14.276892430278885,14.310756972111554,14.344621513944222,14.378486055776893,14.412350597609562,14.44621513944223,14.4800796812749,14.51394422310757,14.547808764940239,14.581673306772908,14.615537848605578,14.649402390438247,14.683266932270916,14.717131474103585,14.750996015936256,14.784860557768924,14.818725099601593,14.852589641434262,14.886454183266933,14.920318725099602,14.95418326693227,14.98804780876494,15.02191235059761,15.055776892430279,15.089641434262948,15.123505976095618,15.157370517928287,15.191235059760956,15.225099601593625,15.258964143426295,15.292828685258964,15.326693227091633,15.360557768924302,15.394422310756973,15.428286852589641,15.46215139442231,15.49601593625498,15.52988047808765,15.563745019920319,15.597609561752988,15.631474103585658,15.665338645418327,15.699203187250996,15.733067729083665,15.766932270916335,15.800796812749004,15.834661354581673,15.868525896414342,15.902390438247012,15.936254980079681,15.97011952191235,16.00398406374502,16.03784860557769,16.07171314741036,16.105577689243027,16.139442231075698,16.173306772908365,16.207171314741036,16.241035856573706,16.274900398406373,16.308764940239044,16.342629482071715,16.37649402390438,16.410358565737052,16.44422310756972,16.47808764940239,16.51195219123506,16.545816733067728,16.5796812749004,16.61354581673307,16.647410358565736,16.681274900398407,16.715139442231077,16.749003984063744,16.782868525896415,16.816733067729082,16.850597609561753,16.884462151394423,16.91832669322709,16.95219123505976,16.98605577689243,17.0199203187251,17.05378486055777,17.08764940239044,17.121513944223107,17.155378486055778,17.189243027888445,17.223107569721115,17.256972111553786,17.290836653386453,17.324701195219124,17.358565737051794,17.39243027888446,17.426294820717132,17.4601593625498,17.49402390438247,17.52788844621514,17.561752988047807,17.595617529880478,17.62948207171315,17.663346613545816,17.697211155378486,17.731075697211157,17.764940239043824,17.798804780876495,17.83266932270916,17.866533864541832,17.900398406374503,17.93426294820717,17.96812749003984,18.00199203187251,18.03585657370518,18.06972111553785,18.10358565737052,18.137450199203187,18.171314741035857,18.205179282868524,18.239043824701195,18.272908366533866,18.306772908366533,18.340637450199203,18.374501992031874,18.40836653386454,18.44223107569721,18.47609561752988,18.50996015936255,18.54382470119522,18.577689243027887,18.611553784860558,18.64541832669323,18.679282868525895,18.713147410358566,18.747011952191237,18.780876494023904,18.814741035856574,18.84860557768924,18.882470119521912,18.916334661354583,18.95019920318725,18.98406374501992,19.01792828685259,19.051792828685258,19.08565737051793,19.1195219123506,19.153386454183266,19.187250996015937,19.221115537848604,19.254980079681275,19.288844621513945,19.322709163346612,19.356573705179283,19.390438247011954,19.42430278884462,19.45816733067729,19.49203187250996,19.52589641434263,19.5597609561753,19.593625498007967,19.627490039840637,19.661354581673308,19.695219123505975,19.729083665338646,19.762948207171316,19.796812749003983,19.830677290836654,19.86454183266932,19.89840637450199,19.932270916334662,19.96613545816733,20.0]}
},{}],86:[function(require,module,exports){
module.exports={"expected":[-0.9283177667225558,-0.9300098161061733,-0.9316957308011463,-0.9333755661116568,-0.9350493765484686,-0.9367172158444954,-0.9383791369699807,-0.9400351921473049,-0.941685432865426,-0.9433299098939695,-0.9449686732969729,-0.9466017724463012,-0.9482292560347362,-0.9498511720887541,-0.9514675679809987,-0.9530784904424577,-0.9546839855743533,-0.9562840988597529,-0.9578788751749091,-0.959468358800336,-0.9610525934316295,-0.962631622190039,-0.9642054876327965,-0.9657742317632113,-0.9673378960405352,-0.968896521389605,-0.9704501482102696,-0.9719988163866049,-0.9735425652959255,-0.9750814338175956,-0.9766154603416466,-0.9781446827772053,-0.9796691385607392,-0.981188864664121,-0.9827038976025202,-0.9842142734421249,-0.9857200278076969,-0.9872211958899672,-0.9887178124528736,-0.9902099118406462,-0.9916975279847425,-0.9931806944106389,-0.9946594442444796,-0.9961338102195878,-0.9976038246828425,-0.9990695196009236,-1.0005309265664306,-1.0019880768038743,-1.0034410011755481,-1.004889730187282,-1.0063342939940771,-1.0077747224056315,-1.0092110448917528,-1.0106432905876643,-1.0120714882992061,-1.0134956665079338,-1.0149158533761171,-1.0163320767516404,-1.0177443641728088,-1.0191527428730605,-1.0205572397855875,-1.0219578815478705,-1.0233546945061218,-1.0247477047196498,-1.026136937965135,-1.0275224197408288,-1.0289041752706727,-1.0302822295083378,-1.0316566071411928,-1.0330273325941945,-1.034394430033709,-1.0357579233712604,-1.0371178362672118,-1.0384741921343785,-1.0398270141415753,-1.041176325217099,-1.042522148052149,-1.0438645051041848,-1.0452034186002241,-1.046538910540082,-1.0478710026995517,-1.0491997166335296,-1.0505250736790845,-1.051847094958473,-1.0531658013821021,-1.0544812136514399,-1.0557933522618748,-1.0571022375055266,-1.0584078894740083,-1.05971032806114,-1.061009572965615,-1.0623056436936251,-1.063598559561434,-1.064888339697913,-1.066175003047032,-1.0674585683703066,-1.0687390542492063,-1.0700164790875222,-1.071290861113694,-1.0725622183830998,-1.0738305687803071,-1.075095930021286,-1.076358319655588,-1.077617755068488,-1.0788742534830902,-1.0801278319624021,-1.0813785074113726,-1.0826262965788993,-1.083871216059801,-1.0851132822967613,-1.0863525115822392,-1.0875889200603497,-1.0888225237287148,-1.0900533384402855,-1.0912813799051335,-1.0925066636922176,-1.0937292052311185,-1.0949490198137513,-1.096166122596046,-1.0973805285996072,-1.0985922527133443,-1.0998013096950778,-1.1010077141731216,-1.1022114806478405,-1.1034126234931836,-1.1046111569581953,-1.1058070951685024,-1.107000452127779,-1.1081912417191906,-1.1093794777068138,-1.1105651737370381,-1.111748343339944,-1.112928999930662,-1.1141071568107108,-1.1152828271693171,-1.116456024084714,-1.1176267605254218,-1.1187950493515089,-1.1199609033158358,-1.12112433506528,-1.1222853571419429,-1.1234439819843394,-1.1246002219285718,-1.1257540892094846,-1.1269055959618042,-1.1280547542212618,-1.1292015759257006,-1.1303460729161674,-1.131488256937988,-1.1326281396418285,-1.1337657325847403,-1.1349010472311922,-1.1360340949540868,-1.1371648870357625,-1.1382934346689835,-1.1394197489579132,-1.1405438409190771,-1.1416657214823096,-1.142785401491691,-1.1439028917064682,-1.1450182028019655,-1.146131345370482,-1.1472423299221763,-1.1483511668859412,-1.149457866610263,-1.1505624393640737,-1.1516648953375879,-1.1527652446431305,-1.1538634973159538,-1.154959663315042,-1.156053752523906,-1.1571457747513685,-1.1582357397323362,-1.159323657128565,-1.1604095365294138,-1.1614933874525868,-1.162575219344869,-1.1636550415828506,-1.1647328634736418,-1.1658086942555785,-1.1668825430989203,-1.1679544191065367,-1.169024331314588,-1.1700922886931946,-1.171158300147098,-1.1722223745163167,-1.1732845205767886,-1.1743447470410098,-1.1754030625586627,-1.1764594757172369,-1.177513995042643,-1.178566628999818,-1.1796173859933226,-1.1806662743679324,-1.1817133024092212,-1.1827584783441367,-1.183801810341569,-1.1848433065129131,-1.1858829749126236,-1.1869208235387627,-1.1879568603335422,-1.1889910931838579,-1.1900235299218174,-1.1910541783252635,-1.1920830461182887,-1.1931101409717453,-1.1941354705037475,-1.1951590422801703,-1.1961808638151399,-1.1972009425715189,-1.1982192859613863,-1.199235901346512,-1.200250796038824,-1.201263977300872,-1.2022754523462844,-1.203285228340221,-1.2042933123998179,-1.2052997115946313,-1.206304432947072,-1.2073074834328377,-1.2083088699813382,-1.2093085994761177,-1.21030667875527,-1.2113031146118518,-1.212297913794288,-1.2132910830067742,-1.2142826289096753,-1.2152725581199175,-1.2162608772113774,-1.2172475927152657,-1.2182327111205078,-1.2192162388741181,-1.2201981823815733,-1.2211785480071773,-1.2221573420744254,-1.2231345708663635,-1.2241102406259414,-1.2250843575563666,-1.2260569278214482,-1.2270279575459426,-1.2279974528158912,-1.2289654196789574,-1.229931864144758,-1.2308967921851912,-1.231860209734762,-1.2328221226909029,-1.2337825369142916,-1.2347414582291663,-1.2356988924236345,-1.2366548452499821,-1.2376093224249773,-1.2385623296301709,-1.2395138725121937,-1.2404639566830524,-1.2414125877204192,-1.2423597711679208,-1.2433055125354233,-1.2442498172993144,-1.2451926909027824,-1.2461341387560918,-1.2470741662368576,-1.248012778690315,-1.248949981429586,-1.2498857797359457,-1.2508201788590831,-1.251753184017361,-1.2526848003980717,-1.2536150331576907,-1.2545438874221293,-1.2554713682869814,-1.2563974808177707,-1.2573222300501934,-1.2582456209903599,-1.2591676586150327,-1.260088347871862,-1.2610076936796213,-1.2619257009284361,-1.2628423744800148,-1.2637577191678742,-1.2646717397975638,-1.2655844411468884,-1.2664958279661278,-1.267405904978254,-1.2683146768791465,-1.2692221483378057,-1.270128323996565,-1.2710332084712976,-1.2719368063516254,-1.272839122201123,-1.2737401605575207,-1.2746399259329053,-1.2755384228139186,-1.2764356556619547,-1.2773316289133554,-1.2782263469796018,-1.2791198142475069,-1.280012035079404,-1.2809030138133348,-1.2817927547632342,-1.2826812622191148,-1.2835685404472486,-1.2844545936903475,-1.2853394261677413,-1.2862230420755556,-1.2871054455868853,-1.2879866408519696,-1.288866631998363,-1.2897454231311052,-1.2906230183328908,-1.2914994216642344,-1.2923746371636373,-1.2932486688477518,-1.2941215207115406,-1.2949931967284414,-1.295863700850523,-1.2967330370086436,-1.297601209112609,-1.2984682210513245,-1.29933407669295,-1.3001987798850512,-1.3010623344547503,-1.3019247442088753,-1.302786012934107,-1.3036461443971255,-1.3045051423447562,-1.3053630105041116,-1.3062197525827353,-1.307075372268742,-1.3079298732309577,-1.3087832591190576,-1.309635533563704,-1.3104867001766818,-1.3113367625510335,-1.3121857242611916,-1.3130335888631128,-1.313880359894407,-1.3147260408744692,-1.3155706353046064,-1.316414146668166,-1.3172565784306627,-1.3180979340399026,-1.3189382169261088,-1.3197774305020433,-1.3206155781631295,-1.3214526632875727,-1.3222886892364807,-1.3231236593539821,-1.3239575769673435,-1.3247904453870867,-1.3256222679071052,-1.3264530478047771,-1.32728278834108,-1.328111492760703,-1.3289391642921586,-1.3297658061478939,-1.330591421524399,-1.3314160136023172,-1.3322395855465523,-1.333062140506375,-1.3338836816155293,-1.3347042119923378,-1.3355237347398055,-1.3363422529457234,-1.3371597696827702,-1.3379762880086148,-1.338791810966016,-1.3396063415829227,-1.340419882872573,-1.3412324378335923,-1.34204400945009,-1.3428546006917566,-1.3436642145139588,-1.3444728538578348,-1.3452805216503878,-1.3460872208045802,-1.3468929542194248,-1.3476977247800768,-1.3485015353579257,-1.3493043888106848,-1.3501062879824794,-1.350907235703938,-1.351707234792278,-1.352506288051394,-1.3533043982719442,-1.3541015682314352,-1.354897800694309,-1.3556930984120255,-1.356487464123147,-1.3572809005534212,-1.3580734104158632,-1.3588649964108372,-1.3596556612261381,-1.360445407537071,-1.361234238006531,-1.3620221552850826,-1.3628091620110376,-1.3635952608105333,-1.3643804542976097,-1.3651647450742848,-1.365948135730632,-1.3667306288448553,-1.3675122269833622,-1.3682929327008397,-1.3690727485403271,-1.3698516770332887,-1.3706297206996862,-1.3714068820480512,-1.3721831635755546,-1.372958567768079,-1.3737330971002881,-1.374506754035696,-1.3752795410267364,-1.3760514605148308,-1.376822514930457,-1.3775927066932148,-1.3783620382118953,-1.3791305118845452,-1.3798981300985333,-1.380664895230616,-1.381430809647001,-1.3821958757034134,-1.3829600957451578,-1.383723472107182,-1.3844860071141405,-1.3852477030804558,-1.3860085623103806,-1.3867685870980597,-1.3875277797275898,-1.388286142473081,-1.3890436775987156,-1.389800387358809,-1.3905562739978672,-1.3913113397506467,-1.3920655868422118,-1.3928190174879926,-1.3935716338938422,-1.3943234382560938,-1.3950744327616167,-1.3958246195878725,-1.3965740009029706,-1.397322578865723,-1.3980703556257006,-1.398817333323285,-1.399563514089724,-1.4003089000471853,-1.4010534933088088,-1.40179729597876,-1.4025403101522813,-1.4032825379157454,-1.4040239813467057,-1.4047646425139475,-1.4055045234775403,-1.406243626288886,-1.4069819529907701,-1.407719505617412,-1.4084562861945134,-1.409192296739307,-1.4099275392606057,-1.4106620157588516,-1.4113957282261622,-1.4121286786463791,-1.4128608689951148,-1.4135923012397995,-1.4143229773397283,-1.4150528992461067,-1.415782068902096,-1.4165104882428603,-1.4172381591956105,-1.417965083679649,-1.4186912636064157,-1.419416700879531,-1.4201413973948394,-1.4208653550404544,-1.4215885756968007,-1.4223110612366578,-1.4230328135252024,-1.4237538344200507,-1.4244741257713007,-1.425193689421574,-1.425912527206057,-1.4266306409525424,-1.4273480324814694,-1.4280647036059657,-1.4287806561318863,-1.4294958918578546,-1.4302104125753017,-1.430924220068506,-1.431637316114632,-1.4323497024837704,-1.4330613809389754,-1.4337723532363036,-1.4344826211248527,-1.4351921863467987,-1.4359010506374332,-1.436609215725202,-1.437316683331741,-1.4380234551719133,-1.4387295329538465,-1.4394349183789679,-1.4401396131420412,-1.4408436189312028,-1.4415469374279961,-1.4422495703074083],"x":[-0.8,-0.8043824701195219,-0.8087649402390438,-0.8131474103585657,-0.8175298804780876,-0.8219123505976096,-0.8262948207171315,-0.8306772908366534,-0.8350597609561753,-0.8394422310756973,-0.8438247011952191,-0.848207171314741,-0.852589641434263,-0.8569721115537848,-0.8613545816733068,-0.8657370517928287,-0.8701195219123506,-0.8745019920318725,-0.8788844621513944,-0.8832669322709163,-0.8876494023904382,-0.8920318725099602,-0.896414342629482,-0.900796812749004,-0.9051792828685259,-0.9095617529880478,-0.9139442231075697,-0.9183266932270916,-0.9227091633466136,-0.9270916334661354,-0.9314741035856574,-0.9358565737051793,-0.9402390438247012,-0.9446215139442231,-0.949003984063745,-0.953386454183267,-0.9577689243027888,-0.9621513944223108,-0.9665338645418327,-0.9709163346613546,-0.9752988047808765,-0.9796812749003984,-0.9840637450199203,-0.9884462151394422,-0.9928286852589642,-0.997211155378486,-1.001593625498008,-1.0059760956175299,-1.0103585657370517,-1.0147410358565736,-1.0191235059760957,-1.0235059760956176,-1.0278884462151394,-1.0322709163346613,-1.0366533864541834,-1.0410358565737052,-1.045418326693227,-1.049800796812749,-1.0541832669322708,-1.058565737051793,-1.0629482071713148,-1.0673306772908366,-1.0717131474103585,-1.0760956175298806,-1.0804780876494025,-1.0848605577689243,-1.0892430278884462,-1.093625498007968,-1.0980079681274901,-1.102390438247012,-1.1067729083665339,-1.1111553784860557,-1.1155378486055776,-1.1199203187250997,-1.1243027888446215,-1.1286852589641434,-1.1330677290836653,-1.1374501992031874,-1.1418326693227092,-1.146215139442231,-1.150597609561753,-1.1549800796812748,-1.159362549800797,-1.1637450199203188,-1.1681274900398406,-1.1725099601593625,-1.1768924302788846,-1.1812749003984064,-1.1856573705179283,-1.1900398406374502,-1.194422310756972,-1.1988047808764941,-1.203187250996016,-1.2075697211155378,-1.2119521912350597,-1.2163346613545816,-1.2207171314741037,-1.2250996015936255,-1.2294820717131474,-1.2338645418326692,-1.2382470119521913,-1.2426294820717132,-1.247011952191235,-1.251394422310757,-1.2557768924302788,-1.2601593625498009,-1.2645418326693227,-1.2689243027888446,-1.2733067729083665,-1.2776892430278886,-1.2820717131474104,-1.2864541832669323,-1.2908366533864541,-1.295219123505976,-1.299601593625498,-1.30398406374502,-1.3083665338645418,-1.3127490039840637,-1.3171314741035856,-1.3215139442231076,-1.3258964143426295,-1.3302788844621514,-1.3346613545816732,-1.3390438247011953,-1.3434262948207172,-1.347808764940239,-1.352191235059761,-1.3565737051792828,-1.3609561752988049,-1.3653386454183267,-1.3697211155378486,-1.3741035856573705,-1.3784860557768925,-1.3828685258964144,-1.3872509960159363,-1.3916334661354581,-1.39601593625498,-1.400398406374502,-1.404780876494024,-1.4091633466135458,-1.4135458167330677,-1.4179282868525895,-1.4223107569721116,-1.4266932270916335,-1.4310756972111554,-1.4354581673306772,-1.4398406374501993,-1.4442231075697212,-1.448605577689243,-1.452988047808765,-1.4573705179282868,-1.4617529880478088,-1.4661354581673307,-1.4705179282868526,-1.4749003984063744,-1.4792828685258965,-1.4836653386454184,-1.4880478087649402,-1.4924302788844621,-1.496812749003984,-1.501195219123506,-1.505577689243028,-1.5099601593625498,-1.5143426294820717,-1.5187250996015935,-1.5231075697211156,-1.5274900398406375,-1.5318725099601593,-1.5362549800796812,-1.5406374501992033,-1.5450199203187251,-1.549402390438247,-1.5537848605577689,-1.5581673306772907,-1.5625498007968128,-1.5669322709163347,-1.5713147410358566,-1.5756972111553784,-1.5800796812749005,-1.5844621513944224,-1.5888446215139442,-1.593227091633466,-1.597609561752988,-1.60199203187251,-1.606374501992032,-1.6107569721115538,-1.6151394422310756,-1.6195219123505975,-1.6239043824701196,-1.6282868525896415,-1.6326693227091633,-1.6370517928286852,-1.6414342629482073,-1.6458167330677291,-1.650199203187251,-1.6545816733067729,-1.6589641434262947,-1.6633466135458168,-1.6677290836653387,-1.6721115537848605,-1.6764940239043824,-1.6808764940239045,-1.6852589641434264,-1.6896414342629482,-1.69402390438247,-1.698406374501992,-1.702788844621514,-1.707171314741036,-1.7115537848605578,-1.7159362549800796,-1.7203187250996015,-1.7247011952191236,-1.7290836653386454,-1.7334661354581673,-1.7378486055776892,-1.7422310756972113,-1.7466135458167331,-1.750996015936255,-1.7553784860557768,-1.7597609561752987,-1.7641434262948208,-1.7685258964143427,-1.7729083665338645,-1.7772908366533864,-1.7816733067729085,-1.7860557768924303,-1.7904382470119522,-1.794820717131474,-1.799203187250996,-1.803585657370518,-1.8079681274900399,-1.8123505976095617,-1.8167330677290836,-1.8211155378486055,-1.8254980079681276,-1.8298804780876494,-1.8342629482071713,-1.8386454183266931,-1.8430278884462152,-1.847410358565737,-1.851792828685259,-1.8561752988047808,-1.8605577689243027,-1.8649402390438248,-1.8693227091633466,-1.8737051792828685,-1.8780876494023904,-1.8824701195219125,-1.8868525896414343,-1.8912350597609562,-1.895617529880478,-1.9,-1.904382470119522,-1.9087649402390439,-1.9131474103585657,-1.9175298804780876,-1.9219123505976095,-1.9262948207171315,-1.9306772908366534,-1.9350597609561753,-1.9394422310756971,-1.9438247011952192,-1.948207171314741,-1.952589641434263,-1.9569721115537848,-1.9613545816733067,-1.9657370517928288,-1.9701195219123506,-1.9745019920318725,-1.9788844621513944,-1.9832669322709164,-1.9876494023904383,-1.9920318725099602,-1.996414342629482,-2.000796812749004,-2.005179282868526,-2.0095617529880476,-2.0139442231075697,-2.018326693227092,-2.0227091633466134,-2.0270916334661355,-2.031474103585657,-2.0358565737051793,-2.0402390438247013,-2.044621513944223,-2.049003984063745,-2.053386454183267,-2.057768924302789,-2.062151394422311,-2.0665338645418325,-2.0709163346613546,-2.0752988047808767,-2.0796812749003983,-2.0840637450199204,-2.088446215139442,-2.092828685258964,-2.0972111553784862,-2.101593625498008,-2.10597609561753,-2.1103585657370516,-2.1147410358565737,-2.119123505976096,-2.1235059760956174,-2.1278884462151395,-2.132270916334661,-2.1366533864541832,-2.1410358565737053,-2.145418326693227,-2.149800796812749,-2.154183266932271,-2.1585657370517928,-2.162948207171315,-2.1673306772908365,-2.1717131474103586,-2.1760956175298807,-2.1804780876494023,-2.1848605577689244,-2.189243027888446,-2.193625498007968,-2.19800796812749,-2.202390438247012,-2.206772908366534,-2.2111553784860556,-2.2155378486055777,-2.2199203187250998,-2.2243027888446214,-2.2286852589641435,-2.233067729083665,-2.237450199203187,-2.2418326693227093,-2.246215139442231,-2.250597609561753,-2.254980079681275,-2.2593625498007968,-2.263745019920319,-2.2681274900398405,-2.2725099601593626,-2.2768924302788847,-2.2812749003984063,-2.2856573705179284,-2.29003984063745,-2.294422310756972,-2.298804780876494,-2.303187250996016,-2.307569721115538,-2.3119521912350596,-2.3163346613545817,-2.3207171314741037,-2.3250996015936254,-2.3294820717131475,-2.333864541832669,-2.338247011952191,-2.3426294820717133,-2.347011952191235,-2.351394422310757,-2.355776892430279,-2.3601593625498007,-2.364541832669323,-2.3689243027888445,-2.3733067729083666,-2.3776892430278886,-2.3820717131474103,-2.3864541832669324,-2.390836653386454,-2.395219123505976,-2.399601593625498,-2.40398406374502,-2.408366533864542,-2.4127490039840636,-2.4171314741035856,-2.4215139442231077,-2.4258964143426294,-2.4302788844621515,-2.434661354581673,-2.439043824701195,-2.4434262948207173,-2.447808764940239,-2.452191235059761,-2.456573705179283,-2.4609561752988047,-2.465338645418327,-2.4697211155378485,-2.4741035856573705,-2.4784860557768926,-2.4828685258964143,-2.4872509960159364,-2.491633466135458,-2.49601593625498,-2.500398406374502,-2.504780876494024,-2.509163346613546,-2.5135458167330675,-2.5179282868525896,-2.5223107569721117,-2.5266932270916334,-2.5310756972111554,-2.535458167330677,-2.539840637450199,-2.5442231075697213,-2.548605577689243,-2.552988047808765,-2.557370517928287,-2.5617529880478087,-2.566135458167331,-2.5705179282868524,-2.5749003984063745,-2.5792828685258966,-2.5836653386454183,-2.5880478087649403,-2.592430278884462,-2.596812749003984,-2.601195219123506,-2.605577689243028,-2.60996015936255,-2.6143426294820715,-2.6187250996015936,-2.6231075697211157,-2.6274900398406373,-2.6318725099601594,-2.636254980079681,-2.640637450199203,-2.6450199203187252,-2.649402390438247,-2.653784860557769,-2.658167330677291,-2.6625498007968127,-2.666932270916335,-2.6713147410358564,-2.6756972111553785,-2.6800796812749006,-2.6844621513944222,-2.6888446215139443,-2.693227091633466,-2.697609561752988,-2.70199203187251,-2.706374501992032,-2.710756972111554,-2.7151394422310755,-2.7195219123505976,-2.7239043824701197,-2.7282868525896413,-2.7326693227091634,-2.737051792828685,-2.741434262948207,-2.745816733067729,-2.750199203187251,-2.754581673306773,-2.758964143426295,-2.7633466135458167,-2.7677290836653388,-2.7721115537848604,-2.7764940239043825,-2.7808764940239046,-2.785258964143426,-2.7896414342629483,-2.79402390438247,-2.798406374501992,-2.802788844621514,-2.8071713147410358,-2.811553784860558,-2.8159362549800795,-2.8203187250996016,-2.8247011952191237,-2.8290836653386453,-2.8334661354581674,-2.837848605577689,-2.842231075697211,-2.846613545816733,-2.850996015936255,-2.855378486055777,-2.859760956175299,-2.8641434262948207,-2.8685258964143427,-2.8729083665338644,-2.8772908366533865,-2.8816733067729086,-2.88605577689243,-2.8904382470119523,-2.894820717131474,-2.899203187250996,-2.903585657370518,-2.9079681274900397,-2.912350597609562,-2.9167330677290835,-2.9211155378486056,-2.9254980079681276,-2.9298804780876493,-2.9342629482071714,-2.938645418326693,-2.943027888446215,-2.947410358565737,-2.951792828685259,-2.956175298804781,-2.960557768924303,-2.9649402390438246,-2.9693227091633467,-2.9737051792828684,-2.9780876494023905,-2.9824701195219125,-2.986852589641434,-2.9912350597609563,-2.995617529880478,-3.0]}
},{}],87:[function(require,module,exports){
module.exports={"expected":[0.9283177667225558,0.9300098161061733,0.9316957308011463,0.9333755661116568,0.9350493765484686,0.9367172158444954,0.9383791369699807,0.9400351921473049,0.941685432865426,0.9433299098939695,0.9449686732969729,0.9466017724463012,0.9482292560347362,0.9498511720887541,0.9514675679809987,0.9530784904424577,0.9546839855743533,0.9562840988597529,0.9578788751749091,0.959468358800336,0.9610525934316295,0.962631622190039,0.9642054876327965,0.9657742317632113,0.9673378960405352,0.968896521389605,0.9704501482102696,0.9719988163866049,0.9735425652959255,0.9750814338175956,0.9766154603416466,0.9781446827772053,0.9796691385607392,0.981188864664121,0.9827038976025202,0.9842142734421249,0.9857200278076969,0.9872211958899672,0.9887178124528736,0.9902099118406462,0.9916975279847425,0.9931806944106389,0.9946594442444796,0.9961338102195878,0.9976038246828425,0.9990695196009236,1.0005309265664306,1.0019880768038743,1.0034410011755481,1.004889730187282,1.0063342939940771,1.0077747224056315,1.0092110448917528,1.0106432905876643,1.0120714882992061,1.0134956665079338,1.0149158533761171,1.0163320767516404,1.0177443641728088,1.0191527428730605,1.0205572397855875,1.0219578815478705,1.0233546945061218,1.0247477047196498,1.026136937965135,1.0275224197408288,1.0289041752706727,1.0302822295083378,1.0316566071411928,1.0330273325941945,1.034394430033709,1.0357579233712604,1.0371178362672118,1.0384741921343785,1.0398270141415753,1.041176325217099,1.042522148052149,1.0438645051041848,1.0452034186002241,1.046538910540082,1.0478710026995517,1.0491997166335296,1.0505250736790845,1.051847094958473,1.0531658013821021,1.0544812136514399,1.0557933522618748,1.0571022375055266,1.0584078894740083,1.05971032806114,1.061009572965615,1.0623056436936251,1.063598559561434,1.064888339697913,1.066175003047032,1.0674585683703066,1.0687390542492063,1.0700164790875222,1.071290861113694,1.0725622183830998,1.0738305687803071,1.075095930021286,1.076358319655588,1.077617755068488,1.0788742534830902,1.0801278319624021,1.0813785074113726,1.0826262965788993,1.083871216059801,1.0851132822967613,1.0863525115822392,1.0875889200603497,1.0888225237287148,1.0900533384402855,1.0912813799051335,1.0925066636922176,1.0937292052311185,1.0949490198137513,1.096166122596046,1.0973805285996072,1.0985922527133443,1.0998013096950778,1.1010077141731216,1.1022114806478405,1.1034126234931836,1.1046111569581953,1.1058070951685024,1.107000452127779,1.1081912417191906,1.1093794777068138,1.1105651737370381,1.111748343339944,1.112928999930662,1.1141071568107108,1.1152828271693171,1.116456024084714,1.1176267605254218,1.1187950493515089,1.1199609033158358,1.12112433506528,1.1222853571419429,1.1234439819843394,1.1246002219285718,1.1257540892094846,1.1269055959618042,1.1280547542212618,1.1292015759257006,1.1303460729161674,1.131488256937988,1.1326281396418285,1.1337657325847403,1.1349010472311922,1.1360340949540868,1.1371648870357625,1.1382934346689835,1.1394197489579132,1.1405438409190771,1.1416657214823096,1.142785401491691,1.1439028917064682,1.1450182028019655,1.146131345370482,1.1472423299221763,1.1483511668859412,1.149457866610263,1.1505624393640737,1.1516648953375879,1.1527652446431305,1.1538634973159538,1.154959663315042,1.156053752523906,1.1571457747513685,1.1582357397323362,1.159323657128565,1.1604095365294138,1.1614933874525868,1.162575219344869,1.1636550415828506,1.1647328634736418,1.1658086942555785,1.1668825430989203,1.1679544191065367,1.169024331314588,1.1700922886931946,1.171158300147098,1.1722223745163167,1.1732845205767886,1.1743447470410098,1.1754030625586627,1.1764594757172369,1.177513995042643,1.178566628999818,1.1796173859933226,1.1806662743679324,1.1817133024092212,1.1827584783441367,1.183801810341569,1.1848433065129131,1.1858829749126236,1.1869208235387627,1.1879568603335422,1.1889910931838579,1.1900235299218174,1.1910541783252635,1.1920830461182887,1.1931101409717453,1.1941354705037475,1.1951590422801703,1.1961808638151399,1.1972009425715189,1.1982192859613863,1.199235901346512,1.200250796038824,1.201263977300872,1.2022754523462844,1.203285228340221,1.2042933123998179,1.2052997115946313,1.206304432947072,1.2073074834328377,1.2083088699813382,1.2093085994761177,1.21030667875527,1.2113031146118518,1.212297913794288,1.2132910830067742,1.2142826289096753,1.2152725581199175,1.2162608772113774,1.2172475927152657,1.2182327111205078,1.2192162388741181,1.2201981823815733,1.2211785480071773,1.2221573420744254,1.2231345708663635,1.2241102406259414,1.2250843575563666,1.2260569278214482,1.2270279575459426,1.2279974528158912,1.2289654196789574,1.229931864144758,1.2308967921851912,1.231860209734762,1.2328221226909029,1.2337825369142916,1.2347414582291663,1.2356988924236345,1.2366548452499821,1.2376093224249773,1.2385623296301709,1.2395138725121937,1.2404639566830524,1.2414125877204192,1.2423597711679208,1.2433055125354233,1.2442498172993144,1.2451926909027824,1.2461341387560918,1.2470741662368576,1.248012778690315,1.248949981429586,1.2498857797359457,1.2508201788590831,1.251753184017361,1.2526848003980717,1.2536150331576907,1.2545438874221293,1.2554713682869814,1.2563974808177707,1.2573222300501934,1.2582456209903599,1.2591676586150327,1.260088347871862,1.2610076936796213,1.2619257009284361,1.2628423744800148,1.2637577191678742,1.2646717397975638,1.2655844411468884,1.2664958279661278,1.267405904978254,1.2683146768791465,1.2692221483378057,1.270128323996565,1.2710332084712976,1.2719368063516254,1.272839122201123,1.2737401605575207,1.2746399259329053,1.2755384228139186,1.2764356556619547,1.2773316289133554,1.2782263469796018,1.2791198142475069,1.280012035079404,1.2809030138133348,1.2817927547632342,1.2826812622191148,1.2835685404472486,1.2844545936903475,1.2853394261677413,1.2862230420755556,1.2871054455868853,1.2879866408519696,1.288866631998363,1.2897454231311052,1.2906230183328908,1.2914994216642344,1.2923746371636373,1.2932486688477518,1.2941215207115406,1.2949931967284414,1.295863700850523,1.2967330370086436,1.297601209112609,1.2984682210513245,1.29933407669295,1.3001987798850512,1.3010623344547503,1.3019247442088753,1.302786012934107,1.3036461443971255,1.3045051423447562,1.3053630105041116,1.3062197525827353,1.307075372268742,1.3079298732309577,1.3087832591190576,1.309635533563704,1.3104867001766818,1.3113367625510335,1.3121857242611916,1.3130335888631128,1.313880359894407,1.3147260408744692,1.3155706353046064,1.316414146668166,1.3172565784306627,1.3180979340399026,1.3189382169261088,1.3197774305020433,1.3206155781631295,1.3214526632875727,1.3222886892364807,1.3231236593539821,1.3239575769673435,1.3247904453870867,1.3256222679071052,1.3264530478047771,1.32728278834108,1.328111492760703,1.3289391642921586,1.3297658061478939,1.330591421524399,1.3314160136023172,1.3322395855465523,1.333062140506375,1.3338836816155293,1.3347042119923378,1.3355237347398055,1.3363422529457234,1.3371597696827702,1.3379762880086148,1.338791810966016,1.3396063415829227,1.340419882872573,1.3412324378335923,1.34204400945009,1.3428546006917566,1.3436642145139588,1.3444728538578348,1.3452805216503878,1.3460872208045802,1.3468929542194248,1.3476977247800768,1.3485015353579257,1.3493043888106848,1.3501062879824794,1.350907235703938,1.351707234792278,1.352506288051394,1.3533043982719442,1.3541015682314352,1.354897800694309,1.3556930984120255,1.356487464123147,1.3572809005534212,1.3580734104158632,1.3588649964108372,1.3596556612261381,1.360445407537071,1.361234238006531,1.3620221552850826,1.3628091620110376,1.3635952608105333,1.3643804542976097,1.3651647450742848,1.365948135730632,1.3667306288448553,1.3675122269833622,1.3682929327008397,1.3690727485403271,1.3698516770332887,1.3706297206996862,1.3714068820480512,1.3721831635755546,1.372958567768079,1.3737330971002881,1.374506754035696,1.3752795410267364,1.3760514605148308,1.376822514930457,1.3775927066932148,1.3783620382118953,1.3791305118845452,1.3798981300985333,1.380664895230616,1.381430809647001,1.3821958757034134,1.3829600957451578,1.383723472107182,1.3844860071141405,1.3852477030804558,1.3860085623103806,1.3867685870980597,1.3875277797275898,1.388286142473081,1.3890436775987156,1.389800387358809,1.3905562739978672,1.3913113397506467,1.3920655868422118,1.3928190174879926,1.3935716338938422,1.3943234382560938,1.3950744327616167,1.3958246195878725,1.3965740009029706,1.397322578865723,1.3980703556257006,1.398817333323285,1.399563514089724,1.4003089000471853,1.4010534933088088,1.40179729597876,1.4025403101522813,1.4032825379157454,1.4040239813467057,1.4047646425139475,1.4055045234775403,1.406243626288886,1.4069819529907701,1.407719505617412,1.4084562861945134,1.409192296739307,1.4099275392606057,1.4106620157588516,1.4113957282261622,1.4121286786463791,1.4128608689951148,1.4135923012397995,1.4143229773397283,1.4150528992461067,1.415782068902096,1.4165104882428603,1.4172381591956105,1.417965083679649,1.4186912636064157,1.419416700879531,1.4201413973948394,1.4208653550404544,1.4215885756968007,1.4223110612366578,1.4230328135252024,1.4237538344200507,1.4244741257713007,1.425193689421574,1.425912527206057,1.4266306409525424,1.4273480324814694,1.4280647036059657,1.4287806561318863,1.4294958918578546,1.4302104125753017,1.430924220068506,1.431637316114632,1.4323497024837704,1.4330613809389754,1.4337723532363036,1.4344826211248527,1.4351921863467987,1.4359010506374332,1.436609215725202,1.437316683331741,1.4380234551719133,1.4387295329538465,1.4394349183789679,1.4401396131420412,1.4408436189312028,1.4415469374279961,1.4422495703074083],"x":[0.8,0.8043824701195219,0.8087649402390438,0.8131474103585657,0.8175298804780876,0.8219123505976096,0.8262948207171315,0.8306772908366534,0.8350597609561753,0.8394422310756973,0.8438247011952191,0.848207171314741,0.852589641434263,0.8569721115537848,0.8613545816733068,0.8657370517928287,0.8701195219123506,0.8745019920318725,0.8788844621513944,0.8832669322709163,0.8876494023904382,0.8920318725099602,0.896414342629482,0.900796812749004,0.9051792828685259,0.9095617529880478,0.9139442231075697,0.9183266932270916,0.9227091633466136,0.9270916334661354,0.9314741035856574,0.9358565737051793,0.9402390438247012,0.9446215139442231,0.949003984063745,0.953386454183267,0.9577689243027888,0.9621513944223108,0.9665338645418327,0.9709163346613546,0.9752988047808765,0.9796812749003984,0.9840637450199203,0.9884462151394422,0.9928286852589642,0.997211155378486,1.001593625498008,1.0059760956175299,1.0103585657370517,1.0147410358565736,1.0191235059760957,1.0235059760956176,1.0278884462151394,1.0322709163346613,1.0366533864541834,1.0410358565737052,1.045418326693227,1.049800796812749,1.0541832669322708,1.058565737051793,1.0629482071713148,1.0673306772908366,1.0717131474103585,1.0760956175298806,1.0804780876494025,1.0848605577689243,1.0892430278884462,1.093625498007968,1.0980079681274901,1.102390438247012,1.1067729083665339,1.1111553784860557,1.1155378486055776,1.1199203187250997,1.1243027888446215,1.1286852589641434,1.1330677290836653,1.1374501992031874,1.1418326693227092,1.146215139442231,1.150597609561753,1.1549800796812748,1.159362549800797,1.1637450199203188,1.1681274900398406,1.1725099601593625,1.1768924302788846,1.1812749003984064,1.1856573705179283,1.1900398406374502,1.194422310756972,1.1988047808764941,1.203187250996016,1.2075697211155378,1.2119521912350597,1.2163346613545816,1.2207171314741037,1.2250996015936255,1.2294820717131474,1.2338645418326692,1.2382470119521913,1.2426294820717132,1.247011952191235,1.251394422310757,1.2557768924302788,1.2601593625498009,1.2645418326693227,1.2689243027888446,1.2733067729083665,1.2776892430278886,1.2820717131474104,1.2864541832669323,1.2908366533864541,1.295219123505976,1.299601593625498,1.30398406374502,1.3083665338645418,1.3127490039840637,1.3171314741035856,1.3215139442231076,1.3258964143426295,1.3302788844621514,1.3346613545816732,1.3390438247011953,1.3434262948207172,1.347808764940239,1.352191235059761,1.3565737051792828,1.3609561752988049,1.3653386454183267,1.3697211155378486,1.3741035856573705,1.3784860557768925,1.3828685258964144,1.3872509960159363,1.3916334661354581,1.39601593625498,1.400398406374502,1.404780876494024,1.4091633466135458,1.4135458167330677,1.4179282868525895,1.4223107569721116,1.4266932270916335,1.4310756972111554,1.4354581673306772,1.4398406374501993,1.4442231075697212,1.448605577689243,1.452988047808765,1.4573705179282868,1.4617529880478088,1.4661354581673307,1.4705179282868526,1.4749003984063744,1.4792828685258965,1.4836653386454184,1.4880478087649402,1.4924302788844621,1.496812749003984,1.501195219123506,1.505577689243028,1.5099601593625498,1.5143426294820717,1.5187250996015935,1.5231075697211156,1.5274900398406375,1.5318725099601593,1.5362549800796812,1.5406374501992033,1.5450199203187251,1.549402390438247,1.5537848605577689,1.5581673306772907,1.5625498007968128,1.5669322709163347,1.5713147410358566,1.5756972111553784,1.5800796812749005,1.5844621513944224,1.5888446215139442,1.593227091633466,1.597609561752988,1.60199203187251,1.606374501992032,1.6107569721115538,1.6151394422310756,1.6195219123505975,1.6239043824701196,1.6282868525896415,1.6326693227091633,1.6370517928286852,1.6414342629482073,1.6458167330677291,1.650199203187251,1.6545816733067729,1.6589641434262947,1.6633466135458168,1.6677290836653387,1.6721115537848605,1.6764940239043824,1.6808764940239045,1.6852589641434264,1.6896414342629482,1.69402390438247,1.698406374501992,1.702788844621514,1.707171314741036,1.7115537848605578,1.7159362549800796,1.7203187250996015,1.7247011952191236,1.7290836653386454,1.7334661354581673,1.7378486055776892,1.7422310756972113,1.7466135458167331,1.750996015936255,1.7553784860557768,1.7597609561752987,1.7641434262948208,1.7685258964143427,1.7729083665338645,1.7772908366533864,1.7816733067729085,1.7860557768924303,1.7904382470119522,1.794820717131474,1.799203187250996,1.803585657370518,1.8079681274900399,1.8123505976095617,1.8167330677290836,1.8211155378486055,1.8254980079681276,1.8298804780876494,1.8342629482071713,1.8386454183266931,1.8430278884462152,1.847410358565737,1.851792828685259,1.8561752988047808,1.8605577689243027,1.8649402390438248,1.8693227091633466,1.8737051792828685,1.8780876494023904,1.8824701195219125,1.8868525896414343,1.8912350597609562,1.895617529880478,1.9,1.904382470119522,1.9087649402390439,1.9131474103585657,1.9175298804780876,1.9219123505976095,1.9262948207171315,1.9306772908366534,1.9350597609561753,1.9394422310756971,1.9438247011952192,1.948207171314741,1.952589641434263,1.9569721115537848,1.9613545816733067,1.9657370517928288,1.9701195219123506,1.9745019920318725,1.9788844621513944,1.9832669322709164,1.9876494023904383,1.9920318725099602,1.996414342629482,2.000796812749004,2.005179282868526,2.0095617529880476,2.0139442231075697,2.018326693227092,2.0227091633466134,2.0270916334661355,2.031474103585657,2.0358565737051793,2.0402390438247013,2.044621513944223,2.049003984063745,2.053386454183267,2.057768924302789,2.062151394422311,2.0665338645418325,2.0709163346613546,2.0752988047808767,2.0796812749003983,2.0840637450199204,2.088446215139442,2.092828685258964,2.0972111553784862,2.101593625498008,2.10597609561753,2.1103585657370516,2.1147410358565737,2.119123505976096,2.1235059760956174,2.1278884462151395,2.132270916334661,2.1366533864541832,2.1410358565737053,2.145418326693227,2.149800796812749,2.154183266932271,2.1585657370517928,2.162948207171315,2.1673306772908365,2.1717131474103586,2.1760956175298807,2.1804780876494023,2.1848605577689244,2.189243027888446,2.193625498007968,2.19800796812749,2.202390438247012,2.206772908366534,2.2111553784860556,2.2155378486055777,2.2199203187250998,2.2243027888446214,2.2286852589641435,2.233067729083665,2.237450199203187,2.2418326693227093,2.246215139442231,2.250597609561753,2.254980079681275,2.2593625498007968,2.263745019920319,2.2681274900398405,2.2725099601593626,2.2768924302788847,2.2812749003984063,2.2856573705179284,2.29003984063745,2.294422310756972,2.298804780876494,2.303187250996016,2.307569721115538,2.3119521912350596,2.3163346613545817,2.3207171314741037,2.3250996015936254,2.3294820717131475,2.333864541832669,2.338247011952191,2.3426294820717133,2.347011952191235,2.351394422310757,2.355776892430279,2.3601593625498007,2.364541832669323,2.3689243027888445,2.3733067729083666,2.3776892430278886,2.3820717131474103,2.3864541832669324,2.390836653386454,2.395219123505976,2.399601593625498,2.40398406374502,2.408366533864542,2.4127490039840636,2.4171314741035856,2.4215139442231077,2.4258964143426294,2.4302788844621515,2.434661354581673,2.439043824701195,2.4434262948207173,2.447808764940239,2.452191235059761,2.456573705179283,2.4609561752988047,2.465338645418327,2.4697211155378485,2.4741035856573705,2.4784860557768926,2.4828685258964143,2.4872509960159364,2.491633466135458,2.49601593625498,2.500398406374502,2.504780876494024,2.509163346613546,2.5135458167330675,2.5179282868525896,2.5223107569721117,2.5266932270916334,2.5310756972111554,2.535458167330677,2.539840637450199,2.5442231075697213,2.548605577689243,2.552988047808765,2.557370517928287,2.5617529880478087,2.566135458167331,2.5705179282868524,2.5749003984063745,2.5792828685258966,2.5836653386454183,2.5880478087649403,2.592430278884462,2.596812749003984,2.601195219123506,2.605577689243028,2.60996015936255,2.6143426294820715,2.6187250996015936,2.6231075697211157,2.6274900398406373,2.6318725099601594,2.636254980079681,2.640637450199203,2.6450199203187252,2.649402390438247,2.653784860557769,2.658167330677291,2.6625498007968127,2.666932270916335,2.6713147410358564,2.6756972111553785,2.6800796812749006,2.6844621513944222,2.6888446215139443,2.693227091633466,2.697609561752988,2.70199203187251,2.706374501992032,2.710756972111554,2.7151394422310755,2.7195219123505976,2.7239043824701197,2.7282868525896413,2.7326693227091634,2.737051792828685,2.741434262948207,2.745816733067729,2.750199203187251,2.754581673306773,2.758964143426295,2.7633466135458167,2.7677290836653388,2.7721115537848604,2.7764940239043825,2.7808764940239046,2.785258964143426,2.7896414342629483,2.79402390438247,2.798406374501992,2.802788844621514,2.8071713147410358,2.811553784860558,2.8159362549800795,2.8203187250996016,2.8247011952191237,2.8290836653386453,2.8334661354581674,2.837848605577689,2.842231075697211,2.846613545816733,2.850996015936255,2.855378486055777,2.859760956175299,2.8641434262948207,2.8685258964143427,2.8729083665338644,2.8772908366533865,2.8816733067729086,2.88605577689243,2.8904382470119523,2.894820717131474,2.899203187250996,2.903585657370518,2.9079681274900397,2.912350597609562,2.9167330677290835,2.9211155378486056,2.9254980079681276,2.9298804780876493,2.9342629482071714,2.938645418326693,2.943027888446215,2.947410358565737,2.951792828685259,2.956175298804781,2.960557768924303,2.9649402390438246,2.9693227091633467,2.9737051792828684,2.9780876494023905,2.9824701195219125,2.986852589641434,2.9912350597609563,2.995617529880478,3.0]}
},{}],88:[function(require,module,exports){
module.exports={"expected":[-0.9283177667225558,-0.9270833001509639,-0.9258455372636599,-0.9246044559672696,-0.9233600339305339,-0.9221122485807733,-0.9208610771002848,-0.9196064964226686,-0.9183484832290871,-0.9170870139444498,-0.9158220647335255,-0.9145536114969786,-0.9132816298673293,-0.9120060952048331,-0.9107269825932809,-0.9094442668357154,-0.9081579224500637,-0.9068679236646808,-0.9055742444138076,-0.9042768583329339,-0.9029757387540716,-0.9016708587009293,-0.9003621908839909,-0.8990497076954928,-0.8977333812042978,-0.8964131831506653,-0.8950890849409106,-0.8937610576419555,-0.8924290719757644,-0.8910930983136636,-0.8897531066705414,-0.8884090666989252,-0.8870609476829326,-0.8857087185320948,-0.8843523477750451,-0.882991803553074,-0.8816270536135432,-0.8802580653031569,-0.8788848055610861,-0.8775072409119424,-0.8761253374585966,-0.8747390608748377,-0.8733483763978694,-0.8719532488206384,-0.87055364248399,-0.8691495212686471,-0.8677408485870067,-0.8663275873747501,-0.8649097000822598,-0.8634871486658392,-0.8620598945787301,-0.8606278987619197,-0.8591911216347333,-0.8577495230852071,-0.8563030624602317,-0.8548516985554636,-0.853395389604995,-0.8519340932707762,-0.8504677666317833,-0.8489963661729231,-0.8475198477736687,-0.846038166696416,-0.8445512775745536,-0.843059134400239,-0.84156169051187,-0.8400588985812414,-0.8385507106003819,-0.8370370778680558,-0.8355179509759232,-0.8339932797943456,-0.8324630134578275,-0.8309271003500821,-0.8293854880887084,-0.8278381235094688,-0.826284952650153,-0.8247259207340163,-0.8231609721527775,-0.8215900504491628,-0.8200130982989806,-0.8184300574927115,-0.8168408689165978,-0.8152454725332171,-0.8136438073615198,-0.8120358114563151,-0.8104214218871866,-0.8088005747168163,-0.8071732049786994,-0.8055392466542255,-0.8038986326491091,-0.8022512947691411,-0.8005971636952423,-0.7989361689577911,-0.797268238910202,-0.7955933007017255,-0.7939112802494442,-0.7922221022094343,-0.7905256899470621,-0.7888219655063846,-0.7871108495786217,-0.7853922614696622,-0.7836661190665731,-0.7819323388030691,-0.7801908356239063,-0.7784415229481587,-0.7766843126313328,-0.774919114926278,-0.773145838442844,-0.7713643901062371,-0.7695746751140233,-0.7677765968917252,-0.7659700570469565,-0.7641549553220343,-0.7623311895450083,-0.7604986555790417,-0.7586572472700764,-0.7568068563927108,-0.754947372594216,-0.7530786833366119,-0.7512006738367212,-0.749313227004114,-0.7474162233768533,-0.7455095410549464,-0.743593055631399,-0.7416666401207711,-0.7397301648851198,-0.7377834975572134,-0.735826502960895,-0.7338590430284643,-0.7318809767149407,-0.7298921599090672,-0.7278924453408973,-0.72588168248581,-0.723859717464781,-0.7218263929407314,-0.7197815480107657,-0.7177250180940989,-0.7156566348154625,-0.7135762258837637,-0.7114836149657642,-0.7093786215545254,-0.7072610608323558,-0.70513074352798,-0.7029874757676265,-0.7008310589197237,-0.6986612894328615,-0.6964779586666648,-0.694280852715196,-0.6920697522224853,-0.6898444321897537,-0.6876046617738754,-0.6853502040765871,-0.6830808159239262,-0.6807962476353395,-0.6784962427818725,-0.6761805379328022,-0.6738488623900384,-0.6715009379095688,-0.6691364784091696,-0.6667551896615548,-0.6643567689720697,-0.6619409048399765,-0.659507276602303,-0.6570555540591555,-0.6545853970793096,-0.6520964551848036,-0.649588367113162,-0.6470607603557703,-0.6445132506708026,-0.6419454415689793,-0.6393569237702943,-0.6367472746296924,-0.6341160575295204,-0.6314628212363855,-0.6287870992198572,-0.6260884089302289,-0.6233662510323125,-0.6206201085919733,-0.6178494462118173,-0.6150537091121199,-0.6122323221527247,-0.6093846887912444,-0.6065101899724549,-0.6036081829432861,-0.6006779999872676,-0.5977189470716822,-0.5947303024000083,-0.5917113148614758,-0.5886612023687161,-0.585579150073549,-0.5824643084498801,-0.5793157912314972,-0.5761326731912106,-0.5729139877462639,-0.5696587243732338,-0.566365825813692,-0.5630341850497024,-0.559662642025717,-0.5562499800905784,-0.552794922130064,-0.5492961263566721,-0.5457521817190438,-0.5421616028884683,-0.5385228247742077,-0.5348341965127608,-0.5310939748685061,-0.5273003169742289,-0.523451272329589,-0.5195447739633589,-0.5155786286508692,-0.5115505060611378,-0.5074579266880586,-0.503298248396144,-0.49906865138281703,-0.49476612132508274,-0.49038743043730404,-0.48592911611708445,-0.48138745679585365,-0.47675844453697136,-0.47203775383356933,-0.4672207059464825,-0.4623022279836348,-0.4572768057484893,-0.45213842916646696,-0.44688052882097773,-0.441495901776537,-0.4359766244103192,-0.43031394938095985,-0.42449818308646153,-0.4185185389340279,-0.41236296036700815,-0.40601790572815755,-0.39946808447889554,-0.3926961307348311,-0.38568219505311857,-0.3784034281963554,-0.37083332006038555,-0.362940841242905,-0.3546893107772627,-0.3460348761112427,-0.3369244311950192,-0.3272926985396548,-0.3170580287647602,-0.30611616107636236,-0.29433060118435805,-0.2815170925248512,-0.2674170982563804,-0.251649124198072,-0.23361035297324126,-0.21224909154323077,-0.18541666003019278,-0.14716530059217903,0.0,0.14716530059217903,0.18541666003019278,0.21224909154323077,0.23361035297324126,0.251649124198072,0.2674170982563804,0.2815170925248512,0.29433060118435805,0.30611616107636236,0.3170580287647602,0.3272926985396548,0.3369244311950192,0.3460348761112427,0.3546893107772627,0.362940841242905,0.37083332006038555,0.3784034281963554,0.38568219505311857,0.3926961307348311,0.39946808447889554,0.40601790572815755,0.41236296036700815,0.4185185389340279,0.42449818308646153,0.43031394938095985,0.4359766244103192,0.441495901776537,0.44688052882097773,0.45213842916646696,0.4572768057484893,0.4623022279836348,0.4672207059464825,0.47203775383356933,0.47675844453697136,0.48138745679585365,0.48592911611708445,0.49038743043730404,0.49476612132508274,0.49906865138281703,0.503298248396144,0.5074579266880586,0.5115505060611378,0.5155786286508692,0.5195447739633589,0.523451272329589,0.5273003169742289,0.5310939748685061,0.5348341965127608,0.5385228247742077,0.5421616028884683,0.5457521817190438,0.5492961263566721,0.552794922130064,0.5562499800905784,0.559662642025717,0.5630341850497024,0.566365825813692,0.5696587243732338,0.5729139877462639,0.5761326731912106,0.5793157912314972,0.5824643084498801,0.585579150073549,0.5886612023687161,0.5917113148614758,0.5947303024000083,0.5977189470716822,0.6006779999872676,0.6036081829432861,0.6065101899724549,0.6093846887912444,0.6122323221527247,0.6150537091121199,0.6178494462118173,0.6206201085919733,0.6233662510323125,0.6260884089302289,0.6287870992198572,0.6314628212363855,0.6341160575295204,0.6367472746296924,0.6393569237702943,0.6419454415689793,0.6445132506708026,0.6470607603557703,0.649588367113162,0.6520964551848036,0.6545853970793096,0.6570555540591555,0.659507276602303,0.6619409048399765,0.6643567689720697,0.6667551896615548,0.6691364784091696,0.6715009379095688,0.6738488623900384,0.6761805379328022,0.6784962427818725,0.6807962476353395,0.6830808159239262,0.6853502040765871,0.6876046617738754,0.6898444321897537,0.6920697522224853,0.694280852715196,0.6964779586666648,0.6986612894328615,0.7008310589197237,0.7029874757676265,0.70513074352798,0.7072610608323558,0.7093786215545254,0.7114836149657642,0.7135762258837637,0.7156566348154625,0.7177250180940989,0.7197815480107657,0.7218263929407314,0.723859717464781,0.72588168248581,0.7278924453408973,0.7298921599090672,0.7318809767149407,0.7338590430284643,0.735826502960895,0.7377834975572134,0.7397301648851198,0.7416666401207711,0.743593055631399,0.7455095410549464,0.7474162233768533,0.749313227004114,0.7512006738367212,0.7530786833366119,0.754947372594216,0.7568068563927108,0.7586572472700764,0.7604986555790417,0.7623311895450083,0.7641549553220343,0.7659700570469565,0.7677765968917252,0.7695746751140233,0.7713643901062371,0.773145838442844,0.774919114926278,0.7766843126313328,0.7784415229481587,0.7801908356239063,0.7819323388030691,0.7836661190665731,0.7853922614696622,0.7871108495786217,0.7888219655063846,0.7905256899470621,0.7922221022094343,0.7939112802494442,0.7955933007017255,0.797268238910202,0.7989361689577911,0.8005971636952423,0.8022512947691411,0.8038986326491091,0.8055392466542255,0.8071732049786994,0.8088005747168163,0.8104214218871866,0.8120358114563151,0.8136438073615198,0.8152454725332171,0.8168408689165978,0.8184300574927115,0.8200130982989806,0.8215900504491628,0.8231609721527775,0.8247259207340163,0.826284952650153,0.8278381235094688,0.8293854880887084,0.8309271003500821,0.8324630134578275,0.8339932797943456,0.8355179509759232,0.8370370778680558,0.8385507106003819,0.8400588985812414,0.84156169051187,0.843059134400239,0.8445512775745536,0.846038166696416,0.8475198477736687,0.8489963661729231,0.8504677666317833,0.8519340932707762,0.853395389604995,0.8548516985554636,0.8563030624602317,0.8577495230852071,0.8591911216347333,0.8606278987619197,0.8620598945787301,0.8634871486658392,0.8649097000822598,0.8663275873747501,0.8677408485870067,0.8691495212686471,0.87055364248399,0.8719532488206384,0.8733483763978694,0.8747390608748377,0.8761253374585966,0.8775072409119424,0.8788848055610861,0.8802580653031569,0.8816270536135432,0.882991803553074,0.8843523477750451,0.8857087185320948,0.8870609476829326,0.8884090666989252,0.8897531066705414,0.8910930983136636,0.8924290719757644,0.8937610576419555,0.8950890849409106,0.8964131831506653,0.8977333812042978,0.8990497076954928,0.9003621908839909,0.9016708587009293,0.9029757387540716,0.9042768583329339,0.9055742444138076,0.9068679236646808,0.9081579224500637,0.9094442668357154,0.9107269825932809,0.9120060952048331,0.9132816298673293,0.9145536114969786,0.9158220647335255,0.9170870139444498,0.9183484832290871,0.9196064964226686,0.9208610771002848,0.9221122485807733,0.9233600339305339,0.9246044559672696,0.9258455372636599,0.9270833001509639,0.9283177667225558],"x":[-0.8,-0.796812749003984,-0.7936254980079681,-0.7904382470119522,-0.7872509960159363,-0.7840637450199203,-0.7808764940239044,-0.7776892430278884,-0.7745019920318725,-0.7713147410358566,-0.7681274900398406,-0.7649402390438247,-0.7617529880478088,-0.7585657370517929,-0.7553784860557768,-0.7521912350597609,-0.749003984063745,-0.7458167330677291,-0.7426294820717132,-0.7394422310756972,-0.7362549800796813,-0.7330677290836654,-0.7298804780876494,-0.7266932270916334,-0.7235059760956175,-0.7203187250996016,-0.7171314741035857,-0.7139442231075698,-0.7107569721115538,-0.7075697211155378,-0.7043824701195219,-0.701195219123506,-0.69800796812749,-0.6948207171314741,-0.6916334661354582,-0.6884462151394423,-0.6852589641434262,-0.6820717131474103,-0.6788844621513944,-0.6756972111553785,-0.6725099601593626,-0.6693227091633466,-0.6661354581673307,-0.6629482071713148,-0.6597609561752988,-0.6565737051792828,-0.6533864541832669,-0.650199203187251,-0.6470119521912351,-0.6438247011952192,-0.6406374501992032,-0.6374501992031872,-0.6342629482071713,-0.6310756972111554,-0.6278884462151394,-0.6247011952191235,-0.6215139442231076,-0.6183266932270917,-0.6151394422310758,-0.6119521912350597,-0.6087649402390438,-0.6055776892430279,-0.602390438247012,-0.599203187250996,-0.5960159362549801,-0.5928286852589641,-0.5896414342629482,-0.5864541832669322,-0.5832669322709163,-0.5800796812749004,-0.5768924302788845,-0.5737051792828686,-0.5705179282868525,-0.5673306772908366,-0.5641434262948207,-0.5609561752988048,-0.5577689243027888,-0.5545816733067729,-0.551394422310757,-0.5482071713147411,-0.5450199203187251,-0.5418326693227091,-0.5386454183266932,-0.5354581673306773,-0.5322709163346614,-0.5290836653386454,-0.5258964143426295,-0.5227091633466135,-0.5195219123505976,-0.5163346613545817,-0.5131474103585657,-0.5099601593625498,-0.5067729083665339,-0.503585657370518,-0.500398406374502,-0.49721115537848604,-0.4940239043824701,-0.49083665338645416,-0.48764940239043825,-0.48446215139442234,-0.48127490039840637,-0.47808764940239046,-0.4749003984063745,-0.4717131474103586,-0.4685258964143426,-0.4653386454183267,-0.46215139442231074,-0.4589641434262948,-0.45577689243027886,-0.45258964143426295,-0.44940239043824703,-0.44621513944223107,-0.44302788844621516,-0.4398406374501992,-0.4366533864541833,-0.4334661354581673,-0.4302788844621514,-0.42709163346613543,-0.4239043824701195,-0.4207171314741036,-0.41752988047808764,-0.41434262948207173,-0.41115537848605577,-0.40796812749003986,-0.4047808764940239,-0.401593625498008,-0.398406374501992,-0.3952191235059761,-0.39203187250996013,-0.3888446215139442,-0.3856573705179283,-0.38247011952191234,-0.37928286852589643,-0.37609561752988047,-0.37290836653386455,-0.3697211155378486,-0.3665338645418327,-0.3633466135458167,-0.3601593625498008,-0.3569721115537849,-0.3537848605577689,-0.350597609561753,-0.34741035856573704,-0.34422310756972113,-0.34103585657370517,-0.33784860557768925,-0.3346613545816733,-0.3314741035856574,-0.3282868525896414,-0.3250996015936255,-0.3219123505976096,-0.3187250996015936,-0.3155378486055777,-0.31235059760956174,-0.30916334661354583,-0.30597609561752986,-0.30278884462151395,-0.299601593625498,-0.2964143426294821,-0.2932270916334661,-0.2900398406374502,-0.2868525896414343,-0.2836653386454183,-0.2804780876494024,-0.27729083665338644,-0.27410358565737053,-0.27091633466135456,-0.26772908366533865,-0.2645418326693227,-0.2613545816733068,-0.25816733067729086,-0.2549800796812749,-0.251792828685259,-0.24860557768924302,-0.24541832669322708,-0.24223107569721117,-0.23904382470119523,-0.2358565737051793,-0.23266932270916335,-0.2294820717131474,-0.22629482071713147,-0.22310756972111553,-0.2199203187250996,-0.21673306772908366,-0.21354581673306772,-0.2103585657370518,-0.20717131474103587,-0.20398406374501993,-0.200796812749004,-0.19760956175298805,-0.1944223107569721,-0.19123505976095617,-0.18804780876494023,-0.1848605577689243,-0.18167330677290836,-0.17848605577689244,-0.1752988047808765,-0.17211155378486057,-0.16892430278884463,-0.1657370517928287,-0.16254980079681275,-0.1593625498007968,-0.15617529880478087,-0.15298804780876493,-0.149800796812749,-0.14661354581673305,-0.14342629482071714,-0.1402390438247012,-0.13705179282868526,-0.13386454183266933,-0.1306772908366534,-0.12749003984063745,-0.12430278884462151,-0.12111553784860558,-0.11792828685258964,-0.1147410358565737,-0.11155378486055777,-0.10836653386454183,-0.1051792828685259,-0.10199203187250996,-0.09880478087649402,-0.09561752988047809,-0.09243027888446215,-0.08924302788844622,-0.08605577689243028,-0.08286852589641434,-0.0796812749003984,-0.07649402390438247,-0.07330677290836653,-0.0701195219123506,-0.06693227091633466,-0.06374501992031872,-0.06055776892430279,-0.05737051792828685,-0.054183266932270914,-0.05099601593625498,-0.04780876494023904,-0.04462151394422311,-0.04143426294820717,-0.03824701195219123,-0.0350597609561753,-0.03187250996015936,-0.028685258964143426,-0.02549800796812749,-0.022310756972111555,-0.019123505976095617,-0.01593625498007968,-0.012749003984063745,-0.009561752988047808,-0.006374501992031873,-0.0031872509960159364,0.0,0.0031872509960159364,0.006374501992031873,0.009561752988047808,0.012749003984063745,0.01593625498007968,0.019123505976095617,0.022310756972111555,0.02549800796812749,0.028685258964143426,0.03187250996015936,0.0350597609561753,0.03824701195219123,0.04143426294820717,0.04462151394422311,0.04780876494023904,0.05099601593625498,0.054183266932270914,0.05737051792828685,0.06055776892430279,0.06374501992031872,0.06693227091633466,0.0701195219123506,0.07330677290836653,0.07649402390438247,0.0796812749003984,0.08286852589641434,0.08605577689243028,0.08924302788844622,0.09243027888446215,0.09561752988047809,0.09880478087649402,0.10199203187250996,0.1051792828685259,0.10836653386454183,0.11155378486055777,0.1147410358565737,0.11792828685258964,0.12111553784860558,0.12430278884462151,0.12749003984063745,0.1306772908366534,0.13386454183266933,0.13705179282868526,0.1402390438247012,0.14342629482071714,0.14661354581673305,0.149800796812749,0.15298804780876493,0.15617529880478087,0.1593625498007968,0.16254980079681275,0.1657370517928287,0.16892430278884463,0.17211155378486057,0.1752988047808765,0.17848605577689244,0.18167330677290836,0.1848605577689243,0.18804780876494023,0.19123505976095617,0.1944223107569721,0.19760956175298805,0.200796812749004,0.20398406374501993,0.20717131474103587,0.2103585657370518,0.21354581673306772,0.21673306772908366,0.2199203187250996,0.22310756972111553,0.22629482071713147,0.2294820717131474,0.23266932270916335,0.2358565737051793,0.23904382470119523,0.24223107569721117,0.24541832669322708,0.24860557768924302,0.251792828685259,0.2549800796812749,0.25816733067729086,0.2613545816733068,0.2645418326693227,0.26772908366533865,0.27091633466135456,0.27410358565737053,0.27729083665338644,0.2804780876494024,0.2836653386454183,0.2868525896414343,0.2900398406374502,0.2932270916334661,0.2964143426294821,0.299601593625498,0.30278884462151395,0.30597609561752986,0.30916334661354583,0.31235059760956174,0.3155378486055777,0.3187250996015936,0.3219123505976096,0.3250996015936255,0.3282868525896414,0.3314741035856574,0.3346613545816733,0.33784860557768925,0.34103585657370517,0.34422310756972113,0.34741035856573704,0.350597609561753,0.3537848605577689,0.3569721115537849,0.3601593625498008,0.3633466135458167,0.3665338645418327,0.3697211155378486,0.37290836653386455,0.37609561752988047,0.37928286852589643,0.38247011952191234,0.3856573705179283,0.3888446215139442,0.39203187250996013,0.3952191235059761,0.398406374501992,0.401593625498008,0.4047808764940239,0.40796812749003986,0.41115537848605577,0.41434262948207173,0.41752988047808764,0.4207171314741036,0.4239043824701195,0.42709163346613543,0.4302788844621514,0.4334661354581673,0.4366533864541833,0.4398406374501992,0.44302788844621516,0.44621513944223107,0.44940239043824703,0.45258964143426295,0.45577689243027886,0.4589641434262948,0.46215139442231074,0.4653386454183267,0.4685258964143426,0.4717131474103586,0.4749003984063745,0.47808764940239046,0.48127490039840637,0.48446215139442234,0.48764940239043825,0.49083665338645416,0.4940239043824701,0.49721115537848604,0.500398406374502,0.503585657370518,0.5067729083665339,0.5099601593625498,0.5131474103585657,0.5163346613545817,0.5195219123505976,0.5227091633466135,0.5258964143426295,0.5290836653386454,0.5322709163346614,0.5354581673306773,0.5386454183266932,0.5418326693227091,0.5450199203187251,0.5482071713147411,0.551394422310757,0.5545816733067729,0.5577689243027888,0.5609561752988048,0.5641434262948207,0.5673306772908366,0.5705179282868525,0.5737051792828686,0.5768924302788845,0.5800796812749004,0.5832669322709163,0.5864541832669322,0.5896414342629482,0.5928286852589641,0.5960159362549801,0.599203187250996,0.602390438247012,0.6055776892430279,0.6087649402390438,0.6119521912350597,0.6151394422310758,0.6183266932270917,0.6215139442231076,0.6247011952191235,0.6278884462151394,0.6310756972111554,0.6342629482071713,0.6374501992031872,0.6406374501992032,0.6438247011952192,0.6470119521912351,0.650199203187251,0.6533864541832669,0.6565737051792828,0.6597609561752988,0.6629482071713148,0.6661354581673307,0.6693227091633466,0.6725099601593626,0.6756972111553785,0.6788844621513944,0.6820717131474103,0.6852589641434262,0.6884462151394423,0.6916334661354582,0.6948207171314741,0.69800796812749,0.701195219123506,0.7043824701195219,0.7075697211155378,0.7107569721115538,0.7139442231075698,0.7171314741035857,0.7203187250996016,0.7235059760956175,0.7266932270916334,0.7298804780876494,0.7330677290836654,0.7362549800796813,0.7394422310756972,0.7426294820717132,0.7458167330677291,0.749003984063745,0.7521912350597609,0.7553784860557768,0.7585657370517929,0.7617529880478088,0.7649402390438247,0.7681274900398406,0.7713147410358566,0.7745019920318725,0.7776892430278884,0.7808764940239044,0.7840637450199203,0.7872509960159363,0.7904382470119522,0.7936254980079681,0.796812749003984,0.8]}
},{}],89:[function(require,module,exports){
module.exports={"expected":[1.0000000000000006e-103,9.993355479771243e-104,9.986702111972395e-104,9.980039867091852e-104,9.973368715460186e-104,9.966688627248996e-104,9.95999957246972e-104,9.953301520972466e-104,9.946594442444803e-104,9.939878306410561e-104,9.933153082228614e-104,9.926418739091644e-104,9.919675246024899e-104,9.912922571884945e-104,9.906160685358398e-104,9.899389554960644e-104,9.89260914903455e-104,9.885819435749162e-104,9.879020383098388e-104,9.872211958899677e-104,9.865394130792669e-104,9.858566866237847e-104,9.85173013251517e-104,9.844883896722693e-104,9.83802812577517e-104,9.831162786402655e-104,9.824287845149071e-104,9.817403268370782e-104,9.810509022235145e-104,9.803605072719039e-104,9.796691385607397e-104,9.78976792649171e-104,9.782834660768517e-104,9.775891553637887e-104,9.768938570101879e-104,9.761975674962993e-104,9.755002832822599e-104,9.748020008079355e-104,9.741027164927606e-104,9.734024267355769e-104,9.727011279144702e-104,9.719988163866054e-104,9.7129548848806e-104,9.70591140533656e-104,9.698857688167898e-104,9.691793696092609e-104,9.684719391610978e-104,9.677634737003835e-104,9.670539694330786e-104,9.663434225428417e-104,9.656318291908493e-104,9.649191855156134e-104,9.642054876327969e-104,9.634907316350271e-104,9.627749135917077e-104,9.620580295488289e-104,9.613400755287741e-104,9.606210475301271e-104,9.599009415274747e-104,9.591797534712091e-104,9.584574792873271e-104,9.577341148772276e-104,9.570096561175073e-104,9.562840988597532e-104,9.555574389303343e-104,9.548296721301898e-104,9.541007942346157e-104,9.533708009930488e-104,9.526396881288494e-104,9.519074513390794e-104,9.511740862942809e-104,9.504395886382498e-104,9.497039539878089e-104,9.489671779325768e-104,9.482292560347366e-104,9.474901838287989e-104,9.467499568213657e-104,9.460085704908889e-104,9.452660202874274e-104,9.445223016324018e-104,9.437774099183458e-104,9.430313405086546e-104,9.422840887373312e-104,9.415356499087301e-104,9.407860192972967e-104,9.400351921473051e-104,9.392831636725934e-104,9.385299290562935e-104,9.377754834505614e-104,9.370198219763015e-104,9.362629397228892e-104,9.3550483174789e-104,9.347454930767761e-104,9.33984918702638e-104,9.33223103585895e-104,9.324600426540009e-104,9.316957308011466e-104,9.3093016288796e-104,9.301633337412015e-104,9.29395238153456e-104,9.286258708828226e-104,9.278552266525993e-104,9.270833001509642e-104,9.263100860306537e-104,9.255355789086368e-104,9.247597733657846e-104,9.239826639465373e-104,9.232042451585658e-104,9.224245114724312e-104,9.216434573212379e-104,9.208610771002849e-104,9.200773651667113e-104,9.192923158391382e-104,9.185059233973064e-104,9.177181820817094e-104,9.169290860932227e-104,9.161386295927273e-104,9.1534680670073e-104,9.145536114969788e-104,9.137590380200722e-104,9.129630802670667e-104,9.121657321930761e-104,9.113669877108682e-104,9.105668406904556e-104,9.097652849586824e-104,9.08962314298804e-104,9.081579224500637e-104,9.073521031072624e-104,9.065448499203244e-104,9.057361564938561e-104,9.049260163867013e-104,9.041144231114885e-104,9.033013701341748e-104,9.024868508735823e-104,9.016708587009293e-104,9.008533869393562e-104,9.00034428863444e-104,8.992139776987274e-104,8.983920266212025e-104,8.975685687568262e-104,8.967435971810112e-104,8.959171049181128e-104,8.950890849409105e-104,8.942595301700818e-104,8.934284334736696e-104,8.925957876665427e-104,8.917615855098492e-104,8.909258197104628e-104,8.90088482920421e-104,8.892495677363573e-104,8.884090666989251e-104,8.875669722922136e-104,8.867232769431565e-104,8.858779730209333e-104,8.850310528363608e-104,8.841825086412785e-104,8.833323326279244e-104,8.824805169283026e-104,8.816270536135431e-104,8.807719346932518e-104,8.799151521148523e-104,8.790566977629187e-104,8.78196563458499e-104,8.773347409584292e-104,8.764712219546386e-104,8.756059980734444e-104,8.747390608748376e-104,8.738704018517577e-104,8.730000124293594e-104,8.721278839642665e-104,8.712540077438166e-104,8.703783749852963e-104,8.695009768351629e-104,8.686218043682578e-104,8.677408485870065e-104,8.668581004206095e-104,8.659735507242191e-104,8.650871902781064e-104,8.641990097868157e-104,8.633089998783062e-104,8.62417151103082e-104,8.61523453933309e-104,8.606278987619194e-104,8.597304759017026e-104,8.588311755843831e-104,8.57929987959685e-104,8.570269030943823e-104,8.561219109713354e-104,8.552150014885134e-104,8.543061644580017e-104,8.533953896049946e-104,8.524826665667738e-104,8.515679848916696e-104,8.506513340380085e-104,8.497327033730442e-104,8.488120821718715e-104,8.478894596163248e-104,8.469648247938593e-104,8.460381666964155e-104,8.45109474219265e-104,8.441787361598405e-104,8.432459412165456e-104,8.423110779875476e-104,8.413741349695514e-104,8.404351005565531e-104,8.394939630385752e-104,8.385507106003815e-104,8.376053313201716e-104,8.366578131682556e-104,8.357081440057056e-104,8.347563115829883e-104,8.33802303538574e-104,8.328461073975243e-104,8.318877105700557e-104,8.309271003500816e-104,8.299642639137292e-104,8.289991883178337e-104,8.280318604984064e-104,8.270622672690787e-104,8.260903953195204e-104,8.251162312138315e-104,8.241397613889072e-104,8.231609721527769e-104,8.221798496829139e-104,8.21196380024518e-104,8.202105490887685e-104,8.192223426510479e-104,8.182317463491365e-104,8.17238745681374e-104,8.162433260047928e-104,8.152454725332165e-104,8.142451703353277e-104,8.132424043327017e-104,8.12237159297806e-104,8.112294198519656e-104,8.102191704632924e-104,8.092063954445786e-104,8.081910789511528e-104,8.071732049786987e-104,8.061527573610348e-104,8.051297197678554e-104,8.041040757024298e-104,8.030758084992619e-104,8.020449013217072e-104,8.010113371595464e-104,7.999750988265153e-104,7.989361689577903e-104,7.97894530007427e-104,7.968501642457528e-104,7.958030537567112e-104,7.947531804351563e-104,7.937005259841015e-104,7.926450719119023e-104,7.915867995294128e-104,7.905256899470639e-104,7.894617240718976e-104,7.883948826045446e-104,7.873251460361429e-104,7.862524946451985e-104,7.851769084943853e-104,7.840983674272847e-104,7.830168510650605e-104,7.819323388030708e-104,7.808448098074134e-104,7.79754243011403e-104,7.786606171119804e-104,7.775639105660504e-104,7.764641015867467e-104,7.753611681396234e-104,7.742550879387694e-104,7.731458384428458e-104,7.720333968510434e-104,7.709177400989577e-104,7.697988448543804e-104,7.686766875130058e-104,7.675512441940473e-104,7.664224907357669e-104,7.652904026909076e-104,7.64154955322036e-104,7.630161235967837e-104,7.618738821829907e-104,7.607282054437474e-104,7.595790674323295e-104,7.584264418870271e-104,7.572703022258631e-104,7.561106215411979e-104,7.549473725942177e-104,7.537805278093046e-104,7.526100592682834e-104,7.514359387045432e-104,7.502581374970293e-104,7.490766266641039e-104,7.478913768572694e-104,7.467023583547532e-104,7.45509541054948e-104,7.443128944697055e-104,7.431123877174781e-104,7.419079895163054e-104,7.406996681766404e-104,7.394873915940118e-104,7.382711272415167e-104,7.370508421621405e-104,7.358265029608967e-104,7.345980757967848e-104,7.333655263745578e-104,7.321288199362965e-104,7.308879212527823e-104,7.296427946146666e-104,7.283934038234261e-104,7.271397121821015e-104,7.258816824858116e-104,7.246192770120363e-104,7.233524575106622e-104,7.220811851937821e-104,7.208054207252444e-104,7.195251242099397e-104,7.182402551828224e-104,7.169507725976542e-104,7.156566348154641e-104,7.143577995927159e-104,7.130542240691714e-104,7.117458647554439e-104,7.104326775202289e-104,7.091146175772034e-104,7.077916394715838e-104,7.064636970663292e-104,7.051307435279816e-104,7.037927313121296e-104,7.024496121484828e-104,7.01101337025547e-104,6.99747856174883e-104,6.983891190549391e-104,6.970250743344412e-104,6.95655669875325e-104,6.942808527151977e-104,6.9290056904931e-104,6.91514764212024e-104,6.90123382657759e-104,6.887263679413978e-104,6.873236626981329e-104,6.859152086227356e-104,6.845009464482267e-104,6.830808159239277e-104,6.816547557928694e-104,6.80222703768537e-104,6.787845965109275e-104,6.773403696018917e-104,6.758899575197398e-104,6.74433293613078e-104,6.72970310073853e-104,6.715009379095703e-104,6.700251069146598e-104,6.685427456409524e-104,6.670537813672378e-104,6.655581400678652e-104,6.64055746380353e-104,6.625465235719667e-104,6.610303935052269e-104,6.595072766023045e-104,6.579770918082582e-104,6.564397565530718e-104,6.54895186712438e-104,6.533432965672438e-104,6.517839987617006e-104,6.502172042600652e-104,6.486428223018945e-104,6.470607603557719e-104,6.454709240714413e-104,6.438732172302832e-104,6.422675416940615e-104,6.406537973518667e-104,6.390318820651797e-104,6.374016916109724e-104,6.357631196227611e-104,6.341160575295218e-104,6.324603944923724e-104,6.307960173389217e-104,6.291228104951814e-104,6.274406559149279e-104,6.257494330063997e-104,6.240490185562045e-104,6.223392866503097e-104,6.206201085919746e-104,6.18891352816484e-104,6.171528848025277e-104,6.154045669800651e-104,6.136462586345045e-104,6.118778158070163e-104,6.100990911907881e-104,6.08309934023022e-104,6.065101899724562e-104,6.046997010221878e-104,6.028783053475518e-104,6.010458371888058e-104,5.992021267183447e-104,5.973469999021611e-104,5.954802783552431e-104,5.936017791905872e-104,5.91711314861477e-104,5.898086929966627e-104,5.878937162280475e-104,5.859661820104661e-104,5.840258824331045e-104,5.820726040220928e-104,5.801061275337586e-104,5.78126227738002e-104,5.76132673191212e-104,5.741252259981037e-104,5.721036415618169e-104,5.700676683215602e-104,5.680170474770447e-104,5.659515126988854e-104,5.63870789824098e-104,5.617745965357444e-104,5.596626420257184e-104,5.5753462663957766e-104,5.5539024150225077e-104,5.532291681233522e-104,5.510510779807417e-104,5.4885563208085406e-104,5.466424804942061e-104,5.444112618643587e-104,5.421616028884695e-104,5.3989311776741436e-104,5.37605407623286e-104,5.352980598818888e-104,5.3297064761764226e-104,5.3062272885807814e-104,5.2825384584486374e-104,5.258635242480067e-104,5.234512723295902e-104,5.2101658005304745e-104,5.185589181336071e-104,5.160777370251245e-104,5.135724658380476e-104,5.1104251118275026e-104,5.0848725593188744e-104,5.059060578947837e-104,5.032982483961451e-104,5.0066313075057747e-104,4.979999786234868e-104,4.953080342679208e-104,4.925865066257593e-104,4.8983456928037074e-104,4.8705135824638115e-104,4.8423596958054975e-104,4.813874567958548e-104,4.785048280587546e-104,4.755870431471414e-104,4.726330101437146e-104,4.696415818362976e-104,4.6661155179294843e-104,4.63541650075483e-104,4.604305385501434e-104,4.572768057484904e-104,4.5407896122503286e-104,4.508354293504657e-104,4.4754454247045626e-104,4.442045333494636e-104,4.408135268067726e-104,4.3736953043741984e-104,4.338704242935044e-104,4.303139493809608e-104,4.266976948024985e-104,4.230190833482089e-104,4.192753553001919e-104,4.1546355017504196e-104,4.115804860763897e-104,4.076227362666095e-104,4.035866024893506e-104,3.9946808447889646e-104,3.9526284497353195e-104,3.909661694015354e-104,3.865729192214229e-104,3.82077477661018e-104,3.7747368629710884e-104,3.72754770527474e-104,3.6791325148044836e-104,3.629408412429058e-104,3.5782831740773204e-104,3.525653717639908e-104,3.471404263575988e-104,3.415404079619639e-104,3.3575046895478514e-104,3.2975363830115225e-104,3.235303801778859e-104,3.170580287647609e-104,3.103100542959873e-104,3.032550949862281e-104,2.958556574307385e-104,2.88066336595606e-104,2.798313210128592e-104,2.7108080144423474e-104,2.617256361647951e-104,2.5164912419807255e-104,2.406937283979274e-104,2.286384028742452e-104,2.151569746904804e-104,1.9973404223944823e-104,1.814704206214529e-104,1.5852901438238044e-104,1.2582456209903627e-104,0.0],"x":[1.0e-309,9.9800796812749e-310,9.9601593625498e-310,9.9402390438247e-310,9.9203187250996e-310,9.9003984063745e-310,9.8804780876494e-310,9.8605577689243e-310,9.8406374501992e-310,9.8207171314741e-310,9.800796812749e-310,9.7808764940239e-310,9.7609561752988e-310,9.7410358565737e-310,9.7211155378486e-310,9.7011952191235e-310,9.6812749003984e-310,9.6613545816733e-310,9.6414342629482e-310,9.6215139442231e-310,9.601593625498e-310,9.5816733067729e-310,9.5617529880478e-310,9.54183266932272e-310,9.52191235059763e-310,9.50199203187253e-310,9.48207171314743e-310,9.46215139442233e-310,9.44223107569723e-310,9.42231075697213e-310,9.40239043824703e-310,9.38247011952193e-310,9.36254980079683e-310,9.34262948207173e-310,9.32270916334663e-310,9.30278884462153e-310,9.28286852589643e-310,9.26294820717133e-310,9.24302788844623e-310,9.22310756972113e-310,9.20318725099603e-310,9.18326693227093e-310,9.16334661354583e-310,9.14342629482073e-310,9.12350597609563e-310,9.10358565737053e-310,9.08366533864543e-310,9.06374501992033e-310,9.04382470119523e-310,9.02390438247013e-310,9.00398406374503e-310,8.98406374501993e-310,8.96414342629483e-310,8.94422310756973e-310,8.92430278884463e-310,8.90438247011953e-310,8.88446215139443e-310,8.86454183266933e-310,8.84462151394423e-310,8.82470119521913e-310,8.80478087649403e-310,8.78486055776893e-310,8.76494023904384e-310,8.74501992031874e-310,8.72509960159364e-310,8.70517928286854e-310,8.68525896414344e-310,8.66533864541834e-310,8.64541832669324e-310,8.62549800796814e-310,8.60557768924304e-310,8.58565737051794e-310,8.56573705179284e-310,8.54581673306774e-310,8.52589641434264e-310,8.50597609561754e-310,8.48605577689244e-310,8.46613545816734e-310,8.44621513944224e-310,8.42629482071714e-310,8.40637450199204e-310,8.38645418326694e-310,8.36653386454184e-310,8.34661354581674e-310,8.32669322709164e-310,8.30677290836654e-310,8.28685258964144e-310,8.26693227091634e-310,8.24701195219124e-310,8.22709163346614e-310,8.20717131474104e-310,8.18725099601594e-310,8.16733067729084e-310,8.14741035856574e-310,8.12749003984064e-310,8.10756972111554e-310,8.08764940239044e-310,8.06772908366534e-310,8.04780876494024e-310,8.02788844621514e-310,8.00796812749005e-310,7.98804780876495e-310,7.96812749003985e-310,7.94820717131475e-310,7.92828685258965e-310,7.90836653386455e-310,7.88844621513945e-310,7.86852589641435e-310,7.84860557768925e-310,7.82868525896415e-310,7.80876494023905e-310,7.78884462151395e-310,7.76892430278885e-310,7.74900398406375e-310,7.72908366533865e-310,7.70916334661355e-310,7.68924302788845e-310,7.66932270916335e-310,7.64940239043825e-310,7.62948207171315e-310,7.60956175298805e-310,7.58964143426295e-310,7.56972111553785e-310,7.54980079681275e-310,7.52988047808765e-310,7.50996015936255e-310,7.49003984063745e-310,7.47011952191235e-310,7.45019920318725e-310,7.43027888446215e-310,7.41035856573705e-310,7.39043824701195e-310,7.37051792828685e-310,7.35059760956175e-310,7.33067729083665e-310,7.31075697211155e-310,7.29083665338645e-310,7.27091633466135e-310,7.25099601593626e-310,7.23107569721116e-310,7.21115537848606e-310,7.19123505976096e-310,7.17131474103586e-310,7.15139442231076e-310,7.13147410358566e-310,7.11155378486056e-310,7.09163346613546e-310,7.07171314741036e-310,7.05179282868526e-310,7.03187250996016e-310,7.01195219123506e-310,6.99203187250996e-310,6.97211155378486e-310,6.95219123505976e-310,6.93227091633466e-310,6.91235059760956e-310,6.89243027888446e-310,6.87250996015936e-310,6.85258964143426e-310,6.83266932270916e-310,6.81274900398406e-310,6.79282868525896e-310,6.77290836653386e-310,6.75298804780876e-310,6.73306772908366e-310,6.71314741035856e-310,6.69322709163346e-310,6.67330677290836e-310,6.65338645418326e-310,6.63346613545816e-310,6.61354581673306e-310,6.59362549800796e-310,6.57370517928286e-310,6.55378486055776e-310,6.53386454183266e-310,6.51394422310756e-310,6.49402390438247e-310,6.47410358565737e-310,6.45418326693227e-310,6.43426294820717e-310,6.41434262948207e-310,6.39442231075697e-310,6.37450199203187e-310,6.35458167330677e-310,6.33466135458167e-310,6.31474103585657e-310,6.29482071713147e-310,6.27490039840637e-310,6.25498007968127e-310,6.23505976095617e-310,6.21513944223107e-310,6.19521912350597e-310,6.17529880478087e-310,6.15537848605577e-310,6.13545816733067e-310,6.11553784860557e-310,6.09561752988047e-310,6.07569721115537e-310,6.05577689243027e-310,6.03585657370517e-310,6.01593625498007e-310,5.99601593625497e-310,5.97609561752987e-310,5.95617529880477e-310,5.93625498007967e-310,5.91633466135457e-310,5.89641434262947e-310,5.87649402390437e-310,5.85657370517927e-310,5.83665338645417e-310,5.81673306772907e-310,5.79681274900397e-310,5.77689243027887e-310,5.75697211155377e-310,5.73705179282868e-310,5.71713147410358e-310,5.6972111553785e-310,5.6772908366534e-310,5.6573705179283e-310,5.6374501992032e-310,5.6175298804781e-310,5.597609561753e-310,5.5776892430279e-310,5.5577689243028e-310,5.5378486055777e-310,5.5179282868526e-310,5.4980079681275e-310,5.4780876494024e-310,5.4581673306773e-310,5.4382470119522e-310,5.4183266932271e-310,5.398406374502e-310,5.3784860557769e-310,5.3585657370518e-310,5.3386454183267e-310,5.3187250996016e-310,5.2988047808765e-310,5.2788844621514e-310,5.2589641434263e-310,5.2390438247012e-310,5.2191235059761e-310,5.199203187251e-310,5.1792828685259e-310,5.1593625498008e-310,5.1394422310757e-310,5.1195219123506e-310,5.0996015936255e-310,5.0796812749004e-310,5.0597609561753e-310,5.0398406374502e-310,5.0199203187251e-310,5.00000000000003e-310,4.98007968127493e-310,4.96015936254983e-310,4.94023904382473e-310,4.92031872509964e-310,4.90039840637454e-310,4.88047808764944e-310,4.86055776892434e-310,4.84063745019924e-310,4.82071713147414e-310,4.80079681274904e-310,4.78087649402394e-310,4.76095617529884e-310,4.74103585657374e-310,4.72111553784864e-310,4.70119521912354e-310,4.68127490039844e-310,4.66135458167334e-310,4.64143426294824e-310,4.62151394422314e-310,4.60159362549804e-310,4.58167330677294e-310,4.56175298804784e-310,4.54183266932274e-310,4.52191235059764e-310,4.50199203187254e-310,4.48207171314744e-310,4.46215139442234e-310,4.44223107569724e-310,4.42231075697214e-310,4.40239043824704e-310,4.38247011952194e-310,4.36254980079684e-310,4.34262948207174e-310,4.32270916334664e-310,4.30278884462154e-310,4.28286852589644e-310,4.26294820717134e-310,4.24302788844624e-310,4.22310756972114e-310,4.20318725099604e-310,4.18326693227094e-310,4.16334661354585e-310,4.14342629482075e-310,4.12350597609565e-310,4.10358565737055e-310,4.08366533864545e-310,4.06374501992035e-310,4.04382470119525e-310,4.02390438247015e-310,4.00398406374505e-310,3.98406374501995e-310,3.96414342629485e-310,3.94422310756975e-310,3.92430278884465e-310,3.90438247011955e-310,3.88446215139445e-310,3.86454183266935e-310,3.84462151394425e-310,3.82470119521915e-310,3.80478087649405e-310,3.78486055776895e-310,3.76494023904385e-310,3.74501992031875e-310,3.72509960159365e-310,3.70517928286855e-310,3.68525896414345e-310,3.66533864541835e-310,3.64541832669325e-310,3.62549800796815e-310,3.60557768924305e-310,3.58565737051795e-310,3.56573705179285e-310,3.54581673306775e-310,3.52589641434265e-310,3.50597609561755e-310,3.48605577689245e-310,3.46613545816735e-310,3.44621513944225e-310,3.42629482071715e-310,3.40637450199206e-310,3.38645418326696e-310,3.36653386454186e-310,3.34661354581676e-310,3.32669322709166e-310,3.30677290836656e-310,3.28685258964146e-310,3.26693227091636e-310,3.24701195219126e-310,3.22709163346616e-310,3.20717131474106e-310,3.18725099601596e-310,3.16733067729086e-310,3.14741035856576e-310,3.12749003984066e-310,3.10756972111556e-310,3.08764940239046e-310,3.06772908366536e-310,3.04780876494026e-310,3.02788844621516e-310,3.00796812749006e-310,2.98804780876496e-310,2.96812749003986e-310,2.94820717131476e-310,2.92828685258966e-310,2.90836653386456e-310,2.88844621513946e-310,2.86852589641436e-310,2.84860557768926e-310,2.82868525896416e-310,2.80876494023906e-310,2.78884462151396e-310,2.76892430278886e-310,2.74900398406376e-310,2.72908366533866e-310,2.70916334661356e-310,2.68924302788846e-310,2.66932270916336e-310,2.64940239043827e-310,2.62948207171317e-310,2.60956175298807e-310,2.58964143426297e-310,2.56972111553787e-310,2.54980079681277e-310,2.52988047808767e-310,2.50996015936257e-310,2.49003984063747e-310,2.47011952191237e-310,2.45019920318727e-310,2.43027888446217e-310,2.41035856573707e-310,2.39043824701197e-310,2.37051792828687e-310,2.35059760956177e-310,2.33067729083667e-310,2.31075697211157e-310,2.29083665338647e-310,2.27091633466137e-310,2.25099601593627e-310,2.23107569721117e-310,2.21115537848607e-310,2.19123505976097e-310,2.17131474103587e-310,2.15139442231077e-310,2.13147410358567e-310,2.11155378486057e-310,2.09163346613547e-310,2.07171314741037e-310,2.05179282868527e-310,2.03187250996017e-310,2.01195219123507e-310,1.99203187250997e-310,1.97211155378487e-310,1.95219123505977e-310,1.93227091633467e-310,1.91235059760957e-310,1.89243027888448e-310,1.8725099601594e-310,1.8525896414343e-310,1.8326693227092e-310,1.8127490039841e-310,1.792828685259e-310,1.7729083665339e-310,1.7529880478088e-310,1.7330677290837e-310,1.7131474103586e-310,1.6932270916335e-310,1.6733067729084e-310,1.6533864541833e-310,1.6334661354582e-310,1.6135458167331e-310,1.593625498008e-310,1.5737051792829e-310,1.5537848605578e-310,1.5338645418327e-310,1.5139442231076e-310,1.4940239043825e-310,1.4741035856574e-310,1.4541832669323e-310,1.4342629482072e-310,1.4143426294821e-310,1.394422310757e-310,1.3745019920319e-310,1.3545816733068e-310,1.3346613545817e-310,1.3147410358566e-310,1.2948207171315e-310,1.2749003984064e-310,1.2549800796813e-310,1.2350597609562e-310,1.2151394422311e-310,1.195219123506e-310,1.1752988047809e-310,1.1553784860558e-310,1.1354581673307e-310,1.1155378486056e-310,1.0956175298805e-310,1.0756972111554e-310,1.0557768924303e-310,1.0358565737052e-310,1.0159362549801e-310,9.96015936255e-311,9.760956175299e-311,9.561752988048e-311,9.362549800797e-311,9.163346613546e-311,8.964143426295e-311,8.764940239044e-311,8.565737051793e-311,8.366533864542e-311,8.167330677291e-311,7.96812749004e-311,7.768924302789e-311,7.569721115538e-311,7.370517928287e-311,7.171314741036e-311,6.972111553785e-311,6.772908366534e-311,6.573705179283e-311,6.374501992032e-311,6.175298804781e-311,5.97609561753e-311,5.776892430279e-311,5.577689243028e-311,5.378486055777e-311,5.179282868526e-311,4.980079681275e-311,4.780876494024e-311,4.581673306773e-311,4.382470119522e-311,4.183266932271e-311,3.98406374502e-311,3.784860557769e-311,3.585657370518e-311,3.386454183267e-311,3.187250996016e-311,2.988047808765e-311,2.788844621514e-311,2.589641434263e-311,2.390438247012e-311,2.191235059761e-311,1.99203187251e-311,1.792828685259e-311,1.593625498008e-311,1.394422310757e-311,1.195219123506e-311,9.96015936255e-312,7.96812749004e-312,5.97609561753e-312,3.98406374502e-312,1.99203187251e-312,0.0]}
},{}],90:[function(require,module,exports){
module.exports={"expected":[-1.0e-100,-9.993355479837727e-101,-9.986702112105545e-101,-9.980039867291846e-101,-9.973368715727205e-101,-9.966688627583218e-101,-9.959999572871327e-101,-9.953301521441639e-101,-9.946594442981724e-101,-9.939878307015416e-101,-9.933153082901587e-101,-9.926418739832919e-101,-9.919675246834661e-101,-9.912922572763386e-101,-9.906160686305704e-101,-9.899389555977003e-101,-9.892609150120153e-101,-9.885819436904201e-101,-9.879020384323054e-101,-9.872211960194164e-101,-9.865394132157171e-101,-9.85856686767256e-101,-9.85173013402029e-101,-9.844883898298417e-101,-9.838028127421698e-101,-9.831162788120184e-101,-9.824287846937802e-101,-9.817403270230918e-101,-9.810509024166885e-101,-9.803605074722589e-101,-9.796691387682963e-101,-9.789767928639496e-101,-9.78283466298873e-101,-9.775891555930734e-101,-9.76893857246757e-101,-9.76197567740174e-101,-9.755002835334612e-101,-9.748020010664846e-101,-9.74102716758679e-101,-9.73402427008886e-101,-9.727011281951916e-101,-9.719988166747608e-101,-9.712954887836713e-101,-9.70591140836745e-101,-9.698857691273787e-101,-9.691793699273718e-101,-9.68471939486753e-101,-9.677634740336057e-101,-9.670539697738902e-101,-9.663434228912653e-101,-9.656318295469078e-101,-9.649191858793297e-101,-9.642054880041941e-101,-9.634907320141285e-101,-9.627749139785366e-101,-9.620580299434086e-101,-9.613400759311284e-101,-9.606210479402796e-101,-9.599009419454493e-101,-9.591797538970298e-101,-9.58457479721018e-101,-9.577341153188129e-101,-9.570096565670114e-101,-9.562840993172008e-101,-9.555574393957502e-101,-9.548296726035985e-101,-9.541007947160423e-101,-9.533708014825185e-101,-9.526396886263874e-101,-9.519074518447113e-101,-9.511740868080321e-101,-9.50439589160146e-101,-9.497039545178759e-101,-9.489671784708407e-101,-9.482292565812234e-101,-9.474901843835353e-101,-9.467499573843778e-101,-9.460085710622035e-101,-9.452660208670713e-101,-9.44522302220402e-101,-9.437774105147293e-101,-9.430313411134488e-101,-9.422840893505634e-101,-9.41535650530428e-101,-9.407860199274881e-101,-9.400351927860179e-101,-9.392831643198555e-101,-9.385299297121335e-101,-9.377754841150076e-101,-9.370198226493825e-101,-9.362629404046339e-101,-9.355048324383273e-101,-9.34745493775935e-101,-9.339849194105481e-101,-9.332231043025857e-101,-9.324600433795019e-101,-9.316957315354879e-101,-9.309301636311716e-101,-9.301633344933134e-101,-9.293952389144991e-101,-9.286258716528273e-101,-9.278552274315964e-101,-9.270833009389848e-101,-9.263100868277291e-101,-9.255355797147983e-101,-9.247597741810639e-101,-9.239826647709661e-101,-9.232042459921763e-101,-9.224245123152554e-101,-9.216434581733084e-101,-9.208610779616344e-101,-9.200773660373726e-101,-9.192923167191443e-101,-9.185059242866907e-101,-9.177181829805054e-101,-9.169290870014641e-101,-9.16138630510448e-101,-9.153468076279643e-101,-9.14553612433761e-101,-9.13759038966437e-101,-9.129630812230489e-101,-9.121657331587108e-101,-9.113669886861905e-101,-9.105668416755015e-101,-9.097652859534874e-101,-9.089623153034042e-101,-9.081579234644955e-101,-9.073521041315621e-101,-9.065448509545287e-101,-9.057361575380024e-101,-9.049260174408265e-101,-9.041144241756304e-101,-9.03301371208371e-101,-9.024868519578709e-101,-9.016708597953486e-101,-9.008533880439448e-101,-9.000344299782406e-101,-8.992139788237714e-101,-8.98392027756533e-101,-8.975685699024831e-101,-8.967435983370342e-101,-8.959171060845423e-101,-8.950890861177869e-101,-8.942595313574459e-101,-8.934284346715624e-101,-8.925957888750058e-101,-8.917615867289242e-101,-8.909258209401914e-101,-8.900884841608457e-101,-8.892495689875206e-101,-8.884090679608698e-101,-8.875669735649829e-101,-8.867232782267942e-101,-8.858779743154829e-101,-8.850310541418665e-101,-8.841825099577848e-101,-8.83332333955476e-101,-8.824805182669447e-101,-8.816270549633211e-101,-8.807719360542115e-101,-8.799151534870399e-101,-8.790566991463806e-101,-8.781965648532819e-101,-8.773347423645804e-101,-8.764712233722056e-101,-8.756059995024751e-101,-8.747390623153801e-101,-8.73870403303861e-101,-8.730000138930721e-101,-8.721278854396381e-101,-8.71254009230897e-101,-8.703783764841354e-101,-8.695009783458113e-101,-8.686218058907663e-101,-8.677408501214266e-101,-8.668581019669927e-101,-8.659735522826174e-101,-8.650871918485727e-101,-8.641990113694026e-101,-8.633090014730671e-101,-8.624171527100707e-101,-8.615234555525797e-101,-8.606279003935267e-101,-8.597304775457016e-101,-8.588311772408293e-101,-8.579299896286343e-101,-8.57026904775891e-101,-8.561219126654606e-101,-8.552150031953122e-101,-8.543061661775319e-101,-8.533953913373147e-101,-8.524826683119423e-101,-8.515679866497457e-101,-8.50651335809052e-101,-8.497327051571154e-101,-8.48812083969031e-101,-8.478894614266339e-101,-8.469648266173797e-101,-8.460381685332093e-101,-8.451094760693952e-101,-8.441787380233701e-101,-8.432459430935385e-101,-8.423110798780684e-101,-8.41374136873665e-101,-8.404351024743249e-101,-8.394939649700712e-101,-8.385507125456685e-101,-8.37605333279317e-101,-8.366578151413267e-101,-8.357081459927709e-101,-8.347563135841168e-101,-8.338023055538355e-101,-8.328461094269889e-101,-8.318877126137942e-101,-8.309271024081653e-101,-8.299642659862305e-101,-8.289991904048252e-101,-8.280318625999614e-101,-8.270622693852714e-101,-8.260903974504255e-101,-8.251162333595243e-101,-8.24139763549464e-101,-8.231609743282743e-101,-8.221798518734295e-101,-8.211963822301301e-101,-8.202105513095557e-101,-8.192223448870902e-101,-8.182317486005141e-101,-8.172387479481682e-101,-8.162433282870855e-101,-8.152454748310904e-101,-8.142451726488662e-101,-8.132424066619893e-101,-8.122371616429277e-101,-8.112294222130071e-101,-8.102191728403406e-101,-8.09206397837721e-101,-8.081910813604778e-101,-8.071732074042956e-101,-8.061527598029939e-101,-8.051297222262674e-101,-8.041040781773868e-101,-8.030758109908568e-101,-8.020449038300338e-101,-8.010113396846992e-101,-7.9997510136859e-101,-7.989361715168835e-101,-7.978945325836363e-101,-7.968501668391767e-101,-7.958030563674492e-101,-7.947531830633091e-101,-7.937005286297682e-101,-7.92645074575188e-101,-7.915868022104213e-101,-7.905256926458998e-101,-7.894617267886669e-101,-7.883948853393543e-101,-7.873251487891012e-101,-7.862524974164145e-101,-7.851769112839695e-101,-7.840983702353487e-101,-7.83016853891717e-101,-7.81932341648434e-101,-7.808448126715982e-101,-7.79754245894526e-101,-7.786606200141595e-101,-7.775639134874046e-101,-7.764641045273963e-101,-7.7536117109969e-101,-7.742550909183758e-101,-7.731458414421167e-101,-7.720333998701045e-101,-7.709177431379361e-101,-7.697988479134047e-101,-7.686766905922058e-101,-7.675512472935551e-101,-7.664224938557151e-101,-7.65290405831431e-101,-7.641549584832706e-101,-7.63016126778867e-101,-7.618738853860623e-101,-7.607282086679481e-101,-7.595790706778018e-101,-7.584264451539155e-101,-7.572703055143135e-101,-7.561106248513579e-101,-7.549473759262368e-101,-7.53780531163334e-101,-7.526100626444764e-101,-7.514359421030545e-101,-7.502581409180159e-101,-7.490766301077245e-101,-7.478913803236848e-101,-7.467023618441262e-101,-7.455095445674432e-101,-7.443128980054896e-101,-7.431123912767201e-101,-7.419079930991764e-101,-7.406996717833135e-101,-7.394873952246625e-101,-7.382711308963227e-101,-7.370508458412815e-101,-7.358265066645551e-101,-7.345980795251452e-101,-7.333655301278073e-101,-7.321288237146245e-101,-7.30887925056381e-101,-7.296427984437306e-101,-7.283934076781524e-101,-7.271397160626899e-101,-7.258816863924649e-101,-7.246192809449596e-101,-7.233524614700634e-101,-7.220811891798725e-101,-7.208054247382375e-101,-7.195251282500525e-101,-7.182402592502746e-101,-7.169507766926687e-101,-7.156566389382669e-101,-7.143578037435365e-101,-7.130542282482421e-101,-7.117458689630007e-101,-7.104326817565109e-101,-7.091146218424536e-101,-7.077916437660483e-101,-7.064637013902579e-101,-7.051307478816281e-101,-7.037927356957512e-101,-7.024496165623408e-101,-7.011013414699064e-101,-6.99747860650013e-101,-6.983891235611129e-101,-6.97025078871936e-101,-6.956556744444227e-101,-6.942808573161843e-101,-6.929005736824758e-101,-6.91514768877664e-101,-6.901233873561732e-101,-6.887263726728905e-101,-6.873236674630131e-101,-6.859152134213178e-101,-6.845009512808303e-101,-6.83080820790877e-101,-6.816547606944943e-101,-6.802227087051728e-101,-6.78784601482915e-101,-6.773403746095775e-101,-6.758899625634762e-101,-6.744332986932233e-101,-6.729703151907715e-101,-6.715009430636329e-101,-6.700251121062434e-101,-6.685427508704408e-101,-6.670537866350212e-101,-6.655581453743407e-101,-6.640557517259249e-101,-6.625465289570465e-101,-6.610303989302335e-101,-6.595072820676642e-101,-6.579770973144053e-101,-6.564397621004485e-101,-6.548951923014947e-101,-6.533433021984393e-101,-6.517840044355022e-101,-6.502172099769491e-101,-6.486428280623462e-101,-6.47060766160286e-101,-6.454709299205219e-101,-6.438732231244444e-101,-6.422675476338274e-101,-6.40653803337772e-101,-6.390318880977692e-101,-6.374016976908024e-101,-6.357631257503989e-101,-6.341160637055465e-101,-6.324604007173747e-101,-6.30796023613505e-101,-6.291228168199612e-101,-6.274406622905331e-101,-6.257494394334722e-101,-6.240490250354005e-101,-6.223392931822991e-101,-6.20620115177442e-101,-6.188913594561293e-101,-6.17152891497066e-101,-6.154045737302277e-101,-6.136462654410391e-101,-6.118778226706877e-101,-6.100990981123787e-101,-6.083099410033322e-101,-6.065101970123052e-101,-6.04699708122414e-101,-6.028783125090138e-101,-6.010458444123827e-101,-5.99202134004937e-101,-5.973470072526912e-101,-5.954802857706566e-101,-5.936017866718527e-101,-5.917113224095879e-101,-5.898087006126375e-101,-5.878937239129313e-101,-5.859661897653306e-101,-5.840258902590499e-101,-5.820726119202481e-101,-5.801061355052836e-101,-5.781262357840873e-101,-5.761326813130808e-101,-5.741252341970134e-101,-5.721036498390596e-101,-5.7006767667846475e-101,-5.680170559149776e-101,-5.65951521219253e-101,-5.6387079842834704e-101,-5.6177460522536496e-101,-5.596626508022447e-101,-5.5753463550459044e-101,-5.5539025045737883e-101,-5.5322917717027475e-101,-5.510510871211907e-101,-5.4885564131661614e-101,-5.466424898271251e-101,-5.444112712963384e-101,-5.421616124214763e-101,-5.3989312740348e-101,-5.376054173645108e-101,-5.352980697304448e-101,-5.329706575757766e-101,-5.30622738928117e-101,-5.282538560292158e-101,-5.258635345491675e-101,-5.2345128275014654e-101,-5.21016590595682e-101,-5.185589288011035e-101,-5.160777478203724e-101,-5.1357247676404866e-101,-5.110425222426241e-101,-5.084872671288782e-101,-5.059060692322667e-101,-5.03298259877635e-101,-5.006631423797356e-101,-4.979999904041301e-101,-4.95308046204031e-101,-4.9258651872149326e-101,-4.898345815400707e-101,-4.8705137067458684e-101,-4.842359821820107e-101,-4.8138746957554416e-101,-4.7850484102188385e-101,-4.755870562991767e-101,-4.7263302349039376e-101,-4.6964159538364946e-101,-4.666115655473136e-101,-4.635416640435366e-101,-4.604305527389198e-101,-4.572768201654104e-101,-4.54078975877934e-101,-4.508354442476349e-101,-4.475445576206663e-101,-4.4420454876201326e-101,-4.408135424915314e-101,-4.373695464048773e-101,-4.338704405548252e-101,-4.303139659480462e-101,-4.266977116880552e-101,-4.230191005658261e-101,-4.1927537286442806e-101,-4.15463568101523e-101,-4.1158050438192e-101,-4.07622754969298e-101,-4.0358662160875447e-101,-3.9946810403618625e-101,-3.952628649916806e-101,-3.90966189905537e-101,-3.8657294023854626e-101,-3.820774992211022e-101,-3.774737084329093e-101,-3.727547932750706e-101,-3.679132748797289e-101,-3.6294086533814256e-101,-3.5782834224827504e-101,-3.525653974051061e-101,-3.471404528614921e-101,-3.415404353990403e-101,-3.3575049740521646e-101,-3.297536678568453e-101,-3.2353041094498706e-101,-3.170580608668824e-101,-3.1031008787842666e-101,-3.032551302215773e-101,-2.95855694526481e-101,-2.880663758046291e-101,-2.79831362648361e-101,-2.7108084590147827e-101,-2.6172568395394826e-101,-2.516491759958394e-101,-2.4069378513286375e-101,-2.2863846587680942e-101,-2.151570459791339e-101,-1.997341251290409e-101,-1.8147052123666325e-101,-1.58529146489782e-101,-1.2582477222570378e-101,-2.1544346900318836e-103],"x":[-1.0e-300,-9.980079681474106e-301,-9.960159362948207e-301,-9.94023904442231e-301,-9.920318725896415e-301,-9.900398407370519e-301,-9.880478088844623e-301,-9.860557770318725e-301,-9.840637451792829e-301,-9.820717133266933e-301,-9.800796814741037e-301,-9.780876496215141e-301,-9.760956177689242e-301,-9.741035859163347e-301,-9.721115540637451e-301,-9.701195222111553e-301,-9.681274903585657e-301,-9.661354585059761e-301,-9.641434266533864e-301,-9.621513948007968e-301,-9.601593629482072e-301,-9.581673310956176e-301,-9.56175299243028e-301,-9.541832673904382e-301,-9.521912355378486e-301,-9.501992036852588e-301,-9.482071718326694e-301,-9.462151399800798e-301,-9.442231081274899e-301,-9.422310762749004e-301,-9.402390444223108e-301,-9.38247012569721e-301,-9.362549807171316e-301,-9.342629488645419e-301,-9.322709170119521e-301,-9.302788851593627e-301,-9.282868533067729e-301,-9.262948214541833e-301,-9.243027896015937e-301,-9.22310757749004e-301,-9.203187258964143e-301,-9.183266940438247e-301,-9.163346621912351e-301,-9.143426303386455e-301,-9.123505984860558e-301,-9.103585666334662e-301,-9.083665347808764e-301,-9.06374502928287e-301,-9.043824710756974e-301,-9.023904392231074e-301,-9.00398407370518e-301,-8.984063755179282e-301,-8.964143436653386e-301,-8.944223118127492e-301,-8.924302799601594e-301,-8.904382481075697e-301,-8.884462162549802e-301,-8.864541844023905e-301,-8.844621525498009e-301,-8.824701206972113e-301,-8.804780888446215e-301,-8.784860569920319e-301,-8.764940251394421e-301,-8.745019932868527e-301,-8.72509961434263e-301,-8.705179295816731e-301,-8.685258977290837e-301,-8.66533865876494e-301,-8.645418340239043e-301,-8.625498021713149e-301,-8.605577703187251e-301,-8.585657384661354e-301,-8.565737066135458e-301,-8.545816747609562e-301,-8.525896429083666e-301,-8.50597611055777e-301,-8.486055792031872e-301,-8.466135473505976e-301,-8.44621515498008e-301,-8.426294836454184e-301,-8.406374517928286e-301,-8.38645419940239e-301,-8.366533880876494e-301,-8.346613562350597e-301,-8.326693243824702e-301,-8.306772925298805e-301,-8.286852606772909e-301,-8.266932288247013e-301,-8.247011969721115e-301,-8.227091651195219e-301,-8.207171332669325e-301,-8.187251014143427e-301,-8.16733069561753e-301,-8.147410377091633e-301,-8.127490058565737e-301,-8.107569740039841e-301,-8.087649421513945e-301,-8.067729102988048e-301,-8.04780878446215e-301,-8.027888465936256e-301,-8.00796814741036e-301,-7.988047828884462e-301,-7.968127510358568e-301,-7.94820719183267e-301,-7.928286873306772e-301,-7.908366554780878e-301,-7.88844623625498e-301,-7.868525917729084e-301,-7.848605599203187e-301,-7.82868528067729e-301,-7.808764962151395e-301,-7.788844643625499e-301,-7.768924325099603e-301,-7.749004006573705e-301,-7.729083688047807e-301,-7.709163369521913e-301,-7.689243050996017e-301,-7.669322732470119e-301,-7.649402413944225e-301,-7.629482095418325e-301,-7.609561776892431e-301,-7.589641458366533e-301,-7.569721139840637e-301,-7.549800821314741e-301,-7.529880502788844e-301,-7.509960184262948e-301,-7.490039865737053e-301,-7.470119547211156e-301,-7.450199228685259e-301,-7.430278910159363e-301,-7.410358591633465e-301,-7.39043827310757e-301,-7.370517954581674e-301,-7.350597636055776e-301,-7.33067731752988e-301,-7.310756999003985e-301,-7.2908366804780875e-301,-7.2709163619521915e-301,-7.250996043426295e-301,-7.231075724900399e-301,-7.211155406374503e-301,-7.191235087848606e-301,-7.171314769322709e-301,-7.151394450796814e-301,-7.131474132270916e-301,-7.11155381374502e-301,-7.091633495219123e-301,-7.0717131766932264e-301,-7.051792858167331e-301,-7.0318725396414344e-301,-7.011952221115538e-301,-6.9920319025896416e-301,-6.9721115840637456e-301,-6.952191265537849e-301,-6.932270947011952e-301,-6.912350628486056e-301,-6.89243030996016e-301,-6.872509991434263e-301,-6.852589672908367e-301,-6.83266935438247e-301,-6.812749035856574e-301,-6.792828717330678e-301,-6.7729083988047805e-301,-6.7529880802788845e-301,-6.7330677617529885e-301,-6.713147443227092e-301,-6.693227124701196e-301,-6.673306806175299e-301,-6.653386487649402e-301,-6.633466169123507e-301,-6.613545850597609e-301,-6.593625532071713e-301,-6.573705213545817e-301,-6.55378489501992e-301,-6.533864576494024e-301,-6.513944257968128e-301,-6.4940239394422306e-301,-6.474103620916335e-301,-6.4541833023904386e-301,-6.434262983864542e-301,-6.414342665338646e-301,-6.394422346812749e-301,-6.374502028286853e-301,-6.354581709760957e-301,-6.33466139123506e-301,-6.314741072709163e-301,-6.294820754183267e-301,-6.274900435657371e-301,-6.254980117131474e-301,-6.2350597986055775e-301,-6.2151394800796815e-301,-6.1952191615537855e-301,-6.175298843027889e-301,-6.155378524501992e-301,-6.135458205976096e-301,-6.1155378874502e-301,-6.095617568924303e-301,-6.075697250398406e-301,-6.05577693187251e-301,-6.035856613346614e-301,-6.015936294820717e-301,-5.996015976294821e-301,-5.9760956577689236e-301,-5.956175339243028e-301,-5.936255020717132e-301,-5.916334702191235e-301,-5.896414383665339e-301,-5.8764940651394435e-301,-5.856573746613546e-301,-5.83665342808765e-301,-5.816733109561753e-301,-5.796812791035856e-301,-5.776892472509961e-301,-5.756972153984063e-301,-5.737051835458167e-301,-5.7171315169322705e-301,-5.6972111984063745e-301,-5.6772908798804785e-301,-5.657370561354582e-301,-5.637450242828685e-301,-5.61752992430279e-301,-5.597609605776893e-301,-5.577689287250996e-301,-5.557768968725099e-301,-5.537848650199204e-301,-5.517928331673307e-301,-5.49800801314741e-301,-5.478087694621514e-301,-5.458167376095617e-301,-5.438247057569721e-301,-5.418326739043825e-301,-5.398406420517928e-301,-5.378486101992032e-301,-5.3585657834661365e-301,-5.338645464940239e-301,-5.318725146414343e-301,-5.298804827888446e-301,-5.27888450936255e-301,-5.258964190836654e-301,-5.239043872310756e-301,-5.21912355378486e-301,-5.199203235258965e-301,-5.1792829167330675e-301,-5.1593625982071715e-301,-5.1394422796812755e-301,-5.119521961155378e-301,-5.099601642629483e-301,-5.079681324103586e-301,-5.059761005577689e-301,-5.039840687051793e-301,-5.019920368525897e-301,-5.00000005e-301,-4.980079731474104e-301,-4.960159412948207e-301,-4.940239094422311e-301,-4.920318775896414e-301,-4.900398457370518e-301,-4.8804781388446215e-301,-4.8605578203187255e-301,-4.840637501792829e-301,-4.820717183266933e-301,-4.800796864741036e-301,-4.780876546215139e-301,-4.760956227689243e-301,-4.741035909163347e-301,-4.72111559063745e-301,-4.701195272111553e-301,-4.681274953585658e-301,-4.661354635059761e-301,-4.6414343165338645e-301,-4.6215139980079685e-301,-4.601593679482072e-301,-4.581673360956176e-301,-4.56175304243028e-301,-4.541832723904382e-301,-4.521912405378487e-301,-4.501992086852591e-301,-4.482071768326693e-301,-4.462151449800797e-301,-4.4422311312749e-301,-4.422310812749004e-301,-4.402390494223108e-301,-4.3824701756972105e-301,-4.3625498571713145e-301,-4.3426295386454185e-301,-4.322709220119522e-301,-4.302788901593626e-301,-4.282868583067729e-301,-4.262948264541833e-301,-4.243027946015937e-301,-4.22310762749004e-301,-4.203187308964143e-301,-4.183266990438246e-301,-4.163346671912351e-301,-4.143426353386454e-301,-4.1235060348605575e-301,-4.1035857163346615e-301,-4.0836653978087654e-301,-4.063745079282869e-301,-4.043824760756973e-301,-4.023904442231075e-301,-4.00398412370518e-301,-3.984063805179284e-301,-3.964143486653386e-301,-3.94422316812749e-301,-3.924302849601594e-301,-3.904382531075697e-301,-3.884462212549801e-301,-3.8645418940239035e-301,-3.8446215754980075e-301,-3.824701256972112e-301,-3.8047809384462155e-301,-3.784860619920319e-301,-3.764940301394423e-301,-3.745019982868526e-301,-3.72509966434263e-301,-3.705179345816733e-301,-3.685259027290837e-301,-3.66533870876494e-301,-3.645418390239044e-301,-3.6254980717131477e-301,-3.6055777531872513e-301,-3.5856574346613544e-301,-3.5657371161354584e-301,-3.545816797609562e-301,-3.525896479083665e-301,-3.5059761605577688e-301,-3.4860558420318727e-301,-3.4661355235059763e-301,-3.4462152049800795e-301,-3.4262948864541835e-301,-3.406374567928287e-301,-3.3864542494023906e-301,-3.366533930876494e-301,-3.3466136123505978e-301,-3.3266932938247014e-301,-3.306772975298805e-301,-3.2868526567729085e-301,-3.266932338247012e-301,-3.2470120197211157e-301,-3.2270917011952197e-301,-3.207171382669323e-301,-3.187251064143426e-301,-3.1673307456175304e-301,-3.1474104270916335e-301,-3.127490108565737e-301,-3.1075697900398403e-301,-3.0876494715139443e-301,-3.067729152988048e-301,-3.0478088344621514e-301,-3.027888515936255e-301,-3.0079681974103586e-301,-2.988047878884462e-301,-2.968127560358566e-301,-2.9482072418326693e-301,-2.928286923306773e-301,-2.908366604780877e-301,-2.88844628625498e-301,-2.8685259677290836e-301,-2.8486056492031868e-301,-2.828685330677291e-301,-2.8087650121513944e-301,-2.788844693625498e-301,-2.7689243750996015e-301,-2.7490040565737055e-301,-2.7290837380478087e-301,-2.7091634195219127e-301,-2.689243100996016e-301,-2.66932278247012e-301,-2.649402463944223e-301,-2.629482145418327e-301,-2.60956182689243e-301,-2.589641508366534e-301,-2.5697211898406377e-301,-2.549800871314741e-301,-2.5298805527888444e-301,-2.5099602342629484e-301,-2.490039915737052e-301,-2.470119597211155e-301,-2.450199278685259e-301,-2.4302789601593627e-301,-2.4103586416334663e-301,-2.3904383231075695e-301,-2.3705180045816735e-301,-2.350597686055777e-301,-2.3306773675298806e-301,-2.310757049003984e-301,-2.2908367304780878e-301,-2.2709164119521913e-301,-2.250996093426295e-301,-2.2310757749003985e-301,-2.2111554563745017e-301,-2.1912351378486056e-301,-2.1713148193227092e-301,-2.151394500796813e-301,-2.131474182270916e-301,-2.1115538637450204e-301,-2.0916335452191235e-301,-2.071713226693227e-301,-2.0517929081673307e-301,-2.0318725896414347e-301,-2.011952271115538e-301,-1.992031952589642e-301,-1.972111634063745e-301,-1.952191315537849e-301,-1.932270997011952e-301,-1.9123506784860557e-301,-1.8924303599601593e-301,-1.8725100414342633e-301,-1.8525897229083667e-301,-1.8326694043824702e-301,-1.812749085856574e-301,-1.7928287673306774e-301,-1.7729084488047812e-301,-1.7529881302788843e-301,-1.733067811752988e-301,-1.7131474932270917e-301,-1.693227174701195e-301,-1.6733068561752988e-301,-1.6533865376494022e-301,-1.633466219123506e-301,-1.6135459005976096e-301,-1.5936255820717132e-301,-1.5737052635458167e-301,-1.5537849450199203e-301,-1.5338646264940239e-301,-1.5139443079681277e-301,-1.494023989442231e-301,-1.4741036709163348e-301,-1.4541833523904384e-301,-1.4342630338645418e-301,-1.4143427153386453e-301,-1.394422396812749e-301,-1.3745020782868525e-301,-1.3545817597609563e-301,-1.3346614412350597e-301,-1.3147411227091634e-301,-1.2948208041832668e-301,-1.2749004856573706e-301,-1.2549801671314742e-301,-1.2350598486055777e-301,-1.2151395300796813e-301,-1.195219211553785e-301,-1.1752988930278885e-301,-1.1553785745019923e-301,-1.1354582559760956e-301,-1.1155379374501992e-301,-1.0956176189243026e-301,-1.0756973003984064e-301,-1.05577698187251e-301,-1.0358566633466135e-301,-1.015936344820717e-301,-9.960160262948209e-302,-9.760957077689242e-302,-9.56175389243028e-302,-9.362550707171316e-302,-9.163347521912351e-302,-8.964144336653387e-302,-8.764941151394421e-302,-8.565737966135458e-302,-8.366534780876494e-302,-8.16733159561753e-302,-7.968128410358565e-302,-7.768925225099601e-302,-7.569722039840638e-302,-7.370518854581674e-302,-7.171315669322708e-302,-6.972112484063744e-302,-6.772909298804781e-302,-6.573706113545817e-302,-6.374502928286853e-302,-6.175299743027888e-302,-5.976096557768924e-302,-5.776893372509961e-302,-5.577690187250996e-302,-5.378487001992031e-302,-5.179283816733067e-302,-4.980080631474104e-302,-4.78087744621514e-302,-4.5816742609561755e-302,-4.382471075697211e-302,-4.183267890438247e-302,-3.984064705179283e-302,-3.784861519920319e-302,-3.585658334661355e-302,-3.3864551494023906e-302,-3.1872519641434264e-302,-2.988048778884462e-302,-2.7888455936254984e-302,-2.5896424083665337e-302,-2.39043922310757e-302,-2.1912360378486057e-302,-1.9920328525896415e-302,-1.7928296673306775e-302,-1.5936264820717133e-302,-1.394423296812749e-302,-1.1952201115537848e-302,-9.960169262948207e-303,-7.968137410358566e-303,-5.976105557768924e-303,-3.9840737051792834e-303,-1.9920418525896414e-303,-1.0e-308]}
},{}],91:[function(require,module,exports){
module.exports={"expected":[1.0e-100,9.993355479837727e-101,9.986702112105545e-101,9.980039867291846e-101,9.973368715727205e-101,9.966688627583218e-101,9.959999572871327e-101,9.953301521441639e-101,9.946594442981724e-101,9.939878307015416e-101,9.933153082901587e-101,9.926418739832919e-101,9.919675246834661e-101,9.912922572763386e-101,9.906160686305704e-101,9.899389555977003e-101,9.892609150120153e-101,9.885819436904201e-101,9.879020384323054e-101,9.872211960194164e-101,9.865394132157171e-101,9.85856686767256e-101,9.85173013402029e-101,9.844883898298417e-101,9.838028127421698e-101,9.831162788120184e-101,9.824287846937802e-101,9.817403270230918e-101,9.810509024166885e-101,9.803605074722589e-101,9.796691387682963e-101,9.789767928639496e-101,9.78283466298873e-101,9.775891555930734e-101,9.76893857246757e-101,9.76197567740174e-101,9.755002835334612e-101,9.748020010664846e-101,9.74102716758679e-101,9.73402427008886e-101,9.727011281951916e-101,9.719988166747608e-101,9.712954887836713e-101,9.70591140836745e-101,9.698857691273787e-101,9.691793699273718e-101,9.68471939486753e-101,9.677634740336057e-101,9.670539697738902e-101,9.663434228912653e-101,9.656318295469078e-101,9.649191858793297e-101,9.642054880041941e-101,9.634907320141285e-101,9.627749139785366e-101,9.620580299434086e-101,9.613400759311284e-101,9.606210479402796e-101,9.599009419454493e-101,9.591797538970298e-101,9.58457479721018e-101,9.577341153188129e-101,9.570096565670114e-101,9.562840993172008e-101,9.555574393957502e-101,9.548296726035985e-101,9.541007947160423e-101,9.533708014825185e-101,9.526396886263874e-101,9.519074518447113e-101,9.511740868080321e-101,9.50439589160146e-101,9.497039545178759e-101,9.489671784708407e-101,9.482292565812234e-101,9.474901843835353e-101,9.467499573843778e-101,9.460085710622035e-101,9.452660208670713e-101,9.44522302220402e-101,9.437774105147293e-101,9.430313411134488e-101,9.422840893505634e-101,9.41535650530428e-101,9.407860199274881e-101,9.400351927860179e-101,9.392831643198555e-101,9.385299297121335e-101,9.377754841150076e-101,9.370198226493825e-101,9.362629404046339e-101,9.355048324383273e-101,9.34745493775935e-101,9.339849194105481e-101,9.332231043025857e-101,9.324600433795019e-101,9.316957315354879e-101,9.309301636311716e-101,9.301633344933134e-101,9.293952389144991e-101,9.286258716528273e-101,9.278552274315964e-101,9.270833009389848e-101,9.263100868277291e-101,9.255355797147983e-101,9.247597741810639e-101,9.239826647709661e-101,9.232042459921763e-101,9.224245123152554e-101,9.216434581733084e-101,9.208610779616344e-101,9.200773660373726e-101,9.192923167191443e-101,9.185059242866907e-101,9.177181829805054e-101,9.169290870014641e-101,9.16138630510448e-101,9.153468076279643e-101,9.14553612433761e-101,9.13759038966437e-101,9.129630812230489e-101,9.121657331587108e-101,9.113669886861905e-101,9.105668416755015e-101,9.097652859534874e-101,9.089623153034042e-101,9.081579234644955e-101,9.073521041315621e-101,9.065448509545287e-101,9.057361575380024e-101,9.049260174408265e-101,9.041144241756304e-101,9.03301371208371e-101,9.024868519578709e-101,9.016708597953486e-101,9.008533880439448e-101,9.000344299782406e-101,8.992139788237714e-101,8.98392027756533e-101,8.975685699024831e-101,8.967435983370342e-101,8.959171060845423e-101,8.950890861177869e-101,8.942595313574459e-101,8.934284346715624e-101,8.925957888750058e-101,8.917615867289242e-101,8.909258209401914e-101,8.900884841608457e-101,8.892495689875206e-101,8.884090679608698e-101,8.875669735649829e-101,8.867232782267942e-101,8.858779743154829e-101,8.850310541418665e-101,8.841825099577848e-101,8.83332333955476e-101,8.824805182669447e-101,8.816270549633211e-101,8.807719360542115e-101,8.799151534870399e-101,8.790566991463806e-101,8.781965648532819e-101,8.773347423645804e-101,8.764712233722056e-101,8.756059995024751e-101,8.747390623153801e-101,8.73870403303861e-101,8.730000138930721e-101,8.721278854396381e-101,8.71254009230897e-101,8.703783764841354e-101,8.695009783458113e-101,8.686218058907663e-101,8.677408501214266e-101,8.668581019669927e-101,8.659735522826174e-101,8.650871918485727e-101,8.641990113694026e-101,8.633090014730671e-101,8.624171527100707e-101,8.615234555525797e-101,8.606279003935267e-101,8.597304775457016e-101,8.588311772408293e-101,8.579299896286343e-101,8.57026904775891e-101,8.561219126654606e-101,8.552150031953122e-101,8.543061661775319e-101,8.533953913373147e-101,8.524826683119423e-101,8.515679866497457e-101,8.50651335809052e-101,8.497327051571154e-101,8.48812083969031e-101,8.478894614266339e-101,8.469648266173797e-101,8.460381685332093e-101,8.451094760693952e-101,8.441787380233701e-101,8.432459430935385e-101,8.423110798780684e-101,8.41374136873665e-101,8.404351024743249e-101,8.394939649700712e-101,8.385507125456685e-101,8.37605333279317e-101,8.366578151413267e-101,8.357081459927709e-101,8.347563135841168e-101,8.338023055538355e-101,8.328461094269889e-101,8.318877126137942e-101,8.309271024081653e-101,8.299642659862305e-101,8.289991904048252e-101,8.280318625999614e-101,8.270622693852714e-101,8.260903974504255e-101,8.251162333595243e-101,8.24139763549464e-101,8.231609743282743e-101,8.221798518734295e-101,8.211963822301301e-101,8.202105513095557e-101,8.192223448870902e-101,8.182317486005141e-101,8.172387479481682e-101,8.162433282870855e-101,8.152454748310904e-101,8.142451726488662e-101,8.132424066619893e-101,8.122371616429277e-101,8.112294222130071e-101,8.102191728403406e-101,8.09206397837721e-101,8.081910813604778e-101,8.071732074042956e-101,8.061527598029939e-101,8.051297222262674e-101,8.041040781773868e-101,8.030758109908568e-101,8.020449038300338e-101,8.010113396846992e-101,7.9997510136859e-101,7.989361715168835e-101,7.978945325836363e-101,7.968501668391767e-101,7.958030563674492e-101,7.947531830633091e-101,7.937005286297682e-101,7.92645074575188e-101,7.915868022104213e-101,7.905256926458998e-101,7.894617267886669e-101,7.883948853393543e-101,7.873251487891012e-101,7.862524974164145e-101,7.851769112839695e-101,7.840983702353487e-101,7.83016853891717e-101,7.81932341648434e-101,7.808448126715982e-101,7.79754245894526e-101,7.786606200141595e-101,7.775639134874046e-101,7.764641045273963e-101,7.7536117109969e-101,7.742550909183758e-101,7.731458414421167e-101,7.720333998701045e-101,7.709177431379361e-101,7.697988479134047e-101,7.686766905922058e-101,7.675512472935551e-101,7.664224938557151e-101,7.65290405831431e-101,7.641549584832706e-101,7.63016126778867e-101,7.618738853860623e-101,7.607282086679481e-101,7.595790706778018e-101,7.584264451539155e-101,7.572703055143135e-101,7.561106248513579e-101,7.549473759262368e-101,7.53780531163334e-101,7.526100626444764e-101,7.514359421030545e-101,7.502581409180159e-101,7.490766301077245e-101,7.478913803236848e-101,7.467023618441262e-101,7.455095445674432e-101,7.443128980054896e-101,7.431123912767201e-101,7.419079930991764e-101,7.406996717833135e-101,7.394873952246625e-101,7.382711308963227e-101,7.370508458412815e-101,7.358265066645551e-101,7.345980795251452e-101,7.333655301278073e-101,7.321288237146245e-101,7.30887925056381e-101,7.296427984437306e-101,7.283934076781524e-101,7.271397160626899e-101,7.258816863924649e-101,7.246192809449596e-101,7.233524614700634e-101,7.220811891798725e-101,7.208054247382375e-101,7.195251282500525e-101,7.182402592502746e-101,7.169507766926687e-101,7.156566389382669e-101,7.143578037435365e-101,7.130542282482421e-101,7.117458689630007e-101,7.104326817565109e-101,7.091146218424536e-101,7.077916437660483e-101,7.064637013902579e-101,7.051307478816281e-101,7.037927356957512e-101,7.024496165623408e-101,7.011013414699064e-101,6.99747860650013e-101,6.983891235611129e-101,6.97025078871936e-101,6.956556744444227e-101,6.942808573161843e-101,6.929005736824758e-101,6.91514768877664e-101,6.901233873561732e-101,6.887263726728905e-101,6.873236674630131e-101,6.859152134213178e-101,6.845009512808303e-101,6.83080820790877e-101,6.816547606944943e-101,6.802227087051728e-101,6.78784601482915e-101,6.773403746095775e-101,6.758899625634762e-101,6.744332986932233e-101,6.729703151907715e-101,6.715009430636329e-101,6.700251121062434e-101,6.685427508704408e-101,6.670537866350212e-101,6.655581453743407e-101,6.640557517259249e-101,6.625465289570465e-101,6.610303989302335e-101,6.595072820676642e-101,6.579770973144053e-101,6.564397621004485e-101,6.548951923014947e-101,6.533433021984393e-101,6.517840044355022e-101,6.502172099769491e-101,6.486428280623462e-101,6.47060766160286e-101,6.454709299205219e-101,6.438732231244444e-101,6.422675476338274e-101,6.40653803337772e-101,6.390318880977692e-101,6.374016976908024e-101,6.357631257503989e-101,6.341160637055465e-101,6.324604007173747e-101,6.30796023613505e-101,6.291228168199612e-101,6.274406622905331e-101,6.257494394334722e-101,6.240490250354005e-101,6.223392931822991e-101,6.20620115177442e-101,6.188913594561293e-101,6.17152891497066e-101,6.154045737302277e-101,6.136462654410391e-101,6.118778226706877e-101,6.100990981123787e-101,6.083099410033322e-101,6.065101970123052e-101,6.04699708122414e-101,6.028783125090138e-101,6.010458444123827e-101,5.99202134004937e-101,5.973470072526912e-101,5.954802857706566e-101,5.936017866718527e-101,5.917113224095879e-101,5.898087006126375e-101,5.878937239129313e-101,5.859661897653306e-101,5.840258902590499e-101,5.820726119202481e-101,5.801061355052836e-101,5.781262357840873e-101,5.761326813130808e-101,5.741252341970134e-101,5.721036498390596e-101,5.7006767667846475e-101,5.680170559149776e-101,5.65951521219253e-101,5.6387079842834704e-101,5.6177460522536496e-101,5.596626508022447e-101,5.5753463550459044e-101,5.5539025045737883e-101,5.5322917717027475e-101,5.510510871211907e-101,5.4885564131661614e-101,5.466424898271251e-101,5.444112712963384e-101,5.421616124214763e-101,5.3989312740348e-101,5.376054173645108e-101,5.352980697304448e-101,5.329706575757766e-101,5.30622738928117e-101,5.282538560292158e-101,5.258635345491675e-101,5.2345128275014654e-101,5.21016590595682e-101,5.185589288011035e-101,5.160777478203724e-101,5.1357247676404866e-101,5.110425222426241e-101,5.084872671288782e-101,5.059060692322667e-101,5.03298259877635e-101,5.006631423797356e-101,4.979999904041301e-101,4.95308046204031e-101,4.9258651872149326e-101,4.898345815400707e-101,4.8705137067458684e-101,4.842359821820107e-101,4.8138746957554416e-101,4.7850484102188385e-101,4.755870562991767e-101,4.7263302349039376e-101,4.6964159538364946e-101,4.666115655473136e-101,4.635416640435366e-101,4.604305527389198e-101,4.572768201654104e-101,4.54078975877934e-101,4.508354442476349e-101,4.475445576206663e-101,4.4420454876201326e-101,4.408135424915314e-101,4.373695464048773e-101,4.338704405548252e-101,4.303139659480462e-101,4.266977116880552e-101,4.230191005658261e-101,4.1927537286442806e-101,4.15463568101523e-101,4.1158050438192e-101,4.07622754969298e-101,4.0358662160875447e-101,3.9946810403618625e-101,3.952628649916806e-101,3.90966189905537e-101,3.8657294023854626e-101,3.820774992211022e-101,3.774737084329093e-101,3.727547932750706e-101,3.679132748797289e-101,3.6294086533814256e-101,3.5782834224827504e-101,3.525653974051061e-101,3.471404528614921e-101,3.415404353990403e-101,3.3575049740521646e-101,3.297536678568453e-101,3.2353041094498706e-101,3.170580608668824e-101,3.1031008787842666e-101,3.032551302215773e-101,2.95855694526481e-101,2.880663758046291e-101,2.79831362648361e-101,2.7108084590147827e-101,2.6172568395394826e-101,2.516491759958394e-101,2.4069378513286375e-101,2.2863846587680942e-101,2.151570459791339e-101,1.997341251290409e-101,1.8147052123666325e-101,1.58529146489782e-101,1.2582477222570378e-101,2.1544346900318836e-103],"x":[1.0e-300,9.980079681474106e-301,9.960159362948207e-301,9.94023904442231e-301,9.920318725896415e-301,9.900398407370519e-301,9.880478088844623e-301,9.860557770318725e-301,9.840637451792829e-301,9.820717133266933e-301,9.800796814741037e-301,9.780876496215141e-301,9.760956177689242e-301,9.741035859163347e-301,9.721115540637451e-301,9.701195222111553e-301,9.681274903585657e-301,9.661354585059761e-301,9.641434266533864e-301,9.621513948007968e-301,9.601593629482072e-301,9.581673310956176e-301,9.56175299243028e-301,9.541832673904382e-301,9.521912355378486e-301,9.501992036852588e-301,9.482071718326694e-301,9.462151399800798e-301,9.442231081274899e-301,9.422310762749004e-301,9.402390444223108e-301,9.38247012569721e-301,9.362549807171316e-301,9.342629488645419e-301,9.322709170119521e-301,9.302788851593627e-301,9.282868533067729e-301,9.262948214541833e-301,9.243027896015937e-301,9.22310757749004e-301,9.203187258964143e-301,9.183266940438247e-301,9.163346621912351e-301,9.143426303386455e-301,9.123505984860558e-301,9.103585666334662e-301,9.083665347808764e-301,9.06374502928287e-301,9.043824710756974e-301,9.023904392231074e-301,9.00398407370518e-301,8.984063755179282e-301,8.964143436653386e-301,8.944223118127492e-301,8.924302799601594e-301,8.904382481075697e-301,8.884462162549802e-301,8.864541844023905e-301,8.844621525498009e-301,8.824701206972113e-301,8.804780888446215e-301,8.784860569920319e-301,8.764940251394421e-301,8.745019932868527e-301,8.72509961434263e-301,8.705179295816731e-301,8.685258977290837e-301,8.66533865876494e-301,8.645418340239043e-301,8.625498021713149e-301,8.605577703187251e-301,8.585657384661354e-301,8.565737066135458e-301,8.545816747609562e-301,8.525896429083666e-301,8.50597611055777e-301,8.486055792031872e-301,8.466135473505976e-301,8.44621515498008e-301,8.426294836454184e-301,8.406374517928286e-301,8.38645419940239e-301,8.366533880876494e-301,8.346613562350597e-301,8.326693243824702e-301,8.306772925298805e-301,8.286852606772909e-301,8.266932288247013e-301,8.247011969721115e-301,8.227091651195219e-301,8.207171332669325e-301,8.187251014143427e-301,8.16733069561753e-301,8.147410377091633e-301,8.127490058565737e-301,8.107569740039841e-301,8.087649421513945e-301,8.067729102988048e-301,8.04780878446215e-301,8.027888465936256e-301,8.00796814741036e-301,7.988047828884462e-301,7.968127510358568e-301,7.94820719183267e-301,7.928286873306772e-301,7.908366554780878e-301,7.88844623625498e-301,7.868525917729084e-301,7.848605599203187e-301,7.82868528067729e-301,7.808764962151395e-301,7.788844643625499e-301,7.768924325099603e-301,7.749004006573705e-301,7.729083688047807e-301,7.709163369521913e-301,7.689243050996017e-301,7.669322732470119e-301,7.649402413944225e-301,7.629482095418325e-301,7.609561776892431e-301,7.589641458366533e-301,7.569721139840637e-301,7.549800821314741e-301,7.529880502788844e-301,7.509960184262948e-301,7.490039865737053e-301,7.470119547211156e-301,7.450199228685259e-301,7.430278910159363e-301,7.410358591633465e-301,7.39043827310757e-301,7.370517954581674e-301,7.350597636055776e-301,7.33067731752988e-301,7.310756999003985e-301,7.2908366804780875e-301,7.2709163619521915e-301,7.250996043426295e-301,7.231075724900399e-301,7.211155406374503e-301,7.191235087848606e-301,7.171314769322709e-301,7.151394450796814e-301,7.131474132270916e-301,7.11155381374502e-301,7.091633495219123e-301,7.0717131766932264e-301,7.051792858167331e-301,7.0318725396414344e-301,7.011952221115538e-301,6.9920319025896416e-301,6.9721115840637456e-301,6.952191265537849e-301,6.932270947011952e-301,6.912350628486056e-301,6.89243030996016e-301,6.872509991434263e-301,6.852589672908367e-301,6.83266935438247e-301,6.812749035856574e-301,6.792828717330678e-301,6.7729083988047805e-301,6.7529880802788845e-301,6.7330677617529885e-301,6.713147443227092e-301,6.693227124701196e-301,6.673306806175299e-301,6.653386487649402e-301,6.633466169123507e-301,6.613545850597609e-301,6.593625532071713e-301,6.573705213545817e-301,6.55378489501992e-301,6.533864576494024e-301,6.513944257968128e-301,6.4940239394422306e-301,6.474103620916335e-301,6.4541833023904386e-301,6.434262983864542e-301,6.414342665338646e-301,6.394422346812749e-301,6.374502028286853e-301,6.354581709760957e-301,6.33466139123506e-301,6.314741072709163e-301,6.294820754183267e-301,6.274900435657371e-301,6.254980117131474e-301,6.2350597986055775e-301,6.2151394800796815e-301,6.1952191615537855e-301,6.175298843027889e-301,6.155378524501992e-301,6.135458205976096e-301,6.1155378874502e-301,6.095617568924303e-301,6.075697250398406e-301,6.05577693187251e-301,6.035856613346614e-301,6.015936294820717e-301,5.996015976294821e-301,5.9760956577689236e-301,5.956175339243028e-301,5.936255020717132e-301,5.916334702191235e-301,5.896414383665339e-301,5.8764940651394435e-301,5.856573746613546e-301,5.83665342808765e-301,5.816733109561753e-301,5.796812791035856e-301,5.776892472509961e-301,5.756972153984063e-301,5.737051835458167e-301,5.7171315169322705e-301,5.6972111984063745e-301,5.6772908798804785e-301,5.657370561354582e-301,5.637450242828685e-301,5.61752992430279e-301,5.597609605776893e-301,5.577689287250996e-301,5.557768968725099e-301,5.537848650199204e-301,5.517928331673307e-301,5.49800801314741e-301,5.478087694621514e-301,5.458167376095617e-301,5.438247057569721e-301,5.418326739043825e-301,5.398406420517928e-301,5.378486101992032e-301,5.3585657834661365e-301,5.338645464940239e-301,5.318725146414343e-301,5.298804827888446e-301,5.27888450936255e-301,5.258964190836654e-301,5.239043872310756e-301,5.21912355378486e-301,5.199203235258965e-301,5.1792829167330675e-301,5.1593625982071715e-301,5.1394422796812755e-301,5.119521961155378e-301,5.099601642629483e-301,5.079681324103586e-301,5.059761005577689e-301,5.039840687051793e-301,5.019920368525897e-301,5.00000005e-301,4.980079731474104e-301,4.960159412948207e-301,4.940239094422311e-301,4.920318775896414e-301,4.900398457370518e-301,4.8804781388446215e-301,4.8605578203187255e-301,4.840637501792829e-301,4.820717183266933e-301,4.800796864741036e-301,4.780876546215139e-301,4.760956227689243e-301,4.741035909163347e-301,4.72111559063745e-301,4.701195272111553e-301,4.681274953585658e-301,4.661354635059761e-301,4.6414343165338645e-301,4.6215139980079685e-301,4.601593679482072e-301,4.581673360956176e-301,4.56175304243028e-301,4.541832723904382e-301,4.521912405378487e-301,4.501992086852591e-301,4.482071768326693e-301,4.462151449800797e-301,4.4422311312749e-301,4.422310812749004e-301,4.402390494223108e-301,4.3824701756972105e-301,4.3625498571713145e-301,4.3426295386454185e-301,4.322709220119522e-301,4.302788901593626e-301,4.282868583067729e-301,4.262948264541833e-301,4.243027946015937e-301,4.22310762749004e-301,4.203187308964143e-301,4.183266990438246e-301,4.163346671912351e-301,4.143426353386454e-301,4.1235060348605575e-301,4.1035857163346615e-301,4.0836653978087654e-301,4.063745079282869e-301,4.043824760756973e-301,4.023904442231075e-301,4.00398412370518e-301,3.984063805179284e-301,3.964143486653386e-301,3.94422316812749e-301,3.924302849601594e-301,3.904382531075697e-301,3.884462212549801e-301,3.8645418940239035e-301,3.8446215754980075e-301,3.824701256972112e-301,3.8047809384462155e-301,3.784860619920319e-301,3.764940301394423e-301,3.745019982868526e-301,3.72509966434263e-301,3.705179345816733e-301,3.685259027290837e-301,3.66533870876494e-301,3.645418390239044e-301,3.6254980717131477e-301,3.6055777531872513e-301,3.5856574346613544e-301,3.5657371161354584e-301,3.545816797609562e-301,3.525896479083665e-301,3.5059761605577688e-301,3.4860558420318727e-301,3.4661355235059763e-301,3.4462152049800795e-301,3.4262948864541835e-301,3.406374567928287e-301,3.3864542494023906e-301,3.366533930876494e-301,3.3466136123505978e-301,3.3266932938247014e-301,3.306772975298805e-301,3.2868526567729085e-301,3.266932338247012e-301,3.2470120197211157e-301,3.2270917011952197e-301,3.207171382669323e-301,3.187251064143426e-301,3.1673307456175304e-301,3.1474104270916335e-301,3.127490108565737e-301,3.1075697900398403e-301,3.0876494715139443e-301,3.067729152988048e-301,3.0478088344621514e-301,3.027888515936255e-301,3.0079681974103586e-301,2.988047878884462e-301,2.968127560358566e-301,2.9482072418326693e-301,2.928286923306773e-301,2.908366604780877e-301,2.88844628625498e-301,2.8685259677290836e-301,2.8486056492031868e-301,2.828685330677291e-301,2.8087650121513944e-301,2.788844693625498e-301,2.7689243750996015e-301,2.7490040565737055e-301,2.7290837380478087e-301,2.7091634195219127e-301,2.689243100996016e-301,2.66932278247012e-301,2.649402463944223e-301,2.629482145418327e-301,2.60956182689243e-301,2.589641508366534e-301,2.5697211898406377e-301,2.549800871314741e-301,2.5298805527888444e-301,2.5099602342629484e-301,2.490039915737052e-301,2.470119597211155e-301,2.450199278685259e-301,2.4302789601593627e-301,2.4103586416334663e-301,2.3904383231075695e-301,2.3705180045816735e-301,2.350597686055777e-301,2.3306773675298806e-301,2.310757049003984e-301,2.2908367304780878e-301,2.2709164119521913e-301,2.250996093426295e-301,2.2310757749003985e-301,2.2111554563745017e-301,2.1912351378486056e-301,2.1713148193227092e-301,2.151394500796813e-301,2.131474182270916e-301,2.1115538637450204e-301,2.0916335452191235e-301,2.071713226693227e-301,2.0517929081673307e-301,2.0318725896414347e-301,2.011952271115538e-301,1.992031952589642e-301,1.972111634063745e-301,1.952191315537849e-301,1.932270997011952e-301,1.9123506784860557e-301,1.8924303599601593e-301,1.8725100414342633e-301,1.8525897229083667e-301,1.8326694043824702e-301,1.812749085856574e-301,1.7928287673306774e-301,1.7729084488047812e-301,1.7529881302788843e-301,1.733067811752988e-301,1.7131474932270917e-301,1.693227174701195e-301,1.6733068561752988e-301,1.6533865376494022e-301,1.633466219123506e-301,1.6135459005976096e-301,1.5936255820717132e-301,1.5737052635458167e-301,1.5537849450199203e-301,1.5338646264940239e-301,1.5139443079681277e-301,1.494023989442231e-301,1.4741036709163348e-301,1.4541833523904384e-301,1.4342630338645418e-301,1.4143427153386453e-301,1.394422396812749e-301,1.3745020782868525e-301,1.3545817597609563e-301,1.3346614412350597e-301,1.3147411227091634e-301,1.2948208041832668e-301,1.2749004856573706e-301,1.2549801671314742e-301,1.2350598486055777e-301,1.2151395300796813e-301,1.195219211553785e-301,1.1752988930278885e-301,1.1553785745019923e-301,1.1354582559760956e-301,1.1155379374501992e-301,1.0956176189243026e-301,1.0756973003984064e-301,1.05577698187251e-301,1.0358566633466135e-301,1.015936344820717e-301,9.960160262948209e-302,9.760957077689242e-302,9.56175389243028e-302,9.362550707171316e-302,9.163347521912351e-302,8.964144336653387e-302,8.764941151394421e-302,8.565737966135458e-302,8.366534780876494e-302,8.16733159561753e-302,7.968128410358565e-302,7.768925225099601e-302,7.569722039840638e-302,7.370518854581674e-302,7.171315669322708e-302,6.972112484063744e-302,6.772909298804781e-302,6.573706113545817e-302,6.374502928286853e-302,6.175299743027888e-302,5.976096557768924e-302,5.776893372509961e-302,5.577690187250996e-302,5.378487001992031e-302,5.179283816733067e-302,4.980080631474104e-302,4.78087744621514e-302,4.5816742609561755e-302,4.382471075697211e-302,4.183267890438247e-302,3.984064705179283e-302,3.784861519920319e-302,3.585658334661355e-302,3.3864551494023906e-302,3.1872519641434264e-302,2.988048778884462e-302,2.7888455936254984e-302,2.5896424083665337e-302,2.39043922310757e-302,2.1912360378486057e-302,1.9920328525896415e-302,1.7928296673306775e-302,1.5936264820717133e-302,1.394423296812749e-302,1.1952201115537848e-302,9.960169262948207e-303,7.968137410358566e-303,5.976105557768924e-303,3.9840737051792834e-303,1.9920418525896414e-303,1.0e-308]}
},{}],92:[function(require,module,exports){
module.exports={"expected":[-3.684031498640387,-3.7059173476721448,-3.727547705274732,-3.7489298997706832,-3.7700709288420633,-3.7909774797019096,-3.8116559477250416,-3.8321124536788256,-3.8523528596796175,-3.872382783987553,-3.8922076147407934,-3.911832522720152,-3.931262473225983,-3.9505022371412095,-3.969556401247221,-3.9884293778530537,-4.007125413792563,-4.025648598839281,-4.044002873584082,-4.062192036816754,-4.080219752448888,-4.098089556012259,-4.1158048607638875,-4.133368963426319,-4.1507850495892615,-4.168056198796528,-4.18518538934028,-4.202175502782767,-4.219029328224157,-4.235749566333543,-4.252338833158916,-4.26879966373065,-4.2851345154719125,-4.3013457714284495,-4.317435743329196,-4.333406674488394,-4.349260742559034,-4.365000062146798,-4.380626687292983,-4.3961426138342885,-4.411549781646822,-4.426850076781129,-4.442045333494626,-4.457137336187347,-4.472127821246547,-4.487018478805302,-4.5018109544199545,-4.516506850670874,-4.5311077286907775,-4.545615109624536,-4.560030476024165,-4.574355273182465,-4.588590910408546,-4.602738762248301,-4.616800169652669,-4.630776441096384,-4.6446688536497405,-4.658478654005732,-4.672207059464825,-4.685855258879446,-4.69942441356018,-4.712915658145552,-4.726330101437135,-4.739668827201677,-4.752932894941782,-4.766123340636666,-4.779241177454345,-4.792287396436634,-4.805262967158147,-4.818168838360548,-4.831005938563116,-4.843775176650738,-4.856477442440298,-4.869113607226441,-4.88168452430761,-4.8941910294932125,-4.9066339415927365,-4.919014062887583,-4.931332179586368,-4.943589062264368,-4.955785466287796,-4.967922132223522,-4.979999786234857,-4.992019140463958,-5.003980893401402,-5.0158857302434585,-5.027734323237537,-5.039527332016296,-5.051265403920856,-5.0629491743135455,-5.074579266880585,-5.086156293925113,-5.097680856650901,-5.109153545437151,-5.120574940104665,-5.1319456101737675,-5.1432661151142405,-5.154537004587602,-5.165758818681998,-5.17693208813998,-5.188057334579428,-5.199135070707876,-5.210165800530462,-5.2211500195517475,-5.2320882149716095,-5.242980865875438,-5.2538284434188025,-5.264631411006825,-5.275390224468401,-5.28610533222548,-5.296777175457559,-5.307406188261545,-5.317992797807169,-5.328537424488069,-5.339040482068719,-5.349502377827315,-5.359923512694775,-5.370304281389956,-5.38064507255124,-5.390946268864587,-5.4012082471881735,-5.41143137867373,-5.421616028884682,-5.431762557911195,-5.441871320482224,-5.451942666074652,-5.461976939019629,-5.471974478606173,-5.481935619182143,-5.491860690252638,-5.501750016575932,-5.51160391825699,-5.521422710838654,-5.531206705390579,-5.5409562085959525,-5.550671522836108,-5.5603529462730545,-5.570000772930013,-5.579615292769998,-5.589196791772517,-5.598745552008435,-5.608261851713045,-5.617745965357431,-5.627198163718127,-5.636618713945162,-5.646007879628503,-5.655365920862966,-5.6646930943116285,-5.673989653267774,-5.683255847715436,-5.69249192438855,-5.70169812682878,-5.710874695442026,-5.7200218675536805,-5.729139877462639,-5.738228956494122,-5.747289333051316,-5.7563212326658935,-5.765324878047415,-5.77430048913166,-5.7832482831279055,-5.792168474565189,-5.801061275337572,-5.809926894748441,-5.8187655395538505,-5.827577414004973,-5.8363627198896255,-5.845121656572941,-5.8538544210371795,-5.862561207920723,-5.871242209556244,-5.879897616008102,-5.888527615108962,-5.897132392495669,-5.90571213164439,-5.914267013905043,-5.922797218535029,-5.931302922732293,-5.939784301667712,-5.948241528516847,-5.956674774491059,-5.965084208868018,-5.973469999021597,-5.9818323104511935,-5.990171306810476,-5.998487149935564,-6.006779999872676,-6.015050014905229,-6.023297351580432,-6.03152216473536,-6.039724607522544,-6.047904831435056,-6.056062986331146,-6.064199220458393,-6.072313680477417,-6.08040651148514,-6.088477857037625,-6.096527859172481,-6.1045566584308615,-6.112564393879061,-6.120551203129708,-6.128517222362578,-6.136462586345031,-6.144387428452074,-6.152291880686061,-6.160176073696049,-6.168040136796797,-6.175884197987434,-6.183708383969794,-6.191512820166422,-6.199297630738274,-6.207062938602096,-6.214808865447506,-6.222535531753772,-6.2302430568063105,-6.237931558712884,-6.245601154419536,-6.2532519597262395,-6.260884089302289,-6.26849765670142,-6.276092774376681,-6.2836695536950495,-6.2912281049517995,-6.298768537384637,-6.306290959187589,-6.313795477524665,-6.3212821985432965,-6.328751227387545,-6.3362026682111,-6.343636624190058,-6.3510531975354985,-6.358452489505849,-6.36583460041905,-6.373199629664526,-6.380547675714965,-6.3878788361378955,-6.3951932076070985,-6.402490885913817,-6.409771965977805,-6.417036541858182,-6.424284706764134,-6.431516553065439,-6.438732172302817,-6.445931655198138,-6.453115091664454,-6.46028257081588,-6.467434180977327,-6.474570009694079,-6.481690143741223,-6.488794669132933,-6.495883671131621,-6.502957234256935,-6.510015442294633,-6.517058378305309,-6.524086124633007,-6.531098762913676,-6.538096374083535,-6.545079038387277,-6.552046835386177,-6.558999843966067,-6.565938142345192,-6.57286180808196,-6.579770918082567,-6.586665548608518,-6.593545775284027,-6.600411673103329,-6.607263316437864,-6.614100779043368,-6.620924134066866,-6.627733454053549,-6.634528810953569,-6.641310276128727,-6.648077920359068,-6.654831813849381,-6.661572026235611,-6.668298626591174,-6.675011683433189,-6.681711264728617,-6.688397437900321,-6.6950702698330335,-6.701729826879246,-6.708376174865015,-6.7150093790956875,-6.72162950436155,-6.728236614943394,-6.734830774618012,-6.741412046663616,-6.747980493865174,-6.7545361785196905,-6.7610791624414,-6.7676095069669,-6.7741272729602064,-6.78063252081775,-6.787125310473298,-6.793605701402819,-6.800073752629268,-6.8065295227273275,-6.812973069828071,-6.819404451623565,-6.825823725371424,-6.832230947899288,-6.838626175609257,-6.845009464482252,-6.851380870082335,-6.857740447560962,-6.864088251661184,-6.870424336721793,-6.87674875668142,-6.88306156508257,-6.889362815075613,-6.895652559422726,-6.901930850501776,-6.908197740310158,-6.914453280468591,-6.920697522224853,-6.926930516457478,-6.9331523136794075,-6.939362964041585,-6.945562517336525,-6.951751023001816,-6.957928530123592,-6.964095087439963,-6.970250743344396,-6.976395545889054,-6.982529542788106,-6.988652781420975,-6.99476530883557,-7.0008671717514614,-7.006958416563022,-7.013039089342539,-7.019109235843269,-7.025168901502477,-7.0312181314444295,-7.037256970483344,-7.043285463126316,-7.049303653576207,-7.055311585734492,-7.061309303204082,-7.0672968492921076,-7.0732742670126685,-7.079241599089555,-7.0851988879589385,-7.091146175772018,-7.097083504397655,-7.103010915424962,-7.108928450165864,-7.114836149657641,-7.120734054665423,-7.126622205684668,-7.132500642943613,-7.1383694064056895,-7.144228535771912,-7.150078070483247,-7.1559180497229455,-7.1617485124188525,-7.167569497245693,-7.1733810426273275,-7.179183186738987,-7.184975967509474,-7.19075942262335,-7.196533589523093,-7.202298505411226,-7.208054207252428,-7.213800731775623,-7.219538115476041,-7.225266394617255,-7.2309856052332,-7.23669578313017,-7.242396963888785,-7.248089182865951,-7.2537724751967785,-7.2594468757965,-7.265112419362354,-7.270769140375452,-7.2764170731026265,-7.282056251598255,-7.287686709706072,-7.293308481060949,-7.298921599090672,-7.304526097017682,-7.310122007860811,-7.31570936443699,-7.3212881993629475,-7.326858545056879,-7.332420433740111,-7.3379738974387365,-7.343518967985238,-7.3490556770200985,-7.354584055993382,-7.360104136166314,-7.365615948612832,-7.371119524221123,-7.376614893695155,-7.382102087556175,-7.387581136144208,-7.393052069619528,-7.398514917964123,-7.403969710983137,-7.409416478306307,-7.414855249389372,-7.42028605351548,-7.425708919796574,-7.431123877174763,-7.43653095442369,-7.441930180149861,-7.447321582793997,-7.452705190632334,-7.458081031777943,-7.463449134182009,-7.468809525635122,-7.474162233768533,-7.479507286055415,-7.484844709812095,-7.490174532199296,-7.495496780223338,-7.5008114807373545,-7.5061186604424766,-7.511418345889019,-7.516710563477645,-7.521995339460528,-7.527272699942491,-7.53254267088215,-7.537805278093029,-7.543060547244679,-7.548308503863776,-7.553549173335216,-7.55878258090319,-7.564008751672262,-7.569227710608419,-7.574439482540128,-7.579644092159374,-7.584841564022689,-7.590031922552167,-7.595215192036483,-7.600391396631885,-7.605560560363191,-7.610722707124764,-7.615877860681489,-7.621026044669735,-7.626167282598306,-7.631301597849388,-7.636429013679485,-7.641549553220344,-7.646663239479874,-7.6517700953430605,-7.656870143572858,-7.661963406811091,-7.667049907579331,-7.672129668279782,-7.6772027111961405,-7.682269058494461,-7.687328732224002,-7.692381754318081,-7.697428146594902,-7.702467930758385,-7.707501128398995,-7.712527760994547,-7.717547849911018,-7.7225614164033445,-7.727568481616215,-7.732569066584854,-7.7375631922358,-7.742550879387675,-7.7475321487519535,-7.752507020933711,-7.757475516432379,-7.762437655642491,-7.767393458854412,-7.772342946255073,-7.777286137928696,-7.78222305385751,-7.787153713922457,-7.792078137903906,-7.796996345482341,-7.801908356239063,-7.806814189656868,-7.811713865120731,-7.816607401918478,-7.82149481924146,-7.826376136185206,-7.831251371750086,-7.836120544841962,-7.840983674272829,-7.845840778761458,-7.85069187693403,-7.855536987324761,-7.860376128376531,-7.865209318441496,-7.870036575781707,-7.874857918569708,-7.879673364889146,-7.884482932735366,-7.889286640016,-7.894084504551559,-7.898876544076008,-7.903662776237348,-7.908443218598186,-7.913217888636304,-7.917986803745216,-7.922749981234735,-7.9275074383315145,-7.932259192179605,-7.937005259840998],"x":[-50.0,-50.896414342629484,-51.79282868525896,-52.689243027888445,-53.58565737051793,-54.48207171314741,-55.37848605577689,-56.27490039840637,-57.17131474103586,-58.06772908366534,-58.96414342629482,-59.8605577689243,-60.756972111553786,-61.65338645418327,-62.54980079681275,-63.44621513944223,-64.34262948207171,-65.2390438247012,-66.13545816733068,-67.03187250996017,-67.92828685258964,-68.82470119521912,-69.7211155378486,-70.61752988047809,-71.51394422310757,-72.41035856573706,-73.30677290836654,-74.20318725099601,-75.0996015936255,-75.99601593625498,-76.89243027888446,-77.78884462151395,-78.68525896414343,-79.58167330677291,-80.4780876494024,-81.37450199203187,-82.27091633466135,-83.16733067729083,-84.06374501992032,-84.9601593625498,-85.85657370517929,-86.75298804780877,-87.64940239043824,-88.54581673306772,-89.44223107569721,-90.33864541832669,-91.23505976095618,-92.13147410358566,-93.02788844621514,-93.92430278884463,-94.8207171314741,-95.71713147410358,-96.61354581673307,-97.50996015936255,-98.40637450199203,-99.30278884462152,-100.199203187251,-101.09561752988049,-101.99203187250995,-102.88844621513944,-103.78486055776892,-104.6812749003984,-105.57768924302789,-106.47410358565737,-107.37051792828686,-108.26693227091633,-109.16334661354581,-110.0597609561753,-110.95617529880478,-111.85258964143426,-112.74900398406375,-113.64541832669323,-114.54183266932272,-115.43824701195219,-116.33466135458167,-117.23107569721115,-118.12749003984064,-119.02390438247012,-119.9203187250996,-120.81673306772909,-121.71314741035856,-122.60956175298804,-123.50597609561753,-124.40239043824701,-125.2988047808765,-126.19521912350598,-127.09163346613546,-127.98804780876495,-128.88446215139442,-129.78087649402391,-130.67729083665338,-131.57370517928288,-132.47011952191235,-133.36653386454182,-134.26294820717132,-135.1593625498008,-136.0557768924303,-136.95219123505976,-137.84860557768926,-138.74501992031873,-139.6414342629482,-140.5378486055777,-141.43426294820716,-142.33067729083666,-143.22709163346613,-144.12350597609563,-145.0199203187251,-145.91633466135457,-146.81274900398407,-147.70916334661354,-148.60557768924303,-149.5019920318725,-150.398406374502,-151.29482071713147,-152.19123505976097,-153.08764940239044,-153.9840637450199,-154.8804780876494,-155.77689243027888,-156.67330677290838,-157.56972111553785,-158.46613545816734,-159.3625498007968,-160.25896414342628,-161.15537848605578,-162.05179282868525,-162.94820717131475,-163.84462151394422,-164.74103585657372,-165.6374501992032,-166.53386454183266,-167.43027888446215,-168.32669322709162,-169.22310756972112,-170.1195219123506,-171.0159362549801,-171.91235059760956,-172.80876494023903,-173.70517928286853,-174.601593625498,-175.4980079681275,-176.39442231075697,-177.29083665338646,-178.18725099601593,-179.08366533864543,-179.9800796812749,-180.87649402390437,-181.77290836653387,-182.66932270916334,-183.56573705179284,-184.4621513944223,-185.3585657370518,-186.25498007968127,-187.15139442231074,-188.04780876494024,-188.9442231075697,-189.8406374501992,-190.73705179282868,-191.63346613545818,-192.52988047808765,-193.42629482071712,-194.32270916334662,-195.21912350597609,-196.11553784860558,-197.01195219123505,-197.90836653386455,-198.80478087649402,-199.70119521912352,-200.597609561753,-201.49402390438246,-202.39043824701196,-203.28685258964143,-204.18326693227093,-205.0796812749004,-205.9760956175299,-206.87250996015936,-207.76892430278883,-208.66533864541833,-209.5617529880478,-210.4581673306773,-211.35458167330677,-212.25099601593627,-213.14741035856574,-214.0438247011952,-214.9402390438247,-215.83665338645417,-216.73306772908367,-217.62948207171314,-218.52589641434264,-219.4223107569721,-220.3187250996016,-221.21513944223108,-222.11155378486055,-223.00796812749005,-223.90438247011951,-224.800796812749,-225.69721115537848,-226.59362549800798,-227.49003984063745,-228.38645418326692,-229.28286852589642,-230.1792828685259,-231.0756972111554,-231.97211155378486,-232.86852589641435,-233.76494023904382,-234.6613545816733,-235.5577689243028,-236.45418326693226,-237.35059760956176,-238.24701195219123,-239.14342629482073,-240.0398406374502,-240.93625498007967,-241.83266932270917,-242.72908366533864,-243.62549800796813,-244.5219123505976,-245.4183266932271,-246.31474103585657,-247.21115537848607,-248.10756972111554,-249.003984063745,-249.9003984063745,-250.79681274900398,-251.69322709163347,-252.58964143426294,-253.48605577689244,-254.3824701195219,-255.27888446215138,-256.1752988047809,-257.0717131474104,-257.9681274900398,-258.8645418326693,-259.7609561752988,-260.6573705179283,-261.55378486055776,-262.45019920318725,-263.34661354581675,-264.2430278884462,-265.1394422310757,-266.0358565737052,-266.9322709163347,-267.82868525896413,-268.7250996015936,-269.6215139442231,-270.51792828685257,-271.41434262948206,-272.31075697211156,-273.20717131474106,-274.1035856573705,-275.0,-275.8964143426295,-276.79282868525894,-277.68924302788844,-278.58565737051794,-279.48207171314743,-280.3784860557769,-281.2749003984064,-282.17131474103587,-283.0677290836653,-283.9641434262948,-284.8605577689243,-285.7569721115538,-286.65338645418325,-287.54980079681275,-288.44621513944224,-289.3426294820717,-290.2390438247012,-291.1354581673307,-292.0318725099602,-292.9282868525896,-293.8247011952191,-294.7211155378486,-295.61752988047806,-296.51394422310756,-297.41035856573706,-298.30677290836655,-299.203187250996,-300.0996015936255,-300.996015936255,-301.8924302788845,-302.78884462151393,-303.68525896414343,-304.5816733067729,-305.47808764940237,-306.37450199203187,-307.27091633466136,-308.16733067729086,-309.0637450199203,-309.9601593625498,-310.8565737051793,-311.75298804780874,-312.64940239043824,-313.54581673306774,-314.44223107569724,-315.3386454183267,-316.2350597609562,-317.1314741035857,-318.0278884462151,-318.9243027888446,-319.8207171314741,-320.7171314741036,-321.61354581673305,-322.50996015936255,-323.40637450199205,-324.3027888446215,-325.199203187251,-326.0956175298805,-326.99203187251,-327.8884462151394,-328.7848605577689,-329.6812749003984,-330.57768924302786,-331.47410358565736,-332.37051792828686,-333.26693227091636,-334.1633466135458,-335.0597609561753,-335.9561752988048,-336.85258964143424,-337.74900398406373,-338.64541832669323,-339.54183266932273,-340.43824701195217,-341.33466135458167,-342.23107569721117,-343.12749003984067,-344.0239043824701,-344.9203187250996,-345.8167330677291,-346.71314741035854,-347.60956175298804,-348.50597609561754,-349.40239043824704,-350.2988047808765,-351.195219123506,-352.0916334661355,-352.9880478087649,-353.8844621513944,-354.7808764940239,-355.6772908366534,-356.57370517928285,-357.47011952191235,-358.36653386454185,-359.2629482071713,-360.1593625498008,-361.0557768924303,-361.9521912350598,-362.8486055776892,-363.7450199203187,-364.6414342629482,-365.53784860557766,-366.43426294820716,-367.33067729083666,-368.22709163346616,-369.1235059760956,-370.0199203187251,-370.9163346613546,-371.81274900398404,-372.70916334661354,-373.60557768924303,-374.50199203187253,-375.398406374502,-376.2948207171315,-377.19123505976097,-378.0876494023904,-378.9840637450199,-379.8804780876494,-380.7768924302789,-381.67330677290835,-382.56972111553785,-383.46613545816734,-384.3625498007968,-385.2589641434263,-386.1553784860558,-387.0517928286853,-387.9482071713147,-388.8446215139442,-389.7410358565737,-390.6374501992032,-391.53386454183266,-392.43027888446215,-393.32669322709165,-394.2231075697211,-395.1195219123506,-396.0159362549801,-396.9123505976096,-397.80876494023903,-398.7051792828685,-399.601593625498,-400.49800796812747,-401.39442231075697,-402.29083665338646,-403.18725099601596,-404.0836653386454,-404.9800796812749,-405.8764940239044,-406.77290836653384,-407.66932270916334,-408.56573705179284,-409.46215139442234,-410.3585657370518,-411.2549800796813,-412.1513944223108,-413.0478087649402,-413.9442231075697,-414.8406374501992,-415.7370517928287,-416.63346613545815,-417.52988047808765,-418.42629482071715,-419.3227091633466,-420.2191235059761,-421.1155378486056,-422.0119521912351,-422.9083665338645,-423.804780876494,-424.7011952191235,-425.59760956175296,-426.49402390438246,-427.39043824701196,-428.28685258964146,-429.1832669322709,-430.0796812749004,-430.9760956175299,-431.87250996015933,-432.76892430278883,-433.66533864541833,-434.56175298804783,-435.45816733067727,-436.35458167330677,-437.25099601593627,-438.14741035856576,-439.0438247011952,-439.9402390438247,-440.8366533864542,-441.73306772908364,-442.62948207171314,-443.52589641434264,-444.42231075697214,-445.3187250996016,-446.2151394422311,-447.1115537848606,-448.00796812749,-448.9043824701195,-449.800796812749,-450.6972111553785,-451.59362549800795,-452.49003984063745,-453.38645418326695,-454.2828685258964,-455.1792828685259,-456.0756972111554,-456.9721115537849,-457.8685258964143,-458.7649402390438,-459.6613545816733,-460.55776892430276,-461.45418326693226,-462.35059760956176,-463.24701195219126,-464.1434262948207,-465.0398406374502,-465.9362549800797,-466.83266932270914,-467.72908366533864,-468.62549800796813,-469.52191235059763,-470.4183266932271,-471.31474103585657,-472.21115537848607,-473.1075697211155,-474.003984063745,-474.9003984063745,-475.796812749004,-476.69322709163345,-477.58964143426294,-478.48605577689244,-479.38247011952194,-480.2788844621514,-481.1752988047809,-482.0717131474104,-482.9681274900398,-483.8645418326693,-484.7609561752988,-485.6573705179283,-486.55378486055776,-487.45019920318725,-488.34661354581675,-489.2430278884462,-490.1394422310757,-491.0358565737052,-491.9322709163347,-492.82868525896413,-493.7250996015936,-494.6215139442231,-495.51792828685257,-496.41434262948206,-497.31075697211156,-498.20717131474106,-499.1035856573705,-500.0]}
},{}],93:[function(require,module,exports){
module.exports={"expected":[3.684031498640387,3.7059173476721448,3.727547705274732,3.7489298997706832,3.7700709288420633,3.7909774797019096,3.8116559477250416,3.8321124536788256,3.8523528596796175,3.872382783987553,3.8922076147407934,3.911832522720152,3.931262473225983,3.9505022371412095,3.969556401247221,3.9884293778530537,4.007125413792563,4.025648598839281,4.044002873584082,4.062192036816754,4.080219752448888,4.098089556012259,4.1158048607638875,4.133368963426319,4.1507850495892615,4.168056198796528,4.18518538934028,4.202175502782767,4.219029328224157,4.235749566333543,4.252338833158916,4.26879966373065,4.2851345154719125,4.3013457714284495,4.317435743329196,4.333406674488394,4.349260742559034,4.365000062146798,4.380626687292983,4.3961426138342885,4.411549781646822,4.426850076781129,4.442045333494626,4.457137336187347,4.472127821246547,4.487018478805302,4.5018109544199545,4.516506850670874,4.5311077286907775,4.545615109624536,4.560030476024165,4.574355273182465,4.588590910408546,4.602738762248301,4.616800169652669,4.630776441096384,4.6446688536497405,4.658478654005732,4.672207059464825,4.685855258879446,4.69942441356018,4.712915658145552,4.726330101437135,4.739668827201677,4.752932894941782,4.766123340636666,4.779241177454345,4.792287396436634,4.805262967158147,4.818168838360548,4.831005938563116,4.843775176650738,4.856477442440298,4.869113607226441,4.88168452430761,4.8941910294932125,4.9066339415927365,4.919014062887583,4.931332179586368,4.943589062264368,4.955785466287796,4.967922132223522,4.979999786234857,4.992019140463958,5.003980893401402,5.0158857302434585,5.027734323237537,5.039527332016296,5.051265403920856,5.0629491743135455,5.074579266880585,5.086156293925113,5.097680856650901,5.109153545437151,5.120574940104665,5.1319456101737675,5.1432661151142405,5.154537004587602,5.165758818681998,5.17693208813998,5.188057334579428,5.199135070707876,5.210165800530462,5.2211500195517475,5.2320882149716095,5.242980865875438,5.2538284434188025,5.264631411006825,5.275390224468401,5.28610533222548,5.296777175457559,5.307406188261545,5.317992797807169,5.328537424488069,5.339040482068719,5.349502377827315,5.359923512694775,5.370304281389956,5.38064507255124,5.390946268864587,5.4012082471881735,5.41143137867373,5.421616028884682,5.431762557911195,5.441871320482224,5.451942666074652,5.461976939019629,5.471974478606173,5.481935619182143,5.491860690252638,5.501750016575932,5.51160391825699,5.521422710838654,5.531206705390579,5.5409562085959525,5.550671522836108,5.5603529462730545,5.570000772930013,5.579615292769998,5.589196791772517,5.598745552008435,5.608261851713045,5.617745965357431,5.627198163718127,5.636618713945162,5.646007879628503,5.655365920862966,5.6646930943116285,5.673989653267774,5.683255847715436,5.69249192438855,5.70169812682878,5.710874695442026,5.7200218675536805,5.729139877462639,5.738228956494122,5.747289333051316,5.7563212326658935,5.765324878047415,5.77430048913166,5.7832482831279055,5.792168474565189,5.801061275337572,5.809926894748441,5.8187655395538505,5.827577414004973,5.8363627198896255,5.845121656572941,5.8538544210371795,5.862561207920723,5.871242209556244,5.879897616008102,5.888527615108962,5.897132392495669,5.90571213164439,5.914267013905043,5.922797218535029,5.931302922732293,5.939784301667712,5.948241528516847,5.956674774491059,5.965084208868018,5.973469999021597,5.9818323104511935,5.990171306810476,5.998487149935564,6.006779999872676,6.015050014905229,6.023297351580432,6.03152216473536,6.039724607522544,6.047904831435056,6.056062986331146,6.064199220458393,6.072313680477417,6.08040651148514,6.088477857037625,6.096527859172481,6.1045566584308615,6.112564393879061,6.120551203129708,6.128517222362578,6.136462586345031,6.144387428452074,6.152291880686061,6.160176073696049,6.168040136796797,6.175884197987434,6.183708383969794,6.191512820166422,6.199297630738274,6.207062938602096,6.214808865447506,6.222535531753772,6.2302430568063105,6.237931558712884,6.245601154419536,6.2532519597262395,6.260884089302289,6.26849765670142,6.276092774376681,6.2836695536950495,6.2912281049517995,6.298768537384637,6.306290959187589,6.313795477524665,6.3212821985432965,6.328751227387545,6.3362026682111,6.343636624190058,6.3510531975354985,6.358452489505849,6.36583460041905,6.373199629664526,6.380547675714965,6.3878788361378955,6.3951932076070985,6.402490885913817,6.409771965977805,6.417036541858182,6.424284706764134,6.431516553065439,6.438732172302817,6.445931655198138,6.453115091664454,6.46028257081588,6.467434180977327,6.474570009694079,6.481690143741223,6.488794669132933,6.495883671131621,6.502957234256935,6.510015442294633,6.517058378305309,6.524086124633007,6.531098762913676,6.538096374083535,6.545079038387277,6.552046835386177,6.558999843966067,6.565938142345192,6.57286180808196,6.579770918082567,6.586665548608518,6.593545775284027,6.600411673103329,6.607263316437864,6.614100779043368,6.620924134066866,6.627733454053549,6.634528810953569,6.641310276128727,6.648077920359068,6.654831813849381,6.661572026235611,6.668298626591174,6.675011683433189,6.681711264728617,6.688397437900321,6.6950702698330335,6.701729826879246,6.708376174865015,6.7150093790956875,6.72162950436155,6.728236614943394,6.734830774618012,6.741412046663616,6.747980493865174,6.7545361785196905,6.7610791624414,6.7676095069669,6.7741272729602064,6.78063252081775,6.787125310473298,6.793605701402819,6.800073752629268,6.8065295227273275,6.812973069828071,6.819404451623565,6.825823725371424,6.832230947899288,6.838626175609257,6.845009464482252,6.851380870082335,6.857740447560962,6.864088251661184,6.870424336721793,6.87674875668142,6.88306156508257,6.889362815075613,6.895652559422726,6.901930850501776,6.908197740310158,6.914453280468591,6.920697522224853,6.926930516457478,6.9331523136794075,6.939362964041585,6.945562517336525,6.951751023001816,6.957928530123592,6.964095087439963,6.970250743344396,6.976395545889054,6.982529542788106,6.988652781420975,6.99476530883557,7.0008671717514614,7.006958416563022,7.013039089342539,7.019109235843269,7.025168901502477,7.0312181314444295,7.037256970483344,7.043285463126316,7.049303653576207,7.055311585734492,7.061309303204082,7.0672968492921076,7.0732742670126685,7.079241599089555,7.0851988879589385,7.091146175772018,7.097083504397655,7.103010915424962,7.108928450165864,7.114836149657641,7.120734054665423,7.126622205684668,7.132500642943613,7.1383694064056895,7.144228535771912,7.150078070483247,7.1559180497229455,7.1617485124188525,7.167569497245693,7.1733810426273275,7.179183186738987,7.184975967509474,7.19075942262335,7.196533589523093,7.202298505411226,7.208054207252428,7.213800731775623,7.219538115476041,7.225266394617255,7.2309856052332,7.23669578313017,7.242396963888785,7.248089182865951,7.2537724751967785,7.2594468757965,7.265112419362354,7.270769140375452,7.2764170731026265,7.282056251598255,7.287686709706072,7.293308481060949,7.298921599090672,7.304526097017682,7.310122007860811,7.31570936443699,7.3212881993629475,7.326858545056879,7.332420433740111,7.3379738974387365,7.343518967985238,7.3490556770200985,7.354584055993382,7.360104136166314,7.365615948612832,7.371119524221123,7.376614893695155,7.382102087556175,7.387581136144208,7.393052069619528,7.398514917964123,7.403969710983137,7.409416478306307,7.414855249389372,7.42028605351548,7.425708919796574,7.431123877174763,7.43653095442369,7.441930180149861,7.447321582793997,7.452705190632334,7.458081031777943,7.463449134182009,7.468809525635122,7.474162233768533,7.479507286055415,7.484844709812095,7.490174532199296,7.495496780223338,7.5008114807373545,7.5061186604424766,7.511418345889019,7.516710563477645,7.521995339460528,7.527272699942491,7.53254267088215,7.537805278093029,7.543060547244679,7.548308503863776,7.553549173335216,7.55878258090319,7.564008751672262,7.569227710608419,7.574439482540128,7.579644092159374,7.584841564022689,7.590031922552167,7.595215192036483,7.600391396631885,7.605560560363191,7.610722707124764,7.615877860681489,7.621026044669735,7.626167282598306,7.631301597849388,7.636429013679485,7.641549553220344,7.646663239479874,7.6517700953430605,7.656870143572858,7.661963406811091,7.667049907579331,7.672129668279782,7.6772027111961405,7.682269058494461,7.687328732224002,7.692381754318081,7.697428146594902,7.702467930758385,7.707501128398995,7.712527760994547,7.717547849911018,7.7225614164033445,7.727568481616215,7.732569066584854,7.7375631922358,7.742550879387675,7.7475321487519535,7.752507020933711,7.757475516432379,7.762437655642491,7.767393458854412,7.772342946255073,7.777286137928696,7.78222305385751,7.787153713922457,7.792078137903906,7.796996345482341,7.801908356239063,7.806814189656868,7.811713865120731,7.816607401918478,7.82149481924146,7.826376136185206,7.831251371750086,7.836120544841962,7.840983674272829,7.845840778761458,7.85069187693403,7.855536987324761,7.860376128376531,7.865209318441496,7.870036575781707,7.874857918569708,7.879673364889146,7.884482932735366,7.889286640016,7.894084504551559,7.898876544076008,7.903662776237348,7.908443218598186,7.913217888636304,7.917986803745216,7.922749981234735,7.9275074383315145,7.932259192179605,7.937005259840998],"x":[50.0,50.896414342629484,51.79282868525896,52.689243027888445,53.58565737051793,54.48207171314741,55.37848605577689,56.27490039840637,57.17131474103586,58.06772908366534,58.96414342629482,59.8605577689243,60.756972111553786,61.65338645418327,62.54980079681275,63.44621513944223,64.34262948207171,65.2390438247012,66.13545816733068,67.03187250996017,67.92828685258964,68.82470119521912,69.7211155378486,70.61752988047809,71.51394422310757,72.41035856573706,73.30677290836654,74.20318725099601,75.0996015936255,75.99601593625498,76.89243027888446,77.78884462151395,78.68525896414343,79.58167330677291,80.4780876494024,81.37450199203187,82.27091633466135,83.16733067729083,84.06374501992032,84.9601593625498,85.85657370517929,86.75298804780877,87.64940239043824,88.54581673306772,89.44223107569721,90.33864541832669,91.23505976095618,92.13147410358566,93.02788844621514,93.92430278884463,94.8207171314741,95.71713147410358,96.61354581673307,97.50996015936255,98.40637450199203,99.30278884462152,100.199203187251,101.09561752988049,101.99203187250995,102.88844621513944,103.78486055776892,104.6812749003984,105.57768924302789,106.47410358565737,107.37051792828686,108.26693227091633,109.16334661354581,110.0597609561753,110.95617529880478,111.85258964143426,112.74900398406375,113.64541832669323,114.54183266932272,115.43824701195219,116.33466135458167,117.23107569721115,118.12749003984064,119.02390438247012,119.9203187250996,120.81673306772909,121.71314741035856,122.60956175298804,123.50597609561753,124.40239043824701,125.2988047808765,126.19521912350598,127.09163346613546,127.98804780876495,128.88446215139442,129.78087649402391,130.67729083665338,131.57370517928288,132.47011952191235,133.36653386454182,134.26294820717132,135.1593625498008,136.0557768924303,136.95219123505976,137.84860557768926,138.74501992031873,139.6414342629482,140.5378486055777,141.43426294820716,142.33067729083666,143.22709163346613,144.12350597609563,145.0199203187251,145.91633466135457,146.81274900398407,147.70916334661354,148.60557768924303,149.5019920318725,150.398406374502,151.29482071713147,152.19123505976097,153.08764940239044,153.9840637450199,154.8804780876494,155.77689243027888,156.67330677290838,157.56972111553785,158.46613545816734,159.3625498007968,160.25896414342628,161.15537848605578,162.05179282868525,162.94820717131475,163.84462151394422,164.74103585657372,165.6374501992032,166.53386454183266,167.43027888446215,168.32669322709162,169.22310756972112,170.1195219123506,171.0159362549801,171.91235059760956,172.80876494023903,173.70517928286853,174.601593625498,175.4980079681275,176.39442231075697,177.29083665338646,178.18725099601593,179.08366533864543,179.9800796812749,180.87649402390437,181.77290836653387,182.66932270916334,183.56573705179284,184.4621513944223,185.3585657370518,186.25498007968127,187.15139442231074,188.04780876494024,188.9442231075697,189.8406374501992,190.73705179282868,191.63346613545818,192.52988047808765,193.42629482071712,194.32270916334662,195.21912350597609,196.11553784860558,197.01195219123505,197.90836653386455,198.80478087649402,199.70119521912352,200.597609561753,201.49402390438246,202.39043824701196,203.28685258964143,204.18326693227093,205.0796812749004,205.9760956175299,206.87250996015936,207.76892430278883,208.66533864541833,209.5617529880478,210.4581673306773,211.35458167330677,212.25099601593627,213.14741035856574,214.0438247011952,214.9402390438247,215.83665338645417,216.73306772908367,217.62948207171314,218.52589641434264,219.4223107569721,220.3187250996016,221.21513944223108,222.11155378486055,223.00796812749005,223.90438247011951,224.800796812749,225.69721115537848,226.59362549800798,227.49003984063745,228.38645418326692,229.28286852589642,230.1792828685259,231.0756972111554,231.97211155378486,232.86852589641435,233.76494023904382,234.6613545816733,235.5577689243028,236.45418326693226,237.35059760956176,238.24701195219123,239.14342629482073,240.0398406374502,240.93625498007967,241.83266932270917,242.72908366533864,243.62549800796813,244.5219123505976,245.4183266932271,246.31474103585657,247.21115537848607,248.10756972111554,249.003984063745,249.9003984063745,250.79681274900398,251.69322709163347,252.58964143426294,253.48605577689244,254.3824701195219,255.27888446215138,256.1752988047809,257.0717131474104,257.9681274900398,258.8645418326693,259.7609561752988,260.6573705179283,261.55378486055776,262.45019920318725,263.34661354581675,264.2430278884462,265.1394422310757,266.0358565737052,266.9322709163347,267.82868525896413,268.7250996015936,269.6215139442231,270.51792828685257,271.41434262948206,272.31075697211156,273.20717131474106,274.1035856573705,275.0,275.8964143426295,276.79282868525894,277.68924302788844,278.58565737051794,279.48207171314743,280.3784860557769,281.2749003984064,282.17131474103587,283.0677290836653,283.9641434262948,284.8605577689243,285.7569721115538,286.65338645418325,287.54980079681275,288.44621513944224,289.3426294820717,290.2390438247012,291.1354581673307,292.0318725099602,292.9282868525896,293.8247011952191,294.7211155378486,295.61752988047806,296.51394422310756,297.41035856573706,298.30677290836655,299.203187250996,300.0996015936255,300.996015936255,301.8924302788845,302.78884462151393,303.68525896414343,304.5816733067729,305.47808764940237,306.37450199203187,307.27091633466136,308.16733067729086,309.0637450199203,309.9601593625498,310.8565737051793,311.75298804780874,312.64940239043824,313.54581673306774,314.44223107569724,315.3386454183267,316.2350597609562,317.1314741035857,318.0278884462151,318.9243027888446,319.8207171314741,320.7171314741036,321.61354581673305,322.50996015936255,323.40637450199205,324.3027888446215,325.199203187251,326.0956175298805,326.99203187251,327.8884462151394,328.7848605577689,329.6812749003984,330.57768924302786,331.47410358565736,332.37051792828686,333.26693227091636,334.1633466135458,335.0597609561753,335.9561752988048,336.85258964143424,337.74900398406373,338.64541832669323,339.54183266932273,340.43824701195217,341.33466135458167,342.23107569721117,343.12749003984067,344.0239043824701,344.9203187250996,345.8167330677291,346.71314741035854,347.60956175298804,348.50597609561754,349.40239043824704,350.2988047808765,351.195219123506,352.0916334661355,352.9880478087649,353.8844621513944,354.7808764940239,355.6772908366534,356.57370517928285,357.47011952191235,358.36653386454185,359.2629482071713,360.1593625498008,361.0557768924303,361.9521912350598,362.8486055776892,363.7450199203187,364.6414342629482,365.53784860557766,366.43426294820716,367.33067729083666,368.22709163346616,369.1235059760956,370.0199203187251,370.9163346613546,371.81274900398404,372.70916334661354,373.60557768924303,374.50199203187253,375.398406374502,376.2948207171315,377.19123505976097,378.0876494023904,378.9840637450199,379.8804780876494,380.7768924302789,381.67330677290835,382.56972111553785,383.46613545816734,384.3625498007968,385.2589641434263,386.1553784860558,387.0517928286853,387.9482071713147,388.8446215139442,389.7410358565737,390.6374501992032,391.53386454183266,392.43027888446215,393.32669322709165,394.2231075697211,395.1195219123506,396.0159362549801,396.9123505976096,397.80876494023903,398.7051792828685,399.601593625498,400.49800796812747,401.39442231075697,402.29083665338646,403.18725099601596,404.0836653386454,404.9800796812749,405.8764940239044,406.77290836653384,407.66932270916334,408.56573705179284,409.46215139442234,410.3585657370518,411.2549800796813,412.1513944223108,413.0478087649402,413.9442231075697,414.8406374501992,415.7370517928287,416.63346613545815,417.52988047808765,418.42629482071715,419.3227091633466,420.2191235059761,421.1155378486056,422.0119521912351,422.9083665338645,423.804780876494,424.7011952191235,425.59760956175296,426.49402390438246,427.39043824701196,428.28685258964146,429.1832669322709,430.0796812749004,430.9760956175299,431.87250996015933,432.76892430278883,433.66533864541833,434.56175298804783,435.45816733067727,436.35458167330677,437.25099601593627,438.14741035856576,439.0438247011952,439.9402390438247,440.8366533864542,441.73306772908364,442.62948207171314,443.52589641434264,444.42231075697214,445.3187250996016,446.2151394422311,447.1115537848606,448.00796812749,448.9043824701195,449.800796812749,450.6972111553785,451.59362549800795,452.49003984063745,453.38645418326695,454.2828685258964,455.1792828685259,456.0756972111554,456.9721115537849,457.8685258964143,458.7649402390438,459.6613545816733,460.55776892430276,461.45418326693226,462.35059760956176,463.24701195219126,464.1434262948207,465.0398406374502,465.9362549800797,466.83266932270914,467.72908366533864,468.62549800796813,469.52191235059763,470.4183266932271,471.31474103585657,472.21115537848607,473.1075697211155,474.003984063745,474.9003984063745,475.796812749004,476.69322709163345,477.58964143426294,478.48605577689244,479.38247011952194,480.2788844621514,481.1752988047809,482.0717131474104,482.9681274900398,483.8645418326693,484.7609561752988,485.6573705179283,486.55378486055776,487.45019920318725,488.34661354581675,489.2430278884462,490.1394422310757,491.0358565737052,491.9322709163347,492.82868525896413,493.7250996015936,494.6215139442231,495.51792828685257,496.41434262948206,497.31075697211156,498.20717131474106,499.1035856573705,500.0]}
},{}],94:[function(require,module,exports){
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
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var cbrt = require( './../lib' );


// FIXTURES //

var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var veryLargeNegative = require( './fixtures/julia/very_large_negative.json' );
var veryLargePositive = require( './fixtures/julia/very_large_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var subnormal = require( './fixtures/julia/subnormal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cbrt, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-50,-500]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargeNegative.expected;
	x = veryLargeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[50,500]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargePositive.expected;
	x = veryLargePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-50]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeNegative.expected;
	x = largeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[20,50]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largePositive.expected;
	x = largePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumNegative.expected;
	x = mediumNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[3,20]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-3,-0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallNegative.expected;
	x = smallNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[0.8,3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallPositive.expected;
	x = smallPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates cubic root of `x` on the interval `[-0.8,0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smaller.expected;
	x = smaller.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-1e-300,-1e-308]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyNegative.expected;
	x = tinyNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[1e-300,1e-308]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyPositive.expected;
	x = tinyPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of subnormal `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = subnormal.expected;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugeNegative.expected;
	x = hugeNegative.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugePositive.expected;
	x = hugePositive.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = cbrt( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-infinity`', function test( t ) {
	var v = cbrt( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	var v = cbrt( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', function test( t ) {
	var v = cbrt( +0.0 );
	t.equal( isPositiveZero( v ), true, 'returns 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = cbrt( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cbrt/test/test.js")
},{"./../lib":77,"./fixtures/julia/huge_negative.json":80,"./fixtures/julia/huge_positive.json":81,"./fixtures/julia/large_negative.json":82,"./fixtures/julia/large_positive.json":83,"./fixtures/julia/medium_negative.json":84,"./fixtures/julia/medium_positive.json":85,"./fixtures/julia/small_negative.json":86,"./fixtures/julia/small_positive.json":87,"./fixtures/julia/smaller.json":88,"./fixtures/julia/subnormal.json":89,"./fixtures/julia/tiny_negative.json":90,"./fixtures/julia/tiny_positive.json":91,"./fixtures/julia/very_large_negative.json":92,"./fixtures/julia/very_large_positive.json":93,"@stdlib/constants/float64/eps":60,"@stdlib/constants/float64/ninf":61,"@stdlib/constants/float64/pinf":62,"@stdlib/math/base/assert/is-nan":69,"@stdlib/math/base/assert/is-negative-zero":71,"@stdlib/math/base/assert/is-positive-zero":73,"@stdlib/math/base/special/abs":75,"tape":267}],95:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var tryRequire = require( '@stdlib/utils/try-require' );


// FIXTURES //

var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var veryLargeNegative = require( './fixtures/julia/very_large_negative.json' );
var veryLargePositive = require( './fixtures/julia/very_large_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var subnormal = require( './fixtures/julia/subnormal.json' );


// VARIABLES //

var cbrt = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( cbrt instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cbrt, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-50,-500]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargeNegative.expected;
	x = veryLargeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[50,500]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargePositive.expected;
	x = veryLargePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-50]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeNegative.expected;
	x = largeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[20,50]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largePositive.expected;
	x = largePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-3]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumNegative.expected;
	x = mediumNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[3,20]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-3,-0.8]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallNegative.expected;
	x = smallNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[0.8,3]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallPositive.expected;
	x = smallPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates cubic root of `x` on the interval `[-0.8,0.8]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smaller.expected;
	x = smaller.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-1e-300,-1e-308]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyNegative.expected;
	x = tinyNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[1e-300,1e-308]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyPositive.expected;
	x = tinyPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of subnormal `x`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = subnormal.expected;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge negative)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugeNegative.expected;
	x = hugeNegative.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge positive)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugePositive.expected;
	x = hugePositive.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrt( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var v = cbrt( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-infinity`', opts, function test( t ) {
	var v = cbrt( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', opts, function test( t ) {
	var v = cbrt( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', opts, function test( t ) {
	var v = cbrt( +0.0 );
	t.equal( isPositiveZero( v ), true, 'returns 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', opts, function test( t ) {
	var v = cbrt( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cbrt/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/cbrt/test")
},{"./fixtures/julia/huge_negative.json":80,"./fixtures/julia/huge_positive.json":81,"./fixtures/julia/large_negative.json":82,"./fixtures/julia/large_positive.json":83,"./fixtures/julia/medium_negative.json":84,"./fixtures/julia/medium_positive.json":85,"./fixtures/julia/small_negative.json":86,"./fixtures/julia/small_positive.json":87,"./fixtures/julia/smaller.json":88,"./fixtures/julia/subnormal.json":89,"./fixtures/julia/tiny_negative.json":90,"./fixtures/julia/tiny_positive.json":91,"./fixtures/julia/very_large_negative.json":92,"./fixtures/julia/very_large_positive.json":93,"@stdlib/constants/float64/eps":60,"@stdlib/constants/float64/ninf":61,"@stdlib/constants/float64/pinf":62,"@stdlib/math/base/assert/is-nan":69,"@stdlib/math/base/assert/is-negative-zero":71,"@stdlib/math/base/assert/is-positive-zero":73,"@stdlib/math/base/special/abs":75,"@stdlib/utils/try-require":153,"path":167,"tape":267}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":100}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":48}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":99,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":48}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":101,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],104:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":101}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":104,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":109}],108:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":99}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./to_words.js":110}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":108,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],111:[function(require,module,exports){
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

},{"./main.js":112,"./regexp.js":113,"@stdlib/utils/define-nonenumerable-read-only-property":129}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":112}],114:[function(require,module,exports){
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

},{"./is_number.js":117}],115:[function(require,module,exports){
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

},{"./is_number.js":117,"./zero_pad.js":121}],116:[function(require,module,exports){
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

},{"./main.js":119}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./format_double.js":114,"./format_integer.js":115,"./is_string.js":118,"./space_pad.js":120,"./zero_pad.js":121}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{"./main.js":123}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"./main.js":126}],125:[function(require,module,exports){
arguments[4][118][0].apply(exports,arguments)
},{"dup":118}],126:[function(require,module,exports){
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

},{"./is_string.js":125,"@stdlib/string/base/format-interpolate":116,"@stdlib/string/base/format-tokenize":122}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":128}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":111,"@stdlib/utils/native-class":148}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":130}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":134}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],132:[function(require,module,exports){
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

},{"./define_property.js":132}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":131,"./has_define_property_support.js":133,"./polyfill.js":135}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":124}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":139,"./polyfill.js":140,"@stdlib/assert/is-function":45}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./detect.js":136}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./get_prototype_of.js":137}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":141,"@stdlib/utils/native-class":148}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],143:[function(require,module,exports){
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

},{"./main.js":145}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./codegen.js":142,"./global.js":143,"./self.js":146,"./window.js":147,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":124}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

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

},{"./native_class.js":149,"./polyfill.js":150,"@stdlib/assert/has-tostringtag-support":20}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":151}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":151,"./tostringtag.js":152,"@stdlib/assert/has-own-property":16}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try_require.js":154}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-error":41}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":156,"./fixtures/re.js":157,"./fixtures/typedarray.js":158}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":144}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

'use strict';

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

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

},{"./check.js":155,"./polyfill.js":160,"./typeof.js":161}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":127}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":127}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){

},{}],164:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"dup":163}],165:[function(require,module,exports){
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
},{"base64-js":162,"buffer":165,"ieee754":253}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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
},{"_process":259}],168:[function(require,module,exports){
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

},{"events":166,"inherits":254,"readable-stream/lib/_stream_duplex.js":170,"readable-stream/lib/_stream_passthrough.js":171,"readable-stream/lib/_stream_readable.js":172,"readable-stream/lib/_stream_transform.js":173,"readable-stream/lib/_stream_writable.js":174,"readable-stream/lib/internal/streams/end-of-stream.js":178,"readable-stream/lib/internal/streams/pipeline.js":180}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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
},{"./_stream_readable":172,"./_stream_writable":174,"_process":259,"inherits":254}],171:[function(require,module,exports){
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
},{"./_stream_transform":173,"inherits":254}],172:[function(require,module,exports){
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
},{"../errors":169,"./_stream_duplex":170,"./internal/streams/async_iterator":175,"./internal/streams/buffer_list":176,"./internal/streams/destroy":177,"./internal/streams/from":179,"./internal/streams/state":181,"./internal/streams/stream":182,"_process":259,"buffer":165,"events":166,"inherits":254,"string_decoder/":266,"util":163}],173:[function(require,module,exports){
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
},{"../errors":169,"./_stream_duplex":170,"inherits":254}],174:[function(require,module,exports){
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
},{"../errors":169,"./_stream_duplex":170,"./internal/streams/destroy":177,"./internal/streams/state":181,"./internal/streams/stream":182,"_process":259,"buffer":165,"inherits":254,"util-deprecate":275}],175:[function(require,module,exports){
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
},{"./end-of-stream":178,"_process":259}],176:[function(require,module,exports){
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
},{"buffer":165,"util":163}],177:[function(require,module,exports){
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
},{"_process":259}],178:[function(require,module,exports){
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
},{"../../../errors":169}],179:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],180:[function(require,module,exports){
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
},{"../../../errors":169,"./end-of-stream":178}],181:[function(require,module,exports){
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
},{"../../../errors":169}],182:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":166}],183:[function(require,module,exports){
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

},{"./":184,"get-intrinsic":248}],184:[function(require,module,exports){
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

},{"function-bind":247,"get-intrinsic":248}],185:[function(require,module,exports){
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

},{"./lib/is_arguments.js":186,"./lib/keys.js":187}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],188:[function(require,module,exports){
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

},{"has-property-descriptors":249,"object-keys":257}],189:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],190:[function(require,module,exports){
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

},{"./ToNumber":220,"./ToPrimitive":222,"./Type":227}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/isNaN":238,"../helpers/isPrefixOf":239,"./ToNumber":220,"./ToPrimitive":222,"./Type":227,"get-intrinsic":248}],192:[function(require,module,exports){
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

},{"get-intrinsic":248}],193:[function(require,module,exports){
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

},{"./DayWithinYear":196,"./InLeapYear":200,"./MonthFromTime":210,"get-intrinsic":248}],194:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":243,"./floor":231}],195:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":231}],196:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":194,"./DayFromYear":195,"./YearFromTime":229}],197:[function(require,module,exports){
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

},{"./modulo":232}],198:[function(require,module,exports){
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

},{"../helpers/assertRecord":235,"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"./Type":227,"get-intrinsic":248}],199:[function(require,module,exports){
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

},{"../helpers/timeConstants":243,"./floor":231,"./modulo":232}],200:[function(require,module,exports){
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

},{"./DaysInYear":197,"./YearFromTime":229,"get-intrinsic":248}],201:[function(require,module,exports){
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

},{"../helpers/assertRecord":235,"./Type":227,"has":252}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":255}],203:[function(require,module,exports){
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

},{"../helpers/assertRecord":235,"./Type":227,"has":252}],204:[function(require,module,exports){
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

},{"../helpers/assertRecord":235,"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"./Type":227}],205:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":240,"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"./Type":227}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/timeConstants":243}],207:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"./DateFromTime":193,"./Day":194,"./MonthFromTime":210,"./ToInteger":219,"./YearFromTime":229,"./floor":231,"./modulo":232,"get-intrinsic":248}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/timeConstants":243,"./ToInteger":219}],209:[function(require,module,exports){
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

},{"../helpers/timeConstants":243,"./floor":231,"./modulo":232}],210:[function(require,module,exports){
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

},{"./DayWithinYear":196,"./InLeapYear":200}],211:[function(require,module,exports){
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

},{"../helpers/isNaN":238}],212:[function(require,module,exports){
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

},{"../helpers/timeConstants":243,"./floor":231,"./modulo":232}],213:[function(require,module,exports){
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

},{"./Type":227}],214:[function(require,module,exports){
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


},{"../helpers/isFinite":236,"./ToNumber":220,"./abs":230,"get-intrinsic":248}],215:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":243,"./DayFromYear":195}],216:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":243,"./modulo":232}],217:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],218:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":220}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/isNaN":238,"../helpers/sign":242,"./ToNumber":220,"./abs":230,"./floor":231}],220:[function(require,module,exports){
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

},{"./ToPrimitive":222}],221:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":192,"get-intrinsic":248}],222:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":244}],223:[function(require,module,exports){
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

},{"./IsCallable":202,"./ToBoolean":217,"./Type":227,"get-intrinsic":248,"has":252}],224:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":248}],225:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/isNaN":238,"../helpers/sign":242,"./ToNumber":220,"./abs":230,"./floor":231,"./modulo":232}],226:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":220}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":194,"./modulo":232}],229:[function(require,module,exports){
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

},{"call-bind/callBound":183,"get-intrinsic":248}],230:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":248}],231:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],232:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":241}],233:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":243,"./modulo":232}],234:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":190,"./5/AbstractRelationalComparison":191,"./5/CheckObjectCoercible":192,"./5/DateFromTime":193,"./5/Day":194,"./5/DayFromYear":195,"./5/DayWithinYear":196,"./5/DaysInYear":197,"./5/FromPropertyDescriptor":198,"./5/HourFromTime":199,"./5/InLeapYear":200,"./5/IsAccessorDescriptor":201,"./5/IsCallable":202,"./5/IsDataDescriptor":203,"./5/IsGenericDescriptor":204,"./5/IsPropertyDescriptor":205,"./5/MakeDate":206,"./5/MakeDay":207,"./5/MakeTime":208,"./5/MinFromTime":209,"./5/MonthFromTime":210,"./5/SameValue":211,"./5/SecFromTime":212,"./5/StrictEqualityComparison":213,"./5/TimeClip":214,"./5/TimeFromYear":215,"./5/TimeWithinDay":216,"./5/ToBoolean":217,"./5/ToInt32":218,"./5/ToInteger":219,"./5/ToNumber":220,"./5/ToObject":221,"./5/ToPrimitive":222,"./5/ToPropertyDescriptor":223,"./5/ToString":224,"./5/ToUint16":225,"./5/ToUint32":226,"./5/Type":227,"./5/WeekDay":228,"./5/YearFromTime":229,"./5/abs":230,"./5/floor":231,"./5/modulo":232,"./5/msFromTime":233}],235:[function(require,module,exports){
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

},{"./isMatchRecord":237,"get-intrinsic":248,"has":252}],236:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],237:[function(require,module,exports){
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

},{"has":252}],238:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],239:[function(require,module,exports){
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

},{"call-bind/callBound":183}],240:[function(require,module,exports){
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

},{"get-intrinsic":248,"has":252}],241:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],242:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],243:[function(require,module,exports){
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

},{}],244:[function(require,module,exports){
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

},{"./helpers/isPrimitive":245,"is-callable":255}],245:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":246}],248:[function(require,module,exports){
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

},{"function-bind":247,"has":252,"has-symbols":250}],249:[function(require,module,exports){
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

},{"get-intrinsic":248}],250:[function(require,module,exports){
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

},{"./shams":251}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":247}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
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

},{"./isArguments":258}],257:[function(require,module,exports){
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

},{"./implementation":256,"./isArguments":258}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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
},{"_process":259,"through":273,"timers":274}],261:[function(require,module,exports){
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

},{"buffer":165}],262:[function(require,module,exports){
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

},{"es-abstract/es5":234,"function-bind":247}],263:[function(require,module,exports){
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

},{"./implementation":262,"./polyfill":264,"./shim":265,"define-properties":188,"function-bind":247}],264:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":262}],265:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":264,"define-properties":188}],266:[function(require,module,exports){
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
},{"safe-buffer":261}],267:[function(require,module,exports){
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
},{"./lib/default_stream":268,"./lib/results":270,"./lib/test":271,"_process":259,"defined":189,"through":273,"timers":274}],268:[function(require,module,exports){
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
},{"_process":259,"fs":164,"through":273}],269:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":259,"timers":274}],270:[function(require,module,exports){
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
},{"_process":259,"events":166,"function-bind":247,"has":252,"inherits":254,"object-inspect":272,"resumer":260,"through":273,"timers":274}],271:[function(require,module,exports){
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
},{"./next_tick":269,"deep-equal":185,"defined":189,"events":166,"has":252,"inherits":254,"path":167,"string.prototype.trim":263}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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
},{"_process":259,"stream":168}],274:[function(require,module,exports){
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
},{"process/browser.js":259,"timers":274}],275:[function(require,module,exports){
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
},{}]},{},[94,95]);
